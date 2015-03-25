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
   o.loadResource = FE3dMaterial_loadResource;
   return o;
}

//==========================================================
// <T>加载区域资源。</T>
//
// @method
// @param p:resource:FE3sSceneRegion 区域资源
//==========================================================
function FE3dMaterial_loadResource(p){
   var o = this;
   o._resource = p;
   o._info.assign(p.info());
}
