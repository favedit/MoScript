//==========================================================
// <T>私有模板框架。</T>
//
// @method
// @author maocy
// @history 150422
//==========================================================
MO.FDsPrivateTemplateFrameSet = function FDsPrivateTemplateFrameSet(o){
   o = MO.Class.inherits(this, o, MO.FDsTemplateFrameSet);
   //..........................................................
   // @property
   o._frameName        = 'resource.private.template.FrameSet';
   //..........................................................
   // @process
   o.onBuilded         = MO.FDsPrivateTemplateFrameSet_onBuilded;
   o.onCatalogSelected = MO.FDsPrivateTemplateFrameSet_onCatalogSelected;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
MO.FDsPrivateTemplateFrameSet_onBuilded = function FDsPrivateTemplateFrameSet_onBuilded(event){
   var o = this;
   o.__base.FDsTemplateFrameSet.onBuilded.call(o, event);
   //..........................................................
   // 设置目录工具栏
   var toolbar = o._catalogToolBar = MO.Class.create(MO.FDsPrivateTemplateCatalogToolBar);
   toolbar._frameSet = o;
   toolbar.buildDefine(event);
   o._frameCatalogToolBar.push(toolbar);
   // 设置目录栏
   var catalog = o._catalogContent = MO.Class.create(MO.FDsTemplateCatalogContent);
   catalog._frameSet = o;
   catalog.build(event);
   catalog.addSelectedListener(o, o.onCatalogSelected);
   o._frameCatalogContent.push(catalog);
   //..........................................................
   // 设置画板工具栏
   var toolbar = o._canvasToolBar = MO.Class.create(MO.FDsPrivateTemplateCanvasToolBar);
   toolbar._frameSet = o;
   toolbar.buildDefine(event);
   o._frameCanvasToolBar.push(toolbar);
   // 设置画板
   var canvas = o._canvasContent = MO.Class.create(MO.FDsTemplateCanvasContent);
   canvas._frameSet = o;
   canvas._toolbar = o._canvasToolbar;
   canvas._hParent = o._frameCanvasContent._hPanel;
   canvas._hParent.style.scroll = 'auto';
   canvas.addLoadListener(o, o.onDataLoaded);
   canvas.build(event);
   o._frameCanvasContent.push(canvas);
}

//==========================================================
// <T>目录对象选择处理。</T>
//
// @method
// @param select:FObject 选择对象
// @param flag:Boolean 选择标志
//==========================================================
MO.FDsPrivateTemplateFrameSet_onCatalogSelected = function FDsPrivateTemplateFrameSet_onCatalogSelected(select, flag){
   var o = this;
   // 检查空间
   var space = o._activeSpace;
   if(!space){
      return;
   }
   // 隐藏所有属性面板
   o.hidePropertyFrames();
   // 显示选中属性面板
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
