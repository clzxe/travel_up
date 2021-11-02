<template>
  <div id="app">
    <vHeader></vHeader>

    <el-container style="height: 100vh; border: 1px solid #eee">

      <NavMenu></NavMenu>

      <el-container >

        <el-header style="text-align: center; font-size: 12px">
          <div class="dataNav">

            <ul class="dataNavList" ref="dataNavList" >
              <li  v-for="(item,index) in navList" @click="changeTable(index)"  :class="{active:current===index}"  :style="{transform:'translateX(-'+move+'px)'}">{{item}}</li>

            </ul>

          </div>
          <!--<span style="font-size: 17px">学生信息列表</span>-->

        </el-header>

        <el-main>
          <el-input type="text" placeholder="搜索" style="width: 80%" v-model="searchData.orderName"></el-input>
          <el-button class="el-icon-search"></el-button>
          <el-button style="border:none" @click="searchToShow" >更多条件筛选</el-button>
          <div v-show="table1">
            <el-form style="margin-top: 2%;margin-bottom: 2%" v-show="searchStatus">
              订单类型：<el-select style="margin-right: 2%" @change="changeLevel" v-model="levelName">
              <el-option value="全部">全部</el-option>
              <el-option value="好评">好评</el-option>
              <el-option value="中评">中评</el-option>
              <el-option value="差评">差评</el-option>
            </el-select>
              评价时间：  <el-date-picker type="datetime"   placeholder="选择开始时间" v-model="searchData.startTime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" ></el-date-picker> - <el-date-picker type="datetime"  v-model="searchData.endTime"  placeholder="选择结束时间" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" style="margin-right: 2%" ></el-date-picker>

            </el-form>

          </div>
          <div v-show="table2">
            <el-form style="margin-top: 2%;margin-bottom: 2%" v-show="searchStatus">
              订单类型：<el-select style="margin-right: 2%" @change="changeLevel" v-model="levelName">
              <el-option value="全部">全部</el-option>
              <el-option value="好评">好评</el-option>
              <el-option value="中评">中评</el-option>
              <el-option value="差评">差评</el-option>
            </el-select>
              评价时间：  <el-date-picker type="datetime"   placeholder="选择开始时间" v-model="searchData.startTime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" ></el-date-picker> - <el-date-picker type="datetime"  v-model="searchData.endTime"  placeholder="选择结束时间" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" style="margin-right: 2%" ></el-date-picker>

            </el-form>
          </div>
          <div v-show="table3">
            <el-form style="margin-top: 2%;margin-bottom: 2%" v-show="searchStatus">
              订单类型：<el-select style="margin-right: 2%" @change="changeLevel" v-model="levelName">
              <el-option value="全部">全部</el-option>
              <el-option value="好评">好评</el-option>
              <el-option value="中评">中评</el-option>
              <el-option value="差评">差评</el-option>
            </el-select>
              评价时间：  <el-date-picker type="datetime"   placeholder="选择开始时间" v-model="searchData.startTime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" ></el-date-picker> - <el-date-picker type="datetime"  v-model="searchData.endTime"  placeholder="选择结束时间" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" style="margin-right: 2%" ></el-date-picker>

            </el-form>
          </div>
          <el-main v-for="(order,oin) in evaluateList" :key="oin">
            <p>&nbsp;</p>
            <div style="border-radius: 30px;background-color: white " >
              <p>&nbsp;</p>
              <p>&nbsp;</p>
              <p>&nbsp;</p>
              <div class="row" >
                <div class="col-md-2"></div>
                <div class="col-md-2" >
                  <img  :src="order.orderImg"  style="width: 100px;height: 100px"/>
                </div>

                <div class="col-md-4" >
                  <div class="row" style="height: 40px;margin-top: 6%">{{order.orderName}}</div>
                  <div class="row" style="color: #b4b4b4">{{order.orderCreatTime}}</div>
                </div>

                <div class="col-md-3" >
                  <div class="row" style="height: 40px;margin-top: 8%">￥{{order.orderSingelPrice}}</div>
                  <div class="row" style="color: #b4b4b4">x{{order.orderCount}}</div>
                </div>
                <div class="col-md-1"></div>
              </div>

              <div class="row" style="margin-top: 2%">
                <div class="col-md-2"></div>
                <div class="col-md-2" >
                  <div class="row" style="height: 40px;">
                     <span  v-if="order.evaluateLevel===1">
                <i style="float: left;margin-left: 20%"><img  src="@/assets/images/start_on.png"></i>
                <i style="float: left"><img  src="@/assets/images/start_off.png"></i>
                <i style="float: left"><img  src="@/assets/images/start_off.png"></i>
                <i style="float: left"><img  src="@/assets/images/start_off.png"></i>
                <i style="float: left"><img  src="@/assets/images/start_off.png"></i>
              </span>
                    <span  v-else-if="order.evaluateLevel===2">
                <i style="float: left;margin-left: 20%"><img  src="@/assets/images/start_on.png"></i>
                <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
                <i style="float: left"><img  src="@/assets/images/start_off.png"></i>
                <i style="float: left"><img  src="@/assets/images/start_off.png"></i>
                <i style="float: left"><img  src="@/assets/images/start_off.png"></i>
              </span>
                    <div  v-else-if="order.evaluateLevel===3">
                      <i style="float: left;margin-left: 20%"><img  src="@/assets/images/start_on.png"></i>
                      <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
                      <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
                      <i style="float: left"><img  src="@/assets/images/start_off.png"></i>
                      <i style="float: left"><img  src="@/assets/images/start_off.png"></i>
                    </div>
                    <span  v-else-if="order.evaluateLevel===4">
                <i style="float: left;margin-left: 20%"><img  src="@/assets/images/start_on.png"></i>
                <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
                <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
                <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
                <i style="float: left"><img  src="@/assets/images/start_off.png"></i>
              </span>
                    <span v-else>
                <i style="float: left;margin-left: 20%"><img  src="@/assets/images/start_on.png"></i>
                <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
                <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
                <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
                <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
              </span>
                  </div>
                  <div class="row" style="height: 40px;">
                     <span  v-if="order.hotelLevel===1">
                <i style="float: left;margin-left: 20%"><img  src="@/assets/images/start_on.png"></i>
                <i style="float: left"><img  src="@/assets/images/start_off.png"></i>
                <i style="float: left"><img  src="@/assets/images/start_off.png"></i>
                <i style="float: left"><img  src="@/assets/images/start_off.png"></i>
                <i style="float: left"><img  src="@/assets/images/start_off.png"></i>
              </span>
                    <span  v-else-if="order.hotelLevel===2">
                <i style="float: left;margin-left: 20%"><img  src="@/assets/images/start_on.png"></i>
                <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
                <i style="float: left"><img  src="@/assets/images/start_off.png"></i>
                <i style="float: left"><img  src="@/assets/images/start_off.png"></i>
                <i style="float: left"><img  src="@/assets/images/start_off.png"></i>
              </span>
                    <div  v-else-if="order.hotelLevel===3">
                      <i style="float: left;margin-left: 20%"><img  src="@/assets/images/start_on.png"></i>
                      <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
                      <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
                      <i style="float: left"><img  src="@/assets/images/start_off.png"></i>
                      <i style="float: left"><img  src="@/assets/images/start_off.png"></i>
                    </div>
                    <span  v-else-if="order.hotelLevel===4">
                <i style="float: left;margin-left: 20%"><img  src="@/assets/images/start_on.png"></i>
                <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
                <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
                <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
                <i style="float: left"><img  src="@/assets/images/start_off.png"></i>
              </span>
                    <span v-else>
                <i style="float: left;margin-left: 20%"><img  src="@/assets/images/start_on.png"></i>
                <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
                <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
                <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
                <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
              </span>
                  </div>
                </div>

                <div class="col-md-5" >
                  <div class="row" >
                    <el-input
                      :rows="5"
                      type="textarea"
                     readonly="readonly"
                      v-model="order.evaluateContent"
                    >
                    </el-input>
                  </div>

                </div>
                <div class="col-md-1" ></div>
                <div class="col-md-2" >
                  <div class="row" >
                   <el-button  @click="del(order.evaluateId)">删除</el-button>
                  </div>

                </div>
                <div class="col-md-1"></div>
              </div>
              <p>&nbsp;</p>
            </div>
          </el-main>
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

        </el-main>
      </el-container>

    </el-container>
  </div>
