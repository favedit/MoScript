//==========================================================
// <T>私有材质属性工具栏。</T>
//
// @class
// @author maocy
// @history 150424
//==========================================================
function FDsPrivateMaterialPropertyToolBar(o){
   o = RClass.inherits(this, o, FDsMaterialPropertyToolBar);
   //..........................................................
   // @property
   o._frameName = 'resource.private.material.PropertyToolBar';
   return o;
}
