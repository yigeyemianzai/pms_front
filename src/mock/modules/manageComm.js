// 通讯管理菜单
/** ----------------------------------------多页面公用接口-------------------------------------------------------------------- */
// 组织结构信息列表
export function commdeviceOrgLists () {
  return {
    url: '/admin/tstation/org',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0,
      'list': [{
        'value': '-100',
        'label': '组织机构1',
        'children': [{
          'value': '1',
          'label': '组织机构1-1',
          'children': []
        },{
          'value': 'org1-2',
          'label': '组织机构1-2',
        }]
      }],
    }
  }
}

// 获取站点信息
export function commdeviceSiteLists () {
  return {
    url: '/commdevice/siteLists',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0,
      'list': [{
        'value': 'site1',
        'label': '站点1'
      },{
        'value': 'site2',
        'label': '站点2'
      }]
    }
  }
}

// 获取通道标识信息
export function commConnectChannelLists () {
  return {
    url: '/admin/tprotocolredismaster/channel',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0,
      'list': [{
        'value': 'channel1',
        'label': '通道1'
      },{
        'value': 'channel2',
        'label': '通道2'
      }]
    }
  }
}


/** ---------------------------------------通讯设备页面接口----------------------------------------------------------------------------- */
// 通讯设备页面 ----获取列表信息
export function commdeviceLists () {
  return {
    url: '/commdevice/lists',
    type: 'post',
    data:  Mock.mock({
      'msg': 'success',
      'code': 0,
      'page': {
        "pageSize": 10,
        "totalPage": 17,
        "currPage": 1,
        'totalCount': 2,
        'list|20': [{
          'commId': 'a',
          'orgId': '-100',
          'stationId': 'site1',
          'channelId': 'channel1',
          'equipTypeId': 'a',
          'commEquipName': '设备名称1',
          'remark': '备注111'
        },{
          'commId': 'b',
          'orgId': '1',
          'stationId': 'site1',
          'channelId': 'channel2',
          'equipTypeId': 'b',
          'commEquipName': '设备名称2',
          'remark': '备注1111'
        }]
      }     
    })
  }
}

// 获取设备型号
export function getEquipTypeIdLists () {
  return {
    url: '/commdevice/equipTypeId',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0,
      'list': [{
        'value': 'a',
        'label': '型号A'
      },{
        'value': 'b',
        'label': '型号B'
      }]
    }
  }
}

// 获取通讯设备标识
export function getDeviceOptions () {
  return {
    url: '/commdevice/deviceOptions',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0,
      'list': [{
        'value': 'a',
        'label': '标识A'
      },{
        'value': 'b',
        'label': '标识B'
      }]
    }
  }
}

/** ----------------------------------------通讯连接页面接口------------------------------------------------------------------------------ */

// 通讯连接页面  ---- 获取列表信息
// 协议类型 0:104主、1:104从、2:redis主、3:redis从
export function commConnectLists () {
  return {
    url: '/commconnect/lists',
    type: 'post',
    data: Mock.mock({
          'msg': 'success',
          'code': 0,
          'page': {
            'totalCount': 50,
            'currPage': 1,
            'pageSize': 10,
            'list|10': [{ 
              'channelId': '@string("lower", 5, 10)',
              'orgId': '组织机构1-2',
              'channelName': '通道@character("upper")',
              'channelCode': '@natural(1, 1000)',
              'channelAddress': '1',
              'connectFlag': '1',
              'connectType': '1',
              'connectModel': '1',
              'protocolType': '0',
              'protocolTypeSet': {
                'asdoAddress1': '888',
                'callAllTime': '8',
                'setTime': '5',
                'yxStartAddr1': '666',
                'ycStartAddr1': '666',
                'ykStartAddr1': '666',
                'ytStartAddr1': '666',
                'ymStartAddr1': '666'
              },
              'localConnectUrl': '@ip',
              'localPort': '8080',
              'remoteConnectUrl': '@ip',
              'remotePort': '8001',
              'pollingInteval': '1'
            }, { 
              'channelId': '@string("lower", 5, 10)',
              'orgId': '组织机构1-2',
              'channelName': '通道@character("upper")',
              'channelCode': '@natural(1, 1000)',
              'channelAddress': '1',
              'connectFlag': '1',
              'connectType': '2',
              'connectModel': '2',
              'protocolType': '0',
              'protocolTypeSet': {
                'asdoAddress1': '888',
                'callAllTime': '8',
                'setTime': '5',
                'yxStartAddr1': '666',
                'ycStartAddr1': '666',
                'ykStartAddr1': '666',
                'ytStartAddr1': '666',
                'ymStartAddr1': '666'
              },
              'localConnectUrl': '@ip',
              'localPort': '8080',
              'remoteConnectUrl': '@ip',
              'remotePort': '8001',
              'pollingInteval': '1'
            }] 
          }
        })
  }
}


