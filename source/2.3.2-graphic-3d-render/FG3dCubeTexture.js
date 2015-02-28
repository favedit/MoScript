//==========================================================
// <T>立方渲染纹理。</T>
//
// @author maocy
// @history 141231
//==========================================================
MO.Graphic3d.FG3dCubeTexture = function FG3dCubeTexture(o){
   o = RClass.inherits(this, o, MO.Graphic3d.FG3dTexture);
   //..........................................................
   // @attribute
   o.size = 0;
   //..........................................................
   // @method
   o.construct = FG3dTexture_construct;
   return o;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   function FG3dTexture_construct(){
      var o = this;
      o.__base.FG3dTexture.construct();
      o._textureCd = EG3dTexture.Cube;
   }
}
