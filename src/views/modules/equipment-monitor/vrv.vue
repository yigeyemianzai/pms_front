<template>
    <div class="vrvzone" id="vrvzone">
        <div class="vrvzone-top">
            <div class="vrvzone-left">
                <!-- <div class="vrvzone-top-input">
                    <el-date-picker
                        v-model="value1"
                        placeholder=""
                        :picker-options="pickerOptions">
                    </el-date-picker>
                </div> -->
                <div class="vrvzone-top-date">
                    <el-date-picker
                        v-model="value1"
                        placeholder=""
                        :picker-options="pickerOptions">
                    </el-date-picker>
                </div>
                <div id="vrvzone-left"></div>
            </div>
            <div class="vrvzone-right">
                <div class="vrvzone-right1" >
                    <table>
                        <tr>
                            <td><img src="~@/assets/images/v06.png" /></td>
                            <td>电监测设备：</td>
                            <td><span>{{sysDatas.monitorTotal}}</span> 台</td>
                        </tr>
                        <tr>
                            <td><img src="~@/assets/images/v05.png" /></td>
                            <td>异常设备：</td>
                            <td><span>{{sysDatas.monitorExceSum}}</span> 台</td>
                        </tr>
                        <tr>
                            <td><img src="~@/assets/images/v04.png" /></td>
                            <td>离线设备：</td>
                            <td><span>{{sysDatas.monitorlostSum}}</span> 台</td>
                        </tr>
                    </table>
                </div>
                <div class="vrvzone-right1">
                    <table>
                        <tr>
                            <td><img src="~@/assets/images/v03.png" /></td>
                            <td>内机数量：</td>
                            <td><span>{{sysDatas.devTotal}}</span> 台</td>
                        </tr>
                        <tr>
                            <td><img src="~@/assets/images/v02.png" /></td>
                            <td>异常数量：</td>
                            <td><span>{{sysDatas.devExceSum}}</span> 台</td>
                        </tr>
                        <tr>
                            <td><img src="~@/assets/images/v01.png" /></td>
                            <td>运行设备：</td>
                            <td><span>{{sysDatas.devRunSum}}</span> 台</td>
                        </tr>
                    </table>
                </div>
                <div class="vrvzone-right2">
                    <table>
                        <tr>
                            <td><img src="~@/assets/images/v09.png" /></td>
                            <td>系统今日能耗：</td>
                            <td><span>{{sysDatas.todayKW}}</span> kWh</td>
                        </tr>
                        <tr>
                            <td><img src="~@/assets/images/v07.png" /></td>
                            <td>系统本月能耗：</td>
                            <td><span>{{sysDatas.monthKW}}</span> kWh</td>
                        </tr>
                        <tr>
                            <td><img src="~@/assets/images/v08.png" /></td>
                            <td>系统累计能耗：</td>
                            <td><span>{{sysDatas.totalKW}}</span> kWh</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
        <div class="vrvzone-bottom" v-if="iszone">
            <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="电表分区" name="dianbiaozone">
                    <div class="vrvzone-list1 inclear" v-for="item in dianbiaoZone" :key="item.areaId">
                        <div class="bottom_list">
                            <div class="list-img">
                               <img src="~@/assets/images/light-list6.png"  @click="showDetialPage(item.areaId)"  />
                            </div>
                            <div class="list-text">
                                <p>名称：{{item.areaName}}</p>
                                <p>编号： {{item.areaId}}</p>                          
                            </div>
                        </div>
                        <div class="bottom-lists">                           
                            <!-- <p>
                                <span>平均温度：{{item.avgRoomTemp}} ℃</span>
                            </p> -->
                            <p>
                                <span>设备数量：{{item.total}}</span>
                            </p>
                            <p>
                                <span>离线设备数量：{{item.offLineCount}}</span>
                            </p>
                        </div>                   
                        <!-- <div class="list-visit" >
                            <p v-for="(one,index) in item.points"  :key="one.index" :class="index%2==0?'':'list-color'">
                            <span>{{item.points[index].anme}}:{{item.points[index].value}}{{item.points[index].unit}}</span>
                            </p> 
                        </div> -->
                    </div>
                </el-tab-pane>
                <el-tab-pane label="内机分区" name="neijizone">
                    <div class="vrvzone-list1 inclear" v-for="item in neijiZone" :key="item.areaId">
                        <div class="bottom_list">
                            <div class="list-img">
                               <img src="~@/assets/images/light-list7.png" @click="showDetialPage(item.areaId)" />
                            </div>
                            <div class="list-text">
                                <p>名称：{{item.areaName}}</p>
                                <p>编号： {{item.areaId}}</p>                          
                            </div>
                        </div>
                        <div class="bottom-lists">
                            <p>
                                <span>平均温度：{{item.avgRoomTemp}} ℃</span>
                            </p>
                            <p>
                                <span>设备数量：{{item.total}}</span>
                            </p>
                            <p>
                                <span>未运行设备数量：{{item.offLineCount}}</span>
                            </p>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
        <div class="vrvzone-bottom" v-else>
            <div class="bottom_button inclear">
                <el-button type="warning" @click="showZonePage()">返回</el-button>
                <el-button type="primary" @click="showControlDailog()" v-if="able">群控</el-button>           
            </div>
            
            <div class="vrvzone-list inclear" id="vrvLists">
                <!-- 电表页面 -->
                <template id="ammeter" v-if="meterMachine">
                    <div class="bottom_div" v-for="item in ammeterData" :key="item.id">
                        <div class="bottom_head">
                            <div class="bottom_name nameimg">电表名称：{{item.name}}</div>
                            <div class="bottom_number">编号：{{item.equipId}}</div>
                            <!-- <div class="bottom_img" style="background-image:url(~@/assets/images/v012.png)"></div> -->
                            <!-- <div :class="item.runStatus | electricityRunstatus"></div> -->
                        </div>
                        <div class="bottom_head">
                            <div class="bottom_name energyimg">今日能耗：<span class="value">{{item.dailyEnergy  | nonull}}</span> kWh</div>
                            <div class="bottom_name powerimg">当前功率：<span class="value">{{item.power}}</span> kW</div>
                        </div>
                        <div class="bottom_footer inclear">
                          <!-- <table> -->
                            <div v-for="i in item.points" class="bottom_footer_div">
                              <div>{{i.anme}}:</div>
                              <div><span class="value">{{i.value}}</span> {{i.unit}}</div>
                            </div>
                        </div>
                    </div> 
                </template>      
                             
                <!-- 内机页面 -->
                <template id="machine" v-else>
                  <!-- 指定ID的边框为红色 -->
                    <div :class="key.equipId | colorSet" v-for="key in machineData" :key="key.id">
                    <!-- <div class="bottom_div" v-for="key in machineData" :key="key.id"> -->
                        <div class="bottom_head">
                            <div class="bottom_name machinenameimg">内机名称：{{key.name}}</div>
                            <div class="bottom_number">编号：{{key.equipId}}</div>
                            <div :class="key.callStatus | electricityRunstatus"></div>
                        </div>
                        <div class="bottom_footer_2">
                            <div class="bottom_cont statusimg">
                                <div>运行状态：{{key.runStatus | judgeStatus}}</div>
                                <el-radio-group v-model="key.runStatus1">
                                    <el-radio label='0'>开</el-radio>
                                    <el-radio label='1'>关</el-radio>
                                </el-radio-group>
                                <el-button plain size="mini" @click="setRunStatus(key.equipId,key.runStatus1)">设定</el-button>
                                <!-- <input type="radio" value="开" name="condition" checked="checked" /><span>开</span>
                                <input type="radio" value="关" name="condition" /><span>关</span> -->
                            </div>
                            <div class="bottom_cont tempimg">
                                <div>室内温度：{{key.roomTemp}}°C</div>
                                <el-select v-model="key.roomTemp1" placeholder="请选择" size='mini'>
                                    <el-option
                                        v-for="item in optionTemperature"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                        >
                                    </el-option>
                                </el-select>                          
                                <el-button plain size="mini" @click="setRoomTemp(key.equipId,key.roomTemp1)">设定</el-button>
                            </div>
                            <div class="bottom_cont volumeimg">
                                <div>风量：{{key.airVolume | judgeAirVolume}}</div>
                                <el-radio-group v-model="key.airVolume1">
                                    <el-radio label='1'>弱</el-radio>
                                    <el-radio label='2'>强</el-radio>
                                </el-radio-group>
                                <el-button plain size="mini" @click="setAirVolume(key.equipId,key.airVolume1)">设定</el-button>
                            </div>
                            <div class="bottom_cont bottom_last modeimg">
                                <div>模式：{{key.airMode | judgeAirMode}}</div>
                                <el-radio-group v-model="key.airMode1">
                                    <el-radio label="1">制冷</el-radio>
                                    <el-radio label="2">制热</el-radio>
                                    <el-radio label="3">通风</el-radio>
                                    <el-radio label="4">自动</el-radio>
                                </el-radio-group>
                                <el-button plain size="mini" @click="setAirMode(key.equipId,key.airMode1)">设定</el-button>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
            <!-- 群控页面 -->
            <el-dialog title="群控选择" :visible.sync="dialogTableVisible">
                <div class="groupcontrol" >
                    <div class="groupcontrol-top" style="z-index: 1">
                      <el-checkbox  :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                        <el-checkbox-group v-model="checkboxed" @change="handleCheckedCitiesChange">
                            <!-- <el-checkbox :label="item.id" v-for="item in checkboxes" :key="item.id">{{item.value}}</el-checkbox> -->
                            <el-checkbox :label="item.equipId + '/' + item.stationId" v-for="item in savemachine" :key="item.equipId">{{item.name}}</el-checkbox>                            
                        </el-checkbox-group>
                    </div>
                    <div class="groupcontrol-footer">
                        <div class="groupcontrol-footer-cont">
                            <p>开关设置</p>
                            <el-radio-group v-model="radio1">
                                <el-radio label="0">开</el-radio>
                                <el-radio label="1">关</el-radio>
                            </el-radio-group>
                            <el-button plain size="mini" @click="setupSwitch">设定</el-button>                         
                        </div>
                        <div class="groupcontrol-footer-cont">
                            <p>温度调节</p>
                            <el-select v-model="valueTemperature1" placeholder="请选择" size='mini'>
                                <el-option
                                    v-for="item in optionTemperature"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                    >
                                </el-option>
                             </el-select>
                            <el-button plain size="mini" @click="setupTemperature">设定</el-button>
                        </div>
                        <div class="groupcontrol-footer-cont">
                            <p>风量调节</p>
                            <el-radio-group v-model="radio2">
                                <el-radio label="1">弱</el-radio>
                                <el-radio label="2">强</el-radio>
                            </el-radio-group>
                            <el-button plain size="mini" @click="setupFan">设定</el-button>
                        </div>
                        <div class="groupcontrol-footer-cont">
                            <p>运行模式</p>
                            <el-radio-group v-model="radio3">
                                <el-radio label="1">制冷</el-radio>
                                <el-radio label="2">制热</el-radio>
                                <el-radio label="3">通风</el-radio>
                                <el-radio label="4">自动</el-radio>
                            </el-radio-group>
                            <el-button plain size="mini" @click="setupMode">设定</el-button>
                        </div>
                    </div>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import { changeTime2 } from '@/utils/index'  
