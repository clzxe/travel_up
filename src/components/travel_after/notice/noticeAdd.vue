<template>
  <div id="app">
    <section class="rt_wrap content mCustomScrollbar">
      <div class="rt_content">
        <div class="page_title">
          <h2 class="fl">新增公告</h2>

        </div>
        <form class="form-horizontal" role="form" onsubmit="return false;" id="form1">

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
        notice:{
          noticeTitle:'',
          noticeContent:''
        },
        provinceList:[],
        noticeList:[],
        travelTimes:{

        },
        notices:[],
        btnType: [{"value": "确定", "class": "danger"}, {"value": "取消", "class": "defalut"}]
      }

    },
    components: {
      "v-modal": Modal,
      "v-upload1": upload
    },
    create:function(){
    },
    methods: {
      getFiles: function(event) {
        let file = event.target.files[0];
        this.notice.noticePhoto = file;
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

        if (this.notice.noticeName === "") {
          alert("公告名称不能为空");
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

        this.$axios.post("/notice/save", qs.stringify(this.notice), config)
          .then(successReqponse => {
            alert("保存成功");
            this.$router.replace("/noticeList");
          })
          .catch(failRespose => {
            console.log("系统错误");
          })


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
