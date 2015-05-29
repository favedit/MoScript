with(MO){
   //==========================================================
   // <T>渲染几何体。</T>
   //
   // @author maocy
   // @history 150106
   //==========================================================
   MO.FE3rTextureBitmap = function FE3rTextureBitmap(o){
      o = RClass.inherits(this, o, FObject, MGraphicObject);
      //..........................................................
      // @attribute
      o._ready      = false;
      o._bitmapPack = null;
      //..........................................................
      // @method
      o.construct   = FE3rTextureBitmap_construct;
      // @method
      o.texture     = FE3rTextureBitmap_texture;
      // @method
      o.testReady   = FE3rTextureBitmap_testReady;
      o.load        = FE3rTextureBitmap_load;
      // @method
      o.dispose     = FE3rTextureBitmap_dispose;
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FE3rTextureBitmap_construct = function FE3rTextureBitmap_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
   }

   //==========================================================
   // <T>获得纹理。</T>
   //
   // @return 纹理
   //==========================================================
   MO.FE3rTextureBitmap_texture = function FE3rTextureBitmap_texture(){
      return this._bitmapPack.texture();
   }

   //==========================================================
   // <T>测试是否准备好。</T>
   //
   // @return 是否准备好
   //==========================================================
   MO.FE3rTextureBitmap_testReady = function FE3rTextureBitmap_testReady(){
      return this._ready;
   }

   //==========================================================
   // <T>加载网络地址。</T>
   //
   // @method
   // @param p:name:String 名称
   //==========================================================
   MO.FE3rTextureBitmap_load = function FE3rTextureBitmap_load(p){
      var o = this;
      o._bitmapPack = p;
      o._ready = true;
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FE3rTextureBitmap_dispose = function FE3rTextureBitmap_dispose(){
      var o = this;
      o._context = null;
      o._ready = false;
      o._bitmapPack = null;
      o.__base.FObject.dispose.call(o);
   }
}
