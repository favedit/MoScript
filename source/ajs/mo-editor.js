MO.EEditorFrame = new function EEditorFrame(){
   var o = this;
   o.Test = 'asd.TestFrame';
   return o;
}
MO.EEditorFrameSet = new function EEditorFrameSet(){
   var o = this;
   o.PersistenceFrameSet = 'editor.design.persistence.FrameSet';
   o.ListFrameSet        = 'editor.design.list.FrameSet';
   o.TreeFrameSet        = 'editor.design.tree.FrameSet';
   o.FrameFrameSet       = 'editor.design.frame.FrameSet';
   o.DatasetFrameSet     = 'editor.design.dataset.FrameSet';
   return o;
}
MO.FEditorCanvas = function FEditorCanvas(o){
   o = MO.Class.inherits(this, o, MO.FE3dCanvas);
   o._optionStageProcess = false;
   o._optionResize       = false;
   o._optionMouseCapture = false;
   o._optionAlpha        = true;
   o._optionAntialias    = false;
   o._capturePosition    = null;
   o._cameraPosition     = null;
   o._scaleRate          = 1;
   o._activeStage        = MO.Class.register(o, new MO.AGetter('_activeStage'));
   o._capturePosition    = null;
   o._captureRotation    = null;
   o.construct           = MO.FEditorCanvas_construct;
   o.setPanel            = MO.FEditorCanvas_setPanel;
   o.resize              = MO.FEditorCanvas_resize;
   o.selectStage         = MO.FEditorCanvas_selectStage;
   o.dispose             = MO.FEditorCanvas_dispose;
   return o;
}
MO.FEditorCanvas_construct = function FEditorCanvas_construct(){
   var o = this;
   o.__base.FE3dCanvas.construct.call(o);
   o._rotation = new MO.SVector3();
   o._capturePosition = new MO.SPoint2();
   o._captureRotation = new MO.SVector3();
   o._logicSize = new MO.SSize2(1920, 1080);
   o._cameraPosition = new MO.SPoint3();
}
MO.FEditorCanvas_setPanel = function FEditorCanvas_setPanel(hPanel){
   var o = this;
   o._hPanel = hPanel;
   hPanel.appendChild(o._hCanvas);
}
MO.FEditorCanvas_resize = function FEditorCanvas_resize(width, height){
   var o = this;
   o.__base.FE3dCanvas.resize.call(o, width, height);
   var context = o._graphicContext;
   var size = context.size();
   var stage = o._activeStage;
   if(stage){
      var projection = stage.camera().projection();
      projection.size().set(size.width, size.height);
      projection.update();
   }
}
MO.FEditorCanvas_selectStage = function FEditorCanvas_selectStage(stage){
   var o = this;
   if(stage){
      stage.linkGraphicContext(o);
      stage.region().linkGraphicContext(o);
      stage.selectTechnique(o, MO.FE3dGeneralTechnique);
      var camera = stage.region().camera();
      var projection = camera.projection();
      projection.setAngle(80);
      projection.size().set(o._hCanvas.offsetWidth, o._hCanvas.offsetHeight);
      projection.update();
      camera.position().set(0, 0, -10);
      camera.lookAt(0, 0, 0);
      camera.update();
   }
   o._activeStage = stage;
}
MO.FEditorCanvas_dispose = function FEditorCanvas_dispose(){
   var o = this;
   o._rotation = MO.Lang.Object.dispose(o._rotation);
   o._capturePosition = MO.Lang.Object.dispose(o._capturePosition);
   o._captureRotation = MO.Lang.Object.dispose(o._captureRotation);
   o.__base.FE3dCanvas.dispose.call(o);
}
MO.FEditorDesktop = function FEditorDesktop(o){
   o = MO.Class.inherits(this, o, MO.FDesktop);
   o._canvas3d              = MO.Class.register(o, new MO.AGetter('_canvas3d'));
   o._canvas2d              = MO.Class.register(o, new MO.AGetter('_canvas2d'));
   o.onOperationResize      = MO.FEditorDesktop_onOperationResize;
   o.onOperationOrientation = MO.FEditorDesktop_onOperationOrientation;
   o.construct              = MO.FEditorDesktop_construct;
   o.build                  = MO.FEditorDesktop_build;
   o.resize                 = MO.FEditorDesktop_resize;
   o.dispose                = MO.FEditorDesktop_dispose;
   return o;
}
MO.FEditorDesktop_onOperationResize = function FEditorDesktop_onOperationResize(event){
   var o = this;
   o.__base.FDesktop.onOperationResize.call(o, event);
   o.resize();
}
MO.FEditorDesktop_onOperationOrientation = function FEditorDesktop_onOperationOrientation(){
   var o = this;
   o.__base.FDesktop.onOperationOrientation.call(o, event);
   o.resize();
}
MO.FEditorDesktop_construct = function FEditorDesktop_construct(){
   var o = this;
   o.__base.FDesktop.construct.call(o);
}
MO.FEditorDesktop_build = function FEditorDesktop_build(hPanel){
   var o = this;
   o.__base.FDesktop.build.call(o, hPanel);
   var canvas2d = o._canvas2d = MO.Class.create(MO.FE2dCanvas);
   canvas2d.setDesktop(o);
   canvas2d.build(hPanel);
   canvas2d.setPanel(hPanel);
   canvas2d._hCanvas.style.position = 'absolute';
   o.canvasRegister(canvas2d);
   MO.RE3dEngine.setup();
}
MO.FEditorDesktop_resize = function FEditorDesktop_resize(targetWidth, targetHeight){
   var o = this;
   var width = (targetWidth != null) ? targetWidth : window.innerWidth;
   var height = (targetHeight != null) ? targetHeight : window.innerHeight;
   if(o._screenSize.equalsData(width, height)){
      return;
   }
   o._screenSize.set(width, height);
   var pixelRatio = MO.Browser.capability().pixelRatio;
   MO.Logger.info(o, 'Change screen size. (size={1}x{2}, pixel_ratio={3})', width, height, pixelRatio);
   width *= pixelRatio;
   height *= pixelRatio;
   var widthRate = 1;
   var heightRate = 1;
   var logicSize = o._logicSize;
   if(MO.Browser.isOrientationHorizontal()){
      widthRate = width / logicSize.width;
      heightRate = height / logicSize.height;
      o._calculateSize.set(logicSize.width, logicSize.height);
   }else{
      widthRate = width / logicSize.height;
      heightRate = height / logicSize.width;
      o._calculateSize.set(logicSize.height, logicSize.width);
   }
   var sizeRate = o._sizeRate = Math.min(widthRate, heightRate);
   o._logicRate.set(widthRate, heightRate);
   if(widthRate > heightRate){
      o._calculateRate.set(widthRate / sizeRate, 1);
   }else if(widthRate < heightRate){
      o._calculateRate.set(1, heightRate / sizeRate);
   }else{
      o._calculateRate.set(1, 1);
   }
   o._canvas3d.resize(width, height);
   var canvas2d = o._canvas2d;
   canvas2d.resize(width, height);
   canvas2d.graphicContext().setScale(sizeRate, sizeRate);
}
MO.FEditorDesktop_dispose = function FEditorDesktop_dispose(){
   var o = this;
   o._canvas3d = MO.Lang.Object.dispose(o._canvas3d);
   o._canvas2d = MO.Lang.Object.dispose(o._canvas2d);
   o.__base.FDesktop.dispose.call(o);
}
MO.FEditorFrameSet = function FEditorFrameSet(o){
   o = MO.Class.inherits(this, o, MO.FDuiFrameSet);
   o._styleToolBarGround   = MO.Class.register(o, new MO.AStyle('_styleToolBarGround', 'ToolBar_Ground'));
   o._styleCatalogContent  = MO.Class.register(o, new MO.AStyle('_styleCatalogContent', 'Catalog_Content'));
   o._styleCanvasContent   = MO.Class.register(o, new MO.AStyle('_styleCanvasContent', 'Canvas_Content'));
   o._stylePropertyContent = MO.Class.register(o, new MO.AStyle('_stylePropertyContent', 'Property_Content'));
   o._activeGuid           = null;
   o._activeCode           = null;
   o._activeSpace          = null;
   o._propertyFrames       = MO.Class.register(o, new MO.AGetter('_propertyFrames'));
   o._activePropertyFrame  = MO.Class.register(o, new MO.AGetter('_activePropertyFrame'));
   o.construct             = MO.FEditorFrameSet_construct;
   o.findPropertyFrame     = MO.FEditorFrameSet_findPropertyFrame;
   o.hidePropertyFrames    = MO.FEditorFrameSet_hidePropertyFrames;
   o.selectPropertyFrame   = MO.FEditorFrameSet_selectPropertyFrame;
   o.dispose               = MO.FEditorFrameSet_dispose;
   return o;
}
MO.FEditorFrameSet_construct = function FEditorFrameSet_construct(){
   var o = this;
   o.__base.FDuiFrameSet.construct.call(o);
   o._propertyFrames = new MO.TDictionary();
}
MO.FEditorFrameSet_findPropertyFrame = function FEditorFrameSet_findPropertyFrame(code){
   var o = this;
   var frame = o._propertyFrames.get(code);
   if(!frame){
      frame = MO.Console.find(MO.FDuiFrameConsole).get(o, code, o._framePropertyContent._hContainer);
      frame._frameSet = o;
      o._propertyFrames.set(code, frame);
   }
   return frame;
}
MO.FEditorFrameSet_hidePropertyFrames = function FEditorFrameSet_hidePropertyFrames(){
   var o = this;
   var frames = o._propertyFrames;
   var count = frames.count();
   for(var i = 0; i < count; i++){
      var frame = frames.at(i);
      frame.hide();
   }
}
MO.FEditorFrameSet_selectPropertyFrame = function FEditorFrameSet_selectPropertyFrame(frameName){
   var o = this;
   o.hidePropertyFrames();
   var frame = null;
   if(frameName){
      frame = o.findPropertyFrame(frameName);
      frame.show();
   }
   o._activePropertyFrame = frame;
   return frame;
}
MO.FEditorFrameSet_dispose = function FEditorFrameSet_dispose(){
   var o = this;
   o._activeSpace = null;
   o._propertyFrames = MO.Lang.Object.dispose(o._propertyFrames, true);
   o.__base.FDuiFrameSet.dispose.call(o);
}
MO.FEditorGuiManage = function FEditorGuiManage(o){
   o = MO.Class.inherits(this, o, MO.FGuiCanvasManage);
   o.construct = MO.FEditorGuiManage_construct;
   o.dispose   = MO.FEditorGuiManage_dispose;
   return o;
}
MO.FEditorGuiManage_construct = function FEditorGuiManage_construct(){
   var o = this;
   o.__base.FGuiCanvasManage.construct.call(o);
}
MO.FEditorGuiManage_dispose = function FEditorGuiManage_dispose(){
   var o = this;
   o.__base.FGuiCanvasManage.dispose.call(o);
}
MO.FEditorDsCatalogContent = function FEditorDsCatalogContent(o){
   o = MO.Class.inherits(this, o, MO.FDuiDataTreeView);
   o._defineCode    = null;
   o._serviceDefine = 'content.define.tree';
   o._containerName = MO.Class.register(o, new MO.AGetter('_containerName'));
   o._itemName      = MO.Class.register(o, new MO.AGetter('_itemName'));
   o.onDefineLoad   = MO.FEditorDsCatalogContent_onDefineLoad;
   o.onNodeClick    = MO.FEditorDsCatalogContent_onNodeClick;
   o.construct      = MO.FEditorDsCatalogContent_construct;
   o.dispose        = MO.FEditorDsCatalogContent_dispose;
   return o;
}
MO.FEditorDsCatalogContent_onDefineLoad = function FEditorDsCatalogContent_onDefineLoad(event){
   var o = this;
   o.__base.FDuiDataTreeView.onDefineLoad.call(o, event);
   var xtree = event.xtree;
   var serviceCode = xtree.get('service');
   if(serviceCode){
      o.loadService(serviceCode);
   }
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
      frame.psMode(MO.EUiMode.Update);
      frame.dataModify();
      frame.doLoad(typeGroup, containerName);
   }else if(typeGroup == MO.EDuiTreeNodeGroup.Item){
      var frame = o._frameSet.selectObject(frameName);
      frame.psMode(MO.EUiMode.Update);
      frame.dataModify();
      var itemName = o._itemName = node.guid();
      frame.doLoad(typeGroup, containerName, itemName);
   }
}
MO.FEditorDsCatalogContent_construct = function FEditorDsCatalogContent_construct(){
   var o = this;
   o.__base.FDuiDataTreeView.construct.call(o);
   o.loadDefine(o._defineCode);
}
MO.FEditorDsCatalogContent_dispose = function FEditorDsCatalogContent_dispose(){
   var o = this;
   o.__base.FDuiDataTreeView.dispose.call(o);
}
MO.FEditorDsCatalogToolBar = function FEditorDsCatalogToolBar(o){
   o = MO.Class.inherits(this, o, MO.FDuiToolBar);
   o._listFrameName = null;
   o.onSearchClick  = MO.FEditorDsCatalogToolBar_onSearchClick;
   o.onRefreshClick = MO.FEditorDsCatalogToolBar_onRefreshClick;
   o.onListClick    = MO.FEditorDsCatalogToolBar_onListClick;
   o.onBuilded      = MO.FEditorDsCatalogToolBar_onBuilded;
   o.construct      = MO.FEditorDsCatalogToolBar_construct;
   o.dispose        = MO.FEditorDsCatalogToolBar_dispose;
   return o;
}
MO.FEditorDsCatalogToolBar_onSearchClick = function FEditorDsCatalogToolBar_onSearchClick(event){
}
MO.FEditorDsCatalogToolBar_onRefreshClick = function FEditorDsCatalogToolBar_onRefreshClick(event){
   var o = this;
   var catalog = o._frameSet._catalogContent;
   catalog.reloadNode();
}
MO.FEditorDsCatalogToolBar_onListClick = function FEditorDsCatalogToolBar_onListClick(event){
   var o = this;
   o._frameSet.selectObject(o._listFrameName);
}
MO.FEditorDsCatalogToolBar_onBuilded = function FEditorDsCatalogToolBar_onBuilded(p){
   var o = this;
   o.__base.FDuiToolBar.onBuilded.call(o, p);
   o._controlSearch.addClickListener(o, o.onSearchClick);
   o._controlRefresh.addClickListener(o, o.onRefreshClick);
   o._controlList.addClickListener(o, o.onListClick);
}
MO.FEditorDsCatalogToolBar_construct = function FEditorDsCatalogToolBar_construct(){
   var o = this;
   o.__base.FDuiToolBar.construct.call(o);
}
MO.FEditorDsCatalogToolBar_dispose = function FEditorDsCatalogToolBar_dispose(){
   var o = this;
   o.__base.FDuiToolBar.dispose.call(o);
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
MO.FEditorDsPropertyForm_onBuilded = function FEditorDsPropertyForm_onBuilded(event){
   var o = this;
   o.__base.FDuiForm.onBuilded.call(o, event);
   var buttons = new MO.TObjects();
   o.searchComponents(buttons, MO.MUiToolButton);
   o.searchComponents(buttons, MO.MUiMenuButton);
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
   var dataActionCd = o._dataActionCd;
   switch(dataActionCd){
      case MO.EUiDataAction.Insert:
         if(o._logicGroup == 'container'){
            o._frameSet._catalogContent.reload();
         }else{
            o._frameSet._catalogContent.reloadNode();
         }
         break;
      case MO.EUiDataAction.Update:
         break;
      case MO.EUiDataAction.Delete:
         if(o._logicGroup == 'container'){
            o._frameSet._catalogContent.reload();
         }else{
            o._frameSet._catalogContent.reloadParentNode();
         }
         break;
      default:
         throw new MO.TError(o, 'Invalid data action.');
   }
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
   o.doSave();
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
   o._controlDatasetButton.addClickListener(o, o.onSliderButtonClick);
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
      case 'datasetButton':
         o.selectFrameSet(MO.EEditorFrameSet.DatasetFrameSet);
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
         frameSet = MO.Console.find(MO.FDuiFrameConsole).findByClass(o, MO.FEditorDsPersistenceFrameSet);
      }else if(name == MO.EEditorFrameSet.ListFrameSet){
         frameSet = MO.Console.find(MO.FDuiFrameConsole).findByClass(o, MO.FEditorDsListFrameSet);
      }else if(name == MO.EEditorFrameSet.TreeFrameSet){
         frameSet = MO.Console.find(MO.FDuiFrameConsole).findByClass(o, MO.FEditorDsTreeFrameSet);
      }else if(name == MO.EEditorFrameSet.FrameFrameSet){
         frameSet = MO.Console.find(MO.FDuiFrameConsole).findByClass(o, MO.FEditorDsFrameFrameSet);
      }else if(name == MO.EEditorFrameSet.DatasetFrameSet){
         frameSet = MO.Console.find(MO.FDuiFrameConsole).findByClass(o, MO.FEditorDsDatasetFrameSet);
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
      case MO.EEditorFrameSet.DatasetFrameSet:
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
   }else if(code == MO.EEditorFrameSet.DatasetFrameSet){
      o.selectFrameSet(MO.EEditorFrameSet.DatasetFrameSet);
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
MO.FEditorDsPersistenceCatalogContent = function FEditorDsPersistenceCatalogContent(o){
   o = MO.Class.inherits(this, o, MO.FEditorDsCatalogContent);
   o._defineCode = 'editor.design.persistence';
   return o;
}
MO.FEditorDsPersistenceCatalogToolBar = function FEditorDsPersistenceCatalogToolBar(o){
   o = MO.Class.inherits(this, o, MO.FEditorDsCatalogToolBar);
   o._frameName     = 'editor.design.persistence.CatalogToolBar';
   o._listFrameName = 'editor.design.persistence.ListForm';
   o.construct      = MO.FEditorDsPersistenceCatalogToolBar_construct;
   o.dispose        = MO.FEditorDsPersistenceCatalogToolBar_dispose;
   return o;
}
MO.FEditorDsPersistenceCatalogToolBar_construct = function FEditorDsPersistenceCatalogToolBar_construct(){
   var o = this;
   o.__base.FEditorDsCatalogToolBar.construct.call(o);
}
MO.FEditorDsPersistenceCatalogToolBar_dispose = function FEditorDsPersistenceCatalogToolBar_dispose(){
   var o = this;
   o.__base.FEditorDsCatalogToolBar.dispose.call(o);
}
MO.FEditorDsPersistenceFrameSet = function FEditorDsPersistenceFrameSet(o){
   o = MO.Class.inherits(this, o, MO.FEditorDsFrameSet);
   o._frameName = 'editor.design.persistence.FrameSet';
   o.onBuilded  = MO.FEditorDsPersistenceFrameSet_onBuilded;
   o.construct  = MO.FEditorDsPersistenceFrameSet_construct;
   o.dispose    = MO.FEditorDsPersistenceFrameSet_dispose;
   return o;
}
MO.FEditorDsPersistenceFrameSet_onBuilded = function FEditorDsPersistenceFrameSet_onBuilded(event){
   var o = this;
   o.__base.FEditorDsFrameSet.onBuilded.call(o, event);
   o._frameCatalogTitle._hPanel.className = o.styleName('Title_Ground');
   o._frameCatalogToolBar._hPanel.className = o.styleName('Toolbar_Ground');
   o._frameCatalogContent._hPanel.className = o.styleName('Catalog_Content');
   o._framePropertyTitle._hPanel.className = o.styleName('Title_Ground');
   o._framePropertyToolBar._hPanel.className = o.styleName('Toolbar_Ground');
   o._framePropertyContent._hPanel.className = o.styleName('Property_Content');
   var spliter = o._catalogSplitter = o.searchControl('catalogSpliter');
   spliter.setAlignCd(MO.EUiAlign.Left);
   spliter.setSizeHtml(o._frameCatalog._hPanel);
   var control = o._catalogToolbar = MO.Class.create(MO.FEditorDsPersistenceCatalogToolBar);
   control._workspace = o._workspace;
   control._frameSet = o;
   control.buildDefine(event);
   o._frameCatalogToolBar.push(control);
   var control = o._catalogContent = MO.Class.create(MO.FEditorDsPersistenceCatalogContent);
   control._workspace = o._workspace;
   control._frameSet = o;
   control.build(event);
   o._frameCatalogContent.push(control);
   MO.Window.Html.textSet(o._frameCatalogTitle._hPanel, '持久化目录');
}
MO.FEditorDsPersistenceFrameSet_construct = function FEditorDsPersistenceFrameSet_construct(){
   var o = this;
   o.__base.FEditorDsFrameSet.construct.call(o);
}
MO.FEditorDsPersistenceFrameSet_dispose = function FEditorDsPersistenceFrameSet_dispose(){
   var o = this;
   o.__base.FEditorDsFrameSet.dispose.call(o);
}
MO.FEditorDsListCatalogContent = function FEditorDsListCatalogContent(o){
   o = MO.Class.inherits(this, o, MO.FEditorDsCatalogContent);
   o._defineCode = 'editor.design.list';
   return o;
}
MO.FEditorDsListCatalogToolBar = function FEditorDsListCatalogToolBar(o){
   o = MO.Class.inherits(this, o, MO.FDuiToolBar);
   o._frameName  = 'editor.design.list.CatalogToolBar';
   o.onListClick = MO.FEditorDsListCatalogToolBar_onListClick;
   o.onBuilded   = MO.FEditorDsListCatalogToolBar_onBuilded;
   o.construct   = MO.FEditorDsListCatalogToolBar_construct;
   o.dispose     = MO.FEditorDsListCatalogToolBar_dispose;
   return o;
}
MO.FEditorDsListCatalogToolBar_onListClick = function FEditorDsListCatalogToolBar_onListClick(event){
   this._frameSet.selectObject('editor.design.list.ListForm');
}
MO.FEditorDsListCatalogToolBar_onBuilded = function FEditorDsListCatalogToolBar_onBuilded(p){
   var o = this;
   o.__base.FDuiToolBar.onBuilded.call(o, p);
   o._controlList.addClickListener(o, o.onListClick);
}
MO.FEditorDsListCatalogToolBar_construct = function FEditorDsListCatalogToolBar_construct(){
   var o = this;
   o.__base.FDuiToolBar.construct.call(o);
}
MO.FEditorDsListCatalogToolBar_dispose = function FEditorDsListCatalogToolBar_dispose(){
   var o = this;
   o.__base.FDuiToolBar.dispose.call(o);
}
MO.FEditorDsListFrameSet = function FEditorDsListFrameSet(o){
   o = MO.Class.inherits(this, o, MO.FEditorDsFrameSet);
   o._frameName = 'editor.design.list.FrameSet';
   o.onBuilded  = MO.FEditorDsListFrameSet_onBuilded;
   o.construct  = MO.FEditorDsListFrameSet_construct;
   o.dispose    = MO.FEditorDsListFrameSet_dispose;
   return o;
}
MO.FEditorDsListFrameSet_onBuilded = function FEditorDsListFrameSet_onBuilded(event){
   var o = this;
   o.__base.FEditorDsFrameSet.onBuilded.call(o, event);
   o._frameCatalogTitle._hPanel.className = o.styleName('Title_Ground');
   o._frameCatalogToolBar._hPanel.className = o.styleName('Toolbar_Ground');
   o._frameCatalogContent._hPanel.className = o.styleName('Catalog_Content');
   o._framePropertyTitle._hPanel.className = o.styleName('Title_Ground');
   o._framePropertyToolBar._hPanel.className = o.styleName('Toolbar_Ground');
   o._framePropertyContent._hPanel.className = o.styleName('Property_Content');
   var spliter = o._catalogSplitter = o.searchControl('catalogSpliter');
   spliter.setAlignCd(MO.EUiAlign.Left);
   spliter.setSizeHtml(o._frameCatalog._hPanel);
   var control = o._catalogToolbar = MO.Class.create(MO.FEditorDsListCatalogToolBar);
   control._frameSet = o;
   control.buildDefine(event);
   o._frameCatalogToolBar.push(control);
   var control = o._catalogContent = MO.Class.create(MO.FEditorDsListCatalogContent);
   control._frameSet = o;
   control.build(event);
   o._frameCatalogContent.push(control);
   MO.Window.Html.textSet(o._frameCatalogTitle._hPanel, '列表目录');
}
MO.FEditorDsListFrameSet_construct = function FEditorDsListFrameSet_construct(){
   var o = this;
   o.__base.FEditorDsFrameSet.construct.call(o);
}
MO.FEditorDsListFrameSet_dispose = function FEditorDsListFrameSet_dispose(){
   var o = this;
   o.__base.FEditorDsFrameSet.dispose.call(o);
}
MO.FEditorDsTreeCatalogContent = function FEditorDsTreeCatalogContent(o){
   o = MO.Class.inherits(this, o, MO.FEditorDsCatalogContent);
   o._defineCode = 'editor.design.tree';
   return o;
}
MO.FEditorDsTreeCatalogToolBar = function FEditorDsTreeCatalogToolBar(o){
   o = MO.Class.inherits(this, o, MO.FDuiToolBar);
   o._frameName  = 'editor.design.tree.CatalogToolBar';
   o.onListClick = MO.FEditorDsTreeCatalogToolBar_onListClick;
   o.onBuilded   = MO.FEditorDsTreeCatalogToolBar_onBuilded;
   o.construct   = MO.FEditorDsTreeCatalogToolBar_construct;
   o.dispose     = MO.FEditorDsTreeCatalogToolBar_dispose;
   return o;
}
MO.FEditorDsTreeCatalogToolBar_onListClick = function FEditorDsTreeCatalogToolBar_onListClick(event){
   this._frameSet.selectObject('editor.design.tree.ListForm');
}
MO.FEditorDsTreeCatalogToolBar_onBuilded = function FEditorDsTreeCatalogToolBar_onBuilded(p){
   var o = this;
   o.__base.FDuiToolBar.onBuilded.call(o, p);
   o._controlList.addClickListener(o, o.onListClick);
}
MO.FEditorDsTreeCatalogToolBar_construct = function FEditorDsTreeCatalogToolBar_construct(){
   var o = this;
   o.__base.FDuiToolBar.construct.call(o);
}
MO.FEditorDsTreeCatalogToolBar_dispose = function FEditorDsTreeCatalogToolBar_dispose(){
   var o = this;
   o.__base.FDuiToolBar.dispose.call(o);
}
MO.FEditorDsTreeFrameSet = function FEditorDsTreeFrameSet(o){
   o = MO.Class.inherits(this, o, MO.FEditorDsFrameSet);
   o._frameName = 'editor.design.tree.FrameSet';
   o.onBuilded  = MO.FEditorDsTreeFrameSet_onBuilded;
   o.construct  = MO.FEditorDsTreeFrameSet_construct;
   o.dispose    = MO.FEditorDsTreeFrameSet_dispose;
   return o;
}
MO.FEditorDsTreeFrameSet_onBuilded = function FEditorDsTreeFrameSet_onBuilded(event){
   var o = this;
   o.__base.FEditorDsFrameSet.onBuilded.call(o, event);
   o._frameCatalogTitle._hPanel.className = o.styleName('Title_Ground');
   o._frameCatalogToolBar._hPanel.className = o.styleName('Toolbar_Ground');
   o._frameCatalogContent._hPanel.className = o.styleName('Catalog_Content');
   o._framePropertyTitle._hPanel.className = o.styleName('Title_Ground');
   o._framePropertyToolBar._hPanel.className = o.styleName('Toolbar_Ground');
   o._framePropertyContent._hPanel.className = o.styleName('Property_Content');
   var spliter = o._catalogSplitter = o.searchControl('catalogSpliter');
   spliter.setAlignCd(MO.EUiAlign.Left);
   spliter.setSizeHtml(o._frameCatalog._hPanel);
   var control = o._catalogToolbar = MO.Class.create(MO.FEditorDsTreeCatalogToolBar);
   control._workspace = o._workspace;
   control._frameSet = o;
   control.buildDefine(event);
   o._frameCatalogToolBar.push(control);
   var control = o._catalogContent = MO.Class.create(MO.FEditorDsTreeCatalogContent);
   control._workspace = o._workspace;
   control._frameSet = o;
   control.build(event);
   o._frameCatalogContent.push(control);
   MO.Window.Html.textSet(o._frameCatalogTitle._hPanel, '树目录配置');
}
MO.FEditorDsTreeFrameSet_construct = function FEditorDsTreeFrameSet_construct(){
   var o = this;
   o.__base.FEditorDsFrameSet.construct.call(o);
}
MO.FEditorDsTreeFrameSet_dispose = function FEditorDsTreeFrameSet_dispose(){
   var o = this;
   o.__base.FEditorDsFrameSet.dispose.call(o);
}
MO.FEditorDsFrameBarProperty = function FEditorDsFrameBarProperty(o){
   o = MO.Class.inherits(this, o, MO.FDsSystemFrameControlProperty);
   o._activeSpace      = null;
   o._activeRenderable = null;
   o.onBuilded         = MO.FEditorDsFrameBarProperty_onBuilded;
   o.onDataChanged     = MO.FEditorDsFrameBarProperty_onDataChanged;
   o.construct         = MO.FEditorDsFrameBarProperty_construct;
   o.loadObject        = MO.FEditorDsFrameBarProperty_loadObject;
   o.dispose           = MO.FEditorDsFrameBarProperty_dispose;
   return o;
}
MO.FEditorDsFrameBarProperty_onBuilded = function FEditorDsFrameBarProperty_onBuilded(p){
   var o = this;
   o.__base.FDsSystemFrameControlProperty.onBuilded.call(o, p);
}
MO.FEditorDsFrameBarProperty_onDataChanged = function FEditorDsFrameBarProperty_onDataChanged(p){
   var o = this;
   o.__base.FDsSystemFrameControlProperty.onDataChanged.call(o, p);
}
MO.FEditorDsFrameBarProperty_construct = function FEditorDsFrameBarProperty_construct(){
   var o = this;
   o.__base.FDsSystemFrameControlProperty.construct.call(o);
}
MO.FEditorDsFrameBarProperty_loadObject = function FEditorDsFrameBarProperty_loadObject(frame, control){
   var o = this;
   o.__base.FDsSystemFrameControlProperty.loadObject.call(o, frame, control);
}
MO.FEditorDsFrameBarProperty_dispose = function FEditorDsFrameBarProperty_dispose(){
   var o = this;
   o.__base.FDsSystemFrameControlProperty.dispose.call(o);
}
MO.FEditorDsFrameButtonProperty = function FEditorDsFrameButtonProperty(o){
   o = MO.Class.inherits(this, o, MO.FDsSystemFrameControlProperty);
   o._activeSpace      = null;
   o._activeRenderable = null;
   o.onBuilded         = MO.FEditorDsFrameButtonProperty_onBuilded;
   o.onDataChanged     = MO.FEditorDsFrameButtonProperty_onDataChanged;
   o.construct         = MO.FEditorDsFrameButtonProperty_construct;
   o.loadObject        = MO.FEditorDsFrameButtonProperty_loadObject;
   o.dispose           = MO.FEditorDsFrameButtonProperty_dispose;
   return o;
}
MO.FEditorDsFrameButtonProperty_onBuilded = function FEditorDsFrameButtonProperty_onBuilded(p){
   var o = this;
   o.__base.FDsSystemFrameControlProperty.onBuilded.call(o, p);
}
MO.FEditorDsFrameButtonProperty_onDataChanged = function FEditorDsFrameButtonProperty_onDataChanged(p){
   var o = this;
   o.__base.FDsSystemFrameControlProperty.onDataChanged.call(o, p);
}
MO.FEditorDsFrameButtonProperty_construct = function FEditorDsFrameButtonProperty_construct(){
   var o = this;
   o.__base.FDsSystemFrameControlProperty.construct.call(o);
}
MO.FEditorDsFrameButtonProperty_loadObject = function FEditorDsFrameButtonProperty_loadObject(frame, control){
   var o = this;
   o.__base.FDsSystemFrameControlProperty.loadObject.call(o, frame, control);
}
MO.FEditorDsFrameButtonProperty_dispose = function FEditorDsFrameButtonProperty_dispose(){
   var o = this;
   o.__base.FDsSystemFrameControlProperty.dispose.call(o);
}
MO.FEditorDsFrameCatalogContent = function FEditorDsFrameCatalogContent(o){
   o = MO.Class.inherits(this, o, MO.FEditorDsCatalogContent);
   o._defineCode = 'editor.design.frame';
   return o;
}
MO.FEditorDsFrameCatalogToolBar = function FEditorDsFrameCatalogToolBar(o){
   o = MO.Class.inherits(this, o, MO.FDuiToolBar);
   o._frameName  = 'editor.design.frame.CatalogToolBar';
   o.onListClick = MO.FEditorDsListCatalogToolBar_onListClick;
   o.onBuilded   = MO.FEditorDsFrameCatalogToolBar_onBuilded;
   o.construct   = MO.FEditorDsFrameCatalogToolBar_construct;
   o.dispose     = MO.FEditorDsFrameCatalogToolBar_dispose;
   return o;
}
MO.FEditorDsListCatalogToolBar_onListClick = function FEditorDsListCatalogToolBar_onListClick(event){
   this._frameSet.selectObject('editor.design.frame.ListForm');
}
MO.FEditorDsFrameCatalogToolBar_onBuilded = function FEditorDsFrameCatalogToolBar_onBuilded(p){
   var o = this;
   o.__base.FDuiToolBar.onBuilded.call(o, p);
   o._controlList.addClickListener(o, o.onListClick);
}
MO.FEditorDsFrameCatalogToolBar_construct = function FEditorDsFrameCatalogToolBar_construct(){
   var o = this;
   o.__base.FDuiToolBar.construct.call(o);
}
MO.FEditorDsFrameCatalogToolBar_dispose = function FEditorDsFrameCatalogToolBar_dispose(){
   var o = this;
   o.__base.FDuiToolBar.dispose.call(o);
}
MO.FEditorDsFrameComponentProperty = function FEditorDsFrameComponentProperty(o){
   o = MO.Class.inherits(this, o, MO.FDuiForm);
   o._activeFrame     = null;
   o._activeComponent = null;
   o.onBuilded        = MO.FEditorDsFrameComponentProperty_onBuilded;
   o.onDataChanged    = MO.FEditorDsFrameComponentProperty_onDataChanged;
   o.construct        = MO.FEditorDsFrameComponentProperty_construct;
   o.loadObject       = MO.FEditorDsFrameComponentProperty_loadObject;
   o.dispose          = MO.FEditorDsFrameComponentProperty_dispose;
   return o;
}
MO.FEditorDsFrameComponentProperty_onBuilded = function FEditorDsFrameComponentProperty_onBuilded(p){
   var o = this;
   o.__base.FDuiForm.onBuilded.call(o, p);
}
MO.FEditorDsFrameComponentProperty_onDataChanged = function FEditorDsFrameComponentProperty_onDataChanged(event){
   var o  = this;
   var frame = o._activeFrame;
   var control = o._activeControl;
   var size = o._controlSize.get();
   control.size().set(size.x, size.y);
   frame.build();
}
MO.FEditorDsFrameComponentProperty_construct = function FEditorDsFrameComponentProperty_construct(){
   var o = this;
   o.__base.FDuiForm.construct.call(o);
}
MO.FEditorDsFrameComponentProperty_loadObject = function FEditorDsFrameComponentProperty_loadObject(frame, component){
   var o = this;
   o._activeFrame = frame;
   o._activeComponent = component;
   o._controlType.set(RClass.name(component));
   o._controlName.set(component.name());
   o._controlLabel.set(component.label());
}
MO.FEditorDsFrameComponentProperty_dispose = function FEditorDsFrameComponentProperty_dispose(){
   var o = this;
   o.__base.FDuiForm.dispose.call(o);
}
MO.FEditorDsFrameControlProperty = function FEditorDsFrameControlProperty(o){
   o = MO.Class.inherits(this, o, MO.FDsSystemFrameComponentProperty);
   o._activeFrame   = null;
   o._activeControl = null;
   o.onBuilded      = MO.FEditorDsFrameControlProperty_onBuilded;
   o.onDataChanged  = MO.FEditorDsFrameControlProperty_onDataChanged;
   o.construct      = MO.FEditorDsFrameControlProperty_construct;
   o.loadObject     = MO.FEditorDsFrameControlProperty_loadObject;
   o.dispose        = MO.FEditorDsFrameControlProperty_dispose;
   return o;
}
MO.FEditorDsFrameControlProperty_onBuilded = function FEditorDsFrameControlProperty_onBuilded(event){
   var o = this;
   o.__base.FDsSystemFrameComponentProperty.onBuilded.call(o, event);
   o._controlSize.addDataChangedListener(o, o.onDataChanged);
}
MO.FEditorDsFrameControlProperty_onDataChanged = function FEditorDsFrameControlProperty_onDataChanged(event){
   var o  = this;
   o.__base.FDsSystemFrameComponentProperty.onDataChanged.call(o, event);
   var frame = o._activeFrame;
   var control = o._activeControl;
   var size = o._controlSize.get();
   control.size().set(size.x, size.y);
   frame.build();
}
MO.FEditorDsFrameControlProperty_construct = function FEditorDsFrameControlProperty_construct(){
   var o = this;
   o.__base.FDsSystemFrameComponentProperty.construct.call(o);
}
MO.FEditorDsFrameControlProperty_loadObject = function FEditorDsFrameControlProperty_loadObject(frame, control){
   var o = this;
   o.__base.FDsSystemFrameComponentProperty.loadObject.call(o, frame, control);
   o._activeFrame = frame;
   o._activeControl = control;
   var location = control.location();
   o._controlLocation.set(location);
   var size = control.size();
   o._controlSize.set(size);
   o._controlForeColor.set(control.foreColor());
   o._controlBackColor.set(control.backColor());
   o._controlBackResource.set(control.backResource());
   o._controlBackGrid.set(control.backGrid());
}
MO.FEditorDsFrameControlProperty_dispose = function FEditorDsFrameControlProperty_dispose(){
   var o = this;
   o.__base.FDsSystemFrameComponentProperty.dispose.call(o);
}
MO.FEditorDsFrameFrameSet = function FEditorDsFrameFrameSet(o){
   o = MO.Class.inherits(this, o, MO.FEditorDsFrameSet);
   o._frameName    = 'editor.design.frame.FrameSet';
   o.onBuilded     = MO.FEditorDsFrameFrameSet_onBuilded;
   o.construct     = MO.FEditorDsFrameFrameSet_construct;
   o.setFrameTitle = MO.FEditorDsFrameFrameSet_setFrameTitle;
   o.dispose       = MO.FEditorDsFrameFrameSet_dispose;
   return o;
}
MO.FEditorDsFrameFrameSet_onBuilded = function FEditorDsFrameFrameSet_onBuilded(event){
   var o = this;
   o.__base.FEditorDsFrameSet.onBuilded.call(o, event);
   o._frameCatalogTitle._hPanel.className = o.styleName('Title_Ground');
   o._frameCatalogToolBar._hPanel.className = o.styleName('Toolbar_Ground');
   o._frameCatalogContent._hPanel.className = o.styleName('Catalog_Content');
   o._frameSpaceTitle._hPanel.className = o.styleName('Title_Ground');
   o._frameSpaceToolBar._hPanel.className = o.styleName('Toolbar_Ground');
   o._frameSpaceContent._hPanel.className = o.styleName('Space_Content');
   o._framePropertyToolBar._hPanel.className = o.styleName('Toolbar_Ground');
   o._framePropertyContent._hPanel.className = o.styleName('Property_Content');
   var spliter = o._catalogSplitter = o.searchControl('catalogSpliter');
   spliter.setAlignCd(MO.EUiAlign.Left);
   spliter.setSizeHtml(o._frameCatalog._hPanel);
   var spliter = o._propertySpliter = o.searchControl('propertySpliter');
   spliter.setAlignCd(MO.EUiAlign.Right);
   spliter.setSizeHtml(o._frameProperty._hPanel);
   var control = o._catalogToolbar = MO.Class.create(MO.FEditorDsFrameCatalogToolBar);
   control._workspace = o._workspace;
   control._frameSet = o;
   control.buildDefine(event);
   o._frameCatalogToolBar.push(control);
   var control = o._catalogContent = MO.Class.create(MO.FEditorDsFrameCatalogContent);
   control._workspace = o._workspace;
   control._frameSet = o;
   control.build(event);
   o._frameCatalogContent.push(control);
   var control = o._spaceToolBar = MO.Class.create(MO.FEditorDsFrameSpaceToolBar);
   control._workspace = o._workspace;
   control._frameSet = o;
   control.buildDefine(event);
   o._frameSpaceToolBar.push(control);
   var control = o._spaceContent = MO.Class.create(MO.FEditorDsFrameSpaceContent);
   control._workspace = o._workspace;
   control._frameSet = o;
   control.build(o._frameSpaceContent._hPanel);
   o._frameSpaceContent.push(control);
   MO.Window.Html.textSet(o._frameCatalogTitle._hPanel, '表单目录');
}
MO.FEditorDsFrameFrameSet_construct = function FEditorDsFrameFrameSet_construct(){
   var o = this;
   o.__base.FEditorDsFrameSet.construct.call(o);
}
MO.FEditorDsFrameFrameSet_setFrameTitle = function FEditorDsFrameFrameSet_setFrameTitle(title){
   var o = this;
   var hTitlePanel = o._frameSpaceTitle._hPanel;
   MO.Window.Html.textSet(hTitlePanel, title);
}
MO.FEditorDsFrameFrameSet_dispose = function FEditorDsFrameFrameSet_dispose(){
   var o = this;
   o.__base.FEditorDsFrameSet.dispose.call(o);
}
MO.FEditorDsFramePictureProperty = function FEditorDsFramePictureProperty(o){
   o = MO.Class.inherits(this, o, MO.FDsSystemFrameControlProperty);
   o._activeSpace      = null;
   o._activeRenderable = null;
   o.onBuilded         = MO.FEditorDsFramePictureProperty_onBuilded;
   o.onDataChanged     = MO.FEditorDsFramePictureProperty_onDataChanged;
   o.construct         = MO.FEditorDsFramePictureProperty_construct;
   o.loadObject        = MO.FEditorDsFramePictureProperty_loadObject;
   o.dispose           = MO.FEditorDsFramePictureProperty_dispose;
   return o;
}
MO.FEditorDsFramePictureProperty_onBuilded = function FEditorDsFramePictureProperty_onBuilded(p){
   var o = this;
   o.__base.FDsSystemFrameControlProperty.onBuilded.call(o, p);
}
MO.FEditorDsFramePictureProperty_onDataChanged = function FEditorDsFramePictureProperty_onDataChanged(p){
   var o = this;
   o.__base.FDsSystemFrameControlProperty.onDataChanged.call(o, p);
}
MO.FEditorDsFramePictureProperty_construct = function FEditorDsFramePictureProperty_construct(){
   var o = this;
   o.__base.FDsSystemFrameControlProperty.construct.call(o);
}
MO.FEditorDsFramePictureProperty_loadObject = function FEditorDsFramePictureProperty_loadObject(frame, control){
   var o = this;
   o.__base.FDsSystemFrameControlProperty.loadObject.call(o, frame, control);
}
MO.FEditorDsFramePictureProperty_dispose = function FEditorDsFramePictureProperty_dispose(){
   var o = this;
   o.__base.FDsSystemFrameControlProperty.dispose.call(o);
}
MO.FEditorDsFramePropertyToolBarForm = function FEditorDsFramePropertyToolBarForm(o){
   o = MO.Class.inherits(this, o, MO.FEditorDsPropertyForm);
   o._logicService = 'editor.design.frame';
   o._logicGroup   = 'item';
   return o;
}
MO.FEditorDsFrameSpaceContent = function FEditorDsFrameSpaceContent(o){
   o = MO.Class.inherits(this, o, MO.FDuiControl, MO.MGraphicObject);
   o._scaleRate          = 1;
   o._optionAlpha        = false;
   o._desktop            = MO.Class.register(o, new MO.AGetter('_desktop'));
   o._guiManager         = MO.Class.register(o, new MO.AGetter('_guiManager'));
   o._activeStage        = MO.Class.register(o, new MO.AGetter('_activeStage'));
   o._activeFrame        = null;
   o._activeControls     = null;
   o._capturePosition    = null;
   o._captureRotation    = null;
   o.onEnterFrame        = MO.FEditorDsFrameSpaceContent_onEnterFrame;
   o.onMouseCaptureStart = MO.FEditorDsFrameSpaceContent_onMouseCaptureStart;
   o.onMouseCapture      = MO.FEditorDsFrameSpaceContent_onMouseCapture;
   o.onMouseCaptureStop  = MO.FEditorDsFrameSpaceContent_onMouseCaptureStop;
   o.onResize            = MO.FEditorDsFrameSpaceContent_onResize;
   o.onProcess           = MO.FEditorDsFrameSpaceContent_onProcess;
   o.onKeyDown           = MO.FEditorDsFrameSpaceContent_onKeyDown;
   o.oeResize            = MO.FEditorDsFrameSpaceContent_oeResize;
   o.oeFrame             = MO.FEditorDsFrameSpaceContent_oeFrame;
   o.construct           = MO.FEditorDsFrameSpaceContent_construct;
   o.build               = MO.FEditorDsFrameSpaceContent_build;
   o.controlAction       = MO.FEditorDsFrameSpaceContent_controlAction;
   o.selectControl       = MO.FEditorDsFrameSpaceContent_selectControl;
   o.loadFrame           = MO.FEditorDsFrameSpaceContent_loadFrame;
   o.dispose             = MO.FEditorDsFrameSpaceContent_dispose;
   return o;
}
MO.FEditorDsFrameSpaceContent_onEnterFrame = function FEditorDsFrameSpaceContent_onEnterFrame(){
   var o = this;
   var stage = o._activeStage;
   if(!stage){
      return;
   }
   var c = stage.camera();
   var d = 0.5;
   var r = 0.05;
   var kw = MO.RKeyboard.isPress(MO.EKeyCode.W);
   var ks = MO.RKeyboard.isPress(MO.EKeyCode.S);
   if(kw && !ks){
      c.doWalk(d);
   }
   if(!kw && ks){
      c.doWalk(-d);
   }
   var ka = MO.RKeyboard.isPress(MO.EKeyCode.A);
   var kd = MO.RKeyboard.isPress(MO.EKeyCode.D);
   if(ka && !kd){
      c.doYaw(r);
   }
   if(!ka && kd){
      c.doYaw(-r);
   }
   var kq = MO.RKeyboard.isPress(MO.EKeyCode.Q);
   var ke = MO.RKeyboard.isPress(MO.EKeyCode.E);
   if(kq && !ke){
      c.doFly(d);
   }
   if(!kq && ke){
      c.doFly(-d);
   }
   var kz = MO.RKeyboard.isPress(MO.EKeyCode.Z);
   var kw = MO.RKeyboard.isPress(MO.EKeyCode.X);
   if(kz && !kw){
      c.doPitch(r);
   }
   if(!kz && kw){
      c.doPitch(-r);
   }
   c.update();
   if(o._optionRotation){
      var r = o._rotation;
      var ls = stage.layers();
      var c = ls.count();
      for(var i = 0; i < c; i++){
         var l = ls.value(i);
         var m = l.matrix();
         m.setRotation(0, r.y, 0);
         m.update();
      }
      r.y += 0.01;
   }
}
MO.FEditorDsFrameSpaceContent_onMouseCaptureStart = function FEditorDsFrameSpaceContent_onMouseCaptureStart(p){
   var o = this;
   var s = o._activeStage;
   if(!s){
      return;
   }
   var r = o._activeStage.region();
   var st = MO.Console.find(MO.FG3dTechniqueConsole).find(o._graphicContext, MO.FG3dSelectTechnique);
   var r = st.test(r, p.offsetX, p.offsetY);
   o._capturePosition.set(p.clientX, p.clientY);
   o._captureRotation.assign(s.camera()._rotation);
}
MO.FEditorDsFrameSpaceContent_onMouseCapture = function FEditorDsFrameSpaceContent_onMouseCapture(p){
   var o = this;
   var s = o._activeStage;
   if(!s){
      return;
   }
   var cx = p.clientX - o._capturePosition.x;
   var cy = p.clientY - o._capturePosition.y;
   var c = o._activeStage.camera();
   var r = c.rotation();
   var cr = o._captureRotation;
   r.x = cr.x + cy * 0.003;
   r.y = cr.y + cx * 0.003;
}
MO.FEditorDsFrameSpaceContent_onMouseCaptureStop = function FEditorDsFrameSpaceContent_onMouseCaptureStop(p){
}
MO.FEditorDsFrameSpaceContent_onResize = function FEditorDsFrameSpaceContent_onResize(){
   var o = this;
   o.__base.FDuiControl.onResize.call(o, event);
   var c = o._graphicContext;
   var cs = c.size();
   var s = o._activeStage;
   if(s){
      var rp = s.camera().projection();
      rp.size().set(cs.width, cs.height);
      rp.update();
   }
}
MO.FEditorDsFrameSpaceContent_onProcess = function FEditorDsFrameSpaceContent_onProcess(event){
   var o = this;
   var frame = o._activeFrame;
   if(frame){
      frame.psUpdate();
   }
}
MO.FEditorDsFrameSpaceContent_controlAction = function FEditorDsFrameSpaceContent_controlAction(keyCode, control){
   var o = this;
   var location = control.location();
   var size = control.size();
   switch(keyCode){
      case MO.EKeyCode.A:
         location.x--;
         return true;
      case MO.EKeyCode.W:
         location.y--;
         return true;
      case MO.EKeyCode.D:
         location.x++;
         return true;
      case MO.EKeyCode.S:
         location.y++;
         return true;
      case MO.EKeyCode.J:
         size.width--;
         return true;
      case MO.EKeyCode.I:
         size.height--;
         return true;
      case MO.EKeyCode.L:
         size.width++;
         return true;
      case MO.EKeyCode.K:
         size.height++;
         return true;
   }
   return false;
}
MO.FEditorDsFrameSpaceContent_onKeyDown = function FEditorDsFrameSpaceContent_onKeyDown(event){
   var o = this;
   var keyCode = event.keyCode;
   var controls = o._activeControls;
   if(!controls.isEmpty()){
      var changed = false;
      var count = controls.count();
      for(var i = 0; i < count; i++){
         var control = controls.at(i);
         if(o.controlAction(keyCode, control)){
            changed = true;
         }
      }
      if(changed){
         o._activeFrame.build();
      }
   }
}
MO.FEditorDsFrameSpaceContent_oeResize = function FEditorDsFrameSpaceContent_oeResize(event){
   var o = this;
   o.__base.FDuiControl.oeResize.call(o, event);
   return MO.EEventStatus.Stop;
}
MO.FEditorDsFrameSpaceContent_oeFrame = function FEditorDsFrameSpaceContent_oeFrame(event){
   var o = this;
   o.__base.FDuiControl.oeFrame.call(o, event);
   return;
   o._guiManager.process();
   return MO.EEventStatus.Stop;
}
MO.FEditorDsFrameSpaceContent_construct = function FEditorDsFrameSpaceContent_construct(){
   var o = this;
   o.__base.FDuiControl.construct.call(o);
   o._rotation = new MO.SVector3();
   o._activeControls = new MO.TObjects();
   o._capturePosition = new MO.SPoint2();
   o._captureRotation = new MO.SVector3();
   MO.RWindow.lsnsKeyDown.register(o, o.onKeyDown);
}
MO.FEditorDsFrameSpaceContent_build = function FEditorDsFrameSpaceContent_build(hPanel){
   var o = this;
   return;
   var desktop = o._desktop = MO.Class.create(MO.FEditorDesktop);
   desktop.build(hPanel);
   o.linkGraphicContext(desktop.canvas3d());
   var guiManager = o._guiManager = MO.Class.create(MO.FGuiCanvasManager);
   guiManager.linkGraphicContext(desktop.canvas3d());
   guiManager.setDesktop(desktop);
   guiManager.setCanvas(desktop.canvas2d());
   guiManager.setup();
}
MO.FEditorDsFrameSpaceContent_selectControl = function FEditorDsFrameSpaceContent_selectControl(control){
   var o = this;
   var controls = o._activeControls;
   controls.clear();
   controls.push(control);
}
MO.FEditorDsFrameSpaceContent_loadFrame = function FEditorDsFrameSpaceContent_loadFrame(code){
   var o = this;
   var frame = o._activeFrame;
   if(frame){
      o._guiManager.unregister(frame);
      o._activeFrame = null;
   }
   var frameConsole = MO.Console.find(MO.FGuiFrameConsole);
   frame = o._activeFrame = frameConsole.get(o, code);
   frame.setLocation(0, 0);
   o._guiManager.register(frame);
}
MO.FEditorDsFrameSpaceContent_dispose = function FEditorDsFrameSpaceContent_dispose(){
   var o = this;
   o._rotation = MO.Lang.Obejct.dispose(o._rotation)
   o.__base.FDuiControl.dispose.call(o);
}
MO.FEditorDsFrameSpaceToolBar = function FEditorDsFrameSpaceToolBar(o){
   o = MO.Class.inherits(this, o, MO.FDuiToolBar);
   o._frameName   = 'editor.design.frame.SpaceToolBar';
   o._storageCode = o._frameName;
   o._controlFolderCreateButton   = null;
   o._controlFolderDeleteButton   = null;
   o._controlFolderPropertyButton = null;
   o._controlFolderOpenButton     = null;
   o._controlFolderCloseButton    = null;
   o._activeNodeGuid              = null;
   o.onBuilded                    = MO.FEditorDsFrameSpaceToolBar_onBuilded;
   o.onFolderCreateClick          = MO.FEditorDsFrameSpaceToolBar_onFolderCreateClick;
   o.onFolderDeleteLoad           = MO.FEditorDsFrameSpaceToolBar_onFolderDeleteLoad;
   o.onFolderDeleteExcute         = MO.FEditorDsFrameSpaceToolBar_onFolderDeleteExcute;
   o.onFolderDeleteClick          = MO.FEditorDsFrameSpaceToolBar_onFolderDeleteClick;
   o.onFolderPropertyClick        = MO.FEditorDsFrameSpaceToolBar_onFolderPropertyClick;
   o.onFolderOpenClick            = MO.FEditorDsFrameSpaceToolBar_onFolderOpenClick;
   o.onFolderCloseClick           = MO.FEditorDsFrameSpaceToolBar_onFolderCloseClick;
   o.construct                    = MO.FEditorDsFrameSpaceToolBar_construct;
   o.dispose                      = MO.FEditorDsFrameSpaceToolBar_dispose;
   return o;
}
MO.FEditorDsFrameSpaceToolBar_onBuilded = function FEditorDsFrameSpaceToolBar_onBuilded(p){
   var o = this;
   o.__base.FDuiToolBar.onBuilded.call(o, p);
}
MO.FEditorDsFrameSpaceToolBar_onFolderCreateClick = function FEditorDsFrameSpaceToolBar_onFolderCreateClick(event){
   var o = this;
   var parentGuid = null;
   var parentLabel = null;
   var catalog = o._frameSet._catalogContent;
   var node = catalog.focusNode();
   if(node){
      parentGuid = node.guid();
      parentLabel = node.label();
   }
   var dialog = MO.Console.find(MO.FDuiWindowConsole).find(MO.FDsResourceFolderDialog);
   dialog._workspace = o._workspace;
   dialog._frameSet = o._frameSet;
   dialog._parentGuid = parentGuid;
   dialog.setNodeParentLabel(parentLabel);
   dialog.setNodeLabel('');
   dialog.switchDataMode(MO.EUiDataMode.Insert);
   dialog.showPosition(MO.EUiPosition.Center);
}
MO.FEditorDsFrameSpaceToolBar_onFolderDeleteLoad = function FEditorDsFrameSpaceToolBar_onFolderDeleteLoad(event){
   var o = this;
   MO.Console.find(MO.FDuiDesktopConsole).hide();
   var catalog = o._frameSet._catalogContent;
   var guid = o._activeNodeGuid;
   if(guid){
      var node = catalog.findByGuid(guid);
      node.removeSelf();
   }
   o._activeNodeGuid = null;
}
MO.FEditorDsFrameSpaceToolBar_onFolderDeleteExcute = function FEditorDsFrameSpaceToolBar_onFolderDeleteExcute(event){
   var o = this;
   if(event.resultCd != MO.EResult.Success){
      return;
   }
   var catalog = o._frameSet._catalogContent;
   var node = catalog.focusNode();
   MO.Console.find(MO.FDuiDesktopConsole).showUploading();
   o._activeNodeGuid = node._guid;
   var connection = MO.Console.find(MO.FDrResourceConsole).doFolderDelete(node._guid);
   connection.addLoadListener(o, o.onFolderDeleteLoad);
}
MO.FEditorDsFrameSpaceToolBar_onFolderDeleteClick = function FEditorDsFrameSpaceToolBar_onFolderDeleteClick(event){
   var o = this;
   var catalog = o._frameSet._catalogContent;
   var node = catalog.focusNode();
   if(!node){
      return MO.Console.find(MO.FDuiMessageConsole).showInfo('请选中目录节点后，再点击操作。');
   }
   var dialog = MO.Console.find(MO.FDuiMessageConsole).showConfirm('请确认是否删除当前目录？');
   dialog.addResultListener(o, o.onFolderDeleteExcute);
}
MO.FEditorDsFrameSpaceToolBar_onFolderPropertyClick = function FEditorDsFrameSpaceToolBar_onFolderPropertyClick(event){
   var o = this;
   var catalog = o._frameSet._catalogContent;
   var node = catalog.focusNode();
   if(!node){
      return MO.Console.find(MO.FDuiMessageConsole).showInfo('请选中目录节点后，再点击操作。');
   }
   var parentLabel = null;
   if(node._parent){
      parentLabel = node._parent.label();
   }
   var dialog = MO.Console.find(MO.FDuiWindowConsole).find(FDsResourceFolderDialog);
   dialog._workspace = o._workspace;
   dialog._frameSet = o._frameSet;
   dialog._nodeGuid = node._guid;
   dialog.setNodeParentLabel(parentLabel);
   dialog.setNodeLabel(node.label());
   dialog.switchDataMode(MO.EUiDataMode.Update);
   dialog.showPosition(MO.EUiPosition.Center);
}
MO.FEditorDsFrameSpaceToolBar_onFolderOpenClick = function FEditorDsFrameSpaceToolBar_onFolderOpenClick(event){
}
MO.FEditorDsFrameSpaceToolBar_onFolderCloseClick = function FEditorDsFrameSpaceToolBar_onFolderCloseClick(event){
}
MO.FEditorDsFrameSpaceToolBar_construct = function FEditorDsFrameSpaceToolBar_construct(){
   var o = this;
   o.__base.FDuiToolBar.construct.call(o);
}
MO.FEditorDsFrameSpaceToolBar_dispose = function FEditorDsFrameSpaceToolBar_dispose(){
   var o = this;
   o.__base.FDuiToolBar.dispose.call(o);
}
MO.FEditorDsDatasetCatalogContent = function FEditorDsDatasetCatalogContent(o){
   o = MO.Class.inherits(this, o, MO.FEditorDsCatalogContent);
   o._defineCode = 'editor.design.dataset';
   return o;
}
MO.FEditorDsDatasetCatalogToolBar = function FEditorDsDatasetCatalogToolBar(o){
   o = MO.Class.inherits(this, o, MO.FDuiToolBar);
   o._frameName  = 'editor.design.dataset.CatalogToolBar';
   o.onListClick = MO.FEditorDsDatasetCatalogToolBar_onListClick;
   o.onBuilded   = MO.FEditorDsDatasetCatalogToolBar_onBuilded;
   o.construct   = MO.FEditorDsDatasetCatalogToolBar_construct;
   o.dispose     = MO.FEditorDsDatasetCatalogToolBar_dispose;
   return o;
}
MO.FEditorDsDatasetCatalogToolBar_onListClick = function FEditorDsDatasetCatalogToolBar_onListClick(event){
   this._frameSet.selectObject('editor.design.list.ListForm');
}
MO.FEditorDsDatasetCatalogToolBar_onBuilded = function FEditorDsDatasetCatalogToolBar_onBuilded(p){
   var o = this;
   o.__base.FDuiToolBar.onBuilded.call(o, p);
   o._controlList.addClickListener(o, o.onListClick);
}
MO.FEditorDsDatasetCatalogToolBar_construct = function FEditorDsDatasetCatalogToolBar_construct(){
   var o = this;
   o.__base.FDuiToolBar.construct.call(o);
}
MO.FEditorDsDatasetCatalogToolBar_dispose = function FEditorDsDatasetCatalogToolBar_dispose(){
   var o = this;
   o.__base.FDuiToolBar.dispose.call(o);
}
MO.FEditorDsDatasetFrameSet = function FEditorDsDatasetFrameSet(o){
   o = MO.Class.inherits(this, o, MO.FEditorDsFrameSet);
   o._frameName = 'editor.design.dataset.FrameSet';
   o.onBuilded  = MO.FEditorDsDatasetFrameSet_onBuilded;
   o.construct  = MO.FEditorDsDatasetFrameSet_construct;
   o.dispose    = MO.FEditorDsDatasetFrameSet_dispose;
   return o;
}
MO.FEditorDsDatasetFrameSet_onBuilded = function FEditorDsDatasetFrameSet_onBuilded(event){
   var o = this;
   o.__base.FEditorDsFrameSet.onBuilded.call(o, event);
   o._frameCatalogTitle._hPanel.className = o.styleName('Title_Ground');
   o._frameCatalogToolBar._hPanel.className = o.styleName('Toolbar_Ground');
   o._frameCatalogContent._hPanel.className = o.styleName('Catalog_Content');
   o._framePropertyTitle._hPanel.className = o.styleName('Title_Ground');
   o._framePropertyToolBar._hPanel.className = o.styleName('Toolbar_Ground');
   o._framePropertyContent._hPanel.className = o.styleName('Property_Content');
   var spliter = o._catalogSplitter = o.searchControl('catalogSpliter');
   spliter.setAlignCd(MO.EUiAlign.Left);
   spliter.setSizeHtml(o._frameCatalog._hPanel);
   var control = o._catalogToolbar = MO.Class.create(MO.FEditorDsDatasetCatalogToolBar);
   control._frameSet = o;
   control.buildDefine(event);
   o._frameCatalogToolBar.push(control);
   var control = o._catalogContent = MO.Class.create(MO.FEditorDsDatasetCatalogContent);
   control._frameSet = o;
   control.build(event);
   o._frameCatalogContent.push(control);
   MO.Window.Html.textSet(o._frameCatalogTitle._hPanel, '数据集合');
}
MO.FEditorDsDatasetFrameSet_construct = function FEditorDsDatasetFrameSet_construct(){
   var o = this;
   o.__base.FEditorDsFrameSet.construct.call(o);
}
MO.FEditorDsDatasetFrameSet_dispose = function FEditorDsDatasetFrameSet_dispose(){
   var o = this;
   o.__base.FEditorDsFrameSet.dispose.call(o);
}
