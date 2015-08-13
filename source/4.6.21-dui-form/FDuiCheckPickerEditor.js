// ============================================================
// FDuiCheckPickerEditor
// ============================================================
MO.FDuiCheckPickerEditor = function FDuiCheckPickerEditor(o){
   o = MO.Class.inherits(this, o, MO.FDropEditor, MO.MShadow);
   // Constant
   o.MinWidth         = 120;
   // Event
   o.onEditFocus      = MO.Class.register(o, new MO.HFocus('onEditFocus'));
   o.onEditBlur       = MO.Class.register(o, new MO.HBlur('onEditBlur'));
   /// @style
   o.stIconDropSelect = MO.Class.register(o, new MO.TStyleIcon('DropSelect'));
   o.stFlag           = MO.Class.register(o, new MO.TStyle('Flag'));
   o.stEditForm       = MO.Class.register(o, new MO.TStyle('EditForm'));
   // Attribute
   o.pattern          = null;
   o.originItem       = null;
   o.selectItem       = null;
   o.items            = null;
   o.itemClickListener = null;
   o.values           = new Array();
   // Html
   o.hBtnTextSpan     = null;
   // Event
   o.onBuildDrop      = MO.FDuiCheckPickerEditor_onBuildDrop;
   o.onBuildButton    = MO.FDuiCheckPickerEditor_onBuildButton;
   o.onItemClick      = MO.FDuiCheckPickerEditor_onItemClick;
   o.onEditKeyDown    = MO.FDuiCheckPickerEditor_onEditKeyDown;
   // Method
   o.construct        = MO.FDuiCheckPickerEditor_construct;
   o.set              = MO.FDuiCheckPickerEditor_set;
   o.setItems         = MO.FDuiCheckPickerEditor_setItems;
   o.select           = MO.FDuiCheckPickerEditor_select;
   o.linkControl      = MO.FDuiCheckPickerEditor_linkControl;
   o.show             = MO.FDuiCheckPickerEditor_show;
   o.hide             = MO.FDuiCheckPickerEditor_hide;
   o.dispose          = MO.FDuiCheckPickerEditor_dispose;
   return o;
}
// ------------------------------------------------------------
MO.FDuiCheckPickerEditor_construct = function FDuiCheckPickerEditor_construct(){
   var o = this;
   o.itemClickListener = new TListener(o, o.onItemClick);
}
// ------------------------------------------------------------
MO.FDuiCheckPickerEditor_onBuildDrop = function FDuiCheckPickerEditor_onBuildDrop(){
   var o = this;
   o.hItemsForm = MO.Window.Builder.appendTable(o.hDropPanel);
   o.hItemsForm.width = '100%';
   o.hItemsPanel = MO.Window.Builder.append(o.hItemsForm, 'TBODY');
   o.onBuildButton();
}
// ------------------------------------------------------------
MO.FDuiCheckPickerEditor_onBuildButton = function FDuiCheckPickerEditor_onBuildButton(){
   var o = this;
   o.base.FDropEditor.onBuildButton.call(o);
   var h = o.hBtnTextSpan = MO.Window.Builder.newSpan(o.hButtonPanel, null);
   h.innerText = 'colse';
}
// ------------------------------------------------------------
MO.FDuiCheckPickerEditor_onItemClick = function FDuiCheckPickerEditor_onItemClick(s){
   var o = this;
   s.setChecked(!s.checked);
   var ts = o.items.items;
   var cs = o.components;
   var vs = new Array();
   for(var n = 0; n < ts.count; n++){
      var c = cs.value(n);
      if(c.checked){
         vs.push(c.value);
      }
   }
   var e = o.source;
   e.set(vs.join());
   //o.hide();
}
// ------------------------------------------------------------
MO.FDuiCheckPickerEditor_select = function FDuiCheckPickerEditor_select(p){
   var o = this;
   var cs = o.components;
   p = Math.min(Math.max(0, p), cs.count-1)
   for(var n=0; n<cs.count; n++){
      o.components.value(n).setChecked(n == p);
   }
   o.position = p;
}
// ------------------------------------------------------------
MO.FDuiCheckPickerEditor_onEditKeyDown = function FDuiCheckPickerEditor_onEditKeyDown(s, e){
   var o = this;
   return;
}
// ------------------------------------------------------------
MO.FDuiCheckPickerEditor_set = function FDuiCheckPickerEditor_set(v){
   var o = this;
   var cs = o.components;
   var cl = cs.count;
   for(var n = 0;n < cl;n++){
      cs.value(n).setChecked(false);
   }
   if(!MO.Lang.String.isEmpty(v)){
      o.values = v;
      va = MO.Lang.String.split(v, ',');
      for(var n = 0; n < va.length; n++){
         var c = cs.get(va[n]);
         if(c){
            c.setChecked(true);
         }
      }
   }
}
// ------------------------------------------------------------
MO.FDuiCheckPickerEditor_setItems = function FDuiCheckPickerEditor_setItems(items){
   var o = this;
   if(o.components){
      return;
   }
   var hip = o.hItemsPanel;
   o.items = items;
   var count = items.count();
   for(var n=0; n<count; n++){
      // Build split line
      if(n > 0){
         var hr = MO.Window.Builder.append(hip, 'TR');
         hr.height = 1;
         var hd = MO.Window.Builder.append(hr, 'TD');
         hd.colSpan = 3;
         hd.style.borderTop = '1 dashed #24c2db';
         MO.Window.Builder.appendEmpty(hd);
      }
      // Build item
      var t = items.get(n);
      var c = RControl.create(FSelectItem);
      c.name = t.value;
      c.lsnsClick.push(o.itemClickListener);
      c.set(t.icon, t.label, t.value);
      c.setPanel(hip);
      o.push(c);
   }
   o.position = 0;
}
// ------------------------------------------------------------
MO.FDuiCheckPickerEditor_linkControl = function FDuiCheckPickerEditor_linkControl(c){
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
MO.FDuiCheckPickerEditor_show = function FDuiCheckPickerEditor_show(v){
   var o = this;
   o.base.FDropEditor.show.call(o, v);
   RConsole.find(FFocusConsole).focus(o);
   if(o.border.hForm.offsetWidth < o.MinWidth){
      o.border.hForm.style.pixelWidth = o.MinWidth;
   }
   o.base.MShadow.show.call(o, v);
   o.isSkipBlur = false;
}
// ------------------------------------------------------------
MO.FDuiCheckPickerEditor_hide = function FDuiCheckPickerEditor_hide(){
   var o = this;
   o.source = null;
   o.base.FDropEditor.hide.call(o);
   o.base.MShadow.hide.call(o);
}
// ------------------------------------------------------------
MO.FDuiCheckPickerEditor_dispose = function FDuiCheckPickerEditor_dispose(){
   var o = this;
   o.base.FDropEditor.dispose.call(o);
   RMemory.freeHtml(o.hPanel);
   RMemory.freeHtml(o.hItemsForm);
   RMemory.freeHtml(o.hItemsPanel);
   RMemory.freeHtml(o.hBtnTextSpan);
   RMemory.freeHtml(o.hDropPanel);
   RMemory.freeHtml(o.hButtonPanel);
   o.hPanel = null;
   o.hItemsForm = null;
   o.hItemsPanel = null;
   o.hBtnTextSpan = null;
   o.hDropPanel = null;
   o.hButtonPanel = null;
}
