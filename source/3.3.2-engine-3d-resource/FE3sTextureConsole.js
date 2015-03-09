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
   o._textures  = null;
   // @attribute
   o._dataUrl   = '/cloud.content.texture.wv';
   //..........................................................
   // @method
   o.construct  = FE3sTextureConsole_construct;
   // @method
   o.load       = FE3sTextureConsole_load;
   o.loadBitmap = FE3sTextureConsole_loadBitmap;
   // @method
   o.dispose    = FE3sModelConsole_dispose;
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
      // 生成地址
      var v = RConsole.find(FE3sVendorConsole).find('texture');
      var u = v.makeUrl(p);
      // 创建纹理资源
      t = RClass.create(FE3sTexture);
      t.setVendor(v);
      t.load(u);
      s.set(p, t);
   }
   return t;
}

//==========================================================
// <T>加载指定代码的纹理资源。</T>
//
// @param p:code:String 代码
// @return 处理结果
//==========================================================
function FE3sTextureConsole_loadBitmap(pg, pc, pf){
   var o = this;
   // 生成地址
   var v = RConsole.find(FE3sVendorConsole).find('texture.bitmap');
   var u = v.makeUrl(pg, pc, pf);
   // 加载位图
   var g = o._image = RClass.create(FImage);
   g.loadUrl(u);
   return g;
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
