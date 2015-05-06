function FDsPrivateTabBar(o){
   o = RClass.inherits(this, o, FUiTabBar);
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
function FDsPrivateTabBar_onBuilded(p){
   var o = this;
   o.__base.FUiTabBar.onBuilded.call(o, p);
   o._controlProjectButton.addClickListener(o, o.onButtonClick);
   o._controlResourceButton.addClickListener(o, o.onButtonClick);
   o._controlTeamButton.addClickListener(o, o.onButtonClick);
   o._controlPublishButton.addClickListener(o, o.onButtonClick);
}
function FDsPrivateTabBar_onButtonClick(event){
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
function FDsPrivateTabBar_construct(){
   var o = this;
   o.__base.FUiTabBar.construct.call(o);
}
function FDsPrivateTabBar_dispose(){
   var o = this;
   o.__base.FUiTabBar.dispose.call(o);
}
function FDsPrivateWorkspace(o){
   o = RClass.inherits(this, o, FUiWorkspace, MUiStorage);
   o._frameName            = 'resource.private.Workspace';
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
   o.onBuilded             = FDsPrivateWorkspace_onBuilded;
   o.construct             = FDsPrivateWorkspace_construct;
   o.selectFrameSet        = FDsPrivateWorkspace_selectFrameSet;
   o.load                  = FDsPrivateWorkspace_load;
   o.dispose               = FDsPrivateWorkspace_dispose;
   return o;
}
function FDsPrivateWorkspace_onBuilded(event){
   var o = this;
   o.__base.FUiWorkspace.onBuilded.call(o, event);
   o._frameMenuBar._hPanel.className = o.styleName('MenuBar_Ground');
   o._frameBody._hPanel.className = o.styleName('Body_Ground');
   o._frameStatusBar._hPanel.className = o.styleName('StatusBar_Ground');
   var hTable = RBuilder.createTable(event);
   hTable.width = '100%';
   var hRow = RBuilder.appendTableRow(hTable);
   o._hMenuPanel = RBuilder.appendTableCell(hRow);
   var control = o._tabBar = RClass.create(FDsPrivateTabBar);
   control._workspace = o;
   control.buildDefine(event);
   var hCell = RBuilder.appendTableCell(hRow);
   hCell.width = '100px';
   hCell.align = 'right';
   hCell.vAlign = 'bottom';
   hCell.appendChild(control._hPanel);
   o._frameMenuBar._hPanel.appendChild(hTable);
}
function FDsPrivateWorkspace_construct(){
   var o = this;
   o.__base.FUiWorkspace.construct.call(o);
   o._frameSets = new TDictionary();
}
function FDsPrivateWorkspace_selectFrameSet(name, guid){
   var o = this;
   var frameSet = o._frameSets.get(name);
   if(!frameSet){
      if(name == EDsFrameSet.PrivateSolutionFrameSet){
         var menuBar = RClass.create(FDsSolutionMenuBar);
         menuBar._workspace = o;
         menuBar.buildDefine(o._hPanel);
         frameSet = RConsole.find(FUiFrameConsole).findByClass(o, FDsSolutionFrameSet);
         frameSet._workspace = o;
         frameSet._menuBar = menuBar;
         menuBar._frameSet = frameSet;
      }else if(name == EDsFrameSet.PrivateProjectFrameSet){
         var menuBar = RClass.create(FDsProjectMenuBar);
         menuBar._workspace = o;
         menuBar.buildDefine(o._hPanel);
         frameSet = RConsole.find(FUiFrameConsole).findByClass(o, FDsProjectFrameSet);
         frameSet._workspace = o;
         frameSet._menuBar = menuBar;
         menuBar._frameSet = frameSet;
      }else if(name == EDsFrameSet.PrivateResourceFrameSet){
         var menuBar = RClass.create(FDsPrivateResourceMenuBar);
         menuBar._workspace = o;
         menuBar.buildDefine(o._hPanel);
         frameSet = RConsole.find(FUiFrameConsole).findByClass(o, FDsPrivateResourceFrameSet);
         frameSet._workspace = o;
         frameSet._menuBar = menuBar;
         menuBar._frameSet = frameSet;
      }else if(name == EDsFrameSet.PrivateBitmapFrameSet){
         var menuBar = RClass.create(FDsPrivateBitmapMenuBar);
         menuBar._workspace = o;
         menuBar.buildDefine(o._hPanel);
         frameSet = RConsole.find(FUiFrameConsole).findByClass(o, FDsPrivateBitmapFrameSet);
         frameSet._workspace = o;
         frameSet._menuBar = menuBar;
         menuBar._frameSet = frameSet;
      }else if(name == EDsFrameSet.PrivateMaterialFrameSet){
         var menuBar = RClass.create(FDsPrivateMaterialMenuBar);
         menuBar._workspace = o;
         menuBar.buildDefine(o._hPanel);
         frameSet = RConsole.find(FUiFrameConsole).findByClass(o, FDsPrivateMaterialFrameSet);
         frameSet._workspace = o;
         frameSet._menuBar = menuBar;
         menuBar._frameSet = frameSet;
      }else if(name == EDsFrameSet.PrivateModelFrameSet){
         var menuBar = RClass.create(FDsPrivateModelMenuBar);
         menuBar._workspace = o;
         menuBar.buildDefine(o._hPanel);
         frameSet = RConsole.find(FUiFrameConsole).findByClass(o, FDsPrivateModelFrameSet);
         frameSet._workspace = o;
         frameSet._menuBar = menuBar;
         menuBar._frameSet = frameSet;
      }else if(name == EDsFrameSet.PrivateTemplateFrameSet){
         var menuBar = RClass.create(FDsPrivateTemplateMenuBar);
         menuBar._workspace = o;
         menuBar.buildDefine(o._hPanel);
         frameSet = RConsole.find(FUiFrameConsole).findByClass(o, FDsPrivateTemplateFrameSet);
         frameSet._workspace = o;
         frameSet._menuBar = menuBar;
         menuBar._frameSet = frameSet;
      }else if(name == EDsFrameSet.PrivateSceneFrameSet){
         var menuBar = RClass.create(FDsPrivateSceneMenuBar);
         menuBar._workspace = o;
         menuBar.buildDefine(o._hPanel);
         frameSet = RConsole.find(FUiFrameConsole).findByClass(o, FDsPrivateSceneFrameSet);
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
function FDsPrivateWorkspace_load(){
   var o = this;
   var code = o._activeFrameSetCode = o.storageGet('frameset_code', EDsFrameSet.SolutionFrameSet);
   var guid = o._activeFrameSetGuid = o.storageGet('frameset_guid');
   var button = null;
   if(code == EDsFrameSet.SolutionFrameSet){
      button = o._tabBar.findControl('solution');
      button.doClick();
   }else if(code == EDsFrameSet.ProjectFrameSet){
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
function FDsPrivateWorkspace_dispose(){
   var o = this;
   o._frameSets = RObject.dispose(o._frameSets);
   o.__base.FUiWorkspace.dispose.call(o);
}
function FDsPrivateResourceCatalogToolBar(o){
   o = RClass.inherits(this, o, FDsResourceCatalogToolBar);
   o._frameName = 'resource.private.resource.CatalogToolBar';
   return o;
}
function FDsPrivateResourceFrameSet(o){
   o = RClass.inherits(this, o, FDsResourceFrameSet);
   o._frameName        = 'resource.share.resource.FrameSet';
   o.onBuilded         = FDsPrivateResourceFrameSet_onBuilded;
   o.onCatalogSelected = FDsPrivateResourceFrameSet_onCatalogSelected;
   return o;
}
function FDsPrivateResourceFrameSet_onBuilded(event){
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
function FDsPrivateResourceFrameSet_onCatalogSelected(p, pc){
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
function FDsPrivateResourceListToolBar(o){
   o = RClass.inherits(this, o, FDsResourceListToolBar);
   o._frameName   = 'resource.private.resource.ListToolBar';
   o._storageCode = o._frameName;
   return o;
}
function FDsPrivateResourceMenuBar(o){
   o = RClass.inherits(this, o, FDsResourceMenuBar);
   o._frameName      = 'resource.private.resource.MenuBar';
   o._controlRefresh = null;
   o.onBuilded       = FDsPrivateResourceMenuBar_onBuilded;
   o.onRefreshClick  = FDsPrivateResourceMenuBar_onRefreshClick;
   return o;
}
function FDsPrivateResourceMenuBar_onBuilded(p){
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
function FDsPrivateResourceMenuBar_onRefreshClick(event){
}
function FDsPrivateBitmapCanvasToolBar(o){
   o = RClass.inherits(this, o, FDsBitmapCanvasToolBar);
   o._frameName = 'resource.private.bitmap.CanvasToolBar';
   return o;
}
function FDsPrivateBitmapFrameSet(o){
   o = RClass.inherits(this, o, FDsBitmapFrameSet);
   o._frameName = 'resource.private.bitmap.FrameSet';
   o.onBuilded  = FDsPrivateBitmapFrameSet_onBuilded;
   return o;
}
function FDsPrivateBitmapFrameSet_onBuilded(p){
   var o = this;
   o.__base.FDsBitmapFrameSet.onBuilded.call(o, p);
   var toolbar = o._canvasToolBar = RClass.create(FDsPrivateBitmapCanvasToolBar);
   toolbar._frameSet = o;
   toolbar.buildDefine(p);
   o._frameCanvasToolBar.push(toolbar);
   var canvas = o._canvasContent = RClass.create(FDsBitmapCanvasContent);
   canvas._frameSet = o;
   canvas._hParent = o._frameCanvasContent._hPanel;
   canvas._hParent.style.backgroundColor = '#333333';
   canvas._hParent.style.scroll = 'auto';
   canvas.build(p);
   o._frameCanvasContent.push(canvas);
   var toolbar = o._propertyToolBar = RClass.create(FDsBitmapPropertyToolBar);
   toolbar._frameSet = o;
   toolbar.buildDefine(p);
   o._framePropertyToolBar.push(toolbar);
   var frame = o.findPropertyFrame(EDsFrame.BitmapPropertyFrame);
   o._framePropertyContent.push(frame);
}
function FDsPrivateBitmapMenuBar(o){
   o = RClass.inherits(this, o, FDsBitmapMenuBar);
   o._frameName  = 'resource.private.bitmap.MenuBar';
   o.onBuilded   = FDsPrivateBitmapMenuBar_onBuilded;
   o.onBackClick = FDsPrivateBitmapMenuBar_onBackClick;
   return o;
}
function FDsPrivateBitmapMenuBar_onBuilded(event){
   var o = this;
   o.__base.FDsBitmapMenuBar.onBuilded.call(o, event);
   o._controlBack.addClickListener(o, o.onBackClick);
   o._controlSave.addClickListener(o, o.onSaveClick);
   o._controlImport.addClickListener(o, o.onImportClick);
}
function FDsPrivateBitmapMenuBar_onBackClick(event){
   var o = this;
   var workspace = o._frameSet._workspace;
   workspace.selectFrameSet(EDsFrameSet.PrivateResourceFrameSet);
}
function FDsPrivateMaterialCanvasToolBar(o){
   o = RClass.inherits(this, o, FDsMaterialCanvasToolBar);
   o._frameName = 'resource.private.material.CanvasToolBar';
   return o;
}
function FDsPrivateMaterialCatalogToolBar(o){
   o = RClass.inherits(this, o, FDsMaterialCatalogToolBar);
   o._frameName = 'resource.private.material.CatalogToolBar';
   return o;
}
function FDsPrivateMaterialFrameSet(o){
   o = RClass.inherits(this, o, FDsMaterialFrameSet);
   o._frameName = 'resource.private.material.FrameSet';
   o.onBuilded  = FDsPrivateMaterialFrameSet_onBuilded;
   return o;
}
function FDsPrivateMaterialFrameSet_onBuilded(event){
   var o = this;
   o.__base.FDsMaterialFrameSet.onBuilded.call(o, event);
   var toolbar = o._catalogToolBar = RClass.create(FDsPrivateMaterialCatalogToolBar);
   toolbar._frameSet = o;
   toolbar.buildDefine(event);
   o._frameCatalogToolBar.push(toolbar);
   var catalog = o._catalogContent = RClass.create(FDsMaterialCatalogContent);
   catalog._frameSet = o;
   catalog.build(event);
   o._frameCatalogContent.push(catalog);
   var toolbar = o._canvasToolBar = RClass.create(FDsPrivateMaterialCanvasToolBar);
   toolbar._frameSet = o;
   toolbar.buildDefine(event);
   o._frameCanvasToolBar.push(toolbar);
   var toolbar = o._propertyToolBar = RClass.create(FDsMaterialPropertyToolBar);
   toolbar._frameSet = o;
   toolbar.buildDefine(event);
   o._framePropertyToolBar.push(toolbar);
}
function FDsPrivateMaterialMenuBar(o){
   o = RClass.inherits(this, o, FDsMaterialMenuBar);
   o._frameName = 'resource.private.material.MenuBar';
   return o;
}
function FDsPrivateModelCanvasToolBar(o){
   o = RClass.inherits(this, o, FDsModelCanvasToolBar);
   o._frameName = 'resource.private.model.CanvasToolBar';
   return o;
}
function FDsPrivateModelCatalogToolBar(o){
   o = RClass.inherits(this, o, FDsModelCatalogToolBar);
   o._frameName = 'resource.private.model.CatalogToolBar';
   return o;
}
function FDsPrivateModelFrameSet(o){
   o = RClass.inherits(this, o, FDsModelFrameSet);
   o._frameName = 'resource.private.model.FrameSet';
   o.onBuilded  = FDsPrivateModelFrameSet_onBuilded;
   return o;
}
function FDsPrivateModelFrameSet_onBuilded(event){
   var o = this;
   o.__base.FDsModelFrameSet.onBuilded.call(o, event);
   var toolbar = o._catalogToolBar = RClass.create(FDsPrivateModelCatalogToolBar);
   toolbar._frameSet = o;
   toolbar.buildDefine(event);
   o._frameCatalogToolBar.push(toolbar);
   var catalog = o._catalogContent = RClass.create(FDsModelCatalogContent);
   catalog._frameSet = o;
   catalog.build(event);
   catalog.addSelectedListener(o, o.onCatalogSelected);
   o._frameCatalogContent.push(catalog);
   var toolbar = o._canvasToolBar = RClass.create(FDsPrivateModelCanvasToolBar);
   toolbar._frameSet = o;
   toolbar.buildDefine(event);
   o._frameCanvasToolBar.push(toolbar);
   var canvas = o._canvasContent = RClass.create(FDsModelCanvasContent);
   canvas._frameSet = o;
   canvas._toolbar = o._canvasToolbar;
   canvas._hParent = o._frameCanvasContent._hPanel;
   canvas._hParent.style.backgroundColor = '#333333';
   canvas._hParent.style.scroll = 'auto';
   canvas.addLoadListener(o, o.onDataLoaded);
   canvas.build(event);
   o._frameCanvasContent.push(canvas);
}
function FDsPrivateModelMenuBar(o){
   o = RClass.inherits(this, o, FDsModelMenuBar);
   o._frameName = 'resource.private.model.MenuBar';
   o.onBuilded  = FDsPrivateModelMenuBar_onBuilded;
   return o;
}
function FDsPrivateModelMenuBar_onBuilded(p){
   var o = this;
   o.__base.FDsModelMenuBar.onBuilded.call(o, p);
   o._controlSaveButton.addClickListener(o, o.onSaveClick);
   o._controlCaptureButton.addClickListener(o, o.onCaptureClick);
}
function FDsPrivateTemplateCanvasToolBar(o){
   o = RClass.inherits(this, o, FDsTemplateCanvasToolBar);
   o._frameName      = 'resource.private.template.CanvasToolBar';
   return o;
}
function FDsPrivateTemplateCatalogToolBar(o){
   o = RClass.inherits(this, o, FDsTemplateCatalogToolBar);
   o._frameName = 'resource.private.template.CatalogToolBar';
   return o;
}
function FDsPrivateTemplateFrameSet(o){
   o = RClass.inherits(this, o, FDsTemplateFrameSet);
   o._frameName        = 'resource.private.template.FrameSet';
   o.onBuilded         = FDsPrivateTemplateFrameSet_onBuilded;
   o.onCatalogSelected = FDsPrivateTemplateFrameSet_onCatalogSelected;
   return o;
}
function FDsPrivateTemplateFrameSet_onBuilded(event){
   var o = this;
   o.__base.FDsTemplateFrameSet.onBuilded.call(o, event);
   var toolbar = o._catalogToolBar = RClass.create(FDsPrivateTemplateCatalogToolBar);
   toolbar._frameSet = o;
   toolbar.buildDefine(event);
   o._frameCatalogToolBar.push(toolbar);
   var catalog = o._catalogContent = RClass.create(FDsTemplateCatalogContent);
   catalog._frameSet = o;
   catalog.build(event);
   catalog.addSelectedListener(o, o.onCatalogSelected);
   o._frameCatalogContent.push(catalog);
   var toolbar = o._canvasToolBar = RClass.create(FDsPrivateTemplateCanvasToolBar);
   toolbar._frameSet = o;
   toolbar.buildDefine(event);
   o._frameCanvasToolBar.push(toolbar);
   var canvas = o._canvasContent = RClass.create(FDsTemplateCanvasContent);
   canvas._frameSet = o;
   canvas._toolbar = o._canvasToolbar;
   canvas._hParent = o._frameCanvasContent._hPanel;
   canvas._hParent.style.scroll = 'auto';
   canvas.addLoadListener(o, o.onDataLoaded);
   canvas.build(event);
   o._frameCanvasContent.push(canvas);
}
function FDsPrivateTemplateFrameSet_onCatalogSelected(select, flag){
   var o = this;
   var space = o._activeSpace;
   if(!space){
      return;
   }
   o.hidePropertyFrames();
   if(RClass.isClass(select, FE3dSpace)){
      var frame = o.findPropertyFrame(EDsFrame.CommonSpacePropertyFrame);
      frame.show();
      frame.loadObject(space, select);
   }else if(RClass.isClass(select, FG3dTechnique)){
      var frame = o.findPropertyFrame(EDsFrame.CommonTechniquePropertyFrame);
      frame.show();
      frame.loadObject(space, select);
   }else if(RClass.isClass(select, FE3dRegion)){
      var frame = o.findPropertyFrame(EDsFrame.CommonRegionPropertyFrame);
      frame.show();
      frame.loadObject(space, select);
   }else if(RClass.isClass(select, FE3dCamera)){
      var frame = o.findPropertyFrame(EDsFrame.CommonCameraPropertyFrame);
      frame.show();
      frame.loadObject(space, select);
   }else if(RClass.isClass(select, FG3dDirectionalLight)){
      var frame = o.findPropertyFrame(EDsFrame.CommonLightPropertyFrame);
      frame.show();
      frame.loadObject(space, select);
   }else if(RClass.isClass(select, FE3dTemplateDisplay)){
      var frame = o.findPropertyFrame(EDsFrame.CommonDisplayPropertyFrame);
      frame.show();
      frame.loadObject(space, select);
   }else if(RClass.isClass(select, FG3dMaterial)){
      var frame = o.findPropertyFrame(EDsFrame.CommonMaterialPropertyFrame);
      frame.show();
      frame.loadObject(space, select);
   }else if(RClass.isClass(select, FE3dRenderable)){
      var frame = o.findPropertyFrame(EDsFrame.CommonRenderablePropertyFrame);
      frame.show();
      frame.loadObject(space, select);
   }else{
      throw new TError('Unknown select object type. (select={1})', select);
   }
}
function FDsPrivateTemplateMenuBar(o){
   o = RClass.inherits(this, o, FDsTemplateMenuBar);
   o._frameName = 'resource.private.template.MenuBar';
   o.onBuilded  = FDsPrivateTemplateMenuBar_onBuilded;
   return o;
}
function FDsPrivateTemplateMenuBar_onBuilded(event){
   var o = this;
   o.__base.FDsTemplateMenuBar.onBuilded.call(o, event);
   o._controlSave.addClickListener(o, o.onSaveClick);
   o._controlCapture.addClickListener(o, o.onCaptureClick);
   o._controlSelectMaterial.addClickListener(o, o.onSelectMaterialClick);
   o._controlCreateDisplay.addClickListener(o, o.onCreateDisplayClick);
   o._controlDelete.addClickListener(o, o.onDeleteClick);
}
function FDsPrivateSceneCanvasToolBar(o){
   o = RClass.inherits(this, o, FDsSceneCanvasToolBar);
   o._frameName = 'resource.private.scene.CanvasToolBar';
   return o;
}
function FDsPrivateSceneCatalogToolBar(o){
   o = RClass.inherits(this, o, FDsSceneCatalogToolBar);
   o._frameName = 'resource.private.scene.CatalogToolBar';
   return o;
}
function FDsPrivateSceneFrameSet(o){
   o = RClass.inherits(this, o, FDsSceneFrameSet);
   o._frameName = 'resource.private.scene.FrameSet';
   o.onBuilded  = FDsPrivateSceneFrameSet_onBuilded;
   return o;
}
function FDsPrivateSceneFrameSet_onBuilded(event){
   var o = this;
   o.__base.FDsSceneFrameSet.onBuilded.call(o, event);
   var toolbar = o._catalogToolbar = RClass.create(FDsPrivateSceneCatalogToolBar);
   toolbar._frameSet = o;
   toolbar.buildDefine(event);
   o._frameCatalogToolBar.push(toolbar);
   var catalog = o._catalogContent = RClass.create(FDsSceneCatalogContent);
   catalog._frameSet = o;
   catalog.build(event);
   catalog.addSelectedListener(o, o.onCatalogSelected);
   o._frameCatalogContent.push(catalog);
   var toolbar = o._canvasToolBar = RClass.create(FDsPrivateSceneCanvasToolBar);
   toolbar._frameSet = o;
   toolbar.buildDefine(event);
   o._frameCanvasToolBar.push(toolbar);
   var canvas = o._canvasContent = RClass.create(FDsSceneCanvasContent);
   canvas._frameSet = o;
   canvas._toolbar = o._canvasToolbar;
   canvas._hParent = o._frameCanvasContent._hPanel;
   canvas._hParent.style.backgroundColor = '#333333';
   canvas._hParent.style.scroll = 'auto';
   canvas.addLoadListener(o, o.onDataLoaded);
   canvas.build(event);
   o._frameCanvasContent.push(canvas);
   var toolbar = o._propertyToolbar = RClass.create(FDsScenePropertyToolBar);
   toolbar._frameSet = o;
   toolbar.buildDefine(event);
   o._framePropertyToolBar.push(toolbar);
}
function FDsPrivateSceneMenuBar(o){
   o = RClass.inherits(this, o, FDsSceneMenuBar);
   o._frameName = 'resource.private.scene.MenuBar';
   o.onBuilded  = FDsPrivateSceneMenuBar_onBuilded;
   return o;
}
function FDsPrivateSceneMenuBar_onBuilded(p){
   var o = this;
   o.__base.FDsSceneMenuBar.onBuilded.call(o, p);
   o._controlSave.addClickListener(o, o.onSaveClick);
   o._controlCapture.addClickListener(o, o.onCaptureClick);
   o._controlCreateLayer.addClickListener(o, o.onCreateLayerClick);
   o._controlImportTemplate.addClickListener(o, o.onImportTemplateClick);
   o._controlExecute.addClickListener(o, o.onExecuteClick);
}
