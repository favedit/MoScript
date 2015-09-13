//==========================================================
// <T>全国省份实体类。</T>
//
// @class
// @author maocy
// @history 150619
//==========================================================
MO.FEaiProvince3dEntity = function FEaiProvince3dEntity(o){
   o = MO.Class.inherits(this, o, MO.FEaiEntity);
   //..........................................................
   // @attribute
   o._data             = MO.Class.register(o, new MO.AGetSet('_data'));
   o._outline2         = MO.Class.register(o, new MO.AGetter('_outline2'));
   o._resource         = MO.Class.register(o, new MO.AGetSet('_resource'));
   o._boundaryShape    = MO.Class.register(o, new MO.AGetter('_boundaryShape'));
   o._faceRenderable   = MO.Class.register(o, new MO.AGetter('_faceRenderable'));
   o._borderRenderable = MO.Class.register(o, new MO.AGetter('_borderRenderable'));
   // @attribute
   o._layerDepth       = 3;
   // @attribute
   o._currentZ         = MO.Class.register(o, new MO.AGetter('_currentZ'), 0);
   // @attribute
   o._focusTick        = 0;
   o._focusInterval    = 10;
   o._focusCurrent     = 0;
   o._focusColor       = null;
   o._focusCount       = 200;
   //..........................................................
   // @method
   o.construct         = MO.FEaiProvince3dEntity_construct;
   // @method
   o.setup             = MO.FEaiProvince3dEntity_setup;
   // @method
   o.buildFace         = MO.FEaiProvince3dEntity_buildFace;
   o.buildBorder       = MO.FEaiProvince3dEntity_buildBorder;
   o.build             = MO.FEaiProvince3dEntity_build;
   // @method
   o.doInvestment      = MO.FEaiProvince3dEntity_doInvestment;
   o.updateColor       = MO.FEaiProvince3dEntity_updateColor;
   o.update            = MO.FEaiProvince3dEntity_update;
   o.process           = MO.FEaiProvince3dEntity_process;
   o.reset             = MO.FEaiProvince3dEntity_reset;
   // @method
   o.dispose           = MO.FEaiProvince3dEntity_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiProvince3dEntity_construct = function FEaiProvince3dEntity_construct(){
   var o = this;
   o.__base.FEaiEntity.construct.call(o);
   // 设置属性
   o._outline2 = new MO.SOutline2d();
   var colors = o._focusColors = new Array();
   colors[0] = [0x28, 0x42, 0xB4];
   colors[1] = [0x28, 0x42, 0xB4];
   colors[2] = [0x1B, 0xA2, 0xBC];
   colors[3] = [0xFF, 0xDF, 0x6F];
   colors[4] = [0xFF, 0x6B, 0x49];
   colors[5] = [0xFF, 0x6B, 0x49];
}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiProvince3dEntity_setup = function FEaiProvince3dEntity_setup() {
   var o = this;
   // 创建边框
   var shape = o._boundaryShape = MO.Class.create(MO.FE3dBoundaryShape3d);
   shape._entity = o;
   shape.setScaleTop(1.01);
   shape.setScaleBottom(0.8);
   shape.linkGraphicContext(o);
}

//==========================================================
// <T>建立几何体表面。</T>
//
// @method
// @param context:FGraphicContext 图形环境
//==========================================================
MO.FEaiProvince3dEntity_buildFace = function FEaiProvince3dEntity_buildFace(context){
   var o = this;
   var boundaries = o._data.boundaries();
   var count = boundaries.count();
   var vertexTotal = o._vertexTotal;
   var indexTotal = o._indexTotal;
   var color = o._color;
   // 设置变量
   var vertexStart = 0;
   var vertexIndex = 0;
   var vertexData = new Float32Array(3 * vertexTotal * 2);
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
         var x = positions[positionIndex++] / 180 * Math.PI;
         var y = positions[positionIndex++] / 180 * Math.PI;
         vertexData[vertexIndex++] = (Math.sin(x) * Math.cos(y)) * 1.01;
         vertexData[vertexIndex++] = (Math.sin(y)) * 1.01;
         vertexData[vertexIndex++] = (-Math.cos(x) * Math.cos(y)) * 1.01;
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
      //for(var i = 0; i < indexCount; i++){
      //   faceData[faceIndex++] = vertexStart + indexes[i];
      //}
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
         vertexData[vertexIndex++] = Math.sin(x) * Math.cos(y);
         vertexData[vertexIndex++] = Math.sin(y);
         vertexData[vertexIndex++] = -Math.cos(x) * Math.cos(y);
      }
      // 填充三角索引
      //var indexes = boundary.indexes();
      //var indexCount = indexes.length;
      //for(var i = 0; i < indexCount; i++){
      //   faceData[faceIndex++] = vertexStart + indexes[i];
      //}
      // 修正位置
      //vertexStart += positionCount;
   }
   // 建立边缘数据
   //var vertexStart = 0;
   //for(var n = 0; n < count; n++){
   //   var boundary = boundaries.at(n);
   //   // 填充顶点
   //   var positionCount = boundary.positionCount();
   //   // 填充三角索引
   //   for(var i = 0; i < positionCount; i++){
   //      if(i == positionCount - 1){
   //         faceData[faceIndex++] = vertexStart + i;
   //         faceData[faceIndex++] = vertexStart + 0;
   //         faceData[faceIndex++] = vertexStart + i + layerStart;
   //         faceData[faceIndex++] = vertexStart + 0;
   //         faceData[faceIndex++] = vertexStart + layerStart;
   //         faceData[faceIndex++] = vertexStart + i + layerStart;
   //      }else{
   //         faceData[faceIndex++] = vertexStart + i;
   //         faceData[faceIndex++] = vertexStart + i + 1;
   //         faceData[faceIndex++] = vertexStart + i + layerStart;
   //         faceData[faceIndex++] = vertexStart + i + 1;
   //         faceData[faceIndex++] = vertexStart + i + layerStart + 1;
   //         faceData[faceIndex++] = vertexStart + i + layerStart;
   //      }
   //   }
   //   // 修正位置
   //   vertexStart += positionCount;
   //}
   var colorIndex = 0;
   var colors = o.colorsData = new Uint8Array(4 * vertexTotal * 2);
   var positionTotal = vertexTotal * 2;
   for(var i = 0; i < positionTotal; i++){
      colors[colorIndex++] = 0xFF;
      colors[colorIndex++] = 0xFF;
      colors[colorIndex++] = 0xFF;
      colors[colorIndex++] = 0xFF;
   }
   // 创建三角面渲染对象
   var renderable = o._faceRenderable = MO.Class.create(MO.FE3dDataBox);
   renderable.setVertexCount(vertexTotal * 2);
   renderable.linkGraphicContext(context);
   renderable.setup();
   renderable.color().setHex('#080D19');
   //renderable.color().setHex('#FFFFFF');
   //renderable.color().setHex('#8F8080');
   renderable.vertexPositionBuffer().upload(vertexData, 4 * 3, vertexTotal * 2, true);
   renderable.vertexColorBuffer().upload(colors, 1 * 4, vertexTotal * 2, true);
   renderable.indexBuffer().setStrideCd(MO.EG3dIndexStride.Uint32);
   renderable.indexBuffer().upload(faceData, faceIndex, true);
   renderable.material().info().effectCode = 'eai.map.face';
   renderable.material().info().optionDouble = true;
}

