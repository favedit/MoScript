//==========================================================
// <T>全国省份实体类。</T>
//
// @class
// @author maocy
// @history 150619
//==========================================================
MO.FEaiProvinceEntity = function FEaiProvinceEntity(o){
   o = MO.Class.inherits(this, o, MO.FEaiEntity);
   //..........................................................
   // @attribute
   o._mapEntity        = MO.Class.register(o, new MO.AGetSet('_mapEntity'));
   o._data             = MO.Class.register(o, new MO.AGetSet('_data'));
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
   o.construct         = MO.FEaiProvinceEntity_construct;
   // @method
   o.buildFace         = MO.FEaiProvinceEntity_buildFace;
   o.buildBorder       = MO.FEaiProvinceEntity_buildBorder;
   o.build             = MO.FEaiProvinceEntity_build;
   // @method
   o.doInvestment      = MO.FEaiProvinceEntity_doInvestment;
   o.updateColor       = MO.FEaiProvinceEntity_updateColor;
   o.update            = MO.FEaiProvinceEntity_update;
   o.process           = MO.FEaiProvinceEntity_process;
   o.reset             = MO.FEaiProvinceEntity_reset;
   // @method
   o.dispose           = MO.FEaiProvinceEntity_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiProvinceEntity_construct = function FEaiProvinceEntity_construct(){
   var o = this;
   o.__base.FEaiEntity.construct.call(o);
   var colors = o._focusColors = new Array();
   colors[0] = [0x28, 0x42, 0xB4];
   colors[1] = [0x28, 0x42, 0xB4];
   colors[2] = [0x1B, 0xA2, 0xBC];
   colors[3] = [0xFF, 0xDF, 0x6F];
   colors[4] = [0xFF, 0x6B, 0x49];
   colors[5] = [0xFF, 0x6B, 0x49];
}

//==========================================================
// <T>建立几何体表面。</T>
//
// @method
// @param context:FGraphicContext 图形环境
//==========================================================
MO.FEaiProvinceEntity_buildFace = function FEaiProvinceEntity_buildFace(context){
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
         //var x = positions[positionIndex++] / 180 * Math.PI;
         //var y = positions[positionIndex++] / 180 * Math.PI;
         //vertexData[vertexIndex++] = (Math.sin(x) * Math.cos(y)) * 1.01;
         //vertexData[vertexIndex++] = (Math.sin(y)) * 1.01;
         //vertexData[vertexIndex++] = (-Math.cos(x) * Math.cos(y)) * 1.01;
         vertexData[vertexIndex++] = positions[positionIndex++];
         vertexData[vertexIndex++] = positions[positionIndex++];
         vertexData[vertexIndex++] = 0;
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
         //var x = positions[positionIndex++] / 180 * Math.PI;
         //var y = positions[positionIndex++] / 180 * Math.PI;
         //vertexData[vertexIndex++] = Math.sin(x) * Math.cos(y);
         //vertexData[vertexIndex++] = Math.sin(y);
         //vertexData[vertexIndex++] = -Math.cos(x) * Math.cos(y);
         vertexData[vertexIndex++] = positions[positionIndex++];
         vertexData[vertexIndex++] = positions[positionIndex++];
         vertexData[vertexIndex++] = o._layerDepth;
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
   var vertexStart = 0;
   for(var n = 0; n < count; n++){
      continue;
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
   renderable.vertexPositionBuffer().upload(vertexData, 4 * 3, vertexTotal * 2, true);
   renderable.vertexColorBuffer().upload(colors, 1 * 4, vertexTotal * 2, true);
   renderable.indexBuffer().setStrideCd(MO.EG3dIndexStride.Uint32);
   renderable.indexBuffer().upload(faceData, faceIndex, true);
   renderable.material().info().effectCode = 'eai.map.face';
   //renderable.material().info().optionDouble = true;
   //renderable.setMaterialReference(o._mapEntity);
}

//==========================================================
// <T>建立几何体边线。</T>
//
// @method
// @param context:FGraphicContext 图形环境
//==========================================================
MO.FEaiProvinceEntity_buildBorder = function FEaiProvinceEntity_buildBorder(context){
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
         //var x = positions[positionIndex++] / 180 * Math.PI;
         //var y = positions[positionIndex++] / 180 * Math.PI;
         //vertexData[vertexIndex++] = (Math.sin(x) * Math.cos(y)) * 1.001;
         //vertexData[vertexIndex++] = (Math.sin(y)) * 1.001;
         //vertexData[vertexIndex++] = (-Math.cos(x) * Math.cos(y)) * 1.001;
         vertexData[vertexIndex++] = positions[positionIndex++];
         vertexData[vertexIndex++] = positions[positionIndex++];
         vertexData[vertexIndex++] = 0;
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
         //var x = positions[positionIndex++] / 180 * Math.PI;
         //var y = positions[positionIndex++] / 180 * Math.PI;
         //vertexData[vertexIndex++] = (Math.sin(x) * Math.cos(y)) * 0.9;
         //vertexData[vertexIndex++] = (Math.sin(y)) * 0.9;
         //vertexData[vertexIndex++] = (-Math.cos(x) * Math.cos(y)) * 0.9;
         vertexData[vertexIndex++] = positions[positionIndex++];
         vertexData[vertexIndex++] = positions[positionIndex++];
         vertexData[vertexIndex++] = o._layerDepth;
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
         //borderData[borderIndex++] = vertexStart + i;
         //borderData[borderIndex++] = vertexStart + i + layerStart;
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
MO.FEaiProvinceEntity_build = function FEaiProvinceEntity_build(context){
   var o = this;
   // 计算总点数
   var vertexTotal = 0;
   var indexTotal = 0;
   var boundaries = o._data.boundaries();
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
// @param level:Integer 投资级别
// @param investment:Number 投资额
//==========================================================
MO.FEaiProvinceEntity_doInvestment = function FEaiProvinceEntity_doInvestment(level, investment){
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
MO.FEaiProvinceEntity_update = function FEaiProvinceEntity_update(data){
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
MO.FEaiProvinceEntity_updateColor = function FEaiProvinceEntity_updateColor(rate){
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
MO.FEaiProvinceEntity_process = function FEaiProvinceEntity_process(){
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
MO.FEaiProvinceEntity_reset = function FEaiProvinceEntity_reset(){
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
MO.FEaiProvinceEntity_dispose = function FEaiProvinceEntity_dispose(){
   var o = this;
   // 父处理
   o.__base.FEaiEntity.dispose.call(o);
}
