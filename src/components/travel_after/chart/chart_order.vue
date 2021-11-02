<template>

  <!--为echarts准备一个具备大小的容器dom-->
  <div>
    <VNav :currentNav="20" :currentStr="2"></VNav>
    <section class="rt_wrap content mCustomScrollbar" style="    background-color: #edfff7;">
      <el-date-picker type="year"  v-model="year" placeholder="选择查询年份时间" value-format="yyyy"    style="width: 30%;"></el-date-picker>
      <el-button @click="init">确定</el-button>
      <h1>&nbsp;</h1>
      <div class="rt_content">
        <h1>&nbsp;</h1>

        <div id="main" style="width: 700px;height: 400px;float: left"></div>
        <div id="main2" style="width: 600px;height: 400px;margin-left:5%;float: left"></div>
        <h1>&nbsp;</h1>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <div id="main3" style="width: 700px;height: 400px;float: left;margin-top: 5%"></div>
        <div id="main4" style="width: 600px;height: 400px;margin-left:5%;float: left;margin-top: 5%"></div>
        <h1>&nbsp;</h1>
      </div>
    </section>
  </div>
</template>
<script>
  //import echarts from 'echarts'
  import VNav from "@/components/travel_after/common/nav";
  export default {
    name: '',
    data() {
      return {
        charts: '',
        /*  opinion: ["1", "3", "3", "4", "5"],*/
        opinionData: [],
        xOptionData:[],
        digitalData2: [],
        left2Text: [],
        digitalData3: [],
        left3Text: [],
        digitalData4: [],
        left4Text: [],
        digitalData: [],
        leftText: [],
        digitalData1: [],
        left1Text: [],
        year:'',
      }
    },
    components: {
      VNav
    },
    methods: {
      init(){
        var qs = require('querystring');
        let config = {
          header: {'Content-type': 'application/x-www-form-urlencoded'}
        };
        this.$axios.get("/order/chart_order_init?year="+this.year)
          .then(successReqponse => {
            var data=successReqponse.data;

            this.left2Text =[];
            this.left2Text =data.left2Text;
            this.leftText =[];
            this.leftText =data.leftText;
            this.digitalData =[];
            this.digitalData =data.digitalData;
            this.digitalData2 =[];
            this.digitalData2 =data.digitalData2;
            this.left3Text =[];
            this.left3Text =data.left3Text;
            this.digitalData3 =[];
            this.digitalData3 =data.digitalData3;
            this.left4Text =[];
            this.left4Text =data.left4Text;
            this.digitalData4 =[];
            this.digitalData4 =data.digitalData4;
            this.drawLine('main2');
            this.drawChart();
            this.drawChart1();
            this.drawChart3();

          })
          .catch(failRespose => {
            alert("页面加载错误！正在重新载入...");
            //this.getImage(scenicId)
          })
      },
      drawLine(id) {
        let echarts = require('echarts');
        this.charts = echarts.init(document.getElementById(id))
        this.charts.setOption({
          tooltip: {
            trigger: 'axis'
          },
          title: {
            text: this.year+'年月销售额',
            left: 'center'
          },
          legend: {
            orient:'vertical',
            data: this.left2Text
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },

          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            axisLine: {
              show: true, //是否显示坐标轴轴线。
            },
            data:this.left2Text

          },
          yAxis: {
            type: 'value',
            axisTick: {
              show: false, //把y轴的坐标轴 刻度去掉
            },
            axisLine: {
              show: false, //是否显示坐标轴轴线。
            },
            splitLine: {
              lineStyle: {
                color: "#b6ffc9", // y轴的分割线
              },
            },
          },

          series: [{
            name: this.year+'年月销售额',
            type: 'line',
            stack: '总量',
            symbolSize: 10,
            itemStyle: {
              borderColor: "#f6c4a2",
              borderWidth: 5,
              color: "#bca4ff",
            },

            lineStyle: {
              color: "#ff722c",
            },
            markPoint:{
              itemStyle: {

                color: "#8050ff",
              },
              data:[
                {type:'max',name:'最大值'},
                {type:'min',name:'最小值'},
              ]
            },
            markLine:{
              itemStyle: {

                color: "#8050ff",
              },
              data:[
                {type:'average',name:'平均值'}
              ]
            },

            data: this.digitalData2
          }]
        })
      },
      drawChart1 () {
        let echarts = require('echarts');
        // 这个地方已经写死了一个组件画一个图表，可以自行用代码获取dom节点的多图创建，
        // 而且这里的 'walden'也是我自己的echarts样式，可以用默认的，用默认就直接写成
        // var myChart = this.$echarts.init(document.getElementById('myChart1'))
        var myChart = echarts.init(document.getElementById('main'));
        let option = {
          title: {
            text: this.year+'年月销售量',
            left: 'center'
          },
          legend: {
            left: 'center',
            top: 'bottom',
            data: this.leftText
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
            data: this.leftText,

            axisLine: {
              show: true, //是否显示坐标轴轴线。
            }
          },
          yAxis: {
            type: 'value',
            axisTick: {
              show: false, //把y轴的坐标轴 刻度去掉
            },
            axisLine: {
              show: false, //是否显示坐标轴轴线。
            },
            splitLine: {
              lineStyle: {
                color: "#b6ffc9", // y轴的分割线
              },
            },
          },
          series: [{
            barWidth: '60%',
            data: this.digitalData,
            type: 'bar'
          }]
        }

        myChart.setOption(option, true)
      },
      drawChart3 () {
        let echarts = require('echarts');
        var myChart = echarts.init(document.getElementById('main4'))
        let option = {
          title: {
            text: this.year+'年季度销售额',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            left: 'center',
            top: 'bottom',
            data: this.left4Text
          },
          series: [
            {
              name: '面积模式',
              type: 'pie',
              radius: [20, 80],
              center: ['50%', '60%'],
              roseType: 'area',
              data: this.digitalData4
            }
          ]
        }

        myChart.setOption(option, true)
      },
      drawChart () {
        let echarts = require('echarts');
        var myChart =echarts.init(document.getElementById('main3'))
        let option = {
          title: {
            text: this.year+'年季度销售量',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: this.left3Text
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          series: [
            {
              name: '占比',
              type: 'pie',
              radius: '60%',
              center: ['60%', '50%'],
              data: this.digitalData3,
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
      }
    },
    //调用
    mounted() {
      this.$nextTick(function() {
        var date=new Date();
        this.year=date.getFullYear().toString();
        this.init();
      })
    }
  }
</script>
<style scoped>

</style>
