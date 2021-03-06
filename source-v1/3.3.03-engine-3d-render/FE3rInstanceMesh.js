//==========================================================
// <T>渲染模型网格。</T>
//
// @author maocy
// @history 150106
//==========================================================
function FE3rInstanceMesh(o){
   o = RClass.inherits(this, o, FE3rMesh);
   //..........................................................
   // @attribute
   o._merges         = null;
   //..........................................................
   // @method
   o.construct       = FE3rInstanceMesh_construct;
   // @method
   o.mergeRenderable = FE3rInstanceMesh_mergeRenderable;
   o.build           = FE3rInstanceMesh_build;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3rInstanceMesh_construct(){
   var o = this;
   o.__base.FE3rMesh.construct.call(o);
   o._merges = new TObjects();
}

//==========================================================
// <T>合并一个渲染对象。</T>
//
// @method
//==========================================================
function FE3rInstanceMesh_mergeRenderable(p){
   this._merges.push(p);
}

//==========================================================
// <T>构建对象。</T>
//
// @method
// @return String 唯一编号
//==========================================================
function FE3rInstanceMesh_build(){
}
