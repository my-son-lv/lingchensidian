// 会员中心
<template>
  <div class="indexContatiner">
    <div class="vip_top">
      <div class="top_con">
        <h5 class="vip_title">寰球会员</h5>
        <p class="vip_text">助力您找到更优质的外教</p>
        <div class="bottom_con">
          <img src="../../asset/baoguang_icon.png" class="baoguang_icon" />
          <p class="tips">1 对 1 顾问服务，尽享职位曝光特权</p>
        </div>
      </div>
    </div>
    <div class="title_wrapper">
      <img src="https://files.apex.link/apexlink/2020112513093296681730.png" class="lside_icon" />
      <p class="vip_exclusive">会员专属权益</p>
      <img src="https://files.apex.link/apexlink/2020112513104648684062.png" class="rside_icon" />
    </div>
    <div class="vip_item clearfix">
      <img src="https://files.apex.link/apexlink/2020112513511874649390.png" class="lside_img fl" />
      <div class="rside fl">
        <p class="rside_tit">精英简历</p>
        <p class="rside_cont">优质外教简历海量下载，好外教，随心选</p>
      </div>
    </div>
    <div class="vip_item clearfix">
      <img src="https://files.apex.link/apexlink/2020112513524492069821.png" class="lside_img fl" />
      <div class="rside fl">
        <p class="rside_tit">应聘邀请</p>
        <p class="rside_cont">自主发送职位应聘邀请，触达心仪候选人，增加职位曝光</p>
      </div>
    </div>
    <div class="vip_item clearfix">
      <img src="https://files.apex.link/apexlink/2021011313551239647814.png" class="lside_img fl" />
      <div class="rside fl">
        <p class="rside_tit">急聘服务</p>
        <p class="rside_cont">8倍投体量职位曝光，外籍人才流量追踪，广告精准投放</p>
      </div>
    </div>
    <div class="vip_item clearfix">
      <img src="https://files.apex.link/apexlink/2020112513513891031218.png" class="lside_img fl" />
      <div class="rside fl">
        <p class="rside_tit">招聘顾问</p>
        <p class="rside_cont">1V1专属招聘顾问，24小时在线服务</p>
      </div>
    </div>
    <div class="vip_item clearfix">
      <img src="https://files.apex.link/apexlink/2020112513240869554908.png" class="lside_img fl" />
      <div class="rside fl">
        <p class="rside_tit">发布职位</p>
        <p class="rside_cont">不限次数发布职位，支持多条职位信息同时展示</p>
      </div>
    </div>
    <div class="vip_item clearfix">
      <img src="https://files.apex.link/apexlink/2020112513522671914395.png" class="lside_img fl" />
      <div class="rside fl">
        <p class="rside_tit">精准推送</p>
        <p class="rside_cont">AI智能匹配，精准外教送达</p>
      </div>
    </div>
    <div class="vip_item clearfix">
      <img src="https://files.apex.link/apexlink/2020112513504052213989.png" class="lside_img fl" />
      <div class="rside fl">
        <p class="rside_tit">职位置顶</p>
        <p class="rside_cont">外教端广告位置顶，站内资源职位曝光</p>
      </div>
    </div>
    <div class="bottom_btn_wrapper">
      <div class="tiyan_btn" @click="handleClickExperience">立即体验</div>
    </div>
    <van-dialog id="van-dialog" />
  </div>
</template>

<script>
import Dialog from "@/../static/vant/dialog/dialog";
export default {
  data() {
    return {

    };
  },

  components: {},

  methods: {
    handleClickExperience() {
      let TOKEN = wx.getStorageSync("token");
      if (TOKEN) {
        wx.navigateTo({
          url: '../../pages/vipDetailed/main'
        })
      } else {
        Dialog.confirm({
          message: "您当前未登录，是否登录？",
        })
          .then(() => {
            wx.navigateTo({
              url: '../../pages/login/main'
            });
          })
          .catch(() => {
            // on cancel
          });
      }
    }
  },
  beforeMount() { },
  onShow() {
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
.indexContatiner {
  padding-bottom: 84px;
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
.vip_top {
  padding-top: 34px;
  width: 100%;
  height: 128px;
  background: url("https://files.apex.link/apexlink/2020112512413829679382.png")
    no-repeat;
  background-size: 100% 100%;
}
.top_con {
  position: relative;
  margin: 0 auto;
  padding-top: 28px;
  width: 92%;
  height: 126px;
  background: url("https://files.apex.link/apexlink/2020112512464924656638.png")
    no-repeat;
  background-size: 100% 100%;
}
.top_con .vip_title {
  margin: 0 0 8px 20px;
  font-size: 24px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.8);
}
.top_con .vip_text {
  margin-left: 20px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.5);
}
.bottom_con {
  display: flex;
  position: absolute;
  bottom: 6%;
  left: 20px;
}
.baoguang_icon {
  margin-top: 3px;
  width: 12px;
  height: 12px;
}
.bottom_con .tips {
  margin-left: 2px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #fec697;
}
.title_wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 26px;
  width: 100%;
  height: 80px;
}

.title_wrapper .lside_icon,
.title_wrapper .rside_icon {
  width: 50px;
  height: 2px;
}
.title_wrapper .vip_exclusive {
  margin: 0 8px;
  font-size: 18px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #f0ba8d;
}
.vip_item {
  margin: 12px auto 0 auto;
  padding: 10px 0;
  width: 92%;
  height: 68px;
  background: rgba(241, 188, 144, 0.1);
  border-radius: 8px;
}
.vip_item .lside_img {
  margin: 0 12px;
  width: 32px;
  height: 32px;
}
.vip_item .rside {
  width: 277px;
}
.vip_item .rside_tit {
  margin-bottom: 4px;
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
}
.vip_item .rside_cont {
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
  line-height: 16px;
}
.bottom_btn_wrapper {
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 64px;
  background: #ffffff;
  border-top: 0.5px solid #eeeeee;
}
.bottom_btn_wrapper .tiyan_btn {
  width: 92%;
  height: 49px;
  background: #0f0c19;
  border-radius: 4px;
  font-size: 18px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #fec697;
  line-height: 49px;
  text-align: center;
}
</style>
