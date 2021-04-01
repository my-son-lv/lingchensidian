
// 备选外教
<template>
  <div class="indexContatiner">
    <div class="top_con">
      <div class="left_title clearfix">
        <ul class="fl">
          <li :class="activeClass == index ? 'actived':''" class="title_item" v-for="(item,index) in titleList" :key="index" @click="getItem(index,item.id)">{{item.value}}</li>
        </ul>
        <div class="rside_select fr">
          <div class="nationality fl" @click="getNationalityList">
            <span class="inner_con">{{nationalityValue == "" ? '国籍' : nationalityValue}}</span>
            <img v-if="nationalityValue == ''" class="nationality_icon" src="/static/images/down.png" />
            <img v-else class="nationality_icon" src="/static/images/close_icon.png" @click.stop="hanleClickCloseNationality" />
          </div>
          <div class="price fl" @click="getSalary">
            <span class="inner_con">{{priceValue == "" ? '薪资' : priceValue}}</span>
            <img v-if="priceValue == ''" class="price_icon" src="/static/images/down.png" />
            <img v-else class="price_icon" src="/static/images/close_icon.png" @click.stop="handleClcikClosePrice" />
          </div>
        </div>
      </div>
    </div>
    <scroll-view scroll-y="true" :style="{'height': scrollHeight + 'px'}" @scrolltolower="loadMore" v-if="backTeacherList.length > 0">
      <ul class="teacher_list">
        <li class="list_item clearfix" v-for="(item,index) in backTeacherList" :key="index" @click.prevent="gotTeaccherDetails(item.id,item.mid)">
          <img v-if="item.photos_path != null" class="left_portrait fl" :src="item.photos_path[0].path" />
          <img v-else class="left_portrait fl" :src="item.sex == 0 ? '/static/images/man.png' : '/static/images/woman.png'" />
          <div class="teacher_introduce fr">
            <div class="teacher_name">{{item.name}}</div>
            <div class="teacher_country">{{item.nationality_val}} | {{ item.university ? degree[item.university - 1].code : 1}}</div>
            <div class="working_years clearfix">
              <div class="years fl">{{item.working_seniority ? workYearList[item.working_seniority - 1].code :  workYearList[2].code }}</div>
              <div class="salary fl">{{item.pay_type ? payList[item.pay_type - 1].code : 1}}</div>
            </div>
            <!-- <div class="teacher_heat">热度：{{item.hot}}</div> -->
          </div>
          <div class="delete_icon" @click.stop="handleClickDelete(item.mid)">
            <img src="/static/images/delete_icon.png" class="delete_img" />
          </div>
        </li>
      </ul>
    </scroll-view>
    <div class="empty_img_wrapper" v-else>
      <img class="empty_img" src="../../asset/interview_empty.png" />
      <h6 class="empty_title">空空如也</h6>
      <p class="empty_con">您还没有收藏任何外教，快去收藏一个喜欢的外教吧</p>
    </div>
    <van-popup :show="showNationalityPicker" overlay position="bottom">
      <van-picker :visible-item-count="5" title="选择国籍" show-toolbar :columns="nationalityColumns" @confirm="onNationalityConfirm" @cancel="hideNationalityPicker" />
    </van-popup>
    <van-popup :show="showSalaryPicker" overlay position="bottom">
      <van-picker :visible-item-count="5" title="选择薪资" show-toolbar :columns="salaryListColumns" @confirm="onSalaryConfirm" @cancel="hideSalaryPicker" />
    </van-popup>
    <van-toast id="van-toast" />
    <van-dialog id="van-dialog" />
  </div>
</template>

