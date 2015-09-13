//==========================================================
// <T>地图实体控制台。</T>
//
// @class
// @author maocy
// @history 150703
//==========================================================
MO.FEaiMapEntityModule = function FEaiMapEntityModule(o){
   o = MO.Class.inherits(this, o, MO.FEaiEntityModule);
   //..........................................................
   // @attribute
   o._worldEntity      = MO.Class.register(o, new MO.AGetter('_worldEntity'));
   o._countryEntities  = MO.Class.register(o, new MO.AGetter('_countryEntities'));
   o._provinceEntities = MO.Class.register(o, new MO.AGetter('_provinceEntities'));
   o._cityEntities     = MO.Class.register(o, new MO.AGetter('_cityEntities'));
   //..........................................................
   // @method
   o.construct         = MO.FEaiMapEntityModule_construct;
   // @method
   o.loadCountry       = MO.FEaiMapEntityModule_loadCountry;
   o.loadWorld         = MO.FEaiMapEntityModule_loadWorld;
   // @method
   o.dispose           = MO.FEaiMapEntityModule_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiMapEntityModule_construct = function FEaiMapEntityModule_construct(){
   var o = this;
   o.__base.FEaiEntityModule.construct.call(o);
   // 设置属性
   o._countryEntities = new MO.TDictionary();
   o._provinceEntities = new MO.TDictionary();
   o._cityEntities = new MO.TDictionary();
}

//==========================================================
// <T>加载国家实体。</T>
//
// @method
// @param code:String 代码
// @return 国家实体
//==========================================================
MO.FEaiMapEntityModule_loadCountry = function FEaiMapEntityModule_loadCountry(context, code, clazz){
   var o = this;
   // 查找对象
  var entities = o._countryEntities;
   var entity = entities.get(code);
   if(entity){
      return entity;
   }
   // 查找资源
   var resource = MO.Console.find(MO.FEaiResourceConsole).mapModule().loadCountry(code);
   // 创建实体
   entity = MO.Class.create(MO.Runtime.nvl(clazz, MO.FEaiCountryEntity));
   entity.linkGraphicContext(context);
   entity.setResource(resource);
   entity.setup();
   entity.build();
   MO.Console.find(MO.FEntityConsole).loadEntity(entity);
   entities.set(code, entity);
   return entity;
}

//==========================================================
// <T>加载世界实体。</T>
//
// @method
// @return 世界实体
//==========================================================
MO.FEaiMapEntityModule_loadWorld = function FEaiMapEntityModule_loadWorld(context){
   var o = this;
   // 查找对象
   var entity = o._worldEntity;
   if(entity){
      return entity;
   }
   // 查找资源
   var resource = MO.Console.find(MO.FEaiResourceConsole).mapModule().loadWorld();
   // 创建实体
   entity = o._worldEntity = MO.Class.create(MO.FEaiWorldEntity);
   entity.linkGraphicContext(context);
   entity.setResource(resource);
   entity.setup();
   MO.Console.find(MO.FEntityConsole).loadEntity(entity);
   return entity;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiMapEntityModule_dispose = function FEaiMapEntityModule_dispose(){
   var o = this;
   // 释放属性
   o._countryEntities = MO.Lang.Object.dispose(o._countryEntities);
   o._provinceEntities = MO.Lang.Object.dispose(o._provinceEntities);
   o._cityEntities = MO.Lang.Object.dispose(o._cityEntities);
   // 父处理
   o.__base.FEaiEntityModule.dispose.call(o);
}
