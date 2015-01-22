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
   o.oeBuild   = FDsMainToolBar_oeBuild;
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
   o._worksapce._catalog.loadUrl('http://localhost:91/cloud.describe.tree.ws?action=query&code=design.persistence');
}

//==========================================================
// <T>建立当前控件的显示框架。</T>
//
// @method
// @param e:event:TEventProcess 事件处理
// @return EEventStatus 处理状态
//==========================================================
function FDsMainToolBar_oeBuild(e){
   var o = this;
   o.__base.FToolBar.oeBuild.call(o, e);
   // 事件前处理
   if(e.isBefore()){
      // 建立按键
      var b = o._persistenceButton  = RClass.create(FToolButton);
      b.setLabel('持久化定义');
      b.process(e);
      b.lsnsClick.register(o, o.onPersistenceClick);
      o.appendButton(b);
      // 建立按键
      var b = o._framesetMain = RClass.create(FToolButton);
      b.setLabel('列表定义');
      b.process(e);
      o.appendButton(b);
      // 建立按键
      var b = o._framesetMain = RClass.create(FToolButton);
      b.setLabel('数据定义');
      b.process(e);
      o.appendButton(b);
      // 建立按键
      var b = o._framesetMain = RClass.create(FToolButton);
      b.setLabel('表单定义');
      b.process(e);
      o.appendButton(b);
   }
   return EEventStatus.Continue;
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
