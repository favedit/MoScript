//==========================================================
// <T>简单自动渲染器。</T>
//
// @author maocy
// @history 141230
//==========================================================
function FG3dSampleAutomaticEffect(o){
   o = RClass.inherits(this, o, FG3dAutomaticEffect);
   //..........................................................
   // @attribute
   o._context       = null;
   o._program       = null;
   //..........................................................
   // @method
   o.drawRenderable = FG3dSampleAutomaticEffect_drawRenderable;
   o.load           = FG3dSampleAutomaticEffect_load;
   return o;
}

//==========================================================
// <T>绘制渲染对象。</T>
//
// @method
// @param pg:region:FG3dRegion 渲染区域
// @param pr:renderable:FG3dRenderable 渲染对象
//==========================================================
function FG3dSampleAutomaticEffect_drawRenderable(pg, pr){
   var o = this;
   var c = o._context;
   var p = o._program;
   // 绑定材质
   var m = pr.material();
   o.bindMaterial(m);
   // 绑定所有属性流
   p.setParameter('vc_model_matrix', pr.matrix());
   p.setParameter('vc_vp_matrix', pg.calculate(EG3dRegionParameter.CameraViewProjectionMatrix));
   p.setParameter('vc_camera_position', pg.calculate(EG3dRegionParameter.CameraPosition));
   p.setParameter('vc_light_direction', pg.calculate(EG3dRegionParameter.LightDirection));
   p.setParameter('fc_camera_position', pg.calculate(EG3dRegionParameter.CameraPosition));
   p.setParameter('fc_light_direction', pg.calculate(EG3dRegionParameter.LightDirection));
   // 设置材质
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
   o.bindSamplers(pr);
   // 绘制处理
   c.drawTriangles(pr.indexBuffer());
}

//==========================================================
// <T>从网络地址加载渲染器。</T>
//
// @method
//==========================================================
function FG3dSampleAutomaticEffect_load(){
   var o = this;
   var u = RBrowser.contentPath() + o._path + "simple.automatic.xml";
   o.loadUrl(u);
}
