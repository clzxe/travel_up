import Vue from 'vue'
import App from "./index";

Vue.config.productionTip=false

new Vue({
  el:'#app_up',
  components:{App},
  template:'<App/>'
})
