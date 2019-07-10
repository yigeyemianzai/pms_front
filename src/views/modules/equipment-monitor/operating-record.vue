<template>
  <div class="operating" id="operatingRecord">
    <div class="lefttree">
      <!-- <el-tree :props="props" ref="tree" :load="loadNode" lazy node-key="id" highlight-current @node-click="handleNodeClick" class="treeredefine"></el-tree> -->
      <el-tree
        @node-click="handleNodeClick"
        node-key="id"
        class="treeredefine"
        highlight-current
        :data="data2"
        :props="props"
        default-expand-all
        ref="tree">
        <div class="custom-tree-node" slot-scope="{ node, data}">
          <span>
              <i :class="{build:data.voType==2,floor:data.voType==3,room:data.voType==4}"></i>{{ node.label }}
          </span>
          <!-- <span v-if="!data.leaf"><i :class="{'tree-expand':(!node.expanded),'shrink':node.expanded}"></i></span>   -->    
        </div>
      </el-tree>
    </div>
    <div class="righttable">
      <!-- <el-table
        stripe
        :row-class-name="tableRowClassName"
        v-loading="loading"
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          type="index"
          header-align="center"
          align="center"
          width="80"
          label="序号">
        </el-table-column>
        <el-table-column 
        v-for="(item , index) in tableColumn"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        header-align="center"
        align="center"
        ></el-table-column>
      </el-table>
      <el-pagination
        @size-change="sizeChangeHandle"
        @current-change="currentChangeHandle"
        :current-page="pageIndex"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        :total="totalPage"
        layout="total, sizes, prev, pager, next, jumper">
      </el-pagination> -->
      <voTable @search="search" :table="tableAll" :pageParam="getTable" ></voTable>
    </div>    
  </div>
</template>
<script>
import voTable from '../../../components/table/table'
export default {
  data () {
    return {
      tableAll:{
        defaultSort:{prop:'operatTime',order:'descending'},
        status:{disabled:true, status: '状态', isShow: false},
        tableLabel:[
          {prop:'operatTime',title:'操作时间'},
          {prop:'operatDesc',title:'操作描述',fixed: 'right'}
        ],
        tableData: [],
        tableOption:{
          isShow: false,
          action: '操作',
          width:'200',
          buttons:[]
        },
        total:0,
        load: false
      },
      /*你的请求参数*/
      getTable:{
        pageSize: 10,
        pageNo: 1,
        username: '',
        roleId: null,
        orderBy:''
      },
      data2: [{
        id: '1',
        label: '南京师范大学',
        children: [{
          id: '1-1',
          label: 'A楼',
          voType: 2,
          children: [{
            id: '1-1-1',
            label: '插座1',
            voType: 4,
          }, {
            id: '1-1-2',
            label: '插座2',
            voType: 4,
          }]
        }, {
          id: '1-2',
          label: 'B楼',
          children: [{
            id: '1-2-1',
            label: '插座3',
            voType: 4,
          }, {
            id: '1-2-2',
            label: '插座4',
            voType: 4,
          }]
        }]
      }],
      props: {
        children: 'children',
        label: 'label'
      },
      /* props: {
        label: 'name',
        children: 'zones',
        isLeaf: !'leaf'
      }, */
      loading: false,
      diagram: null,
    }
  },
  components:{ voTable },
  mounted: function () {
    this.getTableData()
    document.getElementById('operatingRecord').style.height = (window.innerHeight - 170) + 'px'
    window.onresize = function () {
    }
  },
  methods: {
    // 获取tree数据
    loadNode(node, resolve) {
      let nodeValue = []
      if (node.level === 0) {
        this.$http({
          url: this.$http.adornUrl('/admin/equipment-topology'),
          method: 'post',
          data: this.$http.adornData({
          })
        }).then(({ data }) => {
          if (data && data.code === 0) {
            console.log(data)
            nodeValue = data.list
            return resolve(nodeValue)
          }
        })
      } else {
          this.cuType = node.data.voType
          this.cuId = node.data.id
          this.$http({
            url: this.$http.adornUrl('/admin/equipment-topology'),
            method: 'post',
            data: this.$http.adornData({
              "id": node.data.id,
              "voType": node.data.voType
            })
          }).then(({ data }) => {
            if (data && data.code === 0) {
              return resolve(data.list)
            }
          })
        }
    },
    // 选择树节点
    handleNodeClick(data) {
      console.log(data)
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 1000)     
    },
    // 获取表格数据
    getTableData () {
      this.tableAll.load = true
      this.$http({
        url: this.$http.adornUrl('/admin/operating-record'),
        method: 'post',
        data: this.$http.adornParams({
        })
      }).then(({data}) => {
        if(data && data.code == 0) {
          this.tableAll.load = false
          this.tableData = data.list
        }
      })
    },
    search(obj){
      this.getTable.pageSize = obj.pageSize;
      this.getTable.pageNo = obj.pageNo;
      this.getTable.orderBy = obj.orderBy;
      this.tableAll.load = true
      this.$http({
        url: this.$http.adornUrl('/admin/operating-record'),
        method: 'post',
        data: this.$http.adornParams({
        })
      }).then(({data}) => {
        if(data && data.code == 0) {
          this.tableAll.load = false
          this.tableAll.tableData = data.list
          this.tableAll.total = data.totalCount
        }
      })
      /* this.$post('你的后台API地址',this.getTable).then((res) => {
        this.tableAll.tableData = res.data.result;
        this.tableAll.total = res.data.total
      }) */
    }
  }
}
</script>
<style scoped>
.operating {
  display: flex;
}

