<template>
  <div >
    <vHeader :currentHeader="1" :searchMessage="searchData.searchTitle" :sortType="sortType" ref="navHeader"></vHeader>
    <div :style="{background:bg}">
      <div class="page_one" style="background-color: white;width: 90%;margin-left: 5%">
        <div class="contant" style=" width: 95%;
  margin: 0 auto;
  padding-bottom: 50px;">
          <p>&nbsp;</p>
          <div class="crumbs" >
            <p>猪猪旅行><span>搜索结果></span><span> {{searchData.searchTitle}}</span></p>
          </div>
          <div class="xinxi clearfix">

            <div class="left" style="float: left;width: 80%;">
              <div >

                <section id="view" clock>
                  <div class="demo" style="margin-top: 4%">
                    <div class="demo-warp" style="margin-top: 4%">
                      <div class="demo-flex" style="    width: 90%;
    margin-left: 5%;" v-for="(ar,a_i) in areaList" :key="ar.id">
                        <span class="demo-title">{{ar.title}}</span>
                        <div class="demo-content">
                          <div class="demo-tab" >
                            <span v-for="(area, a_index) in ar.childer" :key="area.value" :class="{'demo-active': area.active}" @click="tabAreaClick(area,a_index,a_i)">{{area.name}}</span>
                          </div>
                        </div>
                      </div>
                      <div class="demo-flex" style="    width: 90%;
    margin-left: 5%;" v-for="(v,k) in filterList" :key="k">
                        <span class="demo-title">{{v.title}}</span>
                        <div class="demo-content">
                          <div class="demo-tab" :class="isShow ? 'demo-hide' : ''">
                            <span v-for="(val, key) in v.childer" :key="key" :class="{'demo-active': val.active}" @click="tabCityClick(val,key,k)">{{val.name}}</span>
                          </div>
                        </div>
                        <div class="demo-more" @click="isShow = !isShow" v-if="v.childer.length>13">更多</div>
                      </div>
                      <div class="demo-flex" style="    width: 90%;
    margin-left: 5%;" v-for="(ty,t_i) in typeList" :key="ty.id">
                        <span class="demo-title">{{ty.title}}</span>
                        <div class="demo-content">
                          <div class="demo-tab" >
                            <span v-for="(type, t_index) in ty.childer" :key="type.value" :class="{'demo-active': type.active}" @click="tabTypeClick(type,t_index,t_i)">{{type.name}}</span>
                          </div>
                        </div>
                      </div>
                      <div class="demo-flex" style="    width: 90%;
    margin-left: 5%;" v-for="(peo,p_i) in peopleList" :key="peo.id">
                        <span class="demo-title">{{peo.title}}</span>
                        <div class="demo-content">
                          <div class="demo-tab" >
                            <span v-for="(people, p_index) in peo.childer" :key="people.value" :class="{'demo-active': people.active}" @click="tabPeopleClick(people,p_index,p_i)">{{people.name}}</span>
                          </div>
                        </div>
                      </div>
                      <div class="demo-flex" style="    width: 90%;
    margin-left: 5%;" v-for="(sea,sa_i) in seasonList" :key="sea.id">
                        <span class="demo-title">{{sea.title}}</span>
                        <div class="demo-content">
                          <div class="demo-tab" >
                            <span v-for="(season, sa_index) in sea.childer" :key="season.value" :class="{'demo-active': season.active}" @click="tabSeasonClick(season,sa_index,sa_i)">{{season.name}}</span>
                          </div>
                        </div>
                      </div>


                      <div class="demo-flex" style="    width: 90%;
    margin-left: 5%;" v-for="(va,i) in sortList" :key="va.id">
                        <span class="demo-title">{{va.title}}</span>
                        <div class="demo-content">
                          <div class="demo-tab" >
                            <span v-for="(value, index) in va.childer" :key="value.value" :class="{'demo-active': value.active}" @click="tabClick(value,index,i)">{{value.name}}</span>
                          </div>
                        </div>
                      </div>
                      <div class="demo-flex" style="    width: 90%;margin-left: 5%;">
                        <span class="demo-title">价格</span>
                        <div class="demo-content" style="display: block">
                          <el-input v-model="searchData.priceDown" style="width: 20%" placeholder="最低价格"></el-input>
                          至<el-input v-model="searchData.priceUp" style="width: 20%" placeholder="最高价格"></el-input>
                        <el-button @click="searchHotel" style="width: 50px;height: 40px">确定</el-button>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              <div class="header" v-show="searchStatus2">
                <span>路线信息</span>
                <span class="jg">价格</span>
              </div>
              <ul id="show">
                <div >
                  <div class="jx_content">
                    <!-- Tab panes -->
                    <div class="tab-content" >
                      <div role="tabpanel" class="tab-pane active" id="popularity" >
                        <div class="row" style="margin-top: 2%" v-for="(va,index) in hotelList">
                          <div class="col-md-3"  v-for="hotel in va">
                            <router-link :to="{path:'scenic',query:{scenicId:hotel.scenicId}}" style="    width: 90%;
    margin-left: 5%;">
                              <img :src="hotel.scenicImg" style="height: 148px" alt="">
                              <div class="has_border">
                                <h3>{{hotel.scenicName}}</h3>
                                <div class="price" style="text-align: right;"><strong>点击查看</strong></div>
                              </div>
                            </router-link>
                          </div>

                        </div>


                      </div>

                    </div>
                  </div>
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
width:15%;">
              <div class="top">
                <div class="hot">HOT</div>
                <span>热门推荐</span>
              </div>
              <ul style="margin-top: 8%">
                <li v-for="(line,hid) in hotList" :key="hid">
                  <div class="left"><img style="width: 100%" :src="line.linePhoto" alt=""></div>
                  <div class="right">
                    <router-link :to="{path:'lines',query:{lineId:line.id}}" ><p>{{line.lineName}}</p></router-link>
                    <p> <span class="price">网付价<em>￥</em><strong>{{line.linePrice}}</strong><em>起</em></span>
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
  export default {
    name: "nav_scenic",
    components:{
      "vHeader":Header,
      "vFooter":Footer

    },
    data() {
      return {
        bg:'url('+require('../../assets/images/5ff1cbaa8650f.jpg')+')',
        isShow: false,
        page:'',
        param: {},
        filterList: [],
        sortList:[],
        typeList:[],
        peopleList:[],
        seasonList:[],
        areaList:[],
        child:[],
        all: 10, //总页数
        cur: 1,//当前页码
        totalPage: 20,//当前条数
        totalCount:124,
        searchStatus1:'',
        searchStatus2:'',
        searchData:{
          areaId:0,
          typeId:'',
          people:'',
          season:'',
          priceUp:'',
          priceDown:'',
          cityId:0,
          sortType:0,
          searchTitle:'',
          pageIndex:1,
          size:16
        },
        hotList:[],
        sortType:'',
        hotelList:[],
        filterSelData: [] // 过滤选中的数据
      }
    },
    beforeMount: function() {
      this.searchData.pageIndex=1;
    },
    mounted:function () {
      this.searchData.searchTitle=this.$route.query.searchTitle;
      this.global.searchMessage=this.$route.query.searchTitle;
      this.sortType=this.$route.query.type;
      console.log(this.searchData);
      this.init();
      this.initHotel();
      this.initHot();
      //this.initHot();
      setTimeout(() => {

      }, 0);

    } ,
    computed:{
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
    },
    methods:{
      tabClick(data, key, k) {
        // 添加 active ==> true 显示 `active样式`
        this.sortList[k].childer.map(item => {
          item.active = false
        })
        this.sortList[k].childer[key].active = true;

        // 选中的数据
        let newArray = []
        this.sortList.map(data => {
          data.childer.map(item => {
            if (item.active === true) {
              if(item.value==='0'){
                this.searchData.searchTitle='';
                this.global.searchMessage='';
              }
              this.searchData.sortType=item.value;
              this.searchHotel();
            }
          })
        })
      },
      tabAreaClick(data, key, k) {
        // 添加 active ==> true 显示 `active样式`
        this.areaList[k].childer.map(item => {
          item.active = false
        })
        this.areaList[k].childer[key].active = true;

        // 选中的数据
        let newArray = []
        this.areaList.map(data => {
          data.childer.map(item => {
            if (item.active === true) {
              if(item.value==='0'){
                this.searchData.searchTitle='';
                this.global.searchMessage='';
              }
              this.searchData.areaId=item.value;
              this.getCityArea(item.value);
              this.searchHotel();
            }
          })
        })
      },
      tabTypeClick(data, key, k) {
        // 添加 active ==> true 显示 `active样式`
        this.typeList[k].childer.map(item => {
          item.active = false
        })
        this.typeList[k].childer[key].active = true;

        // 选中的数据
        let newArray = []
        this.typeList.map(data => {
          data.childer.map(item => {
            if (item.active === true) {
              if(item.id==='0'){
                this.searchData.searchTitle='';
                this.global.searchMessage='';
              }
              this.searchData.typeId=item.value;
              this.searchHotel();
            }
          })
        })
      },
      tabPeopleClick(data, key, k) {
        // 添加 active ==> true 显示 `active样式`
        this.peopleList[k].childer.map(item => {
          item.active = false
        })
        this.peopleList[k].childer[key].active = true;

        // 选中的数据
        let newArray = []
        this.peopleList.map(data => {
          data.childer.map(item => {
            if (item.active === true) {
              if(item.id==='1'){
                this.searchData.searchTitle='';
                this.global.searchMessage='';
              }
              this.searchData.people=item.value;
              this.searchHotel();
            }
          })
        })
      },
      tabSeasonClick(data, key, k) {
        // 添加 active ==> true 显示 `active样式`
        this.seasonList[k].childer.map(item => {
          item.active = false
        })
        this.seasonList[k].childer[key].active = true;

        // 选中的数据
        let newArray = []
        this.seasonList.map(data => {
          data.childer.map(item => {
            if (item.active === true) {
              if(item.id==='1'){
                this.searchData.searchTitle='';
                this.global.searchMessage='';
              }
              this.searchData.season=item.value;
              this.searchHotel();
            }
          })
        })
      },

      tabCityClick(data, key, k) {
        // 添加 active ==> true 显示 `active样式`
        this.filterList[k].childer.map(item => {
          item.active = false
        })
        this.filterList[k].childer[key].active = true

        // 选中的数据
        let newArray = []
        this.filterList.map(data => {
          data.childer.map(item => {
            if (item.active === true) {
              this.searchData.cityId=item.value;
              this.searchHotel();
            }
          })
        })
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
      dataListFn: function(index){
        alert(index)
        var qs=require('querystring')
        let config={
          header:{'Content-type':'application/x-www-form-urlencoded'}
        };
        this.searchData.pageIndex=index;
        this.$axios.post("scenic/scenic_list_more",qs.stringify(this.searchData),config)
          .then(result=>{
            var data = result.data;
            this.hotelList=[];
            this.hotelList=data.scenicList;
            this.all =data.pageCount;//总页数
            this.totalCount = data.total;
            this.searchData.cityId=data.cityId;
            this.searchData.sortType=data.sortType;
            var arr=[];
            var arr1=[];
            for(var i=0;i<this.hotelList.length;i++){

              if(i%4===0&&i!==0){
                arr1.push(arr);
                arr=[];
              }
              var hotel=this.hotelList[i];
              arr.push(hotel);
            }
            arr1.push(arr);
            this.hotelList=[];
            this.hotelList=arr1;
            console.log(this.hotelList)
          })
          .catch(failResponse=>{
            alert('数据加在错误...正在重新载入')
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
      initHotel() {

        var qs=require('querystring')
        let config={
          header:{'Content-type':'application/x-www-form-urlencoded'}
        };
        console.log(this.searchData);
        this.$axios.post("scenic/scenic_list_more",qs.stringify(this.searchData),config)
          .then(result=>{
            var data = result.data;
            this.hotelList=[];
            this.hotelList=data.scenicList;
            this.all =data.pageCount;//总页数
            this.totalCount = data.total;
            this.searchData.cityId=data.cityId;
            this.searchData.sortType=data.sortType;
            var arr=[];
            var arr1=[];
            for(var i=0;i<this.hotelList.length;i++){

              if(i%4===0&&i!==0){
                arr1.push(arr);
                arr=[];
              }

              var hotel=this.hotelList[i];
              arr.push(hotel);
            }
            arr1.push(arr);
            this.hotelList=[];
            this.hotelList=arr1;
            console.log(this.hotelList)
          })
          .catch(failResponse=>{
            alert('数据加在错误...正在重新载入')
          })

      },
      initHot() {

        var qs=require('querystring')
        let config={
          header:{'Content-type':'application/x-www-form-urlencoded'}
        };
        console.log(this.searchData);
        this.$axios.post("line_group/line_list_hot")
          .then(result=>{
            var data = result.data;
            this.hotList=[];
            this.hotList=data.lineGroupList;

            console.log(this.hotList)
          })
          .catch(failResponse=>{
            alert('数据加在错误...正在重新载入')
          })

      },
      searchHotel(){
        var qs=require('querystring')
        let config={
          header:{'Content-type':'application/x-www-form-urlencoded'}
        };
        this.searchData.pageIndex=1;
        this.$axios.post("scenic/scenic_list_more",qs.stringify(this.searchData),config)
          .then(result=>{
            var data = result.data;
            this.hotelList=[];
            this.hotelList=data.scenicList;
            this.all =data.pageCount;//总页数
            this.totalCount = data.total;
            this.searchData.cityId=data.cityId;
            this.searchData.sortType=data.sortType;
            var arr=[];
            var arr1=[];
            for(var i=0;i<this.hotelList.length;i++){

              if(i%4===0&&i!==0){
                arr1.push(arr);
                arr=[];
              }
              var hotel=this.hotelList[i];
              arr.push(hotel);
            }
            arr1.push(arr);
            this.hotelList=[];
            this.hotelList=arr1;
            console.log(this.hotelList)
          })
          .catch(failResponse=>{
            alert('数据加在错误...正在重新载入')
          })
      },
      getCityArea(areaId){
        var qs = require('querystring')
        let config = {
          header: {'Content-type': 'application/x-www-form-urlencoded'}
        };
        this.$axios.get("/scenic/nav_scenic_province?areaId="+areaId)
          .then(successReqponse => {
            this.child=successReqponse.data.sortChild;
            this.filterList=[];
            this.filterList=[{
              "title": "城市：",
              "childer":this.child
            }
            ];

          })
          .catch(failRespose => {
            console.log("页面加载错误！正在重新载入...");
            //this.$router.replace("/leaderAdd");
          })
      },
      init(){
        var qs = require('querystring')
        let config = {
          header: {'Content-type': 'application/x-www-form-urlencoded'}
        };
        this.$axios.get("/scenic/nav_scenic_init_more")
          .then(successReqponse => {
            this.child=successReqponse.data.sortChild;
            this.filterList=[{
              "title": "城市：",
              "childer":this.child
            }
            ];
            this.child=successReqponse.data.sortChild2;
            this.typeList=[{
              "title": "类别：",
              "childer":this.child
            }
            ];
            this.sortList=[
              {
                "title": "排序：",
                "id": 1,
                "childer": [{
                  "name": "全部",
                  "value":'0',
                  "active": true
                },{
                  "name": "推荐",
                  "value":'1',
                  "active": false
                },
                  {
                    "name": "热门景点",
                    "value": '2',
                    "active": false
                  }
                ]
              }];
            this.areaList=[
              {
                "title": "区域：",
                "childer": [{
                  "name": "全部",
                  "value":'0',
                  "active": true
                }, {
                  "name": "华东",
                  "value":'1',
                  "active": false
                }, {
                    "name": "华南",
                    "value": '2',
                    "active": false
                  }, {
                  "name": "华中",
                  "value": '3',
                  "active": false
                }, {
                  "name": "华北",
                  "value": '4',
                  "active": false
                }, {
                  "name": "西北",
                  "value": '5',
                  "active": false
                }, {
                  "name": "西南",
                  "value": '6',
                  "active": false
                }, {
                  "name": "东北",
                  "value": '7',
                  "active": false
                }, {
                  "name": "港澳台",
                  "value": '8',
                  "active": false
                }
                ]
              }];
            this.peopleList=[
              {
                "title": "游玩人群：",
                "childer": [{
                  "name": "全部",
                  "id":'1',
                  "value":null,
                  "active": true
                }, {
                  "name": "儿童",
                  "value":'儿童',
                  "id":'2',
                  "active": false
                }, {
                  "name": "青少年",
                  "value": '青少年',
                  "id":'3',
                  "active": false
                }, {
                  "name": "中年人",
                  "value": '中年人',
                  "id":'4',
                  "active": false
                }, {
                  "name": "老年人",
                  "value": '老年人',
                  "id":'5',
                  "active": false
                }
                ]
              }];
            this.seasonList=[
              {
                "title": "游玩季节：",
                "childer": [{
                  "name": "全部",
                  "id":'1',
                  "value":null,
                  "active": true
                }, {
                  "name": "春季",
                  "value":'春季',
                  "id":'2',
                  "active": false
                }, {
                  "name": "夏季",
                  "value": '夏季',
                  "id":'3',
                  "active": false
                }, {
                  "name": "秋季",
                  "value": '秋季',
                  "id":'4',
                  "active": false
                }, {
                  "name": "冬季",
                  "value": '冬季',
                  "id":'5',
                  "active": false
                }
                ]
              }]

          })
          .catch(failRespose => {
            console.log("页面加载错误！正在重新载入...");
            //this.$router.replace("/leaderAdd");
          })
      }
    }
  }

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