/** ----------------------------------------104主站协议表页面接口------------------------------------------------------------------------------ */
// 104主站协议表页面 ---- 获取列表信息
export function commAgreementLists () {
  return {
    url: '/admin/tprotocol104master/list',
    type: 'post',
    data: Mock.mock({
      'msg': 'success',
      'code': 0,
      'page': {
        'totalCount': 20,
        'list|20': [{
          'id' : '1',
          'channelId' : 'channel1',
          'asdoAddress' : '104',
          'callAllTime' : '11',
          'setTime' : '11',
          'yxStartAddr' : '1',
          'ycStartAddr' : '1',
          'ykStartAddr' : '1',
          'ytStartAddr' : '1',
          'ymStartAddr' : '1',
          "channelName" : "通道一"     
        }]
      }     
    })
  }
}

/** ----------------------------------------104从站协议表页面接口------------------------------------------------------------------------------ */
// 104从站协议表页面 ---- 获取列表信息
export function commAgreementsubLists () {
  return {
    url: '/admin/tprotocol104slave/list',
    type: 'post',
    data: Mock.mock({
      'msg': 'success',
      'code': 0,
      'page': {
        'totalCount': 2,
        'list|20': [{
          'id' : '1',
          'channelId' : 'channel1',
          'asdoAddress' : '104',
          'ycDataType' : '0',
          'yxStartAddr' : '1',
          'ycStartAddr' : '1',
          'ykStartAddr' : '1',
          'ytStartAddr' : '1',
          'ymStartAddr' : '1',
          "channelName" : "通道一"      
        },{
          'id' : '1',
          'channelId' : 'channel2',
          'asdoAddress' : '104',
          'ycDataType' : '1',
          'yxStartAddr' : '1',
          'ycStartAddr' : '1',
          'ykStartAddr' : '1',
          'ytStartAddr' : '1',
          'ymStartAddr' : '1',
          "channelName" : "通道一"     
        }]
      }      
    })
  }
}

/** ----------------------------------------redius主站协议表页面接口------------------------------------------------------------------------------ */
// redius主站协议表页面 ---- 获取列表信息
export function commRediusLists () {
  return {
    url: '/admin/tprotocolredismaster/list',
    type: 'post',
    data: Mock.mock({
      'msg': 'success',
      'code': 0,
      'page': {
        'totalCount': 5,
        'list|5': [ {
          "id" : 1,
          "channelId" : 1,
          "password" : "111111",
          "channelName" : "通道一"
        }, {
          "id" : 2,
          "channelId" : 1,
          "password" : "222222",
          "channelName" : "通道一"
        } ]
      }      
    })
  }
}

/** ----------------------------------------redius从站协议表页面接口------------------------------------------------------------------------------ */
// redius从站协议表页面 ---- 获取列表信息
export function commRediusSubLists () {
  return {
    url: '/admin/tprotocolredisslave/list',
    type: 'post',
    data: Mock.mock({
      'msg': 'success',
      'code': 0,
      'page':{
        'totalCount': 5,
        'list|5': [ {
          "id" : 1,
          "channelId" : 1,
          "password" : "111111",
          "reportTime" : 10,
          "channelName" : "通道一"
        }, {
          "id" : 2,
          "channelId" : 1,
          "password" : "222222",
          "reportTime" : 20,
          "channelName" : "通道一"
        } ]
      }      
    })
  }
}




/* export function commdeviceOrgLists () {
  return {
    url: '/commdevice/orgLists',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0,
    }
  }
} */