with(MO){
   //==========================================================
   // <T>后台服务基类。</T>
   //
   // @reference
   // @author maocy
   // @version 141231
   //==========================================================
   MO.FConsole = function FConsole(o){
      o = RClass.inherits(this, o, FObject);
      //..........................................................
      // @attribute
      o._scopeCd = RClass.register(o, new AGetter('_scopeCd'), EScope.Global);
      return o;
   }
}
