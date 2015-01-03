//==========================================================
// <T>渲染投影。</T>
//
// @author maocy
// @history 141230
//==========================================================
function FRenderProjection(o){
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
   o.construct = FRenderProjection_construct;
   o.update    = FRenderProjection_update;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//==========================================================
function FRenderProjection_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o.matrix = new SPerspectiveMatrix3d();
}

//============================================================
// <T>更新矩阵。</T>
//============================================================
function FRenderProjection_update(){
   var o = this;
   o.fieldOfView = RMath.DEGREE_RATE * o.angle;
   o.matrix.perspectiveFieldOfViewLH(o.fieldOfView, o.width / o.height, o.znear, o.zfar);
}
