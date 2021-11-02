<template>
<div id="app">
  <VNav></VNav>
  <section class="rt_wrap content mCustomScrollbar">
    <div class="rt_content">
      <div class="row" style="margin-top: 20px;">
        <div class="col-sm-3 col-sm-12 col-xs-12">
          <div class="panel panel-primary text-center no-boder bg-color-green">
            <div class="panel-body">
              <i class="fa fa-bar-chart-o fa-5x"></i>
              <h3>{{pnum}}</h3>
            </div>
            <div class="panel-footer back-footer-green">
              路线数量

            </div>
          </div>
        </div>
        <div class="col-sm-3 col-sm-12 col-xs-12">
          <div class="panel panel-primary text-center no-boder bg-color-blue">
            <div class="panel-body">
              <i class="fa fa-shopping-cart fa-5x"></i>
              <h3>{{onum}} </h3>
            </div>
            <div class="panel-footer back-footer-blue">
              订单

            </div>
          </div>
        </div>
        <div class="col-sm-3 col-sm-12 col-xs-12">
          <div class="panel panel-primary text-center no-boder bg-color-red">
            <div class="panel-body">
              <i class="fa fa fa-comments fa-5x"></i>
              <h3>{{cusnum}} </h3>
            </div>
            <div class="panel-footer back-footer-red">
              酒店数量

            </div>
          </div>
        </div>
        <div class="col-sm-3 col-sm-12 col-xs-12">
          <div class="panel panel-primary text-center no-boder bg-color-brown">
            <div class="panel-body">
              <i class="fa fa-users fa-5x"></i>
              <h3>{{usernum}} </h3>
            </div>
            <div class="panel-footer back-footer-brown">
              用户数

            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</div>
</template>

<script>
  import $ from 'jquery'
  import VNav from "@/components/travel_after/common/nav";
    export default {
        name: "index",
      components:{
          VNav
      },
     data(){
          return{
            pnum:'',
            cusnum:'',
            onum:'',
            usernum:''
          }
     },
      created: function (){
          this.init();
      },
      methods:{
          init(){
            if (sessionStorage.getItem("aisLogin") === '0'){
              alert("您没有登录，无权访问！");
              this.$router.push("adminLogin");

           }else{
             var qs = require('querystring')
             let config = {
               header: {'Content-type': 'application/x-www-form-urlencoded'}
             };
             this.$axios.get("/admin/init")
               .then(successReqponse => {
                 this.pnum=successReqponse.data.pnum;
                 this.cusnum=successReqponse.data.cusnum;
                 this.onum=successReqponse.data.onum;
                 this.usernum=successReqponse.data.usernum;
               })
               .catch(failRespose => {
                 console.log("页面加载错误！正在重新载入...");
                 this.$router.push("adminIndex");
               })
           }
          }
      }
    }
</script>

<style scoped>

</style>
