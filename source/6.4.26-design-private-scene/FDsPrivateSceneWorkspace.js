//==========================================================
// <T>私有场景工作区域。</T>
//
// @class
// @author maocy
// @history 150422
//==========================================================
function FDsPrivateSceneWorkspace(o){
   o = RClass.inherits(this, o, FDsSceneWorkspace);
   //..........................................................
   // @property
   o._frameName = 'resource.share.scene.Workspace';
   return o;
}
