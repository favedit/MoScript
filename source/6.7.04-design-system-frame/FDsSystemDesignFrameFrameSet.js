with(MO){
   //==========================================================
   // <T>资源框架。</T>
   //
   // @author maocy
   // @history 150121
   //==========================================================
   MO.FDsSystemDesignFrameFrameSet = function FDsSystemDesignFrameFrameSet(o){
      o = RClass.inherits(this, o, FDsResourceFrameSet);
      //..........................................................
      // @property
      o._frameName        = 'system.design.frame.FrameSet';
      //..........................................................
      // @process
      o.onBuilded         = FDsSystemDesignFrameFrameSet_onBuilded;
      o.onCatalogSelected = FDsSystemDesignFrameFrameSet_onCatalogSelected;
      return o;
   }

   //==========================================================
   // <T>构建完成处理。</T>
   //
   // @method
   // @param event:TEventProcess 事件处理
   //==========================================================
   MO.FDsSystemDesignFrameFrameSet_onBuilded = function FDsSystemDesignFrameFrameSet_onBuilded(event){
      var o = this;
      o.__base.FDsResourceFrameSet.onBuilded.call(o, event);
      // 设置样式
      o._frameCatalogToolBar._hPanel.className = o.styleName('Toolbar_Ground');
      o._frameCatalogContent._hPanel.className = o.styleName('Catalog_Content');
      o._frameSpaceToolBar._hPanel.className = o.styleName('Toolbar_Ground');
      o._frameSpaceContent._hPanel.className = o.styleName('List_Content');
      //o._framePropertyToolBar._hPanel.className = o.styleName('Toolbar_Ground');
      //o._framePropertyContent._hPanel.className = o.styleName('Property_Content');
      //..........................................................
      // 设置分割
      var f = o._catalogSplitter = o.searchControl('catalogSpliter');
      f.setAlignCd(EUiAlign.Left);
      f.setSizeHtml(o._frameCatalog._hPanel);
      //var f = o._propertySpliter = o.searchControl('propertySpliter');
      //f.setAlignCd(EUiAlign.Right);
      //f.setSizeHtml(o._framePreview._hPanel);
      //..........................................................
      // 设置目录工具栏
      var control = o._catalogToolbar = RClass.create(FDsPrivateResourceCatalogToolBar);
      control._workspace = o._workspace;
      control._frameSet = o;
      control.buildDefine(event);
      o._frameCatalogToolBar.push(control);
      // 设置目录栏
      var control = o._catalogContent = RClass.create(FDsResourceCatalogContent);
      control._workspace = o._workspace;
      control._frameSet = o;
      control.build(event);
      //control.addSelectedListener(o, o.onCatalogSelected);
      o._frameCatalogContent.push(control);
      //..........................................................
      // 设置搜索栏
      var control = o._listToolBar = RClass.create(FDsPrivateResourceListToolBar);
      control._workspace = o._workspace;
      control._frameSet = o;
      control.buildDefine(event);
      o._frameSpaceToolBar.push(control);
      // 设置搜索内容
      var control = o._listContent = RClass.create(FDsResourceListContent);
      control._workspace = o._workspace;
      control._frameSet = o;
      control.build(event);
      o._frameSpaceContent.push(control);
      //..........................................................
      // 设置画板工具栏
      //var control = o._propertyToolbar = RClass.create(FDsResourcePropertyToolBar);
      //control._workspace = o._workspace;
      //control._frameSet = o;
      //control.buildDefine(p);
      //o._framePreviewToolbar.push(control);
      // 设置画板
      //var control = o._propertyContent = RClass.create(FDsResourcePropertyContent);
      //control._workspace = o._workspace;
      //control._frameSet = o;
      //control._toolbar = o._propertyToolbar;
      //control._hParent = f._hPanel;
      //control.build(p);
      //o._framePreviewContent.push(control);
   }

   //==========================================================
   // <T>目录对象选择处理。</T>
   //
   // @method
   // @param p:value:Object 对象
   //==========================================================
   MO.FDsSystemDesignFrameFrameSet_onCatalogSelected = function FDsSystemDesignFrameFrameSet_onCatalogSelected(p, pc){
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
}
