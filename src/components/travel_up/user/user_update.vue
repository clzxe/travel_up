<template>
  <div id="app">
    <vHeader></vHeader>

    <el-container style="height: 100vh; border: 1px solid #eee">

      <NavMenu></NavMenu>

      <el-container >

        <el-header style="text-align: center; font-size: 12px">

          <span style="font-size: 17px">个人资料</span>

        </el-header>

        <el-main>

          <el-form style="margin-top: 2%;margin-bottom: 2%; align-content: center;align-items: center" >
           <div class="item_bock head_p" style="margin-left: 45%">
            <div class="head_img">
              <img :src="userInfo.avatar" @click.stop="uploadHeadImg"/>
            </div>
            <input type="file" accept="image/*" @change="handleFile" class="hiddenInput"/>
          </div>
            <p><label style="margin-left: 48%;">上传用户头像</label></p>
            <p style="margin-top: 2%"><label style="margin-left: 28%;">用户名：</label><el-input  @blur="checkUsername" id="userAccount" v-model="user.userAccount" type="text" style="width: 40%"></el-input></p>
            <p style="margin-top: 2%"><label style="margin-left: 28%;">姓  &nbsp;&nbsp;名：</label><el-input  v-model="user.userName" type="text" style="width: 40%"></el-input><br></p>
            <p style="margin-top: 2%"><label style="margin-left: 28%;">手机号：</label><el-input @blur="isCellPhone" id="userTel" v-model="user.userTel" type="text" style="width: 40%"></el-input><br></p>
            <p style="margin-top: 2%"><label style="margin-left: 28%;">邮  &nbsp;&nbsp;箱：</label><el-input @blur="chenckMail" id="userMail"  v-model="user.userMail" readonly="readonly" type="text" style="width: 40%" ><br></el-input></p>

           <div style="margin-top: 2%">
              <span ><label style="margin-left: 28%">验证码：</label><el-input @blur="TocheckCode" id="check"  v-model="verCode" type="text" style="width: 30%;" ></el-input>
               <el-button @click="getEmailCode" :disabled="!disabledCodeBtn">{{codeText}}</el-button></span>
           </div><br>
            <p style="margin-top: 2%"><el-button style="margin-left: 45%;" @click="sub">确认</el-button></p>

          </el-form>

        </el-main>
      </el-container>

    </el-container>
  </div>
</template>

<script>
  import Header from "../common/Header";
  import NavMenu from "../common/NavMenu";
  export default {
    name: 'user_update',
    components: {
      NavMenu,
      'vHeader': Header
    },
    data() {

      /*this.$axios.get(`student/getAll`).then(res => {
        if (res.data.code == 200) {
          this.tableData = res.data.data
        }
      })*/
      return {
        userInfo: {
          avatar: ''
        },
        codeTime:120,
        identifyCode: '',
        checkCode:'',
        codeText:'获取验证码',
        disabledCodeBtn: true,
        passwordType: 'password',
        user:[],
        formData:'',
        file:'',
        verCode:'',
      }
    },
    created() {
    },
    mounted:function(){

      this.init();
    },
    methods: {
      init(){
        this.$axios.get("user/get_user")
          .then(response => {
              // alert(data.flag);
             this.user=response.data.user;
            this.userInfo.avatar=this.user.userHead;
          })
          .catch(failResponse => {
            alert("响应异常")
          })
      },
      getEmailCode(){
        if(this.chenckMail()){
          this.$axios.get("user/verCode?receiver="+this.user.userMail)
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
        var flag_un = user_test.test(this.user.userAccount);
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
      chenckMail(){
        var regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
        if(this.user.userMail === '' ){
          $("#userMail").css("border", "2px red solid");
          $(".flag").html("邮箱不能为空");
          return false
        }
        else if (!regEmail.test(this.user.userMail)) {

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
        if(!/^1(3|4|5|6|7|8)\d{9}$/.test(this.user.userTel)) {
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
          if(this.verCode!==this.identifyCode) {
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
      changeCheckCode() {
        $("#userMail").css("border", "2px green solid");
      },
      sub(){
        // var targetUrl = "http://localhost:8080/manager/product/save";
        var qs = require('querystring')

        let config = {
          header: {'Content-type': 'multipart/form-data'}
        };
        this.formData=new FormData()
      //  alert(this.scenicMessage.scenicName)
        this.formData.append("userId", this.user.userId);
        this.formData.append("userAccount", this.user.userAccount);
        this.formData.append("userPassword", this.user.userPassword);
        this.formData.append("userName", this.user.userName);
        this.formData.append("userMail", this.user.userMail);
        this.formData.append("userTel", this.user.userTel);
        this.formData.append("file", this.file);
        this.formData.append("verCode", this.verCode);
        this.$axios.post("/user/update", this.formData, config)
          .then(successReqponse => {
           if(successReqponse.data.message==='OK'){
             alert("修改成功!")
           }
          })
          .catch(failRespose => {
            console.log("系统错误");
          })
      },

      // 打开图片上传
      uploadHeadImg: function () {
        this.$el.querySelector('.hiddenInput').click()
      },
      // 将头像显示
      handleFile: function (e) {
        let $target = e.target || e.srcElement
        let file = $target.files[0];
        this.file=$target.files[0];
        var reader = new FileReader()
        reader.onload = (data) => {
          let res = data.target || data.srcElement
          this.userInfo.avatar = res.result
        }
        reader.readAsDataURL(file)
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
  .item_bock {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height:94px;
    width: 300px;
    padding:0px 24px 0px 38px;
    border-bottom: 1px solid #f7f7f7;
    background: #fff;
  }
  .head_p {
    height:132px;
  }
  .head_img{
    height: 90px;
  }
  .head_img img{
    width:90px;
    height:90px;
    border-radius:50px
  }
  .setting_right{
    display: flex;
    height: 37px;
    justify-content: flex-end;
    align-items: center;
  }
  .hiddenInput{
    display: none;
  }
  .caption {
    color: #8F8F8F;
    font-size: 26px;
    height: 37px;
  }
</style>
