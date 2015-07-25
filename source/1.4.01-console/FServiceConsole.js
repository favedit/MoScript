//==========================================================
// <T>服务通讯控制台。</T>
//
// @console
// @author maocy
// @version 150725
//==========================================================
MO.FServiceConsole = function FServiceConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   //..........................................................
   // @attribute
   o._scopeCd  = MO.EScope.Global;
   //..........................................................
   // @method
   o.construct = MO.FServiceConsole_construct;
   // @method
   o.send      = MO.FServiceConsole_send;
   // @method
   o.dispose   = MO.FServiceConsole_dispose;
   return o;
}

//==========================================================
// <T>加载事件完成后，响应的处理。</T>
//
// @method
// @param connection:FHttpConnection 网络链接
//==========================================================
MO.FServiceConsole_onLoad = function FServiceConsole_onLoad(connection){
   var o = this;
   o._pool.free(connection);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FServiceConsole_construct = function FServiceConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
}

//==========================================================
// <T>发送一个服务请求。</T>
//
// @method
// @return 节点链接
//==========================================================
MO.FServiceConsole_send = function FServiceConsole_send(code, action, content){
   var o = this;
   // 生成地址
   var uri = '/' + code + '.ws?action=' + action;
   var url = MO.Window.Browser.hostPath(uri);
   // 发送数据
   var connection = MO.Console.find(MO.FXmlConsole).sendAsync(url, content);
   return connection;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FServiceConsole_dispose = function FServiceConsole_dispose(){
   var o = this;
   o.__base.FConsole.dispose.call(o);
}
