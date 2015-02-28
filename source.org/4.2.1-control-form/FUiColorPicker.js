// ============================================================
// FColorPicker
// ============================================================
function FColorPicker(o){
   o = RClass.inherits(this, o, FEditControl, MEditBorder, MDescColor, MDropable);
   // Html
   o.borderStyle = EBorder.RoundDrop;
   // Event
   o.onBuildEdit = FColorPicker_onBuildEdit;
   o.onEditEnd   = FColorPicker_onEditEnd;
   o.onDataKeyDown   = FColorPicker_onDataKeyDown;
   o.checkColor = FColorPicker_checkColor;
   // Method
   o.setText     = FColorPicker_setText;
   o.drop        = FColorPicker_drop;
   o.dispose     = FColorPicker_dispose;
   return o;
}
// ------------------------------------------------------------
function FColorPicker_onBuildEdit(b){
   var o = this;
   // 建立编辑控件
   var h = o.hEdit = RBuilder.appendEdit(b.hPanel, o.style('Edit'));
   h.maxLength = 20;
}
// ------------------------------------------------------------
function FColorPicker_onEditEnd(editor){
   var o = this;
   RLog.debug(o, 'Begin (editor={0}:{1} value={2})', editor, editor?editor.color:'', o.dataValue);
   if(editor){
      o.set(editor.color);
      o.hDrop.style.backgroundColor = editor.color;
   }
   //alert(FColorPicker_onEditEnd);
   o.onDataEditEnd(o);
   //o.base.FEditControl.onEditEnd.call(o);
   RLog.debug(o, 'End (editor={0} value={1})', editor, o.dataValue);
}
// ------------------------------------------------------------
// text
function FColorPicker_setText(t){
   var o = this;
   o.base.FEditControl.setText.call(o, RString.toUpper(t));
   o.hDrop.style.backgroundColor = t;
}
//------------------------------------------------------------
function FColorPicker_checkColor(c)
{
   var oSpan = document.createElement("<span style='color:"+c+";'></span>");
   if(oSpan.style.color != ""){
      return true;
   }else{
      return false;
   }
   oSpan = null;
}

//------------------------------------------------------------
function FColorPicker_onDataKeyDown(e){
      var o = this;
      o.base.FEditControl.onDataKeyDown.call(o, o, e);
      if(o.checkColor(o.text())){
         o.hDrop.style.backgroundColor = o.text();
      }else{
         o.hDrop.style.backgroundColor = '';
      }
}
// ------------------------------------------------------------
function FColorPicker_drop(){
   var o = this;
   if(o.canDrop() && o.canEdit){
      var ed = o.editor = RConsole.find(FEditConsole).focus(o, FColorPickerEditor, o.name);
      if(ed.linkControl(o)){
         //ed.setItems(o.items);
         ed.set(o.reget());
      }
      ed.show();
   }
//   var o = this;
//   if(o.canDrop() && o.canEdit){
//      var editor = RConsole.find(FEditConsole).focus(o, FColorPickerEditor, o.name);
//      editor.linkPanel(o.hEditCell, o.editBorder, o.hEdit);
//      editor.setValue(o.formatValue(o.text()));
//      editor.show();
//   }
}
//------------------------------------------------------------
function FColorPicker_dispose(){
   var o = this;
   o.base.FEditControl.dispose.call(o);
   RMemory.freeHtml(o.hEdit);
   RMemory.freeHtml(o.hDrop);
   o.hEdit = null;
   o.hDrop = null;
}