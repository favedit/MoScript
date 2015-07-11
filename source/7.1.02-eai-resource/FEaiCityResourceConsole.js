//==========================================================
// <T>城市资源控制台。</T>
//
// @class
// @author maocy
// @history 150618
//==========================================================
MO.FEaiCityResourceConsole = function FEaiCityResourceConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   //..........................................................
   // @attribute
   o._resourceConsole = MO.Class.register(o, new MO.AGetSet('_resourceConsole'));
   o._citys           = MO.Class.register(o, new MO.AGetter('_citys'));
   //..........................................................
   // @method
   o.construct        = MO.FEaiCityResourceConsole_construct;
   // @method
   o.find             = MO.FEaiCityResourceConsole_find;
   o.findByCard       = MO.FEaiCityResourceConsole_findByCard;
   o.unserialize      = MO.FEaiCityResourceConsole_unserialize;
   // @method
   o.dispose          = MO.FEaiCityResourceConsole_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCityResourceConsole_construct = function FEaiCityResourceConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
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
MO.FEaiCityResourceConsole_find = function FEaiCityResourceConsole_find(code){
   return this._citys.get(code);
}

//==========================================================
// <T>根据代码查找城市信息。</T>
//
// @method
// @param card:String 代码
// @return 城市信息
//==========================================================
MO.FEaiCityResourceConsole_findByCard = function FEaiCityResourceConsole_findByCard(card) {
   var o = this;
   var city = null;
   var cardConsole = o._resourceConsole.cardConsole();
   var cityCode = cardConsole.findCityCode(card);
   if(cityCode){
      city = o._citys.get(cityCode);
   }
   return city;
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiCityResourceConsole_unserialize = function FEaiCityResourceConsole_unserialize(input){
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
MO.FEaiCityResourceConsole_dispose = function FEaiCityResourceConsole_dispose(){
   var o = this;
   o._citys = MO.Lang.Object.dispose(o._citys);
   // 父处理
   o.__base.FConsole.dispose.call(o);
}
