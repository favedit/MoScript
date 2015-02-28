// ============================================================
// FUiCalendar
// ============================================================
function FUiCalendar(o){
   o = RClass.inherits(this, o, FEditControl, MEditBorder, MDropable, MDescCalendar);
   //..........................................................
   // @property
   o.editFormat  = RDate.DisplayFormat;
   o.editHour     = RClass.register(o, new TPtyBoolSet('editHour', 'editDate', EDateTimeMode.Hour));
   o.editMinute   = RClass.register(o, new TPtyBoolSet('editMinute', 'editDate', EDateTimeMode.Minute));
   o.editSecond   = RClass.register(o, new TPtyBoolSet('editSecond', 'editDate', EDateTimeMode.Second));
   //..........................................................
   // @attribute
   o.borderStyle = EUiBorder.RoundDrop;
   o.date        = null;
   o.lsnEditEnd  = null;
   //..........................................................
   // @html
   o.hForm       = null;
   o.hDrop       = null;
   o.hForm       = null;
   //..........................................................
   // @event
   o.onKeyPress  = FUiCalendar_onKeyPress;
   o.onDataClick   = FUiCalendar_onDataClick;
   o.refreshStyle  = FUiCalendar_refreshStyle;
   o.onEditEnd   = FUiCalendar_onEditEnd;
   o.onBuildEdit = FUiCalendar_onBuildEdit;
   //..........................................................
   // method
   o.construct   = FUiCalendar_construct;
   o.formatValue = FUiCalendar_formatValue;
   o.formatText  = FUiCalendar_formatText;
   o.drop        = FUiCalendar_drop;
   o.doBlur      = FUiCalendar_doBlur;
   return o;
}

//==========================================================
//<T>数据区域鼠标双击事件。</T>
//
//@method
//@param e:event:TEvent 事件对象
//==========================================================
function FUiCalendar_onDataClick(){
   var o = this;
   // 展开下拉菜单
   if(!o.editCheck){
      o.drop();
   }
}

// ------------------------------------------------------------
function FUiCalendar_onBuildEdit(b){
   var o = this;
   // 建立编辑控件
   var htb = RBuilder.appendTable(b.hPanel);
    htb.style.tableLayout = 'fixed';
    var hr = o.hEdit = htb.insertRow();
   // 建立修改标志
   o.onBuildChange(hr.insertCell())
   // 建立编辑控件
   var hc = hr.insertCell();
   var h = o.hEdit = RBuilder.appendEdit(hc, o.style('Edit'));
   h.style.disabled = 'true';
   // 设置可以输入的最大长度
   if(o.editLength){
      h.maxLength = o.editLength;
   }
}
// ------------------------------------------------------------
function FUiCalendar_onEditEnd(e){
   var o = this;
   if(e){
      o.set(e.get());
      // 重新校验数据
      o._invalidText = o.validText(o.text());
      o.refreshStyle();
   }
   o.onDataEditEnd(o);
}
// ------------------------------------------------------------
function FUiCalendar_onKeyPress(e){
   if(!RString.inChars(String.fromCharCode(e.keyCode), RDate.Chars)){
      RKey.eventClear(e);
   }
}

//==========================================================
// <T>构建对象。</T>
//
// @method
//==========================================================
function FUiCalendar_construct(){
   var o = this;
   o.base.FEditControl.construct.call(o);
   o.date = new TDate();
   o.lsnEditEnd = new TListener(o, o.onEditEnd);
}

// ------------------------------------------------------------
// text
function FUiCalendar_formatValue(t){
   if(t){
      var o = this;
      if(t.toLowerCase() == '@now'){
         o.date.now();
         return RDate.formatDate(o.date);
      }else{
         RDate.autoParse(o.date, t);      
         return RDate.formatDate(o.date);
      }
   }
   return RString.nvl(t);
}
// ------------------------------------------------------------
function FUiCalendar_formatText(value){
   if(value){
      var o = this;
      RDate.autoParse(o.date, value);
      return RDate.formatDate(o.date, o.editFormat);
   }
   return RString.nvl(value);
}

//==========================================================
//<T>设置编辑样式。</T>
//
//@method
//==========================================================
function FUiCalendar_refreshStyle(){
   var o = this;
   o.base.FEditControl.refreshStyle.call(o);
   //o.hDrop.src = o.styleIconPath(o.isEditHover(t) ? 'DropSelect' : 'Drop');
   if(!o.editCheck){
	  //o.hEdit.style.cursor = 'hand';
      o.hEdit.readOnly = 'true';
   }
}

// ------------------------------------------------------------
function FUiCalendar_drop(){
   var o = this;
   if(o.canDrop() && o._editable){
      var e = o.editor = RConsole.find(FEditConsole).focus(o, FUiCalendarEditor, o.name);
      e.set(o.reget(), o.editFormat);
      e.setHourEditable(o.editHour);
      e.setMinuteEditable(o.editMinute);
      e.setSecondEditable(o.editSecond);
      e.lsnEditEnd = o.lsnEditEnd;
      e.show();
   }
}
// ------------------------------------------------------------
function FUiCalendar_doBlur(){
   var o = this;
   o.base.FEditControl.doBlur.call(o);
   if(o.editor){
      o.editor.hide();
   }
}
