//==========================================================
// <T>节点数据通讯的控制台。</T>
//
// @console
// @author maocy
// @version 150104
//==========================================================
MO.FXmlConsole = function FXmlConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   //..........................................................
   // @attribute
   o._scopeCd     = MO.EScope.Local;
   o._connections = null;
   o._caches      = null;
   //..........................................................
   // @event
   o.onLoad       = MO.FXmlConsole_onLoad;
   //..........................................................
   // @method
   o.construct    = MO.FXmlConsole_construct;
   // @method
   o.alloc        = MO.FXmlConsole_alloc;
   o.send         = MO.FXmlConsole_send;
   o.sendAsync    = MO.FXmlConsole_sendAsync;
   o.load         = MO.FXmlConsole_load;
   o.process      = MO.FXmlConsole_process;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FXmlConsole_construct = function FXmlConsole_construct(){
   var o = this;
   o._connections = new MO.TObjects();
   o._caches = new MO.TDictionary();
}

//==========================================================
// <T>加载事件完成后，响应的处理。</T>
//
// @method
//==========================================================
MO.FXmlConsole_onLoad = function FXmlConsole_onLoad(p){
   var o = this;
   debugger
   //var e = o.event;
   //e.document = o.document;
   //e.process();
   //o.event = null;
   //o.document = null;
   //o._statusFree = true;
}

//==========================================================
// <T>收集一个新的未使用的节点链接。</T>
//
// @method
// @return 节点链接
//==========================================================
MO.FXmlConsole_alloc = function FXmlConsole_alloc(){
   var o = this;
   // 查找一个未使用的节点链接
   var alloc = null;
   var connections = o._connections;
   for(var n = connections.count - 1; n >= 0; n--){
      var connection = connections.get(n);
      if(connection._statusFree){
         alloc = connection;
         break;
      }
   }
   // 没有未使用的时候，创建一个新的节点链接
   if(!alloc){
      alloc = MO.Class.create(MO.FXmlConnection);
      connections.push(alloc);
      alloc.onLoad = o.onLoad;
   }
   // 设置
   alloc._statusFree = false;
   alloc.clearLoadListeners();
   return alloc;
}

//==========================================================
// <T>异步获发送一个XML信息，返回XML信息。</T>
//
// @method
// @param url:String 发送地址
// @param document:TXmlDocument 发送文档
// @return TXmlDocument 接收文档
//==========================================================
MO.FXmlConsole_send = function FXmlConsole_send(url, document){
   var o = this;
   var connection = o.alloc();
   connection._asynchronous = false;
   var result = connection.send(url, document);
   connection._statusFree = true;
   return result;
}

//==========================================================
// <T>异步获发送一个XML信息，返回XML信息。</T>
//
// @method
// @param url:String 发送地址
// @param document:TXmlDocument 发送文档
// @param parameters:Object 参数
// @return TXmlDocument 接收文档
//==========================================================
MO.FXmlConsole_sendAsync = function FXmlConsole_sendAsync(url, document, parameters){
   var o = this;
   var connection = o.alloc();
   connection._asynchronous = true;
   connection._parameters = parameters;
   connection.send(url, document);
   return connection;
}

//==========================================================
// <T>异步获加载一个XML信息，返回XML信息。</T>
//
// @method
// @param u:url:String 发送地址
// @param d:document:TXmlDocument 发送文档
// @param p:parameters:Object 参数
// @return TXmlDocument 接收文档
//==========================================================
MO.FXmlConsole_load = function FXmlConsole_load(u, d, p){
   var o = this;
   // 查找缓冲数据
   var v = o._caches.get(u);
   if(v){
      return v;
   }
   // 加载缓冲数据
   var connection = o.alloc();
   connection._asynchronous = true;
   connection._parameters = p;
   v = connection._cache = MO.Class.create(FXmlData);
   connection.send(u, d);
   // 记住缓冲数据
   o._caches.set(u, v);
   return v;
}

//==========================================================
// <T>处理一个事件。</T>
//
// @method
// @param p:event:SXmlEvent 事件
//==========================================================
MO.FXmlConsole_process = function FXmlConsole_process(p){
   var o = this;
   // 检查参数
   if(p.constructor != MO.SXmlEvent){
      throw new MO.TError('Parameter type is invalid.');
   }
   // 发送内容
   var connection = o.alloc();
   connection._asynchronous = true;
   connection.send(p.url, p.inputDocument);
   connection.addLoadListener(p, p.process);
   return connection;
}
