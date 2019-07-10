<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.key" placeholder="资源名称" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="getDataList()">查询</el-button>
        <el-button v-if="isAuth(OPTAUTH_ADD)" type="primary" @click="addOrUpdateHandle()">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
      :row-style="{height:'36px'}"
      :row-class-name="tableRowClassNames"
      ref="curntable"
      v-loading="dataListLoading"
      style="width: 100%;">
      <el-table-column
        type="index"
        header-align="center"
        align="center"
        width="80"
        label="序号">
      </el-table-column>
      <el-table-column
        prop="resId"
        header-align="center"
        align="center"
        :show-overflow-tooltip="true"
        width="100"
        label="资源标识">
      </el-table-column>
      <table-tree-column
        prop="resName"
        treeKey="resId"
        header-align="center"
        lazy
        @expanded="expandedHandle"
        label="资源名称">
      </table-tree-column>
      <el-table-column
        header-align="center"
        align="center"
        label="图标">
        <template slot-scope="scope">
          <i :class="scope.row.icon" style="font-size:16px"></i>
        </template>
      </el-table-column>
      <el-table-column
        prop="url"
        header-align="center"
        align="center"
        label="资源路径">
      </el-table-column>
      <el-table-column
        prop="leaf"
        header-align="center"
        align="center"
        width="180"
        label="是否叶节点">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.leaf" size="small">是</el-tag>
          <el-tag v-else size="small" type="success">否</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="leaf"
        header-align="center"
        align="center"
        width="180"
        label="是虚拟节点">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.valid" size="small">是</el-tag>
          <el-tag v-else size="small" type="success">否</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="sortNo"
        header-align="center"
        align="center"
        width="80"
        label="排序">
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">      
          <el-tooltip class="item" effect="dark" content="修改" placement="top">   
            <el-button v-if="isAuth(OPTAUTH_UPDATE)" type="text" size="small" @click="addOrUpdateHandle(scope.row.resId)"><i class="el-icon-edit-outline istyle"></i></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button v-if="isAuth(OPTAUTH_DELETE)" type="text" size="small" @click="deleteHandle(scope.row.resId)"><i class="el-icon-delete istyle"></i></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="新增下级资源" placement="top">
            <el-button v-if="isAuth(OPTAUTH_ADD)" type="text" size="small" @click="addOrUpdateHandle(null,scope.row.resId)"><i class="el-icon-setting istyle"></i></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
  </div>
</template>

<script>
  import TableTreeColumn from '@/components/table-tree-column'
  import { isURL } from '@/utils/validate'
  import AddOrUpdate from './sysresinfo-add-or-update'
  import isArray from 'lodash/isArray'
  export default {
    data () {
      return {
        dataForm: {
          key: ''
        },
        dataList: [],
        dataListLoading: false,
        addOrUpdateVisible: false,
        selectIndex: 0
      }
    },
    components: {
      TableTreeColumn,
      AddOrUpdate
    },
    mounted () {
      this.getDataList()
    },
    computed: {
    },
    methods: {
      // 获取数据列表
      getDataList (parentId = null,lv = null) {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/sys/resinfo/queryListByParentId'),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'limit': this.pageSize,
            'resName': this.dataForm.key,
            'parentId': parentId,
            'level': lv == null ? null : lv.toString()
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            if(parentId == null){
              this.dataList = data.list // MSDataTransfer.treeToArray(data.list, null, null, true)
            }else{
              this.dataList = this.dataList.splice(0, this.selectIndex + 1).concat(data.list).concat(this.dataList)
            }
          } else {
            this.dataList = []
          }
          this.dataListLoading = false
        })
      },
      expandedHandle (index, row, expanded) {
        this.selectIndex = index
        if(expanded){
          this.getDataList(row.resId, row.level)
        }else{
          this.dataList = this.removeChildNode(this.dataList,row.resId)
        }
      },
      // 移除子节点
      removeChildNode (data, parentId) {
        var parentIds = isArray(parentId) ? parentId : [parentId]
        if (parentIds.length <= 0) {
          return data
        }
        var ids = []
        for (var i = 0; i < data.length; i++) {
          if (parentIds.indexOf(data[i].parentId) !== -1 && parentIds.indexOf(data[i].resId) === -1) {
            ids.push(data.splice(i, 1)[0].resId)
            i--
          }
        }
        return this.removeChildNode(data, ids)
      },
      // 新增 / 修改
      addOrUpdateHandle (id = null,parentId = null) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(id,parentId)
        })
      },
      // 删除
      deleteHandle (id) {
        var ids = id ? [id] : this.dataListSelections.map(item => {
          return item.resId
        })
        this.$confirm(`确定删除操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/sys/resinfo/delete'),
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
