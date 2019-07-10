<template>
  <div class="air" id="air">
		<div class="air-top">
			<div class="top-list">
				<div class="top-data" v-for="item in chartHeatpump" :key="item.id">
					<div class="air_data-title">
            <div class="title-img">
              <!-- <img :src="'~@/assets/images/air-icon'+ item.id +'.png'"> -->
            </div>						
						<p>{{item.name}}</p>
					</div>
					<div class="air-electricity" :id="'air-pie'+ item.id"></div>
					<div>
					</div>
				</div>
				<div class="top-data" :data="chartHeatpumpInfo">
					<div class="top-data-load">
						<img src="~@/assets/images/air-load.png" />
						<div class="load-text">
							<p class="load-title">负荷</p>
							<p class="load-num">
								<span id="load1">{{chartHeatpumpInfo.load}}</span>
								<span>kW</span>
							</p>
						</div>
					</div>
					<div class="top-data-load">
						<img src="~@/assets/images/air-icon-load.png" />
						<div class="load-text">
							<p class="load-title">耗电量</p>
							<p class="load-num exend">
								<span id="consumepower1">{{chartHeatpumpInfo.consumepower}}</span>
								<span>kWh</span>
							</p>
						</div>
					</div>
				</div>
			</div>

			<div class="top-right">
				<div class="top-right-title">冰蓄冷系统</div>
				<div id="top-right-data" >
          <div class="top-right-data" :id="'give_water'+ item.id" v-for="item in chartCoolstorage" :key="item.id"></div>
				<div class="top-right-text" :data="coolstorageData">
					<div class="demand_water_num">
            <div class="demand_load">
              <img src="~@/assets/images/air-icon4.png">
              <span>冷冻水总回水流量</span>
            </div> 
            <div class="demand_load">
              <p class="demand_water_code">
                <span id="backwater2">{{coolstorageData.backwater}}</span>
                <span>m²/s</span>
						  </p>
            </div>

						<div class="demand_load">
              <img src="~@/assets/images/demand_load.png" />
              <span>负荷</span>
              <p class="demand_load_num">
                <span id="load2">{{coolstorageData.load}}</span>
                <span>kw</span>
              </p>
            </div>
            <div class="demand_load">
              <img src="~@/assets/images/demand_load2.png" />
              <span>耗电量</span>
              <p class="demand_load_num">
                <span id="consumepower2">{{coolstorageData.consumepower}}</span>
                <span>kw</span>
              </p>
            </div>
					</div>
				</div>
				
        </div>
			</div>

		</div>

		<div class="air-bottom">
			<div class="air-bottom-data">
				<div class="air-bottom-title">地表热泵24小时监测
          <el-date-picker
            v-model="value1"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions">
          </el-date-picker>
        </div>
				<div class="air-bottom-echarts" id="air-bottom-echarts"></div>
			</div>
			<div class="air-bottom-data">
				<div class="air-bottom-title">冰蓄冷24小时监测
          <el-date-picker
            v-model="value2"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions">
          </el-date-picker>
        </div>		 
				<div class="air-bottom-echarts" id="water-bottom-echarts"></div>
			</div>
		</div>
	</div>
</template>

