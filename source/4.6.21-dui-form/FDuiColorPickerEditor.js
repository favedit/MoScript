// ============================================================
// FDuiColorPickerEditor
// ============================================================
MO.FDuiColorPickerEditor = function FDuiColorPickerEditor(o){
   o = MO.Class.inherits(this, o, MO.FDropEditor, MO.MShadow);
   // Constant
   //o.MinWidth     = 120;
   o.MinWidth     = 240;
   o.ColorHex     = new Array('00', '33', '66', '99', 'CC', 'FF');
   o.SpColorHex   = new Array('FF0000', '00FF00', '0000FF', 'FFFF00', '00FFFF','FF00FF');
   // Event
   o.onCellEnter  = MO.Class.register(o, new HMouseOver('onCellEnter'),  MO.FDuiColorPickerEditor_onCellEnter);
   o.onCellSelect = MO.Class.register(o, new HMouseDown('onCellSelect'), MO.FDuiColorPickerEditor_onCellSelect);
   // Attribute
   o.color        = null;
   o.hTable       = null;
   o.cellWidth    = 16;
   o.cellHeight   = 10;
//   o.cellWidth    = 10;
//   o.cellHeight   = 8;
   // Event
   o.onBuildDrop  = MO.FDuiColorPickerEditor_onBuildDrop;
   o.onKeyDown    = MO.FDuiColorPickerEditor_onKeyDown;
   o.onCellSelect = MO.FDuiColorPickerEditor_onCellSelect;
    o.onEditEnd   = MO.FDuiColorPickerEditor_onEditEnd;
   // Method
   o.makeCell     = MO.FDuiColorPickerEditor_makeCell;
   o.set          = MO.FDuiColorPickerEditor_set;
   o.show         = MO.FDuiColorPickerEditor_show;
   o.hide         = MO.FDuiColorPickerEditor_hide;
   o.linkControl  = MO.FDuiColorPickerEditor_linkControl;
   o.dispose      = MO.FDuiColorPickerEditor_dispose;
   return o;
}
// ------------------------------------------------------------
MO.FDuiColorPickerEditor_onBuildDrop = function FDuiColorPickerEditor_onBuildDrop(){
   var o = this;
   o.hTable = MO.Window.Builder.appendTable(o.hDropPanel);
   for(var i = 0; i < 2; i++){
      for(var j = 0; j < 6; j++){
         var hRow = o.hTable.insertRow();
         o.makeCell(hRow, "#000000");
         if (i == 0){
            o.makeCell(hRow, '#'+o.ColorHex[j] + o.ColorHex[j] + o.ColorHex[j]);
         }else {
            o.makeCell(hRow, '#'+o.SpColorHex[j]);
         }
         o.makeCell(hRow, "#000000");
         for (k = 0; k < 3; k++) {
            for (l = 0; l < 6; l++) {
               o.makeCell(hRow, '#'+o.ColorHex[k + i * 3] + o.ColorHex[l] + o.ColorHex[j]);
            }
         }
      }
   }
}
// ------------------------------------------------------------
MO.FDuiColorPickerEditor_linkControl = function FDuiColorPickerEditor_linkControl(c){
   var o = this;
   if(o.source == c){
      return false;
   }
   o.source = c;
   RLog.debug(o, 'link Panel (panel={0}, edit={1})', MO.Class.dump(c.hEditCell), MO.Class.dump(c.hEdit));
   MO.Window.Html.toRect(o.rect, c.hEditCell);
   MO.Window.Html.setPixelRect(o.hPanel, o.rect);
   o.hPanel.style.pixelTop = o.rect.bottom;
   var hbf = o.border.hForm;
   hbf.style.pixelWidth = c.editBorder.hForm.width;
   hbf.style.pixelHeight = c.editBorder.hForm.height;
   return true;
}
// ------------------------------------------------------------
MO.FDuiColorPickerEditor_onCellEnter = function FDuiColorPickerEditor_onCellEnter(e){
   var o = this;
   o.editable.hDrop.style.backgroundColor = e.hSource.style.backgroundColor;
}
// ------------------------------------------------------------
MO.FDuiColorPickerEditor_onCellSelect = function FDuiColorPickerEditor_onCellSelect(e){
   var o = this;
   o.color = e.srcElement.style.backgroundColor;
   o.editStatus = EEditStatus.Ok
   o.blur();
}
// ------------------------------------------------------------
MO.FDuiColorPickerEditor_makeCell = function FDuiColorPickerEditor_makeCell(hRow, color) {
   var o = this;
   var h = hRow.insertCell();
   h.link = o;
   h.width = o.cellWidth;
   h.height = o.cellHeight;
   h.style.backgroundColor = color;
   // link event
   o.attachEvent('onCellEnter', h);
   o.attachEvent('onCellSelect', h);
   return h;
}
// ------------------------------------------------------------
MO.FDuiColorPickerEditor_onKeyDown = function FDuiColorPickerEditor_onKeyDown(e){
   alert(FDuiColorPickerEditor_onKeyDown);
   var o = this;
   var kc = e.keyCode;
   if(EKey.Up == kc){
      o.select(o.selectIndex-1);
   }else if(EKey.Down == kc){
      o.select(o.selectIndex+1);
   }else if(EKey.Esc == kc){
      o.editStatus = EEditStatus.Cancel;
      o.selectIndex = o.originIndex;
      RKey.eventClear(e);
      o.inEdit = false;
      o.hEdit.blur();
   }else if(EKey.Enter == kc){
      o.editStatus = EEditStatus.Ok;
      RKey.eventClear(e);
      o.inEdit = false;
      o.hEdit.blur();
   }
}
// ------------------------------------------------------------
MO.FDuiColorPickerEditor_set = function FDuiColorPickerEditor_set(v){
   var o = this;
   o.color = v;
}
// ------------------------------------------------------------
MO.FDuiColorPickerEditor_show = function FDuiColorPickerEditor_show(v){
   var o = this;
   o.base.FDropEditor.show.call(o, v);
   RConsole.find(FFocusConsole).focus(o);
   if(o.border.hForm.offsetWidth < o.MinWidth){
      o.border.hForm.style.pixelWidth = o.MinWidth;
   }
   o.base.MShadow.show.call(o, v);
   o.isSkipBlur = false;
}
//------------------------------------------------------------
MO.FDuiColorPickerEditor_onEditEnd = function FDuiColorPickerEditor_onEditEnd(){
   var o = this;
   var t = o.editable;
   RLog.debug(o, 'Edit end (editable={0}, status={1})', MO.Class.dump(t), REnum.decode(EEditStatus, o.editStatus));
   if(t){
      t.hDrop.style.backgroundColor = o.color;
      var ec = RConsole.find(FEventConsole);
      if(EEditStatus.Cancel == o.editStatus){
         ec.add(t, t.focus);
      }else if(EEditStatus.Ok == o.editStatus){
         t.onEditEnd(o);
         ec.add(t, t.focus);
      }
   }
   o.editable = null;
   o.inEdit = false;
}
// ------------------------------------------------------------
MO.FDuiColorPickerEditor_hide = function FDuiColorPickerEditor_hide(){
   var o = this;
   o.source = null;
   o.base.FDropEditor.hide.call(o);
   o.base.MShadow.hide.call(o);
}
// ------------------------------------------------------------
MO.FDuiColorPickerEditor_dispose = function FDuiColorPickerEditor_dispose(){
   var o = this;
   o.base.FDropEditor.dispose.call(o);
   RMemory.freeHtml(o.hTable);
   RMemory.freeHtml(o.hDropPanel);
   RMemory.freeHtml(o.hEdit);
   o.hTable = null;
   o.hDropPanel = null;
   o.hEdit = null;
}
