import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

Vue.use(VueBaiduMap.default, {
  ak: 'lOWoOyHBWaBRkcAEQsz2orGCRWfgT9g6'
})

new Vue({
  render: h => h(App),
}).$mount('#app')

// #app指的是public/index.html中id为app的div