<template>
  <div class="toExaminePage_wrapper">
    <div v-show="userInfo.status == 1">
      <h5 class="top_title">Waiting for Approval</h5>
      <p class="top_tips">
        Your application has been submitted successfully, we will proceed with your application in 10mins, please contact vivian@apex.link if you have any concerns.
      </p>
      <p class="contact_tips">
         
      </p>
      <div class="phone_wrapper" style="margin-bottom:20px;">
        <img src="/static/images/phone_icon.png" class="lside_icon" />
        <p class="contact_con">+86 17001213999</p>
      </div>
      <div class="phone_wrapper">
        <img src="/static/images/emails_icon.png" class="lside_icon" />
        <p class="contact_con">vivian@apex.link</p>
      </div>
      <div class="btn_wrapper" @click="jumpIndex">Home page</div>
    </div>
    <div v-if="userInfo.status == 3">
      <img src="/static/images/fail_icon.png" class="fail_icon" />
      <p class="fail_con">
        We are so sorry to inform you that you didn't pass the application The
        reason is: <span v-if="userInfo.info != null">{{ userInfo.info }}</span>
      </p>
      <div class="fail_btn" @click="handleClickRefill">Revise and resubmit</div>
    </div>
  </div>
</template>
<script>
import { getInfoByToken } from "../../apis/baseUrls";
export default {
  name: "toExaminePage",
  data() {
    return {
      userInfo: {},
      token: ""
    };
  },
  created() {
    this.token = localStorage.getItem("token");
    this.$emit("passParentNum", 0);
    if (this.token) {
      this.getUserInfo();
    }
  },
  computed: {},
  methods: {
    // 获取用户信息
    async getUserInfo() {
      let res = await getInfoByToken({
        token: this.token
      });
      if (res.data.code == 200) {
        this.userInfo = res.data.data;
        if (this.userInfo.status == 2) {
          this.$router.replace("/myResume");
        }
      } else {
        this.$message.error(res.data.msg);
      }
    },
    // 重新填写
    handleClickRefill() {
      this.$router.push("/firstStep");
    },
    // 跳转首页
    jumpIndex() {
      this.$router.push("/");
    }
  }
};
</script>
<style scoped>
.toExaminePage_wrapper {
  padding: 40px;
  width: 100%;
  height: 518px;
  background: #ffffff;
  border-radius: 10px;
  box-sizing: border-box;
}
.toExaminePage_wrapper .top_title {
  margin-bottom: 20px;
  font-size: 24px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
}
.toExaminePage_wrapper .top_tips,
.toExaminePage_wrapper .contact_tips {
  width: 859px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
  line-height: 22px;
}
.toExaminePage_wrapper .contact_tips {
  margin: 20px 0 40px 0;
}
.toExaminePage_wrapper .phone_wrapper {
  display: flex;
  align-items: center;
  width: 900px;
  height: 80px;
  background: #f8f8f8;
  border-radius: 10px;
}
.phone_wrapper .lside_icon {
  margin: 0 20px 0 40px;
  width: 20px;
  height: 20px;
}
.phone_wrapper .contact_con {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
}
.btn_wrapper {
  float: right;
  margin-top: 40px;
  width: 126px;
  height: 40px;
  background: #078ca9;
  border-radius: 4px;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  line-height: 40px;
  text-align: center;
  cursor: pointer;
}
.toExaminePage_wrapper .fail_icon {
  margin: 100px auto 0 auto;
  width: 40px;
  height: 40px;
}
.toExaminePage_wrapper .fail_con {
  margin: 20px 0 40px 0;
  width: 100%;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
  line-height: 22px;
  text-align: center;
}
.toExaminePage_wrapper .fail_btn {
  margin: 0 auto;
  width: 192px;
  height: 40px;
  background: #078ca9;
  border-radius: 4px;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  line-height: 40px;
  text-align: center;
  cursor: pointer;
}
</style>
