//==========================================================
// <T>国家实体控制台。</T>
//
// @class
// @author maocy
// @history 150728
//==========================================================
MO.FEaiCountryEntityModule = function FEaiCountryEntityModule(o){
   o = MO.Class.inherits(this, o, MO.FEaiEntityModule);
   //..........................................................
   // @attribute
   o._countries  = MO.Class.register(o, new MO.AGetter('_countries'));
   //..........................................................
   // @method
   o.construct   = MO.FEaiCountryEntityModule_construct;
   // @method
   o.findByCode  = MO.FEaiCountryEntityModule_findByCode;
   o.push        = MO.FEaiCountryEntityModule_push;
   o.load        = MO.FEaiCountryEntityModule_load;
   // @method
   o.dispose     = MO.FEaiCountryEntityModule_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCountryEntityModule_construct = function FEaiCountryEntityModule_construct(){
   var o = this;
   o.__base.FEaiEntityModule.construct.call(o);
   // 设置属性
   o._countries = new MO.TDictionary();
}

//==========================================================
// <T>根据代码查找实体。</T>
//
// @method
// @param code:String 代码
// @return 实体
//==========================================================
MO.FEaiCountryEntityModule_findByCode = function FEaiCountryEntityModule_findByCode(code){
   return this._countries.get(code);
}

//==========================================================
// <T>增加一个实体。</T>
//
// @method
// @param country:FEaiCountryEntity 实体
// @return 实体
//==========================================================
MO.FEaiCountryEntityModule_push = function FEaiCountryEntityModule_push(country){
   var code = country.code();
   this._countries.set(code, country);
}

//==========================================================
// <T>加载实体。</T>
//
// @method
// @param context:FGraphicContext 环境
// @param code:String 代码
// @return 实体
//==========================================================
MO.FEaiCountryEntityModule_load = function FEaiCountryEntityModule_load(context, code){
   var o = this;
   // 查找对象
   var entities = o._countries;
   var entity = entities.get(code);
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
   MO.Console.find(MO.FEntityConsole).loadEntity(entity);
   entities.set(code, entity);
   return entity;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCountryEntityModule_dispose = function FEaiCountryEntityModule_dispose(){
   var o = this;
   // 释放属性
   o._countries = MO.Lang.Object.dispose(o._countries);
   // 父处理
   o.__base.FEaiEntityModule.dispose.call(o);
}
