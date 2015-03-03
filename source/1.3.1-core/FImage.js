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
   o._optionAlpha   = true;
   o._ready         = false;
   o._size          = null;
   o._url           = null;
   //..........................................................
   // @html
   o._hImage        = null;
   //..........................................................
   // @event
   o.ohLoad         = FImage_ohLoad;
   o.ohError        = FImage_ohError;
   //..........................................................
   // @method
   o.construct      = FImage_construct;
   // @method
   o.optionAlpha    = FImage_optionAlpha;
   o.setOptionAlpha = FImage_setOptionAlpha;
   o.size           = FImage_size;
   o.image          = FImage_image;
   o.url            = FImage_url;
   // @method
   o.testReady      = FImage_testReady;
   o.loadUrl        = FImage_loadUrl;
   // @method
   o.dispose        = FImage_dispose;
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
// <T>加载完成处理。</T>
//
// @method
//==========================================================
function FImage_ohError(p){
   var o = this.__linker;
   debugger;
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
// <T>获得透明配置。</T>
//
// @method
// @return Boolean 透明配置
//==========================================================
function FImage_optionAlpha(){
   return this._optionAlpha;
}

//==========================================================
// <T>设置透明配置。</T>
//
// @method
// @param p:alpha:Boolean 透明配置
//==========================================================
function FImage_setOptionAlpha(p){
   this._optionAlpha = p;
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
// <T>获得网络地址。</T>
//
// @method
// @return 网络地址
//==========================================================
function FImage_url(){
   return this._url;
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
   o._url = p;
   // 创建图片
   var g = o._hImage;
   if(!g){
      g = o._hImage = new Image();
      g.__linker = o;
      g.onload = o.ohLoad;
      g.onerror = o.ohError;
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
   // 清空属性
   o._size = RObject.dispose(o._size);
   o._hImage = RHtml.free(o._hImage);
   // 父处理
   o.__base.MListenerLoad.dispose.call(o);
   o.__base.FObject.dispose.call(o);
}
