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
   o._itemFrameName = MO.Class.register(o, [new MO.APtyString('_itemFrameName'), new MO.AGetSet('_itemFrameName')]);
   return o;
}
