import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router/index'; // 引入路由

Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router, // 使用路由
  render: h => h(App),
}).$mount('#app')