//==========================================================
// <T>共享模型工作区。</T>
//
// @class
// @author maocy
// @history 150423
//==========================================================
function FDsShareModelWorkspace(o){
   o = RClass.inherits(this, o, FDsModelWorkspace);
   //..........................................................
   // @property
   o._frameName = 'resource.share.model.Workspace';
   return o;
}
