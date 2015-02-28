MO.Graphic = new function GraphicSpace(){
   return this;
}
function MGraphicObject(o){
   o = RClass.inherits(this, o);
   o._graphicContext    = null;
   o.graphicContext     = MGraphicObject_graphicContext;
   o.linkGraphicContext = MGraphicObject_linkGraphicContext;
   return o;
}
function MGraphicObject_graphicContext(){
   return this._graphicContext;
}
function MGraphicObject_linkGraphicContext(p){
   var o = this;
   if(RClass.isClass(p, FGraphicContext)){
      o._graphicContext = p;
   }else if(RClass.isClass(p, MGraphicObject)){
      o._graphicContext = p._graphicContext;
   }else{
      throw new TError(o, 'Link graphic context failure. (context={1})', p);
   }
}
function MGraphicRenderable(o){
   o = RClass.inherits(this, o, FObject);
   o.process = MGraphicRenderable_process;
   return o;
}
function MGraphicRenderable_process(){
}
function FGraphicContext(o){
   o = RClass.inherits(this, o, FObject);
   o._hCanvas   = null;
   o.construct  = FGraphicContext_construct;
   o.linkCanvas = RMethod.virtual(o, 'linkCanvas');
   o.dispose    = FGraphicContext_dispose;
   return o;
}
function FGraphicContext_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
}
function FGraphicContext_dispose(){
   var o = this;
   o._hCanvas = null;
   o.__base.FObject.dispose.call(o);
}
function FG2dContext(o){
   o = RClass.inherits(this, o, FGraphicContext);
   o._native       = null;
   o.construct     = FG2dContext_construct;
   o.linkCanvas    = FG2dContext_linkCanvas;
   o.drawLine      = FG2dContext_drawLine;
   o.drawRecrangle = FG2dContext_drawRecrangle;
   o.drawText      = FG2dContext_drawText;
   o.drawImage     = FG2dContext_drawImage;
   o.fillRecrangle = FG2dContext_fillRecrangle;
   o.dispose       = FG2dContext_dispose;
   return o;
}
function FG2dContext_construct(){
   var o = this;
   o.__base.FGraphicContext.construct.call(o);
}
function FG2dContext_linkCanvas(h){
   var o = this;
   o._hCanvas = h;
   o._native = h.getContext('2d')
}
function FG2dContext_drawLine(x1, y1, x2, y2){
   var o = this;
   var c = o._native;
   c.moveTo(x1, y1);
   c.lineTo(x2, y2);
   c.stroke();
}
function FG2dContext_drawRecrangle(x1, y1, x2, y2){
   var o = this;
   var c = o._native;
   c.moveTo(x1, y1);
   c.lineTo(x2, y1);
   c.lineTo(x2, y2);
   c.lineTo(x1, y2);
   c.lineTo(x1, y1);
   c.stroke();
}
function FG2dContext_drawText(x, y, t){
   var o = this;
   o._native.fillText(t, x, y);
}
function FG2dContext_drawImage(){
}
function FG2dContext_fillRecrangle(x1, y1, x2, y2){
   var o = this;
   var c = o._native;
   c.beginPath();
   c.moveTo(x1, y1);
   c.lineTo(x2, y1);
   c.lineTo(x2, y2);
   c.lineTo(x1, y2);
   c.lineTo(x1, y1);
   c.closePath();
   c.fill();
}
function FG2dContext_dispose(){
   var o = this;
   o._native = null;
   o.__base.FGraphicContext.dispose.call(o);
}
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
function MG3dRenderable(o){
   o = RClass.inherits(this, o, MGraphicRenderable);
   o._currentMatrix  = null;
   o._matrix         = null;
   o._effectCode     = null;
   o._materialName   = null;
   o._material       = null;
   o._activeInfo     = null;
   o._infos          = null;
   o.construct       = MG3dRenderable_construct;
   o.currentMatrix   = MG3dRenderable_currentMatrix;
   o.matrix          = MG3dRenderable_matrix;
   o.effectCode      = MG3dRenderable_effectCode;
   o.material        = MG3dRenderable_material;
   o.activeEffect    = MG3dRenderable_activeEffect;
   o.activeInfo      = MG3dRenderable_activeInfo;
   o.effectFind      = MG3dRenderable_effectFind;
   o.effectSet       = MG3dRenderable_effectSet;
   o.infos           = MG3dRenderable_infos;
   o.clearInfos      = MG3dRenderable_clearInfos;
   o.selectInfo      = MG3dRenderable_selectInfo;
   o.testVisible     = RMethod.virtual(o, 'testVisible');
   o.update          = MG3dRenderable_update;
   o.dispose         = MG3dRenderable_dispose;
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
function MG3dRenderable_effectCode(){
   return this._effectCode;
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
function MG3dRenderable_clearInfos(){
   var o = this;
   var s = o._infos;
   if(s){
      var c = s.count();
      for(var i = 0; i < c; i++){
         var ri = s.valueAt(i);
         ri.reset();
      }
   }
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
function SG3dEffectInfo(o){
   if(!o){o = this;}
   o.code                  = null;
   o.techniqueCode         = null;
   o.techniqueModeCode     = null;
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
   o.transformName        = null;
   o.optionDepth          = null;
   o.optionDouble         = null;
   o.optionAlpha          = null;
   o.optionView           = null;
   o.optionNormalInvert   = null;
   o.optionShadow         = null;
   o.optionShadowSelf     = null;
   o.optionLight          = null;
   o.optionMerge          = null;
   o.optionSort           = null;
   o.sortLevel            = null;
   o.optionCompare        = null;
   o.optionDynamic        = null;
   o.optionTransmittance  = null;
   o.optionOpacity        = null;
   o.coordRateWidth       = 1.0;
   o.coordRateHeight      = 1.0;
   o.colorMin             = 0.0;
   o.colorMax             = 1.0;
   o.colorRate            = 1.0;
   o.colorMerge           = 1.0;
   o.alphaBase            = 1.0;
   o.alphaRate            = 1.0;
   o.alphaLevel           = 1.0;
   o.alphaMerge           = 1.0;
   o.ambientColor         = new SColor4();
   o.ambientShadow        = 1.0;
   o.diffuseColor         = new SColor4();
   o.diffuseShadow        = 1.0;
   o.diffuseViewColor     = new SColor4();
   o.diffuseViewShadow    = 1.0;
   o.specularColor        = new SColor4();
   o.specularBase         = 1.0;
   o.specularLevel        = 1.0;
   o.specularAverage      = 1.0;
   o.specularShadow       = 1.0;
   o.specularInfo         = null;
   o.specularViewColor    = new SColor4();
   o.specularViewBase     = 1.0;
   o.specularViewRate     = 1.0;
   o.specularViewAverage  = 1.0;
   o.specularViewShadow   = 1.0;
   o.specularViewShadow   = null;
   o.reflectColor         = new SColor4();
   o.reflectMerge         = 1.0;
   o.reflectShadow        = 1.0;
   o.refractFrontColor    = new SColor4();
   o.refractBackColor     = new SColor4();
   o.opacityColor         = new SColor4();
   o.opacityRate          = 1.0;
   o.opacityAlpha         = 1.0;
   o.opacityDepth         = 1.0;
   o.opacityTransmittance = 1.0;
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
   o.optionAlpha = p.optionAlpha;
   o.optionDouble = p.optionDouble;
   o.optionView = p.optionView;
   o.optionNormalInvert = p.optionNormalInvert;
   o.optionShadow = p.optionShadow;
   o.optionShadowSelf = p.optionShadowSelf;
   o.optionLight = p.optionLight;
   o.optionMerge = p.optionMerge;
   o.optionCompare = p.optionCompare;
   o.optionOpacity = p.optionOpacity;
   o.optionTransmittance = p.optionTransmittance;
   o.sortLevel = p.sortLevel;
   o.colorMin = p.colorMin;
   o.colorMax = p.colorMax;
   o.colorRate = p.colorRate;
   o.colorMerge = p.colorMerge;
   o.alphaBase = p.alphaBase;
   o.alphaRate = p.alphaRate;
   o.alphaLevel = p.alphaLevel;
   o.alphaMerge = p.alphaMerge;
   o.ambientColor.assign(p.ambientColor);
   o.ambientShadow = p.ambientShadow;
   o.diffuseColor.assign(p.diffuseColor);
   o.diffuseShadow = p.diffuseShadow;
   o.diffuseViewColor.assign(p.diffuseViewColor);
   o.diffuseViewShadow = p.diffuseViewShadow;
   o.specularColor.assign(p.specularColor);
   o.specularBase = p.specularBase;
   o.specularLevel = p.specularLevel;
   o.specularAverage = p.specularAverage;
   o.specularShadow = p.specularShadow;
   o.specularViewColor.assign(p.specularViewColor);
   o.specularViewBase = p.specularViewBase;
   o.specularViewRate = p.specularViewRate;
   o.specularViewAverage = p.specularViewAverage;
   o.specularViewShadow = p.specularViewShadow;
   o.reflectColor.assign(p.reflectColor);
   o.reflectMerge = RFloat.toRange(p.reflectMerge, 0, 2);
   o.reflectShadow = p.reflectShadow;
   o.refractFrontColor.assign(p.refractFrontColor);
   o.refractFrontMerge = p.refractFrontMerge;
   o.refractFrontShadow = p.refractFrontShadow;
   o.refractBackColor.assign(p.refractBackColor);
   o.refractBackMerge = p.refractBackMerge;
   o.refractBackShadow = p.refractBackShadow;
   o.opacityColor.assign(p.opacityColor);
   o.opacityRate = p.opacityRate;
   o.opacityAlpha = p.optionAlpha;
   o.opacityDepth = p.optionDepth;
   o.opacityTransmittance = p.optionTransmittance;
   o.emissiveColor.assign(p.emissiveColor);
}
function SG3dMaterialInfo_calculate(p){
   var o = this;
   o.effectCode = p.effectCode;
   o.transformName = p.transformName;
   o.optionDepth = p.optionDepth;
   o.optionAlpha = p.optionAlpha;
   o.optionDouble = p.optionDouble;
   o.optionView = p.optionView;
   o.optionNormalInvert = p.optionNormalInvert;
   o.optionShadow = p.optionShadow;
   o.optionShadowSelf = p.optionShadowSelf;
   o.optionLight = p.optionLight;
   o.optionMerge = p.optionMerge;
   o.optionCompare = p.optionCompare;
   o.optionOpacity = p.optionOpacity;
   o.optionTransmittance = p.optionTransmittance;
   o.sortLevel = p.sortLevel;
   o.colorMin = p.colorMin;
   o.colorMax = p.colorMax;
   o.colorRate = p.colorRate;
   o.colorMerge = p.colorMerge;
   o.alphaBase = p.alphaBase;
   o.alphaRate = p.alphaRate;
   o.alphaLevel = p.alphaLevel;
   o.alphaMerge = p.alphaMerge;
   o.ambientColor.assignPower(p.ambientColor);
   o.ambientShadow = p.ambientShadow;
   o.diffuseColor.assignPower(p.diffuseColor);
   o.diffuseShadow = p.diffuseShadow;
   o.diffuseViewColor.assignPower(p.diffuseViewColor);
   o.diffuseViewShadow = p.diffuseViewShadow;
   o.specularColor.assignPower(p.specularColor);
   o.specularBase = p.specularBase;
   o.specularLevel = p.specularLevel;
   o.specularAverage = p.specularAverage;
   o.specularShadow = p.specularShadow;
   o.specularViewColor.assignPower(p.specularViewColor);
   o.specularViewBase = p.specularViewBase;
   o.specularViewRate = p.specularViewRate;
   o.specularViewAverage = p.specularViewAverage;
   o.specularViewShadow = p.specularViewShadow;
   o.reflectColor.assignPower(p.reflectColor);
   o.reflectMerge = RFloat.toRange(p.reflectMerge, 0, 2);
   o.reflectShadow = p.reflectShadow;
   o.refractFrontColor.assignPower(p.refractFrontColor);
   o.refractFrontMerge = p.refractFrontMerge;
   o.refractFrontShadow = p.refractFrontShadow;
   o.refractBackColor.assignPower(p.refractBackColor);
   o.refractBackMerge = p.refractBackMerge;
   o.refractBackShadow = p.refractBackShadow;
   o.opacityColor.assignPower(p.opacityColor);
   o.opacityRate = p.opacityRate;
   o.opacityAlpha = p.optionAlpha;
   o.opacityDepth = p.optionDepth;
   o.opacityTransmittance = p.optionTransmittance;
   o.emissiveColor.assignPower(p.emissiveColor);
}
function SG3dMaterialInfo_reset(){
   var o = this;
   o.coordRateWidth = 1.0;
   o.coordRateHeight = 1.0;
   o.colorMin = 0.0;
   o.colorMax = 1.0;
   o.colorRate = 1.0;
   o.colorMerge = 1.0;
   o.alphaBase = 0.1;
   o.alphaRate = 1.0;
   o.alphaLevel = 1.0;
   o.alphaMerge = 1.0;
   o.ambientColor.set(0.5, 0.5, 0.5, 1.0);
   o.ambientShadow = 1.0;
   o.diffuseColor.set(0.5, 0.5, 0.5, 1.0);
   o.diffuseShadow = 1.0;
   o.diffuseViewColor.set(1.0, 1.0, 1.0, 1.0);
   o.diffuseViewShadow = 1.0;
   o.specularColor.set(0.5, 0.5, 0.5, 1.0);
   o.specularBase = 0.0;
   o.specularLevel = 16.0;
   o.specularAverage = 1.0;
   o.specularShadow = 1.0;
   o.specularViewColor.set(1.0, 1.0, 1.0, 1.0);
   o.specularViewBase = 0.0;
   o.specularViewRate = 16.0;
   o.specularViewAverage = 1.0;
   o.specularViewShadow = 1.0;
   o.reflectColor.set(1.0, 1.0, 1.0, 1.0);
   o.reflectMerge = 1.0;
   o.reflectShadow = 1.0;
   o.refractFrontColor.set(1.0, 1.0, 1.0, 1.0);
   o.refractFrontMerge = 1.0;
   o.refractFrontShadow = 1.0;
   o.refractBackColor.set(1.0, 1.0, 1.0, 1.0);
   o.refractBackMerge = 1.0;
   o.refractBackShadow = 1.0;
   o.opacityColor.set(1.0, 1.0, 1.0, 1.0);
   o.opacityRate = 1.0;
   o.opacityAlpha = 1.0;
   o.opacityDepth = 1.0;
   o.opacityTransmittance = 1.0;
   o.emissiveColor.set(1.0, 1.0, 1.0, 1.0);
}
function SG3dRenderableInfo(){
   var o = this;
   o.effect = null;
   o.layout = null;
   o.reset  = SG3dRenderableInfo_reset;
   return o;
}
function SG3dRenderableInfo_reset(){
   var o = this;
   o.effect = null;
   o.layout = null;
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
   o._name      = null;
   o._info      = null;
   o.construct  = FG3dBaseMaterial_construct;
   o.info       = FG3dBaseMaterial_info;
   o.assignInfo = FG3dBaseMaterial_assignInfo;
   o.assign     = FG3dBaseMaterial_assign;
   o.calculate  = FG3dBaseMaterial_calculate;
   return o;
}
function FG3dBaseMaterial_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._info = new SG3dMaterialInfo();
}
function FG3dBaseMaterial_info(){
   return this._info;
}
function FG3dBaseMaterial_assignInfo(p){
   this._info.assign(p);
}
function FG3dBaseMaterial_assign(p){
   this._info.assign(p.info());
}
function FG3dBaseMaterial_calculate(p){
   this._info.calculate(p.info());
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
   o._planes          = null;
   o._frustum         = null;
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
   o.doWalk           = FG3dCamera_doWalk;
   o.doStrafe         = FG3dCamera_doStrafe;
   o.doFly            = FG3dCamera_doFly;
   o.doPitch          = FG3dCamera_doPitch;
   o.doYaw            = FG3dCamera_doYaw;
   o.doRoll           = FG3dCamera_doRoll;
   o.lookAt           = FG3dCamera_lookAt;
   o.update           = FG3dCamera_update;
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
   o._planes = new Array();
   o._frustum = new SFrustum();
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
   var o = this;
   throw new TFatal(o, 'Unsupport.')
}
function FG3dCamera_doYaw(p){
   var o = this;
   throw new TFatal(o, 'Unsupport.')
}
function FG3dCamera_doRoll(p){
   var o = this;
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
   o.code                = FG3dEffect_code;
   o.program             = FG3dEffect_program;
   o.setParameter        = FG3dEffect_setParameter;
   o.setSampler          = FG3dEffect_setSampler;
   o.drawRenderable      = FG3dEffect_drawRenderable;
   o.buildInfo           = FG3dEffect_buildInfo;
   o.loadConfig          = FG3dEffect_loadConfig;
   o.loadUrl             = FG3dEffect_loadUrl;
   o.load                = FG3dEffect_load;
   o.build               = FG3dEffect_build;
   return o;
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
function FG3dEffect_drawRenderable(r){
   var o = this;
   var c = o._graphicContext;
   var p = o._program;
   c.setProgram(p);
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
   c.drawTriangles(ib, 0, ib._count);
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
function FG3dEffect_loadUrl(u){
   var o = this;
   var x = RClass.create(FXmlConnection);
   if(RRuntime.isDebug()){
      u += '?' + RDate.format();
   }
   var r = x.send(u);
   o.loadConfig(r);
}
function FG3dEffect_build(p){
   var o = this;
   var g = o._program;
   var c = RInstance.get(FTagContext);
   o.buildInfo(c, p);
   var vs = o._vertexTemplate.parse(c);
   var vsf = RString.formatLines(vs);
   g.upload(EG3dShader.Vertex, vsf);
   var fs = o._fragmentTemplate.parse(c);
   var fsf = RString.formatLines(fs);
   g.upload(EG3dShader.Fragment, fsf);
   g.build();
   g.link();
}
function FG3dEffect_load(){
   var o = this;
   var cp = RBrowser.contentPath();
   var ec = RConsole.find(FG3dEffectConsole);
   var u = cp + ec.path() + o._code + ".xml";
   if(RRuntime.isDebug()){
      u += '?' + RDate.format();
   }
   o.loadUrl(u);
}
function FG3dEffectConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._registerEffects = null;
   o._templateEffects = null;
   o._effects         = null;
   o._path            = "/assets/shader/";
   o._effectInfo      = null;
   o._tagContext      = null;
   o.construct        = FG3dEffectConsole_construct;
   o.path             = FG3dEffectConsole_path;
   o.register         = FG3dEffectConsole_register;
   o.unregister       = FG3dEffectConsole_unregister;
   o.create           = FG3dEffectConsole_create;
   o.buildEffectInfo  = FG3dEffectConsole_buildEffectInfo;
   o.findTemplate     = FG3dEffectConsole_findTemplate;
   o.find             = FG3dEffectConsole_find;
   return o;
}
function FG3dEffectConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
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
   var mi = pr.material().info();
   pf.optionNormalInvert = mi.optionNormalInvert;
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
         e.load();
         e.build(o._effectInfo);
         RLogger.info(o, 'Create effect. (name={1}, instance={2})', en, e);
      }
      es.set(ec, e);
   }
   return e;
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
   o._textures = null;
   o.textures  = FG3dMaterial_textures;
   return o;
}
function FG3dMaterial_textures(){
   return this._textures;
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
   console.log('Resize material map.', w, h);
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
   o.setup = FG3dObject_setup;
   return o;
}
function FG3dObject_setup(){
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
   var angle = RMath.DEGREE_RATE * o._projection.angle();
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
   var f = o._frustum
   var pf = p.updateFrustum();
   var angle = RMath.DEGREE_RATE * o._projection.angle();
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
   o._matrix.transform(f.coners, pf.coners, 8);
   f.updateCenter();
   o._projection.updateFrustum(f);
}
function FG3dPerspectiveCamera_updateFlatCamera(p){
   var o = this;
   var f = o._frustum
   var pf = p.updateFlatFrustum();
   var angle = RMath.DEGREE_RATE * o._projection.angle();
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
   o._fieldOfView = RMath.DEGREE_RATE * o._angle;
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
function FG3dRegion(o){
   o = RClass.inherits(this, o, FObject, MGraphicObject);
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
   o.construct                   = FG3dRegion_construct;
   o.spaceName                   = FG3dRegion_spaceName;
   o.technique                   = FG3dRegion_technique;
   o.setTechnique                = FG3dRegion_setTechnique;
   o.techniquePass               = FG3dRegion_techniquePass;
   o.setTechniquePass            = FG3dRegion_setTechniquePass;
   o.camera                      = FG3dRegion_camera;
   o.directionalLight            = FG3dRegion_directionalLight;
   o.lights                      = FG3dRegion_lights;
   o.materialMap                 = FG3dRegion_materialMap;
   o.allRenderables              = FG3dRegion_allRenderables;
   o.renderables                 = FG3dRegion_renderables;
   o.pushRenderable              = FG3dRegion_pushRenderable;
   o.setup                       = FG3dRegion_setup;
   o.prepare                     = FG3dRegion_prepare;
   o.reset                       = FG3dRegion_reset;
   o.calculate                   = FG3dRegion_calculate;
   o.update                      = FG3dRegion_update;
   o.dispose                     = FG3dRegion_dispose;
   return o;
}
function FG3dRegion_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
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
function FG3dRegion_spaceName(){
   return this._spaceName;
}
function FG3dRegion_technique(){
   return this._technique;
}
function FG3dRegion_setTechnique(p){
   this._technique = p;
}
function FG3dRegion_techniquePass(){
   return this._techniquePass;
}
function FG3dRegion_setTechniquePass(p, f){
   var o = this;
   o._techniquePass = p;
   o._spaceName = p.fullCode();
   o._finish = f;
}
function FG3dRegion_camera(){
   return this._camera;
}
function FG3dRegion_directionalLight(){
   return this._directionalLight;
}
function FG3dRegion_lights(){
   return this._lights;
}
function FG3dRegion_materialMap(){
   return this._materialMap;
}
function FG3dRegion_allRenderables(p){
   return this._allRenderables;
}
function FG3dRegion_renderables(p){
   return this._renderables;
}
function FG3dRegion_pushRenderable(p){
   var o = this;
   o._renderables.push(p);
   o._allRenderables.push(p);
}
function FG3dRegion_setup(){
   var o = this;
}
function FG3dRegion_prepare(){
   var o = this;
   var c = o._camera;
   var cp = c.projection();
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
function FG3dRegion_reset(){
   var o = this;
   o._renderables.clear();
}
function FG3dRegion_calculate(p){
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
function FG3dRegion_update(){
   var o = this;
   var rs = o._renderables;
   var c = rs.count();
   for(var i = 0; i < c; i++){
      rs.get(i).update(o);
   }
}
function FG3dRegion_dispose(){
   var o = this;
   o._renderables = RObject.free(o._renderables);
   o._allRenderables = RObject.free(o._allRenderables);
   o.__base.FObject.dispose.call(o);
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
      return 0;
   }else if(ms.optionAlpha && !mt.optionAlpha){
      return 1;
   }else if(!ms.optionAlpha && mt.optionAlpha){
      return -1;
   }else{
      var se = s.activeEffect();
      var te = t.activeEffect();
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
   var cb = o._graphicContext.capability();
   var rs = p.renderables();
   o.activeEffects(p, rs);
   rs.sort(o.sortRenderables);
   var c = rs.count();
   if(c > 0){
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
      for(var i = 0; i < c; i++){
         var r = rs.get(i);
         var e = r.activeEffect();
         o._graphicContext.setProgram(e.program());
         e.drawRenderable(p, r, i);
      }
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
function REngine3d_createContext(c, h){
   var o = this;
   var r = RClass.create(c);
   r.linkCanvas(h);
   o.contexts.push(r);
   return r;
}
var EG3dAttribute = new function EG3dAttribute(){
   var o = this;
   o.Position   = 'position';
   o.Color      = 'color';
   o.Coord      = 'coord';
   o.Normal     = 'normal';
   o.Binormal   = 'binormal';
   o.Tangent    = 'tangent';
   o.BoneIndex  = 'bone_index';
   o.BoneWeight = 'bone_weight';
   return o;
}
var EG3dAttributeFormat = new function EG3dAttributeFormat(){
   var o = this;
   o.Unknown = 0;
   o.Float1 = 1;
   o.Float2 = 2;
   o.Float3 = 3;
   o.Float4 = 4;
   o.Byte4 = 5;
   o.Byte4Normal = 6;
   return o;
}
var EG3dBlendMode = new function EG3dBlendMode(){
   var o = this;
   o.None = 0;
   o.SourceAlpha= 1;
   o.OneMinusSourceAlpha = 2;
   return o;
}
var EG3dCullMode = new function EG3dCullMode(){
   var o = this;
   o.None = 0;
   o.Front= 1;
   o.Back = 2;
   o.Both = 3;
   return o;
}
var EG3dDepthMode = new function EG3dDepthMode(){
   var o = this;
   o.None = 0;
   o.Equal = 1;
   o.NotEqual = 2;
   o.Less = 3;
   o.LessEqual = 4;
   o.Greater = 5;
   o.GreaterEqual = 6;
   o.Always = 7;
   return o;
}
var EG3dFillMode = new function EG3dFillMode(){
   var o = this;
   o.Unknown = 0;
   o.Point = 1;
   o.Line = 2;
   o.Face = 3;
   return o;
}
var EG3dIndexStride = new function EG3dIndexStride(){
   var o = this;
   o.Unknown = 0;
   o.Uint16 = 1;
   o.Uint32 = 2;
   return o;
}
var EG3dParameterFormat = new function EG3dParameterFormat(){
   var o = this;
   o.Unknown = 0;
   o.Float1 = 1;
   o.Float2 = 2;
   o.Float3 = 3;
   o.Float4 = 4;
   o.Float3x3 = 5;
   o.Float4x3 = 6;
   o.Float4x4 = 7;
   return o;
}
var EG3dSampler = new function EG3dSampler(){
   var o = this;
   o.Diffuse       = 'diffuse';
   o.Alpha         = 'alpha';
   o.Normal        = 'normal';
   o.SpecularColor = 'specular.color';
   o.SpecularLevel = 'specular.level';
   o.Light         = 'light';
   o.Reflect       = 'reflect';
   o.Refract       = 'refract';
   o.Emissive      = 'emissive';
   o.Height        = 'height';
   o.Environment   = 'environment';
   return o;
}
var EG3dSamplerFilter = new function EG3dSamplerFilter(){
   var o = this;
   o.Unknown       = 0;
   o.Nearest       = 1;
   o.Linear        = 2;
   o.Repeat        = 3;
   o.ClampToEdge   = 4;
   o.ClampToBorder = 5;
   return o;
}
var EG3dShader = new function EG3dShader(){
   var o = this;
   o.Unknown = 0;
   o.Vertex   = 1;
   o.Fragment = 2;
   return o;
}
var EG3dTexture = new function EG3dTexture(){
   var o = this;
   o.Unknown = 0;
   o.Flat2d = 1;
   o.Flat3d = 2;
   o.Cube= 3;
   return o;
}
function SG3dContextCapability(){
   var o = this;
   o.vendor                 = null;
   o.version                = null;
   o.shaderVersion          = null;
   o.optionInstance         = false;
   o.optionLayout           = false;
   o.optionMaterialMap      = false;
   o.attributeCount         = null;
   o.vertexCount            = 65536;
   o.vertexConst            = null;
   o.fragmentConst          = null;
   o.varyingCount           = null;
   o.samplerCount           = null;
   o.samplerSize            = null;
   o.calculateBoneCount     = SG3dContextCapability_calculateBoneCount;
   o.calculateInstanceCount = SG3dContextCapability_calculateInstanceCount;
   return o;
}
function SG3dContextCapability_calculateBoneCount(bc, vc){
   var o = this;
   var rb = 0;
   var bi = bc % 8;
   if(bi != 0){
      rb = bc + 8 - bi;
   }else{
      rb = bc;
   }
   var r = 0;
   var ib = (o.vertexConst - 16) / 4;
   if(rb > ib){
      r = ib;
   }else{
      r = rb;
   }
   return r;
}
function SG3dContextCapability_calculateInstanceCount(bc, vc){
   var o = this;
   var cr = (4 * bc) + 4;
   var ib = (o.vertexConst - 16) / cr;
   var r = cl;
   if(vc > 0){
      var iv = o.vertexCount / vc;
      r = Math.min(ib, iv);
   }
   if(r > 64){
      r = 64;
   }
   return r;
}
function FG3dContext(o){
   o = RClass.inherits(this, o, FGraphicContext);
   o._size               = null;
   o._capability         = null;
   o._fillModeCd         = EG3dFillMode.Face;
   o._optionDepth        = false;
   o._optionCull         = false;
   o._depthModeCd        = 0;
   o._cullModeCd         = 0;
   o._statusBlend        = false;
   o._blendSourceCd      = 0;
   o._blendTargetCd      = 0;
   o._program            = null;
   o.construct           = FG3dContext_construct;
   o.linkCanvas          = FG3dContext_linkCanvas;
   o.size                = FG3dContext_size;
   o.capability          = FG3dContext_capability;
   o.createProgram       = RMethod.virtual(o, 'createProgram');
   o.createVertexBuffer  = RMethod.virtual(o, 'createVertexBuffer');
   o.createIndexBuffer   = RMethod.virtual(o, 'createIndexBuffer');
   o.createFlatTexture   = RMethod.virtual(o, 'createFlatTexture');
   o.createCubeTexture   = RMethod.virtual(o, 'createCubeTexture');
   o.createRenderTarget  = RMethod.virtual(o, 'createRenderTarget');
   o.setViewport         = RMethod.virtual(o, 'setViewport');
   o.setFillMode         = RMethod.virtual(o, 'setFillMode');
   o.setDepthMode        = RMethod.virtual(o, 'setDepthMode');
   o.setCullingMode      = RMethod.virtual(o, 'setCullingMode');
   o.setBlendFactors     = RMethod.virtual(o, 'setBlendFactors');
   o.setScissorRectangle = RMethod.virtual(o, 'setScissorRectangle');
   o.setRenderTarget     = RMethod.virtual(o, 'setRenderTarget');
   o.setProgram          = RMethod.virtual(o, 'setProgram');
   o.bindVertexBuffer    = RMethod.virtual(o, 'bindVertexBuffer');
   o.bindTexture         = RMethod.virtual(o, 'bindTexture');
   o.clear               = RMethod.virtual(o, 'clear');
   o.clearColor          = RMethod.virtual(o, 'clearColor');
   o.clearDepth          = RMethod.virtual(o, 'clearDepth');
   o.drawTriangles       = RMethod.virtual(o, 'drawTriangles');
   o.present             = RMethod.virtual(o, 'present');
   o.dispose             = FG3dContext_dispose;
   return o;
}
function FG3dContext_construct(){
   var o = this;
   o.__base.FGraphicContext.construct.call(o);
   o._size = new SSize2();
}
function FG3dContext_linkCanvas(h){
   var o = this;
   o._size.set(h.width, h.height);
}
function FG3dContext_size(){
   return this._size;
}
function FG3dContext_capability(){
   return this._capability;
}
function FG3dContext_dispose(){
   var o = this;
   o._program = null;
   o.__base.FGraphicContext.dispose.call(o);
}
function FG3dCubeTexture(o){
   o = RClass.inherits(this, o, FG3dTexture);
   o.size = 0;
   o.construct = FG3dTexture_construct;
   return o;
}
function FG3dTexture_construct(){
   var o = this;
   o.__base.FG3dTexture.construct();
   o._textureCd = EG3dTexture.Cube;
}
function FG3dFlatTexture(o){
   o = RClass.inherits(this, o, FG3dTexture);
   o.width      = 0;
   o.height     = 0;
   o.construct  = FG3dFlatTexture_construct;
   o.uploadData = RMethod.virtual(o, 'uploadData');
   o.upload     = RMethod.virtual(o, 'upload');
   return o;
}
function FG3dFlatTexture_construct(){
   var o = this;
   o.__base.FG3dTexture.construct();
   o._textureCd = EG3dTexture.Flat2d;
}
function FG3dFragmentShader(o){
   o = RClass.inherits(this, o, FG3dShader);
   return o;
}
function FG3dIndexBuffer(o){
   o = RClass.inherits(this, o, FG3dObject);
   o._strideCd = EG3dIndexStride.Uint16;
   o._count    = 0;
   o.strideCd  = FG3dIndexBuffer_strideCd;
   o.count     = FG3dIndexBuffer_count;
   o.upload    = RMethod.virtual(o, 'upload');
   return o;
}
function FG3dIndexBuffer_strideCd(){
   return this._strideCd;
}
function FG3dIndexBuffer_count(){
   return this._count;
}
function FG3dLayout(o){
   o = RClass.inherits(this, o, FG3dObject);
   o._elemets = null;
   o.elemets  = FG3dLayout_elemets;
   o.update   = FG3dLayout_update;
   return o;
}
function FG3dLayout_elemets(){
   return this._elemets;
}
function FG3dLayout_update(){
}
function FG3dLayoutElement(o){
   o = RClass.inherits(this, o, FObject);
   o._name   = 0;
   o._buffer = null;
   o.name   = FG3dLayoutElement_name;
   return o;
}
function FG3dLayoutElement_name(){
   return this._name;
}
function FG3dProgram(o){
   o = RClass.inherits(this, o, FG3dObject);
   o._attributes       = null;
   o._parameters       = null;
   o._samplers         = null;
   o._vertexShader     = null;
   o._fragmentShader   = null;
   o.hasAttribute      = FG3dProgram_hasAttribute;
   o.registerAttribute = FG3dProgram_registerAttribute;
   o.findAttribute     = FG3dProgram_findAttribute;
   o.attributes        = FG3dProgram_attributes;
   o.hasParameter      = FG3dProgram_hasParameter;
   o.registerParameter = FG3dProgram_registerParameter;
   o.findParameter     = FG3dProgram_findParameter;
   o.parameters        = FG3dProgram_parameters;
   o.hasSampler        = FG3dProgram_hasSampler;
   o.registerSampler   = FG3dProgram_registerSampler;
   o.findSampler       = FG3dProgram_findSampler;
   o.samplers          = FG3dProgram_samplers;
   o.vertexShader      = RMethod.virtual(o, 'vertexShader');
   o.fragmentShader    = RMethod.virtual(o, 'fragmentShader');
   o.setAttribute      = FG3dProgram_setAttribute;
   o.setParameter      = FG3dProgram_setParameter;
   o.setParameter4     = FG3dProgram_setParameter4;
   o.setSampler        = FG3dProgram_setSampler;
   o.upload            = RMethod.virtual(o, 'upload');
   return o;
}
function FG3dProgram_hasAttribute(){
   var o = this;
   var r = o._attributes;
   return r ? !r.isEmpty() : false;
}
function FG3dProgram_registerAttribute(n){
   var o = this;
   var r = RClass.create(FG3dProgramAttribute);
   r._name = n;
   o.attributes().set(n, r);
   return r;
}
function FG3dProgram_findAttribute(n){
   return this._attributes ? this._attributes.get(n) : null;
}
function FG3dProgram_attributes(){
   var o = this;
   var r = o._attributes;
   if(r == null){
      r = o._attributes = new TDictionary();
   }
   return r;
}
function FG3dProgram_hasParameter(){
   var o = this;
   var r = o._parameters;
   return r ? !r.isEmpty() : false;
}
function FG3dProgram_registerParameter(pn, pf){
   var o = this;
   var r = RClass.create(FG3dProgramParameter);
   r._name = pn;
   r.formatCd = pf;
   o.parameters().set(pn, r);
   return r;
}
function FG3dProgram_findParameter(n){
   return this._parameters ? this._parameters.get(n) : null;
}
function FG3dProgram_parameters(){
   var o = this;
   var r = o._parameters;
   if(r == null){
      r = o._parameters = new TDictionary();
   }
   return r;
}
function FG3dProgram_hasSampler(){
   var o = this;
   var r = o._samplers;
   return r ? !r.isEmpty() : false;
}
function FG3dProgram_registerSampler(pn){
   var o = this;
   var r = RClass.create(FG3dProgramSampler);
   r._name = pn;
   o.samplers().set(pn, r);
   return r;
}
function FG3dProgram_findSampler(n){
   return this._samplers ? this._samplers.get(n) : null;
}
function FG3dProgram_samplers(){
   var o = this;
   var r = o._samplers;
   if(r == null){
      r = o._samplers = new TDictionary();
   }
   return r;
}
function FG3dProgram_setAttribute(pn, pb, pf){
   var o = this;
   var p = o.findAttribute(pn);
   if(p == null){
      throw new TError(o, 'Bind invalid attribute. (name={1})', pn);
   }
   o._graphicContext.bindVertexBuffer(p._slot, pb, 0, pf);
}
function FG3dProgram_setParameter(pn, pv, pc){
   var o = this;
   var p = o.findParameter(pn);
   if(p == null){
      throw new TError(o, 'Bind invalid parameter. (name={1})', pn);
   }
   var d = null;
   var t = pv.constructor;
   if((t == Float32Array) || (t == SMatrix3d) || (t == SPerspectiveMatrix3d)){
      d = pv;
   }else if(t == SColor4){
      d = RTypeArray.float4();
      d[0] = pv.red;
      d[1] = pv.green;
      d[2] = pv.blue;
      d[3] = pv.alpha;
   }else if((t == SPoint3) || (t == SVector3)){
      d = RTypeArray.float3();
      d[0] = pv.x;
      d[1] = pv.y;
      d[2] = pv.z;
   }else if((t == SPoint4) || (t == SVector4)){
      d = RTypeArray.float4();
      d[0] = pv.x;
      d[1] = pv.y;
      d[2] = pv.z;
      d[3] = pv.w;
   }else{
      throw new TError(o, 'Bind invalid parameter type. (name={1}, type={2})', pn, t);
   }
   o._graphicContext.bindConst(null, p._slot, p._formatCd, d, pc);
}
function FG3dProgram_setParameter4(pn, px, py, pz, pw){
   var v = RTypeArray.float4();
   v[0] = px;
   v[1] = py;
   v[2] = pz;
   v[3] = pw;
   this.setParameter(pn, v, 1);
}
function FG3dProgram_setSampler(pn, pt){
   var o = this;
   var p = o.findSampler(pn);
   if(p == null){
      throw new TError(o, 'Bind invalid sampler. (name={1})', pn);
   }
   o._graphicContext.bindTexture(p._slot, p._index, pt);
}
function FG3dProgramAttribute(o){
   o = RClass.inherits(this, o, FObject);
   o._name       = null;
   o._linker     = null;
   o._statusUsed = false;
   o._slot       = -1;
   o._index      = -1;
   o._formatCd   = EG3dAttributeFormat.Unknown;
   o.name        = FG3dProgramAttribute_name;
   o.linker      = FG3dProgramAttribute_linker;
   o.loadConfig  = FG3dProgramAttribute_loadConfig;
   return o;
}
function FG3dProgramAttribute_name(){
   return this._name;
}
function FG3dProgramAttribute_linker(){
   return this._linker;
}
function FG3dProgramAttribute_loadConfig(p){
   var o = this;
   o._name = p.get('name');
   o._linker = p.get('linker');
   o._formatCd = REnum.encode(EG3dAttributeFormat, p.get('format'));
}
function FG3dProgramParameter(o){
   o = RClass.inherits(this, o, FObject);
   o._name       = null;
   o._linker     = null;
   o._statusUsed = false;
   o._shaderCd   = -1;
   o._formatCd   = EG3dParameterFormat.Unknown;
   o._slot       = -1;
   o._size       = 0;
   o._buffer     = null;
   o.name        = FG3dProgramParameter_name;
   o.linker      = FG3dProgramParameter_linker;
   o.loadConfig  = FG3dProgramParameter_loadConfig;
   return o;
}
function FG3dProgramParameter_name(){
   return this._name;
}
function FG3dProgramParameter_linker(){
   return this._linker;
}
function FG3dProgramParameter_loadConfig(p){
   var o = this;
   o._name = p.get('name');
   o._linker = p.get('linker');
   o._formatCd = REnum.encode(EG3dParameterFormat, p.get('format'));
}
function FG3dProgramSampler(o){
   o = RClass.inherits(this, o, FObject);
   o._name       = null;
   o._linker     = null;
   o._statusUsed = false;
   o._formatCd   = EG3dTexture.Flat2d;
   o._bind       = true;
   o._slot       = -1;
   o._index      = 0;
   o._source     = null;
   o.name        = FG3dProgramSampler_name;
   o.linker      = FG3dProgramSampler_linker;
   o.formatCd    = FG3dProgramSampler_formatCd;
   o.loadConfig  = FG3dProgramSampler_loadConfig;
   return o;
}
function FG3dProgramSampler_name(){
   return this._name;
}
function FG3dProgramSampler_linker(){
   return this._linker;
}
function FG3dProgramSampler_formatCd(){
   return this._formatCd;
}
function FG3dProgramSampler_loadConfig(p){
   var o = this;
   o._name = p.get('name');
   o._linker = p.get('linker');
   o._bind = RBoolean.parse(p.get('bind', 'Y'));
   o._formatCd = REnum.encode(EG3dTexture, p.get('format', 'Flat2d'));
}
function FG3dRenderTarget(o){
   o = RClass.inherits(this, o, FG3dObject);
   o._size     = null;
   o._color    = null;
   o._textures = null;
   o.construct = FG3dRenderTarget_construct;
   o.size      = FG3dRenderTarget_size;
   o.color     = FG3dRenderTarget_color;
   o.textures  = FG3dRenderTarget_textures;
   return o;
}
function FG3dRenderTarget_construct(){
   var o = this;
   o.__base.FG3dObject.construct();
   o._size = new SSize2();
   o._color = new SColor4();
   o._color.set(0.0, 0.0, 0.0, 1.0);
}
function FG3dRenderTarget_size(){
   return this._size;
}
function FG3dRenderTarget_color(){
   return this._color;
}
function FG3dRenderTarget_textures(){
   var o = this;
   var r = o._textures;
   if(r == null){
      r = o._textures = new TObjects();
   }
   return r;
}
function FG3dShader(o){
   o = RClass.inherits(this, o, FG3dObject);
   o._source = null;
   o.source  = FG3dShader_source;
   o.upload  = RMethod.virtual(o, 'upload');
   return o;
}
function FG3dShader_source(){
   return this._source;
}
function FG3dTexture(o){
   o = RClass.inherits(this, o, FG3dObject);
   o._textureCd   = EG3dTexture.Unknown;
   o._statusLoad  = false;
   o._filterMinCd = EG3dSamplerFilter.Linear;
   o._filterMagCd = EG3dSamplerFilter.Linear;
   o._wrapS       = EG3dSamplerFilter.Unknown;
   o._wrapT       = EG3dSamplerFilter.Unknown;
   o.textureCd    = FG3dTexture_textureCd;
   o.filterMinCd  = FG3dTexture_filterMinCd;
   o.filterMagCd  = FG3dTexture_filterMagCd;
   o.setFilter    = FG3dTexture_setFilter;
   o.wrapS        = FG3dTexture_wrapS;
   o.wrapT        = FG3dTexture_wrapT;
   o.setWrap      = FG3dTexture_setWrap;
   return o;
}
function FG3dTexture_textureCd(){
   return this._textureCd;
}
function FG3dTexture_filterMinCd(){
   return this._filterMinCd;
}
function FG3dTexture_filterMagCd(){
   return this._filterMagCd;
}
function FG3dTexture_setFilter(pi, pa){
   var o = this;
   o._filterMinCd = pi;
   o._filterMagCd = pa;
}
function FG3dTexture_wrapS(){
   return this._wrapS;
}
function FG3dTexture_wrapT(){
   return this._wrapT;
}
function FG3dTexture_setWrap(ps, pt){
   var o = this;
   o._wrapS = ps;
   o._wrapT = pt;
}
function FG3dVertexBuffer(o){
   o = RClass.inherits(this, o, FG3dObject);
   o._name     = 0;
   o._formatCd = EG3dAttributeFormat.Unknown;
   o.stride    = 0;
   o.count     = 0;
   o.name   = FG3dVertexBuffer_name;
   o.upload = RMethod.virtual(o, 'upload');
   return o;
}
function FG3dVertexBuffer_name(){
   return this._name;
}
function FG3dVertexShader(o){
   o = RClass.inherits(this, o, FG3dShader);
   return o;
}
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
   s.append(pc.techniqueModeCode)
   pt.set("technique.mode", pc.techniqueModeCode);
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
   o.registerMode(EG3dTechniqueMode.Result);
   var pd = o._passControl = RClass.create(FG3dControlPass);
   pd.linkGraphicContext(o);
   pd.setup();
   o._passes.push(pd);
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
   o.registerMode(EG3dTechniqueMode.Ambient);
   o.registerMode(EG3dTechniqueMode.DiffuseLevel);
   o.registerMode(EG3dTechniqueMode.DiffuseColor);
   o.registerMode(EG3dTechniqueMode.SpecularLevel);
   o.registerMode(EG3dTechniqueMode.SpecularColor);
   o.registerMode(EG3dTechniqueMode.Result);
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
   o.registerMode(EG3dTechniqueMode.Result);
   var pd = o._passSelect = RClass.create(FG3dSelectPass);
   pd.linkGraphicContext(o);
   pd.setup();
   o._passes.push(pd);
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
function SWglContextCapability(){
   var o = this;
   SG3dContextCapability.call(o);
   return o;
}
function FWglContext(o){
   o = RClass.inherits(this, o, FG3dContext);
   o._native             = null;
   o._nativeInstance     = null;
   o._nativeLayout       = null;
   o._activeRenderTarget = null;
   o._activeTextureSlot  = 0;
   o._parameters         = null;
   o._extensions         = null;
   o._data9              = null;
   o._data16             = null;
   o.construct           = FWglContext_construct;
   o.linkCanvas          = FWglContext_linkCanvas;
   o.parameters          = FWglContext_parameters;
   o.extensions          = FWglContext_extensions;
   o.createProgram       = FWglContext_createProgram;
   o.createLayout        = FWglContext_createLayout;
   o.createVertexBuffer  = FWglContext_createVertexBuffer;
   o.createIndexBuffer   = FWglContext_createIndexBuffer;
   o.createFlatTexture   = FWglContext_createFlatTexture;
   o.createCubeTexture   = FWglContext_createCubeTexture;
   o.createRenderTarget  = FWglContext_createRenderTarget;
   o.setViewport         = FWglContext_setViewport;
   o.setFillMode         = FWglContext_setFillMode;
   o.setDepthMode        = FWglContext_setDepthMode;
   o.setCullingMode      = FWglContext_setCullingMode;
   o.setBlendFactors     = FWglContext_setBlendFactors;
   o.setScissorRectangle = FWglContext_setScissorRectangle;
   o.setRenderTarget     = FWglContext_setRenderTarget;
   o.setProgram          = FWglContext_setProgram;
   o.bindConst           = FWglContext_bindConst;
   o.bindVertexBuffer    = FWglContext_bindVertexBuffer;
   o.bindTexture         = FWglContext_bindTexture;
   o.clear               = FWglContext_clear;
   o.clearColor          = FWglContext_clearColor;
   o.clearDepth          = FWglContext_clearDepth;
   o.drawTriangles       = FWglContext_drawTriangles;
   o.present             = FWglContext_present;
   o.checkError          = FWglContext_checkError;
   return o;
}
function FWglContext_construct(){
   var o = this;
   o.__base.FG3dContext.construct.call(o);
   o._capability = new SWglContextCapability();
   o._data9 = new Float32Array(9);
   o._data16 = new Float32Array(16);
}
function FWglContext_linkCanvas(h){
   var o = this;
   o.__base.FG3dContext.linkCanvas.call(o, h)
   o._hCanvas = h;
   if(h.getContext){
      var n = h.getContext('webgl', {antialias:true});
      if(n == null){
         n = h.getContext('experimental-webgl', {antialias:true});
      }
      if(n == null){
         throw new TError("Current browser can't support WebGL technique.");
      }
      o._native = n;
   }
   var g = o._native;
   o.setViewport(h.width, h.height);
   o.setDepthMode(true, EG3dDepthMode.LessEqual);
   o.setCullingMode(true, EG3dCullMode.Front);
   var c = o._capability;
   c.vendor = g.getParameter(g.VENDOR);
   c.version = g.getParameter(g.VERSION);
   c.shaderVersion = g.getParameter(g.SHADING_LANGUAGE_VERSION);
   c.attributeCount = g.getParameter(g.MAX_VERTEX_ATTRIBS);
   c.vertexConst = g.getParameter(g.MAX_VERTEX_UNIFORM_VECTORS);
   c.varyingCount = g.getParameter(g.MAX_VARYING_VECTORS);
   c.fragmentConst = g.getParameter(g.MAX_FRAGMENT_UNIFORM_VECTORS);
   c.samplerCount = g.getParameter(g.MAX_VERTEX_TEXTURE_IMAGE_UNITS);
   c.samplerSize = g.getParameter(g.MAX_TEXTURE_SIZE);
   var e = o._nativeInstance = g.getExtension('ANGLE_instanced_arrays');
   if(e){
      c.optionInstance = true;
   }
   var e = o._nativeLayout = g.getExtension('OES_vertex_array_object');
   if(e){
      c.optionLayout = true;
   }
}
function FWglContext_parameters(){
   var o = this;
   var r = o._parameters;
   if(r){
      return r;
   }
   var ns =['ACTIVE_TEXTURE',
      'ALIASED_LINE_WIDTH_RANGE',
      'ALIASED_POINT_SIZE_RANGE',
      'ALPHA_BITS',
      'ARRAY_BUFFER_BINDING',
      'BLEND',
      'BLEND_COLOR',
      'BLEND_DST_ALPHA',
      'BLEND_DST_RGB',
      'BLEND_EQUATION_ALPHA',
      'BLEND_EQUATION_RGB',
      'BLEND_SRC_ALPHA',
      'BLEND_SRC_RGB',
      'BLUE_BITS',
      'COLOR_CLEAR_VALUE',
      'COLOR_WRITEMASK',
      'COMPRESSED_TEXTURE_FORMATS',
      'CULL_FACE',
      'CULL_FACE_MODE',
      'CURRENT_PROGRAM',
      'DEPTH_BITS',
      'DEPTH_CLEAR_VALUE',
      'DEPTH_FUNC',
      'DEPTH_RANGE',
      'DEPTH_TEST',
      'DEPTH_WRITEMASK',
      'DITHER',
      'ELEMENT_ARRAY_BUFFER_BINDING',
      'FRAMEBUFFER_BINDING',
      'FRONT_FACE',
      'GENERATE_MIPMAP_HINT',
      'GREEN_BITS',
      'IMPLEMENTATION_COLOR_READ_FORMAT',
      'IMPLEMENTATION_COLOR_READ_TYPE',
      'LINE_WIDTH',
      'MAX_COMBINED_TEXTURE_IMAGE_UNITS',
      'MAX_CUBE_MAP_TEXTURE_SIZE',
      'MAX_FRAGMENT_UNIFORM_VECTORS',
      'MAX_RENDERBUFFER_SIZE',
      'MAX_TEXTURE_IMAGE_UNITS',
      'MAX_TEXTURE_SIZE',
      'MAX_VARYING_VECTORS',
      'MAX_VERTEX_ATTRIBS',
      'MAX_VERTEX_TEXTURE_IMAGE_UNITS',
      'MAX_VERTEX_UNIFORM_VECTORS',
      'MAX_VIEWPORT_DIMS',
      'PACK_ALIGNMENT',
      'POLYGON_OFFSET_FACTOR',
      'POLYGON_OFFSET_FILL',
      'POLYGON_OFFSET_UNITS',
      'RED_BITS',
      'RENDERBUFFER_BINDING',
      'RENDERER',
      'SAMPLE_BUFFERS',
      'SAMPLE_COVERAGE_INVERT',
      'SAMPLE_COVERAGE_VALUE',
      'SAMPLES',
      'SCISSOR_BOX',
      'SCISSOR_TEST',
      'SHADING_LANGUAGE_VERSION',
      'STENCIL_BACK_FAIL',
      'STENCIL_BACK_FUNC',
      'STENCIL_BACK_PASS_DEPTH_FAIL',
      'STENCIL_BACK_PASS_DEPTH_PASS',
      'STENCIL_BACK_REF',
      'STENCIL_BACK_VALUE_MASK',
      'STENCIL_BACK_WRITEMASK',
      'STENCIL_BITS',
      'STENCIL_CLEAR_VALUE',
      'STENCIL_FAIL',
      'STENCIL_FUNC',
      'STENCIL_PASS_DEPTH_FAIL',
      'STENCIL_PASS_DEPTH_PASS',
      'STENCIL_REF',
      'STENCIL_TEST',
      'STENCIL_VALUE_MASK',
      'STENCIL_WRITEMASK',
      'SUBPIXEL_BITS',
      'TEXTURE_BINDING_2D',
      'TEXTURE_BINDING_CUBE_MAP',
      'UNPACK_ALIGNMENT',
      'UNPACK_COLORSPACE_CONVERSION_WEBGL',
      'UNPACK_FLIP_Y_WEBGL',
      'UNPACK_PREMULTIPLY_ALPHA_WEBGL',
      'VENDOR',
      'VERSION',
      'VIEWPORT'];
   var g = o._native;
   var c = ns.length;
   r = new Object();
   for(var i = 0; i < c; i++){
      var n = ns[i];
      r[n] = g.getParameter(g[n]);
   }
   o._parameters = r;
   return r;
}
function FWglContext_extensions(){
   var o = this;
   var r = o._extensions;
   if(r){
      return r;
   }
   var ns =[
      'ANGLE_instanced_arrays',
      'EXT_blend_minmax',
      'EXT_color_buffer_float',
      'EXT_color_buffer_half_float',
      'EXT_disjoint_timer_query',
      'EXT_frag_depth',
      'EXT_sRGB',
      'EXT_shader_texture_lod',
      'EXT_texture_filter_anisotropic',
      'OES_element_index_uint',
      'OES_standard_derivatives',
      'OES_texture_float',
      'OES_texture_float_linear',
      'OES_texture_half_float',
      'OES_texture_half_float_linear',
      'OES_vertex_array_object',
      'WEBGL_color_buffer_float',
      'WEBGL_compressed_texture_atc',
      'WEBGL_compressed_texture_es3',
      'WEBGL_compressed_texture_etc1',
      'WEBGL_compressed_texture_pvrtc',
      'WEBGL_compressed_texture_s3tc',
      'WEBGL_debug_renderer_info',
      'WEBGL_debug_shader_precision',
      'WEBGL_debug_shaders',
      'WEBGL_depth_texture',
      'WEBGL_draw_buffers',
      'WEBGL_draw_elements_no_range_check',
      'WEBGL_dynamic_texture',
      'WEBGL_lose_context',
      'WEBGL_security_sensitive_resources',
      'WEBGL_shared_resources',
      'WEBGL_subscribe_uniform',
      'WEBGL_texture_from_depth_video'];
   var g = o._native;
   var c = ns.length;
   r = new Object();
   for(var i = 0; i < c; i++){
      var n = ns[i];
      r[n] = g.getExtension(n);
   }
   o._extensions = r;
   return r;
}
function FWglContext_createProgram(){
   var o = this;
   var r = RClass.create(FWglProgram);
   r.linkGraphicContext(o);
   r.setup();
   return r;
}
function FWglContext_createLayout(){
   var o = this;
   if(!o._capability.optionLayout){
      throw new TError(o, 'Unsupport layout.');
   }
   var r = RClass.create(FWglLayout);
   r.linkGraphicContext(o);
   r.setup();
   return r;
}
function FWglContext_createVertexBuffer(){
   var o = this;
   var r = RClass.create(FWglVertexBuffer);
   r.linkGraphicContext(o);
   r.setup();
   return r;
}
function FWglContext_createIndexBuffer(){
   var o = this;
   var r = RClass.create(FWglIndexBuffer);
   r.linkGraphicContext(o);
   r.setup();
   return r;
}
function FWglContext_createFlatTexture(){
   var o = this;
   var r = RClass.create(FWglFlatTexture);
   r.linkGraphicContext(o);
   r.setup();
   return r;
}
function FWglContext_createCubeTexture(){
   var o = this;
   var r = RClass.create(FWglCubeTexture);
   r.linkGraphicContext(o);
   r.setup();
   return r;
}
function FWglContext_createRenderTarget(){
   var o = this;
   var r = RClass.create(FWglRenderTarget);
   r.linkGraphicContext(o);
   r.setup();
   return r;
}
function FWglContext_setViewport(l, t, w, h){
   var o = this;
   o._size.set(w, h);
   o._native.viewport(l, t, w, h);
}
function FWglContext_setFillMode(p){
   var o = this;
   var g = o._native;
   if(o._fillModeCd == p){
      return;
   }
   switch(p){
      case EG3dFillMode.Point:
         g.polygonMode(g.FRONT_AND_BACK, g.POINT);
         break;
      case EG3dFillMode.Line:
         g.polygonMode(g.FRONT_AND_BACK, g.LINE);
         break;
      case EG3dFillMode.Face:
         g.polygonMode(g.FRONT, g.FILL);
         break;
      default:
         throw new TError('Invalid parameter. (fill_mode={1})', p);
   }
   o._fillModeCd = p;
   return true;
}
function FWglContext_setDepthMode(f, v){
   var o = this;
   var g = o._native;
   if((o._optionDepth == f) && (o._depthModeCd == v)){
      return true;
   }
   if(o._optionDepth != f){
      if(f){
         g.enable(g.DEPTH_TEST);
      }else{
         g.disable(g.DEPTH_TEST);
      }
      o._optionDepth = f;
   }
   if(f && (o._depthModeCd != v)){
      var r = RWglUtility.convertDepthMode(g, v);
      g.depthFunc(r);
      o._depthModeCd = v;
   }
   return true;
}
function FWglContext_setCullingMode(f, v){
   var o = this;
   var g = o._native;
   if((o._optionCull == f) && (o._optionCull == v)){
      return true;
   }
   if(o._optionCull != f){
      if(f){
         g.enable(g.CULL_FACE);
      }else{
         g.disable(g.CULL_FACE);
      }
      o._optionCull = f;
   }
   if(f && (o._cullModeCd != v)){
      var r = RWglUtility.convertCullMode(g, v);
      g.cullFace(r);
      o._cullModeCd = v;
   }
   return true;
}
function FWglContext_setBlendFactors(f, vs, vt){
   var o = this;
   var g = o._native;
   if((o._statusBlend == f) && (o._blendSourceCd == vs) && (o._blendTargetCd == vt)){
      return true;
   }
   if(o._statusBlend != f){
      if(f){
         g.enable(g.BLEND);
      }else{
         g.disable(g.BLEND);
         o._blendSourceCd = 0;
         o._blendTargetCd = 0;
      }
      o._statusBlend = f;
   }
   if(f && ((o._blendSourceCd != vs) || (o._blendTargetCd != vt))){
      var gs = RWglUtility.convertBlendFactors(g, vs);
      var gt = RWglUtility.convertBlendFactors(g, vt);
      g.blendFunc(gs, gt);
      o._blendSourceCd = vs;
      o._blendTargetCd = vt;
   }
   return true;
}
function FWglContext_setScissorRectangle(l, t, w, h){
   this._native.scissor(l, t, w, h);
}
function FWglContext_setRenderTarget(p){
   var o = this;
   var g = o._native;
   if(o._activeRenderTarget == p){
      return;
   }
   var r = true;
   if(p == null){
      g.bindFramebuffer(g.FRAMEBUFFER, null);
      r = o.checkError("glBindFramebuffer", "Bind frame buffer. (frame_buffer={1})", null);
      if(!r){
         return r;
      }
      g.viewport(0, 0, o._size.width, o._size.height);
   }else{
      g.bindFramebuffer(g.FRAMEBUFFER, p._native);
      result = o.checkError("glBindFramebuffer", "Bind frame buffer. (frame_buffer={1})", p._native);
      if(!r){
         return r;
      }
      var s = p.size();
      g.viewport(0, 0, s.width, s.height);
   }
   o._activeRenderTarget = p;
}
function FWglContext_setProgram(p){
   var o = this;
   var g = o._native;
   if(o._program == p){
      return;
   }
   if(p){
      g.useProgram(p._native);
   }else{
      g.useProgram(null);
   }
   o._program = p;
   var r = o.checkError("useProgram", "Set program failure. (program={1}, program_native={2})", p, p._native);
   return r;
}
function FWglContext_bindConst(psc, psl, pdf, pdt, pdc){
   var o = this;
   var g = o._native;
   var r = true;
   switch(pdf){
      case EG3dParameterFormat.Float1:{
         g.uniform1fv(psl, pdt);
         r = o.checkError("uniform1fv", "Bind const data failure. (shader_cd={1}, slot={2}, data={3}, count={4})", psc, psl, pdt, pdc);
         break;
      }
      case EG3dParameterFormat.Float2:{
         g.uniform2fv(psl, pdt);
         r = o.checkError("uniform2fv", "Bind const data failure. (shader_cd={1}, slot={2}, data={3}, count={4})", psc, psl, pdt, pdc);
         break;
      }
      case EG3dParameterFormat.Float3:{
         g.uniform3fv(psl, pdt);
         r = o.checkError("uniform3fv", "Bind const data failure. (shader_cd={1}, slot={2}, data={3}, count={4})", psc, psl, pdt, pdc);
         break;
      }
      case EG3dParameterFormat.Float4:{
         g.uniform4fv(psl, pdt);
         r = o.checkError("uniform4fv", "Bind const data failure. (shader_cd={1}, slot={2}, data={3}, count={4})", psc, psl, pdt, pdc);
         break;
      }
      case EG3dParameterFormat.Float3x3:{
         var dt = o._data9;
         dt[ 0] = pdt[ 0];
         dt[ 1] = pdt[ 4];
         dt[ 2] = pdt[ 8];
         dt[ 3] = pdt[ 1];
         dt[ 4] = pdt[ 5];
         dt[ 5] = pdt[ 9];
         dt[ 6] = pdt[ 2];
         dt[ 7] = pdt[ 6];
         dt[ 8] = pdt[10];
         g.uniformMatrix3fv(psl, g.FALSE, dt);
         r = o.checkError("uniformMatrix3fv", "Bind const matrix3x3 failure. (shader_cd={1}, slot={2}, data={3}, count={4})", psc, psl, pdt, pdc);
         break;
      }
      case EG3dParameterFormat.Float4x3:{
         if(length % 48 != 0){
            RLogger.fatal(o, null, "Count is invalid. (count=%d)", pdc);
            return false;
         }
         var count = length / 48;
         g.uniform4fv(psl, g.FALSE, pd);
         r = o.checkError("uniform4fv", "Bind const matrix4x3 failure. (shader_cd={1}, slot={2}, data={3}, count={4})", psc, psl, pdt, pdc);
         break;
      }
      case EG3dParameterFormat.Float4x4:{
         if(pdt.constructor == Float32Array){
            g.uniformMatrix4fv(psl, g.FALSE, pdt);
         }else if(pdt.writeData){
            var d = o._data16;
            pdt.writeData(d, 0);
            g.uniformMatrix4fv(psl, g.FALSE, d);
         }else{
            throw new TError('Unknown data type.');
         }
         r = o.checkError("uniformMatrix4fv", "Bind const matrix4x4 failure. (shader_cd=%d, slot=%d, pData=0x%08X, count=%d)", psc, psl, pdt, pdc);
         break;
      }
   }
   return r;
}
function FWglContext_bindVertexBuffer(s, b, i, f){
   var o = this;
   var g = o._native;
   var r = true;
   var n = null;
   if(b != null){
      n = b._native;
   }
   g.bindBuffer(g.ARRAY_BUFFER, n);
   r = o.checkError("bindBuffer", "Bind buffer. (buffer_id=%d)", n);
   if(!r){
      return r;
   }
   if(b != null){
      g.enableVertexAttribArray(s);
      r = o.checkError("enableVertexAttribArray", "Enable vertex attribute array. (slot=%d)", s);
      if(!r){
         return r;
      }
   }else{
      g.disableVertexAttribArray(s);
      r = o.checkError("disableVertexAttribArray", "Disable vertex attribute array. (slot=%d)", s);
      return r;
   }
   var bs = b.stride;
   switch(f){
      case EG3dAttributeFormat.Float1:
         g.vertexAttribPointer(s, 1, g.FLOAT, false, bs, i);
         break;
      case EG3dAttributeFormat.Float2:
         g.vertexAttribPointer(s, 2, g.FLOAT, false, bs, i);
         break;
      case EG3dAttributeFormat.Float3:
         g.vertexAttribPointer(s, 3, g.FLOAT, false, bs, i);
         break;
      case EG3dAttributeFormat.Float4:
         g.vertexAttribPointer(s, 4, g.FLOAT, false, bs, i);
         break;
      case EG3dAttributeFormat.Byte4:
         g.vertexAttribPointer(s, 4, g.UNSIGNED_BYTE, false, bs, i);
         break;
      case EG3dAttributeFormat.Byte4Normal:
         g.vertexAttribPointer(s, 4, g.UNSIGNED_BYTE, true, bs, i);
         break;
      default:
         RLogger.fatal(o, null, "Unknown vertex format. (format_cd=%d)", formatCd);
         break;
   }
   r = o.checkError("glVertexAttribPointer", "Bind vertex attribute pointer. (slot=%d, format_cd=%d)", s, f);
   return r;
}
function FWglContext_bindTexture(ps, pi, pt){
   var o = this;
   var g = o._native;
   var r = true;
   if(pt == null){
      g.bindTexture(g.TEXTURE_2D, null);
      r = o.checkError("bindTexture", "Bind texture clear failure. (slot=%d)", ps);
      return r;
   }
   if(o._activeTextureSlot != ps){
      g.uniform1i(ps, pi);
      g.activeTexture(g.TEXTURE0 + pi);
      r = o.checkError("activeTexture", "Active texture failure. (slot=%d, index=%d)", ps, pi);
      if(!r){
         return r;
      }
      o._renderTextureActiveSlot = ps;
   }
   var gt = null;
   switch(pt.textureCd()){
      case EG3dTexture.Flat2d:{
         gt = g.TEXTURE_2D;
         g.bindTexture(g.TEXTURE_2D, pt._native);
         r = o.checkError("glBindTexture", "Bind flag texture failure. (texture_id=%d)", pt._native);
         if(!r){
            return r;
         }
         break;
      }
      case EG3dTexture.Cube:{
         gt = g.TEXTURE_CUBE_MAP;
         g.bindTexture(g.TEXTURE_CUBE_MAP, pt._native);
         r = o.checkError("glBindTexture", "Bind cube texture failure. (texture_id=%d)", pt._native);
         if(!r){
            return r;
         }
         break;
      }
      default:{
         RLogger.fatal(o, null, "Unknown texture type.");
         break;
      }
   }
   var fc = RWglUtility.convertSamplerFilter(g, pt.filterMinCd());
   if(fc){
      g.texParameteri(gt, g.TEXTURE_MIN_FILTER, fc);
   }
   var fc = RWglUtility.convertSamplerFilter(g, pt.filterMagCd());
   if(fc){
      g.texParameteri(gt, g.TEXTURE_MAG_FILTER, fc);
   }
   var ws = RWglUtility.convertSamplerFilter(g, pt.wrapS());
   if(ws){
   }
   var wt = RWglUtility.convertSamplerFilter(g, pt.wrapT());
   if(wt){
   }
   return r;
}
function FWglContext_clear(r, g, b, a, d){
   var o = this;
   var c = o._native;
   c.clearColor(r, g, b, a);
   c.clearDepth(d);
   c.clear(c.COLOR_BUFFER_BIT | c.DEPTH_BUFFER_BIT);
}
function FWglContext_clearColor(r, g, b, a){
   var o = this;
   var c = o._native;
   c.clearColor(r, g, b, a);
   c.clear(c.COLOR_BUFFER_BIT);
}
function FWglContext_clearDepth(d){
   var o = this;
   var c = o._native;
   c.clearDepth(d);
   c.clear(c.DEPTH_BUFFER_BIT);
}
function FWglContext_drawTriangles(b, i, c){
   var o = this;
   var g = o._native;
   var r = true;
   if(i == null){
      i = 0;
   }
   if(c == null){
      c = b.count();
   }
   g.bindBuffer(g.ELEMENT_ARRAY_BUFFER, b._native);
   r = o.checkError("bindBuffer", "Bind element array buffer failure. (index=0x%08X, offset=%d, count=%d, buffer_id)", b, i, c, b._native);
   if(!r){
       return r;
   }
   var strideCd = RWglUtility.convertIndexStride(g, b.strideCd());
   if(b._fillMode == EG3dFillMode.Line){
      g.drawElements(g.LINES, c, strideCd, 2 * i);
   }else{
      g.drawElements(g.TRIANGLES, c, strideCd, 2 * i);
   }
   r = o.checkError("drawElements", "Draw triangles failure. (index=0x%08X, offset=%d, count=%d)", b, i, c);
   if(!r){
       return r;
   }
   g.bindBuffer(g.ELEMENT_ARRAY_BUFFER, null);
   r = o.checkError("bindBuffer", "Bind element array buffer failure. (index=0x%08X, offset=%d, count=%d)", b, i, c);
   if(!r){
       return r;
   }
   return r;
}
function FWglContext_present(){
}
function FWglContext_checkError(c, m, p1){
   if(!RRuntime.isDebug()){
      return true;
   }
   var o = this;
   var g = o._native;
   var r = false;
   var e = null;
   var es = null;
   while(true){
      e = g.getError();
      if(e == g.NO_ERROR){
         r = true;
         break;
      }
      switch(e){
         case g.INVALID_OPERATION:
            es = "Invalid operation.";
            break;
         case g.INVALID_ENUM:
            es = "Invalid enum.";
            break;
         case g.INVALID_VALUE:
            es = "Invalid value.";
            break;
         case g.INVALID_FRAMEBUFFER_OPERATION:
            es = "Invalid paramebuffer opeartion.";
            break;
         case g.OUT_OF_MEMORY:
            es = "Out of memory.";
            break;
         default:
            es = "Unknown";
            break;
      }
   }
   if(!r){
      RLogger.fatal(o, null, 'OpenGL check failure. (code={1}, description={2})', e, es);
   }
   return r;
}
function FWglCubeTexture(o){
   o = RClass.inherits(this, o, FG3dCubeTexture);
   o._native    = null;
   o.setup      = FWglCubeTexture_setup;
   o.makeMipmap = FWglCubeTexture_makeMipmap;
   o.upload     = FWglCubeTexture_upload;
   return o;
}
function FWglCubeTexture_setup(){
   var o = this;
   var g = o._graphicContext._native;
   o.__base.FG3dCubeTexture.setup.call(o);
   o._native = g.createTexture();
}
function FWglCubeTexture_makeMipmap(){
   var o = this;
   var c = o._graphicContext;
   var g = c._native;
   g.bindTexture(g.TEXTURE_CUBE_MAP, o._native);
   g.generateMipmap(g.TEXTURE_CUBE_MAP);
}
function FWglCubeTexture_upload(x1, x2, y1, y2, z1, z2){
   var o = this;
   var c = o._graphicContext;
   var g = c._native;
   g.bindTexture(g.TEXTURE_CUBE_MAP, o._native);
   g.texImage2D(g.TEXTURE_CUBE_MAP_POSITIVE_X, 0, g.RGB, g.RGB, g.UNSIGNED_BYTE, x1.image());
   g.texImage2D(g.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, g.RGB, g.RGB, g.UNSIGNED_BYTE, x2.image());
   g.texImage2D(g.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, g.RGB, g.RGB, g.UNSIGNED_BYTE, y1.image());
   g.texImage2D(g.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, g.RGB, g.RGB, g.UNSIGNED_BYTE, y2.image());
   g.texImage2D(g.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, g.RGB, g.RGB, g.UNSIGNED_BYTE, z1.image());
   g.texImage2D(g.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, g.RGB, g.RGB, g.UNSIGNED_BYTE, z2.image());
   o._statusLoad = c.checkError("texImage2D", "Upload cube image failure.");
}
function FWglFlatTexture(o){
   o = RClass.inherits(this, o, FG3dFlatTexture);
   o._native    = null;
   o.setup      = FWglFlatTexture_setup;
   o.makeMipmap = FWglFlatTexture_makeMipmap;
   o.uploadData = FWglFlatTexture_uploadData;
   o.upload     = FWglFlatTexture_upload;
   return o;
}
function FWglFlatTexture_setup(){
   var o = this;
   var g = o._graphicContext._native;
   o.__base.FG3dFlatTexture.setup.call(o);
   o._native = g.createTexture();
}
function FWglFlatTexture_makeMipmap(){
   var o = this;
   var c = o._graphicContext;
   var g = c._native;
   g.bindTexture(g.TEXTURE_2D, o._native);
   g.generateMipmap(g.TEXTURE_2D);
}
function FWglFlatTexture_uploadData(d, w, h){
   var o = this;
   var c = o._graphicContext;
   var g = c._native;
   o.width = w;
   o.height = h;
   g.bindTexture(g.TEXTURE_2D, o._native);
   g.texImage2D(g.TEXTURE_2D, 0, g.RGBA, w, h, 0, g.RGBA, g.UNSIGNED_BYTE, d);
   o._statusLoad = c.checkError("texImage2D", "Upload data failure.");
}
function FWglFlatTexture_upload(p){
   var o = this;
   var c = o._graphicContext;
   var g = c._native;
   var m = null;
   if(p.constructor == Image){
      m = p;
   }else if(RClass.isClass(p, FImage)){
      m = p.image();
   }else{
      throw new TError('Invalid image format.');
   }
   g.bindTexture(g.TEXTURE_2D, o._native);
   g.texImage2D(g.TEXTURE_2D, 0, g.RGBA, g.RGBA, g.UNSIGNED_BYTE, m);
   o._statusLoad = c.checkError("texImage2D", "Upload image failure.");
}
function FWglFragmentShader(o){
   o = RClass.inherits(this, o, FG3dFragmentShader);
   o._native = null;
   o.setup   = FWglFragmentShader_setup;
   o.upload  = FWglFragmentShader_upload;
   o.dispose = FWglFragmentShader_dispose;
   return o;
}
function FWglFragmentShader_setup(){
   var o = this;
   o.__base.FG3dFragmentShader.setup.call(o);
   var g = o._graphicContext._native;
   o._native = g.createShader(g.FRAGMENT_SHADER);
}
function FWglFragmentShader_upload(v){
   var o = this;
   var g = o._graphicContext._native;
   var n = o._native;
   g.shaderSource(n, v);
   g.compileShader(n);
   var r = g.getShaderParameter(n, g.COMPILE_STATUS);
   if(!r){
      var i = g.getShaderInfoLog(n);
      g.deleteShader(n);
      o._native = null;
      throw new TError(o, 'Upload fragment shader source failure. (error={1})\n{2}', i, v);
   }
   o._source = v;
   return true;
}
function FWglFragmentShader_dispose(){
   var o = this;
   var g = o._graphicContext._native;
   if(o._native){
      g.deleteShader(o._native);
   }
   o._native = null;
   o.__base.FG3dFragmentShader.dispose.call(o);
}
function FWglIndexBuffer(o){
   o = RClass.inherits(this, o, FG3dIndexBuffer);
   o.setup  = FWglIndexBuffer_setup;
   o.upload = FWglIndexBuffer_upload;
   return o;
}
function FWglIndexBuffer_setup(){
   var o = this;
   o.__base.FG3dIndexBuffer.setup.call(o);
   o._native = o._graphicContext._native.createBuffer();
}
function FWglIndexBuffer_upload(pd, pc){
   var o = this;
   var c = o._graphicContext;
   var g = c._native;
   o._count = pc;
   var d = null;
   if((pd.constructor == Array) || (pd.constructor == ArrayBuffer)){
      d = new Uint16Array(pd);
   }else if(pd.constructor == Uint16Array){
      d = pd;
   }else{
      RLogger.fatal(o, null, 'Upload index data type is invalid. (value={1})', pd);
   }
   g.bindBuffer(g.ELEMENT_ARRAY_BUFFER, o._native);
   c.checkError('bindBuffer', 'Bind buffer failure.');
   g.bufferData(g.ELEMENT_ARRAY_BUFFER, d, g.STATIC_DRAW);
   c.checkError('bufferData', 'Upload buffer data. (count={1})', pc);
}
function FWglLayout(o){
   o = RClass.inherits(this, o, FG3dLayout);
   o.setup    = FWglLayout_setup;
   o.bind     = FWglLayout_bind;
   o.unbind   = FWglLayout_unbind;
   o.active   = FWglLayout_active;
   o.deactive = FWglLayout_deactive;
   o.dispose  = FWglLayout_dispose;
   return o;
}
function FWglLayout_setup(){
   var o = this;
   o.__base.FG3dLayout.setup.call(o);
   var c = o._graphicContext;
   o._native = c._nativeLayout.createVertexArrayOES();
}
function FWglLayout_bind(){
   var o = this;
   var c = o._graphicContext;
   c._nativeLayout.bindVertexArrayOES(o._native);
}
function FWglLayout_unbind(){
   var o = this;
   var c = o._graphicContext;
   c._nativeLayout.bindVertexArrayOES(null);
}
function FWglLayout_active(){
   var o = this;
   var c = o._graphicContext;
   c._nativeLayout.bindVertexArrayOES(o._native);
}
function FWglLayout_deactive(){
   var o = this;
   var c = o._graphicContext;
   c._nativeLayout.bindVertexArrayOES(null);
}
function FWglLayout_dispose(){
   var o = this;
   var c = o._graphicContext;
   var n = o._native;
   if(n){
      c._nativeLayout.deleteVertexArrayOES(n);
      o._native = null;
   }
}
function FWglProgram(o){
   o = RClass.inherits(this, o, FG3dProgram);
   o._native        = null;
   o.setup          = FWglProgram_setup;
   o.vertexShader   = FWglProgram_vertexShader;
   o.fragmentShader = FWglProgram_fragmentShader;
   o.upload         = FWglProgram_upload;
   o.build          = FWglProgram_build;
   o.link           = FWglProgram_link;
   o.dispose        = FWglProgram_dispose;
   return o;
}
function FWglProgram_setup(){
   var o = this;
   var c = g = o._graphicContext;
   o._native = c._native.createProgram();
}
function FWglProgram_vertexShader(){
   var o = this;
   var s = o._vertexShader;
   if(!s){
      s = o._vertexShader = RClass.create(FWglVertexShader);
      s.linkGraphicContext(o);
      s.setup();
   }
   return s;
}
function FWglProgram_fragmentShader(){
   var o = this;
   var s = o._fragmentShader;
   if(!s){
      s = o._fragmentShader = RClass.create(FWglFragmentShader);
      s.linkGraphicContext(o);
      s.setup();
   }
   return s;
}
function FWglProgram_upload(t, s){
   var o = this;
   if(t == EG3dShader.Vertex){
      o.vertexShader().upload(s);
   }else if(t == EG3dShader.Fragment){
      o.fragmentShader().upload(s);
   }else{
      throw new Error('Unknown type');
   }
}
function FWglProgram_build(){
   var o = this;
   var c = o._graphicContext;
   var g = c._native;
   var pn = o._native;
   var vs = o.vertexShader();
   g.attachShader(pn, vs._native);
   var r = c.checkError("attachShader", "Attach shader failure. (program_id=%d, shader_id=%d)", pn, vs._native);
   if(!r){
      return r;
   }
   var fs = o.fragmentShader();
   g.attachShader(pn, fs._native);
   var r = c.checkError("attachShader", "Attach shader failure. (program_id=%d, shader_id=%d)", pn, fs._native);
   if(!r){
      return r;
   }
   if(o.hasAttribute()){
      var as = o.attributes();
      var ac = as.count();
      for(var n = 0; n < ac; n++){
         var a = as.value(n);
         var an = a.name();
         g.bindAttribLocation(pn, n, an);
         r = c.checkError("bindAttribLocation", "Bind attribute location. (program_id=%d, slot=%d, name=%s)", pn, n, an);
         if(!r){
            return r;
         }
      }
   }
}
function FWglProgram_link(){
   var o = this;
   var c = o._graphicContext;
   var g = c._native;
   var r = false;
   var pn = o._native;
   g.linkProgram(pn);
   var pr = g.getProgramParameter(pn, g.LINK_STATUS);
   if(!pr){
      var pi = g.getProgramInfoLog(pn);
      RLogger.fatal(this, null, "Link program failure. (status={1}, reason={2})", pr, pi);
      g.deleteProgram(o._native);
      o._native = null;
      return false;
   }
   g.validateProgram(pn);
   var pr = g.getProgramParameter(pn, g.VALIDATE_STATUS);
   if(!pr){
      var pi = g.getProgramInfoLog(pn);
   }
   g.finish();
   r = c.checkError("finish", "Finish program link faliure. (program_id={1})", pn);
   if(!r){
      return r;
   }
   if(o.hasParameter()){
      var pc = o._parameters.count();
      for(var n = 0; n < pc; n++){
         var p = o._parameters.value(n);
         var i = g.getUniformLocation(pn, p.name());
         r = c.checkError("getUniformLocation", "Find parameter slot. (program_id=%d, name=%s, slot=%d)", pn, p.name(), i);
         if(!r){
            return r;
         }
         p._slot = i;
         if(i != null){
            p._statusUsed = true;
         }
      }
   }
   if(o.hasAttribute()){
      var pc = o._attributes.count();
      for(var n = 0; n < pc; n++){
         var p = o._attributes.value(n);
         var i = g.getAttribLocation(pn, p.name());
         r = c.checkError("getAttribLocation", "Find attribute slot. (program_id=%d, name=%s, slot=%d)", pn, p.name(), i);
         if(!r){
            return r;
         }
         p._slot = i;
         if(i != -1){
            p._statusUsed = true;
         }
      }
   }
   if(o.hasSampler()){
      var pc = o._samplers.count();
      for(var n = 0; n < pc; n++){
         var p = o._samplers.value(n);
         var i = g.getUniformLocation(pn, p.name());
         r = c.checkError("getUniformLocation", "Find sampler slot. (program_id=%d, name=%s, slot=%d)", pn, p.name(), i);
         if(!r){
            return r;
         }
         p._slot = i;
         if(i != null){
            p._statusUsed = true;
         }
      }
      var si = 0;
      for(var n = 0; n < pc; n++){
         var p = o._samplers.value(n);
         if(p._statusUsed){
            p._index = si++;
         }
      }
   }
   return r;
}
function FWglProgram_dispose(){
   var o = this;
   if(o._program){
      o._graphicContext._native.deleteProgram(o._program);
   }
   o._program = null;
   o.base.FProgram3d.dispose.call(o);
}
function FWglRenderTarget(o){
   o = RClass.inherits(this, o, FG3dRenderTarget);
   o._optionDepth = true;
   o._native      = null;
   o._nativeDepth = null;
   o.setup        = FWglRenderTarget_setup;
   o.build        = FWglRenderTarget_build;
   return o;
}
function FWglRenderTarget_setup(){
   var o = this;
   o.__base.FG3dRenderTarget.setup.call(o);
   var c = o._graphicContext;
   var g = c._native;
   o._native = g.createFramebuffer();
   return c.checkError('createFramebuffer', 'Create frame buffer failure.');
}
function FWglRenderTarget_build(){
   var o = this;
   var c = o._graphicContext;
   var g = c._native;
   g.bindFramebuffer(g.FRAMEBUFFER, o._native);
   var r = c.checkError('bindFramebuffer', 'Bind frame buffer failure.');
   if(!r){
      return r;
   }
   if(o._optionDepth){
      var nd = o._nativeDepth = g.createRenderbuffer();
      var r = c.checkError('createRenderbuffer', 'Create render buffer failure.');
      if(!r){
         return r;
      }
      g.bindRenderbuffer(g.RENDERBUFFER, nd);
      var r = c.checkError('bindRenderbuffer', 'Bind render buffer failure.');
      if(!r){
         return r;
      }
      g.renderbufferStorage(g.RENDERBUFFER, g.DEPTH_COMPONENT16, o._size.width, o._size.height);
      var r = c.checkError('renderbufferStorage', 'Set render buffer storage format failure.');
      if(!r){
         return r;
      }
      g.framebufferRenderbuffer(g.FRAMEBUFFER, g.DEPTH_ATTACHMENT, g.RENDERBUFFER, nd);
      var r = c.checkError('framebufferRenderbuffer', "Set depth buffer to frame buffer failure. (framebuffer=%d, depthbuffer=%d)", o._native, nd);
      if(!r){
         return r;
      }
   }
   var ts = o._textures;
   var tc = ts.count();
   for(var i = 0; i < tc; i++){
      var t = ts.get(i);
      g.bindTexture(g.TEXTURE_2D, t._native);
      g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MAG_FILTER, g.LINEAR);
      g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MIN_FILTER, g.LINEAR);
      g.texImage2D(g.TEXTURE_2D, 0, g.RGBA, o._size.width, o._size.height, 0, g.RGBA, g.UNSIGNED_BYTE, null);
      var r = c.checkError('texImage2D', "Alloc texture storage. (texture_id, size=%dx%d)", t._native, o._size.width, o._size.height);
      if(!r){
         return r;
      }
      g.framebufferTexture2D(g.FRAMEBUFFER, g.COLOR_ATTACHMENT0, g.TEXTURE_2D, t._native, 0);
      var r = c.checkError('framebufferTexture2D', "Set color buffer into frame buffer failure. (framebuffer_id=%d, texture_id=%d)", o._native, t._native);
      if(!r){
         return r;
      }
   }
}
function FWglVertexBuffer(o){
   o = RClass.inherits(this, o, FG3dVertexBuffer);
   o.setup  = FWglVertexBuffer_setup;
   o.upload = FWglVertexBuffer_upload;
   return o;
}
function FWglVertexBuffer_setup(){
   var o = this;
   o.__base.FG3dVertexBuffer.setup.call(o);
   var g = o._graphicContext._native;
   o._native = g.createBuffer();
}
function FWglVertexBuffer_upload(v, s, c){
   var o = this;
   var c = o._graphicContext;
   var g = c._native;
   o.stride = s;
   o.count  = c;
   var d = null;
   if((v.constructor == Array) || (v.constructor == ArrayBuffer)){
      d = new Float32Array(v);
   }else if(v.constructor == Uint8Array){
      d = v;
   }else if(v.constructor == Float32Array){
      d = v;
   }else{
      throw new TError(o, 'Upload vertex data type is invalid. (value={1})', v);
   }
   g.bindBuffer(g.ARRAY_BUFFER, o._native);
   c.checkError('bindBuffer', 'Bindbuffer');
   g.bufferData(g.ARRAY_BUFFER, d, g.STATIC_DRAW);
   c.checkError('bufferData', 'bufferData');
}
function FWglVertexShader(o){
   o = RClass.inherits(this, o, FG3dVertexShader);
   o._native = null;
   o.setup   = FWglVertexShader_setup;
   o.upload  = FWglVertexShader_upload;
   o.dispose = FWglVertexShader_dispose;
   return o;
}
function FWglVertexShader_setup(){
   var o = this;
   o.__base.FG3dVertexShader.setup.call(o);
   var g = o._graphicContext._native;
   o._native = g.createShader(g.VERTEX_SHADER);
}
function FWglVertexShader_upload(v){
   var o = this;
   var g = o._graphicContext._native;
   var n = o._native;
   g.shaderSource(n, v);
   g.compileShader(n);
   var r = g.getShaderParameter(n, g.COMPILE_STATUS);
   if(!r){
      var i = g.getShaderInfoLog(n);
      g.deleteShader(n);
      o._native = null;
      throw new TError(o, 'Upload vertex shader source failure. (error={1})\n{2}', i, v);
   }
   o._source = v;
   return true;
}
function FWglVertexShader_dispose(){
   var o = this;
   var g = o._graphicContext._native;
   if(o._native){
      g.deleteShader(o._native);
   }
   o._native = null;
   o.__base.FG3dVertexShader.dispose.call(o);
}
var RWglUtility = new function RWglUtility(){
   var o = this;
   o.convertFillMode      = RWglUtility_convertFillMode;
   o.convertCullMode      = RWglUtility_convertCullMode;
   o.convertDepthMode     = RWglUtility_convertDepthMode;
   o.convertBlendFactors  = RWglUtility_convertBlendFactors;
   o.convertIndexStride   = RWglUtility_convertIndexStride;
   o.convertSamplerFilter = RWglUtility_convertSamplerFilter;
   return o;
}
function RWglUtility_convertFillMode(g, v){
   switch(v){
      case EG3dFillMode.Point:
         return g.POINT;
      case EG3dFillMode.Line:
         return g.LINE;
      case EG3dFillMode.Face:
         return g.FILL;
   }
   throw new TError(this, "Convert fill mode failure. (fill_cd={1})", v);
}
function RWglUtility_convertCullMode(g, v){
   switch(v){
      case EG3dCullMode.Front:
         return g.FRONT;
      case EG3dCullMode.Back:
         return g.BACK;
      case EG3dCullMode.Both:
         return g.FRONT_AND_BACK;
   }
   throw new TError(this, "Convert cull mode failure. (cull_cd={1})", v);
}
function RWglUtility_convertDepthMode(g, v){
   switch(v){
      case EG3dDepthMode.Equal:
         return g.EQUAL;
      case EG3dDepthMode.NotEqual:
         return g.NOTEQUAL;
      case EG3dDepthMode.Less:
         return g.LESS;
      case EG3dDepthMode.LessEqual:
         return g.LEQUAL;
      case EG3dDepthMode.Greater:
         return g.GREATER;
      case EG3dDepthMode.GreaterEqual:
         return g.GEQUAL;
      case EG3dDepthMode.Always:
         return g.ALWAYS;
   }
   throw new TError(this, "Convert depth mode failure. (depth_cd={1})", v);
}
function RWglUtility_convertBlendFactors(g, v){
   switch(v){
      case EG3dBlendMode.SourceAlpha:
         return g.SRC_ALPHA;
      case EG3dBlendMode.OneMinusSourceAlpha:
         return g.ONE_MINUS_SRC_ALPHA;
      default:
         break;
   }
   throw new TError(this, "Convert blend factors failure. (blend_cd={1})", v);
}
function RWglUtility_convertIndexStride(g, v){
   switch(v){
      case EG3dIndexStride.Uint16:
         return g.UNSIGNED_SHORT;
      case EG3dIndexStride.Uint32:
         return g.UNSIGNED_INT;
   }
   throw new TError(this, "Convert index stride failure. (stride_cd={1})", v);
}
function RWglUtility_convertSamplerFilter(g, v){
   switch(v){
      case EG3dSamplerFilter.Unknown:
         return 0;
      case EG3dSamplerFilter.Nearest:
         return g.NEAREST;
      case EG3dSamplerFilter.Linear:
         return g.LINEAR;
      case EG3dSamplerFilter.Repeat:
         return g.REPEAT;
      case EG3dSamplerFilter.ClampToEdge:
         return g.CLAMP_TO_EDGE;
      case EG3dSamplerFilter.ClampToBorder:
         return g.CLAMP_TO_BORDER;
   }
   throw new TError(this, "Convert sampler filter failure. (filter_cd={1})", v);
}
