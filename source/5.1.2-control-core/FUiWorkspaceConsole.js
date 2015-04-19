//==========================================================
// <T>工作台控制器。</T>
//
// @console
// @author maocy
// @history 150317
//==========================================================
function FUiWorkspaceConsole(o){
   o = RClass.inherits(this, o, FConsole);
   //..........................................................
   // @attribute
   o._scopeCd         = EScope.Local;
   // @attribute
   o._activeWorkspace = null;
   o._workspaces      = null;
   //..........................................................
   // @event
   o.onResize         = FUiWorkspaceConsole_onResize;
   //..........................................................
   // @method
   o.construct        = FUiWorkspaceConsole_construct;
   // @method
   o.active           = FUiWorkspaceConsole_active;
   o.resize           = FUiWorkspaceConsole_resize;
   // @method
   o.dispose          = FUiWorkspaceConsole_dispose;
   return o;
}

//==========================================================
// <T>大小改变处理。</T>
//
// @method
//==========================================================
function FUiWorkspaceConsole_onResize(p){
   var o = this;
   var w = o._activeWorkspace;
   if(w){
      w.psResize();
   }
}

//==========================================================
// <T>构造函数。</T>
//
// @method
//==========================================================
function FUiWorkspaceConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   // 设置属性
   o._workspaces = new TDictionary();
   // 监听事件
   RWindow.lsnsResize.register(o, o.onResize);
}

//==========================================================
// <T>激活一个工作台。</T>
//
// @method
// @param p:workspace:FUiWorkspace 工作台
//==========================================================
function FUiWorkspaceConsole_active(p){
   this._activeWorkspace = p;
}

//==========================================================
// <T>改变大小。</T>
//
// @method
//==========================================================
function FUiWorkspaceConsole_resize(){
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
function FUiWorkspaceConsole_dispose(){
   var o = this;
   // 父处理
   o.__base.FConsole.dispose.call(o);
}
