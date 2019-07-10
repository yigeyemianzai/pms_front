<template>
  <el-dialog
    :title="!dataForm.roleId ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
    center="center"
    width="27.66%"
    class="rdialog">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" class="rel-form">
      <el-form-item label="组织机构名称" prop="orgName" class="rel-form-item">
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
        <el-input v-model="dataForm.orgName" v-popover:orgListPopover placeholder="按组织机构查询" readonly clearable @clear='clearOrgName' @focus="getOrgTree"></el-input>
      </el-form-item>
      <el-form-item label="角色名称" prop="roleName" class="rel-form-item">
        <el-input v-model="dataForm.roleName" placeholder="角色名称"></el-input>
      </el-form-item>
      <el-form-item label="父角色" prop="parentSoleId" class="rel-form-item">
        <el-select v-model="dataForm.parentSoleId" placeholder="请选择" @click.native="changeParentSoleId()">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <!-- <el-input v-model="dataForm.parentSoleId" placeholder="父角色"></el-input> -->
      </el-form-item>
      <el-form-item label="排序号" prop="sortNo" class="rel-form-item">
        <el-input-number v-model="dataForm.sortNo" controls-position="right" :min="0" label="排序号"></el-input-number>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      // 角色名称校验
      var validateRoleName = (rule, value, callback) => {
      if (value && !this.dataForm.roleId) {
        this.$http({
          url: this.$http.adornUrl('/sys/roleinfo/checkName'),
          method: 'post',
          data: this.$http.adornParams({
            orgId: this.dataForm.orgId,
            roleName: value
          })
        }).then(({data}) => {
          if (data && data.code === 0 && data.info.status === false) {
            callback(new Error('角色名称已存在'))
          }else {
            callback()
          }
        })
      } else {
        callback()
      }
    }
      return {
        popuvisible:false,
        orgList: [],
        orgListTreeProps: {
          label: 'orgName',
          children: 'children'
        },
        options: [],
        visible: false,
        dataForm: {
          orgId: null,
          orgName: null,
          roleId: 0,
          roleName: null,
          sortNo: null,
          parentSoleId:null
        },
        roleTypes: [],
        dataRule: {
          orgName: [
            { required: true, message: '组织机构不能为空', trigger: 'change' }
          ],
          roleName: [
            { required: true, message: '角色名称不能为空', trigger: 'blur' },
            { validator: validateRoleName, trigger: 'blur'}
          ],
          sortNo: [
            { required: true, message: '排序号不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    mounted () {
      
    },
    watch: {
      'dataForm.orgId': function(val){
        this.dataForm.roleName = null
      }
    },
    methods: {
      // 菜单树选中
      orgListTreeCurrentChangeHandle (data, node) {
        this.popuvisible = false
        this.dataForm.orgName = data.orgName
        this.dataForm.orgId = data.orgId
      },
      //菜单树设置当前选中节点
      orgListTreeSetCurrentNode () {
        if (this.dataForm.orgId) {
          this.$refs.orgListTree.setCurrentKey(this.dataForm.orgId)
          this.dataForm.orgName = (this.$refs.orgListTree.getCurrentNode() || {})['orgName']
        }
      },
      clearOrgName () {
        this.dataForm.orgId = null
        this.dataForm.orgName = null
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
      changeParentSoleId() {
        this.$http({
          url: this.$http.adornUrl('/sys/roleinfo/parent'),
          method: 'post',
          data: this.$http.adornParams({
            'orgId': this.dataForm.orgId,
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.options = data.data    
          }
        })
      },
      init (id, orgId, orgName, orgList) {              
        this.dataForm.roleId = id || 0        
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          this.dataForm.orgName = null
        })
        if (this.dataForm.roleId) {
          this.orgList = orgList
          this.$http({
            url: this.$http.adornUrl(`/sys/roleinfo/info/${this.dataForm.roleId}`),
            method: 'get',
            params: this.$http.adornParams()
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.dataForm.orgId = data.sysRoleInfo.orgId
              // this.dataForm.orgName = data.sysRoleInfo.orgName
              // this.dataForm.roleName = data.sysRoleInfo.roleName
              this.$nextTick(() => {
                this.dataForm.sortNo = data.sysRoleInfo.sortNo
                this.dataForm.parentSoleId = data.sysRoleInfo.parentSoleId
                this.orgListTreeSetCurrentNode()
                this.dataForm.roleName = data.sysRoleInfo.roleName
              })
            }
          })         
        } else {
          this.orgList = orgList
          this.dataForm.orgId = orgId
          this.$nextTick(() => {
            this.dataForm.orgName = orgName
          })
        }
      },
      // 表单提交
      dataFormSubmit () {
        // console.log(this.dataForm)
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/sys/roleinfo/${!this.dataForm.roleId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'roleId': this.dataForm.roleId || undefined,
                'roleName': this.dataForm.roleName,
                'sortNo': this.dataForm.sortNo,
                'parentSoleId': this.dataForm.parentSoleId,
                'orgId': this.dataForm.orgId
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.visible = false
                    this.$emit('refreshDataList')
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
          }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
@import "../../../assets/scss/_dialog.scss"
</style>