//==========================================================
// <T>渲染边框数据。</T>
//
// @class
// @author maocy
// @history 150721
//==========================================================
MO.FE3dBoundaryShape3d = function FE3dBoundaryShape3d(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MGraphicObject);
   //..........................................................
   // @attribute
   o._scaleTop          = MO.Class.register(o, new MO.AGetSet('_scaleTop'), 1);
   o._scaleBottom       = MO.Class.register(o, new MO.AGetSet('_scaleBottom'), 0.9);
   o._color             = MO.Class.register(o, new MO.AGetter('_color'));
   o._faceColor         = MO.Class.register(o, new MO.AGetter('_faceColor'));
   o._faceBottomColor   = MO.Class.register(o, new MO.AGetter('_faceBottomColor'));
   o._borderColor       = MO.Class.register(o, new MO.AGetter('_borderColor'));
   o._borderBottomColor = MO.Class.register(o, new MO.AGetter('_borderBottomColor'));
   o._polygons          = MO.Class.register(o, new MO.AGetter('_polygons'));
   // @attribute
   o._faceEffectCode    = MO.Class.register(o, new MO.AGetSet('_faceEffectCode'));
   o._faceRenderable    = MO.Class.register(o, new MO.AGetter('_faceRenderable'));
   o._borderEffectCode  = MO.Class.register(o, new MO.AGetSet('_borderEffectCode'));
   o._borderRenderable  = MO.Class.register(o, new MO.AGetter('_borderRenderable'));
   //..........................................................
   // @method
   o.construct          = MO.FE3dBoundaryShape3d_construct;
   // @method
   o.pushPolygon        = MO.FE3dBoundaryShape3d_pushPolygon;
   // @method
   o.buildFace          = MO.FE3dBoundaryShape3d_buildFace;
   o.buildBorder        = MO.FE3dBoundaryShape3d_buildBorder;
   o.build              = MO.FE3dBoundaryShape3d_build;
   // @method
   o.dispose            = MO.FE3dBoundaryShape3d_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3dBoundaryShape3d_construct = function FE3dBoundaryShape3d_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._faceColor = new MO.SColor4(1, 1, 1, 1);
   o._color = new MO.SColor4(0.3, 0.3, 0.3);
   o._polygons = new MO.TObjects();
}

//==========================================================
// <T>增加一个边界。</T>
//
// @method
//==========================================================
MO.FE3dBoundaryShape3d_pushPolygon = function FE3dBoundaryShape3d_pushPolygon(polygon){
   this._polygons.push(polygon);
}

