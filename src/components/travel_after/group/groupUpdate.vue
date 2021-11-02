<template>
  <div id="app">
    <section class="rt_wrap content mCustomScrollbar">
      <div class="rt_content">
        <div class="page_title">
          <h2 class="fl">新增旅行团</h2>

        </div>
        <form class="form-horizontal" role="form" onsubmit="return false;" id="form1">
          <div class="form-group">
            <label class="col-sm-2 control-label">旅行团名称</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" v-model="group.groupName" id="groupName" name="groupName" placeholder="旅行团名称" required="required">
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label"> 旅行团简介</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" name="description" v-model="group.groupDes" placeholder="旅行团简介" required="required">
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
    name: "groupAdd",
    data() {
      return {
        formData: "",
        group:[]
      }

    },
    components: {
      "v-modal": Modal,
      "v-upload1": upload
    },
    create:function(){
      this.init()
    },
    methods: {
      init(){
        this.groupId=this.$route.query.groupId;
        var qs = require('querystring')
        let config = {
          header: {'Content-type': 'application/x-www-form-urlencoded'}
        };
        this.$axios.get("/group/getGroup?groupId="+this.groupId)
          .then(successReqponse => {
            this.group=successReqponse.data.group;
          })
          .catch(failRespose => {
            console.log("页面加载错误！正在重新载入...");
            this.$router.replace("/group/update?scenicId="+this.scenicId);
          })
      },
      sub() {


        if (this.group.groupName === "") {
          alert("旅行团名称不能为空");
          return false;
        }
        if (this.group.groupDes === "") {
          alert("旅行团简介不能为空");
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
        this.$axios.post("/group/save", qs.stringify(this.group), config)
          .then(successReqponse => {
            alert("保存成功");
            this.$router.replace("/groupList");
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
    opacity: 0;
  }
</style>
