/**
 * 全站路由配置
 *
 * 建议:
 * 1. 代码中路由统一使用name属性跳转(不使用path属性)
 */
import Vue from 'vue'
import Router from 'vue-router'
import http from '@/utils/httpRequest'
import { isURL } from '@/utils/validate'
import { clearLoginInfo } from '@/utils'
import { getUUID } from '@/utils'

Vue.use(Router)
// Vue.prototype.uuid = getUUID()  // uuid标识
// console.log(Vue.prototype.uuid)

// 开发环境不使用懒加载, 因为懒加载页面太多的话会造成webpack热更新太慢, 所以只有生产环境使用懒加载
const _import = require('./import-' + process.env.NODE_ENV)

// 全局路由(无需嵌套上左右整体布局)
const globalRoutes = [
  { path: '/404', component: _import('common/404'), name: '404', meta: { title: '404未找到' } },
  { path: '/login', component: _import('common/login'), name: 'login', meta: { title: '登录' } }
]
// 主入口路由(需嵌套上左右整体布局)
const mainRoutes = {
  path: '/',
  component: _import('main'),
  name: 'main',
  // redirect: { name: 'index' },
  meta: { title: '主入口整体布局' },
  children: [],
  // children: [
    // 通过meta对象设置路由展示方式
    // 1. isTab: 是否通过tab展示内容, true: 是, false: 否
    // 2. iframeUrl: 是否通过iframe嵌套展示内容, '以http[s]://开头': 是, '': 否
    // 提示: 如需要通过iframe嵌套展示内容, 但不通过tab打开, 请自行创建组件使用iframe处理!
    // { path: '/index', component: _import('modules/index'), name: 'index', meta: { title: '首页',isTab: true  } }
    // { path: '/theme', component: _import('common/theme'), name: 'theme', meta: { title: '主题' } },
    // { path: '/demo-echarts', component: _import('demo/echarts'), name: 'demo-echarts', meta: { title: 'demo-echarts', isTab: true } },
    // { path: '/demo-ueditor', component: _import('demo/ueditor'), name: 'demo-ueditor', meta: { title: 'demo-ueditor', isTab: true } }
  // ],
  beforeEnter (to, from, next) {
    let token = Vue.cookie.get('token')
    if (!token || !/\S/.test(token)) {
      clearLoginInfo()
      next({ name: 'login' })
    }
    next()
  }
}
const router = new Router({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  isAddDynamicMenuRoutes: false, // 是否已经添加动态(菜单)路由
  routes: globalRoutes.concat(mainRoutes)
})

router.beforeEach((to, from, next) => {
  // 判断将要跳转的路由的权限是否是用户所拥有的
  let permissions = JSON.parse(sessionStorage.getItem('permissions'))
  if (to.meta.auth != undefined && permissions.indexOf(to.meta.auth) == -1) {
    next('/404')
  } else {
    // 添加动态(菜单)路由
    // 1. 已经添加 or 全局路由, 直接访问
    // 2. 获取菜单列表, 添加并保存本地存储
    // console.log(router.options.isAddDynamicMenuRoutes)
    // console.log(fnCurrentRouteType(to, globalRoutes))
    if (router.options.isAddDynamicMenuRoutes || fnCurrentRouteType(to, globalRoutes) === 'global') {
      next()
    } else {
      Promise.all([nav(to, from, next)]).then((data)=>{
        routers(to, from, next)
      })
      // nav(to, from, next).then(routers(to, from, next))
    }
  }  
})

function nav (to, from, next) {
  let p = new Promise((resolve, reject) => {
    http({
      url: http.adornUrl('/sys/menu/nav'),
      method: 'get',
      params: http.adornParams()
    }).then(({data}) => {
      if (data && data.code === 0) {
        // fnAddDynamicMenuRoutes(data.menuList)
        // console.log(data.flag[0].split(':')[1])
        router.options.isAddDynamicMenuRoutes = true
        sessionStorage.setItem('menuList', JSON.stringify(data.menuList || '[]'))
        sessionStorage.setItem('permissions', JSON.stringify(data.permissions || '[]'))
        sessionStorage.setItem('initialize', JSON.stringify(data.flag[0].split(':')[1] || null))
        // console.log(to)
        next({ ...to, replace: true })
      } else {
        sessionStorage.setItem('menuList', '[]')
        sessionStorage.setItem('permissions', '[]')
        sessionStorage.setItem('initialize', null)
        next()
      }
      resolve(data)
    })/* .catch((e) => {
      console.log(`%c${e} 请求菜单列表和权限失败，跳转至登录页！！`, 'color:blue')
      router.push({ name: 'login' })
    }) */
  })
  return p
}
function f (num, arr) {
  for (let i = 0; i < num.length; i++) {
    arr.push(num[i].menuId)
    if (num[i].list != null) {
      f(num[i].list, arr)
    }
  }
}
function routers (to, from, next) {
  let arr = [], menulist = JSON.parse(window.sessionStorage.getItem('menuList'))
  // f(menulist, arr)
  for (let i = 0; i < menulist.length; i++) {
    arr.push(menulist[i].menuId)
  }
  let p = new Promise((resolve, reject) => {
    http({
      url: http.adornUrl('/sys/menu/routers'),
      method: 'post',
      data: http.adornData({
        list: arr
        // reList: JSON.parse(window.sessionStorage.getItem('menuList'))
      })
    }).then(({data}) => {
      if (data && data.code === 0) {
        fnAddDynamicMenuRoutes(data.menuList)
        router.options.isAddDynamicMenuRoutes = true
        next({ ...to, replace: true })
      } else {
        next()
      }
      resolve(data)
    })
  })
  return p
}
/**
 * 判断当前路由类型, global: 全局路由, main: 主入口路由
 * @param {*} route 当前路由
 */
