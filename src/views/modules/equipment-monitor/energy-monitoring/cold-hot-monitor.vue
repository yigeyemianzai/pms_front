<template>
  <div id="electric-monitor" class="em">
<el-table
    :data="tableData"
    stripe
    style="width: 100%"
    :row-class-name="tableRowClassName"
    >
    <el-table-column
      prop="equipName"
      label="设备名称"
      align="center"
      >
    </el-table-column>

      <el-table-column
      prop="address"
      label="安装地址"
      align="center"
      >
    </el-table-column>

    <el-table-column
      prop="p1003p1002"
      label="供冷/热负荷"
      align="center"
      :formatter="coldHot"
      >
    </el-table-column>
   
    <el-table-column
      prop="p1301"
      label="瞬时流量"
      align="center">.


    </el-table-column>
    <el-table-column
      prop="p1022"
      label="累计流量"
      align="center"
      >
    </el-table-column>
    <el-table-column
      prop="p1304"
      label="供水温度"
      align="center"
      >
    </el-table-column>
    <el-table-column
      prop="p1305"
      label="回水温度"
      align="center"
      fixed="right"
      >
    </el-table-column>

  </el-table>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData:[],
         pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
      }
    },
    created() {
        this.init()
    },
    watch: {

    },
    methods: {
     init(){
         this.$http({
          url: this.$http.adornUrl('/base/electric/list'),
          method: 'post',
          data: this.$http.adornData({
            'page': this.pageIndex.toString(),
            'limit': this.pageSize.toString(),
                "code":[4,5]
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

        })
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
      coldHot(value){
        if(value.p1002){
          return value.p1002
        }else if(value.p1003){
          return value.p1003
        }
      }
    }
  }

</script>
<style scoped>
  


</style>
