//==========================================================
// <T>共享资源列表工具栏。</T>
//
// @class
// @author maocy
// @history 150428
//==========================================================
function FDsShareResourceListToolBar(o){
   o = RClass.inherits(this, o, FDsResourceListToolBar);
   //..........................................................
   // @property
   o._frameName   = 'resource.share.resource.ListToolBar';
   o._storageCode = o._frameName;
   return o;
}
