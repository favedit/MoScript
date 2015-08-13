with(MO){
   MO.FDsPrivateTemplateCanvasToolBar = function FDsPrivateTemplateCanvasToolBar(o){
      o = MO.Class.inherits(this, o, FDsTemplateCanvasToolBar);
      o._frameName      = 'resource.private.template.CanvasToolBar';
      return o;
   }
}
with(MO){
   MO.FDsPrivateTemplateCatalogToolBar = function FDsPrivateTemplateCatalogToolBar(o){
      o = MO.Class.inherits(this, o, FDsTemplateCatalogToolBar);
      o._frameName = 'resource.private.template.CatalogToolBar';
      return o;
   }
}
MO.FDsPrivateTemplateFrameSet = function FDsPrivateTemplateFrameSet(o){
   o = MO.Class.inherits(this, o, MO.FDsTemplateFrameSet);
   o._frameName        = 'resource.private.template.FrameSet';
   o.onBuilded         = MO.FDsPrivateTemplateFrameSet_onBuilded;
   o.onCatalogSelected = MO.FDsPrivateTemplateFrameSet_onCatalogSelected;
   return o;
}
MO.FDsPrivateTemplateFrameSet_onBuilded = function FDsPrivateTemplateFrameSet_onBuilded(event){
   var o = this;
   o.__base.FDsTemplateFrameSet.onBuilded.call(o, event);
   var toolbar = o._catalogToolBar = MO.Class.create(MO.FDsPrivateTemplateCatalogToolBar);
   toolbar._frameSet = o;
   toolbar.buildDefine(event);
   o._frameCatalogToolBar.push(toolbar);
   var catalog = o._catalogContent = MO.Class.create(MO.FDsTemplateCatalogContent);
   catalog._frameSet = o;
   catalog.build(event);
   catalog.addSelectedListener(o, o.onCatalogSelected);
   o._frameCatalogContent.push(catalog);
   var toolbar = o._canvasToolBar = MO.Class.create(MO.FDsPrivateTemplateCanvasToolBar);
   toolbar._frameSet = o;
   toolbar.buildDefine(event);
   o._frameCanvasToolBar.push(toolbar);
   var canvas = o._canvasContent = MO.Class.create(MO.FDsTemplateCanvasContent);
   canvas._frameSet = o;
   canvas._toolbar = o._canvasToolbar;
   canvas._hParent = o._frameCanvasContent._hPanel;
   canvas._hParent.style.scroll = 'auto';
   canvas.addLoadListener(o, o.onDataLoaded);
   canvas.build(event);
   o._frameCanvasContent.push(canvas);
}
MO.FDsPrivateTemplateFrameSet_onCatalogSelected = function FDsPrivateTemplateFrameSet_onCatalogSelected(select, flag){
   var o = this;
   var space = o._activeSpace;
   if(!space){
      return;
   }
   o.hidePropertyFrames();
   if(MO.Class.isClass(select, MO.FE3dSpace)){
      var frame = o.findPropertyFrame(MO.EDsFrame.CommonSpacePropertyFrame);
      frame.show();
      frame.loadObject(space, select);
   }else if(MO.Class.isClass(select, MO.FG3dTechnique)){
      var frame = o.findPropertyFrame(MO.EDsFrame.CommonTechniquePropertyFrame);
      frame.show();
      frame.loadObject(space, select);
   }else if(MO.Class.isClass(select, MO.FE3dRegion)){
      var frame = o.findPropertyFrame(MO.EDsFrame.CommonRegionPropertyFrame);
      frame.show();
      frame.loadObject(space, select);
   }else if(MO.Class.isClass(select, MO.FE3dCamera)){
      var frame = o.findPropertyFrame(MO.EDsFrame.CommonCameraPropertyFrame);
      frame.show();
      frame.loadObject(space, select);
   }else if(MO.Class.isClass(select, MO.FG3dDirectionalLight)){
      var frame = o.findPropertyFrame(MO.EDsFrame.CommonLightPropertyFrame);
      frame.show();
      frame.loadObject(space, select);
   }else if(MO.Class.isClass(select, MO.FE3dTemplateDisplay)){
      var frame = o.findPropertyFrame(MO.EDsFrame.CommonDisplayPropertyFrame);
      frame.show();
      frame.loadObject(space, select);
   }else if(MO.Class.isClass(select, MO.FG3dMaterial)){
      var frame = o.findPropertyFrame(MO.EDsFrame.CommonMaterialPropertyFrame);
      frame.show();
      frame.loadObject(space, select);
   }else if(MO.Class.isClass(select, MO.FE3dRenderable)){
      var frame = o.findPropertyFrame(MO.EDsFrame.CommonRenderablePropertyFrame);
      frame.show();
      frame.loadObject(space, select);
   }else{
      throw new TError('Unknown select object type. (select={1})', select);
   }
}
with(MO){
   MO.FDsPrivateTemplateMenuBar = function FDsPrivateTemplateMenuBar(o){
      o = MO.Class.inherits(this, o, FDsTemplateMenuBar);
      o._frameName = 'resource.private.template.MenuBar';
      o.onBuilded  = FDsPrivateTemplateMenuBar_onBuilded;
      return o;
   }
   MO.FDsPrivateTemplateMenuBar_onBuilded = function FDsPrivateTemplateMenuBar_onBuilded(event){
      var o = this;
      o.__base.FDsTemplateMenuBar.onBuilded.call(o, event);
      o._controlSave.addClickListener(o, o.onSaveClick);
      o._controlCapture.addClickListener(o, o.onCaptureClick);
      o._controlSelectMaterial.addClickListener(o, o.onSelectMaterialClick);
      o._controlCreateDisplay.addClickListener(o, o.onCreateDisplayClick);
      o._controlDelete.addClickListener(o, o.onDeleteClick);
   }
}
