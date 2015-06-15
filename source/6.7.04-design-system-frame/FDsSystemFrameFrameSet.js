with(MO){
   //==========================================================
   // <T>资源框架。</T>
   //
   // @author maocy
   // @history 150121
   //==========================================================
   MO.FDsSystemFrameFrameSet = function FDsSystemFrameFrameSet(o){
      o = RClass.inherits(this, o, FDsFrameSet);
      //..........................................................
      // @style
      o._styleToolbarGround   = RClass.register(o, new AStyle('_styleToolbarGround', 'Toolbar_Ground'));
      o._styleCatalogContent  = RClass.register(o, new AStyle('_styleCatalogContent', 'Catalog_Content'));
      o._styleSpaceContent     = RClass.register(o, new AStyle('_styleSpaceContent', 'Space_Content'));
      o._stylePropertyContent = RClass.register(o, new AStyle('_stylePropertyContent', 'Property_Content'));
      //..........................................................
      // @property
      o._frameName            = 'system.design.frame.FrameSet';
      // @attribute
      o._frameCatalog         = null;
      o._frameCatalogToolbar  = null;
      o._frameCatalogContent  = null;
      o._frameSearch          = null;
      o._frameSearchToolbar   = null;
      o._frameSearchContent   = null;
      o._framePreview         = null;
      o._framePreviewToolbar  = null;
      o._framePreviewContent  = null;
      //..........................................................
      // @process
      o.onBuilded             = FDsSystemFrameFrameSet_onBuilded;
      o.onCatalogSelected     = FDsSystemFrameFrameSet_onCatalogSelected;
      //..........................................................
      // @method
      o.construct             = FDsSystemFrameFrameSet_construct;
      // @method
      o.load                  = FDsSystemFrameFrameSet_load;
      // @method
      o.dispose               = FDsSystemFrameFrameSet_dispose;
      return o;
   }

   //==========================================================
   // <T>构建完成处理。</T>
   //
   // @method
   // @param event:TEventProcess 事件处理
   //==========================================================
   MO.FDsSystemFrameFrameSet_onBuilded = function FDsSystemFrameFrameSet_onBuilded(event){
      var o = this;
      o.__base.FDsFrameSet.onBuilded.call(o, event);
      // 设置样式
      o._frameCatalogToolBar._hPanel.className = o.styleName('Toolbar_Ground');
      o._frameCatalogContent._hPanel.className = o.styleName('Catalog_Content');
      o._frameSpaceToolBar._hPanel.className = o.styleName('Toolbar_Ground');
      o._frameSpaceContent._hPanel.className = o.styleName('Space_Content');
      o._framePropertyToolBar._hPanel.className = o.styleName('Toolbar_Ground');
      o._framePropertyContent._hPanel.className = o.styleName('Property_Content');
      //..........................................................
      // 设置分割
      var spliter = o._catalogSplitter = o.searchControl('catalogSpliter');
      spliter.setAlignCd(EUiAlign.Left);
      spliter.setSizeHtml(o._frameCatalog._hPanel);
      var spliter = o._propertySpliter = o.searchControl('propertySpliter');
      spliter.setAlignCd(EUiAlign.Right);
      spliter.setSizeHtml(o._frameProperty._hPanel);
      //..........................................................
      // 设置目录工具栏
      var control = o._catalogToolbar = RClass.create(FDsSystemFrameCatalogToolBar);
      control._workspace = o._workspace;
      control._frameSet = o;
      control.buildDefine(event);
      o._frameCatalogToolBar.push(control);
      // 设置目录内容
      var control = o._catalogContent = RClass.create(FDsSystemFrameCatalogContent);
      control._workspace = o._workspace;
      control._frameSet = o;
      control.build(event);
      //control.addSelectedListener(o, o.onCatalogSelected);
      o._frameCatalogContent.push(control);
      //..........................................................
      // 设置空间工具栏
      var control = o._spaceToolBar = RClass.create(FDsSystemFrameSpaceToolBar);
      control._workspace = o._workspace;
      control._frameSet = o;
      control.buildDefine(event);
      o._frameSpaceToolBar.push(control);
      // 设置空间内容
      var control = o._spaceContent = RClass.create(FDsSystemFrameSpaceContent);
      control._workspace = o._workspace;
      control._frameSet = o;
      control.build(event);
      o._frameSpaceContent.push(control);
      //..........................................................
      // 设置属性工具栏
      var control = o._propertyToolbar = RClass.create(FDsSystemFramePropertyToolBar);
      control._workspace = o._workspace;
      control._frameSet = o;
      control.buildDefine(event);
      o._framePropertyToolBar.push(control);
      // 设置属性内容
      var control = o._propertyContent = RClass.create(FDsSystemFramePropertyContent);
      control._workspace = o._workspace;
      control._frameSet = o;
      control._toolbar = o._propertyToolbar;
      control.build(event);
      o._framePropertyContent.push(control);
   }

   //==========================================================
   // <T>目录对象选择处理。</T>
   //
   // @method
   // @param p:value:Object 对象
   //==========================================================
   MO.FDsSystemFrameFrameSet_onCatalogSelected = function FDsSystemFrameFrameSet_onCatalogSelected(p, pc){
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
   MO.FDsSystemFrameFrameSet_construct = function FDsSystemFrameFrameSet_construct(){
      var o = this;
      // 父处理
      o.__base.FDsFrameSet.construct.call(o);
   }

   //==========================================================
   // <T>加载处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsSystemFrameFrameSet_load = function FDsSystemFrameFrameSet_load(){
      var o = this;
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsSystemFrameFrameSet_dispose = function FDsSystemFrameFrameSet_dispose(){
      var o = this;
      // 父处理
      o.__base.FDsFrameSet.dispose.call(o);
   }
}
