 //==========================================================
// <T>资源。</T>
//
// @author maocy
// @history 150106
//==========================================================
function FE3dMaterial(o){
   o = RClass.inherits(this, o, FG3dMaterial, MLinkerResource);
   //..........................................................
   // @method
   o.loadResource   = FE3dMaterial_loadResource;
   o.reloadResource = FE3dMaterial_reloadResource;
   return o;
}

//==========================================================
// <T>加载材质资源。</T>
//
// @method
// @param resource:FE3sMaterial 材质资源
//==========================================================
function FE3dMaterial_loadResource(resource){
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
function FE3dMaterial_reloadResource(){
   var o = this;
   o._info.calculate(o._resource.info());
   o._dirty = true;
}
