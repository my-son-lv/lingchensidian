// 下载简历
<template>
  <div class="indexContatiner">
    <scroll-view scroll-x="true" class="nav_wrapper clearfix">
      <div
        :class="activeNavClass == index ? 'actived_nav':''"
        class="scroll_nav_item"
        v-for="(nav,index) in navList"
        :key="index"
        @click="getNavItem(nav.id,index)"
      >{{nav.name}}</div>
    </scroll-view>
    <div v-if="dropBoxList.length > 0">
      <scroll-view
        scroll-y="true"
        :style="{'height': scrollHeight + 'px'}"
        @scrolltolower="loadMore"
      >
        <div
          class="content"
          v-for="(item,index) in dropBoxList"
          :key="index"
          @click="handleClickTeacherDetails(item.id, item.mid)"
        >
          <div class="cont_top clearfix">
            <p class="lside_name fl">{{item.job_name}}</p>
            <p class="rside_time fr">{{item.created_at}}</p>
          </div>
          <div class="bottom_wrapper">
            <img v-if="item.photos_path != null" class="rside_img" :src="item.photos_path[0].path" />
            <img
              v-else
              class="rside_img"
              :src="item.sex == 0 ? '/static/images/man.png' : '/static/images/woman.png'"
            />
            <div class="info_item">
              <div class="teacher_name">{{item.name}}</div>
              <div class="country">{{item.nationality_val}} | {{degree[item.university - 1].code}}</div>
              <div class="price_wrapper">
                <p
                  class="year"
                >{{item.working_seniority ? workYearList[item.working_seniority - 1].code : workYearList[2].code }}</p>
                <p class="price">{{item.pay_type ? payList[item.pay_type - 1].code : '' }}</p>
              </div>
            </div>
            <div class="JobbtnGroup" v-if="item.result == 1">
              <div class="JobbtnGroup1" @click.stop="keyiliao">可以聊</div>
              <div
                class="JobbtnGroup2"
                @click.stop="buheshi(item.job_app_id,index)"
                style="background: #b7b4b4;"
              >不合适</div>
            </div>
            <div class="yitaotai" v-if="item.result == 3">已淘汰</div>
          </div>
        </div>
      </scroll-view>
    </div>

    <div class="empty_img_wrapper" v-else>
      <img class="empty_img" src="../../asset/interview_empty.png" />
      <h6 class="empty_title">空空如也</h6>
    </div>
    <van-notify id="van-notify" class="van-notify" />
  </div>
</template>

