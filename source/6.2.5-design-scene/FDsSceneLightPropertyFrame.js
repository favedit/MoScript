//==========================================================
// <T>场景光源属性页面。</T>
//
// @class
// @author maocy
// @history 150210
//==========================================================
function FDsSceneLightPropertyFrame(o){
   o = RClass.inherits(this, o, FUiForm);
   //..........................................................
   // @attribute
   o._visible      = false;
   // @attribute
   o._workspace    = null;
   o._light        = null;
   // @attribute
   o._controlGuid  = null;
   o._controlCode  = null;
   o._controlLabel = null;
   //..........................................................
   // @method
   o.construct     = FDsSceneLightPropertyFrame_construct;
   // @method
   o.loadObject    = FDsSceneLightPropertyFrame_loadObject;
   // @method
   o.dispose       = FDsSceneLightPropertyFrame_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsSceneLightPropertyFrame_construct(){
   var o = this;
   // 父处理
   o.__base.FUiForm.construct.call(o);
}

//==========================================================
// <T>加载材质信息。</T>
//
// @method
// @param s:scene:FE3dScene 场景
// @param l:light:FG3dLight 光源
//==========================================================
function FDsSceneLightPropertyFrame_loadObject(s, l){
   var o = this;
   var r = l._resource;
   var rm = r.material();
   var rc = r.camera();
   // 设置属性
   o._light = l;
   // 设置参数
   o._controlGuid.set(r.guid());
   o._controlCode.set(r.code());
   o._controlLabel.set(r._label);
   // 设置参数
   //o._frameMaterial.loadObject(s, rm);
   o._frameCamera.loadObject(s, rc);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsSceneLightPropertyFrame_dispose(){
   var o = this;
   // 父处理
   o.__base.FUiForm.dispose.call(o);
}
