//==========================================================
// <T>模板工作区域。</T>
//
// @author maocy
// @history 150121
//==========================================================
function FDsTemplateWorkspace(o){
   o = RClass.inherits(this, o, FUiWorkspace);
   //..........................................................
   // @style
   o._styleToolbarGround   = RClass.register(o, new AStyle('_styleToolbarGround', 'Toolbar_Ground'));
   o._styleStatusbarGround = RClass.register(o, new AStyle('_styleStatusbarGround', 'Statusbar_Ground'));
   o._styleCatalogGround   = RClass.register(o, new AStyle('_styleCatalogGround', 'Catalog_Ground'));
   o._styleWorkspaceGround = RClass.register(o, new AStyle('_styleWorkspaceGround', 'Workspace_Ground'));
   o._stylePropertyGround  = RClass.register(o, new AStyle('_stylePropertyGround', 'Property_Ground'));
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
   o.onBuild               = FDsTemplateWorkspace_onBuild;
   o.onTemplateLoad        = FDsTemplateWorkspace_onTemplateLoad;
   o.onCatalogSelected     = FDsTemplateWorkspace_onCatalogSelected;
   //..........................................................
   // @method
   o.construct             = FDsTemplateWorkspace_construct;
   // @method
   o.loadTemplate          = FDsTemplateWorkspace_loadTemplate;
   // @method
   o.dispose               = FDsTemplateWorkspace_dispose;
   return o;
}

//==========================================================
// <T>建立当前控件的显示框架。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
function FDsTemplateWorkspace_onBuild(p){
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
   f.setWidth(300);
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
   var c = o._catalog = RClass.create(FDsTemplateCatalog);
   c._workspace = o;
   c.build(p);
   c.setPanel(o._frameCatalog._hPanel);
   c.addSelectedListener(o, o.onCatalogSelected);
   o.push(c);
   //..........................................................
   var c = o._toolbar = RClass.create(FDsTemplateToolBar);
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
   var c = o._canvasToolbar = RClass.create(FDsTemplateCanvasToolBar);
   c._workspace = o;
   c.build(p);
   c.setPanel(hc);
   o.push(c);
   // 建立画板
   var hc = RBuilder.appendTableRowCell(hf);
   var c = o._canvas = RClass.create(FDsTemplateCanvas);
   c.addLoadListener(o, o.onTemplateLoad);
   c._workspace = o;
   c.build(p);
   c.setPanel(hc);
   o.push(c);
   //..........................................................
   //var c = o._materialFrame = RClass.create(FDsTemplateMaterialFrame);
   //c._workspace = o;
   //c.buildConfig(p);
   //c.setPanel(o._frameProperty._hPanel);
   //..........................................................
   // 创建模板属性页面
   var c = o._templateProperty = RClass.create(FDsTemplatePropertyFrame);
   c._workspace = o;
   c.buildDefine(p);
   c.setPanel(o._frameProperty._hPanel);
   //..........................................................
   // 创建主题属性页面
   var c = o._themeProperty = RClass.create(FDsTemplateThemePropertyFrame);
   c._workspace = o;
   c.buildDefine(p);
   c.setPanel(o._frameProperty._hPanel);
   //..........................................................
   // 创建材质属性页面
   var c = o._materialProperty = RClass.create(FDsTemplateMaterialPropertyFrame);
   c._workspace = o;
   c.buildDefine(p);
   c.setPanel(o._frameProperty._hPanel);
   //..........................................................
   // 创建精灵属性页面
   var c = o._displayProperty = RClass.create(FDsTemplateDisplayPropertyFrame);
   c._workspace = o;
   c.buildDefine(p);
   c.setPanel(o._frameProperty._hPanel);
}

//==========================================================
// <T>加载模板处理。</T>
//
// @method
// @param p:template:FTemplate3d 模板
//==========================================================
function FDsTemplateWorkspace_onTemplateLoad(p){
   var o = this;
   var t = o._activeTemplate = p._activeTemplate;
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
function FDsTemplateWorkspace_onCatalogSelected(p){
   var o = this;
   var t = o._activeTemplate;
   // 隐藏所有面板
   o._templateProperty.hide();
   o._themeProperty.hide();
   o._materialProperty.hide();
   o._displayProperty.hide();
   // 显示选中面板
   if(RClass.isClass(p, FTemplate3d)){
      o._templateProperty.show();
      o._templateProperty.loadObject(t);
   }else if(RClass.isClass(p, FRs3TemplateTheme)){
      o._themeProperty.show();
      o._themeProperty.loadObject(t, p);
   }else if(RClass.isClass(p, FRs3Material)){
      o._materialProperty.show();
      o._materialProperty.loadObject(t, p);
   }else if(RClass.isClass(p, FG3dRenderable)){
      o._displayProperty.show();
      o._displayProperty.loadObject(t, p);
   }else{
      throw new TError('Unknown select object type. (value={1})', p);
   }
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsTemplateWorkspace_construct(){
   var o = this;
   // 父处理
   o.__base.FUiWorkspace.construct.call(o);
}

//==========================================================
// <T>加载模板处理。</T>
//
// @method
//==========================================================
function FDsTemplateWorkspace_loadTemplate(p){
   var o = this;
   o._canvas.loadTemplate(p);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsTemplateWorkspace_dispose(){
   var o = this;
   // 父处理
   o.__base.FUiWorkspace.dispose.call(o);
}
