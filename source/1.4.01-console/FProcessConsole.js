//==========================================================
// <T>进程控制台。</T>
//
// @console
// @author maocy
// @version 150104
//==========================================================
MO.FProcessConsole = function FProcessConsole(o){
   o = MO.Class.inherits(this, o, FConsole);
   // Attribute
   o._scopeCd     = MO.EScope.Local;
   o._connections = null;
   // Event
   o.onLoad       = MO.FProcessConsole_onLoad;
   // Method
   o.construct    = MO.FProcessConsole_construct;
   o.alloc        = MO.FProcessConsole_alloc;
   o.process      = MO.FProcessConsole_process;
   o.send         = MO.FProcessConsole_send;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FProcessConsole_construct = function FProcessConsole_construct(){
   var o = this;
   o._connections = new MO.TObjects();
}

//==========================================================
// <T>加载事件完成后，响应的处理。</T>
//
// @method
//==========================================================
MO.FProcessConsole_onLoad = function FProcessConsole_onLoad(){
   var o = this;
   var e = o.event;
   e.document = o.document;
   e.process();
   o.event = null;
   o.document = null;
   o._statusFree = true;
}

//==========================================================
// <T>收集一个新的未使用的节点链接。</T>
//
// @method
// @return 节点链接
//==========================================================
MO.FProcessConsole_alloc = function FProcessConsole_alloc(){
   var o = this;
   // 查找一个未使用的节点链接
   var a = null;
   var cs = o._connections;
   for(var n = cs.count - 1; n >= 0; n--){
      var c = cs.get(n);
      if(c._statusFree){
         a = c;
         break;
      }
   }
   // 没有未使用的时候，创建一个新的节点链接
   if(!a){
      a = MO.Class.create(MO.FXmlConnection);
      cs.push(a);
      a.onLoad = o.onLoad;
   }
   // 设置
   a._statusFree = false;
   return a;
}

//==========================================================
// <T>同步或异步获发送一个XML信息，返回XML信息。</T>
//
// @method
// @param e:event:TEvent 事件信息
// @return XML信息
//==========================================================
MO.FProcessConsole_process = function FProcessConsole_process(e){
   var o = this;
   var c = o.alloc();
   c.event = e;
   switch(e.code){
      case MO.EXmlEvent.Send:
         c.send(e.url, e.document);
         break;
      case MO.EXmlEvent.Receive:
         c.receive(e.url, e.document);
         break;
      case MO.EXmlEvent.SyncSend:
         return c.syncSend(e.url, e.document);
      case MO.EXmlEvent.SyncReceive:
         return c.syncReceive(e.url, e.document);
   }
}

//==========================================================
// <T>异步获发送一个XML信息，返回XML信息。</T>
//
// @method
// @param u:url:String 发送地址
// @param d:document:TXmlDocument 发送文档
// @return TXmlDocument 接收文档
//==========================================================
MO.FProcessConsole_send = function FProcessConsole_send(u, d){
   var o = this;
   var c = o.alloc();
   var r = c.syncSend(u, d);
   c._statusFree = true;
   return r;
}
