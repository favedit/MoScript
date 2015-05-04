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
   o.bindMaterialSamplers     = FG3dAutomaticEffect_bindMaterialSamplers;
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
// @param tagContext:FTagContext 模板环境
// @param effectInfo:SG3dEffectInfo 渲染信息
//==========================================================
function FG3dAutomaticEffect_buildInfo(tagContext, pc){
   var o = this;
   var context = o._graphicContext;
   var capability = context.capability();
   // 获得参数
   var flag = new TString();
   flag.append(pc.techniqueModeCode)
   tagContext.set("technique.mode", pc.techniqueModeCode);
   //............................................................
   // 支持纹理材质映射
   var om = o._optionMerge = pc.optionMerge;
   if(om){
      var mc = pc.mergeCount;
      flag.append("|OI" + mc);
      tagContext.setBoolean("option.instance", true);
      tagContext.set("instance.count", mc);
   }
   //............................................................
   // 支持纹理材质映射
   if(capability.optionMaterialMap){
      flag.append("|OM");
      tagContext.setBoolean("option.material.map", true);
      o._supportMaterialMap = true;
   }
   // 支持纹理法线反响
   if(pc.optionNormalInvert){
      flag.append("|ON");
      tagContext.setBoolean("option.normal.invert", true);
      o._supportNormalInvert = true;
   }
   // 支持纹理颜色
   if(pc.optionColor){
      flag.append("|OC");
      tagContext.setBoolean("option.color", true);
      o.optionAmbient = true;
   }
   // 支持纹理环境
   if(pc.optionAmbient){
      flag.append("|OA");
      tagContext.setBoolean("option.ambient", true);
      o.optionAmbient = true;
   }
   // 支持纹理散射
   if(pc.optionDiffuse){
      flag.append("|OD");
      tagContext.setBoolean("option.diffuse", true);
      o.optionDiffuse = true;
   }
   // 支持纹理高光
   if(pc.optionSpecular){
      flag.append("|OS");
      tagContext.setBoolean("option.specular", true);
      o.optionSpecular = true;
   }
   // 支持纹理反射
   if(pc.optionReflect){
      flag.append("|ORL");
      tagContext.setBoolean("option.reflect", true);
      o.optionReflect = true;
   }
   // 支持纹理折射
   if(pc.optionRefract){
      flag.append("|ORF");
      tagContext.setBoolean("option.refract", true);
      o.optionRefract = true;
   }
   //............................................................
   // 支持顶点颜色
   var ac = pc.attributeContains(EG3dAttribute.Color);
   o._dynamicVertexColor = (o._supportVertexColor && ac);
   if(o._dynamicVertexColor){
      flag.append("|AC");
      tagContext.setBoolean("vertex.attribute.color", true);
   }
   // 支持顶点纹理
   var ad = pc.attributeContains(EG3dAttribute.Coord);
   o._dynamicVertexCoord = (o._supportVertexCoord && ad);
   if(o._dynamicVertexCoord){
      flag.append("|AD");
      tagContext.setBoolean("vertex.attribute.coord", true);
   }
   // 支持法线
   var an = pc.attributeContains(EG3dAttribute.Normal);
   o._dynamicVertexNormal = (o._supportVertexNormal && an);
   if(o._dynamicVertexNormal){
      flag.append("|AN");
      tagContext.setBoolean("vertex.attribute.normal", true);
   }
   // 支持全法线
   var ab = pc.attributeContains(EG3dAttribute.Binormal);
   var at = pc.attributeContains(EG3dAttribute.Tangent);
   var af = (an && ab && at);
   o._dynamicVertexNormalFull = (o._supportVertexNormalFull && af);
   if(o._dynamicVertexNormalFull){
      flag.append("|AF");
      tagContext.setBoolean("vertex.attribute.normal.full", true);
   }
   //............................................................
   // 支持实例技术
   o._dynamicInstance = (o._supportInstance && capability.optionInstance);
   if(o._dynamicInstance){
      flag.append("|SI");
      if(pc){
         tagContext.setBoolean("support.instance", true);
      }
   }
   // 支持骨骼技术
   o._dynamicSkeleton = o._supportSkeleton;
   if(o._dynamicSkeleton){
      flag.append("|SS");
      if(pc){
         tagContext.setBoolean("support.skeleton", true);
      }
   }
   //............................................................
   // 支持透明技术
   var sdf  = pc.samplerContains(EG3dSampler.Diffuse);
   //var samplerAlpha  = pc.samplerContains(EG3dSampler.Alpha);
   //o._dynamicAlpha = (o._supportAlpha && samplerAlpha);
   o._dynamicAlpha = o._supportAlpha;
   if(o._dynamicAlpha){
      flag.append("|RA");
      if(pc){
         tagContext.setBoolean("support.alpha", true);
      }
      o._optionBlendMode = true;
   }else{
      o._optionBlendMode = false;
   }
   // 支持环境色技术
   o._dynamicAmbient = o._supportAmbient;
   if(o._dynamicAmbient){
      flag.append("|TA");
      if(pc){
         tagContext.setBoolean("support.ambient", true);
      }
      if(sdf){
         flag.append("|TAS");
         if(pc){
            tagContext.setBoolean("support.ambient.sampler", true);
         }
      }
   }
   //............................................................
   // 支持透明纹理
   if(pc.samplerContains(EG3dSampler.Alpha)){
      tagContext.setBoolean("support.alpha.sampler", true);
   }
   //............................................................
   // 支持散射技术
   var snr = pc.samplerContains(EG3dSampler.Normal);
   o._dynamicDiffuse = o._supportDiffuse && (o._dynamicVertexNormal || snr);
   if(o._supportDiffuse){
      if(pc){
         tagContext.setBoolean("support.diffuse", true);
      }
      if(snr){
         flag.append("|TDD");
         if(pc){
            tagContext.setBoolean("support.dump", true);
            tagContext.setBoolean("support.diffuse.dump", true);
         }
      }else if(o._dynamicVertexNormal){
         flag.append("|TDN");
         if(pc){
            tagContext.setBoolean("support.diffuse.normal", true);
         }
      }
   }
   // 支持视角散射技术
   o._dynamicDiffuseView = (o._supportDiffuseView && (o._dynamicVertexNormal || snr));
   if(o._supportDiffuseView){
      if(pc){
         tagContext.setBoolean("support.diffuse.view", true);
      }
      if(snr){
         flag.append("|TDVD");
         if(pc){
            tagContext.setBoolean("support.dump", true);
            tagContext.setBoolean("support.diffuse.view.dump", true);
         }
      }else if(o._dynamicVertexNormal){
         flag.append("|TDVN");
         if(pc){
            tagContext.setBoolean("support.diffuse.view.normal", true);
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
      flag.append("|TS");
      if(pc){
         tagContext.setBoolean("support.specular", true);
      }
      // 支持高光颜色技术
      if(o._dynamicSpecularColor){
         flag.append("|TSC");
         if(pc){
            tagContext.setBoolean("support.specular.color", true);
         }
      }
      // 支持高光级别技术
      if(o._dynamicSpecularLevel){
         flag.append("|TSL");
         if(pc){
            tagContext.setBoolean("support.specular.level", true);
         }
      }else{
         flag.append("|NSL");
         if(pc){
            tagContext.setBoolean("support.specular.normal", true);
         }
      }
   }
   // 支持视角高光技术
   o._dynamicSpecularView = o._supportSpecularView;
   if(o._dynamicSpecularView && o._dynamicVertexNormal){
      flag.append("|TSV");
      if(pc){
         tagContext.setBoolean("support.specular.view", true);
      }
      // 支持高光颜色技术
      if(o._dynamicSpecularColor){
         flag.append("|TSVC");
         if(pc){
            tagContext.setBoolean("support.specular.view.color", true);
         }
      }
      // 支持高光级别技术
      if(o._dynamicSpecularLevel){
         flag.append("|TSVL");
         if(pc){
            tagContext.setBoolean("support.specular.view.level", true);
         }
      }else{
         flag.append("|NSVL");
         if(pc){
            tagContext.setBoolean("support.specular.view.normal", true);
         }
      }
   }
   //............................................................
   // 支持发光技术
   var slg = pc.samplerContains(EG3dSampler.Light);
   o._dynamicLight = (o._supportLight && slg);
   if(o._dynamicLight){
      flag.append("|TL");
      if(pc){
         tagContext.setBoolean("support.sampler.light", true);
         tagContext.setBoolean("support.light", true);
      }
   }
   // 支持反射技术
   var slr = pc.samplerContains(EG3dSampler.Reflect);
   o._dynamicReflect = (o._supportReflect && slr);
   if(o._dynamicReflect){
      flag.append("|TRL");
      if(pc){
         tagContext.setBoolean("support.sampler.light", true);
         tagContext.setBoolean("support.reflect", true);
      }
   }
   // 支持折射技术
   var slf = pc.samplerContains(EG3dSampler.Refract);
   o._dynamicRefract = (o._supportRefract && slf);
   if(o._dynamicRefract){
      flag.append("|TRF");
      if(pc){
         tagContext.setBoolean("support.sampler.light", true);
         tagContext.setBoolean("support.refract", true);
      }
   }
   // 支持发光技术
   var sle = pc.samplerContains(EG3dSampler.Emissive);
   o._dynamicEmissive = (o._supportEmissive && sle);
   if(o._dynamicEmissive){
      flag.append("|TLE");
      if(pc){
         tagContext.setBoolean("support.sampler.light", true);
         tagContext.setBoolean("support.emissive", true);
      }
   }
   //............................................................
   // 支持高度技术
   var shg = pc.samplerContains(EG3dSampler.Height);
   o._dynamicHeight = (o._supportHeight && shg);
   if(o._dynamicHeight){
      flag.append("|TH");
      if(pc){
         tagContext.setBoolean("support.height", true);
      }
   }
   //............................................................
   // 支持环境技术
   var sen = pc.samplerContains(EG3dSampler.Environment);
   o._dynamicEnvironment = (o._supportEnvironment && sen);
   if(o._dynamicEnvironment){
      flag.append("|TE");
      if(pc){
         tagContext.setBoolean("support.environment", true);
      }
   }
   //............................................................
   // 计算最大实例个数
   //o._dynamicInstance = o._supportInstance;
   //if(o._dynamicInstance){
      //var ic = capability.calculateInstanceCount(pc.vertexBoneCount, pc.vertexCount);
      //tagContext.set("instance.count", ic);
   //}
   // 计算骨头实例个数
   if(o._dynamicSkeleton){
      var boneCount = capability.calculateBoneCount(pc.vertexBoneCount, pc.vertexCount);
      flag.append("|B" + boneCount);
      tagContext.set("bone.count", boneCount);
      tagContext.setBoolean("support.bone.weight.1", true);
      tagContext.setBoolean("support.bone.weight.2", true);
      tagContext.setBoolean("support.bone.weight.3", true);
      tagContext.setBoolean("support.bone.weight.4", true);
   }
   //............................................................
   // 设置代码
   tagContext.code = flag.flush();
}

//==========================================================
// <T>绑定所有属性流。</T>
//
// @method
// @param renderable:FG3dRenderable 渲染对象
//==========================================================
function FG3dAutomaticEffect_bindAttributes(renderable){
   var o = this;
   var program = o._program;
   if(program.hasAttribute()){
      var attributes = program.attributes();
      var count = attributes.count();
      for(var n = 0; n < count; n++){
         var attribute = attributes.at(n);
         if(attribute._statusUsed){
            var buffer = renderable.findVertexBuffer(attribute._linker);
            program.setAttribute(attribute._name, buffer, buffer._formatCd);
         }
      }
   }
}

//==========================================================
// <T>绑定所有取样器。</T>
//
// @method
// @param region:FG3dRegion 渲染区域
// @param renderable:FG3dRenderable 渲染对象
//==========================================================
function FG3dAutomaticEffect_bindSamplers(renderable){
   var o = this;
   var program = o._program;
   // 绑定特定取样器
   if(o._supportMaterialMap){
      program.setSampler('fs_material', region.materialMap().texture());
   }
   // 绑定取样器集合
   if(program.hasSampler()){
      var samplers = program.samplers();
      var count = samplers.count();
      for(var n = 0; n < count; n++){
         var sampler = samplers.at(n);
         if(sampler._bind && sampler._statusUsed){
            var linker = sampler.linker();
            var texture = renderable.findTexture(linker);
            program.setSampler(sampler.name(), texture.texture());
         }
      }
   }
}

//==========================================================
// <T>绑定所有取样器。</T>
//
// @method
// @param renderable:FG3dRenderable 渲染对象
// @param material:FE3dMaterial 渲染材质
//==========================================================
function FG3dAutomaticEffect_bindMaterialSamplers(renderable, material){
   var o = this;
   var program = o._program;
   // 绑定取样器集合
   if(program.hasSampler()){
      var samplers = program.samplers();
      var count = samplers.count();
      for(var n = 0; n < count; n++){
         var sampler = samplers.at(n);
         if(sampler._bind && sampler._statusUsed){
            var linker = sampler.linker();
            var texture = material.findBitmap(linker);
            program.setSampler(sampler.name(), texture.texture());
         }
      }
   }
}

//==========================================================
// <T>绑定材质。</T>
//
// @method
// @param material:FG3dMaterial 材质
//==========================================================
function FG3dAutomaticEffect_bindMaterial(material){
   var o = this;
   var context = o._graphicContext;
   var info = material.info();
   // 设置深度
   if(info.optionDepth){
      context.setDepthMode(o._stateDepth, o._stateDepthCd);
   }else{
      context.setDepthMode(false);
   }
   // 设置透明
   if(info.optionAlpha){
      context.setBlendFactors(o._stateBlend, o._stateBlendSourceCd, o._stateBlendTargetCd);
   }else{
      context.setBlendFactors(false);
   }
   // 设置双面
   if(info.optionDouble){
      context.setCullingMode(false);
   }else{
      context.setCullingMode(o._stateDepth, o._stateCullCd);
   }
}

//==========================================================
// <T>绘制渲染对象。</T>
//
// @method
// @param region:FG3dRegion 渲染区域
// @param renderable:FG3dRenderable 渲染对象
//==========================================================
function FG3dAutomaticEffect_drawRenderable(region, renderable){
   var o = this;
   var context = o._graphicContext;
   var program = o._program;
   // 绘制准备
   var info = renderable.activeInfo();
   var layout = info.layout;
   if(!layout){
      layout = info.layout = context.createLayout();
      // 绑定属性流集合
      if(o._supportLayout){
         layout.bind();
         o.bindAttributes(renderable);
         layout.unbind();
         layout.active();
      }else{
         context.recordBegin();
         o.bindAttributes(renderable);
         context.recordEnd();
         layout.linkBuffers(context.recordBuffers());
      }
      // 绑定取样器集合
      context.recordBegin();
      o.bindSamplers(renderable);
      context.recordEnd();
      layout.linkSamplers(context.recordSamplers());
   }else{
      // 绑定所有属性流
      if(o._supportLayout){
         layout.active();
      }else{
         layout.bindBuffers();
      }
      // 绑定取样器集合
      layout.bindSamplers();
   }
   //..........................................................
   // 绘制处理
   var indexCount = 0;
   var indexBuffers = renderable.indexBuffers();
   if(indexBuffers){
      indexCount = indexBuffers.count();
   }
   if(indexCount > 1){
      var materials = renderable.materials();
      for(var i = 0; i < indexCount; i++){
         var indexBuffer = indexBuffers.at(i);
         if(materials){
            var material = materials.at(i);
            if(material){
               o.bindMaterialSamplers(renderable, material);
            }
         }
         context.drawTriangles(indexBuffer);
      }
   }else{
      context.drawTriangles(renderable.indexBuffer());
   }
   // 取消绑定取样器集合（TODO：不执行也正确）
   // layout.unbindSamplers();
   //..........................................................
   // 绘制完成
   if(o._supportLayout){
      layout.deactive();
   }
}
