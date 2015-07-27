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
   o._world      = MO.Class.register(o, new MO.AGetter('_world'));
   o._countries  = MO.Class.register(o, new MO.AGetter('_countries'));
   //..........................................................
   // @method
   o.construct   = MO.FEaiMapResourceConsole_construct;
   // @method
   o.findByCode  = MO.FEaiMapResourceConsole_findByCode;
   o.findByName  = MO.FEaiMapResourceConsole_findByName;
   o.unserialize = MO.FEaiMapResourceConsole_unserialize;
   // @method
   o.loadCountry = MO.FEaiMapResourceConsole_loadCountry;
   o.loadWorld   = MO.FEaiMapResourceConsole_loadWorld;
   // @method
   o.dispose     = MO.FEaiMapResourceConsole_dispose;
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
// <T>根据代码获得省份资源。</T>
//
// @method
// @param code:String 代码
// @return FEaiProvinceResource 省份资源
//==========================================================
MO.FEaiMapResourceConsole_findByCode = function FEaiMapResourceConsole_findByCode(code){
   return this._countries.get(code);
}

//==========================================================
// <T>根据名称获得省份资源。</T>
//
// @method
// @param name:String 名称
// @return FEaiProvinceResource 省份资源
//==========================================================
MO.FEaiMapResourceConsole_findByName = function FEaiMapResourceConsole_findByName(name){
   return this._world.get(name);
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiMapResourceConsole_unserialize = function FEaiMapResourceConsole_unserialize(input){
   var o = this;
   var provinceCodes = o._countries;
   var provinceNames = o._world;
   var count = input.readInt32();
   for(var i = 0; i < count; i++){
      var province = MO.Class.create(FEaiProvinceResource);
      province.unserialize(input);
      provinceCodes.set(province.code(), province);
      provinceNames.set(province.name(), province);
   }
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
      country = MO.Class.create(MO.FEaiMapCountryResource);
      country.setCode(code);
      country.load();
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
   o._countries = MO.Lang.Object.dispose(o._countries);
   // 父处理
   o.__base.FConsole.dispose.call(o);
}
