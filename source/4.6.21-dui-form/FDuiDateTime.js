//==========================================================
// <T>日期选取控件。</T>
//
// @class FDuiEditControl, MEditBorder, MDuiDropable
// @history 091124 MAOCY 创建
//==========================================================
MO.FDuiDateTime = function FDuiDateTime(o){
   o = MO.Class.inherits(this, o, MO.FDuiEditControl, MO.MDuiDropable);
   //..........................................................
   // @property
   o.editDispMode = MO.Class.register(o, new MO.APtySet('editDisplay', 'editDate', MO.EDateTimeMode.Display));
   o.editYear     = MO.Class.register(o, new MO.APtySet('editYear', 'editDate', MO.EDateTimeMode.Year));
   o.editMonth    = MO.Class.register(o, new MO.APtySet('editMonth', 'editDate', MO.EDateTimeMode.Month));
   o.editDay      = MO.Class.register(o, new MO.APtySet('editDay', 'editDate', MO.EDateTimeMode.Day));
   // @attribute
   o._date        = null;
   o.borderStyle  = MO.EUiBorder.RoundDrop;
   //..........................................................
   // @listener
   o.lsnEditEnd   = null;
   //..........................................................
   // @html
   o.hYearPanel   = null;
   o.hYear        = null;
   o.hMonthPanel  = null;
   o.hMonth       = null;
   o.hDayPanel    = null;
   o.hDay         = null;
   //..........................................................
   // @event
   o.onKeyPress   = MO.FDuiDateTime_onKeyPress;
   o.onEditEnd    = MO.FDuiDateTime_onEditEnd;
   o.onBuildEdit  = MO.FDuiDateTime_onBuildEdit;
   //..........................................................
   // @process
   o.oeSaveValue  = MO.FDuiDateTime_oeSaveValue;
   //..........................................................
   // @method
   o.construct    = MO.FDuiDateTime_construct;
   o.formatValue  = MO.FDuiDateTime_formatValue;
   o.text         = MO.FDuiDateTime_text;
   o.setText      = MO.FDuiDateTime_setText;
   o.validText    = MO.FDuiDateTime_validText;
   o.setEditable  = MO.FDuiDateTime_setEditable;
   o.refreshStyle = MO.FDuiDateTime_refreshStyle;
   o.drop         = MO.FDuiDateTime_drop;
   o.dispose      = MO.FDuiDateTime_dispose;
   return o;
}

//==========================================================
// <T>键盘按键事件。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
MO.FDuiDateTime_onKeyPress = function FDuiDateTime_onKeyPress(e){
   if(!MO.Lang.String.inChars(String.fromCharCode(e.keyCode), MO.Lang.Date.Chars)){
      MO.RKey.eventClear(e);
   }
}

//==========================================================
// <T>编辑完成事件。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
MO.FDuiDateTime_onEditEnd = function FDuiDateTime_onEditEnd(e){
   var o = this;
   if(e){
      o.set(e.get());
   }
   o.onDataEditEnd(o);
}

//==========================================================
// <T>建立编辑框事件。</T>
//
// @method
//==========================================================
MO.FDuiDateTime_onBuildEdit = function FDuiDateTime_onBuildEdit(b){
   var o = this;
   // 建立编辑控件
   var htb = MO.Window.Builder.appendTable(b.hPanel);
   htb.width = '100%';
   htb.style.tableLayout = 'fixed';
   var hr = o.hEdit = htb.insertRow();
   // 建立修改标志
   o.onBuildChange(hr.insertCell())
   // 建立小时编辑框
   var hc = oonDateDoubleClickPanel = hr.insertCell();
   hc.width = '40%';
   hc.style.padding = '0 1';
   var he = o.hYear = MO.Window.Builder.appendEdit(hc);
   he.maxLength = 4;
   he.style.border = 0;
   he.style.width = '100%';
   he.style.textAlign = 'right';
   // 建立年和月的分割符
   var hc = o.hYearSplit = hr.insertCell();
   hc.width = 5;
   hc.innerText = '-';
   o.hYear.style.display = o.editYear?'block':'none'
   o.hYearSplit.style.display = o.editYear?'block':'none'

   // 建立分钟编辑框
   var hc = o.hMonthPanel = hr.insertCell();
   hc.width = '20%';
   hc.style.padding = '0 1';
   var he = o.hMonth = MO.Window.Builder.appendEdit(hc);
   he.maxLength = 2;
   he.style.border = 0;
   he.style.width = '100%';
   he.style.textAlign = 'right';
   // 建立月和日的分割符
   var hc = o.hMonthSplit = hr.insertCell();
   hc.width = 5;
   hc.innerText = '-';
   o.hMonth.style.display = o.editMonth?'block':'none';
   o.hMonthSplit.style.display = o.editDay?'block':'none';
   // 建立秒编辑框
   var hc = o.hDayPanel = hr.insertCell();
   hc.width = '20%';
   hc.style.padding = '0 1'
   var he = o.hDay = MO.Window.Builder.appendEdit(hc);
   he.maxLength = 2;
   he.style.border = 0;
   he.style.width = '100%';
   he.style.textAlign = 'right';
   o.hDay.style.display = o.editDay?'block':'none';
}

