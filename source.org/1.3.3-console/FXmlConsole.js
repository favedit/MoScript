//==========================================================
// <T>节点数据通讯的控制台。</T>
//
// @console
// @author maocy
// @version 150104
//==========================================================
function FXmlConsole(o){
   o = RClass.inherits(this, o, FConsole);
   // Attribute
   o._scopeCd    = EScope.Local;
   o.connections = null;
   // Event
   o.onLoad      = FXmlConsole_onLoad;
   // Method
   o.construct   = FXmlConsole_construct;
   o.alloc       = FXmlConsole_alloc;
   o.send        = FXmlConsole_send;
   o.sendAsync   = FXmlConsole_sendAsync;
   o.process     = FXmlConsole_process;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FXmlConsole_construct(){
   var o = this;
   o.connections = new TObjects();
}

//==========================================================
// <T>加载事件完成后，响应的处理。</T>
//
// @method
//==========================================================
function FXmlConsole_onLoad(p){
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
function FXmlConsole_alloc(){
   var o = this;
   // 查找一个未使用的节点链接
   var a = null;
   var cs = o.connections;
   for(var n = cs.count - 1; n >= 0; n--){
      var c = cs.get(n);
      if(c._statusFree){
         a = c;
         break;
      }
   }
   // 没有未使用的时候，创建一个新的节点链接
   if(!a){
      a = RClass.create(FXmlConnection);
      cs.push(a);
      a.onLoad = o.onLoad;
   }
   // 设置
   a._statusFree = false;
   return a;
}

//==========================================================
// <T>异步获发送一个XML信息，返回XML信息。</T>
//
// @method
// @param u:url:String 发送地址
// @param d:document:TXmlDocument 发送文档
// @return TXmlDocument 接收文档
//==========================================================
function FXmlConsole_send(u, d){
   var o = this;
   var c = o.alloc();
   c._asynchronous = false;
   var r = c.send(u, d);
   c._statusFree = true;
   return r;
}

//==========================================================
// <T>异步获发送一个XML信息，返回XML信息。</T>
//
// @method
// @param u:url:String 发送地址
// @param d:document:TXmlDocument 发送文档
// @param p:parameters:Object 参数
// @return TXmlDocument 接收文档
//==========================================================
function FXmlConsole_sendAsync(u, d, p){
   var o = this;
   var c = o.alloc();
   c._asynchronous = true;
   c._parameters = p;
   c.send(u, d);
   return c;
}

//==========================================================
// <T>处理一个事件。</T>
//
// @method
// @param p:event:SXmlEvent 事件
//==========================================================
function FXmlConsole_process(p){
   var o = this;
   // 检查参数
   if(p.constructor != SXmlEvent){
      throw new TError('Parameter type is invalid.');
   }
   // 发送内容
   var c = o.alloc();
   c._asynchronous = true;
   c.send(p.url, p.inputDocument);
   c.lsnsLoad.register(p, p.process);
   return c;
}
