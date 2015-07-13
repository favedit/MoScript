//==========================================================
// <T>资源主题管理器。</T>
//
// @author maocy
// @history 150108
//==========================================================
MO.FE3sThemeConsole = function FE3sThemeConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   //..........................................................
   // @attribute
   o._path        = '/assets/theme/'
   o._activeTheme = MO.Class.register(o, new MO.AGetter('_activeTheme'));
   o._themes      = null;
   //..........................................................
   // @method
   o.construct    = MO.FE3sThemeConsole_construct;
   o.find         = MO.FE3sThemeConsole_find;
   o.select       = MO.FE3sThemeConsole_select;
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
   o._themes = new MO.TDictionary();
}

//==========================================================
// <T>根据名称查找材质。</T>
//
// @param name:String 名称
// @return FRsMaterial 材质
//==========================================================
MO.FE3sThemeConsole_find = function FE3sThemeConsole_find(name){
   var theme = this._activeTheme;
   if(theme == null){
      throw new MO.TError('Active theme is empty.');
   }
   return theme.find(name);
}

//==========================================================
// <T>选择一个主题。</T>
//
// @param name:String 名称
// @return 主题
//==========================================================
MO.FE3sThemeConsole_select = function FE3sThemeConsole_select(name){
   var o = this;
   // 获得主题
   var theme = o._themes.get(name);
   if(theme == null){
      // 生成地址
      var url = MO.RBrowser.contentPath(o._path + name + '.ser');
      // 创建主题
      theme = MO.Class.create(MO.FE3sTheme);
      theme.load(url);
      o._themes.set(name, theme);
   }
   // 激活主题
   o._activeTheme = theme;
   return theme;
}