</template>

<script>
  import Header from "../common/Header";
  import NavMenu from "../common/NavMenu";
  export default {
    name: 'user_eveal',
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
        navList: ['所有评价', '酒店评价','路线评价'],
        move: 0,
        searchStatus:false,
        dataNavListRealWidth: 0,
        dataNavListViewWidth: 0,
        evaluateList: [],
        checkgroup:[],
        isAllChange:false,

        gradeclass: {
          gradeId: '',
          classId: '',
        },
        levelName:'',
        searchData:{
          orderType:0,
          orderName:'',
          startTime:'',
          endTime:'',
          pageIndex:'',
          size:10,
          level:0
        },
        table1:true,
        table2:false,
        table3:false,
        current:0,
        all: 10, //总页数
        cur: 1,//当前页码
        totalPage: 0,//当前条数
        totalCount:124,
      }
    },
    mounted:function() {
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
      //判断全选框
      handlechange:function(){
        if(this.isAllChange){
          this.checkgroup = this.tableData;
        }else{
          this.checkgroup = [];
        }
      },

      //判断全选框
      handleLiChange:function(){
        if(this.checkgroup.length !== this.tableData.length){
          this.isAllChange = false;
        }else{
          this.isAllChange = true;
        }
      },

      //删除
      rmove:function(index){
        var that = this;
        that.tableData.splice(index,1);
        that.checkgroup.splice(index,1);
      },
      del(evaluateId) {

        if(confirm("确实要删除吗？")){
          var qs=require('querystring')
          let config={
            header:{'Content-type':'application/x-www-form-urlencoded'}
          };
          this.$axios.post("evaluates/del?evaluateId="+evaluateId,config)
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
      changeLevel(){
        if(this.levelName==='全部'){
          this.searchData.level=0;
        }
        else if(this.levelName==='好评'){
          this.searchData.level=1;
        }
        else if(this.levelName==='中评'){
          this.searchData.level=2;
        }
        else if(this.levelName==='差评'){
          this.searchData.level=3;
        }
      },
      dataListFn: function(index){
        var qs=require('querystring')
        let config={
          header:{'Content-type':'application/x-www-form-urlencoded'}
        };
        this.searchData.pageIndex=index;
        this.$axios.post("/evaluates/user_list",qs.stringify(this.searchData),config)
          .then(successReqponse => {
            var data = successReqponse.data;


            this.evaluateList=[];
            this.evaluateList = data.evaluateList;
            console.log( this.evaluateList);
            this.all = data.pageCount;//总页数
            this.totalCount = data.total;
            this.user=data.user;
            this.current=data.orderType;
            this.searchData.level=data.level;
            this.searchData.orderName=data.orderName;
            this.searchData.orderType=data.orderType;
            this.searchData.startTime=data.startTime;
            this.searchData.endTime=data.endTime;

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
        this.searchData.pageIndex=1
        this.$axios.post("/evaluates/user_list",qs.stringify(this.searchData),config)
          .then(successReqponse => {
            var data = successReqponse.data;


              this.evaluateList=[];
              this.evaluateList = data.evaluateList;
              console.log( this.evaluateList);
              this.all = data.pageCount;//总页数
              this.totalCount = data.total;
              this.user=data.user;
            this.current=data.orderType;
            this.searchData.level=data.level;
            this.searchData.orderName=data.orderName;
            this.searchData.orderType=data.orderType;
            this.searchData.startTime=data.startTime;
            this.searchData.endTime=data.endTime;

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
        this.searchData.pageIndex=1
        this.$axios.post("/evaluates/user_list",qs.stringify(this.searchData),config)
          .then(successReqponse => {
            var data = successReqponse.data;


            this.evaluateList=[];
            this.evaluateList = data.evaluateList;
            console.log( this.evaluateList);
            this.all = data.pageCount;//总页数
            this.totalCount = data.total;
            this.user=data.user;
            this.current=data.orderType;
            this.searchData.level=data.level;
            this.searchData.orderName=data.orderName;
            this.searchData.orderType=data.orderType;
            this.searchData.startTime=data.startTime;
            this.searchData.endTime=data.endTime;

          })
          .catch(failRespose => {
            console.log("页面加载错误！正在重新载入...");
            //this.$router.replace("/leaderAdd");
          })
      },
      changeTable(index){
        if(index===1){
          this.table1=false;
          this.table2=true;
          this.table3=false;
          this.current=1
          this.searchData.orderType=1;
        }
        else if(index===2){
          this.table1=false;
          this.table2=false;
          this.table3=true;
          this.searchData.orderType=2;
        }
        else {
          this.table1=true;
          this.table2=false;
          this.table3=false;
          this.current=0
          this.searchData.orderType=0;
        }
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
</style>
