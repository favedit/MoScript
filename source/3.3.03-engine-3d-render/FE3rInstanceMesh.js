//==========================================================
// <T>渲染模型网格。</T>
//
// @author maocy
// @history 150106
//==========================================================
MO.FE3rInstanceMesh = function FE3rInstanceMesh(o){
   o = MO.Class.inherits(this, o, MO.FE3rMesh);
   //..........................................................
   // @attribute
   o._merges         = null;
   //..........................................................
   // @method
   o.construct       = MO.FE3rInstanceMesh_construct;
   // @method
   o.mergeRenderable = MO.FE3rInstanceMesh_mergeRenderable;
   o.build           = MO.FE3rInstanceMesh_build;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3rInstanceMesh_construct = function FE3rInstanceMesh_construct(){
   var o = this;
   o.__base.FE3rMesh.construct.call(o);
   o._merges = new MO.TObjects();
}

//==========================================================
// <T>合并一个渲染对象。</T>
//
// @method
//==========================================================
MO.FE3rInstanceMesh_mergeRenderable = function FE3rInstanceMesh_mergeRenderable(p){
   this._merges.push(p);
}

//==========================================================
// <T>构建对象。</T>
//
// @method
// @return String 唯一编号
//==========================================================
MO.FE3rInstanceMesh_build = function FE3rInstanceMesh_build(){
}
