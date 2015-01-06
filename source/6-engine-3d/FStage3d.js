//==========================================================
// <T>三维舞台对象。</T>
//
// @author maocy
// @history 150106
//==========================================================
function FStage3d(o){
   o = RClass.inherits(this, o, FStage);
   //..........................................................
   // @attribute
   //o._light      = new SVector(1, -1, 0);
   o._camera     = null;
   o,_projection = null;
   //..........................................................
   // @method
   o.construct   = FStage3d_construct;
   // @method
   o.camera      = FStage3d_camera;
   o.projection  = FStage3d_projection;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FStage3d_construct(){
   var o = this;
   o.__base.FStage.construct.call(o);
   // 创建相机
   var rc = o._camera = RClass.create(FRenderCamera);
   rc.position.set(0, 0, -100);
   rc.lookAt(0, 0, 0);
   rc.update();
   // 创建投影
   var rp = o._projection = RClass.create(FRenderProjection);
   rp.update();
   rc._projection = rp;
}

//==========================================================
// <T>获得相机。</T>
//
// @method
// @return FRenderCamera 相机
//==========================================================
function FStage3d_camera(){
   return this._camera;
}

//==========================================================
// <T>获得投影。</T>
//
// @method
// @return FRenderProjection 投影
//==========================================================
function FStage3d_projection(){
   return this._projection;
}
