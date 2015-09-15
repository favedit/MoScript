//==========================================================
// <T>引擎位图数据。</T>
//
// @class
// @author maocy
// @history 150610
//==========================================================
MO.FE3dBitmapData = function FE3dBitmapData(o){
   o = MO.Class.inherits(this, o, MO.FE3dFaceData, MO.MListener);
   //..........................................................
   // @attribute
   o._image      = null;
   o._listenersImageLoad = MO.Class.register(o, new MO.AListener('_listenersImageLoad'));
   //..........................................................
   // @event
   o.onImageLoad = MO.FE3dBitmapData_onImageLoad;
   //..........................................................
   // @method
   o.construct   = MO.FE3dBitmapData_construct;
   // @method
   o.loadUrl     = MO.FE3dBitmapData_loadUrl;
   // @method
   o.dispose     = MO.FE3dBitmapData_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3dBitmapData_onImageLoad = function FE3dBitmapData_onImageLoad(event){
   var o = this;
   var context = o._graphicContext;
   var image = event.sender;
   // 设置大小
   var size = image.size();
   var width = size.width;
   var height = size.height;
   o._size.set(width, height);
   var adjustWidth = MO.Lang.Integer.pow2(width);
   var adjustHeight = MO.Lang.Integer.pow2(height);
   o._adjustSize.set(adjustWidth, adjustHeight);
   var texture = o._texture;
   if((adjustWidth == width) && (adjustHeight == height)){
      // 上传纹理
      texture.upload(image);
      //texture.setOptionFlipY(false);
   }else{
      // 绘制画板
      var canvasConsole = MO.Console.find(MO.FE2dCanvasConsole);
      var canvas = canvasConsole.allocBySize(adjustWidth, adjustHeight);
      var context2d = canvas.graphicContext();
      context2d.drawImage(image, 0, 0, width, height);
      // 创建纹理
      texture.upload(canvas);
      //texture.setOptionFlipY(false);
      // 释放画板
      canvasConsole.free(canvas);
   }
   // 释放位图
   image.dispose();
   // 设置属性
   o._ready = true;
   o.processImageLoadListener(o);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3dBitmapData_construct = function FE3dBitmapData_construct(){
   var o = this;
   o.__base.FE3dFaceData.construct.call(o);
}

//==========================================================
// <T>加载处理。</T>
//
// @method
//==========================================================
MO.FE3dBitmapData_loadUrl = function FE3dBitmapData_loadUrl(url){
   var o = this;
   // 加载图片
   var image = MO.Class.create(MO.FImage);
   image.addLoadListener(o, o.onImageLoad);
   image.loadUrl(url);
   // 设置属性
   o._ready = false;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FE3dBitmapData_dispose = function FE3dBitmapData_dispose(){
   var o = this;
   // 父处理
   o.__base.FE3dFaceData.dispose.call(o);
}
