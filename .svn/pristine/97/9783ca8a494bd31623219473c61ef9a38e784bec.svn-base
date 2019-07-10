// 站点管理菜单
/** ---------------------------------------多页面公用接口----------------------------------------------------------------------------- */
// 站点管理页面 ---- 获取站点名称信息
export function commdeviceOrgLists () {
  return {
    url: '/admin/tstation/station',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0,
      'list': [{
        'label': '站点1',
        'value': '1'
      },{
        'label': '站点2',
        'value': '2'
      },{
        'label': '站点3',
        'value': '3'
      }]
    }
  }
}

/** ---------------------------------------站点管理页面接口----------------------------------------------------------------------------- */
// 站点管理页面 ---- 获取列表信息
export function siteStationLists () {
  return {
    url: '/admin/tstation/list',
    type: 'post',
    data: Mock.mock({
      'msg': 'success',
      'code': 0,     
      'page':{
        "pageSize": 10,
        "totalPage": 17,
        "currPage": 1,
        'totalCount': 5,
        'list|50': [{
        "stationId": 1001,
        "orgId": "1",
        "stationName": "南瑞",
        "stationCode": "1001",
        "affiliationType": 2,
        "affiliationUint": "国家电网",
        "districtCode": null,
        "address": "南京市江宁区",
        "lng": 120.2,
        "lat": 68.5,
        "cpName": "张工",
        "cpTel": "13666666666",
        "operationType": null,
        "operationState": 1,
        "updateUser": null,
        "updateTime": null,
        "imgUrl": null
      }]}
    })
  }
}

// 站点管理页面 ---- 获取行政区域编码信息
export function siteRegionLists () {
  return {
    url: '/admin/tstation/region',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0,
      'list': [{
        'label': '省',
        'value': '1',
        'children': [{
          'label': '市',
          'value': '1-1',
          'children': [{
            'label': '区',
            'value': '1-1-1',
          }]
        }]
      },{
        'label': '省',
        'value': '2',
        'children': [{
          'label': '市',
          'value': '2-1',
          'children': [{
            'label': '区',
            'value': '2-1-1',
          }]
        }]
      }]
    }
  }
}
/** ---------------------------------------楼层管理页面接口----------------------------------------------------------------------------- */
// 楼层管理页面 ---- 获取列表信息
export function commFloorLists () {
  return {
    url: '/admin/tfloor/list',
    type: 'post',
    data: Mock.mock({
      'msg': 'success',
      'code': 0,     
      'page': {
        "pageSize": 10,
        "totalPage": 17,
        "currPage": 1,
        'totalCount': 5,
        'list|5': [{
          'orgId': '-100',
          "floorId": '1',
          "stationId": '1',
          "floorType": 1,
          "parentId": null,
          "floorCode": "1001",
          "floorName": "一层",
          "isLeaf": '1',
          'children': [{
            'orgId': '-100',
            "floorId": '1-1',
            "stationId": '1',
            "floorType": 2,
            "parentId": '1',
            "floorCode": "1001",
            "floorName": "一层",
            'children': []
          }]
          }]
      }
    })
  }
}
// 楼层管理页面 ---- 获取楼层信息下拉框数据
export function getFloorList () {
  return {
    url: '/admin/tfloor/floorName',
    type: 'psot',
    data: {
      'msg' : 'success',
      'code' : 0,
      'list': [{
        'label': '一层',
        'value':'1'
      }, {
        'label': '二层',
        'value':'2'
      }, {
        'label': '三层',
        'value':'3'
      }]
    }
  }
}


/** ---------------------------------------费用管理页面接口----------------------------------------------------------------------------- */
// 费用管理页面 ---- 获取列表信息
export function commcostLists () {
  return {
    url: '/cost/lists',
    type: 'post',
    data: Mock.mock({
      'msg': 'success',
      'code': 0,
      'totalCount': 5,
      'list|2': [{
        'ID': '1' ,
        'orgId': '-100',
        'costId': '1' ,  
        'costCode': 'a' , 
        'price': '12' , 
        'peiceUnit': '',
        'energyCode': '1',
        'name': '123',
        'remark': '123',
        'children': [{
          'ID': '11' ,
          'parentId': '1',
          'costId': '11' ,  
          'costCode': 'a' , 
          'price': '1' , 
          'peiceUnit': 'a',
          'energyCode': '',
          'name': '123',
          'remark': '123',
          'isChildren': true
        }]
      }]
    })
  }
}



//  费用管理页面 ---- 获取能源种类信息
export function commcostEnergyLists () {
  return {
    url: '/cost/energyLists',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0,
      'list': [{
        'label': '能源1',
        'value': '1'
      },{
        'label': '能源2',
        'value': '2'
      },{
        'label': '能源3',
        'value': '3'
      }]
    }
  }
}
/** ---------------------------------------字典管理页面接口----------------------------------------------------------------------------- */
// 字典管理页面 ---- 获取列表信息
export function commdictionaryLists () {
  return {
    url: '/admin/codedetail/list',
    type: 'post',
    data: Mock.mock({
      "msg" : "success",
      "code" : 0,
      "page" : {
        "totalCount" : 1,
        "pageSize" : 10,
        "totalPage" : 1,
        "currPage" : 1,
        "list" : [ {
          "codeId": "10400001",
          "codeType": 1040,
          "typeName": "用户操作权限",
          "code": 1,
          "codeName": "改",
          "subCodeType": null,
          "parentId": null,
          "sortNo": 1,
          "remark": null,
          "children": null,
          "leaf": false,
          'children': [/* {
            "codeId": "104000041",
            "codeType": 1040,
            "typeName": "用户操作权限",
            "code": 1,
            "codeName": "改",
            "subCodeType": null,
            "parentId": '10400001',
            "sortNo": 1,
            "remark": null,
            "children": null,
            "leaf": false,
          } */]
        }, {
          "codeId": "10400002",
          "codeType": 1040,
          "typeName": "用户操作权限",
          "code": 2,
          "codeName": "改111",
          "subCodeType": null,
          "parentId": null,
          "sortNo": 2,
          "remark": null,
          "children": null,
          "leaf": true,
          "children": [],
        }, {
          "codeId": "10000003",
          "codeType": 1040,
          "typeName": "用户操作权限",
          "code": 3,
          "codeName": "改222",
          "subCodeType": null,
          "parentId": null,
          "sortNo": 3,
          "remark": null,
          "children": [],
          "leaf": true
        } ]
      }
    })
  }
} 
// 字典管理页面 ---- 获取子列表信息
export function commcodedetailLists () {
  return {
    // url: '/admin/codedetail/list/detail',
    url: '/admin/codedetail/detail',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0,
      'totalCount': 5,
      'list': [{
        "codeId" : "10010001",
        "codeType" : 1001,
        "typeName" : "子系统类型",
        "code" : 1,
        "codeName" : "VRV空调",
        "parentId" : "10400001",
        "sortNo" : 1,
        "leaf" : false
      }]
    }
  }
}

/* export function commdeviceOrgLists () {
  return {
    url: '/sys/resinfo/list',
    type: 'post',
    data: Mock.mock({
      'msg': 'success',
      'code': 0,
      'totalCount': 5,
      'list|5': [{}]
    })
  }
} */