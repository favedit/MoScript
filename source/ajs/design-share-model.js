with(MO){
   MO.FDsShareModelCanvasToolBar = function FDsShareModelCanvasToolBar(o){
      o = MO.Class.inherits(this, o, FDsModelCanvasToolBar);
      o._frameName = 'resource.share.model.CanvasToolBar';
      return o;
   }
}
with(MO){
   MO.FDsShareModelCatalogToolBar = function FDsShareModelCatalogToolBar(o){
      o = MO.Class.inherits(this, o, FDsModelCatalogToolBar);
      o._frameName = 'resource.share.model.CatalogToolBar';
      return o;
   }
}
with(MO){
   MO.FDsShareModelFrameSet = function FDsShareModelFrameSet(o){
      o = MO.Class.inherits(this, o, FDsModelFrameSet);
      o._frameName = 'resource.share.model.FrameSet';
      o.onBuilded  = FDsShareModelFrameSet_onBuilded;
      return o;
   }
   MO.FDsShareModelFrameSet_onBuilded = function FDsShareModelFrameSet_onBuilded(event){
      var o = this;
      o.__base.FDsModelFrameSet.onBuilded.call(o, event);
      var toolbar = o._catalogToolbar = MO.Class.create(FDsShareModelCatalogToolBar);
      toolbar._frameSet = o;
      toolbar.buildDefine(event);
      o._frameCatalogToolBar.push(toolbar);
      var catalog = o._catalogContent = MO.Class.create(FDsModelCatalogContent);
      catalog._frameSet = o;
      catalog.build(event);
      catalog.addSelectedListener(o, o.onCatalogSelected);
      o._frameCatalogContent.push(catalog);
      var toolbar = o._canvasToolbar = MO.Class.create(FDsShareModelCanvasToolBar);
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
   MO.FDsShareModelMenuBar = function FDsShareModelMenuBar(o){
      o = MO.Class.inherits(this, o, FDsModelMenuBar);
      o._frameName = 'resource.share.model.MenuBar';
      o.onBuilded  = FDsShareModelMenuBar_onBuilded;
      return o;
   }
   MO.FDsShareModelMenuBar_onBuilded = function FDsShareModelMenuBar_onBuilded(p){
      var o = this;
      o.__base.FDsModelMenuBar.onBuilded.call(o, p);
   }
}
