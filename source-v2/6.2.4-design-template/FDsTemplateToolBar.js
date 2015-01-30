//==========================================================
// <T>主菜单。</T>
//
// @author maocy
// @history 141231
//==========================================================
function FDsTemplateToolBar(o){
   o = RClass.inherits(this, o, FToolBar);
   //..........................................................
   // @attribute
   //..........................................................
   // @event
   o.onPersistenceClick   = FDsTemplateToolBar_onPersistenceClick;
   //..........................................................
   // @method
   o.onBuild   = FDsTemplateToolBar_onBuild;
   //..........................................................
   // @method
   o.construct = FDsTemplateToolBar_construct;
   // @method
   o.dispose   = FDsTemplateToolBar_dispose;
   return o;
}

//==========================================================
// <T>持久化按键点击处理。</T>
//
// @method
// @param e:event:TEventProcess 事件处理
// @return EEventStatus 处理状态
//==========================================================
function FDsTemplateToolBar_onPersistenceClick(p){
   var o = this;
   var catalog = o._worksapce._catalog;
   catalog.loadUrl('/cloud.describe.tree.ws?action=query&code=resource3d.model');
}

//==========================================================
// <T>建立当前控件的显示框架。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
function FDsTemplateToolBar_onBuild(p){
   var o = this;
   o.__base.FToolBar.onBuild.call(o, p);
   // 建立按键
   var b = o._persistenceButton  = RClass.create(FToolButton);
   b.setLabel('刷新');
   b.build(p);
   b.lsnsClick.register(o, o.onPersistenceClick);
   o.appendButton(b);
   // 建立按键
   var b = o._framesetMain = RClass.create(FToolButton);
   b.setLabel('保存');
   b.build(p);
   o.appendButton(b);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsTemplateToolBar_construct(){
   var o = this;
   o.__base.FToolBar.construct.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsTemplateToolBar_dispose(){
   var o = this;
   // 父处理
   o.__base.FToolBar.dispose.call(o);
}
