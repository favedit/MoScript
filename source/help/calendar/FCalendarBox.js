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
function FCalendarBox(o){
   o = RClass.inherits(this, o, FContainer);
   // Attribute
   o._days        = new TList();
   o._year        = 0;
   o._month       = 0;
   // Process
   o.oeBuild      = FCalendarBox_oeBuild;
   // Event
   o.onBuildPanel = FCalendarBox_onBuildPanel;
   // Method
   o.selectMonth  = FCalendarBox_selectMonth;
   o.refreshDays  = FCalendarBox_refreshDays;
   return o;
}
// ---------------------------------------------------------
function FCalendarBox_oeBuild(e){
   var o = this;
   o.base.FContainer.oeBuild.call(o, e);
   var hp = o.hPanel;
   //
   var b = o.border = new TBorder(EBorder.Round);
   b.hParent = hp;
   RBorder.build(b);
   var bp = o.hBorderPanel = b.hPanel;
   bp.style.backgroundColor = '#C3D9FF';
   var hdp = o.hDaysPanel = RBuilder.appendDiv(bp);
   //
   var hdf = o.hDaysForm = RBuilder.appendTable(hdp, null, 1);
   hdf.cellPadding = 0;
   hdf.width = '100%';
   hdf.style.backgroundColor = '#C3D9FF';
   hdf.frame = 'rhs';
   hdf.style.tableLayout = 'fixed';
   hdf.borderColorLight = '#C3D9FF';
   hdf.borderColorDark = '#FFFFFF';
   //
   var weekDays = RContext.get('FCalendarEditor:weekdays').split(',');
   var hr = hdf.insertRow();
   for(var i=0; i<7; i++){
      var hc = hr.insertCell();
      hc.width = (100/7) + '%';
      hc.style.padding = 3;
      hc.align = 'center';
      hc.innerText = weekDays[i];
      hc.style.color = '#002088';
      hc.style.backgroundColor = '#D7E0FF';
   }
   //
   for(var j=0; j<6; j++){
      var hr = hdf.insertRow();
      for(var i=0; i<7; i++){
         var hc = hr.insertCell();
         hc.style.backgroundColor = '#FFFFFF';
         var cd = RControl.create(FCalendarDay);
         cd.setPanel(hc);
         o._days.push(cd);
      }
   }
   return EEventStatus.Stop;
}
// ---------------------------------------------------------
function FCalendarBox_onBuildPanel(){
   this.hPanel = RBuilder.newDiv();
}
// ---------------------------------------------------------
function FCalendarBox_selectMonth(y, m){
   var o = this;
   o._year = y;
   o._month = m;
   o.refreshDays();
}
// ---------------------------------------------------------
function FCalendarBox_refreshDays(){
   var o = this;
   var d = RDate.make(o._year, o._month-1, 1);
   // Set day
   var monthWeekDay = d.monthWeekDay();
   var monthDays = d.monthDays();
   var weekDay = monthWeekDay;
   var selDay = 1;

   var count = o._days.count;
   for(var n=0; n<count; n++){
      var d = o._days.get(n);
      if(n<monthWeekDay){
         d.setValid(false);
      }else if(n < monthDays+monthWeekDay){
         if(weekDay == 7){
            weekDay = 0;
         }
         var day = n-monthWeekDay+1;
         if(day == selDay){
            //h.className = o.style('DaySel');
            //h.isCurrent = true;
         }else{
            //h.isFree = (weekDay==0 || weekDay==6);
            //h.className = h.isFree ? o.style('DayFree') : o.style('Day');
            //h.isCurrent = false;
         }
         //h.innerText = day;
         d.hTitle.innerText = day;
         weekDay++;
      }else{
         d.setValid(false);
      }
   }
}
// ---------------------------------------------------------
