<template>
  <div id="tymrule" class="tymrule">
    <el-row class="tymrule-item">
      <!-- 遥脉配置表格 -->
      <el-col :xl="11" :lg="11" class="tymrule-item">
        <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()" class="ym-form">
          <el-form-item>
            <el-select
              v-model="dataForm.channelSelected" 
              filterable placeholder="选择通道标识" 
              @click.native="getChannel()" 
              :loading="channelLoading">
              <el-option
                v-for="item in channelOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getDataList()">查询</el-button>
            <el-button type="success" @click="getLists()">自动生成</el-button>
            <el-button type="primary" @click="forwardHandle()" :disabled="dataListSelections.length <= 0">转发</el-button>
          </el-form-item>
        </el-form>
        <el-table
          :max-height="ymtableHeight"
          :data="dataList"
          border
          v-loading="dataListLoading"
          @selection-change="selectionChangeHandle"
          style="width: 100%;"
          :row-style="tableRowStyle">
          <el-table-column type="selection" header-align="center" align="center" width="50">
          </el-table-column>
          <el-table-column type="index" header-align="center" align="center" width="50" label="序号"></el-table-column>
          <el-table-column
            prop="channelName"
            header-align="center"
            align="center"
            label="通道名称">
          </el-table-column>
          <el-table-column
            prop="equipName"
            header-align="center"
            align="center"
            label="设备名称">
          </el-table-column>
          <el-table-column
            prop="pointName"
            header-align="center"
            align="center"
            label="点位名称">
          </el-table-column>
          <el-table-column
            prop="ymAddress"
            header-align="center"
            align="center"
            label="遥脉地址">
          </el-table-column>
          <!-- <el-table-column
            prop="coeffcient"
            header-align="center"
            align="center"
            label="数据处理系数">
          </el-table-column>
          <el-table-column
            prop="scope"
            header-align="center"
            align="center"
            label="数据保存范围">
          </el-table-column>
          <el-table-column
            prop="isSave"
            header-align="center"
            align="center"
            label="是否入库（0：否：1：是）">
          </el-table-column>
          <el-table-column
            prop="stepSize"
            header-align="center"
            align="center"
            label="入库步长（秒）">
          </el-table-column> -->
          <el-table-column fixed="right" header-align="center" align="center" min-width="100" label="操作">
            <template slot-scope="scope">
              <el-button :plain="true" type="warning" size="mini" @click="addOrUpdateHandle(scope.row.ymId)">配置</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageIndex"
          :page-sizes="[10, 50, 100, 200, 300, 400, 500]" :page-size="pageSize" :total="totalPage" layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>
        <!-- 弹窗, 新增 / 修改 -->
        <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
      </el-col>
      <!-- 转发遥脉表格 -->
      <el-col :xl="13" :lg="13" class="tymrule-item ymsortable">
        <el-form :inline="true" :model="zfDataForm">
          <!-- <el-form-item>
            <el-select
              v-model="zfDataForm.sourChannelSelected" 
              filterable placeholder="选择源通道" 
              @click.native="getChannel()" 
              :loading="channelLoading">
              <el-option
                v-for="item in channelOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item>
            <el-select
              v-model="zfDataForm.channelSelected" 
              filterable clearable placeholder="选择转发通道" 
              @click.native="getZfChannel()" 
              :loading="channelLoading">
              <el-option
                v-for="item in zfChannelOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="zfGetDataList()">查询</el-button>
            <el-button v-if="isAuth(OPTAUTH_DELETE)" type="danger" @click="zfDeleteHandle()" :disabled="zfDataListSelections.length <= 0">批量删除</el-button>         
          </el-form-item>
        </el-form>
        <sortable-table
          :isauth='isAuth(OPTAUTH_DELETE)'
          :col="col"
          :tableData="zfTableData"
          v-loading="zfDataListLoading"
          v-on:zfDataListSelection="zfDataListSelection"
          v-on:sortNumbers="sortNumber"
          v-on:deleteId="zfDeleteHandle"
        >
        </sortable-table>
        <el-pagination
          @size-change="zfSizeChangeHandle"
          @current-change="zfCurrentChangeHandle"
          :current-page="zfPageIndex"
          :page-sizes="[10, 50, 100, 200, 300, 400, 500]"
          :page-size="zfPageSize"
          :total="zfTotalPage"
          layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import AddOrUpdate from './tymrule-add-or-update'
