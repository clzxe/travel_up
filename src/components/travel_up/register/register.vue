<template>
<div >
  <div class="rg_layout">
    <div class="rg_form clearfix">
      <div class="rg_form_left">
        <p>新用户注册</p>
        <p>USER REGISTER</p>
      </div>
      <div class="rg_form_center" >
        <div class="flag" style="text-align: center ;color:red;transform: translateY(30px) ;height:30px" ></div>
        <!--注册表单-->
        <form  >
          <!--提交处理请求的标识符-->

          <table style="margin-top: 25px;width: 100%">



            <tr>

              <td class="td_left" width="30%">
                <label for="userAccount">用户名</label>
              </td>
              <td class="td_right">
                <el-input type="text" id="userAccount" v-model="registerForm.userAccount" @blur="checkUsername" name="userAccount" placeholder="请输入账号"></el-input>
              </td>
            </tr>
            <tr>
              <td class="td_left">
                <label for="userPassword">密码</label>
              </td>
              <td class="td_right">
                <el-input type="password" id="userPassword" v-model="registerForm.userPassword" @blur="checkPassword" name="userPassword" placeholder="请输入密码"></el-input>
              </td>
            </tr>
            <tr>
              <td class="td_left">
                <label for="userPassword">再次輸入密码</label>
              </td>
              <td class="td_right">
                <el-input type="password" id="userPasswordAgain" v-model="userPasswordAgain"  @blur="checkPasswordAgain" name="userPasswordAgain" placeholder="请输入密码"></el-input>
              </td>
            </tr>
            <tr>
              <td class="td_left">
                <label for="userMail">Email</label>
              </td>
              <td class="td_right">
                <el-input type="text" id="userMail" name="userMail" v-model="registerForm.userMail" @blur="chenckMail" placeholder="请输入Email" ref="userMail"></el-input>
              </td>
            </tr>

            <tr>
              <td class="td_left">
                <label for="userName">姓名</label>
              </td>
              <td class="td_right">
                <el-input type="text" id="userName" name="userName" v-model="registerForm.userName" placeholder="请输入真实姓名"></el-input>
              </td>
            </tr>
            <tr>
              <td class="td_left">
                <label for="userTel">手机号</label>
              </td>
              <td class="td_right">
                <el-input type="text" id="userTel" name="userTel" v-model="registerForm.userTel" @blur="isCellPhone" placeholder="请输入您的手机号"></el-input>
              </td>
            </tr>

            <tr>
              <td class="td_left">
                <label for="check">验证码</label>
              </td>
              <td class="td_right check">
                <el-input type="text" style="width: 100px;margin-left: -10%;float: left;" id="check" v-model="registerForm.verCode" @blur="TocheckCode" name="check" ></el-input>
                <div class="identifybox">
                  <div style="    margin-left: 40%;" @click="getEmailCode" :disabled="!disabledCodeBtn">
                    <el-button >{{codeText}}</el-button>
                  </div>
                </div>

              </td>
            </tr>
            <tr>
              <td class="td_left">
              </td>
              <td class="td_right check">
                <button  class="submit" @click="register" >注册</button>
                <span id="msg" style="color: red;"></span>
              </td>
            </tr>
          </table>
        </form>
      </div>

      <div class="rg_form_right">
        <p>
          已有账号？
          <router-link to="/login">立即登录</router-link>
        </p>
      </div>
    </div>
  </div>
  <!--引入尾部-->
</div>
</template>

