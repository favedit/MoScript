with(MO){
   MO.FDsPrivateTemplateCanvasToolBar = function FDsPrivateTemplateCanvasToolBar(o){
      o = RClass.inherits(this, o, FDsTemplateCanvasToolBar);
      o._frameName      = 'resource.private.template.CanvasToolBar';
      return o;
   }
}
with(MO){
   MO.FDsPrivateTemplateCatalogToolBar = function FDsPrivateTemplateCatalogToolBar(o){
      o = RClass.inherits(this, o, FDsTemplateCatalogToolBar);
      o._frameName = 'resource.private.template.CatalogToolBar';
      return o;
   }
}
with(MO){
   MO.FDsPrivateTemplateFrameSet = function FDsPrivateTemplateFrameSet(o){
      o = RClass.inherits(this, o, FDsTemplateFrameSet);
      o._frameName        = 'resource.private.template.FrameSet';
      o.onBuilded         = FDsPrivateTemplateFrameSet_onBuilded;
      o.onCatalogSelected = FDsPrivateTemplateFrameSet_onCatalogSelected;
      return o;
   }
   MO.FDsPrivateTemplateFrameSet_onBuilded = function FDsPrivateTemplateFrameSet_onBuilded(event){
      var o = this;
      o.__base.FDsTemplateFrameSet.onBuilded.call(o, event);
      var toolbar = o._catalogToolBar = RClass.create(FDsPrivateTemplateCatalogToolBar);
      toolbar._frameSet = o;
      toolbar.buildDefine(event);
      o._frameCatalogToolBar.push(toolbar);
      var catalog = o._catalogContent = RClass.create(FDsTemplateCatalogContent);
      catalog._frameSet = o;
      catalog.build(event);
      catalog.addSelectedListener(o, o.onCatalogSelected);
      o._frameCatalogContent.push(catalog);
      var toolbar = o._canvasToolBar = RClass.create(FDsPrivateTemplateCanvasToolBar);
      toolbar._frameSet = o;
      toolbar.buildDefine(event);
      o._frameCanvasToolBar.push(toolbar);
      var canvas = o._canvasContent = RClass.create(FDsTemplateCanvasContent);
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
      if(RClass.isClass(select, FE3dSpace)){
         var frame = o.findPropertyFrame(EDsFrame.CommonSpacePropertyFrame);
         frame.show();
         frame.loadObject(space, select);
      }else if(RClass.isClass(select, FG3dTechnique)){
         var frame = o.findPropertyFrame(EDsFrame.CommonTechniquePropertyFrame);
         frame.show();
         frame.loadObject(space, select);
      }else if(RClass.isClass(select, FE3dRegion)){
         var frame = o.findPropertyFrame(EDsFrame.CommonRegionPropertyFrame);
         frame.show();
         frame.loadObject(space, select);
      }else if(RClass.isClass(select, FE3dCamera)){
         var frame = o.findPropertyFrame(EDsFrame.CommonCameraPropertyFrame);
         frame.show();
         frame.loadObject(space, select);
      }else if(RClass.isClass(select, FG3dDirectionalLight)){
         var frame = o.findPropertyFrame(EDsFrame.CommonLightPropertyFrame);
         frame.show();
         frame.loadObject(space, select);
      }else if(RClass.isClass(select, FE3dTemplateDisplay)){
         var frame = o.findPropertyFrame(EDsFrame.CommonDisplayPropertyFrame);
         frame.show();
         frame.loadObject(space, select);
      }else if(RClass.isClass(select, FG3dMaterial)){
         var frame = o.findPropertyFrame(EDsFrame.CommonMaterialPropertyFrame);
         frame.show();
         frame.loadObject(space, select);
      }else if(RClass.isClass(select, FE3dRenderable)){
         var frame = o.findPropertyFrame(EDsFrame.CommonRenderablePropertyFrame);
         frame.show();
         frame.loadObject(space, select);
      }else{
         throw new TError('Unknown select object type. (select={1})', select);
      }
   }
}
with(MO){
   MO.FDsPrivateTemplateMenuBar = function FDsPrivateTemplateMenuBar(o){
      o = RClass.inherits(this, o, FDsTemplateMenuBar);
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
