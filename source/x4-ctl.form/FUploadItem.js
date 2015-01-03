// ============================================================
// FUploadItem
// ============================================================
function FUploadItem(o){
   o = RClass.inherits(this, o, FControl);
   // Event
   o.onFrameLoad      = RClass.register(o, new HReadyStateChange('onFrameLoad'), FUploadItem_onFrameLoad);
   // Attribute
   o.page             = null;
   o.type             = null;
   o.viewer           = null;
   o.fileName         = null;
   o.uploadStatus     = EUploadStatus.Local;
   o.uploaded         = null;
   // Attribute
   o.hForm            = null;
   o.hFile            = null;
   o.path             = null;
   o.id               = null;
   o.dsName           = null;
   // Listener
   o.lsnsFileSelected = new TListeners();
   o.lsnsUploaded     = new TListeners();
   // Process
   o.oeBuild          = FUploadItem_oeBuild;
   // Event
   o.ohFileSelected   = FUploadItem_ohFileSelected;
   o.onFrameLoad      = FUploadItem_onFrameLoad;
   o.onFileUploaded   = FUploadItem_onFileUploaded;
   // Method
   o.buildDialog      = FUploadItem_buildDialog;
   o.showDialog       = FUploadItem_showDialog;
   o.upload           = FUploadItem_upload;
   return o;
}
// ------------------------------------------------------------
function FUploadItem_oeBuild(e){
   var o = this;
   var b = e.builder;
   var hp = o.hPanel = b.create('TR');
   //
   o.hFileName = b.append(hp, 'TD');
   o.hFileName.innerText = o.fileName;
   //
   o.hStatus = b.append(hp, 'TD');
   o.hStatus.innerText = '未传输';
   //
   o.hCommand = b.append(hp, 'TD');
   o.hCommand.innerText = '删除';
   return EEventStatus.Stop;
}
// ------------------------------------------------------------
function FUploadItem_ohFileSelected(){
   var o = RHtml.findLink(this, 'control');
   var fn = o.hFile.value;
   o.fileName = o.hFile.value;
   if(fn && fn.length > 0){
      o.lsnsFileSelected.process(o);
   }
}
// ------------------------------------------------------------
function FUploadItem_onFrameLoad(e, a, b){
   var o = this;
   var hf = o.hFrame;
   if((EUploadStatus.Local == o.uploadStatus) && ('complete' == hf.readyState) && !o.hFile){
      var hw = hf.contentWindow;
      var hd = hw.document;
      var hb = hd.body;

      var s = new TString();
      s.append("<FORM method='post' enctype='multipart/form-data'>");
      s.append("<INPUT name='store_type' type='text'>");
      s.append("<INPUT name='store_code' type='text'>");
      s.append("<INPUT name='store_name' type='text'>");
      s.append("<INPUT name='store_id' type='text'>");
      s.append("<INPUT name='path' type='text'>");
      s.append("<INPUT name='upload' type='file'>");
      s.append("</FORM>");
      hb.innerHTML = s.toString();
      // 创建一个上传文件用的表单
      o.hForm = hd.forms[0];
      o.hForm.action = o.page;
      // 创建一个上传文件用的输入框
      o.hStoreType = o.hForm.children[0];
      o.hStoreCode = o.hForm.children[1];
      o.hStoreName = o.hForm.children[2];
      o.hStoreId = o.hForm.children[3];
      o.hPath = o.hForm.children[4];
      o.hUpload  = o.hForm.children[5];
      o.hUpload.onchange = o.ohFileSelected;
      RHtml.link(o.hUoload, 'control', o);
      RConsole.find(FEventConsole).register(o, o.showDialog);
   }
}
// ------------------------------------------------------------
function FUploadItem_buildDialog(){
   var o = this;
   var hd = document.createElement('DIV');
   hd.style.display = 'none';
   RWindow.appendElement(hd);
   hd.innerHTML = "<IFRAME></IFRAME>";
   var hf = o.hFrame = hd.children[0];
   o.attachEvent('onFrameLoad', hf);
}
// ------------------------------------------------------------
function FUploadItem_showDialog(){
   var o = this;
   if(o.hUpload){
      o.hUpload.click();
   }else{
      o.buildDialog();
   }
}
// ------------------------------------------------------------
function FUploadItem_upload(){
   var o = this;
   // 只有在本地的才允许传输
   if(EUploadStatus.Local != o.uploadStatus){
      return;
   }
   // 开始传输信息
   o.hStoreType.value = o.storeType;
   o.hStoreCode.value = o.storeCode;
   o.hStoreName.value = o.storeName;
   o.hStoreId.value = o.storeId;
   o.hPath.value = o.path;
   o.hForm.submit();
}
// ------------------------------------------------------------
function FUploadItem_onFileUploaded(){
   var o = this;
   o.lsnsUploaded.process();
   //var hf = o.hFrame;
   //o.hStatus.innerText = '完成';
}