export default {
    data () {
        return {
            dianbiaoZone: '',  // 电表分区面板数据
            neijiZone: '',  // 内机分区面板数据
            iszone: '1', // 判断是分区面板还是详情面板 true为分区 false为详情
            activeName: 'dianbiaozone', //面板TAB页点击值
            checkAll: false,
            partitionChecked: [],  // 下拉框已选信息 包含多级ID
            optionsPartition: [], // 下拉框列表信息
            // 群控页面 按钮信息
            radio1: '',
            radio2: '',
            radio3: '',
            checkboxed: [],  // 群控页面已选设备
            isIndeterminate: true,
            valueTemperature: '',
            valueTemperature1: '',
            optionTemperature: [
                {
                value: '16',
                label: '16℃'
                },
                {
                value: '17',
                label: '17℃'
                },
                {
                value: '18',
                label: '18℃'
                },{
                value: '19',
                label: '19℃'
                },{
                value: '20',
                label: '20℃'
                }, {
                value: '21',
                label: '21℃'
                }, {
                value: '22',
                label: '22℃'
                }, {
                value: '23',
                label: '23℃'
                }, {
                value: '24',
                label: '24℃'
                },{
                value: '25',
                label: '25℃'
                },{
                value: '26',
                label: '26℃'
                },{
                value: '27',
                label: '27℃'
                },{
                value: '28',
                label: '28℃'
                },{
                value: '29',
                label: '29℃'
                },{
                value: '30',
                label: '30℃'
                },{
                value: '31',
                label: '31℃'
                },{
                value: '32',
                label: '32℃'
                }],
            machineData: '',  // 内机信息
            ammeterData: '',  // 电表信息
            meterMachine: true,  // 展示内机、电表详情面板 true为电表，false为内机
            // checkboxes:[{id: 1, value: '一楼值班室'},
            //         {id: 2, value: '一楼走廊-1'},
            //         {id: 3, value: '一楼走廊-2'},
            //         {id: 4, value: '二楼值班室'},
            //         {id: 5, value: '二楼走廊-1'},
            //         {id: 6, value: '二楼走廊-2'},
            //         {id: 7, value: '三楼值班室'},
            //         {id: 8, value: '三楼走廊-1'},
            //         {id: 9, value: '三楼走廊-2'}
            //         ],
            
            dialogTableVisible: false,  // 群控按钮弹出内容
            sysDatas: '',  // 系统信息
            value1: new Date(),  //  选择日期值
            // 设置选择今天及以前的时间
            pickerOptions: {
                disabledDate (time) {
                return time.getTime() > Date.now()
                }
            },
            /* optionsType: [{
                value: '选项1',
                label: '电表'
                }, {
                value: '选项2',
                label: '内机'
                }],
            valueType: '选项1', */
            /* optionsPartition: [{
                value: '选项1',
                label: '分区1'
                }, {
                value: '选项2',
                label: '分区2'
                }, {
                value: '选项3',
                label: '分区3'
                }, {
                value: '选项4',
                label: '分区4'
                }, {
                value: '选项5',
                label: '分区5'
            }],
            valuePartition: '', */
            k: '1',
            able:"",  // 判断是电表还是内机详情面板  true为内机 false为电表
            cur_data:"",
            ws: '',  // 折线图websocket
            series_data: [],  // 折线图数据
            xAxis_data: [],
            legend_data: [],
            machineWs: '',  // 内机websocket
            savemachine: []    // 保存内机数据 滚动加载
        }
    },
    created () {
        // this.value1 = new Date()
    },
    mounted () {
        document.getElementById('vrvzone').style.height = (window.innerHeight-170)+'px'       
        this.initVRVline () // 获取折线图数据
        this.vrvInfo()  // 获取系统信息
        this.getDianbiaoZone()
        // this.getSelections()  // 展示分区信息
        window.onresize = function () {
            if(document.getElementById('vrvzone')){
                document.getElementById('vrvzone').style.height = (window.innerHeight - 170) + 'px'
                echarts.init(document.getElementById('vrvzone-left')).resize()
            }
        }
    },
    watch: {
        'value1': 'initVRVline',
        'partitionChecked': 'partitionData'
    },
    methods: {
        // 详情页返回按钮
        showZonePage(){
            this.iszone = !this.iszone
        },
        // 选择电表或者内机的分区 展示详情面板 并判断是内机还是电表
        showDetialPage(id,e) {
            this.iszone = false
            // console.log(this.activeName)
            if(this.activeName == 'dianbiaozone') {
                this.$options.methods.vrvCinfo.bind(this)(id)
                if(this.machineWs != '') {
                    this.machineWs.close()   
                }
            }else if(this.activeName == 'neijizone') {
                this.$options.methods.vrvCinfo2.bind(this)(id)
            }
            // console.log(id)
        },
        // 切换内机、电表tab
        handleClick(tab, event) {
            // console.log(tab, event);
            // console.log(tab.name);
            event.preventDefault()
            if(tab.name == 'dianbiaozone') {
                this.able = false
                this.$options.methods.getDianbiaoZone.bind(this)()             
            }else if(tab.name == 'neijizone') {
                this.able = true
                this.$options.methods.getNeijiZone.bind(this)()
            }
        },
        // 获取电表分区
        getDianbiaoZone () {
            this.meterMachine = true
            this.$http({
                url: this.$http.adornUrl('/device/vrvair/ammeterarealist'),
                method: 'post',
                data: this.$http.adornData({
                })
            }).then(({data}) => {
                if(data.msg === 'success'){
                    this.dianbiaoZone  = data.info
                }  
            })
        },
        // 获取内机分区
        getNeijiZone () {
            this.meterMachine = false
            this.$http({
                url: this.$http.adornUrl('/device/vrvair/neiji'),
                method: 'post',
                data: this.$http.adornData({
                })
            }).then(({data}) => {
                if(data.msg === 'success'){
                    console.log(data)

                    this.neijiZone = data.info
                    // console.log(this.neijiZone)
                }  
            })
        },
        // 获取分区信息
        /* getSelections () {
            if(this.activeName == 'dianbiaozone') {

            }else if(this.activeName == 'neijizone') {
                
            }
          this.$http({
            url: this.$http.adornUrl('/device/vrvair/area'),
            method: 'post',
            data: this.$http.adornData({
            })
          }).then(({data}) => {
            if(data.msg === 'success'){
                this.dianbiaoZone = ''
                this.neijiZone = ''
            }            
          })
        }, */
        // 选框改变
        partitionData (value) {
            // console.log(value)         
            /* if(value[0] == 'dianbiaozone') {
                this.able = false
                this.meterMachine = true
                this.$options.methods.vrvCinfo.bind(this)()
                if(this.machineWs != '') {
                    this.machineWs.close()   
                }                     
            }else if(value[0] == 'neijizone') {
                this.able = true
                this.meterMachine = false
                this.$options.methods.vrvCinfo2.bind(this)()
            } */
        },
        // 电表信息
        vrvCinfo (id) {
            let areaIds = new Array (id)
          // console.log(1)
          /* console.log(typeof this.partitionChecked[1] == "object" && this.partitionChecked[1].constructor == Array)
          let areaIds = this.partitionChecked[1]
          if((typeof this.partitionChecked[1] == "object" && this.partitionChecked[1].constructor == Array) == false) {
            areaIds = new Array (areaIds)
          } */
          // console.log(areaIds)
          this.$http({
              // url: this.$http.adornUrl('/device/x'), 
              url: this.$http.adornUrl('/device/vrvair/lists'),                          
              method: 'post',
              data: this.$http.adornData({
                  "areaIds": areaIds, // 楼层
                  "type":"1", // 1电表；2内机
              })
          }).then(({data}) => {
              if(data.msg === 'success'){
                  this.ammeterData = data.info
                  // console.log(data.info[0].points)
              }               
          })
        },
        // 内机信息
        vrvCinfo2 (id) {
          // console.log(2)
          if(this.machineWs != ''){
            this.machineWs.close()
          }  
          let areaIds = new Array (id)
          /* let areaIds = this.partitionChecked[1]
          if((typeof this.partitionChecked[1] == "object" && this.partitionChecked[1].constructor == Array) == false) {
            areaIds = new Array (areaIds)
          } */
          // console.log(areaIds)
          this.$http({
              url: this.$http.adornUrl('/device/vrvair/x'),   
              method: 'post',
              data: this.$http.adornData({
                  "areaIds": areaIds, // 楼层
                  "type":"2", // 1电表；2内机
              })
          }).then(({data}) => {
              if(data.msg === 'success'){
                // console.log(data.info)
                let _this = this
                this.checkAll=false
                this.isIndeterminate=true
                  this.savemachine = data.info
                  if(data.info.length > 12){
                      let ar=[]
                    for(let i=0;i<12;i++) {
                        ar.push(this.savemachine[i])    
                    }
                    // 
                    this.machineData = ar

                    let a = 12
                    document.getElementById('vrvLists').scrollTop = 0
                    document.getElementById('vrvLists').onscroll = function () {
                        let t = document.getElementById('vrvLists').scrollTop
                        // console.log(document.getElementById('vrvLists').scrollTop)
                        // console.log(document.getElementById('vrvLists').scrollHeight)
                        // console.log(document.getElementById('vrvLists').scrollHeight - t)
                        if ((document.getElementById('vrvLists').scrollHeight - t) < ((window.innerHeight-170)*0.8)) {
                            // alert(1)
                            a+=12
                            for(let i=a-12;i<a;i++){
                                if(_this.savemachine[i]){
                                    _this.machineData.push(_this.savemachine[i])
                                }
                            
                            }
                        }
                    }
                  }else {
                      this.machineData = data.info
                  }
                  
                
                  // this.aaa = this.machineData
                  // 内机websocket
                  let token = this.$cookie.get('token')
                  let arr = []
                    for (let i=0;i<data.info.length;i++) {
                        arr.push(data.info[i].runStatusId)
                        arr.push(data.info[i].roomTempId)
                        arr.push(data.info[i].airVolumeId)
                        arr.push(data.info[i].airModeId)
                    }
                    // console.log(arr)
                  // _this.machineWs = new WebSocket("ws://123.207.167.163:9010/ajaxchattest")
                  
                 _this.machineWs = new WebSocket(window.SITE_CONFIG.wsBaseUrl+ token + '/' + "vrv" + "/" + "inner")
                //  _this.machineWs = new WebSocket(window.SITE_CONFIG.wsBaseUrl+ token + '/' + "vrv" + "/" + "inner")


                //心跳
                _this.machineWs.last_health_time = -1; // 上一次心跳时间, -1代表还没有发过心跳
                _this.machineWs.keepalive = function() {
                    let time = new Date().getTime();
                    // console.log(time)
                    // console.log(_this.machineWs.last_health_time )
                    if( _this.machineWs.last_health_time !== -1 && (time -  _this.machineWs.last_health_time) > 25000) { // 不是刚开始连接并且超过25s没有心跳
                    
                        _this.machineWs.close()
                    } else { 
                        // 如果断网了，ws.send会无法发送消息出去。ws.bufferedAmount不会为0。
                        if( _this.machineWs.bufferedAmount === 0 &&  _this.machineWs.readyState === 1) { 
                            _this.machineWs.send('ping');
                            _this.machineWs.last_health_time = time;
                        }
                    }
                }

                let reconnect = 0; //重连的时间
                let reconnectMark = false; //是否重连过

                  // 建立 web socket 连接成功触发事件                   
                    _this.machineWs.onopen = function () {
                        // console.log("open ...")
                    // 使用 send() 方法发送数据
                        _this.machineWs.send(arr)

                        
                        reconnect = 0;
                        reconnectMark = false;
                        _this.machineWs.receiveMessageTimer = setTimeout(() => {
                            _this.machineWs.close();
                        }, 45000); // 45s没收到信息，代表服务器出问题了，关闭连接。如果收到消息了，重置该定时器。
                        if( _this.machineWs.readyState === 1) { // 为1表示连接处于open状态
                            _this.machineWs.keepAliveTimer = setInterval(() => {
                                _this.machineWs.keepalive();
                            }, 5000)
                        }
                    }
                    // WebSocket连接发生错误
                    _this.machineWs.onerror = function (evt) {
                        // console.log("WebSocket连接发生错误")
                    }
                    // 接收服务端数据时触发事件
                    _this.machineWs.onmessage = function (evt) {
                      if((evt.data)!="pong"){
                        let receive = JSON.parse(evt.data)
                        // let receive = {"id":"100004000994001",value:"0"}
                        // console.log(_this.savemachine)
                         _this.savemachine.map(e=>{
                          // console.log('abc')
                            if(e.runStatusId == receive.id){
                                e.runStatus = receive.value
                            }else if(e.roomTempId == receive.id){
                                e.roomTemp = receive.value
                            }else if(e.airVolumeId == receive.id){
                                e.airVolume = receive.value
                            }else if(e.airModeId == receive.id){
                                e.airMode = receive.value
                            }
                        })
                    
                      }
                      
                    
                        
                        
                       
                        /* for(let i=0;i<_this.machineData.length;i++){
                            if(data.id == _this.machineData[i].runStatusId){
                                _this.machineData[i].runStatus = data.value
                            }else if(data.id == _this.machineData[i].roomTempId){
                                _this.machineData[i].roomTemp = data.value
                            }else if(data.id == _this.machineData[i].airVolumeId){
                                _this.machineData[i].airVolume = data.value
                            }else if(data.id == _this.machineData[i].airModeId){
                                _this.machineData[i].airMode = data.value
                            }
                        } */
                        clearTimeout( _this.machineWs.receiveMessageTimer); 
                        _this.machineWs.receiveMessageTimer = setTimeout(() => {
                            _this.machineWs.close();
                        }, 45000); // 45s没收到信息，代表服务器出问题了，关闭连接。

                    }
                    // 断开 web socket 连接成功触发事件
                     _this.machineWs.onclose = function () {
                        clearTimeout(_this.machineWs.receiveMessageTimer);
                        clearInterval(_this.machineWs.keepAliveTimer);
                        if(!reconnectMark) { // 如果没有重连过，进行重连。
                        reconnect = new Date().getTime();
                        reconnectMark = true;
                        }
                        let tempWs = _this.machineWs; // 保存ws对象
                        if(new Date().getTime() - reconnect >= 10000) { // 10秒中重连，连不上就不连了
                            _this.machineWs.close();
                        } else {
                            // _this.machineWs = new WebSocket(window.SITE_CONFIG.wsBaseUrl+ token + '/' + "vrv" + "/" + "inner")
                            // _this.machineWs = new WebSocket(window.SITE_CONFIG.wsBaseUrl+ token + '/' + "vrv" + "/" + "inner");                            
                            _this.machineWs.onopen = tempWs.onopen;
                            _this.machineWs.onmessage = tempWs.onmessage;
                            _this.machineWs.onerror = tempWs.onerror;
                            _this.machineWs.onclose = tempWs.onclose;
                            _this.machineWs.keepalive = tempWs.keepalive;
                            _this.machineWs.last_health_time = -1;
                        }

                    }

              }
          })
        },
        // 点击群控按钮
        showControlDailog () {
          this.dialogTableVisible = true
        },
        // 折线图
        initVRVline () {
            if(this.ws != '' ){
              this.ws.close()
            }
            this.$http({
              url: this.$http.adornUrl('/device/vrvair/chart/hourload'),
              method: 'post',
              data: this.$http.adornData({
                  'date': changeTime2(this.value1)
              })
            }).then(({data}) => {
                if(data.msg === 'success'){
                    console.log(data)
                    let arr = [];
                    for (let i = 0; i < 24; i++) {
                    if (i < 10) {
                        i = "0" + i
                    }
                    for (let j = 0; j < 60; j++) {
                        if (j < 10) {
                        j = "0" + j
                        }
                        arr.push(i + ":" + j)
                    }
                    }
                    arr.push("24:00")
                    // this.cur_data = /* parseInt */ (data.chart.series[0].data.length / arr.length * 100)
                    this.xAxis_data = data.chart.xAxis,
                    this.legend_data = data.chart.legend
                    this.series_data = data.chart.series
                    echarts.init(document.getElementById('vrvzone-left')).setOption(this.$options.methods.initChartsVRV(this.k,this.legend_data,this.series_data,arr,this.xAxis_data))
                    // websocket
                    if(changeTime2(this.value1) == changeTime2(new Date())){
                      let _this = this
                      let token = this.$cookie.get('token')
                      let arr = []
                        // console.log(data.highPower)
                        for (let item of data.chart.series) {
                            // console.log(item.id)
                            if(item.id != null){
                                arr.push(item.id)
                            }                           
                        }
                        // arr.push(data.chart.series[0].id)
                        // console.log(arr)
                      if ('WebSocket' in window) {
                          // let userToken = _this.$cookie.get('token')
                          // _this.ws = new WebSocket("ws://123.207.167.163:9010/ajaxchattest")
                          _this.ws = new WebSocket(window.SITE_CONFIG.wsBaseUrl + token + "/" + "vrv" + "/" + "curve" )
                          // ws = new WebSocket("/websocket/{userToken}");
                          _this.ws.onopen = function (evt) {
                            // console.log("Connection open ...")
                            _this.ws.send(arr)
                          };
                          _this.ws.onmessage = function (evt) {
                            let data = JSON.parse(evt.data)                            
                            // let data = {'id':'c2','value':'5'}
                            for (let i = 0; i < _this.series_data.length; i++) {
                              if (_this.series_data[i].id == data.id) {
                                _this.series_data[i].data.push(data.value)
                                // console.log(_this.series_data[i].data)
                              }
                            }
                            echarts.init(document.getElementById('vrv-left')).setOption(_this.$options.methods.initChartsVRV(_this.k,_this.legend_data,_this.series_data,arr,_this.xAxis_data))
                          };
                          _this.ws.onclose = function (evt) {
                            // console.log("Connection closed.")
                          };
                      } else {
                          alert('当前浏览器 Not support websocket')
                      }
                    }
                }               
            })           
        },
        // 折线图模板
        initChartsVRV(k,legend,series,arr,xAxis) {
            var obj = []
            // 实时负荷曲线有空置自动连上，预测负荷曲线不需要脸上
            /* for(let i=0;i<series.length;i++){
                if(i != 0){
                    let arr = {
                        name: legend[i],
                        data: series[i].data,
                        type: 'line',
                        // xAxisIndex: i,
                        connectNulls: true,  // 自动连接空值两端的值
                    }
                    obj.push(arr)  
                }else {
                    let arr = {
                        name: legend[i],
                        data: series[i].data,
                        type: 'line',
                        // xAxisIndex: i,
                        // connectNulls: true,
                    }
                    obj.push(arr)  
                }                     
            } */
            let ccc = {
                        name: legend[0],
                        data: series[0].data,
                        type: 'line',
                        // xAxisIndex: i,
                        // connectNulls: true,
                    }
                    obj.push(ccc)  
            // console.log(obj) 
            return Option = {
                grid:{
                    x:50,
                    x2:50,
                    y:30,
                },
                title: {
                    text: 'VRV空调系统24小时负荷',
                    textAlign: 'right',
                    x: '60%',
                    textStyle:{
                        fontSize: 18
                    }                   
                },
                color: ['#4ECDB8','#e00'],
                legend: {
                    data: legend,
                    icon: 'rect',
                    left: '10%'
                },
                dataZoom: [{
                show:true,
                zoomOnMouseWheel:true,
                type: 'slider',
                realtime: true, //拖动滚动条时是否动态的更新图表数据
                height: 20, //滚动条高度
                // start: cur_data - 8.4, //滚动条开始位置（共100等份）
                // end: cur_data //结束位置（共100等份）
              },{  
                 type: 'inside',  //鼠标滚轮
                 realtime : true,  
            },],
                tooltip: {
                    trigger: 'axis',
                },
                xAxis: [{
                    type: 'category',
                    data: xAxis==null?arr:xAxis,
                    boundaryGap: false,
                    name: '时间'
                }/* ,{
                    type: 'category',
                    data: xAxis==null?arr:xAxis,
                    boundaryGap: false,
                    name: '时间',
                    axisLabel: {
                        textStyle: {
                        color: 'red' //x轴刻度数值颜色
                        }
                    },
                } */],
                yAxis: {
                    min:0,
                    max:series[0].data==false?800:null,
                    type: 'value',
                    axisLabel: {
                    //设置y轴数值为
                    formatter: '{value} kw',
                    textStyle: {
                        color: '#000' //y轴刻度数值颜色
                    }
                    },
                },
                series: obj
            };
        },
        // 系统信息
        vrvInfo () {            
          this.$http({
            url: this.$http.adornUrl('/device/vrvair/info'),
            method: 'post'
          }).then(({data}) => {
            if(data.msg === 'success') {
                this.sysDatas = data.info
            }
          })
        },       
        /* {
                "equipId":"1", 
                "stationId":"1",
                "runStatus":"1",  // 运行状态（0开；1关）
                "roomTemp":"12",  // 运行温度
                "airVolume":"1",  //  风量（1弱；2强）
                "airMode":"1" // 模式（1制冷；2制热；3通风） 
            } */
        // 内机群控 开关设定按钮
        setupSwitch(){
          // console.log(this.checkboxed)
          this.$confirm('是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {                  
            let obj = []
            for(let i=0;i<this.checkboxed.length;i++){
                let arr = {
                    'equipId': this.checkboxed[i].split('/')[0],
                    "stationId": this.checkboxed[i].split('/')[1],
                    "runStatus": this.radio1
                }                
                obj.push(arr)
            }            
            this.$options.methods.setupMachine.bind(this)(obj)
          })
        },
        // 内机群控 温度调节按钮
        setupTemperature(){
            // console.log(this.valueTemperature1)
            this.$confirm('是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              let obj = []
              for(let i=0;i<this.checkboxed.length;i++){
                  let arr = {
                      'equipId': this.checkboxed[i].split('/')[0],
                      "stationId": this.checkboxed[i].split('/')[1],
                      "roomTemp": this.valueTemperature1
                  }                
                  obj.push(arr)
              }            
              this.$options.methods.setupMachine.bind(this)(obj)
            })
        },
        // 内机群控 风量调节按钮
        setupFan(){
            // console.log(this.radio2)
            this.$confirm('是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              let obj = []
              for(let i=0;i<this.checkboxed.length;i++){
                  let arr = {
                      'equipId': this.checkboxed[i].split('/')[0],
                      "stationId": this.checkboxed[i].split('/')[1],
                      "airVolume":this.radio2
                  }                
                  obj.push(arr)
              }            
              this.$options.methods.setupMachine.bind(this)(obj)
            })
        },
        // 内机群控 运行模式按钮
        setupMode(){
            // console.log(this.radio3)
            this.$confirm('是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              let obj = []
              for(let i=0;i<this.checkboxed.length;i++){
                  let arr = {
                      'equipId': this.checkboxed[i].split('/')[0],
                      "stationId": this.checkboxed[i].split('/')[1],
                      "airMode":this.radio3
                  }                
                  obj.push(arr)
              }            
              this.$options.methods.setupMachine.bind(this)(obj)
            })
        },
        // 设定按钮事件
        setupMachine(obj) {
            // console.log(obj)
            this.$http({
                url: this.$http.adornUrl('/device/vrvair/control'),   
                method: 'post',
                data: obj
            }).then(({data}) => {
                if(data.msg === 'success'){
                  // this.$options.methods.vrvCinfo2.bind(this)()
                  this.$message({
                    message: "设定成功",
                    type: 'success'
                  })
                }
            })
        },
        // 单个设置运行状态
        setRunStatus(equipId, runStatus1) {
          this.$confirm('是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let obj = []
            let arr = {
                'equipId': equipId,
                "runStatus": runStatus1
            }                
            obj.push(arr)   
            this.$options.methods.setupMachine.bind(this)(obj)
          })            
        },
        // 单个室内温度
        setRoomTemp(equipId, roomTemp1) {
          // console.log(roomTemp1)
          this.$confirm('是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let obj = []
            let arr = {
                'equipId': equipId,
                "roomTemp": roomTemp1
            }                
            obj.push(arr)        
            this.$options.methods.setupMachine.bind(this)(obj)
          })
        },
        // 单个风量
        setAirVolume(equipId, airVolume1) {
          this.$confirm('是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let obj = []
            let arr = {
                'equipId': equipId,
                "airVolume": airVolume1
            }                
            obj.push(arr)    
            this.$options.methods.setupMachine.bind(this)(obj)
          })
        },
        // 单个模式
        setAirMode(equipId, airMode1) {
          this.$confirm('是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let obj = []
            let arr = {
                'equipId': equipId,
                "airMode": airMode1
            }                
            obj.push(arr)           
            this.$options.methods.setupMachine.bind(this)(obj)
          })
        },
        // 全选按钮
        handleCheckAllChange(val) {
          let arr = []
          for(let i=0;i<this.savemachine.length;i++){
            let a = this.savemachine[i].equipId + '/' + this.savemachine[i].stationId
            // console.log(a)
            arr.push(a)
          }
          this.checkboxed = val ? arr : []
          this.isIndeterminate = false
        },
        handleCheckedCitiesChange(value) {
            let checkedCount = value.length
            this.checkAll = checkedCount === this.machineData.length
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.machineData.length   
        }
    },
    filters: {
    // 指定ID的边框为红色
        colorSet: function (value) {
          // console.log('列出ID模板边框为红色ID:' + value)
          // VRV空调：列出ID模板边框为红色
          let arr = [
            10000400016,
            10000400022,
            10000400050,
            10000400066,
            10000400070,
            10000400098,
            10000400099,
            10000400102,
            10000400104,
            10000400108,
            10000400112,
            10000400117,
            10000400125
          ]
          //  如果存在返回值的下标，不存在返回-1
          if(arr.indexOf(value) != -1){
            return 'bottom_div1'
          }else {
            return 'bottom_div'
          }    
          /* if(value == 1) {
            return 'bottom_div1'
          }else {
            return 'bottom_div'
          } */
        },
        // 0 正常 1 异常
        electricityRunstatus: function (value) {
            if(value == 0) {
                return 'bottom_img stateimage'
            }else if (value == 1 || value == null) {
                return 'bottom_img errorimage'
            }           
        },
        // 风机运行状态（0开；1关）
        judgeStatus: function(value) {
            if(value === '0'){
                return '开'
            }else if(value == '1') {
                return '关'
            }else if(value == ''){
                return ''
            }
        },
        // 风机风量（1弱；2强）
        judgeAirVolume: function(value) {
            if(value == '1'){
                return '弱'
            }else if(value == '2') {
                return '强'
            }else if(value == ''){
                return ''
            }
        },
        // 模式（1制冷；2制热；3通风）
        judgeAirMode: function(value) {
            if(value == '1'){
                return '制冷'
            }else if(value == '2') {
                return '制热'
            }else if(value == '3') {
                return '通风'
            }else if(value == '4') {
                return '自动'
            }else if(value == ''){
                return ''
            }
        },
        nonull(val){
          if(val == null) {
            return 0
          }else {
            return val
          }
        }
    },
    destroyed () {       
        if(this.ws != ''){
            this.ws.close()
        }  
        if(this.machineWs != ''){
            this.machineWs.close()
        }       
    }
}
</script>
<style scoped>
.vrvzone{
	width: 100%;
    height: 100%
}
.vrvzone .el-tabs--border-card {
    background-color: #F2F2F2
}
.vrvzone .bottom_list{
    height: 30%;
    border-bottom: 1px solid #ccc
}
.vrvzone .bottom_list .list-img {
    width: 40%;
    height: 100%;
    display: inline-block;
    vertical-align:middle;
    position: relative;
    
}
.vrvzone .bottom_list .list-text {
    width: 50%;
    height: 100%;
    display: inline-block;
    vertical-align:middle
}
.vrvzone .bottom_list .list-img img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 100%;
    max-height: 100%;
    cursor: pointer;
}
.vrvzone .bottom-lists {
    width: 90%;
    height: 63%;
    margin: 0 auto;
    margin-top: 2%;
    border: 1px solid #ccc;
    border-radius: 10px;
    overflow-y: auto;
    font-size: 14px;
}
.vrvzone .bottom-lists p:nth-of-type(even) {
    background-color: #eceaea;
}
.vrvzone .bottom-lists p {
    height: 20%;
    margin: 0;
    line-height: 220%;
    padding: 0% 4%;
}

