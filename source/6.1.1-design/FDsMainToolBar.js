//==========================================================
// <T>主菜单。</T>
//
// @author maocy
// @history 141231
//==========================================================
function FDsMainToolBar(o){
   o = RClass.inherits(this, o, FToolBar);
   //..........................................................
   // @attribute
   //..........................................................
   // @event
   o.onPersistenceClick   = FDsMainToolBar_onPersistenceClick;
   //..........................................................
   // @method
   o.onBuild   = FDsMainToolBar_onBuild;
   //..........................................................
   // @method
   o.construct = FDsMainToolBar_construct;
   // @method
   o.dispose   = FDsMainToolBar_dispose;
   return o;
}

//==========================================================
// <T>持久化按键点击处理。</T>
//
// @method
// @param e:event:TEventProcess 事件处理
// @return EEventStatus 处理状态
//==========================================================
function FDsMainToolBar_onPersistenceClick(p){
   var o = this;
   var catalog = o._worksapce._catalog;
   //o._worksapce._catalog.loadUrl('http://localhost:91/cloud.describe.tree.ws?action=query&code=design.persistence');
   catalog.loadUrl('http://localhost:92/cloud.content.model.ws?action=list');
}

//==========================================================
// <T>建立当前控件的显示框架。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
function FDsMainToolBar_onBuild(p){
   var o = this;
   o.__base.FToolBar.onBuild.call(o, p);
   // 建立按键
   var b = o._persistenceButton  = RClass.create(FToolButton);
   b.setLabel('模型管理');
   b.build(p);
   b.lsnsClick.register(o, o.onPersistenceClick);
   o.appendButton(b);
   // 建立按键
   var b = o._framesetMain = RClass.create(FToolButton);
   b.setLabel('材质管理');
   b.build(p);
   o.appendButton(b);
   // 建立按键
   var b = o._framesetMain = RClass.create(FToolButton);
   b.setLabel('模板管理');
   b.build(p);
   o.appendButton(b);
   // 建立按键
   var b = o._framesetMain = RClass.create(FToolButton);
   b.setLabel('场景管理');
   b.build(p);
   o.appendButton(b);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsMainToolBar_construct(){
   var o = this;
   o.__base.FToolBar.construct.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsMainToolBar_dispose(){
   var o = this;
   // 父处理
   o.__base.FToolBar.dispose.call(o);
}
