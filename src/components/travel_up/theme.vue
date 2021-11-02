<template>
  <div id="app">
    <vHeader :currentHeader="2"></vHeader>
    <div class="page_one">
      <div class="contant" style="width:100% ">

        <div class="xinxi clearfix">

          <div class="left" >
            <div >
              <section id="banner" style="width:100% ">
                <div id="carousel-example-generic" class="carousel slide" data-ride="carousel" data-interval="2000">
                  <!-- Indicators -->
                  <ol class="carousel-indicators">
                    <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
                    <li data-target="#carousel-example-generic" data-slide-to="1"></li>
                  </ol>
                  <!-- Wrapper for slides -->
                  <div class="carousel-inner" role="listbox">
                    <div class="item active">
                      <img src="@/assets/images/theme1.jpg" alt="" style="width:100% ">
                    </div>
                    <div class="item">
                      <img src="@/assets/images/theme2.png" alt="" style="width:100% ">
                    </div>

                  </div>
                  <!-- Controls -->
                  <a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
                    <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                  </a>
                  <a id="next" class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
                    <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                  </a>
                </div>
              </section>
            <div style="width: 80%;margin-left: 10%">

              <section class="hemai_jx">
                <div class="jx_top" style="border-bottom: none">

                </div>

                <div class="heima_gn"  :style="{background:backImg}" style=" background: rgba(0, 0, 0, 0)  scroll 0% 0%;background-repeat:no-repeat;background-size: 25%,auto;background-position-x: left;">
                  <div>
                    <div>
                      <div class="guonei_l" style="width: 18%;height: 210px;"  >
                        <div class="row">
                          <span>&nbsp</span>
                        </div>
                        <div class="row">
                          <span>&nbsp</span>
                        </div>
                        <div class="row">
                          <span>&nbsp</span>
                        </div>
                        <div class="row">
                          <span>&nbsp</span>
                        </div>

                        <div>
                          <div class="col-md-4">

                          </div>
                          <div class="col-md-3">
                            <span style="color: #8d278b;font-size: 25px;font-weight: 500">自然</span>
                          </div>
                        </div>

                      </div>
                      <div class="guone_r" style="width: 80%;height:auto;">
                        <section class="hemai_jx">
                          <div class="jx_top" style="background-color: #f4d0f9">

                            <!-- Nav tabs -->
                            <ul class="jx_tabs" role="tablist">
                              <li role="presentation"  :class="{active:index1===0}" v-for="(theme1,index1) in themesList1">
                                <span></span>
                                <a  style="margin-left: 2%;"  role="tab" data-toggle="tab" @click="getTheme1(theme1.themeId)">{{theme1.themeName}}</a>
                              </li>

                            </ul>
                          </div>
                          <div class="jx_content" style="height: 300px;">
                            <!-- Tab panes -->
                            <div class="tab-content">
                              <div role="tabpanel" class="tab-pane active" id="popularity">
                                <div class="row">
                                  <div class="col-md-3" v-for="line1 in linesList1">
                                    <router-link :to="{path:'lines',query:{lineId:line1.id}}" style="width: 90%;margin-left: 5%;">
                                      <img :src="line1.linePhoto" style="height: 210px;"  alt="">
                                      <div class="has_border" >
                                        <h3>{{line1.lineName}}</h3>
                                        <div class="price">网付价<em>￥</em><strong>{{line1.linePrice}}</strong><em>起</em></div>
                                      </div>
                                    </router-link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>
                      </div>
                    </div><!--一行-->
                    <div>
                      <div class="guonei_l" style="width: 18%;height: 210px;"  >
                        <div class="row">
                          <span>&nbsp</span>
                        </div>
                        <div class="row">
                          <span>&nbsp</span>
                        </div>
                        <div class="row">
                          <span>&nbsp</span>
                        </div>
                        <div class="row">
                          <span>&nbsp</span>
                        </div>

                        <div>
                          <div class="col-md-4">

                          </div>
                          <div class="col-md-3">
                            <span style="color: #5cb85c;font-size: 25px;font-weight: 500">教育</span>
                          </div>
                        </div>

                      </div>
                      <div class="guone_r" style="width: 80%;height:auto;">
                        <section class="hemai_jx">
                          <div class="jx_top" style="margin-top: 2.5%;border-color: #5cb85c;background-color: #c2eec5">

                            <!-- Nav tabs -->
                            <ul class="jx_tabs" role="tablist">
                              <li role="presentation"  :class="{active:index2===0}" v-for="(theme2 ,index2) in themesList2">
                                <span></span>
                                <a href="#popularity" style="margin-left: 2%;"  role="tab" data-toggle="tab" @click="getTheme2(theme2.themeId)">{{theme2.themeName}}</a>
                              </li>


                            </ul>
                          </div>
                          <div class="jx_content" style="height: 295px;">
                            <!-- Tab panes -->
                            <div class="tab-content">
                              <div role="tabpanel" class="tab-pane active" >
                                <div class="row">
                                  <div class="col-md-3" v-for="line2 in linesList2">
                                    <router-link :to="{path:'lines',query:{lineId:line2.id}}" style="width: 90%;margin-left: 5%;">
                                      <img :src="line2.linePhoto" style="height: 210px;"  alt="">
                                      <div class="has_border" >
                                        <h3>{{line2.lineName}}</h3>
                                        <div class="price">网付价<em>￥</em><strong>{{line2.linePrice}}</strong><em>起</em></div>
                                      </div>
                                    </router-link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>
                      </div>
                    </div><!--一行-->
                    <div>
                      <div class="guonei_l" style="width: 18%;height: 210px;"  >
                        <div class="row">
                          <span>&nbsp</span>
                        </div>
                        <div class="row">
                          <span>&nbsp</span>
                        </div>
                        <div class="row">
                          <span>&nbsp</span>
                        </div>
                        <div class="row">
                          <span>&nbsp</span>
                        </div>

                        <div>
                          <div class="col-md-4">

                          </div>
                          <div class="col-md-3">
                            <span style="color: #2e6da4;font-size: 25px;font-weight: 500">户外</span>
                          </div>
                        </div>

                      </div>
                      <div class="guone_r" style="width: 80%;height:auto;">
                        <section class="hemai_jx">
                          <div class="jx_top" style="margin-top: 1.6%;border-color: #00a2d4;background-color: #d1f2fa">

                            <!-- Nav tabs -->
                            <ul class="jx_tabs" role="tablist">
                              <li role="presentation"  :class="{active:index3===0}" v-for="(theme3 ,index3) in themesList3">
                                <span></span>
                                <a href="#popularity" style="margin-left: 2%;"  role="tab" data-toggle="tab" @click="getTheme3(theme3.themeId)">{{theme3.themeName}}</a>
                              </li>
                            </ul>
                          </div>
                          <div class="jx_content" style="height: 298px;">
                            <!-- Tab panes -->
                            <div class="tab-content">
                              <div role="tabpanel" class="tab-pane active" >
                                <div class="row">
                                  <div class="col-md-3" v-for="line3 in linesList3">
                                    <router-link :to="{path:'lines',query:{lineId:line3.id}}" style="width: 90%;margin-left: 5%;">
                                      <img :src="line3.linePhoto" style="height: 200px;"  alt="">
                                      <div class="has_border" >
                                        <h3>{{line3.lineName}}</h3>
                                        <div class="price">网付价<em>￥</em><strong>{{line3.linePrice}}</strong><em>起</em></div>
                                      </div>
                                    </router-link>
                                  </div>

                                </div>
                              </div>
                            </div>
                          </div>
                        </section>
                      </div>
                    </div><!--一行-->
                    <div>
                      <div class="guonei_l" style="width: 18%;height: 210px;"  >
                        <div class="row">
                          <span>&nbsp</span>
                        </div>
                        <div class="row">
                          <span>&nbsp</span>
                        </div>
                        <div class="row">
                          <span>&nbsp</span>
                        </div>
                        <div class="row">
                          <span>&nbsp</span>
                        </div>

                        <div>
                          <div class="col-md-4">

                          </div>
                          <div class="col-md-3">
                            <span style="color: #dd4a68;font-size: 25px;font-weight: 500">节庆</span>
                          </div>
                        </div>

                      </div>
                      <div class="guone_r" style="width: 80%;height:auto;">
                        <section class="hemai_jx">
                          <div class="jx_top" style="margin-top: 1.6%;;border-color: #e4b9b9;background-color: lightpink ">

                            <!-- Nav tabs -->
                            <ul class="jx_tabs" role="tablist">
                              <li role="presentation"  :class="{active:index4===0}" v-for="(theme4 ,index4) in themesList4">
                                <span></span>
                                <a href="#popularity" style="margin-left: 2%;"  role="tab" data-toggle="tab" @click="getTheme4(theme4.themeId)">{{theme4.themeName}}</a>
                              </li>

                            </ul>
                          </div>
                          <div class="jx_content" style="height: 292px;">
                            <!-- Tab panes -->
                            <div class="tab-content">
                              <div role="tabpanel" class="tab-pane active" >
                                <div class="row">
                                  <div class="col-md-3" v-for="line4 in linesList4">
                                    <router-link :to="{path:'lines',query:{lineId:line4.id}}" style="width: 90%;margin-left: 5%;">
                                      <img :src="line4.linePhoto" style="height: 200px;"  alt="">
                                      <div class="has_border" >
                                        <h3>{{line4.lineName}}</h3>
                                        <div class="price">网付价<em>￥</em><strong>{{line4.linePrice}}</strong><em>起</em></div>
                                      </div>
                                    </router-link>
                                  </div>

                                </div>
                              </div>
                            </div>
                          </div>
                        </section>
                      </div>
                    </div><!--一行-->
                    <div>
                      <div class="guonei_l" style="width: 18%;height: 210px;"  >
                        <div class="row">
                          <span>&nbsp</span>
                        </div>
                        <div class="row">
                          <span>&nbsp</span>
                        </div>
                        <div class="row">
                          <span>&nbsp</span>
                        </div>
                        <div class="row">
                          <span>&nbsp</span>
                        </div>

                        <div>
                          <div class="col-md-4">

                          </div>
                          <div class="col-md-3">
                            <span style="color: #EA8010;font-size: 25px;font-weight: 500">人文</span>
                          </div>
                        </div>

                      </div>
                      <div class="guone_r" style="width: 80%;height:auto;">
                        <section class="hemai_jx">
                          <div class="jx_top" style="margin-top: 1.6%;;border-color: #fff0b7;background-color:#fff0b7;">

                            <!-- Nav tabs -->
                            <ul class="jx_tabs" role="tablist">
                              <li role="presentation"  :class="{active:index5===0}" v-for="(theme5 ,index5) in themesList5">
                                <span></span>
                                <a href="#popularity" style="margin-left: 2%;"  role="tab" data-toggle="tab" @click="getTheme5(theme5.themeId)">{{theme5.themeName}}</a>
                              </li>

                            </ul>
                          </div>
                          <div class="jx_content" style="height: 300px;">
                            <!-- Tab panes -->
                            <div class="tab-content">
                              <div role="tabpanel" class="tab-pane active" >
                                <div class="row">
                                  <div class="col-md-3" v-for="line5 in linesList5">
                                    <router-link :to="{path:'lines',query:{lineId:line5.id}}" style="width: 90%;margin-left: 5%;">
                                      <img :src="line5.linrPhoto" style="height: 210px;"  alt="">
                                      <div class="has_border" >
                                        <h3>{{line5.lineName}}</h3>
                                        <div class="price">网付价<em>￥</em><strong>{{line5.linePrice}}</strong><em>起</em></div>
                                      </div>
                                    </router-link>
                                  </div>

                                </div>
                              </div>
                            </div>
                          </div>
                        </section>
                      </div>
                    </div><!--一行-->
                  </div>

                </div>
              </section>

            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    <vFooter></vFooter>
  </div>
