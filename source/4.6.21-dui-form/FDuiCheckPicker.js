// ============================================================
// FDuiCheckPicker
// ============================================================
MO.FDuiCheckPicker = function FDuiCheckPicker(o){
   o = MO.Class.inherits(this, o, MO.FEditControl, MO.MEditBorder, MO.MDescCheckPicker, MO.MDropable);
   /// @style
   o.stIconDropSelect = MO.Class.register(o, new MO.AStyleIcon('DropSelect'));
   // Attribute
   o.items            = new MO.TItems();
   o.borderStyle      = MO.EUiBorder.RoundDrop;
   // Event
   o.onBuildEdit      = MO.FDuiCheckPicker_onBuildEdit;
   o.onEditEnd        = MO.FDuiCheckPicker_onEditEnd;
   o.onDataKeyDown    = MO.FDuiCheckPicker_onDataKeyDown;
   // Method
   o.loadConfig       = MO.FDuiCheckPicker_loadConfig;
   o.formatValue      = MO.FDuiCheckPicker_formatValue;
   o.validText        = MO.FDuiCheckPicker_validText;
   o.formatText       = MO.FDuiCheckPicker_formatText;
   o.refreshStyle     = MO.FDuiCheckPicker_refreshStyle;
   o.drop             = MO.FDuiCheckPicker_drop;
   o.dispose          = MO.FDuiCheckPicker_dispose;
   return o;
}
// ------------------------------------------------------------
MO.FDuiCheckPicker_onBuildEdit = function FDuiCheckPicker_onBuildEdit(b){
   var o = this;
   // 建立编辑控件
   var h = o.hEdit = MO.Window.Builder.appendEdit(b.hPanel, o.style('Edit'));
   // 设置可以输入的最大长度
   if(o.editLength){
      h.maxLength = o.editLength;
   }
}
// ------------------------------------------------------------
MO.FDuiCheckPicker_onEditEnd = function FDuiCheckPicker_onEditEnd(editor){
   var o = this;
   MO.Logger.debug(o, 'Begin (editor={1}:{2} value={3})', editor, editor?editor.value():'', o.dataValue);
   if(editor){
      o.set(editor.values);
   }
   o.onDataEditEnd(o);
   MO.Logger.debug(o, 'End (editor={1} value={2})', editor, o.dataValue);
}
// ------------------------------------------------------------
// config
MO.FDuiCheckPicker_loadConfig = function FDuiCheckPicker_loadConfig(c){
   var o = this;
   o.base.FEditControl.loadConfig.call(o, c);
   // Load items
   if(o.dataEmpty){
      o.items.create();
   }
   o.items.loadConfig(c);
   return MO.EStatus.Stop;
}
// ------------------------------------------------------------
MO.FDuiCheckPicker_text = function FDuiCheckPicker_text(){
   return this.hEdit.value;
}
// ------------------------------------------------------------
MO.FDuiCheckPicker_setText = function FDuiCheckPicker_setText(text){
   this.hEdit.value = text;
}
// ------------------------------------------------------------
MO.FDuiCheckPicker_formatValue = function FDuiCheckPicker_formatValue(text){
   var o = this;
   if(!MO.Lang.String.isEmpty(text)){
      ta = MO.Lang.String.split(text, ',');
      var vs = new Array();
      var item = o.items.items;
      for(var n = 0; n < ta.length; n++){
         for(var m = 0; m < item.count; m++){
            var c = item.value(m);
            if(c.label == ta[n]){
               vs.push(c.value);
            }
         }
      }
      return MO.Lang.String.toUpper(vs.join());
   }else{
      return '';
   }
//
//   if(MO.Lang.String.equals('Y',o.editCheck)){
//      return MO.Lang.String.toUpper(text);
//   }
//   return this.items.value(text);
}
// ------------------------------------------------------------
MO.FDuiCheckPicker_validText = function FDuiCheckPicker_validText(text){
   var o = this;
   if(MO.Lang.String.isEmpty(text)){
      return true;
   }
   return !MO.Lang.String.isEmpty(o.formatValue(text));
}
// ------------------------------------------------------------
MO.FDuiCheckPicker_formatText = function FDuiCheckPicker_formatText(v){
   var o = this;
   if(!MO.Lang.String.isEmpty(v)){
      va = MO.Lang.String.split(v, ',');
      var vs = new Array();
      var item = o.items.items;
      for(var n = 0; n < va.length; n++){
         var t = item.values[item.indexOf(va[n])];
         if(t){
            vs.push(t.label);
         }
      }
      return MO.Lang.String.toUpper(vs.join());
   }else{
      return '';
   }
//   if(MO.Lang.String.equals('Y',o.editCheck) && MO.Lang.String.isEmpty(this.items.label(value))){
//      return value;
//   }
   //return this.items.label(value);
}
// ------------------------------------------------------------
MO.FDuiCheckPicker_refreshStyle = function FDuiCheckPicker_refreshStyle(){
   var o = this;
   o.base.FEditControl.refreshStyle.call(o);
   o.hDrop.src = o.styleIconPath(o._hover ? 'DropSelect' : 'Drop');
}
// ------------------------------------------------------------
MO.FDuiCheckPicker_drop = function FDuiCheckPicker_drop(){
   var o = this;
   if(o.canDrop() && o.canEdit && o.items.count() > 0){
      var ed = o.editor = MO.Console.find(FEditConsole).focus(o, FDuiCheckPickerEditor, o.editRefer);
      if(ed.linkControl(o)){
         ed.setItems(o.items);
         ed.set(o.reget());
      }
      ed.show();
   }
}
// ------------------------------------------------------------
MO.FDuiCheckPicker_onDataKeyDown = function FDuiCheckPicker_onDataKeyDown(s, e){
   var o = this;
   o.base.FEditControl.onDataKeyDown.call(o, s, e);
   // 处理按键按下时，自动提示数据的处理
   if(o.items.count()){
      if(o.editor && o.editor.source == o){
         o.editor.onEditKeyDown(s, e);
      }
   }
}
// ------------------------------------------------------------
MO.FDuiCheckPicker_dispose = function FDuiCheckPicker_dispose(){
   var o = this;
   o.base.FEditControl.dispose.call(o);
   o.hEdit = MO.Lang.Html.free(o.hEdit);
}
