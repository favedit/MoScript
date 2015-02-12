//==========================================================
// <T>阴影深度自动渲染器。</T>
//
// @author maocy
// @history 141230
//==========================================================
function FG3dShadowDepthAutomaticEffect(o){
   o = RClass.inherits(this, o, FG3dAutomaticEffect);
   //..........................................................
   // @attribute
   o._code          = 'shadow.depth.automatic';
   //..........................................................
   // @method
   o.drawRenderable = FG3dShadowDepthAutomaticEffect_drawRenderable;
   return o;
}

//==========================================================
// <T>绘制渲染对象。</T>
//
// @method
// @param pg:region:FG3dRegion 渲染区域
// @param pr:renderable:FG3dRenderable 渲染对象
//==========================================================
function FG3dShadowDepthAutomaticEffect_drawRenderable(pg, pr){
   var o = this;
   var c = o._graphicContext;
   var p = o._program;
   // 获得参数
   var lvm = pg.calculate(EG3dRegionParameter.LightViewMatrix);
   var lvpm = pg.calculate(EG3dRegionParameter.LightViewProjectionMatrix);
   var lci = pg.calculate(EG3dRegionParameter.LightInfo);
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
