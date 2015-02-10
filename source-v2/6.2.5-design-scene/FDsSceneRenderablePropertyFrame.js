//==========================================================
// <T>模板显示属性页面。</T>
//
// @class
// @author maocy
// @history 150202
//==========================================================
function FDsSceneRenderablePropertyFrame(o){
   o = RClass.inherits(this, o, FUiForm);
   //..........................................................
   // @attribute
   o._visible        = false;
   // @attribute
   o._workspace      = null;
   // @attribute
   o._renderTemplate = null;
   o._renderDisplay  = null;
   o._renderMaterial = null;
   // @attribute
   o._controlGuid    = null;
   o._controlCode    = null;
   o._controlLabel   = null;
   o._displayFrame   = null;
   o._materialFrame  = null;
   //..........................................................
   // @method
   o.construct       = FDsSceneRenderablePropertyFrame_construct;
   // @method
   o.loadObject      = FDsSceneRenderablePropertyFrame_loadObject;
   // @method
   o.dispose         = FDsSceneRenderablePropertyFrame_dispose;
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
// <T>加载显示信息。</T>
//
// @method
// @param s:scene:FE3dScene 场景
// @param d:display:FRs3Display 显示
//==========================================================
function FDsSceneRenderablePropertyFrame_loadObject(s, d){
   var o = this;
   // 获得材质
   var r = d._renderable._resource;
   //var rdm = rd.materials().first();
   //var rtm = rt.themes().first();
   //var m = rtm.materials().get(rdm.groupGuid());
   // 设置属性
   //o._renderTemplate = t;
   //o._renderDisplay = d;
   //o._renderMaterial = m;
   // 设置参数
   o._controlGuid.set(r.guid());
   o._controlCode.set(r.code());
   o._controlLabel.set(r.label());
   // 设置参数
   o._frameDisplay.loadObject(s, d);
   //o._materialFrame.loadObject(t, m);
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
