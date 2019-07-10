<template>
  <nav class="site-navbar" :class="'site-navbar--' + navbarLayoutType">
    <h1 class="site-navbar__header"><img src="../assets/images/building.png" class="nav_img1">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="../assets/images/nav-title.png"></h1>
    <el-menu
      class="site-navbar__menu site-navbar__menu--right"
      mode="horizontal">
      <!-- <el-menu-item index="1" class="site-navbar__avatar hidden-sm-and-down" @click="handleCommandOrdinary">
        <template slot="title">
          <el-row style="width:100px;color:#ffde00">
            <el-col :span="6">
              <i class="icon-warning" style="color:#f3e43b"></i>
            </el-col>
            <el-col :span="14" style="color:#333333;font-weight:600">普通告警</el-col>
          </el-row>
        </template>
      </el-menu-item> -->
      <el-menu-item index="2" class="site-navbar__avatar hidden-sm-and-down" @click="handleCommandEquipment">
        <template slot="title">
          <el-row style="width:100px;color:#ff7800">
            <el-col :span="6">
              <el-badge :value="equipNum" class="item">
                <i class="icon-warning" style="color:#e8772c"></i>
              </el-badge>
            </el-col>
            <el-col :span="14" style="color:#333333;font-weight:600">设备告警</el-col>
          </el-row>
        </template>
      </el-menu-item>
      <!-- <el-menu-item index="5" class="site-navbar__avatar hidden-sm-and-down" @click="handleOutOfLimit">
        <template slot="title">
          <el-row style="width:100px;color:#ff7800">
            <el-col :span="6">
              <el-badge :value="outOfLimitNum" class="item">
                <i class="icon-warning" style="color:#e8772c"></i>
              </el-badge>
            </el-col>
            <el-col :span="14" style="color:#333333;font-weight:600">越限告警</el-col>
          </el-row>
        </template>
      </el-menu-item> -->
      <!-- <el-menu-item index="6" class="site-navbar__avatar hidden-sm-and-down" @click="handleEnergy">
        <template slot="title">
          <el-row style="width:100px;color:#ff7800">
            <el-col :span="6">
              <el-badge :value="energyNum" class="item">
                <i class="icon-warning" style="color:#e8772c"></i>
              </el-badge>
            </el-col>
            <el-col :span="14" style="color:#333333;font-weight:600">能耗告警</el-col>
          </el-row>
        </template>
      </el-menu-item> -->
      <!-- <el-menu-item index="3" class="site-navbar__avatar hidden-sm-and-down" @click="handleCommandUrgent">
        <template slot="title">
          <el-row style="width:120px;color:#ff0000">
            <el-col :span="6">
              <i class="icon-warning" style="color:#ef344a"></i>
            </el-col>
            <el-col :span="14" style="color:#333333;font-weight:600">需求响应事件</el-col>
          </el-row>
        </template>
      </el-menu-item> -->
      <!-- <el-menu-item index="4" class="site-navbar__avatar hidden-sm-and-down">
        <template slot="title">
          <el-row style="width:120px;color:#ff0000">
            <el-col :span="6">
              <i class="icon-warning" style="color:#9845f5"></i>
            </el-col>
            <el-col :span="14" style="color:#333333;font-weight:600">系统事件</el-col>
          </el-row>
        </template>
      </el-menu-item> -->
      <el-menu-item class="site-navbar__avatar" index="4">
        <el-dropdown :show-timeout="0" placement="bottom">
          <span class="el-dropdown-link">
            <img src="~@/assets/images/avatar.png" :alt="userName">{{ userName }}
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="updatePasswordHandle()">修改密码</el-dropdown-item>
            <el-dropdown-item @click.native="logoutHandle()">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-menu-item>
    </el-menu>
    <!-- <el-dialog title="普通警告" :visible.sync="dialogTableVisible" :append-to-body="true" class="dialogstyle">
      <table class="dialogTable">
        <thead>
          <tr>
            <td>编号</td>
            <td>时间</td>
            <td>描述</td>
          </tr>
        </thead>
        <tbody>
          <tr v-if="ordinaryData == ''">
            <td colspan='3'>暂无数据</td>
          </tr>
          <tr v-for="item in ordinaryData" :key="item.id" v-else>
            <td>{{item.id}}</td>
            <td>{{item.alarmTime | change}}</td>
            <td>{{item.alarmDescribe}}</td>
          </tr>
        </tbody>
      </table>
    </el-dialog> -->
    <el-dialog :title="alarmTitle" :visible.sync="dialogEquipmentVisible" :append-to-body="true" class="alarmDialog">
      <div class="alarm">
        <el-table 
          :header-cell-style="{background:'#edeef0',color:'#000',fontWeight:'700'}"
          style="width: 100%"
          :data='alarmTableList'>
          <!-- <el-table-column 
            type="selection" 
            header-align="center" 
            align="center" 
            width="50" 
            label="序号" 
            fixed="left">
          </el-table-column> -->
          <el-table-column
            v-for="(item,index) in alarmTable"
            header-align="center" 
            align="center"
            :label="item.label"
            :prop="item.prop"
            :key="index"
            :min-width="item.minWidth">
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
    <!-- <el-dialog title="设备警告" :visible.sync="dialogEquipmentVisible" :append-to-body="true" class="dialogstyle">
      <table class="dialogTable">
        <thead>
          <tr>
            <td>编号</td>
            <td>设备名称</td>
            <td>时间</td>
            <td>描述</td>
          </tr>
        </thead>
        <tbody>
          <tr v-if="equipmentData == ''">
            <td colspan='3'>暂无数据</td>
          </tr>
          <tr v-for="item in equipmentData" :key="item.id" v-else>
            <td>{{item.id}}</td>
            <td></td>
            <td>{{item.alarmTime | change}}</td>
            <td>{{item.alarmDescribe}}</td>
          </tr>
        </tbody>
      </table>
    </el-dialog> -->
    <el-dialog title="需求响应" :visible.sync="dialogDemandVisible" :append-to-body="true" class="dialogstyle">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="紧急需求响应" name="ungent">
          <table class="dialogTable">
            <thead>
              <tr>
                <td>编号</td>
                <td>设备名称</td>
                <td>时间</td>
                <td>描述</td>
              </tr>
            </thead>
            <tbody>
              <tr v-if="urgentData == ''">
                <td colspan='3'>暂无数据</td>
              </tr>
              <tr v-for="item in urgentData" :key="item.id" v-else>
                <td>{{item.id}}</td>
                <td></td>
                <td>{{item.eventTime | change1}}</td>
                <td>{{item.eventDescribe}}</td>
              </tr>
            </tbody>
          </table>
        </el-tab-pane>
        <el-tab-pane label="非紧急需求响应" name="nonurgent">
          <table class="dialogTable">
            <thead>
              <tr>
                <td>编号</td>
                <td>设备名称</td>
                <td>时间</td>
                <td>描述</td>
              </tr>
            </thead>
            <tbody>
              <tr v-if="nonurgentData == ''">
                <td colspan='3'>暂无数据</td>
              </tr>
              <tr v-for="item in nonurgentData" :key="item.id" v-else>
                <td>{{item.id}}</td>
                <td></td>
                <td>{{item.eventTime | change1}}</td>
                <td>{{item.eventDescribe}}</td>
              </tr>             
            </tbody>
          </table>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
    <!-- 弹窗, 修改密码 -->
    <update-password v-if="updatePassowrdVisible" ref="updatePassowrd"></update-password>
  </nav>
