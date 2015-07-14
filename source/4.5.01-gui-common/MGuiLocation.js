with(MO){
   //==========================================================
   // <T>位置接口。</T>
   //
   // @face
   // @author maocy
   // @version 150627
   //==========================================================
   MO.MGuiLocation = function MGuiLocation(o){
      o = RClass.inherits(this, o);
      //..........................................................
      // @property
      o._left   = RClass.register(o, [new APtyInteger('_left'), new AGetSet('_left')]);
      o._right  = RClass.register(o, [new APtyInteger('_right'), new AGetSet('_right')]);
      o._top    = RClass.register(o, [new APtyInteger('_top'), new AGetSet('_top')]);
      o._bottom = RClass.register(o, [new APtyInteger('_bottom'), new AGetSet('_bottom')]);
      return o;
   }
}
