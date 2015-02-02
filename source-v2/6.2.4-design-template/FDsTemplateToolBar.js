//==========================================================
// <T>主菜单。</T>
//
// @author maocy
// @history 141231
//==========================================================
function FDsTemplateToolBar(o){
   o = RClass.inherits(this, o, FUiToolBar);
   //..........................................................
   // @attribute
   o._refreshButton = null;
   o._saveButton    = null;
   //..........................................................
   // @event
   o.onBuild        = FDsTemplateToolBar_onBuild;
   // @event
   o.onRefreshClick = FDsTemplateToolBar_onRefreshClick;
   o.onSaveClick    = FDsTemplateToolBar_onSaveClick;
   //..........................................................
   // @method
   o.construct      = FDsTemplateToolBar_construct;
   // @method
   o.dispose        = FDsTemplateToolBar_dispose;
   return o;
}

//==========================================================
// <T>建立当前控件的显示框架。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
function FDsTemplateToolBar_onBuild(p){
   var o = this;
   o.__base.FUiToolBar.onBuild.call(o, p);
   // 建立按键
   var b = o._refreshButton  = RClass.create(FUiToolButton);
   b.setLabel('刷新');
   b.build(p);
   b.lsnsClick.register(o, o.onRefreshClick);
   o.appendButton(b);
   // 建立按键
   var b = o._saveButton = RClass.create(FUiToolButton);
   b.setLabel('保存');
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
function FDsTemplateToolBar_onRefreshClick(p){
   var o = this;
   var catalog = o._worksapce._catalog;
   catalog.loadUrl('/cloud.describe.tree.ws?action=query&code=resource3d.model');
}

//==========================================================
// <T>保存按键处理。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
function FDsTemplateToolBar_onSaveClick(p){
   var o = this;
   var catalog = o._worksapce._catalog;
   catalog.loadUrl('/cloud.describe.tree.ws?action=query&code=resource3d.model');
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsTemplateToolBar_construct(){
   var o = this;
   // 父处理
   o.__base.FUiToolBar.construct.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsTemplateToolBar_dispose(){
   var o = this;
   // 父处理
   o.__base.FUiToolBar.dispose.call(o);
}
