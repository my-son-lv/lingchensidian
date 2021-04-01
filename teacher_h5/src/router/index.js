import Vue from 'vue'
import Router from 'vue-router'
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error => error)
}
Vue.use(Router)

const routes = [
    {
        path: '/',
        redirect: '/index'
    },
    {
        path: '/index',
        name: 'index',
        component: () => import( /* webpackChunkName:'index'*/ '@/pages/index/index')
    },
    {
        path: '/register',
        name: 'register',
        component: () => import( /* webpackChunkName:'register'*/ '@/pages/register/register')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import( /* webpackChunkName:'login'*/ '@/pages/login/login')
    },
    {
        path: '/resetPwd',
        name: 'resetPwd',
        component: () => import( /* webpackChunkName:'register'*/ '@/pages/resetPwd/resetPwd')
    },
    {
        path: '/home',
        name: 'home',
        component: () => import( /* webpackChunkName:'home'*/ '@/pages/home/home')
    },
    // 第一页信息
    {
        path: '/basicInformation',
        name: 'basicInformation',
        component: () => import( /* webpackChunkName:'basicInformation'*/ '@/pages/basicInformation/basicInformation')
    },
    // 第二页信息
    {
        path: '/contactInformation',
        name: 'contactInformation',
        component: () => import( /* webpackChunkName:'contactInformation'*/ '@/pages/contactInformation/contactInformation')
    },
    // 第三页信息
    {
        path: '/JobInformation',
        name: 'JobInformation',
        component: () => import( /* webpackChunkName:'JobInformation'*/ '@/pages/JobInformation/JobInformation')
    },
    // 预览页面

    {
        path: '/cancelApplication',
        name: 'cancelApplication',
        component: () => import( /* webpackChunkName:'cancelApplication'*/ '@/pages/cancelApplication/cancelApplication')
    },
    // 审核结果
    {
        path: '/result',
        name: 'result',
        component: () => import( /* webpackChunkName:'result'*/ '@/pages/result/result')
    },
    // jobs
    {
        path: '/jobs',
        name: 'jobs',
        component: () => import( /* webpackChunkName:'jobs'*/ '@/pages/jobs/jobs')
    },
    // blog
    {
        path: '/blog',
        name: 'blog',
        component: () => import( /* webpackChunkName:'blog'*/ '@/pages/blog/blog')
    },
    // service
    {
        path: '/service',
        name: 'service',
        component: () => import( /* webpackChunkName:'service'*/ '@/pages/service/service')
    },
    // jobsDetails
    {
        path: '/jobsDetails',
        name: 'jobsDetails',
        component: () => import( /* webpackChunkName:'jobsDetails'*/ '@/pages/jobsDetails/jobsDetails')
    },
    // serviceDetails
    {
        path: '/serviceDetails',
        name: 'serviceDetails',
        component: () => import( /* webpackChunkName:'serviceDetails'*/ '@/pages/serviceDetails/serviceDetails')
    },
];
const router = new Router({
    routes
});
// 路由判断登录 根据路由配置文件的参数
// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requireAuth)) {
//     if (localStorage.PARENT_TOKEN) {
//       next();
//     } else {
//       next({
//         path: '/login',
//         query: {
//           redirect: to.fullPath
//         }
//       })
//     }
//   } else {
//     if (to.meta.title) {
//       document.title = to.meta.title
//     }
//     next();
//   }
// });
export default router;