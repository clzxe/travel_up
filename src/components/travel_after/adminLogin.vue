<template>
<div :style="{background:bg}" class="bg">
  <p>&nbsp;</p>
  <p>&nbsp;</p>
  <h1>&nbsp;</h1>
  <h1>&nbsp;</h1>
  <h1>&nbsp;</h1>
  <h1>&nbsp;</h1>
  <dl class="admin_login">
    <dt>
      <strong>旅游系统后台管理系统</strong>
      <em>Management System</em>
    </dt>
    <dd class="user_icon">
      <input type="text" placeholder="账号" v-model="aLoginForm.adminAccount"  class="login_txtbx"/>
    </dd>
    <dd class="pwd_icon">
      <input type="password" placeholder="密码" v-model="aLoginForm.adminPassword" class="login_txtbx"/>
    </dd>
    <dd>
      管理员<input type="radio" value="1" name="userType"  v-model="type"/>
      导游<input type="radio" value="2" name="userType"  v-model="type"/>
    </dd>
    <dd>
      <input type="button" value="立即登录" class="submit_btn" @click="login"/>
    </dd>

  </dl>
  <h1>&nbsp;</h1>
  <h1>&nbsp;</h1>
  <h1>&nbsp;</h1>
  <h1>&nbsp;</h1>
  <h1 style="margin-left: 45%">@版权归谢恩所有</h1>
  <h1>&nbsp;</h1>

</div>
</template>

<script>
  import $ from 'jquery'
    export default {
        name: "adminLogin",

      data(){
        return{
          type:'',
          bg:'url('+require('../../assets/images/VCG211146469109.jpg')+')',
          aLoginForm:{
            adminAccount:'',
            adminPassword:''
          },
        }
      },

      methods:{
          login(){
            var qs=require('querystring')
            var formData=qs.stringify(this.aLoginForm);
            let config={
              header:{'Content-type':'application/x-www-form-urlencoded'}
            };
            if(this.type==='1'){
              this.$axios.post('admin_login',qs.stringify(this.aLoginForm),config)
                .then(successResponse=>{
                  if (successResponse.data==="OK"){
                    alert("登录成功");
                    sessionStorage.setItem("aisLogin","1")
                    this.$router.push('adminIndex');
                  }
                  else {
                    alert(successResponse.data)

                  }
                })
                .catch(failResponse=>{
                  alert("响应异常")
                })
            }
            else if(this.type==='2'){
              this.$axios.post('leader_login',qs.stringify(this.aLoginForm),config)
                .then(successResponse=>{
                  if (successResponse.data==="OK"){
                    alert("登录成功");
                    sessionStorage.setItem("lisLogin","1");
                    this.$router.push('leaderIndex');
                  }
                  else {
                    alert(successResponse.data)

                  }
                })
                .catch(failResponse=>{
                  alert("响应异常")
                })
            }
          }
      }
    }


</script>

<style scoped>
  .bg{
    background-repeat:no-repeat!important;
    background-size: cover!important;
  }
  body {
    height:100% !important;
    background:#16a085 !important;
    overflow:hidden !important;
    box-sizing: content-box !important;}
  canvas{z-index:-1;position:absolute;}
  *{box-sizing: content-box !important;}
  .input{display:none !important;}
  .label:before{  content: "\a0"; /*不换行空格*/
    display: inline-block;
    vertical-align: middle;
    font-size: 18px;
    width: 1em;
    height: 1em;
    margin-right: .4em;
    border-radius: 50%;
    border: 1px solid #01cd78;
    text-indent: .15em;
    line-height: 1; }
  .input:checked + .label:before{
    background-color: #01cd78;
    background-clip: content-box;
    padding: .1rem;
  }
</style>
