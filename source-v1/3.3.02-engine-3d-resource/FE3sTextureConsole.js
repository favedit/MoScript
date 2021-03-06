//==========================================================
// <T>资源纹理管理器。</T>
//
// @author maocy
// @history 150108
//==========================================================
function FE3sTextureConsole(o){
   o = RClass.inherits(this, o, FConsole);
   //..........................................................
   // @attribute
   o._textures   = null;
   //..........................................................
   // @method
   o.construct   = FE3sTextureConsole_construct;
   // @method
   o.unserialize = FE3sTextureConsole_unserialize;
   o.load        = FE3sTextureConsole_load;
   o.loadBitmap  = FE3sTextureConsole_loadBitmap;
   // @method
   o.dispose     = FE3sModelConsole_dispose;
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
// <T>反序列化一个纹理。</T>
//
// @method
// @param p:input:FByteStream 输入流
// @return FE3sTexture 纹理
//==========================================================
function FE3sTextureConsole_unserialize(p){
   var o = this;
   // 创建材质组
   var r = RClass.create(FE3sTexture);
   r._dataReady = true;
   r.unserialize(p);
   // 存储材质组
   o._textures.set(r.guid(), r);
   return r;
}

//==========================================================
// <T>加载指定代码的纹理资源。</T>
//
// @param p:code:String 代码
// @return 处理结果
//==========================================================
function FE3sTextureConsole_load(p){
   var o = this;
   // 获取纹理
   var s = o._textures;
   var r = s.get(p);
   if(r){
      return r;
   }
   //..........................................................
   // 生成地址
   var v = RConsole.find(FE3sVendorConsole).find('texture');
   var u = v.makeUrl(p);
   // 创建纹理资源
   r = RClass.create(FE3sTexture);
   r.setGuid(p);
   r.setVendor(v);
   r.setSourceUrl(u);
   RConsole.find(FResourceConsole).load(r);
   s.set(p, r);
   return r;
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
   v.set('guid', pg);
   v.set('code', pc);
   v.set('format', pf);
   var u = v.makeUrl();
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
