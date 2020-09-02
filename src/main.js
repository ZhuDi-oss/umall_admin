// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

// 引入css
import "./assets/css/reset.css"

// 公共组件引入
import Components from './components/index'
for (let i in Components) {
  Vue.component(i, Components[i]);
}

// 过滤器引入
import Filters from './filters/index'
for (let i in Filters) {
  Vue.Filter(i, Filters[i])
}

// 引入库
import store from './store'

// 数据请求，不需要引入到main.js页面中

// 引入element ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)


Vue.prototype.$preImg = "http://localhost:3000"



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
