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
                    <h1>景点</h1>
                    <ul class="cus-table">
                      <li>
                        <label>路线名称：</label>
                        <div class="cus-mold">
                          <label>{{line_group.lineName}}</label>
                        </div>
                      </li>
                      <li>
                        <label>旅行团：</label>
                        <label>{{line_group.groupName}}</label>

                      </li>

                      <li>
                        <label>出发日期：</label>
                        <label>{{line_group.lineStartTime}}</label>

                      </li>
                      <li>
                        <label>  限制人数：</label>
                        <label>{{line_group.linePeople}}</label>
                      </li>
                      <li>
                        <label>  导游：</label>
                        <label>{{line_group.leaderName}}</label>
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
        name: "line_groupView",
      data() {

        return {
          isSelectFile: false,
          imgUrl: "",
          line_groupId:'',
          photo: '',
          modalStatus2: false,
          modalStatus: false,
          m_title: "添加景点图片",
          m_content: "我是首页的内容",
          travelTimes:[],
          line_group:[],
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
          this.line_groupId=this.$route.query.line_groupId;
          var qs = require('querystring')
          let config = {
            header: {'Content-type': 'application/x-www-form-urlencoded'}
          };
          this.$axios.get("/line_group/getline_group?line_groupId="+this.line_groupId)
            .then(successReqponse => {
              this.line_group=successReqponse.data.line_group;
            })
            .catch(failRespose => {
              console.log("页面加载错误！正在重新载入...");
              this.$router.replace("/line_groupView?line_groupId="+this.line_groupId);
            })

        },
        changeCity:function(){
          var qs = require('querystring')
          let config = {
            header: {'Content-type': 'application/x-www-form-urlencoded'}
          };
          this.$axios.get("/line_group/getCityList?provinceId="+this.line_groupMessage.line_groupProvince)
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
              this.$router.replace("/line_groupAdd");
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
