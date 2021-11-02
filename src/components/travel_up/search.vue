<template>
  <div id="app">
    <vHeader ref="navHeader"></vHeader>
    <div :style="{background:bg}">
      <div class="page_one" style="background-color: white;width: 90%;margin-left: 5%">
        <div class="contant" style=" width: 1180px;
  margin: 0 auto;
  padding-bottom: 50px;">
          <p>&nbsp;</p>
          <div class="crumbs" >
            <p>黑马旅行><span>搜索结果</span></p>
          </div>
          <div class="xinxi clearfix">

            <div class="left" style="float: left;width: 70%;">
              <div v-show="searchStatus1">
                <div class="header" style="margin-top: 2%">
                  <span>景点信息</span>

                </div>
                <section id="view" clock>
                  <demo-filter :get-list="filterList" @get-sel-data="getFilterSelData"
                               @set-time="setTime"></demo-filter>
                </section>
              </div>

              <div class="header" v-show="searchStatus2">
                <span>路线信息</span>
                <span class="jg">价格</span>
              </div>
              <ul id="show">
                <div v-show="searchStatus1">
                  <div class="jx_content">
                    <!-- Tab panes -->
                    <div class="tab-content">
                      <div role="tabpanel" class="tab-pane active" id="popularity">
                        <div class="row" style="margin-top: 2%">
                          <div class="col-md-3">
                            <a href="javascript:;">
                              <img src="@/assets/images/jiangxuan_4.jpg" alt="">
                              <div class="has_border">
                                <h3>上海直飞三亚5天4晚自由行(春节预售+亲子/蜜月/休闲游首选+豪华酒店任选+接送机)</h3>
                                <div class="price">网付价<em>￥</em><strong>889</strong><em>起</em></div>
                              </div>
                            </a>
                          </div>
                          <div class="col-md-3">
                            <a href="javascript:;">
                              <img src="@/assets/images/jiangxuan_4.jpg" alt="">
                              <div class="has_border">
                                <h3>上海直飞三亚5天4晚自由行(春节预售+亲子/蜜月/休闲游首选+豪华酒店任选+接送机)</h3>
                                <div class="price">网付价<em>￥</em><strong>889</strong><em>起</em></div>
                              </div>
                            </a>
                          </div>
                          <div class="col-md-3">
                            <a href="javascript:;">
                              <img src="@/assets/images/jiangxuan_4.jpg" alt="">
                              <div class="has_border">
                                <h3>上海直飞三亚5天4晚自由行(春节预售+亲子/蜜月/休闲游首选+豪华酒店任选+接送机)</h3>
                                <div class="price">网付价<em>￥</em><strong>889</strong><em>起</em></div>
                              </div>
                            </a>
                          </div>
                          <div class="col-md-3">
                            <a href="javascript:;">
                              <img src="@/assets/images/jiangxuan_4.jpg" alt="">
                              <div class="has_border">
                                <h3>上海直飞三亚5天4晚自由行(春节预售+亲子/蜜月/休闲游首选+豪华酒店任选+接送机)</h3>
                                <div class="price">网付价<em>￥</em><strong>889</strong><em>起</em></div>
                              </div>
                            </a>
                          </div>
                        </div>
                        <div class="row" style="margin-top: 2%">
                          <div class="col-md-3">
                            <a href="javascript:;">
                              <img src="@/assets/images/jiangxuan_4.jpg" alt="">
                              <div class="has_border">
                                <h3>上海直飞三亚5天4晚自由行(春节预售+亲子/蜜月/休闲游首选+豪华酒店任选+接送机)</h3>
                                <div class="price">网付价<em>￥</em><strong>889</strong><em>起</em></div>
                              </div>
                            </a>
                          </div>
                          <div class="col-md-3">
                            <a href="javascript:;">
                              <img src="@/assets/images/jiangxuan_4.jpg" alt="">
                              <div class="has_border">
                                <h3>上海直飞三亚5天4晚自由行(春节预售+亲子/蜜月/休闲游首选+豪华酒店任选+接送机)</h3>
                                <div class="price">网付价<em>￥</em><strong>889</strong><em>起</em></div>
                              </div>
                            </a>
                          </div>
                          <div class="col-md-3">
                            <a href="javascript:;">
                              <img src="@/assets/images/jiangxuan_4.jpg" alt="">
                              <div class="has_border">
                                <h3>上海直飞三亚5天4晚自由行(春节预售+亲子/蜜月/休闲游首选+豪华酒店任选+接送机)</h3>
                                <div class="price">网付价<em>￥</em><strong>889</strong><em>起</em></div>
                              </div>
                            </a>
                          </div>
                          <div class="col-md-3">
                            <a href="javascript:;">
                              <img src="@/assets/images/jiangxuan_4.jpg" alt="">
                              <div class="has_border">
                                <h3>上海直飞三亚5天4晚自由行(春节预售+亲子/蜜月/休闲游首选+豪华酒店任选+接送机)</h3>
                                <div class="price">网付价<em>￥</em><strong>889</strong><em>起</em></div>
                              </div>
                            </a>
                          </div>
                        </div>
                        <div class="row" style="margin-top: 2%">
                          <div class="col-md-3">
                            <a href="javascript:;">
                              <img src="@/assets/images/jiangxuan_4.jpg" alt="">
                              <div class="has_border">
                                <h3>上海直飞三亚5天4晚自由行(春节预售+亲子/蜜月/休闲游首选+豪华酒店任选+接送机)</h3>
                                <div class="price">网付价<em>￥</em><strong>889</strong><em>起</em></div>
                              </div>
                            </a>
                          </div>
                          <div class="col-md-3">
                            <a href="javascript:;">
                              <img src="@/assets/images/jiangxuan_4.jpg" alt="">
                              <div class="has_border">
                                <h3>上海直飞三亚5天4晚自由行(春节预售+亲子/蜜月/休闲游首选+豪华酒店任选+接送机)</h3>
                                <div class="price">网付价<em>￥</em><strong>889</strong><em>起</em></div>
                              </div>
                            </a>
                          </div>
                          <div class="col-md-3">
                            <a href="javascript:;">
                              <img src="@/assets/images/jiangxuan_4.jpg" alt="">
                              <div class="has_border">
                                <h3>上海直飞三亚5天4晚自由行(春节预售+亲子/蜜月/休闲游首选+豪华酒店任选+接送机)</h3>
                                <div class="price">网付价<em>￥</em><strong>889</strong><em>起</em></div>
                              </div>
                            </a>
                          </div>
                          <div class="col-md-3">
                            <a href="javascript:;">
                              <img src="@/assets/images/jiangxuan_4.jpg" alt="">
                              <div class="has_border">
                                <h3>上海直飞三亚5天4晚自由行(春节预售+亲子/蜜月/休闲游首选+豪华酒店任选+接送机)</h3>
                                <div class="price">网付价<em>￥</em><strong>889</strong><em>起</em></div>
                              </div>
                            </a>
                          </div>
                        </div>
                        <div class="row" style="margin-top: 2%">
                          <div class="col-md-3">
                            <a href="javascript:;">
                              <img src="@/assets/images/jiangxuan_4.jpg" alt="">
                              <div class="has_border">
                                <h3>上海直飞三亚5天4晚自由行(春节预售+亲子/蜜月/休闲游首选+豪华酒店任选+接送机)</h3>
                                <div class="price">网付价<em>￥</em><strong>889</strong><em>起</em></div>
                              </div>
                            </a>
                          </div>
                          <div class="col-md-3">
                            <a href="javascript:;">
                              <img src="@/assets/images/jiangxuan_4.jpg" alt="">
                              <div class="has_border">
                                <h3>上海直飞三亚5天4晚自由行(春节预售+亲子/蜜月/休闲游首选+豪华酒店任选+接送机)</h3>
                                <div class="price">网付价<em>￥</em><strong>889</strong><em>起</em></div>
                              </div>
                            </a>
                          </div>
                          <div class="col-md-3">
                            <a href="javascript:;">
                              <img src="@/assets/images/jiangxuan_4.jpg" alt="">
                              <div class="has_border">
                                <h3>上海直飞三亚5天4晚自由行(春节预售+亲子/蜜月/休闲游首选+豪华酒店任选+接送机)</h3>
                                <div class="price">网付价<em>￥</em><strong>889</strong><em>起</em></div>
                              </div>
                            </a>
                          </div>
                          <div class="col-md-3">
                            <a href="javascript:;">
                              <img src="@/assets/images/jiangxuan_4.jpg" alt="">
                              <div class="has_border">
                                <h3>上海直飞三亚5天4晚自由行(春节预售+亲子/蜜月/休闲游首选+豪华酒店任选+接送机)</h3>
                                <div class="price">网付价<em>￥</em><strong>889</strong><em>起</em></div>
                              </div>
                            </a>
                          </div>
                        </div>

                      </div>

                    </div>
                  </div>
                </div>
                <div v-show="searchStatus2">
                  <!--                    <li>-->
                  <!--                        <div class="img"><img src="/static/images/04-search_03.jpg" alt=""></div>-->
                  <!--                        <div class="text1">-->
                  <!--                            <p>【减100元 含除夕/春节出发】广州增城三英温泉度假酒店/自由行套票</p>-->
                  <!--                            <br/>-->
                  <!--                            <p>1-2月出发，网付立享￥1099/2人起！爆款位置有限，抢完即止！</p>-->
                  <!--                        </div>-->
                  <!--                        <div class="price">-->
                  <!--                            <p class="price_num">-->
                  <!--                                <span>&yen;</span>-->
                  <!--                                <span>299</span>-->
                  <!--                                <span>起</span>-->
                  <!--                            </p>-->
                  <!--                            <p><a href="route_detail.html">查看详情</a></p>-->
                  <!--                        </div>-->
                  <!--                    </li>-->
                </div>


              </ul>

              <div class="pageNum">

                  <ul id="show_page" style="margin-top: 5%;margin-left: 15%">
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

            <div class="right" style="float: left;
