function FE3dMeshMergeProcessor(o){
   o = RClass.inherits(this, o, FProcessor);
   o._typeName  = null;
   o._groupName = null;
   o._name      = null;
   o.name  = FE3dMeshMergeProcessor_name;
   return o;
}
function FE3dMeshMergeProcessor_name(){
   return this._name;
}
function FE3dProcessServer(o){
   o = RClass.inherits(this, o, FProcessServer);
   o._typeName  = null;
   o._groupName = null;
   o._name      = null;
   o.name  = FE3dProcessServer_name;
   return o;
}
function FE3dProcessServer_name(){
   return this._name;
}
var server = RClass.create(FE3dProcessServer);
server.registerProcessor('engine3d.mesh.merge', RClass.create(FE3dMeshMergeProcessor));
server.process();
