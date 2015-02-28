//==========================================================
// <T>渲染材质。</T>
//
// @author maocy
// @history 150107
//==========================================================
MO.Graphic3d.FG3dMaterial = function FG3dMaterial(o){
   o = RClass.inherits(this, o, MO.Graphic3d.FG3dBaseMaterial);
   //..........................................................
   // @attribute
   o._textures = null;
   //..........................................................
   // @method
   o.textures  = FG3dMaterial_textures;
   return o;

   //==========================================================
   // <T>获得纹理集合。</T>
   //
   // @return 纹理集合
   //==========================================================
   function FG3dMaterial_textures(){
      return this._textures;
   }
}
