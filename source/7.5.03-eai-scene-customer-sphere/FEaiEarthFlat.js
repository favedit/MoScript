//==========================================================
// <T>渲染地球立方体。</T>
//
// @class
// @author maocy
// @history 150207
//==========================================================
MO.FEaiEarthFlat = function FEaiEarthFlat(o){
   o = MO.Class.inherits(this, o, MO.FE3dDisplay, MO.MProcessReady);
   //..........................................................
   // @attribute
   o._textureCloud  = MO.Class.register(o, new MO.AGetter('_textureCloud'));
   o._textureLand   = MO.Class.register(o, new MO.AGetter('_textureLand'));
   o._textureOcean  = MO.Class.register(o, new MO.AGetter('_textureOcean'));
   o._textureWater  = MO.Class.register(o, new MO.AGetter('_textureWater'));
   //..........................................................
   // @method
   o.onProcessReady = MO.FEaiEarthFlat_onProcessReady;
   //..........................................................
   // @method
   o.construct      = MO.FEaiEarthFlat_construct;
   // @method
   o.setup          = MO.FEaiEarthFlat_setup;
   o.drawTouch      = MO.FEaiEarthFlat_drawTouch;
   o.drawBoundary   = MO.FEaiEarthFlat_drawBoundary;
   o.drawGrid       = MO.FEaiEarthFlat_drawGrid;
   o.pickIdentify   = MO.FEaiEarthFlat_pickIdentify;
   o.process        = MO.FEaiEarthFlat_process;
   // @method
   o.dispose        = MO.FEaiEarthFlat_dispose;
   return o;
}

//==========================================================
// <T>绘制触点。</T>
//
// @method
//==========================================================
MO.FEaiEarthFlat_drawTouch = function FEaiEarthFlat_drawTouch(x, y){
   var o = this;
   if(!o._canvas){
      return;
   }
   var canvas = o._canvas;
   var context2d = canvas.graphicContext();
   var size = o._graphicContext.size();
   var cx = x * o._imageSize.width;
   var cy = y * o._imageSize.height;
   context2d.drawCircle(cx, cy, 4, 1, '#FFFFFF', '#FF0000') 
   o._textureLand.upload(canvas);
}

//==========================================================
// <T>绘制边线。</T>
//
// @method
//==========================================================
MO.FEaiEarthFlat_drawBoundary = function FEaiEarthFlat_drawBoundary(handle, boundaryData, scaleX, scaleY, centerX, centerY, lineWidth, lineColor){
   var o = this;
   var positionCount = boundaryData.positionCount();
   var positions = boundaryData.positions();
   handle.beginPath();
   handle.moveTo(positions[0] * scaleX + centerX ,-positions[1] * scaleY + centerY);
   for(var n = 0; n < positionCount; n++){
      var x = positions[2 * n] * scaleX + centerX;
      var y = -positions[2 * n + 1] * scaleY + centerY;
      handle.lineTo(x,y);
   }
   handle.closePath();
   handle.lineWidth = lineWidth;
   handle.strokeStyle = lineColor;
   handle.stroke();
}

//==========================================================
// <T>绘制网格。</T>
//1
// @method
//==========================================================
MO.FEaiEarthFlat_drawGrid = function FEaiEarthFlat_drawGrid(context2d, split){
   var o = this;
   var size = o._imageLand.size();
   var sizeWidth = size.width;
   var sizeHeight = size.height;
   var sx = split * 2;
   var sy = split;
   var cx = size.width / sx;
   var cy = size.height / sy;
   for(var i = 0; i < sy ; i++){
      var y = cy * i;
      //context2d.drawLine(0, y + 1, sizeWidth, y + 1, '#333333', 1);
      //context2d.drawLine(0, y, sizeWidth, y, '#A193F8', 1);
      context2d.drawLine(0, y, sizeWidth, y, '#FF75F3', 1);
   }
   for(var i = 0; i < sx ; i++){
      var x = cx * i;
      //context2d.drawLine(x + 1, 0, x + 1, sizeHeight, '#333333', 1);
      //context2d.drawLine(x, 0, x, sizeHeight, '#0675F3', 1);
      context2d.drawLine(x, 0, x, sizeHeight, '#FF75F3', 1);
   }
}

