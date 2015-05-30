//==========================================================
// <T>共享工作区。</T>
//
// @author maocy
// @history 150422
//==========================================================
function FDsShareWorkspace(o){
   o = RClass.inherits(this, o, FUiWorkspace, MUiStorage);
   //..........................................................
   // @property
   o._frameName            = 'resource.share.Workspace';
   o._storageCode          = o._frameName;
   //..........................................................
   // @style
   o._styleMenubarGround   = RClass.register(o, new AStyle('_styleMenubarGround', 'Menubar_Ground'));
   o._styleBodyGround      = RClass.register(o, new AStyle('_styleBodyGround', 'Body_Ground'));
   o._styleStatusbarGround = RClass.register(o, new AStyle('_styleStatusbarGround', 'Statusbar_Ground'));
   //..........................................................
   // @attribute
   o._activeFrameSetCode   = null;
   o._activeProjectGuid    = null;
   // @attribute
   o._frameToolBar         = null;
   o._frameStatusBar       = null;
   // @attribute
   o._activeFrameSet       = null;
   o._frameSets            = null;
   //..........................................................
   // @process
   o.onBuilded             = FDsShareWorkspace_onBuilded;
   //..........................................................
   // @method
   o.construct             = FDsShareWorkspace_construct;
   // @method
   o.selectFrameSet        = FDsShareWorkspace_selectFrameSet;
   o.load                  = FDsShareWorkspace_load;
   // @method
   o.dispose               = FDsShareWorkspace_dispose;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param event:TEventProcess 事件处理
//==========================================================
function FDsShareWorkspace_onBuilded(event){
   var o = this;
   o.__base.FUiWorkspace.onBuilded.call(o, event);
   //..........................................................
   // 设置样式
   o._frameMenuBar._hPanel.className = o.styleName('Menubar_Ground');
   o._frameBody._hPanel.className = o.styleName('Body_Ground');
   o._frameStatusBar._hPanel.className = o.styleName('Statusbar_Ground');
   //..........................................................
   var hTable = RBuilder.createTable(event);
   hTable.width = '100%';
   var hRow = RBuilder.appendTableRow(hTable);
   // 设置工具栏
   o._hMenuPanel = RBuilder.appendTableCell(hRow);
   // 设置分页栏
   var control = o._tabBar = RClass.create(FDsShareTabBar);
   control._workspace = o;
   control.buildDefine(event);
   var hCell = RBuilder.appendTableCell(hRow);
   hCell.width = '100px';
   hCell.align = 'right';
   hCell.vAlign = 'bottom';
   hCell.appendChild(control._hPanel);
   o._frameMenuBar._hPanel.appendChild(hTable);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsShareWorkspace_construct(){
   var o = this;
   // 父处理
   o.__base.FUiWorkspace.construct.call(o);
   // 设置属性
   o._frameSets = new TDictionary();
}

//==========================================================
// <T>根据名称获得属性页面。</T>
//
// @method
// @return FUiFrame 页面
//==========================================================
function FDsShareWorkspace_selectFrameSet(name, guid){
   var o = this;
   // 获得框架
   var frameSet = o._frameSets.get(name);
   if(!frameSet){
      if(name == EDsFrameSet.ShareResourceFrameSet){
         // 创建菜单
         var menuBar = RClass.create(FDsShareResourceMenuBar);
         menuBar._workspace = o;
         menuBar.buildDefine(o._hPanel);
         // 创建框架
         frameSet = RConsole.find(FUiFrameConsole).findByClass(o, FDsShareResourceFrameSet);
         frameSet._workspace = o;
         frameSet._menuBar = menuBar;
         menuBar._frameSet = frameSet;
      }else if(name == EDsFrameSet.ShareBitmapFrameSet){
         // 创建菜单
         var menuBar = RClass.create(FDsShareBitmapMenuBar);
         menuBar._workspace = o;
         menuBar.buildDefine(o._hPanel);
         // 创建框架
         frameSet = RConsole.find(FUiFrameConsole).findByClass(o, FDsShareBitmapFrameSet);
         frameSet._workspace = o;
         frameSet._menuBar = menuBar;
         menuBar._frameSet = frameSet;
      }else if(name == EDsFrameSet.ShareMaterialFrameSet){
         // 创建菜单
         var menuBar = RClass.create(FDsShareMaterialMenuBar);
         menuBar._workspace = o;
         menuBar.buildDefine(o._hPanel);
         // 创建框架
         frameSet = RConsole.find(FUiFrameConsole).findByClass(o, FDsShareMaterialFrameSet);
         frameSet._workspace = o;
         frameSet._menuBar = menuBar;
         menuBar._frameSet = frameSet;
      }else if(name == EDsFrameSet.ShareModelFrameSet){
         // 创建菜单
         var menuBar = RClass.create(FDsShareModelMenuBar);
         menuBar._workspace = o;
         menuBar.buildDefine(o._hPanel);
         // 创建框架
         frameSet = RConsole.find(FUiFrameConsole).findByClass(o, FDsShareModelFrameSet);
         frameSet._workspace = o;
         frameSet._menuBar = menuBar;
         menuBar._frameSet = frameSet;
      }else if(name == EDsFrameSet.ShareTemplateFrameSet){
         // 创建菜单
         var menuBar = RClass.create(FDsShareTemplateMenuBar);
         menuBar._workspace = o;
         menuBar.buildDefine(o._hPanel);
         // 创建框架
         frameSet = RConsole.find(FUiFrameConsole).findByClass(o, FDsShareTemplateFrameSet);
         frameSet._workspace = o;
         frameSet._menuBar = menuBar;
         menuBar._frameSet = frameSet;
      }else if(name == EDsFrameSet.ShareSceneFrameSet){
         // 创建菜单
         var menuBar = RClass.create(FDsShareSceneMenuBar);
         menuBar._workspace = o;
         menuBar.buildDefine(o._hPanel);
         // 创建框架
         frameSet = RConsole.find(FUiFrameConsole).findByClass(o, FDsShareSceneFrameSet);
         frameSet._workspace = o;
         frameSet._menuBar = menuBar;
         menuBar._frameSet = frameSet;
      }else{
         throw new TError('Unknown frameset. (name={1})', name);
      }
      o._frameSets.set(name, frameSet);
   }
   //..........................................................
   // 显示选中框架
   var activeFrameSet = o._activeFrameSet;
   if(activeFrameSet != frameSet){
      if(activeFrameSet){
         o._hMenuPanel.removeChild(activeFrameSet._menuBar._hPanel);
         o._frameBody.remove(activeFrameSet);
      }
      o._hMenuPanel.appendChild(frameSet._menuBar._hPanel);
      o._frameBody.push(frameSet);
      frameSet.psResize();
   }
   o._activeFrameSet = frameSet;
   //..........................................................
   // 初始化操作
   switch(name){
      case EDsFrameSet.ShareResourceFrameSet:
         frameSet.load();
         break;
      case EDsFrameSet.ShareBitmapFrameSet:
      case EDsFrameSet.ShareMaterialFrameSet:
      case EDsFrameSet.ShareModelFrameSet:
      case EDsFrameSet.ShareTemplateFrameSet:
      case EDsFrameSet.ShareSceneFrameSet:
         frameSet.loadByGuid(guid);
         break;
      default:
         throw new TError('Unknown frameset. (name={1})', name);
   }
   //..........................................................
   // 存储选择内容
   o.storageSet('frameset_code', name)
   o.storageSet('frameset_guid', guid)
   o.storageUpdate();
   return frameSet;
}

//==========================================================
// <T>加载处理。</T>
//
// @method
//==========================================================
function FDsShareWorkspace_load(){
   var o = this;
   // 选择开始页面
   var code = o._activeFrameSetCode = o.storageGet('frameset_code', EDsFrameSet.ShareResourceFrameSet);
   var guid = o._activeFrameSetGuid = o.storageGet('frameset_guid');
   // 点击切换按键
   var button = o._tabBar.findControl('resource');
   button.doClick();
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsShareWorkspace_dispose(){
   var o = this;
   // 设置属性
   o._frameSets = RObject.dispose(o._frameSets);
   // 父处理
   o.__base.FUiWorkspace.dispose.call(o);
}
