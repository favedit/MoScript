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
// @param pg:region:FG3dRegion 渲染区域
// @param pr:renderable:FG3dRenderable 渲染对象
//==========================================================
function FG3dShadowColorAutomaticEffect_drawRenderable(pg, pr){
   var o = this;
   var c = o._context;
   var p = o._program;
   // 获得信息
   var tp = pg.techniquePass();
   var l = pg.directionalLight();
   var lc = l.camera();
   var lp = lc.projection();
   // 绑定材质
   var m = pr.material();
   o.bindMaterial(m);
   // 绑定顶点常量
   p.setParameter('vc_model_matrix', pr.matrix());
   p.setParameter('vc_vp_matrix', pg.calculate(EG3dRegionParameter.CameraViewProjectionMatrix));
   p.setParameter('vc_camera_position', pg.calculate(EG3dRegionParameter.CameraPosition));
   p.setParameter('vc_light_direction', pg.calculate(EG3dRegionParameter.LightDirection));
   p.setParameter('vc_light_view_matrix', pg.calculate(EG3dRegionParameter.LightViewMatrix));
   p.setParameter('vc_light_vp_matrix', pg.calculate(EG3dRegionParameter.LightViewProjectionMatrix));
   p.setParameter('fc_camera_position', pg.calculate(EG3dRegionParameter.CameraPosition));
   p.setParameter('fc_light_direction', pg.calculate(EG3dRegionParameter.LightDirection));
   p.setParameter4('fc_light_depth', 1.0 / 8192.0, 0.0, -1.0 / 8192.0, 1.0 / lp.distance());
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
   o.bindAttributes(pr);
   // 绑定所有取样器
   p.setSampler('fs_light_depth', pg._textureDepth);
   o.bindSamplers(pr);
   // 绘制处理
   c.drawTriangles(pr.indexBuffer());
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
