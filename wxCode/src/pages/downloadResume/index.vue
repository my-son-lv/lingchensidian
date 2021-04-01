// 下载简历
<template>
  <div class="indexContatiner">
    <div v-if="downLoadList.length > 0" class="wrapper">
      <div class="down_item clearfix" v-for="(item,index) in downLoadList" :key="index" @click="handleClickTeacherDetails(item.id, item.mid)">
        <div class="fl">
          <div class="teacher_name">{{item.name}}</div>
          <div class="country">{{item.nationality_val}} | {{degree[item.university - 1].code}}</div>
          <div class="price_wrapper">
            <p class="year">{{item.working_seniority ? workYearList[item.working_seniority - 1].code : workYearList[2].code }}</p>
            <p class="price">{{item.pay_type ? payList[item.pay_type - 1].code : '' }}</p>
          </div>
        </div>
        <div class="rside fr">
          <img v-if="item.photos_path != null" class="rside_img" :src="item.photos_path[0].path" />
          <img v-else class="rside_img" :src="item.sex == 0 ? '/static/images/man.png' : '/static/images/woman.png'" />
          <p class="date_time">{{item.created_at}}</p>
        </div>
      </div>
    </div>

    <div class="empty_img_wrapper" v-else>
      <img class="empty_img" src="../../asset/interview_empty.png" />
      <h6 class="empty_title">空空如也</h6>
      <p class="empty_con">去下载外教简历吧...</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      downLoadList: [],
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
    };
  },

  components: {},

  methods: {
    // 简历列表
    async getDownList() {
      let TOKEN = wx.getStorageSync("token");
      let res = await this.$httpWX.get({
        url: '/api/company/teach/downList',
        data: {
          token: TOKEN
        }
      });
      if (res.code == 200) {
        this.downLoadList = res.data.list;
      }
    },
    // 跳转详情
    handleClickTeacherDetails(id, mid) {
      wx.navigateTo({
        url: "../../pages/teachersDetail/main?id=" + id + "&mid=" + mid,
      });
    }
  },
  beforeMount() { },
  onShow() {

  },
  onLoad() {
    this.getDownList();
  },
  onUnload() { }
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
.indexContatiner {
  display: flex;
  justify-content: center;
  align-items: center;
}
.wrapper {
  width: 100%;
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
.down_item {
  position: relative;
  margin: 8px 0;
  padding: 16px 0;
  width: 100%;
  height: 80px;
  background: #ffffff;
}
.down_item .teacher_name {
  margin-left: 16px;
  width: 210px;
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.down_item .country {
  margin: 4px 0 12px 16px;
  width: 200px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.down_item .price_wrapper {
  display: flex;
}
.down_item .year {
  margin-left: 16px;
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
.down_item .price {
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
.down_item .rside_img {
  display: block;
  margin: 0 0 14px 45%;
  width: 48px;
  height: 48px;
  border-radius: 50%;
}
.down_item .date_time {
  margin-right: 16px;
  font-size: 12px;
  font-family: PingFangSC-Light, PingFang SC;
  font-weight: 300;
  color: #999999;
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
</style>