//==========================================================
// <T>建立几何体表面。</T>
//
// @method
//==========================================================
MO.FE3dBoundaryShape3d_buildFace = function FE3dBoundaryShape3d_buildFace(){
   var o = this;
   var context = o._graphicContext;
   var faceColor = o._faceColor;
   var scaleTop = o._scaleTop;
   var scaleBottom = o._scaleBottom;
   var boundaries = o._polygons;
   var count = boundaries.count();
   var vertexTotal = o._vertexTotal;
   var indexTotal = o._indexTotal;
   var vertexSum = vertexTotal * 3;
   // 设置变量
   var vertexIndex = 0;
   var vertexData = new Float32Array(3 * vertexSum);
   var colorIndex = 0;
   var colors = new Uint8Array(4 * vertexSum);
   var coordIndex = 0;
   var coordData = new Float32Array(2 * vertexSum);
   var faceIndex = 0;
   var faceData = new Uint32Array(indexTotal + 3 * 2 * vertexTotal);
   // 建立表层数据
   var vertexStart = 0;
   for(var n = 0; n < count; n++){
      var boundary = boundaries.at(n);
      // 填充顶点
      var positionCount = boundary.positionCount();
      var positions = boundary.positions();
      var positionIndex = 0;
      for(var i = 0; i < positionCount; i++){
         var cx = positions[positionIndex++];
         var cy = positions[positionIndex++];
         var x = cx * MO.Lang.Const.DEGREE_RATE;
         var y = cy * MO.Lang.Const.DEGREE_RATE;
         vertexData[vertexIndex++] = Math.sin(x) * Math.cos(y) * scaleTop;
         vertexData[vertexIndex++] = Math.sin(y) * scaleTop;
         vertexData[vertexIndex++] = -Math.cos(x) * Math.cos(y) * scaleTop;
         colors[colorIndex++] = 0xFF;
         colors[colorIndex++] = 0xFF;
         colors[colorIndex++] = 0xFF;
         colors[colorIndex++] = 0xFF;
         coordData[coordIndex++] = cx / 360 + 0.5;
         coordData[coordIndex++] = cy / 180 - 0.5;
      }
      // 填充三角索引
      var indexes = boundary.indexes();
      var indexCount = indexes.length;
      var faceCount = indexCount / 3;
      for(var i = 0; i < faceCount; i++){
         var facePosition = 3 * i;
         faceData[faceIndex++] = vertexStart + indexes[facePosition + 2];
         faceData[faceIndex++] = vertexStart + indexes[facePosition + 1];
         faceData[faceIndex++] = vertexStart + indexes[facePosition    ];
      }
      // 修正位置
      vertexStart += positionCount;
   }
   var layerUpStart = vertexStart;
   // 建立边缘上层顶点数据
   scaleTop *= 0.999;
   var vertexStart = 0;
   for(var n = 0; n < count; n++){
      var boundary = boundaries.at(n);
      var positionCount = boundary.positionCount();
      var positions = boundary.positions();
      var positionIndex = 0;
      for(var i = 0; i < positionCount; i++){
         var x = positions[positionIndex++] * MO.Lang.Const.DEGREE_RATE;
         var y = positions[positionIndex++] * MO.Lang.Const.DEGREE_RATE;
         vertexData[vertexIndex++] = Math.sin(x) * Math.cos(y) * scaleTop;
         vertexData[vertexIndex++] = Math.sin(y) * scaleTop;
         vertexData[vertexIndex++] = -Math.cos(x) * Math.cos(y) * scaleTop;
         colors[colorIndex++] = 0x22;
         colors[colorIndex++] = 0x66;
         colors[colorIndex++] = 0xFF;
         colors[colorIndex++] = 0xFF;
         coordData[coordIndex++] = 0;
         coordData[coordIndex++] = 0;
      }
      vertexStart += positionCount;
   }
   var layerDownStart = layerUpStart + vertexStart;
   // 建立边缘下层数据
   var vertexStart = 0;
   for(var n = 0; n < count; n++){
      var boundary = boundaries.at(n);
      var positionCount = boundary.positionCount();
      var positions = boundary.positions();
      var positionIndex = 0;
      for(var i = 0; i < positionCount; i++){
         var x = positions[positionIndex++] * MO.Lang.Const.DEGREE_RATE;
         var y = positions[positionIndex++] * MO.Lang.Const.DEGREE_RATE;
         vertexData[vertexIndex++] = Math.sin(x) * Math.cos(y) * scaleBottom;
         vertexData[vertexIndex++] = Math.sin(y) * scaleBottom;
         vertexData[vertexIndex++] = -Math.cos(x) * Math.cos(y) * scaleBottom;
         colors[colorIndex++] = 0x00;
         colors[colorIndex++] = 0x00;
         colors[colorIndex++] = 0x00;
         colors[colorIndex++] = 0xFF;
         coordData[coordIndex++] = 0;
         coordData[coordIndex++] = 0;
      }
      vertexStart += positionCount;
   }
   // 建立边缘数据
   var vertexStart = 0;
   for(var n = 0; n < count; n++){
      var boundary = boundaries.at(n);
      // 填充顶点
      var positionCount = boundary.positionCount();
      // 填充三角索引
      for(var i = 0; i < positionCount; i++){
         if(i == positionCount - 1){
            faceData[faceIndex++] = layerUpStart   + vertexStart + i;
            faceData[faceIndex++] = layerUpStart   + vertexStart;
            faceData[faceIndex++] = layerDownStart + vertexStart + i;
            faceData[faceIndex++] = layerUpStart   + vertexStart;
            faceData[faceIndex++] = layerDownStart + vertexStart;
            faceData[faceIndex++] = layerDownStart + vertexStart + i;
         }else{
            faceData[faceIndex++] = layerUpStart   + vertexStart + i;
            faceData[faceIndex++] = layerUpStart   + vertexStart + i + 1;
            faceData[faceIndex++] = layerDownStart + vertexStart + i;
            faceData[faceIndex++] = layerUpStart   + vertexStart + i + 1;
            faceData[faceIndex++] = layerDownStart + vertexStart + i + 1;
            faceData[faceIndex++] = layerDownStart + vertexStart + i;
         }
      }
      // 修正位置
      vertexStart += positionCount;
   }
   // 创建三角面渲染对象
   var renderable = o._faceRenderable = MO.Class.create(MO.FE3dDataBox);
   renderable._name = 'face';
   renderable._shape = o;
   renderable.linkGraphicContext(context);
   renderable.setOptionColor(true);
   renderable.setOptionCoord(true);
   //renderable.setOptionNormal(true);
   renderable.setVertexCount(vertexTotal * 3);
   renderable.setup();
   //renderable.color().setHex('#0A5294');
   renderable.vertexPositionBuffer().upload(vertexData, 4 * 3, vertexSum, true);
   renderable.vertexColorBuffer().upload(colors, 1 * 4, vertexSum, true);
   renderable.vertexCoordBuffer().upload(coordData, 4 * 2, vertexSum, true);
   var indexBuffer = renderable.indexBuffer();
   indexBuffer.setStrideCd(MO.EG3dIndexStride.Uint32);
   indexBuffer.upload(faceData, faceIndex, true);
}

