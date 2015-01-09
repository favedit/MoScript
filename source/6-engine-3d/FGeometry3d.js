//==========================================================
// <T>渲染几何体。</T>
//
// @author maocy
// @history 141231
//==========================================================
function FGeometry3d(o){
   o = RClass.inherits(this, o, FG3dRenderable);
   //..........................................................
   // @attribute
   o._renderable      = null;
   //..........................................................
   // @method
   o.construct        = FGeometry3d_construct;
   o.testVisible      = FGeometry3d_testVisible;
   o.findVertexBuffer = FGeometry3d_findVertexBuffer;
   o.indexBuffer      = FGeometry3d_indexBuffer;
   o.findTexture      = FGeometry3d_findTexture;
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
   o.__base.FG3dRenderable.construct.call(o);
}

//==========================================================
// <T>测试是否可见。</T>
//
// @method
// @return Boolean 是否可见
//==========================================================
function FGeometry3d_testVisible(p){
   var r = this._renderable;
   return r ? r.testReady() : false;
}

//==========================================================
// <T>查找顶点缓冲。</T>
//
// @method
// @return FG3dVertexBuffer 顶点缓冲
//==========================================================
function FGeometry3d_findVertexBuffer(p){
   return this._renderable.findVertexBuffer(p);
}

//==========================================================
// <T>获得索引缓冲。</T>
//
// @method
// @return FG3dIndexBuffer 索引缓冲
//==========================================================
function FGeometry3d_indexBuffer(){
   return this._renderable.indexBuffer();
}

//==========================================================
// <T>根据名称查找纹理。</T>
//
// @method
// @param p:name:String 名称
// @return FRenderIndexBuffer 纹理
//==========================================================
function FGeometry3d_findTexture(p){
   return this._renderable.findTexture(p);
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
