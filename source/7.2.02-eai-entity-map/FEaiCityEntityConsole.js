//==========================================================
// <T>城市实体控制台。</T>
//
// @class
// @author maocy
// @history 150703
//==========================================================
MO.FEaiCityEntityConsole = function FEaiCityEntityConsole(o){
   o = MO.RClass.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute
   o._citys     = MO.Class.register(o, new MO.AGetter('_citys'));
   //..........................................................
   // @method
   o.construct  = MO.FEaiCityEntityConsole_construct;
   // @method
   o.findByCode = MO.FEaiCityEntityConsole_findByCode;
   o.findByCard = MO.FEaiCityEntityConsole_findByCard;
   o.push       = MO.FEaiCityEntityConsole_push;
   // @method
   o.dispose    = MO.FEaiCityEntityConsole_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
// @param owner:Object 拥有者
// @param callback:Function 回调函数
//==========================================================
MO.FEaiCityEntityConsole_construct = function FEaiCityEntityConsole_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   // 设置属性
   o._citys = new MO.TDictionary();
}

//==========================================================
// <T>根据代码查找城市实体。</T>
//
// @method
// @param code:String 代码
// @return FEaiCityEntity 城市实体
//==========================================================
MO.FEaiCityEntityConsole_findByCode = function FEaiCityEntityConsole_findByCode(code){
   return this._citys.get(code);
}

//==========================================================
// <T>根据身份号码查找城市实体。</T>
//
// @method
// @param card:String 代码
// @return FEaiCityEntity 城市实体
//==========================================================
MO.FEaiCityEntityConsole_findByCard = function FEaiCityEntityConsole_findByCard(card){
   var o = this;
   // 检查参数
   if (card.length != 4) {
      return null;
   }
   // 查找4位
   var cityEntities = o._citys;
   var cityEntity = cityEntities.get(card);
   if (cityEntity) {
      return cityEntity;
   }
   // 查找2位
   var cityEntities = o._citys;
   var cityEntity = cityEntities.get(card.substring(0, 2));
   if (cityEntity) {
      return cityEntity;
   }
   return null;
}

//==========================================================
// <T>增加一个城市实体。</T>
//
// @method
// @param entity:FEaiCityEntity 城市实体
//==========================================================
MO.FEaiCityEntityConsole_push = function FEaiCityEntityConsole_push(entity){
   this._citys.set(entity.data().code(), entity);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCityEntityConsole_dispose = function FEaiCityEntityConsole_dispose(monitor){
   var o = this;
   o._citys = RObject.dispose(o._citys);
   // 父处理
   o.__base.FObject.dispose.call(o);
}
