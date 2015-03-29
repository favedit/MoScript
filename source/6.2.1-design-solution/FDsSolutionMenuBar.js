//==========================================================
// <T>主菜单。</T>
//
// @author maocy
// @history 141231
//==========================================================
function FDsSolutionMenuBar(o){
   o = RClass.inherits(this, o, FUiMenuBar);
   //..........................................................
   // @property
   o._frameName     = 'design3d.solution.MenuBar';
   //..........................................................
   // @attribute
   o._refreshButton = null;
   o._saveButton    = null;
   o._runButton     = null;
   //..........................................................
   // @event
   o.onBuilded      = FDsSolutionMenuBar_onBuilded;
   // @event
   o.onCreateClick  = FDsSolutionMenuBar_onCreateClick;
   //..........................................................
   // @method
   o.construct      = FDsSolutionMenuBar_construct;
   // @method
   o.dispose        = FDsSolutionMenuBar_dispose;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
function FDsSolutionMenuBar_onBuilded(p){
   var o = this;
   o.__base.FUiMenuBar.onBuilded.call(o, p);
   //..........................................................
   // 注册事件
   o._controlCreateButton.addClickListener(o, o.onCreateClick);
}

//==========================================================
// <T>保存按键处理。</T>
//
// @method
// @param event:SEvent 事件
//==========================================================
function FDsSolutionMenuBar_onCreateClick(event){
   var o = this;
   var dialog = RConsole.find(FUiWindowConsole).find(FDsSolutionProjectDialog);
   dialog.showPosition(EUiPosition.Center);
   // 存储配置
   var dialog = RClass.create(FDsSolutionProjectDialog);
   dialog.buildDefine(o._hPanel);
   //dialog.setPanel(o._hPanel);
   dialog.setPanel(window.document.body);
   dialog.showPosition(EUiPosition.Center);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsSolutionMenuBar_construct(){
   var o = this;
   // 父处理
   o.__base.FUiMenuBar.construct.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsSolutionMenuBar_dispose(){
   var o = this;
   // 父处理
   o.__base.FUiMenuBar.dispose.call(o);
}
