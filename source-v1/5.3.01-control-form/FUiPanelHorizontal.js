//==========================================================
// <T>横向面板控件。</T>
//
// @class
// @author maocy
// @version 150420
//==========================================================
function FUiPanelHorizontal(o){
   o = RClass.inherits(this, o, FUiLayoutHorizontal);
   //..........................................................
   // @property
   o._sizeCd = EUiSize.Horizontal;
   return o;
}
