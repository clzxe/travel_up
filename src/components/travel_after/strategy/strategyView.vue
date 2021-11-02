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
                    <h1>攻略</h1>
                    <ul class="cus-table">
                      <li>
                        <label>攻略名称：</label>
                        <div class="cus-mold">
                          <label>{{strategy.strategyName}}</label>
                        </div>
                      </li>
                      <li>
                        <label>景点名称：</label>
                        <div class="cus-mold"><!-- 改成连接-->
                          <label>{{strategy.scenicName}}</label>
                        </div>
                      </li>
                      <li>
                        <label>创建用户：</label>
                        <label>{{strategy.userName}}</label>

                      </li>

                      <li>
                        <label>攻略描述：</label>
                        <label>{{strategy.strategyContent}}</label>

                      </li>

                      <li>
                        <label>创建时间：</label>
                        <label>{{strategy.createTime}}</label>

                      </li>
                      <li>
                        <label>  修改时间：</label>
                        <label>{{strategy.updateTime}}</label>
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
        name: "strategyView",
      data() {

        return {
          isSelectFile: false,
          imgUrl: "",
          strategyId:'',
          photo: '',
          modalStatus2: false,
          modalStatus: false,
          m_title: "添加攻略图片",
          m_content: "我是首页的内容",
          travelTimes:[],
          strategy:[],
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
          this.strategyId=this.$route.query.strategyId;
          var qs = require('querystring')
          let config = {
            header: {'Content-type': 'application/x-www-form-urlencoded'}
          };
          this.$axios.get("/strategy/getstrategy?strategyId="+this.strategyId)
            .then(successReqponse => {
              this.strategy=successReqponse.data.strategy;
            })
            .catch(failRespose => {
              console.log("页面加载错误！正在重新载入...");
              this.$router.replace("/strategy/update?strategyId="+this.strategyId);
            })

        },
        changeCity:function(){
          var qs = require('querystring')
          let config = {
            header: {'Content-type': 'application/x-www-form-urlencoded'}
          };
          this.$axios.get("/strategy/getCityList?provinceId="+this.strategyMessage.strategyProvince)
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
              this.$router.replace("/strategyAdd");
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
