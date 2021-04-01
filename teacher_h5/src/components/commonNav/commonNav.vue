<!-- 提交页公共头部 -->
<template>
  <div class="title_wrapper">
    <img class="logo_img" src="../../assets/logo.png" @click="handleJumpIndex" />
    <img src="../../assets/service.png" @click="service_click" class="service_img" />
    <van-action-sheet v-model="show" :actions="actions" @select="onSelect" />
  </div>
</template>

<script>
import { ActionSheet } from 'vant'
export default {
  name: "submitTitle",
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      show: false,
      actions: [{ name: 'tel:+86 17001213999' }],
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    service_click() {
      this.show = true;
    },
    handleJumpIndex() {
      this.$router.push('/index');
    },
    onSelect(item) {
      this.show = false;
      window.location.href = 'tel:17001213999'
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() { },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() { }
};
</script>
<style scoped>
.title_wrapper {
  width: 100%;
  height: 88px;
  background: rgba(7, 140, 169, 1);
}

.logo_img {
  width: 242px;
  height: 60px;
  float: left;
  margin-top: 14px;
  margin-left: 30px;
}

.service_img {
  float: right;
  width: 44px;
  height: 44px;
  margin-right: 30px;
  margin-top: 22px;
}
.service_img img {
  width: 44px;
  height: 44px;
}
</style>