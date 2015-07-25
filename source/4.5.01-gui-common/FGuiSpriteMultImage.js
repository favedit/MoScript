//==========================================================
// <T>页面对象。</T>
//
// @class
// @author sunpeng
// @version 150710
//==========================================================
MO.FGuiSpriteMultimage = function FGuiSpriteMultimage(o) {
   o = MO.Class.inherits(this, o, MO.FGuiControl);
   //..........................................................
   // @attribute
   o._sequenceImages = null;
   o._frameTime      = MO.Class.register(o, new MO.AGetSet('_frameTime'));
   // @attribute
   o._ready          = MO.Class.register(o, new MO.AGetSet('_ready'), false);
   o._imageCount     = 0;
   o._imageToLoad    = 0;
   o._lastTick       = 0;
   o._currentFrame   = 0;
   //..........................................................
   // @method
   //o.play = FGuiSpriteMultimage_play;
   //o.pause = FGuiSpriteMultimage_pause;
   //o.stop = FGuiSpriteMultimage_stop;
   // @method
   o.setup           = MO.FGuiSpriteMultimage_setup;
   o.onPaintBegin    = MO.FGuiSpriteMultimage_onPaintBegin;
   o.onImageLoad     = MO.FGuiSpriteMultimage_onImageLoad;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FGuiSpriteMultimage_setup = function FGuiSpriteMultimage_setup(sequenceImageUrl, imageCount, ext) {
   var o = this;
   o._imageCount = imageCount;
   o._imageToLoad = imageCount;
   var images = o._sequenceImages = new Array(imageCount);
   for (var i = 0; i < imageCount; i++) {
      images[i] = MO.Class.create(MO.FImage);
      images[i].addLoadListener(o, o.onImageLoad);
      images[i].loadUrl(sequenceImageUrl + i + ext);
   }
}

//==========================================================
// <T>图片加载完成后重绘。</T>
//
// @method
//==========================================================
MO.FGuiSpriteMultimage_onImageLoad = function FGuiSpriteMultimage_onImageLoad() {
   var o = this;
   if (--o._imageToLoad == 0) {
      o._ready = true;
      o._lastTick = MO.Timer.current();
      o.dirty();
   }
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FGuiSpriteMultimage_onPaintBegin = function FGuiSpriteMultimage_onPaintBegin(event) {
   var o = this;
   if (!o._ready) {
      return;
   }
   o.__base.FGuiControl.onPaintBegin.call(o, event);
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   var passedTick = MO.Timer.current() - o._lastTick;
   if (passedTick > o._frameTime) {
      if (++o._currentFrame > o._imageCount - 1) {
         o._currentFrame = 0;
      }
      o._lastTick = MO.Timer.current();
   }
   graphic._handle.drawImage(o._sequenceImages[o._currentFrame].image(), rectangle.left, rectangle.top, rectangle.width, rectangle.height);
}
