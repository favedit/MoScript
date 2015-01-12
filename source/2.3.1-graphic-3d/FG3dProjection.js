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
   o.znear       = 0.01;
   o.zfar        = 200;
   o.matrix     = null;
   //..........................................................
   // @method
   o.construct = FG3dProjection_construct;
   o.update    = FG3dProjection_update;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//==========================================================
function FG3dProjection_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o.matrix = new SPerspectiveMatrix3d();
}

//============================================================
// <T>更新矩阵。</T>
//============================================================
function FG3dProjection_update(){
   var o = this;
   o.fieldOfView = RMath.DEGREE_RATE * o.angle;
   o.matrix.perspectiveFieldOfViewLH(o.fieldOfView, o.width / o.height, o.znear, o.zfar);
}