<script>
import echarts from "echarts"
export default {
  data() {
    return {
      value1: '',
      value2: '',
      chartHeatpump: '',  // 仪表图数据
      chartHeatpumpInfo: '',  // 负荷、耗电量数据
      coolstorageData: '', // 冰蓄冷系统数据
      chartCoolstorage: '',  // 冰蓄冷系统仪表数据
      // 设置选择今天及以前的时间
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now() - 8.64e6
        }
      }
    };
  },
  created() {
    this.value1 = new Date()
    this.value2 = new Date()
  },
  watch: {
    value1: 'initChartHot', // 选择日期时触发折线图信息重载
    value2: 'initChartCool'
  },
  mounted() {
    this.en()
    this.initChartHot()
    this.initChartCool()
    window.onresize = function () {
      if(document.getElementById('air')){
        document.getElementById('air').style.height = (window.innerHeight - 170) + 'px'
        echarts.init(document.getElementById('air-pie1')).resize();
        echarts.init(document.getElementById('air-pie2')).resize();
        echarts.init(document.getElementById('air-pie3')).resize();
        echarts.init(document.getElementById('air-pie4')).resize();
        echarts.init(document.getElementById('air-pie5')).resize();
        echarts.init(document.getElementById('give_water1')).resize();
        echarts.init(document.getElementById('give_water2')).resize();
        echarts.init(document.getElementById('give_water3')).resize();
        echarts.init(document.getElementById('give_water4')).resize();
        echarts.init(document.getElementById('air-bottom-echarts')).resize();
        echarts.init(document.getElementById('water-bottom-echarts')).resize();
      }
    }
  },
  methods: {
    // 地源热泵折线图
    initChartHot () {
      this.$http({
        url:this.$http.adornUrl('/device/havcair/chart/coolline'),
        method: 'post',
        /* params: {
          type: "heat",
          time: ""
        }, */
      }).then(({data}) => {
        if (data.msg === "success") {
          let xAxisHot = data.chart.xAxis,
          legendHot = data.chart.legend,
          seriesHot = data.chart.series
          echarts.init(document.getElementById('air-bottom-echarts')).setOption(this.$options.methods.initCoollineLine(legendHot,seriesHot,xAxisHot))
        }
      })
    },
    // 冰蓄冷折线图
    initChartCool () {
      this.$http({
        url:this.$http.adornUrl('/device/havcair/chart/coolline'),
        method: 'post',
        /* params: {
          type: "cool",
          time: ""
        }, */
      }).then(({data}) => {
        if (data.msg === "success") {
          let xAxisCoolline = data.chart.xAxis,
          legendCoolline = data.chart.legend,
          seriesCoolline = data.chart.series
          echarts.init(document.getElementById('water-bottom-echarts')).setOption(this.$options.methods.initCoollineLine(legendCoolline,seriesCoolline,xAxisCoolline))
        }
      })
    },
    en(){
      document.getElementById('air').style.height = (window.innerHeight-170)+'px';
      this.$http({
        url:this.$http.adornUrl('/device/havcair/chart/heatpump'),
        method: 'post',
        /* params: {
          plan: plan,
          sys: sys.toString()
        }, */
      }).then(({data}) => {
        if (data.msg === "success") {
          this.chartHeatpump = data.chart.series
          this.chartHeatpumpInfo =data.info
          this.$nextTick(() => {
            for(var i=0;i<this.chartHeatpump.length;i++){
              var id = 'air-pie'+ this.chartHeatpump[i].id
              var colors = [
                  [
                    [0.2, "#cae7e5"],
                    [0.8, "#1DB3AA"],
                    [1, "#B6BDCD"]
                  ],
                  [
                    [0.2, "#D3EAF3"],
                    [0.8, "#6EAEE2"],
                    [1, "#B6BDCD"]
                  ],
                  [
                    [0.2, "#E0D8F0"],
                    [0.8, "#A78CD9"],
                    [1, "#B6BDCD"]
                  ]
                ]                
              echarts.init(document.getElementById(id)).setOption(this.$options.methods.mintorOption(this.chartHeatpump[i],colors[i%3]))
            }
          })
        }
      })
      // 冰蓄冷系统仪表盘
      this.$http({
        url:this.$http.adornUrl('/device/havcair/chart/coolstorage '),
        method: 'post',
      }).then(({data}) => {
        if (data.msg === "success") {
          this.coolstorageData = data.info
          this.chartCoolstorage = data.chart.series
          this.$nextTick(() => {
            let colors = [
              [[0.2, '#0ba5a5'], [0.8, '#05bbd0'], [1, '#00b6a0']],
              [[0.2, '#f0b75e'], [0.8, '#ffc854'], [1, '#e1b578']]
            ]
            echarts.init(document.getElementById('give_water1')).setOption(this.$options.methods.semicircleMintor1(this.chartCoolstorage[0],colors[0]))
            echarts.init(document.getElementById('give_water2')).setOption(this.$options.methods.semicircleMintor1(this.chartCoolstorage[1],colors[1]))
            echarts.init(document.getElementById('give_water3')).setOption(this.$options.methods.semicircleMintor2(this.chartCoolstorage[2],colors[0]))
            echarts.init(document.getElementById('give_water4')).setOption(this.$options.methods.semicircleMintor2(this.chartCoolstorage[3],colors[1]))
          })            
        }
      })
    },
    // 仪表盘
    mintorOption(value, col) {
      return Option = {
        series: [
          {
            name: '',
            type: 'gauge',
            title: {     // 仪表盘标题
              textStyle: {
                color: '#000',
                fontSize: 12
              }
            },
            detail: { 
              formatter: '{value}°C',
              textStyle: {
                fontSize: 14
              }
            },
            pointer : { //指针样式
              length: '90%',
              width: 3
            },
            data: [{ 
              value: value.data[0].value,
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
            axisTick : { //刻度线样式（及短线样式）
              length : 2
            },
            axisLabel: {   // 刻度值样式
              show: true,
              textStyle: {
                color: '#000',
                fontSize: 10,
              }
            },
          },
        ]
      }
    },
    // 半圆仪表盘
    semicircleMintor1(value, col) {
      return Option = {          
        series: [
          {
            type: 'gauge',
            // detail: { formatter: '{value}' },
            center: ['50%', '50%'],    // 默认全局居中
            radius: '100%',
            min:0,
            max:100,
            endAngle: 0,
            startAngle: 180,
            splitNumber:4,
            axisLine: {            // 坐标轴线
                lineStyle: {       // 属性lineStyle控制线条样式
                  width: 0,
                  color: col,
                }
            },
            axisTick: {            // 坐标轴小标记
              length:8,        // 属性length控制线长
              lineStyle: {       // 属性lineStyle控制线条样式
                color: 'auto',
                width: 4
              }
            },
            axisLabel:{
              formatter:function(v){
                switch (v + '') {
                    case '0' : return 'MIN';
                    case '100' : return 'MAX';
                }
              }
            },
            splitLine: {           // 分隔线
                length:6,         // 属性length控制线长
                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                  color: 'auto'
                }
            },
            pointer: {
                width:3
            },
            title: {
                offsetCenter: [0, '40%'],       // x, y，单位px
                textStyle: {
                  color: '#000',
                  fontSize: 18
                }
            },
            detail: {
                // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                formatter: '{value}℃',
                // fontWeight: 'bolder',
                offsetCenter: [0, '-40%'],       // x, y，单位px
                textStyle: {
                  color: 'auto',
                  fontSize: 18
                }
            },
            data: [{ value: value.data[0].value}],
          },
        ]
      };
    },
    semicircleMintor2(value, col) {
      return Option = {
        series: [
          {
            type: 'gauge',
            // detail: { formatter: '{value}' },
            center: ['50%', '50%'],    // 默认全局居中
            radius: '100%',
            min:0,
            max:100,
            endAngle: 0,
            startAngle: 180,
            splitNumber:4,
            axisLine: {            // 坐标轴线
                lineStyle: {       // 属性lineStyle控制线条样式
                    width: 3,
                    color: col,
                }
            },
            axisTick: {            // 坐标轴小标记
              length:6,        // 属性length控制线长
              lineStyle: {       // 属性lineStyle控制线条样式
                color: 'auto',
                width: 2
              }
            },
            axisLabel:{
              formatter:function(v){
                switch (v + '') {
                    case '0' : return '';
                    case '100' : return '';
                }
              }
            },
            splitLine: {           // 分隔线
                length:10,         // 属性length控制线长
                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                  color: 'auto',
                  width: 2                         
                }
            },
            pointer: {
                width:3
            },
            title: {
                offsetCenter: [0, '40%'],       // x, y，单位px
                textStyle: {
                  color: '#000',
                  fontSize: 18
                }
            },
            detail: {
                // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                formatter: '{value}kPa',
                // fontWeight: 'bolder',
                offsetCenter: [0, '-40%'],       // x, y，单位px
                textStyle: {
                  color: 'auto',
                  fontSize: 18
                }
            },
            data: [{ value: value.data[0].value}],
          },
        ]
      };
    },
    // 折线图
    initCoollineLine(legend,series,xAxis) {
      var obj = []
      for(let i=0;i<series.length;i++){
        let colors = ['#1db3aa', '#65b4ec', '#a38cd2', '#f9cd50', '#4ec1d3', '#1cb2a7', '#8492b5']
        let arr = {
          name: legend[i],
          data: series[i].data,
          type: 'line',
          symbol: 'none',
          itemStyle: {
            normal: {
              lineStyle: {
                color: colors[i]
              }
            }
          }
        }
        obj.push(arr)         
      }
      return Option = {
        tooltip: {
          trigger: 'axis',
        },
        dataZoom: [{
          startValue: '00:00'
        }, {
          type: 'inside'
        }],
        legend: {
          type: 'scroll',
          data: legend,
          icon: 'rect',  //图标形状
          right: '0%',

          y: 'center',
          orient: 'vertical',   //方向
          width: '15%',
          top: 'center',
          height:'75%',
          textStyle: {
            fontSize: 12
          }
        },
        color: ['#1db3aa', '#65b4ec', '#a38cd2', '#f9cd50', '#4ec1d3', '#1cb2a7', '#8492b5'],
        grid: {
          right: '20%'   //图表右侧距离
        },
        xAxis: {
          boundaryGap: false,
          type: 'category',
          data: xAxis,
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
          name: 'KW',
          min: 0,
          max: 200,
          interval: 40,
          //y轴刻度

          axisLine: {
            lineStyle: {
              type: 'solid',
              color: '#000',//y轴坐标轴颜色
              width: '2'//坐标轴宽度
            }
          },
        }, 
        series: obj
      };
    }
  }
};
</script>
<style scoped>
.air{
	width: 100%;
	height: 100%;
	overflow: hidden; 
}
.air .air-top{
	width: 100%;
	height: 60%;
	border-bottom: 5px solid #ccc;
}
.air .top-list{
	width: 60%;
	height: 100%;
	border-right: 5px solid #ccc;
	text-align: center;
	display: inline-block;
	vertical-align: middle;
	margin: 0;
}
.air .top-data{
	width: 27%;
	height: 36%;
	border: 1px solid #ccc; 
	display: inline-block;
	vertical-align: middle;
	margin: 5% 2% 0 2%;
	box-shadow: 5px 5px 7px #ccc;
}
.air .air_data-title{
  width: 100%;
  height: 20%;
  border-bottom: 1px solid #ccc;
  display: table
}
.air .air_data-title .title-img {
  display: table-cell;
  width: 40%;
  height: 100%;
  vertical-align: middle;
  text-align: right;
  padding-right: 0.3vw
}
.air .air_data-title img{
  width: 30%;
}
.air .air_data-title p{
	margin: 0;
	/* line-height: 240%; */
	margin-left: 2%; 
	display: table-cell;
	vertical-align: middle;
  font-size: 0.8vw;
  text-align: left
}
.air .top-data-load{
	width: 100%;
	height: 49%;
	text-align: center;
}
.air .top-data-load img{
	margin: 5% 8% 0 12%; 
	display: inline-block;
	vertical-align: middle;
  width: 50px;
  height: 50px;
}
.air .load-text{
	width: 45%;
	display: inline-block;
	vertical-align: middle;
	text-align: left;
}
.air .load-title{
	margin: 10% 0 0 0;
	font-size: 1.2vw;
}
.air .load-num{
	color: #1DB3AA; 
	font-size: 1.2vw;
	margin: 2% 0;
}
.air .load-num span{
	font-size: 18px;	
}
.air .air-electricity{
	width: 100%;
	height: 80%;
}
.air .exend{
	color: #8392B5 !important;
}
.air .top-right{
	width: 39%;
	height: 100%;
	display: inline-block;
	vertical-align: middle;
	margin: 0;
}
.air .top-right-title{
	width: 90%;
	height: 6%;
	font-size: 1.3vw;
	font-weight: bold;
	margin: 2% auto;
}
.air .top-right-data{
	width: 50%;
	height: 50%;
	display: inline-block;
}
.air .demand_water_num{
	width: 80%;
	margin: 0 auto;
  text-align: center
	/* line-height: 320%; */
}
.air .demand_water_num img{
	display: inline-block;
	vertical-align: middle;
  width: 30px;
  height: 30px;
}
.air .demand_water_num span{
	display: inline-block;
	vertical-align: middle;
	font-size: 1.2vw;
	/* margin-left: 1%;  */
}
.air .demand_water_code{
	/* width: 40%; */
	display: inline-block;
	/* margin-left: 5%;  */
	font-size: 1.2vw;
	vertical-align: middle;
	color: #1DB3AA;
}
.air .demand_water_code span{
	font-size: 18px;
	color: #000; 
	/* margin-left: 5%; */
	letter-spacing: 1px;
}
.air .demand_load{
	width: 49%;
	display: inline-block;
  vertical-align: middle;
  text-align: left
}
.air .demand_load img{
	display: inline-block;
	vertical-align: middle;
  width: 30px;
  height: 30px;
}
.air .demand_load span{
	font-size: 1.2vw; 
	vertical-align: middle;
}
.air .demand_load_num{
	/* width: 50%; */
	display: inline-block;
	vertical-align: middle;
	font-size: 26px;
	margin: 0;
	color: #1DB3AA;
  margin-left: 10%
}
.air .demand_load_num span{
	 color: #000;
	 /* margin-left: 5%; */
}
.air .demand_load2{
	width: 35%;
	display: inline-block;
	vertical-align: middle;
	text-align: center;
}
.air .air-bottom{
	width: 100%;
	height: 39%;
	margin: 0; 
}
.air .air-bottom-data{
	width: 49%;
	height: 100%;
	font-size: 24px;
	display: inline-block;
	vertical-align: middle;
}
/* .air-bottom-data input{
	width: 25%;
	height: 8%;
	font-size: 18px;
	border: 3px solid #ccc;
	text-align: center;
	margin: 2% 0 0 20%;
	vertical-align: middle;
} */
.air .air-bottom-title{
	margin: 2% 0 0 5%;
	display: inline-block;
	vertical-align: middle;
}
.air .air-bottom-echarts{
	width: 100%;
	height: 78%;
	background-color: #fff;
}
#top-right-data{
	width: 100%;
	height: 55%;
	text-align: center;
}
.air .air-bottom-data input{
	display: inline-block;
	vertical-align: middle;
}
.air .el-date-editor.el-input, .el-date-editor.el-input__inner {
  margin-left: 150px
}
</style>
