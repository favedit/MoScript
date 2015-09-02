//==========================================================
// <T>表格页面。</T>
//
// @class
// @author maocy
// @version 150901
//==========================================================
MO.FDuiTableFrame = function FDuiTableFrame(o) {
   o = MO.Class.inherits(this, o, MO.FDuiTable, MO.MUiDataset);
   //..........................................................
   // @property
   o._unitFrameName = MO.Class.register(o, [new MO.APtyString('_unitFrameName'), new MO.AGetSet('_unitFrameName')]);
   o._unitWhere     = MO.Class.register(o, [new MO.APtyString('_unitWhere'), new MO.AGetSet('_unitWhere')]);
   return o;
}
