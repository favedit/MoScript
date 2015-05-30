with(MO){
   //==========================================================
   // <T>界面数据接口。</T>
   //
   // @face
   // @author maocy
   // @version 150319
   //==========================================================
   MO.MUiValue = function MUiValue(o){
      o = RClass.inherits(this, o);
      //..........................................................
      // @process
      o.get = RMethod.empty;
      o.set = RMethod.empty;
      return o;
   }
}
