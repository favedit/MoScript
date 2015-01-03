// ============================================================
// FPicker
// ============================================================
function FPicker(o){
   o = RClass.inherits(this, o, FDataEditControl, MDropable);
   // Html
   o.hForm         = null;
   o.hDrop         = null;
   o.hForm         = null;
   // Event
   o.onBuildEdit   = FPicker_onBuildEdit;
   o.onEditEnd     = FPicker_onEditEnd;
   // Method
   o.text          = FPicker_text;
   o.setText       = FPicker_setText;
   o.drop          = FPicker_drop;
   o.dispose       = FPicker_dispose;
   return o;
}
// ------------------------------------------------------------
function FPicker_onBuildEdit(){
   var o = this;
   o.hEdit = RBuilder.newEdit();
   o.hDrop = RBuilder.newIcon(null, 'ctl.ds-ds');
}
// ------------------------------------------------------------
function FPicker_onEditEnd(editor){
   var o = this;
   if(editor){
      var dsCtl = o.topControl(MDataset);
      if(dsCtl){
         dsCtl.dsMovePosition(editor.position());
      }
   }
   o.base.FDataEditControl.onEditEnd.call(o);
   RLog.debug(o, 'Edit end (editor={1} value={2})', editor, o.dataValue);
}
// ------------------------------------------------------------
function FPicker_text(){
   return this.hEdit.value;
}
// ------------------------------------------------------------
function FPicker_setText(text){
   this.hEdit.value = text;
}
// ------------------------------------------------------------
function FPicker_drop(){
   var o = this;
   if(o.canDrop() && o.canEdit){
      var dsCtl = o.topControl(MDataset);
      if(dsCtl){
         var editor = RConsole.find(FEditConsole).focus(o, FPickerEditor, o.name);
         editor.linkPanel(o.hControlPanel, o.hEdit, o.hEditForm);
         editor.setDsControl(dsCtl);
         editor.setValue(o.hEdit.value);
         editor.show();
      }
   }
}
// ------------------------------------------------------------
function FPicker_dispose(){
   var o = this;
   o.base.FDataEditControl.dispose.call(o);
   RMemory.freeHtml(o.hEdit);
   o.hEdit = null;
}
// ------------------------------------------------------------
