<template>
  <div id="app">
    <section class="rt_wrap content mCustomScrollbar">
      <div class="rt_content">
        <div class="page_title">
          <h2 class="fl">新增产品</h2>

        </div>
        <form class="form-horizontal" role="form" onsubmit="return false;" id="form1">
          <input type="hidden" class="form-control" v-model="noticeMessage.noticeId"   required="required">

          <div class="form-group">
            <label class="col-sm-2 control-label">公告标题</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" v-model="notice.noticeTitle" id="noticeTitle" name="noticeName" placeholder="公告名称" required="required">
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">公告内容</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" v-model="notice.noticeContent" id="noticeContent" name="noticeName" placeholder="公告名称" required="required">
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
    name: "noticeAdd",
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
        notice:[],
        travelTimes:[],
        provinceList:[],
        ImageList:[],
        noticeList:[],
        noticeId:'',
        btnType: [{"value": "确定", "class": "danger"}, {"value": "取消", "class": "defalut"}]
      }

    },
    components: {
      "v-modal": Modal,
      "v-upload1": upload
    },
    create:function(){
      this.getnotices();
    },
    methods: {
      getnotices:function(){
        this.noticeId=this.$route.query.noticeId;
        var qs = require('querystring')
        let config = {
          header: {'Content-type': 'application/x-www-form-urlencoded'}
        };
        this.$axios.get("/notice/getnotice?noticeId="+this.noticeId)
          .then(successReqponse => {
            this.notice=successReqponse.data.notice;
            this.imgUrl = "data:image/png;base64," + successReqponse.data.notice.noticePohto;
          })
          .catch(failRespose => {
            console.log("页面加载错误！正在重新载入...");
            this.$router.replace("/noticeUpdate?noticeId="+this.noticeId);
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
        if (this.noticeMessage.noticeName === "") {
          alert("景点名称不能为空");
          return false;
        }
        if (this.noticeMessage.noticeDescription === "") {
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
        this.$axios.post("/notice/save",qs.stringify(this.notice), config)
          .then(successReqponse => {
            alert("保存成功");
            this.$router.replace("/noticeList");
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
    opanotice: 0;
  }
</style>
