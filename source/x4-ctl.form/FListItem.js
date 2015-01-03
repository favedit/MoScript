/**************************************************************
 * 列表项控件
 *  hPanel<DIV>
 * ┌------------------------------------┐
 * │ hForm<TABLE>                       │
 * │┌--------------------------------┐│
 * ││┌----------┐┌--------------┐││
 * │││hIcon<IMG>││hLabel<SPAN>  │││
 * ││└----------┘└--------------┘││
 * │└--------------------------------┘│
 * └------------------------------------┘
 *
 * @class FControl, MDesign, MHorizontal
 * @author maochunyang
 * @version 1.0.1
 **************************************************************/
function FListItem(o){
   o = RClass.inherits(this, o, FControl, MDesign, MHorizontal);
   /// @style
   o.styleForm    = RClass.register(o, new TStyle('Form'));
   o.styleIcon    = RClass.register(o, new TStyle('Icon'));
   o.styleLabel   = RClass.register(o, new TStyle('Label'));
   // Process
   o.oeBuild      = FListItem_oeBuild;
   // Event
   o.onBuildPanel = FListItem_onBuildPanel;
   // Method
   o.formatValue  = FListItem_formatValue;
   o.text         = FListItem_text;
   o.setText      = FListItem_setText;
   o.dispose      = FListItem_dispose;
   return o;
}
// ------------------------------------------------------------
function FListItem_oeBuild(e){
   var o = this;
   o.base.FControl.oeBuild.call(o, e);
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
function FListItem_onBuildPanel(){
   this.hPanel = RBuilder.create(null, 'DIV');
}
// ------------------------------------------------------------
function FListItem_formatValue(s){
   return RString.nvl(s);
}
// ------------------------------------------------------------
function FListItem_text(){
   return this.hEdit.value;
}
// ------------------------------------------------------------
function FListItem_setText(text){
   this.hEdit.value = text;
}
// ------------------------------------------------------------
function FListItem_dispose(){
   var o = this;
   o.base.FControl.dispose.call(o);
   o.hForm = null;
   o.hIcon = null;
   o.hLabel = null;
   o.hPanel = null;
   o.hEdit = null;
}
