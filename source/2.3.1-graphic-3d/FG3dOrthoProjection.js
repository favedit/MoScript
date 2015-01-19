//==========================================================
// <T>渲染投影。</T>
//
// @author maocy
// @history 141230
//==========================================================
function FG3dOrthoProjection(o){
   o = RClass.inherits(this, o, FG3dProjection);
   //..........................................................
   // @attribute
   o._matrix       = null;
   //..........................................................
   // @method
   o.construct     = FG3dOrthoProjection_construct;
   o.matrix        = FG3dOrthoProjection_matrix;
   o.update        = FG3dOrthoProjection_update;
   o.updateFrustum = FG3dOrthoProjection_updateFrustum;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FG3dOrthoProjection_construct(){
   var o = this;
   o.__base.FG3dProjection.construct.call(o);
   o._matrix = new SOrthoMatrix3d();
}

//==========================================================
// <T>获得矩阵。</T>
//
// @method
// @return SOrthoMatrix3d 矩阵
//==========================================================
function FG3dOrthoProjection_matrix(){
   return this._matrix;
}

//============================================================
// <T>更新矩阵。</T>
//
// @method
//============================================================
function FG3dOrthoProjection_update(){
   var o = this;
   var s = o._size;
   o._matrix.identity();
   var d = o._matrix.data();
   d[ 0] = 2.0 / s.width * 8.0;
   d[ 4] = d[ 8] = d[12] = 0.0;
   d[ 5] = 2.0 / s.height * 8.0;
   d[ 1] = d[ 9] = d[13] = 0.0;
   d[10] = 1.0 / (o._znear - o._zfar);
   d[ 2] = d[ 6] = d[14] = 0.0;
   d[ 3] = d[ 7] = 0.0;
   d[11] = o._znear / (o._znear - o._zfar);
   d[15] = 1.0;
}

//============================================================
// <T>根据视截体更新矩阵。</T>
//
// @method
// @param p:frustum:SFrustum 视截体
//============================================================
function FG3dOrthoProjection_updateFrustum(p){
   var o = this;
   o._znear = p.minZ;
   o._zfar = p.maxZ;
   o.update();
}
