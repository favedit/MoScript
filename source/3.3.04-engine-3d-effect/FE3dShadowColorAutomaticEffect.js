//==========================================================
// <T>阴影颜色自动渲染器。</T>
//
// @author maocy
// @history 141230
//==========================================================
MO.FE3dShadowColorAutomaticEffect = function FE3dShadowColorAutomaticEffect(o){
   o = MO.Class.inherits(this, o, MO.FG3dAutomaticEffect);
   //..........................................................
   // @attribute
   o._code          = 'shadow.color.automatic';
   //..........................................................
   // @method
   o.drawRenderable = MO.FE3dShadowColorAutomaticEffect_drawRenderable;
   return o;
}

//==========================================================
// <T>绘制渲染对象。</T>
//
// @method
// @param pg:region:FG3dRegion 渲染区域
// @param pr:renderable:FG3dRenderable 渲染对象
//==========================================================
MO.FE3dShadowColorAutomaticEffect_drawRenderable = function FE3dShadowColorAutomaticEffect_drawRenderable(pg, pr){
   var o = this;
   var c = o._graphicContext;
   var p = o._program;
   // 获得参数
   var vcp = pg.calculate(MO.EG3dRegionParameter.CameraPosition);
   var vcvpm = pg.calculate(MO.EG3dRegionParameter.CameraViewProjectionMatrix);
   var vld = pg.calculate(MO.EG3dRegionParameter.LightDirection);
   var vlvm = pg.calculate(MO.EG3dRegionParameter.LightViewMatrix);
   var vlvpm = pg.calculate(MO.EG3dRegionParameter.LightViewProjectionMatrix);
   var vlci = pg.calculate(MO.EG3dRegionParameter.LightInfo);
   var tp = pg.techniquePass();
   // 绑定材质
   var m = pr.material();
   o.bindMaterial(m);
   // 绑定顶点常量
   p.setParameter('vc_light_depth', vlci);
   p.setParameter('vc_model_matrix', pr.currentMatrix());
   p.setParameter('vc_vp_matrix', vcvpm);
   p.setParameter('vc_camera_position', vcp);
   p.setParameter('vc_light_direction', vld);
   p.setParameter('vc_light_view_matrix', vlvm);
   p.setParameter('vc_light_vp_matrix', vlvpm);
   p.setParameter('fc_camera_position', vcp);
   p.setParameter('fc_light_direction', vld);
   p.setParameter4('fc_light_depth', 1.0 / 4096.0, 0.0, -1.0 / 4096.0, vlci.w);
   // 绑定像素常量
   var mi = m.info();
   p.setParameter('fc_color', mi.ambientColor);
   p.setParameter4('fc_vertex_color', mi.colorMin, mi.colorMax, mi.colorRate, mi.colorMerge);
   p.setParameter4('fc_alpha', mi.alphaBase, mi.alphaRate, mi.alphaLevel, mi.alphaMerge);
   p.setParameter('fc_ambient_color', mi.ambientColor);
   p.setParameter('fc_diffuse_color', mi.diffuseColor);
   p.setParameter('fc_specular_color', mi.specularColor);
   p.setParameter4('fc_specular', mi.specularBase, mi.specularLevel, mi.specularAverage, mi.specularShadow);
   p.setParameter('fc_specular_view_color', mi.specularViewColor);
   p.setParameter4('fc_specular_view', mi.specularViewBase, mi.specularViewRate, mi.specularViewAverage, mi.specularViewShadow);
   p.setParameter('fc_reflect_color', mi.reflectColor);
   // 绑定所有属性流
   o.bindAttributes(pr);
   // 绑定所有取样器
   p.setSampler('fs_light_depth', tp.textureDepth());
   o.bindSamplers(pr);
   // 绘制处理
   c.drawTriangles(pr.indexBuffer());
}
