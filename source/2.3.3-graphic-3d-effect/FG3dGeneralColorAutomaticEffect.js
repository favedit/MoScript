//==========================================================
// <T>通用自动渲染器。</T>
//
// @author maocy
// @history 150119
//==========================================================
MO.Graphic3d.FG3dGeneralColorAutomaticEffect = function FG3dGeneralColorAutomaticEffect(o){
   o = RClass.inherits(this, o, MO.Graphic3d.FG3dAutomaticEffect);
   //..........................................................
   // @attribute
   o._code          = 'general.color.automatic';
   //..........................................................
   // @method
   o.drawRenderable = FG3dGeneralColorAutomaticEffect_drawRenderable;
   return o;

   //==========================================================
   // <T>绘制渲染对象。</T>
   //
   // @method
   // @param pg:region:FG3dRegion 渲染区域
   // @param pr:renderable:FG3dRenderable 渲染对象
   //==========================================================
   function FG3dGeneralColorAutomaticEffect_drawRenderable(pg, pr){
      var o = this;
      var c = o._graphicContext;
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
      if(o._supportMaterialMap){
         var i = pr._materialId;
         p.setParameter4('fc_material', 1/32, i/512, 0, 0);
      }else{
         p.setParameter('fc_ambient_color', mi.ambientColor);
         p.setParameter('fc_diffuse_color', mi.diffuseColor);
         p.setParameter('fc_specular_color', mi.specularColor);
         p.setParameter('fc_reflect_color', mi.reflectColor);
         p.setParameter('fc_emissive_color', mi.emissiveColor);
      }
      p.setParameter4('fc_color', mi.colorMin, mi.colorMax, mi.colorRate, mi.colorMerge);
      if(mi.optionAlpha){
         p.setParameter4('fc_alpha', mi.alphaBase, mi.alphaRate, 0, 0);
      }else{
         p.setParameter4('fc_alpha', 0, 1, 0, 0);
      }
      p.setParameter4('fc_specular', mi.specularBase, mi.specularLevel, mi.specularAverage, mi.specularShadow);
      //p.setParameter('fc_specular_view_color', mi.specularViewColor);
      //p.setParameter4('fc_specular_view', mi.specularViewBase, mi.specularViewRate, mi.specularViewAverage, mi.specularViewShadow);
      p.setParameter4('fc_reflect', 0, 0, 1.0 - mi.reflectMerge, mi.reflectMerge);
      // 绘制处理
      o.__base.FG3dAutomaticEffect.drawRenderable.call(o, pg, pr);
   }
}
