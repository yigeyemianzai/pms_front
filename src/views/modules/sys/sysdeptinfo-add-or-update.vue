<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
    center="center"
    width="27.66%"
    class="rdialog"
    >
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" class="rel-form">
    <el-form-item label="名称描述" prop="deptName" class="rel-form-item">
      <el-input v-model="dataForm.deptName" placeholder="名称描述"></el-input>
    </el-form-item>
    <el-form-item label="所属组织机构" prop="orgName" class="rel-form-item">
      <el-popover
        ref="orgListPopover"
        placement="bottom-start"
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
      <el-input v-model="dataForm.orgName" v-popover:orgListPopover placeholder="组织机构" :readonly="true" class="menu-list__input" clearable @clear='clearOrgName'></el-input>
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
      return {
        visible: false,
        dataForm: {
          orgId: null,
          deptName: null,
          sortNo: null,
          orgName: null
        },
        dataRule: {
          orgName: [
            { required: true, message: '组织机构不能为空', trigger: 'change' }
          ],
          deptName: [
            { required: true, message: '名称描述不能为空', trigger: 'blur' }
          ]
        },
        orgList: [],
        orgListTreeProps: {
          label: 'orgName',
          children: 'children'
        }
      }
    },
    methods: {
      init (id=null,orgId=null) {
        this.dataForm.deptId = id || 0
        console.log(orgId)
        this.visible = true
        this.$http({
          url: this.$http.adornUrl('/sys/org/getCurnUserManSysOrgTree'),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          if(data && data.code == 0) {
            this.orgList = data.data
          } else {
            this.$message.error(data.msg)
          }
        }).then(() => {
          this.$nextTick(() => {
            this.$refs['dataForm'].resetFields()
            this.dataForm.orgId = null
            this.dataForm.orgName = null
          })
        }).then(() => {
          if (!this.dataForm.deptId) {
            // 新增
            this.dataForm.orgId = orgId
            this.orgListTreeSetCurrentNode()
          } else {
            // 修改
            this.$http({
              url: this.$http.adornUrl(`/sys/deptinfo/info/${this.dataForm.deptId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.orgId = data.sysDeptInfo.orgId
                this.dataForm.deptName = data.sysDeptInfo.deptName
                this.dataForm.sortNo = data.sysDeptInfo.sortNo
                this.orgListTreeSetCurrentNode()
              }
            })
          }
        })
      },
      // 菜单树选中
      orgListTreeCurrentChangeHandle (data, node) {
        this.dataForm.orgId = data.orgId
        this.dataForm.orgName = data.orgName
      },
      // 菜单树设置当前选中节点
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
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/sys/deptinfo/${!this.dataForm.deptId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'deptId': this.dataForm.deptId || undefined,
                'orgId': this.dataForm.orgId,
                'deptName': this.dataForm.deptName,
                'sortNo': this.dataForm.sortNo
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
<style lang="scss">
  .mod-menu {
    .menu-list__input,
    .icon-list__input {
       > .el-input__inner {
        cursor: pointer;
      }
    }
    &__icon-popover {
      max-width: 370px;
    }
    &__icon-list {
      max-height: 180px;
      padding: 0;
      margin: -8px 0 0 -8px;
      > .el-button {
        padding: 8px;
        margin: 8px 0 0 8px;
        > span {
          display: inline-block;
          vertical-align: middle;
          width: 18px;
          height: 18px;
          font-size: 18px;
        }
      }
    }
    .icon-list__tips {
      font-size: 18px;
      text-align: center;
      color: #e6a23c;
      cursor: pointer;
    }
  }
</style>
<style lang="scss" scoped>
@import "../../../assets/scss/_dialog.scss"
</style>