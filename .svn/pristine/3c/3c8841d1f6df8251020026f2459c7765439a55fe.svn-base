<template>
  <el-dialog
    :title="!dataForm.resId ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
    center="center"
    width="27.66%"
    class="rdialog">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" class="rel-form">
    <el-form-item label="资源名称" prop="resName" class="rel-form-item">
      <el-input v-model="dataForm.resName" placeholder="资源名称"></el-input>
    </el-form-item>
    <el-form-item label="资源路径" prop="url" class="rel-form-item">
      <el-input v-model="dataForm.url" placeholder="资源路径" :disabled="isDisabled"></el-input>
    </el-form-item>
    <el-form-item label="是否为虚节点" prop="valid" class="rel-form-item">
      <el-radio v-model="dataForm.valid" label="false">否</el-radio>
      <el-radio v-model="dataForm.valid" label="true">是</el-radio>
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
        <template slot="prepend"><i :class="dataForm.icon"></i></template>
        </el-input>
      </el-popover>
    </el-form-item>
    <el-form-item label="上级资源" prop="parentName" class="rel-form-item">
      <el-popover
        ref="resListPopover"
        placement="bottom-start"
        v-model="popuresuvisible"
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
      <el-input v-model="dataForm.parentName" v-popover:resListPopover placeholder="上级资源" clearable @clear='clearParentName'></el-input>
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
import icons from '@/components/icons/icons.vue'
  export default {
    data () {
      return {
        visible: false,
        popuresuvisible: false,
        dataForm: {
          resId: 0,
          resName: null,
          icon: null,
          url: null,
          valid:"false",
          parentId: null,
          parentName: null,
          sortNo: null,
          leaf: null
        },
        resList: [],
        isDisabled: false,
        resListTreeProps: {
          label: 'resName',
          children: 'children'
        },
        dataRule: {
          resName: [
            { required: true, message: '资源名称不能为空', trigger: 'blur' }
          ],
          url: [
            { required: false, message: '资源路径不能为空', trigger: 'blur' }
          ],
          parentId: [
            { required: true, message: '上级资源标识不能为空', trigger: 'change' }
          ],
          sortNo: [
            { required: true, message: '排序不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    watch: {
      'dataForm.valid': function(val){
        if(val == 'true') {
          this.isDisabled = true
          this.dataForm.url = null
        } else {
          this.isDisabled = false
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
      init (id=null,parentId=null) {
        this.dataForm.resId = id || 0
        this.dataForm.parentId = parentId || 0
        this.visible = true
        this.$http({
          url: this.$http.adornUrl('/sys/resinfo/list'),
          method: 'get',
          params: this.$http.adornParams({
            isValid: '1'   // 0 不显示虚节点； 1显示虚节点
          })
        }).then(({data}) => {
          this.resList = data.list
        }).then(() => {
          this.visible = true
          this.$nextTick(() => {
            this.$refs['dataForm'].resetFields()
            this.dataForm.parentId = null
            this.dataForm.parentName = null
          })
        }).then(() => {
          if (this.dataForm.resId) {
            // 修改
            this.$http({
              url: this.$http.adornUrl(`/sys/resinfo/info/${this.dataForm.resId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.resName = data.sysResInfo.resName
                this.dataForm.icon = data.sysResInfo.icon
                this.dataForm.url = data.sysResInfo.url
                this.dataForm.valid = data.sysResInfo.valid==true?"true":"false"
                this.dataForm.parentId = data.sysResInfo.parentId
                this.dataForm.sortNo = data.sysResInfo.sortNo
                this.dataForm.leaf = data.sysResInfo.leaf
                this.resListTreeSetCurrentNode()
              }
            })
          } 
          if ( parentId ) {
            this.dataForm.parentId = parentId
            for(var index in this.resList){
              if(parentId == this.resList[index].resId) {
                this.dataForm.parentName = this.resList[index].resName
              }else{
                var childrenList = this.resList[index].children
                for(var k in childrenList){
                  if(parentId == childrenList[k].resId) {
                    this.dataForm.parentName = childrenList[k].resName
                  }
                }
              }
            }
          }
        })
      },
      // 菜单树选中
      resListTreeCurrentChangeHandle (data, node) {
        this.popuresuvisible = false
        this.dataForm.parentId = data.resId
        this.dataForm.parentName = data.resName
      },
      // 菜单树设置当前选中节点
      resListTreeSetCurrentNode () {
        if (this.dataForm.parentId) {
          this.$refs.resListTree.setCurrentKey(this.dataForm.parentId)
          this.dataForm.parentName = (this.$refs.resListTree.getCurrentNode() || {})['resName']
        }
      },
      clearParentName () {
        this.dataForm.parentId = null
        this.dataForm.parentName = null
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            if (this.dataForm.resId && this.dataForm.parentId === this.dataForm.resId) {
              this.$message({
                message: '上级资源不能是其自身！',
                type: 'warning'
              });
              return
            }
            this.$http({
              url: this.$http.adornUrl(`/sys/resinfo/${!this.dataForm.resId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'resId': this.dataForm.resId || undefined,
                'resName': this.dataForm.resName,
                'icon': this.dataForm.icon,
                'url': this.dataForm.url,
                'valid': this.dataForm.valid,
                'parentId': this.dataForm.parentId,
                'sortNo': this.dataForm.sortNo,
                'leaf': this.dataForm.leaf,
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

