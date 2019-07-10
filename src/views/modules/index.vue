<template>
  <div class="index" id="index" ref="contentview">
    <div class="index-left show" id="index-left" v-show="flag">
      <div class="left-electricity">
        <div class="electricity-title">电能： 24小时</div>
        <div class="left-electricity-list" id="electricity" ref="echarts1"></div>
      </div>
      <div class="left-electricity">
        <div class="electricity-title">冷/热能: 24小时</div>
        <div class="left-electricity-list" id="warm" ref="echarts"></div>
      </div>
      <div class="left-electricity">
        <div class="electricity-title">供给水： 24小时</div>
        <div class="left-electricity-list" id="water" ref="echarts"></div>
      </div>
      <div class="left-electricity sum">
        <div class="electricity-title sum-title">能耗统计： 总计</div>
        <div id="sum" class="left-electricity-list" ref="echarts"></div>
      </div>
    </div>
    
    <div class="index-centent" id = "threed" >
        <!-- <el-button @click="kaishi()" class="full">全屏</el-button> 
        <iframe :src="url" frameborder="0" width="100%" height="100%" id="3d"></iframe> -->
    </div>
    <div class="index-right show" v-show="flag">
      <div class="right-list">
        <div class="right-list-img">
          <img src="../../assets/images/right-list1.png">
        </div>
        <div class="right-list-data">
          <span>楼宇总电耗</span>
        </div>   
        <p class="right-list-num">
          <span class="num">{{rightData.sitePower}}</span>
          <span class="right-list-code">MWh</span>
        </p>
      </div>
      <div class="right-list right-lists">
          <div class="right-lists-del">
            <div class="right-list-img">
              <img src="~@/assets/images/right-list6.png">
            </div>
            <div class="right-list-data">
              <span>高温相变储热<br/>系统总电耗</span>
            </div>
            <p class="right-list-num">
              <span class="num">{{rightData.highPower}}</span>
              <span class="right-list-code">MWh</span>
            </p>
          </div>
          <div class="right-lists-del">
            <div class="right-list-img">
              <img src="~@/assets/images/right-list7.png">
            </div>
            <div class="right-list-data">
              <span>总供热</span>
            </div>
            <p class="right-list-num">
              <span class="num">{{rightData.highStoredPower}}</span>
              <span class="right-list-code">MWh</span>
            </p>
          </div>        
        </div>
      <div class="right-list right-lists">
        <div class="right-lists-del">
          <div class="right-list-img">
            <img src="~@/assets/images/right-list8.png">
          </div>
          <div class="right-list-data">
            <span>压缩空气储能<br/>系统总电耗</span>
          </div>
          <p class="right-list-num">
            <span class="num">{{rightData.airPower}}</span>
            <span class="right-list-code">MWh</span>
          </p>
        </div>
        <!-- <div class="right-lists-dels">
          <div class="right-list-img">
            <img src="~@/assets/images/right-list9.png">
          </div>
          <div class="right-list-data">
            <span>总发电</span>
          </div>
          <p class="right-list-num">
            <span class="num">{{rightData.airCapacityPower}}</span>
            <span class="right-list-code">MWh</span>
          </p>
        </div> -->
        <div class="right-lists-del">
            <div class="right-list-img">
              <img src="~@/assets/images/right-list9.png">
            </div>
            <div class="right-list-data">
              <span>总供能</span>
            </div>
            <p class="right-list-num">
              <span class="num">{{rightData.airStoredPower}}</span>
              <span class="right-list-code">MWh</span>
            </p>
          </div>          
      </div>
        <div class="right-list">
            <div class="right-list-img">
              <img src="~@/assets/images/right-list10.png">
            </div>
            <div class="right-list-data">
              <span>光热发电系统<br/>总供热量</span>
            </div>
            <p class="right-list-num">
              <span class="num">{{rightData.lightHotCapacityPower}}</span>
              <span class="right-list-code">MWh</span>
            </p>
        </div>
      <div class="right-list">
        <div class="right-list-img">
          <img src="~@/assets/images/index-right1.png">
        </div>
        <div class="right-list-data">
          <span>VRV空调总电耗</span>
        </div>
        <p class="right-list-num">
          <span class="num">{{rightData.vrvPower}}</span>
          <span class="right-list-code">MWh</span>
        </p>
      </div>
      <div class="right-list">
        <div class="right-list-img">
          <img src="~@/assets/images/right-list4.png">
        </div>
        <div class="right-list-data">
          <span>精密空调总电耗</span>
        </div>
        <p class="right-list-num">
          <span class="num">{{rightData.precisionPower}}</span>
          <span class="right-list-code">MWh</span>
        </p>
      </div>
     
    </div>
  </div>
