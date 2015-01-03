//==========================================================
// <T>日期选取控件。</T>
//
// @class FEditControl, MEditBorder, MDropable
// @history 091124 MAOCY 创建
//==========================================================
function FDate(o){
   o = RClass.inherits(this, o, FEditControl, MEditBorder, MDropable);
   //..........................................................
   // @property
   o.editDispMode = RClass.register(o, new TPtyBoolSet('editDisplay', 'editDate', EDateTimeMode.Display));
   o.editYear     = RClass.register(o, new TPtyBoolSet('editYear', 'editDate', EDateTimeMode.Year));
   o.editMonth    = RClass.register(o, new TPtyBoolSet('editMonth', 'editDate', EDateTimeMode.Month));
   o.editDay      = RClass.register(o, new TPtyBoolSet('editDay', 'editDate', EDateTimeMode.Day));
   // @attribute
   o._date        = null;
   o.borderStyle  = EBorder.RoundDrop;
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
   o.onKeyPress   = FDate_onKeyPress;
   o.onEditEnd    = FDate_onEditEnd;
   o.onBuildEdit  = FDate_onBuildEdit;
   //..........................................................
   // @process
   o.oeSaveValue  = FDate_oeSaveValue;
   //..........................................................
   // @method
   o.construct    = FDate_construct;
   o.formatValue  = FDate_formatValue;
   o.text         = FDate_text;
   o.setText      = FDate_setText;
   o.validText    = FDate_validText;
   o.setEditable  = FDate_setEditable;
   o.refreshStyle = FDate_refreshStyle;
   o.drop         = FDate_drop;
   o.dispose      = FDate_dispose;
   return o;
}

//==========================================================
// <T>键盘按键事件。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
function FDate_onKeyPress(e){
   if(!RString.inChars(String.fromCharCode(e.keyCode), RDate.Chars)){
      RKey.eventClear(e);
   }
}

//==========================================================
// <T>编辑完成事件。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
function FDate_onEditEnd(e){
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
function FDate_onBuildEdit(b){
   var o = this;
   // 建立编辑控件
   var htb = RBuilder.appendTable(b.hPanel);
   htb.width = '100%';
   htb.style.tableLayout = 'fixed';
   var hr = o.hEdit = htb.insertRow();
   // 建立修改标志
   o.onBuildChange(hr.insertCell())
   // 建立小时编辑框
   var hc = oonDateDoubleClickPanel = hr.insertCell();
   hc.width = '40%';
   hc.style.padding = '0 1';
   var he = o.hYear = RBuilder.appendEdit(hc);
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
   var he = o.hMonth = RBuilder.appendEdit(hc);
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
   var he = o.hDay = RBuilder.appendEdit(hc);
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
function FDate_oeSaveValue(e){
   var o = this;
   // 设置数据内容
   var dn = RString.nvl(o.dataCode, o.dataName);
   if(!RString.isEmpty(dn)){
      var vs = e.values;
      var v = vs.get(dn);
      if(v){
         vs.set(dn, o.reget().substring(0, 8) + v.substring(8));
      }else{
         vs.set(dn, o.reget());
      }
   }
   return EEventStatus.Stop;
}

//==========================================================
// <T>控件构建。</T>
//
// @method
//==========================================================
function FDate_construct(){
   var o = this;
   o.base.FEditControl.construct.call(o);
   o._date = new TDate();
   o.lsnEditEnd = new TListener(o, o.onEditEnd);
}

//==========================================================
// <T>格式化文本内容为数据内容。</T>
//
// @method
// @param t:text:String 文本内容
//==========================================================
function FDate_formatValue(t){
   if(t){
      var o = this;
      if(t.toLowerCase() == '@now'){
         o._date.now();
         return RDate.formatDate(o._date);
      }else{
         RDate.autoParse(o._date, t);      
         return RDate.formatDate(o._date);
      }
   }
   return RString.nvl(t);
}

//==========================================================
// <T>获得文本内容。</T>
//
// @method
// @return String 文本内容
//==========================================================
function FDate_text(){
   var o = this;
   o._date.setYear(o._date.year);
   o._date.setMonth(o._date.month);
   o._date.setDay(o._date.day);
   return RDate.formatDate(o._date);
}

//==========================================================
// <T>设置文本内容。</T>
//
// @method
// @param t:text:String 文本内容
//==========================================================
function FDate_setText(t){
   var o = this;
   if(t){
      RDate.autoParse(o._date, t);
      o.hYear.value = RInteger.format(o._date.year, 4);
      o.hMonth.value = RInteger.format(o._date.month, 2);
      o.hDay.value = RInteger.format(o._date.day, 2);
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
function FDate_validText(t){
   return null;
}

//==========================================================
// <T>设置编辑对象的可编辑性。</T>
//
// @method
// @param v:value:Boolean 可编辑性
//==========================================================
function FDate_setEditable(v){
   var o = this;
   o.base.FEditControl.setEditable.call(o, v);
   o.hYear.readOnly = !v;
   o.hMonth.readOnly = !v;
   o.hDay.readOnly = !v;
}

//==========================================================
// <T>根据自身设置信息刷新样式。</T>
//
// @method
//==========================================================
function FDate_refreshStyle(){
   var o = this;
   o.base.FEditControl.refreshStyle.call(o);
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
function FDate_drop(){
   var o = this;
   if(o.canDrop() && o._editable){
      var e = o.editor = RConsole.find(FEditConsole).focus(o, FDateEditor, o.editRefer);
      e.set(RDate.formatDate(o._date));
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
function FDate_dispose(){
   var o = this;
   o.base.FEditControl.dispose.call(o);
   o._date = null;
}