.vrvzone .value{
    color: #4aceb7;
    font-weight: 700;
}
.vrvzone .el-input--medium .el-input__inner{
    text-align: center;
}
.vrvzone-top{
	width: 100%;
	height: 40%;
	border-bottom: 5px solid #ccc; 
	/* position: relative;
	min-width:1200px;
	min-height:400px; */
}
.vrvzone-left{
	width: 70%;
	height: 100%;
	border-right: 5px solid #ccc;
    float: left;
    position: relative;
}
#vrvzone-left{
	width: 100%;
    height: 95%;   
}
.vrvzone-top-input{
	width: 20%;
	padding: 0.5%;
	text-align: center;
	/* float: right;
	margin-right: 3%; */ 
    margin-left: 70%
}
.vrvzone-top-input input{
	width: 75%;
	padding: 1%;
	text-align: center; 
	border: 2px solid #ccc;
	font-size: 1wh;
}
.vrvzone-top-date {
    position: absolute;
    top: -4%;
    right: 4%;
    width: 15%;
    z-index: 1000;
}
.vrvzone-top-date .el-date-editor.el-input {
    width: 100%;
}
.vrvzone-right{
	width: 29.7%;
    height: 100%;
	float: left;
	margin: 0;
	text-align: center;
}
.vrvzone-right1{
	width:calc(50% - 2.5px);
	/* min-width:200px; */
	float: left;
	height:40%;
    font-size: 0.8vw
}
.vrvzone-right1 table {
    width: 90%;
    height: 80%;
    margin: 0
}
.vrvzone-right1 table tr td {
    /* padding-bottom: 5%; */
    text-align: left
}
.vrvzone-right1 table tr td img{
    width: 2vw;
    height: 2vw;
}
.vrvzone-right1:first-child{
	border-right:5px solid #ccc;
}
.vrvzone-right1 table tr td:nth-child(1) {
    text-align: right;
}
.vrvzone-right1 table tr td:nth-child(2) {
    text-align: center;
}
.vrvzone-right1 table tr td:nth-child(3)  span{
    text-align: left;
    color: #4aceb7;
    font-weight: 700
}

