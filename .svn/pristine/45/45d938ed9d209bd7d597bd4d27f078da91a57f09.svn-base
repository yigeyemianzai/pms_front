<template>
  <div class="comm-agreementsub" id="commAgreementSub">
    <el-form :inline="true" :model="secrchAgreementsubForm" @keyup.enter.native="getCommAgreementsubList()" class="device-form">
      <el-form-item class="device-form-item" >
        <el-cascader
          :options="organizationOptions"
          change-on-select
          v-model="secrchAgreementsubForm.orgSelectedOptions"
          placeholder="选择组织机构" 
        ></el-cascader>
      </el-form-item>
      <el-form-item class="device-form-item" >
        <el-select 
          v-model="secrchAgreementsubForm.channelSelectedOptions" 
          filterable clearable placeholder="选择通道标识" 
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
      <el-form-item class="device-form-item">
        <el-button type="primary" @click="getCommAgreementsubList('params')">查询</el-button>
        <el-button v-if="isAuth(OPTAUTH_ADD)" type="success" @click="addCommAgreementsub()">新增</el-button>
        <el-button v-if="isAuth(OPTAUTH_DELETE)" type="danger" @click="deleteCommAgreementsub()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :max-height="agreementsubTableHeight"
      :data="agreementsubDataList"
      border
      stripe
      :row-class-name="tableRowClassName"
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;">
      <el-table-column
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
      <!-- <el-table-column
        prop="ID"
        header-align="center"
        align="center"
        min-width="80"
        label="ID">
      </el-table-column> -->
      <el-table-column
        prop="channelName"
        header-align="center"
        align="center"
        min-width="120"
        label="通道名称">
      </el-table-column>
      <el-table-column
        prop="asdoAddress"
        header-align="center"
        align="center"
        min-width="120"
        label="公共地址">
      </el-table-column>
      <el-table-column
        prop="ycDataType"
        :formatter="changeYcDataType"
        header-align="center"
        align="center"
        min-width="120"
        label="遥测数据上送类型">
      </el-table-column>
      <el-table-column
        prop="yxStartAddr"
        header-align="center"
        align="center"
        min-width="120"
        label="遥信起始地址">
      </el-table-column>
      <el-table-column
        prop="ycStartAddr"
        header-align="center"
        align="center"
        min-width="120"
        label="遥测起始地址">
      </el-table-column>
      <el-table-column
        prop="ykStartAddr"
        header-align="center"
        align="center"
        min-width="120"
        label="遥控起始地址">
      </el-table-column>
      <el-table-column
        prop="ytStartAddr"
        header-align="center"
        align="center"
        min-width="120"
        label="遥调起始地址">
      </el-table-column>
      <el-table-column
        prop="ymStartAddr"
        header-align="center"
        align="center"
        min-width="120"
        label="遥脉起始地址">
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button v-if="isAuth(OPTAUTH_UPDATE)" :plain="true" type="warning" size="mini" @click="addCommAgreementsub(scope.row)">修改</el-button>
          <el-button v-if="isAuth(OPTAUTH_DELETE)" :plain="true" type="danger" size="mini" @click="deleteCommAgreementsub(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <!-- 弹窗, 新增 / 修改 -->
    <el-dialog
      :title="dialogTitle == undefined ? '新  增' : '修  改'"
      :close-on-click-modal="false"
      :visible.sync="addOrUpdateVisible"
      center="center">
      <el-form :model="setAgreementsubdataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px" class="set-device-form" :rules="agreementsubdataFormSetRule" ref="setAgreementsubdataForm">
        <el-form-item class="set-device-form-item" label="组织机构" prop="setOrganizationOptions">
          <el-cascader
            :options="organizationOptions"
            change-on-select
            v-model="setAgreementsubdataForm.setOrganizationOptions"
            :disabled="isDisabled"
          ></el-cascader>
        </el-form-item>
        <el-form-item class="set-device-form-item" prop="channelId" label="通道标识">
          <el-select v-model="setAgreementsubdataForm.channelId" @click.native="getChannel()">
            <el-option
              v-for="item in channelOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="set-device-form-item" label="公共地址" prop="asdoAddress">
          <el-input v-model="setAgreementsubdataForm.asdoAddress" type="number" placeholder="请输入0~32767范围的值"></el-input>
        </el-form-item>
        <el-form-item class="set-device-form-item" label="遥测数据上送类型" prop="ycDataType">
            <el-radio v-model="setAgreementsubdataForm.ycDataType" label="0">浮点值</el-radio>
            <el-radio v-model="setAgreementsubdataForm.ycDataType" label="1">归一化值</el-radio>
          <!-- <el-select v-model="setAgreementsubdataForm.ycDataType">
            <el-option
              v-for="item in ycDataTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select> -->
        </el-form-item>
        <el-form-item class="set-device-form-item" label="遥信起始地址" prop="yxStartAddr">
          <el-input v-model="setAgreementsubdataForm.yxStartAddr" type="number" placeholder="请输入0~32767范围的值"></el-input>
        </el-form-item>
        <el-form-item class="set-device-form-item" label="遥测起始地址" prop="ycStartAddr">
          <el-input v-model="setAgreementsubdataForm.ycStartAddr" type="number" placeholder="请输入0~32767范围的值"></el-input>
        </el-form-item>
        <el-form-item class="set-device-form-item" label="遥控起始地址" prop="ykStartAddr">
          <el-input v-model="setAgreementsubdataForm.ykStartAddr" type="number" placeholder="请输入0~32767范围的值"></el-input>
        </el-form-item>
        <el-form-item class="set-device-form-item" label="遥调起始地址" prop="ytStartAddr">
          <el-input v-model="setAgreementsubdataForm.ytStartAddr" type="number" placeholder="请输入0~32767范围的值"></el-input>
        </el-form-item>
        <el-form-item class="set-device-form-item" label="遥脉起始地址" prop="ymStartAddr">
          <el-input v-model="setAgreementsubdataForm.ymStartAddr" type="number" placeholder="请输入0~32767范围的值"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addOrUpdateVisible = false">取消</el-button>
        <el-button type="primary" @click="dataFormSubmit(setAgreementsubdataForm)">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    var validateAddress = (rule, value, callback) => {
      if (value > 32767 || value < 0) {
        callback(new Error('地址超出0~32767范围'))
      } else {
        callback()
      }
    }
    return {
      isDisabled: true,
      // 表格高度
      agreementsubTableHeight: '',
      // 五遥 下拉框
      yxStartAddrOptions: [],
      ycStartAddrOptions: [],
      ykStartAddrOptions: [],
      ytStartAddrOptions: [],
      ymStartAddrOptions: [],
      // 公共地址下拉框
      asdoAddressOptions: [],
      // 遥测数据上送类型下拉框（0：浮点值，1：归一化值）
      /* ycDataTypeOptions: [{
          value: '0',
          label: '浮点值'
        },{
          value: '1',
          label: '归一化值'
        }], */
      // 增加、修改页面表单
      setAgreementsubdataForm: {
        setOrganizationOptions: [],
        channelId: '',
        asdoAddress: '',
        ycDataType: '',
        yxStartAddr: '',
        ycStartAddr: '',
        ykStartAddr: '',
        ytStartAddr: '',
        ymStartAddr: '',
      },
      agreementsubdataFormSetRule: {
        setOrganizationOptions: [{ required: true,message: '组织机构不能为空',trigger: 'blur' }],
        channelId: [{ required: true,message: '通道标识不能为空',trigger: 'blur' }],
        ycDataType: [{ required: true,message: '遥测数据上送类型不能为空',trigger: 'blur' }],
        asdoAddress: [{ required: true,message: '公共地址不能为空',trigger: 'blur' },{ validator: validateAddress, trigger: 'blur' }],
        yxStartAddr: [{ required: true,message: '遥信起始地址不能为空',trigger: 'blur' },{ validator: validateAddress, trigger: 'blur' }],
        ycStartAddr: [{ required: true,message: '遥测起始地址不能为空',trigger: 'blur' },{ validator: validateAddress, trigger: 'blur' }],
        ykStartAddr: [{ required: true,message: '遥控起始地址不能为空',trigger: 'blur' },{ validator: validateAddress, trigger: 'blur' }],
        ytStartAddr: [{ required: true,message: '遥调起始地址不能为空',trigger: 'blur' },{ validator: validateAddress, trigger: 'blur' }],
        ymStartAddr: [{ required: true,message: '遥脉起始地址不能为空',trigger: 'blur' },{ validator: validateAddress, trigger: 'blur' }],
      },
      // 区分是新增还是修改页面
      dialogTitle: '',
      // 搜索表单 分别为已选组织机构、已选通道标识
      secrchAgreementsubForm: {
        orgSelectedOptions: [],
        channelSelectedOptions: ''
      },
      // 组织机构列表
      organizationOptions: [],
      // 通道标识列表
      channelOptions: [],
      // 表格数据
      agreementsubDataList: [],
      // 当前页
      pageIndex: 1,
      // 分页大小
      pageSize: 10,
      // 总记录数
      totalPage: 2,
      // 多选数组
      dataListSelections: [],
      addOrUpdateVisible: false,
      dataListLoading: false,
      channelLoading: false
    }
  },
  created () {
    this.agreementsubTableHeight = window.innerHeight-320    
  },
  mounted () {
    this.getOrgLists()
    this.getCommAgreementsubList()
    // document.getElementById('commAgreementSub').style.height = (window.innerHeight-170)+'px'
    window.onresize = function () {
      if(document.getElementById('commAgreementSub')){
        // document.getElementById('commAgreementSub').style.height = (window.innerHeight - 170) + 'px'
        this.agreementsubTableHeight = window.innerHeight-320
      }
    }   
  },
  methods: {
    // 提交修改配置页面信息
    dataFormSubmit (setAgreementsubdataForm) {
      console.log(setAgreementsubdataForm)
      this.$refs['setAgreementsubdataForm'].validate((valid) => {
        if (valid) {
          this.$confirm(`确定提交?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$http({
              url: this.$http.adornUrl(`/admin/tprotocol104slave/${this.dialogTitle == undefined ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                "id" : this.dialogTitle == undefined ? null : this.dialogTitle,
                "channelId": setAgreementsubdataForm.channelId,
                "asdoAddress": setAgreementsubdataForm.asdoAddress,
                "ycDataType": setAgreementsubdataForm.ycDataType,
                "yxStartAddr": setAgreementsubdataForm.yxStartAddr,
                "ycStartAddr": setAgreementsubdataForm.ycStartAddr,
                "ykStartAddr": setAgreementsubdataForm.ykStartAddr,
                "ytStartAddr": setAgreementsubdataForm.ytStartAddr,
                "ymStartAddr": setAgreementsubdataForm.ymStartAddr
              })
            }).then(({data}) => {
              if(data && data.code === 0) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.addOrUpdateVisible = false
                    if(this.dialogTitle == undefined) {
                      this.agreementsubDataList.unshift(data.entity)
                    } else {
                      for(let i=0;i<this.agreementsubDataList.length;i++){
                        if(this.agreementsubDataList[i].id == data.entity.id) {
                          this.agreementsubDataList[i].orgId = data.entity.orgId
                          this.agreementsubDataList[i].asdoAddress = data.entity.asdoAddress
                          this.agreementsubDataList[i].channelId = data.entity.channelId
                          this.agreementsubDataList[i].channelName = data.entity.channelName
                          this.agreementsubDataList[i].id = data.entity.id
                          this.agreementsubDataList[i].ycDataType = data.entity.ycDataType
                          this.agreementsubDataList[i].ycStartAddr = data.entity.ycStartAddr
                          this.agreementsubDataList[i].ykStartAddr = data.entity.ykStartAddr
                          this.agreementsubDataList[i].ymStartAddr = data.entity.ymStartAddr
                          this.agreementsubDataList[i].ytStartAddr = data.entity.ytStartAddr
                          this.agreementsubDataList[i].yxStartAddr = data.entity.yxStartAddr
                        }
                      }
                    }
                    // this.$refs['setAgreementsubdataForm'].resetFields()
                    // this.$options.methods.getCommAgreementsubList.bind(this)()
                  }
                })                
              } else {
                this.$message.error(data.msg)
              }
            })
            
          })
        } else {
          console.log('error submit!!')
          return false;
        }
      })    
    },
    // 获取组织机构数据
    getOrgLists () {
      this.$http({
        url: this.$http.adornUrl('/admin/tstation/org'),
        method: 'post',
        data: this.$http.adornParams({})
      }).then(({data}) => {
        if (data && data.code === 0) {
          this.organizationOptions = data.list
          if(this.secrchAgreementsubForm.orgSelectedOptions.length == 0) {
            this.secrchAgreementsubForm.orgSelectedOptions = JSON.parse(window.sessionStorage.getItem('userInfo')).orgId.split() 
          }                        
        }
      })      
    },
    // 获取通道标识
    getChannel () {
      let orgId = this.addOrUpdateVisible ? this.setAgreementsubdataForm.setOrganizationOptions[this.setAgreementsubdataForm.setOrganizationOptions.length - 1] : this.secrchAgreementsubForm.orgSelectedOptions[this.secrchAgreementsubForm.orgSelectedOptions.length - 1]
      this.channelLoading = true             
      this.$http({
        url: this.$http.adornUrl('/admin/tprotocolredismaster/channel'),
        method: 'post',
        data: this.$http.adornParams({
          orgId: orgId
        })
      }).then(({data}) => {
        if (data && data.code === 0) {
          this.channelLoading = false
          this.channelOptions = data.list                    
        }
      }) 
    },
    // 获取数据列表
    getCommAgreementsubList (params) {
      if(params){
          this.pageIndex=1
        }
      this.dataListLoading = true
      this.$http({
        url: this.$http.adornUrl('/admin/tprotocol104slave/list'),
        method: 'post',
        data: this.$http.adornParams({
          'page': this.pageIndex.toString(),
          'limit': this.pageSize.toString(),
          'orgId': this.secrchAgreementsubForm.orgSelectedOptions.length == 0 ? JSON.parse(window.sessionStorage.getItem('userInfo')).orgId : this.secrchAgreementsubForm.orgSelectedOptions[this.secrchAgreementsubForm.orgSelectedOptions.length -1],
          'channelId': this.secrchAgreementsubForm.channelSelectedOptions
        })
      }).then(({data}) => {
        if (data && data.code === 0) {
          this.agreementsubDataList = data.page.list
          this.totalPage = data.page.totalCount
          this.pageIndex = data.page.currPage
          this.pageSize = data.page.pageSize

        } else {
          this.agreementsubDataList = []
          this.totalPage = 0
        }
        this.dataListLoading = false
      })
    },
    // 每页数
    sizeChangeHandle (val) {
      this.pageSize = val
      this.pageIndex = 1
      this.$options.methods.getCommAgreementsubList.bind(this)()
    },
    // 当前页
    currentChangeHandle (val) {
      this.pageIndex = val
      this.$options.methods.getCommAgreementsubList.bind(this)()
    },
    // 多选
    selectionChangeHandle (val) {
      this.dataListSelections = val
    },
    // 新增 / 修改
    addCommAgreementsub (row) {
      this.addOrUpdateVisible = true
      this.$nextTick(function () {
        this.$refs['setAgreementsubdataForm'].resetFields()
      })
      // 修改则把改行信息传入 增加则没有
      if(row) {
        this.isDisabled = true
        this.$options.methods.getChannel.bind(this)()
        this.$http({
          url: this.$http.adornUrl('/admin/tstation/orgName'),
          method: 'post',
          data: this.$http.adornData({
            orgId: row.orgId
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.setAgreementsubdataForm.setOrganizationOptions = data.list
          }else {
            this.setAgreementsubdataForm.setOrganizationOptions = []
          }
        })
        this.$nextTick(function () {
          // this.setAgreementsubdataForm.setOrganizationOptions = this.secrchAgreementsubForm.orgSelectedOptions
          this.dialogTitle = row.id
          this.setAgreementsubdataForm.channelId = row.channelId.toString()
          this.setAgreementsubdataForm.asdoAddress = row.asdoAddress.toString()
          this.setAgreementsubdataForm.ycDataType = row.ycDataType.toString()
          this.setAgreementsubdataForm.yxStartAddr = row.yxStartAddr.toString()
          this.setAgreementsubdataForm.ycStartAddr = row.ycStartAddr.toString()
          this.setAgreementsubdataForm.ykStartAddr = row.ykStartAddr.toString()
          this.setAgreementsubdataForm.ytStartAddr = row.ytStartAddr.toString()
          this.setAgreementsubdataForm.ymStartAddr = row.ymStartAddr.toString()
        })        
      }else {
        this.dialogTitle = row
        this.isDisabled = false
      }
    },
    // 删除
    deleteCommAgreementsub (id) {
      var channelId = id ? [id] : this.dataListSelections.map(item => {
        return item.id
      })
      this.$confirm('确定删除操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http({
          url: this.$http.adornUrl('/admin/tprotocol104slave/delete'),
          method: 'post',
          data: this.$http.adornData(channelId, false)
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.getCommAgreementsubList()
              }
            })
          } else {
            this.$message.error(data.msg)
          }
        })
      }).catch(() => {})
    },
    // 遥测数据上送类型（0：浮点值，1：归一化值）
    changeYcDataType (cellValue) {
      if(cellValue.ycDataType === 0){
        return '浮点值'
      }else if(cellValue.ycDataType === 1){
        return '归一化值'
      }else {
        return '-'
      }
    }
  }
}
</script>
<style scoped>
/* 搜索条件栏样式开始 */
.device-form {
  background-color: #eef4fa;
  border-radius: 5px 5px 0 0 ;
  /* margin-bottom: 10px; */
  height: 80px;
  width: 100%;
  padding: 0 10px 0 10px;
  display: flex;
  align-items: center;
  text-align: justify
}
.device-form-item {
  margin-bottom: 0;
  /* flex: 1 */
}
.device-form-item a, .set-device-form-item a {
  font-weight: 600;
  font-size: 15px
}
/* 搜索条件栏样式结束 */

/* 表格样式开始 */

/* 表格样式结束 */

/* 增加修改配置页面样式开始 */
/* .comm-agreementsub >>> .el-dialog {
  height: 70%;
}
.comm-agreementsub >>> .el-dialog .el-dialog__body {
  height: 80%;
} */
.set-device-form {
  background-color: #eef4fa;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px 0 0 1%;
  /* height: 100%;
  overflow-y: auto */
}
.set-device-form-item >>> .el-form-item__content {
  width: 50%;
  display: flex;
  flex-direction: row;
}
.set-device-form-item >>> .el-form-item__label {
  min-width: 180px
}
/* .set-device-form-item a {
  flex: 1;
  min-width: 150px;
  text-decoration: none
} */
.set-device-form-item >>> .el-select, .set-device-form-item >>> .el-cascader, .set-device-form-item >>> .el-input{
  flex: 3
}
.set-device-form-item >>> .el-radio {
  flex: 2;
  justify-content: center;
  display: flex;
  align-items: center;
}
.set-device-form-item >>> label + .el-form-item__content {
  padding-top: 1%
}
/* 增加修改配置页面样式结束 */
</style>
