<template>
  <div class="socket" id="socket">
    <div class="socket-top">
      <div class="socket-echarts" id="echarts"></div>
      <div class="socket-icon">
        <div class="icon-list">
          <div class="socket-list-img">
            <img src="~@/assets/images/socket-icon.png" />
          </div>
          <div class="socket-list-data">
            <p class="icon-icon-num">插座总数
              <span id='size'></span>
            </p>
          </div>        
        </div>
        <div class="icon-list">
          <div class="socket-list-img">
            <img src="~@/assets/images/socket-icon2.png" />
          </div>
          <div class="socket-list-data">
            <p class="icon-icon-num">异常设备
              <span id='exception'></span>
            </p>
          </div>         
        </div>
        <div class="icon-list">
          <div class="socket-list-img">
            <img src="~@/assets/images/socket-icon3.png" />
          </div>
          <div class="socket-list-data">
            <p class="icon-icon-num">离线设备
              <span id='offline'></span>
            </p>
          </div>          
        </div>
      </div>
    </div>
    <div class="socket-nav">
      <img src="~@/assets/images/icon-on.png" @click="all_onoff(1)">
      <span>全开</span>
      <img src="~@/assets/images/icon-off.png" @click="all_onoff(0)">
      <span>全关</span>
      <div class="socket-input">
        <img src="~@/assets/images/icon-seo.png" class="icon-seo" />
        <input type="text" name="" class="socket_index-nav-text" placeholder="请输入检索关键词" />
      </div>
      <input type="button" name="" value="搜索" class="socket-nav-but" onclick="ss()" />
    </div>
    <div class="socket-data">
      <div class="single_socket">
        <div class="socket_index-list" v-for="(item,index) in items" :key="item.id">
          <div class="zci_list-title">
            <img src="~@/assets/images/socket-index.png" @click="linkToZc()" />
          </div>
          <div class="sockets_list-text">
            <p>{{item.areaName}}</p>
            <div class="sockets_turn">
              <!-- <img v-if="item.runStatus ==1" src="./static/img/icon-on.png" @click="turn(item.runStatus,item.areaId,index)" :id="getId(index)" />
              <img v-else src="./static/img/icon-off.png" @click="turn(item.runStatus,item.areaId,index)" :id="getId(index)" /> -->
              <img :src="item.runStatus ==1?'./static/img/icon-on.png':'./static/img/icon-off.png'" @click="turn(item.runStatus,item.areaId,index)" :id="getId(index)" />
            </div>
          </div>
          <div class="czi_list-visit">
            <p>插座总数： {{item.size}}</p>
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
        items: []
      }
    },
    created() {
      this.initCharts()
    },
    mounted() {
      var that = this
      this.aaa()
      this.$http({
        url: this.$http.adornUrl('/device/plugbase/partitions'),
        method: 'post',
        /* params: {
          equiptype: 1,
          type: 1
        }, */
      }).then(({data}) => {
        if (data.msg === "success") {
            $("#exception").html(data.info.exception);
            $("#offline").html(data.info.offline);
            $("#size").html(data.info.size)
            that.items = data.plugBases
          }
      })
      window.onresize = function () {
        if(document.getElementById('socket')){
          document.getElementById('socket').style.height = (window.innerHeight - 170) + 'px'
          echarts.init(document.getElementById('echarts')).resize();
        }
      }
    },
    methods: {
      linkToZc() {
        this.$router.push('/equipment-monitor-socket')
      },
      getId(index) {
        return "socket_index_switch" + parseInt(++index)
      },
      aaa() {
        document.getElementById('socket').style.height = (window.innerHeight - 170) + 'px'
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
              color: ['#FBEF1D', '#157373'],
              title:{
                x:100,
                y: 'top',  
                text:'插座系统24小时负荷与预测',
                textStyle: {
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: '#333'          // 主标题文字颜色
                },
              },
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
              $("#socket_index_switch" + index).attr("src", "./static/img/icon-off.png")
            } else {
              $("#socket_index_switch" + index).attr("src", "./static/img/icon-on.png")
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
              $(".single_socket .sockets_list-text img").attr("src", "./static/img/icon-on.png")
            } else {
              $(".single_socket .sockets_list-text img").attr("src", "./static/img/icon-off.png")
            }
          };
        })
      }
    }
  }

