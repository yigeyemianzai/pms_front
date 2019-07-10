<template>
    <div class="data_estatisctic">
      <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
        <el-form-item>
          <el-input v-model="dataForm.userName" placeholder="输入搜索条件" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <!-- 组织机构连级 -->
          <el-cascader :options="options1" v-model="selectedOptions1" @change="handleChange1" change-on-select>
          </el-cascader>
        </el-form-item>
        <el-form-item>
          <el-button @click="getDataList()">查询</el-button>
          <el-button v-if="isAuth('sys:user:save')" type="primary" @click="addOrUpdateHandle()">新增</el-button>
          <el-button v-if="isAuth('sys:user:delete')" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
          <el-button type="danger" @click="addOrUpdateHandle()" :disabled="dataListSelections.length <= 0">批量修改</el-button>
          <!-- <el-button  type="danger" @click="dataHandle()" :disabled="dataListSelections.length <= 0">批量数据配置</el-button> -->
        </el-form-item>
      </el-form>
      <el-table :data="dataList" border v-loading="dataListLoading" @selection-change="selectionChangeHandle" class="tableCss">
        <el-table-column type="selection" header-align="center" align="center" width="50">
        </el-table-column>
        <el-table-column prop="ID" header-align="center" align="center" width="80" label="ID">
        </el-table-column>
        <el-table-column prop="EQUIP_NAME" header-align="center" align="center" label="设备名称">
            </el-table-column>
        <el-table-column header-align="center" align="center" label="是否每小时统计">
            <template slot-scope="scope">
                <span v-if="scope.row.IS_STATISTICS_HOURLY ==='1'">是</span> 
                <span v-else>否</span>
              </template>
        </el-table-column>
        <el-table-column  header-align="center" align="center" label="是否每日统计">
            <template slot-scope="scope">
                <span v-if="scope.row.IS_STATISTICS_DAYLY ==='1'">是</span> 
                <span v-else>否</span>
              </template>
        </el-table-column>
        <el-table-column header-align="center" align="center" label="是否每周统计">
            <template slot-scope="scope">
                <span v-if="scope.row.IS_STATISTICS_WEEKLY ==='1'">是</span> 
                <span v-else>否</span>
              </template>
        </el-table-column>
        <el-table-column header-align="center" align="center" label="是否每月统计">
            <template slot-scope="scope">
                <span v-if="scope.row.IS_STATISTICS_MONTHLY ==='1'">是</span> 
                <span v-else>否</span>
              </template>
        </el-table-column>
        <el-table-column header-align="center" align="center" label="是否每年统计">
            <template slot-scope="scope">
                <span v-if="scope.row.IS_STATISTICS_YEARLY ==='1'">是</span> 
                <span v-else>否</span>
              </template>
        </el-table-column>
        <el-table-column fixed="right" header-align="center" align="center" width="180" label="操作">
          <template slot-scope="scope">
            <el-button v-if="isAuth('sys:user:update')" type="text" size="small" @click="addOrUpdateHandle(scope.row)">修改</el-button>
            <el-button v-if="isAuth('sys:user:delete')" type="text" size="small" @click="deleteHandle(scope.row.ID)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="clearfix"></div>
      <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageIndex"
        :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="totalPage" layout="total, sizes, prev, pager, next, jumper">
      </el-pagination>
      <el-dialog :title="!dataForm.id ? '新增' : '修改'" :close-on-click-modal="false"  :visible.sync="visible" class="dialogDiv">
        <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
          <el-form-item label="设备名称" prop="EQUIP_NAME">
            <el-input v-model="dataForm.EQUIP_NAME" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="是否每小时统计">
            <!-- <el-input v-model="dataForm.IS_STATISTICS_HOURLY" placeholder=""></el-input> -->
            <el-radio v-model="dataForm.IS_STATISTICS_HOURLY" label="1">是</el-radio>
            <el-radio v-model="dataForm.IS_STATISTICS_HOURLY" label="0">否</el-radio>
          </el-form-item>
          <el-form-item label="是否每日统计">
            <el-radio v-model="dataForm.IS_STATISTICS_DAYLY" label="1">是</el-radio>
            <el-radio v-model="dataForm.IS_STATISTICS_DAYLY" label="0">否</el-radio>
          </el-form-item>
          <el-form-item label="是否每周统计">
              <el-radio v-model="dataForm.IS_STATISTICS_WEEKLY" label="1">是</el-radio>
              <el-radio v-model="dataForm.IS_STATISTICS_WEEKLY" label="0">否</el-radio>
          </el-form-item>
          <el-form-item label="是否每月统计">
              <el-radio v-model="dataForm.IS_STATISTICS_MONTHLY" label="1">是</el-radio>
              <el-radio v-model="dataForm.IS_STATISTICS_MONTHLY" label="0">否</el-radio>
            </el-form-item>
            <el-form-item label="是否每年统计" >
                <el-radio v-model="dataForm.IS_STATISTICS_YEARLY" label="1">是</el-radio>
              <el-radio v-model="dataForm.IS_STATISTICS_YEARLY" label="0">否</el-radio>
              </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="visible = false">取消</el-button>
          <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
        </span>
      </el-dialog>
    </div>
  </template>
  
  <script>
    export default {
      data() {
        return {
          dataForm: {
            ID:'',
            EQUIP_NAME:'',
            IS_STATISTICS_HOURLY :'0',
                  IS_STATISTICS_DAYLY :"0",
                  IS_STATISTICS_WEEKLY :"0",
                  IS_STATISTICS_MONTHLY :"0",
                  IS_STATISTICS_YEARLY :"0",
          },
          dataList: [],
          pageIndex: 1,
          pageSize: 10,
          totalPage: 0,
          dataListLoading: false,
          dataListSelections: [],
          options1: [],
          selectedOptions1: [],
          visible: false, //信息配置
          dataRule: {
            EQUIP_NAME: [{
              required: true,
              message: '设备名不能为空',
              trigger: 'blur'
            }],
  
          }
        }
      },
  
      created() {
        this.getDataList()
        this.getSearchCon()
      },
      methods: {
        //搜索条件数据
        getSearchCon() {
          this.$http({
            url: this.$http.adornUrl('/management/device-info/search'),
            method: 'post',
            // params: this.$http.adornParams({
            //   'page': this.pageIndex,
            //   'limit': this.pageSize,
            //   'username': this.dataForm.userName
            // })
          }).then(({
            data
          }) => {
            if (data && data.code == 0) {
              this.options1 = data.data.options1
              let initOrganization = data.data.options1[0].value
              this.selectedOptions1.push(initOrganization)
            }
          })
        },
        // 搜索条件数据-组织机构
        handleChange1(value) {
          console.log(value);
        },
        // 获取数据列表
        getDataList() {
          this.dataListLoading = true
          this.$http({
            url: this.$http.adornUrl('/management/device-data/eCountList'),
            method: 'post',
            // params: this.$http.adornParams({
            //   'page': this.pageIndex,
            //   'limit': this.pageSize,
            //   'username': this.dataForm.userName
            // })
          }).then(({
            data
          }) => {
            if (data && data.code == 0) {
              console.log(data.data)
              // this.dataList = data.page.list
              this.dataList = data.data
              this.totalPage = data.page.totalCount
            } else {
              this.dataList = []
              this.totalPage = 0
            }
            this.dataListLoading = false
          })
        },
        // 每页数
        sizeChangeHandle(val) {
          this.pageSize = val
          this.pageIndex = 1
          this.getDataList()
        },
        // 当前页
        currentChangeHandle(val) {
          this.pageIndex = val
          this.getDataList()
        },
        // 多选
        selectionChangeHandle(val) {
          this.dataListSelections = val
        },
        // 新增 / 修改
        addOrUpdateHandle(row) {
          if(row){
            console.log(row.IS_STATISTICS_DAYLY)
                  this.visible = true
                  this.dataForm.EQUIP_NAME = row.EQUIP_NAME
                  this.dataForm.ID = row.ID
                  this.dataForm.IS_STATISTICS_HOURLY = row.IS_STATISTICS_HOURLY
                  this.dataForm.IS_STATISTICS_DAYLY = row.IS_STATISTICS_DAYLY
                  this.dataForm.IS_STATISTICS_WEEKLY = row.IS_STATISTICS_WEEKLY
                  this.dataForm.IS_STATISTICS_MONTHLY = row.IS_STATISTICS_MONTHLY
                  this.dataForm.IS_STATISTICS_YEARLY = row.IS_STATISTICS_YEARLY
                }
                else{
                  this.visible = true
                  this.$refs['dataForm'].resetFields()
                }
        },
        // 删除
        deleteHandle(id) {
          var userIds = id ? [id] : this.dataListSelections.map(item => {
            return item.userId
          })
          this.$confirm(`确定对[id=${userIds.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$http({
              url: this.$http.adornUrl('/sys/user/delete'),
              method: 'post',
              data: this.$http.adornData(userIds, false)
            }).then(({
              data
            }) => {
              if (data && data.code === 0) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.getDataList()
                  }
                })
              } else {
                this.$message.error(data.msg)
              }
            })
          }).catch(() => {})
        },
        // 设备信息表单提交
        dataFormSubmit() {
          this.$refs['dataForm'].validate((valid) => {
            if (valid) {
              this.$http({
                url: this.$http.adornUrl('/sys/user/'),
                method: 'post',
                data: this.$http.adornData({
                  'userId': this.dataForm.id || undefined,
                  'username': this.dataForm.userName,
                  'password': this.dataForm.password,
                  'salt': this.dataForm.salt,
                  'email': this.dataForm.email,
                  'mobile': this.dataForm.mobile,
                  'status': this.dataForm.status,
                  'roleIdList': this.dataForm.roleIdList
                })
              }).then(({
                data
              }) => {
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
        },
 /*        filters: {
      // 系统运行状态
      whether: function (value) {
        if (value== null||value=='') {
          return "停机"
        } else 
          return value
        
      },
    } */
      }
    }
  
  </script>
  <style scoped>
    .data_estatisctic>>>.el-dialog {
      /* border: 1px red solid; */
    }
    .tableCss{
          width: 84%;
          float: right;
        }
    .data_estatisctic>>>.expand_info {
      font-size: 0;
    }
  
    .data_estatisctic>>>.el-form--inline .el-form-item label {
      width: 100px;
      color: #99a9bf;
    }
  
    .data_estatisctic>>>.expand_info .el-form-item {
      margin-right: 0;
      margin-bottom: 0;
      width: 20%;
    }
  
    .data_estatisctic>>>.el-dialog .el-dialog__body {
      /* height: 70%; */
      overflow: auto;
      padding: 30px 20px;
    }
  
    .el-dialog form {
      background-color: #f0f3f3;
          border-radius: 5px;
          padding: 30px 0  ;
    }
    .dialogDiv>>>.el-form-item__label {
          width: 40% !important;
          padding-right: 20px;
        }
        .dialogDiv >>>.el-input {
          width: 30%;
        }
    .dataSet>>>.el-form-item__label {
      width: 20% !important;
    }
  
    .dataSet>>>.el-input {
      width: 80%;
    }
  
    .s_title {
      position: absolute;
      z-index: 20000;
      top: -10px;
      left: 30px;
    }
  
    .s_title .first_label {
      margin-top: 20px;
    }
  
    .alarm,
    .loadStatistics,
    .energyStatistics {
      margin-top: 20px;
      position: relative;
      border: 1px solid #CCC;
      border-radius: 25px;
    }
  
  </style>
  