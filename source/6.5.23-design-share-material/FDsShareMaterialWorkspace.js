//==========================================================
// <T>共享材质工作区。</T>
//
// @class
// @author maocy
// @history 150424
//==========================================================
function FDsShareMaterialWorkspace(o){
   o = RClass.inherits(this, o, FDsMaterialWorkspace);
   //..........................................................
   // @property
   o._frameName = 'resource.share.material.Workspace';
   return o;
}
