//==========================================================
// <T>模板工作区域。</T>
//
// @author maocy
// @history 150121
//==========================================================
function FDsSolutionWorkspace(o){
   o = RClass.inherits(this, o, FUiWorkspace);
   //..........................................................
   // @property
   o._frameName            = 'design3d.solution.Workspace';
   //..........................................................
   // @style
   o._styleWorkspaceGround = RClass.register(o, new AStyle('_styleWorkspaceGround', 'Workspace_Ground'));
   o._styleToolbarGround   = RClass.register(o, new AStyle('_styleToolbarGround', 'Toolbar_Ground'));
   o._styleBodyGround      = RClass.register(o, new AStyle('_styleBodyGround', 'Body_Ground'));
   o._styleStatusbarGround = RClass.register(o, new AStyle('_styleStatusbarGround', 'Statusbar_Ground'));
   //..........................................................
   // @attribute
   o._resourceTypeCd       = 'private';
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
   o.onBuilded             = FDsSolutionWorkspace_onBuilded;
   //..........................................................
   // @method
   o.construct             = FDsSolutionWorkspace_construct;
   // @method
   o.selectFrameSet        = FDsSolutionWorkspace_selectFrameSet;
   o.load                  = FDsSolutionWorkspace_load;
   // @method
   o.dispose               = FDsSolutionWorkspace_dispose;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
function FDsSolutionWorkspace_onBuilded(p){
   var o = this;
   o.__base.FUiWorkspace.onBuilded.call(o, p);
   //..........................................................
   // 设置工具区
   var frame = o._frameToolBar = o.searchControl('toolbarFrame');
   frame._hPanel.className = o.styleName('Toolbar_Ground');
   // 设置目录区
   var frame = o._frameBody = o.searchControl('bodyFrame');
   frame._hPanel.className = o.styleName('Body_Ground');
   // 设置状态区
   var frame = o._frameStatusBar = o.searchControl('statusFrame');
   frame._hPanel.className = o.styleName('Statusbar_Ground');
   //..........................................................
   var hTable = RBuilder.createTable(p);
   hTable.width = '100%';
   var hRow = RBuilder.appendTableRow(hTable);
   // 设置工具栏
   o._hMenuPanel = RBuilder.appendTableCell(hRow);
   // 设置分页栏
   var c = o._tabBar = RClass.create(FDsSolutionTabBar);
   c._workspace = o;
   c.buildDefine(p);
   var hCell = RBuilder.appendTableCell(hRow);
   hCell.width = '150px';
   hCell.align = 'right';
   hCell.vAlign = 'bottom';
   hCell.appendChild(c._hPanel);
   //o._frameToolBar.push(c);
   o._frameToolBar._hPanel.appendChild(hTable);
   //..........................................................
   // 设置画板
   //var control = o._previewProperty = RClass.create(FDsSolutionProjectProperty);
   //control._workspace = o;
   //control._toolbar = o._previewToolbar;
   //control.buildDefine(p);
   //o._framePreviewProperty.push(control);
   //..........................................................
   //o.switchContent(o._resourceTypeCd);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsSolutionWorkspace_construct(){
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
function FDsSolutionWorkspace_selectFrameSet(name, guid){
   var o = this;
   // 获得框架
   var frameSet = o._frameSets.get(name);
   if(!frameSet){
      if(name == EDsFrameSet.SolutionFrameSet){
         // 创建菜单
         var menuBar = RClass.create(FDsSolutionMenuBar);
         menuBar._workspace = o;
         menuBar.buildDefine(o._hPanel);
         // 创建框架
         frameSet = RConsole.find(FFrameConsole).findByClass(o, FDsSolutionFrameSet);
         frameSet._workspace = o;
         frameSet._menuBar = menuBar;
         menuBar._frameSet = frameSet;
      }else if(name == EDsFrameSet.ProjectFrameSet){
         // 创建菜单
         var menuBar = RClass.create(FDsProjectMenuBar);
         menuBar._workspace = o;
         menuBar.buildDefine(o._hPanel);
         // 创建框架
         frameSet = RConsole.find(FFrameConsole).findByClass(o, FDsProjectFrameSet);
         frameSet._workspace = o;
         frameSet._menuBar = menuBar;
         menuBar._frameSet = frameSet;
      }else if(name == EDsFrameSet.ResourceFrameSet){
         // 创建菜单
         var menuBar = RClass.create(FDsResourceMenuBar);
         menuBar._workspace = o;
         menuBar.buildDefine(o._hPanel);
         // 创建框架
         frameSet = RConsole.find(FFrameConsole).findByClass(o, FDsResourceFrameSet);
         frameSet._workspace = o;
         frameSet._menuBar = menuBar;
         menuBar._frameSet = frameSet;
      }else if(name == EDsFrameSet.MeshFrameSet){
         // 创建菜单
         var menuBar = RClass.create(FDsMeshMenuBar);
         menuBar._workspace = o;
         menuBar.buildDefine(o._hPanel);
         // 创建框架
         frameSet = RConsole.find(FFrameConsole).findByClass(o, FDsMeshFrameSet);
         frameSet._workspace = o;
         frameSet._menuBar = menuBar;
         menuBar._frameSet = frameSet;
      }else{
         throw new TError('Unknown frameset. (name={1})', name);
      }
      o._frameSets.set(name, frameSet);
   }
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
   switch(name){
      case EDsFrameSet.SolutionFrameSet:
         frameSet.load();
         break;
      case EDsFrameSet.ProjectFrameSet:
         break;
      case EDsFrameSet.ResourceFrameSet:
         frameSet.load();
         break;
      case EDsFrameSet.MeshFrameSet:
         frameSet.loadByGuid(guid);
         break;
      default:
         throw new TError('Unknown frameset. (name={1})', name);
   }
   return frameSet;
}

//==========================================================
// <T>加载处理。</T>
//
// @method
//==========================================================
function FDsSolutionWorkspace_load(){
   var o = this;
   o.selectFrameSet(EDsFrameSet.SolutionFrameSet);
   //o.selectFrameSet(name, guid);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsSolutionWorkspace_dispose(){
   var o = this;
   // 设置属性
   o._propertyFrames.dispose();
   o._propertyFrames = null;
   // 父处理
   o.__base.FUiWorkspace.dispose.call(o);
}
