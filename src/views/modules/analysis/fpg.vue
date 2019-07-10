<template>
  <div class="fpg" id="fpg">
		<div class="fpg_top">
      <p>选择条件</p>
			<!-- <select @click="choosed()">
				<option name="1">年</option>
				<option name="2">月</option>
				<option name="3">日</option>
			</select> -->
      <el-select v-model="value" placeholder="请选择" @change="choosed()">
        <el-option
          size="large"
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
        :picker-options="pickerOptions">
      </el-date-picker>
      <el-radio-group v-model="checkboxGroup1">
        <el-radio-button v-for="city in cities" :label="city" :key="city">{{city}}</el-radio-button>       
      </el-radio-group>
			<el-button type="primary" plain @click="search()">查询</el-button>
		</div>
		<div class="fpg_top-left">
			<div class="left-fecharts" id="left-fecharts"></div>
			<div class="left-secharts" id="left-secharts"></div>
		</div>
		<div class="fpg_top-right" id="top-right"></div>
		<div class="foot">
			<div class="foot-title">楼宇时段用能统计报表{{dateTime}}</div>
			<div class="foot-content">
        <el-table
          border
          :data="tableData2"
          style="width: 100%"
          :row-class-name="tableRowClassName"
          :header-cell-style="getRowClass"
          :cell-style="cellRowClass">
          <el-table-column
            prop="areaName"
            label="系统名称"
            align="center">
          </el-table-column>
          <el-table-column
            prop="fkilowatt"
            label="峰电量"
            align="center">
          </el-table-column>
          <el-table-column
            prop="tfcost"
            label="峰费用"
            align="center">
          </el-table-column>
          <el-table-column
            prop="tpkilowatt"
            label="平电量"
            align="center">
          </el-table-column>
          <el-table-column
            prop="tpcost"
            label="平费用"
            align="center">
          </el-table-column>
          <el-table-column
            prop="tgkilowatt"
            label="谷电量"
            align="center">
          </el-table-column>
          <el-table-column
            prop="tgcost"
            label="谷费用"
            align="center">
          </el-table-column>
          <el-table-column
            prop="tjkilowatt"
            label="尖电量"
            align="center">
          </el-table-column>
          <el-table-column
            prop="tjcost"
            label="尖费用"
            align="center">
          </el-table-column>
          <el-table-column
            prop="thkilowat"
            label="电量合计"
            align="center"
            col>
          </el-table-column>
          <el-table-column
            prop="thcost"
            label="费用合计"
            align="center">
          </el-table-column>
        </el-table>
				<!-- <div class="content-list">
					<div class="list-name name">系统名称</div>
					<div class="list-name power-color">峰电量</div>
					<div class="list-name cost-color">峰费用</div>
					<div class="list-name name">平电量</div>
					<div class="list-name power-color">平费用</div>
					<div class="list-name cost-color">谷电量</div>
					<div class="list-name name">谷费用</div>
					<div class="list-name power-color">尖电量</div>
					<div class="list-name cost-color">尖费用</div>
					<div class="list-name total">合计</div>
				</div> -->

				<!-- <div class="content-list two">
					<div class="list-name">插座</div>
					<div class="list-name">313</div>
					<div class="list-name">236</div>
					<div class="list-name">856</div>
					<div class="list-name">856</div>
					<div class="list-name">256</div>
					<div class="list-name">404</div>
					<div class="list-name">840</div>
					<div class="list-name">100</div>
					<div class="list-name total-list">1000</div>
					<div class="list-name total-list">1562</div>
				</div> -->
			</div>
		</div>
	</div>
