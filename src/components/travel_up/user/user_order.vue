<template>
    <div>
      <vHeader></vHeader>

      <el-container style="height: 100vh; border: 1px solid #eee;background-color: rgba(247, 244, 221, 0.54)">

        <NavMenu></NavMenu>
        <el-dialog title="查看订单" :visible.sync="dialogVisible2" width="60%" center>
          <!-- 生成二维码图片 -->
          <div class="row" >
            <div class="col-md-2"></div>
            <div class="col-md-3" >
              <img  :src="orderView.orderImg"  style="width: 100px;height: 100px"/>
            </div>

            <div class="col-md-4" >
              <div class="row" style="height: 40px;margin-top: 6%">{{orderView.orderName}}</div>
              <div class="row" style="color: #b4b4b4">{{orderView.creatTime}}</div>
            </div>

            <div class="col-md-3" >
              <div class="row" style="height: 40px;margin-top: 8%">￥{{orderView.orderSingelPrice}}</div>
              <div class="row" style="color: #b4b4b4">x{{orderView.orderCount}}</div>
            </div>
            <div class="col-md-1"></div>
          </div>
          <div class="row" style="margin-top: 2%" >
            <div class="col-md-5"></div>
            <div class="col-md-4" >
               <span style="color: #EA8010">
                      <span v-if="orderView.orderStatus===1">交易成功</span>
                      <span v-else-if="orderView.orderStatus===2">待确认</span>
                      <span v-else-if="orderView.orderStatus===3">已取消</span>
                      <span v-else-if="orderView.orderStatus===4">待评价</span>
                      <span v-else>待付款</span>
                    </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;总价: ￥{{orderView.orderTotalPrice}}
            </div>

            <div class="col-md-2" >

            </div>


            <div class="col-md-1"></div>
          </div>
          <div class="row" style="margin-top: 2%">
            <div class="col-md-5"></div>
            <div class="col-md-6" >
              订单编号：{{orderView.orderId}}
            </div>

            <div class="col-md-4" >

            </div>


            <div class="col-md-1"></div>
          </div>
        </el-dialog>
        <el-dialog title="添加评价" :visible.sync="dialogVisible" width="60%" center>
          <!-- 生成二维码图片 -->
          <el-form style="margin-top: 2%;margin-bottom: 2%" >
            <div class="row" v-show="hotelShow">
              <label style="float: left">路线评价:</label><i style="float: left" @click="changeEv(1)"><img v-if="start1" src="@/assets/images/start_on.png"><img v-else src="@/assets/images/start_off.png"></i>
              <i style="float: left" @click="changeEv(2)"><img v-if="start2" src="@/assets/images/start_on.png"><img v-else src="@/assets/images/start_off.png"></i>
              <i style="float: left" @click="changeEv(3)"><img v-if="start3" src="@/assets/images/start_on.png"><img v-else src="@/assets/images/start_off.png"></i>
              <i style="float: left" @click="changeEv(4)"><img v-if="start4" src="@/assets/images/start_on.png"><img v-else src="@/assets/images/start_off.png"></i>
              <i style="float: left" @click="changeEv(5)"><img v-if="start5" src="@/assets/images/start_on.png"><img v-else src="@/assets/images/start_off.png"></i>
            </div>
            <div class="row" >
              <label style="float: left">酒店评价等级:</label><i style="float: left" @click="changeEv2(1)"><img v-if="start21" src="@/assets/images/start_on.png"><img v-else src="@/assets/images/start_off.png"></i>
              <i style="float: left" @click="changeEv2(2)"><img v-if="start22" src="@/assets/images/start_on.png"><img v-else src="@/assets/images/start_off.png"></i>
              <i style="float: left" @click="changeEv2(3)"><img v-if="start23" src="@/assets/images/start_on.png"><img v-else src="@/assets/images/start_off.png"></i>
              <i style="float: left" @click="changeEv2(4)"><img v-if="start24" src="@/assets/images/start_on.png"><img v-else src="@/assets/images/start_off.png"></i>
              <i style="float: left" @click="changeEv2(5)"><img v-if="start25" src="@/assets/images/start_on.png"><img v-else src="@/assets/images/start_off.png"></i>
            </div>
            <div class="row">
              <p>&nbsp;</p>
              <p>&nbsp;</p>
              <el-popover
                placement="bottom"
                title="标题"
                width="500"
                height="700"
                trigger="click"
                v-model="emojiShow"
              >
                <el-button slot="reference" v-show="false">😀</el-button>
                <div class="browBox" >
                  <ul>
                    <li
                      v-for="(item, index) in faceList"
                      :key="index"
                      @click="getBrow(index)"
                    >
                      {{ item }}
                    </li>
                  </ul>
                </div>
              </el-popover>
              <el-button
                class="submit-btn"
                type="primary"
                @click="submitMessage"
                :disabled="content == ''"
              >发送
              </el-button>
              <el-input
                :rows="5"
                type="textarea"
                placeholder="请输入内容"
                @keyup.enter.native="submitMessage"
                v-model="content"
              >
              </el-input>
            </div>

          </el-form>
        </el-dialog>
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
           <div style="margin-top: 2%">
             <el-input type="text" placeholder="搜索" v-model="searchDate.orderName" style="width: 80%"></el-input>
             <el-button class="el-icon-search" @click="search"></el-button>
             <el-button style="border:none" @click="searchToShow" >更多条件筛选</el-button>
           </div>
            <el-form style="margin-top: 2%;margin-bottom: 2%" v-show="searchStatus">
              订单类型：<el-select style="margin-right: 2%" @change="changeType" v-model="orderType">
              <el-option value="全部订单">全部订单</el-option>
              <el-option value="酒店订单">酒店订单</el-option>
              <el-option value="路线订单">路线订单</el-option>
            </el-select>
              成交时间：  <el-date-picker type="datetime"   placeholder="选择开始时间" v-model="searchDate.startTime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" ></el-date-picker> - <el-date-picker type="datetime"  v-model="searchDate.endTime"  placeholder="选择结束时间" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" style="margin-right: 2%" ></el-date-picker>
            </el-form>

            <el-main v-for="(order,oin) in orderList" :key="oin">
              <p>&nbsp;</p>
              <div style="border-radius: 30px;background-color: white " >
                <p>&nbsp;</p>


                <div class="row" >
                  <div class="col-md-2"></div>
                  <div class="col-md-3" >
                    <img  :src="order.orderImg"  style="width: 100px;height: 100px"/>
                  </div>

                  <div class="col-md-4" @dblclick="show(order)">
                    <div class="row" style="height: 40px;margin-top: 6%">{{order.orderName}}</div>
                    <div class="row" style="color: #b4b4b4">{{order.creatTime}}</div>
                  </div>

                  <div class="col-md-3" >
                    <div class="row" style="height: 40px;margin-top: 8%">￥{{order.orderSingelPrice}}</div>
                    <div class="row" style="color: #b4b4b4">x{{order.orderCount}}</div>
                  </div>
                  <div class="col-md-1"></div>
                </div>

                <div class="row" style="margin-top: 2%">
                  <div class="col-md-2"></div>
                  <div class="col-md-3" >
                    <div class="row" style="height: 40px;"><span style="color: #EA8010">
                      <span v-if="order.orderStatus===1">交易成功</span>
                      <span v-else-if="order.orderStatus===2">待确认</span>
                      <span v-else-if="order.orderStatus===3">已取消</span>
                      <span v-else-if="order.orderStatus===4">待评价</span>
                       <span v-else-if="order.orderStatus===5">已失效</span>
                      <span v-else>待付款</span>
                    </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;总价: ￥{{order.orderTotalPrice}}</div>
                  </div>

                  <div class="col-md-3" >
                  </div>

                  <div class="col-md-4" >
                    <div class="row" >
                      <el-button v-if="order.orderStatus===4" style="color: #EA8010;border: #EA8010 1px solid" @click="ToEvaluate(order)">评价</el-button>
                      <el-button v-if="order.orderStatus===2" style="color: #EA8010;border: #EA8010 1px solid" @click="changeSucess(order)">确认完成</el-button>
                      <el-button v-if="order.orderStatus===0" style="color: #EA8010;border: #EA8010 1px solid" @click="pay(order)">付款</el-button>
                      <el-button v-if="order.orderStatus===0" style="color: #8cccfa;border: #8cccfa 1px solid" @click="changePay(order)">取消</el-button>
                      <el-button v-if="order.orderStatus===2" style="color: #8cccfa;border: #8cccfa 1px solid" @click="changePay2(order)">取消订单并退款</el-button>
                      <el-button v-if="order.orderStatus===3" @click="del(order.orderId)">删除</el-button>
                      <el-button v-if="order.orderStatus===5" @click="del(order.orderId)">删除</el-button>
                      <el-button v-if="order.orderStatus===1" @click="del(order.orderId)">删除</el-button>
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
        hotelShow:true,
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
        dialogVisible2: false,
        start1:false,
        start2:false,
        start3:false,
        start4:false,
        start5:false,
        start21:false,
        start22:false,
        start23:false,
        start24:false,
        start25:false,
        navList: ['所有订单', '待付款','待确认','待评价'],
        move: 0,
        searchStatus:false,
        dataNavListRealWidth: 0,
        dataNavListViewWidth: 0,
        tableData: [],
        orderList:[],
        gradeclass: {
          gradeId: '',
          classId: '',
        },
        searchDate:{
          searchType:'',
          orderStatus:'',
          orderName:'',
          startTime:'',
          endTime:'',
          pageIndex:1,
          size:6
        },
        orderView:[],
        order:[],
        evaluate:{
          orderId:'',
          hotelLevel:'',
          evaluateLevel:'',
          evaluateContent:'',
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
      this.loadEmojis();
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
      start(){
        if(this.evaluate.evaluateLevel===1){
          this.start1=true;
          this.start2=false;
          this.start3=false;
          this.start4=false;
          this.start5=false;
        }
        else if(this.evaluate.evaluateLevel===2){
          this.start1=true;
          this.start2=true;
          this.start3=false;
          this.start4=false;
          this.start5=false;
        }
        else if(this.evaluate.evaluateLevel===3){
          this.start1=true;
          this.start2=true;
          this.start3=true;
          this.start4=false;
          this.start5=false;
        }
        else if(this.evaluate.evaluateLevel===4){
          this.start1=true;
          this.start2=true;
          this.start3=true;
          this.start4=true;
          this.start5=false;
        }
        else if(this.evaluate.evaluateLevel===5){
          this.start1=true;
          this.start2=true;
          this.start3=true;
          this.start4=true;
          this.start5=true;
        }
      },
      startHotel(){
        if(this.evaluate.hotelLevel===1){
          this.start21=true;
          this.start22=false;
          this.start23=false;
          this.start24=false;
          this.start25=false;
        }
        else if(this.evaluate.hotelLevel===2){
          this.start21=true;
          this.start22=true;
          this.start23=false;
          this.start24=false;
          this.start25=false;
        }
        else if(this.evaluate.hotelLevel===3){
          this.start21=true;
          this.start22=true;
          this.start23=true;
          this.start24=false;
          this.start25=false;
        }
        else if(this.evaluate.hotelLevel===4){
          this.start21=true;
          this.start22=true;
          this.start23=true;
          this.start24=true;
          this.start25=false;
        }
        else if(this.evaluate.hotelLevel===5){
          this.start21=true;
          this.start22=true;
          this.start23=true;
          this.start24=true;
          this.start25=true;
        }
      },
      show(orders){
        this.dialogVisible2=true;
        this.orderView=orders;
      },
      changeEv(num){
        this.evaluate.evaluateLevel=num;
        this.start();
      },
      changeEv2(num){
        this.evaluate.hotelLevel=num;
        this.startHotel();
      },
      changeType(){
        if(this.orderType==='全部订单'){
          this.searchDate.searchType=0;
        }else if(this.orderType==='全部订单'){
          this.searchDate.searchType=1;
        }else if(this.orderType==='全部订单'){
          this.searchDate.searchType=2;
        }

      },
      changeSucess(order){
        if(confirm("确实已经完成了吗？")){
          var qs=require('querystring')
          let config={
            header:{'Content-type':'application/x-www-form-urlencoded'}
          };
          var data={orderId:order.orderId,status:4,lineOrHotelId:order.lineOrHotelId,orderType:order.orderType,orderCount:order.orderCount};

          this.$axios.post("/order/change_status",qs.stringify(data),config)
            .then(successReqponse => {
              var data = successReqponse.data;
              if(data.message==='OK'){
                this.init();
              }
            })
            .catch(failRespose => {
              console.log("页面加载错误！正在重新载入...");
              //this.$router.replace("/leaderAdd");
            })
        }else {
          alert("已经取消了确认操作");
        }
      },
      changePay(order){
        if(confirm("确定取消此订单了吗？")){
          var qs=require('querystring')
          let config={
            header:{'Content-type':'application/x-www-form-urlencoded'}
          };
          console.log(order);
          var data={orderId:order.orderId,status:3,lineOrHotelId:order.lineOrHotelId,orderType:order.orderType,orderCount:order.orderCount};
          console.log(data);
          console.log(qs.stringify(data));
          this.$axios.post("/order/cancel_pay",qs.stringify(data),config)
            .then(successReqponse => {
              var data = successReqponse.data;
              if(data.message==='OK'){
                this.init();
              }
            })
            .catch(failRespose => {
              console.log("页面加载错误！正在重新载入...");
              //this.$router.replace("/leaderAdd");
            })
        }else {
          alert("已经取消了操作");
        }
      },
      changePay2(order){
        if(confirm("确定取消此订单了吗？")){
          var qs=require('querystring')
          let config={
            header:{'Content-type':'application/x-www-form-urlencoded'}
          };
          var data={orderId:order.orderId,status:3,lineOrHotelId:order.lineOrHotelId,orderType:order.orderType,orderCount:order.orderCount};

          this.$axios.post("/order/cancel_order",qs.stringify(data),config)
            .then(successReqponse => {
              var data = successReqponse.data;
              if(data.message==='OK'){
                this.init();
              }
            })
            .catch(failRespose => {
              console.log("页面加载错误！正在重新载入...");
              //this.$router.replace("/leaderAdd");
            })
        }else {
          alert("已经取消了操作");
        }
      },
      pay(orders){
        var qs = require('querystring')
        let config = {
          header: {'Content-type': 'application/x-www-form-urlencoded'}
        };
        var data={orders:orders,status:1};
        this.$axios.get("/user/getuser?userId="+orders.userId)
          .then(successReqponse => {
            var data = successReqponse.data;
            if(data.user.userAmount<orders.orderTotalPrice){
              alert("账户余额不足,请充值")
              this.$router.push({path:'/user_money',query:{userId:orders.userId}});//返回上一层
            }
            else {
              this.$axios.post("/order/pay",qs.stringify(orders),config)
                .then(successReqponse => {
                  var data = successReqponse.data;
                  if(data.message==='OK'){
                    alert('支付成功');
                    this.init();
                  }
                })
                .catch(failRespose => {
                  console.log("页面加载错误！正在重新载入...");
                  //this.$router.replace("/leaderAdd");
                })
            }

          })
          .catch(failRespose => {
            console.log("页面加载错误！正在重新载入...");
            //this.$router.replace("/leaderAdd");
          })
      },
      dataListFn: function(index){
        var qs=require('querystring')
        let config={
          header:{'Content-type':'application/x-www-form-urlencoded'}
        };
        this.searchDate.pageIndex=index;
        this.$axios.post("/order/user_list",qs.stringify(this.searchDate),config)
          .then(successReqponse => {
            var data = successReqponse.data;

            this.orderList=[];
            this.orderList = data.orderList;
            this.all =data.pageCount;//总页数
            this.totalCount = data.total;
            this.searchDate.searchTitle=data.searchTitle;
          //  this.current=data.searchType-1;
            this.searchDate.searchType=data.searchType;
            this.searchDate.startTime=data.startTime;
            this.searchDate.endTime=data.endTime;
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
        this.searchDate.pageIndex=1;
        this.$axios.post("/order/user_list",qs.stringify(this.searchDate),config)
          .then(successReqponse => {
            var data = successReqponse.data;

              this.orderList=[];
              this.orderList = data.orderList;
            this.all =data.pageCount;//总页数
            this.totalCount = data.total;
            this.searchDate.searchTitle=data.searchTitle;
           // this.current=data.searchType-1;
            this.searchDate.searchType=data.searchType;
            this.searchDate.startTime=data.startTime;
            this.searchDate.endTime=data.endTime;
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
        this.searchDate.pageIndex=1;
        this.searchDate.startTime='';
        this.searchDate.endTime='';
        this.searchDate.searchType='';
        this.$axios.post("/order/user_list",qs.stringify(this.searchDate),config)
          .then(successReqponse => {
            var data = successReqponse.data;

            this.orderList=[];
            this.orderList = data.orderList;
            this.all =data.pageCount;//总页数
            this.totalCount = data.total;
            this.searchDate.searchTitle=data.searchTitle;
           // this.current=data.searchType;
            this.searchDate.searchType=data.searchType;
            this.searchDate.startTime=data.startTime;
            this.searchDate.endTime=data.endTime;
          })
          .catch(failRespose => {
            console.log("页面加载错误！正在重新载入...");
            //this.$router.replace("/leaderAdd");
          })
      },
      del(orderId) {

        if(confirm("确实要删除吗？")){
          var qs=require('querystring')
          let config={
            header:{'Content-type':'application/x-www-form-urlencoded'}
          };
          this.$axios.post("order/del_user?orderId="+orderId,config)
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
      ToEvaluate(order){
        this.evaluate.orderId=order.orderId;
        this.dialogVisible=true;
        if(order.orderType===2){
          this.hotelShow=true;
        }
      },

      open(){

      },

      loadEmojis() {
        for (let i in appData) {
          this.faceList.push(appData[i].char);
        }
      },
      // 获取用户点击之后的标签 ，存放到输入框内
      getBrow(index) {
        for (let i in this.faceList) {
          if (index == i) {
            this.getBrowString = this.faceList[index];
            this.content +=' ' +this.getBrowString+' ';
          }
        }
        this.evaluate.evaluateContent=this.content;
        alert(this.evaluate.evaluateContent)
        this.emojiShow = false;
      },
      submitMessage(){
        var qs = require('querystring')
        let config = {
          header: {'Content-type': 'application/x-www-form-urlencoded'}
        };
        this.evaluate.evaluateContent=this.content;
        console.log(this.evaluate.evaluateContent)
       this.$axios.post("/evaluates/save", qs.stringify(this.evaluate), config)
          .then(successReqponse => {
            if(successReqponse.data.message==='OK'){
              alert("保存成功");
              this.init();
            }
            else{
              alert("保存失败");
            }


          })
          .catch(failRespose => {
            console.log("系统错误");
          })
        alert(this.content)
        //提交。。。
      },
      changeTable(index){
        if(index===1){

          this.current=1;
          this.searchDate.orderStatus=0;
        }
        else if(index===2){

          this.current=2;
          this.searchDate.orderStatus=2;
        }
        else if(index===3){

          this.current=3
          this.searchDate.orderStatus=4;
        }
        else {

          this.current=0;
          this.searchDate.orderStatus=-1;
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

  .active {
    color: #ffb611!important;
  }
</style>
