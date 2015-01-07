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
   o._direction = null;
   //..........................................................
   // @method
   o.construct = FG3dDirectionalLight_construct;
   o.direction = FG3dDirectionalLight_direction;
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
