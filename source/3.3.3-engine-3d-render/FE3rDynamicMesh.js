//==========================================================
// <T>渲染模型网格。</T>
//
// @author maocy
// @history 150106
//==========================================================
function FE3rDynamicMesh(o){
   o = RClass.inherits(this, o, FE3dRenderable);
   //..........................................................
   // @attribute
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
function FE3rDynamicMesh_construct(){
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
function FE3rDynamicMesh_mergeCount(){
   return this._mergeRenderables.count();
}

//==========================================================
// <T>获得合并渲染集合。</T>
//
// @method
// @return TObjects 渲染集合
//==========================================================
function FE3rDynamicMesh_mergeRenderables(){
   return this._mergeRenderables;
}

//==========================================================
// <T>根据名称查找纹理。</T>
//
// @method
// @param p:name:String 名称
// @return FRenderIndexBuffer 纹理
//==========================================================
function FE3rDynamicMesh_syncVertexBuffer(p){
   var o = this;
   // 查找缓冲
   var r = p._resource;
   var rc = r._code;
   var b = o._vertexBuffers.get(rc);
   // 创建缓冲
   if(!b){
      var vt = o._vertexTotal;
      b = o._graphicContext.createVertexBuffer();
      b._name = rc;
      b._position = 0;
      b._formatCd = p._formatCd;
      b._stride = p._stride;
      switch(p._formatCd){
         case EG3dAttributeFormat.Float2:
            b._data = new Float32Array(2 * vt);
            break;
         case EG3dAttributeFormat.Float3:
            b._data = new Float32Array(3 * vt);
            break;
         case EG3dAttributeFormat.Byte4:
         case EG3dAttributeFormat.Byte4Normal:
            b._data = new Uint8Array(4 * vt);
            break;
         default:
            throw new TError("Unknown code");
      }
      o._vertexBuffers.set(rc, b);
   }
   return b;
}

//==========================================================
// <T>合并一个渲染对象。</T>
//
// @method
// @return 是否可以合并
//==========================================================
function FE3rDynamicMesh_mergeRenderable(p){
   var o = this;
   var c = o._graphicContext;
   var cp = c.capability();
   var vc = p.vertexCount();
   var ic = p.indexBuffer().count();
   // 检查个数限制
   var mc = cp.calculateMergeCount();
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
function FE3rDynamicMesh_mergeVertexBuffer(r, bc, b, rs){
   var o = this;
   var ri = b._position;
   var rd = b._data;
   var c = rs._dataCount;
   switch(bc){
      case 'position':
         var d = new Float32Array(rs._data);
         //r.currentMatrix().transform(rd, 3 * ri, d, 0, c);
         RFloat.copy(rd, 3 * ri, d, 0, 3 * c);
         break;
      case 'coord':
         var d = new Float32Array(rs._data);
         RFloat.copy(rd, 2 * ri, d, 0, 2 * c);
         break;
      case 'color':
      case "normal":
      case "binormal":
      case "tangent":
      case "bone_index":
      case "bone_weight":
         var d = new Uint8Array(rs._data);
         RByte.copy(rd, 4 * ri, d, 0, 4 * c);
         break;
      default:
         throw new TError("Unknown code");
   }
   b._position += c;
}

//==========================================================
// <T>合并一个渲染对象。</T>
//
// @method
//==========================================================
function FE3rDynamicMesh_mergeIndexBuffer(ir){
   var o = this;
   var vp = o._vertexPosition;
   var id = o._indexBuffer._data;
   var ip = o._indexPosition;
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
function FE3rDynamicMesh_build(){
   var o = this;
   var gc = o._graphicContext;
   var gp = gc.capability();
   var vt = o._vertexTotal;
   var ft = o._indexTotal;
   var rs = o._mergeRenderables;
   var rc = rs.count();
   // 获得首个渲染对象
   var rf = rs.first();
   o._material = rf._material;
   o._textures = rf._textures;
   // 创建顶点实例流
   var b = o._instanceVertexBuffer = o._graphicContext.createVertexBuffer();
   b._name = 'instance';
   b._formatCd = EG3dAttributeFormat.Float1;
   var vnid = b._data = new Float32Array(vt);
   b._stride = 4;
   o._vertexBuffers.set(b._name, b);
   // 创建索引流
   var b = o._indexBuffer = gc.createIndexBuffer();
   if(gp.optionIndex32){
      b._strideCd = EG3dIndexStride.Uint32;
      b._data = new Uint32Array(ft);
   }else{
      b._strideCd = EG3dIndexStride.Uint16;
      b._data = new Uint16Array(ft);
   }
   b._count = ft;
   // 合并顶点
   for(var i = 0; i < rc; i++){
      var r = rs.getAt(i);
      var vc = r.vertexCount();
      var vbs = r.vertexBuffers();
      var vbc = vbs.count();
      for(var vbi = 0; vbi < vbc; vbi++){
         var vb = vbs.valueAt(vbi);
         var vbr = vb._resource;
         var vbrc = vbr._code
         // 创建缓冲
         var b = o.syncVertexBuffer(vb);
         o.mergeVertexBuffer(r, vbrc, b, vbr);
      }
      // 生成顶点实例数据
      RFloat.fill(vnid, o._vertexPosition, vc, i);
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
   var vbs = o._vertexBuffers;
   var vbc = vbs.count();
   for(var vbi = 0; vbi < vbc; vbi++){
      var vb = vbs.valueAt(vbi);
      vb.upload(vb._data, vb._stride, vt);
      vb._position = null;
      vb._data = null;
   }
   // 上传索引数据
   o._indexBuffer.upload(o._indexBuffer._data, ft);
   o._indexBuffer._position = null;
   o._indexBuffer._data = null;
}
