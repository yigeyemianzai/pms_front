<template>
  <div class="urgent" id="urgent">
    <div class="inform">
      <marquee behavior="scroll" direction='up' scrollamount="2" loop="infinite" id="rollAd" width="99.5%" height="20%" onmouseover="this.stop()"
        onmouseout="this.start()">
        <a>一、[2018-06-30 10:00-12:00] | 调控容量100kw</a>
      </marquee>
    </div>
    <div class="power-top">
      <!-- <span>时间范围</span>
      <el-time-select placeholder="起始时间" v-model="startTime" :picker-options="{
          start: '08:30',
          step: '00:15',
          end: '18:30'
        }">
      </el-time-select>
      <el-time-select placeholder="结束时间" v-model="endTime" :picker-options="{
          start: '08:30',
          step: '00:15',
          end: '18:30',
          minTime: startTime
        }">
      </el-time-select>
      <span>容量</span>
      <input class="center" type="text" name="" id="up_data" placeholder="100kw" value="100kw" @blur="changeCapacity()" />
      <el-input
        v-model="inputCapacity"
        placeholder="100kw"
        ></el-input>
      <div class="but" @click="urgentExecute()">互动</div>
      <div class="but but-on" @click="urgentSimulation()">仿真</div>
      <div class="clear"></div> -->
    </div>
    <div class="power-echarts" id="nopower-echarts"></div>
    <div class="power-foot-echarts">
      <!-- <div class="power-foot-title">
        <el-checkbox-group v-model="checkList">
          <el-checkbox :label="item.id"  v-for="item in checkLists" :key="item.id" class="syslist">{{item.name}}</el-checkbox>
        </el-checkbox-group>
      </div> -->
      <div class="foot-echarts" id="foot-echarts"></div>
    </div>
    <div class="foot-table">
      <el-table :data="tableData" :header-cell-style="getRowClass" border height='100%' style="width: 100%">
        <el-table-column prop="systemName" label="系统名称" width="180" align='center'>
        </el-table-column>
        <el-table-column prop="startTime" label="开始时间" align='center'>
        </el-table-column>
        <el-table-column prop="endTime" label="结束时间" align='center'>
        </el-table-column>
        <el-table-column prop="num" label="可调容量" align='center'>
        </el-table-column>
        <el-table-column prop="" label="可调设备数量" align='center'>
          <template slot-scope="scope">
            <span @click="showcount(scope.row.detailId)" style="color:#60afe8;cursor:pointer">{{scope.row.systemRegulaateVal}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- <el-dialog title="紧急需求响应" :visible.sync="centerDialogVisible" width="30%" font-weight='700' center>
      <p style="color:#000">本次紧急需求响应预计在2018-06-30</p>
      <p class="layer-date">10:00-12:00</p>
      <p style="color:#000">执行</p>
      <span slot-scope="footer" class="dialog-footer">
        <el-button type="primary" @click="eneryImpSimulation()">执行</el-button>
        <el-button @click="centerDialogVisible = false">放弃</el-button>
      </span>
    </el-dialog> -->
    <!-- <el-dialog
      title="能效提升"
      :visible.sync="centerDialogVisible"
      width="30%"
      font-weight='700'
      center
      :data='advanceData'>
      <p style="color:#000">本次能效提升预计在{{advanceData.date}}</p><p class="layer-date">{{advanceData.beginTime}}-{{advanceData.endTime}}</p><p style="color:#000">时间段执行</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="eneryImpSimulation()">确 定</el-button>
      </span>
    </el-dialog> -->
    <el-dialog title="" :visible.sync="dialogTableVisible">
      <el-table :data="gridData" :header-cell-style="dailogGetRowClass" border stripe>
        <el-table-column type="index" label="序号" width="100" align="center"></el-table-column>
        <el-table-column property="equipName" label="设备名称" width="150" align="center"></el-table-column>
        <el-table-column property="controlStartTime" label="开始时间" align="center"></el-table-column>
        <el-table-column property="controlEdnTime" label="结束时间" align="center"></el-table-column>
        <el-table-column property="equipRegulateVal" label="可调容量" width="120" align="center"></el-table-column>
        <el-table-column property="" label="手动修正" width="120" align="center">
          <template slot-scope="scope">
            <el-popover placement="right" width="160" trigger="click" v-model="scope.row.deletetype">
              <p>确定删除本条数据吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="scope.row.deletetype = false">取消</el-button>
                <el-button type="primary" size="mini" @click="scope.row.deletetype= false">确定</el-button>
              </div>
              <el-button slot="reference" icon="el-icon-delete" @click="showtips(scope.row)"></el-button>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <!-- <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="2">
      </el-pagination> -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" background
        layout="prev, pager, next" :total="2">
      </el-pagination>
    </el-dialog>

  </div>
</template>
<script>
  export default {
    data() {
      return {
        inputCapacity: '',  // 容量值
        tableData: [],
        value4: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
        startTime: '10:00',
        endTime: '12:00',
        centerDialogVisible: false,
        dialogTableVisible: false,
        gridData: [],
        visible: false,
        currentPage: '',
        pagesize:'',
          totals:"",
          totalPage:"",
        checkLists:[
          {'name':'VRV空调系统',id: 1},

        ],
        checkList: [1],
        energyXAxis: [],  // X轴
        energyLegend: [],  // 标注信息
        energySeries: [],  // 数据值
        subsystemXAxis: [],  // X轴
        subsystemLegend: [],  // 标注信息
        subsystemSeries: [],  // 数据值
        advanceData: '',
        sysid:[],
        ws1:'',
      }
    },
    created () {
      
    },
    mounted() {
      document.getElementById('urgent').style.height = (window.innerHeight - 170) + 'px'
      this.$http({
        url: this.$http.adornUrl('/device/stategrid/exigencenone/chart/hourload'),
        method: 'post',
      }).then(({
        data
      }) => {
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
          // this.energyXAxis = JSON.parse(data.info.xAxis)
          this.energyXAxis = data.chart.xAxis
          this.energyLegend = data.chart.legend
          this.energySeries = data.chart.series
          this.initEnergyChart()
        }
      })
      this.$http({
        url: this.$http.adornUrl('/device/stategrid/exigenceNone/chart/system'),
        method: 'post',
        // params: {
        //   planid: "1",
        // },
      }).then(({
        data
      }) => {
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
            // this.tableData = data.sys
            // this.subsystemXAxis =(data.chart.xAxis==null?arr:JSON.parse(data.chart.xAxis))
            // this.subsystemLegend =  (data.chart.legend==null?['VRV空调系统']:data.chart.legend) 
            // this.subsystemSeries = (data.chart.series==null?[{name:'VRV空调系统',data:[]}]:data.chart.series) 
            this.subsystemXAxis =data.chart.xAxis
            this.subsystemLegend =  data.chart.legend
            this.subsystemSeries = data.chart.series
            // this.sysid =(data.chart.legend==null?['VRV空调系统']:data.chart.legend)
            // if(data.systemIds[0].energySysNane==null){
            //   this.checkLists =[{'name':'VRV空调系统',id: 1},]
            // }else{
            //   for(let i=0;i<data.systemIds.length;i++){
            //   let obj={}
            //   obj.name=data.systemIds[i].energySysNane
            //   obj.id=i+1
            //   this.checkLists.push(obj) 
            // }
            // }
            

          this.initSubsystemCharts(arr)
        }
      })
      this.$http({
        url: this.$http.adornUrl('/device/stategrid/equipSystemList'),
        method: 'post',
        data: this.$http.adornData({
            'type': 2
          })
      }).then(({
        data
      }) => {
        if (data.msg === "success") {
          // console.log(data.info)
          this.tableData = data.info
        }
      })
      /* //多选按钮
      this.$http({
        url: this.$http.adornUrl('/admin/tenergysystem/1000'),
        method: 'post',
      }).then(({
        data
      }) => {
        if (data.msg === "success") {
        for(let i=0;i<data.lists.length;i++){
          this.checkLists[i].name=data.lists[i].energySysNane
        }
        console.log(this.checkLists)
        }
      }) */
      window.onresize = function () {
        if (document.getElementById('urgent')) {
          document.getElementById('urgent').style.height = (window.innerHeight - 170) + 'px'
          echarts.init(document.getElementById('nopower-echarts')).resize();
          echarts.init(document.getElementById('foot-echarts')).resize();
        }
      }
    },
    destroyed() {
      this.ws1.close()
    },
    methods: {
      handleSizeChange: function (size) {
        this.pagesize = size;
      },
      handleCurrentChange: function (currentPage) {
        this.currentPage = currentPage;
      },
      initEnergyChart() {
        let _this = this
        var electricity = echarts.init(document.getElementById('nopower-echarts'));
        var option = {
          // brush: {
          //   xAxisIndex: 'all', // 指定哪些 xAxisIndex 可以被刷选。
          //   brushLink: 'all', // 不同系列间，选中的项可以联动。
          //   transformable: false, // 已经选好的选框是否可以被调整形状或平移,默认为true
          //   brushStyle: {
          //     color: 'rgba(255,140,180,0.2)'
          //   },
          // },
          title: {
            text: ' '
          },
          toolbox:{
            show:false
          },
          tooltip: {
            trigger: 'axis',
            // axisPointer: {
            //   type: 'cross'
            // }
          },
          legend: {
            data: this.energyLegend
          },
          color: ['#ff110f', '#9b9eeb', '#c46edd','#A0522D'],
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
          grid: {
            x: 80,
            y: 50,
          },
          xAxis: {
            boundaryGap: false,
            type: 'category',
            data: this.energyXAxis,
            name: '',
            axisTick: true,
            axisLine: {
              lineStyle: {
                type: 'solid',
                color: '#404040', //左边线的颜色
                width: '2' //坐标线的宽度
              }
            },
            axisLabel: {
              textStyle: {
                color: '#404040' //x轴刻度数值颜色
              }
            },
          },
          yAxis: {
            type: 'value',
            name: '可调容量',
            min: 0,
            max: this.energySeries[0].data==false?1000:null,
            //y轴刻度
            axisLabel: {
              //设置y轴数值为%
              formatter: '{value} kW',
              textStyle: {
                color: '#404040' //y轴刻度数值颜色
              }
            },
            axisLine: {
              lineStyle: {
                type: 'solid',
                color: '#404040', //y轴坐标轴颜色
                width: '2' //坐标轴宽度
              }
            }
          },
          series: [{
              name: this.energySeries[0].name,
              data: this.energySeries[0].data,
              type: 'line',
              smooth: true,
              itemStyle: {
                normal: {
                  lineStyle: {
                    color: '#ff110f'
                  }
                }
              }
            },
            {
              connectNulls: true,
              name: this.energySeries[1].name,
              data: this.energySeries[1].data,
              type: 'line',
              // smooth: true,
              itemStyle: {
                normal: {
                  lineStyle: {
                    color: '#9b9eeb'
                  }
                }
              },
            },
            {
              connectNulls: true,
              name: this.energySeries[2].name,
              data: this.energySeries[2].data,
              type: 'line',
              // smooth: true,
              itemStyle: {
                normal: {
                  lineStyle: {
                    color: '#c46edd'
                  }
                }
              },
            },
            {
              connectNulls: true,
              name: this.energySeries[3].name,
              data: this.energySeries[3].data,
              type: 'line',
              // smooth: true,
              itemStyle: {
                normal: {
                  lineStyle: {
                    color: '#A0522D'
                  }
                }
              },
            }
          ]
        };
        electricity.setOption(option);
        //非紧急需求响应曲线图 websocket 推送
              if ('WebSocket' in window) {
                let arr = []
                // console.log(_this.energySeries)
                for (let item of _this.energySeries) {
                  if(item.id!=null){
                    arr.push(item.id)
                  }
                }
                let token = _this.$cookie.get('token')
                _this.ws1 = new WebSocket(window.SITE_CONFIG.wsBaseUrl + token + "/exigencenone" + "/curve");
                _this.ws1.onopen = function (evt) {
                  _this.ws1.send(arr);
                };
                _this.ws1.onmessage = function (evt) {
                  let data = JSON.parse(evt.data)
                  // console.log(data)
                  // let data = {id:'1',value:'300'}
                  for (let i = 0; i < _this.energySeries.length; i++) {
                    if (_this.energySeries[i].id == data.id) {
                      _this.energySeries[i].data.push(data.value)
                    }
                  }
                  let chart = echarts.init(document.getElementById("nopower-echarts"))
                  chart.setOption(option);
                };
                this.ws1.onclose = function (evt) {
                  // console.log("Connection closed.");
                };
              } else {
                alert('当前浏览器 Not support websocket')
              }
        /* echarts.init(document.getElementById('power-echarts')).dispatchAction({
          type: 'brush',
          areas: [{
            brushType: 'lineX', // 指定选框的类型。还可以为 'rect', 'polygon', 'lineY'
            coordRange: ['10:00', '12:00'], // // 如果是『坐标系选框』，则使用 coordRange 来指定选框的范围。
            xAxisIndex: 0
          }]
        }); */
      },
      initSubsystemCharts(arr) {
        // console.log(this.subsystemXAxis)
        //     console.log(this.subsystemLegend)
        //     console.log(this.subsystemSeries)
        // this.subsystemXAxis =(data.chart.xAxis==null?arr:JSON.parse(data.chart.xAxis))
            // this.subsystemLegend =  (data.chart.legend==null?['VRV空调系统']:data.chart.legend) 
            // this.subsystemSeries = (data.chart.series==null?[{name:'VRV空调系统',data:[]}]:data.chart.series) 
            // console.log(echarts.init(document.getElementById('foot-echarts')))
        var electricity = echarts.init(document.getElementById('foot-echarts'));
        var option = {
          title: {
            text: ' '
          },
          tooltip: {
            trigger: 'axis',
            // axisPointer: {
            //   type: 'cross'
            // }
          },
          legend: {
            data: (this.subsystemLegend==null?['VRV空调系统']:this.subsystemLegend)
          },
          color: ['#ff110f', '#9b9eeb', '#c46edd'],
          dataZoom: [{
            startValue: '00:00'
          }, {
            type: 'inside'
          }],
          grid: {
            x: 50,
            y: 50,
          },
          xAxis: {
            boundaryGap: false,
            type: 'category',
            data: (this.subsystemXAxis==null?arr:this.subsystemXAxis),
            name: '',
            axisTick: true,
            axisLine: {
              lineStyle: {
                type: 'solid',
                color: '#404040', //左边线的颜色
                width: '2' //坐标线的宽度
              }
            },
            axisLabel: {
              textStyle: {
                color: '#404040' //x轴刻度数值颜色
              }
            },
          },
          yAxis: {
            type: 'value',
            name: '可调容量',
            min: 0,
            max: this.subsystemSeries==null||this.subsystemSeries[0].data==false?800:null,
            //y轴刻度
            axisLabel: {
              //设置y轴数值为%
              formatter: '{value} kW',
              textStyle: {
                color: '#404040' //y轴刻度数值颜色
              }
            },
            axisLine: {
              lineStyle: {
                type: 'solid',
                color: '#404040', //y轴坐标轴颜色
                width: '2' //坐标轴宽度
              }
            }
          },
          series: [{
              name: (this.subsystemSeries==null?[{name:'VRV空调系统',data:[]}]:this.subsystemSeries)[0].name,
              data: (this.subsystemSeries==null?[{name:'VRV空调系统',data:[]}]:this.subsystemSeries)[0].data,
              type: 'line',
              // smooth: true,
              itemStyle: {
                normal: {
                  lineStyle: {
                    color: '#ff110f'
                  }
                }
              }
            },
            // {
            //   name: this.subsystemLegend[1],
            //   data: this.subsystemSeries[1].data,
            //   type: 'line',
            //   smooth: true,
            //   itemStyle: {
            //     normal: {
            //       lineStyle: {
            //         color: '#9b9eeb'
            //       }
            //     }
            //   },
            // }
            /* ,
            {
              name: this.subsystemLegend[2],
              data: this.subsystemSeries[2].data,
              type: 'line',
              smooth: true,
              itemStyle: {
                normal: {
                  lineStyle: {
                    color: '#c46edd'
                  }
                }
              },
            } */
          ]
        };
        electricity.setOption(option);
      },
/*       // 互动按钮
      urgentExecute() {
        // 判断，如果没有仿真信息则不执行
        if (this.advanceData == '') {
          this.$message({
            message: '请先仿真数据信息',
            type: 'error'
          });
        }else if (this.advanceData != '') {
          this.centerDialogVisible = true
        }       
      }, */
      //  设置首行颜色
      getRowClass({
        row,
        column,
        rowIndex,
        columnIndex
      }) {
        if (rowIndex == 0) {
          return 'background:#666666;color:#fff;font-weight: 700'
        } else {
          return ''
        }
      },
      dailogGetRowClass({
        row,
        column,
        rowIndex,
        columnIndex
      }) {
        if (rowIndex == 0) {
          return 'background:#4c5a65;color:#fff;font-weight: 700'
        } else {
          return ''
        }
      },
      // 仿真按钮
      // urgentSimulation () {
      //   console.log(this.startTime, this.endTime, this.inputCapacity)
      //   this.$http({
      //     url: this.$http.adornUrl('/stategrid/answer/simulation'),
      //     method: 'post',
      //     /* params: {
      //       plan: "1",
      //       sys: ["1", "2"]
      //     }, */
      //   }).then(({
      //     data
      //   }) => {
      //     if (data.msg === "success") {
      //       this.advanceData= data.plan
      //       this.startTime = data.plan.beginTime
      //       this.endTime = data.plan.endTime
      //       this.inputCapacity = data.plan.economy + 'KW'
      //       this.tableData = data.sys
      //       this.subsystemXAxis = data.chart.xAxis
      //       this.subsystemLegend = data.chart.legend
      //       this.subsystemSeries = data.chart.series
      //       this.$options.methods.initSubsystemChart.bind(this)()
      //       // 提示仿真成功消息
      //       this.$message({
      //         message: '恭喜你，仿真成功',
      //         type: 'success'
      //       });
      //     }
      //   })
      // },
      /* eneryImpSimulation() {
        console.log(this.advanceData.planId)
        this.$http({
          url: this.$http.adornUrl('/stategrid/answer/execute'),
          method: 'post',
          params: {
            planid: this.advanceData.planId,
          },
        }).then(({
          data
        }) => {
          if (data.msg === "success") {
            this.$message({
              message: '执行成功',
              type: 'success'
            });
            this.centerDialogVisible = false
          } else {
            this.$message({
              message: '执行失败',
              type: 'error'
            });
          }
        })
      }, */
      // 点击表格可调设备数量的事件
      showcount(id) {
        this.dialogTableVisible = true
        this.$http({
          url: this.$http.adornUrl('/device/stategrid/equips'),
          method: 'post',
          data: this.$http.adornData({
              "detailId": id,
              "page": "1",
              "limit": "5"
          })
        }).then(({
          data
        }) => {
          // console.log(data)
          this.gridData = data.info.list
          this.currentPage = data.info.currPage
          this.pagesize=data.info.pageSize
            this.totals = data.info.totalCount
            this.totalPage = data.info.totalPage
        })
      },
      // 点击表格删除按钮提示
      showtips(index, row) {
        // console.log(index, row)
        this.visible2 = true
      }
    }
  }

