<template>
  <div id="illums" class="illums">
    <div class="illum">
      <div class="illum-top">
        <div class="illum-echarts" id="echarts"></div>
        <div class="illum-icon">
          <div class="list-class">
            <div class="illum-list-img">
              <img src="~@/assets/images/illumination.png" />
            </div>
            <div class="illum-list-data">
              <p class="num-class">照明总数
                <span id='size'></span>
              </p>
            </div>           
          </div>
          <div class="list-class">
            <div class="illum-list-img">
              <img src="~@/assets/images/socket-icon2.png" />
            </div>
            <div class="illum-list-data">
              <p class="num-class">异常设备
                <span id='exception'></span>
              </p>
            </div>
          </div>
          <div class="list-class">
            <div class="illum-list-img">
              <img src="~@/assets/images/socket-icon3.png" />
            </div>
            <div class="illum-list-data">
              <p class="num-class">离线设备
                <span id='offline'></span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="illum-nav">
        <img src="~@/assets/images/icon-on.png" @click="all_onoff(1)">
        <span>全开</span>
        <img src="~@/assets/images/icon-off.png" @click="all_onoff(0)">
        <span>全关</span>
        <div class="illum-input">
          <img src="~@/assets/images/icon-seo.png" class="icon-seo" />
          <input type="text" name="" class="illum-nav-text" placeholder="请输入检索关键词" />
        </div>
        <input type="button" name="" value="搜索" class="illum-nav-but" />
      </div>
      <div class="illum-data">
        <div class="zm_data">
          <div class="zm-list" v-for="(item,index) in items " :key="item.id ">
            <div class="zm_list-title">
              <img src="~@/assets/images/illumination.png" />
            </div>
            <div class="list-text">
              <p>{{item.equipCode}}</p>
              <div class="illum_turn">
              <!-- <img v-if="item.runStatus ==1" src="~@/assets/images/icon-on.png" @click="turn(item.runStatus,item.areaId,index)" :id="getId(index)" />
              <img v-else src="~@/assets/images/icon-off.png" @click="turn(item.runStatus,item.areaId,index)" :id="getId(index)" /> -->
              <img :src="item.runStatus ==1?'./static/img/icon-on.png':'./static/img/icon-off.png'" @click="turn(item.runStatus,item.areaId,index)" :id="getId(index)" />
            </div>
            </div>
            <div class="zm_list-name">{{item.equipName}}</div>
            <div class="list-visit">
              <p>Uab:300
                <span>Ia:300</span>
              </p>
              <p class="list-color">Uab:300
                <span>Ia:300</span>
              </p>
              <p>Uab:300
                <span>Ia:300</span>
              </p>
              <p class="list-color">Uab:300
                <span>Ia:300</span>
              </p>
              <p>Uab:300
                <span>Ia:300</span>
              </p>
              <p class="list-color">Uab:300
                <span>Ia:300</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
				items:[]
      }
    },
    mounted() {
      this.aaa()
      this.list()
      this.initEcharts()
      this.cz_info()
      window.onresize = function () {
        if(document.getElementById('illums')){
          document.getElementById('illums').style.height = (window.innerHeight - 170) + 'px'
          socket_echarts = echarts.init(document.getElementById('echarts')).resize();
        }
      }
    },
    methods: {
			getId(index) {
        return "zm_switch" + parseInt(++index)
      },
      aaa() {
        document.getElementById('illums').style.height = (window.innerHeight - 170) + 'px'
      },
      list() {
        this.$http({
          url: this.$http.adornUrl('/device/plugbase/list'),
          method: 'post',
          data: this.$http.adornData()
        }).then(({
          data
        }) => {
          console.log(data);
          if (data.msg === "success") {
						this.items=data.devices
          }
        })
      },
      initEcharts() {
        var socket_xAxis_data = [];
        var socket_legend_data = [];
        var socket_series_data = [];
        this.$http({
          url: this.$http.adornUrl('/device/plugbase/chart/energy'),
          method: 'post',
          data: this.$http.adornData()
        }).then(({
          data
        }) => {

          console.log(data);
          if (data.msg === "success") {
            console.log(data)
            socket_xAxis_data = data.chart.xAxis;
            socket_legend_data = data.chart.legend;
            $.each(data.chart.series, function (n, dat) {
              socket_series_data.push(dat.data);
            });
            var socket_echarts = echarts.init(document.getElementById('echarts'));
            // electricity 
            var socket_option = {
              title:{
                x:100,
                y: 'top',  
                text:'照明分区24小时负荷与预测',
                textStyle: {
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: '#333'          // 主标题文字颜色
                },
              },
              color: ['#FBEF1D', '#157373'],
              legend: {
                orient: 'horizontal',
                // selectedMode: false,
                data: socket_legend_data, //分别修改legend格式
                textStyle: {
                  fontSize: 12,
                  color: '#000'
                },
              },
              grid: {
                x: 80,
                y: 60,
                x2: 40,
                y2: 45,
                borderWidth: 0
              },
              xAxis: {
                type: 'category',
                boundaryGap: false,
                data: socket_xAxis_data
              },
              yAxis: {
                name: 'KW',
                min: 0,
                max: 200,
                splitNumber: 4,
                axisLine: {
                  lineStyle: {
                    type: 'solid',
                    color: '#666', //y轴坐标轴颜色
                    width: '1' //坐标轴宽度
                  }
                },
                splitLine: {
                  show: false
                }
              },
              series: [{
                name: socket_legend_data[0],
                data: socket_series_data[0],
                type: 'line',
                symbol: 'none',
                itemStyle: {
                  normal: {
                    lineStyle: {
                      color: '#FBEF1D'
                    }
                  }
                },
              }, {
                name: socket_legend_data[1],
                data: socket_series_data[1],
                type: 'line',
                symbol: 'none',
                itemStyle: {
                  normal: {
                    lineStyle: {
                      color: '#157373'
                    }
                  }
                },
              }]
            };
            socket_echarts.setOption(socket_option);
          }
        })
      },
      cz_info() {
        this.$http({
          url: this.$http.adornUrl('/device/plugbase/partitionsearch'),
          method: 'post',
          data: this.$http.adornData()
        }).then(({
          data
        }) => {
          if (data.msg === "success") {
            $("#exception").html(data.info.exception);
            $("#offline").html(data.info.offline);
            $("#size").html(data.info.size)
          }
        })
      },
      turn(status, id, index) {
        console.log(this)
        this.$http({
          url: this.$http.adornUrl('/device/plugbase/switchgear'),
          method: 'post',
          data: this.$http.adornData({
            // scope: 1,
            // onoff: a,
            // type: 1,
            id: id
          }),
        }).then(({
          data
        }) => {
          if (data.msg === "success") {
            index = ++index;
            if (status === '1') {
              $("#zm_switch" + index).attr("src", "./static/img/icon-off.png")
            } else {
              $("#zm_switch" + index).attr("src", "./static/img/icon-on.png")
            }
          }
        })
      },
      all_onoff(a) {
        this.$http({
          url: this.$http.adornUrl('/device/plugbase/switchgear'),
          method: 'post',
          data: this.$http.adornData({
            scope: 1,
            onoff: a,
            type: 1
          }),
        }).then(({
          data
        }) => {
          if (data.msg === "success") {
            if (a > 0) {
              $(".zm_data .list-text img").attr("src", "./static/img/icon-on.png")
            } else {
              $(".zm_data .list-text img").attr("src", "./static/img/icon-off.png")
            }
          };
        })
      }
    }
  }

