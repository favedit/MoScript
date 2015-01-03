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
function FCalendarDay(o){
   o = RClass.inherits(this, o, FControl);
   // Attribute
   o.tabs         = new TMap();
   o.selected     = null;
   // Process
   o.oeBuild      = FCalendarDay_oeBuild;
   // Event
   o.onBuildPanel = FCalendarDay_onBuildPanel;
   // Method
   o.setValid     = FCalendarDay_setValid;
   return o;
}
// ------------------------------------------------------------
function FCalendarDay_oeBuild(e){
   var o = this;
   o.base.FControl.oeBuild.call(o, e);
   var hp = o.hPanel;
   hp.border = 0;
   hp.width = '100%';
   //
   var ht = o.hTitle = hp.insertRow().insertCell();
   ht.style.color = '#002088';
   ht.style.backgroundColor = '#E8EEF7';
   ht.style.paddingRight = 6;
   ht.style.fontFamily = 'Arial, Helvetica'
   ht.align = 'right';
   //
   var heb = o.hEventBorder = hp.insertRow().insertCell();
   heb.style.padding = 3;
   var eb = o.eventBorder = new TBorder(EBorder.Round);
   eb.hParent = heb;
   RBorder.build(eb);
   eb.hTopLine.className = 'FCalendarDay_BorderTop';
   eb.hBeforeLine.className = 'FCalendarDay_BorderBefore';
   eb.hFormLine.className = 'FCalendarDay_BorderPanel';
   eb.hAfterLine.className = 'FCalendarDay_BorderAfter';
   eb.hBottomLine.className = 'FCalendarDay_BorderBottom';
   var hep = o.hEventPanel = eb.hPanel;
   hep.style.backgroundColor = '#FFFFFF';

   hep.innerHTML = '&nbsp;';
   //
   var hm = o.hMemo = hp.insertRow().insertCell();
   hm.vAlign = 'top';
   hm.height = 40;
   return EEventStatus.Stop;
}
// ------------------------------------------------------------
function FCalendarDay_onBuildPanel(){
   this.hPanel = RBuilder.newTable();
}
// ------------------------------------------------------------
function FCalendarDay_setValid(v){
   var o = this;
   if(v){
   }else{
      o.hTitle.style.backgroundColor = '#EEEEEE';
      o.hTitle.innerText = '.';
      o.hEventPanel.innerText = ' ';
      o.hMemo.innerText = '';
   }
}
