with(MO){
   //==========================================================
   // <T>表格空列。</T>
   //
   // @class
   // @author maocy
   // @version 150123
   //==========================================================
   MO.FUiColumnEmpty = function FUiColumnEmpty(o){
      o = RClass.inherits(this, o, FColumn);
      // @attribute
      o._dispList         = true;
      // @event
      o.onBuildSearchForm = RMethod.empty;
      return o;
   }
   // ------------------------------------------------------------
}
