with(MO){
   //==========================================================
   // <T>设计资源模型。</T>
   //
   // @class
   // @author maocy
   // @version 150415
   //==========================================================
   MO.FDrTemplate = function FDrTemplate(o){
      o = RClass.inherits(this, o, FDrResource);
      //..........................................................
      // @attribute
      o._classCode = 'Template';
      return o;
   }
}
