with(MO){
   //==========================================================
   // <T>节点数据通讯的控制台。</T>
   //
   // @console
   // @author maocy
   // @version 150104
   //==========================================================
   MO.FJsonConsole = function FJsonConsole(o){
      o = RClass.inherits(this, o, FConsole);
      //..........................................................
      // @attribute
      o._scopeCd  = EScope.Local;
      //..........................................................
      // @event
      o.onLoad    = FJsonConsole_onLoad;
      //..........................................................
      // @method
      o.construct = FJsonConsole_construct;
      // @method
      o.send      = FJsonConsole_send;
      o.sendAsync = FJsonConsole_sendAsync;
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FJsonConsole_construct = function FJsonConsole_construct(){
   }

   //==========================================================
   // <T>加载事件完成后，响应的处理。</T>
   //
   // @method
   //==========================================================
   MO.FJsonConsole_onLoad = function FJsonConsole_onLoad(connection){
      var o = this;
      var source = connection.outputData();
      var content = JSON.parse(source);
      // 处理事件
      var event = MO.Memory.alloc(SEvent);
      event.connection = connection;
      event.content = content;
      connection.processProcessListener(event);
      MO.Memory.free(event);
   }

   //==========================================================
   // <T>异步获发送一个XML信息，返回XML信息。</T>
   //
   // @method
   // @param u:url:String 发送地址
   // @param d:document:TXmlDocument 发送文档
   // @return TXmlDocument 接收文档
   //==========================================================
   MO.FJsonConsole_send = function FJsonConsole_send(u, d){
      var o = this;
      var console = RConsole.find(FHttpConsole);
      var connection = console.alloc();
      connection._asynchronous = false;
      connection._contentCd = EHttpContent.Text;
      connection.addLoadListener(o, o.onLoad);
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
      var connection = RConsole.find(FHttpConsole).alloc();
      connection._asynchronous = true;
      connection._contentCd = EHttpContent.Text;
      connection.addLoadListener(o, o.onLoad);
      connection.send(url, data);
      return connection;
   }
}
