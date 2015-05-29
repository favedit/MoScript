with(MO){
   //==========================================================
   // <T>渲染模型网格。</T>
   //
   // @author maocy
   // @history 150106
   //==========================================================
   MO.FE3rDynamicMesh = function FE3rDynamicMesh(o){
      o = RClass.inherits(this, o, FE3dRenderable);
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
      o.construct         = FE3rDynamicMesh_construct;
      // @method
      o.mergeCount        = FE3rDynamicMesh_mergeCount;
      o.mergeMaxCount     = FE3rDynamicMesh_mergeMaxCount;
      o.mergeRenderables  = FE3rDynamicMesh_mergeRenderables;
      o.syncVertexBuffer  = FE3rDynamicMesh_syncVertexBuffer;
      o.mergeRenderable   = FE3rDynamicMesh_mergeRenderable;
      o.mergeVertexBuffer = FE3rDynamicMesh_mergeVertexBuffer;
      o.mergeIndexBuffer  = FE3rDynamicMesh_mergeIndexBuffer;
      o.build             = FE3rDynamicMesh_build;
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
      o._mergeRenderables = new TObjects();
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
      var resource = renderableBuffer.resource();
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
            case EG3dAttributeFormat.Float1:
               buffer._data = new Float32Array(1 * vertexTotal);
               break;
            case EG3dAttributeFormat.Float2:
               buffer._data = new Float32Array(2 * vertexTotal);
               break;
            case EG3dAttributeFormat.Float3:
               buffer._data = new Float32Array(3 * vertexTotal);
               break;
            case EG3dAttributeFormat.Float4:
               buffer._data = new Float32Array(4 * vertexTotal);
               break;
            case EG3dAttributeFormat.Byte4:
            case EG3dAttributeFormat.Byte4Normal:
               buffer._data = new Uint8Array(4 * vertexTotal);
               break;
            default:
               throw new TError("Unknown code");
         }
         o._vertexBuffers.set(code, buffer);
      }
      return buffer;
   }

   //==========================================================
   // <T>合并一个渲染对象。</T>
   //
   // @method
   // @return 是否可以合并
   //==========================================================
   MO.FE3rDynamicMesh_mergeRenderable = function FE3rDynamicMesh_mergeRenderable(p){
      var o = this;
      var c = o._graphicContext;
      var cp = c.capability();
      var vc = p.vertexCount();
      var ic = p.indexBuffer().count();
      // 检查个数限制
      var mc = cp.mergeCount;
      if(o._mergeRenderables.count() >= mc){
         return false;
      }
      // 检查顶点总数限制
      var vt = o._vertexTotal + vc;
      if(cp.optionIndex32){
         if(vt > RInteger.MAX_UINT32){
            return false;
         }
      }else{
         if(vt > RInteger.MAX_UINT16){
            return false;
         }
      }
      // 重新计算总数
      o._vertexTotal += vc;
      o._indexTotal += ic;
      o._mergeRenderables.push(p);
      return true;
   }

   //==========================================================
   // <T>合并一个渲染对象。</T>
   //
   // @method
   //==========================================================
   MO.FE3rDynamicMesh_mergeVertexBuffer = function FE3rDynamicMesh_mergeVertexBuffer(r, bc, b, rs){
      var o = this;
      var vp = o._vertexPosition;
      var vd = b._data;
      var c = rs._dataCount;
      switch(bc){
         case 'position':
            var d = new Float32Array(rs._data);
            RFloat.copy(vd, 3 * vp, d, 0, 3 * c);
            break;
         case 'coord':
            var d = new Float32Array(rs._data);
            RFloat.copy(vd, 2 * vp, d, 0, 2 * c);
            break;
         case 'color':
         case "normal":
         case "binormal":
         case "tangent":
         case "bone_index":
         case "bone_weight":
            var d = new Uint8Array(rs._data);
            RByte.copy(vd, 4 * vp, d, 0, 4 * c);
            break;
         default:
            throw new TError("Unknown code");
      }
   }

   //==========================================================
   // <T>合并一个渲染对象。</T>
   //
   // @method
   //==========================================================
   MO.FE3rDynamicMesh_mergeIndexBuffer = function FE3rDynamicMesh_mergeIndexBuffer(ir){
      var o = this;
      var vp = o._vertexPosition;
      var ip = o._indexPosition;
      var id = o._indexBuffer._data;
      var rd = new Uint16Array(ir._data);
      var rc = 3 * ir._dataCount;
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
      var gc = o._graphicContext;
      var gp = gc.capability();
      var vertexTotal = o._vertexTotal;
      var indexTotal = o._indexTotal;
      var rs = o._mergeRenderables;
      var rc = rs.count();
      // 获得首个渲染对象
      var rf = rs.first();
      o._material = rf._material;
      o._textures = rf._textures;
      // 创建顶点实例流
      var instanceVertexBuffer = o._instanceVertexBuffer = o._graphicContext.createVertexBuffer();
      instanceVertexBuffer.setCode('instance');
      instanceVertexBuffer.setStride(4);
      instanceVertexBuffer.setFormatCd(EG3dAttributeFormat.Float1);
      var vdi = instanceVertexBuffer._data = new Float32Array(vertexTotal);
      o._vertexBuffers.set(instanceVertexBuffer.code(), instanceVertexBuffer);
      // 创建索引流
      var indexBuffer = o._indexBuffer = gc.createIndexBuffer();
      if(gp.optionIndex32){
         indexBuffer.setStrideCd(EG3dIndexStride.Uint32);
         indexBuffer._data = new Uint32Array(indexTotal);
      }else{
         indexBuffer.setSstrideCd(EG3dIndexStride.Uint16);
         indexBuffer._data = new Uint16Array(indexTotal);
      }
      indexBuffer._count = indexTotal;
      // 合并顶点
      for(var i = 0; i < rc; i++){
         var r = rs.getAt(i);
         var vc = r.vertexCount();
         var vertexBuffers = r.vertexBuffers();
         var vertexBufferCount = vertexBuffers.count();
         for(var vbi = 0; vbi < vertexBufferCount; vbi++){
            var vb = vertexBuffers.at(vbi);
            var vbr = vb._resource;
            var vbrc = vbr._code
            // 创建缓冲
            var vertexBuffer = o.syncVertexBuffer(vb);
            o.mergeVertexBuffer(r, vbrc, vertexBuffer, vbr);
         }
         // 生成顶点实例数据
         RFloat.fill(vdi, o._vertexPosition, vc, i);
         // 生成索引数据
         var ib = r.indexBuffer();
         var ic = ib.count();
         var ir = ib._resource;
         o.mergeIndexBuffer(ir);
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
}
