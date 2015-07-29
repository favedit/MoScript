//==========================================================
// <T>城市实体控制台。</T>
//
// @class
// @author maocy
// @history 150703
//==========================================================
MO.FEaiCityEntityModule = function FEaiCityEntityModule(o){
   o = MO.Class.inherits(this, o, MO.FEaiEntityModule);
   //..........................................................
   // @attribute
   o._citys     = MO.Class.register(o, new MO.AGetter('_citys'));
   //..........................................................
   // @method
   o.construct     = MO.FEaiCityEntityModule_construct;
   // @method
   o.findByCode    = MO.FEaiCityEntityModule_findByCode;
   o.findByCard    = MO.FEaiCityEntityModule_findByCard;
   o.push          = MO.FEaiCityEntityModule_push;
   o.build         = MO.FEaiCityEntityModule_build;
   o.linkProvinces = MO.FEaiCityEntityModule_linkProvinces;
   // @method
   o.dispose       = MO.FEaiCityEntityModule_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
// @param owner:Object 拥有者
// @param callback:Function 回调函数
//==========================================================
MO.FEaiCityEntityModule_construct = function FEaiCityEntityModule_construct(){
   var o = this;
   o.__base.FEaiEntityModule.construct.call(o);
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
MO.FEaiCityEntityModule_findByCode = function FEaiCityEntityModule_findByCode(code){
   return this._citys.get(code);
}

//==========================================================
// <T>根据身份号码查找城市实体。</T>
//
// @method
// @param card:String 代码
// @return FEaiCityEntity 城市实体
//==========================================================
MO.FEaiCityEntityModule_findByCard = function FEaiCityEntityModule_findByCard(card){
   var o = this;
   var cardModule = MO.Console.find(MO.FEaiResourceConsole).cardModule();
   var cityCode = cardModule.findCityCode(card);
   return o._citys.get(cityCode);
}

//==========================================================
// <T>增加一个城市实体。</T>
//
// @method
// @param entity:FEaiCityEntity 城市实体
//==========================================================
MO.FEaiCityEntityModule_push = function FEaiCityEntityModule_push(entity){
   var code = entity.data().code();
   MO.Assert.debugNotEmpty(code);
   this._citys.set(code, entity);
}

//==========================================================
// <T>建立城市实体。</T>
//
// @method
// @param entity:FEaiCityEntity 城市实体
//==========================================================
MO.FEaiCityEntityModule_build = function FEaiCityEntityModule_build(context){
   var o = this;
   // 创建城市实体
   var citys = MO.Console.find(MO.FEaiResourceConsole).cityModule().citys();
   var cityEntities = o._citys;
   var cityCount = citys.count();
   for(var i = 0; i < cityCount; i++){
      // 获得城市
      var city = citys.at(i);
      var code = city.code();
      var level = city.level();
      var cityLocation = city.location();
      // 创建实体
      var cityEntity = MO.Class.create(MO.FEaiCityEntity);
      cityEntity.setData(city);
      cityEntity.build(o);
      cityEntities.set(code, cityEntity);
   }
}

//==========================================================
// <T>建立城市实体。</T>
//
// @method
// @param entity:FEaiCityEntity 城市实体
//==========================================================
MO.FEaiCityEntityModule_linkProvinces = function FEaiCityEntityModule_linkProvinces(){
   var o = this;
   var provinceModule = MO.Console.find(MO.FEaiEntityConsole).provinceModule();
   // 创建城市实体
   var cityEntities = o._citys;
   var cityCount = cityEntities.count();
   for(var i = 0; i < cityCount; i++){
      var cityEntity = cityEntities.at(i);
      var provinceCode = cityEntity.data().provinceCode();
      var provinceEntity = provinceModule.findByCode(provinceCode);
      //MO.Assert.debugNotNull(provinceEntity);
      cityEntity.setProvinceEntity(provinceEntity);
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCityEntityModule_dispose = function FEaiCityEntityModule_dispose(monitor){
   var o = this;
   o._citys = MO.Lang.Object.dispose(o._citys);
   // 父处理
   o.__base.FEaiEntityModule.dispose.call(o);
}
