//==========================================================
// <T>主菜单。</T>
//
// @author maocy
// @history 141231
//==========================================================
function FDsSceneMenuBar(o){
   o = RClass.inherits(this, o, FUiMenuBar);
   //..........................................................
   // @property
   o._frameName     = 'resource.scene.MenuBar';
   //..........................................................
   // @attribute
   o._refreshButton = null;
   o._saveButton    = null;
   o._runButton     = null;
   //..........................................................
   // @event
   o.onBuilded      = FDsSceneMenuBar_onBuilded;
   // @event
   o.onSaveLoad     = FDsSceneMenuBar_onSaveLoad;
   o.onSaveClick    = FDsSceneMenuBar_onSaveClick;
   o.onCaptureLoad  = FDsSceneMenuBar_onCaptureLoad;
   o.onCaptureClick = FDsSceneMenuBar_onCaptureClick;
   o.onExecuteClick = FDsSceneMenuBar_onExecuteClick;
   //..........................................................
   // @method
   o.construct      = FDsSceneMenuBar_construct;
   // @method
   o.dispose        = FDsSceneMenuBar_dispose;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
function FDsSceneMenuBar_onBuilded(p){
   var o = this;
   o.__base.FUiMenuBar.onBuilded.call(o, p);
   //..........................................................
   // 注册事件
   o._controlSave.addClickListener(o, o.onSaveClick);
   o._controlCapture.addClickListener(o, o.onCaptureClick);
   o._controlExecute.addClickListener(o, o.onExecuteClick);
}

//==========================================================
// <T>保存按键加载处理。</T>
//
// @method
// @param event:SEvent 事件
//==========================================================
function FDsSceneMenuBar_onSaveLoad(event){
   // 解除画面锁定
   RConsole.find(FUiDesktopConsole).hide();
}

//==========================================================
// <T>保存按键处理。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
function FDsSceneMenuBar_onSaveClick(p){
   var o = this;
   var space = o._frameSet._activeSpace;
   var resource = space.resource();
   // 画面禁止操作
   RConsole.find(FUiDesktopConsole).showUploading();
   // 存储配置
   var xconfig = new TXmlNode();
   resource.saveConfig(xconfig);
   // 更新处理
   var connection = RConsole.find(FDrSceneConsole).update(xconfig);
   connection.addLoadListener(o, o.onSaveLoad);
}

//==========================================================
// <T>捕捉图像加载处理。</T>
//
// @method
// @param event:SEvent 事件
//==========================================================
function FDsSceneMenuBar_onCaptureLoad(event){
   // 解除画面锁定
   RConsole.find(FUiDesktopConsole).hide();
}

//==========================================================
// <T>捕捉图像处理。</T>
//
// @method
// @param event:SEvent 事件
//==========================================================
function FDsSceneMenuBar_onCaptureClick(event){
   var o = this;
   // 画面禁止操作
   RConsole.find(FUiDesktopConsole).showUploading();
   // 上传数据
   var connection = o._frameSet._canvas.capture();
   connection.addLoadListener(o, o.onCaptureLoad);
}

//==========================================================
// <T>保存按键处理。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
function FDsSceneMenuBar_onExecuteClick(p){
   var o = this;
   var u = '../design/view.html?code=' + o._frameSet._sceneCode;
   //window.open(u);
   window.location = u;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsSceneMenuBar_construct(){
   var o = this;
   // 父处理
   o.__base.FUiMenuBar.construct.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsSceneMenuBar_dispose(){
   var o = this;
   // 父处理
   o.__base.FUiMenuBar.dispose.call(o);
}
