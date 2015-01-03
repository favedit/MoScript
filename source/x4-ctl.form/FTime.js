//==========================================================
// <T>时  间选取控件。</T>
//
// @class FEditControl, MEditBorder, MDropable
// @history 091124 MAOCY 创建
//==========================================================
function FTime(o){
   o = RClass.inherits(this, o, FEditControl, MEditBorder, MDropable);
   //..........................................................
   o.editHour     = RClass.register(o, new TPtyBoolSet('editHour', 'editDate', EDateTimeMode.Hour));
   o.editMinute   = RClass.register(o, new TPtyBoolSet('editMinute', 'editDate', EDateTimeMode.Minute));
   o.editSecond   = RClass.register(o, new TPtyBoolSet('editSecond', 'editDate', EDateTimeMode.Second));
   // @attribute
   o._date        = null;
   o.borderStyle  = EBorder.RoundDrop;
   //..........................................................
   // @listener
   o.lsnEditEnd   = null;
   //..........................................................
   // @html
   o.hHourPanel   = null;
   o.hHour        = null;
   o.hMinutePanel = null;
   o.hMinute      = null;
   o.hSecondPanel = null;
   o.hSecond      = null;
   //..........................................................
   // @event
   o.onKeyPress   = FTime_onKeyPress;
   o.onEditEnd    = FTime_onEditEnd;
   o.onBuildEdit  = FTime_onBuildEdit;
   //..........................................................
   // @process
   o.oeSaveValue  = FTime_oeSaveValue;
   //..........................................................
   // @method
   o.construct    = FTime_construct;
   o.formatValue  = FTime_formatValue;
   o.validText    = FTime_validText;
   o.text         = FTime_text;
   o.setText      = FTime_setText;
   o.setEditable  = FTime_setEditable;
   o.refreshStyle = FTime_refreshStyle;
   o.drop         = FTime_drop;
   o.dispose      = FTime_dispose;
   return o;
}

//==========================================================
// <T>键盘按键事件。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
function FTime_onKeyPress(e){
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
function FTime_onEditEnd(e){
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
function FTime_onBuildEdit(b){
   var o = this;
   // 建立编辑控件
   var htb = RBuilder.appendTable(b.hPanel);
   htb.width = '100%';
   htb.style.tableLayout = 'fixed';
   var hr = o.hEdit = htb.insertRow();
   // 建立修改标志
   o.onBuildChange(hr.insertCell())
   // 建立小时编辑框
   var hc = o.hHourPanel = hr.insertCell();
   hc.style.padding = '0 1'
   var he = o.hHour = RBuilder.appendEdit(hc);
   he.maxLength = 2;
   he.style.border = 0;
   he.style.width = '100%';
   he.style.textAlign = 'right';
   // 建立小时和分钟的分割符
   var hc = o.hHourSplit = hr.insertCell();
   hc.width = 5;
   hc.innerText = ':';
   o.hHour.style.display = o.editHour?'block':'none';
   o.hHourSplit.style.display = o.editHour?'block':'none';
   // 建立分钟编辑框
   var hc = o.hMinutePanel = hr.insertCell();
   hc.style.padding = '0 1'
   var he = o.hMinute = RBuilder.appendEdit(hc);
   he.maxLength = 2;
   he.style.border = 0;
   he.style.width = '100%';
   he.style.textAlign = 'right';
   // 建立分钟和秒的分割符
   var hc = o.hSecondSplit = hr.insertCell();
   hc.width = 5;
   hc.innerText = ':';
   o.hMinute.style.display = o.editMinute?'block':'none';
   o.hSecondSplit.style.display = o.editSecond?'block':'none';
   // 建立秒编辑框
   var hc = o.hSecondPanel = hr.insertCell();
   hc.style.padding = '0 1'
   var he = o.hSecond = RBuilder.appendEdit(hc);
   he.maxLength = 2;
   he.style.border = 0;
   he.style.width = '100%';
   he.style.textAlign = 'right';
   o.hSecond.style.display = o.editSecond?'block':'none';

}

//==========================================================
// <T>数据存储处理。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
function FTime_oeSaveValue(e){
   var o = this;
   // 设置数据内容
   var dn = RString.nvl(o.dataCode, o.dataName);
   if(!RString.isEmpty(dn)){
      var vs = e.values;
      var v = vs.get(dn);
      if(v){
         vs.set(dn, v.substring(0, 8) + o.reget().substring(8));
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
function FTime_construct(){
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
function FTime_formatValue(t){
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
function FTime_text(){
   var o = this;
   o._date.setHour(o._date.hour);
   o._date.setMinute(o._date.minute);
   o._date.setSecond(o._date.second);
   return RDate.formatDate(o._date);
}

//==========================================================
// <T>设置文本内容。</T>
//
// @method
// @param t:text:String 文本内容
//==========================================================
function FTime_setText(t){
   var o = this;
   if(t){
      RDate.autoParse(o._date, t);
      o.hHour.value = RInteger.format(o._date.hour, 2);
      o.hMinute.value = RInteger.format(o._date.minute, 2);
      o.hSecond.value = RInteger.format(o._date.second, 2);
   }else{
      o.hHour.value = '';
      o.hMinute.value = '';
      o.hSecond.value = '';
   }
}

//==========================================================
// <T>校验文本内容。</T>
//
// @method
// @param t:text:String 文本内容
//==========================================================
function FTime_validText(v){
   return null;
}

//==========================================================
// <T>设置编辑对象的可编辑性。</T>
//
// @method
// @param v:value:Boolean 可编辑性
//==========================================================
function FTime_setEditable(v){
   var o = this;
   o.base.FEditControl.setEditable.call(o, v);
   o.hHour.readOnly = !v;
   o.hMinute.readOnly = !v;
   o.hSecond.readOnly = !v;
}

//==========================================================
// <T>根据自身设置信息刷新样式。</T>
//
// @method
//==========================================================
function FTime_refreshStyle(){
   var o = this;
   o.base.FEditControl.refreshStyle.call(o);
   o.hHour.style.color = o._textColor;
   o.hHour.style.backgroundColor = o._backColor;
   o.hMinute.style.color = o._textColor;
   o.hMinute.style.backgroundColor = o._backColor;
   o.hSecond.style.color = o._textColor;
   o.hSecond.style.backgroundColor = o._backColor;
}

//==========================================================
// <T>下拉菜单。</T>
//
// @method
//==========================================================
function FTime_drop(){
   var o = this;
   if(o.canDrop() && o.canEdit){
      var e = o.editor = RConsole.find(FEditConsole).focus(o, FTimeEditor, o.editRefer);
      e.set(RDate.formatDate(o._date));
      e.setHourVisible(o.editHour);
      e.setMinuteVisible(o.editMinute);
      e.setSecondVisible(o.editSecond);
      e.lsnEditEnd = o.lsnEditEnd;
      e.show();
   }
}

//==========================================================
// <T>释放对象。</T>
//
// @method
//==========================================================
function FTime_dispose(){
   var o = this;
   o.base.FEditControl.dispose.call(o);
   o._date = null;
}
