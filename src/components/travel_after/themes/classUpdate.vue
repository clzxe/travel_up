<template>
  <div id="app">
    <section class="rt_wrap content mCustomScrollbar">
      <div class="rt_content">
        <div class="page_title">
          <h2 class="fl">新增产品</h2>

        </div>
        <form class="form-horizontal" role="form" onsubmit="return false;" id="form1">
          <input type="hidden" class="form-control" v-model="classMessage.classId"   required="required">

          <div class="form-group">
            <label class="col-sm-2 control-label">主题名称</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" v-model="classMessage.className" id="className" name="className" placeholder="主题名称" required="required">
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
    name: "classAdd",
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
        classMessage:[],
        travelTimes:[],
        provinceList:[],
        ImageList:[],
        classList:[],
        classId:'',
        btnType: [{"value": "确定", "class": "danger"}, {"value": "取消", "class": "defalut"}]
      }

    },
    components: {
      "v-modal": Modal,
      "v-upload1": upload
    },
    create:function(){
      this.getclasss();
    },
    methods: {
      getclasss:function(){
        this.classId=this.$route.query.classId;
        var qs = require('querystring')
        let config = {
          header: {'Content-type': 'application/x-www-form-urlencoded'}
        };
        this.$axios.get("/class/getclass?classId="+this.classId)
          .then(successReqponse => {
            this.classMessage=successReqponse.data.class;
            this.imgUrl = "data:image/png;base64," + successReqponse.data.class.classPohto;
          })
          .catch(failRespose => {
            console.log("页面加载错误！正在重新载入...");
            this.$router.replace("/classUpdate?classId="+this.classId);
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
        if (this.classMessage.className === "") {
          alert("景点名称不能为空");
          return false;
        }
        if (this.classMessage.classDescription === "") {
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
        this.formData.append("className",this.class.className);
        this.formData.append("classId",this.class.classId);
        this.$axios.post("/class/update", this.formData, config)
          .then(successReqponse => {
            alert("保存成功");
            this.$router.replace("/classList");
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
    opaclass: 0;
  }
</style>
