<template>
  <div class="rediussub" id="rediusSub">
    <el-form :inline="true" :model="secrchRediusSubForm" @keyup.enter.native="getRediusSubList()" class="device-form">
      <el-form-item class="device-form-item" >
        <el-cascader
          :options="organizationOptions"
          change-on-select
          v-model="secrchRediusSubForm.orgSelectedOptions"
          placeholder="选择组织机构" 
        ></el-cascader>
      </el-form-item>
      <el-form-item class="device-form-item" >
        <el-select 
          v-model="secrchRediusSubForm.channelSelectedOptions" 
          filterable clearable placeholder="选择通道标识" 
          @click.native="getChannel()" 
          :loading="agreementLoading">
          <el-option
            v-for="item in channelOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="device-form-item">
        <el-button type="primary" @click="getRediusSubList('params')">查询</el-button>
        <el-button v-if="isAuth(OPTAUTH_ADD)" type="success" @click="addRediusSub()">新增</el-button>
        <el-button v-if="isAuth(OPTAUTH_DELETE)" type="danger" @click="deleteRediusSub()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :max-height="rediusTableHeight"
      :data="rediusDataList"
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
        prop="id"
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
        prop="password"
        header-align="center"
        align="center"
        min-width="120"
        label="redis登陆密码">
      </el-table-column>
      <el-table-column
        prop="reportTime"
        header-align="center"
        align="center"
        min-width="120"
        label="全数据上报间隔（秒）">
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button v-if="isAuth(OPTAUTH_UPDATE)"  :plain="true" type="warning" size="mini" @click="addRediusSub(scope.row)">修改</el-button>
          <el-button v-if="isAuth(OPTAUTH_DELETE)"  :plain="true" type="danger" size="mini" @click="deleteRediusSub(scope.row.id)">删除</el-button>
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
      <el-form :model="setRediusSubDataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px" class="set-device-form" :rules="rediussunDataFormSetRule" ref="setRediusSubDataForm">
        <el-form-item class="set-device-form-item" label="组织机构" prop="setOrganizationOptions">
          <el-cascader
            :options="organizationOptions"
            change-on-select
            v-model="setRediusSubDataForm.setOrganizationOptions"
            :disabled="isDisabled"
          ></el-cascader>
        </el-form-item>
        <el-form-item class="set-device-form-item" prop="channelId" label="通道名称">
          <el-select v-model="setRediusSubDataForm.channelId" placeholder="请选择" @click.native="getChannel()">
            <el-option 
              v-for="item in channelOptions" 
              :key="item.value" 
              :label="item.label"
              :value="item.value"
              >
            </el-option>
          </el-select>
          <!-- <el-input
            placeholder="请输入内容"
            v-model="setRediusSubDataForm.channelId"
            clearable>
          </el-input> -->
        </el-form-item>
        <el-form-item class="set-device-form-item" label="redis登陆密码" prop="password">
          <el-input
            placeholder="请输入密码"
            v-model="setRediusSubDataForm.password"
            type="password"
            clearable>
          </el-input>
        </el-form-item>
        <el-form-item class="set-device-form-item" label="再次输入登陆密码" prop="passwordtoo">
          <el-input
            placeholder="请输入密码"
            v-model="setRediusSubDataForm.passwordtoo"
            type="password"
            clearable>
          </el-input>
        </el-form-item>
        <el-form-item class="set-device-form-item" label="全数据上报间隔（秒）" prop="reportTime">
          <el-input-number v-model="setRediusSubDataForm.reportTime" :step="1" :min="1"></el-input-number>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addOrUpdateVisible = false">取消</el-button>
        <el-button type="primary" @click="dataFormSubmit(setRediusSubDataForm)">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    var validateConfirmPassword = (rule, value, callback) => {
      if (this.setRediusSubDataForm.password !== value) {
        callback(new Error('确认密码与新密码不一致'))
      } else {
        callback()
      }
    }
    return {
      isDisabled: true,
      // 表格高度
      rediusTableHeight: '',
      // 增加、修改页面表单
      setRediusSubDataForm: {
        setOrganizationOptions: [],
        channelId: null,
        password: null,
        passwordtoo: null,
        reportTime: 300
      },
      rediussunDataFormSetRule: {
        setOrganizationOptions: [{ required: true, message: '组织机构不能为空', trigger: 'blur' }],
        channelId: [{
          required: true,
          message: '通道标识不能为空',
          trigger: 'blur'
        }],
        password: [
          { required: true, message: '新密码不能为空', trigger: 'blur' }
        ],
        passwordtoo: [
          { required: true, message: '确认密码不能为空', trigger: 'blur' },
          { validator: validateConfirmPassword, trigger: 'blur' }
        ]
      },
      // 区分是新增还是修改页面
      dialogTitle: '',
      // 搜索表单 分别为已选组织机构、已选通道标识
      secrchRediusSubForm: {
        orgSelectedOptions: [],
        channelSelectedOptions: null
      },
      // 组织机构列表
      organizationOptions: [],
      // 通道标识列表
      channelOptions: [],
      // 表格数据
      rediusDataList: [],
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
      agreementLoading: false
    }
  },
  created () {
    this.rediusTableHeight = window.innerHeight-320    
  },
  mounted () {
    this.getOrgLists()
    this.getRediusSubList()
    // document.getElementById('rediusSub').style.height = (window.innerHeight-170)+'px'
    window.onresize = function () {
      if(document.getElementById('rediusSub')){
        // document.getElementById('rediusSub').style.height = (window.innerHeight - 170) + 'px'
        this.rediusTableHeight = window.innerHeight-320
      }
    }   
  },
  methods: {
    // 提交修改配置页面信息
    dataFormSubmit (setRediusSubDataForm) {
      // console.log(setRediusSubDataForm)
      this.$refs['setRediusSubDataForm'].validate((valid) => {
        if (valid) {
          this.$confirm(`确定提交?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$http({
              url: this.$http.adornUrl(`/admin/tprotocolredisslave/${this.dialogTitle == undefined ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                id : this.dialogTitle == undefined ? null : this.dialogTitle,
                channelId : setRediusSubDataForm.channelId,
                password : setRediusSubDataForm.password,
                reportTime : setRediusSubDataForm.reportTime,
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
                      this.rediusDataList.unshift(data.entity)
                    } else {
                      for(let i=0;i<this.rediusDataList.length;i++) {
                        if(this.rediusDataList[i].id == data.entity.id) {
                          this.rediusDataList[i].channelId = data.entity.channelId
                          this.rediusDataList[i].channelName = data.entity.channelName
                          this.rediusDataList[i].id = data.entity.id
                          this.rediusDataList[i].orgId = data.entity.orgId 
                          this.rediusDataList[i].password = data.entity.password
                          this.rediusDataList[i].reportTime = data.entity.reportTime
                        }
                      }
                    }
                    // this.$refs['setRediusSubDataForm'].resetFields()
                    // this.$options.methods.getRediusSubList.bind(this)()
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
          this.secrchRediusSubForm.orgSelectedOptions = JSON.parse(window.sessionStorage.getItem('userInfo')).orgId.split()          
        }
      })      
    },
    // 获取通道标识
    getChannel () {
      // console.log(this.addOrUpdateVisible)
      let orgId = this.addOrUpdateVisible ? this.setRediusSubDataForm.setOrganizationOptions[this.setRediusSubDataForm.setOrganizationOptions.length -1] : this.secrchRediusSubForm.orgSelectedOptions[this.secrchRediusSubForm.orgSelectedOptions.length -1]
      // console.log(orgId)
      this.agreementLoading = true            
      this.$http({
        url: this.$http.adornUrl('/admin/tprotocolredismaster/channel'),
        method: 'post',
        data: this.$http.adornParams({
          orgId: orgId
        })
      }).then(({data}) => {
        if (data && data.code === 0) {
          this.agreementLoading = false
          this.channelOptions = data.list           
        }
      })
    },
    // 获取数据列表
    getRediusSubList (params) {
      if(params){
          this.pageIndex=1
        }
      this.dataListLoading = true
      this.$http({
        url: this.$http.adornUrl('/admin/tprotocolredisslave/list'),
        method: 'post',
        data: this.$http.adornParams({
          'page': this.pageIndex.toString(),
          'limit': this.pageSize.toString(),
          'orgId': this.secrchRediusSubForm.orgSelectedOptions.length == 0 ? JSON.parse(window.sessionStorage.getItem('userInfo')).orgId : this.secrchRediusSubForm.orgSelectedOptions[this.secrchRediusSubForm.orgSelectedOptions.length -1],
          'channelId': this.secrchRediusSubForm.channelSelectedOptions
        })
      }).then(({data}) => {
        if (data && data.code === 0) {
          this.rediusDataList = data.page.list
          this.totalPage = data.page.totalCount
          this.pageIndex = data.page.currPage
          this.pageSize = data.page.pageSize
        } else {
          this.rediusDataList = []
          this.totalPage = 0
        }
        this.dataListLoading = false
      })
    },
    // 每页数
    sizeChangeHandle (val) {
      this.pageSize = val
      this.pageIndex = 1
      this.$options.methods.getRediusSubList.bind(this)()
    },
    // 当前页
    currentChangeHandle (val) {
      this.pageIndex = val
      this.$options.methods.getRediusSubList.bind(this)()
    },
    // 多选
    selectionChangeHandle (val) {
      this.dataListSelections = val
    },
    // 新增 / 修改
    addRediusSub (row) {
      this.addOrUpdateVisible = true
      this.$nextTick(function () {
        this.$refs['setRediusSubDataForm'].resetFields()
        this.setRediusSubDataForm.setOrganizationOptions = []       
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
            this.setRediusSubDataForm.setOrganizationOptions = data.list
          }else {
            this.setRediusSubDataForm.setOrganizationOptions = []
          }
        })      
        this.$nextTick(function () {
          // this.setRediusSubDataForm.setOrganizationOptions = this.secrchRediusSubForm.orgSelectedOptions
          this.dialogTitle = row.id
          this.setRediusSubDataForm.channelId = row.channelId.toString()
          this.setRediusSubDataForm.password = row.password
          this.setRediusSubDataForm.passwordtoo = row.password
          this.setRediusSubDataForm.reportTime = row.reportTime
        })
      }else {
        this.dialogTitle = row
        this.isDisabled = false
      }
    },
    // 删除
    deleteRediusSub (id) {
      var channelId = id ? [id] : this.dataListSelections.map(item => {
        return item.id
      })
      this.$confirm('确定删除操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http({
          url: this.$http.adornUrl('/admin/tprotocolredisslave/delete'),
          method: 'post',
          data: this.$http.adornData(channelId, false)
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.getRediusSubList()
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
/* 搜索条件栏样式开始 */
.device-form {
  background-color: #eef4fa;
  border-radius: 5px 5px 0 0;
 /*  margin-bottom: 10px; */
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
/* .redius >>> .el-dialog {
  height: 70%;
}
.redius >>> .el-dialog .el-dialog__body {
  height: 80%;
} */
.set-device-form {
  background-color: #eef4fa;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px 0 0 0;
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
  min-width: 160px;
  text-decoration: none
} */
.set-device-form-item >>> .el-select, .set-device-form-item >>> .el-cascader, .set-device-form-item >>> .el-input, .set-device-form-item >>> .el-input-number {
  flex: 2
}
/* 增加修改配置页面样式结束 */
</style>
