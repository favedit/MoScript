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
   o.loadMaterial = FE3dSceneDisplayRenderable_loadMaterial;
   return o;
}

//==========================================================
// <T>加载材质。</T>
//
// @param p:resource:FRs3TemplateRenderable 资源
//==========================================================
function FE3dSceneDisplayRenderable_loadMaterial(p){
   var o = this;
   // 设置资源
   var pi = p.info();
   o._material.info().assign(pi);
}
