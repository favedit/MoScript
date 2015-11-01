//==========================================================
// <T>地图资源控制台。</T>
//
// @class
// @author maocy
// @history 150727
//==========================================================
MO.FEaiMapResourceModule = function FEaiMapResourceModule(o){
   o = MO.Class.inherits(this, o, MO.FEaiResourceModule);
   //..........................................................
   // @attribute
   o._world            = MO.Class.register(o, new MO.AGetter('_world'));
   o._countries        = MO.Class.register(o, new MO.AGetter('_countries'));
   //..........................................................
   // @method
   o.construct         = MO.FEaiMapResourceModule_construct;
   // @method
   o.findCountryByCode = MO.FEaiMapResourceModule_findCountryByCode;
   // @method
   o.loadCountry       = MO.FEaiMapResourceModule_loadCountry;
   o.loadWorld         = MO.FEaiMapResourceModule_loadWorld;
   // @method
   o.dispose           = MO.FEaiMapResourceModule_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiMapResourceModule_construct = function FEaiMapResourceModule_construct(){
   var o = this;
   o.__base.FEaiResourceModule.construct.call(o);
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
MO.FEaiMapResourceModule_findCountryByCode = function FEaiMapResourceModule_findCountryByCode(code){
   return this._countries.get(code);
}

//==========================================================
// <T>加载国家数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiMapResourceModule_loadCountry = function FEaiMapResourceModule_loadCountry(code){
   var o = this;
   var countries = o._countries;
   MO.Assert.debugNull(countries.get(name));
   // 创建国家资源
   var country = MO.Class.create(MO.FEaiMapCountryResource);
   country.setCode(code);
   country.setUri('{eai.resource}-{device.type}/map/country/' + code + '.dat');
   country.load();
   // 存储列表
   countries.set(code, country);
   return country;
}

//==========================================================
// <T>加载全球数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiMapResourceModule_loadWorld = function FEaiMapResourceModule_loadWorld(){
   var o = this;
   MO.Assert.debugNull(o._world);
   // 创建世界资源
   var world = o._world = MO.Class.create(MO.FEaiMapWorldResource);
   world.load();
   return world;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiMapResourceModule_dispose = function FEaiMapResourceModule_dispose(){
   var o = this;
   // 释放属性
   o._world = MO.Lang.Object.dispose(o._world);
   o._countries = MO.Lang.Object.dispose(o._countries, true);
   // 父处理
   o.__base.FEaiResourceModule.dispose.call(o);
}
