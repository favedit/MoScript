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
   // @attribute
   o._workspaces    = new MO.TDictionary();
   // @attribute
   o._thread        = null;
   o._interval      = 20;
   return o;
}

//==========================================================
// <T>响应事件处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.RDesktop.prototype.onProcessEvent = function RDesktop_onProcessEvent(event){
   var o = this;
   var application = o._application;
   if(application){
      application.processEvent(event);
   }
}

//==========================================================
// <T>响应处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.RDesktop.prototype.onProcess = function RDesktop_onProcess(event){
   var o = this;
   var application = o._application;
   if(application){
      application.process();
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
// <T>初始化系统引擎。</T>
//
// @method
// @param clazz:Function 类对象
//==========================================================
MO.RDesktop.prototype.initialize = function RDesktop_initialize(clazz){
   var o = this;
   // 构造浏览管理器
   MO.Window.Browser.construct();
   // 构造窗口管理器
   MO.Window.connect(window);
   // 构造键盘管理器
   MO.Window.Keyboard.construct();
   // 监听事件
   MO.Window.lsnsMouseDown.register(o, o.onProcessEvent);
   MO.Window.lsnsMouseMove.register(o, o.onProcessEvent);
   MO.Window.lsnsMouseUp.register(o, o.onProcessEvent);
   MO.Window.lsnsMouseWheel.register(o, o.onProcessEvent);
   MO.Window.lsnsKeyDown.register(o, o.onProcessEvent);
   MO.Window.lsnsKeyPress.register(o, o.onProcessEvent);
   MO.Window.lsnsKeyUp.register(o, o.onProcessEvent);
   MO.Window.lsnsResize.register(o, o.onProcessEvent);
   MO.Window.lsnsOrientation.register(o, o.onProcessEvent);
   // 创建线程
   var thread = o._thread = MO.Class.create(MO.FThread);
   thread.setInterval(o._interval);
   thread.addProcessListener(o, o.process);
   MO.Console.find(MO.FThreadConsole).start(thread);
   // 设置计时器
   MO.Timer.setup();
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
// <T>处理。</T>
//
// @method
// =========================================================
MO.RDesktop.prototype.process = function RDesktop_process(){
   var o = this;
   // 处理应用
   o.onProcess();
   // 更新计时器
   MO.Timer.update();
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
MO.Desktop = new MO.RDesktop();
