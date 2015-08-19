//==========================================================
// <T>模板工作区域。</T>
//
// @author maocy
// @history 150121
//==========================================================
MO.FEditorDsWorkspace = function FEditorDsWorkspace(o){
   o = MO.Class.inherits(this, o, MO.FDuiWorkspace, MO.MUiStorage);
   //..........................................................
   // @property
   o._frameName          = 'editor.design.Workspace';
   o._storageCode        = o._frameName;
   //..........................................................
   // @style
   o._styleMenuBarGround = MO.Class.register(o, new MO.AStyle('_styleMenuBarGround', 'MenuBar_Ground'));
   o._styleModuleGround  = MO.Class.register(o, new MO.AStyle('_styleModuleGround', 'Module_Ground'));
   o._styleSpaceGround   = MO.Class.register(o, new MO.AStyle('_styleSpaceGround', 'Space_Ground'));
   //..........................................................
   // @attribute
   o._activeFrameSetCode = null;
   o._activeProjectGuid  = null;
   // @attribute
   o._frameToolBar       = null;
   o._frameStatusBar     = null;
   // @attribute
   o._activeFrameSet     = null;
   o._frameSets          = null;
   //..........................................................
   // @process
   o.onBuilded           = MO.FEditorDsWorkspace_onBuilded;
   //..........................................................
   // @method
   o.construct           = MO.FEditorDsWorkspace_construct;
   // @method
   o.selectFrameSet      = MO.FEditorDsWorkspace_selectFrameSet;
   o.load                = MO.FEditorDsWorkspace_load;
   // @method
   o.dispose             = MO.FEditorDsWorkspace_dispose;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param event:TEventProcess 事件处理
//==========================================================
MO.FEditorDsWorkspace_onBuilded = function FEditorDsWorkspace_onBuilded(event){
   var o = this;
   o.__base.FDuiWorkspace.onBuilded.call(o, event);
   //..........................................................
   // 设置样式
   o._frameMenuBar._hPanel.className = o.styleName('MenuBar_Ground');
   o._frameModule._hPanel.className = o.styleName('Module_Ground');
   o._frameSpace._hPanel.className = o.styleName('Space_Ground');
   return;
   //..........................................................
   var hTable = MO.Window.Builder.createTable(event);
   hTable.width = '100%';
   var hRow = MO.Window.Builder.appendTableRow(hTable);
   // 设置工具栏
   o._hMenuPanel = MO.Window.Builder.appendTableCell(hRow);
   // 设置分页栏
   var control = o._tabBar = MO.Class.create(MO.FEditorDsTabBar);
   control._workspace = o;
   control.buildDefine(event);
   var hCell = MO.Window.Builder.appendTableCell(hRow);
   hCell.width = '240px';
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
MO.FEditorDsWorkspace_construct = function FEditorDsWorkspace_construct(){
   var o = this;
   // 父处理
   o.__base.FDuiWorkspace.construct.call(o);
   // 设置属性
   o._frameSets = new MO.TDictionary();
}

//==========================================================
// <T>根据名称获得属性页面。</T>
//
// @method
// @return FDuiFrame 页面
//==========================================================
MO.FEditorDsWorkspace_selectFrameSet = function FEditorDsWorkspace_selectFrameSet(name, guid){
   var o = this;
   return;
   // 获得框架
   var frameSet = o._frameSets.get(name);
   if(!frameSet){
      if(name == MO.EEditorFrameSet.PersistenceFrameSet){
         // 创建菜单
         var menuBar = MO.Class.create(MO.FEditorDsPersistenceMenuBar);
         menuBar._workspace = o;
         menuBar.buildDefine(o._hPanel);
         // 创建框架
         frameSet = MO.Console.find(MO.FDuiFrameConsole).findByClass(o, MO.FEditorDsPersistenceFrameSet);
         frameSet._workspace = o;
         frameSet._menuBar = menuBar;
         menuBar._frameSet = frameSet;
      }else if(name == MO.EEditorFrameSet.ListFrameSet){
         // 创建菜单
         var menuBar = MO.Class.create(MO.FEditorDsListMenuBar);
         menuBar._workspace = o;
         menuBar.buildDefine(o._hPanel);
         // 创建框架
         frameSet = MO.Console.find(MO.FDuiFrameConsole).findByClass(o, MO.FEditorDsListFrameSet);
         frameSet._workspace = o;
         frameSet._menuBar = menuBar;
         menuBar._frameSet = frameSet;
      }else if(name == MO.EEditorFrameSet.TreeFrameSet){
         // 创建菜单
         var menuBar = MO.Class.create(MO.FEditorDsTreeMenuBar);
         menuBar._workspace = o;
         menuBar.buildDefine(o._hPanel);
         // 创建框架
         frameSet = MO.Console.find(MO.FDuiFrameConsole).findByClass(o, MO.FEditorDsTreeFrameSet);
         frameSet._workspace = o;
         frameSet._menuBar = menuBar;
         menuBar._frameSet = frameSet;
      }else if(name == MO.EEditorFrameSet.FrameFrameSet){
         // 创建菜单
         var menuBar = MO.Class.create(MO.FEditorDsFrameMenuBar);
         menuBar._workspace = o;
         menuBar.buildDefine(o._hPanel);
         // 创建框架
         frameSet = MO.Console.find(MO.FDuiFrameConsole).findByClass(o, MO.FEditorDsFrameFrameSet);
         frameSet._workspace = o;
         frameSet._menuBar = menuBar;
         menuBar._frameSet = frameSet;
      }else{
         throw new MO.TError('Unknown frameset. (name={1})', name);
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
      case MO.EEditorFrameSet.PersistenceFrameSet:
         frameSet.load();
         break;
      case MO.EEditorFrameSet.ListFrameSet:
         frameSet.load();
         break;
      case MO.EEditorFrameSet.TreeFrameSet:
         frameSet.load();
         break;
      case MO.EEditorFrameSet.FrameFrameSet:
         frameSet.load();
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
MO.FEditorDsWorkspace_load = function FEditorDsWorkspace_load(){
   var o = this;
   return;
   // 选择开始页面
   var code = o._activeFrameSetCode = o.storageGet('frameset_code', MO.EEditorFrameSet.SolutionFrameSet);
   var guid = o._activeFrameSetGuid = o.storageGet('frameset_guid');
   // 点击切换按键
   var button = null;
   if(code == MO.EEditorFrameSet.PersistenceFrameSet){
      button = o._tabBar.findControl('persistence');
      button.doClick();
   }else if(code == MO.EEditorFrameSet.ListFrameSet){
      button = o._tabBar.findControl('list');
      o._tabBar.select(button);
      o.selectFrameSet(code, guid)
   }else if(code == MO.EEditorFrameSet.TreeFrameSet){
      button = o._tabBar.findControl('tree');
      button.doClick();
   }else if(code == MO.EEditorFrameSet.FrameFrameSet){
      button = o._tabBar.findControl('frame');
      o._tabBar.select(button);
      o.selectFrameSet(code, guid)
   }else{
      button = o._tabBar.findControl('frame');
      button.doClick();
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEditorDsWorkspace_dispose = function FEditorDsWorkspace_dispose(){
   var o = this;
   // 设置属性
   o._frameSets = MO.Lang.Object.dispose(o._frameSets, true);
   // 父处理
   o.__base.FDuiWorkspace.dispose.call(o);
}
