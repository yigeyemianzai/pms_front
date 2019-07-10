<template>
  <div class="historydetail" id="historydetail">
		<div class="goback" id='goback' @click="goback()">
			<img src="">
			<span>返回</span>
		</div>
		<div class="dtop-list" :data='historyMsg'>
			<div class="dlist-data">
				<img src="~@/assets/images/detail-code.jpg">
				<p id='planCode'>事件编号：{{historyMsg.planCode}}</p>
			</div>
			<div class="dlist-data">
				<img src="~@/assets/images/detail-zdate.jpg">
				<p id="createTime">方案制定时间：{{historyMsg.createTime}}</p>
			</div>
			<div class="dlist-data">
				<img src="~@/assets/images/detail-update.jpg">
				<p id="beginTime">调控开始时间：{{historyMsg.beginTime}}</p>
			</div>
			<div class="dlist-data">
				<img src="~@/assets/images/detail-overdate.jpg">
				<p id="endTime">调控结束时间：{{historyMsg.endTime}}</p>
			</div>
			<div class="dlist-data">
				<img src="~@/assets/images/detail-set.jpg">
				<p id='participant'>参与子系统：{{historyMsg.participant}}</p>
			</div>
			<div class="dlist-data">
				<img src="~@/assets/images/detail-name.jpg">
				<p id='planType'>策略名称：{{historyMsg.planType}}</p>
			</div>
			<div class="dlist-data">
				<img src="~@/assets/images/detail-aim.jpg">
				<p id='targetCount'>策略目标：{{historyMsg.targetCount}}</p>
			</div>
			<div class="dlist-data ex">
				<img src="~@/assets/images/detail-ex.jpg">
				<p>消减能耗：
					<span class="detail-ex" id='economy'>{{historyMsg.economy}}</span>
				</p>
				<img class="detail-good" src="~@/assets/images/detail-good.jpg" />
			</div>
			<div class="dlist-data">
				<img src="~@/assets/images/detail-mark.jpg">
				<p id="planStatus">调控进度：{{historyMsg.planStatus | planStatustype}}</p>
			</div>
			<div class="clera"></div>
		</div>
		<div class="data-detail" @click="searchdetail()">查看详情></div>
		<div class="detail-echarts" id="detail-echarts"></div>
    <!-- 调控详情页面 -->
    <el-dialog title="调控详情" :visible.sync="dialogTableVisible" center width="70%">
      <el-row :gutter="23">
        <el-col :span="12"><div class="detailmsg">系统详情</div></el-col>
        <el-col :span="12"><div class="detailmsg">设备详情</div></el-col>
      </el-row>
      <el-row :gutter="23">
        <el-col :span="12">
          <el-table
            height='300px'
            :data="systemDetails"
            border
            style="width: 100%">
            <el-table-column
              type="index"
              label="序号"
              width="50">
            </el-table-column>
            <el-table-column
              prop="areaName"
              label="系统名称"
              width="180">
            </el-table-column>
            <el-table-column
              prop=""
              label="参与设备数量">
                <template slot-scope="scope">
                  <span @click="showDeviceDetails(scope.row)" style="color:#60afe8;cursor: pointer;">{{scope.row.count}}</span>
                </template>
            </el-table-column>
            <el-table-column
              prop="economy"
              label="调节负荷">
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="12">
          <el-table
            height='300px'
            :data="deviceDetails"
            border
            style="width: 100%">
            <el-table-column
              type="index"
              label="序号"
              width="50">
            </el-table-column>
            <el-table-column
              prop="beginTime"
              label="开始时间">
            </el-table-column>
            <el-table-column
              prop="equipName"
              label="设备名称">
            </el-table-column>
            <el-table-column
              prop="economy"
              label="调节负荷">
            </el-table-column>
          </el-table>
          <el-pagination
            background
            layout="prev, pager, next"
            :total="4">
          </el-pagination>
        </el-col>
      </el-row>
    </el-dialog>
	</div>
