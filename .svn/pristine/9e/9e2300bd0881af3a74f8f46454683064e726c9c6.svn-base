// 供需平衡-折线图
export function balancechartenergy(params) {
  return {
    url: '/device/stategrid/exigence/chart/hourload',
    type: 'post',
    data: {
      "code": 0,
      "msg": "success",
/*       "advance": {
        "time": "2018-01-20",
        "planId": "1",
        "timeslot": ["9:00-10:00", "11:00-12:00"],
        "size": 2
      }, */
      "chart": {
        "xAxis": ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"],
        "legend": ["实时负荷", "目标负荷", "预测负荷"],
        "series": [{
          "data": [50, 55, 60, 63, 65, 70, 91, 80, 90, 55,66,44,56,65,75,65,62,64,76,68,46,65,66,70,78],
          "name": "实时负荷",
          "id":1
        }, {
          "data": [70, 80, 90, 85, 85, 110, 120, 80, 90, 70, 80, 90, 85, 85, 110, 120, 80, 85, 70, 95, 60, 50],
          "name": "目标负荷"
        }, {
          "data": [55, 50, 65, 58, 70, 73, 81, 85, 80, 110, 112, 87, 76, 70, 75, 97, 99, 98, 100, 101, 99, 100, 95, 100],
          "name": "预测负荷"
        }]
      }
    }
  }
}

/* // 供需平衡-执行
export function balanceexecute(params) {
  return {
    url: '/stategrid/balance/execute',
    type: 'post',
    data: {
      "code": "0",
      "msg": "success"
    }
  }
} */

// 供需平衡 - 子系统
export function simulation(params) {
  return {
    url: '/device/stategrid/exigence/chart/system',
    type: 'post',
    data: {
      "code": 0,
      "msg": "success",
      "systemIds": ["1","2","4"],
/*       "advance": {
        "time": "2018-01-20",
        "planId": "1",
        "timeslot": ["9:00-10:00", "11:00-12:00"],
        "size": 2
      }, */
      "chart": {
        "xAxis": ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"],
        "legend": ["高温相变蓄热系统", "压缩空气储能系统", "VRV空调系统"],
        "series": [{
          "data": [80, 75, 85, 90, 60, 100, 120, 100, 85, 70, 55, 45, 36, 125, 168, 154, 125, 110, 109, 96, 95, 84, 65, 51, 48],
          "name": "高温相变蓄热系统"
        }, {
          "data": [60, 70, 90, 65, 45, 95, 130, 120, 90, 65, 50, 40, 30, 55, 45, 36, 125, 168, 154, 125, 110, 109, 96, 95, 60],
          "name": "压缩空气储能系统"
        },{
          "data": [50, 55, 63, 62, 55, 59, 70, 72, 68, 52, 55, 53, 43, 47, 62, 54, 57, 60, 61, 63, 64, 60, 68, 75, 50],
          "name": "VRV空调系统"
        }]
      }
    }
  }
}
// 供需平衡 - 子系统
export function table(params) {
  return {
    url: '/device/stategrid/equipSystemList',
    type: 'post',
    data: {
      "code": 0,
      "msg": "success",
      "systemIds": ["1","2","4"],
/*       "advance": {
        "time": "2018-01-20",
        "planId": "1",
        "timeslot": ["9:00-10:00", "11:00-12:00"],
        "size": 2
      }, */
      "info": [
        {
            "detailId":"1",
            "endTime":"2018-09-21 15:06:37",
            "num":"200",
            "startTime":"2018-09-21 12:06:37",
            "resols":[
                {
                    "actionVals":"12,12",
                    "controlEdnTime":1537513597532,
                    "controlStartTime":1537513597532,
                    "detailId":1,
                    "equipId":12,
                    "equipName":"高温相变",
                    "equipRegulateVal":"100",
                    "id":1,
                    "pointId":1000,
                    "pointType":1,
                    "stationId":"1000"
                },
                {
                    "actionVals":"12,12",
                    "controlEdnTime":1537513597533,
                    "controlStartTime":1537513597533,
                    "detailId":1,
                    "equipId":12,
                    "equipName":"高温相变2",
                    "equipRegulateVal":"100",
                    "id":2,
                    "pointId":1000,
                    "pointType":1,
                    "stationId":"1000"
                }
            ],
            "systemId":"1",
            "systemName":"高温相变蓄热系统",
            "systemRegulaateVal":"100"
        },
        {
            "detailId":"2",
            "startTime":"2018-09-21 12:06:37",
            "endTime":"2018-09-21 15:06:37",
            "num":"200",
            "resols":[
                {
                    "actionVals":"12,12",
                    "controlEdnTime":1537513597533,
                    "controlStartTime":1537513597533,
                    "detailId":1,
                    "equipName":"高温相变",
                    "equipRegulateVal":"100",
                    "id":1,
                    "pointId":1000,
                    "pointType":1,
                    "stationId":"1000"
                },
                {
                    "actionVals":"12,12",
                    "controlEdnTime":1537513597533,
                    "controlStartTime":1537513597533,
                    "detailId":1,
                    "equipName":"高温相变2",
                    "equipRegulateVal":"100",
                    "id":2,
                    "pointId":1000,
                    "pointType":1,
                    "stationId":"1000"
                }
            ],
            "systemId":"2",
            "systemName":"高温相变蓄热系统",
            "systemRegulaateVal":"100"
        }
    ]

    }
  }
}
// 需求响应-总览折线图
export function answerchartenergy(params) {
  return {
    url: '/device/stategrid/exigencenone/chart/hourload',
    type: 'post',
    data: {
      "code": 0,
      "msg": "success",
      "systemIds": ["1","2","4"],
      "chart": {
        "xAxis": ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"],
        "legend": ["用户满意度最高", "损失电量最小", "可调容量最大", "实时负荷"],
        "series": [{
          "data": [80, 85, 83, 88, 90, 85, 88, 83, 90, 86, 92, 90, 98, 92, 97, 95, 92, 93, 90, 88, 93, 90, 88, 94, 92, 96],
          "name": "用户满意度最高"
        }, {
          "data": [55, 60, 58, 63, 65, 60, 63, 58, 65, 60, 68, 65, 73, 67, 72, 70, 66, 68, 65, 63, 68, 65, 62, 70, 66, 70],
          "name": "损失电量最小"
        }, {
          "data": [45, 55, 53, 58, 50, 55, 48, 43, 50, 45, 53, 50, 58, 52, 56, 55, 50, 52, 48, 49, 53, 50, 47, 55, 50, 55],
          "name": "可调容量最大"
        }, {
          "data": [130, 135, 133, 138, 130, 135, 138, 133, 140, 136, 142, 140, 148, 142, 147, 145, 142, 143, 140, 138, 143, 130, 138, 144, 142, 146],
          "name": "实时负荷"
        }]
      }
    }
  }
}

