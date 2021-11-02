<template>
  <div id="app">
    <vHeader></vHeader>

    <el-container style="height: 100vh; border: 1px solid #eee">

      <NavMenu></NavMenu>

      <el-container >

        <el-header style="text-align: center; font-size: 12px">

          <span style="font-size: 17px">充值</span>

        </el-header>
        <el-dialog title="查看充值记录" :visible.sync="RecordVisible" width="50%" center>
          <!-- 生成二维码图片 -->
          <table class="table table-bordered">
            <thead>
            <tr>
              <th>账户名</th>
              <th>支付宝订单编号</th>
              <th>金额</th>
              <th>支付时间</th>
            </tr>
            </thead>
            <tbody  v-for="(money,index) in moneyList">
            <tr>
              <td style="padding-left: 20px;max-width: 200px;">{{money.userAccount}}</td>
              <td style="padding-left: 20px;max-width: 200px;">{{money.orderId}}</td>
              <td style="padding-left: 20px;max-width: 200px;">{{money.amount}}</td>
              <td style="padding-left: 20px;max-width: 200px;">{{money.createTime}}</td>
            </tr>
            </tbody>


          </table>

        </el-dialog>
        <el-main>

          <el-card class="box-card">
            <ul class="msg-box">

              <li>
                <div style="text-align: right; margin-top: 30px">
                  <el-button type="primary" @click="see">查看充值记录</el-button>
                </div>
                <h3 style="margin-bottom: 15px">账户余额:{{user.userAmount}}</h3>
                <h4 style="margin-bottom: 15px">充值金额</h4>
                <el-radio-group v-model="amountVal" @change="amountChange">
                  <el-radio border :label="'' + 1000">充值1000</el-radio>
                  <el-radio border :label="'' + 2000">充值2000</el-radio>
                  <el-radio border :label="'' + 3000">充值3000</el-radio>
                  <el-radio border :label="'' + 5000">充值5000</el-radio>
                  <el-radio border :label="'' + 10000">充值10000</el-radio>
                  <el-radio border :label="''">自定义</el-radio>
                </el-radio-group>
              </li>

              <li>
                <h4 style="margin-bottom: 15px">充值方式</h4>
                <el-radio-group v-model="rechargeParams.paymentType" >
                  <el-radio border :label="'' + 0">支付宝</el-radio>
                </el-radio-group>
              </li>

              <li>
                <h4 style="margin-bottom: 15px">充值金额</h4>
                <!-- <img src="{:url('qrcode',['text'=>$text])}" /> -->
                <el-input
                  :disabled="disabled"
                  clearable
                  v-model="rechargeParams.totalAmt"
                  placeholder="请输入金额"
                  style="width: 150px"
                ></el-input>
              </li>
            </ul>
            <div style="text-align: center; margin-top: 30px">
              <el-button type="primary" @click="pay">确认支付</el-button>
            </div>
          </el-card>

        </el-main>
        <el-dialog :title="paySucc?'支付成功':'扫码支付'" :visible.sync="dialogVisible" width="30%" center>
          <!-- 生成二维码图片 -->
          <vueQr :text="text" :size="200" v-if="!paySucc" style="margin-left: 30%"></vueQr>
          <!-- 使用websocket监控是否扫描，扫描成功显示成功并退出界面 -->

          <span  style="position: relative;font-size: 100px;color:#42B983;margin-left: 50px;top: -100px;" v-else><img style="height: 100px;
    vertical-align: middle;
    margin-left: 150px;" src="@/assets/images/支付成功.png"></span>

        </el-dialog>
      </el-container>

    </el-container>
    <div id="footer">
      <VFooter></VFooter>
    </div>
  </div>
</template>