</script>
<style>
  .urgent {
    width: 100%;
    height: 100%;
  }
  .urgent .el-checkbox{
  margin-left: 30px;
  width: 150px;
}
  #rollAd {
    margin: 0 auto;
    text-align: center;
    border: 5px solid #ccc;
    background-color: #f0f0f0;
    border-radius: 10px;
    padding: 0%;
  }

  #rollAd a {
    margin: 0;
    line-height: 210%;
    color: #fe4c4a;
  }

  .urgent .power-top {
    width: 100%;
    min-height: 3%;
    padding: 1% 0;
    text-align: center;
  }

  .urgent .power-top input {
    width: 8%;
    height: 5%;
    padding: 0.3% 0;
    text-align: center;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 20px;
    display: inline-block;
  }

  .urgent .power-top span {
    margin: 0 1%;
    font-size: 20px;
  }

  .urgent .but {
    width: 5%;
    float: right;
    background-color: #125f97;
    color: #fff;
    padding: 0.5% 0.2%;
    border-radius: 10px;
    margin: 0 1%;
    cursor: pointer;
  }

  .urgent .power-echarts {
    width: 95%;
    min-height: 50%;
    margin-left: 5%;
  }

  .urgent .power-foot-echarts {
    width: 40%;
    height: 45%;
    display: inline-block;
    vertical-align: middle;
  }

  .urgent .power-foot-title {
    width: 90%;
    /* text-align: center; */
    padding: 2% 0;
    padding-top: 5%;
    margin-left: 10%;
  }

  .urgent .list-checkbox {
    display: inline-block;
    vertical-align: middle;
    margin: 0 1%;
    cursor: pointer;
    width: 12%;
  }

  .urgent .list-checkbox span {
    vertical-align: middle;
  }

  .urgent .checkbox {
    width: 18px;
    height: 18px;
    vertical-align: middle;
  }

  .urgent .foot-echarts {
    width: 90%;
    height: 80%;
    margin-left: 10%;
  }

  .urgent .foot-table {
    width: 50%;
    height: 40%;
    display: inline-block;
    vertical-align: middle;
    margin-left: 2%;
    padding: 10px
  }

  .urgent .name {
    width: 18%;
    display: inline-block;
    vertical-align: middle;
    text-align: center;
    background-color: #666;
    color: #fff;
    padding: 2% 0;
  }

  /* .data {
    width: 20%;
    background-color: #fff;
    color: #000;
    display: inline-block;
    vertical-align: middle;
    text-align: center;
    padding: 1% 0;
  } */

  .urgent .table-title {
    border-bottom: 2px solid #ccc;
  }

  #layui-layer1 {
    border-radius: 5px;
  }

  .layui-layer-content {
    background-color: #f0f0f0;
    padding: 1% 0;
  }

  .layui-layer-content p {
    text-align: center;
    letter-spacing: 1px;
    line-height: 25px;
    font-size: 16px;
  }

  .layer-date {
    color: #60afea;
  }

  .urgent .num {
    color: #61afed;
    cursor: pointer;
  }

  .urgent .layer-data {
    width: 98%;
    height: 90%;
    margin: 0 auto;
    border: 2px solid #ccc;
  }

  .urgent .layer-page {
    text-align: center;
    margin: 1% 0 0 0;
  }

  .urgent .file-list {
    width: 5%;
    height: 8%;
    border: 1px solid #ccc;
    border-radius: 5px;
    text-align: center;
    padding: 0.5% 0;
    cursor: pointer;
    display: inline-block;
    vertical-align: middle;
  }

  .urgent .file-num {
    width: 3%;
    height: 8%;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 0.5% 0;
    cursor: pointer;
    display: inline-block;
    vertical-align: middle;
    margin: 0 0.3%;
  }

  .urgent .data-list {
    width: 100%;
  }

  .urgent .data-list div {
    float: left;
    background-color: #4e5c67;
    color: #fff;
    text-align: center;
  }

  .urgent .list-id {
    width: 10%;
    padding: 1% 1%;
  }

  .urgent .list-name {
    width: 25%;
    padding: 1% 1%;
  }

  .urgent .list-sdate {
    width: 15%;
    padding: 1% 1%;
  }

  .urgent .list-odate {
    width: 15%;
    padding: 1% 1%;
  }

  .urgent .list-size {
    width: 12%;
    padding: 1% 1%;
  }

  .urgent .list-revise {
    width: 11%;
    padding: 1% 1%;
  }

  .urgent .revise-bg {
    background: url(~@/assets/images/revise-bg.png) 50% 50% no-repeat;
    padding: 1.6% 1%;
    cursor: pointer;
  }

  .urgent.list-one div {
    background-color: #d8ebfa;
    color: #000;
  }

  .urgent .list-two div {
    background-color: #eff6fc;
    color: #000;
  }

  .urgent .clear {
    clear: both;
  }

  .urgent .name-padding {
    padding: 0.9% 1%;
  }

  .urgent .layer-tips {
    border: 0;
    background-color: #fff;
    color: #000;
    text-align: center;
  }

  .urgent .layer-tips div:flr {
    display: inline-block;
    vertical-align: middle;
    padding: 1% 1%;
  }

  .layui-layer-content {
    background-color: #fff !important;
  }

  i.layui-layer-TipsL {
    display: none !important;
  }

  i.layui-layer-TipsR {
    display: none !important;
  }

  .layui-layer-btn a {
    padding: 0 13px !important;
  }

  .urgent .power-top input {
    width: 80%;
  }

  .urgent .el-table td,
  .urgent .el-table th.is-leaf {
    border-color: #000
  }

  .urgent .el-table--border {
    border-color: #666666;
    border-radius: 10px
  }

  .urgent .el-table__body-wrapper {
    /*  overflow-y: scroll */
  }

  .urgent .el-table--border {
    border-right: 1px solid #666;
    border-bottom: 1px solid #666;
  }

  .urgent .el-dialog__body {
    background-color: #eeeeee;
    text-align: center
  }

  .urgent .el-dialog__body p {
    letter-spacing: 1px
  }

  .urgent .el-dialog__title {
    font-weight: 600;
    letter-spacing: 1px
  }

  .urgent .el-table--border {
    overflow: hidden;
  }

  .urgent .el-table__header {
    border: none;
  }

  .urgent .el-table--border::after,
  .urgent .el-table--group::after {
    top: 0;
    right: 0;
    width: 0px;
    height: 0%;
  }

  .urgent .foot-table table thead tr th:nth-last-child(2),
  .urgent .foot-table table tbody tr td:nth-last-child(1) {
    border-right: none
  }

  .urgent .el-input {
    width: 10%;
    min-width: 150px
  }
  .urgent .el-dialog__header {
    background-color: #eee;
  }

</style>
