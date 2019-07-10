/**
 * 邮箱
 * @param {*} s
 */
export function isEmail (s) {
  return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s)
}

/**
 * 手机号码
 * @param {*} s
 */
export function isMobile (s) {
  return /^1[34578]\d{9}$/.test(s)
}

/**
 * 电话号码
 * @param {*} s
 */
export function isPhone (s) {
  return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s)
}

/**
 * URL地址
 * @param {*} s
 */
export function isURL (s) {
  return /^http[s]?:\/\/.*/.test(s)
}

/**
 * 两位小数
 * @param {*} s
 */
export function isNumber (s) {
  return /^\d+\.?\d{0,2}$/.test(s)
}

/**
 * 正整数小数
 * @param {*} s
 */
export function isPositiveNumber (s) {
  return /^[1-9][0-9]*$/.test(s)
}

/**
 * IP地址
 * @param {*} s
 */
export function isIpAddress (s) {
  var exp=/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
  var reg = s.match(exp);  
  if(reg==null)  {  
    return  false
  } else {  
    return  true
  }
}