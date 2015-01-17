//==========================================================
// <T>简单自动渲染器。</T>
//
// @author maocy
// @history 141230
//==========================================================
function FG3dShadowDepthAutomaticEffect(o){
   o = RClass.inherits(this, o, FG3dAutomaticEffect);
   //..........................................................
   // @attribute
   o._context       = null;
   o._program       = null;
   //..........................................................
   // @method
   o.drawRenderable = FG3dShadowDepthAutomaticEffect_drawRenderable;
   o.load           = FG3dShadowDepthAutomaticEffect_load;
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
   var c = o._context;
   var p = o._program;
   // 获得信息
   var l = pg.directionalLight();
   var lc = l.camera();
   var lp = lc.projection();
   // 关闭混合选项
   c.setBlendFactors(false);
   // 绑定所有属性流
   p.setParameter('vc_model_matrix', pr.matrix());
   p.setParameter('vc_view_matrix', pg.calculate(EG3dRegionParameter.LightViewMatrix));
   p.setParameter('vc_projection_matrix', pg.calculate(EG3dRegionParameter.LightProjectionMatrix));
   // 设置材质
   p.setParameter4('fc_camera', lc.position().x, lc.position().y, lc.position().z, 1.0 / lp.distance());
   p.setParameter4('fc_alpha', 0, 0, 0, 0.1);
   // 绑定所有属性流
   o.bindAttributes(pr);
   // 绑定所有取样器
   o.bindSamplers(pr);
   // 绘制处理
   c.drawTriangles(pr.indexBuffer());
}

//==========================================================
// <T>从网络地址加载渲染器。</T>
//
// @method
//==========================================================
function FG3dShadowDepthAutomaticEffect_load(){
   var o = this;
   var u = RBrowser.contentPath() + o._path + "shadow.depth.automatic.xml";
   o.loadUrl(u);
}
