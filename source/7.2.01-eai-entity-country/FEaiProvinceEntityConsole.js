//==========================================================
// <T>省份实体控制台。</T>
//
// @class
// @author maocy
// @history 150703
//==========================================================
MO.FEaiProvinceEntityConsole = function FEaiProvinceEntityConsole(o){
   o = MO.RClass.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute
   o._provinces     = MO.Class.register(o, new MO.AGetter('_provinces'));
   //..........................................................
   // @method
   o.construct  = MO.FEaiProvinceEntityConsole_construct;
   // @method
   o.findByCode = MO.FEaiProvinceEntityConsole_findByCode;
   o.push       = MO.FEaiProvinceEntityConsole_push;
   // @method
   o.dispose    = MO.FEaiProvinceEntityConsole_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiProvinceEntityConsole_construct = function FEaiProvinceEntityConsole_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
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
MO.FEaiProvinceEntityConsole_findByCode = function FEaiProvinceEntityConsole_findByCode(code){
   return this._provinces.get(code);
}

//==========================================================
// <T>增加一个省份实体。</T>
//
// @method
// @param entity:FEaiProvinceEntity 省份实体
//==========================================================
MO.FEaiProvinceEntityConsole_push = function FEaiProvinceEntityConsole_push(entity){
   var code = entity.data().code();
   this._provinces.set(code, entity);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiProvinceEntityConsole_dispose = function FEaiProvinceEntityConsole_dispose(monitor){
   var o = this;
   o._provinces = RObject.dispose(o._provinces);
   // 父处理
   o.__base.FObject.dispose.call(o);
}
