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
