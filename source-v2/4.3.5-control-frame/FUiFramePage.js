//==========================================================
// <T>页面。</T>
//
// @class
// @author maocy
// @version 150120
//==========================================================
function FUiFramePage(o){
   o = RClass.inherits(this, o, FUiContainer);
   //..........................................................
   // @event
   o.onBuildPanel = FUiFramePage_onBuildPanel
   //..........................................................
   // @method
   o.appendChild  = FUiFramePage_appendChild;
   return o;
}

//==========================================================
// <T>创建一个控件容器。</T>
//
// @method
// @return HtmlTag 页面元素
//==========================================================
function FUiFramePage_onBuildPanel(e){
   var o = this;
   var h = o._hPanel = RBuilder.createTableCell(e.hDocument, o.styleName('Panel'));
   h.vAlign = 'top';
}

//==========================================================
// <T>增加一个控件。</T>
//
// @method
// @param p:control:FUiControl 控件
//==========================================================
function FUiFramePage_appendChild(p){
   var o = this;
   o._hPanel.appendChild(p._hPanel);
}
