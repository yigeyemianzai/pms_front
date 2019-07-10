<template>
  <div class="tstation" id="tStation">
    <el-form :inline="true" :model="secrchStationForm" @keyup.enter.native="getStationList()" class="device-form">
      <el-form-item class="device-form-item" >
        <el-cascader
          :options="organizationOptions"
          v-model="secrchStationForm.orgSelectedOptions"
          change-on-select
          placeholder="选择组织机构"
        ></el-cascader>
      </el-form-item>
      <el-form-item class="device-form-item" >
          <el-select 
            v-model="secrchStationForm.stationNameSelectedOptions" 
            filterable placeholder="选择站点名称" clearable
            @click.native="getStationNameLists()" 
            :loading="stationNameLoading">
            <el-option
                v-for="item in stationNameOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
      </el-form-item>
      <el-form-item class="device-form-item">
        <el-button type="success" @click="getStationList('params')">查询</el-button>
        <el-button v-if="isAuth(OPTAUTH_ADD)" type="primary" @click="addStation()">新增</el-button>
        <el-button v-if="isAuth(OPTAUTH_DELETE)" type="danger" @click="deleteStation()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :row-style="{height:'36px'}"
      :max-height="stationTableHeight"
      :data="stationDataList"
      border
      accordion
      @cell-mouse-enter="cellMouseEnter"
      v-loading="stationDataListLoading"
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
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="right" inline class="demo-table-expand">
              <el-form-item label="站点标识：">
                  <span>{{props.row.stationId}}</span>
              </el-form-item>
              <el-form-item label="站点名称：">
                  <span>{{props.row.stationName}}</span>
              </el-form-item>
              <el-form-item label="站点编码：">
                  <span>{{props.row.stationCode}}</span>
              </el-form-item>
              <el-form-item label="所属组织机构：">
                  <span>{{props.row.orgName}}</span>
              </el-form-item>
              <el-form-item label="所属类型：">
                  <span>{{props.row.affiliationType | affiliationType}}</span>
              </el-form-item>
              <el-form-item label="所属电力公司：">
                  <span>{{props.row.affiliationUint | affiliationUint}}</span>
              </el-form-item>
              <el-form-item label="行政区域编码：">
                  <span>{{props.row.districtCode}}</span>
              </el-form-item>
              <el-form-item label="站点地址：">
                  <span>{{props.row.address}}</span>
              </el-form-item>
              <el-form-item label="经度：">
                  <span>{{props.row.lng}}</span>
              </el-form-item>
              <el-form-item label="纬度：">
                  <span>{{props.row.lat}}</span>
              </el-form-item>
              <el-form-item label="联系人：">
                  <span>{{props.row.cpName}}</span>
              </el-form-item>
              <el-form-item label="联系电话：">
                  <span>{{props.row.cpTel}}</span>
              </el-form-item>
              <el-form-item label="运营类型：">
                  <span>{{props.row.operationType}}</span>
              </el-form-item>
              <el-form-item label="投运状态：">
                  <span>{{props.row.operationState | operationState}}</span>
              </el-form-item>
              <el-form-item label="更新人：">
                  <span>{{props.row.updateUser}}</span>
              </el-form-item>
              <el-form-item label="更新时间：">
                  <span>{{props.row.updateTime}}</span>
              </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        prop="orgName"
        header-align="center"
        align="center"
        min-width="80"
        label="所属组织机构">
      </el-table-column>
      <el-table-column
        prop="stationName"
        header-align="center"
        align="center"
        min-width="80"
        label="站点名称">
      </el-table-column>
      <el-table-column
        prop="stationCode"
        header-align="center"
        align="center"
        min-width="80"
        label="站点编码">
      </el-table-column>
      <el-table-column
        prop="affiliationType"
        header-align="center"
        align="center"
        min-width="80"
        label="所属类型"
        :formatter="affiliationTypes">
      </el-table-column>
      <el-table-column
        prop="address"
        header-align="center"
        align="center"
        min-width="80"
        label="站点地址">
      </el-table-column>
      <el-table-column
        prop="cpName"
        header-align="center"
        align="center"
        min-width="80"
        label="联系人">
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button v-if="isAuth(OPTAUTH_UPDATE)" type="text" size="mini" @click="addStation(scope.row)"><i class="el-icon-edit-outline istyle"></i></el-button>
          <el-button v-if="isAuth(OPTAUTH_DELETE)" type="text" size="mini" @click="deleteStation(scope.row.stationId)"><i class="el-icon-delete istyle"></i></el-button>
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
      center="center"
      width="27.66%"
      class="rdialog">
      <el-form :model="setStationDataForm" @keyup.enter.native="stationDataFormSubmit()" class="rel-form" :rules="stationDataFormSetRule" ref="setStationDataForm">
        <el-form-item class="rel-form-item" label="组织机构" prop="setOrganizationOptions">
          <el-cascader
            :options="organizationOptions"
            v-model="setStationDataForm.setOrganizationOptions"
            change-on-select
            prop="organizationOptions"
          ></el-cascader>
        </el-form-item>
        <el-form-item class="rel-form-item" label="站点名称" prop="stationName">
          <el-input v-model="setStationDataForm.stationName"></el-input>
        </el-form-item>
        <el-form-item class="rel-form-item" label="所属类型" prop="affiliationType">
          <el-select v-model="setStationDataForm.affiliationType">
            <el-option
              v-for="item in affiliationTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>  
        </el-form-item>
        <el-form-item class="rel-form-item" label="所属电力公司" prop="affiliationUint">
          <el-select v-model="setStationDataForm.affiliationUint">
            <el-option
              v-for="item in affiliationUintOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select> 
        </el-form-item>
        <el-form-item class="rel-form-item" label="行政区域编码">
          <el-cascader
            :options="districtCodeOptions"
            v-model="setStationDataForm.districtCode"
            @click.native="getDistrictCode()"
            prop="districtCodeOptions"
            :loading="districtCodeLoading"
          ></el-cascader>
        </el-form-item>
        <el-form-item class="rel-form-item" label="站点地址" prop="address">
          <el-input v-model="setStationDataForm.address"></el-input>
        </el-form-item>
        <el-form-item class="rel-form-item" label="联系人" prop="cpName">
          <el-input v-model="setStationDataForm.cpName"></el-input>
        </el-form-item>
        <el-form-item class="rel-form-item" label="联系电话" prop="cpTel">
          <el-input v-model="setStationDataForm.cpTel"></el-input>
        </el-form-item>
        <el-form-item class="rel-form-item" label="运营类型" prop="operationType">
          <el-input v-model="setStationDataForm.operationType"></el-input>
        </el-form-item>
        <el-form-item class="rel-form-item" label="投运状态" prop="operationState">
          <el-select v-model="setStationDataForm.operationState">
            <el-option
              v-for="item in operationStateOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="rel-form-item" label="图片上传">
          <el-upload
            class="upload-demo"
            action=""
            multiple
            :limit="3"
            :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addOrUpdateVisible = false">取消</el-button>
        <el-button type="primary" @click="stationDataFormSubmit(setStationDataForm)">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { isMobile } from '@/utils/validate'
