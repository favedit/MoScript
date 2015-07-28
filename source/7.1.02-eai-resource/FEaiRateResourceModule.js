//==========================================================
// <T>省份资源控制台。</T>
//
// @class
// @author maocy
// @history 150618
//==========================================================
MO.FEaiRateResourceModule = function FEaiRateResourceModule(o){
   o = MO.Class.inherits(this, o, MO.FEaiResourceModule);
   //..........................................................
   // @attribute
   o._rates      = MO.Class.register(o, new MO.AGetter('_rates'));
   //..........................................................
   // @method
   o.construct   = MO.FEaiRateResourceModule_construct;
   // @method
   o.find        = MO.FEaiRateResourceModule_find;
   o.unserialize = MO.FEaiRateResourceModule_unserialize;
   // @method
   o.dispose     = MO.FEaiRateResourceModule_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiRateResourceModule_construct = function FEaiRateResourceModule_construct(){
   var o = this;
   o.__base.FEaiResourceModule.construct.call(o);
   // 创建属性
   o._rates = new MO.TObjects();
}

//==========================================================
// <T>根据代码获得省份资源。</T>
//
// @method
// @param code:String 代码
// @return FEaiProvinceResource 省份资源
//==========================================================
MO.FEaiRateResourceModule_find = function FEaiRateResourceModule_find(code){
   return this._rates.get(code);
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiRateResourceModule_unserialize = function FEaiRateResourceModule_unserialize(input){
   var o = this;
   var count = o._count = input.readInt32();
   for(var i = 0; i < count; i++){
      var rate = MO.Class.create(MO.FEaiRateResource);
      rate.unserialize(input)
      o._rates.push(rate);
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiRateResourceModule_dispose = function FEaiRateResourceModule_dispose(){
   var o = this;
   o._rates = MO.Lang.Object.dispose(o._rates);
   // 父处理
   o.__base.FEaiResourceModule.dispose.call(o);
}
