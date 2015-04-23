//==========================================================
// <T>私有资源列表工具栏。</T>
//
// @class
// @author maocy
// @history 150422
//==========================================================
function FDsPrivateResourceListToolBar(o){
   o = RClass.inherits(this, o, FDsResourceListToolBar);
   //..........................................................
   // @property
   o._frameName   = 'resource.private.resource.ListToolBar';
   o._storageCode = o._frameName;
   return o;
}
