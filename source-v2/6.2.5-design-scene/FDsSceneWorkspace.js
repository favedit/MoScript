//==========================================================
// <T>模板工作区域。</T>
//
// @author maocy
// @history 150121
//==========================================================
function FDsSceneWorkspace(o){
   o = RClass.inherits(this, o, FUiWorkspace);
   //..........................................................
   // @style
   o._styleToolbarGround    = RClass.register(o, new AStyle('_styleToolbarGround', 'Toolbar_Ground'));
   o._styleStatusbarGround  = RClass.register(o, new AStyle('_styleStatusbarGround', 'Statusbar_Ground'));
   o._styleCatalogGround    = RClass.register(o, new AStyle('_styleCatalogGround', 'Catalog_Ground'));
   o._styleWorkspaceGround  = RClass.register(o, new AStyle('_styleWorkspaceGround', 'Workspace_Ground'));
   o._stylePropertyGround   = RClass.register(o, new AStyle('_stylePropertyGround', 'Property_Ground'));
   //..........................................................
   // @attribute
   o._framesetMain          = null;
   o._framesetBody          = null;
   // @attribute
   o._frameToolBar          = null;
   o._frameBody             = null;
   o._frameProperty         = null;
   // @attribute
   o._frameCatalog          = null;
   o._frameWorkspace        = null;
   o._frameStatusBar        = null;
   // @attribute
   o._templatePropertyFrame = null;
   o._themePropertyFrame    = null;
   o._materialPropertyFrame = null;
   o._displayPropertyFrame  = null;
   //..........................................................
   // @process
   o.onBuild                = FDsSceneWorkspace_onBuild;
   o.onTemplateLoad         = FDsSceneWorkspace_onTemplateLoad;
   o.onCatalogSelected      = FDsSceneWorkspace_onCatalogSelected;
   //..........................................................
   // @method
   o.construct              = FDsSceneWorkspace_construct;
   // @method
   o.templatePropertyFrame  = FDsSceneWorkspace_templatePropertyFrame;
   o.themePropertyFrame     = FDsSceneWorkspace_themePropertyFrame;
   o.materialPropertyFrame  = FDsSceneWorkspace_materialPropertyFrame;
   o.displayPropertyFrame   = FDsSceneWorkspace_displayPropertyFrame;
   // @method
   o.loadScene              = FDsSceneWorkspace_loadScene;
   // @method
   o.dispose                = FDsSceneWorkspace_dispose;
   return o;
}

//==========================================================
// <T>建立当前控件的显示框架。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
function FDsSceneWorkspace_onBuild(p){
   var o = this;
   o.__base.FUiWorkspace.onBuild.call(o, p);
   o._hPanel.style.width = '100%';
   o._hPanel.style.height = '100%';
   // 建立主框架
   var fs = o._framesetMain = RClass.create(FUiFrameSet);
   fs.build(p);
   // 建立工具区
   var f = o._frameToolBar = RClass.create(FUiFrameContainer);
   f.setHeight(26);
   f.build(p);
   f._hPanel.className = o.styleName('Toolbar_Ground');
   fs.appendFrame(f);
   // 建立内容区
   var f = o._frameBody = RClass.create(FUiFrameContainer);
   f.build(p);
   fs.appendFrame(f);
   // 建立状态区
   var f = o._frameStatusBar = RClass.create(FUiFrameContainer);
   f.setHeight(18);
   f.build(p);
   f._hPanel.className = o.styleName('Statusbar_Ground');
   fs.appendFrame(f);
   fs.setPanel(o._hPanel);
   //..........................................................
   // 建立内容框架
   var fs = RClass.create(FUiFrameSet);
   fs._directionCd = EDirection.Horizontal;
   fs.build(p);
   // 建立目录区
   var f = o._frameCatalog = RClass.create(FUiFrameContainer);
   f.setWidth(400);
   f.build(p);
   f._hPanel.className = o.styleName('Catalog_Ground');
   fs.appendFrame(f);
   // 建立分割符
   var sp1 = fs.appendSpliter();
   // 建立工作区
   var f = o._frameWorkspace = RClass.create(FUiFrameContainer);
   f.build(p);
   f._hPanel.className = o.styleName('Workspace_Ground');
   fs.appendFrame(f);
   // 建立分割符
   var sp2 = fs.appendSpliter();
   // 建立属性区
   var f = o._frameProperty = RClass.create(FUiFrameContainer);
   f.setWidth(240);
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
   var c = o._catalog = RClass.create(FDsSceneCatalog);
   c._workspace = o;
   c.build(p);
   c.setPanel(o._frameCatalog._hPanel);
   c.addSelectedListener(o, o.onCatalogSelected);
   o.push(c);
   //..........................................................
   var c = o._toolbar = RClass.create(FDsSceneToolBar);
   c._workspace = o;
   c.build(p);
   c.setPanel(o._frameToolBar._hPanel);
   o.push(c);
   //..........................................................
   var hf = RBuilder.appendTable(o._frameWorkspace._hPanel);
   hf.style.width = '100%';
   hf.style.height = '100%';
   // 建立工具栏
   var hc = RBuilder.appendTableRowCell(hf);
   hc.height = 20;
   var c = o._canvasToolbar = RClass.create(FDsSceneCanvasToolBar);
   c._workspace = o;
   c.build(p);
   c.setPanel(hc);
   o.push(c);
   // 建立画板
   var hc = RBuilder.appendTableRowCell(hf);
   hc.vAlign = 'top';
   var c = o._canvas = RClass.create(FDsSceneCanvas);
   c.addLoadListener(o, o.onTemplateLoad);
   c._workspace = o;
   c._toolbar = o._canvasToolbar;
   c.build(p);
   c.setPanel(hc);
   o.push(c);
}

