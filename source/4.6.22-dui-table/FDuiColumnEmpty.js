//==========================================================
// <T>表格空列。</T>
//
// @class
// @author maocy
// @version 150123
//==========================================================
MO.FDuiColumnEmpty = function FDuiColumnEmpty(o){
   o = MO.Class.inherits(this, o, FDuiColumn);
   // @attribute
   o._dispList         = true;
   // @event
   o.onBuildSearchForm = MO.Method.empty;
   return o;
}
