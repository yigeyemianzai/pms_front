
export function tree(params) {
  return {
    // isOpen: false,
    url: '/management/device-info/tree',
    type: 'post',
    data:Mock.mock( {
      'code': '0',
      'msg': 'success',
      "data":  [{
        name: 'leaf',
        value:1,
        leaf: true
      }, {
        name: 'zone'
      }]
      
    })
  }
}
//设备管理
//设备信息管理
//设备信息列表
export function devices(params) {
  return {
    // isOpen: false,
    url: '/management/device-info/devices',
    type: 'post',
    data:Mock.mock( {
      'code': '0',
      'msg': 'success',
      "data|25": [
          {
          'EQUIP_ID': 1,
          'EQUIP_NAME': '设备001',
          'station_code': '1112323',
          'USE_TYPE': '1',
          "ADIUSTABLE_MARGIN": "20",
          'mobile': '13612345678',
          'USE_STATUS': 1,
          'EQUIP_COST': 100,
          'createUserId': 1,
          'COMMISSIONING_DATE': '2016-11-11 11:11:11',
          "children":[{'EQUIP_ID': 1,
          'EQUIP_NAME': '设备001',
          'station_code': '1112323',
          'USE_TYPE': '1',
          "ADIUSTABLE_MARGIN": "20",
          'mobile': '13612345678',
          'USE_STATUS': 1,
          'roleIdList': null,
          'createUserId': 1,
          'COMMISSIONING_DATE': '2016-11-11 11:11:11',}]
        },
        {
          'EQUIP_ID': 2,
          'EQUIP_NAME': '设备002',
          'station_code': '1112323',
          'USE_TYPE': '2',
          "ADIUSTABLE_MARGIN": "30",
          'mobile': '13612345678',
          'USE_STATUS': 0,
          'roleIdList': null,
          'createUserId': 1,
          'COMMISSIONING_DATE': '2016-11-11 00:10:10'
        },
        
      ],
      'page': {
        'totalCount': 2,
        'pageSize': 10,
        'totalPage': 1,
        'currPage': 1,
      }
    })
  }
}
//设备信息列表
export function searchContent(params) {
  return {
    // isOpen: false,
    url: '/management/device-info/search',
    type: 'post',
    data: {
      'code': '0',
      'msg': 'success',
      "data": {
        options1: [{
          value: 'zuzhi',
          label: '组织机构',
          children: [{
            value: 'zuzhi1',
            label: '组织机构',
            children: [{
              value: 'zhzhi1',
              label: '组织1'
            }, {
              value: 'zhzhi2',
              label: '组织2'
            }, {
              value: 'zhzhi3',
              label: '组织3',
              children: [{
                  value:"zuzhi3-1",
                  label:"组织3-1"
              },{
                value:"zuzhi3-2",
                label:"组织3-2"
            }]
            }, {
              value: 'zhzhi4',
              label: '组织4'
            }]
          }]
        }],
        options2: [
            {value:"zhandian1",label:"站点1"},{
            value: 'zhandian2',
            label: '站点2',
            children: [{
              value: 'zhandian2-1',
              label: '站点2-1',
              children: [{
                value: 'zhandian2-1-1',
                label: '站点2-1-1'
              }, {
                value: 'zhandian2-1-2',
                label: '站点2-1-2'
              }, {
                value: 'zhandian2-1-3',
                label: '站点2-1-3',
              }, {
                value: 'zhandian2-1-4',
                label: '站点2-1-4'
              }]
            }]
          }],
          options3: [
            {value:"louceng",label:"楼层1"},{
            value: 'louceng2',
            label: '楼层2',
            children: [{
              value: 'louceng2-1',
              label: '楼层2-1',
              children: [{
                value: 'louceng2-1-1',
                label: '楼层2-1-1'
              }, {
                value: 'louceng2-1-2',
                label: '楼层2-1-2'
              }, {
                value: 'louceng2-1-3',
                label: '楼层2-1-3',
              }, {
                value: 'louceng2-1-4',
                label: '楼层2-1-4'
              }]
            }]
          }],
          sysOptons: [{
            value: '1',
            label: '系统1',
            children: [{
              value: 'zuzhi1',
              label: '子系统1',
             
            }]
          }],
          "type_Options":[
            {
            value: '1',
            label: '1'
          }, {
            value: '2',
            label: '2'
          }],
      }
    }
  }
}
// 获取设备信息
export function info () {
    return {
      // isOpen: false,
      url: '/management/device-info/info',
      type: 'post',
      data: {
        'msg': 'success',
        'code': 0,
        'info':{
            'equipId': 1,
            'EQUIP_COST': 100,
            "PRODUCTION_DATE":"2016-11-11 11:11:11",
            'EQUIP_NAME': '设备001',
            'station_code': '1112323',
            'USE_TYPE': '1',
            "ADIUSTABLE_MARGIN": "20",
            'ENERGY_FUNCTION': '1',
            'USE_STATUS': "1",
            'PARENT_ID': "2",
            'PHYSICAL_ID': "2",
            'createUserId': 1,
            'COMMISSIONING_DATE': '2016-11-11 11:11:11',
            "ENERGY_DIRECTION":"1",
            "ENERGY_ID":"1",
            "ADIUSTABLE_STATUS":"1",
            "IS_VIRTUAL":"0",
            "IS_BUS":"1",
            "EQUIP_TYPE_ID":"2",
            "COMM_ID":"1",
            "SYSTEM_CODE":"1",
            "FLOOR_ID":"1",
            "STATION_ID":"1",
            "AFFILIATE_ID":"3",

            "ORG_ID":["zizu"],

          },
          "statusOptions": [
            {
            value: '1',
            label: '未投运'
          }, {
            value: '2',
            label: '投运'
          }, {
            value: '3',
            label: '保养'
          }, {
            value: '4',
            label: '检修'
          }, {
            value: '5',
            label: '停用'
          }, {
            value: '6',
            label: '报废'
          }],
          "useTypeOptions": [
            {
            value: '1',
            label: '1'
          }, {
            value: '2',
            label: '2'
          }, {
            value: '3',
            label: '3'
          }, {
            value: '4',
            label: '4'
          }, {
            value: '5',
            label: '5'
          }, {
            value: '6',
            label: '6'
          }],
          "PHYSICALOptions": [
            {
            value: '1',
            label: '1'
          }, {
            value: '2',
            label: '2'
          }, {
            value: '3',
            label: '3'
          }, {
            value: '4',
            label: '4'
          }, {
            value: '5',
            label: '5'
          }, {
            value: '6',
            label: '6'
          }],
          "PARENTOptions": [{
            value: '1',
            label: '1'
          }, {
            value: '2',
            label: '2'
          }, {
            value: '3',
            label: '3'
          }, {
            value: '4',
            label: '4'
          }, {
            value: '5',
            label: '5'
          }, {
            value: '6',
            label: '6'
          }],
          "ENERGYOptions":[{
            value: '1',
            label: '1'
          }, {
            value: '2',
            label: '2'
          }],
          "EQUIP_TYPE_Options":
          [{
            value: '1',
            label: '1'
          }, {
            value: '2',
            label: '2'
          }],

          "COMM_Options":[
            {
            value: '1',
            label: '1'
          }, {
            value: '2',
            label: '2'
          }],
          "SYSTEM_Options":[
            {
            value: '1',
            label: '1'
          }, {
            value: '2',
            label: '2'
          }],
          "FLOOR_Options":[
            {
            value: '1',
            label: '1'
          }, {
            value: '2',
            label: '2'
          }],
          "STATION_Options":[
            {
            value: '1',
            label: '1'
          }, {
            value: '2',
            label: '2'
          }],
          "ORG_Options":[
            {
              value: 'zizu',
              label: 'saef',
              children: [{
                value: 'sef',
                label: 'asefsfa'}]
            }, {
              value: 'sefsef',
              label: 'aaa'
            }
          ],

        
      }
    }
  }

  // 获取设备数据信息
