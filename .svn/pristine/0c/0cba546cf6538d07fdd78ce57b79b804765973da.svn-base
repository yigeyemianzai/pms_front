<template>
  <div class="enerygyanalysis" id="enerygyanalysis">
		<div class="anaen_top">
			<p>选择条件</p>
			<!-- <select @click="choosed()">
				<option name="1">年</option>
				<option name="2">月</option>
				<option name="3">日</option>
			</select> -->
      <el-select v-model="value" placeholder="请选择" @change="choosed()">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          >
        </el-option>
      </el-select>
			<p>选择日期</p>
			<el-date-picker
        v-model="value1"
        :type="type"
        placeholder=""
        :picker-options='pickerOptions'>
      </el-date-picker>
			<div class="anaen_top-seo" @click='search()'>查询</div>
		</div>
		<div class="echarts" id="echarts"></div>
		<div class="foot">
			<div class="foot-title">楼宇用能明细统计报表{{dateTime}}</div>
			<div class="foot-content">
        <el-table :data="tableData" style="width: 100%" border
          :height="he"
          :row-class-name="tableRowClassName"
          :header-cell-style="getRowClass"
          :cell-style="cellRowClass">
          <el-table-column
            v-for="col in cols" :key='col.prop'
            :prop="col.prop" :label="col.label" 
            align="center">
          </el-table-column>
        </el-table>
			</div>
		</div>
	</div>
</template>
<script>
export default {
  data () {
    return {
      he: '10', // 只要在el-table元素中定义了height属性，即可实现固定表头的表格，而不需要额外的代码。
      xAxis_data : [],
      legend_data : [],
      series_data : [],
      options: [{
        value: 'year',
        label: '年'
      }, {
        value: 'month',
        label: '月'
      }, {
        value: 'date',
        label: '日'
      }],
      value: 'date',
      // 日期选择类型
      type:'date',     
      value1: '',
      // 设置选择今天及以前的时间
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now() - 8.64e6
        }
      },
      tableData: [],
      cols: [
        {prop: 'areaName', label: '系统名称'}
      ],
      dateTime: ''
    }
  },
  created () {
    this.he = (window.innerHeight-170)*0.40
    this.value1 = new Date(new Date().getTime() - 24*60*60*1000)
  },
  mounted () {    
    this.en()
    this.search()
    window.onresize = function () {
      if(document.getElementById('enerygyanalysis')){
        document.getElementById('enerygyanalysis').style.height = (window.innerHeight - 170) + 'px'
        this.he = (window.innerHeight-170)*0.40
        echarts.init(document.getElementById('echarts')).resize();
      }
    }
  },
  methods: {
    en () {
      document.getElementById('enerygyanalysis').style.height = (window.innerHeight-170)+'px'       
    },
    // 表格信息
    initChartList(dateType, choice) {
      this.$http({
        url:this.$http.adornUrl('/statistics/use/chart/list'),
        method: 'post',
        data: this.$http.adornData({
          'dateType': dateType,
          'choice': choice
        }),
      }).then(({data}) => {
        if (data.msg === "success") {
          this.tableData = data.info
          var array= data.info[0]
          delete array.areaId
          this.cols = [{prop: 'areaName', label: '系统名称'}]
          for(var key in array){           
            var col = []
            col['prop'] = key
            col['label'] = key           
            if(key != 'areaName') {
              this.cols.push(col)
            }
          }
          this.dateTime = data.dateTime
        }else {
          this.$message({
            message: data.msg,
            type: 'error'
          })
        }
      })
    },
    // 获取柱状图信息
    initChartEnergy(dateType, choice) {
      this.$http({
        url:this.$http.adornUrl('/statistics/use/chart/energy'),
        method: 'post',
        data: this.$http.adornData({
          'dateType': dateType,
          'choice': choice
        })
      }).then(({data}) => {
        if (data.msg === "success") {
          this.xAxis_data = data.chart.chart.xAxis
          this.legend_data = data.chart.chart.legend
          this.series_data = data.chart.chart.series
          this.$options.methods.initCharts.bind(this)()
        }else {
          this.$message({
            message: data.msg,
            type: 'error'
          })
        }
      })
    },
    // 柱状图
    initCharts() {
      var electricity = echarts.init(document.getElementById('echarts'));
      var obj = []
      for(let i=0;i<this.series_data.length;i++){
        let arr = {
          name: this.legend_data[i],
          data: this.series_data[i].data,
          stack: this.series_data[i].stack,
          type: 'bar'
        }
        obj.push(arr)         
      } 
      var option = {
        legend: {
          data: this.legend_data
        },
        tooltip: {
          trigger: 'axis',
        },
        xAxis: {
          name:'时间',
          type: 'category',
          data: this.xAxis_data
        },
        yAxis: {
          name:"kWh",
          type: 'value'
        },
        series: obj
      };
      electricity.setOption(option);
    },
    choosed(){
      // console.log(this.value)
      if(this.value === 'year') {
        this.type = 'year'
      }else if(this.value === 'month') {
        this.type = 'month'
      }else if(this.value === 'date') {
        this.type = 'date'
      }
    },
    // 隔行变色
    tableRowClassName({row, rowIndex}) {
      if (rowIndex%2 == 0) {
        return 'warning-row';
      } else if (rowIndex%2 != 0) {
        return 'success-row';
      }
      return '';
    },
    //  设置首行颜色
    getRowClass({ row, column, rowIndex, columnIndex }) {
      if (columnIndex == 0){
        return 'background:#f3f3f3;color:#000;font-weight: 700';
      }/* else if(columnIndex == 9 || columnIndex == 10){
        return 'background:#f3f3f3;color:#000;font-weight: 700';
      } */else if (columnIndex%2 ==  0) {
        return 'background:#d2d2d2;color:#000;font-weight: 700';
      } else {
        return 'background:#d7e7f4;color:#000;font-weight: 700';
      }
    },
    // 单元格字体样式
    cellRowClass ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex == 0){
        return 'color:#000;font-weight: 700';
      }else if(columnIndex == (this.cols.length-1)){
        return 'color:#000;font-weight: 700';
      }else if (columnIndex%2 !=  0) {
        return 'color:#000';
      } else {
        return 'color:#88afd6';
      }
    },
    search() {
      let dateType = '',
      choice = ''
      var now = new Date(this.value1),
      y = now.getFullYear(),
      m = ("0" + (now.getMonth() + 1)).slice(-2),
      d = ("0" + now.getDate()).slice(-2);
      if(this.type == 'year'){
        dateType = 1
        choice = y
      }else if(this.type == 'month'){
        dateType = 2
        choice = y + '-' + m
      }else if(this.type == 'date'){
        dateType = 3
        choice = y + '-' + m + '-' +d
      }      
      // console.log(now,y,m,d)
      // console.log(y + "-" + m + "-" + d)
      // console.log(dateType)
      this.$options.methods.initChartList.bind(this)(dateType, choice)
      this.$options.methods.initChartEnergy.bind(this)(dateType, choice)
    }
  } 
}
</script>
<style>
  .enerygyanalysis {
    width: 100%;
    height: 100%;
  }


 .enerygyanalysis  .anaen_top {
    width: 100%;
    text-align: center;
    padding: 1% 0;
    background-color: #eeeeee;
  }

 .enerygyanalysis .echarts {
    width: 90%;
    height: 35%;
    margin: 0 auto;
    margin-top: 1%;
    box-shadow: 5px 5px 5px #ccc;
    border: 1px solid #f0f0f0;
  }

 /*  .enerygyanalysis .content-list {
    display: block;
  } */

  .enerygyanalysis .foot {
    width: 100%;
    height: 45%;
    padding: 2% 0;
  }

  .enerygyanalysis .foot-title {
    width: 100%;
    text-align: center;
    color: #2b80c0;
    font-size: 20px;
    font-weight: bold;
    letter-spacing: 1px;
  }

  .enerygyanalysis .foot-content {
    width: 90%;
    height: 100%;
    margin: 0 auto;
    border: 0;
    margin-top: 2%;
    /* overflow: hidden;
    overflow-y: scroll; */
  }
