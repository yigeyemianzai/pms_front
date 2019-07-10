// 峰平统计-折线图
export function stagechartenergy (params) {
  return {
    url: '/statistics/stage/chart/energy',
    type: 'post',
    data: {
      "code" : 0,
      "msg" : "success",
      "chart" : {"chart" : {
        "xAxis" : [ "00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00" ],
        "legend" : [ "总电量", "插座" ],
        "series" : [ {
          "data" : [ 80, 75, 85, 90, 60, 100, 120, null, null, null, null, 45, 36, 125, 168, 154, 125, 110, 109, 96, 95, 84, 65, 51 ],
          "name" : "总电量"
        }, {
          "data" : [ 60, 70, 90, 65, 45, 95, 130, 120, 90, 65, 50, 40, 30, 55, 45, 36, 125, 168, 154, 125, 110, 109, 96, 95 ],
          "name" : "插座"
        } ]
      }}
    }
  }
}

// 峰平统计-饼图
export function stagechartpie (params) {
  return {
    url: '/statistics/stage/chart/pie',
    type: 'post',
    data: {
      "code": 0,
      "msg": "success",
      "energy": {
        "title": "用电占比",
        "total": "2074",
        "series": {
          "data": [
            {
              "value": 335,
              "name": "插座"
            },
            {
              "value": 310,
              "name": "光伏"
            },
            {
              "value": 234,
              "name": "照明"
            },
            {
              "value": 135,
              "name": "充电桩"
            },
            {
              "value": 1548,
              "name": "空调"
            }
          ]
        }
      },
      "cost": {
        "title": "用费占比",
        "total": "2074",
        "series": {
          "data": [
            {
              "value": 335,
              "name": "插座"
            },
            {
              "value": 310,
              "name": "光伏"
            },
            {
              "value": 234,
              "name": "照明"
            },
            {
              "value": 135,
              "name": "充电桩"
            },
            {
              "value": 1548,
              "name": "空调"
            }
          ]
        }
      }
    }
  }
}

// 峰平统计-统计列表
export function stagelist (params) {
  return {
    url: '/statistics/stage/list',
    type: 'post',
    data: {
      "msg" : "success",
      "code" : 0,
      "info" : [ {
        "pkilowatt" : "231",
        "gkilowatt" : "133",
        "pcost" : "102",
        "hkilowat" : "1010",
        "gcost" : "111",
        "jcost" : "333",
        "jkilowatt" : "121",
        "areaName" : "插座",
        "areaId" : "1",
        "beginTime" : "2018-07-12",
        "hcost" : "1233",
        "fkilowatt" : "313",
        "fcost" : "212"
      }, {
        "pkilowatt" : "231",
        "gkilowatt" : "133",
        "pcost" : "102",
        "hkilowat" : "1010",
        "gcost" : "111",
        "jcost" : "333",
        "jkilowatt" : "121",
        "areaName" : "照明",
        "areaId" : "1",
        "beginTime" : "2018-07-12",
        "hcost" : "1233",
        "fkilowatt" : "313",
        "fcost" : "212"
      } ]
    }
  }
}

// 历史记录-折线图
export function historychartenergy (params) {
  return {
    url: '/statistics/history/chart/energy',
    type: 'post',
    data: {
      "code" : 0,
      "msg" : "success",
      "chart" : {
        "xAxis" : [ "00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00" ],
        "legend" : {"equip": [{'value':"压缩空气储能系统用电",'id': '1'},{'value':"压缩空气储能系统用电",'id': '11'}], "point": [{'value':"正向总有功电度",'id':'2'},{'value':"正向总有功电度",'id':'22'}]},
        "series" : [ {
          "data" : [ 80, 75, 85, 90, 60, 100, 120, 100, 85, 70, 55, 45, 36, 125, 168, 154, 125, 110, 109, 96, 95, 84, 65, 51 ],
          "name" : "插座1",
          "equipId": 1, 
          "equipName": "压缩空气储能系统用电",
          "pointId": 2, 
          "pointName":"正向总有功电度",
          'dw':'aa'
        }, {
          "data" : [ 60, 70, 90, 65, 45, 95, 130, 120, 90, 65, 50, 40, 30, 55, 45, 36, 125, 168, 154, 125, 110, 109, 96, 95 ],
          "name" : "插座2",
          "equipId": 11, 
          "equipName": "压缩空气储能系统用电",
          "pointId": 22, 
          "pointName":"正向总有功电度",
          'dw':'bb'
        } ]
      }
    }
  }
}

// 历史记录-设备折线图
export function historychartdevice (params) {
  return {
    url: '/statistics/history/chart/device',
    type: 'post',
    data: {
      "code" : 0,
      "msg" : "success",
      "chart" : {
        "xAxis" : [ "00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00" ],
        "legend" : [ "A相电压", "B相电压" ],
        "series" : [ {
          "data" : [ 80, 75, 85, 90, 60, 100, 120, 100, 85, 70, 55, 45, 36, 125, 168, 154, 125, 110, 109, 96, 95, 84, 65, 51 ],
          "name" : "A相电压"
        }, {
          "data" : [ 60, 70, 90, 65, 45, 95, 130, 120, 90, 65, 50, 40, 30, 55, 45, 36, 125, 168, 154, 125, 110, 109, 96, 95 ],
          "name" : "B相电压"
        } ]
      }
    }
  }
}

