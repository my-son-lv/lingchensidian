// 登录页
<template>
  <div class="indexContatiner">
    <img src="/static/images/logo.png" alt class="logo" />
    <p class="welcome_text">欢迎使用寰球阿帕斯</p>
    <div class="pass_word_login" v-if="loginType">
      <input type="text" placeholder="请输入手机号" v-model="userPhone" class="user_phone" maxlength="11" />
      <div class="pass_word_wrapper clearfix">
        <input type="password" placeholder="请输入密码" v-model="userPassWord" class="user_pass_word fl" />
        <p class="forget_pass_word fl" @click="changePassWord">忘记密码</p>
      </div>
    </div>
    <div class="phone_code_login" v-else>
      <input type="text" placeholder="请输入手机号" v-model="userPhone" class="user_phone" maxlength="11" />
      <div class="pass_word_wrapper clearfix">
        <input type="text" placeholder="请输入验证码" v-model="phoneCode" class="user_pass_word fl" />
        <p class="get_phone_code fl" v-show="getCodeType" @click="handleClickCode">获取验证码</p>
        <p class="get_phone_code fl" v-show="!getCodeType">已发送{{ count }}s</p>
      </div>
    </div>
    <div class="login_btn" @click="handleClickLogin">登录</div>
    <div class="login_type clearfix">
      <p class="code_login fl" v-if="loginType" @click="codeLogin">短信登录</p>
      <p class="code_login fl" v-else @click="phoneLogin">账号登录</p>
      <p class="register fr" @click="goRegister">立即注册</p>
    </div>
    <van-notify id="van-notify" class="van-notify" />
    <van-dialog id="van-dialog" />
  </div>
</template>

