//==========================================================
// <T>模板工作区域。</T>
//
// @author maocy
// @history 150121
//==========================================================
function FDsSceneFrameSet(o){
   o = RClass.inherits(this, o, FUiFrameSet);
   //..........................................................
   // @property
   o._frameName            = 'resource.scene.FrameSet';
   //..........................................................
   // @style
   o._styleToolbarGround   = RClass.register(o, new AStyle('_styleToolbarGround', 'Toolbar_Ground'));
   o._styleCatalogContent  = RClass.register(o, new AStyle('_styleCatalogContent', 'Catalog_Content'));
   o._styleCanvasContent   = RClass.register(o, new AStyle('_styleCanvasContent', 'Canvas_Content'));
   o._stylePropertyContent = RClass.register(o, new AStyle('_stylePropertyContent', 'Property_Content'));
   //..........................................................
   // @attribute
   o._activeSpace          = null;
   o._activeMesh           = null;
   // @attribute
   o._framesetMain         = null;
   o._framesetBody         = null;
   // @attribute
   o._frameToolBar         = null;
   o._frameBody            = null;
   o._frameProperty        = null;
   // @attribute
   o._frameCatalog         = null;
   o._frameWorkspace       = null;
   o._frameStatusBar       = null;
   // @attribute
   o._propertyFrames       = null;
   //..........................................................
   // @process
   o.onBuilded             = FDsSceneFrameSet_onBuilded;
   o.onDataLoaded          = FDsSceneFrameSet_onDataLoaded;
   o.onCatalogSelected     = FDsSceneFrameSet_onCatalogSelected;
   //..........................................................
   // @method
   o.construct             = FDsSceneFrameSet_construct;
   // @method
   o.findPropertyFrame     = FDsSceneFrameSet_findPropertyFrame;
   // @method
   o.loadByGuid            = FDsSceneFrameSet_loadByGuid;
   o.loadByCode            = FDsSceneFrameSet_loadByCode;
   // @method
   o.dispose               = FDsSceneFrameSet_dispose;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param event:TEventProcess 事件处理
//==========================================================
function FDsSceneFrameSet_onBuilded(event){
   var o = this;
   o.__base.FUiFrameSet.onBuilded.call(o, event);
   //..........................................................
   // 设置样式
   o._frameCatalogToolBar._hPanel.className = o.styleName('Toolbar_Ground');
   o._frameCatalogContent._hPanel.className = o.styleName('Catalog_Content');
   o._frameCanvasToolBar._hPanel.className = o.styleName('Toolbar_Ground');
   o._frameCanvasContent._hPanel.className = o.styleName('Canvas_Content');
   o._framePropertyToolBar._hPanel.className = o.styleName('Toolbar_Ground');
   o._framePropertyContent._hPanel.className = o.styleName('Property_Content');
   //..........................................................
   // 设置分割
   var spliter = o._spliterCatalog;
   spliter.setAlignCd(EUiAlign.Left);
   spliter.setSizeHtml(o._frameCatalog._hPanel);
   var spliter = o._spliterProperty;
   spliter.setAlignCd(EUiAlign.Right);
   spliter.setSizeHtml(o._frameProperty._hPanel);
   //..........................................................
   // 设置目录工具栏
   var toolbar = o._catalogToolbar = RClass.create(FDsSceneCatalogToolBar);
   toolbar._frameSet = o;
   toolbar.buildDefine(event);
   o._frameCatalogToolBar.push(toolbar);
   // 设置目录内容栏
   var catalog = o._catalogContent = RClass.create(FDsSceneCatalog);
   catalog._frameSet = o;
   catalog.build(event);
   catalog.addSelectedListener(o, o.onCatalogSelected);
   o._frameCatalogContent.push(catalog);
   //..........................................................
   // 设置画板工具栏
   var toolbar = o._canvasToolbar = RClass.create(FDsSceneCanvasToolBar);
   toolbar._frameSet = o;
   toolbar.buildDefine(event);
   o._frameCanvasToolBar.push(toolbar);
   // 设置画板内容区
   var canvas = o._canvasContent = RClass.create(FDsSceneCanvas);
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
   var toolbar = o._propertyToolbar = RClass.create(FDsScenePropertyToolBar);
   toolbar._frameSet = o;
   toolbar.buildDefine(event);
   o._framePropertyToolBar.push(toolbar);
}

//==========================================================
// <T>加载模板处理。</T>
//
// @method
// @param canvas:FSceneCanvas 画板
//==========================================================
function FDsSceneFrameSet_onDataLoaded(canvas){
   var o = this;
   var space = o._activeSpace = canvas._activeSpace;
   // 加载完成
   o._catalogContent.buildSpace(space);
}

//==========================================================
// <T>目录对象选择处理。</T>
//
// @method
// @param select:FObject 选中对象
// @param flag:Boolean 处理标志
//==========================================================
function FDsSceneFrameSet_onCatalogSelected(select, flag){
   var o = this;
   var space = o._activeSpace;
   var canvas = o._canvasContent;
   // 隐藏所有属性面板
   var frames = o._propertyFrames;
   var count = frames.count();
   for(var i = 0; i < count; i++){
      var frame = frames.at(i);
      frame.hide();
   }
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

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsSceneFrameSet_construct(){
   var o = this;
   // 父处理
   o.__base.FUiFrameSet.construct.call(o);
   // 设置属性
   o._propertyFrames = new TDictionary();
}

//==========================================================
// <T>根据名称获得属性页面。</T>
//
// @method
// @param code:String 代码
// @return FUiFrame 页面
//==========================================================
function FDsSceneFrameSet_findPropertyFrame(code){
   var o = this;
   var frame = o._propertyFrames.get(code);
   if(!frame){
      frame = RConsole.find(FUiFrameConsole).get(o, code, o._framePropertyContent._hContainer);
      frame._frameSet = o;
      o._propertyFrames.set(code, frame);
   }
   return frame;
}

//==========================================================
// <T>根据唯一编码加载网格模板。</T>
//
// @method
// @param guid:String 唯一编码
//==========================================================
function FDsSceneFrameSet_loadByGuid(guid){
   var o = this;
   o._activeGuid = guid;
   o._canvasContent.loadByGuid(guid);
}

//==========================================================
// <T>加载模板处理。</T>
//
// @method
//==========================================================
function FDsSceneFrameSet_loadByCode(p){
   var o = this;
   o._meshCode = p;
   o._canvasContent.loadByCode(p);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsSceneFrameSet_dispose(){
   var o = this;
   // 父处理
   o.__base.FUiFrameSet.dispose.call(o);
   // 设置属性
   o._propertyFrames.dispose();
   o._propertyFrames = null;
}
