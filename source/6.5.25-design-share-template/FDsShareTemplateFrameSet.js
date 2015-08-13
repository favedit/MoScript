with(MO){
   //==========================================================
   // <T>共享模板框架。</T>
   //
   // @class
   // @author maocy
   // @history 150423
   //==========================================================
   MO.FDsShareTemplateFrameSet = function FDsShareTemplateFrameSet(o){
      o = MO.Class.inherits(this, o, FDsTemplateFrameSet);
      //..........................................................
      // @property
      o._frameName = 'resource.share.template.FrameSet';
      //..........................................................
      // @process
      o.onBuilded  = FDsShareTemplateFrameSet_onBuilded;
      return o;
   }

   //==========================================================
   // <T>构建完成处理。</T>
   //
   // @method
   // @param p:event:TEventProcess 事件处理
   //==========================================================
   MO.FDsShareTemplateFrameSet_onBuilded = function FDsShareTemplateFrameSet_onBuilded(event){
      var o = this;
      o.__base.FDsTemplateFrameSet.onBuilded.call(o, event);
      //..........................................................
      // 设置目录工具栏
      var toolbar = o._catalogToolbar = MO.Class.create(FDsShareTemplateCatalogToolBar);
      toolbar._frameSet = o;
      toolbar.buildDefine(event);
      o._frameCatalogToolBar.push(toolbar);
      // 设置目录栏
      var catalog = o._catalogContent = MO.Class.create(FDsTemplateCatalogContent);
      catalog._frameSet = o;
      catalog.build(event);
      catalog.addSelectedListener(o, o.onCatalogSelected);
      o._frameCatalogContent.push(catalog);
      //..........................................................
      // 设置画板工具栏
      var toolbar = o._canvasToolbar = MO.Class.create(FDsShareTemplateCanvasToolBar);
      toolbar._frameSet = o;
      toolbar._workspace = o._worksapce;
      toolbar.buildDefine(event);
      o._frameCanvasToolBar.push(toolbar);
      // 设置画板
      var canvas = o._canvasContent = MO.Class.create(FDsTemplateCanvasContent);
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