<script>
import Notify from "@/../static/vant/notify/notify";
import Dialog from "@/../static/vant/dialog/dialog";
export default {
  data() {
    return {
      loginType: true,
      userPhone: "",
      userPassWord: "",
      phoneCode: "",
      count: 0,
      getCodeType: true,
      timer: null,
      type: 1,
      wxCode: "",
    };
  },

  components: {},
  methods: {
    // 短信登录
    codeLogin() {
      this.loginType = false;
      this.userPassWord = "";
    },
    // 账号登录
    phoneLogin() {
      this.loginType = true;
      this.phoneCode = "";
    },
    // 注册
    goRegister() {
      wx.navigateTo({
        url: "/pages/register/main",
      });
    },
    // 获取验证码
    async handleClickCode() {
      let reg = /^1[3-9][0-9]{9}$/;
      if (this.userPhone == "") {
        Notify({ type: "warning", message: "请输入手机号" });
      } else {
        if (!reg.test(this.userPhone) && this.userPhone != "") {
          Notify({ type: "warning", message: "请填写正确手机号" });
        } else {
          const res = await this.$httpWX.post({
            url: "/api/company/sendCheckSms",
            data: {
              phone: this.userPhone,
            },
          });
          if (res.code == 200) {
            const TIME_COUNT = 59;
            if (!this.timer) {
              this.count = TIME_COUNT;
              this.getCodeType = false;
              this.timer = setInterval(() => {
                if (this.count > 0 && this.count <= TIME_COUNT) {
                  this.count--;
                } else {
                  this.getCodeType = true;
                  clearInterval(this.timer);
                  this.timer = null;
                }
              }, 1000);
            }
          } else {
            Notify({ type: "warning", message: res.msg });
          }
        }
      }
    },
    // 登录
    handleClickLogin() {
      let that = this;
      wx.login({
        success(res) {
          if (res.code) {
            that.wxCode = res.code;
            that.loginFunc();
          } else {
            Notify({ type: "warning", message: "code获取失败" });
          }
        },
      });
    },
    // wxCode
    async loginFunc() {
      let reg = /^1[3-9][0-9]{9}$/;
      if (this.loginType == true) {
        this.type = 1;
      } else {
        this.type = 2;
      }
      if (!reg.test(this.userPhone) || this.userPhone == "") {
        Notify({ type: "warning", message: "请填写正确手机号" });
      } else {
        const res = await this.$httpWX.post({
          url: "/api/company/companyLogin",
          data: {
            phone: this.userPhone,
            password: this.userPassWord,
            type: this.type,
            code: this.phoneCode,
            wx_code: this.wxCode,
          },
        });
        if (res.code == 200) {
          wx.removeStorageSync("PhoneNum");
          wx.setStorageSync("token", res.data.token);
          if (res.data.status == 0) {
            wx.redirectTo({
              url: "../../pages/residenceApplication/main",
            });
            this.userPhone = "";
            this.userPassWord = "";
            this.type = "";
            this.phoneCode = "";
          } else if (res.data.is_wx == 1) {
            Dialog.confirm({
              title: "提示",
              message:
                "该账号已绑定其他微信，如果更换将由该微信接收提醒，是否更换？",
            })
              .then(() => {
                let that = this;
                wx.login({
                  success(res) {
                    if (res.code) {
                      that.wxCode = res.code;
                      that.updateWxCode();
                    } else {
                      Notify({ type: "warning", message: "code获取失败" });
                    }
                  },
                });
              })
              .catch(() => {
                // on cancel
              });
          } else {
            this.sharePage();
            wx.switchTab({
              url: "../../pages/index/main",
            });
            this.userPhone = "";
            this.userPassWord = "";
            this.type = "";
            this.phoneCode = "";
          }
        } else {
          Notify({ type: "warning", message: res.msg });
        }
      }
    },
    updateWxCode() {
      let TOKEN = wx.getStorageSync("token");
      this.$httpWX
        .post({
          url: "/api/company/updateWx",
          data: {
            token: TOKEN,
            wx_code: this.wxCode,
          },
        })
        .then((result) => {
          if (result.code == 200) {
            this.sharePage();
            wx.switchTab({
              url: "../../pages/index/main",
            });
            this.userPhone = "";
            this.userPassWord = "";
            this.type = "";
            this.phoneCode = "";
          } else {
            Notify({ type: "warning", message: result.msg });
          }
        });
    },
    //是否有分享页面 有则跳转至教师详情页面
    sharePage () {
      let teachId= wx.getStorageSync('share_teach_id')
      let teachMid= wx.getStorageSync('share_teach_mid')
      if(teachId){
        wx.setStorageSync('share_teach_id','')
        wx.setStorageSync('share_teach_mid','')
        wx.redirectTo({
          url: "../../pages/teachersDetail/main?id="+teachId+'&mid='+teachMid,
        });
        return;
      }
    },
    // 修改密码
    changePassWord() {
      wx.$httpWX
      wx.navigateTo({
        url: "../../pages/changePassword/main",
      });
    },
  },
  onShareAppMessage() { },
  beforeMount() { },
  onShow() {
    let that = this;
    let PHONENUM = wx.getStorageSync("PhoneNum");
    if (PHONENUM != "" && PHONENUM != null) {
      that.userPhone = PHONENUM;
    }
  },
  onLoad() { },
  onUnload() {
    clearInterval(this.timer);
  },
};
</script>
<style>
page {
  background: #fff;
}
</style>
<style scoped>
.indexContatiner {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.indexContatiner .logo {
  margin: 46rpx auto 22rpx auto;
  width: 104rpx;
  height: 104rpx;
}
.indexContatiner .welcome_text {
  margin-bottom: 48rpx;
  font-size: 20px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  letter-spacing: 1px;
}
.input_wrapper {
  width: 100%;
  height: 49px;
}
.indexContatiner .user_phone {
  padding: 0 24px;
  width: 100%;
  height: 49px;
  background: rgba(248, 248, 248, 1);
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  letter-spacing: 1px;
}
.pass_word_login,
.phone_code_login {
  width: 90%;
}
.pass_word_wrapper {
  margin: 24px auto 48px auto;
  width: 100%;
  height: 49px;
  background: rgba(248, 248, 248, 1);
}
.phone_code_login .user_pass_word {
  padding: 0 24px;
  width: 70%;
  height: 49px;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  letter-spacing: 1px;
}
.pass_word_login .user_pass_word {
  padding: 0 24px;
  width: 75%;
  height: 49px;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  letter-spacing: 1px;
}
.forget_pass_word,
.get_phone_code {
  margin-left: 10px;
  height: 49px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(7, 140, 169, 1);
  line-height: 49px;
  letter-spacing: 1px;
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
.login_btn {
  width: 90%;
  height: 49px;
  background: rgba(7, 140, 169, 1);
  border-radius: 4px;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 49px;
  letter-spacing: 1px;
  text-align: center;
}
.login_type {
  margin-top: 24px;
  width: 90%;
}
.login_type .code_login {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(7, 140, 169, 1);
  letter-spacing: 1px;
}
.login_type .register {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(7, 140, 169, 1);
  letter-spacing: 1px;
}
.van-notify {
  width: 100%;
}
</style>
