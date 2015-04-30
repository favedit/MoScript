function FDsCommonAnimationPropertyFrame(o){
   o = RClass.inherits(this, o, FUiForm);
   o._visible         = false;
   o._activeSpace     = null;
   o._activeAnimation = null;
   o._controlGuid     = null;
   o._controlCode     = null;
   o._controlLabel    = null;
   o.onBuilded        = FDsCommonAnimationPropertyFrame_onBuilded;
   o.onDataChanged    = FDsCommonAnimationPropertyFrame_onDataChanged;
   o.construct        = FDsCommonAnimationPropertyFrame_construct;
   o.loadObject       = FDsCommonAnimationPropertyFrame_loadObject;
   o.dispose          = FDsCommonAnimationPropertyFrame_dispose;
   return o;
}
function FDsCommonAnimationPropertyFrame_construct(){
   var o = this;
   o.__base.FUiForm.construct.call(o);
}
function FDsCommonAnimationPropertyFrame_onBuilded(p){
   var o = this;
   o.__base.FUiForm.onBuilded.call(o, p);
   o._controlCode.addDataChangedListener(o, o.onDataChanged);
   o._controlLabel.addDataChangedListener(o, o.onDataChanged);
   o._controlPlayRate.addDataChangedListener(o, o.onDataChanged);
}
function FDsCommonAnimationPropertyFrame_onDataChanged(p){
   var o = this;
   var animation = o._activeAnimation;
   var resource = animation.resource();
   resource.setCode(o._controlCode.get());
   resource.setLabel(o._controlLabel.get());
   resource._playRate = o._controlPlayRate.get();
   animation.reloadResource();
}
function FDsCommonAnimationPropertyFrame_loadObject(space, animation){
   var o = this;
   var resource = animation.resource();
   o._activeSpace = space;
   o._activeAnimation = animation;
   o._controlGuid.set(resource.guid());
   o._controlCode.set(resource.code());
   o._controlLabel.set(resource.label());
   o._controlPlayRate.set(resource.playRate());
}
function FDsCommonAnimationPropertyFrame_dispose(){
   var o = this;
   o.__base.FUiForm.dispose.call(o);
}
function FDsCommonCameraFrame(o){
   o = RClass.inherits(this, o, FUiForm);
   o._workspace        = null;
   o._camera           = null;
   o._controlPosition  = null;
   o._controlDirection = null;
   o.construct         = FDsCommonCameraFrame_construct;
   o.loadObject        = FDsCommonCameraFrame_loadObject;
   o.dispose           = FDsCommonCameraFrame_dispose;
   return o;
}
function FDsCommonCameraFrame_construct(){
   var o = this;
   o.__base.FUiForm.construct.call(o);
}
function FDsCommonCameraFrame_loadObject(s, c){
   var o = this;
   var r = c._resource;
   o._camera = c;
   o._controlPosition.set(c.position());
   o._controlDirection.set(c.direction());
}
function FDsCommonCameraFrame_dispose(){
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
function FDsCommonDisplayDialog(o){
   o = RClass.inherits(this, o, FUiDialog);
   o._frameName            = 'resource.common.dialog.DisplayDialog';
   o._displayModeCd        = null;
   o._controlLayerLabel    = null;
   o._controlDisplayLabel  = null;
   o._controlCode          = null;
   o._controlLabel         = null;
   o._controlTemplateCode  = null;
   o._controlConfirmButton = null;
   o._controlCancelButton  = null;
   o.onBuilded             = FDsCommonDisplayDialog_onBuilded;
   o.onConfirmLoad         = FDsCommonDisplayDialog_onConfirmLoad;
   o.onConfirmClick        = FDsCommonDisplayDialog_onConfirmClick;
   o.onCancelClick         = FDsCommonDisplayDialog_onCancelClick;
   o.construct             = FDsCommonDisplayDialog_construct;
   o.setSpace              = FDsCommonDisplayDialog_setSpace;
   o.setDisplayLabel       = FDsCommonDisplayDialog_setDisplayLabel;
   o.setContentCode        = FDsCommonDisplayDialog_setContentCode;
   o.setContentLabel       = FDsCommonDisplayDialog_setContentLabel;
   o.dispose               = FDsCommonDisplayDialog_dispose;
   return o;
}
function FDsCommonDisplayDialog_onBuilded(p){
   var o = this;
   o.__base.FUiDialog.onBuilded.call(o, p);
   o._controlSpaceGuid.setEditAble(false);
   o._controlSpaceLabel.setEditAble(false);
   o._controlConfirm.addClickListener(o, o.onConfirmClick);
   o._controlCancel.addClickListener(o, o.onCancelClick);
}
function FDsCommonDisplayDialog_onConfirmLoad(event){
   var o = this;
   RConsole.find(FUiDesktopConsole).hide();
   o.hide();
}
function FDsCommonDisplayDialog_onConfirmClick(event){
   var o = this;
   RConsole.find(FUiDesktopConsole).showUploading();
   var xaction = new TXmlNode('Action');
   var xsprite = xaction.create('Display');
   xsprite.set('space_guid', o._spaceGuid);
   xsprite.set('code', o._controlCode.get());
   xsprite.set('label', o._controlLabel.get());
   xsprite.set('model_guid', o._controlModelGuid.get());
   xsprite.set('model_code', o._controlModelCode.get());
   var connection = RConsole.find(FDrTemplateConsole).createDisplay(xaction);
   connection.addLoadListener(o, o.onConfirmLoad);
}
function FDsCommonDisplayDialog_onCancelClick(event){
   this.hide();
}
function FDsCommonDisplayDialog_construct(){
   var o = this;
   o.__base.FUiDialog.construct.call(o);
}
function FDsCommonDisplayDialog_setSpace(space){
   var o = this;
   var resource = space.resource();
   o._controlSpaceGuid.set(resource.guid());
   o._controlSpaceLabel.set(resource.makeLabel());
}
function FDsCommonDisplayDialog_setDisplayLabel(label){
   this._controlDisplayLabel.set(label);
}
function FDsCommonDisplayDialog_setContentCode(label){
   this._controlCode.set(label);
}
function FDsCommonDisplayDialog_setContentLabel(label){
   this._controlLabel.set(label);
}
function FDsCommonDisplayDialog_dispose(){
   var o = this;
   o.__base.FUiDialog.dispose.call(o);
}
function FDsCommonDisplayFrame(o){
   o = RClass.inherits(this, o, FUiForm);
   o._activeSpace   = null;
   o._activeDisplay = null;
   o.onBuilded      = FDsCommonDisplayFrame_onBuilded;
   o.onDataChanged  = FDsCommonDisplayFrame_onDataChanged;
   o.construct      = FDsCommonDisplayFrame_construct;
   o.loadObject     = FDsCommonDisplayFrame_loadObject;
   o.dispose        = FDsCommonDisplayFrame_dispose;
   return o;
}
function FDsCommonDisplayFrame_onBuilded(p){
   var o = this;
   o.__base.FUiForm.onBuilded.call(o, p);
   o._controlTranslate.addDataChangedListener(o, o.onDataChanged);
   o._controlRotation.addDataChangedListener(o, o.onDataChanged);
   o._controlScale.addDataChangedListener(o, o.onDataChanged);
}
function FDsCommonDisplayFrame_onDataChanged(p){
   var o = this;
   var display = o._activeDisplay;
   var resource = display.resource();
   var matrix = resource.matrix();
   var value = o._controlTranslate.get();
   matrix.setTranslate(value.x, value.y, value.z);
   var value = o._controlRotation.get();
   matrix.setRotation(value.x, value.y, value.z);
   var value = o._controlScale.get();
   matrix.setScale(value.x, value.y, value.z);
   matrix.update();
   display.matrix().assign(matrix);
}
function FDsCommonDisplayFrame_construct(){
   var o = this;
   o.__base.FUiForm.construct.call(o);
}
function FDsCommonDisplayFrame_loadObject(space, display){
   var o = this;
   var resource = display.resource();
   o._activeSpace = space;
   o._activeDisplay = display;
   var matrix = resource.matrix();
   o._controlTranslate.set(matrix.tx, matrix.ty, matrix.tz);
   o._controlRotation.set(matrix.rx, matrix.ry, matrix.rz);
   o._controlScale.set(matrix.sx, matrix.sy, matrix.sz);
}
function FDsCommonDisplayFrame_dispose(){
   var o = this;
   o.__base.FUiForm.dispose.call(o);
}
function FDsCommonDisplayPropertyFrame(o){
   o = RClass.inherits(this, o, FUiForm);
   o._visible        = false;
   o._workspace      = null;
   o._activeDisplay  = null;
   o._activeResource = null;
   o._controlGuid    = null;
   o._controlCode    = null;
   o._controlLabel   = null;
   o._displayFrame   = null;
   o._materialFrame  = null;
   o.onBuilded       = FDsCommonDisplayPropertyFrame_onBuilded;
   o.onDataChanged   = FDsCommonDisplayPropertyFrame_onDataChanged;
   o.construct       = FDsCommonDisplayPropertyFrame_construct;
   o.loadObject      = FDsCommonDisplayPropertyFrame_loadObject;
   o.dispose         = FDsCommonDisplayPropertyFrame_dispose;
   return o;
}
function FDsCommonDisplayPropertyFrame_onBuilded(p){
   var o = this;
   o.__base.FUiForm.onBuilded.call(o, p);
   o._controlCode.addDataChangedListener(o, o.onDataChanged);
   o._controlLabel.addDataChangedListener(o, o.onDataChanged);
}
function FDsCommonDisplayPropertyFrame_onDataChanged(p){
   var o = this;
   var r = o._activeResource;
   r._code = o._controlCode.get();
   r._label = o._controlLabel.get();
}
function FDsCommonDisplayPropertyFrame_construct(){
   var o = this;
   o.__base.FUiForm.construct.call(o);
}
function FDsCommonDisplayPropertyFrame_loadObject(space, display){
   var o = this;
   var resource = display._resource;
   o._activeSpace = space;
   o._activeDisplay = display;
   o._controlGuid.set(resource.guid());
   o._controlCode.set(resource.code());
   o._controlLabel.set(resource.label());
   o._frameDisplay.loadObject(space, display);
}
function FDsCommonDisplayPropertyFrame_dispose(){
   var o = this;
   o.__base.FUiForm.dispose.call(o);
}
function FDsCommonLayerPropertyFrame(o){
   o = RClass.inherits(this, o, FUiForm);
   o._visible       = false;
   o._workspace     = null;
   o._layer         = null;
   o._layerResource = null;
   o._controlGuid   = null;
   o._controlCode   = null;
   o._controlLabel  = null;
   o.onBuilded      = FDsCommonLayerPropertyFrame_onBuilded;
   o.onDataChanged  = FDsCommonLayerPropertyFrame_onDataChanged;
   o.construct      = FDsCommonLayerPropertyFrame_construct;
   o.loadObject     = FDsCommonLayerPropertyFrame_loadObject;
   o.dispose        = FDsCommonLayerPropertyFrame_dispose;
   return o;
}
function FDsCommonLayerPropertyFrame_construct(){
   var o = this;
   o.__base.FUiForm.construct.call(o);
}
function FDsCommonLayerPropertyFrame_onBuilded(p){
   var o = this;
   o.__base.FUiForm.onBuilded.call(o, p);
   o._controlCode.addDataChangedListener(o, o.onDataChanged);
   o._controlLabel.addDataChangedListener(o, o.onDataChanged);
   o._controlTypeCd.addDataChangedListener(o, o.onDataChanged);
   o._controlTransformCd.addDataChangedListener(o, o.onDataChanged);
}
function FDsCommonLayerPropertyFrame_onDataChanged(p){
   var o = this;
   var r = o._layerResource;
   r.setCode(o._controlCode.get());
   r.setLabel(o._controlLabel.get());
   r.setTypeCd(o._controlTypeCd.get());
   r.setTransformCd(o._controlTransformCd.get());
}
function FDsCommonLayerPropertyFrame_loadObject(s, l){
   var o = this;
   var r = l.resource();
   o._layer = l;
   o._layerResource = r;
   o._controlGuid.set(r.guid());
   o._controlCode.set(r.code());
   o._controlLabel.set(r.label());
   o._controlTypeCd.set(r.typeCd());
   o._controlTransformCd.set(r.transformCd());
}
function FDsCommonLayerPropertyFrame_dispose(){
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
   var space = o._activeSpace;
   var material = o._activeMaterial;
   var materialResource = material.resource();
   var infoResource = materialResource.info();
   infoResource.optionDouble = o._controlOptionDouble.get();
   infoResource.effectCode = o._controlEffectCode.get();
   infoResource.optionAlpha = o._controlOptionAlpha.get();
   infoResource.alphaBase = o._controlAlphaBase.get();
   infoResource.alphaRate = o._controlAlphaRate.get();
   infoResource.colorMin = o._controlColorMin.get();
   infoResource.colorMax = o._controlColorMax.get();
   infoResource.colorRate = o._controlColorRate.get();
   infoResource.colorMerge = o._controlColorMerge.get();
   infoResource.ambientColor.assign(o._controlAmbientColor.get());
   infoResource.diffuseColor.assign(o._controlDiffuseColor.get());
   infoResource.specularColor.assign(o._controlSpecularColor.get());
   infoResource.specularBase = o._controlSpecularBase.get();
   infoResource.specularLevel = o._controlSpecularLevel.get();
   infoResource.reflectColor.assign(o._controlReflectColor.get());
   infoResource.reflectMerge = o._controlReflectMerge.get();
   infoResource.emissiveColor.assign(o._controlEmissiveColor.get());
   material.reloadResource();
}
function FDsCommonMaterial1Frame_construct(){
   var o = this;
   o.__base.FUiForm.construct.call(o);
}
function FDsCommonMaterial1Frame_loadObject(space, material){
   var o = this;
   o._activeSpace = space;
   o._activeMaterial = material;
   var resource = material.resource();
   var infoResource = resource.info();
   o._controlOptionDouble.set(infoResource.optionDouble);
   o._controlEffectCode.set(infoResource.effectCode);
   o._controlOptionAlpha.set(infoResource.optionAlpha);
   o._controlAlphaBase.set(infoResource.alphaBase);
   o._controlAlphaRate.set(infoResource.alphaRate);
   o._controlOptionColor.set(infoResource.optionColor);
   o._controlColorMin.set(infoResource.colorMin);
   o._controlColorMax.set(infoResource.colorMax);
   o._controlColorRate.set(infoResource.colorRate);
   o._controlColorMerge.set(infoResource.colorMerge);
   o._controlOptionAmbient.set(infoResource.optionAmbient);
   o._controlAmbientColor.set(infoResource.ambientColor);
   o._controlOptionDiffuse.set(infoResource.optionDiffuse);
   o._controlDiffuseColor.set(infoResource.diffuseColor);
   o._controlOptionSpecular.set(infoResource.optionSpecular);
   o._controlSpecularColor.set(infoResource.specularColor);
   o._controlSpecularBase.set(infoResource.specularBase);
   o._controlSpecularLevel.set(infoResource.specularLevel);
   o._controlOptionReflect.set(infoResource.optionReflect);
   o._controlReflectColor.set(infoResource.reflectColor);
   o._controlReflectMerge.set(infoResource.reflectMerge);
   o._controlOptionEmissive.set(infoResource.optionEmissive);
   o._controlEmissiveColor.set(infoResource.emissiveColor);
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
function FDsCommonMaterialDialog(o){
   o = RClass.inherits(this, o, FUiDialog);
   o._frameName            = 'resource.common.dialog.MaterialDialog';
   o._displayModeCd        = null;
   o._controlLayerLabel    = null;
   o._controlDisplayLabel  = null;
   o._controlCode          = null;
   o._controlLabel         = null;
   o._controlTemplateCode  = null;
   o._controlConfirmButton = null;
   o._controlCancelButton  = null;
   o.onBuilded             = FDsCommonMaterialDialog_onBuilded;
   o.onConfirmLoad         = FDsCommonMaterialDialog_onConfirmLoad;
   o.onConfirmClick        = FDsCommonMaterialDialog_onConfirmClick;
   o.onCancelClick         = FDsCommonMaterialDialog_onCancelClick;
   o.construct             = FDsCommonMaterialDialog_construct;
   o.setSpace              = FDsCommonMaterialDialog_setSpace;
   o.setDisplayLabel       = FDsCommonMaterialDialog_setDisplayLabel;
   o.setContentCode        = FDsCommonMaterialDialog_setContentCode;
   o.setContentLabel       = FDsCommonMaterialDialog_setContentLabel;
   o.dispose               = FDsCommonMaterialDialog_dispose;
   return o;
}
function FDsCommonMaterialDialog_onBuilded(p){
   var o = this;
   o.__base.FUiDialog.onBuilded.call(o, p);
   o._controlSpaceGuid.setEditAble(false);
   o._controlSpaceLabel.setEditAble(false);
   o._controlConfirm.addClickListener(o, o.onConfirmClick);
   o._controlCancel.addClickListener(o, o.onCancelClick);
}
function FDsCommonMaterialDialog_onConfirmLoad(event){
   var o = this;
   RConsole.find(FUiDesktopConsole).hide();
   o.hide();
}
function FDsCommonMaterialDialog_onConfirmClick(event){
   var o = this;
   RConsole.find(FUiDesktopConsole).showUploading();
   var xaction = new TXmlNode('Action');
   var xsprite = xaction.create('Material');
   xsprite.set('space_guid', o._spaceGuid);
   xsprite.set('code', o._controlCode.get());
   xsprite.set('label', o._controlLabel.get());
   xsprite.set('material_guid', o._controlMaterialGuid.get());
   xsprite.set('material_code', o._controlMaterialCode.get());
   var connection = RConsole.find(FDrTemplateConsole).selectMaterial(xaction);
   connection.addLoadListener(o, o.onConfirmLoad);
}
function FDsCommonMaterialDialog_onCancelClick(event){
   this.hide();
}
function FDsCommonMaterialDialog_construct(){
   var o = this;
   o.__base.FUiDialog.construct.call(o);
}
function FDsCommonMaterialDialog_setSpace(space){
   var o = this;
   var resource = space.resource();
   o._controlSpaceGuid.set(resource.guid());
   o._controlSpaceLabel.set(resource.makeLabel());
}
function FDsCommonMaterialDialog_setDisplayLabel(label){
   this._controlDisplayLabel.set(label);
}
function FDsCommonMaterialDialog_setContentCode(label){
   this._controlCode.set(label);
}
function FDsCommonMaterialDialog_setContentLabel(label){
   this._controlLabel.set(label);
}
function FDsCommonMaterialDialog_dispose(){
   var o = this;
   o.__base.FUiDialog.dispose.call(o);
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
function FDsCommonMaterialReferDialog(o){
   o = RClass.inherits(this, o, FUiDialog);
   o._frameName      = 'resource.common.dialog.MaterialReferDialog';
   o._displayModeCd  = null;
   o._controlGuid    = null;
   o._controlCode    = null;
   o._controlLabel   = null;
   o._controlConfirm = null;
   o._controlCancel  = null;
   o.onBuilded       = FDsCommonMaterialReferDialog_onBuilded;
   o.onConfirmLoad   = FDsCommonMaterialReferDialog_onConfirmLoad;
   o.onConfirmClick  = FDsCommonMaterialReferDialog_onConfirmClick;
   o.onCancelClick   = FDsCommonMaterialReferDialog_onCancelClick;
   o.construct       = FDsCommonMaterialReferDialog_construct;
   o.setContentGuid  = FDsCommonMaterialReferDialog_setContentGuid;
   o.setContentCode  = FDsCommonMaterialReferDialog_setContentCode;
   o.setContentLabel = FDsCommonMaterialReferDialog_setContentLabel;
   o.dispose         = FDsCommonMaterialReferDialog_dispose;
   return o;
}
function FDsCommonMaterialReferDialog_onBuilded(p){
   var o = this;
   o.__base.FUiDialog.onBuilded.call(o, p);
   o._controlConfirm.addClickListener(o, o.onConfirmClick);
   o._controlCancel.addClickListener(o, o.onCancelClick);
}
function FDsCommonMaterialReferDialog_onConfirmLoad(event){
   var o = this;
   RConsole.find(FUiDesktopConsole).hide();
   o.hide();
}
function FDsCommonMaterialReferDialog_onConfirmClick(event){
   var o = this;
   o._materialRefer._guid = o._controlGuid.get();
   o.hide();
}
function FDsCommonMaterialReferDialog_onCancelClick(event){
   this.hide();
}
function FDsCommonMaterialReferDialog_construct(){
   var o = this;
   o.__base.FUiDialog.construct.call(o);
}
function FDsCommonMaterialReferDialog_setContentGuid(guid){
   this._controlGuid.set(guid);
}
function FDsCommonMaterialReferDialog_setContentCode(code){
   this._controlCode.set(code);
}
function FDsCommonMaterialReferDialog_setContentLabel(label){
   this._controlLabel.set(label);
}
function FDsCommonMaterialReferDialog_dispose(){
   var o = this;
   o.__base.FUiDialog.dispose.call(o);
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
   var canvasContent = o._frameSet._canvasContent;
   canvasContent.reloadRegion(region);
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
function FDsCommonRenderableFrame(o){
   o = RClass.inherits(this, o, FUiForm);
   o._activeSpace      = null;
   o._activeRenderable = null;
   o.onBuilded         = FDsCommonRenderableFrame_onBuilded;
   o.onDataChanged     = FDsCommonRenderableFrame_onDataChanged;
   o.onMaterialClick   = FDsCommonRenderableFrame_onMaterialClick;
   o.onEffectClick     = FDsCommonRenderableFrame_onEffectClick;
   o.construct         = FDsCommonRenderableFrame_construct;
   o.loadObject        = FDsCommonRenderableFrame_loadObject;
   o.dispose           = FDsCommonRenderableFrame_dispose;
   return o;
}
function FDsCommonRenderableFrame_onBuilded(p){
   var o = this;
   o.__base.FUiForm.onBuilded.call(o, p);
   o._controlTranslate.addDataChangedListener(o, o.onDataChanged);
   o._controlRotation.addDataChangedListener(o, o.onDataChanged);
   o._controlScale.addDataChangedListener(o, o.onDataChanged);
   o._controlMaterials.addClickListener(o, o.onMaterialClick);
   o._controlEffects.addClickListener(o, o.onEffectClick);
}
function FDsCommonRenderableFrame_onDataChanged(p){
   var o = this;
   var r = o._activeRenderable;
   var m = r.matrix();
   var v = o._controlTranslate.get();
   m.setTranslate(v.x, v.y, v.z);
   var v = o._controlRotation.get();
   m.setRotation(v.x, v.y, v.z);
   var v = o._controlScale.get();
   m.setScale(v.x, v.y, v.z);
   m.update();
}
function FDsCommonRenderableFrame_onMaterialClick(ps, pi){
   var o = this;
   var materialRefer = pi.tag();
   var dialog = RConsole.find(FUiWindowConsole).find(FDsCommonMaterialReferDialog);
   dialog._frame = o;
   dialog._materialRefer = materialRefer;
   dialog.setContentCode('');
   dialog.setContentLabel('');
   dialog.showPosition(EUiPosition.Center);
}
function FDsCommonRenderableFrame_onEffectClick(ps, pi){
   var o = this;
   var e = pi.tag();
   var p = e._program;
   var s = p._vertexShader;
   alert(s._source);
   var s = p._fragmentShader;
   alert(s._source);
}
function FDsCommonRenderableFrame_construct(){
   var o = this;
   o.__base.FUiForm.construct.call(o);
}
function FDsCommonRenderableFrame_loadObject(space, renderable){
   var o = this;
   o._activeSpace = space;
   o._activeRenderable = renderable;
   var resource = renderable.resource();
   var matrix = renderable.matrix();
   o._controlTranslate.set(matrix.tx, matrix.ty, matrix.tz);
   o._controlRotation.set(matrix.rx, matrix.ry, matrix.rz);
   o._controlScale.set(matrix.sx, matrix.sy, matrix.sz);
   if(resource){
      var materialBox = o._controlMaterials;
      materialBox.clear();
      var indexBuffers = renderable.indexBuffers();
      var count = indexBuffers.count();
      for(var i = 0; i < count; i++){
         var materialRefer = resource.syncMaterialRefer(i);
         var item = materialBox.createItem(null, i + ': ' + materialRefer.guid());
         item.setTag(materialRefer);
         materialBox.push(item);
      }
   }
   var effectBox = o._controlEffects;
   effectBox.clear();
   var infos = renderable.infos();
   var count = infos.count();
   for(var i = 0; i < count; i++){
      var effect = infos.at(i).effect;
      if(effect){
         var item = effectBox.createItem(null, effect.code());
         item.setTag(effect);
         effectBox.push(item);
      }
   }
}
function FDsCommonRenderableFrame_dispose(){
   var o = this;
   o.__base.FUiForm.dispose.call(o);
}
function FDsCommonRenderablePropertyFrame(o){
   o = RClass.inherits(this, o, FUiForm);
   o._visible          = false;
   o._workspace        = null;
   o._activeRenderable = null;
   o._activeMaterial   = null;
   o._controlGuid      = null;
   o._controlCode      = null;
   o._controlLabel     = null;
   o._frameRenderable  = null;
   o._frameMaterial1   = null;
   o._frameMaterial2   = null;
   o.construct         = FDsCommonRenderablePropertyFrame_construct;
   o.loadObject        = FDsCommonRenderablePropertyFrame_loadObject;
   o.dispose           = FDsCommonRenderablePropertyFrame_dispose;
   return o;
}
function FDsCommonRenderablePropertyFrame_construct(){
   var o = this;
   o.__base.FUiForm.construct.call(o);
}
function FDsCommonRenderablePropertyFrame_loadObject(space, renderable){
   var o = this;
   var material = renderable.materialReference();
   var resource = renderable.renderable().resource();
   o._activeRenderable = renderable;
   o._controlGuid.set(resource.guid());
   o._controlCode.set(resource.code());
   o._controlLabel.set(resource.label());
   o._frameRenderable.loadObject(space, renderable);
}
function FDsCommonRenderablePropertyFrame_dispose(){
   var o = this;
   o.__base.FUiForm.dispose.call(o);
}
function FDsCommonSpacePropertyFrame(o){
   o = RClass.inherits(this, o, FUiForm);
   o._visible      = false;
   o._workspace    = null;
   o._activeSpace  = null;
   o._controlGuid  = null;
   o._controlCode  = null;
   o._controlLabel = null;
   o.onBuilded     = FDsCommonSpacePropertyFrame_onBuilded;
   o.onDataChanged = FDsCommonSpacePropertyFrame_onDataChanged;
   o.construct     = FDsCommonSpacePropertyFrame_construct;
   o.loadObject    = FDsCommonSpacePropertyFrame_loadObject;
   o.dispose       = FDsCommonSpacePropertyFrame_dispose;
   return o;
}
function FDsCommonSpacePropertyFrame_onBuilded(p){
   var o = this;
   o.__base.FUiForm.onBuilded.call(o, p);
   o._controlLabel.addDataChangedListener(o, o.onDataChanged);
}
function FDsCommonSpacePropertyFrame_onDataChanged(p){
   var o = this;
   var space = o._activeSpace;
   var resource = space.resource();
   resource.setLabel(o._controlLabel.get());
}
function FDsCommonSpacePropertyFrame_construct(){
   var o = this;
   o.__base.FUiForm.construct.call(o);
}
function FDsCommonSpacePropertyFrame_loadObject(space){
   var o = this;
   var resource = space.resource();
   o._activeSpace = space;
   o._controlGuid.set(resource.guid());
   o._controlCode.set(resource.code());
   o._controlLabel.set(resource.label());
}
function FDsCommonSpacePropertyFrame_dispose(){
   var o = this;
   o.__base.FUiForm.dispose.call(o);
}
function FDsCommonSpriteDialog(o){
   o = RClass.inherits(this, o, FUiDialog);
   o._frameName            = 'resource.common.dialog.SpriteDialog';
   o._displayModeCd        = null;
   o._controlLayerLabel    = null;
   o._controlDisplayLabel  = null;
   o._controlCode          = null;
   o._controlLabel         = null;
   o._controlTemplateCode  = null;
   o._controlConfirmButton = null;
   o._controlCancelButton  = null;
   o.onBuilded             = FDsCommonSpriteDialog_onBuilded;
   o.onConfirmLoad         = FDsCommonSpriteDialog_onConfirmLoad;
   o.onConfirmClick        = FDsCommonSpriteDialog_onConfirmClick;
   o.onCancelClick         = FDsCommonSpriteDialog_onCancelClick;
   o.construct             = FDsCommonSpriteDialog_construct;
   o.setLayerLabel         = FDsCommonSpriteDialog_setLayerLabel;
   o.setDisplayLabel       = FDsCommonSpriteDialog_setDisplayLabel;
   o.setContentCode        = FDsCommonSpriteDialog_setContentCode;
   o.setContentLabel       = FDsCommonSpriteDialog_setContentLabel;
   o.dispose               = FDsCommonSpriteDialog_dispose;
   return o;
}
function FDsCommonSpriteDialog_onBuilded(p){
   var o = this;
   o.__base.FUiDialog.onBuilded.call(o, p);
   o._controlLayerLabel.setEditAble(false);
   o._controlDisplayLabel.setEditAble(false);
   o._controlConfirmButton.addClickListener(o, o.onConfirmClick);
   o._controlCancelButton.addClickListener(o, o.onCancelClick);
}
function FDsCommonSpriteDialog_onConfirmLoad(event){
   var o = this;
   RConsole.find(FUiDesktopConsole).hide();
   o.hide();
   var catalog = o._frameSet._catalogContent;
   if(o._displayModeCd == EUiDataMode.Insert){
      if(o._parentGuid){
         var node = catalog.findByGuid(o._parentGuid);
         catalog.loadNode(node);
      }else{
         catalog.loadService();
      }
   }else{
      var label = o._controlLabel.get();
      var node = catalog.focusNode();
      node.setLabel(label);
   }
}
function FDsCommonSpriteDialog_onConfirmClick(event){
   var o = this;
   RConsole.find(FUiDesktopConsole).showUploading();
   var xaction = new TXmlNode('Action');
   var xsprite = xaction.create('Sprite');
   xsprite.set('space_guid', o._spaceGuid);
   xsprite.set('layer_guid', o._layerGuid);
   xsprite.set('display_guid', o._displayGuid);
   xsprite.set('code', o._controlCode.get());
   xsprite.set('label', o._controlLabel.get());
   xsprite.set('template_code', o._controlTemplateCode.get());
   var console = RConsole.find(FDrSceneConsole);
   var connection = null;
   connection = console.createSprite(xaction);
   connection.addLoadListener(o, o.onConfirmLoad);
}
function FDsCommonSpriteDialog_onCancelClick(event){
   this.hide();
}
function FDsCommonSpriteDialog_construct(){
   var o = this;
   o.__base.FUiDialog.construct.call(o);
}
function FDsCommonSpriteDialog_setLayerLabel(label){
   this._controlLayerLabel.set(label);
}
function FDsCommonSpriteDialog_setDisplayLabel(label){
   this._controlDisplayLabel.set(label);
}
function FDsCommonSpriteDialog_setContentCode(label){
   this._controlCode.set(label);
}
function FDsCommonSpriteDialog_setContentLabel(label){
   this._controlLabel.set(label);
}
function FDsCommonSpriteDialog_dispose(){
   var o = this;
   o.__base.FUiDialog.dispose.call(o);
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
