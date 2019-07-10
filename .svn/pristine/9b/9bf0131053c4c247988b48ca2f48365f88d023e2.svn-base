import Vue from 'vue'
import router from '@/router'
import store from '@/store'

/**
 * 获取uuid
 */
export function getUUID () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    return (c === 'x' ? (Math.random() * 16 | 0) : ('r&0x3' | '0x8')).toString(16)
  })
}

/**
 * 是否有权限
 * @param {*} key
 */
export function isAuth (key) {
  return JSON.parse(sessionStorage.getItem('permissions') || '[]').indexOf(key) !== -1 || false
}

/**
 * 树形数据转换
 * @param {*} data
 * @param {*} id
 * @param {*} pid
 */
export function treeDataTranslate (data, id = 'id', pid = 'parentId') {
  var res = []
  var temp = {}
  for (var i = 0; i < data.length; i++) {
    temp[data[i][id]] = data[i]
  }
  for (var k = 0; k < data.length; k++) {
    if (temp[data[k][pid]] && data[k][id] !== data[k][pid]) {
      if (!temp[data[k][pid]]['children']) {
        temp[data[k][pid]]['children'] = []
      }
      if (!temp[data[k][pid]]['_level']) {
        temp[data[k][pid]]['_level'] = 1
      }
      data[k]['_level'] = temp[data[k][pid]]._level + 1
      temp[data[k][pid]]['children'].push(data[k])
    } else {
      res.push(data[k])
    }
  }
  return res
}

/**
 * 清除登录信息
 */
export function clearLoginInfo () {
  Vue.cookie.delete('token')
  store.commit('resetStore')
  router.options.isAddDynamicMenuRoutes = false
}

// 默认日期格式  默认返回yyyy-MM-dd HH-mm-ss,可传第二个参数false，返回yyyy-MM-dd
export function dateFormatter (str) {
  var hasTime = arguments[1] !== false ? true : false
  var d = new Date(str)
  var year = d.getFullYear()
  var month = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1)
  var day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate()
  var hour = d.getHours() < 10 ? '0' + d.getHours() : d.getHours()
  var minute = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()
  var second = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds()
  if (hasTime) {
    return [year, month, day].join('-') + ' ' + [hour, minute, second].join(':')
  } else {
    return [year, month, day].join('-')
  }
}
/**
 * 时间转换
 * @param {*} s
 */
export function changeTime (s) {
  let time = new Date(s),
    timeY = time.getFullYear(),
    timeM = ('0' + (time.getMonth() + 1)).slice(-2),
    timeD = ('0' + time.getDate()).slice(-2),
    hour = ('0' + time.getHours()).slice(-2),
    minute = ('0' + time.getMinutes()).slice(-2),
    second = ('0' + time.getSeconds()).slice(-2)
  return timeY + '-' + timeM + '-' + timeD + ' ' + hour + ':' + minute + ':' + second
}
export function changeTime2 (s) {
  let time = new Date(s),
    timeY = time.getFullYear(),
    timeM = ('0' + (time.getMonth() + 1)).slice(-2),
    timeD = ('0' + time.getDate()).slice(-2),
    hour = ('0' + time.getHours()).slice(-2),
    minute = ('0' + time.getMinutes()).slice(-2),
    second = ('0' + time.getSeconds()).slice(-2)
  return timeY + '-' + timeM + '-' + timeD
}
