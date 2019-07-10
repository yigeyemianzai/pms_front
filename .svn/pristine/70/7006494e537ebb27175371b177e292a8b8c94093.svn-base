<template>
  <div class="pre" id="pre">
    <div class="pre-top inclear">
      <div class="pre-left">
        <!-- <div class="pre-top-input">
          <input type="date" name="date" />
        </div> -->
        <div class="light_heat-input">
          <el-date-picker type="date" v-model="value" format="yyyy-MM-dd" value-format="yyyy-MM-dd" :picker-options="pickerOptions">
          </el-date-picker>
        </div>
        <div id="pre-left"></div>
      </div>
      <div class="pre-right inclear">
        <!-- <div class="pre-right2">
          <div class="pre-right2-list inclear">
            <img src="~@/assets/images/v09.png" />
            <p>系统今日耗能：<span>{{precisioninfo[0].val}}<span class="unit">kWh</span></span>
            </p>
          </div>
          <div class="pre-right2-list inclear">
            <img src="~@/assets/images/v07.png" />
            <p>系统本月耗能：<span>{{precisioninfo[1].val}}<span class="unit">kWh</span></span>
            </p>
          </div>
          <div class="pre-right2-list inclear">
            <img src="~@/assets/images/v08.png" />
            <p>系统累计耗能：<span>{{precisioninfo[2].val}}<span class="unit">kWh</span></span>
            </p>
          </div>
          <div class="pre-right2-list inclear">
            <img src="~@/assets/images/v014.png" />
            <p>室内温度:<span>{{precisioninfo[3].val}}<span class="unit">℃</span></span>
            </p>
          </div>
          <div class="pre-right2-list inclear">
            <img src="~@/assets/images/v014.png" />
            <p>室外温度:<span>{{precisioninfo[4].val}}<span class="unit">℃</span></span>
            </p>
          </div>
        </div> -->
        <table :data='precisioninfo'>
          <tr>
            <td><img src="~@/assets/images/v09.png"></td>
            <td><span>系统今日耗能:</span></td>
            <td class="light-right-words">{{precisioninfo.todayKW | nonull}}<span class="unit">kWh</span></td>
          </tr>
          <tr>
            <td><img src="~@/assets/images/v07.png" /></td>
            <td><span>系统本月耗能:</span></td>
            <td class="light-right-words">{{precisioninfo.monthKW | nonull}}<span class="unit">kWh</span></td>
          </tr>
          <tr>
            <td><img src="~@/assets/images/v08.png" /></td>
            <td><span>系统累计耗能:</span></td>
            <td class="light-right-words">{{precisioninfo.totalKW | nonull}}<span class="unit">kWh</span></td>
          </tr>
          <tr>
            <td><img src="~@/assets/images/v014.png" /></td>
            <td><span>室内温度:</span></td>
            <td class="light-right-words">{{precisioninfo.temp | nonull}}<span class="unit">℃</span></td>
          </tr>
          <tr>
            <td><img src="~@/assets/images/v014.png" /></td>
            <td><span>室内湿度:</span></td>
            <td class="light-right-words">{{precisioninfo.humidity | nonull}}<span class="unit">%RH</span></td>
          </tr>
        </table>
      </div>
    </div>
    <div class="pre-top_l">
      <div class='list-data' v-for="item in premeterData" ::key="item.id">
        <div class='list-data-title'>{{item.name}}</div>
        <div class='list-echarts' :id="'list-echarts' + item.id "></div>
      </div>
    </div>
    <div class="pre-top_r">
      <div class="pre_status" v-for="item in equipment" ::key="item.id">
        <div class="pre_equipment">{{item.name}}</div>
        <div class="pre_equipment_img">
          <el-tooltip :content="item.run_status | runStatus" placement="left" effect="light" offset="0" :enterable="false"
            hide-after="0">
            <img v-if="item.run_status ==0 ||item.run_status ==''" src="~@/assets/images/pre2.png" alt="">
            <img v-else src="~@/assets/images/pre1.png" alt="">
          </el-tooltip>
          <el-tooltip :content="item.device_status | breakStatus" placement="right" effect="light" offset="0"
            :enterable="false" hide-after="0">
            <img v-if="item.device_status==0 ||item.run_status ==''" src="~@/assets/images/pre3.png" alt="">
            <img v-else src="~@/assets/images/pre4.png" alt="">
          </el-tooltip>
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
        precisioninfo: {},
        lineData: "", //精密空调 折线图数据
        premeterData: "", //精密空调 仪表图数据
        equipment: "", // 精密空调 设备状态
        cur_data: "",
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now() - 8.64e6
          }
        },
        max: '',
        ws1: '', //精密空调折线图ws
        ws2: '', //精密空调仪表图ws
      }
    },
    created() {
      let _this = this
      _this.pre_info();
      //精密空调 - 负荷曲线
      _this.$http({
        url: this.$http.adornUrl('/device/percision/chart/hourload'),
        method: 'post',
        data: this.$http.adornData({
          'date': this.value
        }),
      }).then(({
        data
      }) => {
        console.log(data)

        if (data.msg === "success") {
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
          let xAxis_data = arr
          // this.cur_data = /* parseInt */ (data.chart.series[0].data.length / arr.length * 100)
          this.lineData = data.chart

          var electricity = echarts.init(document.getElementById('pre-left'));
          var option = {
            color: ['#4ECDB8', '#e00'],
            title: {
              x: "center",
              text: "精密空调24小时负荷",
              textStyle: {
                fontweight: "normal",
              },
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
            legend: {
              data: data.chart.legend,
              x: 120,
            },
            grid: {
              x: 50,
              y: '15%',
              x2: 50,

              borderWidth: 0
            },
            lineStyle: {
              color: 'rgb(255, 255, 255)'
            },
            xAxis: {
              boundaryGap: false,
              type: 'category',
              data: this.lineData.xAxis == null ? xAxis_data : this.lineData.xAxis,
              name: '时间',
              axisTick: true,
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
              name: 'kW',
              min: 0,
              max: this.lineData.series[0].data == false ? 800 : null,
              //y轴刻度     
              axisLine: {
                lineStyle: {
                  type: 'solid',
                  color: '#000', //y轴坐标轴颜色
                  width: '1' //坐标轴宽度
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
              name: data.chart.legend[0],
              data: data.chart.series[0].data,
              type: 'line',
              // symbol: 'none',
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
            },
             /* {
              connectNulls: true,
              name: data.chart.legend[1],
              data: data.chart.series[1].data,
              type: 'line',
              // symbol: 'none',
              itemStyle: {
                normal: {
                  lineStyle: {
                    color: '#e00'
                  }
                }
              },
              lineStyle: {
                type: 'dotted'
              }
            } */
          ]
          };
          electricity.setOption(option);
          //精密空调曲线图 websocket 推送
          if ('WebSocket' in window) {
            let arr = []
            // console.log(data.chart.series)
            for (let item of data.chart.series) {
              if(item.id!=null){
                arr.push(item.id)
              }
            }
            // console.log(arr)
            let token = _this.$cookie.get('token')
            // this.ws1 = new WebSocket("wss://echo.websocket.org");
            this.ws1 = new WebSocket(window.SITE_CONFIG.wsBaseUrl+ token + "/precision" + "/curve");
            this.ws1.onopen = function (evt) {
              _this.ws1.send(arr);
            };
            this.ws1.onmessage = function (evt) {
              let data = JSON.parse(evt.data)
              // console.log(data)
              // let data = {id:'78787',value:'300'}
              for (let i = 0; i < _this.lineData.series.length; i++) {
                if (_this.lineData.series[i].id == data.id) {
                  _this.lineData.series[i].data.push(data.value)
                }
              }
              let chart = echarts.init(document.getElementById("pre-left"))
              chart.setOption(option);
            };
            this.ws1.onclose = function (evt) {
              // console.log("Connection closed.");
            };
          } else {
            alert('当前浏览器 Not support websocket')
          }
        }
      })
      this.$http({
        url: this.$http.adornUrl('/device/percision/meter'),
        method: 'post',
        /* params: {
          equiptype: 1,
          type: 1
        }, */
      }).then(({
        data
      }) => {
        // console.log(data)
        if (data.msg === "success") {
          this.premeterData = data.chart.chart
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

            for (var i = 0; i < _this.premeterData.length; i++) {
              var id = 'list-echarts' + _this.premeterData[i].id
              this.max = _this.premeterData[i].max
              echarts.init(document.getElementById(id)).setOption(_this.$options.methods.mintorOption(_this.premeterData[
                i], colors[i % 4], this.max))
            }
            //精密空调仪表图websocket推送
            if ('WebSocket' in window) {
              let arr = []
              // console.log(data.chart.chart)
              for (let item of data.chart.chart) {
                arr.push(item.id)
              }
              // this.ws2 = new WebSocket("wss://echo.websocket.org");
              let token = _this.$cookie.get('token')
              this.ws2 = new WebSocket(window.SITE_CONFIG.wsBaseUrl+ token + "/precision" +
                "/meter");
                // this.ws2 = new WebSocket(window.SITE_CONFIG.wsBaseUrl + token + "/precision" +
                // "/meter");
              this.ws2.onopen = function (evt) {
                _this.ws2.send(arr);
              };

              this.ws2.onmessage = function (evt) {
                let data = JSON.parse(evt.data)
                // console.log(data)
                // let data ={id:'1000010000110024',value:'500'}
                for (let i = 0; i < _this.premeterData.length; i++) {
                  if (_this.premeterData[i].id == data.id) {
                    _this.premeterData[i].val = data.value
                    let id = 'list-echarts' + data.id
                    let chart = echarts.init(document.getElementById(id))
                    // console.log(_this.premeterData)
                    chart.setOption({
                      series: [{
                        data: [{
                          value: data.value
                        }]
                      }]
                    });
                  }
                }
                // for (let ids of _this.hotBottomdata) {
                //   if (ids.id == receive.id) {
                //     ids.data[0].value = receive.val
                //     obj=ids
                //   }
                // }

                // wd.close();
              };
              this.ws2.onclose = function (evt) {
                console.log("Connection closed.");
              };
            } else {
              alert('当前浏览器 Not support websocket')
            }
          })

        }
      })
    },
    mounted() {
      let _this = this
      document.getElementById("pre").style.height =
        window.innerHeight - 170 + "px";
      this.$http({
          url: this.$http.adornUrl('/device/percision/devicemonitor'),
          method: 'post',
        }).then(({
          data
        }) => {
          // console.log(data)
          if (data.msg === "success") {
            this.equipment = data.data
          }
        }),
        window.onresize = function () {
          if (document.getElementById('pre')) {
            document.getElementById('pre').style.height = (window.innerHeight - 170) + 'px'
            echarts.init(document.getElementById('pre-left')).resize();
            for (var i = 0; i < _this.premeterData.length; i++) {
              var id = 'list-echarts' + _this.premeterData[i].id
              echarts.init(document.getElementById(id)).resize();
            }
          }
        }
    },
    destroyed() {
      this.ws1.close()
      this.ws2.close()
    },
    watch: {
      'value': 'changeDate',
    },
    methods: {
      pre_info() {
        let _this = this
        _this.$http({
          url: _this.$http.adornUrl("/device/percision/info"),
          method: 'post'
        }).then(({
          data
        }) => {
          _this.precisioninfo = data.info
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
              formatter: '{value}' + value.data.unit,
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
              value: value.data.value == null ? 0 : value.data.value,
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
      changeDate() {
        let _this = this
        //精密空调 - 负荷曲线
        this.$http({
          url: this.$http.adornUrl('/device/percision/chart/hourload'),
          method: 'post',
          data: this.$http.adornData({
            'date': this.value
          }),
        }).then(({
          data
        }) => {
          // console.log(data)
          if (data.msg === "success") {
            // console.log(data)
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
            let xAxis_data = arr
            // this.cur_data = /* parseInt */ (data.chart.series[0].data.length / arr.length * 100)
            this.lineData = data.chart

            var electricity = echarts.init(document.getElementById('pre-left'));
            var option = {
              title: {
                x: "center",
                text: "精密空调24小时负荷",
                textStyle: {
                  fontweight: "normal",
                },
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
              legend: {
                data: data.chart.legend,
                x: 120,
              },
              grid: {
                x: 50,
                y: '15%',
                x2: 50,

                borderWidth: 0
              },
              lineStyle: {
                color: 'rgb(255, 255, 255)'
              },
              xAxis: {
                boundaryGap: false,
                type: 'category',
                data: data.chart.xAxis == null ? xAxis_data : data.chart.xAxis,
                name: '时间',
                axisTick: true,
                axisLine: {
                  lineStyle: {
                    type: 'solid',
                    color: '#000', //左边线的颜色
                    width: '2' //坐标线的宽度
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
                name: 'kW',
                min: 0,
                max: this.lineData.series[0].data == false ? 800 : null,
                //y轴刻度     
                axisLine: {
                  lineStyle: {
                    type: 'solid',
                    color: '#000', //y轴坐标轴颜色
                    width: '2' //坐标轴宽度
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
                // start: this.cur_data - 8.4, //滚动条开始位置（共100等份）
                // end: this.cur_data //结束位置（共100等份）
              }, {
                type: 'inside', //鼠标滚轮
                realtime: true,
              }, ],
              series: [{
                name: data.chart.legend[0],
                data: data.chart.series[0].data,
                type: 'line',
                // symbol: 'none',
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
              }
              /* , {
                connectNulls: true,
                name: data.chart.legend[1],
                data: data.chart.series[1].data,
                type: 'line',
                // symbol: 'none',
                itemStyle: {
                  normal: {
                    lineStyle: {
                      color: '#e00'
                    }
                  }
                },
                lineStyle: {
                  type: 'dotted'
                }
              } */
            ]
            };
            electricity.setOption(option);
            if (this.value == dateFormatter(new Date(), false)) {
              this.ws1.close()
              //精密空调曲线图 websocket 推送
              if ('WebSocket' in window) {
                let arr = []
                // console.log(data.chart.series)
                for (let item of data.chart.series) {
                  if(item.id!=null){
                arr.push(item.id)
              }
                }
                // console.log(arr)
                let token = _this.$cookie.get('token')
                // this.ws1 = new WebSocket("wss://echo.websocket.org");
                this.ws1 = new WebSocket(window.SITE_CONFIG.wsBaseUrl + token + "/precision" + "/curve");
                this.ws1.onopen = function (evt) {
                  _this.ws1.send(arr);
                };
                this.ws1.onmessage = function (evt) {
                  let data = JSON.parse(evt.data)
                  // console.log(data)
                  // let data = {id:'78787',value:'300'}
                  for (let i = 0; i < _this.lineData.series.length; i++) {
                    if (_this.lineData.series[i].id == data.id) {
                      _this.lineData.series[i].data.push(data.value)
                      // console.log(_this.lineData.series[i].data)
                    }
                  }
                  let chart = echarts.init(document.getElementById("pre-left"))
                  chart.setOption(option);
                };
                this.ws1.onclose = function (evt) {
                  // console.log("Connection closed.");
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
        if (val == '' || val == null) {
          return 0;
        } else
          return val
      },
      runStatus(val) {
        if (val == 0 || val == null) {
          return '停止';
        } else if (val == 1) {
          return '运行'
        }
      },
      breakStatus(val) {
        if (val == 0 || val == null) {
          return '正常';
        } else if (val == 1) {
          return '故障'
        }
      },
    }
  }

</script>
<style scoped>
  .pre .el-input--medium .el-input__inner {
    text-align: center;
  }

  .pre .light-right-words {
    color: #4ecab2;
    font-size: 18px;
    font-weight: 700
  }

  .pre .unit {
    color: #303133;
    font-size: 14px;
    margin-left: 20px;
    font-weight: 300;
  }

  .pre .light_heat-input {
    width: 15%;
    min-width: 220px;
    display: inline-block;
    position: absolute;
    top: -3%;
    right: 5%;
    z-index: 999;
  }

  .pre .pre_equipment,
  .pre .pre_equipment_img {
    display: inline-block;
    width: 49%;
  }

  .pre .pre_equipment {
    text-align: right;
    padding-right: 10%;
  }

  .pre .list-data {
    width: 24%;
    height: 50%;
    float: left;
    margin-right: 1%;
  }

  .pre .list-data-title {
    /* height: 20%; */
    /* line-height: height; */
    text-align: center;
    padding: 3% 0;
    border-bottom: 1px solid #ccc;
    font-size: 1vw;
  }

  .pre .list-echarts {
    height: 80%;
  }

  .clear {
    clear: both;
  }

  .clear:after,
  .inclear:after {
    content: "";
    display: block;
    clear: both;
    line-height: 0px;
  }

  .pre {
    width: 100%;
    height: 100%;
    /* margin: 0; */
  }

  .pre-top {
    width: 100%;
    height: 40%;
    border-bottom: 5px solid #ccc;
    position: relative;
    /* min-width: 1200px; */
    /* min-height:400px; */
    margin-bottom: 1%;
  }

  .pre-left {
    width: 75%;
    height: 100%;
    border-right: 5px solid #ccc;
    float: left;
    position: relative;
  }

  .pre-top-input {
    width: 20%;
    padding: 0.5%;
    text-align: center;
    float: right;
    margin-right: 3%;
  }

  .pre-top-input input {
    width: 75%;
    padding: 1%;
    text-align: center;
    border: 2px solid #ccc;
    font-size: 16px;
  }

  #pre-left {
    width: 100%;
    height: 100%;
  }

  .pre-right {
    width: 24.7%;
    height: 100%;
    float: left;
    margin: 0;
    text-align: center;
    font-size: 1vw;
  }

  .pre-right img {
    width: 2vw;
    height: 2vw;
  }

  .pre-right table {
    width: 80%;
    margin: 0 10% 0 10%;
    height: 100%;
  }

  .pre-right table tr {
    height: 20%;
  }

  .pre-right1 {
    width: calc(50% - 2.5px);
    min-width: 200px;
    float: left;
    height: 40%;
    display: none;
  }

  .pre-right1:first-child {
    border-right: 5px solid #ccc;
  }


  .pre-right-list {
    margin: 10% 0px;
    height: 20px;
    width: 170px;
    padding: 0px 15px;
  }

  .pre-right-list img {
    float: left;
    width: 20px;
    height: 20px;
  }

  .pre-right-list p {
    float: left;
    margin: 0 5px;
    font-size: 12px;
    line-height: 20px;
  }

  .pre-right-list span {
    color: rgb(0, 199, 187);
    font-size: 12px;
    margin-left: 10px;
    line-height: 20px;
  }


  .pre-right2 {
    float: left;
    width: 100%;
    padding-top: 20px;
    height: calc(60% - 25px);
    /*	border-top:5px solid #ccc;*/
  }

  .pre-right2-list {
    margin-left: 40px;
    padding: 10px 0 10px 0;
  }

  .pre-right2-list img {
    float: left;
    width: 40px;
    height: 40px;
  }

  .pre-right2-list p {
    float: left;
    /* margin: 0 20px; */
    margin: 0 0 0 20px !important;
    font-size: 20px;
    line-height: 35px;
  }

  .pre-right2-list span {
    color: rgb(0, 199, 187);
    font-size: 20px;
    margin-left: 10px;
    line-height: 20px;
  }

  .pre-bottom {
    width: 100%;
    height: 59%;
    margin: 0;
  }

  .bottom_button {
    width: 80%;
    height: 60px;
    margin: 0 auto;
  }

  .button_r {
    float: right;
    width: 7%;
  }

  .sub_buton {
    width: 70%;
    height: 24px;
    background-color: #ddd;
    border-radius: 5px;
    color: #333;
    text-align: center;
    font-size: 16px;
    line-height: 24px;
  }

  .pre-list {
    padding: 20px 0;
    width: 93%;
    height: 70%;
    margin-left: 7%;
    background-color: #fff;
  }

  .pre-top_l {
    width: 75%;
    height: 60%;
    /* border-right: 5px solid #ccc; */
    border: 2px solid #ccc;
    overflow-y: scroll;
    display: inline-block;
    border-radius: 10px;
  }

  .pre-top_r {
    width: 24.6%;


    height: 59%;
    /* float: left; */
    display: inline-block;
    overflow-y: scroll;
  }

  .pre-top_r img {
    width: 3.1vw;
    height: 3.1vw;
  }

  .pre-top_l_1 {
    width: 50%;
    float: left;
  }

  .pre-top_l_2 {
    width: 48%;
    float: left;
  }

  .pre-top_l_box {
    width: 100%;
    height: 40px;
    text-align: right;
    font-size: 20px;
    padding: 10px 0 10px 0;
    line-height: 40px;
  }

  .pre-top_l_img {
    width: 100%;
    height: 60px;
    font-size: 20px;
    padding: 10px 0 10px 30px;
    line-height: 40px;
    box-sizing: border-box;
  }

</style>
