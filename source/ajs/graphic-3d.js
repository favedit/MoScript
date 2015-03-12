var EG3dMaterialMap = new function EG3dMaterialMap(){
   var o = this;
   o.AmbientColor = 0;
   o.DiffuseColor = 1;
   o.SpecularColor = 2;
   o.ReflectColor = 3;
   o.EmissiveColor = 4;
   o.Count = 8;
   return o;
}
var EG3dRegionParameter = new function EG3dRegionParameter(){
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
var EG3dTechniqueMode = new function EG3dTechniqueMode(){
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
function MG3dRegion(o){
   o = RClass.inherits(this, o);
   o._changed                    = false;
   o._spaceName                  = null;
   o._technique                  = null;
   o._techniquePass              = null;
   o._camera                     = null;
   o._projection                 = null;
   o._directionalLight           = null
   o._lights                     = null
   o._allRenderables             = null;
   o._renderables                = null;
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
   o._materialMap                = null;
   o.construct                   = MG3dRegion_construct;
   o.isChanged                   = MG3dRegion_isChanged;
   o.spaceName                   = MG3dRegion_spaceName;
   o.technique                   = MG3dRegion_technique;
   o.setTechnique                = MG3dRegion_setTechnique;
   o.techniquePass               = MG3dRegion_techniquePass;
   o.setTechniquePass            = MG3dRegion_setTechniquePass;
   o.camera                      = MG3dRegion_camera;
   o.directionalLight            = MG3dRegion_directionalLight;
   o.lights                      = MG3dRegion_lights;
   o.materialMap                 = MG3dRegion_materialMap;
   o.allRenderables              = MG3dRegion_allRenderables;
   o.renderables                 = MG3dRegion_renderables;
   o.pushRenderable              = MG3dRegion_pushRenderable;
   o.setup                       = MG3dRegion_setup;
   o.change                      = MG3dRegion_change;
   o.prepare                     = MG3dRegion_prepare;
   o.reset                       = MG3dRegion_reset;
   o.calculate                   = MG3dRegion_calculate;
   o.update                      = MG3dRegion_update;
   o.dispose                     = MG3dRegion_dispose;
   return o;
}
function MG3dRegion_construct(){
   var o = this;
   o._lights = new TObjects();
   o._renderables = new TObjects();
   o._allRenderables = new TObjects();
   o._cameraPosition = new SPoint3();
   o._cameraDirection = new SVector3();
   o._cameraViewMatrix = new SMatrix3d();
   o._cameraProjectionMatrix = new SMatrix3d();
   o._cameraViewProjectionMatrix = new SMatrix3d();
   o._lightPosition = new SPoint3();
   o._lightDirection = new SVector3();
   o._lightViewMatrix = new SMatrix3d();
   o._lightProjectionMatrix = new SMatrix3d();
   o._lightViewProjectionMatrix = new SMatrix3d();
   o._lightInfo = new SVector4();
}
function MG3dRegion_isChanged(){
   return this._changed;
}
function MG3dRegion_spaceName(){
   return this._spaceName;
}
function MG3dRegion_technique(){
   return this._technique;
}
function MG3dRegion_setTechnique(p){
   this._technique = p;
}
function MG3dRegion_techniquePass(){
   return this._techniquePass;
}
function MG3dRegion_setTechniquePass(p, f){
   var o = this;
   o._techniquePass = p;
   o._spaceName = p.fullCode();
   o._finish = f;
}
function MG3dRegion_camera(){
   return this._camera;
}
function MG3dRegion_directionalLight(){
   return this._directionalLight;
}
function MG3dRegion_lights(){
   return this._lights;
}
function MG3dRegion_materialMap(){
   return this._materialMap;
}
function MG3dRegion_allRenderables(p){
   return this._allRenderables;
}
function MG3dRegion_renderables(p){
   return this._renderables;
}
function MG3dRegion_pushRenderable(p){
   var o = this;
   o._renderables.push(p);
   o._allRenderables.push(p);
}
function MG3dRegion_setup(){
   var o = this;
}
function MG3dRegion_change(){
   this._changed = true;
}
function MG3dRegion_prepare(){
   var o = this;
   o._changed = false;
   var c = o._camera;
   var cp = c.projection();
   c.updateFrustum();
   o._cameraPosition.assign(c.position());
   o._cameraDirection.assign(c.direction());
   o._cameraViewMatrix.assign(c.matrix());
   o._cameraProjectionMatrix.assign(cp.matrix());
   o._cameraViewProjectionMatrix.assign(c.matrix());
   o._cameraViewProjectionMatrix.append(cp.matrix());
   var l = o._directionalLight;
   var lc = l.camera();
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
function MG3dRegion_reset(){
   var o = this;
   o._renderables.clear();
}
function MG3dRegion_calculate(p){
   var o = this;
   switch(p){
      case EG3dRegionParameter.CameraPosition:
         return o._cameraPosition;
      case EG3dRegionParameter.CameraDirection:
         return o._cameraDirection;
      case EG3dRegionParameter.CameraViewMatrix:
         return o._cameraViewMatrix;
      case EG3dRegionParameter.CameraProjectionMatrix:
         return o._cameraProjectionMatrix;
      case EG3dRegionParameter.CameraViewProjectionMatrix:
         return o._cameraViewProjectionMatrix;
      case EG3dRegionParameter.LightPosition:
         return o._lightPosition;
      case EG3dRegionParameter.LightDirection:
         return o._lightDirection;
      case EG3dRegionParameter.LightViewMatrix:
         return o._lightViewMatrix;
      case EG3dRegionParameter.LightProjectionMatrix:
         return o._lightProjectionMatrix;
      case EG3dRegionParameter.LightViewProjectionMatrix:
         return o._lightViewProjectionMatrix;
      case EG3dRegionParameter.LightInfo:
         return o._lightInfo;
   }
   throw new TError(o, 'Unknown parameter type. (type_cd={1})', p);
}
function MG3dRegion_update(){
   var o = this;
   var rs = o._renderables;
   var c = rs.count();
   for(var i = 0; i < c; i++){
      rs.getAt(i).update(o);
   }
}
function MG3dRegion_dispose(){
   var o = this;
   o._renderables = RObject.free(o._renderables);
   o._allRenderables = RObject.free(o._allRenderables);
}
function MG3dRenderable(o){
   o = RClass.inherits(this, o, MGraphicRenderable);
   o._optionMerge   = false;
   o._currentMatrix = null;
   o._matrix        = null;
   o._materialName  = null;
   o._material      = null;
   o._activeInfo    = null;
   o._infos         = null;
   o.construct      = MG3dRenderable_construct;
   o.currentMatrix  = MG3dRenderable_currentMatrix;
   o.matrix         = MG3dRenderable_matrix;
   o.material       = MG3dRenderable_material;
   o.activeEffect   = MG3dRenderable_activeEffect;
   o.activeInfo     = MG3dRenderable_activeInfo;
   o.effectFind     = MG3dRenderable_effectFind;
   o.effectSet      = MG3dRenderable_effectSet;
   o.infos          = MG3dRenderable_infos;
   o.selectInfo     = MG3dRenderable_selectInfo;
   o.resetInfos     = MG3dRenderable_resetInfos;
   o.testVisible    = RMethod.virtual(o, 'testVisible');
   o.update         = MG3dRenderable_update;
   o.dispose        = MG3dRenderable_dispose;
   return o;
}
function MG3dRenderable_construct(){
   var o = this;
   o._currentMatrix = new SMatrix3d();
   o._matrix = new SMatrix3d();
   o._material = RClass.create(FG3dMaterial);
}
function MG3dRenderable_currentMatrix(){
   return this._currentMatrix;
}
function MG3dRenderable_matrix(){
   return this._matrix;
}
function MG3dRenderable_activeEffect(){
   var i = this._activeInfo;
   return i ? i.effect : null;
}
function MG3dRenderable_activeInfo(){
   return this._activeInfo;
}
function MG3dRenderable_effectFind(p){
   var o = this;
   var s = o._infos;
   if(s){
      var i = s.get(p);
      if(i){
         return i.effect;
      }
   }
   return null;
}
function MG3dRenderable_effectSet(n, e){
   var o = this;
   var s = o.infos();
   var i = s.get(n);
   if(!i){
      i = new SG3dRenderableInfo();
      es.set(n, i)
   }
   i.effect = e;
}
function MG3dRenderable_infos(){
   var o = this;
   var r = o._infos;
   if(!r){
      r = o._infos = new TDictionary();
   }
   return r;
}
function MG3dRenderable_selectInfo(p){
   var o = this;
   var s = o.infos();
   var i = s.get(p);
   if(!i){
      i = new SG3dRenderableInfo();
      s.set(p, i)
   }
   o._activeInfo = i;
   return i;
}
function MG3dRenderable_resetInfos(){
   var o = this;
   var s = o._infos;
   if(s){
      for(var i = s.count() - 1; i >= 0; i--){
         s.valueAt(i).reset();
      }
   }
}
function MG3dRenderable_material(){
   return this._material;
}
function MG3dRenderable_update(p){
}
function MG3dRenderable_dispose(){
   var o = this;
   o._currentMatrix = RObject.dispose(o._currentMatrix);
   o._matrix = RObject.dispose(o._matrix);
   o._material = RObject.dispose(o._material);
   o._infos = RObject.dispose(o._infos);
}
function SG3dEffectInfo(){
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
   o.attributes            = new TArray();
   o.samplers              = new TArray();
   o.attributeContains     = SG3dEffectInfo_attributeContains;
   o.samplerContains       = SG3dEffectInfo_samplerContains;
   o.reset                 = SG3dEffectInfo_reset;
   o.reset();
   return o;
}
function SG3dEffectInfo_attributeContains(p){
   return this.attributes.contains(p);
}
function SG3dEffectInfo_samplerContains(p){
   return this.samplers.contains(p);
}
function SG3dEffectInfo_reset(){
   var o = this;
   o.code = null;
   o.optionMerge = false;
   o.mergeCount = 0;
   o.fillModeCd = EG3dFillMode.Fill;
   o.optionCullMode = true;
   o.cullModeCd = EG3dCullMode.Front;
   o.optionDepthTest = true;
   o.depthModeCd = EG3dDepthMode.Less;
   o.optionDepthWrite = true;
   o.optionBlendMode = false;
   o.blendSourceMode = EG3dBlendMode.SourceAlpha;
   o.blendTargetMode = EG3dBlendMode.OneMinusSourceAlpha;
   o.optionAlphaTest = false;
   o.optionNormalInvert = false;
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
function SG3dMaterialInfo(o){
   if(!o){o = this;}
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
   o.colorRate            = 1.0;
   o.colorMerge           = 1.0;
   o.optionAmbient        = null;
   o.ambientColor         = new SColor4();
   o.ambientShadow        = 1.0;
   o.optionDiffuse        = null;
   o.diffuseColor         = new SColor4();
   o.diffuseShadow        = 1.0;
   o.optionDiffuseView    = null;
   o.diffuseViewColor     = new SColor4();
   o.diffuseViewShadow    = 1.0;
   o.optionSpecular       = null;
   o.specularColor        = new SColor4();
   o.specularBase         = 1.0;
   o.specularLevel        = 1.0;
   o.specularAverage      = 1.0;
   o.specularShadow       = 1.0;
   o.specularInfo         = null;
   o.optionSpecularView   = null;
   o.specularViewColor    = new SColor4();
   o.specularViewBase     = 1.0;
   o.specularViewRate     = 1.0;
   o.specularViewAverage  = 1.0;
   o.specularViewShadow   = 1.0;
   o.specularViewShadow   = null;
   o.optionReflect        = null;
   o.reflectColor         = new SColor4();
   o.reflectMerge         = 1.0;
   o.reflectShadow        = 1.0;
   o.optionRefract        = null;
   o.refractFrontColor    = new SColor4();
   o.refractBackColor     = new SColor4();
   o.optionOpacity        = null;
   o.opacityColor         = new SColor4();
   o.opacityRate          = 1.0;
   o.opacityAlpha         = 1.0;
   o.opacityDepth         = 1.0;
   o.opacityTransmittance = 1.0;
   o.optionEmissive       = null;
   o.emissiveColor        = new SColor4();
   o.assign               = SG3dMaterialInfo_assign;
   o.calculate            = SG3dMaterialInfo_calculate;
   o.reset                = SG3dMaterialInfo_reset;
   o.reset();
   return o;
}
function SG3dMaterialInfo_assign(p){
   var o = this;
   o.effectCode = p.effectCode;
   o.transformName = p.transformName;
   o.optionDepth = p.optionDepth;
   o.optionDouble = p.optionDouble;
   o.optionNormalInvert = p.optionNormalInvert;
   o.optionShadow = p.optionShadow;
   o.optionShadowSelf = p.optionShadowSelf;
   o.optionColor = p.optionColor;
   o.colorMin = p.colorMin;
   o.colorMax = p.colorMax;
   o.colorRate = p.colorRate;
   o.colorMerge = p.colorMerge;
   o.optionAlpha = p.optionAlpha;
   o.alphaBase = p.alphaBase;
   o.alphaRate = p.alphaRate;
   o.alphaLevel = p.alphaLevel;
   o.alphaMerge = p.alphaMerge;
   o.optionAmbient = p.optionAmbient;
   o.ambientColor.assign(p.ambientColor);
   o.ambientShadow = p.ambientShadow;
   o.optionDiffuse = p.optionDiffuse;
   o.diffuseColor.assign(p.diffuseColor);
   o.diffuseShadow = p.diffuseShadow;
   o.optionDiffuseView = p.optionDiffuseView;
   o.diffuseViewColor.assign(p.diffuseViewColor);
   o.diffuseViewShadow = p.diffuseViewShadow;
   o.optionSpecular = p.optionSpecular;
   o.specularColor.assign(p.specularColor);
   o.specularBase = p.specularBase;
   o.specularLevel = p.specularLevel;
   o.specularAverage = p.specularAverage;
   o.specularShadow = p.specularShadow;
   o.optionSpecularView = p.optionSpecularView;
   o.specularViewColor.assign(p.specularViewColor);
   o.specularViewBase = p.specularViewBase;
   o.specularViewRate = p.specularViewRate;
   o.specularViewAverage = p.specularViewAverage;
   o.specularViewShadow = p.specularViewShadow;
   o.optionReflect = p.optionReflect;
   o.reflectColor.assign(p.reflectColor);
   o.reflectMerge = RFloat.toRange(p.reflectMerge, 0, 2);
   o.reflectShadow = p.reflectShadow;
   o.optionRefract = p.optionRefract;
   o.refractFrontColor.assign(p.refractFrontColor);
   o.refractFrontMerge = p.refractFrontMerge;
   o.refractFrontShadow = p.refractFrontShadow;
   o.refractBackColor.assign(p.refractBackColor);
   o.refractBackMerge = p.refractBackMerge;
   o.refractBackShadow = p.refractBackShadow;
   o.optionOpacity = p.optionOpacity;
   o.opacityColor.assign(p.opacityColor);
   o.opacityRate = p.opacityRate;
   o.opacityAlpha = p.optionAlpha;
   o.opacityDepth = p.optionDepth;
   o.opacityTransmittance = p.optionTransmittance;
   o.optionEmissive = p.optionEmissive;
   o.emissiveColor.assign(p.emissiveColor);
}
function SG3dMaterialInfo_calculate(p){
   var o = this;
   o.effectCode = p.effectCode;
   o.transformName = p.transformName;
   o.optionDepth = p.optionDepth;
   o.optionDouble = p.optionDouble;
   o.optionNormalInvert = p.optionNormalInvert;
   o.optionShadow = p.optionShadow;
   o.optionShadowSelf = p.optionShadowSelf;
   o.optionColor = p.optionColor;
   o.colorMin = p.colorMin;
   o.colorMax = p.colorMax;
   o.colorRate = p.colorRate;
   o.colorMerge = p.colorMerge;
   o.optionAlpha = p.optionAlpha;
   o.alphaBase = p.alphaBase;
   o.alphaRate = p.alphaRate;
   o.alphaLevel = p.alphaLevel;
   o.alphaMerge = p.alphaMerge;
   o.optionAmbient = p.optionAmbient;
   o.ambientColor.assignPower(p.ambientColor);
   o.ambientShadow = p.ambientShadow;
   o.optionDiffuse = p.optionDiffuse;
   o.diffuseColor.assignPower(p.diffuseColor);
   o.diffuseShadow = p.diffuseShadow;
   o.optionDiffuseView = p.optionDiffuseView;
   o.diffuseViewColor.assignPower(p.diffuseViewColor);
   o.diffuseViewShadow = p.diffuseViewShadow;
   o.optionSpecular = p.optionSpecular;
   o.specularColor.assignPower(p.specularColor);
   o.specularBase = p.specularBase;
   o.specularLevel = p.specularLevel;
   o.specularAverage = p.specularAverage;
   o.specularShadow = p.specularShadow;
   o.optionSpecularView = p.optionSpecularView;
   o.specularViewColor.assignPower(p.specularViewColor);
   o.specularViewBase = p.specularViewBase;
   o.specularViewRate = p.specularViewRate;
   o.specularViewAverage = p.specularViewAverage;
   o.specularViewShadow = p.specularViewShadow;
   o.optionReflect = p.optionReflect;
   o.reflectColor.assignPower(p.reflectColor);
   o.reflectMerge = RFloat.toRange(p.reflectMerge, 0, 2);
   o.reflectShadow = p.reflectShadow;
   o.optionRefract = p.optionRefract;
   o.refractFrontColor.assignPower(p.refractFrontColor);
   o.refractFrontMerge = p.refractFrontMerge;
   o.refractFrontShadow = p.refractFrontShadow;
   o.refractBackColor.assignPower(p.refractBackColor);
   o.refractBackMerge = p.refractBackMerge;
   o.refractBackShadow = p.refractBackShadow;
   o.optionOpacity = p.optionOpacity;
   o.opacityColor.assignPower(p.opacityColor);
   o.opacityRate = p.opacityRate;
   o.opacityAlpha = p.optionAlpha;
   o.opacityDepth = p.optionDepth;
   o.opacityTransmittance = p.optionTransmittance;
   o.optionEmissive = p.optionEmissive;
   o.emissiveColor.assignPower(p.emissiveColor);
}
function SG3dMaterialInfo_reset(){
   var o = this;
   o.optionDepth = true;
   o.optionDouble = false;
   o.optionNormalInvert = false;
   o.optionShadow = true;
   o.optionShadowSelf = true;
   o.optionColor = true;
   o.colorMin = 0.0;
   o.colorMax = 1.0;
   o.colorRate = 1.0;
   o.colorMerge = 1.0;
   o.optionAlpha = false;
   o.alphaBase = 0.2;
   o.alphaRate = 1.0;
   o.alphaLevel = 1.0;
   o.alphaMerge = 1.0;
   o.optionAmbient = true;
   o.ambientColor.set(0.5, 0.5, 0.5, 1.0);
   o.ambientShadow = 1.0;
   o.optionDiffuse = true;
   o.diffuseColor.set(0.5, 0.5, 0.5, 1.0);
   o.diffuseShadow = 1.0;
   o.optionDiffuseView = true;
   o.diffuseViewColor.set(1.0, 1.0, 1.0, 1.0);
   o.diffuseViewShadow = 1.0;
   o.optionSpecular = true;
   o.specularColor.set(0.5, 0.5, 0.5, 1.0);
   o.specularBase = 0.0;
   o.specularLevel = 16.0;
   o.specularAverage = 1.0;
   o.specularShadow = 1.0;
   o.optionSpecularView = true;
   o.specularViewColor.set(1.0, 1.0, 1.0, 1.0);
   o.specularViewBase = 0.0;
   o.specularViewRate = 16.0;
   o.specularViewAverage = 1.0;
   o.specularViewShadow = 1.0;
   o.optionReflect = true;
   o.reflectColor.set(1.0, 1.0, 1.0, 1.0);
   o.reflectMerge = 1.0;
   o.reflectShadow = 1.0;
   o.optionRefract = true;
   o.refractFrontColor.set(1.0, 1.0, 1.0, 1.0);
   o.refractFrontMerge = 1.0;
   o.refractFrontShadow = 1.0;
   o.refractBackColor.set(1.0, 1.0, 1.0, 1.0);
   o.refractBackMerge = 1.0;
   o.refractBackShadow = 1.0;
   o.optionOpacity = true;
   o.opacityColor.set(1.0, 1.0, 1.0, 1.0);
   o.opacityRate = 1.0;
   o.opacityAlpha = 1.0;
   o.opacityDepth = 1.0;
   o.opacityTransmittance = 1.0;
   o.optionEmissive = true;
   o.emissiveColor.set(1.0, 1.0, 1.0, 1.0);
}
function SG3dRenderableInfo(){
   var o = this;
   o.effect   = null;
   o.layout   = null;
   o.material = null;
   o.reset    = SG3dRenderableInfo_reset;
   return o;
}
function SG3dRenderableInfo_reset(){
   var o = this;
   o.effect = null;
   o.layout = RObject.dispose(o.layout);
}
function FG3dAnimation(o){
   o = RClass.inherits(this, o, FObject);
   o._baseTick    = 0;
   o._currentTick = 0;
   o._lastTick    = 0
   o._bones       = null;
   o.construct    = FG3dAnimation_construct;
   o.findBone     = FG3dAnimation_findBone;
   o.process      = FG3dAnimation_process;
   o.dispose      = FG3dAnimation_dispose;
   return o;
}
function FG3dAnimation_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._bones = new TObjects();
}
function FG3dAnimation_findBone(p){
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
function FG3dAnimation_process(){
   var o = this;
   var t = RTimer.current();
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
function FG3dAnimation_dispose(){
   var o = this;
   o._bones.dispose();
   o._bones = null;
   o.__base.FObject.dispose.call(o);
}
function FG3dBaseMaterial(o){
   o = RClass.inherits(this, o, FObject);
   o._name       = null;
   o._visible    = true;
   o._info       = null;
   o._reference  = null;
   o.construct   = FG3dBaseMaterial_construct;
   o.visible     = FG3dBaseMaterial_visible;
   o.setVisible  = FG3dBaseMaterial_setVisible;
   o.info        = FG3dBaseMaterial_info;
   o.reference   = FG3dBaseMaterial_reference;
   o.testVisible = FG3dBaseMaterial_testVisible;
   o.assignInfo  = FG3dBaseMaterial_assignInfo;
   o.assign      = FG3dBaseMaterial_assign;
   o.calculate   = FG3dBaseMaterial_calculate;
   return o;
}
function FG3dBaseMaterial_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._info = new SG3dMaterialInfo();
}
function FG3dBaseMaterial_visible(){
   return this._visible;
}
function FG3dBaseMaterial_setVisible(p){
   this._visible = p;
}
function FG3dBaseMaterial_info(){
   return this._info;
}
function FG3dBaseMaterial_reference(){
   return this._reference;
}
function FG3dBaseMaterial_testVisible(){
   var o = this;
   var r = o._visible;
   if(r && o._reference){
      r = o._reference.testVisible();
   }
   return r;
}
function FG3dBaseMaterial_assignInfo(p){
   this._info.assign(p);
}
function FG3dBaseMaterial_assign(p){
   var o = this;
   o._reference = p;
   o._info.assign(p.info());
}
function FG3dBaseMaterial_calculate(p){
   var o = this;
   o._reference = p;
   o._info.calculate(p.info());
}
function FG3dBone(o){
   o = RClass.inherits(this, o, FObject);
   o._boneId   = 0;
   o._modeId   = null;
   o.update    = FG3dBone_update;
   return o;
}
function FG3dBone_update(p){
}
function FG3dCamera(o){
   o = RClass.inherits(this, o, FObject);
   o._matrix          = null;
   o._position        = null;
   o._target          = null;
   o._direction       = null;
   o._directionTarget = null;
   o._centerFront     = 0.6;
   o._centerBack      = 1.0;
   o._focalNear       = 0.1;
   o._focalFar        = 200.0;
   o._frustum         = null;
   o._planes          = null;
   o._viewport        = null;
   o.__axisUp         = null;
   o.__axisX          = null;
   o.__axisY          = null;
   o.__axisZ          = null;
   o.construct        = FG3dCamera_construct;
   o.matrix           = FG3dCamera_matrix;
   o.position         = FG3dCamera_position;
   o.setPosition      = FG3dCamera_setPosition;
   o.direction        = FG3dCamera_direction;
   o.setDirection     = FG3dCamera_setDirection;
   o.frustum          = FG3dCamera_frustum;
   o.planes           = FG3dCamera_planes;
   o.doWalk           = FG3dCamera_doWalk;
   o.doStrafe         = FG3dCamera_doStrafe;
   o.doFly            = FG3dCamera_doFly;
   o.doPitch          = FG3dCamera_doPitch;
   o.doYaw            = FG3dCamera_doYaw;
   o.doRoll           = FG3dCamera_doRoll;
   o.lookAt           = FG3dCamera_lookAt;
   o.update           = FG3dCamera_update;
   o.updateFrustum    = FG3dCamera_updateFrustum;
   return o;
}
function FG3dCamera_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._matrix = new SMatrix3d();
   o._position = new SPoint3();
   o._target = new SPoint3();
   o._direction = new SVector3();
   o._directionTarget = new SVector3();
   o._frustum = new SFrustum();
   o._planes = new SFrustumPlanes();
   o._viewport = RClass.create(FG3dViewport);
   o.__axisUp = new SVector3();
   o.__axisUp.set(0, 1, 0);
   o.__axisX = new SVector3();
   o.__axisY = new SVector3();
   o.__axisZ = new SVector3();
}
function FG3dCamera_position(){
   return this._position;
}
function FG3dCamera_matrix(){
   return this._matrix;
}
function FG3dCamera_setPosition(x, y, z){
   this._position.set(x, y, z);
}
function FG3dCamera_direction(){
   return this._direction;
}
function FG3dCamera_setDirection(x, y, z){
   var o = this;
   o._direction.set(x, y, z);
   o._directionTarget.set(x, y, z);
}
function FG3dCamera_frustum(){
   return this._frustum;
}
function FG3dCamera_planes(){
   return this._planes;
}
function FG3dCamera_doWalk(p){
   var o = this;
   o._position.x += o._direction.x * p;
   o._position.z += o._direction.z * p;
}
function FG3dCamera_doStrafe(p){
   var o = this;
   o._position.x += o.__axisY.x * p;
   o._position.z += o.__axisY.z * p;
}
function FG3dCamera_doFly(p){
   var o = this;
   o._position.y += p;
}
function FG3dCamera_doPitch(p){
   throw new TFatal(o, 'Unsupport.')
}
function FG3dCamera_doYaw(p){
   throw new TFatal(o, 'Unsupport.')
}
function FG3dCamera_doRoll(p){
   throw new TFatal(o, 'Unsupport.')
}
function FG3dCamera_lookAt(x, y, z){
   var o = this;
   var p = o._position;
   var d = o._direction;
   o._target.set(x, y, z);
   d.set(x - p.x, y - p.y, z - p.z);
   d.normalize();
   o._directionTarget.assign(d);
}
function FG3dCamera_update(){
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
function FG3dCamera_updateFrustum(){
   var o = this;
   var m = RMath.matrix;
   m.assign(o._matrix);
   m.append(o._projection.matrix());
   o._planes.updateVision(m.data());
}
function FG3dDirectionalLight(o){
   o = RClass.inherits(this, o, FG3dLight);
   o._camera     = null;
   o._viewport   = null;
   o._direction  = null;
   o.construct   = FG3dDirectionalLight_construct;
   o.camera      = FG3dDirectionalLight_camera;
   o.projection  = FG3dDirectionalLight_projection;
   o.viewport    = FG3dDirectionalLight_viewport;
   o.direction   = FG3dDirectionalLight_direction;
   return o;
}
function FG3dDirectionalLight_construct(){
   var o = this;
   o.__base.FG3dLight.construct.call(o);
   o._direction = new SVector3();
   o._camera = RClass.create(FG3dPerspectiveCamera);
}
function FG3dDirectionalLight_camera(){
   return this._camera;
}
function FG3dDirectionalLight_projection(){
   return this._projection;
}
function FG3dDirectionalLight_viewport(){
   return this._viewport;
}
function FG3dDirectionalLight_direction(){
   return this._direction;
}
function FG3dEffect(o){
   o = RClass.inherits(this, o, FG3dObject);
   o._ready              = null;
   o._code               = null;
   o._stateFillCd        = EG3dFillMode.Face;
   o._stateCullCd        = EG3dCullMode.Front;
   o._stateDepth         = true;
   o._stateDepthCd       = EG3dDepthMode.LessEqual;
   o._stateDepthWrite    = true;
   o._stateBlend         = true;
   o._stateBlendSourceCd = EG3dBlendMode.SourceAlpha;
   o._stateBlendTargetCd = EG3dBlendMode.OneMinusSourceAlpha;
   o._stateAlphaTest     = false;
   o._optionShadow       = false;
   o._optionLightMap     = false;
   o._optionFog          = false;
   o._program            = null;
   o._vertexTemplate     = null;
   o._fragmentTemplate   = null;
   o.setup               = RMethod.empty;
   o.testReady           = FG3dEffect_testReady;
   o.code                = FG3dEffect_code;
   o.program             = FG3dEffect_program;
   o.setParameter        = FG3dEffect_setParameter;
   o.setSampler          = FG3dEffect_setSampler;
   o.drawRenderable      = FG3dEffect_drawRenderable;
   o.drawRenderables     = FG3dEffect_drawRenderables;
   o.drawGroup           = FG3dEffect_drawGroup;
   o.drawRegion          = FG3dEffect_drawRegion;
   o.buildInfo           = FG3dEffect_buildInfo;
   o.loadConfig          = FG3dEffect_loadConfig;
   o.load                = FG3dEffect_load;
   o.build               = FG3dEffect_build;
   return o;
}
function FG3dEffect_testReady(){
   return this._ready;
}
function FG3dEffect_code(){
   return this._code;
}
function FG3dEffect_program(){
   return this._program;
}
function FG3dEffect_setParameter(pn, pv, pc){
   this._program.setParameter(pn, pv, pc);
}
function FG3dEffect_setSampler(pn, pt){
   this._program.setSampler(pn, pt);
}
function FG3dEffect_buildInfo(f, r){
}
function FG3dEffect_drawRenderable(pg, pr){
   var o = this;
   var c = o._graphicContext;
   var p = o._program;
   if(p.hasAttribute()){
      var as = p.attributes();
      var ac = as.count();
      for(var n = 0; n < ac; n++){
         var a = as.value(n);
         if(a._statusUsed){
            var vb = r.findVertexBuffer(a._linker);
            if(!vb){
               throw new TError("Can't find renderable vertex buffer. (linker={1})", a._linker);
            }
            p.setAttribute(a._name, vb, vb._formatCd);
         }
      }
   }
   var ib = r.indexBuffer();
   c.drawTriangles(ib, 0, ib.count());
}
function FG3dEffect_drawRenderables(pg, pr, pi, pc){
   var o = this;
   o._graphicContext.setProgram(o._program);
   for(var i = 0; i < pc; i++){
      o.drawRenderable(pg, pr.getAt(pi + i));
   }
}
function FG3dEffect_drawGroup(pg, pr, pi, pc){
   this.drawRenderables(pg, pr, pi, pc);
}
function FG3dEffect_drawRegion(pg, pi, pc){
   var o = this;
   var rs = pg.renderables();
   for(var n = 0; n < pc; ){
      var gb = n;
      var ge = pc;
      var gm = rs.getAt(pi + gb)._materialReference;
      for(var i = n; i < pc; i++){
         var m = rs.getAt(pi + i)._materialReference;
         if(gm != m){
            ge = i;
            break;
         }
         n++;
      }
      o.drawGroup(pg, rs, pi + gb, ge - gb);
   }
}
function FG3dEffect_loadConfig(p){
   var o = this;
   var c = o._graphicContext;
   var g = o._program = c.createProgram();
   var xs = p.nodes();
   var c = xs.count();
   for(var i = 0; i < c; i++){
      var x = xs.get(i);
      if(x.isName('State')){
         var n = x.get('name');
         var v = x.get('value');
         if(n == 'fill_mode'){
            o._stateFillCd = REnum.parse(EG3dFillMode, v);
         }else if(n == 'cull_mode'){
            o._stateCullCd = REnum.parse(EG3dCullMode, v);
         }else if(n == 'depth_mode'){
            o._stateDepth = true;
            o._stateDepthCd = REnum.parse(EG3dDepthMode, v);
         }else if(n == 'depth_write'){
            o._stateDepthWrite = RBoolean.parse(v);
         }else if(n == 'blend_mode'){
            o._stateBlend = RBoolean.parse(v);
            if(o._stateBlend){
               o._stateBlendSourceCd = REnum.parse(EG3dBlendMode, x.get('source'));
               o._stateBlendTargetCd = REnum.parse(EG3dBlendMode, x.get('target'));
            }
         }else if(n == 'alpha_test'){
            o._stateAlphaTest = RBoolean.parse(v);
         }
      }else if(x.isName('Option')){
         var n = x.get('name');
         var v = x.get('value');
         if(n == 'shadow'){
            o._optionShadow = RBoolean.parse(v);
         }else if(n == 'lightmap'){
            o._optionLightMap = RBoolean.parse(v);
         }else if(n == 'fog'){
            o._optionFog = RBoolean.parse(v);
         }
      }else if(x.isName('Parameter')){
         var pp = RClass.create(FG3dProgramParameter);
         pp.loadConfig(x);
         g.parameters().set(pp.name(), pp);
      }else if(x.isName('Attribute')){
         var pa = RClass.create(FG3dProgramAttribute);
         pa.loadConfig(x);
         g.attributes().set(pa.name(), pa);
      }else if(x.isName('Sampler')){
         var ps = RClass.create(FG3dProgramSampler);
         ps.loadConfig(x);
         g.samplers().set(ps.name(), ps);
      }else if(x.isName('Source')){
         var st = x.get('name');
         if(st == 'vertex'){
            o._vertexSource = x.value();
         }else if(st == 'fragment'){
            o._fragmentSource = x.value();
         }else{
            throw new TError(o, 'Unknown source type. (name={1})', nt);
         }
      }else{
         throw new TError(o, 'Unknown config type. (name={1})', x.name());
      }
   }
   var vt = o._vertexTemplate = RClass.create(FG3dShaderTemplate);
   vt.load(o._vertexSource);
   var ft = o._fragmentTemplate = RClass.create(FG3dShaderTemplate);
   ft.load(o._fragmentSource);
}
function FG3dEffect_build(p){
   var o = this;
   var g = o._program;
   var ms = g._parameters
   var mc = ms.count();
   var c = RInstance.get(FTagContext);
   o.buildInfo(c, p);
   var vs = o._vertexTemplate.parse(c);
   var vsf = RString.formatLines(vs);
   g.upload(EG3dShader.Vertex, vsf);
   var fs = o._fragmentTemplate.parse(c);
   for(var i = 0; i < mc; i++){
      var m = ms.value(i);
      var mn = m.name();
      var md = m.define();
      if(md){
         fs = fs.replace(new RegExp(mn, 'g'), md);
      }
   }
   var fsf = RString.formatLines(fs);
   g.upload(EG3dShader.Fragment, fsf);
   g.build();
   g.link();
}
function FG3dEffect_load(){
   var o = this;
   var x = RConsole.find(FG3dEffectConsole).loadConfig(o._code);
   o.loadConfig(x);
}
function FG3dEffectConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._configs         = null;
   o._loadEffects     = null;
   o._registerEffects = null;
   o._templateEffects = null;
   o._effects         = null;
   o._path            = "/ar3/shader/";
   o._effectInfo      = null;
   o._tagContext      = null;
   o._thread          = null;
   o._interval        = 300;
   o.onProcess        = FG3dEffectConsole_onProcess;
   o.construct        = FG3dEffectConsole_construct;
   o.path             = FG3dEffectConsole_path;
   o.register         = FG3dEffectConsole_register;
   o.unregister       = FG3dEffectConsole_unregister;
   o.create           = FG3dEffectConsole_create;
   o.buildEffectInfo  = FG3dEffectConsole_buildEffectInfo;
   o.findTemplate     = FG3dEffectConsole_findTemplate;
   o.find             = FG3dEffectConsole_find;
   o.loadConfig       = FG3dEffectConsole_loadConfig;
   return o;
}
function FG3dEffectConsole_onProcess(){
   var o = this;
   var s = o._loadEffects;
   s.record();
   while(s.next()){
      var m = s.current();
      if(m.processLoad()){
         s.removeCurrent();
      }
   }
}
function FG3dEffectConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._configs = new TDictionary();
   o._loadEffects = new TLooper();
   o._registerEffects = new TDictionary();
   o._templateEffects = new TDictionary();
   o._effects = new TDictionary();
   o._effectInfo = new SG3dEffectInfo();
   o._tagContext = RClass.create(FTagContext);
}
function FG3dEffectConsole_path(){
   return this._path;
}
function FG3dEffectConsole_register(n, e){
   this._registerEffects.set(n, e);
}
function FG3dEffectConsole_unregister(n){
   this._registerEffects.set(n, null);
}
function FG3dEffectConsole_create(c, p){
   var o = this;
   var t = o._registerEffects.get(p);
   if(!t){
      throw new TError(this, 'Unknown effect type name. (type={1})', t);
   }
   var e = RClass.create(t);
   e.linkGraphicContext(c);
   e.setup();
   return e;
}
function FG3dEffectConsole_buildEffectInfo(pc, pf, pg, pr){
   var o = this;
   var t = pg.technique();
   pf.techniqueModeCode = t.activeMode().code();
   pf.optionMerge = pr._optionMerge;
   if(pf.optionMerge){
      pf.mergeCount = pr.mergeMaxCount();
   }
   var mi = pr.material().info();
   pf.optionNormalInvert = mi.optionNormalInvert;
   pf.optionColor = mi.optionColor;
   pf.optionAmbient = mi.optionAmbient;
   pf.optionDiffuse = mi.optionDiffuse;
   pf.optionSpecular = mi.optionSpecular;
   pf.optionReflect = mi.optionReflect;
   pf.optionRefract = mi.optionRefract;
   pf.vertexCount = pr.vertexCount();
   var vs = pr.vertexBuffers();
   var c = vs.count();
   if(vs.constructor == TDictionary){
      for(var i = 0; i < c; i++){
         var v = vs.value(i);
         pf.attributes.push(v.name());
      }
   }else{
      for(var i = 0; i < c; i++){
         var v = vs.get(i);
         pf.attributes.push(v.name());
      }
   }
   var ts = pr.textures();
   if(ts){
      var c = ts.count();
      for(var i = 0; i < c; i++){
         pf.samplers.push(ts.name(i));
      }
   }
   var bs = pr.bones();
   if(bs){
      var bc = bs.count();
      pf.vertexBoneCount = bc;
      var cb = pc.capability().calculateBoneCount(pf.vertexBoneCount, pf.vertexCount);
      if(bc > cb){
         bc = cb;
      }
      pr._boneLimit = bc;
      pf.vertexBoneLimit = bc;
   }
}
function FG3dEffectConsole_findTemplate(pc, pn){
   var o = this;
   var es = o._templateEffects;
   var e = es.get(pn);
   if(e == null){
      var e = o.create(pc, pn);
      e.load();
      RLogger.info(o, 'Create effect template. (name={1}, instance={2})', pn, e);
      es.set(pn, e);
   }
   return e;
}
function FG3dEffectConsole_find(pc, pg, pr){
   var o = this;
   var en = pr.material().info().effectCode;
   if(RString.isEmpty(en)){
      en = 'automatic'
   }
   var ef = pg.spaceName() + '.' + en;
   var et = o.findTemplate(pc, ef);
   if(et){
      o._effectInfo.reset();
      o.buildEffectInfo(pc, o._effectInfo, pg, pr);
      et.buildInfo(o._tagContext, o._effectInfo);
      var ec = ef + o._tagContext.code;
      var es = o._effects;
      var e = es.get(ec);
      if(e == null){
         var e = o.create(pc, ef);
         e._flag = ec;
         e.load();
         e.build(o._effectInfo);
         RLogger.info(o, 'Create effect. (name={1}, instance={2})', en, e);
      }
      es.set(ec, e);
   }
   return e;
}
function FG3dEffectConsole_loadConfig(p){
   var o = this;
   var x = o._configs.get(p);
   if(x){
      return x;
   }
   var u = RBrowser.contentPath(o._path + p + ".xml");
   if(RRuntime.isDebug()){
      u += '?' + RDate.format();
   }
   x = RClass.create(FXmlConnection).send(u);
   o._configs.set(p, x);
   return x;
}
function FG3dLight(o){
   o = RClass.inherits(this, o, FObject);
   return o;
}
function FG3dLightMaterial(o){
   o = RClass.inherits(this, o, FG3dBaseMaterial);
   return o;
}
function FG3dMaterial(o){
   o = RClass.inherits(this, o, FG3dBaseMaterial);
   o._dirty    = true;
   o._textures = null;
   o.textures  = FG3dMaterial_textures;
   o.update    = FG3dMaterial_update;
   return o;
}
function FG3dMaterial_textures(){
   return this._textures;
}
function FG3dMaterial_update(){
   var o = this;
   o._dirty = true;
}
function FG3dMaterialMap(o){
   o = RClass.inherits(this, o, FObject, MGraphicObject);
   o._size      = null;
   o._data      = null;
   o._texture   = null;
   o._stride    = null;
   o._dirty     = false;
   o.construct  = FG3dMaterialMap_construct;
   o.size       = FG3dMaterialMap_size;
   o.data       = FG3dMaterialMap_data;
   o.texture    = FG3dMaterialMap_texture;
   o.setup      = FG3dMaterialMap_setup;
   o.resize     = FG3dMaterialMap_resize;
   o.setUint8   = FG3dMaterialMap_setUint8;
   o.setUint16  = FG3dMaterialMap_setUint16;
   o.setUint32  = FG3dMaterialMap_setUint32;
   o.setFloat16 = FG3dMaterialMap_setFloat16;
   o.setFloat32 = FG3dMaterialMap_setFloat32;
   o.update     = FG3dMaterialMap_update;
   return o;
}
function FG3dMaterialMap_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._size = new SSize2();
}
function FG3dMaterialMap_size(){
   return this._size;
}
function FG3dMaterialMap_data(){
   return this._data;
}
function FG3dMaterialMap_texture(){
   return this._texture;
}
function FG3dMaterialMap_setup(w, h){
   var o = this;
   var c = o._graphicContext;
   var t = o._texture = c.createFlatTexture();
   o.resize(w, h);
   t.setFilter(EG3dSamplerFilter.Nearest, EG3dSamplerFilter.Nearest);
   t.uploadData(o._data, w, h);
}
function FG3dMaterialMap_resize(w, h){
   var o = this;
   var s = o._size;
   if(h > 2048){
      h = 4096;
   }else if(h > 1024){
      h = 2048;
   }else if(h > 512){
      h = 1024;
   }else if(h > 256){
      h = 512;
   }else if(h > 128){
      h = 256;
   }else if(h > 64){
      h = 128;
   }else if(h > 32){
      h = 64;
   }else if(h > 16){
      h = 32;
   }
   if(h < s.height){
      h = s.height;
   }
   if((s.width == w) && (s.height == h)){
      return;
   }
   s.set(w, h);
   o._stride = 4 * w;
   var t = 4 * w * h;
   o._data = new Uint8Array(t);
}
function FG3dMaterialMap_setUint8(n, i, v1, v2, v3, v4){
   var o = this;
   var d = o._data;
   var p = (o._stride * n) + (i << 2);
   if(v1.constructor == SColor4){
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
function FG3dMaterialMap_setUint16(n, i, v1, v2){
   var o = this;
   var d = o._data;
   var p = (o._stride * n) + (i << 2);
   d[p++] = (v1 >> 8) & 0xFF;
   d[p++] = v1 & 0xFF;
   d[p++] = (v2 >> 8) & 0xFF;
   d[p++] = v2 & 0xFF;
   o._dirty = true;
}
function FG3dMaterialMap_setUint32(n, i, v){
   var o = this;
   var d = o._data;
   var p = (o._stride * n) + (i << 2);
   d[p++] = (v >> 24) & 0xFF;
   d[p++] = (v >> 16) & 0xFF;
   d[p++] = (v >> 8) & 0xFF;
   d[p++] = v & 0xFF;
   o._dirty = true;
}
function FG3dMaterialMap_setFloat16(n, i, v1, v2){
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
function FG3dMaterialMap_setFloat32(n, i, v){
   var o = this;
   var d = o._data;
   var p = (o._stride * n) + (i << 2);
   d[p++] = parseInt(v * 0.00390625) & 0xFF;
   d[p++] = parseInt(v) & 0xFF;
   d[p++] = parseInt(v * 256) & 0xFF;
   d[p++] = parseInt(v * 65536) & 0xFF;
   o._dirty = true;
}
function FG3dMaterialMap_update(){
   var o = this;
   if(o._dirty){
      var s = o._size;
      o._texture.uploadData(o._data, s.width, s.height);
      o._dirty = false;
   }
}
function FG3dMaterialTexture(o){
   o = RClass.inherits(this, o, FG3dMaterial);
   o._texture  = null;
   o.construct = FG3dMaterialTexture_construct;
   return o;
}
function FG3dMaterialTexture_construct(){
   var o = this;
}
function FG3dObject(o){
   o = RClass.inherits(this, o, FObject, MGraphicObject);
   o.setup   = FG3dObject_setup;
   o.dispose = FG3dObject_dispose;
   return o;
}
function FG3dObject_setup(){
}
function FG3dObject_dispose(){
   var o = this;
   o.__base.MGraphicObject.dispose.call(o);
   o.__base.FObject.dispose.call(o);
}
function FG3dOrthoCamera(o){
   o = RClass.inherits(this, o, FG3dCamera);
   o._projection      = null;
   o.construct        = FG3dOrthoCamera_construct;
   o.projection       = FG3dOrthoCamera_projection;
   o.updateFrustum    = FG3dOrthoCamera_updateFrustum;
   o.updateFromCamera = FG3dOrthoCamera_updateFromCamera;
   o.updateFlatCamera = FG3dOrthoCamera_updateFlatCamera;
   return o;
}
function FG3dOrthoCamera_construct(){
   var o = this;
   o.__base.FG3dCamera.construct.call(o);
   o._projection = RClass.create(FG3dOrthoProjection);
}
function FG3dOrthoCamera_projection(){
   return this._projection;
}
function FG3dOrthoCamera_updateFrustum(){
   var o = this;
   o.__base.FG3dCamera.updateFrustum.call(o);
   var p = o._projection;
   var s = p._size;
   var f = o._frustum;
   f.update(p._angle, s.width, s.height, p._znear, p._zfar, o._centerFront, o._centerBack, o._matrix);
   return f;
}
function FG3dOrthoCamera_updateFromCamera(p){
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
function FG3dOrthoCamera_updateFlatCamera(p){
   var o = this;
   var f = o._frustum
   var pf = p.updateFlatFrustum();
   var angle = RConst.DEGREE_RATE * o._projection.angle();
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
function FG3dOrthoProjection(o){
   o = RClass.inherits(this, o, FG3dProjection);
   o._matrix       = null;
   o.construct     = FG3dOrthoProjection_construct;
   o.matrix        = FG3dOrthoProjection_matrix;
   o.update        = FG3dOrthoProjection_update;
   o.updateFrustum = FG3dOrthoProjection_updateFrustum;
   return o;
}
function FG3dOrthoProjection_construct(){
   var o = this;
   o.__base.FG3dProjection.construct.call(o);
   o._matrix = new SOrthoMatrix3d();
}
function FG3dOrthoProjection_matrix(){
   return this._matrix;
}
function FG3dOrthoProjection_update(){
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
function FG3dOrthoProjection_updateFrustum(p){
   var o = this;
   o._znear = p.minZ;
   o._zfar = p.maxZ;
   o.update();
}
function FG3dPerspectiveCamera(o){
   o = RClass.inherits(this, o, FG3dCamera);
   o._projection       = null;
   o._centerFront      = 0.4;
   o.construct         = FG3dPerspectiveCamera_construct;
   o.projection        = FG3dPerspectiveCamera_projection;
   o.updateFrustum     = FG3dPerspectiveCamera_updateFrustum;
   o.updateFlatFrustum = FG3dPerspectiveCamera_updateFlatFrustum;
   o.updateFromCamera  = FG3dPerspectiveCamera_updateFromCamera;
   o.updateFlatCamera  = FG3dPerspectiveCamera_updateFlatCamera;
   return o;
}
function FG3dPerspectiveCamera_construct(){
   var o = this;
   o.__base.FG3dCamera.construct.call(o);
   o._projection = RClass.create(FG3dPerspectiveProjection);
}
function FG3dPerspectiveCamera_projection(){
   return this._projection;
}
function FG3dPerspectiveCamera_updateFrustum(){
   var o = this;
   o.__base.FG3dCamera.updateFrustum.call(o);
   var p = o._projection;
   var s = p._size;
   var f = o._frustum;
   f.update(p._angle, s.width, s.height, p._znear, p._zfar, o._centerFront, o._centerBack, o._matrix);
   return f;
}
function FG3dPerspectiveCamera_updateFlatFrustum(){
   var o = this;
   var p = o._projection;
   var s = p._size;
   var f = o._frustum;
   f.updateFlat(p._angle, s.width, s.height, p._znear, p._zfar, o._centerFront, o._centerBack, o._matrix);
   return f;
}
function FG3dPerspectiveCamera_updateFromCamera(p){
   var o = this;
   var f = o._frustum;
   var pf = p.updateFrustum();
   var angle = RConst.DEGREE_RATE * o._projection.angle();
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
function FG3dPerspectiveCamera_updateFlatCamera(p){
   var o = this;
   var f = o._frustum;
   var pf = p.updateFlatFrustum();
   var angle = RConst.DEGREE_RATE * o._projection.angle();
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
function FG3dPerspectiveProjection(o){
   o = RClass.inherits(this, o, FG3dProjection);
   o._matrix       = null;
   o.construct     = FG3dPerspectiveProjection_construct;
   o.matrix        = FG3dPerspectiveProjection_matrix;
   o.update        = FG3dPerspectiveProjection_update;
   o.updateFrustum = FG3dPerspectiveProjection_updateFrustum;
   return o;
}
function FG3dPerspectiveProjection_construct(){
   var o = this;
   o.__base.FG3dProjection.construct.call(o);
   o._matrix = new SPerspectiveMatrix3d();
}
function FG3dPerspectiveProjection_matrix(){
   return this._matrix;
}
function FG3dPerspectiveProjection_update(){
   var o = this;
   var s = o._size;
   o._fieldOfView = RConst.DEGREE_RATE * o._angle;
   o._matrix.perspectiveFieldOfViewLH(o._fieldOfView, s.width / s.height, o._znear, o._zfar);
}
function FG3dPerspectiveProjection_updateFrustum(p){
   var o = this;
   o._znear = p.minZ;
   o._zfar = p.maxZ;
   o.update();
}
function FG3dPointLight(o){
   o = RClass.inherits(this, o, FG3dLight);
   return o;
}
function FG3dProjection(o){
   o = RClass.inherits(this, o, FObject);
   o._size        = null;
   o._angle       = 60.0;
   o._fieldOfView = 0;
   o._znear       = 0.1;
   o._zfar        = 200.0;
   o._scale       = 0;
   o.construct   = FG3dProjection_construct;
   o.size        = FG3dProjection_size;
   o.angle       = FG3dProjection_angle;
   o.znear       = FG3dProjection_znear;
   o.zfar        = FG3dProjection_zfar;
   o.distance    = FG3dProjection_distance;
   return o;
}
function FG3dProjection_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._size = new SSize2();
}
function FG3dProjection_size(){
   return this._size;
}
function FG3dProjection_angle(){
   return this._angle;
}
function FG3dProjection_znear(){
   return this._znear;
}
function FG3dProjection_zfar(){
   return this._zfar;
}
function FG3dProjection_distance(){
   return this._zfar - this._znear;
}
function FG3dShaderTemplate(o){
   o = RClass.inherits(this, o, FTagDocument);
   o._space  = 'shader';
   return o;
}
function FG3dSpotLight(o){
   o = RClass.inherits(this, o, FG3dLight);
   return o;
}
function FG3dTechnique(o){
   o = RClass.inherits(this, o, FG3dObject);
   o._code           = null;
   o._activeMode     = null;
   o._modes          = null;
   o._passes         = null;
   o.construct       = FG3dTechnique_construct;
   o.code            = FG3dTechnique_code;
   o.activeMode      = FG3dTechnique_activeMode;
   o.modes           = FG3dTechnique_modes;
   o.passes          = FG3dTechnique_passes;
   o.registerMode    = FG3dTechnique_registerMode;
   o.selectMode      = FG3dTechnique_selectMode;
   o.updateRegion    = RMethod.empty;
   o.clear           = FG3dTechnique_clear;
   o.sortRenderables = FG3dTechnique_sortRenderables;
   o.drawRegion      = FG3dTechnique_drawRegion;
   o.present         = FG3dTechnique_present;
   return o;
}
function FG3dTechnique_construct(){
   var o = this;
   o.__base.FG3dObject.construct.call(o);
   o._modes = new TObjects();
   o._passes = new TObjects();
}
function FG3dTechnique_code(){
   return this._code;
}
function FG3dTechnique_activeMode(){
   return this._activeMode;
}
function FG3dTechnique_modes(){
   return this._modes;
}
function FG3dTechnique_passes(){
   return this._passes;
}
function FG3dTechnique_registerMode(p){
   var o = this;
   var m = RClass.create(FG3dTechniqueMode);
   m.setCode(p);
   o._modes.push(m);
   o._activeMode = m;
   return m;
}
function FG3dTechnique_selectMode(p){
   var o = this;
}
function FG3dTechnique_clear(p){
   var o = this;
   var c = o._graphicContext;
   c.setRenderTarget(null);
   c.clear(p.red, p.green, p.blue, p.alpha, 1);
}
function FG3dTechnique_sortRenderables(a, b){
}
function FG3dTechnique_drawRegion(p){
   var o = this;
   p.setTechnique(o);
   var s = o._passes;
   var c = s.count();
   for(var n = 0; n < c; n++){
      var v = s.get(n);
      p.setTechniquePass(v, (n == c - 1));
      v.drawRegion(p);
   }
}
function FG3dTechnique_present(p){
   this._graphicContext.present();
}
function FG3dTechniqueConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._techniques = null;
   o.construct   = FG3dTechniqueConsole_construct;
   o.techniques  = FG3dTechniqueConsole_techniques;
   o.find        = FG3dTechniqueConsole_find;
   return o;
}
function FG3dTechniqueConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._techniques = new TDictionary();
}
function FG3dTechniqueConsole_techniques(){
   return this._techniques;
}
function FG3dTechniqueConsole_find(c, p){
   var o = this;
   var n = RClass.name(p);
   var ts = o._techniques;
   var t = ts.get(n);
   if(!t){
      t = RClass.createByName(n);
      t.linkGraphicContext(c);
      t.setup();
      var ps = t.passes();
      var pc = ps.count();
      for(var i = 0; i < pc; i++){
         var v = ps.get(i);
         v.setFullCode(t.code() + '.' + v.code());
      }
      ts.set(n, t);
   }
   return t;
}
function FG3dTechniqueMode(o){
   o = RClass.inherits(this, o, FObject);
   o._code   = null;
   o.code    = FG3dTechniqueMode_code;
   o.setCode = FG3dTechniqueMode_setCode;
   return o;
}
function FG3dTechniqueMode_code(){
   return this._code;
}
function FG3dTechniqueMode_setCode(p){
   this._code = p;
}
function FG3dTechniquePass(o){
   o = RClass.inherits(this, o, FG3dObject);
   o._fullCode       = null;
   o._code           = null;
   o._index          = null;
   o._finish         = false;
   o._materialMap    = null;
   o.setup           = FG3dTechniquePass_setup;
   o.fullCode        = FG3dTechniquePass_fullCode;
   o.setFullCode     = FG3dTechniquePass_setFullCode;
   o.code            = FG3dTechniquePass_code;
   o.activeEffects   = FG3dTechniquePass_activeEffects;
   o.sortRenderables = FG3dTechniquePass_sortRenderables;
   o.drawRegion      = FG3dTechniquePass_drawRegion;
   return o;
}
function FG3dTechniquePass_setup(){
   var o = this;
   var m = o._materialMap = RClass.create(FG3dMaterialMap);
   m.linkGraphicContext(o);
   m.setup(EG3dMaterialMap.Count, 32);
}
function FG3dTechniquePass_fullCode(){
   return this._fullCode;
}
function FG3dTechniquePass_setFullCode(p){
   this._fullCode = p;
}
function FG3dTechniquePass_code(){
   return this._code;
}
function FG3dTechniquePass_sortRenderables(s, t){
   var ms = s.material().info();
   var mt = t.material().info();
   if(ms.optionAlpha && mt.optionAlpha){
      var se = s.activeEffect();
      var te = t.activeEffect();
      if(se == te){
         sm = s._materialReference;
         tm = t._materialReference;
         if(sm && tm){
            return sm.hashCode() - tm.hashCode();
         }
      }
      return se.hashCode() - te.hashCode();
   }else if(ms.optionAlpha && !mt.optionAlpha){
      return 1;
   }else if(!ms.optionAlpha && mt.optionAlpha){
      return -1;
   }else{
      var se = s.activeEffect();
      var te = t.activeEffect();
      if(se == te){
         sm = s._materialReference;
         tm = t._materialReference;
         if(sm && tm){
            return sm.hashCode() - tm.hashCode();
         }
      }
      return se.hashCode() - te.hashCode();
   }
}
function FG3dTechniquePass_activeEffects(p, rs){
   var o = this;
   var sn = p.spaceName();
   for(var i = rs.count() - 1; i >= 0; i--){
      var r = rs.get(i);
      var f = r.selectInfo(sn);
      if(!f.effect){
         f.effect = RConsole.find(FG3dEffectConsole).find(o._graphicContext, p, r);
      }
   }
}
function FG3dTechniquePass_drawRegion(p){
   var o = this;
   var rs = p.renderables();
   var c = rs.count();
   if(c == 0){
      return;
   }
   p._statistics._frameDrawSort.begin();
   o.activeEffects(p, rs);
   rs.sort(o.sortRenderables);
   p._statistics._frameDrawSort.end();
   var cb = o._graphicContext.capability();
   if(cb.optionMaterialMap){
      var mm = o._materialMap;
      mm.resize(EG3dMaterialMap.Count, c);
      for(var i = 0; i < c; i++){
         var r = rs.get(i);
         r._materialId = i;
         var m = r.material();
         var mi = m.info();
         mm.setUint8(i, EG3dMaterialMap.AmbientColor, mi.ambientColor);
         mm.setUint8(i, EG3dMaterialMap.DiffuseColor, mi.diffuseColor);
         mm.setUint8(i, EG3dMaterialMap.SpecularColor, mi.specularColor);
         mm.setUint8(i, EG3dMaterialMap.ReflectColor, mi.reflectColor);
         mm.setUint8(i, EG3dMaterialMap.EmissiveColor, mi.emissiveColor);
      }
      mm.update();
      p._materialMap = mm;
   }
   for(var n = 0; n < c; ){
      var gb = n;
      var ge = c;
      var ga = rs.getAt(gb).activeEffect();
      for(var i = n; i < c; i++){
         var a = rs.getAt(i).activeEffect();
         if(ga != a){
            ge = i;
            break;
         }
         n++;
      }
      ga.drawRegion(p, gb, ge - gb);
   }
}
function FG3dTrack(o){
   o = RClass.inherits(this, o, FObject);
   o._frames = null;
   o.construct = FG3dTrack_construct;
   o.calculate = FG3dTrack_calculate;
   return o;
}
function FG3dTrack_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
}
function FG3dTrack_update(p){
   var o = this;
   var info = new SG3dFrameInfo();
   o._trackResource.calculateFrameInfo(info, tick);
   info.update();
   o._matrix.assign(o._trackResource.matrixInvert());
   o._matrix.append(info.matrix);
   return true;
}
function FG3dTrack_calculate(tick){
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
function FG3dViewport(o){
   o = RClass.inherits(this, o, FObject);
   o.left   = 0;
   o.top    = 0;
   o.width  = 0;
   o.height = 0;
   o.set    = FG3dViewport_set;
   return o;
}
function FG3dViewport_set(l, t, w, h){
   var o = this;
   o.left = l;
   o.top = t;
   o.width = w;
   o.height= h;
}
var REngine3d = new function REngine3d(){
   var o = this;
   o.contexts = new TObjects();
   o.createContext = REngine3d_createContext;
   return o;
}
function REngine3d_createContext(c, h, a){
   var o = this;
   var r = RClass.create(c);
   if(a){
      r._optionAlpha = a.alpha;
      r._optionAntialias = a.antialias;
   }
   r.linkCanvas(h);
   o.contexts.push(r);
   return r;
}
