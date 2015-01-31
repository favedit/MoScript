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
   o._sizeCd     = ESize.Horizontal;
   o._stylePanel = RClass.register(o, new AStyle('_stylePanel', 'Panel'));
   o._styleLabel = RClass.register(o, new AStyle('_styleLabel', 'Label'));
   o._styleBody  = RClass.register(o, new AStyle('_styleBody', 'Body'));
   //..........................................................
   // @html
   o._hImage     = null;
   o._imagePlus  = 'control.panel.plus';
   o._imageMinus = 'control.panel.minus';
   o._statusBody = true;
   //..........................................................
   // @event
   o.onBuildPanel = FPanel_onBuildPanel;
   o.onTitleClick = RClass.register(o, new AEventClick('onTitleClick'), FPanel_onTitleClick);
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
   var h = o._hPanel = RBuilder.createDiv(p, o.styleName('Panel'));
   // 创建名称栏
   var hl = RBuilder.appendTable(h, o.styleName('Label'));
   o.attachEvent('onTitleClick', hl);
   hl.width = '100%';
   var hr = RBuilder.appendTableRow(hl);
   hr.vAlign = 'middle';
   var hri = RBuilder.appendTableCell(hr);
   hri.width = 20;
   o._hImage = RBuilder.appendIcon(hri, null, o._imageMinus);
   var hrt = RBuilder.appendTableCell(hr);
   hrt.innerHTML = o._label;
   //var hl = RBuilder.appendDiv(h, o.styleName('Label'))
   //hl.innerHTML = o._label;
   // 创建内容栏
   var hb = o._hBody = RBuilder.appendDiv(h, o.styleName('Body'))
   o._hPanelForm = RBuilder.appendTable(hb, o.styleName('Form'), null, 0, 1);
}

//==========================================================
// <T>创建一个控件容器。</T>
//
// @method
// @return HtmlTag 页面元素
//==========================================================
function FPanel_onTitleClick(p){
   var o = this;
   var s = !o._statusBody;
   o._statusBody = s;
   o._hImage.src = RResource.iconPath(s ? o._imageMinus : o._imagePlus);
   RHtml.displaySet(o._hBody, s);
}
