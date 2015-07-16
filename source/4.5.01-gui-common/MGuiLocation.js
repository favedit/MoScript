//==========================================================
// <T>位置接口。</T>
//
// @face
// @author maocy
// @version 150627
//==========================================================
MO.MGuiLocation = function MGuiLocation(o){
   o = MO.Class.inherits(this, o);
   //..........................................................
   // @property
   o._left   = MO.Class.register(o, [new MO.APtyInteger('_left'), new MO.AGetSet('_left')]);
   o._right  = MO.Class.register(o, [new MO.APtyInteger('_right'), new MO.AGetSet('_right')]);
   o._top    = MO.Class.register(o, [new MO.APtyInteger('_top'), new MO.AGetSet('_top')]);
   o._bottom = MO.Class.register(o, [new MO.APtyInteger('_bottom'), new MO.AGetSet('_bottom')]);
   return o;
}
