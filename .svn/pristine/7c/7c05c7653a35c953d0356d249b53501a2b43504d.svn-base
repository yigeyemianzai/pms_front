<template>
  <el-tree :data="treeData" :props="defaultProps" :load="loadNode1" lazy show-checkbox>
  </el-tree>
</template>

<script>
  export default {
    name: 'icon-svg',
    props: {
        
          // label: 'name',
          // children: 'zones',
          // isLeaf: 'leaf'
      label: {
        type: String,
        default: ''
      },    
      children: {
        type: Array,
        default: []
      }, 
      isLeaf: {
        type: Boolean,
        default: true
      },
      treeData: {
        type: Array,
        default:[]
      },
      defaultProps: {
        label: 'name',
          children: 'zones',
          isLeaf: 'leaf'
        }
    },
    computed: {

    },
    methods: {
      loadNode(node, resolve) {
        // if (node.level === 0) {
        //   return resolve([{ name: 'region' }]);
        // }
        // if (node.level > 1) return resolve([]);

        // setTimeout(() => {
        //   // const data = [{
        //   //   name: 'leaf',
        //   //   leaf: true
        //   // }, {
        //   //   name: 'zone'
        //   // }];

        //   resolve(this.treeData);
        // }, 500);
        this.$emit('loadNode', node,resolve)
      }
    }
  }

</script>

<style>
</style>
