with(MO){
   //==========================================================
   // <T>渲染材质。</T>
   //
   // @author maocy
   // @history 150107
   //==========================================================
   MO.FG3dMaterial = function FG3dMaterial(o){
      o = RClass.inherits(this, o, FG3dBaseMaterial);
      //..........................................................
      // @attribute
      o._dirty    = true;
      // @attribute
      o._textures = null;
      //..........................................................
      // @method
      o.textures  = FG3dMaterial_textures;
      o.update    = FG3dMaterial_update;
      return o;
   }

   //==========================================================
   // <T>获得纹理集合。</T>
   //
   // @method
   // @return 纹理集合
   //==========================================================
   MO.FG3dMaterial_textures = function FG3dMaterial_textures(){
      return this._textures;
   }

   //==========================================================
   // <T>获得纹理集合。</T>
   //
   // @method
   // @return 纹理集合
   //==========================================================
   MO.FG3dMaterial_update = function FG3dMaterial_update(){
      this._dirty = true;
   }
}
