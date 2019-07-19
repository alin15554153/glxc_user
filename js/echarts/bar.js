var dom = document.getElementById('bar_h')
var myChart = echarts.init(dom)
var option = null
var myColor = ['#01d1f9', '#9bd818', '#dbb333', '#26eadb', '#028df1']
option = {
  tooltip: {
    show: true,
    formatter: function(params) {
      return params.name + '：' + params.data
    }
  },
  grid: {
    left: '0%',
    top: '0%',
    right: '5%',
    bottom: '8%',
    containLabel: true
  },
  xAxis: {
    show: false
  },
  yAxis: {
    type: 'category',
    axisTick: 'none',
    axisLine: 'none',
    // offset: '27',
    axisLabel: {
      textStyle: {
        color: '#FFF',
        fontSize: '14'
      }
    },
    data: ['合资', '国有', '集体所有', '股份制', '私营']
  },
  series: [
    {
      //间距
      type: 'bar',
      barWidth: 10,
      itemStyle: {
        normal: {
          color: function(params) {
            let num = myColor.length
            return myColor[params.dataIndex % num]
          }
        }
      },

      data: [10, 15, 18, 19, 22]
    }
  ]
}

if (option && typeof option === 'object') {
  myChart.setOption(option, true)
}

var dom2 = document.getElementById('bar_v')
var myChart2 = echarts.init(dom2)
var data = [
  {
    name: '1',
    value: 48
  },
  {
    name: '2',
    value: 31
  },
  {
    name: '3',
    value: 85
  },
  {
    name: '4',
    value: 45
  },
  {
    name: '5',
    value: 90
  },
  {
    name: '6',
    value: 75
  },
  {
    name: '7',
    value: 50
  },
  {
    name: '8',
    value: 87
  },
  {
    name: '9',
    value: 48
  },
  {
    name: '10',
    value: 75
  },
  {
    name: '11',
    value: 60
  },
  {
    name: '12',
    value: 48
  }
]
var xData = [],
  yData = []
var min = 50 // 最小值的定义
data.map(function(a, b) {
  xData.push(a.name)
  if (a.value === 0) {
    yData.push(a.value + min)
  } else {
    yData.push(a.value)
  }
  // yData.push((Math.random(0,1) * 100).toFixed(0));
})
option = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'line',
      lineStyle: {
        opacity: 0
      }
    },
    formatter: function(prams) {
      if (prams[0].data === min) {
        return '租售：0%'
      } else {
        return '租售：' + prams[0].data + '%'
      }
    }
  },
  grid: {
    left: '0%',
    right: '2%',
    bottom: '5%',
    top: '7%',
    height: '85%',
    containLabel: true,
    z: 22
  },
  xAxis: [
    {
      type: 'category',
      gridIndex: 0,
      data: xData,
      axisTick: {
        show: false
      },
      axisLine: {
        lineStyle: {
          color: '#0c3b71'
        }
      },
      axisLabel: {
        show: true,
        color: '#fff',
        fontSize: 16
      }
    }
  ],
  yAxis: [
    {
      type: 'value',
      gridIndex: 0,
      splitLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      min: 0,
      max: 100,
      axisLine: {
        show: false,
        lineStyle: {
          color: '#0c3b71'
        }
      },
      axisLabel: {
        color: '#fff',
        formatter: '{value} %'
      }
    },
    {
      type: 'value',
      gridIndex: 0,
      min: min,
      max: 100,
      splitNumber: 5,
      splitLine: {
        show: true
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        show: false
      }
    }
  ],
  series: [
    {
      name: '租售',
      type: 'bar',
      barWidth: '30%',
      xAxisIndex: 0,
      yAxisIndex: 0,
      itemStyle: {
        normal: {
          barBorderRadius: [30, 30, 0, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#38E9E6'
            },
            {
              offset: 0.5,
              color: '#30D1ED'
            },
            {
              offset: 1,
              color: '#29B9F5'
            }
          ])
        }
      },
      data: yData,
      zlevel: 11
    }
  ]
}

if (option && typeof option === 'object') {
  myChart2.setOption(option, true)
}

//折线图
var dom3 = document.getElementById('line')
var myChart3 = echarts.init(dom3)
option = {
  grid: {
    left: '0%',
    right: '2%',
    bottom: '10%',
    top: '7%',
    containLabel: true
  },
  tooltip: {
    trigger: 'axis',
    label: {
      show: true
    }
  },
  xAxis: {
    boundaryGap: true, //默认，坐标轴留白策略
    axisLine: {
      show: false
    },
    splitLine: {
      show: false
    },
    axisTick: {
      show: false,
      alignWithLabel: true
    },
    axisLabel: {
      color: '#fff'
    },
    data: ['第一季', '第二季', '第三季', '第四季']
  },
  yAxis: {
    axisLine: {
      show: false
    },
    splitLine: {
      show: true
    },
    axisTick: {
      show: false
    },
    splitArea: {
      show: false
    },
    axisLabel: {
      color: '#fff',
      formatter: function(value) {
        return value / 1000 + 'k万元'
      }
    }
  },
  series: [
    {
      type: 'line',
      symbol: 'circle',
      symbolSize: 7,
      lineStyle: {
        color: 'rgb(33,148,246)',
        shadowBlur: 12,
        shadowColor: 'rgb(33,148,246,0.9)',
        shadowOffsetX: 1,
        shadowOffsetY: 1
      },
      itemStyle: {
        color: 'rgb(33,148,246)',
        borderWidth: 1,
        borderColor: '#FFF'
      },
      label: {
        show: false,
        distance: 1,
        emphasis: {
          show: false
        }
      },
      data: [1000, 2500, 2800, 4500]
    }
  ]
}

if (option && typeof option === 'object') {
  myChart3.setOption(option, true)
}
