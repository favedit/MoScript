// ============================================================
// FMemoDrop
// ============================================================
function FMemoDrop(o){
   o = RClass.inherits(this, o, FDataEditControl, MDropable);
   // Attribute
   o.dataMemo    = '';
   // Html
   o.hForm       = null;
   o.hDrop       = null;
   o.hForm       = null;
   // Event
   o.onBuildEdit = FMemoDrop_onBuildEdit;
   o.onEditEnd   = FMemoDrop_onEditEnd;
   // Method
   o.loadConfig  = FMemoDrop_loadConfig;
   o.saveConfig  = FMemoDrop_saveConfig;
   o.formatValue = FMemoDrop_formatValue;
   o.formatText  = FMemoDrop_formatText;
   o.text        = FMemoDrop_text;
   o.setText     = FMemoDrop_setText;
   o.drop        = FMemoDrop_drop;
   return o;
}
// ------------------------------------------------------------
function FMemoDrop_onBuildEdit(){
   var o = this;
   //o.hEdit = RBuilder.newEdit();
   o.hEdit = RBuilder.create(null, 'TEXTAREA');
   o.hDrop = RBuilder.newIcon(null, 'ctl.memo');
}
// ------------------------------------------------------------
function FMemoDrop_onEditEnd(editor){
   var o = this;
   RLog.debug(o, 'Begin (editor={1}:{2} value={3})', editor, editor?editor.value():'', o.dataValue);
   if(editor){
      var v = editor.value();
      var f = RString.firstLine(v);
      o.setText(f);
      o.dataValue = v;
      o.dataMemo = v.substr(f.length);
   }
   o.base.FDataEditControl.onEditEnd.call(o);
   RLog.debug(o, 'End (editor={1} value={2})', editor, o.dataValue);
}
// ------------------------------------------------------------
function FMemoDrop_onKeyDown(){
   if(EKey.Down == event.keyCode){
      this.drop();
   }
}
// ------------------------------------------------------------
function FMemoDrop_onDoubleClick(){
   this.drop();
}
// ------------------------------------------------------------
function FMemoDrop_loadConfig(config){
   var o = this;
   o.base.FDataEditControl.loadConfig.call(o, config);
}
// ------------------------------------------------------------
function FMemoDrop_saveConfig(config){
   this.base.FDataEditControl.saveConfig.call(this, config)
}
// ------------------------------------------------------------
function FMemoDrop_formatValue(s){
   return s + this.dataMemo;
}
// ------------------------------------------------------------
function FMemoDrop_formatText(s){
   return RString.firstLine(s);
}
// ------------------------------------------------------------
function FMemoDrop_text(){
   return this.hEdit.value;
}
// ------------------------------------------------------------
function FMemoDrop_setText(text){
   this.hEdit.value = text;
}
// ------------------------------------------------------------
function FMemoDrop_drop(){
   var o = this;
   if(o.canEdit){
      o.dataValue = o.hEdit.value + o.dataMemo;
      var editor = o.editConsole.focus(o, FMemoDropEditor, o.name);
      editor.linkPanel(o.hControlPanel, o.hEdit);
      editor.setValue(o.dataValue);
      editor.show();
   }
}
// ------------------------------------------------------------
function FMemoDrop_focus(){
   this.hEdit.focus();
}
// ------------------------------------------------------------
