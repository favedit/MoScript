with(MO){
   //==========================================================
   // <T>渲染几何体。</T>
   //
   // @author maocy
   // @history 150106
   //==========================================================
   MO.FE3rTextureBitmapPack = function FE3rTextureBitmapPack(o){
      o = RClass.inherits(this, o, FObject, MGraphicObject);
      //..........................................................
      // @attribute
      o._resource    = null;
      o._image       = null;
      o._texture     = null;
      // @attribute
      o._ready       = false;
      o._dataReady   = false;
      //..........................................................
      o.onLoad       = RMethod.virtual(o, 'onLoad');
      //..........................................................
      // @method
      o.construct    = FE3rTextureBitmapPack_construct;
      // @method
      o.texture      = FE3rTextureBitmapPack_texture;
      // @method
      o.testReady    = FE3rTextureBitmapPack_testReady;
      o.loadResource = RMethod.virtual(o, 'loadResource');
      // @method
      o.dispose      = FE3rTextureBitmapPack_dispose;
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FE3rTextureBitmapPack_construct = function FE3rTextureBitmapPack_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
   }

   //==========================================================
   // <T>获得纹理。</T>
   //
   // @return 纹理
   //==========================================================
   MO.FE3rTextureBitmapPack_texture = function FE3rTextureBitmapPack_texture(){
      return this._texture;
   }

   //==========================================================
   // <T>测试是否准备好。</T>
   //
   // @return 是否准备好
   //==========================================================
   MO.FE3rTextureBitmapPack_testReady = function FE3rTextureBitmapPack_testReady(){
      var o = this;
      if(o._dataReady){
         o._ready = o._texture.isValid();
      }
      return o._ready;
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FE3rTextureBitmapPack_dispose = function FE3rTextureBitmapPack_dispose(){
      var o = this;
      o._ready = false;
      o._dataReady = false;
      o.__base.FObject.dispose.call(o);
   }
}
