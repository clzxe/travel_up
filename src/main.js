// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/icon/iconfont.css'
// 设置反向代理，前端请求默认发送到 http://localhost:8443/cardmis
import global from './components/global'
import axios from 'axios'
axios.defaults.baseURL='/travel'
axios.defaults.withCredentials=true
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import BaiduMap from 'vue-baidu-map'
Vue.use(ElementUI);

// 全局注册，之后可在其他组件中通过 this.$axios 发送数据
//前端发送跨域请求时默认是不会携带cookie的，前端使用axios.defaults.withCredentials=true
//res.setHeader("Access-Control-Allow-Credentials","true");

Vue.prototype.global=global;
Vue.prototype.$axios = axios;
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'LGVgx5ssMTH0AyM14HKD6gGtMlFmlGqu'
})
Vue.config.productionTip = false

if (module.hot) {
  module.hot.accept();
}
//全局前置钩子函数：router.beforeEach（），他的作用就是在每次路由切换的时候调用
// 这个钩子方法会接收三个参数：to、from、next。
// to：Route：即将要进入的目标的路由对象，
// from：Route：当前导航正要离开的路由，
// next：Function：就是函数结束后执行什么
router.beforeEach((to,from,next)=>{
    //如果路由器需要验证
    if(to.matched.some(m=>m.meta.auth)){
      //对路由进行验证
      if (sessionStorage.getItem("isLogin") === '0') {
        alert("您没有登录，无权访问！")
        // 未登录则跳转到登陆界面，query:{ redirect: to.fullPath}表示把当前路由信息传递过去方便登录后跳转回来；
        next({
          path: 'login',
          query: {redirect: to.fullPath}
        })
      }else if (sessionStorage.getItem("aisLogin") === '0'){
        alert("您没有登录，无权访问！")
        // 未登录则跳转到登陆界面，query:{ redirect: to.fullPath}表示把当前路由信息传递过去方便登录后跳转回来；
        next({
          path: 'adminLogin',
          query: {redirect: to.fullPath}
        })
      }
        else { // 已经登陆
        next()   // 正常跳转到设置好的页面
      }
    }else{
      next()
    }
  }
)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
