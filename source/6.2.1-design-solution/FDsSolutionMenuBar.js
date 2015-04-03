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
   o.onDeleteLoad   = FDsSolutionMenuBar_onDeleteLoad;
   o.onDeleteClick  = FDsSolutionMenuBar_onDeleteClick;
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
   o._controlDeleteButton.addClickListener(o, o.onDeleteClick);
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
   dialog._frameSet = o._frameSet;
   dialog._workspace = o._workspace;
   dialog.showPosition(EUiPosition.Center);
}

//==========================================================
// <T>更新按键点击处理。</T>
//
// @method
// @param event:SClickEvent 点击事件
//==========================================================
function FDsSolutionMenuBar_onDeleteLoad(event){
   var o = this;
   var frame = o._frameSet._listContent;
   frame.serviceResearch();
   RWindow.enable();
}

//==========================================================
// <T>删除按键点击处理。</T>
//
// @method
// @param event:SClickEvent 点击事件
//==========================================================
function FDsSolutionMenuBar_onDeleteClick(event){
   var o = this;
   var listContent = o._frameSet._listContent;
   var guid = listContent._activeGuid;
   RWindow.disable();
   // 发送数据请求
   var connection = RConsole.find(FDrProjectConsole).doDelete(guid);
   connection.addLoadListener(o, o.onDeleteLoad);
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
