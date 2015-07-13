//==========================================================
// <T>资源帧信息。</T>
//
// @author maocy
// @history 150109
//==========================================================
MO.FE3sFrame = function FE3sFrame(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute
   o._tick        = MO.Class.register(o, new MO.AGetter('_tick'));
   o._translation = MO.Class.register(o, new MO.AGetter('_translation'));
   o._quaternion  = MO.Class.register(o, new MO.AGetter('_quaternion'));
   o._scale       = MO.Class.register(o, new MO.AGetter('_scale'));
   return o;
}
