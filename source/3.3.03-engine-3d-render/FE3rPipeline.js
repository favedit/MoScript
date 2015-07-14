//==========================================================
// <T>渲染几何体。</T>
//
// @author maocy
// @history 141231
//==========================================================
MO.FE3rPipeline = function FE3rPipeline(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute
   o._vertexBuffers   = null;
   o._indexBuffer     = null;
   //..........................................................
   // @method
   o.construct        = MO.FE3rPipeline_construct;
   o.findVertexBuffer = MO.FE3rPipeline_findVertexBuffer;
   o.loadResource     = MO.FE3rPipeline_loadResource;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3rPipeline_construct = function FE3rPipeline_construct(){
   var o = this;
   o.__base.FRenderable.construct.call(o);
   o._vertexBuffers = new MO.TObjects();
}

//==========================================================
// <T>查找顶点缓冲。</T>
//
// @method
// @param p:name:String 名称
//==========================================================
MO.FE3rPipeline_findVertexBuffer = function FE3rPipeline_findVertexBuffer(p){
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
// <T>加载资源。</T>
//
// @param p:resource:FE3sGeometry 资源
//==========================================================
MO.FE3rPipeline_loadResource = function FE3rPipeline_loadResource(p){
   var o = this;
   var c = o._context;
   // 创建顶点缓冲集合
   var rvs = p.vertexBuffers();
   var rvc = rvs.count();
   for(var n = 0; n < rvc; n++){
      var rv = rvs.get(n);
      var vb = context.createVertexBuffer();
      vb._name = rv.name();
      vb.upload(new Float32Array(rv._data), rv._stride, rv._vertexCount);
      o._vertexBuffers.push(vb);
   }
   // 创建索引缓冲
   var rib = p.indexBuffer();
   var ib = o._indexBuffer = c.createIndexBuffer();
   ib.upload(rib.data(), rib.count());
}
