//==========================================================
// <T>控件自动渲染器。</T>
//
// @author maocy
// @history 151008
//==========================================================
MO.FEaiEarthFlatEffect = function FEaiEarthFlatEffect(o){
   o = MO.Class.inherits(this, o, MO.FG3dAutomaticEffect);
   //..........................................................
   // @attribute
   o._code          = 'eai.earth.flat';
   o._translateX    = 0;
   //..........................................................
   // @method
   o.drawRenderable = MO.FEaiEarthFlatEffect_drawRenderable;
   return o;
}

//==========================================================
// <T>绘制渲染对象。</T>
//
// @method
// @param region:FG3dRegion 渲染区域
// @param renderable:FG3dRenderable 渲染对象
//==========================================================
MO.FEaiEarthFlatEffect_drawRenderable = function FEaiEarthFlatEffect_drawRenderable(region, renderable){
   var o = this;
   var context = o._graphicContext;
   var program = o._program;
   o._translateX += 0.00002;
   // 绑定材质
   var material = renderable.material();
   var info = material.info();
   o.bindMaterial(material);
   // 设置矩阵
   var displayMatrix = renderable.display().currentMatrix();
   program.setParameter4('vc_land', o._translateX, 0, 0, 0);
   program.setParameter4('vc_ocean', o._translateX, 0, 0, 0);
   program.setParameter4('fc_land', o._translateX, 0, 0, 0);
   program.setParameter4('fc_ocean', o._translateX, 0, 0, 0);
   program.setParameter4('fc_water', o._translateX, 0, 0, 0);
   //program.setParameter('vc_model_matrix', displayMatrix);
   //program.setParameter('vc_vp_matrix', cameraVpMatrix);
   // 绑定所有属性流
   o.bindAttributes(renderable);
   o.bindSamplers(renderable);
   // 绘制处理
   context.drawTriangles(renderable.indexBuffer());
}
