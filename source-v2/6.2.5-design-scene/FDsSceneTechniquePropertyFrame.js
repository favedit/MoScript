//==========================================================
// <T>模板属性页面。</T>
//
// @class
// @author maocy
// @history 150202
//==========================================================
function FDsSceneTechniquePropertyFrame(o){
   o = RClass.inherits(this, o, FUiForm);
   //..........................................................
   // @attribute
   o._visible      = false;
   // @attribute
   o._workspace    = null;
   o._technique    = null;
   // @attribute
   o._controlGuid  = null;
   o._controlCode  = null;
   o._controlLabel = null;
   //..........................................................
   // @method
   o.construct     = FDsSceneTechniquePropertyFrame_construct;
   // @method
   o.loadObject    = FDsSceneTechniquePropertyFrame_loadObject;
   // @method
   o.dispose       = FDsSceneTechniquePropertyFrame_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsSceneTechniquePropertyFrame_construct(){
   var o = this;
   // 父处理
   o.__base.FUiForm.construct.call(o);
}

//==========================================================
// <T>加载材质信息。</T>
//
// @method
// @param s:scene:FE3dScene 场景
// @param t:technique:FG3dTechnique 技术
//==========================================================
function FDsSceneTechniquePropertyFrame_loadObject(s, t){
   var o = this;
   var r = t._resource;
   // 设置属性
   o._technique = t;
   // 设置参数
   o._controlCode.set(t.code());
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsSceneTechniquePropertyFrame_dispose(){
   var o = this;
   // 父处理
   o.__base.FUiForm.dispose.call(o);
}
