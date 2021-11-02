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
            <el-submenu index="14" >
              <template slot="title">基础信息管理 </template>
              <el-submenu index="1" >
                <template slot="title">景点管理 </template>
                <el-menu-item index="1-1"  ><router-link :class="{active:'1-1'===currentNav}"  to="/scenicList" >景点列表示例</router-link></el-menu-item>
                <el-menu-item index="1-2"  ><router-link :class="{active:'1-2'===currentNav}" to="/scenicAdd" >添加景点</router-link></el-menu-item>
              </el-submenu>
              <el-submenu index="9">
                <template slot="title">公告信息 </template>
                <el-menu-item index="9-1">
                  <router-link to="/noticeList" :class="{active:'9-1'===currentNav}">公告列表示例</router-link>
                </el-menu-item>

              </el-submenu>
              <el-submenu index="13">
                <template slot="title">系统包含城市管理 </template>
                <el-menu-item index="13-1"  ><router-link to="/provinceList" :class="{active:'13-1'===currentNav+'-'+currentStr}">城市列表示例</router-link></el-menu-item>
              </el-submenu>
              <el-submenu index="3">
                <template slot="title">主题信息 </template>
                <el-menu-item index="3-1">
                  <router-link to="/themeList" :class="{active:'3-1'===currentNav}">主题列表示例</router-link>
                </el-menu-item>
              </el-submenu>
            </el-submenu>

            <el-submenu index="18" >
              <template slot="title">旅游信息 </template>
              <el-submenu index="2">
                <template slot="title">路线信息 </template>
                <el-menu-item index="2-1">
                  <router-link to="/linesList" :class="{active:'2-1'===currentNav}">路线列表示例</router-link>
                </el-menu-item>
                <el-menu-item index="2-2">
                  <router-link to="/linesAdd" :class="{active:'2-2'===currentNav}">添加路线</router-link>
                </el-menu-item>
              </el-submenu>
              <el-submenu index="8">
                <template slot="title">旅行团信息 </template>
                <el-menu-item index="8-1">
                  <router-link to="/groupList" :class="{active:'8-1'===currentNav}">旅行团列表示例</router-link>
                </el-menu-item>

              </el-submenu>
              <el-submenu index="16">
                <template slot="title">旅游团路线信息 </template>
                <el-menu-item index="16-1">
                  <router-link to="/groupLineList" :class="{active:'16-1'===currentNav}">旅游团路线列表示例</router-link>
                </el-menu-item>
                <el-menu-item index="16-2">
                  <router-link to="/groupLineAdd" :class="{active:'16-2'===currentNav}">添加旅游团路线</router-link>
                </el-menu-item>
              </el-submenu>
            </el-submenu>

            <el-submenu index="17">
            <template slot="title">用户信息 </template>
            <el-menu-item index="4-1">
              <router-link to="/userList" :class="{active:'4-1'===currentNav}">用户列表示例</router-link>
            </el-menu-item>
              <el-submenu index="6">
                <template slot="title">导游信息 </template>
                <el-menu-item index="6-1">
                  <router-link to="/leaderList" :class="{active:'6-1'===currentNav}">导游列表示例</router-link>
                </el-menu-item>
                <el-menu-item index="6-2">
                  <router-link to="/leaderAdd" :class="{active:'6-2'===currentNav}">添加导游</router-link>
                </el-menu-item>
              </el-submenu>
          </el-submenu>
            <el-submenu index="5">
              <template slot="title">酒店信息 </template>
              <el-menu-item index="5-1">
                <router-link to="/hotelList" :class="{active:'5-1'===currentNav}">酒店列表示例</router-link>
              </el-menu-item>
              <el-menu-item index="5-2">
                <router-link to="/hotelAdd" :class="{active:'5-2'===currentNav}">添加酒店</router-link>
              </el-menu-item>
            </el-submenu>


            <el-submenu index="7">
            <template slot="title">订单信息 </template>
            <el-menu-item index="7-1">
              <router-link to="/orderList" :class="{active:'7-1'===currentNav}">订单列表示例</router-link>
            </el-menu-item>
          </el-submenu>


            <el-submenu index="10">
              <template slot="title">攻略信息 </template>
              <el-menu-item index="10-1">
                <router-link to="/strategyList" :class="{active:'10-1'===currentNav}">攻略列表示例</router-link>
              </el-menu-item>
            </el-submenu>
            <el-submenu index="15">
              <template slot="title">评价信息 </template>
              <el-submenu index="11">
                <template slot="title">评价信息 </template>
                <el-menu-item index="11-1">
                  <router-link to="/evaluateList" :class="{active:'11-1'===currentNav}">评价列表示例</router-link>
                </el-menu-item>
              </el-submenu>
              <el-submenu index="12">
                <template slot="title">评论信息 </template>
                <el-menu-item index="12-1">
                  <router-link to="/s_evaluateList" :class="{active:'12-2'===currentNav}">攻略评论列表示例</router-link>
                </el-menu-item>
              </el-submenu>

            </el-submenu>
            <el-submenu index="20">
              <template slot="title">系统统计 </template>
              <el-menu-item index="20-1">
                <router-link to="/chart" :class="{active:'20-1'===currentNav}">系统数据监控</router-link>
              </el-menu-item>
              <el-menu-item index="20-2">
                <router-link to="/chart_order" :class="{active:'20-2'===currentNav}">系统收入额统计</router-link>
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
