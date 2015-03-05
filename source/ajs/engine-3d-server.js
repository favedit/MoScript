function FE3dProcessServer(o){
   o = RClass.inherits(this, o, FObject);
   o._typeName  = null;
   o._groupName = null;
   o._name      = null;
   o.name  = FE3dProcessServer_name;
   return o;
}
function FE3dProcessServer_name(){
   return this._name;
}
