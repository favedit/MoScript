with(MO){
   //==========================================================
   // <T>页面数据通讯的控制台。</T>
   //
   // @console
   // @author maocy
   // @version 150104
   //==========================================================
   MO.FHttpConsole = function FHttpConsole(o){
      o = RClass.inherits(this, o, FConsole);
      //..........................................................
      // @attribute
      o._scopeCd  = EScope.Local;
      // @attribute
      o._pool     = null;
      //..........................................................
      // @event
      o.onLoad    = FHttpConsole_onLoad;
      //..........................................................
      // @method
      o.construct = FHttpConsole_construct;
      // @method
      o.alloc     = FHttpConsole_alloc;
      o.free      = FHttpConsole_free;
      o.send      = FHttpConsole_send;
      o.sendAsync = FHttpConsole_sendAsync;
      o.fetch     = FHttpConsole_fetch;
      // @method
      o.dispose   = FHttpConsole_dispose;
      return o;
   }

   //==========================================================
   // <T>加载事件完成后，响应的处理。</T>
   //
   // @method
   // @param connection:FHttpConnection 网络链接
   //==========================================================
   MO.FHttpConsole_onLoad = function FHttpConsole_onLoad(connection){
      var o = this;
      o._pool.free(connection);
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FHttpConsole_construct = function FHttpConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      // 设置变量
      o._pool = RClass.create(FObjectPool);
   }

   //==========================================================
   // <T>收集一个新的未使用的节点链接。</T>
   //
   // @method
   // @return 节点链接
   //==========================================================
   MO.FHttpConsole_alloc = function FHttpConsole_alloc(){
      var o = this;
      var pool = o._pool;
      // 查找一个未使用的节点链接
      if(!pool.hasFree()){
         var connection = RClass.create(FHttpConnection);
         connection._asynchronous = true;
         o._pool.push(connection);
      }
      // 收集对象
      var connection = pool.alloc();
      connection.clearLoadListeners();
      connection.clearProcessListeners();
      connection.addLoadListener(o, o.onLoad);
      return connection;
   }

   //==========================================================
   // <T>释放一个未使用的节点链接。</T>
   //
   // @method
   // @param connection:FHttpConnection 节点链接
   //==========================================================
   MO.FHttpConsole_free = function FHttpConsole_free(connection){
      this._pool.free(connection);
   }

   //==========================================================
   // <T>发送一个页面信息，返回页面信息。</T>
   //
   // @method
   // @param url:String 发送地址
   // @param data:Object 发送数据
   // @return FHttpConnection 链接对象
   //==========================================================
   MO.FHttpConsole_send = function FHttpConsole_send(url, data){
      var o = this;
      var connection = o.alloc();
      connection.send(url, data);
      return connection;
   }

   //==========================================================
   // <T>发送一个页面信息，返回页面信息。</T>
   //
   // @method
   // @param url:String 发送地址
   // @param data:Object 发送数据
   // @return FHttpConnection 链接对象
   //==========================================================
   MO.FHttpConsole_sendAsync = function FHttpConsole_sendAsync(url, data){
      var o = this;
      var connection = o.alloc();
      connection._asynchronous = true;
      connection.send(url, data);
      return connection;
   }

   //==========================================================
   // <T>发送一个页面信息，返回页面信息。</T>
   //
   // @method
   // @param url:String 发送地址
   // @param data:Object 发送数据
   // @return FHttpConnection 链接对象
   //==========================================================
   MO.FHttpConsole_fetch = function FHttpConsole_fetch(url, data){
      var o = this;
      var connection = o.alloc();
      connection._contentCd = EHttpContent.Text;
      connection.send(url, data);
      return connection;
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FHttpConsole_dispose = function FHttpConsole_dispose(){
      var o = this;
      o.__base.FConsole.dispose.call(o);
   }
}
