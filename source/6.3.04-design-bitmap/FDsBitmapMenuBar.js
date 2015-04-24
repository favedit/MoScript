//==========================================================
// <T>设计位图菜单。</T>
//
// @class
// @author maocy
// @history 150424
//==========================================================
function FDsBitmapMenuBar(o){
   o = RClass.inherits(this, o, FUiMenuBar);
   //..........................................................
   // @attribute
   o._controlBack    = null;
   o._controlSave    = null;
   o._controlCapture = null;
   //..........................................................
   // @event
   o.onBuilded       = FDsBitmapMenuBar_onBuilded;
   // @event
   o.onBackClick     = FDsBitmapMenuBar_onBackClick;
   o.onSaveLoad      = FDsBitmapMenuBar_onSaveLoad;
   o.onSaveClick     = FDsBitmapMenuBar_onSaveClick;
   o.onImportLoad    = FDsBitmapMenuBar_onImportLoad;
   o.onImportClick   = FDsBitmapMenuBar_onImportClick;
   //..........................................................
   // @method
   o.construct       = FDsBitmapMenuBar_construct;
   // @method
   o.dispose         = FDsBitmapMenuBar_dispose;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param event:TEventProcess 事件处理
//==========================================================
function FDsBitmapMenuBar_onBuilded(event){
   var o = this;
   o.__base.FUiMenuBar.onBuilded.call(o, event);
}

//==========================================================
// <T>后退按键处理。</T>
//
// @method
// @param event:SEvent 事件
//==========================================================
function FDsBitmapMenuBar_onBackClick(event){
   var o = this;
}

//==========================================================
// <T>保存按键加载处理。</T>
//
// @method
// @param event:SEvent 事件
//==========================================================
function FDsBitmapMenuBar_onSaveLoad(event){
   // 解除画面锁定
   RConsole.find(FUiDesktopConsole).hide();
}

//==========================================================
// <T>保存按键处理。</T>
//
// @method
// @param event:SEvent 事件
//==========================================================
function FDsBitmapMenuBar_onSaveClick(event){
   var o = this;
   var bitmap = o._frameSet._activeResource;
   // 画面禁止操作
   RConsole.find(FUiDesktopConsole).showUploading();
   // 更新处理
   var connection = RConsole.find(FDrBitmapConsole).doUpdate(bitmap);
   connection.addLoadListener(o, o.onSaveLoad);
}

//==========================================================
// <T>导入加载处理。</T>
//
// @method
// @param event:SEvent 事件
//==========================================================
function FDsBitmapMenuBar_onImportLoad(event){
   // 解除画面锁定
   RConsole.find(FUiDesktopConsole).hide();
}

//==========================================================
// <T>导入点击处理。</T>
//
// @method
// @param event:SEvent 事件
//==========================================================
function FDsBitmapMenuBar_onImportClick(event){
   var o = this;
   // 获得资源
   var resource = o._frameSet._activeResource;
   // 弹出界面
   var dialog = RConsole.find(FUiWindowConsole).find(FDsBitmapImportDialog);
   dialog._resource = resource;
   dialog._frameSet = o._frameSet;
   dialog.showPosition(EUiPosition.Center);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsBitmapMenuBar_construct(){
   var o = this;
   // 父处理
   o.__base.FUiMenuBar.construct.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsBitmapMenuBar_dispose(){
   var o = this;
   // 父处理
   o.__base.FUiMenuBar.dispose.call(o);
}
