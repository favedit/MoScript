//==========================================================
// <T>私人场景工作区。</T>
//
// @method
// @author maocy
// @history 150422
//==========================================================
function FDsPrivateSceneFrameSet(o){
   o = RClass.inherits(this, o, FDsSceneFrameSet);
   //..........................................................
   // @property
   o._frameName = 'resource.private.scene.FrameSet';
   //..........................................................
   // @process
   o.onBuilded  = FDsPrivateSceneFrameSet_onBuilded;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param event:TEventProcess 事件处理
//==========================================================
function FDsPrivateSceneFrameSet_onBuilded(event){
   var o = this;
   o.__base.FDsSceneFrameSet.onBuilded.call(o, event);
   //..........................................................
   // 设置目录工具栏
   var toolbar = o._catalogToolbar = RClass.create(FDsPrivateSceneCatalogToolBar);
   toolbar._frameSet = o;
   toolbar.buildDefine(event);
   o._frameCatalogToolBar.push(toolbar);
   // 设置目录内容栏
   var catalog = o._catalogContent = RClass.create(FDsPrivateSceneCatalogContent);
   catalog._frameSet = o;
   catalog.build(event);
   catalog.addSelectedListener(o, o.onCatalogSelected);
   o._frameCatalogContent.push(catalog);
   //..........................................................
   // 设置画板工具栏
   var toolbar = o._canvasToolbar = RClass.create(FDsPrivateSceneCanvasToolBar);
   toolbar._frameSet = o;
   toolbar.buildDefine(event);
   o._frameCanvasToolBar.push(toolbar);
   // 设置画板内容区
   var canvas = o._canvasContent = RClass.create(FDsPrivateSceneCanvasContent);
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
   var toolbar = o._propertyToolbar = RClass.create(FDsPrivateScenePropertyToolBar);
   toolbar._frameSet = o;
   toolbar.buildDefine(event);
   o._framePropertyToolBar.push(toolbar);
}
