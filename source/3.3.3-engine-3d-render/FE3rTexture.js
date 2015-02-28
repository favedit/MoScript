//==========================================================
// <T>渲染几何体。</T>
//
// @author maocy
// @history 150106
//==========================================================
function FE3rTexture(o){
   o = RClass.inherits(this, o, FObject, MGraphicObject);
   //..........................................................
   // @attribute
   o._ready    = false;
   o._image    = null;
   o._texture  = null;
   //..........................................................
   o.onLoad    = FE3rTexture_onLoad;
   //..........................................................
   // @method
   o.construct = FE3rTexture_construct;
   // @method
   o.image     = FE3rTexture_image;
   o.texture   = FE3rTexture_texture;
   // @method
   o.testReady = FE3rTexture_testReady;
   o.load      = FE3rTexture_load;
   // @method
   o.dispose   = FE3rTexture_dispose;
   return o;
}

//==========================================================
// <T>数据加载处理。</T>
//
// @param p:region:FRegion 区域
// @return Boolean 是否可见
//==========================================================
function FE3rTexture_onLoad(p){
   var o = this;
   var c = o._graphicContext;
   // 创建纹理
   var t = o._texture = c.createFlatTexture();
   t.upload(o._image);
   t.makeMipmap();
   // 释放位图
   o._image = RObject.dispose(o._image);
   // 加载完成
   o._ready  = true;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3rTexture_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
}

//==========================================================
// <T>获得位图。</T>
//
// @return 位图
//==========================================================
function FE3rTexture_image(){
   return this._image;
}

//==========================================================
// <T>获得纹理。</T>
//
// @return 纹理
//==========================================================
function FE3rTexture_texture(){
   return this._texture;
}

//==========================================================
// <T>测试是否准备好。</T>
//
// @return 是否准备好
//==========================================================
function FE3rTexture_testReady(){
   return this._ready;
}

//==========================================================
// <T>加载网络地址。</T>
//
// @method
// @param p:name:String 名称
//==========================================================
function FE3rTexture_load(u){
   var o = this;
   if(o._image){
      throw new TError('Loading image.');
   }
   var g = o._image = RClass.create(FImage);
   g.addLoadListener(o, o.onLoad);
   g.loadUrl(u);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FE3rTexture_dispose(){
   var o = this;
   o._context = null;
   o._ready = false;
   o._image = RObject.dispose(o._image);
   o._texture = RObject.dispose(o._texture);
}
