<!--  -->
<template>
  <div>
    <commonNav></commonNav>
    <div class="content" v-if="showLogin">
      <div class="t1 mt_120">Welcome back!</div>
      <div
        class="t1 mt_30"
        style="font-size:20px;"
      >Better jobs and higher pay are waiting. Sign in and find your next move</div>
      <div class="t2 mt_60">Email address</div>
      <van-field v-model.trim="email" class="input mt_18" />
      <div class="t2 mt_30">Password</div>
      <van-field v-model.trim="password" class="input mt_18" type="password" maxlength="20" />
      <van-button type="info" class="login_btn mt_60" @click="login()">GO</van-button>
      <van-button type="default" class="text_btn text_btn_top" @click="reset_pwd()">
        Forgot password？
        <span style="color:#078CA9;">Click Here</span>
      </van-button>
      <van-button type="default" class="text_btn" @click="register()">
        Don't have an account？
        <span style="color:#078CA9;">Sign Up</span>
      </van-button>
    </div>

    <div class="content" v-else>
      <div class="t1 mt_120">Create account to upload your Resume and get more visibility!</div>

      <div class="t2 mt_60">Name</div>
      <van-field class="input mt_18" v-model.trim="nick_name" maxlength="50" />

      <div class="t2 mt_30">E-mail</div>
      <van-field class="input mt_18" v-model.trim="email" />

      <div class="t2 mt_30">Verifcation code</div>
      <van-row gutter="30" class="mt_18">
        <van-col span="16">
          <van-field class="input" maxlength="6" v-model="code" />
        </van-col>
        <van-col span="8">
          <van-button
            type="info"
            class="l_btn"
            @click="send()"
            :loading="send_loading"
            :loading-text="send_title.toString()"
          >Send</van-button>
        </van-col>
      </van-row>
      <div class="t3 mt_30">We will send you a verification code to your E-mail</div>

      <div class="t2 mt_30">Password</div>
      <van-field class="input mt_18" maxlength="20" v-model="password" type="password" />
      <div class="t2 mt_30">Confirm Password</div>
      <van-field class="input mt_18" maxlength="20" v-model="confirm_pwd" type="password" />

      <div class="mt_30">
        <div class="check_box" v-on:click="checked = !checked">
          <div class="check_box_check" v-show="checked"></div>
        </div>
        <!-- <van-checkbox v-model="checked" class="check_box" icon-size="36px"></van-checkbox> -->
        <span class="t4">Please read and agree to</span>
        <span class="t5" v-on:click="terms_click()">Terms of Use</span>
        <span class="t4">and</span>
        <span class="t5" v-on:click="privacy_click()">Privacy Policy</span>
      </div>
      <van-row gutter="20" class="mt_60" style="margin-bottom: 12%">
        <van-col span="24">
          <van-button
            type="info"
            class="l_btn"
            @click="submit()"
            :disabled="!checked"
          >CREATE ACCOUNT</van-button>
        </van-col>
        <van-col span="24">
          <p class="register_btn" @click="cancel()">
            Already have an account？
            <span class="register_btn_click">Sign in</span>
          </p>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import commonNav from "../../components/commonNav/commonNav";
import {
  login,
  getStatusByToken,
  sendCode,
  register,
  isMemberExist
} from "../../apis/baseUrls";
import { Toast } from "vant";
import Bus from "../../store/bus.js";

