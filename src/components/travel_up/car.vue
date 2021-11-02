<template>
    <div >
      <order_header></order_header>
     <div :style="{background:bg}">
       <div  class="contant" style="background-color: white;margin: 20px auto 0px;">
         <div class="list clearfix">
           <section id="gouwuche">

             <table class="table table-hover">
               <thead>
               <tr>
                 <th>
                   <input type="checkbox" @change="handlechange" v-model="isAllChange" @click='inshow()'/>
                   全选
                 </th>
                 <th>商品名称</th>
                 <th>单价</th>
                 <th>人数</th>
                 <th>房间价格</th>
                 <th>数量</th>
                 <th>门票</th>
                 <th>金额</th>
                 <th>操作</th>
               </tr>
               </thead>
               <tbody>
               <tr style="height:50px;"></tr>
               <tr v-for="(date,index) in arr" :class="{bgcolor:isActive}">
                 <td>
                   <input type="checkbox" v-model="checkgroup" :value="date" style="float: left" @change="handleLiChange" />
                   <img style="float: left" :src="date.linePhoto"/>

                 </td>
                 <td> {{date.lineName}}</td>
                 <td>
                   <p><b class="danjia">{{date.scSingelPrice}}</b></p>
                 </td>
                 <td>
                   <button @click="handleDelclike(date)" >-</button>
                   <input type="text" :value="date.scCount"/>
                   <button @click="handleAddclike(date)">+</button>
                 </td>
                 <td>
                   <p><b class="danjia">{{date.roomPrice}}</b></p>
                 </td>
                 <td>
                   <button @click="handleDelclike2(date)" >-</button>
                   <input type="text" :value="date.roomCount"/>
                   <button @click="handleAddclike2(date)">+</button>
                 </td>
                 <td>
                  <el-button style="color: #ffb611;border: #ffb611 1px solid" @click="diffToMoney(date)" v-if="date.isIncloudScenic===1">门票费用：{{date.scenicPrice}}（已包含）</el-button>
                   <el-button style="color: #ffb611;border: #ffb611 1px solid" v-else @click="addToMoney(date)">门票费用：{{date.scenicPrice}}（未包含）</el-button>
                 </td>
                 <td>
                   <p><b class="jiner">{{getSumje(date)}}.00</b></p>
                 </td>
                 <td>
                   <a href="#" @click="rmove(index)">删除</a>
                 </td>
               </tr>
               </tbody>
             </table>

             <div class="box">
               <div class="boxa">
                 <input type="checkbox" @change="handlechange"  v-model="isAllChange" @click='inshow()'/>
                 <a href="#" >全选</a>
                 <a href="#" >删除</a>
               </div>
               <div class="boxc">
                 <p>已选商品：<b class="jiner">{{checkgroup.length}}</b></p>
                 <p>合计：<b class="jiner">{{getSum()}}</b></p>
               </div>
               <div class="boxb" >
                 <el-button @click="pay">结算</el-button>
               </div>
             </div>
           </section>
         </div>
         <div class="pageNum" style="margin-left: 20%;">
           <!--分页-->

           <ul>
             <li><a href="">首页</a></li>
             <li class="threeword" v-if="cur>1"><a v-on:click="cur--,pageClick()">上一页</a></li>
             <li class="threeword" v-if="cur===1"><a class="banclick">上一页</a></li>
             <li v-for="index in indexs" v-bind:class="{ 'active': cur === index}">
               <a v-on:click="btnClick(index)">{{index}}</a>
             </li>
             <li class="threeword" v-if="cur!==all"><a v-on:click="cur++,pageClick()">下一页</a></li>
             <li class="threeword" v-if="cur === all"><a class="banclick">下一页</a></li>
             <li class="threeword"><a >共<i>{{all}}</i>页</a></li>
           </ul>
         </div>
         <p>&nbsp;</p>
       </div>
     </div>
      <div id="footer">
        <VFooter></VFooter>
      </div>
    </div>
</template>

