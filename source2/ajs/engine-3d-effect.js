with(MO){
   MO.FE3dAutomaticEffect = function FE3dAutomaticEffect(o){
      o = RClass.inherits(this, o, FG3dAutomaticEffect);
      o.drawGroup = FE3dAutomaticEffect_drawGroup;
      return o;
   }
   MO.FE3dAutomaticEffect_drawGroup = function FE3dAutomaticEffect_drawGroup(region, renderables, offset, count){
      var o = this;
      if(count > 1){
         var modelConsole = RConsole.find(FE3rModelConsole);
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
               effect = info.effect = RConsole.find(FG3dEffectConsole).find(context, region, mesh);
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
}
with(MO){
   MO.FE3dControlAutomaticEffect = function FE3dControlAutomaticEffect(o){
      o = RClass.inherits(this, o, FG3dAutomaticEffect);
      o._code          = 'control.automatic';
      o.drawRenderable = FE3dControlAutomaticEffect_drawRenderable;
      return o;
   }
   MO.FE3dControlAutomaticEffect_drawRenderable = function FE3dControlAutomaticEffect_drawRenderable(region, renderable){
      var o = this;
      var context = o._graphicContext;
      var program = o._program;
      var matrix = renderable.currentMatrix();
      var cameraVpMatrix = region.calculate(EG3dRegionParameter.CameraViewProjectionMatrix);
      var material = renderable.material();
      var info = material.info();
      o.bindMaterial(material);
      program.setParameter('vc_model_matrix', matrix);
      program.setParameter('vc_vp_matrix', cameraVpMatrix);
      program.setParameter4('fc_alpha', info.alphaBase, info.alphaRate, info.alphaLevel, info.alphaMerge);
      program.setParameter('fc_ambient_color', info.ambientColor);
      o.bindAttributes(renderable);
      o.bindSamplers(renderable);
      context.drawTriangles(renderable.indexBuffer());
   }
}
with(MO){
   MO.FE3dControlFrameEffect = function FE3dControlFrameEffect(o){
      o = RClass.inherits(this, o, FG3dAutomaticEffect);
      o._code          = 'control.frame';
      o.drawRenderable = FE3dControlFrameEffect_drawRenderable;
      return o;
   }
   MO.FE3dControlFrameEffect_drawRenderable = function FE3dControlFrameEffect_drawRenderable(pg, pr){
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
}
with(MO){
   MO.FE3dControlPass = function FE3dControlPass(o){
      o = RClass.inherits(this, o, FG3dTechniquePass);
      o._code = 'control';
      return o;
   }
}
with(MO){
   MO.FE3dControlTechnique = function FE3dControlTechnique(o){
      o = RClass.inherits(this, o, FG3dTechnique);
      o._code        = 'control';
      o._passControl = null;
      o.setup       = FE3dControlTechnique_setup;
      o.passControl = FE3dControlTechnique_passControl;
      o.drawRegion  = FE3dControlTechnique_drawRegion;
      return o;
   }
   MO.FE3dControlTechnique_setup = function FE3dControlTechnique_setup(){
      var o = this;
      o.__base.FG3dTechnique.setup.call(o);
      o.registerMode(EG3dTechniqueMode.Result);
      var pd = o._passControl = RClass.create(FE3dControlPass);
      pd.linkGraphicContext(o);
      pd.setup();
      o._passes.push(pd);
   }
   MO.FE3dControlTechnique_passControl = function FE3dControlTechnique_passControl(){
      return this._passControl;
   }
   MO.FE3dControlTechnique_drawRegion = function FE3dControlTechnique_drawRegion(p){
      var o = this;
      if(p.renderables().isEmpty()){
         return;
      }
      o._graphicContext.clearDepth(1);
      o.__base.FG3dTechnique.drawRegion.call(o, p);
   }
}
with(MO){
   MO.FE3dGeneralColorAutomaticEffect = function FE3dGeneralColorAutomaticEffect(o){
      o = RClass.inherits(this, o, FE3dAutomaticEffect);
      o._code          = 'general.color.automatic';
      o.buildMaterial  = FE3dGeneralColorAutomaticEffect_buildMaterial;
      o.drawRenderable = FE3dGeneralColorAutomaticEffect_drawRenderable;
      return o;
   }
   MO.FE3dGeneralColorAutomaticEffect_buildMaterial = function FE3dGeneralColorAutomaticEffect_buildMaterial(effectInfo, renderable){
      var o = this;
      var material = renderable.material();
      var data = effectInfo.material;
      if(!data){
         data = effectInfo.material = RClass.create(FFloatStream);
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
      var cameraPosition = region.calculate(EG3dRegionParameter.CameraPosition);
      var lightDirection = region.calculate(EG3dRegionParameter.LightDirection);
      var vpMatrix = region.calculate(EG3dRegionParameter.CameraViewProjectionMatrix)
      var material = renderable.material();
      o.bindMaterial(material);
      if(renderable._optionMerge){
         var mergeRenderables = renderable.mergeRenderables();
         var mergeCount = mergeRenderables.count();
         var data = RTypeArray.findTemp(EDataType.Float32, 16 * mergeCount);
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
}
with(MO){
   MO.FE3dGeneralColorFlatEffect = function FE3dGeneralColorFlatEffect(o){
      o = RClass.inherits(this, o, FE3dAutomaticEffect);
      o._code          = 'general.color.flat';
      o.drawRenderable = FE3dGeneralColorFlatEffect_drawRenderable;
      return o;
   }
   MO.FE3dGeneralColorFlatEffect_drawRenderable = function FE3dGeneralColorFlatEffect_drawRenderable(region, renderable){
      var o = this;
      var context = o._graphicContext;
      var size = context.size();
      var program = o._program;
      var material = renderable.material();
      o.bindMaterial(material);
      if(renderable._optionMerge){
         var meshs = renderable.mergeRenderables();
         var meshCount = meshs.count();
         var data = RTypeArray.findTemp(EDataType.Float32, 4 * meshCount);
         var index = 0;
         for(var i = 0; i < meshCount; i++){
            var mesh = meshs.getAt(i);
            var matrix = mesh.matrix();
            data[index++] = matrix.sx / size.width * 2;
            data[index++] = matrix.sy / size.height * 2;
            data[index++] = matrix.tx / size.width * 2 - 1;
            data[index++] = 1 - matrix.ty / size.height * 2;
            mesh.currentMatrix().writeData(data, 4 * i);
         }
         program.setParameter('vc_position', data);
      }else{
         var matrix = renderable.matrix();
         var cx = matrix.sx / size.width * 2;
         var cy = matrix.sy / size.height * 2;
         var tx = matrix.tx / size.width * 2 - 1;
         var ty = 1 - matrix.ty / size.height * 2;
         program.setParameter4('vc_position', cx, cy, tx, ty);
      }
      o.__base.FE3dAutomaticEffect.drawRenderable.call(o, region, renderable);
   }
}
with(MO){
   MO.FE3dGeneralColorPass = function FE3dGeneralColorPass(o){
      o = RClass.inherits(this, o, FG3dTechniquePass);
      o._code = 'color';
      return o;
   }
}
with(MO){
   MO.FE3dGeneralColorSkeletonEffect = function FE3dGeneralColorSkeletonEffect(o){
      o = RClass.inherits(this, o, FE3dAutomaticEffect);
      o._code            = 'general.color.skeleton';
      o._supportSkeleton = true;
      o.drawRenderable   = FE3dGeneralColorSkeletonEffect_drawRenderable;
      return o;
   }
   MO.FE3dGeneralColorSkeletonEffect_drawRenderable = function FE3dGeneralColorSkeletonEffect_drawRenderable(region, renderable){
      var o = this;
      var c = o._graphicContext;
      var program = o._program;
      var vcp = region.calculate(EG3dRegionParameter.CameraPosition);
      var vld = region.calculate(EG3dRegionParameter.LightDirection);
      var m = renderable.material();
      var mi = m.info();
      o.bindMaterial(m);
      program.setParameter('vc_model_matrix', renderable.currentMatrix());
      program.setParameter('vc_vp_matrix', region.calculate(EG3dRegionParameter.CameraViewProjectionMatrix));
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
         var data = RTypeArray.findTemp(EDataType.Float32, 12 * boneCount);
         for(var i = 0; i < boneCount; i++){
            var bone = bones.at(i);
            var boneMatrix = bone.matrix();
            boneMatrix.writeData4x3(data, 12 * i);
         }
         program.setParameter('vc_bone_matrix', data);
      }
      o.__base.FE3dAutomaticEffect.drawRenderable.call(o, region, renderable);
   }
}
with(MO){
   MO.FE3dGeneralTechnique = function FE3dGeneralTechnique(o){
      o = RClass.inherits(this, o, FE3dTechnique);
      o._code      = 'general';
      o._passColor = null;
      o.setup      = FE3dGeneralTechnique_setup;
      o.passColor  = FE3dGeneralTechnique_passColor;
      return o;
   }
   MO.FE3dGeneralTechnique_setup = function FE3dGeneralTechnique_setup(){
      var o = this;
      o.__base.FE3dTechnique.setup.call(o);
      o.registerMode(EG3dTechniqueMode.Ambient);
      o.registerMode(EG3dTechniqueMode.DiffuseLevel);
      o.registerMode(EG3dTechniqueMode.DiffuseColor);
      o.registerMode(EG3dTechniqueMode.SpecularLevel);
      o.registerMode(EG3dTechniqueMode.SpecularColor);
      o.registerMode(EG3dTechniqueMode.Result);
      var p = o._passColor = RClass.create(FE3dGeneralColorPass);
      p.linkGraphicContext(o);
      p.setup();
      o._passes.push(p);
   }
   MO.FE3dGeneralTechnique_passColor = function FE3dGeneralTechnique_passColor(){
      return this._passColor;
   }
}
with(MO){
   MO.FE3dShadowColorAutomaticEffect = function FE3dShadowColorAutomaticEffect(o){
      o = RClass.inherits(this, o, FG3dAutomaticEffect);
      o._code          = 'shadow.color.automatic';
      o.drawRenderable = FE3dShadowColorAutomaticEffect_drawRenderable;
      return o;
   }
   MO.FE3dShadowColorAutomaticEffect_drawRenderable = function FE3dShadowColorAutomaticEffect_drawRenderable(pg, pr){
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
}
with(MO){
   MO.FE3dShadowColorPass = function FE3dShadowColorPass(o){
      o = RClass.inherits(this, o, FG3dTechniquePass);
      o._code           = 'color';
      o._textureDepth   = null;
      o.textureDepth    = FE3dShadowColorPass_textureDepth;
      o.setTextureDepth = FE3dShadowColorPass_setTextureDepth;
      o.drawRegion      = FE3dShadowColorPass_drawRegion;
      return o;
   }
   MO.FE3dShadowColorPass_textureDepth = function FE3dShadowColorPass_textureDepth(){
      return this._textureDepth;
   }
   MO.FE3dShadowColorPass_setTextureDepth = function FE3dShadowColorPass_setTextureDepth(p){
      this._textureDepth = p;
   }
   MO.FE3dShadowColorPass_drawRegion = function FE3dShadowColorPass_drawRegion(p){
      var o = this;
      var c = o._graphicContext;
      c.setRenderTarget(null);
      var bc = p._backgroundColor;
      c.clear(bc.red, bc.green, bc.blue, bc.alpha, 1);
      o.__base.FG3dTechniquePass.drawRegion.call(o, p)
   }
}
with(MO){
   MO.FE3dShadowColorSkeletonEffect = function FE3dShadowColorSkeletonEffect(o){
      o = RClass.inherits(this, o, FG3dAutomaticEffect);
      o._code            = 'shadow.color.skeleton';
      o._supportSkeleton = true;
      o.drawRenderable   = FE3dShadowColorSkeletonEffect_drawRenderable;
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
         var d = RTypeArray.findTemp(EDataType.Float32, 16 * bc);
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
}
with(MO){
   MO.FE3dShadowDepthAutomaticEffect = function FE3dShadowDepthAutomaticEffect(o){
      o = RClass.inherits(this, o, FG3dAutomaticEffect);
      o._code          = 'shadow.depth.automatic';
      o.drawRenderable = FE3dShadowDepthAutomaticEffect_drawRenderable;
      return o;
   }
   MO.FE3dShadowDepthAutomaticEffect_drawRenderable = function FE3dShadowDepthAutomaticEffect_drawRenderable(pg, pr){
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
}
with(MO){
   MO.FE3dShadowDepthPass = function FE3dShadowDepthPass(o){
      o = RClass.inherits(this, o, FG3dTechniquePass);
      o._code         = 'depth';
      o._renderTarget = null;
      o._textureDepth = null;
      o._renderTarget = null;
      o.setup         = FE3dShadowDepthPass_setup;
      o.textureDepth  = FE3dShadowDepthPass_textureDepth;
      o.drawRegion    = FE3dShadowDepthPass_drawRegion;
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
   MO.FE3dShadowDepthPass_textureDepth = function FE3dShadowDepthPass_textureDepth(){
      return this._textureDepth;
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
}
with(MO){
   MO.FE3dShadowDepthSkeletonEffect = function FE3dShadowDepthSkeletonEffect(o){
      o = RClass.inherits(this, o, FG3dAutomaticEffect);
      o._code            = 'shadow.depth.skeleton';
      o._supportSkeleton = true;
      o.drawRenderable   = FE3dShadowDepthSkeletonEffect_drawRenderable;
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
         var d = RTypeArray.findTemp(EDataType.Float32, 16 * bc);
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
}
with(MO){
   MO.FE3dShadowTechnique = function FE3dShadowTechnique(o){
      o = RClass.inherits(this, o, FE3dTechnique);
      o._code        = 'shadow';
      o._passDepth   = null;
      o._passColor   = null;
      o.setup        = FE3dShadowTechnique_setup;
      o.passDepth    = FE3dShadowTechnique_passDepth;
      o.passColor    = FE3dShadowTechnique_passColor;
      o.updateRegion = FE3dShadowTechnique_updateRegion;
      return o;
   }
   MO.FE3dShadowTechnique_setup = function FE3dShadowTechnique_setup(){
      var o = this;
      o.__base.FE3dTechnique.setup.call(o);
      o.registerMode(EG3dTechniqueMode.Ambient);
      o.registerMode(EG3dTechniqueMode.DiffuseLevel);
      o.registerMode(EG3dTechniqueMode.DiffuseColor);
      o.registerMode(EG3dTechniqueMode.SpecularLevel);
      o.registerMode(EG3dTechniqueMode.SpecularColor);
      o.registerMode(EG3dTechniqueMode.Result);
      var ps = o._passes;
      var pd = o._passDepth = RClass.create(FE3dShadowDepthPass);
      pd.linkGraphicContext(o);
      pd.setup();
      var pc = o._passColor = RClass.create(FE3dShadowColorPass);
      pc.linkGraphicContext(o);
      pc.setup();
      ps.push(pc);
      pc.setTextureDepth(pd.textureDepth());
   }
   MO.FE3dShadowTechnique_passDepth = function FE3dShadowTechnique_passDepth(){
      return this._passDepth;
   }
   MO.FE3dShadowTechnique_passColor = function FE3dShadowTechnique_passColor(){
      return this._passColor;
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
}
