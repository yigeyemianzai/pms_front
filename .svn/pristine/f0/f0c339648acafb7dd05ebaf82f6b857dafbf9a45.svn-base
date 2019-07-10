<template>
  <el-dialog
    :title="!dataForm.ykId ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
    center="center">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px" class="set-yk-form">
      <el-form-item label="通道标识" prop="channelId" class="set-yk-form-item">
        <el-input v-model="dataForm.channelId" placeholder="通道标识"></el-input>
      </el-form-item>
      <el-form-item label="设备标识" prop="equipId" class="set-yk-form-item">
        <el-input v-model="dataForm.equipId" placeholder="设备标识"></el-input>
      </el-form-item>
      <el-form-item label="点位标识" prop="pointId" class="set-yk-form-item">
        <el-input v-model="dataForm.pointId" placeholder="点位标识"></el-input>
      </el-form-item>
      <el-form-item label="遥控地址" prop="ykAddress" class="set-yk-form-item">
        <el-input v-model="dataForm.ykAddress" placeholder="遥控地址"></el-input>
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
          ykId: 0,
          channelId: '',
          equipId: '',
          pointId: '',
          ykAddress: ''
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
          ykAddress: [
            { required: true, message: '遥控地址不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.ykId = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.ykId) {
            this.$http({
              url: this.$http.adornUrl(`/base/tykrule/info/${this.dataForm.ykId}`),
              // url: this.$http.adornUrl('/base/tykrule/info'),
              method: 'post',
              data: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.channelId = data.tYkRule.channelId
                this.dataForm.equipId = data.tYkRule.equipId
                this.dataForm.pointId = data.tYkRule.pointId
                this.dataForm.ykAddress = data.tYkRule.ykAddress
              }
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        console.log(this.dataForm)
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/base/tykrule/${!this.dataForm.ykId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'ykId': this.dataForm.ykId || undefined,
                'channelId': this.dataForm.channelId,
                'equipId': this.dataForm.equipId,
                'pointId': this.dataForm.pointId,
                'ykAddress': this.dataForm.ykAddress
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
.set-yk-form {
  background-color: #f0f3f3;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px 0 0 1%;
}
.set-yk-form-item >>> .el-form-item__content {
  width: 50%;
  display: flex;
  flex-direction: row;
}
.set-yk-form-item >>> .el-form-item__label {
  min-width: 180px
}
.set-yk-form-item >>> .el-select, .set-yk-form-item >>> .el-cascader, .set-yk-form-item >>> .el-input, .set-yk-form-item >>> .el-input-number {
  flex: 2
}
</style>