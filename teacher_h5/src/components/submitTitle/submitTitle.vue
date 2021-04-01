<!-- 提交页公共头部 -->
<template>
  <div class="title_wrapper">
    <div class="back_btn fl" @click="goBack">
      <svg
        t="1592964582990"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2107"
        data-spm-anchor-id="a313x.7781069.0.i1"
        width="25"
        height="44"
      >
        <path
          d="M665.6 1011.2 716.8 972.8 345.6 512 716.8 51.2 665.6 12.8 262.4 512Z"
          p-id="2108"
          fill="#ffffff"
        />
      </svg>
    </div>
    <div class="title_con fl">{{this.titleContent}}</div>
    <div class="customer_service fr">
      <img src="../../assets/service.png" />
    </div>
  </div>
</template>

<script>
export default {
  name: "submitTitle",
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props: ["titleContent"],
  data() {
    //这里存放数据
    return {};
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {}
};
</script>
<style scoped>
.title_wrapper {
  width: 100%;
  height: 88px;
  background: rgba(7, 140, 169, 1);
  display: flex;
  align-items: center;
}
.back_btn {
  margin-left: 30px;
}
.title_con {
  flex: 1;
  text-align: center;
  font-size: 36px;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  letter-spacing: 1px;
}
.customer_service {
  margin-right: 30px;
  width: 44px;
}
.customer_service img {
  width: 44px;
  height: 44px;
}
</style>