export default {
  name: "login",
  //import引入的组件需要注入到对象中才能使用
  components: { commonNav },
  data() {
    //这里存放数据
    return {
      email: "",
      password: "",
      invite_code: "",
      checked: false,
      timeInterval: Object,
      send_title: 60,
      send_loading: false,
      nick_name: "",
      code: "",
      confirm_pwd: "",
      showLogin: true
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    register() {
      this.showLogin = !this.showLogin;
    },
    cancel() {
      this.showLogin = !this.showLogin;
    },
    reset_pwd() {
      this.$router.push({ name: "resetPwd" });
    },
    login() {
      if (this.password.length < 6) {
        Toast("Password cannot be less than 6 characters");
      } else {
        login({
          email: this.email,
          password: this.password
        }).then(res => {
          if (res.data.code == 200) {
            if (res.data.data.token) {
              localStorage.setItem("token", res.data.data.token);
            }
            let job_id = localStorage.getItem("share_job_id");
            let job_mid = localStorage.getItem("share_job_cid");
            if (job_id) {
              localStorage.setItem("share_job_id", "");
              localStorage.setItem("share_job_cid", "");
              this.$router.push({
                name: "jobsDetails",
                query: {
                  id: job_id,
                  cid: job_mid
                }
              });
              return
            }
            this.$router.push({ name: "home", params: res.data.data });
          } else if(res.data.code == 100004){
            setTimeout(function() {
              Toast("Account doesn't exist, please register.");
            }, 500);
          }else{
            setTimeout(function() {
              Toast("Email or password error, login failed.");
            }, 500);
          }
        });
      }
    },
    send() {
      // 检查用户名和邮箱
      if (this.nick_name.length < 2) {
        Toast("Name cannot be less than 2 characters");
      } else {
        isMemberExist({ email: this.email }).then(res => {
          if (res.data.code == 200 && res.data.data.flg == true) {
            setTimeout(function() {
              Toast("This email address is already in use.");
            }, 500);
          } else {
            // 发送验证码
            this.send_code();
          }
        });
      }
    },
    send_code() {
      sendCode({ email: this.email }).then(res => {
        if (res.data.code == 200) {
          setTimeout(function() {
            Toast("send successfully.");
          }, 500);

          let that = this;
          this.timeInterval = setInterval(function() {
            that.myTimer();
          }, 1000);
        } else {
          setTimeout(function() {
            Toast("Parameter error.");
          }, 500);
        }
      });
    },
    myTimer() {
      this.send_title--;
      this.send_loading = true;

      if (this.send_title === 0) {
        this.send_title = 60;
        this.send_loading = false;
        clearInterval(this.timeInterval);
      }
    },
    submit() {
      // 检查用户名和邮箱
      if (this.nick_name.length < 2) {
        Toast("Name cannot be less than 2 characters");
      } else if (this.code.length < 6) {
        Toast("Verification code must be 6 characters");
      } else if (this.password != this.confirm_pwd) {
        Toast("Passswords do not match, please re-enter.");
      } else if (this.password.length < 6) {
        Toast("Password cannot be less than 6 characters");
      } else {
        register({
          email: this.email,
          nick_name: this.nick_name,
          code: this.code,
          password: this.password,
          invite_code: this.invite_code
        }).then(res => {
          if (res.data.code == 200) {
            // 注册成功
            Toast("Signed up successfully.");
            this.showLogin = !this.showLogin;
          } else if (res.data.code == 100003) {
            // 账号已存在
            setTimeout(function() {
              Toast("Account already exists.");
            }, 500);
          } else {
            // 发送验失效
            setTimeout(function() {
              Toast("Verification Code Expire.");
            }, 500);
          }
        });
      }
    },
    terms_click() {
      window.open("https://api.globalapex.cn/pdf/User_Agreement.pdf", "_blank");
    },
    privacy_click() {
      window.open("https://api.globalapex.cn/pdf/Privacy.pdf", "_blank");
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    let url = window.location.href;
    if (url.indexOf("?") != -1) {
      this.invite_code = url.substr(1).split("=")[1];
    }
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    let code = this.$route.query.code;
    if (code) {
      this.invite_code = code;
      this.showLogin = false;
    }

    let token = localStorage.getItem("token");
    if (token) {
      getStatusByToken({ token: token }).then(res => {
        if (res.data.code == 200) {
          this.$router.push({ name: "home", params: res.data.data });
        } else {
          Toast.fail(res.data.msg);
        }
      });
    }
  }
};
</script>
<style scoped>
.content {
  padding: 0 30px;
}
.mt_120 {
  margin-top: 24%;
}
.mt_30 {
  margin-top: 6%;
}
.mt_18 {
  margin-top: 3.6%;
}
.login_btn {
  width: 100%;
  height: 98px;
  background: rgba(7, 140, 169, 1);
  border-radius: 10px;
  font-size: 36px;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}
.text_btn_top {
  margin: 48px 0 0 0;
}
.text_btn {
  border: none;
  width: 100%;
  font-size: 28px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
  line-height: 40px;
  text-align: center;
}

.fr {
  float: right;
}

.content {
  padding: 0 30px;
}
.t1 {
  font-size: 48px;
  font-weight: 500;
  color: rgba(68, 68, 68, 1);
}
.t2 {
  font-size: 28px;
  font-weight: 400;
  color: rgba(68, 68, 68, 1);
}
.t3 {
  font-size: 24px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
}
.t4 {
  font-size: 28px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  letter-spacing: 1px;
}
.t5 {
  font-size: 28px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(7, 140, 169, 1);
  line-height: 40px;
  letter-spacing: 1px;
}
.mt_60 {
  margin-top: 18%;
}
.input {
  background: rgba(255, 255, 255, 1);
  border-radius: 10px;
  border: 1px solid rgba(204, 204, 204, 1);
  height: 98px;
  padding-top: 25px;
  font-size: 28px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
.l_btn {
  height: 98px;
  background: rgba(7, 140, 169, 1);
  border-radius: 9px;
  font-size: 32px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  width: 100%;
}
.r_btn {
  height: 98px;
  background: rgba(250, 250, 250, 1);
  border-radius: 9px;
  border: 1px solid rgba(221, 221, 221, 1);
  font-size: 32px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  width: 100%;
}

.check_box {
  float: left;
  width: 32px;
  height: 32px;
  border: 1px solid rgba(7, 140, 169, 1);
  border-radius: 32px;
  margin-right: 10px;
}
.check_box_check {
  margin-top: 4px;
  margin-left: 4px;
  border-radius: 26px;
  width: 24px;
  height: 24px;
  background: rgba(7, 140, 169, 1);
}
.register_btn {
  margin-top: 48px;
  width: 100%;
  text-align: center;
  font-size: 28px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
}
.register_btn_click {
  color: #078ca9 !important;
}
</style>
