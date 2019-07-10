var WBT = function (web,func,ids) {
    /*
    websocket接口地址
    1、http请求还是https请求 前缀不一样
	2、ip地址host
    3、端口号
    */
    // const config = obj ? obj : {}
    // const protocol = (window.location.protocol == 'http:') ? 'ws://' : 'wss://';
    // const host =  window.location.host;
    // const port = ':8087';
    let token = this.$cookie.get('token')
    //接口地址url
    this.url = window.SITE_CONFIG.wsBaseUrl + token + web + func;
    // 数据
    this.list = ids
    //socket对象
    this.socket;
    //心跳状态  为false时不能执行操作 等待重连
    this.isHeartflag = false;
    //重连状态  避免不间断的重连操作
    this.isReconnect = false;
    //自定义Ws连接函数：服务器连接成功
    this.onopen = ((e) => {
        this.isHeartflag = true;
    	// console.log(e)
    })
    //自定义Ws消息接收函数：服务器向前端推送消息时触发
    this.onmessage = ((e) => {
        //处理各种推送消息
console.log(message)
        this.handleEvent(message)
    })
    //自定义Ws异常事件：Ws报错后触发
    this.onerror = ((e) => {
        console.log('error')
       this.isHeartflag = false;
        this.reConnect();
    })
    //自定义Ws关闭事件：Ws连接关闭后触发
    this.onclose = ((e) => {
        this.reConnect()
        console.log('close')
    })
    //初始化websocket连接
    this.initWs()
}

//初始化websocket连接 
WBT.prototype.initWs = function () {
    window.WebSocket = window.WebSocket || window.MozWebSocket;
    if (!window.WebSocket) { // 检测浏览器支持  			
        console.error('错误: 浏览器不支持websocket');
        return;
    }
    var that = this;
    this.socket = new WebSocket(this.url); // 创建连接并注册响应函数  
    this.socket.onopen = function (e) {
        that.send(this.list)
        that.onopen(e);
    };
    this.socket.onmessage = function (e) {
        that.onmessage(e);
    };
    this.socket.onclose = function (e) {
        that.onclose(e);
        that.socket = null; // 清理  		
    };
    this.socket.onerror = function (e) {
        that.onerror(e);
    }
    return this;											
}

//断线重连
WBT.prototype.reConnect = function () {
    if (this.isReconnect) return;
    this.isReconnect = true;
    //没连接上会一直重连，设置延迟避免请求过多
    setTimeout(function () {
        this.initWs()
        this.isReconnect = false;
  	 }, 2000);
}	

//心跳
_this.machineWs.last_health_time = -1; // 上一次心跳时间, -1代表还没有发过心跳
_this.machineWs.keepalive = function() {
    let time = new Date().getTime();
    console.log(time)
    console.log(_this.machineWs.last_health_time )
    if( _this.machineWs.last_health_time !== -1 && (time -  _this.machineWs.last_health_time) > 25000) { // 不是刚开始连接并且超过25s没有心跳
    
        _this.machineWs.close()
    } else { 
        // 如果断网了，ws.send会无法发送消息出去。ws.bufferedAmount不会为0。
        if( _this.machineWs.bufferedAmount === 0 &&  _this.machineWs.readyState === 1) { 
            _this.machineWs.send('ping');
            _this.machineWs.last_health_time = time;
        }
    }
}

//处理消息
WBT.prototype.handleEvent = function (message) {
    const action = message.action;
 const retCode = message.params.retCode.id;
 //根据action和retCode处理事件
 // console.log(action,retCode)
 if (this.handleAction[action][retCode]) this.handleAction[action][retCode]();
}
//事务处理 根据action
WBT.prototype.handleAction = {
  //登录反馈
'loginRsp': {
     '0': function () {
         console.log(0)
     },
     '3': function () {
         console.log(3)
     }
 }
}
