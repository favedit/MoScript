//==========================================================
// <T>设计资源模型。</T>
//
// @class
// @author maocy
// @version 150415
//==========================================================
function FDrModel(o){
   o = RClass.inherits(this, o, FDrResource);
   //..........................................................
   // @attribute
   o._classCode = 'Model';
   return o;
}
