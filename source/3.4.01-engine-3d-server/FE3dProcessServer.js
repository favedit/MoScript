//==========================================================
// <T>引擎服务进程。</T>
//
// @class
// @author maocy
// @version 150305
//==========================================================
MO.FE3dProcessServer = function FE3dProcessServer(o){
   o = MO.Class.inherits(this, o, MO.FProcessServer);
   //..........................................................
   // @attribute
   o._typeName  = null;
   o._groupName = null;
   o._name      = MO.Class.register(o, new MO.AGetter('_name'));
   return o;
}

//==========================================================
// <T>启动服务。</T>
//==========================================================
var server = MO.Class.create(MO.FE3dProcessServer);
server.registerProcessor('engine3d.mesh.merge', MO.Class.create(MO.FE3dMeshMergeProcessor));
server.process();
