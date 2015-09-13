//==========================================================
// <T>渲染城市集合。</T>
//
// @class
// @author maocy
// @history 150622
//==========================================================
MO.FEaiCitysRange3dRenderable = function FEaiCitysRange3dRenderable(o){
   o = MO.Class.inherits(this, o, MO.FE3dRenderable);
   //..........................................................
   // @attribute
   o._ready                = false;
   o._image                = null;
   // @attribute
   o._citys                = MO.Class.register(o, new MO.AGetter('_citys'));
   o._citySize             = MO.Class.register(o, new MO.AGetter('_citySize'));
   // @attribute
   o._vertexPositionBuffer = null;
   o._vertexColorBuffer    = null;
   o._vertexCoordBuffer    = null;
   o._indexBuffer          = null;
   o._texture              = null;
   //..........................................................
   // @event
   o.onImageLoad           = MO.FEaiCitysRange3dRenderable_onImageLoad;
   //..........................................................
   // @method
   o.construct             = MO.FEaiCitysRange3dRenderable_construct;
   // @method
   o.testReady             = MO.FEaiCitysRange3dRenderable_testReady;
   // @method
   o.setup                 = MO.FEaiCitysRange3dRenderable_setup;
   o.upload                = MO.FEaiCitysRange3dRenderable_upload;
   // @method
   o.dispose               = MO.FEaiCitysRange3dRenderable_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCitysRange3dRenderable_onImageLoad = function FEaiCitysRange3dRenderable_onImageLoad(event){
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
MO.FEaiCitysRange3dRenderable_construct = function FEaiCitysRange3dRenderable_construct(){
   var o = this;
   o.__base.FE3dRenderable.construct.call(o);
   // 设置属性
   o._citys = new MO.TObjects();
   o._material = MO.Class.create(MO.FE3dMaterial);
}

//==========================================================
// <T>测试是否加载完成。</T>
//
// @method
// @return 是否完成
//==========================================================
MO.FEaiCitysRange3dRenderable_testReady = function FEaiCitysRange3dRenderable_testReady(){
   return this._ready;
}

//==========================================================
// <T>加载处理。</T>
//
// @method
//==========================================================
MO.FEaiCitysRange3dRenderable_setup = function FEaiCitysRange3dRenderable_setup(){
   var o = this;
   var context = o._graphicContext;
   // 设置顶点数量
   var citys = o._citys;
   var count = citys.count();
   var vertexCount = o._vertexCount = 4 * count;
   // 设置顶点坐标
   var buffer = o._vertexPositionBuffer = context.createVertexBuffer();
   buffer.setCode('position');
   buffer.setFormatCd(MO.EG3dAttributeFormat.Float3);
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
   buffer.setFormatCd(MO.EG3dAttributeFormat.Float2);
   buffer.upload(data, 4 * 2, vertexCount);
   o.pushVertexBuffer(buffer);
   // 设置顶点颜色
   var buffer = o._vertexColorBuffer = context.createVertexBuffer();
   buffer.setCode('color');
   buffer.setFormatCd(MO.EG3dAttributeFormat.Byte4Normal);
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
   texture.setWrapCd(MO.EG3dSamplerFilter.ClampToEdge, MO.EG3dSamplerFilter.ClampToEdge);
   o.pushTexture(texture, 'diffuse');
   // 设置材质
   var materialInfo = o._material.info();
   materialInfo.effectCode = 'eai.citys.range';
   materialInfo.optionAlpha = true;
   materialInfo.optionDepth = false;
   materialInfo.optionDouble = false;
   o._material._textures = o._textures;
   // 加载图片
   var image = MO.Class.create(MO.FImage);
   image.addLoadListener(o, o.onImageLoad);
   image.loadUrl('{eai.resource}/dot.png');
   // 设置属性
   o._ready = false;
}

//==========================================================
// <T>加载处理。</T>
//
// @method
//==========================================================
MO.FEaiCitysRange3dRenderable_upload = function FEaiCitysRange3dRenderable_upload(){
   var o = this;
   var context = o._graphicContext;
   var scaleZoom = 1;
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
         var provinceEntity = city.provinceEntity();
         var z = 0;
         if(provinceEntity){
            z = provinceEntity.currentZ();
         }
         // 设置顶点1位置
         var x = (location.x - range) * MO.Lang.Const.DEGREE_RATE;
         var y = (location.y + range) * MO.Lang.Const.DEGREE_RATE;
         vertexData[vertexPosition++] = Math.sin(x) * Math.cos(y) * scaleZoom;
         vertexData[vertexPosition++] = Math.sin(y) * scaleZoom;
         vertexData[vertexPosition++] = -Math.cos(x) * Math.cos(y) * scaleZoom;
         // 设置顶点2位置
         var x = (location.x + range) * MO.Lang.Const.DEGREE_RATE;
         var y = (location.y + range) * MO.Lang.Const.DEGREE_RATE;
         vertexData[vertexPosition++] = Math.sin(x) * Math.cos(y) * scaleZoom;
         vertexData[vertexPosition++] = Math.sin(y) * scaleZoom;
         vertexData[vertexPosition++] = -Math.cos(x) * Math.cos(y) * scaleZoom;
         // 设置顶点3位置
         var x = (location.x + range) * MO.Lang.Const.DEGREE_RATE;
         var y = (location.y - range) * MO.Lang.Const.DEGREE_RATE;
         vertexData[vertexPosition++] = Math.sin(x) * Math.cos(y) * scaleZoom;
         vertexData[vertexPosition++] = Math.sin(y) * scaleZoom;
         vertexData[vertexPosition++] = -Math.cos(x) * Math.cos(y) * scaleZoom;
         // 设置顶点4位置
         var x = (location.x - range) * MO.Lang.Const.DEGREE_RATE;
         var y = (location.y - range) * MO.Lang.Const.DEGREE_RATE;
         vertexData[vertexPosition++] = Math.sin(x) * Math.cos(y) * scaleZoom;
         vertexData[vertexPosition++] = Math.sin(y) * scaleZoom;
         vertexData[vertexPosition++] = -Math.cos(x) * Math.cos(y) * scaleZoom;
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
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCitysRange3dRenderable_dispose = function FEaiCitysRange3dRenderable_dispose(){
   var o = this;
   // 释放属性
   o._texture = MO.Lang.Object.dispose(o._texture);
   // 释放属性
   o._vertexPositionBuffer = MO.Lang.Object.dispose(o._vertexPositionBuffer);
   o._vertexCoordBuffer = MO.Lang.Object.dispose(o._vertexCoordBuffer);
   o._indexBuffer = MO.Lang.Object.dispose(o._indexBuffer);
   // 父处理
   o.__base.FE3dRenderable.dispose.call(o);
}
