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
                    <h1>评价</h1>
                    <ul class="cus-table">
                      <li>
                        <label>订单编号：</label>
                        <div class="cus-mold">
                          <label>{{evaluate.orderId}}</label>
                        </div>
                      </li>
                      <li>
                        <label>用户：</label>
                        <div class="cus-mold"><!-- 改成连接-->
                          <label>{{evaluate.userName}}</label>
                        </div>
                      </li>
                      <li>
                        <label>评价类别：</label>
                        <div class="cus-mold">
                          <label> <span v-if="evaluate.evaluateLevel===1"><el-button class="icon-smile">好评</el-button></span>
                            <span v-if="evaluate.evaluateLevel===2"><el-button class="icon-meh">中评</el-button></span>
                            <span v-if="evaluate.evaluateLevel===3"><el-button class="icon-frown">差评</el-button></span>
                          </label>
                        </div>
                      </li>
                      <li>
                        <label>评价内容：</label>
                        <div class="cus-mold"><!-- 改成连接-->
                          <label>{{evaluate.evaluateContent}}</label>
                        </div>
                      </li>

                      <li>
                        <label>创建时间：</label>
                        <label>{{evaluate.createTime}}</label>

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
        name: "evaluateView",
      data() {

        return {
          isSelectFile: false,
          imgUrl: "",
          evaluateId:'',
          photo: '',
          modalStatus2: false,
          modalStatus: false,
          m_title: "添加评价图片",
          m_content: "我是首页的内容",
          travelTimes:[],
          evaluate:[],
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
          this.evaluateId=this.$route.query.evaluateId;
          var qs = require('querystring')
          let config = {
            header: {'Content-type': 'application/x-www-form-urlencoded'}
          };
          this.$axios.get("/evaluateId/getevaluate?evaluateId="+this.evaluateId)
            .then(successReqponse => {
              this.evaluate=successReqponse.data.evaluate;
            })
            .catch(failRespose => {
              console.log("页面加载错误！正在重新载入...");
              this.$router.replace("/evaluateView?evaluateId="+this.evaluateId);
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
