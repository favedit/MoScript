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
// @param p:renderable:FRenderable 渲染对象
//==========================================================
function FG3dShadowDepthAutomaticEffect_drawRenderable(pr, r){
   var o = this;
   var c = o._context;
   var p = o._program;
   var prvp = pr.matrixViewProjection();
   var prcp = pr.cameraPosition();
   var prld = pr.lightDirection();
   // 绑定材质
   var m = r.material();
   o.bindMaterial(m);
   c.setBlendFactors(false);
   // 获得信息
   var l = pr.directionalLight();
   var lc = l.camera();
   var lp = l.projection();
   // 绑定所有属性流
   p.setParameter('vc_model_matrix', r.matrix());
   p.setParameter('vc_view_matrix', lc.matrix());
   p.setParameter('vc_projection_matrix', lp.matrix());
   //p.setParameter('vc_view_matrix', pr.camera().matrix());
   //p.setParameter('vc_projection_matrix', pr.projection().matrix());
   //p.setParameter('vc_projection_matrix', prvp);
   // 设置材质
   p.setParameter4('fc_camera', lc.position().x, lc.position().y, lc.position().z, 1.0 / lp.distance());
   // 绑定所有属性流
   o.bindAttributes(r);
   // 绑定所有取样器
   o.bindSamplers(r);
   // 绘制处理
   var ib = r.indexBuffer();
   c.drawTriangles(ib, 0, ib._count);
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
