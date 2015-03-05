//==========================================================
// <T>进程。</T>
//
// @class
// @author maocy
// @version 150105
//==========================================================
function FE3dProcessServer(o){
   o = RClass.inherits(this, o, FObject);
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
