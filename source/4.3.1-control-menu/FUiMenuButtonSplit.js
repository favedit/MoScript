//==========================================================
// <T>菜单分割按键。</T>
//
// @face
// @author maocy
// @history 150121
//==========================================================
function FUiMenuButtonSplit(o){
   o = RClass.inherits(this, o, FUiControl, MMenuButton);
   /// @style
   o.styleUp      = RClass.register(o, new AStyle('Up'));
   /// @style
   o.styleDown    = RClass.register(o, new AStyle('Down'));
   // Attribute
   o.disabled     = false;
   // Method
   o.oeBuild      = FUiMenuButtonSplit_oeBuild;
   o.onBuildPanel = FUiMenuButtonSplit_onBuildPanel;
   o.dispose      = FUiMenuButtonSplit_dispose;
   return o;
}
// ------------------------------------------------------------
function FUiMenuButtonSplit_oeBuild(e){
   var o = this;
   o.base.FUiControl.oeBuild.call(o, e);
   var h = o.hPanel;
   var hc = h.insertRow().insertCell();
   hc.className = o.style('Up');
   var hc = h.insertRow().insertCell();
   hc.className = o.style('Down');
   return EEventStatus.Stop;
}
// ------------------------------------------------------------
function FUiMenuButtonSplit_onBuildPanel(){
   this.hPanel = RBuilder.newTable();
}
// ------------------------------------------------------------
function FUiMenuButtonSplit_dispose(){
   var o = this;
   o.base.FUiControl.dispose.call(o);
   RMemory.freeHtml(o.hPanel);
   o.hPanel = null;
}
