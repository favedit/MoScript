with(MO){
   MO.FDsShareMaterialCanvasToolBar = function FDsShareMaterialCanvasToolBar(o){
      o = MO.Class.inherits(this, o, FDsMaterialCanvasToolBar);
      o._frameName = 'resource.share.materail.CanvasToolBar';
      return o;
   }
}
with(MO){
   MO.FDsShareMaterialFrameSet = function FDsShareMaterialFrameSet(o){
      o = MO.Class.inherits(this, o, FDsMaterialFrameSet);
      o._frameName = 'resource.share.material.FrameSet';
      o.onBuilded  = FDsShareMaterialFrameSet_onBuilded;
      return o;
   }
   MO.FDsShareMaterialFrameSet_onBuilded = function FDsShareMaterialFrameSet_onBuilded(event){
      var o = this;
      o.__base.FDsMaterialFrameSet.onBuilded.call(o, event);
      var toolbar = o._toolbar = MO.Class.create(FDsShareMaterialMenuBar);
      toolbar._frameSet = o;
      toolbar.buildDefine(event);
      o._frameToolBar.push(toolbar);
      var catalog = o._catalogContent = MO.Class.create(FDsMaterialCatalogContent);
      catalog._frameSet = o;
      catalog.build(event);
      catalog.addSelectedListener(o, o.onCatalogSelected);
      o._frameCatalogContent.push(catalog);
      var toolbar = o._canvasToolbar = MO.Class.create(FDsShareMaterialCanvasToolBar);
      toolbar._frameSet = o;
      toolbar.buildDefine(event);
      o._frameCanvasToolBar.push(toolbar);
      var canvas = o._canvasContent = MO.Class.create(FDsMaterialCanvasContent);
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
      o = MO.Class.inherits(this, o, FDsMaterialMenuBar);
      o._frameName = 'resource.share.material.MenuBar';
      return o;
   }
}
