import Vue from 'vue'
import App from './App.vue'

//router路由
import router from './router/index'

//element组件库
import ElementUI from 'element-ui'
import '../theme/index.css'
Vue.use(ElementUI)

//自定义图标
import './assets/iconfont/iconfont.css'

//store状态管理
import store from './vuex/store'

//axios http库
import axios from 'axios'
import VueAxios from 'vue-axios'
import Qs from 'qs'  // 用于转换请求数据的内置组件
Vue.use(VueAxios, axios)
Vue.prototype.Qs = Qs

Vue.config.productionTip = false

// Vue.prototype.myIp = "http://192.168.43.10:8080/"
// Vue.prototype.myIp = "http://10.4.123.236:8080/"
// Vue.prototype.myIp = "http://172.20.10.9:8080/"
Vue.prototype.myIp = "http://localhost:8080/"




new Vue({
  render: h => h(App),
  store,
  router,
  
}).$mount('#app')

// router注册全局守卫
// router.beforeEach((to, from, next) => {
//   if (store.state.loginStatus) {
//     console.log('已登录')
//     if (to.name === 'login') {
//       console.log('已经登录了，请先退出')
//       next(false)
//     } else {
//       next()
//       // router.replace({ path: '/' })
//     }
//   }else {
//     console.log('未登录')
//     // router.replace({ path: './login' })
//
//     next('/login')
//   }
// })


// new Vue({
//   el: '#app',
//   render: function (createElement) {
//     return createElement(App)
//   }
// })
