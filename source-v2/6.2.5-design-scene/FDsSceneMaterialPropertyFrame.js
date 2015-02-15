//==========================================================
// <T>场景材质属性页面。</T>
//
// @class
// @author maocy
// @history 150211
//==========================================================
function FDsSceneMaterialPropertyFrame(o){
   o = RClass.inherits(this, o, FUiForm);
   //..........................................................
   // @attribute
   o._visible        = false;
   // @attribute
   o._workspace      = null;
   o._activeMaterial = null;
   // @attribute
   o._controlGuid    = null;
   o._controlCode    = null;
   o._controlLabel   = null;
   o._displayFrame   = null;
   o._materialFrame  = null;
   //..........................................................
   // @method
   o.construct       = FDsSceneMaterialPropertyFrame_construct;
   // @method
   o.loadObject      = FDsSceneMaterialPropertyFrame_loadObject;
   // @method
   o.dispose         = FDsSceneMaterialPropertyFrame_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsSceneMaterialPropertyFrame_construct(){
   var o = this;
   // 父处理
   o.__base.FUiForm.construct.call(o);
}

//==========================================================
// <T>加载显示信息。</T>
//
// @method
// @param s:scene:FE3dScene 场景
// @param m:material:FG3dMaterial 资源
//==========================================================
function FDsSceneMaterialPropertyFrame_loadObject(s, m){
   var o = this;
   var r = m.resource();
   // 设置属性
   o._activeMaterial = m;
   // 设置界面
   o._controlGuid.set(r.guid());
   o._controlCode.set(r.code());
   o._controlLabel.set(r.label());
   // 设置界面
   o._frameMaterial.loadObject(s, m);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsSceneMaterialPropertyFrame_dispose(){
   var o = this;
   // 父处理
   o.__base.FUiForm.dispose.call(o);
}