/* 
.vrvzone-right-list{
	margin:10% 0px;
	height:20px;
	width:170px;
	padding:0px 15px;
}
.vrvzone-right-list img{
	float: left;
	width:20px;
	height:20px;
}
.vrvzone-right-list p{
	float: left;
	margin:0 5px;
	font-size:12px;
	line-height:20px;
}
.vrvzone-right-list span{
	color: rgb(0,199,187);
	font-size: 12px;
	margin-left: 10px;
	line-height:20px;
} */


.vrvzone-right2{
	float: left;
	width:100%;
	/* padding-top:20px; */
	height:calc(60% - 25px);
	border-top:5px solid #ccc;
    font-size: 0.8vw
}
.vrvzone-right2 table {
    height: 100%;
    width: 100%;
    margin-left: 10%
}
.vrvzone-right2 table tr td{
    /* padding-bottom: 5%; */
    text-align: right;
}
.vrvzone-right2 table tr td img {
    width: 2vw;
    height: 2vw;
}
.vrvzone-right2 table tr td:nth-child(2) {
    text-align: center;
    width: 40%;
}
.vrvzone-right2 table tr td:nth-child(3) {
    text-align: left;
}
.vrvzone-right2 table tr td:nth-child(3) span {
    color: #4aceb7;
    font-weight: 700
}

