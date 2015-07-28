//==========================================================
// <T>省份资源控制台。</T>
//
// @class
// @author maocy
// @history 150618
//==========================================================
MO.FEaiProvinceResourceModule = function FEaiProvinceResourceModule(o){
   o = MO.Class.inherits(this, o, MO.FEaiResourceModule);
   //..........................................................
   // @attribute
   o._provinceCodes = MO.Class.register(o, new MO.AGetter('_provinceCodes'));
   o._provinceNames = MO.Class.register(o, new MO.AGetter('_provinceNames'));
   //..........................................................
   // @method
   o.construct      = MO.FEaiProvinceResourceModule_construct;
   // @method
   o.findByCode     = MO.FEaiProvinceResourceModule_findByCode;
   o.findByName     = MO.FEaiProvinceResourceModule_findByName;
   o.unserialize    = MO.FEaiProvinceResourceModule_unserialize;
   // @method
   o.dispose        = MO.FEaiProvinceResourceModule_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiProvinceResourceModule_construct = function FEaiProvinceResourceModule_construct(){
   var o = this;
   o.__base.FEaiResourceModule.construct.call(o);
   // 创建属性
   o._provinceCodes = new MO.TDictionary();
   o._provinceNames = new MO.TDictionary();
}

//==========================================================
// <T>根据代码获得省份资源。</T>
//
// @method
// @param code:String 代码
// @return FEaiProvinceResource 省份资源
//==========================================================
MO.FEaiProvinceResourceModule_findByCode = function FEaiProvinceResourceModule_findByCode(code){
   return this._provinceCodes.get(code);
}

//==========================================================
// <T>根据名称获得省份资源。</T>
//
// @method
// @param name:String 名称
// @return FEaiProvinceResource 省份资源
//==========================================================
MO.FEaiProvinceResourceModule_findByName = function FEaiProvinceResourceModule_findByName(name){
   return this._provinceNames.get(name);
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiProvinceResourceModule_unserialize = function FEaiProvinceResourceModule_unserialize(input){
   var o = this;
   var provinceCodes = o._provinceCodes;
   var provinceNames = o._provinceNames;
   var count = input.readInt32();
   for(var i = 0; i < count; i++){
      var province = MO.Class.create(MO.FEaiProvinceResource);
      province.unserialize(input);
      provinceCodes.set(province.code(), province);
      provinceNames.set(province.name(), province);
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiProvinceResourceModule_dispose = function FEaiProvinceResourceModule_dispose(){
   var o = this;
   o._provinceCodes = MO.Lang.Object.dispose(o._provinceCodes);
   o._provinceNames = MO.Lang.Object.dispose(o._provinceNames);
   // 父处理
   o.__base.FEaiResourceModule.dispose.call(o);
}
