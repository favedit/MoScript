//==========================================================
// <T>渲染过程。</T>
//
// @author maocy
// @history 141230
//==========================================================
function FG3dTechniquePass(o){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   // @attribute
   o._name    = null;
   o._context = null;
   //..........................................................
   // @method
   o._name    = FG3dTechniquePass_name;
   return o;
}

//==========================================================
// <T>获得名称。</T>
//
// @method
// @return 名称
//==========================================================
function FG3dTechniquePass_name(){
   return this._name;
}