//==========================================================
// <T>加载模板处理。</T>
//
// @method
// @param p:template:FTemplate3d 模板
//==========================================================
function FDsSceneWorkspace_onTemplateLoad(p){
   var o = this;
   var t = o._activeScene = p._activeScene;
   // 加载完成
   o._catalog.buildTemplate(t);
   // 设置属性
   o.onCatalogSelected(t);
   //var rt = t._resource;
   //var rtm = rt._themes.get(0);
   //var rm = rtm.materials().value(0);
   //o._materialProperty.loadMaterial(t, rm);
   //o._materialFrame.loadMaterial(t, rm);
}

//==========================================================
// <T>目录对象选择处理。</T>
//
// @method
// @param p:template:FTemplate3d 模板
//==========================================================
function FDsSceneWorkspace_onCatalogSelected(p){
   var o = this;
   var t = o._activeScene;
   // 隐藏所有面板
   if(o._templatePropertyFrame){
      o._templatePropertyFrame.hide();
   }
   if(o._themePropertyFrame){
      o._themePropertyFrame.hide();
   }
   if(o._materialPropertyFrame){
      o._materialPropertyFrame.hide();
   }
   if(o._displayPropertyFrame){
      o._displayPropertyFrame.hide();
   }
   // 显示选中面板
   if(RClass.isClass(p, FE3dScene)){
      var f = o.templatePropertyFrame();
      f.show();
      f.loadObject(t);
   }else if(RClass.isClass(p, FRs3TemplateTheme)){
      var f = o.themePropertyFrame();
      f.show();
      f.loadObject(t, p);
   }else if(RClass.isClass(p, FRs3Material)){
      var f = o.materialPropertyFrame();
      f.show();
      f.loadObject(t, p);
   }else if(RClass.isClass(p, FG3dRenderable)){
      var f = o.displayPropertyFrame();
      f.show();
      f.loadObject(t, p);
      o._canvas.selectRenderable(p);
   }else{
      throw new TError('Unknown select object type. (value={1})', p);
   }
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsSceneWorkspace_construct(){
   var o = this;
   // 父处理
   o.__base.FUiWorkspace.construct.call(o);
}

//==========================================================
// <T>获得模板属性页面。</T>
//
// @method
// @return FDsScenePropertyFrame 模板属性页面
//==========================================================
function FDsSceneWorkspace_templatePropertyFrame(){
   var o = this;
   var f = o._templatePropertyFrame;
   if(!f){
      f = o._templatePropertyFrame = RClass.create(FDsScenePropertyFrame);
      f._workspace = o;
      f.buildDefine(o._hPanel);
      f.setPanel(o._frameProperty._hPanel);
   }
   return f;
}

//==========================================================
// <T>获得主题属性页面。</T>
//
// @method
// @return FDsSceneThemePropertyFrame 主题属性页面
//==========================================================
function FDsSceneWorkspace_themePropertyFrame(){
   var o = this;
   var f = o._themePropertyFrame;
   if(!f){
      var f = o._themePropertyFrame = RClass.create(FDsSceneThemePropertyFrame);
      f._workspace = o;
      f.buildDefine(o._hPanel);
      f.setPanel(o._frameProperty._hPanel);
   }
   return f;
}

//==========================================================
// <T>获得材质属性页面。</T>
//
// @method
// @return FDsSceneMaterialPropertyFrame 材质属性页面
//==========================================================
function FDsSceneWorkspace_materialPropertyFrame(){
   var o = this;
   var f = o._materialPropertyFrame;
   if(!f){
      f = o._materialPropertyFrame = RClass.create(FDsSceneMaterialPropertyFrame);
      f._workspace = o;
      f.buildDefine(o._hPanel);
      f.setPanel(o._frameProperty._hPanel);
   }
   return f;
}

//==========================================================
// <T>获得显示属性页面。</T>
//
// @method
// @return FDsSceneDisplayPropertyFrame 显示属性页面
//==========================================================
function FDsSceneWorkspace_displayPropertyFrame(){
   var o = this;
   var f = o._displayPropertyFrame;
   if(!f){
      f = o._displayPropertyFrame = RClass.create(FDsSceneDisplayPropertyFrame);
      f._workspace = o;
      f.buildDefine(o._hPanel);
      f.setPanel(o._frameProperty._hPanel);
   }
   return f;
}

//==========================================================
// <T>加载模板处理。</T>
//
// @method
//==========================================================
function FDsSceneWorkspace_loadScene(p){
   var o = this;
   o._canvas.loadScene(p);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsSceneWorkspace_dispose(){
   var o = this;
   // 父处理
   o.__base.FUiWorkspace.dispose.call(o);
}
