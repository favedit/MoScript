//==========================================================
// <T>鼠标滚动接口。</T>
//
// @face
// @author maocy
// @version 150224
//==========================================================
MO.MMouseWheel = function MMouseWheel(o){
   o = RClass.inherits(this, o);
   //..........................................................
   // @event
   o.onMouseWheel = RClass.register(o, new MO.AEventMouseWheel('onMouseWheel'), MO.RMethod.empty);
   return o;
}
