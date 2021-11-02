<template>
    <div id="app">
      <section id="login_wrap">
        <div class="fullscreen-bg" style="width: 100%">
          <img src="../../../static/images/login_bg.png" style="width: 100%">
        </div>
        <div class="login-box">
          <div class="title">
            <img src="@/assets/images/login_logo.png" alt="">
            <span>欢迎登录猪猪旅游账户</span>
          </div>
          <div class="login_inner">

            <!--登录错误提示消息-->
            <div id="errorMsg" v-show="disable"  class="alert alert-danger">{{error_message}}</div>
            <form ref="loginForm" action="" method="post" accept-charset="utf-8" >

              <input name="userAccount" type="text" v-model="loginForm.userAccount" placeholder="请输入账用户名/邮箱/手机号码"
                     autocomplete="off">
              <div>
                <input name="userPassword" type="password"  style="width: 220px;" :type="passwordType" v-model="loginForm.userPassword" placeholder="请输入密码"
                       autocomplete="off">
                <i class="el-input__icon el-icon-view"
                   :style="fontstyle"
                   slot="suffix"
                   style="font-size: 20px"
                   @click="showPassword">
                </i>
              </div>
              <div class="verify">
                <input name="check" type="text" placeholder="请输入验证码" autocomplete="off" v-model="loginForm.verifyCode">
                <span>
                  <div class="identifybox">
            <div @click="refreshCode">
              <s-identify :identifyCode="identifyCode"></s-identify>
            </div>
          </div>
                </span>

              </div>
              <div class="submit_btn">
                <button type="button" id="login_submit" @click="login" >登录</button>
                <div class="auto_login">
                  <router-link style="margin-left: 80px;" to="">忘记密码</router-link>
                  <span></span>
                </div>
              </div>
            </form>
            <div class="reg">没有账户？<router-link to="/register">立即注册</router-link></div>
          </div>
        </div>
      </section>
    </div>
</template>

<script>
  import SIdentify from '@/components/CertificateVolidate/identify.vue'
    export default {
        name: "login",
      components:{
        SIdentify
      },
      data(){
        // 用户名自定义验证规则
          return{
            activeIndex: '1',
            dialogVisible: false,
            fontstyle: {
              color: 'gray'
            },
            loginForm:{
              userAccount:'',
              userPassword:'',
              verifyCode:''
            },
            disable:false,
            error_message:'',
            checkCode:'',
            checked: false,
            identifyCodes: '1234567890ABCDEFGHIGKLMNoPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
            identifyCode: '',
            passwordType: 'password'
          }
      },
      mounted () {
        // 验证码初始化
        this.identifyCode = '';
        this.makeCode(this.identifyCodes, 4)
      },
      computed: {
      },
      props: [],
      methods: {
        getPhoto () {

        },
        // 通过改变input的type使密码可见
        showPassword () {
          this.fontstyle.color === 'gray' ? (this.fontstyle.color = 'blue') : (this.fontstyle.color = 'gray') // 改变密码可见按钮颜色
          this.passwordType === ''
            ? (this.passwordType = 'password') : (this.passwordType = '')
        },
        // 点击登入按钮
        handleLogin () {
          this.$refs.loginForm.validate(valid => {
            if (valid) {

              this.$router.push('/apply/Index')
            } else {
              this.$router.push('/apply/CertificateLogin')
            }
          })
        },
        // 生成随机数
        randomNum (min, max) {
          return Math.floor(Math.random() * (max - min) + min)
        },
        // 切换验证码
        refreshCode () {
          this.identifyCode = ''
          this.makeCode(this.identifyCodes, 4)
        },
        // 生成四位随机验证码
        makeCode (o, l) {
          for (let i = 0; i < l; i++) {
            this.identifyCode += this.identifyCodes[this.randomNum(0, this.identifyCodes.length)]
          }
          console.log(this.identifyCode)
        },
        applyFor () {
          this.dialogVisible = true
        },
        handleClose (done) {
          done()
        },
        // handleLogin () {
        //   alert('登陆成功')
        //   this.dialogVisible = false
        // },
        handleSelect (key, keyPath) {
          console.log(key, keyPath)
        },


          login(){
            var qs=require('querystring')
            var formData=qs.stringify(this.loginForm);
            let config={
              header:{'Content-type':'application/x-www-form-urlencoded'}
            };
            alert(this.identifyCode)
            if(this.loginForm.verifyCode===this.identifyCode){

              this.$axios.post('login',qs.stringify(this.loginForm),config)
                .then(successResponse=>{
                  if (successResponse.data==="OK"){
                    alert("登录成功");
                    this.$axios.get('user/userExits')
                      .then(Response=>{
                        sessionStorage.setItem("userInfo",Response.data.user)
                        sessionStorage.setItem("isLogin",'1')
                        this.$router.push('index');//返回上一层
                      })
                  }
                  else {
                    this.disable=true;
                    this.error_message=successResponse.data;
                  }
                })
                .catch(failResponse=>{
                  alert("系统响应异常")
                })
            }
            else {
              this.disable=true;
              this.error_message='验证码输入错误！'
            }



          }
      }

    }
</script>

<style scoped>
.fullscreen-bg {
  height: 732px;
}
</style>
