with(MO){
   //==========================================================
   // <T>渲染城市集合。</T>
   //
   // @class
   // @author maocy
   // @history 150622
   //==========================================================
   MO.FEaiCitysRangeRenderable = function FEaiCitysRangeRenderable(o){
      o = RClass.inherits(this, o, FE3dRenderable);
      //..........................................................
      // @attribute
      o._ready                = false;
      o._image                = null;
      // @attribute
      o._citys                = RClass.register(o, new AGetter('_citys'));
      o._citySize             = RClass.register(o, new AGetter('_citySize'));
      // @attribute
      o._vertexPositionBuffer = null;
      o._vertexColorBuffer    = null;
      o._vertexCoordBuffer    = null;
      o._indexBuffer          = null;
      o._texture              = null;
      //..........................................................
      // @event
      o.onImageLoad           = FEaiCitysRangeRenderable_onImageLoad;
      //..........................................................
      // @method
      o.construct             = FEaiCitysRangeRenderable_construct;
      // @method
      o.testReady             = FEaiCitysRangeRenderable_testReady;
      // @method
      o.setup                 = FEaiCitysRangeRenderable_setup;
      o.upload                = FEaiCitysRangeRenderable_upload;
      o.loadUrl               = FEaiCitysRangeRenderable_loadUrl;
      // @method
      o.dispose               = FEaiCitysRangeRenderable_dispose;
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiCitysRangeRenderable_onImageLoad = function FEaiCitysRangeRenderable_onImageLoad(event){
      var o = this;
      var image = event.sender;
      // 创建纹理
      o._texture.upload(image);
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
   MO.FEaiCitysRangeRenderable_construct = function FEaiCitysRangeRenderable_construct(){
      var o = this;
      o.__base.FE3dRenderable.construct.call(o);
      // 设置属性
      o._citys = new TObjects();
      o._material = RClass.create(FE3dMaterial);
   }

   //==========================================================
   // <T>测试是否加载完成。</T>
   //
   // @method
   // @return 是否完成
   //==========================================================
   MO.FEaiCitysRangeRenderable_testReady = function FEaiCitysRangeRenderable_testReady(){
      return this._ready;
   }

   //==========================================================
   // <T>加载处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiCitysRangeRenderable_setup = function FEaiCitysRangeRenderable_setup(){
      var o = this;
      var context = o._graphicContext;
      // 设置顶点数量
      var citys = o._citys;
      var count = citys.count();
      var vertexCount = o._vertexCount = 4 * count;
      // 设置顶点坐标
      var buffer = o._vertexPositionBuffer = context.createVertexBuffer();
      buffer.setCode('position');
      buffer.setFormatCd(EG3dAttributeFormat.Float3);
      o.pushVertexBuffer(buffer);
      // 设置顶点纹理
      var position = 0;
      var data = new Float32Array(2 * vertexCount);
      for(var i = 0; i < count; i++){
         data[position++] = 0;
         data[position++] = 1;
         data[position++] = 1;
         data[position++] = 1;
         data[position++] = 1;
         data[position++] = 0;
         data[position++] = 0;
         data[position++] = 0;
      }
      var buffer = o._vertexCoordBuffer = context.createVertexBuffer();
      buffer.setCode('coord');
      buffer.setFormatCd(EG3dAttributeFormat.Float2);
      buffer.upload(data, 4 * 2, vertexCount);
      o.pushVertexBuffer(buffer);
      // 设置顶点颜色
      var buffer = o._vertexColorBuffer = context.createVertexBuffer();
      buffer.setCode('color');
      buffer.setFormatCd(EG3dAttributeFormat.Byte4Normal);
      o.pushVertexBuffer(buffer);
      //..........................................................
      // 设置索引数据
      var indexCount = 3 * 2 * count;
      var position = 0;
      var data = new Uint16Array(indexCount);
      for(var i = 0; i < count; i++){
         var index = 4 * i;
         data[position++] = index + 0;
         data[position++] = index + 1;
         data[position++] = index + 2;
         data[position++] = index + 0;
         data[position++] = index + 2;
         data[position++] = index + 3;
      }
      var buffer = o._indexBuffer = context.createIndexBuffer();
      buffer.upload(data, indexCount);
      o.pushIndexBuffer(buffer);
      //..........................................................
      // 创建纹理
      var texture = o._texture = context.createFlatTexture();
      texture.setOptionFlipY(true);
      texture.setWrapCd(EG3dSamplerFilter.ClampToEdge, EG3dSamplerFilter.ClampToEdge);
      o.pushTexture(texture, 'diffuse');
      // 设置材质
      var materialInfo = o._material.info();
      materialInfo.effectCode = 'eai.citys.range';
      materialInfo.optionAlpha = true;
      o._material._textures = o._textures;
      o.loadUrl('/script/ars/eai/dot.png');
   }

   //==========================================================
   // <T>加载处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiCitysRangeRenderable_upload = function FEaiCitysRangeRenderable_upload(){
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
      var vertexCount = o._vertexCount = 4 * count;
      // 设置顶点数据
      var vertexPosition = 0;
      var vertexData = new Float32Array(3 * vertexCount);
      var colorPosition = 0;
      var colorData = new Uint8Array(4 * vertexCount);
      for(var i = 0; i < total; i++){
         var city = citys.at(i);
         if(city.visible()){
            var location = city.location();
            var range = city.range();
            var size = city.size();
            var width = size.width / 2;
            var height = size.height / 2;
            // 设置顶点位置
            vertexData[vertexPosition++] = location.x - range;
            vertexData[vertexPosition++] = location.y + range;
            vertexData[vertexPosition++] = 0;
            vertexData[vertexPosition++] = location.x + range;
            vertexData[vertexPosition++] = location.y + range;
            vertexData[vertexPosition++] = 0;
            vertexData[vertexPosition++] = location.x + range;
            vertexData[vertexPosition++] = location.y - range;
            vertexData[vertexPosition++] = 0;
            vertexData[vertexPosition++] = location.x - range;
            vertexData[vertexPosition++] = location.y - range;
            vertexData[vertexPosition++] = 0;
            // 设置顶点颜色
            var color = city.rangeColor();
            var red = parseInt(color.red * 255);
            var green = parseInt(color.green * 255);
            var blue = parseInt(color.blue * 255);
            var alpha = parseInt(color.alpha * 255);
            for(var v = 0; v < 4; v++){
               colorData[colorPosition++] = red;
               colorData[colorPosition++] = green;
               colorData[colorPosition++] = blue;
               colorData[colorPosition++] = alpha;
            }
         }
      }
      o._vertexPositionBuffer.upload(vertexData, 4 * 3, vertexCount);
      o._vertexColorBuffer.upload(colorData, 1 * 4, vertexCount);
      // 设置索引数据
      o._indexBuffer.setCount(3 * 2 * count);
   }

   //==========================================================
   // <T>加载处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiCitysRangeRenderable_loadUrl = function FEaiCitysRangeRenderable_loadUrl(url){
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
   MO.FEaiCitysRangeRenderable_dispose = function FEaiCitysRangeRenderable_dispose(){
      var o = this;
      // 释放属性
      o._texture = RObject.dispose(o._texture);
      // 释放属性
      o._vertexPositionBuffer = RObject.dispose(o._vertexPositionBuffer);
      o._vertexCoordBuffer = RObject.dispose(o._vertexCoordBuffer);
      o._indexBuffer = RObject.dispose(o._indexBuffer);
      // 父处理
      o.__base.FE3dRenderable.dispose.call(o);
   }
}
