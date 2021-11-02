<template>
  <div id="app">
    <section class="rt_wrap content mCustomScrollbar">
      <div class="rt_content">
        <div class="page_title">
          <h2 class="fl">修改用户</h2>

        </div>
        <form class="form-horizontal" role="form" onsubmit="return false;" id="form1">
          <input type="hidden" class="form-control" v-model="userMessage.userId"   required="required">
          <div class="form-group">
            <label class="col-sm-2 control-label">景点名称</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" v-model="userMessage.userName" id="userName" name="userName" placeholder="景点名称" required="required">
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label"> 景点简介</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" name="description" v-model="userMessage.userDescription" placeholder="景点简介" required="required">
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">产品封面</label>
            <div class="col-sm-10" style="max-width: 300px;">
              <input v-show="false" type="file" accept="image/*" @change="getFiles($event)" ref="input" />
              <div style="width:200px;height:200px;border:1px solid;text-align:center;" @click="openImg">
                <span v-if="imgUrl==''">点击上传</span>
                <img style="height:100%;width:100%;" v-if="imgUrl!=''" :src="imgUrl" />
              </div>

            </div>
          </div>


          <div class="form-group">
            <label class="col-sm-2 control-label">开放时间</label>
            <div class="col-sm-3">
              <input type="text" class="form-control" id="userOpenTime" name="userOpenTime" v-model="userMessage.userOpenTime" placeholder="开放时间"
                     required="required"/>
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">建议游玩时间</label>
            <div class="col-sm-3">
              <input type="text" id="userCostTime" class="form-control" name="userCostTime" v-model="userMessage.userCostTime" required="required" :onkeyup="clearNoNum(this)">
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">联系电话</label>
            <div class="col-sm-3">
              <input type="text" id="userTel" class="form-control" name="userTel" v-model="userMessage.userTel" required="required">
            </div>
          </div>

          <div class="form-group">
            <label class="col-sm-2 control-label">地址</label>
            <div class="col-sm-3">
              <input type="text" class="form-control" id="userAddr" name="userAddr" v-model="userMessage.userAddr" required="required"/>
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">所属省市</label>
            <div class="col-sm-10" >

              <label class="checkbox-inline">
                省份： <select v-model="userMessage.userProvince" @change="changeCity"  >
                <option v-for="item in provinceList" :value="item.provinceId" >{{item.provinceName}}</option>
              </select>
              </label>
              <label class="checkbox-inline">
                市： <select v-model="userMessage.userCity" >
                <option v-for="city in cityList" :value="city.cityId" >{{city.cityName}}</option>
              </select>
              </label>
            </div>

          </div>
          <div class="form-group" style="padding-top: 40px;">
            <label class="col-md-2 control-label">景点图片</label>
            <transition name="slide-fade">
              <v-modal v-show="modalStatus2" :title="m_title" :btnType="btnType">
                <slot>　　
                  <table>
                    <thead>
                    <tr>
                      <td>编号</td>
                      <td>图片</td>
                      <td>操作</td>
                    </tr>
                    </thead>
                    <tbody v-for="(userImg,index) in ImageList">
                    <tr>
                      <td>
                        {{index+1}}
                      </td>
                      <td>
                        <el-image :src="require(userImg.img)"></el-image>
                      </td>
                      <td>
                        <el-button @click="deleteImg(userImg.id)">删除</el-button>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </slot>
              </v-modal>
            </transition>


          </div>
          <div class="form-group" style="padding-top: 40px;">
            <label class="col-md-2 control-label">添加景点图片</label>
            <transition name="slide-fade">
              <v-modal v-show="modalStatus2" :title="m_title" :btnType="btnType">
                <slot>　　
                  <button @click="modalStatus2=false"></button>
                  <v-upload1></v-upload1>
                </slot>
              </v-modal>
            </transition>

            <el-button @click="modalStatus2=true">添加图片</el-button>
          </div>
          <div class="form-group">
            <div class="col-sm-offset-2 col-sm-10">
              <input type="submit" class="btn btn-default" onclick="sub()">
            </div>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
  import $ from 'jquery'
  import Modal from "@/components/travel_after/common/modal.vue";
  import upload from "@/components/travel_after/common/upload.vue";

  export default {
    name: "userAdd",
    data() {

      return {
        formData: "",
        isSelectFile: false,
        imgUrl: "",
        photo: '',
        modalStatus2: false,
        modalStatus: false,
        m_title: "添加景点图片",
        m_content: "我是首页的内容",
        userMessage:[],
        travelTimes:[],
        provinceList:[],
        ImageList:[],
        cityList:[],
        userId:'',
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
            this.themes=successReqponse.data.themes;
            this.userMessage=successReqponse.data.user;
            this.imgUrl = "data:image/png;base64," + successReqponse.data.user.userImg;
            this.ImageList=successReqponse.data.ImageList;
            this.provinceList=successReqponse.data.provinceList;
          })
          .catch(failRespose => {
            console.log("页面加载错误！正在重新载入...");
            this.$router.replace("/user/update?userId="+this.userId);
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
      getFiles: function(event) {
        let file = event.target.files[0];
        this.photo = file;
        let url = "";
        var reader = new FileReader();
        reader.readAsDataURL(file);
        let that = this;
        reader.onload = function(e) {
          url = this.result.substring(this.result.indexOf(",") + 1);
          that.imgUrl = "data:image/png;base64," + url;
          // that.$refs['imgimg'].setAttribute('src','data:image/png;base64,'+url);
        };
      },
      openImg() {
        this.$refs.input.click();
      },
      openHomeModal() {
        this.modalStatus = true;
      },

      sub() {

        if (this.checkNum() === false) {
          return;
        }
        if (this.userMessage.userName === "") {
          alert("景点名称不能为空");
          return false;
        }
        if (this.userMessage.userDescription === "") {
          alert("景点简介不能为空");
          return false;
        }


//			alert(editor.txt.html());

        // var data = $("#form1").serialize();
        console.log(data);
        // var targetUrl = "http://localhost:8080/manager/product/save";
        var qs = require('querystring')
        let config = {
          header: {'Content-type': 'application/x-www-form-urlencoded'}
        };
        this.formData=new FormData();
        this.formData.append("userName",this.userMessage.userName);
        this.formData.append("userDescription",this.userMessage.userDescription);
        this.formData.append("userProvince",this.userMessage.userProvince);
        this.formData.append("userCity",this.userMessage.userCity);
        this.formData.append("userAddr",this.userMessage.userAddr);
        this.formData.append("userTel",this.userMessage.userTel);
        this.formData.append("userCostTime",this.userMessage.userCostTime);
        this.formData.append("userOpenTime",this.userMessage.userOpenTime);
        this.formData.append('headFile',this.photo);
        this.$axios.post("/user/save", qs.stringify(this.formData), config)
          .then(successReqponse => {
            alert("保存成功");
            this.$router.replace("/userList");
          })
          .catch(failRespose => {
            console.log("系统错误");
          })


      },

      checkNum() {
        var num=0;
        var themeList=this.lineMessage.themeId;
        for (var i = 0; i < themeList.length; i++)
          if (themeList[i].checked) num++;
        if (num < 1) {
          alert("至少要选择一个复选框");
          return false;
        }
      },

      checkIsIllegal() {
        var title;
        var price;
        var activeNum;
        var activeDays;
        var startareaName;
        var endAreaname;

      },

      clearNoNum(obj) {
        obj.value = obj.value.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符
        obj.value = obj.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
        obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
        obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');//只能输入两个小数
        if (obj.value.indexOf(".") < 0 && obj.value != "") {//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
          obj.value = parseFloat(obj.value);
        }
      },
      deleteImg(fileId){
        if(confirm("确实要删除吗？")){
          var qs=require('querystring')
          let config={
            header:{'Content-type':'application/x-www-form-urlencoded'}
          };
          /*let delData=new  FormData();
          delData.append("fileId",fileId);
          delData.append("userId",this.userId);*/
          var delData={"fileId":fileId,"userId":this.userId}
          this.$axios.post("user/delFile",qs.stringify(delData),config)
            .then(successResponse=>{
             /* if(successResponse.data==="noLogin"){
                alert("没有登录")
                this.$router.replace({path:'/adminLogin'})
              }*/
              if(successResponse.data.message==="OK") {
                alert("删除成功")
                this.ImageList=successResponse.data.ImageList;
              }
              else {
                alert(successResponse.data.message);
              }
            })
            .catch(failResponse=>{
              alert("响应异常")
            })
        }else {
          alert("已经取消了删除操作");
        }
      }
    }
  }

</script>

<style scoped>
  .slide-fade-enter-active {
    transition: all .3s ease;
  }

  .slide-fade-leave-active {
    transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */
  {
    transform: translateY(-10px);
    opacity: 0;
  }
</style>
