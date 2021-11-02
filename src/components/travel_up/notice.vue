<template>
    <div>
      <VHeader :currentHeader="1"></VHeader>
      <div :style="{background:bg}">
        <div style="background-color: white;width: 85%;margin-left: 7%">
          <p>&nbsp;</p>
          <span style="padding-left: 10%">公告 > {{notice.noticeTitle}}</span>
          <section id="view" clock>
            <div class="demo" style="margin-top: 4%">
              <div class="demo-warp" style="margin-top: 4%">
                <el-header style="background: rgba(250,255,251,0.96);margin-top: 2%">
                  <h4 style="font-size: 25px;color: #ff7867;text-align: center">{{notice.noticeTitle}}</h4>
                </el-header>
                <el-main id="information">
                  <el-header class="scenic_header" style="background: rgba(250,255,251,0.96);padding-left:5%;margin-top: 2%;height: auto;margin-bottom: 4%" >
                    <div style="margin-top: 4%;margin-bottom: 2%;text-align: center" v-html="notice.noticeContent" >

                    </div>
                    <div style="margin-top: 4%;margin-bottom: 2%;text-align: right"  >
                      {{notice.createTime}}
                    </div>
                  </el-header>
                  <el-header  >
                    <el-button @click="back" style="margin-left: 45%;margin-top: 1%">返回</el-button>

                  </el-header>

                </el-main>

              </div>
            </div>
          </section>


        </div>
      </div>
      <div id="footer">
        <VFooter></VFooter>
      </div>
    </div>
</template>

<script>
  import VFooter from "@/components/travel_up/common/Footer";
  import VHeader from '@/components/travel_up/common/Header'
  export default {
        name: "notice",
    components:{
      VFooter,
      VHeader
    },
    data(){
         return{
           bg:'url('+require('../../assets/images/5ff1cbaa8650f.jpg')+')',
           isActive:1,
           all: 10, //总页数
           cur: 1,//当前页码
           totalPage: 0,//当前条数
           totalCount:124,
           scenic:[],
           strategyList:[],
           ImageList:[],
           scenicMessage:{
             scenicId:'',
             pageIndex:1,
             size:16
           },
           notice:[],
           noticeId:'',
         }
    },
    mounted:function () {
      this.noticeId=this.$route.query.noticeId;
      this.init();
    },
    methods:{
      init() {
        var qs = require('querystring')
        let config = {
          header: {'Content-type': 'application/x-www-form-urlencoded'}
        };
        this.$axios.get("/notice/getnotice?noticeId="+this.noticeId)
          .then(successReqponse => {
            var data = successReqponse.data;
            this.notice = data.notice;
          })
          .catch(failRespose => {
            console.log("页面加载错误！正在重新载入...");
            //this.$router.replace("/leaderAdd");
          })
      },
      back(){
        this.$router.go(-1);//返回上一层
      }
    }
    }
</script>

<style scoped>
  html,
  body,
  section {
    width: 100%;
    height: 100%;
  }

  [v-clock] {
    display: none;
  }

  section {
    display: flex;
    flex-direction: column;
  }

  #view{
    padding-left: 1px!important;
  }
</style>
