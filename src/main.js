import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


//加载 vant 组件库
import Vant from 'vant';
import 'vant/lib/index.css';


import './styles/index.less'


Vue.use(Vant);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
