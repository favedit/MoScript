//==========================================================
// <T>模板工作区域。</T>
//
// @author maocy
// @history 150121
//==========================================================
function FDsShareModelFrameSet(o){
   o = RClass.inherits(this, o, FDsFrameSet);
   //..........................................................
   // @property
   o._frameName            = 'resource.share.model.FrameSet';
   //..........................................................
   // @style
   o._styleToolbarGround   = RClass.register(o, new AStyle('_styleToolbarGround', 'Toolbar_Ground'));
   o._styleCatalogContent  = RClass.register(o, new AStyle('_styleCatalogContent', 'Catalog_Content'));
   o._styleCanvasContent   = RClass.register(o, new AStyle('_styleCanvasContent', 'Canvas_Content'));
   o._stylePropertyContent = RClass.register(o, new AStyle('_stylePropertyContent', 'Property_Content'));
   //..........................................................
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
   //..........................................................
   // @process
   o.onBuilded             = FDsShareModelFrameSet_onBuilded;
   o.onDataLoaded          = FDsShareModelFrameSet_onDataLoaded;
   o.onCatalogSelected     = FDsShareModelFrameSet_onCatalogSelected;
   //..........................................................
   // @method
   o.construct             = FDsShareModelFrameSet_construct;
   // @method
   o.loadByGuid            = FDsShareModelFrameSet_loadByGuid;
   o.loadByCode            = FDsShareModelFrameSet_loadByCode;
   // @method
   o.dispose               = FDsShareModelFrameSet_dispose;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param event:TEventProcess 事件处理
//==========================================================
function FDsShareModelFrameSet_onBuilded(event){
   var o = this;
   o.__base.FDsFrameSet.onBuilded.call(o, event);
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
   var toolbar = o._catalogToolbar = RClass.create(FDsShareModelCatalogToolBar);
   toolbar._frameSet = o;
   toolbar.buildDefine(event);
   o._frameCatalogToolBar.push(toolbar);
   // 设置目录栏
   var catalog = o._catalogContent = RClass.create(FDsShareModelCatalog);
   catalog._frameSet = o;
   catalog.build(event);
   catalog.addSelectedListener(o, o.onCatalogSelected);
   o._frameCatalogContent.push(catalog);
   //..........................................................
   // 设置画板工具栏
   var toolbar = o._canvasToolbar = RClass.create(FDsShareModelCanvasToolBar);
   toolbar._frameSet = o;
   toolbar.buildDefine(event);
   o._frameCanvasToolBar.push(toolbar);
   // 设置画板
   var canvas = o._canvasContent = RClass.create(FDsShareModelCanvas);
   canvas._frameSet = o;
   canvas._toolbar = o._canvasToolbar;
   canvas._hParent = o._frameCanvasContent._hPanel;
   canvas._hParent.style.backgroundColor = '#333333';
   canvas._hParent.style.scroll = 'auto';
   canvas.addLoadListener(o, o.onDataLoaded);
   canvas.build(event);
   o._frameCanvasContent.push(canvas);
}

//==========================================================
// <T>加载模板处理。</T>
//
// @method
// @param event:SEvent 事件
//==========================================================
function FDsShareModelFrameSet_onDataLoaded(event){
   var o = this;
   var sender = event.sender;
   var space = o._activeSpace = sender.activeSpace();
   o._catalogContent.buildSpace(space);
}

//==========================================================
// <T>目录对象选择处理。</T>
//
// @method
// @param select:FObject 选择对象
// @param flag:Boolean 选择标志
//==========================================================
function FDsShareModelFrameSet_onCatalogSelected(select, flag){
   var o = this;
   // 检查空间
   var space = o._activeSpace;
   if(!space){
      return;
   }
   // 隐藏所有属性面板
   o.hidePropertyFrames();
   // 显示选中属性面板
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
   }else if(RClass.isClass(space, FG3dLight)){
      var frame = o.findPropertyFrame(EDsFrame.CommonLightPropertyFrame);
      frame.show();
      frame.loadObject(space, select);
   }else if(RClass.isClass(select, FE3dModelDisplay)){
      var frame = o.findPropertyFrame(EDsFrame.CommonDisplayPropertyFrame);
      frame.show();
      frame.loadObject(space, select);
   }else if(RClass.isClass(select, FG3dMaterial)){
      var frame = o.findPropertyFrame(EDsFrame.CommonMaterialPropertyFrame);
      frame.show();
      frame.loadObject(space, select);
   }else if(RClass.isClass(select, FE3dModelRenderable)){
      var frame = o.findPropertyFrame(EDsFrame.CommonRenderablePropertyFrame);
      frame.show();
      frame.loadObject(space, select);
   }else{
      throw new TError('Unknown select object type. (select={1})', select);
   }
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsShareModelFrameSet_construct(){
   var o = this;
   // 父处理
   o.__base.FDsFrameSet.construct.call(o);
}

//==========================================================
// <T>根据唯一编码加载模型。</T>
//
// @method
// @param guid:String 唯一编码
//==========================================================
function FDsShareModelFrameSet_loadByGuid(guid){
   var o = this;
   o._activeGuid = guid;
   o._canvasContent.loadByGuid(guid);
}

//==========================================================
// <T>根据代码加载模型。</T>
//
// @method
// @param code:String 代码
//==========================================================
function FDsShareModelFrameSet_loadByCode(code){
   var o = this;
   o._activeCode = code;
   o._canvasContent.loadByCode(code);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsShareModelFrameSet_dispose(){
   var o = this;
   // 父处理
   o.__base.FDsFrameSet.dispose.call(o);
}
