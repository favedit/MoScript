//==========================================================
// <T>模板显示属性页面。</T>
//
// @class
// @author maocy
// @history 150202
//==========================================================
function FDsSceneDisplayPropertyFrame(o){
   o = RClass.inherits(this, o, FUiForm);
   //..........................................................
   // @attribute
   o._visible        = false;
   // @attribute
   o._workspace      = null;
   // @attribute
   o._activeDisplay  = null;
   // @attribute
   o._controlGuid    = null;
   o._controlCode    = null;
   o._controlLabel   = null;
   o._displayFrame   = null;
   o._materialFrame  = null;
   //..........................................................
   // @event
   o.onBuilded       = FDsSceneDisplayPropertyFrame_onBuilded;
   //..........................................................
   // @method
   o.construct       = FDsSceneDisplayPropertyFrame_construct;
   // @method
   o.loadObject      = FDsSceneDisplayPropertyFrame_loadObject;
   // @method
   o.dispose         = FDsSceneDisplayPropertyFrame_dispose;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
function FDsSceneDisplayPropertyFrame_onBuilded(p){
   var o = this;
   o.__base.FUiForm.onBuilded.call(o, p);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsSceneDisplayPropertyFrame_construct(){
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
function FDsSceneDisplayPropertyFrame_loadObject(s, d){
   var o = this;
   // 获得材质
   var sr = s.resource();
   var dr = d.resourceScene();
   //var rdm = rd.materials().first();
   //var rtm = rt.themes().first();
   //var m = rtm.materials().get(rdm.groupGuid());
   // 设置属性
   //o._activeDisplay = t;
   //o._renderDisplay = d;
   //o._renderMaterial = m;
   // 设置参数
   o._controlGuid.set(dr.guid());
   o._controlCode.set(dr.code());
   o._controlLabel.set(dr.label());
   // 设置参数
   o._frameDisplay.loadObject(s, d);
   //o._materialFrame.loadObject(t, m);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsSceneDisplayPropertyFrame_dispose(){
   var o = this;
   // 父处理
   o.__base.FUiForm.dispose.call(o);
}
