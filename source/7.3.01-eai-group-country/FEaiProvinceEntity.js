with(MO){
   //==========================================================
   // <T>全国地图实体类</T>
   //
   // @class
   // @author sunpeng
   // @history 150606
   //==========================================================
   MO.FEaiProvinceEntity = function FEaiProvinceEntity(o){
      o = RClass.inherits(this, o, FEaiEntity);
      //..........................................................
      // @attribute
      o._data             = RClass.register(o, new AGetSet('_data'));
      o._faceRenderable   = RClass.register(o, new AGetter('_faceRenderable'));
      o._borderRenderable = RClass.register(o, new AGetter('_borderRenderable'));
      //..........................................................
      // @method
      o.construct         = FEaiProvinceEntity_construct;
      // @method
      o.build             = FEaiProvinceEntity_build;
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
   MO.FEaiProvinceEntity_build = function FEaiProvinceEntity_build(context){
      var o = this;
      var color = o._color;
      // 获得总点数
      var vertexTotal = 0;
      var indexTotal = 0;
      var boundaries = o._data.boundaries();
      var count = boundaries.count();
      for(var i = 0; i < count; i++){
         var boundary = boundaries.at(i);
         vertexTotal += boundary.positionCount();
         indexTotal += boundary.indexes().length;
      }
      // 填充点缓冲
      var vertexStart = 0;
      var vertexIndex = 0;
      var faceIndex = 0;
      var vertexData = new Float32Array(3 * vertexTotal);
      var faceData = new Uint16Array(indexTotal);
      var borderIndex = 0;
      var borderData = new Uint16Array(2 * vertexTotal);
      for(var n = 0; n < count; n++){
         var boundary = boundaries.at(n);
         // 填充顶点
         var positionCount = boundary.positionCount();
         var positionTotal = 3 * positionCount;
         var positions = boundary.positions();
         for(var i = 0; i < positionTotal; i++){
            vertexData[vertexIndex++] = positions[i];
         }
         // 填充三角索引
         var indexes = boundary.indexes();
         var indexCount = indexes.length;
         for(var i = 0; i < indexCount; i++){
            faceData[faceIndex++] = vertexStart + indexes[i];
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
      var colorIndex = 0;
      var colors = new Uint8Array(4 * vertexTotal);
      for(var i = 0; i < vertexTotal; i++){
         colors[colorIndex++] = (color >> 16) & 0x1F;
         colors[colorIndex++] = (color >>  8) & 0x1F;
         colors[colorIndex++] = (color      ) & 0x1F;
         colors[colorIndex++] = 255;
      }
      // 创建三角面渲染对象
      var renderable = o._faceRenderable = MO.RClass.create(MO.FE3dDataBox);
      renderable.linkGraphicContext(context);
      renderable.setup();
      renderable.vertexPositionBuffer().upload(vertexData, 4 * 3, vertexTotal);
      renderable.vertexColorBuffer().upload(colors, 1 * 4, vertexTotal);
      renderable._indexBuffer.upload(faceData, faceIndex);
      renderable.material().info().optionDouble = true;
      var matrix = renderable.matrix();
      matrix.tx = -20;
      matrix.ty = -8;
      matrix.setScale(0.2, 0.25, 0.2);
      matrix.update();
      // 创建三角边渲染对象
      var colorIndex = 0;
      for(var i = 0; i < vertexTotal; i++){
         colors[colorIndex++] = 0x4B;
         colors[colorIndex++] = 0x59;
         colors[colorIndex++] = 0x64;
         colors[colorIndex++] = 255;
      }
      var renderable = o._borderRenderable = MO.RClass.create(MO.FE3dDataBox);
      renderable.linkGraphicContext(context);
      renderable.setup();
      renderable.vertexPositionBuffer().upload(vertexData, 4 * 3, vertexTotal);
      renderable.vertexColorBuffer().upload(colors, 1 * 4, vertexTotal);
      renderable._indexBuffer.setDrawModeCd(MO.EG3dDrawMode.Lines);
      renderable._indexBuffer.setLineWidth(1);
      renderable._indexBuffer.upload(borderData, borderIndex);
      var matrix = renderable.matrix();
      matrix.tx = -20;
      matrix.ty = -8;
      matrix.setScale(0.2, 0.25, 0.2);
      matrix.update();
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
