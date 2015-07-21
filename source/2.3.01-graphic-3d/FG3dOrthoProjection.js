//==========================================================
// <T>渲染正交投影。</T>
//
// @author maocy
// @history 141230
//==========================================================
MO.FG3dOrthoProjection = function FG3dOrthoProjection(o){
   o = MO.Class.inherits(this, o, MO.FG3dProjection);
   //..........................................................
   // @method
   o.construct     = MO.FG3dOrthoProjection_construct;
   // @method
   o.update        = MO.FG3dOrthoProjection_update;
   o.updateFrustum = MO.FG3dOrthoProjection_updateFrustum;
   // @method
   o.dispose       = MO.FG3dOrthoProjection_dispose;
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
}

//============================================================
// <T>更新矩阵。</T>
//
// @method
//============================================================
MO.FG3dOrthoProjection_update = function FG3dOrthoProjection_update(){
   var o = this;
   var size = o._size;
   var left = -size.width * 0.5;
   var top = -size.height * 0.5;
   MO.Lang.Matrix.orthoLH(o._matrix, left, top, size.width, size.height, o._znear, o._zfar);
}

//============================================================
// <T>根据视截体更新矩阵。</T>
//
// @method
// @param frustum:SFrustum 视截体
//============================================================
MO.FG3dOrthoProjection_updateFrustum = function FG3dOrthoProjection_updateFrustum(frustum){
   var o = this;
   o._znear = frustum.minZ;
   o._zfar = frustum.maxZ;
   o.update();
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FG3dOrthoProjection_dispose = function FG3dOrthoProjection_dispose(){
   var o = this;
   // 父处理
   o.__base.FG3dProjection.dispose.call(o);
}
