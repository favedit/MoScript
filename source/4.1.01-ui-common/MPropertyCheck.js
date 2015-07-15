//==========================================================
// <T>复选框编辑属性。</T>
//
// @class
// @author maocy
// @version 150224
//==========================================================
MO.MPropertyCheck = function MPropertyCheck(o){
   o = MO.Class.inherits(this, o);
   //..........................................................
   // @property
   o._valueTrue  = MO.Class.register(o, new MO.APtyString('_valueTrue'), MO.EBoolean.True);
   o._valueFalse = MO.Class.register(o, new MO.APtyString('_valueFalse'), MO.EBoolean.False);
   return o;
}
