MO.FE3dAutomaticEffect = function FE3dAutomaticEffect(o){
   o = MO.Class.inherits(this, o, MO.FG3dAutomaticEffect);
   o.drawGroup = MO.FE3dAutomaticEffect_drawGroup;
   return o;
}
MO.FE3dAutomaticEffect_drawGroup = function FE3dAutomaticEffect_drawGroup(region, renderables, offset, count){
   var o = this;
   if(count > 1){
      var modelConsole = MO.Console.find(MO.FE3rModelConsole);
      var model = modelConsole.merge(o, region, offset, count);
      if(model){
         var context = o._graphicContext;
         var meshes = model.meshes();
         var meshCount = meshes.count();
         var spaceName = region.spaceName();
         var mesh = meshes.first();
         var info = mesh.selectInfo(spaceName);
         var effect = info.effect;
         if(!effect){
            effect = info.effect = MO.Console.find(MO.FG3dEffectConsole).find(context, region, mesh);
         }
         for(var i = 1; i < meshCount; i++){
            var mesh = meshes.getAt(i);
            var info = mesh.selectInfo(spaceName);
            info.effect = effect;
         }
         return effect.drawRenderables(region, meshes, 0, meshCount);
      }
   }
   o.drawRenderables(region, renderables, offset, count);
}
MO.FE3dControlAutomaticEffect = function FE3dControlAutomaticEffect(o){
   o = MO.Class.inherits(this, o, MO.FG3dAutomaticEffect);
   o._code          = 'control.automatic';
   o.drawRenderable = MO.FE3dControlAutomaticEffect_drawRenderable;
   return o;
}
MO.FE3dControlAutomaticEffect_drawRenderable = function FE3dControlAutomaticEffect_drawRenderable(region, renderable){
   var o = this;
   var context = o._graphicContext;
   var program = o._program;
   var matrix = renderable.currentMatrix();
   var cameraVpMatrix = region.calculate(MO.EG3dRegionParameter.CameraViewProjectionMatrix);
   var material = renderable.material();
   var info = material.info();
   o.bindMaterial(material);
   program.setParameter('vc_model_matrix', matrix);
   program.setParameter('vc_vp_matrix', cameraVpMatrix);
   program.setParameter4('fc_alpha', info.alphaBase, info.alphaRate, info.alphaLevel, info.alphaMerge);
   program.setParameter('fc_ambient_color', info.ambientColor);
   o.bindAttributes(renderable);
   o.bindSamplers(renderable);
   var indexBuffer = renderable.indexBuffers().first();
   context.drawTriangles(indexBuffer);
}
MO.FE3dControlFrameEffect = function FE3dControlFrameEffect(o){
   o = MO.Class.inherits(this, o, MO.FG3dAutomaticEffect);
   o._code          = 'control.frame';
   o.drawRenderable = MO.FE3dControlFrameEffect_drawRenderable;
   return o;
}
MO.FE3dControlFrameEffect_drawRenderable = function FE3dControlFrameEffect_drawRenderable(pg, pr){
   var o = this;
   var c = o._graphicContext;
   var p = o._program;
   var vcp = pg.calculate(MO.EG3dRegionParameter.CameraPosition);
   var vld = pg.calculate(MO.EG3dRegionParameter.LightDirection);
   var m = pr.material();
   var mi = m.info();
   o.bindMaterial(m);
   p.setParameter('vc_model_matrix', pr.currentMatrix());
   p.setParameter('vc_vp_matrix', pg.calculate(MO.EG3dRegionParameter.CameraViewProjectionMatrix));
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
MO.FE3dControlPass = function FE3dControlPass(o){
   o = MO.Class.inherits(this, o, MO.FG3dTechniquePass);
   o._code = 'control';
   return o;
}
MO.FE3dControlTechnique = function FE3dControlTechnique(o){
   o = MO.Class.inherits(this, o, MO.FG3dTechnique);
   o._code        = 'control';
   o._passControl = MO.Class.register(o, new MO.AGetter('_passControl'));
   o.setup        = MO.FE3dControlTechnique_setup;
   o.drawRegion   = MO.FE3dControlTechnique_drawRegion;
   return o;
}
MO.FE3dControlTechnique_setup = function FE3dControlTechnique_setup(){
   var o = this;
   o.__base.FG3dTechnique.setup.call(o);
   o.registerMode(MO.EG3dTechniqueMode.Result);
   var pass = o._passControl = MO.Class.create(MO.FE3dControlPass);
   pass.linkGraphicContext(o);
   pass.setup();
   o.pushPass(pass);
}
MO.FE3dControlTechnique_drawRegion = function FE3dControlTechnique_drawRegion(p){
   var o = this;
   if(p.renderables().isEmpty()){
      return;
   }
   o._graphicContext.clearDepth(1);
   o.__base.FG3dTechnique.drawRegion.call(o, p);
}
MO.FE3dGeneralColorAutomaticEffect = function FE3dGeneralColorAutomaticEffect(o){
   o = MO.Class.inherits(this, o, MO.FE3dAutomaticEffect);
   o._code          = 'general.color.automatic';
   o.buildMaterial  = MO.FE3dGeneralColorAutomaticEffect_buildMaterial;
   o.drawRenderable = MO.FE3dGeneralColorAutomaticEffect_drawRenderable;
   return o;
}
MO.FE3dGeneralColorAutomaticEffect_buildMaterial = function FE3dGeneralColorAutomaticEffect_buildMaterial(effectInfo, renderable){
   var o = this;
   var material = renderable.material();
   var data = effectInfo.material;
   if(!data){
      data = effectInfo.material = MO.Class.create(MO.FFloatStream);
      data.setLength(40);
      material._dirty = true;
   }
   if(material._dirty){
      var info = material.info();
      data.reset();
      if(info.optionAlpha){
         data.writeFloat4(info.alphaBase, info.alphaRate, 0, 0);
      }else{
         data.writeFloat4(info.alphaBase, 1, 0, 0);
      }
      data.writeFloat4(info.colorMin, info.colorMax, info.colorBalance, info.colorRate);
      data.writeColor4(info.vertexColor);
      data.writeColor4(info.ambientColor);
      data.writeColor4(info.diffuseColor);
      data.writeColor4(info.specularColor);
      data.writeFloat4(info.specularBase, info.specularLevel, info.specularAverage, info.specularShadow);
      data.writeColor4(info.reflectColor);
      data.writeFloat4(0, 0, 1 - info.reflectMerge, info.reflectMerge);
      data.writeColor4(info.emissiveColor);
      material._dirty = false;
   }
}
MO.FE3dGeneralColorAutomaticEffect_drawRenderable = function FE3dGeneralColorAutomaticEffect_drawRenderable(region, renderable){
   var o = this;
   var program = o._program;
   var cameraPosition = region.calculate(MO.EG3dRegionParameter.CameraPosition);
   var lightDirection = region.calculate(MO.EG3dRegionParameter.LightDirection);
   var vpMatrix = region.calculate(MO.EG3dRegionParameter.CameraViewProjectionMatrix)
   var material = renderable.material();
   o.bindMaterial(material);
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
   if(o._supportMaterialMap){
      var materialId = renderable._materialId;
      program.setParameter4('fc_material', 1 / 32, materialId / 512, 0, 0);
   }else{
      var info = renderable.activeInfo();
      o.buildMaterial(info, renderable);
      program.setParameter('fc_materials', info.material.memory());
   }
   o.__base.FE3dAutomaticEffect.drawRenderable.call(o, region, renderable);
}
MO.FE3dGeneralColorFillEffect = function FE3dGeneralColorFillEffect(o){
   o = MO.Class.inherits(this, o, MO.FE3dAutomaticEffect);
   o._code          = 'general.color.flat';
   o.drawRenderable = MO.FE3dGeneralColorFillEffect_drawRenderable;
   return o;
}
MO.FE3dGeneralColorFillEffect_drawRenderable = function FE3dGeneralColorFillEffect_drawRenderable(region, renderable){
   var o = this;
   var context = o._graphicContext;
   var contextSize = context.size();
   var program = o._program;
   var material = renderable.material();
   o.bindMaterial(material);
   program.setParameter4('vc_position', 2, 2, -1, 1);
   o.__base.FE3dAutomaticEffect.drawRenderable.call(o, region, renderable);
}
MO.FE3dGeneralColorFlatEffect = function FE3dGeneralColorFlatEffect(o){
   o = MO.Class.inherits(this, o, MO.FE3dAutomaticEffect);
   o._code          = 'general.color.flat';
   o.drawRenderable = MO.FE3dGeneralColorFlatEffect_drawRenderable;
   return o;
}
MO.FE3dGeneralColorFlatEffect_drawRenderable = function FE3dGeneralColorFlatEffect_drawRenderable(region, renderable){
   var o = this;
   var context = o._graphicContext;
   var contextSize = context.size();
   var contextRatio = context.ratio();
   var contextSizeRatio = context.sizeRatio();
   var radioWidth = contextSize.width * contextRatio;
   var radioHeight = contextSize.height * contextRatio;
   var sizeWidth = contextSize.width * contextSizeRatio.width;
   var sizeHeight = contextSize.height * contextSizeRatio.height;
   var program = o._program;
   var material = renderable.material();
   o.bindMaterial(material);
   if(renderable._optionMerge){
      var meshs = renderable.mergeRenderables();
      var meshCount = meshs.count();
      var data = MO.Lang.TypeArray.findTemp(MO.EDataType.Float32, 4 * meshCount);
      var index = 0;
      for(var i = 0; i < meshCount; i++){
         var mesh = meshs.at(i);
         var matrix = mesh.matrix();
         data[index++] = matrix.sx / contextWidth * 2;
         data[index++] = matrix.sy / contextHeight * 2;
         data[index++] = matrix.tx / contextWidth * 2 - 1;
         data[index++] = 1 - matrix.ty / contextHeight * 2;
         mesh.currentMatrix().writeData(data, 4 * i);
      }
      program.setParameter('vc_position', data);
      o.__base.FE3dAutomaticEffect.drawRenderable.call(o, region, renderable);
   }else{
      var matrix = renderable.matrix();
      if(renderable._optionFull){
         var cx = matrix.sx / sizeWidth * 2;
         var cy = matrix.sy / sizeHeight * 2;
         var tx = matrix.tx / sizeWidth * 2 - 1;
         var ty = 1 - matrix.ty / sizeHeight * 2;
         program.setParameter4('vc_position', cx, cy, tx, ty);
      }else{
         var cx = matrix.sx / radioWidth * 2;
         var cy = matrix.sy / radioHeight * 2;
         var tx = matrix.tx / sizeWidth * 2 - 1;
         var ty = 1 - matrix.ty / sizeHeight * 2;
         program.setParameter4('vc_position', cx, cy, tx, ty);
      }
      o.__base.FE3dAutomaticEffect.drawRenderable.call(o, region, renderable);
   }
}
MO.FE3dGeneralColorPass = function FE3dGeneralColorPass(o){
   o = MO.Class.inherits(this, o, MO.FG3dTechniquePass);
   o._code = 'color';
   return o;
}
MO.FE3dGeneralColorSkeletonEffect = function FE3dGeneralColorSkeletonEffect(o){
   o = MO.Class.inherits(this, o, MO.FE3dAutomaticEffect);
   o._code            = 'general.color.skeleton';
   o._supportSkeleton = true;
   o.drawRenderable   = MO.FE3dGeneralColorSkeletonEffect_drawRenderable;
   return o;
}
MO.FE3dGeneralColorSkeletonEffect_drawRenderable = function FE3dGeneralColorSkeletonEffect_drawRenderable(region, renderable){
   var o = this;
   var c = o._graphicContext;
   var program = o._program;
   var vcp = region.calculate(MO.EG3dRegionParameter.CameraPosition);
   var vld = region.calculate(MO.EG3dRegionParameter.LightDirection);
   var m = renderable.material();
   var mi = m.info();
   o.bindMaterial(m);
   program.setParameter('vc_model_matrix', renderable.currentMatrix());
   program.setParameter('vc_vp_matrix', region.calculate(MO.EG3dRegionParameter.CameraViewProjectionMatrix));
   program.setParameter('vc_camera_position', vcp);
   program.setParameter('vc_light_direction', vld);
   program.setParameter('fc_camera_position', vcp);
   program.setParameter('fc_light_direction', vld);
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
   o.__base.FE3dAutomaticEffect.drawRenderable.call(o, region, renderable);
}
MO.FE3dGeneralTechnique = function FE3dGeneralTechnique(o){
   o = MO.Class.inherits(this, o, MO.FE3dTechnique);
   o._code      = 'general';
   o._passColor = MO.Class.register(o, new MO.AGetter('_passColor'));
   o.setup      = MO.FE3dGeneralTechnique_setup;
   return o;
}
MO.FE3dGeneralTechnique_setup = function FE3dGeneralTechnique_setup(){
   var o = this;
   o.__base.FE3dTechnique.setup.call(o);
   o.registerMode(MO.EG3dTechniqueMode.Ambient);
   o.registerMode(MO.EG3dTechniqueMode.DiffuseLevel);
   o.registerMode(MO.EG3dTechniqueMode.DiffuseColor);
   o.registerMode(MO.EG3dTechniqueMode.SpecularLevel);
   o.registerMode(MO.EG3dTechniqueMode.SpecularColor);
   o.registerMode(MO.EG3dTechniqueMode.Result);
   var pass = o._passColor = MO.Class.create(MO.FE3dGeneralColorPass);
   pass.linkGraphicContext(o);
   pass.setup();
   o.pushPass(pass);
}
MO.FE3dShadowColorAutomaticEffect = function FE3dShadowColorAutomaticEffect(o){
   o = MO.Class.inherits(this, o, MO.FG3dAutomaticEffect);
   o._code          = 'shadow.color.automatic';
   o.drawRenderable = MO.FE3dShadowColorAutomaticEffect_drawRenderable;
   return o;
}
MO.FE3dShadowColorAutomaticEffect_drawRenderable = function FE3dShadowColorAutomaticEffect_drawRenderable(pg, pr){
   var o = this;
   var c = o._graphicContext;
   var p = o._program;
   var vcp = pg.calculate(MO.EG3dRegionParameter.CameraPosition);
   var vcvpm = pg.calculate(MO.EG3dRegionParameter.CameraViewProjectionMatrix);
   var vld = pg.calculate(MO.EG3dRegionParameter.LightDirection);
   var vlvm = pg.calculate(MO.EG3dRegionParameter.LightViewMatrix);
   var vlvpm = pg.calculate(MO.EG3dRegionParameter.LightViewProjectionMatrix);
   var vlci = pg.calculate(MO.EG3dRegionParameter.LightInfo);
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
MO.FE3dShadowColorPass = function FE3dShadowColorPass(o){
   o = MO.Class.inherits(this, o, MO.FG3dTechniquePass);
   o._code           = 'color';
   o._textureDepth   = MO.Class.register(o, new MO.AGetSet('_textureDepth'));
   o.drawRegion      = MO.FE3dShadowColorPass_drawRegion;
   return o;
}
MO.FE3dShadowColorPass_drawRegion = function FE3dShadowColorPass_drawRegion(p){
   var o = this;
   var c = o._graphicContext;
   c.setRenderTarget(null);
   var bc = p._backgroundColor;
   c.clear(bc.red, bc.green, bc.blue, bc.alpha, 1);
   o.__base.FG3dTechniquePass.drawRegion.call(o, p)
}
MO.FE3dShadowColorSkeletonEffect = function FE3dShadowColorSkeletonEffect(o){
   o = MO.Class.inherits(this, o, MO.FG3dAutomaticEffect);
   o._code            = 'shadow.color.skeleton';
   o._supportSkeleton = true;
   o.drawRenderable   = MO.FE3dShadowColorSkeletonEffect_drawRenderable;
   return o;
}
MO.FE3dShadowColorSkeletonEffect_drawRenderable = function FE3dShadowColorSkeletonEffect_drawRenderable(pr, r){
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
               throw new MO.TError("Can't find renderable vertex buffer. (linker={1})", a._linker);
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
               throw new MO.TError("Can't find sampler. (linker={1})", ln);
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
      var d = MO.Lang.TypeArray.findTemp(MO.EDataType.Float32, 16 * bc);
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
MO.FE3dShadowDepthAutomaticEffect = function FE3dShadowDepthAutomaticEffect(o){
   o = MO.Class.inherits(this, o, MO.FG3dAutomaticEffect);
   o._code          = 'shadow.depth.automatic';
   o.drawRenderable = MO.FE3dShadowDepthAutomaticEffect_drawRenderable;
   return o;
}
MO.FE3dShadowDepthAutomaticEffect_drawRenderable = function FE3dShadowDepthAutomaticEffect_drawRenderable(pg, pr){
   var o = this;
   var c = o._graphicContext;
   var p = o._program;
   var lvm = pg.calculate(MO.EG3dRegionParameter.LightViewMatrix);
   var lvpm = pg.calculate(MO.EG3dRegionParameter.LightViewProjectionMatrix);
   var lci = pg.calculate(MO.EG3dRegionParameter.LightInfo);
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
MO.FE3dShadowDepthPass = function FE3dShadowDepthPass(o){
   o = MO.Class.inherits(this, o, MO.FG3dTechniquePass);
   o._code         = 'depth';
   o._renderTarget = null;
   o._textureDepth = MO.Class.register(o, new MO.AGetter('_textureDepth'));
   o._renderTarget = null;
   o.setup         = MO.FE3dShadowDepthPass_setup;
   o.drawRegion    = MO.FE3dShadowDepthPass_drawRegion;
   return o;
}
MO.FE3dShadowDepthPass_setup = function FE3dShadowDepthPass_setup(){
   var o = this;
   o.__base.FG3dTechniquePass.setup.call(o);
   var c = o._graphicContext;
   var d = o._textureDepth = c.createFlatTexture();
   d.setFilter(EG3dSamplerFilter.Linear, EG3dSamplerFilter.Linear);
   d.setWrap(EG3dSamplerFilter.ClampToEdge, EG3dSamplerFilter.ClampToEdge);
   var t = o._renderTarget = c.createRenderTarget();
   t.size().set(2048, 2048);
   t.textures().push(d);
   t.build();
}
MO.FE3dShadowDepthPass_drawRegion = function FE3dShadowDepthPass_drawRegion(p){
   var o = this;
   var c = o._graphicContext;
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
MO.FE3dShadowDepthSkeletonEffect = function FE3dShadowDepthSkeletonEffect(o){
   o = MO.Class.inherits(this, o, MO.FG3dAutomaticEffect);
   o._code            = 'shadow.depth.skeleton';
   o._supportSkeleton = true;
   o.drawRenderable   = MO.FE3dShadowDepthSkeletonEffect_drawRenderable;
   return o;
}
MO.FE3dShadowDepthSkeletonEffect_drawRenderable = function FE3dShadowDepthSkeletonEffect_drawRenderable(pg, pr){
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
      var d = MO.Lang.TypeArray.findTemp(MO.EDataType.Float32, 16 * bc);
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
MO.FE3dShadowTechnique = function FE3dShadowTechnique(o){
   o = MO.Class.inherits(this, o, MO.FE3dTechnique);
   o._code        = 'shadow';
   o._passDepth   = MO.Class.register(o, new MO.AGetter('_passDepth'));
   o._passColor   = MO.Class.register(o, new MO.AGetter('_passColor'));
   o.setup        = MO.FE3dShadowTechnique_setup;
   o.updateRegion = MO.FE3dShadowTechnique_updateRegion;
   return o;
}
MO.FE3dShadowTechnique_setup = function FE3dShadowTechnique_setup(){
   var o = this;
   o.__base.FE3dTechnique.setup.call(o);
   o.registerMode(MO.EG3dTechniqueMode.Ambient);
   o.registerMode(MO.EG3dTechniqueMode.DiffuseLevel);
   o.registerMode(MO.EG3dTechniqueMode.DiffuseColor);
   o.registerMode(MO.EG3dTechniqueMode.SpecularLevel);
   o.registerMode(MO.EG3dTechniqueMode.SpecularColor);
   o.registerMode(MO.EG3dTechniqueMode.Result);
   var ps = o._passes;
   var passDepth = o._passDepth = MO.Class.create(MO.FE3dShadowDepthPass);
   passDepth.linkGraphicContext(o);
   passDepth.setup();
   o.pushPass(passDepth);
   var passColor = o._passColor = MO.Class.create(MO.FE3dShadowColorPass);
   passColor.linkGraphicContext(o);
   passColor.setup();
   o.pushPass(passColor);
   passColor.setTextureDepth(passDepth.textureDepth());
}
MO.FE3dShadowTechnique_updateRegion = function FE3dShadowTechnique_updateRegion(p){
   var o = this;
   o.__base.FE3dTechnique.updateRegion.call(o, p);
   var g = o._graphicContext;
   var gs = g.size();
   var c = p.camera();
   var l = p.directionalLight();
   var lc = l.camera();
}
MO.FE3dSphereColorPass = function FE3dSphereColorPass(o){
   o = MO.Class.inherits(this, o, MO.FG3dTechniquePass);
   o._code         = 'color';
   o._textureColor = MO.Class.register(o, new MO.AGetter('_textureColor'));
   o.setup         = MO.FE3dSphereColorPass_setup;
   o.drawBegin     = MO.FE3dSphereColorPass_drawBegin;
   return o;
}
MO.FE3dSphereColorPass_setup = function FE3dSphereColorPass_setup(){
   var o = this;
   o.__base.FG3dTechniquePass.setup.call(o);
   var context = o._graphicContext;
   var texture = o._textureColor = context.createFlatTexture();
   texture.setFilterCd(MO.EG3dSamplerFilter.Nearest, MO.EG3dSamplerFilter.Nearest);
   texture.setWrapCd(MO.EG3dSamplerFilter.ClampToBorder, MO.EG3dSamplerFilter.ClampToBorder);
   texture.update();
   var target = o._renderTarget = context.createRenderTarget();
   target.size().set(2048, 1024);
   target.textures().push(texture);
   target.build();
}
MO.FE3dSphereColorPass_drawBegin = function FE3dSphereColorPass_drawBegin(region){
   var o = this;
   var context = o._graphicContext;
   var backgroundColor = region.backgroundColor();
   context.setRenderTarget(o._renderTarget);
   context.clear(backgroundColor.red, backgroundColor.green, backgroundColor.blue, backgroundColor.alpha, 1);
}
MO.FE3dSphereTechnique = function FE3dSphereTechnique(o){
   o = MO.Class.inherits(this, o, MO.FE3dTechnique);
   o._code      = 'general';
   o._passColor = MO.Class.register(o, new MO.AGetter('_passColor'));
   o._passView  = MO.Class.register(o, new MO.AGetter('_passView'));
   o.setup      = MO.FE3dSphereTechnique_setup;
   return o;
}
MO.FE3dSphereTechnique_setup = function FE3dSphereTechnique_setup(){
   var o = this;
   o.__base.FE3dTechnique.setup.call(o);
   o.registerMode(MO.EG3dTechniqueMode.Ambient);
   o.registerMode(MO.EG3dTechniqueMode.DiffuseLevel);
   o.registerMode(MO.EG3dTechniqueMode.DiffuseColor);
   o.registerMode(MO.EG3dTechniqueMode.SpecularLevel);
   o.registerMode(MO.EG3dTechniqueMode.SpecularColor);
   o.registerMode(MO.EG3dTechniqueMode.Result);
   var passes = o._passes;
   var passColor = o._passColor = MO.Class.create(MO.FE3dSphereColorPass);
   passColor.linkGraphicContext(o);
   passColor.setup();
   o.pushPass(passColor);
   var passView = o._passView = MO.Class.create(MO.FE3dSphereViewPass);
   passView.linkGraphicContext(o);
   passView.setup();
   o.pushPass(passView);
   passView.setTextureColor(passColor.textureColor());
}
MO.FE3dSphereViewAutomaticEffect = function FE3dSphereViewAutomaticEffect(o){
   o = MO.Class.inherits(this, o, MO.FG3dAutomaticEffect);
   o._code          = 'sphere.view.automatic';
   o._rotationX     = 0;
   o._rotationY     = 0;
   o.drawRenderable = MO.FE3dSphereViewAutomaticEffect_drawRenderable;
   return o;
}
MO.FE3dSphereViewAutomaticEffect_drawRenderable = function FE3dSphereViewAutomaticEffect_drawRenderable(region, renderable){
   var o = this;
   var context = o._graphicContext;
   var program = o._program;
   var size = context.size();
   var rateX = 1;
   var rateY = 1;
   if(size.width > size.height){
      rateX = size.width / size.height;
   }else if(size.width < size.height){
      rateY = size.height / size.width;
   }
   var rotationX = o._rotationX + 0.00005;
   var rotationY = o._rotationY + 0.00002;
   program.setParameter4('vc_const', 1 / rateX, 1 / rateY, rotationX, rotationY);
   program.setParameter4('fc_const', rateX, rateY, rotationX, rotationY);
   o._rotationX = rotationX;
   o._rotationY = rotationY;
   var material = renderable.material();
   o.bindMaterial(material);
   o.bindAttributes(renderable);
   o.bindSamplers(renderable);
   context.drawTriangles(renderable.indexBuffer());
}
MO.FE3dSphereViewPass = function FE3dSphereViewPass(o){
   o = MO.Class.inherits(this, o, MO.FG3dTechniquePass);
   o._code          = 'view';
   o._radianSize    = null;
   o._textureColor  = MO.Class.register(o, new MO.AGetSet('_textureColor'));
   o._effect        = null;
   o._textureRadian = null;
   o._rectangle     = null;
   o.construct      = MO.FE3dSphereViewPass_construct;
   o.setup          = MO.FE3dSphereViewPass_setup;
   o.drawBegin      = MO.FE3dSphereViewPass_drawBegin
   o.drawRegion     = MO.FE3dSphereViewPass_drawRegion;
   return o;
}
MO.FE3dSphereViewPass_construct = function FE3dSphereViewPass_construct(){
   var o = this;
   o.__base.FG3dTechniquePass.construct.call(o);
   o._radianSize = new MO.SSize2(1024, 1024);
}
MO.FE3dSphereViewPass_setup = function FE3dSphereViewPass_setup(){
   var o = this;
   o.__base.FG3dTechniquePass.setup.call(o);
   var context = o._graphicContext;
   var pi2a = 0.5 / Math.PI;
   var width = o._radianSize.width;
   var height = o._radianSize.height;
   var centerX = width / 2;
   var centerY = height / 2;
   var data = new Float32Array(width * height);
   var position = 0;
   var direction = new MO.SVector2();
   for(var y = 0; y < height; y++){
      var ay = (y - centerY) / (height / 2);
      for(var x = 0; x < width; x++){
         var ax = (x - centerX) / (width / 2);
         var length = Math.sqrt(ax * ax + ay * ay);
         var angle = 0.5;
         if(length != 0){
            var nx = ax / length;
            var ny = ay / length;
            direction.x = ax;
            direction.y = ay;
            direction.normalize();
            if(y > centerY){
               angle = 0.5 - Math.acos(nx) * pi2a;
            }else if(y < centerY){
               angle = 0.5 + Math.acos(nx) * pi2a;
            }else if(x > centerX){
               angle = 0.5;
            }else if(x < centerX){
               angle = 1.0;
            }
         }
         data[position++] = angle;
      }
   }
   var texture = o._textureRadian = context.createFlatTexture();
   texture.setFilterCd(MO.EG3dSamplerFilter.Nearest, MO.EG3dSamplerFilter.Linear);
   texture.setWrapCd(MO.EG3dSamplerFilter.MirroredRepeat, MO.EG3dSamplerFilter.MirroredRepeat);
   texture.uploadData(data, width, height);
   var rectangle = o._rectangle = MO.Class.create(MO.FE3dRectangleArea);
   rectangle.linkGraphicContext(o);
   rectangle.setup();
}
MO.FE3dSphereViewPass_drawBegin = function FE3dSphereViewPass_drawBegin(region){
   var o = this;
   var context = o._graphicContext;
   var rectangle = o._rectangle;
   var backgroundColor = region.backgroundColor();
   context.setRenderTarget(null);
   context.clear(0, 0, 0, 0, 1);
   var textures = rectangle.textures();
   if(textures.isEmpty()){
      textures.set('diffuse', o._textureColor);
      textures.set('radian', o._textureRadian);
   }
}
MO.FE3dSphereViewPass_drawRegion = function FE3dSphereViewPass_drawRegion(region){
   var o = this;
   var context = o._graphicContext;
   var rectangle = o._rectangle;
   var effect = o._effect;
   if(!effect){
      effect = o._effect = MO.Console.find(MO.FG3dEffectConsole).find(o, region, rectangle);
   }
   context.setProgram(effect.program());
   effect.drawRenderable(region, o._rectangle);
}