// 需求响应-可调最大容量折线图
export function answerchartsubsystem(params) {
  return {
    url: '/device/stategrid/exigenceNone/chart/system',
    type: 'post',
    data: {
      "code": 0,
      "msg": "success",
      "chart": {
        "xAxis": ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00", "24:00"],
        "legend": ["高温相变蓄热系统", "压缩空气储能系统", "VRV空调系统"],
        "series": [{
          "data": [80, 75, 85, 90, 60, 100, 120, 100, 85, 70, 55, 45, 36, 125, 168, 154, 125, 110, 109, 96, 95, 84, 65, 51, 48],
          "name": "高温相变蓄热系统"
        }, {
          "data": [60, 70, 90, 65, 45, 95, 130, 120, 90, 65, 50, 40, 30, 55, 45, 36, 125, 168, 154, 125, 110, 109, 96, 95, 60],
          "name": "压缩空气储能系统"
        },{
          "data": [47, 52, 53, 54, 55, 60, 53, 45, 48, 52, 50, 44, 46, 53, 55, 42, 47, 48, 46, 44, 47, 48, 42, 40, 49],
          "name": "VRV空调系统"
        }]
      }
    }
  }
}
// 需求响应-事件列表
export function notable(params) {
  return {
    url: '/device/stategrid/equipSystemList',
    type: 'post',
    data: {
      "msg": "success",
      "code": 0,
      "info": [
        {
            "detailId":"1",
            "startTime":"2018-09-21 15:06:37",
            "endTime":"2018-09-21 15:06:37",
            "num":"200",
            "resols":[
                {
                    "actionVals":"12,12",
                    "controlEdnTime":1537513597532,
                    "controlStartTime":1537513597532,
                    "detailId":1,
                    "equipId":12,
                    "equipName":"高温相变",
                    "equipRegulateVal":"100",
                    "id":1,
                    "pointId":1000,
                    "pointType":1,
                    "stationId":"1000"
                },
                {
                    "actionVals":"12,12",
                    "controlEdnTime":1537513597533,
                    "controlStartTime":1537513597533,
                    "detailId":1,
                    "equipId":12,
                    "equipName":"高温相变2",
                    "equipRegulateVal":"100",
                    "id":2,
                    "pointId":1000,
                    "pointType":1,
                    "stationId":"1000"
                }
            ],
            "systemId":"1",
            "systemName":"高温相变蓄热系统",
            "systemRegulaateVal":"100"
        },
        {
            "detailId":"2",
            "startTime":"2018-09-21 15:06:37",
            "endTime":"2018-09-21 15:06:37",
            "num":"200",
            "resols":[
                {
                    "actionVals":"12,12",
                    "controlEdnTime":1537513597533,
                    "controlStartTime":1537513597533,
                    "detailId":1,
                    "equipName":"高温相变",
                    "equipRegulateVal":"100",
                    "id":1,
                    "pointId":1000,
                    "pointType":1,
                    "stationId":"1000"
                },
                {
                    "actionVals":"12,12",
                    "controlEdnTime":1537513597533,
                    "controlStartTime":1537513597533,
                    "detailId":1,
                    "equipName":"高温相变2",
                    "equipRegulateVal":"100",
                    "id":2,
                    "pointId":1000,
                    "pointType":1,
                    "stationId":"1000"
                }
            ],
            "systemId":"2",
            "systemName":"高温相变蓄热系统",
            "systemRegulaateVal":"100"
        }
    ]

    }
  }
}

