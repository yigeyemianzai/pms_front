<template>
  <el-submenu 
    v-if="menu.list && menu.list.length >= 1"
    :index="menu.resId + ''"
    :popper-class="'site-sidebar--' + sidebarLayoutSkin + '-popper'">
    <template slot="title">
      <!-- <icon-svg :name="menu.icon || ''" class="site-sidebar__menu-icon"></icon-svg> -->
      <i :class="menu.icon" class="site-sidebar__menu-icon"></i>   
      <span>{{ menu.name }}</span>
    </template>
    <sub-menu
      v-for="item in menu.list" 
      :key="item.resId"
      :menu="item"
      :dynamicMenuRoutes="dynamicMenuRoutes">
    </sub-menu>
  </el-submenu>
  <el-menu-item v-else :index="menu.resId + ''" @click="gotoRouteHandle(menu)">
    <i :class="menu.icon" class="site-sidebar__menu-icon"></i>
    <span>{{ menu.name }}</span>
  </el-menu-item>
</template>

<script>
  import SubMenu from './main-sidebar-sub-menu'
  export default {
    name: 'sub-menu',
    props: {
      menu: {
        type: Object,
        required: true
      },
      dynamicMenuRoutes: {
        type: Array,
        required: true
      }
    },
    components: {
      SubMenu
    },
    computed: {
      sidebarLayoutSkin: {
        get () { return this.$store.state.common.sidebarLayoutSkin }
      }
    },
    mounted() {
      // console.log(JSON.parse(sessionStorage.getItem('menuList')))
      // console.log(this.$store.state.common.mainTabs)
      // 登录进来后默认展示菜单第一个页面
      if(this.$store.state.common.mainTabs.length == 0) {
        let menuList = JSON.parse(sessionStorage.getItem('menuList'))
        this.f(menuList)
      }     
    },
    methods: {
      // 通过menuId与动态(菜单)路由进行匹配跳转至指定路由
      gotoRouteHandle (menu) {
        // console.log(menu)
        var route = this.dynamicMenuRoutes.filter(item => item.meta.menuId === menu.resId)
        if (route.length >= 1) {
          this.$router.push({ name: route[0].name })
        }
      },
      f(num){
        // console.log(num)
          if(num[0].list){ 
            this.$options.methods.f.bind(this)(num[0].list)
          }else {
            // this.gotoRouteHandle(JSON.parse(sessionStorage.getItem('menuList'))[0])
            this.gotoRouteHandle(num[0])
          }       
      }
    }
  }
</script>

