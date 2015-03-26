//==========================================================
// <T>模板显示属性页面。</T>
//
// @class
// @author maocy
// @history 150216
//==========================================================
function FDsSceneRenderablePropertyFrame(o){
   o = RClass.inherits(this, o, FUiForm);
   //..........................................................
   // @attribute
   o._visible          = false;
   // @attribute
   o._workspace        = null;
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
   o.construct         = FDsSceneRenderablePropertyFrame_construct;
   // @method
   o.loadObject        = FDsSceneRenderablePropertyFrame_loadObject;
   // @method
   o.dispose           = FDsSceneRenderablePropertyFrame_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsSceneRenderablePropertyFrame_construct(){
   var o = this;
   // 父处理
   o.__base.FUiForm.construct.call(o);
}

//==========================================================
// <T>加载渲染对象信息。</T>
//
// @method
// @param s:scene:FE3dScene 场景
// @param r:renderable:FE3dSceneRenderable 渲染对象
//==========================================================
function FDsSceneRenderablePropertyFrame_loadObject(s, r){
   var o = this;
   // 获得材质
   var m = r.materialReference();
   var s = r.renderable().resource();
   // 设置属性
   o._activeRenderable = r;
   o._activeMaterial = m;
   // 设置参数
   o._controlGuid.set(s.guid());
   o._controlCode.set(s.code());
   o._controlLabel.set(s.label());
   // 设置参数
   o._frameRenderable.loadObject(s, r);
   o._frameMaterial1.loadObject(s, m);
   o._frameMaterial2.loadObject(s, m);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsSceneRenderablePropertyFrame_dispose(){
   var o = this;
   // 父处理
   o.__base.FUiForm.dispose.call(o);
}
