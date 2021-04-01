// 登录账户
<template>
  <div class="wrapper">
    <div class="login_num">登录账号：{{phoneNumber}}</div>
    <div class="btn" @click="jumpActivePhoneNum">修改账号</div>
    <div class="btn" @click="jumpChanegPass">修改密码</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phoneNumber: ""
    };
  },

  components: {},

  methods: {
    async getInfoByToken() {
      let TOKEN = wx.getStorageSync("token");
      const res = await this.$httpWX.post({
        url: "/api/company/getInfoByToken",
        data: {
          token: TOKEN
        }
      });
      if (res.code == 200) {
        this.phoneNumber = res.data.phone;
      }
    },
    jumpActivePhoneNum() {
      wx.navigateTo({
        url: "../../pages/activeAccount/main"
      });
    },
    jumpChanegPass() {
      wx.navigateTo({
        url: "../../pages/changePassword/main"
      });
    }
  },
  beforeMount() {},
  onShow() {
    Object.assign(this.$data, this.$options.data());
    this.getInfoByToken();
  },
  onUnload() {}
};
</script>
<style>
page {
  background: #f5f5f5;
}
</style>
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
.login_num {
  margin: 128px 220px;
  width: 90%;
  height: 28px;
  font-size: 20px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
  letter-spacing: 1px;
  text-align: center;
}
.btn {
  margin-bottom: 16px;
  width: 343px;
  height: 49px;
  background: #ffffff;
  border-radius: 4px;
  border: 1px solid #dddddd;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
  line-height: 49px;
  letter-spacing: 1px;
  text-align: center;
}
</style>
