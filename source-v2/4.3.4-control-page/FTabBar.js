// ============================================================
// FTabBar
// ============================================================
function FTabBar(o){
   o = RClass.inherits(this, o, FContainer);
   // Property
   o.left             = 20;
   o.width            = '100%';
   // Attribute
   o.sheets           = new TMap();
   o.selected         = null;
   // Html
   o.hTop             = null;
   o.hLine            = null;
   o.hBottom          = null;
   // Process
   o.oeBuild          = FTabBar_oeBuild;
   // Event
   o.onBuildPanel     = FTabBar_onBuildPanel;
   // Method
   o.appendChild      = FTabBar_appendChild;
   o.addClickListener = FTabBar_addClickListener;
   o.select           = FTabBar_select;
   o.push             = FTabBar_push;
   o.dispose          = FTabBar_dispose;
   return o;
}
// ------------------------------------------------------------
function FTabBar_oeBuild(event){
   var o = this;
   o.base.FContainer.oeBuild.call(o, event);
   if(event.isBefore()){
      // Top
      var h = o.hTop.insertCell();
      RBuilder.appendEmpty(h);
      h.width = 20;
      // Line
      var h = o.hLine.insertCell();
      //h.innerText = '-';
      // Bottom
      var h = RBuilder.append(o.hBottom, 'TD', this.style('Bottom'));
      RBuilder.appendEmpty(h);
   }else if(event.isAfter()){
      // Top
      RBuilder.append(o.hTop, 'TD', this.style('Top'));
      // Line
      h = RBuilder.append(o.hLine, 'TD');
      RBuilder.appendEmpty(h);
      // Top
      RBuilder.append(o.hBottom, 'TD', this.style('Bottom'));
      // Select first
      if(o.sheets.count){
         o.select(o.sheets.value(0));
      }
   }
}
// ------------------------------------------------------------
function FTabBar_appendChild(sheet){
   this.hTop.appendChild(sheet.hTopL);
   this.hTop.appendChild(sheet.hTop);
   this.hTop.appendChild(sheet.hTopR);
   this.hLine.appendChild(sheet.hLeft);
   this.hLine.appendChild(sheet.hPanel);
   this.hLine.appendChild(sheet.hRight);
   this.hBottom.appendChild(sheet.hBottomL);
   this.hBottom.appendChild(sheet.hBottom);
   this.hBottom.appendChild(sheet.hBottomR);
}
// ------------------------------------------------------------
function FTabBar_onBuildPanel(){
   var o = this;
   var h = o.hPanel = RBuilder.append(o.hParent, 'TABLE');
   h.border = 0;
   h.frame = 'box';
   h.cellPadding = 0;
   h.cellSpacing = 0;
   o.hTop = h.insertRow();
   o.hLine = h.insertRow();
   o.hBottom = h.insertRow();
}
// ------------------------------------------------------------
function FTabBar_addClickListener(){
   var btn = this.components.get(name);
   if(btn){
      btn.lsnsClick.push(new TListener(this, method));
   }
}
// ------------------------------------------------------------
function FTabBar_select(sheet){
   this.selected = sheet;
   for(var n=0; n<this.sheets.count; n++){
      var o = this.sheets.value(n);
      o.select(sheet == o);
   }
}
// ------------------------------------------------------------
function FTabBar_selectPage(idx, force){
   this.activeIndex = idx;
   var oPage = null;
   if(!force){
      for(var n=0; n<this.items.length; n++){
         if(this.items[n].name == this.activePageName){
            oPage = this.items[n];
            this.activePageName = oPage.name;
            this.activeIndex = n;
            break;
         }
      }
      if(!oPage){
         oPage = this.items[this.activeIndex];
         this.activePageName = oPage.name;
      }
   }
   if(oPage){
      this.activePage = oPage;
   }else{
      oPage = this.activePage;
   }
   if(oPage){
      this.clear();
      this.refresh();
      oPage = this.items[this.activeIndex];
      this.activePageName = oPage.name;
      if(this.onSheetClick){
         this.onSheetClick(oPage);
      }
   }
   return oPage;
}
// ------------------------------------------------------------
function FTabBar_push(o){
   this.base.FContainer.push.call(this, o);
   if(RClass.isClass(o, FTabButton)){
      o.tabBar = this;
      o.index = this.sheets.count;
      this.sheets.set(o.name, o);
   }
}
// ------------------------------------------------------------
function FTabBar_dispose(){
   var o = this;
   o.base.FContainer.dispose.call();
   RMemory.freeHtml(o.hTop);
   RMemory.freeHtml(o.hLine);
   RMemory.freeHtml(o.hBottom);
   o.hTop = null;
   o.hLine = null;
   o.hBottom = null;
}
