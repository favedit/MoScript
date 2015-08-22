//==========================================================
// <T>面板控件。</T>
//
// @class
// @author maocy
// @version 150123
//==========================================================
MO.FDuiPanel = function FDuiPanel(o){
   o = MO.Class.inherits(this, o, MO.FDuiLayout, MO.MDuiDesign, MO.MDuiFocus);
   //..........................................................
   // @style
   o._sizeCd      = MO.EUiSize.Horizontal;
   o._stylePanel  = MO.Class.register(o, new MO.AStyle('_stylePanel', 'Panel'));
   o._styleLabel  = MO.Class.register(o, new MO.AStyle('_styleLabel', 'Label'));
   o._styleBody   = MO.Class.register(o, new MO.AStyle('_styleBody', 'Body'));
   //..........................................................
   // @html
   o._hImage      = null;
   o._imagePlus   = 'control.panel.plus';
   o._imageMinus  = 'control.panel.minus';
   o._statusBody  = true;
   //..........................................................
   // @event
   o.onBuildPanel = MO.FDuiPanel_onBuildPanel;
   o.onTitleClick = MO.Class.register(o, new MO.AEventClick('onTitleClick'), MO.FDuiPanel_onTitleClick);
   return o;
}

//==========================================================
// <T>创建一个控件容器。</T>
//
// @method
// @return HtmlTag 页面元素
//==========================================================
MO.FDuiPanel_onBuildPanel = function FDuiPanel_onBuildPanel(p){
   var o = this;
   var h = o._hPanel = MO.Window.Builder.createDiv(p, o.styleName('Panel'));
   // 创建名称栏
   var hl = MO.Window.Builder.appendTable(h, o.styleName('Label'));
   o.attachEvent('onTitleClick', hl);
   hl.width = '100%';
   var hr = MO.Window.Builder.appendTableRow(hl);
   hr.vAlign = 'middle';
   var hri = MO.Window.Builder.appendTableCell(hr);
   hri.width = 20;
   o._hImage = MO.Window.Builder.appendIcon(hri, null, o._imageMinus);
   var hrt = MO.Window.Builder.appendTableCell(hr);
   hrt.innerHTML = o._label;
   //var hl = MO.Window.Builder.appendDiv(h, o.styleName('Label'))
   //hl.innerHTML = o._label;
   // 创建内容栏
   var hb = o._hBody = MO.Window.Builder.appendDiv(h, o.styleName('Body'))
   o._hPanelForm = MO.Window.Builder.appendTable(hb, o.styleName('Form'));
}

//==========================================================
// <T>创建一个控件容器。</T>
//
// @method
// @return HtmlTag 页面元素
//==========================================================
MO.FDuiPanel_onTitleClick = function FDuiPanel_onTitleClick(p){
   var o = this;
   var status = !o._statusBody;
   o._statusBody = status;
   o._hImage.src = MO.Window.Resource.iconPath(status ? o._imageMinus : o._imagePlus);
   MO.Window.Html.displaySet(o._hBody, status);
}
