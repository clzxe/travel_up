<template>
  <div>
    <div id="myChart2" :style="{width: width + 'px', height: height + 'px'}"></div>
  </div>
</template>

<script>
  import 'echarts/theme/blue.js'

  export default {
    name: 'echart2',
    props: {
      leftText: {
        type: Array,
        default () {
          return []
        }
      },
      digitalData: {
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
        var myChart =echarts.init(document.getElementById('myChart2'))
        let option = {
          title: {
            text: this.title,
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: this.leftText
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
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
