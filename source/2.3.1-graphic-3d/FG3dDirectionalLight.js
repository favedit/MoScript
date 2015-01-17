//==========================================================
// <T>方向光源。</T>
//
// @author maocy
// @history 141230
//==========================================================
function FG3dDirectionalLight(o){
   o = RClass.inherits(this, o, FG3dLight);
   //..........................................................
   // @attribute
   o._camera     = null;
   o._viewport   = null;
   o._direction  = null;
   //..........................................................
   // @method
   o.construct   = FG3dDirectionalLight_construct;
   o.camera      = FG3dDirectionalLight_camera;
   o.projection  = FG3dDirectionalLight_projection;
   o.viewport    = FG3dDirectionalLight_viewport;
   o.direction   = FG3dDirectionalLight_direction;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FG3dDirectionalLight_construct(){
   var o = this;
   o.__base.FG3dLight.construct.call(o);
   o._direction = new SVector3();
   //o._camera = RClass.create(FG3dOrthoCamera);
   o._camera = RClass.create(FG3dPerspectiveCamera);
   o._viewport = RClass.create(FG3dViewport);
}

//==========================================================
// <T>获得相机。</T>
//
// @method
// @return FG3dCamera 相机
//==========================================================
function FG3dDirectionalLight_camera(){
   return this._camera;
}

//==========================================================
// <T>获得投影。</T>
//
// @method
// @return FG3dProjection 投影
//==========================================================
function FG3dDirectionalLight_projection(){
   return this._projection;
}

//==========================================================
// <T>获得视角。</T>
//
// @method
// @return FG3dCamera 视角
//==========================================================
function FG3dDirectionalLight_viewport(){
   return this._viewport;
}

//==========================================================
// <T>获得方向。</T>
//
// @method
// @return SVector3 方向
//==========================================================
function FG3dDirectionalLight_direction(){
   return this._direction;
}
