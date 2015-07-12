//==========================================================
// <T>渲染投影。</T>
//
// @author maocy
// @history 141230
//==========================================================
MO.FG3dOrthoProjection = function FG3dOrthoProjection(o){
   o = MO.Class.inherits(this, o, MO.FG3dProjection);
   //..........................................................
   // @attribute
   o._matrix       = MO.Class.register(o, new MO.AGetter('_matrix'));
   //..........................................................
   // @method
   o.construct     = MO.FG3dOrthoProjection_construct;
   o.update        = MO.FG3dOrthoProjection_update;
   o.updateFrustum = MO.FG3dOrthoProjection_updateFrustum;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FG3dOrthoProjection_construct = function FG3dOrthoProjection_construct(){
   var o = this;
   o.__base.FG3dProjection.construct.call(o);
   // 设置属性
   o._matrix = new MO.SOrthoMatrix3d();
}

//============================================================
// <T>更新矩阵。</T>
//
// @method
//============================================================
MO.FG3dOrthoProjection_update = function FG3dOrthoProjection_update(){
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
MO.FG3dOrthoProjection_updateFrustum = function FG3dOrthoProjection_updateFrustum(p){
   var o = this;
   o._znear = p.minZ;
   o._zfar = p.maxZ;
   o.update();
}
