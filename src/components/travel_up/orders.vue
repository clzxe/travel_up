<template>
  <div>
    <order_header></order_header>
    <div :style="{background:bg}">
      <div  class="contant" style="background-color: white;margin: 20px auto 0px;">
        <div class="list clearfix">
          <section id="gouwuche">

            <table class="table table-hover">
              <thead>
              <tr>
                <th>商品信息</th>
                <th>商品名称</th>
                <th>单价</th>
                <th>数量</th>
                <th>金额</th>
              </tr>
              </thead>
              <tbody>
              <tr style="height:50px;"></tr>
              <tr v-for="(date,index) in orders" :class="{bgcolor:isActive}">
                <td>
                  <img style="float: left" :src="date.orderImg"/>
                </td>
                <td> {{date.orderName}}</td>
                <td>
                  <p><b class="danjia">{{date.orderSingelPrice}}</b></p>
                </td>
                <td>
                  <p><b class="danjia">{{date.orderCount}}</b></p>
                </td>
                <td>
                  <p><b class="jiner">{{date.orderTotalPrice}}.00</b></p>
                </td>
              </tr>
              </tbody>
            </table>

            <div class="box">
              <div class="boxa">
              </div>
              <div class="boxc">
                <p>合计：<b class="jiner">{{getSum()}}</b></p>
              </div>
              <div class="boxb" >
                <el-button @click="pay">结算</el-button>
              </div>
            </div>
          </section>
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
    name: "orders",
    components:{
      VFooter,
      'order_header':order_header,
    },
    data(){
      return{
        bg:'url('+require('../../assets/images/5ff1cbaa8650f.jpg')+')',
        isActive:1,
        all: 10, //总页数
        cur: 1,//当前页码
        totalPage: 0,//当前条数
        totalCount:124,
        scenic:[],
        strategyList:[],
        ImageList:[],
        scenicMessage:{
          scenicId:'',
          pageIndex:1,
          size:16
        },
        orders:[],
        noticeId:'',
        totalPrice:'',
      }
    },
    mounted:function () {
      this.orders=this.$route.query.orders;
      console.log(this.orders);

      // this.init();
    },
    methods:{
      getSum:function(){
        var sum = 0;
        for(var i in this.orders){
          sum += this.orders[i].orderTotalPrice ;
        }
        this.totalPrice=sum;
        return sum;
      },
      init() {
        var qs = require('querystring')
        let config = {
          header: {'Content-type': 'application/x-www-form-urlencoded'}
        };
        this.orders=JSON.parse(sessionStorage.getItem("orders"));
        console.log(this.orders)
      },
      pay(){
        var qs = require('querystring')
        let config = {
          header: {'Content-type': 'application/x-www-form-urlencoded'}
        };
        var data={orders:this.orders,status:1};
        this.$axios.get("user/get_user")
          .then(successReqponse => {
            var data = successReqponse.data;
            if(data.user.userAmount<this.totalPrice){
              alert("账户余额不足,请充值")
              this.$router.push({path:'/user_money',query:{userId:data.user.userId}});//返回上一层
            }
            else {
              console.log("test1");
              console.log("test2");
              var data1=[];
              for(var i in this.orders){
                data1.push(this.orders[i].orderId);
              }
             // console.log(data1);
              var data={orderId:data1,amount:this.totalPrice};
              this.$axios.post("/order/pay2",qs.stringify(data),config)
                .then(successReqponse => {
                  var data = successReqponse.data;
                  if(data.message==='OK'){
                    alert('支付成功')
                   this.$router.go(-1);//返回上一层
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

        // this.$router.go(-1);//返回上一层
      },
      back(){
        var qs = require('querystring')
        let config = {
          header: {'Content-type': 'application/x-www-form-urlencoded'}
        };
        var data={orderId:this.orders.orderId,status:3};
        this.$axios.post("/order/change_status",qs.stringify(data),config)
          .then(successReqponse => {
            var data = successReqponse.data;
           if(data.message==='OK'){
             this.$router.go(-1);//返回上一层
           }
          })
          .catch(failRespose => {
            console.log("页面加载错误！正在重新载入...");
            //this.$router.replace("/leaderAdd");
          })
       // this.$router.go(-1);//返回上一层
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