/* 
  .enerygyanalysis .list-name {
    width: 8%;
    float: left;
    text-align: center;
    padding: 1% 0;
    border: 1px solid #ccc;
    line-height: 150%;
  } */

  .enerygyanalysis .total {
    width: 10%;
    background-color: #f3f3f3;
  }

 /*  .enerygyanalysis .total-list {
    width: 4.9%;
  } */

  .enerygyanalysis .name {
    background-color: #f3f3f3;
  }

 .enerygyanalysis .one div {
    background-color: #fff;
  }

  .enerygyanalysis .two div {
    background-color: #f3f3f3 !important;
  }

/*   .enerygyanalysis .power-color {
    background-color: #d2d2d2;
  }

  .enerygyanalysis .cost-color {
    background-color: #d7e7f4;
  } */
  .enerygyanalysis .anaen_top p{
    display: inline-block;
    margin: 0 0.5% 0 2%; 
    vertical-align: middle;
  }
  .enerygyanalysis .anaen_top select{
    width: 3%;
    padding: 0.1% 0 0.3% 0;
    display: inline-block;
    margin: 0; 
    vertical-align: middle;
    text-align: center;
    font-size: 16px;
  }
  /* .enerygyanalysis .top input{
    width: 150px;
    display: inline-block;
    vertical-align: middle;
    text-align: center;
    padding: 0.3% 0;
    height: 70%;
  } */
  .enerygyanalysis .anaen_top-seo{
    width: 5%;
    display: inline-block;
    vertical-align: middle;
    padding: 0.3% 0;
    background-color: #1469A8;
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
    margin-left: 1%;
  }
 .enerygyanalysis  .clear{
    clear: both;
  }
  /* .enerygyanalysis .el-select .el-input {
    width: 50%;
  } */
  .enerygyanalysis .el-select{
    width: 7%;
  }
  .el-table th.gutter{
    display: table-cell!important;
  }
</style>
