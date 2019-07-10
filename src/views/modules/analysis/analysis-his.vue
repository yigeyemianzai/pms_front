<template>
  <div class="content" id="content">
    <div class="analysis_cont">
      <div class="analysis_his_top">
        <div class="top-select">
          <el-cascader
            v-model="optionscheckeds"
            placeholder="选择系统"
            :options="options"
            filterable
            @change='changeData'
          ></el-cascader>
        </div>
        <el-dialog title="选择设备" :visible.sync="dialogVisibleEquipment" width="40%" top="15%" class="point_dialog" id="visibleEquipment">
          <div>*提示：仅可选择1-2个设备</div>
          <div class="point_list">
            <div class="point_single">
              <div class="point-title">{{checkEquipmentName}}</div>
              <el-checkbox-group 
                v-model="checkEquipment"
                :max='2'
                >
                <el-checkbox :label="item.equipId" v-for="item in checkEquipments" :key="item.equipId">{{item.equipName}}</el-checkbox>
              </el-checkbox-group>
            </div>
            
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisibleEquipment = false">取 消</el-button>
            <el-button type="primary" @click="equipmentChecked">确 定</el-button>
          </span>
        </el-dialog>  
        <div class="top-or" id="top-or" @click="clear()">选择点位</div>
        <el-dialog title="选择点位" :visible.sync="dialogVisible" width="40%" top="15%" class="point_dialog">
          <div>*提示：仅可选择相同类型下的点位</div>
          <div class="firstPoint">
            <p>设备名称：{{checkedPoints1.equipName}}</p>
            <div class="point_list">
              <div class="point_single" v-for="item in checkedPoints1.points" :key="item.codeId">
                <div class="point-title">{{item.codeName}}</div>
                <el-checkbox-group 
                  v-model="checkedPoint1"
                  >
                  <el-checkbox :label="item.codeId+'/'+key.pointId" v-for="key in item.list" :key="key.pointId">{{key.pointName}}</el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
          </div>
          <div class="firstPoint" v-if="secondPoint">
            <p>设备名称：{{checkedPoints2.equipName}}</p>
            <div class="point_list">
              <div class="point_single" v-for="item in checkedPoints2.points" :key="item.codeId">
                <div class="point-title">{{item.codeName}}</div>
                <el-checkbox-group 
                  v-model="checkedPoint2"
                  >
                  <el-checkbox :label="item.codeId+'/'+key.pointId" v-for="key in item.list" :key="key.pointId">{{key.pointName}}</el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
          </div>
          
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="judgePoints()">确 定</el-button>
          </span>
        </el-dialog>

        <template>
          <div class="anahis_data">
            <span class="demonstration">选择查询日期</span>
            <el-date-picker
              v-model="value6"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options='pickerOptions'>
            </el-date-picker>
          </div>
        </template>
        <div class="top-seo" @click="analysisSearch()">查询</div>
      </div>
      <div class="echarts-data">
        <div class="anahis_data-title">
          <div style="margin-top: 10px;margin-right:5%">
            <el-radio-group v-model="radioEquipment" size="medium">
              <el-radio-button :label="item.id"  v-for="item in radioEquipments" :key="item.id" :tab-click="changeTab()">{{item.name}}</el-radio-button>
            </el-radio-group>
          </div>
        </div>
        <div class="echarts-content" id="echarts-content"></div>
      </div>
      <div class="echarts-datas">
        <div class="anahis_data-title">
          <div style="margin-top: 10px;margin-right:5%">
            <el-radio-group v-model="radioPoint" size="medium">
              <el-radio-button :label="item.id" v-for="item in radioPoints" :key="item.id" :tab-click="changeTab()">{{item.name}}</el-radio-button>
            </el-radio-group>
          </div>
        </div>
        <div class="echarts-content" id="echarts-contents"></div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        radioPoint:'',  // 点位TAB默认选中值
        radioPoints:  [],  // 点位TAB值
        radioEquipment:'',  // 系统TAB默认选中值
        radioEquipments: [],  // 系统TAB值
        options: [],  // 选择设备联机菜单         
        optionscheckeds: [],
        dialogVisible: false,  // 点位选择界面状态
        value6: '',  // 选择日期的值
        dialogVisibleEquipment: false,  // 设备选择界面状态
        checkEquipments: [],  // 选择设备列表数据
        checkEquipment:[], // 已选设备信息
        checkEquipmentName: '',  // 记录设备分类
        // 设置选择今天及以前的时间
        pickerOptions: {
          disabledDate (time) {
            return time.getTime() > new Date().getTime() - 24*60*60*1000
          }
        },
        checkedPoint1: [], // 已选点位信息
        checkedPoint2: [],
        checkedPoints1: [],  // 选择点位列表数据
        checkedPoints2: [],
        chartxAxis: [],
        chartSeries: [],
        startTime: '',
        endTime: '',
        checkedPointIds: [],  // 记录处理完的已选点位
        equipmentValue:'',  // 记录已选设备类型
        secondPoint: false
      }
    },
    created () {
      this.checkedPoint1 = ['1200/1027']
      this.checkEquipment = ['10000200003']
      this.value6 = [new Date(new Date().getTime() - 24*60*60*1000),new Date(new Date().getTime() - 24*60*60*1000)]  // 默认时间为前一天      
      this.analysisSearch()
    },
    watch: {
      //  监听TAB点击改变事件
      /* 'radioPoint': 'changeTab',
      'radioEquipment': 'changeTab' */
    },
    mounted() {
      document.getElementById('content').style.height = (window.innerHeight - 170) + 'px'
      this.analysisSearch()
      this.en()
      window.onresize = function () {
        if(document.getElementById('content')){
          document.getElementById('content').style.height = (window.innerHeight - 170) + 'px'
          echarts.init(document.getElementById('echarts-content')).resize();
          echarts.init(document.getElementById('echarts-contents')).resize();
        }
      }
    },
    methods: {
      en() {
        // 选择系统
        this.$http({
          url: this.$http.adornUrl('/stategrid/answer/history/nav'),
          method: 'post',
        }).then(({
          data
        }) => {
          if (data.msg === "success") {
            this.options = data.options
          }
        })
      },
      // 判断选择的点位是否符合条件
      judgePoints () {
        console.log(this.checkedPoint1)
        console.log(this.checkedPoint2)
        var a,b
        if(this.checkedPoint1.length > 0){
          for(let i=0;i<this.checkedPoint1.length;i++){          
            if(this.checkedPoint1[i].split('/')[0] != this.checkedPoint1[0].split('/')[0]){
              this.$alert('请选择相同类型的点位！', '错误提示', {
                confirmButtonText: '确定'
              })
              a=0
              break
            }else if(i == this.checkedPoint1.length-1){
              a=1
            }
          }
        }else {
          a=1
        }
        
        if(this.checkedPoint2.length > 0){
          for(let i=0;i<this.checkedPoint2.length;i++){          
            if(this.checkedPoint2[i].split('/')[0] != this.checkedPoint2[0].split('/')[0]){
              this.$alert('请选择相同类型的点位！', '错误提示', {
                confirmButtonText: '确定'
              })
              b=0
              break
            }else if(i == this.checkedPoint2.length-1){
              b=1
            }
          }
        }else {
          b=1
        }
        
        console.log(a+'/'+b)
        if(a==1 && b==1){
          this.dialogVisible = false
        }
      },
      // 点击按钮
      analysisSearch () {
        console.log(this.checkEquipment)
        console.log(this.checkedPoint1)
        if(this.checkEquipment.length == 0){
          this.$alert('请选择设备！', '错误提示', {
            confirmButtonText: '确定'
          })
          return
        }
        if(this.checkedPoint1.length != 0 || this.checkedPoint2.length != 0){
        }else {
          this.$alert('请选择点位！', '错误提示', {
            confirmButtonText: '确定'
          })
          return
        }

        if(this.value6 != '') {
          let start = new Date(this.value6.toString().split(',')[0]),
          end= new Date(this.value6.toString().split(',')[1])
          let startNow = new Date(start),
          startY = startNow.getFullYear(),
          startM = ("0" + (startNow.getMonth() + 1)).slice(-2),
          startD = ("0" + startNow.getDate()).slice(-2)
          this.startTime = startY + '-' + startM + '-' +startD
          let endNow = new Date(end),
          endY = endNow.getFullYear(),
          endM = ("0" + (endNow.getMonth() + 1)).slice(-2),
          endD = ("0" + endNow.getDate()).slice(-2)
          this.endTime = endY + '-' + endM + '-' + endD
        }        
        // 系统信息折线图
        /* this.$http({
          url: this.$http.adornUrl('/statistics/history/chart/device'),
          method: 'post',
          params: {
            pointIds: point.toString(),
            beginTime: beginTime,
            endTime: endTime,
            equipIds: [12, 13, 11, 14]
          }, 
        }).then(({
          data
        }) => {
          if (data.msg === "success") {
            let xAxisDevice = data.chart.xAxis,
            legendDevice = data.chart.legend,
            seriesDevice = data.chart.series
            echarts.init(document.getElementById('echarts-contents')).setOption(this.$options.methods.initChartsdevices(legendDevice,seriesDevice,xAxisDevice))
          }
        })
        console.log(this.checkedPoint) */
        let obj = []
        for(let i=0;i<this.checkedPoint1.length;i++){         
          obj.push(this.checkedPoint1[i].split('/')[1])
        }
        for(let i=0;i<this.checkedPoint2.length;i++){         
          obj.push(this.checkedPoint2[i].split('/')[1])         
        }
        this.checkedPointIds = obj
        console.log(obj)
      

        // 点位信息折线图
        this.$http({
          url: this.$http.adornUrl('/statistics/history/chart/energy'),
          method: 'post',
          data: this.$http.adornData({
            'pointIds': this.checkedPointIds,
            'beginTime': this.startTime,
            'endTime': this.endTime,
            'equipIds': this.checkEquipment
          })
        }).then(({
          data
        }) => {
          if (data.msg === "success") {
            //  tab选项处理
            this.radioPoints = []
            this.radioEquipments = []
            for(let i=0;i<data.chart.legend.point.length;i++){
              let arr = {name : data.chart.legend.point[i].value,
                        id: data.chart.legend.point[i].id}
              this.radioPoints.push(arr)
              this.radioPoint = data.chart.legend.point[0].id
            }
            for(let i=0;i<data.chart.legend.equip.length;i++) {
              let arr = {name : data.chart.legend.equip[i].value,
                        id: data.chart.legend.equip[i].id}
              this.radioEquipments.push(arr) 
              this.radioEquipment = data.chart.legend.equip[0].id
            }
            this.chartxAxis = data.chart.xAxis
            this.chartSeries = data.chart.series
            this.$options.methods.changeTab.bind(this)()
          }
        })
      },
      // 切换折线图事件
      changeTab(){
        let pointLengend = [],  // 点位值
        pointSeries = [],
        equipmentLengend = [],  // 设备值
        equipmentSeries = []
        for(let i=0;i<this.chartSeries.length;i++){          
          if(this.chartSeries[i].equipId == this.radioEquipment){
            pointLengend.push(this.chartSeries[i].pointName)
            let data = {
              data: this.chartSeries[i].data,
              dw: this.chartSeries[i].dw
            }
            pointSeries.push(data)
          }
        }
        for(let i=0;i<this.chartSeries.length;i++){          
          if(this.chartSeries[i].pointId == this.radioPoint){
            equipmentLengend.push(this.chartSeries[i].equipName)
            let data = {
              data: this.chartSeries[i].data,
              dw: this.chartSeries[i].dw
            }
            equipmentSeries.push(data)
          }
        }
        echarts.init(document.getElementById('echarts-content')).setOption(this.$options.methods.initChartsdevices.bind(this)(pointLengend,pointSeries,this.chartxAxis))
        echarts.init(document.getElementById('echarts-contents')).setOption(this.$options.methods.initChartsdevices.bind(this)(equipmentLengend,equipmentSeries,this.chartxAxis))
      },
      // 折线图模板
      initChartsdevices(legend,series,xAxis) {
        var obj = []
        var dw = ''
        for(let i=0;i<series.length;i++){
          let arr = {
            name: legend[i],
            data: series[i].data,
            type: 'line',
            connectNulls: true
          }
          obj.push(arr)
          dw = series[i].dw
        }
        console.log(dw)
        return Option = {
          legend: {
            data: legend
          },
          tooltip: {
            trigger: 'axis',
          },
          xAxis: {
            type: 'category',
            data: xAxis
          },
          yAxis: {
            name: dw,
            type: 'value'
          },
          series: obj
        };
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      // 根据选择设备类型 加载设备选项列表
      changeData(value) {
        let val = value.toString().split(',')
        this.equipmentValue = val[val.length - 1]
        /* for(let i=0;i<this.options.length;i++){
          if(this.options[i].children) {
            for(let j=0;j<this.options[i].children.length;j++){
              if(this.options[i].children[j].children){
                for(let k=0;k<this.options[i].children[j].children.length;k++){
                  if(this.options[i].children[j].children[k].children){
                  }else {                    
                    if(val[val.length - 1] == this.options[i].children[j].children[k].value) {
                      this.checkEquipmentName = this.options[i].children[j].children[k].label
                    }
                  }
                }
              }else {
                if(val[val.length - 1] == this.options[i].children[j].value) {
                  this.checkEquipmentName = this.options[i].children[j].label
                }
              }
            }
          }else {
            if(val[val.length - 1] == this.options[i].value) {
              this.checkEquipmentName = this.options[i].label
            }
          }
        } */
        this.$options.methods.f.bind(this)(this.options)
        this.$http({
          url: this.$http.adornUrl('/statistics/history/equip/list'),
          method: 'post',
          data: this.$http.adornData({
            'areaId': val[val.length - 1]
          })
        }).then(({
          data
        }) => {
          this.checkEquipments = data.list
          this.checkEquipment = []
        })
        this.dialogVisibleEquipment = true
      },
      // 点击选择点位按钮
      clear(){
        console.log(this.checkEquipment)
        if(this.checkEquipment.length >= 2){
          this.secondPoint = true
        }
        this.checkedPoint1 = []
        this.checkedPoint2 = []
        this.checkedPointIds = []       
        // 选择点位       
        this.$http({
          url: this.$http.adornUrl('/statistics/history/point/list'),
          method: 'post',
           data: this.$http.adornData({
             "equipIds": this.checkEquipment
           })
          }).then(({
            data
          }) => {
            if (data.msg === "success") {
              if(data.equipPoints.length >= 2){
                this.checkedPoints1 = data.equipPoints[0]
                this.checkedPoints2 = data.equipPoints[1]
              }else {
                this.checkedPoints1 = data.equipPoints[0]
              }    
              this.dialogVisible = true
            }
          }) 
      },
      // 选择完设备点击确定
      equipmentChecked(){
        this.dialogVisibleEquipment = false
        console.log(this.checkEquipment)
        if(this.checkEquipment.length == 0) {
          this.$alert('请选择设备！', '错误提示', {
            confirmButtonText: '确定'
          })
          return
        }
      },
      f(num){
        console.log(num)
        for(let i=0;i<num.length;i++){
          if(num[i].children){ 
            this.$options.methods.f.bind(this)(num[i].children)
          }else {
            if(this.equipmentValue == num[i].value){
              this.checkEquipmentName = num[i].label
            }
          }
        }        
      } 
    }
  }

