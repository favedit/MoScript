//==========================================================
// <T>图片。</T>
//
// @author maocy
// @history 150105
//==========================================================
function FImage(o){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   // @attribute
   o._image    = null;
   o._width    = 0;
   o._height   = 0;
   o._ready    = false;
   //..........................................................
   // @event
   o.lsnsLoad  = null;
   //..........................................................
   // @event
   o.ohLoad    = FImage_ohLoad;
   //..........................................................
   // @method
   o.construct = FImage_construct;
   o.testReady = FImage_testReady;
   o.image     = FImage_image;
   o.loadUrl   = FImage_loadUrl;
   o.dispose   = FImage_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FImage_construct(){
   var o = this;
   o.lsnsLoad = new TListeners();
}

//==========================================================
// <T>加载完成处理。</T>
//
// @method
//==========================================================
function FImage_ohLoad(){
   var o = this._linker;
   o._ready = true;
   o._width = o._image.naturalWidth;
   o._height = o._image.naturalHeight;
   o.lsnsLoad.process(o);
}

//==========================================================
// <T>测试是否准备好。</T>
//
// @return 是否准备好
//==========================================================
function FImage_testReady(){
   return this._ready;
}

//==========================================================
// <T>获得位图。</T>
//
// @return 位图
//==========================================================
function FImage_image(){
   return this._image;
}

//==========================================================
// <T>加载网络地址资源。</T>
//
// @param u:url:String 网络地址
//==========================================================
function FImage_loadUrl(u){
   var o = this;
   // 创建图片
   var g = o._image;
   if(g == null){
      g = o._image = new Image();
      g._linker = o;
      g.onload = o.ohLoad;
   }
   // 加载图片
   g.src = u;
}

//==========================================================
// <T>释放处理。</T>
//
// @author maocy
//==========================================================
function FImage_dispose(){
   var o = this;
   o._image = null;
   o.__base.FObject.dispose.call(o);
}
