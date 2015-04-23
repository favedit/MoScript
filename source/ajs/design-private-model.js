function FDsPrivateModelCanvasContent(o){
   o = RClass.inherits(this, o, FDsModelCanvasContent);
   return o;
}
function FDsPrivateModelCanvasToolBar(o){
   o = RClass.inherits(this, o, FDsModelCanvasToolBar);
   o._frameName = 'resource.private.model.CanvasToolBar';
   return o;
}
function FDsPrivateModelCatalogContent(o){
   o = RClass.inherits(this, o, FDsModelCatalogContent);
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
   var toolbar = o._catalogToolbar = RClass.create(FDsPrivateModelCatalogToolBar);
   toolbar._frameSet = o;
   toolbar.buildDefine(event);
   o._frameCatalogToolBar.push(toolbar);
   var catalog = o._catalogContent = RClass.create(FDsPrivateModelCatalogContent);
   catalog._frameSet = o;
   catalog.build(event);
   catalog.addSelectedListener(o, o.onCatalogSelected);
   o._frameCatalogContent.push(catalog);
   var toolbar = o._canvasToolbar = RClass.create(FDsPrivateModelCanvasToolBar);
   toolbar._frameSet = o;
   toolbar.buildDefine(event);
   o._frameCanvasToolBar.push(toolbar);
   var canvas = o._canvasContent = RClass.create(FDsPrivateModelCanvasContent);
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
function FDsPrivateModelWorkspace(o){
   o = RClass.inherits(this, o, FDsModelWorkspace);
   o._frameName = 'resource.private.model.Workspace';
   return o;
}
