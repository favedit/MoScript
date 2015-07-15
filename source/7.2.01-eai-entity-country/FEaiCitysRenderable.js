//==========================================================
// <T>渲染城市集合。</T>
//
// @class
// @author maocy
// @history 150622
//==========================================================
MO.FEaiCitysRenderable = function FEaiCitysRenderable(o){
   o = MO.Class.inherits(this, o, MO.FE3dRenderable);
   //..........................................................
   // @attribute
   o._ready                = false;
   o._image                = null;
   o._levelCoordLeft       = null;
   o._levelCoordRight      = null;
   o._levelScale           = null;
   // @attribute
   o._citys                = MO.Class.register(o, new MO.AGetter('_citys'));
   o._level                = MO.Class.register(o, new MO.AGetSet('_level'));
   o._citySize             = MO.Class.register(o, new MO.AGetter('_citySize'));
   // @attribute
   o._vertexPositionBuffer = null;
   o._vertexCoordBuffer    = null;
   o._indexBuffer          = null;
   o._texture              = null;
   //..........................................................
   // @event
   o.onImageLoad           = MO.FEaiCitysRenderable_onImageLoad;
   //..........................................................
   // @method
   o.construct             = MO.FEaiCitysRenderable_construct;
   // @method
   o.testReady             = MO.FEaiCitysRenderable_testReady;
   // @method
   o.setup                 = MO.FEaiCitysRenderable_setup;
   o.upload                = MO.FEaiCitysRenderable_upload;
   // @method
   o.dispose               = MO.FEaiCitysRenderable_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCitysRenderable_onImageLoad = function FEaiCitysRenderable_onImageLoad(event){
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
MO.FEaiCitysRenderable_construct = function FEaiCitysRenderable_construct(){
   var o = this;
   o.__base.FE3dRenderable.construct.call(o);
   // 设置属性
   o._citys = new MO.TObjects();
   o._material = MO.Class.create(MO.FE3dMaterial);
   // 设置数据
   var data = o._levelCoordLeft = new Object();
   data[1] = 0.0;
   data[2] = 0.25;
   data[3] = 0.5;
   data[4] = 0.75;
   var data = o._levelCoordRight = new Object();
   data[1] = 0.25;
   data[2] = 0.5;
   data[3] = 0.75;
   data[4] = 1.0;
   var data = o._levelScale = new Object();
   data[1] = 0.7;
   data[2] = 0.5;
   data[3] = 0.4;
   data[4] = 0.2;
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
   var citys = o._citys;
   var count = citys.count();
   var vertexCount = o._vertexCount = 4 * count;
   //..........................................................
   // 设置顶点坐标
   var buffer = o._vertexPositionBuffer = context.createVertexBuffer();
   buffer.setCode('position');
   buffer.setFormatCd(MO.EG3dAttributeFormat.Float3);
   o.pushVertexBuffer(buffer);
   //..........................................................
   // 设置顶点纹理
   var buffer = o._vertexCoordBuffer = context.createVertexBuffer();
   buffer.setCode('coord');
   buffer.setFormatCd(MO.EG3dAttributeFormat.Float2);
   o.pushVertexBuffer(buffer);
   //..........................................................
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
   materialInfo.effectCode = 'eai.citys';
   materialInfo.optionAlpha = true;
   materialInfo.optionDepth = false;
   materialInfo.ambientColor.setHex('#FFFFFF');
   o._material._textures = o._textures;
   // 加载图片
   var image = MO.Class.create(MO.FImage);
   image.addLoadListener(o, o.onImageLoad);
   image.loadUrl('{eai.resource}/citys.png');
   // 设置属性
   o._ready = false;
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
   var vertexCount = o._vertexCount = 4 * count;
   // 设置顶点数据
   var vertexPosition = 0;
   var vertexData = new Float32Array(3 * vertexCount);
   var coordPosition = 0;
   var coordData = new Float32Array(2 * vertexCount);
   var colorPosition = 0;
   var colorData = new Uint8Array(4 * vertexCount);
   for(var i = 0; i < total; i++){
      var city = citys.at(i);
      if(city.visible()){
         var range = city.range() * 255;
         var location = city.location();
         var level = city.data().level();
         if((level != 1) && (level != 2) && (level != 3) && (level != 4)){
            throw new TError('Invalid level.');
         }
         var provinceEntity = city.provinceEntity();
         var z = 0;
         if(provinceEntity){
            z = provinceEntity.currentZ();
         }
         var coordLeft = o._levelCoordLeft[level];
         //coordLeft = 0;
         var coordRight = o._levelCoordRight[level];
         //coordRight = 1;
         var scale = o._levelScale[level];
         //scale = 1;
         // 设置顶点位置
         vertexData[vertexPosition++] = location.x - scale;
         vertexData[vertexPosition++] = location.y + scale;
         vertexData[vertexPosition++] = z;
         vertexData[vertexPosition++] = location.x + scale;
         vertexData[vertexPosition++] = location.y + scale;
         vertexData[vertexPosition++] = z;
         vertexData[vertexPosition++] = location.x + scale;
         vertexData[vertexPosition++] = location.y - scale;
         vertexData[vertexPosition++] = z;
         vertexData[vertexPosition++] = location.x - scale;
         vertexData[vertexPosition++] = location.y - scale;
         vertexData[vertexPosition++] = z;
         // 设置顶点纹理
         coordData[coordPosition++] = coordLeft;
         coordData[coordPosition++] = 1;
         coordData[coordPosition++] = coordRight;
         coordData[coordPosition++] = 1;
         coordData[coordPosition++] = coordRight;
         coordData[coordPosition++] = 0;
         coordData[coordPosition++] = coordLeft;
         coordData[coordPosition++] = 0;
         // 设置顶点颜色
         var color = city.color();
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
   o._vertexCoordBuffer.upload(coordData, 4 * 2, vertexCount);
   o._vertexColorBuffer.upload(colorData, 1 * 4, vertexCount);
   // 设置索引数据
   o._indexBuffer.setCount(3 * 2 * count);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCitysRenderable_dispose = function FEaiCitysRenderable_dispose(){
   var o = this;
   // 释放属性
   o._texture = MO.Lang.Object.dispose(o._texture);
   // 释放属性
   o._vertexPositionBuffer = MO.Lang.Object.dispose(o._vertexPositionBuffer);
   o._vertexCoordBuffer = MO.Lang.Object.dispose(o._vertexCoordBuffer);
   o._vertexColorBuffer = MO.Lang.Object.dispose(o._vertexColorBuffer);
   o._indexBuffer = MO.Lang.Object.dispose(o._indexBuffer);
   // 父处理
   o.__base.FE3dRenderable.dispose.call(o);
}
