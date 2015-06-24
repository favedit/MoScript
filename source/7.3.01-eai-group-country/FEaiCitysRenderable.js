with(MO){
   //==========================================================
   // <T>渲染城市集合。</T>
   //
   // @class
   // @author maocy
   // @history 150622
   //==========================================================
   MO.FEaiCitysRenderable = function FEaiCitysRenderable(o){
      o = RClass.inherits(this, o, FE3dRenderable);
      //..........................................................
      // @attribute
      o._ready                = false;
      o._image                = null;
      o._levelScale           = null;
      // @attribute
      o._citys                = RClass.register(o, new AGetter('_citys'));
      o._level                = RClass.register(o, new AGetSet('_level'));
      o._size                 = RClass.register(o, new AGetter('_size'));
      o._adjustSize           = RClass.register(o, new AGetter('_adjustSize'));
      o._citySize             = RClass.register(o, new AGetter('_citySize'));
      // @attribute
      o._vertexPositionBuffer = null;
      o._vertexCoordBuffer    = null;
      o._indexBuffer          = null;
      o._texture              = null;
      //..........................................................
      // @event
      o.onImageLoad           = FEaiCitysRenderable_onImageLoad;
      //..........................................................
      // @method
      o.construct             = FEaiCitysRenderable_construct;
      // @method
      o.testReady             = FEaiCitysRenderable_testReady;
      // @method
      o.setup                 = FEaiCitysRenderable_setup;
      o.upload                = FEaiCitysRenderable_upload;
      o.loadUrl               = FEaiCitysRenderable_loadUrl;
      // @method
      o.dispose               = FEaiCitysRenderable_dispose;
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiCitysRenderable_onImageLoad = function FEaiCitysRenderable_onImageLoad(event){
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
      context2d.drawImage(image, 0, 0, width, height);
      // 创建纹理
      o._texture.upload(canvas);
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
   MO.FEaiCitysRenderable_construct = function FEaiCitysRenderable_construct(){
      var o = this;
      o.__base.FE3dRenderable.construct.call(o);
      // 设置属性
      o._citys = new TObjects();
      o._size = new SSize2();
      o._adjustSize = new SSize2();
      o._material = RClass.create(FE3dMaterial);
      var scale = o._levelScale = new Object();
      scale[1] = 0.8;
      scale[2] = 0.4;
      scale[3] = 0.4;
      scale[4] = 0.2;
   }

   //==========================================================
   // <T>测试是否加载完成。</T>
   //
   // @method
   // @return 是否完成
   //==========================================================
   MO.FEaiCitysRenderable_testReady = function FEaiCitysRenderable_testReady(){
      return this._ready;
   }

   //==========================================================
   // <T>加载处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiCitysRenderable_setup = function FEaiCitysRenderable_setup(){
      var o = this;
      var context = o._graphicContext;
      // 设置顶点数量
      o._vertexCount = 4;
      // 设置顶点坐标
      var data = [0, 0, 0, 1, 0, 0, 1, -1, 0, 0, -1, 0];
      var buffer = o._vertexPositionBuffer = context.createVertexBuffer();
      buffer.setCode('position');
      buffer.setFormatCd(EG3dAttributeFormat.Float3);
      buffer.upload(data, 4 * 3, 4);
      o.pushVertexBuffer(buffer);
      // 设置顶点纹理
      var data = [0, 1, 1, 1, 1, 0, 0, 0];
      var buffer = o._vertexCoordBuffer = context.createVertexBuffer();
      buffer.setCode('coord');
      buffer.setFormatCd(EG3dAttributeFormat.Float2);
      buffer.upload(data, 4 * 2, 4);
      o.pushVertexBuffer(buffer);
      // 设置顶点颜色
      var data = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
      var buffer = o._vertexColorBuffer = context.createVertexBuffer();
      buffer.setCode('color');
      buffer.setFormatCd(EG3dAttributeFormat.Byte4Normal);
      buffer.upload(data, 1 * 4, 4);
      o.pushVertexBuffer(buffer);
      // 设置索引数据
      var data = [0, 1, 2, 0, 2, 3];
      var buffer = o._indexBuffer = context.createIndexBuffer();
      buffer.upload(data, 6);
      o.pushIndexBuffer(buffer);
      // 创建纹理
      var texture = o._texture = context.createFlatTexture();
      texture.setOptionFlipY(true);
      texture.setWrapCd(EG3dSamplerFilter.ClampToEdge, EG3dSamplerFilter.ClampToEdge);
      o.pushTexture(texture, 'diffuse');
      // 设置材质
      var materialInfo = o._material.info();
      materialInfo.effectCode = 'control';
      materialInfo.optionAlpha = true;
      materialInfo.ambientColor.setHex('#FFFFFF');
      o._material._textures = o._textures;
      o.loadUrl('/script/ars/eai/city/' + o._level + '.png');
   }

   //==========================================================
   // <T>加载处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiCitysRenderable_upload = function FEaiCitysRenderable_upload(){
      var o = this;
      var context = o._graphicContext;
      var citys = o._citys;
      var total = citys.count();
      // 计算可见数量
      var count = 0;
      for(var i = 0; i < total; i++){
         var city = citys.at(i);
         if(city.visible()){
            count++;
         }
      }
      var vertexTotal = o._vertexCount = 4 * count;
      // 设置顶点数据
      var vertexCount = 4 * count;
      var vertexPosition = 0;
      var vertexData = new Float32Array(3 * vertexCount);
      var coordPosition = 0;
      var coordData = new Float32Array(2 * vertexCount);
      var colorPosition = 0;
      var colorData = new Uint8Array(4 * vertexCount);
      for(var i = 0; i < total; i++){
         var city = citys.at(i);
         if(city.visible()){
            var location = city.location();
            var scale = o._levelScale[o._level];
            // 设置顶点位置
            vertexData[vertexPosition++] = location.x - scale;
            vertexData[vertexPosition++] = location.y + scale;
            vertexData[vertexPosition++] = 0;
            vertexData[vertexPosition++] = location.x + scale;
            vertexData[vertexPosition++] = location.y + scale;
            vertexData[vertexPosition++] = 0;
            vertexData[vertexPosition++] = location.x + scale;
            vertexData[vertexPosition++] = location.y - scale;
            vertexData[vertexPosition++] = 0;
            vertexData[vertexPosition++] = location.x - scale;
            vertexData[vertexPosition++] = location.y - scale;
            vertexData[vertexPosition++] = 0;
            // 设置顶点纹理
            coordData[coordPosition++] = 0;
            coordData[coordPosition++] = 1;
            coordData[coordPosition++] = 1;
            coordData[coordPosition++] = 1;
            coordData[coordPosition++] = 1;
            coordData[coordPosition++] = 0;
            coordData[coordPosition++] = 0;
            coordData[coordPosition++] = 0;
            // 设置顶点颜色
            for(var v = 0; v < 4; v++){
               colorData[colorPosition++] = 255;
               colorData[colorPosition++] = 255;
               colorData[colorPosition++] = 255;
               colorData[colorPosition++] = 255;
            }
         }
      }
      o._vertexPositionBuffer.upload(vertexData, 4 * 3, vertexCount);
      o._vertexCoordBuffer.upload(coordData, 4 * 2, vertexCount);
      o._vertexColorBuffer.upload(colorData, 1 * 4, vertexCount);
      // 设置索引数据
      var n = 0;
      var indexCount = 3 * 2 * count;
      var indexData = new Uint16Array(indexCount);
      for(var i = 0; i < total; i++){
         var city = citys.at(i);
         var index = 4 * i;
         if(city.visible()){
            indexData[n++] = index + 0;
            indexData[n++] = index + 1;
            indexData[n++] = index + 2;
            indexData[n++] = index + 0;
            indexData[n++] = index + 2;
            indexData[n++] = index + 3;
         }
      }
      o._indexBuffer.upload(indexData, indexCount);
   }

   //==========================================================
   // <T>加载处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiCitysRenderable_loadUrl = function FEaiCitysRenderable_loadUrl(url){
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
   MO.FEaiCitysRenderable_dispose = function FEaiCitysRenderable_dispose(){
      var o = this;
      // 释放属性
      o._size = RObject.dispose(o._size);
      o._adjustSize = RObject.dispose(o._adjustSize);
      o._texture = RObject.dispose(o._texture);
      // 释放属性
      o._vertexPositionBuffer = RObject.dispose(o._vertexPositionBuffer);
      o._vertexCoordBuffer = RObject.dispose(o._vertexCoordBuffer);
      o._indexBuffer = RObject.dispose(o._indexBuffer);
      // 父处理
      o.__base.FE3dRenderable.dispose.call(o);
   }
}
