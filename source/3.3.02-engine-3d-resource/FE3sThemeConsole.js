with(MO){
   //==========================================================
   // <T>资源主题管理器。</T>
   //
   // @author maocy
   // @history 150108
   //==========================================================
   MO.FE3sThemeConsole = function FE3sThemeConsole(o){
      o = RClass.inherits(this, o, FConsole);
      //..........................................................
      // @attribute
      o._path        = '/assets/theme/'
      o._activeTheme = null;
      o._themes      = null;
      //..........................................................
      // @method
      o.construct    = FE3sThemeConsole_construct;
      o.activeTheme  = FE3sThemeConsole_activeTheme;
      o.find         = FE3sThemeConsole_find;
      o.select       = FE3sThemeConsole_select;
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FE3sThemeConsole_construct = function FE3sThemeConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      o._themes = new TDictionary();
   }

   //==========================================================
   // <T>获得激活的主题。</T>
   //
   // @method
   //==========================================================
   MO.FE3sThemeConsole_activeTheme = function FE3sThemeConsole_activeTheme(){
      return this._activeTheme;
   }

   //==========================================================
   // <T>根据名称查找材质。</T>
   //
   // @param p:name:String 名称
   // @return FRsMaterial 材质
   //==========================================================
   MO.FE3sThemeConsole_find = function FE3sThemeConsole_find(p){
      var t = this._activeTheme;
      if(t == null){
         throw new TError('Active theme is empty.');
      }
      return t.find(p);
   }

   //==========================================================
   // <T>选择一个主题。</T>
   //
   // @param p:name:String 名称
   // @return 主题
   //==========================================================
   MO.FE3sThemeConsole_select = function FE3sThemeConsole_select(p){
      var o = this;
      // 获得主题
      var r = o._themes.get(p);
      if(r == null){
         // 生成地址
         var u = RBrowser.contentPath(o._path + p + '.ser');
         // 创建主题
         r = RClass.create(FE3sTheme);
         r.load(u);
         o._themes.set(p, r);
      }
      // 激活主题
      o._activeTheme = r;
      return r;
   }
}
