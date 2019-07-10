<template>
 <div class="ui-fas">
  <el-input v-model="name" @input.native="filterIcons" suffix-icon="el-icon-search" placeholder="请输入图标名称"></el-input>
  <div class="fas-icon-list">     
      <div v-for="(item, index) in iconList" :key="index" @click="selectedIcon(item,index)" class="fas-icon-list-n">
          <div class="fas-icon-list-btn" :class="{'fas-icon-list-btn-click':i==index}"><i :class="item"></i></div>          
      </div>
      <div @click="selectedIcon(null,null)" class="fas-icon-list-n">
          <div class="fas-icon-list-btn">无</div>          
      </div>
  </div>
 </div>
</template>
<script>
import iconName from './iconName.js'
export default {
 name: 'icons',
 data () {
  return {
   name: '',
   iconList: iconName.icons,
   i: null  // 用于判断点击图标的index
  }
 },
 mounted (){
    console.log(iconName)
    
 },
 methods: {
  filterIcons () {
   if (this.name) {
    this.iconList = this.iconList.filter(item => item.includes(this.name))
   } else {
    this.iconList = iconName.icons
   }
  },
  selectedIcon (name,index) {
    // 点击的图标 切换样式
    this.i = index
    this.$emit('selected', name)
    
  },
  reset () {
   this.name = ''
   this.iconList = iconName.icons
  }
 }
}
</script>
<style scoped>
.fas-icon-list {
    padding: 20px
}
.fas-icon-list-n {
    width: 30%;
    height: 50px;
    line-height: 50px;
    display: inline-block;
    position: relative;
}
.fas-icon-list-btn {
    height: 40px;
    width: 40px;
    line-height: 40px;
    margin: auto;
    text-align: center;
    border: 1px solid #ddd9d9;
    border-radius: 2px;
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
}
.fas-icon-list-btn-click {
    border: 2px solid #000
}
[class^="icon-"] {
    line-height: 40px
}
.fas-icon-list-btn i {
    font-size: 30px;
    
}
</style>
