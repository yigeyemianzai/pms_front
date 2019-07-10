<template>
  <div class="interahis" id="interahis">
		<div class="content-top">
			<div class="left">
				<div class="left-list">
					<img src="~@/assets/images/history1.png">
					<p>提升次数
						<span>{{size}}</span>次</p>
				</div>
				<div class="left-list">
					<img src="~@/assets/images/history2.png">
					<p>削减总能耗
						<span>{{totalKW}}</span>kw</p>
				</div>
			</div>
			<div class="right">
				<img src="~@/assets/images/icon-seo.png" />
				<input type="text" id="search" name="" placeholder="请输入检索关键词" />
        <el-button type="primary" @click="search()" size="small" class="dh_but">搜索</el-button>
			</div>
		</div>
		<div class="list">
      <el-table
        :max-height="interahisTableHight"
        :data="tableData"
        :header-cell-style="getRowClass"
        border
        style="width: 100%">
        <el-table-column
          type="index"
          width="50"
          align="center">
        </el-table-column>
        <el-table-column
          prop="regulateEventId"
          label="事件编号"
          width="100"
          align="center">
        </el-table-column>
        <el-table-column
          prop="customTime"
          :formatter = 'changeCustomTime'
          label="方案定制时间"
          align="center">
        </el-table-column>
         <el-table-column
          prop="startTime"
          :formatter= 'changeStartTime'
          label="调控开始时间"
          align="center">
        </el-table-column>
        <el-table-column
          prop="endTime"
          :formatter= 'changeEndTime'
          label="调控结束时间"
          align="center">
        </el-table-column>
        <el-table-column
          prop="systemName"
          label="参与子系统"
          align="center">
        </el-table-column>
        <el-table-column
          prop="strategyName"
          label="策略名称"
          align="center">
        </el-table-column>
        <el-table-column
          prop="regulateTargetVal"
          label="策略目标"
          align="center">
        </el-table-column>
        <el-table-column
          prop="cutPowerVal"
          label="消减能耗"
          align="center">
        </el-table-column>
        <el-table-column
          prop="eventState"
          :formatter="changeState"
          label="调控进度"
          align="center">
        </el-table-column>
        <el-table-column
          prop="eventState"
          label="操作"
          align="center">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="handleEdit(scope.row)"
              v-if="scope.row.eventState== 3? true: false">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="totalCount">
      </el-pagination>
		</div>
	</div>
