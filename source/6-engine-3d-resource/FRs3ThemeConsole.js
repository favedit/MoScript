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
   o._themes   = null;
   o._path     = '/assets/theme/'
   //..........................................................
   // @method
   o.construct = FRs3ThemeConsole_construct;
   o.load      = FRs3ThemeConsole_load;
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
// <T>从输入流里反序列化信息内容</T>
//
// @param p:input:FByteStream 数据流
// @return 处理结果
//==========================================================
function FRs3ThemeConsole_load(p){
   // 读取父信息
   var o = this;
   var m = o._themes.get(p);
   if(m == null){
      var u = RBrowser.contextPath() + o._path + p + '.ser';
      alert(u);
      m = RClass.create(FRs3Theme);
      m.load(u);
      o._themes.set(p, m);
   }
   return m;
}
