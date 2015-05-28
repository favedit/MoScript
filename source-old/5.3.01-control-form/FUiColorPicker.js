// ============================================================
// FUiColorPicker
// ============================================================
function FUiColorPicker(o){
   o = RClass.inherits(this, o, FEditControl, MEditBorder, MDescColor, MDropable);
   // Html
   o.borderStyle = EUiBorder.RoundDrop;
   // Event
   o.onBuildEdit = FUiColorPicker_onBuildEdit;
   o.onEditEnd   = FUiColorPicker_onEditEnd;
   o.onDataKeyDown   = FUiColorPicker_onDataKeyDown;
   o.checkColor = FUiColorPicker_checkColor;
   // Method
   o.setText     = FUiColorPicker_setText;
   o.drop        = FUiColorPicker_drop;
   o.dispose     = FUiColorPicker_dispose;
   return o;
}
// ------------------------------------------------------------
function FUiColorPicker_onBuildEdit(b){
   var o = this;
   // 建立编辑控件
   var h = o.hEdit = RBuilder.appendEdit(b.hPanel, o.style('Edit'));
   h.maxLength = 20;
}
// ------------------------------------------------------------
function FUiColorPicker_onEditEnd(editor){
   var o = this;
   RLog.debug(o, 'Begin (editor={0}:{1} value={2})', editor, editor?editor.color:'', o.dataValue);
   if(editor){
      o.set(editor.color);
      o.hDrop.style.backgroundColor = editor.color;
   }
   //alert(FUiColorPicker_onEditEnd);
   o.onDataEditEnd(o);
   //o.base.FEditControl.onEditEnd.call(o);
   RLog.debug(o, 'End (editor={0} value={1})', editor, o.dataValue);
}
// ------------------------------------------------------------
// text
function FUiColorPicker_setText(t){
   var o = this;
   o.base.FEditControl.setText.call(o, RString.toUpper(t));
   o.hDrop.style.backgroundColor = t;
}
//------------------------------------------------------------
function FUiColorPicker_checkColor(c)
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
function FUiColorPicker_onDataKeyDown(e){
      var o = this;
      o.base.FEditControl.onDataKeyDown.call(o, o, e);
      if(o.checkColor(o.text())){
         o.hDrop.style.backgroundColor = o.text();
      }else{
         o.hDrop.style.backgroundColor = '';
      }
}
// ------------------------------------------------------------
function FUiColorPicker_drop(){
   var o = this;
   if(o.canDrop() && o.canEdit){
      var ed = o.editor = RConsole.find(FEditConsole).focus(o, FUiColorPickerEditor, o.name);
      if(ed.linkControl(o)){
         //ed.setItems(o.items);
         ed.set(o.reget());
      }
      ed.show();
   }
//   var o = this;
//   if(o.canDrop() && o.canEdit){
//      var editor = RConsole.find(FEditConsole).focus(o, FUiColorPickerEditor, o.name);
//      editor.linkPanel(o.hEditCell, o.editBorder, o.hEdit);
//      editor.setValue(o.formatValue(o.text()));
//      editor.show();
//   }
}
//------------------------------------------------------------
function FUiColorPicker_dispose(){
   var o = this;
   o.base.FEditControl.dispose.call(o);
   RMemory.freeHtml(o.hEdit);
   RMemory.freeHtml(o.hDrop);
   o.hEdit = null;
   o.hDrop = null;
}