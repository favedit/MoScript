//==========================================================
// <T>通用骨骼渲染器。</T>
//
// @author maocy
// @history 150119
//==========================================================
MO.FE3dGeneralColorSkeletonEffect = function FE3dGeneralColorSkeletonEffect(o){
   o = MO.Class.inherits(this, o, MO.FE3dAutomaticEffect);
   //..........................................................
   // @attribute
   o._code            = 'general.color.skeleton';
   // @attribute
   o._supportSkeleton = true;
   //..........................................................
   // @method
   o.drawRenderable   = MO.FE3dGeneralColorSkeletonEffect_drawRenderable;
   return o;
}

//==========================================================
// <T>绘制渲染对象。</T>
//
// @method
// @param region:FG3dRegion 渲染区域
// @param renderable:FG3dRenderable 渲染对象
//==========================================================
MO.FE3dGeneralColorSkeletonEffect_drawRenderable = function FE3dGeneralColorSkeletonEffect_drawRenderable(region, renderable){
   var o = this;
   var c = o._graphicContext;
   var program = o._program;
   // 获得参数
   var vcp = region.calculate(MO.EG3dRegionParameter.CameraPosition);
   var vld = region.calculate(MO.EG3dRegionParameter.LightDirection);
   // 绑定材质
   var m = renderable.material();
   var mi = m.info();
   o.bindMaterial(m);
   // 绑定所有属性流
   program.setParameter('vc_model_matrix', renderable.currentMatrix());
   program.setParameter('vc_vp_matrix', region.calculate(MO.EG3dRegionParameter.CameraViewProjectionMatrix));
   program.setParameter('vc_camera_position', vcp);
   program.setParameter('vc_light_direction', vld);
   program.setParameter('fc_camera_position', vcp);
   program.setParameter('fc_light_direction', vld);
   // 设置材质
   program.setParameter('fc_color', mi.ambientColor);
   program.setParameter4('fc_vertex_color', mi.colorMin, mi.colorMax, mi.colorRate, mi.colorMerge);
   program.setParameter4('fc_alpha', mi.alphaBase, mi.alphaRate, mi.alphaLevel, mi.alphaMerge);
   program.setParameter('fc_ambient_color', mi.ambientColor);
   program.setParameter('fc_diffuse_color', mi.diffuseColor);
   program.setParameter('fc_specular_color', mi.specularColor);
   program.setParameter4('fc_specular', mi.specularBase, mi.specularLevel, mi.specularAverage, mi.specularShadow);
   program.setParameter('fc_specular_view_color', mi.specularViewColor);
   program.setParameter4('fc_specular_view', mi.specularViewBase, mi.specularViewRate, mi.specularViewAverage, mi.specularViewShadow);
   program.setParameter('fc_reflect_color', mi.reflectColor);
   // 设置骨头集合
   var bones = renderable.bones();
   if(bones){
      var boneCount = renderable._boneLimit;
      var data = MO.Lang.TypeArray.findTemp(MO.EDataType.Float32, 12 * boneCount);
      for(var i = 0; i < boneCount; i++){
         var bone = bones.at(i);
         var boneMatrix = bone.matrix();
         boneMatrix.writeData4x3(data, 12 * i);
      }
      program.setParameter('vc_bone_matrix', data);
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
