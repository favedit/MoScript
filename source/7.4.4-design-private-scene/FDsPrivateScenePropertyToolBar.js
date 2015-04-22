//==========================================================
// <T>私有场景属性工具栏。</T>
//
// @class
// @author maocy
// @history 150422
//==========================================================
function FDsPrivateScenePropertyToolBar(o){
   o = RClass.inherits(this, o, FDsScenePropertyToolBar);
   //..........................................................
   // @property
   o._frameName = 'resource.private.scene.PropertyToolBar';
   return o;
}
