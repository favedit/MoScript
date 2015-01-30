//==========================================================
// <T>页面。</T>
//
// @class
// @author maocy
// @version 150120
//==========================================================
function FFrame(o){
   o = RClass.inherits(this, o, FContainer);
   //..........................................................
   // @event
   o.onBuildPanel = FFrame_onBuildPanel
   return o;
}

//==========================================================
// <T>创建一个控件容器。</T>
//
// @method
// @return HtmlTag 页面元素
//==========================================================
function FFrame_onBuildPanel(e){
   var o = this;
   o._hPanel = RBuilder.createTableCell(e.hDocument, o.styleName('Panel'));
   o._hPanel.vAlign = 'top';
}