</template>

<script>
  import $ from 'jquery';
  import Header from "./common/Header";
  import Footer from "./common/Footer";
  import demo from "./common/demo-filter";
  import vLayout from "./common/view-layout"
  export default {
    name: "theme",
    components:{
      "vHeader":Header,
      "vFooter":Footer,
      "demo-filter":demo,
      "view-layout":vLayout

    },
    data() {
      return {
        backImg:'url('+require('@/assets/images//bg2.png')+')',
        viewList: [],
        viewTime: {
          time: true,
          msg: '数据拼命加载中...'
        },
        page:'',
        param: {},
        filterList: [],
        searchStatus1:'',
        searchStatus2:'',
        themesList1:[],
        themesList2:[],
        themesList3:[],
        themesList4:[],
        themesList5:[],
        linesList1:[],
        linesList2:[],
        linesList3:[],
        linesList4:[],
        linesList5:[],

      }
    },
    created() {
      // 请求数据

    },
    mounted() {

     document.getElementById('next').click();
     this.init();

    },
    methods:{
      init() {
        var qs = require('querystring')
        let config = {
          header: {'Content-type': 'application/x-www-form-urlencoded'}
        };
        this.$axios.get("/theme/nav_theme")
          .then(successReqponse => {
            var data = successReqponse.data;
           this.themesList1=data.themesList1;
            this.themesList2=data.themesList2;
            this.themesList3=data.themesList3;
            this.themesList4=data.themesList4;
            this.themesList5=data.themesList5;
            this.linesList1=data.linesList1;
            this.linesList2=data.linesList2;
            this.linesList3=data.linesList3;
            this.linesList4=data.linesList4;
            this.linesList5=data.linesList5;
          })
          .catch(failRespose => {
            console.log("页面加载错误！正在重新载入...");
            //this.$router.replace("/leaderAdd");
          })
      },
      getTheme1(themeId){
        var qs = require('querystring')
        let config = {
          header: {'Content-type': 'application/x-www-form-urlencoded'}
        };
        this.$axios.post("/theme/line_list?themeId="+themeId,config)
          .then(successReqponse => {
            var data = successReqponse.data;

            this.linesList1=data.linesList;
          })
          .catch(failRespose => {
            console.log("页面加载错误！正在重新载入...");
            //this.$router.replace("/leaderAdd");
          })
      },
      getTheme2(themeId){
        var qs = require('querystring')
        let config = {
          header: {'Content-type': 'application/x-www-form-urlencoded'}
        };
        this.$axios.post("/theme/line_list?themeId="+themeId,config)
          .then(successReqponse => {
            var data = successReqponse.data;
            this.linesList2=[];
            this.linesList2=data.linesList;
          })
          .catch(failRespose => {
            console.log("页面加载错误！正在重新载入...");
            //this.$router.replace("/leaderAdd");
          })
      },
      getTheme3(themeId){
        var qs = require('querystring')
        let config = {
          header: {'Content-type': 'application/x-www-form-urlencoded'}
        };
        this.$axios.post("/theme/line_list?themeId="+themeId,config)
          .then(successReqponse => {
            var data = successReqponse.data;
            this.linesList3=[];
            this.linesList3=data.linesList;
          })
          .catch(failRespose => {
            console.log("页面加载错误！正在重新载入...");
            //this.$router.replace("/leaderAdd");
          })
      },
      getTheme4(themeId){
        var qs = require('querystring')
        let config = {
          header: {'Content-type': 'application/x-www-form-urlencoded'}
        };
        this.$axios.post("/theme/line_list?themeId="+themeId,config)
          .then(successReqponse => {
            var data = successReqponse.data;
            this.linesList4=[];
            this.linesList4=data.linesList;
          })
          .catch(failRespose => {
            console.log("页面加载错误！正在重新载入...");
            //this.$router.replace("/leaderAdd");
          })
      },
      getTheme5(themeId){
        var qs = require('querystring')
        let config = {
          header: {'Content-type': 'application/x-www-form-urlencoded'}
        };
        this.$axios.post("/theme/line_list?themeId="+themeId,config)
          .then(successReqponse => {
            var data = successReqponse.data;
            this.linesList5=[];
            this.linesList5=data.linesList;
          })
          .catch(failRespose => {
            console.log("页面加载错误！正在重新载入...");
            //this.$router.replace("/leaderAdd");
          })
      },
    }
  }
  /*$(function () {
    //取cid，pid
    var never = location.search;
    var cid=5;
    var pid=1;
    var rname="";
    // alert("---1"+never+"1----");
    if (never!=null && never!="") {
      // var cid_pid = never.split("=")[1];
      // cid = cid_pid.split("&")[0];
      // pid = never.split("=")[2];
      cid = getParameter("cid");
      pid = getParameter("pid");
      rname = getParameter("rname");
    }
    // if ( typeof pid == "undefined"){ var pid=1;}
    // if (pid==null ){
    //     pid=1;
    // }

    if (rname){
      //rname不为空
      //url解码
      rname=window.decodeURIComponent(rname);
    }
    // //alert(rname);

    load(cid,pid,rname);


  });
  function load(cid ,pid, rname) {
    //alert("cid:"+cid+"  pid:"+pid+"  rname:"+rname);

    if (pid<1){pid=1;}//页码不能小于1
    // //alert("load");
    var show_text = "";
    var page="";
    var total_tiao;
    var total_pg_int="";
    // {"0":{"rid":1,"rname":"【旅展 半价特惠 重走丝路•漫游宁夏 双飞4天】银川西部影视城 穆民新村 中卫沙坡头【品美酒 回族学唱花儿 感悟民俗】","price":999,"routeIntroduce":"走进【宁夏沙坡头】，感受西北大漠风情、体会“大漠孤烟直，长河落日圆”的塞上风光！","rflag":"1","rdate":"2018-02-09 01:13:16","isThemeTour":"0","count":0,"cid":5,"rimage":"img/product/small/m304b69a4c8328f7d6b8d5dadef020fe07.jpg","sid":1,"sourceId":"23677","category":null,"seller":null,"routeImgList":null}}
    // {"1":{"rid":2,"rname":"【官网专享 立减¥500 张家界天门山+大峡谷+凤凰古城+玻璃栈道+玻璃桥 高铁4天 无自费5钻】印象鲵宴-赶年宴+2晚蓝湾博格酒店","price":1799,"routeIntroduce":"官网专线，顶级品质！全程超豪华住宿，2晚入住超豪华铂金-蓝湾博格国际酒店，独家尊享金马VIP贵宾专用楼层。","rflag":"1","rdate":"2018-02-09 01:13:17","isThemeTour":"0","count":990,"cid":5,"rimage":"img/product/small/m34866f055de8630e94e25c40f277a79ba.jpg","sid":1,"sourceId":"22066","category":null,"seller":null,"routeImgList":null}}





    $.get("route/findRouteCount",{"cid":cid,"pid":pid,"rname":rname},function (len) {
      // //alert(data);
      total_pg_int = len % 10==0 ?parseInt(len/10):(parseInt(len/10)+1);
      total_tiao=len;


      $(".total_tiao").html(total_tiao);
      $(".total_ye").html(total_pg_int);
    });



    $.get("route/findRoute",{"cid":cid,"pid":pid,"rname":rname},function (data) {
      // {{cid=1,cname=ad,sic=as...},{...}}
      // //alert(data);




      $.get("route/findRouteCount",{"cid":cid,"pid":pid,"rname":rname},function (len) {
        // //alert(data);

        total_pg_int = len % 10==0 ?parseInt(len/10):(parseInt(len/10)+1);

        total_tiao=len;


        $(".total_tiao").html(total_tiao);
        $(".total_ye").html(total_pg_int);
      });
      if (pid >total_pg_int){pid=total_pg_int;}







      for (var i = 0;i<10;i++){  //pid --- pid+10
        // //alert((pid-1)*10+i);
        if (((pid-1)*10+i) >=total_tiao){break;}

        var text = "<li> <div class=\"img\"><img src="+data[i].rimage+" style=\"width:299px\"></div>"
          + "<div class=\"text1\">"
          +"<p>"+ data[i].rname+"</p>"
          + "<br/>"
          +"<p>"+ data[i].routeIntroduce+"</p>"
          //     <p>【减100元 含除夕/春节出发】广州增城三英温泉度假酒店/自由行套票</p>"
          // <br/>"
          // <p>1-2月出发，网付立享￥1099/2人起！爆款位置有限，抢完即止！</p>"
          +"</div>"
          + "<div class=\"price\">"
          +   " <p class=\"price_num\">"
          +   " <span>"+"&yen;"+"</span>"
          +  "<span>"+data[i].price+"</span>"
          +  " <span>起</span>"
          + " </p>"
          +  "<p><a href='route_detail.html?rid="+ data[i].rid +"'>查看详情</a></p>"
          // " <li><a href='route_list.html?cid="+data[li].cid+"'>"+data[li].cname+"</a></li>"
          + "</div>"
          +  "</li>";
        show_text = show_text+text ;


      }
      $("#show").html(show_text);


      // page+=
      page += "<li><a href='javascript:load("+cid+",1,\""+rname+"\")'>首页</a></li>"
        +"<li class=\"threeword\"><a href='javascript:load("+cid+","+(pid-1)+",\""+rname+"\")'>上一页</a></li>";


      //遍历页码条
      var begin=1;
      var end;

      begin=pid-5;
      end=pid+4;
      // console.log("end "+end);
      if (begin<1){
        begin=1;
        end=total_pg_int<10?total_pg_int:10;

      }
      // console.log("total_pg_int "+total_pg_int);
      if (end>total_pg_int){
        end=total_pg_int;
        // console.log("end "+end);
        begin=end-9<1?1:end-9;
      }
      // console.log("begin:"+begin+"    end:"+end  +"   pid:"+pid  +"   cid:"+cid);
      for (var i = begin;i<=end;i++){
        if (pid == i){
          //当前页码
          page += "<li class='curPage'><a href=\'javascript:load("+cid+","+i+",\""+rname+"\")\'style=\'width:100% ;display:inline-block \'>"+i+"</a></li>";
        }else {
          page += "<li><a href=\'javascript:load(" + cid + "," + i + ",\""+rname+"\")\'style=\'width:100% ;display:inline-block \'>" + i + "</a></li>";
        }
      }

      // for (var i = 1;i<=total_pg_int;i++){
      //
      //     if (pid == i){
      //         //当前页码
      //         page += "<li class='curPage'><a href=\'javascript:load("+cid+","+i+" )\'style=\'width:100% ;display:inline-block \'>"+i+"</a></li>";
      //     }else {
      //         page += "<li><a href=\'javascript:load(" + cid + "," + i + " )\'style=\'width:100% ;display:inline-block \'>" + i + "</a></li>";
      //     }
      // }
      page +="<li class=\"threeword\"><a href='javascript:load("+cid+","+(pid+1)+",\""+rname+"\")'>下一页</a></li>"
        +"<li class=\"threeword\"><a href='javascript:load("+cid+","+total_pg_int+",\""+rname+"\")'>末页</a></li>";


      $("#show_page").html(page);

      //回滚到(0,0)点
      window.scrollTo(0,0);
    });
  }*/
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

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
