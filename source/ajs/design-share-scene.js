function FDsShareSceneCanvasContent(o){
   o = RClass.inherits(this, o, FDsSceneCanvasContent);
   return o;
}
function FDsShareSceneCanvasToolBar(o){
   o = RClass.inherits(this, o, FDsSceneCanvasToolBar);
   o._frameName = 'resource.share.scene.CanvasToolBar';
   return o;
}
function FDsShareSceneCatalogContent(o){
   o = RClass.inherits(this, o, FDsSceneCatalogContent);
   return o;
}
function FDsShareSceneCatalogToolBar(o){
   o = RClass.inherits(this, o, FDsSceneCatalogToolBar);
   o._frameName = 'resource.share.scene.CatalogToolBar';
   return o;
}
function FDsShareSceneFrameSet(o){
   o = RClass.inherits(this, o, FDsSceneFrameSet);
   o._frameName = 'resource.share.scene.FrameSet';
   o.onBuilded  = FDsShareSceneFrameSet_onBuilded;
   return o;
}
function FDsShareSceneFrameSet_onBuilded(event){
   var o = this;
   o.__base.FDsSceneFrameSet.onBuilded.call(o, event);
   var toolbar = o._catalogToolbar = RClass.create(FDsShareSceneCatalogToolBar);
   toolbar._frameSet = o;
   toolbar.buildDefine(event);
   o._frameCatalogToolBar.push(toolbar);
   var catalog = o._catalogContent = RClass.create(FDsShareSceneCatalogContent);
   catalog._frameSet = o;
   catalog.build(event);
   catalog.addSelectedListener(o, o.onCatalogSelected);
   o._frameCatalogContent.push(catalog);
   var toolbar = o._canvasToolbar = RClass.create(FDsShareSceneCanvasToolBar);
   toolbar._frameSet = o;
   toolbar.buildDefine(event);
   o._frameCanvasToolBar.push(toolbar);
   var canvas = o._canvasContent = RClass.create(FDsShareSceneCanvasContent);
   canvas._frameSet = o;
   canvas._toolbar = o._canvasToolbar;
   canvas._hParent = o._frameCanvasContent._hPanel;
   canvas._hParent.style.backgroundColor = '#333333';
   canvas._hParent.style.scroll = 'auto';
   canvas.addLoadListener(o, o.onDataLoaded);
   canvas.build(event);
   o._frameCanvasContent.push(canvas);
   var toolbar = o._propertyToolbar = RClass.create(FDsShareScenePropertyToolBar);
   toolbar._frameSet = o;
   toolbar.buildDefine(event);
   o._framePropertyToolBar.push(toolbar);
}
function FDsShareSceneMenuBar(o){
   o = RClass.inherits(this, o, FDsSceneMenuBar);
   o._frameName = 'resource.share.scene.MenuBar';
   o.onBuilded  = FDsShareSceneMenuBar_onBuilded;
   return o;
}
function FDsShareSceneMenuBar_onBuilded(p){
   var o = this;
   o.__base.FDsSceneMenuBar.onBuilded.call(o, p);
   o._controlExecute.addClickListener(o, o.onExecuteClick);
}
function FDsShareScenePropertyToolBar(o){
   o = RClass.inherits(this, o, FDsScenePropertyToolBar);
   o._frameName = 'resource.share.scene.PropertyToolBar';
   return o;
}
function FDsShareSceneWorkspace(o){
   o = RClass.inherits(this, o, FDsSceneWorkspace);
   o._frameName = 'resource.share.scene.Workspace';
   return o;
}
