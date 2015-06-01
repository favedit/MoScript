/**************************************************************
 * 消息弹出框
 * 
 * @class
 * @author maochunyang
 * @version 1.0.1
 **************************************************************/
function FConfirmWindow(o){
   //alert(FMessageWindow);
   o = RClass.inherits(this, o, FWindow);
   // Attribute
   o.type            = null;
   o.isDialog        = false;
   o.titleBlur       = false;
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
   // Html
   o.hMessagePanel   = null;
   o.hMessages       = null;
   o.hDescription    = null;
   o.hButtonPanel    = null;   
   o.lsns            = new TListeners();
   // Process
   o.oeBuild         = FConfirmWindow_oeBuild;
   o.buildEdit       = FConfirmWindow_buildEdit;
   // Event
   o.onOk            = FConfirmWindow_onOk;
   o.onCancel        = FConfirmWindow_onCancel;
   o.onClose         = FConfirmWindow_onClose;
   o.setText         = FConfirmWindow_setText;
   // Method
   o.show            = FConfirmWindow_show;
   o.hide            = FConfirmWindow_hide;
   o.dispose         = FConfirmWindow_dispose;
   return o;
}
// ------------------------------------------------------------
function FConfirmWindow_oeBuild(e){
   var o = this;
   var r = o.base.FWindow.oeBuild.call(o, e);
   if(e.isAfter()){
     o.hPanel.style.width = '380px';
      o.buildEdit();
      RConsole.find(FKeyConsole).register(EKey.Esc, new TListener(o, o.onClose));
   }
   return r;
}
// ------------------------------------------------------------
function FConfirmWindow_onOk(){
   this.hide();
   this.lsns.process(true);
   return true;
}
// ------------------------------------------------------------
function FConfirmWindow_onCancel(){
   this.hide();
   return true;
}
// ------------------------------------------------------------
function FConfirmWindow_onClose(){
   this.hide();
   return false
}
// ------------------------------------------------------------
function FConfirmWindow_setText(t){
   this.hText.innerText = ' ' + t;
}
// ------------------------------------------------------------
function FConfirmWindow_show(){
   var o = this;
   o.base.FWindow.show.call(o);
   RWindow.setEnable(false, true);
   o.panel().style.zIndex = RLayer.next(ELayer.Message);
   top.RWindow.moveCenter(o.panel());
   o.psMode(EMode.Update);
   RConsole.find(FFocusConsole).blur();
   o.focus();
}
// ------------------------------------------------------------
function FConfirmWindow_buildEdit(){
   var o = this;
   var h = o.hBodyPanel;
   o.hBodyPanel.style.height = 100;
   var hTab = RBuilder.appendTable(o.hBodyPanel, 0, 0, 0);
   hTab.style.height = '100%';
   hTab.style.width = '100%';
   var hRow1 = hTab.insertRow();
   var hRow1 = hTab.insertRow();
   var hcp = hRow1.insertCell();
   var htp = RBuilder.appendTable(hcp, 0, 0, 0);
   var hcr = htp.insertRow();
   var hcb = hcr.insertCell();
   hcb.width=10;
   var hcm = hcr.insertCell();
   hg = o.hImg = RBuilder.appendImage(hcm, 'FConfirmWindow_Confirm');
   hg.style.width = 32;
   hg.style.height = 33;
   var hc11 = o.hText = hcr.insertCell();
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
   var hBc3 = hBr.insertCell();
   hBc3.width = 10;
   // Cancel
   var hBc2 = hBr.insertCell();
   var b = o.btnCancel = RClass.create(FButton);
   b.icon = 'tool.cancel';
   b.label = RContext.get('FToolButton:cancel');
   b.lsnsClick.register(o, o.onCancel);
   b.psBuild(hBc2);
   o.setCaption('操作确认');
   o.setIcon('Confirm');
}
// ------------------------------------------------------------
function FConfirmWindow_hide(){
   var o = this;
   o.base.FWindow.hide.call(o);
   RWindow.setEnable(true);
}
// ------------------------------------------------------------
function FConfirmWindow_dispose(){
   var o = this;
   o.base.FWindow.dispose.call(o);
   RMemory.freeHtml(o.hBodyPanel);
   RMemory.freeHtml(o.hText);
   o.hBodyPanel = null;
   o.hText = null;
}
