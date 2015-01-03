//==========================================================
// <T>上传文件窗口。</T>
//
// @class FWindow
// @history 091117 MAOCY 创建
//==========================================================
function FUploadWindow(o){
   o = RClass.inherits(this, o, FWindow);
   //..........................................................
   // @attribute
   o.fileEdit          = false;
   o.recordCode        = null;
   o.recordGuid        = null;
   o.uploadWorker      = null;
   o.attributes        = null;
   //..........................................................
   // @listener
   o.lsnsFileSelected  = null;
   o.lsnsUploaded      = null;
   //..........................................................
   // @event
   o.onPreviewUploaded = FUploadWindow_onPreviewUploaded;
   o.onBrowserClick    = FUploadWindow_onBrowserClick;
   o.onUploadClick     = FUploadWindow_onUploadClick;
   //..........................................................
   // @process
   o.oeBuild           = FUploadWindow_oeBuild;
   //..........................................................
   o.construct         = FUploadWindow_construct;
   o.selectFile        = FUploadWindow_selectFile;
   o.uploadedFile      = FUploadWindow_uploadedFile;
   o.show              = FUploadWindow_show;
   o.hide              = FUploadWindow_hide;
   return o;
}

//==========================================================
// <T>处理预览上传完成事件。</T>
//
// @method
// @param s:source:FObject 发送者
// @param g:arguments:Object 参数对象
//==========================================================
function FUploadWindow_onPreviewUploaded(s, g){
   var o = this;
   o.hide();
   o.lsnsUploaded.process(o, g);
}

//==========================================================
// <T>处理鼠标点击浏览文件事件。</T>
//
// @method
//==========================================================
function FUploadWindow_onBrowserClick(){
   RConsole.find(FUploadConsole).showDialog();
}

//==========================================================
// <T>处理文件上传完成事件。</T>
//
// @method
//==========================================================
function FUploadWindow_onUploadClick(){
   var o = this;
   if('P' == o.mode){
      // 预览模式
      var g = new TUploadArg();
      g.typeCode = o.typeCode;
      g.recordCode = o.recordCode;
      g.recordGuid = o.recordGuid;
      g.recordName = o.recordName;
      g.guid = o.attributes.get('guid');
      g.path = o.attributes.get('path');
      g.adjustWidth = o.adjustWidth;
      g.adjustHeight = o.adjustHeight;
      g.callback = new TInvoke(o, o.onPreviewUploaded);
      RConsole.find(FUploadConsole).previewSave(g);
   }else{
      // 上传模式
      o.mode = 'U';
      o.hInfoCell.innerText = '文件正在上传中，请稍候...'
      // 更显按键状态
      o.browserButton.psEnable(false);
      o.uploadButton.psEnable(false);
      o.closeButton.psEnable(false);
      // 设置上传文件的参数
      var g = new TUploadArg();
      g.typeCode = o.typeCode;
      g.recordCode = o.recordCode;
      g.recordGuid = o.recordGuid;
      g.recordName = o.recordName;
      g.path = o.uploadFileName;
      RConsole.find(FUploadConsole).upload('upload', g);
   }
}

//==========================================================
// <T>构建页面处理。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
function FUploadWindow_oeBuild(e){
   var o = this;
   var r = o.base.FWindow.oeBuild.call(o, e);
   if(e.isAfter()){
      // 设置窗口信息
      o.setIcon('Icon');
      o.setCaption(' ' + RContext.get('FUploadWindow:Caption'));
      o.hPanel.style.width = 620;
      o.hBodyPanel.style.height = 400;
      // 建立底板(2Row*1Col)
      var hbf = o.hBodyForm = RBuilder.appendTable(o.hBodyPanel);
      hbf.style.width = '100%';
      hbf.style.height = '100%';
      // .........................................................
      // 建立工具栏
      var htp = o.hToolbarPanel = hbf.insertRow().insertCell();
      htp.height = 1;
      var tb = RClass.create(FToolBar);
      tb.width = '100%';
      // 新建选择文件按键
      var tbn = o.browserButton = RClass.create(FToolButton);
      tbn.icon = 'ctl.FUploadWindow_Browser';
      tbn.label = RContext.get('FUploadWindow:Browser');
      tbn.lsnsClick.register(o, o.onBrowserClick);
      tb.push(tbn);
      // 新建选择文件按键
      var tbn = o.uploadButton = RClass.create(FToolButton);
      tbn.icon = 'ctl.FUploadWindow_Upload';
      tbn.label = '上传文件';
      tbn.lsnsClick.register(o, o.onUploadClick);
      tb.push(tbn);
      // 新建选择文件按键
      var tbn = RClass.create(FToolButtonSplit);
      tb.push(tbn);
      // 新建关闭按键
      var tbn = o.closeButton = RClass.create(FToolButton);
      tbn.icon = 'ctl.FUploadWindow_Close';
      tbn.label = RContext.get('FUploadWindow:Close');
      tbn.lsnsClick.register(o, o.onCloseClick);
      tb.push(tbn);
      // 建立工具栏内所有按键
      tb.psBuild(htp);
      // .........................................................
      // 建立预览底板
      var hpp = o.hPreviewPanel = hbf.insertRow().insertCell();
      hpp.style.paddingTop = 6;
      // 建立上传内容
      var hpf = o.hPreviewForm = RBuilder.appendTable(hpp, null, 0, 1);
      hpf.width = '100%';
      hpf.height = '100%';
      hpf.bgColor = '#CCCCCC';
      var hpr = hpf.insertRow();
      // 建立左预览区
      var hc = o.hIconPanel = hpr.insertCell();
      hc.width = 330;
      hc.align = 'center';
      hc.bgColor = '#FFFFFF';
      o.hIcon = RBuilder.appendImage(hc);
      o.hIcon.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod = image)";
      // 建立右信息区
      var hc = o.hInfoPanel = hpr.insertCell();
      hc.bgColor = '#FFFFFF';
      hc.align = 'center';
      var hif = o.hInfoForm = RBuilder.appendTable(hc, null, 0, 4);
      o.hInfoCell = hif.insertRow().insertCell();
      hif.insertRow().insertCell();
      o.hFileCell = hif.insertRow().insertCell();
      o.hLine1 = hif.insertRow().insertCell();
      o.hLine1.style.display = 'none';
      o.hLine2 = hif.insertRow().insertCell();
      o.hLine2.style.display = 'none';
      o.hLine3 = hif.insertRow().insertCell();
      o.hLine3.style.display = 'none';
   }
   return r;
}

