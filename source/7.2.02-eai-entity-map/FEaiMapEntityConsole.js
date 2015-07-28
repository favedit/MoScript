//==========================================================
// <T>地图实体控制台。</T>
//
// @class
// @author maocy
// @history 150703
//==========================================================
MO.FEaiMapEntityConsole = function FEaiMapEntityConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole, MO.MListener, MO.MGraphicObject);
   //..........................................................
   // @attribute
   o._worldEntity     = MO.Class.register(o, new MO.AGetter('_worldEntity'));
   o._countryEntities = MO.Class.register(o, new MO.AGetter('_countryEntities'));
   //..........................................................
   // @method
   o.construct        = MO.FEaiMapEntityConsole_construct;
   // @method
   o.loadCountry      = MO.FEaiMapEntityConsole_loadCountry;
   o.loadWorld        = MO.FEaiMapEntityConsole_loadWorld;
   // @method
   o.dispose          = MO.FEaiMapEntityConsole_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiMapEntityConsole_construct = function FEaiMapEntityConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   // 设置属性
   o._countryEntities = new MO.TDictionary();
}

//==========================================================
// <T>加载国家实体。</T>
//
// @method
// @param code:String 代码
// @return 国家实体
//==========================================================
MO.FEaiMapEntityConsole_loadCountry = function FEaiMapEntityConsole_loadCountry(context, code){
   var o = this;
   // 查找对象
  var entities = o._countryEntities;
   var entity = entities.find(code);
   if(entity){
      return entity;
   }
   // 查找资源
   var resource = MO.Console.find(MO.FEaiResourceConsole).mapConsole().loadCountry(code);
   // 创建实体
   entity = MO.Class.create(MO.FEaiCountryEntity);
   entity.linkGraphicContext(context);
   entity.setResource(resource);
   entity.setup();
   MO.Console.find(MO.FEaiEntityConsole).loadEntity(entity);
   entities.set(code, entity);
   return entity;
}

//==========================================================
// <T>加载世界实体。</T>
//
// @method
// @return 世界实体
//==========================================================
MO.FEaiMapEntityConsole_loadWorld = function FEaiMapEntityConsole_loadWorld(context){
   var o = this;
   // 查找对象
   var entity = o._worldEntity;
   if(entity){
      return entity;
   }
   // 查找资源
   var resource = MO.Console.find(MO.FEaiResourceConsole).mapConsole().loadWorld();
   // 创建实体
   entity = o._worldEntity = MO.Class.create(MO.FEaiWorldEntity);
   entity.linkGraphicContext(context);
   entity.setResource(resource);
   entity.setup();
   MO.Console.find(MO.FEaiEntityConsole).loadEntity(entity);
   return entity;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiMapEntityConsole_dispose = function FEaiMapEntityConsole_dispose(){
   var o = this;
   // 释放属性
   o._countryEntities = MO.Lang.Object.dispose(o._countryEntities);
   // 父处理
   o.__base.FConsole.dispose.call(o);
}
