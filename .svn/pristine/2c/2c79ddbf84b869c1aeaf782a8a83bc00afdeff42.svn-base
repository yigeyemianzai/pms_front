<template>
  <el-table
    :max-height="tableHeight"
    :data="tableData"
    border
    stripe
    :row-key="id"
    align="left"
    @selection-change="selectionChangeHandle">
    
    <el-table-column
      type="selection"
      header-align="center"
      align="center"
      width="50"></el-table-column>
      <el-table-column
      label="序号"
      type="index"
      align="center"
      width="50"
      >
    </el-table-column>
    <el-table-column v-for="(item, index) in col"
      :key="`col_${index}`"
      :prop="col[index].prop"
      :label="item.label"
      :min-width="item.minWidth"
      header-align="center"
      align="center"> 
    </el-table-column>
    <el-table-column
      fixed="right"
      header-align="center"
      align="center"
      min-width="100"
      label="操作">
      <template slot-scope="scope">
        <el-button v-if="isauth" :plain="true" type="danger" size="mini" @click="deleteHandle(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import Sortable from 'sortablejs'
export default {
  name: 'sortable-table',
  props: {
    col: {
      type: Array
    },
    tableData: {
      type: Array
    },
    isauth: {
      type: Boolean
    }
  },
  data() {
    return {
      zfDataListSelections: '',
      tableHeight: 320,
      id: null
    }
  },
  created () {
    this.tableHeight = window.innerHeight - 320
    this.id = this.col[2].prop
    console.log(this.col[2])
  },
  mounted () {
    this.rowDrop()
  },
  methods: {
    //行拖拽
    rowDrop() {
      let tbody,
      ty = this.col[2].prop.substring(2,4).toLowerCase()
      tbody = document.querySelector('.'+ ty +'sortable' + ' .el-table__body-wrapper tbody')
      const _this = this
      Sortable.create(tbody, {
        onEnd({ newIndex, oldIndex }) {
          console.log('新---' + newIndex)
          console.log('旧---' + oldIndex)
          console.log(newIndex - oldIndex)
          const currRow = _this.tableData.splice(oldIndex, 1)[0]
          _this.tableData.splice(newIndex, 0, currRow)
          let obj = {
            sortNumbers: _this.tableData,
            currRow: currRow,
            newIndex: newIndex,
            oldIndex: oldIndex
          }
          _this.$emit('sortNumbers', obj)
        }
      })  
    },
    // 多选
    selectionChangeHandle (val) {
      console.log(val)
      this.zfDataListSelections = val
      this.$emit('zfDataListSelection', val)
    },
    deleteHandle (val) {
      this.$emit('deleteId', val)
    }
  }
}
</script>

