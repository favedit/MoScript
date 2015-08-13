with(MO){
   MO.FDsPrivateMaterialCanvasToolBar = function FDsPrivateMaterialCanvasToolBar(o){
      o = MO.Class.inherits(this, o, FDsMaterialCanvasToolBar);
      o._frameName = 'resource.private.material.CanvasToolBar';
      return o;
   }
}
with(MO){
   MO.FDsPrivateMaterialCatalogToolBar = function FDsPrivateMaterialCatalogToolBar(o){
      o = MO.Class.inherits(this, o, FDsMaterialCatalogToolBar);
      o._frameName = 'resource.private.material.CatalogToolBar';
      return o;
   }
}
with(MO){
   MO.FDsPrivateMaterialFrameSet = function FDsPrivateMaterialFrameSet(o){
      o = MO.Class.inherits(this, o, FDsMaterialFrameSet);
      o._frameName = 'resource.private.material.FrameSet';
      o.onBuilded  = FDsPrivateMaterialFrameSet_onBuilded;
      return o;
   }
   MO.FDsPrivateMaterialFrameSet_onBuilded = function FDsPrivateMaterialFrameSet_onBuilded(event){
      var o = this;
      o.__base.FDsMaterialFrameSet.onBuilded.call(o, event);
      var toolbar = o._catalogToolBar = MO.Class.create(FDsPrivateMaterialCatalogToolBar);
      toolbar._frameSet = o;
      toolbar.buildDefine(event);
      o._frameCatalogToolBar.push(toolbar);
      var catalog = o._catalogContent = MO.Class.create(FDsMaterialCatalogContent);
      catalog._frameSet = o;
      catalog.build(event);
      o._frameCatalogContent.push(catalog);
      var toolbar = o._canvasToolBar = MO.Class.create(FDsPrivateMaterialCanvasToolBar);
      toolbar._frameSet = o;
      toolbar.buildDefine(event);
      o._frameCanvasToolBar.push(toolbar);
      var toolbar = o._propertyToolBar = MO.Class.create(FDsMaterialPropertyToolBar);
      toolbar._frameSet = o;
      toolbar.buildDefine(event);
      o._framePropertyToolBar.push(toolbar);
   }
}
with(MO){
   MO.FDsPrivateMaterialMenuBar = function FDsPrivateMaterialMenuBar(o){
      o = MO.Class.inherits(this, o, FDsMaterialMenuBar);
      o._frameName = 'resource.private.material.MenuBar';
      return o;
   }
}
