<template>
  <div class="hths_content" id="hths_content">
    <div class="hot">
      <div class="hot-top">
        <div class="hot-left">
          <div class="hot-top-input">
            <el-date-picker v-model="value" :picker-options="pickerOptions" type="date" format="yyyy-MM-dd"
              value-format="yyyy-MM-dd" >
            </el-date-picker>
          </div>
          <div id="hot-left"></div>
        </div>
        <!-- <div class="hot-right">
          <table :data='hotRightDates'>
            <tr v-for="item in hotRightDates" :key=item.id>
              <td>
                <img :src="item.pic" />
              </td>
              <td>{{item.txt}}：</td>
              <td class="hot-right-words">{{item.val}}</td>
            </tr>
          </table>
        </div> -->
        <div class="hot-right">
          <table :data='hotRightDates'>
            <tr>
              <td><img src="~@/assets/images/hot-right-list1.png" /></td>
              <td>系统运行状态：</td>
              <td class="hot-right-words">{{hotRightDates[0].val | useStatus}}</td>
            </tr>
            <tr>
              <td><img src="~@/assets/images/hot-right-list2.png" /></td>
              <td>系统故障状态：</td>
              <td class="hot-right-words">{{hotRightDates[1].val | runStatus}}</td>
            </tr>
            <tr>
              <td><img src="~@/assets/images/hot-right-list3.png" /></td>
              <td>储能热体百分比: </td>
              <td class="hot-right-words">{{hotRightDates[2].val | nonull}} <span class="unit">%</span></td>
            </tr>
            <tr>
              <td><img src="~@/assets/images/shot-right-list2.jpg" /></td>
              <td>当前储热量: </td>
              <td class="hot-right-words">{{hotRightDates[3].val | nonull}} <span class="unit">{{wUnit}}</span></td>
            </tr>
            <tr>
              <td><img src="~@/assets/images/hot-right-list4.png" /></td>
              <td>今日供热量: </td>
              <td class="hot-right-words">{{energy | nonull}} <span class="unit">kWh</span></td>
            </tr>
          </table>
        </div>
      </div>
      <div class="hot-bottom">
        <div class="hot-list">
          <div class='s-hot-list'>
            <div class="hths-list-data" v-for='(item,index) in hotBottomdata' :key="item.id">
              <div class="hths-data-title">
                <!-- <img :src="'~@/assets/images/hot-data'+ (++index) +'.png'" /> -->
                <!-- <img :src=item.pic /> -->
                <p>{{item.name}}</p>
              </div>
              <div class="data-echarts" :id="'data-echarts'+ item.id"></div>
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
        hotRightDates: [{
          "id": "",
          "value": ""
        }, {
          "id": "",
          "value": ""
        }, {
          "id": "",
          "value": ""
        }, {
          "id": "",
          "value": ""
        }], // 右侧状态数据
        energy:'',
        value: dateFormatter(new Date(), false),
        hotBottomdata: '', //仪表图数据
        electricityData: '', // 折线图数据
        socket: null,
        cur_data: "",
        // 设置选择今天及以前的时间
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now() - 8.64e6
          }
        },
        sendMonitor: [],
        max:'',
        wUnit:'',
        ws1:'',//高温相变曲线图ws
        ws2:'',//高温相变信息ws
        ws3:'',//高温相变仪表图ws
      }
    },
    created() {
      
      let _this = this
      let token = this.$cookie.get('token')
      // 获取蓄热信息
      this.$http({
        url: this.$http.adornUrl("/device/highpower/info"),
        method: 'post'
      }).then(({
        data
      }) => {
        this.energy = data.energy
        this.hotRightDates = data.highPower
        if(new Number(this.hotRightDates[3].val)>1000){
          this.hotRightDates[3].val = (new Number(this.hotRightDates[3].val))/1000
          this.wUnit ='MWh'
        }else{
          this.hotRightDates[3].val = new Number(this.hotRightDates[3].val)
          this.wUnit = 'kWh'
        }
        //蓄热信息webdocket推送
        if ('WebSocket' in window) {
          // let userToken = _this.$cookie.get('token')
          // let token ="d90cdcc5e4910dddc9d57e6a8d3d3f36";
          let pageSign = "heatphase"
          let fun = "info"
          let arr = []
          for (let item of data.highPower) {
            arr.push(item.id)
          }
          // ws = new WebSocket("wss://echo.websocket.org");
          // ws = new WebSocket("window.SITE_CONFIG.wsBaseUrl?token="+token+"&pageSign="+pageSign+"&func="+fun);
          this.ws2 = new WebSocket(window.SITE_CONFIG.wsBaseUrl + token + "/" + pageSign + "/" + fun);
          this.ws2.onopen = function (evt) {
            _this.ws2.send(arr);
          };

          this.ws2.onmessage = function (evt) {
            let data = JSON.parse(evt.data)
            console.log(data)
            for (let i = 0; i < _this.hotRightDates.length; i++) {
              if (_this.hotRightDates[i].id == data.id) {
                _this.hotRightDates[i].val = data.value
              }
            }
            // console.log("Received Message: " + evt.data);
            // ws.close();
          }

          this.ws2.onclose = function (evt) {
            console.log("Connection closed.");
          }
        } else {
          alert('当前浏览器 Not support websocket')
        }

      })
      // 获取仪表盘数据
      this.$http({
        url: this.$http.adornUrl("/device/highpower/chart/monitor"),
        method: 'post'
      }).then(({
        data
      }) => {
        if (data.msg = 'success') {
          this.hotBottomdata = data.chart.series
          console.log(this.hotBottomdata)
          // DOM加载完毕再加载仪表
          this.$nextTick(() => {
            for (var i = 0; i < this.hotBottomdata.length; i++) {
              var id = 'data-echarts' + this.hotBottomdata[i].id
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
              // let maxValue = ''
              // if()
              this.max = this.hotBottomdata[i].max
              echarts.init(document.getElementById(id)).setOption(this.$options.methods.mintorOption(this.hotBottomdata[
                i], colors[i % 4],this.max))
            }
            //蓄热仪表图websocket推送
            if ('WebSocket' in window) {
              let arr = []
              console.log(data.chart.series)
              for (let item of data.chart.series) {
                console.log(item.id)
                arr.push(item.id)
              }
              // this.ws3 = new WebSocket("wss://echo.websocket.org");
              this.ws3 = new WebSocket(window.SITE_CONFIG.wsBaseUrl+ token + "/heatphase" + "/meter");
              // ws = new WebSocket(window.SITE_CONFIG.wsBaseUrl + "d90cdcc5e4910dddc9d57e6a8d3d3f36"+date.toLocaleString());
              this.ws3.onopen = function (evt) {
                _this.ws3.send(arr);
              };

              this.ws3.onmessage = function (evt) {
                let data = JSON.parse(evt.data)
                console.log(data)
                for (let i = 0; i < _this.hotBottomdata.length; i++) {
                  if (_this.hotBottomdata[i].id == data.id) {
                    _this.hotBottomdata[i].val = data.value
                    let id = 'data-echarts' + data.id
                    let chart = echarts.init(document.getElementById(id))
                    console.log(_this.hotBottomdata)
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
              this.ws3.onclose = function (evt) {
                console.log("Connection closed.");
              };
            } else {
              alert('当前浏览器 Not support websocket')
            }
          })
        }

      })
      // alert(this.value)
      this.lineChart()
    },
    mounted() {
      console.log(this.value)
      let that = this
      this.aaa();
      //监听页面窗口大小自适应
      window.onresize = function () {
        if (document.getElementById('hths_content')) {
          document.getElementById('hths_content').style.height = (window.innerHeight - 170) + 'px'
          echarts.init(document.getElementById('hot-left')).resize();
          for (var i = 0; i < that.hotBottomdata.length; i++) {
            var id = 'data-echarts' + that.hotBottomdata[i].id
            echarts.init(document.getElementById(id)).resize();
          }
        }
      }
    },
    destroyed () {
      this.ws1.close()
      this.ws2.close()
      this.ws3.close()
    },
    watch: {
        'value': 'pickDate',
    },
    methods: {
      aaa() {
        document.getElementById("hths_content").style.height =
          window.innerHeight - 170 + "px";
        // this.$refs.contentview.style.height=siteContentViewHeight().minHeight
      },
      lineChart() {
        let _this = this
        //蓄热负荷直线图
        this.$http({
          url: this.$http.adornUrl('/device/highpower/chart/energy'),
          method: 'post',
          data: this.$http.adornData({
            'date': this.value
          })
        }).then(({
          data
        }) => {
          if (data.msg === "success") {
            console.log(data)
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
            this.electricityData = data.chart
            var electricity = echarts.init(document.getElementById('hot-left'));
            var option = {
              title: {
                text: '高温相变24小时供热',
                textAlign: 'left',
                padding: [0, 0, 20, 50]
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
                x: 50, // 表格左右距离
                x2: 50
              },
              color: ['#4ECDB8', '#e00'],
              legend: {
                data: this.electricityData.legend
              },
              xAxis: [{
                type: 'category',
                boundaryGap: false,
                // data: arr,
                data: this.electricityData.xAxis ==null?arr:this.electricityData.xAxis,
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
              // {
              //   type: 'category',
              //   boundaryGap: false,
              //   // data: arr,
              //   data:  this.electricityData.xAxis2 ==null?arr:this.electricityData.xAxis2,
              //   axisLine: {
              //     lineStyle: {
              //       type: 'solid',
              //       color: '#000', //左边线的颜色
              //       width: '1' //坐标线的宽度
              //     }
              //   },
              //   axisLabel: {
              //     textStyle: {
              //       color: '#fff' //x轴刻度数值颜色
              //     }
              //   },
              //   splitLine: {
              //     show: false
              //   }
              // }
            ],
              yAxis: {
                name:'kW',
                min: 0,
                max: this.electricityData.series[0].data==false?800:null,
                type: 'value',
                axisLine: {
                  lineStyle: {
                    type: 'solid',
                    color: '#fff', //y轴坐标轴颜色
                    width: '2' //坐标轴宽度
                  }
                },

                axisLabel: {
                  //设置y轴数值为%
                  // formatter: '{value} kw',
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
                  xAxisIndex: 0,
                  name: this.electricityData.series[0].name,
                  data: this.electricityData.series[0].data,
                  type: 'line',
                  // symbol: 'none',
                  itemStyle: {
                    normal: {
                      lineStyle: {
                        color: '#4ECDB8'
                      }
                    }
                  }
                },
                {
                  // connectNulls: true,
                  // xAxisIndex: 1,
                  name: this.electricityData.series[1].name,
                  data: this.electricityData.series[1].data,
                  type: 'line',
                  // symbol: 'none',
                  itemStyle: {
                    normal: {
                      lineStyle: {
                        color: '#e00'
                      }
                    }
                  },
                  areaStyle: {
                    normal: {
                      // offset: 1,
                      color: 'rgba(238, 0, 0,0.4)'
                    }
                  },
                }
              ]
            }
            electricity.setOption(option)
            //高温相变曲线图 websocket 推送
            if ('WebSocket' in window) {
              let arr = []
              console.log(data.chart.series)
              for (let item of data.chart.series) {
                console.log(item.id)
                arr.push(item.id)
              }
              let token = _this.$cookie.get('token')
              // this.ws1 = new WebSocket("wss://echo.websocket.org");
              this.ws1 = new WebSocket(window.SITE_CONFIG.wsBaseUrl + token + "/heatphase" + "/curve");
              this.ws1.onopen = function (evt) {
                console.log("负荷曲线");
                _this.ws1.send(arr);
                console.log(arr)
              };
              this.ws1.onmessage = function (evt) {
                let data = JSON.parse(evt.data)
                console.log(data)
                // let data = {id:'1502',value:'800',time:'24:00'}
                for (let i = 0; i < _this.electricityData.series.length; i++) {
                  if (_this.electricityData.series[i].id == data.id) {
                    _this.electricityData.series[i].data.push(data.value)
                    // console.log(_this.electricityData.series[i].data)
                  }
                }
                let chart = echarts.init(document.getElementById("hot-left"))
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
      },
      mintorOption(value, col,max) {
        return Option = {
          series: [{
            max:max,
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
                fontWeight:700,
                color:col[2][1]
              }
            },
            pointer: { //指针样式
              length: '90%',
              width: 3
            },
            data: [{
              value: value.data[0].value==null?0:value.data[0].value,
              name: value.data[0].name,
              
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
      pickDate() {
        let _this = this
        this.$http({
          url: this.$http.adornUrl('/device/highpower/chart/energy'),
          method: 'post',
          data: this.$http.adornData({
            'date': this.value
          })
        }).then(({
          data
        }) => {
          if (data.msg === "success") {
            console.log(data)
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
            // this.electricityData = data.chart
            var electricity = echarts.init(document.getElementById('hot-left'));
            /* let arrhot = [];
            let leng = this.electricityData.series[1].data.length
            for( let i = 0;i<leng-1;i++){
              arrhot.push(this.electricityData.series[1].data[i])
              for( let j=0;j<59;j++){
                arrhot.push(null)
              }
            } 
            arrhot.push(this.electricityData.series[1].data[leng-1])
            console.log(arrhot); */
            var option = {
              title: {
                text: '高温相变24小时供热',
                textAlign: 'left',
                padding: [0, 0, 20, 50]
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
                x: 50, // 表格左右距离
                x2: 50
              },
              color: ['#4ECDB8', '#e00'],
              legend: {
                data: data.chart.legend
              },
              xAxis: [{
                type: 'category',
                boundaryGap: false,
                // data: arr,
                data: data.chart.xAxis ==null?arr:data.chart.xAxis,              
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
              // {
              //   type: 'category',
              //   boundaryGap: false,
              //   // data: arr,
              //   data: data.chart.xAxis2 ==null?arr:data.chart.xAxis2,              
              //   axisLine: {
              //     lineStyle: {
              //       type: 'solid',
              //       color: '#000', //左边线的颜色
              //       width: '1' //坐标线的宽度
              //     }
              //   },
              //   axisLabel: {
              //     textStyle: {
              //       color: '#fff' //x轴刻度数值颜色
              //     }
              //   },
              //   splitLine: {
              //     show: false
              //   }
              // }
            ],
              yAxis: [{
                name:'kW',
                min: 0,
                max: data.chart.series[0].data==false?800:null,
                type: 'value',
                axisLine: {
                  lineStyle: {
                    type: 'solid',
                    color: '#fff', //y轴坐标轴颜色
                    width: '2' //坐标轴宽度
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
              }],
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
                xAxisIndex: 0,
                  name: data.chart.series[0].name,
                  data: data.chart.series[0].data,
                  type: 'line',
                  // symbol: 'none',
                  itemStyle: {
                    normal: {
                      lineStyle: {
                        color: '#4ECDB8'
                      }
                    }
                  }
                },
                {
                  // connectNulls: true,
                  // xAxisIndex: 1,
                  name: data.chart.series[1].name,
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
                  areaStyle: {
                    normal: {
                      // offset: 1,
                      color: 'rgba(238, 0, 0,0.4)'
                    }
                  },
                }
              ]
            }
            electricity.setOption(option)
            if(this.value == dateFormatter(new Date(), false)){
              this.ws1.close()
                //高温相变曲线图 websocket 推送
            if ('WebSocket' in window) {
              let arr = []
              console.log(data.chart.series)
              for (let item of data.chart.series) {
                arr.push(item.id)
              }
              let token = _this.$cookie.get('token')
              // ws = new WebSocket("wss://echo.websocket.org");
              this.ws1 = new WebSocket(window.SITE_CONFIG.wsBaseUrl + token + "/heatphase" + "/curve");
              this.ws1.onopen = function (evt) {
                console.log("负荷曲线");
                _this.ws1.send(arr);
                console.log(arr)
              };
              this.ws1.onmessage = function (evt) {
                let data = JSON.parse(evt.data)
                console.log(data)
                for (let i = 0; i < _this.electricityData.series.length; i++) {
                  if (_this.electricityData.series[i].id == data.id) {
                    _this.electricityData.series[i].data.push(data.value)
                    console.log(_this.electricityData.series[i].data)
                  }
                }
                let chart = echarts.init(document.getElementById("hot-left"))
                chart.setOption(option);
              };
              this.ws1.onclose = function (evt) {
                // console.log("Connection closed.");
              };
            } else {
              alert('当前浏览器 Not support websocket')
            }
            }else{
              this.ws1.close()
            }
          }
        })
      }
    },
    filters: {
      // 系统运行状态
      useStatus: function (value) {
        if (value== null||value=='') {
          return "停机"
        } else 
          return value
        
      },
      // 系统故障状态
      runStatus: function (value) {
        if (value== null||value=='') {
          return "正常"
        } else 
          return value
        
      },
      nonull (val){
        if(val==null||val==''){
          return 0;
        }
        else
        return val
      }
    }
  };

</script>
<style scoped>
  .hths_content .s-hot-list {
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

  .hths_content .unit {
    color: #303133;
    font-size: 14px;
    margin-left: 2%;
    font-weight: 300;
  }

  .hths_content {
    width: 100%;
    height: 100%;
    margin: 0;
  }

  .hths_content .hot {
    width: 100%;
    height: 100%;
  }

  .hths_content .hot-top {
    width: 100%;
    height: 40%;
    border-bottom: 5px solid #ccc;
    position: relative;
  }

  .hths_content .hot-left {
    width: 75%;
    height: 100%;
    border-right: 5px solid #ccc;
    display: inline-block;
    vertical-align: middle;
    position: relative;
  }

  .hths_content .hot-top-input {
    /* width: 15%; */
    min-width: 220px;
    padding: 0.5% 0 0 0;
    text-align: center;
    float: right;
    position: absolute;
    right: 80px;
    top: -5%;
    z-index: 999;
    /* margin-right: 3%; */
    /* margin-left: 70%;
    height: 20%; */
    /* position: relative; */
    /* top: 0px; */
  }

  .hths_content .hot-top-input input {
    width: 100%;
    padding: 1%;
    text-align: center;
    border: 1px solid #ccc;
    /* font-size: 16px; */
  }

  #hot-left {
    width: 100%;
    height: 100%;
  }

  .hths_content .hot-right {
    width: 24.2%;
    display: inline-block;
    vertical-align: middle;
    margin: 0;
    text-align: center;
    font-size: 1vw;
  }

  .hths_content .hot-right img {
    width: 2vw;
    height: 2vw;
  }

  .hths_content .hths-right-list {
    width: 100%;
    margin: 5% auto;
  }

  .hths_content .hths-right-list img {
    display: inline-block;
    vertical-align: middle;
  }

  .hths_content .hths-right-list p {
    display: inline-block;
    vertical-align: middle;
    margin-left: 5px;
  }

  .hths_content .hths-right-list span {
    color: rgb(0, 199, 187);
    font-size: 24px;
    margin-left: 30px;
  }

  .hths_content .hot-bottom {
    width: 100%;
    height: 59%;
    margin: 0;
  }

  .hths_content .hot-list {
    /* width: 95%;
    height: 100%;
    margin: 0 auto;
    background-color: #fff; */
    /* width: 96%;
    height: 90%;
    padding: 1%;
    border: 2px solid #ccc;
    overflow-y: scroll;
    margin: 0% 0 0 2%;
    display: inline-block;
    vertical-align: middle;
    border-radius: 10px;
    box-sizing: content-box; */
    width: 100%;
    height: 100%;
    padding: 2% 0 0 0;
    margin: 0 auto;
    background-color: #fff;
    box-sizing: content-box;
  }

  .hths_content .hths-list-data {
    /* width: 28%;
    height: 45%;
    background-color: #fff;
    border: 1px solid #ccc;
    display: inline-block;
    vertical-align: middle;
    margin-top: 1%;
    margin-left: 3.5%;
    box-shadow: 5px 5px 10px #ccc; */
    width: 24%;
    height: 36%;
    margin-right: 1%;
    margin-bottom: 4%;
    display: inline-block
  }

  .hths_content .hths-data-title {
    width: 100%;
    border-bottom: 1px solid #ccc;
    text-align: center;
    padding: 3% 0;
  }

  .hths_content .hths-data-title img {
    width: 6%;
    display: inline-block;
    vertical-align: middle;
  }

  .hths_content .hths-data-title p {
    margin: 0 2%;
    display: inline-block;
    vertical-align: middle;
    font-size: 1vw;
  }

  .hths_content .data-echarts {
    width: 100%;
    height: 100%;
  }

  .hths_content .hot-right-words {
    color: #4ecab2;
    font-size: 18px;
    font-weight: 700
  }

  .hths_content .hot-right table {
    width: 80%;
    margin: 0 10%
  }

  .hths_content .hot-right table tr td {
    padding-bottom: 5%;
    text-align: left;
    /* font-size: 20px; */
  }

  .hths_content .hot-list-data {
    width: 30%;
    height: 45%;
  }

  .hths_content .data-title {
    width: 100%;
  }

</style>
