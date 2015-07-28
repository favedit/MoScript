with(MO){
   //==========================================================
   // <T>模板工作区域。</T>
   //
   // @author maocy
   // @history 150121
   //==========================================================
   MO.FDsShareResourceWorkspace = function FDsShareResourceWorkspace(o){
      o = RClass.inherits(this, o, FDuiWorkspace);
      //..........................................................
      // @property
      o._frameName            = 'resource.share.resource.Workspace';
      //..........................................................
      // @style
      o._styleToolbarGround   = RClass.register(o, new AStyle('_styleToolbarGround', 'Toolbar_Ground'));
      o._styleStatusbarGround = RClass.register(o, new AStyle('_styleStatusbarGround', 'Statusbar_Ground'));
      o._styleCatalogGround   = RClass.register(o, new AStyle('_styleCatalogGround', 'Catalog_Ground'));
      o._styleCatalogToolbar  = RClass.register(o, new AStyle('_styleCatalogToolbar', 'Catalog_Toolbar'));
      o._styleSearchGround    = RClass.register(o, new AStyle('_styleSearchGround', 'Search_Ground'));
      o._styleSearchToolbar   = RClass.register(o, new AStyle('_styleCatalogToolbar', 'Search_Toolbar'));
      o._stylePreviewGround   = RClass.register(o, new AStyle('_stylePreviewGround', 'Preview_Ground'));
      o._stylePreviewToolbar  = RClass.register(o, new AStyle('_stylePreviewToolbar', 'Preview_Toolbar'));
      o._stylePropertyGround  = RClass.register(o, new AStyle('_stylePropertyGround', 'Property_Ground'));
      o._styleWorkspaceGround = RClass.register(o, new AStyle('_styleWorkspaceGround', 'Workspace_Ground'));
      //..........................................................
      // @attribute
      o._resourceTypeCd       = 'picture';
      // @attribute
      o._frameToolBar         = null;
      o._frameStatusBar       = null;
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
      // @attribute
      o._propertyFrames       = null;
      //..........................................................
      // @process
      o.onBuilded             = FDsShareResourceWorkspace_onBuilded;
      o.onMeshLoad            = FDsShareResourceWorkspace_onMeshLoad;
      o.onCatalogSelected     = FDsShareResourceWorkspace_onCatalogSelected;
      //..........................................................
      // @method
      o.construct             = FDsShareResourceWorkspace_construct;
      // @method
      o.findPropertyFrame     = FDsShareResourceWorkspace_findPropertyFrame;
      // @method
      o.switchContent         = FDsShareResourceWorkspace_switchContent;
      o.load                  = FDsShareResourceWorkspace_load;
      // @method
      o.dispose               = FDsShareResourceWorkspace_dispose;
      return o;
   }

   //==========================================================
   // <T>构建完成处理。</T>
   //
   // @method
   // @param p:event:TEventProcess 事件处理
   //==========================================================
   MO.FDsShareResourceWorkspace_onBuilded = function FDsShareResourceWorkspace_onBuilded(p){
      var o = this;
      o.__base.FDuiWorkspace.onBuilded.call(o, p);
      //..........................................................
      // 设置工具区
      var frame = o._frameToolBar = o.searchControl('toolbarFrame');
      frame._hPanel.className = o.styleName('Toolbar_Ground');
      // 设置目录区
      var frame = o._frameBody = o.searchControl('bodyFrame');
      frame._hPanel.className = o.styleName('Catalog_Ground');
      // 设置状态区
      var frame = o._frameStatusBar = o.searchControl('statusFrame');
      frame._hPanel.className = o.styleName('Statusbar_Ground');
      //..........................................................
      var hTable = RBuilder.createTable(p);
      hTable.width = '100%';
      var hRow = RBuilder.appendTableRow(hTable);
      // 设置工具栏
      var c = o._toolbar = RClass.create(FDsShareResourceMenuBar);
      c._workspace = o;
      c.buildDefine(p);
      var hCell = RBuilder.appendTableCell(hRow);
      hCell.appendChild(c._hPanel);
      // 设置分页栏
      var c = o._tabBar = RClass.create(FDsShareResourceTabBar);
      c._workspace = o;
      c.buildDefine(p);
      var hCell = RBuilder.appendTableCell(hRow);
      hCell.width = '450px';
      hCell.align = 'right';
      hCell.vAlign = 'bottom';
      hCell.appendChild(c._hPanel);
      //o._frameToolBar.push(c);
      o._frameToolBar._hPanel.appendChild(hTable);
      //..........................................................
      // 创建框架
      var frameSet = o._frameSet = RClass.create(FDsShareResourceFrameSet);
      frameSet._workspace = o;
      frameSet.buildDefine(p);
      o._frameBody.push(frameSet);
      //..........................................................
      frameSet.switchContent(o._resourceTypeCd);
   }

   //==========================================================
   // <T>加载模板处理。</T>
   //
   // @method
   // @param p:template:FTemplate3d 模板
   //==========================================================
   MO.FDsShareResourceWorkspace_onMeshLoad = function FDsShareResourceWorkspace_onMeshLoad(p){
      var o = this;
      o._activeSpace = p._activeSpace;
      // 加载完成
      o._catalog.buildSpace(o._activeSpace);
   }

   //==========================================================
   // <T>目录对象选择处理。</T>
   //
   // @method
   // @param p:value:Object 对象
   //==========================================================
   MO.FDsShareResourceWorkspace_onCatalogSelected = function FDsShareResourceWorkspace_onCatalogSelected(p, pc){
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
   MO.FDsShareResourceWorkspace_construct = function FDsShareResourceWorkspace_construct(){
      var o = this;
      // 父处理
      o.__base.FDuiWorkspace.construct.call(o);
      // 设置属性
      o._propertyFrames = new TDictionary();
   }

   //==========================================================
   // <T>根据名称获得属性页面。</T>
   //
   // @method
   // @return FDuiFrame 页面
   //==========================================================
   MO.FDsShareResourceWorkspace_findPropertyFrame = function FDsShareResourceWorkspace_findPropertyFrame(p){
      var o = this;
      var f = o._propertyFrames.get(p);
      if(!f){
         var fc = RConsole.find(FFrameConsole);
         f = fc.get(o, p, o._framePreview._hContainer);
         f._workspace = o;
         o._propertyFrames.set(p, f);
      }
      return f;
   }

   //==========================================================
   // <T>选择内容。</T>
   //
   // @method
   // @param typeCd:String 内容类型
   //==========================================================
   MO.FDsShareResourceWorkspace_switchContent = function FDsShareResourceWorkspace_switchContent(typeCd){
      this._frameSet.switchContent(typeCd);
   }

   //==========================================================
   // <T>加载处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsShareResourceWorkspace_load = function FDsShareResourceWorkspace_load(){
      var o = this;
      //o._meshCode = p;
      //o._canvas.load(p);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsShareResourceWorkspace_dispose = function FDsShareResourceWorkspace_dispose(){
      var o = this;
      // 父处理
      o.__base.FDuiWorkspace.dispose.call(o);
      // 设置属性
      o._propertyFrames.dispose();
      o._propertyFrames = null;
   }
}
