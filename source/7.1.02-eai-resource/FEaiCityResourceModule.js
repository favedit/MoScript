//==========================================================
// <T>城市资源控制台。</T>
//
// @class
// @author maocy
// @history 150618
//==========================================================
MO.FEaiCityResourceModule = function FEaiCityResourceModule(o){
   o = MO.Class.inherits(this, o, MO.FEaiResourceModule);
   //..........................................................
   // @attribute
   o._resourceConsole = MO.Class.register(o, new MO.AGetSet('_resourceConsole'));
   o._citys           = MO.Class.register(o, new MO.AGetter('_citys'));
   //..........................................................
   // @method
   o.construct        = MO.FEaiCityResourceModule_construct;
   // @method
   o.find             = MO.FEaiCityResourceModule_find;
   o.findByCard       = MO.FEaiCityResourceModule_findByCard;
   o.unserialize      = MO.FEaiCityResourceModule_unserialize;
   // @method
   o.dispose          = MO.FEaiCityResourceModule_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCityResourceModule_construct = function FEaiCityResourceModule_construct(){
   var o = this;
   o.__base.FEaiResourceModule.construct.call(o);
   // 创建属性
   o._citys = new MO.TDictionary();
}

//==========================================================
// <T>根据代码查找城市信息。</T>
//
// @method
// @param code:String 代码
// @return 城市信息
//==========================================================
MO.FEaiCityResourceModule_find = function FEaiCityResourceModule_find(code){
   return this._citys.get(code);
}

//==========================================================
// <T>根据代码查找城市信息。</T>
//
// @method
// @param card:String 代码
// @return 城市信息
//==========================================================
MO.FEaiCityResourceModule_findByCard = function FEaiCityResourceModule_findByCard(card) {
   var o = this;
   var city = null;
   var cityCode = null;
   if(card){
      var cardModule = o._resourceConsole.cardModule();
      var cityCode = cardModule.findCityCode(card);
      if(!cityCode){
         cityCode = cardModule.findCityCode4(card);
      }
      if(!cityCode){
         cityCode = cardModule.findCityCode2(card);
      }
      if(cityCode){
         city = o._citys.get(cityCode);
      }
   }
   return city;
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiCityResourceModule_unserialize = function FEaiCityResourceModule_unserialize(input){
   var o = this;
   var citys = o._citys;
   var cards = o._cards;
   var count = input.readInt32();
   for(var i = 0; i < count; i++){
      var city = MO.Class.create(MO.FEaiCityResource);
      city.unserialize(input);
      citys.set(city.code(), city);
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCityResourceModule_dispose = function FEaiCityResourceModule_dispose(){
   var o = this;
   o._citys = MO.Lang.Object.dispose(o._citys);
   // 父处理
   o.__base.FEaiResourceModule.dispose.call(o);
}