margin-left: 4%;
width: 25%;">
              <div class="top">
                <div class="hot">HOT</div>
                <span>热门推荐</span>
              </div>
              <ul>
                <li>
                  <div class="left"><img src="/static/images/04-search_09.jpg" alt=""></div>
                  <div class="right">
                    <p>清远新银盏温泉度假村酒店/自由行套...</p>
                    <p>网付价<span>&yen;<span>899</span>起</span>
                    </p>
                  </div>
                </li>
                <li>
                  <div class="left"><img src="/static/images/04-search_09.jpg" alt=""></div>
                  <div class="right">
                    <p>清远新银盏温泉度假村酒店/自由行套...</p>
                    <p>网付价<span>&yen;<span>899</span>起</span>
                    </p>
                  </div>
                </li>
                <li>
                  <div class="left"><img src="/static/images/04-search_09.jpg" alt=""></div>
                  <div class="right">
                    <p>清远新银盏温泉度假村酒店/自由行套...</p>
                    <p>网付价<span>&yen;<span>899</span>起</span>
                    </p>
                  </div>
                </li>
                <li>
                  <div class="left"><img src="/static/images/04-search_09.jpg" alt=""></div>
                  <div class="right">
                    <p>清远新银盏温泉度假村酒店/自由行套...</p>
                    <p>网付价<span>&yen;<span>899</span>起</span>
                    </p>
                  </div>
                </li>
                <li>
                  <div class="left"><img src="/static/images/04-search_09.jpg" alt=""></div>
                  <div class="right">
                    <p>清远新银盏温泉度假村酒店/自由行套...</p>
                    <p>网付价<span>&yen;<span>899</span>起</span>
                    </p>
                  </div>
                </li>
                <li>
                  <div class="left"><img src="/static/images/04-search_09.jpg" alt=""></div>
                  <div class="right">
                    <p>清远新银盏温泉度假村酒店/自由行套...</p>
                    <p>网付价<span>&yen;<span>899</span>起</span>
                    </p>
                  </div>
                </li>
                <li>
                  <div class="left"><img src="/static/images/04-search_09.jpg" alt=""></div>
                  <div class="right">
                    <p>清远新银盏温泉度假村酒店/自由行套...</p>
                    <p>网付价<span>&yen;<span>899</span>起</span>
                    </p>
                  </div>
                </li>
                <li>
                  <div class="left"><img src="/static/images/04-search_09.jpg" alt=""></div>
                  <div class="right">
                    <p>清远新银盏温泉度假村酒店/自由行套...</p>
                    <p>网付价<span>&yen;<span>899</span>起</span>
                    </p>
                  </div>
                </li>
                <li>
                  <div class="left"><img src="/static/images/04-search_09.jpg" alt=""></div>
                  <div class="right">
                    <p>清远新银盏温泉度假村酒店/自由行套...</p>
                    <p>网付价<span>&yen;<span>899</span>起</span>
                    </p>
                  </div>
                </li>

              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="footer">
      <vFooter></vFooter>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery';
  import Header from "./common/Header";
  import Footer from "./common/Footer";
  import demo from "./common/demo-filter";
  import vLayout from "./common/view-layout"

  export default {
    name: "search",
    components: {
      "vHeader": Header,
      "vFooter": Footer,
      "demo-filter": demo,
      "view-layout": vLayout

    },
    data() {
      return {
        bg: 'url(' + require('../../assets/images/5ff1cbaa8650f.jpg') + ')',
        isActive:1,
        all: 10, //总页数
        cur: 1,//当前页码
        totalPage: 0,//当前条数
        totalCount:124,
        viewList: [],
        viewTime: {
          time: true,
          msg: '数据拼命加载中...'
        },
        page: '',
        param: {},
        filterList: [],
        searchStatus1: '',
        searchStatus2: '',
        filterSelData: [] // 过滤选中的数据
      }
    },
    created() {
      // 请求数据
      this.filterList = [{
        "title": "分类：",
        "childer": [{
          "value": "全部",
          "active": true
        },
          {
            "value": "漂浮素材",
            "active": false
          },
          {
            "value": "效果元素",
            "active": false
          },
          {
            "value": "卡通手绘",
            "active": false
          },
          {
            "value": "装饰图案",
            "active": false
          },
          {
            "value": "图标元素",
            "active": false
          },
          {
            "value": "促销标签",
            "active": false
          },
          {
            "value": "边框纹理",
            "active": false
          },
          {
            "value": "不规则图形",
            "active": false
          },
          {
            "value": "表情包213123",
            "active": false
          },
          {
            "value": "表情包2323",
            "active": false
          },
          {
            "value": "表情包1111",
            "active": false
          },
          {
            "value": "表情包3333",
            "active": false
          },
          {
            "value": "表情包444",
            "active": false
          }
        ]
      }
      ];
      this.filterList.push(
        {
          "title": "排序：",
          "childer": [{
            "value": "推荐",
            "active": true
          },
            {
              "value": "昨日热门",
              "active": false
            },
            {
              "value": "最新上传",
              "active": false
            },
            {
              "value": "热门下载",
              "active": false
            },
            {
              "value": "热门收藏",
              "active": false
            }
          ]
        })

      /* this.setRequest('http://127.0.0.1:8081/static/json/demo2.json', this.param, 'get').then(res => {
         this.viewList = [...res.list]
         return this.setRequest('http://127.0.0.1:8081/static/json/demo3.json', this.param, 'get')
       }).then(res => {
         this.filterList = [...res.list]
       })*/
    },
    mounted() {
      setTimeout(() => {
        //修改数据
        this.changValue = 1;
        //DOM还没更新
        this.$nextTick(() => {
          //DOM现在更新了
          this.searchStatus1 = this.$refs.navHeader.searchStatus1
          this.searchStatus2 = this.$refs.navHeader.searchStatus2
        });
      }, 0);

    },
    methods: {
      dataListFn: function(index){
        /* this.$axios.get("http://127.0.0.1:8090/demand/selectListByPage",
           {
             params:{
               page: index,
               limit:'10',
               state: 0
             }
           }).then((res) => {
           if(res.data.message == "success"){
             this.dataList=[];
             for(let i=0;i<res.data.data.length;i++){
               this.dataList.push(res.data.data[i])
             }
             this.all = res.data.totalPage;//总页数
             this.cur = res.data.pageNum1;
             this.totalPage = res.data.totalPage;
           }

         });*/
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
      setRequest(url, data = {}, method = 'get') {
        return new Promise((resolve, reject) => {
          this.$axios({
            url,
            method,
            data
          }).then(res => {
            resolve(res.data)
          }).catch(err => {
            reject(err)
          })
        })
      },

      // 获取筛选组件选中的值
      getFilterSelData(data) {
        this.filterSelData = data
      },

      // 模拟延时显示数据视图
      setTime(startTime, endTime, bool) {
        setTimeout(() => {
          this.viewTime.time = bool
          setTimeout(() => {
            this.viewTime.time = false
          }, endTime)
        }, startTime)
      }
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

  #view {
    padding-left: 1px !important;
  }


</style>
