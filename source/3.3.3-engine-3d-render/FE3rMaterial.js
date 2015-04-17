 //==========================================================
// <T>材质。</T>
//
// @class
// @author maocy
// @history 150417
//==========================================================
function FE3rMaterial(o){
   o = RClass.inherits(this, o, FG3dMaterial, MGuid, MGraphicObject, MLinkerResource);
   //..........................................................
   // @method
   o.loadResource   = FE3rMaterial_loadResource;
   o.reloadResource = FE3rMaterial_reloadResource;
   return o;
}

//==========================================================
// <T>加载材质资源。</T>
//
// @method
// @param resource:FE3sMaterial 材质资源
//==========================================================
function FE3rMaterial_loadResource(resource){
   var o = this;
   o._resource = resource;
   o._info.calculate(resource.info());
   o._dirty = true;
}

//==========================================================
// <T>重新加载数据。</T>
//
// @method
//==========================================================
function FE3rMaterial_reloadResource(){
   var o = this;
   o._info.calculate(o._resource.info());
   o._dirty = true;
}
