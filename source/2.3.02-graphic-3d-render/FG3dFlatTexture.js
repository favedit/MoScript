//==========================================================
// <T>平面渲染纹理。</T>
//
// @author maocy
// @history 141231
//==========================================================
MO.FG3dFlatTexture = function FG3dFlatTexture(o){
   o = MO.Class.inherits(this, o, MO.FG3dTexture);
   //..........................................................
   // @attribute
   o._optionFlipY = MO.Class.register(o, new MO.AGetSet('_optionFlipY'), false);
   // @attribute
   o._size        = MO.Class.register(o, new MO.AGetter('_size'));
   //..........................................................
   // @method
   o.construct    = MO.FG3dFlatTexture_construct;
   // @method
   o.uploadData   = MO.Method.virtual(o, 'uploadData');
   o.upload       = MO.Method.virtual(o, 'upload');
   o.update       = MO.Method.empty;
   // @method
   o.dispose      = MO.FG3dFlatTexture_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FG3dFlatTexture_construct = function FG3dFlatTexture_construct(){
   var o = this;
   o.__base.FG3dTexture.construct.call(o);
   // 设置属性
   o._textureCd = MO.EG3dTexture.Flat2d;
   o._size = new MO.SSize2();
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FG3dFlatTexture_dispose = function FG3dFlatTexture_dispose(){
   var o = this;
   // 释放属性
   o._size = MO.Lang.Object.dispose(o._size);
   // 父处理
   o.__base.FG3dTexture.dispose.call(o);
}
