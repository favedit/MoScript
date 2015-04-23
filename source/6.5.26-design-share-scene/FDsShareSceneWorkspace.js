//==========================================================
// <T>共享场景工作区。</T>
//
// @class
// @author maocy
// @history 150422
//==========================================================
function FDsShareSceneWorkspace(o){
   o = RClass.inherits(this, o, FDsSceneWorkspace);
   //..........................................................
   // @property
   o._frameName = 'resource.share.scene.Workspace';
   return o;
}
