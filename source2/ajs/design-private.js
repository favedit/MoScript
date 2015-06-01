with(MO){
   MO.FDsPrivateTabBar = function FDsPrivateTabBar(o){
      o = RClass.inherits(this, o, FUiTabBar);
      o._frameName            = 'resource.private.TabBar';
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
   MO.FDsPrivateTabBar_onBuilded = function FDsPrivateTabBar_onBuilded(p){
      var o = this;
      o.__base.FUiTabBar.onBuilded.call(o, p);
      o._controlProjectButton.addClickListener(o, o.onButtonClick);
      o._controlResourceButton.addClickListener(o, o.onButtonClick);
      o._controlTeamButton.addClickListener(o, o.onButtonClick);
      o._controlPublishButton.addClickListener(o, o.onButtonClick);
   }
   MO.FDsPrivateTabBar_onButtonClick = function FDsPrivateTabBar_onButtonClick(event){
      var o = this;
      var sender = event.sender;
      var name = sender.name();
      if(name == 'solution'){
         o._workspace.selectFrameSet(EDsFrameSet.PrivateSolutionFrameSet);
      }else if(name == 'project'){
         o._workspace.selectFrameSet(EDsFrameSet.PrivateProjectFrameSet);
      }else if(name == 'resource'){
         o._workspace.selectFrameSet(EDsFrameSet.PrivateResourceFrameSet);
      }else{
         alert('功能未开启，请以后关注。');
      }
   }
   MO.FDsPrivateTabBar_construct = function FDsPrivateTabBar_construct(){
      var o = this;
      o.__base.FUiTabBar.construct.call(o);
   }
   MO.FDsPrivateTabBar_dispose = function FDsPrivateTabBar_dispose(){
      var o = this;
      o.__base.FUiTabBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsPrivateWorkspace = function FDsPrivateWorkspace(o){
      o = RClass.inherits(this, o, FUiWorkspace, MUiStorage);
      o._frameName            = 'resource.private.Workspace';
      o._storageCode          = o._frameName;
      o._styleMenuBarGround   = RClass.register(o, new AStyle('_styleMenuBarGround', 'MenuBar_Ground'));
      o._styleBodyGround      = RClass.register(o, new AStyle('_styleBodyGround', 'Body_Ground'));
      o._styleStatusBarGround = RClass.register(o, new AStyle('_styleStatusBarGround', 'StatusBar_Ground'));
      o._activeFrameSetCode   = null;
      o._activeProjectGuid    = null;
      o._frameToolBar         = null;
      o._frameStatusBar       = null;
      o._activeFrameSet       = null;
      o._frameSets            = null;
      o.onBuilded             = FDsPrivateWorkspace_onBuilded;
      o.construct             = FDsPrivateWorkspace_construct;
      o.selectFrameSet        = FDsPrivateWorkspace_selectFrameSet;
      o.load                  = FDsPrivateWorkspace_load;
      o.dispose               = FDsPrivateWorkspace_dispose;
      return o;
   }
   MO.FDsPrivateWorkspace_onBuilded = function FDsPrivateWorkspace_onBuilded(event){
      var o = this;
      o.__base.FUiWorkspace.onBuilded.call(o, event);
      o._frameMenuBar._hPanel.className = o.styleName('MenuBar_Ground');
      o._frameBody._hPanel.className = o.styleName('Body_Ground');
      o._frameStatusBar._hPanel.className = o.styleName('StatusBar_Ground');
      var hTable = RBuilder.createTable(event);
      hTable.width = '100%';
      var hRow = RBuilder.appendTableRow(hTable);
      o._hMenuPanel = RBuilder.appendTableCell(hRow);
      var control = o._tabBar = RClass.create(FDsPrivateTabBar);
      control._workspace = o;
      control.buildDefine(event);
      var hCell = RBuilder.appendTableCell(hRow);
      hCell.width = '100px';
      hCell.align = 'right';
      hCell.vAlign = 'bottom';
      hCell.appendChild(control._hPanel);
      o._frameMenuBar._hPanel.appendChild(hTable);
   }
   MO.FDsPrivateWorkspace_construct = function FDsPrivateWorkspace_construct(){
      var o = this;
      o.__base.FUiWorkspace.construct.call(o);
      o._frameSets = new TDictionary();
   }
   MO.FDsPrivateWorkspace_selectFrameSet = function FDsPrivateWorkspace_selectFrameSet(name, guid){
      var o = this;
      var frameSet = o._frameSets.get(name);
      if(!frameSet){
         if(name == EDsFrameSet.PrivateSolutionFrameSet){
            var menuBar = RClass.create(FDsSolutionMenuBar);
            menuBar._workspace = o;
            menuBar.buildDefine(o._hPanel);
            frameSet = RConsole.find(FUiFrameConsole).findByClass(o, FDsSolutionFrameSet);
            frameSet._workspace = o;
            frameSet._menuBar = menuBar;
            menuBar._frameSet = frameSet;
         }else if(name == EDsFrameSet.PrivateProjectFrameSet){
            var menuBar = RClass.create(FDsPrivateProjectMenuBar);
            menuBar._workspace = o;
            menuBar.buildDefine(o._hPanel);
            frameSet = RConsole.find(FUiFrameConsole).findByClass(o, FDsPrivateProjectFrameSet);
            frameSet._workspace = o;
            frameSet._menuBar = menuBar;
            menuBar._frameSet = frameSet;
         }else if(name == EDsFrameSet.PrivateResourceFrameSet){
            var menuBar = RClass.create(FDsPrivateResourceMenuBar);
            menuBar._workspace = o;
            menuBar.buildDefine(o._hPanel);
            frameSet = RConsole.find(FUiFrameConsole).findByClass(o, FDsPrivateResourceFrameSet);
            frameSet._workspace = o;
            frameSet._menuBar = menuBar;
            menuBar._frameSet = frameSet;
         }else if(name == EDsFrameSet.PrivateBitmapFrameSet){
            var menuBar = RClass.create(FDsPrivateBitmapMenuBar);
            menuBar._workspace = o;
            menuBar.buildDefine(o._hPanel);
            frameSet = RConsole.find(FUiFrameConsole).findByClass(o, FDsPrivateBitmapFrameSet);
            frameSet._workspace = o;
            frameSet._menuBar = menuBar;
            menuBar._frameSet = frameSet;
         }else if(name == EDsFrameSet.PrivateMaterialFrameSet){
            var menuBar = RClass.create(FDsPrivateMaterialMenuBar);
            menuBar._workspace = o;
            menuBar.buildDefine(o._hPanel);
            frameSet = RConsole.find(FUiFrameConsole).findByClass(o, FDsPrivateMaterialFrameSet);
            frameSet._workspace = o;
            frameSet._menuBar = menuBar;
            menuBar._frameSet = frameSet;
         }else if(name == EDsFrameSet.PrivateModelFrameSet){
            var menuBar = RClass.create(FDsPrivateModelMenuBar);
            menuBar._workspace = o;
            menuBar.buildDefine(o._hPanel);
            frameSet = RConsole.find(FUiFrameConsole).findByClass(o, FDsPrivateModelFrameSet);
            frameSet._workspace = o;
            frameSet._menuBar = menuBar;
            menuBar._frameSet = frameSet;
         }else if(name == EDsFrameSet.PrivateTemplateFrameSet){
            var menuBar = RClass.create(FDsPrivateTemplateMenuBar);
            menuBar._workspace = o;
            menuBar.buildDefine(o._hPanel);
            frameSet = RConsole.find(FUiFrameConsole).findByClass(o, FDsPrivateTemplateFrameSet);
            frameSet._workspace = o;
            frameSet._menuBar = menuBar;
            menuBar._frameSet = frameSet;
         }else if(name == EDsFrameSet.PrivateSceneFrameSet){
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
         case EDsFrameSet.PrivateSolutionFrameSet:
            frameSet.load();
            break;
         case EDsFrameSet.PrivateProjectFrameSet:
            frameSet.loadByGuid(guid);
            break;
         case EDsFrameSet.PrivateResourceFrameSet:
            frameSet.load();
            break;
         case EDsFrameSet.PrivateBitmapFrameSet:
            frameSet.loadByGuid(guid);
            break;
         case EDsFrameSet.PrivateMaterialFrameSet:
            frameSet.loadByGuid(guid);
            break;
         case EDsFrameSet.PrivateModelFrameSet:
            frameSet.loadByGuid(guid);
            break;
         case EDsFrameSet.PrivateTemplateFrameSet:
            frameSet.loadByGuid(guid);
            break;
         case EDsFrameSet.PrivateSceneFrameSet:
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
   MO.FDsPrivateWorkspace_load = function FDsPrivateWorkspace_load(){
      var o = this;
      var code = o._activeFrameSetCode = o.storageGet('frameset_code', EDsFrameSet.SolutionFrameSet);
      var guid = o._activeFrameSetGuid = o.storageGet('frameset_guid');
      var button = null;
      if(code == EDsFrameSet.SolutionFrameSet){
         button = o._tabBar.findControl('solution');
         button.doClick();
      }else if(code == EDsFrameSet.PrivateProjectFrameSet){
         button = o._tabBar.findControl('solution');
         o._tabBar.select(button);
         o.selectFrameSet(code, guid)
      }else if(code == EDsFrameSet.PrivateResourceFrameSet){
         button = o._tabBar.findControl('resource');
         button.doClick();
      }else if(code == EDsFrameSet.PrivateBitmapFrameSet){
         button = o._tabBar.findControl('resource');
         o._tabBar.select(button);
         o.selectFrameSet(code, guid)
      }else if(code == EDsFrameSet.PrivateMaterialFrameSet){
         button = o._tabBar.findControl('resource');
         o._tabBar.select(button);
         o.selectFrameSet(code, guid)
      }else if(code == EDsFrameSet.PrivateModelFrameSet){
         button = o._tabBar.findControl('resource');
         o._tabBar.select(button);
         o.selectFrameSet(code, guid)
      }else if(code == EDsFrameSet.PrivateTemplateFrameSet){
         button = o._tabBar.findControl('resource');
         o._tabBar.select(button);
         o.selectFrameSet(code, guid)
      }else if(code == EDsFrameSet.PrivateSceneFrameSet){
         button = o._tabBar.findControl('resource');
         o._tabBar.select(button);
         o.selectFrameSet(code, guid)
      }else{
         button = o._tabBar.findControl('solution');
         button.doClick();
      }
   }
   MO.FDsPrivateWorkspace_dispose = function FDsPrivateWorkspace_dispose(){
      var o = this;
      o._frameSets = RObject.dispose(o._frameSets);
      o.__base.FUiWorkspace.dispose.call(o);
   }
}
