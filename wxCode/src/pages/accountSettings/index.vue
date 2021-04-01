// 账户设置
<template>
  <div class="wrapper">
    <div class="company_logo" @click="jumpCompanyLogo">
      <div class="logo_item lside_con">机构logo</div>
      <div class="logo_item">
        <img :src="logoUrl" class="logo" />
      </div>
    </div>
    <div class="login_num" @click="jumpActiveAccount">
      <div class="logo_item lside_con">登录账号</div>
      <div class="logo_item">
        <p class="phone_num">{{phoneNumber}}</p>
        <van-icon name="arrow" class="arrow_icon" size="20px" color="#999" />
      </div>
    </div>
    <div class="login_num" @click="jumpCompanDesc">
      <div class="logo_item lside_con">机构信息</div>
      <div class="logo_item">
        <van-icon name="arrow" class="arrow_icon" size="20px" color="#999" />
      </div>
    </div>
    <div class="logout_btn" @click="jumpLogin">退出登录</div>
    <van-toast id="van-toast" />
  </div>
</template>

<script>
import Toast from "@/../static/vant/toast/toast";
export default {
  data() {
    return {
      logoUrl: "",
      phoneNumber: "",
      status: ''
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
        this.logoUrl = res.data.logo_path[0].path;
        this.status = res.data.status;
      }
    },
    // logo
    jumpCompanyLogo() {
      wx.navigateTo({
        url: "../../pages/companyLogo/main"
      });
    },
    // 账户
    jumpActiveAccount() {
      wx.navigateTo({
        url: "../../pages/modifyAccount/main"
      });
    },
    // 退出
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
        this.$store.dispatch("resetStore");
        wx.$app.logout();
        wx.clearStorage();
      } else {
        Notify({ type: "warning", message: res.msg });
      }
    },
    // 机构详情
    jumpCompanDesc() {
      if (this.status == 0) {
        wx.redirectTo({
          url: "../../pages/residenceApplication/main"
        });
      } else if (this.status == 1) {
        Toast.fail('您的信息正在审核');
      } else if (this.status == 3) {
        wx.redirectTo({
          url: "../../pages/findingsOfAudit/main"
        });
      } else {
        wx.redirectTo({
          url: "../../pages/companyDesc/main"
        });
      }

    }
  },
  beforeMount() { },
  onShow() {
    Object.assign(this.$data, this.$options.data());
    this.getInfoByToken();
  },
  onUnload() { }
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
.company_logo,
.login_num {
  display: flex;
  align-items: center;
  width: 100%;
  height: 96px;
  border-bottom: 1px solid #eeeeee;
  background: #ffffff;
}
.login_num {
  height: 54px;
}
.company_logo .logo {
  margin-right: 16px;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  text-align: right;
}
.logo_item {
  flex: 1;
  position: relative;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
}
.logo_item:nth-child(2) {
  text-align: right;
}
.phone_num {
  margin-right: 40px;
}
.arrow_icon {
  position: absolute;
  top: 50%;
  right: 16px;
  margin-top: -10px;
}
.logout_btn {
  margin-top: 24px;
  width: 100%;
  height: 54px;
  background: #ffffff;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
  line-height: 54px;
  text-align: center;
}
.lside_con {
  margin-left: 16px;
}
</style>
