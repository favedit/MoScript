with(MO){
   //==========================================================
   // <T>应用管理类。</T>
   //
   // @class
   // @author maocy
   // @version 150130
   //==========================================================
   MO.RDesktop = function RDesktop(){
      var o = this;
      //..........................................................
      // @attribute
      o._application   = null;
      o._activeDesktop = null;
      o._workspaces    = new TDictionary();
      return o;
   }

   //==========================================================
   // <T>鼠标落下事件处理。</T>
   //
   // @method
   // @param event:SEvent 事件信息
   //==========================================================
   MO.RDesktop.prototype.onMouseDown = function RDesktop_onMouseDown(event){
      var o = this;
      var application = o._application;
      if(application){
         application.processEvent(event);
      }
   }

   //==========================================================
   // <T>鼠标移动事件处理。</T>
   //
   // @method
   // @param event:SEvent 事件信息
   //==========================================================
   MO.RDesktop.prototype.onMouseMove = function RDesktop_onMouseMove(event){
      var o = this;
      var application = o._application;
      if(application){
         application.processEvent(event);
      }
   }

   //==========================================================
   // <T>鼠标抬起事件处理。</T>
   //
   // @method
   // @param event:SEvent 事件信息
   //==========================================================
   MO.RDesktop.prototype.onMouseUp = function RDesktop_onMouseUp(event){
      var o = this;
      var application = o._application;
      if(application){
         application.processEvent(event);
      }
   }

   //==========================================================
   // <T>获得应用。</T>
   //
   // @method
   // @return Function 应用
   //==========================================================
   MO.RDesktop.prototype.application = function RDesktop_application(){
      return this._application;
   }

   //==========================================================
   // <T>获得激活桌面。</T>
   //
   // @method
   // @return FDesktop 桌面
   //==========================================================
   MO.RDesktop.prototype.activeDesktop = function RDesktop_activeDesktop(){
      return this._activeDesktop;
   }

   //==========================================================
   // <T>设置激活桌面。</T>
   //
   // @method
   // @param desktop:FDesktop 桌面
   //==========================================================
   MO.RDesktop.prototype.setActiveDesktop = function RDesktop_setActiveDesktop(desktop){
      this._activeDesktop = desktop;
   }

   //==========================================================
   // <T>初始化系统引擎。</T>
   //
   // @method
   // @param clazz:Function 类对象
   //==========================================================
   MO.RDesktop.prototype.initialize = function RDesktop_initialize(clazz){
      var o = this;
      // 构造浏览管理器
      RBrowser.construct();
      // 构造窗口管理器
      RWindow.connect(window);
      // 构造键盘管理器
      RKeyboard.construct();
      // 监听事件
      RWindow.lsnsMouseDown.register(o, o.onMouseDown);
      RWindow.lsnsMouseMove.register(o, o.onMouseMove);
      RWindow.lsnsMouseUp.register(o, o.onMouseUp);
      // 创建应用
      var application = MO.Application = o._application = MO.Class.create(clazz);
      return application;
   }

   //==========================================================
   // <T>查找工作空间。</T>
   //
   // @method
   // @param clazz:Function 类名称
   // @return 工作空间
   // =========================================================
   MO.RDesktop.prototype.findWorkspace = function RDesktop_findWorkspace(clazz){
      var o = this;
      var name = RClass.name(clazz);
      var workspaces = o._workspaces;
      var workspace = workspaces.get(name);
      if(workspace == null){
         workspace = RClass.create(clazz);
         workspaces.set(name, workspace);
      }
      return workspace;
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.RDesktop.prototype.release = function RDesktop_release(){
      try{
         CollectGarbage();
      }catch(e){
        MO.Logger.error(e);
      }
   }
   //..........................................................
   // 实例化内容
   MO.Desktop = new RDesktop();
}
