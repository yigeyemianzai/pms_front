<template>
<div class="ch_content" id="ch_content">
	<div class="recharge">
		<div class="recharge-top" :data='chargingInfo'>
			<div class="recharge-left">
				<div class="title">充电站信息</div>
				<img src="~@/assets/images/recharge.png" class="recharge-logo" />
			</div>
			<div class="ch_top-list">
				<div class="ch_top-list-data">
					<p class="list-text">充电桩总数:</p>
					<p class="list-num" id='total'>{{chargingInfo.total}}</p>
				</div>
				<div class="ch_top-list-data">
					<p class="list-text">充电中:</p>
					<p class="list-num" id='use'>{{chargingInfo.useNum}}</p>
				</div>
				<div class="ch_top-list-data">
					<p class="list-text">预约数:</p>
					<p class="list-num" id='order'>{{chargingInfo.orderNum}}</p>
				</div>
				<div class="ch_top-list-data">
					<p class="list-text">故障数:</p>
					<p class="list-num" id='bad'>{{chargingInfo.badNum}}</p>
				</div>
				<div class="ch_top-list-data">
					<p class="list-text">空闲数:</p>
					<p class="list-num" id='can'>{{chargingInfo.canNum}}</p>
				</div>
				<div class="ch_top-list-data">
					<p class="list-text">离线数:</p>
					<p class="list-num" id='offline'>{{chargingInfo.offlineNum}}</p>
				</div>
			</div>
			<div class="recharge-cd">
				<img src="~@/assets/images/CD1.png" />
				<div class="cd-text">
					<div class="cd-title">当日充电量</div>
					<div class="cd-num">0.00度</div>
				</div>
			</div>
			<div class="ch_top-right" id="ch_top-right"></div>
		</div>
		<div class="recharge-list">
			<div class="recharge-data" v-for="item in chargingdate" :key="item.equipId">
						<div class="data-top">
							<div class="data-top-title">
								<div class="data-top-dot"></div>
                <p>{{ item.equipCode }}桩-{{item.equipName}}</p>
								<!-- <p>1#桩-1号枪</p> -->
								<img src="~@/assets/images/CD2.png" />
							</div>
							<div class="toggle-button-wrapper" @click="onoff(item.equipId)"> 
                <!-- <el-tooltip :content="'Switch value: ' + value" placement="top"> -->
                    <el-switch
                      v-model= "item.type"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                      active-text='on'
                      inactive-text='off'>
                    </el-switch>
                <!-- </el-tooltip> -->
								<!-- <input type="checkbox" id="toggle-button" name="switch">
								<label for="toggle-button" class="button-label">
									<span class="circle"></span>
									<span class="text on">ON</span>
									<span class="text off">OFF</span>
								</label> -->
							</div>
						</div>
						<div class="data-bottom">
							<div class="bottom-left">
								<div class="bottom-left-data">
									<img src="~@/assets/images/recharge-data1.png" />
									<p>费用：{{item.cost}}元</p>
								</div>
								<div class="bottom-left-data">
									<img src="~@/assets/images/recharge-data2.png" />
									<p>电量: {{item.electric}}kwh</p>
								</div>
								<div class="bottom-left-data">
									<img src="~@/assets/images/recharge-data3.png" />
									<p>开始时间:<br />{{item.begintime | begintime}}<br />{{item.begintime | begintimes}}</p>
								</div>
							</div>
							<div class="bottom-right">
								<div class="bottom-left-data">
									<img src="~@/assets/images/recharge-data4.png" />
									<p>电压：{{item.voltage}}V</p>
								</div>
								<div class="bottom-left-data">
									<img src="~@/assets/images/recharge-data5.png" />
									<p>电流: {{item.ampere}}A</p>
								</div>
								<div class="bottom-left-data">
									<img src="~@/assets/images/recharge-data6.png" />
									<p>功率: {{item.power}}KW</p>
								</div>
							</div>
						</div>
					</div>

		</div>
	</div>
</div>
</template>

