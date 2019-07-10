<template>
  <div class="device_point">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()" class="device-form">
      <el-form-item>
        <el-input v-model="searchCon" placeholder="输入搜索点位" clearable></el-input>
      </el-form-item>
      <el-form-item>
          <el-select v-model="pointType" placeholder="点位类型" clearable>
              <el-option v-for="item in pointType_Options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-select v-model="classifyType" placeholder="点位归类" clearable @click.native="getClassifyType()">
                <el-option v-for="item in searchClassifyTypeOptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
          </el-form-item>
          <el-form-item>
              <el-select v-model="isDecode" placeholder="是否解码" clearable>
                  <el-option v-for="item in decodeOptions" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
            </el-form-item>
      <!-- <el-form-item>
          <el-cascader :options="options1" v-model="selectedOptions1" @change="handleChange1" change-on-select>
          </el-cascader>
        </el-form-item> -->
      <el-form-item>
        <el-button @click="getDataList('params')"  type="success">查询</el-button>
        <el-button v-if="isAuth(OPTAUTH_ADD)" type="primary" @click="addOrUpdateHandle()">新增</el-button>
        <el-button v-if="isAuth(OPTAUTH_DELETE)" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
        <!-- <el-button type="danger" @click="addOrUpdateHandle()" :disabled="dataListSelections.length <= 0">批量修改</el-button> -->
      </el-form-item>
    </el-form>
    <!--  <el-tree :props="props1" :load="loadNode" lazy node-key highlight-current @node-click="handleNodeClick">
      </el-tree> -->
    <el-table :data="dataList" border v-loading="dataListLoading" @selection-change="selectionChangeHandle" max-height="680" :row-class-name="tableRowClassName" >
      <el-table-column type="selection" header-align="center" align="center" width="50">
      </el-table-column>
      <el-table-column type="index" header-align="center" align="center" width="80" label="序号" fixed="left">
      </el-table-column>
      <el-table-column prop="pointId" header-align="center" align="center" width="80" label="点号">
      </el-table-column>
      <el-table-column prop="pointType" header-align="center" align="center" label="点位类型" :formatter="ftPointType">
      </el-table-column>
      <el-table-column prop="pointName" header-align="center" align="center" label="点位名称">
      </el-table-column>
      <el-table-column prop="pointShortName" header-align="center" align="center" label="点位名称缩写">
      </el-table-column>
      <el-table-column prop="pointUnit" header-align="center" align="center" label="单位">
      </el-table-column>
      <el-table-column prop="classifyTypeName" header-align="center" align="center" label="归类">
      </el-table-column>
      <el-table-column prop="sortNo" header-align="center" align="center" label="排序">
      </el-table-column>
      <el-table-column prop="isDecode" header-align="center" align="center" label="是否需要解码" :formatter="ftIsDecode">
      </el-table-column>
      <el-table-column prop="remark" header-align="center" align="center" label="备注">
      </el-table-column>
      <el-table-column fixed="right" header-align="center" align="center" label="操作" width="180">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="修改" placement="top">  
            <el-button v-if="isAuth(OPTAUTH_UPDATE)" type="text" size="small" @click="addOrUpdateHandle(scope.row.pointId,scope.row.pointType)"><i class="el-icon-edit-outline istyle"></i></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top">  
            <el-button v-if="isAuth(OPTAUTH_DELETE)" type="text" size="small" @click="deleteHandle(scope.row.pointId)"><i class="el-icon-delete istyle"></i></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="配置" placement="top">
            <el-button v-if="isAuth(OPTAUTH_UPDATE)&&scope.row.isDecode==1" type="text" size="small" @click="detailHandle(scope.row.pointId)"><i class="el-icon-setting istyle"></i></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <div class="clearfix"></div>
    <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="totalPage" layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <el-dialog :title="!dataForm.id ? '新增' : '修改'" :close-on-click-modal="false" :visible.sync="visible" width="27.66%"
      class="rdialog">
      <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" class="rel-form">
        <el-form-item label="点号" prop="pointId" class="rel-form-item">
          <el-input v-model="dataForm.pointId" placeholder="" type="number" :min="0"></el-input>
        </el-form-item>
        <el-form-item label="点位类型" prop="pointType" class="rel-form-item">
          <el-select v-model="dataForm.pointType" placeholder="请选择" @change="changeFormPointType">
            <el-option v-for="item in pointType_Options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="归类" prop="classifyType" class="rel-form-item">
          <!-- <el-input v-model="dataForm.classifyType" placeholder=""></el-input> -->
          <el-select v-model="dataForm.classifyType" placeholder="请选择" @change="changeClassfyType">
            <el-option v-for="item in classifyTypeOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="点位名称" prop="pointName" class="rel-form-item">
          <el-input v-model="dataForm.pointName" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="点位名称缩写" prop="pointShortName" class="rel-form-item">
          <el-input v-model="dataForm.pointShortName" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="单位" prop="pointUnit" class="rel-form-item">
          <el-select v-model="dataForm.pointUnit" placeholder="请选择" filterable allow-create>
                  <el-option
                    v-for="item in unitOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
          <!-- <el-input v-model="dataForm.pointUnit" placeholder=""></el-input> -->
        </el-form-item>

        <el-form-item label="排序" prop="sortNo" class="rel-form-item">
          <el-input v-model="dataForm.sortNo" placeholder="" type="number" :min="0"></el-input>
        </el-form-item>
        <el-form-item label="是否需要解码" prop="isDecode" class="rel-form-item">
          <el-radio v-model="dataForm.isDecode" label="0">否</el-radio>
          <el-radio v-model="dataForm.isDecode" label="1">是</el-radio>
        </el-form-item>
        <el-form-item label="描述" prop="remark" class="rel-form-item">
          <el-input v-model="dataForm.remark" placeholder=""></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
      </span>
    </el-dialog>
    <!-- 信号量码配置列表弹框 -->
    <el-dialog title="信号量码配置列表" :close-on-click-modal="false" ref="infoForm" :visible.sync="infoVisible" class="dialogDiv2">
      <div class="smtool">


        <el-button v-if="isAuth(OPTAUTH_ADD)" type="primary" @click="addOrUpdateDetail()" size="small">新增</el-button>
        <el-button v-if="isAuth(OPTAUTH_DELETE)" type="danger" @click="deleteDetailHandle()" :disabled="detailListSelections.length <= 0"
          size="small">批量删除</el-button>



        <!-- <el-button type="danger" @click="addOrUpdateHandle()" :disabled="dataListSelections.length <= 0">批量修改</el-button> -->
      </div>
      <el-table :data="detailList" border v-loading="dataListLoading2" @selection-change="selectionChangeHandle2">
        <el-table-column type="selection" header-align="center" align="center" width="50">
        </el-table-column>
        <el-table-column type="index" header-align="center" align="center" width="80" label="序号" fixed="left">
        </el-table-column>
        <el-table-column prop="pointName" header-align="center" align="center" width="80" label="点位名称">
        </el-table-column>
        <el-table-column prop="sigalValue" header-align="center" align="center" label="信号值">
        </el-table-column>
        <el-table-column prop="codeValue" header-align="center" align="center" label="码值">
        </el-table-column>

        <el-table-column fixed="right" header-align="center" align="center" width="180" label="操作">
          <template slot-scope="scope">
            <el-button v-if="isAuth(OPTAUTH_UPDATE)" type="text" size="small" @click="addOrUpdateDetail(scope.row.id)"><i class="el-icon-edit-outline istyle"></i></el-button>
            <el-button v-if="isAuth(OPTAUTH_DELETE)" type="text" size="small" @click="deleteDetailHandle(scope.row.id)"><i class="el-icon-delete istyle"></i></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="sizeChangeHandle2(val,detailList)" @current-change="currentChangeHandle2"
        :current-page="pageIndex2" :page-sizes="[5, 10, 20]" :page-size="pageSize2" :total="totalPage2" layout="total, sizes, prev, pager, next, jumper">
      </el-pagination>
    </el-dialog>
    <!--量码配置新增修改窗口 -->
    <el-dialog :title="!detailForm.id ? '新增' : '修改'" :close-on-click-modal="false" :visible.sync="detailVisible" width="27.66%"
    class="rdialog">
      <el-form :model="detailForm" ref="detailForm" @keyup.enter.native="detailFormSubmit()"
        class="rel-form">
        <el-form-item label="信号值" prop="sigalValue" class="rel-form-item">
          <el-input v-model="detailForm.sigalValue" placeholder="" type="number"></el-input>
        </el-form-item>
        <el-form-item label="码值" prop="codeValue" class="rel-form-item">
          <el-input v-model="detailForm.codeValue" placeholder=""></el-input>
        </el-form-item>


      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="detailVisible = false">取消</el-button>
        <el-button type="primary" @click="detailFormSubmit()">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      //检验点位ID是否已存在
      var validateId = (rule, value, callback) => {
      if (value && this.dataForm.pointId !== ''&& (this.initId!=this.dataForm.pointId)) {
        this.$http({
          url: this.$http.adornUrl('/admin/tpoint/pointId'),
          method: 'post',
          data: this.$http.adornParams({
            "pointId": this.dataForm.pointId.toString()
          })
        }).then(({data}) => {
          if (data && data.code === 0 && data.data === false) {
            callback(new Error('点号已存在'))
          }else {
            callback()
          }
        })
      } else {
        callback()
      }
    }
      return {
        initId:"",
        isDecode:"",
        pointType:"",
        currentPointId: "",
        classifyType:"",
        searchClassifyTypeOptions:[],
        classifyTypeOptions: [],
        searchCon: "", //搜索内容
        props1: {
          label: 'name',
          children: 'zones',
          isLeaf: 'leaf'
        },
        detailList: [],

        dataForm: {
          "pointId": "",
          'pointType': "",
          'pointCode': "",
          'pointName': '',
          "pointShortName": "",
          "pointUnit": "",
          'classifyType': '',
          "sortNo": "",
          "isDecode": "0",
          "remark": "",

        },
        detailForm: {
          // "id":"",
          "pointName": "",
          "sigalValue": "",
          "codeValue": "",

        },
        "unitOptions":[],
        "decodeOptions":[{
          value: '0',
          label: '否'
        }, {
          value: '1',
          label: '是'
        }],
        "pointType_Options": [{
          value: '1',
          label: '遥信'
        }, {
          value: '2',
          label: '遥测'
        }, {
          value: '3',
          label: '遥控'
        }, {
          value: '4',
          label: '遥调'
        }, {
          value: '5',
          label: '遥脉'
        }],
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        pageIndex2: 1,
        pageSize2: 5,
        totalPage2: 0,
        totalCount2: 0,
        dataListLoading: false,
        dataListLoading2: false,

        dataListSelections: [],
        detailListSelections: [],
        options1: [],
        selectedOptions1: [],
        visible: false, //信息配置
        infoVisible: false, //量码列表
        detailVisible: false, //量码配置  新增|修改


        dataRule: {
          pointType: [{
            type:"string",
            required: true,
            message: '点位类型不能为空',
            trigger: 'change'
          }],
          classifyType: [{
            type:"string",
            required: true,
            message: '归类不能为空',
            trigger: 'change'
          }],
          pointId: [
          { required: true, message: '点号不能为空', trigger: 'blur' },
          { validator: validateId, trigger: 'blur' }
        ],

        }
      }
    },

    created() {
      this.getDataList()
      
    },
    watch: {
      "dataForm.classifyType" :function(val){
        this.$http({
          url: this.$http.adornUrl('/admin/tpoint/classifyType'),
          method: 'post',
          data: this.$http.adornData({
            "pointType": val
          })
        }).then(({
          data
        }) => {
          if (data && data.code === 0) {
            this.searchClassifyTypeOptions = data.list
          }
        })
      }
    },
    methods: {
      // 获取点位类型
      getClassifyType () {
        this.searchClassifyTypeOptions = []
        this.$http({
          url: this.$http.adornUrl('/admin/tpoint/classifyType'),
          method: 'post',
          data: this.$http.adornData({
            "pointType": this.pointType
          })
        }).then(({
          data
        }) => {
          if (data && data.code === 0) {
            this.searchClassifyTypeOptions = data.list
          } else {
            this.searchClassifyTypeOptions = []
          }
        })
      },
      changeClassfyType(val){
        this.$http({
              url: this.$http.adornUrl('/admin/tpoint/sortNo'),
              method: 'post',
              data: this.$http.adornData({
                "pointType": this.dataForm.pointType,
                "classifyType":this.dataForm.classifyType
              })
            }).then(({
              data
            }) => {
              if (data && data.code === 0) {
                this.dataForm.sortNo = data.data
              }
            })
      },
      // changePointType(val){
        
      // },
      //切换点位类型  更新点位归类下拉框
      changeFormPointType(val) {
        this.$http({
          url: this.$http.adornUrl('/admin/tpoint/classifyType'),
          method: 'post',
          data: this.$http.adornData({
            "pointType": val
          })
        }).then(({
          data
        }) => {
          if (data && data.code === 0) {
            this.classifyTypeOptions = data.list
            this.dataForm.classifyType = this.classifyTypeOptions[0].value
          }
        })

      },
      //点位量码  新增|修改
      addOrUpdateDetail(id) {

        this.detailVisible = true
        this.$nextTick(() => {
          this.detailForm.id = id || 0
          this.detailVisible = true
          this.$nextTick(() => {
            if (!this.detailForm.id) {
              this.$refs['detailForm'].resetFields()
            }
          })
          if (this.detailForm.id) {
            this.$http({
              url: this.$http.adornUrl('/admin/tsignalcode/info/' + this.detailForm.id),
              method: 'post',
              params: this.$http.adornParams()
            }).then(({
              data
            }) => {
              if (data && data.code === 0) {
                this.detailForm.pointName = data.tSignalCode.pointName
                this.detailForm.sigalValue = data.tSignalCode.sigalValue
                this.detailForm.codeValue = data.tSignalCode.codeValue
              }
            })
          }

        })
      },
      //获取点位量码配置列表
      detailHandle(id) {
        this.currentPointId =id
        this.infoVisible = true
        this.$nextTick(() => {

          this.$http({
            url: this.$http.adornUrl('/admin/tsignalcode/list'),
            method: 'post',
            data: this.$http.adornData({
              'page': this.pageIndex2.toString(),
              'limit': this.pageSize2.toString(),
              'pointId': id.toString()
            })
          }).then(({
            data
          }) => {
            if (data && data.code === 0) {
              // console.log(data)
              this.detailList = data.page.list
              this.totalPage2 = data.page.totalCount
              // this.totalCount2 = data.page.totalCount2   
            } else {
              this.detailList = []
              this.totalPage2 = 0
            }
            this.dataListLoading2 = false
          })

        })
      },
      // 点击树
      handleNodeClick(data) {
        //  alert("点击树节点");
        // console.log(data);
        this.clickTree = data;
      },

      // 搜索条件数据-组织机构
      handleChange1(value) {
        // console.log(value);
      },
      // 获取数据列表
      getDataList(params) {
        if(params){
          this.pageIndex=1
        }
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/admin/tpoint/list'),
          method: 'post',
          data: this.$http.adornData({
            'page': this.pageIndex.toString(),
            'limit': this.pageSize.toString(),
            'pointName': this.searchCon,
            "pointType":this.pointType,
            "classifyType":this.classifyType,
            "isDecode":this.isDecode
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
        this.pageSize = val
        this.pageIndex = 1
        this.getDataList()
      },
      sizeChangeHandle2(val) {
        this.pageSize2 = val
        this.pageIndex2 = 1
        this.detailHandle(this.currentPointId)
      },
      // 当前页
      currentChangeHandle(val) {
        this.pageIndex = val
        this.getDataList()
      },
      currentChangeHandle2(val) {
        this.pageIndex2 = val
        // alert(this.currentPointId)
        this.detailHandle(this.currentPointId)
      },
      // 多选
      selectionChangeHandle(val) {
        this.dataListSelections = val
      },
      selectionChangeHandle2(val) {
        this.detailListSelections = val
      },
      // 新增 / 修改
      addOrUpdateHandle(id, type) {
        this.visible = true
        this.$nextTick(() => {
          this.dataForm.id = id || 0
          this.visible = true
          this.initId =id || 0
          this.$nextTick(() => {
            this.$refs['dataForm'].resetFields()
          })
          //单位下拉框
          this.$http({
            url: this.$http.adornUrl('/admin/tpoint/unit'),
            method: 'post',
          }).then(({
            data
          }) => {
            if (data && data.code === 0) {
              this.unitOptions = data.data
            }
          })
          this.$http({
            url: this.$http.adornUrl('/admin/tpoint/classifyType'),
            method: 'post',
            data: this.$http.adornData({
              "pointType": type.toString()
            })
          }).then(({
            data
          }) => {
            if (data && data.code === 0) {
              this.classifyTypeOptions = data.list
            }
          })
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl('/admin/tpoint/info/' + this.dataForm.id),
              method: 'post',
              // data: this.$http.adornData()
            }).then(({
              data
            }) => {
              if (data && data.code === 0) {
                this.dataForm.pointId = data.tPoint.pointId
                this.dataForm.pointType = data.tPoint.pointType ? data.tPoint.pointType.toString() : null
                this.dataForm.pointCode = data.tPoint.pointCode
                this.dataForm.pointName = data.tPoint.pointName
                this.dataForm.pointShortName = data.tPoint.pointShortName
                this.dataForm.pointUnit = data.tPoint.pointUnit
                this.dataForm.classifyType = data.tPoint.classifyType ? data.tPoint.classifyType.toString() : null
                this.dataForm.sortNo = data.tPoint.sortNo ? data.tPoint.sortNo.toString() : null
                this.dataForm.isDecode = data.tPoint.isDecode.toString()
                this.dataForm.remark = data.tPoint.remark
              }
            })
          }else{
            this.$message.error(data.msg)
          }

        })
      },
      // 设备点位删除
      deleteHandle(id) {
        if (id) {
          id = parseInt(id)
        }
        var ids = id ? [id] : this.dataListSelections.map(item => {
          return item.pointId
        })
        this.$confirm(`确定${id ? '删除' : '批量删除'}操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/admin/tpoint/delete'),
            method: 'post',
            data: ids
          }).then(({
            data
          }) => {
            if (data && data.code === 0) {
                  this.getDataList()
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
        }).catch(() => {})
      },
      //信号量码删除
      deleteDetailHandle(id) {
        var ids = id ? [id] : this.detailListSelections.map(item => {
          return item.id
        })
        this.$confirm(`确定${id ? '删除' : '批量删除'}操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/admin/tsignalcode/delete'),
            method: 'post',
            data: this.$http.adornData(ids, false)
          }).then(({
            data
          }) => {
            if (data && data.code === 0) {
                  this.detailHandle(this.currentPointId)
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
        }).catch(() => {})
      },
      // 设备点位表单提交
      dataFormSubmit() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            if (this.dataForm.id) {
              this.$http({
                url: this.$http.adornUrl('/admin/tpoint/update'),
                method: 'post',
                data: this.$http.adornData({
                  "pointId": this.dataForm.pointId.toString(),
                  'pointType': this.dataForm.pointType,
                  'pointCode': this.dataForm.pointCode,
                  'pointName': this.dataForm.pointName,
                  "pointShortName": this.dataForm.pointShortName,
                  "pointUnit": this.dataForm.pointUnit,
                  'classifyType': this.dataForm.classifyType,
                  "sortNo": this.dataForm.sortNo == null ? null : this.dataForm.sortNo.toString(),
                  "isDecode": this.dataForm.isDecode,
                  "remark": this.dataForm.remark,
                })
              }).then(({
                data
              }) => {
                if (data && data.code === 0) {
                  this.visible = false
                      this.getDataList()
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
            } else {
              this.$http({
                url: this.$http.adornUrl('/admin/tpoint/save'),
                method: 'post',
                data: this.$http.adornData({
                  // "pointId":this.dataForm.pointId.toString(),
                  'pointType': this.dataForm.pointType,
                  'pointId': this.dataForm.pointId,
                  'pointName': this.dataForm.pointName,
                  "pointShortName": this.dataForm.pointShortName,
                  "pointUnit": this.dataForm.pointUnit,
                  'classifyType': this.dataForm.classifyType,
                  "sortNo": this.dataForm.sortNo.toString(),
                  "isDecode": this.dataForm.isDecode,
                  "remark": this.dataForm.remark,
                })
              }).then(({
                data
              }) => {
                if (data && data.code === 0) {
                  this.visible = false
                      this.getDataList()
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

          }
        })
      },
      // 点位量码表单提交
      detailFormSubmit() {
        this.$refs['detailForm'].validate((valid) => {
          if (valid) {
            if (this.detailForm.id) {

              this.$http({
                url: this.$http.adornUrl('/admin/tsignalcode/update'),
                method: 'post',
                data: this.$http.adornData({
                  "id": this.detailForm.id,
                  "pointId": this.currentPointId,
                  "sigalValue": this.detailForm.sigalValue,
                  "codeValue": this.detailForm.codeValue,
                })
              }).then(({
                data
              }) => {
                if (data && data.code === 0) {
                  this.detailVisible = false
                      this.detailHandle(this.currentPointId)
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
            } else {
              this.$http({
                url: this.$http.adornUrl('/admin/tsignalcode/save'),
                method: 'post',
                data: this.$http.adornData({
                  "pointId": this.currentPointId,
                  "sigalValue": this.detailForm.sigalValue,
                  "codeValue": this.detailForm.codeValue,

                })
              }).then(({
                data
              }) => {
                if (data && data.code === 0) {
                  this.detailVisible = false
                      // this.getDataList()
                      this.detailHandle(this.currentPointId)
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

          }
        })
      },
      ftPointType(val) {
        if (val.pointType === 1) {
          return "遥信"
        } else if (val.pointType === 2) {
          return "遥测"
        } else if (val.pointType === 3) {
          return "遥控"
        } else if (val.pointType === 4) {
          return "遥调"
        } else if (val.pointType === 5) {
          return "遥脉"
        }
      },
      ftIsDecode(val) {
        if (val.isDecode === 0) {
          return "否"
        } else if (val.isDecode === 1) {
          return "是"
        }
      },

    }
  }

</script>
<style lang="scss" scoped>
@import "../../../../assets/scss/_dialog.scss"
</style>
<style scoped>
  /* .el-pagination .el-select .el-input{
      width: 100px !important;
    } */
    /* .dialogDiv>>>  .el-form-item__error{
      left: 40%;
    } */
  .smtool {
    margin: 0 0 20px 0;
    text-align: right;
  }
  .device-form  .el-form-item {
    margin-bottom: 0;
}

  .device_point>>>.el-form--inline .el-form-item label {
    width: 100px;
    color: #99a9bf;
  }

  .dialogDiv>>>.el-input {
    width: 220px;
  }

  .dialogDiv>>>.el-input__inner {
    text-align: center;

  }


  .device_point>>>.el-dialog .el-dialog__body {
    /* height: 70%;
      overflow: auto; */
    padding: 30px 20px;

  }

 /*  .dialogDiv>>>.el-form-item__label {
    width: 40% !important;
    padding-right: 20px;
  } */

/*   .el-dialog form {
    /* border: 1px solid red; */
    /* height: 100%; *
    background-color: #f0f3f3;
    border-radius: 5px;
    padding: 30px 0;
  } */

  /* .dataSet>>>.el-form-item__label {
      width: 20% !important;
    }
  
    .dataSet>>>.el-input {
      width: 80%;
    } */

  .s_title {
    position: absolute;
    z-index: 20000;
    top: -10px;
    left: 30px;
  }

  .s_title .first_label {
    margin-top: 20px;
  }

</style>