</script>
<style>
  .point_single .el-checkbox {
    margin-left: 0;
    margin-right: 2%
  }
  .content .anahis_data-title {
    margin-left: 5%;
    position: relative;
    top: 10%;
}
  .content .el-radio-button{
    margin-right: 2%; 
  }
  .content .el-radio-group{
    display: block;
  }
  .content .el-radio-button--medium .el-radio-button__inner {
    padding: 10px 30px;
    font-size: 14px;
    border-radius: 0;
}
.content .el-radio-group {
    display: block;
    /* margin-top: 3%; */
    margin-bottom: 3%;
}
.content .el-radio-button__orig-radio:checked+.el-radio-button__inner{
  border:1px solid#17B3A3
}
.content .el-radio-button .el-radio-button__inner{
  border: 1px solid #dcdfe6;
}
 .anahis_data .demonstration{
   margin-right: 2%;
  }
  .anahis_data .el-date-editor.el-input__inner {
    width: 60%;
    margin-left:0; 
}
.anahis_data .el-date-editor .el-range-separator {
    padding: 0 5px;
    line-height: 32px;
    width: 8%;
    color: #303133;
}
  .anahis_data{
    display: inline-block;
    width: 40%;
  }
  .el-dialog__footer{
    text-align: center;
  }
  .point_single {
    position: relative;
    padding: 2% 2%;
    border: 1px solid red;
    border-radius: 5px;
    margin: 3% auto;
    width: 95%;
  }

  .point_dialog {
    text-align: left;
  }

  .point-title {
    text-align: center;
    line-height: 20px;
    width: 60px;
    height: 20px;
    position: absolute;
    top: -10px;
    left: 5%;
    display: inline-block;
    background:red;
    border-radius: 5px;
    color: #fff;
  }

  .analysis_his_top .el-checkbox {
    /* width: 100%; */
  }

  .content {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
  }

  .nav {
    width: 10%;
    height: 95%;
    padding: 2% 2%;
    border-right: 5px solid #f0f0f0;
  }

  .nav-list {
    padding: 3% 0;
    cursor: pointer;
    letter-spacing: 1px;
  }

  .nav-floor {
    text-align: center;
  }

  .nav-socket {
    text-align: right;
  }

  .analysis_cont {
    /* width: 86%; */
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    /* border-left: 5px solid #f0f0f0; */
  }

  .analysis_his_top {
    width: 100%;
    min-height: 4%;
    background-color: #f0f0f0;
    position: absolute;
    padding: 1% 0;
    top: 0;
    right: 0;
    text-align: center;
  }

  .top-or {
    width: 8%;
    background-color: #35c5c5;
    color: #fff;
    border-radius: 5px;
    text-align: center;
    padding: 0.5% 0;
    display: inline-block;
    vertical-align: middle;
    cursor: pointer;
  }

  .top-seo {
    display: inline-block;
    vertical-align: middle;
    width: 5%;
    color: #fff;
    padding: 0.5% 0;
    background-color: #2b80c0;
    border-radius: 5px;
    cursor: pointer;
    margin-left: 2%;
  }

  .top span {
    margin: 0 1% 0 2%;
  }

  .top input {
    width: 10%;
    text-align: center;
    padding: 0.1% 0;
    display: inline-block;
    vertical-align: middle;
    cursor: pointer;
  }

  .echarts-data {
    width: 100%;
    height: 48%;
    position: absolute;
    top: 6%;
    right: 0;
  }

  .echarts-datas {
    width: 100%;
    height: 48%;
    position: absolute;
    top: 52%;
    right: 0;
  }

  .anahis_data-title {
    margin-left: 5%;
  }

  .title-but {
    width: 8%;
    padding: 0.5% 0;
    display: inline-block;
    vertical-align: middle;
    background-color: #2b80c0;
    border-radius: 5px;
    text-align: center;
    color: #fff;
    margin: 2% 0 0 2%;
    cursor: pointer;
  }

  .echarts-content {
    width: 100%;
    height: 87%;
  }

  .echarts-contents {
    width: 100%;
    height: 90%;
  }

  .layer-open {
    width: 100%;
    height: 99%;
    border: 1px solid #ccc;
    overflow-y: scroll;
    border-radius: 5px;
  }

  .layer-list {
    width: 90%;
    min-height: 21%;
    margin: 2% auto;
    border: 1px solid #ccc;
    padding: 3% 2%;
    border-radius: 5px;
    position: relative;
  }

  .list-title {
    width: 8%;
    border-radius: 3px;
    background-color: #35c5c5;
    position: absolute;
    top: -10%;
    color: #fff;
    text-align: center;
    padding: 0.5% 0;
  }

  .layer-data {
    font-size: 16px;
  }

  .layer-data input {
    width: 20px;
    height: 21px;
    margin-left: 2%;
    margin-right: 2px;
    vertical-align: middle;
  }
  .top-select {
    display: inline-block;
    margin-right: 20px
  }
  #visibleEquipment [class*=el-col-] {
    float: none;
    display: inline-block
  }
  .el-dialog__body {
    height: 500px;
    overflow: scroll;
  }
  .firstPoint {
    border-top: 1px solid #ccc;
    /* border-radius: 5px; */
    margin-bottom: 10px
  }
</style>
