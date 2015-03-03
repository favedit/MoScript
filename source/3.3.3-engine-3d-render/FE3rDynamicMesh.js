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
   o._merges         = null;
   o._indexBuffer    = null;
   //..........................................................
   // @method
   o.construct       = FE3rDynamicMesh_construct;
   // @method
   o.syncVertexBuffer = FE3rDynamicMesh_syncVertexBuffer;
   o.findTexture      = FE3rDynamicMesh_findTexture;
   o.textures         = FE3rDynamicMesh_textures;
   o.mergeRenderable = FE3rDynamicMesh_mergeRenderable;
   o.mergeVertexBuffer = FE3rDynamicMesh_mergeVertexBuffer;
   o.mergeIndexBuffer  = FE3rDynamicMesh_mergeIndexBuffer;
   o.build           = FE3rDynamicMesh_build;
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
// <T>合并一个渲染对象。</T>
//
// @method
//==========================================================
function FE3rDynamicMesh_mergeRenderable(p){
   var o = this;
   if(o._material){
   }
   this._merges.push(p);
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
         var m = r.currentMatrix();
         m.transform(rd, 3 * ri, d, 0, c);
         break;
      case 'color':
         var d = new Uint8Array(rs._data);
         RByte.copyArray(rd, 4 * ri, d, 0, 4 * c);
         break;
      case 'coord':
         var d = new Float32Array(rs._data);
         RFloat.copyArray(rd, 2 * ri, d, 0, 2 * c);
         break;
      case "normal":
      case "binormal":
      case "tangent":
         var d = new Uint8Array(rs._data);
         RByte.copyArray(rd, 4 * ri, d, 0, 4 * c);
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
   var rc = rs.count();
   var rf = rs.first();
   o._material = rf._material;
   o._textures = rf._textures;
   // 计算顶点和索引总数
   var vt = 0;
   var ft = 0;
   for(var i = 0; i < rc; i++){
      var r = rs.getAt(i);
      vt += r.vertexCount();
      ft += r.indexBuffer().count();
   }
   o._vertexPosition = 0;
   o._vertexTotal = vt;
   o._indexPosition = 0;
   o._indexTotal = ft;
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
      // 合并顶点
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
