// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import filter from "./filter/filter";
import SocialSharing from "vue-social-sharing";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import 'font-awesome/css/font-awesome.css'
import locale from 'element-ui/lib/locale/lang/en'

library.add(faCoffee)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false;
Vue.use(ElementUI,{locale});
Vue.use(SocialSharing);
for (let key in filter) {
  Vue.filter(key, filter[key]);
}


router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
});
/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  SocialSharing,
  components: { App },
  template: "<App/>"
});
