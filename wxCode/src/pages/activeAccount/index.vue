// 更换手机号
<template>
  <div class="wrapper">
    <div class="input_wrapper">
      <input
        type="text"
        v-model="newPhone"
        @blur="phoneRule"
        class="new_phone"
        placeholder="请输入新手机号"
        maxlength="11"
      />
      <div class="code_wrapper">
        <input type="text" v-model="phoneCode" class="code" placeholder="验证码" maxlength="6" />
        <p class="code_con" v-show="getCodeType" @click.stop="handleClickCode">获取验证码</p>
        <p class="code_con" v-show="!getCodeType">已发送{{count}}s</p>
      </div>
      <div class="submit_btn" @click="hanleClickSubmit">确认</div>
    </div>
    <van-notify id="van-notify" class="van-notify" />
  </div>
</template>

<script>
import Notify from "@/../static/vant/notify/notify";
export default {
  data() {
    return {
      newPhone: "",
      phoneCode: "",
      count: 0,
      getCodeType: true,
      timer: null
    };
  },

  components: {},

  methods: {
    async phoneRule() {
      let reg = /^1[3-9][0-9]{9}$/;
      if (!reg.test(this.newPhone)) {
        Notify({ type: "warning", message: "请输入正确手机号" });
      }
    },
    // 获取验证码
    async handleClickCode() {
      if (this.newPhone == "") {
        Notify({ type: "warning", message: "请输入手机号" });
      } else {
        const res = await this.$httpWX.post({
          url: "/api/company/sendCheckSms",
          data: {
            phone: this.newPhone
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
    },
    // 修改
    async hanleClickSubmit() {
      let TOKEN = wx.getStorageSync("token");
      const res = await this.$httpWX.post({
        url: "/api/company/updatePhoneByCode",
        data: {
          token: TOKEN,
          phone: this.newPhone,
          code: this.phoneCode
        }
      });
      if (res.code == 200) {
        wx.redirectTo({
          url: "../../pages/accountOver/main"
        });
      } else {
        Notify({ type: "warning", message: res.msg });
      }
    }
  },
  beforeMount() {},
  onLoad() {
    Object.assign(this.$data, this.$options.data());
  },
  onUnload() {
    clearInterval(this.timer);
  }
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
.input_wrapper {
  margin-top: 48px;
  width: 90%;
}
.new_phone,
.code {
  padding-left: 24px;
  margin-bottom: 24px;
  height: 49px;
  background: #f8f8f8;
  border-radius: 4px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
  letter-spacing: 1px;
}
.code_wrapper {
  position: relative;
}
.code_con {
  position: absolute;
  top: 0;
  right: 16px;
  height: 49px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #078ca9;
  line-height: 49px;
  letter-spacing: 1px;
  z-index: 99;
}
.submit_btn {
  margin-top: 48px;
  width: 100%;
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
.van-notify {
  width: 100%;
}
</style>
