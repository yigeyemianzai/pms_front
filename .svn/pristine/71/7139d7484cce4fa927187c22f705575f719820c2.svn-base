/**---------------------------------- 遥测页面 ---------------------------*/
// 通道
export function channelLsit () {
  return {
    url: '/base/tchannel/map',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0,
      'lists': [{
        'value': 'channel1',
        'label': '通道1'
      },{
        'value': 'channel2',
        'label': '通道2'
      }]
    }
  }
}
// 转发遥测通道列表
export function zfChannelLsit () {
  return {
    url: '/tzfycrule/zfChannelList',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0,
      'list': [{
        'value': 'zchannel1',
        'label': 'z通道1'
      },{
        'value': 'zchannel2',
        'label': 'z通道2'
      }]
    }
  }
}
//遥测列表
export function ycList(params) {
  return {
    // isOpen: false,
    url: '/base/tycrule/list',
    type: 'post',
    data: Mock.mock({
      'code': 0,
      'msg': 'success',      
      'page': {
        'totalCount': 2,
        'pageSize': 10,
        'totalPage': 1,
        'currPage': 1,
        "list|20": [
          {
            "channelId":1,
            "equipId":1,
            "pointId":1001,
            "channelName":"通道1",
            "equipName":null,
            "pointName":null,
            "ycId":17,
            "ycAddress":null,
            "coeffcient":1,
            "scope":-1,
            "isSave":1,
            "stepSize":300,
            "generalUpLimit":-1,
            "generalDownLimit":-1,
            "severityUpLimit":-1,
            "severityDownLimit":-1
        },          
      ],
      }
    })
  }
}
// 获取转发列表
export function tycruleLists () {
  return {
    url: '/base/tzfycrule/list',
    type: 'post',
    data: Mock.mock({
      'msg': 'success',
      'code': 0,
      'page': {
        'totalCount': 5,
        'currPage': 1,
        'pageSize': 10,
        'list|20': [{
          'zfYcId|+1': 1,
          'channelId': '1',
          'zfYcAddress': '1',
          'srcChannelId': '1',
          'srcYcAddress': '1',
          "channelName":"通道1",
          "srcChannelName":null
        }]
      } 
    })
  }
}

// 配置按钮
export function tycruleInfo () {
  return {
    url: '/base/tycrule/info',
    type: 'post',
    data: Mock.mock({
      'msg': 'success',
      'code': 0,
      'tYcRule': {
        'channelId': '1',
        'equipId': '1',
        'pointId': '1',
        'ycAddress': '1',
        'coeffcient': '1',
        'scope': '1',
        'isSave': '1',
        'stepSize': '1',
        'generalUpLimit': '1',
        'generalDownLimit': '1',
        'severityUpLimit': '1',
        'severityDownLimit': '1',
      }
    })
  }
}

// 自动生成
export function tycsaveAuto () {
  return {
    url: '/base/tycrule/saveAuto',
    type: 'post',
    data: Mock.mock({
      'msg': 'success',
      'code': 0
    })
  }
}

/**---------------------------------- 遥控页面 ---------------------------*/
// 遥控列表
export function ykList(params) {
  return {
    // isOpen: false,
    url: '/base/tykrule/list',
    type: 'post',
    data: Mock.mock({
      'code': 0,
      'msg': 'success',      
      'page': {
        'totalCount': 2,
        'pageSize': 10,
        'totalPage': 1,
        'currPage': 1,
        "list|20": [
          {
          'ykId': 1,
          'channelId': '1',
          'equipId': '1',
          'pointId': '1',
          'ycAddress': '1'
        },          
      ],
      }
    })
  }
}
// 转发遥控列表
export function tykruleLists () {
  return {
    url: '/base/tzfykrule/list',
    type: 'post',
    data: Mock.mock({
      'msg': 'success',
      'code': 0,
      'page': {
        'totalCount': 5,
        'currPage': 1,
        'pageSize': 10,
        'list|5': [{
          'zfYkId|+1': 11,
          'channelId': '22',
          'zfYkAddress': '23',
          'srcChannelId': '24',
          'srcYkAddress': '25'
        }]
      } 
    })
  }
}
// 配置按钮
export function tykruleInfo () {
  return {
    url: '/base/tykrule/info',
    type: 'post',
    data: Mock.mock({
      'msg': 'success',
      'code': 0,
      'tYkRule': {
        'channelId': '1',
        'equipId': '1',
        'pointId': '1',
        'ykAddress': '1'
      }
    })
  }
}

