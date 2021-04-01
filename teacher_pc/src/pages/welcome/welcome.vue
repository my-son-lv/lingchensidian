<template>
  <div>
    <stepNav></stepNav>
    <div class="center_wrapper">
      <div class="con_wrapper">
        <h2 class="con_title">WELCOM TO APEX GLOBAL</h2>
        <p class="wel_tips">
          Please complete your profile to apply for a position and to be chosen
          from numerous employers.
        </p>
        <div class="apply_btn" @click="handleCLickApply">Apply</div>
      </div>
    </div>
  </div>
</template>
<script>
import stepNav from "../../components/stepNav/stepNav";
export default {
  name: "welcome",
  components: { stepNav },
  data() {
    return {};
  },
  created() {},
  computed: {},
  methods: {
    handleCLickApply() {
      this.$router.push("/firstStep");
    }
  }
};
</script>
<style scoped>
.center_wrapper {
  position: relative;
  width: 100%;
  height: 1000px;
  background: #1f2532;
}
.center_wrapper .con_wrapper {
  margin: 0 auto;
  width: 1180px;
  height: 100%;
  background: url("../../assets/image/welcome_bg.png") no-repeat;
  background-size: 802px 802px;
  background-position: 375px 0;
}
.con_wrapper .con_title {
  padding-top: 180px;
  font-size: 40px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
}
.con_wrapper .wel_tips {
  margin: 20px 0 60px 0;
  width: 500px;
  font-size: 18px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.6);
  line-height: 22px;
}
.con_wrapper .apply_btn {
  width: 240px;
  height: 60px;
  background: #ffffff;
  border-radius: 4px;
  border: 1px solid #979797;
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
  line-height: 60px;
  text-align: center;
  cursor: pointer;
}
</style>
