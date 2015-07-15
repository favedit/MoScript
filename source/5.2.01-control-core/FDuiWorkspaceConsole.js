//==========================================================
// <T>工作台控制器。</T>
//
// @console
// @author maocy
// @history 150317
//==========================================================
MO.FUiWorkspaceConsole = function FUiWorkspaceConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   //..........................................................
   // @attribute
   o._scopeCd         = MO.EScope.Local;
   // @attribute
   o._activeWorkspace = null;
   o._workspaces      = null;
   // @attribute
   o._thread          = null;
   o._interval        = 100;
   //..........................................................
   // @event
   o.onResize         = MO.FUiWorkspaceConsole_onResize;
   o.onProcess        = MO.FUiWorkspaceConsole_onProcess;
   //..........................................................
   // @method
   o.construct        = MO.FUiWorkspaceConsole_construct;
   // @method
   o.active           = MO.FUiWorkspaceConsole_active;
   o.resize           = MO.FUiWorkspaceConsole_resize;
   // @method
   o.dispose          = MO.FUiWorkspaceConsole_dispose;
   return o;
}

//==========================================================
// <T>大小改变处理。</T>
//
// @method
//==========================================================
MO.FUiWorkspaceConsole_onResize = function FUiWorkspaceConsole_onResize(p){
   var o = this;
   var workspace = o._activeWorkspace;
   if(workspace){
      workspace.psResize();
   }
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FUiWorkspaceConsole_onProcess = function FUiWorkspaceConsole_onProcess(event){
   var o = this;
   var workspace = o._activeWorkspace;
   if(workspace){
      workspace.psFrame(event);
   }
}

//==========================================================
// <T>构造函数。</T>
//
// @method
//==========================================================
MO.FUiWorkspaceConsole_construct = function FUiWorkspaceConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   // 设置属性
   o._workspaces = new MO.TDictionary();
   // 创建线程
   var thread = o._thread = MO.Class.create(MO.FThread);
   thread.setInterval(o._interval);
   thread.addProcessListener(o, o.onProcess);
   MO.Console.find(MO.FThreadConsole).start(thread);
   // 监听事件
   MO.RWindow.lsnsResize.register(o, o.onResize);
}

//==========================================================
// <T>激活一个工作台。</T>
//
// @method
// @param p:workspace:FUiWorkspace 工作台
//==========================================================
MO.FUiWorkspaceConsole_active = function FUiWorkspaceConsole_active(p){
   this._activeWorkspace = p;
}

//==========================================================
// <T>改变大小。</T>
//
// @method
//==========================================================
MO.FUiWorkspaceConsole_resize = function FUiWorkspaceConsole_resize(){
   this.onResize();
}

//==========================================================
// <T>。</T>
//
// @method
// @param n:name:String 表单名称
// @param h:html:HTML 页面元素的放置位置
// @param b:Builder:Builder 构建器
// @return MForm 表单实例
//==========================================================
MO.FUiWorkspaceConsole_dispose = function FUiWorkspaceConsole_dispose(){
   var o = this;
   // 父处理
   o.__base.FConsole.dispose.call(o);
}
