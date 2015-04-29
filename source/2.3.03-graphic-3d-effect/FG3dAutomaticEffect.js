//==========================================================
// <T>自动渲染器。</T>
//
// @author maocy
// @history 150114
//==========================================================
function FG3dAutomaticEffect(o){
   o = RClass.inherits(this, o, FG3dEffect);
   //..........................................................
   // @attribute
   o._optionMerge             = false;
   o._optionBlendMode         = true;
   // @attribute
   o._supportInstance         = false;
   o._supportLayout           = false;
   o._supportMaterialMap      = false;
   // @attribute
   o._supportVertexColor      = true;
   o._supportVertexCoord      = true;
   o._supportVertexNormal     = true;
   o._supportVertexNormalFull = true;
   o._supportSkeleton         = false;
   // @attribute
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
   // @attribute
   o._dynamicSkeleton         = true;
   //..........................................................
   // @method
   o.setup                    = FG3dAutomaticEffect_setup;
   // @method
   o.buildInfo                = FG3dAutomaticEffect_buildInfo;
   // @method
   o.bindAttributes           = FG3dAutomaticEffect_bindAttributes;
   o.bindSamplers             = FG3dAutomaticEffect_bindSamplers;
   o.bindMaterial             = FG3dAutomaticEffect_bindMaterial;
   // @method
   o.drawRenderable           = FG3dAutomaticEffect_drawRenderable;
   return o;
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
function FG3dAutomaticEffect_setup(){
   var o = this;
   var c = o._graphicContext;
   var cp = c.capability();
   o._supportLayout = cp.optionLayout;
}

//==========================================================
// <T>绘制渲染对象。</T>
//
// @method
// @param pt:tagContext:FTagContext 模板环境
// @param pc:effectInfo:SG3dEffectInfo 渲染信息
//==========================================================
function FG3dAutomaticEffect_buildInfo(pt, pc){
   var o = this;
   var c = o._graphicContext;
   var cp = c.capability();
   // 获得参数
   var s = new TString();
   s.append(pc.techniqueModeCode)
   pt.set("technique.mode", pc.techniqueModeCode);
   //............................................................
   // 支持纹理材质映射
   var om = o._optionMerge = pc.optionMerge;
   if(om){
      var mc = pc.mergeCount;
      s.append("|OI" + mc);
      pt.setBoolean("option.instance", true);
      pt.set("instance.count", mc);
   }
   //............................................................
   // 支持纹理材质映射
   if(cp.optionMaterialMap){
      s.append("|OM");
      pt.setBoolean("option.material.map", true);
      o._supportMaterialMap = true;
   }
   // 支持纹理法线反响
   if(pc.optionNormalInvert){
      s.append("|ON");
      pt.setBoolean("option.normal.invert", true);
      o._supportNormalInvert = true;
   }
   // 支持纹理颜色
   if(pc.optionColor){
      s.append("|OC");
      pt.setBoolean("option.color", true);
      o.optionAmbient = true;
   }
   // 支持纹理环境
   if(pc.optionAmbient){
      s.append("|OA");
      pt.setBoolean("option.ambient", true);
      o.optionAmbient = true;
   }
   // 支持纹理散射
   if(pc.optionDiffuse){
      s.append("|OD");
      pt.setBoolean("option.diffuse", true);
      o.optionDiffuse = true;
   }
   // 支持纹理高光
   if(pc.optionSpecular){
      s.append("|OS");
      pt.setBoolean("option.specular", true);
      o.optionSpecular = true;
   }
   // 支持纹理反射
   if(pc.optionReflect){
      s.append("|ORL");
      pt.setBoolean("option.reflect", true);
      o.optionReflect = true;
   }
   // 支持纹理折射
   if(pc.optionRefract){
      s.append("|ORF");
      pt.setBoolean("option.refract", true);
      o.optionRefract = true;
   }
   //............................................................
   // 支持顶点颜色
   var ac = pc.attributeContains(EG3dAttribute.Color);
   o._dynamicVertexColor = (o._supportVertexColor && ac);
   if(o._dynamicVertexColor){
      s.append("|AC");
      pt.setBoolean("vertex.attribute.color", true);
   }
   // 支持顶点纹理
   var ad = pc.attributeContains(EG3dAttribute.Coord);
   o._dynamicVertexCoord = (o._supportVertexCoord && ad);
   if(o._dynamicVertexCoord){
      s.append("|AD");
      pt.setBoolean("vertex.attribute.coord", true);
   }
   // 支持法线
   var an = pc.attributeContains(EG3dAttribute.Normal);
   o._dynamicVertexNormal = (o._supportVertexNormal && an);
   if(o._dynamicVertexNormal){
      s.append("|AN");
      pt.setBoolean("vertex.attribute.normal", true);
   }
   // 支持全法线
   var ab = pc.attributeContains(EG3dAttribute.Binormal);
   var at = pc.attributeContains(EG3dAttribute.Tangent);
   var af = (an && ab && at);
   o._dynamicVertexNormalFull = (o._supportVertexNormalFull && af);
   if(o._dynamicVertexNormalFull){
      s.append("|AF");
      pt.setBoolean("vertex.attribute.normal.full", true);
   }
   //............................................................
   // 支持实例技术
   o._dynamicInstance = (o._supportInstance && cp.optionInstance);
   if(o._dynamicInstance){
      s.append("|SI");
      if(pc){
         pt.setBoolean("support.instance", true);
      }
   }
   // 支持骨骼技术
   o._dynamicSkeleton = o._supportSkeleton;
   if(o._dynamicSkeleton){
      s.append("|SS");
      if(pc){
         pt.setBoolean("support.skeleton", true);
      }
   }
   //............................................................
   // 支持透明技术
   var sdf  = pc.samplerContains(EG3dSampler.Diffuse);
   //var samplerAlpha  = pc.samplerContains(EG3dSampler.Alpha);
   //o._dynamicAlpha = (o._supportAlpha && samplerAlpha);
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
   // 支持环境色技术
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
   //............................................................
   // 支持透明纹理
   if(pc.samplerContains(EG3dSampler.Alpha)){
      pt.setBoolean("support.alpha.sampler", true);
   }
   //............................................................
   // 支持散射技术
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
   // 支持视角散射技术
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
   //............................................................
   // 支持高光技术
   var spc = pc.samplerContains(EG3dSampler.SpecularColor);
   var spl = pc.samplerContains(EG3dSampler.SpecularLevel);
   o._dynamicSpecularColor = (o._supportSpecularColor && spc);
   o._dynamicSpecularLevel = (o._supportSpecularLevel && spl);
   if((o._dynamicSpecularColor || o._dynamicSpecularLevel) && o._dynamicVertexNormal){
      s.append("|TS");
      if(pc){
         pt.setBoolean("support.specular", true);
      }
      // 支持高光颜色技术
      if(o._dynamicSpecularColor){
         s.append("|TSC");
         if(pc){
            pt.setBoolean("support.specular.color", true);
         }
      }
      // 支持高光级别技术
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
   // 支持视角高光技术
   o._dynamicSpecularView = o._supportSpecularView;
   if(o._dynamicSpecularView && o._dynamicVertexNormal){
      s.append("|TSV");
      if(pc){
         pt.setBoolean("support.specular.view", true);
      }
      // 支持高光颜色技术
      if(o._dynamicSpecularColor){
         s.append("|TSVC");
         if(pc){
            pt.setBoolean("support.specular.view.color", true);
         }
      }
      // 支持高光级别技术
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
   //............................................................
   // 支持发光技术
   var slg = pc.samplerContains(EG3dSampler.Light);
   o._dynamicLight = (o._supportLight && slg);
   if(o._dynamicLight){
      s.append("|TL");
      if(pc){
         pt.setBoolean("support.sampler.light", true);
         pt.setBoolean("support.light", true);
      }
   }
   // 支持反射技术
   var slr = pc.samplerContains(EG3dSampler.Reflect);
   o._dynamicReflect = (o._supportReflect && slr);
   if(o._dynamicReflect){
      s.append("|TRL");
      if(pc){
         pt.setBoolean("support.sampler.light", true);
         pt.setBoolean("support.reflect", true);
      }
   }
   // 支持折射技术
   var slf = pc.samplerContains(EG3dSampler.Refract);
   o._dynamicRefract = (o._supportRefract && slf);
   if(o._dynamicRefract){
      s.append("|TRF");
      if(pc){
         pt.setBoolean("support.sampler.light", true);
         pt.setBoolean("support.refract", true);
      }
   }
   // 支持发光技术
   var sle = pc.samplerContains(EG3dSampler.Emissive);
   o._dynamicEmissive = (o._supportEmissive && sle);
   if(o._dynamicEmissive){
      s.append("|TLE");
      if(pc){
         pt.setBoolean("support.sampler.light", true);
         pt.setBoolean("support.emissive", true);
      }
   }
   //............................................................
   // 支持高度技术
   var shg = pc.samplerContains(EG3dSampler.Height);
   o._dynamicHeight = (o._supportHeight && shg);
   if(o._dynamicHeight){
      s.append("|TH");
      if(pc){
         pt.setBoolean("support.height", true);
      }
   }
   //............................................................
   // 支持环境技术
   var sen = pc.samplerContains(EG3dSampler.Environment);
   o._dynamicEnvironment = (o._supportEnvironment && sen);
   if(o._dynamicEnvironment){
      s.append("|TE");
      if(pc){
         pt.setBoolean("support.environment", true);
      }
   }
   //............................................................
   // 计算最大实例个数
   //o._dynamicInstance = o._supportInstance;
   //if(o._dynamicInstance){
      //var ic = cp.calculateInstanceCount(pc.vertexBoneCount, pc.vertexCount);
      //pt.set("instance.count", ic);
   //}
   // 计算骨头实例个数
   if(o._dynamicSkeleton){
      var bc = cp.calculateBoneCount(pc.vertexBoneCount, pc.vertexCount);
      s.append("|B" + bc);
      pt.set("bone.count", bc);
      pt.setBoolean("support.bone.weight.1", true);
      pt.setBoolean("support.bone.weight.2", true);
      pt.setBoolean("support.bone.weight.3", true);
      pt.setBoolean("support.bone.weight.4", true);
   }
   //............................................................
   // 设置代码
   pt.code = s.toString();
}

//==========================================================
// <T>绑定所有属性流。</T>
//
// @method
// @param p:renderable:FG3dRenderable 渲染对象
//==========================================================
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

//==========================================================
// <T>绑定所有取样器。</T>
//
// @method
// @param p:renderable:FG3dRenderable 渲染对象
//==========================================================
function FG3dAutomaticEffect_bindSamplers(p){
   var o = this;
   var g = o._program;
   // 绑定特定取样器
   if(o._supportMaterialMap){
      g.setSampler('fs_material', pg.materialMap().texture());
   }
   // 绑定取样器集合
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

//==========================================================
// <T>绑定材质。</T>
//
// @method
// @param p:material:FG3dMaterial 材质
//==========================================================
function FG3dAutomaticEffect_bindMaterial(p){
   var o = this;
   var c = o._graphicContext;
   var m = p.info();
   // 设置深度
   if(m.optionDepth){
      c.setDepthMode(o._stateDepth, o._stateDepthCd);
   }else{
      c.setDepthMode(false);
   }
   // 设置透明
   if(m.optionAlpha){
      c.setBlendFactors(o._stateBlend, o._stateBlendSourceCd, o._stateBlendTargetCd);
   }else{
      c.setBlendFactors(false);
   }
   // 设置双面
   if(m.optionDouble){
      c.setCullingMode(false);
   }else{
      c.setCullingMode(o._stateDepth, o._stateCullCd);
   }
}

//==========================================================
// <T>绘制渲染对象。</T>
//
// @method
// @param region:FG3dRegion 渲染区域
// @param renderable:FG3dRenderable 渲染对象
//==========================================================
function FG3dAutomaticEffect_drawRenderable(pg, renderable){
   var o = this;
   var context = o._graphicContext;
   var g = o._program;
   // 绘制准备
   var f = renderable.activeInfo();
   var l = f.layout;
   if(!l){
      l = f.layout = context.createLayout();
      // 绑定属性流集合
      if(o._supportLayout){
         l.bind();
         o.bindAttributes(renderable);
         l.unbind();
         l.active();
      }else{
         context.recordBegin();
         o.bindAttributes(renderable);
         context.recordEnd();
         l.linkBuffers(context.recordBuffers());
      }
      // 绑定取样器集合
      context.recordBegin();
      o.bindSamplers(renderable);
      context.recordEnd();
      l.linkSamplers(context.recordSamplers());
   }else{
      // 绑定所有属性流
      if(o._supportLayout){
         l.active();
      }else{
         l.bindBuffers();
      }
      // 绑定取样器集合
      l.bindSamplers();
   }
   //..........................................................
   // 绘制处理
   var indexBuffers = renderable.indexBuffers();
   var indexCount = indexBuffers.count();
   for(var i = 0; i < indexCount; i++){
      var indexBuffer = indexBuffers.at(i);
      context.drawTriangles(indexBuffer);
   }
   // 取消绑定取样器集合
   //l.unbindSamplers();
   //..........................................................
   // 绘制完成
   if(o._supportLayout){
      l.deactive();
   }
}
