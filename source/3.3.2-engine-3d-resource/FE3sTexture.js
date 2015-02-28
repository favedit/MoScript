//==========================================================
// <T>资源主题管理器。</T>
//
// @author maocy
// @history 150108
//==========================================================
function FE3sTexture(o){
   o = RClass.inherits(this, o, FConsole);
   //..........................................................
   // @attribute
   o._themes   = null;
   o._path     = '/assets/theme/'
   //..........................................................
   // @method
   o.construct = FE3sTexture_construct;
   o.load      = FE3sTexture_load;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3sTexture_construct(){
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
function FE3sTexture_load(p){
   var o = this;
   var r = o._themes.get(p);
   if(r == null){
      // 生成地址
      var u = RBrowser.contentPath(o._path + p + '.ser');
      // 创建主题
      r = RClass.create(FE3sTheme);
      r.load(u);
      o._themes.set(p, r);
   }
   return r;
}
