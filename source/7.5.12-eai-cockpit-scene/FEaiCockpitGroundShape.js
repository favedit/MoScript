//==========================================================
// <T>渲染背景缓动动画。</T>
//  
//  00 ── 01 
//  │      │
//  │      │
//  03 ── 02
//
// @class
// @author adu
// @history 150207
//==========================================================
MO.FEaiCockpitGroundShape = function FEaiCockpitGroundShape(o) {
   o = MO.Class.inherits(this, o, MO.FE3dRenderable);
   //..........................................................
   // @attribute
   o._texture                 = MO.Class.register(o, new MO.AGetter('_texture'));
   o._url                     = MO.Class.register(o, new MO.AGetter('_url'));
   o._planes                  = null;
   o._vertexPositionBuffer    = null;
   o._vertexCoordBuffer       = null;
   o._indexBuffer             = null;
   o._image                   = null;
   o._size                    = null;
   o._pieceSize               = null;
   o._positionData            = null;
   o._colorData               = null;
   o._pathes                  = null;
   o._vertexCount             = 0;
   o._count                   = 5;
   //..........................................................
   // @event
   o.onLoad                   = MO.FEaiCockpitGroundShape_onLoad;
   //..........................................................
   // @method
   o.construct                = MO.FEaiCockpitGroundShape_construct;
   o.setup                    = MO.FEaiCockpitGroundShape_setup;
   o.updateAll                = MO.FEaiCockpitGroundShape_updateAll;
   o.process                  = MO.FEaiCockpitGroundShape_process;
   o.getRandomRoundPoint      = MO.FEaiCockpitGroundShape_getRandomRoundPoint;
   o.dispose                  = MO.FEaiCockpitGroundShape_dispose;
   return o;
}

