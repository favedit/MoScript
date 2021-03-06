//==========================================================
// <T>设计材质选择对话框。</T>
//
// @class
// @author maocy
// @history 150428
//==========================================================
function FDsMaterialSelectDialog(o){
   o = RClass.inherits(this, o, FUiDialog);
   //..........................................................
   // @property
   o._frameName            = 'resource.material.SelectDialog';
   //..........................................................
   // @attribute
   o._nodeGuid             = null;
   // @attribute
   o._controlPrivateButton = null;
   o._controlTeamButton    = null;
   o._controlShareButton   = null;
   //..........................................................
   // @event
   o.onBuilded             = FDsMaterialSelectDialog_onBuilded;
   // @event
   o.onFileLoaded          = FDsMaterialSelectDialog_onFileLoaded;
   o.onConfirmLoad         = FDsMaterialSelectDialog_onConfirmLoad;
   o.onConfirmClick        = FDsMaterialSelectDialog_onConfirmClick;
   o.onCancelClick         = FDsMaterialSelectDialog_onCancelClick;
   //..........................................................
   // @method
   o.construct             = FDsMaterialSelectDialog_construct;
   // @method
   o.dispose               = FDsMaterialSelectDialog_dispose;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param event:TEventProcess 事件处理
//==========================================================
function FDsMaterialSelectDialog_onBuilded(event){
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
function FDsMaterialSelectDialog_onFileLoaded(event){
   var o = this;
   var reader = o._fileReader;
   // 获得参数
   var resource = o._resource;
   var guid = resource.guid();
   // 上传数据
   var url = '/cloud.resource.material.wv?do=importData&guid=' + guid + '&data_length=' + reader.length() + '&file_name=' + reader.fileName();
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
function FDsMaterialSelectDialog_onConfirmLoad(event){
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
function FDsMaterialSelectDialog_onConfirmClick(event){
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
function FDsMaterialSelectDialog_onCancelClick(event){
   this.hide();
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsMaterialSelectDialog_construct(){
   var o = this;
   // 父处理
   o.__base.FUiDialog.construct.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsMaterialSelectDialog_dispose(){
   var o = this;
   // 父处理
   o.__base.FUiDialog.dispose.call(o);
}
