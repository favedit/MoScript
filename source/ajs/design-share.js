with(MO){
   MO.FDsShareTabBar = function FDsShareTabBar(o){
      o = MO.Class.inherits(this, o, FDuiTabBar);
      o._frameName            = 'resource.share.TabBar';
      o._resourceTypeCd       = 'private';
      o._controlPrivateButton = null;
      o._controlTeamButton    = null;
      o._controlShareButton   = null;
      o.onBuilded             = FDsShareTabBar_onBuilded;
      o.onButtonClick         = FDsShareTabBar_onButtonClick;
      o.construct             = FDsShareTabBar_construct;
      o.dispose               = FDsShareTabBar_dispose;
      return o;
   }
   MO.FDsShareTabBar_onBuilded = function FDsShareTabBar_onBuilded(p){
      var o = this;
      o.__base.FDuiTabBar.onBuilded.call(o, p);
      o._controlResource.addClickListener(o, o.onButtonClick);
   }
   MO.FDsShareTabBar_onButtonClick = function FDsShareTabBar_onButtonClick(event){
      var o = this;
      var sender = event.sender;
      var name = sender.name();
      if(name == 'resource'){
         o._workspace.selectFrameSet(EDsFrameSet.ShareResourceFrameSet);
      }else{
         alert('功能未开启，请以后关注。');
      }
   }
   MO.FDsShareTabBar_construct = function FDsShareTabBar_construct(){
      var o = this;
      o.__base.FDuiTabBar.construct.call(o);
   }
   MO.FDsShareTabBar_dispose = function FDsShareTabBar_dispose(){
      var o = this;
      o.__base.FDuiTabBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsShareWorkspace = function FDsShareWorkspace(o){
      o = MO.Class.inherits(this, o, FDuiWorkspace, MUiStorage);
      o._frameName            = 'resource.share.Workspace';
      o._storageCode          = o._frameName;
      o._styleMenubarGround   = MO.Class.register(o, new AStyle('_styleMenubarGround', 'Menubar_Ground'));
      o._styleBodyGround      = MO.Class.register(o, new AStyle('_styleBodyGround', 'Body_Ground'));
      o._styleStatusbarGround = MO.Class.register(o, new AStyle('_styleStatusbarGround', 'Statusbar_Ground'));
      o._activeFrameSetCode   = null;
      o._activeProjectGuid    = null;
      o._frameToolBar         = null;
      o._frameStatusBar       = null;
      o._activeFrameSet       = null;
      o._frameSets            = null;
      o.onBuilded             = FDsShareWorkspace_onBuilded;
      o.construct             = FDsShareWorkspace_construct;
      o.selectFrameSet        = FDsShareWorkspace_selectFrameSet;
      o.load                  = FDsShareWorkspace_load;
      o.dispose               = FDsShareWorkspace_dispose;
      return o;
   }
   MO.FDsShareWorkspace_onBuilded = function FDsShareWorkspace_onBuilded(event){
      var o = this;
      o.__base.FDuiWorkspace.onBuilded.call(o, event);
      o._frameMenuBar._hPanel.className = o.styleName('Menubar_Ground');
      o._frameBody._hPanel.className = o.styleName('Body_Ground');
      o._frameStatusBar._hPanel.className = o.styleName('Statusbar_Ground');
      var hTable = RBuilder.createTable(event);
      hTable.width = '100%';
      var hRow = RBuilder.appendTableRow(hTable);
      o._hMenuPanel = RBuilder.appendTableCell(hRow);
      var control = o._tabBar = MO.Class.create(FDsShareTabBar);
      control._workspace = o;
      control.buildDefine(event);
      var hCell = RBuilder.appendTableCell(hRow);
      hCell.width = '100px';
      hCell.align = 'right';
      hCell.vAlign = 'bottom';
      hCell.appendChild(control._hPanel);
      o._frameMenuBar._hPanel.appendChild(hTable);
   }
   MO.FDsShareWorkspace_construct = function FDsShareWorkspace_construct(){
      var o = this;
      o.__base.FDuiWorkspace.construct.call(o);
      o._frameSets = new TDictionary();
   }
   MO.FDsShareWorkspace_selectFrameSet = function FDsShareWorkspace_selectFrameSet(name, guid){
      var o = this;
      var frameSet = o._frameSets.get(name);
      if(!frameSet){
         if(name == EDsFrameSet.ShareResourceFrameSet){
            var menuBar = MO.Class.create(FDsShareResourceMenuBar);
            menuBar._workspace = o;
            menuBar.buildDefine(o._hPanel);
            frameSet = MO.Console.find(FDuiFrameConsole).findByClass(o, FDsShareResourceFrameSet);
            frameSet._workspace = o;
            frameSet._menuBar = menuBar;
            menuBar._frameSet = frameSet;
         }else if(name == EDsFrameSet.ShareBitmapFrameSet){
            var menuBar = MO.Class.create(FDsShareBitmapMenuBar);
            menuBar._workspace = o;
            menuBar.buildDefine(o._hPanel);
            frameSet = MO.Console.find(FDuiFrameConsole).findByClass(o, FDsShareBitmapFrameSet);
            frameSet._workspace = o;
            frameSet._menuBar = menuBar;
            menuBar._frameSet = frameSet;
         }else if(name == EDsFrameSet.ShareMaterialFrameSet){
            var menuBar = MO.Class.create(FDsShareMaterialMenuBar);
            menuBar._workspace = o;
            menuBar.buildDefine(o._hPanel);
            frameSet = MO.Console.find(FDuiFrameConsole).findByClass(o, FDsShareMaterialFrameSet);
            frameSet._workspace = o;
            frameSet._menuBar = menuBar;
            menuBar._frameSet = frameSet;
         }else if(name == EDsFrameSet.ShareModelFrameSet){
            var menuBar = MO.Class.create(FDsShareModelMenuBar);
            menuBar._workspace = o;
            menuBar.buildDefine(o._hPanel);
            frameSet = MO.Console.find(FDuiFrameConsole).findByClass(o, FDsShareModelFrameSet);
            frameSet._workspace = o;
            frameSet._menuBar = menuBar;
            menuBar._frameSet = frameSet;
         }else if(name == EDsFrameSet.ShareTemplateFrameSet){
            var menuBar = MO.Class.create(FDsShareTemplateMenuBar);
            menuBar._workspace = o;
            menuBar.buildDefine(o._hPanel);
            frameSet = MO.Console.find(FDuiFrameConsole).findByClass(o, FDsShareTemplateFrameSet);
            frameSet._workspace = o;
            frameSet._menuBar = menuBar;
            menuBar._frameSet = frameSet;
         }else if(name == EDsFrameSet.ShareSceneFrameSet){
            var menuBar = MO.Class.create(FDsShareSceneMenuBar);
            menuBar._workspace = o;
            menuBar.buildDefine(o._hPanel);
            frameSet = MO.Console.find(FDuiFrameConsole).findByClass(o, FDsShareSceneFrameSet);
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
      o.storageSet('frameset_code', name)
      o.storageSet('frameset_guid', guid)
      o.storageUpdate();
      return frameSet;
   }
   MO.FDsShareWorkspace_load = function FDsShareWorkspace_load(){
      var o = this;
      var code = o._activeFrameSetCode = o.storageGet('frameset_code', EDsFrameSet.ShareResourceFrameSet);
      var guid = o._activeFrameSetGuid = o.storageGet('frameset_guid');
      var button = o._tabBar.findControl('resource');
      button.doClick();
   }
   MO.FDsShareWorkspace_dispose = function FDsShareWorkspace_dispose(){
      var o = this;
      o._frameSets = RObject.dispose(o._frameSets);
      o.__base.FDuiWorkspace.dispose.call(o);
   }
}
