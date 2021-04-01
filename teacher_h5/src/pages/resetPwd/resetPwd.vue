<!--  -->
<template>
  <div>
    <commonNav></commonNav>
    <div class="content">
      <div class="t1 mt_120">CHANGE PASSWORD</div>

      <div class="t2 mt_60">E-mail</div>
      <van-field class="input mt_18" v-model="info.email" />

      <div class="t2 mt_30">Verifcation code</div>
      <van-row gutter="30" class="mt_18">
        <van-col span="16">
          <van-field class="input" maxlength="6" v-model="info.code" />
        </van-col>
        <van-col span="8">
          <van-button type="info" class="l_btn" @click="send()" :loading="send_loading" :loading-text="send_title.toString()">Send</van-button>
        </van-col>
      </van-row>
      <div class="t3 mt_30">We will send you a verification code to your E-mail</div>

      <div class="t2 mt_30">Password</div>
      <van-field class="input mt_18" maxlength="20" v-model="info.password" type="password" />
      <div class="t2 mt_30">Confirm Password</div>
      <van-field class="input mt_18" maxlength="20" v-model="confirm_pwd" type="password" />

      <van-row gutter="20" class="mt_60" style="margin-bottom: 60px">
        <van-col span="12">
          <van-button type="info" class="l_btn" @click="submit()">Sign in</van-button>
        </van-col>
        <van-col span="12">
          <van-button type="info" class="r_btn" @click="cancel()">Cancel</van-button>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import commonNav from "../../components/commonNav/commonNav";
import { Toast } from "vant";
import { forgetPassword } from "../../apis/baseUrls";
import { sendCode } from "../../apis/baseUrls";

export default {
  name: "resetPwd",
  //import引入的组件需要注入到对象中才能使用
  components: { commonNav },
  data() {
    //这里存放数据
    return {
      timeInterval: Object,
      send_title: 60,
      send_loading: false,
      info: {
        email: "",
        code: "",
        password: ""
      },
      confirm_pwd: ""
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    cancel() {
      this.$router.push('/register');
    },
    send() {
      // 检查用户名和邮箱
      this.send_code();
    },
    send_code() {
      sendCode({ email: this.info.email }).then(res => {
        if (res.data.code == 200) {
          setTimeout(function () {
            Toast("send successfully.");
          }, 500);

          let that = this;
          this.timeInterval = setInterval(function () {
            that.myTimer();
          }, 1000);
        } else {
          setTimeout(function () {
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
      if (this.info.code.length < 6) {
        Toast("Verification code must be 6 characters");
      } else if (this.info.password != this.confirm_pwd) {
        Toast("Passswords do not match, please re-enter.");
      } else if (this.info.password.length < 6) {
        Toast("Password cannot be less than 6 characters");
      } else {
        forgetPassword(this.info).then(res => {
          console.log(JSON.stringify(res));
          if (res.data.code == 200) {
            // 修改密码成功
            Toast("Password reset successfully");
            this.$router.go(-1);
          } else {
            // 发送验失效
            setTimeout(function () {
              Toast("Verification Code Expire.");
            }, 500);
          }
        });
      }
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() { },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() { }
};
</script>
<style scoped>
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
.mt_120 {
  margin-top: 120px;
}
.mt_60 {
  margin-top: 60px;
}
.mt_30 {
  margin-top: 30px;
}
.mt_18 {
  margin-top: 18px;
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
}

.fr {
  float: right;
}
</style>
