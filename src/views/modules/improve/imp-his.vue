<template>
  <div class="imphis" id="imphis">
		<div class="content-top">
			<div class="left" :data='advanceHistoryInfo'>
				<div class="left-list">
					<img src="~@/assets/images/history1.jpg">
					<p>提升次数
						<span>{{advanceHistoryInfo.advanceCount}}</span>次</p>
				</div>
				<div class="left-list">
					<img src="~@/assets/images/history2.jpg">
					<p>削减总能耗
						<span>{{advanceHistoryInfo.economy}}</span>kw</p>
				</div>
			</div>
			<div class="right">
				<img src="~@/assets/images/icon-seo.png" />
				<input type="text" id="search" name="" placeholder="请输入检索关键词" />
        <el-button type="primary" @click="search()" size="small" class="imp_his_but">搜索</el-button>
			</div>
		</div>
		<div class="list">
      <el-table
        :data="tableData"
        :header-cell-style="getRowClass"
        border
        style="width: 100%">
        <el-table-column
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          prop="planId"
          label="事件编号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="beginTime"
          label="方案定制时间">
        </el-table-column>
         <el-table-column
          prop="createTime"
          label="调控开始时间">
        </el-table-column>
        <el-table-column
          prop="endTime"
          label="调控结束时间">
        </el-table-column>
        <el-table-column
          prop="participant"
          label="参与子系统">
        </el-table-column>
        <el-table-column
          prop="planType"
          label="策略名称">
        </el-table-column>
        <el-table-column
          prop="targetCount"
          label="策略目标">
        </el-table-column>
        <el-table-column
          prop="economy"
          label="消减能耗">
        </el-table-column>
        <el-table-column
          prop="schedule"
          label="调控进度">
        </el-table-column>
        <el-table-column
          prop=""
          label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="handleEdit(scope.row)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="2">
      </el-pagination>
		</div>
	</div>
