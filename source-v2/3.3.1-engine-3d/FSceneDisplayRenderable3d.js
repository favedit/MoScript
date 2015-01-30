 //==========================================================
// <T>场景显示对象。</T>
//
// @author maocy
// @history 150115
//==========================================================
function FSceneDisplayRenderable3d(o){
   o = RClass.inherits(this, o, FTemplateRenderable3d);
   //..........................................................
   // @method
   o.loadMaterial = FSceneDisplayRenderable3d_loadMaterial;
   return o;
}

//==========================================================
// <T>加载材质。</T>
//
// @param p:resource:FRs3TemplateRenderable 资源
//==========================================================
function FSceneDisplayRenderable3d_loadMaterial(p){
   var o = this;
   // 设置资源
   var pi = p.info();
   o._material.info().assign(pi);
}
