function FDsPrivateTabBar(o){
   o = RClass.inherits(this, o, FUiTabBar);
   o._frameName            = 'resource.share.TabBar';
   o._resourceTypeCd       = 'private';
   o._controlPrivateButton = null;
   o._controlTeamButton    = null;
   o._controlShareButton   = null;
   o.onBuilded             = FDsPrivateTabBar_onBuilded;
   o.onButtonClick         = FDsPrivateTabBar_onButtonClick;
   o.construct             = FDsPrivateTabBar_construct;
   o.dispose               = FDsPrivateTabBar_dispose;
   return o;
}
function FDsPrivateTabBar_onBuilded(p){
   var o = this;
   o.__base.FUiTabBar.onBuilded.call(o, p);
   o._controlResource.addClickListener(o, o.onButtonClick);
}
function FDsPrivateTabBar_onButtonClick(event){
   var o = this;
   var sender = event.sender;
   var name = sender.name();
   if(name == 'resource'){
      o._workspace.selectFrameSet(EDsFrameSet.ShareResourceFrameSet);
   }else{
      alert('功能未开启，请以后关注。');
   }
}
function FDsPrivateTabBar_construct(){
   var o = this;
   o.__base.FUiTabBar.construct.call(o);
}
function FDsPrivateTabBar_dispose(){
   var o = this;
   o.__base.FUiTabBar.dispose.call(o);
}
function FDsPrivateWorkspace(o){
   o = RClass.inherits(this, o, FUiWorkspace, MUiStorage);
   o._frameName            = 'resource.share.Workspace';
   o._storageCode          = o._frameName;
   o._styleMenubarGround   = RClass.register(o, new AStyle('_styleMenubarGround', 'Menubar_Ground'));
   o._styleWorkspaceGround = RClass.register(o, new AStyle('_styleWorkspaceGround', 'Workspace_Ground'));
   o._styleBodyGround      = RClass.register(o, new AStyle('_styleBodyGround', 'Body_Ground'));
   o._styleStatusbarGround = RClass.register(o, new AStyle('_styleStatusbarGround', 'Statusbar_Ground'));
   o._activeFrameSetCode   = null;
   o._activeProjectGuid    = null;
   o._frameToolBar         = null;
   o._frameStatusBar       = null;
   o._activeFrameSet       = null;
   o._frameSets            = null;
   o._propertyFrames       = null;
   o.onBuilded             = FDsPrivateWorkspace_onBuilded;
   o.construct             = FDsPrivateWorkspace_construct;
   o.selectFrameSet        = FDsPrivateWorkspace_selectFrameSet;
   o.load                  = FDsPrivateWorkspace_load;
   o.dispose               = FDsPrivateWorkspace_dispose;
   return o;
}
function FDsPrivateWorkspace_onBuilded(p){
   var o = this;
   o.__base.FUiWorkspace.onBuilded.call(o, p);
   o._frameMenuBar._hPanel.className = o.styleName('Menubar_Ground');
   o._frameBody._hPanel.className = o.styleName('Body_Ground');
   o._frameStatusBar._hPanel.className = o.styleName('Statusbar_Ground');
   var hTable = RBuilder.createTable(p);
   hTable.width = '100%';
   var hRow = RBuilder.appendTableRow(hTable);
   o._hMenuPanel = RBuilder.appendTableCell(hRow);
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
function FDsPrivateWorkspace_construct(){
   var o = this;
   o.__base.FUiWorkspace.construct.call(o);
   o._frameSets = new TDictionary();
   o._propertyFrames = new TDictionary();
}
function FDsPrivateWorkspace_selectFrameSet(name, guid){
   var o = this;
   var frameSet = o._frameSets.get(name);
   if(!frameSet){
      if(name == EDsFrameSet.ShareResourceFrameSet){
         var menuBar = RClass.create(FDsPrivateResourceMenuBar);
         menuBar._workspace = o;
         menuBar.buildDefine(o._hPanel);
         frameSet = RConsole.find(FUiFrameConsole).findByClass(o, FDsPrivateResourceFrameSet);
         frameSet._workspace = o;
         frameSet._menuBar = menuBar;
         menuBar._frameSet = frameSet;
      }else if(name == EDsFrameSet.ShareSceneFrameSet){
         var menuBar = RClass.create(FDsPrivateSceneMenuBar);
         menuBar._workspace = o;
         menuBar.buildDefine(o._hPanel);
         frameSet = RConsole.find(FUiFrameConsole).findByClass(o, FDsPrivateSceneFrameSet);
         frameSet._workspace = o;
         frameSet._menuBar = menuBar;
         menuBar._frameSet = frameSet;
      }else{
         throw new TError('Unknown frameset. (name={1})', name);
      }
      o._frameSets.set(name, frameSet);
   }
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
      case EDsFrameSet.ShareResourceFrameSet:
         frameSet.load();
         break;
      case EDsFrameSet.ShareSceneFrameSet:
         frameSet.loadByGuid(guid);
         break;
      default:
         throw new TError('Unknown frameset. (name={1})', name);
   }
   o.storageSet('frameset_code', name)
   o.storageSet('frameset_guid', guid)
   o.storageUpdate();
   return frameSet;
}
function FDsPrivateWorkspace_load(){
   var o = this;
   var code = o._activeFrameSetCode = o.storageGet('frameset_code', EDsFrameSet.ShareResourceFrameSet);
   var guid = o._activeFrameSetGuid = o.storageGet('frameset_guid');
   var button = o._tabBar.findControl('resource');
   button.doClick();
}
function FDsPrivateWorkspace_dispose(){
   var o = this;
   o._propertyFrames.dispose();
   o._propertyFrames = null;
   o.__base.FUiWorkspace.dispose.call(o);
}
