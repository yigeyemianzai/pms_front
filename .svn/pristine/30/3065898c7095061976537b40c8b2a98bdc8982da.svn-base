<template>
  <el-dialog
    :title="!dataForm.menuId ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
    :lock-scroll="true"
    center="center"
    width="27.66%"
    class="rdialog">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" class="rel-form">
      <el-form-item label="关联资源" prop="resId" class="rel-form-item">
      <el-popover
        ref="resListPopover"
        placement="bottom-start"
        v-model="popuresvisible"
        trigger="click">
        <el-tree
          :data="resList"
          :props="resListTreeProps"
          node-key="resId"
          ref="resListTree"
          @current-change="resListTreeCurrentChangeHandle"
          :default-expand-all="true"
          :highlight-current="true"
          :expand-on-click-node="false">
        </el-tree>
      </el-popover>
      <el-input v-model="dataForm.resName" v-popover:resListPopover :readonly="true" clearable @clear='clearResName'></el-input>
    </el-form-item>
    <el-form-item label="菜单名称" prop="name" class="rel-form-item">
      <el-input v-model="dataForm.name" placeholder="菜单名称"></el-input>
    </el-form-item>
    <el-form-item label="角色所属机构" class="rel-form-item" prop="orgName1">
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
      <el-input v-model="dataForm.orgName1" v-popover:orgListPopover1 placeholder="所属组织机构" :readonly="true" clearable @clear='clearOrgName1' @focus="getOrgTree"></el-input>
    </el-form-item>
    <el-form-item label="所属角色" prop="roleId" class="rel-form-item">
      <el-select v-model="dataForm.roleId" clearable @clear="clearRoleName" placeholder="请选择角色" :disabled="isDisabled">
        <el-option
          v-for="item in roleTypes"
          :key="item.roleId"
          :label="item.roleName"
          :value="item.roleId">
        </el-option>
      </el-select>
    </el-form-item>   
    <!-- <el-form-item label="图标" prop="icon" class="rel-form-item">
      <el-input v-model="dataForm.icon" placeholder="图标"></el-input>
    </el-form-item> -->
    <el-form-item label="图标" prop="icon" class="rel-form-item">        
      <el-popover
        placement="left-start"
        width="540"
        trigger="click"
        @show="$refs.icons.reset()"
        popper-class="popper-class">
        <icons ref="icons" @selected='selectedIcon'></icons>
        <el-input slot="reference" placeholder="请输入内容" readonly v-model="dataForm.icon" style="cursor: pointer;">
        <!-- <template slot="prepend"><i class="fas" :class="['fa-' + dataForm.menu_icon]"></i></template> -->
        <template slot="prepend"><i :class="dataForm.icon"></i></template>
        </el-input>
      </el-popover>
    </el-form-item>
    <el-form-item label="上级菜单" prop="parentId" class="rel-form-item">
      <el-popover
        ref="menuListPopover"
        placement="bottom-start"
        v-model="popumenuvisible"
        trigger="click">
        <el-tree
          :data="menuList"
          :props="menuListTreeProps"
          node-key="menuId"
          ref="menuListTree"
          @current-change="menuListTreeCurrentChangeHandle"
          :default-expand-all="true"
          :highlight-current="true"
          :expand-on-click-node="false">
        </el-tree>
      </el-popover>
      <el-input v-model="dataForm.parentName" v-popover:menuListPopover clearable @clear='clearParentName'></el-input>
    </el-form-item>
    <el-form-item label="排序" prop="sortNo" class="rel-form-item">
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
import icons from '@/components/icons/icons.vue'
  export default {
    data () {
      return {
        isDisabled: true,
        orgList: [],
        orgListTreeProps: {
          label: 'orgName',
          children: 'children'
        },
        popuvisible1: false,
        visible: false,
        dataForm: {
          menuId: 0,
          roleId: null,
          resId: null,
          resName: null,
          name: null,
          icon: null,
          parentId: null,
          parentName: null,
          sortNo: null,
          orgId1: null,
          orgName1: null,
          leaf: null
        },
        roleTypes: [],
        menuList: [],
        menuListTreeProps: {
          label: 'name',
          children: 'children'
        },
        resList: [],
        resListTreeProps: {
          label: 'resName',
          children: 'children'
        },
        popuresvisible: false,
        popumenuvisible: false,
        dataRule: {
          resId: [
            { required: true, message: '关联资源不能为空', trigger: 'change' }
          ],
          name: [
            { required: true, message: '菜单名称不能为空', trigger: 'blur' }
          ],
          parentName: [
            { required: true, message: '上级菜单标识不能为空', trigger: 'change' }
          ],
          roleId: [
            { required: true, message: '角色不能为空', trigger: 'blur' }
          ],
          orgName1: [
            { required: true, message: '', trigger: 'change' }
          ]
        }
      }
    },
    components: {
      icons
    },
    methods: {
      // 选择图标
      selectedIcon (name) {
        this.dataForm.icon = name
      },
      // 角色-组织机构菜单树选中
      orgListTreeCurrentChangeHandle1 (data, node) {
        this.popuvisible1 = false
        this.dataForm.orgId1 = data.orgId
        this.dataForm.orgName1 = data.orgName
        this.getRoleList(data.orgId)
        this.clearRoleName()
      },
      // 角色-菜单树设置当前选中节点
      orgListTreeSetCurrentNode1 () {
        if (this.dataForm.orgId1) {
          this.$refs.orgListTree1.setCurrentKey(this.dataForm.orgId1)
          this.dataForm.orgName1 = (this.$refs.orgListTree1.getCurrentNode() || {})['orgName']
          this.getRoleList(this.dataForm.orgId1)
        }
      },
      clearOrgName1 () {
        this.dataForm.orgId1 = null
        this.dataForm.orgName1 = null
      },
      clearRoleName () {
        this.dataForm.roleId = null
        // this.roleTypes = []
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
              this.orgListTreeSetCurrentNode1()
            })
          } else {
            this.$message.error(data.msg)
          }
        })
      },
      init (id=null,parentId=null,roleId=null,orgId=null,orgList,orgName,roleTypes) {
        // console.log("parentId="+parentId)
        // console.log(roleId)
        this.roleTypes = roleTypes
        this.dataForm.menuId = id || 0
        this.visible = true
        this.isDisabled = true
        this.$nextTick(() => {
            this.$refs['dataForm'].resetFields()
            this.dataForm.resId = null
            this.dataForm.parentId = null
            this.dataForm.parentName = null
            this.dataForm.resId = null
            this.dataForm.resName = null
            this.dataForm.orgId1 = null
            this.dataForm.orgName1 = null
            this.dataForm.name = null
          })
        this.$http({
          url: this.$http.adornUrl('/sys/resinfo/list'),
          method: 'get',
          params: this.$http.adornParams({
            isValid: '1'   // 0 不显示虚节点； 1显示虚节点
          })
        }).then(({data}) => {
          this.resList = data.list
        }).then(() => {          
            this.$http({
              url: this.$http.adornUrl('/sys/menu/list'),
              method: 'get',
              params: this.$http.adornParams({
                'roleId': roleId.toString()
              })
            }).then(({data}) => {
              this.menuList = data
            }).then(() => {
              if (this.dataForm.menuId) {
                // 修改
                this.$http({
                  url: this.$http.adornUrl(`/sys/menu/info/${this.dataForm.menuId}`),
                  method: 'get',
                  params: this.$http.adornParams()
                }).then(({data}) => {
                  this.isDisabled = false
                  if (data && data.code === 0) {
                    this.dataForm.roleId = data.sysMenu.roleId
                    this.dataForm.resId = data.sysMenu.resId
                    this.dataForm.name = data.sysMenu.name
                    this.dataForm.icon = data.sysMenu.icon
                    this.dataForm.parentId = data.sysMenu.parentId
                    this.dataForm.parentName = data.sysMenu.parentName
                    this.dataForm.sortNo = data.sysMenu.sortNo
                    this.getRoleList(data.sysMenu.orgId)
                    this.dataForm.orgId1 = data.sysMenu.orgId
                    this.dataForm.orgName1 = data.sysMenu.orgName
                    this.resListTreeSetCurrentNode(data.sysMenu.name)
                    this.menuListTreeSetCurrentNode()
                    this.dataForm.leaf = data.sysMenu.leaf
                    
                  }
                })
              }else{
                // if(roleId){
                //   this.dataForm.roleId = roleId
                // }else{
                //   var userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
                //   this.dataForm.roleId = userInfo.roleId
                // }
                if(parentId){
                  this.dataForm.parentId = parentId
                  this.$http({
                    url: this.$http.adornUrl(`/sys/menu/info/${parentId}`),
                    method: 'get',
                    params: this.$http.adornParams()
                  }).then(({data}) => {
                    this.isDisabled = false
                    if (data && data.code === 0) {
                      this.dataForm.roleId = data.sysMenu.roleId
                      this.getRoleList(data.sysMenu.orgId)
                      this.dataForm.orgId1 = data.sysMenu.orgId
                      this.dataForm.orgName1 = data.sysMenu.orgName
                      this.resListTreeSetCurrentNode()
                      this.menuListTreeSetCurrentNode()
                    }
                  })
                  for(var index in this.menuList){
                    if(parentId == this.menuList[index].menuId) {
                      this.dataForm.parentName = this.menuList[index].name
                    }else{
                      var childrenList = this.menuList[index].children
                      for(var k in childrenList){
                        if(parentId == childrenList[k].menuId) {
                          this.dataForm.parentName = childrenList[k].name
                        }
                      }
                    }
                  }
                } else {
                  this.isDisabled = false
                  this.orgList = orgList
                  this.$nextTick(() => {
                    this.dataForm.orgName1 = orgName
                  })
                  this.dataForm.roleId = roleId
                }
              }
            })
          
        })
      },
      // 菜单树选中
      menuListTreeCurrentChangeHandle (data, node) {
        this.popumenuvisible = false
        this.dataForm.parentId = data.menuId
        this.dataForm.parentName = data.name
      },
      // 菜单树设置当前选中节点
      menuListTreeSetCurrentNode () {
        if (this.dataForm.parentId != '-1') {
          // console.log(this.dataForm.parentId)
          this.$refs.menuListTree.setCurrentKey(this.dataForm.parentId)
          this.dataForm.parentName = (this.$refs.menuListTree.getCurrentNode() || {})['name']
          // console.log(this.dataForm.parentName)
        }
      },
      // 菜单树选中
      resListTreeCurrentChangeHandle (data, node) {
        this.popuresvisible = false
        this.dataForm.resId = data.resId
        this.dataForm.resName = data.resName
        this.dataForm.name = this.dataForm.resName
      },
      // 菜单树设置当前选中节点
      resListTreeSetCurrentNode (name) {
        if (this.dataForm.resId) {
          this.$refs.resListTree.setCurrentKey(this.dataForm.resId)
          this.dataForm.resName = (this.$refs.resListTree.getCurrentNode() || {})['resName']
          if(name) {
            this.dataForm.name = name
          } else {
            this.dataForm.name = this.dataForm.resName 
          }                  
        }
      },
      clearParentName () {
        this.dataForm.parentId = null
        this.dataForm.parentName = null
      },
      clearResName () {
        this.dataForm.resId = null
        this.dataForm.resName = null
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/sys/menu/${!this.dataForm.menuId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'menuId':this.dataForm.menuId || undefined,
                'roleId':this.dataForm.roleId,
                'resId':this.dataForm.resId,
                'name':this.dataForm.name,
                'icon':this.dataForm.icon,
                'parentId':this.dataForm.parentId,
                'sortNo':this.dataForm.sortNo,
                'leaf': this.dataForm.leaf
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
<style scoped>
  .el-popover{
    height: 500px;
  }
</style>
<style lang="scss" scoped>
@import "../../../assets/scss/_dialog.scss"
</style>