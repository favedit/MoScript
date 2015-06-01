with(MO){
   //==========================================================
   // <T>共享材质画板框架。</T>
   //
   // @class
   // @author maocy
   // @history 150424
   //==========================================================
   MO.FDsShareMaterialFrameSet = function FDsShareMaterialFrameSet(o){
      o = RClass.inherits(this, o, FDsMaterialFrameSet);
      //..........................................................
      // @property
      o._frameName = 'resource.share.material.FrameSet';
      //..........................................................
      // @process
      o.onBuilded  = FDsShareMaterialFrameSet_onBuilded;
      return o;
   }

   //==========================================================
   // <T>构建完成处理。</T>
   //
   // @method
   // @param event:TEventProcess 事件处理
   //==========================================================
   MO.FDsShareMaterialFrameSet_onBuilded = function FDsShareMaterialFrameSet_onBuilded(event){
      var o = this;
      o.__base.FDsMaterialFrameSet.onBuilded.call(o, event);
      //..........................................................
      // 设置目录工具栏
      var toolbar = o._toolbar = RClass.create(FDsShareMaterialMenuBar);
      toolbar._frameSet = o;
      toolbar.buildDefine(event);
      o._frameToolBar.push(toolbar);
      // 设置目录内容
      var catalog = o._catalogContent = RClass.create(FDsMaterialCatalogContent);
      catalog._frameSet = o;
      catalog.build(event);
      catalog.addSelectedListener(o, o.onCatalogSelected);
      o._frameCatalogContent.push(catalog);
      //..........................................................
      // 设置画板工具栏
      var toolbar = o._canvasToolbar = RClass.create(FDsShareMaterialCanvasToolBar);
      toolbar._frameSet = o;
      toolbar.buildDefine(event);
      o._frameCanvasToolBar.push(toolbar);
      // 设置画板内容
      var canvas = o._canvasContent = RClass.create(FDsMaterialCanvasContent);
      canvas._frameSet = o;
      canvas._toolbar = o._canvasToolbar;
      canvas._hParent = o._frameCanvasContent._hPanel;
      canvas._hParent.style.backgroundColor = '#333333';
      canvas._hParent.style.scroll = 'auto';
      canvas.addLoadListener(o, o.onDataLoaded);
      canvas.build(event);
      o._frameCanvasContent.push(canvas);
   }
}
