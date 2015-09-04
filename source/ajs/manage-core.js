MO.FManageCatalogContent = function FManageCatalogContent(o){
   o = MO.Class.inherits(this, o, MO.FDuiForm);
   o.onButtonClick = MO.FManageCatalogContent_onButtonClick;
   o.onBuilded     = MO.FManageCatalogContent_onBuilded;
   o.construct     = MO.FManageCatalogContent_construct;
   o.dispose       = MO.FManageCatalogContent_dispose;
   return o;
}
MO.FManageCatalogContent_onButtonClick = function FManageCatalogContent_onButtonClick(event){
   var o = this;
   var button = event.sender;
   var frameName = button.attributeGet('frame_name');
   MO.Assert.debugNotEmpty(frameName);
   var frame = o._frameSet.selectObject(frameName);
   frame.psMode(MO.EUiMode.Update);
   frame.psRefresh();
   if(MO.Class.isClass(frame, MO.FDuiFormFrame)){
      frame.dataModify();
   }else if(MO.Class.isClass(frame, MO.FDuiTableFrame)){
      frame._dsPageSize = 20;
      frame._dsPage = 0;
      frame.doFetch();
   }
   var historyBar = o._frameSet._historyBar;
   historyBar.historyClear();
   var historyButton = historyBar.historyPush();
   historyButton.setLabel(frame.label());
   historyButton.attributeSet('frame_name', frame.name());
}
MO.FManageCatalogContent_onBuilded = function FManageCatalogContent_onBuilded(event){
   var o = this;
   o.__base.FDuiForm.onBuilded.call(o, event);
   var buttons = new MO.TObjects();
   o.searchComponents(buttons, MO.FDuiSliderButton);
   var count = buttons.count();
   for(var i = 0; i < count; i++){
      var button = buttons.at(i);
      button.addClickListener(o, o.onButtonClick);
   }
}
MO.FManageCatalogContent_construct = function FManageCatalogContent_construct(){
   var o = this;
   o.__base.FDuiForm.construct.call(o);
}
MO.FManageCatalogContent_dispose = function FManageCatalogContent_dispose(){
   var o = this;
   o.__base.FDuiForm.dispose.call(o);
}
MO.FManageCatalogToolBar = function FManageCatalogToolBar(o){
   o = MO.Class.inherits(this, o, MO.FDuiToolBar);
   o._listFrameName = null;
   o.onSearchClick  = MO.FManageCatalogToolBar_onSearchClick;
   o.onRefreshClick = MO.FManageCatalogToolBar_onRefreshClick;
   o.onListClick    = MO.FManageCatalogToolBar_onListClick;
   o.onBuilded      = MO.FManageCatalogToolBar_onBuilded;
   o.construct      = MO.FManageCatalogToolBar_construct;
   o.dispose        = MO.FManageCatalogToolBar_dispose;
   return o;
}
MO.FManageCatalogToolBar_onSearchClick = function FManageCatalogToolBar_onSearchClick(event){
}
MO.FManageCatalogToolBar_onRefreshClick = function FManageCatalogToolBar_onRefreshClick(event){
   var o = this;
   var catalog = o._frameSet._catalogContent;
   catalog.reloadNode();
}
MO.FManageCatalogToolBar_onListClick = function FManageCatalogToolBar_onListClick(event){
   var o = this;
   o._frameSet.selectObject(o._listFrameName);
}
MO.FManageCatalogToolBar_onBuilded = function FManageCatalogToolBar_onBuilded(p){
   var o = this;
   o.__base.FDuiToolBar.onBuilded.call(o, p);
}
MO.FManageCatalogToolBar_construct = function FManageCatalogToolBar_construct(){
   var o = this;
   o.__base.FDuiToolBar.construct.call(o);
}
MO.FManageCatalogToolBar_dispose = function FManageCatalogToolBar_dispose(){
   var o = this;
   o.__base.FDuiToolBar.dispose.call(o);
}
MO.FManageDataForm = function FManageDataForm(o){
   o = MO.Class.inherits(this, o, MO.FDuiFormFrame);
   o._containerName = MO.Class.register(o, new MO.AGetSet('_containerName'));
   o._itemName      = MO.Class.register(o, new MO.AGetSet('_itemName'));
   o.onButtonClick  = MO.FManageDataForm_onButtonClick;
   o.onBuilded      = MO.FManageDataForm_onBuilded;
   o.onDataDetail   = MO.FManageDataForm_onDataDetail;
   o.onDataChanged  = MO.FManageDataForm_onDataChanged;
   o.onDataLoad     = MO.FManageDataForm_onDataLoad;
   o.onDataSave     = MO.FManageDataForm_onDataSave;
   o.onDataDelete   = MO.FManageDataForm_onDataDelete;
   o.construct      = MO.FManageDataForm_construct;
   o.doDetail       = MO.FManageDataForm_doDetail;
   o.doPrepare      = MO.FManageDataForm_doPrepare;
   o.doLoad         = MO.FManageDataForm_doLoad;
   o.doSave         = MO.FManageDataForm_doSave;
   o.doDelete       = MO.FManageDataForm_doDelete;
   o.dispose        = MO.FManageDataForm_dispose;
   return o;
}
MO.FManageDataForm_onButtonClick = function FManageDataForm_onButtonClick(event){
   var o  = this;
   var button = event.sender;
   var attributes = button.attributes();
   if(attributes){
      var action = attributes.get('action');
      switch(action){
         case 'insert':
            o.doPrepare(attributes);
            break;
         case 'save':
            o.doSave();
            break;
         case 'delete':
            o.doDelete();
            break;
         case 'sort':
            o.doSort();
            break;
      }
   }
}
MO.FManageDataForm_onBuilded = function FManageDataForm_onBuilded(event){
   var o = this;
   o.__base.FDuiFormFrame.onBuilded.call(o, event);
   var buttons = new MO.TObjects();
   o.searchComponents(buttons, MO.MUiToolButton);
   o.searchComponents(buttons, MO.MUiMenuButton);
   var count = buttons.count();
   for(var i = 0; i < count; i++){
      var button = buttons.at(i);
      button.addClickListener(o, o.onButtonClick);
   }
}
MO.FManageDataForm_onDataChanged = function FManageDataForm_onDataChanged(event){
   var o  = this;
   o.__base.FDuiFormFrame.onDataChanged.call(o, event);
}
MO.FManageDataForm_onDataDetail = function FManageDataForm_onDataDetail(event){
   var o = this;
   var xservice = event.content;
   var xcontent = xservice.findNode('Content');
   var source = MO.Class.create(MO.FDataSource);
   source.loadConfig(xcontent);
   var dataset = source.currentDataset();
   var row = dataset.rows().first();
   o.loadUnit(row);
   MO.Console.find(MO.FDuiDesktopConsole).hide();
}
MO.FManageDataForm_onDataLoad = function FManageDataForm_onDataLoad(event){
   var o = this;
   var xcontent = event.content;
   var xunit = xcontent.nodes().first();
   o.loadUnit(xunit);
}
MO.FManageDataForm_onDataSave = function FManageDataForm_onDataSave(event){
   var o = this;
   var historyBar = o._frameSet._historyBar;
   var historyButton = historyBar.historyPop();
   var frameName = historyButton.attributeGet('frame_name');
   var frame = o._frameSet.selectSpaceFrame(frameName);
   if(MO.Class.isClass(frame, MO.FDuiTableFrame)){
      frame.doFetch();
   }
   MO.Console.find(MO.FDuiDesktopConsole).hide();
}
MO.FManageDataForm_onDataDelete = function FManageDataForm_onDataDelete(event){
   var o = this;
   MO.Console.find(MO.FDuiDesktopConsole).hide();
}
MO.FManageDataForm_construct = function FManageDataForm_construct(){
   var o = this;
   o.__base.FDuiFormFrame.construct.call(o);
}
MO.FManageDataForm_doDetail = function FManageDataForm_doDetail(row){
   var o = this;
   MO.Console.find(MO.FDuiDesktopConsole).showProgress();
   var xdocument = new MO.TXmlDocument();
   var xroot = xdocument.root();
   var xcontent = xroot.create('Content');
   xcontent.set('frame_name', o._name);
   var xrow = xcontent.create('Row');
   row.saveDataRow(xrow);
   o.dataModify();
   o.psMode(MO.EUiMode.Update);
   var url = MO.Lang.String.format('/cloud.logic.frame.ws?action=detail');
   var connection = MO.Console.find(MO.FXmlConsole).sendAsync(url, xdocument);
   connection.addLoadListener(o, o.onDataDetail);
}
MO.FManageDataForm_doPrepare = function FManageDataForm_doPrepare(){
   var o = this;
   o.dataPrepare();
   o.psMode(MO.EUiMode.Insert);
}
MO.FManageDataForm_doLoad = function FManageDataForm_doLoad(typeGroup, containerName, itemName){
   var o = this;
   o._containerName = containerName;
   o._itemName = itemName;
   o._logicGroup = typeGroup;
   var url = MO.Lang.String.format('/{1}.ws?action=query&group={2}&container={3}&item={4}', o._logicService, typeGroup, o._containerName, o._itemName);
   var connection = MO.Console.find(MO.FXmlConsole).send(url);
   connection.addLoadListener(o, o.onDataLoad);
}
MO.FManageDataForm_doSave = function FManageDataForm_doSave(){
   var o = this;
   var dataSource = MO.Class.create(MO.FDataSource);
   o.dsSaveSource(dataSource);
   MO.Console.find(MO.FDuiDesktopConsole).showProgress();
   var xdocument = new MO.TXmlDocument();
   var xroot = xdocument.root();
   var xcontent = xroot.create('Content');
   xcontent.set('frame_name', o._name);
   dataSource.saveConfig(xcontent);
   var url = MO.Lang.String.format('/cloud.logic.frame.ws?action=save');
   var connection = MO.Console.find(MO.FXmlConsole).sendAsync(url, xdocument);
   connection.addLoadListener(o, o.onDataSave);
}
MO.FManageDataForm_doDelete = function FManageDataForm_doDelete(){
   var o = this;
   o._dataActionCd = MO.EUiDataAction.Delete;
   o.dataErase();
   o.doSave();
}
MO.FManageDataForm_dispose = function FManageDataForm_dispose(){
   var o = this;
   o.__base.FDuiFormFrame.dispose.call(o);
}
MO.FManageDataTable = function FManageDataTable(o){
   o = MO.Class.inherits(this, o, MO.FDuiTableFrame);
   o.onCellClick    = MO.FManageDataTable_onCellClick;
   o.onRowClick     = MO.FManageDataTable_onRowClick;
   o.onButtonClick  = MO.FManageDataTable_onButtonClick;
   o.onBuilded      = MO.FManageDataTable_onBuilded;
   o.onDataChanged  = MO.FManageDataTable_onDataChanged;
   o.onDataFetch    = MO.FManageDataTable_onDataFetch;
   o.onDataSave     = MO.FManageDataTable_onDataSave;
   o.onDataDelete   = MO.FManageDataTable_onDataDelete;
   o.construct      = MO.FManageDataTable_construct;
   o.dsMovePage     = MO.FManageDataTable_dsMovePage;
   o.doFetch        = MO.FManageDataTable_doFetch;
   o.doPrepare      = MO.FManageDataTable_doPrepare;
   o.doSave         = MO.FManageDataTable_doSave;
   o.doDelete       = MO.FManageDataTable_doDelete;
   o.dispose        = MO.FManageDataTable_dispose;
   return o;
}
MO.FManageDataTable_onCellClick = function FManageDataTable_onCellClick(event){
   var o = this;
   var cell = event.cell;
   if(MO.Class.isClass(cell, MO.FDuiCellStatus)){
      var row = event.row;
      var unitFrameName = o._unitFrameName;
      MO.Assert.debugNotEmpty(unitFrameName);
      var unitFrame = o._frameSet.selectSpaceFrame(unitFrameName);
      unitFrame.doDetail(row);
      var historyBar = o._frameSet._historyBar;
      var historyButton = historyBar.historyPush();
      historyButton.setLabel(unitFrame.label());
      historyButton.attributeSet('frame_name', unitFrame.name());
   }
}
MO.FManageDataTable_onRowClick = function FManageDataTable_onRowClick(event){
   var o = this;
   return;
   var row = event.row;
   var unitFrameName = o._unitFrameName;
   MO.Assert.debugNotEmpty(unitFrameName);
   var unitFrame = o._frameSet.selectSpaceFrame(unitFrameName);
   unitFrame.doDetail(row);
   var historyBar = o._frameSet._historyBar;
   var historyButton = historyBar.historyPush();
   historyButton.setLabel(unitFrame.label());
   historyButton.attributeSet('frame_name', unitFrame.name());
}
MO.FManageDataTable_onButtonClick = function FManageDataTable_onButtonClick(event){
   var o  = this;
   var button = event.sender;
   var attributes = button.attributes();
   if(attributes){
      var action = attributes.get('action');
      switch(action){
         case 'insert':
            o.doPrepare(attributes);
            break;
         case 'save':
            o.doSave();
            break;
         case 'delete':
            o.doDelete();
            break;
         case 'sort':
            o.doSort();
            break;
      }
   }
}
MO.FManageDataTable_onBuilded = function FManageDataTable_onBuilded(event){
   var o = this;
   o.__base.FDuiTableFrame.onBuilded.call(o, event);
   var buttons = new MO.TObjects();
   o.searchComponents(buttons, MO.MUiToolButton);
   o.searchComponents(buttons, MO.MUiMenuButton);
   var count = buttons.count();
   for(var i = 0; i < count; i++){
      var button = buttons.at(i);
      button.addClickListener(o, o.onButtonClick);
   }
   o.addCellClickListener(o, o.onCellClick);
}
MO.FManageDataTable_onDataChanged = function FManageDataTable_onDataChanged(event){
   var o  = this;
   o.__base.FDuiTableFrame.onDataChanged.call(o, event);
}
MO.FManageDataTable_onDataFetch = function FManageDataTable_onDataFetch(event){
   var o = this;
   var xservice = event.content;
   var xcontent = xservice.findNode('Content');
   var source = MO.Class.create(MO.FDataSource);
   source.loadConfig(xcontent);
   var dataset = source.currentDataset();
   o.clearRows();
   o.loadDataset(dataset);
   MO.Console.find(MO.FDuiDesktopConsole).hide();
}
MO.FManageDataTable_onDataSave = function FManageDataTable_onDataSave(event){
   var o = this;
   MO.Console.find(MO.FDuiDesktopConsole).hide();
}
MO.FManageDataTable_onDataDelete = function FManageDataTable_onDataDelete(event){
   var o = this;
   MO.Console.find(MO.FDuiDesktopConsole).hide();
}
MO.FManageDataTable_construct = function FManageDataTable_construct(){
   var o = this;
   o.__base.FDuiTableFrame.construct.call(o);
}
MO.FManageDataTable_dsMovePage = function FManageDataTable_dsMovePage(actionCd){
   var o = this;
   var dataset = o._dataset;
   var pageSize = dataset.pageSize();
   var pageCount = dataset.pageCount();
   var page = dataset.page();
   var movePage = page;
   switch(actionCd){
      case MO.EUiDataAction.First:
         movePage = 0;
         break;
      case MO.EUiDataAction.Prior:
         if(page > 1){
            movePage--;
         }
         break;
      case MO.EUiDataAction.Next:
         if(page < pageCount - 1){
            movePage++;
         }
         break;
      case MO.EUiDataAction.Last:
         movePage = pageCount - 1;
         break;
   }
   if(movePage != page){
      o._dsPageSize = pageSize;
      o._dsPage = movePage;
      o.doFetch();
   }
}
MO.FManageDataTable_doFetch = function FManageDataTable_doFetch(){
   var o = this;
   MO.Console.find(MO.FDuiDesktopConsole).showProgress();
   var xdocument = new MO.TXmlDocument();
   var xroot = xdocument.root();
   var xcontent = xroot.create('Content');
   xcontent.set('frame_name', o._name);
   xcontent.set('page_size', o._dsPageSize);
   xcontent.set('page', o._dsPage);
   var url = MO.Lang.String.format('/cloud.logic.frame.ws?action=fetch');
   var connection = MO.Console.find(MO.FXmlConsole).sendAsync(url, xdocument);
   connection.addLoadListener(o, o.onDataFetch);
}
MO.FManageDataTable_doPrepare = function FManageDataTable_doPrepare(parameters){
   var o = this;
   debugger
   var logicGroup = o._logicGroup = parameters.get('logic_group');
   var containerName = null;
   var itemName = null;
   if(logicGroup != 'container'){
      var catalog = o._frameSet._catalogContent;
      containerName = catalog.containerName();
      itemName = catalog.itemName();
   }
   var frameName = parameters.get('frame_name');
   var frame = o._frameSet.selectObject(frameName);
   frame.dataPrepare();
   var control = frame.searchComponent('componentType');
   var componentType = parameters.get('component_type');
   control.set(componentType);
   frame.setContainerName(containerName);
   frame.setItemName(itemName);
}
MO.FManageDataTable_doSave = function FManageDataTable_doSave(){
   var o = this;
   MO.Console.find(MO.FDuiDesktopConsole).showProgress();
   var xdocument = new MO.TXmlDocument();
   var xroot = xdocument.root();
   o.saveUnit(xroot.create('Content'));
   var url = MO.Lang.String.format('/{1}.ws?action={2}&group={3}&container={4}&item={5}', o._logicService, o._dataActionCd, o._logicGroup, o._containerName, o._itemName);
   var connection = MO.Console.find(MO.FXmlConsole).sendAsync(url, xdocument);
   connection.addLoadListener(o, o.onDataSave);
}
MO.FManageDataTable_doDelete = function FManageDataTable_doDelete(){
   var o = this;
   o._dataActionCd = MO.EUiDataAction.Delete;
   o.doSave();
}
MO.FManageDataTable_dispose = function FManageDataTable_dispose(){
   var o = this;
   o.__base.FDuiTableFrame.dispose.call(o);
}
MO.FManageFrameDefineConsole = function FManageFrameDefineConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd       = MO.EScope.Global;
   o._service       = 'editor.design.frame';
   o._defines       = null;
   o.lsnsLoaded     = null;
   o.construct      = MO.FManageFrameDefineConsole_construct;
   o.load           = MO.FManageFrameDefineConsole_load;
   o.events         = null;
   o.formId         = 0;
   o.createFromName = MO.FManageFrameDefineConsole_createFromName;
   o.loadNode       = MO.FManageFrameDefineConsole_loadNode;
   o.loadService    = MO.FManageFrameDefineConsole_loadService;
   o.nextFormId     = MO.FManageFrameDefineConsole_nextFormId;
   o.get            = MO.FManageFrameDefineConsole_get;
   o.find           = MO.FManageFrameDefineConsole_find;
   o.getLov         = MO.FManageFrameDefineConsole_getLov;
   o.findLov        = MO.FManageFrameDefineConsole_findLov;
   o.getEvents      = MO.FManageFrameDefineConsole_getEvents;
   return o;
}
MO.FManageFrameDefineConsole_construct = function FManageFrameDefineConsole_construct(){
   var o = this;
   o._defines = new MO.TDictionary();
   o.lsnsLoaded = new MO.TListeners();
}
MO.FManageFrameDefineConsole_load = function FManageFrameDefineConsole_load(name){
   var o = this;
   var defines = o._defines;
   var xconfig = defines.get(name);
   if(xconfig){
      return xconfig;
   }
   var xdocument = new MO.TXmlDocument();
   var xroot = xdocument.root();
   xroot.set('action', 'query');
   var xframe = xroot.create('Frame');
   xframe.set('name', name);
   var url = MO.RDuiService.url(o._service);
   var xresult = MO.Console.find(MO.FXmlConsole).sendSync(url, xdocument);
   var xframes = xresult.nodes();
   var count = xframes.count();
   for(var i = 0; i < count; i++){
      var xframe = xframes.at(i);
      var frameName = xframe.get('name');
      defines.set(frameName, xframe);
   }
   var xframe = defines.get(name);
   if(!xframe){
      throw new MO.TError(o, 'Unknown frame. (name={1])', name);
   }
   return xframe;
}
MO.FManageFrameDefineConsole_createFromName = function FManageFrameDefineConsole_createFromName(name, type){
   var o = this;
   var doc = o.loadService(name, type);
   o.loadNode(doc);
   if(MO.EForm.Lov == type){
      return o.getLov(name);
   }else{
      return o.get(name);
   }
}
MO.FManageFrameDefineConsole_loadNode = function FManageFrameDefineConsole_loadNode(x){
   var o = this;
   var nns = x.root();
   if(nns.hasNode()){
      var nodes = nns.nodes;
      var ct = nodes.count;
      for(var n = 0; n < ct; n++){
         var node = nodes.get(n);
         var fn = node.get('name');
         var tp = node.get('type');
         if(node.hasNode()){
            var nfds = node.nodes;
            for(var k = 0; k < nfds.count; k++){
               var dd = nfds.get(k);
               if(dd.isName('Define')){
                  if(dd.hasNode()){
                     var fds = dd.nodes;
                     for(var m = 0; m < fds.count; m++){
                        var nd = fds.get(m);
                        var mp = o._defines.get(tp);
                        mp.set(fn, nd);
                     }
                  }
               }else if(dd.isName('Events')){
                  o.events.set(fn, dd);
               }
            }
         }
      }
   }
}
MO.FManageFrameDefineConsole_loadService = function FManageFrameDefineConsole_loadService(n, t){
   var o = this;
   if(!t){
      t = MO.EForm.Form;
   }
   var doc = new MO.TXmlDocument();
   var root = doc.root();
   root.set('action', 'loadDefine');
   var f = root.create('WebForm');
   f.set('name', n);
   f.set('type', t);
   var url = MO.RDuiService.url('logic.webform');
   var doc = MO.Console.find(MO.FXmlConsole).send(url, doc);
   var r = doc.root();
   if(!MO.Console.find(MO.FMessageConsole).checkResult(new TMessageArg(r))){
      return null;
   }
   return doc;
}
MO.FManageFrameDefineConsole_nextFormId = function FManageFrameDefineConsole_nextFormId(){
   return ++this.formId;
}
MO.FManageFrameDefineConsole_get = function FManageFrameDefineConsole_get(n){
   return this._defines.get(EForm.Form).get(n);
}
MO.FManageFrameDefineConsole_find = function FManageFrameDefineConsole_find(n, t){
   var o = this;
   if(EForm.Lov == t){
      return o.findLov(n);
   }
   var fc = o.get(n);
   if(MO.Class.isMode(MO.ERun.Debug)){
      MO.Memory.free(fc);
      fc = null;
      o._defines.get(EForm.Form).set(n, null);
   }
   if(!fc){
      fc = o.createFromName(n);
   }
   return fc;
}
MO.FManageFrameDefineConsole_getLov = function FManageFrameDefineConsole_getLov(n){
   return this._defines.get(EForm.Lov).get(n);
}
MO.FManageFrameDefineConsole_findLov = function FManageFrameDefineConsole_findLov(n){
   var o = this;
   var fc = o.getLov(n);
   if(!fc){
      fc = o.createFromName(n, EForm.Lov);
   }
   return fc;
}
MO.FManageFrameDefineConsole_getEvents = function FManageFrameDefineConsole_getEvents(n){
   return this.events.get(n);
}
MO.FManageFrameSet = function FManageFrameSet(o){
   o = MO.Class.inherits(this, o, MO.FDuiFrameSet);
   o._styleTitleGround     = MO.Class.register(o, new MO.AStyle('_styleTitleGround', 'Title_Ground'));
   o._styleToolbarGround   = MO.Class.register(o, new MO.AStyle('_styleToolbarGround', 'Toolbar_Ground'));
   o._styleCatalogContent  = MO.Class.register(o, new MO.AStyle('_styleCatalogContent', 'Catalog_Content'));
   o._styleSpaceContent    = MO.Class.register(o, new MO.AStyle('_styleSpaceContent', 'Space_Content'));
   o._frameCatalog         = null;
   o._frameCatalogToolbar  = null;
   o._frameCatalogContent  = null;
   o._frameSpace           = null;
   o._frameSpaceToolbar    = null;
   o._frameSpaceContent    = null;
   o._activeFrame          = MO.Class.register(o, new MO.AGetSet('_activeFrame'));
   o.onBuilded             = MO.FManageFrameSet_onBuilded;
   o.onHistoryButtonClick  = MO.FManageFrameSet_onHistoryButtonClick;
   o.construct             = MO.FManageFrameSet_construct;
   o.setFrameTitle         = MO.FManageFrameSet_setFrameTitle;
   o.findSpaceFrame        = MO.FManageFrameSet_findSpaceFrame;
   o.hideSpaceFrames       = MO.FManageFrameSet_hideSpaceFrames;
   o.selectSpaceFrame      = MO.FManageFrameSet_selectSpaceFrame;
   o.selectObject          = MO.FManageFrameSet_selectObject;
   o.load                  = MO.FManageFrameSet_load;
   o.dispose               = MO.FManageFrameSet_dispose;
   return o;
}
MO.FManageFrameSet_onBuilded = function FManageFrameSet_onBuilded(event){
   var o = this;
   o.__base.FDuiFrameSet.onBuilded.call(o, event);
   var control = o._historyBar = MO.Class.create(MO.FDuiHistoryBar);
   control._workspace = o._workspace;
   control._frameSet = o;
   control.build(event);
   control.addButtonClickListener(o, o.onHistoryButtonClick);
   o._frameSpaceTitle.push(control);
   var control = o._spaceToolBar = MO.Class.create(MO.FManageSpaceToolBar);
   control._workspace = o._workspace;
   control._frameSet = o;
   control.buildDefine(event);
   control.setVisible(false);
   o._frameSpaceToolBar.push(control);
}
MO.FManageFrameSet_onHistoryButtonClick = function FManageFrameSet_onHistoryButtonClick(event){
   var o = this;
   var button = event.sender;
   var frameName = button.attributeGet('frame_name');
   o.selectSpaceFrame(frameName);
}
MO.FManageFrameSet_construct = function FManageFrameSet_construct(){
   var o = this;
   o.__base.FDuiFrameSet.construct.call(o);
   o._spaceFrames = new MO.TDictionary();
}
MO.FManageFrameSet_setFrameTitle = function FManageFrameSet_setFrameTitle(title){
   var o = this;
}
MO.FManageFrameSet_findSpaceFrame = function FManageFrameSet_findSpaceFrame(code){
   var o = this;
   var frame = o._spaceFrames.get(code);
   if(!frame){
      frame = MO.Console.find(MO.FDuiFrameConsole).get(o, code, o._frameSpaceContent._hContainer);
      frame._frameSet = o;
      o._spaceFrames.set(code, frame);
   }
   return frame;
}
MO.FManageFrameSet_hideSpaceFrames = function FManageFrameSet_hideSpaceFrames(){
   var o = this;
   var frames = o._spaceFrames;
   var count = frames.count();
   for(var i = 0; i < count; i++){
      var frame = frames.at(i);
      frame.hide();
   }
}
MO.FManageFrameSet_selectSpaceFrame = function FManageFrameSet_selectSpaceFrame(frameName){
   var o = this;
   o.hideSpaceFrames();
   var frame = null;
   if(frameName){
      frame = o.findSpaceFrame(frameName);
      frame.show();
   }
   o._activeFrame = frame;
   return frame;
}
MO.FManageFrameSet_selectObject = function FManageFrameSet_selectObject(frameName){
   var o = this;
   var frame = o.selectSpaceFrame(frameName);
   o.setFrameTitle(frame.label());
   o._spaceToolBar.setVisible(true);
   return frame;
}
MO.FManageFrameSet_load = function FManageFrameSet_load(){
   var o = this;
}
MO.FManageFrameSet_dispose = function FManageFrameSet_dispose(){
   var o = this;
   o._spaceFrames = MO.Lang.Object.dispose(o._spaceFrames, true);
   o.__base.FDuiFrameSet.dispose.call(o);
}
MO.FManageSpaceToolBar = function FManageSpaceToolBar(o){
   o = MO.Class.inherits(this, o, MO.FDuiToolBar);
   o._frameName     = 'manage.logic.SpaceToolBar';
   o.onInsertClick  = MO.FManageSpaceToolBar_onInsertClick;
   o.onUpdateClick  = MO.FManageSpaceToolBar_onUpdateClick;
   o.onDeleteClick  = MO.FManageSpaceToolBar_onDeleteClick;
   o.onSearchClick  = MO.FManageSpaceToolBar_onSearchClick;
   o.onBuilded      = MO.FManageSpaceToolBar_onBuilded;
   o.construct      = MO.FManageSpaceToolBar_construct;
   o.dispose        = MO.FManageSpaceToolBar_dispose;
   return o;
}
MO.FManageSpaceToolBar_onInsertClick = function FManageSpaceToolBar_onInsertClick(event){
   var o = this;
   var frame = o._frameSet.activeFrame();
   if(MO.Class.isClass(frame, MO.FDuiTableFrame)){
      var unitFrameName = frame.unitFrameName();
      MO.Assert.debugNotEmpty(unitFrameName);
      var unitFrame = o._frameSet.selectSpaceFrame(unitFrameName);
      unitFrame.doPrepare();
   }
}
MO.FManageSpaceToolBar_onUpdateClick = function FManageSpaceToolBar_onUpdateClick(event){
   var o = this;
   var frame = o._frameSet.activeFrame();
   frame.doSave();
}
MO.FManageSpaceToolBar_onDeleteClick = function FManageSpaceToolBar_onDeleteClick(event){
   var o = this;
   var frame = o._frameSet.activeFrame();
   frame.doDelete();
}
MO.FManageSpaceToolBar_onBuilded = function FManageSpaceToolBar_onBuilded(p){
   var o = this;
   o.__base.FDuiToolBar.onBuilded.call(o, p);
   o._controlInsert.addClickListener(o, o.onInsertClick);
   o._controlUpdate.addClickListener(o, o.onUpdateClick);
   o._controlDelete.addClickListener(o, o.onDeleteClick);
}
MO.FManageSpaceToolBar_construct = function FManageSpaceToolBar_construct(){
   var o = this;
   o.__base.FDuiToolBar.construct.call(o);
}
MO.FManageSpaceToolBar_dispose = function FManageSpaceToolBar_dispose(){
   var o = this;
   o.__base.FDuiToolBar.dispose.call(o);
}
MO.FManageWorkspace = function FManageWorkspace(o){
   o = MO.Class.inherits(this, o, MO.FDuiWorkspace, MO.MUiStorage);
   o._frameName          = 'manage.logic.Workspace';
   o._storageCode        = o._frameName;
   o._styleTitlePanel    = MO.Class.register(o, new MO.AStyle('_styleTitlePanel', 'Title_Panel'));
   o._styleTitleLogo     = MO.Class.register(o, new MO.AStyle('_styleTitleLogo', 'Title_Logo'));
   o._styleTitleLabel    = MO.Class.register(o, new MO.AStyle('_styleTitleLabel', 'Title_Label'));
   o._styleMenuBarGround = MO.Class.register(o, new MO.AStyle('_styleMenuBarGround', 'MenuBar_Ground'));
   o._styleModuleGround  = MO.Class.register(o, new MO.AStyle('_styleModuleGround', 'Module_Ground'));
   o._styleSpaceGround   = MO.Class.register(o, new MO.AStyle('_styleSpaceGround', 'Space_Ground'));
   o._activeFrameSetCode = null;
   o._activeProjectGuid  = null;
   o._frameToolBar       = null;
   o._frameStatusBar     = null;
   o._activeFrameSet     = null;
   o._frameSets          = null;
   o.onBuilded           = MO.FManageWorkspace_onBuilded;
   o.onSliderButtonClick = MO.FManageWorkspace_onSliderButtonClick;
   o.construct           = MO.FManageWorkspace_construct;
   o.selectFrameSet      = MO.FManageWorkspace_selectFrameSet;
   o.load                = MO.FManageWorkspace_load;
   o.dispose             = MO.FManageWorkspace_dispose;
   return o;
}
MO.FManageWorkspace_onBuilded = function FManageWorkspace_onBuilded(event){
   var o = this;
   o.__base.FDuiWorkspace.onBuilded.call(o, event);
   o._frameMenuBar._hPanel.className = o.styleName('MenuBar_Ground');
   o._frameModule._hPanel.className = o.styleName('Module_Ground');
   o._frameSpace._hPanel.className = o.styleName('Space_Ground');
   o._controlCommonButton.addClickListener(o, o.onSliderButtonClick);
   o._controlPersonButton.addClickListener(o, o.onSliderButtonClick);
   o._controlLoggerButton.addClickListener(o, o.onSliderButtonClick);
   var hTitleForm = MO.Window.Builder.appendTable(o._frameMenuBar._hPanel, o.styleName('Title_Panel'));
   var hTitleLine = MO.Window.Builder.appendTableRow(hTitleForm);
   var hTitleCell = MO.Window.Builder.appendTableCell(hTitleLine, o.styleName('Title_Logo'));
   hTitleCell.align = 'center';
   hTitleCell.vAlign = 'middle';
   MO.Window.Builder.appendIcon(hTitleCell, null, 'editor.design.logo|png');
   var hTitleCell = MO.Window.Builder.appendTableCell(hTitleLine, o.styleName('Title_Label'));
   MO.Window.Html.textSet(hTitleCell, '业务管理平台');
   return;
   var hTable = MO.Window.Builder.createTable(event);
   hTable.width = '100%';
   var hRow = MO.Window.Builder.appendTableRow(hTable);
   o._hMenuPanel = MO.Window.Builder.appendTableCell(hRow);
   var control = o._tabBar = MO.Class.create(MO.FManageTabBar);
   control._workspace = o;
   control.buildDefine(event);
   var hCell = MO.Window.Builder.appendTableCell(hRow);
   hCell.width = '240px';
   hCell.align = 'right';
   hCell.vAlign = 'bottom';
   hCell.appendChild(control._hPanel);
   o._frameMenuBar._hPanel.appendChild(hTable);
}
MO.FManageWorkspace_onSliderButtonClick = function FManageWorkspace_onSliderButtonClick(event){
   var o = this;
   var button = event.sender;
   var name = button.name();
   switch(name){
      case 'commonButton':
         o.selectFrameSet(MO.EManageFrameSet.CommonFrameSet);
         break;
      case 'personButton':
         o.selectFrameSet(MO.EManageFrameSet.PersonFrameSet);
         break;
      case 'loggerButton':
         o.selectFrameSet(MO.EManageFrameSet.LoggerFrameSet);
         break;
      default:
         throw new TError(o, 'Invalid click.');
   }
}
MO.FManageWorkspace_construct = function FManageWorkspace_construct(){
   var o = this;
   o.__base.FDuiWorkspace.construct.call(o);
   o._frameSets = new MO.TDictionary();
}
MO.FManageWorkspace_selectFrameSet = function FManageWorkspace_selectFrameSet(name, guid){
   var o = this;
   var frameSet = o._frameSets.get(name);
   if(!frameSet){
      if(name == MO.EManageFrameSet.CommonFrameSet){
         frameSet = MO.Console.find(MO.FDuiFrameConsole).findByClass(o, MO.FManageLgCommonFrameSet);
      }else if(name == MO.EManageFrameSet.PersonFrameSet){
         frameSet = MO.Console.find(MO.FDuiFrameConsole).findByClass(o, MO.FManageLgPersonFrameSet);
      }else if(name == MO.EManageFrameSet.LoggerFrameSet){
         frameSet = MO.Console.find(MO.FDuiFrameConsole).findByClass(o, MO.FManageLgLoggerFrameSet);
      }else{
         throw new MO.TError('Unknown frameset. (name={1})', name);
      }
      frameSet._workspace = o;
      o._frameSets.set(name, frameSet);
   }
   var activeFrameSet = o._activeFrameSet;
   if(activeFrameSet != frameSet){
      if(activeFrameSet){
         o._frameSpace.remove(activeFrameSet);
      }
      o._frameSpace.push(frameSet);
      frameSet.psResize();
   }
   o._activeFrameSet = frameSet;
   switch(name){
      case MO.EManageFrameSet.CommonFrameSet:
         frameSet.load();
         break;
      case MO.EManageFrameSet.PersonFrameSet:
         frameSet.load();
         break;
      case MO.EManageFrameSet.LoggerFrameSet:
         frameSet.load();
         break;
      default:
         throw new TError('Unknown frameset. (name={1})', name);
   }
   o.storageSet('frameset_code', name)
   o.storageSet('frameset_guid', guid)
   o.storageUpdate();
   return frameSet;
}
MO.FManageWorkspace_load = function FManageWorkspace_load(){
   var o = this;
   var code = o._activeFrameSetCode = o.storageGet('frameset_code', MO.EManageFrameSet.SolutionFrameSet);
   var guid = o._activeFrameSetGuid = o.storageGet('frameset_guid');
   var button = null;
   if(code == MO.EManageFrameSet.CommonFrameSet){
      o.selectFrameSet(MO.EManageFrameSet.CommonFrameSet);
   }else if(code == MO.EManageFrameSet.PersonFrameSet){
      o.selectFrameSet(MO.EManageFrameSet.PersonFrameSet);
   }else if(code == MO.EManageFrameSet.LoggerFrameSet){
      o.selectFrameSet(MO.EManageFrameSet.LoggerFrameSet);
   }
}
MO.FManageWorkspace_dispose = function FManageWorkspace_dispose(){
   var o = this;
   o._frameSets = MO.Lang.Object.dispose(o._frameSets, true);
   o.__base.FDuiWorkspace.dispose.call(o);
}
