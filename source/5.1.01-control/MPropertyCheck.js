with(MO){
   //==========================================================
   // <T>复选框编辑属性。</T>
   //
   // @class
   // @author maocy
   // @version 150224
   //==========================================================
   MO.MPropertyCheck = function MPropertyCheck(o){
      o = RClass.inherits(this, o);
      //..........................................................
      // @property
      o._valueTrue  = RClass.register(o, new APtyString('_valueTrue'), EBoolean.True);
      o._valueFalse = RClass.register(o, new APtyString('_valueFalse'), EBoolean.False);
      return o;
   }
}
