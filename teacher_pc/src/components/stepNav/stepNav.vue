<template>
  <div class="step_wrapper clearfix">
    <el-row :gutter="10">
      <el-col :xs="5" :sm="5" :md="5" class="logo_wrapper">
        <img
          src="../../assets/image/login_logo_1.png"
          class="logo"
          @click="clickLogo"
        />
      </el-col>
      <el-col :xs="13" :sm="13" :md="13">
        <p class="top_tips fl">
          This is the best platform to be a teacher in China
        </p>
      </el-col>
      <el-col :xs="6" :sm="6" :md="6">
        <div class="right_wrapper">
          <span class="right_name">{{ userInfo.nick_name }}</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getInfoByToken } from "../../apis/baseUrls";
export default {
  name: "stepNav",
  data() {
    return {
      userInfo: {},
      token: ""
    };
  },
  created() {
    this.token = localStorage.getItem("token");
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
      } else {
        this.$message.error(res.data.msg);
      }
    },
    //   点击logo
    clickLogo() {
      this.$router.push("/");
    }
  }
};
</script>
<style scoped>
.step_wrapper {
  min-width: 1200px;
  height: 80px;
  background: #1f2532;
  line-height: 80px;
}
.logo_wrapper {
  display: flex;
  align-items: center;
  height: 80px;
}
.logo {
  margin-left: 40px;
  width: 160px;
  height: 34px;
  cursor: pointer;
}
.top_tips {
  width: 376px;
  height: 22px;
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
}
.right_wrapper .right_name {
  display: inline-block;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  vertical-align: top;
}
.right_wrapper .down_icon {
  display: inline-block;
  margin-top: 32px;
  width: 16px;
  height: 16px;
  cursor: pointer;
}
</style>
