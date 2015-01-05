//==========================================================
// <T>平面渲染纹理。</T>
//
// @author maocy
// @history 141231
//==========================================================
function FRenderFlatTexture(o){
   o = RClass.inherits(this, o, FRenderTexture);
   //..........................................................
   // @attribute
   o.width     = 0;
   o.height    = 0;
   //..........................................................
   // @method
   o.construct = FRenderFlatTexture_construct;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//==========================================================
function FRenderFlatTexture_construct(){
   var o = this;
   o.__base.FRenderTexture.construct();
   o._textureCd = ERenderTexture.Flat2d;
}
