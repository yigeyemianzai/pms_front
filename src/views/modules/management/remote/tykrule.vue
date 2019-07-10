<template>
  <div class="protocolforwarding" id="protocolForwarding">
    <!-- 左侧 -->
    <div class="protocolforwarding-left">
      <!-- 左侧上方选框-->
      <div class="protocolforwarding-left-top">
        <el-form :model="protocolforwardDataForm" class="scada-select">
          <el-form-item>
              <el-select
                v-model="protocolforwardDataForm.scada" 
                filterable placeholder="scada">
                <el-option
                  v-for="item in scadaOptions" 
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
        </el-form>
      </div>
      <!-- 左侧下方表格 -->
      <div class="protocolforwarding-left-bottom">
        <el-table
          :header-cell-style="{background:'#edeef0',color:'#000',fontSize:'14px'}"
          :cell-class-name="cellStyle"
          @cell-click="clickedDevice"
          :data='deviceTableData'
          v-loading="deviceTableDataListLoading"
          @selection-change="selectionChangeHandle">
          <!-- <el-table-column
            fixed="left"
            type="selection"
            header-align="center"
            align="center"
            width="50">
          </el-table-column> -->
          <el-table-column
            prop="label"
            header-align="center"
            align="center"
            label="设备名称">
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 右侧 -->
    <div class="protocolforwarding-right">
      <!-- 右侧上方tab -->
      <div class="protocolforwarding-right-tabs">
        <template>
          <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="遥信" name="1"></el-tab-pane>
            <el-tab-pane label="遥测" name="2"></el-tab-pane>
            <el-tab-pane label="遥控" name="3"></el-tab-pane>
            <el-tab-pane label="遥调" name="4"></el-tab-pane>
            <el-tab-pane label="遥脉" name="5"></el-tab-pane>
          </el-tabs>
        </template>
        <div style="flex:1;border-bottom:1px solid #ccc"></div>
      </div>
      <!-- 右侧下方表格 -->
      <div class="protocolforwarding-right-tables" id="ptables">
        <!-- 右侧下方表格 左 -->
        <div class="protocolforwarding-right-lefttable">
          <div class="zfbtn">
            <el-button style="background-color:#31a0f9;border:none;color:#fff;font-weight:700" :disabled="zftableSelections.length <= 0" @click="zfbtn()">转发</el-button>     
          </div>
          <div class="zftable">
            <el-table
              :max-height="zftableHeight"             
              v-loading='zfTbaleLoad'
              :header-cell-style="{background:'#edeef0',color:'#000',fontSize:'14px'}"
              :data="zfDataList"
              border
              @selection-change="zftableSelectionChangeHandle"
              style="width: 100%;">
              <el-table-column
                :selectable="selectable"
                fixed="left"
                type="selection"
                header-align="center"
                align="center"
                width="50">
              </el-table-column>
              <el-table-column
                type="index"
                header-align="center"
                align="center"
                width="80"
                label="序号">
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
                :prop="yAddress"
                header-align="center"
                align="center"
                label="点号">
              </el-table-column>
            </el-table>
            <el-pagination
              @size-change="sizeChangeHandle"
              @current-change="currentChangeHandle"
              :current-page="pageIndex"
              :page-sizes="[100, 500, 1000, 5000]"
              :page-size="pageSize"
              :total="totalPage"
              layout="total, sizes, prev, pager, next, jumper">
            </el-pagination>
          </div>
        </div>
        <!-- 右侧下方表格 右 -->
        <div class="protocolforwarding-right-righttable">
          <div class="zfdevice">
            <el-select
              v-model="forwardingEquipment"
              placeholder="转发通信设备"
              @click.native="getForwardingEquipmentOptions()">
              <el-option
                v-for="item in forwardingEquipmentOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"></el-option>
            </el-select>
            <el-button type="danger" style="margin-left:20px" :disabled="zfdtableSelections.length <= 0" @click="deleteZfDevice()">删除</el-button>
          </div>
          <div class="zfdtable">
            <el-table
              :max-height="zfdtableHeight"
              v-loading='zfdtableLoad'
              :header-cell-style="{background:'#edeef0',color:'#000',fontSize:'14px'}"
              :data="zfDevDataList"
              border
              @selection-change="zfdtableSelectionChangeHandle"
              style="width: 100%;">
              <el-table-column
                fixed="left"
                type="selection"
                header-align="center"
                align="center"
                width="50">
              </el-table-column>
              <el-table-column
                type="index"
                header-align="center"
                align="center"
                width="80"
                label="序号">
              </el-table-column>
              <el-table-column
                :prop="zfAddress"
                header-align="center"
                align="center"
                label="转发点号">
              </el-table-column>
              <el-table-column
                prop="srcCommEquipName"
                header-align="center"
                align="center"
                label="源通信设备名称">
              </el-table-column>
              <el-table-column
                :prop="srcAddress"
                header-align="center"
                align="center"
                label="源点号">
              </el-table-column>
            </el-table>
            <el-pagination
              @size-change="zfSizeChangeHandle"
              @current-change="zfCurrentChangeHandle"
              :current-page="zfPageIndex"
              :page-sizes="[100, 500, 1000, 5000]"
              :page-size="zfPageSize"
              :total="zfTotalPage"
              layout="total, sizes, prev, pager, next, jumper">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/**
 * 
 */
