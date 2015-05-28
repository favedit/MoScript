// ============================================================
// FWebForm
// ============================================================
function FWebForm(o){
   o = RClass.inherits(this, o, FForm, MTop);
   o.onBuildPanel = FWebForm_onBuildPanel;
   return o;
}
// ------------------------------------------------------------
function FWebForm_onBuildPanel(){
   var o = this;
   var hp = o.hPanel = RBuilder.newDiv();
   hp.width = '100%';
   hp.height = '100%';
   hp.style.padding = 8;
   var hf = o.hPanelForm = RBuilder.appendTable(hp);
   hf.width = '100%';
   hf.height = '100%';
   if(EMode.Design == o._emode){
      o.hContainer = hf.insertRow().insertCell();
   }
}
