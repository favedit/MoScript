//==========================================================
// <T>平面渲染纹理。</T>
//
// @author maocy
// @history 141231
//==========================================================
function FG3dFlatTexture(o){
   o = RClass.inherits(this, o, FG3dTexture);
   //..........................................................
   // @attribute
   o._optionFlipY   = false;
   // @attribute
   o._size          = null;
   //..........................................................
   // @method
   o.construct      = FG3dFlatTexture_construct;
   // @method
   o.optionFlipY    = FG3dFlatTexture_optionFlipY;
   o.setOptionFlipY = FG3dFlatTexture_setOptionFlipY;
   o.size           = FG3dFlatTexture_size;
   // @method
   o.uploadData     = RMethod.virtual(o, 'uploadData');
   o.upload         = RMethod.virtual(o, 'upload');
   o.update         = RMethod.empty;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FG3dFlatTexture_construct(){
   var o = this;
   o.__base.FG3dTexture.construct();
   // 设置属性
   o._textureCd = EG3dTexture.Flat2d;
}

//==========================================================
// <T>获得上下反转配置。</T>
//
// @method
// @return Boolean 标志
//==========================================================
function FG3dFlatTexture_optionFlipY(){
   return this._optionFlipY;
}

//==========================================================
// <T>设置上下反转配置。</T>
//
// @method
// @param flag 标志
//==========================================================
function FG3dFlatTexture_setOptionFlipY(flag){
   this._optionFlipY = flag;
}

//==========================================================
// <T>获得大小。</T>
//
// @method
// @return SSize2 大小
//==========================================================
function FG3dFlatTexture_size(){
   return this._size;
}
