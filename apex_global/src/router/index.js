import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import HomePage from '@/components/homePage'
import RecruitPage from '@/components/recruitPage'
import ServicesPage from '@/components/servicesPage'
import InformationPage from '@/components/informationPage'
import AboutPage from '@/components/aboutPage'
import VipPage from '@/components/vipPage'

Vue.use(Router)
const VueRouterPush = Router.prototype.push
Router.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'Home',
    component: Home,
    children: [{
        path: '/',
        name: 'homePage',
        component: HomePage,
        meta: {
          title: "首页"
        }
      },
      {
        path: '/recruit',
        name: 'recruitPage',
        component: RecruitPage,
        meta: {
          title: "寰球直聘"
        }
      },
      {
        path: '/services',
        name: 'servicesPage',
        component: ServicesPage,
        meta: {
          title: "企业服务"
        }
      },
      {
        path: '/information',
        name: 'informationPage',
        component: InformationPage,
        meta: {
          title: "行业资讯"
        }
      },
      {
        path: '/about',
        name: 'aboutPage',
        component: AboutPage,
        meta: {
          title: "关于我们"
        }
      },
      {
        path: '/vip',
        name: 'vipPage',
        component: VipPage,
        meta: {
          title: "寰球会员"
        }
      },
    ]
  }]
})