export default {
  data () {
    return {
      // 左侧上方查询表单
      protocolforwardDataForm: {
        scada: null
      },
      scadaOptions: [],
      // 左侧下方 表格
      deviceTableDataListLoading: false,
      deviceTableData: [],
      deviceTableDataListSelections: [],
      clickedCell: null,  // 设备表格点击单元格ID
      // 右侧tab栏
      activeName: '1',
      // 右侧下方表格 左
      zftableHeight: '',
      zfDataList: [],
      zftableSelections: [],
      zfTbaleLoad: false,
      pageIndex: 1,
      pageSize: 100,
      totalPage: 0,
      yAddress: null,  // 点号字段名
      // 右侧下方表格 右
      zfdtableHeight: '',
      zfdtableLoad: false,
      forwardingEquipment: null, // 转发通信设备下拉框选择值
      forwardingEquipmentOptions: [],  // 转发通信设备下拉框选项
      zfDevDataList: [],
      zfPageIndex: 1,
      zfPageSize: 100,
      zfTotalPage: 0,
      zfdtableSelections: [],
      zfAddress: null,  // 转发点号字段名
      srcAddress: null  // 源点号字段名
    }
  },
  created () {
    this.zftableHeight = window.innerHeight - 400
    this.zfdtableHeight = window.innerHeight - 400
  },
  mounted () {
    // this.getScacdList()
    Promise.all([this.getScacdList()]).then((data) => {
      Promise.all([this.getDeviceTableData(),this.getForwardingEquipmentOptions()]).then((data) => {
        console.log(data)
        this.getZfDataList()
      })
    })
    document.getElementById('protocolForwarding').style.height = (window.innerHeight-170)+'px'
    document.getElementById('ptables').style.height = (window.innerHeight-220)+'px'
    window.onresize = function () {
      if(document.getElementById('protocolForwarding')){
        this.zftableHeight = window.innerHeight - 400
        this.zfdtableHeight = window.innerHeight - 400
      }
    }
  },
  watch: {
    // 监听scada 选框改变
    'protocolforwardDataForm.scada': function () {
      this.getDeviceTableData()
    },
    // 监听转发通信设备下拉框值
    'forwardingEquipment': function () {
      this.getZfDevDataList(1)
    }
  },
  methods: {
    // 获取scasd 数据
    getScacdList () {
      let p = new Promise((resolve, reject) => {
        this.$http({
          url: this.$http.adornUrl('/admin/tprotocol/scadaNo'),
          method: 'post',
          data: this.$http.adornParams({
            'orgId': JSON.parse(window.sessionStorage.getItem('userInfo')).orgId
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.scadaOptions = data.data
            this.protocolforwardDataForm.scada = data.data[0].value
          }
          resolve(data)
        })
      })
      return p
    },
    // 左侧下方表格 数据获取
    getDeviceTableData () {
      // console.log(this.protocolforwardDataForm.scada)
      let p = new Promise((resolve, reject) => {
        this.deviceTableDataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/admin/tprotocol/commEquipByScadaNo'),
          method: 'post',
          data: this.$http.adornParams({
            'scadaNo': this.protocolforwardDataForm.scada,
            'model': '1'
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.deviceTableData= data.data
            if(this.clickedCell == null) {
              this.clickedCell = data.data[0].value
            }
          }
          this.deviceTableDataListLoading = false
          resolve(data)
        })
      })
      return p
    },
    // 左侧下方表格 多选
    selectionChangeHandle (val) {
      this.deviceTableDataListSelections = val
    },
    // 左侧下方表格 单元格点击事件
    clickedDevice (row, column, cell, event) {
      // console.log(row, column, cell, event)
      // console.log(this.activeName)
      // console.log(row.value)
      this.clickedCell = row.value
      if(this.activeName != null && this.activeName != 0) {
        this.getZfDataList ()
        this.getZfDevDataList ()
      } else {
        this.$message({
          message: '请选择规约类型',
          type: 'warning',
          duration: 1500,
          onClose: () => {}
        }) 
      }      
    },
    // 左侧下方表格 单元格点击样式
    cellStyle ({row, column, rowIndex, columnIndex}) {
      if(row.value == this.clickedCell) {
        return 'click-cell'
      }
    },
    // 右侧 tab栏
    handleClick(tab, event) {
      if(this.clickedCell != null) {
        this.deviceTableDataListSelections = []
        this.zfDataList = []
        this.zfDevDataList = []
        this.getZfDataList(1)
        this.getZfDevDataList(1)
      } else {
        this.$message({
          message: '请选择通讯设备',
          type: 'warning',
          duration: 1500,
          onClose: () => {}
        }) 
      }
    },
    // 右侧下方表格数据获取 左
    getZfDataList (pageIndex) {
      if(pageIndex) {
        this.pageIndex = pageIndex
      }
      // console.log(this.activeName)
      // console.log(this.clickedCell)
      this.zfTbaleLoad = true
      let url = null
      if(this.activeName == 1) {
        url = '/admin/tyxrule/zflist'
        this.yAddress = 'yxAddress'
      } else if(this.activeName == 2) {
        url = '/admin/tycrule/zflist'
        this.yAddress = 'ycAddress'
      } else if(this.activeName == 3) {
        url = '/admin/tykrule/zflist'
        this.yAddress = 'ykAddress'
      } else if(this.activeName == 4) {
        url = '/admin/tytrule/zflist'
        this.yAddress = 'ytAddress'
      } else if(this.activeName == 5) {
        url = '/admin/tymrule/zflist'
        this.yAddress = 'ymAddress'
      }
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData({
          'commId': this.clickedCell.toString(),
          'zfCommId': this.forwardingEquipment,
          'pageNumber': this.pageIndex.toString(),
          'pageSize': this.pageSize.toString()
        })
      }).then(({data}) => {
        if (data && data.code === 0) {
          this.zfDataList= data.page.list
          this.totalPage = data.page.total
          this.pageIndex = data.page.pageNum
          this.pageSize = data.page.pageSize 
        }
        this.zfTbaleLoad = false
      })
    },
    zftableSelectionChangeHandle (val) {
      this.zftableSelections= val
    },
    // 判断是否可选
    selectable (row, index) {
      return row.flag
    },
    // 每页数
    sizeChangeHandle (val) {
      this.pageSize = val
      this.pageIndex = 1
      this.$options.methods.getZfDataList.bind(this)()
    },
    // 当前页
    currentChangeHandle (val) {
      this.pageIndex = val
      this.$options.methods.getZfDataList.bind(this)()
    },
    // 转发按钮 
    zfbtn () {
      // console.log(this.zftableSelections)
      this.$confirm('确定转发操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if(this.forwardingEquipment == null) {
          this.$message({
            message: '请选择转发通信设备',
            type: 'warning',
          })
        } else {
          let zfarr = []
          if(this.activeName == 1) {
            zfarr = this.zftableSelections.map(item => {
              return item.yxAddress
            })
          } else if(this.activeName == 2) {
            zfarr = this.zftableSelections.map(item => {
              return item.ycAddress
            })
          } else if(this.activeName == 3) {
            zfarr = this.zftableSelections.map(item => {
              return item.ykAddress
            })
          } else if(this.activeName == 4) {
            zfarr = this.zftableSelections.map(item => {
              return item.ytAddress
            })
          } else if(this.activeName == 5) {
            zfarr = this.zftableSelections.map(item => {
              return item.ymAddress
            })
          }        
          this.$http({
            url: this.$http.adornUrl('/admin/tprotocol/zfRule'),
            method: 'post',
            data: this.$http.adornData({
              'pointType': this.activeName,
              'srcCommId':  this.clickedCell.toString(), // 左边所选通信设备的标识
              'zfCommId':  this.forwardingEquipment.toString(),// 上边下拉框所选通信设备的标识
              'address': zfarr  // 所勾选的五遥信息的点号集合[1,2,3...]
            })
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.$options.methods.getZfDevDataList.bind(this)()
              this.$options.methods.getZfDataList.bind(this)()
            }
          })
        }  
      })
          
    },
    // 获取转发通信设备下拉数据
    getForwardingEquipmentOptions () {
      if(this.protocolforwardDataForm.scada == null) {
        this.$message({
          message: '请选择scada',
          type: 'warning'
        })
      } else {
        let p = new Promise((resolve, reject) => {
          this.$http({
            url: this.$http.adornUrl('/admin/tprotocol/commEquipByScadaNo'),
            method: 'post',
            data: this.$http.adornParams({
              'scadaNo': this.protocolforwardDataForm.scada,
              'model': '2'
            })
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.forwardingEquipmentOptions = data.data
              if(this.forwardingEquipment == null && data.data.length > 0 ) {
                this.forwardingEquipment = data.data[0].value
              }
            }
            resolve(data)
          })
        })
        return p
      }     
    },
    // 右侧下方表格数据获取 右
    getZfDevDataList (pageIndex) {
      if(pageIndex) {
        this.zfPageIndex = 1
      }
      let url = null
      if(this.activeName == 1) {
        url = '/admin/tzfyxrule/list'
        this.zfAddress = 'zfYxAddress'
        this.srcAddress = 'srcYxAddress'
      } else if(this.activeName == 2) {
        url = '/admin/tzfycrule/list'
        this.zfAddress = 'zfYcAddress'
        this.srcAddress = 'srcYcAddress'
      } else if(this.activeName == 3) {
        url = '/admin/tzfykrule/list'
        this.zfAddress = 'zfYkAddress'
        this.srcAddress = 'srcYkAddress'
      } else if(this.activeName == 4) {
        url = '/admin/tzfytrule/list'
        this.zfAddress = 'zfYtAddress'
        this.srcAddress = 'srcYtAddress'
      } else if(this.activeName == 5) {
        url = '/admin/tzfymrule/list'
        this.zfAddress = 'zfYmAddress'
        this.srcAddress = 'srcYmAddress'
      }
      this.zfdtableLoad = true
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData({
          'srcCommId': this.clickedCell,
          'zfCommId': this.forwardingEquipment,
          'pageNumber': this.zfPageIndex.toString(),
          'pageSize': this.zfPageSize.toString()
        })
      }).then(({data}) => {
        if (data && data.code === 0) {
          this.zfDevDataList= data.page.list
          this.zfTotalPage = data.page.total
          this.zfPageIndex = data.page.pageNum
          this.zfPageSize = data.page.pageSize 
        }
        this.zfdtableLoad = false
      })
    },
    // 右侧表格 每页数
    zfSizeChangeHandle (val) {
      this.zfPageSize = val
      this.zfPageIndex = 1
      this.$options.methods.getZfDevDataList.bind(this)()
    },
    // 右侧表格 当前页
    zfCurrentChangeHandle (val) {
      this.zfPageIndex = val
      this.$options.methods.getZfDevDataList.bind(this)()
    },
    zfdtableSelectionChangeHandle (val) {
      this.zfdtableSelections = val
    },
    // 删除按钮
    deleteZfDevice () {
      console.log(this.zfdtableSelections)
      this.$confirm('确定删除操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let url = null, equipArr = []
        if(this.activeName == 1) {
          equipArr = this.zfdtableSelections.map(item => {
            return item.zfYxId
          })
          url = '/admin/tzfyxrule/delete' 
        } else if(this.activeName == 2) {
          equipArr = this.zfdtableSelections.map(item => {
            return item.zfYcId
          })
          url = '/admin/tzfycrule/delete'
        } else if(this.activeName == 3) {
          equipArr = this.zfdtableSelections.map(item => {
            return item.zfYkId
          })
          url = '/admin/tzfykrule/delete'
        } else if(this.activeName == 4) {
          equipArr = this.zfdtableSelections.map(item => {
            return item.zfYtId
          })
          url = '/admin/tzfytrule/delete'
        } else if(this.activeName == 5) {
          equipArr = this.zfdtableSelections.map(item => {
            return item.zfYmId
          })
          url = '/admin/tzfymrule/delete'
        }
        this.$http({
          url: this.$http.adornUrl(url),
          method: 'post',
          data: this.$http.adornData(equipArr, false)
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.$options.methods.getZfDevDataList.bind(this)(1)
            this.$options.methods.getZfDataList.bind(this)(1)
          }
        })
      })      
    }
  }
}
</script>
<style scoped>
  .protocolforwarding {
    display: flex;
    border: 1px solid rgba(209,209,209, 31%);
    border-radius: 2px;
    box-shadow: -2px 2px 16px rgba(209,209,209, 91%)
  }
  /* 左侧部分样式开始 */
  /* 左侧部分样式结束 */
  .protocolforwarding-left {
    width: 11.49%;
    /* min-width: 300px; */
    height: 100%;
    border-right: 1px solid #ccc;
    display: flex;
    flex-direction: column
  }
  .protocolforwarding-left-top {
    height: 12%;
    /* min-height: 50px; */
    /* border-bottom: 1px solid #ccc; */
    display: flex;
    justify-content: center;
    align-items: center
  }
  .scada-select {
    width: 80%;
    height: 80%; 
    display: flex;
    justify-content: center;
    align-items: center   
  }
  .scada-select .el-form-item {
    margin-bottom: 0
  }
  /* 左侧下方表格样式 */
  .protocolforwarding-left-bottom {
    overflow: auto
  }
  .protocolforwarding >>> .el-table .click-cell {
    background-color: #f3f8fb;
    border-bottom-color: #c0dff4;
    color: #43ade9
  }
  .protocolforwarding >>> .el-table .cell {
    cursor: pointer
  }

  /* 右侧部分样式开始 */
  .protocolforwarding-right {
    flex: 1;
    overflow: hidden;
  }
  /* tab样式 */
  .protocolforwarding-right >>> .el-tabs__header {
    margin: 0
  }
  .protocolforwarding-right >>> .el-tabs--card>.el-tabs__header {
    border-bottom: none
  }
  .protocolforwarding-right >>> .el-tabs__nav-wrap {
    margin-bottom: 0
  }
  .protocolforwarding-right >>> .el-tabs__item.is-active {
    background: #fff ;
    border-top: 2px solid #3399fe;
    border-left: 2px solid #3399fe;
    border-right: 2px solid #3399fe;
    border-bottom: transparent !important;
    border-radius: 2px;
    color: #000;
    font-weight: 700
  }
  .protocolforwarding-right >>> .el-tabs--card>.el-tabs__header .el-tabs__item {
    border-bottom: 1px solid #ccc
  }
  .protocolforwarding-right-tabs {
    height:60px;
    display:flex;
    align-items:flex-end;
    /* border-bottom:1px solid #ccc */
  }

  .protocolforwarding-right-tables {
    display: flex
  }
  /* 左侧表格样式开始 */
  .protocolforwarding-right-lefttable {
    flex: 1;
    display: flex;
    flex-direction: column;
    border-right: 1px solid #ccc
  }
  .zfbtn, .zfdevice {
    height: 70px;
    border-bottom: 1px solid #ccc;
    align-items: center;
    justify-content: flex-end;
    display: flex;
  }
  .zfbtn {
    padding-right: 20px
  }
  .zfdevice  {
    justify-content: flex-start;
    padding-left: 20px
  }
  .zftable, .zfdtable {
    flex: 1;
    overflow: auto
  }
  /* 左侧表格样式结束 */


  /* 右侧表格样式开始 */
  .protocolforwarding-right-righttable {
    flex: 2;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  /* 右侧表格样式结束 */


  /* 右侧部分样式结束 */
</style>
