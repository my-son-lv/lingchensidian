// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/router.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/common.css'
import filter from './filter/filter';
import Avatar from '../src/tim/src/components/avatar.vue'
import store from './tim/src/store/index'
import tim from './tim/src/tim'
import TIM from 'tim-js-sdk'

import {
  post,
  fetch,
  patch,
  put,
  baseURL
} from '../src/request/http.js'
import {
  userManager
} from '../src/tools/user.js'
import './tim/src/assets/icon/iconfont.css'
import './tim/src/assets/icon/tim.css'

Vue.prototype.$post = post
Vue.prototype.$fetch = fetch
Vue.prototype.$patch = patch
Vue.prototype.$put = put
Vue.prototype.$baseURL = baseURL
Vue.prototype.$userManager = userManager
window.tim = tim
window.TIM = TIM
window.store = store
Vue.prototype.$bus = new Vue() // event Bus 用于无关系组件间的通信。
Vue.prototype.tim = tim
Vue.prototype.TIM = TIM
Vue.prototype.$store = store
Vue.component('avatar', Avatar)

Vue.use(ElementUI)


Vue.config.productionTip = false
Vue.config.devtools = true

for (let key in filter) {
  Vue.filter(key, filter[key]);
}
/* eslint-disable no-new */
new Vue({
  router,
  el: '#app',
  components: {
    App
  },
  template: '<App/>'
})
