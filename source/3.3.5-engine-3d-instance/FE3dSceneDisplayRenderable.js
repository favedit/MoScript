 //==========================================================
// <T>场景显示对象。</T>
//
// @author maocy
// @history 150115
//==========================================================
function FE3dSceneDisplayRenderable(o){
   o = RClass.inherits(this, o, FE3dTemplateRenderable);
   //..........................................................
   // @attribute
   o._materialReference = null;
   //..........................................................
   // @method
   o.materialReference  = FE3dSceneDisplayRenderable_materialReference;
   o.loadMaterial       = FE3dSceneDisplayRenderable_loadMaterial;
   o.reloadResource     = FE3dSceneDisplayRenderable_reloadResource;
   return o;
}

//==========================================================
// <T>获得材质引用。</T>
//
// @method
// @return FE3dSceneMaterial 材质引用
//==========================================================
function FE3dSceneDisplayRenderable_materialReference(p){
   return this._materialReference;
}

//==========================================================
// <T>加载材质。</T>
//
// @method
// @param p:resource:FE3sTemplateRenderable 资源
//==========================================================
function FE3dSceneDisplayRenderable_loadMaterial(p){
   var o = this;
   // 设置材质
   o._materialReference = p;
   o._material.calculate(p);
}

//==========================================================
// <T>重新加载资源。</T>
//
// @method
//==========================================================
function FE3dSceneDisplayRenderable_reloadResource(){
   var o = this;
   var m = o._material;
   m.calculate(o._materialReference);
   m.update();
}
