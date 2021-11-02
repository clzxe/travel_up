<template>
  <div id="app">
    <VHeader :currentHeader="1"></VHeader>
    <div :style="{background:bg}">
      <div style="background-color: white;width: 85%;margin-left: 7%">
        <p>&nbsp;</p>
        <span style="padding-left: 10%">景点 > {{scenic.scenicName}}</span>
        <el-header style="background: rgba(250,255,251,0.96);padding-left: 10%;margin-top: 2%">
          <h1 style="font-size: 35px;color: grey">{{scenic.scenicName}}</h1>
        </el-header>
        <el-header class="scenic_header">
          <el-button   class="scenic_button" @click="toInformation" :class="{'scenic-active':isActive===1}">概况</el-button>
          <el-button   class="scenic_button " @click="toStrategy" :class="{'scenic-active':isActive===2}">游玩攻略</el-button>
        <el-button @click="gotoStrategy"   class="scenic_button " style="margin-left: 50%;color: #ffb611" ><i class="el-icon-edit-outline" style=" font-size: 20px;color: #ffb611;margin-top: 10%"></i>写攻略</el-button>
          <el-button class="scenic_button "><i  class="el-icon-star-off" :key="0" v-if="!isCollection"
                                       @click="onCollection"
                                       style="font-size: 20px; color: #ff2ab8;margin-top: 20%"></i>
            <i  class="el-icon-star-on" :key="1" @click="offCollection" v-else
               style="font-size: 20px; color: #ff2ab8;margin-top: 20%"></i>&nbsp;&nbsp;&nbsp;{{countCollect}}
          </el-button>

        </el-header>
        <el-main id="information">
          <section id="banner"  style="width: 80%; margin-left: 10%;">
            <div id="carousel-example-generic" class="carousel slide" data-ride="carousel" data-interval="2000">
              <!-- Indicators -->
              <ol class="carousel-indicators">


                  <li data-target="#carousel-example-generic" data-slide-to="index" v-for="(image,index) in ImageList" v-if="index===0" class="active" ></li>
                  <li data-target="#carousel-example-generic" data-slide-to="index" v-else  ></li>

              </ol>
              <!-- Wrapper for slides -->
              <div class="carousel-inner" role="listbox">

                  <div v-for="(image2,index) in ImageList" class="item " :class="{active:index===0}" >
                    <img :src="image2.filePath" alt="" style="width: 100%;height: 400px">
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
          <el-header class="scenic_header" style="background: rgba(250,255,251,0.96);padding-left:5%;margin-top: 2%;height: auto;margin-bottom: 4%" >
            <div style="margin-top: 4%;margin-bottom: 2%;" v-html="scenic.scenicDescription" >

            </div>
          </el-header>
          <el-header class="scenic_des" style="text-align: center">
            <div class="col-lg-4">
             电话<br/><br/>
              {{scenic.scenicTel}}
            </div>
            <div class="col-lg-4" style="border-left-color: #cecece;
  border-left-style: solid;
  border-left-width: thin;">
             所属省份/直辖市<br/><br/>
              {{scenic.provinceName}}
            </div>
            <div class="col-lg-4" style="border-left-color: #cecece;
  border-left-style: solid;
  border-left-width: thin;">
              用时参考<br/><br/>
             <div >
               {{scenic.scenicCostTime}}
             </div>

            </div>
          </el-header>
          <el-header class="scenic_des" style="text-align: center">
            <div class="col-lg-4">
              价格<br/><br/>
              {{scenic.scenicPrice}}
            </div>
            <div class="col-lg-4" style="border-left-color: #cecece;
  border-left-style: solid;
  border-left-width: thin;">
              适合游玩人群<br/><br/>
              {{scenic.acceptPeople}}
            </div>
            <div class="col-lg-4" style="border-left-color: #cecece;
  border-left-style: solid;
  border-left-width: thin;">
              适合游玩季节<br/><br/>
              <div >
                {{scenic.acceptSeason}}
              </div>

            </div>
          </el-header>
          <el-header class="scenic_time1" style="height:200px">
            <p style="margin-bottom: 2%">所属类别</p>
            <div style="font-family: 等线,serif" >
              <span v-for="type in typeList">{{type}}</span>
            </div>

          </el-header>
          <el-header class="scenic_time1" style="height:200px">
            <p style="margin-bottom: 2%">开放时间</p>
            <div style="font-family: 等线,serif" v-html="scenic.scenicOpenTime">

            </div>

          </el-header>

        </el-main>
        <el-main >
          <el-header style="background: rgba(250,255,251,0.96);margin-top: 2%; border-bottom-color: #cecece;
  border-bottom-style: solid;
  border-bottom-width: thin;width: 80%;
  margin-left: 10%;">
            <h1 style="font-size: 25px;color: grey">地址</h1>
          </el-header>
          <el-main style="padding-left: 15%;margin-top: 1%">
            <h3 style="font-size: 25px;color: grey">{{scenic.provinceName}}{{scenic.cityName}}{{scenic.scenicAddr}}</h3>
            <baidu-map class="map" id="mapID" center="杭州市" :zoom="zoom" :scroll-wheel-zoom="true" @click="getPoint" >
              <!--地图类型，两种：一种是路线一种是绿的那种-->
              <bm-map-type :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']" anchor="BMAP_ANCHOR_TOP_LEFT"></bm-map-type>
              <!--地图搜索功能，绑定上面的input，-->
              <!--display: none样式很关键，因为下面默认会有地址提示信息很长，很烦，这样搜索会很舒服，-->
              <!--zoom是搜索结果的视图比例，个人觉得12.8很舒服显示-->
              <bm-local-search :keyword="keyword" :auto-viewport="true" :location="location" zoom="12.8" style="display: none"></bm-local-search>
              <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
              <!--信息窗口，show属性是控制显示隐藏，infoWindowClose和infoWindowOpen是控制信息窗口关闭隐藏的方法-->
              <bm-marker :position="postionMap" >
                <bm-info-window :show="show" @close="infoWindowClose" @open="infoWindowOpen" style="font-size: 14px">
                  <p>站点：{{ add.siteName }}</p>
                  <p>站点地址：{{ add.site }}</p>
                </bm-info-window>
              </bm-marker>
            </baidu-map>
          </el-main>
        </el-main>
        <el-main >

          <el-main style="margin-top: 1%">
            <section id="content">
              <!-- 黑马精选start-->
              <section class="hemai_jx">
                <div class="jx_top">
                  <div class="jx_tit">
                    <img src="@/assets/images/icon_5.jpg" alt="">
                    <span>猪猪精选</span>
                  </div>
                  <!-- Nav tabs -->
                  <ul class="jx_tabs" role="tablist">
                    <li role="presentation" class="active">
                      <span></span>
                      <a href="#popularity" aria-controls="popularity" role="tab" data-toggle="tab">猜你喜欢</a>
                    </li>

                    <li role="presentation">
                      <span></span>
                      <a href="#newest" aria-controls="newest" role="tab" data-toggle="tab">周边景点</a>
                    </li>
                    <li role="presentation">
                      <span></span>
                      <a href="#bestStrategy" aria-controls="bestStrategy" role="tab" data-toggle="tab">相似景点</a>
                    </li>


                  </ul>
                </div>
                <div class="jx_content">
                  <!-- Tab panes -->
                  <div class="tab-content">
                    <div role="tabpanel" class="tab-pane active" id="popularity">
                      <div class="row" style="margin-top: 2%">
                        <div class="col-md-3" v-for="(line1,lid) in likeList" :key="lid" v-if="line1!=null">
                          <router-link :to="{path:'scenic',query:{scenicId:line1.scenicId}}" style="width: 90%;margin-left: 5%;height: 250px">
                            <img :src="line1.scenicImg" alt="" style="height: 148px">
                            <div class="has_border" style="height: 94px;">
                              <h3>{{line1.scenicName}}</h3>
                              <div class="price" style="text-align: right"><strong>点击查看</strong></div>
                            </div>
                          </router-link>
                        </div>
                      </div>
                    </div>
                    <div role="tabpanel" class="tab-pane" id="bestStrategy">
                      <div class="row" style="margin-top: 2%">
                        <div class="col-md-3" v-for="(scenic1,lid) in themeList" :key="lid">
                          <router-link :to="{path:'scenic',query:{scenicId:scenic1.scenicId}}" style="width: 90%;margin-left: 5%;height: 250px">
                            <img :src="scenic1.scenicImg" alt="" style="height: 148px">
                            <div class="has_border" style="height: 94px;">
                              <h3>{{scenic1.scenicName}}</h3>
                              <div class="price" style="text-align: right"><strong>点击查看</strong></div>
                            </div>
                          </router-link>
                        </div>


                      </div>
                    </div>
                    <div role="tabpanel" class="tab-pane" id="newest">
                      <div class="row" style="margin-top: 2%">
                        <div class="col-md-3" v-for="(scenic2,lid) in cityScenicList" :key="lid" v-if="cityScenicList!=null">
                          <router-link :to="{path:'scenic',query:{scenicId:scenic2.scenicId}}" style="width: 90%;margin-left: 5%;height: 250px">
                            <img :src="scenic2.scenicImg" alt="" style="height: 148px">
                            <div class="has_border" style="height: 94px;">
                              <h3>{{scenic2.scenicName}}</h3>
                              <div class="price" style="text-align: right"><strong>点击查看</strong></div>
                            </div>
                          </router-link>
                        </div>

                      </div>
                    </div>

                  </div>
                </div>
              </section>
            </section>
          </el-main>
        </el-main>
        <el-main id="strategy">
          <el-header style="background: rgba(250,255,251,0.96);margin-top: 2%; border-bottom-color: #cecece;
  border-bottom-style: solid;
  border-bottom-width: thin;width: 80%;
  margin-left: 10%;">
            <h1 style="font-size: 25px;color: grey">游玩攻略</h1>
          </el-header>
          <el-main style="padding-left: 15%;margin-top: 1%">
            <div v-if="strategyList.length===0" style="font-family: 等线,serif;font-size: 30px;">
              <span style="color: #EA8010;margin-left: 35%">暂无攻略</span>
            </div>
            <div v-for="strategy in strategyList">
              <div class="row" style="margin-top: 2%;height: 35px">
                <div class="col-md-1"><el-image style="border-radius:45%" :src="strategy.userHead"></el-image></div>
                <div class="col-md-8">
                  <div class="row">{{strategy.userName}}</div>
                  <div class="row" style="margin-top: 2%;line-height: 100%"><router-link :to="{path:'strategy',query:{strategyId:strategy.strategyId}}">{{strategy.strategyName}}</router-link></div>
                  <div class="row" style="margin-top: 2%;">
                    <div  class="col-md-3">
                      <el-image :src="strategy.strategyImg"></el-image>
                    </div>
                  </div>
                  <div class="row" style="margin-top: 2%;font-size: 10px;color: #cecece">{{strategy.createTime}}</div>
                </div>
              </div>
            </div>


          </el-main>
          <div class="row">
            <div class="col-md-2"></div>
            <div class="col-md-4"></div>
            <div class="col-md-4">
              <div class="pageNum1" >
                <!--分页-->

                <ul>
                  <li style="width: 80px"><div class="row" style="margin-top: 2%;font-size: 10px;color: #cecece">共{{all}}页/{{totalCount}}条</div></li>
                  <li style="font-size: 12px" class="threeword"><a href="">首页</a></li>
                  <li style="font-size: 12px" class="threeword" v-if="cur>1"><a v-on:click="cur--,pageClick()">上一页</a></li>
                  <li style="font-size: 12px" class="threeword" v-if="cur===1"><a class="banclick">上一页</a></li>
                  <li style="font-size: 12px" v-for="index in indexs" v-bind:class="{ 'header_active': cur === index}">
                    <a v-on:click="btnClick(index)">{{index}}</a>
                  </li>
                  <li style="font-size: 12px" class="threeword" v-if="cur!==all"><a v-on:click="cur++,pageClick()">下一页</a></li>
                  <li style="font-size: 12px" class="threeword" v-if="cur === all"><a class="banclick">下一页</a></li>
                </ul>
              </div>
            </div>
          </div>
        </el-main >
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
        name: "scenic",
      components:{
        VFooter,
        VHeader
      },
      data(){
          return{
            jgNameDialog: false,
            show: false,
            postionMap:{  //地图坐标
              lng: 120.211486,
              lat: 30.256576
            },
            location: '',
            keyword: '北京市故宫',  //搜索框关键词
            zoom: 12.8,   //放大比例
            address:'',   //位置详细信息
            add:{
              siteName:'',
              site:'',
              jd:'',
              wd:'',
              desce:'',
              type:'',
              jgName:'',
              jgNum:'',
            },
            typeList:[],
            organizationData:[],
            jgName:'',
            jgNum:'',
            bg:'url('+require('../../assets/images/5ff1cbaa8650f.jpg')+')',
            isActive:1,
            all: 10, //总页数
            cur: 1,//当前页码
            totalPage: 0,//当前条数
            totalCount:124,
            scenic:[],
            strategyList:[],
            ImageList:[],
            isCollection:false,
            countCollect:0,
            collect:[],
            likeList:[],
            themeList:[],
            cityScenicList:[],
            similarityList:[],
            user:[],
            times:15,
            scenicMessage:{
              scenicId:'',
              pageIndex:1,

              size:16
            }
          }
      },
      mounted:function () {
        this.scenicMessage.scenicId=this.$route.query.scenicId;
        this.init();

      },
      methods:{
          gotoStrategy(){
            this.$router.push({path:"add_strategy",query:{scenicId:this.scenic.scenicId,scenicName:this.scenic.scenicName}});
          },
          setStart(){
            this.timer=setInterval(()=>{
              this.times--;
              if(this.times===0){
                this.setViewScore();
              }
            },1000)
          },
        setViewScore(){
          var qs = require('querystring')
          let config = {
            header: {'Content-type': 'application/x-www-form-urlencoded'}
          };
          if(this.user===null||this.user===undefined||this.user.userId===null||this.user.userId===undefined){
            console.log("没有登录")
          }
          else {
            var data={userId:this.user.userId,scenicId:this.scenicMessage.scenicId};
            this.$axios.post("/scenic/timeOut_view",qs.stringify(data),config)
              .then(successReqponse => {
                var data = successReqponse.data;
                if(data.message==='OK'){
                  console.log("浏览15秒")
                }
                else {
                  console.log(data.message)
                }
              })
              .catch(failRespose => {
                console.log("页面加载错误！正在重新载入...");
                //this.$router.replace("/leaderAdd");
              })
          }


        },
        getPoint(e){    //点击地图获取一些信息，
          this.show = true;
          this.postionMap.lng = e.point.lng;     //通过  e.point.lng获取经度
          this.postionMap.lat = e.point.lat;     //通过  e.point.lat获取纬度
          this.add.jd = e.point.lng;
          this.add.wd = e.point.lat;
          this.zoom = e.target.getZoom()

          let geocoder= new BMap.Geocoder();  //创建地址解析器的实例
          geocoder.getLocation(e.point,rs=>{
            this.add.site = rs.address;
            //地址描述(string)=
            // console.log(rs.address);    //这里打印可以看到里面的详细地址信息，可以根据需求选择想要的
            // console.log(rs.addressComponents);//结构化的地址描述(object)
            // console.log(rs.addressComponents.province); //省
            // console.log(rs.addressComponents.city); //城市
            // console.log(rs.addressComponents.district); //区县
            // console.log(rs.addressComponents.street); //街道
            // console.log(rs.addressComponents.streetNumber); //门牌号
            // console.log(rs.surroundingPois); //附近的POI点(array)
            // console.log(rs.business); //商圈字段，代表此点所属的商圈(string)
          });
        },
        infoWindowClose () {
          this.show = false
        },
        infoWindowOpen () {
          //这里有个问题纠结了很久，百度的信息窗口默认有个点击其他地方就消失的事件，我没有找到
          //并且信息窗口点击一次显示，一次消失
          //于是我加了一个100毫秒的定时器，保证每次点击地图都可以展示信息窗口
          setInterval(()=>{
            this.show = true
          },100)
        },
        onCollection(){
          var qs = require('querystring')
          let config = {
            header: {'Content-type': 'application/x-www-form-urlencoded'}
          };
          if(this.user===null||this.user.userId===null){
            alert("您还没有登录");
            let url=this.$router.resolve('login');
            window.open(url.href,'_blank');
          }
          else {
            if(this.collect===null||this.collect.isDelete===undefined){
              var data={userId:this.user.userId,scenicStrategy:this.scenicMessage.scenicId,collectType:1}
              this.$axios.post("/collect/save",qs.stringify(data),config)
                .then(successReqponse => {
                  var data = successReqponse.data;
                  if(data.message==='OK'){
                    alert("收藏成功")
                    this.isCollection=true;
                  }
                  else {
                    console.log(data.message)
                  }
                })
                .catch(failRespose => {
                  console.log("页面加载错误！正在重新载入...");
                  //this.$router.replace("/leaderAdd");
                })

            }
            else if(this.collect.isDelete!==undefined && this.collect.isDelete==1) {

              this.$axios.post("/collect/update?collectId="+this.collect.collectId,config)
                .then(successReqponse => {
                  var data = successReqponse.data;
                  if(data.message==='OK'){
                    alert("收藏成功")
                    this.isCollection=true;
                  }
                  else {
                    console.log(data.message)
                  }
                })
                .catch(failRespose => {
                  console.log("页面加载错误！正在重新载入...");
                  //this.$router.replace("/leaderAdd");
                })


            }
            this.initUser();


          }

        },
        offCollection(){
          var qs = require('querystring')
          let config = {
            header: {'Content-type': 'application/x-www-form-urlencoded'}
          };

          this.$axios.post("/collect/del?collectId="+this.collect.collectId,config)
            .then(successReqponse => {
              var data = successReqponse.data;
              this.collect=data.collect;
              if(data.message==='OK'){
                alert("取消收藏成功")
              }
              else {
                console.log(data.message)
              }
            })
            .catch(failRespose => {
              console.log("页面加载错误！正在重新载入...");
              //this.$router.replace("/leaderAdd");
            });
          this.initUser();
          this.isCollection=false;
        },
          initUser(){
            var qs = require('querystring')
            let config = {
              header: {'Content-type': 'application/x-www-form-urlencoded'}
            };
            console.log('111',this.user.userId);
            if(this.user===null||this.user.userId===undefined){
              var data={scenicStrategyId:this.scenicMessage.scenicId,collectType:1}
              this.$axios.post("/collect/get_collect_count",qs.stringify(data),config)
                .then(successReqponse => {
                  var data = successReqponse.data;
                  this.countCollect=data.countCollect;
                  this.isCollection=false;
                })
                .catch(failRespose => {
                  console.log("页面加载错误！正在重新载入...");
                  //this.$router.replace("/leaderAdd");
                });
              console.log('1221',this.user.userId);
            }
            else {
              console.log('1221',this.user.userId);
              var data={userId:this.user.userId,scenicStrategyId:this.scenicMessage.scenicId,collectType:1}
              this.$axios.post("/collect/get_collect",qs.stringify(data),config)
                .then(successReqponse => {
                  var data = successReqponse.data;
                  this.collect=data.collect;
                  this.countCollect=data.countCollect;
                  console.log(data.collect);
                  if(data.collect===null||data.collect.collectId===undefined||data.collect.isDelete===undefined||data.collect.isDelete===1){
                    this.isCollection=false;
                  }
                  else {
                    this.isCollection=true;
                  }
                })
                .catch(failRespose => {
                  console.log("页面加载错误！正在重新载入...");
                  //this.$router.replace("/leaderAdd");
                })
            }

          },
          toInformation(){
            this.isActive=1;
            document.querySelector("#information").scrollIntoView(true)
          },
        toStrategy(){
          this.isActive=2;
          document.querySelector("#strategy").scrollIntoView(true)
        },
        dataListFn: function(index){
          var qs = require('querystring')
          let config = {
            header: {'Content-type': 'application/x-www-form-urlencoded'}
          };
          this.scenicMessage.pageIndex=index;
          this.$axios.post("/scenic/strategy_list",qs.stringify(this.scenicMessage),config)
            .then(successReqponse => {
              var data = successReqponse.data;
              this.strategyList =[];
              this.strategyList = data.strategyList;
              console.log( this.strategyList);
              this.all = data.pageCount;//总页数
              this.totalCount = data.total;
             })
            .catch(failRespose => {
              console.log("页面加载错误！正在重新载入...");
              //this.$router.replace("/leaderAdd");
            })
        },
//分页
        btnClick: function(data){//页码点击事件
          if(data != this.cur){
            this.cur = data
          }
//根据点击页数请求数据
          this.dataListFn(this.cur.toString());
        },
        pageClick: function(){
//根据点击页数请求数据
          this.dataListFn(this.cur.toString());
        },
        init() {
          var qs = require('querystring')
          let config = {
            header: {'Content-type': 'application/x-www-form-urlencoded'}
          };
          this.$axios.post("/scenic/scenic_view",qs.stringify(this.scenicMessage),config)
            .then(successReqponse => {
              var data = successReqponse.data;
              this.scenic = data.scenic;
              this.strategyList = data.strategyList;
              this.ImageList=data.ImageList;
              console.log( this.scenic);
              console.log( this.strategyList);
              this.all = data.pageCount;//总页数
              this.totalCount = data.total;
              this.user=data.users;
              this.keyword=data.scenic.cityName+data.scenic.scenicName;
              var text=data.scenic.scenicDescription;
              this.scenic.scenicDescription=text.replace(/\r\n/g,'<br/><br/>').replace(/\n/g,'<br/><br/>').replace(/\s/g,'<br/><br/>');
              text=data.scenic.scenicOpenTime;
              this.scenic.scenicOpenTime=text.replace(/\r\n/g,'<br/><br/>').replace(/\n/g,'<br/><br/>').replace(/\s/g,'<br/><br/>');
              this.typeList=this.scenic.scenicType.split(',');
              this.initUser();
              this.setStart();
              this.tuijian();
            })
            .catch(failRespose => {
              console.log("页面加载错误！正在重新载入...");
              //this.$router.replace("/leaderAdd");
            })
        },
        tuijian(){
          var qs = require('querystring')
          let config = {
            header: {'Content-type': 'application/x-www-form-urlencoded'}
          };
          var userId='';

          var data={
            searchId:this.scenic.scenicId,
            searchName:this.scenic.scenicName,
            cityId:this.scenic.scenicCity,
            userId:this.user.userId,
            themeId:this.scenic.scenicType
          };
          this.$axios.post("/scenic_tui",qs.stringify(data),config)
            .then(successReqponse => {
              var data = successReqponse.data;
              this.likeList=[];
              this.likeList = data.likeList;
              this.similarityList=[];
              this.similarityList=data.similarityList;
              this.cityScenicList=[];
              this.cityScenicList=data.cityScenicList;
              this.themeList=[];
              this.themeList=data.themeList;
              console.log( this.likeList);
              console.log( this.similarityList);
            })
            .catch(failRespose => {
              console.log("页面加载错误！正在重新载入...");
              //this.$router.replace("/leaderAdd");
            })
        },
      },
      computed: {
//分页
        indexs: function(){
          var left = 1;
          var right = this.all;
          var ar = [];
          if(this.all>= 5){
            if(this.cur > 3 && this.cur < this.all-2){
              left = this.cur - 2
              right = this.cur + 2
            }else{
              if(this.cur<=3){
                left = 1
                right = 5
              }else{
                right = this.all
                left = this.all -4
              }
            }
          }
          while (left <= right){
            ar.push(left)
            left ++
          }
          return ar
        }
      }
    }
