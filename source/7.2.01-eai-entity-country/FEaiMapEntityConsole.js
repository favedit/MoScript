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
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiMapEntityConsole_loadCountry = function FEaiMapEntityConsole_loadCountry(code){
   var o = this;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiMapEntityConsole_loadWorld = function FEaiMapEntityConsole_loadWorld(context){
   var o = this;
   // 获得资源
   var worldResource = MO.Console.find(MO.FEaiResourceConsole).mapConsole().loadWorld();
   // 创建世界实体
   var worldEntity = o._worldEntity = MO.Class.create(MO.FEaiWorldEntity);
   worldEntity.linkGraphicContext(context);
   worldEntity.setResource(worldResource);
   worldEntity.setup();
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
