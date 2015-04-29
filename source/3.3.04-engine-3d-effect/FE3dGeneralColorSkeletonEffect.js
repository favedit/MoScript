//==========================================================
// <T>通用骨骼渲染器。</T>
//
// @author maocy
// @history 150119
//==========================================================
function FE3dGeneralColorSkeletonEffect(o){
   o = RClass.inherits(this, o, FE3dAutomaticEffect);
   //..........................................................
   // @attribute
   o._code            = 'general.color.skeleton';
   // @attribute
   o._supportSkeleton = true;
   //..........................................................
   // @method
   o.drawRenderable   = FE3dGeneralColorSkeletonEffect_drawRenderable;
   return o;
}

//==========================================================
// <T>绘制渲染对象。</T>
//
// @method
// @param region:FG3dRegion 渲染区域
// @param renderable:FG3dRenderable 渲染对象
//==========================================================
function FE3dGeneralColorSkeletonEffect_drawRenderable(region, renderable){
   var o = this;
   var c = o._graphicContext;
   var p = o._program;
   // 获得参数
   var vcp = region.calculate(EG3dRegionParameter.CameraPosition);
   var vld = region.calculate(EG3dRegionParameter.LightDirection);
   // 绑定材质
   var m = renderable.material();
   var mi = m.info();
   o.bindMaterial(m);
   // 绑定所有属性流
   p.setParameter('vc_model_matrix', renderable.currentMatrix());
   p.setParameter('vc_vp_matrix', region.calculate(EG3dRegionParameter.CameraViewProjectionMatrix));
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
   var bones = renderable.bones();
   if(bones){
      var boneCount = renderable._boneLimit;
      var data = RTypeArray.findTemp(EDataType.Float32, 16 * boneCount);
      for(var i = 0; i < boneCount; i++){
         var bone = bones.get(i);
         var boneMatrix = bone.matrix();
         boneMatrix.writeData(data, 16 * i);
      }
      p.setParameter('vc_bone_matrix', data);
   }
   // 绑定所有属性流
   //o.bindAttributes(renderable);
   // 绑定所有取样器
   //o.bindSamplers(renderable);
   // 绘制处理
   //c.drawTriangles(renderable.indexBuffer());
   // 绘制处理
   o.__base.FE3dAutomaticEffect.drawRenderable.call(o, region, renderable);
}
