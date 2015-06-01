// ============================================================
// FFileBrowser
// ============================================================
function FFileBrowser(o){
   o = RClass.inherits(this, o, FContainer, MValue, MEditDescriptor);
   // Attribute
   o.type            = null;
   o.perpareItem     = null;
   o.items           = new TList();
   o.dsName          = null;
   o.id              = null;
   // Html 
   o.hForm           = null;
   o.newNode         = null;
   o.fileTree        = null;
   o.hMessages       = null;
   // Process
   o.oeBuild         = FFileBrowser_oeBuild;
   // Event
   o.onBuildPanel    = FFileBrowser_onBuildPanel;
   o.onClickUpload   = FFileBrowser_onClickUpload;
   // Method
   o.onClickDownload = FFileBrowser_onClickDownload;
   o.onClickDelete   = FFileBrowser_onClickDelete;
   o.onClickNew      = FFileBrowser_onClickNew;
   o.onBuildTree     = FFileBrowser_onBuildTree;
   o.onFileSelected  = FFileBrowser_onFileSelected;
   o.saveValue       = FFileBrowser_saveValue;
   o.loadValue       = FFileBrowser_loadValue;
   o.newFolder       = FFileBrowser_newFolder;
   o.parseToNode     = FFileBrowser_parseToNode;
   o.onLoaded        = FFileBrowser_onLoaded;
   o.refresh         = FFileBrowser_refresh;
   o.resetValue      = FFileBrowser_resetValue;
   o.loadDefault     = FFileBrowser_loadDefault;
   o.reget           = FFileBrowser_reget;
   o.get             = FFileBrowser_get;
   // Method
   o.set             = FFileBrowser_set;
   return o;
}
// ---------------------------------------------------------
function FFileBrowser_oeBuild(event){
   var o = this;
   o.base.FContainer.oeBuild.call(o, event);
   // Form (2colx1row)
   var hTab = RBuilder.appendTable(o.hPanel);
   hTab.style.border = '1px solid #00CCCC';
   hTab.width = '100%';
   hTab.height = '100%';
   // .........................................................
   // 建立工具栏
   var hRow = hTab.insertRow();
   var h = o.hTitlePanel = hRow.insertCell();
   h.height = 24;
   var tb = RClass.create(FToolBar);
   tb.width = '100%';
   // 新建上传按键
   var tbn = RClass.create(FToolButton);
   tbn.icon = 'ctl.FUploadView_Insert';
   tbn.label = RContext.get('FFileBrowser:Upload')
   tbn.lsnsClick.register(o, o.onClickUpload);
   tb.push(tbn);
   // 新建下载按键
   var tbn = RClass.create(FToolButton);
   tbn.icon = 'ctl.FUploadView_Upload';
   tbn.label = RContext.get('FFileBrowser:Download');
   tbn.lsnsClick.register(o, o.onClickDownload);
   tb.push(tbn);
   // 新建删除按键
   var tbn = RClass.create(FToolButton);
   tbn.icon = 'ctl.FUploadView_Upload';
   tbn.label = RContext.get('FFileBrowser:Delete');
   tbn.lsnsClick.register(o, o.onClickDelete);
   tb.push(tbn);
   // 建立工具栏内所有按键
   tb.psBuild(h);
   // .........................................................
   // 建立工作区
   o.hFieldsPanel = hTab.insertRow().insertCell();
   o.hFieldsPanel.vAlign = 'top';
//   var ht = o.hItemsForm = RBuilder.appendDiv(o.hFieldsPanel, null, 1, 1);
//   ht.width = '100%';
   o.onBuildTree();
   // Button Panel
   return EEventStatus.Stop;
}
// ------------------------------------------------------------
function FFileBrowser_onBuildPanel(){
   var o = this;
   o.hPanel = RBuilder.append(null, 'DIV');
   o.hPanel.style.zIndex = 0;
}
// ---------------------------------------------------------
function FFileBrowser_onFileSelected(ui){
   var o = this;
   var ui = o.perpareItem;
   o.perpareItem = null;
   o.pushItem(ui);
}
// ---------------------------------------------------------
function FFileBrowser_onClickDownload(){
   var o = this;
   document.execCommand("saveAs");
}
//---------------------------------------------------------
function FFileBrowser_onClickNew(){
   var o = this;
   var iw = top.RControl.create(FInputWindow);
   iw.source = true;
   iw.lsns.register(o, o.newFolder);
   iw.show();
}
//---------------------------------------------------------
function FFileBrowser_newFolder(name){
   var o = this;
   var n = RControl.create(FTreeNode);
   n.name = name;
   n.label = name;
   n.tree = o.fileTree;
   n.parent = RObject.nvl(o.fileTree.focusNode, o.fileTree.rootNode);
   n.attributes.set('FILE_TYPE', '文件夹');
   n.icon = 'ctl.FFileBrowser_Folder';
   n.build(0);
   n.parent.push(n);
   o.fileTree.allNodes.push(n);
}
//---------------------------------------------------------
function FFileBrowser_onClickDelete(){
   var o = this;
   if(confirm('Are you sure about it ?')){
      var fn = o.fileTree.focusNode
      o.fileTree.removeNodes(fn);
      var doc = new TXmlDocument();
      var root = doc.root();
      root.set('action', 'remove');
      var nd = new TNode('Node',fn.attributes);
      nd.set("path", fn.getFullPath());
      root.push(nd);
      // 获取返回节点
      var url = RService.url('logic.webform.store');
      var e = new TEvent(o, EXmlEvent.SyncSend);
      e.url = url;
      e.document = doc;
      e.action = EDataAction.Update;
      RConsole.find(FXmlConsole).process(e);
   }
}
// ---------------------------------------------------------
function FFileBrowser_onClickUpload(){
   var o = this;
   var uw = RConsole.find(FUploadConsole).findWindow();
   var tc = o.topControl();
   uw.recordType = tc.dsName;
   uw.recordId = tc.component('OUID').reget();
   uw.show();

   //uploadView.path = s;
   //uploadView.id = o.topControl().component('OUID').get();
   //uploadView.dsName = o.dsName;
   //uploadView.source = o;
   //uploadView.show();
   /*var s = '';
   o.dsName = o.topControl().dsName;
   if(o.fileTree.focusNode){
     if(o.fileTree.focusNode.attributes.get('FILE_TYPE') == 'Folder'){
         s = o.fileTree.focusNode.getFullPath();
     }else{
        alert("Folder invalid");
        return;
     }
   }
   var uploadView = RConsole.find(FUploadViewConsole).find();
   uploadView.path = s;
   uploadView.id = o.topControl().component('OUID').get();
   uploadView.dsName = o.dsName;
   uploadView.source = o;
   uploadView.show();*/
}
//---------------------------------------------------------
function FFileBrowser_onBuildTree(){
   var o = this;
   var ht = o.fileTree = RControl.create(FTreeView, o.hFieldsPanel);
   var col1 = RControl.create(FTreeColumn);
   col1.hPanel.innerText='Folder';
   ht.tempAppendChild(col1);
   col1.tree = ht;
   col1.dataName = 'NAME'
   ht.columns.set(col1.dataName, col1);
   var col2 = RControl.create(FTreeColumn);
   col2.hPanel.innerText='Type';
   ht.tempAppendChild(col2);
   col2.tree = ht;
   col2.dataName = 'FILE_TYPE'
   ht.columns.set(col2.dataName, col2);
   var col4 = RControl.create(FTreeColumn);
   col4.hPanel.innerText='Size';
   ht.tempAppendChild(col4);
   col4.tree = ht;
   col4.dataName = 'DATA_SIZE';
    ht.columns.set(col4.dataName, col4);
   var col5 = RControl.create(FTreeColumn);
   col5.hPanel.innerText='Date';
   ht.tempAppendChild(col5);
   col5.tree = ht;
   col5.dataName = 'DATA_DATE';
    ht.columns.set(col5.dataName, col5);

}
//------------------------------------------------------------
function FFileBrowser_set(v){
   var o = this;
   var fs = new TStrings();
   fs.unpack(v);
   var xTree = o.parseToNode(fs);
   if(o.fileTree.rootNode.hasChild()){
      o.fileTree.clearNodes(o.fileTree.rootNode);
   }
   o.fileTree.tempAppendNodes(null, xTree);
}

