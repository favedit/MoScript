//==========================================================
// <T>渲染相机。</T>
//
// @author maocy
// @history 141231
//==========================================================
MO.FE3dOrthoCamera = function FE3dOrthoCamera(o){
   o = MO.Class.inherits(this, o, MO.FE3dCamera);
   //..........................................................
   // @method
   o.construct = MO.FE3dOrthoCamera_construct;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3dOrthoCamera_construct = function FE3dOrthoCamera_construct(){
   var o = this;
   o.__base.FE3dCamera.construct.call(o);
   // 初始化变量
   o._projection = MO.Class.create(MO.FG3dOrthoProjection);
}
