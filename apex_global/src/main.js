// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import './assets/css/common.css'
import 'element-ui/lib/theme-chalk/index.css'
import { post, fetch, patch, put, baseURL } from '../src/request/http.js'

Vue.prototype.$post = post
Vue.prototype.$fetch = fetch
Vue.prototype.$patch = patch
Vue.prototype.$put = put
Vue.prototype.$baseURL = baseURL
Vue.use(ElementUI)
Vue.config.productionTip = false

Vue.prototype.$bus = new Vue() // event Bus 用于无关系组件间的通信。


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
