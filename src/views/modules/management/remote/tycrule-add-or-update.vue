<template>
  <el-dialog
    :title="!dataForm.ycId ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
    center="center"
    width="27.66%"
    class="rdialog">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()"  class="rel-form">
      <el-form-item label="通道标识" prop="channelId" class="rel-form-item">
        <el-input v-model="dataForm.channelId" placeholder="通道标识" disabled></el-input>
      </el-form-item>
      <el-form-item label="设备标识" prop="equipId" class="rel-form-item">
        <el-input v-model="dataForm.equipId" placeholder="设备标识" disabled></el-input>
      </el-form-item>
      <el-form-item label="点位标识" prop="pointId" class="rel-form-item">
        <el-input v-model="dataForm.pointId" placeholder="点位标识" disabled></el-input>
      </el-form-item>
      <el-form-item label="遥测地址" prop="ycAddress" class="rel-form-item">
        <el-input v-model="dataForm.ycAddress" placeholder="遥测地址" disabled></el-input>
      </el-form-item>
      <el-form-item label="数据处理系数" prop="coeffcient" class="rel-form-item">
        <el-input-number v-model="dataForm.coeffcient" :precision="2" :step="0.1" :max="10" controls-position="right"></el-input-number>
      </el-form-item>
      <el-form-item label="数据保存范围" prop="scope" class="rel-form-item">
        <el-input v-model="dataForm.scope" placeholder="数据保存范围" type="number"></el-input>
      </el-form-item>
      <el-form-item label="是否入库" prop="isSave" class="rel-form-item">
        <el-radio v-model="dataForm.isSave" label="0">否</el-radio>
        <el-radio v-model="dataForm.isSave" label="1">是</el-radio>
      </el-form-item>
      <el-form-item label="入库步长（秒）" prop="stepSize" class="rel-form-item">
        <el-select v-model="dataForm.stepSize" placeholder="请选择">
          <el-option v-for="item in sOptions" :key="item.value" :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="一般等级越上限阀值" prop="generalUpLimit" class="rel-form-item">
        <el-input v-model="dataForm.generalUpLimit" placeholder="一般等级越上限阀值" type="number"></el-input>
      </el-form-item>
      <el-form-item label="一般等级越下限阀值" prop="generalDownLimit" class="rel-form-item">
        <el-input v-model="dataForm.generalDownLimit" placeholder="一般等级越下限阀值" type="number"></el-input>
      </el-form-item>
      <el-form-item label="严重等级越上限" prop="severityUpLimit" class="rel-form-item">
        <el-input v-model="dataForm.severityUpLimit" placeholder="严重等级越上限" type="number"></el-input>
      </el-form-item>
      <el-form-item label="严重等级越下限" prop="severityDownLimit" class="rel-form-item">
        <el-input v-model="dataForm.severityDownLimit" placeholder="严重等级越下限" type="number"></el-input>
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
          ycId: '',
          channelId: 0,
          equipId: '',
          pointId: '',
          ycAddress: '',
          coeffcient: '',
          scope: '',
          isSave: '',
          stepSize: '1',
          generalUpLimit: '',
          generalDownLimit: '',
          severityUpLimit: '',
          severityDownLimit: ''
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
          ycAddress: [
            { required: true, message: '遥测地址不能为空', trigger: 'blur' }
          ],
          coeffcient: [
            { required: true, message: '数据处理系数不能为空', trigger: 'blur' }
          ],
          scope: [
            { required: true, message: '数据保存范围不能为空', trigger: 'blur' }
          ],
          isSave: [
            { required: true, message: '是否入库不能为空', trigger: 'blur' }
          ],
          stepSize: [
            { required: true, message: '入库步长（秒）不能为空', trigger: 'blur' }
          ],
          generalUpLimit: [
            { required: false, message: '一般等级越上限阀值不能为空', trigger: 'blur' }
          ],
          generalDownLimit: [
            { required: false, message: '一般等级越下限阀值不能为空', trigger: 'blur' }
          ],
          severityUpLimit: [
            { required: false, message: '严重等级越上限不能为空', trigger: 'blur' }
          ],
          severityDownLimit: [
            { required: false, message: '严重等级越下限不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    created () {
      //数据获取必修从后台接口获得，不能前端写死，必须修改
      this.$http.get('static/resource/fiveRemote.json').then(res => {
        this.sOptions = res.data.warehousingStepLength
      })
    },
    methods: {
      init (id) {
        this.dataForm.ycId = id || 0
        this.visible = true
        this.$nextTick(() => {
          console.log(this.dataForm.ycId)
          if (this.dataForm.ycId) {
            this.$http({
              url: this.$http.adornUrl(`/base/tycrule/info/${this.dataForm.ycId}`),
              // url: this.$http.adornUrl('/generator/tycrule/info'),
              method: 'post',
              data: this.$http.adornData()
            }).then(({
              data
            }) => {
              if (data && data.code === 0) {
                this.dataForm.channelId = data.tYcRule.channelId                  
                this.dataForm.equipId = data.tYcRule.equipId
                this.dataForm.pointId = data.tYcRule.pointId
                this.dataForm.ycAddress = data.tYcRule.ycAddress
                this.dataForm.coeffcient = data.tYcRule.coeffcient
                this.dataForm.scope = data.tYcRule.scope
                this.dataForm.isSave = data.tYcRule.isSave.toString()
                this.dataForm.stepSize = data.tYcRule.stepSize
                this.dataForm.generalUpLimit = data.tYcRule.generalUpLimit
                this.dataForm.generalDownLimit = data.tYcRule.generalDownLimit
                this.dataForm.severityUpLimit = data.tYcRule.severityUpLimit
                this.dataForm.severityDownLimit = data.tYcRule.severityDownLimit
              }
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            console.log(this.dataForm)
            this.$http({
              url: this.$http.adornUrl(`/base/tycrule/${!this.dataForm.ycId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'ycId': this.dataForm.ycId || undefined,
                'channelId': this.dataForm.channelId,
                'equipId': this.dataForm.equipId,
                'pointId': this.dataForm.pointId,
                'ycAddress': this.dataForm.ycAddress,
                'coeffcient': this.dataForm.coeffcient,
                'scope': this.dataForm.scope,
                'isSave': this.dataForm.isSave,
                'stepSize': this.dataForm.stepSize,
                'generalUpLimit': this.dataForm.generalUpLimit,
                'generalDownLimit': this.dataForm.generalDownLimit,
                'severityUpLimit': this.dataForm.severityUpLimit,
                'severityDownLimit': this.dataForm.severityDownLimit
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
  /* .dialogDiv >>> .el-form-item__label {
    width: 40% !important;
    padding-right: 20px;
  }   
  .el-dialog form {
    background-color: #f0f3f3;
    border-radius: 5px;
    padding: 30px 0  ;
  }
  .el-dialog form >>> .el-input{
    width: 100%;
  }
  .dialogDiv >>>.el-form-item{
    width: 49%;
    display: inline-block;
  }
  .el-input-number{
    width: 220px;
  } */
</style>
