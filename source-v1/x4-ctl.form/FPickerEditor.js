// ============================================================
// FPickerEditor
// ============================================================
function FPickerEditor(o){
   o = RClass.inherits(this, o, FDropEditor, MShadow);
   // Constant
   o.MaxHeight    = 240;
   // Attribute
   o.originIndex  = null;
   o.selectIndex  = null;
   o.dsControl    = null;
   o.dataset      = null;
   o.columns      = new TList();
   // Html Event
   o.ohDropMdown  = FPickerEditor_ohDropMdown;
   o.ohDropMup    = FPickerEditor_ohDropMup;
   o.ohRowEnter   = FPickerEditor_ohRowEnter;
   o.ohRowLeave   = FPickerEditor_ohRowLeave;
   o.ohRowMdown   = FPickerEditor_ohRowMdown;
   // Event
   o.onBuildEdit  = FPickerEditor_onBuildEdit;
   o.onKeyDown    = FPickerEditor_onKeyDown;
   // Method
   o.isColumn     = FPickerEditor_isColumn;
   o.panel        = FPickerEditor_panel;
   o.position     = FPickerEditor_position;
   o.setPosition  = FPickerEditor_setPosition;
   o.buildFlag    = FPickerEditor_buildFlag;
   o.setDsControl = FPickerEditor_setDsControl;
   o.select       = FPickerEditor_select;
   o.focus        = FPickerEditor_focus;
   o.show         = FPickerEditor_show;
   o.hide         = FPickerEditor_hide;
   o.setValue     = FPickerEditor_setValue;
   return o;
}
// ------------------------------------------------------------
function FPickerEditor_ohDropMdown(){
   var o = this.link;
   if(o.inEdit && RClass.isClass(o, FPickerEditor)){
      RLog.debug(o, 'FPickerEditor.ohDropMdown', 'Drop mouse down');
      o.isSkipBlur = true;
   }
}
// ------------------------------------------------------------
function FPickerEditor_ohDropMup(){
   var o = this.link;
   if(o.inEdit && RClass.isClass(o, FPickerEditor)){
      RLog.debug(o, 'FPickerEditor.ohDropMup', 'Drop mouse up');
      o.hEdit.focus();
   }
}
// ------------------------------------------------------------
function FPickerEditor_ohRowEnter(){
   var o = this.link;
   if(RClass.isClass(o, FPickerEditor)){
      if(!this.ptySelect){
         this.className = o.style('RowHover');
      }
   }
}
// ------------------------------------------------------------
function FPickerEditor_ohRowLeave(){
   var o = this.link;
   if(RClass.isClass(o, FPickerEditor)){
      if(!this.ptySelect){
         this.className = o.style('Row');
      }
   }
}
// ------------------------------------------------------------
function FPickerEditor_ohRowMdown(){
   var o = this.link;
   if(RClass.isClass(o, FPickerEditor)){
      o.selectIndex = this.ptyIndex;
      o.editStatus = EEditStatus.Ok;
      o.inEdit = false;
      o.hEditor.blur();
   }
}
// ------------------------------------------------------------
function FPickerEditor_onBuildEdit(){
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
   o.hEditor = RBuilder.append(hCel, 'INPUT', o.style('Edit'));
   o.hEdit = o.hEditor;
   // Drop
   var hCel = hRow.insertCell()
   o.hDrop = RBuilder.appendIcon(hCel, 'ctl.ds-ds', o.style('Drop'));
   // Drop table (1colx1row)
   var hDrpCel = hFormTab.insertRow().insertCell();
   var h = o.hDropPanel = RBuilder.append(hDrpCel, 'DIV', o.style('DropPanel'));
   h.link = o;
   h.onmousedown = o.ohDropMdown;
   h.onmouseup = o.ohDropMup;
   // Build Items
   var h = o.hRowsPanel = RBuilder.appendTable(o.hDropPanel, null, 0, 1, 1);
   h.width = '100%';
   // Event
   o.linkKeyEvent(o.hEdit);
}
// ------------------------------------------------------------
function FPickerEditor_onKeyDown(event){
   var o = this;
   var kc = event.keyCode;
   if(EKey.Up == kc){
      o.select(o.selectIndex-1);
   }else if(EKey.Down == kc){
      o.select(o.selectIndex+1);
   }else if(EKey.Esc == kc){
      o.selectIndex = o.originIndex;
      o.editStatus = EEditStatus.Cancel;
      o.inEdit = false;
      o.hEditor.blur();
   }else if(EKey.Enter == kc){
      o.editStatus = EEditStatus.Ok;
      o.inEdit = false;
      o.hEditor.blur();
   }
}
// ------------------------------------------------------------
// column
function FPickerEditor_isColumn(c){
   if(c.dispPicker){
      return true;
   }
   return false;
}
// ------------------------------------------------------------
function FPickerEditor_panel(type){
   var o = this;
   if(EPanel.Shadow == type){
      return o.hDropPanel;
   }
   return o.base.FDropEditor.panel.call(o, type);
}
// ------------------------------------------------------------
function FPickerEditor_position(){
   return this.selectIndex;
}
// ------------------------------------------------------------
// position
function FPickerEditor_setPosition(p){
   var o = this;
   o.originIndex = p;
   o.selectIndex = p;
}
// ------------------------------------------------------------
function FPickerEditor_buildFlag(hRow){
   var h = hRow.insertCell();
   h.className = this.style('Flag');
   return h;
}
// ------------------------------------------------------------
function FPickerEditor_setDsControl(dsCtl, force){
   var o = this;
   // Check
   if(o.dataset == dsCtl.dsControl){
      if(!force && o.hRowsPanel.rows.length){
         return;
      }
   }
   o.hPanel.style.display = 'block';
   var dc = o.dsControl = dsCtl;
   var ds = o.dataset = dsCtl.dsControl;
   o.originIndex = ds.position;
   o.selectIndex = ds.position;
   var count = ds.count();
   // Build Columns
   var cols = o.columns;
   cols.clear();
   var cs = dsCtl.components;
   for(var i=0; i<cs.count; i++){
      var c = cs.value(i);
      if(o.isColumn(c)){
         o.columns.push(c);
      }
   }
   // Clear
   RHtml.clear(o.hRowsPanel);
   // Build Title
   var hRow = o.hRowsPanel.insertRow();
   o.buildFlag(hRow);
   for(var i=0; i<cols.count; i++){
      var c = cols.get(i);
      var hCel = hRow.insertCell();
      hCel.className = o.style('Title');
      if(c.dispAlign){
         hCel.align = c.dispAlign;
      }
      hCel.innerText = RString.nvl(c.label);
   }
   // Build Body
   for(var n=0; n<count; n++){
      var row = ds.row(n);
      var hRow = o.hRowsPanel.insertRow();
      hRow.link = o;
      hRow.ptyIndex = n;
      hRow.className = o.style('Row');
      hRow.onmouseenter = o.ohRowEnter;
      hRow.onmouseleave = o.ohRowLeave;
      hRow.onmousedown = o.ohRowMdown;
      // Flag
      o.buildFlag(hRow);
      // Label
      for(var i=0; i<cols.count; i++){
         var c = cols.get(i);
         var hCel = hRow.insertCell();
         if(c.dispAlign){
            hCel.align = c.dispAlign;
         }
         hCel.innerText = RString.nvl(row.get(c.dataName));
      }
   }
   // Build Width
   var hRow = o.hRowsPanel.insertRow();
   RBuilder.appendEmpty(o.buildFlag(hRow), 3);
   for(var i=0; i<cols.count; i++){
      var c = cols.get(i);
      var hCel = hRow.insertCell();
      if(c.pickerWidth){
         RBuilder.appendEmpty(hCel, c.pickerWidth);
      }
   }
   // Set height
   o.hDropPanel.style.height = o.hRowsPanel.offsetHeight+2;
}
// ------------------------------------------------------------
function FPickerEditor_select(n){
   var o = this;
   o.selectIndex = RInt.toRange(n, 0, o.dataset.count()-1);
   var rows = o.hRowsPanel.rows;
   for(var n=0; n<rows.length; n++){
      var row = rows[n];
      if(row.ptyIndex == o.selectIndex){
         row.className = o.style('RowSelect');
         row.ptySelect = true;
         row.scrollIntoView(false);
      }else{
         row.className = o.style('Row');
         row.ptySelect = false;
      }
   }
}
// ------------------------------------------------------------
function FPickerEditor_focus(){
   this.hEdit.focus();
}
// ------------------------------------------------------------
function FPickerEditor_show(v){
   var o = this;
   o.base.FDropEditor.show.call(o, v);
   o.select(o.selectIndex);
   var height = o.hDropPanel.offsetHeight;
   o.hDropPanel.style.height = Math.min(height, o.MaxHeight);
   o.base.MShadow.show.call(o, v);
   o.isSkipBlur = false;
}
// ------------------------------------------------------------
function FPickerEditor_hide(){
   var o = this;
   o.base.FDropEditor.hide.call(o);
   o.base.MShadow.hide.call(o);
}
// ------------------------------------------------------------
function FPickerEditor_setValue(value){
   var o = this;
   o.changed = false;
   o.dataValue = value;
   o.hEdit.value = value;
   o.select(o.selectIndex);
}
// ------------------------------------------------------------
