//==========================================================
// <T>世界地图数据。</T>
//
// @class
// @author maocy
// @history 150727
//==========================================================
MO.FEaiMapWorldResource = function FEaiMapWorldResource(o){
   o = MO.Class.inherits(this, o, MO.FResourcePackage);
   //..........................................................
   // @attribute
   o._uri        = '{eai.resource}/data/world.dat';
   o._data       = MO.Class.register(o, new MO.AGetter('_data'));
   //..........................................................
   // @method
   o.construct   = MO.FEaiMapWorldResource_construct;
   // @method
   o.unserialize = MO.FEaiMapWorldResource_unserialize;
   o.load        = MO.FEaiMapWorldResource_load;
   // @method
   o.dispose     = MO.FEaiMapWorldResource_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiMapWorldResource_construct = function FEaiMapWorldResource_construct(){
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
MO.FEaiMapWorldResource_unserialize = function FEaiMapWorldResource_unserialize(input){
   this._data.unserialize(input);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiMapWorldResource_dispose = function FEaiMapWorldResource_dispose(){
   var o = this;
   // 释放属性
   o._data = MO.Lang.Object.dispose(o._data);
   // 父处理
   o.__base.FResourcePackage.dispose.call(o);
}
