<template>
  <div class="light_hot" id="light_hot">
    <div class="hot">
      <div class="hot-top">
        <div class="hot-left">
          <div class="lighthot-top-input">
            <el-date-picker v-model="value" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
              :picker-options="pickerOptions">
            </el-date-picker>
          </div>
          <div id="light-left"></div>
        </div>
        <div class="hot-right">
          <table :data='lighthotInfo'>
            <tr>
              <td><img src="~@/assets/images/shot-right-list1.png"></td>
              <td><span>太阳辐照度:</span></td>
              <td class="light-right-words">{{lighthotInfo[0].val | nonull}}<span class="unit">℃</span></td>
            </tr>
            <tr>
              <td><img src="~@/assets/images/shot-right-list2.png" /></td>
              <td><span>供暖策略:</span></td>
              <td class="light-right-words">{{lighthotInfo[1].val | heatStrategy}}</td>
            </tr>
            <tr>
              <td><img src="~@/assets/images/shot-right-list33.png" /></td>
              <td><span>系统运行状态:</span></td>
              <td class="light-right-words">{{lighthotInfo[2].val | runmode}}</td>
            </tr>
            <tr>
              <td><img src="~@/assets/images/shot-right-list4.png" /></td>
              <td><span>系统运行模式:</span></td>
              <td class="light-right-words">{{lighthotInfo[3].val | runStatus}}</td>
            </tr>
            <tr>
              <td><img src="~@/assets/images/shot-right-list5.png" /></td>
              <td><span>累计供热量:</span></td>
              <td class="light-right-words">{{lighthotInfo[4].val | nonull}}<span class="unit">kWh</span></td>
            </tr>
          </table>
        </div>
      </div>
      <div class="hot-bottom">
        <div class="hot-list">
          <div class='s-hot-list a1'>
            <div class='hot-list-data' v-for='(item,index) in lighthotChartGauge1' :key='item.id'>
              <div class='data-title'>
                <p>{{item.name}}</p>
              </div>
              <div class='data-echarts' :id="'dataEcharts'+ item.id"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    dateFormatter
  } from '@/utils/index'
  export default {
    data() {
      return {
        value: dateFormatter(new Date(), false),
        lighthotChartData: '', // 折线图数据
        lighthotInfo: [{
            "id": "",
            "val": ""
          },
          {
            "id": "",
            "val": ""
          },
          {
            "id": "",
            "val": ""
          },
          {
            "id": "",
            "val": ""
          },
          {
            "id": "",
            "val": ""
          }
        ],
        lighthotChartGauge1: '', // 仪表图数据
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now() - 8.64e6
          }
        },
        cur_data: "",
        /*         runmode:"",
                run_status:"",
                adjustable_output:"", */
        lighthotcInfo: "",
        max: '', //仪表图最大值
        ws1: '', //光热曲线图ws
        ws2: '', //光热信息ws
        ws3: '', //光热仪表图ws
      }
    },
    created() {
      let _this = this
      let token = _this.$cookie.get('token')
      // 获取折线图数据
      this.$http({
        url: this.$http.adornUrl('/device/lighthot/chart/line'),
        method: 'post',
        data: this.$http.adornData({
          'date': this.value
        })
      }).then(({
        data
      }) => {
        if (data.msg == 'success') {
          // console.log(data)
          this.lighthotChartData = data.chart
          //循环出24小时1440个点
          let arr = [];
          for (let i = 0; i < 24; i++) {
            if (i < 10) {
              i = "0" + i
            }
            for (let j = 0; j < 60; j++) {
              if (j < 10) {
                j = "0" + j
              }
              arr.push(i + ":" + j)
            }
          }
          arr.push("24:00")
          // this.cur_data = /* parseInt */ (data.chart.series[0].data.length / arr.length * 100)
          var electricity = echarts.init(document.getElementById('light-left'));
          var option = {
            color: ['#4ECDB8', 'rgb(93,176,235)'],
            grid: {
              x: 50,
              y: 40,
              x2: 50,
              y2: 60,
              borderWidth: 0
            },
            title: {
              text: '光热发电24小时供热',
              textAlign: 'left',
              padding: [0, 0, 20, 50]
            },
            legend: {
              data: this.lighthotChartData.legend
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                // type: 'cross',
                label: {
                  backgroundColor: '#6a7985'
                }
              }
            },
            lineStyle: {
              color: 'rgb(255, 255, 255)'
            },
            xAxis: {
              type: 'category',
              data: this.lighthotChartData.xAxis == null ? arr : this.lighthotChartData.xAxis,
              boundaryGap: false,
              name: '时间',
              // axisTick: true,
              axisLine: {
                lineStyle: {
                  type: 'solid',
                  color: '#000', //左边线的颜色
                  width: '1' //坐标线的宽度
                }
              },
              axisLabel: {
                textStyle: {
                  color: '#000' //x轴刻度数值颜色
                }
              },
              splitLine: {
                show: false
              }
            },
            yAxis: {
              min: 0,
              max: this.lighthotChartData.series[0].data == false ? 2000 : null,
              //y轴刻度     
              axisLine: {
                lineStyle: {
                  type: 'solid',
                  color: '#000', //y轴坐标轴颜色
                  width: '1' //坐标轴宽度
                }
              },
              axisLabel: {
                //设置y轴数值为%
                formatter: '{value}kW',
                textStyle: {
                  color: '#000' //y轴刻度数值颜色
                }
              },
              splitLine: {
                lineStyle: {
                  type: 'solid'
                }
              }
            },
            dataZoom: [{
              // show:false,
              zoomOnMouseWheel: true,
              type: 'slider',
              realtime: true, //拖动滚动条时是否动态的更新图表数据
              height: 20, //滚动条高度
              // start: _this.cur_data - 8.4, //滚动条开始位置（共100等份）
              // end: _this.cur_data //结束位置（共100等份）
            }, {
              type: 'inside', //鼠标滚轮
              realtime: true,
            }, ],
            series: [
              /* {
                            name: this.lighthotChartData.series[0].name,
                            data: this.lighthotChartData.series[0].data,
                            type: 'line',
                            symbol: 'none',
                            itemStyle: {
                              normal: {
                                lineStyle: {
                                  color: '#4ECDB8'
                                }
                              }
                            },
                            lineStyle: {
                              type: 'dotted'
                            }
                          }, */
              {
                // connectNulls: true,
                name: this.lighthotChartData.series[0].name,
                data: this.lighthotChartData.series[0].data,
                type: 'line',
                // symbol: 'none',
                itemStyle: {
                  normal: {
                    lineStyle: {
                      color: 'rgb(78,205,184)'
                    }
                  }
                },
                lineStyle: {
                  type: 'dotted'
                },
                /* areaStyle: {
                    normal: {
                      // offset: 1,
                      color: 'rgba(93,176,235,0.4)'
                    }
                  }, */
              }
            ]
          };
          electricity.setOption(option);
          //光热发电曲线图 websocket 推送
          let arr1 = []
          // console.log(this.lighthotChartData)
          for (let item of this.lighthotChartData.series) {
            // console.log(item.id)
            arr1.push(item.id)
          }
          if ('WebSocket' in window) {
            // let userToken = _this.$cookie.get('token')
            // ws = new WebSocket("wss://echo.websocket.org");
            this.ws1 = new WebSocket(window.SITE_CONFIG.wsBaseUrl+ token + "/lightheat" + "/curve");
            this.ws1.onopen = function (evt) {
              // console.log(arr1);
              _this.ws1.send(arr1);
            };
            this.ws1.onmessage = function (evt) {
              /* let receive = {
                id: "1504",
                val: "100"
              } */
              let data = JSON.parse(evt.data)
              // console.log(data)
              for (let i = 0; i < _this.lighthotChartData.series.length; i++) {
                if (_this.lighthotChartData.series[i].id == data.id) {
                  _this.lighthotChartData.series[i].data.push(data.value)
                }
              }
              let chart = echarts.init(document.getElementById("light-left"))
              chart.setOption(option);
            };
            this.ws1.onclose = function (evt) {
              console.log("Connection closed.");
            };
          } else {
            alert('当前浏览器 Not support websocket')
          }

        }
      })
      // 获取指数数据
      this.$http({
        url: this.$http.adornUrl('/device/lighthot/info'),
        method: 'post',
      }).then(({
        data
      }) => {
        if (data.msg == 'success') {
          // console.log(data)
          this.lighthotInfo = data.lh_info
        }
        let arr = []
        for (let item of data.lh_info) {
          arr.push(item.id)
        }
        if ('WebSocket' in window) {
          // ws = new WebSocket("wss://echo.websocket.org");
          this.ws2 = new WebSocket(window.SITE_CONFIG.wsBaseUrl+ token + "/lightheat" + "/info");
          this.ws2.onopen = function (evt) {
            // console.log(arr);
            _this.ws2.send(arr);
          };

          this.ws2.onmessage = function (evt) {
            let data = JSON.parse(evt.data)
            for (let i = 0; i < _this.lighthotInfo.length; i++) {
              if (_this.lighthotInfo[i].id == data.id) {
                _this.lighthotInfo[i].val = data.value
              }
            }
            // console.log("Received Message: ");
            // ws.close();
          };

          this.ws2.onclose = function (evt) {
            console.log("Connection closed.");
          };
        } else {
          alert('当前浏览器 Not support websocket')
        }
      })

    },
    mounted() {
      let _this = this
      let token = _this.$cookie.get('token')
      // 获取仪表图数据
      this.$http({
        url: this.$http.adornUrl('/device/lighthot/chart/gauge'),
        method: 'post',
      }).then(({
        data
      }) => {
        if (data.msg == 'success') {
          this.lighthotChartGauge1 = data.chart.series
          // console.log(this.lighthotChartGauge1)
          this.$nextTick(() => {

            for (var i = 0; i < this.lighthotChartGauge1.length; i++) {
              var colors = [
                [
                  [0.2, "#cae7e5"],
                  [0.8, "#1DB3AA"],
                  [1, "#088A85"]
                ],
                [
                  [0.2, "#D3EAF3"],
                  [0.8, "#6EAEE2"],
                  [1, "#0080FF"]
                ],
                [
                  [0.2, "#E0D8F0"],
                  [0.8, "#A78CD9"],
                  [1, "#7401DF"]
                ],
                [
                  [0.2, '#afb39f'],
                  [0.8, '#81ca25'],
                  [1, '#21610B']
                ]
              ]
              this.max = this.lighthotChartGauge1[i].max
              var id = 'dataEcharts' + this.lighthotChartGauge1[i].id
              echarts.init(document.getElementById(id)).setOption(this.$options.methods.mintorOption(this.lighthotChartGauge1[
                i], colors[i % 4], this.max))
            }
          })
          // 光热发电 仪表图websocket推送
          let obj = ''
          if ('WebSocket' in window) {
            let arr = []
            // console.log(this.lighthotChartGauge1)
            for (let item of this.lighthotChartGauge1) {
              arr.push(item.id)
            }
            // ws = new WebSocket("wss://echo.websocket.org");
            this.ws3 = new WebSocket(window.SITE_CONFIG.wsBaseUrl + token + "/lightheat" + "/meter");
            this.ws3.onopen = function (evt) {
              // console.log(arr)
              _this.ws3.send(arr);
            };

            this.ws3.onmessage = function (evt) {
              let data = JSON.parse(evt.data)
              // console.log(data)
              for (let i = 0; i < _this.lighthotChartGauge1.length; i++) {
                if (_this.lighthotChartGauge1[i].id == data.id) {
                  _this.lighthotChartGauge1[i].val = data.value
                  let id = 'dataEcharts' + data.id
                  let chart = echarts.init(document.getElementById(id))
                  chart.setOption({
                    series: [{
                      data: [{
                        value: data.value
                      }]
                    }]
                  });
                }
              }
            };
            this.ws3.onclose = function (evt) {
              console.log("Connection closed.");
            };
          } else {
            alert('当前浏览器 Not support websocket')
          }
        }
      })
      this.init()
      var that = this
      window.onresize = function () {
        if (document.getElementById('light_hot')) {
          document.getElementById('light_hot').style.height = (window.innerHeight - 170) + 'px'
          echarts.init(document.getElementById('light-left')).resize();
          for (var i = 0; i < that.lighthotChartGauge1.length; i++) {
            var id = 'dataEcharts' + that.lighthotChartGauge1[i].id
            echarts.init(document.getElementById(id)).resize();
          }
        }
      }
    },
    destroyed() {
      this.ws1.close()
      this.ws2.close()
      this.ws3.close()
    },
    watch: {
      'value': 'changeDate',
    },
    methods: {
      // 仪表盘样式
      mintorOption(value, col, max) {
        return Option = {
          series: [{
            max: max,
            name: '',
            type: 'gauge',
            title: { // 仪表盘标题
              textStyle: {
                color: '#000',
                fontSize: 12
              }
            },
            detail: {
              formatter: '{value}' + value.data[0].unit,
              textStyle: {
                fontSize: 14,
                fontWeight: 700,
                color: col[2][1]
              }
            },
            pointer: { //指针样式
              length: '90%',
              width: 3
            },
            data: [{
              value: value.data[0].value == null ? 0 : value.data[0].value,
              name: value.data.name
            }],
            radius: '92%',
            axisLine: {
              lineStyle: {
                color: col,
                width: 5,
              },
            },
            splitLine: { //分割线样式（及10、20等长线样式）
              length: 4,
              lineStyle: {
                width: 2
              }
            },
            axisTick: { //刻度线样式（及短线样式）
              length: 2
            },
            axisLabel: { // 刻度值样式
              show: true,
              textStyle: {
                color: '#000',
                fontSize: 10,
              }
            },
          }, ]
        }

      },
      init() {
        document.getElementById('light_hot').style.height = (window.innerHeight - 170) + 'px'
      },
      changeDate() {
        let _this = this
        // 获取折线图数据
        this.$http({
          url: this.$http.adornUrl('/device/lighthot/chart/line'),
          method: 'post',
          data: this.$http.adornData({
            'date': this.value
          })
        }).then(({
          data
        }) => {
          if (data.msg == 'success') {
            // this.lighthotChartData = data.chart
            //循环出24小时1440个点
            let arr = [];
            for (let i = 0; i < 24; i++) {
              if (i < 10) {
                i = "0" + i
              }
              for (let j = 0; j < 60; j++) {
                if (j < 10) {
                  j = "0" + j
                }
                arr.push(i + ":" + j)
              }
            }
            arr.push("24:00")
            // this.cur_data = /* parseInt */ (data.chart.series[0].data.length / arr.length * 100)
            var electricity = echarts.init(document.getElementById('light-left'));
            var option = {
              color: ['#4ECDB8', 'rgb(93,176,235)'],
              grid: {
                x: 50,
                y: 40,
                x2: 50,
                y2: 60,
                borderWidth: 0
              },
              title: {
                text: '光热发电24小时供热',
                textAlign: 'left',
                padding: [0, 0, 20, 50]
              },
              legend: {
                data: data.chart.legend
              },
              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  // type: 'cross',
                  label: {
                    backgroundColor: '#6a7985'
                  }
                }
              },
              lineStyle: {
                color: 'rgb(255, 255, 255)'
              },
              xAxis: {
                type: 'category',
                data: data.chart.xAxis == null ? arr : data.chart.xAxis,
                boundaryGap: false,
                name: '时间',
                // axisTick: true,
                axisLine: {
                  lineStyle: {
                    type: 'solid',
                    color: '#000', //左边线的颜色
                    width: '1' //坐标线的宽度
                  }
                },
                axisLabel: {
                  textStyle: {
                    color: '#000' //x轴刻度数值颜色
                  }
                },
                splitLine: {
                  show: false
                }
              },
              yAxis: {
                min: 0,
                max: data.chart.series[0].data == false ? 2000 : null,
                //y轴刻度     
                axisLine: {
                  lineStyle: {
                    type: 'solid',
                    color: '#000', //y轴坐标轴颜色
                    width: '1' //坐标轴宽度
                  }
                },
                axisLabel: {
                  //设置y轴数值为%
                  formatter: '{value}kW',
                  textStyle: {
                    color: '#000' //y轴刻度数值颜色
                  }
                },
                splitLine: {
                  lineStyle: {
                    type: 'solid'
                  }
                }
              },
              dataZoom: [{
                // show:false,
                zoomOnMouseWheel: true,
                type: 'slider',
                realtime: true, //拖动滚动条时是否动态的更新图表数据
                height: 20, //滚动条高度
                // start: _this.cur_data - 8.4, //滚动条开始位置（共100等份）
                // end: _this.cur_data //结束位置（共100等份）
              }, {
                type: 'inside', //鼠标滚轮
                realtime: true,
              }, ],
              series: [{
                connectNulls: true,
                name: data.chart.series[0].name,
                data: data.chart.series[0].data,
                type: 'line',
                // symbol: 'none',
                itemStyle: {
                  normal: {
                    lineStyle: {
                      color: 'rgb(78,205,184)'
                    }
                  }
                },
                lineStyle: {
                  type: 'dotted'
                },
              }]
            };
            electricity.setOption(option);
            if (this.value == dateFormatter(new Date(), false)) {
              this.ws1.close()
              //光热发电曲线图 websocket 推送
              let arr1 = []
              // console.log(this.lighthotChartData)
              for (let item of this.lighthotChartData.series) {
                arr1.push(item.id)
              }
              if ('WebSocket' in window) {
                // let userToken = _this.$cookie.get('token')
                // ws = new WebSocket("wss://echo.websocket.org");
                this.ws1 = new WebSocket(window.SITE_CONFIG.wsBaseUrl+ token + "/lightheat" + "/curve");
                this.ws1.onopen = function (evt) {
                  // console.log(arr1);
                  _this.ws1.send(arr1);
                };
                this.ws1.onmessage = function (evt) {
                  /* let receive = {
                    id: "1504",
                    val: "100"
                  } */
                  let data = JSON.parse(evt.data)
                  // console.log(data)
                  for (let i = 0; i < _this.lighthotChartData.series.length; i++) {
                    if (_this.lighthotChartData.series[i].id == data.id) {
                      _this.lighthotChartData.series[i].data.push(data.value)
                    }
                  }
                  let chart = echarts.init(document.getElementById("light-left"))
                  chart.setOption(option);
                };
                this.ws1.onclose = function (evt) {
                  console.log("Connection closed.");
                };
              } else {
                alert('当前浏览器 Not support websocket')
              }
            } else {
              this.ws1.close()
            }
          }
        })
      }
    },
    filters: {
      runmode(value) {
        if (value == '' || value == null) {
          return '故障'
        } else
          return value
      },
      runStatus(value) {
        if (value == '' || value == null) {
          return "停机"
        } else
          return value
      },
      heatStrategy(value) {
        if (value == '' || value == null) {
          return '本地'
        } else
          return value
      },
      nonull(val) {
        if (val == null || val == '') {
          return 0;
        } else
          return val
      }
    }
  }

