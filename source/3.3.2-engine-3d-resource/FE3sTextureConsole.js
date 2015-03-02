//==========================================================
// <T>资源主题管理器。</T>
//
// @author maocy
// @history 150108
//==========================================================
function FE3sTextureConsole(o){
   o = RClass.inherits(this, o, FConsole);
   //..........................................................
   // @attribute
   o._textures = null;
   // @attribute
   o._dataUrl  = '/cloud.content.texture.wv';
   //..........................................................
   // @method
   o.construct = FE3sTextureConsole_construct;
   // @method
   o.load      = FE3sTextureConsole_load;
   // @method
   o.dispose   = FE3sModelConsole_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3sTextureConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._textures = new TDictionary();
}

//==========================================================
// <T>加载指定代码的纹理资源。</T>
//
// @param p:code:String 代码
// @return 处理结果
//==========================================================
function FE3sTextureConsole_load(p){
   var o = this;
   var s = o._textures;
   var t = s.get(p);
   if(!t){
      // 生成网络地址
      var u = RBrowser.hostPath(o._dataUrl + '?guid=' + p);
      if(RRuntime.isDebug()){
         u += '&date=' + RDate.format();
      }
      // 创建纹理资源
      t = RClass.create(FE3sTexture);
      t.load(u);
      s.set(p, t);
   }
   return t;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FE3sTextureConsole_dispose(){
   var o = this;
   o._textures = RObject.free(o._textures);
   // 父处理
   o.__base.FConsole.dispose.call(o);
}
