//==========================================================
// <T>资源主题管理器。</T>
//
// @author maocy
// @history 150108
//==========================================================
function FRs3ThemeConsole(o){
   o = RClass.inherits(this, o, FConsole);
   //..........................................................
   // @attribute
   o._path        = '/assets/theme/'
   o._activeTheme = null;
   o._themes      = null;
   //..........................................................
   // @method
   o.construct    = FRs3ThemeConsole_construct;
   o.activeTheme  = FRs3ThemeConsole_activeTheme;
   o.find         = FRs3ThemeConsole_find;
   o.select       = FRs3ThemeConsole_select;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FRs3ThemeConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._themes = new TDictionary();
}

//==========================================================
// <T>获得激活的主题。</T>
//
// @method
//==========================================================
function FRs3ThemeConsole_activeTheme(){
   return this._activeTheme;
}

//==========================================================
// <T>根据名称查找材质。</T>
//
// @param p:name:String 名称
// @return FRsMaterial 材质
//==========================================================
function FRs3ThemeConsole_find(p){
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
function FRs3ThemeConsole_select(p){
   var o = this;
   // 获得主题
   var r = o._themes.get(p);
   if(r == null){
      // 生成地址
      var u = RBrowser.contentPath(o._path + p + '.ser');
      // 创建主题
      r = RClass.create(FRs3Theme);
      r.load(u);
      o._themes.set(p, r);
   }
   // 激活主题
   o._activeTheme = r;
   return r;
}
