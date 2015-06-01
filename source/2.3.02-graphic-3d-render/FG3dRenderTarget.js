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
      o._size     = null;
      o._color    = null;
      o._textures = null;
      //..........................................................
      // @method
      o.construct = FG3dRenderTarget_construct;
      // @method
      o.size      = FG3dRenderTarget_size;
      o.color     = FG3dRenderTarget_color;
      o.textures  = FG3dRenderTarget_textures;
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
   // <T>获得尺寸。</T>
   //
   // @method
   // @return SSize2 尺寸
   //==========================================================
   MO.FG3dRenderTarget_size = function FG3dRenderTarget_size(){
      return this._size;
   }

   //==========================================================
   // <T>获得颜色。</T>
   //
   // @method
   // @return SColor4 颜色
   //==========================================================
   MO.FG3dRenderTarget_color = function FG3dRenderTarget_color(){
      return this._color;
   }

   //==========================================================
   // <T>获得纹理集合。</T>
   //
   // @method
   // @return TObejcts 纹理集合
   //==========================================================
   MO.FG3dRenderTarget_textures = function FG3dRenderTarget_textures(){
      var o = this;
      var r = o._textures;
      if(r == null){
         r = o._textures = new TObjects();
      }
      return r;
   }
}
