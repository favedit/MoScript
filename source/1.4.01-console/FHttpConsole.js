//==========================================================
// <T>页面数据通讯的控制台。</T>
//
// @console
// @author maocy
// @version 150104
//==========================================================
MO.FHttpConsole = function FHttpConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   //..........................................................
   // @attribute
   o._scopeCd   = MO.EScope.Local;
   // @attribute
   o._pool      = null;
   //..........................................................
   // @event
   o.onComplete = MO.FHttpConsole_onComplete;
   //..........................................................
   // @method
   o.construct  = MO.FHttpConsole_construct;
   // @method
   o.create     = MO.FHttpConsole_create;
   o.alloc      = MO.FHttpConsole_alloc;
   o.free       = MO.FHttpConsole_free;
   // @method
   o.send       = MO.FHttpConsole_sendAsync;
   o.sendSync   = MO.FHttpConsole_sendSync;
   o.sendAsync  = MO.FHttpConsole_sendAsync;
   // @method
   o.fetch      = MO.FHttpConsole_fetchAsync;
   o.fetchSync  = MO.FHttpConsole_fetchSync;
   o.fetchAsync = MO.FHttpConsole_fetchAsync;
   // @method
   o.dispose    = MO.FHttpConsole_dispose;
   return o;
}

//==========================================================
// <T>加载事件完成后，响应的处理。</T>
//
// @method
// @param connection:FHttpConnection 网络链接
//==========================================================
MO.FHttpConsole_onComplete = function FHttpConsole_onComplete(event){
   var o = this;
   var connection = event.connection;
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
   o._pool = MO.Class.create(MO.FObjectPool);
}

//==========================================================
// <T>创建一个网络链接。</T>
//
// @method
// @return 网络链接
//==========================================================
MO.FHttpConsole_create = function FHttpConsole_create(){
   return MO.Class.create(MO.FHttpConnection);
}

//==========================================================
// <T>收集一个新的未使用的节点链接。</T>
//
// @method
// @param clazz 类型
// @return 节点链接
//==========================================================
MO.FHttpConsole_alloc = function FHttpConsole_alloc(clazz){
   var o = this;
   var pool = o._pool;
   // 查找一个未使用的节点链接
   if(!pool.hasFree()){
      o._pool.push(o.create());
   }
   // 收集对象
   var connection = pool.alloc();
   connection.reset();
   connection.addCompleteListener(o, o.onComplete);
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
// <T>发送一个同步数据请求，返回请求数据。</T>
//
// @method
// @param url:String 发送地址
// @param data:Object 发送数据
// @return FHttpConnection 链接对象
//==========================================================
MO.FHttpConsole_sendSync = function FHttpConsole_sendSync(url, data){
   var o = this;
   var connection = o.alloc();
   connection._asynchronous = false;
   connection.send(url, data);
   return connection.content();
}

//==========================================================
// <T>发送一个异步数据请求。</T>
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
// <T>发送一个同步文本请求，返回请求文本。</T>
//
// @method
// @param url:String 发送地址
// @param data:Object 发送数据
// @return FHttpConnection 链接对象
//==========================================================
MO.FHttpConsole_fetchSync = function FHttpConsole_fetchSync(url, data){
   var o = this;
   var connection = o.alloc();
   connection._asynchronous = false;
   connection._contentCd = MO.EHttpContent.Text;
   connection.send(url, data);
   return connection.content();
}

//==========================================================
// <T>发送一个异步文本请求。</T>
//
// @method
// @param url:String 发送地址
// @param data:Object 发送数据
// @return FHttpConnection 链接对象
//==========================================================
MO.FHttpConsole_fetchAsync = function FHttpConsole_fetchAsync(url, data){
   var o = this;
   var connection = o.alloc();
   connection._asynchronous = true;
   connection._contentCd = MO.EHttpContent.Text;
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
