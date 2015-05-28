//==========================================================
// <T>上传文件服务。</T>
//
// @class FObject
// @history 091117 MAOCY 创建
//==========================================================
function FUploadConsole(o){
   o = RClass.inherits(this, o, FConsole);
   //..........................................................
   // @attribute
   o.scope               = EScope.Global;
   o._build              = false;
   o.uploadWindow        = null;
   o.uploadFileName      = null;
   o.uploads             = null;
   //..........................................................
   // @listener
   o.lsnsFileSelected    = new TListeners();
   o.lsnsUploaded        = new TListeners();
   //..........................................................
   // @event
   o.onFileSelected      = RClass.register(o, new HChange('onFileSelected'), FUploadConsole_onFileSelected);
   o.onFileUploaded      = FUploadConsole_onFileUploaded;
   o.onDeleteLoaded      = FUploadConsole_onDeleteLoaded;
   o.onPreviewSaveLoaded = FUploadConsole_onPreviewSaveLoaded;
   o.onDataFrameLoad     = RClass.register(o, new HReadyStateChange('onDataFrameLoad'), FUploadConsole_onDataFrameLoad);
   o.onUploadFrameLoad   = RClass.register(o, new HReadyStateChange('onUploadFrameLoad'), FUploadConsole_onUploadFrameLoad);
   //..........................................................
   // @method
   o.construct           = FUploadConsole_construct;
   o.showDialog          = FUploadConsole_showDialog;
   o.upload              = FUploadConsole_upload;
   o.getWindow           = FUploadConsole_getWindow;
   o.findWindow          = FUploadConsole_findWindow;
   o.previewSave         = FUploadConsole_previewSave;
   o.deleteFile          = FUploadConsole_deleteFile;
   return o;
}

//==========================================================
// <T>上传文件。</T>
// <P>命令：预览(preview)，上传(upload)。</P>
//
// @method
// @param a:action:String 命令
// @param g:argument:TUploadArg 参数
//==========================================================
function FUploadConsole_upload(a, g){
   var o = this;
   if(a){
      o.action = a;
   }
   // 开始传输信息
   if(g){
      o.hType.value = RString.nvl(g.typeCode);
      o.hCode.value = RString.nvl(g.recordCode);
      o.hGuid.value = RString.nvl(g.recordGuid);
      o.hName.value = RString.nvl(g.recordName);
      o.hPath.value = RString.nvl(g.path);
   }
   // 提交表单
   o.hForm.action = o.uploadPage + '?do=' + a;
   o.hForm.submit();
}

//==========================================================
// <T>文件上传完成。</T>
//
// @method
//==========================================================
function FUploadConsole_onFileSelected(e){
   var o = RHtml.findLink(this.parentElement, 'control');
   var fn = o.hUpload.value;
   if(fn && fn.length > 0){
      o.uploadFileName = fn;
      o.hWorkerId.value = RDate.format();
      o.uploadWindow.selectFile(fn);
      o.lsnsFileSelected.process(o);
   }
}

function FUploadConsole_onFileUploaded(s, g){
   this.uploadWindow.uploadedFile(g)
}

//==========================================================
// <T>响应数据页面加载事件。</T>
//
// @method
//==========================================================
function FUploadConsole_onDataFrameLoad(e, a, b){
   var o = this;
   var hf = o.hDataFrame;
   if('complete' == hf.readyState){
      var hw = hf.contentWindow;
      var hd = hw.document;
      var hb = hd.body;
      // 构件传输对象
      var s = new TString();
      s.append("<FORM method='post' target='" + o.uploadFrameName + "' enctype='multipart/form-data'>");
      s.append("<INPUT name='type' type='text'>");
      s.append("<INPUT name='code' type='text'>");
      s.append("<INPUT name='guid' type='text'>");
      s.append("<INPUT name='name' type='text'>");
      s.append("<INPUT name='path' type='text'>");
      s.append("<DIV></DIV>");
      s.append("<INPUT name='worker_id' type='text'>");
      s.append("</FORM>");
      hb.innerHTML = s.toString();
      // 创建一个上传文件用的表单
      o.hForm = hd.forms[0];
      // 创建一个上传文件用的输入框
      o.hType = o.hForm.children[0];
      o.hCode = o.hForm.children[1];
      o.hGuid = o.hForm.children[2];
      o.hName = o.hForm.children[3];
      o.hPath = o.hForm.children[4];
      var hup = o.hUploadPanel  = o.hForm.children[5];
      RHtml.link(hup, 'control', o);
      o.hWorkerId  = o.hForm.children[6];
   }
}

