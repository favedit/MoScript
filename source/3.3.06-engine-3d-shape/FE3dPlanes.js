//==========================================================
// <T>渲染矩形集合。</T>
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
MO.FE3dPlanes = function FE3dPlanes(o) {
   o = MO.Class.inherits(this, o, MO.FE3dRenderable);
   //..........................................................
   // @attribute
   o._optionCenterX           = MO.Class.register(o, new MO.AGetSet('_optionCenterX'), true);
   o._optionCenterY           = MO.Class.register(o, new MO.AGetSet('_optionCenterY'), true);
   o._optionCenterZ           = MO.Class.register(o, new MO.AGetSet('_optionCenterZ'), true);
   o._url                     = MO.Class.register(o, new MO.AGetSet('_url'));
   o._initRotation            = null;
   o._initAxis                = null;
   o._initAngle               = null;
   o._size                    = MO.Class.register(o, new MO.AGetter('_size'));
   o._splits                  = MO.Class.register(o, new MO.AGetter('_splits'));
   o._texture                 = MO.Class.register(o, new MO.AGetter('_texture'));

   o._planes                  = null;
   o._vertexPositionBuffer    = null;
   o._indexBuffer             = null;
   o._image                   = null;
   //..........................................................
   // @method
   o.onLoad                   = MO.FE3dPlanes_onLoad;
   o.construct                = MO.FE3dPlanes_construct;
   o.setup                    = MO.FE3dPlanes_setup;
   o.updateVertex             = MO.FE3dPlanes_updateVertex;
   o.getInitCenterX           = MO.FE3dPlanes_getInitCenterX;
   o.getInitCenterY           = MO.FE3dPlanes_getInitCenterY;
   o.movePlane                = MO.FE3dPlanes_movePlane;
   o.rotatePlane              = MO.FE3dPlanes_rotatePlane;
   o.rotatePlaneAxis          = MO.FE3dPlanes_rotatePlaneAxis;
   o.getPlaneMatrix           = MO.FE3dPlanes_getPlaneMatrix;
   o.getPlane                 = MO.FE3dPlanes_getPlane;
   o.updateAll                = MO.FE3dPlanes_updateAll;
   o.setInitRotation          = MO.FE3dPlanes_setInitRotation;
   o.setInitRotationAxis      = MO.FE3dPlanes_setInitRotationAxis;

   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3dPlanes_construct = function FE3dPlanes_construct() {
   var o = this;
   o.__base.FE3dRenderable.construct.call(o);
   //设置属性
   o._size = new MO.SSize2(1, 1);
   o._splits = new MO.SSize2(4, 4);
   o._planes = new MO.TArray();
   o._material = MO.Class.create(MO.FE3dMaterial);
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
MO.FE3dPlanes_setup = function FE3dPlanes_setup() {
   var o = this;
   var context = o._graphicContext;
   //计算顶点信息
   var splits = o._splits;
   var cx = splits.width;
   var cy = splits.height;
   var size = o._size;
   var halfWidth = size.width / cx / 2;
   var halfHeight = size.height / cy / 2;
   //..........................................................
   // 初始化所有方块
   var vertexCount = o._vertexCount = cx * cy * 4;
   var coordIndex = 0;
   var coordData = new Float32Array(2 * vertexCount);
   for(var y = 0; y < cy; y++) {
      for(var x = 0; x < cx; x++) {
         var plane = MO.Class.create(MO.FE3dPlaneData);
         var nextLinePlus = (y + 1) * (cx + 1);
         plane.setVertexs(o.getInitCenterX(x), o.getInitCenterY(y), halfWidth, halfHeight);
         if(o._initRotation) plane.rotate(o._initRotation.width, o._initRotation.height, o._initRotation.deep);
         if(o._initAxis) {
            plane.rotateAxis(o._initAxis, o._initAngle);
         }
         plane.update();
         coordData[coordIndex++] = x / cx;
         coordData[coordIndex++] = y / cy;
         coordData[coordIndex++] = (x + 1) / cx;
         coordData[coordIndex++] = y / cy;
         coordData[coordIndex++] = (x + 1) / cx;
         coordData[coordIndex++] = (y + 1) / cy;
         coordData[coordIndex++] = x / cx;
         coordData[coordIndex++] = (y + 1) / cy;
         o._planes.push(plane);
      }
   }
   //创建顶点位置缓冲
   var planes = o._planes;
   var length = planes.length();
   var vertexCount = length * 4;
   var positionIndex = 0;
   var positionData = o._positionData = new Float32Array(3 * vertexCount);
   for(var i = 0; i < length; i++) {
      var plane = planes.get(i);
      positionData.set(plane.vertexs(), i * 12);
   }
   var buffer = o._vertexPositionBuffer = context.createVertexBuffer();
   buffer.setCode('position');
   buffer.setFormatCd(MO.EG3dAttributeFormat.Float3);
   buffer.upload(positionData, 4 * 3, vertexCount);
   o.pushVertexBuffer(buffer);
   //创建顶点颜色缓冲
   var buffer = o._vertexColorBuffer = context.createVertexBuffer();
   buffer.setCode('coord');
   buffer.setFormatCd(MO.EG3dAttributeFormat.Float2);
   buffer.upload(coordData, 4 * 2, vertexCount);
   o.pushVertexBuffer(buffer);
   //..........................................................
   // 计算索引
   var indexes = new MO.TArray();
   for (var y = 0; y < cy; y++) {
      for(var x = 0; x < cx; x++) {
         var offset = (cx * y + x) * 4;
         indexes.push(offset, offset + 2, offset + 1);
         indexes.push(offset, offset + 3, offset + 2);
      }
   }
   // 创建索引缓冲
   var buffer = o._indexBuffer = context.createIndexBuffer();
   //buffer.setDrawModeCd(MO.EG3dDrawMode.Lines);
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
   info.specularLevel = 64;
   o.material()._textures = o._textures;
   //..........................................................
   // 加载纹理
   if(o._url) {
      var image = o._image = MO.Class.create(MO.FImage);
      image.addLoadListener(o, o.onLoad);
      image.loadUrl(o._url);
   }
}

MO.FE3dPlanes_getInitCenterX = function FE3dPlanes_getInitCenterX(x) {
   var o = this;
   var splits = o._splits;
   var cx = splits.width;
   var size = o._size;
   var sx = size.width / cx;
   var centerX = o._optionCenterX ? size.width * 0.5 : 0;
   return sx * x - centerX + sx / 2;
}

MO.FE3dPlanes_getInitCenterY = function FE3dPlanes_getInitCenterY(y) {
   var o = this;
   var splits = o._splits;
   var cy = splits.height;
   var size = o._size;
   var sy = size.height / cy;
   var centerY = o._optionCenterY ? size.height * 0.5 : 0;
   return sy * y - centerY + sy / 2;
}

MO.FE3dPlanes_onLoad = function FE3dPlanes_onLoad(event) {
   var o = this;
   var texture = o._texture;
   texture.upload(o._image);
   texture.makeMipmap();
   o._image = MO.Lang.Object.dispose(o._image);

   o.updateAll();
}

MO.FE3dPlanes_updateAll = function FE3dPlanes_updateAll() {
   var o = this;
   //更新每个方块
   var planes = o._planes;
   var length = planes.length();
   for( var i = 0; i < length; ++i) {
      var plane = planes.get(i);
      plane.update();
   }
   o.updateVertex();
   o.update();
}

//==========================================================
// <T>刷新顶点。</T>
// 
// @method
//==========================================================
MO.FE3dPlanes_updateVertex = function FE3dPlanes_updateVertex() {
   var o = this;
   var context = o._graphicContext;
   var planes = o._planes;
   var length = planes.length();
   var vertexCount = length * 4;
   var positionIndex = 0;
   var positionData = o._positionData;
   for(var i = 0; i < length; i++) {
      var plane = planes.get(i);
      positionData.set(plane.vertexs(), i * 12);
   }
   //创建顶点位置缓冲
   var buffer = o._vertexPositionBuffer;
   buffer.upload(positionData, 4 * 3, vertexCount);
}

MO.FE3dPlanes_movePlane = function FE3dPlanes_movePlane(planeX, planeY, toX, toY, toZ) {
   var o = this;
   var plane = o.getPlane(planeX, planeY);
   plane.move(toX, toY, toZ);
}

MO.FE3dPlanes_rotatePlane = function FE3dPlanes_rotatePlane(planeX, planeY, rx, ry, rz) {
   var o = this;
   var plane = o.getPlane(planeX, planeY);
   plane.rotate(rx, ry, rz);
}

MO.FE3dPlanes_rotatePlaneAxis = function FE3dPlanes_rotatePlaneAxis(planeX, planeY, axis, angle) {
   var o = this;
   var plane = o.getPlane(planeX, planeY);
   plane.rotateAxis(axis, angle);
}

MO.FE3dPlanes_getPlaneMatrix = function FE3dPlanes_getPlaneMatrix(planeX, planeY) {
   var o = this;
   var plane = o.getPlane(planeX, planeY);
}

MO.FE3dPlanes_getPlane = function FE3dPlanes_getPlane(planeX, planeY) {
   var o = this;
   var planes = o._planes;
   var splits = o._splits;
   var cx = splits.width;
   var cy = splits.height;
   var plane = planes.get(cx * planeY + planeX);
   return plane;
}

MO.FE3dPlanes_setInitRotation = function FE3dPlanes_setInitRotation(x, y, z) {
   var o = this;
   var rotation = o._initRotation = new MO.SSize3(x, y, z);
}

MO.FE3dPlanes_setInitRotationAxis = function FE3dPlanes_setInitRotationAxis(axis, angle) {
   var o = this;
   o._initAxis = axis;
   o._initAngle = angle;
}

