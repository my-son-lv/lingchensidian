// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import FastClick from 'fastclick'
import 'lib-flexible/flexible.js'
import Vant from 'vant';
import 'vant/lib/index.css';
import store from './store/index'
import 'font-awesome/css/font-awesome.css'

const device = navigator.userAgent.toLowerCase().match(/cpu iphone os (.*?) like mac os/)
if (!device || parseInt(device[1]) < 11) {
  FastClick.attach(document.body)
}
/* eslint-disable no-new */
Vue.use(Vant)
Vue.use(Vuex)
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  store,
  template: '<App/>'
})