//==========================================================
// <T>模板显示属性页面。</T>
//
// @class
// @author maocy
// @history 150216
//==========================================================
function FDsCommonRenderablePropertyFrame(o){
   o = RClass.inherits(this, o, FUiForm);
   //..........................................................
   // @attribute
   o._visible          = false;
   // @attribute
   o._activeRenderable = null;
   o._activeMaterial   = null;
   // @attribute
   o._controlGuid      = null;
   o._controlCode      = null;
   o._controlLabel     = null;
   o._frameRenderable  = null;
   o._frameMaterial1   = null;
   o._frameMaterial2   = null;
   //..........................................................
   // @method
   o.construct         = FDsCommonRenderablePropertyFrame_construct;
   // @method
   o.loadObject        = FDsCommonRenderablePropertyFrame_loadObject;
   // @method
   o.dispose           = FDsCommonRenderablePropertyFrame_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsCommonRenderablePropertyFrame_construct(){
   var o = this;
   // 父处理
   o.__base.FUiForm.construct.call(o);
}

//==========================================================
// <T>加载渲染对象信息。</T>
//
// @method
// @param space:FE3dSpace 空间
// @param renderable:FE3dRenderable 渲染对象
//==========================================================
function FDsCommonRenderablePropertyFrame_loadObject(space, renderable){
   var o = this;
   // 获得材质
   var material = renderable.material();
   var resource = renderable.renderable().resource();
   // 设置属性
   o._activeRenderable = renderable;
   o._activeMaterial = material;
   // 设置参数
   o._controlGuid.set(resource.guid());
   o._controlCode.set(resource.code());
   o._controlLabel.set(resource.label());
   // 设置参数
   o._frameRenderable.loadObject(space, renderable);
   o._frameMaterial1.loadObject(space, material);
   o._frameMaterial2.loadObject(space, material);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsCommonRenderablePropertyFrame_dispose(){
   var o = this;
   // 父处理
   o.__base.FUiForm.dispose.call(o);
}
