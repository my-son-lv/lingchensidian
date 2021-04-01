import Vue from "vue";
import VueRouter from "vue-router";
import Router from "vue-router"; //如果已引用，不需要重复引用
import Login from "../components/login/login";
import Home from "../components/home/home";
import Checklist from "../components/checklist/checklist";
import Teachlist from "../components/teachlist/teachlist";
import Checkinfo from "../components/checkinfo/checkinfo";
import Teachinfo from "../components/teachinfo/teachinfo";
import Companychecklist from "../components/companychecklist/companychecklist";
import Companycheckinfo from "../components/companycheckinfo/companycheckinfo";
import Companylist from "../components/companylist/companylist";
import Companyinfo from "../components/companyinfo/companyinfo";
import Createaccount from "../components/createaccount/createaccount";
import TalentManagement from "../components/talentManagement/talentManagement";
import Jobdesc from "../components/jobdesc/jobdesc";
import InterviewList from "../components/interviewList/interviewList.vue";
import Joblist from "../components/joblist/joblist.vue";
import Interview from "../components/interview/interview.vue";
import RealTimeCall from "../components/realTimeCall/realTimeCall.vue";
import Sign from "../components/sign/sign.vue";
import Signstart from "../components/signstart/signstart.vue";
import Signawait from "../components/signawait/signawait.vue";
import Contract from "../components/contract/contract.vue";
import Signinfo1 from "../components/signinfo1/signinfo1.vue";
import Signinfo2 from "../components/signinfo2/signinfo2.vue";
import Signinfo3 from "../components/signinfo3/signinfo3.vue";
import Signinfo4 from "../components/signinfo4/signinfo4.vue";
import Signinfo5 from "../components/signinfo5/signinfo5.vue";
import Signinfo6 from "../components/signinfo6/signinfo6.vue";
import teacherMessage from "../components/teacherMessage/teacherMessage.vue";
import checkMessage from "../components/checkMessage/checkMessage.vue";
import companyMessage from "../components/companyMessage/companyMessage.vue";
import activityList from "../components/activityList/activityList.vue";
import addActivity from "../components/addActivity/addActivity.vue";
import companyPositionList from "../components/companyPositionList/companyPositionList";
import companyPositionDesc from "../components/companyPositionDesc/companyPositionDesc";
import memberList from "../components/memberList/memberList.vue";
import memberTypeList from "../components/memberTypeList/memberTypeList.vue";
import addMemberType from "../components/addMemberType/addMemberType.vue";
import addMember from "../components/addMember/addMember.vue";
import historicalNews from "../components/historicalNews/historicalNews.vue";

Vue.use(VueRouter);
const VueRouterPush = Router.prototype.push;
Router.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err);
};

