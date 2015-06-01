// ============================================================
// FMemoDropEditor
// ============================================================
function FMemoDropEditor(o){
   o = RClass.inherits(this, o, FDropEditor);
   // Constant
   o.MinWidth     = 240;
   // Event
   o.onBuildEdit  = FMemoDropEditor_onBuildEdit;
   o.onKeyDown    = FMemoDropEditor_onKeyDown;
   // Process
   o.oeShow       = FMemoDropEditor_oeShow;
   // Method
   o.focus        = FMemoDropEditor_focus;
   o.value        = FMemoDropEditor_value;
   o.setValue     = FMemoDropEditor_setValue;
   return o;
}
// ------------------------------------------------------------
function FMemoDropEditor_onBuildEdit(){
   var o = this;
   // Panel table (1colx2row)
   var hFormTab = o.hForm = RBuilder.appendTable(o.hPanel);
   // Edit table (2colx1row)
   var hTltCel = hFormTab.insertRow().insertCell();
   var hTab = RBuilder.appendTable(hTltCel);
   var hRow = hTab.insertRow();
   // Edit
   var hCel = hRow.insertCell();
   o.hEditCel = hCel;
   o.hEdit = RBuilder.append(hCel, 'INPUT', o.style('Edit'));
   // Drop
   var hCel = hRow.insertCell()
   o.hDrop = RBuilder.appendIcon(hCel, 'ctl.memo', o.style('Drop'));
   // Drop table (1colx1row)
   var hDrpCel = hFormTab.insertRow().insertCell();
   o.hDropPanel = RBuilder.append(hDrpCel, 'DIV', o.style('DropPanel'));
   // Edit
   o.hEditor = RBuilder.append(o.hDropPanel, 'TEXTAREA', o.style('Memo'));
   o.linkEvent(o.hEditor);
}
// ------------------------------------------------------------
function FMemoDropEditor_onKeyDown(){
   var o = this;
   var kc = event.keyCode;
   if(EKey.Esc == kc){
      this.hEditor.value = o.dataValue;;
      o.editStatus = EEditStatus.Cancel;
      o.onBlur();
   }else if(event.ctrlKey && EKey.Enter == kc){
      o.editStatus = EEditStatus.Ok;
      o.onBlur();
   }
}
// ------------------------------------------------------------
function FMemoDropEditor_oeShow(event){
   var o = this;
   o.base.FDropEditor.oeShow.call(o, event);
   if(event.isAfter()){
      RHtml.toRect(o.rect, o.hDropPanel);
      RWindow.showShadow(true, o.rect);
   }
}
// ------------------------------------------------------------
function FMemoDropEditor_focus(){
   this.hEditor.focus();
}
// ------------------------------------------------------------
function FMemoDropEditor_value(){
   return this.hEditor.value;
}
// ------------------------------------------------------------
function FMemoDropEditor_setValue(value){
   var o = this;
   value = RString.nvl(value);
   o.changed = false;
   o.dataValue = value;
   o.dataValue = value;
   o.hEdit.value = RString.firstLine(value);
   o.hEditor.value = value;
}
// ------------------------------------------------------------
