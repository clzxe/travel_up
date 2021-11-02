<template>
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu  :default-active="activeIndex">
      <el-menu-item ><i class="el-icon-s-home"></i>全部功能</el-menu-item>
      <el-menu-item-group >

        <el-menu-item index="1"  ><router-link to="user_order">我的订单</router-link></el-menu-item>
        <el-menu-item index="2" ><router-link to="user_password">修改密码</router-link></el-menu-item>
        <el-menu-item index="3" ><router-link :to="{path: 'user_money',query:{userId:user.userId}}">账户充值</router-link></el-menu-item>
        <el-menu-item index="4"><router-link to="user_update">修改资料</router-link></el-menu-item>
        <el-menu-item index="5" ><router-link to="user_eveal">我的评价</router-link></el-menu-item>
        <el-menu-item index="6" ><router-link to="user_collect">我的收藏</router-link></el-menu-item>
        <el-menu-item index="7" ><router-link to="user_strategy">我的攻略</router-link></el-menu-item>
      </el-menu-item-group>


    </el-menu>
  </el-aside>
</template>

<script>
  export default {
    data(){
      return{

        name: "NavMenu",
        activeIndex:'',
        user:[],
      }

    },
    mounted() {
      this.activeIndex=this.$route.name;
      this.initUser();
    },
    methods: {
      initUser(){
        this.$axios.get("user/get_user")
          .then(response => {
            // alert(data.flag);
            this.user=response.data.user;
            if(this.user===null||this.user.userId===undefined){
              var url=this.$router.resolve('login');
              window.open(url.href)
            }
          })
          .catch(failResponse => {
            alert("响应异常")
          })
      },
      handleSelect(){
        return null
      },
      loginOut() {

        this.$confirm('您确定要退出吗?', '退出管理平台', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {

          this.$router.push({'path':'/login'})
          this.$message({
            message: '退出登录',
            type: 'info'
          })


        })
      }

    }
  }
</script>

<style>
  html,body{
    padding: 0;
    margin: 0;
  }

  .btn{
    float: right;
    background-color: #aac1d1;
    margin: 10px 10px 0 0
  }
  .active{
    color: #ffb611;
    cursor: pointer;
  }

</style>
