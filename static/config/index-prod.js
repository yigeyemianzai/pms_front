/**
 * 生产环境
 */
;(function () {
  window.SITE_CONFIG = {};

  // api接口请求地址
  // window.SITE_CONFIG['baseUrl'] = 'http://23.46.241.45:8080/pms';
  // window.SITE_CONFIG['baseUrl'] = 'http://192.168.8.100:8080/pms';
  window.SITE_CONFIG['baseUrl'] = 'http://47.98.232.105:8040/pms';
  
  // 3D图请求地址
  window.SITE_CONFIG['baseUrl1'] = 'http://47.98.232.105:8081/index.html'; 

  // websocket 地址
  window.SITE_CONFIG['wsBaseUrl'] = 'ws://47.98.232.105:8040/pms/websocket/';

  // cdn地址 = 域名 + 版本号
  window.SITE_CONFIG['domain']  = './'; // 域名
  window.SITE_CONFIG['version'] = '';   // 版本号(年月日时分)
  window.SITE_CONFIG['cdnUrl']  = window.SITE_CONFIG.domain + window.SITE_CONFIG.version;
})();
