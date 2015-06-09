with(MO){
   //==========================================================
   // <T>平面渲染纹理。</T>
   //
   // @author maocy
   // @history 141231
   //==========================================================
   MO.FG3dFlatTexture = function FG3dFlatTexture(o){
      o = RClass.inherits(this, o, FG3dTexture);
      //..........................................................
      // @attribute
      o._optionFlipY = RClass.register(o, new AGetSet('_optionFlipY'), false);
      // @attribute
      o._size        = RClass.register(o, new AGetter('_size'));
      //..........................................................
      // @method
      o.construct    = FG3dFlatTexture_construct;
      // @method
      o.uploadData   = RMethod.virtual(o, 'uploadData');
      o.upload       = RMethod.virtual(o, 'upload');
      o.update       = RMethod.empty;
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FG3dFlatTexture_construct = function FG3dFlatTexture_construct(){
      var o = this;
      o.__base.FG3dTexture.construct();
      // 设置属性
      o._textureCd = EG3dTexture.Flat2d;
   }
}
