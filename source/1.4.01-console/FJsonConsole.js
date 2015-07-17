//==========================================================
// <T>节点数据通讯的控制台。</T>
//
// @console
// @author maocy
// @version 150104
//==========================================================
MO.FJsonConsole = function FJsonConsole(o){
   o = MO.Class.inherits(this, o, MO.FHttpConsole);
   //..........................................................
   // @attribute
   o._scopeCd  = MO.EScope.Local;
   //..........................................................
   // @event
   o.onLoad    = MO.FJsonConsole_onLoad;
   //..........................................................
   // @method
   o.send      = MO.FJsonConsole_send;
   o.sendAsync = MO.FJsonConsole_sendAsync;
   return o;
}

//==========================================================
// <T>加载事件完成后，响应的处理。</T>
//
// @method
//==========================================================
MO.FJsonConsole_onLoad = function FJsonConsole_onLoad(connection){
   var o = this;
   o.__base.FHttpConsole.onLoad.call(o, connection)
   // 处理数据
   var source = connection.outputData();
   var content = JSON.parse(source);
   // 处理事件
   var event = MO.Memory.alloc(MO.SEvent);
   event.connection = connection;
   event.content = content;
   connection.processProcessListener(event);
   MO.Memory.free(event);
}

//==========================================================
// <T>异步获发送一个XML信息，返回XML信息。</T>
//
// @method
// @param url:String 发送地址
// @param document:TXmlDocument 发送文档
// @return TXmlDocument 接收文档
//==========================================================
MO.FJsonConsole_send = function FJsonConsole_send(url, d){
   var o = this;
   var connection = o.alloc();
   connection._asynchronous = false;
   connection._contentCd = MO.EHttpContent.Text;
   var result = connection.send(url, data);
   console.free(connection);
   return result;
}

//==========================================================
// <T>异步获发送一个XML信息，返回XML信息。</T>
//
// @method
// @param url:String 发送地址
// @param d:document:TXmlDocument 发送文档
// @param p:parameters:Object 参数
// @return TXmlDocument 接收文档
//==========================================================
MO.FJsonConsole_sendAsync = function FJsonConsole_sendAsync(url, data){
   var o = this;
   var connection = o.alloc();
   connection._asynchronous = true;
   connection._contentCd = MO.EHttpContent.Text;
   connection.send(url, data);
   return connection;
}
