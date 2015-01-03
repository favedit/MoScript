//==========================================================
// <T>附件控件。</T>
//
// @class FEditControl, MEditBorder
// @history 091113 MAOCY 创建
//==========================================================
function FAttachment(o){
   o = RClass.inherits(this, o, FEditControl, MEditBorder);
   //..........................................................
   // @attribute
   o.attributes       = null;
   o.files            = null;
   o.cfgBt            = null;
   o.uploadAble       = null;
   //..........................................................
   // @event
   o.onBuildEdit      = FAttachment_onBuildEdit;
   //..........................................................
   // @method
   o.construct        = FAttachment_construct;
   o.clearValue       = FAttachment_clearValue;
   o.clearItems       = FAttachment_clearItems;
   o.setText          = FAttachment_setText;
   //..........................................................
   // @attribute
   o.editWidth        = '100%';
   o.editHeight       = '100%';
   o.borderStyle      = EBorder.Round;
   o.toolBar          = null;
   o.type             = null;
   o.perpareItem      = null;
   o.items            = new TList();
   o._selectItem      = null;
   o.newNode          = null;
   o.fileTree         = null;
   o.configUrl        = RClass.register(o, new TPtyStr('configUrl'));
   o.configDisp       = RClass.register(o, new TPtyStr('configDisp'));
   //..........................................................
   // @html
   o.hItemsPanel      = null;
   o.onFileSelected   = FAttachment_onFileSelected;
   o.onUploaded       = FAttachment_onUploaded;
   o.onDeleteAfter    = FAttachment_onDeleteAfter;
   o.onClickUpload    = FAttachment_onClickUpload;
   o.onClickDownload  = FAttachment_onClickDownload;
   o.onClickDelete    = FAttachment_onClickDelete;
   o.onClickConfig    = FAttachment_onClickConfig;
   //..........................................................
   // @method
   o.makeMimePath     = FAttachment_makeMimePath;
   o.makeIconPath     = FAttachment_makeIconPath;
   o.makeDownloadPath = FAttachment_makeDownloadPath;
   o.refreshButtons   = FAttachment_refreshButtons;
   o.appendItem       = FAttachment_appendItem;
   o.syncItem         = FAttachment_syncItem;
   o.deleteItem       = FAttachment_deleteItem;
   o.selectItem       = FAttachment_selectItem;
   o.downloadItem     = FAttachment_downloadItem;
   o.text             = RMethod.empty;
   o.setEditable      = FAttachment_setEditable;
   o.dispose          = FAttachment_dispose;
   return o;
}

//==========================================================
// <T>建立编辑控件。</T>
//
// @method
//==========================================================
function FAttachment_onBuildEdit(b){
   var o = this;
   // 建立表单
   var hf = o.hFrom = RBuilder.appendTable(b.hPanel);
   hf.width = '100%';
   hf.height = '100%';
   //..........................................................
   // 建立工具栏
   var htr = o.hTitleBar = hf.insertRow();
   var h = o.hTitlePanel = htr.insertCell();
   h.height = 22;
   var tb = o.toolBar = RClass.create(FToolBar);
   tb.width = '100%';
   // 新建上传按键
   var tbn = o.uploadButton = RClass.create(FToolButton);
   tbn.icon = 'ctl.FAttachment_Upload';
   tbn.label = RContext.get('FAttachment:Upload')
   tbn.lsnsClick.register(o, o.onClickUpload);
   tb.push(tbn);
   // 新建分割按键
   var tbn = RClass.create(FToolButtonSplit);
   tb.push(tbn);
   // 新建下载按键
   var tbn = o.downloadButton = RClass.create(FToolButton);
   tbn.icon = 'ctl.FAttachment_Download';
   tbn.label = RContext.get('FAttachment:Download');
   tbn.lsnsClick.register(o, o.onClickDownload);
   tb.push(tbn);
   // 新建删除按键
   var tbn = o.deleteButton = RClass.create(FToolButton);
   tbn.icon = 'ctl.FAttachment_Delete';
   tbn.label = RContext.get('FAttachment:Delete');
   tbn.lsnsClick.register(o, o.onClickDelete);
   tb.push(tbn);
   // 新建授权按键
   var tbn = o.configButton = RClass.create(FToolButton);
   tbn.icon = 'ctl.ctl';
   tbn.label = RContext.get('FAttachment:Config');
   tbn.lsnsClick.register(o, o.onClickConfig);
   tb.push(tbn);
   // 建立工具栏内所有按键
   tb.psBuild(h);
   tb.hPanel.style.borderLeftColor = '#E4EFFD';
   tb.hPanel.style.borderTopColor = '#E4EFFD';
   //..........................................................
   // 建立工作区
   var hip = o.hItemsPanel = hf.insertRow().insertCell();
   var hi = o.hItems = RBuilder.append(hip, 'DIV')
   hi.style.padding = 4;
   hi.style.width = '100%';
   hi.style.height = '100%';
   hi.style.overflowY = 'auto';
}

