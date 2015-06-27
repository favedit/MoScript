//==========================================================
// <T>缓冲对象接口。</T>
//
// @face
// @author maocy
// @history 150430
//==========================================================
MO.MPoolAble = function MPoolAble(o){
   o = MO.Class.inherits(this, o);
   //..........................................................
   // @attribute
   o._poolCode = MO.Class.register(o, new MO.AGetSet('_poolCode'));
   return o;
}
