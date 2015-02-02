//==========================================================
// <T>画板菜单。</T>
//
// @author maocy
// @history 141231
//==========================================================
function FDsTemplateCanvasToolBar(o){
   o = RClass.inherits(this, o, FUiToolBar);
   //..........................................................
   // @attribute
   o._refreshButton = null;
   o._saveButton    = null;
   //..........................................................
   // @event
   o.onBuild        = FDsTemplateCanvasToolBar_onBuild;
   // @event
   o.onRotationClick = FDsTemplateCanvasToolBar_onRotationClick;
   o.onRotationStopClick = FDsTemplateCanvasToolBar_onRotationStopClick;
   o.onSaveClick    = FDsTemplateCanvasToolBar_onSaveClick;
   //..........................................................
   // @method
   o.construct      = FDsTemplateCanvasToolBar_construct;
   // @method
   o.dispose        = FDsTemplateCanvasToolBar_dispose;
   return o;
}

//==========================================================
// <T>建立当前控件的显示框架。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
function FDsTemplateCanvasToolBar_onBuild(p){
   var o = this;
   o.__base.FUiToolBar.onBuild.call(o, p);
   // 建立按键
   var b = o._refreshButton  = RClass.create(FUiToolButton);
   b.setLabel('旋转');
   b.build(p);
   b.lsnsClick.register(o, o.onRotationClick);
   o.appendButton(b);
   // 建立按键
   var b = o._saveButton = RClass.create(FUiToolButton);
   b.setLabel('暂停');
   b.build(p);
   b.lsnsClick.register(o, o.onRotationStopClick);
   o.appendButton(b);
   // 建立按键
   var b = o._saveButton = RClass.create(FUiToolButton);
   b.setLabel('前视角');
   b.build(p);
   b.lsnsClick.register(o, o.onSaveClick);
   o.appendButton(b);
   // 建立按键
   var b = o._saveButton = RClass.create(FUiToolButton);
   b.setLabel('上视角');
   b.build(p);
   b.lsnsClick.register(o, o.onSaveClick);
   o.appendButton(b);
   // 建立按键
   var b = o._saveButton = RClass.create(FUiToolButton);
   b.setLabel('左视角');
   b.build(p);
   b.lsnsClick.register(o, o.onSaveClick);
   o.appendButton(b);
}

//==========================================================
// <T>刷新按键处理。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
function FDsTemplateCanvasToolBar_onRotationClick(p){
   var o = this;
   var c = o._workspace._canvas;
   c._rotationAble = true;
}

//==========================================================
// <T>刷新按键处理。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
function FDsTemplateCanvasToolBar_onRotationStopClick(p){
   var o = this;
   var c = o._workspace._canvas;
   c._rotationAble = false;
}

//==========================================================
// <T>保存按键处理。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
function FDsTemplateCanvasToolBar_onSaveClick(p){
   var o = this;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsTemplateCanvasToolBar_construct(){
   var o = this;
   // 父处理
   o.__base.FUiToolBar.construct.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsTemplateCanvasToolBar_dispose(){
   var o = this;
   // 父处理
   o.__base.FUiToolBar.dispose.call(o);
}
