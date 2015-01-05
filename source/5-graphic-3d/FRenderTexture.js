//==========================================================
// <T>渲染纹理。</T>
//
// @author maocy
// @history 141230
//==========================================================
function FRenderTexture(o){
   o = RClass.inherits(this, o, FRenderObject);
   //..........................................................
   // @attribute
   o._textureCd  = ERenderTexture.Unknown;
   o._statusLoad = false;
   //..........................................................
   // @method
   o.textureCd   = FRenderTexture_textureCd;
   return o;
}

//==========================================================
// <T>获得渲染纹理类型。</T>
//
// @author maocy
// @return 纹理类型
//==========================================================
function FRenderTexture_textureCd(){
   return this._textureCd;
}
