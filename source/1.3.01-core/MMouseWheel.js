//==========================================================
// <T>鼠标滚动接口。</T>
//
// @face
// @author maocy
// @version 150224
//==========================================================
MO.MMouseWheel = function MMouseWheel(o){
   o = MO.Class.inherits(this, o);
   //..........................................................
   // @event
   o.onMouseWheel = MO.Class.register(o, new MO.AEventMouseWheel('onMouseWheel'), MO.Method.empty);
   return o;
}
