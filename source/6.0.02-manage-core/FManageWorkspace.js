//==========================================================
// <T>模板工作区域。</T>
//
// @author maocy
// @history 150121
//==========================================================
MO.FManageWorkspace = function FManageWorkspace(o){
   o = MO.Class.inherits(this, o, MO.FDuiWorkspace, MO.MUiStorage);
   //..........................................................
   // @property
   o._frameName          = 'manage.logic.Workspace';
   o._storageCode        = o._frameName;
   //..........................................................
   // @style
   o._styleTitlePanel    = MO.Class.register(o, new MO.AStyle('_styleTitlePanel', 'Title_Panel'));
   o._styleTitleLogo     = MO.Class.register(o, new MO.AStyle('_styleTitleLogo', 'Title_Logo'));
   o._styleTitleLabel    = MO.Class.register(o, new MO.AStyle('_styleTitleLabel', 'Title_Label'));
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
   // @method
   o.onBuilded           = MO.FManageWorkspace_onBuilded;
   // @method
   o.onSliderButtonClick = MO.FManageWorkspace_onSliderButtonClick;
   //..........................................................
   // @method
   o.construct           = MO.FManageWorkspace_construct;
   // @method
   o.selectFrameSet      = MO.FManageWorkspace_selectFrameSet;
   o.load                = MO.FManageWorkspace_load;
   // @method
   o.dispose             = MO.FManageWorkspace_dispose;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param event:TEventProcess 事件处理
//==========================================================
MO.FManageWorkspace_onBuilded = function FManageWorkspace_onBuilded(event){
   var o = this;
   o.__base.FDuiWorkspace.onBuilded.call(o, event);
   //..........................................................
   // 设置样式
   o._frameMenuBar._hPanel.className = o.styleName('MenuBar_Ground');
   o._frameModule._hPanel.className = o.styleName('Module_Ground');
   o._frameSpace._hPanel.className = o.styleName('Space_Ground');
   //..........................................................
   // 监听菜单点击事件
   o._controlCommonButton.addClickListener(o, o.onSliderButtonClick);
   o._controlPersonButton.addClickListener(o, o.onSliderButtonClick);
   o._controlLoggerButton.addClickListener(o, o.onSliderButtonClick);
   //..........................................................
   // 建立标题
   var hTitleForm = MO.Window.Builder.appendTable(o._frameMenuBar._hPanel, o.styleName('Title_Panel'));
   var hTitleLine = MO.Window.Builder.appendTableRow(hTitleForm);
   var hTitleCell = MO.Window.Builder.appendTableCell(hTitleLine, o.styleName('Title_Logo'));
   hTitleCell.align = 'center';
   hTitleCell.vAlign = 'middle';
   MO.Window.Builder.appendIcon(hTitleCell, null, 'editor.design.logo|png');
   // 设置标题
   var hTitleCell = MO.Window.Builder.appendTableCell(hTitleLine, o.styleName('Title_Label'));
   MO.Window.Html.textSet(hTitleCell, '业务管理平台');
   return;
   //..........................................................
   var hTable = MO.Window.Builder.createTable(event);
   hTable.width = '100%';
   var hRow = MO.Window.Builder.appendTableRow(hTable);
   // 设置工具栏
   o._hMenuPanel = MO.Window.Builder.appendTableCell(hRow);
   // 设置分页栏
   var control = o._tabBar = MO.Class.create(MO.FManageTabBar);
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
// <T>构建完成处理。</T>
//
// @method
// @param event:TEventProcess 事件处理
//==========================================================
MO.FManageWorkspace_onSliderButtonClick = function FManageWorkspace_onSliderButtonClick(event){
   var o = this;
   var button = event.sender;
   var name = button.name();
   switch(name){
      case 'commonButton':
         o.selectFrameSet(MO.EManageFrameSet.CommonFrameSet);
         break;
      case 'personButton':
         o.selectFrameSet(MO.EManageFrameSet.PersonFrameSet);
         break;
      case 'loggerButton':
         o.selectFrameSet(MO.EManageFrameSet.LoggerFrameSet);
         break;
      default:
         throw new TError(o, 'Invalid click.');
   }
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FManageWorkspace_construct = function FManageWorkspace_construct(){
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
MO.FManageWorkspace_selectFrameSet = function FManageWorkspace_selectFrameSet(name, guid){
   var o = this;
   // 获得框架
   var frameSet = o._frameSets.get(name);
   if(!frameSet){
      if(name == MO.EManageFrameSet.CommonFrameSet){
         frameSet = MO.Console.find(MO.FDuiFrameConsole).findByClass(o, MO.FManageLgCommonFrameSet);
      }else if(name == MO.EManageFrameSet.PersonFrameSet){
         frameSet = MO.Console.find(MO.FDuiFrameConsole).findByClass(o, MO.FManageLgPersonFrameSet);
      }else if(name == MO.EManageFrameSet.LoggerFrameSet){
         frameSet = MO.Console.find(MO.FDuiFrameConsole).findByClass(o, MO.FManageLgLoggerFrameSet);
      }else{
         throw new MO.TError('Unknown frameset. (name={1})', name);
      }
      frameSet._workspace = o;
      o._frameSets.set(name, frameSet);
   }
   //..........................................................
   // 显示选中框架
   var activeFrameSet = o._activeFrameSet;
   if(activeFrameSet != frameSet){
      if(activeFrameSet){
         o._frameSpace.remove(activeFrameSet);
      }
      o._frameSpace.push(frameSet);
      frameSet.psResize();
   }
   o._activeFrameSet = frameSet;
   //..........................................................
   // 初始化操作
   switch(name){
      case MO.EManageFrameSet.CommonFrameSet:
         frameSet.load();
         break;
      case MO.EManageFrameSet.PersonFrameSet:
         frameSet.load();
         break;
      case MO.EManageFrameSet.LoggerFrameSet:
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
MO.FManageWorkspace_load = function FManageWorkspace_load(){
   var o = this;
   // 选择开始页面
   var code = o._activeFrameSetCode = o.storageGet('frameset_code', MO.EManageFrameSet.SolutionFrameSet);
   var guid = o._activeFrameSetGuid = o.storageGet('frameset_guid');
   // 点击切换按键
   var button = null;
   if(code == MO.EManageFrameSet.CommonFrameSet){
      o.selectFrameSet(MO.EManageFrameSet.CommonFrameSet);
   }else if(code == MO.EManageFrameSet.PersonFrameSet){
      o.selectFrameSet(MO.EManageFrameSet.PersonFrameSet);
   }else if(code == MO.EManageFrameSet.LoggerFrameSet){
      o.selectFrameSet(MO.EManageFrameSet.LoggerFrameSet);
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FManageWorkspace_dispose = function FManageWorkspace_dispose(){
   var o = this;
   // 设置属性
   o._frameSets = MO.Lang.Object.dispose(o._frameSets, true);
   // 父处理
   o.__base.FDuiWorkspace.dispose.call(o);
}
