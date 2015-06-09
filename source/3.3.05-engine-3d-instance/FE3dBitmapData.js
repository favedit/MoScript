with(MO){
   //==========================================================
   // <T>渲染模型网格。</T>
   //
   // @author maocy
   // @history 150106
   //==========================================================
   MO.FE3dBitmapData = function FE3dBitmapData(o){
      o = RClass.inherits(this, o, FE3dRenderable);
      //..........................................................
      // @attribute
      o._ready            = false;
      // @attribute
      o._image            = null;
      o._imageTexture     = null;
      o._size             = RClass.register(o, new AGetter('_size'));
      o._adjustSize       = RClass.register(o, new AGetter('_adjustSize'));
      //..........................................................
      // @event
      o.onImageLoad       = FE3dBitmapData_onImageLoad;
      //..........................................................
      // @method
      o.construct         = FE3dBitmapData_construct;
      // @method
      o.testReady         = FE3dBitmapData_testReady;
      // @method
      o.setup             = FE3dBitmapData_setup;
      o.loadUrl           = FE3dBitmapData_loadUrl;
      // @method
      o.dispose           = FE3dBitmapData_dispose;
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
      var adjustWidth = RInteger.pow2(width);
      var adjustHeight = RInteger.pow2(height);
      o._adjustSize.set(adjustWidth, adjustHeight);
      // 绘制画板
      var canvasConsole = RConsole.find(FE2dCanvasConsole);
      var canvas = canvasConsole.allocBySize(adjustWidth, adjustHeight);
      var context2d = canvas.context();
      context2d.drawImage(image, 0, 0);
      // 创建纹理
      o._imageTexture.upload(canvas);
      // 释放画板
      canvasConsole.free(canvas);
      // 释放位图
      image.dispose();
      // 设置属性
      o._ready = true;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FE3dBitmapData_construct = function FE3dBitmapData_construct(){
      var o = this;
      o.__base.FE3dRenderable.construct.call(o);
      // 设置属性
      o._size = new SSize2();
      o._adjustSize = new SSize2();
      o._vertexBuffers = new TDictionary();
      o._textures = new TDictionary();
   }

   //==========================================================
   // <T>测试是否加载完成。</T>
   //
   // @method
   // @return 是否完成
   //==========================================================
   MO.FE3dBitmapData_testReady = function FE3dBitmapData_testReady(){
      return this._ready;
   }

   //==========================================================
   // <T>加载处理。</T>
   //
   // @method
   //==========================================================
   MO.FE3dBitmapData_setup = function FE3dBitmapData_setup(){
      var o = this;
      var context = o._graphicContext;
      // 设置顶点数据
      var data = [
         0,  0, 0,
         1,  0, 0,
         1, -1, 0,
         0, -1, 0 ];
      var buffer = o._vertexPositionBuffer = context.createVertexBuffer();
      buffer.setCode('position');
      buffer.setFormatCd(EG3dAttributeFormat.Float3);
      buffer.upload(data, 4 * 3, 4);
      o.pushVertexBuffer(buffer);
      // 设置纹理数据
      var data = [
         0, 1,
         1, 1,
         1, 0,
         0, 0];
      var buffer = o._vertexColorBuffer = context.createVertexBuffer();
      buffer.setCode('coord');
      buffer.setFormatCd(EG3dAttributeFormat.Float2);
      buffer.upload(data, 4 * 2, 4);
      o.pushVertexBuffer(buffer);
      // 设置索引数据
      var data = [0, 1, 2, 0, 2, 3];
      var buffer = context.createIndexBuffer();
      buffer.upload(data, 6);
      o.pushIndexBuffer(buffer);
      // 创建纹理
      var texture = o._imageTexture = context.createFlatTexture();
      texture.setOptionFlipY(true);
      o._textures.set('diffuse', texture);
   }

   //==========================================================
   // <T>加载处理。</T>
   //
   // @method
   //==========================================================
   MO.FE3dBitmapData_loadUrl = function FE3dBitmapData_loadUrl(url){
      var o = this;
      // 加载图片
      var image = RClass.create(FImage);
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
      // 释放属性
      o._size = RObject.dispose(o._size);
      o._adjustSize = RObject.dispose(o._adjustSize);
      o._vertexBuffers = RObject.dispose(o._vertexBuffers);
      o._indexBuffer = RObject.dispose(o._indexBuffer);
      o._imageTexture = RObject.dispose(o._imageTexture);
      o._textures = RObject.dispose(o._textures);
      // 父处理
      o.__base.FE3dRenderable.dispose.call(o);
   }
}
