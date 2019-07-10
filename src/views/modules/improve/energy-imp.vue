<template>
  <div class="eneryimp" id="eneryimp">
		<div class="content-top">
      <div class="content-top-top">
        <div class="top-title">提升方案：</div>       
        <div class="entop-list-radio">
          <div class="raiogroup">
            <el-radio-group v-model="radio2">
              <el-radio :label="item.id" v-for="item in radios" :key="item.id">{{item.name}}</el-radio>
            </el-radio-group>
          </div>
        </div>
      </div>
      <div class="content-top-bottom">
        <div class="top-title">参与系统：</div>
        <div class="enentop-list-checkbox">
          <div class="raiogroup">
            <el-checkbox-group v-model="checkList">
              <el-checkbox :label="item.id"  v-for="item in checkLists" :key="item.id">{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
      </div>
		</div>
		<div class="but-list">
			<!-- <div class="but-title">勾选仿真方案，显示模拟效果，确认后提升</div> -->
			<div class="but-on" @click="simulation()">仿真</div>
			<div class="but-off" @click="lxts()">提升</div>
		</div>
    <div id="list"></div>
    <el-dialog
      title="能效提升"
      :visible.sync="centerDialogVisible"
      width="30%"
      font-weight='700'
      center
      :data='advanceData'>
      <p style="color:#000">本次能效提升预计在{{advanceData.time}}</p><p class="layer-date">{{advanceData.timeslot}}</p><p style="color:#000">{{advanceData.size}}个时间段执行</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="eneryImpSimulation()">确 定</el-button>
      </span>
    </el-dialog>
	</div>
</template>
<script>
import $ from 'jquery'
// import echarts from 'echarts'
export default {
  data () {
    return {
      centerDialogVisible: false, //弹框默认关闭
      radios: [  // 提升方案数据
        {'name':'经济最优',id: 1},
        {'name':'能效最高',id: 2},
        {'name':'峰谷差最小',id: 3},
        {'name':'负荷波动最小',id: 4},
        {'name':'清洁能源消纳最大',id: 5}
      ],
      radio2: 1,  // 提升方案默认值
      checkLists:[  // 参与系统数据
        {'name':'高温相变蓄热',id: 1},
        {'name':'压缩空气储能',id: 2},
        {'name':'高温相变光热发电',id: 3},
        {'name':'微网中心VRV空调',id: 4},
        {'name':'微网中心机房精密空调',id: 5}
      ],
      checkList: [1,2],  // 参与系统默认值
      xAxis_data: [],  // 折线图坐标
      legend_data: [],  // 折线图线条标注
      series_data: [],  // 折线图数据
      advanceData: ''  // 存放仿真后的相关信息
    }
  },
  created () {
    
  },
  mounted () {
    this.en()
    this.$http({
      url:this.$http.adornUrl('/efficiency/advance/chart/energy'),
      method: 'post',
    }).then(({data}) => {
      if (data.msg === "success") {
        this.xAxis_data = data.chart.xAxis;
        this.legend_data = data.chart.legend;
        this.series_data = data.chart.series;
        console.log(this.series_data)
        this.$options.methods.initChart.bind(this)()
      }
    })
    window.onresize = function () {
        if(document.getElementById('eneryimp')){
          document.getElementById('eneryimp').style.height = (window.innerHeight - 170) + 'px'
          echarts.init(document.getElementById('list')).resize();
        }
      }
  },
  methods: {
    en () {
      document.getElementById('eneryimp').style.height = (window.innerHeight-170)+'px'
    },
    // 点击仿真按钮执行事件
    simulation () {
      console.log(this.radio2)  // 单选框值
      console.log(this.checkList)  // 复选框值
      this.$http({
        url: this.$http.adornUrl('/efficiency/advance/simulation'),
        method: 'post',
        /* params: {
          plan: plan,
          sys: sys.toString()
        },  */
      }).then(({data}) => {
        if (data.msg === "success") {
          this.advanceData = data.advance
          this.xAxis_data = data.chart.xAxis;
          this.legend_data = data.chart.legend;
          this.series_data = data.chart.series;
          this.$options.methods.initChart.bind(this)()
          // 提示仿真成功消息
          this.$message({
            message: '恭喜你，仿真成功',
            type: 'success'
          });
        }
      })
    },
    // 点击提升按钮执行事件
    lxts() {
      console.log(this.advanceData)
      // 判断，如果没有仿真信息则不执行
      if (this.advanceData == '') {
        this.$message({
          message: '请先仿真数据信息',
          type: 'error'
        });
      }else if (this.advanceData != '') {
        this.centerDialogVisible = true
      }
    },
    // 折线图加载
    initChart () {
      var electricity = echarts.init(document.getElementById('list'));       
      var option = {
        color:['#FBEF1D','#157373','#666','red'],
        title: {
          text: ' '
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        legend: {
          data: this.legend_data
        },
        dataZoom: [{
          startValue: '00:00'
        }, {
          type: 'inside'
        }],
        grid: {
          x: 80,
          y: 50,
        },
        xAxis: {
          boundaryGap: false,
          type: 'category',
          data: this.xAxis_data,
          name: '',
          axisTick: true,
          axisLine: {
            lineStyle: {
              type: 'solid',
              color: '#000',//左边线的颜色
              width: '2'//坐标线的宽度
            }
          },
          axisLabel: {
            textStyle: {
              color: '#000'//x轴刻度数值颜色
            }
          },
        },
        yAxis: {
          type: 'value',
          name: '功率',
          min: 0,
          max: 200,
          //y轴刻度
          axisLabel: {
            //设置y轴数值为%
            formatter: '{value} kw',
            textStyle: {
              color: '#000'//y轴刻度数值颜色
            }
          },
          axisLine: {
            lineStyle: {
              type: 'solid',
              color: '#000',//y轴坐标轴颜色
              width: '2'//坐标轴宽度
            }
          }
        },
        series: [
          {
            name: this.legend_data[0],
            data: this.series_data[0].data,
            type: 'line',
            smooth: true,
            itemStyle: {
              normal: {
                lineStyle: {
                  color: '#FBEF1D'
                }
              }
            }
          },
          {
            name: this.legend_data[1],
            data: this.series_data[1].data,
            type: 'line',
            smooth: true,
            itemStyle: {
              normal: {
                lineStyle: {
                  color: '#157373'
                }
              }
            },
          },
          {
            name: this.legend_data[2],
            data: this.series_data[2].data,
            type: 'line',
            smooth: true,
            itemStyle: {
              normal: {
                lineStyle: {
                  color: '#666'
                }
              }
            },
          },
          {
            name: this.legend_data[3],
            data: this.series_data[3].data,
            type: 'line',
            smooth: true,
            itemStyle: {
              normal: {
                lineStyle: {
                  color: 'red'
                }
              }
            },
          }
        ]
      }; 
      electricity.setOption(option);
    },
    // 点击执行-弹框--确定按钮
    eneryImpSimulation() {
      console.log(this.advanceData.planId)
      this.$http({
        url: this.$http.adornUrl('/efficiency/advance/execute'),
        method: 'post',
        /* params: {
          planid: "1"
        }, */
      }).then(({data}) => {
        if (data.msg === "success") {
          this.$message({
            message: '执行成功',
            type: 'success'
          });
          this.centerDialogVisible = false
        }else {
          this.$message({
            message: '执行失败',
            type: 'error'
          });
        }
      })
    }
  }
}
</script>
<style>
  .eneryimp {
    width: 100%;
    height: 100%;
  }
  .eneryimp .content-top {
    width: 100%;
    height: 20%;
    margin: 0;
    padding-top: 2%;
  }
  .eneryimp #list{
    width: 100%;
    height:70%;
  }
  .top-title {
    font-size: 18px;
    width: 10%;
    height: 100%;
    display: inline-block;
    /* vertical-align: middle; */
    line-height: 200%;
    text-align: center;
  }
  .entop-list {
    width: 16%;
    height: 100%;
    display: inline-block;
    vertical-align: middle;
    font-size: 18px;
   /*  margin-left: 1%; */
    /* letter-spacing: 1px; */
    line-height: 200%;
  }
  .entop-lists {
    width: 20%;
    height: 100%;
    display: inline-block;
    vertical-align: middle;
    font-size: 18px;
    line-height: 200%;
  }
  .top-dir {
    height: 100%;
    display: inline-block;
    vertical-align: middle;
    font-size: 22px;
    line-height: 170%;
    color: #ccc;
  }
  .radio {
    width: 18px;
    height: 18px;
    cursor: pointer;
    margin: 0 2% 0 0;
    vertical-align: middle;
    cursor: pointer;
  }
  .entop-list span {
    vertical-align: middle;
    cursor: pointer;
  }
  .checkbox {
    width: 18px;
    height: 18px;
    cursor: pointer;
    margin: 0 4% 0 0;
    vertical-align: middle;
  }
  .enlist-checkbox {
    width: 21%;
  }
  .enlist-checkboxs {
    width: 24%;
  }
  .entop-list-radio {
    display: inline-block;
    /* vertical-align: middle; */
    width: 80%;

  }
  .entop-list-radio .raiogroup, .enentop-list-checkbox .raiogroup {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 24px;
    flex-wrap: wrap;
    flex-flow: row wrap
  }
  .raiogroup .el-radio-group, .raiogroup .el-checkbox-group {
    width: 100%;
  }
  .eneryimp .el-radio, .eneryimp .el-checkbox {
    margin-right: 2%;
    margin-top: 1%;
    margin-left: 0
  }
  .entop-list-radio .el-radio__label {
    font-size: 16px
  }
  .elradios {
    font-size: 24px
  }
  .enentop-list-checkbox {
    width: 80%;
    display: inline-block;
    /* vertical-align: middle; */
    text-align: left;
    /* padding-left: 5%; */
  }
  .enentop-list-checkbox .el-checkbox__label {
    font-size: 16px
  }
  .but-list {
    width: 100%;
    height: 4%;
    text-align: right;
    margin-top: 2%;
  }
  .but-title {
    width: 50%;
    height: 100%;
    line-height: 200%;
    display: inline-block;
    vertical-align: middle;
    color: #ccc;
    font-size: 16px;
    letter-spacing: 1px;
  }
  .but-on {
    width: 5%;
    height: 100%;
    display: inline-block;
    vertical-align: middle;
    background-color: #1367A5;
    padding: 0.4% 0;
    text-align: center;
    color: #fff;
    border-radius: 5px;
    font-size: 16px;
    margin: 0 0 0 2%;
    cursor: pointer;
  }
  .but-off {
    width: 5%;
    height: 100%;
    display: inline-block;
    vertical-align: middle;
    background-color: #1367A5;
    padding: 0.4% 0;
    text-align: center;
    color: #fff;
    border-radius: 5px;
    font-size: 16px;
    margin: 0 2% 0 2%;
    cursor: pointer;
  }
  #layui-layer1 {
    border-radius: 5px;
  }
  .layui-layer-content {
    background-color: #f0f0f0;
    padding: 10% 0;
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
  .eneryimp .el-dialog__body {
    background-color: #eeeeee;
    text-align: center
  }
  .eneryimp .el-dialog__body  p {
    letter-spacing: 1px
  }
  .eneryimp .el-dialog__title {
    font-weight: 600;
    letter-spacing: 1px
  }
  .content-top-top, .content-top-bottom {
    height: 50%;
  }
</style>