</script>
<style scoped>
  .illums .illum_turn{
    width: 70%;
  height: 50%;
  }
  .illums .illum_turn img{
  width: 100%;
  height: 100%;
}
  .illums {
    width: 100%;
    height: 100%;
    margin: 0;
  }

  .illums .illum {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .illums .illum-top {
    width: 100%;
    height: 40%;
    background-color: #fff;
  }

  .illums .illum-echarts {
    width: 75%;
    height: 100%;
    background-color: #fff;
    display: inline-block;
    vertical-align: middle;
  }

  .illums .illum-icon {
    width: 24%;
    height: 100%;
    background-color: #fff;
    display: inline-block;
    vertical-align: middle;
    padding: 1% 0;
    text-align: center;
  }

  .illums .list-class {
    width: 100%;
    height: 30%;
    display: table
  }

  /* .illums .list-class img {
    max-width: 25%;
    display: inline-block;
    vertical-align: middle;
  } */

  .illums .num-class {
    width: 70%;
    display: inline-block;
    vertical-align: middle;
    font-size: 1.2vw;
    margin-left: 2%;
    text-align: left;
  }

  .illums .num-class span {
    font-size: 1.2vw;
    margin-left: 12%;
  }

  .illums .illum-nav {
    width: 90%;
    padding-left: 5%;
    position: relative;
  }

  .illums .illum-nav img {
    max-width: 7%;
    vertical-align: middle;
    margin-left: 2%;
  }

  .illums .illum-nav span {
    font-size: 18px;
    vertical-align: middle;
    margin-left: 1%;
  }

  .illums .illum-nav-text {
    width: 80%;
    font-size: 18px;
    border: 1px solid #666;
    padding: 2% 5% 2% 12%;
    border-radius: 10px;
    letter-spacing: 1px;
  }

  .illums .illum-input {
    position: relative;
    width: 30%;
    display: inline-block;
    margin-left: 10%;
  }

  .illums .icon-seo {
    position: absolute;
    top: 20%;
    left: 2%;
    max-width: 100%;
  }

  .illums .illum-nav-but {
    width: 6%;
    font-size: 16px;
    padding: 0.6% 1%;
    border-radius: 5%;
    border: none;
    background-color: #1469A8;
    color: #fff;
    cursor: pointer;
    margin-left: 1%;
  }

  .illums .illum-data {
    width: 90%;
    height: 50%;
    margin: 0 auto;
    background-color: #fff;
    margin-top: 2%;
  }

  .illums .zm-list {
    width: 20%;
    height: 90%;
    background-color: #fff;
    border-radius: 2%;
    display: inline-block;
    margin: 0 0 2% 3%;
    vertical-align: middle;
    border: 1px solid #ccc;
  }

  .illums .zm_data {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    overflow-y: scroll;
  }

  .illums .zm_list-title {
    width: 40%;
    padding: 5% 3%;
    display: inline-block;
  }

  .illums .zm_list-title img {
    max-width: 100%;
  }

  .illums .list-text {
    width: 50%;
    height:30%;
    display: inline-block;
  }

  .illums .zm_list-name {
    width: 80%;
    margin: 0 auto;
    font-size: 18px;
    text-align: left;
    margin-bottom: 2%;
  }

  .illums .list-visit {
    width: 80%;
    height: 53%;
    margin: 0 auto;
    border: 1px solid #ccc;
    border-radius: 10px;
    overflow-y: scroll;
  }

  .illums .list-visit p:nth-of-type(even) {
    background-color: #F2F0F1;
  }

  .illums .list-visit p {
    height: 20%;
    margin: 0;
    line-height: 220%;
    text-align: center;
  }

  .illums .list-visit span {
    margin-left: 10%;
  }

  .illums .illum-list-img {
    display: table-cell;
    width: 30%;
    height: 100%;
    vertical-align: middle
  }
  .illums .illum-list-img img {
    width: 50%;
  }
  .illums .illum-list-data {
    display: table-cell;
    width: 70%;
    height: 100%;
    vertical-align: middle
  }
  .illums .illum-list-data p {
    padding: 0;
    margin: 0
  }

</style>
