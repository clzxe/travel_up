<template>
  <div>
    <vHeader></vHeader>

    <el-container style="height: 100vh; border: 1px solid #eee;background-color: rgba(247, 244, 221, 0.54)">

      <NavMenu></NavMenu>

      <el-container >

        <el-header style="text-align: center; font-size: 12px">
          <div class="dataNav">

            <ul class="dataNavList" ref="dataNavList" >
              <li  >我的攻略</li>

            </ul>

          </div>
          <!--<span style="font-size: 17px">学生信息列表</span>-->

        </el-header>

        <el-main>
          <div style="margin-top: 2%">
            <el-input type="text" placeholder="搜索" v-model="searchData.searchTitle" style="width: 70%"></el-input>
            <el-button class="el-icon-search" @click="search"></el-button>
            <el-button style="border:none" @click="searchToShow" >更多条件筛选</el-button>
            <el-button  @click="goToStrategy">新增攻略</el-button>
          </div>
          <el-form style="margin-top: 2%;margin-bottom: 2%" v-show="searchStatus">

            创建时间：  <el-date-picker type="datetime"   placeholder="选择开始时间" v-model="searchData.startTime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" ></el-date-picker> - <el-date-picker type="datetime"  v-model="searchData.endTime"  placeholder="选择结束时间" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" style="margin-right: 2%" ></el-date-picker>
          </el-form>

          <el-main v-for="(order,oin) in strategyList" :key="oin">

            <div style="border-radius: 30px;background-color: white " >
              <p>&nbsp;</p>
              <p>&nbsp;</p>
              <div class="row" >
                <div class="col-md-2"></div>
                <div class="col-md-3" >
                  <img  :src="order.strategyImg"  style="width: 100px;height: 100px"/>
                </div>

                <div class="col-md-4" >
                  <div class="row" style="height: 40px;margin-top: 6%"><router-link :to="{path:'strategy',query: {strategyId:order.strategyId}}">{{order.strategyName}}</router-link></div>
                  <div class="row" style="color: #b4b4b4">{{order.creatTime}}</div>
                </div>

                <div class="col-md-3" >
                  <div class="row" style="height: 40px;margin-top: 8%">{{order.scenicName}}</div>

                </div>
                <div class="col-md-1"></div>
              </div>

              <div class="row" style="margin-top: 2%">
                <div class="col-md-2"></div>
                <div class="col-md-3" >

                </div>
                <div class="col-md-3" >

                </div>

                <div class="col-md-4" >
                  <div class="row" >
                    <router-link :to="{path:'update_strategy',query: {strategyId:order.strategyId}}"><el-button style="color: #EA8010;border: #EA8010 1px solid" >修改</el-button></router-link>
                    <el-button  @click="del(order.strategyId)">删除</el-button>
                  </div>

                </div>
                <div class="col-md-1"></div>
              </div>

            </div>

          </el-main>

        </el-main>
      </el-container>

    </el-container>
    <div id="pags">
      <!-- 分页  -->
      <div id="pagination" style="float:left;"></div>
      <div class="pageNum" style="margin-left:30%" >
        <!--分页-->

        <ul>
          <li style="width: 80px"><div class="row" style="margin-top: 2%;font-size: 10px;color: #cecece">共{{all}}页/{{totalCount}}条</div></li>
          <li style="font-size: 12px" class="threeword" ><a v-on:click="cur=1,pageClick()">首页</a></li>
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
</template>

