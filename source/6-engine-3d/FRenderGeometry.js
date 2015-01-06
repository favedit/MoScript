//==========================================================
// <T>渲染几何体。</T>
//
// @author maocy
// @history 150106
//==========================================================
function FRenderGeometry(o){
   o = RClass.inherits(this, o, FRenderable);
   //..........................................................
   // @attribute
   o._vertexBuffers = null;
   o._indexBuffer   = null;
   //..........................................................
   // @method
   o.construct        = FRenderGeometry_construct;
   o.findVertexBuffer = FRenderGeometry_findVertexBuffer;
   o.indexBuffer      = FRenderGeometry_indexBuffer;
   o.loadResource     = FRenderGeometry_loadResource;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FRenderGeometry_construct(){
   var o = this;
   o.__base.FRenderable.construct.call(o);
   o._vertexBuffers = new TObjects();
}

//==========================================================
// <T>查找顶点缓冲。</T>
//
// @method
// @param p:name:String 名称
//==========================================================
function FRenderGeometry_findVertexBuffer(p){
   var o = this;
   var vs = o._vertexBuffers;
   var c = vs.count();
   for(var n = 0; n < c; n++){
      var v = vs.get(n);
      if(v.name() == p){
         return v;
      }
   }
   return null;
}

//==========================================================
// <T>获得索引缓冲。</T>
//
// @method
// @return FRenderIndexBuffer 索引缓冲
//==========================================================
function FRenderGeometry_indexBuffer(){
   return this._indexBuffer;
}

//==========================================================
// <T>加载资源。</T>
//
// @param p:resource:FRs3Geometry 资源
//==========================================================
function FRenderGeometry_loadResource(p){
   var o = this;
   var c = o._context;
   // 创建顶点缓冲集合
   var rvs = p.vertexBuffers();
   var rvc = rvs.count();
   for(var n = 0; n < rvc; n++){
      var rv = rvs.get(n);
      var vb = context.createVertexBuffer();
      vb._name = rv.name();
      vb._formatCd = rv.formatCd();
      vb.upload(new Float32Array(rv._data), rv._stride, rv._vertexCount);
      o._vertexBuffers.push(vb);
   }
   // 创建索引缓冲
   var rib = p.indexBuffer();
   var ib = o._indexBuffer = c.createIndexBuffer();
   ib.upload(rib.data(), rib.count());
}