</template>
<script>
export default {
  data () {
    return {
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
      tableData2: [],
      // 日期选择类型
      type:'date',
      value1: '',
      cities: ['峰', '平', '谷', '尖','总'],
      checkboxGroup1: '峰',
      // 设置选择今天及以前的时间
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now() - 8.64e6
        }
      },
      dateTime: ''
    }
  },
  created () {
    this.value1 = new Date(new Date().getTime() - 24*60*60*1000)
    this.initList()
  },
  mounted () {    
    this.en()
    this.search()
    window.onresize = function () {
      if(document.getElementById('fpg')){
        document.getElementById('fpg').style.height = (window.innerHeight - 170) + 'px'
        echarts.init(document.getElementById('left-fecharts')).resize();
        echarts.init(document.getElementById('left-secharts')).resize();
        echarts.init(document.getElementById('top-right')).resize();
      }
    }
  },
  methods: {
    en () {
      document.getElementById('fpg').style.height = (window.innerHeight-170)+'px'    
    },
    // 饼图信息
    initPieEnergy (dateType, choice, type) {
      this.$http({
        url:this.$http.adornUrl('/statistics/stage/chart/pie'),
        method: 'post',
        data: this.$http.adornData({
          'dateType': dateType,
          'choice': choice,
          'type': type
        }),
      }).then(({data}) => {
        if (data.msg === "success") {
          let titleEnergy = data.energy.title,
          seriesEnergy = data.energy.series,
          titleCost = data.cost.title,
          seriesCost = data.cost.series
          echarts.init(document.getElementById('left-fecharts')).setOption(this.$options.methods.initPie(titleEnergy,seriesEnergy))
          echarts.init(document.getElementById('left-secharts')).setOption(this.$options.methods.initPie(titleCost,seriesCost))
        }
      })
    },
    // 饼图模板
    initPie(title,series) {
      var obj = [],
      names = []
      for(let i of series.data) {
        let arr = {
          value: i.value,
          name: i.name
        }
        names.push(i.name)
        obj.push(arr)        
      }
      return Option = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          color:['#2b81be', '#34c4c4', '#f4f11a', '#8ec7f4', '#fd8587', '#e6e6e6'],
          title: {
            text: title,
            textStyle: {
              align: 'center'
            },
            left: 'center'
          },
          legend: {
            // type: 'scroll',
            orient: 'vertical',
            x: 'left',
            data: names,
            left: 'center',
            top: 'bottom',
            height: '30%'
          },
          series: [
            {
              name: title,
              type: 'pie',
              radius: ['20%', '50%'],
              avoidLabelOverlap: false,
              center: ['50%', '40%'],
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '18',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: obj
            }
          ]
      }
    },
    // 折线图信息
    initChart (dateType, choice, type) {
      this.$http({
        url:this.$http.adornUrl('/statistics/stage/chart/energy'),
        method: 'post',
        data: this.$http.adornData({
          'dateType': dateType,
          'choice': choice,
          'type': type
        }),
      }).then(({data}) => {
        if (data.msg === "success") {
          let xAxis_data = data.chart.chart.xAxis,
          legend_data = data.chart.chart.legend,
          series_data = data.chart.chart.series
          // load_data();
          echarts.init(document.getElementById('top-right')).setOption(this.$options.methods.initChartsEnergy(legend_data,series_data,xAxis_data))
          
        }
      })
    },
    // 折线图模板
    initChartsEnergy(legend,series,xAxis) {
      var obj = []
      for(let i=0;i<series.length;i++){
        let arr = {
          name: legend[i],
          data: series[i].data,
          type: 'line',
          connectNulls: true
        }
        obj.push(arr)         
      }
      console.log(obj) 
      return Option = {
        color: ['#978ac0', '#2c80c0', '#37d2ca', '#ffe090', '#b4dcf6', '#fd8783', '#e9e9e9'],
        legend: {
          data: legend
        },
        tooltip: {
          trigger: 'axis',
        },
        xAxis: {
          type: 'category',
          data: xAxis,
          boundaryGap: false
        },
        yAxis: {
          name: 'kWh',
          type: 'value'
        },
        series: obj
      };
    },
    // 列表信息
    initList (dateType, choice, type) {
      this.$http({
        url:this.$http.adornUrl('/statistics/stage/list'),
        method: 'post',
        data: this.$http.adornData({
          'dateType': dateType,
          'choice': choice,
          'type': type
        }),
      }).then(({data}) => {
        if (data.msg === "success") {
          this.tableData2 = data.info
          this.dateTime = data.dateTime
        }
      })
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
      }else if(columnIndex == 9 || columnIndex == 10){
        return 'color:#000;font-weight: 700';
      }else if (columnIndex%2 !=  0) {
        return 'color:#000';
      } else {
        return 'color:#88afd6';
      }
    },
    // 选择条件
    choosed(){
      console.log(this.value)
      if(this.value === 'year') {
        this.type = 'year'
      }else if(this.value === 'month') {
        this.type = 'month'
      }else if(this.value === 'date') {
        this.type = 'date'
      }
    },
    // 搜索按钮
    search() {
      let dateType = '',
      choice = '',
      type = ''
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
      if(this.checkboxGroup1 == '峰'){
        type = 1
      }else if(this.checkboxGroup1 == '平') {
        type = 2
      }else if(this.checkboxGroup1 == '谷') {
        type = 3
      }else if(this.checkboxGroup1 == '尖') {
        type = 4
      }
      // console.log(now,y,m,d)
      // console.log(y + "-" + m + "-" + d)
      console.log(dateType)
      console.log(choice)
      console.log(type)
      this.$options.methods.initPieEnergy.bind(this)(dateType, choice, type)
      this.$options.methods.initChart.bind(this)(dateType, choice, type)
      this.$options.methods.initList.bind(this)(dateType, choice, type)
      /* this.$message({
        message: '查询成功',
        type: 'success'
      }) */
    }
  }
}
</script>
<style>
.fpg {
  width: 100%;
  height: 100%;
}

.fpg .fpg_top {
  background-color: #eeeeee;
  width: 100%;
  text-align: center;
  padding: 1% 0;
}
.fpg .fpg_top-left {
  width: 40%;
  height: 30%;
  min-height: 30%;
  border: 1px solid #ccc;
  margin: 3% 0 0 3%;
  box-shadow: 2px 2px 8px #ccc;
  display: inline-block;
  vertical-align: middle;
}

