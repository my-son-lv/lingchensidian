<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="isRouterAlive"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import Login from "./components/login/login.vue";
import Home from "./components/home/home.vue";
import Checklist from "./components/checklist/checklist.vue";
import Teachlist from "./components/teachlist/teachlist.vue";
import Checkinfo from "./components/checkinfo/checkinfo.vue";
import Teachinfo from "./components/teachinfo/teachinfo.vue";
import Companychecklist from "./components/companychecklist/companychecklist.vue";
import Companycheckinfo from "./components/companycheckinfo/companycheckinfo.vue";
import Companylist from "./components/companylist/companylist.vue";
import Companyinfo from "./components/companyinfo/companyinfo.vue";
import Createaccount from "./components/createaccount/createaccount.vue";
import TalentManagement from "./components/talentManagement/talentManagement.vue";
import Jobdesc from "./components/jobdesc/jobdesc.vue";
import InterviewList from "./components/interviewList/interviewList";
import Joblist from "./components/joblist/joblist";
import Interview from "./components/interview/interview";
import RealTimeCall from "./components/realTimeCall/realTimeCall";
import Sign from "./components/sign/sign.vue";
import Signawait from "./components/signawait/signawait.vue";

export default {
  name: "App",
  components: {
    Login,
    Home,
    Checklist,
    Teachlist,
    Checkinfo,
    Teachinfo,
    Companychecklist,
    Companycheckinfo,
    Companylist,
    Companyinfo,
    Createaccount,
    TalentManagement,
    Jobdesc,
    InterviewList,
    Joblist,
    Interview,
    RealTimeCall,
    Sign,
    Signawait,
  },
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isRouterAlive: true,
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    },
  },
};

// console.log = function(){}
</script>

