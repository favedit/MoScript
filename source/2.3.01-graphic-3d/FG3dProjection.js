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
      o._size        = null;
      o._angle       = 60.0;
      o._fieldOfView = 0;
      o._znear       = 0.1;
      o._zfar        = 200.0;
      o._scale       = 0;
      //..........................................................
      // @method
      o.construct   = FG3dProjection_construct;
      o.size        = FG3dProjection_size;
      o.angle       = FG3dProjection_angle;
      o.znear       = FG3dProjection_znear;
      o.zfar        = FG3dProjection_zfar;
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
   // <T>获得尺寸。</T>
   //
   // @method
   // @return SSize2 尺寸
   //==========================================================
   MO.FG3dProjection_size = function FG3dProjection_size(){
      return this._size;
   }

   //==========================================================
   // <T>获得角度。</T>
   //
   // @method
   // @return Number 角度
   //==========================================================
   MO.FG3dProjection_angle = function FG3dProjection_angle(){
      return this._angle;
   }

   //==========================================================
   // <T>获得近平面。</T>
   //
   // @method
   // @return Number 近平面
   //==========================================================
   MO.FG3dProjection_znear = function FG3dProjection_znear(){
      return this._znear;
   }

   //==========================================================
   // <T>获得远平面。</T>
   //
   // @method
   // @return Number 远平面
   //==========================================================
   MO.FG3dProjection_zfar = function FG3dProjection_zfar(){
      return this._zfar;
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
