<template>
  <div id="app">
    <VHeader :currentHeader="4"></VHeader>
    <div class="wrap" :style="{background:bg}">
      <div class="bread_box">
        <a href="http://localhost/travel/index.html">首页</a>
        <span> &gt;</span>

        <a href="#" id="route_category">酒店</a><span> &gt;</span>
        <a href="#" id="route_rname">{{hotel.hotelName}}</a>

      </div>
      <div >
      <div class="prosum_box" style="margin: 0px auto 0px;">
        <dl class="prosum_left">
          <dt>
            <img alt="" class="big_img"
                 :src="hotel.hotelImg">
          </dt>

        </dl>
        <div class="prosum_right" style="background-color: white">
          <p class="pros_title">{{hotel.hotelName}}</p>
          <p class="hot" id="hot">1-2月出发，网付立享￥1099/2人起！爆款位置有限，抢完即止！</p>
          <div class="pros_other">
            <p style="margin-top: 2%" id="seller_tel">咨询电话 : &nbsp;&nbsp;{{hotel.hotelPhone}}</p>
            <p style="margin-top: 2%" id="seller_site">地 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;址 ： {{hotel.hotelAddr}}</p>
            <p style="margin-top: 2%">相关景点 : &nbsp;<span class="target_txt3"><router-link :to="{path:'scenic',query:{scenicId:hotel.hotelScenic}}">{{hotel.scenicName}}</router-link></span></p>


          </div>
          <div >

          </div>
        </div>
      </div>
      <div>

      </div>
        <div class="you_need_konw2" style="background-color: white;margin: 0px auto 0px;">
          <div style="margin-left: 2%;width: 97%">
            <p>&nbsp;</p>
            <span style="font-size: 16px;
	border-bottom: 3px solid #ffc900;"><i class="iconfont travel-iconbianji" style="color: #ffc900"></i>房间</span><br>

            <div class="" style="border: solid 1px #ddd;height: auto;margin-top: 2%" >
              <table style="margin-left: 10%;width: 80%;margin-top: 2%;align-items: center;text-align: center">
                <tr style="height: 30px;color: #ffc900">
                  <th width="15%" style="align-items:center;text-align: center"></th>
                  <th width="30%" style="align-items:center;text-align: center">房间</th>
                  <th width="30%" style="align-items:center;text-align: center">价格</th>
                  <th width="30%" style="align-items:center;text-align: center">预订</th>
                </tr>
                <tr style="height: 200px;color: grey" v-for="room in hotelRoomList">
                  <td style="align-items:center;text-align: center">
                    <img style="width: 100px;height: 100px" :src="room.hotelRoomImg">
                  </td>
                  <td style="align-items:center;text-align: center">{{room.hotelRoomName}}</td>
                  <td style="align-items:center;text-align: center">{{room.hotelRoomPrice}}</td>
                  <td style="align-items:center;text-align: center"><el-button :disabled="room.hotelRoomCount===0" @click="jdgueUser(room)"  >预订</el-button></td>
                </tr>
              </table>

              <p>&nbsp;</p>
            </div>
            <p>&nbsp;</p>
          </div>


        </div>
        <el-dialog title="立即预订" :visible.sync="dialogVisible" width="50%" center>
          <!-- 生成二维码图片 -->

          <div class="row" v-show="user.userName!=null">
            <div class="row">
              <div class="col-md-2"></div>
              <div class="col-md-6"> 房间数量</div>
              <div class="col-md-2"><a @click="roomtype=true">{{count}}间<i class="el-icon-arrow-down"></i></a></div>

            </div>
            <div class="row" style="margin-top: 2%" v-show="roomtype">
              <div class="col-md-7"></div>
              <div class="col-md-5">
                <p>最多可预订3间</p>
                <el-button @click="changeCount(1)">1间</el-button><el-button @click="changeCount(2)">2间</el-button><el-button  @click="changeCount(2)">3间</el-button>
              </div>

            </div>
            <div class="row" style="margin-top: 2%">
              <div class="col-md-2"></div>
              <div class="col-md-6"> 入住人</div>
              <div class="col-md-2">{{user.userName}}</div>

            </div>
            <div class="row" style="margin-top: 2%">
              <div class="col-md-2"></div>
              <div class="col-md-6"> 联系手机</div>
              <div class="col-md-2"><a>{{user.userTel}}</a></div>

            </div>
            <div class="row" style="margin-top: 2%">
              <div class="col-md-2"></div>
              <div class="col-md-6"> 入住日期:</div>
              <div class="col-md-2"><el-date-picker  type="datetime"   placeholder="选择出发时间" value-format="yyyy-MM-dd HH:mm:ss"  v-model="order.inDate"   style="width: 100%;"></el-date-picker></div>

            </div>
            <div class="row" style="margin-top: 2%">
              <div class="col-md-2"></div>
              <div class="col-md-6"> 离开日期</div>
              <div class="col-md-2"><el-date-picker type="datetime"   placeholder="离开日期" value-format="yyyy-MM-dd HH:mm:ss" v-model="order.leaveDate"   style="width: 100%;"></el-date-picker></div>

            </div>
          </div>


          <div style="margin-top: 3%">
            <center>
            <span slot="footer" class="dialog-footer" >
                <el-button type="button" class="btn btn-default" data-dismiss="modal">关闭</el-button>
                <el-button type="primary" @click="sub">确定</el-button>
            </span>
            </center>
          </div>
        </el-dialog>

        <el-dialog title="回复" :visible.sync="dialogVisible2" width="50%" center>
          <form class="form-horizontal" role="form" onsubmit="return false;" id="form1" >
            <div class="form-group">
              <label class="col-sm-2 control-label">评论</label>
              <div class="col-sm-10">
                <el-input type="text"  style="width: 60%" v-model="reply.replyContent"
                          name="scenicName" placeholder="回复内容" required="required"></el-input>
              </div>
            </div>
          </form>

          <div style="margin-top: 3%">
            <center>
            <span slot="footer" class="dialog-footer" >
                <el-button type="button" class="btn btn-default" data-dismiss="modal">关闭</el-button>
                <el-button type="primary" @click="subReply">确定</el-button>
            </span>
            </center>
          </div>
        </el-dialog>

        <div class="you_need_konw2" style="background-color: white;margin: 0px auto 0px;">
          <div style="margin-left: 2%;width: 97%">
            <p>&nbsp;</p>
            <span style="font-size: 16px;
	border-bottom: 3px solid #ffc900;"><i class="iconfont travel-iconpingjia" style="color: #ffc900" @click="changeEv(0)"></i>评价</span><br>
            <el-button class="iconfont travel-iconhaoping3"   style="margin-top: 2%;color: #EA8010"  @click="changeEv(1)">好评</el-button>
            <el-button class="iconfont travel-iconzhongping1"   style="margin-top: 2%;color: #0c9c6e"  @click="changeEv(2)">中评</el-button>
            <el-button class="iconfont travel-iconchapingtongzhi"   style="margin-top: 2%;color: #c12e2a"  @click="changeEv(3)">差评</el-button>
            <div class="" style="border: solid 1px #ddd;height: auto;margin-top: 2%" >
              <div class="row" >

                <div class="col-md-8">

                  <div class="row" style="margin-top: 2%;font-size: 13px;color: #cecece;margin-bottom: 2%" v-for="ev in evaluateList">
                    <div class="col-md-1"></div>
                    <div class="col-md-1">
                      <el-image style="border-radius:45%;width: 20px;height: 20px" src="static/images/icon_1.jpg"></el-image>
                    </div>
                    <div class="col-md-8">
                      <div class="row">
                        <div class="col-md-8"> {{ev.userName}}: {{ev.evaluateContent}}<i style="float: right" @click="toEvaluate(ev)"><img  src="@/assets/images/reply.png"></i>
                        </div>
                        <div class="col-md-3" v-if="ev.hotelLevel===1">
                          <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
                          <i style="float: left"><img  src="@/assets/images/start_off.png"></i>
                          <i style="float: left"><img  src="@/assets/images/start_off.png"></i>
                          <i style="float: left"><img  src="@/assets/images/start_off.png"></i>
                          <i style="float: left"><img  src="@/assets/images/start_off.png"></i>
                        </div>
                        <div class="col-md-3" v-else-if="ev.hotelLevel===2">
                          <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
                          <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
                          <i style="float: left"><img  src="@/assets/images/start_off.png"></i>
                          <i style="float: left"><img  src="@/assets/images/start_off.png"></i>
                          <i style="float: left"><img  src="@/assets/images/start_off.png"></i>
                        </div>
                        <div class="col-md-3" v-else-if="ev.hotelLevel===3">
                          <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
                          <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
                          <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
                          <i style="float: left"><img  src="@/assets/images/start_off.png"></i>
                          <i style="float: left"><img  src="@/assets/images/start_off.png"></i>
                        </div>
                        <div class="col-md-3" v-else-if="ev.hotelLevel===4">
                          <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
                          <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
                          <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
                          <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
                          <i style="float: left"><img  src="@/assets/images/start_off.png"></i>
                        </div>
                        <div class="col-md-3" v-else>
                          <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
                          <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
                          <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
                          <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
                          <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
                        </div>
                      </div>
                      <div class="row">
                        <div class="row" v-for="re in ev.eReplyList" v-show="isShow">{{re.userName}}:{{re.replyContent}}<i style="float: right" v-show="user.userId===re.replyUserId" @click="del(re.replyId)"><img  src="@/assets/images/shanchure.png"></i></div>
                      </div>
                      <div class="row" style="margin-top: 2%"><a style="color: #ffb611;font-size: 12px" @click="isShow = !isShow" v-if="ev.eReplyList.length>3">更多回复</a></div>

                    </div>
                  </div>

                </div>
              </div>
              <p>&nbsp;</p>
            </div>
            <div class="row">
              <div class="col-md-2"></div>
              <div class="col-md-4"></div>
              <div class="col-md-4">
                <div class="pageNum1">
                  <!--分页-->

                  <ul>
                    <li style="width: 80px">
                      <div class="row" style="margin-top: 2%;font-size: 10px;color: #cecece">共{{all}}页/{{totalCount}}条
                      </div>
                    </li>
                    <li style="font-size: 12px" class="threeword"><a href="">首页</a></li>
                    <li style="font-size: 12px" class="threeword" v-if="cur>1"><a v-on:click="cur--,pageClick()">上一页</a>
                    </li>
                    <li style="font-size: 12px" class="threeword" v-if="cur===1"><a class="banclick">上一页</a></li>
                    <li style="font-size: 12px" v-for="index in indexs" v-bind:class="{ 'header_active': cur === index}">
                      <a v-on:click="btnClick(index)">{{index}}</a>
                    </li>
                    <li style="font-size: 12px" class="threeword" v-if="cur!==all"><a
                      v-on:click="cur++,pageClick()">下一页</a></li>
                    <li style="font-size: 12px" class="threeword" v-if="cur === all"><a class="banclick">下一页</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <p>&nbsp;</p>
          </div>


        </div>
      </div>


    </div>
    <!-- 详情 end -->
    <div id="footer">
      <VFooter></VFooter>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import vueQr from 'vue-qr'
  import VFooter from "@/components/travel_up/common/Footer";
  import VHeader from '@/components/travel_up/common/Header'
  export default {
    name: "hotel",
    data(){
      return{
        isShow:false,
        type:'',
        bg:'url('+require('../../assets/images/5ff1cbaa8650f.jpg')+')',
        is_table:1,
        is_number:1,
        catalogVur:0,
        roomtype:false,
        count:1,
        hotel:[],
        evaluateList:[],
        hotelRoomList:[],
        hotelMessage:{
          hotelId:'',
          pageIndex:1,
          size:6,
          level:0,
        },
        dialogVisible: false,
        dialogVisible2:false,
        text: "",
        paySucc: false,
        order:{
          orderName:'',
          userId:'',
          lineHotelId:'',
          orderType:2,
          inDate:'',
          leaveDate:'',
          orderCount:'',
          orderSingelPrice:'',
          orderTotalPrice:'',
          orderStatus:0,
          roomId:'',
        },
        reply:{
          replyContent:'',
          replyUserId:'',
          evaluateId:'',
          hotelId:'',
        },
        all: 10, //总页数
        cur: 1,//当前页码
        totalPage: 0,//当前条数
        totalCount:124,
        user:[],
        room:[],
      }
    },
    components:{
      VHeader,
      VFooter,
      vueQr
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
    mounted: function() {
      this.hotelMessage.hotelId=this.$route.query.hotelId;
      this.order.lineHotelId=this.hotelMessage.hotelId;
      this.init();
    },
    methods:{
      del(replyId){
        if(confirm("确实要删除吗？")){
          var qs=require('querystring')
          let config={
            header:{'Content-type':'application/x-www-form-urlencoded'}
          };
          this.$axios.post("evaluates/del_reply?replyId="+replyId,config)
            .then(successResponse=>{
              if(successResponse.data==="noLogin"){
                alert("没有登录")
                this.$router.replace({path:'/adminLogin'})
              }
              else {
                alert("删除成功")
                this.$router.go(0)
              }
            })
            .catch(failResponse=>{
              alert("响应异常")
            })
        }else {
          alert("已经取消了删除操作");
        }
      },
      dataListFn: function(index){
        var qs=require('querystring')
        let config={
          header:{'Content-type':'application/x-www-form-urlencoded'}
        };
        this.hotelMessage.pageIndex=index;
        this.$axios.post("/evaluates/reply_save", qs.stringify(this.hotelMessage), config)
          .then(successReqponse => {
            this.evaluateList=[];
            this.evaluateList=successReqponse.data.evaluateList;
            this.all = data.pageCount;//总页数
            this.totalCount = data.total;
          })
          .catch(failRespose => {
            console.log("系统错误");
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
      toEvaluate(ev){
        this.reply.evaluateId=ev.evaluateId;
        if(this.user===null||this.user.userId===null||this.user.userId===''){
          alert("您还没有登录")
        }
        else{
          this.dialogVisible2=true;
         // this.room=room;
        }

      },
      init() {
        var qs = require('querystring')
        let config = {
          header: {'Content-type': 'application/x-www-form-urlencoded'}
        };
        this.$axios.post("/hotel/hotel_view",qs.stringify(this.hotelMessage),config)
          .then(successReqponse => {
            var data = successReqponse.data;
            if(data.message==='nologin'){
              this.$router.push('/error');
            }
            else {
              this.hotel = data.hotel;
              this.evaluateList=[];
              this.evaluateList = data.evaluateList;
              this.hotelRoomList=[];
              this.hotelRoomList=data.hotelRoomList;
              console.log( this.hotel);
              console.log( this.evaluateList);
              this.all = data.pageCount;//总页数
              this.totalCount = data.total;
              this.user=data.user;
            }
          })
          .catch(failRespose => {
            console.log("页面加载错误！正在重新载入...");
            //this.$router.replace("/leaderAdd");
          })
      },
      jdgueUser(room){
        var qs = require('querystring')
        let config = {
          header: {'Content-type': 'application/x-www-form-urlencoded'}
        };
        if(this.user===null||this.user.userId===undefined||this.user.userId===null||this.user.userId===''){
          alert("您还没有登录")
        }
        else {
          this.dialogVisible=true;
          this.room=room;
        }

      },
      subReply() {

        // var targetUrl = "http://localhost:8080/manager/product/save";
        var qs = require('querystring')
        let config = {
          header: {'Content-type': 'application/x-www-form-urlencoded'}
        };


        this.$axios.post("/evaluates/reply_save", qs.stringify(this.reply), config)
          .then(successReqponse => {
            alert("保存成功");
            init();
          })
          .catch(failRespose => {
            console.log("系统错误");
          })


      },
      changeEv(num){
        this.hotelMessage.level=num;
        var qs = require('querystring')
        let config = {
          header: {'Content-type': 'application/x-www-form-urlencoded'}
        };

        this.$axios.post("/evaluates/reply_save", qs.stringify(this.hotelMessage), config)
          .then(successReqponse => {
           this.evaluateList=[];
           this.evaluateList=successReqponse.data.evaluateList;
            this.all = data.pageCount;//总页数
            this.totalCount = data.total;
          })
          .catch(failRespose => {
            console.log("系统错误");
          })
      },
      sub(){
        let _this = this;
        _this.paySucc = false;
        _this.dialogVisible = true;
        var qs = require('querystring')
        let config = {
          header: {'Content-type': 'application/x-www-form-urlencoded'}
        };
        _this.order.orderCount=_this.count;
        _this.order.userId=_this.user.userId;
        _this.order.orderName=_this.hotel.hotelName;
        _this.order.roomId=_this.room.roomId;
        _this.order.orderSingelPrice=_this.room.hotelRoomPrice;
        _this.order.orderTotalPrice=_this.count*_this.count*_this.room.hotelRoomPrice;
        _this.$axios.post("/order/save",qs.stringify(_this.order),config)
          .then(successReqponse => {
            var data = successReqponse.data;
            if(data.message==='OK'){
              _this.$router.push({path:'/order',query:{orders:data.orders}});
            }
            else {
              alert("数据加载异常")

            }
          })
          .catch(failRespose => {
            console.log(failRespose);
            //this.$router.replace("/leaderAdd");
          })
      },
      changeCount(num){
        this.count=num;
        this.roomtype=false;
      },
      toStrategy(){
        this.isActive=2;
        document.querySelector("#room").scrollIntoView(true)
      },
      changeTable(num){
        this.is_table=num;
      },
      changeNumber(num){
        this.is_number=num;
      },

    },
  }


</script>

<style lang="less">
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

  .active {
    color: #ffb611!important;
  }
  .modal {
    width: 1000px;
    top: 50%;
    left: 50%;
    margin-toP: -250px;
    margin-left: -400px;
    border: 1px solid #666;

  .header {
    height: 60px;
    line-height: 60px;
    text-align: center;
    background: #666;
    border-bottom: 1px solid #000;
    box-sizing: border-box;
  }

  .content {
    background: orange;
    height: 290px;

  }

  .footer {
    height: 50px;
    line-height: 50px;

  button {
    vertical-align: middle;
    display: inline-block;
    width: 80px;
    height: 40px;
    line-height: 40px;
    color: #fff;

  &
  .danger {
    background: red;


  }

  &
  .default {
    background: #ddd;
  }

  }

  }
  }
  .info_feature{ padding-top: 14px;}
  .info_feature .target_txt{
    background-color: #EAA24E;
  }
  .info_attr_txt{ float: left; min-width:60px; margin-right: 32px; color:#343434; font-weight: 600;}
  .target_txt{ display: inline-block; padding:2px 8px; font-size: 12px; background-color: #EAA24E; color: #fff;border-radius:10px; position: relative;}
  .target_txt3{ display: inline-block; padding:2px 8px; font-size: 12px; background-color: #b9ea43; color: #fff;border-radius:10px; position: relative;}
  .target_txt2{ display: inline-block; padding:2px 8px; font-size: 12px; color: #ea3330;border-radius:10px; position: relative;}
  div {
    font-size: 16px;
  }
  .triangle {
    width: 0;
    height: 0;
    overflow: hidden;
    border-top: 10px solid transparent;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid #E6E6E6;
    position: absolute;
    top: -20px;
    left: 50px
  }
  input {
    width: 177px;
    height: 33px;
    border-radius: 3px;
    padding-left: 16px;
    color: #666;
    outline-style: none;
    border: 1px solid #ccc;
  }
  .pantal {
    position: absolute;
    width: 30%;
    background-color: rgb(246, 232, 191);
    box-shadow: 0px 0px 5px #a2a2a2;
    z-index: 1000;
    margin-top: 16px
  }
  .header {
    /* background: #eee; */
    display: flex;
    justify-content: space-between;
    /* height: 0.3rem; */
  }
  .header > span {
    float: left;
    width: 200px;
    padding: 0 10px;
    font-size: 15px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;

  }
  .isdisabeld {
    /* background-color: #ccc;
     */
    color: rgb(210, 172, 149);
  }
  .iscancheck {
    color: #ff335c;
  }
  .content {
    display: inline-block;
    margin: 0 auto;
    /* border: 1px solid pink; */
    box-sizing: border-box;
  }
  .content > div {
    text-align: end;
  }
  .isToday {
    /* color: #999999; */
  }
  .newspan {
    display: inline-block;
    width: 55px;
    height: 85px;
    line-height: 85px;
    vertical-align: middle;
  }
  .content-item {
    /* position: relative; */
    height: 50px;
    /* line-height: 20px; */
  }
  .content-info {
    /* position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
      width: 60px;
      height: 60px; */
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  }
  .content-info p {
    width: 95px;
    height: 20px;
    margin: 0;
    font-size: 15px;
    line-height: 20px;
    text-align: center;
  }
  .checkGray {
    color: #666666;
    opacity: 0.4;
  }
  .active {
    background-color: rgba(24, 144, 255, 0.3);
    color: rgb(24, 144, 255);
    /* background-color:#666; */
    color: #ff335c;
    font-weight: 600;
  }
  .travel_time{
    height: 50px;background-color: #00a0e9;color: white
  }
  .travel_time2{
    height: 50px;background-color: white;color: black;
  }

  .slide-fade-enter-active {
    transition: all .3s ease;
  }

  .slide-fade-leave-active {
    transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */
  {
    transform: translateY(-10px);
    opacity: 0;
  }

</style>
