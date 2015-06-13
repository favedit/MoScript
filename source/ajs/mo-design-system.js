with(MO){
   MO.FDsSystemTabBar = function FDsSystemTabBar(o){
      o = RClass.inherits(this, o, FUiTabBar);
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
      o.__base.FUiTabBar.onBuilded.call(o, p);
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
      o.__base.FUiTabBar.construct.call(o);
   }
   MO.FDsSystemTabBar_dispose = function FDsSystemTabBar_dispose(){
      var o = this;
      o.__base.FUiTabBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsSystemWorkspace = function FDsSystemWorkspace(o){
      o = RClass.inherits(this, o, FUiWorkspace, MUiStorage);
      o._frameName            = 'system.design.Workspace';
      o._storageCode          = o._frameName;
      o._styleMenuBarGround   = RClass.register(o, new AStyle('_styleMenuBarGround', 'MenuBar_Ground'));
      o._styleBodyGround      = RClass.register(o, new AStyle('_styleBodyGround', 'Body_Ground'));
      o._styleStatusBarGround = RClass.register(o, new AStyle('_styleStatusBarGround', 'StatusBar_Ground'));
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
      o.__base.FUiWorkspace.onBuilded.call(o, event);
      o._frameMenuBar._hPanel.className = o.styleName('MenuBar_Ground');
      o._frameBody._hPanel.className = o.styleName('Body_Ground');
      o._frameStatusBar._hPanel.className = o.styleName('StatusBar_Ground');
      var hTable = RBuilder.createTable(event);
      hTable.width = '100%';
      var hRow = RBuilder.appendTableRow(hTable);
      o._hMenuPanel = RBuilder.appendTableCell(hRow);
      var control = o._tabBar = RClass.create(FDsSystemTabBar);
      control._workspace = o;
      control.buildDefine(event);
      var hCell = RBuilder.appendTableCell(hRow);
      hCell.width = '100px';
      hCell.align = 'right';
      hCell.vAlign = 'bottom';
      hCell.appendChild(control._hPanel);
      o._frameMenuBar._hPanel.appendChild(hTable);
   }
   MO.FDsSystemWorkspace_construct = function FDsSystemWorkspace_construct(){
      var o = this;
      o.__base.FUiWorkspace.construct.call(o);
      o._frameSets = new TDictionary();
   }
   MO.FDsSystemWorkspace_selectFrameSet = function FDsSystemWorkspace_selectFrameSet(name, guid){
      var o = this;
      var frameSet = o._frameSets.get(name);
      if(!frameSet){
         if(name == EDsFrameSet.SystemDesignPersistenceFrameSet){
            var menuBar = RClass.create(FDsSystemDesignPersistenceMenuBar);
            menuBar._workspace = o;
            menuBar.buildDefine(o._hPanel);
            frameSet = RConsole.find(FUiFrameConsole).findByClass(o, FDsSystemDesignPersistenceFrameSet);
            frameSet._workspace = o;
            frameSet._menuBar = menuBar;
            menuBar._frameSet = frameSet;
         }else if(name == EDsFrameSet.SystemDesignListFrameSet){
            var menuBar = RClass.create(FDsSystemDesignListMenuBar);
            menuBar._workspace = o;
            menuBar.buildDefine(o._hPanel);
            frameSet = RConsole.find(FUiFrameConsole).findByClass(o, FDsSystemDesignListFrameSet);
            frameSet._workspace = o;
            frameSet._menuBar = menuBar;
            menuBar._frameSet = frameSet;
         }else if(name == EDsFrameSet.SystemDesignTreeFrameSet){
            var menuBar = RClass.create(FDsSystemDesignTreeMenuBar);
            menuBar._workspace = o;
            menuBar.buildDefine(o._hPanel);
            frameSet = RConsole.find(FUiFrameConsole).findByClass(o, FDsSystemDesignTreeFrameSet);
            frameSet._workspace = o;
            frameSet._menuBar = menuBar;
            menuBar._frameSet = frameSet;
         }else if(name == EDsFrameSet.SystemDesignFrameFrameSet){
            var menuBar = RClass.create(FDsSystemDesignFrameMenuBar);
            menuBar._workspace = o;
            menuBar.buildDefine(o._hPanel);
            frameSet = RConsole.find(FUiFrameConsole).findByClass(o, FDsSystemDesignFrameFrameSet);
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
            frameSet.loadByGuid(guid);
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
      o.__base.FUiWorkspace.dispose.call(o);
   }
}
with(MO){
   MO.FDsSystemDesignFrameCatalogToolBar = function FDsSystemDesignFrameCatalogToolBar(o){
      o = RClass.inherits(this, o, FDsResourceCatalogToolBar);
      o._frameName = 'system.design.frame.CatalogToolBar';
      return o;
   }
}
with(MO){
   MO.FDsSystemDesignFrameFrameSet = function FDsSystemDesignFrameFrameSet(o){
      o = RClass.inherits(this, o, FDsResourceFrameSet);
      o._frameName        = 'system.design.frame.FrameSet';
      o.onBuilded         = FDsSystemDesignFrameFrameSet_onBuilded;
      o.onCatalogSelected = FDsSystemDesignFrameFrameSet_onCatalogSelected;
      return o;
   }
   MO.FDsSystemDesignFrameFrameSet_onBuilded = function FDsSystemDesignFrameFrameSet_onBuilded(event){
      var o = this;
      o.__base.FDsResourceFrameSet.onBuilded.call(o, event);
      o._frameCatalogToolBar._hPanel.className = o.styleName('Toolbar_Ground');
      o._frameCatalogContent._hPanel.className = o.styleName('Catalog_Content');
      o._frameListToolBar._hPanel.className = o.styleName('Toolbar_Ground');
      o._frameListContent._hPanel.className = o.styleName('List_Content');
      var f = o._catalogSplitter = o.searchControl('catalogSpliter');
      f.setAlignCd(EUiAlign.Left);
      f.setSizeHtml(o._frameCatalog._hPanel);
      var control = o._catalogToolbar = RClass.create(FDsPrivateResourceCatalogToolBar);
      control._workspace = o._workspace;
      control._frameSet = o;
      control.buildDefine(event);
      o._frameCatalogToolBar.push(control);
      var control = o._catalogContent = RClass.create(FDsResourceCatalogContent);
      control._workspace = o._workspace;
      control._frameSet = o;
      control.build(event);
      o._frameCatalogContent.push(control);
      var control = o._listToolBar = RClass.create(FDsPrivateResourceListToolBar);
      control._workspace = o._workspace;
      control._frameSet = o;
      control.buildDefine(event);
      o._frameListToolBar.push(control);
      var control = o._listContent = RClass.create(FDsResourceListContent);
      control._workspace = o._workspace;
      control._frameSet = o;
      control.build(event);
      o._frameListContent.push(control);
   }
   MO.FDsSystemDesignFrameFrameSet_onCatalogSelected = function FDsSystemDesignFrameFrameSet_onCatalogSelected(p, pc){
      var o = this;
      var space = o._activeSpace;
      var fs = o._propertyFrames;
      var c = fs.count();
      for(var i = 0; i < c; i++){
         var f = fs.value(i);
         f.hide();
      }
      if(RClass.isClass(p, FE3dStage)){
         var f = o.findPropertyFrame(EDsFrame.MeshSpacePropertyFrame);
         f.show();
         f.loadObject(space, space);
      }else if(RClass.isClass(p, FG3dTechnique)){
         var f = o.findPropertyFrame(EDsFrame.MeshTechniquePropertyFrame);
         f.show();
         f.loadObject(space, p);
      }else if(RClass.isClass(p, FE3dRegion)){
         var f = o.findPropertyFrame(EDsFrame.MeshRegionPropertyFrame);
         f.show();
         f.loadObject(space, p);
      }else if(RClass.isClass(p, FE3dCamera)){
         var f = o.findPropertyFrame(EDsFrame.MeshCameraPropertyFrame);
         f.show();
         f.loadObject(space, p);
      }else if(RClass.isClass(p, FG3dDirectionalLight)){
         var f = o.findPropertyFrame(EDsFrame.MeshLightPropertyFrame);
         f.show();
         f.loadObject(space, p);
      }else if(RClass.isClass(p, FE3dMeshDisplay)){
         var f = o.findPropertyFrame(EDsFrame.MeshDisplayPropertyFrame);
         f.show();
         f.loadObject(space, p);
      }else if(RClass.isClass(p, FG3dMaterial)){
         var f = o.findPropertyFrame(EDsFrame.MeshMaterialPropertyFrame);
         f.show();
         f.loadObject(space, p);
      }else if(RClass.isClass(p, FE3dMeshRenderable)){
         var f = o.findPropertyFrame(EDsFrame.MeshRenderablePropertyFrame);
         f.show();
         f.loadObject(space, p);
      }else{
         throw new TError('Unknown select object type. (value={1})', p);
      }
   }
}
with(MO){
   MO.FDsSystemDesignFrameListToolBar = function FDsSystemDesignFrameListToolBar(o){
      o = RClass.inherits(this, o, FDsResourceListToolBar);
      o._frameName   = 'system.design.frame.ListToolBar';
      o._storageCode = o._frameName;
      return o;
   }
}
with(MO){
   MO.FDsSystemDesignFrameMenuBar = function FDsSystemDesignFrameMenuBar(o){
      o = RClass.inherits(this, o, FDsResourceMenuBar);
      o._frameName      = 'system.design.frame.MenuBar';
      o._controlRefresh = null;
      o.onBuilded       = FDsSystemDesignFrameMenuBar_onBuilded;
      o.onRefreshClick  = FDsSystemDesignFrameMenuBar_onRefreshClick;
      return o;
   }
   MO.FDsSystemDesignFrameMenuBar_onBuilded = function FDsSystemDesignFrameMenuBar_onBuilded(p){
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
   MO.FDsSystemDesignFrameMenuBar_onRefreshClick = function FDsSystemDesignFrameMenuBar_onRefreshClick(event){
   }
}
