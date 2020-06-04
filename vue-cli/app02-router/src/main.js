import Vue from 'vue'
import router from './router'
import './plugins/element.js'

// 导入首页
import App from './App.vue'
// 导入登录页面
import Login from './Login.vue'
// 自定义样式
import './style/common.css'

// 阻止启动生产消息,常用作指令。
Vue.config.productionTip = false

let vm = new Vue({
  router,
  data() {
    return {
      token: localStorage.getItem('token')
    }
  },
  render: function (createElement) {
    let page = Login;
    if (this.token) {
      page = App
    }
    return createElement(page);
  }
}).$mount('#app');

// 将vm设置到全局window
window.vm = vm;