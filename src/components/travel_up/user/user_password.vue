<template>
  <div id="app">
    <vHeader></vHeader>

    <el-container style="height: 100vh; border: 1px solid #eee">

      <NavMenu></NavMenu>

      <el-container >

        <el-header style="text-align: center; font-size: 12px">

          <span style="font-size: 17px">修改密码</span>

        </el-header>

        <el-main>

            <el-form style="margin-top: 2%;margin-bottom: 2%; align-content: center;align-items: center" >
              <p><label-wrap style="margin-left: 20%;color: red" >{{error}}</label-wrap></p>
              <p style="margin-top: 2%"><label-wrap style="margin-left: 20%;" >请输入旧密码：</label-wrap><el-input @blur="checkOldPassword" id="userPasswordOld" v-model="oldPassword" type="password" style="width: 50%"></el-input></p>
              <p style="margin-top: 2%"><label-wrap style="margin-left: 20%;">请输入新密码：</label-wrap><el-input type="password" id="userPassword" @blur="checkPassword" v-model="newPassword" style="width: 50%" ></el-input></p>
              <p style="margin-top: 2%"><label-wrap style="margin-left: 20%;">请确认新密码：</label-wrap><el-input id="userPasswordAgain" type="password" @blur="checkPasswordAgain" v-model="againPassword" style="width: 50%"></el-input><br></p>
              <p style="margin-top: 2%"><el-button style="margin-left: 45%;" @click="sub">确认</el-button><el-button >重置</el-button></p>

            </el-form>

        </el-main>
      </el-container>

    </el-container>
  </div>
</template>

<script>
  import $ from 'jquery'
  import Header from "../common/Header";
  import NavMenu from "../common/NavMenu";
  export default {
    name: 'user_password',
    components: {
      NavMenu,
      'vHeader': Header
    },
    inject: ['reload'],
    data() {
      return {
        user:[],
        oldPassword:'',
        newPassword:'',
        againPassword:'',
        userMessage:{
          userId:'',
          password:'',
        },
        error:'',
      }
    },
    mounted:function() {
      this.init();
    },

    methods: {
      checkPassword() {

        var user_test = /^\w+$/;
        var flag_un = user_test.test(this.newPassword);
        if (flag_un) {
          $("#userPassword").css("border", "2px green solid");
          this.error="";
        } else {
          $("#userPassword").css("border", "2px red solid");
          this.error="密码格式错误错误"
        }
        return flag_un;
      },
      checkPasswordAgain() {
        if (this.newPassword !== this.againPassword) {
          $("#userPasswordAgain").css("border", "2px red solid");
         // $("#userPassword").css("border", "2px red solid");
          this.error="两次密码不相同"
          return false;
        }
        else {
          $("#userPasswordAgain").css("border", "2px green solid");
          this.error="";
          return true;
        }
      },
      checkOldPassword() {
        if (this.newPassword !== this.againPassword) {
          $("#userPasswordOld").css("border", "2px red solid");
          this.error="旧密码错误";
          return false;
        }
        else {
          $("#userPasswordOld").css("border", "2px green solid");
          this.error="";
          return true;
        }
      },
      init(){
        this.$axios.get("user/get_user")
          .then(response => {
            // alert(data.flag);
            this.user=response.data.user;
          })
          .catch(failResponse => {
            alert("响应异常")
          })
      },
      sub(){
        if(this.checkPassword()&&this.checkPasswordAgain()&&this.checkPassword()){
          var qs = require('querystring')

          let config = {
            header: {'Content-type': 'application/x-www-form-urlencoded'}
          };
          this.userMessage.userId=this.user.userId;
          this.userMessage.password=this.newPassword;
          this.$axios.post("/user/update_password", qs.stringify(this.userMessage), config)
            .then(successReqponse => {
              if(successReqponse.data==="OK"){
                alert("修改成功")
                var url=this.$router.resolve('login');
                window.open(url.href)
              }
              else {
                alert(successReqponse.data)
              }
            })
            .catch(failRespose => {
              console.log("系统错误");
            })
        }
      }
    }
  }
</script>

<style scoped lang="less">
  html,body{
    padding: 0;
    margin: 0;
  }

  .el-header {
    background-color: #fff2d1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    background-color: #e8d435;
    color: #333;

  }
  .dataNav {
    display: flex;
    height: 70px;
    .dataNavList {
      display: flex;
      margin-left: 5%;
      // 超出部分隐藏
      overflow: hidden;
      li{
        display: inline-block;
        height: 35px;
        //每个菜单项的宽度要固定，不然move值无法计算，当然也可以通过其他方法来设置以适应自己的表格
        width: 150px;
        min-width: 70px;
        margin: auto 0 auto 10%;
        border-radius: 5px;
        font-size: 20px;
        font-weight: bold;
        text-align: center;
        color: #7E8690;
        line-height: 35px;
        // 过渡效果
        transition:transform .2s;
      }
      :hover {
        color: #ffb611;
        cursor: pointer;
      }
      :active {
        color: #ffb611;
        cursor: pointer;
      }
    }
    // 按钮样式
    .dataNavPrev,
    .dataNavNext{
      display: inline-block;
      width: 35px;
      min-width: 35px;
      height: 35px;
      margin: auto 0;
      border: none;
      border-radius: 5px;
      text-align: center;
      line-height:35px;
      background-color: rgba(0,0,0,0);
      &:focus{
        outline: none;
      }
      &:hover{
        color: #1D4190;
        background-color: #c7cede;
        cursor: pointer;
      }
    }
    .dataNavNext{
      margin-left: auto;
    }

  }
  .active {
    color: #ffb611!important;
  }
</style>
