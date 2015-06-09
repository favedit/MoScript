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
with(MO){
   MO.MG3dRegion = function MG3dRegion(o){
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
   MO.MG3dRegion_construct = function MG3dRegion_construct(){
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
   MO.MG3dRegion_isChanged = function MG3dRegion_isChanged(){
      return this._changed;
   }
   MO.MG3dRegion_spaceName = function MG3dRegion_spaceName(){
      return this._spaceName;
   }
   MO.MG3dRegion_technique = function MG3dRegion_technique(){
      return this._technique;
   }
   MO.MG3dRegion_setTechnique = function MG3dRegion_setTechnique(p){
      this._technique = p;
   }
   MO.MG3dRegion_techniquePass = function MG3dRegion_techniquePass(){
      return this._techniquePass;
   }
   MO.MG3dRegion_setTechniquePass = function MG3dRegion_setTechniquePass(p, f){
      var o = this;
      o._techniquePass = p;
      o._spaceName = p.fullCode();
      o._finish = f;
   }
   MO.MG3dRegion_camera = function MG3dRegion_camera(){
      return this._camera;
   }
   MO.MG3dRegion_directionalLight = function MG3dRegion_directionalLight(){
      return this._directionalLight;
   }
   MO.MG3dRegion_lights = function MG3dRegion_lights(){
      return this._lights;
   }
   MO.MG3dRegion_materialMap = function MG3dRegion_materialMap(){
      return this._materialMap;
   }
   MO.MG3dRegion_allRenderables = function MG3dRegion_allRenderables(p){
      return this._allRenderables;
   }
   MO.MG3dRegion_renderables = function MG3dRegion_renderables(p){
      return this._renderables;
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
   MO.MG3dRegion_reset = function MG3dRegion_reset(){
      var o = this;
      o._renderables.clear();
   }
   MO.MG3dRegion_calculate = function MG3dRegion_calculate(p){
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
   MO.MG3dRegion_update = function MG3dRegion_update(){
      var o = this;
      var rs = o._renderables;
      var c = rs.count();
      for(var i = 0; i < c; i++){
         rs.getAt(i).update(o);
      }
   }
   MO.MG3dRegion_dispose = function MG3dRegion_dispose(){
      var o = this;
      o._renderables = RObject.free(o._renderables);
      o._allRenderables = RObject.free(o._allRenderables);
   }
}
with(MO){
   MO.MG3dRenderable = function MG3dRenderable(o){
      o = RClass.inherits(this, o, MGraphicRenderable);
      o._optionMerge   = false;
      o._currentMatrix = RClass.register(o, new AGetter('_currentMatrix'));
      o._matrix        = RClass.register(o, new AGetter('_matrix'));
      o._material      = RClass.register(o, new AGetSet('_material'));
      o._activeInfo    = RClass.register(o, new AGetter('_activeInfo'));
      o._infos         = null;
      o.construct      = MG3dRenderable_construct;
      o.activeEffect   = MG3dRenderable_activeEffect;
      o.effectFind     = MG3dRenderable_effectFind;
      o.effectSet      = MG3dRenderable_effectSet;
      o.infos          = MG3dRenderable_infos;
      o.selectInfo     = MG3dRenderable_selectInfo;
      o.resetInfos     = MG3dRenderable_resetInfos;
      o.testVisible    = RMethod.emptyTrue;
      o.update         = RMethod.empty;
      o.dispose        = MG3dRenderable_dispose;
      return o;
   }
   MO.MG3dRenderable_construct = function MG3dRenderable_construct(){
      var o = this;
      o._currentMatrix = new SMatrix3d();
      o._matrix = new SMatrix3d();
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
         info = new SG3dRenderableInfo();
         infos.set(code, info)
      }
      info.effect = effect;
   }
   MO.MG3dRenderable_infos = function MG3dRenderable_infos(){
      var o = this;
      var infos = o._infos;
      if(!infos){
         infos = o._infos = new TDictionary();
      }
      return infos;
   }
   MO.MG3dRenderable_selectInfo = function MG3dRenderable_selectInfo(p){
      var o = this;
      var infos = o.infos();
      var info = infos.get(p);
      if(!info){
         info = new SG3dRenderableInfo();
         infos.set(p, info)
      }
      o._activeInfo = info;
      return info;
   }
   MO.MG3dRenderable_resetInfos = function MG3dRenderable_resetInfos(){
      var o = this;
      var infos = o._infos;
      if(infos){
         for(var i = infos.count() - 1; i >= 0; i--){
            infos.at(i).reset();
         }
      }
   }
   MO.MG3dRenderable_dispose = function MG3dRenderable_dispose(){
      var o = this;
      o._currentMatrix = RObject.dispose(o._currentMatrix);
      o._matrix = RObject.dispose(o._matrix);
      o._material = RObject.dispose(o._material);
      o._activeInfo = null;
      o._infos = RObject.dispose(o._infos);
   }
}
with(MO){
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
      o.attributes            = new TArray();
      o.samplers              = new TArray();
      o.attributeContains     = SG3dEffectInfo_attributeContains;
      o.samplerContains       = SG3dEffectInfo_samplerContains;
      o.reset                 = SG3dEffectInfo_reset;
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
}
with(MO){
   MO.SG3dMaterialInfo = function SG3dMaterialInfo(o){
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
      o.colorBalance         = 0.5;
      o.colorRate            = 1.0;
      o.optionVertex         = null;
      o.vertexColor          = new SColor4();
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
      o.reflectMerge = RFloat.toRange(info.reflectMerge, 0, 2);
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
      o.reflectMerge = RFloat.toRange(info.reflectMerge, 0, 2);
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
}
with(MO){
   MO.SG3dRenderableInfo = function SG3dRenderableInfo(){
      var o = this;
      o.effect   = null;
      o.layout   = null;
      o.material = null;
      o.reset    = SG3dRenderableInfo_reset;
      return o;
   }
   MO.SG3dRenderableInfo_reset = function SG3dRenderableInfo_reset(){
      var o = this;
      o.effect = null;
      o.layout = RObject.dispose(o.layout);
   }
}
with(MO){
   MO.FG3dAnimation = function FG3dAnimation(o){
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
   MO.FG3dAnimation_construct = function FG3dAnimation_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
      o._bones = new TObjects();
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
   MO.FG3dAnimation_dispose = function FG3dAnimation_dispose(){
      var o = this;
      o._bones.dispose();
      o._bones = null;
      o.__base.FObject.dispose.call(o);
   }
}
with(MO){
   MO.FG3dBaseMaterial = function FG3dBaseMaterial(o){
      o = RClass.inherits(this, o, FObject);
      o._name       = null;
      o._info       = null;
      o.construct   = FG3dBaseMaterial_construct;
      o.info        = FG3dBaseMaterial_info;
      o.assignInfo  = FG3dBaseMaterial_assignInfo;
      o.assign      = FG3dBaseMaterial_assign;
      o.calculate   = FG3dBaseMaterial_calculate;
      return o;
   }
   MO.FG3dBaseMaterial_construct = function FG3dBaseMaterial_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
      o._info = new SG3dMaterialInfo();
   }
   MO.FG3dBaseMaterial_info = function FG3dBaseMaterial_info(){
      return this._info;
   }
   MO.FG3dBaseMaterial_assignInfo = function FG3dBaseMaterial_assignInfo(info){
      this._info.assign(info);
   }
   MO.FG3dBaseMaterial_assign = function FG3dBaseMaterial_assign(material){
      var o = this;
      o._info.assign(material.info());
   }
   MO.FG3dBaseMaterial_calculate = function FG3dBaseMaterial_calculate(material){
      var o = this;
      o._info.calculate(material.info());
   }
}
with(MO){
   MO.FG3dBone = function FG3dBone(o){
      o = RClass.inherits(this, o, FObject);
      o._boneId   = 0;
      o._modeId   = null;
      o.update    = FG3dBone_update;
      return o;
   }
   MO.FG3dBone_update = function FG3dBone_update(p){
   }
}
with(MO){
   MO.FG3dCamera = function FG3dCamera(o){
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
   MO.FG3dCamera_construct = function FG3dCamera_construct(){
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
   MO.FG3dCamera_position = function FG3dCamera_position(){
      return this._position;
   }
   MO.FG3dCamera_matrix = function FG3dCamera_matrix(){
      return this._matrix;
   }
   MO.FG3dCamera_setPosition = function FG3dCamera_setPosition(x, y, z){
      this._position.set(x, y, z);
   }
   MO.FG3dCamera_direction = function FG3dCamera_direction(){
      return this._direction;
   }
   MO.FG3dCamera_setDirection = function FG3dCamera_setDirection(x, y, z){
      var o = this;
      o._direction.set(x, y, z);
      o._directionTarget.set(x, y, z);
   }
   MO.FG3dCamera_frustum = function FG3dCamera_frustum(){
      return this._frustum;
   }
   MO.FG3dCamera_planes = function FG3dCamera_planes(){
      return this._planes;
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
      throw new TFatal(o, 'Unsupport.')
   }
   MO.FG3dCamera_doYaw = function FG3dCamera_doYaw(p){
      throw new TFatal(o, 'Unsupport.')
   }
   MO.FG3dCamera_doRoll = function FG3dCamera_doRoll(p){
      throw new TFatal(o, 'Unsupport.')
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
      var m = RMath.matrix;
      m.assign(o._matrix);
      m.append(o._projection.matrix());
      o._planes.updateVision(m.data());
   }
}
with(MO){
   MO.FG3dDirectionalLight = function FG3dDirectionalLight(o){
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
   MO.FG3dDirectionalLight_construct = function FG3dDirectionalLight_construct(){
      var o = this;
      o.__base.FG3dLight.construct.call(o);
      o._direction = new SVector3();
      o._camera = RClass.create(FG3dPerspectiveCamera);
   }
   MO.FG3dDirectionalLight_camera = function FG3dDirectionalLight_camera(){
      return this._camera;
   }
   MO.FG3dDirectionalLight_projection = function FG3dDirectionalLight_projection(){
      return this._projection;
   }
   MO.FG3dDirectionalLight_viewport = function FG3dDirectionalLight_viewport(){
      return this._viewport;
   }
   MO.FG3dDirectionalLight_direction = function FG3dDirectionalLight_direction(){
      return this._direction;
   }
}
with(MO){
   MO.FG3dEffect = function FG3dEffect(o){
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
   MO.FG3dEffect_testReady = function FG3dEffect_testReady(){
      return this._ready;
   }
   MO.FG3dEffect_code = function FG3dEffect_code(){
      return this._code;
   }
   MO.FG3dEffect_program = function FG3dEffect_program(){
      return this._program;
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
                  throw new TError("Can't find renderable vertex buffer. (linker={1})", linker);
               }
               program.setAttribute(attribute._name, vertexBuffer, vertexBuffer._formatCd);
            }
         }
      }
      var indexBuffer = renderable.indexBuffer();
      context.drawTriangles(indexBuffer, 0, indexBuffer.count());
   }
   MO.FG3dEffect_drawRenderables = function FG3dEffect_drawRenderables(region, renderable, offset, count){
      var o = this;
      o._graphicContext.setProgram(o._program);
      for(var i = 0; i < count; i++){
         var renderable = renderable.at(offset + i);
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
               o._stateFillCd = REnum.parse(EG3dFillMode, value);
            }else if(name == 'cull_mode'){
               o._stateCullCd = REnum.parse(EG3dCullMode, value);
            }else if(name == 'depth_mode'){
               o._stateDepth = true;
               o._stateDepthCd = REnum.parse(EG3dDepthMode, value);
            }else if(name == 'depth_write'){
               o._stateDepthWrite = RBoolean.parse(value);
            }else if(name == 'blend_mode'){
               o._stateBlend = RBoolean.parse(value);
               if(o._stateBlend){
                  o._stateBlendSourceCd = REnum.parse(EG3dBlendMode, xnode.get('source'));
                  o._stateBlendTargetCd = REnum.parse(EG3dBlendMode, xnode.get('target'));
               }
            }else if(name == 'alpha_test'){
               o._stateAlphaTest = RBoolean.parse(value);
            }
         }else if(xnode.isName('Option')){
            var name = xnode.get('name');
            var value = xnode.get('value');
            if(name == 'shadow'){
               o._optionShadow = RBoolean.parse(value);
            }else if(name == 'lightmap'){
               o._optionLightMap = RBoolean.parse(value);
            }else if(name == 'fog'){
               o._optionFog = RBoolean.parse(value);
            }
         }else if(xnode.isName('Parameter')){
            var parameter = RClass.create(FG3dProgramParameter);
            parameter.loadConfig(xnode);
            program.parameters().set(parameter.name(), parameter);
         }else if(xnode.isName('Attribute')){
            var attribute = RClass.create(FG3dProgramAttribute);
            attribute.loadConfig(xnode);
            program.attributes().set(attribute.name(), attribute);
         }else if(xnode.isName('Sampler')){
            var sampler = RClass.create(FG3dProgramSampler);
            sampler.loadConfig(xnode);
            program.samplers().set(sampler.name(), sampler);
         }else if(xnode.isName('Source')){
            var name = xnode.get('name');
            if(name == 'vertex'){
               o._vertexSource = xnode.value();
            }else if(name == 'fragment'){
               o._fragmentSource = xnode.value();
            }else{
               throw new TError(o, 'Unknown source type. (name={1})', name);
            }
         }else{
            throw new TError(o, 'Unknown config type. (name={1})', xnode.name());
         }
      }
      var vertexTemplate = o._vertexTemplate = RClass.create(FG3dShaderTemplate);
      vertexTemplate.load(o._vertexSource);
      var fragmentTemplate = o._fragmentTemplate = RClass.create(FG3dShaderTemplate);
      fragmentTemplate.load(o._fragmentSource);
   }
   MO.FG3dEffect_build = function FG3dEffect_build(p){
      var o = this;
      var program = o._program;
      var parameters = program.parameters();
      var parameterCount = parameters.count();
      var tagContext = RInstance.get(FTagContext);
      o.buildInfo(tagContext, p);
      var source = o._vertexTemplate.parse(tagContext);
      var formatSource = RString.formatLines(source);
      program.upload(EG3dShader.Vertex, formatSource);
      var source = o._fragmentTemplate.parse(tagContext);
      for(var i = 0; i < parameterCount; i++){
         var parameter = parameters.at(i);
         var parameterName = parameter.name();
         var parameterDefine = parameter.define();
         if(parameterDefine){
            source = source.replace(new RegExp(parameterName, 'g'), parameterDefine);
         }
      }
      var formatSource = RString.formatLines(source);
      program.upload(EG3dShader.Fragment, formatSource);
      program.build();
      program.link();
   }
   MO.FG3dEffect_load = function FG3dEffect_load(){
      var o = this;
      var xconfig = RConsole.find(FG3dEffectConsole).loadConfig(o._code);
      o.loadConfig(xconfig);
   }
}
with(MO){
   MO.FG3dEffectConsole = function FG3dEffectConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._configs         = null;
      o._loadEffects     = null;
      o._registerEffects = null;
      o._templateEffects = null;
      o._effects         = null;
      o._path            = "/ars/shader/";
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
   MO.FG3dEffectConsole_onProcess = function FG3dEffectConsole_onProcess(){
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
   MO.FG3dEffectConsole_construct = function FG3dEffectConsole_construct(){
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
   MO.FG3dEffectConsole_path = function FG3dEffectConsole_path(){
      return this._path;
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
         throw new TError(this, 'Unknown effect type name. (type={1})', t);
      }
      var e = RClass.create(t);
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
         if(RString.isEmpty(vertexCode)){
            throw new TError(o, 'Vertex buffer code is empty.');
         }
         effectInfo.attributes.push(vertexCode);
      }
      var textures = renderable.textures();
      if(textures){
         var count = textures.count();
         for(var i = 0; i < count; i++){
            var textureCode = textures.name(i);
            if(RString.isEmpty(textureCode)){
               throw new TError(o, 'Texture code is empty.');
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
         RLogger.info(o, 'Create effect template. (code={1}, instance={2})', code, effect);
         effects.set(code, effect);
      }
      return effect;
   }
   MO.FG3dEffectConsole_find = function FG3dEffectConsole_find(context, region, renderable){
      var o = this;
      if(!RClass.isClass(context, FGraphicContext)){
         context = context.graphicContext();
      }
      if(!RClass.isClass(context, FGraphicContext)){
         throw new TError(o, 'Unknown context.');
      }
      var effectCode = renderable.material().info().effectCode;
      if(RString.isEmpty(effectCode)){
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
            RLogger.info(o, 'Create effect. (name={1}, instance={2})', effectCode, effect);
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
      var u = RBrowser.contentPath(o._path + p + ".xml");
      if(MO.Runtime.isDebug()){
         u += '?' + RDate.format();
      }
      x = RClass.create(FXmlConnection).send(u);
      o._configs.set(p, x);
      return x;
   }
}
with(MO){
   MO.FG3dLight = function FG3dLight(o){
      o = RClass.inherits(this, o, FObject);
      return o;
   }
}
with(MO){
   MO.FG3dLightMaterial = function FG3dLightMaterial(o){
      o = RClass.inherits(this, o, FG3dBaseMaterial);
      return o;
   }
}
with(MO){
   MO.FG3dMaterial = function FG3dMaterial(o){
      o = RClass.inherits(this, o, FG3dBaseMaterial);
      o._dirty    = true;
      o._textures = null;
      o.textures  = FG3dMaterial_textures;
      o.update    = FG3dMaterial_update;
      return o;
   }
   MO.FG3dMaterial_textures = function FG3dMaterial_textures(){
      return this._textures;
   }
   MO.FG3dMaterial_update = function FG3dMaterial_update(){
      this._dirty = true;
   }
}
with(MO){
   MO.FG3dMaterialMap = function FG3dMaterialMap(o){
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
   MO.FG3dMaterialMap_construct = function FG3dMaterialMap_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
      o._size = new SSize2();
   }
   MO.FG3dMaterialMap_size = function FG3dMaterialMap_size(){
      return this._size;
   }
   MO.FG3dMaterialMap_data = function FG3dMaterialMap_data(){
      return this._data;
   }
   MO.FG3dMaterialMap_texture = function FG3dMaterialMap_texture(){
      return this._texture;
   }
   MO.FG3dMaterialMap_setup = function FG3dMaterialMap_setup(w, h){
      var o = this;
      var c = o._graphicContext;
      var t = o._texture = c.createFlatTexture();
      o.resize(w, h);
      t.setFilterCd(EG3dSamplerFilter.Nearest, EG3dSamplerFilter.Nearest);
      t.uploadData(o._data, w, h);
   }
   MO.FG3dMaterialMap_resize = function FG3dMaterialMap_resize(w, h){
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
   MO.FG3dMaterialMap_setUint8 = function FG3dMaterialMap_setUint8(n, i, v1, v2, v3, v4){
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
}
with(MO){
   MO.FG3dMaterialTexture = function FG3dMaterialTexture(o){
      o = RClass.inherits(this, o, FG3dMaterial);
      o._texture  = null;
      o.construct = FG3dMaterialTexture_construct;
      return o;
   }
   MO.FG3dMaterialTexture_construct = function FG3dMaterialTexture_construct(){
      var o = this;
   }
}
with(MO){
   MO.FG3dObject = function FG3dObject(o){
      o = RClass.inherits(this, o, FObject, MGraphicObject);
      o.setup   = FG3dObject_setup;
      o.dispose = FG3dObject_dispose;
      return o;
   }
   MO.FG3dObject_setup = function FG3dObject_setup(){
   }
   MO.FG3dObject_dispose = function FG3dObject_dispose(){
      var o = this;
      o.__base.MGraphicObject.dispose.call(o);
      o.__base.FObject.dispose.call(o);
   }
}
with(MO){
   MO.FG3dOrthoCamera = function FG3dOrthoCamera(o){
      o = RClass.inherits(this, o, FG3dCamera);
      o._projection      = null;
      o.construct        = FG3dOrthoCamera_construct;
      o.projection       = FG3dOrthoCamera_projection;
      o.updateFrustum    = FG3dOrthoCamera_updateFrustum;
      o.updateFromCamera = FG3dOrthoCamera_updateFromCamera;
      o.updateFlatCamera = FG3dOrthoCamera_updateFlatCamera;
      return o;
   }
   MO.FG3dOrthoCamera_construct = function FG3dOrthoCamera_construct(){
      var o = this;
      o.__base.FG3dCamera.construct.call(o);
      o._projection = RClass.create(FG3dOrthoProjection);
   }
   MO.FG3dOrthoCamera_projection = function FG3dOrthoCamera_projection(){
      return this._projection;
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
}
with(MO){
   MO.FG3dOrthoProjection = function FG3dOrthoProjection(o){
      o = RClass.inherits(this, o, FG3dProjection);
      o._matrix       = null;
      o.construct     = FG3dOrthoProjection_construct;
      o.matrix        = FG3dOrthoProjection_matrix;
      o.update        = FG3dOrthoProjection_update;
      o.updateFrustum = FG3dOrthoProjection_updateFrustum;
      return o;
   }
   MO.FG3dOrthoProjection_construct = function FG3dOrthoProjection_construct(){
      var o = this;
      o.__base.FG3dProjection.construct.call(o);
      o._matrix = new SOrthoMatrix3d();
   }
   MO.FG3dOrthoProjection_matrix = function FG3dOrthoProjection_matrix(){
      return this._matrix;
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
}
with(MO){
   MO.FG3dPerspectiveCamera = function FG3dPerspectiveCamera(o){
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
   MO.FG3dPerspectiveCamera_construct = function FG3dPerspectiveCamera_construct(){
      var o = this;
      o.__base.FG3dCamera.construct.call(o);
      o._projection = RClass.create(FG3dPerspectiveProjection);
   }
   MO.FG3dPerspectiveCamera_projection = function FG3dPerspectiveCamera_projection(){
      return this._projection;
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
   MO.FG3dPerspectiveCamera_updateFlatCamera = function FG3dPerspectiveCamera_updateFlatCamera(p){
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
}
with(MO){
   MO.FG3dPerspectiveProjection = function FG3dPerspectiveProjection(o){
      o = RClass.inherits(this, o, FG3dProjection);
      o._matrix       = null;
      o.construct     = FG3dPerspectiveProjection_construct;
      o.matrix        = FG3dPerspectiveProjection_matrix;
      o.update        = FG3dPerspectiveProjection_update;
      o.updateFrustum = FG3dPerspectiveProjection_updateFrustum;
      return o;
   }
   MO.FG3dPerspectiveProjection_construct = function FG3dPerspectiveProjection_construct(){
      var o = this;
      o.__base.FG3dProjection.construct.call(o);
      o._matrix = new SPerspectiveMatrix3d();
   }
   MO.FG3dPerspectiveProjection_matrix = function FG3dPerspectiveProjection_matrix(){
      return this._matrix;
   }
   MO.FG3dPerspectiveProjection_update = function FG3dPerspectiveProjection_update(){
      var o = this;
      var s = o._size;
      o._fieldOfView = RConst.DEGREE_RATE * o._angle;
      o._matrix.perspectiveFieldOfViewLH(o._fieldOfView, s.width / s.height, o._znear, o._zfar);
   }
   MO.FG3dPerspectiveProjection_updateFrustum = function FG3dPerspectiveProjection_updateFrustum(p){
      var o = this;
      o._znear = p.minZ;
      o._zfar = p.maxZ;
      o.update();
   }
}
with(MO){
   MO.FG3dPointLight = function FG3dPointLight(o){
      o = RClass.inherits(this, o, FG3dLight);
      return o;
   }
}
with(MO){
   MO.FG3dProjection = function FG3dProjection(o){
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
   MO.FG3dProjection_construct = function FG3dProjection_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
      o._size = new SSize2();
   }
   MO.FG3dProjection_size = function FG3dProjection_size(){
      return this._size;
   }
   MO.FG3dProjection_angle = function FG3dProjection_angle(){
      return this._angle;
   }
   MO.FG3dProjection_znear = function FG3dProjection_znear(){
      return this._znear;
   }
   MO.FG3dProjection_zfar = function FG3dProjection_zfar(){
      return this._zfar;
   }
   MO.FG3dProjection_distance = function FG3dProjection_distance(){
      return this._zfar - this._znear;
   }
}
with(MO){
   MO.FG3dShaderTemplate = function FG3dShaderTemplate(o){
      o = RClass.inherits(this, o, FTagDocument);
      o._space  = 'shader';
      return o;
   }
}
with(MO){
   MO.FG3dSpotLight = function FG3dSpotLight(o){
      o = RClass.inherits(this, o, FG3dLight);
      return o;
   }
}
with(MO){
   MO.FG3dTechnique = function FG3dTechnique(o){
      o = RClass.inherits(this, o, FG3dObject);
      o._code           = RClass.register(o, new AGetter('_code'));
      o._activeMode     = RClass.register(o, new AGetter('_activeMode'));
      o._modes          = RClass.register(o, new AGetter('_modes'));
      o._passes         = RClass.register(o, new AGetter('_passes'));
      o.construct       = FG3dTechnique_construct;
      o.registerMode    = FG3dTechnique_registerMode;
      o.selectMode      = FG3dTechnique_selectMode;
      o.updateRegion    = RMethod.empty;
      o.clear           = FG3dTechnique_clear;
      o.sortRenderables = FG3dTechnique_sortRenderables;
      o.drawRegion      = FG3dTechnique_drawRegion;
      o.present         = FG3dTechnique_present;
      return o;
   }
   MO.FG3dTechnique_construct = function FG3dTechnique_construct(){
      var o = this;
      o.__base.FG3dObject.construct.call(o);
      o._modes = new TObjects();
      o._passes = new TObjects();
   }
   MO.FG3dTechnique_registerMode = function FG3dTechnique_registerMode(p){
      var o = this;
      var m = RClass.create(FG3dTechniqueMode);
      m.setCode(p);
      o._modes.push(m);
      o._activeMode = m;
      return m;
   }
   MO.FG3dTechnique_selectMode = function FG3dTechnique_selectMode(p){
      var o = this;
   }
   MO.FG3dTechnique_clear = function FG3dTechnique_clear(p){
      var o = this;
      var c = o._graphicContext;
      c.setRenderTarget(null);
      c.clear(p.red, p.green, p.blue, p.alpha, 1);
   }
   MO.FG3dTechnique_sortRenderables = function FG3dTechnique_sortRenderables(a, b){
   }
   MO.FG3dTechnique_drawRegion = function FG3dTechnique_drawRegion(p){
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
   MO.FG3dTechnique_present = function FG3dTechnique_present(p){
      this._graphicContext.present();
   }
}
with(MO){
   MO.FG3dTechniqueConsole = function FG3dTechniqueConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._techniques = null;
      o.construct   = FG3dTechniqueConsole_construct;
      o.techniques  = FG3dTechniqueConsole_techniques;
      o.find        = FG3dTechniqueConsole_find;
      return o;
   }
   MO.FG3dTechniqueConsole_construct = function FG3dTechniqueConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      o._techniques = new TDictionary();
   }
   MO.FG3dTechniqueConsole_techniques = function FG3dTechniqueConsole_techniques(){
      return this._techniques;
   }
   MO.FG3dTechniqueConsole_find = function FG3dTechniqueConsole_find(context, clazz){
      var o = this;
      if(!RClass.isClass(context, FGraphicContext)){
         context = context.graphicContext();
      }
      if(!RClass.isClass(context, FGraphicContext)){
         throw new TError(o, 'Unknown context.');
      }
      var code = context.hashCode() + '|' + RClass.name(clazz);
      var techniques = o._techniques;
      var technique = techniques.get(code);
      if(!technique){
         technique = RClass.create(clazz);
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
}
with(MO){
   MO.FG3dTechniqueMode = function FG3dTechniqueMode(o){
      o = RClass.inherits(this, o, FObject);
      o._code   = null;
      o.code    = FG3dTechniqueMode_code;
      o.setCode = FG3dTechniqueMode_setCode;
      return o;
   }
   MO.FG3dTechniqueMode_code = function FG3dTechniqueMode_code(){
      return this._code;
   }
   MO.FG3dTechniqueMode_setCode = function FG3dTechniqueMode_setCode(p){
      this._code = p;
   }
}
with(MO){
   MO.FG3dTechniquePass = function FG3dTechniquePass(o){
      o = RClass.inherits(this, o, FG3dObject);
      o._fullCode       = RClass.register(o, new AGetSet('_fullCode'));
      o._code           = RClass.register(o, new AGetter('_code'));
      o._index          = null;
      o._finish         = false;
      o._materialMap    = null;
      o.setup           = FG3dTechniquePass_setup;
      o.activeEffects   = FG3dTechniquePass_activeEffects;
      o.sortRenderables = FG3dTechniquePass_sortRenderables;
      o.drawRegion      = FG3dTechniquePass_drawRegion;
      return o;
   }
   MO.FG3dTechniquePass_setup = function FG3dTechniquePass_setup(){
      var o = this;
      var m = o._materialMap = RClass.create(FG3dMaterialMap);
      m.linkGraphicContext(o);
      m.setup(EG3dMaterialMap.Count, 32);
   }
   MO.FG3dTechniquePass_sortRenderables = function FG3dTechniquePass_sortRenderables(s, t){
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
   MO.FG3dTechniquePass_activeEffects = function FG3dTechniquePass_activeEffects(p, rs){
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
   MO.FG3dTechniquePass_drawRegion = function FG3dTechniquePass_drawRegion(p){
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
}
with(MO){
   MO.FG3dTrack = function FG3dTrack(o){
      o = RClass.inherits(this, o, FObject);
      o._frames = null;
      o.construct = FG3dTrack_construct;
      o.calculate = FG3dTrack_calculate;
      return o;
   }
   MO.FG3dTrack_construct = function FG3dTrack_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
   }
   MO.FG3dTrack_update = function FG3dTrack_update(p){
      var o = this;
      var info = new SG3dFrameInfo();
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
}
with(MO){
   MO.FG3dViewport = function FG3dViewport(o){
      o = RClass.inherits(this, o, FObject);
      o.left   = 0;
      o.top    = 0;
      o.width  = 0;
      o.height = 0;
      o.set    = FG3dViewport_set;
      return o;
   }
   MO.FG3dViewport_set = function FG3dViewport_set(l, t, w, h){
      var o = this;
      o.left = l;
      o.top = t;
      o.width = w;
      o.height= h;
   }
}
with(MO){
   MO.REngine3d = function REngine3d(){
      var o = this;
      o._setuped      = false;
      o._contexts     = null;
      o.onUnload      = REngine3d_onUnload;
      o.setup         = REngine3d_setup;
      o.contexts      = REngine3d_contexts;
      o.createContext = REngine3d_createContext;
      o.dispose       = REngine3d_dispose;
      return o;
   }
   MO.REngine3d_onUnload = function REngine3d_onUnload(event){
      this.dispose();
   }
   MO.REngine3d_setup = function REngine3d_setup(){
      var o = this;
      if(!o._setuped){
         o._contexts = new TObjects();
         RWindow.lsnsUnload.register(o, o.onUnload);
         o._setuped = true;
      }
   }
   MO.REngine3d_contexts = function REngine3d_contexts(){
      return this._contexts;
   }
   MO.REngine3d_createContext = function REngine3d_createContext(clazz, hCanvas, attributes){
      var o = this;
      o.setup();
      var context = RClass.create(clazz);
      if(attributes){
         context._optionAlpha = attributes.alpha;
         context._optionAntialias = attributes.antialias;
      }
      context.linkCanvas(hCanvas);
      o._contexts.push(context);
      return context;
   }
   MO.REngine3d_dispose = function REngine3d_dispose(){
      var o = this;
      var contexts = o._contexts;
      if(contexts){
         var count = contexts.count();
         for(var i = 0; i < count; i++){
            var context = contexts.at(i);
            context.dispose();
         }
         o._contexts = RObject.dispose(contexts);
      }
   }
   MO.REngine3d = new REngine3d();
}