//==========================================================
// <T>加载后处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitGroundShape_onLoad = function FEaiCockpitGroundShape_onLoad(event) {
   var o = this;
   o._texture.upload(o._image);
   o._image = MO.Lang.Object.dispose(o._image);
   o.updateAll();
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitGroundShape_construct = function FEaiCockpitGroundShape_construct() {
   var o = this;
   o.__base.FE3dRenderable.construct.call(o);
   o._size = new MO.SSize2(2048 / 120, 1024 / 120);
   o._pieceSize = new MO.SSize2(500 / 120, 500 / 120);
   o._planes = new MO.TArray();
   o._pathes = new MO.TArray();
   o._material = MO.Class.create(MO.FE3dMaterial);
   o._url = '{eai.resource}/cockpit/background/lights.png';
   o.setOptionSelect(false);
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitGroundShape_setup = function FEaiCockpitGroundShape_setup() {
   var o = this;
   var context = o._graphicContext;
   //计算顶点信息
   var planes = o._planes;
   var count = o._count;
   var size = o._size;
   var sx = size.width;
   var sy = size.height;
   var centerX = sx / 2;
   var centerY = sy / 2;
   var pieceSize = o._pieceSize;
   var px = pieceSize.width;
   var py = pieceSize.height;
   var halfWidth = px / 2;
   var halfHeight = py / 2;
   //初始化所有方块
   var vertexCount = o._vertexCount = count * 4;
   var positionIndex = 0;
   var positionData = o._positionData = new Float32Array(3 * vertexCount);
   var coordIndex = 0;
   var coordData = new Float32Array(2 * vertexCount);
   var colorIndex = 0;
   var colorData = o._colorData = new Uint8Array(4 * vertexCount);
   for(var i = 0; i < count; ++i) {
      var plane = MO.Class.create(MO.FE3dPlaneData);
      var cx = i * sx / count + halfWidth - centerX;
      var cy = sy / 2 - centerY;
      plane.setVertexs(cx, cy, halfWidth, halfHeight);
      coordData[coordIndex ++] = i / count;
      coordData[coordIndex ++] = 0;
      coordData[coordIndex ++] = (i + 1) / count;
      coordData[coordIndex ++] = 0;
      coordData[coordIndex ++] = (i + 1) / count;
      coordData[coordIndex ++] = 1;
      coordData[coordIndex ++] = i / count;
      coordData[coordIndex ++] = 1;
      for(var n = 0; n < 4; n++){
         colorData[colorIndex++] = 0xFF;
         colorData[colorIndex++] = 0xFF;
         colorData[colorIndex++] = 0xFF;
         colorData[colorIndex++] = 0xFF;
      }
      var path = MO.Class.create(MO.FEaiCockpitGroundPiece);
      path.origin().set(cx, cy);
      path.setup();
      o._pathes.push(path);
      planes.push(plane);
      positionData.set(plane.vertexs(), i * 12);
   }
   // 创建顶点位置缓冲
   var buffer = o._vertexPositionBuffer = context.createVertexBuffer();
   buffer.setCode('position');
   buffer.setFormatCd(MO.EG3dAttributeFormat.Float3);
   buffer.upload(positionData, 4 * 3, vertexCount);
   o.pushVertexBuffer(buffer);
   // 创建顶点纹理缓冲
   var buffer = o._vertexCoordBuffer = context.createVertexBuffer();
   buffer.setCode('coord');
   buffer.setFormatCd(MO.EG3dAttributeFormat.Float2);
   buffer.upload(coordData, 4 * 2, vertexCount);
   o.pushVertexBuffer(buffer);
   // 创建顶点颜色缓冲
   var buffer = o._vertexColorBuffer = context.createVertexBuffer();
   buffer.setCode('color');
   buffer.setFormatCd(MO.EG3dAttributeFormat.Byte4Normal);
   buffer.upload(colorData, 4, vertexCount);
   o.pushVertexBuffer(buffer);
   //..........................................................
   // 计算索引
   var indexes = new MO.TArray();
   for(var i = 0; i < count; ++i) {
      var offset = i * 4;
      indexes.push(offset, offset + 2, offset + 1);
      indexes.push(offset, offset + 3, offset + 2);
   }
   //创建索引缓冲
   var buffer = o._indexBuffer = context.createIndexBuffer();
   var indexLength = indexes.length();
   var indexMemory = indexes.memory();
   if(indexLength > 65535) {
      buffer.setStrideCd(MO.EG3dIndexStride.Uint32);
      buffer.upload(new Uint32Array(indexMemory), indexLength);
   }else {
      buffer.upload(new Uint16Array(indexMemory), indexLength);
   }
   o.pushIndexBuffer(buffer);
   //..........................................................
   // 创建纹理
   var texture = o._texture = context.createFlatTexture();
   texture.setOptionFlipY(true);
   texture.setWrapCd(MO.EG3dSamplerFilter.ClampToEdge, MO.EG3dSamplerFilter.ClampToEdge);
   o.pushTexture(texture, 'diffuse');
   //..........................................................
   // 更新处理
   o.update();
   //..........................................................
   // 设置材质
   var info = o.material().info();
   info.optionAlpha = true;
   info.optionDepthWrite = false;
   info.effectCode = 'control';
   info.alphaBase = 0;
   o.material()._textures = o._textures;
   //..........................................................
   // 加载纹理
   if(o._url){
      var image = o._image = MO.Class.create(MO.FImage);
      image.addLoadListener(o, o.onLoad);
      image.loadUrl(o._url);
   }
}

//==========================================================
// <T>刷新顶点信息。</T>
//
// @method
//==========================================================
MO.FEaiCockpitGroundShape_updateAll = function FEaiCockpitGroundShape_updateAll() {
   var o = this;
   var planes = o._planes;
   var count = o._count;
   var vertexCount = count * 4;
   var positionData = o._positionData;
   var colorData = o._colorData;
   var colorIndex = 0;
   var pathes = o._pathes;
   for(var i = 0; i < count; ++i) {
      var plane = planes.get(i);
      var path = pathes.get(i);
      var next = path.nextStep();
      plane.move(next.x, next.y, 0);
      if(!path.playing()) {
         var dest = o.getRandomRoundPoint(plane.centerX(), plane.centerY());
         path.gotoRelative(dest.x, dest.y, 10000 + 2000 * Math.random());
      }
      plane.update();
      positionData.set(plane.vertexs(), i * 12);
      for (var n = 0; n < 4; n++) {
         colorData[colorIndex ++] = 0xFF;
         colorData[colorIndex ++] = 0xFF;
         colorData[colorIndex ++] = 0xFF;
         colorData[colorIndex ++] = path.alpha();
      }
   }
   var buffer = o._vertexPositionBuffer;
   buffer.upload(positionData, 4 * 3, vertexCount);
   var buffer = o._vertexColorBuffer;
   buffer.upload(colorData, 4, vertexCount);
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitGroundShape_process = function FEaiCockpitGroundShape_process() {
   var o = this;
   o.updateAll();
}

//==========================================================
// <T>获取随机目标点。</T>
//
// @method
//==========================================================
MO.FEaiCockpitGroundShape_getRandomRoundPoint = function FEaiCockpitGroundShape_getRandomRoundPoint(edgeX, edgeY) {
   var o = this;
   var result = new MO.SPoint2();
   var shotest = 1;
   var maxX = o._size.width / 2;
   var maxY = o._size.height / 2;
   var goon = true;
   while(goon) {
      var variable = shotest + 0.5 * Math.random();
      var angle = Math.PI * 2 * Math.random();
      result.x = variable * Math.sin(angle);
      result.y = variable * Math.cos(angle);
      if(result.x + edgeX < maxX && result.x + edgeX > -maxX && result.y + edgeY < maxY && result.y + edgeY > -maxY) {
         goon = false;
      }
   }
   return result;
}

//==========================================================
// <T>析构处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitGroundShape_dispose = function FEaiCockpitGroundShape_dispose() {
   var o = this;
   o.__base.FE3dRenderable.dispose.call(o);
}
