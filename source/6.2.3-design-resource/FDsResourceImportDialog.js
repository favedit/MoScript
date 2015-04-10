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
   o._nodeGuid             = null;
   // @attribute
   o._controlPrivateButton = null;
   o._controlTeamButton    = null;
   o._controlShareButton   = null;
   //..........................................................
   // @event
   o.onBuilded             = FDsResourceImportDialog_onBuilded;
   // @event
   o.onFileChange          = FDsResourceImportDialog_onFileChange;
   o.onFileLoaded          = FDsResourceImportDialog_onFileLoaded;
   o.onConfirmLoad         = FDsResourceImportDialog_onConfirmLoad;
   o.onConfirmClick        = FDsResourceImportDialog_onConfirmClick;
   o.onCancelClick         = FDsResourceImportDialog_onCancelClick;
   //..........................................................
   // @method
   o.construct             = FDsResourceImportDialog_construct;
   // @method
   o.setNodeLabel          = FDsResourceImportDialog_setNodeLabel;
   o.switchMode            = FDsResourceFolderDialog_switchMode;
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
   // 设置属性
   o._controlNodeLabel.setEditAble(false);
   //..........................................................
   // 注册事件
   o._controlFile.addDataChangedListener(o, o.onFileChange);
   o._controlConfirmButton.addClickListener(o, o.onConfirmClick);
   o._controlCancelButton.addClickListener(o, o.onCancelClick);
}

//==========================================================
// <T>文件加载完成。</T>
//
// @method
// @param event:SEvent 事件
//==========================================================
function FDsResourceImportDialog_onFileChange(event){
   var o = this;
   var name = o._controlFile.get();
   // 设置代码和标签
   var code = RFile.name(name);
   if(RString.isEmpty(o._controlCode.get())){
      o._controlCode.set(code);
   }
   if(RString.isEmpty(o._controlLabel.get())){
      o._controlLabel.set(code);
   }
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
   var url = null;
   if(o._modeCd == 'picture'){
      url = '/cloud.content2d.bitmap.wv?do=importData';
   }else if(o._modeCd == 'mesh'){
      url = '/cloud.content.mesh.wv?do=importData';
   }else{
      throw new TError(o, 'Mode is invalid.');
   }
   if(o._nodeGuid){
      url += '&node_guid=' + o._nodeGuid;
   }
   url += '&code=' + code + '&label=' + label + '&data_length=' + reader.length() + '&file_name=' + reader.fileName();
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
function FDsResourceImportDialog_onConfirmLoad(event){
   var o = this;
   // 隐藏窗口
   RConsole.find(FUiDesktopConsole).hide();
   // 隐藏窗口
   o.hide();
   // 刷新搜索内容
   var frame = o._frameSet._listContent;
   frame.serviceResearch();
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
// <T>设置节点标签。</T>
//
// @method
// @param label:String 标签
//==========================================================
function FDsResourceImportDialog_setNodeLabel(label){
   var o = this;
   o._controlNodeLabel.set(label);
}

//==========================================================
// <T>切换数据模式。</T>
//
// @method
// @param modeCd:String 数据模式
//==========================================================
function FDsResourceFolderDialog_switchMode(modeCd){
   var o = this;
   o._modeCd = modeCd;
   if(modeCd == 'picture'){
      o.setLabel('导入图片资源');
   }else if(modeCd == 'mesh'){
      o.setLabel('倒入网格资源');
   }else{
      throw new TError(o, 'Unknown mode.');
   }
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
