var dom = document.getElementById('pie')
var myChart = echarts.init(dom)
var app = {}
option = null
option = {
  title: {
    text: '楼宇业态',
    x: '30%',
    y: '50%',
    textAlign: 'center',
    top: '78%', //字体的位置
    textStyle: {
      fontWeight: 'normal',
      color: '#FFF',
      fontSize: 16
    }
  },
  legend: {
    orient: 'vertical',
    right: 0,
    top: 'middle',
    type: 'scroll',
    textStyle: {
      color: '#fff'
    }
  },
  tooltip: {
    trigger: 'item',
    formatter: '{b} : {c} ({d}%)'
  },

  visualMap: {
    show: false,
    min: 500,
    max: 600,
    inRange: {
      //colorLightness: [0, 1]
    }
  },

  series: [
    {
      name: '访问来源',
      type: 'pie',
      radius: '50%',
      center: ['30%', '50%'],
      color: ['#a8de02', '#ffb111', '#028cf1', '#01d1f9'],
      data: [
        {
          value: 285,
          name: '企业'
        },
        {
          value: 410,
          name: '商铺'
        },
        {
          value: 274,
          name: '住宅'
        },
        {
          value: 235,
          name: '其它'
        }
      ].sort(function(a, b) {
        return a.value - b.value
      }),
      roseType: 'radius',
      label: {
        show: false
      }
    }
  ]
}
if (option && typeof option === 'object') {
  myChart.setOption(option, true)
}

var dom1 = document.getElementById('pie1')
var pieChart1 = echarts.init(dom1)
pieOption1 = {
  title: {
    x: '50%',
    y: '50%',
    textAlign: 'center',
    top: '78%', //字体的位置
    text: '企业入驻率',
    textStyle: {
      fontWeight: 'normal',
      color: '#FFF',
      fontSize: 16
    }
  },
  series: [
    {
      name: '企业入驻率',
      type: 'pie',
      radius: ['40%', '50%'],
      color: ['#ffb111', '#434551'],
      avoidLabelOverlap: false,
      labelLine: {
        normal: {
          show: false
        }
      },
      data: [
        {
          value: 65,
          label: {
            normal: {
              show: true,
              formatter: '{d}%',
              position: 'center',
              textStyle: {
                fontSize: 20,
                color: '#fff'
              }
            }
          }
        },
        {
          value: 35
        }
      ]
    }
  ]
}
if (pieOption1 && typeof pieOption1 === 'object') {
  pieChart1.setOption(pieOption1, true)
}

var dom2 = document.getElementById('pie2')
var pieChart2 = echarts.init(dom2)
pieOption2 = {
  title: {
    x: '50%',
    y: '50%',
    textAlign: 'center',
    top: '78%', //字体的位置
    text: '高新企业占比',
    textStyle: {
      fontWeight: 'normal',
      color: '#FFF',
      fontSize: 16
    }
  },
  series: [
    {
      name: '高新企业占比',
      type: 'pie',
      radius: ['40%', '50%'],
      color: ['#01d1f9', '#434551'],
      avoidLabelOverlap: false,
      labelLine: {
        normal: {
          show: false
        }
      },
      data: [
        {
          value: 35,
          label: {
            normal: {
              show: true,
              formatter: '{d}%',
              position: 'center',
              textStyle: {
                fontSize: 20,
                color: '#fff'
              }
            }
          }
        },
        {
          value: 65
        }
      ]
    }
  ]
}
if (pieOption2 && typeof pieOption2 === 'object') {
  pieChart2.setOption(pieOption2, true)
}
