<template>
  <div class="historydetail" id="historydetail">
		<div class="goback" id='goback' @click="gobackhis">
			<img src="">
			<span>返回</span>
		</div>
		<div class="dtop-list" :data='historyMsg'>
			<div class="dlist-data">
				<img src="~@/assets/images/detail-code.png">
				<p id='planCode'>事件编号：{{historyMsg.regulateEventId}}</p>
			</div>
			<div class="dlist-data">
				<img src="~@/assets/images/detail-zdate.png">
				<p id="createTime">方案制定时间：{{historyMsg.customTime | changeCustomTime}}</p>
			</div>
			<div class="dlist-data">
				<img src="~@/assets/images/detail-update.png">
				<p id="beginTime">调控开始时间：{{historyMsg.startTime}}</p>
			</div>
			<div class="dlist-data">
				<img src="~@/assets/images/detail-overdate.png">
				<p id="endTime">调控结束时间：{{historyMsg.endTime}}</p>
			</div>
			<div class="dlist-data">
				<img src="~@/assets/images/detail-set.png">
				<p id='participant'>参与子系统：{{historyMsg.systemName}}</p>
			</div>
			<div class="dlist-data">
				<img src="~@/assets/images/detail-name.png">
				<p id='planType'>策略名称：{{historyMsg.strategyName}}</p>
			</div>
			<div class="dlist-data">
				<img src="~@/assets/images/detail-aim.png">
				<p id='targetCount'>策略目标：{{historyMsg.regulateTargetVal}}</p>
			</div>
			<div class="dlist-data ex">
				<img src="~@/assets/images/detail-ex.png">
				<p>消减能耗：
					<span class="detail-ex" id='economy'>{{historyMsg.cutPowerVal}}</span>
				</p>
        <!-- 判断是否显示达标图片，有调控结束时间就显示，否则不显示 -->
				<img class="detail-good" :src="historyMsg.endTime != null ? './static/img/detail-good.png': ''" />       
			</div>
			<div class="dlist-data">
				<img src="~@/assets/images/detail-mark.png">
				<p id="planStatus">调控进度：{{historyMsg.eventState | planStatustype}}</p>
			</div>
			<div class="clera"></div>
		</div>
		<div class="data-detail" @click="searchdetail()" v-if="showdel">查看详情></div>
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
              width="80"
              align="center">
            </el-table-column>
            <el-table-column
              prop="systemName"
              label="系统名称"
              width="180"
              align="center">
            </el-table-column>
            <el-table-column
              prop="num"
              align="center"
              label="参与设备数量">
                <template slot-scope="scope">
                  <span @click="showDeviceDetails(scope.row)" style="color:#60afe8;cursor: pointer;">{{scope.row.num}}</span>
                </template>
            </el-table-column>
            <el-table-column
              prop="systemRegulaateVal"
              label="调节负荷"
              align="center">
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
              width="80"
              align="center">
            </el-table-column>
            <el-table-column
              prop="controlStartTime"
              label="开始时间"
              align="center">
            </el-table-column>
            <el-table-column
              prop="equipName"
              label="设备名称"
              align="center">
            </el-table-column>
            <el-table-column
              prop="equipRegulateVal"
              label="调节负荷"
              align="center">
            </el-table-column>
          </el-table>
          <el-pagination
            background
            layout="total, prev, pager, next"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="pageSize"
            :total="totalCount">
          </el-pagination>
        </el-col>
      </el-row>
    </el-dialog>
	</div>