//==========================================================
// <T>构建类对象。</T>
//
// @method
//==========================================================
function FAttachment_construct(){
   var o = this;
   o.base.FEditControl.construct.call(o);
   o.attributes = new TAttributes();
   o.files = new TStrings();
}

//==========================================================
// <T>清除数据内容。</T>
//
// @method
//==========================================================
function FAttachment_clearValue(){
   this.clearItems();
}

//==========================================================
// <T>清除数据内容。</T>
//
// @method
//==========================================================
function FAttachment_clearItems(p){
   var o = this;
   var s = o.items;
   var c = s.count;
   for(var n=RInteger.nvl(p); n<c; n++){
      s.get(n).setVisible(false);
   }
}
//==========================================================
// <T>设置文本内容。</T>
//
// @method
// @param t:text:String 文本内容
//==========================================================
function FAttachment_setText(v){
   var o = this;
   // 获得基础信息
   var as = o.attributes;
   as.clear();
   as.unpack(v);
   o.recordCode = as.get('code');
   o.recordGuid = as.get('guid');
   if('Y' == o.configDisp) {
	  o.cfgBt = as.get('CB');
	  o.uploadAble = as.get('UB');
   }
   var fs = o.files;
   fs.clear();
   fs.unpack(as.get('files'));
   // 建立新的项目
   if(!fs.isEmpty()){
      c = fs.count;
      for(var n=0; n<c; n++){
         o.syncItem(n).set(fs.get(n));
      }
   }
   // 清除多余的项目
   o.clearItems(fs.count);
   // 刷新按键
   o._selectItem = null;
   o.refreshButtons();
}
// ---------------------------------------------------------
function FAttachment_onFileSelected(ui){
   var o = this;
   var ui = o.perpareItem;
   o.perpareItem = null;
   o.pushItem(ui);
}
// ---------------------------------------------------------
function FAttachment_onClickDownload(){
   var o = this;
   var si = o._selectItem;
   if(si){
      o.downloadItem(si);
   }
}
//---------------------------------------------------------
function FAttachment_onClickDelete(){
   var o = this;
   var si = o._selectItem;
   if(si){
      o.deleteItem(si);
   }
}
//---------------------------------------------------------
function FAttachment_onClickConfig(){
   var o = this;
   if(o.configUrl){
      var f = RFormSpace.nextForm(o.configUrl);
      f.dsValues = o.topControl().toDeepAttributes();
      f.dsUpdate();
   }
}
// ---------------------------------------------------------
function FAttachment_onClickUpload(){
   var o = this;
   var uw = RConsole.find(FUploadConsole).findWindow();
   var tc = o.topControl();
   uw.fileEdit = true;
   uw.typeCode = 'A';
   uw.recordCode = o.recordCode;
   uw.recordGuid = o.recordGuid;
   uw.recordName = null;
   uw.lsnsUploaded.register(o, o.onUploaded);
   uw.show();
}
//------------------------------------------------------------
function FAttachment_onUploaded(s, g){
   var o = this;
   var c = o.appendItem();
   c.link(g.attributes);
}
//------------------------------------------------------------
function FAttachment_refreshButtons(){
   var o = this;
   var si = o._selectItem;
   if ('Y' == o.configDisp) {
	 o.configButton.setVisible(RBoolean.isTrue(o.cfgBt));
	 if ('I' == o._emode) {
		o.uploadButton.setVisible(true);
		o.downloadButton.setVisible(true);
	    o.deleteButton.setVisible(true);
	    o.downloadButton.psEnable(si);
	    o.deleteButton.psEnable(si);
	    return;
	  } else {
	    o.uploadButton.setVisible(RBoolean.isTrue(o.uploadAble));
	  }
	  if(si) {
	     var at = si.attributes;
	     o.downloadButton.setVisible(si.downloadAble);
	     o.deleteButton.setVisible(si.deleteAble);
	  } else {
		  o.downloadButton.setVisible(false);
	      o.deleteButton.setVisible(false);
	  }
   } else{
	  o.configButton.setVisible(false);
   }
   o.downloadButton.psEnable(si);
   o.deleteButton.psEnable(si);
}
//------------------------------------------------------------
function FAttachment_appendItem(){
   var o = this;
   return o.syncItem(o.items.count);
}
//------------------------------------------------------------
function FAttachment_onDeleteAfter(s, g){
   var o = this;
   var bi = g.item;
   o.items.extract(bi);
   o.items.append(bi);
   bi.hide();
   // 刷新按键
   o._selectItem = null;
   o.refreshButtons();
}
//------------------------------------------------------------
function FAttachment_makeMimePath(m){
   var o = this;
   var p = 'unknown'
   if(RFile.isKnown(m)){
      p = RString.toLower(m);
   }
   return top.RContext.context('/ars/img/mime/' + p + '.gif');
}
//------------------------------------------------------------
function FAttachment_makeIconPath(n, g, m){
   var o = this;
   var s = '/svr/' + n + '/sys/' + o.recordCode + '/' + o.recordGuid + '/' + g + '.icon.' + m;
   return top.RContext.context(RString.toLower(s))
}
//------------------------------------------------------------
function FAttachment_makeDownloadPath(n, g, m){
   var o = this;
   var s = '/svr/' + n + '/sys/' + o.recordCode + '/' + o.recordGuid + '/' + g + '.' + m;
   var p = 'Download'
   if(RFile.inPicture(m)){
      p = 'DownloadPicture'
   }
   return top.RContext.context('/apl/logic/transfer/' + p + '.wa?r=') + RString.toLower(s);
}
//------------------------------------------------------------
function FAttachment_deleteItem(bi){
   var o = this;
   if(bi){
      if(confirm(RContext.get('FAttachment:delete.confim', bi.path))){
         var g = new TUploadArg();
         g.item = bi;
         g.guid = bi.guid;
         g.callback = new TInvoke(o, o.onDeleteAfter);
         RConsole.find(FUploadConsole).deleteFile(g);
      }
   }
}
//------------------------------------------------------------
function FAttachment_syncItem(n){
   var o = this;
   var is = o.items;
   var c = is.get(n);
   if(!c){
      for(var i=o.items.count; i<=n; i++){
         c = RControl.create(FBrowserItem, o.hItems);
         c.browser = o;
         o.items.push(c);
      }
   }
   c.setVisible(true);
   return c;
}
//------------------------------------------------------------
function FAttachment_selectItem(bi){
   var o = this;
   var si = o._selectItem;
   if(si){
      si.select(false);
   }
   bi.select(true);
   o._selectItem = bi;
   // 刷新按键
   o.refreshButtons();
}
//------------------------------------------------------------
function FAttachment_downloadItem(bi){
   var o = this;
   var fm = RHtml.form(o.hPanel);
   var t = fm.target;
   fm.target = '_blank';
   fm.action = o.makeDownloadPath(bi.network, bi.guid, bi.mime);
   fm.submit();
   fm.target = t;
}
// ------------------------------------------------------------
function FAttachment_setEditable(v){
   var o = this;
   o.hTitleBar.style.display = v ? 'block' : 'none';
   return o.base.FEditControl.setEditable.call(o, v);
}
// ------------------------------------------------------------
function FAttachment_dispose(){
   var o = this;
   o.base.FEditControl.dispose.call(o);
   o.toolBar.dispose();
   o.toolBar = null;
   o.hItemsPanel = null;
}
// ------------------------------------------------------------
