//==========================================================
// <T>立方渲染纹理。</T>
//
// @author maocy
// @history 141231
//==========================================================
function FRenderCubeTexture(o){
   o = RClass.inherits(this, o, FRenderTexture);
   //..........................................................
   // @attribute
   o.size = 0;
   //..........................................................
   // @method
   o.construct = FRenderTexture_construct;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//==========================================================
function FRenderTexture_construct(){
   var o = this;
   o.__base.FRenderTexture.construct();
   o._textureCd = ERenderTexture.Cube;
}