</script>
<style scoped>
  .light_hot .unit {
    color: #303133;
    font-size: 14px;
    margin-left: 3%;
    font-weight: 300;
  }

  .light_hot .el-input--medium .el-input__inner {
    text-align: center;
  }

  .light_hot p {
    display: block;
    -webkit-margin-before: 0em;
    -webkit-margin-after: 0em;
    -webkit-margin-start: 0px;
    -webkit-margin-end: 0px;
  }

  .light_hot {
    width: 100%;
    height: 100%;
    margin: 0;
  }

  .light_hot .hot {
    width: 100%;
    height: 100%;
  }

  .light_hot .hot-top {
    width: 100%;
    height: 40%;
    border-bottom: 5px solid #ccc;
    position: relative;
  }

  .light_hot .hot-left {
    width: 75%;
    height: 100%;
    border-right: 5px solid #ccc;
    display: inline-block;
    vertical-align: middle;
    position: relative;
  }

  .light_hot .lighthot-top-input {
    /* width: 20%; */
    padding: 0.5% 0 0 0;
    text-align: center;
    /* float: right;
	margin-right: 3%;  */
    /* margin-left: 70% */
    position: absolute;
    right: 80px;
    top: -5%;
    z-index: 999;
  }

  .light_hot .hot-top-input input {
    width: 75%;
    padding: 1%;
    text-align: center;
    border: 1px solid #ccc;
    font-size: 16px;
  }

  .light_hot #light-left {
    width: 100%;
    height: 100%;
  }

  .light_hot .hot-right {
    width: 24.2%;
    display: inline-block;
    vertical-align: middle;
    margin: 0;
    text-align: center;
    height: 100%;
    font-size: 1vw;
  }

  .light_hot .hot-right img {
    width: 2vw;
    height: 2vw;
  }

  .light_hot .hot-right-list {
    width: 100%;
    margin: 5% auto;
    line-height: 300%;
  }

  .light_hot .hot-right-list img {
    display: inline-block;
    vertical-align: middle;
  }

  .light_hot .hot-right-list p {
    display: inline-block;
    vertical-align: middle;
    margin-left: 5px;
  }

  .light_hot .hot-right-list span {
    color: rgb(0, 199, 187);
    font-size: 24px;
    margin-left: 0px;
  }

  .light_hot .hot-bottom {
    width: 100%;
    height: 59%;
    margin: 0;
  }

  .light_hot .hot-list {
    margin: 0 auto;
    /* background-color: #fff; */
    box-sizing: content-box;
  }

  /* .hot-list-data{
	width: 28%;
	height: 45%;
	background-color: #fff;
	border: 1px solid #ccc;
	display: inline-block;
	vertical-align: middle;
	margin-top: 1%;
	margin-left: 3.5%;
	box-shadow: 5px 5px 10px #ccc; 
} */
  .light_hot .data-title {
    width: 100%;
    border-bottom: 1px solid #ccc;
    text-align: center;
    padding: 3% 0;
  }

  .light_hot .data-title img {
    width: 6%;
    display: inline-block;
    vertical-align: middle;
  }

  .light_hot .data-title p {
    margin: 0 2%;
    display: inline-block;
    vertical-align: middle;
    font-size: 1vw;
  }

  .light_hot .data-echarts {
    width: 100%;
    height: 100%;
  }

  .light_hot .hot-text {
    float: left;
    margin-left: 15%;
  }

  .light_hot .hot-list {
    width: 100%;
    height: 100%;
    padding: 2% 0 0 0;
  }

  .light_hot .s-hot-list {
    width: 96%;
    height: 90%;
    padding: 1%;
    border: 2px solid #ccc;
    overflow-y: scroll;
    margin: 0% 0 0 2%;
    display: inline-block;
    vertical-align: middle;
    border-radius: 10px;
    box-sizing: content-box;
  }

  .light_hot .hot-list-data {
    width: 24%;
    height: 36%;
    margin-right: 1%;
    margin-bottom: 4%;
    display: inline-block
  }

  .light_hot .hot-right-list {
    margin: 0 auto;
    line-height: 400% !important;
  }

  .light_hot .light-right-words {
    color: #4ecab2;
    font-size: 18px;
    font-weight: 700
  }

  .light_hot .hot-right table {
    width: 80%;
    height: 100%;
    margin: 0 10%
  }

  .light_hot .hot-right table tr td {
    padding-bottom: 5%;
    height: 20%;
    text-align: left;
    /* font-size: 20px; */
  }

  /* 定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸

  ::-webkit-scrollbar {
    width: 10px;
    height: 16px;
    background-color: #fff;
  }

  /*定义滚动条轨道 内阴影+圆角*/

  /* ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: #fff;
  } */

  /*定义滑块 内阴影+圆角*/

  /*  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #ccc;
  }  */

</style>
