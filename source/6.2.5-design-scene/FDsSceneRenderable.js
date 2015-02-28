 //==========================================================
// <T>场景渲染对象。</T>
//
// @class
// @author maocy
// @history 150215
//==========================================================
function FDsSceneRenderable(o){
   o = RClass.inherits(this, o, FE3dSceneDisplayRenderable, MDsBoundBox);
   // o._a
   return o;
}
