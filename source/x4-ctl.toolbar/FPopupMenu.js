// ============================================================
// FPopupMenu
// ============================================================
function FPopupMenu(o){
   o = RClass.inherits(this, o, FContainer, MFocus, MShadow);
   /// @style
   o.styleLabel   = RClass.register(o, new TStyle('Label'));
   o.styleButton  = RClass.register(o, new TStyle('Button'));
   // Attribute
   o.opener       = null;
   // Html
   o.hContainer   = null;
   o.hLabel       = null;
   o.hButtonPanel = null;
   o.hIcon        = null;
   o.hText        = null;
   // Process Event
   o.oeBuild      = FPopupMenu_oeBuild;
   // Event
   o.onBuildPanel = FPopupMenu_onBuildPanel;
   o.doBlur       = FPopupMenu_doBlur;
   // Method
   o.appendChild  = FPopupMenu_appendChild;
   o.show         = FPopupMenu_show;
   o.setVisible   = FPopupMenu_setVisible;
   o.testInRange  = FPopupMenu_testInRange;
   o.dispose      = FPopupMenu_dispose;
   return o;
}
// ------------------------------------------------------------
function FPopupMenu_oeBuild(e){
   var o = this;
   o.base.FContainer.oeBuild.call(o, e);
   if(e.isBefore()){
      var t = o.parent;
      var h = o.hPanel;
      var hlf = o.hLayout = RBuilder.appendTable(o.hPanel);
      hlf.style.tableLayout = 'fixed';
      hlf.border = 1;
      var hc = hlf.insertRow().insertCell();
      //
      var hd = o.hLayoutPanel = RBuilder.append(hc, 'DIV')
      hd.style.width = '100%';
      hd.style.height = '100%';
      //
      o.hContainer = RBuilder.appendTable(hd);
      // Insert first
      var h = o.hLabel = o.hContainer.insertRow().insertCell();
      h.className = o.style('Label');
      RBuilder.appendEmpty(h);
   }else if(e.isAfter()){
      // Insert buttom
      o.hLastRow = o.hContainer.insertRow();
      var h = o.hLastRow.insertCell();
      RBuilder.appendEmpty(h, 1, 4);
      o.setVisible(false);
   }
   return EEventStatus.Continue;
}
// ------------------------------------------------------------
function FPopupMenu_onBuildPanel(){
   this.hPanel = RBuilder.append(null, 'SPAN');
}
// ------------------------------------------------------------
function FPopupMenu_doBlur(){
   var o = this;
   if(o.opener){
      o.opener.onBlur();
   }else{
      o.hide();
   }
}
// ------------------------------------------------------------
function FPopupMenu_appendChild(ctl){
   var o = this;
   var h = o.hLabel = o.hContainer.insertRow().insertCell();
   h.className = o.style('Button');
   h.appendChild(ctl.hPanel);
}
// ------------------------------------------------------------
function FPopupMenu_show(h, pos, v){
   var o = this;
   o.setVisible(true);
   // ÐÞÕý³ß´ç
   var cw = o.hContainer.offsetWidth;
   var ch = o.hContainer.offsetHeight;
   var hls = o.hLayout.style;
   if(ch > 300){
      o.hLayoutPanel.style.overflowY = 'scroll';
      hls.pixelHeight = 300;
      hls.pixelWidth = cw + 20;
      //alert(o.hLayout.offsetWidth + '-' + o.hLayout.offsetHeight);
   }else{
      hls.pixelHeight = ch;
      hls.pixelWidth = cw + 4;
   }
   // Calc Position
   var r = RHtml.rect(h);
   if(EAlign.BottomRight == pos){
      var tr = this.calcRect();
      r.left = r.right - tr.width() + 1;
      r.bottom += 1;
   }
   o.setBounds(r.left, r.bottom);
   o.hPanel.style.zIndex = RLayer.next();
   // Show shadow
   o.focus();
}
// ------------------------------------------------------------
function FPopupMenu_setVisible(v){
   var o = this;
   o.base.FContainer.setVisible.call(o, v);
   o.base.MShadow.setVisible.call(o, v);
}
// ------------------------------------------------------------
function FPopupMenu_testInRange(e){
   return this == RControl.htmlControl(e.srcElement, FPopupMenu);
}
// ------------------------------------------------------------
function FPopupMenu_dispose(e){
   var o = this;
   o.base.FContainer.dispose.call(o);
   RMemory.freeHtml(o.hContainer);
   RMemory.freeHtml(o.hPanel);
   RMemory.freeHtml(o.hLabel);
   RMemory.freeHtml(o.hLastRow);
   o.hContainer = null;
   o.hPanel = null;
   o.hLabel = null;
   o.hLastRow = null;
}
// ------------------------------------------------------------
