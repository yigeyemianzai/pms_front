<template>
<div class="tablestyle">
  <el-table
    v-loading="table.load"
    border
    :row-style="{height:'36px'}"
    :data="table.tableData"
    @sort-change = "sortChange"
    @selection-change= "selectionChangeHandle"
    empty-text="暂无"
    :default-sort = "table.defaultSort"
    style="width: 100%">
    <el-table-column
      type="selection"
      header-align="center"
      align="center"
      width="50">
    </el-table-column>
    <el-table-column
      type="index"
      label="序号"
      header-align="center"
      align="center"
      width="80">
    </el-table-column>
    <el-table-column
      v-for="(col, index) in table.tableLabel"
      :key="index"
      :type="col.type"
      :fixed="col.fixed"
      :prop="col.prop"
      :label="col.title"
      :min-width="col.width"
      :sortable="col.sort"
      :formatter="col.formatter"
      :show-overflow-tooltip="col.ellipsis"
      header-align="center"
      align="center">
    </el-table-column>
    <el-table-column
      v-if="table.status.isShow"
      width="100"
      :label="table.status.status">
      <template slot-scope="scope">
        <el-switch
          :disabled="table.status.disabled"
          v-model="scope.row.active"
          active-color="#52BEA6"
          inactive-color="#CACDD0"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
      </template>
    </el-table-column>
    <el-table-column
      fixed="right"
      v-if="table.tableOption.isShow"
      align="center"
      header-align="center"
      :label="table.tableOption.action"
      :width="table.tableOption.width">
      <template slot-scope="scope">
        <el-button v-for="(btn, index) in table.tableOption.buttons" :key='index'
                   @click="handleButton(scope.row,btn.methods)" type="text" size="small" class="btn">
          <i :class="{'el-icon-delete' : btn.label == '删除' && btn.no == OPTAUTH_DELETE, 'el-icon-edit-outline': btn.label == '修改' && btn.no == OPTAUTH_UPDATE, 'el-icon-setting': btn.label == '配置'}"></i></el-button>
      </template>
    </el-table-column>
  </el-table>
  <div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="table.pageIndex"
      :page-sizes="[2,5,10,25,50]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="table.total">
    </el-pagination>
  </div>
</div>
</template>

<script>
export default {
  name: "voTable",
  props:{ table:Object,pageParam:Object},
  data () {
    return {
    }
  },
  methods: {
    sortChange(obj){
      let orderBy = {};
      if(obj.order) {
        if (obj.order.substr(0, 1) === 'a') {
          orderBy = obj.prop + " asc"
        }
        if (obj.order.substr(0, 1) === 'd') {
          orderBy = obj.prop + " desc"
        }
      }
      this.$emit('search',{pageNo:this.pageParam.pageNo,pageSize:this.pageParam.pageSize,orderBy: orderBy});
    },
    selectionChangeHandle (val) {
      console.log(val)
      this.$emit('deleteAll', val)
    },
    handleButton(row,methods) {
      this.$emit('action',{'row':row,'methods':methods});
    },
    handleSizeChange(val) {
      this.$emit('search',{pageNo:this.pageParam.pageNo,pageSize: val ,orderBy: this.pageParam.orderBy});
    },
    handleCurrentChange(val) {
      console.log(val)
      this.$emit('search',{pageNo:val,pageSize: this.pageParam.pageSize,orderBy: this.pageParam.orderBy });
    }
  }
}
</script>
<style scoped>
.btn i {
  font-size: 18px;
  font-weight: 500;
  color: #3397ff
}
/* .tablestyle >>> .el-pager li.active {
  background-color: #33a7fe;
  color: #fff;
  font-size: 16px;
  border-radius: 100%
}
.tablestyle >>> .el-pager li {
  min-width: 30px;
  height: 25px;
  line-height: 25px
}
.tablestyle >>> .el-table td, .tablestyle >>> .el-table th {
  padding: 0
} */
</style>
<style>


/* .el-table--enable-row-hover .el-table__body tr:hover>td{
  background-color: #000 !important;
}
.el-table__body tr:hover>td{
  background-color: #e1e7f0!important;
}

.el-table__body tr.current-row>td{
  background-color: #e1e7f0!important;
} */

</style>

