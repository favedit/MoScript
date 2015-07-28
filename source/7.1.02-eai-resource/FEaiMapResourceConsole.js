//==========================================================
// <T>地图资源控制台。</T>
//
// @class
// @author maocy
// @history 150727
//==========================================================
MO.FEaiMapResourceConsole = function FEaiMapResourceConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   //..........................................................
   // @attribute
   o._world            = MO.Class.register(o, new MO.AGetter('_world'));
   o._countries        = MO.Class.register(o, new MO.AGetter('_countries'));
   //..........................................................
   // @method
   o.construct         = MO.FEaiMapResourceConsole_construct;
   // @method
   o.findCountryByCode = MO.FEaiMapResourceConsole_findCountryByCode;
   // @method
   o.loadCountry       = MO.FEaiMapResourceConsole_loadCountry;
   o.loadWorld         = MO.FEaiMapResourceConsole_loadWorld;
   // @method
   o.dispose           = MO.FEaiMapResourceConsole_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiMapResourceConsole_construct = function FEaiMapResourceConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   // 创建属性
   o._countries = new MO.TDictionary();
}

//==========================================================
// <T>根据代码获得国家资源。</T>
//
// @method
// @param code:String 代码
// @return FEaiMapCountryResource 国家资源
//==========================================================
MO.FEaiMapResourceConsole_findCountryByCode = function FEaiMapResourceConsole_findCountryByCode(code){
   return this._countries.get(code);
}

//==========================================================
// <T>加载国家数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiMapResourceConsole_loadCountry = function FEaiMapResourceConsole_loadCountry(code){
   var o = this;
   var countries = o._countries;
   var country = countries.get(name);
   if(!country){
      // 创建国家资源
      country = MO.Class.create(MO.FEaiMapCountryResource);
      country.setCode(code);
      country.setUri('{eai.resource}/data/country/' + code + '.dat');
      country.load();
      // 存储列表
      countries.set(code, country);
   }
   return country;
}

//==========================================================
// <T>加载全球数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiMapResourceConsole_loadWorld = function FEaiMapResourceConsole_loadWorld(){
   var o = this;
   var world = o._world;
   if(!world){
      // 创建世界资源
      world = o._world = MO.Class.create(MO.FEaiMapWorldResource);
      world.load();
   }
   return world;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiMapResourceConsole_dispose = function FEaiMapResourceConsole_dispose(){
   var o = this;
   // 释放属性
   o._world = MO.Lang.Object.dispose(o._world);
   o._countries = MO.Lang.Object.dispose(o._countries, true);
   // 父处理
   o.__base.FConsole.dispose.call(o);
}