/* .vrvzone-right2-list{width:250px;margin:0 auto;}
.vrvzone-right2-list img{
	float: left;
	width:40px;
	height:40px;
}
.vrvzone-right2-list p{
	float: left;
	margin:0 5px;
	font-size:20px;
	line-height:40px;
}
.vrvzone-right2-list span{
	color: rgb(0,199,187);
	font-size: 20px;
	margin-left: 10px;
	line-height:20px;
}
 */
.vrvzone-bottom{
	width: 100%;
	height: 56%;
	margin: 0
}
/* 卡片tab高度100% */
.vrvzone-bottom .el-tabs--border-card {
    height: 100%;
    margin-top: 1%
}
.vrvzone-bottom .el-tabs--border-card >>> .el-tabs__content {
    height: 95%;
}
.vrvzone-bottom .el-tabs--border-card .el-tabs__content .el-tab-pane{
    height: 90%;
    overflow-y: scroll
}
.vrvzone-bottom .bottom_button{
	width: 100%;
	height: 15%;
    /* padding-left: 65% */
	/* margin:0 auto;
    padding-right: 10% */
}
/* .vrvzone-bottom .bottom_button .el-select, .vrvzone-bottom .bottom_button .el-select--medium {
    width: 10%;
}
.vrvzone-bottom .bottom_button .el-button, .vrvzone-bottom .bottom_button .el-select {
    float: right;
    margin-right: 10px;
    margin-top: 20px
} */
.vrvzone-bottom .bottom_button .el-button:nth-child(2) , .vrvzone-bottom .bottom_button .el-cascader {
    float: right;
    margin-right: 10px;
    margin-top: 20px
}
.vrvzone-bottom .bottom_button .el-button:nth-child(1) , .vrvzone-bottom .bottom_button .el-cascader {
    float: left;
    margin-right: 10px;
    margin-top: 20px
}
.vrvzone-bottom .bottom_button .button_r{
	float: right;
	width:7%;
}
.sub_buton{
	width:70%;
	height:24px;
	background-color:#ddd;
	border-radius:5px;
	color: #333;
	text-align: center;
	font-size:1vw;
	line-height:24px;
}
.vrvzone-list1{
	width: 21%;
	height:90%;
	margin-left:3%;
	background-color: #F2F2F2;
    border-radius: 2%;
    margin: 0 0 2% 3%;
    border: 1px solid #ccc;
    display: inline-block;
}
.vrvzone-list {
    padding:10px 0;
	width: 96%;
	height:90%;
	margin-left:3%;
	background-color: #F2F2F2;
    overflow-y: auto
}

