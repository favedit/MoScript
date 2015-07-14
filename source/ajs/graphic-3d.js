MO.EG3dMaterialMap = new function EG3dMaterialMap(){
   var o = this;
   o.AmbientColor = 0;
   o.DiffuseColor = 1;
   o.SpecularColor = 2;
   o.ReflectColor = 3;
   o.EmissiveColor = 4;
   o.Count = 8;
   return o;
}
MO.EG3dRegionParameter = new function EG3dRegionParameter(){
   var o = this;
   o.Unknown                    = 0;
   o.CameraPosition             = 1;
   o.CameraDirection            = 2;
   o.CameraViewMatrix           = 3;
   o.CameraProjectionMatrix     = 4;
   o.CameraViewProjectionMatrix = 5;
   o.LightPosition              = 6;
   o.LightDirection             = 7;
   o.LightViewMatrix            = 8;
   o.LightProjectionMatrix      = 9;
   o.LightViewProjectionMatrix  = 10;
   o.LightInfo                  = 11;
   return o;
}
MO.EG3dTechniqueMode = new function EG3dTechniqueMode(){
   var o = this;
   o.Color         = 'color';
   o.Ambient       = 'ambient';
   o.DiffuseLevel  = 'diffuse.level';
   o.DiffuseColor  = 'diffuse.color';
   o.SpecularLevel = 'specular.level';
   o.SpecularColor = 'specular.color';
   o.Reflect       = 'reflect';
   o.Emissive      = 'emissive';
   o.Result        = 'result';
   return o;
}
MO.MG3dRegion = function MG3dRegion(o){
   o = MO.Class.inherits(this, o);
   o._changed                    = false;
   o._spaceName                  = MO.Class.register(o, new MO.AGetter('_spaceName'));
   o._technique                  = MO.Class.register(o, new MO.AGetSet('_technique'));
   o._techniquePass              = MO.Class.register(o, new MO.AGetter('_techniquePass'));
   o._camera                     = MO.Class.register(o, new MO.AGetter('_camera'));
   o._projection                 = null;
   o._directionalLight           = MO.Class.register(o, new MO.AGetter('_directionalLight'));
   o._lights                     = MO.Class.register(o, new MO.AGetter('_lights'));
   o._allRenderables             = MO.Class.register(o, new MO.AGetter('_allRenderables'));
   o._renderables                = MO.Class.register(o, new MO.AGetter('_renderables'));
   o._ratioMatrix                = null;
   o._cameraPosition             = null;
   o._cameraDirection            = null;
   o._cameraViewMatrix           = null;
   o._cameraProjectionMatrix     = null;
   o._cameraViewProjectionMatrix = null;
   o._lightPosition              = null;
   o._lightDirection             = null;
   o._lightViewMatrix            = null;
   o._lightProjectionMatrix      = null;
   o._lightViewProjectionMatrix  = null;
   o._lightInfo                  = null;
   o.construct                   = MO.MG3dRegion_construct;
   o.isChanged                   = MO.MG3dRegion_isChanged;
   o.setTechniquePass            = MO.MG3dRegion_setTechniquePass;
   o.pushRenderable              = MO.MG3dRegion_pushRenderable;
   o.setup                       = MO.MG3dRegion_setup;
   o.change                      = MO.MG3dRegion_change;
   o.prepare                     = MO.MG3dRegion_prepare;
   o.reset                       = MO.MG3dRegion_reset;
   o.calculate                   = MO.MG3dRegion_calculate;
   o.update                      = MO.MG3dRegion_update;
   o.dispose                     = MO.MG3dRegion_dispose;
   return o;
}
MO.MG3dRegion_construct = function MG3dRegion_construct(){
   var o = this;
   o._lights = new MO.TObjects();
   o._renderables = new MO.TObjects();
   o._allRenderables = new MO.TObjects();
   o._ratioMatrix = new MO.SMatrix3d();
   o._cameraPosition = new MO.SPoint3();
   o._cameraDirection = new MO.SVector3();
   o._cameraViewMatrix = new MO.SMatrix3d();
   o._cameraProjectionMatrix = new MO.SMatrix3d();
   o._cameraViewProjectionMatrix = new MO.SMatrix3d();
   o._lightPosition = new MO.SPoint3();
   o._lightDirection = new MO.SVector3();
   o._lightViewMatrix = new MO.SMatrix3d();
   o._lightProjectionMatrix = new MO.SMatrix3d();
   o._lightViewProjectionMatrix = new MO.SMatrix3d();
   o._lightInfo = new MO.SVector4();
}
MO.MG3dRegion_isChanged = function MG3dRegion_isChanged(){
   return this._changed;
}
MO.MG3dRegion_setTechniquePass = function MG3dRegion_setTechniquePass(p, f){
   var o = this;
   o._techniquePass = p;
   o._spaceName = p.fullCode();
   o._finish = f;
}
MO.MG3dRegion_pushRenderable = function MG3dRegion_pushRenderable(p){
   var o = this;
   o._renderables.push(p);
   o._allRenderables.push(p);
}
MO.MG3dRegion_setup = function MG3dRegion_setup(){
   var o = this;
}
MO.MG3dRegion_change = function MG3dRegion_change(){
   this._changed = true;
}
MO.MG3dRegion_prepare = function MG3dRegion_prepare(){
   var o = this;
   o._changed = false;
   var camera = o._camera;
   var projection = camera.projection();
   camera.updateFrustum();
   var pixelRatio = MO.Window.Browser.capability().pixelRatio;
   var ratioMatrix = o._ratioMatrix.identity();
   o._cameraPosition.assign(camera.position());
   o._cameraDirection.assign(camera.direction());
   o._cameraViewMatrix.assign(camera.matrix());
   o._cameraProjectionMatrix.assign(projection.matrix());
   o._cameraViewProjectionMatrix.assign(camera.matrix());
   o._cameraViewProjectionMatrix.append(projection.matrix());
   var light = o._directionalLight;
   var lc = light.camera();
   var lcp = lc.position();
   var lp = lc.projection();
   o._lightPosition.assign(lc.position());
   o._lightDirection.assign(lc.direction());
   o._lightViewMatrix.assign(lc.matrix());
   o._lightProjectionMatrix.assign(lp.matrix());
   o._lightViewProjectionMatrix.assign(lc.matrix());
   o._lightViewProjectionMatrix.append(lp.matrix());
   o._lightInfo.set(0, 0, lp._znear, 1.0 / lp.distance());
   o._allRenderables.clear();
}
MO.MG3dRegion_reset = function MG3dRegion_reset(){
   var o = this;
   o._renderables.clear();
}
MO.MG3dRegion_calculate = function MG3dRegion_calculate(parameterCd){
   var o = this;
   switch(parameterCd){
      case MO.EG3dRegionParameter.CameraPosition:
         return o._cameraPosition;
      case MO.EG3dRegionParameter.CameraDirection:
         return o._cameraDirection;
      case MO.EG3dRegionParameter.CameraViewMatrix:
         return o._cameraViewMatrix;
      case MO.EG3dRegionParameter.CameraProjectionMatrix:
         return o._cameraProjectionMatrix;
      case MO.EG3dRegionParameter.CameraViewProjectionMatrix:
         return o._cameraViewProjectionMatrix;
      case MO.EG3dRegionParameter.LightPosition:
         return o._lightPosition;
      case MO.EG3dRegionParameter.LightDirection:
         return o._lightDirection;
      case MO.EG3dRegionParameter.LightViewMatrix:
         return o._lightViewMatrix;
      case MO.EG3dRegionParameter.LightProjectionMatrix:
         return o._lightProjectionMatrix;
      case MO.EG3dRegionParameter.LightViewProjectionMatrix:
         return o._lightViewProjectionMatrix;
      case MO.EG3dRegionParameter.LightInfo:
         return o._lightInfo;
   }
   throw new MO.TError(o, 'Unknown parameter type. (type_cd={1})', parameterCd);
}
MO.MG3dRegion_update = function MG3dRegion_update(){
   var o = this;
   var renderables = o._renderables;
   var count = renderables.count();
   for(var i = 0; i < count; i++){
      var renderable = renderables.at(i);
      renderable.update(o);
   }
}
MO.MG3dRegion_dispose = function MG3dRegion_dispose(){
   var o = this;
   o._ratioMatrix = MO.Lang.Object.free(o._ratioMatrix);
   o._renderables = MO.Lang.Object.free(o._renderables);
   o._allRenderables = MO.Lang.Object.free(o._allRenderables);
}
MO.MG3dRenderable = function MG3dRenderable(o){
   o = MO.Class.inherits(this, o, MO.MGraphicRenderable);
   o._optionMerge   = false;
   o._currentMatrix = MO.Class.register(o, new MO.AGetter('_currentMatrix'));
   o._matrix        = MO.Class.register(o, new MO.AGetter('_matrix'));
   o._material      = MO.Class.register(o, new MO.AGetSet('_material'));
   o._activeInfo    = MO.Class.register(o, new MO.AGetter('_activeInfo'));
   o._infos         = null;
   o.construct      = MO.MG3dRenderable_construct;
   o.activeEffect   = MO.MG3dRenderable_activeEffect;
   o.effectFind     = MO.MG3dRenderable_effectFind;
   o.effectSet      = MO.MG3dRenderable_effectSet;
   o.infos          = MO.MG3dRenderable_infos;
   o.selectInfo     = MO.MG3dRenderable_selectInfo;
   o.resetInfos     = MO.MG3dRenderable_resetInfos;
   o.testVisible    = MO.Method.emptyTrue;
   o.update         = MO.Method.empty;
   o.dispose        = MO.MG3dRenderable_dispose;
   return o;
}
MO.MG3dRenderable_construct = function MG3dRenderable_construct(){
   var o = this;
   o._currentMatrix = new MO.SMatrix3d();
   o._matrix = new MO.SMatrix3d();
}
MO.MG3dRenderable_activeEffect = function MG3dRenderable_activeEffect(){
   var info = this._activeInfo;
   return info ? info.effect : null;
}
MO.MG3dRenderable_effectFind = function MG3dRenderable_effectFind(code){
   var o = this;
   var infos = o._infos;
   if(infos){
      var info = infos.get(code);
      if(info){
         return info.effect;
      }
   }
   return null;
}
MO.MG3dRenderable_effectSet = function MG3dRenderable_effectSet(code, effect){
   var o = this;
   var infos = o.infos();
   var info = infos.get(code);
   if(!info){
      info = new MO.SG3dRenderableInfo();
      infos.set(code, info)
   }
   info.effect = effect;
}
MO.MG3dRenderable_infos = function MG3dRenderable_infos(){
   var o = this;
   var infos = o._infos;
   if(!infos){
      infos = o._infos = new MO.TDictionary();
   }
   return infos;
}
MO.MG3dRenderable_selectInfo = function MG3dRenderable_selectInfo(code){
   var o = this;
   var infos = o.infos();
   var info = infos.get(code);
   if(!info){
      info = new MO.SG3dRenderableInfo();
      infos.set(code, info)
   }
   o._activeInfo = info;
   return info;
}
MO.MG3dRenderable_resetInfos = function MG3dRenderable_resetInfos(){
   var o = this;
   var infos = o._infos;
   if(infos){
      var count = infos.count();
      for(var i = 0; i < count; i++){
         var info = infos.at(i);
         info.reset();
      }
   }
}
MO.MG3dRenderable_dispose = function MG3dRenderable_dispose(){
   var o = this;
   o._currentMatrix = MO.Lang.Object.dispose(o._currentMatrix);
   o._matrix = MO.Lang.Object.dispose(o._matrix);
   o._material = MO.Lang.Object.dispose(o._material);
   o._activeInfo = null;
   o._infos = MO.Lang.Object.dispose(o._infos);
}
MO.SG3dEffectInfo = function SG3dEffectInfo(){
   var o = this;
   o.code                  = null;
   o.techniqueCode         = null;
   o.techniqueModeCode     = null;
   o.optionMerge           = null;
   o.mergeCount            = null;
   o.fillModeCd            = null;
   o.optionCullMode        = null;
   o.cullModeCd            = null;
   o.optionDepthTest       = null;
   o.depthModeCd           = null;
   o.optionDepthWrite      = null;
   o.optionBlendMode       = null;
   o.blendSourceMode       = null;
   o.blendTargetMode       = null;
   o.optionAlphaTest       = null;
   o.optionNormalInvert    = null;
   o.optionNormalCompress  = null;
   o.supportInstance       = null;
   o.vertexCount           = 0;
   o.vertexColor           = null;
   o.vertexCoord           = null;
   o.vertexNormal          = null;
   o.vertexNormalFull      = null;
   o.vertexSkeleton        = null;
   o.vertexBoneCount       = 0;
   o.fragmentAlpha         = null;
   o.fragmentBump          = null;
   o.fragmentAmbient       = null;
   o.fragmentDiffuse       = null;
   o.fragmentDiffuseView   = null;
   o.fragmentSpecularColor = null;
   o.fragmentSpecularLevel = null;
   o.fragmentSpecularView  = null;
   o.fragmentEnvironment   = null;
   o.fragmentLight         = null;
   o.fragmentReflect       = null;
   o.fragmentRefract       = null;
   o.fragmentEmissive      = null;
   o.fragmentHeight        = null;
   o.attributes            = new MO.TArray();
   o.samplers              = new MO.TArray();
   o.attributeContains     = MO.SG3dEffectInfo_attributeContains;
   o.samplerContains       = MO.SG3dEffectInfo_samplerContains;
   o.reset                 = MO.SG3dEffectInfo_reset;
   o.reset();
   return o;
}
MO.SG3dEffectInfo_attributeContains = function SG3dEffectInfo_attributeContains(p){
   return this.attributes.contains(p);
}
MO.SG3dEffectInfo_samplerContains = function SG3dEffectInfo_samplerContains(p){
   return this.samplers.contains(p);
}
MO.SG3dEffectInfo_reset = function SG3dEffectInfo_reset(){
   var o = this;
   o.code = null;
   o.optionMerge = false;
   o.mergeCount = 0;
   o.fillModeCd = MO.EG3dFillMode.Fill;
   o.optionCullMode = true;
   o.cullModeCd = MO.EG3dCullMode.Front;
   o.optionDepthTest = true;
   o.depthModeCd = MO.EG3dDepthMode.Less;
   o.optionDepthWrite = true;
   o.optionBlendMode = false;
   o.blendSourceMode = MO.EG3dBlendMode.SourceAlpha;
   o.blendTargetMode = MO.EG3dBlendMode.OneMinusSourceAlpha;
   o.optionAlphaTest = false;
   o.optionNormalInvert = false;
   o.optionNormalCompress = true;
   o.supportInstance = false;
   o.vertexCount = 0;
   o.vertexColor = false;
   o.vertexCoord = false;
   o.vertexNormal = false;
   o.vertexNormalFull = false;
   o.vertexSkeleton = false;
   o.vertexBoneCount = 0;
   o.fragmentAlpha = false;
   o.fragmentBump = false;
   o.fragmentAmbient = false;
   o.fragmentDiffuse = false;
   o.fragmentDiffuseView = false;
   o.fragmentSpecularColor = false;
   o.fragmentSpecularLevel = false;
   o.fragmentSpecularView = false;
   o.fragmentEnvironment = false;
   o.fragmentLight = false;
   o.fragmentReflect = false;
   o.fragmentRefract = false;
   o.fragmentEmissive = false;
   o.fragmentHeight = false;
   o.attributes.clear();
   o.samplers.clear();
}
MO.SG3dMaterialInfo = function SG3dMaterialInfo(){
   var o = this;
   o.effectCode           = 'automatic';
   o.optionDepth          = null;
   o.optionDouble         = null;
   o.optionNormalInvert   = null;
   o.optionShadow         = null;
   o.optionShadowSelf     = null;
   o.optionAlpha          = null;
   o.alphaBase            = 1.0;
   o.alphaRate            = 1.0;
   o.alphaLevel           = 1.0;
   o.alphaMerge           = 1.0;
   o.optionColor          = null;
   o.colorMin             = 0.0;
   o.colorMax             = 1.0;
   o.colorBalance         = 0.5;
   o.colorRate            = 1.0;
   o.optionVertex         = null;
   o.vertexColor          = new MO.SColor4();
   o.optionAmbient        = null;
   o.ambientColor         = new MO.SColor4();
   o.ambientShadow        = 1.0;
   o.optionDiffuse        = null;
   o.diffuseColor         = new MO.SColor4();
   o.diffuseShadow        = 1.0;
   o.optionDiffuseView    = null;
   o.diffuseViewColor     = new MO.SColor4();
   o.diffuseViewShadow    = 1.0;
   o.optionSpecular       = null;
   o.specularColor        = new MO.SColor4();
   o.specularBase         = 1.0;
   o.specularLevel        = 1.0;
   o.specularAverage      = 1.0;
   o.specularShadow       = 1.0;
   o.specularInfo         = null;
   o.optionSpecularView   = null;
   o.specularViewColor    = new MO.SColor4();
   o.specularViewBase     = 1.0;
   o.specularViewRate     = 1.0;
   o.specularViewAverage  = 1.0;
   o.specularViewShadow   = 1.0;
   o.specularViewShadow   = null;
   o.optionReflect        = null;
   o.reflectColor         = new MO.SColor4();
   o.reflectMerge         = 1.0;
   o.reflectShadow        = 1.0;
   o.optionRefract        = null;
   o.refractFrontColor    = new MO.SColor4();
   o.refractBackColor     = new MO.SColor4();
   o.optionOpacity        = null;
   o.opacityColor         = new MO.SColor4();
   o.opacityRate          = 1.0;
   o.opacityAlpha         = 1.0;
   o.opacityDepth         = 1.0;
   o.opacityTransmittance = 1.0;
   o.optionEmissive       = null;
   o.emissiveColor        = new MO.SColor4();
   o.assign               = MO.SG3dMaterialInfo_assign;
   o.calculate            = MO.SG3dMaterialInfo_calculate;
   o.reset                = MO.SG3dMaterialInfo_reset;
   o.reset();
   return o;
}
MO.SG3dMaterialInfo_assign = function SG3dMaterialInfo_assign(info){
   var o = this;
   o.effectCode = info.effectCode;
   o.transformName = info.transformName;
   o.optionDepth = info.optionDepth;
   o.optionDouble = info.optionDouble;
   o.optionNormalInvert = info.optionNormalInvert;
   o.optionShadow = info.optionShadow;
   o.optionShadowSelf = info.optionShadowSelf;
   o.optionAlpha = info.optionAlpha;
   o.alphaBase = info.alphaBase;
   o.alphaRate = info.alphaRate;
   o.alphaLevel = info.alphaLevel;
   o.alphaMerge = info.alphaMerge;
   o.optionColor = info.optionColor;
   o.colorMin = info.colorMin;
   o.colorMax = info.colorMax;
   o.colorBalance = info.colorBalance;
   o.colorRate = info.colorRate;
   o.optionVertex = info.optionVertex;
   o.vertexColor.assign(info.vertexColor);
   o.optionAmbient = info.optionAmbient;
   o.ambientColor.assign(info.ambientColor);
   o.ambientShadow = info.ambientShadow;
   o.optionDiffuse = info.optionDiffuse;
   o.diffuseColor.assign(info.diffuseColor);
   o.diffuseShadow = info.diffuseShadow;
   o.optionDiffuseView = info.optionDiffuseView;
   o.diffuseViewColor.assign(info.diffuseViewColor);
   o.diffuseViewShadow = info.diffuseViewShadow;
   o.optionSpecular = info.optionSpecular;
   o.specularColor.assign(info.specularColor);
   o.specularBase = info.specularBase;
   o.specularLevel = info.specularLevel;
   o.specularAverage = info.specularAverage;
   o.specularShadow = info.specularShadow;
   o.optionSpecularView = info.optionSpecularView;
   o.specularViewColor.assign(info.specularViewColor);
   o.specularViewBase = info.specularViewBase;
   o.specularViewRate = info.specularViewRate;
   o.specularViewAverage = info.specularViewAverage;
   o.specularViewShadow = info.specularViewShadow;
   o.optionReflect = info.optionReflect;
   o.reflectColor.assign(info.reflectColor);
   o.reflectMerge = MO.Lang.Float.toRange(info.reflectMerge, 0, 2);
   o.reflectShadow = info.reflectShadow;
   o.optionRefract = info.optionRefract;
   o.refractFrontColor.assign(info.refractFrontColor);
   o.refractFrontMerge = info.refractFrontMerge;
   o.refractFrontShadow = info.refractFrontShadow;
   o.refractBackColor.assign(info.refractBackColor);
   o.refractBackMerge = info.refractBackMerge;
   o.refractBackShadow = info.refractBackShadow;
   o.optionOpacity = info.optionOpacity;
   o.opacityColor.assign(info.opacityColor);
   o.opacityRate = info.opacityRate;
   o.opacityAlpha = info.optionAlpha;
   o.opacityDepth = info.optionDepth;
   o.opacityTransmittance = info.optionTransmittance;
   o.optionEmissive = info.optionEmissive;
   o.emissiveColor.assign(info.emissiveColor);
}
MO.SG3dMaterialInfo_calculate = function SG3dMaterialInfo_calculate(info){
   var o = this;
   o.effectCode = info.effectCode;
   o.transformName = info.transformName;
   o.optionDepth = info.optionDepth;
   o.optionDouble = info.optionDouble;
   o.optionNormalInvert = info.optionNormalInvert;
   o.optionShadow = info.optionShadow;
   o.optionShadowSelf = info.optionShadowSelf;
   o.optionAlpha = info.optionAlpha;
   o.alphaBase = info.alphaBase;
   o.alphaRate = info.alphaRate;
   o.alphaLevel = info.alphaLevel;
   o.alphaMerge = info.alphaMerge;
   o.optionColor = info.optionColor;
   o.colorMin = info.colorMin;
   o.colorMax = info.colorMax;
   o.colorBalance = info.colorBalance;
   o.colorRate = info.colorRate;
   o.optionVertex = info.optionVertex;
   o.vertexColor.assignPower(info.vertexColor);
   o.optionAmbient = info.optionAmbient;
   o.ambientColor.assignPower(info.ambientColor);
   o.ambientShadow = info.ambientShadow;
   o.optionDiffuse = info.optionDiffuse;
   o.diffuseColor.assignPower(info.diffuseColor);
   o.diffuseShadow = info.diffuseShadow;
   o.optionDiffuseView = info.optionDiffuseView;
   o.diffuseViewColor.assignPower(info.diffuseViewColor);
   o.diffuseViewShadow = info.diffuseViewShadow;
   o.optionSpecular = info.optionSpecular;
   o.specularColor.assignPower(info.specularColor);
   o.specularBase = info.specularBase;
   o.specularLevel = info.specularLevel;
   o.specularAverage = info.specularAverage;
   o.specularShadow = info.specularShadow;
   o.optionSpecularView = info.optionSpecularView;
   o.specularViewColor.assignPower(info.specularViewColor);
   o.specularViewBase = info.specularViewBase;
   o.specularViewRate = info.specularViewRate;
   o.specularViewAverage = info.specularViewAverage;
   o.specularViewShadow = info.specularViewShadow;
   o.optionReflect = info.optionReflect;
   o.reflectColor.assignPower(info.reflectColor);
   o.reflectMerge = MO.Lang.Float.toRange(info.reflectMerge, 0, 2);
   o.reflectShadow = info.reflectShadow;
   o.optionRefract = info.optionRefract;
   o.refractFrontColor.assignPower(info.refractFrontColor);
   o.refractFrontMerge = info.refractFrontMerge;
   o.refractFrontShadow = info.refractFrontShadow;
   o.refractBackColor.assignPower(info.refractBackColor);
   o.refractBackMerge = info.refractBackMerge;
   o.refractBackShadow = info.refractBackShadow;
   o.optionOpacity = info.optionOpacity;
   o.opacityColor.assignPower(info.opacityColor);
   o.opacityRate = info.opacityRate;
   o.opacityAlpha = info.optionAlpha;
   o.opacityDepth = info.optionDepth;
   o.opacityTransmittance = info.optionTransmittance;
   o.optionEmissive = info.optionEmissive;
   o.emissiveColor.assignPower(info.emissiveColor);
}
MO.SG3dMaterialInfo_reset = function SG3dMaterialInfo_reset(){
   var o = this;
   o.optionDepth = true;
   o.optionDouble = false;
   o.optionNormalInvert = false;
   o.optionShadow = true;
   o.optionShadowSelf = true;
   o.optionAlpha = false;
   o.alphaBase = 0.2;
   o.alphaRate = 1;
   o.alphaLevel = 1;
   o.alphaMerge = 1;
   o.optionColor = true;
   o.colorMin = 0;
   o.colorMax = 1;
   o.colorBalance = 0.5;
   o.colorRate = 1;
   o.optionVertex = true;
   o.vertexColor.set(1, 1, 1, 1);
   o.optionAmbient = true;
   o.ambientColor.set(0.5, 0.5, 0.5, 1);
   o.ambientShadow = 1;
   o.optionDiffuse = true;
   o.diffuseColor.set(0.5, 0.5, 0.5, 1);
   o.diffuseShadow = 1;
   o.optionDiffuseView = true;
   o.diffuseViewColor.set(1, 1, 1, 1);
   o.diffuseViewShadow = 1;
   o.optionSpecular = true;
   o.specularColor.set(0.5, 0.5, 0.5, 1);
   o.specularBase = 0;
   o.specularLevel = 16;
   o.specularAverage = 1;
   o.specularShadow = 1;
   o.optionSpecularView = true;
   o.specularViewColor.set(1, 1, 1, 1);
   o.specularViewBase = 0;
   o.specularViewRate = 16;
   o.specularViewAverage = 1;
   o.specularViewShadow = 1;
   o.optionReflect = true;
   o.reflectColor.set(1, 1, 1, 1);
   o.reflectMerge = 1;
   o.reflectShadow = 1;
   o.optionRefract = true;
   o.refractFrontColor.set(1, 1, 1, 1);
   o.refractFrontMerge = 1;
   o.refractFrontShadow = 1;
   o.refractBackColor.set(1, 1, 1, 1);
   o.refractBackMerge = 1;
   o.refractBackShadow = 1;
   o.optionOpacity = true;
   o.opacityColor.set(1, 1, 1, 1);
   o.opacityRate = 1;
   o.opacityAlpha = 1;
   o.opacityDepth = 1;
   o.opacityTransmittance = 1;
   o.optionEmissive = true;
   o.emissiveColor.set(1, 1, 1, 1);
}
MO.SG3dRenderableInfo = function SG3dRenderableInfo(){
   var o = this;
   o.effect   = null;
   o.layout   = null;
   o.material = null;
   o.reset    = MO.SG3dRenderableInfo_reset;
   return o;
}
MO.SG3dRenderableInfo_reset = function SG3dRenderableInfo_reset(){
   var o = this;
   o.effect = null;
   o.layout = MO.Lang.Object.dispose(o.layout);
}
MO.FG3dAnimation = function FG3dAnimation(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._baseTick    = 0;
   o._currentTick = 0;
   o._lastTick    = 0
   o._bones       = null;
   o.construct    = MO.FG3dAnimation_construct;
   o.findBone     = MO.FG3dAnimation_findBone;
   o.process      = MO.FG3dAnimation_process;
   o.dispose      = MO.FG3dAnimation_dispose;
   return o;
}
MO.FG3dAnimation_construct = function FG3dAnimation_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._bones = new MO.TObjects();
}
MO.FG3dAnimation_findBone = function FG3dAnimation_findBone(p){
   var o = this;
   var bs = o._bones;
   var c = bs.count();
   for(var i = 0; i < c; i++){
      var b = bs.get(i);
      if(b.boneId() == p){
         return b;
      }
   }
   return null;
}
MO.FG3dAnimation_process = function FG3dAnimation_process(){
   var o = this;
   var t = MO.Timer.current();
   if(o._lastTick == 0){
      o._lastTick = t;
   }
   o._currentTick = (t - o._lastTick + o._baseTick) / 1000;
   var bs = o._bones;
   var c = bs.count();
   for(var i = 0; i < c; i++){
      var b = bs.get(i);
      b.update(o._currentTick);
   }
   return true;
}
MO.FG3dAnimation_dispose = function FG3dAnimation_dispose(){
   var o = this;
   o._bones.dispose();
   o._bones = null;
   o.__base.FObject.dispose.call(o);
}
MO.FG3dBaseMaterial = function FG3dBaseMaterial(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._name       = null;
   o._info       = MO.Class.register(o, new MO.AGetter('_info'));
   o.construct   = MO.FG3dBaseMaterial_construct;
   o.assignInfo  = MO.FG3dBaseMaterial_assignInfo;
   o.assign      = MO.FG3dBaseMaterial_assign;
   o.calculate   = MO.FG3dBaseMaterial_calculate;
   return o;
}
MO.FG3dBaseMaterial_construct = function FG3dBaseMaterial_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._info = new MO.SG3dMaterialInfo();
}
MO.FG3dBaseMaterial_assignInfo = function FG3dBaseMaterial_assignInfo(info){
   this._info.assign(info);
}
MO.FG3dBaseMaterial_assign = function FG3dBaseMaterial_assign(material){
   this._info.assign(material.info());
}
MO.FG3dBaseMaterial_calculate = function FG3dBaseMaterial_calculate(material){
   this._info.calculate(material.info());
}
MO.FG3dBone = function FG3dBone(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._boneId   = 0;
   o._modeId   = null;
   o.update    = MO.FG3dBone_update;
   return o;
}
MO.FG3dBone_update = function FG3dBone_update(p){
}
MO.FG3dCamera = function FG3dCamera(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._matrix          = MO.Class.register(o, new MO.AGetter('_matrix'));
   o._position        = MO.Class.register(o, new MO.AGetter('_position'));
   o._target          = null;
   o._direction       = MO.Class.register(o, new MO.AGetter('_direction'));
   o._directionTarget = null;
   o._centerFront     = 0.6;
   o._centerBack      = 1.0;
   o._focalNear       = 0.1;
   o._focalFar        = 200.0;
   o._frustum         = MO.Class.register(o, new MO.AGetter('_frustum'));
   o._planes          = MO.Class.register(o, new MO.AGetter('_planes'));
   o._viewport        = null;
   o.__axisUp         = null;
   o.__axisX          = null;
   o.__axisY          = null;
   o.__axisZ          = null;
   o.construct        = MO.FG3dCamera_construct;
   o.setPosition      = MO.FG3dCamera_setPosition;
   o.setDirection     = MO.FG3dCamera_setDirection;
   o.doWalk           = MO.FG3dCamera_doWalk;
   o.doStrafe         = MO.FG3dCamera_doStrafe;
   o.doFly            = MO.FG3dCamera_doFly;
   o.doPitch          = MO.FG3dCamera_doPitch;
   o.doYaw            = MO.FG3dCamera_doYaw;
   o.doRoll           = MO.FG3dCamera_doRoll;
   o.lookAt           = MO.FG3dCamera_lookAt;
   o.update           = MO.FG3dCamera_update;
   o.updateFrustum    = MO.FG3dCamera_updateFrustum;
   return o;
}
MO.FG3dCamera_construct = function FG3dCamera_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._matrix = new MO.SMatrix3d();
   o._position = new MO.SPoint3();
   o._target = new MO.SPoint3();
   o._direction = new MO.SVector3();
   o._directionTarget = new MO.SVector3();
   o._frustum = new MO.SFrustum();
   o._planes = new MO.SFrustumPlanes();
   o._viewport = MO.Class.create(MO.FG3dViewport);
   o.__axisUp = new MO.SVector3(0, 1, 0);
   o.__axisX = new MO.SVector3();
   o.__axisY = new MO.SVector3();
   o.__axisZ = new MO.SVector3();
}
MO.FG3dCamera_setPosition = function FG3dCamera_setPosition(x, y, z){
   this._position.set(x, y, z);
}
MO.FG3dCamera_setDirection = function FG3dCamera_setDirection(x, y, z){
   var o = this;
   o._direction.set(x, y, z);
   o._directionTarget.set(x, y, z);
}
MO.FG3dCamera_doWalk = function FG3dCamera_doWalk(p){
   var o = this;
   o._position.x += o._direction.x * p;
   o._position.z += o._direction.z * p;
}
MO.FG3dCamera_doStrafe = function FG3dCamera_doStrafe(p){
   var o = this;
   o._position.x += o.__axisY.x * p;
   o._position.z += o.__axisY.z * p;
}
MO.FG3dCamera_doFly = function FG3dCamera_doFly(p){
   var o = this;
   o._position.y += p;
}
MO.FG3dCamera_doPitch = function FG3dCamera_doPitch(p){
   throw new MO.TFatal(o, 'Unsupport.')
}
MO.FG3dCamera_doYaw = function FG3dCamera_doYaw(p){
   throw new MO.TFatal(o, 'Unsupport.')
}
MO.FG3dCamera_doRoll = function FG3dCamera_doRoll(p){
   throw new MO.TFatal(o, 'Unsupport.')
}
MO.FG3dCamera_lookAt = function FG3dCamera_lookAt(x, y, z){
   var o = this;
   var p = o._position;
   var d = o._direction;
   o._target.set(x, y, z);
   d.set(x - p.x, y - p.y, z - p.z);
   d.normalize();
   o._directionTarget.assign(d);
}
MO.FG3dCamera_update = function FG3dCamera_update(){
   var o = this;
   var ax = o.__axisX;
   var ay = o.__axisY;
   var az = o.__axisZ;
   az.assign(o._direction);
   az.normalize();
   o.__axisUp.cross2(ax, az);
   ax.normalize();
   az.cross2(ay, ax);
   ay.normalize();
   var d = o._matrix.data();
   d[ 0] = ax.x;
   d[ 1] = ay.x;
   d[ 2] = az.x;
   d[ 3] = 0.0;
   d[ 4] = ax.y;
   d[ 5] = ay.y;
   d[ 6] = az.y;
   d[ 7] = 0.0;
   d[ 8] = ax.z;
   d[ 9] = ay.z;
   d[10] = az.z;
   d[11] = 0.0;
   d[12] = -ax.dotPoint3(o._position);
   d[13] = -ay.dotPoint3(o._position);
   d[14] = -az.dotPoint3(o._position);
   d[15] = 1.0;
}
MO.FG3dCamera_updateFrustum = function FG3dCamera_updateFrustum(){
   var o = this;
   var m = MO.Lang.Math.matrix;
   m.assign(o._matrix);
   m.append(o._projection.matrix());
   o._planes.updateVision(m.data());
}
MO.FG3dDirectionalLight = function FG3dDirectionalLight(o){
   o = MO.Class.inherits(this, o, MO.FG3dLight);
   o._camera    = MO.Class.register(o, new MO.AGetter('_camera'));
   o._viewport  = MO.Class.register(o, new MO.AGetter('_viewport'));
   o._direction = MO.Class.register(o, new MO.AGetter('_direction'));
   o.construct  = MO.FG3dDirectionalLight_construct;
   o.dispose    = MO.FG3dDirectionalLight_dispose;
   return o;
}
MO.FG3dDirectionalLight_construct = function FG3dDirectionalLight_construct(){
   var o = this;
   o.__base.FG3dLight.construct.call(o);
   o._camera = MO.Class.create(MO.FG3dPerspectiveCamera);
   o._direction = new MO.SVector3();
}
MO.FG3dDirectionalLight_dispose = function FG3dDirectionalLight_dispose(){
   var o = this;
   o._camera = MO.Lang.Object.dispose(o._camera);
   o.__base.FG3dLight.dispose.call(o);
}
MO.FG3dEffect = function FG3dEffect(o){
   o = MO.Class.inherits(this, o, MO.FG3dObject);
   o._ready              = null;
   o._code               = MO.Class.register(o, new MO.AGetter('_code'));
   o._stateFillCd        = MO.EG3dFillMode.Face;
   o._stateCullCd        = MO.EG3dCullMode.Front;
   o._stateDepth         = true;
   o._stateDepthCd       = MO.EG3dDepthMode.LessEqual;
   o._stateDepthWrite    = true;
   o._stateBlend         = true;
   o._stateBlendSourceCd = MO.EG3dBlendMode.SourceAlpha;
   o._stateBlendTargetCd = MO.EG3dBlendMode.OneMinusSourceAlpha;
   o._stateAlphaTest     = false;
   o._optionShadow       = false;
   o._optionLightMap     = false;
   o._optionFog          = false;
   o._program            = MO.Class.register(o, new MO.AGetter('_program'));
   o._vertexTemplate     = null;
   o._fragmentTemplate   = null;
   o.setup               = MO.Method.empty;
   o.testReady           = MO.FG3dEffect_testReady;
   o.setParameter        = MO.FG3dEffect_setParameter;
   o.setSampler          = MO.FG3dEffect_setSampler;
   o.drawRenderable      = MO.FG3dEffect_drawRenderable;
   o.drawRenderables     = MO.FG3dEffect_drawRenderables;
   o.drawGroup           = MO.FG3dEffect_drawGroup;
   o.drawRegion          = MO.FG3dEffect_drawRegion;
   o.buildInfo           = MO.FG3dEffect_buildInfo;
   o.loadConfig          = MO.FG3dEffect_loadConfig;
   o.load                = MO.FG3dEffect_load;
   o.build               = MO.FG3dEffect_build;
   return o;
}
MO.FG3dEffect_testReady = function FG3dEffect_testReady(){
   return this._ready;
}
MO.FG3dEffect_setParameter = function FG3dEffect_setParameter(name, value, count){
   this._program.setParameter(name, value, count);
}
MO.FG3dEffect_setSampler = function FG3dEffect_setSampler(name, texture){
   this._program.setSampler(name, texture);
}
MO.FG3dEffect_buildInfo = function FG3dEffect_buildInfo(tagContext, effectInfo){
}
MO.FG3dEffect_drawRenderable = function FG3dEffect_drawRenderable(region, renderable){
   var o = this;
   var context = o._graphicContext;
   var program = o._program;
   if(program.hasAttribute()){
      var attributes = program.attributes();
      var attributeCount = attributes.count();
      for(var i = 0; i < attributeCount; i++){
         var attribute = attributes.value(i);
         if(attribute._statusUsed){
            var linker = attribute._linker;
            var vertexBuffer = renderable.findVertexBuffer(linker);
            if(!vertexBuffer){
               throw new MO.TError("Can't find renderable vertex buffer. (linker={1})", linker);
            }
            program.setAttribute(attribute._name, vertexBuffer, vertexBuffer._formatCd);
         }
      }
   }
   var indexBuffer = renderable.indexBuffer();
   context.drawTriangles(indexBuffer, 0, indexBuffer.count());
}
MO.FG3dEffect_drawRenderables = function FG3dEffect_drawRenderables(region, renderables, offset, count){
   var o = this;
   o._graphicContext.setProgram(o._program);
   for(var i = 0; i < count; i++){
      var renderable = renderables.at(offset + i);
      o.drawRenderable(region, renderable);
   }
}
MO.FG3dEffect_drawGroup = function FG3dEffect_drawGroup(region, renderables, offset, count){
   this.drawRenderables(region, renderables, offset, count);
}
MO.FG3dEffect_drawRegion = function FG3dEffect_drawRegion(region, offset, count){
   var o = this;
   var renderabels = region.renderables();
   for(var n = 0; n < count; ){
      var groupBegin = n;
      var groupEnd = count;
      var groupRenderable = renderabels.at(offset + groupBegin);
      var groupMaterial = groupRenderable.materialReference();
      for(var i = n; i < count; i++){
         var renderable = renderabels.at(offset + i);
         var material = renderable.materialReference();
         if(groupMaterial != material){
            groupEnd = i;
            break;
         }
         n++;
      }
      o.drawGroup(region, renderabels, offset + groupBegin, groupEnd - groupBegin);
   }
}
MO.FG3dEffect_loadConfig = function FG3dEffect_loadConfig(xconfig){
   var o = this;
   var context = o._graphicContext;
   var program = o._program = context.createProgram();
   var xnodes = xconfig.nodes();
   var count = xnodes.count();
   for(var i = 0; i < count; i++){
      var xnode = xnodes.get(i);
      if(xnode.isName('State')){
         var name = xnode.get('name');
         var value = xnode.get('value');
         if(name == 'fill_mode'){
            o._stateFillCd = MO.Lang.Enum.parse(MO.EG3dFillMode, value);
         }else if(name == 'cull_mode'){
            o._stateCullCd = MO.Lang.Enum.parse(MO.EG3dCullMode, value);
         }else if(name == 'depth_mode'){
            o._stateDepth = true;
            o._stateDepthCd = MO.Lang.Enum.parse(MO.EG3dDepthMode, value);
         }else if(name == 'depth_write'){
            o._stateDepthWrite = MO.Lang.Boolean.parse(value);
         }else if(name == 'blend_mode'){
            o._stateBlend = MO.Lang.Boolean.parse(value);
            if(o._stateBlend){
               o._stateBlendSourceCd = MO.Lang.Enum.parse(MO.EG3dBlendMode, xnode.get('source'));
               o._stateBlendTargetCd = MO.Lang.Enum.parse(MO.EG3dBlendMode, xnode.get('target'));
            }
         }else if(name == 'alpha_test'){
            o._stateAlphaTest = MO.RBoolean.parse(value);
         }
      }else if(xnode.isName('Option')){
         var name = xnode.get('name');
         var value = xnode.get('value');
         if(name == 'shadow'){
            o._optionShadow = MO.Lang.Boolean.parse(value);
         }else if(name == 'lightmap'){
            o._optionLightMap = MO.Lang.Boolean.parse(value);
         }else if(name == 'fog'){
            o._optionFog = MO.Lang.Boolean.parse(value);
         }
      }else if(xnode.isName('Parameter')){
         var parameter = MO.Class.create(MO.FG3dProgramParameter);
         parameter.loadConfig(xnode);
         program.parameters().set(parameter.name(), parameter);
      }else if(xnode.isName('Attribute')){
         var attribute = MO.Class.create(MO.FG3dProgramAttribute);
         attribute.loadConfig(xnode);
         program.attributes().set(attribute.name(), attribute);
      }else if(xnode.isName('Sampler')){
         var sampler = MO.Class.create(MO.FG3dProgramSampler);
         sampler.loadConfig(xnode);
         program.samplers().set(sampler.name(), sampler);
      }else if(xnode.isName('Source')){
         var name = xnode.get('name');
         if(name == 'vertex'){
            o._vertexSource = xnode.value();
         }else if(name == 'fragment'){
            o._fragmentSource = xnode.value();
         }else{
            throw new MO.TError(o, 'Unknown source type. (name={1})', name);
         }
      }else{
         throw new MO.TError(o, 'Unknown config type. (name={1})', xnode.name());
      }
   }
   var vertexTemplate = o._vertexTemplate = MO.Class.create(MO.FG3dShaderTemplate);
   vertexTemplate.load(o._vertexSource);
   var fragmentTemplate = o._fragmentTemplate = MO.Class.create(MO.FG3dShaderTemplate);
   fragmentTemplate.load(o._fragmentSource);
}
MO.FG3dEffect_build = function FG3dEffect_build(p){
   var o = this;
   var program = o._program;
   var parameters = program.parameters();
   var parameterCount = parameters.count();
   var tagContext = MO.RInstance.get(MO.FTagContext);
   o.buildInfo(tagContext, p);
   var source = o._vertexTemplate.parse(tagContext);
   var formatSource = MO.Lang.String.formatLines(source);
   program.upload(MO.EG3dShader.Vertex, formatSource);
   var source = o._fragmentTemplate.parse(tagContext);
   for(var i = 0; i < parameterCount; i++){
      var parameter = parameters.at(i);
      var parameterName = parameter.name();
      var parameterDefine = parameter.define();
      if(parameterDefine){
         source = source.replace(new RegExp(parameterName, 'g'), parameterDefine);
      }
   }
   var formatSource = MO.Lang.String.formatLines(source);
   program.upload(MO.EG3dShader.Fragment, formatSource);
   program.build();
   program.link();
}
MO.FG3dEffect_load = function FG3dEffect_load(){
   var o = this;
   var xconfig = MO.Console.find(MO.FG3dEffectConsole).loadConfig(o._code);
   o.loadConfig(xconfig);
}
MO.FG3dEffectConsole = function FG3dEffectConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd         = MO.EScope.Local;
   o._configs         = null;
   o._loadEffects     = null;
   o._registerEffects = null;
   o._templateEffects = null;
   o._effects         = null;
   o._path            = MO.Class.register(o, MO.AGetter('_path'), "/ars/shader/");
   o._effectInfo      = null;
   o._tagContext      = null;
   o._thread          = null;
   o._interval        = 300;
   o.onProcess        = MO.FG3dEffectConsole_onProcess;
   o.construct        = MO.FG3dEffectConsole_construct;
   o.register         = MO.FG3dEffectConsole_register;
   o.unregister       = MO.FG3dEffectConsole_unregister;
   o.create           = MO.FG3dEffectConsole_create;
   o.buildEffectInfo  = MO.FG3dEffectConsole_buildEffectInfo;
   o.findTemplate     = MO.FG3dEffectConsole_findTemplate;
   o.find             = MO.FG3dEffectConsole_find;
   o.loadConfig       = MO.FG3dEffectConsole_loadConfig;
   return o;
}
MO.FG3dEffectConsole_onProcess = function FG3dEffectConsole_onProcess(){
   var o = this;
   var effects = o._loadEffects;
   effects.record();
   while(effects.next()){
      var effect = effects.current();
      if(effect.processLoad()){
         effects.removeCurrent();
      }
   }
}
MO.FG3dEffectConsole_construct = function FG3dEffectConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._configs = new MO.TDictionary();
   o._loadEffects = new MO.TLooper();
   o._registerEffects = new MO.TDictionary();
   o._templateEffects = new MO.TDictionary();
   o._effects = new MO.TDictionary();
   o._effectInfo = new MO.SG3dEffectInfo();
   o._tagContext = MO.Class.create(MO.FTagContext);
}
MO.FG3dEffectConsole_register = function FG3dEffectConsole_register(n, e){
   this._registerEffects.set(n, e);
}
MO.FG3dEffectConsole_unregister = function FG3dEffectConsole_unregister(n){
   this._registerEffects.set(n, null);
}
MO.FG3dEffectConsole_create = function FG3dEffectConsole_create(c, p){
   var o = this;
   var t = o._registerEffects.get(p);
   if(!t){
      throw new MO.TError(this, 'Unknown effect type name. (type={1})', t);
   }
   var e = MO.Class.create(t);
   e.linkGraphicContext(c);
   e.setup();
   return e;
}
MO.FG3dEffectConsole_buildEffectInfo = function FG3dEffectConsole_buildEffectInfo(context, effectInfo, region, renderable){
   var o = this;
   var capability = context.capability();
   var technique = region.technique();
   effectInfo.techniqueModeCode = technique.activeMode().code();
   effectInfo.optionMerge = renderable._optionMerge;
   if(effectInfo.optionMerge){
      effectInfo.mergeCount = renderable.mergeMaxCount();
   }
   var mi = renderable.material().info();
   effectInfo.optionNormalInvert = mi.optionNormalInvert;
   effectInfo.optionColor = mi.optionColor;
   effectInfo.optionAmbient = mi.optionAmbient;
   effectInfo.optionDiffuse = mi.optionDiffuse;
   effectInfo.optionSpecular = mi.optionSpecular;
   effectInfo.optionReflect = mi.optionReflect;
   effectInfo.optionRefract = mi.optionRefract;
   effectInfo.vertexCount = renderable.vertexCount();
   var vertexBuffers = renderable.vertexBuffers();
   var count = vertexBuffers.count();
   for(var i = 0; i < count; i++){
      var vertexBuffer = vertexBuffers.at(i);
      var vertexCode = vertexBuffer.code();
      if(vertexCode == 'normal'){
         var stride = vertexBuffer.stride();
         if(stride == 4){
            effectInfo.optionNormalCompress = true;
         }else{
            effectInfo.optionNormalCompress = false;
         }
      }
      if(MO.Lang.String.isEmpty(vertexCode)){
         throw new MO.TError(o, 'Vertex buffer code is empty.');
      }
      effectInfo.attributes.push(vertexCode);
   }
   var textures = renderable.textures();
   if(textures){
      var count = textures.count();
      for(var i = 0; i < count; i++){
         var textureCode = textures.name(i);
         if(MO.Lang.String.isEmpty(textureCode)){
            throw new MO.TError(o, 'Texture code is empty.');
         }
         effectInfo.samplers.push(textureCode);
      }
   }
   var bones = renderable.bones();
   if(bones){
      var boneCount = bones.count();
      effectInfo.vertexBoneCount = boneCount;
      var boneLimit = capability.calculateBoneCount(effectInfo.vertexBoneCount, effectInfo.vertexCount);
      if(boneCount > boneLimit){
         boneCount = boneLimit;
      }
      renderable._boneLimit = boneCount;
      effectInfo.vertexBoneLimit = boneCount;
   }
}
MO.FG3dEffectConsole_findTemplate = function FG3dEffectConsole_findTemplate(context, code){
   var o = this;
   var effects = o._templateEffects;
   var effect = effects.get(code);
   if(effect == null){
      var effect = o.create(context, code);
      effect.load();
      MO.Logger.info(o, 'Create effect template. (code={1}, instance={2})', code, effect);
      effects.set(code, effect);
   }
   return effect;
}
MO.FG3dEffectConsole_find = function FG3dEffectConsole_find(context, region, renderable){
   var o = this;
   if(!MO.Class.isClass(context, MO.FGraphicContext)){
      context = context.graphicContext();
   }
   if(!MO.Class.isClass(context, MO.FGraphicContext)){
      throw new MO.TError(o, 'Unknown context.');
   }
   var effectCode = renderable.material().info().effectCode;
   if(MO.Lang.String.isEmpty(effectCode)){
      effectCode = 'automatic'
   }
   if(effectCode == 'skeleton' || effectCode == 'skeleton.4'){
      if(renderable.bones() == null){
         effectCode = 'automatic'
      }
   }
   var effectFlag = region.spaceName() + '.' + effectCode;
   var effectTemplate = o.findTemplate(context, effectFlag);
   if(effectTemplate){
      var effectInfo = o._effectInfo;
      effectInfo.reset();
      o.buildEffectInfo(context, effectInfo, region, renderable);
      effectTemplate.buildInfo(o._tagContext, effectInfo);
      var flag = effectFlag + o._tagContext.code;
      var effects = o._effects;
      var effect = effects.get(flag);
      if(!effect){
         effect = o.create(context, effectFlag);
         effect._flag = flag;
         effect.load();
         effect.build(o._effectInfo);
         MO.Logger.info(o, 'Create effect. (name={1}, instance={2})', effectCode, effect);
      }
      effects.set(flag, effect);
   }
   return effect;
}
MO.FG3dEffectConsole_loadConfig = function FG3dEffectConsole_loadConfig(p){
   var o = this;
   var x = o._configs.get(p);
   if(x){
      return x;
   }
   var u = MO.RBrowser.contentPath(o._path + p + ".xml");
   if(MO.Runtime.isDebug()){
      u += '?' + MO.Lang.Date.format();
   }
   x = MO.Class.create(MO.FXmlConnection).send(u);
   o._configs.set(p, x);
   return x;
}
MO.FG3dLight = function FG3dLight(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   return o;
}
MO.FG3dLightMaterial = function FG3dLightMaterial(o){
   o = MO.Class.inherits(this, o, MO.FG3dBaseMaterial);
   return o;
}
MO.FG3dMaterial = function FG3dMaterial(o){
   o = MO.Class.inherits(this, o, MO.FG3dBaseMaterial);
   o._dirty    = true;
   o._textures = MO.Class.register(o, new MO.AGetter('_textures'))
   o.update    = MO.FG3dMaterial_update;
   return o;
}
MO.FG3dMaterial_update = function FG3dMaterial_update(){
   this._dirty = true;
}
MO.FG3dMaterialMap = function FG3dMaterialMap(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MGraphicObject);
   o._size      = MO.Class.register(o, new MO.AGetter('_size'));
   o._data      = MO.Class.register(o, new MO.AGetter('_data'));
   o._texture   = MO.Class.register(o, new MO.AGetter('_texture'));
   o._stride    = null;
   o._dirty     = false;
   o.construct  = MO.FG3dMaterialMap_construct;
   o.setup      = MO.FG3dMaterialMap_setup;
   o.resize     = MO.FG3dMaterialMap_resize;
   o.setUint8   = MO.FG3dMaterialMap_setUint8;
   o.setUint16  = MO.FG3dMaterialMap_setUint16;
   o.setUint32  = MO.FG3dMaterialMap_setUint32;
   o.setFloat16 = MO.FG3dMaterialMap_setFloat16;
   o.setFloat32 = MO.FG3dMaterialMap_setFloat32;
   o.update     = MO.FG3dMaterialMap_update;
   return o;
}
MO.FG3dMaterialMap_construct = function FG3dMaterialMap_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._size = new MO.SSize2();
}
MO.FG3dMaterialMap_setup = function FG3dMaterialMap_setup(width, height){
   var o = this;
   var c = o._graphicContext;
   var texture = o._texture = c.createFlatTexture();
   o.resize(width, height);
   texture.setFilterCd(MO.EG3dSamplerFilter.Nearest, MO.EG3dSamplerFilter.Nearest);
   texture.uploadData(o._data, width, height);
}
MO.FG3dMaterialMap_resize = function FG3dMaterialMap_resize(width, height){
   var o = this;
   var s = o._size;
   if(height > 2048){
      height = 4096;
   }else if(height > 1024){
      height = 2048;
   }else if(height > 512){
      height = 1024;
   }else if(height > 256){
      height = 512;
   }else if(height > 128){
      height = 256;
   }else if(height > 64){
      height = 128;
   }else if(height > 32){
      height = 64;
   }else if(height > 16){
     height = 32;
   }
   if(height < s.height){
      height = s.height;
   }
   if((s.width == width) && (s.height == height)){
      return;
   }
   s.set(width, height);
   o._stride = 4 * width;
   var total = 4 * width * height;
   o._data = new Uint8Array(total);
}
MO.FG3dMaterialMap_setUint8 = function FG3dMaterialMap_setUint8(n, i, v1, v2, v3, v4){
   var o = this;
   var d = o._data;
   var p = (o._stride * n) + (i << 2);
   if(v1.constructor == MO.SColor4){
      var v = v1.red * 255;
      if(d[p] != v){
         o._dirty = true;
      }
      d[p++] = v;
      var v = v1.green * 255;
      if(d[p] != v){
         o._dirty = true;
      }
      d[p++] = v;
      var v = v1.blue * 255;
      if(d[p] != v){
         o._dirty = true;
      }
      d[p++] = v;
      var v = v1.alpha * 255;
      if(d[p] != v){
         o._dirty = true;
      }
      d[p++] = v;
   }else{
      d[p++] = v1;
      d[p++] = v2;
      d[p++] = v3;
      d[p++] = v4;
   }
}
MO.FG3dMaterialMap_setUint16 = function FG3dMaterialMap_setUint16(n, i, v1, v2){
   var o = this;
   var d = o._data;
   var p = (o._stride * n) + (i << 2);
   d[p++] = (v1 >> 8) & 0xFF;
   d[p++] = v1 & 0xFF;
   d[p++] = (v2 >> 8) & 0xFF;
   d[p++] = v2 & 0xFF;
   o._dirty = true;
}
MO.FG3dMaterialMap_setUint32 = function FG3dMaterialMap_setUint32(n, i, v){
   var o = this;
   var d = o._data;
   var p = (o._stride * n) + (i << 2);
   d[p++] = (v >> 24) & 0xFF;
   d[p++] = (v >> 16) & 0xFF;
   d[p++] = (v >> 8) & 0xFF;
   d[p++] = v & 0xFF;
   o._dirty = true;
}
MO.FG3dMaterialMap_setFloat16 = function FG3dMaterialMap_setFloat16(n, i, v1, v2){
   var o = this;
   var d = o._data;
   var p = (o._stride * n) + (i << 2);
   var v = parseInt(v1 * 256);
   d[p++] = parseInt(v1) & 0xFF;
   d[p++] = parseInt(v1 * 256) & 0xFF;
   d[p++] = parseInt(v2) & 0xFF;
   d[p++] = parseInt(v2 * 256) & 0xFF;
   o._dirty = true;
}
MO.FG3dMaterialMap_setFloat32 = function FG3dMaterialMap_setFloat32(n, i, v){
   var o = this;
   var d = o._data;
   var p = (o._stride * n) + (i << 2);
   d[p++] = parseInt(v * 0.00390625) & 0xFF;
   d[p++] = parseInt(v) & 0xFF;
   d[p++] = parseInt(v * 256) & 0xFF;
   d[p++] = parseInt(v * 65536) & 0xFF;
   o._dirty = true;
}
MO.FG3dMaterialMap_update = function FG3dMaterialMap_update(){
   var o = this;
   if(o._dirty){
      var s = o._size;
      o._texture.uploadData(o._data, s.width, s.height);
      o._dirty = false;
   }
}
MO.FG3dMaterialTexture = function FG3dMaterialTexture(o){
   o = MO.Class.inherits(this, o, MO.FG3dMaterial);
   o._texture = null;
   return o;
}
MO.FG3dObject = function FG3dObject(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MGraphicObject);
   o.setup   = MO.FG3dObject_setup;
   o.dispose = MO.FG3dObject_dispose;
   return o;
}
MO.FG3dObject_setup = function FG3dObject_setup(){
}
MO.FG3dObject_dispose = function FG3dObject_dispose(){
   var o = this;
   o.__base.MGraphicObject.dispose.call(o);
   o.__base.FObject.dispose.call(o);
}
MO.FG3dOrthoCamera = function FG3dOrthoCamera(o){
   o = MO.Class.inherits(this, o, MO.FG3dCamera);
   o._projection      = MO.Class.register(o, new MO.AGetter('_projection'));
   o.construct        = MO.FG3dOrthoCamera_construct;
   o.updateFrustum    = MO.FG3dOrthoCamera_updateFrustum;
   o.updateFromCamera = MO.FG3dOrthoCamera_updateFromCamera;
   o.updateFlatCamera = MO.FG3dOrthoCamera_updateFlatCamera;
   return o;
}
MO.FG3dOrthoCamera_construct = function FG3dOrthoCamera_construct(){
   var o = this;
   o.__base.FG3dCamera.construct.call(o);
   o._projection = MO.Class.create(MO.FG3dOrthoProjection);
}
MO.FG3dOrthoCamera_updateFrustum = function FG3dOrthoCamera_updateFrustum(){
   var o = this;
   o.__base.FG3dCamera.updateFrustum.call(o);
   var p = o._projection;
   var s = p._size;
   var f = o._frustum;
   f.update(p._angle, s.width, s.height, p._znear, p._zfar, o._centerFront, o._centerBack, o._matrix);
   return f;
}
MO.FG3dOrthoCamera_updateFromCamera = function FG3dOrthoCamera_updateFromCamera(p){
   var o = this;
   var pf = p.updateFrustum();
   var d = o._direction;
   d.normalize();
   var vx = pf.center.x - d.x * pf.radius;
   var vy = pf.center.y - d.y * pf.radius;
   var vz = pf.center.z - d.z * pf.radius;
   o._position.set(vx, vy, vz);
   o.lookAt(pf.center.x, pf.center.y, pf.center.z);
   o.update();
   var f = o._frustum;
   o._matrix.transform(f.coners, pf.coners, 8);
   f.updateCenter();
   o._projection.updateFrustum(f);
}
MO.FG3dOrthoCamera_updateFlatCamera = function FG3dOrthoCamera_updateFlatCamera(p){
   var o = this;
   var f = o._frustum
   var pf = p.updateFlatFrustum();
   var angle = MO.RConst.DEGREE_RATE * o._projection.angle();
   var distance = pf.radius / Math.sin(angle * 0.5);
   distance = Math.max(distance, p._projection._zfar);
   var d = o._direction;
   d.normalize();
   var vx = pf.center.x - d.x * distance;
   var vy = pf.center.y - d.y * distance;
   var vz = pf.center.z - d.z * distance;
   o._position.set(vx, vy, vz);
   o.lookAt(pf.center.x, pf.center.y, pf.center.z);
   o.update();
   o._projection._znear = 0.3;
   o._projection._zfar = distance * 1.5;
   o._projection.update();
}
MO.FG3dOrthoProjection = function FG3dOrthoProjection(o){
   o = MO.Class.inherits(this, o, MO.FG3dProjection);
   o._matrix       = MO.Class.register(o, new MO.AGetter('_matrix'));
   o.construct     = MO.FG3dOrthoProjection_construct;
   o.update        = MO.FG3dOrthoProjection_update;
   o.updateFrustum = MO.FG3dOrthoProjection_updateFrustum;
   return o;
}
MO.FG3dOrthoProjection_construct = function FG3dOrthoProjection_construct(){
   var o = this;
   o.__base.FG3dProjection.construct.call(o);
   o._matrix = new MO.SOrthoMatrix3d();
}
MO.FG3dOrthoProjection_update = function FG3dOrthoProjection_update(){
   var o = this;
   var s = o._size;
   o._matrix.identity();
   var d = o._matrix.data();
   d[ 0] = 2.0 / s.width * 8.0;
   d[ 4] = d[ 8] = d[12] = 0.0;
   d[ 5] = 2.0 / s.height * 8.0;
   d[ 1] = d[ 9] = d[13] = 0.0;
   d[10] = 1.0 / (o._znear - o._zfar);
   d[ 2] = d[ 6] = d[14] = 0.0;
   d[ 3] = d[ 7] = 0.0;
   d[11] = o._znear / (o._znear - o._zfar);
   d[15] = 1.0;
}
MO.FG3dOrthoProjection_updateFrustum = function FG3dOrthoProjection_updateFrustum(p){
   var o = this;
   o._znear = p.minZ;
   o._zfar = p.maxZ;
   o.update();
}
MO.FG3dPerspectiveCamera = function FG3dPerspectiveCamera(o){
   o = MO.Class.inherits(this, o, MO.FG3dCamera);
   o._projection       = MO.Class.register(o, new MO.AGetter('_projection'));
   o._centerFront      = 0.4;
   o.construct         = MO.FG3dPerspectiveCamera_construct;
   o.updateFrustum     = MO.FG3dPerspectiveCamera_updateFrustum;
   o.updateFlatFrustum = MO.FG3dPerspectiveCamera_updateFlatFrustum;
   o.updateFromCamera  = MO.FG3dPerspectiveCamera_updateFromCamera;
   o.updateFlatCamera  = MO.FG3dPerspectiveCamera_updateFlatCamera;
   return o;
}
MO.FG3dPerspectiveCamera_construct = function FG3dPerspectiveCamera_construct(){
   var o = this;
   o.__base.FG3dCamera.construct.call(o);
   o._projection = MO.Class.create(MO.FG3dPerspectiveProjection);
}
MO.FG3dPerspectiveCamera_updateFrustum = function FG3dPerspectiveCamera_updateFrustum(){
   var o = this;
   o.__base.FG3dCamera.updateFrustum.call(o);
   var p = o._projection;
   var s = p._size;
   var f = o._frustum;
   f.update(p._angle, s.width, s.height, p._znear, p._zfar, o._centerFront, o._centerBack, o._matrix);
   return f;
}
MO.FG3dPerspectiveCamera_updateFlatFrustum = function FG3dPerspectiveCamera_updateFlatFrustum(){
   var o = this;
   var p = o._projection;
   var s = p._size;
   var f = o._frustum;
   f.updateFlat(p._angle, s.width, s.height, p._znear, p._zfar, o._centerFront, o._centerBack, o._matrix);
   return f;
}
MO.FG3dPerspectiveCamera_updateFromCamera = function FG3dPerspectiveCamera_updateFromCamera(p){
   var o = this;
   var f = o._frustum;
   var pf = p.updateFrustum();
   var angle = MO.RConst.DEGREE_RATE * o._projection.angle();
   var distance = pf.radius / Math.sin(angle * 0.5);
   distance = Math.max(distance, p._projection._zfar);
   var d = o._direction;
   d.normalize();
   var vx = pf.center.x - d.x * distance;
   var vy = pf.center.y - d.y * distance;
   var vz = pf.center.z - d.z * distance;
   o._position.set(vx, vy, vz);
   o.lookAt(pf.center.x, pf.center.y, pf.center.z);
   o.update();
   o._matrix.transform(f.coners, 0, pf.coners, 0, 8);
   f.updateCenter();
   o._projection.updateFrustum(f);
}
MO.FG3dPerspectiveCamera_updateFlatCamera = function FG3dPerspectiveCamera_updateFlatCamera(p){
   var o = this;
   var f = o._frustum;
   var pf = p.updateFlatFrustum();
   var angle = MO.RConst.DEGREE_RATE * o._projection.angle();
   var distance = pf.radius / Math.sin(angle * 0.5);
   distance = Math.max(distance, p._projection._zfar);
   var d = o._direction;
   d.normalize();
   var vx = pf.center.x - d.x * distance * o._centerFront;
   var vy = pf.center.y - d.y * distance * o._centerFront;
   var vz = pf.center.z - d.z * distance * o._centerFront;
   o._position.set(vx, vy, vz);
   o.lookAt(pf.center.x, pf.center.y, pf.center.z);
   o.update();
   o._projection._znear = 0.1;
   o._projection._zfar = distance;
   o._projection.update();
}
MO.FG3dPerspectiveProjection = function FG3dPerspectiveProjection(o){
   o = MO.Class.inherits(this, o, MO.FG3dProjection);
   o._matrix       = MO.Class.register(o, new MO.AGetter('_matrix'));
   o.construct     = MO.FG3dPerspectiveProjection_construct;
   o.update        = MO.FG3dPerspectiveProjection_update;
   o.updateFrustum = MO.FG3dPerspectiveProjection_updateFrustum;
   return o;
}
MO.FG3dPerspectiveProjection_construct = function FG3dPerspectiveProjection_construct(){
   var o = this;
   o.__base.FG3dProjection.construct.call(o);
   o._matrix = new MO.SPerspectiveMatrix3d();
}
MO.FG3dPerspectiveProjection_update = function FG3dPerspectiveProjection_update(){
   var o = this;
   var s = o._size;
   o._fieldOfView = MO.RConst.DEGREE_RATE * o._angle;
   o._matrix.perspectiveFieldOfViewLH(o._fieldOfView, s.width / s.height, o._znear, o._zfar);
}
MO.FG3dPerspectiveProjection_updateFrustum = function FG3dPerspectiveProjection_updateFrustum(p){
   var o = this;
   o._znear = p.minZ;
   o._zfar = p.maxZ;
   o.update();
}
MO.FG3dPointLight = function FG3dPointLight(o){
   o = MO.Class.inherits(this, o, MO.FG3dLight);
   return o;
}
MO.FG3dProjection = function FG3dProjection(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._size        = MO.Class.register(o, new MO.AGetter('_size'));
   o._angle       = MO.Class.register(o, new MO.AGetSet('_angle'), 60.0);
   o._fieldOfView = MO.Class.register(o, new MO.AGetSet('_fieldOfView'), 0);
   o._znear       = MO.Class.register(o, new MO.AGetSet('_znear'), 0.1);
   o._zfar        = MO.Class.register(o, new MO.AGetSet('_zfar'), 200.0);
   o._scale       = MO.Class.register(o, new MO.AGetSet('_scale'), 0);
   o.construct   = MO.FG3dProjection_construct;
   o.distance    = MO.FG3dProjection_distance;
   return o;
}
MO.FG3dProjection_construct = function FG3dProjection_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._size = new MO.SSize2();
}
MO.FG3dProjection_distance = function FG3dProjection_distance(){
   return this._zfar - this._znear;
}
MO.FG3dShaderTemplate = function FG3dShaderTemplate(o){
   o = MO.Class.inherits(this, o, MO.FTagDocument);
   o._space  = 'shader';
   return o;
}
MO.FG3dSpotLight = function FG3dSpotLight(o){
   o = MO.Class.inherits(this, o, MO.FG3dLight);
   return o;
}
MO.FG3dTechnique = function FG3dTechnique(o){
   o = MO.Class.inherits(this, o, MO.FG3dObject);
   o._code           = MO.Class.register(o, new MO.AGetter('_code'));
   o._activeMode     = MO.Class.register(o, new MO.AGetter('_activeMode'));
   o._modes          = MO.Class.register(o, new MO.AGetter('_modes'));
   o._passes         = MO.Class.register(o, new MO.AGetter('_passes'));
   o.construct       = MO.FG3dTechnique_construct;
   o.registerMode    = MO.FG3dTechnique_registerMode;
   o.selectMode      = MO.FG3dTechnique_selectMode;
   o.updateRegion    = MO.Method.empty;
   o.clear           = MO.FG3dTechnique_clear;
   o.clearDepth      = MO.FG3dTechnique_clearDepth;
   o.sortRenderables = MO.FG3dTechnique_sortRenderables;
   o.drawRegion      = MO.FG3dTechnique_drawRegion;
   o.present         = MO.FG3dTechnique_present;
   return o;
}
MO.FG3dTechnique_construct = function FG3dTechnique_construct(){
   var o = this;
   o.__base.FG3dObject.construct.call(o);
   o._modes = new MO.TObjects();
   o._passes = new MO.TObjects();
}
MO.FG3dTechnique_registerMode = function FG3dTechnique_registerMode(p){
   var o = this;
   var m = MO.Class.create(MO.FG3dTechniqueMode);
   m.setCode(p);
   o._modes.push(m);
   o._activeMode = m;
   return m;
}
MO.FG3dTechnique_selectMode = function FG3dTechnique_selectMode(p){
   var o = this;
}
MO.FG3dTechnique_clear = function FG3dTechnique_clear(color){
   var o = this;
   var context = o._graphicContext;
   context.setRenderTarget(null);
   context.clear(color.red, color.green, color.blue, color.alpha, 1);
}
MO.FG3dTechnique_clearDepth = function FG3dTechnique_clearDepth(depth){
   var o = this;
   if(depth == null){
      depth = 1;
   }
   var context = o._graphicContext;
   context.clearDepth(depth);
}
MO.FG3dTechnique_sortRenderables = function FG3dTechnique_sortRenderables(a, b){
}
MO.FG3dTechnique_drawRegion = function FG3dTechnique_drawRegion(region){
   var o = this;
   region.setTechnique(o);
   var passes = o._passes;
   var count = passes.count();
   for(var i = 0; i < count; i++){
      var pass = passes.at(i);
      region.setTechniquePass(pass, (i == count - 1));
      pass.drawRegion(region);
   }
}
MO.FG3dTechnique_present = function FG3dTechnique_present(p){
   this._graphicContext.present();
}
MO.FG3dTechniqueConsole = function FG3dTechniqueConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd    = MO.EScope.Local;
   o._techniques = MO.Class.register(o, new MO.AGetter('_techniques'));
   o.construct   = MO.FG3dTechniqueConsole_construct;
   o.find        = MO.FG3dTechniqueConsole_find;
   return o;
}
MO.FG3dTechniqueConsole_construct = function FG3dTechniqueConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._techniques = new MO.TDictionary();
}
MO.FG3dTechniqueConsole_find = function FG3dTechniqueConsole_find(context, clazz){
   var o = this;
   if(!MO.Class.isClass(context, MO.FGraphicContext)){
      context = context.graphicContext();
   }
   if(!MO.Class.isClass(context, MO.FGraphicContext)){
      throw new MO.TError(o, 'Unknown context.');
   }
   var code = context.hashCode() + '|' + MO.Class.name(clazz);
   var techniques = o._techniques;
   var technique = techniques.get(code);
   if(!technique){
      technique = MO.Class.create(clazz);
      technique.linkGraphicContext(context);
      technique.setup();
      var techniqueCode = technique.code();
      var passes = technique.passes();
      var passCount = passes.count();
      for(var i = 0; i < passCount; i++){
         var pass = passes.at(i);
         var passCode = pass.code();
         pass.setFullCode(techniqueCode + '.' + passCode);
      }
      techniques.set(code, technique);
   }
   return technique;
}
MO.FG3dTechniqueMode = function FG3dTechniqueMode(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._code = MO.Class.register(o, new MO.AGetSet('_code'));
   return o;
}
MO.FG3dTechniquePass = function FG3dTechniquePass(o){
   o = MO.Class.inherits(this, o, MO.FG3dObject);
   o._fullCode       = MO.Class.register(o, new MO.AGetSet('_fullCode'));
   o._code           = MO.Class.register(o, new MO.AGetter('_code'));
   o._index          = null;
   o._finish         = false;
   o._materialMap    = null;
   o.setup           = MO.FG3dTechniquePass_setup;
   o.activeEffects   = MO.FG3dTechniquePass_activeEffects;
   o.sortRenderables = MO.FG3dTechniquePass_sortRenderables;
   o.drawRegion      = MO.FG3dTechniquePass_drawRegion;
   return o;
}
MO.FG3dTechniquePass_setup = function FG3dTechniquePass_setup(){
   var o = this;
   var map = o._materialMap = MO.Class.create(MO.FG3dMaterialMap);
   map.linkGraphicContext(o);
   map.setup(MO.EG3dMaterialMap.Count, 32);
}
MO.FG3dTechniquePass_sortRenderables = function FG3dTechniquePass_sortRenderables(source, target){
   var sourceMaterial = source.material().info();
   var targetMaterial = target.material().info();
   if(sourceMaterial.optionAlpha && targetMaterial.optionAlpha){
      var sourceEffect = source.activeEffect();
      var targetEffect = target.activeEffect();
      if(sourceEffect == targetEffect){
         var sourceReference = source.materialReference();
         var targetReference = target.materialReference();
         if(sourceReference && targetReference){
            return sourceReference.hashCode() - targetReference.hashCode();
         }
      }
      return sourceEffect.hashCode() - targetEffect.hashCode();
   }else if(sourceMaterial.optionAlpha && !targetMaterial.optionAlpha){
      return 1;
   }else if(!sourceMaterial.optionAlpha && targetMaterial.optionAlpha){
      return -1;
   }else{
      var sourceEffect = source.activeEffect();
      var targetEffect = target.activeEffect();
      if(sourceEffect == targetEffect){
         var sourceReference = source.materialReference();
         var targetReference = target.materialReference();
         if(sourceReference && targetReference){
            return sourceReference.hashCode() - targetReference.hashCode();
         }
      }
      return sourceEffect.hashCode() - targetEffect.hashCode();
   }
}
MO.FG3dTechniquePass_activeEffects = function FG3dTechniquePass_activeEffects(region, renderables){
   var o = this;
   var spaceName = region.spaceName();
   var count = renderables.count();
   for(var i = 0; i < count; i++){
      var renderable = renderables.at(i);
      var info = renderable.selectInfo(spaceName);
      if(!info.effect){
         info.effect = MO.Console.find(MO.FG3dEffectConsole).find(o._graphicContext, region, renderable);
      }
   }
}
MO.FG3dTechniquePass_drawRegion = function FG3dTechniquePass_drawRegion(region){
   var o = this;
   var renderables = region.renderables();
   var count = renderables.count();
   if(count == 0){
      return;
   }
   var statistics = region._statistics;
   statistics._frameDrawSort.begin();
   o.activeEffects(region, renderables);
   renderables.sort(o.sortRenderables);
   statistics._frameDrawSort.end();
   var capability = o._graphicContext.capability();
   if(capability.optionMaterialMap){
      var mm = o._materialMap;
      mm.resize(MO.EG3dMaterialMap.Count, count);
      for(var i = 0; i < count; i++){
         var r = renderables.get(i);
         r._materialId = i;
         var m = r.material();
         var mi = m.info();
         mm.setUint8(i, MO.EG3dMaterialMap.AmbientColor, mi.ambientColor);
         mm.setUint8(i, MO.EG3dMaterialMap.DiffuseColor, mi.diffuseColor);
         mm.setUint8(i, MO.EG3dMaterialMap.SpecularColor, mi.specularColor);
         mm.setUint8(i, MO.EG3dMaterialMap.ReflectColor, mi.reflectColor);
         mm.setUint8(i, MO.EG3dMaterialMap.EmissiveColor, mi.emissiveColor);
      }
      mm.update();
      region._materialMap = mm;
   }
   for(var n = 0; n < count; ){
      var groupBegin = n;
      var groupEnd = count;
      var effect = renderables.at(groupBegin).activeEffect();
      for(var i = n; i < count; i++){
         var activeEffect = renderables.at(i).activeEffect();
         if(effect != activeEffect){
            groupEnd = i;
            break;
         }
         n++;
      }
      effect.drawRegion(region, groupBegin, groupEnd - groupBegin);
   }
}
MO.FG3dTrack = function FG3dTrack(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._frames   = null;
   o.construct = MO.FG3dTrack_construct;
   o.calculate = MO.FG3dTrack_calculate;
   return o;
}
MO.FG3dTrack_construct = function FG3dTrack_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
}
MO.FG3dTrack_update = function FG3dTrack_update(p){
   var o = this;
   var info = new MO.SG3dFrameInfo();
   o._trackResource.calculateFrameInfo(info, tick);
   info.update();
   o._matrix.assign(o._trackResource.matrixInvert());
   o._matrix.append(info.matrix);
   return true;
}
MO.FG3dTrack_calculate = function FG3dTrack_calculate(tick){
   var o = this;
   var frameCount = o._frames.count();
   if(frameCount == 0){
      return false;
   }
   if(tick < 0){
      tick = -tick;
   }
   var pCurrentFrame = o._frames.Get(index);
   var pNextFrame = null;
   if(index < frameCount -1){
      pNextFrame = o._frames.Get(index + 1);
   }else{
      pNextFrame = o._frames.Get(0);
   }
   info.tick = tick;
   info.currentFrame = pCurrentFrame;
   info.nextFrame = pNextFrame;
   return true;
}
MO.FG3dViewport = function FG3dViewport(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o.left   = 0;
   o.top    = 0;
   o.width  = 0;
   o.height = 0;
   o.set    = MO.FG3dViewport_set;
   return o;
}
MO.FG3dViewport_set = function FG3dViewport_set(left, top, width, height){
   var o = this;
   o.left = left;
   o.top = top;
   o.width = width;
   o.height= height;
}
MO.REngine3d = function REngine3d(){
   var o = this;
   o._setuped  = false;
   o._contexts = null;
   return o;
}
MO.REngine3d.prototype.onUnload = function REngine3d_onUnload(event){
   this.dispose();
}
MO.REngine3d.prototype.setup = function REngine3d_setup(){
   var o = this;
   if(!o._setuped){
      o._contexts = new MO.TObjects();
      MO.RWindow.lsnsUnload.register(o, o.onUnload);
      o._setuped = true;
   }
}
MO.REngine3d.prototype.contexts = function REngine3d_contexts(){
   return this._contexts;
}
MO.REngine3d.prototype.createContext = function REngine3d_createContext(clazz, hCanvas, attributes){
   var o = this;
   o.setup();
   var context = MO.Class.create(clazz);
   if(attributes){
      context._optionAlpha = attributes.alpha;
      context._optionAntialias = attributes.antialias;
   }
   context.linkCanvas(hCanvas);
   o._contexts.push(context);
   return context;
}
MO.REngine3d.prototype.dispose = function REngine3d_dispose(){
   var o = this;
   var contexts = o._contexts;
   if(contexts){
      var count = contexts.count();
      for(var i = 0; i < count; i++){
         var context = contexts.at(i);
         context.dispose();
      }
      o._contexts = MO.Lang.Object.dispose(contexts);
   }
}
MO.REngine3d = new MO.REngine3d();
MO.Engine3d = MO.REngine3d;
