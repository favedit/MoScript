//==========================================================
// <T>横向面板控件。</T>
//
// @class
// @author maocy
// @version 150420
//==========================================================
MO.FDuiPanelHorizontal = function FDuiPanelHorizontal(o){
   o = MO.Class.inherits(this, o, MO.FDuiLayoutHorizontal);
   //..........................................................
   // @property
   o._sizeCd = MO.EUiSize.Horizontal;
   return o;
}