// 历史记录-子系统菜单
export function answerhistorynav (params) {
  return {
    url: '/stategrid/answer/history/nav',
    type: 'post',
    data: {
      "msg" : "success",
      "menuList" : [ {
        "menuId" : 1,
        "parentId" : 0,
        "name" : "插座系统",
        "type" : 0,
        "icon" : "system",
        "orderNum" : 0,
        "list" : [ {
          "menuId" : 2,
          "parentId" : 1,
          "name" : "一层",
          "url" : "sys/user",
          "type" : 1,
          "icon" : "admin",
          "orderNum" : 1,
          "list" : [ {
            "menuId" : 3,
            "parentId" : 1,
            "name" : "插座1",
            "url" : "",
            "type" : 2,
            "icon" : "role",
            "orderNum" : 2
          }, {
            "menuId" : 3,
            "parentId" : 1,
            "name" : "插座2",
            "url" : "",
            "type" : 2,
            "icon" : "role",
            "orderNum" : 2
          } ]
        }, {
          "menuId" : 3,
          "parentId" : 1,
          "name" : "二层",
          "url" : "sys/role",
          "type" : 1,
          "icon" : "role",
          "orderNum" : 2
        } ]
      }, {
        "menuId" : 1,
        "parentId" : 0,
        "name" : "照明系统",
        "type" : 0,
        "icon" : "system",
        "orderNum" : 0,
        "list" : [ {
          "menuId" : 2,
          "parentId" : 1,
          "name" : "一层",
          "url" : "sys/user",
          "type" : 1,
          "icon" : "admin",
          "orderNum" : 1
        }, {
          "menuId" : 3,
          "parentId" : 1,
          "name" : "二层",
          "url" : "sys/role",
          "type" : 1,
          "icon" : "role",
          "orderNum" : 2
        } ]
      } ],
      "code" : 0
    }
  }
}

// 历史记录-点位列表
export function historypointlist (params) {
  return {
    url: '/statistics/history/point/list',
    type: 'post',
    data: {
      "code": "0",
      "msg": "success",
      "list": [
        {
          "typeId": "1",
          "typeCode": "20150723",
          "typeName": "电压",
          "list": [
            {
              "pointId": "1",
              "pointName": "A相电压",
              "pointShortName": "Uac",
              "pointCode": "AXDY01",
              "pointType": "1"
            },
            {
              "pointId": "2",
              "pointName": "B相电压",
              "pointShortName": "Ubc",
              "pointCode": "BXDY02",
              "pointType": "1"
            }
          ]
        },
        {
          "typeId": "2",
          "typeCode": "20150722",
          "typeName": "电位",
          "list": [
            {
              "pointId": "1",
              "pointName": "A相电流",
              "pointShortName": "la",
              "pointCode": "AXDL01",
              "pointType": "1"
            },
            {
              "pointId": "2",
              "pointName": "B相电压",
              "pointShortName": "lb",
              "pointCode": "BXDL02",
              "pointType": "1"
            }
          ]
        }
      ]
    }
  }
}

// 用能统计-柱状图
export function usechartenergy (params) {
  return {
    url: '/statistics/use/chart/energy',
    type: 'post',
    data: {
      "code" : 0,
      "msg" : "success",
      "chart" : {"chart" : {
        "xAxis" : [ "00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00" ],
        "legend" : [ "插座", "照明", "光伏", "充电桩", "配电", "空调" ],
        "series" : [ {
          "data" : [ 80, 75, 85, 90, 60, 100, 120, 100, 85, 70, 55, 45, 36, 125, 168, 154, 125, 110, 109, 96, 95, 84, 65, 51 ],
          "stack" : "energy",
          "name" : "插座"
        }, {
          "data" : [ 60, 70, 90, 65, 45, 95, 130, 120, 90, 65, 50, 40, 30, 55, 45, 36, 125, 168, 154, 125, 110, 109, 96, 95 ],
          "stack" : "energy",
          "name" : "照明"
        }, {
          "data" : [ 60, 70, 90, 65, 45, 95, 130, 120, 90, 65, 50, 40, 30, 55, 45, 36, 125, 168, 154, 125, 110, 109, 96, 95 ],
          "stack" : "energy",
          "name" : "光伏"
        }, {
          "data" : [ 60, 70, 90, 65, 45, 95, 130, 120, 90, 65, 50, 40, 30, 55, 45, 36, 125, 168, 154, 125, 110, 109, 96, 95 ],
          "stack" : "energy",
          "name" : "充电桩"
        }, {
          "data" : [ 60, 70, 90, 65, 45, 95, 130, 120, 90, 65, 50, 40, 30, 55, 45, 36, 125, 168, 154, 125, 110, 109, 96, 95 ],
          "stack" : "energy",
          "name" : "配电"
        }, {
          "data" : [ 60, 70, 90, 65, 45, 95, 130, 120, 90, 65, 50, 40, 30, 55, 45, 36, 125, 155, 56, 123, 154, 80, 50, 23 ],
          "stack" : "energy",
          "name" : "空调"
        } ]
      }
    }}
  }
}

// 用能统计-用能数据
export function usechartlist (params) {
  return {
    url: '/statistics/use/chart/list',
    type: 'post',
    data: {
      "msg" : "success",
      "dateTime" : "2018-07-17 08:00:00",
      "code" : 0,
      "info" : [ {
        "01:00" : "321",
        "02:00" : "158",
        "05:00" : "12",
        "06:00" : "22",
        "04:00" : "105",
        "03:00" : "65",
        "08:00" : "98",
        "07:00" : "78",
        "09:00" : "45",
        "10:00" : "66",
        "total" : "980",
        "areaName" : "插座",
        "areaId" : "1"
      }, {
        "01:00" : "321",
        "02:00" : "158",
        "05:00" : "12",
        "06:00" : "22",
        "04:00" : "105",
        "03:00" : "65",
        "08:00" : "98",
        "07:00" : "78",
        "09:00" : "45",
        "10:00" : "66",
        "total" : "980",
        "areaName" : "照明",
        "areaId" : "2"
      } ]
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