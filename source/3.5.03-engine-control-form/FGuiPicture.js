with(MO){
   //==========================================================
   // <T>表单图片控件。</T>
   //
   // @class
   // @author maocy
   // @version 150610
   //==========================================================
   MO.FGuiPicture = function FGuiPicture(o){
      o = RClass.inherits(this, o, FGuiControl);
      //..........................................................
      // @property String 名称
      o._source = RClass.register(o, [new APtyString('_source'), new AGetSet('_source')]);
      return o;
   }
}
