with(MO){
   //==========================================================
   // <T>模板工作区域。</T>
   //
   // @author maocy
   // @history 150121
   //==========================================================
   MO.FDsMaterialWorkspace = function FDsMaterialWorkspace(o){
      o = MO.Class.inherits(this, o, FDuiWorkspace);
      //..........................................................
      // @property
      o._frameName            = 'design2d.bitmap.Workspace';
      //..........................................................
      // @style
      o._styleWorkspaceGround = MO.Class.register(o, new MO.AStyle('_styleWorkspaceGround', 'Workspace_Ground'));
      o._styleToolbarGround   = MO.Class.register(o, new MO.AStyle('_styleToolbarGround', 'Toolbar_Ground'));
      o._styleBodyGround      = MO.Class.register(o, new MO.AStyle('_styleBodyGround', 'Body_Ground'));
      o._styleStatusbarGround = MO.Class.register(o, new MO.AStyle('_styleStatusbarGround', 'Statusbar_Ground'));
      //..........................................................
      // @attribute
      o._activeSpace          = null;
      o._activeMesh           = null;
      // @attribute
      o._framesetMain         = null;
      o._framesetBody         = null;
      // @attribute
      o._frameToolBar         = null;
      o._frameBody            = null;
      o._frameProperty        = null;
      o._frameSet             = null;
      // @attribute
      o._propertyFrames       = null;
      //..........................................................
      // @process
      o.onBuilded             = FDsMaterialWorkspace_onBuilded;
      o.onMeshLoad            = FDsMaterialWorkspace_onMeshLoad;
      o.onCatalogSelected     = FDsMaterialWorkspace_onCatalogSelected;
      //..........................................................
      // @method
      o.construct             = FDsMaterialWorkspace_construct;
      // @method
      o.findPropertyFrame     = FDsMaterialWorkspace_findPropertyFrame;
      // @method
      o.loadByGuid            = FDsMaterialWorkspace_loadByGuid;
      o.loadByCode            = FDsMaterialWorkspace_loadByCode;
      // @method
      o.dispose               = FDsMaterialWorkspace_dispose;
      return o;
   }

   //==========================================================
   // <T>构建完成处理。</T>
   //
   // @method
   // @param p:event:TEventProcess 事件处理
   //==========================================================
   MO.FDsMaterialWorkspace_onBuilded = function FDsMaterialWorkspace_onBuilded(p){
      var o = this;
      o.__base.FDuiWorkspace.onBuilded.call(o, p);
      //..........................................................
      // 设置工具区
      var frame = o._frameToolBar = o.searchControl('toolbarFrame');
      frame._hPanel.className = o.styleName('Toolbar_Ground');
      // 设置属性区
      var frame = o._frameBody = o.searchControl('bodyFrame');
      frame._hPanel.className = o.styleName('Body_Ground');
      // 设置状态区
      var frame = o._frameStatusBar = o.searchControl('statusFrame');
      frame._hPanel.className = o.styleName('Statusbar_Ground');
      //..........................................................
      // 设置工具栏
      var menuBar = o._menuBar = MO.Class.create(FDsMaterialMenuBar);
      menuBar._workspace = o;
      menuBar.buildDefine(p);
      o._frameToolBar.push(menuBar);
      //..........................................................
      // 创建框架
      var frameSet = o._frameSet = MO.Class.create(FDsMaterialFrameSet);
      frameSet._workspace = o;
      frameSet.buildDefine(p);
      o._frameBody.push(frameSet);
      // 设置关联
      menuBar._frameSet = frameSet;
   }

   //==========================================================
   // <T>加载模板处理。</T>
   //
   // @method
   // @param p:template:FTemplate3d 模板
   //==========================================================
   MO.FDsMaterialWorkspace_onMeshLoad = function FDsMaterialWorkspace_onMeshLoad(p){
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
   MO.FDsMaterialWorkspace_onCatalogSelected = function FDsMaterialWorkspace_onCatalogSelected(p, pc){
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
      if(MO.Class.isClass(p, FE3dStage)){
         var f = o.findPropertyFrame(EDsFrame.MeshSpacePropertyFrame);
         f.show();
         f.loadObject(space, space);
      }else if(MO.Class.isClass(p, FG3dTechnique)){
         var f = o.findPropertyFrame(EDsFrame.MeshTechniquePropertyFrame);
         f.show();
         f.loadObject(space, p);
      }else if(MO.Class.isClass(p, FE3dRegion)){
         var f = o.findPropertyFrame(EDsFrame.MeshRegionPropertyFrame);
         f.show();
         f.loadObject(space, p);
      }else if(MO.Class.isClass(p, FE3dCamera)){
         var f = o.findPropertyFrame(EDsFrame.MeshCameraPropertyFrame);
         f.show();
         f.loadObject(space, p);
      }else if(MO.Class.isClass(p, FG3dDirectionalLight)){
         var f = o.findPropertyFrame(EDsFrame.MeshLightPropertyFrame);
         f.show();
         f.loadObject(space, p);
      }else if(MO.Class.isClass(p, FE3dMeshDisplay)){
         var f = o.findPropertyFrame(EDsFrame.MeshDisplayPropertyFrame);
         f.show();
         f.loadObject(space, p);
      }else if(MO.Class.isClass(p, FG3dMaterial)){
         var f = o.findPropertyFrame(EDsFrame.MeshMaterialPropertyFrame);
         f.show();
         f.loadObject(space, p);
      }else if(MO.Class.isClass(p, FE3dMeshRenderable)){
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
   MO.FDsMaterialWorkspace_construct = function FDsMaterialWorkspace_construct(){
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
   MO.FDsMaterialWorkspace_findPropertyFrame = function FDsMaterialWorkspace_findPropertyFrame(p){
      var o = this;
      var f = o._propertyFrames.get(p);
      if(!f){
         var fc = MO.Console.find(FFrameConsole);
         f = fc.get(o, p, o._frameProperty._hContainer);
         f._workspace = o;
         o._propertyFrames.set(p, f);
      }
      return f;
   }

   //==========================================================
   // <T>根据唯一编号加载网格。</T>
   //
   // @method
   // @param guid 唯一编号
   //==========================================================
   MO.FDsMaterialWorkspace_loadByGuid = function FDsMaterialWorkspace_loadByGuid(guid){
      this._frameSet.loadByGuid(guid);
   }

   //==========================================================
   // <T>根据代码加载网格。</T>
   //
   // @method
   // @param code:String 代码
   //==========================================================
   MO.FDsMaterialWorkspace_loadByCode = function FDsMaterialWorkspace_loadByCode(code){
      this._frameSet.loadByCode(code);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsMaterialWorkspace_dispose = function FDsMaterialWorkspace_dispose(){
      var o = this;
      // 父处理
      o.__base.FDuiWorkspace.dispose.call(o);
      // 设置属性
      o._propertyFrames.dispose();
      o._propertyFrames = null;
   }
}
