// ============================================================
// FCheckPicker
// ============================================================
function FCheckPicker(o){
   o = RClass.inherits(this, o, FEditControl, MEditBorder, MDescCheckPicker, MDropable);
   /// @style
   o.stIconDropSelect = RClass.register(o, new TStyleIcon('DropSelect'));
   // Attribute
   o.items            = new TItems();
   o.borderStyle      = EBorder.RoundDrop;
   // Event
   o.onBuildEdit      = FCheckPicker_onBuildEdit;
   o.onEditEnd        = FCheckPicker_onEditEnd;
   o.onDataKeyDown    = FCheckPicker_onDataKeyDown;
   // Method
   o.loadConfig       = FCheckPicker_loadConfig;
   o.formatValue      = FCheckPicker_formatValue;
   o.validText        = FCheckPicker_validText;
   o.formatText       = FCheckPicker_formatText;
   o.refreshStyle     = FCheckPicker_refreshStyle;
   o.drop             = FCheckPicker_drop;
   o.dispose          = FCheckPicker_dispose;
   return o;
}
// ------------------------------------------------------------
function FCheckPicker_onBuildEdit(b){
   var o = this;
   // 建立编辑控件
   var h = o.hEdit = RBuilder.appendEdit(b.hPanel, o.style('Edit'));
   // 设置可以输入的最大长度
   if(o.editLength){
      h.maxLength = o.editLength;
   }
}
// ------------------------------------------------------------
function FCheckPicker_onEditEnd(editor){
   var o = this;
   RLog.debug(o, 'Begin (editor={1}:{2} value={3})', editor, editor?editor.value():'', o.dataValue);
   if(editor){
      o.set(editor.values);
   }
   o.onDataEditEnd(o);
   RLog.debug(o, 'End (editor={1} value={2})', editor, o.dataValue);
}
// ------------------------------------------------------------
// config
function FCheckPicker_loadConfig(c){
   var o = this;
   o.base.FEditControl.loadConfig.call(o, c);
   // Load items
   if(o.dataEmpty){
      o.items.create();
   }
   o.items.loadConfig(c);
   return EStatus.Stop;
}
// ------------------------------------------------------------
function FCheckPicker_text(){
   return this.hEdit.value;
}
// ------------------------------------------------------------
function FCheckPicker_setText(text){
   this.hEdit.value = text;
}
// ------------------------------------------------------------
function FCheckPicker_formatValue(text){
   var o = this;
   if(!RString.isEmpty(text)){
      ta = RString.split(text, ',');
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
      return RString.toUpper(vs.join());
   }else{
      return '';
   }
//
//   if(RString.equals('Y',o.editCheck)){
//      return RString.toUpper(text);
//   }
//   return this.items.value(text);
}
// ------------------------------------------------------------
function FCheckPicker_validText(text){
   var o = this;
   if(RString.isEmpty(text)){
      return true;
   }
   return !RString.isEmpty(o.formatValue(text));
}
// ------------------------------------------------------------
function FCheckPicker_formatText(v){
   var o = this;
   if(!RString.isEmpty(v)){
      va = RString.split(v, ',');
      var vs = new Array();
      var item = o.items.items;
      for(var n = 0; n < va.length; n++){
         var t = item.values[item.indexOf(va[n])];
         if(t){
            vs.push(t.label);
         }
      }
      return RString.toUpper(vs.join());
   }else{
      return '';
   }
//   if(RString.equals('Y',o.editCheck) && RString.isEmpty(this.items.label(value))){
//      return value;
//   }
   //return this.items.label(value);
}
// ------------------------------------------------------------
function FCheckPicker_refreshStyle(){
   var o = this;
   o.base.FEditControl.refreshStyle.call(o);
   o.hDrop.src = o.styleIconPath(o._hover ? 'DropSelect' : 'Drop');
}
// ------------------------------------------------------------
function FCheckPicker_drop(){
   var o = this;
   if(o.canDrop() && o.canEdit && o.items.count() > 0){
      var ed = o.editor = RConsole.find(FEditConsole).focus(o, FCheckPickerEditor, o.editRefer);
      if(ed.linkControl(o)){
         ed.setItems(o.items);
         ed.set(o.reget());
      }
      ed.show();
   }
}
// ------------------------------------------------------------
function FCheckPicker_onDataKeyDown(s, e){
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
function FCheckPicker_dispose(){
   var o = this;
   o.base.FEditControl.dispose.call(o);
   RMemory.freeHtml(o.hEdit);
   o.hEdit = null;
}
