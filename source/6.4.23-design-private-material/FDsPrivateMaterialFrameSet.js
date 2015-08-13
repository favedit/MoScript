with(MO){
   //==========================================================
   // <T>私有材质框架。</T>
   //
   // @class
   // @author maocy
   // @history 150424
   //==========================================================
   MO.FDsPrivateMaterialFrameSet = function FDsPrivateMaterialFrameSet(o){
      o = MO.Class.inherits(this, o, FDsMaterialFrameSet);
      //..........................................................
      // @property
      o._frameName = 'resource.private.material.FrameSet';
      //..........................................................
      // @process
      o.onBuilded  = FDsPrivateMaterialFrameSet_onBuilded;
      return o;
   }

   //==========================================================
   // <T>构建完成处理。</T>
   //
   // @method
   // @param event:TEventProcess 事件处理
   //==========================================================
   MO.FDsPrivateMaterialFrameSet_onBuilded = function FDsPrivateMaterialFrameSet_onBuilded(event){
      var o = this;
      o.__base.FDsMaterialFrameSet.onBuilded.call(o, event);
      //..........................................................
      // 设置目录工具栏
      var toolbar = o._catalogToolBar = MO.Class.create(FDsPrivateMaterialCatalogToolBar);
      toolbar._frameSet = o;
      toolbar.buildDefine(event);
      o._frameCatalogToolBar.push(toolbar);
      // 设置目录内容
      var catalog = o._catalogContent = MO.Class.create(FDsMaterialCatalogContent);
      catalog._frameSet = o;
      catalog.build(event);
      //catalog.addSelectedListener(o, o.onCatalogSelected);
      o._frameCatalogContent.push(catalog);
      //..........................................................
      // 设置画板工具栏
      var toolbar = o._canvasToolBar = MO.Class.create(FDsPrivateMaterialCanvasToolBar);
      toolbar._frameSet = o;
      toolbar.buildDefine(event);
      o._frameCanvasToolBar.push(toolbar);
      //..........................................................
      // 设置属性工具栏
      var toolbar = o._propertyToolBar = MO.Class.create(FDsMaterialPropertyToolBar);
      toolbar._frameSet = o;
      toolbar.buildDefine(event);
      o._framePropertyToolBar.push(toolbar);
      // 设置属性内容
      //var frame = o.findPropertyFrame(EDsFrame.BitmapPropertyFrame);
      //o._framePropertyContent.push(frame);
   }
}
