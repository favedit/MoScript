//==========================================================
// <T>资源打包。</T>
//
// @class
// @author maocy
// @version 150727
//==========================================================
MO.FResourcePackage = function FResourcePackage(o){
   o = MO.Class.inherits(this, o, MO.FResource);
   //..........................................................
   // @attribute
   o._uri         = MO.Class.register(o, new MO.AGetSet('_uri'));
   o._url         = MO.Class.register(o, new MO.AGetSet('_url'));
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
   var view = MO.Class.create(MO.FDataView);
   view.setEndianCd(true);
   view.link(event.content);
   o.unserialize(view);
   view.dispose();
   // 设置标志
   o._statusReady = true;
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
   // 获得地址
   var url = o._url;
   if(!url){
      url = o._url = MO.Console.find(MO.FEnvironmentConsole).parse(o._uri);
   }
   // 加载数据
   var connection = MO.Console.find(MO.FHttpConsole).sendAsync(url);
   connection.addLoadListener(o, o.onLoad);
   return connection;
}
