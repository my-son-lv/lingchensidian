<template>
  <div id="app">
    <!-- <router-view v-if="isRouterAlive"></router-view> -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
import Login from "./components/login/login.vue";
import Home from "./components/home/home.vue";
import Form from "./components/form/form.vue";
import Main from "./components/main/main.vue";
import Searchteach from "./components/searchteach/searchteach.vue";
import Teachdesc from "./components/teachdesc/teachdesc.vue";
import Collectlist from "./components/collectlist/collectlist.vue";
import Joblist from "./components/joblist/joblist.vue";
import Jobadd from "./components/jobadd/jobadd.vue";
import Jobedit from "./components/jobedit/jobedit.vue";
import Jobdesc from "./components/jobdesc/jobdesc.vue";
import Inerviewlist from "./components/inerviewlist/inerviewlist.vue";
import Inerview from "./components/inerview/inerview.vue";
import RealTimeCall from "./components/realTimeCall/realTimeCall";

export default {
  name: "App",
  components: {
    Login,
    Home,
    Form,
    Main,
    Searchteach,
    Teachdesc,
    Collectlist,
    Joblist,
    Jobadd,
    Jobedit,
    Jobdesc,
    Inerviewlist,
    Inerview,
    RealTimeCall
  },
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      isRouterAlive: true
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    }
  }
};
</script>

<style>
</style>
