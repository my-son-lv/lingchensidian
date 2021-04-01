// 平台数据
<template>
  <div class="indexContatiner">
    <div class="list_wrapper">
      <div class="list_item">
        <p class="title">发布职位</p>
        <p class="num">可用数量：无限</p>
        <p class="num">已用数量：<span class="yy_num">{{dataList.yy_job_num}}</span></p>
      </div>
      <div class="list_item">
        <p class="title">置顶职位</p>
        <p class="num">可用数量：{{dataList.top}}</p>
        <p class="num">已用数量：<span class="yy_num">{{dataList.yy_top}}</span></p>
      </div>
      <div class="list_item" style="margin-right:0;">
        <p class="title">下载简历</p>
        <p class="num">可用数量：{{dataList.down}}</p>
        <p class="num">已用数量：<span class="yy_num">{{dataList.yy_down}}</span></p>
      </div>
    </div>
    <div class="list_wrapper">
      <div class="list_item">
        <p class="title">急聘服务</p>
        <p class="num">可用数量：{{dataList.jiping ? dataList.jiping : 0}}</p>
        <p class="num">已用数量：<span class="yy_num">{{dataList.yy_jiping ? dataList.yy_jiping : 0}}</span></p>
      </div>
      <div class="list_item">
        <p class="title">邀请应聘</p>
        <p class="num">可用数量：{{dataList.yaoqing ? dataList.yaoqing : 0}}</p>
        <p class="num">已用数量：<span class="yy_num">{{dataList.yy_yaoqing ? dataList.yy_yaoqing : 0}}</span></p>
      </div>
      <div class="list_item" style="margin-right:0;">
        <p class="title">精准推送</p>
        <p class="num">可用数量：{{dataList.tuisong ? dataList.tuisong : 0}}</p>
        <p class="num">已用数量：<span class="yy_num">{{dataList.yy_tuisong ? dataList.yy_tuisong : 0}}</span></p>
      </div>
    </div>
    <!-- <div class="tips_wrapper">
      <p class="tip_item">您今天可发布{{dataList.job_num}}条职位，下载{{dataList.down}}份简历</p>
      <p class="tip_item">置顶{{dataList.top}}个招聘需求，可无限量预约外教，视频面试。</p>
    </div> -->
    <div class="bottom_wrapper">
      <div class="lside">成为会员可获得更多权限哦！</div>
      <div class="rside" @click="handleClickExperience">立即体验</div>
    </div>
  </div>
</template>

<script>
import Notify from "@/../static/vant/notify/notify";
export default {
  data() {
    return {
      dataList: {}
    };
  },

  components: {},

  methods: {
    async getData() {
      let TOKEN = wx.getStorageSync("token");
      let res = await this.$httpWX.get({
        url: '/api/company/vip/getPlatData',
        data: {
          token: TOKEN
        }
      });
      if (res.code == 200) {
        this.dataList = res.data;
      } else {
        Notify({
          type: "warning",
          message: res.msg
        });
      }
    },
    handleClickExperience() {
      wx.navigateTo({
        url: '../../pages/vipCenter/main'
      });
    }
  },
  beforeMount() { },
  onShow() {
    this.getData();
  },
  onLoad() {

  },
  onUnload() { }
};
</script>
<style>
page {
  background: #fff;
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
.list_wrapper {
  display: flex;
  margin-top: 24px;
  margin-bottom: 18px;
  padding: 0 16px;
}
.list_wrapper .list_item {
  flex: 1;
  margin-right: 12px;
  padding: 16px 0 16px 12px;
  height: 72px;
  background: #ffffff;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
}
.list_item .title {
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
}
.list_item .num {
  margin: 12px 0 8px 0;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
}
.list_item .yy_num {
  color: #ff6010;
}
.tips_wrapper {
  margin: 0 auto;
  padding: 12px 0;
  width: 92%;
  height: 44px;
  background: rgba(83, 209, 236, 0.1);
  border-radius: 8px;
}
.tips_wrapper .tip_item {
  margin: 0 12px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #53d1ec;
  line-height: 22px;
}
.bottom_wrapper {
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  width: 100%;
}
.bottom_wrapper .lside {
  width: 253px;
  height: 49px;
  background: #0f0c19;
  box-shadow: 0px 1px 0px 0px rgba(238, 238, 238, 1);
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  line-height: 22px;
  text-align: center;
  line-height: 49px;
}
.bottom_wrapper .rside {
  flex: 1;
  height: 49px;
  background: #fec697;
  text-align: center;
  line-height: 49px;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #0f0c19;
}
</style>
