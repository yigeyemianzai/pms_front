<template>
  <el-table-column :prop="prop" v-bind="$attrs" align="center">
    <template slot-scope="scope">
      <span @click.prevent="toggleHandle(scope.$index, scope.row)" :style="childStyles(scope.row)">
        <i :class="iconClasses(scope.row)" :style="iconStyles(scope.row)"></i>
        {{ scope.row[prop] }}
      </span>
    </template>
  </el-table-column>
</template>

<script>
  import isArray from 'lodash/isArray'
  export default {
    name: 'table-tree-column',
    props: {
      prop: {
        type: String
      },
      treeKey: {
        type: String,
        default: 'id'
      },
      parentKey: {
        type: String,
        default: 'parentId'
      },
      physicalKey: {
        type: String,
        default: 'physicalId'
      },
      levelKey: {
        type: String,
        default: 'level'
      },
      childKey: {
        type: String,
        default: 'children'
      },
      leafKey: {
        type: String,
        default: 'leaf'
      },
      lazy: {
        type: Boolean,
        default: false
      }
    },
    created() {
      // this.$on('inputSelect', this.select);
    },
    methods: {
      childStyles (row) {
        return { 'padding-left': (row[this.levelKey] > 0 ? row[this.levelKey] * 30 : 0) + 'px', }
      },
      iconClasses (row) {
        return [ !row._expanded ? 'el-icon-caret-right' : 'el-icon-caret-bottom' ]
      },
      iconStyles (row) {
        return { 'visibility': this.hasChild(row) ? 'visible' : 'hidden', 'color': '#41addb', 'cursor': 'pointer'}  
      },
      hasChild (row) {
        if(this.lazy){
          return !row[this.leafKey]
        }else{
          return (isArray(row[this.childKey]) && row[this.childKey].length >= 1) || false
        }
      },
      // 展开处理
      toggleHandle (index, row) {
        // this.$emit('add', row)
        if (this.hasChild(row)) {
          var data = this.$parent.store.states.data.slice(0)
          data[index]._expanded = !data[index]._expanded
          if (data[index]._expanded) {
            if(this.lazy){
              this.$emit('expanded', index, row,true)
            }else{
              data = data.splice(0, index + 1).concat(row[this.childKey]).concat(data)
              this.$parent.store.commit('setData', data)
              this.$nextTick(() => {
                this.$parent.doLayout()
              })
            }
          } else {
            if(this.lazy){
              this.$emit('expanded', index, row,false)
             }else{
              data = this.removeChildNode(data, row[this.treeKey])
              this.$parent.store.commit('setData', data)
              this.$nextTick(() => {
                this.$parent.doLayout()
              })
            }
          }
        }
      },
      // 添加子节点
      addChildNode (index, row, child) {
        // data表格数据
        var data = this.$parent.store.states.data.slice(0)
        data = data.splice(0, index + 1).concat(child).concat(data)
        this.$parent.store.commit('setData', data)
        this.$nextTick(() => {
          this.$parent.doLayout()
        })
      },
      // 移除子节点
      removeChildNode (data, parentId) {
        var parentIds = isArray(parentId) ? parentId : [parentId]
        if (parentId.length <= 0) {
          return data
        }
        var ids = []
        for (var i = 0; i < data.length; i++) {
          if ((parentIds.indexOf(data[i][this.parentKey]) !== -1 && parentIds.indexOf(data[i][this.treeKey]) === -1) || (parentIds.indexOf(data[i][this.physicalKey]) !== -1 && parentIds.indexOf(data[i][this.treeKey]) === -1)) {
            ids.push(data.splice(i, 1)[0][this.treeKey])
            i--
          }
        }
        return this.removeChildNode(data, ids)
      }
    }
  }
</script>
