//==========================================================
// <T>渲染模型网格。</T>
//
// @author maocy
// @history 150106
//==========================================================
MO.FE3rDynamicMesh = function FE3rDynamicMesh(o){
   o = MO.Class.inherits(this, o, MO.FE3dRenderable);
   //..........................................................
   // @attribute
   o._model            = null;
   o._optionMerge      = true;
   o._vertexPosition   = 0;
   o._vertexTotal      = 0;
   o._indexPosition    = 0;
   o._indexTotal       = 0;
   o._mergeRenderables = null;
   //..........................................................
   // @method
   o.construct         = MO.FE3rDynamicMesh_construct;
   // @method
   o.mergeCount        = MO.FE3rDynamicMesh_mergeCount;
   o.mergeStride       = MO.FE3rDynamicMesh_mergeStride;
   o.mergeMaxCount     = MO.FE3rDynamicMesh_mergeMaxCount;
   o.mergeRenderables  = MO.FE3rDynamicMesh_mergeRenderables;
   o.syncVertexBuffer  = MO.FE3rDynamicMesh_syncVertexBuffer;
   o.mergeRenderable   = MO.FE3rDynamicMesh_mergeRenderable;
   o.mergeVertexBuffer = MO.FE3rDynamicMesh_mergeVertexBuffer;
   o.mergeIndexBuffer  = MO.FE3rDynamicMesh_mergeIndexBuffer;
   o.build             = MO.FE3rDynamicMesh_build;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3rDynamicMesh_construct = function FE3rDynamicMesh_construct(){
   var o = this;
   o.__base.FE3dRenderable.construct.call(o);
   // 设置属性
   o._mergeRenderables = new MO.TObjects();
}

//==========================================================
// <T>获得合并渲染总数。</T>
//
// @method
// @return Integer 总数
//==========================================================
MO.FE3rDynamicMesh_mergeCount = function FE3rDynamicMesh_mergeCount(){
   return this._mergeRenderables.count();
}

//==========================================================
// <T>获得合并渲染总数。</T>
//
// @method
// @return Integer 总数
//==========================================================
MO.FE3rDynamicMesh_mergeStride = function FE3rDynamicMesh_mergeStride(){
   return 4;
}

//==========================================================
// <T>获得合并最大渲染数。</T>
//
// @method
// @return Integer 总数
//==========================================================
MO.FE3rDynamicMesh_mergeMaxCount = function FE3rDynamicMesh_mergeMaxCount(){
   return this._model._mergeMaxCount;
}

//==========================================================
// <T>获得合并渲染集合。</T>
//
// @method
// @return TObjects 渲染集合
//==========================================================
MO.FE3rDynamicMesh_mergeRenderables = function FE3rDynamicMesh_mergeRenderables(){
   return this._mergeRenderables;
}

//==========================================================
// <T>根据名称查找纹理。</T>
//
// @method
// @param renderableBuffer:String 名称
// @return FRenderIndexBuffer 纹理
//==========================================================
MO.FE3rDynamicMesh_syncVertexBuffer = function FE3rDynamicMesh_syncVertexBuffer(renderableBuffer){
   var o = this;
   // 查找缓冲
   //var resource = renderableBuffer.resource();
   var resource = renderableBuffer._resource;
   var code = resource.code();
   var buffer = o._vertexBuffers.get(code);
   // 创建缓冲
   if(!buffer){
      var formatCd = renderableBuffer.formatCd();
      var vertexTotal = o._vertexTotal;
      buffer = o._graphicContext.createVertexBuffer();
      buffer.setCode(code);
      buffer.setFormatCd(formatCd);
      buffer.setStride(renderableBuffer.stride());
      switch(formatCd){
         case MO.EG3dAttributeFormat.Float1:
            buffer._data = new Float32Array(1 * vertexTotal);
            break;
         case MO.EG3dAttributeFormat.Float2:
            buffer._data = new Float32Array(2 * vertexTotal);
            break;
         case MO.EG3dAttributeFormat.Float3:
            buffer._data = new Float32Array(3 * vertexTotal);
            break;
         case MO.EG3dAttributeFormat.Float4:
            buffer._data = new Float32Array(4 * vertexTotal);
            break;
         case MO.EG3dAttributeFormat.Byte4:
         case MO.EG3dAttributeFormat.Byte4Normal:
            buffer._data = new Uint8Array(4 * vertexTotal);
            break;
         default:
            throw new MO.TError("Unknown code");
      }
      o._vertexBuffers.set(code, buffer);
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
MO.FE3rDynamicMesh_mergeRenderable = function FE3rDynamicMesh_mergeRenderable(renderable){
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
   var vertexTotal = o._vertexTotal + vertexCount;
   if(capability.optionIndex32){
      if(vertexTotal > MO.Lang.Integer.MAX_UINT32){
         return false;
      }
   }else{
      if(vertexTotal > MO.Lang.Integer.MAX_UINT16){
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
// <T>合并一个渲染对象。</T>
//
// @method
//==========================================================
MO.FE3rDynamicMesh_mergeVertexBuffer = function FE3rDynamicMesh_mergeVertexBuffer(renderable, code, vertexBuffer, resource){
   var o = this;
   var position = o._vertexPosition;
   var data = vertexBuffer._data;
   var dataCount = resource._dataCount;
   switch(code){
      case 'position':
         var d = new Float32Array(resource._data);
         MO.Lang.Float.copy(data, 3 * position, d, 0, 3 * dataCount);
         break;
      case 'coord':
         var d = new Float32Array(resource._data);
         MO.Lang.Float.copy(data, 2 * position, d, 0, 2 * dataCount);
         break;
      case 'color':
      case "normal":
      case "binormal":
      case "tangent":
      case "bone_index":
      case "bone_weight":
         var d = new Uint8Array(resource._data);
         MO.Lang.Byte.copy(data, 4 * position, d, 0, 4 * dataCount);
         break;
      default:
         throw new MO.TError("Unknown code");
   }
}

//==========================================================
// <T>合并一个渲染对象。</T>
//
// @method
//==========================================================
MO.FE3rDynamicMesh_mergeIndexBuffer = function FE3rDynamicMesh_mergeIndexBuffer(resource){
   var o = this;
   var vp = o._vertexPosition;
   var ip = o._indexPosition;
   var id = o._indexBuffer._data;
   var rd = new Uint16Array(resource._data);
   var rc = 3 * resource._dataCount;
   for(var i = 0; i < rc; i++){
      id[ip++] = vp + rd[i]
   }
}

//==========================================================
// <T>构建对象。</T>
//
// @method
//==========================================================
MO.FE3rDynamicMesh_build = function FE3rDynamicMesh_build(){
   var o = this;
   var context = o._graphicContext;
   var capability = context.capability();
   var vertexTotal = o._vertexTotal;
   var indexTotal = o._indexTotal;
   var rs = o._mergeRenderables;
   var rc = rs.count();
   // 获得首个渲染对象
   var rf = rs.first();
   o._material = rf.material();
   o._textures = rf.textures();
   // 创建顶点实例流
   var instanceVertexBuffer = o._instanceVertexBuffer = o._graphicContext.createVertexBuffer();
   instanceVertexBuffer.setCode('instance');
   instanceVertexBuffer.setStride(4);
   instanceVertexBuffer.setFormatCd(MO.EG3dAttributeFormat.Float1);
   var vdi = instanceVertexBuffer._data = new Float32Array(vertexTotal);
   o._vertexBuffers.set(instanceVertexBuffer.code(), instanceVertexBuffer);
   // 创建索引流
   var indexBuffer = o._indexBuffer = context.createIndexBuffer(MO.FE3rIndexBuffer);
   if(capability.optionIndex32){
      indexBuffer.setStrideCd(MO.EG3dIndexStride.Uint32);
      indexBuffer._data = new Uint32Array(indexTotal);
   }else{
      indexBuffer.setSstrideCd(MO.EG3dIndexStride.Uint16);
      indexBuffer._data = new Uint16Array(indexTotal);
   }
   indexBuffer._count = indexTotal;
   o.pushIndexBuffer(indexBuffer);
   // 合并顶点
   for(var i = 0; i < rc; i++){
      var renderable = rs.getAt(i);
      var vc = renderable.vertexCount();
      var vertexBuffers = renderable.vertexBuffers();
      var vertexBufferCount = vertexBuffers.count();
      for(var vbi = 0; vbi < vertexBufferCount; vbi++){
         var vb = vertexBuffers.at(vbi);
         var vertexBufferResource = vb._resource;
         var vbrc = vertexBufferResource.code();
         // 创建缓冲
         var vertexBuffer = o.syncVertexBuffer(vb);
         o.mergeVertexBuffer(renderable, vbrc, vertexBuffer, vertexBufferResource);
      }
      // 生成顶点实例数据
      MO.Lang.Float.fill(vdi, o._vertexPosition, vc, i);
      // 生成索引数据
      var indexBuffer = renderable.indexBuffers().first();
      var ic = indexBuffer.count();
      var indexBufferResource = indexBuffer._resource;
      o.mergeIndexBuffer(indexBufferResource);
      // 移动顶点位置
      o._vertexPosition += vc;
      o._indexPosition += ic;
   }
   // 上传顶点数据
   var vertexBuffers = o._vertexBuffers;
   var vertexBufferCount = vertexBuffers.count();
   for(var i = 0; i < vertexBufferCount; i++){
      var vertexBuffer = vertexBuffers.at(i);
      vertexBuffer.upload(vertexBuffer._data, vertexBuffer.stride(), vertexTotal);
      vertexBuffer._data = null;
   }
   // 上传索引数据
   o._indexBuffer.upload(o._indexBuffer._data, indexTotal);
   o._indexBuffer._data = null;
}
