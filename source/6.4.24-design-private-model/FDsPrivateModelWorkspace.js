//==========================================================
// <T>私有模型工作区。</T>
//
// @class
// @author maocy
// @history 150423
//==========================================================
function FDsPrivateModelWorkspace(o){
   o = RClass.inherits(this, o, FDsModelWorkspace);
   //..........................................................
   // @property
   o._frameName = 'resource.private.model.Workspace';
   return o;
}
