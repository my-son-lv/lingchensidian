// 等待审核
<template>
  <div class="indexContatiner">
    <div class="content">
      <img class="review_img" src="/static/images/icon_review.png" />
      <p class="submit_success">您的资料已提交成功</p>
      <p class="end_content">我们将在1-3个工作日内完成审核</p>
    </div>
    <div class="cancel_btn" @click="handleClickCancel">回到首页</div>

    <div class="zhezhaoceng">
      <div class="tanchuang">
        <div class="tanchuang-title">是否接收审核结果通知？</div>
        <div class="tanchang-btn-group">
          <div class="tanchang-btn tanchang-btn-left" >
            <button class="rside_btn" open-type="getUserInfo" @getuserinfo="bindGetUserInfo">确定</button>
            </div>
          <div class="tanchang-btn tanchang-btn-right"  @click="handleClickCancel">取消</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  components: {},

  methods: {
    handleClickCancel() {
      wx.switchTab({
        url: "../../pages/index/main",
      });
    },
    // 授权
    bindGetUserInfo(e) {
      let that = this;
      if (e.mp.detail.userInfo) {
        wx.login({
          success(res) {
            if (res.code) {
              that.wxCode = res.code;
              that.wxIv = e.mp.detail.iv;
              that.wxEncryptedData = e.mp.detail.encryptedData;
              that.wxAuthInfo();
            } else {
              console.log("请求失败" + res.errMsg);
            }
          },
        });
        wx.navigateTo({
          url: "../../pages/wxTim/setMessages/main",
        });
      }
    },
    async wxAuthInfo() {
      let TOKEN = wx.getStorageSync("token");
      let res = await this.$httpWX.post({
        url: "/api/company/wxAuthInfo",
        data: {
          token: TOKEN,
          code: this.wxCode,
          iv: this.wxIv,
          encryptedData: this.wxEncryptedData,
        },
      });
    },
  },
  beforeMount() {},
  onShow() {
    if (wx.canIUse("hideHomeButton")) {
      wx.hideHomeButton();
    }
    // setTimeout(() => {
    //   this.handleClickCancel();
    // }, 3000)
  },

  onLoad() {
    Object.assign(this.$data, this.$options.data());
  },
  onUnload() {
    clearInterval(this.timer);
  },
};
</script>
<style scoped>
.indexContatiner {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.content {
  margin-top: 78px;
  padding: 24px 0;
  width: 90%;
  height: 100px;
  background: rgba(248, 248, 248, 1);
  border-radius: 10px;
  text-align: center;
}
.review_img {
  margin-bottom: 12px;
  width: 40px;
  height: 40px;
}
.submit_success,
.end_content {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 24px;
}
.cancel_btn {
  margin-top: 39px;
  width: 90%;
  height: 49px;
  background: #078ca9;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  line-height: 49px;
  letter-spacing: 1px;
  text-align: center;
}
.zhezhaoceng {
  position: absolute;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  background-color: black;
  z-index: 1001;
  -moz-opacity: 1;
  opacity: 1;
  filter: alpha(opacity=100);
}
.tanchuang {
  width: 60%;
  background: white;
  margin: auto auto;
  margin-top: 40%;
  border-radius: 8rpx;
  padding: 40rpx 20px 0px 20px;
  text-align: center;
}
.tanchang-btn-group {
  display: flex;
  margin-top: 20px;
  border-top: solid #e0e0e0 1px;
  line-height: 40px;
}
.tanchang-btn {
  flex: 1;
  text-align: center;
}
.tanchang-btn-left {
  border-right: solid #eee 1px;
  line-height: 40px;
  height: 40px;
  font-size: 16px;
}
.tanchang-btn-right {
  border: none;
  border-left: solid #eee 1px;
  line-height: 40px;
  height: 40px;
  font-size: 16px;
}
.rside_btn {
  display: inline-block;
  background-color: transparent;
  border: none;
  line-height: 40px;
  height: 40px;
  width: 100%;
  border: none;
  font-size: 16px;
}
.rside_btn::after {
  border: none;
}
</style>
