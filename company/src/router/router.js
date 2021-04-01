import Vue from 'vue'
import VueRouter from 'vue-router'
import Router from 'vue-router'; //如果已引用，不需要重复引用
import Login from '../components/login/login'
import Home from '../components/home/home'
import Form from '../components/form/form'
import Main from '../components/main/main'
import Searchteach from '../components/searchteach/searchteach'
import Teachdesc from '../components/teachdesc/teachdesc'
import Collectlist from '../components/collectlist/collectlist'
import Joblist from '../components/joblist/joblist'
import Jobadd from '../components/jobadd/jobadd'
import Jobedit from '../components/jobedit/jobedit'
import Jobdesc from '../components/jobdesc/jobdesc'
import Inerviewlist from '../components/inerviewlist/inerviewlist'
import Inerview from '../components/inerview/inerview'
import RealTimeCall from '../components/realTimeCall/realTimeCall.vue'
import Ucenter from '../components/ucenter/ucenter.vue'
import ChangeAccount from '../components/changeAccount/changeAccount.vue'
import Resumelist from '../components/resumelist/resumelist.vue'

Vue.use(VueRouter)
const VueRouterPush = Router.prototype.push
Router.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

const router = new VueRouter({
  // mode: 'history',
  routes: [{
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: 'RealTimeCall',
      name: 'realTimeCall',
      component: RealTimeCall,
      meta: {
        title: "视频面试"
      }
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [{
          path: 'form',
          name: 'form',
          component: Form
        },
        {
          path: 'jobadd',
          name: 'jobadd',
          component: Jobadd,
          meta: {
            title: "创建职位"
          }
        },
        {
          path: 'jobdesc',
          name: 'jobdesc',
          component: Jobdesc,
          meta: {
            title: "职位详情"
          }
        }
      ]
    },
    {
      path: '/main',
      name: 'main',
      component: Main,
      redirect: 'main/searchteach',
      children: [{
          path: 'searchteach',
          name: 'searchteach',
          component: Searchteach,
          meta: {
            title: "探索外教",
           keepAlive: true,
          }
        },
        {
          path: 'searchteach/teachdesc',
          name: 'teachdesc',
          component: Teachdesc,
          meta: {
            title: "外教详情"
          }
        },
        {
          path: 'collectlist',
          name: 'collectlist',
          component: Collectlist,
          meta: {
            title: "备选外教"
          }
        },
        {
          path: 'resumelist',
          name: 'resumelist',
          component: Resumelist,
          meta: {
            title: "外教简历"
          }
        },
        {
          path: 'collectlist/teachdesc',
          component: Teachdesc,
          meta: {
            title: "外教详情"
          }
        },
        {
          path: 'joblist',
          name: 'joblist',
          component: Joblist,
          meta: {
            title: "发布职位"
          }
        },
        {
          path: 'jobadd',
          name: 'jobadd',
          component: Jobadd,
          meta: {
            title: "创建职位"
          }
        },
        {
          path: 'jobedit',
          name: 'jobedit',
          component: Jobedit,
          meta: {
            title: "编辑职位"
          }
        },
        {
          path: 'joblist/jobdesc',
          name: 'jobdesc',
          component: Jobdesc,
          meta: {
            title: "职位详情"
          }
        },
        {
          path: 'inerviewlist',
          name: 'inerviewlist',
          component: Inerviewlist,
          meta: {
            title: "人才管理"
          },
        },
        {
          path: 'inerviewlist/teachdesc',
          component: Teachdesc,
          meta: {
            title: "外教详情"
          }
        },
        {
          path: 'inerview',
          name: 'inerview',
          component: Inerview,
          meta: {
            title: "面试管理"
          }
        },
        {
          path: 'inerview/teachdesc',
          component: Teachdesc,
          meta: {
            title: "外教详情"
          }
        },
        {
          path: 'ucenter',
          name: 'ucenter',
          component: Ucenter,
          meta: {
            title: "账户管理"
          }
        },
        {
          path: 'ucenter/changeAccount',
          name: 'changeAccount',
          component: ChangeAccount,
          meta: {
            title: "修改账号"
          }
        }
      ]
    }
  ]
})

export default router
