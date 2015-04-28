//==========================================================
// <T>设计材质导入对话框。</T>
//
// @class
// @author maocy
// @history 150428
//==========================================================
function FDsMaterialImportDialog(o){
   o = RClass.inherits(this, o, FUiDialog);
   //..........................................................
   // @property
   o._frameName            = 'resource.material.ImportDialog';
   //..........................................................
   // @attribute
   o._nodeGuid             = null;
   // @attribute
   o._controlPrivateButton = null;
   o._controlTeamButton    = null;
   o._controlShareButton   = null;
   //..........................................................
   // @event
   o.onBuilded             = FDsMaterialImportDialog_onBuilded;
   // @event
   o.onFileLoaded          = FDsMaterialImportDialog_onFileLoaded;
   o.onConfirmLoad         = FDsMaterialImportDialog_onConfirmLoad;
   o.onConfirmClick        = FDsMaterialImportDialog_onConfirmClick;
   o.onCancelClick         = FDsMaterialImportDialog_onCancelClick;
   //..........................................................
   // @method
   o.construct             = FDsMaterialImportDialog_construct;
   // @method
   o.dispose               = FDsMaterialImportDialog_dispose;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param event:TEventProcess 事件处理
//==========================================================
function FDsMaterialImportDialog_onBuilded(event){
   var o = this;
   o.__base.FUiDialog.onBuilded.call(o, event);
   //..........................................................
   // 注册事件
   o._controlConfirmButton.addClickListener(o, o.onConfirmClick);
   o._controlCancelButton.addClickListener(o, o.onCancelClick);
}

//==========================================================
// <T>文件加载完成。</T>
//
// @method
// @param event:SEvent 事件
//==========================================================
function FDsMaterialImportDialog_onFileLoaded(event){
   var o = this;
   var reader = o._fileReader;
   // 获得参数
   var resource = o._resource;
   var guid = resource.guid();
   // 上传数据
   var url = '/cloud.resource.material.wv?do=updateData&guid=' + guid + '&data_length=' + reader.length() + '&file_name=' + reader.fileName();
   url = RBrowser.urlEncode(url);
   // 发送数据
   var connection = RConsole.find(FHttpConsole).send(url, reader.data());
   connection.addLoadListener(o, o.onConfirmLoad);
   // 释放文件
   o._fileReader = RObject.dispose(reader);
}

//==========================================================
// <T>按键点击处理。</T>
//
// @method
// @param event:SEvent 事件
//==========================================================
function FDsMaterialImportDialog_onConfirmLoad(event){
   var o = this;
   // 隐藏窗口
   RConsole.find(FUiDesktopConsole).hide();
   // 隐藏窗口
   o.hide();
   // 刷新搜索内容
   o._frameSet.reload();
}

//==========================================================
// <T>按键点击处理。</T>
//
// @method
// @param event:SEvent 事件
//==========================================================
function FDsMaterialImportDialog_onConfirmClick(event){
   var o = this;
   // 画面禁止操作
   RConsole.find(FUiDesktopConsole).showUploading();
   // 加载文件数据
   var file = o._controlFile._hInput.files[0];
   var reader = o._fileReader = RClass.create(FFileReader);
   reader.addLoadListener(o, o.onFileLoaded);
   reader.loadFile(file);
}

//==========================================================
// <T>按键点击处理。</T>
//
// @method
// @param event:SEvent 事件
//==========================================================
function FDsMaterialImportDialog_onCancelClick(event){
   this.hide();
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsMaterialImportDialog_construct(){
   var o = this;
   // 父处理
   o.__base.FUiDialog.construct.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsMaterialImportDialog_dispose(){
   var o = this;
   // 父处理
   o.__base.FUiDialog.dispose.call(o);
}
