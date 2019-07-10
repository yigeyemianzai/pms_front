<template>
  <div class="data_ecalarm">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.userName" placeholder="输入搜索设备名称" clearable></el-input>
      </el-form-item>
      <!-- <el-form-item>
              <el-cascader :options="options1" v-model="selectedOptions1" @change="handleChange1" change-on-select>
              </el-cascader>
            </el-form-item> -->
      <el-form-item>
        <el-button @click="getDataList('params')" type="success">查询</el-button>
        <el-button v-if="isAuth(OPTAUTH_ADD)" type="primary" @click="addOrUpdateHandle()">新增</el-button>
        <el-button v-if="isAuth(OPTAUTH_DELETE)" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
        <el-button type="danger" @click="addOrUpdateHandle()" :disabled="dataListSelections.length <= 0">批量修改</el-button>
        <!-- <el-button  type="danger" @click="dataHandle()" :disabled="dataListSelections.length <= 0">批量数据配置</el-button> -->
      </el-form-item>
    </el-form>
    <div class="leftDiv">
      <div class="left_sys">
        <el-cascader :options="sysOptons" v-model="selectSys" @change="handleChange3" change-on-select placeholder="选择系统">
        </el-cascader>
      </div>
      <el-tree :props="props1" ref="tree" :load="loadNode" lazy node-key="id" highlight-current @node-click="handleNodeClick" :expand-on-click-node="false">
        <div class="custom-tree-node" slot-scope="{ node, data}">
          <span>
              <i :class="{build:data.voType==2,floor:data.voType==3,room:data.voType==4}"></i>{{ node.label }}
          </span>
      </div>
      </el-tree>
      <!-- <el-tree :props="props1" ref="tree" :load="loadNode" lazy node-key="id" highlight-current @node-click="handleNodeClick" :default-checked-keys="[1]" :formatter="ftFlag"></el-tree> -->
    </div>


    <el-table :data="dataList" border v-loading="dataListLoading" @selection-change="selectionChangeHandle" class="tableCss">
      <el-table-column type="selection" header-align="center" align="center" width="50">
      </el-table-column>
      <el-table-column type="index" header-align="center" align="center" width="80" label="序号" fixed="left">
      </el-table-column>
      <!-- <el-table-column prop="id" header-align="center" align="center" width="80" label="ID">
      </el-table-column> -->
      <el-table-column prop="statisticsObjType" header-align="center" align="center"  label="统计对象类型" :formatter="staType">
      </el-table-column>
      <el-table-column prop="statisticsObjName" header-align="center" align="center"  label="统计对象ID">
      </el-table-column>
      <el-table-column prop="alarmPeriod" header-align="center" align="center" label="告警周期" :formatter="period">
      </el-table-column>
      <el-table-column prop="generalLimit" header-align="center" align="center" label="一般等级能耗限制">
      </el-table-column>
      <el-table-column prop="severityLimit" header-align="center" align="center" label="严重等级能耗限制">
      </el-table-column>
      <el-table-column fixed="right" header-align="center" align="center" width="180" label="操作">
        <template slot-scope="scope">
          <el-button v-if="isAuth(OPTAUTH_UPDATE)" type="text" size="small" @click="addOrUpdateHandle(scope.row)">修改</el-button>
          <el-button v-if="isAuth(OPTAUTH_DELETE)" type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <div class="clearfix"></div> -->
    <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="totalPage" layout="total, sizes, prev, pager, next, jumper" class="main_page">
    </el-pagination>
    <el-dialog :title="!dataForm.id ? '新增' : '修改'" :close-on-click-modal="false" :visible.sync="visible" width="27.66%"
    class="rdialog">
      <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" class="rel-form">
        <!--  <el-form-item label="设备名称" prop="EQUIP_NAME">
                <el-input v-model="dataForm.EQUIP_NAME" placeholder=""></el-input>
              </el-form-item> -->
        <el-form-item label="告警周期" prop="alarmPeriod" class="rel-form-item">
          <el-radio-group v-model="dataForm.alarmPeriod">
            <el-radio :label="1">每小时</el-radio>
            <el-radio :label="2">每日</el-radio>
            <el-radio :label="3">每月</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="一般等级能耗限制" prop="generalLimit" class="rel-form-item">
          <el-input-number v-model="dataForm.generalLimit" :step="1" :min=0></el-input-number>
        </el-form-item>
        <el-form-item label="严重等级能耗限制" prop="severityLimit" class="rel-form-item">
          <el-input-number v-model="dataForm.severityLimit" :step="1" :min=0></el-input-number>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        clickNode:"",
        nodeType:"",
        cuId:"",
        cuType:'',
        sysOptons: [],
        selectSys: [],

        props1: {
          label: 'name',
          children: 'zones',
          isLeaf:  'leaf',
          type: 'voType'
        },
        dataForm: {
          EQUIP_NAME: '',
          alarmPeriod: '',
          generalLimit: '',
          severityLimit: ''
        },
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        // options1: [],
        // selectedOptions1: [],
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
      this.init()
    },
    methods: {
      getCascaderObj(val,opt) {
            return val.map(function (value, index, array) {
                for (var itm of opt) {
                    if (itm.value == value) { opt = itm.children; return itm; }
                }
                return null;
            })
          },
      handleChange3(value) {

          this.cascaderArr=this.getCascaderObj(this.selectSys, this.sysOptons);
        this.$refs.tree.setCurrentNode([])
        this.clickNode = value[value.length-1]

        this.nodeType = this.cascaderArr[this.cascaderArr.length-1].voType
        this.nodeName = this.cascaderArr[this.cascaderArr.length-1].name
      },
      loadNode(node, resolve) {
        let nodeValue = []
        if (node.level === 0) {
          this.$http({
          url: this.$http.adornUrl('/admin/tequip/organization'),
          method: 'post',
          data: this.$http.adornData({"id":null})          
        }).then(({
          data
        }) => {
          if (data && data.code === 0) {
            // nodeValue = 
            // console.log(node.data.id)
            return resolve(data.list)
          }
        })
        }else{
          this.clickNode = node.data.id
        this.nodeType = node.data.voType
          this.cuType = node.data.voType
          this.cuId = node.data.id
          this.$http({
          url: this.$http.adornUrl('/admin/tequip/organization'),
          method: 'post',
          data: this.$http.adornData({"id":node.data.id,"voType":node.data.voType})          
        }).then(({
          data
        }) => {
          if (data && data.code === 0) {
            return resolve(data.list);
          }
        })
        }
      },
      // 点击树
      handleNodeClick(data) {
        this.selectSys = []
        this.clickNode=data.id
        this.nodeType = data.voType
      },
      //搜索条件数据
      init() {
        this.$http({
          url: this.$http.adornUrl('/admin/tequip/condition/system'),
          method: 'post',
          data: this.$http.adornData({
            "orgId": "-100"
          })

        }).then(({
          data
        }) => {
          if (data && data.code == 0) {
            this.sysOptons = data.list
          }
        })
      },
      // 获取数据列表
      getDataList(params) {
        if(params){
          this.pageIndex=1
        }
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/base/talarmuseenergyconfig/list'),
          method: 'post',
          data: this.$http.adornData({
            'page': this.pageIndex.toString(),
            'limit': this.pageSize.toString(),
            "statisticsObjId" : this.clickNode,
            "statisticsObjType" : this.nodeType,
          })
        }).then(({
          data
        }) => {
          if (data && data.code == 0) {
            // this.dataList = data.page.list
            this.dataList = data.page.list
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
        this.pageSize = val.toString()
        this.pageIndex = "1"
        this.getDataList()
      },
      // 当前页
      currentChangeHandle(val) {
        this.pageIndex = val.toString()
        this.getDataList()
      },
      // 多选
      selectionChangeHandle(val) {
        this.dataListSelections = val
        // console.log(this.dataListSelections)
      },
      // 新增 / 修改
      addOrUpdateHandle(row) {
        this.dataForm.id =  0
        if (row) {
          this.dataForm.id = row.id
          this.visible = true
          this.dataForm.EQUIP_NAME = row.EQUIP_NAME
          this.dataForm.alarmPeriod = row.alarmPeriod
          this.dataForm.generalLimit = row.generalLimit
          this.dataForm.severityLimit = row.severityLimit
        } else {
        this.dataForm.id =  0

          this.visible = true
          this.dataForm.EQUIP_NAME = ""
          this.dataForm.alarmPeriod = ""
          this.dataForm.generalLimit = ""
          this.dataForm.severityLimit = ""
        }

      },
      // 取消提交
      cancel() {
        this.visible = false
        this.$refs['dataForm'].resetFields()
      },
      // 删除
      deleteHandle(id) {
        console.log(id)
        var userIds = id ? [id] : this.dataListSelections.map(item => {
          return item.id
        })
        this.$confirm(`确定对[id=${userIds.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/base/talarmuseenergyconfig/delete'),
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
            if(this.dataForm.id){
              this.$http({
              url: this.$http.adornUrl('/base/talarmuseenergyconfig/update'),
              method: 'post',
              data: this.$http.adornData({
                id:this.dataForm.id,
                alarmPeriod: this.dataForm.alarmPeriod,
                generalLimit: this.dataForm.generalLimit,
                severityLimit: this.dataForm.severityLimit,
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
                    // this.$emit('refreshDataList')
                    this.getDataList()
                  }
                })
              } else {
                this.$message.error(data.msg)
              }
            })
            }else{
              this.$http({
              url: this.$http.adornUrl('/base/talarmuseenergyconfig/save'),
              method: 'post',
              data: this.$http.adornData({
                // id:this.dataForm.id,
                statisticsObjType:this.cuType,
                statisticsObjId:this.cuId,
                alarmPeriod: this.dataForm.alarmPeriod,
                generalLimit: this.dataForm.generalLimit,
                severityLimit: this.dataForm.severityLimit,
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
                    // this.$emit('refreshDataList')
                    this.getDataList()
                  }
                })
              } else {
                this.$message.error(data.msg)
              }
            })
            }
            
          }
        })
      },
      ftFlag(val){
        val=!val
      },
      staType(val) {
        if (val.statisticsObjType === 1) {
          return "组织机构"
        } else if (val.statisticsObjType === 2) {
          return "系统"
        } else if (val.statisticsObjType === 3) {
          return "子系统"
        } else if (val.statisticsObjType === 4) {
          return "站点"
        } else if (val.statisticsObjType === 5) {
          return "楼层"
        } else if (val.statisticsObjType === 6) {
          return "房间"
        } else if (val.statisticsObjType === 7) {
          return "设备"
        }
      },
      period(val) {
        if (val.alarmPeriod === 1) {
          return "秒"
        } else if (val.alarmPeriod === 2) {
          return "分钟"
        } else if (val.alarmPeriod === 3) {
          return "小时"
        } else if (val.alarmPeriod === 4) {
          return "天"
        } else if (val.alarmPeriod === 5) {
          return "周"
        } else if (val.alarmPeriod === 6) {
          return "月"
        } else if (val.alarmPeriod === 7) {
          return "年"
        }
      },
    }
  }

</script>
<style scoped>
.main_page{
  float: right;
}
  .el-tree,
  .left_sys {
    width: 100%;
    margin-bottom: 20px;

  }

  .leftDiv {
    width: 15%;
    display: block;
    float: left;
  }

  .tableCss {
    width: 84%;
    float: right;
  }

  .data_ecalarm>>>.el-dialog {
    /* height: 60%; */
    /* border: 1px red solid; */
  }

  .data_ecalarm>>>.expand_info {
    font-size: 0;
  }

  .data_ecalarm>>>.el-form--inline .el-form-item label {
    width: 100px;
    color: #99a9bf;
  }

  .data_ecalarm>>>.expand_info .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 20%;
  }

  .data_ecalarm>>>.el-dialog .el-dialog__body {
    /* height: 70%; */
    overflow: auto;
    padding: 30px 20px;

  }

  .el-dialog form {
    /* border: 1px solid red; */
    /* height: 100%; */
    /* background-color: #f0f3f3; */
    border-radius: 5px;
    padding: 30px 0;
  }
  .dialogDiv>>>.el-form-item__label {
    width: 40% !important;
    padding-right: 20px;
  }

  .dialogDiv>>>.el-input {
    width: 30%;
  }

  .el-input-number>>>.el-input {
    width: 100% !important;
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
  .build{
    display: inline-block;
    background:  url('~@/assets/images/tree-icon1.png') no-repeat;
    height: 16px;
    width: 16px;
    line-height: 16px;
    margin-right: 10px;
    vertical-align: middle;
  }
  .floor{
    display: inline-block;
   background:  url('~@/assets/images/tree-icon2.png') no-repeat;
   height: 16px;
   width: 16px;
   line-height: 16px;
   margin-right: 10px;
   vertical-align: middle;
  }
  .room{
    display: inline-block;
    background:  url('~@/assets/images/tree-icon3.png') no-repeat;
    height: 16px;
    width: 16px;
    line-height: 16px;
    margin-right: 10px;
    vertical-align: middle;
  }
  .data_ecalarm >>>.el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content .build{
    display: inline-block;
    background:  url('~@/assets/images/tree-icon11.png') no-repeat;
    height: 16px;
    width: 16px;
    margin-right: 10px;
    vertical-align: middle;
    line-height: 16px;
  }
  .data_ecalarm >>>.el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content .floor{
    display: inline-block;
    background:  url('~@/assets/images/tree-icon22.png') no-repeat;
    height: 16px;
    width: 16px;
    margin-right: 10px;
    vertical-align: middle;
    line-height: 16px;
  }
  .data_ecalarm >>>.el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content .room{
    display: inline-block;
    background:  url('~@/assets/images/tree-icon33.png') no-repeat;
    height: 16px;
    width: 16px;
    margin-right: 10px;
    vertical-align: middle;
    line-height: 16px;
  }
</style>
