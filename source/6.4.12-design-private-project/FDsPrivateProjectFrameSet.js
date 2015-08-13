with(MO){
   //==========================================================
   // <T>模板工作区域。</T>
   //
   // @author maocy
   // @history 150121
   //==========================================================
   MO.FDsPrivateProjectFrameSet = function FDsPrivateProjectFrameSet(o){
      o = MO.Class.inherits(this, o, FDsProjectFrameSet);
      //..........................................................
      // @property
      o._frameName = 'resource.private.project.FrameSet';
      //..........................................................
      // @process
      o.onBuilded  = FDsPrivateProjectFrameSet_onBuilded;
      return o;
   }

   //==========================================================
   // <T>构建完成处理。</T>
   //
   // @method
   // @param event:TEventProcess 事件处理
   //==========================================================
   MO.FDsPrivateProjectFrameSet_onBuilded = function FDsPrivateProjectFrameSet_onBuilded(event){
      var o = this;
      o.__base.FDsProjectFrameSet.onBuilded.call(o, event);
      //..........................................................
      // 设置场景列表工具栏
      var control = o._sceneListToolbar = MO.Class.create(FDsProjectSceneListToolBar);
      control._frameSet = o;
      control.buildDefine(event);
      o._frameSceneListToolBar.push(control);
      // 设置场景列表内容
      var control = o._sceneListContent = MO.Class.create(FDsProjectSceneListContent);
      control._frameSet = o;
      control.build(event);
      o._frameSceneListContent.push(control);
      //..........................................................
      // 设置场景列表工具栏
      var control = o._sceneCatalogToolbar = MO.Class.create(FDsProjectSceneCatalogToolBar);
      control._frameSet = o;
      control.buildDefine(event);
      o._frameSceneCatalogToolBar.push(control);
      // 设置场景列表内容
      var control = o._sceneCatalogContent = MO.Class.create(FDsProjectSceneCatalogContent);
      control._frameSet = o;
      control.build(event);
      o._frameSceneCatalogContent.push(control);
      //..........................................................
      // 设置画板空间工具栏
      var control = o._canvasSpaceToolbar = MO.Class.create(FDsProjectCanvasSpaceToolBar);
      control._frameSet = o;
      control.buildDefine(event);
      o._frameCanvasSpaceToolBar.push(control);
      // 设置画板
      //var f = o._canvasFrame = o.searchControl('canvasFrame');
      //var c = o._canvas = MO.Class.create(FDsMeshCanvas);
      //c._workspace = o;
      //c._toolbar = o._canvasToolbar;
      //c.addLoadListener(o, o.onMeshLoad);
      //c._hParent = f._hPanel;
      //c._hParent.style.backgroundColor = '#000000';
      //c.build(p);
      //o._canvasFrame.push(c);
      //..........................................................
      // 设置画板空间工具栏
      var control = o._canvasPreviewToolbar = MO.Class.create(FDsProjectCanvasPreviewToolBar);
      control._frameSet = o;
      control.buildDefine(event);
      o._frameCanvasPreviewToolBar.push(control);
      // 设置画板
      //..........................................................
      // 设置属性栏
      var control = o._propertyToolbar = MO.Class.create(FDsProjectPropertyToolBar);
      control._frameSet = o;
      control.buildDefine(event);
      o._framePropertyAttributeToolBar.push(control);
   }
}