// 需求响应-事件信息
export function answerinfo(params) {
  return {
    url: '/stategrid/answer/info',
    type: 'post',
    data: {
      "msg": "success",
      "code": 0,
      "plan": {
        "date": "2018-07-20",
        "planId": "12",
        "beginTime": "10:00",
        "endTime": "14:00",
        "economy": "100"
      }
    }
  }
}

// 需求响应-仿真
export function answersimulation(params) {
  return {
    url: '/stategrid/answer/simulation',
    type: 'post',
    data: {
      "code": 0,
      "msg": "success",
      "plan": {
        "date": "2018-07-20",
        "planId": "12",
        "beginTime": "10:00",
        "endTime": "14:00",
        "economy": "100"
      },
      "chart": {
        "xAxis": ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"],
        "legend": ["照明最大可调容量", "插座最大可调容量"],
        "series": [{
          "data": [80, 75, 85, 90, 60, 100, 120, 100, 85, 70, 55, 45, 36, 125, 168, 154, 125, 110, 109, 96, 95, 84, 65, 51],
          "name": "照明最大可调容量"
        }, {
          "data": [60, 70, 90, 65, 45, 95, 130, 120, 90, 65, 50, 40, 30, 55, 45, 36, 125, 168, 154, 125, 110, 109, 96, 95],
          "name": "插座最大可调容量"
        }]
      },
      "sys": [{
        "areaName": "照明",
        "size": "300",
        "areaId": "12",
        "beginTime": "2018-07-20 08:20:00",
        "endTime": "2018-07-20 14:20:00",
        "economy": "300"
      }, {
        "areaName": "插座",
        "size": "300",
        "areaId": "13",
        "beginTime": "2018-07-20 08:20:00",
        "endTime": "2018-07-20 14:20:00",
        "economy": "300"
      }]
    }
  }
}

// 需求响应-互动
export function answerexecute(params) {
  return {
    url: '/stategrid/answer/execute',
    type: 'post',
    data: {
      "code": "0",
      "msg": "success"
    }
  }
}

// 需求响应-可调设备列表
export function answerdevices(params) {
  return {
    url: '/stategrid/answer/devices',
    type: 'post',
    data: {
      "msg": "success",
      "code": 0,
      "events": {
        "totalCount": 168,
        "pageSize": 10,
        "totalPage": 17,
        "currPage": 1,
        "list": [{
          "equipName": "照明设备1",
          "equipId": "12",
          "beginTime": "2018-07-20 08:20:00",
          "endTime": "2018-07-20 14:20:00",
          "energy": "300",
          'deletetype': false,
          'regulation': '26→28'
        }, {
          "equipName": "照明设备2",
          "equipId": "14",
          "beginTime": "2018-07-20 08:20:00",
          "endTime": "2018-07-20 14:20:00",
          "energy": "300",
          'deletetype': false,
          'regulation': '26→28'
        }]
      }
    }
  }
}

