<template>
  <div>
    <VNav :currentNav="20" :currentStr="1"></VNav>
    <section class="rt_wrap content mCustomScrollbar">
    <div class="back">
      <div class="top">
        <div>大厅已服务监视 {{watchTime.toFixed(1)}} 小时 (h)</div>

        <div class="title1">旅行社资源共享监视平台</div>

        <div class="time">
          <div>{{time}}</div>
          <div>{{date}}</div>
        </div>
        <div @click="toPageBack">返回<img  width="30px" alt=""></div>
        <div @click="fullScreen(screenAll)">
          <span v-if="screenAll == 0">进入全屏</span>
          <span v-if="screenAll == 1">退出全屏</span>
        </div>
      </div>
      <el-row>
        <el-col :span="15">
          <div class="item-left-top">
            <div><div id="myChart2" style="width:380px;height:250px;padding-top: 20px;" ></div></div>
            <div>
              <div>系统总订单数</div>
              <div>{{totalOrder}}</div>
              <div>今日订单数&nbsp;&nbsp;&nbsp;{{todayOrder}}</div>
              <div>昨日订单数&nbsp;&nbsp;&nbsp;{{yesOrder}}</div>
            </div>
            <div>
              <div>系统使用用户</div>
              <div>{{userNum}}</div>
              <div>平台路线数&nbsp;&nbsp;&nbsp;{{lineNum}}</div>
              <div>平台酒店数&nbsp;&nbsp;&nbsp;{{hotelNum}}</div>

            </div>
          </div>
          <div class="item-left-bottom">
            <div>
              <p>热门景点所在城市</p>
              <div id='myChart3' style="width:340px ; height: 340px"></div>

            </div>
            <div>
              <p>热门景点</p>
              <table border="1" cellpadding="0" cellspacing="0" width="90%" class="table1">
                <tr height="50px" align="center" style="font-size:15px;">
                  <td>城市</td>
                  <td>名称</td>
                  <td>收藏量</td>
                </tr>
                <tr v-for="(item, index) in scenicList" :key="index" height="40px" align="center">
                  <td>{{item.cityName}}</td>
                  <td>{{item.scenicName}}</td>
                  <td>{{item.count}}</td>
                </tr>
              </table>
            </div>
          </div>
        </el-col>
        <el-col :span="9">
          <div class="item-right">
            <p>近七天每日订单量</p>
            <div id='myChart1' style="width:400px ; height: 400px"></div>

            <p>排名前 8 路线 </p>
            <table border="1" cellpadding="0" cellspacing="0" width="90%" class="table2">
              <tr height="50px" align="center" style="font-size:15px;">
                <td>主题名称</td>
                <td>名称</td>
                <td>订单量</td>
              </tr>
              <tr v-for="(item, index) in lineList" :key="index" height="40px" align="center">
                <td>{{item.themeName}}</td>
                <td>{{item.lineTitle}}</td>
                <td>{{item.count}}</td>
              </tr>
            </table>
          </div>
        </el-col>
      </el-row>
    </div>
    </section>
  </div>
</template>

