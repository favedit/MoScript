//==========================================================
// <T>附件控件。</T>
//
// @class FEditControl, MEditBorder
// @history 091113 MAOCY 创建
//==========================================================
function FBrowser(o){
   o = RClass.inherits(this, o, FEditControl, MEditBorder);
   //..........................................................
   // @attribute
   o.attributes       = null;
   o.files            = null;
   //..........................................................
   // @method
   o.construct        = FBrowser_construct;
   o.clearValue       = FBrowser_clearValue;
   o.clearItems       = FBrowser_clearItems;
   o.setText          = FBrowser_setText;



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
   //..........................................................
   // @html
   o.hItemsPanel      = null;
   //..........................................................
   // @event
   o.onBuildEdit      = FBrowser_onBuildEdit;
   o.onFileSelected   = FBrowser_onFileSelected;
   o.onUploaded       = FBrowser_onUploaded;
   o.onDeleteAfter    = FBrowser_onDeleteAfter;
   o.onClickUpload    = FBrowser_onClickUpload;
   o.onClickDownload  = FBrowser_onClickDownload;
   o.onClickDelete    = FBrowser_onClickDelete;
   //..........................................................
   // @method
   o.makeMimePath     = FBrowser_makeMimePath;
   o.makeIconPath     = FBrowser_makeIconPath;
   o.makeDownloadPath = FBrowser_makeDownloadPath;
   o.refreshButtons   = FBrowser_refreshButtons;
   o.appendItem       = FBrowser_appendItem;
   o.syncItem         = FBrowser_syncItem;
   o.deleteItem       = FBrowser_deleteItem;
   o.selectItem       = FBrowser_selectItem;
   o.downloadItem     = FBrowser_downloadItem;
   o.text             = RMethod.empty;
   o.setEditable      = FBrowser_setEditable;
   o.dispose          = FBrowser_dispose;
   return o;
}

//==========================================================
// <T>构建类对象。</T>
//
// @method
//==========================================================
function FBrowser_construct(){
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
function FBrowser_clearValue(){
   this.clearItems();
}

//==========================================================
// <T>清除数据内容。</T>
//
// @method
//==========================================================
function FBrowser_clearItems(p){
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
function FBrowser_setText(v){
   var o = this;
   // 获得基础信息
   var as = o.attributes;
   as.clear();
   as.unpack(v);
   o.recordCode = as.get('code');
   o.recordGuid = as.get('guid');
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













//----------------------------------------------------------
function FBrowser_onBuildEdit(b){
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
   tbn.icon = 'ctl.FBrowser_Upload';
   tbn.label = RContext.get('FBrowser:Upload')
   tbn.lsnsClick.register(o, o.onClickUpload);
   tb.push(tbn);
   // 新建分割按键
   var tbn = RClass.create(FToolButtonSplit);
   tb.push(tbn);
   // 新建下载按键
   var tbn = o.downloadButton = RClass.create(FToolButton);
   tbn.icon = 'ctl.FBrowser_Download';
   tbn.label = RContext.get('FBrowser:Download');
   tbn.lsnsClick.register(o, o.onClickDownload);
   tb.push(tbn);
   // 新建删除按键
   var tbn = o.deleteButton = RClass.create(FToolButton);
   tbn.icon = 'ctl.FBrowser_Delete';
   tbn.label = RContext.get('FBrowser:Delete');
   tbn.lsnsClick.register(o, o.onClickDelete);
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
// ---------------------------------------------------------
function FBrowser_onFileSelected(ui){
   var o = this;
   var ui = o.perpareItem;
   o.perpareItem = null;
   o.pushItem(ui);
}
// ---------------------------------------------------------
function FBrowser_onClickDownload(){
   var o = this;
   var si = o._selectItem;
   if(si){
      o.downloadItem(si);
   }
}
//---------------------------------------------------------
function FBrowser_onClickDelete(){
   var o = this;
   var si = o._selectItem;
   if(si){
      o.deleteItem(si);
   }
}
// ---------------------------------------------------------
function FBrowser_onClickUpload(){
   var o = this;
   var uw = RConsole.find(FUploadConsole).findWindow();
   var tc = o.topControl();
   uw.recordCode = o.recordCode;
   uw.recordGuid = o.recordGuid;
   uw.lsnsUploaded.register(o, o.onUploaded);
   uw.show();
}
//------------------------------------------------------------
function FBrowser_onUploaded(s, g){
   var o = this;
   var c = o.appendItem();
   c.link(g.attributes);
}
//------------------------------------------------------------
function FBrowser_refreshButtons(){
   var o = this;
   var si = o._selectItem;
   o.downloadButton.psEnable(si);
   o.deleteButton.psEnable(si);
}
//------------------------------------------------------------
function FBrowser_appendItem(){
   var o = this;
   return o.syncItem(o.items.count);
}
//------------------------------------------------------------
function FBrowser_onDeleteAfter(s, g){
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
function FBrowser_makeMimePath(m){
   var o = this;
   var p = 'unknown'
   if(RFile.isKnown(m)){
      p = RString.toLower(m);
   }
   return top.RContext.context('/ars/img/mime/' + p + '.gif');
}
//------------------------------------------------------------
function FBrowser_makeIconPath(n, g, m){
   var o = this;
   var s = '/svr/' + n + '/sys/' + o.recordCode + '/' + o.recordGuid + '/' + g + '.icon.' + m;
   return top.RContext.context(RString.toLower(s))
}
//------------------------------------------------------------
function FBrowser_makeDownloadPath(n, g, m){
   var o = this;
   var s = '/svr/' + n + '/sys/' + o.recordCode + '/' + o.recordGuid + '/' + g + '.' + m;
   return top.RContext.context('/apl/logic/transfer/Download.wa?r=') + RString.toLower(s);
}
//------------------------------------------------------------
function FBrowser_deleteItem(bi){
   var o = this;
   if(bi){
      if(confirm('确认要删除文件[' + bi.path + ']么？')){
         var g = new TUploadArg();
         g.item = bi;
         g.guid = bi.guid;
         g.callback = new TInvoke(o, o.onDeleteAfter);
         RConsole.find(FUploadConsole).deleteFile(g);
      }
   }
}
//------------------------------------------------------------
function FBrowser_syncItem(n){
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
function FBrowser_selectItem(bi){
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
function FBrowser_downloadItem(bi){
   var o = this;
   var fm = RHtml.form(o.hPanel)
   fm.target = '_blank';
   fm.action = o.makeDownloadPath(bi.network, bi.guid, bi.mime);
   fm.submit();
}
// ------------------------------------------------------------
function FBrowser_setEditable(v){
   var o = this;
   o.hTitleBar.style.display = v ? 'block' : 'none';
   return o.base.FEditControl.setEditable.call(o, v);
}
// ------------------------------------------------------------
function FBrowser_dispose(){
   var o = this;
   o.base.FEditControl.dispose.call(o);
   o.toolBar.dispose();
   o.toolBar = null;
   o.hItemsPanel = null;
}
// ------------------------------------------------------------
