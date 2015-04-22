//==========================================================
// <T>主菜单。</T>
//
// @author maocy
// @history 141231
//==========================================================
function FDsShareBitmapMenuBar(o){
   o = RClass.inherits(this, o, FUiMenuBar);
   //..........................................................
   // @property
   o._frameName            = 'resource.share.bitmap.MenuBar';
   //..........................................................
   // @attribute
   o._controlSaveButton    = null;
   o._controlCaptureButton = null;
   //..........................................................
   // @event
   o.onBuilded             = FDsShareBitmapMenuBar_onBuilded;
   // @event
   o.onSaveLoad            = FDsShareBitmapMenuBar_onSaveLoad;
   o.onSaveClick           = FDsShareBitmapMenuBar_onSaveClick;
   o.onCaptureLoad         = FDsShareBitmapMenuBar_onCaptureLoad;
   o.onCaptureClick        = FDsShareBitmapMenuBar_onCaptureClick;
   //..........................................................
   // @method
   o.construct             = FDsShareBitmapMenuBar_construct;
   // @method
   o.dispose               = FDsShareBitmapMenuBar_dispose;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
function FDsShareBitmapMenuBar_onBuilded(p){
   var o = this;
   o.__base.FUiMenuBar.onBuilded.call(o, p);
   //..........................................................
   // 注册事件
   o._controlSaveButton.addClickListener(o, o.onSaveClick);
   o._controlImportButton.addClickListener(o, o.onCaptureClick);
}

//==========================================================
// <T>保存按键加载处理。</T>
//
// @method
// @param event:SEvent 事件
//==========================================================
function FDsShareBitmapMenuBar_onSaveLoad(event){
   // 解除画面锁定
   RConsole.find(FUiDesktopConsole).hide();
}

//==========================================================
// <T>保存按键处理。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
function FDsShareBitmapMenuBar_onSaveClick(p){
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
// <T>捕捉图像加载处理。</T>
//
// @method
// @param event:SEvent 事件
//==========================================================
function FDsShareBitmapMenuBar_onCaptureLoad(event){
   // 解除画面锁定
   RConsole.find(FUiDesktopConsole).hide();
}

//==========================================================
// <T>捕捉图像处理。</T>
//
// @method
// @param event:SEvent 事件
//==========================================================
function FDsShareBitmapMenuBar_onCaptureClick(event){
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
function FDsShareBitmapMenuBar_construct(){
   var o = this;
   // 父处理
   o.__base.FUiMenuBar.construct.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsShareBitmapMenuBar_dispose(){
   var o = this;
   // 父处理
   o.__base.FUiMenuBar.dispose.call(o);
}
