//==========================================================
// <T>引擎服务进程。</T>
//
// @class
// @author maocy
// @version 150305
//==========================================================
function FE3dProcessServer(o){
   o = RClass.inherits(this, o, FProcessServer);
   //..........................................................
   // @attribute
   o._typeName  = null;
   o._groupName = null;
   o._name      = null;
   //..........................................................
   // @method
   o.name  = FE3dProcessServer_name;
   return o;
}

//==========================================================
// <T>获得名称。</T>
//
// @method
// @return 名称
//==========================================================
function FE3dProcessServer_name(){
   return this._name;
}

//==========================================================
// <T>启动服务。</T>
//==========================================================
var server = RClass.create(FE3dProcessServer);
server.registerProcessor('engine3d.mesh.merge', RClass.create(FE3dMeshMergeProcessor));
server.process();
