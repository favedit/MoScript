//==========================================================
// <T>渲染投影。</T>
//
// @author maocy
// @history 141230
//==========================================================
function FG3dPerspectiveProjection(o){
   o = RClass.inherits(this, o, FG3dProjection);
   //..........................................................
   // @attribute
   o._matrix       = null;
   //..........................................................
   // @method
   o.construct     = FG3dPerspectiveProjection_construct;
   o.matrix        = FG3dPerspectiveProjection_matrix;
   o.update        = FG3dPerspectiveProjection_update;
   o.updateFrustum = FG3dPerspectiveProjection_updateFrustum;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FG3dPerspectiveProjection_construct(){
   var o = this;
   o.__base.FG3dProjection.construct.call(o);
   o._matrix = new SPerspectiveMatrix3d();
}

//==========================================================
// <T>获得矩阵。</T>
//
// @method
// @return SPerspectiveMatrix3d 矩阵
//==========================================================
function FG3dPerspectiveProjection_matrix(){
   return this._matrix;
}

//============================================================
// <T>更新矩阵。</T>
//
// @method
//============================================================
function FG3dPerspectiveProjection_update(){
   var o = this;
   var s = o._size;
   o._fieldOfView = RConst.DEGREE_RATE * o._angle;
   o._matrix.perspectiveFieldOfViewLH(o._fieldOfView, s.width / s.height, o._znear, o._zfar);
}

//============================================================
// <T>根据视截体更新矩阵。</T>
//
// @method
// @param p:frustum:SFrustum 视截体
//============================================================
function FG3dPerspectiveProjection_updateFrustum(p){
   var o = this;
   o._znear = p.minZ;
   o._zfar = p.maxZ;
   o.update();
}
