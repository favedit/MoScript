with(MO){
   //==========================================================
   // <T>模板工作区域。</T>
   //
   // @author maocy
   // @history 150121
   //==========================================================
   MO.FDsSystemWorkspace = function FDsSystemWorkspace(o){
      o = RClass.inherits(this, o, FDuiWorkspace, MUiStorage);
      //..........................................................
      // @property
      o._frameName            = 'system.design.Workspace';
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
      o.onBuilded             = FDsSystemWorkspace_onBuilded;
      //..........................................................
      // @method
      o.construct             = FDsSystemWorkspace_construct;
      // @method
      o.selectFrameSet        = FDsSystemWorkspace_selectFrameSet;
      o.load                  = FDsSystemWorkspace_load;
      // @method
      o.dispose               = FDsSystemWorkspace_dispose;
      return o;
   }

   //==========================================================
   // <T>构建完成处理。</T>
   //
   // @method
   // @param event:TEventProcess 事件处理
   //==========================================================
   MO.FDsSystemWorkspace_onBuilded = function FDsSystemWorkspace_onBuilded(event){
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
      var control = o._tabBar = RClass.create(FDsSystemTabBar);
      control._workspace = o;
      control.buildDefine(event);
      var hCell = RBuilder.appendTableCell(hRow);
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
   MO.FDsSystemWorkspace_construct = function FDsSystemWorkspace_construct(){
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
   MO.FDsSystemWorkspace_selectFrameSet = function FDsSystemWorkspace_selectFrameSet(name, guid){
      var o = this;
      // 获得框架
      var frameSet = o._frameSets.get(name);
      if(!frameSet){
         if(name == EDsFrameSet.SystemDesignPersistenceFrameSet){
            // 创建菜单
            var menuBar = RClass.create(FDsSystemPersistenceMenuBar);
            menuBar._workspace = o;
            menuBar.buildDefine(o._hPanel);
            // 创建框架
            frameSet = RConsole.find(FDuiFrameConsole).findByClass(o, FDsSystemPersistenceFrameSet);
            frameSet._workspace = o;
            frameSet._menuBar = menuBar;
            menuBar._frameSet = frameSet;
         }else if(name == EDsFrameSet.SystemDesignListFrameSet){
            // 创建菜单
            var menuBar = RClass.create(FDsSystemListMenuBar);
            menuBar._workspace = o;
            menuBar.buildDefine(o._hPanel);
            // 创建框架
            frameSet = RConsole.find(FDuiFrameConsole).findByClass(o, FDsSystemListFrameSet);
            frameSet._workspace = o;
            frameSet._menuBar = menuBar;
            menuBar._frameSet = frameSet;
         }else if(name == EDsFrameSet.SystemDesignTreeFrameSet){
            // 创建菜单
            var menuBar = RClass.create(FDsSystemTreeMenuBar);
            menuBar._workspace = o;
            menuBar.buildDefine(o._hPanel);
            // 创建框架
            frameSet = RConsole.find(FDuiFrameConsole).findByClass(o, FDsSystemTreeFrameSet);
            frameSet._workspace = o;
            frameSet._menuBar = menuBar;
            menuBar._frameSet = frameSet;
         }else if(name == EDsFrameSet.SystemDesignFrameFrameSet){
            // 创建菜单
            var menuBar = RClass.create(FDsSystemFrameMenuBar);
            menuBar._workspace = o;
            menuBar.buildDefine(o._hPanel);
            // 创建框架
            frameSet = RConsole.find(FDuiFrameConsole).findByClass(o, FDsSystemFrameFrameSet);
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
         case EDsFrameSet.SystemDesignPersistenceFrameSet:
            frameSet.load();
            break;
         case EDsFrameSet.SystemDesignListFrameSet:
            frameSet.load();
            break;
         case EDsFrameSet.SystemDesignTreeFrameSet:
            frameSet.load();
            break;
         case EDsFrameSet.SystemDesignFrameFrameSet:
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
   MO.FDsSystemWorkspace_load = function FDsSystemWorkspace_load(){
      var o = this;
      // 选择开始页面
      var code = o._activeFrameSetCode = o.storageGet('frameset_code', EDsFrameSet.SolutionFrameSet);
      var guid = o._activeFrameSetGuid = o.storageGet('frameset_guid');
      // 点击切换按键
      var button = null;
      if(code == EDsFrameSet.SystemDesignPersistenceFrameSet){
         button = o._tabBar.findControl('persistence');
         button.doClick();
      }else if(code == EDsFrameSet.SystemDesignListFrameSet){
         button = o._tabBar.findControl('list');
         o._tabBar.select(button);
         o.selectFrameSet(code, guid)
      }else if(code == EDsFrameSet.SystemDesignTreeFrameSet){
         button = o._tabBar.findControl('tree');
         button.doClick();
      }else if(code == EDsFrameSet.SystemDesignFrameFrameSet){
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
   MO.FDsSystemWorkspace_dispose = function FDsSystemWorkspace_dispose(){
      var o = this;
      // 设置属性
      o._frameSets = RObject.dispose(o._frameSets, true);
      // 父处理
      o.__base.FDuiWorkspace.dispose.call(o);
   }
}