<script>
import Notify from "@/../static/vant/notify/notify";
export default {
  data() {
    return {
      dropBoxList: [],
      firstNav: [{ id: 0, name: "全部" }],
      navList: [],
      degree: [
        { id: 1, code: "High School Diploma" },
        { id: 2, code: "Associate's Degree" },
        { id: 3, code: "Bachelor's Degree" },
        { id: 4, code: "Master's Degree" },
        { id: 5, code: "MBA" },
        { id: 6, code: "PHD" },
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
        { id: 5, code: ">25k" },
      ],
      activeNavClass: 0,
      navId: 0,
      page: 1,
      pageSize: 10,
      scrollHeight: 0,
      finished: false,
    };
  },

  components: {},

  methods: {
    keyiliao(e) {
      wx.navigateTo({
        url: "../vipDetailed/main",
      });
      e.stopPropagation();
    },
    async buheshi(id, index) {
      let TOKEN = wx.getStorageSync("token");
      let res = await this.$httpWX.post({
        url: "/api/company/job/jobResult",
        data: {
          token: TOKEN,
          id: id,
          result: 3,
        },
      });
      if (res.code == 200) {
        this.dropBoxList[index].result = 3;
      } else {
        Notify({
          type: "warning",
          message: res.msg,
        });
      }
    },
    // 获取所有职位标题
    async getNav() {
      let TOKEN = wx.getStorageSync("token");
      let res = await this.$httpWX.get({
        url: "/api/company/job/getJobList",
        data: {
          token: TOKEN,
          id: this.navId,
        },
      });
      if (res.code == 200) {
        let backArr = res.data;
        this.navList = [...this.firstNav, ...backArr];
      } else {
        Notify({
          type: "warning",
          message: res.msg,
        });
      }
    },
    // 切换标题
    getNavItem(id, idx) {
      this.activeNavClass = idx;
      this.navId = id;
      this.dropBoxList = [];
      this.getDropBox();
    },
    // 获取列表数据
    async getDropBox() {
      let TOKEN = wx.getStorageSync("token");
      let res = await this.$httpWX.post({
        url: "/api/company/job/application",
        data: {
          token: TOKEN,
          type: this.navId,
          page: this.page,
          pageSize: this.pageSize,
        },
      });
      if (res.code == 200) {
        if (res.data.list.length == 0) {
          this.finished = true;
        } else {
          this.dropBoxList.push(...res.data.list);
          if (res.data.count == this.page) {
            this.finished = true;
          }
        }
      } else {
        Notify({
          type: "warning",
          message: res.msg,
        });
      }
    },
    // 加载更多
    loadMore() {
      if (this.finished != true) {
        this.page += 1;
        this.getDropBox();
      }
    },
    // 跳转详情
    handleClickTeacherDetails(id, mid) {
      wx.navigateTo({
        url: "../../pages/teachersDetail/main?id=" + id + "&mid=" + mid,
      });
    },
  },
  beforeMount() {},
  onShow() {
    Object.assign(this.$data, this.$options.data());
    let self = this;
    wx.getSystemInfo({
      success: function (res) {
        self.scrollHeight = res.windowHeight - 56;
      },
    });
    this.getNav();
    this.getDropBox();
  },
  onLoad() {},
  onUnload() {},
};
</script>
<style>
page {
  background: #f5f5f5;
}
button::after {
  border: none;
}
</style>
<style scoped>
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
.nav_wrapper {
  margin-bottom: 8px;
  /* padding-left: 16px; */
  /* margin-left: 16px; */
  height: 44px;
  line-height: 40px;
  background: #ffffff;
  border-bottom: 0.5px solid rgba(238, 238, 238, 1);
  white-space: nowrap;
}
.van-notify {
  width: 100%;
}
.scroll_nav_item {
  /* float: left; */
  margin-left: 12px;
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 400;
  color: #666;
  display: inline-block;
}
.actived_nav {
  color: #333333 !important;
  border-bottom: 4px solid #078ca9 !important;
}
.content {
  margin-bottom: 8px;
  width: 100%;
  height: 166px;
  background: #ffffff;
}
.cont_top {
  margin: 0 32rpx;
  /* padding: 0 16px; */
  height: 54px;
  line-height: 54px;
  background: #ffffff;
  border-bottom: 1px solid rgba(238, 238, 238, 1);
}
.cont_top .lside_name {
  width: 200px;
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.cont_top .rside_time {
  font-size: 12px;
  font-family: PingFangSC-Light, PingFang SC;
  font-weight: 300;
  color: #999999;
}
.bottom_wrapper {
  position: relative;
  margin-top: 16px;
  /* padding-left: 16px; */
}
.bottom_wrapper .teacher_name {
  width: 210px;
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.bottom_wrapper .country {
  margin: 4px 0 12px 0;
  width: 200px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.bottom_wrapper .price_wrapper {
  display: flex;
}
.price_wrapper .year {
  padding: 0 5px;
  min-width: 58px;
  height: 24px;
  background: #f5f5f5;
  border-radius: 1px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
  line-height: 24px;
  text-align: center;
}
.price_wrapper .price {
  margin-left: 8px;
  min-width: 58px;
  height: 24px;
  background: #f5f5f5;
  border-radius: 1px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
  line-height: 24px;
  text-align: center;
}
.bottom_wrapper .info_item {
  display: inline-block;
  margin-left: 200rpx;
}
.bottom_wrapper .rside_img {
  position: absolute;
  top: 0px;
  left: 20rpx;
  display: block;
  width: 160rpx;
  height: 160rpx;
  border-radius: 50%;
}
.bottom_wrapper .rside_img image {
  width: 100%;
  height: 100%;
}
.empty_img_wrapper {
  margin-top: 40%;
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
.JobbtnGroup {
  position: absolute;
  right: 16px;
  top: 0;
  display: inline-block;
}
.JobbtnGroup1,
.JobbtnGroup2 {
  width: 60px;
  line-height: 53rpx;
  background: rgba(7, 140, 169, 1);
  box-shadow: 0 0 10rpx 0 rgba(0, 0, 0, 0.1);
  border-radius: 8rpx;
  font-size: 22rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  letter-spacing: 2rpx;
  text-align: center;
  margin-top: 10px;
}
.JobbtnGroup2 {
  background: #b7b4b4;
}
.yitaotai {
  position: absolute;
  right: 32rpx;
  top: 57rpx;
  display: inline-block;
  background: #c5c0c0;
  color: white;
  border-radius: 4px;
  padding: 0 8px;
  line-height: 30px;
}
</style>