const router = new VueRouter({
  routes: [
    {
      path: "/",
      redirect: "/login"
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/realTimeCall",
      name: "realTimeCall",
      component: RealTimeCall
    },
    {
      path: "/home",
      name: "home",
      component: Home,
      children: [
        {
          path: "checklist",
          name: "checklist",
          component: Checklist,
          meta: { keepAlive: true }
        },
        {
          path: "teachlist",
          name: "teachlist",
          component: Teachlist,
          meta: { keepAlive: true }
        },
        {
          path: "checkinfo",
          name: "checkinfo",
          component: Checkinfo,
          meta: {
            title: "外教详情",
            keepAlive: false
          }
        },
        {
          path: "teachinfo",
          name: "teachinfo",
          component: Teachinfo,
          meta: {
            title: "外教详情",
            keepAlive: false
          }
        },
        {
          path: "teacherMessage",
          name: "teacherMessage",
          component: teacherMessage,
          meta: {
            title: "外教信息",
            keepAlive: false
          }
        },
        {
          path: "checkMessage",
          name: "checkMessage",
          component: checkMessage,
          meta: {
            title: "外教信息",
            keepAlive: false
          }
        },
        {
          path: "companyMessage",
          name: "companyMessage",
          component: companyMessage,
          meta: {
            title: "企业信息",
            keepAlive: false
          }
        },
        {
          path: "companychecklist",
          name: "companychecklist",
          component: Companychecklist,
          meta:{
            keepAlive: true
          }
        },
        {
          path: "companycheckinfo",
          name: "companycheckinfo",
          component: Companycheckinfo,
          meta: {
            title: "企业详情",
            keepAlive: false
          }
        },
        {
          path: "companylist",
          name: "companylist",
          component: Companylist,
          meta: {
            keepAlive: true
          }
        },
        {
          path: "companyinfo",
          name: "companyinfo",
          component: Companyinfo,
          meta: {
            keepAlive: false
          }
        },
        {
          path: "companyPositionList",
          name: "companyPositionList",
          component: companyPositionList
        },
        {
          path: "companyPositionDesc",
          name: "companyPositionDesc",
          component: companyPositionDesc,
          meta: {
            title: "职位介绍"
          }
        },
        {
          path: "createaccount",
          name: "createaccount",
          component: Createaccount
        },
        {
          path: "talentManagement",
          name: "talentManagement",
          component: TalentManagement,
          meta: {
            title: "人才管理"
          }
        },
        {
          path: "jobdesc",
          name: "jobdesc",
          component: Jobdesc
        },
        {
          path: "interviewList",
          name: "interviewList",
          component: InterviewList
        },
        {
          path: "joblist",
          name: "joblist",
          component: Joblist,
          meta: {
            title: "企业招聘需求"
          }
        },
        {
          path: "interview",
          name: "interview",
          component: Interview
        },
        {
          path: "sign",
          name: "sign",
          component: Sign
        },
        {
          path: "signawait",
          name: "signawait",
          component: Signawait
        },
        {
          path: "signstart",
          name: "signstart",
          component: Signstart,
          meta: {
            title: "发起签约"
          }
        },
        {
          path: "contract",
          name: "contract",
          component: Contract,
          meta: {
            title: "合同库"
          }
        },
        {
          path: "signinfo1",
          name: "signinfo1",
          component: Signinfo1,
          meta: {
            title: "补全信息"
          }
        },
        {
          path: "signinfo2",
          name: "signinfo2",
          component: Signinfo2,
          meta: {
            title: "补全信息"
          }
        },
        {
          path: "signinfo3",
          name: "signinfo3",
          component: Signinfo3,
          meta: {
            title: "补全信息"
          }
        },
        {
          path: "signinfo4",
          name: "signinfo5",
          component: Signinfo4,
          meta: {
            title: "补全信息"
          }
        },
        {
          path: "signinfo5",
          name: "signinfo5",
          component: Signinfo5,
          meta: {
            title: "补全信息"
          }
        },
        {
          path: "signinfo6",
          name: "signinfo6",
          component: Signinfo6,
          meta: {
            title: "补全信息"
          }
        },
        {
          path: "activityList",
          name: "activityList",
          component: activityList
        },
        {
          path: "addActivity",
          name: "addActivity",
          component: addActivity,
          meta: {
            title: "添加广告"
          }
        },
        {
          path: "memberList",
          name: "memberList",
          component: memberList,
          meta: {
            title: "会员管理列表"
          }
        },
        {
          path: "memberTypeList",
          name: "memberTypeList",
          component: memberTypeList,
          meta: {
            title: "会员类型列表"
          }
        },
        {
          path: "addMemberType",
          name: "addMemberType",
          component: addMemberType,
          meta: {
            title: "添加会员类型"
          }
        },

        {
          path: "addMember",
          name: "addMember",
          component: addMember,
          meta: {
            title: "添加会员"
          }
        },
        {
          path: "historicalNews",
          name: "historicalNews",
          component: historicalNews,
          meta: {
            title: "平台通知"
          }
        }
      ]
    }
  ]
});
export default router;
