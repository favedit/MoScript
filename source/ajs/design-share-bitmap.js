function FDsShareBitmapCanvasContent(o){
   o = RClass.inherits(this, o, FDsBitmapCanvasContent);
   return o;
}
function FDsShareBitmapCanvasToolBar(o){
   o = RClass.inherits(this, o, FDsBitmapCanvasToolBar);
   o._frameName = 'resource.share.bitmap.CanvasToolBar';
   return o;
}
function FDsShareBitmapCatalogContent(o){
   o = RClass.inherits(this, o, FDsBitmapCatalogContent);
   return o;
}
function FDsShareBitmapCatalogToolBar(o){
   o = RClass.inherits(this, o, FDsBitmapCatalogToolBar);
   o._frameName = 'resource.share.bitmap.CatalogToolBar';
   return o;
}
function FDsShareBitmapFrameSet(o){
   o = RClass.inherits(this, o, FDsBitmapFrameSet);
   o._frameName = 'resource.share.bitmap.FrameSet';
   o.onBuilded  = FDsShareBitmapFrameSet_onBuilded;
   return o;
}
function FDsShareBitmapFrameSet_onBuilded(p){
   var o = this;
   o.__base.FDsBitmapFrameSet.onBuilded.call(o, p);
   var frame = o._catalogToolbarFrame = o.searchControl('catalogToolbarFrame');
   frame._hPanel.className = o.styleName('ToolBar_Ground');
   var toolbar = o._catalogToolbar = RClass.create(FDsShareBitmapCatalogToolBar);
   toolbar._frameSet = o;
   toolbar._workspace = o._worksapce;
   toolbar.buildDefine(p);
   frame.push(toolbar);
   var frame = o._catalogContentFrame = o.searchControl('catalogContentFrame');
   var catalogContent = o._catalogContent = RClass.create(FDsShareBitmapCatalogContent);
   catalogContent._frameSet = o;
   catalogContent._workspace = o._worksapce;
   catalogContent.build(p);
   frame.push(catalogContent);
   var frame = o._canvasToolbarFrame = o.searchControl('canvasToolbarFrame');
   frame._hPanel.className = o.styleName('ToolBar_Ground');
   var toolbar = o._canvasToolbar = RClass.create(FDsShareBitmapCanvasToolBar);
   toolbar._frameSet = o;
   toolbar._workspace = o._worksapce;
   toolbar.buildDefine(p);
   frame.push(toolbar);
   var frame = o._canvasContentFrame = o.searchControl('canvasContentFrame');
   var canvas = o._canvasContent = RClass.create(FDsShareBitmapCanvasContent);
   canvas._frameSet = o;
   canvas._workspace = o._workspace;
   canvas._toolbar = o._canvasToolbar;
   canvas._hParent = frame._hPanel;
   canvas._hParent.style.backgroundColor = '#333333';
   canvas._hParent.style.scroll = 'auto';
   canvas.build(p);
   frame.push(canvas);
   var frame = o._propertyToolbarFrame = o.searchControl('propertyToolbarFrame');
   frame._hPanel.className = o.styleName('ToolBar_Ground');
   var toolbar = o._propertyToolbar = RClass.create(FDsShareBitmapPropertyToolBar);
   toolbar._frameSet = o;
   toolbar._workspace = o._worksapce;
   toolbar.buildDefine(p);
   frame.push(toolbar);
}
function FDsShareBitmapMenuBar(o){
   o = RClass.inherits(this, o, FDsBitmapMenuBar);
   o._frameName = 'resource.share.bitmap.MenuBar';
   return o;
}
function FDsShareBitmapPropertyToolBar(o){
   o = RClass.inherits(this, o, FDsBitmapPropertyToolBar);
   o._frameName = 'resource.share.bitmap.CatalogToolBar';
   return o;
}
function FDsShareBitmapWorkspace(o){
   o = RClass.inherits(this, o, FDsBitmapWorkspace);
   o._frameName = 'resource.share.bitmap.Workspace';
   return o;
}
