//==========================================================
// <T>资源打包。</T>
//
// @class
// @author maocy
// @version 150727
//==========================================================
MO.FResourcePackage = function FResourcePackage(o){
   o = MO.Class.inherits(this, o, MO.FResource, MO.MPersistenceAble);
   //..........................................................
   // @attribute
   o._uri         = MO.Class.register(o, new MO.AGetSet('_uri'));
   o._url         = MO.Class.register(o, new MO.AGetter('_url'));
   // @attribute
   o._statusReady = false;
   //..........................................................
   // @event
   o.onLoad       = MO.FResourcePackage_onLoad;
   //..........................................................
   // @method
   o.testReady    = MO.FResourcePackage_testReady;
   o.unserialize  = MO.Method.empty;
   o.load         = MO.FResourcePackage_load;
   return o;
}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FResourcePackage_onLoad = function FResourcePackage_onLoad(event){
   var o = this;
   // 反序列化数据
   o.unserializeBuffer(event.content, true);
   // 设置标志
   o._statusReady = true;
   MO.Logger.debug(o, 'Load resource package success. (url={1})', o._url);
}

//==========================================================
// <T>测试是否准备好。</T>
//
// @method
// @return Boolean 是否准备好
//==========================================================
MO.FResourcePackage_testReady = function FResourcePackage_testReady(){
   return this._statusReady;
}

//==========================================================
// <T>加载处理。</T>
//
// @method
//==========================================================
MO.FResourcePackage_load = function FResourcePackage_load(){
   var o = this;
   MO.Assert.debugFalse(o._statusReady);
   // 获得地址
   var url = o._url = MO.Console.find(MO.FEnvironmentConsole).parseUrl(o._uri);
   // 加载数据
   var connection = MO.Console.find(MO.FHttpConsole).sendAsync(url);
   connection.addLoadListener(o, o.onLoad);
   return connection;
}
