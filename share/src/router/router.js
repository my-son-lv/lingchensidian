import Vue from 'vue'
import VueRouter from 'vue-router'

import Share from '../components/share/share'
import Shareinfo from '../components/shareinfo/shareinfo'
import shareImg from '../components/shareImg/shareImg'
import Router from 'vue-router'; //如果已引用，不需要重复引用

Vue.use(VueRouter)
const VueRouterPush = Router.prototype.push
Router.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

const router = new VueRouter({
  routes: [{
      path: '/',
      redirect: '/share'
    },
    {
      path: '/share',
      name: 'share',
      component: Share
    },
    {
      path: '/shareinfo',
      name: 'shareinfo',
      component: Shareinfo
    },
    {
      path: '/shareImg',
      name: 'shareImg',
      component: shareImg
    },
  ]
})

export default router