function fnCurrentRouteType (route, globalRoutes = []) {
  var temp = []
  for (var i = 0; i < globalRoutes.length; i++) {
    if (route.path === globalRoutes[i].path) {
      return 'global'
    } else if (globalRoutes[i].children && globalRoutes[i].children.length >= 1) {
      temp = temp.concat(globalRoutes[i].children)
    }
  }
  return temp.length >= 1 ? fnCurrentRouteType(route, temp) : 'main'
}

/**
 * 添加动态(菜单)路由
 * @param {*} menuList 菜单列表
 * @param {*} routes 递归创建的动态(菜单)路由
 */
function fnAddDynamicMenuRoutes (menuList = [], routes = []) {
  var temp = []
  for (var i = 0; i < menuList.length; i++) {
    if (menuList[i].list && menuList[i].list.length >= 1 ){
      temp = temp.concat(menuList[i].list)
      if (menuList[i].url && /\S/.test(menuList[i].url)) {
        menuList[i].url = menuList[i].url.replace(/^\//, '')
        var route = {
          path: menuList[i].url.replace('/', '-'),
          component: null,
          name: menuList[i].url.replace('/', '-'),
          meta: {
            menuId: menuList[i].resId,
            title: menuList[i].resName,
            isDynamic: true,
            isTab: true,
            iframeUrl: '',
            keepAlive: true
          }
        }
        // url以http[s]://开头, 通过iframe展示
        if (isURL(menuList[i].url)) {
          route['path'] = `i-${menuList[i].resId}`
          route['name'] = `i-${menuList[i].resId}`
          route['meta']['iframeUrl'] = menuList[i].url
        } else {
          try {
            route['component'] = _import(`modules/${menuList[i].url}`) || null
          } catch (e) {}
        }
        routes.push(route)
      }
    } else if (menuList[i].list == null && menuList[i].url != null) {
      // console.log(menuList[i])
      menuList[i].url = menuList[i].url.replace(/^\//, '')
      var route2 = {
        path: menuList[i].url.replace('/', '-'),
        component: null,
        name: menuList[i].url.replace('/', '-'),
        meta: {
          menuId: menuList[i].resId,
          title: menuList[i].resName,
          isDynamic: true,
          isTab: true,
          iframeUrl: '',
          keepAlive: true
        }
      }
      // url以http[s]://开头, 通过iframe展示
      if (isURL(menuList[i].url)) {
        route2['path'] = `i-${menuList[i].resId}`
        route2['name'] = `i-${menuList[i].resId}`
        route2['meta']['iframeUrl'] = menuList[i].url
      } else {
        try {
          route2['component'] = _import(`modules/${menuList[i].url}`) || null
        } catch (e) {}
      }
      routes.push(route2)
    }
    // console.log(routes)
  }
  if (temp.length >= 1) {
    fnAddDynamicMenuRoutes(temp, routes)
  } else {
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].path == 'equipment-monitor-socket') {
        mainRoutes.children = mainRoutes.children.concat(routes).concat([{ path: 'equipment-monitor-socket-floor', component: _import('modules/equipment-monitor/socket-floor'), name: 'equipment-monitor/socket-floor', meta: {title: '插座系统-楼层', auth: '1040:1', isTab: true} },
        { path: 'equipment-monitor-version-update', component: _import('modules/equipment-monitor/version-update'), name: 'equipment-monitor-version-update', meta: {title: '版本更新', auth: '1040:32', isTab: true} },
        { path: 'equipment-monitor-equipment-topology', component: _import('modules/equipment-monitor/equipment-topology'), name: 'equipment-monitor-equipment-topology', meta: {title: '拓扑图', auth: '1040:32', isTab: true} }])
      } else if (routes[i].path == 'equipment-monitor-illumination') {
        mainRoutes.children = mainRoutes.children.concat(routes).concat([{ path: 'equipment-monitor-illumination-index', component: _import('modules/equipment-monitor/illumination-index'), name: 'equipment-monitor-illumination-index', meta: {title: '照明系统-楼层', auth: '1040:1', isTab: true} }])
      } else if (routes[i].path == 'improve-imp-his') {
        mainRoutes.children = mainRoutes.children.concat(routes).concat([{ path: 'improve-history-detail', component: _import('modules/improve/history-detail'), name: 'improve-history-detail', meta: {title: '历史记录详情', auth: '1040:1', isTab: true} }])
      } else if (routes[i].path == 'interactive-interactive-his') {
        mainRoutes.children = mainRoutes.children.concat(routes).concat([{ path: 'interactive-his-detail', component: _import('modules/interactive/his-detail'), name: 'interactive-his-detail', meta: {title: '操作历史详情', auth: '1040:1', isTab: true} }])
      } else {
        mainRoutes.children = mainRoutes.children.concat(routes)
      }
    }
    mainRoutes.name = 'main-dynamic'
    // mainRoutes.children = mainRoutes.children.concat(routes)
    // console.log(mainRoutes.children)
    router.addRoutes([
      mainRoutes,
      { path: '*', redirect: { name: '404' } }
    ])
    sessionStorage.setItem('dynamicMenuRoutes', JSON.stringify(mainRoutes.children || '[]'))
    console.log('\n')
    console.log('%c!<-------------------- 动态(菜单)路由 s -------------------->', 'color:blue')
    // console.log(mainRoutes.children)
    console.log('%c!<-------------------- 动态(菜单)路由 e -------------------->', 'color:blue')
  }
}

export default router
