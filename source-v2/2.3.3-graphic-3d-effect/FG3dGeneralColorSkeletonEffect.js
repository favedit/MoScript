//==========================================================
// <T>通用骨骼渲染器。</T>
//
// @author maocy
// @history 150119
//==========================================================
function FG3dGeneralColorSkeletonEffect(o){
   o = RClass.inherits(this, o, FG3dAutomaticEffect);
   //..........................................................
   // @attribute
   o._code            = 'general.color.skeleton';
   // @attribute
   o._supportSkeleton = true;
   //..........................................................
   // @method
   o.drawRenderable   = FG3dGeneralColorSkeletonEffect_drawRenderable;
   return o;
}

//==========================================================
// <T>绘制渲染对象。</T>
//
// @method
// @param pg:region:FG3dRegion 渲染区域
// @param pr:renderable:FG3dRenderable 渲染对象
//==========================================================
function FG3dGeneralColorSkeletonEffect_drawRenderable(pg, pr){
   var o = this;
   var c = o._context;
   var p = o._program;
   // 获得参数
   var vcp = pg.calculate(EG3dRegionParameter.CameraPosition);
   var vld = pg.calculate(EG3dRegionParameter.LightDirection);
   // 绑定材质
   var m = pr.material();
   var mi = m.info();
   o.bindMaterial(m);
   // 绑定所有属性流
   p.setParameter('vc_model_matrix', pr.currentMatrix());
   p.setParameter('vc_vp_matrix', pg.calculate(EG3dRegionParameter.CameraViewProjectionMatrix));
   p.setParameter('vc_camera_position', vcp);
   p.setParameter('vc_light_direction', vld);
   p.setParameter('fc_camera_position', vcp);
   p.setParameter('fc_light_direction', vld);
   // 设置材质
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
   // 设置骨头集合
   var bs = pr.bones();
   if(bs){
      var bc = pr._boneLimit;
      var d = RTypeArray.findTemp(EDataType.Float, 16 * bc);
      for(var i = 0; i < bc; i++){
         var b = bs.get(i);
         var m = b.matrix();
         m.writeData(d, 16 * i);
      }
      p.setParameter('vc_bone_matrix', d);
   }
   // 绑定所有属性流
   o.bindAttributes(pr);
   // 绑定所有取样器
   o.bindSamplers(pr);
   // 绘制处理
   c.drawTriangles(pr.indexBuffer());
}
