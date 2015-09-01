//==========================================================
// <T>容器接口。</T>
//
// @class
// @author maocy
// @version 150610
//==========================================================
MO.MUiContainer = function MUiContainer(o){
   o = MO.Class.inherits(this, o);
   //..........................................................
   // @property
   o._scrollCd   = MO.Class.register(o, new MO.APtyEnum('_scrollCd', null, MO.EUiScroll, MO.EUiScroll.None));
   //..........................................................
   // @method
   o.createChild = MO.Method.empty;
   /// @method
   o.appendChild = MO.Method.empty;
   o.removeChild = MO.Method.empty;
   return o;
}
