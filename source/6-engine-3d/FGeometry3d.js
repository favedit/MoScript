//==========================================================
// <T>渲染几何体。</T>
//
// @author maocy
// @history 141231
//==========================================================
function FGeometry3d(o){
   o = RClass.inherits(this, o, FRenderable);
   //..........................................................
   // @attribute
   o._renderable      = null;
   //..........................................................
   // @method
   o.construct        = FGeometry3d_construct;
   o.findVertexBuffer = FGeometry3d_findVertexBuffer;
   o.indexBuffer      = FGeometry3d_indexBuffer;
   o.load             = FGeometry3d_load;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FGeometry3d_construct(){
   var o = this;
   o.__base.FRenderable.construct.call(o);
}

//==========================================================
// <T>查找顶点缓冲。</T>
//
// @method
// @param p:name:String 名称
//==========================================================
function FGeometry3d_findVertexBuffer(p){
   return this._renderable.findVertexBuffer(p);
}

//==========================================================
// <T>获得索引缓冲。</T>
//
// @method
// @return FRenderIndexBuffer 索引缓冲
//==========================================================
function FGeometry3d_indexBuffer(){
   return this._renderable.indexBuffer();
}

//==========================================================
// <T>加载资源。</T>
//
// @param p:resource:FRs3Geometry 资源
//==========================================================
function FGeometry3d_load(p){
   var o = this;
   o._renderable = p;
}
