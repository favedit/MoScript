// ============================================================
// FListWindow
// ============================================================
function FButtonFormWindow(o){
   o = RClass.inherits(this, o, FWindow);
   /// @style
//   o.styleTablePanel      = RClass.register(o, new TStyle('TablePanel'));
//   o.styleButtonPanel     = RClass.register(o, new TStyle('ButtonPanel'));
   // 
   o.buttons              = new TList();
   // Method
   o.oeBuild              = FButtonFormWindow_oeBuild;
   o.linkForm             = FButtonFormWindow_linkForm;
   o.show                 = FButtonFormWindow_show;
   o.hide                 = FButtonFormWindow_hide;
   o.onClose              = FButtonFormWindow_onClose;
   o.dispose              = FButtonFormWindow_dispose;
   return o;
}
// ------------------------------------------------------------
function FButtonFormWindow_oeBuild(e){
   var o = this;
   var r = o.base.FWindow.oeBuild.call(o, e);
   if(e.isAfter()){
      o.setIcon('Icon');
      o.setCaption(' Window');
      var hTab = RBuilder.appendTable(o.hBodyPanel);
      o.hPanel.style.width = '800px';
      o.hBodyPanel.style.height = '500px';
      hTab.style.width = '100%';
      hTab.style.height = '100%';
      var hc = o.hBox = hTab.insertRow().insertCell();
      hc.style.width = '100%';
      hc.style.height = '100%';
      hc.vAlign = 'top';
//      o.hBox = RBuilder.appendDiv(hc);
//      o.hBox.vAlign = 'top';
//      o.hBox.style.border = '1px solid red';
//      o.hBox.style.height = '100%';
      RConsole.find(FKeyConsole).register(EKey.Esc, new TListener(o, o.onClose));
   }
   return r;
}
//------------------------------------------------------------
function FButtonFormWindow_linkForm(btn){
   var o = this;
   var h = o.hBox;
   h.innerHTML = '';
   o.sourceBtn = btn;
   btn.window = o;
   var fName = btn.editForm;
   var f = o.form = RConsole.find(FFormConsole).createFromName(fName, h, null, EForm.Form);
   //o.setCaption(RContext.get('FListWindow:caption') + ' - ' + f.label);
//   f.isLov = false;
//   f.lsnsRowDblClick.push(new TListener(o, o.onSelect));
   f.psMode(EMode.Update);
   f.setVisible(true);
   f.psRefresh();
   f.focus();
   f.dsFetch(true, true);
   f.panel().style.height = '400';
   f.window = this;
   //h.innerHTML = "<IFRAME ID=IFrame1 width=100% height=100% FRAMEBORDER=0 SCROLLING=auto SRC=" +url+"></IFRAME>";
}
//------------------------------------------------------------
function FButtonFormWindow_show(){
   var o = this;
   o.base.FWindow.show.call(o);
   RWindow.setEnable(false, true);
   RWindow.moveCenter(o.hPanel);
   o.psVisible(true);
   o.focus();
}
//------------------------------------------------------------
function FButtonFormWindow_hide(){
   var o = this;
   o.base.FWindow.hide.call(o);
   RWindow.setEnable(true);
}
//------------------------------------------------------------
function FButtonFormWindow_onClose(){
   var o = this;
   o.hide();
}
//------------------------------------------------------------
function FButtonFormWindow_dispose(){
   var o = this;
   o.base.FWindow.dispose.call(o);
   RMemory.freeHtml(o.hPanel);
   RMemory.freeHtml(o.hBodyPanel);
   o.hPanel = null;
   o.hBodyPanel = null;
}
