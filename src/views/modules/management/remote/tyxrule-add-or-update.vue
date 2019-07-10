<template>
  <el-dialog
    :title="!dataForm.yxId ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
    center="center">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px"  class="set-yx-form">
      <el-form-item label="通道标识" prop="channelId" class="set-yx-form-item">
        <el-input v-model="dataForm.channelId" placeholder="通道标识" disabled></el-input>
      </el-form-item>
      <el-form-item label="设备标识" prop="equipId" class="set-yx-form-item">
        <el-input v-model="dataForm.equipId" placeholder="设备标识" disabled></el-input>
      </el-form-item>
      <el-form-item label="点位标识" prop="pointId" class="set-yx-form-item">
        <el-input v-model="dataForm.pointId" placeholder="点位标识" disabled></el-input>
      </el-form-item>
      <el-form-item label="遥信寄存器地址" prop="yxAddress" class="set-yx-form-item">
        <el-input v-model="dataForm.yxAddress" placeholder="遥信寄存器地址" disabled></el-input>
      </el-form-item>
      <el-form-item label="数据处理系数" prop="coeffcient" class="set-yx-form-item">
        <el-input-number v-model="dataForm.coeffcient" :precision="2" :step="0.1" :max="10"></el-input-number>
      </el-form-item>
      <el-form-item label="数据保存范围" prop="scope" class="set-yx-form-item">
        <el-input v-model="dataForm.scope" placeholder="数据保存范围"></el-input>
      </el-form-item>
      <el-form-item label="是否入库" prop="isSave" class="set-yx-form-item">
        <!-- <el-radio-group v-model="dataForm.isSave"> -->
          <el-radio v-model="dataForm.isSave" label="0">否</el-radio>
          <el-radio v-model="dataForm.isSave" label="1">是</el-radio>
        <!-- </el-radio-group>   -->      
      </el-form-item>
      <el-form-item label="入库步长（秒）" prop="stepSize" class="set-yx-form-item">
        <el-select v-model="dataForm.stepSize" placeholder="请选择">
          <el-option v-for="item in sOptions" :key="item.value" :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
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
        sOptions:[],
        visible: false,
        dataForm: {
          yxId: 0,
          channelId: '',
          equipId: '',
          pointId: '',
          yxAddress: '',
          coeffcient: '',
          scope: '',
          isSave: '',
          stepSize: ''
        },
        dataRule: {
          channelId: [
            { required: true, message: '通道标识不能为空', trigger: 'blur' }
          ],
          equipId: [
            { required: true, message: '设备标识不能为空', trigger: 'blur' }
          ],
          pointId: [
            { required: true, message: '点位标识不能为空', trigger: 'blur' }
          ],
          yxAddress: [
            { required: true, message: '遥信寄存器地址不能为空', trigger: 'blur' }
          ],
          coeffcient: [
            { required: true, message: '数据处理系数不能为空', trigger: 'blur' }
          ],
          scope: [
            { required: true, message: '数据保存范围不能为空', trigger: 'blur' }
          ],
          isSave: [
            { required: true, message: '是否入库（0：否：1：是）不能为空', trigger: 'blur' }
          ],
          stepSize: [
            { required: true, message: '入库步长（秒）不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    created () {
      this.$http.get('static/resource/fiveRemote.json').then(res => {
        this.sOptions = res.data.warehousingStepLength
      })
    },
    methods: {
      init (id) {
        this.dataForm.yxId = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.yxId) {
            this.$http({
              url: this.$http.adornUrl(`/base/tyxrule/info/${this.dataForm.yxId}`),
              // url: this.$http.adornUrl('/base/tyxrule/info'),
              method: 'post',
              data: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.channelId = data.tYxRule.channelId
                this.dataForm.equipId = data.tYxRule.equipId
                this.dataForm.pointId = data.tYxRule.pointId
                this.dataForm.yxAddress = data.tYxRule.yxAddress
                this.dataForm.coeffcient = data.tYxRule.coeffcient
                this.dataForm.scope = data.tYxRule.scope
                this.dataForm.isSave = data.tYxRule.isSave.toString()
                this.dataForm.stepSize = data.tYxRule.stepSize
              }
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl('/base/tyxrule/update'),
              method: 'post',
              data: this.$http.adornData({
                'yxId': this.dataForm.yxId || undefined,
                'coeffcient': this.dataForm.coeffcient,
                'scope': this.dataForm.scope,
                'isSave': this.dataForm.isSave,
                'stepSize': this.dataForm.stepSize
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false
                    this.$emit('refreshDataList')
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
.set-yx-form {
  background-color: #f0f3f3;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px 0 0 1%;
}
.set-yx-form-item >>> .el-form-item__content {
  width: 50%;
  display: flex;
  flex-direction: row;
}
.set-yx-form-item >>> .el-form-item__label {
  min-width: 180px
}
.set-yx-form-item >>> .el-select, .set-yx-form-item >>> .el-cascader, .set-yx-form-item >>> .el-input, .set-yx-form-item >>> .el-input-number {
  flex: 2
}
.set-yx-form-item >>> .el-radio{
  padding-top: 13px;
  flex: 2;
  justify-content: center;
  display: flex;
  align-items: center;
}
</style>