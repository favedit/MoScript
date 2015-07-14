//==========================================================
// <T>引擎服务进程。</T>
//
// @class
// @author maocy
// @version 150305
//==========================================================
MO.FE3dMeshMergeProcessor = function FE3dMeshMergeProcessor(o){
   o = MO.Class.inherits(this, o, MO.FProcessor);
   //..........................................................
   // @attribute
   o._typeName  = null;
   o._groupName = null;
   o._name      = MO.Class.register(o, new MO.AGetter('_name'));
   return o;
}
