 //==========================================================
// <T>场景。</T>
//
// @author maocy
// @history 150106
//==========================================================
function FE3dSceneMaterial(o){
   o = RClass.inherits(this, o, FE3dMaterial);
   //..........................................................
   // @attribute
   o._display          = null;
   o._parentMaterial   = null;
   //..........................................................
   // @method
   o.loadSceneResource = FE3dSceneMaterial_loadSceneResource;
   o.reloadResource    = FE3dSceneMaterial_reloadResource;
   return o;
}

//==========================================================
// <T>加载场景资源。</T>
//
// @method
// @param resource:FE3sSceneRegion 区域资源
//==========================================================
function FE3dSceneMaterial_loadSceneResource(resource){
   var o = this;
   // 设置材质
   o._resource = resource;
   // 加载材质
   o.reloadResource();
}

//==========================================================
// <T>重新加载资源。</T>
//
// @method
//==========================================================
function FE3dSceneMaterial_reloadResource(){
   var o = this;
   // 计算材质
   o.calculate(o._resource);
   o.update();
}
