// 能效提升-折线图
export function advancechart (params) {
  return {
    url: '/efficiency/advance/chart/energy',
    type: 'post',
    data: {
      "code" : 0,
      "msg" : "success",
      "advance" : {
        "time" : "2018-01-20",
        "planId" : "1",
        "timeslot" : [ "9:00-10:00", "11:00-12:00" ],
        "size" : 2
      },
      "chart" : {
        "xAxis" : [ "00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00" ],
        "legend" : [ "预测负荷", "预测目标负荷", "照明系统目标负荷", "插座系统目标负荷" ],
        "series" : [ {
          "data" : [ 80, 75, 85, 90, 60, 100, 120, 100, 85, 70, 55, 45, 36, 125, 168, 154, 125, 110, 109, 96, 95, 84, 65, 51 ],
          "name" : "预测负荷"
        }, {
          "data" : [ 60, 70, 60, 65, 45, 95, 130, 120, 90, 65, 50, 40, 30, 55, 45, 36, 125, 168, 154, 125, 110, 109, 96, 95 ],
          "name" : "预测目标负荷"
        }, {
          "data" : [ 20, 30, 25, 65, 45, 95, 130, 120, 90, 65, 50, 40, 30, 55, 45, 36, 125, 168, 154, 100, 110, 109, 96, 95 ],
          "name" : "照明系统目标负荷"
        }, {
          "data" : [ 40, 40, 35, 65, 45, 95, 130, 120, 90, 65, 50, 40, 30, 55, 45, 36, 125, 168, 154, 60, 110, 109, 96, 95 ],
          "name" : "插座系统目标负荷"
        } ]
      }
    }
  }
}

// 能源提升-仿真
export function advancesimulation (params) {
  return {
    url: '/efficiency/advance/simulation',
    type: 'post',
    data: {
      "code" : 0,
      "msg" : "success",
      "advance" : {
        "time" : "2018-01-20",
        "planId" : "1",
        "timeslot" : [ "9:00-10:00", "11:00-12:00" ],
        "size" : 2
      },
      "chart" : {
        "xAxis" : [ "00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00" ],
        "legend" : [ "预测负荷", "预测目标负荷", "照明系统目标负荷", "插座系统目标负荷" ],
        "series" : [ {
          "data" : [ 80, 75, 85, 90, 60, 100, 120,60, 85, 70, 55, 45, 36, 125, 168, 154, 125, 110, 109, 96, 95, 84, 65, 51 ],
          "name" : "预测负荷"
        }, {
          "data" : [ 60, 70, 90, 65, 45, 95, 130, 120, 90, 65, 50, 40, 30, 55, 45, 36, 125, 168, 154, 125, 110, 109, 96, 95 ],
          "name" : "预测目标负荷"
        }, {
          "data" : [ 60, 70, 90, 65, 45, 95, 130, 100, 80, 65, 50, 40, 30, 55, 45, 36, 125, 168, 154, 125, 110, 109, 96, 95 ],
          "name" : "照明系统目标负荷"
        }, {
          "data" : [ 60, 70, 90, 65, 45, 95, 130, 130, 90, 65, 50, 40, 30, 55, 45, 36, 125, 168, 154, 125, 110, 109, 96, 95 ],
          "name" : "插座系统目标负荷"
        } ]
      }
    }
  }
}

// 能效提升-执行
export function advanceexecute (params) {
  return {
    url: '/efficiency/advance/execute',
    type: 'post',
    data: {
      "code" : "0",
      "msg" : "success"
    } 
  }
}

// 历史记录-列表
export function advancehistorylist (params) {
  return {
    url: '/efficiency/advance/history/list',
    type: 'post',
    data: {
      "msg" : "success",
      "code" : 0,
      "events" : {
        "totalCount" : 168,
        "pageSize" : 10,
        "totalPage" : 17,
        "currPage" : 1,
        "list" : [ {
          "planCode" : "20180719",
          "schedule" : "已结束",
          "createTime" : "2018-07-19 08:00:09",
          "planId" : "1",
          "beginTime" : "2018-07-19 08:50:00",
          "endTime" : "2018-07-19 14:00:00",
          "economy" : "123",
          "planType" : "经济最优",
          "targetCount" : "354",
          "participant" : "照明/插座/空调"
        }, {
          "planCode" : "20180720",
          "schedule" : "已结束",
          "createTime" : "2018-07-20 08:00:09",
          "planId" : "2",
          "beginTime" : "2018-07-20 08:50:00",
          "endTime" : "2018-07-20 14:00:00",
          "economy" : "32",
          "planType" : "经济最优",
          "targetCount" : "231",
          "participant" : "照明/插座"
        } ]
      },
      "info" : {
        "advanceCount" : "2",
        "economy" : "120"
      }
    } 
  }
}

