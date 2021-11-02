<template>
  <div>
    <VHeader :currentHeader="1"></VHeader>
    <div :style="{background:bg}">
      <div style="background-color: white;width: 85%;margin-left: 7%">
        <p>&nbsp;</p>

        <el-header style="background: rgba(250,255,251,0.96);padding-left: 10%;margin-top: 2%">
          <h1 style="font-size: 35px;color: grey">订单支付</h1>
        </el-header>
        <el-main id="information">
          <div style="border-radius: 30px;background-color: white " >
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <div class="row" >
              <div class="col-md-2"></div>
              <div class="col-md-3" >
                <img  :src="orders.orderImg"  style="width: 100px;height: 100px"/>
              </div>

              <div class="col-md-4" >
                <div class="row" style="height: 40px;margin-top: 6%">{{orders.orderName}}</div>
                <div class="row" style="color: #b4b4b4">{{orders.creatTime}}</div>
              </div>

              <div class="col-md-3" >
                <div class="row" style="height: 40px;margin-top: 8%">￥{{orders.orderSingelPrice}}</div>
                <div class="row" style="color: #b4b4b4">x{{orders.orderCount}}</div>
              </div>
              <div class="col-md-1"></div>
            </div>

            <div class="row" style="margin-top: 2%">
              <div class="col-md-2"></div>
              <div class="col-md-3" >
                <div class="row" style="height: 40px;"><span style="color: #EA8010">
                      <span >待付款</span>
                    </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;总价: ￥{{orders.orderTotalPrice}}</div>
              </div>

              <div class="col-md-3" >
              </div>

              <div class="col-md-4" >
                <div class="row" >
                  <el-button  style="color: #EA8010;border: #EA8010 1px solid" @click="pay(orders)">确认支付</el-button>
                  <el-button  style="color: #8cccfa;border: #8cccfa 1px solid" @click="back">取消</el-button>

                </div>

              </div>
              <div class="col-md-1"></div>
            </div>
            <p>&nbsp;</p>
          </div>
        </el-main>

      </div>
    </div>
    <div id="footer">
      <VFooter></VFooter>
    </div>
  </div>
</template>

<script>
  import VFooter from "@/components/travel_up/common/Footer";
  import VHeader from '@/components/travel_up/common/Header';
  export default {
    name: "orders",
    components:{
      VFooter,
      VHeader
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
      }
    },
    mounted:function () {
      this.orders=this.$route.query.orders;
     // this.init();
    },
    methods:{
      init() {
        var qs = require('querystring')
        let config = {
          header: {'Content-type': 'application/x-www-form-urlencoded'}
        };
        this.$axios.get("/notice/getnotice?noticeId="+this.noticeId)
          .then(successReqponse => {
            var data = successReqponse.data;
            this.notice = data.notice;
          })
          .catch(failRespose => {
            console.log("页面加载错误！正在重新载入...");
            //this.$router.replace("/leaderAdd");
          })
      },
      pay(orders){
        var qs = require('querystring')
        let config = {
          header: {'Content-type': 'application/x-www-form-urlencoded'}
        };
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

</style>
