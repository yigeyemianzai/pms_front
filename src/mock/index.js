import Mock from 'mockjs'
import http from '@/utils/httpRequest'
import merge from 'lodash/merge'
import * as common from './modules/common'
import * as user from './modules/user'
import * as role from './modules/role'
import * as menu from './modules/menu'
import * as log from './modules/log'
import * as config from './modules/config'
import * as oss from './modules/oss'
import * as schedule from './modules/schedule'
import * as home from './modules/home'
import * as device from './modules/device'
import * as efficency from './modules/efficiency'
import * as stategrid from './modules/stategrid'
import * as statistics from './modules/statistics'
import * as routers from './modules/routers'
import * as chazuo from './modules/chazuo'
import * as manage_device from "./modules/manage-device"
import * as manage_comm from "./modules/manageComm"
import * as manage_site from "./modules/manageSite"
import * as manage_data from "./modules/manage-data"
import * as remote from "./modules/remote"
import * as sys from "./modules/sys"
// import * as energy_monitor from "./modules/energy-monitor"


console.log('\n%c!<-------------------- 接口拦截, mock模拟数据 s -------------------->', 'color:blue')

// tips
// 1. 关闭[业务模块集]拦截, create方法[第2个参数]设置. (默认开启)
// 2. 关闭[业务模块对象]拦截, 通过模块返回对象中的[isOpen属性, 默认开启]设置. (默认开启)

// fnCreate(common, true)      // 公共
// fnCreate(user, true)        // 管理员管理
// fnCreate(role, true)        // 角色管理
// fnCreate(menu, true)        // 菜单管理
// fnCreate(log, false)         // 系统日志
// fnCreate(config, true)      // 参数管理
// fnCreate(oss, false)         // 文件服务
// fnCreate(schedule, false)    // 定时任务
fnCreate(home, true)         // 首页
fnCreate(device, true)       //设备监测 
// fnCreate(energy_monitor,true)  //能源监测
fnCreate(efficency, true)    // 能效提升
fnCreate(stategrid, true)    // 电网互动
fnCreate(statistics, true)   // 统计分析
// fnCreate(chazuo, true)        //插座
// fnCreate(manage_device,true)  //设备管理
// fnCreate(manage_data,true)    //数据管理
// fnCreate(routers, true)       //路由管理
// fnCreate(manage_comm, true)   //通讯管理
// fnCreate(manage_site, true)   //站点管理
// fnCreate(remote,true)         //五遥配置

// fnCreate(sys, true)

console.log('%c!<-------------------- 接口拦截, mock模拟数据 e -------------------->\n\n', 'color:blue')

/**
 * 创建mock模拟数据
 * @param {*} mods 模块集
 * @param {*} isOpen 是否开启?
 */
function fnCreate (mods, isOpen = true) {
  if (isOpen) {
    for (var key in mods) {
      var mod = mods[key]() || {}
      if (mod.isOpen !== false) {
        // 添加默认[mock]属性, 方便调试
        mod.data = merge({ 'mock': true }, mod.data)

        // 控制台输出信息
/*         console.log('\n')
        console.log(' url: ', mod.url)
        console.log('type: ', mod.type)
        console.log('data: ', mod.data)
        console.log('\n') */

        // 2种url拦截方式
        Mock.mock(http.adornUrl(mod.url), mod.type, mod.data)
        Mock.mock(new RegExp(mod.url, 'g'), mod.type, mod.data)
      }
    }
  }
}
