//==========================================================
// <T>卡片资源控制台。</T>
//
// @class
// @author maocy
// @history 150706
//==========================================================
MO.FEaiCardResourceModule = function FEaiCardResourceModule(o){
   o = MO.Class.inherits(this, o, MO.FEaiResourceModule);
   //..........................................................
   // @attribute
   o._cards        = MO.Class.register(o, new MO.AGetter('_cards'));
   //..........................................................
   // @method
   o.construct     = MO.FEaiCardResourceModule_construct;
   // @method
   o.find          = MO.FEaiCardResourceModule_find;
   o.findCityCode  = MO.FEaiCardResourceModule_findCityCode;
   o.findCityCode2 = MO.FEaiCardResourceModule_findCityCode2;
   o.findCityCode4 = MO.FEaiCardResourceModule_findCityCode4;
   o.unserialize   = MO.FEaiCardResourceModule_unserialize;
   // @method
   o.dispose       = MO.FEaiCardResourceModule_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCardResourceModule_construct = function FEaiCardResourceModule_construct(){
   var o = this;
   o.__base.FEaiResourceModule.construct.call(o);
   // 创建属性
   o._cards = new MO.TDictionary();
}

//==========================================================
// <T>根据卡片代码查找卡片信息。</T>
//
// @method
// @param code:String 卡片代码
// @return 卡片信息
//==========================================================
MO.FEaiCardResourceModule_find = function FEaiCardResourceModule_find(code){
   return this._cards.get(code);
}

//==========================================================
// <T>根据卡片代码查找城市代码。</T>
//
// @method
// @param code:String 代码
// @return 城市代码
//==========================================================
MO.FEaiCardResourceModule_findCityCode = function FEaiCardResourceModule_findCityCode(code){
   var cityCode = null;
   var card = this._cards.get(code);
   if(card){
      cityCode = card.cityCode();
   }
   return cityCode;
}

//==========================================================
// <T>根据卡片代码查找城市代码。</T>
//
// @method
// @param code:String 代码
// @return 城市代码
//==========================================================
MO.FEaiCardResourceModule_findCityCode2 = function FEaiCardResourceModule_findCityCode2(code){
   var o = this;
   var find = code.substring(0, 2);
   if(find.length != 2){
      return;
   }
   var cards = o._cards;
   var count = cards.count();
   for(var i = 0; i < count; i++){
      var card = cards.value(i);
      var cardCode = card.code();
      if(cardCode.indexOf(find) == 0){
         return card.cityCode();
      }
   }
   return null;
}

//==========================================================
// <T>根据卡片代码查找城市代码。</T>
//
// @method
// @param code:String 代码
// @return 城市代码
//==========================================================
MO.FEaiCardResourceModule_findCityCode4 = function FEaiCardResourceModule_findCityCode4(code){
   var o = this;
   var find = code.substring(0, 4);
   if(find.length != 4){
      return;
   }
   var cards = o._cards;
   var count = cards.count();
   for(var i = 0; i < count; i++){
      var card = cards.value(i);
      var cardCode = card.code();
      if(cardCode.indexOf(find) == 0){
         return card.cityCode();
      }
   }
   return null;
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiCardResourceModule_unserialize = function FEaiCardResourceModule_unserialize(input){
   var o = this;
   var cards = o._cards;
   var count = input.readInt32();
   for(var i = 0; i < count; i++){
      var card = MO.Class.create(MO.FEaiCardResource);
      card.unserialize(input);
      cards.set(card.code(), card);
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCardResourceModule_dispose = function FEaiCardResourceModule_dispose(){
   var o = this;
   o._cards = MO.Lang.Object.dispose(o._cards);
   // 父处理
   o.__base.FEaiResourceModule.dispose.call(o);
}
