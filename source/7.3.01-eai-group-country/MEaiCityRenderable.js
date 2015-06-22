with(MO){
   //==========================================================
   // <T>渲染城市数据。</T>
   //
   // @class
   // @author maocy
   // @history 150622
   //==========================================================
   MO.MEaiCityRenderable = function MEaiCityRenderable(o){
      o = RClass.inherits(this, o);
      //..........................................................
      // @attribute
      o._visible  = RClass.register(o, new AGetter('_visible'), true);
      o._location = RClass.register(o, new AGetter('_location'));
      o._size     = RClass.register(o, new AGetter('_size'));
      o._color    = RClass.register(o, new AGetter('_color'));
      //..........................................................
      // @method
      o.construct = MEaiCityRenderable_construct;
      // @method
      o.dispose   = MEaiCityRenderable_dispose;
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.MEaiCityRenderable_construct = function MEaiCityRenderable_construct(){
      var o = this;
      // 设置属性
      o._location = new SPoint2();
      o._size = new SSize2();
      o._color = new SColor4(1, 1, 1, 1);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.MEaiCityRenderable_dispose = function MEaiCityRenderable_dispose(){
      var o = this;
      // 释放属性
      o._location = RObject.dispose(o._location);
      o._size = RObject.dispose(o._size);
      o._color = RObject.dispose(o._color);
   }
}
