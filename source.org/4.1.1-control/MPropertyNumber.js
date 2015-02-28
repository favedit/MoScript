//==========================================================
// <T>数字编辑属性。</T>
//
// @class
// @author maocy
// @version 150224
//==========================================================
function MPropertyNumber(o){
   o = RClass.inherits(this, o);
   //..........................................................
   // @property
   o._valueMin = RClass.register(o, new APtyNumber('_valueMin'));
   o._valueMax = RClass.register(o, new APtyNumber('_valueMax'));
   return o;
}
