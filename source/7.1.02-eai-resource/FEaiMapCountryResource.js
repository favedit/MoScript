//==========================================================
// <T>世界地图数据。</T>
//
// @class
// @author maocy
// @history 150727
//==========================================================
MO.FEaiMapCountryResource = function FEaiMapCountryResource(o){
   o = MO.Class.inherits(this, o, MO.FResourcePackage);
   //..........................................................
   // @attribute
   o._uri        = '{eai.resource}/data/country.dat';
   o._data       = MO.Class.register(o, new MO.AGetter('_data'));
   //..........................................................
   // @method
   o.construct   = MO.FEaiMapCountryResource_construct;
   // @method
   o.unserialize = MO.FEaiMapCountryResource_unserialize;
   o.load        = MO.FEaiMapCountryResource_load;
   // @method
   o.dispose     = MO.FEaiMapCountryResource_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiMapCountryResource_construct = function FEaiMapCountryResource_construct(){
   var o = this;
   o.__base.FResourcePackage.construct.call(o);
   // 配置属性
   o._data = MO.Class.create(MO.FEaiMapWorldData);
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiMapCountryResource_unserialize = function FEaiMapCountryResource_unserialize(input){
   this._data.unserialize(input);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiMapCountryResource_dispose = function FEaiMapCountryResource_dispose(){
   var o = this;
   // 释放属性
   o._data = MO.Lang.Object.dispose(o._data);
   // 父处理
   o.__base.FResourcePackage.dispose.call(o);
}
