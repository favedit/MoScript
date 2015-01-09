//==========================================================
// <T>渲染材质。</T>
//
// @author maocy
// @history 150107
//==========================================================
function FG3dMaterialTexture(o){
   o = RClass.inherits(this, o, FG3dMaterial);
   //..........................................................
   // 设置合并
   o._texture  = null;
   //..........................................................
   // @method
   o.construct = FG3dMaterialTexture_construct;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FG3dMaterialTexture_construct(){
   var o = this;
}
