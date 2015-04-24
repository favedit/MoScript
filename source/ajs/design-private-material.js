function FDsPrivateMaterialCanvasContent(o){
   o = RClass.inherits(this, o, FDsMaterialCanvasContent);
   return o;
}
function FDsPrivateMaterialCanvasToolBar(o){
   o = RClass.inherits(this, o, FDsMaterialCanvasToolBar);
   o._frameName = 'resource.private.material.CanvasToolBar';
   return o;
}
function FDsPrivateMaterialCatalogContent(o){
   o = RClass.inherits(this, o, FDsMaterialCatalogContent);
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
   var catalog = o._catalogContent = RClass.create(FDsPrivateMaterialCatalogContent);
   catalog._frameSet = o;
   catalog.build(event);
   o._frameCatalogContent.push(catalog);
   var toolbar = o._canvasToolbar = RClass.create(FDsPrivateMaterialCanvasToolBar);
   toolbar._frameSet = o;
   toolbar.buildDefine(event);
   o._frameCanvasToolBar.push(toolbar);
   var canvas = o._canvasContent = RClass.create(FDsPrivateMaterialCanvasContent);
   canvas._frameSet = o;
   canvas._toolbar = o._canvasToolbar;
   canvas._hParent = o._frameCanvasContent._hPanel;
   canvas._hParent.style.backgroundColor = '#333333';
   canvas._hParent.style.scroll = 'auto';
   canvas.addLoadListener(o, o.onDataLoaded);
   canvas.build(event);
   o._frameCanvasContent.push(canvas);
}
function FDsPrivateMaterialMenuBar(o){
   o = RClass.inherits(this, o, FDsMaterialMenuBar);
   o._frameName = 'resource.private.material.MenuBar';
   return o;
}
function FDsPrivateMaterialWorkspace(o){
   o = RClass.inherits(this, o, FDsMaterialWorkspace);
   o._frameName = 'resource.private.material.Workspace';
   return o;
}
