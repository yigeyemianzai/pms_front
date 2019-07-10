<template>
  <div class="illum-index" id="illum-index">
    <div class="illums-top">
      <div class="illums-echarts" id="echarts"></div>
      <div class="illums-icon">
        <div class="list-class">
          <div class="illums-list-img">
            <img src="~@/assets/images/illumination.png" />
          </div>      
          <div class="illums-list-data">
            <p class="num-class">照明总数
              <!-- <span id='size'></span> -->
              {{info.size}}
            </p>
          </div>         
        </div>
        <div class="list-class">
          <div class="illums-list-img">
            <img src="~@/assets/images/socket-icon2.png" />
          </div>
          <div class="illums-list-data">
            <p class="num-class">异常设备
              <!-- <span id='exception'></span> -->
              {{info.exception}}
            </p>
          </div>
        </div>
        <div class="list-class">
          <div class="illums-list-img">
            <img src="~@/assets/images/socket-icon3.png" />
          </div>
          <div class="illums-list-data">
            <p class="num-class">离线设备
              <!-- <span id='offline'></span> -->
              {{info.offline}}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="illums-nav">
      <img src="~@/assets/images/icon-on.png" @click="all_onoff(1)">
      <span>全开</span>
      <img src="~@/assets/images/icon-off.png" @click="all_onoff(0)">
      <span>全关</span>
      <div class="illums-input">
          
        <img src="~@/assets/images/icon-seo.png" class="icon-seo" />
        <input type="text" name="" class="illums-nav-text" placeholder="请输入检索关键词" />
      </div>
      <input type="button" name="" value="搜索" class="illums-nav-but" onclick="ss()" />
    </div>
    <div class="illums-data">
      <div class="data">
        <div class="illums_index-list" v-for="(item,index) in items" :key="item.id">
          <div class="zci_list-title">
            <img src="~@/assets/images/socket-index.png" @click="linkToZc()" />
          </div>
          <div class="list-text">
            <p>{{item.areaName}}</p>
            <div class="illums_turn">
            <!-- <img v-if="item.runStatus ==1" src="~@/assets/images/icon-on.png" @click="turn(item.runStatus,item.areaId,index)" :id="getId(index)"
            />
            <img v-else src="~@/assets/images/icon-off.png" @click="turn(item.runStatus,item.areaId,index)" :id="getId(index)" /> -->
            <img :src="item.runStatus ==1?'./static/img/icon-on.png':'./static/img/icon-off.png'" @click="turn(item.runStatus,item.areaId,index)" :id="getId(index)" />
          </div>
          </div>
          <div class="czi_list-visit">
            <p>照明总数： {{item.size}}</p>
            <p>设备总数： {{item.exception}}</p>
            <p>离线设备数： {{item.offline}}</p>
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
        items: [],
        info:{}
      }
    },
    created() {
      this.initCharts()
    },
    mounted() {
      var that = this
      this.aaa()
      window.onresize = function () {
        if(document.getElementById('illum-index')){
          document.getElementById('illum-index').style.height = (window.innerHeight - 170) + 'px'
          echarts.init(document.getElementById('echarts')).resize();
        }
      }
      this.$http({
        url: this.$http.adornUrl('/device/plugbase/partitions'),
        method: 'post',
        /* params: {
          equiptype: 1,
          type: 1
        }, */
      }).then(({data}) => {
        if (data.msg === "success") {
            this.info = data.info
            that.items = data.plugBases
          }
      })
    },
    methods: {
      linkToZc() {
        this.$router.push('/equipment-monitor-illumination-index')
      },
      getId(index) {
        return "illums_index_switch" + parseInt(++index)
      },
      aaa() {
        document.getElementById('illum-index').style.height = (window.innerHeight - 170) + 'px'
        // this.$refs.contentview.style.height=siteContentViewHeight().minHeight
      },
      initCharts() {
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
                text:'照明系统24小时负荷与预测',
                textStyle: {
                  fontSize: 16,
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
      turn(status, id, index) {
        // var onoff = $("#img" + id).attr("onoff");
        // var a = 1;
        // if (onoff === "1") {
        //   a = 0;
        // }
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
            // if (a > 0) {
            //   $("#img" + id).attr("onoff", "1");
            //   $("#img" + id).attr("src", "~@/assets/images/icon-on.png")
            // } else {
            //   $("#img" + id).attr("onoff", "2");
            //   $("#img" + id).attr("src", "~@/assets/images/icon-off.png")
            // }
            index = ++index;
            if (status === '1') {
              $("#illums_index_switch" + index).attr("src", "./static/img/icon-off.png")
            } else {
              $("#illums_index_switch" + index).attr("src", "./static/img/icon-on.png")
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
              $(".data .list-text img").attr("src", "./static/img/icon-on.png")
            } else {
              $(".data .list-text img").attr("src", "./static/img/icon-off.png")
            }
          };
        })
      }
    }
  }

