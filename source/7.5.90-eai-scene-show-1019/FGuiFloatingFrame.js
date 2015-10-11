//==========================================================
// <T>里程碑实体类。</T>
//
// @class
// @author sunpeng
// @history 151011
//==========================================================
MO.FGuiFloatingFrame = function FGuiFloatingFrame(o) {
   o = MO.Class.inherits(this, o, MO.FGuiControl);
   //..........................................................
   // @attribute
   o._frameImage = null;
   o._displayImage = null;

   o._ready = false;
   o._imageCount = 2;

   o._startRotateY = 0;
   o._endRotateY = 0;
   // @attribute
   o._data = MO.Class.register(o, new MO.AGetSet('_data'));
   //..........................................................
   // @method
   o.setup = MO.FGuiFloatingFrame_setup;
   o.onPaintBegin = MO.FGuiFloatingFrame_onPaintBegin;
   o.onImageLoad = MO.FGuiFloatingFrame_onImageLoad;
   o.floatingAnime = MO.FGuiFloatingFrame_floatingAnime;
   // @method
   o.dispose = MO.FGuiFloatingFrame_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FGuiFloatingFrame_setup = function FGuiFloatingFrame_setup(data) {
   var o = this;
   o._data = data;
   o._frameImage = MO.Class.create(MO.FImage);
   o._frameImage.addLoadListener(o, o.onImageLoad);
   o._frameImage.loadUrl('{eai.resource}/show1019/frame.png');
   o._displayImage = MO.Class.create(MO.FImage);
   o._displayImage.addLoadListener(o, o.onImageLoad);
   o._displayImage.loadUrl(data.displayImageUrl);

   o._startRotateY = data.latitude * (Math.PI / 180);
   
}

//==========================================================
// <T>图片加载完成后重绘。</T>
//
// @method
//==========================================================
MO.FGuiFloatingFrame_onImageLoad = function FGuiFloatingFrame_onImageLoad() {
   var o = this;
   if (--o._imageCount == 0) {
      o._ready = true;
   }
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FGuiFloatingFrame_onPaintBegin = function FGuiFloatingFrame_onPaintBegin(event) {
   var o = this;
   if (!o._ready) {
      return;
   }

   o.__base.FGuiControl.onPaintBegin.call(o, event);
   var graphic = event.graphic;
   var rectangle = o._clientRectangle;

   var hCenter = rectangle.left + rectangle.width / 2;

   var displaySize = o._displayImage.size();
   var frameSize = o._frameImage.size();

   graphic.drawImage(o._displayImage, rectangle.left, rectangle.top, rectangle.width, rectangle.height);

   //graphic.drawImage(o._displayImage, hCenter - displaySize.width / 2, rectangle.top + 60, displaySize.width, displaySize.height);
   //graphic.drawImage(o._frameImage, hCenter - frameSize.width / 2, rectangle.top, frameSize.width, frameSize.height);

}

//==========================================================
// <T>显示。</T>
//
// @method
//==========================================================
MO.FGuiFloatingFrame_floatingAnime = function FGuiFloatingFrame_floatingAnime(radianY) {
   o = this;
   //var t = 0;
   //if (o._startRotateY < 0 && radianY < 0) {
   //   if (radianY < o._startRotateY) {
   //      t = (radianY - o._startRotateY) / Math.PI;
   //      o.setVisible(true);
   //   }
   //   else {
   //      o.setVisible(false);
   //   }
   //}
   //else if (o._startRotateY >= 0 && radianY >= 0) {
   //   if (radianY < o._startRotateY) {
   //      t = (o._startRotateY - radianY) / Math.PI;
   //      o.setVisible(true);
   //   }
   //   else {
   //      o.setVisible(false);
   //   }
   //}
   //else if (o._startRotateY >= 0 && radianY < 0) {
   //   if (radianY > o._startRotateY - Math.PI) {
   //      t = (o._startRotateY - radianY) / Math.PI;
   //      o.setVisible(true);
   //   }
   //   else {
   //      o.setVisible(false);
   //   }
   //}
   //else if (o._startRotateY < 0 && radianY >= 0) {
   //   if (radianY < o._startRotateY + Math.PI) {
   //      t = (radianY - o._startRotateY) / Math.PI;
   //      o.setVisible(true);
   //   }
   //   else {
   //      o.setVisible(false);
   //   }
   //}
   //else {
   //   o.setVisible(false);
   //}

   //var data = o._data;
   //var startX = data.startX;
   //var startY = data.startY;
   //var endX = data.endX;
   //var endY = data.endY;

   ////var scale = 0.0;

   ////o.setScale(scale);

   //var x = (endX - startX) * t;
   //var y = endY;
   //o.setLocation(x, y);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FGuiFloatingFrame_dispose = function FGuiFloatingFrame_dispose() {
   var o = this;
   o.__base.FGuiControl.dispose.call(o);
}

