<template>
  <div>
    <div id="myChart1" :style="{width: width + 'px', height: height + 'px'}"></div>
  </div>
</template>

<script>
  import 'echarts/theme/shine.js'

  export default {
    name: 'echart1',
    props: {
      digitalData: {
        type: Array,
        default () {
          return []
        }
      },
      xAxisText: {
        type: Array,
        default () {
          return []
        }
      },
      title: {
        type: String,
        default () {
          return ''
        }
      },
      width: {
        type: Number,
        default: 0
      },
      height: {
        type: Number,
        default: 0
      },
      xFontColor: {
        type: String,
        default: '#a7a7a7'
      }
    },
    data () {
      return {
      }
    },
    mounted () {
      this.drawChart()
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
            text: this.title
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
            data: this.xAxisText,
            axisLabel: {
              show: true,
              textStyle: {
                color: this.xFontColor // 这里用参数代替了
              }
            }
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              show: true,
              textStyle: {
                color: this.xFontColor // 这里用参数代替了
              }
            }
          },
          series: [{
            barWidth: '60%',
            data: this.digitalData,
            type: 'bar'
          }]
        }

        myChart.setOption(option, true)
      }
    }
  }
</script>

<style scoped>
</style>
