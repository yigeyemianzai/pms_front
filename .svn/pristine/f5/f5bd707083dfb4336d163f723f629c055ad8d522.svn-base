<template>
  <div class="ys_content" id="ys_content">
    <div class="s-air">
      <div class="s-air-top">
        <div class="s-air-left">
          <table class="s-air-left-info" :data='airLeftInfo'>
            <tr>
              <td><img src="~@/assets/images/s_icon1.png" /></td>
              <td class="leftinfow">系统用电效率:</td>
              <td><span class="leftinfo">{{airLeftInfo[0].val | nonull}}</span> %</td>
              <td><img src="~@/assets/images/s_icon2.png" /></td>
              <td class="leftinfow">系统综合能效:</td>
              <td><span class="leftinfo">{{airLeftInfo[1].val | nonull}}</span> %</td>
            </tr>
            <tr>
              <td><img src="~@/assets/images/s_icon3.png" /></td>
              <td class="leftinfow">系统可供给冷量:</td>
              <td><span class="leftinfo">{{airLeftInfo[2].val | nonull}}</span> kW</td>
              <td><img src="~@/assets/images/s_icon4.png" /></td>
              <td class="leftinfow">系统可供给热量:</td>
              <td><span class="leftinfo">{{airLeftInfo[3].val | nonull}}</span> kW</td>
            </tr>
            <tr>
              <td><img src="~@/assets/images/s_icon5.png" /></td>
              <td class="leftinfow">系统可储能时长:</td>
              <td><span class="leftinfo">{{airLeftInfo[4].val | nonull}}</span> h</td>
              <td><img src="~@/assets/images/s_icon6.png" /></td>
              <td class="leftinfow">系统可发电时长:</td>
              <td><span class="leftinfo">{{airLeftInfo[5].val | nonull}}</span> h</td>
            </tr>
            <tr>
              <td><img src="~@/assets/images/s_icon7.png" /></td>
              <td class="leftinfow">系统负荷:</td>
              <td><span class="leftinfo">{{airLeftInfo[6].val | nonull}}</span> kW</td>
              <td><img src="~@/assets/images/s_icon8.png" /></td>
              <td class="leftinfow">今日电耗:</td>
              <td><span class="leftinfo">{{energy | nonull }}</span> kWh</td>
            </tr>
          </table>
          <div class="clear"></div>
        </div>
        <div class="s-air-right">
          <!-- <div class="right-title">系统24h供热量</div> -->
          <div class="right-text">
            <!-- <div class="right-legend"></div>
					<p>发电量</p>
					<div class="right-legend use"></div>
					<p>用电量</p> -->
            <div class="ys_date">

              <el-date-picker v-model="value" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" :picker-options="pickerOptions">
              </el-date-picker>
            </div>
          </div>
          <div class="right-echarts" id="right-echarts"></div>
        </div>
      </div>
      <div class="bottom">
        <!-- <div class="ys_list">
				<div class="list-data">
					<div class="list-data-title">空气机出口流量</div>
					<div class="list-echarts" id="list-echarts1"></div>
				</div>
			</div>
			<div class="lists">
			</div> -->
        <div class="ys_list">
          <div class='ys-hot-list a1'>
            <div class='ys-hot-list-data' v-for='item in ysListData' :key='item.id'>
              <div class='ys-data-title'>
                <p>{{item.name}}</p>
              </div>
              <div class='ys-data-echarts' :id="'dataEcharts'+ item.id"></div>
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
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now() - 8.64e6
          }
        },
        airLeftInfo: [{
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
        ysListData: '', // 仪表图数据
        energy: "",
        cur_data: "", //折线图当前时间数据
        lineData: "",
        max: '',
        ws1: '', //压缩空气曲线图ws
        ws2: '', //压缩空气信息ws
        ws3: '', //压缩空气仪表图ws
      }
    },
    created() {
      let _this = this
      let token = _this.$cookie.get('token')
      this.$http({
        url: this.$http.adornUrl('/device/air/info'),
        method: 'post',
      }).then(({
        data
      }) => {
        if (data.msg === "success") {
          this.airLeftInfo = data.airpower
          this.energy = data.energy
          //压缩空气 信息webdocket推送
          if ('WebSocket' in window) {
            let arr = []
            console.log(data.airpower)
            for (let item of data.airpower) {
              arr.push(item.id)
            }
            let userToken = _this.$cookie.get('token')
            // ws = new WebSocket("wss://echo.websocket.org");
            this.ws2 = new WebSocket(window.SITE_CONFIG.wsBaseUrl + token + "/compressair" + "/info");
            this.ws2.onopen = function (evt) {
              console.log(arr);
              _this.ws2.send(arr);
            };

            this.ws2.onmessage = function (evt) {
              let data = JSON.parse(evt.data)
              console.log(data)
              for (let i = 0; i < _this.airLeftInfo.length; i++) {
                if (_this.airLeftInfo[i].id == data.id) {
                  _this.airLeftInfo[i].val = data.value
                  console.log(_this.airLeftInfo[i])
                }
              }
              /* for (let ids of _this.airLeftInfo) {
                if (ids.id === receive.id) {
                  ids.val = receive.val
                }
              } */
              console.log("Received Message: " + evt.data);
              // ws.close();
            };

            this.ws2.onclose = function (evt) {
              console.log("Connection closed.");
            };
          } else {
            alert('当前浏览器 Not support websocket')
          }
        }
      })
      this.init()

    },
    mounted() {
      this.aaa();
      var that = this
      window.onresize = function () {
        if (document.getElementById('ys_content')) {
          document.getElementById('ys_content').style.height = (window.innerHeight - 170) + 'px'
          for (var i = 0; i < that.ysListData.length; i++) {
            var id = 'dataEcharts' + that.ysListData[i].id
            echarts.init(document.getElementById(id)).resize();
          }
          echarts.init(document.getElementById("right-echarts")).resize();
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
      aaa() {
        document.getElementById("ys_content").style.height =
          window.innerHeight - 170 + "px";
      },
      init() {
        let _this = this
        let token = _this.$cookie.get('token')
        //压缩空气负荷折线图
        this.$http({
          url: this.$http.adornUrl('/device/air/chart/energy'),
          method: 'post',
          data: this.$http.adornData({
            'date': this.value
          })
          /* params: {
            equiptype: 1,
            type: 1
          }, */
        }).then(({
          data
        }) => {
          this.lineData = data.chart
          if (data.msg === "success") {
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
            // alert(this.cur_data)
            let electricity = echarts.init(document.getElementById("right-echarts"));
            var option = {
              title: {
                text: '24小时供能',
                x: "5%",
                padding: [0, 0, 20, 50]
              },
              color: ['#4ECDB8', '#e00e00'],
              legend: {
                data: this.lineData.legend,
                x: "40%",
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
              grid: {
                x: 60,
                y: 30,
                x2: 40,
                y2: 60,
                borderWidth: 0
              },
              lineStyle: {
                color: "rgb(255, 255, 255)"
              },
              xAxis: {
                boundaryGap: false,
                type: "category",
                data: this.lineData.xAxis == null ? arr : this.lineData.xAxis,
                name: "时间",
                axisTick: true,
                axisLine: {
                  lineStyle: {
                    type: "solid",
                    color: "#000", //左边线的颜色
                    width: "1" //坐标线的宽度
                  }
                },
                axisLabel: {
                  textStyle: {
                    color: "#000" //x轴刻度数值颜色
                  }
                },
                splitLine: {
                  show: false
                }
              },
              yAxis: {
                name: "kW",
                min: 0,
                max: this.lineData.series[0].data == false ? 2000 : null,
                splitNumber: 4,
                //y轴刻度
                axisLine: {
                  lineStyle: {
                    type: "solid",
                    color: "#666", //y轴坐标轴颜色
                    width: "1" //坐标轴宽度
                  }
                },
                splitLine: {
                  show: false
                }
              },
              dataZoom: [{
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
                  name: this.lineData.series[0].name,
                  data: this.lineData.series[0].data,
                  type: "line",
                  // symbol: "none",
                  itemStyle: {
                    normal: {
                      lineStyle: {
                        color: "#4ECDB8"
                      }
                    }
                  },
                  lineStyle: {
                    type: "dotted"
                  },
                },
                {
                  // connectNulls: true,
                  name: this.lineData.series[1].name,
                  data: this.lineData.series[1].data,
                  type: "line",
                  // symbol: "none",
                  itemStyle: {
                    normal: {
                      lineStyle: {
                        color: "#e00e00"
                      }
                    }
                  },
                  lineStyle: {
                    type: "dotted"
                  },
                  areaStyle: {
                    normal: {
                      // offset: 1,
                      color: 'rgba(224, 14, 0,0.4)'
                    }
                  },
                }
              ]
            };
            electricity.setOption(option);
          }
          //压缩空气 - 负荷曲线推送
          if ('WebSocket' in window) {
            let arr1 = []
            for (let item of this.lineData.series) {
              console.log(item.id)
              arr1.push(item.id)
            }
            // ws = new WebSocket("wss://echo.websocket.org");
            this.ws1 = new WebSocket(window.SITE_CONFIG.wsBaseUrl + token + "/compressair" + "/curve");
            // ws = new WebSocket("/websocket/{userToken}");
            this.ws1.onopen = function (evt) {
              console.log(arr1);
              _this.ws1.send(arr1);
            };

            this.ws1.onmessage = function (evt) {
              let data = JSON.parse(evt.data)
              console.log(data)
              for (let i = 0; i < _this.lineData.series.length; i++) {
                if (_this.lineData.series[i].id == data.id) {
                  _this.lineData.series[i].data.push(data.value)
                }
              }
              let chart = echarts.init(document.getElementById("right-echarts"))
              chart.setOption(option);
              /* for (let ids of _this.lineData.series) {
                if (ids.id == receive.id) {
                  _this.lineData.series[0].data.push(receive.val)
                  console.log(_this.lineData.series)
                }
              }
              let chart = echarts.init(document.getElementById("right-echarts"))
              chart.setOption(option);
              console.log("Received Message: " + evt.data);
              ws.close(); */
            };
            this.ws1.onclose = function (evt) {
              console.log("Connection closed.");
            };
          } else {
            alert('当前浏览器 Not support websocket')
          }
        })
        //压缩空气 仪表图
        this.$http({
          url: this.$http.adornUrl('/device/air/chart/monitor'),
          method: 'post',
          /* params: {
            equiptype: 1,
            type: 1
          }, */
        }).then(({
          data
        }) => {
          if (data.msg === "success") {
            // console.log(data.chart.series)
            this.ysListData = data.chart.series
            this.$nextTick(() => {
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
              for (var i = 0; i < this.ysListData.length; i++) {
                var id = 'dataEcharts' + this.ysListData[i].id
                this.max = this.ysListData[i].max
                echarts.init(document.getElementById(id)).setOption(this.$options.methods.mintorOption(this.ysListData[
                  i], colors[i % 4], this.max))
              }
            })
            //压缩空气  仪表图websocket 推送
            if ('WebSocket' in window) {
              let arr = []
              for (let item of this.ysListData) {
                arr.push(item.id)
              }
              // ws = new WebSocket("wss://echo.websocket.org");
              this.ws3 = new WebSocket(window.SITE_CONFIG.wsBaseUrl + token + "/compressair" + "/meter");
              this.ws3.onopen = function (evt) {
                console.log(arr)
                _this.ws3.send(arr);
              };

              this.ws3.onmessage = function (evt) {
                let data = JSON.parse(evt.data)
                console.log(data)
                for (let i = 0; i < _this.ysListData.length; i++) {
                  if (_this.ysListData[i].id == data.id) {
                    _this.ysListData[i].val = data.value
                    let id = 'dataEcharts' + data.id
                    let chart = echarts.init(document.getElementById(id))
                    console.log(_this.ysListData)
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
      },
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
              name: value.data[0].name
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
      changeDate() {
        let _this = this
        //压缩空气负荷折线图
        this.$http({
          url: this.$http.adornUrl('/device/air/chart/energy'),
          method: 'post',
          data: this.$http.adornData({
            'date': this.value
          })
          /* params: {
            equiptype: 1,
            type: 1
          }, */
        }).then(({
          data
        }) => {
          // this.lineData = data.chart
          if (data.msg === "success") {
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
            let electricity = echarts.init(document.getElementById("right-echarts"));
            var option = {
              title: {
                text: '24小时供能',
                x: "5%",
                padding: [0, 0, 20, 50]
              },
              color: ['#4ECDB8', '#e00e00'],
              legend: {
                data: data.chart.legend,
                x: "40%",
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
              grid: {
                x: 60,
                y: 30,
                x2: 40,
                y2: 60,
                borderWidth: 0
              },
              lineStyle: {
                color: "rgb(255, 255, 255)"
              },
              xAxis: {
                boundaryGap: false,
                type: "category",
                data: data.chart.xAxis == null ? arr : data.chart.xAxis,
                name: "时间",
                axisTick: true,
                axisLine: {
                  lineStyle: {
                    type: "solid",
                    color: "#000", //左边线的颜色
                    width: "1" //坐标线的宽度
                  }
                },
                axisLabel: {
                  textStyle: {
                    color: "#000" //x轴刻度数值颜色
                  }
                },
                splitLine: {
                  show: false
                }
              },
              yAxis: {
                min: 0,
                max: this.lineData.series[0].data == false ? 2000 : null,
                name: "kW",
                splitNumber: 4,
                //y轴刻度
                axisLine: {
                  lineStyle: {
                    type: "solid",
                    color: "#666", //y轴坐标轴颜色
                    width: "1" //坐标轴宽度
                  }
                },
                splitLine: {
                  lineStyle: {
                    type: 'solid'
                  }
                }
              },
              dataZoom: [{
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
                  name: data.chart.series[0].name,
                  data: data.chart.series[0].data,
                  type: "line",
                  // symbol: "none",
                  itemStyle: {
                    normal: {
                      lineStyle: {
                        color: "#4ECDB8"
                      }
                    }
                  },
                  lineStyle: {
                    type: "dotted"
                  },
                },
                {
                  // connectNulls: true,
                  name: data.chart.series[1].name,
                  data: data.chart.series[1].data,
                  type: "line",
                  // symbol: "none",
                  itemStyle: {
                    normal: {
                      lineStyle: {
                        color: "#e00e00"
                      }
                    }
                  },
                  lineStyle: {
                    type: "dotted"
                  },
                  areaStyle: {
                    normal: {
                      // offset: 1,
                      color: 'rgba(224, 14, 0,0.4)'
                    }
                  },
                }
              ]
            };
            electricity.setOption(option);
            if (this.value == dateFormatter(new Date(), false)) {
              this.ws1.close()
              //压缩空气 - 负荷曲线推送
              if ('WebSocket' in window) {
                let arr1 = []
                for (let item of this.lineData.series) {
                  arr1.push(item.id)
                }
                // ws = new WebSocket("wss://echo.websocket.org");
                this.ws1 = new WebSocket(window.SITE_CONFIG.wsBaseUrl + token + "/compressair" +
                  "/curve");
                // ws = new WebSocket("/websocket/{userToken}");
                this.ws1.onopen = function (evt) {
                  console.log(arr1);
                  _this.ws1.send(arr1);
                };

                this.ws1.onmessage = function (evt) {
                  let data = JSON.parse(evt.data)
                  console.log(data)
                  for (let i = 0; i < _this.lineData.series.length; i++) {
                    if (_this.lineData.series[i].id == data.id) {
                      _this.lineData.series[i].data.push(data.value)
                    }
                  }
                  let chart = echarts.init(document.getElementById("right-echarts"))
                  chart.setOption(option);
                  /* for (let ids of _this.lineData.series) {
                    if (ids.id == receive.id) {
                      _this.lineData.series[0].data.push(receive.val)
                      console.log(_this.lineData.series)
                    }
                  }
                  let chart = echarts.init(document.getElementById("right-echarts"))
                  chart.setOption(option);
                  console.log("Received Message: " + evt.data);
                  ws.close(); */
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
      nonull(val) {
        if (val == null || val == '') {
          return 0;
        } else
          return val
      }
    }
  };

</script>
<style scoped>
  .ys_date .el-input--medium .el-input__inner {
    height: 30px;
    line-height: 30px;
    text-align: center;
  }

  .ys_date .el-input--medium .el-input__icon {
    line-height: 24px;
  }

  .ys_date {
    height: 60%;
    text-align: center;
    /* float: right; */
    position: absolute;
    z-index: 999;
    /* right: 0%; */
    left: 25%;
    top: -40%;
  }

  .ys_date .el-date-editor.el-input {
    width: 80%;
  }

  .ys_content {
    width: 100%;
    height: 100%;
    margin: 0;
  }

  .s-air {
    width: 100%;
    height: 100%;
  }

  .s-air-top {
    width: 100%;
    height: 35%;
    margin: 0;
    border-bottom: 5px solid #ccc;
  }

  .s-air-left {
    width: 60%;
    display: inline-block;
    vertical-align: middle;
    margin: 0;
  }

  .s-air-left img {
    width: 2vw;
    height: 2vw;
  }

  .ys_left-data {
    width: 30%;
    height: 20%;
    display: inline-block;
    vertical-align: middle;
    margin: 1.5% 8%;
  }

  .ys_left-data img {
    width: 9%;
    display: inline-block;
    vertical-align: middle;
    margin-left: 5%;
  }

  .ys_left-data-title {
    margin: 0;
    display: inline-block;
    vertical-align: middle;
    font-size: 20px;
    color: #686868;
  }

  .ys_left-data-num {
    font-size: 22px;
    color: rgb(0, 199, 187);
    display: inline-block;
    vertical-align: middle;
    margin: 0;
  }

  .ys_left-data-num span {
    font-size: 20px;
    color: #686868;
    margin-left: 0px;
  }

  .s-air-right {
    width: 38%;
    height: 100%;
    display: inline-block;
    vertical-align: middle;
    border-left: 5px solid #ccc;
  }

  .clear {
    clear: both;
  }

  .s-air-right {
    width: 38%;
    height: 100%;
  }

  .right-title {
    width: 100%;
    height: 10%;
    font-size: 26px;
    margin: 2% 0 0 2%;
  }

  .right-text {
    width: 98%;
    height: 10%;
    margin: 2% 0 0 2%;
    position: absolute;
    z-index: 999;
  }

  .right-legend {
    width: 5%;
    height: 35%;
    background-color: #0eb7ce;
    display: inline-block;
    vertical-align: middle;
    margin-left: 1%;
  }

  .right-text p {
    display: inline-block;
    vertical-align: middle;
    margin: 0;
    margin-left: 2%;
  }

  .right-text input {
    height: 60%;
    text-align: center;
    float: right;
    margin-right: 0%;
  }

  .use {
    background-color: #8392b5;
  }

  .right-echarts {
    width: 100%;
    height: 100%;
  }

  .bottom {
    width: 100%;
    height: 64.5%;
  }

  .ys_list {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    /* text-align: center; */
    padding-top: 2%
  }

  .ys_list-data {
    width: 13%;
    height: 80%;
    border: 1px solid #ccc;
    display: inline-block;
    vertical-align: middle;
    margin: 2% 0.3% 0 0.3%;
    box-shadow: 5px 4px 4px #ccc;
  }

  .list-data-title {
    width: 100%;
    padding: 5% 0;
    border-bottom: 1px solid #ccc;
  }

  .list-echarts {
    width: 100%;
    height: 83%;
  }

  .lists {
    width: 100%;
    height: 50%;
    margin: 0 auto;
    text-align: center;
  }

  .s-air-left-info {
    width: 90%;
    height: 90%;
    margin: 0 auto
  }

  .leftinfo {
    color: #0eb7ce;
    font-size: 20px
  }

  .s-air-left-info td {
    padding: 1%
  }

  .leftinfow {
    font-size: 1vw;
  }

  .ys-hot-list {
    width: 96%;
    height: 95%;
    padding: 1%;
    border: 2px solid #ccc;
    overflow-y: scroll;
    margin: 0% 0 0 2%;
    display: inline-block;
    vertical-align: middle;
    border-radius: 10px;
    box-sizing: content-box;
  }

  .ys-hot-list-data {
    width: 24%;
    height: 37%;
    margin-right: 1%;
    margin-bottom: 4%;
    display: inline-block
  }

  .ys-data-title {
    width: 100%;
    border-bottom: 1px solid #ccc;
    text-align: center;
    padding: 3% 0;
    font-size: 1vw;
  }

  .ys-data-title p {
    margin: 0 2%;
    display: inline-block;
    vertical-align: middle;
    /* font-size: 20px; */
    white-space: nowrap;
    text-overflow: ellipsis
  }

  .ys-data-echarts {
    width: 100%;
    height: 100%;
  }

  /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/

  ::-webkit-scrollbar {
    width: 10px;
    height: 16px;
    background-color: #fff;
  }

  /*定义滚动条轨道 内阴影+圆角*/

  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: #fff;
  }

  /*定义滑块 内阴影+圆角*/

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #ccc;
  }

</style>
