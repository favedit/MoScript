//==========================================================
// <T>模板显示属性页面。</T>
//
// @class
// @author maocy
// @history 150216
//==========================================================
function FDsMeshRenderablePropertyFrame(o){
   o = RClass.inherits(this, o, FUiForm);
   //..........................................................
   // @attribute
   o._visible          = false;
   // @attribute
   o._workspace        = null;
   // @attribute
   o._activeSpace = null;
   o._activeRenderable   = null;
   // @attribute
   o._controlGuid      = null;
   o._controlCode      = null;
   o._controlLabel     = null;
   o._frameRenderable  = null;
   o._frameMaterial1   = null;
   o._frameMaterial2   = null;
   //..........................................................
   // @method
   o.construct         = FDsMeshRenderablePropertyFrame_construct;
   // @method
   o.loadObject        = FDsMeshRenderablePropertyFrame_loadObject;
   // @method
   o.dispose           = FDsMeshRenderablePropertyFrame_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsMeshRenderablePropertyFrame_construct(){
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
function FDsMeshRenderablePropertyFrame_loadObject(space, renderable){
   var o = this;
   var resource = renderable.resource();
   // 设置属性
   o._activeSpace = space;
   o._activeRenderable = renderable;
   // 设置参数
   o._controlGuid.set(resource.guid());
   o._controlCode.set(resource.code());
   o._controlLabel.set(resource.label());
   // 设置参数
   o._frameRenderable.loadObject(space, renderable);
   //o._frameMaterial1.loadObject(s, m);
   //o._frameMaterial2.loadObject(s, m);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsMeshRenderablePropertyFrame_dispose(){
   var o = this;
   // 父处理
   o.__base.FUiForm.dispose.call(o);
}