//------------------------------------------------------------
function FFileBrowser_parseToNode(fs){
   var o = this;
   var root = new TNode("Config");
   for(var m = 0; m < fs.count; m++){
     var pNode = root;
     var s = fs.get(m);
      var ts = new TAttributes();
      ts.unpack(s);
      var name = ts.get('path');
      var ns = RString.split(name, '/');
      for(var n = 0; n < ns.length; n++){
        var ss = ns[n];
        if(null == root.findNode('label', ss)){  
            var nd = new TNode('TreeNode');
            nd.set('label', ss);
            nd.set('name', ss);
            if(n != ns.length -1){
              nd.set('FILE_TYPE', 'Folder');
              nd.set('child', 'Y');
            }else{
               nd.set('OUID', ts.get('OUID'));
               nd.set('FILE_TYPE', ts.get('MIME_TYPE'));
              nd.set('DATA_SIZE', RInt.parse(ts.get('DATA_SIZE'))/1000+'KB');
              nd.set('DATA_DATE', RDate.formatDate(RDate.autoParse(null, ts.get('DATA_DATE')),'yyyy-mm-dd'));
              nd.set('child', 'N');
            }
            pNode.push(nd);
            pNode = nd;
        }else{
           pNode = root.findNode('label', ss);
         }
      }
   }
   return root;
}
// ------------------------------------------------------------
function FFileBrowser_loadValue(c, t){
   var o = this;
   var d = o.descriptor();
   if(EStore.Name == t){
      o.set(c.get(d.name));
   }else if(EStore.DataNvl == t){
      if(c.contains(d.dataName)){
        o.set(c.get(d.dataName));
      }
   }else if(EStore.Reset == t){
      o.set(RString.EMPTY);
   }else{
      o.set(c.get(d.dataName));
   }
}
// ------------------------------------------------------------
// config, type
function FFileBrowser_saveValue(c, t){
   var o = this;
   var d = o.descriptor();
   if(EStore.Name == t){
      c.set(d.name, o.reget());
   }else{
      c.set(d.dataName, o.reget());
   }
}
//------------------------------------------------------------
function FFileBrowser_refresh(){
   var m = this.topControl(MDataset);
   m.dsFetch(true);
}

//------------------------------------------------------------
function FFileBrowser_onLoaded(e){
   alert();
}

//------------------------------------------------------------
function FFileBrowser_resetValue(){
   return;
}

//------------------------------------------------------------
function FFileBrowser_loadDefault(){
   return;
}

//------------------------------------------------------------
function FFileBrowser_get(){
   return null;
}

//------------------------------------------------------------
function FFileBrowser_reget(){
   return null;
}