</script>
<style type="text/css" scoped>
.socket .sockets_turn img{
  width: 100%;
  height: 100%;
}
.socket .sockets_turn{
  width: 80%;
  height: 50%;
}
  .socket {
    width: 100%;
    height: 100%;
    margin: 0;
  }

  .socket .socket-top {
    width: 100%;
    height: 40%;
    background-color: #fff;
  }

  .socket .socket-echarts {
    /* width: 75%;
    height: 100%;
    background-color: #fff;
    display: inline-block;
    vertical-align: middle; */
    width: 75%;
    height: 100%;
    border-right: 5px solid #ccc;
    display: inline-block;
    vertical-align: middle;
    position: relative;
  }

  .socket .socket-icon {
    width: 24%;
    height: 100%;
    background-color: #fff;
    display: inline-block;
    vertical-align: middle;
    padding: 1% 0;
    text-align: center;
  }

  .socket .icon-list {
    width: 100%;
    height: 30%;
    display: table
  }

  /* .socket .icon-list img {
    max-width: 25%;
    display: inline-block;
    vertical-align: middle;
  } */

  .socket .icon-icon-num {
    width: 70%;
    display: inline-block;
    vertical-align: middle;
    font-size: 1.2vw;
    margin-left: 2%;
    text-align: left;
  }

  .socket .icon-icon-num span {
    font-size: 1.2vw;
    margin-left: 12%;
  }

  .socket .socket-nav {
    width: 90%;
    padding-left: 5%;
    position: relative;
  }

  .socket .socket-nav img {
    max-width: 7%;
    vertical-align: middle;
    margin-left: 2%;
  }

  .socket .socket-nav span {
    font-size: 18px;
    vertical-align: middle;
    margin-left: 1%;
  }

  .socket  .socket_index-nav-text {
    width: 70%;
    font-size: 18px;
    border: 1px solid #666;
    padding: 1.5% 5% 1.5% 12%;
    border-radius: 10px;
    letter-spacing: 1px;

  }

  .socket  .socket-input {
    position: relative;
    width: 30%;
    display: inline-block;
    margin-left: 10%;
  }

  .socket .icon-seo {
    position: absolute;
    top: 20%;
    max-width: 100%;
  }

  .socket  .socket-nav-but {
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

  .socket  .socket-data {
    width: 90%;
    height: 50%;
    margin: 0 auto;
    background-color: #fff;
    margin-top: 2%;
  }

  .socket  .socket_index-list {
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

  .socket  .socket-data .single_socket {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    overflow-y: scroll;
  }

  .socket .zci_list-title {
    width: 40%;
    padding: 5% 3%;
    display: inline-block;
  }

  .socket .zci_list-title img {
    max-width: 100%;
  }

  .socket  .sockets_list-text {
    width: 50%;
    height: 50%;
    display: inline-block;
  }

  .socket .list-name {
    width: 80%;
    margin: 0 auto;
    font-size: 18px;
    text-align: left;
    margin-bottom: 2%;
  }

  .socket .czi_list-visit {
    width: 80%;
    height: 50%;
    margin: 0 auto;
    border-radius: 10px;
  }

  .socket .czi_list-visit p {
    height: 20%;
    margin: 0;
    line-height: 150%;
    /* text-align: center; */
  }

  .socket .czi_list-visit span {
    margin-left: 10%;
  }
  .socket .socket-list-img {
    display: table-cell;
    width: 30%;
    height: 100%;
    vertical-align: middle
  }
  .socket .socket-list-img img {
    width: 50%;
  }
  .socket .socket-list-data {
    display: table-cell;
    width: 70%;
    height: 100%;
    vertical-align: middle
  }
  .socket .socket-list-data p {
    padding: 0;
    margin: 0
  }

</style>
