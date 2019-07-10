<template>
  <el-dialog
    :title="!dataForm.orgId ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
    center="center"
    width="39.27%"
    class="ldialog">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" class="rel-form">
      <div class="rel-form-column">
        <el-form-item label="组织机构名称" prop="orgName" class="rel-form-item-row">
          <el-input v-model="dataForm.orgName" placeholder="组织机构名称"></el-input>
        </el-form-item>
        <el-form-item label="名称简称" prop="orgShortName" class="rel-form-item-row">
          <el-input v-model="dataForm.orgShortName" placeholder="名称简称"></el-input>
        </el-form-item>
      </div>
      <div class="rel-form-column">        
        <el-form-item label="上级组织机构" prop="parentName" class="rel-form-item-row">
          <el-popover
            ref="orgListPopover"
            placement="bottom-start"
            v-model="popuvisible"
            trigger="click"
            :disabled="isRootUnit">
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
          <el-input v-model="dataForm.parentName" v-popover:orgListPopover placeholder="上级组织机构" :disabled="isRootUnit" clearable @clear='clearParentName'></el-input>
        </el-form-item>
        <el-form-item label="区域编号" prop="districtCode" class="rel-form-item-row">
          <el-cascader
            :options="districtCodeOptions"
            v-model="dataForm.districtCode"
            @click.native="getDistrictCode()"
            :loading="districtCodeLoading"
          ></el-cascader>
        </el-form-item>
      </div>   
      <div class="rel-form-column">
        <el-form-item label="是否入网单位" class="rel-form-item-row">
          <el-switch v-model="isRootUnit" @change="rootSelectChange"></el-switch>
        </el-form-item>       
        <el-form-item label="排序" prop="sortNo" class="rel-form-item-row">
          <el-input-number v-model="dataForm.sortNo" controls-position="right" :min="0" label="排序号"></el-input-number>
        </el-form-item>
      </div> 
      <div class="rel-form-column">
        <el-form-item label="业务对象类型" prop="busObjType" class="bus-type">
          <el-checkbox-group v-model="checkedEqList" placeholder="业务对象类型">
            <el-checkbox v-for="eqtype in eqtypeList" :label="eqtype.code" :key="eqtype.code">{{eqtype.codeName}}</el-checkbox>
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
  export default {
    data () {
      return {
        districtCodeLoading: true,
        // 行政区域编码
        districtCodeOptions: [],
        visible: false,
        popuvisible: false,
        checkedEqList: [],
        eqtypeList: [],
        isRootUnit: false,
        dataForm: {
          orgId: null,
          orgName: null,
          orgShortName: null,
          busObjType: 0,
          parentId: null,
          parentName: null,
          sortNo: null,
          districtCode: null
        },
        dataRule: {
          orgName: [
            { required: true, message: '组织机构名称不能为空', trigger: 'blur' }
          ],
          orgShortName: [
            { required: true, message: '名称简称不能为空', trigger: 'blur' }
          ],
          busObjType: [
            { required: true, message: '业务对象类型', trigger: 'blur' }
          ],
          /* parentName: [
            { required: false, message: '上级组织机构不能为空', trigger: 'blur' }
          ], */
          sortNo: [
            { required: true, message: '排序不能为空', trigger: 'blur' }
          ],
          districtCode: [
            {required: true, message: '区域编号不能为空', trigger: 'change' }
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
      // 获取行政区域编码
      getDistrictCode () {
        this.$http.get('static/resource/region.json').then(res => {
          this.districtCodeOptions = res.data.list
          this.districtCodeLoading = false
        })    
      },
      init (id=null,parentId=null) {
        this.dataForm.orgId = id || 0
        this.visible = true
        this.checkedEqList = []
        this.eqtypeList = []
        this.isRootUnit = false
        this.$http({
          url: this.$http.adornUrl('/sys/org/getCurnUserManSysOrgTree'),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          this.orgList = data.data
        }).then(() => {
          this.visible = true
          this.$nextTick(() => {
            this.$refs['dataForm'].resetFields()
            this.dataForm.parentId = null
            this.dataForm.parentName = null
          })
        }).then(() => {
          if (!this.dataForm.orgId) {
            // 新增
            if(parentId){
              this.dataForm.parentId = parentId
              this.orgListTreeSetCurrentNode()
              this.getBusObjsByOrgId(parentId)
            }else{
              this.getCurnUserBusObjs()
            }
          } else {
            // 修改            
            this.$http({
              url: this.$http.adornUrl(`/sys/org/info/${this.dataForm.orgId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.$http.get('static/resource/region.json').then(res => {
                  this.districtCodeOptions = res.data.list
                  this.districtCodeLoading = false
                }).then(() => {
                  this.$http({
                    url: this.$http.adornUrl('/admin/tstation/update/region'),
                    method: 'post',
                    data: this.$http.adornData({
                      regId: data.sysOrg.regId
                    })
                  }).then(({data}) => {
                    if (data && data.code === 0) {
                      this.dataForm.districtCode = data.list
                    }else {
                      this.dataForm.districtCode = []
                    }
                  })
                })
                this.dataForm.orgName = data.sysOrg.orgName
                this.dataForm.orgShortName = data.sysOrg.orgShortName
                this.dataForm.busObjType = data.sysOrg.busObjType
                this.dataForm.parentId = data.sysOrg.parentId
                this.dataForm.sortNo = data.sysOrg.sortNo
                this.eqtypeList = data.permitBusObjsList
                this.orgListTreeSetCurrentNode()
                for (var i=0;i<data.busObjsList.length;i++) {
                  this.checkedEqList.push(data.busObjsList[i].code)
                }
                if(this.dataForm.parentId === this.ROOT_ORG_ID){
                  this.isRootUnit = true
                }else{
                  this.isRootUnit = false
                }
                this.rootSelectChange(this.isRootUnit)
              }
            })
          }
        })
      },
      // 菜单树选中
      orgListTreeCurrentChangeHandle (data, node) {
        this.popuvisible = false
        this.dataForm.parentName = data.orgName
        this.dataForm.parentId = data.orgId
        this.getBusObjsByOrgId(data.orgId)
      },
      // 菜单树设置当前选中节点
      orgListTreeSetCurrentNode () {
        if (this.dataForm.parentId) {
          if(this.dataForm.parentId != this.ROOT_ORG_ID){
            this.$refs.orgListTree.setCurrentKey(this.dataForm.parentId)
            this.dataForm.parentName = (this.$refs.orgListTree.getCurrentNode() || {})['orgName']
          }
        }
      },
      clearParentName () {
        this.dataForm.parentId = null
        this.dataForm.parentName = null
      },
      rootSelectChange (value) {
        // this.dataRule.parentName[0].required = !value
        if(value){
          this.dataForm.parentId = -1
          this.dataForm.parentName = null
        }else{

        }
      },
      // 表单提交
      dataFormSubmit () {
        console.log(this.dataForm)
        var objs = 0
        for (var k = 0; k < this.checkedEqList.length; k++) {
          objs = objs | this.checkedEqList[k]
        }
        this.dataForm.busObjType = objs
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            if (this.dataForm.orgId && this.dataForm.parentId === this.dataForm.orgId) {
              this.$message({
                message: '上级组织不能是其自身！',
                type: 'warning'
              });
              return
            }
            this.$http({
              url: this.$http.adornUrl(`/sys/org/${!this.dataForm.orgId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'orgId': this.dataForm.orgId || undefined,
                'orgName': this.dataForm.orgName,
                'orgShortName': this.dataForm.orgShortName,
                'busObjType': this.dataForm.busObjType,
                'parentId': this.dataForm.parentId,
                'sortNo': this.dataForm.sortNo,
                'regId':this.dataForm.districtCode[this.dataForm.districtCode.length -1]
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
      },
      getBusObjsByOrgId (orgId) {
        this.$http({
          url: this.$http.adornUrl(`/sys/org/busObjs/${orgId}`),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.eqtypeList = data.busObjsList
            this.checkedEqList = []
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
      }
    }
  }
</script>
<style lang="scss" scoped>
@import "../../../assets/scss/_dialog.scss"
</style>
<style scoped>
.rel-form-column .bus-type {
  width: 100%;
}
.rel-form-column .bus-type >>> .el-form-item__label{
  width: 18%;
}
.rel-form-column .bus-type >>> .el-form-item__content{
  width: 75%;
}
.rel-form-column .bus-type >>> .el-checkbox {
  margin-left: 0;
  margin-right: 30px
}
</style>