// 需求响应-删除设备
export function answerdevicesdel(params) {
  return {
    url: '/stategrid/answer/devices/del',
    type: 'post',
    data: {
      "code": "0",
      "msg": "success"
    }
  }
}

// 需求响应-修改容量
export function answerdevicesupdate(params) {
  return {
    url: '/stategrid/answer/devices/update',
    type: 'post',
    data: {
      "code": "0",
      "msg": "success"
    }
  }
}

// 历史记录-列表
export function coldheat(params) {
  return {
    url: '/device/stategrid/queryHistory',
    type: 'post',
    data: {
      "msg": "success",
      "code": 0,
      "info": {
        "totalCount": 168,
        "pageSize": 10,
        "totalPage": 17,
        "currPage": 1,
        "list": [{
          "regulateEventId": "20180719",
          "schedule": "执行中",
          "createTime": "2018-07-19 08:00:09",
          "planId": "1",
          "beginTime": "2018-07-19 08:50:00",
          "endTime": "2018-07-19 14:00:00",
          "economy": "123",
          "planType": "经济最优",
          "targetCount": "354",
          "participant": "照明/插座/空调"
        },{
          "planCode": "20180720",
          "schedule": "执行中",
          "createTime": "2018-07-20 08:00:09",
          "planId": "2",
          "beginTime": "2018-07-20 08:50:00",
          "endTime": "2018-07-20 14:00:00",
          "economy": "32",
          "planType": "经济最优",
          "targetCount": "231",
          "participant": "照明/插座"
        },{
          "planCode": "20180720",
          "schedule": "执行中",
          "createTime": "2018-07-20 08:00:09",
          "planId": "2",
          "beginTime": "2018-07-20 08:50:00",
          "endTime": "2018-07-20 14:00:00",
          "economy": "32",
          "planType": "经济最优",
          "targetCount": "231",
          "participant": "照明/插座"
        },{
          "planCode": "20180720",
          "schedule": "执行中",
          "createTime": "2018-07-20 08:00:09",
          "planId": "2",
          "beginTime": "2018-07-20 08:50:00",
          "endTime": "2018-07-20 14:00:00",
          "economy": "32",
          "planType": "经济最优",
          "targetCount": "231",
          "participant": "照明/插座"
        },{
          "planCode": "20180720",
          "schedule": "执行中",
          "createTime": "2018-07-20 08:00:09",
          "planId": "2",
          "beginTime": "2018-07-20 08:50:00",
          "endTime": "2018-07-20 14:00:00",
          "economy": "32",
          "planType": "经济最优",
          "targetCount": "231",
          "participant": "照明/插座"
        },{
          "planCode": "20180720",
          "schedule": "执行中",
          "createTime": "2018-07-20 08:00:09",
          "planId": "2",
          "beginTime": "2018-07-20 08:50:00",
          "endTime": "2018-07-20 14:00:00",
          "economy": "32",
          "planType": "经济最优",
          "targetCount": "231",
          "participant": "照明/插座"
        },{
          "planCode": "20180720",
          "schedule": "执行中",
          "createTime": "2018-07-20 08:00:09",
          "planId": "2",
          "beginTime": "2018-07-20 08:50:00",
          "endTime": "2018-07-20 14:00:00",
          "economy": "32",
          "planType": "经济最优",
          "targetCount": "231",
          "participant": "照明/插座"
        },{
          "planCode": "20180720",
          "schedule": "执行中",
          "createTime": "2018-07-20 08:00:09",
          "planId": "2",
          "beginTime": "2018-07-20 08:50:00",
          "endTime": "2018-07-20 14:00:00",
          "economy": "32",
          "planType": "经济最优",
          "targetCount": "231",
          "participant": "照明/插座"
        },{
          "planCode": "20180720",
          "schedule": "执行中",
          "createTime": "2018-07-20 08:00:09",
          "planId": "2",
          "beginTime": "2018-07-20 08:50:00",
          "endTime": "2018-07-20 14:00:00",
          "economy": "32",
          "planType": "经济最优",
          "targetCount": "231",
          "participant": "照明/插座"
        },{
          "planCode": "20180720",
          "schedule": "执行中",
          "createTime": "2018-07-20 08:00:09",
          "planId": "2",
          "beginTime": "2018-07-20 08:50:00",
          "endTime": "2018-07-20 14:00:00",
          "economy": "32",
          "planType": "经济最优",
          "targetCount": "231",
          "participant": "照明/插座"
        },{
          "planCode": "20180720",
          "schedule": "执行中",
          "createTime": "2018-07-20 08:00:09",
          "planId": "2",
          "beginTime": "2018-07-20 08:50:00",
          "endTime": "2018-07-20 14:00:00",
          "economy": "32",
          "planType": "经济最优",
          "targetCount": "231",
          "participant": "照明/插座"
        },{
          "planCode": "20180720",
          "schedule": "执行中",
          "createTime": "2018-07-20 08:00:09",
          "planId": "2",
          "beginTime": "2018-07-20 08:50:00",
          "endTime": "2018-07-20 14:00:00",
          "economy": "32",
          "planType": "经济最优",
          "targetCount": "231",
          "participant": "照明/插座"
        },{
          "planCode": "20180720",
          "schedule": "执行中",
          "createTime": "2018-07-20 08:00:09",
          "planId": "2",
          "beginTime": "2018-07-20 08:50:00",
          "endTime": "2018-07-20 14:00:00",
          "economy": "32",
          "planType": "经济最优",
          "targetCount": "231",
          "participant": "照明/插座"
        },{
          "planCode": "20180720",
          "schedule": "执行中",
          "createTime": "2018-07-20 08:00:09",
          "planId": "2",
          "beginTime": "2018-07-20 08:50:00",
          "endTime": "2018-07-20 14:00:00",
          "economy": "32",
          "planType": "经济最优",
          "targetCount": "231",
          "participant": "照明/插座"
        },{
          "planCode": "20180720",
          "schedule": "执行中",
          "createTime": "2018-07-20 08:00:09",
          "planId": "2",
          "beginTime": "2018-07-20 08:50:00",
          "endTime": "2018-07-20 14:00:00",
          "economy": "32",
          "planType": "经济最优",
          "targetCount": "231",
          "participant": "照明/插座"
        }]
      }
    }
  }
}

