//==========================================================
// <T>实体控制台。</T>
//
// @class
// @author maocy
// @history 150703
//==========================================================
MO.FEaiEntityConsole = function FEaiEntityConsole(o){
   o = MO.RClass.inherits(this, o, MO.FConsole);
   //..........................................................
   // @attribute
   o._scopeCd         = MO.EScope.Local;
   // @attribute
   o._cityConsole     = MO.Class.register(o, new MO.AGetter('_cityConsole'));
   o._provinceConsole = MO.Class.register(o, new MO.AGetter('_provinceConsole'));
   //..........................................................
   // @method
   o.construct        = MO.FEaiEntityConsole_construct;
   // @method
   o.dispose          = MO.FEaiEntityConsole_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiEntityConsole_construct = function FEaiEntityConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   // 设置变量
   o._cityConsole = MO.RClass.create(MO.FEaiCityEntityConsole);
   o._provinceConsole = MO.RClass.create(MO.FEaiProvinceEntityConsole);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiEntityConsole_dispose = function FEaiEntityConsole_dispose(){
   var o = this;
   o._cityConsole = RObject.dispose(o._cityConsole);
   o._provinceConsole = RObject.dispose(o._provinceConsole);
   // 父处理
   o.__base.FConsole.dispose.call(o);
}