<script>
  import $ from 'jquery'
  export default {
    name: "register",
    components:{

    },
    data(){
      return{
        userPasswordAgain:'',
        registerForm:{
          userAccount:'',
          userPassword:'',
          userMail:'',
          userTel:'',
          userName:'',
          verCode:''
        },
        codeTime:120,
        identifyCode: '',
        checkCode:'',
        codeText:'获取验证码',
        disabledCodeBtn: true,
        passwordType: 'password'
      }
    },
    methods: {
      getEmailCode(){
        if(this.chenckMail()){
          this.$axios.get("user/verCode?receiver="+this.registerForm.userMail)
            .then(response => {
              // alert(data.flag);
              if (response.data.response==="OK") {
                //成功跳转
                alert("处理中...");
                this.identifyCode=response.data.code;
              //  this.countDown(60)
                this.codeTime=60;
                this.CodeCountDown();
              }
              else{
                alert(response.data.response)
              }
            })
            .catch(failResponse => {
              alert("响应异常")
            })

        }
        else {
          alert("邮箱格式错误")
        }

      },
      countDown (time) {
        if (time === 0) {
          this.disabledCodeBtn = true;
          this.codeText = "获取验证码";
          return
        } else {
          this.disabledCodeBtn = false;
          this.codeText = '重新发送(' + time + ')';
          time--
        }
        setTimeout(()=> {
          this.countDown(time)
        }, 1000)
      },
      CodeCountDown () {
        if (this.codeTime === 0) {
          this.disabledCodeBtn = true;
          this.codeText = "获取验证码";
          return
        } else {
          this.codeTime--
        }
        setTimeout(()=> {
          this.countDown(this.codeTime)
        }, 1000)
      },
      // handleLogin () {
      //   alert('登陆成功')
      //   this.dialogVisible = false
      // },
      handleSelect (key, keyPath) {
        console.log(key, keyPath)
      },


      checkUsername() {

        var user_test = /^\w{4,10}$/;
        var flag_un = user_test.test(this.registerForm.userAccount);
      //  alert($("#userAccount").val())
        if (!flag_un) {

          $("#userAccount").css("border", "2px red solid");
          $(".flag").html("用户名错误");
        } else {
          $("#userAccount").css("border", "2px green solid");
          $(".flag").html("");
        }
        return flag_un;
      },
      checkPassword() {

        var user_test = /^\w+$/;
        var flag_un = user_test.test(this.registerForm.userPassword);
        if (flag_un) {
          $("#userPassword").css("border", "2px green solid");
          $(".flag").html("");
        } else {
          $("#userPassword").css("border", "2px red solid");
          $(".flag").html("密码格式错误错误");
        }
        return flag_un;
      },
      checkPasswordAgain(){
       if(this.registerForm.userPassword!==this.userPasswordAgain){
         $("#userPasswordAgain").css("border", "2px red solid");
         $("#userPassword").css("border", "2px red solid");
         $(".flag").html("两次密码不相同");
         return false;
       }
       else {
         $("#userPasswordAgain").css("border", "2px green solid");
         $(".flag").html("");
         return true;
       }
      },
      chenckMail(){
        var regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
        if(this.registerForm.userMail === '' ){
          $("#userMail").css("border", "2px red solid");
          $(".flag").html("邮箱不能为空");
          return false
        }
        else if (!regEmail.test(this.registerForm.userMail)) {

          $("#userMail").css("border", "2px red solid");
          $(".flag").html("邮箱格式错误");
          //this.registerForm.userMail = ''
          return false
        }
        else {
          $("#userMail").css("border", "2px green solid");
          $(".flag").html("");
          return true
        }
      },
      isCellPhone () {
        if(!/^1(3|4|5|6|7|8)\d{9}$/.test(this.registerForm.userTel)) {
          $("#userTel").css("border", "2px red solid");
          $(".flag").html("手机号码错误");
          return false
        } else {
          $("#userTel").css("border", "2px green solid");
          $(".flag").html("");
          return true
        }
      },
      /**
       * @return {boolean}
       */
      TocheckCode() {
        if(this.codeTime===0){
          $("#check").css("border", "2px red solid");
          $(".flag").html("验证码已失效请重新获取");
          return false
        }
        else {
          if(this.registerForm.verCode!==this.identifyCode) {
            $("#check").css("border", "2px red solid");
            $(".flag").html("验证码错误");
            return false
          } else {
            $("#check").css("border", "2px green solid");
            $(".flag").html("");
            return true
          }
        }

      },
      register() {
        var qs=require('querystring')
        let config={
          header:{'Content-type':'application/x-www-form-urlencoded'}
        };

        if (this.checkPassword() && this.checkUsername()&&this.chenckMail()&&this.isCellPhone() === true&&this.TocheckCode()) {
          //异步提交

          this.$axios.post("user/add",qs.stringify(this.registerForm),config)
            .then(response => {
              // alert(data.flag);
              if (response.data.message==="OK") {
                //成功跳转
                alert("注册成功，即将前往登录界面")
               this.$router.push('/register_ok');
              } else {
                //注册失败
                // alert(data.errorMsg);
                $(".flag").html(response.data);
                // $("#checkCode_").attr("src","/checkCode" + "?" + new Date().getTime());
              }
            })
            .catch(failResponse => {
              alert("响应异常")
            })
        }
      },
      changeCheckCode() {
        $("#userMail").css("border", "2px green solid");
      }
    }
  }

</script>

<style scoped>

</style>
