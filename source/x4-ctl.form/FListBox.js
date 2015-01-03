/**************************************************************
 * 列表控件
 *
 * @class FPanel, MHorizontal
 * @author maochunyang
 * @version 1.0.1
 **************************************************************/
function FListBox(o){
   o = RClass.inherits(this, o, FPanel, MHorizontal);
   // Listener
   o.lsnsClick  = new TListeners();
   // Method
   o.appendLine = FListBox_appendLine;
   o.dispose    = FListBox_dispose;
   return o;
}
// ------------------------------------------------------------
function FListBox_appendLine(){
   var o = this;
   var h = null;
   if(EMode.Design == o._emode){
      h = this.hPanelTable = RBuilder.appendTable(this.hContainer, null, 10, 10, 10);
      h.style.border = '1 solid red';
      this.hPanelLine = this.hPanelTable.insertRow();
   }else{
      o.hPanelTable = null;
      o.hPanelLine = null;
   }
   return h;
}
// ------------------------------------------------------------
// ------------------------------------------------------------
function FListBox_dispose(){
   var o = this;
   o.base.FPanel.dispose.call(o);
   RMemory.freeHtml(o.hPanelTable);
   RMemory.freeHtml(o.hPanelLine);
   o.hPanelTable = null;
   o.hPanelLine = null;
}
// ------------------------------------------------------------
