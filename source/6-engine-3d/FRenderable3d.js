//==========================================================
// <T>渲染可绘制对象。</T>
//
// @author maocy
// @history 141231
//==========================================================
function FRenderable3d(o){
   o = RClass.inherits(this, o, FRenderable);
   //..........................................................
   // @attribute
   o._matrix        = null;
   // @attribute
   o._effectName    = null;
   o._effect        = null;
   o._materialName  = null;
   o._referMaterial = null;
   o._material      = null;
   //..........................................................
   // @method
   o.construct      = FRenderable3d_construct;
   o.matrix         = FRenderable3d_matrix;
   o.material       = FRenderable3d_material;
   o.update         = FRenderable3d_update;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FRenderable3d_construct(){
   var o = this;
   o.__base.FRenderable.construct.call(o);
   o._matrix = new SMatrix3d();
   o._material = RClass.create(FG3dMaterial);
}

//==========================================================
// <T>获得矩阵。</T>
//
// @method
// @return 矩阵
//==========================================================
function FRenderable3d_matrix(){
   return this._matrix;
}

//==========================================================
// <T>获得材质。</T>
//
// @method
// @return 材质
//==========================================================
function FRenderable3d_material(){
   return this._material;
}

//==========================================================
// <T>更新处理。</T>
//
// @method
//==========================================================
function FRenderable3d_update(p){
   var o = this;
   o.__base.FRenderable.update.call(o, p);
   // 更新矩阵
   o._matrix.assign(p);
}
