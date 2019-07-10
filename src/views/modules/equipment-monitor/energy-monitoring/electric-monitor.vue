<template>
  <div id="electric-monitor" class="em">
<el-table
    :data="tableData"
    stripe
    border
    style="width: 100%"
    @row-dblclick = "toDetail"
    v-loading="dataListLoading"
    :row-class-name="tableRowClassName"
    >
     <el-table-column
      prop="equipName"
      label="设备名称"
      align="center"
      >
     </el-table-column>
    </el-table-column>
    <el-table-column
      prop="address"
      label="安装地址"
      align="center"
      >
    </el-table-column>
    <el-table-column
      prop="p1021"
      label="正向总有功电能"
      align="center">
    </el-table-column>
    <el-table-column
      prop="p1031"
      label="A相有功功率"
      align="center"
      >
    </el-table-column>
    <el-table-column
      prop="p1032"
      label="B相有功功率"
      align="center"
      >
    </el-table-column>
    <el-table-column
      prop="p1033"
      label="C相有功功率"
      align="center"
      >
    </el-table-column>
    <el-table-column
      prop="p1039"
      label="A相电压"
      align="center"

      >
    </el-table-column>
    <el-table-column
      prop="p1040"
      label="B相电压"
      align="center"

      >
    </el-table-column>
    <el-table-column
      prop="p1041"
      label="C相电压"
      align="center"
      >
    </el-table-column>
    <el-table-column
      prop="p1035"
      label="A相电流"
      align="center"

      >
    </el-table-column>
    <el-table-column
      prop="p1036"
      align="center"
      label="B相电流"
      >
    </el-table-column>
    <el-table-column
      prop="p1037"
      align="center"
      label="C相电流">
    </el-table-column>
    <el-table-column
      prop="p1058"
      align="center"
      label="频率"
      fixed="right"
      >
    </el-table-column>
  </el-table>
  <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="totalPage" layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
     <!-- 弹窗 查看详细信息 -->
    <el-dialog title="详细信息" :close-on-click-modal="false" ref="addOrUpdate" :visible.sync="visible" >
      <div  class="contentDiv">
        <div v-for="one in coloumData" class="pointInfo">
            <span>{{one.pointName}}</span>
            <span class="space">:</span>
            <span class="pointValue">{{one.pointValue}}</span>
            <span>{{one.pointUnit}}</span>
        </div>
        
        
       
        
      </div>
      <!-- <span slot="footer" class="dialog-footer">

      </span> -->
    </el-dialog>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData:[],
        coloumData:[],
        visible:false,
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,

      }
    },
    created() {
        this.getDataList()
    },
    watch: {

    },
    methods: {
      getDataList(){
          this.dataListLoading = true
         this.$http({
          url: this.$http.adornUrl('/base/electric/list'),
          method: 'post',
          data: this.$http.adornData({
                'page': this.pageIndex.toString(),
            'limit': this.pageSize.toString(),
                "code":[1]
          })
        }).then(({
          data
        }) => {
          if (data.msg === "success") {
            this.tableData = data.page.list
            this.totalPage = data.page.totalCount
          }
          else {
            this.dataList = []
            this.totalPage = 0
          }
          this.dataListLoading = false

        })
     },
     toDetail(row, event){
         this.coloumData = row.points
       console.log(this.coloumData)

         this.visible = true
     },
      // 每页数
      sizeChangeHandle(val) {
        this.pageSize = val
        this.pageIndex = 1
        this.getDataList()
      },
      // 当前页
      currentChangeHandle(val) {
        this.pageIndex = val
        this.getDataList()
      },
    }
  }

</script>
<style scoped>
  .el-form-item{
      display: inline-block;
      width: 30%;
  }
  .contentDiv{
        background-color: #f0f3f3;
    border-radius: 5px;
    padding: 30px 20px;
  }
  .pointInfo{
    display: inline-block;
    width: 25%;
    margin: 10px 0;

  }
  .space{
    margin: 0  10px;
  }
  .pointValue{
    margin: 0 5px;
  }
</style>
