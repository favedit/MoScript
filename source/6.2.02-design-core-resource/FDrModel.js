with(MO){
   //==========================================================
   // <T>设计资源模型。</T>
   //
   // @class
   // @author maocy
   // @version 150415
   //==========================================================
   MO.FDrModel = function FDrModel(o){
      o = MO.Class.inherits(this, o, FDrResource);
      //..........................................................
      // @attribute
      o._classCode = 'Model';
      return o;
   }
}
