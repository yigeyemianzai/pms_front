<template>
  <div class="redius" id="redius">
    <el-form :inline="true" :model="secrchRediusForm" @keyup.enter.native="getRediustList()" class="device-form">
      <el-form-item class="device-form-item" >
        <el-cascader
          :options="organizationOptions"
          v-model="secrchRediusForm.orgSelectedOptions"
          change-on-select
          placeholder="选择组织机构" 
        ></el-cascader>
      </el-form-item>
      <el-form-item class="device-form-item" >
        <el-select 
          v-model="secrchRediusForm.channelSelectedOptions" 
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
        <el-button type="primary" @click="getRediustList('params')">查询</el-button>
        <el-button v-if="isAuth(OPTAUTH_ADD)" type="success" @click="addRedius()">新增</el-button>
        <el-button v-if="isAuth(OPTAUTH_DELETE)" type="danger" @click="deleteRedius()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
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
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button v-if="isAuth(OPTAUTH_UPDATE)" :plain="true" type="warning" size="mini" @click="addRedius(scope.row)">修改</el-button>
          <el-button v-if="isAuth(OPTAUTH_DELETE)" :plain="true" type="danger" size="mini" @click="deleteRedius(scope.row.id)">删除</el-button>
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
      <el-form :model="setRediusdataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px" class="set-device-form" :rules="rediusDataFormSetRule" ref="setRediusdataForm">
        <el-form-item class="set-device-form-item" label="组织机构" prop="setOrganizationOptions">
          <el-cascader
            :options="organizationOptions"
            change-on-select
            v-model="setRediusdataForm.setOrganizationOptions"
            :disabled="isDisabled"
          ></el-cascader>
        </el-form-item>
        <el-form-item class="set-device-form-item" prop="channelId" label="通道名称">
          <el-select v-model="setRediusdataForm.channelId" placeholder="请选择" @click.native="getChannel()">
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
            v-model="setRediusdataForm.channelId"
            clearable>
          </el-input> -->
        </el-form-item>
        <el-form-item class="set-device-form-item" label="redis登陆密码" prop="password">
          <el-input
            placeholder="请输入密码"
            v-model="setRediusdataForm.password"
            type="password"
            clearable>
          </el-input>
        </el-form-item>
        <el-form-item class="set-device-form-item" label="再次输入登陆密码" prop="passwordtoo">
          <el-input
            placeholder="请输入密码"
            v-model="setRediusdataForm.passwordtoo"
            type="password"
            clearable>
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addOrUpdateVisible = false">取消</el-button>
        <el-button type="primary" @click="dataFormSubmit(setRediusdataForm)">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    var validateConfirmPassword = (rule, value, callback) => {
      if (this.setRediusdataForm.password !== value) {
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
      setRediusdataForm: {
        setOrganizationOptions: [],
        channelId: '',
        password: '',
        passwordtoo: ''
      },
      rediusDataFormSetRule: {
        setOrganizationOptions: [{ required: true, message: '组织机构不能为空', trigger: 'blur' }],
        channelId: [{ required: true, message: '通道标识不能为空', trigger: 'blur' }],
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
      secrchRediusForm: {
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
    this.getRediustList()
    // document.getElementById('redius').style.height = (window.innerHeight-170)+'px'
    window.onresize = function () {
      if(document.getElementById('redius')){
        // document.getElementById('redius').style.height = (window.innerHeight - 170) + 'px'
        this.rediusTableHeight = window.innerHeight-320
      }
    }   
  },
  methods: {
    // 提交修改配置页面信息
    dataFormSubmit (setRediusdataForm) {
      // console.log(setRediusdataForm)
      this.$refs['setRediusdataForm'].validate((valid) => {
        if (valid) {
          this.$confirm(`确定提交?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$http({
              url: this.$http.adornUrl(`/admin/tprotocolredismaster/${this.dialogTitle == undefined ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                id : this.dialogTitle == undefined ? null : this.dialogTitle,
                channelId : setRediusdataForm.channelId,
                password : setRediusdataForm.password,
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
                        }
                      }
                    }
                    // this.$refs['setRediusdataForm'].resetFields()
                    // this.$options.methods.getRediustList.bind(this)()
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
          if(this.secrchRediusForm.orgSelectedOptions.length === 0) {
            this.secrchRediusForm.orgSelectedOptions = JSON.parse(window.sessionStorage.getItem('userInfo')).orgId.split()  
          }       
        }
      })      
    },
    // 搜索获取通道标识
    getChannel () {
      // console.log(this.addOrUpdateVisible)
      let orgId = this.addOrUpdateVisible ? this.setRediusdataForm.setOrganizationOptions[this.setRediusdataForm.setOrganizationOptions.length -1] : this.secrchRediusForm.orgSelectedOptions[this.secrchRediusForm.orgSelectedOptions.length -1]
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
    getRediustList (params) {
      if(params){
          this.pageIndex=1
        }
      // console.log(this.secrchRediusForm)
      this.dataListLoading = true
      this.$http({
        url: this.$http.adornUrl('/admin/tprotocolredismaster/list'),
        method: 'post',
        data: this.$http.adornParams({
          'page': this.pageIndex.toString(),
          'limit': this.pageSize.toString(),
          'orgId': this.secrchRediusForm.orgSelectedOptions.length == 0 ? JSON.parse(window.sessionStorage.getItem('userInfo')).orgId : this.secrchRediusForm.orgSelectedOptions[this.secrchRediusForm.orgSelectedOptions.length -1],
          'channelId': this.secrchRediusForm.channelSelectedOptions
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
      this.$options.methods.getRediustList.bind(this)()
    },
    // 当前页
    currentChangeHandle (val) {
      this.pageIndex = val
      this.$options.methods.getRediustList.bind(this)()
    },
    // 多选
    selectionChangeHandle (val) {
      this.dataListSelections = val
    },
    // 新增 / 修改
    addRedius (row) {
      this.addOrUpdateVisible = true
      this.$nextTick(function () {
        this.$refs['setRediusdataForm'].resetFields()
        this.setRediusdataForm.setOrganizationOptions = []
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
            this.setRediusdataForm.setOrganizationOptions = data.list
          }else {
            this.setRediusdataForm.setOrganizationOptions = []
          }
        })
        this.$nextTick(function () {
          // this.setRediusdataForm.setOrganizationOptions = this.secrchRediusForm.orgSelectedOptions
          this.dialogTitle = row.id
          this.setRediusdataForm.channelId = row.channelId.toString()
          this.setRediusdataForm.password = row.password
          this.setRediusdataForm.passwordtoo = row.password
        })
      }else {
        this.dialogTitle = row
        this.isDisabled = false
      }
    },
    // 删除
    deleteRedius (id) {
      var channelId = id ? [id] : this.dataListSelections.map(item => {
        return item.id
      })
      this.$confirm('确定删除操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http({
          url: this.$http.adornUrl('/admin/tprotocolredismaster/delete'),
          method: 'post',
          data: this.$http.adornData(channelId, false)
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.getRediustList()
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
.redius {
  /* width: 100%;
  height: 90%;
  min-height: 90%;
  margin: 0 auto;
  font-size: 14px;
  overflow-y: auto */
}

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
  min-width: 160px;
  text-decoration: none
} */
.set-device-form-item >>> .el-select, .set-device-form-item >>> .el-cascader, .set-device-form-item >>> .el-input, .set-device-form-item >>> .el-input-number {
  flex: 2
}
/* 增加修改配置页面样式结束 */
</style>
