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
      o._mapEntity        = RClass.register(o, new AGetSet('_mapEntity'));
      o._data             = RClass.register(o, new AGetSet('_data'));
      o._faceRenderable   = RClass.register(o, new AGetter('_faceRenderable'));
      o._borderRenderable = RClass.register(o, new AGetter('_borderRenderable'));
      // @attribute
      o._layerDepth       = 3;
      // @attribute
      o._focusTick        = 0;
      o._focusInterval    = 10;
      o._focusCurrent     = 0;
      o._focusCount       = 100;
      //..........................................................
      // @method
      o.construct         = FEaiProvinceEntity_construct;
      // @method
      o.buildFace         = FEaiProvinceEntity_buildFace;
      o.buildBorder       = FEaiProvinceEntity_buildBorder;
      o.build             = FEaiProvinceEntity_build;
      // @method
      o.doInvestment      = FEaiProvinceEntity_doInvestment;
      o.updateColor       = FEaiProvinceEntity_updateColor;
      o.update            = FEaiProvinceEntity_update;
      o.process           = FEaiProvinceEntity_process;
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
         colors[colorIndex++] = 0x08;
         colors[colorIndex++] = 0x0D;
         colors[colorIndex++] = 0x19;
         colors[colorIndex++] = 0xFF;
      }
      // 创建三角面渲染对象
      var renderable = o._faceRenderable = MO.RClass.create(MO.FE3dDataBox);
      renderable.linkGraphicContext(context);
      renderable.setup();
      renderable.vertexPositionBuffer().upload(vertexData, 4 * 3, vertexTotal * 2);
      renderable.vertexColorBuffer().upload(colors, 1 * 4, vertexTotal * 2);
      renderable.indexBuffer().upload(faceData, faceIndex);
      renderable.material().info().optionDouble = true;
      //renderable.setMaterialReference(o._mapEntity);
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
         colors[colorIndex++] = 0x00;
         colors[colorIndex++] = 0xC1;
         colors[colorIndex++] = 0xED;
         colors[colorIndex++] = 0xFF;
      }
      for(var i = 0; i < vertexTotal; i++){
         colors[colorIndex++] = 0x0B;
         colors[colorIndex++] = 0x11;
         colors[colorIndex++] = 0x23;
         colors[colorIndex++] = 0xFF;
      }
      var renderable = o._borderRenderable = MO.RClass.create(MO.FE3dDataBox);
      renderable.linkGraphicContext(context);
      renderable.setup();
      renderable.vertexPositionBuffer().upload(vertexData, 4 * 3, vertexTotal * 2);
      renderable.vertexColorBuffer().upload(colors, 1 * 4, vertexTotal * 2);
      renderable.indexBuffer().setDrawModeCd(MO.EG3dDrawMode.Lines);
      renderable.indexBuffer().setLineWidth(1);
      renderable.indexBuffer().upload(borderData, borderIndex);
      //renderable.setMaterialReference();
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
   MO.FEaiProvinceEntity_doInvestment = function FEaiProvinceEntity_doInvestment(){
      var o = this;
      o._focusTick = 0;
      o._focusCurrent = o._focusCount;
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
   // <T>从输入流反序列化数据。</T>
   //
   // @method
   // @param input:MStream 输入流
   //==========================================================
   MO.FEaiProvinceEntity_updateColor = function FEaiProvinceEntity_updateColor(rate){
      var o = this;
      var rate = o._focusCurrent / 100;
      var vertexTotal = o._vertexTotal;
      var colorIndex = 0;
      var colors = MO.TypeArray.findTemp(EDataType.Uint8, 4 * vertexTotal * 2);
      var positionTotal = vertexTotal * 2;
      for(var i = 0; i < positionTotal; i++){
         colors[colorIndex++] = 0x08 + ((0xFF - 0x08)* rate);
         colors[colorIndex++] = 0x0D + ((0x4D - 0x08)* rate);
         colors[colorIndex++] = 0x19 + ((0x59 - 0x08)* rate);
         colors[colorIndex++] = 0xFF;
      }
      // 创建三角面渲染对象
      o._faceRenderable.vertexColorBuffer().upload(colors, 1 * 4, vertexTotal * 2);
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
         var tick = RTimer.current();
         if(tick - o._focusTick > o._focusInterval){
            var z = -o._focusCurrent / 20;
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