export default {
  data () {
    var validateCpTel = (rule, value, callback) => {
      if(value) {
        if (!isMobile(value)) {
          callback(new Error('手机号码不正确'))
        } else {
          callback()
        }
      } else {
        callback()
      }      
    }
    return {
      // 上传图片
      fileList: [],
      // 表格高度
      stationTableHeight: '',
      // 投运状态下拉框
      operationStateOptions: [{
        label: '投运中',
        value: '1'
        }, {
        label: '未投运',
        value: '2'
      }],
      // 行政区域编码
      districtCodeOptions: [],
      // 所属电力公司
      affiliationUintOptions: [{
        label: '国家电网',
        value: '1'
      }, {
        label: '南方电力',
        value: '2'
      }],
      // 所属类型下拉框选项
      affiliationTypeOptions: [{
        label: '企业',
        value: '1'
        }, {
          label: '个人',
          value: '2'
      }],
      // 增加、修改页面表单
      setStationDataForm: {
        setOrganizationOptions: [],
        stationName: null,
        affiliationType: null,
        affiliationUint: null,
        districtCode: [],
        address: null,
        cpName: null,
        cpTel: null,
        operationType: null,
        operationState: null,    
      },
      stationDataFormSetRule: {
        setOrganizationOptions: [{ required: true, message: '组织机构不能为空', trigger: 'change' }],
        stationName: [{ required: true, message: '站点名称不能为空', trigger: 'blur' }],
        affiliationType: [],
        affiliationUint: [],
        address: [],
        cpName: [],
        cpTel: [
          { required: false, trigger: 'blur' },
          { validator: validateCpTel, trigger: 'blur' }
        ],
        operationType: [],
        operationState: [],
        districtCodeOptions: []
      },
      // 区分是新增还是修改页面
      dialogTitle: '',
      // 搜索表单 分别为已选组织机构 站点名称
      secrchStationForm: {
        orgSelectedOptions: [],
        stationNameSelectedOptions: null
      },
      // 组织机构列表
      organizationOptions: [],
      // 站点名称列表
      stationNameOptions: [],
      // 表格数据
      stationDataList: [],
      // 当前页
      pageIndex: 1,
      // 分页大小
      pageSize: 10,
      // 总记录数
      totalPage: 2,
      // 多选数组
      dataListSelections: [],
      addOrUpdateVisible: false,
      stationDataListLoading: false,
      stationNameLoading: true,
      agreementLoading: false,
      districtCodeLoading: true
    }
  },
  created () {
    this.stationTableHeight = window.innerHeight-320
  },
  mounted () {
    // document.getElementById('tStation').style.height = (window.innerHeight-170)+'px'
    this.getOrgLists()
    this.getStationList()
    window.onresize = function () {
      if(document.getElementById('tStation')){
        // document.getElementById('tStation').style.height = (window.innerHeight - 170) + 'px'
        this.stationTableHeight = window.innerHeight-320
      }
    }   
  },
  watch: {
    // 监听组织机构选框修改，清除站点选框内容
    'secrchStationForm.orgSelectedOptions': function (val) {
      this.secrchStationForm.stationNameSelectedOptions = ''
    },
  },
  methods: {
    cellMouseEnter (row, column, cell, event) {
      // console.log(row, column, cell, event)
      // cell.style.borderColor = "black"
      // console.log(cell.style)
    },
    // 提交修改配置页面信息
    stationDataFormSubmit (setStationDataForm) {
      // console.log("add", setStationDataForm)
      this.$refs['setStationDataForm'].validate((valid) => {
        if (valid) {
          this.$confirm(`确定提交?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$http({
              url: this.$http.adornUrl(`/admin/tstation/${this.dialogTitle == undefined ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                stationId: setStationDataForm.stationId,
                orgId: setStationDataForm.setOrganizationOptions[setStationDataForm.setOrganizationOptions.length-1],
                stationName: setStationDataForm.stationName,
                stationCode: setStationDataForm.stationCode,
                affiliationType: setStationDataForm.affiliationType,
                affiliationUint: setStationDataForm.affiliationUint,
                districtCode: setStationDataForm.districtCode == undefined ? null : setStationDataForm.districtCode[setStationDataForm.districtCode.length-1],
                address: setStationDataForm.address,
                /* lng: setStationDataForm.lng,
                lat: setStationDataForm.lat, */
                cpName: setStationDataForm.cpName,
                cpTel: setStationDataForm.cpTel,
                operationType: setStationDataForm.operationType,
                operationState: setStationDataForm.operationState
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.addOrUpdateVisible = false
                    if(this.dialogTitle == undefined) {
                      this.stationDataList.unshift(data.entity)
                    } else {
                      for(let i=0; i<this.stationDataList.length; i++) {
                        if(this.stationDataList[i].stationId == data.entity.stationId) {
                          this.stationDataList[i].address = data.entity.address,
                          this.stationDataList[i].affiliationType = data.entity.affiliationType,
                          this.stationDataList[i].affiliationUint = data.entity.affiliationUint,
                          this.stationDataList[i].cpName = data.entity.cpName,
                          this.stationDataList[i].cpTel = data.entity.cpTel,
                          this.stationDataList[i].districtCode = data.entity.districtCode,
                          this.stationDataList[i].imgUrl = data.entity.imgUrl,
                          this.stationDataList[i].lat = data.entity.lat,
                          this.stationDataList[i].lng = data.entity.lng,
                          this.stationDataList[i].operationState = data.entity.operationState,
                          this.stationDataList[i].operationType = data.entity.operationType,
                          this.stationDataList[i].orgId = data.entity.orgId,
                          this.stationDataList[i].orgName = data.entity.orgName,
                          this.stationDataList[i].stationCode = data.entity.stationCode,
                          this.stationDataList[i].stationId = data.entity.stationId,
                          this.stationDataList[i].stationName = data.entity.stationName,
                          this.stationDataList[i].updateTime = data.entity.updateTime,
                          this.stationDataList[i].updateUser = data.entity.updateUser
                        }
                      }
                    }
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    
                    // this.$refs['setStationDataForm'].resetFields()
                    // this.$options.methods.getStationList.bind(this)()
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
          // console.log(data)
          this.organizationOptions = data.list
          if(this.secrchStationForm.orgSelectedOptions.length === 0) {
            this.secrchStationForm.orgSelectedOptions = JSON.parse(window.sessionStorage.getItem('userInfo')).orgId.split()
          }          
        }
      })      
    },
    // 获取站点名称下拉框数据
    getStationNameLists () {
      this.stationNameLoading = true  
      this.$http({
        url: this.$http.adornUrl('/admin/tstation/station'),
        method: 'post',
        data: this.$http.adornParams({
          'orgId': this.secrchStationForm.orgSelectedOptions[this.secrchStationForm.orgSelectedOptions.length-1]
        })
      }).then(({data}) => {
        if (data && data.code === 0) {
          this.stationNameOptions = data.list
          this.stationNameLoading = false     
        }
      })
    },
    // 获取数据列表
    getStationList (params) {
      if(params){
          this.pageIndex=1
        }
      // console.log(this.secrchStationForm)
      this.stationDataListLoading = true
      this.$http({
        url: this.$http.adornUrl('/admin/tstation/list'),
        method: 'post',
        data: this.$http.adornParams({
          'orgId': this.secrchStationForm.orgSelectedOptions.length == 0 ? JSON.parse(window.sessionStorage.getItem('userInfo')).orgId : this.secrchStationForm.orgSelectedOptions[this.secrchStationForm.orgSelectedOptions.length -1],
          'stationId': this.secrchStationForm.stationNameSelectedOptions,
          'page': this.pageIndex, // 当前页数
          'limit': this.pageSize, // 	每页记录数
        })
      }).then(({data}) => {
        if (data && data.code === 0) {
          this.stationDataList = data.page.list
          this.totalPage = data.page.totalCount
          this.pageIndex = data.page.currPage
          this.pageSize = data.page.pageSize
        } else {
          this.stationDataList = []
          this.totalPage = 0
        }
        this.stationDataListLoading = false
      })
    },
    // 每页数
    sizeChangeHandle (val) {
      this.pageSize = val
      this.pageIndex = 1
      this.$options.methods.getStationList.bind(this)()
    },
    // 当前页
    currentChangeHandle (val) {
      this.pageIndex = val
      this.$options.methods.getStationList.bind(this)()
    },
    // 多选
    selectionChangeHandle (val) {
      this.dataListSelections = val
    },
    // 新增 / 修改
    addStation (row) {
      this.addOrUpdateVisible = true
      this.$nextTick(function () {
        this.$refs['setStationDataForm'].resetFields()
        this.setStationDataForm.districtCode = []
      })
        // 修改则把该行信息传入 增加则没有
        if(row) {
          this.$http({
            url: this.$http.adornUrl('/admin/tstation/orgName'),
            method: 'post',
            data: this.$http.adornData({
              orgId: row.orgId
            })
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.setStationDataForm.setOrganizationOptions = data.list
            }else {
              this.setStationDataForm.setOrganizationOptions = []
            }
          })
          this.$http.get('static/resource/region.json').then(res => {
            this.districtCodeOptions = res.data.list[0].children
            this.districtCodeLoading = false
          }).then(() => {
            this.$http({
              url: this.$http.adornUrl('/admin/tstation/update/region'),
              method: 'post',
              data: this.$http.adornData({
                regId: row.districtCode
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.setStationDataForm.districtCode = data.list
              }else {
                this.setStationDataForm.districtCode = []
              }
            })
          }).then(()=>{
            this.$http({
              url: this.$http.adornUrl(`/admin/tstation/info/${row.stationId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({
              data
            }) => {
              if (data && data.code === 0) {
                this.dialogTitle = data.tStation.stationId
                this.setStationDataForm.stationId = data.tStation.stationId
                this.setStationDataForm.stationName = data.tStation.stationName
                this.setStationDataForm.affiliationType = data.tStation.affiliationType == null ? null : data.tStation.affiliationType.toString()
                this.setStationDataForm.affiliationUint = data.tStation.affiliationUint
                this.setStationDataForm.address = data.tStation.address
                this.setStationDataForm.cpName = data.tStation.cpName
                this.setStationDataForm.cpTel = data.tStation.cpTel
                this.setStationDataForm.operationType = data.tStation.operationType
                this.setStationDataForm.operationState = data.tStation.operationState == null ? null : data.tStation.operationState.toString() 
              }
            })
          })
          
          /* this.$nextTick(function () {
            this.dialogTitle = row.stationId
            this.setStationDataForm.stationId = row.stationId
            this.setStationDataForm.stationName = row.stationName
            this.setStationDataForm.affiliationType = row.affiliationType == null ? null : row.affiliationType.toString()
            this.setStationDataForm.affiliationUint = row.affiliationUint
            this.setStationDataForm.address = row.address
            this.setStationDataForm.cpName = row.cpName
            this.setStationDataForm.cpTel = row.cpTel
            this.setStationDataForm.operationType = row.operationType
            this.setStationDataForm.operationState = row.operationState == null ? null : row.operationState.toString()         
          }) */
        }else {
          this.dialogTitle = row
          this.setStationDataForm.stationId = '' 
        }   
    },
    // 删除
    deleteStation (id) {
      var stationId = id ? [id] : this.dataListSelections.map(item => {
        return item.stationId
      })
      this.$confirm('确定删除操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http({
          url: this.$http.adornUrl('/admin/tstation/delete'),
          method: 'post',
          data: this.$http.adornData(stationId, false)
        }).then(({data}) => {
          if (data && data.code === 0) {
                this.getStationList()
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1500,
              onClose: () => {
              }
            })
          } else {
            this.$message.error(data.msg)
          }
        })
      }).catch(() => {})
    },
    // 获取行政区域编码
    getDistrictCode () {
      this.$http.get('static/resource/region.json').then(res => {
        this.districtCodeOptions = res.data.list[0].children
        this.districtCodeLoading = false
      })    
    },
    // 隔行变色
    /* tableRowClassName({row, rowIndex}) {
      if (rowIndex%2 === 0) {
        return 'warning-row';
      } else if (rowIndex%2 === 1) {
        return 'success-row';
      }
      return '';
    }, */
    // 所属类型（1企业  2个人）
    affiliationTypes (row,column,cellValue,index) {
      // console.log(row,column,cellValue,index)
      if(cellValue == 1){
        return '企业'
      }else if(cellValue == 2){
        return '个人'
      }else if(cellValue == null) {
        return '-'
      }
      // return cellValue
    }
  },
  filters: {
    affiliationType: function (value) {
      if(value == '1') {
        return '企业'
      }else if (value == '2') {
        return '个人'
      }
    },
    affiliationUint: function (value) {
      if(value == '1') {
        return '国家电网'
      }else if (value == '2'){
        return '南方电力'
      }
    },
    operationState: function (value) {
      if(value == '1') {
        return '投运中'
      }else if (value == '2'){
        return '未投运'
      }
    }
  }
}
</script>
<style scoped>
/* 搜索条件栏样式开始 */
.device-form {
  /* background-color: #eef4fa; */
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
/* .tstation >>> .el-table .warning-row {
  background: #f6f9fc;
}

.tstation >>> .el-table .success-row {
  background: #fafcfd;
} */

.demo-table-expand {
  font-size: 0;
  padding-left: 20px
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;  
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 33%;
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
/* .istyle {
  font-size: 18px;
  font-weight: 500;
  color: #3397ff
}
.tstation >>> .el-pager li.active {
  background-color: #33a7fe;
  color: #fff;
  font-size: 16px;
  border-radius: 100%
}
.tstation >>> .el-pager li {
  min-width: 30px;
  height: 25px;
  line-height: 25px
} */
/* .tstation >>> .el-table td, .tstation >>> .el-table th {
  padding: 0
} */

</style>
<style lang="scss" scoped>
@import "../../../../assets/scss/_dialog.scss"
</style>
