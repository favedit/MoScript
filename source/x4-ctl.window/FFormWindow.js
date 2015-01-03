// ============================================================
// FFormWindow
// ============================================================
function FFormWindow(o){
   o = RClass.inherits(this, o, FWindow);
   /// @style
   o.styleTablePanel  = RClass.register(o, new TStyle('TablePanel'));
   o.styleButtonPanel = RClass.register(o, new TStyle('ButtonPanel'));
   // Attribute
   //o.isDialog       = true;
   o.table          = null;
   o.lovControl     = null;
   // Html
   o.hForm          = null;
   o.hMessages      = null;
   // Html Event
   // Process
   o.oeBuild        = FFormWindow_oeBuild;
   // Event
   o.onBuildButtons = FFormWindow_onBuildButtons;
   o.onSelect       = FFormWindow_onSelect;
   o.onClose        = FFormWindow_onClose;
   o.onSearch       = FFormWindow_onSearch;
   // Method
   o.linkForm       = FFormWindow_linkForm;
   o.show           = FFormWindow_show;
   o.hide           = FFormWindow_hide;
   o.focus          = FFormWindow_focus;
   o.dispose        = FFormWindow_dispose;
   return o;
}
// ------------------------------------------------------------
function  FFormWindow_onSearch(){
   var o = this;
   var lov_searchBox = RControl.create(FSearchWindow);
   lov_searchBox.linkDsControl(o.table);
   lov_searchBox.show();
}
// ------------------------------------------------------------
function FFormWindow_oeBuild(e){
   var o = this;
   var r = o.base.FWindow.oeBuild.call(o, e);
   if(e.isAfter()){
      o.setIcon('Picker');
      // Form (2colx1row)
      var hTab = RBuilder.appendTable(o.hBodyPanel);
      o.hBodyPanel.style.height = '550px';
      hTab.width = '100%';
      hTab.height = '100%';
      // Button Panel
      //var h = o.hButtonPanel = hTab.insertRow().insertCell();
      //h.height = 1;
      //h.className = o.style('ButtonPanel');
      //h.style.borderBottomStyle = 'solid';
      //h.style.borderBottomWidth  = 'thin';
      // Message Panel
      var h = o.hTablePanel = hTab.insertRow().insertCell();
      h.vAlign = 'top';
      //o.onBuildButtons();
      RConsole.find(FKeyConsole).register(EKey.Esc, new TListener(o, o.onClose));
   }
   return r;
}
// ------------------------------------------------------------
function FFormWindow_onBuildButtons(){
   var o = this;
   // Button Panel
   var hBtnTab = RBuilder.appendTable(o.hButtonPanel, null, 0, 0, 6);
   var hRow = hBtnTab.insertRow();
   // Button - Search
   /*var b = o.btnSearch = RClass.create(FButton);
   b.icon = 'tool.search';
   b.label = RContext.get('FToolButton:search');
   b.width = '100%';
   b.lsnsClick.register(o, o.onSearch);
   b.psBuild(hRow.insertCell());*/
   // Button - Close
   var b = o.btnClose = RClass.create(FButton);
   b.icon = 'tool.exit';
   b.label = RContext.get('FToolButton:close');
   b.width = '100%';
   b.lsnsClick.register(o, o.onClose);
   b.psBuild(hRow.insertCell());
}
// ------------------------------------------------------------
function FFormWindow_onSelect(row){
   var o = this;
   var lov = o.lovControl;
   var pack = RPack.split(lov.lovFields, ',', '=');
   var ds = lov.topControl(MDataset);
   if(RClass.isClass(ds, FForm)){
      for(var n=0; n<pack.count; n++){
         var fn = pack.name(n);
         var fv = pack.value(n);
         if(RString.startsWith(fv, '${') && RString.endsWith(fv, '}')){
            fv = fv.substr(2, fv.length-3);
            fv = row.get(fv);
         }
         ds.set(fn, fv);
      }
   }else if(RClass.isClass(ds, FRow)){
   }
   if(RClass.isClass(lov, MFocus)){
      RConsole.find(FFocusConsole).focusClass(MDataset, ds);
      RConsole.find(FEventConsole).add(lov, lov.focus);
   }
   o.hide();
}
// ------------------------------------------------------------
function FFormWindow_onClose(){
   this.hide();
}
// ------------------------------------------------------------
// control
function FFormWindow_buildField(c){
   var o = this;
   var hCell = o.hFieldsTab.insertRow().insertCell();
   hCell.innerText = c.label;
   o.fieldsPanel = RControl.create(FPanel);
   o.fieldsPanel.psBuild();
   o.fieldsPanel.setPanel(hCel);
}
// ------------------------------------------------------------
function FFormWindow_linkForm(g){
   var o = this;
   var f = o.form = RConsole.find(FFormConsole).createFromName(g.formName, o.hTablePanel);
   f.hPanel.style.width = '100%';
   f.hPanel.style.height = '100%';
   f.psMode(EMode.Update);
   f.setVisible(true);
   f.dsValues = g.values;
   f.psRefresh();
   f.focus();
   f.dsFetch(true, true);
   // ����ͼ��ͱ���
   if(RClass.isClass(f, FForm)){
      o.hIcon.src = RRes.iconPath('#tbr.formEdit');
   }else{
      o.hIcon.src = RRes.iconPath('#tbr.table');
   }
   o.setCaption(f.label);
}
// ------------------------------------------------------------
function FFormWindow_show(){
   var o = this;
   o.base.FWindow.show.call(o);
   RWindow.moveCenter(o.hPanel);
   o.psVisible(true);
   RWindow.setEnable(false, true);
   o.focus();
}
// ------------------------------------------------------------
function FFormWindow_hide(){
   var o = this;
   //RWindow.enable();
   o.base.FWindow.hide.call(o);
   RWindow.setEnable(true);
}
// ------------------------------------------------------------
function FFormWindow_focus(){
   var o = this;
   o.base.FWindow.focus.call(o);
   var t = o.table;
   if(t && t.hPage){
      t.hPage.focus();
   }
}
// ------------------------------------------------------------
function FFormWindow_dispose(){
   var o = this;
   o.base.FWindow.dispose.call(o);
   RMemory.freeHtml(o.hBodyPanel);
   RMemory.freeHtml(o.hTablePanel);
   RMemory.freeHtml(o.hButtonPanel);
   o.hBodyPanel       = null;
   o.hTablePanel      = null;
   o.hButtonPanel     = null;
}