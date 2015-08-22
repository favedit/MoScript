with(MO){
   //==========================================================
   // <T>主工作区域。</T>
   //
   // @author maocy
   // @history 150121
   //==========================================================
   MO.FDsMainWorkspace = function FDsMainWorkspace(o){
      o = MO.Class.inherits(this, o, FWorkspace);
      //..........................................................
      // @style
      o._styleToolbarGround   = MO.Class.register(o, new MO.AStyle('_styleToolbarGround', 'Toolbar_Ground'));
      o._styleStatusbarGround = MO.Class.register(o, new MO.AStyle('_styleStatusbarGround', 'Statusbar_Ground'));
      o._styleCatalogGround   = MO.Class.register(o, new MO.AStyle('_styleCatalogGround', 'Catalog_Ground'));
      o._styleWorkspaceGround = MO.Class.register(o, new MO.AStyle('_styleWorkspaceGround', 'Workspace_Ground'));
      o._stylePropertyGround  = MO.Class.register(o, new MO.AStyle('_stylePropertyGround', 'Property_Ground'));
      //..........................................................
      // @attribute
      o._framesetMain         = null;
      o._framesetBody         = null;
      // @attribute
      o._frameToolBar         = null;
      o._frameBody            = null;
      o._frameProperty        = null;
      // @attribute
      o._frameCatalog         = null;
      o._frameWorkspace       = null;
      o._frameStatusBar       = null;
      //..........................................................
      // @process
      o.onBuild               = FDsMainWorkspace_onBuild;
      //..........................................................
      // @method
      o.construct             = FDsMainWorkspace_construct;
      // @method
      o.dispose               = FDsMainWorkspace_dispose;
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsMainWorkspace_construct = function FDsMainWorkspace_construct(){
      var o = this;
      o.__base.FWorkspace.construct.call(o);
   }

   //==========================================================
   // <T>建立当前控件的显示框架。</T>
   //
   // @method
   // @param p:event:TEventProcess 事件处理
   //==========================================================
   MO.FDsMainWorkspace_onBuild = function FDsMainWorkspace_onBuild(p){
      var o = this;
      o.__base.FWorkspace.onBuild.call(o, p);
      o._hPanel.style.width = '100%';
      o._hPanel.style.height = '100%';
      // 建立主框架
      var fs = o._framesetMain = MO.Class.create(FFrameSet);
      fs.build(p);
      // 建立工具区
      var f = o._frameToolBar = MO.Class.create(FFrame);
      f.setHeight(26);
      f.build(p);
      f._hPanel.className = o.styleName('Toolbar_Ground');
      fs.appendFrame(f);
      // 建立内容区
      var f = o._frameBody = MO.Class.create(FFrame);
      f.build(p);
      fs.appendFrame(f);
      // 建立状态区
      var f = o._frameProperty = MO.Class.create(FFrame);
      f.setHeight(18);
      f.build(p);
      f._hPanel.className = o.styleName('Statusbar_Ground');
      fs.appendFrame(f);
      fs.setPanel(o._hPanel);
      //..........................................................
      // 建立内容框架
      var fs = MO.Class.create(FFrameSet);
      fs._directionCd = EDirection.Horizontal;
      fs.build(p);
      // 建立目录区
      var f = o._frameCatalog = MO.Class.create(FFrame);
      f.setWidth(300);
      f.build(p);
      f._hPanel.className = o.styleName('Catalog_Ground');
      fs.appendFrame(f);
      // 建立分割符
      var sp1 = fs.appendSpliter();
      // 建立工作区
      var f = o._frameWorkspace = MO.Class.create(FFrame);
      f.build(p);
      f._hPanel.className = o.styleName('Workspace_Ground');
      fs.appendFrame(f);
      // 建立分割符
      var sp2 = fs.appendSpliter();
      // 建立属性区
      var f = o._frameStatusBar = MO.Class.create(FFrame);
      f.setWidth(360);
      f.build(p);
      f._hPanel.className = o.styleName('Property_Ground');
      fs.appendFrame(f);
      fs.setPanel(o._frameBody._hPanel);
      // 设置分割
      sp1._alignCd = EAlign.Left;
      sp1._hSize = o._frameCatalog._hPanel;
      sp2._alignCd = EAlign.Right;
      sp2._hSize = o._frameStatusBar._hPanel;
      //..........................................................
      //var c = o._menubar = MO.Class.create(FDsMainMenuBar);
      //c.build(p);
      //c.setPanel(o._frameToolBar._hPanel);
      //..........................................................
      var c = o._catalog = MO.Class.create(FDsMainCatalog);
      c._worksapce = o;
      c.build(p);
      c.setPanel(o._frameCatalog._hPanel);
      o.push(c);
      //..........................................................
      var c = o._toolbar = MO.Class.create(FDsMainToolBar);
      c._worksapce = o;
      c.build(p);
      c.setPanel(o._frameToolBar._hPanel);
      c._persistenceButton.click();
      o.push(c);
      //..........................................................
      var c = o._canvas = MO.Class.create(FDsMainCanvas);
      c._worksapce = o;
      c.build(p);
      c.setPanel(o._frameWorkspace._hPanel);
      o.push(c);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsMainWorkspace_dispose = function FDsMainWorkspace_dispose(){
      var o = this;
      // 父处理
      o.__base.FWorkspace.dispose.call(o);
   }
}
