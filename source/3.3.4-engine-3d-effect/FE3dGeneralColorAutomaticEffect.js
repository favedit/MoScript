//==========================================================
// <T>通用自动渲染器。</T>
//
// @author maocy
// @history 150119
//==========================================================
function FE3dGeneralColorAutomaticEffect(o){
   o = RClass.inherits(this, o, FG3dAutomaticEffect);
   //..........................................................
   // @attribute
   o._code          = 'general.color.automatic';
   //..........................................................
   // @method
   o.drawRenderable = FE3dGeneralColorAutomaticEffect_drawRenderable;
   o.drawGroup      = FE3dGeneralColorAutomaticEffect_drawGroup;
   return o;
}

//==========================================================
// <T>绘制渲染对象。</T>
//
// @method
// @param pg:region:FG3dRegion 渲染区域
// @param pr:renderable:FG3dRenderable 渲染对象
//==========================================================
function FE3dGeneralColorAutomaticEffect_drawRenderable(pg, pr){
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
   // 设置骨头集合
   if(pr._optionMerge){
      var ms = pr.mergeRenderables();
      var mc = ms.count();
      var d = RTypeArray.findTemp(EDataType.Float, 16 * mc);
      for(var i = 0; i < mc; i++){
         var m = ms.get(i);
         m.currentMatrix().writeData(d, 16 * i);
      }
      p.setParameter('vc_model_matrix', d);
   }else{
      p.setParameter('vc_model_matrix', pr.currentMatrix());
   }
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

//==========================================================
// <T>绘制渲染集合。</T>
//
// @method
// @param pg:region:MG3dRegion 渲染区域
// @param pm:material:FG3dMaterial 材质
// @param pi:offset:Integer 开始位置
// @param pc:count:Integer 总数
//==========================================================
function FE3dGeneralColorAutomaticEffect_drawGroup(pg, pm, pi, pc){
   var o = this;
   if(pc > 1){
      var mc = RConsole.find(FE3rModelConsole);
      var md = mc.merge(o, pg, pi, pc);
      if(md){
         var rs = md.meshes();
         var c = rs.count();
         for(var i = 0; i < c; i++){
            var r = rs.getAt(i);
            var f = r.selectInfo(pg.spaceName());
            var e = f.effect;
            if(!e){
               e = f.effect = RConsole.find(FG3dEffectConsole).find(o._graphicContext, pg, r);
            }
            o._graphicContext.setProgram(e.program());
            e.drawRenderable(pg, r);
         }
         return;
      }
   }
   o.__base.FG3dAutomaticEffect.drawGroup.call(o, pg, pm, pi, pc)
}
