with(MO){
   //==========================================================
   // <T>模板工作区域。</T>
   //
   // @author maocy
   // @history 150121
   //==========================================================
   MO.FDsPrivateWorkspace = function FDsPrivateWorkspace(o){
      o = RClass.inherits(this, o, FDuiWorkspace, MUiStorage);
      //..........................................................
      // @property
      o._frameName            = 'resource.private.Workspace';
      o._storageCode          = o._frameName;
      //..........................................................
      // @style
      o._styleMenuBarGround   = RClass.register(o, new AStyle('_styleMenuBarGround', 'MenuBar_Ground'));
      o._styleBodyGround      = RClass.register(o, new AStyle('_styleBodyGround', 'Body_Ground'));
      o._styleStatusBarGround = RClass.register(o, new AStyle('_styleStatusBarGround', 'StatusBar_Ground'));
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
   // @param event:TEventProcess 事件处理
   //==========================================================
   MO.FDsPrivateWorkspace_onBuilded = function FDsPrivateWorkspace_onBuilded(event){
      var o = this;
      o.__base.FDuiWorkspace.onBuilded.call(o, event);
      //..........................................................
      // 设置样式
      o._frameMenuBar._hPanel.className = o.styleName('MenuBar_Ground');
      o._frameBody._hPanel.className = o.styleName('Body_Ground');
      o._frameStatusBar._hPanel.className = o.styleName('StatusBar_Ground');
      //..........................................................
      var hTable = RBuilder.createTable(event);
      hTable.width = '100%';
      var hRow = RBuilder.appendTableRow(hTable);
      // 设置工具栏
      o._hMenuPanel = RBuilder.appendTableCell(hRow);
      // 设置分页栏
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

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsPrivateWorkspace_construct = function FDsPrivateWorkspace_construct(){
      var o = this;
      // 父处理
      o.__base.FDuiWorkspace.construct.call(o);
      // 设置属性
      o._frameSets = new TDictionary();
   }

   //==========================================================
   // <T>根据名称获得属性页面。</T>
   //
   // @method
   // @return FDuiFrame 页面
   //==========================================================
   MO.FDsPrivateWorkspace_selectFrameSet = function FDsPrivateWorkspace_selectFrameSet(name, guid){
      var o = this;
      // 获得框架
      var frameSet = o._frameSets.get(name);
      if(!frameSet){
         if(name == EDsFrameSet.PrivateSolutionFrameSet){
            // 创建菜单
            var menuBar = RClass.create(FDsSolutionMenuBar);
            menuBar._workspace = o;
            menuBar.buildDefine(o._hPanel);
            // 创建框架
            frameSet = RConsole.find(FDuiFrameConsole).findByClass(o, FDsSolutionFrameSet);
            frameSet._workspace = o;
            frameSet._menuBar = menuBar;
            menuBar._frameSet = frameSet;
         }else if(name == EDsFrameSet.PrivateProjectFrameSet){
            // 创建菜单
            var menuBar = RClass.create(FDsPrivateProjectMenuBar);
            menuBar._workspace = o;
            menuBar.buildDefine(o._hPanel);
            // 创建框架
            frameSet = RConsole.find(FDuiFrameConsole).findByClass(o, FDsPrivateProjectFrameSet);
            frameSet._workspace = o;
            frameSet._menuBar = menuBar;
            menuBar._frameSet = frameSet;
         }else if(name == EDsFrameSet.PrivateResourceFrameSet){
            // 创建菜单
            var menuBar = RClass.create(FDsPrivateResourceMenuBar);
            menuBar._workspace = o;
            menuBar.buildDefine(o._hPanel);
            // 创建框架
            frameSet = RConsole.find(FDuiFrameConsole).findByClass(o, FDsPrivateResourceFrameSet);
            frameSet._workspace = o;
            frameSet._menuBar = menuBar;
            menuBar._frameSet = frameSet;
         }else if(name == EDsFrameSet.PrivateBitmapFrameSet){
            // 创建菜单
            var menuBar = RClass.create(FDsPrivateBitmapMenuBar);
            menuBar._workspace = o;
            menuBar.buildDefine(o._hPanel);
            // 创建框架
            frameSet = RConsole.find(FDuiFrameConsole).findByClass(o, FDsPrivateBitmapFrameSet);
            frameSet._workspace = o;
            frameSet._menuBar = menuBar;
            menuBar._frameSet = frameSet;
         }else if(name == EDsFrameSet.PrivateMaterialFrameSet){
            // 创建菜单
            var menuBar = RClass.create(FDsPrivateMaterialMenuBar);
            menuBar._workspace = o;
            menuBar.buildDefine(o._hPanel);
            // 创建框架
            frameSet = RConsole.find(FDuiFrameConsole).findByClass(o, FDsPrivateMaterialFrameSet);
            frameSet._workspace = o;
            frameSet._menuBar = menuBar;
            menuBar._frameSet = frameSet;
         }else if(name == EDsFrameSet.PrivateModelFrameSet){
            // 创建菜单
            var menuBar = RClass.create(FDsPrivateModelMenuBar);
            menuBar._workspace = o;
            menuBar.buildDefine(o._hPanel);
            // 创建框架
            frameSet = RConsole.find(FDuiFrameConsole).findByClass(o, FDsPrivateModelFrameSet);
            frameSet._workspace = o;
            frameSet._menuBar = menuBar;
            menuBar._frameSet = frameSet;
         }else if(name == EDsFrameSet.PrivateTemplateFrameSet){
            // 创建菜单
            var menuBar = RClass.create(FDsPrivateTemplateMenuBar);
            menuBar._workspace = o;
            menuBar.buildDefine(o._hPanel);
            // 创建框架
            frameSet = RConsole.find(FDuiFrameConsole).findByClass(o, FDsPrivateTemplateFrameSet);
            frameSet._workspace = o;
            frameSet._menuBar = menuBar;
            menuBar._frameSet = frameSet;
         }else if(name == EDsFrameSet.PrivateSceneFrameSet){
            // 创建菜单
            var menuBar = RClass.create(FDsPrivateSceneMenuBar);
            menuBar._workspace = o;
            menuBar.buildDefine(o._hPanel);
            // 创建框架
            frameSet = RConsole.find(FDuiFrameConsole).findByClass(o, FDsPrivateSceneFrameSet);
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
   MO.FDsPrivateWorkspace_load = function FDsPrivateWorkspace_load(){
      var o = this;
      // 选择开始页面
      var code = o._activeFrameSetCode = o.storageGet('frameset_code', EDsFrameSet.SolutionFrameSet);
      var guid = o._activeFrameSetGuid = o.storageGet('frameset_guid');
      // 点击切换按键
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

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsPrivateWorkspace_dispose = function FDsPrivateWorkspace_dispose(){
      var o = this;
      // 设置属性
      o._frameSets = RObject.dispose(o._frameSets);
      // 父处理
      o.__base.FDuiWorkspace.dispose.call(o);
   }
}
