//==========================================================
// <T>面板控件。</T>
//
// @class
// @author maocy
// @version 150123
//==========================================================
function FPanel(o){
   o = RClass.inherits(this, o, FLayout, MDesign, MFocus);
   //..........................................................
   // @style
   o._stylePanel = RClass.register(o, new AStyle('_stylePanel', 'Panel'));
   o._styleLabel = RClass.register(o, new AStyle('_styleLabel', 'Label'));
   o._styleBody  = RClass.register(o, new AStyle('_styleBody', 'Body'));
   //..........................................................
   // @event
   o.onBuildPanel = FPanel_onBuildPanel;
   return o;
}

//==========================================================
// <T>创建一个控件容器。</T>
//
// @method
// @return HtmlTag 页面元素
//==========================================================
function FPanel_onBuildPanel(p){
   var o = this;
   //var h = o._hPanel = RBuilder.createTable(p.hDocument, o.styleName('Panel'));
   var h = o._hPanel = RBuilder.createDiv(p.hDocument, o.styleName('Panel'));

   var hl = RBuilder.appendDiv(h, o.styleName('Label'))
   hl.innerHTML = o._label;

   var hb = RBuilder.appendDiv(h, o.styleName('Body'))

   //var hb = RBuilder.appendDiv(h, o.styleName('Body'))

   //var hl = RBuilder.appendTableRowCell(h, o.styleName('Label'))

   //var hp = RBuilder.appendTableRowCell(h, o.styleName('Form'))

   var hf = o._hPanelForm = RBuilder.appendTable(hb, o.styleName('Form'));
   // 设计模式
   if(o._layoutCd == ELayout.Design){
      var hr = RBuilder.appendTableRow(h);
      var hc = RBuilder.appendTableCell(hr);
      o._hContainer = hc;
   }
}