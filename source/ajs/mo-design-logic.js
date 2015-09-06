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
   var canvas2d = o._canvas2d = MO.RClass.create(MO.FE2dCanvas);
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
   o._canvas3d = MO.RObject.dispose(o._canvas3d);
   o._canvas2d = MO.RObject.dispose(o._canvas2d);
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
MO.EManageFrame = new function EManageFrame(){
   var o = this;
   return o;
}
MO.EManageFrameSet = new function EManageFrameSet(){
   var o = this;
   o.CommonFrameSet = 'manage.logic.common.FrameSet';
   o.PersonFrameSet = 'manage.logic.person.FrameSet';
   o.LoggerFrameSet = 'manage.logic.logger.FrameSet';
   return o;
}
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
   var frame = o._frameSet.selectSpaceFrame(frameName);
   frame.psMode(MO.EUiMode.Update);
   frame.psRefresh();
   if(MO.Class.isClass(frame, MO.FDuiFormFrame)){
      frame.dataModify();
   }else if(MO.Class.isClass(frame, MO.FDuiTableFrame)){
      frame._dsPageSize = 20;
      frame._dsPage = 0;
      frame.resetSearch();
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
   o.onBackClick    = MO.FManageDataForm_onBackClick;
   o.onUpdateClick  = MO.FManageDataForm_onUpdateClick;
   o.onDeleteClick  = MO.FManageDataForm_onDeleteClick;
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
MO.FManageDataForm_onBackClick = function FManageDataForm_onBackClick(event){
   var o = this;
   var historyBar = o._frameSet._historyBar;
   var historyButton = historyBar.historyPop();
   var frameName = historyButton.attributeGet('frame_name');
   o._frameSet.selectSpaceFrame(frameName);
}
MO.FManageDataForm_onUpdateClick = function FManageDataForm_onUpdateClick(event){
   this.doSave();
}
MO.FManageDataForm_onDeleteClick = function FManageDataForm_onDeleteClick(event){
   this.doDelete();
}
MO.FManageDataForm_onBuilded = function FManageDataForm_onBuilded(event){
   var o = this;
   o.__base.FDuiFormFrame.onBuilded.call(o, event);
   o._controlBack.addClickListener(o, o.onBackClick);
   o._controlUpdate.addClickListener(o, o.onUpdateClick);
   o._controlDelete.addClickListener(o, o.onDeleteClick);
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
   o = MO.Class.inherits(this, o, MO.FDuiPickerFrame);
   o.onCellClick       = MO.FManageDataTable_onCellClick;
   o.onCellDoubleClick = MO.FManageDataTable_onCellDoubleClick;
   o.onBuilded         = MO.FManageDataTable_onBuilded;
   o.onDataChanged     = MO.FManageDataTable_onDataChanged;
   o.onDataFetch       = MO.FManageDataTable_onDataFetch;
   o.onDataSave        = MO.FManageDataTable_onDataSave;
   o.onDataDelete      = MO.FManageDataTable_onDataDelete;
   o.construct         = MO.FManageDataTable_construct;
   o.dsMovePage        = MO.FManageDataTable_dsMovePage;
   o.dsSearch          = MO.FManageDataTable_dsSearch;
   o.doFetch           = MO.FManageDataTable_doFetch;
   o.dispose           = MO.FManageDataTable_dispose;
   return o;
}
MO.FManageDataTable_onCellClick = function FManageDataTable_onCellClick(event){
   var o = this;
   var cell = event.cell;
   if(MO.Class.isClass(cell, MO.FDuiCellStatus)){
      var row = event.row;
      o.doDetail(row);
   }
}
MO.FManageDataTable_onCellDoubleClick = function FManageDataTable_onCellDoubleClick(event){
   var o = this;
   var row = event.row;
   o.doDetail(row);
}
MO.FManageDataTable_onBuilded = function FManageDataTable_onBuilded(event){
   var o = this;
   o.__base.FDuiPickerFrame.onBuilded.call(o, event);
   o._controlInsert.addClickListener(o, o.onInsertClick);
   o.addCellClickListener(o, o.onCellClick);
   o.addCellDoubleClickListener(o, o.onCellDoubleClick);
}
MO.FManageDataTable_onDataChanged = function FManageDataTable_onDataChanged(event){
   var o  = this;
   o.__base.FDuiPickerFrame.onDataChanged.call(o, event);
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
   o.psRefresh();
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
   o.__base.FDuiPickerFrame.construct.call(o);
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
MO.FManageDataTable_dsSearch = function FManageDataTable_dsSearch(){
   var o = this;
   o.doFetch();
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
   var xsearch = xcontent.create('Search');
   var columns = o._columns;
   var count = columns.count();
   for(var i = 0; i < count; i++){
      var column = columns.at(i);
      var searchValue = column.searchValue();
      if(!MO.Lang.String.isEmpty(searchValue)){
         var xcolumn = xsearch.create('Column');
         xcolumn.set('name', column.name());
         xcolumn.set('value', searchValue);
      }
   }
   var url = MO.Lang.String.format('/cloud.logic.frame.ws?action=fetch');
   var connection = MO.Console.find(MO.FXmlConsole).sendAsync(url, xdocument);
   connection.addLoadListener(o, o.onDataFetch);
}
MO.FManageDataTable_dispose = function FManageDataTable_dispose(){
   var o = this;
   o.__base.FDuiPickerFrame.dispose.call(o);
}
MO.FManageDataTable = function FManageDataTable(o){
   o = MO.Class.inherits(this, o, MO.FDuiTableFrame);
   o.onInsertClick     = MO.FManageDataTable_onInsertClick;
   o.onCellClick       = MO.FManageDataTable_onCellClick;
   o.onCellDoubleClick = MO.FManageDataTable_onCellDoubleClick;
   o.onBuilded         = MO.FManageDataTable_onBuilded;
   o.onDataChanged     = MO.FManageDataTable_onDataChanged;
   o.onDataFetch       = MO.FManageDataTable_onDataFetch;
   o.onDataSave        = MO.FManageDataTable_onDataSave;
   o.onDataDelete      = MO.FManageDataTable_onDataDelete;
   o.construct         = MO.FManageDataTable_construct;
   o.dsMovePage        = MO.FManageDataTable_dsMovePage;
   o.dsSearch          = MO.FManageDataTable_dsSearch;
   o.doFetch           = MO.FManageDataTable_doFetch;
   o.doDetail          = MO.FManageDataTable_doDetail;
   o.doPrepare         = MO.FManageDataTable_doPrepare;
   o.doSave            = MO.FManageDataTable_doSave;
   o.doDelete          = MO.FManageDataTable_doDelete;
   o.dispose           = MO.FManageDataTable_dispose;
   return o;
}
MO.FManageDataTable_onInsertClick = function FManageDataTable_onInsertClick(event){
   var o = this;
   var frame = o._frameSet.activeFrame();
   if(MO.Class.isClass(frame, MO.FDuiTableFrame)){
      var unitFrameName = frame.unitFrameName();
      MO.Assert.debugNotEmpty(unitFrameName);
      var unitFrame = o._frameSet.selectSpaceFrame(unitFrameName);
      unitFrame.doPrepare();
   }
}
MO.FManageDataTable_onCellClick = function FManageDataTable_onCellClick(event){
   var o = this;
   var cell = event.cell;
   if(MO.Class.isClass(cell, MO.FDuiCellStatus)){
      var row = event.row;
      o.doDetail(row);
   }
}
MO.FManageDataTable_onCellDoubleClick = function FManageDataTable_onCellDoubleClick(event){
   var o = this;
   var row = event.row;
   o.doDetail(row);
}
MO.FManageDataTable_onBuilded = function FManageDataTable_onBuilded(event){
   var o = this;
   o.__base.FDuiTableFrame.onBuilded.call(o, event);
   o._controlInsert.addClickListener(o, o.onInsertClick);
   o.addCellClickListener(o, o.onCellClick);
   o.addCellDoubleClickListener(o, o.onCellDoubleClick);
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
   o.psRefresh();
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
MO.FManageDataTable_dsSearch = function FManageDataTable_dsSearch(){
   var o = this;
   o.doFetch();
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
   var xsearch = xcontent.create('Search');
   var columns = o._columns;
   var count = columns.count();
   for(var i = 0; i < count; i++){
      var column = columns.at(i);
      var searchValue = column.searchValue();
      if(!MO.Lang.String.isEmpty(searchValue)){
         var xcolumn = xsearch.create('Column');
         xcolumn.set('name', column.name());
         xcolumn.set('value', searchValue);
      }
   }
   var url = MO.Lang.String.format('/cloud.logic.frame.ws?action=fetch');
   var connection = MO.Console.find(MO.FXmlConsole).sendAsync(url, xdocument);
   connection.addLoadListener(o, o.onDataFetch);
}
MO.FManageDataTable_doDetail = function FManageDataTable_doDetail(row){
   var o = this;
   var unitFrameName = o._unitFrameName;
   MO.Assert.debugNotEmpty(unitFrameName);
   var unitFrame = o._frameSet.selectSpaceFrame(unitFrameName);
   unitFrame.doDetail(row);
   var historyBar = o._frameSet._historyBar;
   var historyButton = historyBar.historyPush();
   historyButton.setLabel(unitFrame.label());
   historyButton.attributeSet('frame_name', unitFrame.name());
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
   o = MO.Class.inherits(this, o, MO.FDuiFrameSet, MO.MUiStorage);
   o._styleTitleGround     = MO.Class.register(o, new MO.AStyle('_styleTitleGround', 'Title_Ground'));
   o._styleToolbarGround   = MO.Class.register(o, new MO.AStyle('_styleToolbarGround', 'Toolbar_Ground'));
   o._styleCatalogContent  = MO.Class.register(o, new MO.AStyle('_styleCatalogContent', 'Catalog_Content'));
   o._styleSpaceContent    = MO.Class.register(o, new MO.AStyle('_styleSpaceContent', 'Space_Content'));
   o._storageCode          = 'manage.logic.common.FrameSet';
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
   var hToolBarPanel = o._frameSpaceToolBar._hPanel;
   MO.Window.Html.clear(hToolBarPanel);
   o.hideSpaceFrames();
   var frame = null;
   if(frameName){
      frame = o.findSpaceFrame(frameName);
      frame.show();
      var frameLabel = frame.label();
      o.setFrameTitle(frame.label());
      var toolBar = frame.findControl('toolBar');
      if(toolBar){
         toolBar.setPanel(hToolBarPanel);
      }
   }
   o._activeFrame = frame;
   if(frame){
      o.storageSet('frame_name', frameName)
      o.storageUpdate();
   }
   return frame;
}
MO.FManageFrameSet_load = function FManageFrameSet_load(){
   var o = this;
   var frameName = o.storageGet('frame_name');
   if(frameName){
      var frame = o.selectSpaceFrame(frameName);
      frame.psMode(MO.EUiMode.Update);
      frame.psRefresh();
      if(MO.Class.isClass(frame, MO.FDuiFormFrame)){
         frame.dataModify();
      }else if(MO.Class.isClass(frame, MO.FDuiTableFrame)){
         frame._dsPageSize = 20;
         frame._dsPage = 0;
         frame.resetSearch();
         frame.doFetch();
      }
      var historyBar = o._historyBar;
      historyBar.historyClear();
      var historyButton = historyBar.historyPush();
      historyButton.setLabel(frame.label());
      historyButton.attributeSet('frame_name', frame.name());
   }
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
MO.FManageLgCommonCatalogContent = function FManageLgCommonCatalogContent(o){
   o = MO.Class.inherits(this, o, MO.FManageCatalogContent);
   o._frameName = 'manage.logic.common.CatalogContent';
   return o;
}
MO.FManageLgCommonCatalogToolBar = function FManageLgCommonCatalogToolBar(o){
   o = MO.Class.inherits(this, o, MO.FManageCatalogToolBar);
   o._frameName = 'manage.logic.common.CatalogToolBar';
   return o;
}
MO.FManageLgCommonFrameSet = function FManageLgCommonFrameSet(o){
   o = MO.Class.inherits(this, o, MO.FManageFrameSet);
   o._frameName = 'manage.logic.common.FrameSet';
   o.onBuilded  = MO.FManageLgCommonFrameSet_onBuilded;
   return o;
}
MO.FManageLgCommonFrameSet_onBuilded = function FManageLgCommonFrameSet_onBuilded(event){
   var o = this;
   o.__base.FManageFrameSet.onBuilded.call(o, event);
   o._frameCatalogTitle._hPanel.className = o.styleName('Title_Ground');
   o._frameCatalogToolBar._hPanel.className = o.styleName('Toolbar_Ground');
   o._frameCatalogContent._hPanel.className = o.styleName('Catalog_Content');
   o._frameSpaceTitle._hPanel.className = o.styleName('Title_Ground');
   o._frameSpaceToolBar._hPanel.className = o.styleName('Toolbar_Ground');
   o._frameSpaceContent._hPanel.className = o.styleName('Space_Content');
   var spliter = o._catalogSplitter = o.searchControl('catalogSpliter');
   spliter.setAlignCd(MO.EUiAlign.Left);
   spliter.setSizeHtml(o._frameCatalog._hPanel);
   var control = o._catalogToolBar = MO.Class.create(MO.FManageLgCommonCatalogToolBar);
   control._workspace = o._workspace;
   control._frameSet = o;
   control.buildDefine(event);
   o._frameCatalogToolBar.push(control);
   var control = o._catalogContent = MO.Class.create(MO.FManageLgCommonCatalogContent);
   control._workspace = o._workspace;
   control._frameSet = o;
   control.buildDefine(event);
   o._frameCatalogContent.push(control);
   MO.Window.Html.textSet(o._frameCatalogTitle._hPanel, '共通业务');
}
MO.FManageLgPersonCatalogContent = function FManageLgPersonCatalogContent(o){
   o = MO.Class.inherits(this, o, MO.FManageCatalogContent);
   o._frameName = 'manage.logic.person.CatalogContent';
   return o;
}
MO.FManageLgPersonCatalogToolBar = function FManageLgPersonCatalogToolBar(o){
   o = MO.Class.inherits(this, o, MO.FManageCatalogToolBar);
   o._frameName = 'manage.logic.person.CatalogToolBar';
   return o;
}
MO.FManageLgPersonFrameSet = function FManageLgPersonFrameSet(o){
   o = MO.Class.inherits(this, o, MO.FManageFrameSet);
   o._frameName = 'manage.logic.person.FrameSet';
   o.onBuilded  = MO.FManageLgPersonFrameSet_onBuilded;
   return o;
}
MO.FManageLgPersonFrameSet_onBuilded = function FManageLgPersonFrameSet_onBuilded(event){
   var o = this;
   o.__base.FManageFrameSet.onBuilded.call(o, event);
   o._frameCatalogTitle._hPanel.className = o.styleName('Title_Ground');
   o._frameCatalogToolBar._hPanel.className = o.styleName('Toolbar_Ground');
   o._frameCatalogContent._hPanel.className = o.styleName('Catalog_Content');
   o._frameSpaceTitle._hPanel.className = o.styleName('Title_Ground');
   o._frameSpaceToolBar._hPanel.className = o.styleName('Toolbar_Ground');
   o._frameSpaceContent._hPanel.className = o.styleName('Space_Content');
   var spliter = o._catalogSplitter = o.searchControl('catalogSpliter');
   spliter.setAlignCd(MO.EUiAlign.Left);
   spliter.setSizeHtml(o._frameCatalog._hPanel);
   var control = o._catalogToolBar = MO.Class.create(MO.FManageLgPersonCatalogToolBar);
   control._workspace = o._workspace;
   control._frameSet = o;
   control.buildDefine(event);
   o._frameCatalogToolBar.push(control);
   var control = o._catalogContent = MO.Class.create(MO.FManageLgPersonCatalogContent);
   control._workspace = o._workspace;
   control._frameSet = o;
   control.buildDefine(event);
   o._frameCatalogContent.push(control);
   MO.Window.Html.textSet(o._frameCatalogTitle._hPanel, '用户业务');
}
MO.FManageLgLoggerCatalogContent = function FManageLgLoggerCatalogContent(o){
   o = MO.Class.inherits(this, o, MO.FManageCatalogContent);
   o._frameName = 'manage.logic.logger.CatalogContent';
   return o;
}
MO.FManageLgLoggerCatalogToolBar = function FManageLgLoggerCatalogToolBar(o){
   o = MO.Class.inherits(this, o, MO.FManageCatalogToolBar);
   o._frameName = 'manage.logic.logger.CatalogToolBar';
   return o;
}
MO.FManageLgLoggerFrameSet = function FManageLgLoggerFrameSet(o){
   o = MO.Class.inherits(this, o, MO.FManageFrameSet);
   o._frameName = 'manage.logic.logger.FrameSet';
   o.onBuilded  = MO.FManageLgLoggerFrameSet_onBuilded;
   return o;
}
MO.FManageLgLoggerFrameSet_onBuilded = function FManageLgLoggerFrameSet_onBuilded(event){
   var o = this;
   o.__base.FManageFrameSet.onBuilded.call(o, event);
   o._frameCatalogTitle._hPanel.className = o.styleName('Title_Ground');
   o._frameCatalogToolBar._hPanel.className = o.styleName('Toolbar_Ground');
   o._frameCatalogContent._hPanel.className = o.styleName('Catalog_Content');
   o._frameSpaceTitle._hPanel.className = o.styleName('Title_Ground');
   o._frameSpaceToolBar._hPanel.className = o.styleName('Toolbar_Ground');
   o._frameSpaceContent._hPanel.className = o.styleName('Space_Content');
   var spliter = o._catalogSplitter = o.searchControl('catalogSpliter');
   spliter.setAlignCd(MO.EUiAlign.Left);
   spliter.setSizeHtml(o._frameCatalog._hPanel);
   var control = o._catalogToolBar = MO.Class.create(MO.FManageLgLoggerCatalogToolBar);
   control._workspace = o._workspace;
   control._frameSet = o;
   control.buildDefine(event);
   o._frameCatalogToolBar.push(control);
   var control = o._catalogContent = MO.Class.create(MO.FManageLgLoggerCatalogContent);
   control._workspace = o._workspace;
   control._frameSet = o;
   control.buildDefine(event);
   o._frameCatalogContent.push(control);
   MO.Window.Html.textSet(o._frameCatalogTitle._hPanel, '日志业务');
}
with(MO){
   MO.FDsPrivateTabBar = function FDsPrivateTabBar(o){
      o = MO.Class.inherits(this, o, FDuiTabBar);
      o._frameName            = 'resource.private.TabBar';
      o._resourceTypeCd       = 'private';
      o._controlPrivateButton = null;
      o._controlTeamButton    = null;
      o._controlShareButton   = null;
      o.onBuilded             = FDsPrivateTabBar_onBuilded;
      o.onButtonClick         = FDsPrivateTabBar_onButtonClick;
      o.construct             = FDsPrivateTabBar_construct;
      o.dispose               = FDsPrivateTabBar_dispose;
      return o;
   }
   MO.FDsPrivateTabBar_onBuilded = function FDsPrivateTabBar_onBuilded(p){
      var o = this;
      o.__base.FDuiTabBar.onBuilded.call(o, p);
      o._controlProjectButton.addClickListener(o, o.onButtonClick);
      o._controlResourceButton.addClickListener(o, o.onButtonClick);
      o._controlTeamButton.addClickListener(o, o.onButtonClick);
      o._controlPublishButton.addClickListener(o, o.onButtonClick);
   }
   MO.FDsPrivateTabBar_onButtonClick = function FDsPrivateTabBar_onButtonClick(event){
      var o = this;
      var sender = event.sender;
      var name = sender.name();
      if(name == 'solution'){
         o._workspace.selectFrameSet(EDsFrameSet.PrivateSolutionFrameSet);
      }else if(name == 'project'){
         o._workspace.selectFrameSet(EDsFrameSet.PrivateProjectFrameSet);
      }else if(name == 'resource'){
         o._workspace.selectFrameSet(EDsFrameSet.PrivateResourceFrameSet);
      }else{
         alert('功能未开启，请以后关注。');
      }
   }
   MO.FDsPrivateTabBar_construct = function FDsPrivateTabBar_construct(){
      var o = this;
      o.__base.FDuiTabBar.construct.call(o);
   }
   MO.FDsPrivateTabBar_dispose = function FDsPrivateTabBar_dispose(){
      var o = this;
      o.__base.FDuiTabBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsPrivateWorkspace = function FDsPrivateWorkspace(o){
      o = MO.Class.inherits(this, o, FDuiWorkspace, MUiStorage);
      o._frameName            = 'resource.private.Workspace';
      o._storageCode          = o._frameName;
      o._styleMenuBarGround   = MO.Class.register(o, new MO.AStyle('_styleMenuBarGround', 'MenuBar_Ground'));
      o._styleBodyGround      = MO.Class.register(o, new MO.AStyle('_styleBodyGround', 'Body_Ground'));
      o._styleStatusBarGround = MO.Class.register(o, new MO.AStyle('_styleStatusBarGround', 'StatusBar_Ground'));
      o._activeFrameSetCode   = null;
      o._activeProjectGuid    = null;
      o._frameToolBar         = null;
      o._frameStatusBar       = null;
      o._activeFrameSet       = null;
      o._frameSets            = null;
      o.onBuilded             = FDsPrivateWorkspace_onBuilded;
      o.construct             = FDsPrivateWorkspace_construct;
      o.selectFrameSet        = FDsPrivateWorkspace_selectFrameSet;
      o.load                  = FDsPrivateWorkspace_load;
      o.dispose               = FDsPrivateWorkspace_dispose;
      return o;
   }
   MO.FDsPrivateWorkspace_onBuilded = function FDsPrivateWorkspace_onBuilded(event){
      var o = this;
      o.__base.FDuiWorkspace.onBuilded.call(o, event);
      o._frameMenuBar._hPanel.className = o.styleName('MenuBar_Ground');
      o._frameBody._hPanel.className = o.styleName('Body_Ground');
      o._frameStatusBar._hPanel.className = o.styleName('StatusBar_Ground');
      var hTable = MO.Window.Builder.createTable(event);
      hTable.width = '100%';
      var hRow = MO.Window.Builder.appendTableRow(hTable);
      o._hMenuPanel = MO.Window.Builder.appendTableCell(hRow);
      var control = o._tabBar = MO.Class.create(FDsPrivateTabBar);
      control._workspace = o;
      control.buildDefine(event);
      var hCell = MO.Window.Builder.appendTableCell(hRow);
      hCell.width = '100px';
      hCell.align = 'right';
      hCell.vAlign = 'bottom';
      hCell.appendChild(control._hPanel);
      o._frameMenuBar._hPanel.appendChild(hTable);
   }
   MO.FDsPrivateWorkspace_construct = function FDsPrivateWorkspace_construct(){
      var o = this;
      o.__base.FDuiWorkspace.construct.call(o);
      o._frameSets = new TDictionary();
   }
   MO.FDsPrivateWorkspace_selectFrameSet = function FDsPrivateWorkspace_selectFrameSet(name, guid){
      var o = this;
      var frameSet = o._frameSets.get(name);
      if(!frameSet){
         if(name == EDsFrameSet.PrivateSolutionFrameSet){
            var menuBar = MO.Class.create(FDsSolutionMenuBar);
            menuBar._workspace = o;
            menuBar.buildDefine(o._hPanel);
            frameSet = MO.Console.find(FDuiFrameConsole).findByClass(o, FDsSolutionFrameSet);
            frameSet._workspace = o;
            frameSet._menuBar = menuBar;
            menuBar._frameSet = frameSet;
         }else if(name == EDsFrameSet.PrivateProjectFrameSet){
            var menuBar = MO.Class.create(FDsPrivateProjectMenuBar);
            menuBar._workspace = o;
            menuBar.buildDefine(o._hPanel);
            frameSet = MO.Console.find(FDuiFrameConsole).findByClass(o, FDsPrivateProjectFrameSet);
            frameSet._workspace = o;
            frameSet._menuBar = menuBar;
            menuBar._frameSet = frameSet;
         }else if(name == EDsFrameSet.PrivateResourceFrameSet){
            var menuBar = MO.Class.create(FDsPrivateResourceMenuBar);
            menuBar._workspace = o;
            menuBar.buildDefine(o._hPanel);
            frameSet = MO.Console.find(FDuiFrameConsole).findByClass(o, FDsPrivateResourceFrameSet);
            frameSet._workspace = o;
            frameSet._menuBar = menuBar;
            menuBar._frameSet = frameSet;
         }else if(name == EDsFrameSet.PrivateBitmapFrameSet){
            var menuBar = MO.Class.create(FDsPrivateBitmapMenuBar);
            menuBar._workspace = o;
            menuBar.buildDefine(o._hPanel);
            frameSet = MO.Console.find(FDuiFrameConsole).findByClass(o, FDsPrivateBitmapFrameSet);
            frameSet._workspace = o;
            frameSet._menuBar = menuBar;
            menuBar._frameSet = frameSet;
         }else if(name == EDsFrameSet.PrivateMaterialFrameSet){
            var menuBar = MO.Class.create(FDsPrivateMaterialMenuBar);
            menuBar._workspace = o;
            menuBar.buildDefine(o._hPanel);
            frameSet = MO.Console.find(FDuiFrameConsole).findByClass(o, FDsPrivateMaterialFrameSet);
            frameSet._workspace = o;
            frameSet._menuBar = menuBar;
            menuBar._frameSet = frameSet;
         }else if(name == EDsFrameSet.PrivateModelFrameSet){
            var menuBar = MO.Class.create(FDsPrivateModelMenuBar);
            menuBar._workspace = o;
            menuBar.buildDefine(o._hPanel);
            frameSet = MO.Console.find(FDuiFrameConsole).findByClass(o, FDsPrivateModelFrameSet);
            frameSet._workspace = o;
            frameSet._menuBar = menuBar;
            menuBar._frameSet = frameSet;
         }else if(name == EDsFrameSet.PrivateTemplateFrameSet){
            var menuBar = MO.Class.create(FDsPrivateTemplateMenuBar);
            menuBar._workspace = o;
            menuBar.buildDefine(o._hPanel);
            frameSet = MO.Console.find(FDuiFrameConsole).findByClass(o, FDsPrivateTemplateFrameSet);
            frameSet._workspace = o;
            frameSet._menuBar = menuBar;
            menuBar._frameSet = frameSet;
         }else if(name == EDsFrameSet.PrivateSceneFrameSet){
            var menuBar = MO.Class.create(FDsPrivateSceneMenuBar);
            menuBar._workspace = o;
            menuBar.buildDefine(o._hPanel);
            frameSet = MO.Console.find(FDuiFrameConsole).findByClass(o, FDsPrivateSceneFrameSet);
            frameSet._workspace = o;
            frameSet._menuBar = menuBar;
            menuBar._frameSet = frameSet;
         }else{
            throw new TError('Unknown frameset. (name={1})', name);
         }
         o._frameSets.set(name, frameSet);
      }
      var activeFrameSet = o._activeFrameSet;
      if(activeFrameSet != frameSet){
         if(activeFrameSet){
            o._hMenuPanel.removeChild(activeFrameSet._menuBar._hPanel);
            o._frameBody.remove(activeFrameSet);
         }
         o._hMenuPanel.appendChild(frameSet._menuBar._hPanel);
         o._frameBody.push(frameSet);
         frameSet.psResize();
      }
      o._activeFrameSet = frameSet;
      switch(name){
         case EDsFrameSet.PrivateSolutionFrameSet:
            frameSet.load();
            break;
         case EDsFrameSet.PrivateProjectFrameSet:
            frameSet.loadByGuid(guid);
            break;
         case EDsFrameSet.PrivateResourceFrameSet:
            frameSet.load();
            break;
         case EDsFrameSet.PrivateBitmapFrameSet:
            frameSet.loadByGuid(guid);
            break;
         case EDsFrameSet.PrivateMaterialFrameSet:
            frameSet.loadByGuid(guid);
            break;
         case EDsFrameSet.PrivateModelFrameSet:
            frameSet.loadByGuid(guid);
            break;
         case EDsFrameSet.PrivateTemplateFrameSet:
            frameSet.loadByGuid(guid);
            break;
         case EDsFrameSet.PrivateSceneFrameSet:
            frameSet.loadByGuid(guid);
            break;
         default:
            throw new TError('Unknown frameset. (name={1})', name);
      }
      o.storageSet('frameset_code', name)
      o.storageSet('frameset_guid', guid)
      o.storageUpdate();
      return frameSet;
   }
   MO.FDsPrivateWorkspace_load = function FDsPrivateWorkspace_load(){
      var o = this;
      var code = o._activeFrameSetCode = o.storageGet('frameset_code', EDsFrameSet.SolutionFrameSet);
      var guid = o._activeFrameSetGuid = o.storageGet('frameset_guid');
      var button = null;
      if(code == EDsFrameSet.SolutionFrameSet){
         button = o._tabBar.findControl('solution');
         button.doClick();
      }else if(code == EDsFrameSet.PrivateProjectFrameSet){
         button = o._tabBar.findControl('solution');
         o._tabBar.select(button);
         o.selectFrameSet(code, guid)
      }else if(code == EDsFrameSet.PrivateResourceFrameSet){
         button = o._tabBar.findControl('resource');
         button.doClick();
      }else if(code == EDsFrameSet.PrivateBitmapFrameSet){
         button = o._tabBar.findControl('resource');
         o._tabBar.select(button);
         o.selectFrameSet(code, guid)
      }else if(code == EDsFrameSet.PrivateMaterialFrameSet){
         button = o._tabBar.findControl('resource');
         o._tabBar.select(button);
         o.selectFrameSet(code, guid)
      }else if(code == EDsFrameSet.PrivateModelFrameSet){
         button = o._tabBar.findControl('resource');
         o._tabBar.select(button);
         o.selectFrameSet(code, guid)
      }else if(code == EDsFrameSet.PrivateTemplateFrameSet){
         button = o._tabBar.findControl('resource');
         o._tabBar.select(button);
         o.selectFrameSet(code, guid)
      }else if(code == EDsFrameSet.PrivateSceneFrameSet){
         button = o._tabBar.findControl('resource');
         o._tabBar.select(button);
         o.selectFrameSet(code, guid)
      }else{
         button = o._tabBar.findControl('solution');
         button.doClick();
      }
   }
   MO.FDsPrivateWorkspace_dispose = function FDsPrivateWorkspace_dispose(){
      var o = this;
      o._frameSets = RObject.dispose(o._frameSets);
      o.__base.FDuiWorkspace.dispose.call(o);
   }
}
with(MO){
   MO.FDsPrivateProjectFrameSet = function FDsPrivateProjectFrameSet(o){
      o = MO.Class.inherits(this, o, FDsProjectFrameSet);
      o._frameName = 'resource.private.project.FrameSet';
      o.onBuilded  = FDsPrivateProjectFrameSet_onBuilded;
      return o;
   }
   MO.FDsPrivateProjectFrameSet_onBuilded = function FDsPrivateProjectFrameSet_onBuilded(event){
      var o = this;
      o.__base.FDsProjectFrameSet.onBuilded.call(o, event);
      var control = o._sceneListToolbar = MO.Class.create(FDsProjectSceneListToolBar);
      control._frameSet = o;
      control.buildDefine(event);
      o._frameSceneListToolBar.push(control);
      var control = o._sceneListContent = MO.Class.create(FDsProjectSceneListContent);
      control._frameSet = o;
      control.build(event);
      o._frameSceneListContent.push(control);
      var control = o._sceneCatalogToolbar = MO.Class.create(FDsProjectSceneCatalogToolBar);
      control._frameSet = o;
      control.buildDefine(event);
      o._frameSceneCatalogToolBar.push(control);
      var control = o._sceneCatalogContent = MO.Class.create(FDsProjectSceneCatalogContent);
      control._frameSet = o;
      control.build(event);
      o._frameSceneCatalogContent.push(control);
      var control = o._canvasSpaceToolbar = MO.Class.create(FDsProjectCanvasSpaceToolBar);
      control._frameSet = o;
      control.buildDefine(event);
      o._frameCanvasSpaceToolBar.push(control);
      var control = o._canvasPreviewToolbar = MO.Class.create(FDsProjectCanvasPreviewToolBar);
      control._frameSet = o;
      control.buildDefine(event);
      o._frameCanvasPreviewToolBar.push(control);
      var control = o._propertyToolbar = MO.Class.create(FDsProjectPropertyToolBar);
      control._frameSet = o;
      control.buildDefine(event);
      o._framePropertyAttributeToolBar.push(control);
   }
}
with(MO){
   MO.FDsPrivateProjectMenuBar = function FDsPrivateProjectMenuBar(o){
      o = MO.Class.inherits(this, o, FDsProjectMenuBar);
      o._frameName = 'resource.private.project.MenuBar';
      o.onBuilded  = FDsPrivateProjectMenuBar_onBuilded;
      return o;
   }
   MO.FDsPrivateProjectMenuBar_onBuilded = function FDsPrivateProjectMenuBar_onBuilded(p){
      var o = this;
      o.__base.FDsProjectMenuBar.onBuilded.call(o, p);
   }
}
with(MO){
   MO.FDsPrivateResourceCatalogToolBar = function FDsPrivateResourceCatalogToolBar(o){
      o = MO.Class.inherits(this, o, FDsResourceCatalogToolBar);
      o._frameName = 'resource.private.resource.CatalogToolBar';
      return o;
   }
}
with(MO){
   MO.FDsPrivateResourceFrameSet = function FDsPrivateResourceFrameSet(o){
      o = MO.Class.inherits(this, o, FDsResourceFrameSet);
      o._frameName        = 'resource.share.resource.FrameSet';
      o.onBuilded         = FDsPrivateResourceFrameSet_onBuilded;
      o.onCatalogSelected = FDsPrivateResourceFrameSet_onCatalogSelected;
      return o;
   }
   MO.FDsPrivateResourceFrameSet_onBuilded = function FDsPrivateResourceFrameSet_onBuilded(event){
      var o = this;
      o.__base.FDsResourceFrameSet.onBuilded.call(o, event);
      o._frameCatalogToolBar._hPanel.className = o.styleName('Toolbar_Ground');
      o._frameCatalogContent._hPanel.className = o.styleName('Catalog_Content');
      o._frameListToolBar._hPanel.className = o.styleName('Toolbar_Ground');
      o._frameListContent._hPanel.className = o.styleName('List_Content');
      var f = o._catalogSplitter = o.searchControl('catalogSpliter');
      f.setAlignCd(EUiAlign.Left);
      f.setSizeHtml(o._frameCatalog._hPanel);
      var control = o._catalogToolbar = MO.Class.create(FDsPrivateResourceCatalogToolBar);
      control._workspace = o._workspace;
      control._frameSet = o;
      control.buildDefine(event);
      o._frameCatalogToolBar.push(control);
      var control = o._catalogContent = MO.Class.create(FDsResourceCatalogContent);
      control._workspace = o._workspace;
      control._frameSet = o;
      control.build(event);
      o._frameCatalogContent.push(control);
      var control = o._listToolBar = MO.Class.create(FDsPrivateResourceListToolBar);
      control._workspace = o._workspace;
      control._frameSet = o;
      control.buildDefine(event);
      o._frameListToolBar.push(control);
      var control = o._listContent = MO.Class.create(FDsResourceListContent);
      control._workspace = o._workspace;
      control._frameSet = o;
      control.build(event);
      o._frameListContent.push(control);
   }
   MO.FDsPrivateResourceFrameSet_onCatalogSelected = function FDsPrivateResourceFrameSet_onCatalogSelected(p, pc){
      var o = this;
      var space = o._activeSpace;
      var fs = o._propertyFrames;
      var c = fs.count();
      for(var i = 0; i < c; i++){
         var f = fs.value(i);
         f.hide();
      }
      if(MO.Class.isClass(p, FE3dStage)){
         var f = o.findPropertyFrame(EDsFrame.MeshSpacePropertyFrame);
         f.show();
         f.loadObject(space, space);
      }else if(MO.Class.isClass(p, FG3dTechnique)){
         var f = o.findPropertyFrame(EDsFrame.MeshTechniquePropertyFrame);
         f.show();
         f.loadObject(space, p);
      }else if(MO.Class.isClass(p, FE3dRegion)){
         var f = o.findPropertyFrame(EDsFrame.MeshRegionPropertyFrame);
         f.show();
         f.loadObject(space, p);
      }else if(MO.Class.isClass(p, FE3dCamera)){
         var f = o.findPropertyFrame(EDsFrame.MeshCameraPropertyFrame);
         f.show();
         f.loadObject(space, p);
      }else if(MO.Class.isClass(p, FG3dDirectionalLight)){
         var f = o.findPropertyFrame(EDsFrame.MeshLightPropertyFrame);
         f.show();
         f.loadObject(space, p);
      }else if(MO.Class.isClass(p, FE3dMeshDisplay)){
         var f = o.findPropertyFrame(EDsFrame.MeshDisplayPropertyFrame);
         f.show();
         f.loadObject(space, p);
      }else if(MO.Class.isClass(p, FG3dMaterial)){
         var f = o.findPropertyFrame(EDsFrame.MeshMaterialPropertyFrame);
         f.show();
         f.loadObject(space, p);
      }else if(MO.Class.isClass(p, FE3dMeshRenderable)){
         var f = o.findPropertyFrame(EDsFrame.MeshRenderablePropertyFrame);
         f.show();
         f.loadObject(space, p);
      }else{
         throw new TError('Unknown select object type. (value={1})', p);
      }
   }
}
with(MO){
   MO.FDsPrivateResourceListToolBar = function FDsPrivateResourceListToolBar(o){
      o = MO.Class.inherits(this, o, FDsResourceListToolBar);
      o._frameName   = 'resource.private.resource.ListToolBar';
      o._storageCode = o._frameName;
      return o;
   }
}
with(MO){
   MO.FDsPrivateResourceMenuBar = function FDsPrivateResourceMenuBar(o){
      o = MO.Class.inherits(this, o, FDsResourceMenuBar);
      o._frameName      = 'resource.private.resource.MenuBar';
      o._controlRefresh = null;
      o.onBuilded       = FDsPrivateResourceMenuBar_onBuilded;
      o.onRefreshClick  = FDsPrivateResourceMenuBar_onRefreshClick;
      return o;
   }
   MO.FDsPrivateResourceMenuBar_onBuilded = function FDsPrivateResourceMenuBar_onBuilded(p){
      var o = this;
      o.__base.FDsResourceMenuBar.onBuilded.call(o, p);
      o._controlImportPicture.addClickListener(o, o.onImportPictureClick);
      o._controlImportModel.addClickListener(o, o.onImportModelClick);
      o._controlCreateMaterial.addClickListener(o, o.onCreateMaterialClick);
      o._controlCreateTemplate.addClickListener(o, o.onCreateTemplateClick);
      o._controlCreateScene.addClickListener(o, o.onCreateSceneClick);
      o._controlDelete.addClickListener(o, o.onDeleteClick);
      o._controlShareOpen.addClickListener(o, o.onShareClick);
      o._controlShareClose.addClickListener(o, o.onShareClick);
   }
   MO.FDsPrivateResourceMenuBar_onRefreshClick = function FDsPrivateResourceMenuBar_onRefreshClick(event){
   }
}
with(MO){
   MO.FDsPrivateBitmapCanvasToolBar = function FDsPrivateBitmapCanvasToolBar(o){
      o = MO.Class.inherits(this, o, FDsBitmapCanvasToolBar);
      o._frameName = 'resource.private.bitmap.CanvasToolBar';
      return o;
   }
}
with(MO){
   MO.FDsPrivateBitmapFrameSet = function FDsPrivateBitmapFrameSet(o){
      o = MO.Class.inherits(this, o, FDsBitmapFrameSet);
      o._frameName = 'resource.private.bitmap.FrameSet';
      o.onBuilded  = FDsPrivateBitmapFrameSet_onBuilded;
      return o;
   }
   MO.FDsPrivateBitmapFrameSet_onBuilded = function FDsPrivateBitmapFrameSet_onBuilded(p){
      var o = this;
      o.__base.FDsBitmapFrameSet.onBuilded.call(o, p);
      var toolbar = o._canvasToolBar = MO.Class.create(FDsPrivateBitmapCanvasToolBar);
      toolbar._frameSet = o;
      toolbar.buildDefine(p);
      o._frameCanvasToolBar.push(toolbar);
      var canvas = o._canvasContent = MO.Class.create(FDsBitmapCanvasContent);
      canvas._frameSet = o;
      canvas._hParent = o._frameCanvasContent._hPanel;
      canvas._hParent.style.backgroundColor = '#333333';
      canvas._hParent.style.scroll = 'auto';
      canvas.build(p);
      o._frameCanvasContent.push(canvas);
      var toolbar = o._propertyToolBar = MO.Class.create(FDsBitmapPropertyToolBar);
      toolbar._frameSet = o;
      toolbar.buildDefine(p);
      o._framePropertyToolBar.push(toolbar);
      var frame = o.findPropertyFrame(EDsFrame.BitmapPropertyFrame);
      o._framePropertyContent.push(frame);
   }
}
with(MO){
   MO.FDsPrivateBitmapMenuBar = function FDsPrivateBitmapMenuBar(o){
      o = MO.Class.inherits(this, o, FDsBitmapMenuBar);
      o._frameName  = 'resource.private.bitmap.MenuBar';
      o.onBuilded   = FDsPrivateBitmapMenuBar_onBuilded;
      o.onBackClick = FDsPrivateBitmapMenuBar_onBackClick;
      return o;
   }
   MO.FDsPrivateBitmapMenuBar_onBuilded = function FDsPrivateBitmapMenuBar_onBuilded(event){
      var o = this;
      o.__base.FDsBitmapMenuBar.onBuilded.call(o, event);
      o._controlBack.addClickListener(o, o.onBackClick);
      o._controlSave.addClickListener(o, o.onSaveClick);
      o._controlImport.addClickListener(o, o.onImportClick);
   }
   MO.FDsPrivateBitmapMenuBar_onBackClick = function FDsPrivateBitmapMenuBar_onBackClick(event){
      var o = this;
      var workspace = o._frameSet._workspace;
      workspace.selectFrameSet(EDsFrameSet.PrivateResourceFrameSet);
   }
}
with(MO){
   MO.FDsPrivateMaterialCanvasToolBar = function FDsPrivateMaterialCanvasToolBar(o){
      o = MO.Class.inherits(this, o, FDsMaterialCanvasToolBar);
      o._frameName = 'resource.private.material.CanvasToolBar';
      return o;
   }
}
with(MO){
   MO.FDsPrivateMaterialCatalogToolBar = function FDsPrivateMaterialCatalogToolBar(o){
      o = MO.Class.inherits(this, o, FDsMaterialCatalogToolBar);
      o._frameName = 'resource.private.material.CatalogToolBar';
      return o;
   }
}
with(MO){
   MO.FDsPrivateMaterialFrameSet = function FDsPrivateMaterialFrameSet(o){
      o = MO.Class.inherits(this, o, FDsMaterialFrameSet);
      o._frameName = 'resource.private.material.FrameSet';
      o.onBuilded  = FDsPrivateMaterialFrameSet_onBuilded;
      return o;
   }
   MO.FDsPrivateMaterialFrameSet_onBuilded = function FDsPrivateMaterialFrameSet_onBuilded(event){
      var o = this;
      o.__base.FDsMaterialFrameSet.onBuilded.call(o, event);
      var toolbar = o._catalogToolBar = MO.Class.create(FDsPrivateMaterialCatalogToolBar);
      toolbar._frameSet = o;
      toolbar.buildDefine(event);
      o._frameCatalogToolBar.push(toolbar);
      var catalog = o._catalogContent = MO.Class.create(FDsMaterialCatalogContent);
      catalog._frameSet = o;
      catalog.build(event);
      o._frameCatalogContent.push(catalog);
      var toolbar = o._canvasToolBar = MO.Class.create(FDsPrivateMaterialCanvasToolBar);
      toolbar._frameSet = o;
      toolbar.buildDefine(event);
      o._frameCanvasToolBar.push(toolbar);
      var toolbar = o._propertyToolBar = MO.Class.create(FDsMaterialPropertyToolBar);
      toolbar._frameSet = o;
      toolbar.buildDefine(event);
      o._framePropertyToolBar.push(toolbar);
   }
}
with(MO){
   MO.FDsPrivateMaterialMenuBar = function FDsPrivateMaterialMenuBar(o){
      o = MO.Class.inherits(this, o, FDsMaterialMenuBar);
      o._frameName = 'resource.private.material.MenuBar';
      return o;
   }
}
with(MO){
   MO.FDsPrivateModelCanvasToolBar = function FDsPrivateModelCanvasToolBar(o){
      o = MO.Class.inherits(this, o, FDsModelCanvasToolBar);
      o._frameName = 'resource.private.model.CanvasToolBar';
      return o;
   }
}
with(MO){
   MO.FDsPrivateModelCatalogToolBar = function FDsPrivateModelCatalogToolBar(o){
      o = MO.Class.inherits(this, o, FDsModelCatalogToolBar);
      o._frameName = 'resource.private.model.CatalogToolBar';
      return o;
   }
}
with(MO){
   MO.FDsPrivateModelFrameSet = function FDsPrivateModelFrameSet(o){
      o = MO.Class.inherits(this, o, FDsModelFrameSet);
      o._frameName = 'resource.private.model.FrameSet';
      o.onBuilded  = FDsPrivateModelFrameSet_onBuilded;
      return o;
   }
   MO.FDsPrivateModelFrameSet_onBuilded = function FDsPrivateModelFrameSet_onBuilded(event){
      var o = this;
      o.__base.FDsModelFrameSet.onBuilded.call(o, event);
      var toolbar = o._catalogToolBar = MO.Class.create(FDsPrivateModelCatalogToolBar);
      toolbar._frameSet = o;
      toolbar.buildDefine(event);
      o._frameCatalogToolBar.push(toolbar);
      var catalog = o._catalogContent = MO.Class.create(FDsModelCatalogContent);
      catalog._frameSet = o;
      catalog.build(event);
      catalog.addSelectedListener(o, o.onCatalogSelected);
      o._frameCatalogContent.push(catalog);
      var toolbar = o._canvasToolBar = MO.Class.create(FDsPrivateModelCanvasToolBar);
      toolbar._frameSet = o;
      toolbar.buildDefine(event);
      o._frameCanvasToolBar.push(toolbar);
      var canvas = o._canvasContent = MO.Class.create(FDsModelCanvasContent);
      canvas._frameSet = o;
      canvas._toolbar = o._canvasToolbar;
      canvas._hParent = o._frameCanvasContent._hPanel;
      canvas._hParent.style.backgroundColor = '#333333';
      canvas._hParent.style.scroll = 'auto';
      canvas.addLoadListener(o, o.onDataLoaded);
      canvas.build(event);
      o._frameCanvasContent.push(canvas);
   }
}
with(MO){
   MO.FDsPrivateModelMenuBar = function FDsPrivateModelMenuBar(o){
      o = MO.Class.inherits(this, o, FDsModelMenuBar);
      o._frameName = 'resource.private.model.MenuBar';
      o.onBuilded  = FDsPrivateModelMenuBar_onBuilded;
      return o;
   }
   MO.FDsPrivateModelMenuBar_onBuilded = function FDsPrivateModelMenuBar_onBuilded(p){
      var o = this;
      o.__base.FDsModelMenuBar.onBuilded.call(o, p);
      o._controlSaveButton.addClickListener(o, o.onSaveClick);
      o._controlCaptureButton.addClickListener(o, o.onCaptureClick);
   }
}
with(MO){
   MO.FDsPrivateTemplateCanvasToolBar = function FDsPrivateTemplateCanvasToolBar(o){
      o = MO.Class.inherits(this, o, FDsTemplateCanvasToolBar);
      o._frameName      = 'resource.private.template.CanvasToolBar';
      return o;
   }
}
with(MO){
   MO.FDsPrivateTemplateCatalogToolBar = function FDsPrivateTemplateCatalogToolBar(o){
      o = MO.Class.inherits(this, o, FDsTemplateCatalogToolBar);
      o._frameName = 'resource.private.template.CatalogToolBar';
      return o;
   }
}
MO.FDsPrivateTemplateFrameSet = function FDsPrivateTemplateFrameSet(o){
   o = MO.Class.inherits(this, o, MO.FDsTemplateFrameSet);
   o._frameName        = 'resource.private.template.FrameSet';
   o.onBuilded         = MO.FDsPrivateTemplateFrameSet_onBuilded;
   o.onCatalogSelected = MO.FDsPrivateTemplateFrameSet_onCatalogSelected;
   return o;
}
MO.FDsPrivateTemplateFrameSet_onBuilded = function FDsPrivateTemplateFrameSet_onBuilded(event){
   var o = this;
   o.__base.FDsTemplateFrameSet.onBuilded.call(o, event);
   var toolbar = o._catalogToolBar = MO.Class.create(MO.FDsPrivateTemplateCatalogToolBar);
   toolbar._frameSet = o;
   toolbar.buildDefine(event);
   o._frameCatalogToolBar.push(toolbar);
   var catalog = o._catalogContent = MO.Class.create(MO.FDsTemplateCatalogContent);
   catalog._frameSet = o;
   catalog.build(event);
   catalog.addSelectedListener(o, o.onCatalogSelected);
   o._frameCatalogContent.push(catalog);
   var toolbar = o._canvasToolBar = MO.Class.create(MO.FDsPrivateTemplateCanvasToolBar);
   toolbar._frameSet = o;
   toolbar.buildDefine(event);
   o._frameCanvasToolBar.push(toolbar);
   var canvas = o._canvasContent = MO.Class.create(MO.FDsTemplateCanvasContent);
   canvas._frameSet = o;
   canvas._toolbar = o._canvasToolbar;
   canvas._hParent = o._frameCanvasContent._hPanel;
   canvas._hParent.style.scroll = 'auto';
   canvas.addLoadListener(o, o.onDataLoaded);
   canvas.build(event);
   o._frameCanvasContent.push(canvas);
}
MO.FDsPrivateTemplateFrameSet_onCatalogSelected = function FDsPrivateTemplateFrameSet_onCatalogSelected(select, flag){
   var o = this;
   var space = o._activeSpace;
   if(!space){
      return;
   }
   o.hidePropertyFrames();
   if(MO.Class.isClass(select, MO.FE3dSpace)){
      var frame = o.findPropertyFrame(MO.EDsFrame.CommonSpacePropertyFrame);
      frame.show();
      frame.loadObject(space, select);
   }else if(MO.Class.isClass(select, MO.FG3dTechnique)){
      var frame = o.findPropertyFrame(MO.EDsFrame.CommonTechniquePropertyFrame);
      frame.show();
      frame.loadObject(space, select);
   }else if(MO.Class.isClass(select, MO.FE3dRegion)){
      var frame = o.findPropertyFrame(MO.EDsFrame.CommonRegionPropertyFrame);
      frame.show();
      frame.loadObject(space, select);
   }else if(MO.Class.isClass(select, MO.FE3dCamera)){
      var frame = o.findPropertyFrame(MO.EDsFrame.CommonCameraPropertyFrame);
      frame.show();
      frame.loadObject(space, select);
   }else if(MO.Class.isClass(select, MO.FG3dDirectionalLight)){
      var frame = o.findPropertyFrame(MO.EDsFrame.CommonLightPropertyFrame);
      frame.show();
      frame.loadObject(space, select);
   }else if(MO.Class.isClass(select, MO.FE3dTemplateDisplay)){
      var frame = o.findPropertyFrame(MO.EDsFrame.CommonDisplayPropertyFrame);
      frame.show();
      frame.loadObject(space, select);
   }else if(MO.Class.isClass(select, MO.FG3dMaterial)){
      var frame = o.findPropertyFrame(MO.EDsFrame.CommonMaterialPropertyFrame);
      frame.show();
      frame.loadObject(space, select);
   }else if(MO.Class.isClass(select, MO.FE3dRenderable)){
      var frame = o.findPropertyFrame(MO.EDsFrame.CommonRenderablePropertyFrame);
      frame.show();
      frame.loadObject(space, select);
   }else{
      throw new TError('Unknown select object type. (select={1})', select);
   }
}
with(MO){
   MO.FDsPrivateTemplateMenuBar = function FDsPrivateTemplateMenuBar(o){
      o = MO.Class.inherits(this, o, FDsTemplateMenuBar);
      o._frameName = 'resource.private.template.MenuBar';
      o.onBuilded  = FDsPrivateTemplateMenuBar_onBuilded;
      return o;
   }
   MO.FDsPrivateTemplateMenuBar_onBuilded = function FDsPrivateTemplateMenuBar_onBuilded(event){
      var o = this;
      o.__base.FDsTemplateMenuBar.onBuilded.call(o, event);
      o._controlSave.addClickListener(o, o.onSaveClick);
      o._controlCapture.addClickListener(o, o.onCaptureClick);
      o._controlSelectMaterial.addClickListener(o, o.onSelectMaterialClick);
      o._controlCreateDisplay.addClickListener(o, o.onCreateDisplayClick);
      o._controlDelete.addClickListener(o, o.onDeleteClick);
   }
}
with(MO){
   MO.FDsPrivateSceneCanvasToolBar = function FDsPrivateSceneCanvasToolBar(o){
      o = MO.Class.inherits(this, o, FDsSceneCanvasToolBar);
      o._frameName = 'resource.private.scene.CanvasToolBar';
      return o;
   }
}
with(MO){
   MO.FDsPrivateSceneCatalogToolBar = function FDsPrivateSceneCatalogToolBar(o){
      o = MO.Class.inherits(this, o, FDsSceneCatalogToolBar);
      o._frameName = 'resource.private.scene.CatalogToolBar';
      return o;
   }
}
with(MO){
   MO.FDsPrivateSceneFrameSet = function FDsPrivateSceneFrameSet(o){
      o = MO.Class.inherits(this, o, FDsSceneFrameSet);
      o._frameName = 'resource.private.scene.FrameSet';
      o.onBuilded  = FDsPrivateSceneFrameSet_onBuilded;
      return o;
   }
   MO.FDsPrivateSceneFrameSet_onBuilded = function FDsPrivateSceneFrameSet_onBuilded(event){
      var o = this;
      o.__base.FDsSceneFrameSet.onBuilded.call(o, event);
      var toolbar = o._catalogToolbar = MO.Class.create(FDsPrivateSceneCatalogToolBar);
      toolbar._frameSet = o;
      toolbar.buildDefine(event);
      o._frameCatalogToolBar.push(toolbar);
      var catalog = o._catalogContent = MO.Class.create(FDsSceneCatalogContent);
      catalog._frameSet = o;
      catalog.build(event);
      catalog.addSelectedListener(o, o.onCatalogSelected);
      o._frameCatalogContent.push(catalog);
      var toolbar = o._canvasToolBar = MO.Class.create(FDsPrivateSceneCanvasToolBar);
      toolbar._frameSet = o;
      toolbar.buildDefine(event);
      o._frameCanvasToolBar.push(toolbar);
      var canvas = o._canvasContent = MO.Class.create(FDsSceneCanvasContent);
      canvas._frameSet = o;
      canvas._toolbar = o._canvasToolbar;
      canvas._hParent = o._frameCanvasContent._hPanel;
      canvas._hParent.style.backgroundColor = '#333333';
      canvas._hParent.style.scroll = 'auto';
      canvas.addLoadListener(o, o.onDataLoaded);
      canvas.build(event);
      o._frameCanvasContent.push(canvas);
      var toolbar = o._propertyToolbar = MO.Class.create(FDsScenePropertyToolBar);
      toolbar._frameSet = o;
      toolbar.buildDefine(event);
      o._framePropertyToolBar.push(toolbar);
   }
}
with(MO){
   MO.FDsPrivateSceneMenuBar = function FDsPrivateSceneMenuBar(o){
      o = MO.Class.inherits(this, o, FDsSceneMenuBar);
      o._frameName = 'resource.private.scene.MenuBar';
      o.onBuilded  = FDsPrivateSceneMenuBar_onBuilded;
      return o;
   }
   MO.FDsPrivateSceneMenuBar_onBuilded = function FDsPrivateSceneMenuBar_onBuilded(p){
      var o = this;
      o.__base.FDsSceneMenuBar.onBuilded.call(o, p);
      o._controlSave.addClickListener(o, o.onSaveClick);
      o._controlCapture.addClickListener(o, o.onCaptureClick);
      o._controlCreateLayer.addClickListener(o, o.onCreateLayerClick);
      o._controlImportTemplate.addClickListener(o, o.onImportTemplateClick);
      o._controlExecute.addClickListener(o, o.onExecuteClick);
   }
}
with(MO){
   MO.FDsShareTabBar = function FDsShareTabBar(o){
      o = MO.Class.inherits(this, o, FDuiTabBar);
      o._frameName            = 'resource.share.TabBar';
      o._resourceTypeCd       = 'private';
      o._controlPrivateButton = null;
      o._controlTeamButton    = null;
      o._controlShareButton   = null;
      o.onBuilded             = FDsShareTabBar_onBuilded;
      o.onButtonClick         = FDsShareTabBar_onButtonClick;
      o.construct             = FDsShareTabBar_construct;
      o.dispose               = FDsShareTabBar_dispose;
      return o;
   }
   MO.FDsShareTabBar_onBuilded = function FDsShareTabBar_onBuilded(p){
      var o = this;
      o.__base.FDuiTabBar.onBuilded.call(o, p);
      o._controlResource.addClickListener(o, o.onButtonClick);
   }
   MO.FDsShareTabBar_onButtonClick = function FDsShareTabBar_onButtonClick(event){
      var o = this;
      var sender = event.sender;
      var name = sender.name();
      if(name == 'resource'){
         o._workspace.selectFrameSet(EDsFrameSet.ShareResourceFrameSet);
      }else{
         alert('功能未开启，请以后关注。');
      }
   }
   MO.FDsShareTabBar_construct = function FDsShareTabBar_construct(){
      var o = this;
      o.__base.FDuiTabBar.construct.call(o);
   }
   MO.FDsShareTabBar_dispose = function FDsShareTabBar_dispose(){
      var o = this;
      o.__base.FDuiTabBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsShareWorkspace = function FDsShareWorkspace(o){
      o = MO.Class.inherits(this, o, FDuiWorkspace, MUiStorage);
      o._frameName            = 'resource.share.Workspace';
      o._storageCode          = o._frameName;
      o._styleMenubarGround   = MO.Class.register(o, new MO.AStyle('_styleMenubarGround', 'Menubar_Ground'));
      o._styleBodyGround      = MO.Class.register(o, new MO.AStyle('_styleBodyGround', 'Body_Ground'));
      o._styleStatusbarGround = MO.Class.register(o, new MO.AStyle('_styleStatusbarGround', 'Statusbar_Ground'));
      o._activeFrameSetCode   = null;
      o._activeProjectGuid    = null;
      o._frameToolBar         = null;
      o._frameStatusBar       = null;
      o._activeFrameSet       = null;
      o._frameSets            = null;
      o.onBuilded             = FDsShareWorkspace_onBuilded;
      o.construct             = FDsShareWorkspace_construct;
      o.selectFrameSet        = FDsShareWorkspace_selectFrameSet;
      o.load                  = FDsShareWorkspace_load;
      o.dispose               = FDsShareWorkspace_dispose;
      return o;
   }
   MO.FDsShareWorkspace_onBuilded = function FDsShareWorkspace_onBuilded(event){
      var o = this;
      o.__base.FDuiWorkspace.onBuilded.call(o, event);
      o._frameMenuBar._hPanel.className = o.styleName('Menubar_Ground');
      o._frameBody._hPanel.className = o.styleName('Body_Ground');
      o._frameStatusBar._hPanel.className = o.styleName('Statusbar_Ground');
      var hTable = MO.Window.Builder.createTable(event);
      hTable.width = '100%';
      var hRow = MO.Window.Builder.appendTableRow(hTable);
      o._hMenuPanel = MO.Window.Builder.appendTableCell(hRow);
      var control = o._tabBar = MO.Class.create(FDsShareTabBar);
      control._workspace = o;
      control.buildDefine(event);
      var hCell = MO.Window.Builder.appendTableCell(hRow);
      hCell.width = '100px';
      hCell.align = 'right';
      hCell.vAlign = 'bottom';
      hCell.appendChild(control._hPanel);
      o._frameMenuBar._hPanel.appendChild(hTable);
   }
   MO.FDsShareWorkspace_construct = function FDsShareWorkspace_construct(){
      var o = this;
      o.__base.FDuiWorkspace.construct.call(o);
      o._frameSets = new TDictionary();
   }
   MO.FDsShareWorkspace_selectFrameSet = function FDsShareWorkspace_selectFrameSet(name, guid){
      var o = this;
      var frameSet = o._frameSets.get(name);
      if(!frameSet){
         if(name == EDsFrameSet.ShareResourceFrameSet){
            var menuBar = MO.Class.create(FDsShareResourceMenuBar);
            menuBar._workspace = o;
            menuBar.buildDefine(o._hPanel);
            frameSet = MO.Console.find(FDuiFrameConsole).findByClass(o, FDsShareResourceFrameSet);
            frameSet._workspace = o;
            frameSet._menuBar = menuBar;
            menuBar._frameSet = frameSet;
         }else if(name == EDsFrameSet.ShareBitmapFrameSet){
            var menuBar = MO.Class.create(FDsShareBitmapMenuBar);
            menuBar._workspace = o;
            menuBar.buildDefine(o._hPanel);
            frameSet = MO.Console.find(FDuiFrameConsole).findByClass(o, FDsShareBitmapFrameSet);
            frameSet._workspace = o;
            frameSet._menuBar = menuBar;
            menuBar._frameSet = frameSet;
         }else if(name == EDsFrameSet.ShareMaterialFrameSet){
            var menuBar = MO.Class.create(FDsShareMaterialMenuBar);
            menuBar._workspace = o;
            menuBar.buildDefine(o._hPanel);
            frameSet = MO.Console.find(FDuiFrameConsole).findByClass(o, FDsShareMaterialFrameSet);
            frameSet._workspace = o;
            frameSet._menuBar = menuBar;
            menuBar._frameSet = frameSet;
         }else if(name == EDsFrameSet.ShareModelFrameSet){
            var menuBar = MO.Class.create(FDsShareModelMenuBar);
            menuBar._workspace = o;
            menuBar.buildDefine(o._hPanel);
            frameSet = MO.Console.find(FDuiFrameConsole).findByClass(o, FDsShareModelFrameSet);
            frameSet._workspace = o;
            frameSet._menuBar = menuBar;
            menuBar._frameSet = frameSet;
         }else if(name == EDsFrameSet.ShareTemplateFrameSet){
            var menuBar = MO.Class.create(FDsShareTemplateMenuBar);
            menuBar._workspace = o;
            menuBar.buildDefine(o._hPanel);
            frameSet = MO.Console.find(FDuiFrameConsole).findByClass(o, FDsShareTemplateFrameSet);
            frameSet._workspace = o;
            frameSet._menuBar = menuBar;
            menuBar._frameSet = frameSet;
         }else if(name == EDsFrameSet.ShareSceneFrameSet){
            var menuBar = MO.Class.create(FDsShareSceneMenuBar);
            menuBar._workspace = o;
            menuBar.buildDefine(o._hPanel);
            frameSet = MO.Console.find(FDuiFrameConsole).findByClass(o, FDsShareSceneFrameSet);
            frameSet._workspace = o;
            frameSet._menuBar = menuBar;
            menuBar._frameSet = frameSet;
         }else{
            throw new TError('Unknown frameset. (name={1})', name);
         }
         o._frameSets.set(name, frameSet);
      }
      var activeFrameSet = o._activeFrameSet;
      if(activeFrameSet != frameSet){
         if(activeFrameSet){
            o._hMenuPanel.removeChild(activeFrameSet._menuBar._hPanel);
            o._frameBody.remove(activeFrameSet);
         }
         o._hMenuPanel.appendChild(frameSet._menuBar._hPanel);
         o._frameBody.push(frameSet);
         frameSet.psResize();
      }
      o._activeFrameSet = frameSet;
      switch(name){
         case EDsFrameSet.ShareResourceFrameSet:
            frameSet.load();
            break;
         case EDsFrameSet.ShareBitmapFrameSet:
         case EDsFrameSet.ShareMaterialFrameSet:
         case EDsFrameSet.ShareModelFrameSet:
         case EDsFrameSet.ShareTemplateFrameSet:
         case EDsFrameSet.ShareSceneFrameSet:
            frameSet.loadByGuid(guid);
            break;
         default:
            throw new TError('Unknown frameset. (name={1})', name);
      }
      o.storageSet('frameset_code', name)
      o.storageSet('frameset_guid', guid)
      o.storageUpdate();
      return frameSet;
   }
   MO.FDsShareWorkspace_load = function FDsShareWorkspace_load(){
      var o = this;
      var code = o._activeFrameSetCode = o.storageGet('frameset_code', EDsFrameSet.ShareResourceFrameSet);
      var guid = o._activeFrameSetGuid = o.storageGet('frameset_guid');
      var button = o._tabBar.findControl('resource');
      button.doClick();
   }
   MO.FDsShareWorkspace_dispose = function FDsShareWorkspace_dispose(){
      var o = this;
      o._frameSets = RObject.dispose(o._frameSets);
      o.__base.FDuiWorkspace.dispose.call(o);
   }
}
with(MO){
   MO.FDsShareResourceCatalogContent = function FDsShareResourceCatalogContent(o){
      o = MO.Class.inherits(this, o, FDuiDataTreeView, MListenerSelected);
      o._activeSpace          = null;
      o._materials            = null;
      o.onBuild               = FDsShareResourceCatalogContent_onBuild;
      o.onLoadDisplay         = FDsShareResourceCatalogContent_onLoadDisplay;
      o.onNodeClick           = FDsShareResourceCatalogContent_onNodeClick;
      o.onNodeViewClick       = FDsShareResourceCatalogContent_onNodeViewClick;
      o.onNodeViewDoubleClick = FDsShareResourceCatalogContent_onNodeViewDoubleClick;
      o.lsnsSelect            = null;
      o.construct             = FDsShareResourceCatalogContent_construct;
      o.selectObject          = FDsShareResourceCatalogContent_selectObject;
      o.showObject            = FDsShareResourceCatalogContent_showObject;
      o.dispose               = FDsShareResourceCatalogContent_dispose;
      return o;
   }
   MO.FDsShareResourceCatalogContent_onBuild = function FDsShareResourceCatalogContent_onBuild(p){
      var o = this;
      o.__base.FDuiDataTreeView.onBuild.call(o, p);
      o.addNodeClickListener(o, o.onNodeClick);
      o.loadUrl('/cloud.describe.tree.ws?action=query&code=resource.catalog');
   }
   MO.FDsShareResourceCatalogContent_onLoadDisplay = function FDsShareResourceCatalogContent_onLoadDisplay(p){
      var o = this;
      var n = p._linkNode;
      o.buildRenderable(n, p);
   }
   MO.FDsShareResourceCatalogContent_onNodeClick = function FDsShareResourceCatalogContent_onNodeClick(t, n){
      var o = this;
   }
   MO.FDsShareResourceCatalogContent_onNodeViewClick = function FDsShareResourceCatalogContent_onNodeViewClick(p){
      var o = this;
   }
   MO.FDsShareResourceCatalogContent_onNodeViewDoubleClick = function FDsShareResourceCatalogContent_onNodeViewDoubleClick(p){
      var o = this;
   }
   MO.FDsShareResourceCatalogContent_construct = function FDsShareResourceCatalogContent_construct(){
      var o = this;
      o.__base.FDuiDataTreeView.construct.call(o);
      o._renderables = new TObjects();
      o._materials = new TObjects();
   }
   MO.FDsShareResourceCatalogContent_selectObject = function FDsShareResourceCatalogContent_selectObject(p){
      var o = this;
      if(p != null){
         o.processSelectedListener(p, true);
      }
   }
   MO.FDsShareResourceCatalogContent_showObject = function FDsShareResourceCatalogContent_showObject(p){
      var o = this;
   }
   MO.FDsShareResourceCatalogContent_dispose = function FDsShareResourceCatalogContent_dispose(){
      var o = this;
      o.__base.FDuiDataTreeView.dispose.call(o);
   }
}
with(MO){
   MO.FDsShareResourceCatalogToolBar = function FDsShareResourceCatalogToolBar(o){
      o = MO.Class.inherits(this, o, FDuiToolBar);
      o._frameName                = 'resource.share.resource.CatalogToolBar';
      o._controlFolderOpenButton  = null;
      o._controlFolderCloseButton = null;
      o._activeNodeGuid           = null;
      o.onBuilded                 = FDsShareResourceCatalogToolBar_onBuilded;
      o.onFolderOpenClick         = FDsShareResourceCatalogToolBar_onFolderOpenClick;
      o.onFolderCloseClick        = FDsShareResourceCatalogToolBar_onFolderCloseClick;
      o.construct                 = FDsShareResourceCatalogToolBar_construct;
      o.dispose                   = FDsShareResourceCatalogToolBar_dispose;
      return o;
   }
   MO.FDsShareResourceCatalogToolBar_onBuilded = function FDsShareResourceCatalogToolBar_onBuilded(p){
      var o = this;
      o.__base.FDuiToolBar.onBuilded.call(o, p);
      o._controlFolderOpen.addClickListener(o, o.onFolderOpenClick);
      o._controlFolderClose.addClickListener(o, o.onFolderCloseClick);
   }
   MO.FDsShareResourceCatalogToolBar_onFolderOpenClick = function FDsShareResourceCatalogToolBar_onFolderOpenClick(event){
   }
   MO.FDsShareResourceCatalogToolBar_onFolderCloseClick = function FDsShareResourceCatalogToolBar_onFolderCloseClick(event){
   }
   MO.FDsShareResourceCatalogToolBar_construct = function FDsShareResourceCatalogToolBar_construct(){
      var o = this;
      o.__base.FDuiToolBar.construct.call(o);
   }
   MO.FDsShareResourceCatalogToolBar_dispose = function FDsShareResourceCatalogToolBar_dispose(){
      var o = this;
      o.__base.FDuiToolBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsShareResourceFrameSet = function FDsShareResourceFrameSet(o){
      o = MO.Class.inherits(this, o, FDuiFrameSet);
      o._frameName            = 'resource.share.resource.FrameSet';
      o._styleToolbarGround   = MO.Class.register(o, new MO.AStyle('_styleToolbarGround', 'Toolbar_Ground'));
      o._styleCatalogContent  = MO.Class.register(o, new MO.AStyle('_styleCatalogContent', 'Catalog_Content'));
      o._styleListContent     = MO.Class.register(o, new MO.AStyle('_styleListContent', 'List_Content'));
      o._stylePropertyContent = MO.Class.register(o, new MO.AStyle('_stylePropertyContent', 'Property_Content'));
      o._resourceTypeCd       = 'picture';
      o._frameCatalog         = null;
      o._frameCatalogToolbar  = null;
      o._frameCatalogContent  = null;
      o._frameSearch          = null;
      o._frameSearchToolbar   = null;
      o._frameSearchContent   = null;
      o._framePreview         = null;
      o._framePreviewToolbar  = null;
      o._framePreviewContent  = null;
      o._propertyFrames       = null;
      o.onBuilded             = FDsShareResourceFrameSet_onBuilded;
      o.onCatalogSelected     = FDsShareResourceFrameSet_onCatalogSelected;
      o.construct             = FDsShareResourceFrameSet_construct;
      o.findPropertyFrame     = FDsShareResourceFrameSet_findPropertyFrame;
      o.switchContent         = FDsShareResourceFrameSet_switchContent;
      o.load                  = FDsShareResourceFrameSet_load;
      o.dispose               = FDsShareResourceFrameSet_dispose;
      return o;
   }
   MO.FDsShareResourceFrameSet_onBuilded = function FDsShareResourceFrameSet_onBuilded(event){
      var o = this;
      o.__base.FDuiFrameSet.onBuilded.call(o, event);
      o._frameCatalogToolBar._hPanel.className = o.styleName('Toolbar_Ground');
      o._frameCatalogContent._hPanel.className = o.styleName('Catalog_Content');
      o._frameListToolBar._hPanel.className = o.styleName('Toolbar_Ground');
      o._frameListContent._hPanel.className = o.styleName('List_Content');
      var f = o._catalogSplitter = o.searchControl('catalogSpliter');
      f.setAlignCd(EUiAlign.Left);
      f.setSizeHtml(o._frameCatalog._hPanel);
      var control = o._catalogToolbar = MO.Class.create(FDsShareResourceCatalogToolBar);
      control._workspace = o._workspace;
      control._frameSet = o;
      control.buildDefine(event);
      o._frameCatalogToolBar.push(control);
      var control = o._catalogContent = MO.Class.create(FDsShareResourceCatalogContent);
      control._workspace = o._workspace;
      control._frameSet = o;
      control.build(event);
      o._frameCatalogContent.push(control);
      var control = o._listToolBar = MO.Class.create(FDsShareResourceListToolBar);
      control._workspace = o._workspace;
      control._frameSet = o;
      control.buildDefine(event);
      o._frameListToolBar.push(control);
      var control = o._listContent = MO.Class.create(FDsShareResourceListContent);
      control._workspace = o._workspace;
      control._frameSet = o;
      control.build(event);
      o._frameListContent.push(control);
   }
   MO.FDsShareResourceFrameSet_onCatalogSelected = function FDsShareResourceFrameSet_onCatalogSelected(p, pc){
      var o = this;
      var space = o._activeSpace;
      var fs = o._propertyFrames;
      var c = fs.count();
      for(var i = 0; i < c; i++){
         var f = fs.value(i);
         f.hide();
      }
      if(MO.Class.isClass(p, FE3dStage)){
         var f = o.findPropertyFrame(EDsFrame.MeshSpacePropertyFrame);
         f.show();
         f.loadObject(space, space);
      }else if(MO.Class.isClass(p, FG3dTechnique)){
         var f = o.findPropertyFrame(EDsFrame.MeshTechniquePropertyFrame);
         f.show();
         f.loadObject(space, p);
      }else if(MO.Class.isClass(p, FE3dRegion)){
         var f = o.findPropertyFrame(EDsFrame.MeshRegionPropertyFrame);
         f.show();
         f.loadObject(space, p);
      }else if(MO.Class.isClass(p, FE3dCamera)){
         var f = o.findPropertyFrame(EDsFrame.MeshCameraPropertyFrame);
         f.show();
         f.loadObject(space, p);
      }else if(MO.Class.isClass(p, FG3dDirectionalLight)){
         var f = o.findPropertyFrame(EDsFrame.MeshLightPropertyFrame);
         f.show();
         f.loadObject(space, p);
      }else if(MO.Class.isClass(p, FE3dMeshDisplay)){
         var f = o.findPropertyFrame(EDsFrame.MeshDisplayPropertyFrame);
         f.show();
         f.loadObject(space, p);
      }else if(MO.Class.isClass(p, FG3dMaterial)){
         var f = o.findPropertyFrame(EDsFrame.MeshMaterialPropertyFrame);
         f.show();
         f.loadObject(space, p);
      }else if(MO.Class.isClass(p, FE3dMeshRenderable)){
         var f = o.findPropertyFrame(EDsFrame.MeshRenderablePropertyFrame);
         f.show();
         f.loadObject(space, p);
      }else{
         throw new TError('Unknown select object type. (value={1})', p);
      }
   }
   MO.FDsShareResourceFrameSet_construct = function FDsShareResourceFrameSet_construct(){
      var o = this;
      o.__base.FDuiFrameSet.construct.call(o);
      o._propertyFrames = new TDictionary();
   }
   MO.FDsShareResourceFrameSet_findPropertyFrame = function FDsShareResourceFrameSet_findPropertyFrame(p){
      var o = this;
      var f = o._propertyFrames.get(p);
      if(!f){
         var fc = MO.Console.find(FFrameConsole);
         f = fc.get(o, p, o._framePreview._hContainer);
         f._workspace = o;
         o._propertyFrames.set(p, f);
      }
      return f;
   }
   MO.FDsShareResourceFrameSet_switchContent = function FDsShareResourceFrameSet_switchContent(typeCd){
      var o = this;
      o._resourceTypeCd = typeCd;
      o._listContent.serviceSearch(typeCd, '', '', 40, 0);
   }
   MO.FDsShareResourceFrameSet_load = function FDsShareResourceFrameSet_load(){
      var o = this;
      o._listToolBar.storageLoad();
   }
   MO.FDsShareResourceFrameSet_dispose = function FDsShareResourceFrameSet_dispose(){
      var o = this;
      o.__base.FDuiFrameSet.dispose.call(o);
      o._propertyFrames.dispose();
      o._propertyFrames = null;
   }
}
with(MO){
   MO.FDsShareResourceListContent = function FDsShareResourceListContent(o){
      o = MO.Class.inherits(this, o, FDuiListView);
      o._contentFlag      = null;
      o._contentTypeCd    = EE3sResource.All;
      o._contentSerach    = '';
      o._contentOrder     = '';
      o._contentPageSize  = 40;
      o._contentPageCount = 0;
      o._contentPage      = 0;
      o._activeItem       = null;
      o._activeGuid       = null;
      o._refreshButton    = null;
      o._saveButton       = null;
      o._runButton        = null;
      o.onServiceLoad     = FDsShareResourceListContent_onServiceLoad;
      o.construct         = FDsShareResourceListContent_construct;
      o.doClickItem       = FDsShareResourceListContent_doClickItem;
      o.doDoubleClickItem = FDsShareResourceListContent_doDoubleClickItem;
      o.serviceSearch     = FDsShareResourceListContent_serviceSearch;
      o.serviceResearch   = FDsShareResourceListContent_serviceResearch;
      o.dispose           = FDsShareResourceListContent_dispose;
      return o;
   }
   MO.FDsShareResourceListContent_onServiceLoad = function FDsShareResourceListContent_onServiceLoad(p){
      var o = this;
      var xitems = p.root.findNode('ResourceCollection');
      var pageSize = xitems.getInteger('page_size');
      var pageCount = xitems.getInteger('page_count');
      var page = xitems.getInteger('page');
      o._frameSet._listToolBar.setNavigator(pageSize, pageCount, page);
      o.clear();
      var xnodes = xitems.nodes();
      var count = xnodes.count();
      for(var i = 0; i < count; i++){
         var xnode = xnodes.getAt(i);
         if(xnode.isName('Resource')){
            var item = o.createItem(FDsShareResourceListItem);
            item.propertyLoad(xnode);
            item._guid = xnode.get('guid');
            item._typeCd = xnode.get('type_cd');
            item._shareCd = xnode.get('share_cd');
            item._code = xnode.get('code');
            item._updateDate = xnode.get('update_date');
            item.setTypeLabel(item._typeCd);
            item.setLabel(xnode.get('code') + ' - ' + xnode.get('label'));
            item.refreshStyle();
            o.push(item);
         }
      }
      MO.Console.find(FDuiDesktopConsole).hide();
   }
   MO.FDsShareResourceListContent_construct = function FDsShareResourceListContent_construct(){
      var o = this;
      o.__base.FDuiListView.construct.call(o);
   }
   MO.FDsShareResourceListContent_doClickItem = function FDsShareResourceListContent_doClickItem(control){
      var o = this;
      o.__base.FDuiListView.doClickItem.call(o, control);
   }
   MO.FDsShareResourceListContent_doDoubleClickItem = function FDsShareResourceListContent_doDoubleClickItem(control){
      var o = this;
      o.__base.FDuiListView.doDoubleClickItem.call(o, control)
      var guid = control._guid;
      o._activeItem = control;
      o._activeGuid = control._guid;
      var workspace = o._frameSet._workspace;
      var typeCd = control._typeCd;
      if(typeCd == EE3sResource.Bitmap){
         workspace.selectFrameSet(EDsFrameSet.ShareBitmapFrameSet, guid);
      }else if(typeCd == EE3sResource.Material){
         workspace.selectFrameSet(EDsFrameSet.ShareMaterialFrameSet, guid);
      }else if(typeCd == EE3sResource.Model){
         workspace.selectFrameSet(EDsFrameSet.ShareModelFrameSet, guid);
      }else if(typeCd == EE3sResource.Template){
         workspace.selectFrameSet(EDsFrameSet.ShareTemplateFrameSet, guid);
      }else if(typeCd == EE3sResource.Scene){
         workspace.selectFrameSet(EDsFrameSet.ShareSceneFrameSet, guid);
      }else{
         throw new TError(o, 'Unsupport resource format.');
      }
   }
   MO.FDsShareResourceListContent_serviceSearch = function FDsShareResourceListContent_serviceSearch(typeCd, search, order, pageSize, page){
      var o = this;
      if(typeCd == null){
         typeCd = o._contentTypeCd;
      }
      if(search == null){
         search = o._contentSerach;
      }
      if(order == null){
         order = o._contentOrder;
      }
      if(pageSize == null){
         pageSize = o._contentPageSize;
      }
      if(page == null){
         page = o._contentPage;
      }
      var flag = typeCd + '|' + search + '|' + order + '|' + pageSize + '|' + page;
      if(o._contentFlag == flag){
         return;
      }
      o._contentFlag = flag;
      o._contentTypeCd = typeCd;
      o._contentSerach = search;
      o._contentOrder = order;
      o._contentPageSize = pageSize;
      o._contentPage = page;
      MO.Console.find(FDuiDesktopConsole).showLoading();
      var connection = MO.Console.find(FDrResourceConsole).doListShare(o._contentTypeCd, o._contentSerach, o._contentOrder, o._contentPageSize, o._contentPage);
      connection.addLoadListener(o, o.onServiceLoad);
   }
   MO.FDsShareResourceListContent_serviceResearch = function FDsShareResourceListContent_serviceResearch(){
      var o = this;
      o.serviceSearch(o._contentTypeCd, o._contentSerach, o._contentOrder, o._contentPageSize, o._contentPage);
   }
   MO.FDsShareResourceListContent_dispose = function FDsShareResourceListContent_dispose(){
      var o = this;
      o.__base.FDuiListView.dispose.call(o);
   }
}
with(MO){
   MO.FDsShareResourceListItem = function FDsShareResourceListItem(o){
      o = MO.Class.inherits(this, o, FDsResourceListItem);
      return o;
   }
}
with(MO){
   MO.FDsShareResourceListToolBar = function FDsShareResourceListToolBar(o){
      o = MO.Class.inherits(this, o, FDsResourceListToolBar);
      o._frameName   = 'resource.share.resource.ListToolBar';
      o._storageCode = o._frameName;
      return o;
   }
}
with(MO){
   MO.FDsShareResourceMenuBar = function FDsShareResourceMenuBar(o){
      o = MO.Class.inherits(this, o, FDuiMenuBar);
      o._frameName      = 'resource.share.resource.MenuBar';
      o._controlRefresh = null;
      o.onBuilded       = FDsShareResourceMenuBar_onBuilded;
      o.onRefreshClick  = FDsShareResourceMenuBar_onRefreshClick;
      o.construct       = FDsShareResourceMenuBar_construct;
      o.dispose         = FDsShareResourceMenuBar_dispose;
      return o;
   }
   MO.FDsShareResourceMenuBar_onBuilded = function FDsShareResourceMenuBar_onBuilded(p){
      var o = this;
      o.__base.FDuiMenuBar.onBuilded.call(o, p);
      o._controlRefresh.addClickListener(o, o.onRefreshClick);
   }
   MO.FDsShareResourceMenuBar_onRefreshClick = function FDsShareResourceMenuBar_onRefreshClick(event){
   }
   MO.FDsShareResourceMenuBar_construct = function FDsShareResourceMenuBar_construct(){
      var o = this;
      o.__base.FDuiMenuBar.construct.call(o);
   }
   MO.FDsShareResourceMenuBar_dispose = function FDsShareResourceMenuBar_dispose(){
      var o = this;
      o.__base.FDuiMenuBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsShareResourcePropertyContent = function FDsShareResourcePropertyContent(o){
      o = MO.Class.inherits(this, o, FDsResourcePropertyContent);
      return o;
   }
}
with(MO){
   MO.FDsShareResourcePropertyToolBar = function FDsShareResourcePropertyToolBar(o){
      o = MO.Class.inherits(this, o, FDuiToolBar);
      o._frameName             = 'resource.resource.PropertyToolBar';
      o._controlInsertButton   = null;
      o._controlUpdateButton   = null;
      o._controlDeleteButton   = null;
      o._controlRotationButton = null;
      o.onBuilded              = FDsShareResourcePropertyToolBar_onBuilded;
      o.onUpdateClick          = FDsShareResourcePropertyToolBar_onUpdateClick;
      o.onRotationClick        = FDsShareResourcePropertyToolBar_onRotationClick;
      o.construct              = FDsShareResourcePropertyToolBar_construct;
      o.dispose                = FDsShareResourcePropertyToolBar_dispose;
      return o;
   }
   MO.FDsShareResourcePropertyToolBar_onBuilded = function FDsShareResourcePropertyToolBar_onBuilded(p){
      var o = this;
      o.__base.FDuiToolBar.onBuilded.call(o, p);
      o._controlUpdateButton.addClickListener(o, o.onUpdateClick);
      o._controlRotationButton.addClickListener(o, o.onRotationClick);
   }
   MO.FDsShareResourcePropertyToolBar_onUpdateClick = function FDsShareResourcePropertyToolBar_onUpdateClick(event){
      var o = this;
   }
   MO.FDsShareResourcePropertyToolBar_onRotationClick = function FDsShareResourcePropertyToolBar_onRotationClick(event){
      var o = this;
      var previewContent = o._workspace._previewContent;
      previewContent.switchRotation(event.checked);
   }
   MO.FDsShareResourcePropertyToolBar_construct = function FDsShareResourcePropertyToolBar_construct(){
      var o = this;
      o.__base.FDuiToolBar.construct.call(o);
   }
   MO.FDsShareResourcePropertyToolBar_dispose = function FDsShareResourcePropertyToolBar_dispose(){
      var o = this;
      o.__base.FDuiToolBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsShareResourceTabBar = function FDsShareResourceTabBar(o){
      o = MO.Class.inherits(this, o, FDuiTabBar);
      o._frameName             = 'design3d.resource.TabBar';
      o._resourceTypeCd        = 'mesh';
      o._controlPictureButton  = null;
      o._controlSoundButton    = null;
      o._controlVidioButton    = null;
      o._controlTextureButton  = null;
      o._controlMaterialButton = null;
      o._controlMeshButton     = null;
      o._controlModelButton    = null;
      o._controlTemplateButton = null;
      o._controlSceneButton    = null;
      o.onBuilded              = FDsShareResourceTabBar_onBuilded;
      o.onButtonClick          = FDsShareResourceTabBar_onButtonClick;
      o.construct              = FDsShareResourceTabBar_construct;
      o.dispose                = FDsShareResourceTabBar_dispose;
      return o;
   }
   MO.FDsShareResourceTabBar_onBuilded = function FDsShareResourceTabBar_onBuilded(p){
      var o = this;
      o.__base.FDuiTabBar.onBuilded.call(o, p);
      o._controlPictureButton.addClickListener(o, o.onButtonClick);
      o._controlSoundButton.addClickListener(o, o.onButtonClick);
      o._controlVidioButton.addClickListener(o, o.onButtonClick);
      o._controlTextureButton.addClickListener(o, o.onButtonClick);
      o._controlMaterialButton.addClickListener(o, o.onButtonClick);
      o._controlMeshButton.addClickListener(o, o.onButtonClick);
      o._controlModelButton.addClickListener(o, o.onButtonClick);
      o._controlTemplateButton.addClickListener(o, o.onButtonClick);
      o._controlSceneButton.addClickListener(o, o.onButtonClick);
   }
   MO.FDsShareResourceTabBar_onButtonClick = function FDsShareResourceTabBar_onButtonClick(event){
      var o = this;
      var sender = event.sender;
      var name = sender.name();
      o._resourceTypeCd = name;
   }
   MO.FDsShareResourceTabBar_construct = function FDsShareResourceTabBar_construct(){
      var o = this;
      o.__base.FDuiTabBar.construct.call(o);
   }
   MO.FDsShareResourceTabBar_dispose = function FDsShareResourceTabBar_dispose(){
      var o = this;
      o.__base.FDuiTabBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsShareResourceWorkspace = function FDsShareResourceWorkspace(o){
      o = MO.Class.inherits(this, o, FDuiWorkspace);
      o._frameName            = 'resource.share.resource.Workspace';
      o._styleToolbarGround   = MO.Class.register(o, new MO.AStyle('_styleToolbarGround', 'Toolbar_Ground'));
      o._styleStatusbarGround = MO.Class.register(o, new MO.AStyle('_styleStatusbarGround', 'Statusbar_Ground'));
      o._styleCatalogGround   = MO.Class.register(o, new MO.AStyle('_styleCatalogGround', 'Catalog_Ground'));
      o._styleCatalogToolbar  = MO.Class.register(o, new MO.AStyle('_styleCatalogToolbar', 'Catalog_Toolbar'));
      o._styleSearchGround    = MO.Class.register(o, new MO.AStyle('_styleSearchGround', 'Search_Ground'));
      o._styleSearchToolbar   = MO.Class.register(o, new MO.AStyle('_styleCatalogToolbar', 'Search_Toolbar'));
      o._stylePreviewGround   = MO.Class.register(o, new MO.AStyle('_stylePreviewGround', 'Preview_Ground'));
      o._stylePreviewToolbar  = MO.Class.register(o, new MO.AStyle('_stylePreviewToolbar', 'Preview_Toolbar'));
      o._stylePropertyGround  = MO.Class.register(o, new MO.AStyle('_stylePropertyGround', 'Property_Ground'));
      o._styleWorkspaceGround = MO.Class.register(o, new MO.AStyle('_styleWorkspaceGround', 'Workspace_Ground'));
      o._resourceTypeCd       = 'picture';
      o._frameToolBar         = null;
      o._frameStatusBar       = null;
      o._frameCatalog         = null;
      o._frameCatalogToolbar  = null;
      o._frameCatalogContent  = null;
      o._frameSearch          = null;
      o._frameSearchToolbar   = null;
      o._frameSearchContent   = null;
      o._framePreview         = null;
      o._framePreviewToolbar  = null;
      o._framePreviewContent  = null;
      o._propertyFrames       = null;
      o.onBuilded             = FDsShareResourceWorkspace_onBuilded;
      o.onMeshLoad            = FDsShareResourceWorkspace_onMeshLoad;
      o.onCatalogSelected     = FDsShareResourceWorkspace_onCatalogSelected;
      o.construct             = FDsShareResourceWorkspace_construct;
      o.findPropertyFrame     = FDsShareResourceWorkspace_findPropertyFrame;
      o.switchContent         = FDsShareResourceWorkspace_switchContent;
      o.load                  = FDsShareResourceWorkspace_load;
      o.dispose               = FDsShareResourceWorkspace_dispose;
      return o;
   }
   MO.FDsShareResourceWorkspace_onBuilded = function FDsShareResourceWorkspace_onBuilded(p){
      var o = this;
      o.__base.FDuiWorkspace.onBuilded.call(o, p);
      var frame = o._frameToolBar = o.searchControl('toolbarFrame');
      frame._hPanel.className = o.styleName('Toolbar_Ground');
      var frame = o._frameBody = o.searchControl('bodyFrame');
      frame._hPanel.className = o.styleName('Catalog_Ground');
      var frame = o._frameStatusBar = o.searchControl('statusFrame');
      frame._hPanel.className = o.styleName('Statusbar_Ground');
      var hTable = MO.Window.Builder.createTable(p);
      hTable.width = '100%';
      var hRow = MO.Window.Builder.appendTableRow(hTable);
      var c = o._toolbar = MO.Class.create(FDsShareResourceMenuBar);
      c._workspace = o;
      c.buildDefine(p);
      var hCell = MO.Window.Builder.appendTableCell(hRow);
      hCell.appendChild(c._hPanel);
      var c = o._tabBar = MO.Class.create(FDsShareResourceTabBar);
      c._workspace = o;
      c.buildDefine(p);
      var hCell = MO.Window.Builder.appendTableCell(hRow);
      hCell.width = '450px';
      hCell.align = 'right';
      hCell.vAlign = 'bottom';
      hCell.appendChild(c._hPanel);
      o._frameToolBar._hPanel.appendChild(hTable);
      var frameSet = o._frameSet = MO.Class.create(FDsShareResourceFrameSet);
      frameSet._workspace = o;
      frameSet.buildDefine(p);
      o._frameBody.push(frameSet);
      frameSet.switchContent(o._resourceTypeCd);
   }
   MO.FDsShareResourceWorkspace_onMeshLoad = function FDsShareResourceWorkspace_onMeshLoad(p){
      var o = this;
      o._activeSpace = p._activeSpace;
      o._catalog.buildSpace(o._activeSpace);
   }
   MO.FDsShareResourceWorkspace_onCatalogSelected = function FDsShareResourceWorkspace_onCatalogSelected(p, pc){
      var o = this;
      var space = o._activeSpace;
      var fs = o._propertyFrames;
      var c = fs.count();
      for(var i = 0; i < c; i++){
         var f = fs.value(i);
         f.hide();
      }
      if(MO.Class.isClass(p, FE3dStage)){
         var f = o.findPropertyFrame(EDsFrame.MeshSpacePropertyFrame);
         f.show();
         f.loadObject(space, space);
      }else if(MO.Class.isClass(p, FG3dTechnique)){
         var f = o.findPropertyFrame(EDsFrame.MeshTechniquePropertyFrame);
         f.show();
         f.loadObject(space, p);
      }else if(MO.Class.isClass(p, FE3dRegion)){
         var f = o.findPropertyFrame(EDsFrame.MeshRegionPropertyFrame);
         f.show();
         f.loadObject(space, p);
      }else if(MO.Class.isClass(p, FE3dCamera)){
         var f = o.findPropertyFrame(EDsFrame.MeshCameraPropertyFrame);
         f.show();
         f.loadObject(space, p);
      }else if(MO.Class.isClass(p, FG3dDirectionalLight)){
         var f = o.findPropertyFrame(EDsFrame.MeshLightPropertyFrame);
         f.show();
         f.loadObject(space, p);
      }else if(MO.Class.isClass(p, FE3dMeshDisplay)){
         var f = o.findPropertyFrame(EDsFrame.MeshDisplayPropertyFrame);
         f.show();
         f.loadObject(space, p);
      }else if(MO.Class.isClass(p, FG3dMaterial)){
         var f = o.findPropertyFrame(EDsFrame.MeshMaterialPropertyFrame);
         f.show();
         f.loadObject(space, p);
      }else if(MO.Class.isClass(p, FE3dMeshRenderable)){
         var f = o.findPropertyFrame(EDsFrame.MeshRenderablePropertyFrame);
         f.show();
         f.loadObject(space, p);
      }else{
         throw new TError('Unknown select object type. (value={1})', p);
      }
   }
   MO.FDsShareResourceWorkspace_construct = function FDsShareResourceWorkspace_construct(){
      var o = this;
      o.__base.FDuiWorkspace.construct.call(o);
      o._propertyFrames = new TDictionary();
   }
   MO.FDsShareResourceWorkspace_findPropertyFrame = function FDsShareResourceWorkspace_findPropertyFrame(p){
      var o = this;
      var f = o._propertyFrames.get(p);
      if(!f){
         var fc = MO.Console.find(FFrameConsole);
         f = fc.get(o, p, o._framePreview._hContainer);
         f._workspace = o;
         o._propertyFrames.set(p, f);
      }
      return f;
   }
   MO.FDsShareResourceWorkspace_switchContent = function FDsShareResourceWorkspace_switchContent(typeCd){
      this._frameSet.switchContent(typeCd);
   }
   MO.FDsShareResourceWorkspace_load = function FDsShareResourceWorkspace_load(){
      var o = this;
   }
   MO.FDsShareResourceWorkspace_dispose = function FDsShareResourceWorkspace_dispose(){
      var o = this;
      o.__base.FDuiWorkspace.dispose.call(o);
      o._propertyFrames.dispose();
      o._propertyFrames = null;
   }
}
with(MO){
   MO.FDsShareBitmapCanvasContent = function FDsShareBitmapCanvasContent(o){
      o = MO.Class.inherits(this, o, FDsBitmapCanvasContent);
      return o;
   }
}
with(MO){
   MO.FDsShareBitmapCanvasToolBar = function FDsShareBitmapCanvasToolBar(o){
      o = MO.Class.inherits(this, o, FDsBitmapCanvasToolBar);
      o._frameName = 'resource.share.bitmap.CanvasToolBar';
      return o;
   }
}
with(MO){
   MO.FDsShareBitmapFrameSet = function FDsShareBitmapFrameSet(o){
      o = MO.Class.inherits(this, o, FDsBitmapFrameSet);
      o._frameName = 'resource.share.bitmap.FrameSet';
      o.onBuilded  = FDsShareBitmapFrameSet_onBuilded;
      return o;
   }
   MO.FDsShareBitmapFrameSet_onBuilded = function FDsShareBitmapFrameSet_onBuilded(event){
      var o = this;
      o.__base.FDsBitmapFrameSet.onBuilded.call(o, event);
      var toolbar = o._canvasToolbar = MO.Class.create(FDsShareBitmapCanvasToolBar);
      toolbar._frameSet = o;
      toolbar.buildDefine(event);
      o._frameCanvasToolBar.push(toolbar);
      var canvas = o._canvasContent = MO.Class.create(FDsBitmapCanvasContent);
      canvas._frameSet = o;
      canvas._hParent = o._frameCanvasContent._hPanel;
      canvas._hParent.style.backgroundColor = '#333333';
      canvas._hParent.style.scroll = 'auto';
      canvas.build(event);
      o._frameCanvasContent.push(canvas);
      var toolbar = o._propertyToolbar = MO.Class.create(FDsBitmapPropertyToolBar);
      toolbar._frameSet = o;
      toolbar.buildDefine(event);
      o._framePropertyToolBar.push(toolbar);
      var frame = o.findPropertyFrame(EDsFrame.BitmapPropertyFrame);
      o._framePropertyContent.push(frame);
   }
}
with(MO){
   MO.FDsShareBitmapMenuBar = function FDsShareBitmapMenuBar(o){
      o = MO.Class.inherits(this, o, FDsBitmapMenuBar);
      o._frameName  = 'resource.share.bitmap.MenuBar';
      o.onBuilded   = FDsShareBitmapMenuBar_onBuilded;
      o.onBackClick = FDsShareBitmapMenuBar_onBackClick;
      return o;
   }
   MO.FDsShareBitmapMenuBar_onBuilded = function FDsShareBitmapMenuBar_onBuilded(event){
      var o = this;
      o.__base.FDsBitmapMenuBar.onBuilded.call(o, event);
      o._controlBack.addClickListener(o, o.onBackClick);
   }
   MO.FDsShareBitmapMenuBar_onBackClick = function FDsShareBitmapMenuBar_onBackClick(event){
      var o = this;
      var workspace = o._frameSet._workspace;
      workspace.selectFrameSet(EDsFrameSet.ShareResourceFrameSet);
   }
}
with(MO){
   MO.FDsShareBitmapPropertyToolBar = function FDsShareBitmapPropertyToolBar(o){
      o = MO.Class.inherits(this, o, FDsBitmapPropertyToolBar);
      o._frameName = 'resource.share.bitmap.PropertyToolBar';
      return o;
   }
}
with(MO){
   MO.FDsShareBitmapWorkspace = function FDsShareBitmapWorkspace(o){
      o = MO.Class.inherits(this, o, FDsBitmapWorkspace);
      o._frameName = 'resource.share.bitmap.Workspace';
      return o;
   }
}
with(MO){
   MO.FDsShareMaterialCanvasToolBar = function FDsShareMaterialCanvasToolBar(o){
      o = MO.Class.inherits(this, o, FDsMaterialCanvasToolBar);
      o._frameName = 'resource.share.materail.CanvasToolBar';
      return o;
   }
}
with(MO){
   MO.FDsShareMaterialFrameSet = function FDsShareMaterialFrameSet(o){
      o = MO.Class.inherits(this, o, FDsMaterialFrameSet);
      o._frameName = 'resource.share.material.FrameSet';
      o.onBuilded  = FDsShareMaterialFrameSet_onBuilded;
      return o;
   }
   MO.FDsShareMaterialFrameSet_onBuilded = function FDsShareMaterialFrameSet_onBuilded(event){
      var o = this;
      o.__base.FDsMaterialFrameSet.onBuilded.call(o, event);
      var toolbar = o._toolbar = MO.Class.create(FDsShareMaterialMenuBar);
      toolbar._frameSet = o;
      toolbar.buildDefine(event);
      o._frameToolBar.push(toolbar);
      var catalog = o._catalogContent = MO.Class.create(FDsMaterialCatalogContent);
      catalog._frameSet = o;
      catalog.build(event);
      catalog.addSelectedListener(o, o.onCatalogSelected);
      o._frameCatalogContent.push(catalog);
      var toolbar = o._canvasToolbar = MO.Class.create(FDsShareMaterialCanvasToolBar);
      toolbar._frameSet = o;
      toolbar.buildDefine(event);
      o._frameCanvasToolBar.push(toolbar);
      var canvas = o._canvasContent = MO.Class.create(FDsMaterialCanvasContent);
      canvas._frameSet = o;
      canvas._toolbar = o._canvasToolbar;
      canvas._hParent = o._frameCanvasContent._hPanel;
      canvas._hParent.style.backgroundColor = '#333333';
      canvas._hParent.style.scroll = 'auto';
      canvas.addLoadListener(o, o.onDataLoaded);
      canvas.build(event);
      o._frameCanvasContent.push(canvas);
   }
}
with(MO){
   MO.FDsShareMaterialMenuBar = function FDsShareMaterialMenuBar(o){
      o = MO.Class.inherits(this, o, FDsMaterialMenuBar);
      o._frameName = 'resource.share.material.MenuBar';
      return o;
   }
}
with(MO){
   MO.FDsShareModelCanvasToolBar = function FDsShareModelCanvasToolBar(o){
      o = MO.Class.inherits(this, o, FDsModelCanvasToolBar);
      o._frameName = 'resource.share.model.CanvasToolBar';
      return o;
   }
}
with(MO){
   MO.FDsShareModelCatalogToolBar = function FDsShareModelCatalogToolBar(o){
      o = MO.Class.inherits(this, o, FDsModelCatalogToolBar);
      o._frameName = 'resource.share.model.CatalogToolBar';
      return o;
   }
}
with(MO){
   MO.FDsShareModelFrameSet = function FDsShareModelFrameSet(o){
      o = MO.Class.inherits(this, o, FDsModelFrameSet);
      o._frameName = 'resource.share.model.FrameSet';
      o.onBuilded  = FDsShareModelFrameSet_onBuilded;
      return o;
   }
   MO.FDsShareModelFrameSet_onBuilded = function FDsShareModelFrameSet_onBuilded(event){
      var o = this;
      o.__base.FDsModelFrameSet.onBuilded.call(o, event);
      var toolbar = o._catalogToolbar = MO.Class.create(FDsShareModelCatalogToolBar);
      toolbar._frameSet = o;
      toolbar.buildDefine(event);
      o._frameCatalogToolBar.push(toolbar);
      var catalog = o._catalogContent = MO.Class.create(FDsModelCatalogContent);
      catalog._frameSet = o;
      catalog.build(event);
      catalog.addSelectedListener(o, o.onCatalogSelected);
      o._frameCatalogContent.push(catalog);
      var toolbar = o._canvasToolbar = MO.Class.create(FDsShareModelCanvasToolBar);
      toolbar._frameSet = o;
      toolbar.buildDefine(event);
      o._frameCanvasToolBar.push(toolbar);
      var canvas = o._canvasContent = MO.Class.create(FDsModelCanvasContent);
      canvas._frameSet = o;
      canvas._toolbar = o._canvasToolbar;
      canvas._hParent = o._frameCanvasContent._hPanel;
      canvas._hParent.style.backgroundColor = '#333333';
      canvas._hParent.style.scroll = 'auto';
      canvas.addLoadListener(o, o.onDataLoaded);
      canvas.build(event);
      o._frameCanvasContent.push(canvas);
   }
}
with(MO){
   MO.FDsShareModelMenuBar = function FDsShareModelMenuBar(o){
      o = MO.Class.inherits(this, o, FDsModelMenuBar);
      o._frameName = 'resource.share.model.MenuBar';
      o.onBuilded  = FDsShareModelMenuBar_onBuilded;
      return o;
   }
   MO.FDsShareModelMenuBar_onBuilded = function FDsShareModelMenuBar_onBuilded(p){
      var o = this;
      o.__base.FDsModelMenuBar.onBuilded.call(o, p);
   }
}
with(MO){
   MO.FDsShareTemplateCanvasToolBar = function FDsShareTemplateCanvasToolBar(o){
      o = MO.Class.inherits(this, o, FDuiToolBar);
      o._frameName      = 'resource.share.template.CanvasToolBar';
      o._refreshButton  = null;
      o._saveButton     = null;
      o._canvasModeCd   = EDsCanvasMode.Drop;
      o.onBuilded       = FDsShareTemplateCanvasToolBar_onBuilded;
      o.onModeClick     = FDsShareTemplateCanvasToolBar_onModeClick;
      o.onLookClick     = FDsShareTemplateCanvasToolBar_onLookClick;
      o.onPlayClick     = FDsShareTemplateCanvasToolBar_onPlayClick;
      o.onViewClick     = FDsShareTemplateCanvasToolBar_onViewClick;
      o.construct       = FDsShareTemplateCanvasToolBar_construct;
      o.dispose         = FDsShareTemplateCanvasToolBar_dispose;
      return o;
   }
   MO.FDsShareTemplateCanvasToolBar_onBuilded = function FDsShareTemplateCanvasToolBar_onBuilded(event){
      var o = this;
      o.__base.FDuiToolBar.onBuilded.call(o, event);
      o._controlModeDrop.addClickListener(o, o.onModeClick);
      o._controlModeSelect.addClickListener(o, o.onModeClick);
      o._controlTranslate.addClickListener(o, o.onModeClick);
      o._controlRotation.addClickListener(o, o.onModeClick);
      o._controlScale.addClickListener(o, o.onModeClick);
      o._controlLookFront.addClickListener(o, o.onLookClick);
      o._controlLookUp.addClickListener(o, o.onLookClick);
      o._controlLookLeft.addClickListener(o, o.onLookClick);
      o._controlPlay.addClickListener(o, o.onPlayClick);
      o._controlView.addClickListener(o, o.onViewClick);
   }
   MO.FDsShareTemplateCanvasToolBar_onModeClick = function FDsShareTemplateCanvasToolBar_onModeClick(p){
      var o = this;
      o._canvasModeCd = p._canvasModeCd;
   }
   MO.FDsShareTemplateCanvasToolBar_onLookClick = function FDsShareTemplateCanvasToolBar_onLookClick(p){
      var o = this;
      o._canvasModeCd = p._canvasModeCd;
   }
   MO.FDsShareTemplateCanvasToolBar_onPlayClick = function FDsShareTemplateCanvasToolBar_onPlayClick(p, v){
      var o = this;
      var c = o._frameSet._canvasContent;
      c._rotationAble = v;
   }
   MO.FDsShareTemplateCanvasToolBar_onViewClick = function FDsShareTemplateCanvasToolBar_onViewClick(p, v){
      var o = this;
      var c = o._frameSet._canvasContent;
      c._rotationAble = v;
   }
   MO.FDsShareTemplateCanvasToolBar_construct = function FDsShareTemplateCanvasToolBar_construct(){
      var o = this;
      o.__base.FDuiToolBar.construct.call(o);
   }
   MO.FDsShareTemplateCanvasToolBar_dispose = function FDsShareTemplateCanvasToolBar_dispose(){
      var o = this;
      o.__base.FDuiToolBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsShareTemplateCatalogToolBar = function FDsShareTemplateCatalogToolBar(o){
      o = MO.Class.inherits(this, o, FDsTemplateCatalogToolBar);
      o._frameName = 'resource.share.template.CatalogToolBar';
      return o;
   }
}
with(MO){
   MO.FDsShareTemplateFrameSet = function FDsShareTemplateFrameSet(o){
      o = MO.Class.inherits(this, o, FDsTemplateFrameSet);
      o._frameName = 'resource.share.template.FrameSet';
      o.onBuilded  = FDsShareTemplateFrameSet_onBuilded;
      return o;
   }
   MO.FDsShareTemplateFrameSet_onBuilded = function FDsShareTemplateFrameSet_onBuilded(event){
      var o = this;
      o.__base.FDsTemplateFrameSet.onBuilded.call(o, event);
      var toolbar = o._catalogToolbar = MO.Class.create(FDsShareTemplateCatalogToolBar);
      toolbar._frameSet = o;
      toolbar.buildDefine(event);
      o._frameCatalogToolBar.push(toolbar);
      var catalog = o._catalogContent = MO.Class.create(FDsTemplateCatalogContent);
      catalog._frameSet = o;
      catalog.build(event);
      catalog.addSelectedListener(o, o.onCatalogSelected);
      o._frameCatalogContent.push(catalog);
      var toolbar = o._canvasToolbar = MO.Class.create(FDsShareTemplateCanvasToolBar);
      toolbar._frameSet = o;
      toolbar._workspace = o._worksapce;
      toolbar.buildDefine(event);
      o._frameCanvasToolBar.push(toolbar);
      var canvas = o._canvasContent = MO.Class.create(FDsTemplateCanvasContent);
      canvas._frameSet = o;
      canvas._toolbar = o._canvasToolbar;
      canvas._hParent = o._frameCanvasContent._hPanel;
      canvas._hParent.style.backgroundColor = '#333333';
      canvas._hParent.style.scroll = 'auto';
      canvas.addLoadListener(o, o.onDataLoaded);
      canvas.build(event);
      o._frameCanvasContent.push(canvas);
   }
}
with(MO){
   MO.FDsShareTemplateMenuBar = function FDsShareTemplateMenuBar(o){
      o = MO.Class.inherits(this, o, FDsTemplateMenuBar);
      o._frameName = 'resource.share.template.MenuBar';
      o.onBuilded  = FDsShareTemplateMenuBar_onBuilded;
      return o;
   }
   MO.FDsShareTemplateMenuBar_onBuilded = function FDsShareTemplateMenuBar_onBuilded(p){
      var o = this;
      o.__base.FDsTemplateMenuBar.onBuilded.call(o, p);
   }
}
with(MO){
   MO.FDsShareTemplateToolBar = function FDsShareTemplateToolBar(o){
      o = MO.Class.inherits(this, o, FDsTemplateToolBar);
      return o;
   }
   MO.FDsShareTemplateToolBar_onBuild = function FDsShareTemplateToolBar_onBuild(p){
      var o = this;
      o.__base.FDuiToolBar.onBuild.call(o, p);
      var b = o._refreshButton  = MO.Class.create(FDuiToolButton);
      b.setLabel('刷新');
      b.setIcon('design3d.tools.refresh');
      b.build(p);
      b.addClickListener(o, o.onRefreshClick);
      o.push(b);
      var b = o._saveButton = MO.Class.create(FDuiToolButton);
      b.setLabel('保存');
      b.setIcon('design3d.tools.save');
      b.build(p);
      b.addClickListener(o, o.onSaveClick);
      o.push(b);
   }
   MO.FDsShareTemplateToolBar_onRefreshClick = function FDsShareTemplateToolBar_onRefreshClick(p){
      var o = this;
   }
   MO.FDsShareTemplateToolBar_onSaveClick = function FDsShareTemplateToolBar_onSaveClick(p){
      var o = this;
      var t = o._workspace._activeTemplate;
      var rt = t._resource;
      var ts = rt.themes();
      var tc = ts.count();
      var xr = new TXmlNode();
      for(var ti = 0; ti < tc; ti++){
         var t = ts.get(ti);
         var ms = t.materials();
         var mc = ms.count();
         for(var mi = 0; mi < mc; mi++){
            var m = ms.value(mi);
            m.saveConfig(xr.create('Material'));
         }
      }
      MO.Console.find(FE3sTemplateConsole).update(xr);
   }
   MO.FDsShareTemplateToolBar_construct = function FDsShareTemplateToolBar_construct(){
      var o = this;
      o.__base.FDuiToolBar.construct.call(o);
   }
   MO.FDsShareTemplateToolBar_dispose = function FDsShareTemplateToolBar_dispose(){
      var o = this;
      o.__base.FDuiToolBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsShareSceneCanvasToolBar = function FDsShareSceneCanvasToolBar(o){
      o = MO.Class.inherits(this, o, FDsSceneCanvasToolBar);
      o._frameName = 'resource.share.scene.CanvasToolBar';
      return o;
   }
}
with(MO){
   MO.FDsShareSceneCatalogToolBar = function FDsShareSceneCatalogToolBar(o){
      o = MO.Class.inherits(this, o, FDsSceneCatalogToolBar);
      o._frameName = 'resource.share.scene.CatalogToolBar';
      return o;
   }
}
with(MO){
   MO.FDsShareSceneFrameSet = function FDsShareSceneFrameSet(o){
      o = MO.Class.inherits(this, o, FDsSceneFrameSet);
      o._frameName = 'resource.share.scene.FrameSet';
      o.onBuilded  = FDsShareSceneFrameSet_onBuilded;
      return o;
   }
   MO.FDsShareSceneFrameSet_onBuilded = function FDsShareSceneFrameSet_onBuilded(event){
      var o = this;
      o.__base.FDsSceneFrameSet.onBuilded.call(o, event);
      var toolbar = o._catalogToolbar = MO.Class.create(FDsShareSceneCatalogToolBar);
      toolbar._frameSet = o;
      toolbar.buildDefine(event);
      o._frameCatalogToolBar.push(toolbar);
      var catalog = o._catalogContent = MO.Class.create(FDsSceneCatalogContent);
      catalog._frameSet = o;
      catalog.build(event);
      catalog.addSelectedListener(o, o.onCatalogSelected);
      o._frameCatalogContent.push(catalog);
      var toolbar = o._canvasToolbar = MO.Class.create(FDsShareSceneCanvasToolBar);
      toolbar._frameSet = o;
      toolbar.buildDefine(event);
      o._frameCanvasToolBar.push(toolbar);
      var canvas = o._canvasContent = MO.Class.create(FDsSceneCanvasContent);
      canvas._frameSet = o;
      canvas._toolbar = o._canvasToolbar;
      canvas._hParent = o._frameCanvasContent._hPanel;
      canvas._hParent.style.backgroundColor = '#333333';
      canvas._hParent.style.scroll = 'auto';
      canvas.addLoadListener(o, o.onDataLoaded);
      canvas.build(event);
      o._frameCanvasContent.push(canvas);
      var toolbar = o._propertyToolbar = MO.Class.create(FDsScenePropertyToolBar);
      toolbar._frameSet = o;
      toolbar.buildDefine(event);
      o._framePropertyToolBar.push(toolbar);
   }
}
with(MO){
   MO.FDsShareSceneMenuBar = function FDsShareSceneMenuBar(o){
      o = MO.Class.inherits(this, o, FDsSceneMenuBar);
      o._frameName = 'resource.share.scene.MenuBar';
      o.onBuilded  = FDsShareSceneMenuBar_onBuilded;
      return o;
   }
   MO.FDsShareSceneMenuBar_onBuilded = function FDsShareSceneMenuBar_onBuilded(p){
      var o = this;
      o.__base.FDsSceneMenuBar.onBuilded.call(o, p);
      o._controlExecute.addClickListener(o, o.onExecuteClick);
   }
}