//==========================================================
// <T>准备处理。</T>
//
// @method
//==========================================================
MO.FEaiEarthFlat_onProcessReady = function FEaiEarthFlat_onProcessReady(){
   var o = this;
   //..........................................................
   // 加载海洋纹理
   var loader = o._textureCloudLoader;
   o._textureCloud = loader.pickTexture();
   o._textureCloudLoader = MO.Lang.Object.dispose(loader);
   //..........................................................
   // 加载陆地纹理
   var image = o._imageLand;
   var context = o._graphicContext;
   var size = image.size();
   o._imageSize = new MO.SSize2(size.width, size.height);
   var sizeWidth = size.width;
   var sizeHeight = size.height;
   // 创建画板
   var canvas = o._canvas = MO.Class.create(MO.FE2dCanvas);
   canvas.size().assign(size);
   canvas.build(MO.Window._hDocument);
   var context2d = canvas.graphicContext();
   var handle = context2d._handle;
   context2d.drawImage(image, 0, 0, sizeWidth, size.height);
   handle.lineCap = 'round';
   var scaleX = sizeWidth / 360;
   var scaleY = sizeHeight / 180;
   var centerX = sizeWidth * 0.5;
   var centerY = sizeHeight * 0.5;
   var countries = o._worldResource.data().countries();
   var count = countries.count();
   for(var k = 0; k < count; k++){
      var country = countries.at(k);
      var lineWidth = 1;
      var lineColor = "#0085E6";
      if(country.code() == 'China'){
         lineWidth = 4;
         lineColor = "#004596";
      }
      var boundaries = country.boundaries();
      var boundaryCount = boundaries.count();
      for(var j = 0; j < boundaryCount; j++){
         var boundary = boundaries.at(j);
         if(MO.Class.isClass(boundary, MO.FEaiMapBoundaryData)){
            o.drawBoundary(handle, boundary, scaleX, scaleY, centerX, centerY, lineWidth, lineColor);
         }else{
            var boundaryDatas = boundary.items();
            var boundaryDataCount = boundaryDatas.count();
            for(var i = 0; i < boundaryDataCount; i++){
               var boundaryData = boundaryDatas.at(i);
               o.drawBoundary(handle, boundaryData, scaleX, scaleY, centerX, centerY, lineWidth, lineColor);
            }
         }
      }
   }
   // 绘制经纬度
   o.drawGrid(context2d, 8);
   // 绘制区域
   context2d.drawImage(o._imageArea, 0, 0, sizeWidth, size.height);
   // 创建纹理
   var texture = o._textureLand = context.createFlatTexture();
   texture.setCode('land');
   texture.upload(canvas);
   // 释放数据
   //canvas.dispose();
   //image.dispose();
   //o._imageLand = null;
   //..........................................................
   // 创建拾取数据
   var image = o._imageIdentify;
   var size = image.size();
   var canvas = o._canvasIdentify = MO.Class.create(MO.FE2dCanvas);
   canvas.size().assign(size);
   canvas.build(MO.Window._hDocument);
   var context2d = canvas.graphicContext();
   var handle = context2d._handle;
   context2d.drawImage(image, 0, 0, sizeWidth, size.height);
   o._identityData = context2d._handle.getImageData(0, 0, sizeWidth, size.height); 
   // 释放数据
   canvas.dispose();
   image.dispose();
   o._imageLand = null;
   //..........................................................
   // 加载海洋纹理
   var loader = o._textureOceanLoader;
   o._textureOcean = loader.pickTexture();
   o._textureOceanLoader = MO.Lang.Object.dispose(loader);
   //..........................................................
   // 加载水纹纹理
   var loader = o._textureWaterLoader;
   o._textureWater = loader.pickTexture();
   o._textureWaterLoader = MO.Lang.Object.dispose(loader);
   // 加载水纹纹理
   var loader = o._textureWaterNormalLoader;
   o._textureWaterNormal = loader.pickTexture();
   o._textureWaterNormalLoader = MO.Lang.Object.dispose(loader);
   //..........................................................
   // 设置矩形
   var rectangle = o._rectangle;
   rectangle.pushTexture(o._textureCloud);
   rectangle.pushTexture(o._textureLand);
   rectangle.pushTexture(o._textureOcean);
   rectangle.pushTexture(o._textureWater);
   rectangle.pushTexture(o._textureWaterNormal);
   o.pushRenderable(rectangle);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiEarthFlat_construct = function FEaiEarthFlat_construct(){
   var o = this;
   o.__base.FE3dDisplay.construct.call(o);
   o.__base.MProcessReady.construct.call(o);
   // 设置属性
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
MO.FEaiEarthFlat_setup = function FEaiEarthFlat_setup(){
   var o = this;
   var qualityCd = MO.Desktop.qualityCd();
   // 加载国家信息
   var resourceConsole = MO.Console.find(MO.FEaiResourceConsole);
   var worldResource = o._worldResource = resourceConsole.mapModule().loadWorld();
   o._readyLoader.push(worldResource);
   //..........................................................
   // 加载水波纹
   var loader = o._textureCloudLoader = MO.Class.create(MO.FE3dTextureLoader);
   loader.linkGraphicContext(o);
   loader.setup(MO.EG3dTexture.Flat2d, 'cloud');
   loader.loadUrl('{eai.resource}/world/cloud1024.jpg');
   o._readyLoader.push(loader);
   // 加载陆地
   var image = o._imageLand = MO.Class.create(MO.FImage);
   if(qualityCd == MO.EGraphicQuality.Highest){
      image.loadUrl('{eai.resource}/world/land2048x2048.png');
   }else{
      image.loadUrl('{eai.resource}/world/land1024x1024.png');
   }
   o._readyLoader.push(image);
   // 加载区域
   var image = o._imageArea = MO.Class.create(MO.FImage);
   image.loadUrl('{eai.resource}/world/area.png');
   o._readyLoader.push(image);
   // 加载定义
   var image = o._imageIdentify = MO.Class.create(MO.FImage);
   image.loadUrl('{eai.resource}/world/identify.jpg');
   o._readyLoader.push(image);
   // 加载海洋
   var loader = o._textureOceanLoader = MO.Class.create(MO.FE3dTextureLoader);
   loader.linkGraphicContext(o);
   loader.setup(MO.EG3dTexture.Flat2d, 'ocean');
   if(qualityCd == MO.EGraphicQuality.Highest){
      loader.loadUrl('{eai.resource}/world/ocean2048x2048.jpg');
   }else{
      loader.loadUrl('{eai.resource}/world/ocean1024x1024.jpg');
   }
   o._readyLoader.push(loader);
   // 加载水波纹
   var loader = o._textureWaterLoader = MO.Class.create(MO.FE3dTextureLoader);
   loader.linkGraphicContext(o);
   loader.setup(MO.EG3dTexture.Flat2d, 'water');
   loader.loadUrl('{eai.resource}/world/water.jpg');
   o._readyLoader.push(loader);
   // 加载水法线波纹
   var loader = o._textureWaterNormalLoader = MO.Class.create(MO.FE3dTextureLoader);
   loader.linkGraphicContext(o);
   loader.setup(MO.EG3dTexture.Flat2d, 'water_normal');
   loader.loadUrl('{eai.resource}/world/water-normal.png');
   o._readyLoader.push(loader);
   //..........................................................
   // 创建矩形
   var rectangle = o._rectangle = MO.Class.create(MO.FE3dRectangleArea);
   //rectangle.setCoordFlip(true);
   rectangle.linkGraphicContext(o);
   rectangle.setup();
   rectangle.material().info().effectCode = 'eai.earth.flat';
}

//==========================================================
// <T>拾取鉴定点。</T>
//
// @method
//==========================================================
MO.FEaiEarthFlat_pickIdentify = function FEaiEarthFlat_pickIdentify(x, y){
   var o = this;
   var identityData = o._identityData;
   var cx = parseInt(identityData.width * x);
   var cy = parseInt(identityData.height * y);
   var location = (identityData.width * cy + cx) << 2;
   var r = identityData.data[location];
   var g = identityData.data[location + 1];
   var b = identityData.data[location + 2];
   var a = identityData.data[location + 3];
   return r;
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiEarthFlat_process = function FEaiEarthFlat_process(){
   var o = this;
   o.__base.FE3dDisplay.process.call(o);
   // 测试状态
   var loader = o._readyLoader;
   if(!loader.testReady()){
      return;
   }
   // 逻辑处理
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.MFrameProcessor_dispose = function MFrameProcessor_dispose(){
   var o = this;
   // 父处理
   o.__base.MProcessReady.dispose.call(o);
   o.__base.FE3dDisplay.dispose.call(o);
}
