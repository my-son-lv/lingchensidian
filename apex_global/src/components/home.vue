<template>
  <el-container>
    <el-header class="header" height="80px" style="padding: 0px;">
      <img class="logo" src="../assets/image/logo.png" v-on:click="nav_btn_click(0, '/')" />
      <div class="nav">
        <div class="nav_btn" v-for="(item, index) in nav_list" :key="index" @click="nav_btn_click(index, item.path)">
          <div class="nav_btn_text" :style="{color: nav_index == index ? 'rgba(7,140,169,1)' : 'rgba(51,51,51,1)'}">{{item.name}}</div>
          <div class="nav_btn_line" v-show="nav_index == index"></div>
        </div>
      </div>
      <a class="btn_p" href="https://company.apex.link" target="_self">企业登录</a>
      <a class="btn_d" href="https://teach.apex.link" target="_self">Job Search</a>
    </el-header>
    <el-main style="padding: 0px;">
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
(function(){
    var bp = document.createElement('script');
    var curProtocol = window.location.protocol.split(':')[0];
    if (curProtocol === 'https'){
   bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
  }
  else{
  bp.src = 'http://push.zhanzhang.baidu.com/push.js';
  }
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(bp, s);
})();
const nav_list = [
  { name: "首页", path: "/", sort: 1 },
  { name: "寰球直聘", path: "/recruit", sort: 2 },
  { name: "企业服务", path: "/services", sort: 3 },
  { name: "行业资讯", path: "/information", sort: 4 },
  { name: "关于我们", path: "/about", sort: 5 },
  { name: "寰球会员", path: "/vip", sort: 6 },
];

export default {
  name: "home",
  components: {},
  data() {
    return {
      nav_list: nav_list,
      nav_index: 0,
    };
  },
  computed: {},
  watch: {},
  methods: {
    goBack() {
      console.log("点击了浏览器的返回按钮");
      //   this.init_mune()
    },
    nav_btn_click(index, path) {
      if (this.nav_index == index) return;
      this.nav_index = index;
      this.$router.push({
        path: path,
      });
      document.scrollingElement.scrollTop = 0;
    },
  },
  created() {
    this.$bus.$on("nav_jump", (obj) => {
      this.nav_btn_click(obj, this.nav_list[obj].path);
    });
    this.nav_list.some((item, i) => {
      if (item.path === this.$route.path) {
        this.nav_index = item.sort - 1;
      }
    })
  },
  mounted() {
  },
};
</script>

<style scoped>
.el-container {
  overflow: hidden;
}
.header {
  width: 100%;
  height: 80px;
  position: fixed;
  background-color: white;
  z-index: 1;
}
.logo {
  width: 160px;
  height: 32px;
  margin-top: 24px;
  margin-left: 40px;
  cursor: pointer;
}

.btn_p {
  background-color: rgba(7, 140, 169, 1);
  border-radius: 2px;
  font-size: 16px;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  width: 104px;
  height: 40px;
  float: right;
  margin-top: 20px;
  cursor: pointer;
  border: none;
  line-height: 40px;
  text-align: center;
  margin-right: 40px;
  text-decoration: none;
}

.btn_d {
  width: 122px;
  height: 40px;
  border-radius: 2px;
  border: 1px solid rgba(7, 140, 169, 1);
  font-size: 16px;
  color: rgba(7, 140, 169, 1);
  float: right;
  margin-top: 20px;
  margin-right: 20px;
  background-color: white;
  cursor: pointer;
  line-height: 40px;
  text-align: center;
  text-decoration: none;
}
.nav {
  width: 640px;
  position: absolute;
  height: 80px;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
}

.nav_btn {
  height: 80px;
  width: 64px;
  margin-right: 40px;
  cursor: pointer;
  float: left;
}

.nav_btn_text {
  font-size: 16px;
  font-weight: 500;
  color: rgba(7, 140, 169, 1);
  margin-top: 29px;
  text-align: center;
}

.nav_btn_line {
  width: 32px;
  height: 4px;
  background: rgba(7, 140, 169, 1);
  margin-top: 10px;
  margin-left: 16px;
}
</style>