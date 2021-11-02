<template>
    <div id="app">
      <VNav></VNav>
      <section class="rt_wrap content mCustomScrollbar">
        <div class="rt_content">
          <div class="page_title">

          </div>

          <div id="content">
            <div class="custom-made">

              <div class="cus-tourism-list">

                <div class="tourism-custom J_travel">

                  <form  method="post" name="travel-cus" class="cusForm">
                    <h1>城市</h1>
                    <ul class="cus-table">
                      <li>
                        <label>城市名称：</label>
                        <div class="cus-mold">
                          <label>{{city.cityName}}</label>
                        </div>
                      </li>
                      <li>
                        <label>所属省份：</label>
                        <label>{{city.provinceName}}</label>

                      </li>



                      <li>
                        <label>城市封面图片：</label>
                        <label> <el-image :src="require(city.cityPhoto)"></el-image></label>

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
  import Modal from '@/components/travel_after/common/model.vue';
  import VNav from "@/components/travel_after/common/nav";
    export default {
        name: "cityView",
      data() {

        return {
          isSelectFile: false,
          imgUrl: "",
          cityId:'',
          photo: '',
          modalStatus2: false,
          modalStatus: false,
          m_title: "添加城市图片",
          m_content: "我是首页的内容",
          travelTimes:[],
          city:[],
          ImageList:[],
          provinceList:[],
          cityList:[],
          btnType: [{"value": "确定", "class": "danger"}, {"value": "取消", "class": "defalut"}]
        }

      },
      components: {
        "v-modal": Modal,
        VNav
      },
      create:function(){
        this.getThemes();
      },
      methods: {
        getThemes:function(){
          this.cityId=this.$route.query.cityId;
          var qs = require('querystring')
          let config = {
            header: {'Content-type': 'application/x-www-form-urlencoded'}
          };
          this.$axios.get("/city/getcity?cityId="+this.cityId)
            .then(successReqponse => {
              this.city=successReqponse.data.city;
            })
            .catch(failRespose => {
              console.log("页面加载错误！正在重新载入...");
              this.$router.replace("/cityView?cityId="+this.cityId);
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
