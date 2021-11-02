<template>
  <div>
    <!-- 支付按钮，模拟支付操作 -->
    <button type="primary" @click="pay">支付</button>

    <el-dialog :title="paySucc?'支付成功':'扫码支付'" :visible.sync="dialogVisible" width="50%" center>
      <!-- 生成二维码图片 -->
      <vueQr :text="text" :size="200" v-if="!paySucc"></vueQr>
      <!-- 使用websocket监控是否扫描，扫描成功显示成功并退出界面 -->
      <span class="iconfont icon-success" style="position: relative;font-size: 100px;color:#42B983;margin-left: 50px;top:-10px;" v-else></span>
    </el-dialog>
    <div  v-show="dialogVisible" >
      <!-- 生成二维码图片 -->
      <vueQr :text="text" :size="200" v-if="!paySucc"></vueQr>
      <!-- 使用websocket监控是否扫描，扫描成功显示成功并退出界面 -->
      <span class="iconfont icon-success" style="position: relative;font-size: 100px;color:#42B983;margin-left: 50px;top:-10px;" v-else></span>
    </div>

  </div>
</template>

<script>
  import vueQr from 'vue-qr'
  export default {
    data() {
      return {
        dialogVisible: false,
        text: "",
        paySucc: false
      }
    },
    components:{
      vueQr
    },
    methods: {
      pay() {
        let _this = this;
        _this.paySucc = false;
        _this.dialogVisible = true;
        var qs = require('querystring')
        let config = {
          header: {'Content-type': 'application/x-www-form-urlencoded'}
        };
        var data={orderId:'77777754',amount:1,product:"大象"}
        this.$axios.post("order/createQR",qs.stringify(data),config)
          .then((response) => {
            _this.text = response.data;
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
      back(dataUrl, id) {
        console.log(dataUrl, id)
      }
    }
  }
</script>

<style >
  .btn {
    margin-left: 100px;
  }
</style>
