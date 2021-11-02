<template>
    <div id="app">
      <section class="rt_wrap content mCustomScrollbar">
        <div class="rt_content">
          <div class="page_title">

          </div>

          <div id="content">
            <div class="custom-made">

              <div class="cus-tourism-list">

                <div class="tourism-custom J_travel">

                  <form  method="post" name="travel-cus" class="cusForm">
                    <h1>用户</h1>
                    <ul class="cus-table">
                      <li>
                        <label>用户名：</label>
                        <div class="cus-mold">
                          <label>{{user.userAccount}}</label>
                        </div>
                      </li>
                      <li>
                        <label>用户邮箱：</label>
                        <label>{{user.userMail}}</label>

                      </li>

                      <li>
                        <label>用户密码：</label>
                        <label>{{user.userPassword}}</label>

                      </li>
                      <li>
                        <label>  姓名：</label>
                        <label>{{user.userName}}</label>
                      </li>
                      <li>
                        <label>  联系电话：</label>
                        <label>{{user.userTel}}</label>
                      </li>

                      <li>
                        <label>用户状态：</label>
                        <label v-if="user.isLock===0">正常</label>
                        <label v-if="user.isLock===1">已锁定</label>

                      </li>


                    </ul>


                  </form>
                  <span v-on:click="back">返回</span>

                </div>



              </div>

            </div>

          </div>
          <!--content end-->
        </div>
      </section>
    </div>
</template>

<script>
  import $ from 'jquery'
  import Modal from "@/components/travel_after/common/modal.vue";
    export default {
        name: "userView",
      data() {

        return {
          isSelectFile: false,
          imgUrl: "",
          userId:'',
          photo: '',
          modalStatus2: false,
          modalStatus: false,
          m_title: "添加景点图片",
          m_content: "我是首页的内容",
          travelTimes:[],
          user:[],
          ImageList:[],
          provinceList:[],
          cityList:[],
          btnType: [{"value": "确定", "class": "danger"}, {"value": "取消", "class": "defalut"}]
        }

      },
      components: {
        "v-modal": Modal,
        "v-upload1": upload
      },
      create:function(){
        this.getThemes();
      },
      methods: {
        getThemes:function(){
          this.userId=this.$route.query.userId;
          var qs = require('querystring')
          let config = {
            header: {'Content-type': 'application/x-www-form-urlencoded'}
          };
          this.$axios.get("/user/getuser?userId="+this.userId)
            .then(successReqponse => {
              this.user=successReqponse.data.user;
            })
            .catch(failRespose => {
              console.log("页面加载错误！正在重新载入...");
              this.$router.replace("/userView?userId="+this.userId);
            })

        },
        changeCity:function(){
          var qs = require('querystring')
          let config = {
            header: {'Content-type': 'application/x-www-form-urlencoded'}
          };
          this.$axios.get("/user/getCityList?provinceId="+this.userMessage.userProvince)
            .then(successReqponse => {
              if(successReqponse.data.cityList.length===0){
                alert("没有数据！");
              }
              else {
                this.cityList=[];
                this.cityList=successReqponse.data.cityList;
              }

            })
            .catch(failRespose => {
              console.log("数据加载错误！正在重新载入...");
              this.$router.replace("/userAdd");
            })
        },
        openImg() {
          this.$refs.input.click();
        },
        openHomeModal() {
          this.modalStatus = true;
        },
        back(){
          this.$router.go(-1);//返回上一层
        }

      }
    }

</script>

<style scoped>

</style>
