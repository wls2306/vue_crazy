// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css';
import global from './global_variable'
import qs from 'qs'
Vue.prototype.GLOBAL=global
Vue.prototype.$axios = axios;
Vue.prototype.qs=qs;
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(qs)



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
