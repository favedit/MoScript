//==========================================================
// <T>主菜单。</T>
//
// @author maocy
// @history 141231
//==========================================================
function FDsMaterialMenuBar(o){
   o = RClass.inherits(this, o, FUiMenuBar);
   //..........................................................
   // @attribute
   o._controlBack     = null;
   o._controlSave     = null;
   o._controlProperty = null;
   o._controlSelect   = null;
   o._controlImport   = null;
   o._controlCapture  = null;
   //..........................................................
   // @event
   o.onBuilded        = FDsMaterialMenuBar_onBuilded;
   // @event
   o.onBackClick      = FDsMaterialMenuBar_onBackClick;
   o.onSaveLoad       = FDsMaterialMenuBar_onSaveLoad;
   o.onSaveClick      = FDsMaterialMenuBar_onSaveClick;
   o.onPropertyClick  = FDsMaterialMenuBar_onPropertyClick;
   o.onSelectLoad     = FDsMaterialMenuBar_onSelectLoad;
   o.onSelectConfirm  = FDsMaterialMenuBar_onSelectConfirm;
   o.onSelectClick    = FDsMaterialMenuBar_onSelectClick;
   o.onImportClick    = FDsMaterialMenuBar_onImportClick;
   o.onCaptureLoad    = FDsMaterialMenuBar_onCaptureLoad;
   o.onCaptureClick   = FDsMaterialMenuBar_onCaptureClick;
   //..........................................................
   // @method
   o.construct        = FDsMaterialMenuBar_construct;
   // @method
   o.dispose          = FDsMaterialMenuBar_dispose;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
function FDsMaterialMenuBar_onBuilded(p){
   var o = this;
   o.__base.FUiMenuBar.onBuilded.call(o, p);
   //..........................................................
   // 注册事件
   o._controlBack.addClickListener(o, o.onBackClick);
   o._controlSave.addClickListener(o, o.onSaveClick);
   o._controlProperty.addClickListener(o, o.onPropertyClick);
   o._controlSelect.addClickListener(o, o.onSelectClick);
   o._controlImport.addClickListener(o, o.onImportClick);
   o._controlCapture.addClickListener(o, o.onCaptureClick);
}

//==========================================================
// <T>返回点击处理。</T>
//
// @method
// @param event:SEvent 事件
//==========================================================
function FDsMaterialMenuBar_onBackClick(event){
   var o = this;
}

//==========================================================
// <T>保存按键加载处理。</T>
//
// @method
// @param event:SEvent 事件
//==========================================================
function FDsMaterialMenuBar_onSaveLoad(event){
   // 解除画面锁定
   RConsole.find(FUiDesktopConsole).hide();
}

//==========================================================
// <T>保存按键处理。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
function FDsMaterialMenuBar_onSaveClick(p){
   var o = this;
   var space = o._frameSet._activeSpace;
   var resource = space.resource();
   // 画面禁止操作
   RConsole.find(FUiDesktopConsole).showUploading();
   // 存储配置
   var xconfig = new TXmlNode();
   resource.saveConfig(xconfig);
   // 更新处理
   var connection = RConsole.find(FE3sMeshConsole).update(xconfig);
   connection.addLoadListener(o, o.onSaveLoad);
}

//==========================================================
// <T>属性点击处理。</T>
//
// @method
// @param event:SEvent 事件
//==========================================================
function FDsMaterialMenuBar_onPropertyClick(event){
   var o = this;
}

//==========================================================
// <T>选择加载处理。</T>
//
// @method
// @param event:SEvent 事件
//==========================================================
function FDsMaterialMenuBar_onSelectLoad(event){
}

//==========================================================
// <T>选择确认处理。</T>
//
// @method
// @param event:SEvent 事件
//==========================================================
function FDsMaterialMenuBar_onSelectConfirm(event){
}

//==========================================================
// <T>选择点击处理。</T>
//
// @method
// @param event:SEvent 事件
//==========================================================
function FDsMaterialMenuBar_onSelectClick(event){
   var o = this;
   // 获得资源
   var resource = o._frameSet._activeResource;
   // 弹出界面
   var dialog = RConsole.find(FUiWindowConsole).find(FDsMaterialImportDialog);
   dialog._resource = resource;
   dialog._frameSet = o._frameSet;
   dialog.showPosition(EUiPosition.Center);
}

//==========================================================
// <T>导入点击处理。</T>
//
// @method
// @param event:SEvent 事件
//==========================================================
function FDsMaterialMenuBar_onImportClick(event){
   var o = this;
   // 获得资源
   var resource = o._frameSet._activeResource;
   // 弹出界面
   var dialog = RConsole.find(FUiWindowConsole).find(FDsMaterialImportDialog);
   dialog._resource = resource;
   dialog._frameSet = o._frameSet;
   dialog.showPosition(EUiPosition.Center);
}

//==========================================================
// <T>捕捉图像加载处理。</T>
//
// @method
// @param event:SEvent 事件
//==========================================================
function FDsMaterialMenuBar_onCaptureLoad(event){
   // 解除画面锁定
   RConsole.find(FUiDesktopConsole).hide();
}

//==========================================================
// <T>捕捉图像处理。</T>
//
// @method
// @param event:SEvent 事件
//==========================================================
function FDsMaterialMenuBar_onCaptureClick(event){
   var o = this;
   // 画面禁止操作
   RConsole.find(FUiDesktopConsole).showUploading();
   // 上传数据
   var connection = o._frameSet._canvas.capture();
   connection.addLoadListener(o, o.onCaptureLoad);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsMaterialMenuBar_construct(){
   var o = this;
   // 父处理
   o.__base.FUiMenuBar.construct.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsMaterialMenuBar_dispose(){
   var o = this;
   // 父处理
   o.__base.FUiMenuBar.dispose.call(o);
}
