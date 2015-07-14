 //==========================================================
// <T>场景显示对象。</T>
//
// @author maocy
// @history 150115
//==========================================================
MO.FE3dSceneDisplayRenderable = function FE3dSceneDisplayRenderable(o){
   o = MO.Class.inherits(this, o, MO.FE3dTemplateRenderable);
   //..........................................................
   // @method
   o.loadMaterial   = MO.FE3dSceneDisplayRenderable_loadMaterial;
   o.reloadResource = MO.FE3dSceneDisplayRenderable_reloadResource;
   return o;
}

//==========================================================
// <T>加载材质。</T>
//
// @method
// @param material:FE3sTemplateRenderable 资源
//==========================================================
MO.FE3dSceneDisplayRenderable_loadMaterial = function FE3dSceneDisplayRenderable_loadMaterial(material){
   var o = this;
   // 设置材质
   o._materialReference = material;
   o._material.calculate(material);
}

//==========================================================
// <T>重新加载资源。</T>
//
// @method
//==========================================================
MO.FE3dSceneDisplayRenderable_reloadResource = function FE3dSceneDisplayRenderable_reloadResource(){
   var o = this;
   var material = o._material;
   material.calculate(o._materialReference);
   material.update();
}
