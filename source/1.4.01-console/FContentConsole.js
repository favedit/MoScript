with(MO){
   //==========================================================
   // <T>节点数据通讯的控制台。</T>
   //
   // @console
   // @author maocy
   // @version 150104
   //==========================================================
   MO.FContentConsole = function FContentConsole(o){
      o = RClass.inherits(this, o, FConsole);
      //..........................................................
      // @attribute
      o._scopeCd     = EScope.Local;
      o._connections = null;
      //..........................................................
      // @event
      o.onLoad       = FContentConsole_onLoad;
      //..........................................................
      // @method
      o.construct    = FContentConsole_construct;
      o.alloc        = FContentConsole_alloc;
      o.process      = FContentConsole_process;
      o.send         = FContentConsole_send;
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FContentConsole_construct = function FContentConsole_construct(){
      var o = this;
      o._connections = new TObjects();
   }

   //==========================================================
   // <T>加载事件完成后，响应的处理。</T>
   //
   // @method
   //==========================================================
   MO.FContentConsole_onLoad = function FContentConsole_onLoad(){
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
   MO.FContentConsole_alloc = function FContentConsole_alloc(){
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
         a = RClass.create(FXmlConnection);
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
   MO.FContentConsole_process = function FContentConsole_process(e){
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

   //==========================================================
   // <T>异步获发送一个XML信息，返回XML信息。</T>
   //
   // @method
   // @param u:url:String 发送地址
   // @param d:document:TXmlDocument 发送文档
   // @return TXmlDocument 接收文档
   //==========================================================
   MO.FContentConsole_send = function FContentConsole_send(u, d){
      var o = this;
      var c = o.alloc();
      var r = c.syncSend(u, d);
      c._statusFree = true;
      return r;
   }
}
