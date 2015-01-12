//==========================================================
// <T>显示对象。</T>
//
// @author maocy
// @history 150107
//==========================================================
function FDisplay3d(o){
   o = RClass.inherits(this, o, FDisplay);
   //..........................................................
   // @attribute
   o._materials = null;
   //..........................................................
   // @method
   o.construct  = FDisplay3d_construct;
   o.materials  = FDisplay3d_materials;
   o.dispose    = FDisplay3d_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDisplay3d_construct(){
   var o = this;
   o.__base.FDisplay.construct.call(o);
   o._materials = new TDictionary();
}

//==========================================================
// <T>获得材质。</T>
//
// @method
// @return FG3dMaterial 材质
//==========================================================
function FDisplay3d_materials(){
   return this._materials;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDisplay3d_dispose(){
   var o = this;
   o._materials = null;
   // 父处理
   o.__base.FDisplay.dispose.call(o);
}
