//==========================================================
// <T>渲染材质。</T>
//
// @author maocy
// @history 150107
//==========================================================
MO.FG3dMaterial = function FG3dMaterial(o){
   o = MO.Class.inherits(this, o, MO.FG3dBaseMaterial);
   //..........................................................
   // @attribute
   o._dirty     = true;
   // @attribute
   o._textures  = MO.Class.register(o, new MO.AGetter('_textures'))
   //..........................................................
   // @method
   o.setTexture = MO.FG3dMaterial_setTexture;
   o.update     = MO.FG3dMaterial_update;
   return o;
}

//==========================================================
// <T>获得纹理集合。</T>
//
// @method
// @return 纹理集合
//==========================================================
MO.FG3dMaterial_setTexture = function FG3dMaterial_setTexture(code, texture){
   var o = this;
   var textures = o._textures;
   if(!textures){
      textures = o._textures = new MO.TDictionary();
   }
   textures.set(code, texture);
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
