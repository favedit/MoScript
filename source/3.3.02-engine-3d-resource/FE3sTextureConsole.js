//==========================================================
// <T>资源纹理管理器。</T>
//
// @author maocy
// @history 150108
//==========================================================
MO.FE3sTextureConsole = function FE3sTextureConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   //..........................................................
   // @attribute
   o._textures   = null;
   //..........................................................
   // @method
   o.construct   = MO.FE3sTextureConsole_construct;
   // @method
   o.unserialize = MO.FE3sTextureConsole_unserialize;
   o.load        = MO.FE3sTextureConsole_load;
   o.loadBitmap  = MO.FE3sTextureConsole_loadBitmap;
   // @method
   o.dispose     = MO.FE3sModelConsole_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3sTextureConsole_construct = function FE3sTextureConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._textures = new MO.TDictionary();
}

//==========================================================
// <T>反序列化一个纹理。</T>
//
// @method
// @param p:input:FByteStream 输入流
// @return FE3sTexture 纹理
//==========================================================
MO.FE3sTextureConsole_unserialize = function FE3sTextureConsole_unserialize(p){
   var o = this;
   // 创建材质组
   var r = MO.Class.create(MO.FE3sTexture);
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
MO.FE3sTextureConsole_load = function FE3sTextureConsole_load(p){
   var o = this;
   // 获取纹理
   var s = o._textures;
   var r = s.get(p);
   if(r){
      return r;
   }
   //..........................................................
   // 生成地址
   var v = MO.Console.find(MO.FE3sVendorConsole).find('texture');
   var u = v.makeUrl(p);
   // 创建纹理资源
   r = MO.Class.create(MO.FE3sTexture);
   r.setGuid(p);
   r.setVendor(v);
   r.setSourceUrl(u);
   MO.Console.find(MO.FResourceConsole).load(r);
   s.set(p, r);
   return r;
}

//==========================================================
// <T>加载指定代码的纹理资源。</T>
//
// @param p:code:String 代码
// @return 处理结果
//==========================================================
MO.FE3sTextureConsole_loadBitmap = function FE3sTextureConsole_loadBitmap(pg, pc, pf){
   var o = this;
   // 生成地址
   var v = MO.Console.find(MO.FE3sVendorConsole).find('texture.bitmap');
   v.set('guid', pg);
   v.set('code', pc);
   v.set('format', pf);
   var u = v.makeUrl();
   // 加载位图
   var g = o._image = MO.Class.create(MO.FImage);
   g.loadUrl(u);
   return g;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FE3sTextureConsole_dispose = function FE3sTextureConsole_dispose(){
   var o = this;
   o._textures = MO.Lang.Object.free(o._textures);
   // 父处理
   o.__base.FConsole.dispose.call(o);
}