//==========================================================
// <T>响应上传页面加载事件。</T>
//
// @method
//==========================================================
function FUploadConsole_onUploadFrameLoad(e, a, b){
   var o = this;
   var hf = o.hUploadFrame;
   if('complete' == hf.readyState){
   }
}

//==========================================================
// <T>上传文件服务。</T>
//
// @method
//==========================================================
function FUploadConsole_construct(){
   var o = this;
   o.base.FConsole.construct.call(o);
   o.uploads = new TMap();
   o.uploadPage = top.RContext.context('/apl/logic/transfer/Upload.wa')
   // 建立数据页面
   var hd = o.hDataFramePanel = RBuilder.append(null, 'DIV');
   var ufn = o.uploadFrameName = 'frm' + RHtml.uid(hd);
   hd.style.display = 'none';
   hd.innerHTML = "<IFRAME></IFRAME>";
   var hf = o.hDataFrame = hd.children[0];
   RControl.attachEvent(o, 'onDataFrameLoad', hf);
   // 建立目标页面
   var hd = o.hUploadFramePanel = RBuilder.append(null, 'DIV');
   hd.style.display = 'none';
   hd.innerHTML = "<IFRAME name='" + ufn + "'></IFRAME>";
   o.onUploadFrameLoad = hd.children[0];
   // 注册加载完成的监听
   RConsole.find(FListenerConsole).register(FUploadConsole, 'onFileUploaded', o, o.onFileUploaded);
}

function FUploadConsole_showDialog(){
   var o = this;
   var hup = o.hUploadPanel;
   // 重新创建上传文件框，防止onchange事件不发生
   
   if(o.hUpload){
      o.hUpload.onchange = null;
      hup.removeChild(o.hUpload);
   }
   hup.innerHTML = "<INPUT name='upload' type='file'>";
   var hu = o.hUpload  = hup.children[0];
   hu.onchange = o.onFileSelected;
   // 选取文件
   hu.click();
}







//------------------------------------------------------------
function FUploadConsole_getWindow(){
   var o = this;
   var w = o.uploadWindow;
   if(!w){
      w = o.uploadWindow = RControl.create('FUploadWindow');
   }
   return w;
}
//------------------------------------------------------------
function FUploadConsole_findWindow(){
   var o = this;
   var w = o.getWindow();
   w.lsnsFileSelected.clear();
   w.lsnsUploaded.clear();
   return w;
}
//------------------------------------------------------------
function FUploadConsole_onDeleteLoaded(e){
   var o = this;
   var g = e.argument;
   if(g.callback){
      g.callback.invoke(o, g, e);
   }
}
//------------------------------------------------------------
function FUploadConsole_onPreviewSaveLoaded(e){
   var o = this;
   var g = e.argument;
   var fn = e.document.root().find('File');
   if(fn){
      g.attributes = fn.attrs;
   }
   if(g.callback){
      g.callback.invoke(o, g, e);
   }
}
//------------------------------------------------------------
function FUploadConsole_previewSave(g){
   var o = this;
   var doc = new TXmlDocument();
   var root = doc.root();
   root.set('action', 'previewSave');
   var fileNode = root.create('File');
   fileNode.set('type_code', g.typeCode);
   fileNode.set('record_code', g.recordCode);
   fileNode.set('record_guid', g.recordGuid);
   fileNode.set('record_name', g.recordName);
   fileNode.set('guid', g.guid);
   fileNode.set('path', g.path);
   fileNode.set('adjust_width', g.adjustWidth);
   fileNode.set('adjust_height', g.adjustHeight);
   // 获取返回节点
   var e = new TEvent(o, EXmlEvent.Send, o.onPreviewSaveLoaded);
   e.url = RService.url('public.upload');
   e.document = doc;
   e.argument = g;
   RConsole.find(FXmlConsole).process(e);
}
//------------------------------------------------------------
function FUploadConsole_deleteFile(g){
   var o = this;
   var doc = new TXmlDocument();
   var root = doc.root();
   root.set('action', 'deleteFile');
   var fileNode = root.create('File');
   fileNode.set('guid', g.guid);
   // 获取返回节点
   var e = new TEvent(o, EXmlEvent.Send, o.onDeleteLoaded);
   e.url = RService.url('public.upload');
   e.document = doc;
   e.argument = g;
   RConsole.find(FXmlConsole).process(e);
}
