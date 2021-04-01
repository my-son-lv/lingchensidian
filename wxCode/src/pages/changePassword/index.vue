// 修改密码
<template>
  <div class="indexContatiner">
    <div class="change_inputs">
      <input
        type="text"
        @blur="phoneRule"
        placeholder="请输入手机号"
        v-model="phone"
        class="user_phone"
        maxlength="11"
      />
      <div class="pass_word_wrapper clearfix">
        <input type="text" placeholder="请输入验证码" v-model="code" class="user_pass_word fl" />
        <p class="get_phone_code fl" v-show="getCodeType" @click="handleClickCode">获取验证码</p>
        <p class="get_phone_code fl" v-show="!getCodeType">已发送{{count}}s</p>
      </div>
      <input type="password" placeholder="请输入新密码" v-model="password" class="user_phone" />
      <input type="password" placeholder="确认密码" v-model="nextPassword" class="user_phone" />
    </div>
    <div class="confirm_btn" @click="handleClickConfirm">确认修改</div>
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
      phone: "",
      password: "",
      nextPassword: "",
      code: "",
      count: 0,
      getCodeType: true,
      timer: null
    };
  },

  components: {},

  methods: {
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
            url: "/api/company/sendCheckSms",
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
    // 确认修改
    handleClickConfirm() {
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
                url: "/api/company/companyRestPassword",
                data: {
                  phone: this.phone,
                  code: this.code,
                  password: this.password
                }
              })
              .then(res => {
                if (res.code == 200) {
                  Dialog.confirm({
                    message: "修改成功，请重新登录"
                  })
                    .then(() => {
                      // on confirm
                      wx.navigateTo({
                        url: "../../pages/login/main"
                      });
                    })
                } else {
                  Notify({ type: "warning", message: res.msg });
                }
              });
          }
        }
      }
    },
    phoneRule() {
      let reg = /^1[3-9][0-9]{9}$/;
      if (!reg.test(this.phone)) {
        Notify({ type: "warning", message: "请输入正确手机号" });
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
.change_inputs {
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
.van-notify {
  width: 100%;
}
.confirm_btn {
  margin-top: 24px;
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
</style>