export function dataSet() {
  return {
    // isOpen: false,
    url: '/management/device-info/dataSet',
    type: 'get',
    data: {
      'msg': 'success',
      'code': 0,
      'info': {
        energy_table: [{
          "ID":1,
          'ALARM_PERIOD': 111,
          'GENERAL_LIMIT': 1,
          'SEVERITY_LIMIT': '12',
        },{
          "ID":2,
          'ALARM_PERIOD': 222,
          'GENERAL_LIMIT': 2,
          'SEVERITY_LIMIT': '22',
        }],
        "STATISTICS_DATE": "2018-03-18",
        "STEP_SIZE": "5",
      },
    }
  }
}













  // 设备厂商列表信息
  export function firmList () {
    return {
      // isOpen: false,
      url: '/management/device-firm/list',
      type: 'post',
      data: {
        'msg': 'success',
        'code': 0,
        'data':[
          {
            'FACTORY_ID': 111111,
            'SYSTEM_CODE': "001",
            'FACTORY_CODE': '001',
            "FACTORY_NAME":"厂商01",
            "FACTORY_ADDRESS":"江苏省xx市xx县",
            "CP_NAME":"Mr Ming",
            "CP_TEL":"12345678912",
            "CP_EMAIL":"163.xxx.com",
            "COMMENT":"我是一只小小鸟"
          },
          {
            'FACTORY_ID': 111112,
            'SYSTEM_CODE': "002",
            'FACTORY_CODE': '002',
            "FACTORY_NAME":"厂商02",
            "FACTORY_ADDRESS":"江苏省xx市xx县",
            "CP_NAME":"Mis Zhang",
            "CP_TEL":"11212011001",
            "CP_EMAIL":"111@qq.com",
            "COMMENT":"我是一只🐖"
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
    // 获取设备厂商信息
export function firmInfo () {
  return {
    // isOpen: false,
    url: '/management/device-firm/info',
    type: 'get',
    data: {
      'msg': 'success',
      'code': 0,
      'info':{
        'FACTORY_ID': 111111,
        'SYSTEM_CODE': "1",
        'FACTORY_CODE': '001',
        "FACTORY_NAME":"厂商01",
        "FACTORY_ADDRESS":"江苏省xx市xx县",
        "CP_NAME":"Mr Ming",
        "CP_TEL":"12345678912",
        "CP_EMAIL":"163.xxx.com",
        "COMMENT":"我是一只小小鸟"
        },
        "SYSTEM_Options":[
          {
          value: '1',
          label: '001'
        }, {
          value: '2',
          label: '002'
        }],
    }
  }
}



  // 设备型号列表信息
  export function modelList () {
    return {
      // isOpen: false,
      url: '/management/device-model/list',
      type: 'post',
      data: {
        'msg': 'success',
        'code': 0,
        'data':[
          {
            'EQUIP_TYPE_CODE': 111111,
            'SYSTEM_CODE': "子系统001",
            'EQUIP_TYPE_NAME': '设备型号001',
            "FACTORY_ID":"厂商01",
            "REMARK":"我是一只小小鸟"
          },
          {
            'EQUIP_TYPE_CODE': 111112,
            'SYSTEM_CODE': "子系统002",
            'EQUIP_TYPE_NAME': '设备型号002',
            "FACTORY_ID":"厂商02",
            "REMARK":"我是一只🐖"
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

// 获取设备型号信息
export function modelInfo () {
  return {
    // isOpen: false,
    url: '/management/device-model/info',
    type: 'get',
    data: {
      'msg': 'success',
      'code': 0,
      'info':{
        'EQUIP_TYPE_CODE': 111111,
            'SYSTEM_CODE': "2",
            'EQUIP_TYPE_NAME': '设备型号001',
            "FACTORY_ID":"2",
            "REMARK":"我是一只小小鸟"
        },
        "SYSTEM_Options": [{
          value: '1',
          label: '子系统001'
        }, {
          value: '2',
          label: '子系统002'
        }],
        "FACTORY_Options":[{
          value: '1',
          label: '厂商1'
        }, {
          value: '2',
          label: '厂商2'
        }],
    }
  }
}

  // 设备型号详细信息列表
  export function modelDetailList () {
    return {
      // isOpen: false,
      url: '/management/device-model/detailList',
      type: 'post',
      data: {
        'msg': 'success',
        'code': 0,
        'data|5':[
          {
            "POINT_TYPE":"1",
            "EQUIP_TYPE_DETAIL_ID":11,
            'EQUIP_TYPE_ID': 111111,
            'ATTRIBUE_TYPE': "2",
            'ATTRIBUE_CODE': '1',
            "ATTRIBUE_VALUE":"aaaa",
            "SORT_NO":1
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

  // 获取设备型号详细信息
export function modelDetailInfo () {
  return {
    // isOpen: false,
    url: '/management/device-model/detailInfo',
    type: 'get',
    data: {
      'msg': 'success',
      'code': 0,
      'info':{
        "POINT_TYPE":"1",

        'EQUIP_TYPE_DETAIL_ID': 111111,
            'EQUIP_TYPE_ID': "2",
            'ATTRIBUE_TYPE': '2',
            "ATTRIBUE_CODE":"1",
            "ATTRIBUE_VALUE":"我是一只小小鸟",
            "SORT_NO":"1",
        },
        "SYSTEM_Options": [{
          value: '1',
          label: '子系统001'
        }, {
          value: '2',
          label: '子系统002'
        }],
        "FACTORY_Options":[{
          value: '1',
          label: '厂商1'
        }, {
          value: '2',
          label: '厂商2'
        }],
    }
  }
}
  // 设备点位列表信息
  export function pointList () {
    return {
      // isOpen: false,
      url: '/management/device-point/list',
      type: 'post',
      data: {
        'msg': 'success',
        'code': 0,
        'data':[
          {
            "POINT_ID":"01",
            'POINT_TYPE': 1,
            'POINT_CODE': "1",
            'POINT_NAME': '1',
            "POINT_SHORT_NAME":"1",
            "POINT_UNIT":"1",
            'CLASSIFY_TYPE': '1',
            "SORT_NO":"1",
            "IS_DECODE":"1",
            "DESCRIBE":"我是一只小小鸟",
          },
          {
            "POINT_ID":"02",
            'POINT_TYPE': "2",
            'POINT_CODE': "2",
            'POINT_NAME': '2',
            "POINT_SHORT_NAME":"2",
            "POINT_UNIT":"2",
            'CLASSIFY_TYPE': '2',
            "SORT_NO":"2",
            "IS_DECODE":"0",
            "DESCRIBE":"我是一只🐖"
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


  // 获取设备点位信息
export function pointInfo () {
  return {
    // isOpen: false,
    url: '/management/device-point/info',
    type: 'get',
    data: {
      'msg': 'success',
      'code': 0,
      'info':{
        "POINT_ID":"01",
            'POINT_TYPE': "1",
            'POINT_CODE': "1",
            'POINT_NAME': '1',
            "POINT_SHORT_NAME":"1",
            "POINT_UNIT":"1",
            'CLASSIFY_TYPE': '1',
            "SORT_NO":"1",
            "IS_DECODE":"1",
            "DESCRIBE":"我是一只🐖"
        },
       
    }
  }
}
  // 量码配置列表
  export function pointDetailList () {
    return {
      // isOpen: false,
      url: '/management/device-point/detailList',
      type: 'post',
      data: {
        'msg': 'success',
        'code': 0,
        'data|5':[
          {
            "pointId":"1",
                "sigalValue":"1",
                "codeValue":"1",
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
  // 量码配置信息
  export function pointDetailInfo () {
    return {
      // isOpen: false,
      url: '/management/device-point/detailInfo',
      type: 'get',
      data: {
        'msg': 'success',
        'code': 0,
        'info':{
          "pointId":"1",
                "sigalValue":"1",
                "codeValue":"1",
          },
         
      }
    }
  }