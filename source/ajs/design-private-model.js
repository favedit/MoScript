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
