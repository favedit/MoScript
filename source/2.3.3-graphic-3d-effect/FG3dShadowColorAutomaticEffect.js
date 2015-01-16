//==========================================================
// <T>简单自动渲染器。</T>
//
// @author maocy
// @history 141230
//==========================================================
function FG3dShadowColorAutomaticEffect(o){
   o = RClass.inherits(this, o, FG3dAutomaticEffect);
   //..........................................................
   // @attribute
   o._context       = null;
   o._program       = null;
   //..........................................................
   // @method
   o.drawRenderable = FG3dShadowColorAutomaticEffect_drawRenderable;
   o.load           = FG3dShadowColorAutomaticEffect_load;
   return o;
}

//==========================================================
// <T>绘制渲染对象。</T>
//
// @method
// @param p:renderable:FRenderable 渲染对象
//==========================================================
function FG3dShadowColorAutomaticEffect_drawRenderable(pr, r){
   var o = this;
   var c = o._context;
   var p = o._program;
   // 获得信息
   var prvp = pr.matrixViewProjection();
   var prcp = pr.cameraPosition();
   var prld = pr.lightDirection();
   var l = pr.directionalLight();
   var lc = l.camera();
   var lp = l.projection();
   // 绑定材质
   var m = r.material();
   o.bindMaterial(m);
   // 绑定顶点常量
   p.setParameter('vc_model_matrix', r.matrix());
   p.setParameter('vc_vp_matrix', prvp);
   p.setParameter('vc_camera_position', prcp);
   p.setParameter('vc_light_direction', prld);
   p.setParameter('vc_light_view_matrix', lc.matrix());
   p.setParameter('vc_light_projection_matrix', lp.matrix());
   p.setParameter('fc_camera_position', prcp);
   p.setParameter('fc_light_direction', prld);
   p.setParameter4('fc_light_depth', 1.0 / 1024.0, -1.0 / 1024.0, 0.0, 1.0 / lp.distance());
   // 绑定像素常量
   var mi = m.info();
   p.setParameter('fc_color', mi.ambientColor);
   p.setParameter4('fc_vertex_color', mi.colorMin, mi.colorMax, mi.colorRate, mi.colorMerge);
   p.setParameter4('fc_alpha', mi.alphaBase, mi.alphaRate, mi.alphaLevel, mi.alphaMerge);
   p.setParameter('fc_ambient_color', mi.ambientColor);
   p.setParameter('fc_diffuse_color', mi.diffuseColor);
   p.setParameter('fc_specular_color', mi.specularColor);
   p.setParameter4('fc_specular', mi.specularBase, mi.specularRate, mi.specularAverage, mi.specularShadow);
   p.setParameter('fc_specular_view_color', mi.specularViewColor);
   p.setParameter4('fc_specular_view', mi.specularViewBase, mi.specularViewRate, mi.specularViewAverage, mi.specularViewShadow);
   p.setParameter('fc_reflect_color', mi.reflectColor);
   // 绑定所有属性流
   o.bindAttributes(r);
   // 绑定所有取样器
   p.setSampler('fs_light_depth', pr._textureDepth);
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
function FG3dShadowColorAutomaticEffect_load(){
   var o = this;
   var u = RBrowser.contentPath() + o._path + "shadow.color.automatic.xml";
   o.loadUrl(u);
}
