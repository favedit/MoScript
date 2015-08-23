MO.FEditorDsCatalogContent = function FEditorDsCatalogContent(o){
   o = MO.Class.inherits(this, o, MO.FUiDataTreeView);
   o._defineCode    = null;
   o._containerName = MO.Class.register(o, new MO.AGetter('_containerName'));
   o._itemName      = MO.Class.register(o, new MO.AGetter('_itemName'));
   o.onNodeClick    = MO.FEditorDsCatalogContent_onNodeClick;
   o.construct      = MO.FEditorDsCatalogContent_construct;
   o.dispose        = MO.FEditorDsCatalogContent_dispose;
   return o;
}
MO.FEditorDsCatalogContent_onNodeClick = function FEditorDsCatalogContent_onNodeClick(event){
   var o = this;
   var node = event.node;
   var parent = node;
   while(MO.Class.isClass(parent, MO.FDuiTreeNode)){
      if(parent.typeGroup() == MO.EDuiTreeNodeGroup.Container){
         break;
      }
      parent = parent.parent();
   }
   var containerName = o._containerName = parent.code();
   o._itemName = null;
   var typeGroup = node.typeGroup();
   var frameName = node.type().get('property_frame');
   if(typeGroup == MO.EDuiTreeNodeGroup.Container){
      var frame = o._frameSet.selectObject(frameName);
      frame.processMode(MO.EUiMode.Update);
      frame.dataModify();
      frame.doLoad(typeGroup, containerName);
   }else if(typeGroup == MO.EDuiTreeNodeGroup.Item){
      var frame = o._frameSet.selectObject(frameName);
      frame.processMode(MO.EUiMode.Update);
      frame.dataModify();
      var itemName = o._itemName = node.guid();
      frame.doLoad(typeGroup, containerName, itemName);
   }
}
MO.FEditorDsCatalogContent_construct = function FEditorDsCatalogContent_construct(){
   var o = this;
   o.__base.FUiDataTreeView.construct.call(o);
   var url = MO.Lang.String.format('/content.define.tree.ws?action=query&code={1}', o._defineCode);
   o.loadUrl(url);
}
MO.FEditorDsCatalogContent_dispose = function FEditorDsCatalogContent_dispose(){
   var o = this;
   o.__base.FUiDataTreeView.dispose.call(o);
}
MO.FEditorDsFrameSet = function FEditorDsFrameSet(o){
   o = MO.Class.inherits(this, o, MO.FEditorFrameSet);
   o._styleTitleGround     = MO.Class.register(o, new MO.AStyle('_styleTitleGround', 'Title_Ground'));
   o._styleToolbarGround   = MO.Class.register(o, new MO.AStyle('_styleToolbarGround', 'Toolbar_Ground'));
   o._styleCatalogContent  = MO.Class.register(o, new MO.AStyle('_styleCatalogContent', 'Catalog_Content'));
   o._styleSpaceContent    = MO.Class.register(o, new MO.AStyle('_styleSpaceContent', 'Space_Content'));
   o._stylePropertyContent = MO.Class.register(o, new MO.AStyle('_stylePropertyContent', 'Property_Content'));
   o._frameCatalog         = null;
   o._frameCatalogToolbar  = null;
   o._frameCatalogContent  = null;
   o._frameSpace           = null;
   o._frameSpaceToolbar    = null;
   o._frameSpaceContent    = null;
   o._frameProperty        = null;
   o._framePropertyToolbar = null;
   o._framePropertyContent = null;
   o.construct             = MO.FEditorDsFrameSet_construct;
   o.setFrameTitle         = MO.FEditorDsFrameSet_setFrameTitle;
   o.selectObject          = MO.FEditorDsFrameSet_selectObject;
   o.load                  = MO.FEditorDsFrameSet_load;
   o.dispose               = MO.FEditorDsFrameSet_dispose;
   return o;
}
MO.FEditorDsFrameSet_construct = function FEditorDsFrameSet_construct(){
   var o = this;
   o.__base.FEditorFrameSet.construct.call(o);
}
MO.FEditorDsFrameSet_setFrameTitle = function FEditorDsFrameSet_setFrameTitle(title){
   var o = this;
   var hTitlePanel = o._framePropertyTitle._hPanel;
   MO.Window.Html.textSet(hTitlePanel, title);
}
MO.FEditorDsFrameSet_selectObject = function FEditorDsFrameSet_selectObject(frameName){
   var o = this;
   var frame = o.selectPropertyFrame(frameName);
   o.setFrameTitle(frame.label());
   var hToolBarPanel = o._framePropertyToolBar._hPanel;
   MO.Window.Html.clear(hToolBarPanel);
   var toolBar = frame.findControl('toolBar');
   if(toolBar){
      toolBar.setPanel(hToolBarPanel);
   }
   return frame;
}
MO.FEditorDsFrameSet_load = function FEditorDsFrameSet_load(){
   var o = this;
}
MO.FEditorDsFrameSet_dispose = function FEditorDsFrameSet_dispose(){
   var o = this;
   o.__base.FEditorFrameSet.dispose.call(o);
}
MO.FEditorDsMenuBar = function FEditorDsMenuBar(o){
   o = MO.Class.inherits(this, o, MO.FDuiMenuBar);
   o.onCreateClick = MO.FEditorDsMenuBar_onCreateClick;
   o.onUpdateClick = MO.FEditorDsMenuBar_onUpdateClick;
   o.onDeleteClick = MO.FEditorDsMenuBar_onDeleteClick;
   return o;
}
MO.FEditorDsMenuBar_onCreateClick = function FEditorDsMenuBar_onCreateClick(event){
   var o = this;
   var button = event.sender;
   var componentType = button.attributeGet('component_type');
   var propertyFrame = button.attributeGet('property_frame');
   var frame = o._frameSet.selectPropertyFrame(propertyFrame);
   frame.dataPrepare();
   frame.searchComponent('componentType').set(componentType);
}
MO.FEditorDsMenuBar_onUpdateClick = function FEditorDsMenuBar_onUpdateClick(event){
   var o = this;
   var frame = o._frameSet.activePropertyFrame();
   if(frame){
      frame.save();
   }else{
      alert('请选择项目。');
   }
}
MO.FEditorDsMenuBar_onDeleteClick = function FEditorDsMenuBar_onDeleteClick(event){
   var o = this;
   var frame = o._frameSet.activePropertyFrame();
   if(frame){
      frame.dataDelete();
      frame.save();
   }else{
      alert('请选择项目。');
   }
}
MO.FEditorDsPropertyForm = function FEditorDsPropertyForm(o){
   o = MO.Class.inherits(this, o, MO.FDuiForm);
   o._containerName = MO.Class.register(o, new MO.AGetSet('_containerName'));
   o._itemName      = MO.Class.register(o, new MO.AGetSet('_itemName'));
   o.onButtonClick  = MO.FEditorDsPropertyForm_onButtonClick;
   o.onBuilded      = MO.FEditorDsPropertyForm_onBuilded;
   o.onDataChanged  = MO.FEditorDsPropertyForm_onDataChanged;
   o.onDataLoad     = MO.FEditorDsPropertyForm_onDataLoad;
   o.onDataSave     = MO.FEditorDsPropertyForm_onDataSave;
   o.onDataDelete   = MO.FEditorDsPropertyForm_onDataDelete;
   o.construct      = MO.FEditorDsPropertyForm_construct;
   o.doPrepare      = MO.FEditorDsPropertyForm_doPrepare;
   o.doLoad         = MO.FEditorDsPropertyForm_doLoad;
   o.doSave         = MO.FEditorDsPropertyForm_doSave;
   o.doDelete       = MO.FEditorDsPropertyForm_doDelete;
   o.dispose        = MO.FEditorDsPropertyForm_dispose;
   return o;
}
MO.FEditorDsPropertyForm_onButtonClick = function FEditorDsPropertyForm_onButtonClick(event){
   var o  = this;
   var button = event.sender;
   var attributes = button.attributes();
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
MO.FEditorDsPropertyForm_onBuilded = function FEditorDsPropertyForm_onBuilded(event){
   var o = this;
   o.__base.FDuiForm.onBuilded.call(o, event);
   var buttons = new MO.TObjects();
   o.searchComponents(buttons, MO.MUiToolButton);
   var count = buttons.count();
   for(var i = 0; i < count; i++){
      var button = buttons.at(i);
      button.addClickListener(o, o.onButtonClick);
   }
}
MO.FEditorDsPropertyForm_onDataChanged = function FEditorDsPropertyForm_onDataChanged(event){
   var o  = this;
   o.__base.FDuiForm.onDataChanged.call(o, event);
}
MO.FEditorDsPropertyForm_onDataLoad = function FEditorDsPropertyForm_onDataLoad(event){
   var o = this;
   var xcontent = event.content;
   var xunit = xcontent.nodes().first();
   o.loadUnit(xunit);
}
MO.FEditorDsPropertyForm_onDataSave = function FEditorDsPropertyForm_onDataSave(event){
   var o = this;
   MO.Console.find(MO.FDuiDesktopConsole).hide();
}
MO.FEditorDsPropertyForm_onDataDelete = function FEditorDsPropertyForm_onDataDelete(event){
   var o = this;
   MO.Console.find(MO.FDuiDesktopConsole).hide();
}
MO.FEditorDsPropertyForm_construct = function FEditorDsPropertyForm_construct(){
   var o = this;
   o.__base.FDuiForm.construct.call(o);
}
MO.FEditorDsPropertyForm_doPrepare = function FEditorDsPropertyForm_doPrepare(parameters){
   var o = this;
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
MO.FEditorDsPropertyForm_doLoad = function FEditorDsPropertyForm_doLoad(typeGroup, containerName, itemName){
   var o = this;
   o._containerName = containerName;
   o._itemName = itemName;
   o._logicGroup = typeGroup;
   var url = MO.Lang.String.format('/{1}.ws?action=query&group={2}&container={3}&item={4}', o._logicService, typeGroup, o._containerName, o._itemName);
   var connection = MO.Console.find(MO.FXmlConsole).send(url);
   connection.addLoadListener(o, o.onDataLoad);
}
MO.FEditorDsPropertyForm_doSave = function FEditorDsPropertyForm_doSave(){
   var o = this;
   MO.Console.find(MO.FDuiDesktopConsole).showProgress();
   var xdocument = new MO.TXmlDocument();
   var xroot = xdocument.root();
   o.saveUnit(xroot.create('Content'));
   var url = MO.Lang.String.format('/{1}.ws?action={2}&group={3}&container={4}&item={5}', o._logicService, o._dataActionCd, o._logicGroup, o._containerName, o._itemName);
   var connection = MO.Console.find(MO.FXmlConsole).sendAsync(url, xdocument);
   connection.addLoadListener(o, o.onDataSave);
}
MO.FEditorDsPropertyForm_doDelete = function FEditorDsPropertyForm_doDelete(){
   var o = this;
   o._dataActionCd = MO.EUiDataAction.Delete;
   var xdocument = new MO.TXmlDocument();
   var xroot = xdocument.root();
   o.saveUnit(xroot.create('Content'));
   var url = MO.Lang.String.format('/{1}.ws?action={2}&group={3}&container={4}&item={5}', o._logicService, o._dataActionCd, o._logicGroup, o._containerName, o._itemName);
   var connection = MO.Console.find(MO.FXmlConsole).sendAsync(url, xdocument);
   connection.addLoadListener(o, o.onDataSave);
}
MO.FEditorDsPropertyForm_dispose = function FEditorDsPropertyForm_dispose(){
   var o = this;
   o.__base.FDuiForm.dispose.call(o);
}
MO.FEditorDsTabBar = function FEditorDsTabBar(o){
   o = MO.Class.inherits(this, o, MO.FDuiTabBar);
   o._frameName            = 'editor.design.TabBar';
   o._resourceTypeCd       = 'private';
   o._controlPrivateButton = null;
   o._controlTeamButton    = null;
   o._controlShareButton   = null;
   o.onBuilded             = MO.FEditorDsTabBar_onBuilded;
   o.onButtonClick         = MO.FEditorDsTabBar_onButtonClick;
   o.construct             = MO.FEditorDsTabBar_construct;
   o.dispose               = MO.FEditorDsTabBar_dispose;
   return o;
}
MO.FEditorDsTabBar_onBuilded = function FEditorDsTabBar_onBuilded(p){
   var o = this;
   o.__base.FDuiTabBar.onBuilded.call(o, p);
   o._controlPersistence.addClickListener(o, o.onButtonClick);
   o._controlList.addClickListener(o, o.onButtonClick);
   o._controlTree.addClickListener(o, o.onButtonClick);
   o._controlFrame.addClickListener(o, o.onButtonClick);
}
MO.FEditorDsTabBar_onButtonClick = function FEditorDsTabBar_onButtonClick(event){
   var o = this;
   var workspace = o._workspace;
   var sender = event.sender;
   var name = sender.name();
   if(name == 'persistence'){
      workspace.selectFrameSet(MO.EEditorFrameSet.PersistenceFrameSet);
   }else if(name == 'list'){
      workspace.selectFrameSet(MO.EEditorFrameSet.ListFrameSet);
   }else if(name == 'tree'){
      workspace.selectFrameSet(MO.EEditorFrameSet.TreeFrameSet);
   }else if(name == 'frame'){
      workspace.selectFrameSet(MO.EEditorFrameSet.FrameFrameSet);
   }else{
      alert('功能未开启，请以后关注。');
   }
}
MO.FEditorDsTabBar_construct = function FEditorDsTabBar_construct(){
   var o = this;
   o.__base.FDuiTabBar.construct.call(o);
}
MO.FEditorDsTabBar_dispose = function FEditorDsTabBar_dispose(){
   var o = this;
   o.__base.FDuiTabBar.dispose.call(o);
}
MO.FEditorDsWorkspace = function FEditorDsWorkspace(o){
   o = MO.Class.inherits(this, o, MO.FDuiWorkspace, MO.MUiStorage);
   o._frameName          = 'editor.design.Workspace';
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
   o.onBuilded           = MO.FEditorDsWorkspace_onBuilded;
   o.onSliderButtonClick = MO.FEditorDsWorkspace_onSliderButtonClick;
   o.construct           = MO.FEditorDsWorkspace_construct;
   o.selectFrameSet      = MO.FEditorDsWorkspace_selectFrameSet;
   o.load                = MO.FEditorDsWorkspace_load;
   o.dispose             = MO.FEditorDsWorkspace_dispose;
   return o;
}
MO.FEditorDsWorkspace_onBuilded = function FEditorDsWorkspace_onBuilded(event){
   var o = this;
   o.__base.FDuiWorkspace.onBuilded.call(o, event);
   o._frameMenuBar._hPanel.className = o.styleName('MenuBar_Ground');
   o._frameModule._hPanel.className = o.styleName('Module_Ground');
   o._frameSpace._hPanel.className = o.styleName('Space_Ground');
   o._controlPersistenceButton.addClickListener(o, o.onSliderButtonClick);
   o._controlListButton.addClickListener(o, o.onSliderButtonClick);
   o._controlTreeButton.addClickListener(o, o.onSliderButtonClick);
   o._controlFrameButton.addClickListener(o, o.onSliderButtonClick);
   var hTitleForm = MO.Window.Builder.appendTable(o._frameMenuBar._hPanel, o.styleName('Title_Panel'));
   var hTitleLine = MO.Window.Builder.appendTableRow(hTitleForm);
   var hTitleCell = MO.Window.Builder.appendTableCell(hTitleLine, o.styleName('Title_Logo'));
   hTitleCell.align = 'center';
   hTitleCell.vAlign = 'middle';
   MO.Window.Builder.appendIcon(hTitleCell, null, 'editor.design.logo|png');
   var hTitleCell = MO.Window.Builder.appendTableCell(hTitleLine, o.styleName('Title_Label'));
   MO.Window.Html.textSet(hTitleCell, '开发设计平台');
   return;
   var hTable = MO.Window.Builder.createTable(event);
   hTable.width = '100%';
   var hRow = MO.Window.Builder.appendTableRow(hTable);
   o._hMenuPanel = MO.Window.Builder.appendTableCell(hRow);
   var control = o._tabBar = MO.Class.create(MO.FEditorDsTabBar);
   control._workspace = o;
   control.buildDefine(event);
   var hCell = MO.Window.Builder.appendTableCell(hRow);
   hCell.width = '240px';
   hCell.align = 'right';
   hCell.vAlign = 'bottom';
   hCell.appendChild(control._hPanel);
   o._frameMenuBar._hPanel.appendChild(hTable);
}
MO.FEditorDsWorkspace_onSliderButtonClick = function FEditorDsWorkspace_onSliderButtonClick(event){
   var o = this;
   var button = event.sender;
   var name = button.name();
   switch(name){
      case 'persistenceButton':
         o.selectFrameSet(MO.EEditorFrameSet.PersistenceFrameSet);
         break;
      case 'listButton':
         o.selectFrameSet(MO.EEditorFrameSet.ListFrameSet);
         break;
      case 'treeButton':
         o.selectFrameSet(MO.EEditorFrameSet.TreeFrameSet);
         break;
      case 'frameButton':
         o.selectFrameSet(MO.EEditorFrameSet.FrameFrameSet);
         break;
      default:
         throw new TError(o, 'Invalid click.');
   }
}
MO.FEditorDsWorkspace_construct = function FEditorDsWorkspace_construct(){
   var o = this;
   o.__base.FDuiWorkspace.construct.call(o);
   o._frameSets = new MO.TDictionary();
}
MO.FEditorDsWorkspace_selectFrameSet = function FEditorDsWorkspace_selectFrameSet(name, guid){
   var o = this;
   var frameSet = o._frameSets.get(name);
   if(!frameSet){
      if(name == MO.EEditorFrameSet.PersistenceFrameSet){
         var menuBar = MO.Class.create(MO.FEditorDsPersistenceMenuBar);
         menuBar._workspace = o;
         menuBar.buildDefine(o._hPanel);
         frameSet = MO.Console.find(MO.FDuiFrameConsole).findByClass(o, MO.FEditorDsPersistenceFrameSet);
         frameSet._workspace = o;
         frameSet._menuBar = menuBar;
         menuBar._frameSet = frameSet;
      }else if(name == MO.EEditorFrameSet.ListFrameSet){
         var menuBar = MO.Class.create(MO.FEditorDsListMenuBar);
         menuBar._workspace = o;
         menuBar.buildDefine(o._hPanel);
         frameSet = MO.Console.find(MO.FDuiFrameConsole).findByClass(o, MO.FEditorDsListFrameSet);
         frameSet._workspace = o;
         frameSet._menuBar = menuBar;
         menuBar._frameSet = frameSet;
      }else if(name == MO.EEditorFrameSet.TreeFrameSet){
         var menuBar = MO.Class.create(MO.FEditorDsTreeMenuBar);
         menuBar._workspace = o;
         menuBar.buildDefine(o._hPanel);
         frameSet = MO.Console.find(MO.FDuiFrameConsole).findByClass(o, MO.FEditorDsTreeFrameSet);
         frameSet._workspace = o;
         frameSet._menuBar = menuBar;
         menuBar._frameSet = frameSet;
      }else if(name == MO.EEditorFrameSet.FrameFrameSet){
         var menuBar = MO.Class.create(MO.FEditorDsFrameMenuBar);
         menuBar._workspace = o;
         menuBar.buildDefine(o._hPanel);
         frameSet = MO.Console.find(MO.FDuiFrameConsole).findByClass(o, MO.FEditorDsFrameFrameSet);
         frameSet._workspace = o;
         frameSet._menuBar = menuBar;
         menuBar._frameSet = frameSet;
      }else{
         throw new MO.TError('Unknown frameset. (name={1})', name);
      }
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
      case MO.EEditorFrameSet.PersistenceFrameSet:
         frameSet.load();
         break;
      case MO.EEditorFrameSet.ListFrameSet:
         frameSet.load();
         break;
      case MO.EEditorFrameSet.TreeFrameSet:
         frameSet.load();
         break;
      case MO.EEditorFrameSet.FrameFrameSet:
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
MO.FEditorDsWorkspace_load = function FEditorDsWorkspace_load(){
   var o = this;
   var code = o._activeFrameSetCode = o.storageGet('frameset_code', MO.EEditorFrameSet.SolutionFrameSet);
   var guid = o._activeFrameSetGuid = o.storageGet('frameset_guid');
   var button = null;
   if(code == MO.EEditorFrameSet.PersistenceFrameSet){
      o.selectFrameSet(MO.EEditorFrameSet.PersistenceFrameSet);
   }else if(code == MO.EEditorFrameSet.ListFrameSet){
      o.selectFrameSet(MO.EEditorFrameSet.ListFrameSet);
   }else if(code == MO.EEditorFrameSet.TreeFrameSet){
      o.selectFrameSet(MO.EEditorFrameSet.TreeFrameSet);
   }else if(code == MO.EEditorFrameSet.FrameFrameSet){
      o.selectFrameSet(MO.EEditorFrameSet.FrameFrameSet);
   }else{
   }
}
MO.FEditorDsWorkspace_dispose = function FEditorDsWorkspace_dispose(){
   var o = this;
   o._frameSets = MO.Lang.Object.dispose(o._frameSets, true);
   o.__base.FDuiWorkspace.dispose.call(o);
}
MO.FEditorFrameDefineConsole = function FEditorFrameDefineConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd       = MO.EScope.Global;
   o._service       = 'editor.design.frame';
   o._defines       = null;
   o.lsnsLoaded     = null;
   o.construct      = MO.FEditorFrameDefineConsole_construct;
   o.load           = MO.FEditorFrameDefineConsole_load;
   o.events         = null;
   o.formId         = 0;
   o.createFromName = MO.FEditorFrameDefineConsole_createFromName;
   o.loadNode       = MO.FEditorFrameDefineConsole_loadNode;
   o.loadService    = MO.FEditorFrameDefineConsole_loadService;
   o.nextFormId     = MO.FEditorFrameDefineConsole_nextFormId;
   o.get            = MO.FEditorFrameDefineConsole_get;
   o.find           = MO.FEditorFrameDefineConsole_find;
   o.getLov         = MO.FEditorFrameDefineConsole_getLov;
   o.findLov        = MO.FEditorFrameDefineConsole_findLov;
   o.getEvents      = MO.FEditorFrameDefineConsole_getEvents;
   return o;
}
MO.FEditorFrameDefineConsole_construct = function FEditorFrameDefineConsole_construct(){
   var o = this;
   o._defines = new MO.TDictionary();
   o.lsnsLoaded = new MO.TListeners();
}
MO.FEditorFrameDefineConsole_load = function FEditorFrameDefineConsole_load(name){
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
MO.FEditorFrameDefineConsole_createFromName = function FEditorFrameDefineConsole_createFromName(name, type){
   var o = this;
   var doc = o.loadService(name, type);
   o.loadNode(doc);
   if(MO.EForm.Lov == type){
      return o.getLov(name);
   }else{
      return o.get(name);
   }
}
MO.FEditorFrameDefineConsole_loadNode = function FEditorFrameDefineConsole_loadNode(x){
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
MO.FEditorFrameDefineConsole_loadService = function FEditorFrameDefineConsole_loadService(n, t){
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
MO.FEditorFrameDefineConsole_nextFormId = function FEditorFrameDefineConsole_nextFormId(){
   return ++this.formId;
}
MO.FEditorFrameDefineConsole_get = function FEditorFrameDefineConsole_get(n){
   return this._defines.get(EForm.Form).get(n);
}
MO.FEditorFrameDefineConsole_find = function FEditorFrameDefineConsole_find(n, t){
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
MO.FEditorFrameDefineConsole_getLov = function FEditorFrameDefineConsole_getLov(n){
   return this._defines.get(EForm.Lov).get(n);
}
MO.FEditorFrameDefineConsole_findLov = function FEditorFrameDefineConsole_findLov(n){
   var o = this;
   var fc = o.getLov(n);
   if(!fc){
      fc = o.createFromName(n, EForm.Lov);
   }
   return fc;
}
MO.FEditorFrameDefineConsole_getEvents = function FEditorFrameDefineConsole_getEvents(n){
   return this.events.get(n);
}
