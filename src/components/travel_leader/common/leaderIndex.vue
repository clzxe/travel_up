<template>
  <div >
    <VNav></VNav>
    <section class="rt_wrap content mCustomScrollbar">
      <div class="rt_content">
        <div class="row" style="margin-top: 20px;">
          <img src="@/assets/images/VCG211269977739.jpg" style="height: 100%;width: 100%">
        </div>

      </div>
    </section>
  </div>
</template>

<script>
  import $ from 'jquery'
  import VNav from "@/components/travel_leader/common/nav";
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
      //this.init();
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
