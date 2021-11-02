<template>
    <div >
      <VHeader :currentHeader="0"></VHeader>


      <!-- banner start-->
      <section id="banner">
        <div id="carousel-example-generic" class="carousel slide" data-ride="carousel" data-interval="2000">
          <!-- Indicators -->
          <ol class="carousel-indicators">
            <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
            <li data-target="#carousel-example-generic" data-slide-to="1"></li>
            <li data-target="#carousel-example-generic" data-slide-to="2"></li>

          </ol>
          <!-- Wrapper for slides -->
          <div class="carousel-inner" role="listbox">
            <div class="item active">
              <router-link :to="{path:'scenic',query:{scenicId:'9'}}"><img style="width: 100%" src="@/assets/images/banner_1.jpg" alt="">
              </router-link>
            </div>
            <div class="item">
              <router-link :to="{path:'scenic',query:{scenicId:'11'}}"><img style="width: 100%" src="@/assets/images/banner_2.jpg" alt=""></router-link>
            </div>
            <div class="item">
              <router-link :to="{path:'scenic',query:{scenicId:'10'}}"><img style="width: 100%" src="@/assets/images/banner_3.jpg" alt=""></router-link>
            </div>

          </div>
          <!-- Controls -->
          <a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
            <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
            <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
      </section>
      <!-- banner end-->
      <!-- 旅游 start-->
      <section id="content">
        <!-- 黑马精选start-->
        <section class="hemai_jx">
          <div class="jx_top">
            <div class="jx_tit">
              <img src="@/assets/images/icon_5.jpg" alt="">
              <span>黑马精选</span>
            </div>
            <!-- Nav tabs -->
            <ul class="jx_tabs" role="tablist">
              <li role="presentation" class="active">
                <span></span>
                <a href="#popularity" aria-controls="popularity" role="tab" data-toggle="tab">人气旅游</a>
              </li>
              <li role="presentation">
                <span></span>
                <a href="#newest" aria-controls="newest" role="tab" data-toggle="tab">最新旅游</a>
              </li>
              <li role="presentation">
                <span></span>
                <a href="#bestStrategy" aria-controls="bestStrategy" role="tab" data-toggle="tab">精华攻略</a>
              </li>



            </ul>
          </div>
          <div class="jx_content">
            <!-- Tab panes -->
            <div class="tab-content">
              <div role="tabpanel" class="tab-pane active" id="popularity">
                <div class="row" style="margin-top: 2%">
                  <div class="col-md-3" v-for="(line1,lid) in hot_line" :key="lid">
                    <router-link :to="{path:'lines',query:{lineId:line1.lineId}}" style="width: 90%;margin-left: 5%;height: 250px">
                      <img :src="line1.linePhoto" alt="" style="height: 148px">
                      <div class="has_border" style="height: 94px;">
                        <h3>{{line1.lineName}}</h3>
                        <div class="price">网付价<em>￥</em><strong>{{line1.linePrice}}</strong><em>起</em></div>
                      </div>
                    </router-link>
                  </div>
                </div>
              </div>
              <div role="tabpanel" class="tab-pane" id="bestStrategy">
                <div class="row" style="margin-top: 2%">
                  <div class="col-md-3" v-for="(str,stid) in best_strategy" :key="stid">
                    <router-link :to="{path:'strategy',query:{strategyId:str.strategyId}}">
                      <img :src="str.strategyImg" alt="" style="height: 148px">
                      <div class="has_border" style="height: 94px;">
                        <h3>{{str.strategyName}}</h3>
                        <div class="price" style="text-align: right;"><strong>点击查看</strong></div>
                      </div>
                    </router-link>
                  </div>

                </div>
              </div>
              <div role="tabpanel" class="tab-pane" id="newest">
                <div class="row" style="margin-top: 2%">
                  <div class="col-md-3" v-for="(line,nlid) in new_line" :key="nlid">
                    <router-link :to="{path:'lines',query:{lineId:line.lineId}}" style="width: 90%;margin-left: 5%;height: 250px">
                      <img :src="line.linePhoto" alt="" style="height: 148px">
                      <div class="has_border" style="height: 94px;">
                        <h3>{{line.lineName}}</h3>
                        <div class="price">网付价<em>￥</em><strong>{{line.linePrice}}</strong><em>起</em></div>
                      </div>
                    </router-link>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>
        <!-- 黑马精选end-->
        <!-- 国内游 start-->

        <section class="hemai_jx" >
          <div class="jx_top">
            <div class="jx_tit">
              <img src="@/assets/images/xihuan.png" alt="">
              <span>猜你喜欢</span>
            </div>
          </div>
          <div class="heima_gn" style="    height: 550px;">
            <div class="guonei_l">
              <img src="@/assets/images/VCG41N1090935384.jpg" style="width: 100%;height: 500px" alt="">
            </div>
            <div class="guone_r">
              <div class="row" style="margin-top: 2%">
                <div class="col-md-4" v-for="(scenic1,sid) in likeList" :key="sid" v-if="scenic1!=null">
                  <router-link :to="{path:'scenic',query:{scenicId:scenic1.scenicId}}" style="width: 90%;margin-left: 5%;height: 250px">
                    <img :src="scenic1.scenicImg" alt="" style="height: 148px">
                    <div class="has_border" style="height: 94px;">
                      <h3>{{scenic1.scenicName}}</h3>
                      <div class="price">点击查看</div>
                    </div>
                  </router-link>
                </div>

              </div>
            </div>
          </div>
        </section>
        <!-- 国内游 end-->
        <!-- 境外游 start-->
        <section class="hemai_jx">
          <div class="jx_top">
            <div class="jx_tit">
              <img src="@/assets/images/icon_7.jpg" alt="">
              <span>系统公告</span>
            </div>
          </div>
          <div class="heima_gn" style="height: 350px;">
            <div class="guonei_l">
              <img src="@/assets/images/0zg38120008g0r9reDD61.jpg" style="width: 100%;height: 490px;" alt="">
            </div>
            <div class="guone_r">
              <div class="row" v-if="notices.length!==0">

                <div class="col-md-4" style="width: 100%;" v-for="notice in notices">
                  <router-link :to="{path:'notice',query:{noticeId:notice.noticeId}}">

                    <div class="has_border">
                      <h3>{{notice.noticeTitle}}</h3>
                    </div>
                  </router-link>
                </div>

              </div>
            </div>
          </div>
        </section>
        <!-- 境外游 end-->

      </section>
      <!-- 旅游 end-->
      <!--导入底部-->
      <div id="footer">
        <VFooter></VFooter>
      </div>

    </div>

</template>
<script>

  import VFooter from "@/components/travel_up/common/Footer";
  import VHeader from '@/components/travel_up/common/Header'
  export default {
    name: 'App',
    components:{
      VFooter,
      VHeader
    },
    data(){
      return{
        turn_scenic:[],
        hot_line:[],
        new_line:[],
        best_strategy:[],
        hot_scenic:[],
        themes:[],
        notices:[],
        likeList:[]
      }
    },
    mounted:function () {
     this.loadIndex();
    },
    methods:{
      loadIndex(){
        var qs=require('querystring')
        let config={
          header:{'Content-type':'application/x-www-form-urlencoded'}
        };
        this.$axios.post('/index',config)
        .then(successResponse=>{
          this.hot_scenic=successResponse.data.hot_scenic;
          this.hot_line=successResponse.data.hot_line;
          console.log( this.hot_line);
          this.new_line=successResponse.data.new_line;
          this.best_strategy=successResponse.data.best_strategy;
          this.notices=successResponse.data.notices;
          this.likeList=successResponse.data.likeList;
        })


      }
    }
  }


</script>

<style >

</style>

