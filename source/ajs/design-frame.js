function FDsCommonCameraPropertyFrame(o){
   o = RClass.inherits(this, o, FUiForm);
   o._workspace        = null;
   o._camera           = null;
   o._controlPosition  = null;
   o._controlDirection = null;
   o.construct         = FDsCommonCameraPropertyFrame_construct;
   o.loadObject        = FDsCommonCameraPropertyFrame_loadObject;
   o.dispose           = FDsCommonCameraPropertyFrame_dispose;
   return o;
}
function FDsCommonCameraPropertyFrame_construct(){
   var o = this;
   o.__base.FUiForm.construct.call(o);
}
function FDsCommonCameraPropertyFrame_loadObject(s, c){
   var o = this;
   var r = c._resource;
   o._camera = c;
   o._controlPosition.set(c.position());
   o._controlDirection.set(c.direction());
}
function FDsCommonCameraPropertyFrame_dispose(){
   var o = this;
   o.__base.FUiForm.dispose.call(o);
}
function FDsCommonCameraPropertyFrame(o){
   o = RClass.inherits(this, o, FUiForm);
   o._visible          = false;
   o._workspace        = null;
   o._activeSpace      = null;
   o._activeCamera     = null;
   o._controlGuid      = null;
   o._controlCode      = null;
   o._controlLabel     = null;
   o._controlPosition  = null;
   o._controlDirection = null;
   o.onBuilded         = FDsCommonCameraPropertyFrame_onBuilded;
   o.onDataChanged     = FDsCommonCameraPropertyFrame_onDataChanged;
   o.construct         = FDsCommonCameraPropertyFrame_construct;
   o.loadObject        = FDsCommonCameraPropertyFrame_loadObject;
   o.dispose           = FDsCommonCameraPropertyFrame_dispose;
   return o;
}
function FDsCommonCameraPropertyFrame_onBuilded(p){
   var o = this;
   o.__base.FUiForm.onBuilded.call(o, p);
   o._controlPosition.addDataChangedListener(o, o.onDataChanged);
   o._controlDirection.addDataChangedListener(o, o.onDataChanged);
}
function FDsCommonCameraPropertyFrame_onDataChanged(p){
   var o = this;
   var camera = o._activeCamera;
   var resource = camera.resource();
   resource.position().assign(o._controlPosition.get());
   resource.direction().assign(o._controlDirection.get());
   camera.position().assign(resource.position());
   camera.direction().assign(resource.direction());
   camera.update();
}
function FDsCommonCameraPropertyFrame_construct(){
   var o = this;
   o.__base.FUiForm.construct.call(o);
}
function FDsCommonCameraPropertyFrame_loadObject(space, camera){
   var o = this;
   var resource = camera.resource();
   o._activeSpace = space;
   o._activeCamera = camera;
   o._controlGuid.set(resource.guid());
   o._controlCode.set(resource.code());
   o._controlLabel.set(resource.label());
   o._controlPosition.set(camera.position());
   o._controlDirection.set(camera.direction());
   resource.position().assign(camera.position());
   resource.direction().assign(camera.direction());
}
function FDsCommonCameraPropertyFrame_dispose(){
   var o = this;
   o.__base.FUiForm.dispose.call(o);
}
function FDsCommonLightPropertyFrame(o){
   o = RClass.inherits(this, o, FUiForm);
   o._visible      = false;
   o._workspace    = null;
   o._activeSpace  = null;
   o._activeLight  = null;
   o._controlGuid  = null;
   o._controlCode  = null;
   o._controlLabel = null;
   o.construct     = FDsCommonLightPropertyFrame_construct;
   o.loadObject    = FDsCommonLightPropertyFrame_loadObject;
   o.dispose       = FDsCommonLightPropertyFrame_dispose;
   return o;
}
function FDsCommonLightPropertyFrame_construct(){
   var o = this;
   o.__base.FUiForm.construct.call(o);
}
function FDsCommonLightPropertyFrame_loadObject(space, light){
   var o = this;
   var resource = light.resource();
   o._activeSpace = space;
   o._activeLight = light;
   o._controlGuid.set(resource.guid());
   o._controlCode.set(resource.code());
   o._controlLabel.set(resource.label());
   o._frameCamera.loadObject(space, light.camera());
   o._frameMaterial1.loadObject(space, light.material());
}
function FDsCommonLightPropertyFrame_dispose(){
   var o = this;
   o.__base.FUiForm.dispose.call(o);
}
function FDsCommonMaterial1Frame(o){
   o = RClass.inherits(this, o, FUiForm);
   o._activeSpace                 = null;
   o._activeMaterial              = null;
   o._controlOptionDouble   = null;
   o._controlEffectCode     = null;
   o._controlOptionAlpha    = null;
   o._controlAlphaBase      = null;
   o._controlAlphaRate      = null;
   o._controlOptionColor    = null;
   o._controlColorMin       = null;
   o._controlColorMax       = null;
   o._controlColorRate      = null;
   o._controlColorMerge     = null;
   o._controlOptionAmbient  = null;
   o._controlAmbientColor   = null;
   o._controlOptionDiffuse  = null;
   o._controlDiffuseColor   = null;
   o._controlOptionSpecular = null;
   o._controlSpecularColor  = null;
   o._controlSpecularBase   = null;
   o._controlSpecularLevel  = null;
   o._controlOptionReflect  = null;
   o._controlReflectColor   = null;
   o._controlReflectMerge   = null;
   o._controlOptionEmissive = null;
   o._controlEmissiveColor  = null;
   o.onBuilded              = FDsCommonMaterial1Frame_onBuilded;
   o.onOptionChanged        = FDsCommonMaterial1Frame_onOptionChanged;
   o.onDataChanged          = FDsCommonMaterial1Frame_onDataChanged;
   o.construct              = FDsCommonMaterial1Frame_construct;
   o.loadObject             = FDsCommonMaterial1Frame_loadObject;
   o.dispose                = FDsCommonMaterial1Frame_dispose;
   return o;
}
function FDsCommonMaterial1Frame_onBuilded(p){
   var o = this;
   o.__base.FUiForm.onBuilded.call(o, p);
   o._controlOptionDouble.addDataChangedListener(o, o.onDataChanged);
   o._controlEffectCode.addDataChangedListener(o, o.onDataChanged);
   o._controlOptionAlpha.addDataChangedListener(o, o.onDataChanged);
   o._controlAlphaBase.addDataChangedListener(o, o.onDataChanged);
   o._controlAlphaRate.addDataChangedListener(o, o.onDataChanged);
   o._controlOptionColor.addDataChangedListener(o, o.onOptionChanged);
   o._controlColorMin.addDataChangedListener(o, o.onDataChanged);
   o._controlColorMax.addDataChangedListener(o, o.onDataChanged);
   o._controlColorRate.addDataChangedListener(o, o.onDataChanged);
   o._controlColorMerge.addDataChangedListener(o, o.onDataChanged);
   o._controlOptionAmbient.addDataChangedListener(o, o.onOptionChanged);
   o._controlAmbientColor.addDataChangedListener(o, o.onDataChanged);
   o._controlOptionDiffuse.addDataChangedListener(o, o.onOptionChanged);
   o._controlDiffuseColor.addDataChangedListener(o, o.onDataChanged);
   o._controlOptionSpecular.addDataChangedListener(o, o.onOptionChanged);
   o._controlSpecularColor.addDataChangedListener(o, o.onDataChanged);
   o._controlSpecularBase.addDataChangedListener(o, o.onDataChanged);
   o._controlSpecularLevel.addDataChangedListener(o, o.onDataChanged);
   o._controlOptionReflect.addDataChangedListener(o, o.onOptionChanged);
   o._controlReflectColor.addDataChangedListener(o, o.onDataChanged);
   o._controlReflectMerge.addDataChangedListener(o, o.onDataChanged);
   o._controlOptionEmissive.addDataChangedListener(o, o.onOptionChanged);
   o._controlEmissiveColor.addDataChangedListener(o, o.onDataChanged);
}
function FDsCommonMaterial1Frame_onOptionChanged(p){
   var o = this;
}
function FDsCommonMaterial1Frame_onDataChanged(p){
   var o = this;
   var t = o._activeSpace;
   var m = o._activeMaterial;
   var mr = m.resource();
   var mi = mr.info();
   mi.optionDouble = o._controlOptionDouble.get();
   mi.effectCode = o._controlEffectCode.get();
   mi.optionAlpha = o._controlOptionAlpha.get();
   mi.alphaBase = o._controlAlphaBase.get();
   mi.alphaRate = o._controlAlphaRate.get();
   mi.colorMin = o._controlColorMin.get();
   mi.colorMax = o._controlColorMax.get();
   mi.colorRate = o._controlColorRate.get();
   mi.colorMerge = o._controlColorMerge.get();
   mi.ambientColor.assign(o._controlAmbientColor.get());
   mi.diffuseColor.assign(o._controlDiffuseColor.get());
   mi.specularColor.assign(o._controlSpecularColor.get());
   mi.specularBase = o._controlSpecularBase.get();
   mi.specularLevel = o._controlSpecularLevel.get();
   mi.reflectColor.assign(o._controlReflectColor.get());
   mi.reflectMerge = o._controlReflectMerge.get();
   mi.emissiveColor.assign(o._controlEmissiveColor.get());
   m.reloadResource();
}
function FDsCommonMaterial1Frame_construct(){
   var o = this;
   o.__base.FUiForm.construct.call(o);
}
function FDsCommonMaterial1Frame_loadObject(space, material){
   var o = this;
   o._activeSpace = space;
   o._activeMaterial = material;
   var mr = material.resource();
   var mi = mr.info();
   o._controlOptionDouble.set(mi.optionDouble);
   o._controlEffectCode.set(mi.effectCode);
   o._controlOptionAlpha.set(mi.optionAlpha);
   o._controlAlphaBase.set(mi.alphaBase);
   o._controlAlphaRate.set(mi.alphaRate);
   o._controlOptionColor.set(mi.optionColor);
   o._controlColorMin.set(mi.colorMin);
   o._controlColorMax.set(mi.colorMax);
   o._controlColorRate.set(mi.colorRate);
   o._controlColorMerge.set(mi.colorMerge);
   o._controlOptionAmbient.set(mi.optionAmbient);
   o._controlAmbientColor.set(mi.ambientColor);
   o._controlOptionDiffuse.set(mi.optionDiffuse);
   o._controlDiffuseColor.set(mi.diffuseColor);
   o._controlOptionSpecular.set(mi.optionSpecular);
   o._controlSpecularColor.set(mi.specularColor);
   o._controlSpecularBase.set(mi.specularBase);
   o._controlSpecularLevel.set(mi.specularLevel);
   o._controlOptionReflect.set(mi.optionReflect);
   o._controlReflectColor.set(mi.reflectColor);
   o._controlReflectMerge.set(mi.reflectMerge);
   o._controlOptionEmissive.set(mi.optionEmissive);
   o._controlEmissiveColor.set(mi.emissiveColor);
}
function FDsCommonMaterial1Frame_dispose(){
   var o = this;
   o.__base.FUiForm.dispose.call(o);
}
function FDsCommonMaterial2Frame(o){
   o = RClass.inherits(this, o, FUiForm);
   o._scene                    = null;
   o._material                 = null;
   o._controlDiffuseViewColor  = null;
   o._controlSpecularViewColor = null;
   o._controlSpecularViewBase  = null;
   o._controlSpecularViewLevel = null;
   o.onBuilded                 = FDsCommonMaterial2Frame_onBuilded;
   o.onDataChanged             = FDsCommonMaterial2Frame_onDataChanged;
   o.construct                 = FDsCommonMaterial2Frame_construct;
   o.loadObject                = FDsCommonMaterial2Frame_loadObject;
   o.dispose                   = FDsCommonMaterial2Frame_dispose;
   return o;
}
function FDsCommonMaterial2Frame_onBuilded(p){
   var o = this;
   o.__base.FUiForm.onBuilded.call(o, p);
   o._controlOptionView.addDataChangedListener(o, o.onDataChanged);
   o._controlOptionNormalInvert.addDataChangedListener(o, o.onDataChanged);
   o._controlOptionShadow.addDataChangedListener(o, o.onDataChanged);
   o._controlOptionShadowSelf.addDataChangedListener(o, o.onDataChanged);
   o._controlDiffuseViewColor.addDataChangedListener(o, o.onDataChanged);
   o._controlSpecularViewColor.addDataChangedListener(o, o.onDataChanged);
   o._controlSpecularViewBase.addDataChangedListener(o, o.onDataChanged);
   o._controlSpecularViewLevel.addDataChangedListener(o, o.onDataChanged);
}
function FDsCommonMaterial2Frame_onDataChanged(p){
   var o = this;
   var t = o._scene;
   var m = o._material;
   var mr = m.resource();
   var mi = mr.info();
   mi.optionView = o._controlOptionView.get();
   mi.optionNormalInvert = o._controlOptionNormalInvert.get();
   mi.optionShadow = o._controlOptionShadow.get();
   mi.optionShadowSelf = o._controlOptionShadowSelf.get();
   var v = o._controlDiffuseViewColor.get();
   mi.diffuseViewColor.assign(v);
   var v = o._controlSpecularViewColor.get();
   mi.specularViewColor.assign(v);
   mi.specularViewBase = o._controlSpecularViewBase.get();
   mi.specularViewLevel = o._controlSpecularViewLevel.get();
   m.reloadResource();
}
function FDsCommonMaterial2Frame_construct(){
   var o = this;
   o.__base.FUiForm.construct.call(o);
}
function FDsCommonMaterial2Frame_loadObject(s, m){
   var o = this;
   o._scene = s;
   o._material = m;
   var mr = m.resource();
   var mi = mr.info();
   o._controlOptionView.set(mi.optionView);
   o._controlOptionNormalInvert.set(mi.optionNormalInvert);
   o._controlOptionShadow.set(mi.optionShadow);
   o._controlOptionShadowSelf.set(mi.optionShadowSelf);
   o._controlDiffuseViewColor.set(mi.diffuseViewColor);
   o._controlSpecularViewColor.set(mi.specularViewColor);
   o._controlSpecularViewBase.set(mi.specularViewBase);
   o._controlSpecularViewLevel.set(mi.specularViewLevel);
}
function FDsCommonMaterial2Frame_dispose(){
   var o = this;
   o.__base.FUiForm.dispose.call(o);
}
function FDsCommonMaterialPropertyFrame(o){
   o = RClass.inherits(this, o, FUiForm);
   o._visible        = false;
   o._workspace      = null;
   o._activeMaterial       = null;
   o._controlGuid    = null;
   o._controlCode    = null;
   o._controlLabel   = null;
   o._frameMaterial1 = null;
   o._frameMaterial2 = null;
   o.onBuilded       = FDsCommonMaterialPropertyFrame_onBuilded;
   o.onDataChanged   = FDsCommonMaterialPropertyFrame_onDataChanged;
   o.construct       = FDsCommonMaterialPropertyFrame_construct;
   o.loadObject      = FDsCommonMaterialPropertyFrame_loadObject;
   o.dispose         = FDsCommonMaterialPropertyFrame_dispose;
   return o;
}
function FDsCommonMaterialPropertyFrame_onBuilded(p){
   var o = this;
   o.__base.FUiForm.onBuilded.call(o, p);
   o._controlLabel.addDataChangedListener(o, o.onDataChanged);
}
function FDsCommonMaterialPropertyFrame_onDataChanged(p){
   var o = this;
   var m = o._activeMaterial;
   var mr = m.resource();
   mr.setLabel(o._controlLabel.get());
}
function FDsCommonMaterialPropertyFrame_construct(){
   var o = this;
   o.__base.FUiForm.construct.call(o);
}
function FDsCommonMaterialPropertyFrame_loadObject(space, material){
   var o = this;
   var resource = material.resource();
   o._activeSpace = space;
   o._activeMaterial = material;
   o._controlGuid.set(resource.guid());
   o._controlCode.set(resource.code());
   o._controlLabel.set(resource.label());
   o._frameMaterial1.loadObject(space, material);
   o._frameMaterial2.loadObject(space, material);
}
function FDsCommonMaterialPropertyFrame_dispose(){
   var o = this;
   o.__base.FUiForm.dispose.call(o);
}
function FDsCommonRegionPropertyFrame(o){
   o = RClass.inherits(this, o, FUiForm);
   o._visible                   = false;
   o._workspace                 = null;
   o._activeSpace               = null;
   o._activeRegion              = null;
   o._controlMoveSpeed          = null;
   o._controlRotationKeySpeed   = null;
   o._controlRotationMouseSpeed = null;
   o._controlOptionBackground   = null;
   o._controlBackgroundColor    = null;
   o.onBuilded                  = FDsCommonRegionPropertyFrame_onBuilded;
   o.onDataChanged              = FDsCommonRegionPropertyFrame_onDataChanged;
   o.construct                  = FDsCommonRegionPropertyFrame_construct;
   o.loadObject                 = FDsCommonRegionPropertyFrame_loadObject;
   o.dispose                    = FDsCommonRegionPropertyFrame_dispose;
   return o;
}
function FDsCommonRegionPropertyFrame_onBuilded(p){
   var o = this;
   o.__base.FUiForm.onBuilded.call(o, p);
   o._controlMoveSpeed.addDataChangedListener(o, o.onDataChanged);
   o._controlRotationKeySpeed.addDataChangedListener(o, o.onDataChanged);
   o._controlRotationMouseSpeed.addDataChangedListener(o, o.onDataChanged);
   o._controlOptionBackground.addDataChangedListener(o, o.onDataChanged);
   o._controlBackgroundColor.addDataChangedListener(o, o.onDataChanged);
}
function FDsCommonRegionPropertyFrame_onDataChanged(p){
   var o = this;
   var region = o._activeRegion;
   var resource = region.resource();
   resource.setOptionBackground(o._controlOptionBackground.get());
   resource.backgroundColor().assign(o._controlBackgroundColor.get());
   resource.setMoveSpeed(o._controlMoveSpeed.get());
   resource.setRotationKeySpeed(o._controlRotationKeySpeed.get());
   resource.setRotationMouseSpeed(o._controlRotationMouseSpeed.get());
   region.reloadResource();
   o._workspace._canvas.reloadRegion(region);
}
function FDsCommonRegionPropertyFrame_construct(){
   var o = this;
   o.__base.FUiForm.construct.call(o);
}
function FDsCommonRegionPropertyFrame_loadObject(space, region){
   var o = this;
   var resource = region.resource();
   o._activeSpace = space;
   o._activeRegion = region;
   o._controlMoveSpeed.set(resource.moveSpeed());
   o._controlRotationKeySpeed.set(resource.rotationKeySpeed());
   o._controlRotationMouseSpeed.set(resource.rotationMouseSpeed());
   o._controlOptionBackground.set(resource.optionBackground());
   o._controlBackgroundColor.set(resource.backgroundColor());
}
function FDsCommonRegionPropertyFrame_dispose(){
   var o = this;
   o.__base.FUiForm.dispose.call(o);
}
function FDsCommonTechniquePropertyFrame(o){
   o = RClass.inherits(this, o, FUiForm);
   o._visible              = false;
   o._workspace            = null;
   o._activeSpace          = null;
   o._activeTechnique      = null;
   o._controlTriangleCount = null;
   o._controlDrawCount     = null;
   o._thread               = null;
   o._interval             = 2000;
   o.onBuilded             = FDsCommonTechniquePropertyFrame_onBuilded;
   o.onDataChanged         = FDsCommonTechniquePropertyFrame_onDataChanged;
   o.onModeClick           = FDsCommonTechniquePropertyFrame_onModeClick;
   o.onRefresh             = FDsCommonTechniquePropertyFrame_onRefresh;
   o.construct             = FDsCommonTechniquePropertyFrame_construct;
   o.loadObject            = FDsCommonTechniquePropertyFrame_loadObject;
   o.dispose               = FDsCommonTechniquePropertyFrame_dispose;
   return o;
}
function FDsCommonTechniquePropertyFrame_onBuilded(p){
   var o = this;
   o.__base.FUiForm.onBuilded.call(o, p);
   o._controlRenderModes.addClickListener(o, o.onModeClick);
}
function FDsCommonTechniquePropertyFrame_onDataChanged(p){
   var o = this;
   var r = o._activeTechnique;
   r._code = o._controlCode.get();
   r._label = o._controlLabel.get();
   r._activeTechniqueCode = o._controlTechniqueCode.get();
}
function FDsCommonTechniquePropertyFrame_onModeClick(ps, pi){
   var o = this;
   var m = pi.tag();
   o._activeTechnique._activeMode = m;
   o._activeSpace.dirty();
}
function FDsCommonTechniquePropertyFrame_onRefresh(){
   var o = this;
   if(!o._statusVisible){
      return;
   }
   var s = o._activeSpace;
   var ss = s.statistics();
   var gs = s._graphicContext.statistics();
   o._controlFrameTick.set(ss._frame.toString());
   o._controlProcessTick.set(ss._frameProcess.toString() + ' | ' + ss._frameDrawRenderable.toString());
   o._controlDrawTick.set(ss._frameDraw.toString() + ' | ' + ss._frameDrawSort.toString());
   o._controlClearCount.set(gs._frameClearCount);
   o._controlModeInfo.set(
      'FIL:' + gs._frameFillModeCount +
      ' | DEP:' + gs._frameDepthModeCount +
      ' | CUL:' + gs._frameCullModeCount +
      ' | BLD:' + gs._frameBlendModeCount);
   o._controlProgramCount.set(gs._frameProgramCount);
   o._controlConstInfo.set(gs._frameConstCount + ' : length=' + gs._frameConstLength);
   o._controlBufferCount.set(gs._frameBufferCount);
   o._controlTextureCount.set(gs._frameTextureCount);
   o._controlTargetCount.set(gs._frameTargetCount);
   o._controlDrawInfo.set(gs._frameDrawCount + ' : triangle=' + gs._frameTriangleCount);
   o._controlProgramTotal.set(gs._programTotal);
   o._controlLayoutTotal.set(gs._layoutTotal);
   o._controlBufferInfo.set('Vertex:' + gs._vertexBufferTotal + ' Index:' + gs._indexBufferTotal);
   o._controlTextureInfo.set('Flat:' + gs._flatTextureTotal + ' Cube:' + gs._cubeTextureTotal);
   o._controlTargetTotal.set(gs._targetTotal);
}
function FDsCommonTechniquePropertyFrame_construct(){
   var o = this;
   o.__base.FUiForm.construct.call(o);
   var t = o._thread = RClass.create(FThread);
   t.setInterval(o._interval);
   t.addProcessListener(o, o.onRefresh);
   RConsole.find(FThreadConsole).start(t);
}
function FDsCommonTechniquePropertyFrame_loadObject(space, technique){
   var o = this;
   o._activeSpace = space;
   o._activeTechnique = technique;
   var ctlModes = o._controlRenderModes;
   ctlModes.clear();
   var modes = technique.modes();
   var c = modes.count();
   for(var i = 0; i < c; i++){
      var mode = modes.getAt(i);
      var item = ctlModes.createItem(null, mode.code());
      item.setTag(mode);
      ctlModes.push(item);
   }
   o.onRefresh();
}
function FDsCommonTechniquePropertyFrame_dispose(){
   var o = this;
   o.__base.FUiForm.dispose.call(o);
}
function FDsSpacePropertyFrame(o){
   o = RClass.inherits(this, o, FUiForm);
   o._visible      = false;
   o._workspace    = null;
   o._activeSpace  = null;
   o._controlGuid  = null;
   o._controlCode  = null;
   o._controlLabel = null;
   o.onBuilded     = FDsSpacePropertyFrame_onBuilded;
   o.onDataChanged = FDsSpacePropertyFrame_onDataChanged;
   o.construct     = FDsSpacePropertyFrame_construct;
   o.loadObject    = FDsSpacePropertyFrame_loadObject;
   o.dispose       = FDsSpacePropertyFrame_dispose;
   return o;
}
function FDsSpacePropertyFrame_onBuilded(p){
   var o = this;
   o.__base.FUiForm.onBuilded.call(o, p);
   o._controlLabel.addDataChangedListener(o, o.onDataChanged);
}
function FDsSpacePropertyFrame_onDataChanged(p){
   var o = this;
   var space = o._activeSpace;
   var resource = space.resource();
   resource.setLabel(o._controlLabel.get());
}
function FDsSpacePropertyFrame_construct(){
   var o = this;
   o.__base.FUiForm.construct.call(o);
}
function FDsSpacePropertyFrame_loadObject(space){
   var o = this;
   var resource = space.resource();
   o._activeSpace = space;
   o._controlGuid.set(resource.guid());
   o._controlCode.set(resource.code());
   o._controlLabel.set(resource.label());
}
function FDsSpacePropertyFrame_dispose(){
   var o = this;
   o.__base.FUiForm.dispose.call(o);
}