/**---------------------------------- 遥脉页面 ---------------------------*/
// 遥脉列表
export function tykmuleLists () {
  return {
    url: '/base/tymrule/list',
    type: 'post',
    data: Mock.mock({
      'msg': 'success',
      'code': 0,
      'page': {
        'totalCount': 5,
        'currPage': 1,
        'pageSize': 10,
        'list|5': [{
          'ymId|+1': 1,
          'channelId': '2',
          'equipId': '2',
          'pointId': '2',
          'ymAddress': '2',
          'coeffcient': '2',
          'scope': '3',
          'isSave': '4',
          'stepSize': '4',
        }]
      } 
    })
  }
}
// 转发遥脉列表
export function tzfykmuleLists () {
  return {
    url: '/base/tzfymrule/list',
    type: 'post',
    data: Mock.mock({
      'msg': 'success',
      'code': 0,
      'page': {
        'totalCount': 5,
        'currPage': 1,
        'pageSize': 10,
        'list|5': [{
          'zfYmId|+1': 1,
          'channelId': '2',
          'zfYmAddress': '2',
          'srcChannelId': '2',
          'srcYmAddress': '2'
        }]
      } 
    })
  }
}
// 配置按钮
export function tymruleInfo () {
  return {
    url: '/base/tymrule/info',
    type: 'post',
    data: Mock.mock({
      'msg': 'success',
      'code': 0,
      'tYmRule': {
        'channelId': '2',
        'equipId': '2',
        'pointId': '2',
        'ymAddress': '2',
        'coeffcient': '2',
        'scope': '3',
        'isSave': '4',
        'stepSize': '4',
      }
    })
  }
}

/**---------------------------------- 遥调页面 ---------------------------*/
// 遥调列表
export function tytuleLists () {
  return {
    url: '/base/tytrule/list',
    type: 'post',
    data: Mock.mock({
      'msg': 'success',
      'code': 0,
      'page': {
        'totalCount': 5,
        'currPage': 1,
        'pageSize': 10,
        'list|5': [{
          'ytId': '2',
          'channelId': '2',
          'equipId': '2',
          'pointId': '2',
          'ytAddress': '2'
        }]
      } 
    })
  }
}
// 转发遥调列表
export function tzfytuleLists () {
  return {
    url: '/base/tzfytrule/list',
    type: 'post',
    data: Mock.mock({
      'msg': 'success',
      'code': 0,
      'page': {
        'totalCount': 5,
        'currPage': 1,
        'pageSize': 10,
        'list|5': [{
          'zfYtId|+1': 1,
          'channelId': '2',
          'zfYtAddress': '2',
          'srcChannelId': '2',
          'srcYtAddress': '2'
        }]
      } 
    })
  }
}
// 配置按钮
export function tytruleInfo () {
  return {
    url: '/base/tytrule/info',
    type: 'post',
    data: Mock.mock({
      'msg': 'success',
      'code': 0,
      'tYtRule': {
        'channelId': '2',
        'equipId': '2',
        'pointId': '2',
        'ytAddress': '2',
      }
    })
  }
}



/**---------------------------------- 遥信页面 ---------------------------*/
// 遥信列表
export function tyxuleLists () {
  return {
    url: '/base/tyxrule/list',
    type: 'post',
    data: Mock.mock({
      'msg': 'success',
      'code': 0,
      'page': {
        'totalCount': 5,
        'currPage': 1,
        'pageSize': 10,
        'list|5': [{
          'yxId|+1': 1,
          'channelId': '2',
          'equipId': '2',
          'pointId': '2',
          'yxAddress': '2',
          'coeffcient': '2',
          'scope': '2',
          'isSave': '2',
          'stepSize': '2'
        }]
      } 
    })
  }
}
// 转发遥信列表
export function tzfyxuleLists () {
  return {
    url: '/base/tzfyxrule/list',
    type: 'post',
    data: Mock.mock({
      'msg': 'success',
      'code': 0,
      'page': {
        'totalCount': 5,
        'currPage': 1,
        'pageSize': 10,
        'list|5': [{
          'zfYxId|+1': 1,
          'channelId': '2',
          'zfYxAddress': '2',
          'srcChannelId': '2',
          'srcYxAddress': '2'
        }]
      } 
    })
  }
}
// 配置按钮
export function tyxruleInfo () {
  return {
    url: '/base/tyxrule/info',
    type: 'post',
    data: Mock.mock({
      'msg': 'success',
      'code': 0,
      'tYxRule': {
        'channelId': '2',
        'equipId': '2',
        'pointId': '2',
        'yxAddress': '2',
        'coeffcient': '2',
        'scope': '2',
        'isSave': '2',
        'stepSize': '2'
      }
    })
  }
}

