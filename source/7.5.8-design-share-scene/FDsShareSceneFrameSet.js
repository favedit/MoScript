//==========================================================
// <T>共享场景工作区。</T>
//
// @method
// @author maocy
// @history 150422
//==========================================================
function FDsShareSceneFrameSet(o){
   o = RClass.inherits(this, o, FDsSceneFrameSet);
   //..........................................................
   // @property
   o._frameName        = 'resource.share.scene.FrameSet';
   //..........................................................
   // @process
   o.onBuilded         = FDsShareSceneFrameSet_onBuilded;
   o.onCatalogSelected = FDsShareSceneFrameSet_onCatalogSelected;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param event:TEventProcess 事件处理
//==========================================================
function FDsShareSceneFrameSet_onBuilded(event){
   var o = this;
   o.__base.FDsSceneFrameSet.onBuilded.call(o, event);
   //..........................................................
   // 设置目录工具栏
   var toolbar = o._catalogToolbar = RClass.create(FDsShareSceneCatalogToolBar);
   toolbar._frameSet = o;
   toolbar.buildDefine(event);
   o._frameCatalogToolBar.push(toolbar);
   // 设置目录内容栏
   var catalog = o._catalogContent = RClass.create(FDsShareSceneCatalog);
   catalog._frameSet = o;
   catalog.build(event);
   catalog.addSelectedListener(o, o.onCatalogSelected);
   o._frameCatalogContent.push(catalog);
   //..........................................................
   // 设置画板工具栏
   var toolbar = o._canvasToolbar = RClass.create(FDsShareSceneCanvasToolBar);
   toolbar._frameSet = o;
   toolbar.buildDefine(event);
   o._frameCanvasToolBar.push(toolbar);
   // 设置画板内容区
   var canvas = o._canvasContent = RClass.create(FDsShareSceneCanvas);
   canvas._frameSet = o;
   canvas._toolbar = o._canvasToolbar;
   canvas._hParent = o._frameCanvasContent._hPanel;
   canvas._hParent.style.backgroundColor = '#333333';
   canvas._hParent.style.scroll = 'auto';
   canvas.addLoadListener(o, o.onDataLoaded);
   canvas.build(event);
   o._frameCanvasContent.push(canvas);
   //..........................................................
   // 设置属性工具栏
   var toolbar = o._propertyToolbar = RClass.create(FDsShareScenePropertyToolBar);
   toolbar._frameSet = o;
   toolbar.buildDefine(event);
   o._framePropertyToolBar.push(toolbar);
}

//==========================================================
// <T>目录对象选择处理。</T>
//
// @method
// @param select:FObject 选择对象
// @param flag:Boolean 选择标志
//==========================================================
function FDsShareSceneFrameSet_onCatalogSelected(select, flag){
   var o = this;
   // 检查空间
   var space = o._activeSpace;
   if(!space){
      return;
   }
   var canvas = o._canvasContent;
   // 隐藏所有属性面板
   o.hidePropertyFrames();
   // 显示选中属性面板
   if(RClass.isClass(select, FE3dScene)){
      // 选中场景
      var frame = o.findPropertyFrame(EDsFrame.CommonSpacePropertyFrame);
      frame.show();
      frame.loadObject(space, select);
   }else if(RClass.isClass(select, FG3dTechnique)){
      // 选中技术
      var frame = o.findPropertyFrame(EDsFrame.CommonTechniquePropertyFrame);
      frame.show();
      frame.loadObject(space, select);
   }else if(RClass.isClass(select, FE3dRegion)){
      // 选中区域
      var frame = o.findPropertyFrame(EDsFrame.CommonRegionPropertyFrame);
      frame.show();
      frame.loadObject(space, select);
   }else if(RClass.isClass(select, FE3dCamera)){
      // 选中相机
      var frame = o.findPropertyFrame(EDsFrame.CommonCameraPropertyFrame);
      frame.show();
      frame.loadObject(space, select);
   }else if(RClass.isClass(select, FG3dDirectionalLight)){
      // 选中光源
      var frame = o.findPropertyFrame(EDsFrame.CommonLightPropertyFrame);
      frame.show();
      frame.loadObject(space, select);
   }else if(select == 'layers'){
      // 选中显示层集合
      if(flag){
         canvas.selectLayers(select);
      }
   }else if(RClass.isClass(select, FE3dSceneLayer)){
      // 选中显示层
      if(flag){
         canvas.selectLayer(select);
      }
      var frame = o.findPropertyFrame(EDsFrame.CommonLayerPropertyFrame);
      frame.show();
      frame.loadObject(space, select);
   }else if(RClass.isClass(select, FE3dSceneDisplay)){
      // 选中显示对象
      if(flag){
         canvas.selectDisplay(select);
      }
      var frame = o.findPropertyFrame(EDsFrame.CommonDisplayPropertyFrame);
      frame.show();
      frame.loadObject(space, select);
   }else if(RClass.isClass(select, FE3dSceneMaterial)){
      // 选中材质
      if(flag){
         canvas.selectMaterial(select);
      }
      var frame = o.findPropertyFrame(EDsFrame.CommonMaterialPropertyFrame);
      frame.show();
      frame.loadObject(space, select);
   }else if(RClass.isClass(select, FE3dAnimation)){
      // 选中动画
      var frame = o.findPropertyFrame(EDsFrame.CommonAnimationPropertyFrame);
      frame.show();
      frame.loadObject(space, select);
   }else if(RClass.isClass(select, FE3dRenderable)){
      // 选中渲染对象
      if(flag){
         canvas.selectRenderable(select);
      }
      var frame = o.findPropertyFrame(EDsFrame.CommonRenderablePropertyFrame);
      frame.show();
      frame.loadObject(space, select);
   }else{
      throw new TError('Unknown select type. (select={1})', select);
   }
}
