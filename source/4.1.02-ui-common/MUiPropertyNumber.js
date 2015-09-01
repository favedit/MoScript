//==========================================================
// <T>数字编辑属性。</T>
//
// @class
// @author maocy
// @version 150224
//==========================================================
MO.MUiPropertyNumber = function MUiPropertyNumber(o){
   o = MO.Class.inherits(this, o);
   //..........................................................
   // @property
   o._valueMin       = MO.Class.register(o, new MO.APtyNumber('_valueMin'));
   o._valueMax       = MO.Class.register(o, new MO.APtyNumber('_valueMax'));
   o._valuePrecision = MO.Class.register(o, new MO.APtyInteger('_valuePrecision'), 3);
   return o;
}
