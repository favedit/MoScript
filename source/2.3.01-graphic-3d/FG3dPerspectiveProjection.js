//==========================================================
// <T>渲染投影。</T>
//
// @author maocy
// @history 141230
//==========================================================
MO.FG3dPerspectiveProjection = function FG3dPerspectiveProjection(o){
   o = MO.Class.inherits(this, o, MO.FG3dProjection);
   //..........................................................
   // @attribute
   o._matrix       = MO.Class.register(o, new MO.AGetter('_matrix'));
   //..........................................................
   // @method
   o.construct     = MO.FG3dPerspectiveProjection_construct;
   // @method
   o.update        = MO.FG3dPerspectiveProjection_update;
   o.updateFrustum = MO.FG3dPerspectiveProjection_updateFrustum;
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
   // 设置属性
   o._matrix = new MO.SPerspectiveMatrix3d();
}

//============================================================
// <T>更新矩阵。</T>
//
// @method
//============================================================
MO.FG3dPerspectiveProjection_update = function FG3dPerspectiveProjection_update(){
   var o = this;
   var s = o._size;
   o._fieldOfView = MO.RConst.DEGREE_RATE * o._angle;
   o._matrix.perspectiveFieldOfViewLH(o._fieldOfView, s.width / s.height, o._znear, o._zfar);
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
