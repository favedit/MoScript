//==========================================================
// <T>渲染投影。</T>
//
// @author maocy
// @history 141230
//==========================================================
MO.FG3dPerspectiveProjection = function FG3dPerspectiveProjection(o){
   o = MO.Class.inherits(this, o, MO.FG3dProjection);
   //..........................................................
   // @method
   o.construct     = MO.FG3dPerspectiveProjection_construct;
   // @method
   o.update        = MO.FG3dPerspectiveProjection_update;
   o.updateFrustum = MO.FG3dPerspectiveProjection_updateFrustum;
   // @method
   o.dispose       = MO.FG3dPerspectiveProjection_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FG3dPerspectiveProjection_construct = function FG3dPerspectiveProjection_construct(){
   var o = this;
   o.__base.FG3dProjection.construct.call(o);
}

//============================================================
// <T>更新矩阵。</T>
//
// @method
//============================================================
MO.FG3dPerspectiveProjection_update = function FG3dPerspectiveProjection_update(){
   var o = this;
   var size = o._size;
   o._fieldOfView = MO.RConst.DEGREE_RATE * o._angle;
   MO.Lang.Matrix.perspectiveFieldOfViewLH(o._matrix, o._fieldOfView, size.width / size.height, o._znear, o._zfar);
}

//============================================================
// <T>根据视截体更新矩阵。</T>
//
// @method
// @param p:frustum:SFrustum 视截体
//============================================================
MO.FG3dPerspectiveProjection_updateFrustum = function FG3dPerspectiveProjection_updateFrustum(p){
   var o = this;
   o._znear = p.minZ;
   o._zfar = p.maxZ;
   o.update();
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FG3dPerspectiveProjection_dispose = function FG3dPerspectiveProjection_dispose(){
   var o = this;
   // 父处理
   o.__base.FG3dProjection.dispose.call(o);
}
