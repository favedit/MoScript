//==========================================================
// <T>立方渲染纹理。</T>
//
// @author maocy
// @history 141231
//==========================================================
MO.FG3dCubeTexture = function FG3dCubeTexture(o){
   o = MO.Class.inherits(this, o, MO.FG3dTexture);
   //..........................................................
   // @attribute
   o.size = 0;
   //..........................................................
   // @method
   o.construct = MO.FG3dTexture_construct;
   // @method
   o.upload    = MO.Method.virtual(o, 'upload');
   o.update    = MO.Method.empty;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//==========================================================
MO.FG3dTexture_construct = function FG3dTexture_construct(){
   var o = this;
   o.__base.FG3dTexture.construct();
   o._textureCd = MO.EG3dTexture.Cube;
}
