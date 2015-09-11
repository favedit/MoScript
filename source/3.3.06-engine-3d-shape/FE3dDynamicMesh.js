//==========================================================
// <T>渲染模型网格。</T>
//
// @author maocy
// @history 150106
//==========================================================
MO.FE3dDynamicMesh = function FE3dDynamicMesh(o){
   o = MO.Class.inherits(this, o, MO.FE3dRenderable);
   //..........................................................
   // @attribute
   o._shape              = MO.Class.register(o, new MO.AGetSet('_shape'));
   o._optionMerge        = true;
   o._vertexPosition     = 0;
   o._vertexTotal        = 0;
   o._indexPosition      = 0;
   o._indexTotal         = 0;
   o._mergeRenderables   = MO.Class.register(o, new MO.AGetter('_mergeRenderables'));
   //..........................................................
   // @method
   o.construct           = MO.FE3dDynamicMesh_construct;
   // @method
   o.mergeCount          = MO.FE3dDynamicMesh_mergeCount;
   o.mergeMaxCount       = MO.FE3dDynamicMesh_mergeMaxCount;
   o.mergeStride         = MO.FE3dDynamicMesh_mergeStride;
   // @method
   o.findMergeRenderable = MO.FE3dDynamicMesh_findMergeRenderable;
   o.calculateOutline    = MO.FE3dDynamicMesh_calculateOutline;
   // @method
   o.syncVertexBuffer    = MO.FE3dDynamicMesh_syncVertexBuffer;
   o.mergeRenderable     = MO.FE3dDynamicMesh_mergeRenderable;
   o.mergeVertexBuffer   = MO.FE3dDynamicMesh_mergeVertexBuffer;
   o.mergeIndexBuffer    = MO.FE3dDynamicMesh_mergeIndexBuffer;
   o.build               = MO.FE3dDynamicMesh_build;
   // @method
   o.dispose             = MO.FE3dDynamicMesh_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3dDynamicMesh_construct = function FE3dDynamicMesh_construct(){
   var o = this;
   o.__base.FE3dRenderable.construct.call(o);
   // 设置变量
   o._mergeRenderables = new MO.TObjects();
}

//==========================================================
// <T>获得合并渲染总数。</T>
//
// @method
// @return Integer 总数
//==========================================================
MO.FE3dDynamicMesh_mergeCount = function FE3dDynamicMesh_mergeCount(){
   return this._mergeRenderables.count();
}

//==========================================================
// <T>获得合并最大渲染数。</T>
//
// @method
// @return Integer 总数
//==========================================================
MO.FE3dDynamicMesh_mergeMaxCount = function FE3dDynamicMesh_mergeMaxCount(){
   return this._shape.mergeMaxCount();
}

//==========================================================
// <T>获得合并最大宽度。</T>
//
// @method
// @return Integer 最大宽度
//==========================================================
MO.FE3dDynamicMesh_mergeStride = function FE3dDynamicMesh_mergeStride(){
   return this._shape.mergeStride();
}

//==========================================================
// <T>查找合并渲染对象。</T>
//
// @method
// @param index:Integer 索引
// @return MRenderable 渲染对象
//==========================================================
MO.FE3dDynamicMesh_findMergeRenderable = function FE3dDynamicMesh_findMergeRenderable(index){
   return this._mergeRenderables.get(index);
}

//==========================================================
// <T>根据名称查找纹理。</T>
//
// @method
// @param vertexBuffer:FG3dVertexBuffer 顶点缓冲
// @return FRenderIndexBuffer 纹理
//==========================================================
MO.FE3dDynamicMesh_syncVertexBuffer = function FE3dDynamicMesh_syncVertexBuffer(vertexBuffer){
   var o = this;
   // 查找缓冲
   var code = vertexBuffer.code();
   var buffer = o._vertexBuffers.get(code);
   // 创建缓冲
   if(!buffer){
      var formatCd = vertexBuffer.formatCd();
      var vertexTotal = o._vertexTotal;
      buffer = o._graphicContext.createVertexBuffer();
      buffer.setCode(code);
      buffer.setFormatCd(formatCd);
      buffer.setStride(vertexBuffer.stride());
      var bufferData = null;
      switch(formatCd){
         case MO.EG3dAttributeFormat.Float1:
            bufferData = new Float32Array(1 * vertexTotal);
            break;
         case MO.EG3dAttributeFormat.Float2:
            bufferData = new Float32Array(2 * vertexTotal);
            break;
         case MO.EG3dAttributeFormat.Float3:
            bufferData = new Float32Array(3 * vertexTotal);
            break;
         case MO.EG3dAttributeFormat.Float4:
            bufferData = new Float32Array(4 * vertexTotal);
            break;
         case MO.EG3dAttributeFormat.Byte4:
         case MO.EG3dAttributeFormat.Byte4Normal:
            bufferData = new Uint8Array(4 * vertexTotal);
            break;
         default:
            throw new MO.TError("Unknown code");
      }
      buffer.setData(bufferData);
      o.pushVertexBuffer(buffer);
   }
   return buffer;
}

//==========================================================
// <T>合并一个渲染对象。</T>
//
// @method
// @param renderable:FRenderable 渲染对象
// @return 是否可以合并
//==========================================================
MO.FE3dDynamicMesh_mergeRenderable = function FE3dDynamicMesh_mergeRenderable(renderable){
   var o = this;
   var context = o._graphicContext;
   var capability = context.capability();
   var vertexCount = renderable.vertexCount();
   var indexBuffer = renderable.indexBuffers().first();
   var indexCount = indexBuffer.count();
   // 检查个数限制
   var mergeCount = capability.mergeCount;
   if(o._mergeRenderables.count() >= mergeCount){
      return false;
   }
   // 检查顶点总数限制
   var vertexLimit = o._vertexTotal + vertexCount;
   if(capability.optionIndex32){
      if(vertexLimit > MO.Lang.Integer.MAX_UINT32){
         return false;
      }
   }else{
      if(vertexLimit > MO.Lang.Integer.MAX_UINT16){
         return false;
      }
   }
   // 重新计算总数
   o._vertexTotal += vertexCount;
   o._indexTotal += indexCount;
   o._mergeRenderables.push(renderable);
   return true;
}

//==========================================================
// <T>合并一个顶点缓冲。</T>
//
// @method
// @param vertexBuffer:FG3dVertexBuffer 顶点缓冲
//==========================================================
MO.FE3dDynamicMesh_mergeVertexBuffer = function FE3dDynamicMesh_mergeVertexBuffer(vertexBuffer){
   var o = this;
   var position = o._vertexPosition;
   // 获得合并缓冲
   var count = vertexBuffer.count();
   var formatCd = vertexBuffer.formatCd();
   var stride = vertexBuffer.stride();
   var data = vertexBuffer.data();
   var mergeVertexBuffer = o.syncVertexBuffer(vertexBuffer);
   var mergeData = mergeVertexBuffer.data();
   switch(formatCd){
      case MO.EG3dAttributeFormat.Float1:
      case MO.EG3dAttributeFormat.Float2:
      case MO.EG3dAttributeFormat.Float3:
      case MO.EG3dAttributeFormat.Float4:
         MO.Lang.Float.copy(mergeData, (stride / 4) * position, data, 0, (stride / 4) * count);
         break;
      case MO.EG3dAttributeFormat.Byte4:
      case MO.EG3dAttributeFormat.Byte4Normal:
         MO.Lang.Byte.copy(mergeData, stride * position, data, 0, stride * count);
         break;
      default:
         throw new MO.TError("Unknown code");
   }
}

//==========================================================
// <T>合并一个索引缓冲。</T>
//
// @method
// @param indexBuffer:FG3dIndexBuffer 顶点缓冲
//==========================================================
MO.FE3dDynamicMesh_mergeIndexBuffer = function FE3dDynamicMesh_mergeIndexBuffer(indexBuffer){
   var o = this;
   var vertexPosition = o._vertexPosition;
   var indexPosition = o._indexPosition;
   var drawModeCd = indexBuffer.drawModeCd();
   var data = indexBuffer.data();
   var mergeData = o._indexBuffer.data();
   var renderableCount = indexBuffer.count();
   for(var i = 0; i < renderableCount; i++){
      mergeData[indexPosition++] = vertexPosition + data[i]
   }
   // 设置绘制模式
   o._indexBuffer.setDrawModeCd(drawModeCd);
}

//==========================================================
// <T>构建对象。</T>
//
// @method
//==========================================================
MO.FE3dDynamicMesh_build = function FE3dDynamicMesh_build(){
   var o = this;
   var context = o._graphicContext;
   var capability = context.capability();
   var vertexTotal = o._vertexTotal;
   var indexTotal = o._indexTotal;
   var renderables = o._mergeRenderables;
   var renderableCount = renderables.count();
   // 获得首个渲染对象
   var renderable = renderables.first();
   o._material = renderable.material();
   o._textures = renderable.textures();
   // 创建顶点实例流
   var instanceVertexData = new Float32Array(vertexTotal);
   var instanceVertexBuffer = o._instanceVertexBuffer = context.createVertexBuffer();
   instanceVertexBuffer.setCode('instance');
   instanceVertexBuffer.setStride(4);
   instanceVertexBuffer.setFormatCd(MO.EG3dAttributeFormat.Float1);
   instanceVertexBuffer.setData(instanceVertexData);
   o.pushVertexBuffer(instanceVertexBuffer);
   var indexVertexData = new Float32Array(4 * vertexTotal);
   var indexVertexBuffer = o._indexVertexBuffer = context.createVertexBuffer();
   indexVertexBuffer.setCode('index');
   indexVertexBuffer.setStride(16);
   indexVertexBuffer.setFormatCd(MO.EG3dAttributeFormat.Float4);
   indexVertexBuffer.setData(indexVertexData);
   o.pushVertexBuffer(indexVertexBuffer);
   // 创建索引流
   var indexBuffer = o._indexBuffer = context.createIndexBuffer(MO.FE3rIndexBuffer);
   if(capability.optionIndex32){
      indexBuffer.setStrideCd(MO.EG3dIndexStride.Uint32);
      indexBuffer.setData(new Uint32Array(indexTotal));
   }else{
      indexBuffer.setStrideCd(MO.EG3dIndexStride.Uint16);
      indexBuffer.setData(new Uint16Array(indexTotal));
   }
   indexBuffer.setCount(indexTotal);
   o.pushIndexBuffer(indexBuffer);
   // 合并顶点
   var indexVertexPosition = 0;
   for(var n = 0; n < renderableCount; n++){
      var renderable = renderables.at(n);
      // 生成顶点实例数据
      var renderableVertexCount = renderable.vertexCount();
      MO.Lang.Float.fill(instanceVertexData, o._vertexPosition, renderableVertexCount, n);
      // 写入顶点索引数据
      var index = n + 1;
      var index1 = (index  & 0xFF) / 255;
      var index2 = ((index >> 8) & 0xFF) / 255;
      var index3 = ((index >> 16) & 0xFF) / 255;
      for(var i = 0; i < renderableVertexCount; i++){
         indexVertexData[indexVertexPosition++] = index1;
         indexVertexData[indexVertexPosition++] = index2;
         indexVertexData[indexVertexPosition++] = index3;
         indexVertexData[indexVertexPosition++] = 1;
      }
      // 写入顶点缓冲数据
      var vertexBuffers = renderable.vertexBuffers();
      var vertexBufferCount = vertexBuffers.count();
      for(var i = 0; i < vertexBufferCount; i++){
         var vertexBuffer = vertexBuffers.at(i);
         o.mergeVertexBuffer(vertexBuffer);
      }
      // 生成索引数据
      var renderableIndexBuffer = renderable.indexBuffers().first();
      var renderableIndexCount = renderableIndexBuffer.count();
      o.mergeIndexBuffer(renderableIndexBuffer);
      // 移动顶点位置
      o._vertexPosition += renderableVertexCount;
      o._indexPosition += renderableIndexCount;
   }
   // 上传顶点数据
   var vertexBuffers = o._vertexBuffers;
   var vertexBufferCount = vertexBuffers.count();
   for(var i = 0; i < vertexBufferCount; i++){
      var vertexBuffer = vertexBuffers.at(i);
      var vertexData = vertexBuffer.data();
      var vertexStride = vertexBuffer.stride();
      vertexBuffer.upload(vertexData, vertexStride, vertexTotal);
      vertexBuffer.setData(null);
   }
   // 上传索引数据
   var indexData = indexBuffer.data();
   indexBuffer.upload(indexData, indexTotal);
   indexBuffer.setData(null);
   MO.Logger.debug(o, 'Merge mesh. (renderable_count={1}, vertex={2}, index={3})', renderableCount, vertexTotal, indexTotal);
}

//==========================================================
// <T>计算轮廓。</T>
//
// @method
// @return SOutline 轮廓
//==========================================================
MO.FE3dDynamicMesh_calculateOutline = function FE3dDynamicMesh_calculateOutline(){
   var o = this;
   var outline = o._outline;
   if(outline.isEmpty()){
      outline.setMin();
      var renderables = o._mergeRenderables;
      if(renderables){
         var count = renderables.count();
         for(var i = 0; i < count; i++){
            var renderable = renderables.at(i);
            var renderableOutline = renderable.calculateOutline()
            outline.mergeMax(renderableOutline);
         }
      }
   }
   return outline;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3dDynamicMesh_dispose = function FE3dDynamicMesh_dispose(){
   var o = this;
   // 释放变量
   o._mergeRenderables = MO.Lang.Object.dispose(o._mergeRenderables);
   // 父处理
   o.__base.FE3dRenderable.dispose.call(o);
}
