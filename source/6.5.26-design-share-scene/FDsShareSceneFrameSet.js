with(MO){
   //==========================================================
   // <T>共享场景框架。</T>
   //
   // @class
   // @author maocy
   // @history 150422
   //==========================================================
   MO.FDsShareSceneFrameSet = function FDsShareSceneFrameSet(o){
      o = MO.Class.inherits(this, o, FDsSceneFrameSet);
      //..........................................................
      // @property
      o._frameName = 'resource.share.scene.FrameSet';
      //..........................................................
      // @process
      o.onBuilded  = FDsShareSceneFrameSet_onBuilded;
      return o;
   }

   //==========================================================
   // <T>构建完成处理。</T>
   //
   // @method
   // @param event:TEventProcess 事件处理
   //==========================================================
   MO.FDsShareSceneFrameSet_onBuilded = function FDsShareSceneFrameSet_onBuilded(event){
      var o = this;
      o.__base.FDsSceneFrameSet.onBuilded.call(o, event);
      //..........................................................
      // 设置目录工具栏
      var toolbar = o._catalogToolbar = MO.Class.create(FDsShareSceneCatalogToolBar);
      toolbar._frameSet = o;
      toolbar.buildDefine(event);
      o._frameCatalogToolBar.push(toolbar);
      // 设置目录内容栏
      var catalog = o._catalogContent = MO.Class.create(FDsSceneCatalogContent);
      catalog._frameSet = o;
      catalog.build(event);
      catalog.addSelectedListener(o, o.onCatalogSelected);
      o._frameCatalogContent.push(catalog);
      //..........................................................
      // 设置画板工具栏
      var toolbar = o._canvasToolbar = MO.Class.create(FDsShareSceneCanvasToolBar);
      toolbar._frameSet = o;
      toolbar.buildDefine(event);
      o._frameCanvasToolBar.push(toolbar);
      // 设置画板内容区
      var canvas = o._canvasContent = MO.Class.create(FDsSceneCanvasContent);
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
      var toolbar = o._propertyToolbar = MO.Class.create(FDsScenePropertyToolBar);
      toolbar._frameSet = o;
      toolbar.buildDefine(event);
      o._framePropertyToolBar.push(toolbar);
   }
}
