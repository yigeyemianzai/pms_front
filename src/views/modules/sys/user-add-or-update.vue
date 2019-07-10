<template>
  <el-dialog
    :title="!dataForm.userId ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
    center="center"
    width="39.27%"
    class="ldialog">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" class="rel-form">
      <div class="rel-form-column">
        <el-form-item label="组织机构" prop="orgName" class="rel-form-item-row">
          <el-popover
            ref="orgListPopover"
            placement="bottom-start"
            v-model="popuvisible"
            trigger="click">
            <el-tree
              :data="orgList"
              :props="orgListTreeProps"
              node-key="orgId"
              ref="orgListTree"
              @current-change="orgListTreeCurrentChangeHandle"
              :default-expand-all="true"
              :highlight-current="true"
              :expand-on-click-node="false">
            </el-tree>
          </el-popover>
          <el-input v-model="dataForm.orgName" v-popover:orgListPopover placeholder="所属组织机构" :readonly="true" clearable @clear='clearOrgName' @focus="getOrgTree"></el-input>
        </el-form-item>
        <el-form-item label="所属部门" prop="deptId" class="rel-form-item-row">
          <el-select v-model="dataForm.deptId" :loading="deptloading" :disabled="deptDisabled" placeholder="所属部门">
            <el-option
              v-for="item in deptList"
              :key="item.deptId"
              :label="item.deptName"
              :value="item.deptId">
            </el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="rel-form-column">
        <el-form-item label="用户名" prop="userName" class="rel-form-item-row">
          <el-input v-model="dataForm.userName" placeholder="登录帐号"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" class="rel-form-item-row">
          <el-input v-model="dataForm.email" placeholder="邮箱"></el-input>
        </el-form-item>
      </div>
      <div class="rel-form-column">
        <el-form-item label="手机号" prop="tel" class="rel-form-item-row">
          <el-input v-model="dataForm.tel" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="idCard" class="rel-form-item-row">
          <el-input v-model="dataForm.idCard" placeholder="身份证号"></el-input>
        </el-form-item>
      </div>
      <div class="rel-form-column">
        <el-form-item label="账户类型" class="rel-form-item-row">
          <el-radio-group v-model="accType" @change="accTypeChangeHandler" size="small">
            <el-radio-button label="1">个人账户</el-radio-button>
            <el-radio-button label="2">系统账户</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="过期日期" prop="expiryDate" class="rel-form-item-row">
          <el-date-picker type="date" placeholder="过期日期" value-format="yyyy-MM-dd" v-model="dataForm.expiryDate"></el-date-picker>
        </el-form-item>
      </div>      
      <div class="rel-form-column">
        <el-form-item label="角色所属机构" class="rel-form-item-row" prop="orgName1">
          <el-popover
            ref="orgListPopover1"
            placement="bottom-start"
            v-model="popuvisible1"
            trigger="click">
            <el-tree
              :data="orgList"
              :props="orgListTreeProps"
              node-key="orgId"
              ref="orgListTree1"
              @current-change="orgListTreeCurrentChangeHandle1"
              :default-expand-all="true"
              :highlight-current="true"
              :expand-on-click-node="false">
            </el-tree>
          </el-popover>
          <el-input v-model="dataForm.orgName1" v-popover:orgListPopover1 placeholder="所属组织机构" :readonly="true" clearable @clear='clearOrgName1' @focus="getOrgTree1"></el-input>
        </el-form-item>
        <el-form-item class="rel-form-item-row" prop="roleId" label="角色">
          <el-select v-model="dataForm.roleId" :loading="roleloading" placeholder="选择角色" :disabled="isDisabled">
            <el-option
              v-for="item in roleTypes"
              :key="item.roleId"
              :label="item.roleName"
              :value="item.roleId">
            </el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="rel-form-column">
        <el-form-item label="业务对象" prop="busObjType" class="bus-type">
          <el-checkbox-group v-model="checkedEqList">
            <el-checkbox v-for="eqtype in eqtypeList" :label="eqtype.code" :key="eqtype.code">{{eqtype.codeName}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </div>
      <div class="rel-form-column">
        <el-form-item label="操作权限" prop="optAuth" class="opt-type">
          <el-checkbox-group v-model="checkedOptAuthList">
            <el-checkbox v-for="eqtype in optAuthList" :label="eqtype.code" :key="eqtype.code">{{eqtype.codeName}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </div>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import { isEmail, isMobile } from '@/utils/validate'
  import { getUUID } from '@/utils'
  export default {
    data () {
      var validateEmail = (rule, value, callback) => {
        if (!isEmail(value)) {
          callback(new Error('邮箱格式错误'))
        } else {
          callback()
        }
      }
      var validateMobile = (rule, value, callback) => {
        if (!isMobile(value)) {
          callback(new Error('手机号格式错误'))
        } else {
          callback()
        }
      }
      return {
        isDisabled: true,
        visible: false,
        popuvisible: false,
        popuvisible1: false,
        dataForm: {
          userId: null,
          userName: null,
          email: null,
          tel: null,
          idCard: null,
          person: false,
          sys: true,
          orgId: null,
          deptId: null,
          expiryDate: null,
          busObjType: 0,
          optAuth: 0,
          roleId: null,
          orgName: null,
          roleName: null,
          deptName: null,
          busObjsDesc: null,
          optAuthDesc: null,
          orgName1: null,  // 角色选择-组织机构
          orgId1: null    // 角色选择-组织机构
        },
        accType: 2,
        orgList: [],
        orgListTreeProps: {
          label: 'orgName',
          children: 'children'
        },
        checkedEqList: [],
        eqtypeList: [],
        checkedOptAuthList: [],
        optAuthList: [],
        roleTypes: [],
        deptList: [],
        deptloading: false,
        deptDisabled: true,
        roleloading: false,
        dataRule: {
          userName: [
            { required: true, message: '用户名不能为空', trigger: 'blur' }
          ],
          tel: [
            { required: true, message: '手机号不能为空', trigger: 'blur' },
            { validator: validateMobile, trigger: 'blur' }
          ],
          orgName: [
            { required: true, message: '组织机构不能为空', trigger: 'change' }
          ],
          deptId: [
            { required: true, message: '所属部门不能为空', trigger: 'blur' }
          ],
          roleId: [
            { required: true, message: '角色不能为空', trigger: 'blur' }
          ],
          orgName1: [
            { required: true, message: '角色所属组织机构不能为空', trigger: 'change' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.userId = id || 0
        this.checkedEqList = []
        this.eqtypeList = []
        this.checkedOptAuthList = []
        this.optAuthList = []
        this.visible = true
        this.isDisabled = true   
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          this.dataForm.orgId = null
          this.dataForm.orgName = null
          this.dataForm.orgId1 = null
          this.dataForm.orgName1 = null
          this.dataForm.deptId = null
          this.dataForm.busObjType = 0
          this.dataForm.optAuth = 0
          this.getCurnUserOptAuth()          
        })
        if (this.dataForm.userId) {
          this.$http({
            url: this.$http.adornUrl(`/sys/org/busObjsByUserId/${this.dataForm.userId}`),
            method: 'get',
            params: this.$http.adornParams()
          }).then(({data}) => {
            if(data && data.code == 0) {
              this.eqtypeList = data.busObjsList
              // this.checkedEqList = []
            } else {
              this.$message.error(data.msg)
            }
          }).then(()=>{
            this.$http({
              url: this.$http.adornUrl('/sys/org/getCurnUserManSysOrgTree'),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if(data && data.code == 0) {
                this.orgList = data.data
                this.$nextTick(() => {
                  this.orgListTreeSetCurrentNode()                  
                  this.orgListTreeSetCurrentNode1()
                })
              } else {
                this.$message.error(data.msg)
              }
            }).then(() => {
              this.$http({
                url: this.$http.adornUrl(`/sys/user/info/${this.dataForm.userId}`),
                method: 'get',
                params: this.$http.adornParams()
              }).then(({data}) => {
                if (data && data.code === 0) {
                  // this.getBusObjsByOrgId(data.user.orgId)
                  this.dataForm.userName = data.user.userName
                  this.dataForm.email = data.user.email
                  this.dataForm.tel = data.user.tel
                  this.dataForm.person = data.user.person
                  this.dataForm.sys = data.user.sys
                  this.dataForm.orgId = data.user.orgId
                  this.dataForm.deptId = data.user.deptId
                  this.dataForm.expiryDate = data.user.expiryDate
                  this.dataForm.busObjType = data.user.busObjType
                  this.dataForm.optAuth = data.user.optAuth
                  this.dataForm.idCard = data.user.idCard
                  this.dataForm.orgId1 = data.user.roleOrgId 
                  this.dataForm.orgName1 = data.user.roleOrgName
                  this.dataForm.roleId = data.user.roleId
                              
                  if(data.user.person){
                    this.accType = 1
                  }
                  if(data.user.sys){
                    this.accType = 2
                  }
                  this.orgListTreeSetCurrentNode()
                  this.orgListTreeSetCurrentNode1()
                  for (var i=0;i<data.optAuthList.length;i++) {
                    this.checkedOptAuthList.push(data.optAuthList[i].code)
                  }
                  for (var i=0;i<data.busObjsList.length;i++) {
                    this.checkedEqList.push(data.busObjsList[i].code)
                  }
                }
              })
            })
          })
          
        } else {
          this.deptDisabled = true
          this.getCurnUserBusObjs()
        }
      },
      // 菜单树选中
      orgListTreeCurrentChangeHandle (data, node) {
        this.popuvisible = false
        this.dataForm.orgId = data.orgId
        this.dataForm.orgName = data.orgName
        this.getBusObjsByOrgId(data.orgId)
        this.clearDeptName()       
        this.getDeptByOrgId(this.dataForm.orgId)
      },
      // 角色-组织机构菜单树选中
      orgListTreeCurrentChangeHandle1 (data, node) {
        this.popuvisible1 = false
        this.dataForm.orgId1 = data.orgId
        this.dataForm.orgName1 = data.orgName
        this.getRoleList(data.orgId)
        this.clearRoleName()
      },
      //菜单树设置当前选中节点
      orgListTreeSetCurrentNode () {
        if (this.dataForm.orgId) {
          this.$refs.orgListTree.setCurrentKey(this.dataForm.orgId)
          this.dataForm.orgName = (this.$refs.orgListTree.getCurrentNode() || {})['orgName']
          this.getDeptByOrgId(this.dataForm.orgId)
        }
      },
      // 角色-菜单树设置当前选中节点
      orgListTreeSetCurrentNode1 () {
        if (this.dataForm.orgId1) {
          this.$refs.orgListTree1.setCurrentKey(this.dataForm.orgId1)
          this.dataForm.orgName1 = (this.$refs.orgListTree1.getCurrentNode() || {})['orgName']
          this.getRoleList(this.dataForm.orgId1)
        }
      },
      clearOrgName () {
        this.dataForm.orgId = null
        this.dataForm.orgName = null
      },
      clearOrgName1 () {
        this.dataForm.orgId1 = null
        this.dataForm.orgName1 = null
      },
      clearDeptName () {
        this.dataForm.deptId = null
        this.deptList = []
      },
      clearRoleName () {
        this.dataForm.roleId = null
        this.roleTypes = []
      },
      accTypeChangeHandler (value) {        
        if(value === '1'){
          this.dataForm.person = true
          this.dataForm.sys = false
        }else if(value === '2'){
          this.dataForm.person = false
          this.dataForm.sys = true
        }
      },
      // 表单提交
      dataFormSubmit () {
        var objs = 0
        this.dataForm.busObjsDesc = ''
        for (var k = 0; k < this.checkedEqList.length; k++) {
          objs = objs | this.checkedEqList[k]

          for(var j = 0; j < this.eqtypeList.length; j ++){
            var obj = this.eqtypeList[j]
            if(this.checkedEqList[k] === obj.code){
              if(this.dataForm.busObjsDesc === ''){
                this.dataForm.busObjsDesc += obj.codeName
              }else{
                this.dataForm.busObjsDesc += ',' + obj.codeName
              }
            }
          }
        }
        this.dataForm.busObjType = objs

        var auth = 0
        this.dataForm.optAuthDesc = ''
        for (var k = 0; k < this.checkedOptAuthList.length; k++) {
          auth = auth | this.checkedOptAuthList[k]

          for(var j = 0; j < this.optAuthList.length; j ++){
            var obj = this.optAuthList[j]
            if(this.checkedOptAuthList[k] === obj.code){
              if(this.dataForm.optAuthDesc === ''){
                this.dataForm.optAuthDesc += obj.codeName
              }else{
                this.dataForm.optAuthDesc += ',' + obj.codeName
              }
            }
          }
        }
        this.dataForm.optAuth = auth

        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/sys/user/${!this.dataForm.userId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'userId': this.dataForm.userId || undefined,
                'userName': this.dataForm.userName,
                'email': this.dataForm.email,
                'tel': this.dataForm.tel,
                'person': this.dataForm.person,
                'sys': this.dataForm.sys,
                'idCard': this.dataForm.idCard,
                'orgId': this.dataForm.orgId,
                'deptId': this.dataForm.deptId,
                'expiryDate': this.dataForm.expiryDate,
                'busObjType': this.dataForm.busObjType,
                'optAuth': this.dataForm.optAuth,
                'roleId': this.dataForm.roleId
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.visible = false
                if(!this.dataForm.userId){
                  this.dataForm.userId = data.userId
                }
                this.roleSelChange(this.dataForm.roleId)
                this.deptSelChange(this.dataForm.deptId)
                this.$emit('refreshDataList',this.dataForm)
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 500,
                  onClose: () => {
                    
                  }
                })
              } else {
                this.$message.error(data.msg)
              }
            })
          }
        })
      },
      getOrgTree () {
        if(this.orgList.length > 0){
          return
        }
        this.$http({
          url: this.$http.adornUrl('/sys/org/getCurnUserManSysOrgTree'),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          if(data && data.code == 0) {
            this.orgList = data.data
            this.$nextTick(() => {
              this.orgListTreeSetCurrentNode()
            })
          } else {
            this.$message.error(data.msg)
          }
        })
      },
      getOrgTree1 () {
        if(this.orgList.length > 0){
          return
        }
        this.$http({
          url: this.$http.adornUrl('/sys/org/getCurnUserManSysOrgTree'),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          if(data && data.code == 0) {
            this.orgList = data.data
            this.$nextTick(() => {
              this.orgListTreeSetCurrentNode1()
            })
          } else {
            this.$message.error(data.msg)
          }
        })
      },
      getBusObjsByOrgId (orgId) {
        this.$http({
          url: this.$http.adornUrl(`/sys/org/busObjs/${orgId}`),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.eqtypeList = data.busObjsList
            var removeList = []
            for(var i = 0; i < this.checkedEqList.length; i ++){
              var checkCode = this.checkedEqList[i]
              var remove = true;
              for(var j = 0; j < this.eqtypeList.length; j ++){
                var obj = this.eqtypeList[j]
                if(checkCode===obj.code){
                  remove = false
                }
              }
              if(remove){
                removeList.push(checkCode)
              }
            }
            for(var m = 0; m < removeList.length; m ++){
              var index = this.checkedEqList.indexOf(removeList[m])
              if (index > -1) {
                this.checkedEqList.splice(index, 1);
              }
            }
          }
        })
      },
      getCurnUserBusObjs () {
        this.$http({
          url: this.$http.adornUrl(`/sys/org/busObjs/curnuser`),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.eqtypeList = data.busObjsList
            this.checkedEqList = []
          }
        })
      },
      getCurnUserOptAuth () {
        this.$http({
          url: this.$http.adornUrl(`/sys/user/optauth/curnuser`),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.optAuthList = data.optAuth
            if (!this.dataForm.userId) {
              this.checkedOptAuthList = [1]
            }
          }
        })
      },
      getDeptByOrgId (orgId) {
        this.deptloading = true
        this.$http({
          url: this.$http.adornUrl(`/sys/deptinfo/getDeptByOrgId/${orgId}`),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          this.deptloading = false
          this.deptDisabled = false
          if (data && data.code === 0) {
            this.deptList = data.list
          }
        })
      },
      // 获取角色下拉框值
      getRoleList (orgId) {
        this.roleloading = true
        this.$http({
          url: this.$http.adornUrl(`/sys/roleinfo/getRoleByOrgId/${orgId}`),
          method: 'get',
          data: this.$http.adornData({
            'page': 1,
            'limit': 2000
          })
        }).then(({data}) => {
          this.isDisabled = false
          this.roleloading = false
          this.roleTypes = data
        })
      },
      roleSelChange (value) {
        var len = this.roleTypes.length
        for(var i=0; i < len; i ++){
          if(this.roleTypes[i].roleId === value){
            this.dataForm.roleName = this.roleTypes[i].roleName
          }
        }
      },
      deptSelChange  (value) {
        var len = this.deptList.length
        for(var i=0; i < len; i ++){
          if(this.deptList[i].deptId === value){
            this.dataForm.deptName = this.deptList[i].deptName
          }
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
@import "../../../assets/scss/_dialog.scss"
</style>
<style scoped>
.rel-form-column .bus-type, .rel-form-column .opt-type {
  width: 100%;
}
.rel-form-column .bus-type >>> .el-form-item__label, .rel-form-column .opt-type >>> .el-form-item__label {
  width: 18%;
}
.rel-form-column .bus-type >>> .el-form-item__content, .rel-form-column .opt-type >>> .el-form-item__content {
  width: 75%;
}
.rel-form-column .bus-type >>> .el-checkbox, .rel-form-column .opt-type >>> .el-checkbox {
  margin-left: 0;
  margin-right: 30px
}
</style>
