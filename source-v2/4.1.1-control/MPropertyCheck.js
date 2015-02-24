//==========================================================
// <T>复选框编辑属性。</T>
//
// @class
// @author maocy
// @version 150224
//==========================================================
function MPropertyCheck(o){
   o = RClass.inherits(this, o);
   //..........................................................
   // @property
   o._valueTrue  = RClass.register(o, new APtyNumber('_valueTrue'));
   o._valueFalse = RClass.register(o, new APtyNumber('_valueFalse'));
   return o;
}
