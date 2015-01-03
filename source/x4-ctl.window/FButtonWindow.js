// ============================================================
// FListWindow
// ============================================================
function FButtonWindow(o){
   o = RClass.inherits(this, o, FWindow);
   /// @style
//   o.styleTablePanel      = RClass.register(o, new TStyle('TablePanel'));
//   o.styleButtonPanel     = RClass.register(o, new TStyle('ButtonPanel'));
   // 
   o.buttons              = new TList();
   // Method
   o.oeBuild              = FButtonWindow_oeBuild;
   o.linkUrl              = FButtonWindow_linkUrl;
   o.show                 = FButtonWindow_show;
   o.hide                 = FButtonWindow_hide;
   o.onClose              = FButtonWindow_onClose;
   o.dispose              = FButtonWindow_dispose;
   return o;
}
// ------------------------------------------------------------
function FButtonWindow_oeBuild(e){
   var o = this;
   var r = o.base.FWindow.oeBuild.call(o, e);
   if(e.isAfter()){
      o.setIcon('Icon');
      o.setCaption(' Window');
      var hTab = RBuilder.appendTable(o.hBodyPanel);
      o.hPanel.style.width = '800px';
      o.hBodyPanel.style.height = '560px';
      hTab.style.width = '100%';
      hTab.style.height = '100%';
      var hc = hTab.insertRow().insertCell();
      hc.style.width = '100%';
      hc.style.height = '100%';
      o.hBox = RBuilder.appendDiv(hc);
      RConsole.find(FKeyConsole).register(EKey.Esc, new TListener(o, o.onClose));
   }
   return r;
}
//------------------------------------------------------------
function FButtonWindow_linkUrl(url){
   var o = this;
   var h = o.hBox;
   h.innerHTML = "<IFRAME ID=IFrame1 width=100% height=100% FRAMEBORDER=0 SCROLLING=auto SRC=" +url+"></IFRAME>";
}
//------------------------------------------------------------
function FButtonWindow_show(){
   var o = this;
   o.base.FWindow.show.call(o);
   RWindow.setEnable(false, true);
   RWindow.moveCenter(o.hPanel);
   o.psVisible(true);
   o.focus();
}
//------------------------------------------------------------
function FButtonWindow_hide(){
   var o = this;
   o.base.FWindow.hide.call(o);
   RWindow.setEnable(true);
}
//------------------------------------------------------------
function FButtonWindow_onClose(){
   var o = this;
   o.hide();
}
//------------------------------------------------------------
function FButtonWindow_dispose(){
   var o = this;
   o.base.FWindow.dispose.call(o);
   RMemory.freeHtml(o.hPanel);
   RMemory.freeHtml(o.hBodyPanel);
   RMemory.freeHtml(o.hBox);
   o.hPanel = null;
   o.hBodyPanel = null;
   o.hBox = null;
}