MO.FE3dMeshMergeProcessor = function FE3dMeshMergeProcessor(o){
   o = MO.Class.inherits(this, o, MO.FProcessor);
   o._typeName  = null;
   o._groupName = null;
   o._name      = MO.Class.register(o, new MO.AGetter('_name'));
   return o;
}
MO.FE3dProcessServer = function FE3dProcessServer(o){
   o = MO.Class.inherits(this, o, MO.FProcessServer);
   o._typeName  = null;
   o._groupName = null;
   o._name      = MO.Class.register(o, new MO.AGetter('_name'));
   return o;
}
var server = MO.Class.create(MO.FE3dProcessServer);
server.registerProcessor('engine3d.mesh.merge', MO.Class.create(MO.FE3dMeshMergeProcessor));
server.process();