</template>
<script scoped>
  import siteContentViewHeight from '../main-content'
  import echarts from 'echarts'
  export default {
    data() {
      return {
        electricity:{},
        warm:{},
        water:{},
        sum:{},
        flag: true,
        rightData:{},
        total:'',
        // 3D图请求地址
        url: ''
      }
    },
    created() {
      // 获取3D图地址
      this.getBaseUrl1()
     /*  this.$http({
        url: this.$http.adornUrl('/home/api/monitor/data'),   // 3D图相关
        method: 'post',
      }).then(({
      }) => {
        // this.url="http://23.46.241.40:8081/index.html"
        
      }) */
    },
    mounted() {
      let that = this
      /* setTimeout(() => {
        alert(123) 
        var frame = window.frames["3d"]
        console.log(frame)
        // var obtn = frame.document.getElementById("fullScreen");
        // window.frames["3d"]
       var aa =  document.getElementById('3d').contentWindow.document.getElementById("fullScreen")
       console,log(aa)
       
      //  console.log(obtn)
        Obtn.onclick = function(){
          alert(123)
          this.$options.methods.toggleFullscreen();
        }
      }, 10000); */
      this.aaa()
      // this.bbb()
      this.right()
      this.initCharts1()
      this.initCharts2()
      this.initCharts3()
      this.initCharts4()
      window.onresize = function () {
        if(document.getElementById('index')){
          that.$refs.contentview.style.height = (window.innerHeight - 170) + 'px'
          that.electricity.resize();
          that.warm.resize();
          that.water.resize();
          that.sum.resize();
        }
      }
      /* //添加退出全屏时的监听事件
    window.addEventListener("fullscreenchange", function(e) {
      update_iframe_pos();
    });
    window.addEventListener("mozfullscreenchange", function(e) {
      update_iframe_pos();
    });
    window.addEventListener("webkitfullscreenchange", function(e) {
      update_iframe_pos();
    });
    window.addEventListener("msfullscreenchange", function(e) {
      update_iframe_pos();
    }) */
    },
    methods: {
      // 获取3D图地址
      getBaseUrl1() {
        this.url = window.SITE_CONFIG.baseUrl1
      },
      showFullScreen(){
        // let full =document.getElementById('threed')
        // full.style.width="100%";
        // document.getElementById('index').remove();
        this.flag = !this.flag
        // alert(this.flag)
        // document.getElementById("index-left").style.visibility=this.flag
        if(this.flag==false){
          // doucument.getElementById("threed").style.width="50%"
          $("#threed").css("width","100%")
          // $("#threed").animate({"width":"100%"},1500);
          // alert(1)
        }else{
          // document.getElementById("threed").style.width="100%"
          $("#threed").css("width","50%")
  // alert(2)
        }
      },
      aaa() {
        this.$refs.contentview.style.height = (window.innerHeight - 170) + 'px'
        // this.$refs.contentview.style.height=siteContentViewHeight().minHeight
      },
      right() {
        this.$http({
          // url: this.$http.adornUrl('/home/chart/energytotal'),
          url: this.$http.adornUrl('/home/right/indexInfo'),
          method: 'post',
          data: this.$http.adornData()
        }).then(({
          data
        }) => {
          console.log(data);
          if (data.code === 0) {
            this.rightData =data.total
          }
        })
      },
      initCharts1() {
        this.$http({
          url: this.$http.adornUrl('/home/chart/energy'),
          method: 'post',
          data: this.$http.adornData()
        }).then(({
          data
        }) => {
          var xAxis_data1 = [];
          var xAxis_data2=[]
          var legend_data1 = [];
          var series_data1 = [];
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
            let arr1 = [];
            for (let i = 0; i<=24; i++) {
              if (i < 10) {
                i = "0" + i
              }
                arr1.push(i + ":00" )
              }
            
            xAxis_data1 = data.chart.xAxis==null?arr:data.chart.xAxis;
            xAxis_data2 = arr1;
            legend_data1 = data.chart.legend;
            $.each(data.chart.series, function (n, dat) {
              // alert(dat.data);
              series_data1.push(dat.data)
            });
          }
         this.electricity = echarts.init(document.getElementById('electricity'));
          var option = {
            // color: ['#FBEF1D', '#157373', '#3398DB', '#3398DB'],
            color: ['#FBEF1D', '#3398DB'],
            legend: {
              data: legend_data1
            },
            axisTick: { //y轴刻度线
              show: false
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
              x: 50,
              y: 50,
              x2: 50,
              y2: 30,
              borderWidth: 0
            },
            lineStyle: {
              color: 'rgb(255, 255, 255)'
            },
            xAxis:[ {
              boundaryGap: false,

              nameGap:"20",
              type: 'category',
              data: xAxis_data1,
              name: '时间',
              axisTick: false,
              axisLine: {
                lineStyle: {
                  type: 'solid',
                  color: '#ccc', //左边线的颜色
                  width: '2' //坐标线的宽度
                }
              },
              axisLabel: {
                textStyle: {
                  color: '#ccc' //x轴刻度数值颜色
                }
              },
              splitLine: {
                lineStyle: {
                  type: 'dashed'
                }
              }
            },{
              type: 'category',
              data: xAxis_data2,
              axisTick: false,
              axisLine: {
                lineStyle: {
                  type: 'solid',
                  color: '#ccc', //左边线的颜色
                  width: '2' //坐标线的宽度
                }
              },
              axisLabel: {
                textStyle: {
                  color: '#fff' //x轴刻度数值颜色
                }
              },
              splitLine: {
                lineStyle: {
                  type: 'dashed'
                }
              }
            },],
            yAxis: [{
              min: 0,
              max: data.chart.series[0].data==false?250:null,
              left:60,
              nameLocation:'end',
              name:'kWh',
              type: 'value',
              nameGap:"20",
              //y轴刻度
              axisLabel: {
                //设置y轴数值为%
                // formatter: '{value}'+"kwh",
                textStyle: {
                  color: '#ccc' //y轴刻度数值颜色
                }
              },
              axisLine: {
                lineStyle: {
                  type: 'solid',
                  color: '#ccc', //y轴坐标轴颜色
                  width: '2' //坐标轴宽度
                }
              },
              splitLine: {
                lineStyle: {
                  type: 'dashed'
                }
              }
            },{
              name:"kW",
              nameGap:"20",
              type: 'value',
              //y轴刻度
              axisLabel: {
                //设置y轴数值为%
                // formatter: '{value} kw',
                textStyle: {
                  color: '#ccc' //y轴刻度数值颜色
                }
              },
              axisLine: {
                lineStyle: {
                  type: 'solid',
                  color: '#ccc', //y轴坐标轴颜色
                  width: '2' //坐标轴宽度
                }
              },
              splitLine: {
                lineStyle: {
                  type: 'dashed'
                }
              }
            }
          ],
            series: [{
              yAxisIndex: 0,
              xAxisIndex: 0,
              type: 'line',
              name: legend_data1[0],
              data: series_data1[0],
              symbol: 'none',
              itemStyle: {
                normal: {
                  lineStyle: {
                    color: '#FBEF1D'
                  }
                }
              },
              lineStyle: {
                type: 'dotted'
              }
            },
             /* {
              connectNulls: true,
              yAxisIndex: 0,
              xAxisIndex: 0,
              type: 'line',
              name: legend_data1[1],
              data: series_data1[1],
              symbol: 'none',
              itemStyle: {
                normal: {
                  lineStyle: {
                    color: '#157373'
                  }
                }
              },
            }, */
             {
              xAxisIndex: 1,
              type: 'bar',
              name: legend_data1[2],
              yAxisIndex: 1,
              data: series_data1[2],

            }]
          };
          this.electricity.setOption(option);
        })
      },
      initCharts2() {
        this.$http({
          url: this.$http.adornUrl('/home/chart/coldheat'),
          method: 'post',
          data: this.$http.adornData()
        }).then(({
          data
        }) => {
          // console.log(data);
          var xAxis_data2 = [];
          let xAxis2 =[];
          var legend_data2 = [];
          var series_data2 = [];
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
            let arr1 = [];
            for (let i = 0; i<=24; i++) {
              if (i < 10) {
                i = "0" + i
              }
                arr1.push(i + ":00" )
              }
            xAxis_data2 = data.chart.xAxis==null?arr:data.chart.xAxis;
            xAxis2 =arr1;
            legend_data2 = data.chart.legend;
            $.each(data.chart.series, function (n, dat) {
              // alert(dat.data);
              series_data2.push(dat.data)
            });
          }
           this.warm = echarts.init(document.getElementById('warm'));
          var option = {
            // color: ['#FBEF1D', '#157373', '#3398DB', '#3398DB'],
            color: ['#FBEF1D','#3398DB'],
            legend: {
              data: legend_data2
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
            axisTick: { //y轴刻度线
              show: false
            },
            grid: {
              x: 50,
              y: 50,
              x2: 50,
              y2: 30,
              borderWidth: 0
            },
            lineStyle: {
              color: 'rgb(255, 255, 255)'
            },
            xAxis: [{
              boundaryGap: false,
              nameGap:"20",
              type: 'category',
              data: xAxis_data2,
              name: '时间',
              axisTick: false,
              axisLine: {
                lineStyle: {
                  type: 'solid',
                  color: '#ccc', //左边线的颜色
                  width: '2' //坐标线的宽度
                }
              },
              axisLabel: {
                textStyle: {
                  color: '#ccc' //x轴刻度数值颜色
                }
              },
              splitLine: {
                lineStyle: {
                  type: 'dashed'
                }
              }
            },{
              type: 'category',
              data: xAxis2,
              axisTick: false,
              axisLine: {
                lineStyle: {
                  type: 'solid',
                  color: '#ccc', //左边线的颜色
                  width: '2' //坐标线的宽度
                }
              },
              axisLabel: {
                textStyle: {
                  color: '#fff' //x轴刻度数值颜色
                }
              },
              splitLine: {
                lineStyle: {
                  type: 'dashed'
                }
              }
            }],
            yAxis: [{
              min: 0,
              max: data.chart.series[0].data==false?800:null,
              nameGap:"20",
              name:'kWh',
              type: 'value',
              //y轴刻度
              axisLabel: {
                //设置y轴数值为%
                formatter: '{value}',
                textStyle: {
                  color: '#ccc' //y轴刻度数值颜色
                }
              },
              axisLine: {
                lineStyle: {
                  type: 'solid',
                  color: '#ccc', //y轴坐标轴颜色
                  width: '2' //坐标轴宽度
                }
              },
              splitLine: {
                lineStyle: {
                  type: 'dashed'
                }
              }
            },
            {
              nameGap:"20",
              name:'kW',
              type: 'value',
              //y轴刻度
              axisLabel: {
                //设置y轴数值为%
                formatter: '{value}',
                textStyle: {
                  color: '#ccc' //y轴刻度数值颜色
                }
              },
              axisLine: {
                lineStyle: {
                  type: 'solid',
                  color: '#ccc', //y轴坐标轴颜色
                  width: '2' //坐标轴宽度
                }
              },
              splitLine: {
                lineStyle: {
                  type: 'dashed'
                }
              }
            }],
            series: [{
              xAxisIndex: 0,
              yAxisIndex: 0,
              name: legend_data2[0],
              data: series_data2[0],
              type: 'line',
              symbol: 'none',
              itemStyle: {
                normal: {
                  lineStyle: {
                    color: '#FBEF1D'
                  }
                }
              },
              lineStyle: {
                type: 'dotted'
              }
            },
             /* {
              connectNulls: true,
              xAxisIndex: 0,
              yAxisIndex: 0,
              name: legend_data2[1],
              data: series_data2[1],
              type: 'line',
              symbol: 'none',
              itemStyle: {
                normal: {
                  lineStyle: {
                    color: '#157373'
                  }
                }
              },
            },  */
            {
              xAxisIndex: 1,
              yAxisIndex: 1,
              name: legend_data2[2],
              data: series_data2[2],
              type: 'bar',
            }]
          };
         this. warm.setOption(option);
        })
      },
      initCharts3() {
        this.$http({
          url: this.$http.adornUrl('/home/chart/water'),
          method: 'post',
          data: this.$http.adornData()
        }).then(({
          data
        }) => {
          // console.log(data);
          var xAxis_data3 = [];
          var legend_data3 = [];
          var series_data3 = [];
          if (data.msg === "success") {
            let arr1 = [];
            for (let i = 0; i<=24; i++) {
              if (i < 10) {
                i = "0" + i
              }
                arr1.push(i + ":00" )
              }
            xAxis_data3 = arr1;
            legend_data3 = data.chart.legend;
            series_data3 = data.chart.series
           this.water = echarts.init(document.getElementById('water'));
          var option = {
            color: ['#3398DB'],
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
                data: legend_data3
              },
            xAxis: {
              type: 'category',
              data: xAxis_data3,
              name: '时间',
              axisTick: false,
              axisLine: {
                lineStyle: {
                  type: 'solid',
                  color: '#ccc', //左边线的颜色
                  width: '2' //坐标线的宽度
                }
              },
              axisLabel: {
                textStyle: {
                  color: '#ccc' //x轴刻度数值颜色
                }
              },
              splitLine: {
                lineStyle: {
                  type: 'dashed'
                }
              }
            },
            yAxis: {
              min:0,
              max: data.chart.series==false?800:null,
              name:'m³',
              type: 'value',
              //y轴刻度
              axisLabel: {
                //设置y轴数值为%
                formatter: '{value}',
                textStyle: {
                  color: '#ccc' //y轴刻度数值颜色
                }
              },
              axisLine: {
                lineStyle: {
                  type: 'solid',
                  color: '#ccc', //y轴坐标轴颜色
                  width: '2' //坐标轴宽度
                }
              },
              splitLine: {
                lineStyle: {
                  type: 'dashed'
                }
              }
            },
            grid: {
              x: 50,
              y: 30,
              x2: 50,
              y2: 30,
              borderWidth: 0
            },
            series: [{
              name: series_data3[0].name,
              data: series_data3[0].data,
              type: 'bar'
            }]
          };
          // 为echarts对象加载数据
          this.water.setOption(option);
          }
        })
      },
      initCharts4() {
        this.$http({
          url: this.$http.adornUrl('/home/chart/totalenergy'),
          method: 'post',
          data: this.$http.adornData()
        }).then(({
          data
        }) => {
          // var data_name = [];
          // var data_value = [];
          if (data.msg === "success") {
            this.total = data.chart.data
          }
          this.sum = echarts.init(document.getElementById('sum'));
           
          var option = {
            toolbox:{
              x:'left',
            },
            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            // color:['#48cda6','#fd87fb','#11abff','#ffdf6f','#968ade'],  //手动设置每个图例的颜色
            legend: {
              type:'scroll',
              orient: 'vertical',
              x: 'right',
              data: data.chart.legend
            },
            series: [{
              name: "用电占比",
              type: 'pie',
              center: ['17%', '50%'],  //设置饼的原心坐标 不设置就会默认在中心的位置
              radius: ['55%', '90%'],  //饼图的半径,第一项是内半径,第二项是外半径,内半径为0就是真的饼,不是环形
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: 'outside'
              },
              emphasis: {
                show: false,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: data.chart.series.data
            },
            {
              name: '冷热能储能占比',
              type: 'pie',
              center: ['52%', '50%'],  //设置饼的原心坐标 不设置就会默认在中心的位置
              radius: ['55%', '90%'],  //饼图的半径,第一项是内半径,第二项是外半径,内半径为0就是真的饼,不是环形
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: 'outside'
              },
              emphasis: {
                show: false,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data:  data.chart.series.data2
            }
          ] 
          };
          // 为num对象加载数据
          this.sum.setOption(option);
        })
      },
      /* load(){
        var frame = window.frames[0]
        var obtn = frame.document.getElementById("fullScreen");
        // window.frames["3d"]
       alert(obtn)
       console.log(obtn)
        Obtn.onclick = function(){
          alert(123)
          this.$options.methods.toggleFullscreen();
        }
      },
      toggleFullscreen(){
        if(document.fullscreenElement ||
           document.mozFullScreenElement ||
           document.webkitFullscreenElement ||
           document.msFullscreenElement){
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }else{
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            } else if (document.body.msRequestFullscreen) {
                document.body.msRequestFullscreen();
            }
        }
 
        //更新iframe定位
        this.$options.methods.update_iframe_pos();
      },
      //退出全屏时恢复全屏按钮、iframe的定位方式
    update_iframe_pos(){
        if(document.fullscreenElement ||
            document.mozFullScreenElement ||
            document.webkitFullscreenElement ||
            document.msFullscreenElement){
            $("#threed").addClass("ifr_fixed");
            // $("#fullScreen").addClass("full_fixed");
        }else{
            $("#threed").removeClass("ifr_fixed");
            // $("#fullScreen").removeClass("full_fixed");
        }
    } */

    //打开3d全屏
    kaishi() {
      var docElm = document.getElementById('3d');//要被全屏的元素
      //W3C   
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
      }
      //FireFox   
      else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
      }
      //Chrome等   
      else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
      }
      //IE11   
      else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen();
      }
    },
    
    // 关闭3d全屏
    guanbi() {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
    }
  }