</template>
<script>
export default {
  data () {
    return {
      tableData: [],
      advanceHistoryInfo: ''
    }
  },
  created () {
  },
  mounted () {    
    this.en()
    this.search()
    window.onresize = function () {
        if(document.getElementById('imphis')){
          document.getElementById('imphis').style.height = (window.innerHeight - 170) + 'px'
        }
      }
  },
  methods: {
    en () {
      document.getElementById('imphis').style.height = (window.innerHeight-170)+'px'   
    },
    handleEdit(index, row) {
      // console.log(index, row);
      // 传递参数
      this.$router.push({path:'/improve-history-detail',query:{rowId: index.planId}})
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
      var search = $("#search").val();
      this.$http({
        url:this.$http.adornUrl('/efficiency/advance/history/list'),
        method: 'post',
        /* params: {
          kw: search
        }, */
      }).then(({data}) => {
        console.log(data)
        if (data.msg === "success") {
          console.log(data.events.list)
          this.tableData = data.events.list
          this.advanceHistoryInfo =  data.info
          /* that.tableData = [{
            planId: data.planId,
            beginTime: data.beginTime,
            createTime: data.createTime,
            endTime: data.endTime,
            participant: data.participant,
            planType: data.planType,
            targetCount: data.targetCount,
            economy: data.economy,
            planCode: data.planCode
          }] */
          /* var div = "";
          $.each(data.events.list, function (n, dat) {
            div = "<div class='list-data one'>";
            div += "<div class='list-id'>" + dat.planId + "</div>";
            div += "<div class='list-fdate'>" + dat.beginTime + "</div>";
            div += "<div class='list-update'>" + dat.createTime + "</div>";
            div += "<div class='list-overdate'>" + dat.endTime + "</div>";
            div += "<div class='list-ox'>" + dat.participant + "</div>";
            div += "<div class='list-name'>" + dat.planType + "</div>";
            div += "<div class='list-num'>" + dat.targetCount + "</div>";
            div += "<div class='list-ex'>" + dat.economy + "</div>";
            div += "<div class='list-jd'>" + dat.planCode + "</div>";
            div += "<div class='list-open open-data'><div class='open'>查看详情</div></div>";
            div += "<div class='clear'></div>";
            div += "</div>";
            $(".list").append(div);
          });*/
        } 
      })
      /*  $.ajax({
        type: 'post',
        url: that.$http.adornUrl('/efficiency/advance/history/list'),
        // header: {
        //     // token: token
        // },
        data: {
          kw: search
        },
        dataType: "json",
        success: function (data) {
          if (data.msg === "success") {
            var div = "";
            $.each(data.events.list, function (n, dat) {
              div = "<div class='list-data one'>";
              div += "<div class='list-id'>" + dat.planId + "</div>";
              div += "<div class='list-fdate'>" + dat.beginTime + "</div>";
              div += "<div class='list-update'>" + dat.createTime + "</div>";
              div += "<div class='list-overdate'>" + dat.endTime + "</div>";
              div += "<div class='list-ox'>" + dat.participant + "</div>";
              div += "<div class='list-name'>" + dat.planType + "</div>";
              div += "<div class='list-num'>" + dat.targetCount + "</div>";
              div += "<div class='list-ex'>" + dat.economy + "</div>";
              div += "<div class='list-jd'>" + dat.planCode + "</div>";
              div += "<div class='list-open open-data'><div class='open'>查看详情</div></div>";
              div += "<div class='clear'></div>";
              div += "</div>";
              $(".list").append(div);
            });
          }
        },
      }); */
    }
  }
}
</script>
<style>
  .imphis {
    width: 100%;
    height: 100%;
  }

  .imphis .content-top {
    width: 100%;
    padding: 2% 0 0 0;
    min-height: 10%;
  }

  .imphis .left {
    width: 45%;
    float: left;
    padding-left: 2%;
  }

  .imphis .left-list {
    display: inline-block;
    vertical-align: middle;
  }

  .imphis .left-list img {
    width: 25%;
    display: inline-block;
    vertical-align: middle;
  }

  .imphis .left-list p {
    margin: 0;
    display: inline-block;
    vertical-align: middle;
  }

  .imphis .left-list span {
    color: #0EB7CE;
    margin: 0 10px;
  }

  .imphis .right {
    width: 40%;
    float: right;
    position: relative;
    padding: 0.5% 0;
  }

  .imphis .right img {
    width: 3%;
    position: absolute;
    top: 28%;
    left: 1.5%;
  }

  .imphis .right input {
    width: 60%;
    height: 10%;
    padding: 1% 0 1% 6%;
    display: inline-block;
    vertical-align: middle;
    font-size: 18px;
    border-radius: 10px;
    border: 1px solid #ccc;
  }

  .imp_his_but {
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

  .imphis .list {
    width: 96%;
    min-height: 80%;
    margin: 0 auto;
    font-size: 14px;
    margin-top: 2%
  }

  .imphis .list-data {
    min-width: 100%;
    display: block;
  }

  .imphis .list-data div {
    text-align: center;
    background-color: #f0f0f0;
    color: #000;
    margin: 0;
    float: left;
  }

  .imphis .list-code {
    min-width: 2%;
    max-width: 2%;
    min-height: 21px;
    padding: 0.8% 0.3%;
    border: 1px solid #ccc;
  }

  .imphis .list-id {
    min-width: 6%;
    max-width: 5%;
    min-height: 21px;
    padding: 0.8% 1%;
    border: 1px solid #ccc;
  }

  .imphis .list-fdate {
    min-width: 11%;
    max-width: 5%;
    min-height: 21px;
    padding: 0.8% 1%;
    border: 1px solid #ccc;
  }

  .imphis .list-update {
    min-width: 11%;
    max-width: 5%;
    min-height: 21px;
    padding: 0.8% 1%;
    border: 1px solid #ccc;
  }

  .imphis.list-overdate {
    min-width: 11%;
    max-width: 5%;
    min-height: 21px;
    padding: 0.8% 1%;
    border: 1px solid #ccc;
  }

  .imphis .list-ox {
    min-width: 5%;
    min-height: 21px;
    padding: 0.8% 1%;
    border: 1px solid #ccc;
  }

  .imphis .list-name {
    min-width: 5%;
    min-height: 21px;
    padding: 0.8% 1%;
    border: 1px solid #ccc;
  }

  .imphis .list-num {
    min-width: 5%;
    min-height: 21px;
    padding: 0.8% 1%;
    border: 1px solid #ccc;
  }

  .imphis .list-ex {
    min-width: 5%;
    min-height: 21px;
    padding: 0.8% 1%;
    border: 1px solid #ccc;
  }

  .imphis .list-jd {
    min-width: 5%;
    min-height: 21px;
    padding: 0.8% 1%;
    border: 1px solid #ccc;
  }

  .imphis.list-open {
    min-width: 5%;
    min-height: 21px;
    padding: 0.8% 1%;
    border: 1px solid #ccc;
  }

  .imphis .one div {
    background-color: #ffffff;
  }

  .imphis .clear {
    clear: both;
  }

  .imphis .open-data {
    padding: 0.4% 1%;
  }

  .imphis .open {
    width: 100%;
    color: #fff !important;
    background-color: #60afea !important;
    border-radius: 5px;
    padding: 9% 0;
    cursor: pointer;
  }

  .imphis .list-file {
    text-align: right;
    margin-right: 2%;
  }

  .imphis .file-list {
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

  .imphis .file-num {
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

  .imphis .two div {
    background-color: #eff8ff;
  }

  .imphis .three div {
    background-color: #f1fff2;
  }

</style>

