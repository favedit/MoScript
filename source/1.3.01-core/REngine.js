with(MO){
   //==========================================================
   // 设置页面全局信息的操作类
   //
   // @reference
   // @author maochunyang
   // @version 1.0.1
   //==========================================================
   MO.REngine = function REngine(){
      var o = this;
      //..........................................................
      // @attribute
      o._spaces    = new Object();
      o.Global     = new Object();
      o.Top        = new Object();
      o.Local      = new Object();
      //..........................................................
      // @event
      o.onRelease  = REngine_onRelease;
      //..........................................................
      // @method
      o.register   = REngine_register;
      o.initialize = REngine_initialize;
      o.connect    = REngine_connect;
      o.buildSpace = REngine_buildSpace;
      o.find       = REngine_find;
      o.findGlobal = REngine_findGlobal;
      o.findTop    = REngine_findTop;
      o.findLocal  = REngine_findLocal;
      return o;
   }

   //==========================================================
   // <T>释放引擎中所有的对象。</T>
   //
   // @method
   // =========================================================
   MO.REngine_onRelease = function REngine_onRelease(){
      RConsole.release();
      REvent.release();
      CollectGarbage();
   }

   //==========================================================
   // <T>向引擎工具中注册对象类型。</T>
   //
   // @method
   // @param s:space:TSpace 存储对象描述
   //==========================================================
   MO.REngine_register = function REngine_register(s){
      var o = this;
      // 创建存储空间
      var p = o._spaces[s.space];
      if(!p){
         p = o._spaces[s.space] = new Object();
      }
      p[s.name] = s;
   }

   //==========================================================
   // <T>初始化系统引擎。</T>
   //
   // @method
   //==========================================================
   MO.REngine_initialize = function REngine_initialize(){
      var o = this;
      // 初始化控制台
      RConsole.initialize();
      // 注册关闭事件
      //RWindow.lsnsUnload.register(o, o.onRelease);
      // Global
      //o.buildSpace(o.Global, o._spaces[ESpace.Global]);
      // Top
      //o.buildSpace(o.Top, o._spaces[ESpace.Global]);
      //o.buildSpace(o.Top, o._spaces[ESpace.Top]);
      // Local 
      //o.buildSpace(o.Local, o._spaces[ESpace.Global]);
      //o.buildSpace(o.Local, o._spaces[ESpace.Top]);
      //o.buildSpace(o.Local, o._spaces[ESpace.Local]);
   }

   //==========================================================
   // <T>关联系统引擎。</T>
   //
   // @method
   //==========================================================/
   MO.REngine_connect = function REngine_connect(){
      var o = this;
      // 初始化控制台
      RConsole.initialize();
      // 注册关闭事件
      //RWindow.lsnsUnload.register(o, o.onRelease);
      // Global
      //o.buildSpace(o.Global, top.REngine._spaces[ESpace.Global]);
      // Top
      //o.buildSpace(o.Top, top.REngine._spaces[ESpace.Top]);
      // Local 
      //o.buildSpace(o.Local, o._spaces[ESpace.Global]);
      //o.buildSpace(o.Local, o._spaces[ESpace.Top]);
      //o.buildSpace(o.Local, o._spaces[ESpace.Local]);
   }

   //==========================================================
   // <T>建立空间内的对象结构。</T>
   //
   // @method
   //==========================================================
   MO.REngine_buildSpace = function REngine_buildSpace(t, p){
      var o = this;
      for(var n in p){
         if(RString.startsWith(n, 'R')){
            t[n.substring(1)] = p[n].instance;
         }
      }
   }

   //==========================================================
   // <T>从指定范围内,根据对象名称中查找一个对象的实例。</T>
   //
   // @method
   // @param n:name:String 对象名称
   //==========================================================
   MO.REngine_find = function REngine_find(s, n){
      var r = null;
      var s = this._spaces[s];
      if(s){
         r = s[n];
         if(r){
            return r.instance;
         }
      }
      return null;
   }

   //==========================================================
   // <T>从全局范围内,根据对象名称中查找一个对象的实例。</T>
   //
   // @method
   // @param n:name:String 对象名称
   //==========================================================
   MO.REngine_findGlobal = function REngine_findGlobal(n){
      return this.find(ESpace.Global, n);
   }

   //==========================================================
   // <T>从最顶层页面范围内,根据对象名称中查找一个对象的实例。</T>
   //
   // @method
   // @param n:name:String 对象名称
   //==========================================================
   MO.REngine_findTop = function REngine_findTop(n){
      return top.REngine.find(ESpace.Top, n);
   }

   //==========================================================
   // <T>从当前页面范围内,根据对象名称中查找一个对象的实例。</T>
   //
   // @method
   // @param n:name:String 对象名称
   //==========================================================
   MO.REngine_findLocal = function REngine_findLocal(n){
      return this.find(ESpace.Local, n);
   }
   //..........................................................
   // 实例化内容
   MO.REngine = new REngine();
}
