/**************************************************************
 * 消息弹出框
 * 
 * @class
 * @author maochunyang
 * @version 1.0.1
 **************************************************************/
function FInfoWindow(o, c){
   //alert(FMessageWindow);
   o = RClass.inherits(this, o, FWindow);
   // Attribute
   o.type            = null;
   o.isDialog        = false;
   o.titleBlur       = false;
   o.content         = c;
   o.icon             = '#com.FInfoWindow_Info';
   o.result          = false;
   // css
   o.stMsgPanel      = RClass.register(o, new TStyle('MsgPanel'));
   o.stButtonPanel   = RClass.register(o, new TStyle('ButtonPanel'));
   o.stItmeForm      = RClass.register(o, new TStyle('ItmeForm'));
   o.stItemTitle     = RClass.register(o, new TStyle('ItemTitle'));
   o.stItemBodyForm  = RClass.register(o, new TStyle('ItemBodyForm'));
   o.stRowItem       = RClass.register(o, new TStyle('RowItem'));
   o.stDescForm      = RClass.register(o, new TStyle('DescForm'));
   o.stDescTitle     = RClass.register(o, new TStyle('DescTitle'));
   o.stDescBody      = RClass.register(o, new TStyle('DescBody'));
   // Event
   // 
   o.lsns            = new TListeners();
   // Html
   o.hMessagePanel   = null;
   o.hMessages       = null;
   o.hDescription    = null;
   o.hButtonPanel    = null;
   // Process
   o.oeBuild         = FInfoWindow_oeBuild;
   o.buildEdit       = FInfoWindow_buildEdit;
   // Event
   o.onOk            = FInfoWindow_onOk;
   o.onCancel        = FInfoWindow_onCancel;
   o.onClose         = FInfoWindow_onClose;
   o.setText         = FInfoWindow_setText;
   // Method
   o.show            = FInfoWindow_show;
   o.hide            = FInfoWindow_hide;
   o.dispose         = FInfoWindow_dispose;
   return o;
}
// ------------------------------------------------------------
function FInfoWindow_oeBuild(e){
   var o = this;
   var r = o.base.FWindow.oeBuild.call(o, e);
   if(e.isAfter()){
     o.hPanel.style.width = '400px';
      o.buildEdit();
      RConsole.find(FKeyConsole).register(EKey.Esc, new TListener(o, o.onClose));
   }
   return r;
}
// ------------------------------------------------------------
function FInfoWindow_onOk(){
   this.hide();
   this.result = true;
}
// ------------------------------------------------------------
function FInfoWindow_onCancel(){
   this.hide();
   this.result = false;
   return true;
}
// ------------------------------------------------------------
function FInfoWindow_onClose(){
   this.hide();
   this.result = false;
   return false
}
// ------------------------------------------------------------
function FInfoWindow_setText(t){
   this.hText.innerText = ' ' + t;
}
// ------------------------------------------------------------
function FInfoWindow_show(){
   var o = this;
   o.base.FWindow.show.call(o);
   o.panel().style.zIndex = RLayer.next(ELayer.Message);
   RWindow.moveCenter(o.panel());
   o.psMode(EMode.Update);
   RConsole.find(FFocusConsole).blur();
   top.RWindow.setEnable(false, true);
   o.focus();
}
// ------------------------------------------------------------
function FInfoWindow_buildEdit(){
   var o = this;
   var h = o.hBodyPanel;
   o.hBodyPanel.style.height = 100;
   var hTab = RBuilder.appendTable(o.hBodyPanel, 0, 0, 0);
   hTab.style.height = '100%';
   hTab.style.width = '100%';
   var hRow1 = hTab.insertRow();
   var hcp = hRow1.insertCell();
   var htp = RBuilder.appendTable(hcp, 0, 0, 0);
   var hcr = htp.insertRow();
   var hc11 = o.hText = hcr.insertCell();
   hc11.style.width = '400px';
   hc11.style.height = '50px';
   hc11.vAlign = 'middle';
   hc11.align = 'center';
   //he.size = 60;
   var hRow3 = hTab.insertRow();
   var hc31 = hRow3.insertCell();
   hc31.align = 'right';
   var hBtb = RBuilder.appendTable(hc31);
   var hBr = hBtb.insertRow();
   // Ok
   var hBc1 = hBr.insertCell();
   var b = o.btnOk = RClass.create(FButton);
   b.icon = 'tool.ok';
   b.label = RContext.get('FToolButton:ok');
   b.lsnsClick.register(o, o.onOk);
   b.psBuild(hBc1);
   o.setIcon('TitleInfo');
   o.setCaption('操作提示');
}
// ------------------------------------------------------------
function FInfoWindow_hide(){
   var o = this;
   o.base.FWindow.hide.call(o);
   top.RWindow.setEnable(true);
}
// ------------------------------------------------------------
function FInfoWindow_dispose(){
   var o = this;
   o.base.FWindow.dispose.call(o);
   RMemory.freeHtml(o.hBodyPanel);
   RMemory.freeHtml(o.hText);
   o.hBodyPanel = null;
   o.hText = null;
}
