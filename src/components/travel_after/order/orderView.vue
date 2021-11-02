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
                    <h1>订单</h1>
                    <ul class="cus-table">
                      <li>
                        <label>订单名称：</label>
                        <div class="cus-mold">
                          <label>{{order.orderName}}</label>
                        </div>
                      </li>
                      <li>
                        <label>用户：</label>
                        <div class="cus-mold"><!-- 改成连接-->
                          <label>{{order.userName}}</label>
                        </div>
                      </li>
                      <li>
                        <label>订单类别：</label>
                        <label><span v-if="order.orderType===1">酒店</span>
                          <span v-if="order.orderType===2">路线</span></label>

                      </li>
                      <li>
                        <label>路线或酒店名称：</label>
                        <label>
                          <span v-if="order.orderType===1">{{order.typeName}}{{order.roomName}}</span>
                          <span v-if="order.orderType===2">{{order.typeName}}</span></label>

                      </li>
                      <li>
                        <label>数量：</label>
                        <div class="cus-mold"><!-- 改成连接-->
                          <label>{{order.orderCount}}</label>
                        </div>
                      </li>
                      <li>
                        <label>单价：</label>
                        <div class="cus-mold"><!-- 改成连接-->
                          <label>{{order.orderSingelPrice}}</label>
                        </div>
                      </li>
                      <li>
                        <label>总价：</label>
                        <div class="cus-mold"><!-- 改成连接-->
                          <label>{{order.orderTotalPrice}}</label>
                        </div>
                      </li>
                      <li>
                        <label>创建时间：</label>
                        <label>{{order.createTime}}</label>

                      </li>
                      <li>
                        <label>  订单状态：</label>
                        <label><span v-if="order.orderStatus===1">已完成</span>
                          <span v-if="order.orderStatus===2">待付款</span>
                          <span v-if="order.orderStatus===3">待确认</span></label>
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
        name: "orderView",
      data() {

        return {
          isSelectFile: false,
          imgUrl: "",
          orderId:'',
          photo: '',
          modalStatus2: false,
          modalStatus: false,
          m_title: "添加订单图片",
          m_content: "我是首页的内容",
          travelTimes:[],
          order:[],
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
          this.orderId=this.$route.query.orderId;
          var qs = require('querystring')
          let config = {
            header: {'Content-type': 'application/x-www-form-urlencoded'}
          };
          this.$axios.get("/orderId/getorder?orderId="+this.orderId)
            .then(successReqponse => {
              this.order=successReqponse.data.order;
            })
            .catch(failRespose => {
              console.log("页面加载错误！正在重新载入...");
              this.$router.replace("/orderView?orderId="+this.orderId);
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
