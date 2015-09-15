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
   o._optionSphere     = false;
   o._scaleTop         = MO.Class.register(o, new MO.AGetSet('_scaleTop'), 1);
   o._scaleBottom      = MO.Class.register(o, new MO.AGetSet('_scaleBottom'), 0.9);
   o._faceColor        = MO.Class.register(o, new MO.AGetter('_faceColor'));
   o._color            = MO.Class.register(o, new MO.AGetter('_color'));
   o._polygons         = MO.Class.register(o, new MO.AGetter('_polygons'));
   // @attribute
   o._faceEffectCode   = MO.Class.register(o, new MO.AGetSet('_faceEffectCode'));
   o._faceRenderable   = MO.Class.register(o, new MO.AGetter('_faceRenderable'));
   o._borderEffectCode = MO.Class.register(o, new MO.AGetSet('_borderEffectCode'));
   o._borderRenderable = MO.Class.register(o, new MO.AGetter('_borderRenderable'));
   //..........................................................
   // @method
   o.construct         = MO.FE3dBoundaryShape3d_construct;
   // @method
   o.pushPolygon       = MO.FE3dBoundaryShape3d_pushPolygon;
   o.buildFace         = MO.FE3dBoundaryShape3d_buildFace;
   o.buildBorder       = MO.FE3dBoundaryShape3d_buildBorder;
   o.build             = MO.FE3dBoundaryShape3d_build;
   // @method
   o.buildFlat         = MO.FE3dBoundaryShape3d_buildFlat;
   o.buildSphere       = MO.FE3dBoundaryShape3d_buildSphere;
   // @method
   o.dispose           = MO.FE3dBoundaryShape3d_dispose;
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
   var color = o._color;
   var scaleTop = o._scaleTop;
   var scaleBottom = o._scaleBottom;
   var boundaries = o._polygons;
   var count = boundaries.count();
   var vertexTotal = o._vertexTotal;
   var indexTotal = o._indexTotal;
   // 设置变量
   var vertexStart = 0;
   var vertexIndex = 0;
   var vertexData = new Float32Array(3 * vertexTotal * 2);
   var coordIndex = 0;
   var coordData = new Float32Array(2 * vertexTotal * 2);
   var faceIndex = 0;
   var faceData = new Uint32Array(indexTotal + 3 * 2 * vertexTotal);
   // 建立上层数据
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
         coordData[coordIndex++] = cx / 360 + 0.5;
         coordData[coordIndex++] = 0.5 - cy / 180;
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
   var layerStart = vertexStart;
   // 建立下层数据
   for(var n = 0; n < count; n++){
      var boundary = boundaries.at(n);
      // 填充顶点
      var positionCount = boundary.positionCount();
      var positions = boundary.positions();
      var positionIndex = 0;
      for(var i = 0; i < positionCount; i++){
         var x = positions[positionIndex++] * MO.Lang.Const.DEGREE_RATE;
         var y = positions[positionIndex++] * MO.Lang.Const.DEGREE_RATE;
         vertexData[vertexIndex++] = (Math.sin(x) * Math.cos(y)) * scaleBottom;
         vertexData[vertexIndex++] = (Math.sin(y)) * scaleBottom;
         vertexData[vertexIndex++] = (-Math.cos(x) * Math.cos(y)) * scaleBottom;
         coordData[coordIndex++] = x;
         coordData[coordIndex++] = y;
      }
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
            faceData[faceIndex++] = vertexStart + i;
            faceData[faceIndex++] = vertexStart + 0;
            faceData[faceIndex++] = vertexStart + i + layerStart;
            faceData[faceIndex++] = vertexStart + 0;
            faceData[faceIndex++] = vertexStart + layerStart;
            faceData[faceIndex++] = vertexStart + i + layerStart;
         }else{
            faceData[faceIndex++] = vertexStart + i;
            faceData[faceIndex++] = vertexStart + i + 1;
            faceData[faceIndex++] = vertexStart + i + layerStart;
            faceData[faceIndex++] = vertexStart + i + 1;
            faceData[faceIndex++] = vertexStart + i + layerStart + 1;
            faceData[faceIndex++] = vertexStart + i + layerStart;
         }
      }
      // 修正位置
      vertexStart += positionCount;
   }
   var colorIndex = 0;
   var colors = o.colorsData = new Uint8Array(4 * vertexTotal * 2);
   var positionTotal = vertexTotal * 2;
   for(var i = 0; i < positionTotal; i++){
      colors[colorIndex++] = (faceColor.red * 255) & 0xFF;
      colors[colorIndex++] = (faceColor.green * 255) & 0xFF;
      colors[colorIndex++] = (faceColor.blue * 255) & 0xFF;
      colors[colorIndex++] = (faceColor.alpha * 255) & 0xFF;
   }
   // 创建三角面渲染对象
   var renderable = o._faceRenderable = MO.Class.create(MO.FE3dDataBox);
   renderable._shape = o;
   renderable.linkGraphicContext(context);
   renderable.setOptionColor(true);
   renderable.setOptionCoord(true);
   //renderable.setOptionNormal(true);
   renderable.setVertexCount(vertexTotal * 2);
   renderable.setup();
   renderable.color().setHex('#0A5294');
   renderable.vertexPositionBuffer().upload(vertexData, 4 * 3, vertexTotal * 2, true);
   renderable.vertexColorBuffer().upload(colors, 1 * 4, vertexTotal * 2, true);
   renderable.vertexCoordBuffer().upload(coordData, 4 * 2, vertexTotal * 2, true);
   //renderable.vertexNormalBuffer().upload(colors, 1 * 4, vertexTotal * 2, true);
   renderable.indexBuffer().setStrideCd(MO.EG3dIndexStride.Uint32);
   renderable.indexBuffer().upload(faceData, faceIndex, true);
   //renderable._material = o._worldEntity.material();
   //renderable._texture = o._worldEntity.material()._textures;
}

