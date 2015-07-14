 //==========================================================
// <T>场景。</T>
//
// @author maocy
// @history 150106
//==========================================================
MO.FE3dSceneMaterial = function FE3dSceneMaterial(o){
   o = MO.Class.inherits(this, o, MO.FE3dMaterial);
   //..........................................................
   // @attribute
   o._display          = null;
   o._parentMaterial   = null;
   //..........................................................
   // @method
   o.loadSceneResource = MO.FE3dSceneMaterial_loadSceneResource;
   o.reloadResource    = MO.FE3dSceneMaterial_reloadResource;
   return o;
}

//==========================================================
// <T>加载场景资源。</T>
//
// @method
// @param resource:FE3sSceneRegion 区域资源
//==========================================================
MO.FE3dSceneMaterial_loadSceneResource = function FE3dSceneMaterial_loadSceneResource(resource){
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
MO.FE3dSceneMaterial_reloadResource = function FE3dSceneMaterial_reloadResource(){
   var o = this;
   // 计算材质
   o.calculate(o._resource);
   o.update();
}
