function FE3dGeneralColorAutomaticEffect(o){
   o = RClass.inherits(this, o, FG3dAutomaticEffect);
   o._code          = 'general.color.automatic';
   o.buildMaterial  = FE3dGeneralColorAutomaticEffect_buildMaterial;
   o.drawRenderable = FE3dGeneralColorAutomaticEffect_drawRenderable;
   o.drawGroup      = FE3dGeneralColorAutomaticEffect_drawGroup;
   return o;
}
function FE3dGeneralColorAutomaticEffect_buildMaterial(p){
   var o = this;
   var f = p.activeInfo();
   var d = f.material;
   if(!d){
      d = f.material = new Float32Array(4 * 10);
   }
   var m = p.material();
   if(m._dirty){
      var mi = m.info();
      var i = 0;
      d[i++] = mi.colorMin;
      d[i++] = mi.colorMax;
      d[i++] = mi.colorRate;
      d[i++] = mi.colorMerge;
      d[i++] = mi.alphaBase;
      if(mi.optionAlpha){
         d[i++] = mi.alphaRate;
      }else{
         d[i++] = 1;
      }
      d[i++] = 0;
      d[i++] = 0;
      i += mi.ambientColor.copyArray(d, i);
      i += mi.diffuseColor.copyArray(d, i);
      i += mi.specularColor.copyArray(d, i);
      d[i++] = mi.specularBase;
      d[i++] = mi.specularLevel;
      d[i++] = mi.specularAverage;
      d[i++] = mi.specularShadow;
      i += mi.reflectColor.copyArray(d, i);
      d[i++] = 0;
      d[i++] = 0;
      d[i++] = 1.0 - mi.reflectMerge;
      d[i++] = mi.reflectMerge;
      i += mi.emissiveColor.copyArray(d, i);
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
      o.buildMaterial(pr);
      p.setParameter('fc_materials', pr.activeInfo().material);
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
