// 注册页
<template>
  <div class="register_wrapper">
    <div class="register_inputs">
      <input type="text" placeholder="请输入手机号" @blur="phoneRule" v-model.trim="phone" class="user_phone" maxlength="11" />
      <input type="password" placeholder="请输入密码" v-model.trim="password" class="user_phone" />
      <input type="password" placeholder="确认密码" v-model.trim="nextPassword" class="user_phone" />
      <div class="pass_word_wrapper clearfix">
        <input type="text" placeholder="请输入验证码" v-model.trim="code" class="user_pass_word fl" />
        <p class="get_phone_code fl" v-show="getCodeType" @click="handleClickCode">获取验证码</p>
        <p class="get_phone_code fl" v-show="!getCodeType">已发送{{count}}s</p>
      </div>
      <input type="text" placeholder="请输入邀请码(可选填)" v-model.trim="invite_code" class="user_phone" />
      <div class="register_btn" @click="handleClickRegister">立即注册</div>
      <div class="go_login">
        已有账号？
        <span class="login" @click="handleClickLogin">立即登录</span>
      </div>
    </div>
    <div class="regulations">
      <van-checkbox v-model="regulationsChecked" checked-color="#078CA9" class="regulations_checked" icon-size="16px" @click="activeChecked">
        我已阅读并同意
        <span class="apex" @click="web_click">《APEX GOLBAL 服务条款》</span>
      </van-checkbox>
    </div>
    <van-notify id="van-notify" class="van-notify" />
  </div>
</template>

<script>
import Notify from "@/../static/vant/notify/notify";
export default {
  data() {
    return {
      phone: "",
      password: "",
      nextPassword: "",
      code: "",
      regulationsChecked: true,
      count: 0,
      getCodeType: true,
      timer: null,
      invite_code: ''
    };
  },

  components: {},

  methods: {
    web_click () {
      wx.navigateTo({
        url: "../../pages/web/main"
      });
    },
    // checked切换
    activeChecked() {
      this.regulationsChecked = !this.regulationsChecked;
    },
    // 获取验证码
    async handleClickCode() {
      let reg = /^1[3-9][0-9]{9}$/;
      if (this.phone == "") {
        Notify({ type: "warning", message: "请输入手机号" });
      } else {
        if (!reg.test(this.phone) && this.phone != "") {
          Notify({ type: "warning", message: "请填写正确手机号" });
        } else {
          const res = await this.$httpWX.post({
            url: "/api/company/sendSms",
            data: {
              phone: this.phone
            }
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
    // 立即注册
    handleClickRegister() {
      let reg = /^1[3-9][0-9]{9}$/;
      if (!reg.test(this.phone) && this.phone != "") {
        Notify({ type: "warning", message: "请填写正确手机号" });
      } else {
        if (
          this.phone == "" ||
          this.password == "" ||
          this.nextPassword == "" ||
          this.code == ""
        ) {
          Notify({ type: "warning", message: "请输入手机号/密码/验证码" });
        } else {
          if (this.password !== this.nextPassword) {
            Notify({ type: "warning", message: "密码输入不一致，请重新输入" });
            return;
          } else {
            this.$httpWX
              .post({
                url: "/api/company/companyRegister",
                data: {
                  phone: this.phone,
                  code: this.code,
                  password: this.password,
                  invite_code: this.invite_code
                }
              })
              .then(res => {
                if (res.code == 200) {
                  wx.setStorageSync("PhoneNum", this.phone);
                  wx.redirectTo({
                    url: "/pages/login/main"
                  });
                } else {
                  Notify({ type: "warning", message: res.msg });
                }
              });
          }
        }
      }
    },
    // 去登陆
    handleClickLogin() {
      wx.redirectTo({
        url: "/pages/login/main"
      });
    },
    phoneRule() {
      let reg = /^1[3-9][0-9]{9}$/;
      if (!reg.test(this.phone)) {
        Notify({ type: "warning", message: "请输入正确手机号" });
      }
    }
  },
  beforeMount() { },
  onLoad() {
    Object.assign(this.$data, this.$options.data());
  },
  onUnload() {
    clearInterval(this.timer);
  }
};
</script>
<style scoped>
.register_wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.register_inputs {
  margin-top: 58px;
  width: 90%;
}
.user_phone {
  margin-bottom: 24px;
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
.pass_word_wrapper {
  margin-bottom: 24px;
  width: 100%;
  height: 49px;
  background: rgba(248, 248, 248, 1);
}
.user_pass_word {
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
.register_btn {
  margin-top: 48px;
  width: 100%;
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
.go_login {
  margin-top: 24px;
  width: 100;
  text-align: right;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  letter-spacing: 1px;
}
.go_login .login {
  color: #078ca9;
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
.van-notify {
  width: 100%;
}
.regulations {
  margin-top: 202px;
}
.regulations .regulations_checked {
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  letter-spacing: 1px;
}
.regulations .apex {
  color: #078ca9;
}
</style>
