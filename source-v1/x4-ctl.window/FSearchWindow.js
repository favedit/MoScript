// ============================================================
// FSearchWindow
// ============================================================
function FSearchWindow(o){
   o = RClass.inherits(this, o, FWindow);
   // Attribute
   o.type             = null;
   // Css
   o.styleFieldPanel  = RClass.register(o, new TStyle('FieldPanel'));
   o.styleButtonPanel = RClass.register(o, new TStyle('ButtonPanel'));
   // Html
   o.searchControls   = new TList();
   o.hForm            = null;
   o.hMessages        = null;
   // Html Event
   // Process
   o.oeBuild          = FSearchWindow_oeBuild;
   // Event
   o.onBuildButtons   = FSearchWindow_onBuildButtons;
   o.onSearch         = FSearchWindow_onSearch;
   o.onClear          = FSearchWindow_onClear;
   o.onReset          = FSearchWindow_onReset;
   o.onClose          = FSearchWindow_onClose;
   // Method
   o.buildField       = FSearchWindow_buildField;
   o.linkDsControl    = FSearchWindow_linkDsControl;
   o.show             = FSearchWindow_show;
   o.hide             = FSearchWindow_hide;
   o.dispose          = FSearchWindow_dispose;
   return o;
}
// ------------------------------------------------------------
function FSearchWindow_oeBuild(e){
   var o = this;
   var r = o.base.FWindow.oeBuild.call(o, e);
   if(e.isAfter()){
      o.setIcon('Search');
      o.setCaption('Search');
      // Form (2colx1row)
      var ht = RBuilder.appendTable(o.hBodyPanel);
      ht.width = '100%';
      ht.height = '100%';
      var h1 = o.hButtonPanel = ht.insertRow().insertCell();
      h1.style.borderBottomStyle = 'solid';
      h1.style.borderBottomWidth  = 'thin';
      var h2 = o.hDataPanel = ht.insertRow().insertCell();
      // Button Panel
      //h1.className = o.style('ButtonPanel');
      h1.height = 1;
      o.onBuildButtons();
      RConsole.find(FKeyConsole).register(EKey.Esc, new TListener(o, o.onClose));
      var hTab = o.hDataForm = RBuilder.append(h2, "TABLE");
      hTab.style.tableLayout = "fixed";
      var h = o.FieldPanel = hTab.insertRow().insertCell();
      h.height = "400px";
      h.vAlign = 'top';
      //h.className = o.style('FieldPanel');
      var hDiv = o.hFieldForm = RBuilder.appendDiv(h);
//      hDiv.style.height = '300';
      hDiv.style.height = '100%';
      hDiv.width = '100%';
      hDiv.style.paddingTop   = '20';
      hDiv.style.paddingLeft   = '20';
      hDiv.style.overflow = 'auto';
   }
   return r;
}
// ------------------------------------------------------------
function FSearchWindow_onBuildButtons(){
   var o = this;
   // Button Panel
   var hBtnTab = RBuilder.appendTable(o.hButtonPanel, null, 0, 0, 6);
   var hRow = hBtnTab.insertRow();
   var hCel = hRow.insertCell();
   // Button - Search
   var b = o.btnSearch = RClass.create(FButton);
   b.icon = 'tool.search';
   b.label = RContext.get('FToolButton:search');
   b.width = '100%';
   b.lsnsClick.register(o, o.onSearch);
   b.psBuild(hRow.insertCell());
   // Button - Close
   var b = o.btnClose = RClass.create(FButton);
   b.icon = 'tool.exit';
   b.label = RContext.get('FToolButton:close');
   b.width = '100%';
   b.lsnsClick.register(o, o.onClose);
   b.psBuild(hRow.insertCell());
   // Button - Cancel
   var b = o.btnCancel = RClass.create(FButton);
   b.icon = 'tool.delete';
   b.label = RContext.get('FToolButton:clear');
   b.width = '100%';
   b.lsnsClick.register(o, o.onClear);
   b.psBuild(hRow.insertCell());
   // Button - Reset
   var b = o.btnReset = RClass.create(FButton);
   b.icon = 'tool.refresh';
   b.label = RContext.get('FToolButton:reset');
   b.width = '100%';
   b.lsnsClick.register(o, o.onReset);
   b.psBuild(hRow.insertCell());
   // End line
   var hCel = hRow.insertCell();
   hCel.innerHTML = '&nbsp;';
}
// ------------------------------------------------------------
function FSearchWindow_onSearch(){
   var o = this;
   var dc = o.dsControl;
   dc.dsSearchs.clear();
   dc.dsOrders.clear();
   var cs = o.searchControls;
   if(cs){
      for(var n=0; n<cs.count; n++){
         var c = cs.get(n);
         if(!RString.isEmpty(c.text())){
            var si = new TSearchItem();
            var oi = new TOrderItem();
            si.set(c.dataName, c.text(), c.searchType.reget());
            oi.set(c.dataName, c.searchOrder.reget());
            dc.dsSearchs.push(si);
            dc.dsOrders.push(oi);
         }
      }
      dc.dsSearch(true, false);
   }
   o.hide();
}
// ------------------------------------------------------------
function FSearchWindow_onClear(){
   var o = this;
   var cs = o.searchControls;
   if(cs){
      for(var n=0; n<cs.count; n++){
         cs.get(n).clearSearch();
      }
   }
}
// ------------------------------------------------------------
function FSearchWindow_onReset(){
   var o = this;
   var cs = o.searchControls;
   if(cs){
      for(var n=0; n<cs.count; n++){
         cs.get(n).resetSearch();
      }
   }
}
// ------------------------------------------------------------
function FSearchWindow_onClose(){
   this.hide();
}
// ------------------------------------------------------------
// control
function FSearchWindow_buildField(c){
   var o = this;
   var hCell = o.hFieldsTab.insertRow().insertCell();
   hCell.innerText = c.label;
   o.fieldsPanel = RControl.create(FPanel);
   o.fieldsPanel.build();
   o.fieldsPanel.setPanel(hCel);
}
// ------------------------------------------------------------
function FSearchWindow_linkDsControl(dc){
   var o = this;
   o.dsControl = dc;
   //o.hFieldPanel.style.border = "2px solid BLUE";
   var cs = dc.controls;
   if(cs){
      for(var n=0; n<cs.count; n++){
         var c = cs.value(n);
         if(c.dispSearch){
            var search = RClass.create(FSearchEdit);
            search.assign(c, EAssign.Property);
            search.labelType = ELabel.All;
            search.searchBox = o;
//            search.psBuild(o.hFieldPanel);
            search.psBuild(o.hFieldForm);
            search.psMode(EMode.Search);
            o.searchControls.push(search);
            o.push(search);
         }
      }
   }
}
// ------------------------------------------------------------
function FSearchWindow_show(){
   var o = this;
   o.base.FWindow.show.call(o);
   RWindow.setEnable(false, true);
   RWindow.moveCenter(o.hPanel);
   o.psVisible(true);
   o.psRefresh();
   o.focus();
}
// ------------------------------------------------------------
function FSearchWindow_hide(){
   var o = this;
   o.base.FWindow.hide.call(o);
   RWindow.setEnable(true);
}
// ------------------------------------------------------------
function FSearchWindow_dispose(){
   var o = this;
   o.base.FWindow.dispose.call(o);
   RMemory.freeHtml(o.hFieldsTab);
   RMemory.freeHtml(o.hFieldForm);
   o.hFieldsTab = null;
   o.hFieldForm = null;
}
// ------------------------------------------------------------
