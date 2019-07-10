import isInteger from 'lodash/isInteger'
//  电能24小时统计图
export function energy (params) {
  return {
    // isOpen: false,
    url: '/home/chart/energy',
    type: 'post',
    data: {
      'code': '0',
      'msg': 'success',
      'chart': {
        'xAxis': [ '0:00', '2:00', '4:00', '6:00', '8:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '24:00' ],
        'xAxis2': [ '0:00', '2:00', '4:00', '6:00', '8:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '24:00' ],
        'legend': [ '实时负荷', '预测负荷', '用电量' ],
        'series': [ {
          'data': [ 80, 75, 85, 90, 60, 100, 120, 100, 85, 70, 55, 45, 36 ],
          'name': '实时负荷'
        }, {
          'data': [ 60, 70, 90, 65, 45, 95, 130, 120, 90, 65, 50, 40, 30 ],
          'name': '预测负荷'
        }, {
          'data': [ 50, 60, 90, 60, 40, 80, 60, 100, 85, 60, 45, 35, 26 ],
          'name': '用电量'
        } ]
      }
    }
  }
}

// 冷热能24小时统计图
export function coldheat (params) {
  return {
    url: '/home/chart/coldheat',
    type: 'post',
    data: {
      'code': '0',
      'msg': 'success',
      'chart': {
        'xAxis': [ '0', '2', '4', '6', '8', '10', '12', '14', '16', '18', '20', '22', '24' ],
        'xAxis2': [ '0:00', '2:00', '4:00', '6:00', '8:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '24:00' ],        
        'legend': [ '实时负荷', '预测负荷', '蓄能量' ],
        'series': [ {
          'data': [ 80, 75, 85, 90, 60, 100, 120, 100, 85, 70, 55, 45, 36 ],
          'name': '实时负荷'
        }, {
          'data': [ 60, 70, 90, 65, 45, 95, 130, 120, 90, 65, 50, 40, 30 ],
          'name': '预测负荷'
        }, {
          'data': [ 50, 60, 90, 60, 40, 80, 60, 100, 85, 60, 45, 35, 26 ],
          'name': '蓄能量'
        } ]
      }
    }
  }
}

// 用水量24小时统计
export function water (params) {
  return {
    url: '/home/chart/water',
    type: 'post',
    data: {
      'code' : 0,
      'msg' : 'success',
      'chart' : {
        'xAxis' : [ '0', '2', '4', '6', '8', '10', '12', '14', '16', '18', '20', '22', '24' ],
        'legend' : [ '用水量' ],
        'series' : [ {
          'data' : [ 50, 60, 90, 60, 40, 80, 60, 100, 85, 60, 45, 35, 26 ],
          'name' : '用水量'
        } ]
      }
    }
  }
}

// 总能耗
export function totalenergy (params) {
  return {
    url: '/home/chart/totalenergy',
    type: 'post',
    data: {
      "msg": "success",
      "code": 0,
      "chart": {
          "legend": [
              "高温相变蓄热系统",
              "压缩空气储能系统",
              "高温相变发热发电系统",
              "VRV空调系统",
              "精密空调系统"
          ],
          "series": {
              "data": [
                  {
                      "name": "高温相变蓄热系统",
                      "value": 0.07
                  },
                  {
                      "name": "压缩空气储能系统",
                      "value": 0.04
                  },
                  {
                      "name": "VRV空调系统",
                      "value": 0.4
                  },
                  {
                      "name": "精密空调系统",
                      "value": 0.07
                  }
              ],
              "data2": [
                  {
                      "name": "高温相变蓄热系统",
                      "value": 0.06
                  },
                  {
                      "name": "压缩空气储能系统",
                      "value": 0.07
                  },
                  {
                      "name": "高温相变发热发电系统",
                      "value": 0.06
                  }
              ]
          }
      }
  }
  }
}
// 站点信息
export function siteinfo (params) {
  return {
    url: '/home/siteinfo',
    type: 'post',
    data: {
      'msg' : 'success',
      'site' : {
        'address' : '南京市楼宇智能系统',
        'affiliationType' : '企业',
        'affiliationUint' : '国家电网',
        'cpName' : '李先生',
        'cpTel' : '02580000X',
        'districrCode' : '20000',
        'lat' : '40.030499',
        'lng' : '116.507754',
        'operationState' : '投运中',
        'operationType' : '建筑',
        'stationCode' : '320001',
        'stationName' : '楼宇智能系统'
      },
      'code' : 0
    }
  }
}

// 总耗详情
export function energytotal (params) {
  return {
    url: '/home/right/indexInfo',
    type: 'post',
    data: {
      'msg' : 'success',
      'total' : {
        'precisionPower' : '754',//精密空调电耗
        'airStoragePower' : '1534',
        'airStorageElec' : '134',
        'vrvPower' : '863',
        'airPower' : '777',
        'lightHotCapacityPower' : '698',//光热发电总供热量
        'blowerPower' : '745',//风机盘管
        'highPower' : '625',
        'highStoredPower':'111',
        'sitePower' : '10555',
        'airCapacityPower' : '2546',
        // 'lightHotCapacityPower' : '1256',
        'airStoredPower':'300',
        
      },
      'code' : 0
    }
  }
}
/* export function coldheat (params) {
  return {
    url: '',
    type: 'post',
    data: {}
  }
} */
