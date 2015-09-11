//==========================================================
// <T>显示对象。</T>
//
// @author maocy
// @history 150107
//==========================================================
MO.FE3dDisplay = function FE3dDisplay(o){
   o = MO.Class.inherits(this, o, MO.FDisplay);
   //..........................................................
   // @attribute
   o._outline         = MO.Class.register(o, new MO.AGetter('_outline'));
   o._materials       = MO.Class.register(o, new MO.AGetter('_materials'));
   //..........................................................
   // @method
   o.construct        = MO.FE3dDisplay_construct;
   // @method
   o.calculateOutline = MO.FE3dDisplay_calculateOutline;
   // @method
   o.dispose          = MO.FE3dDisplay_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3dDisplay_construct = function FE3dDisplay_construct(){
   var o = this;
   o.__base.FDisplay.construct.call(o);
   o._outline = new MO.SOutline3d();
}

//==========================================================
// <T>计算轮廓大小。</T>
//
// @method
// @return FG3dMaterial 材质
//==========================================================
MO.FE3dDisplay_calculateOutline = function FE3dDisplay_calculateOutline(){
   return this._outline;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FE3dDisplay_dispose = function FE3dDisplay_dispose(){
   var o = this;
   o._materials = MO.Lang.Object.free(o._materials);
   // 父处理
   o.__base.FDisplay.dispose.call(o);
}
