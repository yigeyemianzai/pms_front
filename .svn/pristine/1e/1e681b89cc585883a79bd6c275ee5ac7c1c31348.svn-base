<template>
  <div class="version" id="version">
    <div class="lefttree">
      <el-tree ref="tree" :data="dataList" :props="props" default-expand-all node-key="id" accordion highlight-current 
      show-checkbox @check-change="handleCheckChange"></el-tree>
    </div>
    <div class="rightversion" v-loading="isUpdateLoading" element-loading-text="文件上传中">
        <div class="uploadbtn">
            <el-upload
                class="upload-demo"
                ref="upload"
                :action="UploadUrl()"
                :headers="upheaders()"
                :on-success='handleSuccess'
                :on-error="handleError"
                :on-progress="handleProgess"
                :before-upload="beforeUpload"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :on-change="handleChange"
                :file-list="fileList"
                :auto-upload="false">
                <el-button slot="trigger" type="primary">选取文件</el-button>
                <el-button style="margin-left: 10px;" type="success" @click="submitUpload">保存</el-button>
                <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
            </el-upload>  
        </div>        
        <div class="updatebtn">
            <el-button type="warning" @click="showUpdate()" :disabled="turnBtn">升级</el-button>
        </div>
        <el-dialog
          title="升级执行"
          :close-on-click-modal="false"
          :visible.sync="updateVisible"
          >
          <div class="updatedialog">
            <div class="updatedialog-top">
              <el-select 
                v-model="updateFile" 
                filterable placeholder="选择升级文件"
                @click.native="getUpdateFileLists()" 
                :loading="updateFileLoading">
                <el-option
                    v-for="item in updateFileOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label">
                </el-option>
              </el-select>
              <el-button type="success" @click="updateSet()">升级</el-button>
            </div>
            <div class="updatedialog-bottom">
              <el-table :data="updateList"  v-loading="updateListLoading"
                :header-cell-style="{background:'#edeef0',color:'#000',fontWeight:'700'}" style="width: 100%;">
                <el-table-column type="index" header-align="center" align="center" width="50" label="序号" fixed="left">
                </el-table-column>
                <el-table-column prop="name" header-align="center" align="center" label="名称" >
                </el-table-column>
                <el-table-column prop="executeStatus" header-align="center" align="center" label="执行状态" >
                    <template slot-scope="scope">
                      <!-- 0成功 1失败 -->
                        <i v-if="scope.row.executeStatus == null">-</i>
                        <i class="success" v-if="scope.row.executeStatus == 0" ></i>
                        <i class="fail" v-else-if="scope.row.executeStatus == 1"></i>
                        <i class="execute" v-else-if="scope.row.executeStatus == 2"  ></i>
                      </template>
                </el-table-column>
              </el-table>
          </div>
        </div>        
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dataList: [],  // 树
      props: {
        label: "name",
        type: "voType"
      },
      fileList: [],  // 上传的文件列表,
      updateList: [],  // 升级弹框里设备信息列表
      updateListLoading: false,
      updateVisible: false,  // 升级信息弹框显示/隐藏
      updateFile: null,  // 升级弹框 文件选择值
      updateFileOptions: [],  // 升级弹框 文件选择列表
      updateFileLoading: false,
      updateWs: null,
      turnBtn: false,
      isUpdateLoading: false
    };
  },
  created() {},
  watch: {},
  mounted: function() {
    this.getTree()
    document.getElementById("version").style.height = window.innerHeight - 170 + "px";
  },
  methods: {
    getTree() {
      this.$http({
        url: this.$http.adornUrl( "/base/tstatisticsdetailconfig/queryTuopuTree" ),
        method: "post",
        data: this.$http.adornData({
          orgId: this.$store.state.user.orgId
        })
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.dataList = data.page;
        }
      });
    },
    // 选择树节点  1组织机构 2 楼层 3 网关
    handleCheckChange(data) {
      // console.log(this.$refs.tree.getCheckedNodes())
    },
    // 必选参数，上传的地址
    UploadUrl(){
        return window.SITE_CONFIG.baseUrl + '/admin/ftp/uploadFileAll' 
    },
    // 设置上传的请求头部
    upheaders() {
      return {'token':this.$cookie.get('token')}
    },
    // 上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
    beforeUpload(file){
      // let fd = new FormData()
      // fd.append('file',file);//传文件
    },
    // 上传到服务器按钮
    submitUpload() {
      if(this.$refs.upload.uploadFiles.length > 0) {
        this.$confirm('确定上传?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$refs.upload.submit()
        })
      }     
      console.log(this.fileList)
      console.log(this.$refs.upload)
      console.log(this.$refs.upload.uploadFiles)
    },
    // 文件上传成功时的钩子
    handleSuccess (response, file, fileList) {
      // console.log(response, file, fileList)
      this.isUpdateLoading = false
      if(response.code == 0 && response.msg == 'success') {       
        this.$message({
          message: '上传成功',
          type: 'success'
        })
      }
    },    
    // 文件上传失败时的钩子
    handleError (err, file, fileList) {
      // console.log(err, file, fileList)
      this.isUpdateLoading = false
      this.$message({
        message: '上传失败',
        type: 'error'
      })
    },
    // 文件上传时的钩子
    handleProgess (event, file, fileList) {
      // console.log(event, file, fileList)
      this.isUpdateLoading = true
    },
    // 文件列表移除文件时的钩子事件
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    // 点击文件列表中已上传的文件时的钩子事件
    handlePreview(file) {
      console.log(file);
    },
    // 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
    handleChange (file, fileList) {
      // console.log(file, fileList)
      // console.log(this.fileList)
    },
    // 升级按钮 弹框展示左侧树选择的网关列表
    showUpdate () {     
      // console.log(this.$refs.tree.getCheckedNodes())
      let arr = this.$refs.tree.getCheckedNodes(), len = this.$refs.tree.getCheckedNodes().length
      if(len == 0) {
        this.$message({
          message: '请先选择需要升级的设备',
          type: 'warning'
        })
      } else {
        this.updateVisible = true
        this.updateList = []
        for(let i=0;i<len;i++) {
          if(arr[i].voType == '3') {
            let obj = {}
            obj.name = arr[i].name
            obj.id = arr[i].id
            obj.executeStatus = null
            this.updateList.push(obj)
          }       
        }
      }     
      // console.log(this.updateList)
    },
    // 弹框页面获取文件下拉框
    getUpdateFileLists () {
      this.$http({
        url: this.$http.adornUrl('/admin/ftp/filename'),
        method: 'post',
        data: this.$http.adornData()
      }).then(({data}) => {
        if (data && data.code === 0) {
          this.updateFileOptions = data.data
        } else {
          this.updateFileOptions = []
        }
      })
    },
    // 弹框页面 升级按钮
    updateSet () {
      // console.log(this.updateFile)
      // console.log(this.updateList)
      // console.log(this.updateFile.split('\\'))
      if(this.updateFile == null) {
        this.$message({
          message: '请先选择升级文件',
          type: 'warning'
        })
      } else {
        this.$confirm('确定升级操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.turnBtn = true
          let arr = []
          this.updateList.map(e =>{
            arr.push(e.id)
          })
          this.$http({
            url: this.$http.adornUrl('/admin/tequipoutlet/levelup'),
            method: 'post',
            data: this.$http.adornData({
              'commIds': arr,  // 通讯设备id集合：["1","2"...]
              // 'fileName': this.updateFile.split('\\')[this.updateFile.split('\\').length - 1]  // 文件全名：例如a.txt
              'fileName': this.updateFile
            })
          }).then(({data}) => {
            if(data && data.code == 0) {
              let datas = data.data
              for( let i=0;i<this.updateList.length;i++) {
                datas.map(e => {
                  if(e == this.updateList[i].id) {
                    this.updateList[i].executeStatus = 2
                  }
                })
              }

              let _this = this
              setTimeout(()=>{
                if(_this.turnBtn == true) {
                  _this.turnBtn = false
                  _this.$message({
                    message: '设置失败',
                    type: 'error',         
                    duration: 1500,
                    onClose: () => {
                      let _this = this
                      _this.updateWs.close()
                      _this.updateList.map(e => {
                        if(e.executeStatus == 2) {
                          e.executeStatus = 1
                        }
                      })
                    }
                  })
                }
              },30000)
              let token = this.$cookie.get('token')
              // 初始化一个 WebSocket 对象
              _this.updateWs = new WebSocket(window.SITE_CONFIG.wsBaseUrl + token + "/outlet/levelup");
              // _this.fiexdSendWs = new WebSocket("Ws://123.207.167.163:9010/ajaxchattest");
              _this.updateWs.last_health_time = -1; // 上一次心跳时间
              _this.updateWs.keepalive = function() { 
                let time = new Date().getTime();
                if(_this.updateWs.last_health_time !== -1 && time - _this.updateWs.last_health_time > 20000) { // 不是刚开始连接 并且 当前时间距离上次成功心跳的时间超过20秒
                  _this.updateWs.close() 
                } else { // 如果断网了，fiexdSendWs.send会无法发送消息出去。fiexdSendWs.bufferedAmount不会为0。 
                  if(_this.updateWs.bufferedAmount === 0 && _this.updateWs.readyState === 1) { 
                    _this.updateWs.send('ping'); 
                    _this.updateWs.last_health_time = time; 
                  } 
                }
              }

              if(_this.updateWs) {
                let reconnect = 0; //重连的时间 
                let reconnectMark = false; //是否重连过 
                /* this.setState({ notificationSocket: true }) */
                // 建立 web socket 连接成功触发事件
                _this.updateWs.onopen = function () {
                  console.log(datas)
                  _this.updateWs.send(datas)
                  reconnect = 0; 
                  reconnectMark = false; 
                  _this.updateWs.receiveMessageTimer = setTimeout(() => {
                    _this.updateWs.close();
                  }, 30000); // 30s没收到信息，代表服务器出问题了，关闭连接。如果收到消息了，重置该定时器。
                  if(_this.updateWs.readyState === 1) { // 为1表示连接处于open状态
                    _this.updateWs.keepAliveTimer = setInterval(() => {
                      _this.updateWs.keepalive();
                    }, 5000)
                  }
                };
                _this.updateWs.onerror = () => {
                  // console.error('onerror')
                }
                // 接收服务端数据时触发事件
                _this.updateWs.onmessage = function (evt) {
                  //console.log(evt)               
                  if((evt.data)!="pong"){
                    let datas = JSON.parse(evt.data)
                    // let datas = [{'equipId':'15','value':'0'}]
                    datas.map(v => {
                      _this.updateList.map(e => {  // 0 成功； 1失败
                        if(e.id == v.equipId) {
                          e.executeStatus = v.value
                        }
                      })
                    })
                     _this.updateList.map(e => {
                      if(e.executeStatus != 2) {
                        _this.updateWs.close()
                        _this.turnBtn = false
                      }
                    })
                  }            
                  // 收到消息，重置定时器 
                  clearTimeout(_this.updateWs.receiveMessageTimer);
                  _this.updateWs.receiveMessageTimer = setTimeout(() => {
                    _this.updateWs.close();
                  }, 30000); // 30s没收到信息，代表服务器出问题了，关闭连接。
                };

                // 断开 web socket 连接成功触发事件
                _this.updateWs.onclose = function () {
                  clearTimeout(_this.updateWs.receiveMessageTimer); 
                  clearInterval(_this.updateWs.keepAliveTimer); 
                  if(!reconnectMark) { // 如果没有重连过，进行重连。 
                    reconnect = new Date().getTime(); 
                    reconnectMark = true; 
                  } 
                  let tempcontrolAllWs = _this.updateWs; // 保存_this.buildListWs对象 
                  if(new Date().getTime() - reconnect >= 10000) { // 10秒中重连，连不上就不连了 
                    _this.fiexdSendWs.close(); 
                  } else { 
                    // _this.updateWs = new WebSocket(window.SITE_CONFIG.wsBaseUrl + token + "/outlet" + "/groupcontrol");
                    _this.updateWs.onopen = tempcontrolAllWs.onopen; 
                    _this.updateWs.onmessage = tempcontrolAllWs.onmessage;
                    _this.updateWs.onerror = tempcontrolAllWs.onerror; 
                    _this.updateWs.onclose = tempcontrolAllWs.onclose; 
                    _this.updateWs.keepalive = tempcontrolAllWs.keepalive; 
                    _this.updateWs.last_health_time = -1; 
                  }
                };
              }
            }
            
          })
        })
      }
    }
  },
  destroyed() {
  }
};
</script>
<style scoped>
.version {
  display: flex;
}