<script>
export default {
  data () {
    return {
      chargingInfo: '',  // 充电站信息
      chargingdate: []   // 单个充电桩数据
    }
  },
  created() {
    this.getChagingDate()
    // var xAxis_data = [];
    // var legend_data = [];
    // var series_data = [];
    
    /* this.$http({
      url:this.$http.adornUrl('/device/charging/chart/energy'),
      method: 'post'
    }).then(({data}) => {
      if (data.msg === "success") {
        xAxis_data = data.chart.xAxis;
        legend_data = data.chart.legend;
        series_data = data.chart.series[0].data;
        var electricity = echarts.init(document.getElementById("ch_top-right"));
        var option = {
          title: {
              text: '充电负荷',
              x:"center",
              padding: [0, 0, 20, 50]
            },
          grid: {
            x: 40,
            y: 30,
            x2: 40,
            y2: 45,
            borderWidth: 0
          },
          lineStyle: {
            color: "rgb(255, 255, 255)"
          },
          xAxis: {
            boundaryGap: false,
            type: "category",
            data: xAxis_data,
            name: "时间",
            axisTick: true,
            axisLine: {
              lineStyle: {
                type: "solid",
                color: "#000", //左边线的颜色
                width: "2" //坐标线的宽度
              }
            },
            axisLabel: {
              textStyle: {
                color: "#000" //x轴刻度数值颜色
              }
            }
          },
          yAxis: {
            name: "KW",
            min: 1,
            max: 200,
            interval: 20,
            //y轴刻度

            axisLine: {
              lineStyle: {
                type: "solid",
                color: "#000", //y轴坐标轴颜色
                width: "2" //坐标轴宽度
              }
            }
          },
          series: [
            {
              data: series_data,
              type: "line",
              symbol: "none",
              itemStyle: {
                normal: {
                  lineStyle: {
                    color: "#FBEF1D"
                  }
                }
              },
              lineStyle: {
                type: "dotted"
              }
            }
          ]
        };
        electricity.setOption(option);
      }
    }) */
  },
  mounted() {
    document.getElementById("ch_content").style.height =(window.innerHeight - 170 )+ "px"
    echarts.init(document.getElementById("ch_top-right")).setOption(this.$options.methods.lineOption.bind(this)())
    this.getEnergy()
    window.onresize = function () {
      if(document.getElementById('ch_content')){
        document.getElementById('ch_content').style.height = (window.innerHeight - 170) + 'px'
        echarts.init(document.getElementById("ch_top-right")).resize();
      }
    }    
  },
  methods: {
    // 获取充电负荷折线图
    getEnergy () {
      this.$http({
        url:this.$http.adornUrl('/device/charging/chart/energy'),
        method: 'post'
      }).then(({data}) => {
        if (data.msg === "success") {          
          echarts.init(document.getElementById("ch_top-right")).setOption(this.$options.methods.lineOption.bind(this)(data.chart.xAxis, data.chart.legend, data.chart.series[0].data))
        }
      })
    },
     // 充电桩信息列表
    getChagingDate(){
      this.$http({
        url:this.$http.adornUrl('/device/charging/infos'),
        method: 'post'
      }).then(({data}) => {
        if (data.msg === "success") {
          this.chargingInfo = data.info
          this.chargingdate = data.devices.electricpile
        }   
      })
    },
    // 单个充电桩开关控制
    onoff(id){
      console.log(this)
      // this.$options.methods.getChagingDate.bind(this)()
    },
    // 折线图option
    lineOption (xAxis, legend, series=[]) {
      return Option = {
        title: {
          text: '充电负荷',
          x:"center",
          padding: [0, 0, 20, 50]
        },
        grid: {
          x: 40,
          y: 30,
          x2: 40,
          y2: 45,
          borderWidth: 0
        },
        lineStyle: {
          color: "rgb(255, 255, 255)"
        },
        xAxis: {
          boundaryGap: false,
          type: "category",
          data: xAxis,
          name: "时间",
          axisTick: true,
          axisLine: {
            lineStyle: {
              type: "solid",
              color: "#000", //左边线的颜色
              width: "2" //坐标线的宽度
            }
          },
          axisLabel: {
            textStyle: {
              color: "#000" //x轴刻度数值颜色
            }
          }
        },
        yAxis: {
          name: "KW",
          min: 1,
          max: series[0] == undefined ? 200 : null,
          // interval: 20,
          //y轴刻度

          axisLine: {
            lineStyle: {
              type: "solid",
              color: "#000", //y轴坐标轴颜色
              width: "2" //坐标轴宽度
            }
          }
        },
        series: [
          {
            data: series,
            type: "line",
            symbol: "none",
            itemStyle: {
              normal: {
                lineStyle: {
                  color: "#FBEF1D"
                }
              }
            },
            lineStyle: {
              type: "dotted"
            }
          }
        ]
      }
    }
  },
  filters: {
    // 开始时间过滤
    begintime: function(value, format){
      if(value == ''){
        return null
      }else {
        return value.split(' ')[0]
      }      
    },
    begintimes: function(value, format){
      if(value == ''){
        return null
      }else {
        return value.split(' ')[1]
      }  
    }
  }
};
</script>
<style scoped>
  /* *, *:before, *:after {
    -webkit-box-sizing: content-box; 
     box-sizing: content-box;
} */
.ch_content {
  width: 100%;
  /* height: 100%; */
  margin: 0;
}
.toggle-button-wrapper {
  width: 20%;
  display: inline-block;
  vertical-align: middle;
  margin-left: 2%;
}
.button-label {
  position: relative;
  display: inline-block;
  width: 100%;
  height: 10%;
  background-color: #ccc;
  box-shadow: #ccc 0px 0px 0px 2px;
  border-radius: 30px;
  overflow: hidden;
}
.circle {
  position: absolute;
  top: 0;
  left: 0;
  width: 30px;
  height: 100%;
  border-radius: 50%;
  background-color: #fff;
}
.button-label .text {
  line-height: 30px;
  font-size: 14px;
  text-shadow: 0 0 2px #ddd;
}

