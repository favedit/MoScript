//==========================================================
// <T>私有位图工作区。</T>
//
// @class
// @author maocy
// @history 150424
//==========================================================
function FDsPrivateBitmapWorkspace(o){
   o = RClass.inherits(this, o, FDsBitmapWorkspace);
   //..........................................................
   // @property
   o._frameName = 'resource.private.bitmap.Workspace';
   return o;
}