/* 左侧树样式开始 */
.lefttree {
  width: 10%;
  min-width: 200px;
  border-radius: 5px;
  padding: 5px 0 5px 10px;
  border: 1px solid rgba(204, 204, 204, 31%);
  box-shadow: 5px 5px 16px rgba(204, 204, 204, 91%),
    0px 0px 3px rgba(204, 204, 204, 91%);
}
.treeredefine {
  background: transparent;
}
.lefttree
  >>> .el-tree--highlight-current
  .el-tree-node.is-current
  > .el-tree-node__content
  .build {
  display: inline-block;
  background: url("~@/assets/images/tree-icon11.png") no-repeat;
  height: 16px;
  width: 16px;
  margin-right: 10px;
  vertical-align: middle;
  line-height: 16px;
}
.lefttree >>> .is-expanded {
  /* border-bottom: 2px solid red; */
}
.lefttree
  >>> .el-tree--highlight-current
  .el-tree-node.is-current
  > .el-tree-node__content
  .floor {
  display: inline-block;
  background: url("~@/assets/images/tree-icon22.png") no-repeat;
  height: 16px;
  width: 16px;
  margin-right: 10px;
  vertical-align: middle;
  line-height: 16px;
}
.lefttree
  >>> .el-tree--highlight-current
  .el-tree-node.is-current
  > .el-tree-node__content
  .room {
  display: inline-block;
  background: url("~@/assets/images/tree-icon33.png") no-repeat;
  height: 16px;
  width: 16px;
  margin-right: 10px;
  vertical-align: middle;
  line-height: 16px;
}
.build {
  display: inline-block;
  background: url("~@/assets/images/tree-icon1.png") no-repeat;
  height: 16px;
  width: 16px;
  line-height: 16px;
  margin-right: 10px;
  vertical-align: middle;
}
.floor {
  display: inline-block;
  background: url("~@/assets/images/tree-icon2.png") no-repeat;
  height: 16px;
  width: 16px;
  line-height: 16px;
  margin-right: 10px;
  vertical-align: middle;
}
.room {
  display: inline-block;
  background: url("~@/assets/images/tree-icon3.png") no-repeat;
  height: 16px;
  width: 16px;
  line-height: 16px;
  margin-right: 10px;
  vertical-align: middle;
}
.tree-expand {
  /* display: inline-block; */
  position: absolute;
  right: 10%;
  background: url("~@/assets/images/tree-open.png") no-repeat;
  height: 15px;
  width: 15px;
  /* text-align: right; */
}
.shrink {
  position: absolute;
  right: 10%;
  background: url("~@/assets/images/tree-close.png") no-repeat;
  height: 15px;
  width: 15px;
}
/* 左侧树样式结束 */

/* 右侧样式开始 */
.rightversion {
  flex: 1;
  overflow: auto;
  padding-left: 20px;
  display: flex
}
.uploadbtn {
    flex: 1
}
.updatebtn {
    flex: 2
}
/* 右侧样式结束 */

/* 升级弹框样式开始 */
.updatedialog {
  height: 100%;
  border: 1px solid #ccc
}
.updatedialog .updatedialog-top {
  height: 20%;
  overflow-y: auto;
  padding: 20px;
  border-bottom: 1px solid #ccc
}
.updatedialog .updatedialog-bottom {
  height: 80%;
  padding: 20px
}
.execute{
  display: inline-block;
  width: 32px;
  height: 32px;
  background-size: 100% 100%;
  background-image: url("~@/assets/images/loading.gif");
}
.success{
  display: inline-block;
  width: 24px;
  height: 24px;
  background-size: 100% 100%;
  background-image: url("~@/assets/images/success.gif");
}
.fail{
  display: inline-block;
  width: 24px;
  height: 24px;
  background-size: 100% 100%;
  background-image: url("~@/assets/images/fail.gif");
}
/* 升级弹框样式结束 */
</style>

