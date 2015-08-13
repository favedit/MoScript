// ============================================================
// FDuiCalendar
// ============================================================
MO.FDuiCalendar = function FDuiCalendar(o){
   o = MO.Class.inherits(this, o, MO.FEditControl, MO.MEditBorder, MO.MDropable, MO.MDescCalendar);
   //..........................................................
   // @property
   o.editFormat  = MO.Lang.Date.DisplayFormat;
   o.editHour     = MO.Class.register(o, new MO.TPtyBoolSet('editHour', 'editDate', MO.EDateTimeMode.Hour));
   o.editMinute   = MO.Class.register(o, new MO.TPtyBoolSet('editMinute', 'editDate', MO.EDateTimeMode.Minute));
   o.editSecond   = MO.Class.register(o, new MO.TPtyBoolSet('editSecond', 'editDate', MO.EDateTimeMode.Second));
   //..........................................................
   // @attribute
   o.borderStyle = MO.EUiBorder.RoundDrop;
   o.date        = null;
   o.lsnEditEnd  = null;
   //..........................................................
   // @html
   o.hForm       = null;
   o.hDrop       = null;
   o.hForm       = null;
   //..........................................................
   // @event
   o.onKeyPress  = MO.FDuiCalendar_onKeyPress;
   o.onDataClick   = MO.FDuiCalendar_onDataClick;
   o.refreshStyle  = MO.FDuiCalendar_refreshStyle;
   o.onEditEnd   = MO.FDuiCalendar_onEditEnd;
   o.onBuildEdit = MO.FDuiCalendar_onBuildEdit;
   //..........................................................
   // method
   o.construct   = MO.FDuiCalendar_construct;
   o.formatValue = MO.FDuiCalendar_formatValue;
   o.formatText  = MO.FDuiCalendar_formatText;
   o.drop        = MO.FDuiCalendar_drop;
   o.doBlur      = MO.FDuiCalendar_doBlur;
   return o;
}

//==========================================================
//<T>数据区域鼠标双击事件。</T>
//
//@method
//@param e:event:TEvent 事件对象
//==========================================================
MO.FDuiCalendar_onDataClick = function FDuiCalendar_onDataClick(){
   var o = this;
   // 展开下拉菜单
   if(!o.editCheck){
      o.drop();
   }
}

// ------------------------------------------------------------
MO.FDuiCalendar_onBuildEdit = function FDuiCalendar_onBuildEdit(b){
   var o = this;
   // 建立编辑控件
   var htb = MO.Window.Builder.appendTable(b.hPanel);
    htb.style.tableLayout = 'fixed';
    var hr = o.hEdit = htb.insertRow();
   // 建立修改标志
   o.onBuildChange(hr.insertCell())
   // 建立编辑控件
   var hc = hr.insertCell();
   var h = o.hEdit = MO.Window.Builder.appendEdit(hc, o.style('Edit'));
   h.style.disabled = 'true';
   // 设置可以输入的最大长度
   if(o.editLength){
      h.maxLength = o.editLength;
   }
}
// ------------------------------------------------------------
MO.FDuiCalendar_onEditEnd = function FDuiCalendar_onEditEnd(e){
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
MO.FDuiCalendar_onKeyPress = function FDuiCalendar_onKeyPress(e){
   if(!MO.Lang.String.inChars(String.fromCharCode(e.keyCode), MO.Lang.Date.Chars)){
      RKey.eventClear(e);
   }
}

//==========================================================
// <T>构建对象。</T>
//
// @method
//==========================================================
MO.FDuiCalendar_construct = function FDuiCalendar_construct(){
   var o = this;
   o.base.FEditControl.construct.call(o);
   o.date = new TDate();
   o.lsnEditEnd = new TListener(o, o.onEditEnd);
}

// ------------------------------------------------------------
// text
MO.FDuiCalendar_formatValue = function FDuiCalendar_formatValue(t){
   if(t){
      var o = this;
      if(t.toLowerCase() == '@now'){
         o.date.now();
         return MO.Lang.Date.formatDate(o.date);
      }else{
         MO.Lang.Date.autoParse(o.date, t);      
         return MO.Lang.Date.formatDate(o.date);
      }
   }
   return MO.Lang.String.nvl(t);
}
// ------------------------------------------------------------
MO.FDuiCalendar_formatText = function FDuiCalendar_formatText(value){
   if(value){
      var o = this;
      MO.Lang.Date.autoParse(o.date, value);
      return MO.Lang.Date.formatDate(o.date, o.editFormat);
   }
   return MO.Lang.String.nvl(value);
}

//==========================================================
//<T>设置编辑样式。</T>
//
//@method
//==========================================================
MO.FDuiCalendar_refreshStyle = function FDuiCalendar_refreshStyle(){
   var o = this;
   o.base.FEditControl.refreshStyle.call(o);
   //o.hDrop.src = o.styleIconPath(o.isEditHover(t) ? 'DropSelect' : 'Drop');
   if(!o.editCheck){
	  //o.hEdit.style.cursor = 'hand';
      o.hEdit.readOnly = 'true';
   }
}

// ------------------------------------------------------------
MO.FDuiCalendar_drop = function FDuiCalendar_drop(){
   var o = this;
   if(o.canDrop() && o._editable){
      var e = o.editor = RConsole.find(FEditConsole).focus(o, FDuiCalendarEditor, o.name);
      e.set(o.reget(), o.editFormat);
      e.setHourEditable(o.editHour);
      e.setMinuteEditable(o.editMinute);
      e.setSecondEditable(o.editSecond);
      e.lsnEditEnd = o.lsnEditEnd;
      e.show();
   }
}
// ------------------------------------------------------------
MO.FDuiCalendar_doBlur = function FDuiCalendar_doBlur(){
   var o = this;
   o.base.FEditControl.doBlur.call(o);
   if(o.editor){
      o.editor.hide();
   }
}
