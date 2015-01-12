//==========================================================
// <T>渲染纹理。</T>
//
// @author maocy
// @history 141230
//==========================================================
function FG3dTexture(o){
   o = RClass.inherits(this, o, FG3dObject);
   //..........................................................
   // @attribute
   o._textureCd  = EG3dTexture.Unknown;
   o._statusLoad = false;
   //..........................................................
   // @method
   o.textureCd   = FG3dTexture_textureCd;
   return o;
}

//==========================================================
// <T>获得渲染纹理类型。</T>
//
// @author maocy
// @return 纹理类型
//==========================================================
function FG3dTexture_textureCd(){
   return this._textureCd;
}
