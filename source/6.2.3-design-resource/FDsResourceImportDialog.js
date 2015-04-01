//==========================================================
// <T>主菜单。</T>
//
// @author maocy
// @history 141231
//==========================================================
function FDsResourceImportDialog(o){
   o = RClass.inherits(this, o, FUiDialog);
   //..........................................................
   // @property
   o._frameName            = 'design3d.resource.ImportDialog';
   //..........................................................
   // @attribute
   o._resourceTypeCd       = 'private';
   // @attribute
   o._controlPrivateButton = null;
   o._controlTeamButton    = null;
   o._controlShareButton   = null;
   //..........................................................
   // @event
   o.onBuilded             = FDsResourceImportDialog_onBuilded;
   // @event
   o.onFileLoaded          = FDsResourceImportDialog_onFileLoaded;
   o.onConfirmLoad         = FDsResourceImportDialog_onConfirmLoad;
   o.onConfirmClick        = FDsResourceImportDialog_onConfirmClick;
   o.onCancelClick         = FDsResourceImportDialog_onCancelClick;
   //..........................................................
   // @method
   o.construct             = FDsResourceImportDialog_construct;
   // @method
   o.dispose               = FDsResourceImportDialog_dispose;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
function FDsResourceImportDialog_onBuilded(p){
   var o = this;
   o.__base.FUiDialog.onBuilded.call(o, p);
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
function FDsResourceImportDialog_onFileLoaded(event){
   var o = this;
   var reader = o._fileReader;
   // 获得参数
   var code = o._controlCode.get();
   var label = o._controlLabel.get();
   // 上传数据
   var url = '/cloud.content.mesh.wv?do=importData&code=' + code + '&label=' + label + '&data_length=' + reader.length() + '&file_name=' + reader.fileName();
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
function FDsResourceImportDialog_onConfirmLoad(event){
   var o = this;
   //var frame = o._workspace._searchContent;
   //frame.serviceResearch();
   // 隐藏窗口
   o.hide();
   // 隐藏窗口
   RWindow.enable();
}

//==========================================================
// <T>按键点击处理。</T>
//
// @method
// @param event:SEvent 事件
//==========================================================
function FDsResourceImportDialog_onConfirmClick(event){
   var o = this;
   // 画面禁止操作
   RWindow.disable();
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
function FDsResourceImportDialog_onCancelClick(event){
   this.hide();
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsResourceImportDialog_construct(){
   var o = this;
   // 父处理
   o.__base.FUiDialog.construct.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsResourceImportDialog_dispose(){
   var o = this;
   // 父处理
   o.__base.FUiDialog.dispose.call(o);
}
