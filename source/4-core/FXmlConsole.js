//==========================================================
// <T>节点数据通讯的控制台。</T>
//
// @console
// @author maocy
// @version 141231
//==========================================================
function FXmlConsole(o){
   o = RClass.inherits(this, o, FConsole);
   // Attribute
   o.scope       = EScope.Page;
   o.connections = null;
   // Event
   o.onLoad      = FXmlConsole_onLoad;
   // Method
   o.construct   = FXmlConsole_construct;
   o.alloc       = FXmlConsole_alloc;
   o.process     = FXmlConsole_process;
   o.send        = FXmlConsole_send;
   return o;
}

/***********************************************************
 * <T>构造函数。</T>
 *
 * @method
 **********************************************************/
function FXmlConsole_construct(){
   var o = this;
   o.connections = new TList();
}

/***********************************************************
 * <T>加载事件完成后，响应的处理。</T>
 *
 * @method
 **********************************************************/
function FXmlConsole_onLoad(){
   var o = this;
   var e = o.event;
   e.document = o.document;
   e.process();
   o.event = null;
   o.document = null;
   o.isFree = true;
}

/***********************************************************
 * <T>收集一个新的未使用的XML链接。</T>
 *
 * @method
 * @return XML链接
 **********************************************************/
function FXmlConsole_alloc(){
   var o = this;
   // 查找一个未使用的XML链接
   var a = null;
   var cs = o.connections;
   var l = cs.count;
   for(var n=0; n<l; n++){
      var c = cs.get(n);
      if(c && c.isFree){
         a = c;
         break;
      }
   }
   // 没有未使用的时候，创建一个新的XML链接
   if(!a){
      a = new TXmlConnect();
      cs.push(a);
      a.onLoad = o.onLoad;
   }
   // 设置
   a.isFree = false;
   return a;
}

/***********************************************************
 * <T>同步或异步获发送一个XML信息，返回XML信息。</T>
 *
 * @method
 * @param e:event:TEvent 事件信息
 * @return XML信息
 **********************************************************/
function FXmlConsole_process(e){
   var o = this;
   var c = o.alloc();
   c.event = e;
   switch(e.code){
      case EXmlEvent.Send:
         c.send(e.url, e.document);
         break;
      case EXmlEvent.Receive:
         c.receive(e.url, e.document);
         break;
      case EXmlEvent.SyncSend:
         return c.syncSend(e.url, e.document);
      case EXmlEvent.SyncReceive:
         return c.syncReceive(e.url, e.document);
   }
}

/***********************************************************
 * <T>异步获发送一个XML信息，返回XML信息。</T>
 *
 * @method
 * @param u:url:String 发送地址
 * @param d:document:TXmlDocument 发送文档
 * @return TXmlDocument 接收文档
 **********************************************************/
function FXmlConsole_send(u, d){
   var o = this;
   var c = o.alloc();
   var r = c.syncSend(u, d);
   c.isFree = true;
   return r;
}