</script>
<style>
  .index .num{
    font-size: 1.1vw;
  }
  .index .full{
    position: absolute;
    z-index: 999;
    top:0;
    right: 0;
  }
 /*  .index .ifr_fixed{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
  } */
  .index {
    width: 100%;
    height: 100%;
    margin: 0;
    /* min-height: 800px */
  }

  .index-left {
    width: 28%;
    height: 98%;
    border-radius: 8px;
    margin: 1% 1% 0 1%;
    display: inline-block;
    vertical-align: middle;
  }

  .left-electricity {
    width: 100%;
    height: 23.5%;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    margin-bottom: 2%;
    border: 1px solid #f0f0f0;
  }

  .electricity-title {
    width: 100%;
    margin: 0% auto;
    line-height: 200%;
    background-color: #F6F6F6;
    padding: 0 5%;
    color: #686868;
  }

  .left-electricity-list {
    width: 100%;
    height: 83%;
    background-color: #fff;
    box-shadow: 5px 5px 7px #f0f0f0;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }

  /* .color1 {
    background-color: #FFD409 !important;
  }

  .color2 {
    background-color: #16BBFD !important;
  }

  .color3 {
    background-color: #FFAD00 !important;
  }

  .color4 {
    background-color: #4E6ED3 !important;
  }

  .color5 {
    background-color: #0272B1 !important;
  }

  .color6 {
    background-color: #008453 !important;
  }

  .color7 {
    background-color: #E7E7E7 !important;
  } */

  #sum {
    width: 100%;
    height: 86%;
    margin-bottom: 0%;
    display: inline-block;
    vertical-align: middle;
    border: none;
  }

  .sum-list {
    width: 100%;
    height: 70%;
    display: inline-block;
    vertical-align: middle;
    margin-top: 5%;
  }

  .expend {
    width: 48%;
    height: 20%;
    display: inline-block;
    vertical-align: middle;
    font-size: 10px;
  }

  .expend-list {
    width: 15px;
    height: 15px;
    border-radius: 10px;
    margin: 0% auto;
    margin-right: 2%;
    background-color: #FF3436;
    display: inline-block;
    vertical-align: middle;
  }

  .expend span {
    display: inline-block;
    vertical-align: middle;
  }

  .index-centent {
    width: 50%;
    height: 98%;
    border-radius: 25px;
    display: inline-block;
    vertical-align: middle;
    position: relative;
    text-align: left;

    background: url('../../assets/images/index.jpg')  no-repeat;
    background-size:100% 100%;
  }

  /* .index-centent img {
    width: 100%;
    height: 100%;
    display: block;
    border-radius: 1%;
  } */

  .centent-list {
    width: 14%;
    position: absolute;
    top: 27%;
    left: 6%;
  }

  .centent-title {
    width: 100%;
    background-color: rgba(255, 174, 0, 0.7);
    color: #fff;
    padding: 1% 0%;
    border-radius: 10px;
    font-size: 18px;
    text-align: center;
  }

  .centent-list img {
    max-width: 35%;
    margin: 8% 30%;
  }

  .list-2 {
    position: absolute;
    top: 53%;
    left: 55%;
  }

  .list-2 div {
    background-color: rgba(0, 133, 84, 0.7);
  }

  .list-3 {
    position: absolute;
    top: 25%;
    left: 15%;
  }

  .index-right {
    width: 18%;
    height: 98%;
    border-radius: 8px;
    margin: 0 0 0 1%;
    display: inline-block;
    vertical-align: middle;
  }

  .right-list {
    width: 100%;
    height: 15%;
    border: 1px solid #F0F0F0;
    box-shadow: 5px 5px 7px #f0f0f0;
    text-align: center;
    margin-bottom: 1%;
    display: table
  }
  .right-lists {
    height: 20%;
  }
  .right-listss {
    height: 30%;
  }
  .right-lists-del {
    width: 100%;
    height: 50%;
    display: table
  }
  .right-lists-dels {
    width: 100%;
    height: 33%;
    display: table
  }
  .right-list-data {
    display: table-cell;
    vertical-align: middle;
    width: 45%;
    font-size: 0.9vw;
    overflow: hidden;
    text-align: left
  }
  .right-list-data span {
    /* white-space: nowrap; */
  }

  .right-list img {
    /* max-width: 16%; */
    width: 100%;
    display: inline-block;
    vertical-align: middle;
    /* margin: 0 1%; */
  }

  .right-list-name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 31%;
    line-height: 100%;
    display: table-cell;
    vertical-align: middle;
    font-size: 16px;
    text-align: left;
    margin:1em 0;
  }

  .right-list-img {
    display: table-cell;
    vertical-align: middle;
    width: 20%;
  }

  .right-list-num {
    width: 35%;
    color: #06CCBC;
    margin-left: 0px;
    font-size: 16px;
    font-weight: bold;
    margin: 0;
    display: table-cell;
    vertical-align: middle;
  }

  .right-list-code {
    color: #000;
    font-size: 14px;
    font-weight: normal;
    margin-left: 1px;
  }

  .content-layer {
    width: 94%;
    height: 28%;
    position: absolute;
    bottom: 0;
    left: 3%;
    background-color: rgba(0, 0, 0, 0.5);
    border-top-left-radius: 1%;
    border-top-right-radius: 1%;
    padding-top: 2%;
  }

  /* .index_layer-list {
    width: 34%;
    display: inline-block;
    line-height: 230%;
    color: #fff;
    font-size: 18px;
    margin-left: 15%;
  } */

  .layer-x {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    text-align: center;
    line-height: 30px;
    background-color: rgba(0, 0, 0, 0);
    border: 2px solid #fff;
    color: #fff;
    position: absolute;
    right: 2%;
    font-size: 18px;
  }

  .index-layer-on {
    width: 8%;
    height: 8%;
    background-color: #fff;
    position: absolute;
    top: 5%;
    left: 5%;
    border: 5px solid #ccc;
    color: #fff;
    border-radius: 10px;
  }

  .index-layer-on img {
    max-width: 95%;
    display: inline-block;
  }

  .index-layer-on p {
    width: 100%;
    display: inline-block;
    margin: 0;
    text-align: center;
  }

</style>
