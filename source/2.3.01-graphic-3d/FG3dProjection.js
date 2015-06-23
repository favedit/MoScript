with(MO){
   //==========================================================
   // <T>渲染投影。</T>
   //
   // @author maocy
   // @history 141230
   //==========================================================
   MO.FG3dProjection = function FG3dProjection(o){
      o = RClass.inherits(this, o, FObject);
      //..........................................................
      // @attribute
      o._size        = RClass.register(o, new AGetter('_size'));
      o._angle       = RClass.register(o, new AGetSet('_angle'), 60.0);
      o._fieldOfView = RClass.register(o, new AGetSet('_fieldOfView'), 0);
      o._znear       = RClass.register(o, new AGetSet('_znear'), 0.1);
      o._zfar        = RClass.register(o, new AGetSet('_zfar'), 200.0);
      o._scale       = RClass.register(o, new AGetSet('_scale'), 0);
      //..........................................................
      // @method
      o.construct   = FG3dProjection_construct;
      o.distance    = FG3dProjection_distance;
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FG3dProjection_construct = function FG3dProjection_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
      o._size = new SSize2();
   }

   //==========================================================
   // <T>获得距离。</T>
   //
   // @method
   // @return Number 距离
   //==========================================================
   MO.FG3dProjection_distance = function FG3dProjection_distance(){
      return this._zfar - this._znear;
   }
}
