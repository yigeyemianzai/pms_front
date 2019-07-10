<template>
  <el-dialog
    :title="!dataForm.ytId ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
    center="center">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px" class="set-yt-form">
    <el-form-item label="通道标识" prop="channelId" class="set-yt-form-item">
      <el-input v-model="dataForm.channelId" placeholder="通道标识"></el-input>
    </el-form-item>
    <el-form-item label="设备标识" prop="equipId" class="set-yt-form-item">
      <el-input v-model="dataForm.equipId" placeholder="设备标识"></el-input>
    </el-form-item>
    <el-form-item label="点位标识" prop="pointId" class="set-yt-form-item">
      <el-input v-model="dataForm.pointId" placeholder="点位标识"></el-input>
    </el-form-item>
    <el-form-item label="遥调地址" prop="ytAddress" class="set-yt-form-item">
      <el-input v-model="dataForm.ytAddress" placeholder="遥调地址"></el-input>
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
          ytId: 0,
          channelId: '',
          equipId: '',
          pointId: '',
          ytAddress: ''
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
          ytAddress: [
            { required: true, message: '遥调地址不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.ytId = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.ytId) {
            this.$http({
              url: this.$http.adornUrl(`/base/tytrule/info/${this.dataForm.ytId}`),
              // url: this.$http.adornUrl('/base/tytrule/info'),
              method: 'post',
              data: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.channelId = data.tYtRule.channelId
                this.dataForm.equipId = data.tYtRule.equipId
                this.dataForm.pointId = data.tYtRule.pointId
                this.dataForm.ytAddress = data.tYtRule.ytAddress
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
              url: this.$http.adornUrl(`/base/tytrule/${!this.dataForm.ytId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'ytId': this.dataForm.ytId || undefined,
                'channelId': this.dataForm.channelId,
                'equipId': this.dataForm.equipId,
                'pointId': this.dataForm.pointId,
                'ytAddress': this.dataForm.ytAddress
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
.set-yt-form {
  background-color: #f0f3f3;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px 0 0 1%;
}
.set-yt-form-item >>> .el-form-item__content {
  width: 50%;
  display: flex;
  flex-direction: row;
}
.set-yt-form-item >>> .el-form-item__label {
  min-width: 180px
}
.set-yt-form-item >>> .el-select, .set-yt-form-item >>> .el-cascader, .set-yt-form-item >>> .el-input, .set-yt-form-item >>> .el-input-number, .set-yt-form-item >>> .el-radio {
  flex: 2
}
 .set-yt-form-item >>> .el-radio {
   display: inline;
 }
</style>