</template>
<script>
import { changeTime } from '@/utils/index'
export default {
  data () {
    return {
      // 表格高度
      interahisTableHight: '',
      tableData: [],
      totalKW:'', // 削减总能耗
      size: '',  // 提升次数
      totalCount: 0,
      pageSize: 0,
      currentPage: 1,
      sizeChange: 10,
      showdels: ''  // 查看详情按钮是否显示
    }
  },
  created () {
    this.interahisTableHight = window.innerHeight-320
  },
  mounted () {    
    this.en()
    this.search()
    window.onresize = function () {
      if(document.getElementById('interahis')){
        document.getElementById('interahis').style.height = (window.innerHeight - 170) + 'px'
        this.interahisTableHight = window.innerHeight-320
      }
    }
  },
  watch: {
    /* 'currentPage': 'search',
    'sizeChange': 'search' */
  },
  methods: {
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.sizeChange = val
      this.currentPage = 1
      this.search()
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.currentPage = val
      this.search()
    },
    // 时间戳转换
    changeCustomTime(cellValue) {
      if(cellValue.customTime == null){
        return '-'
      }else {
        return cellValue.customTime
      }
      // return changeTime(cellValue.customTime)
    },
    changeStartTime(cellValue) {
      if(cellValue.startTime == null){
        return '-'
      }else {
        return cellValue.startTime
      }
      // return changeTime(cellValue.startTime)
    },
    changeEndTime(cellValue) {
      if(cellValue.endTime == null){
        return '-'
      }else {
        return cellValue.endTime
      }     
    },
    // 1：未执行，2：执行中， 3：已执行
    changeState(cellValue){
      // console.log(cellValue.eventState)
      if(cellValue.eventState == 1) {
        return '未执行'
      }else if(cellValue.eventState == 2) {
        return '执行中'
      }else if(cellValue.eventState == 3) {
        return '已执行'
      }else if(cellValue.eventState == null) {
        return '暂无'
      } 
    },
    en () {
      document.getElementById('interahis').style.height = (window.innerHeight-170)+'px'   
    },
    handleEdit(index, row) {
      // console.log(index, row)
      if(index.eventState == 3){
        this.$router.push({path:'/interactive-his-detail',query:{rowId: index.regulateEventId, date: index.customTime, strategyId: index.strategyId}})
      }    
    },
    //  设置首行颜色
    getRowClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 0) {
        return 'background:#edefee;color:#000;font-weight: 700'
      } else {
        return ''
      }
    },
    search() {
      // console.log(this.currentPage + '----'+ this.sizeChange)
      var search = $("#search").val();
      this.$http({
        url:this.$http.adornUrl('/device/stategrid/queryHistory'),
        method: 'post',
        data: this.$http.adornData({
          page: this.currentPage, // 第几页
          limit: this.sizeChange, // 每页显示条数
        })
      }).then(({data}) => {
        // console.log(data)
        if (data.msg === "success") {
          this.tableData = data.info.list
          this.totalKW = data.totalKW
          this.size = data.size
          this.totalCount = data.info.totalCount
          this.pageSize = data.info.pageSize
          this.currentPage = data.info.currPage
        } 
      })
    }
  }
}
</script>
<style>
  .interahis {
    width: 100%;
    height: 100%;
  }

  .interahis .content-top {
    width: 100%;
    padding: 2% 0 0 0;
    min-height: 10%;
  }

  .interahis .left {
    width: 45%;
    float: left;
    padding-left: 2%;
  }

  .interahis .left-list {
    display: inline-block;
    vertical-align: middle;
  }

  .interahis .left-list img {
    width: 25%;
    display: inline-block;
    vertical-align: middle;
  }

  .interahis .left-list p {
    margin: 0;
    display: inline-block;
    vertical-align: middle;
  }

  .interahis .left-list span {
    color: #0EB7CE;
    margin: 0 10px;
  }

  .interahis .right {
    width: 40%;
    float: right;
    position: relative;
    padding: 0.5% 0;
  }

  .interahis .right img {
    width: 3%;
    position: absolute;
    top: 28%;
    left: 1.5%;
  }

  .interahis .right input {
    width: 60%;
    height: 10%;
    padding: 1% 0 1% 6%;
    display: inline-block;
    vertical-align: middle;
    font-size: 18px;
    border-radius: 10px;
    border: 1px solid #ccc;
  }

  .interahis .dh_but {
    width: 10%;
    height: 20%;
    display: inline-block;
    vertical-align: middle;
    background-color: #1367A5;
    color: #fff;
    padding: 1% 0;
    text-align: center;
    border-radius: 5px;
    font-size: 14px;
    margin-left: 2%;
    letter-spacing: 1px;
  }
  /* .top-list{
    display: inline-block !important;
  } */
  .interahis .list {
    width: 96%;
    min-height: 80%;
    margin: 0 auto;
    font-size: 14px;
    margin-top: 2%
  }

  .interahis .list-data {
    min-width: 100%;
    display: block;
  }

  .interahis .list-data div {
    text-align: center;
    background-color: #f0f0f0;
    color: #000;
    margin: 0;
    float: left;
  }

  .interahis .list-code {
    min-width: 2%;
    max-width: 2%;
    min-height: 21px;
    padding: 0.8% 0.3%;
    border: 1px solid #ccc;
  }

  .interahis .list-id {
    min-width: 6%;
    max-width: 5%;
    min-height: 21px;
    padding: 0.8% 1%;
    border: 1px solid #ccc;
  }

  .interahis .list-fdate {
    min-width: 11%;
    max-width: 5%;
    min-height: 21px;
    padding: 0.8% 1%;
    border: 1px solid #ccc;
  }

  .interahis .list-update {
    min-width: 11%;
    max-width: 5%;
    min-height: 21px;
    padding: 0.8% 1%;
    border: 1px solid #ccc;
  }

  .interahis .list-overdate {
    min-width: 11%;
    max-width: 5%;
    min-height: 21px;
    padding: 0.8% 1%;
    border: 1px solid #ccc;
  }

  .interahis .list-ox {
    min-width: 5%;
    min-height: 21px;
    padding: 0.8% 1%;
    border: 1px solid #ccc;
  }

  .interahis .list-name {
    min-width: 5%;
    min-height: 21px;
    padding: 0.8% 1%;
    border: 1px solid #ccc;
  }

  .interahis .list-num {
    min-width: 5%;
    min-height: 21px;
    padding: 0.8% 1%;
    border: 1px solid #ccc;
  }

  .interahis .list-ex {
    min-width: 5%;
    min-height: 21px;
    padding: 0.8% 1%;
    border: 1px solid #ccc;
  }

  .interahis .list-jd {
    min-width: 5%;
    min-height: 21px;
    padding: 0.8% 1%;
    border: 1px solid #ccc;
  }

  .interahis .list-open {
    min-width: 5%;
    min-height: 21px;
    padding: 0.8% 1%;
    border: 1px solid #ccc;
  }

  .interahis .one div {
    background-color: #ffffff;
  }

  .interahis .clear {
    clear: both;
  }

  .interahis .open-data {
    padding: 0.4% 1%;
  }

  .interahis .open {
    width: 100%;
    color: #fff !important;
    background-color: #60afea !important;
    border-radius: 5px;
    padding: 9% 0;
    cursor: pointer;
  }

  .interahis .list-file {
    text-align: right;
    margin-right: 2%;
  }

  .interahis .file-list {
    width: 5%;
    height: 8%;
    border: 1px solid #ccc;
    border-radius: 5px;
    text-align: center;
    padding: 0.5% 0;
    cursor: pointer;
    display: inline-block;
    vertical-align: middle;
  }

  .interahis .file-num {
    width: 3%;
    height: 8%;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 0.5% 0;
    cursor: pointer;
    display: inline-block;
    vertical-align: middle;
    margin: 0 0.3%;
  }

  .interahis .two div {
    background-color: #eff8ff;
  }

  .interahis .three div {
    background-color: #f1fff2;
  }

</style>

