//==========================================================
// <T>省份实体控制台。</T>
//
// @class
// @author maocy
// @history 150728
//==========================================================
MO.FEaiProvinceEntityModule = function FEaiProvinceEntityModule(o){
   o = MO.RClass.inherits(this, o, MO.FEaiEntityModule);
   //..........................................................
   // @attribute
   o._provinces     = MO.Class.register(o, new MO.AGetter('_provinces'));
   //..........................................................
   // @method
   o.construct  = MO.FEaiProvinceEntityModule_construct;
   // @method
   o.findByCode = MO.FEaiProvinceEntityModule_findByCode;
   o.push       = MO.FEaiProvinceEntityModule_push;
   // @method
   o.dispose    = MO.FEaiProvinceEntityModule_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiProvinceEntityModule_construct = function FEaiProvinceEntityModule_construct(){
   var o = this;
   o.__base.FEaiEntityModule.construct.call(o);
   // 设置属性
   o._provinces = MO.TDictionary();
}

//==========================================================
// <T>根据代码查找省份实体。</T>
//
// @method
// @param code:String 代码
// @return FEaiProvinceEntity 省份实体
//==========================================================
MO.FEaiProvinceEntityModule_findByCode = function FEaiProvinceEntityModule_findByCode(code){
   return this._provinces.get(code);
}

//==========================================================
// <T>增加一个省份实体。</T>
//
// @method
// @param entity:FEaiProvinceEntity 省份实体
//==========================================================
MO.FEaiProvinceEntityModule_push = function FEaiProvinceEntityModule_push(entity){
   var code = entity.data().code();
   this._provinces.set(code, entity);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiProvinceEntityModule_dispose = function FEaiProvinceEntityModule_dispose(monitor){
   var o = this;
   o._provinces = MO.Lang.Object.dispose(o._provinces);
   // 父处理
   o.__base.FEaiEntityModule.dispose.call(o);
}
