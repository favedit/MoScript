//==========================================================
// <T>私有资源属性工具栏。</T>
//
// @class
// @author maocy
// @history 150422
//==========================================================
function FDsPrivateResourcePropertyToolBar(o){
   o = RClass.inherits(this, o, FDsResourcePropertyToolBar);
   //..........................................................
   // @property
   o._frameName = 'resource.private.resource.PropertyToolBar';
   return o;
}