</script>
<style type="text/css" scoped>
.illum-index .illums_turn{
  width: 80%;
  height: 50%;
}
.illum-index .illums_turn img{
  width: 100%;
  height: 100%;
}
  .illum-index {
    width: 100%;
    height: 100%;
    margin: 0;
  }

.illum-index .illums-top {
    width: 100%;
    height: 40%;
    background-color: #fff;
  }

  .illum-index .illums-echarts {
    width: 75%;
    height: 100%;
    background-color: #fff;
    display: inline-block;
    vertical-align: middle;
  }

  .illum-index .illums-icon {
    width: 24%;
    height: 100%;
    background-color: #fff;
    display: inline-block;
    vertical-align: middle;
    padding: 1% 0;
    text-align: center;
  }

  .illum-index .list-class {
    width: 100%;
    height: 30%;
    display: table
  }

  /* .illum-index .list-class img {
    max-width: 25%;
    display: inline-block;
    vertical-align: middle;
  } */

  .illum-index .num-class {
    width: 70%;
    display: inline-block;
    vertical-align: middle;
    font-size: 1.2vw;
    margin-left: 2%;
    text-align: left;
  }

  .illum-index .num-class span {
    font-size: 1.2vw;
    margin-left: 12%;
  }

  .illum-index .illums-nav {
    width: 90%;
    padding-left: 5%;
    position: relative;
  }

  .illum-index .illums-nav img {
    max-width: 7%;
    vertical-align: middle;
    margin-left: 2%;
  }

  .illum-index .illums-nav span {
    font-size: 18px;
    vertical-align: middle;
    margin-left: 1%;
  }

  .illum-index .illums-nav-text {
    width: 70%;
    font-size: 18px;
    border: 1px solid #666;
    padding: 1.5% 5% 1.5% 12%;
    border-radius: 10px;
    letter-spacing: 1px;
  }

  .illum-index .illums-input {
    position: relative;
    width: 30%;
    display: inline-block;
    margin-left: 10%;
  }

  .illum-index .icon-seo {
    position: absolute;
    top: 20%;
    max-width: 100%;
  }

  .illum-index .illums-nav-but {
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

  .illum-index .illums-data {
    width: 90%;
    height: 50%;
    margin: 0 auto;
    background-color: #fff;
    margin-top: 2%;
  }

  .illum-index .illums_index-list {
    width: 15%;
    height: 50%;
    background-color: #fff;
    border-radius: 2%;
    display: inline-block;
    margin: 0 0 2% 3%;
    vertical-align: middle;
    border: 1px solid #ccc;
    cursor: pointer;
  }

  .illum-index .illums-data .data {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    overflow-y: scroll;
  }

  .illum-index .zci_list-title {
    width: 40%;
    padding: 5% 3%;
    display: inline-block;
  }

  .illum-index .zci_list-title img {
    max-width: 100%;
  }

  .illum-index .list-text {
    width: 50%;
    height: 50%;
    display: inline-block;
  }

  .illum-index .list-name {
    width: 80%;
    margin: 0 auto;
    font-size: 18px;
    text-align: left;
    margin-bottom: 2%;
  }

  .illum-index .czi_list-visit {
    width: 80%;
    height: 50%;
    margin: 0 auto;
    border-radius: 10px;
  }

  .illum-index .czi_list-visit p {
    height: 20%;
    margin: 0;
    line-height: 150%;
    text-align: center;
  }

  .illum-index .czi_list-visit span {
    margin-left: 10%;
  }

  .illum-index .illums-list-img {
    display: table-cell;
    width: 30%;
    height: 100%;
    vertical-align: middle
  }
  .illum-index .illums-list-img img {
    width: 50%;
  }
  .illum-index .illums-list-data {
    display: table-cell;
    width: 70%;
    height: 100%;
    vertical-align: middle
  }
  .illum-index .illums-list-data p {
    padding: 0;
    margin: 0
  }
</style>