//==========================================================
// <T>数据存储处理。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
MO.FDuiDateTime_oeSaveValue = function FDuiDateTime_oeSaveValue(e){
   var o = this;
   // 设置数据内容
   var dn = MO.Lang.String.nvl(o.dataCode, o.dataName);
   if(!MO.Lang.String.isEmpty(dn)){
      var vs = e.values;
      var v = vs.get(dn);
      if(v){
         vs.set(dn, o.reget().substring(0, 8) + v.substring(8));
      }else{
         vs.set(dn, o.reget());
      }
   }
   return MO.EEventStatus.Stop;
}

//==========================================================
// <T>控件构建。</T>
//
// @method
//==========================================================
MO.FDuiDateTime_construct = function FDuiDateTime_construct(){
   var o = this;
   o.base.FDuiEditControl.construct.call(o);
   o._date = new MO.TDate();
   o.lsnEditEnd = new MO.TListener(o, o.onEditEnd);
}

//==========================================================
// <T>格式化文本内容为数据内容。</T>
//
// @method
// @param t:text:String 文本内容
//==========================================================
MO.FDuiDateTime_formatValue = function FDuiDateTime_formatValue(t){
   if(t){
      var o = this;
      if(t.toLowerCase() == '@now'){
         o._date.now();
         return MO.Lang.Date.formatDate(o._date);
      }else{
         MO.Lang.Date.autoParse(o._date, t);      
         return MO.Lang.Date.formatDate(o._date);
      }
   }
   return MO.Lang.String.nvl(t);
}

//==========================================================
// <T>获得文本内容。</T>
//
// @method
// @return String 文本内容
//==========================================================
MO.FDuiDateTime_text = function FDuiDateTime_text(){
   var o = this;
   o._date.setYear(o._date.year);
   o._date.setMonth(o._date.month);
   o._date.setDay(o._date.day);
   return MO.Lang.Date.formatDate(o._date);
}

//==========================================================
// <T>设置文本内容。</T>
//
// @method
// @param t:text:String 文本内容
//==========================================================
MO.FDuiDateTime_setText = function FDuiDateTime_setText(t){
   var o = this;
   if(t){
      MO.Lang.Date.autoParse(o._date, t);
      o.hYear.value = MO.Lang.Integer.format(o._date.year, 4);
      o.hMonth.value = MO.Lang.Integer.format(o._date.month, 2);
      o.hDay.value = MO.Lang.Integer.format(o._date.day, 2);
   }else{
      o.hYear.value = '';
      o.hMonth.value = '';
      o.hDay.value = '';
   }
}

//==========================================================
// <T>校验文本内容。</T>
//
// @method
// @param t:text:String 文本内容
//==========================================================
MO.FDuiDateTime_validText = function FDuiDateTime_validText(t){
   return null;
}

//==========================================================
// <T>设置编辑对象的可编辑性。</T>
//
// @method
// @param v:value:Boolean 可编辑性
//==========================================================
MO.FDuiDateTime_setEditable = function FDuiDateTime_setEditable(v){
   var o = this;
   o.base.FDuiEditControl.setEditable.call(o, v);
   o.hYear.readOnly = !v;
   o.hMonth.readOnly = !v;
   o.hDay.readOnly = !v;
}

//==========================================================
// <T>根据自身设置信息刷新样式。</T>
//
// @method
//==========================================================
MO.FDuiDateTime_refreshStyle = function FDuiDateTime_refreshStyle(){
   var o = this;
   o.base.FDuiEditControl.refreshStyle.call(o);
   o.hYear.style.color = o._textColor;
   o.hYear.style.backgroundColor = o._backColor;
   o.hMonth.style.color = o._textColor;
   o.hMonth.style.backgroundColor = o._backColor;
   o.hDay.style.color = o._textColor;
   o.hDay.style.backgroundColor = o._backColor;
}

//==========================================================
// <T>下拉菜单。</T>
//
// @method
//==========================================================
MO.FDuiDateTime_drop = function FDuiDateTime_drop(){
   var o = this;
   if(o.canDrop() && o._editable){
      var e = o.editor = RConsole.find(FEditConsole).focus(o, FDuiDateTimeEditor, o.editRefer);
      e.set(MO.Lang.Date.formatDate(o._date));
      e.setYearVisible(o.editYear);
      e.setMonthVisible(o.editMonth);
      e.setDayVisible(o.editDay);
      e.lsnEditEnd = o.lsnEditEnd;
      e.show();
   }
}

//==========================================================
// <T>释放对象。</T>
//
// @method
//==========================================================
MO.FDuiDateTime_dispose = function FDuiDateTime_dispose(){
   var o = this;
   o.base.FDuiEditControl.dispose.call(o);
   o._date = null;
}
