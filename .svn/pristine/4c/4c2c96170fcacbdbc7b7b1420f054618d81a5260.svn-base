<template>
  <div id="air-monitor" class="em">
    <el-table :data="tableData" stripe style="width: 100%" :row-class-name="tableRowClassName">
      <el-table-column prop="equipName" label="设备名称" align="center">
      </el-table-column>

      <el-table-column prop="address" label="安装地址" align="center">
      </el-table-column>

      <el-table-column prop="airDemand" label="累计供气量" align="center" :formatter="coldHot"  fixed="right">
      </el-table-column>


    </el-table>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [],
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
      init() {
        this.$http({
          url: this.$http.adornUrl('/base/air/list'),
          method: 'post',
          data: this.$http.adornData({
            'page': this.pageIndex.toString(),
            'limit': this.pageSize.toString(),
          })
        }).then(({
          data
        }) => {
          if (data.msg === "success") {
            this.tableData = data.page.list
            this.totalPage = data.page.totalCount
          } else {
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

    }
  }

</script>
<style scoped>



</style>
