with(MO){
   MO.FDsPrivateTabBar = function FDsPrivateTabBar(o){
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
   MO.FDsPrivateTabBar_onBuilded = function FDsPrivateTabBar_onBuilded(p){
      var o = this;
      o.__base.FUiTabBar.onBuilded.call(o, p);
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
      o.__base.FUiTabBar.construct.call(o);
   }
   MO.FDsPrivateTabBar_dispose = function FDsPrivateTabBar_dispose(){
      var o = this;
      o.__base.FUiTabBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsPrivateWorkspace = function FDsPrivateWorkspace(o){
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
   MO.FDsPrivateWorkspace_onBuilded = function FDsPrivateWorkspace_onBuilded(event){
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
   MO.FDsPrivateWorkspace_construct = function FDsPrivateWorkspace_construct(){
      var o = this;
      o.__base.FUiWorkspace.construct.call(o);
      o._frameSets = new TDictionary();
   }
   MO.FDsPrivateWorkspace_selectFrameSet = function FDsPrivateWorkspace_selectFrameSet(name, guid){
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
            var menuBar = RClass.create(FDsPrivateProjectMenuBar);
            menuBar._workspace = o;
            menuBar.buildDefine(o._hPanel);
            frameSet = RConsole.find(FUiFrameConsole).findByClass(o, FDsPrivateProjectFrameSet);
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
      o.__base.FUiWorkspace.dispose.call(o);
   }
}
with(MO){
   MO.FDsPrivateProjectFrameSet = function FDsPrivateProjectFrameSet(o){
      o = RClass.inherits(this, o, FDsProjectFrameSet);
      o._frameName = 'resource.private.project.FrameSet';
      o.onBuilded  = FDsPrivateProjectFrameSet_onBuilded;
      return o;
   }
   MO.FDsPrivateProjectFrameSet_onBuilded = function FDsPrivateProjectFrameSet_onBuilded(event){
      var o = this;
      o.__base.FDsProjectFrameSet.onBuilded.call(o, event);
      var control = o._sceneListToolbar = RClass.create(FDsProjectSceneListToolBar);
      control._frameSet = o;
      control.buildDefine(event);
      o._frameSceneListToolBar.push(control);
      var control = o._sceneListContent = RClass.create(FDsProjectSceneListContent);
      control._frameSet = o;
      control.build(event);
      o._frameSceneListContent.push(control);
      var control = o._sceneCatalogToolbar = RClass.create(FDsProjectSceneCatalogToolBar);
      control._frameSet = o;
      control.buildDefine(event);
      o._frameSceneCatalogToolBar.push(control);
      var control = o._sceneCatalogContent = RClass.create(FDsProjectSceneCatalogContent);
      control._frameSet = o;
      control.build(event);
      o._frameSceneCatalogContent.push(control);
      var control = o._canvasSpaceToolbar = RClass.create(FDsProjectCanvasSpaceToolBar);
      control._frameSet = o;
      control.buildDefine(event);
      o._frameCanvasSpaceToolBar.push(control);
      var control = o._canvasPreviewToolbar = RClass.create(FDsProjectCanvasPreviewToolBar);
      control._frameSet = o;
      control.buildDefine(event);
      o._frameCanvasPreviewToolBar.push(control);
      var control = o._propertyToolbar = RClass.create(FDsProjectPropertyToolBar);
      control._frameSet = o;
      control.buildDefine(event);
      o._framePropertyAttributeToolBar.push(control);
   }
}
with(MO){
   MO.FDsPrivateProjectMenuBar = function FDsPrivateProjectMenuBar(o){
      o = RClass.inherits(this, o, FDsProjectMenuBar);
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
      o = RClass.inherits(this, o, FDsResourceCatalogToolBar);
      o._frameName = 'resource.private.resource.CatalogToolBar';
      return o;
   }
}
with(MO){
   MO.FDsPrivateResourceFrameSet = function FDsPrivateResourceFrameSet(o){
      o = RClass.inherits(this, o, FDsResourceFrameSet);
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
   MO.FDsPrivateResourceFrameSet_onCatalogSelected = function FDsPrivateResourceFrameSet_onCatalogSelected(p, pc){
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
   MO.FDsPrivateResourceListToolBar = function FDsPrivateResourceListToolBar(o){
      o = RClass.inherits(this, o, FDsResourceListToolBar);
      o._frameName   = 'resource.private.resource.ListToolBar';
      o._storageCode = o._frameName;
      return o;
   }
}
with(MO){
   MO.FDsPrivateResourceMenuBar = function FDsPrivateResourceMenuBar(o){
      o = RClass.inherits(this, o, FDsResourceMenuBar);
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
      o = RClass.inherits(this, o, FDsBitmapCanvasToolBar);
      o._frameName = 'resource.private.bitmap.CanvasToolBar';
      return o;
   }
}
with(MO){
   MO.FDsPrivateBitmapFrameSet = function FDsPrivateBitmapFrameSet(o){
      o = RClass.inherits(this, o, FDsBitmapFrameSet);
      o._frameName = 'resource.private.bitmap.FrameSet';
      o.onBuilded  = FDsPrivateBitmapFrameSet_onBuilded;
      return o;
   }
   MO.FDsPrivateBitmapFrameSet_onBuilded = function FDsPrivateBitmapFrameSet_onBuilded(p){
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
}
with(MO){
   MO.FDsPrivateBitmapMenuBar = function FDsPrivateBitmapMenuBar(o){
      o = RClass.inherits(this, o, FDsBitmapMenuBar);
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
      o = RClass.inherits(this, o, FDsMaterialCanvasToolBar);
      o._frameName = 'resource.private.material.CanvasToolBar';
      return o;
   }
}
with(MO){
   MO.FDsPrivateMaterialCatalogToolBar = function FDsPrivateMaterialCatalogToolBar(o){
      o = RClass.inherits(this, o, FDsMaterialCatalogToolBar);
      o._frameName = 'resource.private.material.CatalogToolBar';
      return o;
   }
}
with(MO){
   MO.FDsPrivateMaterialFrameSet = function FDsPrivateMaterialFrameSet(o){
      o = RClass.inherits(this, o, FDsMaterialFrameSet);
      o._frameName = 'resource.private.material.FrameSet';
      o.onBuilded  = FDsPrivateMaterialFrameSet_onBuilded;
      return o;
   }
   MO.FDsPrivateMaterialFrameSet_onBuilded = function FDsPrivateMaterialFrameSet_onBuilded(event){
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
}
with(MO){
   MO.FDsPrivateMaterialMenuBar = function FDsPrivateMaterialMenuBar(o){
      o = RClass.inherits(this, o, FDsMaterialMenuBar);
      o._frameName = 'resource.private.material.MenuBar';
      return o;
   }
}
with(MO){
   MO.FDsPrivateModelCanvasToolBar = function FDsPrivateModelCanvasToolBar(o){
      o = RClass.inherits(this, o, FDsModelCanvasToolBar);
      o._frameName = 'resource.private.model.CanvasToolBar';
      return o;
   }
}
with(MO){
   MO.FDsPrivateModelCatalogToolBar = function FDsPrivateModelCatalogToolBar(o){
      o = RClass.inherits(this, o, FDsModelCatalogToolBar);
      o._frameName = 'resource.private.model.CatalogToolBar';
      return o;
   }
}
with(MO){
   MO.FDsPrivateModelFrameSet = function FDsPrivateModelFrameSet(o){
      o = RClass.inherits(this, o, FDsModelFrameSet);
      o._frameName = 'resource.private.model.FrameSet';
      o.onBuilded  = FDsPrivateModelFrameSet_onBuilded;
      return o;
   }
   MO.FDsPrivateModelFrameSet_onBuilded = function FDsPrivateModelFrameSet_onBuilded(event){
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
}
with(MO){
   MO.FDsPrivateModelMenuBar = function FDsPrivateModelMenuBar(o){
      o = RClass.inherits(this, o, FDsModelMenuBar);
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
      o = RClass.inherits(this, o, FDsTemplateCanvasToolBar);
      o._frameName      = 'resource.private.template.CanvasToolBar';
      return o;
   }
}
with(MO){
   MO.FDsPrivateTemplateCatalogToolBar = function FDsPrivateTemplateCatalogToolBar(o){
      o = RClass.inherits(this, o, FDsTemplateCatalogToolBar);
      o._frameName = 'resource.private.template.CatalogToolBar';
      return o;
   }
}
with(MO){
   MO.FDsPrivateTemplateFrameSet = function FDsPrivateTemplateFrameSet(o){
      o = RClass.inherits(this, o, FDsTemplateFrameSet);
      o._frameName        = 'resource.private.template.FrameSet';
      o.onBuilded         = FDsPrivateTemplateFrameSet_onBuilded;
      o.onCatalogSelected = FDsPrivateTemplateFrameSet_onCatalogSelected;
      return o;
   }
   MO.FDsPrivateTemplateFrameSet_onBuilded = function FDsPrivateTemplateFrameSet_onBuilded(event){
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
   MO.FDsPrivateTemplateFrameSet_onCatalogSelected = function FDsPrivateTemplateFrameSet_onCatalogSelected(select, flag){
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
}
with(MO){
   MO.FDsPrivateTemplateMenuBar = function FDsPrivateTemplateMenuBar(o){
      o = RClass.inherits(this, o, FDsTemplateMenuBar);
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
      o = RClass.inherits(this, o, FDsSceneCanvasToolBar);
      o._frameName = 'resource.private.scene.CanvasToolBar';
      return o;
   }
}
with(MO){
   MO.FDsPrivateSceneCatalogToolBar = function FDsPrivateSceneCatalogToolBar(o){
      o = RClass.inherits(this, o, FDsSceneCatalogToolBar);
      o._frameName = 'resource.private.scene.CatalogToolBar';
      return o;
   }
}
with(MO){
   MO.FDsPrivateSceneFrameSet = function FDsPrivateSceneFrameSet(o){
      o = RClass.inherits(this, o, FDsSceneFrameSet);
      o._frameName = 'resource.private.scene.FrameSet';
      o.onBuilded  = FDsPrivateSceneFrameSet_onBuilded;
      return o;
   }
   MO.FDsPrivateSceneFrameSet_onBuilded = function FDsPrivateSceneFrameSet_onBuilded(event){
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
}
with(MO){
   MO.FDsPrivateSceneMenuBar = function FDsPrivateSceneMenuBar(o){
      o = RClass.inherits(this, o, FDsSceneMenuBar);
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
      o = RClass.inherits(this, o, FUiTabBar);
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
      o.__base.FUiTabBar.onBuilded.call(o, p);
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
      o.__base.FUiTabBar.construct.call(o);
   }
   MO.FDsShareTabBar_dispose = function FDsShareTabBar_dispose(){
      var o = this;
      o.__base.FUiTabBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsShareWorkspace = function FDsShareWorkspace(o){
      o = RClass.inherits(this, o, FUiWorkspace, MUiStorage);
      o._frameName            = 'resource.share.Workspace';
      o._storageCode          = o._frameName;
      o._styleMenubarGround   = RClass.register(o, new AStyle('_styleMenubarGround', 'Menubar_Ground'));
      o._styleBodyGround      = RClass.register(o, new AStyle('_styleBodyGround', 'Body_Ground'));
      o._styleStatusbarGround = RClass.register(o, new AStyle('_styleStatusbarGround', 'Statusbar_Ground'));
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
      o.__base.FUiWorkspace.onBuilded.call(o, event);
      o._frameMenuBar._hPanel.className = o.styleName('Menubar_Ground');
      o._frameBody._hPanel.className = o.styleName('Body_Ground');
      o._frameStatusBar._hPanel.className = o.styleName('Statusbar_Ground');
      var hTable = RBuilder.createTable(event);
      hTable.width = '100%';
      var hRow = RBuilder.appendTableRow(hTable);
      o._hMenuPanel = RBuilder.appendTableCell(hRow);
      var control = o._tabBar = RClass.create(FDsShareTabBar);
      control._workspace = o;
      control.buildDefine(event);
      var hCell = RBuilder.appendTableCell(hRow);
      hCell.width = '100px';
      hCell.align = 'right';
      hCell.vAlign = 'bottom';
      hCell.appendChild(control._hPanel);
      o._frameMenuBar._hPanel.appendChild(hTable);
   }
   MO.FDsShareWorkspace_construct = function FDsShareWorkspace_construct(){
      var o = this;
      o.__base.FUiWorkspace.construct.call(o);
      o._frameSets = new TDictionary();
   }
   MO.FDsShareWorkspace_selectFrameSet = function FDsShareWorkspace_selectFrameSet(name, guid){
      var o = this;
      var frameSet = o._frameSets.get(name);
      if(!frameSet){
         if(name == EDsFrameSet.ShareResourceFrameSet){
            var menuBar = RClass.create(FDsShareResourceMenuBar);
            menuBar._workspace = o;
            menuBar.buildDefine(o._hPanel);
            frameSet = RConsole.find(FUiFrameConsole).findByClass(o, FDsShareResourceFrameSet);
            frameSet._workspace = o;
            frameSet._menuBar = menuBar;
            menuBar._frameSet = frameSet;
         }else if(name == EDsFrameSet.ShareBitmapFrameSet){
            var menuBar = RClass.create(FDsShareBitmapMenuBar);
            menuBar._workspace = o;
            menuBar.buildDefine(o._hPanel);
            frameSet = RConsole.find(FUiFrameConsole).findByClass(o, FDsShareBitmapFrameSet);
            frameSet._workspace = o;
            frameSet._menuBar = menuBar;
            menuBar._frameSet = frameSet;
         }else if(name == EDsFrameSet.ShareMaterialFrameSet){
            var menuBar = RClass.create(FDsShareMaterialMenuBar);
            menuBar._workspace = o;
            menuBar.buildDefine(o._hPanel);
            frameSet = RConsole.find(FUiFrameConsole).findByClass(o, FDsShareMaterialFrameSet);
            frameSet._workspace = o;
            frameSet._menuBar = menuBar;
            menuBar._frameSet = frameSet;
         }else if(name == EDsFrameSet.ShareModelFrameSet){
            var menuBar = RClass.create(FDsShareModelMenuBar);
            menuBar._workspace = o;
            menuBar.buildDefine(o._hPanel);
            frameSet = RConsole.find(FUiFrameConsole).findByClass(o, FDsShareModelFrameSet);
            frameSet._workspace = o;
            frameSet._menuBar = menuBar;
            menuBar._frameSet = frameSet;
         }else if(name == EDsFrameSet.ShareTemplateFrameSet){
            var menuBar = RClass.create(FDsShareTemplateMenuBar);
            menuBar._workspace = o;
            menuBar.buildDefine(o._hPanel);
            frameSet = RConsole.find(FUiFrameConsole).findByClass(o, FDsShareTemplateFrameSet);
            frameSet._workspace = o;
            frameSet._menuBar = menuBar;
            menuBar._frameSet = frameSet;
         }else if(name == EDsFrameSet.ShareSceneFrameSet){
            var menuBar = RClass.create(FDsShareSceneMenuBar);
            menuBar._workspace = o;
            menuBar.buildDefine(o._hPanel);
            frameSet = RConsole.find(FUiFrameConsole).findByClass(o, FDsShareSceneFrameSet);
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
      o.__base.FUiWorkspace.dispose.call(o);
   }
}
with(MO){
   MO.FDsShareResourceCatalogContent = function FDsShareResourceCatalogContent(o){
      o = RClass.inherits(this, o, FUiDataTreeView, MListenerSelected);
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
      o.__base.FUiDataTreeView.onBuild.call(o, p);
      o.lsnsClick.register(o, o.onNodeClick);
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
      o.__base.FUiDataTreeView.construct.call(o);
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
      o.__base.FUiDataTreeView.dispose.call(o);
   }
}
with(MO){
   MO.FDsShareResourceCatalogToolBar = function FDsShareResourceCatalogToolBar(o){
      o = RClass.inherits(this, o, FUiToolBar);
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
      o.__base.FUiToolBar.onBuilded.call(o, p);
      o._controlFolderOpen.addClickListener(o, o.onFolderOpenClick);
      o._controlFolderClose.addClickListener(o, o.onFolderCloseClick);
   }
   MO.FDsShareResourceCatalogToolBar_onFolderOpenClick = function FDsShareResourceCatalogToolBar_onFolderOpenClick(event){
   }
   MO.FDsShareResourceCatalogToolBar_onFolderCloseClick = function FDsShareResourceCatalogToolBar_onFolderCloseClick(event){
   }
   MO.FDsShareResourceCatalogToolBar_construct = function FDsShareResourceCatalogToolBar_construct(){
      var o = this;
      o.__base.FUiToolBar.construct.call(o);
   }
   MO.FDsShareResourceCatalogToolBar_dispose = function FDsShareResourceCatalogToolBar_dispose(){
      var o = this;
      o.__base.FUiToolBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsShareResourceFrameSet = function FDsShareResourceFrameSet(o){
      o = RClass.inherits(this, o, FUiFrameSet);
      o._frameName            = 'resource.share.resource.FrameSet';
      o._styleToolbarGround   = RClass.register(o, new AStyle('_styleToolbarGround', 'Toolbar_Ground'));
      o._styleCatalogContent  = RClass.register(o, new AStyle('_styleCatalogContent', 'Catalog_Content'));
      o._styleListContent     = RClass.register(o, new AStyle('_styleListContent', 'List_Content'));
      o._stylePropertyContent = RClass.register(o, new AStyle('_stylePropertyContent', 'Property_Content'));
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
      o.__base.FUiFrameSet.onBuilded.call(o, event);
      o._frameCatalogToolBar._hPanel.className = o.styleName('Toolbar_Ground');
      o._frameCatalogContent._hPanel.className = o.styleName('Catalog_Content');
      o._frameListToolBar._hPanel.className = o.styleName('Toolbar_Ground');
      o._frameListContent._hPanel.className = o.styleName('List_Content');
      var f = o._catalogSplitter = o.searchControl('catalogSpliter');
      f.setAlignCd(EUiAlign.Left);
      f.setSizeHtml(o._frameCatalog._hPanel);
      var control = o._catalogToolbar = RClass.create(FDsShareResourceCatalogToolBar);
      control._workspace = o._workspace;
      control._frameSet = o;
      control.buildDefine(event);
      o._frameCatalogToolBar.push(control);
      var control = o._catalogContent = RClass.create(FDsShareResourceCatalogContent);
      control._workspace = o._workspace;
      control._frameSet = o;
      control.build(event);
      o._frameCatalogContent.push(control);
      var control = o._listToolBar = RClass.create(FDsShareResourceListToolBar);
      control._workspace = o._workspace;
      control._frameSet = o;
      control.buildDefine(event);
      o._frameListToolBar.push(control);
      var control = o._listContent = RClass.create(FDsShareResourceListContent);
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
   MO.FDsShareResourceFrameSet_construct = function FDsShareResourceFrameSet_construct(){
      var o = this;
      o.__base.FUiFrameSet.construct.call(o);
      o._propertyFrames = new TDictionary();
   }
   MO.FDsShareResourceFrameSet_findPropertyFrame = function FDsShareResourceFrameSet_findPropertyFrame(p){
      var o = this;
      var f = o._propertyFrames.get(p);
      if(!f){
         var fc = RConsole.find(FFrameConsole);
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
      o.__base.FUiFrameSet.dispose.call(o);
      o._propertyFrames.dispose();
      o._propertyFrames = null;
   }
}
with(MO){
   MO.FDsShareResourceListContent = function FDsShareResourceListContent(o){
      o = RClass.inherits(this, o, FUiListView);
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
      RConsole.find(FUiDesktopConsole).hide();
   }
   MO.FDsShareResourceListContent_construct = function FDsShareResourceListContent_construct(){
      var o = this;
      o.__base.FUiListView.construct.call(o);
   }
   MO.FDsShareResourceListContent_doClickItem = function FDsShareResourceListContent_doClickItem(control){
      var o = this;
      o.__base.FUiListView.doClickItem.call(o, control);
   }
   MO.FDsShareResourceListContent_doDoubleClickItem = function FDsShareResourceListContent_doDoubleClickItem(control){
      var o = this;
      o.__base.FUiListView.doDoubleClickItem.call(o, control)
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
      RConsole.find(FUiDesktopConsole).showLoading();
      var connection = RConsole.find(FDrResourceConsole).doListShare(o._contentTypeCd, o._contentSerach, o._contentOrder, o._contentPageSize, o._contentPage);
      connection.addLoadListener(o, o.onServiceLoad);
   }
   MO.FDsShareResourceListContent_serviceResearch = function FDsShareResourceListContent_serviceResearch(){
      var o = this;
      o.serviceSearch(o._contentTypeCd, o._contentSerach, o._contentOrder, o._contentPageSize, o._contentPage);
   }
   MO.FDsShareResourceListContent_dispose = function FDsShareResourceListContent_dispose(){
      var o = this;
      o.__base.FUiListView.dispose.call(o);
   }
}
with(MO){
   MO.FDsShareResourceListItem = function FDsShareResourceListItem(o){
      o = RClass.inherits(this, o, FDsResourceListItem);
      return o;
   }
}
with(MO){
   MO.FDsShareResourceListToolBar = function FDsShareResourceListToolBar(o){
      o = RClass.inherits(this, o, FDsResourceListToolBar);
      o._frameName   = 'resource.share.resource.ListToolBar';
      o._storageCode = o._frameName;
      return o;
   }
}
with(MO){
   MO.FDsShareResourceMenuBar = function FDsShareResourceMenuBar(o){
      o = RClass.inherits(this, o, FUiMenuBar);
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
      o.__base.FUiMenuBar.onBuilded.call(o, p);
      o._controlRefresh.addClickListener(o, o.onRefreshClick);
   }
   MO.FDsShareResourceMenuBar_onRefreshClick = function FDsShareResourceMenuBar_onRefreshClick(event){
   }
   MO.FDsShareResourceMenuBar_construct = function FDsShareResourceMenuBar_construct(){
      var o = this;
      o.__base.FUiMenuBar.construct.call(o);
   }
   MO.FDsShareResourceMenuBar_dispose = function FDsShareResourceMenuBar_dispose(){
      var o = this;
      o.__base.FUiMenuBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsShareResourcePropertyContent = function FDsShareResourcePropertyContent(o){
      o = RClass.inherits(this, o, FDsResourcePropertyContent);
      return o;
   }
}
with(MO){
   MO.FDsShareResourcePropertyToolBar = function FDsShareResourcePropertyToolBar(o){
      o = RClass.inherits(this, o, FUiToolBar);
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
      o.__base.FUiToolBar.onBuilded.call(o, p);
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
      o.__base.FUiToolBar.construct.call(o);
   }
   MO.FDsShareResourcePropertyToolBar_dispose = function FDsShareResourcePropertyToolBar_dispose(){
      var o = this;
      o.__base.FUiToolBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsShareResourceTabBar = function FDsShareResourceTabBar(o){
      o = RClass.inherits(this, o, FUiTabBar);
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
      o.__base.FUiTabBar.onBuilded.call(o, p);
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
      o.__base.FUiTabBar.construct.call(o);
   }
   MO.FDsShareResourceTabBar_dispose = function FDsShareResourceTabBar_dispose(){
      var o = this;
      o.__base.FUiTabBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsShareResourceWorkspace = function FDsShareResourceWorkspace(o){
      o = RClass.inherits(this, o, FUiWorkspace);
      o._frameName            = 'resource.share.resource.Workspace';
      o._styleToolbarGround   = RClass.register(o, new AStyle('_styleToolbarGround', 'Toolbar_Ground'));
      o._styleStatusbarGround = RClass.register(o, new AStyle('_styleStatusbarGround', 'Statusbar_Ground'));
      o._styleCatalogGround   = RClass.register(o, new AStyle('_styleCatalogGround', 'Catalog_Ground'));
      o._styleCatalogToolbar  = RClass.register(o, new AStyle('_styleCatalogToolbar', 'Catalog_Toolbar'));
      o._styleSearchGround    = RClass.register(o, new AStyle('_styleSearchGround', 'Search_Ground'));
      o._styleSearchToolbar   = RClass.register(o, new AStyle('_styleCatalogToolbar', 'Search_Toolbar'));
      o._stylePreviewGround   = RClass.register(o, new AStyle('_stylePreviewGround', 'Preview_Ground'));
      o._stylePreviewToolbar  = RClass.register(o, new AStyle('_stylePreviewToolbar', 'Preview_Toolbar'));
      o._stylePropertyGround  = RClass.register(o, new AStyle('_stylePropertyGround', 'Property_Ground'));
      o._styleWorkspaceGround = RClass.register(o, new AStyle('_styleWorkspaceGround', 'Workspace_Ground'));
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
      o.__base.FUiWorkspace.onBuilded.call(o, p);
      var frame = o._frameToolBar = o.searchControl('toolbarFrame');
      frame._hPanel.className = o.styleName('Toolbar_Ground');
      var frame = o._frameBody = o.searchControl('bodyFrame');
      frame._hPanel.className = o.styleName('Catalog_Ground');
      var frame = o._frameStatusBar = o.searchControl('statusFrame');
      frame._hPanel.className = o.styleName('Statusbar_Ground');
      var hTable = RBuilder.createTable(p);
      hTable.width = '100%';
      var hRow = RBuilder.appendTableRow(hTable);
      var c = o._toolbar = RClass.create(FDsShareResourceMenuBar);
      c._workspace = o;
      c.buildDefine(p);
      var hCell = RBuilder.appendTableCell(hRow);
      hCell.appendChild(c._hPanel);
      var c = o._tabBar = RClass.create(FDsShareResourceTabBar);
      c._workspace = o;
      c.buildDefine(p);
      var hCell = RBuilder.appendTableCell(hRow);
      hCell.width = '450px';
      hCell.align = 'right';
      hCell.vAlign = 'bottom';
      hCell.appendChild(c._hPanel);
      o._frameToolBar._hPanel.appendChild(hTable);
      var frameSet = o._frameSet = RClass.create(FDsShareResourceFrameSet);
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
   MO.FDsShareResourceWorkspace_construct = function FDsShareResourceWorkspace_construct(){
      var o = this;
      o.__base.FUiWorkspace.construct.call(o);
      o._propertyFrames = new TDictionary();
   }
   MO.FDsShareResourceWorkspace_findPropertyFrame = function FDsShareResourceWorkspace_findPropertyFrame(p){
      var o = this;
      var f = o._propertyFrames.get(p);
      if(!f){
         var fc = RConsole.find(FFrameConsole);
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
      o.__base.FUiWorkspace.dispose.call(o);
      o._propertyFrames.dispose();
      o._propertyFrames = null;
   }
}
with(MO){
   MO.FDsShareBitmapCanvasContent = function FDsShareBitmapCanvasContent(o){
      o = RClass.inherits(this, o, FDsBitmapCanvasContent);
      return o;
   }
}
with(MO){
   MO.FDsShareBitmapCanvasToolBar = function FDsShareBitmapCanvasToolBar(o){
      o = RClass.inherits(this, o, FDsBitmapCanvasToolBar);
      o._frameName = 'resource.share.bitmap.CanvasToolBar';
      return o;
   }
}
with(MO){
   MO.FDsShareBitmapFrameSet = function FDsShareBitmapFrameSet(o){
      o = RClass.inherits(this, o, FDsBitmapFrameSet);
      o._frameName = 'resource.share.bitmap.FrameSet';
      o.onBuilded  = FDsShareBitmapFrameSet_onBuilded;
      return o;
   }
   MO.FDsShareBitmapFrameSet_onBuilded = function FDsShareBitmapFrameSet_onBuilded(event){
      var o = this;
      o.__base.FDsBitmapFrameSet.onBuilded.call(o, event);
      var toolbar = o._canvasToolbar = RClass.create(FDsShareBitmapCanvasToolBar);
      toolbar._frameSet = o;
      toolbar.buildDefine(event);
      o._frameCanvasToolBar.push(toolbar);
      var canvas = o._canvasContent = RClass.create(FDsBitmapCanvasContent);
      canvas._frameSet = o;
      canvas._hParent = o._frameCanvasContent._hPanel;
      canvas._hParent.style.backgroundColor = '#333333';
      canvas._hParent.style.scroll = 'auto';
      canvas.build(event);
      o._frameCanvasContent.push(canvas);
      var toolbar = o._propertyToolbar = RClass.create(FDsBitmapPropertyToolBar);
      toolbar._frameSet = o;
      toolbar.buildDefine(event);
      o._framePropertyToolBar.push(toolbar);
      var frame = o.findPropertyFrame(EDsFrame.BitmapPropertyFrame);
      o._framePropertyContent.push(frame);
   }
}
with(MO){
   MO.FDsShareBitmapMenuBar = function FDsShareBitmapMenuBar(o){
      o = RClass.inherits(this, o, FDsBitmapMenuBar);
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
      o = RClass.inherits(this, o, FDsBitmapPropertyToolBar);
      o._frameName = 'resource.share.bitmap.PropertyToolBar';
      return o;
   }
}
with(MO){
   MO.FDsShareBitmapWorkspace = function FDsShareBitmapWorkspace(o){
      o = RClass.inherits(this, o, FDsBitmapWorkspace);
      o._frameName = 'resource.share.bitmap.Workspace';
      return o;
   }
}
with(MO){
   MO.FDsShareMaterialCanvasToolBar = function FDsShareMaterialCanvasToolBar(o){
      o = RClass.inherits(this, o, FDsMaterialCanvasToolBar);
      o._frameName = 'resource.share.materail.CanvasToolBar';
      return o;
   }
}
with(MO){
   MO.FDsShareMaterialFrameSet = function FDsShareMaterialFrameSet(o){
      o = RClass.inherits(this, o, FDsMaterialFrameSet);
      o._frameName = 'resource.share.material.FrameSet';
      o.onBuilded  = FDsShareMaterialFrameSet_onBuilded;
      return o;
   }
   MO.FDsShareMaterialFrameSet_onBuilded = function FDsShareMaterialFrameSet_onBuilded(event){
      var o = this;
      o.__base.FDsMaterialFrameSet.onBuilded.call(o, event);
      var toolbar = o._toolbar = RClass.create(FDsShareMaterialMenuBar);
      toolbar._frameSet = o;
      toolbar.buildDefine(event);
      o._frameToolBar.push(toolbar);
      var catalog = o._catalogContent = RClass.create(FDsMaterialCatalogContent);
      catalog._frameSet = o;
      catalog.build(event);
      catalog.addSelectedListener(o, o.onCatalogSelected);
      o._frameCatalogContent.push(catalog);
      var toolbar = o._canvasToolbar = RClass.create(FDsShareMaterialCanvasToolBar);
      toolbar._frameSet = o;
      toolbar.buildDefine(event);
      o._frameCanvasToolBar.push(toolbar);
      var canvas = o._canvasContent = RClass.create(FDsMaterialCanvasContent);
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
      o = RClass.inherits(this, o, FDsMaterialMenuBar);
      o._frameName = 'resource.share.material.MenuBar';
      return o;
   }
}
with(MO){
   MO.FDsShareModelCanvasToolBar = function FDsShareModelCanvasToolBar(o){
      o = RClass.inherits(this, o, FDsModelCanvasToolBar);
      o._frameName = 'resource.share.model.CanvasToolBar';
      return o;
   }
}
with(MO){
   MO.FDsShareModelCatalogToolBar = function FDsShareModelCatalogToolBar(o){
      o = RClass.inherits(this, o, FDsModelCatalogToolBar);
      o._frameName = 'resource.share.model.CatalogToolBar';
      return o;
   }
}
with(MO){
   MO.FDsShareModelFrameSet = function FDsShareModelFrameSet(o){
      o = RClass.inherits(this, o, FDsModelFrameSet);
      o._frameName = 'resource.share.model.FrameSet';
      o.onBuilded  = FDsShareModelFrameSet_onBuilded;
      return o;
   }
   MO.FDsShareModelFrameSet_onBuilded = function FDsShareModelFrameSet_onBuilded(event){
      var o = this;
      o.__base.FDsModelFrameSet.onBuilded.call(o, event);
      var toolbar = o._catalogToolbar = RClass.create(FDsShareModelCatalogToolBar);
      toolbar._frameSet = o;
      toolbar.buildDefine(event);
      o._frameCatalogToolBar.push(toolbar);
      var catalog = o._catalogContent = RClass.create(FDsModelCatalogContent);
      catalog._frameSet = o;
      catalog.build(event);
      catalog.addSelectedListener(o, o.onCatalogSelected);
      o._frameCatalogContent.push(catalog);
      var toolbar = o._canvasToolbar = RClass.create(FDsShareModelCanvasToolBar);
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
}
with(MO){
   MO.FDsShareModelMenuBar = function FDsShareModelMenuBar(o){
      o = RClass.inherits(this, o, FDsModelMenuBar);
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
      o = RClass.inherits(this, o, FUiToolBar);
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
      o.__base.FUiToolBar.onBuilded.call(o, event);
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
      o.__base.FUiToolBar.construct.call(o);
   }
   MO.FDsShareTemplateCanvasToolBar_dispose = function FDsShareTemplateCanvasToolBar_dispose(){
      var o = this;
      o.__base.FUiToolBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsShareTemplateCatalogToolBar = function FDsShareTemplateCatalogToolBar(o){
      o = RClass.inherits(this, o, FDsTemplateCatalogToolBar);
      o._frameName = 'resource.share.template.CatalogToolBar';
      return o;
   }
}
with(MO){
   MO.FDsShareTemplateFrameSet = function FDsShareTemplateFrameSet(o){
      o = RClass.inherits(this, o, FDsTemplateFrameSet);
      o._frameName = 'resource.share.template.FrameSet';
      o.onBuilded  = FDsShareTemplateFrameSet_onBuilded;
      return o;
   }
   MO.FDsShareTemplateFrameSet_onBuilded = function FDsShareTemplateFrameSet_onBuilded(event){
      var o = this;
      o.__base.FDsTemplateFrameSet.onBuilded.call(o, event);
      var toolbar = o._catalogToolbar = RClass.create(FDsShareTemplateCatalogToolBar);
      toolbar._frameSet = o;
      toolbar.buildDefine(event);
      o._frameCatalogToolBar.push(toolbar);
      var catalog = o._catalogContent = RClass.create(FDsTemplateCatalogContent);
      catalog._frameSet = o;
      catalog.build(event);
      catalog.addSelectedListener(o, o.onCatalogSelected);
      o._frameCatalogContent.push(catalog);
      var toolbar = o._canvasToolbar = RClass.create(FDsShareTemplateCanvasToolBar);
      toolbar._frameSet = o;
      toolbar._workspace = o._worksapce;
      toolbar.buildDefine(event);
      o._frameCanvasToolBar.push(toolbar);
      var canvas = o._canvasContent = RClass.create(FDsTemplateCanvasContent);
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
      o = RClass.inherits(this, o, FDsTemplateMenuBar);
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
      o = RClass.inherits(this, o, FDsTemplateToolBar);
      return o;
   }
   MO.FDsShareTemplateToolBar_onBuild = function FDsShareTemplateToolBar_onBuild(p){
      var o = this;
      o.__base.FUiToolBar.onBuild.call(o, p);
      var b = o._refreshButton  = RClass.create(FUiToolButton);
      b.setLabel('刷新');
      b.setIcon('design3d.tools.refresh');
      b.build(p);
      b.addClickListener(o, o.onRefreshClick);
      o.push(b);
      var b = o._saveButton = RClass.create(FUiToolButton);
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
      RConsole.find(FE3sTemplateConsole).update(xr);
   }
   MO.FDsShareTemplateToolBar_construct = function FDsShareTemplateToolBar_construct(){
      var o = this;
      o.__base.FUiToolBar.construct.call(o);
   }
   MO.FDsShareTemplateToolBar_dispose = function FDsShareTemplateToolBar_dispose(){
      var o = this;
      o.__base.FUiToolBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsShareSceneCanvasToolBar = function FDsShareSceneCanvasToolBar(o){
      o = RClass.inherits(this, o, FDsSceneCanvasToolBar);
      o._frameName = 'resource.share.scene.CanvasToolBar';
      return o;
   }
}
with(MO){
   MO.FDsShareSceneCatalogToolBar = function FDsShareSceneCatalogToolBar(o){
      o = RClass.inherits(this, o, FDsSceneCatalogToolBar);
      o._frameName = 'resource.share.scene.CatalogToolBar';
      return o;
   }
}
with(MO){
   MO.FDsShareSceneFrameSet = function FDsShareSceneFrameSet(o){
      o = RClass.inherits(this, o, FDsSceneFrameSet);
      o._frameName = 'resource.share.scene.FrameSet';
      o.onBuilded  = FDsShareSceneFrameSet_onBuilded;
      return o;
   }
   MO.FDsShareSceneFrameSet_onBuilded = function FDsShareSceneFrameSet_onBuilded(event){
      var o = this;
      o.__base.FDsSceneFrameSet.onBuilded.call(o, event);
      var toolbar = o._catalogToolbar = RClass.create(FDsShareSceneCatalogToolBar);
      toolbar._frameSet = o;
      toolbar.buildDefine(event);
      o._frameCatalogToolBar.push(toolbar);
      var catalog = o._catalogContent = RClass.create(FDsSceneCatalogContent);
      catalog._frameSet = o;
      catalog.build(event);
      catalog.addSelectedListener(o, o.onCatalogSelected);
      o._frameCatalogContent.push(catalog);
      var toolbar = o._canvasToolbar = RClass.create(FDsShareSceneCanvasToolBar);
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
}
with(MO){
   MO.FDsShareSceneMenuBar = function FDsShareSceneMenuBar(o){
      o = RClass.inherits(this, o, FDsSceneMenuBar);
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
            var menuBar = RClass.create(FDsSystemPersistenceMenuBar);
            menuBar._workspace = o;
            menuBar.buildDefine(o._hPanel);
            frameSet = RConsole.find(FUiFrameConsole).findByClass(o, FDsSystemPersistenceFrameSet);
            frameSet._workspace = o;
            frameSet._menuBar = menuBar;
            menuBar._frameSet = frameSet;
         }else if(name == EDsFrameSet.SystemDesignListFrameSet){
            var menuBar = RClass.create(FDsSystemListMenuBar);
            menuBar._workspace = o;
            menuBar.buildDefine(o._hPanel);
            frameSet = RConsole.find(FUiFrameConsole).findByClass(o, FDsSystemListFrameSet);
            frameSet._workspace = o;
            frameSet._menuBar = menuBar;
            menuBar._frameSet = frameSet;
         }else if(name == EDsFrameSet.SystemDesignTreeFrameSet){
            var menuBar = RClass.create(FDsSystemTreeMenuBar);
            menuBar._workspace = o;
            menuBar.buildDefine(o._hPanel);
            frameSet = RConsole.find(FUiFrameConsole).findByClass(o, FDsSystemTreeFrameSet);
            frameSet._workspace = o;
            frameSet._menuBar = menuBar;
            menuBar._frameSet = frameSet;
         }else if(name == EDsFrameSet.SystemDesignFrameFrameSet){
            var menuBar = RClass.create(FDsSystemFrameMenuBar);
            menuBar._workspace = o;
            menuBar.buildDefine(o._hPanel);
            frameSet = RConsole.find(FUiFrameConsole).findByClass(o, FDsSystemFrameFrameSet);
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
   MO.FDsSystemFrameBarProperty = function FDsSystemFrameBarProperty(o){
      o = RClass.inherits(this, o, FDsSystemFrameControlProperty);
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
      o = RClass.inherits(this, o, FDsSystemFrameControlProperty);
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
      o = RClass.inherits(this, o, FUiDataTreeView, MListenerSelected);
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
      if(typeGroup == EUiTreeNodeGroup.Container){
         o._frameSet.load(label);
         o._frameSet.selectObject(typeGroup, frameName, null);
      }else if(typeGroup == EUiTreeNodeGroup.Item){
         o._frameSet.selectObject(typeGroup, frameName, label);
      }
   }
   MO.FDsSystemFrameCatalogContent_construct = function FDsSystemFrameCatalogContent_construct(){
      var o = this;
      o.__base.FUiDataTreeView.construct.call(o);
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
      if(RClass.isClass(item, FDsSceneRenderable)){
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
      o.__base.FUiDataTreeView.dispose.call(o);
   }
}
with(MO){
   MO.FDsSystemFrameCatalogToolBar = function FDsSystemFrameCatalogToolBar(o){
      o = RClass.inherits(this, o, FUiToolBar);
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
      o.__base.FUiToolBar.onBuilded.call(o, p);
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
      var dialog = RConsole.find(FUiWindowConsole).find(FDsResourceFolderDialog);
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
      RConsole.find(FUiDesktopConsole).hide();
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
      RConsole.find(FUiDesktopConsole).showUploading();
      o._activeNodeGuid = node._guid;
      var connection = RConsole.find(FDrResourceConsole).doFolderDelete(node._guid);
      connection.addLoadListener(o, o.onFolderDeleteLoad);
   }
   MO.FDsSystemFrameCatalogToolBar_onFolderDeleteClick = function FDsSystemFrameCatalogToolBar_onFolderDeleteClick(event){
      var o = this;
      var catalog = o._frameSet._catalogContent;
      var node = catalog.focusNode();
      if(!node){
         return RConsole.find(FUiMessageConsole).showInfo('请选中目录节点后，再点击操作。');
      }
      var dialog = RConsole.find(FUiMessageConsole).showConfirm('请确认是否删除当前目录？');
      dialog.addResultListener(o, o.onFolderDeleteExcute);
   }
   MO.FDsSystemFrameCatalogToolBar_onFolderPropertyClick = function FDsSystemFrameCatalogToolBar_onFolderPropertyClick(event){
      var o = this;
      var catalog = o._frameSet._catalogContent;
      var node = catalog.focusNode();
      if(!node){
         return RConsole.find(FUiMessageConsole).showInfo('请选中目录节点后，再点击操作。');
      }
      var parentLabel = null;
      if(node._parent){
         parentLabel = node._parent.label();
      }
      var dialog = RConsole.find(FUiWindowConsole).find(FDsResourceFolderDialog);
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
      o.__base.FUiToolBar.construct.call(o);
   }
   MO.FDsSystemFrameCatalogToolBar_dispose = function FDsSystemFrameCatalogToolBar_dispose(){
      var o = this;
      o.__base.FUiToolBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsSystemFrameControlProperty = function FDsSystemFrameControlProperty(o){
      o = RClass.inherits(this, o, FUiForm);
      o._activeFrame   = null;
      o._activeControl = null;
      o.onBuilded         = FDsSystemFrameControlProperty_onBuilded;
      o.onDataChanged     = FDsSystemFrameControlProperty_onDataChanged;
      o.construct         = FDsSystemFrameControlProperty_construct;
      o.loadObject        = FDsSystemFrameControlProperty_loadObject;
      o.dispose           = FDsSystemFrameControlProperty_dispose;
      return o;
   }
   MO.FDsSystemFrameControlProperty_onBuilded = function FDsSystemFrameControlProperty_onBuilded(p){
      var o = this;
      o.__base.FUiForm.onBuilded.call(o, p);
      o._controlSize.addDataChangedListener(o, o.onDataChanged);
   }
   MO.FDsSystemFrameControlProperty_onDataChanged = function FDsSystemFrameControlProperty_onDataChanged(event){
      var o  = this;
      var frame = o._activeFrame;
      var control = o._activeControl;
      var size = o._controlSize.get();
      control.size().set(size.x, size.y);
      frame.build();
   }
   MO.FDsSystemFrameControlProperty_construct = function FDsSystemFrameControlProperty_construct(){
      var o = this;
      o.__base.FUiForm.construct.call(o);
   }
   MO.FDsSystemFrameControlProperty_loadObject = function FDsSystemFrameControlProperty_loadObject(frame, control){
      var o = this;
      o._activeFrame = frame;
      o._activeControl = control;
      o._controlType.set(RClass.name(control));
      o._controlName.set(control.name());
      o._controlLabel.set(control.label());
      var location = control.location();
      o._controlLocation.set(location);
      var size = control.size();
      o._controlSize.set(size);
   }
   MO.FDsSystemFrameControlProperty_dispose = function FDsSystemFrameControlProperty_dispose(){
      var o = this;
      o.__base.FUiForm.dispose.call(o);
   }
}
with(MO){
   MO.FDsSystemFrameFrameSet = function FDsSystemFrameFrameSet(o){
      o = RClass.inherits(this, o, FDsFrameSet);
      o._styleToolbarGround   = RClass.register(o, new AStyle('_styleToolbarGround', 'Toolbar_Ground'));
      o._styleCatalogContent  = RClass.register(o, new AStyle('_styleCatalogContent', 'Catalog_Content'));
      o._styleSpaceContent    = RClass.register(o, new AStyle('_styleSpaceContent', 'Space_Content'));
      o._stylePropertyContent = RClass.register(o, new AStyle('_stylePropertyContent', 'Property_Content'));
      o._frameName            = 'system.design.frame.FrameSet';
      o._frameCatalog         = null;
      o._frameCatalogToolbar  = null;
      o._frameCatalogContent  = null;
      o._frameSpace           = null;
      o._frameSpaceToolbar    = null;
      o._frameSpaceContent    = null;
      o._framePreview         = null;
      o._framePreviewToolbar  = null;
      o._framePreviewContent  = null;
      o.onBuilded             = FDsSystemFrameFrameSet_onBuilded;
      o.construct             = FDsSystemFrameFrameSet_construct;
      o.selectObject          = FDsSystemFrameFrameSet_selectObject;
      o.load                  = FDsSystemFrameFrameSet_load;
      o.dispose               = FDsSystemFrameFrameSet_dispose;
      return o;
   }
   MO.FDsSystemFrameFrameSet_onBuilded = function FDsSystemFrameFrameSet_onBuilded(event){
      var o = this;
      o.__base.FDsFrameSet.onBuilded.call(o, event);
      o._frameCatalogToolBar._hPanel.className = o.styleName('Toolbar_Ground');
      o._frameCatalogContent._hPanel.className = o.styleName('Catalog_Content');
      o._frameSpaceToolBar._hPanel.className = o.styleName('Toolbar_Ground');
      o._frameSpaceContent._hPanel.className = o.styleName('Space_Content');
      o._framePropertyToolBar._hPanel.className = o.styleName('Toolbar_Ground');
      o._framePropertyContent._hPanel.className = o.styleName('Property_Content');
      var spliter = o._catalogSplitter = o.searchControl('catalogSpliter');
      spliter.setAlignCd(EUiAlign.Left);
      spliter.setSizeHtml(o._frameCatalog._hPanel);
      var spliter = o._propertySpliter = o.searchControl('propertySpliter');
      spliter.setAlignCd(EUiAlign.Right);
      spliter.setSizeHtml(o._frameProperty._hPanel);
      var control = o._catalogToolbar = RClass.create(FDsSystemFrameCatalogToolBar);
      control._workspace = o._workspace;
      control._frameSet = o;
      control.buildDefine(event);
      o._frameCatalogToolBar.push(control);
      var control = o._catalogContent = RClass.create(FDsSystemFrameCatalogContent);
      control._workspace = o._workspace;
      control._frameSet = o;
      control.build(event);
      o._frameCatalogContent.push(control);
      var control = o._spaceToolBar = RClass.create(FDsSystemFrameSpaceToolBar);
      control._workspace = o._workspace;
      control._frameSet = o;
      control.buildDefine(event);
      o._frameSpaceToolBar.push(control);
      var control = o._spaceContent = RClass.create(FDsSystemFrameSpaceContent);
      control._workspace = o._workspace;
      control._frameSet = o;
      control.build(o._frameSpaceContent._hPanel);
      o._frameSpaceContent.push(control);
      var control = o._propertyToolbar = RClass.create(FDsSystemFramePropertyToolBar);
      control._workspace = o._workspace;
      control._frameSet = o;
      control.buildDefine(event);
      o._framePropertyToolBar.push(control);
   }
   MO.FDsSystemFrameFrameSet_construct = function FDsSystemFrameFrameSet_construct(){
      var o = this;
      o.__base.FDsFrameSet.construct.call(o);
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
      if(typeGroup == EUiTreeNodeGroup.Container){
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
      o.__base.FDsFrameSet.dispose.call(o);
   }
}
with(MO){
   MO.FDsSystemFrameMenuBar = function FDsSystemFrameMenuBar(o){
      o = RClass.inherits(this, o, FUiMenuBar);
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
      o.__base.FUiMenuBar.onBuilded.call(o, p);
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
      o = RClass.inherits(this, o, FDsSystemFrameControlProperty);
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
      o = RClass.inherits(this, o, FDsCatalog);
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
      o = RClass.inherits(this, o, FUiToolBar);
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
      o.__base.FUiToolBar.onBuilded.call(o, p);
   }
   MO.FDsSystemFramePropertyToolBar_onUpdateClick = function FDsSystemFramePropertyToolBar_onUpdateClick(event){
      var o = this;
      var guid = o._workspace._activeProjectGuid;
      window.location = 'Project.wa?do=detail&guid=' + guid;
   }
   MO.FDsSystemFramePropertyToolBar_construct = function FDsSystemFramePropertyToolBar_construct(){
      var o = this;
      o.__base.FUiToolBar.construct.call(o);
   }
   MO.FDsSystemFramePropertyToolBar_dispose = function FDsSystemFramePropertyToolBar_dispose(){
      var o = this;
      o.__base.FUiToolBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsSystemFrameSpaceContent = function FDsSystemFrameSpaceContent(o){
      o = RClass.inherits(this, o, FDsCanvas);
      o._scaleRate          = 1;
      o._optionAlpha        = false;
      o._activeStage        = RClass.register(o, new AGetter('_activeStage'));
      o._activeFrame        = null;
      o._activeControls     = null;
      o._capturePosition    = null;
      o._captureRotation    = null;
      o.onEnterFrame        = FDsSystemFrameSpaceContent_onEnterFrame;
      o.onMouseCaptureStart = FDsSystemFrameSpaceContent_onMouseCaptureStart;
      o.onMouseCapture      = FDsSystemFrameSpaceContent_onMouseCapture;
      o.onMouseCaptureStop  = FDsSystemFrameSpaceContent_onMouseCaptureStop;
      o.onResize            = FDsSystemFrameSpaceContent_onResize;
      o.onProcess           = FDsSystemFrameSpaceContent_onProcess;
      o.onKeyDown           = FDsSystemFrameSpaceContent_onKeyDown;
      o.oeResize            = FDsSystemFrameSpaceContent_oeResize;
      o.construct           = FDsSystemFrameSpaceContent_construct;
      o.build               = FDsSystemFrameSpaceContent_build;
      o.controlAction       = FDsSystemFrameSpaceContent_controlAction;
      o.selectControl       = FDsSystemFrameSpaceContent_selectControl;
      o.loadFrame           = FDsSystemFrameSpaceContent_loadFrame;
      o.dispose             = FDsSystemFrameSpaceContent_dispose;
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
      var kw = RKeyboard.isPress(EKeyCode.W);
      var ks = RKeyboard.isPress(EKeyCode.S);
      if(kw && !ks){
         c.doWalk(d);
      }
      if(!kw && ks){
         c.doWalk(-d);
      }
      var ka = RKeyboard.isPress(EKeyCode.A);
      var kd = RKeyboard.isPress(EKeyCode.D);
      if(ka && !kd){
         c.doYaw(r);
      }
      if(!ka && kd){
         c.doYaw(-r);
      }
      var kq = RKeyboard.isPress(EKeyCode.Q);
      var ke = RKeyboard.isPress(EKeyCode.E);
      if(kq && !ke){
         c.doFly(d);
      }
      if(!kq && ke){
         c.doFly(-d);
      }
      var kz = RKeyboard.isPress(EKeyCode.Z);
      var kw = RKeyboard.isPress(EKeyCode.X);
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
      var st = RConsole.find(FG3dTechniqueConsole).find(o._graphicContext, FG3dSelectTechnique);
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
      o.__base.FDsCanvas.onResize.call(o, event);
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
         case EKeyCode.A:
            location.x--;
            return true;
         case EKeyCode.W:
            location.y--;
            return true;
         case EKeyCode.D:
            location.x++;
            return true;
         case EKeyCode.S:
            location.y++;
            return true;
         case EKeyCode.J:
            size.width--;
            return true;
         case EKeyCode.I:
            size.height--;
            return true;
         case EKeyCode.L:
            size.width++;
            return true;
         case EKeyCode.K:
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
   MO.FDsSystemFrameSpaceContent_oeResize = function FDsSystemFrameSpaceContent_oeResize(p){
      var o = this;
      o.__base.FDsCanvas.oeResize.call(o, p);
      var hp = o._hPanel;
      var w = hp.offsetWidth;
      var h = hp.offsetHeight;
      var s = o._activeSpace;
      if(s){
         var cp = s.camera().projection();
         cp.size().set(w, h);
         cp.update();
      }
      return EEventStatus.Stop;
   }
   MO.FDsSystemFrameSpaceContent_construct = function FDsSystemFrameSpaceContent_construct(){
      var o = this;
      o.__base.FDsCanvas.construct.call(o);
      o._rotation = new SVector3();
      o._activeControls = new TObjects();
      o._capturePosition = new SPoint2();
      o._captureRotation = new SVector3();
      RWindow.lsnsKeyDown.register(o, o.onKeyDown);
   }
   MO.FDsSystemFrameSpaceContent_build = function FDsSystemFrameSpaceContent_build(hPanel){
      var o = this;
      o.__base.FDsCanvas.build.call(o, hPanel);
      o.setPanel(hPanel);
      var stage = o._activeStage = MO.RClass.create(MO.FDsStage);
      stage.linkGraphicContext(o);
      var region = stage.region();
      region.linkGraphicContext(o);
      region.backgroundColor().set(0.5, 0.5, 0.5, 1.0);
      stage.selectTechnique(o, FE3dGeneralTechnique);
      var camera = region.camera();
      var projection = camera.projection();
      projection.size().set(hPanel.offsetWidth, hPanel.offsetHeight);
      projection.update();
      camera.position().set(0, 0, -10);
      camera.lookAt(0, 0, 0);
      camera.update();
      stage.addEnterFrameListener(o, o.onProcess);
      RStage.register('design.frame.stage', stage);
   }
   MO.FDsSystemFrameSpaceContent_selectControl = function FDsSystemFrameSpaceContent_selectControl(control){
      var o = this;
      var controls = o._activeControls;
      controls.clear();
      controls.push(control);
   }
   MO.FDsSystemFrameSpaceContent_loadFrame = function FDsSystemFrameSpaceContent_loadFrame(code){
      var o = this;
      var context = o._graphicContext;
      var stage = o._activeStage;
      var layer = stage.faceLayer();
      var frame = o._activeFrame;
      if(frame){
         var renderable = frame.renderable();
         layer.removeRenderable(renderable);
         o._activeFrame = null;
      }
      var frameConsole = MO.RConsole.find(MO.FGuiFrameConsole);
      var frame = o._activeFrame = frameConsole.get(context, code);
      var renderable = frame.renderable();
      renderable.setLocation(10, 10);
      layer.pushRenderable(renderable);
   }
   MO.FDsSystemFrameSpaceContent_dispose = function FDsSystemFrameSpaceContent_dispose(){
      var o = this;
      var v = o._rotation;
      if(v){
         v.dispose();
         o._rotation = null;
      }
      o.__base.FDsCanvas.dispose.call(o);
   }
}
with(MO){
   MO.FDsSystemFrameSpaceToolBar = function FDsSystemFrameSpaceToolBar(o){
      o = RClass.inherits(this, o, FUiToolBar);
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
      o.__base.FUiToolBar.onBuilded.call(o, p);
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
      var dialog = RConsole.find(FUiWindowConsole).find(FDsResourceFolderDialog);
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
      RConsole.find(FUiDesktopConsole).hide();
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
      RConsole.find(FUiDesktopConsole).showUploading();
      o._activeNodeGuid = node._guid;
      var connection = RConsole.find(FDrResourceConsole).doFolderDelete(node._guid);
      connection.addLoadListener(o, o.onFolderDeleteLoad);
   }
   MO.FDsSystemFrameSpaceToolBar_onFolderDeleteClick = function FDsSystemFrameSpaceToolBar_onFolderDeleteClick(event){
      var o = this;
      var catalog = o._frameSet._catalogContent;
      var node = catalog.focusNode();
      if(!node){
         return RConsole.find(FUiMessageConsole).showInfo('请选中目录节点后，再点击操作。');
      }
      var dialog = RConsole.find(FUiMessageConsole).showConfirm('请确认是否删除当前目录？');
      dialog.addResultListener(o, o.onFolderDeleteExcute);
   }
   MO.FDsSystemFrameSpaceToolBar_onFolderPropertyClick = function FDsSystemFrameSpaceToolBar_onFolderPropertyClick(event){
      var o = this;
      var catalog = o._frameSet._catalogContent;
      var node = catalog.focusNode();
      if(!node){
         return RConsole.find(FUiMessageConsole).showInfo('请选中目录节点后，再点击操作。');
      }
      var parentLabel = null;
      if(node._parent){
         parentLabel = node._parent.label();
      }
      var dialog = RConsole.find(FUiWindowConsole).find(FDsResourceFolderDialog);
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
      o.__base.FUiToolBar.construct.call(o);
   }
   MO.FDsSystemFrameSpaceToolBar_dispose = function FDsSystemFrameSpaceToolBar_dispose(){
      var o = this;
      o.__base.FUiToolBar.dispose.call(o);
   }
}
