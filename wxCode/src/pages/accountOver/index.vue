// 修改完成
<template>
  <div class="wrapper">
    <div class="content">
      <img src="/static/images/icon_review.png" class="icon_img" />
      <p class="tips">恭喜您！账号修改完成</p>
    </div>
    <div class="logout_btn" @click="jumpLogin">重新登录</div>
    <van-notify id="van-notify" class="van-notify" />
  </div>
</template>

<script>
import Notify from "@/../static/vant/notify/notify";
export default {
  data() {
    return {};
  },

  components: {},

  methods: {
    async jumpLogin() {
      let TOKEN = wx.getStorageSync("token");
      const res = await this.$httpWX.post({
        url: "/api/company/logoutCompany",
        data: {
          token: TOKEN
        }
      });
      if (res.code == 200) {
        wx.redirectTo({
          url: "../../pages/login/main"
        });
        wx.clearStorage();
      } else {
        Notify({ type: "warning", message: res.msg });
      }
    }
  },
  beforeMount() {},
  onLoad() {
    Object.assign(this.$data, this.$options.data());
  },
  onUnload() {}
};
</script>
<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
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
.content {
  margin: 78px 0 48px 0;
  width: 90%;
  height: 124px;
  background: #f8f8f8;
  border-radius: 10px;
  text-align: center;
}
.content .icon_img {
  margin: 24px auto 12px auto;
  width: 40px;
  height: 40px;
}
.content .tips {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
  line-height: 24px;
  text-align: center;
}
.logout_btn {
  width: 90%;
  height: 49px;
  background: #078ca9;
  border-radius: 4px;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  line-height: 49px;
  letter-spacing: 1px;
  text-align: center;
}
</style>