</script>

<style scoped>
  .map {
    width: 80%;
    height: 400px;
  }
.scenic_header{
  background: rgba(250,255,251,0.96);
  margin-top: 2%;
  margin-bottom: 1%;
  border-bottom-color: #cecece;
  border-bottom-style: solid;
  border-bottom-width: thin;
  border-top-color: #cecece;
  border-top-style: solid;
  border-top-width: thin;
  width: 80%;
  margin-left: 10%;
}
.scenic_des{
  background: rgba(250,255,251,0.96);
  margin-top: 2%;
  margin-bottom: 1%;
  border-bottom-color: #cecece;
  border-bottom-style: solid;
  border-bottom-width: thin;
  width: 80%;
  margin-left: 10%;
}
.scenic_time1{
  background: rgba(250,255,251,0.96);
  margin-top: 2%;
  margin-bottom: 2%;
  border-bottom-color: #cecece;
  border-bottom-style: solid;
  border-bottom-width: thin;
  width: 80%;
  margin-left: 10%;
  height:200px;
}
  .scenic_button{
    height: 100%;
    width: 100px;
    border: none;
  }
.scenic-active {
  color: #ffd800;
  height: 100%;
  border-bottom-color: #ffd800;
  border-bottom-style: solid;
  border-bottom-width: medium;
}

/*分页样式*/
.pageNum1 {
  width: 100%;
  overflow: hidden;
  margin-left: 10%;
}


.pageNum1 ul li {
  width: 20px;
  height: 20px;
  float: left;
  border: 1px solid #fafffb;
  margin-right: 5px;
  text-align: center;
  line-height: 18px;
}
.pageNum1 ul li.curPage {
  background-color: #ffb611;
}
.pageNum1 ul li a {
  width: 100%;
  height: 100%;
  color: #020102;
  font-size: 12px;
}
.pageNum1 ul .threeword {
  width: 45px;
}
</style>
