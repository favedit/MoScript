//==========================================================
// <T>列表项控件。</T>
//
//  hForm<TABLE>                       
// ┌-------------------------------------┐
// │┌----------┐┌-------------------┐│
// ││hIcon<IMG>││hLabel<SPAN>       ││
// │└----------┘└-------------------┘│
// └-------------------------------------┘
//
// @class
// @author maocy
// @history 150210
//==========================================================
function FUiListItem(o){
   o = RClass.inherits(this, o, FUiControl);
   /// @style
   o._styleForm    = RClass.register(o, new AStyle('_styleForm'));
   o._styleIcon    = RClass.register(o, new AStyle('_styleIcon'));
   o._styleLabel   = RClass.register(o, new AStyle('_styleLabel'));
   // Process
   o.onBuild       = FUiListItem_onBuild;
   // Event
   o.onBuildPanel = FUiListItem_onBuildPanel;
   // Method
   o.formatValue  = FUiListItem_formatValue;
   o.text         = FUiListItem_text;
   o.setText      = FUiListItem_setText;
   o.dispose      = FUiListItem_dispose;
   return o;
}
// ------------------------------------------------------------
function FUiListItem_onBuild(e){
   var o = this;
   o.base.FControl.onBuild.call(o, e);
   if(e.isBefore()){
      var hf = o.hForm = RBuilder.appendTable(o.hPanel, o.style('Form'));
      var hRow = hf.insertRow();
      // Icon
      var hc = hRow.insertCell();
      hc.className = o.style('Icon');
      hc.width = 20;
      o.hIcon = RBuilder.appendIcon(hc, 'arrow');
      // Label
      var hc = hRow.insertCell();
      var h = o.hLabel = RBuilder.append(hc, 'SPAN', o.style('Label'));
      h.innerText = o.label;
   }
}
// ------------------------------------------------------------
function FUiListItem_onBuildPanel(){
   this.hPanel = RBuilder.create(null, 'DIV');
}
// ------------------------------------------------------------
function FUiListItem_formatValue(s){
   return RString.nvl(s);
}
// ------------------------------------------------------------
function FUiListItem_text(){
   return this.hEdit.value;
}
// ------------------------------------------------------------
function FUiListItem_setText(text){
   this.hEdit.value = text;
}
// ------------------------------------------------------------
function FUiListItem_dispose(){
   var o = this;
   o.base.FControl.dispose.call(o);
   o.hForm = null;
   o.hIcon = null;
   o.hLabel = null;
   o.hPanel = null;
   o.hEdit = null;
}