</template>
<script>
import { changeTime } from '@/utils'
export default {
  data () {
    return {
      dialogTableVisible: false,
      systemDetails: [],
      deviceDetails: [],
      historyMsg:'',
      realtime: [],
      series: [],
      legend: [],
      xAxis: [],
      eventState: 3,  // 调控进度 1：未执行，2：执行中， 3：已执行
      showdel: '',
      websocket: null,
      rowId: '',  // 记录页面ID
      rowTime: '',  //  记录事件时间
      rowStrategyId: '',  // 记录时间ID 1602是非紧急需求折线图  1601是紧急需求折线图
      currentPage: 1,
      pageSize: 0,
      totalCount: 0,
      sizeChange: 5
    }
  },
  created () {
    this.rowId = this.$route.query.rowId
    // console.log(this.$route.query.rowId)
    if(this.eventState == 1 || this.eventState == 2) {
      this.showdel = false
    }else if(this.eventState == 3) {
      this.showdel = true
    }
    this.$http({
        url:this.$http.adornUrl('/device/stategrid/queryHistory'),
        method: 'post',
        data: this.$http.adornData({
          page: 1, // 第几页
          limit: 1, // 每页显示条数 */
          regulateEventId: this.rowId
        })
      }).then(({data}) => {
        // console.log(data)
        this.historyMsg = data.info.list[0]
      })
  },
  mounted () {
    this.en()
    window.onresize = function () {
      if(document.getElementById('historydetail')){
        document.getElementById('historydetail').style.height = (window.innerHeight - 170) + 'px'
        echarts.init(document.getElementById('detail-echarts')).resize();
      }
    }
    /* this.timer = setInterval(function () {
      that.realtime.push(Math.ceil(Math.random()*10)+55)
      echarts.init(document.getElementById('detail-echarts')).setOption({
        series:[
          {name:'实时负荷',
          smooth:true,
          data: this.realtime,
          type: 'line',
          symbol: 'none',
          itemStyle: {
            normal: {
              lineStyle: {
                color: '#fdcc4c'
              }
            }
          }}
        ]
      })
    }, 3000) */
    
  },
  methods: {
    handleCurrentChange(val){
      // console.log(`每页 ${val} 条`);
    },
    routeChange() {
      // console.log(this.$route)
      if(this.$route.path != 'interactive-his-detail'){
        clearInterval(this.timer)
      }
    },
    en () {
      document.getElementById('historydetail').style.height = (window.innerHeight-170)+'px'
      this.rowTime = this.$route.query.date.substring(0,10)
      this.rowStrategyId = this.$route.query.strategyId
      /* console.log(this.rowTime)
      console.log(this.rowStrategyId)
      console.log(this.rowId) */
      // 1602是非紧急需求折线图  1601是紧急需求折线图
      let url = ''
      if(this.rowStrategyId == '1602') {
        url = '/device/stategrid/exigencenone/chart/hourload'
      }else if(this.rowStrategyId == '1601') {
        url = '/device/stategrid/exigence/chart/hourload'
      }
      // console.log(url)
      var planid = ""
      // 获取折线图信息
      this.$http({
        // url:that.$http.adornUrl('/stategrid/answer/planinfo'),
        url:this.$http.adornUrl(url),         
        method: 'post',
        data: this.$http.adornData({
          date: this.rowTime,
          regulateEventId: this.rowId
        })
      }).then(({data}) => {
        if (data.msg === "success") {
          // console.log(data)
          // this.historyMsg = data.advance
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
          // this.xAxis = JSON.parse(data.info.xAxis)
          // this.xAxis = arr
          this.xAxis = data.chart.xAxis
          this.legend = data.chart.legend
          this.series = data.chart.series
          this.$options.methods.initEcharts.bind(this)()
          // 判断为执行中就开启websocket
          if(this.eventState == 2) {
            this.websock = new WebSocket("ws://123.207.167.163:9010/ajaxchattest")
            // 建立 web socket 连接成功触发事件
            let _this = this
            this.websock.onopen = function () {
              // 使用 send() 方法发送数据
              _this.websock.send('')
              // alert("数据发送中...")
            }
            // WebSocket连接发生错误
            this.websock.onerror = function (evt) {
              console.log("WebSocket连接发生错误");
            }
            // 接收服务端数据时触发事件
            this.websock.onmessage = function (evt) {
              // console.log(evt)
              echarts.init(document.getElementById('detail-echarts')).setOption({
                series:[
                  {name:'实时负荷',
                  smooth:true,
                  data: _this.realtime,
                  type: 'line',
                  symbol: 'none',
                  itemStyle: {
                    normal: {
                      lineStyle: {
                        color: '#fdcc4c'
                      }
                    }
                  }}
                ]
              })
            }
            // 断开 web socket 连接成功触发事件
            this.websock.onclose = function () {
              // alert("连接已关闭...")
            }
          }
        }
      })     
    },
    // 折线图模板
    initEcharts() {
      var electricity = echarts.init(document.getElementById('detail-echarts'))
      let obj = [
        {
          name: this.legend[0],
          data: this.series[0].data,
          type: 'line',
          // connectNulls: true
        }
      ]
      for(let i=1;i<this.series.length;i++){
        let arr = {
          name: this.legend[i],
          data: this.series[i].data,
          type: 'line',
          connectNulls: true
        }
        obj.push(arr)
      }
      // electricity 
      var option = {
        color: ['#ff3737', '#8f8eec', '#fdcc4c','blue'],
        title: {
          text: ' '
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
          data: this.legend,  
          /* orient: 'horizontal',
          selectedMode: true,
          textStyle: {
            fontSize: 12,
            color: '#000'
          } */
        },
        grid: {
          x: 80,
          y: 50,
        },
        dataZoom: [{
          startValue: '00:00'
        }, {
          type: 'inside'
        }],
        xAxis: {
          boundaryGap: false,
          type: 'category',
          data: this.xAxis,
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
          min:0,
          // max:this.series[0].data==null?1000:null,
          // max:1000,
          type: 'value',
          name: '功率',
          //y轴刻度
          axisLabel: {
            //设置y轴数值为%
            formatter: '{value} kW',
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
        series: obj
        /* series: [
          {
            name:this.series[0].name,
            smooth:true,
            data: this.series[0].data,
            type: 'line',
            symbol: 'none',
            itemStyle: {
              normal: {
                lineStyle: {
                  color: '#ff3737'
                }
              }
            }
          },
          {
            name:this.series[1].name,
            smooth:true,
            data: this.series[1].data,
            type: 'line',
            symbol: 'none',
            itemStyle: {
              normal: {
                lineStyle: {
                  color: '#8f8eec'
                }
              }
            },
          },
          {
            name:this.series[2].name,
            smooth:true,
            // data: this.realtime,
            data: this.series[2].data,
            type: 'line',
            symbol: 'none',
            itemStyle: {
              normal: {
                lineStyle: {
                  color: '#fdcc4c'
                }
              }
            },
          }
        ] */
      }
      electricity.setOption(option);
    },
    gobackhis(){
      this.$router.push('/interactive-interactive-his')
    },
    // 点击查看详情
    searchdetail(){
      this.dialogTableVisible=true
      this.$http({
        url:this.$http.adornUrl('/device/stategrid/equipRegulateEventId'),
        method: 'post',
        data: this.$http.adornData({
          'regulateEventId': this.historyMsg.regulateEventId.toString()          
        })
      }).then(({data}) => {
        if (data.msg === "success") {
          this.systemDetails = data.info          
          let obj = {}
          obj.detailId= data.info[0].detailId
          // console.log(obj)
          this.$options.methods.showDeviceDetails.bind(this)(obj)
        }
      })
    },
    showDeviceDetails(row){
      // console.log(row)
      this.$http({
        url:this.$http.adornUrl('/device/stategrid/equips'),
        method: 'post',
        data: this.$http.adornData({
          "detailId": row.detailId,
          "page": this.currentPage,  // 第几页
          "limit": this.sizeChange  // 每页显示条数
        })
      }).then(({data}) => {
        if (data.msg === "success") {
          this.deviceDetails = data.info.list
          this.totalCount = data.info.totalCount
          this.pageSize = data.info.pageSize
          this.currentPage = data.info.currPage
        }
      })
    }
  },
  filters: {
    // 策略名称文字判断
    strategyNames: function (value){
      if(value == '1602'){
        return '非紧急需求响应策略'
      }else if(value == '1601'){
        return '紧急需求响应策略'
      }
    },
    // 调控进度文字判断
    planStatustype: function (value) {
      if (value == 1) {
        return "未执行"
      }else if (value == 2) {
        return "执行中"
      }else if (value == 3) {
        return "完成"
      }else if (value == null) {
        return "暂无"
      }           
    },
    // 时间戳转换
    changeCustomTime(value) {
      // console.log(value)
      if(value == null) {
        return '-'
      }else {
        return value
      }
      // return changeTime(value)
    },
    changeStartTime(value) {
      if(value == null) {
        return '-'
      }else {
        return value
      }
      // return changeTime(value)
    },
    changeEndTime(value) {
      if(value == null){
        return '-'
      }else{
        return value
        // return changeTime(value)
      }     
    },
  },
  watch: {
    $route: 'routeChange'
  },
  destroyed () {
    clearInterval(this.timer)
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

