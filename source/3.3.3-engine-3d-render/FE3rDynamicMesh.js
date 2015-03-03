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
   o._merges           = null;
   o._indexBuffer      = null;
   //..........................................................
   // @method
   o.construct         = FE3rDynamicMesh_construct;
   // @method
   o.findTexture       = FE3rDynamicMesh_findTexture;
   o.textures          = FE3rDynamicMesh_textures;
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
   o._merges = new TObjects();
}

//==========================================================
// <T>根据名称查找纹理。</T>
//
// @method
// @param p:name:String 名称
// @return FRenderIndexBuffer 纹理
//==========================================================
function FE3rDynamicMesh_findTexture(p){
   return this._textures.get(p);
}

//==========================================================
// <T>获得纹理集合。</T>
//
// @method
// @return TDictionary 纹理集合
//==========================================================
function FE3rDynamicMesh_textures(){
   return this._textures;
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
      b.stride = p.stride;
      switch(p._formatCd){
         case EG3dAttributeFormat.Float2:
            b._data = new Float32Array(2 * vt);
            break;
         case EG3dAttributeFormat.Float3:
            b._data = new Float32Array(3 * vt);
            break;
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
   // 检查个数
   if(o._merges.count() > 24){
      return false;
   }
   // 检查顶点总数
   var vt = o._vertexTotal + p.vertexCount();
   if(vt > 65535){
      return false;
   }
   // 重新计算总数
   o._vertexTotal = vt;
   o._indexTotal += p.indexBuffer().count();
   o._merges.push(p);
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
         //var m = r.currentMatrix();
         //m.transform(rd, 3 * ri, d, 0, c);
         RFloat.copy(rd, 3 * ri, d, 0, 3 * c);
         break;
      case 'color':
         var d = new Uint8Array(rs._data);
         RByte.copy(rd, 4 * ri, d, 0, 4 * c);
         break;
      case 'coord':
         var d = new Float32Array(rs._data);
         RFloat.copy(rd, 2 * ri, d, 0, 2 * c);
         break;
      case "normal":
      case "binormal":
      case "tangent":
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
   o._indexPosition = ip;
}

//==========================================================
// <T>构建对象。</T>
//
// @method
//==========================================================
function FE3rDynamicMesh_build(){
   var o = this;
   var gc = o._graphicContext;
   var rs = o._merges;
   var vt = o._vertexTotal;
   var ft = o._indexTotal;
   var rc = rs.count();
   // 获得首个渲染对象
   var rf = rs.first();
   o._material = rf._material;
   o._textures = rf._textures;
   // 创建顶点实例流
   var b = o._instanceVertexBuffer = o._graphicContext.createVertexBuffer();
   b._name = 'instance';
   b._formatCd = EG3dAttributeFormat.Float1;
   b._data = new Float32Array(vt);
   b.stride = 4;
   o._vertexBuffers.set(b._name, b);
   // 创建索引流
   var b = o._indexBuffer = gc.createIndexBuffer();
   b._data = new Uint16Array(ft);
   b._count = ft;
   // 合并顶点
   for(var i = 0; i < rc; i++){
      var r = rs.getAt(i);
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
      RFloat.fill(o._instanceVertexBuffer._data, o._vertexPosition, r.vertexCount(), i);
      // 生成索引数据
      var ib = r.indexBuffer();
      var ir = ib._resource;
      o.mergeIndexBuffer(ir);
      o._vertexPosition += r.vertexCount();
   }
   // 上传顶点数据
   var vbs = o._vertexBuffers;
   var vbc = vbs.count();
   for(var vbi = 0; vbi < vbc; vbi++){
      var vb = vbs.valueAt(vbi);
      vb.upload(vb._data, vb.stride, vt);
   }
   // 上传索引数据
   o._indexBuffer.upload(o._indexBuffer._data, ft);
}
