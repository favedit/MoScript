//==========================================================
// <T>显示对象。</T>
//
// @author maocy
// @history 150107
//==========================================================
function FE3dDisplay(o){
   o = RClass.inherits(this, o, FDisplay);
   //..........................................................
   // @attribute
   o._materials = null;
   //..........................................................
   // @method
   o.construct  = FE3dDisplay_construct;
   o.materials  = FE3dDisplay_materials;
   o.dispose    = FE3dDisplay_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3dDisplay_construct(){
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
function FE3dDisplay_materials(){
   return this._materials;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FE3dDisplay_dispose(){
   var o = this;
   o._materials = RObject.free(o._materials);
   // 父处理
   o.__base.FDisplay.dispose.call(o);
}
