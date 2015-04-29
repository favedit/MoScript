//==========================================================
// <T>通用自动渲染器。</T>
//
// @author maocy
// @history 150119
//==========================================================
function FE3dGeneralColorAutomaticEffect(o){
   o = RClass.inherits(this, o, FE3dAutomaticEffect);
   //..........................................................
   // @attribute
   o._code          = 'general.color.automatic';
   //..........................................................
   // @method
   o.buildMaterial  = FE3dGeneralColorAutomaticEffect_buildMaterial;
   o.drawRenderable = FE3dGeneralColorAutomaticEffect_drawRenderable;
   return o;
}

//==========================================================
// <T>建立材质数据。</T>
//
// @method
// @param p:renderable:FG3dRenderable 渲染对象
//==========================================================
function FE3dGeneralColorAutomaticEffect_buildMaterial(f, p){
   var o = this;
   var m = p.material();
   // 建立容器
   var d = f.material;
   if(!d){
      d = f.material = RClass.create(FFloatStream);
      d.setLength(40);
      m._dirty = true;
   }
   // 建立数据
   if(m._dirty){
      var mi = m.info();
      d.reset();
      // 颜色设置（索引0）
      d.writeFloat4(mi.colorMin, mi.colorMax, mi.colorRate, mi.colorMerge);
      // 颜色透明（索引1）
      if(mi.optionAlpha){
         d.writeFloat4(mi.alphaBase, mi.alphaRate, 0, 0);
      }else{
         d.writeFloat4(mi.alphaBase, 1, 0, 0);
      }
      // 环境颜色（索引2）
      d.writeColor4(mi.ambientColor);
      // 散射颜色（索引3）
      d.writeColor4(mi.diffuseColor);
      // 高光颜色（索引4）
      d.writeColor4(mi.specularColor);
      // 高光参数（索引5）
      d.writeFloat4(mi.specularBase, mi.specularLevel, mi.specularAverage, mi.specularShadow);
      // 反射颜色（索引6）
      d.writeColor4(mi.reflectColor);
      // 反射参数（索引7）
      d.writeFloat4(0, 0, 1 - mi.reflectMerge, mi.reflectMerge);
      // 发光颜色（索引8）
      d.writeColor4(mi.emissiveColor);
      m._dirty = false;
   }
}

//==========================================================
// <T>绘制渲染对象。</T>
//
// @method
// @param region:FG3dRegion 渲染区域
// @param renderable:FG3dRenderable 渲染对象
//==========================================================
function FE3dGeneralColorAutomaticEffect_drawRenderable(pg, renderable){
   var o = this;
   var c = o._graphicContext;
   var p = o._program;
   // 获得参数
   var vcp = pg.calculate(EG3dRegionParameter.CameraPosition);
   var vld = pg.calculate(EG3dRegionParameter.LightDirection);
   // 绑定材质
   var m = renderable.material();
   var mi = m.info();
   o.bindMaterial(m);
   // 设置骨头集合
   if(renderable._optionMerge){
      var ms = renderable.mergeRenderables();
      var mc = ms.count();
      var d = RTypeArray.findTemp(EDataType.Float32, 16 * mc);
      for(var i = 0; i < mc; i++){
         var m = ms.getAt(i);
         m.currentMatrix().writeData(d, 16 * i);
      }
      p.setParameter('vc_model_matrix', d);
   }else{
      p.setParameter('vc_model_matrix', renderable.currentMatrix());
   }
   p.setParameter('vc_vp_matrix', pg.calculate(EG3dRegionParameter.CameraViewProjectionMatrix));
   p.setParameter('vc_camera_position', vcp);
   p.setParameter('vc_light_direction', vld);
   p.setParameter('fc_camera_position', vcp);
   p.setParameter('fc_light_direction', vld);
   // 设置材质
   if(o._supportMaterialMap){
      var i = renderable._materialId;
      p.setParameter4('fc_material', 1/32, i/512, 0, 0);
   }else{
      var f = renderable.activeInfo();
      o.buildMaterial(f, renderable);
      p.setParameter('fc_materials', f.material.memory());
   }
   //p.setParameter('fc_specular_view_color', mi.specularViewColor);
   //p.setParameter4('fc_specular_view', mi.specularViewBase, mi.specularViewRate, mi.specularViewAverage, mi.specularViewShadow);
   // 绘制处理
   o.__base.FE3dAutomaticEffect.drawRenderable.call(o, pg, renderable);
}
