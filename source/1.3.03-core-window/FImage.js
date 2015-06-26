with(MO){
   //==========================================================
   // <T>图片。</T>
   //
   // @class
   // @author maocy
   // @history 150105
   //==========================================================
   MO.FImage = function FImage(o){
      o = RClass.inherits(this, o, FObject, MListenerLoad);
      //..........................................................
      // @attribute
      o._optionAlpha   = RClass.register(o, new AGetter('_optionAlpha'), true);
      o._ready         = false;
      o._size          = RClass.register(o, new AGetter('_size'));
      o._url           = RClass.register(o, new AGetter('_url'));
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
      o.image          = FImage_image;
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
   MO.FImage_ohLoad = function FImage_ohLoad(){
      var o = this.__linker;
      var hImage = o._hImage;
      o._size.set(hImage.naturalWidth, hImage.naturalHeight);
      o._ready = true;
      // 处理加载事件
      var event = new SEvent(o);
      o.processLoadListener(event);
      event.dispose();
   }

   //==========================================================
   // <T>加载完成处理。</T>
   //
   // @method
   //==========================================================
   MO.FImage_ohError = function FImage_ohError(p){
      var o = this.__linker;
      var url = o._url;
      MO.Logger.error(o, 'Load image failure. (url={1})', url);
      //debugger;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FImage_construct = function FImage_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
      o._size = new SSize2();
   }

   //==========================================================
   // <T>获得位图。</T>
   //
   // @method
   // @return 位图
   //==========================================================
   MO.FImage_image = function FImage_image(){
      return this._hImage;
   }

   //==========================================================
   // <T>测试是否准备好。</T>
   //
   // @method
   // @return 是否准备好
   //==========================================================
   MO.FImage_testReady = function FImage_testReady(){
      return this._ready;
   }

   //==========================================================
   // <T>加载网络地址资源。</T>
   //
   // @method
   // @param p:url:String 网络地址
   //==========================================================
   MO.FImage_loadUrl = function FImage_loadUrl(url){
      var o = this;
      o._url = url;
      // 创建图片
      var hImage = o._hImage;
      if(!hImage){
         hImage = o._hImage = new Image();
         hImage.__linker = o;
         hImage.onload = o.ohLoad;
         hImage.onerror = o.ohError;
      }
      // 加载图片
      hImage.src = url;
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FImage_dispose = function FImage_dispose(){
      var o = this;
      // 清空属性
      o._size = RObject.dispose(o._size);
      o._hImage = RHtml.free(o._hImage);
      // 父处理
      o.__base.MListenerLoad.dispose.call(o);
      o.__base.FObject.dispose.call(o);
   }
}
