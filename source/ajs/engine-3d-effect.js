function FE3dGeneralColorAutomaticEffect(o){
   o = RClass.inherits(this, o, FG3dAutomaticEffect);
   o._code          = 'general.color.automatic';
   o.buildMaterial  = FE3dGeneralColorAutomaticEffect_buildMaterial;
   o.drawRenderable = FE3dGeneralColorAutomaticEffect_drawRenderable;
   o.drawGroup      = FE3dGeneralColorAutomaticEffect_drawGroup;
   return o;
}
function FE3dGeneralColorAutomaticEffect_buildMaterial(f, p){
   var o = this;
   var m = p.material();
   var d = f.material;
   if(!d){
      d = f.material = RClass.create(FFloatStream);
      d.setLength(40);
      m._dirty = true;
   }
   if(m._dirty){
      var mi = m.info();
      d.reset();
      d.writeFloat4(mi.colorMin, mi.colorMax, mi.colorRate, mi.colorMerge);
      if(mi.optionAlpha){
         d.writeFloat4(mi.alphaBase, mi.alphaRate, 0, 0);
      }else{
         d.writeFloat4(mi.alphaBase, 1, 0, 0);
      }
      d.writeColor4(mi.ambientColor);
      d.writeColor4(mi.diffuseColor);
      d.writeColor4(mi.specularColor);
      d.writeFloat4(mi.specularBase, mi.specularLevel, mi.specularAverage, mi.specularShadow);
      d.writeColor4(mi.reflectColor);
      d.writeFloat4(0, 0, 1 - mi.reflectMerge, mi.reflectMerge);
      d.writeColor4(mi.emissiveColor);
      m._dirty = false;
   }
}
function FE3dGeneralColorAutomaticEffect_drawRenderable(pg, pr){
   var o = this;
   var c = o._graphicContext;
   var p = o._program;
   var vcp = pg.calculate(EG3dRegionParameter.CameraPosition);
   var vld = pg.calculate(EG3dRegionParameter.LightDirection);
   var m = pr.material();
   var mi = m.info();
   o.bindMaterial(m);
   if(pr._optionMerge){
      var ms = pr.mergeRenderables();
      var mc = ms.count();
      var d = RTypeArray.findTemp(EDataType.Float, 16 * mc);
      for(var i = 0; i < mc; i++){
         var m = ms.getAt(i);
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
   if(o._supportMaterialMap){
      var i = pr._materialId;
      p.setParameter4('fc_material', 1/32, i/512, 0, 0);
   }else{
      var f = pr.activeInfo();
      o.buildMaterial(f, pr);
      p.setParameter('fc_materials', f.material.memory());
   }
   o.__base.FG3dAutomaticEffect.drawRenderable.call(o, pg, pr);
}
function FE3dGeneralColorAutomaticEffect_drawGroup(pg, pr, pi, pc){
   var o = this;
   if(pc > 1){
      var mc = RConsole.find(FE3rModelConsole);
      var md = mc.merge(o, pg, pi, pc);
      if(md){
         var e = null;
         var gc = o._graphicContext;
         var rs = md.meshes();
         var c = rs.count();
         var sn = pg.spaceName();
         for(var i = 0; i < c; i++){
            var r = rs.getAt(i);
            var f = r.selectInfo(sn);
            e = f.effect;
            if(!e){
               e = f.effect = RConsole.find(FG3dEffectConsole).find(gc, pg, r);
            }
         }
         return e.drawGroup(pg, rs, 0, c)
      }
   }
   o.__base.FG3dAutomaticEffect.drawGroup.call(o, pg, pr, pi, pc)
}
