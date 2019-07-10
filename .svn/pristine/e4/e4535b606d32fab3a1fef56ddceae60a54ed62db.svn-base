

//数据管理
//告警信息管理
//告警信息列表
export function alarmList(params) {
    return {
      // isOpen: false,
      url: '/management/device-data/alarmList',
      type: 'post',
      data: {
        'code': '0',
        'msg': 'success',
        "data": [
            {
            'ID': 1,
            'EQUIP_NAME': '设备001',
            'ALARM_PERIOD': 1,
            'GENERAL_LIMIT': 3,
            "SEVERITY_LIMIT":"11",
          },
          {
            'ID': 2,
            'EQUIP_NAME': '设备001',
            'ALARM_PERIOD': 2,
            'GENERAL_LIMIT': '5',
            "SEVERITY_LIMIT":"11",
          },
          
        ],
        'page': {
          'totalCount': 2,
          'pageSize': 10,
          'totalPage': 1,
          'currPage': 1,
        }
      }
    }
  }
  
  export function scCondition(params) {
    return {
      // isOpen: false,
      url: '/admin/obj/condition',
      type: 'post',
      data: {
        'code': 0,
        'msg': 'success',
        "page":{
         "list": [
            {
            'objId': 1,
            "objName":"asd"
          },
          {
            'objId': 2,
            "objName":"bbb"
          },
        ],
        'totalCount': 2,
        'pageSize': 10,
        'totalPage': 1,
        'currPage': 1,
        } ,
      }
    }
  } 
//统计数据配置对象选择
export function scObjList(params) {
  return {
    // isOpen: false,
    url: '/base/obj/list',
    type: 'post',
    data: {
      'code': '0',
      'msg': 'success',
      "page":{
       "list": [
          {
          'objId': 1,
          "objName":"asd"
        },
        {
          'objId': 2,
          "objName":"bbb"
        },
      ],
      'totalCount': 2,
      'pageSize': 10,
      'totalPage': 1,
      'currPage': 1,
      } ,
    }
  }
} 
//统计数据列表
  export function scList(params) {
    return {
      // isOpen: false,
      url: '/base/tstatisticsconfig/list',
      type: 'post',
      data: {
        'code': '0',
        'msg': 'success',
        "page":{
         "list": [
            {
            'scId': 1,
            'statisticsType': '2',
            'statisticsObjType': "3",
            'statisticsObjId': 3,
            "statisticsPoint":"11",
            "statisticsPeriod":"2",
            "statisticsStepSize":"1",
            "statisticsCoeffcient":"1",
            "statisticsName":"aaa"
          },
        ],
        'totalCount': 2,
        'pageSize': 10,
        'totalPage': 1,
        'currPage': 1,
        } ,
      }
    }
  } 
  //统计数据单个信息
  export function scInfo(params) {
    return {
      // isOpen: false,
      url: '/management/device-data/scInfo',
      type: 'post',
      data: {
        'code': 0,
        'msg': 'success',
        "info": 
            {
            'scId': 1,
            'statisticsType': '1',
            'statisticsObjType': "3",
            'statisticsObjId': "2",
            "statisticsPoint":"1",
            "statisticsPeriod":1,
            "statisticsStepSize":"1",
            "statisticsCoeffcient":"1"
          },
        "statisticsObjId_Options":
        [{
          value: '1',
          label: '1'
        }, {
          value: '2',
          label: '2'
        }],
        "statisticsPoint_Options":
        [{
          value: '1',
          label: '1'
        }, {
          value: '2',
          label: '2'
        }],

      }
    }
  } 
//统计数据列表信息
export function scDetailList(params) {
  return {
    // isOpen: false,
    url: '/management/device-data/scDetailList',
    type: 'post',
    data: {
      'code': 0,
      'msg': 'success',
      "data|5": [
          {
            "id":1,
            'scId': 1,
            'calcObjType': '2',
            'calcObjId': "3",
            'takeCalcPoint': 3,
            "calcClassMethod":"11",
            "calcCoeffcient":"2",  
        },
        
        
      ],
      'page': {
        'totalCount2': 5,
        'pageSize2': 10,
        'totalPage2': 1,
        'currPage2': 1,
      }
    }
  }
} 
  //统计数据单个信息
  export function scDetailInfo(params) {
    return {
      // isOpen: false,
      url: '/management/device-data/scDetailInfo',
      type: 'post',
      data: {
        'code': 0,
        'msg': 'success',
        "info": 
            {
            'id': 1,
            'scId': '1',
            'calcObjType': "3",
            'calcObjId': "2",
            "takeCalcPoint":"1",
            "calcClassMethod":1,
            "calcCoeffcient":1,
          },
        "statisticsObjId_Options":
        [{
          value: '1',
          label: '1'
        }, {
          value: '2',
          label: '2'
        }],
        "statisticsPoint_Options":
        [{
          value: '1',
          label: '1'
        }, {
          value: '2',
          label: '2'
        }],

      }
    }
  } 

  //负荷统计信息列表
export function loadList(params) {
  return {
    // isOpen: false,
    url: '/management/device-data/loadList',
    type: 'post',
    data: {
      'code': '0',
      'msg': 'success',
      "data": [
          {
          'ID': 1,
          'EQUIP_NAME': '设备001',
          'STEP_SIZE': 1,
        },
        {
          'ID': 2,
          'EQUIP_NAME': '设备002',
          "STEP_SIZE":60,
        },
        
      ],
      'page': {
        'totalCount': 2,
        'pageSize': 10,
        'totalPage': 1,
        'currPage': 1,
      }
    }
  }
}
  //负荷统计信息列表
  export function eCountList(params) {
    return {
      // isOpen: false,
      url: '/management/device-data/eCountList',
      type: 'post',
      data: {
        'code': '0',
        'msg': 'success',
        "data": [
            {
            'ID': 1,
            'EQUIP_NAME': '设备001',
            'IS_STATISTICS_HOURLY': "1",
            'IS_STATISTICS_DAYLY': "0",
            'IS_STATISTICS_WEEKLY': "0",
            'IS_STATISTICS_MONTHLY': "0",
            'IS_STATISTICS_YEARLY': "1",
          },
          {
            'ID': 2,
            'EQUIP_NAME': '设备002',
            'IS_STATISTICS_HOURLY': "0",
            'IS_STATISTICS_DAYLY': "1",
            'IS_STATISTICS_WEEKLY': "0",
            'IS_STATISTICS_MONTHLY': "1",
            'IS_STATISTICS_YEARLY': "0",
          },
          
        ],
        'page': {
          'totalCount': 2,
          'pageSize': 10,
          'totalPage': 1,
          'currPage': 1,
        }
      }
    }
  }