<script>
  import moment from 'moment'
  import VNav from "@/components/travel_after/common/nav";
  import chart1 from '@/components/travel_after/chart/chart1'
  import chart2 from '@/components/travel_after/chart/chart2'
  import chart3 from '@/components/travel_after/chart/chart3'
  export default {

    data () {
      return {
        screenAll: 0, // 0退出全屏, 1全屏
        time: '',
        watchTime: 0,
        scenicList:[],
        lineList:[],
        totalOrder:'',
        todayOrder:'',
        yesOrder:'',
        lineNum:'',
        userNum:'',
        hotelNum:'',
        digitalData1: [1, 2, 3, 4, 10, 5, 1],
        xAxisText1: [],
        chart2Text: [],
        digitalData: [],
        chart3Text: [],
        digitalData2: [],
        tableData1: [{sortName: '电影', title: '唐人街探案 II', downloadNum: 1866},
          {sortName: '电影', title: '唐人街探案 II', downloadNum: 1866},
          {sortName: '电影', title: '唐人街探案 II', downloadNum: 1866},
          {sortName: '电影', title: '唐人街探案 II', downloadNum: 1866},
          {sortName: '电影', title: '唐人街探案 II', downloadNum: 1866}]
      }
    },
    beforeMount: function() {
      this.init();
    },
    mounted: async function() {

      this.timer = setInterval(() => { // 更新小时时间
        this.time = moment().format('HH:mm:ss')
      }, 1000)
      this.watchTimer = setInterval(() => { // 更新监测时间
        this.watchTime += 0.1
      }, 360000)
    },
    beforeDestroy () { // 清除定时器
      if (this.timer) {
        clearInterval(this.timer)
      }
      if (this.watchTimer) {
        clearInterval(this.watchTimer)
      }
    },
    components: {
      chart1,
      chart2,
      chart3,
      VNav
    },
    methods: {
      drawChart () {
        let echarts = require('echarts');
        // 这个地方已经写死了一个组件画一个图表，可以自行用代码获取dom节点的多图创建，
        // 而且这里的 'walden'也是我自己的echarts样式，可以用默认的，用默认就直接写成
        // var myChart = this.$echarts.init(document.getElementById('myChart1'))
        var myChart = echarts.init(document.getElementById('myChart1'))
        let option = {
          title: {
            text: ''
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data: this.xAxisText1,
            axisLabel: {
              show: true,
              textStyle: {
                color: '#FFFFFF' // 这里用参数代替了
              }
            }
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              show: true,
              textStyle: {
                color:'#FFFFFF' // 这里用参数代替了
              }
            }
          },
          series: [{
            barWidth: '60%',
            data: this.digitalData1,
            type: 'bar'
          }]
        }

        myChart.setOption(option, true)
      },
      drawChart3 () {
        let echarts = require('echarts');
        var myChart = echarts.init(document.getElementById('myChart3'))
        let option = {
          title: {
            text: '',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            left: 'center',
            top: 'bottom',
            data: this.chart3Text
          },
          series: [
            {
              name: '面积模式',
              type: 'pie',
              radius: [20, 80],
              center: ['50%', '60%'],
              roseType: 'area',
              data: this.digitalData2
            }
          ]
        }

        myChart.setOption(option, true)
      },
      drawChart2 () {
        let echarts = require('echarts');
        var myChart =echarts.init(document.getElementById('myChart2'))
        let option = {
          title: {
            text: '',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: this.chart2Text
          },
          series: [
            {
              name: '占比',
              type: 'pie',
              radius: '60%',
              center: ['60%', '50%'],
              data: this.digitalData,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }

        myChart.setOption(option, true)
      },
      init:async function(){
        var qs = require('querystring');
        let config = {
          header: {'Content-type': 'application/x-www-form-urlencoded'}
        };
         this.$axios.get("/order/chart_init")
          .then(successReqponse => {
            var data=successReqponse.data;
            this.scenicList =[];
            this.scenicList =data.scenicList;
            this.lineList =[];
            this.lineList =data.lineList;
            this.digitalData1 =[];
            this.digitalData1 =data.digitalData1;
            this.xAxisText1 =[];
            this.xAxisText1 =data.xAxisText1;
            this.chart2Text =[];
            this.chart2Text =data.chart2Text;
            this.digitalData =[];
            this.digitalData =data.digitalData;
            this.chart3Text =[];
            this.chart3Text =data.chart3Text;
            this.digitalData2 =[];
            this.digitalData2 =data.digitalData2;
            this.totalOrder =data.totalOrder;
            this.todayOrder =data.todayOrder;
            this.yesOrder =data.yesOrder;
            this.lineNum =data.lineNum;
            this.userNum =data.userNum;
            this.hotelNum =data.hotelNum;
            this.drawChart3();
            this.drawChart();
            this.drawChart2();

          })
          .catch(failRespose => {
            alert("页面加载错误！正在重新载入...");
            //this.getImage(scenicId)
          })
      },
      toPageBack () {
        this.$router.go(-1)
      },
      fullScreen () { // # 全屏显示
        if (this.screenAll === 1) {
          this.screenAll = 0
          if (document.exitFullscreen) {
            document.exitFullscreen()
          } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen()
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen()
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen()
          }
        } else {
          this.screenAll = 1
          if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen()
          } else if (document.documentElement.webkitRequestFullScreen) {
            document.documentElement.webkitRequestFullScreen()
          } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen()
          } else if (document.documentElement.msRequestFullscreen) {
            // IE11
            document.documentElement.msRequestFullscreen()
          }
        }
      }
    },
    computed: {
      date () {
        return moment().format('YYYY 年 MM 月 DD 日')
      }
    }
  }
</script>

