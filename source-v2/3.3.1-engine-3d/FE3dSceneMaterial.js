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
   o._resource         = null;
   //..........................................................
   // @method
   o.groupGuid         = FE3dSceneMaterial_groupGuid
   o.loadSceneResource = FE3dSceneMaterial_loadSceneResourcee
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
// <T>加载区域资源。</T>
//
// @method
// @param p:resource:FRs3SceneRegion 区域资源
//==========================================================
function FE3dSceneMaterial_loadSceneResourcee(p){
   var o = this;
   o._resource = p;
   o._info.assign(p.info());
}