<script>
  import VFooter from "@/components/travel_up/common/Footer";
  import order_header from "@/components/travel_up/common/order_header";
    export default {
        name: "car",
      data(){
          return{
            bg:'url('+require('../../assets/images/5ff1cbaa8650f.jpg')+')',
            all: 10, //总页数
            cur: 1,//当前页码
            totalPage: 124,//当前条数
            checkgroup:[],
            isAllChange:false,
            isActive:false,
            shoppingCartList:[],
            carMessage:{
              userId:'',
              pageIndex:1,
              size:10
            },
            orders:[],
            user:[],
            order:{
              orderId:'',
              orderName:'',
              userId:'',
              lineOrHotelId:'',
              roomCount:'',
              roomId:'',
              hotelId:'',
              inDate:'',
              leaveDate:'',
              totaltime:'',
              orderType:1,
              orderCount:'',
              orderSingelPrice:'',
              orderTotalPrice:'',
              orderStatus:0,
              orderImg:'',
              scId:'',
            },
            arr:[]
          }
      },
      components:{
        VFooter,
        'order_header':order_header
      },
      mounted: function() {
        this.initUser();



      },
      methods:{
        initUser(){
          this.$axios.get("user/get_user")
            .then(response => {
              // alert(data.flag);
              this.user=response.data.user;
              if(this.user===null||this.user.userId===undefined){
                var url=this.$router.resolve('login');
                window.open(url.href)
              }
              else {
                this.order.userId=this.user.userId;
                this.carMessage.userId=this.user.userId;
                this.init();
              }
            })
            .catch(failResponse => {
              alert("响应异常")
            })
        },
        init() {
          var qs = require('querystring')
          let config = {
            header: {'Content-type': 'application/x-www-form-urlencoded'}
          };
          this.carMessage.pageIndex=1;
          this.$axios.post("/car/list",qs.stringify(this.carMessage),config)
            .then(successReqponse => {
              var data = successReqponse.data;
             // this.strategy = data.strategy;
              this.arr=[];
              this.arr = data.shoppingCartList;
              this.all = data.pageCount;//总页数
              this.totalCount = data.total;
            })
            .catch(failRespose => {
              console.log("页面加载错误！正在重新载入...");
              //this.$router.replace("/leaderAdd");
            })
        },
        pay:async function(){
          let _this = this;
          _this.paySucc = false;
          _this.dialogVisible = true;
          var qs = require('querystring')
          let config = {
            header: {'Content-type': 'application/x-www-form-urlencoded'}
          };
          console.log(this.checkgroup);
          var i=0;
          var x=1;
          var orders=[];
          for(i=0;i< this.checkgroup.length;i++ ){
            console.log('i:'+i);
            _this.order.lineOrHotelId=_this.checkgroup[i].lineGroupId;
            console.log(_this.checkgroup[i].lineGroupId)
            _this.order.orderName=_this.checkgroup[i].lineName;
            _this.order.roomId=_this.checkgroup[i].roomId;
            _this.order.roomCount=_this.checkgroup[i].roomCount;
            _this.order.inDate=_this.checkgroup[i].lineStartTime;
            _this.order.totaltime=_this.checkgroup[i].lineTotalTime;
            _this.order.orderTotalPrice=_this.checkgroup[i].scCount*_this.checkgroup[i].scSingelPrice+_this.checkgroup[i].roomCount*_this.checkgroup[i].roomPrice;
            _this.order.scId=_this.checkgroup[i].scId;
            _this.order.hotelId=_this.checkgroup[i].hotelId;
            _this.order.orderSingelPrice=_this.checkgroup[i].scSingelPrice;
            _this.order.orderCount=_this.checkgroup[i].scCount;

            _this.order.orderImg=_this.checkgroup[i].linePhoto;
          //  _this.orders.push(_this.order);
            console.log(_this.order);
            console.log("金额:"+_this.checkgroup[i].scCount*_this.checkgroup[i].scSingelPrice)
           await _this.$axios.post("/order/save_car",qs.stringify(_this.order),config)
              .then(successReqponse => {
                var data = successReqponse.data;
                if(data.message==='OK'){
                  alert('i:'+i)
                  _this.order.orderId=data.orders.orderId;
                  orders.push(data.orders);

                }
                else {
                  alert("数据加载异常")

                }
              })
              .catch(failRespose => {
                console.log(failRespose);
                //this.$router.replace("/leaderAdd");
              })

          }

          console.log('x:'+x)
          console.log('length'+_this.checkgroup.length)

          console.log('111',orders);
          if(i>=_this.checkgroup.length){
            console.log(orders);

            console.log('222',JSON.stringify(orders));
            sessionStorage.setItem("orders",JSON.stringify(orders))
            console.log('33',JSON.parse(sessionStorage.getItem("orders")));
            _this.$router.push({path:"/orders",query:{orders:orders}});
          }


        },


        dataListFn: function(index){
          var qs = require('querystring')
          let config = {
            header: {'Content-type': 'application/x-www-form-urlencoded'}
          };
          this.carMessage.pageIndex=index;
          this.$axios.post("/car/list",qs.stringify(this.carMessage),config)
            .then(successReqponse => {
              var data = successReqponse.data;
              // this.strategy = data.strategy;
              this.arr=[];
              this.arr = data.shoppingCartList;
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
        inshow:function(){
          this.isActive = !this.isActive;
        },

        //总额
        getSum:function(){
          var sum = 0;
          for(var i in this.checkgroup){
            sum += this.checkgroup[i].scCount * this.checkgroup[i].scSingelPrice+this.checkgroup[i].roomCount * this.checkgroup[i].roomPrice;
            if(this.checkgroup[i].isIncludeScenic===1){
              sum=sum+this.checkgroup[i].scCount * this.checkgroup[i].scenicPrice;
            }
          }
          return sum;
        },

        //单品总额
        getSumje:function(date){
          var sum = date.scSingelPrice;
          sum=date.scSingelPrice*date.scCount+date.roomCount* date.roomPrice;
          if (date.isIncludeScenic===1){
            sum=sum+date.scenicPrice*date.scCount;
          }
          return sum;
        },
        addToMoney(data){
          data.isIncludeScenic= 1;
          this.$axios.post("/car/update",qs.stringify(data),config)
            .then(successReqponse => {
              var dataa = successReqponse.data;
              if(dataa.message==='OK'){


              }
              else {
                alert(dataa.message)
              }
            })
            .catch(failRespose => {
              console.log("页面加载错误！正在重新载入...");
              //this.$router.replace("/leaderAdd");
            })
        },
        diffToMoney(data){
          data.isIncludeScenic= 0;
          this.$axios.post("/car/update",qs.stringify(data),config)
            .then(successReqponse => {
              var dataa = successReqponse.data;
              if(dataa.message==='OK'){


              }
              else {
                alert(dataa.message)
              }
            })
            .catch(failRespose => {
              console.log("页面加载错误！正在重新载入...");
              //this.$router.replace("/leaderAdd");
            })
        },
        //判断全选框
        handlechange:function(){
          if(this.isAllChange){
            this.checkgroup = this.arr;
          }else{
            this.checkgroup = [];
          }
        },

        //判断全选框
        handleLiChange:function(){
          if(this.checkgroup.length !== this.arr.length){
            this.isAllChange = false;
          }else{
            this.isAllChange = true;
          }
        },
        handleAddclike:function(data){

          var qs = require('querystring')
          let config = {
            header: {'Content-type': 'application/x-www-form-urlencoded'}
          };
          var lineGroup;
          console.log(data.lineGroupId)
          this.$axios.get("/line_group/getline_group?line_groupId="+data.lineGroupId)
            .then(successReqponse => {
              var data1 = successReqponse.data;
              var lineGroup=data1.line_group;
              console.log(lineGroup)
              var numbers = data.scCount;
              if(lineGroup.linePeople===numbers){


              }
              else {
                data.scCount++;
                data.roomCount= parseInt((data.scCount+1)/2);
                this.$axios.post("/car/update",qs.stringify(data),config)
                  .then(successReqponse => {
                    var dataa = successReqponse.data;
                    if(dataa.message==='OK'){


                    }
                    else {
                      alert(dataa.message)
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
            });

        },
        //数量减1
        handleDelclike:function(date){
          var numbers = date.scCount;
          if(numbers === 1){
            date.scCount = 1;
          }
          else {
            date.scCount--;
            date.roomCount= parseInt((data.scCount+1)/2);
          }
          var qs = require('querystring')
          let config = {
            header: {'Content-type': 'application/x-www-form-urlencoded'}
          };
          this.$axios.post("/collect/update",qs.stringify(date),config)
            .then(successReqponse => {
              var data = successReqponse.data;
              if(data.message==='OK'){

              }
              else {
                alert(data.message)
              }
            })
            .catch(failRespose => {
              console.log("页面加载错误！正在重新载入...");
              //this.$router.replace("/leaderAdd");
            })

        },
        handleAddclike2:function(data){

          var qs = require('querystring')
          let config = {
            header: {'Content-type': 'application/x-www-form-urlencoded'}
          };
          var lineGroup;
          console.log(data.lineGroupId)
          this.$axios.get("/line_group/getline_group?line_groupId="+data.lineGroupId)
            .then(successReqponse => {
              var data1 = successReqponse.data;
              lineGroup=data1.line_group;
              console.log(lineGroup)
              var numbers = data.scCount;
              if(data.roomCount>=data.scCount){

              }
              else {
                data.roomCount++;
                this.$axios.post("/car/update",qs.stringify(data),config)
                  .then(successReqponse => {
                    var dataa = successReqponse.data;
                    if(dataa.message==='OK'){

                    }
                    else {
                      alert(dataa.message)
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
            });

        },
        //数量减1
        handleDelclike2:function(date){
          var numbers = date.scCount;
          if(date.roomCount<=1||date.roomCount<=(date.scCount+1)/2){

          }
          else {
            var qs = require('querystring')
            let config = {
              header: {'Content-type': 'application/x-www-form-urlencoded'}
            };
            date.roomCount--;
            this.$axios.post("/collect/update",qs.stringify(date),config)
              .then(successReqponse => {
                var data = successReqponse.data;
                if(data.message==='OK'){

                }
                else {
                  alert(data.message)
                }
              })
              .catch(failRespose => {
                console.log("页面加载错误！正在重新载入...");
                //this.$router.replace("/leaderAdd");
              })
          }


        },

        //删除
        rmove:function(index){
          var that = this;
          this.$axios.post("/car/del?scId="+ that.arr[index].scId,config)
            .then(successReqponse => {
              var data = successReqponse.data;
              if(data.message==='OK'){

              }
              else {
                alert(data.message)
              }
            })
            .catch(failRespose => {
              console.log("页面加载错误！正在重新载入...");
              //this.$router.replace("/leaderAdd");
            })
          that.arr.splice(index,1);
          that.checkgroup.splice(index,1);


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
</script>

<style scoped>
  #gouwuche {
    width: 1200px;
    height:auto ;
    margin: 0 auto;
  }

  .box {
    width: 1200px;
    height: 50px;
    margin: 30px auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #C4E3F3;
  }

  .boxa {
    width: 780px;
    height: 50px;
  }

  .boxa a {
    margin-right: 50px;
  }

  .boxb {
    width: 120px;
    height: 50px;
    background-color: #ff722c;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 18px;
  }

  .boxc {
    width: 300px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  input {
    width: 50px;
    text-align: center;
  }

  img {
    width: 60px;
    height: 60px;
  }

  a {
    text-decoration: none;
    color: #000;
  }

  * {
    font-size: 12px;
  }

  p {
    margin: 0;
    padding: 0;
    line-height: 1.9;
  }

  .danjia {
    font-size: 16px;
  }

  .jiner {
    font-size: 18px;
    color: #FF8C00;
  }
  .bgcolor{
    background-color: rgba(205,205,205,0.2);

  }

</style>