<script>
  const appData = require("@/assets/images/emojis.json");
  import Header from "../common/Header";
  import NavMenu from "../common/NavMenu";
  export default {
    name: 'user_order',
    components: {
      NavMenu,
      'vHeader': Header
    },
    data() {
      /*this.$axios.get(`student/getAll`).then(res => {
        if (res.data.code == 200) {
          this.tableData = res.data.data
        }
      })*/
      return {
        checkList:[],
        //聊天输入内容
        content: "",
        //表情框是否展示
        emojiShow: false,
        //表情列表
        faceList: [],
        //表情文本
        getBrowString: "",
        isAllChecked:false,
        dialogVisible: false,
        navList: ['所有订单', '待付款','待确认','待评价'],
        move: 0,
        searchStatus:false,
        dataNavListRealWidth: 0,
        dataNavListViewWidth: 0,
        tableData: [],
        strategyList:[],
        searchData:{
          searchTitle:'',
          startTime:'',
          endTime:'',
          pageIndex:1,
          size:10
        },
        orderType:'',
        current:0,
        all: 10, //总页数
        cur: 1,//当前页码
        totalPage: 0,//当前条数
        totalCount:124,

      }
    },
    mounted:function(){
      this.init();
    },
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
    methods: {
      goToStrategy(){
        this.$router.replace("/add_strategy");
      },
      dataListFn: function(index){
        var qs=require('querystring')
        let config={
          header:{'Content-type':'application/x-www-form-urlencoded'}
        };
        this.searchData.pageIndex=index;
        this.$axios.post("/strategy/user_list",qs.stringify(this.searchData),config)
          .then(successReqponse => {
            var data = successReqponse.data;

            this.strategyList=[];
            this.strategyList = data.strategyList;
            this.all =data.pageCount;//总页数
            this.totalCount = data.total;
            this.searchData.searchTitle=data.searchTitle;
            this.searchData.startTime=data.startTime;
            this.searchData.endTime=data.endTime;
            this.user=data.user;
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
        this.searchData.pageIndex=1;
        this.$axios.post("/strategy/user_list",qs.stringify(this.searchData),config)
          .then(successReqponse => {
            var data = successReqponse.data;

            this.strategyList=[];
            this.strategyList = data.strategyList;
            this.all =data.pageCount;//总页数
            this.totalCount = data.total;
            this.searchData.searchTitle=data.searchTitle;
            this.searchData.startTime=data.startTime;
            this.searchData.endTime=data.endTime;
            this.user=data.user;
          })
          .catch(failRespose => {
            console.log("页面加载错误！正在重新载入...");
            //this.$router.replace("/leaderAdd");
          })
      },
      search() {
        var qs = require('querystring')
        let config = {
          header: {'Content-type': 'application/x-www-form-urlencoded'}
        };
        this.searchData.pageIndex=1;
        this.$axios.post("/strategy/user_list",qs.stringify(this.searchData),config)
          .then(successReqponse => {
            var data = successReqponse.data;

            this.strategyList=[];
            this.strategyList = data.strategyList;
            this.all =data.pageCount;//总页数
            this.totalCount = data.total;
            this.searchData.searchTitle=data.searchTitle;
            this.searchData.startTime=data.startTime;
            this.searchData.endTime=data.endTime;
            this.user=data.user;
          })
          .catch(failRespose => {
            console.log("页面加载错误！正在重新载入...");
            //this.$router.replace("/leaderAdd");
          })
      },
      del(strategyId) {

        if(confirm("确实要删除吗？")){
          var qs=require('querystring')
          let config={
            header:{'Content-type':'application/x-www-form-urlencoded'}
          };
          this.$axios.post("strategy/del?strategyId="+strategyId,config)
            .then(successResponse=>{
              if(successResponse.data==="OK"){
                alert("删除成功")
                this.init();
              }
              else {
                alert(successResponse.data)
              }
            })
            .catch(failResponse=>{
              alert("响应异常")
            })
        }else {
          alert("已经取消了删除操作");
        }

      },
      changeTable(index){
        if(index===1){

          this.current=1;
          this.searchData.orderStatus=0;
        }
        else if(index===2){

          this.current=2;
          this.searchData.orderStatus=2;
        }
        else if(index===3){

          this.current=3
          this.searchData.orderStatus=4;
        }
        else {

          this.current=0;
          this.searchData.orderStatus=-1;
        }
        this.search();
      },
      // 当菜单项向右的可移动距离大于单个菜单项的宽度时，move减去一个菜单项的宽度（即右移移动一个菜单项的宽度），
      // 当菜单项向右的可移动距离小于单个菜单项的宽度时，move等于0（即回到最开始没有移动的状态）
      navPrev() {
        if (this.move > 70) {
          this.move = this.move - 70;
        } else {
          this.move = 0
        }
      },
      // 当菜单项向左的可移动距离大于单个菜单项的宽度时，move减去一个菜单项的宽度（即左移移动一个菜单项的宽度），
      // 当菜单项向左的可移动距离小于单个菜单项的宽度时，move等于可以向左移动的最大值（即到最末尾）
      navNext() {
        if (this.move < this.dataNavListRealWidth - this.dataNavListViewWidth - 70) {
          this.move = this.move + 70;
        } else {
          this.move = this.dataNavListRealWidth - this.dataNavListViewWidth
        }
      }
      ,
      // 当菜单项向左的可移动距离大于单个菜单项的宽度时，move减去一个菜单项的宽度（即左移移动一个菜单项的宽度），
      // 当菜单项向左的可移动距离小于单个菜单项的宽度时，move等于可以向左移动的最大值（即到最末尾）
      searchToShow() {
        if (this.searchStatus===false) {
          this.searchStatus=true;
        } else {
          this.searchStatus=false;
        }
      }
    }
  }
</script>

<style scoped lang="less">

  html,body{
    padding: 0;
    margin: 0;
  }

  .el-header {
    background-color: #fff2d1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    background-color: #e8d435;
    color: #333;

  }
  .dataNav {
    display: flex;
    height: 70px;
    .dataNavList {
      display: flex;
      margin-left: 5%;
      // 超出部分隐藏
      overflow: hidden;
      li{
        display: inline-block;
        height: 35px;
        //每个菜单项的宽度要固定，不然move值无法计算，当然也可以通过其他方法来设置以适应自己的表格
        width: 150px;
        min-width: 70px;
        margin: auto 0 auto 10%;
        border-radius: 5px;
        font-size: 20px;
        font-weight: bold;
        text-align: center;
        color: #7E8690;
        line-height: 35px;
        // 过渡效果
        transition:transform .2s;
      }
      :hover {
        color: #ffb611;
        cursor: pointer;
      }
      :active {
        color: #ffb611;
        cursor: pointer;
      }
    }
    // 按钮样式
    .dataNavPrev,
    .dataNavNext{
      display: inline-block;
      width: 35px;
      min-width: 35px;
      height: 35px;
      margin: auto 0;
      border: none;
      border-radius: 5px;
      text-align: center;
      line-height:35px;
      background-color: rgba(0,0,0,0);
      &:focus{
        outline: none;
      }
      &:hover{
        color: #1D4190;
        background-color: #c7cede;
        cursor: pointer;
      }
    }
    .dataNavNext{
      margin-left: auto;
    }

  }
  .active {
    color: #ffb611!important;
  }
  .browBox {
    width: 100%;
    height: 200px;
    background: #e6e6e6;
    z-index: 100;
    bottom: 0px;
    overflow: scroll;
    ul {
      display: flex;
      flex-wrap: wrap;
      padding: 10px;
      li {
        cursor: pointer;
        width: 10%;
        font-size: 26px;
        list-style: none;
        text-align: center;
      }
    }
  }
  .submit-btn {
    margin: 0 15px 10px 0;
    float: right;
  }

  .active{
    color: #6a1b9a;
  }
</style>
