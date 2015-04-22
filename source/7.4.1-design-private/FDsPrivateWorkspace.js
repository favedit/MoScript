//==========================================================
// <T>共享工作区。</T>
//
// @author maocy
// @history 150422
//==========================================================
function FDsPrivateWorkspace(o){
   o = RClass.inherits(this, o, FUiWorkspace, MUiStorage);
   //..........................................................
   // @property
   o._frameName            = 'resource.share.Workspace';
   o._storageCode          = o._frameName;
   //..........................................................
   // @style
   o._styleMenubarGround   = RClass.register(o, new AStyle('_styleMenubarGround', 'Menubar_Ground'));
   o._styleWorkspaceGround = RClass.register(o, new AStyle('_styleWorkspaceGround', 'Workspace_Ground'));
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
   o._propertyFrames       = null;
   //..........................................................
   // @process
   o.onBuilded             = FDsPrivateWorkspace_onBuilded;
   //..........................................................
   // @method
   o.construct             = FDsPrivateWorkspace_construct;
   // @method
   o.selectFrameSet        = FDsPrivateWorkspace_selectFrameSet;
   o.load                  = FDsPrivateWorkspace_load;
   // @method
   o.dispose               = FDsPrivateWorkspace_dispose;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
function FDsPrivateWorkspace_onBuilded(p){
   var o = this;
   o.__base.FUiWorkspace.onBuilded.call(o, p);
   //..........................................................
   // 设置样式
   o._frameMenuBar._hPanel.className = o.styleName('Menubar_Ground');
   o._frameBody._hPanel.className = o.styleName('Body_Ground');
   o._frameStatusBar._hPanel.className = o.styleName('Statusbar_Ground');
   //..........................................................
   var hTable = RBuilder.createTable(p);
   hTable.width = '100%';
   var hRow = RBuilder.appendTableRow(hTable);
   // 设置工具栏
   o._hMenuPanel = RBuilder.appendTableCell(hRow);
   // 设置分页栏
   var control = o._tabBar = RClass.create(FDsPrivateTabBar);
   control._workspace = o;
   control.buildDefine(p);
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
function FDsPrivateWorkspace_construct(){
   var o = this;
   // 父处理
   o.__base.FUiWorkspace.construct.call(o);
   // 设置属性
   o._frameSets = new TDictionary();
   o._propertyFrames = new TDictionary();
}

//==========================================================
// <T>根据名称获得属性页面。</T>
//
// @method
// @return FUiFrame 页面
//==========================================================
function FDsPrivateWorkspace_selectFrameSet(name, guid){
   var o = this;
   // 获得框架
   var frameSet = o._frameSets.get(name);
   if(!frameSet){
      if(name == EDsFrameSet.ShareResourceFrameSet){
         // 创建菜单
         var menuBar = RClass.create(FDsPrivateResourceMenuBar);
         menuBar._workspace = o;
         menuBar.buildDefine(o._hPanel);
         // 创建框架
         frameSet = RConsole.find(FUiFrameConsole).findByClass(o, FDsPrivateResourceFrameSet);
         frameSet._workspace = o;
         frameSet._menuBar = menuBar;
         menuBar._frameSet = frameSet;
      }else if(name == EDsFrameSet.ShareSceneFrameSet){
         // 创建菜单
         var menuBar = RClass.create(FDsPrivateSceneMenuBar);
         menuBar._workspace = o;
         menuBar.buildDefine(o._hPanel);
         // 创建框架
         frameSet = RConsole.find(FUiFrameConsole).findByClass(o, FDsPrivateSceneFrameSet);
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
function FDsPrivateWorkspace_load(){
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
function FDsPrivateWorkspace_dispose(){
   var o = this;
   // 设置属性
   o._propertyFrames.dispose();
   o._propertyFrames = null;
   // 父处理
   o.__base.FUiWorkspace.dispose.call(o);
}
