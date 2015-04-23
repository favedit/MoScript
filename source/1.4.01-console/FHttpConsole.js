//==========================================================
// <T>页面数据通讯的控制台。</T>
//
// @console
// @author maocy
// @version 150104
//==========================================================
function FHttpConsole(o){
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
   o.send      = FHttpConsole_send;
   // @method
   o.dispose   = FHttpConsole_dispose;
   return o;
}

//==========================================================
// <T>加载事件完成后，响应的处理。</T>
//
// @method
// @param p:connection:FHttpConnection 网络链接
//==========================================================
function FHttpConsole_onLoad(p){
   var o = this;
   o._pool.free(p);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FHttpConsole_construct(){
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
function FHttpConsole_alloc(){
   var o = this;
   var p = o._pool;
   // 查找一个未使用的节点链接
   if(!p.hasFree()){
      var c = RClass.create(FHttpConnection);
      c._asynchronous = true;
      o._pool.push(c);
   }
   // 收集对象
   var c = p.alloc();
   c.clearLoadListeners();
   c.addLoadListener(o, o.onLoad);
   return c;
}

//==========================================================
// <T>发送一个页面信息，返回页面信息。</T>
//
// @method
// @param url:String 发送地址
// @param data:Object 发送数据
// @return FHttpConnection 链接对象
//==========================================================
function FHttpConsole_send(url, data){
   var o = this;
   var connection = o.alloc();
   connection.send(url, data);
   return connection;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FHttpConsole_dispose(){
   var o = this;
   o.__base.FConsole.dispose.call(o);
}
