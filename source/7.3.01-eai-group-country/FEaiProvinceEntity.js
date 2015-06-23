with(MO){
   //==========================================================
   // <T>全国省份实体类。</T>
   //
   // @class
   // @author maocy
   // @history 150619
   //==========================================================
   MO.FEaiProvinceEntity = function FEaiProvinceEntity(o){
      o = RClass.inherits(this, o, FEaiEntity);
      //..........................................................
      // @attribute
      o._data             = RClass.register(o, new AGetSet('_data'));
      o._faceRenderable   = RClass.register(o, new AGetter('_faceRenderable'));
      o._borderRenderable = RClass.register(o, new AGetter('_borderRenderable'));
      // @attribute
      o._layerDepth       = 1;
      //..........................................................
      // @method
      o.construct         = FEaiProvinceEntity_construct;
      // @method
      o.buildFace         = FEaiProvinceEntity_buildFace;
      o.buildBorder       = FEaiProvinceEntity_buildBorder;
      o.build             = FEaiProvinceEntity_build;
      o.update            = FEaiProvinceEntity_update;
      // @method
      o.dispose           = FEaiProvinceEntity_dispose;
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
   }

   //==========================================================
   // <T>从输入流反序列化数据。</T>
   //
   // @method
   // @param input:MStream 输入流
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
      var faceData = new Uint16Array(indexTotal * 2 + 3 * 2 * vertexTotal);
      // 建立上层数据
      for(var n = 0; n < count; n++){
         var boundary = boundaries.at(n);
         // 填充顶点
         var positionCount = boundary.positionCount();
         var positions = boundary.positions();
         var positionIndex = 0;
         for(var i = 0; i < positionCount; i++){
            vertexData[vertexIndex++] = positions[positionIndex++];
            vertexData[vertexIndex++] = positions[positionIndex++];
            vertexData[vertexIndex++] = 0;
         }
         // 填充三角索引
         var indexes = boundary.indexes();
         var indexCount = indexes.length;
         for(var i = 0; i < indexCount; i++){
            faceData[faceIndex++] = vertexStart + indexes[i];
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
            vertexData[vertexIndex++] = positions[positionIndex++];
            vertexData[vertexIndex++] = positions[positionIndex++];
            vertexData[vertexIndex++] = o._layerDepth;
         }
         // 填充三角索引
         var indexes = boundary.indexes();
         var indexCount = indexes.length;
         for(var i = 0; i < indexCount; i++){
            faceData[faceIndex++] = vertexStart + indexes[i];
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
         //colors[colorIndex++] = (color >> 16) & 0x1F;
         //colors[colorIndex++] = (color >>  8) & 0x1F;
         //colors[colorIndex++] = (color      ) & 0x1F;
         colors[colorIndex++] = 0xFF;
         colors[colorIndex++] = 0x9F;
         colors[colorIndex++] = 0x4F;
         colors[colorIndex++] = 255;
      }
      // 创建三角面渲染对象
      var renderable = o._faceRenderable = MO.RClass.create(MO.FE3dDataBox);
      renderable.linkGraphicContext(context);
      renderable.setup();
      renderable.vertexPositionBuffer().upload(vertexData, 4 * 3, vertexTotal * 2);
      renderable.vertexColorBuffer().upload(colors, 1 * 4, vertexTotal * 2);
      renderable.indexBuffer().upload(faceData, faceIndex);
      renderable.material().info().optionDouble = true;
      var matrix = renderable.matrix();
      matrix.tx = -20;
      matrix.ty = -8;
      matrix.setScale(0.2, 0.24, 0.2);
      matrix.update();
   }

   //==========================================================
   // <T>从输入流反序列化数据。</T>
   //
   // @method
   // @param input:MStream 输入流
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
         colors[colorIndex++] = 0x3B;
         colors[colorIndex++] = 0x49;
         colors[colorIndex++] = 0x54;
         colors[colorIndex++] = 255;
      }
      for(var i = 0; i < vertexTotal; i++){
         colors[colorIndex++] = 0x5B;
         colors[colorIndex++] = 0x69;
         colors[colorIndex++] = 0x74;
         colors[colorIndex++] = 255;
      }
      var renderable = o._borderRenderable = MO.RClass.create(MO.FE3dDataBox);
      renderable.linkGraphicContext(context);
      renderable.setup();
      renderable.vertexPositionBuffer().upload(vertexData, 4 * 3, vertexTotal * 2);
      renderable.vertexColorBuffer().upload(colors, 1 * 4, vertexTotal * 2);
      renderable.indexBuffer().setDrawModeCd(MO.EG3dDrawMode.Lines);
      renderable.indexBuffer().setLineWidth(1);
      renderable.indexBuffer().upload(borderData, borderIndex);
      var matrix = renderable.matrix();
      matrix.tx = -20;
      matrix.ty = -8;
      matrix.setScale(0.2, 0.24, 0.2);
      matrix.update();
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
   // @param input:MStream 输入流
   //==========================================================
   MO.FEaiProvinceEntity_update = function FEaiProvinceEntity_update(data){
      var o = this;
      var investmentTotal = data.investmentTotal();
      var rate = Math.sqrt(investmentTotal) / 100;
      //if(rate > 255){
      //   rate = 255;
      //}
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
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiProvinceEntity_dispose = function FEaiProvinceEntity_dispose(){
      var o = this;
      // 父处理
      o.__base.FEaiEntity.dispose.call(o);
   }
}
