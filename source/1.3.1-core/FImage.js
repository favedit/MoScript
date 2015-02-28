//==========================================================
// <T>图片。</T>
//
// @class
// @author maocy
// @history 150105
//==========================================================
function FImage(o){
   o = RClass.inherits(this, o, FObject, MListenerLoad);
   //..........................................................
   // @attribute
   o._size     = null;
   o._ready    = false;
   //..........................................................
   // @html
   o._hImage   = null;
   //..........................................................
   // @event
   o.ohLoad    = FImage_ohLoad;
   //..........................................................
   // @method
   o.construct = FImage_construct;
   // @method
   o.size      = FImage_size;
   o.image     = FImage_image;
   // @method
   o.testReady = FImage_testReady;
   o.loadUrl   = FImage_loadUrl;
   // @method
   o.dispose   = FImage_dispose;
   return o;
}

//==========================================================
// <T>加载完成处理。</T>
//
// @method
//==========================================================
function FImage_ohLoad(){
   var o = this.__linker;
   var m = o._hImage;
   o._size.set(m.naturalWidth, m.naturalHeight);
   o._ready = true;
   o.processLoadListener(o);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FImage_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._size = new SSize2();
}

//==========================================================
// <T>获得尺寸。</T>
//
// @method
// @return 尺寸
//==========================================================
function FImage_size(){
   return this._size;
}

//==========================================================
// <T>获得位图。</T>
//
// @method
// @return 位图
//==========================================================
function FImage_image(){
   return this._hImage;
}

//==========================================================
// <T>测试是否准备好。</T>
//
// @method
// @return 是否准备好
//==========================================================
function FImage_testReady(){
   return this._ready;
}

//==========================================================
// <T>加载网络地址资源。</T>
//
// @method
// @param p:url:String 网络地址
//==========================================================
function FImage_loadUrl(p){
   var o = this;
   // 创建图片
   var g = o._hImage;
   if(!g){
      g = o._hImage = new Image();
      g.__linker = o;
      g.onload = o.ohLoad;
   }
   // 加载图片
   g.src = p;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FImage_dispose(){
   var o = this;
   o._size = RObject.dispose(o._size);
   o._hImage = null;
   o.__base.FObject.dispose.call(o);
}
