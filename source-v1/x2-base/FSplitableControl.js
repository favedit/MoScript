// ============================================================
// FSplitableControl
// ============================================================
function FSplitableControl(){
   IObject.extendClass(this, FControl);
   this.className = 'FSplitableControl';
   // Html
   this.htmlSplit = null;
   // Method
   this.buildSplit = ctb_sbc_buildSplit;
   this.appendSplit = ctb_sbc_appendSplit;
   this.dispose = ctb_sbc_dispose;
   return this;
}
// ------------------------------------------------------------
function ctb_sbc_buildSplit(){
   this.htmlSplit = this.createElement('TABLE');
   this.htmlSplit.width = '100%';
   this.htmlSplit.height = '100%';
   this.htmlSplit.border = 0;
   this.htmlSplit.cellSpacing = 0;
   this.htmlSplit.cellPadding = 0;
   this.htmlParent.appendChild(this.htmlSplit);
}
// ------------------------------------------------------------
function ctb_sbc_appendSplit(oPanel){
   var oCell = this.htmlSplit.insertRow().insertCell();
   oCell.appendChild(oPanel);
   return oCell;
}
// ------------------------------------------------------------
function ctb_sbc_dispose(){
   var o = this;
   o.base.FControl.dispose.call(o);
   RMemory.freeHtml(o.htmlSplit);
   RMemory.freeHtml(o.htmlParent);
   o.htmlSplit = null;
   o.htmlParent = null;
}
