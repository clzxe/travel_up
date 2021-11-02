<template>
  <div  >
    <header>
      <h1><img src="static/images/admin_logo.png"/></h1>
      <ul class="rt_nav">
        <li><router-link to="adminIndex" target="_blank" class="website_icon">站点首页</router-link></li>

        <li><a   @click="loginOut"  class="quit_icon">安全退出</a></li>
      </ul>
    </header>
    <!--aside nav-->
    <!--aside nav-->
    <aside class="lt_aside_nav content mCustomScrollbar">
      <el-aside width="200px" style="background-color: rgba(111,246,182,0.27)">
        <el-menu  :default-active="currentNav+'-'+currentStr" style="background-color: rgba(255,221,88,0.11)">

          <el-menu-item ><i class="el-icon-s-home"></i>起始页</el-menu-item>
          <el-menu-item-group >
            <el-submenu index="1" >
              <template slot="title">导游信息管理 </template>
              <el-menu-item index="1-1">
                <router-link to="/leader_password" :class="{active:'1-1'===currentNav}">修改密码</router-link>
              </el-menu-item>
              <el-menu-item index="1-2">
                <router-link to="/leader_information" :class="{active:'1-2'===currentNav}">修改个人信息</router-link>
              </el-menu-item>
            </el-submenu>

            <el-submenu index="2" >
              <template slot="title">跟团信息查看 </template>
              <el-menu-item index="2-1">
                <router-link to="/leader_lines" :class="{active:'2-1'===currentNav}">查看跟团信息</router-link>
              </el-menu-item>
              <el-menu-item index="2-2">
                <router-link to="/leader_history" :class="{active:'2-2'===currentNav}">查看历史信息</router-link>
              </el-menu-item>
            </el-submenu>
          </el-menu-item-group>


        </el-menu>
      </el-aside>
    </aside>
  </div>
</template>

<script>
  import $ from 'jquery'
  export default {
    name: "VNav",
    data(){
      return{
        navId:1,
      }
    },
    props: ['currentNav','currentStr'],
    mounted() {



    },

    created: function () {

    } ,
    methods:{
      loginOut(){
        this.$axios.get("/loginOut")
          .then(successReqponse => {
            if(successReqponse.data==="OK"){
              sessionStorage.setItem("isLogin",0);
              this.$router.push('/adminLogin');
            }


          })
          .catch(failRespose => {
            console.log("页面加载错误！正在重新载入...");
            //this.$router.replace("/leaderAdd");
          })

      },
      ToNav(){
      // this.navId=this.currentNav
      },
      init(){
        if (sessionStorage.getItem("lisLogin") === '0'){
          alert("您没有登录，无权访问！");
          this.$router.push("adminLogin");

        }
      }

    }
  }
</script>

<style scoped lang="less">

  .active{
    color: #ffb611;
    cursor: pointer;
  }



</style>
