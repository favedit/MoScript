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