.on {
  color: #fff;
  display: none;
  text-indent: 8%;
}
.off {
  color: #fff;
  display: inline-block;
  text-indent: 55%;
}
.button-label .circle {
  left: 0;
  transition: all 0.3s;
}
.recharge {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.recharge-top {
  width: 98%;
  height: 30%;
  padding: 2% 1%;
}
.title {
  width: 100%;
  font-size: 18px;
  margin-bottom: 1%;
}
.recharge-left {
  width: 20%;
  display: inline-block;
  vertical-align: middle;
  margin-bottom: 5%;
}
.recharge-logo {
  width: 100%;
}
.ch_top-list {
  width: 25%;
  height: 100%;
  display: inline-block;
  vertical-align: middle;
  text-align: center;
}
.ch_top-list-data {
  width: 49%;
  display: inline-block;
  margin: 10% 0 0 0;
}
.ch_top-list-data p {
  margin: 0;
  display: inline-block;
}
.list-num {
  width: 40%;
  padding: 2%;
  background-color: #eeeeee;
  border-radius: 10px;
  float: right;
}
.recharge-cd {
  width: 13%;
  height: 48%;
  display: inline-block;
  vertical-align: middle;
  margin-left: 3%;
}
.recharge-cd img {
  width: 28%;
  display: inline-block;
  vertical-align: middle;
}
.cd-text {
  margin-left: 2%;
  display: inline-block;
  vertical-align: middle;
}
.cd-title {
  font-size: 20px;
}
.cd-num {
  width: 100%;
  padding: 6% 0;
  border: 2px solid #f0f0f0;
  border-radius: 5px;
  text-align: center;
  margin-top: 20%;
  color: #4ec1d3;
}
.ch_top-right {
  width: 32.8%;
  height: 100%;
  display: inline-block;
  vertical-align: middle;
}
.recharge-list {
  width: 96%;
  height: 62%;
  margin: 0 auto;
  overflow-y: scroll;
}
.recharge-data,.data-top,.data-bottom,.recharge-list,.recharge-top{
  -webkit-box-sizing: content-box; 
  box-sizing: content-box;
}
.recharge-data {
  width: 25%;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin: 3% 0% 0 5%;
  display: inline-block;
}
.data-top {
  width: 88%;
  padding: 4% 6%;
  border-bottom: 1px solid #ccc;
}
.data-top-dot {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: #46b692;
  display: inline-block;
  vertical-align: middle;
  margin: 0 0 20% 0;
}
.recharge-data p {
  font-size: 20px;
  display: inline-block;
  vertical-align: middle;
  margin: 0 0 20% 0;
}
.data-top-title {
  width: 76%;
  display: inline-block;
}
.data-top-title img {
  width: 24%;
  display: inline-block;
  vertical-align: middle;
  margin-left: 15%;
}
.data-bottom {
  width: 94%;
  height: 68%;
  padding: 0% 3%;
}
.bottom-left {
  width: 49%;
  height: 100%;
  border-right: 1px solid #ccc;
  padding: 5% 0;
  display: inline-block;
  vertical-align: middle;
}
.bottom-left img {
  display: inline-block;
  vertical-align: middle;
}
.bottom-left p {
  margin: 0;
  display: inline-block;
  vertical-align: middle;
  font-size: 16px;
}
.bottom-left-data {
  margin: 0 0 10% 0;
  text-align: left;
}
.bottom-right {
  width: 48.9%;
  height: 100%;
  padding: 5% 0;
  display: inline-block;
  vertical-align: middle;
}
.bottom-right img {
  display: inline-block;
  vertical-align: middle;
  margin-left: 2%;
}
.bottom-right p {
  margin: 0;
  display: inline-block;
  vertical-align: middle;
  font-size: 16px;
}
.bottom-left-data img {
  margin-left: 10%;
  width: 14%;
}
</style>