</template>

<script>
  import UpdatePassword from './main-navbar-update-password'
  import { changeTime } from '@/utils/index'
  import { clearLoginInfo } from '@/utils'
  export default {
    data () {
      return {
        equipNum: null,  // 设备告警数量
        outOfLimitNum: null,  // 越限告警数量
        energyNum: null,  // 能耗告警数量
        energyWs: null,  // 能耗告警websocket
        OutOfLimitWs: null,  // 越限告警websocket
        equipWs: null,  // 设备告警websocket
        alarmTitle: null,
        alarmTable: [{
          label: '设备',
          prop: 'equip_name',
          minWidth: ''
        },{
          label: '时间',
          prop: 'alarm_time',
          minWidth: ''
        },{
          label: '描述',
          prop: 'alarm_describe',
          minWidth: '180'
        }],
        alarmTableList: [],
        updatePassowrdVisible: false,     
        websock1: null,
        websock2: null,
        websock3: null,
        websockData: '',
        // dropDataDemand: '',  // 需求响应信息数据        
        urgentDatas: '',
        // dropDataEquipment: '',  // 设备警告信息
        equipmentDatas: '',
        // dropDataOrdinary: '',  // 普通警告信息
        ordinaryDatas: '',
        ordinaryData: [],  // 普通警告
        dialogTableVisible: false,
        equipmentData: [],
        dialogEquipmentVisible: false,
        dialogDemandVisible: false,
        urgentData: [],
        nonurgentData: [],
        activeName: 'ungent',
        aa: '', // 记录弹框打开时websocket消息--普通告警
        bb: '', // 记录弹框打开时websocket消息--设备告警
        cc: '',
        dd: '' , // 记录弹框打开时websocket消息--需求响应事件
        clickA: 0,   // 用于记录普通告警信息的点击次数，当有新消息来时，归0，点击一次+1，当不是第一次点击时，列表数据清空
        clickB: 0,  // 用于记录设备告警信息的点击次数，当有新消息来时，归0，点击一次+1，当不是第一次点击时，列表数据清空
        clickC: 0
      }
    },
    components: {
      UpdatePassword
    },
    computed: {
      navbarLayoutType: {
        get () { return this.$store.state.common.navbarLayoutType }
      },
      sidebarFold: {
        get () { return this.$store.state.common.sidebarFold },
        set (val) { this.$store.commit('common/updateSidebarFold', val) }
      },
      mainTabs: {
        get () { return this.$store.state.common.mainTabs },
        set (val) { this.$store.commit('common/updateMainTabs', val) }
      },
      userName: {
        get () { return this.$store.state.user.name }
      }
    },
    created () {
      // this.initWebSocket ()
    },
    mounted () {
      this.getCount()
      this.initWebSockets()
    },
    watch: {
      // 判断是否在紧急需求响应页面 在的话就清空顶部消息提示
      $route: 'routers'
    },   
    methods: {
      // 状态值转换  0 未读  1 已读
      changeMaarker(cellValue) {
        if(cellValue.alarmMaarker == '0') {
          return '未读'
        }else if(cellValue.alarmMaarker == '1') {
          return '已读'
        }
      },     
      // 判断路由
      routers () {
        if(this.$route.fullPath.split('?')[0] === '/interactive-non-urgent'){
          this.urgentDatas = ''
        }else {
        }
      },
      // 点击需求响应提示信息 跳转至页面
      toUrgent () {
        // this.$router.push('/interactive-non-urgent')
      },
      // 普通告警点击 
      /* handleCommandOrdinary (command) {
        this.clickA = this.clickA + 1
        // console.log(this.clickA)
        if(this.aa != '' && this.clickA == 1){
          this.ordinaryData = this.aa
        }else if(this.clickA != 1) {
          this.ordinaryData = []
        }
        // console.log(command)
        this.$http({
          url: this.$http.adornUrl('/device/alarm/common'),
          method: 'post',
          data: this.$http.adornData({
            'alarmType': 1700
          })
        }).then(({data}) => {})
        this.dialogTableVisible = true
        this.ordinaryDatas = ''
      }, */
      // 能耗告警点击事件
      handleEnergy () {
        this.alarmTitle = '能耗告警'
        this.dialogEquipmentVisible = true
      },
      // 越限告警点击事件
      handleOutOfLimit () {
        this.alarmTitle = '越限告警'
        this.dialogEquipmentVisible = true
      },
      // 设备告警点击
      handleCommandEquipment (command) {
        this.alarmTitle = '设备告警'
        this.dialogEquipmentVisible = true
        this.$http({
          url: this.$http.adornUrl('/base/app/queryAlarmInfo'),
          method: 'post',
          data: this.$http.adornData({
            'alarmTime': null,
            'orgId': JSON.parse(window.sessionStorage.getItem('userInfo')).orgId,
            'type': '1'
          })
        }).then(({data}) => {
          if(data && data.code === 0) {
            this.alarmTableList = data.alarmInfo
            let arr =[], len = data.alarmInfo.length
            for(let i=0;i<len;i++){
              arr.push(data.alarmInfo[i].id)
            }
            if(arr.length != 0) {
              this.$http({
                url: this.$http.adornUrl('/base/app/updateAlarmStatus'),
                method: 'post',
                data: this.$http.adornData({
                  'list': arr
                })
              }).then(({data}) => {
                if(data && data.code === 0) {
                  this.equipNum = null
                }           
              })
            }           
          }         
        })
        // console.log(this.equipmentData)
        // this.clickB = this.clickB + 1
        // if(this.bb != '' && this.clickB == 1) {
        //   this.equipmentData = this.bb
        // }else if(this.clickB != 1) {
        //   this.equipmentData = []
        // }
        // console.log(command)
        /* this.$http({
          url: this.$http.adornUrl('/device/alarm/equip'),
          method: 'post',
          data: this.$http.adornData({
            'alarmType': 1701
          })
        }).then(({data}) => {})
        this.dialogEquipmentVisible = true
        this.equipmentDatas = '' */
      },
      // 需求响应事件点击
      handleCommandUrgent (command) {
        this.clickC = this.clickC + 1
        if(this.cc != '' && this.clickC == 1){
          this.urgentData = this.cc
        }else if(this.clickC != 1) {
          this.urgentData = []
        }
        this.dialogDemandVisible = true
        this.urgentDatas =''
        this.$http({
          url: this.$http.adornUrl('/device/alarm/urgent'),
          method: 'post',
          data: this.$http.adornData({
            'eventType': 1800
          })
        }).then(({data}) => {})
      },
      // 修改密码
      updatePasswordHandle () {
        this.updatePassowrdVisible = true
        this.$nextTick(() => {
          this.$refs.updatePassowrd.init()
        })
      },
      // 退出
      logoutHandle () {
        this.$confirm(`确定进行[退出]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/sys/logout'),
            method: 'post',
            data: this.$http.adornData()
          }).then(({data}) => {
            if (data && data.code === 0) {
              clearLoginInfo()
              this.$router.push({ name: 'login' })
            }
          })
        }).catch(() => {})
      },
      initWebSocket () {
        // 普通告警websocket
        // let token = '6532c4a6c11388e5d56d440d6081e802'
        let token = this.$cookie.get('token')
        this.websock1 = new WebSocket(window.SITE_CONFIG.wsBaseUrl+token+'/'+'warning'+'/'+'common')
        // this.websock1 = new WebSocket("ws://123.207.167.163:9010/ajaxchattest")
        // 建立 web socket 连接成功触发事件
        let _this = this
        this.websock1.onopen = function () {
          // 使用 send() 方法发送数据
          _this.websock1.send('')
          // alert("数据发送中...")
        }
        // WebSocket连接发生错误
        this.websock1.onerror = function (evt) {
          //console.log("WebSocket连接发生错误")
        }
        // 接收服务端数据时触发事件
        this.websock1.onmessage = function (evt) {
          // console.log(evt)
          // console.log(_this.dialogTableVisible == false) 
         _this.ordinaryDatas = JSON.parse(evt.data).count
          _this.clickA = 0       
          if(_this.dialogTableVisible == true) {
            _this.aa = JSON.parse(evt.data).list
          }else if(_this.dialogTableVisible == false){
            _this.ordinaryData = JSON.parse(evt.data).list
            _this.aa = ''
          }
          
         
        }
        // 断开 web socket 连接成功触发事件
        this.websock1.onclose = function () {
          // alert("连接已关闭...")
        }

        // 设备告警websocket
        this.websock2 = new WebSocket(window.SITE_CONFIG.wsBaseUrl+token+'/'+'warning'+'/'+'equipment')
        /// this.websock2 = new WebSocket("ws://123.207.167.163:9010/ajaxchattest")
        // 建立 web socket 连接成功触发事件
        this.websock2.onopen = function () {
          // 使用 send() 方法发送数据
          _this.websock2.send('')
          // alert("数据发送中...")
        }
        // WebSocket连接发生错误
        this.websock2.onerror = function (evt) {
         // console.log("WebSocket连接发生错误")
        }
        // 接收服务端数据时触发事件
        this.websock2.onmessage = function (evt) {
          // console.log(evt.data.count)
          /* _this.equipmentDatas = JSON.parse(evt.data).count
          _this.equipmentData = JSON.parse(evt.data).list */
          _this.clickB = 0
           _this.equipmentDatas = JSON.parse(evt.data).count        
          if(_this.dialogEquipmentVisible == true) {
            _this.bb = JSON.parse(evt.data).list
          }else if(_this.dialogEquipmentVisible == false){
            _this.equipmentData = JSON.parse(evt.data).list
            _this.bb = ''
          }


          /* let v = [], i=0
          setInterval(function() {
            _this.clickB = 0
            i=i+1
            v=v.concat([{
            "alarmDescribe":"一般告警2",
            "alarmMaarker":0,
            "alarmTime":1537502790000,
            "alarmType":1700,
            "equipId":1000000001,
            "id":i,
            "pointId":10037,
            "stationId":1000,
          }])
           _this.equipmentDatas = i     
          if(_this.dialogEquipmentVisible == true) {
            // alert(1)
            _this.bb = v
          }else if(_this.dialogEquipmentVisible == false){
            // alert(2)
            _this.equipmentData = v
            _this.bb = ''
          }
          },5000) */


          // _this.$options.methods.routers.bind(_this)()
          // alert("数据已接收...")
        }
        // 断开 web socket 连接成功触发事件
        this.websock2.onclose = function () {
          // alert("连接已关闭...")
        }

        // 需求响应事件websocket
        this.websock3 = new WebSocket(window.SITE_CONFIG.wsBaseUrl+token+'/'+'warning'+'/'+'warn')
        // this.websock3 = new WebSocket("ws://123.207.167.163:9010/ajaxchattest")
        // 建立 web socket 连接成功触发事件
        this.websock3.onopen = function () {
          // 使用 send() 方法发送数据
          _this.websock3.send('')
          // alert("数据发送中...")
        }
        // WebSocket连接发生错误
        this.websock3.onerror = function (evt) {
          // console.log("WebSocket连接发生错误");
        }
        // 接收服务端数据时触发事件
        this.websock3.onmessage = function (evt) {
          // console.log(evt)
          _this.clickC = 0
          _this.clickD = 0
          _this.urgentDatas = JSON.parse(evt.data).size
          /* _this.urgentData = JSON.parse(evt.data).events
          _this.nonurgentData = JSON.parse(evt.data).unimport */
          if(_this.dialogDemandVisible == true) {
            _this.cc = JSON.parse(evt.data).events
            _this.dd = JSON.parse(evt.data).unimport
            // _this.equipmentData = _this.equipmentData.concat(JSON.parse(evt.data).list)
          }else if(_this.dialogDemandVisible == false){
            _this.urgentData = JSON.parse(evt.data).events
            _this.nonurgentData = JSON.parse(evt.data).unimport
            _this.cc = ''
            _this.dd = ''
          }
          // _this.$options.methods.routers.bind(_this)()
          // alert("数据已接收...")
        }
        // 断开 web socket 连接成功触发事件
        this.websock3.onclose = function () {
          // alert("连接已关闭...")
        }
      },
      // 需求响应事件弹出框TAB
      handleClick(tab, event) {
        if(tab.$options.propsData.name == 'ungent') {
          if(this.cc != ''){
            this.urgentData = this.cc
          }
          this.$http({
            url: this.$http.adornUrl('/device/alarm/urgent'),
            method: 'post',
            data: this.$http.adornData({
              'eventType': 1800
            })
          }).then(({data}) => {})
        }else if(tab.$options.propsData.name == 'nonungent'){
          if(this.dd != ''){
            this.nonurgentData = this.dd
          }
          this.$http({
            url: this.$http.adornUrl('/device/alarm/urgent'),
            method: 'post',
            data: this.$http.adornData({
              'eventType': 1801
            })
          }).then(({data}) => {})
        }       
      },
      // 查看详情
      equipmentEdit(index, row) {
        // console.log(index, row)
      },
      ordinaryEdit(index, row) {
        // console.log(index, row)
      },
      urgentEdit (index, row) {
        // console.log(index, row)
        this.$router.push({path: '/interactive-non-urgent',query: {id: index.id}})
        this.dialogDemandVisible = false
      },
      nonurgentEdit (index, row) {
        // console.log(index, row)
        this.$router.push({path: '/interactive-non-urgent',query: {id: index.id}})
        this.dialogDemandVisible = false
      },
      //  设置首行颜色
      getRowClass({ row, column, rowIndex, columnIndex }) {
        if (rowIndex == 0) {
          return 'background:#edefee;color:#000;font-weight: 700'
        } else {
          return ''
        }
      },
      // 获取设备告警数量
      getCount () {
        this.$http({
          url: this.$http.adornUrl(`/base/talarmequip/count?orgId=${JSON.parse(window.sessionStorage.getItem('userInfo')).orgId}`),
          method: 'get',
        }).then(({data}) => {
          if(data && data.code === 0) {
            if(data.info == 0) {
              this.equipNum = null
            } else {
              this.equipNum = data.info
            }           
          }
        })
      },
      initWebSockets () {
        let _this = this, token = _this.$cookie.get('token')
        // 初始化一个 设备告警 WebSocket 对象
        _this.equipWs = new WebSocket(window.SITE_CONFIG.wsBaseUrl + token + "/warning/equipment");
        // _this.equipWs = new WebSocket("Ws://123.207.167.163:9010/ajaxchattest");
        _this.equipWs.last_health_time = -1; // 上一次心跳时间
        _this.equipWs.keepalive = function() { 
          let time = new Date().getTime();
          if(_this.equipWs.last_health_time !== -1 && time - _this.equipWs.last_health_time > 20000) { // 不是刚开始连接 并且 当前时间距离上次成功心跳的时间超过20秒
            _this.equipWs.close() 
          } else { // 如果断网了，equipWs.send会无法发送消息出去。equipWs.bufferedAmount不会为0。 
            if(_this.equipWs.bufferedAmount === 0 && _this.equipWs.readyState === 1) { 
              _this.equipWs.send('ping'); 
              _this.equipWs.last_health_time = time; 
            } 
          }
        }
        if(_this.equipWs) {
          let reconnect = 0; //重连的时间 
          let reconnectMark = false; //是否重连过 
          /* this.setState({ notificationSocket: true }) */
          // 建立 web socket 连接成功触发事件
          _this.equipWs.onopen = function () {
            reconnect = 0; 
            reconnectMark = false; 
            _this.equipWs.receiveMessageTimer = setTimeout(() => {
              _this.equipWs.close();
            }, 30000); // 30s没收到信息，代表服务器出问题了，关闭连接。如果收到消息了，重置该定时器。
            if(_this.equipWs.readyState === 1) { // 为1表示连接处于open状态
              _this.equipWs.keepAliveTimer = setInterval(() => {
                _this.equipWs.keepalive();
              }, 5000)
            }
          };
          _this.equipWs.onerror = () => {
            // console.error('onerror')
          }
          // 接收服务端数据时触发事件
          _this.equipWs.onmessage = function (evt) {
            //console.log(evt)               
            if((evt.data)!="pong"){
              let receive = JSON.parse(evt.data)
              _this.equipNum = receive.count
            }             
            // 收到消息，重置定时器 
            clearTimeout(_this.equipWs.receiveMessageTimer);
            _this.equipWs.receiveMessageTimer = setTimeout(() => {
              _this.equipWs.close();
            }, 30000); // 30s没收到信息，代表服务器出问题了，关闭连接。
          };

          // 断开 web socket 连接成功触发事件
          _this.equipWs.onclose = function () {
            clearTimeout(_this.equipWs.receiveMessageTimer); 
            clearInterval(_this.equipWs.keepAliveTimer); 
            if(!reconnectMark) { // 如果没有重连过，进行重连。 
              reconnect = new Date().getTime(); 
              reconnectMark = true; 
            } 
            let tempequipWs = _this.equipWs; // 保存_this.buildListWs对象 
            if(new Date().getTime() - reconnect >= 10000) { // 10秒中重连，连不上就不连了 
              _this.equipWs.close(); 
            } else { 
              // _this.equipWs = new WebSocket(window.SITE_CONFIG.wsBaseUrl + token + "/outlet" + "/fixedinstall");
              _this.equipWs.onopen = tempequipWs.onopen; 
              _this.equipWs.onmessage = tempequipWs.onmessage;
              _this.equipWs.onerror = tempequipWs.onerror; 
              _this.equipWs.onclose = tempequipWs.onclose; 
              _this.equipWs.keepalive = tempequipWs.keepalive; 
              _this.equipWs.last_health_time = -1; 
            }
          };
        }


        // 初始化一个 越限告警 WebSocket 对象
        /* _this.OutOfLimitWs = new WebSocket(window.SITE_CONFIG.wsBaseUrl + token + "");
        _this.OutOfLimitWs.last_health_time = -1; // 上一次心跳时间
        _this.OutOfLimitWs.keepalive = function() { 
          let time = new Date().getTime();
          if(_this.OutOfLimitWs.last_health_time !== -1 && time - _this.OutOfLimitWs.last_health_time > 20000) { // 不是刚开始连接 并且 当前时间距离上次成功心跳的时间超过20秒
            _this.OutOfLimitWs.close() 
          } else { // 如果断网了，OutOfLimitWs.send会无法发送消息出去。OutOfLimitWs.bufferedAmount不会为0。 
            if(_this.OutOfLimitWs.bufferedAmount === 0 && _this.OutOfLimitWs.readyState === 1) { 
              _this.OutOfLimitWs.send('ping'); 
              _this.OutOfLimitWs.last_health_time = time; 
            } 
          }
        }
        if(_this.OutOfLimitWs) {
          let reconnect = 0; //重连的时间 
          let reconnectMark = false; //是否重连过 
          // 建立 web socket 连接成功触发事件
          _this.OutOfLimitWs.onopen = function () {
            _this.OutOfLimitWs.send(equipIdArr)
            reconnect = 0; 
            reconnectMark = false; 
            _this.OutOfLimitWs.receiveMessageTimer = setTimeout(() => {
              _this.OutOfLimitWs.close();
            }, 30000); // 30s没收到信息，代表服务器出问题了，关闭连接。如果收到消息了，重置该定时器。
            if(_this.OutOfLimitWs.readyState === 1) { // 为1表示连接处于open状态
              _this.OutOfLimitWs.keepAliveTimer = setInterval(() => {
                _this.OutOfLimitWs.keepalive();
              }, 5000)
            }
          };
          _this.OutOfLimitWs.onerror = () => {
            // console.error('onerror')
          }
          // 接收服务端数据时触发事件
          _this.OutOfLimitWs.onmessage = function (evt) {
            //console.log(evt)               
            if((evt.data)!="pong"){
              let receive = JSON.parse(evt.data)
            }            
            // console.log(_this.items)              
            // 收到消息，重置定时器 
            clearTimeout(_this.OutOfLimitWs.receiveMessageTimer);
            _this.OutOfLimitWs.receiveMessageTimer = setTimeout(() => {
              _this.OutOfLimitWs.close();
            }, 30000); // 30s没收到信息，代表服务器出问题了，关闭连接。
          };
          // 断开 web socket 连接成功触发事件
          _this.OutOfLimitWs.onclose = function () {
            clearTimeout(_this.OutOfLimitWs.receiveMessageTimer); 
            clearInterval(_this.OutOfLimitWs.keepAliveTimer); 
            if(!reconnectMark) { // 如果没有重连过，进行重连。 
              reconnect = new Date().getTime(); 
              reconnectMark = true; 
            } 
            let tempOutOfLimitWs = _this.OutOfLimitWs; // 保存_this.buildListWs对象 
            if(new Date().getTime() - reconnect >= 10000) { // 10秒中重连，连不上就不连了 
              _this.OutOfLimitWs.close(); 
            } else { 
              // _this.OutOfLimitWs = new WebSocket(window.SITE_CONFIG.wsBaseUrl + token + "/outlet" + "/fixedinstall");
              _this.OutOfLimitWs.onopen = tempOutOfLimitWs.onopen; 
              _this.OutOfLimitWs.onmessage = tempOutOfLimitWs.onmessage;
              _this.OutOfLimitWs.onerror = tempOutOfLimitWs.onerror; 
              _this.OutOfLimitWs.onclose = tempOutOfLimitWs.onclose; 
              _this.OutOfLimitWs.keepalive = tempOutOfLimitWs.keepalive; 
              _this.OutOfLimitWs.last_health_time = -1; 
            }
          };
        } */



        // 初始化一个 能耗告警 WebSocket 对象
        /* _this.fiexdSendWs = new WebSocket(window.SITE_CONFIG.wsBaseUrl + token + "");
        _this.fiexdSendWs.last_health_time = -1; // 上一次心跳时间
        _this.fiexdSendWs.keepalive = function() { 
          let time = new Date().getTime();
          if(_this.fiexdSendWs.last_health_time !== -1 && time - _this.fiexdSendWs.last_health_time > 20000) { // 不是刚开始连接 并且 当前时间距离上次成功心跳的时间超过20秒
            _this.fiexdSendWs.close() 
          } else { // 如果断网了，fiexdSendWs.send会无法发送消息出去。fiexdSendWs.bufferedAmount不会为0。 
            if(_this.fiexdSendWs.bufferedAmount === 0 && _this.fiexdSendWs.readyState === 1) { 
              _this.fiexdSendWs.send('ping'); 
              _this.fiexdSendWs.last_health_time = time; 
            } 
          }
        }
        if(_this.fiexdSendWs) {
          let reconnect = 0; //重连的时间 
          let reconnectMark = false; //是否重连过 
          // 建立 web socket 连接成功触发事件
          _this.fiexdSendWs.onopen = function () {
            _this.fiexdSendWs.send(equipIdArr)
            reconnect = 0; 
            reconnectMark = false; 
            _this.fiexdSendWs.receiveMessageTimer = setTimeout(() => {
              _this.fiexdSendWs.close();
            }, 30000); // 30s没收到信息，代表服务器出问题了，关闭连接。如果收到消息了，重置该定时器。
            if(_this.fiexdSendWs.readyState === 1) { // 为1表示连接处于open状态
              _this.fiexdSendWs.keepAliveTimer = setInterval(() => {
                _this.fiexdSendWs.keepalive();
              }, 5000)
            }
          };
          _this.fiexdSendWs.onerror = () => {
          }
          // 接收服务端数据时触发事件
          _this.fiexdSendWs.onmessage = function (evt) {         
            if((evt.data)!="pong"){
              let receive = JSON.parse(evt.data)
            }            
            // console.log(_this.items)              
            // 收到消息，重置定时器 
            clearTimeout(_this.fiexdSendWs.receiveMessageTimer);
            _this.fiexdSendWs.receiveMessageTimer = setTimeout(() => {
              _this.fiexdSendWs.close();
            }, 30000); // 30s没收到信息，代表服务器出问题了，关闭连接。
          };
          // 断开 web socket 连接成功触发事件
          _this.fiexdSendWs.onclose = function () {
            clearTimeout(_this.fiexdSendWs.receiveMessageTimer); 
            clearInterval(_this.fiexdSendWs.keepAliveTimer); 
            if(!reconnectMark) { // 如果没有重连过，进行重连。 
              reconnect = new Date().getTime(); 
              reconnectMark = true; 
            } 
            let tempfiexdSendWs = _this.fiexdSendWs; // 保存_this.buildListWs对象 
            if(new Date().getTime() - reconnect >= 10000) { // 10秒中重连，连不上就不连了 
              _this.fiexdSendWs.close(); 
            } else {
              _this.fiexdSendWs.onopen = tempfiexdSendWs.onopen; 
              _this.fiexdSendWs.onmessage = tempfiexdSendWs.onmessage;
              _this.fiexdSendWs.onerror = tempfiexdSendWs.onerror; 
              _this.fiexdSendWs.onclose = tempfiexdSendWs.onclose; 
              _this.fiexdSendWs.keepalive = tempfiexdSendWs.keepalive; 
              _this.fiexdSendWs.last_health_time = -1; 
            }
          }
        } */

      }
    }, 
    filters: {
      // 时间戳转换
      change:function(value) {
        // console.log(value)
        return changeTime(value)
      },
      change1:function(value) {
        // console.log(value)
        return changeTime(value)
      }
    },   
    destroyed () {
      if(this.equipWs) {
        this.equipWs.onclose()
      }
      // this.websock1.onclose()
      // this.websock2.onclose()
      // this.websock3.onclose()
    }
  }
</script>
<style scoped>
  .nav_img1{
    margin-left: 180px;
  }
  .site-navbar__menu{
    background-color: $navbar--background-color;
  }
/* .item {
  margin-top: 10px;
  margin-right: 40px;
} */

.site-navbar__avatar .el-dropdown-link span{
  padding-left: 5px
}
.el-pagination {
  text-align: right
}
.el-table__body, .el-table__footer, .el-table__header {
  width: 100% !important;
}
.dialogTable {
  border-spacing: 0
}
.dialogTable, .dialogTable thead, .dialogTable tbody {
  width: 100%;
  border: 1px solid #ccc;
  text-align: center
}
.dialogTable thead tr td{
  background-color: #ccc
}
.dialogTable thead tr td, .dialogTable tbody tr td{
  border-right: 1px solid #ccc;
  border-bottom: 1px solid #ccc  
}
.dialogTable thead tr, .dialogTable tbody tr{
  height: 50px;
}
.dialogTable thead tr td:nth-last-child(1), .dialogTable tbody tr td:nth-last-child(1){
  border-right: none
}
.dialogTable tbody tr:nth-last-child(1) td{
  border-bottom: none
}
.dialogstyle .el-dialog__body{
  height: 400px;
  overflow-y: scroll 
}
.el-menu--horizontal>.el-menu-item:not(.is-disabled):hover {
  background-color: #f7f8f9
}
.alarmDialog >>> .el-dialog  {
  height: 70%;
}
.alarmDialog >>> .el-dialog__body {
  /*  min-height: 500px; */
  height: 90%;
}
.alarm {
  height: 100%;
  border: 1px solid #ccc;
  overflow-y: auto
}
</style>