import SortableTable from '@/components/sortable-table'
export default {
  data () {
    return {
      // 遥脉
      ymtableHeight: '',
      dataForm: {
        channelSelected: ''
      },
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false,
      // 选择通道
      channelOptions: [],
      channelLoading: false,
      // 转发遥脉
      zfDataForm: {
        sourChannelSelected: '',
        channelSelected: ''
      },
      zfChannelOptions: [],
      zfChannelLoading: false,
      col: [
        {
          label: '设备名称',
          prop:'equipName',
          minWidth: '80'
        },
        {
          label: '点位名称',
          prop: 'pointName',
          minWidth: '80'
        },        
        {
          label: '转发遥信地址',
          prop: 'zfYmAddress',
          minWidth: '120'
        },
        {
          label: '源数据通道名称',
          prop: 'srcChannelName',
          minWidth: '120'
        },
        {
          label: '转发通道名称',
          prop: 'channelName',
          minWidth: '120'
        },
        {
          label: '源遥脉地址',
          prop: 'srcYmAddress',
          minWidth: '100'
        }
      ],
      zfTableData: [],
      zfDataListLoading: false,
      zfDataListSelections: [],  // 多选的数据
      zfPageIndex: 1,
      zfPageSize: 10,
      zfTotalPage: 0
    }    
  },
  components: {
    AddOrUpdate,
    SortableTable
  },
  created () {
    this.ymtableHeight = window.innerHeight - 320    
  },
  activated() {    
  },
  mounted () {
    // 初始化加载源通道和转发通道后再进行两个列表的查询
    Promise.all([this.getChannel(), this.getZfChannel()]).then((data)=> {
      this.getDataList()
      this.zfGetDataList()
    })
    document.getElementById('tymrule').style.height = (window.innerHeight - 170) + 'px'
    window.onresize = function () {
      if(document.getElementById('tymrule')){
        document.getElementById('tymrule').style.height = (window.innerHeight - 170) + 'px'
      }
    } 
  },
  methods: {
    // 遥脉表格 已转发数据行底色
    tableRowStyle (row) {
      if (row.row.isExist === "1") {
        return 'background: #f0f9eb'
      }
    },
    // 自动生成 遥脉通道必选 转发通道非必选
    getLists () {     
      if(this.dataForm.channelSelected !== '') {
        this.$http({
          url: this.$http.adornUrl('/base/tytrule/saveAuto'),
          method: 'post',
          data: this.$http.adornParams({
            'channelId': this.dataForm.channelSelected
          })
        }).then(({data}) => {
          if (data && data.msg === 'success') {
            this.getDataList()
          }
        })
      } else if(this.dataForm.channelSelected === '') {
        this.$message({
          message: '请选择通道',
          type: 'warning'
        })
      }
    },
    // 获取通道列表
    getChannel () {
      this.channelLoading = true
      let that = this 
      let p = new Promise(function(resolve, reject){             
        that.$http({
          url: that.$http.adornUrl('/base/tchannel/map/1'),
          method: 'post',
          data: that.$http.adornParams({})
        }).then(({data}) => {
          if (data && data.code === 0) {
            that.channelLoading = false
            that.channelOptions = data.lists
            if(that.dataForm.channelSelected === '') {
              that.dataForm.channelSelected = data.lists[0].value
            }
            resolve(data)             
          }
        })
      })
      return p
    },
    // 遥脉获取数据列表
    getDataList() {
      this.dataListLoading = true
      this.$http({
        url: this.$http.adornUrl('/base/tymrule/list'),
        method: 'post',
        data: this.$http.adornParams({
          'page': this.pageIndex.toString(),
          'limit': this.pageSize.toString(),
          'channelId': this.dataForm.channelSelected,
          'zfchannelId': this.zfDataForm.channelSelected
        })
      }).then(({
        data
      }) => {
        if (data && data.code === 0) {
          console.log(data)
          this.dataList = data.page.list
          this.totalPage = data.page.totalCount
          this.pageIndex = data.page.currPage
          this.pageSize = data.page.pageSize
        } else {
          this.dataList = []
          this.totalPage = 0
        }
        this.dataListLoading = false
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
    // 多选
    selectionChangeHandle(val) {
      this.dataListSelections = val
    },
    // 新增 / 修改
    addOrUpdateHandle(id) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id)          
      })
    },
    // 转发按钮
    forwardHandle () {
      if(this.zfDataForm.channelSelected === '') {
        this.$message({
          message: '请选择转发通道',
          type: 'warning',
          duration: 1500,
        })
      } else {
        let arr = [], ids = []
        this.dataListSelections.map(item => {
          if(item.isExist === '0') {
            let obj = {
              "channelId": this.zfDataForm.channelSelected,
              "srcChannelId": item.channelId,
              "srcYmAddress": item.ymAddress
            }
            arr.push(obj)
            ids.push(item.ymId)
          }          
        })  
        this.$confirm('确定对'+ ids +'进行转发操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log(ids)
          this.$http({
            url: this.$http.adornUrl('/base/tzfymrule/saveList'),
            method: 'post',
            data: this.$http.adornData(arr, false)
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.zfGetDataList()
                  // this.getDataList()
                  for(let i=0; i<this.dataList.length; i++) {
                    for(let j=0; j<this.dataListSelections.length; j++){
                      if(this.dataListSelections[j].ymAddress == this.dataList[i].ymAddress){
                        this.dataList[i].isExist = '1'
                      }
                    }
                  }
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        }).catch(() => {})
      }
      
    },
    // 获取转发通道列表
    getZfChannel () {
      this.zfChannelLoading = true
      let that = this 
      let p = new Promise(function(resolve, reject){             
        that.$http({
          url: that.$http.adornUrl('/base/tchannel/map/2'),
          method: 'post',
          data: that.$http.adornParams({})
        }).then(({data}) => { 
          if (data && data.code === 0) {
            that.zfChannelLoading = false
            that.zfChannelOptions = data.lists
            if(that.zfDataForm.channelSelected === '') {
              that.zfDataForm.channelSelected = data.lists[0].value
            }
            resolve(data)              
          }           
        })
      })
      return p     
    },
    // 转发获取数据列表
    zfGetDataList () {
      this.zfDataListLoading = true
      this.$http({
        url: this.$http.adornUrl('/base/tzfymrule/list'),
        method: 'post',
        data: this.$http.adornParams({
          'page': this.zfPageIndex.toString(),
          'limit': this.zfPageSize.toString(),
          // 'srcChannelId': this.zfDataForm.sourChannelSelected,
          'channelId': this.zfDataForm.channelSelected
        })
      }).then(({data}) => {
        if (data && data.code === 0) {
          this.zfTableData = data.page.list
          this.zfTotalPage = data.page.totalCount
          this.zfPageIndex = data.page.currPage
          this.zfPageSize = data.page.pageSize
          // this.getDataList()
        } else {
          this.zfTableData = []
          this.zfTotalPage  = 0
        }
        this.zfDataListLoading = false
      })
    },
    // 记录转发表多选数据
    zfDataListSelection (data) {
      this.zfDataListSelections = data     
    },
    // 排序数据
    sortNumber (data) {
      let currRowId = data.currRow.zfYmAddress ,
      arr = data.sortNumbers,
      nextOrPreviousId = null
      // 如果操作行上移 就取它新位置的下一行ID， 如果操作行下移 就取它新位置的上一行ID
      if (data.newIndex - data.oldIndex > 0 ) {
        nextOrPreviousId = arr[data.newIndex - 1].zfYmAddress       
      } else if (data.newIndex - data.oldIndex < 0 ) {
        nextOrPreviousId = arr[data.newIndex + 1].zfYmAddress 
      }     
      if (nextOrPreviousId != null) {
        console.log('移动行ID---'+ currRowId)
        console.log('落地行上/下一个ID---'+ nextOrPreviousId)
        this.$http({
          url: this.$http.adornUrl('/base/tzfytrule/insertionSort'),
          method: 'post',
          data: this.$http.adornData({
            "sourceId": currRowId,
            "infixId": nextOrPreviousId
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.zfGetDataList()
          }
        })
      } 
    },
    // 每页数
    zfSizeChangeHandle (val) {
      this.zfPageSize = val
      this.zfPageIndex = 1
      this.zfGetDataList()
    },
    // 当前页
    zfCurrentChangeHandle (val) {
      this.zfPageIndex = val
      this.zfGetDataList()
    },
    // 转发 删除
    zfDeleteHandle (val) {
      let id
      if(val) {
        id = val.zfYmAddress 
      }      
      var ids = id ? [id] : this.zfDataListSelections.map(item => {
        return item.zfYmAddress 
      })
      this.$confirm(`确定进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http({
          url: this.$http.adornUrl('/base/tzfymrule/delete'),
          method: 'post',
          data: this.$http.adornData(ids, false)
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.zfGetDataList()
                this.getDataList()
              }
            })
          } else {
            this.$message.error(data.msg)
          }
        })
      }).catch(() => {})
    }
  }
}
</script>
<style scoped>
.tymrule {
}
.tymrule-item {
  height: 100%;
  box-shadow: 5px 5px 7px #f0f0f0;
  padding-right: 10px;
}
.ym-form {
  /* height: 80px; */
}
.ymsortable {
  padding-left: 10px
}
/* .sortable >>> .el-form {
  text-align: right;
  margin-bottom: 20px;
  padding-right: 20px
} */
</style>