.fpg .left-fecharts {
  width: 49.3%;
  min-height: 49.3%;
  height: 100%;
  display: inline-block;
  vertical-align: middle;
}

.fpg .left-secharts {
  width: 49.3%;
  min-height: 49.3%;
  height: 100%;
  display: inline-block;
  vertical-align: middle;
}

.fpg .fpg_top-right {
  width: 50%;
  height: 30%;
  display: inline-block;
  vertical-align: middle;
  border: 1px solid #ccc;
  margin: 3% 0 0 3%;
  box-shadow: 2px 2px 8px #ccc;
}

.fpg .foot {
  width: 100%;
  height: 45%;
  padding: 2% 0;
}

.fpg .foot-title {
  width: 100%;
  text-align: center;
  color: #2b80c0;
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 1px;
}

.fpg .foot-content {
  width: 90%;
  height: 100%;
  margin: 0 auto;
  border: 0;
  margin-top: 2%;
}

.fpg .list-name {
  width: 9.2%;
  float: left;
  text-align: center;
  padding: 1% 0;
  border: 1px solid #ccc;
}

.fpg .total {
  width: 16%;
  background-color: #f3f3f3;
}

.fpg .total-list {
  width: 7.9%;
}

.fpg .name {
  background-color: #f3f3f3;
}

.fpg .one div {
  background-color: #fff;
}

.fpg .two div {
  background-color: #f3f3f3 !important;
}

.fpg .power-color {
  background-color: #d2d2d2;
}

.fpg .cost-color {
  background-color: #d7e7f4;
}
.fpg .el-table {
  font-size: inherit
}
.fpg .el-table .cell {

}
.fpg .el-table .warning-row {
  background: ffffff;
}

.fpg .el-table .success-row {
  background: #f9f9f9;
}
/*.fpg .el-input {
  width: 40%;
}
 .fpg .el-select {
  position: absolute
}
.fpg .selections {
  display: inline-block;
  margin-top: 6%
}
.fpg .selectionboxs {
  display: inline-block;
  margin-top: 1%
} */
.fpg .fpg_top p{
  display: inline-block;
  margin: 0 0.5% 0 2%; 
  vertical-align: middle;
}
.fpg .fpg_top select{
  width: 3%;
  padding: 0.1% 0 0.3% 0;
  display: inline-block;
  margin: 0; 
  vertical-align: middle;
  text-align: center;
  font-size: 16px;
}
/* .fpg .top input{
  width: 25%;
  display: inline-block;
  vertical-align: middle;
  text-align: center;
  padding: 0.3% 0;
  height: 70%;
} */
.el-date-editor.el-input, .el-date-editor.el-input__inner {
  width: 200px;
}
.fpg .fpg_top-seo{
  width: 5%;
  display: inline-block;
  vertical-align: middle;
  /* padding: 0.3% 0; */
  background-color: #1469A8;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 1%;
  height: 50%
}
.fpg .el-checkbox-group {
  display: inline-block;
  vertical-align: middle
}
.fpg .el-select .el-input {
  width: 50%;
}

/* 下拉框开始 */
.fpg .el-input--medium {
  font-size: inherit
}
.fpg .el-select .el-input .el-select__caret {
  font-size: inherit
}
.el-select-dropdown {
  min-width: 5% !important;
}
/* 下拉框结束 */

/* 峰平谷按钮组开始 */
.fpg .el-radio-group {
  font-size: inherit
}
.fpg .el-radio-button--medium .el-radio-button__inner {
  font-size: inherit
}
/* 峰平谷按钮组结束 */

/* 日期选择开始 */
.fpg .el-date-editor.el-input {
  width: 12%;
}
.el-date-picker__header .el-picker-panel__icon-btn,.el-date-picker__header-label {
  font-size: inherit
}
.el-picker-panel__content .el-date-table {
  font-size: inherit
}
.el-picker-panel {
  line-height: 2
}
.fpg .el-input--prefix .el-input__inner {
  padding-left: 15%
}
/* 日期选择结束 */

/* 查询按钮 */
.fpg .el-button--medium {
  font-size: inherit
}

@media screen and (min-width: 4000px) {
  body {
    font-size: 40px
  }
  /* 下拉框开始 */ 
  .fpg .el-input--medium .el-input__inner {
    height: inherit;
    line-height: 2
  }
  .fpg .el-input--medium .el-input__icon {
    line-height: 2;
    width: inherit;
  }
  .el-select-dropdown {
    min-width: 6% !important;
  }
  .el-select-dropdown__item {
    font-size: inherit;
    height: inherit;
    line-height: 2
  }
  /* 下拉框结束 */

  /* 日期控件开始 */
  .el-date-picker {
    width: 18%;
  }
  .fpg .el-date-editor.el-input {
    width: 15%;
  }
  .el-date-picker .el-picker-panel__content {
    width: 90%;
  }
  .el-date-table td span {
    width: none !important;
    height: none !important;
  }
  .el-date-table td span {
    line-height: 40px
  }
  .el-date-table td div {
    height: 50px;
  }
  /* 日期控件结束 */
}
</style>

