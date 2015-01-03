// ============================================================
// FMenuButtonSplit
// ============================================================
function FMenuButtonSplit(o){
   o = RClass.inherits(this, o, FControl, MMenuButton);
   /// @style
   o.styleUp      = RClass.register(o, new TStyle('Up'));
   /// @style
   o.styleDown    = RClass.register(o, new TStyle('Down'));
   // Attribute
   o.disabled     = false;
   // Method
   o.oeBuild      = FMenuButtonSplit_oeBuild;
   o.onBuildPanel = FMenuButtonSplit_onBuildPanel;
   o.dispose      = FMenuButtonSplit_dispose;
   return o;
}
// ------------------------------------------------------------
function FMenuButtonSplit_oeBuild(e){
   var o = this;
   o.base.FControl.oeBuild.call(o, e);
   var h = o.hPanel;
   var hc = h.insertRow().insertCell();
   hc.className = o.style('Up');
   var hc = h.insertRow().insertCell();
   hc.className = o.style('Down');
   return EEventStatus.Stop;
}
// ------------------------------------------------------------
function FMenuButtonSplit_onBuildPanel(){
   this.hPanel = RBuilder.newTable();
}
// ------------------------------------------------------------
function FMenuButtonSplit_dispose(){
   var o = this;
   o.base.FControl.dispose.call(o);
   RMemory.freeHtml(o.hPanel);
   o.hPanel = null;
}
