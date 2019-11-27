import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'

import App from './App'

import './config/bootstrap'
import './config/msgs'
import './config/axios'
import './config/mq'
import store from './config/store'
// eslint-disable-next-line no-unused-vars
import router from './config/router'

Vue.config.productionTip = false

//TEMPORARIO!
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')