// 历史记录-方案详情
export function advanceplaninfo (params) {
  return {
    url: '/efficiency/advance/planinfo',
    type: 'post',
    data: {
      "code" : 0,
      "msg" : "success",
      "advance" : {
        "planId" : "1",
        "controlid" : 10,
        "planCode" : "20180719",
        "schedule" : "未开始",
        "createTime" : "2018-07-19 08:00:09",
        "beginTime" : "2018-07-19 08:50:00",
        "endTime" : "2018-07-19 14:00:00",
        "economy" : "123",
        "planType" : "经济最优",
        "targetCount" : "354",
        "participant" : "照明/插座",
        "planStatus" : "3"
      },
      "chart" : {
        "xAxis" : [ "00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00" ],
        "legend" : [ "预测负荷", "预测目标负荷", "照明系统目标负荷", "插座系统目标负荷", '实时负荷'],
        "series" : [ {
          "data" : [ 80, 75, 85, 90, 60, 100, 90, 80, 85, 70, 55, 45, 36, 40, 45, 42, 43, 45, 55, 96, 95, 84, 65, 51 ],
          "name" : "预测负荷"
        }, {
          "data" : [ 60, 55, 65, 70, 40, 80, 70, 60, 65, 50, 35, 25, 16, 20, 25, 22, 23, 25, 35, 76, 75, 64, 45, 31 ],
          "name" : "预测目标负荷"
        }, {
          "data" :[ 50, 45, 55, 60, 30, 70, 60, 50, 55, 40, 25, 15, 6, 10, 15, 12, 13, 15, 25, 66, 65, 54, 35, 21 ],
          "name" : "照明系统目标负荷"
        }, {
          "data" : [ 30, 25, 35, 40, 10, 50, 40, 30, 35, 20, 5, 10, 4, 6, 7, 8, 9, 5, 5, 46, 45, 34, 15, 10 ],
          "name" : "插座系统目标负荷"
        }, {
          "data" : [ 70, 65, 75, 80, 50, 90, 80, 70, 75, 60, 45, 35, 26, 30, 35, 32, 33, 35, 45, 86, 85, 74, 55, 41 ],
          "name" : "实时负荷"
        } ]
      }
    }
  }
}

// 历史记录-调控详情
export function advancecontrolinfo (params) {
  return {
    url: '/efficiency/advance/controlinfo',
    type: 'post',
    data: {
      "msg": "success",
      "code": 0,
      "controls": [
        {
          "devices": [
            {
              "equipName": "照明1",
              "equipId": "1",
              "beginTime": "2018-07-19 08:50:00",
              "economy": "2"
            },
            {
              "equipName": "照明2",
              "equipId": "2",
              "beginTime": "2018-07-19 08:50:00",
              "economy": "12"
            }
          ],
          "areaName": "照明",
          "count": "200",
          "economy": "20",
          "areaId": "1"
        },
        {
          "devices": [
            {
              "equipName": "插座1",
              "equipId": "1",
              "beginTime": "2018-07-19 08:50:00",
              "economy": "2"
            },
            {
              "equipName": "插座2",
              "equipId": "2",
              "beginTime": "2018-07-19 08:50:00",
              "economy": "12"
            }
          ],
          "areaName": "插座",
          "count": "320",
          "economy": "120",
          "areaId": "2"
        },
        {
          "devices": [
            {
              "equipName": "空调",
              "equipId": "1",
              "beginTime": "2018-07-19 08:50:00",
              "economy": "2"
            }
          ],
          "areaName": "空调",
          "count": "320",
          "economy": "120",
          "areaId": "2"
        },
        {
          "devices": [],
          "areaName": "高温相变",
          "count": "320",
          "economy": "120",
          "areaId": "2"
        }
      ]
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