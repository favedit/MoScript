MO.FDssCanvas = function FDssCanvas(o){
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
   o.construct           = MO.FDssCanvas_construct;
   o.setPanel            = MO.FDssCanvas_setPanel;
   o.resize              = MO.FDssCanvas_resize;
   o.selectStage         = MO.FDssCanvas_selectStage;
   o.dispose             = MO.FDssCanvas_dispose;
   return o;
}
MO.FDssCanvas_construct = function FDssCanvas_construct(){
   var o = this;
   o.__base.FE3dCanvas.construct.call(o);
   o._rotation = new MO.SVector3();
   o._capturePosition = new MO.SPoint2();
   o._captureRotation = new MO.SVector3();
   o._logicSize = new MO.SSize2(1920, 1080);
   o._cameraPosition = new MO.SPoint3();
}
MO.FDssCanvas_setPanel = function FDssCanvas_setPanel(hPanel){
   var o = this;
   o._hPanel = hPanel;
   hPanel.appendChild(o._hCanvas);
}
MO.FDssCanvas_resize = function FDssCanvas_resize(width, height){
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
MO.FDssCanvas_selectStage = function FDssCanvas_selectStage(stage){
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
MO.FDssCanvas_dispose = function FDssCanvas_dispose(){
   var o = this;
   o._rotation = MO.Lang.Object.dispose(o._rotation);
   o._capturePosition = MO.Lang.Object.dispose(o._capturePosition);
   o._captureRotation = MO.Lang.Object.dispose(o._captureRotation);
   o.__base.FE3dCanvas.dispose.call(o);
}
MO.FDssDesktop = function FDssDesktop(o){
   o = MO.Class.inherits(this, o, MO.FDesktop);
   o._canvas3d              = MO.Class.register(o, new MO.AGetter('_canvas3d'));
   o._canvas2d              = MO.Class.register(o, new MO.AGetter('_canvas2d'));
   o.onOperationResize      = MO.FDssDesktop_onOperationResize;
   o.onOperationOrientation = MO.FDssDesktop_onOperationOrientation;
   o.construct              = MO.FDssDesktop_construct;
   o.build                  = MO.FDssDesktop_build;
   o.resize                 = MO.FDssDesktop_resize;
   o.dispose                = MO.FDssDesktop_dispose;
   return o;
}
MO.FDssDesktop_onOperationResize = function FDssDesktop_onOperationResize(event){
   var o = this;
   o.__base.FDesktop.onOperationResize.call(o, event);
   o.resize();
}
MO.FDssDesktop_onOperationOrientation = function FDssDesktop_onOperationOrientation(){
   var o = this;
   o.__base.FDesktop.onOperationOrientation.call(o, event);
   o.resize();
}
MO.FDssDesktop_construct = function FDssDesktop_construct(){
   var o = this;
   o.__base.FDesktop.construct.call(o);
}
MO.FDssDesktop_build = function FDssDesktop_build(hPanel){
   var o = this;
   o.__base.FDesktop.build.call(o, hPanel);
   var canvas3d = o._canvas3d = MO.RClass.create(MO.FDssCanvas);
   canvas3d.setDesktop(o);
   canvas3d.build(hPanel);
   canvas3d.setPanel(hPanel);
   o.canvasRegister(canvas3d);
   var canvas2d = o._canvas2d = MO.RClass.create(MO.FE2dCanvas);
   canvas2d.setDesktop(o);
   canvas2d.build(hPanel);
   canvas2d.setPanel(hPanel);
   canvas2d._hCanvas.style.position = 'absolute';
   o.canvasRegister(canvas2d);
   MO.RE3dEngine.setup();
}
MO.FDssDesktop_resize = function FDssDesktop_resize(targetWidth, targetHeight){
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
MO.FDssDesktop_dispose = function FDssDesktop_dispose(){
   var o = this;
   o._canvas3d = MO.Lang.Object.dispose(o._canvas3d);
   o._canvas2d = MO.Lang.Object.dispose(o._canvas2d);
   o.__base.FDesktop.dispose.call(o);
}
MO.FDssGuiManage = function FDssGuiManage(o){
   o = MO.Class.inherits(this, o, MO.FGuiCanvasManage);
   o.construct = MO.FDssGuiManage_construct;
   o.dispose   = MO.FDssGuiManage_dispose;
   return o;
}
MO.FDssGuiManage_construct = function FDssGuiManage_construct(){
   var o = this;
   o.__base.FGuiCanvasManage.construct.call(o);
}
MO.FDssGuiManage_dispose = function FDssGuiManage_dispose(){
   var o = this;
   o.__base.FGuiCanvasManage.dispose.call(o);
}
with(MO){
   MO.FDsSystemTabBar = function FDsSystemTabBar(o){
      o = MO.Class.inherits(this, o, FDuiTabBar);
      o._frameName            = 'system.design.TabBar';
      o._resourceTypeCd       = 'private';
      o._controlPrivateButton = null;
      o._controlTeamButton    = null;
      o._controlShareButton   = null;
      o.onBuilded             = FDsSystemTabBar_onBuilded;
      o.onButtonClick         = FDsSystemTabBar_onButtonClick;
      o.construct             = FDsSystemTabBar_construct;
      o.dispose               = FDsSystemTabBar_dispose;
      return o;
   }
   MO.FDsSystemTabBar_onBuilded = function FDsSystemTabBar_onBuilded(p){
      var o = this;
      o.__base.FDuiTabBar.onBuilded.call(o, p);
      o._controlPersistence.addClickListener(o, o.onButtonClick);
      o._controlList.addClickListener(o, o.onButtonClick);
      o._controlTree.addClickListener(o, o.onButtonClick);
      o._controlFrame.addClickListener(o, o.onButtonClick);
   }
   MO.FDsSystemTabBar_onButtonClick = function FDsSystemTabBar_onButtonClick(event){
      var o = this;
      var workspace = o._workspace;
      var sender = event.sender;
      var name = sender.name();
      if(name == 'persistence'){
         workspace.selectFrameSet(EDsFrameSet.SystemDesignPersistenceFrameSet);
      }else if(name == 'list'){
         workspace.selectFrameSet(EDsFrameSet.SystemDesignListFrameSet);
      }else if(name == 'tree'){
         workspace.selectFrameSet(EDsFrameSet.SystemDesignTreeFrameSet);
      }else if(name == 'frame'){
         workspace.selectFrameSet(EDsFrameSet.SystemDesignFrameFrameSet);
      }else{
         alert('功能未开启，请以后关注。');
      }
   }
   MO.FDsSystemTabBar_construct = function FDsSystemTabBar_construct(){
      var o = this;
      o.__base.FDuiTabBar.construct.call(o);
   }
   MO.FDsSystemTabBar_dispose = function FDsSystemTabBar_dispose(){
      var o = this;
      o.__base.FDuiTabBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsSystemWorkspace = function FDsSystemWorkspace(o){
      o = MO.Class.inherits(this, o, FDuiWorkspace, MUiStorage);
      o._frameName            = 'system.design.Workspace';
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
      o.onBuilded             = FDsSystemWorkspace_onBuilded;
      o.construct             = FDsSystemWorkspace_construct;
      o.selectFrameSet        = FDsSystemWorkspace_selectFrameSet;
      o.load                  = FDsSystemWorkspace_load;
      o.dispose               = FDsSystemWorkspace_dispose;
      return o;
   }
   MO.FDsSystemWorkspace_onBuilded = function FDsSystemWorkspace_onBuilded(event){
      var o = this;
      o.__base.FDuiWorkspace.onBuilded.call(o, event);
      o._frameMenuBar._hPanel.className = o.styleName('MenuBar_Ground');
      o._frameBody._hPanel.className = o.styleName('Body_Ground');
      o._frameStatusBar._hPanel.className = o.styleName('StatusBar_Ground');
      var hTable = MO.Window.Builder.createTable(event);
      hTable.width = '100%';
      var hRow = MO.Window.Builder.appendTableRow(hTable);
      o._hMenuPanel = MO.Window.Builder.appendTableCell(hRow);
      var control = o._tabBar = MO.Class.create(FDsSystemTabBar);
      control._workspace = o;
      control.buildDefine(event);
      var hCell = MO.Window.Builder.appendTableCell(hRow);
      hCell.width = '240px';
      hCell.align = 'right';
      hCell.vAlign = 'bottom';
      hCell.appendChild(control._hPanel);
      o._frameMenuBar._hPanel.appendChild(hTable);
   }
   MO.FDsSystemWorkspace_construct = function FDsSystemWorkspace_construct(){
      var o = this;
      o.__base.FDuiWorkspace.construct.call(o);
      o._frameSets = new TDictionary();
   }
   MO.FDsSystemWorkspace_selectFrameSet = function FDsSystemWorkspace_selectFrameSet(name, guid){
      var o = this;
      var frameSet = o._frameSets.get(name);
      if(!frameSet){
         if(name == EDsFrameSet.SystemDesignPersistenceFrameSet){
            var menuBar = MO.Class.create(FDsSystemPersistenceMenuBar);
            menuBar._workspace = o;
            menuBar.buildDefine(o._hPanel);
            frameSet = RConsole.find(FDuiFrameConsole).findByClass(o, FDsSystemPersistenceFrameSet);
            frameSet._workspace = o;
            frameSet._menuBar = menuBar;
            menuBar._frameSet = frameSet;
         }else if(name == EDsFrameSet.SystemDesignListFrameSet){
            var menuBar = MO.Class.create(FDsSystemListMenuBar);
            menuBar._workspace = o;
            menuBar.buildDefine(o._hPanel);
            frameSet = RConsole.find(FDuiFrameConsole).findByClass(o, FDsSystemListFrameSet);
            frameSet._workspace = o;
            frameSet._menuBar = menuBar;
            menuBar._frameSet = frameSet;
         }else if(name == EDsFrameSet.SystemDesignTreeFrameSet){
            var menuBar = MO.Class.create(FDsSystemTreeMenuBar);
            menuBar._workspace = o;
            menuBar.buildDefine(o._hPanel);
            frameSet = RConsole.find(FDuiFrameConsole).findByClass(o, FDsSystemTreeFrameSet);
            frameSet._workspace = o;
            frameSet._menuBar = menuBar;
            menuBar._frameSet = frameSet;
         }else if(name == EDsFrameSet.SystemDesignFrameFrameSet){
            var menuBar = MO.Class.create(FDsSystemFrameMenuBar);
            menuBar._workspace = o;
            menuBar.buildDefine(o._hPanel);
            frameSet = RConsole.find(FDuiFrameConsole).findByClass(o, FDsSystemFrameFrameSet);
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
         case EDsFrameSet.SystemDesignPersistenceFrameSet:
            frameSet.load();
            break;
         case EDsFrameSet.SystemDesignListFrameSet:
            frameSet.load();
            break;
         case EDsFrameSet.SystemDesignTreeFrameSet:
            frameSet.load();
            break;
         case EDsFrameSet.SystemDesignFrameFrameSet:
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
   MO.FDsSystemWorkspace_load = function FDsSystemWorkspace_load(){
      var o = this;
      var code = o._activeFrameSetCode = o.storageGet('frameset_code', EDsFrameSet.SolutionFrameSet);
      var guid = o._activeFrameSetGuid = o.storageGet('frameset_guid');
      var button = null;
      if(code == EDsFrameSet.SystemDesignPersistenceFrameSet){
         button = o._tabBar.findControl('persistence');
         button.doClick();
      }else if(code == EDsFrameSet.SystemDesignListFrameSet){
         button = o._tabBar.findControl('list');
         o._tabBar.select(button);
         o.selectFrameSet(code, guid)
      }else if(code == EDsFrameSet.SystemDesignTreeFrameSet){
         button = o._tabBar.findControl('tree');
         button.doClick();
      }else if(code == EDsFrameSet.SystemDesignFrameFrameSet){
         button = o._tabBar.findControl('frame');
         o._tabBar.select(button);
         o.selectFrameSet(code, guid)
      }else{
         button = o._tabBar.findControl('frame');
         button.doClick();
      }
   }
   MO.FDsSystemWorkspace_dispose = function FDsSystemWorkspace_dispose(){
      var o = this;
      o._frameSets = RObject.dispose(o._frameSets, true);
      o.__base.FDuiWorkspace.dispose.call(o);
   }
}
with(MO){
   MO.FDsSystemDesignFrameSet = function FDsSystemDesignFrameSet(o){
      o = MO.Class.inherits(this, o, FDsFrameSet);
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
      o.construct             = FDsSystemDesignFrameSet_construct;
      o.dispose               = FDsSystemDesignFrameSet_dispose;
      return o;
   }
   MO.FDsSystemDesignFrameSet_construct = function FDsSystemDesignFrameSet_construct(){
      var o = this;
      o.__base.FDsFrameSet.construct.call(o);
   }
   MO.FDsSystemDesignFrameSet_dispose = function FDsSystemDesignFrameSet_dispose(){
      var o = this;
      o.__base.FDsFrameSet.dispose.call(o);
   }
}
with(MO){
   MO.FDsSystemPersistenceCatalogContent = function FDsSystemPersistenceCatalogContent(o){
      o = MO.Class.inherits(this, o, FDuiDataTreeView, MListenerSelected);
      o._activeFrame = null;
      o.onNodeClick  = FDsSystemPersistenceCatalogContent_onNodeClick;
      o.construct    = FDsSystemPersistenceCatalogContent_construct;
      o.selectObject = FDsSystemPersistenceCatalogContent_selectObject;
      o.showObject   = FDsSystemPersistenceCatalogContent_showObject;
      o.dispose      = FDsSystemPersistenceCatalogContent_dispose;
      return o;
   }
   MO.FDsSystemPersistenceCatalogContent_onNodeClick = function FDsSystemPersistenceCatalogContent_onNodeClick(event){
      var o = this;
      var node = event.node;
      var typeGroup = node.typeGroup();
      var nodeType = node.type();
      var typeCode = node.typeCode();
      var frameName = nodeType.get('property_frame');
      var label = node.label();
      if(typeGroup == EDuiTreeNodeGroup.Container){
         o._frameSet.load(label);
         o._frameSet.selectObject(typeGroup, frameName, null);
      }else if(typeGroup == EDuiTreeNodeGroup.Item){
         o._frameSet.selectObject(typeGroup, frameName, label);
      }
   }
   MO.FDsSystemPersistenceCatalogContent_construct = function FDsSystemPersistenceCatalogContent_construct(){
      var o = this;
      o.__base.FDuiDataTreeView.construct.call(o);
      o.loadUrl('/cloud.describe.tree.ws?action=query&code=system.design.persistence');
   }
   MO.FDsSystemPersistenceCatalogContent_selectObject = function FDsSystemPersistenceCatalogContent_selectObject(item){
      var o = this;
      if(item){
         o.processSelectedListener(item, true);
      }
   }
   MO.FDsSystemPersistenceCatalogContent_showObject = function FDsSystemPersistenceCatalogContent_showObject(item){
      var o = this;
      if(MO.Class.isClass(item, FDsSceneRenderable)){
         var renderableNodes = o._renderableNodes;
         var renderableCount = renderableNodes.count();
         for(var i = 0; i < renderableCount; i++){
            var renderableNode = renderableNodes.at(i);
            var renderable = renderableNode.dataPropertyGet('linker');
            if(renderable == item){
               o.processSelectedListener(item, false);
            }
         }
      }
   }
   MO.FDsSystemPersistenceCatalogContent_dispose = function FDsSystemPersistenceCatalogContent_dispose(){
      var o = this;
      o._activeFrame = null;
      o.__base.FDuiDataTreeView.dispose.call(o);
   }
}
with(MO){
   MO.FDsSystemPersistenceCatalogToolBar = function FDsSystemPersistenceCatalogToolBar(o){
      o = MO.Class.inherits(this, o, FDuiToolBar);
      o._frameName = 'system.design.frame.CatalogToolBar';
      o._controlFolderCreateButton   = null;
      o._controlFolderDeleteButton   = null;
      o._controlFolderPropertyButton = null;
      o._controlFolderOpenButton     = null;
      o._controlFolderCloseButton    = null;
      o._activeNodeGuid              = null;
      o.onBuilded                    = FDsSystemPersistenceCatalogToolBar_onBuilded;
      o.onFolderCreateClick          = FDsSystemPersistenceCatalogToolBar_onFolderCreateClick;
      o.onFolderDeleteLoad           = FDsSystemPersistenceCatalogToolBar_onFolderDeleteLoad;
      o.onFolderDeleteExcute         = FDsSystemPersistenceCatalogToolBar_onFolderDeleteExcute;
      o.onFolderDeleteClick          = FDsSystemPersistenceCatalogToolBar_onFolderDeleteClick;
      o.onFolderPropertyClick        = FDsSystemPersistenceCatalogToolBar_onFolderPropertyClick;
      o.onFolderOpenClick            = FDsSystemPersistenceCatalogToolBar_onFolderOpenClick;
      o.onFolderCloseClick           = FDsSystemPersistenceCatalogToolBar_onFolderCloseClick;
      o.construct                    = FDsSystemPersistenceCatalogToolBar_construct;
      o.dispose                      = FDsSystemPersistenceCatalogToolBar_dispose;
      return o;
   }
   MO.FDsSystemPersistenceCatalogToolBar_onBuilded = function FDsSystemPersistenceCatalogToolBar_onBuilded(p){
      var o = this;
      o.__base.FDuiToolBar.onBuilded.call(o, p);
   }
   MO.FDsSystemPersistenceCatalogToolBar_onFolderCreateClick = function FDsSystemPersistenceCatalogToolBar_onFolderCreateClick(event){
      var o = this;
      var parentGuid = null;
      var parentLabel = null;
      var catalog = o._frameSet._catalogContent;
      var node = catalog.focusNode();
      if(node){
         parentGuid = node.guid();
         parentLabel = node.label();
      }
      var dialog = RConsole.find(FDuiWindowConsole).find(FDsResourceFolderDialog);
      dialog._workspace = o._workspace;
      dialog._frameSet = o._frameSet;
      dialog._parentGuid = parentGuid;
      dialog.setNodeParentLabel(parentLabel);
      dialog.setNodeLabel('');
      dialog.switchDataMode(EUiDataMode.Insert);
      dialog.showPosition(EUiPosition.Center);
   }
   MO.FDsSystemPersistenceCatalogToolBar_onFolderDeleteLoad = function FDsSystemPersistenceCatalogToolBar_onFolderDeleteLoad(event){
      var o = this;
      RConsole.find(FDuiDesktopConsole).hide();
      var catalog = o._frameSet._catalogContent;
      var guid = o._activeNodeGuid;
      if(guid){
         var node = catalog.findByGuid(guid);
         node.removeSelf();
      }
      o._activeNodeGuid = null;
   }
   MO.FDsSystemPersistenceCatalogToolBar_onFolderDeleteExcute = function FDsSystemPersistenceCatalogToolBar_onFolderDeleteExcute(event){
      var o = this;
      if(event.resultCd != EResult.Success){
         return;
      }
      var catalog = o._frameSet._catalogContent;
      var node = catalog.focusNode();
      RConsole.find(FDuiDesktopConsole).showUploading();
      o._activeNodeGuid = node._guid;
      var connection = RConsole.find(FDrResourceConsole).doFolderDelete(node._guid);
      connection.addLoadListener(o, o.onFolderDeleteLoad);
   }
   MO.FDsSystemPersistenceCatalogToolBar_onFolderDeleteClick = function FDsSystemPersistenceCatalogToolBar_onFolderDeleteClick(event){
      var o = this;
      var catalog = o._frameSet._catalogContent;
      var node = catalog.focusNode();
      if(!node){
         return RConsole.find(FDuiMessageConsole).showInfo('请选中目录节点后，再点击操作。');
      }
      var dialog = RConsole.find(FDuiMessageConsole).showConfirm('请确认是否删除当前目录？');
      dialog.addResultListener(o, o.onFolderDeleteExcute);
   }
   MO.FDsSystemPersistenceCatalogToolBar_onFolderPropertyClick = function FDsSystemPersistenceCatalogToolBar_onFolderPropertyClick(event){
      var o = this;
      var catalog = o._frameSet._catalogContent;
      var node = catalog.focusNode();
      if(!node){
         return RConsole.find(FDuiMessageConsole).showInfo('请选中目录节点后，再点击操作。');
      }
      var parentLabel = null;
      if(node._parent){
         parentLabel = node._parent.label();
      }
      var dialog = RConsole.find(FDuiWindowConsole).find(FDsResourceFolderDialog);
      dialog._workspace = o._workspace;
      dialog._frameSet = o._frameSet;
      dialog._nodeGuid = node._guid;
      dialog.setNodeParentLabel(parentLabel);
      dialog.setNodeLabel(node.label());
      dialog.switchDataMode(EUiDataMode.Update);
      dialog.showPosition(EUiPosition.Center);
   }
   MO.FDsSystemPersistenceCatalogToolBar_onFolderOpenClick = function FDsSystemPersistenceCatalogToolBar_onFolderOpenClick(event){
   }
   MO.FDsSystemPersistenceCatalogToolBar_onFolderCloseClick = function FDsSystemPersistenceCatalogToolBar_onFolderCloseClick(event){
   }
   MO.FDsSystemPersistenceCatalogToolBar_construct = function FDsSystemPersistenceCatalogToolBar_construct(){
      var o = this;
      o.__base.FDuiToolBar.construct.call(o);
   }
   MO.FDsSystemPersistenceCatalogToolBar_dispose = function FDsSystemPersistenceCatalogToolBar_dispose(){
      var o = this;
      o.__base.FDuiToolBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsSystemPersistenceFrameSet = function FDsSystemPersistenceFrameSet(o){
      o = MO.Class.inherits(this, o, FDsSystemDesignFrameSet);
      o._frameName   = 'system.design.persistence.FrameSet';
      o.onBuilded    = FDsSystemPersistenceFrameSet_onBuilded;
      o.construct    = FDsSystemPersistenceFrameSet_construct;
      o.selectObject = FDsSystemPersistenceFrameSet_selectObject;
      o.load         = FDsSystemPersistenceFrameSet_load;
      o.dispose      = FDsSystemPersistenceFrameSet_dispose;
      return o;
   }
   MO.FDsSystemPersistenceFrameSet_onBuilded = function FDsSystemPersistenceFrameSet_onBuilded(event){
      var o = this;
      o.__base.FDsSystemDesignFrameSet.onBuilded.call(o, event);
      o._frameCatalogToolBar._hPanel.className = o.styleName('Toolbar_Ground');
      o._frameCatalogContent._hPanel.className = o.styleName('Catalog_Content');
      o._framePropertyToolBar._hPanel.className = o.styleName('Toolbar_Ground');
      o._framePropertyContent._hPanel.className = o.styleName('Property_Content');
      var spliter = o._catalogSplitter = o.searchControl('catalogSpliter');
      spliter.setAlignCd(EUiAlign.Left);
      spliter.setSizeHtml(o._frameCatalog._hPanel);
      var control = o._catalogToolbar = MO.Class.create(FDsSystemPersistenceCatalogToolBar);
      control._workspace = o._workspace;
      control._frameSet = o;
      control.buildDefine(event);
      o._frameCatalogToolBar.push(control);
      var control = o._catalogContent = MO.Class.create(FDsSystemPersistenceCatalogContent);
      control._workspace = o._workspace;
      control._frameSet = o;
      control.build(event);
      o._frameCatalogContent.push(control);
      var control = o._propertyToolbar = MO.Class.create(FDsSystemPersistencePropertyToolBar);
      control._workspace = o._workspace;
      control._frameSet = o;
      control.buildDefine(event);
      o._framePropertyToolBar.push(control);
   }
   MO.FDsSystemPersistenceFrameSet_construct = function FDsSystemPersistenceFrameSet_construct(){
      var o = this;
      o.__base.FDsSystemDesignFrameSet.construct.call(o);
   }
   MO.FDsSystemPersistenceFrameSet_selectObject = function FDsSystemPersistenceFrameSet_selectObject(typeGroup, propertyFrame, controlName){
      var o = this;
      var activeFrame = o._spaceContent._activeFrame;
      var frames = o._propertyFrames;
      var count = frames.count();
      for(var i = 0; i < count; i++){
         var frame = frames.at(i);
         frame.hide();
      }
      var frame = o.findPropertyFrame(propertyFrame);
      frame.show();
      if(typeGroup == EDuiTreeNodeGroup.Container){
         frame.loadObject(activeFrame, activeFrame);
      }else{
         var activeControl = activeFrame.findComponent(controlName);
         frame.loadObject(activeFrame, activeControl);
         o._spaceContent.selectControl(activeControl);
      }
   }
   MO.FDsSystemPersistenceFrameSet_load = function FDsSystemPersistenceFrameSet_load(name){
      var o = this;
      if(name){
         o._spaceContent.loadFrame(name);
      }
   }
   MO.FDsSystemPersistenceFrameSet_dispose = function FDsSystemPersistenceFrameSet_dispose(){
      var o = this;
      o.__base.FDsSystemDesignFrameSet.dispose.call(o);
   }
}
with(MO){
   MO.FDsSystemPersistenceMenuBar = function FDsSystemPersistenceMenuBar(o){
      o = MO.Class.inherits(this, o, FDuiMenuBar);
      o._frameName      = 'system.design.frame.MenuBar';
      o._controlRefresh = null;
      o.onBuilded       = FDsSystemPersistenceMenuBar_onBuilded;
      o.onCreateClick   = FDsSystemPersistenceMenuBar_onCreateClick;
      o.onUpdateClick   = FDsSystemPersistenceMenuBar_onUpdateClick;
      o.onDeleteClick   = FDsSystemPersistenceMenuBar_onDeleteClick;
      return o;
   }
   MO.FDsSystemPersistenceMenuBar_onBuilded = function FDsSystemPersistenceMenuBar_onBuilded(p){
      var o = this;
      o.__base.FDuiMenuBar.onBuilded.call(o, p);
      o._controlCreate.addClickListener(o, o.onCreateClick);
      o._controlUpdate.addClickListener(o, o.onUpdateClick);
      o._controlDelete.addClickListener(o, o.onDeleteClick);
   }
   MO.FDsSystemPersistenceMenuBar_onCreateClick = function FDsSystemPersistenceMenuBar_onCreateClick(event){
      var o = this;
   }
   MO.FDsSystemPersistenceMenuBar_onUpdateClick = function FDsSystemPersistenceMenuBar_onUpdateClick(event){
      var o = this;
      var frame = o._frameSet._spaceContent._activeFrame;
      var xdocument = new TXmlDocument();
      var xroot = xdocument.root();
      xroot.set('action', 'update');
      var xframe = xroot.create('Frame');
      RGuiControl.saveConfig(frame, xframe);
      return RConsole.find(FXmlConsole).sendAsync('/cloud.describe.frame.ws?do=update', xdocument);
   }
   MO.FDsSystemPersistenceMenuBar_onDeleteClick = function FDsSystemPersistenceMenuBar_onDeleteClick(event){
      var o = this;
   }
}
with(MO){
   MO.FDsSystemPersistencePropertyContent = function FDsSystemPersistencePropertyContent(o){
      o = MO.Class.inherits(this, o, FDsCatalog);
      o.onBuild        = FDsSystemPersistencePropertyContent_onBuild;
      o.onNodeClick    = FDsSystemPersistencePropertyContent_onNodeClick;
      o.construct      = FDsSystemPersistencePropertyContent_construct;
      o.buildTechnique = FDsSystemPersistencePropertyContent_buildTechnique;
      o.buildRegion    = FDsSystemPersistencePropertyContent_buildRegion;
      o.buildMaterial  = FDsSystemPersistencePropertyContent_buildMaterial;
      o.buildDisplay   = FDsSystemPersistencePropertyContent_buildDisplay;
      o.buildSpace     = FDsSystemPersistencePropertyContent_buildSpace;
      o.dispose        = FDsSystemPersistencePropertyContent_dispose;
      return o;
   }
   MO.FDsSystemPersistencePropertyContent_onBuild = function FDsSystemPersistencePropertyContent_onBuild(p){
      var o = this;
      o.__base.FDsCatalog.onBuild.call(o, p);
      o.loadUrl('/cloud.describe.tree.ws?action=query&code=resource.template');
   }
   MO.FDsSystemPersistencePropertyContent_onNodeClick = function FDsSystemPersistencePropertyContent_onNodeClick(t, n){
      var o = this;
      var s = n.dataPropertyGet('linker');
      o.selectObject(s);
   }
   MO.FDsSystemPersistencePropertyContent_construct = function FDsSystemPersistencePropertyContent_construct(){
      var o = this;
      o.__base.FDsCatalog.construct.call(o);
   }
   MO.FDsSystemPersistencePropertyContent_buildTechnique = function FDsSystemPersistencePropertyContent_buildTechnique(n, p){
      var o = this;
      var nt = o.createNode();
      nt.setLabel('Technique');
      nt.setTypeCode('technique');
      nt.dataPropertySet('linker', p);
      n.appendNode(nt);
   }
   MO.FDsSystemPersistencePropertyContent_buildRegion = function FDsSystemPersistencePropertyContent_buildRegion(n, p){
      var o = this;
      var nr = o.createNode();
      nr.setLabel('Region');
      nr.setTypeCode('region');
      nr.dataPropertySet('linker', p);
      n.appendNode(nr);
      var nc = o.createNode();
      nc.setLabel('Camera');
      nc.setTypeCode('camera');
      nc.dataPropertySet('linker', p.camera());
      nr.appendNode(nc);
      var nl = o.createNode();
      nl.setLabel('Light');
      nl.setTypeCode('light');
      nl.dataPropertySet('linker', p.directionalLight());
      nr.appendNode(nl);
   }
   MO.FDsSystemPersistencePropertyContent_buildMaterial = function FDsSystemPersistencePropertyContent_buildMaterial(parentNode, material){
      var o = this;
      var resource = material.resource();
      var node = o.createNode();
      node.setTypeCode('Material');
      node.setLabel(resource.code());
      node.setNote(resource.label());
      node.dataPropertySet('linker', material);
      parentNode.appendNode(node);
   }
   MO.FDsSystemPersistencePropertyContent_buildDisplay = function FDsSystemPersistencePropertyContent_buildDisplay(parentNode, display){
      var o = this;
      var resource = display.resource();
      var node = o.createNode();
      node.setTypeCode('Display');
      node.setLabel(RString.nvl(resource.code(), 'Display'));
      node.setNote(resource.label());
      node.dataPropertySet('linker', display);
      parentNode.appendNode(node);
      var renderables = display.renderables();
      var renderableCount = renderables.count();
      if(renderableCount > 0){
         for(var i = 0; i < renderableCount; i++){
            var renderable = renderables.at(i);
            var renderableResource = renderable.resource();
            var renderableNode = o.createNode();
            renderableNode.setTypeCode('Renderable');
            renderableNode.setLabel(renderableResource.code());
            renderableNode.setNote(renderableResource.label());
            renderableNode.dataPropertySet('linker', renderable);
            node.appendNode(renderableNode);
         }
      }
   }
   MO.FDsSystemPersistencePropertyContent_buildSpace = function FDsSystemPersistencePropertyContent_buildSpace(space){
      var o = this;
      o.clearAllNodes();
      var resource = space.resource();
      var spaceNode = o.createNode();
      spaceNode.setTypeCode('Space');
      spaceNode.setLabel(resource.code());
      spaceNode.setNote(resource.label());
      spaceNode.dataPropertySet('linker', space);
      o.appendNode(spaceNode);
      o.buildTechnique(spaceNode, space.technique())
      o.buildRegion(spaceNode, space.region());
      var materialsNode = o.createNode();
      materialsNode.setTypeCode('Region');
      materialsNode.setLabel('Materials');
      spaceNode.appendNode(materialsNode);
      var materials = space.materials();
      var materialCount = materials.count();
      for(var i = 0; i < materialCount; i++){
         var material = materials.at(i);
         o.buildMaterial(materialsNode, material);
      }
      var displaysNode = o.createNode();
      displaysNode.setTypeCode('Region');
      displaysNode.setLabel('Displays');
      spaceNode.appendNode(displaysNode);
      var displays = space._sprites;
      var displayCount = displays.count();
      for(var i = 0; i < displayCount; i++){
         var display = displays.at(i);
         o.buildDisplay(displaysNode, display);
      }
      spaceNode.click();
   }
   MO.FDsSystemPersistencePropertyContent_dispose = function FDsSystemPersistencePropertyContent_dispose(){
      var o = this;
      o.__base.FDsCatalog.dispose.call(o);
   }
}
with(MO){
   MO.FDsSystemPersistencePropertyToolBar = function FDsSystemPersistencePropertyToolBar(o){
      o = MO.Class.inherits(this, o, FDuiToolBar);
      o._frameName           = 'system.design.frame.PropertyToolBar';
      o._controlInsertButton = null;
      o._controlUpdateButton = null;
      o._controlDeleteButton = null;
      o.onBuilded            = FDsSystemPersistencePropertyToolBar_onBuilded;
      o.onUpdateClick        = FDsSystemPersistencePropertyToolBar_onUpdateClick;
      o.construct            = FDsSystemPersistencePropertyToolBar_construct;
      o.dispose              = FDsSystemPersistencePropertyToolBar_dispose;
      return o;
   }
   MO.FDsSystemPersistencePropertyToolBar_onBuilded = function FDsSystemPersistencePropertyToolBar_onBuilded(p){
      var o = this;
      o.__base.FDuiToolBar.onBuilded.call(o, p);
   }
   MO.FDsSystemPersistencePropertyToolBar_onUpdateClick = function FDsSystemPersistencePropertyToolBar_onUpdateClick(event){
      var o = this;
      var guid = o._workspace._activeProjectGuid;
      window.location = 'Project.wa?do=detail&guid=' + guid;
   }
   MO.FDsSystemPersistencePropertyToolBar_construct = function FDsSystemPersistencePropertyToolBar_construct(){
      var o = this;
      o.__base.FDuiToolBar.construct.call(o);
   }
   MO.FDsSystemPersistencePropertyToolBar_dispose = function FDsSystemPersistencePropertyToolBar_dispose(){
      var o = this;
      o.__base.FDuiToolBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsSystemListCatalogContent = function FDsSystemListCatalogContent(o){
      o = MO.Class.inherits(this, o, FDuiDataTreeView, MListenerSelected);
      o._activeFrame = null;
      o.onNodeClick  = FDsSystemListCatalogContent_onNodeClick;
      o.construct    = FDsSystemListCatalogContent_construct;
      o.selectObject = FDsSystemListCatalogContent_selectObject;
      o.showObject   = FDsSystemListCatalogContent_showObject;
      o.dispose      = FDsSystemListCatalogContent_dispose;
      return o;
   }
   MO.FDsSystemListCatalogContent_onNodeClick = function FDsSystemListCatalogContent_onNodeClick(event){
      var o = this;
      var node = event.node;
      var typeGroup = node.typeGroup();
      var nodeType = node.type();
      var typeCode = node.typeCode();
      var frameName = nodeType.get('property_frame');
      var label = node.label();
      if(typeGroup == EDuiTreeNodeGroup.Container){
         o._frameSet.load(label);
         o._frameSet.selectObject(typeGroup, frameName, null);
      }else if(typeGroup == EDuiTreeNodeGroup.Item){
         o._frameSet.selectObject(typeGroup, frameName, label);
      }
   }
   MO.FDsSystemListCatalogContent_construct = function FDsSystemListCatalogContent_construct(){
      var o = this;
      o.__base.FDuiDataTreeView.construct.call(o);
      o.loadUrl('/cloud.describe.tree.ws?action=query&code=system.design.list');
   }
   MO.FDsSystemListCatalogContent_selectObject = function FDsSystemListCatalogContent_selectObject(item){
      var o = this;
      if(item){
         o.processSelectedListener(item, true);
      }
   }
   MO.FDsSystemListCatalogContent_showObject = function FDsSystemListCatalogContent_showObject(item){
      var o = this;
      if(MO.Class.isClass(item, FDsSceneRenderable)){
         var renderableNodes = o._renderableNodes;
         var renderableCount = renderableNodes.count();
         for(var i = 0; i < renderableCount; i++){
            var renderableNode = renderableNodes.at(i);
            var renderable = renderableNode.dataPropertyGet('linker');
            if(renderable == item){
               o.processSelectedListener(item, false);
            }
         }
      }
   }
   MO.FDsSystemListCatalogContent_dispose = function FDsSystemListCatalogContent_dispose(){
      var o = this;
      o._activeFrame = null;
      o.__base.FDuiDataTreeView.dispose.call(o);
   }
}
with(MO){
   MO.FDsSystemListCatalogToolBar = function FDsSystemListCatalogToolBar(o){
      o = MO.Class.inherits(this, o, FDuiToolBar);
      o._frameName = 'system.design.frame.CatalogToolBar';
      o._controlFolderCreateButton   = null;
      o._controlFolderDeleteButton   = null;
      o._controlFolderPropertyButton = null;
      o._controlFolderOpenButton     = null;
      o._controlFolderCloseButton    = null;
      o._activeNodeGuid              = null;
      o.onBuilded                    = FDsSystemListCatalogToolBar_onBuilded;
      o.onFolderCreateClick          = FDsSystemListCatalogToolBar_onFolderCreateClick;
      o.onFolderDeleteLoad           = FDsSystemListCatalogToolBar_onFolderDeleteLoad;
      o.onFolderDeleteExcute         = FDsSystemListCatalogToolBar_onFolderDeleteExcute;
      o.onFolderDeleteClick          = FDsSystemListCatalogToolBar_onFolderDeleteClick;
      o.onFolderPropertyClick        = FDsSystemListCatalogToolBar_onFolderPropertyClick;
      o.onFolderOpenClick            = FDsSystemListCatalogToolBar_onFolderOpenClick;
      o.onFolderCloseClick           = FDsSystemListCatalogToolBar_onFolderCloseClick;
      o.construct                    = FDsSystemListCatalogToolBar_construct;
      o.dispose                      = FDsSystemListCatalogToolBar_dispose;
      return o;
   }
   MO.FDsSystemListCatalogToolBar_onBuilded = function FDsSystemListCatalogToolBar_onBuilded(p){
      var o = this;
      o.__base.FDuiToolBar.onBuilded.call(o, p);
   }
   MO.FDsSystemListCatalogToolBar_onFolderCreateClick = function FDsSystemListCatalogToolBar_onFolderCreateClick(event){
      var o = this;
      var parentGuid = null;
      var parentLabel = null;
      var catalog = o._frameSet._catalogContent;
      var node = catalog.focusNode();
      if(node){
         parentGuid = node.guid();
         parentLabel = node.label();
      }
      var dialog = RConsole.find(FDuiWindowConsole).find(FDsResourceFolderDialog);
      dialog._workspace = o._workspace;
      dialog._frameSet = o._frameSet;
      dialog._parentGuid = parentGuid;
      dialog.setNodeParentLabel(parentLabel);
      dialog.setNodeLabel('');
      dialog.switchDataMode(EUiDataMode.Insert);
      dialog.showPosition(EUiPosition.Center);
   }
   MO.FDsSystemListCatalogToolBar_onFolderDeleteLoad = function FDsSystemListCatalogToolBar_onFolderDeleteLoad(event){
      var o = this;
      RConsole.find(FDuiDesktopConsole).hide();
      var catalog = o._frameSet._catalogContent;
      var guid = o._activeNodeGuid;
      if(guid){
         var node = catalog.findByGuid(guid);
         node.removeSelf();
      }
      o._activeNodeGuid = null;
   }
   MO.FDsSystemListCatalogToolBar_onFolderDeleteExcute = function FDsSystemListCatalogToolBar_onFolderDeleteExcute(event){
      var o = this;
      if(event.resultCd != EResult.Success){
         return;
      }
      var catalog = o._frameSet._catalogContent;
      var node = catalog.focusNode();
      RConsole.find(FDuiDesktopConsole).showUploading();
      o._activeNodeGuid = node._guid;
      var connection = RConsole.find(FDrResourceConsole).doFolderDelete(node._guid);
      connection.addLoadListener(o, o.onFolderDeleteLoad);
   }
   MO.FDsSystemListCatalogToolBar_onFolderDeleteClick = function FDsSystemListCatalogToolBar_onFolderDeleteClick(event){
      var o = this;
      var catalog = o._frameSet._catalogContent;
      var node = catalog.focusNode();
      if(!node){
         return RConsole.find(FDuiMessageConsole).showInfo('请选中目录节点后，再点击操作。');
      }
      var dialog = RConsole.find(FDuiMessageConsole).showConfirm('请确认是否删除当前目录？');
      dialog.addResultListener(o, o.onFolderDeleteExcute);
   }
   MO.FDsSystemListCatalogToolBar_onFolderPropertyClick = function FDsSystemListCatalogToolBar_onFolderPropertyClick(event){
      var o = this;
      var catalog = o._frameSet._catalogContent;
      var node = catalog.focusNode();
      if(!node){
         return RConsole.find(FDuiMessageConsole).showInfo('请选中目录节点后，再点击操作。');
      }
      var parentLabel = null;
      if(node._parent){
         parentLabel = node._parent.label();
      }
      var dialog = RConsole.find(FDuiWindowConsole).find(FDsResourceFolderDialog);
      dialog._workspace = o._workspace;
      dialog._frameSet = o._frameSet;
      dialog._nodeGuid = node._guid;
      dialog.setNodeParentLabel(parentLabel);
      dialog.setNodeLabel(node.label());
      dialog.switchDataMode(EUiDataMode.Update);
      dialog.showPosition(EUiPosition.Center);
   }
   MO.FDsSystemListCatalogToolBar_onFolderOpenClick = function FDsSystemListCatalogToolBar_onFolderOpenClick(event){
   }
   MO.FDsSystemListCatalogToolBar_onFolderCloseClick = function FDsSystemListCatalogToolBar_onFolderCloseClick(event){
   }
   MO.FDsSystemListCatalogToolBar_construct = function FDsSystemListCatalogToolBar_construct(){
      var o = this;
      o.__base.FDuiToolBar.construct.call(o);
   }
   MO.FDsSystemListCatalogToolBar_dispose = function FDsSystemListCatalogToolBar_dispose(){
      var o = this;
      o.__base.FDuiToolBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsSystemListFrameSet = function FDsSystemListFrameSet(o){
      o = MO.Class.inherits(this, o, FDsSystemDesignFrameSet);
      o._frameName   = 'system.design.list.FrameSet';
      o.onBuilded    = FDsSystemListFrameSet_onBuilded;
      o.construct    = FDsSystemListFrameSet_construct;
      o.selectObject = FDsSystemListFrameSet_selectObject;
      o.load         = FDsSystemListFrameSet_load;
      o.dispose      = FDsSystemListFrameSet_dispose;
      return o;
   }
   MO.FDsSystemListFrameSet_onBuilded = function FDsSystemListFrameSet_onBuilded(event){
      var o = this;
      o.__base.FDsSystemDesignFrameSet.onBuilded.call(o, event);
      o._frameCatalogToolBar._hPanel.className = o.styleName('Toolbar_Ground');
      o._frameCatalogContent._hPanel.className = o.styleName('Catalog_Content');
      o._framePropertyToolBar._hPanel.className = o.styleName('Toolbar_Ground');
      o._framePropertyContent._hPanel.className = o.styleName('Property_Content');
      var spliter = o._catalogSplitter = o.searchControl('catalogSpliter');
      spliter.setAlignCd(EUiAlign.Left);
      spliter.setSizeHtml(o._frameCatalog._hPanel);
      var control = o._catalogToolbar = MO.Class.create(FDsSystemListCatalogToolBar);
      control._workspace = o._workspace;
      control._frameSet = o;
      control.buildDefine(event);
      o._frameCatalogToolBar.push(control);
      var control = o._catalogContent = MO.Class.create(FDsSystemListCatalogContent);
      control._workspace = o._workspace;
      control._frameSet = o;
      control.build(event);
      o._frameCatalogContent.push(control);
      var control = o._propertyToolbar = MO.Class.create(FDsSystemListPropertyToolBar);
      control._workspace = o._workspace;
      control._frameSet = o;
      control.buildDefine(event);
      o._framePropertyToolBar.push(control);
   }
   MO.FDsSystemListFrameSet_construct = function FDsSystemListFrameSet_construct(){
      var o = this;
      o.__base.FDsSystemDesignFrameSet.construct.call(o);
   }
   MO.FDsSystemListFrameSet_selectObject = function FDsSystemListFrameSet_selectObject(typeGroup, propertyFrame, controlName){
      var o = this;
      var activeFrame = o._spaceContent._activeFrame;
      var frames = o._propertyFrames;
      var count = frames.count();
      for(var i = 0; i < count; i++){
         var frame = frames.at(i);
         frame.hide();
      }
      var frame = o.findPropertyFrame(propertyFrame);
      frame.show();
      if(typeGroup == EDuiTreeNodeGroup.Container){
         frame.loadObject(activeFrame, activeFrame);
      }else{
         var activeControl = activeFrame.findComponent(controlName);
         frame.loadObject(activeFrame, activeControl);
         o._spaceContent.selectControl(activeControl);
      }
   }
   MO.FDsSystemListFrameSet_load = function FDsSystemListFrameSet_load(name){
      var o = this;
      if(name){
         o._spaceContent.loadFrame(name);
      }
   }
   MO.FDsSystemListFrameSet_dispose = function FDsSystemListFrameSet_dispose(){
      var o = this;
      o.__base.FDsSystemDesignFrameSet.dispose.call(o);
   }
}
with(MO){
   MO.FDsSystemListMenuBar = function FDsSystemListMenuBar(o){
      o = MO.Class.inherits(this, o, FDuiMenuBar);
      o._frameName      = 'system.design.frame.MenuBar';
      o._controlRefresh = null;
      o.onBuilded       = FDsSystemListMenuBar_onBuilded;
      o.onCreateClick   = FDsSystemListMenuBar_onCreateClick;
      o.onUpdateClick   = FDsSystemListMenuBar_onUpdateClick;
      o.onDeleteClick   = FDsSystemListMenuBar_onDeleteClick;
      return o;
   }
   MO.FDsSystemListMenuBar_onBuilded = function FDsSystemListMenuBar_onBuilded(p){
      var o = this;
      o.__base.FDuiMenuBar.onBuilded.call(o, p);
      o._controlCreate.addClickListener(o, o.onCreateClick);
      o._controlUpdate.addClickListener(o, o.onUpdateClick);
      o._controlDelete.addClickListener(o, o.onDeleteClick);
   }
   MO.FDsSystemListMenuBar_onCreateClick = function FDsSystemListMenuBar_onCreateClick(event){
      var o = this;
   }
   MO.FDsSystemListMenuBar_onUpdateClick = function FDsSystemListMenuBar_onUpdateClick(event){
      var o = this;
      var frame = o._frameSet._spaceContent._activeFrame;
      var xdocument = new TXmlDocument();
      var xroot = xdocument.root();
      xroot.set('action', 'update');
      var xframe = xroot.create('Frame');
      RGuiControl.saveConfig(frame, xframe);
      return RConsole.find(FXmlConsole).sendAsync('/cloud.describe.frame.ws?do=update', xdocument);
   }
   MO.FDsSystemListMenuBar_onDeleteClick = function FDsSystemListMenuBar_onDeleteClick(event){
      var o = this;
   }
}
with(MO){
   MO.FDsSystemListPropertyContent = function FDsSystemListPropertyContent(o){
      o = MO.Class.inherits(this, o, FDsCatalog);
      o.onBuild        = FDsSystemListPropertyContent_onBuild;
      o.onNodeClick    = FDsSystemListPropertyContent_onNodeClick;
      o.construct      = FDsSystemListPropertyContent_construct;
      o.buildTechnique = FDsSystemListPropertyContent_buildTechnique;
      o.buildRegion    = FDsSystemListPropertyContent_buildRegion;
      o.buildMaterial  = FDsSystemListPropertyContent_buildMaterial;
      o.buildDisplay   = FDsSystemListPropertyContent_buildDisplay;
      o.buildSpace     = FDsSystemListPropertyContent_buildSpace;
      o.dispose        = FDsSystemListPropertyContent_dispose;
      return o;
   }
   MO.FDsSystemListPropertyContent_onBuild = function FDsSystemListPropertyContent_onBuild(p){
      var o = this;
      o.__base.FDsCatalog.onBuild.call(o, p);
      o.loadUrl('/cloud.describe.tree.ws?action=query&code=resource.template');
   }
   MO.FDsSystemListPropertyContent_onNodeClick = function FDsSystemListPropertyContent_onNodeClick(t, n){
      var o = this;
      var s = n.dataPropertyGet('linker');
      o.selectObject(s);
   }
   MO.FDsSystemListPropertyContent_construct = function FDsSystemListPropertyContent_construct(){
      var o = this;
      o.__base.FDsCatalog.construct.call(o);
   }
   MO.FDsSystemListPropertyContent_buildTechnique = function FDsSystemListPropertyContent_buildTechnique(n, p){
      var o = this;
      var nt = o.createNode();
      nt.setLabel('Technique');
      nt.setTypeCode('technique');
      nt.dataPropertySet('linker', p);
      n.appendNode(nt);
   }
   MO.FDsSystemListPropertyContent_buildRegion = function FDsSystemListPropertyContent_buildRegion(n, p){
      var o = this;
      var nr = o.createNode();
      nr.setLabel('Region');
      nr.setTypeCode('region');
      nr.dataPropertySet('linker', p);
      n.appendNode(nr);
      var nc = o.createNode();
      nc.setLabel('Camera');
      nc.setTypeCode('camera');
      nc.dataPropertySet('linker', p.camera());
      nr.appendNode(nc);
      var nl = o.createNode();
      nl.setLabel('Light');
      nl.setTypeCode('light');
      nl.dataPropertySet('linker', p.directionalLight());
      nr.appendNode(nl);
   }
   MO.FDsSystemListPropertyContent_buildMaterial = function FDsSystemListPropertyContent_buildMaterial(parentNode, material){
      var o = this;
      var resource = material.resource();
      var node = o.createNode();
      node.setTypeCode('Material');
      node.setLabel(resource.code());
      node.setNote(resource.label());
      node.dataPropertySet('linker', material);
      parentNode.appendNode(node);
   }
   MO.FDsSystemListPropertyContent_buildDisplay = function FDsSystemListPropertyContent_buildDisplay(parentNode, display){
      var o = this;
      var resource = display.resource();
      var node = o.createNode();
      node.setTypeCode('Display');
      node.setLabel(RString.nvl(resource.code(), 'Display'));
      node.setNote(resource.label());
      node.dataPropertySet('linker', display);
      parentNode.appendNode(node);
      var renderables = display.renderables();
      var renderableCount = renderables.count();
      if(renderableCount > 0){
         for(var i = 0; i < renderableCount; i++){
            var renderable = renderables.at(i);
            var renderableResource = renderable.resource();
            var renderableNode = o.createNode();
            renderableNode.setTypeCode('Renderable');
            renderableNode.setLabel(renderableResource.code());
            renderableNode.setNote(renderableResource.label());
            renderableNode.dataPropertySet('linker', renderable);
            node.appendNode(renderableNode);
         }
      }
   }
   MO.FDsSystemListPropertyContent_buildSpace = function FDsSystemListPropertyContent_buildSpace(space){
      var o = this;
      o.clearAllNodes();
      var resource = space.resource();
      var spaceNode = o.createNode();
      spaceNode.setTypeCode('Space');
      spaceNode.setLabel(resource.code());
      spaceNode.setNote(resource.label());
      spaceNode.dataPropertySet('linker', space);
      o.appendNode(spaceNode);
      o.buildTechnique(spaceNode, space.technique())
      o.buildRegion(spaceNode, space.region());
      var materialsNode = o.createNode();
      materialsNode.setTypeCode('Region');
      materialsNode.setLabel('Materials');
      spaceNode.appendNode(materialsNode);
      var materials = space.materials();
      var materialCount = materials.count();
      for(var i = 0; i < materialCount; i++){
         var material = materials.at(i);
         o.buildMaterial(materialsNode, material);
      }
      var displaysNode = o.createNode();
      displaysNode.setTypeCode('Region');
      displaysNode.setLabel('Displays');
      spaceNode.appendNode(displaysNode);
      var displays = space._sprites;
      var displayCount = displays.count();
      for(var i = 0; i < displayCount; i++){
         var display = displays.at(i);
         o.buildDisplay(displaysNode, display);
      }
      spaceNode.click();
   }
   MO.FDsSystemListPropertyContent_dispose = function FDsSystemListPropertyContent_dispose(){
      var o = this;
      o.__base.FDsCatalog.dispose.call(o);
   }
}
with(MO){
   MO.FDsSystemListPropertyToolBar = function FDsSystemListPropertyToolBar(o){
      o = MO.Class.inherits(this, o, FDuiToolBar);
      o._frameName           = 'system.design.frame.PropertyToolBar';
      o._controlInsertButton = null;
      o._controlUpdateButton = null;
      o._controlDeleteButton = null;
      o.onBuilded            = FDsSystemListPropertyToolBar_onBuilded;
      o.onUpdateClick        = FDsSystemListPropertyToolBar_onUpdateClick;
      o.construct            = FDsSystemListPropertyToolBar_construct;
      o.dispose              = FDsSystemListPropertyToolBar_dispose;
      return o;
   }
   MO.FDsSystemListPropertyToolBar_onBuilded = function FDsSystemListPropertyToolBar_onBuilded(p){
      var o = this;
      o.__base.FDuiToolBar.onBuilded.call(o, p);
   }
   MO.FDsSystemListPropertyToolBar_onUpdateClick = function FDsSystemListPropertyToolBar_onUpdateClick(event){
      var o = this;
      var guid = o._workspace._activeProjectGuid;
      window.location = 'Project.wa?do=detail&guid=' + guid;
   }
   MO.FDsSystemListPropertyToolBar_construct = function FDsSystemListPropertyToolBar_construct(){
      var o = this;
      o.__base.FDuiToolBar.construct.call(o);
   }
   MO.FDsSystemListPropertyToolBar_dispose = function FDsSystemListPropertyToolBar_dispose(){
      var o = this;
      o.__base.FDuiToolBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsSystemTreeCatalogContent = function FDsSystemTreeCatalogContent(o){
      o = MO.Class.inherits(this, o, FDuiDataTreeView, MListenerSelected);
      o._activeFrame = null;
      o.onNodeClick  = FDsSystemTreeCatalogContent_onNodeClick;
      o.construct    = FDsSystemTreeCatalogContent_construct;
      o.selectObject = FDsSystemTreeCatalogContent_selectObject;
      o.showObject   = FDsSystemTreeCatalogContent_showObject;
      o.dispose      = FDsSystemTreeCatalogContent_dispose;
      return o;
   }
   MO.FDsSystemTreeCatalogContent_onNodeClick = function FDsSystemTreeCatalogContent_onNodeClick(event){
      var o = this;
      var node = event.node;
      var typeGroup = node.typeGroup();
      var nodeType = node.type();
      var typeCode = node.typeCode();
      var frameName = nodeType.get('property_frame');
      var label = node.label();
      if(typeGroup == EDuiTreeNodeGroup.Container){
         o._frameSet.load(label);
         o._frameSet.selectObject(typeGroup, frameName, null);
      }else if(typeGroup == EDuiTreeNodeGroup.Item){
         o._frameSet.selectObject(typeGroup, frameName, label);
      }
   }
   MO.FDsSystemTreeCatalogContent_construct = function FDsSystemTreeCatalogContent_construct(){
      var o = this;
      o.__base.FDuiDataTreeView.construct.call(o);
      o.loadUrl('/cloud.describe.tree.ws?action=query&code=system.design.tree');
   }
   MO.FDsSystemTreeCatalogContent_selectObject = function FDsSystemTreeCatalogContent_selectObject(item){
      var o = this;
      if(item){
         o.processSelectedListener(item, true);
      }
   }
   MO.FDsSystemTreeCatalogContent_showObject = function FDsSystemTreeCatalogContent_showObject(item){
      var o = this;
      if(MO.Class.isClass(item, FDsSceneRenderable)){
         var renderableNodes = o._renderableNodes;
         var renderableCount = renderableNodes.count();
         for(var i = 0; i < renderableCount; i++){
            var renderableNode = renderableNodes.at(i);
            var renderable = renderableNode.dataPropertyGet('linker');
            if(renderable == item){
               o.processSelectedListener(item, false);
            }
         }
      }
   }
   MO.FDsSystemTreeCatalogContent_dispose = function FDsSystemTreeCatalogContent_dispose(){
      var o = this;
      o._activeFrame = null;
      o.__base.FDuiDataTreeView.dispose.call(o);
   }
}
with(MO){
   MO.FDsSystemTreeCatalogToolBar = function FDsSystemTreeCatalogToolBar(o){
      o = MO.Class.inherits(this, o, FDuiToolBar);
      o._frameName = 'system.design.frame.CatalogToolBar';
      o._controlFolderCreateButton   = null;
      o._controlFolderDeleteButton   = null;
      o._controlFolderPropertyButton = null;
      o._controlFolderOpenButton     = null;
      o._controlFolderCloseButton    = null;
      o._activeNodeGuid              = null;
      o.onBuilded                    = FDsSystemTreeCatalogToolBar_onBuilded;
      o.onFolderCreateClick          = FDsSystemTreeCatalogToolBar_onFolderCreateClick;
      o.onFolderDeleteLoad           = FDsSystemTreeCatalogToolBar_onFolderDeleteLoad;
      o.onFolderDeleteExcute         = FDsSystemTreeCatalogToolBar_onFolderDeleteExcute;
      o.onFolderDeleteClick          = FDsSystemTreeCatalogToolBar_onFolderDeleteClick;
      o.onFolderPropertyClick        = FDsSystemTreeCatalogToolBar_onFolderPropertyClick;
      o.onFolderOpenClick            = FDsSystemTreeCatalogToolBar_onFolderOpenClick;
      o.onFolderCloseClick           = FDsSystemTreeCatalogToolBar_onFolderCloseClick;
      o.construct                    = FDsSystemTreeCatalogToolBar_construct;
      o.dispose                      = FDsSystemTreeCatalogToolBar_dispose;
      return o;
   }
   MO.FDsSystemTreeCatalogToolBar_onBuilded = function FDsSystemTreeCatalogToolBar_onBuilded(p){
      var o = this;
      o.__base.FDuiToolBar.onBuilded.call(o, p);
   }
   MO.FDsSystemTreeCatalogToolBar_onFolderCreateClick = function FDsSystemTreeCatalogToolBar_onFolderCreateClick(event){
      var o = this;
      var parentGuid = null;
      var parentLabel = null;
      var catalog = o._frameSet._catalogContent;
      var node = catalog.focusNode();
      if(node){
         parentGuid = node.guid();
         parentLabel = node.label();
      }
      var dialog = RConsole.find(FDuiWindowConsole).find(FDsResourceFolderDialog);
      dialog._workspace = o._workspace;
      dialog._frameSet = o._frameSet;
      dialog._parentGuid = parentGuid;
      dialog.setNodeParentLabel(parentLabel);
      dialog.setNodeLabel('');
      dialog.switchDataMode(EUiDataMode.Insert);
      dialog.showPosition(EUiPosition.Center);
   }
   MO.FDsSystemTreeCatalogToolBar_onFolderDeleteLoad = function FDsSystemTreeCatalogToolBar_onFolderDeleteLoad(event){
      var o = this;
      RConsole.find(FDuiDesktopConsole).hide();
      var catalog = o._frameSet._catalogContent;
      var guid = o._activeNodeGuid;
      if(guid){
         var node = catalog.findByGuid(guid);
         node.removeSelf();
      }
      o._activeNodeGuid = null;
   }
   MO.FDsSystemTreeCatalogToolBar_onFolderDeleteExcute = function FDsSystemTreeCatalogToolBar_onFolderDeleteExcute(event){
      var o = this;
      if(event.resultCd != EResult.Success){
         return;
      }
      var catalog = o._frameSet._catalogContent;
      var node = catalog.focusNode();
      RConsole.find(FDuiDesktopConsole).showUploading();
      o._activeNodeGuid = node._guid;
      var connection = RConsole.find(FDrResourceConsole).doFolderDelete(node._guid);
      connection.addLoadListener(o, o.onFolderDeleteLoad);
   }
   MO.FDsSystemTreeCatalogToolBar_onFolderDeleteClick = function FDsSystemTreeCatalogToolBar_onFolderDeleteClick(event){
      var o = this;
      var catalog = o._frameSet._catalogContent;
      var node = catalog.focusNode();
      if(!node){
         return RConsole.find(FDuiMessageConsole).showInfo('请选中目录节点后，再点击操作。');
      }
      var dialog = RConsole.find(FDuiMessageConsole).showConfirm('请确认是否删除当前目录？');
      dialog.addResultListener(o, o.onFolderDeleteExcute);
   }
   MO.FDsSystemTreeCatalogToolBar_onFolderPropertyClick = function FDsSystemTreeCatalogToolBar_onFolderPropertyClick(event){
      var o = this;
      var catalog = o._frameSet._catalogContent;
      var node = catalog.focusNode();
      if(!node){
         return RConsole.find(FDuiMessageConsole).showInfo('请选中目录节点后，再点击操作。');
      }
      var parentLabel = null;
      if(node._parent){
         parentLabel = node._parent.label();
      }
      var dialog = RConsole.find(FDuiWindowConsole).find(FDsResourceFolderDialog);
      dialog._workspace = o._workspace;
      dialog._frameSet = o._frameSet;
      dialog._nodeGuid = node._guid;
      dialog.setNodeParentLabel(parentLabel);
      dialog.setNodeLabel(node.label());
      dialog.switchDataMode(EUiDataMode.Update);
      dialog.showPosition(EUiPosition.Center);
   }
   MO.FDsSystemTreeCatalogToolBar_onFolderOpenClick = function FDsSystemTreeCatalogToolBar_onFolderOpenClick(event){
   }
   MO.FDsSystemTreeCatalogToolBar_onFolderCloseClick = function FDsSystemTreeCatalogToolBar_onFolderCloseClick(event){
   }
   MO.FDsSystemTreeCatalogToolBar_construct = function FDsSystemTreeCatalogToolBar_construct(){
      var o = this;
      o.__base.FDuiToolBar.construct.call(o);
   }
   MO.FDsSystemTreeCatalogToolBar_dispose = function FDsSystemTreeCatalogToolBar_dispose(){
      var o = this;
      o.__base.FDuiToolBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsSystemTreeFrameSet = function FDsSystemTreeFrameSet(o){
      o = MO.Class.inherits(this, o, FDsSystemDesignFrameSet);
      o._frameName   = 'system.design.tree.FrameSet';
      o.onBuilded    = FDsSystemTreeFrameSet_onBuilded;
      o.construct    = FDsSystemTreeFrameSet_construct;
      o.selectObject = FDsSystemTreeFrameSet_selectObject;
      o.load         = FDsSystemTreeFrameSet_load;
      o.dispose      = FDsSystemTreeFrameSet_dispose;
      return o;
   }
   MO.FDsSystemTreeFrameSet_onBuilded = function FDsSystemTreeFrameSet_onBuilded(event){
      var o = this;
      o.__base.FDsSystemDesignFrameSet.onBuilded.call(o, event);
      o._frameCatalogToolBar._hPanel.className = o.styleName('Toolbar_Ground');
      o._frameCatalogContent._hPanel.className = o.styleName('Catalog_Content');
      o._framePropertyToolBar._hPanel.className = o.styleName('Toolbar_Ground');
      o._framePropertyContent._hPanel.className = o.styleName('Property_Content');
      var spliter = o._catalogSplitter = o.searchControl('catalogSpliter');
      spliter.setAlignCd(EUiAlign.Left);
      spliter.setSizeHtml(o._frameCatalog._hPanel);
      var control = o._catalogToolbar = MO.Class.create(FDsSystemTreeCatalogToolBar);
      control._workspace = o._workspace;
      control._frameSet = o;
      control.buildDefine(event);
      o._frameCatalogToolBar.push(control);
      var control = o._catalogContent = MO.Class.create(FDsSystemTreeCatalogContent);
      control._workspace = o._workspace;
      control._frameSet = o;
      control.build(event);
      o._frameCatalogContent.push(control);
      var control = o._propertyToolbar = MO.Class.create(FDsSystemTreePropertyToolBar);
      control._workspace = o._workspace;
      control._frameSet = o;
      control.buildDefine(event);
      o._framePropertyToolBar.push(control);
   }
   MO.FDsSystemTreeFrameSet_construct = function FDsSystemTreeFrameSet_construct(){
      var o = this;
      o.__base.FDsSystemDesignFrameSet.construct.call(o);
   }
   MO.FDsSystemTreeFrameSet_selectObject = function FDsSystemTreeFrameSet_selectObject(typeGroup, propertyFrame, controlName){
      var o = this;
      var activeFrame = o._spaceContent._activeFrame;
      var frames = o._propertyFrames;
      var count = frames.count();
      for(var i = 0; i < count; i++){
         var frame = frames.at(i);
         frame.hide();
      }
      var frame = o.findPropertyFrame(propertyFrame);
      frame.show();
      if(typeGroup == EDuiTreeNodeGroup.Container){
         frame.loadObject(activeFrame, activeFrame);
      }else{
         var activeControl = activeFrame.findComponent(controlName);
         frame.loadObject(activeFrame, activeControl);
         o._spaceContent.selectControl(activeControl);
      }
   }
   MO.FDsSystemTreeFrameSet_load = function FDsSystemTreeFrameSet_load(name){
      var o = this;
      if(name){
         o._spaceContent.loadFrame(name);
      }
   }
   MO.FDsSystemTreeFrameSet_dispose = function FDsSystemTreeFrameSet_dispose(){
      var o = this;
      o.__base.FDsSystemDesignFrameSet.dispose.call(o);
   }
}
with(MO){
   MO.FDsSystemTreeMenuBar = function FDsSystemTreeMenuBar(o){
      o = MO.Class.inherits(this, o, FDuiMenuBar);
      o._frameName      = 'system.design.frame.MenuBar';
      o._controlRefresh = null;
      o.onBuilded       = FDsSystemTreeMenuBar_onBuilded;
      o.onCreateClick   = FDsSystemTreeMenuBar_onCreateClick;
      o.onUpdateClick   = FDsSystemTreeMenuBar_onUpdateClick;
      o.onDeleteClick   = FDsSystemTreeMenuBar_onDeleteClick;
      return o;
   }
   MO.FDsSystemTreeMenuBar_onBuilded = function FDsSystemTreeMenuBar_onBuilded(p){
      var o = this;
      o.__base.FDuiMenuBar.onBuilded.call(o, p);
      o._controlCreate.addClickListener(o, o.onCreateClick);
      o._controlUpdate.addClickListener(o, o.onUpdateClick);
      o._controlDelete.addClickListener(o, o.onDeleteClick);
   }
   MO.FDsSystemTreeMenuBar_onCreateClick = function FDsSystemTreeMenuBar_onCreateClick(event){
      var o = this;
   }
   MO.FDsSystemTreeMenuBar_onUpdateClick = function FDsSystemTreeMenuBar_onUpdateClick(event){
      var o = this;
      var frame = o._frameSet._spaceContent._activeFrame;
      var xdocument = new TXmlDocument();
      var xroot = xdocument.root();
      xroot.set('action', 'update');
      var xframe = xroot.create('Frame');
      RGuiControl.saveConfig(frame, xframe);
      return RConsole.find(FXmlConsole).sendAsync('/cloud.describe.frame.ws?do=update', xdocument);
   }
   MO.FDsSystemTreeMenuBar_onDeleteClick = function FDsSystemTreeMenuBar_onDeleteClick(event){
      var o = this;
   }
}
with(MO){
   MO.FDsSystemTreePropertyContent = function FDsSystemTreePropertyContent(o){
      o = MO.Class.inherits(this, o, FDsCatalog);
      o.onBuild        = FDsSystemTreePropertyContent_onBuild;
      o.onNodeClick    = FDsSystemTreePropertyContent_onNodeClick;
      o.construct      = FDsSystemTreePropertyContent_construct;
      o.buildTechnique = FDsSystemTreePropertyContent_buildTechnique;
      o.buildRegion    = FDsSystemTreePropertyContent_buildRegion;
      o.buildMaterial  = FDsSystemTreePropertyContent_buildMaterial;
      o.buildDisplay   = FDsSystemTreePropertyContent_buildDisplay;
      o.buildSpace     = FDsSystemTreePropertyContent_buildSpace;
      o.dispose        = FDsSystemTreePropertyContent_dispose;
      return o;
   }
   MO.FDsSystemTreePropertyContent_onBuild = function FDsSystemTreePropertyContent_onBuild(p){
      var o = this;
      o.__base.FDsCatalog.onBuild.call(o, p);
      o.loadUrl('/cloud.describe.tree.ws?action=query&code=resource.template');
   }
   MO.FDsSystemTreePropertyContent_onNodeClick = function FDsSystemTreePropertyContent_onNodeClick(t, n){
      var o = this;
      var s = n.dataPropertyGet('linker');
      o.selectObject(s);
   }
   MO.FDsSystemTreePropertyContent_construct = function FDsSystemTreePropertyContent_construct(){
      var o = this;
      o.__base.FDsCatalog.construct.call(o);
   }
   MO.FDsSystemTreePropertyContent_buildTechnique = function FDsSystemTreePropertyContent_buildTechnique(n, p){
      var o = this;
      var nt = o.createNode();
      nt.setLabel('Technique');
      nt.setTypeCode('technique');
      nt.dataPropertySet('linker', p);
      n.appendNode(nt);
   }
   MO.FDsSystemTreePropertyContent_buildRegion = function FDsSystemTreePropertyContent_buildRegion(n, p){
      var o = this;
      var nr = o.createNode();
      nr.setLabel('Region');
      nr.setTypeCode('region');
      nr.dataPropertySet('linker', p);
      n.appendNode(nr);
      var nc = o.createNode();
      nc.setLabel('Camera');
      nc.setTypeCode('camera');
      nc.dataPropertySet('linker', p.camera());
      nr.appendNode(nc);
      var nl = o.createNode();
      nl.setLabel('Light');
      nl.setTypeCode('light');
      nl.dataPropertySet('linker', p.directionalLight());
      nr.appendNode(nl);
   }
   MO.FDsSystemTreePropertyContent_buildMaterial = function FDsSystemTreePropertyContent_buildMaterial(parentNode, material){
      var o = this;
      var resource = material.resource();
      var node = o.createNode();
      node.setTypeCode('Material');
      node.setLabel(resource.code());
      node.setNote(resource.label());
      node.dataPropertySet('linker', material);
      parentNode.appendNode(node);
   }
   MO.FDsSystemTreePropertyContent_buildDisplay = function FDsSystemTreePropertyContent_buildDisplay(parentNode, display){
      var o = this;
      var resource = display.resource();
      var node = o.createNode();
      node.setTypeCode('Display');
      node.setLabel(RString.nvl(resource.code(), 'Display'));
      node.setNote(resource.label());
      node.dataPropertySet('linker', display);
      parentNode.appendNode(node);
      var renderables = display.renderables();
      var renderableCount = renderables.count();
      if(renderableCount > 0){
         for(var i = 0; i < renderableCount; i++){
            var renderable = renderables.at(i);
            var renderableResource = renderable.resource();
            var renderableNode = o.createNode();
            renderableNode.setTypeCode('Renderable');
            renderableNode.setLabel(renderableResource.code());
            renderableNode.setNote(renderableResource.label());
            renderableNode.dataPropertySet('linker', renderable);
            node.appendNode(renderableNode);
         }
      }
   }
   MO.FDsSystemTreePropertyContent_buildSpace = function FDsSystemTreePropertyContent_buildSpace(space){
      var o = this;
      o.clearAllNodes();
      var resource = space.resource();
      var spaceNode = o.createNode();
      spaceNode.setTypeCode('Space');
      spaceNode.setLabel(resource.code());
      spaceNode.setNote(resource.label());
      spaceNode.dataPropertySet('linker', space);
      o.appendNode(spaceNode);
      o.buildTechnique(spaceNode, space.technique())
      o.buildRegion(spaceNode, space.region());
      var materialsNode = o.createNode();
      materialsNode.setTypeCode('Region');
      materialsNode.setLabel('Materials');
      spaceNode.appendNode(materialsNode);
      var materials = space.materials();
      var materialCount = materials.count();
      for(var i = 0; i < materialCount; i++){
         var material = materials.at(i);
         o.buildMaterial(materialsNode, material);
      }
      var displaysNode = o.createNode();
      displaysNode.setTypeCode('Region');
      displaysNode.setLabel('Displays');
      spaceNode.appendNode(displaysNode);
      var displays = space._sprites;
      var displayCount = displays.count();
      for(var i = 0; i < displayCount; i++){
         var display = displays.at(i);
         o.buildDisplay(displaysNode, display);
      }
      spaceNode.click();
   }
   MO.FDsSystemTreePropertyContent_dispose = function FDsSystemTreePropertyContent_dispose(){
      var o = this;
      o.__base.FDsCatalog.dispose.call(o);
   }
}
with(MO){
   MO.FDsSystemTreePropertyToolBar = function FDsSystemTreePropertyToolBar(o){
      o = MO.Class.inherits(this, o, FDuiToolBar);
      o._frameName           = 'system.design.frame.PropertyToolBar';
      o._controlInsertButton = null;
      o._controlUpdateButton = null;
      o._controlDeleteButton = null;
      o.onBuilded            = FDsSystemTreePropertyToolBar_onBuilded;
      o.onUpdateClick        = FDsSystemTreePropertyToolBar_onUpdateClick;
      o.construct            = FDsSystemTreePropertyToolBar_construct;
      o.dispose              = FDsSystemTreePropertyToolBar_dispose;
      return o;
   }
   MO.FDsSystemTreePropertyToolBar_onBuilded = function FDsSystemTreePropertyToolBar_onBuilded(p){
      var o = this;
      o.__base.FDuiToolBar.onBuilded.call(o, p);
   }
   MO.FDsSystemTreePropertyToolBar_onUpdateClick = function FDsSystemTreePropertyToolBar_onUpdateClick(event){
      var o = this;
      var guid = o._workspace._activeProjectGuid;
      window.location = 'Project.wa?do=detail&guid=' + guid;
   }
   MO.FDsSystemTreePropertyToolBar_construct = function FDsSystemTreePropertyToolBar_construct(){
      var o = this;
      o.__base.FDuiToolBar.construct.call(o);
   }
   MO.FDsSystemTreePropertyToolBar_dispose = function FDsSystemTreePropertyToolBar_dispose(){
      var o = this;
      o.__base.FDuiToolBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsSystemFrameBarProperty = function FDsSystemFrameBarProperty(o){
      o = MO.Class.inherits(this, o, FDsSystemFrameControlProperty);
      o._activeSpace      = null;
      o._activeRenderable = null;
      o.onBuilded         = FDsSystemFrameBarProperty_onBuilded;
      o.onDataChanged     = FDsSystemFrameBarProperty_onDataChanged;
      o.construct         = FDsSystemFrameBarProperty_construct;
      o.loadObject        = FDsSystemFrameBarProperty_loadObject;
      o.dispose           = FDsSystemFrameBarProperty_dispose;
      return o;
   }
   MO.FDsSystemFrameBarProperty_onBuilded = function FDsSystemFrameBarProperty_onBuilded(p){
      var o = this;
      o.__base.FDsSystemFrameControlProperty.onBuilded.call(o, p);
   }
   MO.FDsSystemFrameBarProperty_onDataChanged = function FDsSystemFrameBarProperty_onDataChanged(p){
      var o = this;
      o.__base.FDsSystemFrameControlProperty.onDataChanged.call(o, p);
   }
   MO.FDsSystemFrameBarProperty_construct = function FDsSystemFrameBarProperty_construct(){
      var o = this;
      o.__base.FDsSystemFrameControlProperty.construct.call(o);
   }
   MO.FDsSystemFrameBarProperty_loadObject = function FDsSystemFrameBarProperty_loadObject(frame, control){
      var o = this;
      o.__base.FDsSystemFrameControlProperty.loadObject.call(o, frame, control);
   }
   MO.FDsSystemFrameBarProperty_dispose = function FDsSystemFrameBarProperty_dispose(){
      var o = this;
      o.__base.FDsSystemFrameControlProperty.dispose.call(o);
   }
}
with(MO){
   MO.FDsSystemFrameButtonProperty = function FDsSystemFrameButtonProperty(o){
      o = MO.Class.inherits(this, o, FDsSystemFrameControlProperty);
      o._activeSpace      = null;
      o._activeRenderable = null;
      o.onBuilded         = FDsSystemFrameButtonProperty_onBuilded;
      o.onDataChanged     = FDsSystemFrameButtonProperty_onDataChanged;
      o.construct         = FDsSystemFrameButtonProperty_construct;
      o.loadObject        = FDsSystemFrameButtonProperty_loadObject;
      o.dispose           = FDsSystemFrameButtonProperty_dispose;
      return o;
   }
   MO.FDsSystemFrameButtonProperty_onBuilded = function FDsSystemFrameButtonProperty_onBuilded(p){
      var o = this;
      o.__base.FDsSystemFrameControlProperty.onBuilded.call(o, p);
   }
   MO.FDsSystemFrameButtonProperty_onDataChanged = function FDsSystemFrameButtonProperty_onDataChanged(p){
      var o = this;
      o.__base.FDsSystemFrameControlProperty.onDataChanged.call(o, p);
   }
   MO.FDsSystemFrameButtonProperty_construct = function FDsSystemFrameButtonProperty_construct(){
      var o = this;
      o.__base.FDsSystemFrameControlProperty.construct.call(o);
   }
   MO.FDsSystemFrameButtonProperty_loadObject = function FDsSystemFrameButtonProperty_loadObject(frame, control){
      var o = this;
      o.__base.FDsSystemFrameControlProperty.loadObject.call(o, frame, control);
   }
   MO.FDsSystemFrameButtonProperty_dispose = function FDsSystemFrameButtonProperty_dispose(){
      var o = this;
      o.__base.FDsSystemFrameControlProperty.dispose.call(o);
   }
}
with(MO){
   MO.FDsSystemFrameCatalogContent = function FDsSystemFrameCatalogContent(o){
      o = MO.Class.inherits(this, o, FDuiDataTreeView, MListenerSelected);
      o._activeFrame = null;
      o.onNodeClick  = FDsSystemFrameCatalogContent_onNodeClick;
      o.construct    = FDsSystemFrameCatalogContent_construct;
      o.selectObject = FDsSystemFrameCatalogContent_selectObject;
      o.showObject   = FDsSystemFrameCatalogContent_showObject;
      o.dispose      = FDsSystemFrameCatalogContent_dispose;
      return o;
   }
   MO.FDsSystemFrameCatalogContent_onNodeClick = function FDsSystemFrameCatalogContent_onNodeClick(event){
      var o = this;
      var node = event.node;
      var typeGroup = node.typeGroup();
      var nodeType = node.type();
      var typeCode = node.typeCode();
      var frameName = nodeType.get('property_frame');
      var label = node.label();
      if(typeGroup == EDuiTreeNodeGroup.Container){
         o._frameSet.load(label);
         o._frameSet.selectObject(typeGroup, frameName, null);
      }else if(typeGroup == EDuiTreeNodeGroup.Item){
         o._frameSet.selectObject(typeGroup, frameName, label);
      }
   }
   MO.FDsSystemFrameCatalogContent_construct = function FDsSystemFrameCatalogContent_construct(){
      var o = this;
      o.__base.FDuiDataTreeView.construct.call(o);
      o.loadUrl('/cloud.describe.tree.ws?action=query&code=system.design.frame');
   }
   MO.FDsSystemFrameCatalogContent_selectObject = function FDsSystemFrameCatalogContent_selectObject(item){
      var o = this;
      if(item){
         o.processSelectedListener(item, true);
      }
   }
   MO.FDsSystemFrameCatalogContent_showObject = function FDsSystemFrameCatalogContent_showObject(item){
      var o = this;
      if(MO.Class.isClass(item, FDsSceneRenderable)){
         var renderableNodes = o._renderableNodes;
         var renderableCount = renderableNodes.count();
         for(var i = 0; i < renderableCount; i++){
            var renderableNode = renderableNodes.at(i);
            var renderable = renderableNode.dataPropertyGet('linker');
            if(renderable == item){
               o.processSelectedListener(item, false);
            }
         }
      }
   }
   MO.FDsSystemFrameCatalogContent_dispose = function FDsSystemFrameCatalogContent_dispose(){
      var o = this;
      o._activeFrame = null;
      o.__base.FDuiDataTreeView.dispose.call(o);
   }
}
with(MO){
   MO.FDsSystemFrameCatalogToolBar = function FDsSystemFrameCatalogToolBar(o){
      o = MO.Class.inherits(this, o, FDuiToolBar);
      o._frameName = 'system.design.frame.CatalogToolBar';
      o._controlFolderCreateButton   = null;
      o._controlFolderDeleteButton   = null;
      o._controlFolderPropertyButton = null;
      o._controlFolderOpenButton     = null;
      o._controlFolderCloseButton    = null;
      o._activeNodeGuid              = null;
      o.onBuilded                    = FDsSystemFrameCatalogToolBar_onBuilded;
      o.onFolderCreateClick          = FDsSystemFrameCatalogToolBar_onFolderCreateClick;
      o.onFolderDeleteLoad           = FDsSystemFrameCatalogToolBar_onFolderDeleteLoad;
      o.onFolderDeleteExcute         = FDsSystemFrameCatalogToolBar_onFolderDeleteExcute;
      o.onFolderDeleteClick          = FDsSystemFrameCatalogToolBar_onFolderDeleteClick;
      o.onFolderPropertyClick        = FDsSystemFrameCatalogToolBar_onFolderPropertyClick;
      o.onFolderOpenClick            = FDsSystemFrameCatalogToolBar_onFolderOpenClick;
      o.onFolderCloseClick           = FDsSystemFrameCatalogToolBar_onFolderCloseClick;
      o.construct                    = FDsSystemFrameCatalogToolBar_construct;
      o.dispose                      = FDsSystemFrameCatalogToolBar_dispose;
      return o;
   }
   MO.FDsSystemFrameCatalogToolBar_onBuilded = function FDsSystemFrameCatalogToolBar_onBuilded(p){
      var o = this;
      o.__base.FDuiToolBar.onBuilded.call(o, p);
   }
   MO.FDsSystemFrameCatalogToolBar_onFolderCreateClick = function FDsSystemFrameCatalogToolBar_onFolderCreateClick(event){
      var o = this;
      var parentGuid = null;
      var parentLabel = null;
      var catalog = o._frameSet._catalogContent;
      var node = catalog.focusNode();
      if(node){
         parentGuid = node.guid();
         parentLabel = node.label();
      }
      var dialog = RConsole.find(FDuiWindowConsole).find(FDsResourceFolderDialog);
      dialog._workspace = o._workspace;
      dialog._frameSet = o._frameSet;
      dialog._parentGuid = parentGuid;
      dialog.setNodeParentLabel(parentLabel);
      dialog.setNodeLabel('');
      dialog.switchDataMode(EUiDataMode.Insert);
      dialog.showPosition(EUiPosition.Center);
   }
   MO.FDsSystemFrameCatalogToolBar_onFolderDeleteLoad = function FDsSystemFrameCatalogToolBar_onFolderDeleteLoad(event){
      var o = this;
      RConsole.find(FDuiDesktopConsole).hide();
      var catalog = o._frameSet._catalogContent;
      var guid = o._activeNodeGuid;
      if(guid){
         var node = catalog.findByGuid(guid);
         node.removeSelf();
      }
      o._activeNodeGuid = null;
   }
   MO.FDsSystemFrameCatalogToolBar_onFolderDeleteExcute = function FDsSystemFrameCatalogToolBar_onFolderDeleteExcute(event){
      var o = this;
      if(event.resultCd != EResult.Success){
         return;
      }
      var catalog = o._frameSet._catalogContent;
      var node = catalog.focusNode();
      RConsole.find(FDuiDesktopConsole).showUploading();
      o._activeNodeGuid = node._guid;
      var connection = RConsole.find(FDrResourceConsole).doFolderDelete(node._guid);
      connection.addLoadListener(o, o.onFolderDeleteLoad);
   }
   MO.FDsSystemFrameCatalogToolBar_onFolderDeleteClick = function FDsSystemFrameCatalogToolBar_onFolderDeleteClick(event){
      var o = this;
      var catalog = o._frameSet._catalogContent;
      var node = catalog.focusNode();
      if(!node){
         return RConsole.find(FDuiMessageConsole).showInfo('请选中目录节点后，再点击操作。');
      }
      var dialog = RConsole.find(FDuiMessageConsole).showConfirm('请确认是否删除当前目录？');
      dialog.addResultListener(o, o.onFolderDeleteExcute);
   }
   MO.FDsSystemFrameCatalogToolBar_onFolderPropertyClick = function FDsSystemFrameCatalogToolBar_onFolderPropertyClick(event){
      var o = this;
      var catalog = o._frameSet._catalogContent;
      var node = catalog.focusNode();
      if(!node){
         return RConsole.find(FDuiMessageConsole).showInfo('请选中目录节点后，再点击操作。');
      }
      var parentLabel = null;
      if(node._parent){
         parentLabel = node._parent.label();
      }
      var dialog = RConsole.find(FDuiWindowConsole).find(FDsResourceFolderDialog);
      dialog._workspace = o._workspace;
      dialog._frameSet = o._frameSet;
      dialog._nodeGuid = node._guid;
      dialog.setNodeParentLabel(parentLabel);
      dialog.setNodeLabel(node.label());
      dialog.switchDataMode(EUiDataMode.Update);
      dialog.showPosition(EUiPosition.Center);
   }
   MO.FDsSystemFrameCatalogToolBar_onFolderOpenClick = function FDsSystemFrameCatalogToolBar_onFolderOpenClick(event){
   }
   MO.FDsSystemFrameCatalogToolBar_onFolderCloseClick = function FDsSystemFrameCatalogToolBar_onFolderCloseClick(event){
   }
   MO.FDsSystemFrameCatalogToolBar_construct = function FDsSystemFrameCatalogToolBar_construct(){
      var o = this;
      o.__base.FDuiToolBar.construct.call(o);
   }
   MO.FDsSystemFrameCatalogToolBar_dispose = function FDsSystemFrameCatalogToolBar_dispose(){
      var o = this;
      o.__base.FDuiToolBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsSystemFrameComponentProperty = function FDsSystemFrameComponentProperty(o){
      o = MO.Class.inherits(this, o, FDuiForm);
      o._activeFrame     = null;
      o._activeComponent = null;
      o.onBuilded        = FDsSystemFrameComponentProperty_onBuilded;
      o.onDataChanged    = FDsSystemFrameComponentProperty_onDataChanged;
      o.construct        = FDsSystemFrameComponentProperty_construct;
      o.loadObject       = FDsSystemFrameComponentProperty_loadObject;
      o.dispose          = FDsSystemFrameComponentProperty_dispose;
      return o;
   }
   MO.FDsSystemFrameComponentProperty_onBuilded = function FDsSystemFrameComponentProperty_onBuilded(p){
      var o = this;
      o.__base.FDuiForm.onBuilded.call(o, p);
   }
   MO.FDsSystemFrameComponentProperty_onDataChanged = function FDsSystemFrameComponentProperty_onDataChanged(event){
      var o  = this;
      var frame = o._activeFrame;
      var control = o._activeControl;
      var size = o._controlSize.get();
      control.size().set(size.x, size.y);
      frame.build();
   }
   MO.FDsSystemFrameComponentProperty_construct = function FDsSystemFrameComponentProperty_construct(){
      var o = this;
      o.__base.FDuiForm.construct.call(o);
   }
   MO.FDsSystemFrameComponentProperty_loadObject = function FDsSystemFrameComponentProperty_loadObject(frame, component){
      var o = this;
      o._activeFrame = frame;
      o._activeComponent = component;
      o._controlType.set(RClass.name(component));
      o._controlName.set(component.name());
      o._controlLabel.set(component.label());
   }
   MO.FDsSystemFrameComponentProperty_dispose = function FDsSystemFrameComponentProperty_dispose(){
      var o = this;
      o.__base.FDuiForm.dispose.call(o);
   }
}
with(MO){
   MO.FDsSystemFrameControlProperty = function FDsSystemFrameControlProperty(o){
      o = MO.Class.inherits(this, o, FDsSystemFrameComponentProperty);
      o._activeFrame   = null;
      o._activeControl = null;
      o.onBuilded         = FDsSystemFrameControlProperty_onBuilded;
      o.onDataChanged     = FDsSystemFrameControlProperty_onDataChanged;
      o.construct         = FDsSystemFrameControlProperty_construct;
      o.loadObject        = FDsSystemFrameControlProperty_loadObject;
      o.dispose           = FDsSystemFrameControlProperty_dispose;
      return o;
   }
   MO.FDsSystemFrameControlProperty_onBuilded = function FDsSystemFrameControlProperty_onBuilded(event){
      var o = this;
      o.__base.FDsSystemFrameComponentProperty.onBuilded.call(o, event);
      o._controlSize.addDataChangedListener(o, o.onDataChanged);
   }
   MO.FDsSystemFrameControlProperty_onDataChanged = function FDsSystemFrameControlProperty_onDataChanged(event){
      var o  = this;
      o.__base.FDsSystemFrameComponentProperty.onDataChanged.call(o, event);
      var frame = o._activeFrame;
      var control = o._activeControl;
      var size = o._controlSize.get();
      control.size().set(size.x, size.y);
      frame.build();
   }
   MO.FDsSystemFrameControlProperty_construct = function FDsSystemFrameControlProperty_construct(){
      var o = this;
      o.__base.FDsSystemFrameComponentProperty.construct.call(o);
   }
   MO.FDsSystemFrameControlProperty_loadObject = function FDsSystemFrameControlProperty_loadObject(frame, control){
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
   MO.FDsSystemFrameControlProperty_dispose = function FDsSystemFrameControlProperty_dispose(){
      var o = this;
      o.__base.FDsSystemFrameComponentProperty.dispose.call(o);
   }
}
MO.FDsSystemFrameFrameSet = function FDsSystemFrameFrameSet(o){
   o = MO.Class.inherits(this, o, MO.FDsSystemDesignFrameSet);
   o._frameName   = 'system.design.frame.FrameSet';
   o.onBuilded    = MO.FDsSystemFrameFrameSet_onBuilded;
   o.construct    = MO.FDsSystemFrameFrameSet_construct;
   o.selectObject = MO.FDsSystemFrameFrameSet_selectObject;
   o.load         = MO.FDsSystemFrameFrameSet_load;
   o.dispose      = MO.FDsSystemFrameFrameSet_dispose;
   return o;
}
MO.FDsSystemFrameFrameSet_onBuilded = function FDsSystemFrameFrameSet_onBuilded(event){
   var o = this;
   o.__base.FDsSystemDesignFrameSet.onBuilded.call(o, event);
   o._frameCatalogToolBar._hPanel.className = o.styleName('Toolbar_Ground');
   o._frameCatalogContent._hPanel.className = o.styleName('Catalog_Content');
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
   var control = o._catalogToolbar = MO.Class.create(MO.FDsSystemFrameCatalogToolBar);
   control._workspace = o._workspace;
   control._frameSet = o;
   control.buildDefine(event);
   o._frameCatalogToolBar.push(control);
   var control = o._catalogContent = MO.Class.create(MO.FDsSystemFrameCatalogContent);
   control._workspace = o._workspace;
   control._frameSet = o;
   control.build(event);
   o._frameCatalogContent.push(control);
   var control = o._spaceToolBar = MO.Class.create(MO.FDsSystemFrameSpaceToolBar);
   control._workspace = o._workspace;
   control._frameSet = o;
   control.buildDefine(event);
   o._frameSpaceToolBar.push(control);
   var control = o._spaceContent = MO.Class.create(MO.FDsSystemFrameSpaceContent);
   control._workspace = o._workspace;
   control._frameSet = o;
   control.build(o._frameSpaceContent._hPanel);
   o._frameSpaceContent.push(control);
   var control = o._propertyToolbar = MO.Class.create(MO.FDsSystemFramePropertyToolBar);
   control._workspace = o._workspace;
   control._frameSet = o;
   control.buildDefine(event);
   o._framePropertyToolBar.push(control);
}
MO.FDsSystemFrameFrameSet_construct = function FDsSystemFrameFrameSet_construct(){
   var o = this;
   o.__base.FDsSystemDesignFrameSet.construct.call(o);
}
MO.FDsSystemFrameFrameSet_selectObject = function FDsSystemFrameFrameSet_selectObject(typeGroup, propertyFrame, controlName){
   var o = this;
   var activeFrame = o._spaceContent._activeFrame;
   var frames = o._propertyFrames;
   var count = frames.count();
   for(var i = 0; i < count; i++){
      var frame = frames.at(i);
      frame.hide();
   }
   var frame = o.findPropertyFrame(propertyFrame);
   frame.show();
   if(typeGroup == MO.EDuiTreeNodeGroup.Container){
      frame.loadObject(activeFrame, activeFrame);
   }else{
      var activeControl = activeFrame.findComponent(controlName);
      frame.loadObject(activeFrame, activeControl);
      o._spaceContent.selectControl(activeControl);
   }
}
MO.FDsSystemFrameFrameSet_load = function FDsSystemFrameFrameSet_load(name){
   var o = this;
   if(name){
      o._spaceContent.loadFrame(name);
   }
}
MO.FDsSystemFrameFrameSet_dispose = function FDsSystemFrameFrameSet_dispose(){
   var o = this;
   o.__base.FDsSystemDesignFrameSet.dispose.call(o);
}
with(MO){
   MO.FDsSystemFrameMenuBar = function FDsSystemFrameMenuBar(o){
      o = MO.Class.inherits(this, o, FDuiMenuBar);
      o._frameName      = 'system.design.frame.MenuBar';
      o._controlRefresh = null;
      o.onBuilded       = FDsSystemFrameMenuBar_onBuilded;
      o.onCreateClick   = FDsSystemFrameMenuBar_onCreateClick;
      o.onUpdateClick   = FDsSystemFrameMenuBar_onUpdateClick;
      o.onDeleteClick   = FDsSystemFrameMenuBar_onDeleteClick;
      return o;
   }
   MO.FDsSystemFrameMenuBar_onBuilded = function FDsSystemFrameMenuBar_onBuilded(p){
      var o = this;
      o.__base.FDuiMenuBar.onBuilded.call(o, p);
      o._controlCreate.addClickListener(o, o.onCreateClick);
      o._controlUpdate.addClickListener(o, o.onUpdateClick);
      o._controlDelete.addClickListener(o, o.onDeleteClick);
   }
   MO.FDsSystemFrameMenuBar_onCreateClick = function FDsSystemFrameMenuBar_onCreateClick(event){
      var o = this;
   }
   MO.FDsSystemFrameMenuBar_onUpdateClick = function FDsSystemFrameMenuBar_onUpdateClick(event){
      var o = this;
      var frame = o._frameSet._spaceContent._activeFrame;
      var xdocument = new TXmlDocument();
      var xroot = xdocument.root();
      xroot.set('action', 'update');
      var xframe = xroot.create('Frame');
      RGuiControl.saveConfig(frame, xframe);
      return RConsole.find(FXmlConsole).sendAsync('/cloud.describe.frame.ws?do=update', xdocument);
   }
   MO.FDsSystemFrameMenuBar_onDeleteClick = function FDsSystemFrameMenuBar_onDeleteClick(event){
      var o = this;
   }
}
with(MO){
   MO.FDsSystemFramePictureProperty = function FDsSystemFramePictureProperty(o){
      o = MO.Class.inherits(this, o, FDsSystemFrameControlProperty);
      o._activeSpace      = null;
      o._activeRenderable = null;
      o.onBuilded         = FDsSystemFramePictureProperty_onBuilded;
      o.onDataChanged     = FDsSystemFramePictureProperty_onDataChanged;
      o.construct         = FDsSystemFramePictureProperty_construct;
      o.loadObject        = FDsSystemFramePictureProperty_loadObject;
      o.dispose           = FDsSystemFramePictureProperty_dispose;
      return o;
   }
   MO.FDsSystemFramePictureProperty_onBuilded = function FDsSystemFramePictureProperty_onBuilded(p){
      var o = this;
      o.__base.FDsSystemFrameControlProperty.onBuilded.call(o, p);
   }
   MO.FDsSystemFramePictureProperty_onDataChanged = function FDsSystemFramePictureProperty_onDataChanged(p){
      var o = this;
      o.__base.FDsSystemFrameControlProperty.onDataChanged.call(o, p);
   }
   MO.FDsSystemFramePictureProperty_construct = function FDsSystemFramePictureProperty_construct(){
      var o = this;
      o.__base.FDsSystemFrameControlProperty.construct.call(o);
   }
   MO.FDsSystemFramePictureProperty_loadObject = function FDsSystemFramePictureProperty_loadObject(frame, control){
      var o = this;
      o.__base.FDsSystemFrameControlProperty.loadObject.call(o, frame, control);
   }
   MO.FDsSystemFramePictureProperty_dispose = function FDsSystemFramePictureProperty_dispose(){
      var o = this;
      o.__base.FDsSystemFrameControlProperty.dispose.call(o);
   }
}
with(MO){
   MO.FDsSystemFramePropertyContent = function FDsSystemFramePropertyContent(o){
      o = MO.Class.inherits(this, o, FDsCatalog);
      o.onBuild        = FDsSystemFramePropertyContent_onBuild;
      o.onNodeClick    = FDsSystemFramePropertyContent_onNodeClick;
      o.construct      = FDsSystemFramePropertyContent_construct;
      o.buildTechnique = FDsSystemFramePropertyContent_buildTechnique;
      o.buildRegion    = FDsSystemFramePropertyContent_buildRegion;
      o.buildMaterial  = FDsSystemFramePropertyContent_buildMaterial;
      o.buildDisplay   = FDsSystemFramePropertyContent_buildDisplay;
      o.buildSpace     = FDsSystemFramePropertyContent_buildSpace;
      o.dispose        = FDsSystemFramePropertyContent_dispose;
      return o;
   }
   MO.FDsSystemFramePropertyContent_onBuild = function FDsSystemFramePropertyContent_onBuild(p){
      var o = this;
      o.__base.FDsCatalog.onBuild.call(o, p);
      o.loadUrl('/cloud.describe.tree.ws?action=query&code=resource.template');
   }
   MO.FDsSystemFramePropertyContent_onNodeClick = function FDsSystemFramePropertyContent_onNodeClick(t, n){
      var o = this;
      var s = n.dataPropertyGet('linker');
      o.selectObject(s);
   }
   MO.FDsSystemFramePropertyContent_construct = function FDsSystemFramePropertyContent_construct(){
      var o = this;
      o.__base.FDsCatalog.construct.call(o);
   }
   MO.FDsSystemFramePropertyContent_buildTechnique = function FDsSystemFramePropertyContent_buildTechnique(n, p){
      var o = this;
      var nt = o.createNode();
      nt.setLabel('Technique');
      nt.setTypeCode('technique');
      nt.dataPropertySet('linker', p);
      n.appendNode(nt);
   }
   MO.FDsSystemFramePropertyContent_buildRegion = function FDsSystemFramePropertyContent_buildRegion(n, p){
      var o = this;
      var nr = o.createNode();
      nr.setLabel('Region');
      nr.setTypeCode('region');
      nr.dataPropertySet('linker', p);
      n.appendNode(nr);
      var nc = o.createNode();
      nc.setLabel('Camera');
      nc.setTypeCode('camera');
      nc.dataPropertySet('linker', p.camera());
      nr.appendNode(nc);
      var nl = o.createNode();
      nl.setLabel('Light');
      nl.setTypeCode('light');
      nl.dataPropertySet('linker', p.directionalLight());
      nr.appendNode(nl);
   }
   MO.FDsSystemFramePropertyContent_buildMaterial = function FDsSystemFramePropertyContent_buildMaterial(parentNode, material){
      var o = this;
      var resource = material.resource();
      var node = o.createNode();
      node.setTypeCode('Material');
      node.setLabel(resource.code());
      node.setNote(resource.label());
      node.dataPropertySet('linker', material);
      parentNode.appendNode(node);
   }
   MO.FDsSystemFramePropertyContent_buildDisplay = function FDsSystemFramePropertyContent_buildDisplay(parentNode, display){
      var o = this;
      var resource = display.resource();
      var node = o.createNode();
      node.setTypeCode('Display');
      node.setLabel(RString.nvl(resource.code(), 'Display'));
      node.setNote(resource.label());
      node.dataPropertySet('linker', display);
      parentNode.appendNode(node);
      var renderables = display.renderables();
      var renderableCount = renderables.count();
      if(renderableCount > 0){
         for(var i = 0; i < renderableCount; i++){
            var renderable = renderables.at(i);
            var renderableResource = renderable.resource();
            var renderableNode = o.createNode();
            renderableNode.setTypeCode('Renderable');
            renderableNode.setLabel(renderableResource.code());
            renderableNode.setNote(renderableResource.label());
            renderableNode.dataPropertySet('linker', renderable);
            node.appendNode(renderableNode);
         }
      }
   }
   MO.FDsSystemFramePropertyContent_buildSpace = function FDsSystemFramePropertyContent_buildSpace(space){
      var o = this;
      o.clearAllNodes();
      var resource = space.resource();
      var spaceNode = o.createNode();
      spaceNode.setTypeCode('Space');
      spaceNode.setLabel(resource.code());
      spaceNode.setNote(resource.label());
      spaceNode.dataPropertySet('linker', space);
      o.appendNode(spaceNode);
      o.buildTechnique(spaceNode, space.technique())
      o.buildRegion(spaceNode, space.region());
      var materialsNode = o.createNode();
      materialsNode.setTypeCode('Region');
      materialsNode.setLabel('Materials');
      spaceNode.appendNode(materialsNode);
      var materials = space.materials();
      var materialCount = materials.count();
      for(var i = 0; i < materialCount; i++){
         var material = materials.at(i);
         o.buildMaterial(materialsNode, material);
      }
      var displaysNode = o.createNode();
      displaysNode.setTypeCode('Region');
      displaysNode.setLabel('Displays');
      spaceNode.appendNode(displaysNode);
      var displays = space._sprites;
      var displayCount = displays.count();
      for(var i = 0; i < displayCount; i++){
         var display = displays.at(i);
         o.buildDisplay(displaysNode, display);
      }
      spaceNode.click();
   }
   MO.FDsSystemFramePropertyContent_dispose = function FDsSystemFramePropertyContent_dispose(){
      var o = this;
      o.__base.FDsCatalog.dispose.call(o);
   }
}
with(MO){
   MO.FDsSystemFramePropertyToolBar = function FDsSystemFramePropertyToolBar(o){
      o = MO.Class.inherits(this, o, FDuiToolBar);
      o._frameName           = 'system.design.frame.PropertyToolBar';
      o._controlInsertButton = null;
      o._controlUpdateButton = null;
      o._controlDeleteButton = null;
      o.onBuilded            = FDsSystemFramePropertyToolBar_onBuilded;
      o.onUpdateClick        = FDsSystemFramePropertyToolBar_onUpdateClick;
      o.construct            = FDsSystemFramePropertyToolBar_construct;
      o.dispose              = FDsSystemFramePropertyToolBar_dispose;
      return o;
   }
   MO.FDsSystemFramePropertyToolBar_onBuilded = function FDsSystemFramePropertyToolBar_onBuilded(p){
      var o = this;
      o.__base.FDuiToolBar.onBuilded.call(o, p);
   }
   MO.FDsSystemFramePropertyToolBar_onUpdateClick = function FDsSystemFramePropertyToolBar_onUpdateClick(event){
      var o = this;
      var guid = o._workspace._activeProjectGuid;
      window.location = 'Project.wa?do=detail&guid=' + guid;
   }
   MO.FDsSystemFramePropertyToolBar_construct = function FDsSystemFramePropertyToolBar_construct(){
      var o = this;
      o.__base.FDuiToolBar.construct.call(o);
   }
   MO.FDsSystemFramePropertyToolBar_dispose = function FDsSystemFramePropertyToolBar_dispose(){
      var o = this;
      o.__base.FDuiToolBar.dispose.call(o);
   }
}
MO.FDsSystemFrameSpaceContent = function FDsSystemFrameSpaceContent(o){
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
   o.onEnterFrame        = MO.FDsSystemFrameSpaceContent_onEnterFrame;
   o.onMouseCaptureStart = MO.FDsSystemFrameSpaceContent_onMouseCaptureStart;
   o.onMouseCapture      = MO.FDsSystemFrameSpaceContent_onMouseCapture;
   o.onMouseCaptureStop  = MO.FDsSystemFrameSpaceContent_onMouseCaptureStop;
   o.onResize            = MO.FDsSystemFrameSpaceContent_onResize;
   o.onProcess           = MO.FDsSystemFrameSpaceContent_onProcess;
   o.onKeyDown           = MO.FDsSystemFrameSpaceContent_onKeyDown;
   o.oeResize            = MO.FDsSystemFrameSpaceContent_oeResize;
   o.oeFrame             = MO.FDsSystemFrameSpaceContent_oeFrame;
   o.construct           = MO.FDsSystemFrameSpaceContent_construct;
   o.build               = MO.FDsSystemFrameSpaceContent_build;
   o.controlAction       = MO.FDsSystemFrameSpaceContent_controlAction;
   o.selectControl       = MO.FDsSystemFrameSpaceContent_selectControl;
   o.loadFrame           = MO.FDsSystemFrameSpaceContent_loadFrame;
   o.dispose             = MO.FDsSystemFrameSpaceContent_dispose;
   return o;
}
MO.FDsSystemFrameSpaceContent_onEnterFrame = function FDsSystemFrameSpaceContent_onEnterFrame(){
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
MO.FDsSystemFrameSpaceContent_onMouseCaptureStart = function FDsSystemFrameSpaceContent_onMouseCaptureStart(p){
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
MO.FDsSystemFrameSpaceContent_onMouseCapture = function FDsSystemFrameSpaceContent_onMouseCapture(p){
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
MO.FDsSystemFrameSpaceContent_onMouseCaptureStop = function FDsSystemFrameSpaceContent_onMouseCaptureStop(p){
}
MO.FDsSystemFrameSpaceContent_onResize = function FDsSystemFrameSpaceContent_onResize(){
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
MO.FDsSystemFrameSpaceContent_onProcess = function FDsSystemFrameSpaceContent_onProcess(event){
   var o = this;
   var frame = o._activeFrame;
   if(frame){
      frame.psUpdate();
   }
}
MO.FDsSystemFrameSpaceContent_controlAction = function FDsSystemFrameSpaceContent_controlAction(keyCode, control){
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
MO.FDsSystemFrameSpaceContent_onKeyDown = function FDsSystemFrameSpaceContent_onKeyDown(event){
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
MO.FDsSystemFrameSpaceContent_oeResize = function FDsSystemFrameSpaceContent_oeResize(event){
   var o = this;
   o.__base.FDuiControl.oeResize.call(o, event);
   return MO.EEventStatus.Stop;
}
MO.FDsSystemFrameSpaceContent_oeFrame = function FDsSystemFrameSpaceContent_oeFrame(event){
   var o = this;
   o.__base.FDuiControl.oeFrame.call(o, event);
   o._guiManager.process();
   return MO.EEventStatus.Stop;
}
MO.FDsSystemFrameSpaceContent_construct = function FDsSystemFrameSpaceContent_construct(){
   var o = this;
   o.__base.FDuiControl.construct.call(o);
   o._rotation = new MO.SVector3();
   o._activeControls = new MO.TObjects();
   o._capturePosition = new MO.SPoint2();
   o._captureRotation = new MO.SVector3();
   MO.RWindow.lsnsKeyDown.register(o, o.onKeyDown);
}
MO.FDsSystemFrameSpaceContent_build = function FDsSystemFrameSpaceContent_build(hPanel){
   var o = this;
   var desktop = o._desktop = MO.Class.create(MO.FDssDesktop);
   desktop.build(hPanel);
   o.linkGraphicContext(desktop.canvas3d());
   var guiManager = o._guiManager = MO.Class.create(MO.FGuiCanvasManager);
   guiManager.linkGraphicContext(desktop.canvas3d());
   guiManager.setDesktop(desktop);
   guiManager.setCanvas(desktop.canvas2d());
   guiManager.setup();
}
MO.FDsSystemFrameSpaceContent_selectControl = function FDsSystemFrameSpaceContent_selectControl(control){
   var o = this;
   var controls = o._activeControls;
   controls.clear();
   controls.push(control);
}
MO.FDsSystemFrameSpaceContent_loadFrame = function FDsSystemFrameSpaceContent_loadFrame(code){
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
MO.FDsSystemFrameSpaceContent_dispose = function FDsSystemFrameSpaceContent_dispose(){
   var o = this;
   o._rotation = MO.Lang.Obejct.dispose(o._rotation)
   o.__base.FDuiControl.dispose.call(o);
}
with(MO){
   MO.FDsSystemFrameSpaceToolBar = function FDsSystemFrameSpaceToolBar(o){
      o = MO.Class.inherits(this, o, FDuiToolBar);
      o._frameName   = 'system.design.frame.SpaceToolBar';
      o._storageCode = o._frameName;
      o._controlFolderCreateButton   = null;
      o._controlFolderDeleteButton   = null;
      o._controlFolderPropertyButton = null;
      o._controlFolderOpenButton     = null;
      o._controlFolderCloseButton    = null;
      o._activeNodeGuid              = null;
      o.onBuilded                    = FDsSystemFrameSpaceToolBar_onBuilded;
      o.onFolderCreateClick          = FDsSystemFrameSpaceToolBar_onFolderCreateClick;
      o.onFolderDeleteLoad           = FDsSystemFrameSpaceToolBar_onFolderDeleteLoad;
      o.onFolderDeleteExcute         = FDsSystemFrameSpaceToolBar_onFolderDeleteExcute;
      o.onFolderDeleteClick          = FDsSystemFrameSpaceToolBar_onFolderDeleteClick;
      o.onFolderPropertyClick        = FDsSystemFrameSpaceToolBar_onFolderPropertyClick;
      o.onFolderOpenClick            = FDsSystemFrameSpaceToolBar_onFolderOpenClick;
      o.onFolderCloseClick           = FDsSystemFrameSpaceToolBar_onFolderCloseClick;
      o.construct                    = FDsSystemFrameSpaceToolBar_construct;
      o.dispose                      = FDsSystemFrameSpaceToolBar_dispose;
      return o;
   }
   MO.FDsSystemFrameSpaceToolBar_onBuilded = function FDsSystemFrameSpaceToolBar_onBuilded(p){
      var o = this;
      o.__base.FDuiToolBar.onBuilded.call(o, p);
   }
   MO.FDsSystemFrameSpaceToolBar_onFolderCreateClick = function FDsSystemFrameSpaceToolBar_onFolderCreateClick(event){
      var o = this;
      var parentGuid = null;
      var parentLabel = null;
      var catalog = o._frameSet._catalogContent;
      var node = catalog.focusNode();
      if(node){
         parentGuid = node.guid();
         parentLabel = node.label();
      }
      var dialog = RConsole.find(FDuiWindowConsole).find(FDsResourceFolderDialog);
      dialog._workspace = o._workspace;
      dialog._frameSet = o._frameSet;
      dialog._parentGuid = parentGuid;
      dialog.setNodeParentLabel(parentLabel);
      dialog.setNodeLabel('');
      dialog.switchDataMode(EUiDataMode.Insert);
      dialog.showPosition(EUiPosition.Center);
   }
   MO.FDsSystemFrameSpaceToolBar_onFolderDeleteLoad = function FDsSystemFrameSpaceToolBar_onFolderDeleteLoad(event){
      var o = this;
      RConsole.find(FDuiDesktopConsole).hide();
      var catalog = o._frameSet._catalogContent;
      var guid = o._activeNodeGuid;
      if(guid){
         var node = catalog.findByGuid(guid);
         node.removeSelf();
      }
      o._activeNodeGuid = null;
   }
   MO.FDsSystemFrameSpaceToolBar_onFolderDeleteExcute = function FDsSystemFrameSpaceToolBar_onFolderDeleteExcute(event){
      var o = this;
      if(event.resultCd != EResult.Success){
         return;
      }
      var catalog = o._frameSet._catalogContent;
      var node = catalog.focusNode();
      RConsole.find(FDuiDesktopConsole).showUploading();
      o._activeNodeGuid = node._guid;
      var connection = RConsole.find(FDrResourceConsole).doFolderDelete(node._guid);
      connection.addLoadListener(o, o.onFolderDeleteLoad);
   }
   MO.FDsSystemFrameSpaceToolBar_onFolderDeleteClick = function FDsSystemFrameSpaceToolBar_onFolderDeleteClick(event){
      var o = this;
      var catalog = o._frameSet._catalogContent;
      var node = catalog.focusNode();
      if(!node){
         return RConsole.find(FDuiMessageConsole).showInfo('请选中目录节点后，再点击操作。');
      }
      var dialog = RConsole.find(FDuiMessageConsole).showConfirm('请确认是否删除当前目录？');
      dialog.addResultListener(o, o.onFolderDeleteExcute);
   }
   MO.FDsSystemFrameSpaceToolBar_onFolderPropertyClick = function FDsSystemFrameSpaceToolBar_onFolderPropertyClick(event){
      var o = this;
      var catalog = o._frameSet._catalogContent;
      var node = catalog.focusNode();
      if(!node){
         return RConsole.find(FDuiMessageConsole).showInfo('请选中目录节点后，再点击操作。');
      }
      var parentLabel = null;
      if(node._parent){
         parentLabel = node._parent.label();
      }
      var dialog = RConsole.find(FDuiWindowConsole).find(FDsResourceFolderDialog);
      dialog._workspace = o._workspace;
      dialog._frameSet = o._frameSet;
      dialog._nodeGuid = node._guid;
      dialog.setNodeParentLabel(parentLabel);
      dialog.setNodeLabel(node.label());
      dialog.switchDataMode(EUiDataMode.Update);
      dialog.showPosition(EUiPosition.Center);
   }
   MO.FDsSystemFrameSpaceToolBar_onFolderOpenClick = function FDsSystemFrameSpaceToolBar_onFolderOpenClick(event){
   }
   MO.FDsSystemFrameSpaceToolBar_onFolderCloseClick = function FDsSystemFrameSpaceToolBar_onFolderCloseClick(event){
   }
   MO.FDsSystemFrameSpaceToolBar_construct = function FDsSystemFrameSpaceToolBar_construct(){
      var o = this;
      o.__base.FDuiToolBar.construct.call(o);
   }
   MO.FDsSystemFrameSpaceToolBar_dispose = function FDsSystemFrameSpaceToolBar_dispose(){
      var o = this;
      o.__base.FDuiToolBar.dispose.call(o);
   }
}