<style lang="scss" scoped>
  tr:hover{
    background: rgba(202, 226, 212, 0.55);
  }
  .back{
    background: rgba(233, 248, 235, 0.61);
    width: 100%;

    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    font-size: 18px;
    overflow-x: hidden;
    color: #588b63;
    .top{
      width: 100%;
      height: 60px;
      line-height: 60px;
      color: #85da98;
      // background: #050297;
      border-bottom: 2px solid #4aa672;
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 1400px;
      position: relative;
      div:first-child{
        position: relative;
        left: -3%;
      }
      img:nth-child(2){
        width: 250px;
        height: 40px;
        margin-left: 2%;
      }
      img:nth-child(4){
        width: 250px;
        height: 40px;
      }
      .title1{
        width: 280px;

        background-size: 100% 100%;
        background-repeat: no-repeat;
        text-align: center;
      }
      .time{
        width: 200px;
        height: 50px;
        line-height: 25px;
        display: flex;
        flex-direction: column;
        div{
          text-align: center;
          font-weight: 600;
          font-size: 18px;
          font-family: Digital;
        }
      }
      div:nth-child(6){
        cursor: pointer;
        img{
          position: relative;
          top: 5px;
          margin-left: 5px;
        }
      }
      div:last-child{
        font-size: 12px;
        margin-left: 2%;
        cursor: pointer;
      }
      div:last-child:hover{
        color: #93ffaf;
      }
    }
    .el-row{
      .item-left-top{
        width: 100%;
        height: 350px;
        display: flex;
        justify-content: center;
        align-items: center;
        // background: crimson;
        div{
          width: 26%;
          height: 280px;
          // background: cornflowerblue;
          margin: auto;
          display: flex;
          flex-direction: column;
          position: relative;
          left: 1%;
        }
        div:first-child{
          width: 400px;
          height: 280px;
        }
        div:nth-child(2), div:last-child{
          animation: dh1 5s;
          -webkit-animation: dh1 5s; /* Safari and Chrome */
          div{
            width: 100%;
            display: flex;
            justify-content: center;
            text-align: center;
            font-family: digital;
          }
          div:nth-child(2){
            font-size: 80px;
            padding: 30px 0;
            color: #cdffc0;
          }
          div:nth-child(3), div:last-child{
            text-align: left;
            text-indent: 30px;
          }
        }
      }
      .item-left-bottom{
        width: 96%;
        height: 400px;
        margin: auto;
        border: 2px solid #85da98;
        border-radius: 10px;
        margin-bottom: 30px;
        background-image: radial-gradient(rgba(200, 224, 206, 0.66) 5%, #bcead7 70%);
        display: flex;
        justify-content: center;
        align-items: center;
        animation: dh2 2s;
        -webkit-animation: dh2 2s; /* Safari and Chrome */
        animation-delay: 2s;
        animation-fill-mode: both;
        div{
          height: 380px;
          // background: crimson;
          margin: 0 10px;
          p{
            position: relative;
            top: 30px;
          }
        }
        div:first-child{
          width: 340px;
          display: flex;
          flex-direction: column;
          align-items: center;
          div{
            position: relative;
            bottom: 8%;
            animation: dh4 2s;
            -webkit-animation: dh4 2s; /* Safari and Chrome */
            animation-delay: 3s;
            animation-fill-mode: both;
          }
        }
        div:last-child{
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .table1{
          position: relative;
          top: 50px;
          border: 1px solid #94da9a;
          font-size: 12px;
          animation: dh4 2s;
          -webkit-animation: dh4 2s; /* Safari and Chrome */
          animation-delay: 5s;
          animation-fill-mode: both;
        }
      }
      .item-right{
        width: 90%;
        height: 900px;
        margin: 40px auto;
        border: 2px solid #94ff9d;
        border-radius: 10px;
        background-image: linear-gradient(to top, #e9fced, #a0e2c4);
        animation: dh3 2s;
        -webkit-animation: dh3 2s; /* Safari and Chrome */
        animation-delay: 4s;
        animation-fill-mode: both;
        div{
          position: relative;
          left: 5%;
          animation: dh4 2s;
          -webkit-animation: dh4 2s; /* Safari and Chrome */
          animation-delay: 6s;
          animation-fill-mode: both;
        }
        .table2{
          border: 1px solid #85da98;
          font-size: 12px;
          margin: 30px auto;
          animation: dh4 2s;
          -webkit-animation: dh4 2s; /* Safari and Chrome */
          animation-delay: 7s;
          animation-fill-mode: both;
        }
        p{
          padding-top: 40px;
          font-size: 15px;
          text-align: center;
        }
        p:first-child{
          padding-top: 20px;
          margin: 0;
        }
      }
    }
  }
  // 渐变效果
  @keyframes dh1{
    from {opacity: 0;}
    to {opacity: 1;}
  }

  // 上移效果
  @keyframes dh2{
    from {opacity: 0; position: relative;top: 100px;}
    to {opacity: 1; position: relative; top: 0;}
  }

  // 左移效果
  @keyframes dh3{
    from {opacity: 0; position: relative;left: 500px;}
    to {opacity: 1; position: relative; left: 0;}
  }

  // 缩放出现效果
  @keyframes dh4{
    from {opacity: 0; transform: scale(0,0);}
    to {opacity: 1; transform: scale(1,1);}
  }
</style>
