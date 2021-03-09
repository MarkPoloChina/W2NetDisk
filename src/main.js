// CopyRight Mark Polo 202102 - 202103 W2OL
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'bootstrap'
import 'jquery'
import Axios from 'axios'
import Qs from 'qs'
Vue.prototype.$axios = Axios
Vue.prototype.$qs = Qs
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
