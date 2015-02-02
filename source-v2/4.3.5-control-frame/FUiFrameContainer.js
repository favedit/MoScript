//==========================================================
// <T>页面。</T>
//
// @class
// @author maocy
// @version 150120
//==========================================================
function FUiFrameContainer(o){
   o = RClass.inherits(this, o, FUiContainer);
   //..........................................................
   // @event
   o.onBuildPanel = FUiFrameContainer_onBuildPanel
   return o;
}

//==========================================================
// <T>创建一个控件容器。</T>
//
// @method
// @return HtmlTag 页面元素
//==========================================================
function FUiFrameContainer_onBuildPanel(e){
   var o = this;
   o._hPanel = RBuilder.createTableCell(e.hDocument, o.styleName('Panel'));
   o._hPanel.vAlign = 'top';
}