<script>
import Toast from "@/../static/vant/toast/toast";
import Dialog from "@/../static/vant/dialog/dialog";
export default {
  data() {
    return {
      titleList: [{ value: "已收藏", id: 1 }, { value: "候选人", id: 2 }],
      activeClass: 0,
      showNationalityPicker: false,
      nationalityColumns: ["全部", "母语", "非母语"],
      allCountryList: [
        {
          value: "全部",
          id: 0
        },
        {
          value: "母语",
          id: 1
        },
        {
          value: "非母语",
          id: 2
        }
      ],
      salaryListColumns: ["10k-13k", "13k-16k", "16k-20k", "20k-25k", ">25k"],
      allSalaryList: [
        { id: 1, code: "10k-13k" },
        { id: 2, code: "13k-16k" },
        { id: 3, code: "16k-20k" },
        { id: 4, code: "20k-25k" },
        { id: 5, code: ">25k" }
      ],
      showSalaryPicker: false,
      countryId: "",
      typeId: 1,
      payType: "",
      backTeacherList: [],
      page: 1,
      pageSize: 10,
      degree: [
        { id: 1, code: "High School Diploma" },
        { id: 2, code: "Associate's Degree" },
        { id: 3, code: "Bachelor's Degree" },
        { id: 4, code: "Master's Degree" },
        { id: 5, code: "MBA" },
        { id: 6, code: "PHD" }
      ],
      workYearList: [
        { id: 1, code: "Less than 1 year" },
        { id: 2, code: "1 years experience" },
        { id: 3, code: "2 years experience" },
        { id: 4, code: "3 years experience" },
        { id: 5, code: "4 years experience" },
        { id: 6, code: "5 years experience" },
        { id: 7, code: "6 years experience" },
        { id: 8, code: "7 years experience" },
        { id: 9, code: "8 years experience" },
        { id: 10, code: "9 years experience" },
        { id: 11, code: "More than 10years" },
      ],
      payList: [
        { id: 1, code: "10k-13k" },
        { id: 2, code: "13k-16k" },
        { id: 3, code: "16k-20k" },
        { id: 4, code: "20k-25k" },
        { id: 5, code: ">25k" }
      ],
      scrollHeight: 0,
      finished: false,
      nationalityValue: "",
      priceValue: ""
    };
  },

  components: {},

  methods: {
    // 点击国籍
    getNationalityList() {
      this.page = 1;
      this.finished = false;
      this.showNationalityPicker = true;
    },
    // 国籍确认按钮
    onNationalityConfirm(event) {
      this.backTeacherList = [];
      let idx = event.mp.detail.index;
      this.countryId = this.allCountryList[idx].id;
      this.nationalityValue = event.mp.detail.value;
      this.getSearchTeacher();
      this.showNationalityPicker = false;
    },
    // 国籍取消按钮
    hideNationalityPicker() {
      this.showNationalityPicker = false;
    },
    getItem(index, id) {
      this.countryId = "";
      this.payType = "";
      this.activeClass = index;
      this.typeId = id;
      this.page = 1;
      this.finished = false;
      this.backTeacherList = [];
      this.getSearchTeacher();
    },
    // 点击薪资
    getSalary() {
      this.page = 1;
      this.finished = false;
      this.showSalaryPicker = true;
    },
    // 薪资确认按钮
    onSalaryConfirm(event) {
      this.backTeacherList = [];
      let idx = event.mp.detail.index;
      this.payType = this.allSalaryList[idx].id;
      this.priceValue = event.mp.detail.value;
      this.getSearchTeacher();
      this.showSalaryPicker = false;
    },
    // 薪资取消按钮
    hideSalaryPicker() {
      this.showSalaryPicker = false;
    },
    // 搜索外教
    async getSearchTeacher() {
      let TOKEN = wx.getStorageSync("token");
      const res = await this.$httpWX.post({
        url: "/api/company/collect/list",
        data: {
          token: TOKEN,
          type: this.typeId,
          pay_type: this.payType,
          language_flg: this.countryId,
          page: this.page,
          pageSize: this.pageSize
        }
      });
      if (res.code == 200) {
        if (res.data.list.length == 0) {
          this.finished = true;
        } else {
          this.backTeacherList.push(...res.data.list);
          if (res.data.count == this.page) {
            this.finished = true;
          }
        }
      }
    },
    loadMore() {
      if (this.finished != true) {
        this.page += 1;
        this.getSearchTeacher();
      }
    },
    // 跳转详情
    gotTeaccherDetails(id, mid) {
      wx.navigateTo({
        url: "../../pages/teachersDetail/main?id=" + id + "&mid=" + mid
      });
    },
    handleClickDelete(mid) {
      Dialog.confirm({
        message: "确认删除？"
      })
        .then(() => {
          // on confirm
          this.page = 1;
          this.finished = false;
          this.backTeacherList = [];
          let TOKEN = wx.getStorageSync("token");
          this.$httpWX
            .post({
              url: "/api/company/collect",
              data: {
                token: TOKEN,
                type: this.typeId,
                class: 2,
                mid: mid
              }
            })
            .then(res => {
              if (res.code == 200) {
                setTimeout(() => {
                  Toast.success("删除成功");
                }, 500);
                this.getSearchTeacher();
              } else {
                setTimeout(() => {
                  Toast.fail(res.msg);
                }, 500);
              }
            });
        })
        .catch(() => {
          // on cancel
        });
    },
    hanleClickCloseNationality() {
      this.nationalityValue = "";
      this.countryId = "";
      this.page = 1;
      this.finished = false;
      this.backTeacherList = [];
      this.getSearchTeacher();
    },
    handleClcikClosePrice() {
      this.priceValue = "";
      this.payType = "";
      this.page = 1;
      this.finished = false;
      this.backTeacherList = [];
      this.getSearchTeacher();
    }
  },
  beforeMount() { },
  onShow() {
    Object.assign(this.$data, this.$options.data());
    this.getSearchTeacher();
    let self = this;
    wx.getSystemInfo({
      success: function (res) {
        self.scrollHeight = res.windowHeight - 56;
      }
    });
  }
};
</script>
<style>
page {
  background: #f5f5f5;
}
.van-cell__left-icon-wrap {
  display: none !important;
}
</style>
<style scoped>
.indexContatiner {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.top_con {
  width: 100%;
  height: 56px;
  background: #fff;
}
.left_title {
  margin: 12px auto 0 auto;
  width: 93%;
}
.left_title .title_item {
  margin-right: 24px;
  float: left;
  height: 24px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999;
  line-height: 24px;
}
.actived {
  color: #333 !important;
  font-weight: 700 !important;
}
.clearfix:after {
  content: "";
  display: block;
  clear: both;
}

.clearfix {
  zoom: 1;
}

.fl {
  float: left;
}

.fr {
  float: right;
}
.rside_select .nationality,
.rside_select .price {
  padding: 4px 0 4px 8px;
  min-width: 48px;
  height: 16px;
  background: #f8f8f8;
  border-radius: 2px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
}
.rside_select .nationality {
  margin-right: 12px;
}
.nationality .nationality_icon,
.price .price_icon {
  margin: 0 4px;
  padding: 0 2px;
  width: 16px;
  height: 16px;
}
.teacher_list {
  width: 100%;
  padding-bottom: 20px;
}
.teacher_list .list_item {
  position: relative;
  margin-top: 10px;
  height: 124px;
  background: #fff;
}
.list_item .left_portrait {
  margin: 24px 11px 0 16px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
}
.list_item .teacher_introduce {
  position: relative;
  padding: 24px 16px 0 0;
  width: 284px;
  height: 100px;
  border-bottom: 1px solid #eeeeee;
}
.teacher_introduce .teacher_name {
  width: 250px;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.teacher_introduce .teacher_country {
  margin: 8px 0;
  height: 16px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.working_years .years {
  padding: 4px 8px;
  background: rgba(255, 255, 255, 1);
  border-radius: 2px;
  border: 1px solid rgba(221, 221, 221, 1);
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  text-align: center;
}
.working_years .salary {
  margin-left: 8px;
  padding: 4px 8px;
  background: rgba(255, 255, 255, 1);
  border-radius: 2px;
  border: 1px solid rgba(221, 221, 221, 1);
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  text-align: center;
}
.teacher_introduce .teacher_heat {
  position: absolute;
  top: 24px;
  right: 16px;
  width: 64px;
  height: 20px;
  background: rgba(7, 140, 169, 0.1);
  border-radius: 2px;
  font-size: 10px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(7, 140, 169, 1);
  line-height: 20px;
  text-align: center;
}
.delete_icon {
  position: absolute;
  bottom: 19px;
  right: 11px;
  padding: 5px;
  width: 20px;
  height: 14px;
}
.delete_img {
  width: 20px;
  height: 14px;
}
.bottom_tips {
  margin: 10px 0;
  color: rgba(153, 153, 153, 1);
  text-align: center;
}
.empty_img_wrapper {
  margin-top: 30%;
  text-align: center;
}
.empty_img_wrapper .empty_img {
  width: 130px;
  height: 130px;
}
.empty_img_wrapper .empty_con {
  margin: 0 auto;
  width: 169px;
  height: 26px;
  font-size: 9px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
  line-height: 13px;
  text-align: center;
}
.inner_con {
  display: inline-block;
  vertical-align: top;
}
</style>
