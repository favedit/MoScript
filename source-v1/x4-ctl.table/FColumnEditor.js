// ============================================================
// FColumnEditor
// ============================================================
function FColumnEditor(o){
   o = RClass.inherits(this, o, FHoverEditor, MEventKey);
   // Attribute
   o.pattern      = null;
   o.table        = null;
   o.column       = null;
   o.row          = null;
   o.storeNodes   = new Object();
   // Html
   o.hStore       = null;
   // Html Event
   o.onKeyDown    = FColumnEditor_onKeyDown;
   o.onKeyUp      = FColumnEditor_onKeyUp;
   // Event
   o.onBuildEdit  = FColumnEditor_onBuildEdit;
   // Method
   o.text         = FColumnEditor_text;
   o.setText      = FColumnEditor_setText;
   o.focus        = RMethod.empty;
   o.value        = FColumnEditor_value;
   o.setValue     = FColumnEditor_setValue;
   o.linkPanel    = FColumnEditor_linkPanel;
   return o;
}
// ------------------------------------------------------------
function FColumnEditor_onKeyDown(e){
   var o = this;
   var k = e.keyCode;
   if(EKey.Up == k){
      o.column.moveFocus(o.row, EPosition.Top);
      e.returnValue = false;
   }else if(EKey.Down == k){
      o.column.moveFocus(o.row, EPosition.Bottom);
      e.returnValue = false;
   }else if(e.shiftKey && EKey.Tab == k){
      o.column.moveFocus(o.row, EPosition.Before);
      e.returnValue = false;
   }else if(EKey.Tab == k){
      o.column.moveFocus(o.row, EPosition.After);
      e.returnValue = false;
   }
}
// ------------------------------------------------------------
function FColumnEditor_onKeyUp(){
   var o = this.link;
   if(RClass.isClass(o, FColumnEditor)){
      o.onEditChanged();
   }
}
// ------------------------------------------------------------
function FColumnEditor_onBuildEdit(event){
   var o = this;
   // Form
   o.hForm = RBuilder.newTable();
   var hRow = o.hForm.insertRow();
   var hCel = hRow.insertCell();
   // Edit
   o.hEdit = RBuilder.append(hCel, 'INPUT', o.style('Edit'));
   o.linkEvent(o.hEdit);
   // Build
   return EEventStatus.Stop;
}
// ------------------------------------------------------------
function FColumnEditor_text(){
   return this.hEdit.value;
}
// ------------------------------------------------------------
function FColumnEditor_setText(text){
   this.changed = false;
   this.storedText = text;
   this.hEdit.value = text;
}
// ------------------------------------------------------------
function FColumnEditor_value(){
}
// ------------------------------------------------------------
function FColumnEditor_setValue(){
}
// ------------------------------------------------------------
// table, column, row
function FColumnEditor_linkPanel(t, c, r){
   var o = this;
   RLog.debug(o, 'Link panel (table={1},editable={2})\ncolumn={3}\nrow={4}', RClass.dump(t), RClass.dump(o.editable), c.dump(), r.dump())
   var hp = t.hRowsPanel;
   var he = c.cell(r);
   o.table = t;
   o.column = c;
   o.row = r;
   RHtml.toRect(o.rect, he, hp);
   RHtml.setRect(o.hPanel, o.rect);
   var s = o.hEdit.style;
   s.pixelWidth = he.clientWidth;
   s.pixelHeight = he.offsetHeight-2;
   s.paddingLeft = parseInt(he.currentStyle.paddingLeft);
   s.paddingTop = parseInt(he.currentStyle.paddingTop)-1;
   if(r.isSelect){
      s.backgroundColor = EColor.RowEditSelect;
   }else{
      s.backgroundColor = EColor.Edit;
   }
   o.setText(r.get(c.dataName));
   o.base.FHoverEditor.linkPanel.call(o, hp, he);
}
// ------------------------------------------------------------
