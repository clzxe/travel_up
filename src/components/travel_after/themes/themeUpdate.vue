<template>
  <div id="app">
    <section class="rt_wrap content mCustomScrollbar">
      <div class="rt_content">
        <div class="page_title">
          <h2 class="fl">新增产品</h2>

        </div>
        <form class="form-horizontal" role="form" onsubmit="return false;" id="form1">
          <input type="hidden" class="form-control" v-model="themeMessage.themeId"   required="required">

          <div class="form-group">
            <label class="col-sm-2 control-label">主题名称</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" v-model="theme.themeName" id="themeName" name="themeName" placeholder="主题名称" required="required">
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">主题封面</label>
            <div class="col-sm-10" style="max-width: 300px;">
              <input v-show="false" type="file" accept="image/*" @change="getFiles($event)" ref="input" />
              <div style="width:200px;height:200px;border:1px solid;text-align:center;" @click="openImg">
                <span v-if="imgUrl==''">点击上传</span>
                <img style="height:100%;width:100%;" v-if="imgUrl!=''" :src="imgUrl" />
              </div>

            </div>
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
    name: "themeAdd",
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
        themeMessage:[],
        travelTimes:[],
        provinceList:[],
        ImageList:[],
        themeList:[],
        themeId:'',
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
        this.themeId=this.$route.query.themeId;
        var qs = require('querystring')
        let config = {
          header: {'Content-type': 'application/x-www-form-urlencoded'}
        };
        this.$axios.get("/theme/gettheme?themeId="+this.themeId)
          .then(successReqponse => {
            this.themeMessage=successReqponse.data.theme;
            this.classList=successReqponse.data.classList;
          })
          .catch(failRespose => {
            console.log("页面加载错误！正在重新载入...");
            this.$router.replace("/themeUpdate?themeId="+this.themeId);
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
        if (this.themeMessage.themeName === "") {
          alert("景点名称不能为空");
          return false;
        }
        if (this.themeMessage.themeDescription === "") {
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
        this.formData.append("themeName",this.theme.themeName);
        this.formData.append("provinceId",this.theme.provinceId);
        this.formData.append("themePhoto",this.photo);
        this.$axios.post("/theme/save", this.formData, config)
          .then(successReqponse => {
            alert("保存成功");
            this.$router.replace("/themeList");
          })
          .catch(failRespose => {
            console.log("系统错误");
          })


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
    opatheme: 0;
  }
</style>