</template>
<script>
export default {
  data () {
    return {
      dialogTableVisible: false,   // 点击查看详情按钮
      systemDetails: [],  // 系统详情表格数据
      deviceDetails: [],  // 设备详情表格数据
      historyMsg: '',  // 方案详情表格数据
      xAxis_data: '',  // 折线图X轴数据
      legend_data: '',  // 折线图标记数据
      series_data: []  // 折线图数据
    }
  },
  created () {
    console.log(this.$route.query.rowId)
  },
  mounted () {
    this.en()
    window.onresize = function () {
        if(document.getElementById('historydetail')){
          document.getElementById('historydetail').style.height = (window.innerHeight - 170) + 'px'
          echarts.init(document.getElementById('detail-echarts')).resize();
        }
      }
  },
  methods: {
    en () {
      document.getElementById('historydetail').style.height = (window.innerHeight-170)+'px'
      var planid = "";
      // 获取折线图数据
      this.$http({
        url:this.$http.adornUrl('/efficiency/advance/planinfo'),
        method: 'post',
        params: {
          planid: planid
        },
      }).then(({data}) => {
        if (data.msg === "success") {
          this.historyMsg = data.advance
          this.xAxis_data = data.chart.xAxis
          this.legend_data = data.chart.legend
          this.series_data = data.chart.series

          this.$options.methods.load_data.bind(this)()
        }
      })
      var controlid = "";      
    },
    // 加载图表
    load_data() {
      var electricity = echarts.init(document.getElementById('detail-echarts'));
      // electricity 
      var option = {
        color: ['#ff2c2e', '#5655df', '#c670db', '#a5e8f0', '#ffc028'],
        title: {
          text: ' '
        },
        legend: {
          //data:['实时负荷','预测目标负荷','用电量'],  
          orient: 'horizontal',
          selectedMode: true,
          data: this.legend_data,//分别修改legend格式
          textStyle: {
            fontSize: 12,
            color: '#000'
          }
        },
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
            name: '预测负荷',
            smooth: true,
            data: this.series_data[0].data,
            type: 'line',
            symbol: 'none',
            itemStyle: {
              normal: {
                lineStyle: {
                  color: '#ff2c2e'
                }
              }
            }
          },
          {
            name:'预测目标负荷',
            smooth: true,
            data: this.series_data[1].data,
            type: 'line',
            symbol: 'none',
            itemStyle: {
              normal: {
                lineStyle: {
                  color: '#5655df'
                }
              }
            },
          },
          {
            name:'照明系统目标负荷',
            smooth: true,
            data: this.series_data[2].data,
            type: 'line',
            symbol: 'none',
            itemStyle: {
              normal: {
                lineStyle: {
                  color: '#c670db'
                }
              }
            },
          },
          {
            name:'插座系统目标负荷',
            smooth: true,
            data: this.series_data[3].data,
            type: 'line',
            symbol: 'none',
            itemStyle: {
              normal: {
                lineStyle: {
                  color: '#a5e8f0'
                }
              }
            },
          },
          {
            name:'实时负荷',
            smooth: true,
            data: this.series_data[4].data,
            type: 'line',
            symbol: 'none',
            itemStyle: {
              normal: {
                lineStyle: {
                  color: '#ffc028'
                }
              }
            },
          }
        ]
      }
      electricity.setOption(option);
    },
    goback(){
      this.$router.push('/improve-imp-his')
    },
    searchdetail(){
      this.dialogTableVisible=true
      this.$http({
        url:this.$http.adornUrl('/efficiency/advance/controlinfo'),
        method: 'post',
        /* params: {
          controlid: controlid
        }, */
      }).then(({data}) => {
        if (data.msg === "success") {
          this.systemDetails = data.controls
          let deviceDetail = []
          for(let i=0;i<data.controls.length;i++) {
            for(let j=0;j<data.controls[i].devices.length;j++){
              deviceDetail.push(data.controls[i].devices[j])
            }
          }
          this.deviceDetails = deviceDetail  
          }
      })
    },
    showDeviceDetails(row){
      this.$http({
        url:this.$http.adornUrl('/efficiency/advance/controlinfo'),
        method: 'post',
        /* params: {
          controlid: controlid
        }, */
      }).then(({data}) => {
        if (data.msg === "success") {
          this.systemDetails = data.controls
          let deviceDetail = []
          for(let i=0;i<data.controls.length;i++) {
            for(let j=0;j<data.controls[i].devices.length;j++){
              deviceDetail.push(data.controls[i].devices[j])
            }
          }
          // this.deviceDetails = deviceDetail  
          this.deviceDetails = [
            {
              "equipName": "照明1",
              "equipId": "1",
              "beginTime": "2018-07-19 08:50:00",
              "economy": "2"
            },
            {
              "equipName": "照明2",
              "equipId": "2",
              "beginTime": "2018-07-19 08:50:00",
              "economy": "12"
            }
          ]
          }
      })
    }
  },
  filters: {
    // 调控进度文字判断
    planStatustype: function (value) {
      if (value == 1) {
        return "未执行"
      }else if (value == 2) {
        return "执行中"
      }else if (value == 3) {
        return "完成"
      }            
    }
  }
}
</script>
<style>
  .historydetail {
    width: 100%;
    height: 100%;
  }
  .goback {
    width: 10%;
    font-size: 18px;
    font-weight: bold;
    padding: 2% 2.5%;
    cursor: pointer;
  }
  .dtop-list {
    width: 96%;
    min-height: 20%;
    min-height: 30%;
    margin: 0 auto;
  }

  .dlist-data {
    width: 23%;
    max-width: 23%;
    float: left;
    margin: 0% 2% 0 0;
  }

  .dlist-data img {
    width: 12%;
    display: inline-block;
    vertical-align: middle;
  }

  .dlist-data p {
    display: inline-block;
    vertical-align: middle;
  }

  .clear {
    clear: both;
  }

  .detail-echarts {
    width: 100%;
    height: 59%;
  }

  .detail-ex {
    color: #ff2021;
  }

  .ex {
    position: relative;
  }

  .detail-good {
    width: 12% !important;
    position: absolute;
    top: 0;
    right: 45%;
  }

  .data-detail {
    width: 6%;
    height: 4%;
    border-radius: 5px;
    padding: 0.4% 0.2%;
    position: absolute;
    top: 30%;
    right: 10%;
    background-color: #5fb0e8;
    color: #fff;
    font-size: 16px;
    text-align: center;
    cursor: pointer;
  }

  #layui-layer1 {
    border-radius: 5px;
  }

  .layui-layer-content {
    background-color: #4e5c67;
    padding: 2% 0;
    border: 10px solid #fff;
    color: #fff;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  .layer-left {
    width: 49.5%;
    height: 100%;
    text-align: center;
    font-size: 18px;
    display: inline-block;
    vertical-align: middle;
  }

  .left-data {
    width: 90%;
    height: 85%;
    border: 1px solid #fff;
    border-radius: 5px;
    margin: 5% auto;
  }

  .left-data div {
    float: left;
  }

  .data-list {
    width: 100%;
    background-color: #fff;
    color: #4e5c67;
  }

  .data-code {
    width: 14%;
    padding: 2% 1%;
    text-align: center;
  }

  .data-name {
    width: 26%;
    padding: 2% 1%;
    text-align: center;
  }

  .data-num {
    width: 26%;
    padding: 2% 1%;
    text-align: center;
  }

  .data-seo {
    width: 26%;
    padding: 2% 1%;
    text-align: center;
  }

  .list-detail {
    background-color: #4e5c67;
    color: #fff;
    border-bottom: 2px solid #fff;
  }
  .historydetail .detailmsg {
    text-align: center;
    color: #fff;
    font-size: 16px;
    letter-spacing: 2px;
    padding-top: 20px
  }
  .historydetail .el-dialog--center .el-dialog__body {
    background-color: #fff
  }
  .historydetail .el-row {
    background-color: #4e5c67;
    padding-bottom: 20px
  }
  .historydetail .el-dialog__body {
    padding: 0 20px 20px 20px
  }
</style>

