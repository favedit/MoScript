 //==========================================================
// <T>场景显示对象。</T>
//
// @author maocy
// @history 150115
//==========================================================
function FE3dSceneDisplayRenderable(o){
   o = RClass.inherits(this, o, FE3dTemplateRenderable);
   //..........................................................
   // @method
   o.loadMaterial       = FE3dSceneDisplayRenderable_loadMaterial;
   o.reloadResource     = FE3dSceneDisplayRenderable_reloadResource;
   return o;
}

//==========================================================
// <T>加载材质。</T>
//
// @method
// @param material:FE3sTemplateRenderable 资源
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
   var material = o._material;
   material.calculate(o._materialReference);
   material.update();
}
