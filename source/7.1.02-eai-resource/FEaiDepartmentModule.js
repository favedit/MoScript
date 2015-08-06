//==========================================================
// <T>城市资源控制台。</T>
//
// @class
// @author maocy
// @history 150618
//==========================================================
MO.FEaiDepartmentModule = function FEaiDepartmentModule(o){
   o = MO.Class.inherits(this, o, MO.FEaiResourceModule);
   //..........................................................
   // @attribute
   o._departments     = MO.Class.register(o, new MO.AGetter('_departments'));
   //..........................................................
   // @method
   o.construct        = MO.FEaiDepartmentModule_construct;
   // @method
   o.find             = MO.FEaiDepartmentModule_find;
   o.findByFullLabel  = MO.FEaiDepartmentModule_findByFullLabel;
   o.unserialize      = MO.FEaiDepartmentModule_unserialize;
   // @method
   o.dispose          = MO.FEaiDepartmentModule_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiDepartmentModule_construct = function FEaiDepartmentModule_construct(){
   var o = this;
   o.__base.FEaiResourceModule.construct.call(o);
   // 创建属性
   o._departments = new MO.TDictionary();
}

//==========================================================
// <T>根据代码查找城市信息。</T>
//
// @method
// @param code:String 代码
// @return 城市信息
//==========================================================
MO.FEaiDepartmentModule_find = function FEaiDepartmentModule_find(code){
   return this._departments.get(code);
}

//==========================================================
// <T>根据代码查找城市信息。</T>
//
// @method
// @param card:String 代码
// @return 城市信息
//==========================================================
MO.FEaiDepartmentModule_findByFullLabel = function FEaiDepartmentModule_findByFullLabel(fullLabel) {
   var o = this;
   var city = null;
   var cardModule = o._resourceConsole.cardModule();
   var cityCode = cardModule.findCityCode(card);
   if(cityCode){
      city = o._departments.get(cityCode);
   }
   return city;
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiDepartmentModule_unserialize = function FEaiDepartmentModule_unserialize(input){
   var o = this;
   var citys = o._departments;
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
MO.FEaiDepartmentModule_dispose = function FEaiDepartmentModule_dispose(){
   var o = this;
   o._departments = MO.Lang.Object.dispose(o._departments);
   // 父处理
   o.__base.FEaiResourceModule.dispose.call(o);
}