//==========================================================
// <T>构建对象。</T>
//
// @method
//==========================================================
function FUploadWindow_construct(){
   var o = this;
   o.base.FWindow.construct.call(o);
   o.attributes = new TAttributes();
   o.lsnsFileSelected = new TListeners();
   o.lsnsUploaded = new TListeners();
}

//==========================================================
// <T>选取文件。</T>
//
// @method
// @param fn:fileName:Stirng 文件名称
//==========================================================
function FUploadWindow_selectFile(fn){
   var o = this;
   o.uploadFileName = fn;
   if(RFile.isPicture(fn)){
      o.mode = 'P';
      o.hInfoCell.innerText = '图片预览生成中，请稍候。';
      // 更显按键状态
      o.browserButton.psEnable(false);
      o.uploadButton.psEnable(false);
      o.closeButton.psEnable(false);
      // 设置上传文件的参数
      RConsole.find(FUploadConsole).upload('preview');
   }else{
      o.hIcon.style.display = 'block';
      var sn = RFile.isKnown(fn) ? RFile.extend(fn) : 'unknown';
      o.hIcon.src = top.RContext.context('/ars/img/mime/' + RString.toLower(sn) + '.gif');
      o.hInfoCell.innerText = '';
      o.hFileCell.innerText = fn;
      o.uploadButton.psEnable(true);
   }
}

//==========================================================
// <T>上传文件。</T>
//
// @method
// @param g:arguments:Object 参数对象
//==========================================================
function FUploadWindow_uploadedFile(g){
   var o = this;
   // 检查结果
   if('E' == g.resultCode){
      alert('文件上传错误。请检查后重新上传。\n------------------------------\n' + g.result);
      // 更显按键状态
      o.browserButton.psEnable(true);
      o.uploadButton.psEnable(false);
      o.closeButton.psEnable(true);
      o.hInfoCell.innerText = '请选择要上传的文件...';
      return;
   }
   if('P' == o.mode){
      // 释放上创对象
      var as = o.attributes;
      as.clear();
      as.unpack(g.attributes);
      // 更显按键状态
      o.browserButton.psEnable(true);
      o.uploadButton.psEnable(true);
      o.closeButton.psEnable(true);
      // 设置画面信息
      o.hIcon.style.display = 'block';
      o.hIcon.src = RContext.context('/svr/tmp/' + g.attachment + '.preview');
      o.hInfoCell.innerText = '图片预览生成完毕。';
      o.hFileCell.innerText = '文件：' + o.uploadFileName;
      // 设置宽度
      var v = as.contains('width');
      o.hLine1.style.display = v ? 'block' : 'none';
      if(v){
         o.hLine1.innerText = '宽度：' + as.nvl('width');
      }
      // 设置高度
      var v = as.contains('height');
      o.hLine2.style.display = v ? 'block' : 'none';
      if(v){
         o.hLine2.innerText = '高度：' + as.nvl('height');
      }
      // 设置色深
      var v = as.contains('deep');
      o.hLine3.style.display = v ? 'block' : 'none';
      if(v){
         o.hLine3.innerText = '色深：' + as.nvl('deep');
      }
   }else{
      o.hide();
      var as = new TAttributes();
      as.unpack(g.attributes);
      g.attributes = as;
      o.lsnsUploaded.process(o, g);
   }
}

//==========================================================
// <T>显示上传文件窗口。</T>
//
// @method
//==========================================================
function FUploadWindow_show(){
   var o = this;
   o.base.FWindow.show.call(o);
   RWindow.moveCenter(o.hPanel);
   RWindow.setEnable(false, true);
   o.psVisible(true);
   o.focus();
   // 更显按键状态
   o.browserButton.psEnable(true);
   o.uploadButton.psEnable(false);
   o.closeButton.psEnable(true);
   // 重新设置初始化参数
   o.mode = null;
   if(o.uploadWorker){
      o.uploadWorker.release();
      o.uploadWorker = null;
   }
   o.hInfoCell.innerText = '请选择要上传的文件...';
   o.hFileCell.innerText = '';
   o.hLine1.style.display = 'none';
   o.hLine2.style.display = 'none';
   o.hLine3.style.display = 'none';
   o.uploadButton.psEnable(false);
   o.hIcon.style.display = 'none';
}

//==========================================================
// <T>隐藏上传文件窗口。</T>
//
// @method
//==========================================================
function FUploadWindow_hide(){
   var o = this;
   o.base.FWindow.hide.call(o);
   RWindow.setEnable(true);
}