// 历史记录-方案详情
export function answerplaninfo(params) {
  return {
    url: '/stategrid/answer/planinfo',
    type: 'post',
    data: {
      "code": 0,
      "msg": "success",
      "advance": {
        "planId": "1",
        "controlid": 10,
        "planCode": "20180719",
        "schedule": "未开始",
        "createTime": "2018-07-19 08:00:09",
        "beginTime": "2018-07-19 08:50:00",
        "endTime": "2018-07-19 14:00:00",
        "economy": "123",
        "planType": "经济最优",
        "targetCount": "354",
        "participant": "照明/插座",
        "planStatus": "2"
      },
      "chart": {
        "xAxis": ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"],
        "legend": ['预测负荷', '预测目标负荷', '实时负荷'],
        "series": [{
          "data": [80, 75, 85, 90, 60, 70, 70, 75, 85, 70, 80, 75, 85, 90, 60, 70, 80, 75, 85, 90, 60, 70, 84, 80],
          "name": "预测负荷"
        }, {
          "data": [60, 55, 58, 60, 40, 50, 50, 55, 65, 50, 60, 55, 65, 70, 40, 40, 50, 60, 55, 65, 40, 50, 64, 60],
          "name": "预测目标负荷"
        }, {
          "data": [70, 65, 75, 80, 50, 60, 60, 65, 75, 60],
          "name": "实时负荷"
        }]
      }
    }
  }
}

// 历史记录-调控详情
export function controlinfo(params) {
  return {
    url: '/stategrid/answer/history/controlinfo',
    type: 'post',
    data: {
      "msg": "success",
      "code": 0,
      "controls": [{
        "devices": [{
          "equipName": "照明1",
          "equipId": "1",
          "beginTime": "2018-07-19 08:50:00",
          "economy": "2"
        }, {
          "equipName": "照明2",
          "equipId": "2",
          "beginTime": "2018-07-19 08:50:00",
          "economy": "12"
        }],
        "areaName": "照明",
        "count": "200",
        "economy ": "20",
        "areaId": "1"
      }, {
        "devices": [{
          "equipName": "插座1",
          "equipId": "1",
          "beginTime": "2018-07-19 08:50:00",
          "economy": "2"
        }, {
          "equipName": "插座2",
          "equipId": "2",
          "beginTime": "2018-07-19 08:50:00",
          "economy": "12"
        }],
        "areaName": "插座",
        "count": "320",
        "economy ": "120",
        "areaId": "2"
      }]
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
