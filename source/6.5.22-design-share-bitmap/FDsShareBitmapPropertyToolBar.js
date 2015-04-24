//==========================================================
// <T>共享位图属性工具栏。</T>
//
// @class
// @author maocy
// @history 150424
//==========================================================
function FDsShareBitmapPropertyToolBar(o){
   o = RClass.inherits(this, o, FDsBitmapPropertyToolBar);
   //..........................................................
   // @property
   o._frameName = 'resource.share.bitmap.CatalogToolBar';
   return o;
}
