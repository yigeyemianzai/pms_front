<template>
  <div class="sys-pic" id="sys-pic">
    <!-- <el-tabs v-model="activeName" > --><!-- @tab-click="handleClick" -->
      <!-- <el-tab-pane label="能流图" name="first"> -->
        <div class="energy">
          <embed v-show="flag" id="svg1" type="image/svg+xml" wmode="transparent" src="./static/img/energyflow1.svg" pluginspage="http://www.adobe.com/svg/viewer/install/" v-on:load="load1" />
          <embed v-show="flag2" id="svg2" type="image/svg+xml" wmode="transparent" src="./static/img/energyflow2.svg" pluginspage="http://www.adobe.com/svg/viewer/install/" v-on:load="load2" />
        </div>
      <!-- </el-tab-pane>
      <el-tab-pane label="配电图" name="second">配电图</el-tab-pane>
      <el-tab-pane label="冷热拓扑" name="third">冷热拓扑图</el-tab-pane>
      <el-tab-pane label="水管拓扑" name="fourth">水管拓扑图</el-tab-pane>
    </el-tabs>
     -->
  </div>
</template>
<script>
  export default {
    data() {
      return {
        activeName: 'first',
        flag:true,
        flag2:false,
      };
    },
    created() {
      // this.bindEvent()

    },
    mounted() {
      this.aaa()
      window.onresize = function () {
        if(document.getElementById('sys-pic')){
          document.getElementById('sys-pic').style.height = (window.innerHeight - 170) + 'px'
        }
      }
    },
    methods: {
      // handleClick(tab, event) {
      //   console.log(tab, event);
      // },
      aaa() {
        document.getElementById('sys-pic').style.height = (window.innerHeight - 170) + 'px'
      },
      load1(event){
        event = event || window.event
        let _this=this
        document.getElementById('svg1').getSVGDocument().documentElement.getElementById('cls-7').onmousedown=function (){
        _this.flag=!_this.flag
        _this.flag2=!_this.flag2
        }
      },
      load2(event){
        event = event || window.event
        let _this=this
        // alert(2)
        document.getElementById('svg2').getSVGDocument().documentElement.getElementById('path19380').onmousedown=function (){
        _this.flag=!_this.flag
        _this.flag2=!_this.flag2
        }
      }
      // changePic(){
      //   this.flag=!this.flag;
      //   if(this.flag===true){
      //     $(".energy .pic1").attr("src","~@/assets/images/energyflow2.jpg")
      //     $(".turnPane .pic2").attr("src","~@/assets/images/energyflow.jpg")
      //   }else{
      //     $(".energy .pic1").attr("src","~@/assets/images/energyflow.jpg")
      //     $(".turnPane .pic2").attr("src","~@/assets/images/energyflow2.jpg")
      //   }
      // },
      // bindEvent(){
        
      // }
    }
  };

</script>
<style scoped>
  .sys-pic {
    width: 100%;
    height: 100%;
    margin: 0;
  }

  .sys-pic .el-tabs {
    width: 100%;
    height: 100%;
  }

  .sys-pic .el-tabs__header {
    width: 100%;
    height: 10%;
  }

  .sys-pic .el-tabs__content {
    width: 100%;
    height: 90%;
  }

  .sys-pic .energy {
    position: relative;
    height: 100%;
    width: 100%;
  }

  #pane-first {
    width: 100%;
    height: 100%;
  }

  .sys-pic .energy img {
    width: 100%;
    height: 100%;
  }
  .sys-pic .turnPane{
    position: absolute;
    top: 3%;
    right: 2%;
    width: 15%;
    height: 20%;
    /* background-color: brown; */
    /* background-image: url(~@/assets/images/energyflow2.jpg);
    background-color:rgba(0,0,0 0.5);
    background-size:contain; */
    border: 1px red solid;
  }
  .sys-pic .turn{
    position: absolute;
    width: 14%;
    height: 22%;
    bottom: -10%;
    left: -5%;
    background-color: aqua;
    border-radius: 50%;
  }
  .sys-pic #svg1{
    width: 100%;
    height: 100%;
  }
  .sys-pic #svg2{
    width: 100%;
    height: 100%;
  }

</style>
