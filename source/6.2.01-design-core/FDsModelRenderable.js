 //==========================================================
// <T>模型渲染对象。</T>
//
// @class
// @author maocy
// @history 150430
//==========================================================
function FDsModelRenderable(o){
   o = RClass.inherits(this, o, FE3dModelRenderable, MDsBoundBox);
   //..........................................................
   // @attribute
   o._optionSelected = false;
   return o;
}
