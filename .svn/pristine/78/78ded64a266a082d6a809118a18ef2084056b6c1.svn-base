<template>
  <el-table :data="data" border :row-style="showRow" @selection-change="selectionChange" stripe :max-height="contentTableHeight">
    <el-table-column type="selection" header-align="center" align="center" width="50" >
    </el-table-column>
    <el-table-column v-if="isExpand" type="expand" label="展开" width="100">
      <template slot-scope="scope">
        <el-form label-position="left" inline class="expand_info">
          <el-form-item :label="exs.text" v-for="exs in expandList" :key="exs.dataIndex">
            <span>{{scope.row[exs.dataIndex]}}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column v-for="(column, index) in columns" :width="column.width" :key="column.dataIndex" :label="column.text"
      header-align="center">
      <template slot-scope="scope" >
        <span v-if="spaceIconShow(index)" v-for="(space, levelIndex) in scope.row._level" class="ms-tree-space" :key="levelIndex"></span>
        <el-button type="success" plain size="mini" round v-if="toggleIconShow(index,scope.row)" @click="toggle(scope.$index)">
          <i v-if="!scope.row._expanded" class="el-icon-plus" aria-hidden="true"></i>
          <i v-if="scope.row._expanded" class="el-icon-minus" aria-hidden="true"></i>
        </el-button>
        <el-button size="mini" disabled round v-else-if="index===0 && isTree"  >
          <i class="el-icon-minus"></i>
        </el-button>
        <span v-else-if="index===0" class="ms-tree-space"></span>
        {{scope.row[column.dataIndex]}}
      </template>
    </el-table-column>
    <el-table-column fixed="right" header-align="center" align="center" width="180" label="操作" v-if="controls">
      <template slot-scope="scope">
        <!-- <el-button v-if="scope.row.ID !== '' && isShowAddCate" type="text" size="small" @click="addCate(scope.row)">增加下级</el-button> -->
        <el-button v-if="isAuth('OPTAUTH_UPDATE')" type="text" size="small" @click="getCateInfoById(scope.row)">修改</el-button>
        <el-button v-if="isAuth('OPTAUTH_DELETE')" type="text" size="small" @click="deleteCategory(scope.row)">删除</el-button>
        <!-- <el-button v-if="isDataSet" type="text" size="small" @click="dataSet(scope.row)">数据配置</el-button> -->
      </template>
    </el-table-column>

  </el-table>
</template>
<script>
  export default {
    name: 'tree-grid',
    props: {
      isTree:{
        type: Boolean,
        default: false
      },
      // 是否显示 增加下级 按钮
      isShowAddCate: {
        type: Boolean,
        default: false
      },
      treeStructure: {
        type: Boolean,
        default: false
      },
      columns: {
        type: Array,
        default: function () {
          return []
        }
      },
      expandList: {
        type: Array,
        default: function () {
          return []
        }
      },
      // 数据源
      dataSource: {
        type: Array,
        default: function () {
          return []
        }
      },
      // 是否展示操作列
      controls: {
        type: Boolean,
        default: true
      },
      isExpand: {
        type: Boolean,
        default: false
      },
      isDataSet: {
        type: Boolean,
        default: false
      },
      // 是否默认展开所有树
      defaultExpandAll: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        // 表格高度
      contentTableHeight: ''
      }
    },
    computed: {
      // 格式化数据源
      data: function () {
        let me = this
        if (me.treeStructure) {
          let data = this.handleData(me.dataSource, null, null, me.defaultExpandAll)
          return data
        }
        return me.dataSource
      }
    },
    created () {
    this.contentTableHeight = window.innerHeight-320
  },
    methods: {
      // 数据转换
      handleData: function (data, parent, level, expandedAll) {
        let _this = this
        let tmp = []
        Array.from(data).forEach(function (record) {
          if (record._expanded === undefined) {
            _this.$set(record, '_expanded', expandedAll)
          }
          if (parent) {
            _this.$set(record, '_parent', parent)
          }
          let _level = 0
          if (level !== undefined && level !== null) {
            _level = level + 1
          }
          _this.$set(record, '_level', _level)
          tmp.push(record)
          if (record.children && record.children.length > 0) {
            let children = _this.handleData(record.children, record, _level, expandedAll)
            tmp = tmp.concat(children)
          }
        })
        return tmp
      },
      // 显示行
      showRow: function ({
        row,
        rowIndex
      }) {
        let show = (row._parent ? (row._parent._expanded && row._parent._show) : true)
        row._show = show
        return show ? '' : 'display:none;'
      },
      // 展开下级
      toggle: function (trIndex) {
        let me = this
        let record = me.data[trIndex]
        record._expanded = !record._expanded
      },
      // 显示层级关系的空格和图标
      spaceIconShow(index) {
        let me = this
        if (me.treeStructure && index === 0) {
          return true
        }
        return false
      },
      // 点击展开和关闭的时候，切换图标
      toggleIconShow(index, record) {
        let me = this
        if (me.treeStructure && index === 0 && record.children && record.children.length > 0) {
          return true
        }
        return false
      },
      getCateInfoById(row) {
        // 根据ID查询分类信息
        this.$emit('changeHandle', row)
        console.log(row)
      },
      deleteCategory(row) {
        // 删除
        this.$emit('deleteRow', row)
      },
      dataSet(row) {
        // 删除
        this.$emit('changeData', row)
      },
      selectionChange(val){
        this.$emit('selection', val)        
      },
      // 增加下级
      addCate (val) {
        this.$emit('addCate', val)
      }
    }
  }

</script>
<style scoped>
  .ms-tree-space {
    display: inline-block;
    width: 28px;
  }

  .el-button--mini,
  .el-button--mini.is-round {
    padding: 7px;
  }

</style>