<script>
  import Header from "../common/Header";
  import NavMenu from "../common/NavMenu";
  import VFooter from "@/components/travel_up/common/Footer";
  import vueQr from 'vue-qr';
  export default {
    name: 'user_update',
    components: {
      NavMenu,
      VFooter,
      'vHeader': Header,
      vueQr
    },
    data() {

      /*this.$axios.get(`student/getAll`).then(res => {
        if (res.data.code == 200) {
          this.tableData = res.data.data
        }
      })*/
      return {
        moneyList:[],
        RecordVisible:false,
        dialogVisible: false,
        text: "",
        paySucc: false,
        amountVal: "",
        disabled: false,
        //充值参数
        rechargeParams: {
          totalAmt: "", //金额
          paymentType: "0", //支付方式[0:微信,1:支付宝,2:余额,3:活动]
          // transType: "0", //交易类型[0:充值,1:消费]
        },
        code: "",
        userInfo: {
          avatar: 'https://gss0.bdstatic.com/-4o3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike92%2C5%2C5%2C92%2C30/sign=62d46c39067b020818c437b303b099b6/d4628535e5dde7119c3d076aabefce1b9c1661ba.jpg'
        },
        userId:'',
        userPasswordAgain:'',
        userForm:[],
        user:[],
        orderId:'',
        codeTime:120,
        identifyCode: '',
        checkCode:'',
        codeText:'获取验证码',
        disabledCodeBtn: true,
        passwordType: 'password'
      }
    },
    created() {
    },
    mounted:function(){
      this.userId=this.$route.query.userId;
      this.init();
    },
    methods: {
      init(){
        var qs = require('querystring')
        let config = {
          header: {'Content-type': 'application/x-www-form-urlencoded'}
        };
        this.$axios.get("/user/getuser?userId="+this.userId)
          .then(successReqponse => {
            var data = successReqponse.data;
            this.user=data.user;
          })
          .catch(failRespose => {
            console.log("页面加载错误！正在重新载入...");
            //this.$router.replace("/leaderAdd");
          })
      },
      see(){
        this.$axios.get("/user/getRecord?userId="+this.userId)
          .then(successReqponse => {
            var data = successReqponse.data;
            this.moneyList=data.moneyList;
            this.RecordVisible=true;
          })
          .catch(failRespose => {
            console.log("页面加载错误！正在重新载入...");
            //this.$router.replace("/leaderAdd");
          })
      },

      pay() {
        let _this = this;
        _this.paySucc = false;
        _this.dialogVisible = true;
        var qs = require('querystring');
        let config = {
          header: {'Content-type': 'application/x-www-form-urlencoded'}
        };
        var data={amount:this.rechargeParams.totalAmt,product:"猪猪旅行社充值"};
        console.log(data);
        this.$axios.post("order/createQR",qs.stringify(data),config)
          .then((response) => {
            _this.text = response.data.code;
            _this.orderId=response.data.orderId;
            _this.dialogVisible = true;
            //使用webSocket发送请求，下面会简单介绍websocket使用
            if ("WebSocket" in window) {
              // 打开一个 web socket
              var ws = new WebSocket("ws://127.0.0.1:8080/bindingRecord");

              ws.onopen = function() {
                // Web Socket 已连接上，使用 send() 方法发送数据
                // ws.send("data");
                // alert("数据发送中...");
              };

              ws.onmessage = function(evt) {
                var received_msg = evt.data;
                // alert("数据已接收..." + evt.data);
                if (Boolean(evt.data)) {
                  _this.paySucc = true;
                 // alert( _this.rechargeParams.totalAmt);
                  var data1={amount: _this.rechargeParams.totalAmt,orderId: _this.orderId};
                  _this.$axios.post("/user/updateAmountOrder",qs.stringify(data1),config)
                    .then(successReqponse => {
                      var data = successReqponse.data;
                      console.log(data);
                      if(data==='OK'){
                        _this.init();
                      }
                    })
                    .catch(failRespose => {

                      console.log("页面加载错误！正在重新载入...");
                      //this.$router.replace("/leaderAdd");
                    })
                  setTimeout(() => {

                    _this.dialogVisible = false;
                  }, 3 * 1000);
                }
                ws.close();

              };

              ws.onclose = function() {
                // // 关闭 websocket
                console.log("连接已关闭...");
              };
            } else {
              // 浏览器不支持 WebSocket
              alert("您的浏览器不支持 WebSocket!");
            }
          }).catch((err) => {
          console.log(err)
        })
      },
      amountChange(val) {
        this.rechargeParams.totalAmt = val;
        if (val == "") {
          this.disabled = false;
        } else {
          this.disabled = true;
        }
      },

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
  .item_bock {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height:94px;
    width: 300px;
    padding:0px 24px 0px 38px;
    border-bottom: 1px solid #f7f7f7;
    background: #fff;
  }
  .head_p {
    height:132px;
  }
  .head_img{
    height: 90px;
  }
  .head_img img{
    width:90px;
    height:90px;
    border-radius:50px
  }
  .setting_right{
    display: flex;
    height: 37px;
    justify-content: flex-end;
    align-items: center;
  }
  .hiddenInput{
    display: none;
  }
  .caption {
    color: #8F8F8F;
    font-size: 26px;
    height: 37px;
  }
</style>
