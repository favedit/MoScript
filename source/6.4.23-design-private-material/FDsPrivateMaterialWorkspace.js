//==========================================================
// <T>私有材质工作区。</T>
//
// @class
// @author maocy
// @history 150424
//==========================================================
function FDsPrivateMaterialWorkspace(o){
   o = RClass.inherits(this, o, FDsMaterialWorkspace);
   //..........................................................
   // @property
   o._frameName = 'resource.private.material.Workspace';
   return o;
}
