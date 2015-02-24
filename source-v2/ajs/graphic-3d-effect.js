function FG3dAutomaticEffect(o){
   o = RClass.inherits(this, o, FG3dEffect);
   o._optionBlendMode = true;
   o._supportInstance         = false;
   o._supportLayout           = false;
   o._supportMaterialMap      = false;
   o._supportVertexColor      = true;
   o._supportVertexCoord      = true;
   o._supportVertexNormal     = true;
   o._supportVertexNormalFull = true;
   o._supportSkeleton         = false;
   o._supportAlpha            = true;
   o._supportAmbient          = true;
   o._supportDiffuse          = true;
   o._supportDiffuseView      = true;
   o._supportSpecularColor    = true;
   o._supportSpecularLevel    = true;
   o._supportSpecularView     = true;
   o._supportLight            = true;
   o._supportReflect          = true;
   o._supportRefract          = true;
   o._supportEmissive         = true;
   o._supportHeight           = true;
   o._supportEnvironment      = true;
   o._dynamicSkeleton         = true;
   o.setup                    = FG3dAutomaticEffect_setup;
   o.buildInfo                = FG3dAutomaticEffect_buildInfo;
   o.bindAttributes           = FG3dAutomaticEffect_bindAttributes;
   o.bindSamplers             = FG3dAutomaticEffect_bindSamplers;
   o.bindMaterial             = FG3dAutomaticEffect_bindMaterial;
   o.drawRenderable           = FG3dAutomaticEffect_drawRenderable;
   return o;
}
function FG3dAutomaticEffect_setup(){
   var o = this;
   var c = o._graphicContext;
   var cp = c.capability();
   o._supportLayout = cp.optionLayout;
}
function FG3dAutomaticEffect_buildInfo(pt, pc){
   var o = this;
   var c = o._graphicContext;
   var cb = c.capability();
   var s = new TString();
   if(cb.optionMaterialMap){
      s.append("|OM");
      pt.setBoolean("option.material.map", true);
      o._supportMaterialMap = true;
   }
   if(pc.optionNormalInvert){
      s.append("|ON");
      pt.setBoolean("option.normal.invert", true);
      o._supportNormalInvert = true;
   }
   var ac = pc.attributeContains(EG3dAttribute.Color);
   o._dynamicVertexColor = (o._supportVertexColor && ac);
   if(o._dynamicVertexColor){
      s.append("|AC");
      pt.setBoolean("vertex.attribute.color", true);
   }
   var ad = pc.attributeContains(EG3dAttribute.Coord);
   o._dynamicVertexCoord = (o._supportVertexCoord && ad);
   if(o._dynamicVertexCoord){
      s.append("|AD");
      pt.setBoolean("vertex.attribute.coord", true);
   }
   var an = pc.attributeContains(EG3dAttribute.Normal);
   o._dynamicVertexNormal = (o._supportVertexNormal && an);
   if(o._dynamicVertexNormal){
      s.append("|AN");
      pt.setBoolean("vertex.attribute.normal", true);
   }
   var ab = pc.attributeContains(EG3dAttribute.Binormal);
   var at = pc.attributeContains(EG3dAttribute.Tangent);
   var af = (an && ab && at);
   o._dynamicVertexNormalFull = (o._supportVertexNormalFull && af);
   if(o._dynamicVertexNormalFull){
      s.append("|AF");
      pt.setBoolean("vertex.attribute.normal.full", true);
   }
   o._dynamicInstance = (o._supportInstance && cb.optionInstance);
   if(o._dynamicInstance){
      s.append("|SI");
      if(pc){
         pt.setBoolean("support.instance", true);
      }
   }
   o._dynamicSkeleton = o._supportSkeleton;
   if(o._dynamicSkeleton){
      s.append("|SS");
      if(pc){
         pt.setBoolean("support.skeleton", true);
      }
   }
   var sdf  = pc.samplerContains(EG3dSampler.Diffuse);
   o._dynamicAlpha = o._supportAlpha;
   if(o._dynamicAlpha){
      s.append("|RA");
      if(pc){
         pt.setBoolean("support.alpha", true);
      }
      o._optionBlendMode = true;
   }else{
      o._optionBlendMode = false;
   }
   o._dynamicAmbient = o._supportAmbient;
   if(o._dynamicAmbient){
      s.append("|TA");
      if(pc){
         pt.setBoolean("support.ambient", true);
      }
      if(sdf){
         s.append("|TAS");
         if(pc){
            pt.setBoolean("support.ambient.sampler", true);
         }
      }
   }
   var snr = pc.samplerContains(EG3dSampler.Normal);
   o._dynamicDiffuse = o._supportDiffuse && (o._dynamicVertexNormal || snr);
   if(o._supportDiffuse){
      if(pc){
         pt.setBoolean("support.diffuse", true);
      }
      if(snr){
         s.append("|TDD");
         if(pc){
            pt.setBoolean("support.dump", true);
            pt.setBoolean("support.diffuse.dump", true);
         }
      }else if(o._dynamicVertexNormal){
         s.append("|TDN");
         if(pc){
            pt.setBoolean("support.diffuse.normal", true);
         }
      }
   }
   o._dynamicDiffuseView = (o._supportDiffuseView && (o._dynamicVertexNormal || snr));
   if(o._supportDiffuseView){
      if(pc){
         pt.setBoolean("support.diffuse.view", true);
      }
      if(snr){
         s.append("|TDVD");
         if(pc){
            pt.setBoolean("support.dump", true);
            pt.setBoolean("support.diffuse.view.dump", true);
         }
      }else if(o._dynamicVertexNormal){
         s.append("|TDVN");
         if(pc){
            pt.setBoolean("support.diffuse.view.normal", true);
         }
      }
   }
   var spc = pc.samplerContains(EG3dSampler.SpecularColor);
   var spl = pc.samplerContains(EG3dSampler.SpecularLevel);
   o._dynamicSpecularColor = (o._supportSpecularColor && spc);
   o._dynamicSpecularLevel = (o._supportSpecularLevel && spl);
   if((o._dynamicSpecularColor || o._dynamicSpecularLevel) && o._dynamicVertexNormal){
      s.append("|TS");
      if(pc){
         pt.setBoolean("support.specular", true);
      }
      if(o._dynamicSpecularColor){
         s.append("|TSC");
         if(pc){
            pt.setBoolean("support.specular.color", true);
         }
      }
      if(o._dynamicSpecularLevel){
         s.append("|TSL");
         if(pc){
            pt.setBoolean("support.specular.level", true);
         }
      }else{
         s.append("|NSL");
         if(pc){
            pt.setBoolean("support.specular.normal", true);
         }
      }
   }
   o._dynamicSpecularView = o._supportSpecularView;
   if(o._dynamicSpecularView && o._dynamicVertexNormal){
      s.append("|TSV");
      if(pc){
         pt.setBoolean("support.specular.view", true);
      }
      if(o._dynamicSpecularColor){
         s.append("|TSVC");
         if(pc){
            pt.setBoolean("support.specular.view.color", true);
         }
      }
      if(o._dynamicSpecularLevel){
         s.append("|TSVL");
         if(pc){
            pt.setBoolean("support.specular.view.level", true);
         }
      }else{
         s.append("|NSVL");
         if(pc){
            pt.setBoolean("support.specular.view.normal", true);
         }
      }
   }
   var slg = pc.samplerContains(EG3dSampler.Light);
   o._dynamicLight = (o._supportLight && slg);
   if(o._dynamicLight){
      s.append("|TL");
      if(pc){
         pt.setBoolean("support.sampler.light", true);
         pt.setBoolean("support.light", true);
      }
   }
   var slr = pc.samplerContains(EG3dSampler.Reflect);
   o._dynamicReflect = (o._supportReflect && slr);
   if(o._dynamicReflect){
      s.append("|TRL");
      if(pc){
         pt.setBoolean("support.sampler.light", true);
         pt.setBoolean("support.reflect", true);
      }
   }
   var slf = pc.samplerContains(EG3dSampler.Refract);
   o._dynamicRefract = (o._supportRefract && slf);
   if(o._dynamicRefract){
      s.append("|TRF");
      if(pc){
         pt.setBoolean("support.sampler.light", true);
         pt.setBoolean("support.refract", true);
      }
   }
   var sle = pc.samplerContains(EG3dSampler.Emissive);
   o._dynamicEmissive = (o._supportEmissive && sle);
   if(o._dynamicEmissive){
      s.append("|TLE");
      if(pc){
         pt.setBoolean("support.sampler.light", true);
         pt.setBoolean("support.emissive", true);
      }
   }
   var shg = pc.samplerContains(EG3dSampler.Height);
   o._dynamicHeight = (o._supportHeight && shg);
   if(o._dynamicHeight){
      s.append("|TH");
      if(pc){
         pt.setBoolean("support.height", true);
      }
   }
   var sen = pc.samplerContains(EG3dSampler.Environment);
   o._dynamicEnvironment = (o._supportEnvironment && sen);
   if(o._dynamicEnvironment){
      s.append("|TE");
      if(pc){
         pt.setBoolean("support.environment", true);
      }
   }
   o._dynamicInstance = o._supportInstance;
   if(o._dynamicInstance){
      var ic = cb.calculateInstanceCount(pc.vertexBoneCount, pc.vertexCount);
      pt.set("instance.count", ic);
   }
   if(o._dynamicSkeleton){
      var bc = cb.calculateBoneCount(pc.vertexBoneCount, pc.vertexCount);
      s.append("|B" + bc);
      pt.set("bone.count", bc);
      pt.setBoolean("support.bone.weight.1", true);
      pt.setBoolean("support.bone.weight.2", true);
      pt.setBoolean("support.bone.weight.3", true);
      pt.setBoolean("support.bone.weight.4", true);
   }
   pt.code = s.toString();
}
function FG3dAutomaticEffect_bindAttributes(p){
   var o = this;
   var c = o._graphicContext;
   var g = o._program;
   if(g.hasAttribute()){
      var as = g.attributes();
      var ac = as.count();
      for(var n = 0; n < ac; n++){
         var a = as.value(n);
         if(a._statusUsed){
            var vb = p.findVertexBuffer(a._linker);
            g.setAttribute(a._name, vb, vb._formatCd);
         }
      }
   }
}
function FG3dAutomaticEffect_bindSamplers(p){
   var o = this;
   var g = o._program;
   if(g.hasSampler()){
      var ss = g.samplers();
      var sc = ss.count();
      for(var n = 0; n < sc; n++){
         var s = ss.value(n);
         if(s._bind && s._statusUsed){
            var ln = s.linker();
            var sp = p.findTexture(ln);
            g.setSampler(s.name(), sp.texture());
         }
      }
   }
}
function FG3dAutomaticEffect_bindMaterial(p){
   var o = this;
   var c = o._graphicContext;
   var m = p.info();
   if(m.optionAlpha){
      c.setBlendFactors(o._stateBlend, o._stateBlendSourceCd, o._stateBlendTargetCd);
   }else{
      c.setBlendFactors(false);
   }
   if(m.optionDouble){
      c.setCullingMode(false);
   }else{
      c.setCullingMode(o._stateDepth, o._stateCullCd);
   }
}
function FG3dAutomaticEffect_drawRenderable(pg, pr){
   var o = this;
   var c = o._graphicContext;
   var g = o._program;
   var l = null;
   if(o._supportLayout){
      var f = pr.activeInfo();
      l = f.layout;
      if(!l){
         l = f.layout = c.createLayout();
         l.bind();
         o.bindAttributes(pr);
         l.unbind();
      }
      l.active();
   }else{
      o.bindAttributes(pr);
   }
   if(o._supportMaterialMap){
      g.setSampler('fs_material', pg.materialMap().texture());
   }
   o.bindSamplers(pr);
   c.drawTriangles(pr.indexBuffer());
   if(o._supportLayout){
      l.deactive();
   }
}
function FG3dControlAutomaticEffect(o){
   o = RClass.inherits(this, o, FG3dAutomaticEffect);
   o._code          = 'control.automatic';
   o.drawRenderable = FG3dControlAutomaticEffect_drawRenderable;
   return o;
}
function FG3dControlAutomaticEffect_drawRenderable(pg, pr){
   var o = this;
   var c = o._graphicContext;
   var p = o._program;
   var m = pr.material();
   var mi = m.info();
   o.bindMaterial(m);
   p.setParameter('vc_model_matrix', pr.currentMatrix());
   p.setParameter('vc_vp_matrix', pg.calculate(EG3dRegionParameter.CameraViewProjectionMatrix));
   p.setParameter4('fc_alpha', mi.alphaBase, mi.alphaRate, mi.alphaLevel, mi.alphaMerge);
   p.setParameter('fc_ambient_color', mi.ambientColor);
   o.bindAttributes(pr);
   o.bindSamplers(pr);
   c.drawTriangles(pr.indexBuffer());
}
function FG3dControlFrameEffect(o){
   o = RClass.inherits(this, o, FG3dAutomaticEffect);
   o._code          = 'control.frame';
   o.drawRenderable = FG3dControlFrameEffect_drawRenderable;
   return o;
}
function FG3dControlFrameEffect_drawRenderable(pg, pr){
   var o = this;
   var c = o._graphicContext;
   var p = o._program;
   var vcp = pg.calculate(EG3dRegionParameter.CameraPosition);
   var vld = pg.calculate(EG3dRegionParameter.LightDirection);
   var m = pr.material();
   var mi = m.info();
   o.bindMaterial(m);
   p.setParameter('vc_model_matrix', pr.currentMatrix());
   p.setParameter('vc_vp_matrix', pg.calculate(EG3dRegionParameter.CameraViewProjectionMatrix));
   p.setParameter('vc_camera_position', vcp);
   p.setParameter('vc_light_direction', vld);
   p.setParameter('fc_camera_position', vcp);
   p.setParameter('fc_light_direction', vld);
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
   p.setParameter4('fc_reflect', 0, 0, 1.0 - mi.reflectMerge, mi.reflectMerge);
   p.setParameter('fc_emissive_color', mi.emissiveColor);
   o.bindAttributes(pr);
   o.bindSamplers(pr);
   c.drawTriangles(pr.indexBuffer());
}
function FG3dControlPass(o){
   o = RClass.inherits(this, o, FG3dTechniquePass);
   o._code = 'control';
   return o;
}
function FG3dControlTechnique(o){
   o = RClass.inherits(this, o, FG3dTechnique);
   o._code        = 'control';
   o._passControl = null;
   o.setup       = FG3dControlTechnique_setup;
   o.passControl = FG3dControlTechnique_passControl;
   o.drawRegion  = FG3dControlTechnique_drawRegion;
   return o;
}
function FG3dControlTechnique_setup(){
   var o = this;
   o.__base.FG3dTechnique.setup.call(o);
   var ps = o._passes;
   var pd = o._passControl = RClass.create(FG3dControlPass);
   pd.linkGraphicContext(o);
   pd.setup();
   ps.push(pd);
}
function FG3dControlTechnique_passControl(){
   return this._passControl;
}
function FG3dControlTechnique_drawRegion(p){
   var o = this;
   o._graphicContext.clearDepth(1);
   o.__base.FG3dTechnique.drawRegion.call(o, p);
}
function FG3dGeneralColorAutomaticEffect(o){
   o = RClass.inherits(this, o, FG3dAutomaticEffect);
   o._code          = 'general.color.automatic';
   o.drawRenderable = FG3dGeneralColorAutomaticEffect_drawRenderable;
   return o;
}
function FG3dGeneralColorAutomaticEffect_drawRenderable(pg, pr){
   var o = this;
   var c = o._graphicContext;
   var p = o._program;
   var vcp = pg.calculate(EG3dRegionParameter.CameraPosition);
   var vld = pg.calculate(EG3dRegionParameter.LightDirection);
   var m = pr.material();
   var mi = m.info();
   o.bindMaterial(m);
   p.setParameter('vc_model_matrix', pr.currentMatrix());
   p.setParameter('vc_vp_matrix', pg.calculate(EG3dRegionParameter.CameraViewProjectionMatrix));
   p.setParameter('vc_camera_position', vcp);
   p.setParameter('vc_light_direction', vld);
   p.setParameter('fc_camera_position', vcp);
   p.setParameter('fc_light_direction', vld);
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
   p.setParameter4('fc_reflect', 0, 0, 1.0 - mi.reflectMerge, mi.reflectMerge);
   o.__base.FG3dAutomaticEffect.drawRenderable.call(o, pg, pr);
}
function FG3dGeneralColorPass(o){
   o = RClass.inherits(this, o, FG3dTechniquePass);
   o._code = 'color';
   return o;
}
function FG3dGeneralColorSkeletonEffect(o){
   o = RClass.inherits(this, o, FG3dAutomaticEffect);
   o._code            = 'general.color.skeleton';
   o._supportSkeleton = true;
   o.drawRenderable   = FG3dGeneralColorSkeletonEffect_drawRenderable;
   return o;
}
function FG3dGeneralColorSkeletonEffect_drawRenderable(pg, pr){
   var o = this;
   var c = o._graphicContext;
   var p = o._program;
   var vcp = pg.calculate(EG3dRegionParameter.CameraPosition);
   var vld = pg.calculate(EG3dRegionParameter.LightDirection);
   var m = pr.material();
   var mi = m.info();
   o.bindMaterial(m);
   p.setParameter('vc_model_matrix', pr.currentMatrix());
   p.setParameter('vc_vp_matrix', pg.calculate(EG3dRegionParameter.CameraViewProjectionMatrix));
   p.setParameter('vc_camera_position', vcp);
   p.setParameter('vc_light_direction', vld);
   p.setParameter('fc_camera_position', vcp);
   p.setParameter('fc_light_direction', vld);
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
   o.bindAttributes(pr);
   o.bindSamplers(pr);
   c.drawTriangles(pr.indexBuffer());
}
function FG3dGeneralTechnique(o){
   o = RClass.inherits(this, o, FG3dTechnique);
   o._code      = 'general';
   o._passColor = null;
   o.setup      = FG3dGeneralTechnique_setup;
   o.passColor  = FG3dGeneralTechnique_passColor;
   return o;
}
function FG3dGeneralTechnique_setup(){
   var o = this;
   o.__base.FG3dTechnique.setup.call(o);
   var p = o._passColor = RClass.create(FG3dGeneralColorPass);
   p.linkGraphicContext(o);
   p.setup();
   o._passes.push(p);
}
function FG3dGeneralTechnique_passColor(){
   return this._passColor;
}
function FG3dSelectAutomaticEffect(o){
   o = RClass.inherits(this, o, FG3dAutomaticEffect);
   o._code          = 'select.automatic';
   o.drawRenderable = FG3dSelectAutomaticEffect_drawRenderable;
   return o;
}
function FG3dSelectAutomaticEffect_drawRenderable(pg, pr, pi){
   var o = this;
   var c = o._graphicContext;
   var s = c.size();
   var p = o._program;
   var sx = pg._selectX;
   var sy = pg._selectY;
   var m = pr.material();
   var mi = m.info();
   o.bindMaterial(m);
   p.setParameter('vc_model_matrix', pr.currentMatrix());
   p.setParameter('vc_vp_matrix', pg.calculate(EG3dRegionParameter.CameraViewProjectionMatrix));
   p.setParameter4('vc_offset', s.width, s.height, 1 - (sx / s.width) * 2, (sy / s.height) * 2 - 1);
   var i = pi + 1;
   var i1 = i  & 0xFF;
   var i2 = (i >> 8) & 0xFF;
   var i3 = (i >> 16) & 0xFF;
   p.setParameter4('fc_index', i1 / 255, i2 / 255, i3 / 255, mi.alphaBase);
   o.bindAttributes(pr);
   o.bindSamplers(pr);
   c.drawTriangles(pr.indexBuffer());
}
function FG3dSelectPass(o){
   o = RClass.inherits(this, o, FG3dTechniquePass);
   o._code         = 'select';
   o._texture      = null;
   o._renderTarget = null;
   o._position     = null;
   o._data         = null;
   o.construct     = FG3dSelectPass_construct;
   o.setup         = FG3dSelectPass_setup;
   o.textureDepth  = FG3dSelectPass_texture;
   o.drawRegion    = FG3dSelectPass_drawRegion;
   return o;
}
function FG3dSelectPass_construct(){
   var o = this;
   o.__base.FG3dTechniquePass.construct.call(o);
   o._data = new Uint8Array(4);
   o._position = new SPoint2();
}
function FG3dSelectPass_setup(){
   var o = this;
   o.__base.FG3dTechniquePass.setup.call(o);
   var c = o._graphicContext;
   var T = o._texture = c.createFlatTexture();
   T.setFilter(EG3dSamplerFilter.Nearest, EG3dSamplerFilter.Nearest);
   T.setWrap(EG3dSamplerFilter.ClampToEdge, EG3dSamplerFilter.ClampToEdge);
   var t = o._renderTarget = c.createRenderTarget();
   t.size().set(1, 1);
   t.textures().push(T);
   t.build();
}
function FG3dSelectPass_texture(){
   return this._texture;
}
function FG3dSelectPass_drawRegion(p){
   var o = this;
   var c = o._graphicContext;
   var g = c._native;
   c.setRenderTarget(o._renderTarget);
   c.clear(0, 0, 0, 0, 1, 1);
   var rs = p.allRenderables();
   o.activeEffects(p, rs);
   var rc = rs.count();
   for(var i = 0; i < rc; i++){
      var r = rs.get(i);
      var e = r.activeEffect();
      c.setProgram(e.program());
      var d = r.display();
      if(!d._optionFace){
         e.drawRenderable(p, r, i);
      }
   }
   c.clearDepth(1);
   for(var i = 0; i < rc; i++){
      var r = rs.get(i);
      var e = r.activeEffect();
      c.setProgram(e.program());
      var d = r.display();
      if(d._optionFace){
         e.drawRenderable(p, r, i);
      }
   }
   g.readPixels(0, 0, 1, 1, g.RGBA, g.UNSIGNED_BYTE, o._data);
   var v = o._data[0] + (o._data[1] << 8) + (o._data[2] << 16);
   o._selectRenderable = null;
   if(v != 0){
      o._selectRenderable = rs.get(v - 1);
   }
}
function FG3dSelectSkeletonEffect(o){
   o = RClass.inherits(this, o, FG3dAutomaticEffect);
   o._code          = 'select.automatic';
   o.drawRenderable = FG3dSelectSkeletonEffect_drawRenderable;
   return o;
}
function FG3dSelectSkeletonEffect_drawRenderable(pg, pr, pi){
   var o = this;
   var c = o._graphicContext;
   var s = c.size();
   var p = o._program;
   var sx = pg._selectX;
   var sy = pg._selectY;
   var m = pr.material();
   var mi = m.info();
   o.bindMaterial(m);
   p.setParameter('vc_model_matrix', pr.currentMatrix());
   p.setParameter('vc_vp_matrix', pg.calculate(EG3dRegionParameter.CameraViewProjectionMatrix));
   p.setParameter4('vc_offset', s.width, s.height, 1 - (sx / s.width) * 2, (sy / s.height) * 2 - 1);
   var i = pi + 1;
   var i1 = i  & 0xFF;
   var i2 = (i >> 8) & 0xFF;
   var i3 = (i >> 16) & 0xFF;
   p.setParameter4('fc_index', i1 / 255, i2 / 255, i3 / 255, mi.alphaBase);
   o.bindAttributes(pr);
   o.bindSamplers(pr);
   c.drawTriangles(pr.indexBuffer());
}
function FG3dSelectTechnique(o){
   o = RClass.inherits(this, o, FG3dTechnique);
   o._code       = 'select';
   o._passSelect = null;
   o.setup       = FG3dSelectTechnique_setup;
   o.passSelect  = FG3dSelectTechnique_passSelect;
   o.test        = FG3dSelectTechnique_test;
   return o;
}
function FG3dSelectTechnique_setup(){
   var o = this;
   o.__base.FG3dTechnique.setup.call(o);
   var ps = o._passes;
   var pd = o._passSelect = RClass.create(FG3dSelectPass);
   pd.linkGraphicContext(o);
   pd.setup();
   ps.push(pd);
}
function FG3dSelectTechnique_passSelect(){
   return this._passSelect;
}
function FG3dSelectTechnique_test(p, x, y){
   var o = this;
   p._selectX = x;
   p._selectY = y;
   p.setTechnique(o);
   o.drawRegion(p);
   return o._passSelect._selectRenderable;
}
function FG3dShadowColorAutomaticEffect(o){
   o = RClass.inherits(this, o, FG3dAutomaticEffect);
   o._code          = 'shadow.color.automatic';
   o.drawRenderable = FG3dShadowColorAutomaticEffect_drawRenderable;
   return o;
}
function FG3dShadowColorAutomaticEffect_drawRenderable(pg, pr){
   var o = this;
   var c = o._graphicContext;
   var p = o._program;
   var vcp = pg.calculate(EG3dRegionParameter.CameraPosition);
   var vcvpm = pg.calculate(EG3dRegionParameter.CameraViewProjectionMatrix);
   var vld = pg.calculate(EG3dRegionParameter.LightDirection);
   var vlvm = pg.calculate(EG3dRegionParameter.LightViewMatrix);
   var vlvpm = pg.calculate(EG3dRegionParameter.LightViewProjectionMatrix);
   var vlci = pg.calculate(EG3dRegionParameter.LightInfo);
   var tp = pg.techniquePass();
   var m = pr.material();
   o.bindMaterial(m);
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
   o.bindAttributes(pr);
   p.setSampler('fs_light_depth', tp.textureDepth());
   o.bindSamplers(pr);
   c.drawTriangles(pr.indexBuffer());
}
function FG3dShadowColorPass(o){
   o = RClass.inherits(this, o, FG3dTechniquePass);
   o._code           = 'color';
   o._textureDepth   = null;
   o.textureDepth    = FG3dShadowColorPass_textureDepth;
   o.setTextureDepth = FG3dShadowColorPass_setTextureDepth;
   o.drawRegion      = FG3dShadowColorPass_drawRegion;
   return o;
}
function FG3dShadowColorPass_textureDepth(){
   return this._textureDepth;
}
function FG3dShadowColorPass_setTextureDepth(p){
   this._textureDepth = p;
}
function FG3dShadowColorPass_drawRegion(p){
   var o = this;
   var c = o._context;
   c.setRenderTarget(null);
   var bc = p._backgroundColor;
   o._context.clear(bc.red, bc.green, bc.blue, bc.alpha, 1);
   o.__base.FG3dTechniquePass.drawRegion.call(o, p)
}
function FG3dShadowColorSkeletonEffect(o){
   o = RClass.inherits(this, o, FG3dAutomaticEffect);
   o._code            = 'shadow.color.skeleton';
   o._supportSkeleton = true;
   o.drawRenderable   = FG3dShadowColorSkeletonEffect_drawRenderable;
   return o;
}
function FG3dShadowColorSkeletonEffect_drawRenderable(pr, r){
   var o = this;
   var c = o._graphicContext;
   var p = o._program;
   var prvp = pr.matrixViewProjection();
   var prcp = pr.cameraPosition();
   var prld = pr.lightDirection();
   if(p.hasAttribute()){
      var as = p.attributes();
      var ac = as.count();
      for(var n = 0; n < ac; n++){
         var a = as.value(n);
         if(a._statusUsed){
            var vb = r.findVertexBuffer(a._linker);
            if(vb == null){
               throw new TError("Can't find renderable vertex buffer. (linker={1})", a._linker);
            }
            p.setAttribute(a._name, vb, vb._formatCd);
         }
      }
   }
   if(p.hasSampler()){
      var ss = p.samplers();
      var sc = ss.count();
      for(var n = 0; n < sc; n++){
         var s = ss.value(n);
         if(s._statusUsed){
            var ln = s.linker();
            var sp = r.findTexture(ln);
            if(sp != null){
               p.setSampler(s.name(), sp.texture());
            }else{
               throw new TError("Can't find sampler. (linker={1})", ln);
            }
         }
      }
   }
   p.setParameter('vc_model_matrix', r.currentMatrix());
   p.setParameter('vc_vp_matrix', prvp);
   p.setParameter('vc_camera_position', prcp);
   p.setParameter('vc_light_direction', prld);
   p.setParameter('fc_camera_position', prcp);
   p.setParameter('fc_light_direction', prld);
   var m = r.material();
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
   var bs = r.bones();
   if(bs){
      var bc = bs.count();
      if(bc > 32){
         bc = 32;
      }
      var d = RTypeArray.findTemp(EDataType.Float, 16 * bc);
      for(var i = 0; i < bc; i++){
         var b = bs.get(i);
         var m = b.matrix();
         m.writeData(d, 16 * i);
      }
      p.setParameter('vc_bone_matrix', d);
   }
   var ib = r.indexBuffer();
   c.drawTriangles(ib, 0, ib._count);
}
function FG3dShadowDepthAutomaticEffect(o){
   o = RClass.inherits(this, o, FG3dAutomaticEffect);
   o._code          = 'shadow.depth.automatic';
   o.drawRenderable = FG3dShadowDepthAutomaticEffect_drawRenderable;
   return o;
}
function FG3dShadowDepthAutomaticEffect_drawRenderable(pg, pr){
   var o = this;
   var c = o._graphicContext;
   var p = o._program;
   var lvm = pg.calculate(EG3dRegionParameter.LightViewMatrix);
   var lvpm = pg.calculate(EG3dRegionParameter.LightViewProjectionMatrix);
   var lci = pg.calculate(EG3dRegionParameter.LightInfo);
   c.setBlendFactors(false);
   p.setParameter('vc_camera', lci);
   p.setParameter('vc_model_matrix', pr.currentMatrix());
   p.setParameter('vc_view_matrix', lvm);
   p.setParameter('vc_vp_matrix', lvpm);
   p.setParameter('fc_camera', lci);
   p.setParameter4('fc_alpha', 0, 0, 0, 0.1);
   o.bindAttributes(pr);
   o.bindSamplers(pr);
   c.drawTriangles(pr.indexBuffer());
}
function FG3dShadowDepthPass(o){
   o = RClass.inherits(this, o, FG3dTechniquePass);
   o._code         = 'depth';
   o._renderTarget = null;
   o._textureDepth = null;
   o._renderTarget = null;
   o.setup         = FG3dShadowDepthPass_setup;
   o.textureDepth  = FG3dShadowDepthPass_textureDepth;
   o.drawRegion    = FG3dShadowDepthPass_drawRegion;
   return o;
}
function FG3dShadowDepthPass_setup(){
   var o = this;
   o.__base.FG3dTechniquePass.setup.call(o);
   var c = o._context;
   var d = o._textureDepth = c.createFlatTexture();
   d.setFilter(EG3dSamplerFilter.Linear, EG3dSamplerFilter.Linear);
   d.setWrap(EG3dSamplerFilter.ClampToEdge, EG3dSamplerFilter.ClampToEdge);
   var t = o._renderTarget = c.createRenderTarget();
   t.size().set(2048, 2048);
   t.textures().push(d);
   t.build();
}
function FG3dShadowDepthPass_textureDepth(){
   return this._textureDepth;
}
function FG3dShadowDepthPass_drawRegion(p){
   var o = this;
   var c = o._context;
   if(o._finish){
      c.setRenderTarget(null);
      var bc = p._backgroundColor;
      o._context.clear(bc.red, bc.green, bc.blue, bc.alpha, 1);
   }else{
      c.setRenderTarget(o._renderTarget);
      c.clear(0.0, 0.0, 0.0, 1.0, 1.0, 1.0);
   }
   p._textureDepth = o._textureDepth;
   o.__base.FG3dTechniquePass.drawRegion.call(o, p)
}
function FG3dShadowDepthSkeletonEffect(o){
   o = RClass.inherits(this, o, FG3dAutomaticEffect);
   o._code            = 'shadow.depth.skeleton';
   o._supportSkeleton = true;
   o.drawRenderable   = FG3dShadowDepthSkeletonEffect_drawRenderable;
   return o;
}
function FG3dShadowDepthSkeletonEffect_drawRenderable(pg, pr){
   var o = this;
   var c = o._graphicContext;
   var p = o._program;
   p.setParameter('vc_model_matrix', r.currentMatrix());
   p.setParameter('vc_vp_matrix', prvp);
   p.setParameter('vc_camera_position', prcp);
   p.setParameter('vc_light_direction', prld);
   p.setParameter('fc_camera_position', prcp);
   p.setParameter('fc_light_direction', prld);
   var m = r.material();
   var mi = m.info();
   p.setParameter('fc_color', mi.ambientColor);
   p.setParameter4('fc_vertex_color', mi.colorMin, mi.colorMax, mi.colorRate, mi.colorMerge);
   p.setParameter4('fc_alpha', mi.alphaBase, mi.alphaRate, mi.alphaLevel, mi.alphaMerge);
   p.setParameter('fc_ambient_color', mi.ambientColor);
   p.setParameter('fc_diffuse_color', mi.diffuseColor);
   p.setParameter('fc_specular_color', mi.specularColor);
   p.setParameter4('fc_specular', mi.specularBase, mi.specularRate, mi.specularAverage, mi.specularShadow);
   p.setParameter('fc_specular_view_color', mi.specularViewColor);
   p.setParameter4('fc_specular_view', mi.specularViewBase, mi.specularViewRate, mi.specularViewAverage, mi.specularViewShadow);
   p.setParameter('fc_reflect_color', mi.reflectColor);
   var bs = pr.bones();
   if(bs){
      var bc = bs.count();
      if(bc > 32){
         bc = 32;
      }
      var d = RTypeArray.findTemp(EDataType.Float, 16 * bc);
      for(var i = 0; i < bc; i++){
         var b = bs.get(i);
         var m = b.matrix();
         m.writeData(d, 16 * i);
      }
      p.setParameter('vc_bone_matrix', d);
   }
   o.bindAttributes(pr);
   o.bindSamplers(pr);
   c.drawTriangles(pr.indexBuffer());
}
function FG3dShadowTechnique(o){
   o = RClass.inherits(this, o, FG3dTechnique);
   o._code        = 'shadow';
   o._passDepth   = null;
   o._passColor   = null;
   o.setup        = FG3dShadowTechnique_setup;
   o.passDepth    = FG3dShadowTechnique_passDepth;
   o.passColor    = FG3dShadowTechnique_passColor;
   o.updateRegion = FG3dShadowTechnique_updateRegion;
   return o;
}
function FG3dShadowTechnique_setup(){
   var o = this;
   o.__base.FG3dTechnique.setup.call(o);
   var ps = o._passes;
   var pd = o._passDepth = RClass.create(FG3dShadowDepthPass);
   pd.linkGraphicContext(o);
   pd.setup();
   ps.push(pd);
   var pc = o._passColor = RClass.create(FG3dShadowColorPass);
   pc.linkGraphicContext(o);
   pc.setup();
   ps.push(pc);
   pc.setTextureDepth(pd.textureDepth());
}
function FG3dShadowTechnique_passDepth(){
   return this._passDepth;
}
function FG3dShadowTechnique_passColor(){
   return this._passColor;
}
function FG3dShadowTechnique_updateRegion(p){
   var o = this;
   o.__base.FG3dTechnique.updateRegion.call(o, p);
   var c = p.camera();
   var l = p.directionalLight();
   l.camera().updateFlatCamera(c);
}
