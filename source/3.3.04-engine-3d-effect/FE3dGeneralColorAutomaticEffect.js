//==========================================================
// <T>通用自动渲染器。</T>
//
// @author maocy
// @history 150119
//==========================================================
MO.FE3dGeneralColorAutomaticEffect = function FE3dGeneralColorAutomaticEffect(o){
   o = MO.Class.inherits(this, o, MO.FE3dAutomaticEffect);
   //..........................................................
   // @attribute
   o._code          = 'general.color.automatic';
   //..........................................................
   // @method
   o.buildMaterial  = MO.FE3dGeneralColorAutomaticEffect_buildMaterial;
   o.drawRenderable = MO.FE3dGeneralColorAutomaticEffect_drawRenderable;
   return o;
}

//==========================================================
// <T>建立材质数据。</T>
//
// @method
// @param effectInfo:FG3dEffectInfo 渲染对象
// @param renderable:FG3dRenderable 渲染对象
//==========================================================
MO.FE3dGeneralColorAutomaticEffect_buildMaterial = function FE3dGeneralColorAutomaticEffect_buildMaterial(effectInfo, renderable){
   var o = this;
   var material = renderable.material();
   // 建立容器
   var data = effectInfo.material;
   if(!data){
      data = effectInfo.material = MO.Class.create(MO.FFloatStream);
      data.setLength(40);
      material._dirty = true;
   }
   // 建立数据
   if(material._dirty){
      var info = material.info();
      data.reset();
      // 颜色透明（索引0）
      if(info.optionAlpha){
         data.writeFloat4(info.alphaBase, info.alphaRate, 0, 0);
      }else{
         data.writeFloat4(info.alphaBase, 1, 0, 0);
      }
      // 颜色设置（索引1）
      data.writeFloat4(info.colorMin, info.colorMax, info.colorBalance, info.colorRate);
      // 顶点颜色（索引2）
      data.writeColor4(info.vertexColor);
      // 环境颜色（索引3）
      data.writeColor4(info.ambientColor);
      // 散射颜色（索引4）
      data.writeColor4(info.diffuseColor);
      // 高光颜色（索引5）
      data.writeColor4(info.specularColor);
      // 高光参数（索引6）
      data.writeFloat4(info.specularBase, info.specularLevel, info.specularAverage, info.specularShadow);
      // 反射颜色（索引7）
      data.writeColor4(info.reflectColor);
      // 反射参数（索引8）
      data.writeFloat4(0, 0, 1 - info.reflectMerge, info.reflectMerge);
      // 发光颜色（索引9）
      data.writeColor4(info.emissiveColor);
      material._dirty = false;
   }
}

//==========================================================
// <T>绘制渲染对象。</T>
//
// @method
// @param region:FG3dRegion 渲染区域
// @param renderable:FG3dRenderable 渲染对象
//==========================================================
MO.FE3dGeneralColorAutomaticEffect_drawRenderable = function FE3dGeneralColorAutomaticEffect_drawRenderable(region, renderable){
   var o = this;
   var program = o._program;
   // 获得参数
   var cameraPosition = region.calculate(MO.EG3dRegionParameter.CameraPosition);
   var lightDirection = region.calculate(MO.EG3dRegionParameter.LightDirection);
   var vpMatrix = region.calculate(MO.EG3dRegionParameter.CameraViewProjectionMatrix)
   // 绑定材质
   var material = renderable.material();
   //var mi = m.info();
   o.bindMaterial(material);
   // 设置骨头集合
   if(renderable._optionMerge){
      var mergeRenderables = renderable.mergeRenderables();
      var mergeCount = mergeRenderables.count();
      var data = MO.Lang.TypeArray.findTemp(MO.EDataType.Float32, 16 * mergeCount);
      for(var i = 0; i < mergeCount; i++){
         var mergeRenderable = mergeRenderables.at(i);
         var matrix = mergeRenderable.currentMatrix();
         matrix.writeData(data, 16 * i);
      }
      program.setParameter('vc_model_matrix', data);
   }else{
      var matrix = renderable.currentMatrix();
      program.setParameter('vc_model_matrix', matrix);
   }
   program.setParameter('vc_vp_matrix', vpMatrix);
   program.setParameter('vc_camera_position', cameraPosition);
   program.setParameter('vc_light_direction', lightDirection);
   program.setParameter('fc_camera_position', cameraPosition);
   program.setParameter('fc_light_direction', lightDirection);
   // 设置材质
   if(o._supportMaterialMap){
      var materialId = renderable._materialId;
      program.setParameter4('fc_material', 1 / 32, materialId / 512, 0, 0);
   }else{
      var info = renderable.activeInfo();
      o.buildMaterial(info, renderable);
      program.setParameter('fc_materials', info.material.memory());
   }
   //program.setParameter('fc_specular_view_color', mi.specularViewColor);
   //program.setParameter4('fc_specular_view', mi.specularViewBase, mi.specularViewRate, mi.specularViewAverage, mi.specularViewShadow);
   // 绘制处理
   o.__base.FE3dAutomaticEffect.drawRenderable.call(o, region, renderable);
}
