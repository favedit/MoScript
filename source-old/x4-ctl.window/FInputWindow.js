/**************************************************************
 * 消息弹出框
 * 
 * @class
 * @author maochunyang
 * @version 1.0.1
 **************************************************************/
function FInputWindow(o){
   //alert(FMessageWindow);
   o = RClass.inherits(this, o, FWindow);
   // Attribute
   o.type            = null;
   o.isDialog        = false;
   o.titleBlur       = false;
   o.source          = null;
   o.lsns            = new TListeners();
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
   // Process
   o.oeBuild         = FInputWindow_oeBuild;
   o.buildEdit       = FInputWindow_buildEdit;
   // Event
   o.onOk            = FInputWindow_onOk;
   o.onCancel        = FInputWindow_onCancel;
   o.onClose         = FInputWindow_onClose;
   // Method
   o.show            = FInputWindow_show;
   o.hide            = FInputWindow_hide;
   o.dispose         = FInputWindow_dispose;
   return o;
}
// ------------------------------------------------------------
function FInputWindow_oeBuild(e){
   var o = this;
   var r = o.base.FWindow.oeBuild.call(o, e);
   if(e.isAfter()){
     o.hPanel.style.width = '300px';
     o.setCaption('');
      o.buildEdit();
      RConsole.find(FKeyConsole).register(EKey.Esc, new TListener(o, o.onClose));
   }
   return r;
}
// ------------------------------------------------------------
function FInputWindow_onOk(){
   var o = this;
   o.hide();
   o.lsns.process(o.hEdit.value);
}
// ------------------------------------------------------------
function FInputWindow_onCancel(){
   var o = this;
   this.hide();
}
// ------------------------------------------------------------
function FInputWindow_onClose(){
   this.hide();
}
// ------------------------------------------------------------
function FInputWindow_show(){
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
function FInputWindow_buildEdit(){
   var o = this;
   var h = o.hBodyPanel;
   h.style.backgroundColor='#CCCCCC';
   o.hBodyPanel.style.height = 100;
   var hTab = RBuilder.appendTable(o.hBodyPanel, 0, 0, 0);
   hTab.style.height = '100%';
   hTab.style.width = '100%';
   var hRow1 = hTab.insertRow();
   var hc11 = hRow1.insertCell();
   hc11.align = 'left';
   hc11.innerText = '  请输入文件夹名称：';
   var hRow2 = hTab.insertRow();
   var hc21 = hRow2.insertCell();
   var he = o.hEdit = RBuilder.append(hc21, 'INPUT');
   hc21.align = 'center';
   he.height = 25;
   he.width = 250;
   he.size = 40;
   he.style.fontSize = '14pt';
   he.style.fontStyle = 'italic';
   var hRow3 = hTab.insertRow();
   var hc31 = hRow3.insertCell();
   hc31.align = 'center';
   var hBtb = RBuilder.appendTable(hc31);
   hBtb.style.width = '200px';
   var hBr = hBtb.insertRow();
   // Ok
   var hBc1 = hBr.insertCell();
   var b = o.btnOk = RClass.create(FButton);
   b.icon = 'tool.ok';
   b.label = RContext.get('FToolButton:ok');
   b.lsnsClick.register(o, o.onOk);
   b.psBuild(hBc1);
   hBc1.width = 100;
   var hBc3 = hBr.insertCell();
   hBc3.width = 40;
   hBc3.innerText='         ';
   // Cancel
   var hBc2 = hBr.insertCell();
   hBc2.width = 100;
   var b = o.btnCancel = RClass.create(FButton);
   b.icon = 'tool.cancel';
   b.label = RContext.get('FToolButton:cancel');
   b.lsnsClick.register(o, o.onCancel);
   b.psBuild(hBc2);
   o.setIcon('Icon');
}
// ------------------------------------------------------------
function FInputWindow_hide(){
   var o = this;
   o.base.FWindow.hide.call(o);
   RWindow.setEnable(true);
}
// ------------------------------------------------------------
function FInputWindow_dispose(){
   var o = this;
   o.base.FWindow.dispose.call(o);
   RMemory.freeHtml(o.hBodyPanel);
   RMemory.freeHtml(o.hEdit);
   o.hBodyPanel     = null;
   o.hEdit          = null;
}