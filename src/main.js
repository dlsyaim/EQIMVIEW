import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router' 
import store from './store'

import i18n from './lang' // Internationalization

import echarts from 'echarts'

import '@/styles/index.scss' // global css
import './icons' // icon
import './permission'
import './errorLog' // error log

if (process.env.NODE_ENV === 'development') {
  require('./mock') // simulation data
} 

import * as filters from './filters' // global filters

Vue.prototype.$echarts = echarts
Vue.config.productionTip = false

Vue.use(ElementUI,{
  i18n: (key, value) => i18n.t(key, value)
});

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')