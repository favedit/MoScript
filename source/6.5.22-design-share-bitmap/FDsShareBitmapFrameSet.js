//==========================================================
// <T>共享位图框架。</T>
//
// @class
// @author maocy
// @history 150424
//==========================================================
function FDsShareBitmapFrameSet(o){
   o = RClass.inherits(this, o, FDsBitmapFrameSet);
   //..........................................................
   // @property
   o._frameName = 'resource.share.bitmap.FrameSet';
   //..........................................................
   // @process
   o.onBuilded  = FDsShareBitmapFrameSet_onBuilded;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
function FDsShareBitmapFrameSet_onBuilded(p){
   var o = this;
   o.__base.FDsBitmapFrameSet.onBuilded.call(o, p);
   //..........................................................
   // 设置目录工具栏
   var frame = o._catalogToolbarFrame = o.searchControl('catalogToolbarFrame');
   frame._hPanel.className = o.styleName('ToolBar_Ground');
   var toolbar = o._catalogToolbar = RClass.create(FDsShareBitmapCatalogToolBar);
   toolbar._frameSet = o;
   toolbar._workspace = o._worksapce;
   toolbar.buildDefine(p);
   frame.push(toolbar);
   // 设置目录栏
   var frame = o._catalogContentFrame = o.searchControl('catalogContentFrame');
   var catalogContent = o._catalogContent = RClass.create(FDsShareBitmapCatalogContent);
   catalogContent._frameSet = o;
   catalogContent._workspace = o._worksapce;
   catalogContent.build(p);
   //catalogContent.addSelectedListener(o, o.onCatalogSelected);
   frame.push(catalogContent);
   //..........................................................
   // 设置画板工具栏
   var frame = o._canvasToolbarFrame = o.searchControl('canvasToolbarFrame');
   frame._hPanel.className = o.styleName('ToolBar_Ground');
   var toolbar = o._canvasToolbar = RClass.create(FDsShareBitmapCanvasToolBar);
   toolbar._frameSet = o;
   toolbar._workspace = o._worksapce;
   toolbar.buildDefine(p);
   frame.push(toolbar);
   // 设置画板
   var frame = o._canvasContentFrame = o.searchControl('canvasContentFrame');
   var canvas = o._canvasContent = RClass.create(FDsShareBitmapCanvasContent);
   canvas._frameSet = o;
   canvas._workspace = o._workspace;
   canvas._toolbar = o._canvasToolbar;
   //canvas.addLoadListener(o, o.onMeshLoad);
   canvas._hParent = frame._hPanel;
   canvas._hParent.style.backgroundColor = '#333333';
   canvas._hParent.style.scroll = 'auto';
   canvas.build(p);
   frame.push(canvas);
   //..........................................................
   // 设置画板工具栏
   var frame = o._propertyToolbarFrame = o.searchControl('propertyToolbarFrame');
   frame._hPanel.className = o.styleName('ToolBar_Ground');
   var toolbar = o._propertyToolbar = RClass.create(FDsShareBitmapPropertyToolBar);
   toolbar._frameSet = o;
   toolbar._workspace = o._worksapce;
   toolbar.buildDefine(p);
   frame.push(toolbar);
   // 设置画板
   //var frame = o._propertyContentFrame = o.searchControl('propertyContentFrame');
   //var canvas = o._canvas = RClass.create(FDsShareBitmapContenCanvas);
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
