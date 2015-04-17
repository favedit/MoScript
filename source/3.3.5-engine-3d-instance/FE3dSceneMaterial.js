 //==========================================================
// <T>场景。</T>
//
// @author maocy
// @history 150106
//==========================================================
function FE3dSceneMaterial(o){
   o = RClass.inherits(this, o, FE3rMaterial);
   //..........................................................
   // @attribute
   o._display          = null;
   o._resource         = null;
   o._parentMaterial   = null;
   //..........................................................
   // @method
   o.groupGuid         = FE3dSceneMaterial_groupGuid
   o.resource          = FE3dSceneMaterial_resource;
   o.loadSceneResource = FE3dSceneMaterial_loadSceneResource;
   o.reloadResource    = FE3dSceneMaterial_reloadResource;
   return o;
}

//==========================================================
// <T>获得分组唯一编号。</T>
//
// @method
// @return String 分组唯一编号
//==========================================================
function FE3dSceneMaterial_groupGuid(p){
   return this._resource.groupGuid();
}

//==========================================================
// <T>获得资源。</T>
//
// @method
// @return FE3sResource 资源
//==========================================================
function FE3dSceneMaterial_resource(p){
   return this._resource;
}

//==========================================================
// <T>加载场景资源。</T>
//
// @method
// @param resource:FE3sSceneRegion 区域资源
//==========================================================
function FE3dSceneMaterial_loadSceneResource(resource){
   var o = this;
   o._resource = resource;
   o._info.assign(resource.info());
}

//==========================================================
// <T>重新加载资源。</T>
//
// @method
//==========================================================
function FE3dSceneMaterial_reloadResource(){
   var o = this;
   var resource = o._resource;
   o.loadResource(resource);
   o._parentMaterial.loadResource(resource);
}
