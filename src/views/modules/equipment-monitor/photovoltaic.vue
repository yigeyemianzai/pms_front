<template>
  <div class="gf_content" id="gf_content">
    <div class="light">
      <div class="light-top">
        <div class="light-top-list">
          <div class="gf_list-data">
            <img src="~@/assets/images/light-list1.png" />
            <div class="gf_list-data-text">
              <p>系统负荷</p>
              <p>
                <span id="load">{{photovoltaics.load}}</span>kw</p>
            </div>
          </div>
          <div class="gf_list-data">
            <img src="~@/assets/images/light-list2.png" />
            <div class="gf_list-data-text">
              <p>背板温度</p>
              <p>
                <span id="backboard">{{photovoltaics.backboard}}</span>°C</p>
            </div>
          </div>
          <div class="gf_list-data">
            <img src="~@/assets/images/light-list3.png" />
            <div class="gf_list-data-text">
              <p>光照度</p>
              <p>
                <span id="illumination">{{photovoltaics.illumination}}</span>LX</p>
            </div>
          </div>
          <div class="gf_list-data">
            <img src="~@/assets/images/light-list4.png" />
            <div class="gf_list-data-text">
              <p>环境温度</p>
              <p>
                <span id="temperature">{{photovoltaics.temperature}}</span>°C</p>
            </div>
          </div>
          <div class="gf_list-data">
            <img src="~@/assets/images/light-list5.png" />
            <div class="gf_list-data-text">
              <p>环境湿度</p>
              <p>
                <span id="humidity">{{photovoltaics.humidity}}</span>°C</p>
            </div>
          </div>
          <div class="gf_list-data">
            <img src="~@/assets/images/light-list6.png" />
            <div class="gf_list-data-text">
              <p>电池容量</p>
              <p>
                <span id="dcrl">{{photovoltaics.dcrl}}</span>%</p>
            </div>
          </div>
          <div class="gf_list-data">
            <img src="~@/assets/images/light-list7.png" />
            <div class="gf_list-data-text">
              <p>运动状态</p>
              <p id="runStatus">{{photovoltaics.runStatus | runStatus}}</p>
            </div>
          </div>
        </div>
        <div class="light-top-right">
          <div class="right-data">
            <img src="~@/assets/images/light-list8.png" />
            <p>日发电量
              <span>
                <span id="powerday">{{photovoltaics.powerDay}}</span>kw</span>
            </p>
          </div>
          <div class="right-data">
            <img src="~@/assets/images/light-list9.png" />
            <p>月发电量
              <span>
                <span id="powermonth">{{photovoltaics.powerMonth}}</span>kw</span>
            </p>
          </div>
          <div class="right-data">
            <img src="~@/assets/images/light-list10.png" />
            <p>总发电量
              <span>
                <span id="powertotal">{{photovoltaics.powerTotal}}</span>kw</span>
            </p>
          </div>
        </div>
      </div>
      <div class="light-bottom">
        <div class="bottom-title">
          <p>太阳能光伏24小时发电量</p>
          <el-date-picker
            v-model="value1"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions">
          </el-date-picker>
        </div>
        <div class="bottom-list" id="bottom-list"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        value1:'',  // 选择的日期值
        photovoltaics: '',  // 数据值信息
        // 设置选择今天及以前的时间
        pickerOptions: {
          disabledDate (time) {
            return time.getTime() > Date.now() - 8.64e6
          }
        }
      }
    },
    created() {
      this.value1 = new Date()
      this.$http({
        url: this.$http.adornUrl('/device/photovoltaic/info'),
        method: 'post',
        /* params: {
          equiptype: 1,
          type: 1
        }, */
      }).then(({data}) => {
        if (data.msg === "success") {
          this.photovoltaics = data.photovoltaic
          }
      })
      this.initChartGf()
    },
    watch: {
      value1: 'initChartGf'  // 选择日期时触发折线图信息重载
    },
    mounted() {
      this.aaa();
      window.onresize = function () {
        if(document.getElementById('gf_content')){
          document.getElementById('gf_content').style.height = (window.innerHeight - 170) + 'px'
          echarts.init(document.getElementById("bottom-list")).resize();
        }
      }
    },
    methods: {
      aaa() {
        document.getElementById("gf_content").style.height =
          window.innerHeight - 170 + "px";
        // this.$refs.contentview.style.height=siteContentViewHeight().minHeight
      },
      initChartGf () {
        var xAxis_data = [];
        var legend_data = [];
        var series_data = [];
        console.log(this.value1)
        this.$http({
          url: this.$http.adornUrl('/device/photovoltaic/chart/energy'),
          method: 'post',
          /* params: {
            equiptype: 1,
            type: 1
          }, */
        }).then(({data}) => {
          if (data.msg === "success") {
            console.log(data.chart.series)
              xAxis_data = data.chart.xAxis;
              legend_data = data.chart.legend;
              $.each(data.chart.series, function (n, dat) {
                // alert(dat.data);
                series_data.push(dat.data);
              });
              var electricity = echarts.init(
                document.getElementById("bottom-list")
              );
              var option = {
                color:["#4ECDB8"],
                tooltip: {
                trigger: 'axis',
                showDelay: 20,
                // hideDelay: 100,
                // axisPointer: {
                //   type: 'cross'
                // }
              },
                  legend: {
                data: legend_data
              },
                grid: {
                  x: 80,
                  y: 50,

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
                  min: 0,
                  max: 300,
                  interval: 50,
                  //y轴刻度

                  axisLine: {
                    lineStyle: {
                      type: "solid",
                      color: "#000", //y轴坐标轴颜色
                      width: "2" //坐标轴宽度
                    }
                  }
                },
                series: [{
                    data: series_data[0],
                    type: "line",
                    symbol: "none",
                    itemStyle: {
                      normal: {
                        lineStyle: {
                          color: "#4ECDB8"
                        }
                      }
                    },
                    areaStyle: {
                      normal: {
                        offset: 1,
                        color: 'rgb(78, 205, 184,0.4)'
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
        })
      }
    },
    filters: {
      runStatus: function (value) {
        if (value == 1) {
          return "正常"
        }
        if (value == 2) {
          return "异常"
        }
        if (value == 3) {
          return "离线"
        }
      }
    }
  };

</script>
<style scoped>
  .gf_content {
    width: 100%;
    height: 100%;
    margin: 0;
  }

  .light-top {
    -webkit-box-sizing: content-box;
    box-sizing: content-box;
  }

  .light {
    width: 100%;
    height: 100%;
  }

  .light-top {
    width: 100%;
    height: 39%;
    margin: 0;
    padding: 1% 0;
  }

  .light-top-list {
    width: 75%;
    height: 90%;
    display: inline-block;
    vertical-align: middle;
  }

  .gf_list-data {
    width: 20%;
    border-radius: 10px;
    border: 1px solid #ccc;
    text-align: center;
    display: inline-block;
    padding: 1% 0;
    margin: 4% 0 0 4%;
    box-shadow: 5px 5px 7px #ccc;
  }

  .gf_list-data img {
    width: 25%;
    display: inline-block;
    vertical-align: middle;
  }

  .gf_list-data-text {
    width: 50%;
    display: inline-block;
    vertical-align: middle;
    line-height: 100%;
    text-align: left;
  }

  .gf_list-data-text p {
    margin: 5% 0;
  }

  .light-top-right {
    width: 24%;
    display: inline-block;
    vertical-align: middle;
    margin: 0 0;
  }

  .right-data {
    width: 100%;
  }

  .right-data img {
    width: 20%;
    margin: 0 0 1% 0;
    display: inline-block;
    vertical-align: middle;
  }

  .right-data p {
    width: 70%;
    margin: 0;
    font-size: 20px;
    text-align: left;
    display: inline-block;
    vertical-align: middle;
  }

  .right-data span {
    margin-left: 10%;
  }

  .light-bottom {
    width: 100%;
    height: 57%;
  }

  .bottom-title {
    width: 100%;
    height: 10%;
  }

  .bottom-title p {
    font-size: 26px;
    display: inline-block;
    vertical-align: middle;
    margin: 0;
    margin-left: 5%;
  }

  .bottom-title>div {
    font-size: 14px;
    vertical-align: middle;
    float: right;
    margin-right: 15%;
  }

  .bottom-list {
    width: 100%;
    height: 90%;
  }

</style>
