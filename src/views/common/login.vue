<template>
  <div class="loginBody">
    <!-- <el-row type="flex" justify="center"> -->
    <!-- <el-col :span="8"> -->
      <div class="login-main">
        <!-- <h3 class="login-title">管理员登录</h3> -->
        <div class="loginTitle"></div>
        <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" status-icon class="loginForm">
          <div class="sm_tile"><span>账号</span></div>
          <el-form-item prop="userName">
            <el-input v-model="dataForm.userName" placeholder="请输入帐号"></el-input>
          </el-form-item>
          <div class="sm_tile"><span>密码</span></div>

          <el-form-item prop="password">
            <el-input v-model="dataForm.password" type="password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <div class="sm_tile"><span>验证码</span></div>

          <el-form-item prop="captcha">
            <el-row :gutter="20">
              <el-col :span="14">
                <el-input v-model="dataForm.captcha" placeholder="请输入验证码">
                </el-input>
              </el-col>
              <el-col :span="10" class="login-captcha">
                <img :src="captchaPath" @click="getCaptcha()" alt="">
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-button class="login-btn-submit" type="primary" @click="dataFormSubmit()">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    <!-- </el-col> -->
  <!-- </el-row> -->
  </div>
  
</template>

<script>
  import { getUUID } from '@/utils'
  export default {
    data () {
      return {
        dataForm: {
          userName: '',
          password: '',
          uuid: '',
          captcha: ''
        },
        dataRule: {
          userName: [
            { required: true, message: '帐号不能为空', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '密码不能为空', trigger: 'blur' }
          ],
          captcha: [
            { required: true, message: '验证码不能为空', trigger: 'blur' }
          ]
        },
        captchaPath: ''
      }
    },
    created () {
      this.getCaptcha()
    },
    methods: {
      // 提交表单
      dataFormSubmit () {
        let sha256 = require("js-sha256").sha256
        let shaPass = sha256(this.dataForm.password)
        let sign = sha256(this.dataForm.userName+this.dataForm.uuid+this.dataForm.captcha+shaPass)
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl('/sys/login'),
              method: 'post',
              data: this.$http.adornData({
                'username': this.dataForm.userName,
                'password': sign,
                'uuid': this.dataForm.uuid,
                'captcha': this.dataForm.captcha
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.$cookie.set('token', data.token)
                this.$router.replace({ name: 'main' })
              } else {
                this.getCaptcha()
                this.$message.error(data.msg)
              }
            })
          }
        })
      },
      // 获取验证码
      getCaptcha () {
        this.dataForm.uuid = getUUID()
        this.captchaPath = this.$http.adornUrl(`/captcha.jpg?uuid=${this.dataForm.uuid}`)
      }
    }
  }
</script>

<style lang="scss">
.loginBody{
  position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;
    background:url(~@/assets/images/loginBg.jpg) no-repeat center center ;
    background-size: 100% 100%;
    -moz-background-size: 100% 100%;  
    -o-background-size: 100% 100%;  
    -webkit-background-size: 100% 100%;  
  
}
 .loginBody .login-main {
     position: absolute;
    top: 20%;
    right: 0;
    bottom: 0;
    left: 65%;
    width: 25%;
    height: 60%;
    background:url(~@/assets/images/bg2.png) no-repeat center center ;
    background-size: 100% 100%;
    -moz-background-size: 100% 100%;  
    -o-background-size: 100% 100%;  
    -webkit-background-size: 100% 100%; 
    padding:0 2.5%;
    
  }
 .loginBody .loginForm{
     /* position: absolute; */
    margin-top: 7.5%;
  }
  .loginBody .sm_tile{
     /* padding-left: 10%; */
    margin:  2% 0;
  }
  .loginBody .sm_tile span{
    color: white;
    font-size: 1vw;
  }
  .loginBody .el-form-item__error {
    line-height: 1.5;
}
  .loginBody .el-input__inner{
        background-color: rgba(256, 256, 256, 0);
        border: none;
        border-bottom: 1px solid white;
        width: 100%;
        color: #fff;
  }
  .loginBody .el-input{
    text-align: center;
  }
  .loginBody .el-input__inner:hover{
    border: none;
         /* border-bottom: 1px solid white; */
    border-bottom:1px #c0c4cc solid;
  }
  /* .login-title {
    font-size: 16px;
    // position: absolute;
  } */
  .loginBody .loginTitle{
     /* position: absolute; */
    margin-top: 7.5%;
    display: block;
    width: 100%;
    height: 7.5%;
    background:url(~@/assets/images/pic2.png) no-repeat 10% center ;
  }
  .loginBody .login-captcha {
    overflow: hidden;
    > img {
      width: 100%;
      cursor: pointer;
    }
  }
  .loginBody .login-btn-submit {
    width: 100%;
    margin-top: 38px;
  }
</style>
