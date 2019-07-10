<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.roleName" placeholder="角色名称" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-popover
          ref="orgListPopover"
          placement="bottom-start"
          v-model="popuvisible"
          trigger="click">
          <el-tree
            :data="orgList"
            :props="orgListTreeProps"
            node-key="orgId"
            ref="orgListTree"
            @current-change="orgListTreeCurrentChangeHandle"
            :default-expand-all="true"
            :highlight-current="true"
            :expand-on-click-node="false">
          </el-tree>
        </el-popover>
        <el-input v-model="dataForm.orgName" v-popover:orgListPopover placeholder="按组织机构查询" readonly clearable @clear='clearOrgName' @focus="getOrgTree"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="getDataList('params')">查询</el-button>
        <el-button v-if="isAuth('1040:2')" type="primary" @click="addOrUpdateHandle()">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
      :row-style="{height:'36px'}"
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;">
      <el-table-column
        type="index"
        header-align="center"
        align="center"
        width="80"
        label="序号">
      </el-table-column>
      <el-table-column
        prop="roleName"
        header-align="center"
        align="center"
        label="角色名称">
      </el-table-column>
      <el-table-column
        prop="orgName"
        header-align="center"
        align="center"
        label="创建组织机构">
      </el-table-column>
      <el-table-column
        prop="sortNo"
        header-align="center"
        align="center"
        label="排序号">
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="修改" placement="top">  
            <el-button v-if="isAuth('1040:4')" type="text" size="small" @click="addOrUpdateHandle(scope.row.roleId)"><i class="el-icon-edit-outline istyle"></i></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top">  
            <el-button v-if="isAuth('1040:8')" type="text" size="small" @click="deleteHandle(scope.row.roleId)"><i class="el-icon-delete istyle"></i></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[2,10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
  </div>
</template>

<script>
  import AddOrUpdate from './sysroleinfo-add-or-update'
  export default {
    data () {
      return {
        dataForm: {
          roleName: null,
          orgId: null,
          orgName: null
        },
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false,
        popuvisible: false,
        orgList: [],
        orgListTreeProps: {
          label: 'orgName',
          children: 'children'
        }
      }
    },
    components: {
      AddOrUpdate
    },
    mounted () {
      // console.log("role asdasdasddddddddddddddddd")
      var userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
      this.dataForm.orgId = userInfo.orgId
      this.getOrgTree()
      this.getDataList()
    },
    methods: {
      getOrgTree () {
        if(this.orgList.length!=0){
          return
        }
        this.$http({
          url: this.$http.adornUrl('/sys/org/getCurnUserManSysOrgTree'),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          if(data && data.code == 0) {
            this.orgList = data.data
            this.$nextTick(() => {
              this.orgListTreeSetCurrentNode()
            })
          } else {
            this.$message.error(data.msg)
          }
        })
      },
      // 获取数据列表
      getDataList (params) {
        if(params){
          this.pageIndex=1
        }
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/sys/roleinfo/list'),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'limit': this.pageSize,
            'roleName': this.dataForm.roleName,
            'orgId': this.dataForm.orgId
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataList = data.page.list
            this.totalPage = data.page.total
            this.pageIndex = data.page.pageNum
            this.pageSize = data.page.pageSize
          } else {
            this.dataList = []
            this.totalPage = 0
          }
          this.dataListLoading = false
        })
      },
      // 每页数
      sizeChangeHandle (val) {
        this.pageSize = val
        this.pageIndex = 1
        this.getDataList()
      },
      // 当前页
      currentChangeHandle (val) {
        this.pageIndex = val
        this.getDataList()
      },
      // 多选
      selectionChangeHandle (val) {
        this.dataListSelections = val
      },
      // 新增 / 修改
      addOrUpdateHandle (id) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(id, this.dataForm.orgId, this.dataForm.orgName, this.orgList)
        })
      },
      // 删除
      deleteHandle (id) {
        var ids = id ? [id] : this.dataListSelections.map(item => {
          return item.roleId
        })
        this.$confirm(`确定删除操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/sys/roleinfo/delete'),
            method: 'post',
            data: this.$http.adornData(ids, false)
          }).then(({data}) => {
            if (data && data.code === 0) {
                  this.getDataList()
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        })
      },
      // 菜单树选中
      orgListTreeCurrentChangeHandle (data, node) {
        this.popuvisible = false
        this.dataForm.orgName = data.orgName
        this.dataForm.orgId = data.orgId
      },
      // 菜单树设置当前选中节点
      orgListTreeSetCurrentNode () {
        if (this.dataForm.orgId && this.$refs.orgListTree != undefined) {
          this.$refs.orgListTree.setCurrentKey(this.dataForm.orgId)
          this.dataForm.orgName = (this.$refs.orgListTree.getCurrentNode() || {})['orgName']
        }
      },
      clearOrgName () {
        this.dataForm.orgId = null
        this.dataForm.orgName = null
      }
    }
  }
</script>
<style scoped>
/* .istyle {
  font-size: 18px;
  font-weight: 500;
  color: #3397ff
}
.mod-config >>> .el-pager li.active {
  background-color: #33a7fe;
  color: #fff;
  font-size: 16px;
  border-radius: 100%
}
.mod-config >>> .el-pager li {
  min-width: 30px;
  height: 25px;
  line-height: 25px
}
.mod-config >>> .el-table td, .mod-config >>> .el-table th {
  padding: 0
} */
</style>