.vrvzone-list .bottom_div{position: relative;float: left;width:24%;height:99%;margin-right:1%;border-radius:10px;/* display: table; */margin-bottom: 1%;border: 2px solid #ccc;border-radius:10px;}
.vrvzone-list .bottom_div1 {position: relative;float: left;width:24%;height:99%;margin-right:1%;border-radius:10px;/* display: table; */margin-bottom: 1%;border: 2px solid rgb(247, 7, 7);border-radius:10px;}
.vrvzone-list .bottom_div::after, .vrvzone-list .bottom_div1::after{content: "";/* position: absolute; */top:0px;left:0px;height:100%;width:100%;}
.vrvzone-list .bottom_div .bottom_head, .vrvzone-list .bottom_div1 .bottom_head{position: relative;height:20%;width: 100%;border-bottom:2px solid #ccc;}
.vrvzone-list .bottom_div .bottom_head:nth-child(2), .vrvzone-list .bottom_div1 .bottom_head:nth-child(2) {
    height: 30%;
}
.vrvzone-list .bottom_div .bottom_head .bottom_name, .vrvzone-list .bottom_div1 .bottom_head .bottom_name{position: absolute;left:0.8vw;padding-left:2.5vw;height:50%;min-height:50px;font-size:0.8vw;line-height:300%;background-size:2vw 2vw;background-repeat: no-repeat;background-position: 0.3vw 0.3vw;}
.vrvzone-list .bottom_div .bottom_head .energyimg, .vrvzone-list .bottom_div1 .bottom_head .energyimg {
    background-image:url(~@/assets/images/v010.png)
}
.vrvzone-list .bottom_div .bottom_head .nameimg, .vrvzone-list .bottom_div1 .bottom_head .nameimg {
    background-image:url(~@/assets/images/v013.png)
}
.vrvzone-list .bottom_div .bottom_head .powerimg, .vrvzone-list .bottom_div1 .bottom_head .powerimg {
    background-image:url(~@/assets/images/v011.png);
    bottom: 0px;
}
.machinenameimg {
    background-image:url(~@/assets/images/v019.png)
}
.statusimg {
    background-image:url(~@/assets/images/v01.png)
}
.tempimg {
    background-image:url(~@/assets/images/v014.png)
}
.volumeimg {
    background-image:url(~@/assets/images/v015.png)
}
.modeimg {
    background-image:url(~@/assets/images/v016.png)
}

.stateimage {
    background-image:url(~@/assets/images/v018.png)
}
.errorimage {
    background-image:url(~@/assets/images/v012.png)
}
.vrvzone-list .bottom_div .bottom_head:nth-child(1) .bottom_name, .vrvzone-list .bottom_div1 .bottom_head:nth-child(1) .bottom_name {font-weight: 700}
.vrvzone-list .bottom_div .bottom_head .bottom_number, .vrvzone-list .bottom_div1 .bottom_head .bottom_number{position: absolute;bottom:10px;left:3.3vw;height:50%;font-size:0.8vw;line-height:300%;}
.vrvzone-list .bottom_div .bottom_head .bottom_img, .vrvzone-list .bottom_div1 .bottom_head .bottom_img{position: absolute;width:12%;height:70%;top:50%;right:15%;background-size:100% 100%;background-repeat: no-repeat;margin-top: -6%;min-width:40px}
.vrvzone-list .bottom_div .bottom_footer, .vrvzone-list .bottom_div1 .bottom_footer{height: 50%;width: 100%;padding-top: 1%;overflow-y: scroll; padding: 2% 5%}
/* .vrvzone-list .bottom_div .bottom_footer_1{padding-left: 15%;float: left;height: 40px;line-height: 40px;} */
.vrvzone-list .bottom_div .bottom_footer_2, .vrvzone-list .bottom_div1 .bottom_footer_2{position: relative;z-index: 1;height: 80%;padding-left: 0.6vw}
.vrvzone-list .bottom_div .bottom_footer_2 .bottom_cont, .vrvzone-list .bottom_div1 .bottom_footer_2 .bottom_cont{height: 25%;background-size: 2vw 2vw;background-repeat: no-repeat;background-position: 0.5vw 0.5vw;padding: 0 0 0 2.5vw;line-height: 2;font-size: 0.8vw}
/* .insole_box{padding-left: 100px;float: left;padding-top: 10px;}
.insole_box_1{padding-top: 20px;padding-bottom: 20px;} */

.bottom_div_3_1 {
    height: 100%;
}
.bottom_footer table {
    width: 95%;
    height: 90%;
    margin: 0 0 0 5%;
    font-size: 0.8vw
}
.bottom_footer_div {
  width: 50%;
  height: 28%;
  float: left;
}
.bottom_footer_div div {
  display: inline-block;
  float: left;
  width: 49%;
}

.bottom_cont .el-select {
    width: 70%;
}
.bottom_cont .el-select .el-input {
    width: 50%;
}
.bottom_cont .el-radio-group {
    width: 70%;
}
.bottom_last .el-radio {
    padding-right: 5px
}
.bottom_last .el-radio__label{
    padding-left: 5px
}
.bottom_last .el-radio-group .el-radio+.el-radio {
    margin-left: 0
}


.bottom_div_3_2 {
    height: 100%;
    border: 1px solid #ccc
}
.bottom_div_3_2 .bottom_head {
    overflow: hidden;
    overflow-y: auto;
    height: 30%;
    padding: 20px;
}
.vrvzone-bottom .el-dialog {
    height: 60%;
    width: 40%;
}
.vrvzone-bottom .el-dialog__body {
    height: 90%;
}

.vrvzone-bottom .groupcontrol {
    height: 100%;
    border: 1px solid #ccc
}
.vrvzone-bottom .groupcontrol-top {
    height: 30%;
    overflow-y: auto;
    padding: 20px;
    border-bottom: 1px solid #ccc
}
.vrvzone-bottom .groupcontrol-top .el-checkbox+.el-checkbox {
    margin-left: 0;
    width: 25%;
}
.vrvzone-bottom .groupcontrol-top .el-checkbox {
    width: 25%;
}
.vrvzone-bottom .groupcontrol-footer {
    height: 70%;
}
.vrvzone-bottom .groupcontrol-footer-cont {
    height: 25%;
    padding-left: 5%;
    padding-top: 1%
}
.vrvzone-bottom .groupcontrol-footer-cont p {
    margin: 0;
    font-size: 0.8vw
}
.vrvzone-bottom .groupcontrol-footer-cont .el-select {
    width: 15%;
    font-size: 0.8vw
}
.vrvzone-bottom .groupcontrol-footer-cont .el-button {
    margin-left: 5%;
    font-size: 0.8vw
}
.vrvzone-bottom .groupcontrol-footer-cont .el-radio__label {
    font-size: 0.8vw
}
.vrvzone-bottom >>> .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active {
  color: #fff
}
</style>
