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
                    <h1>旅行团</h1>
                    <ul class="cus-table">
                      <li>
                        <label>旅行团名称：</label>
                        <div class="cus-mold">
                          <label>{{group.groupName}}</label>
                        </div>
                      </li>
                      <li>
                        <label>旅行团描述：</label>
                        <label>{{group.groupDes}}</label>

                      </li>

                      <li>
                        <label>旅行团创建时间：</label>
                        <label>{{group.groupCeatetime}}</label>

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
        name: "groupView",
      data() {

        return {
          isSelectFile: false,
          imgUrl: "",
          groupId:'',
          photo: '',
          modalStatus2: false,
          modalStatus: false,
          m_title: "添加景点图片",
          m_content: "我是首页的内容",
          travelTimes:[],
          group:[],
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
          this.groupId=this.$route.query.groupId;
          var qs = require('querystring')
          let config = {
            header: {'Content-type': 'application/x-www-form-urlencoded'}
          };
          this.$axios.get("/groupId/getgroup?groupId="+this.groupId)
            .then(successReqponse => {
              this.group=successReqponse.data.group;
            })
            .catch(failRespose => {
              console.log("页面加载错误！正在重新载入...");
              this.$router.replace("/group/view?groupId="+this.groupId);
            })

        },
        back(){
          this.$router.go(-1);//返回上一层
        }

      }
    }

</script>

<style scoped>

</style>
