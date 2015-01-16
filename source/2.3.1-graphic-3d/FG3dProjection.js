//==========================================================
// <T>渲染投影。</T>
//
// @author maocy
// @history 141230
//==========================================================
function FG3dProjection(o){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   // @attribute
   o.width       = 0;
   o.height      = 0;
   o.angle       = 60;
   o.fieldOfView = 0;
   o.scale       = 0;
   o.znear       = 0.1;
   o.zfar        = 100;
   o._matrix     = null;
   //..........................................................
   // @method
   o.construct   = FG3dProjection_construct;
   o.matrix      = FG3dProjection_matrix;
   o.distance    = FG3dProjection_distance;
   o.update      = FG3dProjection_update;
   o.updateOrtho = FG3dProjection_updateOrtho;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//==========================================================
function FG3dProjection_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._matrix = new SPerspectiveMatrix3d();
}

//==========================================================
// <T>获得距离。</T>
//
// @method
// @return Float 距离
//==========================================================
function FG3dProjection_distance(){
   return this.zfar - this.znear;
}

//==========================================================
// <T>获得矩阵。</T>
//
// @method
// @return SMatrix3d 矩阵
//==========================================================
function FG3dProjection_matrix(){
   return this._matrix;
}

//============================================================
// <T>更新矩阵。</T>
//============================================================
function FG3dProjection_update(){
   var o = this;
   o.fieldOfView = RMath.DEGREE_RATE * o.angle;
   o._matrix.perspectiveFieldOfViewLH(o.fieldOfView, o.width / o.height, o.znear, o.zfar);
}

//============================================================
// <T>更新矩阵。</T>
//============================================================
function FG3dProjection_updateOrtho(){
   var o = this;
   o._matrix.identity();
   var d = o._matrix.data();
   d[ 0] = 2.0 / o.width;
   d[ 4] = d[ 8] = d[12] = 0.0;
   d[ 5] = 2.0 / o.height;
   d[ 1] = d[ 9] = d[13] = 0.0;
   d[10] = 1.0 / (o.znear - o.zfar);
   d[ 2] = d[ 6] = d[14] = 0.0;
   d[ 3] = d[ 7] = 0.0;
   d[11] = o.znear / (o.znear - o.zfar);
   d[15] = 1.0;
}
