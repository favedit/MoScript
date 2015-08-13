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
