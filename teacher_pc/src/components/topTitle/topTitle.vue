<template>
  <div class="top_title_wrapper">
    <div class="content">{{this.Parentcontent}}</div>
    <el-progress :text-inside="true" :stroke-width="26" :percentage="progressNum" color="#C4DF16"></el-progress>
  </div>
</template>
<script>
export default {
  props: ['Parentcontent', 'progressNum'],
  data() {
    return {
    }
  },
  created() {
  },
  computed: {
  },
  methods: {
  },
}
</script>
<style scoped>
.top_title_wrapper {
  margin: 20px auto;
  padding: 40px;
  width: 940px;
  height: 144px;
  background: #1f2532;
  border-radius: 10px;
}
.top_title_wrapper .content {
  margin-bottom: 40px;
  /* width: 645px; */
  font-size: 24px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
  line-height: 32px;
}
/deep/ .el-progress-bar__outer {
  height: 40px !important;
  border-radius: 10px;
  border: 1px solid #c4df16;
  background: #1f2532;
}
/deep/ .el-progress-bar__inner {
  border-radius: 10px;
}
/deep/ .el-progress-bar__innerText {
  margin: 0 40px;
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
}
</style>
