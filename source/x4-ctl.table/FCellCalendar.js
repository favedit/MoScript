//==========================================================
// 单元格内Edit控件类
//
// @class FCellCalendar
// @author maochunyang
// @version 1.0.1
//==========================================================
function FCellCalendar(o){
   o = RClass.inherits(this, o, FCellEditControl, MFocus, MCellDropable);
   //..........................................................
   // @css
   o.stForm           = RClass.register(o, new TStyle('Form'));
   o.stEditForm       = RClass.register(o, new TStyle('EditForm'));
   o.stDrop           = RClass.register(o, new TStyle('Drop'));
   o.stPanelInvalid   = RClass.register(o, new TStyle('PanelInvalid'));
   o.stEditInvalid    = RClass.register(o, new TStyle('EditInvalid'));
   o.stIconDrop       = RClass.register(o, new TStyleIcon('Drop'));
   //..........................................................
   // @attribute
   o.lsnCellEditEnd   = null;
   o.lsnSearchEditEnd = null;
   //..........................................................
   // @html
   o.hForm            = null;
   o.hEditForm        = null;
   o.hEdit            = null;
   o.hDrop            = null;
   //..........................................................
   // @event
   o.onDataEditBegin  = RMethod.emptyCall;
   o.onDataEditEnd    = RMethod.emptyCall;
   //..........................................................
   // @method
   o.buildDrop        = FCellCalendar_buildDrop;
   o.buildEdit        = FCellCalendar_buildEdit;
   o.validText        = FCellCalendar_validText;
   o.drop             = FCellCalendar_drop;
   o.dispose          = FCellCalendar_dispose;
   return o;
}

//==========================================================
// <T>在单元格内下拉区创建下拉框。</T>
//
// @method
//==========================================================
function FCellCalendar_buildDrop(){
   var o = this;
   var c = o.column;
   o.hDropPanel.width = 1;
   var hi = o.hDrop = RBuilder.appendIcon(o.hDropPanel, o.styleIcon('Drop'), o.style('Drop'));
   c.linkEvent(o, 'onCellDropClick', hi);
}

//==========================================================
//<T>在单元格内下拉区创建下拉框。</T>
//
//@method
//==========================================================
function FCellCalendar_buildEdit(){
	   var o = this;
	   var c = o.column;
	   if(c._absEdit){
	      o.base.FCellEditControl.buildEdit.call(o);
	   }else{
	      var he = o.hEditPanel;
	      c.linkEvent(o, 'onCellMouseDown', he, c.onCellMouseDown);
	      c.linkEvent(o, 'onCellClick', he, c.onCellClick);
	      c.linkEvent(o, 'onCellDoubleClick', he, c.onCellDoubleClick);
	   }
	}

//==========================================================
// 校验内容
//
// @method
// @param t:text:String 需校验的值
//==========================================================
function FCellCalendar_validText(t){
   return true;
}
// ------------------------------------------------------------
function FCellCalendar_drop(){
   var o = this;
   var d = o.descriptor();
   var c = o.column;
   // 检查是否可以编辑和是否可以下拉
   if(!d.isEditAble(o.row)){
      return;
   }
   // 展开下拉菜单
   var e = RConsole.find(FEditConsole).focus(o, FCalendarEditor, d.name);
   e.set(o.dataValue, d.editFormat);
   e.lsnEditEnd = d.lsnCellEditEnd;
   e.setHourEditable(c.editHour);
   e.setMinuteEditable(c.editMinute);
   e.setSecondEditable(c.editSecond);
   e.show();
}

//==========================================================
// 校验内容
//
// @method
// @param t:text:String 需校验的值
//==========================================================
function FCellCalendar_dispose(){
   var o = this;
   o.base.FCellEditControl.dispose.call(o);
   o.hDropPanel = null;
   o.hFormLine = null;
   o.hEdit = null;
}
