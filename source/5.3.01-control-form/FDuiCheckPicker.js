with(MO){
   // ============================================================
   // FDuiCheckPicker
   // ============================================================
   MO.FDuiCheckPicker = function FDuiCheckPicker(o){
      o = RClass.inherits(this, o, FEditControl, MEditBorder, MDescCheckPicker, MDropable);
      /// @style
      o.stIconDropSelect = RClass.register(o, new TStyleIcon('DropSelect'));
      // Attribute
      o.items            = new TItems();
      o.borderStyle      = EUiBorder.RoundDrop;
      // Event
      o.onBuildEdit      = FDuiCheckPicker_onBuildEdit;
      o.onEditEnd        = FDuiCheckPicker_onEditEnd;
      o.onDataKeyDown    = FDuiCheckPicker_onDataKeyDown;
      // Method
      o.loadConfig       = FDuiCheckPicker_loadConfig;
      o.formatValue      = FDuiCheckPicker_formatValue;
      o.validText        = FDuiCheckPicker_validText;
      o.formatText       = FDuiCheckPicker_formatText;
      o.refreshStyle     = FDuiCheckPicker_refreshStyle;
      o.drop             = FDuiCheckPicker_drop;
      o.dispose          = FDuiCheckPicker_dispose;
      return o;
   }
   // ------------------------------------------------------------
   MO.FDuiCheckPicker_onBuildEdit = function FDuiCheckPicker_onBuildEdit(b){
      var o = this;
      // 建立编辑控件
      var h = o.hEdit = RBuilder.appendEdit(b.hPanel, o.style('Edit'));
      // 设置可以输入的最大长度
      if(o.editLength){
         h.maxLength = o.editLength;
      }
   }
   // ------------------------------------------------------------
   MO.FDuiCheckPicker_onEditEnd = function FDuiCheckPicker_onEditEnd(editor){
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
   MO.FDuiCheckPicker_loadConfig = function FDuiCheckPicker_loadConfig(c){
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
   MO.FDuiCheckPicker_validText = function FDuiCheckPicker_validText(text){
      var o = this;
      if(RString.isEmpty(text)){
         return true;
      }
      return !RString.isEmpty(o.formatValue(text));
   }
   // ------------------------------------------------------------
   MO.FDuiCheckPicker_formatText = function FDuiCheckPicker_formatText(v){
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
   MO.FDuiCheckPicker_refreshStyle = function FDuiCheckPicker_refreshStyle(){
      var o = this;
      o.base.FEditControl.refreshStyle.call(o);
      o.hDrop.src = o.styleIconPath(o._hover ? 'DropSelect' : 'Drop');
   }
   // ------------------------------------------------------------
   MO.FDuiCheckPicker_drop = function FDuiCheckPicker_drop(){
      var o = this;
      if(o.canDrop() && o.canEdit && o.items.count() > 0){
         var ed = o.editor = RConsole.find(FEditConsole).focus(o, FDuiCheckPickerEditor, o.editRefer);
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
      RMemory.freeHtml(o.hEdit);
      o.hEdit = null;
   }
}
