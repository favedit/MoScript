/**************************************************************
 * 表格列表类，
 * 模板:
 *  hPanel<TABLE>
 * ┌-------------------------------------------------------┐
 * │                                         hHeadPanel<TD>│
 * │ hHeadForm<TABLE>                                      │
 * │┌---------------------------------------------------┐│
 * ││hHeadLine<TR>                                      ││
 * │├---------------------------------------------------┤│
 * ││hSearchLine<TR>                                    ││
 * │└---------------------------------------------------┘│
 * ├-------------------------------------------------------┤
 * │                                         hRowPanel<DIV>│
 * │ hRowForm<TABLE>                                       │
 * │┌---------------------------------------------------┐│
 * │└---------------------------------------------------┘│
 * ├-------------------------------------------------------┤
 * │                                          hNavPanel<TD>│
 * │ hNavForm<TABLE>                                       │
 * │┌---------------------------------------------------┐│
 * │└---------------------------------------------------┘│
 * └-------------------------------------------------------┘
 *
 * @class FContainer
 * @author maochunyang
 * @version 1.0.1
 **************************************************************/
function FPageBar(o){
   o = RClass.inherits(this, o, FContainer);
   // Attribute
   o.tabs         = new TMap();
   o.selected     = null;
   // Html
   o.hTop         = null;
   o.hLine        = null;
   o.hBottom      = null;
   o.hSheets      = null;
   // Process
   o.oeBuild      = FPageBar_oeBuild;
   // Event
   o.onBuildPanel = FPageBar_onBuildPanel;
   // Method
   o.select       = FPageBar_select;
   o.tab          = FPageBar_tab;
   o.push         = FPageBar_push;
   o.dispose      = FPageBar_dispose;
   return o;
}
// ------------------------------------------------------------
function FPageBar_oeBuild(e){
   var o = this;
   o.base.FContainer.oeBuild.call(o, e);
   if(e.isBefore()){
      o.hRows = RBuilder.append(o.hPanel, 'TBODY');
      o.hRow = RBuilder.append(o.hRows, 'TR');
   }else if(e.isAfter()){
      var ts = o.tabs;
      for(var n=0; n<ts.count; n++){
         o.hRow.appendChild(ts.value(n).hPanel);
      }
   }
}
// ------------------------------------------------------------
function FPageBar_onBuildPanel(){
   this.hPanel = RBuilder.newTable();
}
// ------------------------------------------------------------
function FPageBar_select(sheet){
   this.selected = sheet;
   for(var n=0; n<this.tabs.count; n++){
      var o = this.tabs.value(n);
      o.select(sheet == o);
   }
   sheet.psRefresh();
}
// ------------------------------------------------------------
function FPageBar_tab(name){
   return this.sheets.get(name);
}
// ------------------------------------------------------------
function FPageBar_push(c){
   var o = this;
   o.base.FContainer.push.call(o, c);
   if(RClass.isClass(c, FPageTab)){
      c.pageBar = o;
      c.index = o.tabs.count;
      o.tabs.set(c.name, c);
   }
}
// ------------------------------------------------------------
function FPageBar_dispose(){
   var o = this;
   o.base.FContainer.dispose.call(o);
   RMemory.freeHtml(o.hPanel);
   RMemory.freeHtml(o.hRow);
   o.hRow = null;
   o.hPanel = null;
}