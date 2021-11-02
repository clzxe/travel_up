<template>

  <!-- 头部 start -->
  <div id="header">
    <div id="header1">

      <div class="shortcut">
        <!-- 未登录状态  -->
        <div class="login_out" v-if="showLoginOut">
          <router-link to="/login">登录</router-link>
          <router-link to="/register">注册</router-link>

        </div>
        <!-- 登录状态  -->
        <div class="login" v-if="showLogin">

          <span id="head_name"></span>
          <a  class="user" id="collection"><img style="width: 20px;height: 20px;display: inherit;border-radius: 10px" :src="users.userHead" /></a>
          <router-link to="user_order" class="collection" id="user_center">个人中心</router-link>
          <router-link to="car" class="user" id="user_car">购物车</router-link>
          <router-link to="user_collect" class="user" >我的收藏</router-link>
          <a href="javascript:location.href='user/exit_user'; " id="drop_out">退出</a>
        </div>
      </div>

      <div class="header_wrap" style="height: 107px;">
        <div class="topbar">
          <div class="logo">
            <a href="/"><img src="@/assets/images/pig_logo.jpg" alt=""></a>
          </div>
          <div class="search">

            <div class=" posirelative select-out-div" style="float: left;width: 80px;">
              <select id="select" class="m-wrap" @change="changSelect()"  style="width: 180px; padding: 2px 0;">
                <option :selected="type==='0'" style="height: 20px"  value="0">景点</option>
                <option value="1" :selected="type==='1'">路线</option>
                <option value="2" :selected="type==='2'">酒店</option>
                <option value="3" :selected="type==='3'">攻略</option>
              </select>
              <span class="select-hide-span" >
              <b class="select-show-b"  ></b></span>
            </div>


            <input name="" type="text" id="search_input" placeholder="请输入路线名称" class="search_input" autocomplete="off" v-model="global.searchMessage">
            <a href="javascript:;" id="search-button" class="search-button" @click="searchChange">搜索</a>
          </div>
        </div>
      </div>
    </div>
    <!-- 头部 end -->
    <!-- 首页导航 -->

  </div>

</template>


<script>
  export default {
    name: "order_header",
    data(){
      return{
        users:[],
        type:'',
        showLogin:false,
        showLoginOut:true,
        searchStatus1:true,
        searchStatus2:false
      }
    },
    props: ['currentHeader','searchMessage','sortType'],
    mounted: function () {
      this.loadUser();
      setTimeout(() => {
        this.searchInfo=this.global.searchMessage;
        this.type=this.sortType;
        console.log(this.searchInfo)
        console.log(this.type)
      }, 3000);

    },

    methods:{
      changSelect(){
        var se=$('#select').val();
        // alert(se)
        this.type=se;
        console.log(this.type)
        console.log(this.type==='2')
      },
      searchChange(){
        this.searchInfo=this.global.searchMessage
        if(this.type==='0'){
          this.$router.replace({path:'/nav_scenic',query:{searchTitle:this.searchInfo}})
        }
        else if(this.type==='1'){
          this.$router.push({path:'/nav_line',query:{searchTitle:this.searchInfo}})
        }
        else if(this.type==='2'){
          this.$router.push({path:'/nav_hotel',query:{searchTitle:this.searchInfo,type:this.type}})
        }
        else {
          this.$router.replace({path:'/nav_strategy',query:{searchTitle:this.searchInfo}})
        }
      },
      loadUser(){
        this.$axios.get("/user/get_user")
          .then(successReqponse => {
            var data = successReqponse.data;
            this.users = data.user;
            if( this.users===null){
              this.showLogin=false;
              this.showLoginOut=true;
             var url=this.$router.resolve('login');
             window.open(url.href);
            }
            else {
              this.showLogin=true;
              this.showLoginOut=false;
            }

          })
          .catch(failRespose => {
            console.log("页面加载错误！正在重新载入...");
            //this.$router.replace("/leaderAdd");
          })
      }
    }


  }

</script>

<style >
  .adatar {
    position: relative;
    width: 168px;
    height: 168px;
  }
  #om {
    object-fit: cover;
    object-position: center;
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

</style>
