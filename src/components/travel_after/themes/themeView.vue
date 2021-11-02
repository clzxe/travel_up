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
                  <h1>主题</h1>
                  <ul class="cus-table">
                    <li>
                      <label>主题名称：</label>
                      <div class="cus-mold">
                        <label>{{theme.themeName}}</label>
                      </div>
                    </li>



                    <li>
                      <label>主题封面图片：</label>
                      <label> <el-image :src="require(theme.themePhoto)"></el-image></label>

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
    name: "themeView",
    data() {

      return {
        isSelectFile: false,
        imgUrl: "",
        themeId:'',
        photo: '',
        modalStatus2: false,
        modalStatus: false,
        m_title: "添加主题图片",
        m_content: "我是首页的内容",
        travelTimes:[],
        theme:[],
        ImageList:[],
        provinceList:[],
        themeList:[],
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
        this.themeId=this.$route.query.themeId;
        var qs = require('querystring')
        let config = {
          header: {'Content-type': 'application/x-www-form-urlencoded'}
        };
        this.$axios.get("/theme/getTheme?themeId="+this.themeId)
          .then(successReqponse => {
            this.theme=successReqponse.data.theme;
          })
          .catch(failRespose => {
            console.log("页面加载错误！正在重新载入...");
            this.$router.replace("/themeView?themeId="+this.themeId);
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