//==========================================================
// <T>建立几何体边线。</T>
//
// @method
// @param context:FGraphicContext 图形环境
//==========================================================
MO.FEaiProvince3dEntity_buildBorder = function FEaiProvince3dEntity_buildBorder(context){
   var o = this;
   var boundaries = o._data.boundaries();
   var count = boundaries.count();
   var vertexTotal = o._vertexTotal;
   var indexTotal = o._indexTotal;
   var color = o._color;
   // 填充点缓冲
   var vertexStart = 0;
   var vertexIndex = 0;
   var faceIndex = 0;
   var vertexData = new Float32Array(3 * vertexTotal * 2);
   var borderIndex = 0;
   var borderData = new Uint16Array(2 * vertexTotal + 2 * vertexTotal);
   for(var n = 0; n < count; n++){
      var boundary = boundaries.at(n);
      // 填充顶点
      var positionCount = boundary.positionCount();
      var positions = boundary.positions();
      var positionIndex = 0;
      for(var i = 0; i < positionCount; i++){
         var x = positions[positionIndex++] / 180 * Math.PI;
         var y = positions[positionIndex++] / 180 * Math.PI;
         vertexData[vertexIndex++] = (Math.sin(x) * Math.cos(y)) * 1.001;
         vertexData[vertexIndex++] = (Math.sin(y)) * 1.001;
         vertexData[vertexIndex++] = (-Math.cos(x) * Math.cos(y)) * 1.001;
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
         vertexData[vertexIndex++] = (Math.sin(x) * Math.cos(y)) * 0.9;
         vertexData[vertexIndex++] = (Math.sin(y)) * 0.9;
         vertexData[vertexIndex++] = (-Math.cos(x) * Math.cos(y)) * 0.9;
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
      colors[colorIndex++] = 0x00;
      colors[colorIndex++] = 0xB5;
      colors[colorIndex++] = 0xF6;
      colors[colorIndex++] = 0xFF;
   }
   for(var i = 0; i < vertexTotal; i++){
      colors[colorIndex++] = 0x0B;
      colors[colorIndex++] = 0x11;
      colors[colorIndex++] = 0x23;
      colors[colorIndex++] = 0xFF;
   }
   var renderable = o._borderRenderable = MO.Class.create(MO.FE3dDataBox);
   renderable.linkGraphicContext(context);
   renderable.setup();
   renderable.setVertexCount(vertexTotal * 2);
   renderable.vertexPositionBuffer().upload(vertexData, 4 * 3, vertexTotal * 2, true);
   renderable.vertexColorBuffer().upload(colors, 1 * 4, vertexTotal * 2, true);
   renderable.indexBuffer().setDrawModeCd(MO.EG3dDrawMode.Lines);
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
MO.FEaiProvince3dEntity_build = function FEaiProvince3dEntity_build(context){
   var o = this;
   var data = o._data;
   var boundaries = data.boundaries();
   var outline = o._outline2;
   outline.setMin();
   // 建立边界数据
   var shape = o._boundaryShape;
   var count = boundaries.count()
   for(var i = 0; i < count; i++){
      // 增加轮廓
      var boundary = boundaries.at(i);
      shape.pushPolygon(boundary);
      // 计算轮廓
      var positionCount = boundary.positionCount();
      var positions = boundary.positions();
      var positionIndex = 0;
      for(var pi = 0; pi < positionCount; pi++){
         var x = 180 - positions[positionIndex++];
         var y = positions[positionIndex++];
         outline.mergeMax2(x, y);
      }
   }
   outline.update();
   // 建立对象
   shape.build();
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param level:Integer 投资级别
// @param investment:Number 投资额
//==========================================================
MO.FEaiProvince3dEntity_doInvestment = function FEaiProvince3dEntity_doInvestment(level, investment){
   var o = this;
   o._focusTick = 0;
   o._focusCurrent = o._focusCount;
   o._focusColor = o._focusColors[level];
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiProvince3dEntity_update = function FEaiProvince3dEntity_update(data){
   var o = this;
   var investmentTotal = data.investmentTotal();
   var rate = Math.sqrt(investmentTotal) / 100;
   if(rate > 255){
      rate = 255;
   }
   //var colorIndex = 0;
   //var colors = o.colorsData;
   //for(var i = 0; i < o._vertexTotal; i++){
   //   colors[colorIndex++] = rate;
   //   colors[colorIndex++] = 0;
   //   colors[colorIndex++] = 0;
   //   colors[colorIndex++] = 255;
   //}
   //var renderable = o._faceRenderable;
   //renderable.vertexColorBuffer().upload(colors, 1 * 4, o._vertexTotal);
   //var material = renderable.material();
   //material.info().ambientColor.set(rate, rate, rate, 1);
   //material.update();
   //var renderable = o._borderRenderable;
   //var material = renderable.material();
   //material.info().ambientColor.set(rate, rate, rate, 1);
   //material.update();
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiProvince3dEntity_updateColor = function FEaiProvince3dEntity_updateColor(rate){
   var o = this;
   var color = o._focusColor;
   var rate = o._focusCurrent / o._focusCount;
   // 计算颜色
   var red = 0x08 + ((color[0] - 0x08)* rate);
   var green = 0x0D + ((color[1] - 0x0D)* rate);
   var blue = 0x19 + ((color[2] - 0x19)* rate);
   var alpha = 0xFF;
   o._faceRenderable.color().set(red / 255, green / 255, blue / 255, alpha / 255);
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiProvince3dEntity_process = function FEaiProvince3dEntity_process(){
   var o = this;
   if(o._focusCurrent > 0){
      var tick = MO.Timer.current();
      if(tick - o._focusTick > o._focusInterval){
         var z = o._currentZ = -o._focusCurrent / 60;
         // 设置坐标
         faceRenderable = o._faceRenderable;
         matrix = faceRenderable.matrix();
         matrix.tz = z;
         matrix.updateForce();
         borderRenderable = o._borderRenderable;
         matrix = borderRenderable.matrix();
         matrix.tz = z;
         matrix.updateForce();
         // 更新颜色
         o.updateColor(o._focusCurrent);
         // 更新数据
         o._focusCurrent--;
         o._focusTick = tick;
      }
   }
}

//==========================================================
// <T>重置处理。</T>
//
// @method
//==========================================================
MO.FEaiProvince3dEntity_reset = function FEaiProvince3dEntity_reset(){
   var o = this;
   o._currentZ = 0;
   o._focusTick = 0;
   o._focusCurrent = 0;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiProvince3dEntity_dispose = function FEaiProvince3dEntity_dispose(){
   var o = this;
   // 父处理
   o.__base.FEaiEntity.dispose.call(o);
}
