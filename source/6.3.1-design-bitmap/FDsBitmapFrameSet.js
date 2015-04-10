//==========================================================
// <T>模板工作区域。</T>
//
// @author maocy
// @history 150121
//==========================================================
function FDsBitmapFrameSet(o){
   o = RClass.inherits(this, o, FUiFrameSet);
   //..........................................................
   // @property
   o._frameName            = 'design2d.bitmap.FrameSet';
   //..........................................................
   // @style
   o._styleToolBarGround   = RClass.register(o, new AStyle('_styleToolBarGround', 'ToolBar_Ground'));
   o._styleStatusbarGround = RClass.register(o, new AStyle('_styleStatusbarGround', 'Statusbar_Ground'));
   o._styleCatalogGround   = RClass.register(o, new AStyle('_styleCatalogGround', 'Catalog_Ground'));
   o._styleWorkspaceGround = RClass.register(o, new AStyle('_styleWorkspaceGround', 'Workspace_Ground'));
   o._stylePropertyGround  = RClass.register(o, new AStyle('_stylePropertyGround', 'Property_Ground'));
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
   o.onBuilded             = FDsBitmapFrameSet_onBuilded;
   o.onMeshLoad            = FDsBitmapFrameSet_onMeshLoad;
   o.onCatalogSelected     = FDsBitmapFrameSet_onCatalogSelected;
   //..........................................................
   // @method
   o.construct             = FDsBitmapFrameSet_construct;
   // @method
   o.findPropertyFrame     = FDsBitmapFrameSet_findPropertyFrame;
   // @method
   o.loadByGuid            = FDsBitmapFrameSet_loadByGuid;
   o.loadByCode            = FDsBitmapFrameSet_loadByCode;
   // @method
   o.dispose               = FDsBitmapFrameSet_dispose;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
function FDsBitmapFrameSet_onBuilded(p){
   var o = this;
   o.__base.FUiFrameSet.onBuilded.call(o, p);
   //..........................................................
   // 设置目录区
   var f = o._frameCatalog = o.searchControl('catalogFrame');
   f._hPanel.className = o.styleName('Catalog_Ground');
   // 设置属性区
   var f = o._frameWorkspace = o.searchControl('spaceFrame');
   f._hPanel.className = o.styleName('Workspace_Ground');
   // 设置属性区
   var f = o._frameProperty = o.searchControl('propertyFrame');
   f._hPanel.className = o.styleName('Property_Ground');
   //..........................................................
   // 设置分割
   var f = o._catalogSplitter = o.searchControl('catalogSpliter');
   f.setAlignCd(EUiAlign.Left);
   f.setSizeHtml(o._frameCatalog._hPanel);
   var f = o._propertySpliter = o.searchControl('propertySpliter');
   f.setAlignCd(EUiAlign.Right);
   f.setSizeHtml(o._frameProperty._hPanel);
   //..........................................................
   // 设置目录工具栏
   var frame = o._catalogToolbarFrame = o.searchControl('catalogToolbarFrame');
   frame._hPanel.className = o.styleName('ToolBar_Ground');
   var toolbar = o._catalogToolbar = RClass.create(FDsBitmapCatalogToolBar);
   toolbar._frameSet = o;
   toolbar._workspace = o._worksapce;
   toolbar.buildDefine(p);
   frame.push(toolbar);
   // 设置目录栏
   var catalog = o._catalog = RClass.create(FDsBitmapCatalog);
   catalog._frameSet = o;
   catalog._workspace = o._worksapce;
   catalog.build(p);
   catalog.addSelectedListener(o, o.onCatalogSelected);
   o._frameCatalog.push(catalog);
   //..........................................................
   // 设置画板工具栏
   var frame = o._canvasToolbarFrame = o.searchControl('canvasToolbarFrame');
   frame._hPanel.className = o.styleName('ToolBar_Ground');
   var toolbar = o._canvasToolbar = RClass.create(FDsBitmapCanvasToolBar);
   toolbar._frameSet = o;
   toolbar._workspace = o._worksapce;
   toolbar.buildDefine(p);
   frame.push(toolbar);
   // 设置画板
   var frame = o._canvasFrame = o.searchControl('canvasFrame');
   var canvas = o._canvas = RClass.create(FDsBitmapCanvas);
   canvas._frameSet = o;
   canvas._workspace = o._workspace;
   canvas._toolbar = o._canvasToolbar;
   canvas.addLoadListener(o, o.onMeshLoad);
   canvas._hParent = frame._hPanel;
   canvas._hParent.style.backgroundColor = '#333333';
   canvas._hParent.style.scroll = 'auto';
   canvas.build(p);
   frame.push(canvas);
   //..........................................................
   // 设置画板工具栏
   var frame = o._propertyToolbarFrame = o.searchControl('propertyToolbarFrame');
   frame._hPanel.className = o.styleName('ToolBar_Ground');
   var toolbar = o._propertyToolbar = RClass.create(FDsBitmapPropertyToolBar);
   toolbar._frameSet = o;
   toolbar._workspace = o._worksapce;
   toolbar.buildDefine(p);
   frame.push(toolbar);
   // 设置画板
   //var frame = o._propertyContentFrame = o.searchControl('propertyContentFrame');
   //var canvas = o._canvas = RClass.create(FDsBitmapContenCanvas);
   //canvas._frameSet = o;
   //canvas._workspace = o._workspace;
   //canvas._toolbar = o._canvasToolbar;
   //canvas.addLoadListener(o, o.onMeshLoad);
   //canvas._hParent = frame._hPanel;
   //canvas._hParent.style.backgroundColor = '#333333';
   //canvas._hParent.style.scroll = 'auto';
   //canvas.build(p);
   //frame.push(canvas);
}

//==========================================================
// <T>加载模板处理。</T>
//
// @method
// @param p:template:FTemplate3d 模板
//==========================================================
function FDsBitmapFrameSet_onMeshLoad(p){
   var o = this;
   o._activeSpace = p._activeSpace;
   // 加载完成
   o._catalog.buildSpace(o._activeSpace);
}

//==========================================================
// <T>目录对象选择处理。</T>
//
// @method
// @param p:value:Object 对象
//==========================================================
function FDsBitmapFrameSet_onCatalogSelected(p, pc){
   var o = this;
   var space = o._activeSpace;
   // 隐藏所有属性面板
   var fs = o._propertyFrames;
   var c = fs.count();
   for(var i = 0; i < c; i++){
      var f = fs.value(i);
      f.hide();
   }
   // 显示选中属性面板
   if(RClass.isClass(p, FE3dStage)){
      var f = o.findPropertyFrame(EDsFrame.MeshSpacePropertyFrame);
      f.show();
      f.loadObject(space, space);
   }else if(RClass.isClass(p, FG3dTechnique)){
      var f = o.findPropertyFrame(EDsFrame.MeshTechniquePropertyFrame);
      f.show();
      f.loadObject(space, p);
   }else if(RClass.isClass(p, FE3dRegion)){
      var f = o.findPropertyFrame(EDsFrame.MeshRegionPropertyFrame);
      f.show();
      f.loadObject(space, p);
   }else if(RClass.isClass(p, FE3dCamera)){
      var f = o.findPropertyFrame(EDsFrame.MeshCameraPropertyFrame);
      f.show();
      f.loadObject(space, p);
   }else if(RClass.isClass(p, FG3dDirectionalLight)){
      var f = o.findPropertyFrame(EDsFrame.MeshLightPropertyFrame);
      f.show();
      f.loadObject(space, p);
   }else if(RClass.isClass(p, FE3dMeshDisplay)){
      var f = o.findPropertyFrame(EDsFrame.MeshDisplayPropertyFrame);
      f.show();
      f.loadObject(space, p);
   }else if(RClass.isClass(p, FG3dMaterial)){
      var f = o.findPropertyFrame(EDsFrame.MeshMaterialPropertyFrame);
      f.show();
      f.loadObject(space, p);
   }else if(RClass.isClass(p, FE3dMeshRenderable)){
      var f = o.findPropertyFrame(EDsFrame.MeshRenderablePropertyFrame);
      f.show();
      f.loadObject(space, p);
   }else{
      throw new TError('Unknown select object type. (value={1})', p);
   }
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsBitmapFrameSet_construct(){
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
function FDsBitmapFrameSet_findPropertyFrame(code){
   var o = this;
   var frame = o._propertyFrames.get(code);
   if(!frame){
      frame = RConsole.find(FUiFrameConsole).get(o, code, o._frameProperty._hContainer);
      frame._workspace = o;
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
function FDsBitmapFrameSet_loadByGuid(guid){
   var o = this;
   //o._meshGuid = guid;
   //o._canvas.loadByGuid(guid);
}

//==========================================================
// <T>加载模板处理。</T>
//
// @method
//==========================================================
function FDsBitmapFrameSet_loadByCode(p){
   var o = this;
   o._meshCode = p;
   o._canvas.loadByCode(p);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsBitmapFrameSet_dispose(){
   var o = this;
   // 父处理
   o.__base.FUiFrameSet.dispose.call(o);
   // 设置属性
   o._propertyFrames.dispose();
   o._propertyFrames = null;
}
