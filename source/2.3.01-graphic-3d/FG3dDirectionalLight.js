with(MO){
   //==========================================================
   // <T>方向光源。</T>
   //
   // @author maocy
   // @history 141230
   //==========================================================
   MO.FG3dDirectionalLight = function FG3dDirectionalLight(o){
      o = RClass.inherits(this, o, FG3dLight);
      //..........................................................
      // @attribute
      o._camera    = RClass.register(o, new AGetter('_camera'));
      o._viewport  = RClass.register(o, new AGetter('_viewport'));
      o._direction = RClass.register(o, new AGetter('_direction'));
      //..........................................................
      // @method
      o.construct  = FG3dDirectionalLight_construct;
      o.dispose    = FG3dDirectionalLight_dispose;
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FG3dDirectionalLight_construct = function FG3dDirectionalLight_construct(){
      var o = this;
      o.__base.FG3dLight.construct.call(o);
      o._camera = RClass.create(FG3dPerspectiveCamera);
      o._direction = new SVector3();
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FG3dDirectionalLight_dispose = function FG3dDirectionalLight_dispose(){
      var o = this;
      o._camera = RObject.dispose(o._camera);
      // 父处理
      o.__base.FG3dLight.dispose.call(o);
   }
}
