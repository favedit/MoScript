//==========================================================
// <T>场景光源属性页面。</T>
//
// @class
// @author maocy
// @history 150210
//==========================================================
function FDsModelLightPropertyFrame(o){
   o = RClass.inherits(this, o, FUiForm);
   //..........................................................
   // @attribute
   o._visible      = false;
   // @attribute
   o._workspace    = null;
   o._activeSpace  = null;
   o._activeLight  = null;
   // @attribute
   o._controlGuid  = null;
   o._controlCode  = null;
   o._controlLabel = null;
   //..........................................................
   // @method
   o.construct     = FDsModelLightPropertyFrame_construct;
   // @method
   o.loadObject    = FDsModelLightPropertyFrame_loadObject;
   // @method
   o.dispose       = FDsModelLightPropertyFrame_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsModelLightPropertyFrame_construct(){
   var o = this;
   // 父处理
   o.__base.FUiForm.construct.call(o);
}

//==========================================================
// <T>加载光源信息。</T>
//
// @method
// @param space:FE3dSpace 空间
// @param light:FE3dLight 光源
//==========================================================
function FDsModelLightPropertyFrame_loadObject(space, light){
   var o = this;
   var resource = light.resource();
   // 设置属性
   o._activeSpace = space;
   o._activeLight = light;
   // 设置参数
   o._controlGuid.set(resource.guid());
   o._controlCode.set(resource.code());
   o._controlLabel.set(resource.label());
   // 设置参数
   o._frameCamera.loadObject(space, light.camera());
   o._frameMaterial1.loadObject(space, light.material());
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsModelLightPropertyFrame_dispose(){
   var o = this;
   // 父处理
   o.__base.FUiForm.dispose.call(o);
}
