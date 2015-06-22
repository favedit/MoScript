with(MO){
   //==========================================================
   // <T>渲染目标。</T>
   //
   // @author maocy
   // @history 150116
   //==========================================================
   MO.FG3dRenderTarget = function FG3dRenderTarget(o){
      o = RClass.inherits(this, o, FG3dObject);
      //..........................................................
      // @attribute
      o._size     = RClass.register(o, new AGetter('_size'));
      o._color    = RClass.register(o, new AGetter('_color'));
      o._textures = null;
      //..........................................................
      // @method
      o.construct = FG3dRenderTarget_construct;
      // @method
      o.textures  = FG3dRenderTarget_textures;
      // @method
      o.dispose   = FG3dRenderTarget_dispose;
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FG3dRenderTarget_construct = function FG3dRenderTarget_construct(){
      var o = this;
      o.__base.FG3dObject.construct();
      o._size = new SSize2();
      o._color = new SColor4();
      o._color.set(0.0, 0.0, 0.0, 1.0);
   }

   //==========================================================
   // <T>获得纹理集合。</T>
   //
   // @method
   // @return TObejcts 纹理集合
   //==========================================================
   MO.FG3dRenderTarget_textures = function FG3dRenderTarget_textures(){
      var o = this;
      var textures = o._textures;
      if(textures == null){
         textures = o._textures = new TObjects();
      }
      return textures;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FG3dRenderTarget_dispose = function FG3dRenderTarget_dispose(){
      var o = this;
      o._size = RObject.dispose(o._size);
      o._color = RObject.dispose(o._color);
      // 父处理
      o.__base.dispose.construct();
   }
}
