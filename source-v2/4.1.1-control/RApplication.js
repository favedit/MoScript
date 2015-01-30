//==========================================================
// <T>应用管理类。</T>
//
// @class
// @author maocy
// @version 150130
//==========================================================
var RApplication = new function RApplication(){
   var o = this;
   //..........................................................
   // @attribute
   o._workspaces   = new TDictionary();
   //..........................................................
   // @method
   o.initialize    = RApplication_initialize;
   o.findWorkspace = RApplication_findWorkspace;
   o.release       = RApplication_release;
   return o;
}

//==========================================================
// <T>初始化系统引擎。</T>
//
// @method
//==========================================================
function RApplication_initialize(){
   var o = this;
   // 构造浏览管理器
   RBrowser.construct();
   // 构造窗口管理器
   RWindow.connect(window);
}

//==========================================================
// <T>查找工作空间。</T>
//
// @method
// @param p:class:Function 类名称
// @return 工作空间
// =========================================================
function RApplication_findWorkspace(p){
   var o = this;
   var n = RClass.name(p);
   var ws = o._workspaces;
   var w = ws.get(n);
   if(w == null){
      w = RClass.create(p);
      ws.set(n, w);
   }
   return w;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function RApplication_release(){
   try{
      CollectGarbage();
   }catch(e){
      RLogger.error(e);
   }
}