//==========================================================
// <T>建立几何体边线。</T>
//
// @method
//==========================================================
MO.FE3dBoundaryShape3d_buildBorder = function FE3dBoundaryShape3d_buildBorder(){
   var o = this;
   var context = o._graphicContext;
   var color = o._color;
   var scaleTop = o._scaleTop * 1.001;
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
   var colorIndex = 0;
   var colors = o.colorsData = new Uint8Array(4 * vertexTotal * 2);
   for(var i = 0; i < vertexTotal; i++){
      colors[colorIndex++] = 0x22;
      colors[colorIndex++] = 0xA9;
      colors[colorIndex++] = 0xFF;
      colors[colorIndex++] = 0xFF;
   }
   for(var i = 0; i < vertexTotal; i++){
      colors[colorIndex++] = 0x96;
      colors[colorIndex++] = 0xB0;
      colors[colorIndex++] = 0xD6;
      colors[colorIndex++] = 0xFF;
   }
   var renderable = o._borderRenderable = MO.Class.create(MO.FE3dDataBox);
   renderable._shape = o;
   renderable.linkGraphicContext(context);
   renderable.setup();
   renderable.setVertexCount(vertexTotal * 2);
   renderable.vertexPositionBuffer().upload(vertexData, 4 * 3, vertexTotal * 2, true);
   renderable.vertexColorBuffer().upload(colors, 1 * 4, vertexTotal * 2, true);
   renderable.indexBuffer().setDrawModeCd(MO.EG3dDrawMode.Lines);
   renderable.indexBuffer().setStrideCd(MO.EG3dIndexStride.Uint32);
   renderable.indexBuffer().setLineWidth(1);
   renderable.indexBuffer().upload(borderData, borderIndex, true);
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
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FE3dBoundaryShape3d_buildFlat = function FE3dBoundaryShape3d_buildFlat(context){
   var o = this;
   o._optionSphere = false;
   o.build(context)
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FE3dBoundaryShape3d_buildSphere = function FE3dBoundaryShape3d_buildSphere(context){
   var o = this;
   o._optionSphere = true;
   o.build(context)
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FE3dBoundaryShape3d_dispose = function FE3dBoundaryShape3d_dispose(){
   var o = this;
   // 释放属性
   o._polygons = MO.Lang.Obejct.dispose(o._polygons);
   // 父处理
   o.__base.FObject.dispose.call(o);
}
