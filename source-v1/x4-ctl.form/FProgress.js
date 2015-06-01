// ============================================================
// FProgress
// ============================================================
function FProgress(o){
   o = RClass.inherits(this, o, FDataEditControl, MDropable);
   // Html
   o.hForm       = null;
   o.hDrop       = null;
   o.hForm       = null;
   // Event
   o.onBuildEdit = FProgress_onBuildEdit;
   o.onEditEnd   = FProgress_onEditEnd;
   // Method
   o.text        = FProgress_text;
   o.setText     = FProgress_setText;
   o.drop        = FProgress_drop;
   return o;
}
// ------------------------------------------------------------
function FProgress_onBuildEdit(){
   var o = this;
   o.hEdit = RBuilder.newEdit();
   o.hDrop = RBuilder.newIcon(null, 'ctl.clrdrop');
}
// ------------------------------------------------------------
function FProgress_onEditEnd(editor){
   var o = this;
   RLog.debug(o, 'Begin (editor={0}:{1} value={2})', editor, editor?editor.color:'', o.dataValue);
   if(editor){
      o.setValue(editor.color);
   }
   o.base.FDataEditControl.onEditEnd.call(o);
   RLog.debug(o, 'End (editor={0} value={1})', editor, o.dataValue);
}
// ------------------------------------------------------------
function FProgress_text(){
   return this.hEdit.value;
}
// ------------------------------------------------------------
function FProgress_setText(text){
   var o = this;
   o.hEdit.value = text.toUpperCase();
   o.hDropPanel.style.backgroundColor = text;
}
// ------------------------------------------------------------
function FProgress_drop(){
   var o = this;
   if(o.canDrop() && o.canEdit){
      var editor = RConsole.find(FEditConsole).focus(o, FProgressEditor);
      editor.linkPanel(o.hControlPanel, o.hEdit, o.hEditForm);
      editor.setColor(o.value());
      editor.show();
   }
}
// ------------------------------------------------------------