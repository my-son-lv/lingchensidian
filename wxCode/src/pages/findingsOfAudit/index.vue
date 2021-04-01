// 审核结果
<template>
  <div class="indexContatiner">
    <div class="fail_wrapper">
      <div class="content">
        <img class="review_img" src="/static/images/icon_fail.png" />
        <p class="submit_success">抱歉，您的企业认证申请审核未通过</p>
        <p class="reason">原因：{{ infoMessage }}</p>
      </div>
      <div class="cancel_btn" @click="handleClickAgain">重新填写认证信息</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      infoMessage: "",
    };
  },

  components: {},

  methods: {
    async getInfoByToken() {
      let TOKEN = wx.getStorageSync("token");
      const res = await this.$httpWX.post({
        url: "/api/company/getInfoByToken",
        data: {
          token: TOKEN,
        },
      });
      if (res.code == 200) {
        if (res.data.info == null) {
          this.infoMessage = "";
        } else {
          this.infoMessage = res.data.info;
        }
      }
    },
    // 重新填写
    handleClickAgain() {
      wx.navigateTo({
        url: "../../pages/reAudit/main",
      });
    },
  },
  onShow() {
    Object.assign(this.$data, this.$options.data());
    this.getInfoByToken();
    if (wx.canIUse("hideHomeButton")) {
      wx.hideHomeButton();
    }
    this.getInfoByToken();
  },
  onLoad() {},
  onUnload() {
    clearInterval(this.timer);
  },
};
</script>
<style scoped>
.success_wrapper,
.fail_wrapper {
  width: 100%;
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
.submit_success {
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
  border-radius: 4px;
  border: 1px solid rgba(151, 151, 151, 1);
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  line-height: 49px;
  letter-spacing: 1px;
  text-align: center;
}
.reason {
  margin-top: 12px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  line-height: 16px;
}
</style>
