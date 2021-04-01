<template>
  <div class="login-wrapper"></div>
</template>

<script>
export default {
  name: "Login",
  components: {},
  data() {
    return {};
  },
  methods: {
    async getToken() {
      let res = await this.$post("getInfoByToken");
      if (res.code == 200) {
        let userSig = res.data.im_user_sig;
        let userId = res.data.im_user_id;

        sessionStorage.setItem("companyUserSig", userSig);
        sessionStorage.setItem("companyUserId", userId);

        // 初始化监听器
        this.login();
      }
    },
    login() {
      this.loading = true;
      this.tim
        .login({
          userID: sessionStorage.getItem("companyUserId"),
          userSig: sessionStorage.getItem("companyUserSig")
        })
        .then(() => {
          this.loading = false;
          this.$store.commit("toggleIsLogin", true);
          this.$store.commit("startComputeCurrent");
          this.$store.commit({
            type: "GET_USER_INFO",
            userID: sessionStorage.getItem("companyUserId"),
            userSig: sessionStorage.getItem("companyUserSig"),
            sdkAppID: 1400449978
          });
          this.$store.commit("showMessage", {
            type: "success",
            message: "连接成功"
          });
        })
        .catch(error => {
          this.loading = false;
          this.$store.commit("showMessage", {
            message: "连接失败：" + error.message,
            type: "error"
          });
        });
    }
  },
  mounted() {
    this.getToken();
  }
};
</script>

<style lang="stylus" scoped></style>
