//==========================================================
// <T>阴影深度自动渲染器。</T>
//
// @author maocy
// @history 141230
//==========================================================
MO.FE3dShadowDepthAutomaticEffect = function FE3dShadowDepthAutomaticEffect(o){
   o = MO.Class.inherits(this, o, MO.FG3dAutomaticEffect);
   //..........................................................
   // @attribute
   o._code          = 'shadow.depth.automatic';
   //..........................................................
   // @method
   o.drawRenderable = MO.FE3dShadowDepthAutomaticEffect_drawRenderable;
   return o;
}

//==========================================================
// <T>绘制渲染对象。</T>
//
// @method
// @param pg:region:FG3dRegion 渲染区域
// @param pr:renderable:FG3dRenderable 渲染对象
//==========================================================
MO.FE3dShadowDepthAutomaticEffect_drawRenderable = function FE3dShadowDepthAutomaticEffect_drawRenderable(pg, pr){
   var o = this;
   var c = o._graphicContext;
   var p = o._program;
   // 获得参数
   var lvm = pg.calculate(MO.EG3dRegionParameter.LightViewMatrix);
   var lvpm = pg.calculate(MO.EG3dRegionParameter.LightViewProjectionMatrix);
   var lci = pg.calculate(MO.EG3dRegionParameter.LightInfo);
   // 关闭混合选项
   c.setBlendFactors(false);
   // 绑定所有属性流
   p.setParameter('vc_camera', lci);
   p.setParameter('vc_model_matrix', pr.currentMatrix());
   p.setParameter('vc_view_matrix', lvm);
   p.setParameter('vc_vp_matrix', lvpm);
   // 设置材质
   p.setParameter('fc_camera', lci);
   p.setParameter4('fc_alpha', 0, 0, 0, 0.1);
   // 绑定所有属性流
   o.bindAttributes(pr);
   // 绑定所有取样器
   o.bindSamplers(pr);
   // 绘制处理
   c.drawTriangles(pr.indexBuffer());
}
