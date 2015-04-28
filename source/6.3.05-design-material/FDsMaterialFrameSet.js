//==========================================================
// <T>模板工作区域。</T>
//
// @author maocy
// @history 150121
//==========================================================
function FDsMaterialFrameSet(o){
   o = RClass.inherits(this, o, FDsFrameSet);
   //..........................................................
   // @attribute
   o._frameCatalog         = null;
   o._frameCatalogToolBar  = null;
   o._frameCatalogContent  = null;
   o._frameCanvas          = null;
   o._frameCanvasToolBar   = null;
   o._frameCanvasContent   = null;
   o._frameProperty        = null;
   o._framePropertyToolBar = null;
   o._framePropertyContent = null;
   //..........................................................
   // @process
   o.onBuilded             = FDsMaterialFrameSet_onBuilded;
   o.onDataLoaded          = FDsMaterialFrameSet_onDataLoaded;
   o.onCatalogSelected     = FDsMaterialFrameSet_onCatalogSelected;
   //..........................................................
   // @method
   o.construct             = FDsMaterialFrameSet_construct;
   // @method
   o.switchCanvas          = FDsMaterialFrameSet_switchCanvas;
   o.loadByGuid            = FDsMaterialFrameSet_loadByGuid;
   o.loadByCode            = FDsMaterialFrameSet_loadByCode;
   // @method
   o.dispose               = FDsMaterialFrameSet_dispose;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param event:TEventProcess 事件处理
//==========================================================
function FDsMaterialFrameSet_onBuilded(event){
   var o = this;
   o.__base.FDsFrameSet.onBuilded.call(o, event);
   //..........................................................
   o._frameCatalogToolBar._hPanel.className = o.styleName('ToolBar_Ground');
   o._frameCatalogContent._hPanel.className = o.styleName('Catalog_Content');
   o._frameCanvasToolBar._hPanel.className = o.styleName('ToolBar_Ground');
   o._frameCanvasContent._hPanel.className = o.styleName('Canvas_Content');
   o._framePropertyToolBar._hPanel.className = o.styleName('ToolBar_Ground');
   o._framePropertyContent._hPanel.className = o.styleName('Property_Content');
   //..........................................................
   // 设置分割
   var spliterCatalog = o._spliterCatalog;
   spliterCatalog.setAlignCd(EUiAlign.Left);
   spliterCatalog.setSizeHtml(o._frameCatalog._hPanel);
   var spliterProperty = o._spliterProperty;
   spliterProperty.setAlignCd(EUiAlign.Right);
   spliterProperty.setSizeHtml(o._frameProperty._hPanel);
   //..........................................................
   // 设置画板内容
   var canvas = o._canvasContent = RClass.create(FDsMaterialCanvasContent);
   canvas._frameSet = o;
   canvas._hParent = o._frameCanvasContent._hPanel;
   canvas._hParent.style.scroll = 'auto';
   //canvas._hParent.style.backgroundColor = '#333333';
   //canvas.addLoadListener(o, o.onDataLoaded);
   canvas.build(event);
   // 设置画板内容
   var canvas = o._canvasBitmap = RClass.create(FDsMaterialCanvasBitmap);
   canvas._frameSet = o;
   canvas._hParent = o._frameCanvasContent._hPanel;
   canvas._hParent.style.scroll = 'auto';
   //canvas._hParent.style.backgroundColor = '#333333';
   //canvas.addLoadListener(o, o.onDataLoaded);
   canvas.build(event);
   o._frameCanvasContent.push(canvas);
}

//==========================================================
// <T>加载模板处理。</T>
//
// @method
// @param p:template:FTemplate3d 模板
//==========================================================
function FDsMaterialFrameSet_onDataLoaded(p){
   var o = this;
   o._activeSpace = p._activeSpace;
   // 加载完成
   o._catalog.buildSpace(o._activeSpace);
}

//==========================================================
// <T>目录对象选择处理。</T>
//
// @method
// @param select:FObject 选择对象
// @param flag:Boolean 选择标志
//==========================================================
function FDsMaterialFrameSet_onCatalogSelected(select, flag){
   var o = this;
   // 检查空间
   var space = o._activeSpace;
   if(!space){
      return;
   }
   // 隐藏所有属性面板
   o.hidePropertyFrames();
   // 显示选中属性面板
   if(RClass.isClass(select, FE3dStage)){
      var frame = o.findPropertyFrame(EDsFrame.MeshSpacePropertyFrame);
      frame.show();
      frame.loadObject(space, select);
   }else if(RClass.isClass(select, FG3dTechnique)){
      var frame = o.findPropertyFrame(EDsFrame.MeshTechniquePropertyFrame);
      frame.show();
      frame.loadObject(space, select);
   }else if(RClass.isClass(select, FE3dRegion)){
      var frame = o.findPropertyFrame(EDsFrame.MeshRegionPropertyFrame);
      frame.show();
      frame.loadObject(space, select);
   }else if(RClass.isClass(select, FE3dCamera)){
      var frame = o.findPropertyFrame(EDsFrame.MeshCameraPropertyFrame);
      frame.show();
      frame.loadObject(space, select);
   }else if(RClass.isClass(select, FG3dDirectionalLight)){
      var frame = o.findPropertyFrame(EDsFrame.MeshLightPropertyFrame);
      frame.show();
      frame.loadObject(space, select);
   }else if(RClass.isClass(select, FE3dMeshDisplay)){
      var frame = o.findPropertyFrame(EDsFrame.MeshDisplayPropertyFrame);
      frame.show();
      frame.loadObject(space, select);
   }else if(RClass.isClass(select, FG3dMaterial)){
      var frame = o.findPropertyFrame(EDsFrame.MeshMaterialPropertyFrame);
      frame.show();
      frame.loadObject(space, select);
   }else if(RClass.isClass(select, FE3dMeshRenderable)){
      var frame = o.findPropertyFrame(EDsFrame.MeshRenderablePropertyFrame);
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
function FDsMaterialFrameSet_construct(){
   var o = this;
   // 父处理
   o.__base.FDsFrameSet.construct.call(o);
}

//==========================================================
// <T>切换画板。</T>
//
// @method
//==========================================================
function FDsMaterialFrameSet_switchCanvas(typeCd, guid){
   var o = this;
   if(typeCd == 'Bitmap'){
      var canvas = o._canvasBitmap;
      canvas.loadByGuid(guid);
      //o._frameCanvasContent.push(canvas);
   }else{
      //o._frameCanvasContent.push(o._canvasContent);
   }
}

//==========================================================
// <T>根据唯一编码加载网格模板。</T>
//
// @method
// @param guid:String 唯一编码
//==========================================================
function FDsMaterialFrameSet_loadByGuid(guid){
   var o = this;
   o._activeGuid = guid;
   // 获得资源信息
   var resource = o._activeResource = RConsole.find(FDrMaterialConsole).query(guid);
   // 加载目录
   o._catalogContent.serviceList(guid);
   // 加载画板
   //var canvas = o._canvasContent;
   //canvas.loadByGuid(guid);
   // 加载属性
   var frame = o.findPropertyFrame(EDsFrame.MaterialPropertyFrame);
   frame.loadObject(resource);
}

//==========================================================
// <T>加载模板处理。</T>
//
// @method
//==========================================================
function FDsMaterialFrameSet_loadByCode(code){
   var o = this;
   o._activeCode = code;
   o._canvas.loadByCode(code);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsMaterialFrameSet_dispose(){
   var o = this;
   // 父处理
   o.__base.FDsFrameSet.dispose.call(o);
}