//==========================================================
// <T>建立几何体边线。</T>
//
// @method
//==========================================================
MO.FE3dBoundaryShape3d_buildBorder = function FE3dBoundaryShape3d_buildBorder(){
   var o = this;
   var context = o._graphicContext;
   //var color = o._color;
   var scaleTop = o._scaleTop * 1.0008;
   var scaleBottom = o._scaleBottom;
   var boundaries = o._polygons;
   var count = boundaries.count();
   var vertexTotal = o._vertexTotal;
   var indexTotal = o._indexTotal;
   // 填充点缓冲
   var vertexStart = 0;
   var vertexIndex = 0;
   var faceIndex = 0;
   var vertexData = new Float32Array(3 * vertexTotal * 2);
   var colorIndex = 0;
   var colors = new Uint8Array(4 * vertexTotal * 2);
   var borderIndex = 0;
   var borderData = new Uint32Array(2 * vertexTotal + 2 * vertexTotal);
   for(var n = 0; n < count; n++){
      var boundary = boundaries.at(n);
      // 填充顶点
      var positionCount = boundary.positionCount();
      var positions = boundary.positions();
      var positionIndex = 0;
      for(var i = 0; i < positionCount; i++){
         var x = positions[positionIndex++] / 180 * Math.PI;
         var y = positions[positionIndex++] / 180 * Math.PI;
         vertexData[vertexIndex++] = (Math.sin(x) * Math.cos(y)) * scaleTop;
         vertexData[vertexIndex++] = (Math.sin(y)) * scaleTop;
         vertexData[vertexIndex++] = (-Math.cos(x) * Math.cos(y)) * scaleTop;
      }
      // 填充线索引
      for(var i = 0; i < positionCount; i++){
         borderData[borderIndex++] = vertexStart + i;
         if(i == positionCount - 1){
            borderData[borderIndex++] = vertexStart;
         }else{
            borderData[borderIndex++] = vertexStart + i + 1;
         }
      }
      // 修正位置
      vertexStart += positionCount;
   }
   var layerStart = vertexStart;
   // 建立下层数据
   for(var n = 0; n < count; n++){
      var boundary = boundaries.at(n);
      // 填充顶点
      var positionCount = boundary.positionCount();
      var positions = boundary.positions();
      var positionIndex = 0;
      for(var i = 0; i < positionCount; i++){
         var x = positions[positionIndex++] / 180 * Math.PI;
         var y = positions[positionIndex++] / 180 * Math.PI;
         vertexData[vertexIndex++] = (Math.sin(x) * Math.cos(y)) * scaleBottom;
         vertexData[vertexIndex++] = (Math.sin(y)) * scaleBottom;
         vertexData[vertexIndex++] = (-Math.cos(x) * Math.cos(y)) * scaleBottom;
      }
      // 修正位置
      vertexStart += positionCount;
   }
   // 建立边缘数据
   var vertexStart = 0;
   for(var n = 0; n < count; n++){
      var boundary = boundaries.at(n);
      // 填充顶点
      var positionCount = boundary.positionCount();
      // 填充三角索引
      for(var i = 0; i < positionCount; i++){
         borderData[borderIndex++] = vertexStart + i;
         borderData[borderIndex++] = vertexStart + i + layerStart;
      }
      // 修正位置
      vertexStart += positionCount;
   }
   // 创建三角边渲染对象
   for(var i = 0; i < vertexTotal; i++){
      colors[colorIndex++] = 0x42;
      colors[colorIndex++] = 0x9A;
      colors[colorIndex++] = 0xF9;
      colors[colorIndex++] = 0xFF;
   }
   for(var i = 0; i < vertexTotal; i++){
      colors[colorIndex++] = 0x00;
      colors[colorIndex++] = 0x00;
      colors[colorIndex++] = 0x00;
      colors[colorIndex++] = 0xFF;
   }
   var renderable = o._borderRenderable = MO.Class.create(MO.FE3dDataBox);
   renderable._name = 'border';
   renderable._shape = o;
   renderable.linkGraphicContext(context);
   renderable.setup();
   renderable.setVertexCount(vertexTotal * 2);
   renderable.vertexPositionBuffer().upload(vertexData, 4 * 3, vertexTotal * 2, true);
   renderable.vertexColorBuffer().upload(colors, 1 * 4, vertexTotal * 2, true);
   var indexBuffer = renderable.indexBuffer();
   indexBuffer.setDrawModeCd(MO.EG3dDrawMode.Lines);
   indexBuffer.setStrideCd(MO.EG3dIndexStride.Uint32);
   indexBuffer.setLineWidth(1);
   indexBuffer.upload(borderData, borderIndex, true);
   renderable.material().info().effectCode = 'eai.map.face';
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FE3dBoundaryShape3d_build = function FE3dBoundaryShape3d_build(context){
   var o = this;
   // 计算总点数
   var vertexTotal = 0;
   var indexTotal = 0;
   var boundaries = o._polygons;
   var count = boundaries.count();
   for(var i = 0; i < count; i++){
      var boundary = boundaries.at(i);
      vertexTotal += boundary.positionCount();
      indexTotal += boundary.indexes().length;
   }
   o._vertexTotal = vertexTotal;
   o._indexTotal = indexTotal;
   // 建立表面
   o.buildFace(context);
   // 建立边线
   o.buildBorder(context);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FE3dBoundaryShape3d_dispose = function FE3dBoundaryShape3d_dispose(){
   var o = this;
   // 释放属性
   o._polygons = MO.Lang.Object.dispose(o._polygons);
   // 父处理
   o.__base.FObject.dispose.call(o);
}
