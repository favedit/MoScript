with(MO){
   //==========================================================
   // <T>应用管理类。</T>
   //
   // @class
   // @author maocy
   // @version 150130
   //==========================================================
   MO.RApplication = function RApplication(){
      var o = this;
      //..........................................................
      // @attribute
      o._workspaces  = new TDictionary();
      return o;
   }

   //==========================================================
   // <T>初始化系统引擎。</T>
   //
   // @method
   //==========================================================
   MO.RApplication.prototype.initialize = function RApplication_initialize(){
      var o = this;
      // 构造浏览管理器
      RBrowser.construct();
      // 构造窗口管理器
      RWindow.connect(window);
      // 构造键盘管理器
      RKeyboard.construct();
   }

   //==========================================================
   // <T>查找工作空间。</T>
   //
   // @method
   // @param clazz:Function 类名称
   // @return 工作空间
   // =========================================================
   MO.RApplication.prototype.findWorkspace = function RApplication_findWorkspace(clazz){
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
   MO.RApplication.prototype.release = function RApplication_release(){
      try{
         CollectGarbage();
      }catch(e){
        MO.Logger.error(e);
      }
   }
   //..........................................................
   // 实例化内容
   MO.RApplication = new RApplication();
}
