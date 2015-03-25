//==========================================================
// <T>网格渲染对象。</T>
//
// @author maocy
// @history 150202
//==========================================================
function FE3dMeshDisplay(o){
   o = RClass.inherits(this, o, FE3dDisplay, MLinkerResource);
   //..........................................................
   // @attribute
   o._material   = null;
   o._renderable = null;
   //..........................................................
   // @method
   o.renderable  = FE3dMeshDisplay_renderable;
   o.load        = FE3dMeshDisplay_load;
   return o;
}

//==========================================================
// <T>获得渲染对象。</T>
//
// @method
// @return FE3rMesh 渲染对象
//==========================================================
function FE3dMeshDisplay_renderable(){
   return this._renderable;
}

//==========================================================
// <T>加载渲染对象。</T>
//
// @param p:renderable:FE3dMesh 渲染对象
//==========================================================
function FE3dMeshDisplay_load(resource){
   var o = this;
   o._resource = resource;
   o._matrix.assign(resource.matrix());
}
