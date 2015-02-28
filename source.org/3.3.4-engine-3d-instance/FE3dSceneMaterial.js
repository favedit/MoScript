 //==========================================================
// <T>场景。</T>
//
// @author maocy
// @history 150106
//==========================================================
function FE3dSceneMaterial(o){
   o = RClass.inherits(this, o, FG3dMaterial);
   //..........................................................
   // @attribute
   o._display          = null;
   o._resource         = null;
   //..........................................................
   // @method
   o.groupGuid         = FE3dSceneMaterial_groupGuid
   o.resource          = FE3dSceneMaterial_resource;
   o.loadSceneResource = FE3dSceneMaterial_loadSceneResource;
   o.reload            = FE3dSceneMaterial_reload;
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
// @return FRs3Resource 资源
//==========================================================
function FE3dSceneMaterial_resource(p){
   return this._resource;
}

//==========================================================
// <T>加载区域资源。</T>
//
// @method
// @param p:resource:FRs3SceneRegion 区域资源
//==========================================================
function FE3dSceneMaterial_loadSceneResource(p){
   var o = this;
   o._resource = p;
   o._info.assign(p.info());
}

//==========================================================
// <T>重新加载数据。</T>
//
// @method
//==========================================================
function FE3dSceneMaterial_reload(p){
   var o = this;
   o._info.assign(o._resource.info());
}
