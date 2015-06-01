// ============================================================
// FUploadView
// ============================================================
function FUploadView(o){
   o = RClass.inherits(this, o, FContainer);
   // Attribute
   o.type           = null;
   o.page           = 'http://localhost:88/eUIS/apl/logic/transfer/Upload.wa';
   o.path           = null;
   o.id             = null;
   o.dsName         = null;
   o.perpareItem    = null;
   o.items          = new TList();
   // Html
   o.hForm          = null;
   o.hMessages      = null;
   // Process
   o.oeBuild        = FUploadView_oeBuild;
   // Event
   o.onBuildPanel   = FUploadView_onBuildPanel;
   o.onFileSelected = FUploadView_onFileSelected;
   o.onFileUploaded = FUploadView_onFileUploaded;
   o.onClickAddFile = FUploadView_onClickAddFile;
   o.onClickUpload  = FUploadView_onClickUpload;
   // Method
   o.isBuilded      = FUploadView_isBuilded;
   o.doSearch       = FUploadView_doSearch;
   o.selectRow      = FUploadView_selectRow;
   o.pushItem       = FUploadView_pushItem;
   return o;
}
// ---------------------------------------------------------
function FUploadView_oeBuild(event){
   var o = this;
   o.base.FContainer.oeBuild.call(o, event);
   // Form (2colx1row)
   var hTab = RBuilder.appendTable(o.hPanel);
   hTab.width = '100%';
   hTab.height = '100%';
   // .........................................................
   // 建立工具栏
   var hRow = hTab.insertRow();
   var h = o.hTitlePanel = hRow.insertCell();
   h.height = 24;
   var tb = RClass.create(FToolBar);
   tb.width = '100%';
   // 建立添加文件按键
   var tbn = RClass.create(FToolButton);
   tbn.icon = 'ctl.FUploadView_Insert';
   tbn.label = '添加文件...'
   tbn.lsnsClick.register(o, o.onClickAddFile);
   tb.push(tbn);
   // 建立添加按键分隔
   var tbn = RClass.create(FToolButtonSplit);
   tb.push(tbn);
   // 建立开上上传按键
   var tbn = RClass.create(FToolButton);
   tbn.icon = 'ctl.FUploadView_Upload';
   tbn.label = '上传文件'
   tbn.lsnsClick.register(o, o.onClickUpload);
   tb.push(tbn);
   // 建立工具栏内所有按键
   tb.psBuild(h);
   // .........................................................
   // 建立工作区
   o.hFieldsPanel = hTab.insertRow().insertCell();
   o.hFieldsPanel.vAlign = 'top';
   var ht = o.hItemsForm = RBuilder.appendTable(o.hFieldsPanel, null, 1, 1);
   ht.width = '100%';
   var hb = o.hItemsBody  = RBuilder.append(ht, 'TBODY');
   // 建立标题列
   var hh = o.hItemsHead  = RBuilder.append(hb, 'TR');
   var hc = RBuilder.append(hh, 'TD');
   hc.innerText = '文件名称';
   hc.style.width='200px';
   var hc = RBuilder.append(hh, 'TD');
   hc.innerText = '传输状态';
   var hc = RBuilder.append(hh, 'TD');
   hc.innerText = '命令';
   // Button Panel
   return EEventStatus.Stop;
}
// ------------------------------------------------------------
function FUploadView_onBuildPanel(){
   var o = this;
   o.hPanel = RBuilder.append(null, 'DIV');
   o.hPanel.style.zIndex = ELayer.Message;
}
// ---------------------------------------------------------
function FUploadView_onFileSelected(ui){
   var o = this;
   var ui = o.perpareItem;
   o.perpareItem = null;
   o.pushItem(ui);
}
// ---------------------------------------------------------
function FUploadView_onFileUploaded(s, uid){
   var o = this;
   for(var n=0; n<o.items.count; n++){
      var ui = o.items.get(n);
      if(ui.uploadUid == uid){
         ui.onFileUploaded();
      }
   }
}
// ---------------------------------------------------------
function FUploadView_onClickAddFile(){
   var o = this;
   var ui = o.perpareItem;
   if(!o.perpareItem){
      ui = o.perpareItem = RClass.create(FUploadItem);
      ui.page = o.page;
      ui.path = o.path;
      ui.id = o.id;
      ui.dsName = o.dsName;
      ui.lsnsFileSelected.register(o, o.onFileSelected);
   }
   ui.showDialog();
}
// ---------------------------------------------------------
function FUploadView_onClickUpload(){
   var o = this;
   // 获得顶层的监听对象
   var lc = top.RConsole.find(FListenerConsole);
   if(!lc.contains(FUploadView, 'onFileUploaded')){
      lc.register(FUploadView, 'onFileUploaded', o, o.onFileUploaded);
   }
   // 开始处理所有未传输的文件
   for(var n=0; n<o.items.count; n++){
      var ui = o.items.get(n);
      if(EUploadStatus.Local == ui.uploadStatus){
         ui.upload();
      }
   }
}
// ------------------------------------------------------------
function FUploadView_doSearch(){
   var o = this;
   var cs = o.fieldsPanel.components;
   if(cs){
      var sn = new TNode('Search');
      for(var n=0; n<cs.count; n++){
         cs.value(n).saveSearch(sn);
      }
      RLog.debug(o, 'Search value {1}', sn.dump());
   }
   o.hide();
}
// ------------------------------------------------------------
function FUploadView_selectRow(table, row){
   var o = this;
   var fields = o.lovControl.lovFields;
   var dsCtl = o.lovControl.topControl(MDataset);
   if(dsCtl && fields){
      if(!row){
         row = o.listView.selectRow;
      }
      if(row){
         var flds = RString.splitTwo(fields, ',');
         for(var n=0; n<flds.length; n++){
            var v = RString.splitTwo(flds[n], ' ');
            dsCtl.dsSet(RString.nvl(v[1], v[0]), row.get(v[0]));
         }
         dsCtl.loadValue(dsCtl.dsCurrent());
      }
   }
   o.hide();
}
// ------------------------------------------------------------
function FUploadView_isBuilded(){
   return (null != this.listView);
}
// ------------------------------------------------------------
function FUploadView_pushItem(ui){
   var o = this;
   o.items.push(ui);
   ui.psBuild();
   o.hItemsBody.appendChild(ui.hPanel);
}
// ------------------------------------------------------------