/* 左侧树样式开始 */
.lefttree {
  width: 10%;
  min-width: 200px;
  border-radius: 5px;
  padding:5px 0 5px 10px;
  border: 1px solid rgba(204,204,204, 31%);
  box-shadow:  5px 5px 16px rgba(204,204,204, 91%), 0px 0px 3px rgba(204,204,204, 91%);
}
.treeredefine {
  background: transparent
}
.lefttree >>>.el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content .build{
    display: inline-block;
    background:  url('~@/assets/images/tree-icon11.png') no-repeat;
    height: 16px;
    width: 16px;
    margin-right: 10px;
    vertical-align: middle;
    line-height: 16px;
  }
  .lefttree >>>.is-expanded{
    /* border-bottom: 2px solid red; */
  }
  .lefttree >>>.el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content .floor{
    display: inline-block;
    background:  url('~@/assets/images/tree-icon22.png') no-repeat;
    height: 16px;
    width: 16px;
    margin-right: 10px;
    vertical-align: middle;
    line-height: 16px;
  }
  .lefttree >>>.el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content .room{
    display: inline-block;
    background:  url('~@/assets/images/tree-icon33.png') no-repeat;
    height: 16px;
    width: 16px;
    margin-right: 10px;
    vertical-align: middle;
    line-height: 16px;
  }
  .build{
    display: inline-block;
    background:  url('~@/assets/images/tree-icon1.png') no-repeat;
    height: 16px;
    width: 16px;
    line-height: 16px;
    margin-right: 10px;
    vertical-align: middle;
  }
  .floor{
    display: inline-block;
    background:  url('~@/assets/images/tree-icon2.png') no-repeat;
    height: 16px;
    width: 16px;
    line-height: 16px;
    margin-right: 10px;
    vertical-align: middle;
  }
  .room{
    display: inline-block;
    background:  url('~@/assets/images/tree-icon3.png') no-repeat;
    height: 16px;
    width: 16px;
    line-height: 16px;
    margin-right: 10px;
    vertical-align: middle;
  }
  .tree-expand{
    /* display: inline-block; */
    position: absolute;
    right: 10%;
    background:  url('~@/assets/images/tree-open.png') no-repeat;
    height: 15px;
    width: 15px;
   /* text-align: right; */
  }
  .shrink{
    position: absolute;
    right: 10%;
    background:  url('~@/assets/images/tree-close.png') no-repeat;
    height: 15px;
    width: 15px;
  }
/* 左侧树样式结束 */

/* 右侧表格样式开始 */
.righttable {
  flex: 1;
  overflow: auto;
  padding-left: 20px
}
/* 右侧表格样式结束 */
</style>

