// ============================================================
// FDuiColorPicker
// ============================================================
MO.FDuiColorPicker = function FDuiColorPicker(o){
   o = MO.Class.inherits(this, o, MO.FEditControl, MO.MEditBorder, MO.MDescColor, MO.MDropable);
   // Html
   o.borderStyle   = MO.EUiBorder.RoundDrop;
   // Event
   o.onBuildEdit   = MO.FDuiColorPicker_onBuildEdit;
   o.onEditEnd     = MO.FDuiColorPicker_onEditEnd;
   o.onDataKeyDown = MO.FDuiColorPicker_onDataKeyDown;
   o.checkColor    = MO.FDuiColorPicker_checkColor;
   // Method
   o.setText       = MO.FDuiColorPicker_setText;
   o.drop          = MO.FDuiColorPicker_drop;
   o.dispose       = MO.FDuiColorPicker_dispose;
   return o;
}
// ------------------------------------------------------------
MO.FDuiColorPicker_onBuildEdit = function FDuiColorPicker_onBuildEdit(b){
   var o = this;
   // 建立编辑控件
   var h = o.hEdit = MO.Window.Builder.appendEdit(b.hPanel, o.style('Edit'));
   h.maxLength = 20;
}
// ------------------------------------------------------------
MO.FDuiColorPicker_onEditEnd = function FDuiColorPicker_onEditEnd(editor){
   var o = this;
   RLog.debug(o, 'Begin (editor={0}:{1} value={2})', editor, editor?editor.color:'', o.dataValue);
   if(editor){
      o.set(editor.color);
      o.hDrop.style.backgroundColor = editor.color;
   }
   //alert(FDuiColorPicker_onEditEnd);
   o.onDataEditEnd(o);
   //o.base.FEditControl.onEditEnd.call(o);
   RLog.debug(o, 'End (editor={0} value={1})', editor, o.dataValue);
}
// ------------------------------------------------------------
// text
MO.FDuiColorPicker_setText = function FDuiColorPicker_setText(t){
   var o = this;
   o.base.FEditControl.setText.call(o, MO.Lang.String.toUpper(t));
   o.hDrop.style.backgroundColor = t;
}
//------------------------------------------------------------
MO.FDuiColorPicker_checkColor = function FDuiColorPicker_checkColor(c)
{
   var oSpan = document.createElement("<span style='color:"+c+";'></span>");
   if(oSpan.style.color != ""){
      return true;
   }else{
      return false;
   }
   //oSpan = null;
}

//------------------------------------------------------------
MO.FDuiColorPicker_onDataKeyDown = function FDuiColorPicker_onDataKeyDown(e){
      var o = this;
      o.base.FEditControl.onDataKeyDown.call(o, o, e);
      if(o.checkColor(o.text())){
         o.hDrop.style.backgroundColor = o.text();
      }else{
         o.hDrop.style.backgroundColor = '';
      }
}
// ------------------------------------------------------------
MO.FDuiColorPicker_drop = function FDuiColorPicker_drop(){
   var o = this;
   if(o.canDrop() && o.canEdit){
      var ed = o.editor = RConsole.find(FEditConsole).focus(o, FDuiColorPickerEditor, o.name);
      if(ed.linkControl(o)){
         //ed.setItems(o.items);
         ed.set(o.reget());
      }
      ed.show();
   }
//   var o = this;
//   if(o.canDrop() && o.canEdit){
//      var editor = RConsole.find(FEditConsole).focus(o, FDuiColorPickerEditor, o.name);
//      editor.linkPanel(o.hEditCell, o.editBorder, o.hEdit);
//      editor.setValue(o.formatValue(o.text()));
//      editor.show();
//   }
}
//------------------------------------------------------------
MO.FDuiColorPicker_dispose = function FDuiColorPicker_dispose(){
   var o = this;
   o.base.FEditControl.dispose.call(o);
   RMemory.freeHtml(o.hEdit);
   RMemory.freeHtml(o.hDrop);
   o.hEdit = null;
   o.hDrop = null;
}
