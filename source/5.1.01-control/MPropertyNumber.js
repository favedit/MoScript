with(MO){
   //==========================================================
   // <T>数字编辑属性。</T>
   //
   // @class
   // @author maocy
   // @version 150224
   //==========================================================
   MO.MPropertyNumber = function MPropertyNumber(o){
      o = RClass.inherits(this, o);
      //..........................................................
      // @property
      o._valueMin       = RClass.register(o, new APtyNumber('_valueMin'));
      o._valueMax       = RClass.register(o, new APtyNumber('_valueMax'));
      o._valuePrecision = RClass.register(o, new APtyInteger('_valuePrecision'), 3);
      return o;
   }
}
