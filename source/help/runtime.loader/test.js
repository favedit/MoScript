function FButton(o){
	o = RClass.inherits(this, o, FControl, MDesign, MLsnClick);
	o.labelPosition  = RClass.register(o, new TPtyStr('labelPosition', EPosition.Left));
	o.icon           = RClass.register(o, new TPtyStr('icon'));
	o.styleIcon      = RClass.register(o, new TStyle('Icon'));
	o.styleLabel     = RClass.register(o, new TStyle('Label'));
	o.styleForm      = RClass.register(o, new TStyle('Form'));
	o.onButtonMouseOver = RClass.register(o, new HMouseOver('onButtonMouseOver'));
	o.hForm          = null;
	o.hLabelPanel    = null;
	o.hLabel         = null;
	o.oeBuild        = FButton_oeBuild;
	o.onClick        = FButton_onClick;
	o.ohButtonMouseOver = FButton_ohButtonMouseOver;
	o.setLabel       = FButton_setLabel;
	return o;
}
function FButton_oeBuild(event){
	var o = this;
	o.base.FControl.oeBuild.call(o, event);
   o.hForm = RBuilder.appendTable(o.hPanel, o.style('Form'));
   o.hForm.width = "80px";
   var hf = o.hForm
   o.attachEvent('onButtonMouseOver', hf, o.ohButtonMouseOver);
   var hr  = hf.insertRow();
   var hc1 = hr.insertCell();
   var hc2 = hr.insertCell();
	o.hIcon = RBuilder.appendIcon(hc1, o.icon, o.style('Icon'));
	o.hLabel = RBuilder.appendText(hc2, o.label, o.style('Label'));
	return EEventStatus.Stop;
}
function FButton_ohButtonMouseOver(){
   var o = this;
}
function FButton_onClick(){
	this.processClick(null, this);
}
function FButton_setLabel(label){
	this.label = label;
	this.hLabel.innerText = label;
}
function FCalendar(o){
	o = RClass.inherits(this, o, FEditControl, MEditBorder, MDropable, MDescCalendar);
	o.date        = new TDate();
	o.borderStyle = EBorderStyle.RoundDrop;
	o.dropIcon    = 'drop';
	o.hForm       = null;
	o.hDrop       = null;
	o.hForm       = null;
	o.onBuildEdit = FCalendar_onBuildEdit;
	o.onEditEnd   = FCalendar_onEditEnd;
	o.onKeyPress  = FCalendar_onKeyPress;
	o.text        = FCalendar_text;
	o.setText     = FCalendar_setText;
	o.formatValue = FCalendar_formatValue;
	o.validText   = FCalendar_validText;
	o.formatText  = FCalendar_formatText;
	o.drop        = FCalendar_drop;
	return o;
}
function FCalendar_onBuildEdit(b){
	var o = this;
	var h = o.hEdit = RBuilder.appendEdit(b.hPanel, o.style('Edit'));
	if(o.editLength){
		h.maxLength = o.editLength;
	}
}
function FCalendar_onEditEnd(editor){
	var o = this;
	RLog.debug(o, 'Edit end (editor={1}:{2} value={3})', editor, editor?editor.value():'', o.dataValue);
	if(editor){
		o.set(editor.value());
	}
	o.onDataEditEnd(o);
}
function FCalendar_onKeyPress(e){
	if(!RStr.inChars(String.fromCharCode(e.keyCode), RDate.Chars)){
		RKey.eventClear(e);
	}
}
function FCalendar_text(){
	return this.hEdit.value;
}
function FCalendar_setText(text){
	this.hEdit.value = text;
}
function FCalendar_formatValue(t){
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
	return RStr.nvl(t);
}
function FCalendar_validText(v){
	var o = this;
	if(RStr.isEmpty(v)){
		return true;
	}
	return (null != RDate.autoParse(o.date, v));
}
function FCalendar_formatText(value){
	if(value){
		var o = this;
		RDate.autoParse(o.date, value);
		return RDate.formatDate(o.date, o.editFormat);
	}
	return RStr.nvl(value);
}
function FCalendar_drop(){
	var o = this;
	if(o.canDrop() && o.canEdit){
		var editor = RConsole.find(FEditConsole).focus(o, FCalendarEditor, o.name);
		editor.linkControl(o);
		editor.setValue(o.dataValue, o.editFormat);
		editor.show();
	}
}
function FCalendarEditor(o){
	o = RClass.inherits(this, o, FDropEditor, MFocusLooper, MShadow);
	o.editFormat    = RDate.DisplayFormat;
   o.onDayEnter    = RClass.register(o, new HMouseEnter('onDayEnter'),    FCalendarEditor_onDayEnter);
   o.onDayOut      = RClass.register(o, new HMouseOut('onDayOut'),        FCalendarEditor_onDayOut);
   o.onDaySelect   = RClass.register(o, new HMouseDown('onDaySelect'),    FCalendarEditor_onDaySelect);
   o.onButtonNow   = RClass.register(o, new HMouseDown('onButtonNow'),    FCalendarEditor_onButtonNow);
   o.onButtonOk    = RClass.register(o, new HMouseDown('onButtonOk'),     FCalendarEditor_onButtonOk);
   o.onButtonOver  = RClass.register(o, new HMouseEnter('onButtonOver'),  FCalendarEditor_onButtonOver);
   o.onButtonOut   = RClass.register(o, new HMouseOut('onButtonOut'),     FCalendarEditor_onButtonOut);
   o.onMdown       = RClass.register(o, new HMouseDown('onMdown'),        FCalendarEditor_onMdown);
   o.onMup         = RClass.register(o, new HMouseUp('onMup'),            FCalendarEditor_onMup);
   o.styleYearMonth   = RClass.register(o, new TStyle('YearMonth'));
	o.styleButton      = RClass.register(o, new TStyle('Button'));
	o.styleButtonHover = RClass.register(o, new TStyle('ButtonHover'));
	o.styleDay         = RClass.register(o, new TStyle('Day'));
	o.styleDaySel      = RClass.register(o, new TStyle('DaySel'));
	o.styleDayHover    = RClass.register(o, new TStyle('DayHover'));
	o.styleDayFree     = RClass.register(o, new TStyle('DayFree'));
	o.styleDayNone     = RClass.register(o, new TStyle('DayNone'));
	o.styleTitlePanel  = RClass.register(o, new TStyle('TitlePanel'));
	o.styleDaysPanel   = RClass.register(o, new TStyle('DaysPanel'));
	o.styleTimePanel   = RClass.register(o, new TStyle('TimePanel'));
	o.styleMonth       = RClass.register(o, new TStyle('Year'));
	o.styleMonth       = RClass.register(o, new TStyle('Month'));
	o.styleWeek        = RClass.register(o, new TStyle('Week'));
	o.styleTime        = RClass.register(o, new TStyle('Time'));
	o.styleNow         = RClass.register(o, new TStyle('Now'));
	o.styleOk          = RClass.register(o, new TStyle('Ok'));
	o.dateOrg       = new TDate();
	o.dateOrgValue  = null;
	o.date          = new TDate();
	o.dayCells      = new TList();
	o.focusObject   = null;
	o.skipBlur      = false;
	o.hTitlePanel   = null;
	o.hYearPrior    = null;
	o.hYear         = null;
	o.hYearNext     = null;
	o.hMonthPrior   = null;
	o.hMonth        = null;
	o.hMonthNext    = null;
	o.hDaysPanel    = null;
	o.hTimePanel    = null;
	o.hTime         = null;
	o.hNow          = null;
	o.hOk           = null;
	o.onBuildDrop   = FCalendarEditor_onBuildDrop;
	o.onBuildButton = FCalendarEditor_onBuildButton;
	o.linkControl   = FCalendarEditor_linkControl;
	o.ohKdown       = FCalendarEditor_ohKdown;
	o.ohDaysChange  = FCalendarEditor_ohDaysChange;
	o.ohKeyCheck    = FCalendarEditor_ohKeyCheck;
	o.onBuildData   = FCalendarEditor_onBuildData;
	o.onDateAction  = FCalendarEditor_onDateAction;
	o.panel         = FCalendarEditor_panel;
	o.value         = FCalendarEditor_value;
	o.setValue      = FCalendarEditor_setValue;
	o.setDate       = FCalendarEditor_setDate;
	o.changeToData  = FCalendarEditor_changeToData;
	o.buildTitle    = FCalendarEditor_buildTitle;
	o.buildDays     = FCalendarEditor_buildDays;
	o.buildTime     = FCalendarEditor_buildTime;
	o.linkPanel     = FCalendarEditor_linkPanel;
	o.show          = FCalendarEditor_show;
	o.hide          = FCalendarEditor_hide;
	o.makeChange    = FCalendarEditor_makeChange;
	return o;
}
function FCalendarEditor_onBuildButton(){
   var o = this;
   o.base.FDropEditor.onBuildButton.call(o);
   var h = o.hNow = RBuilder.append(o.hButtonPanel, 'SPAN', o.style('Now'));
   h.innerText = 'NOW';
   o.attachEvent("onButtonNow",h);
}
function FCalendarEditor_linkControl(c){
   var o = this;
   o.source = c;
   RLog.debug(o, 'link Panel (panel={0}, edit={1})', RClass.dump(c.hEditCell), RClass.dump(c.hEdit));
   RHtml.toRect(o.rect, c.hEditCell);
   o.hPanel.style.pixelLeft = o.rect.left;
   o.hPanel.style.pixelTop = o.rect.bottom;
   o.hPanel.style.width = 235;
   return true;
}
function FCalendarEditor_onBuildDrop(){
   this.onBuildData();
}
function FCalendarEditor_onMdown(e){
   var o = e.source;
   if(RClass.isClass(o, FCalendarEditor)){
      o.isSkipBlur = true;
      if(e.hSource.linkAction){
         e.hSource.linkAction.call(o, e.hSource);
      }
   }
}
function FCalendarEditor_onMup(e){
   var o = e.source;
   if(RClass.isClass(o, FCalendarEditor)){
      var f = o.focusObject;
      if(f && f.focus && f.select){
         f.focus();
         f.select();
      }
   }
}
function FCalendarEditor_ohKdown(){
	var o = this.link;
	if(RClass.isClass(o, FCalendarEditor)){
		var e = RWindow.event(this);
		if(EKey.Esc == e.keyCode){
			o.dataValue = o.dateOrgValue;
			o.editStatus = EEditStatus.Cancel;
			o.endEdit();
		}else if(event.ctrlKey && EKey.Enter == e.keyCode){
			o.changeToData();
			o.editStatus = EEditStatus.Ok;
			o.endEdit();
		}else if(EKey.Enter == e.keyCode){
			o.changeToData();
			o.setDate(o.date);
		}else if(EKey.Tab == e.keyCode){
			o.isSkipBlur = true;
			if(e.shiftKey){
				o.focusPrior();
			}else{
				o.focusNext();
			}
			e.returnValue = 0;
		}
	}
}
function FCalendarEditor_onButtonOver(e){
   var o = e.source;
   if(RClass.isClass(o, FCalendarEditor)){
      e.hSource.className = o.style('ButtonHover');
   }
}
function FCalendarEditor_onButtonOut(e){
   var o = e.source;
   if(RClass.isClass(o, FCalendarEditor)){
      e.hSource.className = o.style('Button');
   }
}
function FCalendarEditor_onButtonNow(e){
   var o = e.source;
   if(RClass.isClass(o, FCalendarEditor)){
      o.editStatus = EEditStatus.Ok;
      o.dataValue = RDate.format();
      o.endEdit();
   }
}
function FCalendarEditor_onButtonOk(e){
   var o = e.source;
   if(RClass.isClass(o, FCalendarEditor)){
      o.editStatus = EEditStatus.Ok;
      o.dataValue = RDate.formatDate(o.date);
      o.endEdit();
   }
}
function FCalendarEditor_ohDaysChange(){
	var o = this.link;
	if(RClass.isClass(o, FCalendarEditor)){
		o.date.setYear(o.hYear.value);
		o.date.setMonth(o.hMonth.value);
		o.setDate(o.date);
	}
}
function FCalendarEditor_ohKeyCheck(){
	var e = RWindow.event(this)
	if(!RStr.isPattern(String.fromCharCode(e.keyCode), 'n')){
		e.keyCode = 0;
	}
}
function FCalendarEditor_onDayEnter(e){
   var o = e.source;
   if(RClass.isClass(o, FCalendarEditor) && e.hSource.innerText != '.'){
      if(!e.hSource.isCurrent){
         e.hSource.className = o.style('DayHover');
      }
   }
}
function FCalendarEditor_onDayOut(e){
   var o = e.source;
   if(RClass.isClass(o, FCalendarEditor) && e.hSource.innerText != '.'){
      if(!e.hSource.isCurrent){
         e.hSource.className = e.hSource.isFree ? o.style('DayFree') : o.style('Day');
      }
   }
}
function FCalendarEditor_onDaySelect(e){
   var o = e.source;
   if(RClass.isClass(o, FCalendarEditor) && 0 != RInt.parse(e.hSource.innerText)){
      o.date.setDay(e.hSource.innerText);
      o.dataValue = RDate.formatDate(o.date);
      o.editStatus = EEditStatus.Ok;
      o.makeChange();
      o.endEdit();
   }
}
function FCalendarEditor_onBuildData(){
   var o = this;
   o.hDatePanel = RBuilder.appendTable(o.hDropPanel);
   var hRow = o.hDatePanel.insertRow();
   var hCell = o.hTitlePanel = hRow.insertCell();
   hCell.colSpan = 2;
   hCell.className = o.style('TitlePanel');
   o.buildTitle();
   var hRow = o.hDatePanel.insertRow();
   var hCell = o.hDaysPanel = hRow.insertCell();
   hCell.colSpan = 2;
   hCell.className = o.style('DaysPanel');
   o.buildDays();
   o.pushFocus(o.hYear);
   o.pushFocus(o.hMonth);
}
function FCalendarEditor_onDateAction(h){
	var o = this;
	if(o.hYearPrior == h){
		o.date.addYear(-1);
		o.setDate(o.date);
		if(o.focusObject != this.hYear){
			o.focusObject = this.hYear;
			o.hYear.focus();
			o.hYear.select();
		}
	}else if(o.hYearNext == h){
		o.date.addYear(1);
		o.setDate(o.date);
		if(o.focusObject != this.hYear){
			o.focusObject = this.hYear;
			o.hYear.focus();
			o.hYear.select();
		}
	}else if(o.hMonthPrior == h){
		this.date.addMonth(-1);
		o.setDate(o.date);
		if(o.focusObject != this.hMonth){
			o.focusObject = this.hMonth;
			o.hMonth.focus();
		}
	}else if(o.hMonthNext == h){
		this.date.addMonth(1);
		o.setDate(o.date);
		if(o.focusObject != this.hMonth){
			o.focusObject = this.hMonth;
			o.hMonth.focus();
		}
	}
}
function FCalendarEditor_panel(type){
	var o = this;
	if(EPanel.Shadow == type){
		return o.hDropForm;
	}
	return o.base.FDropEditor.panel.call(o, type);
}
function FCalendarEditor_value(){
	return this.dataValue;
}
function FCalendarEditor_setValue(value, format){
	var o = this;
	o.changed = false;
	o.skipBlur = 0;
	o.dataValue = value;
	o.dateOrgValue = value;
	o.editFormat = format;
	if(value){
		RDate.parse(o.date, value);
		RDate.parse(o.dateOrg, value);
	}
	o.setDate(o.date);
}
function FCalendarEditor_setDate(date){
	var o = this;
	o.hYear.value = date.year;
	o.hMonth.value = date.month;
	var selDay = date.day;
	if(!(o.dateOrg.year == date.year && o.dateOrg.month == date.month)){
		selDay = -1;
	}
	var monthWeekDay = this.date.monthWeekDay();
	var monthDays = this.date.monthDays();
	var weekDay = monthWeekDay;
	for(var n=0; n<o.dayCells.count; n++){
		var h = o.dayCells.get(n);
		if(n<monthWeekDay){
			h.className = o.style('DayNone');
			h.innerText = '.'
		}else if(n < monthDays+monthWeekDay){
			if(weekDay == 7){
				weekDay = 0;
			}
			var day = n-monthWeekDay+1;
			if(day == selDay){
				h.className = o.style('DaySel');
				h.isCurrent = true;
			}else{
				h.isFree = (weekDay==0 || weekDay==6);
				h.className = h.isFree ? o.style('DayFree') : o.style('Day');
				h.isCurrent = false;
			}
			h.innerText = day;
			weekDay++;
		}else{
			h.className = o.style('DayNone');
			h.innerText = '.'
		}
	}
}
function FCalendarEditor_changeToData(){
	var o = this;
	o.date.setYear(o.hYear.value);
	o.date.setMonth(o.hMonth.value);
}
function FCalendarEditor_buildTitle(){
	var o = this;
	var hTab = RBuilder.appendTable(o.hTitlePanel, null, 0, 1, 1);
	var hRow = hTab.insertRow();
	var hCel = hRow.insertCell();
	var h = o.hYearPrior = RBuilder.append(hCel, 'SPAN', o.style('Button'));
	h.link = o;
	h.linkAction = o.onDateAction;
	h.innerText = '3';
	o.attachEvent("onButtonOver",h);
	o.attachEvent("onButtonOut",h);
	o.attachEvent("onMdown",h);
	o.attachEvent("onMup",h);
	var hCel = hRow.insertCell();
	var h = o.hYear = RBuilder.append(hCel, 'INPUT', o.style('Year'));
	h.maxLength = '4';
	h.onchange = o.ohDaysChange;
	h.onkeypress = o.ohKeyCheck;
	var hCel = hRow.insertCell();
	hCel.innerText = RContext.get(FCalendarEditor, 'year');
	hCel.className = o.style('YearMonth');
	var hCel = hRow.insertCell();
	var h = o.hYearNext = RBuilder.append(hCel, 'SPAN', o.style('Button'));
	h.link = o;
	h.linkAction = o.onDateAction;
	h.innerText = '4';
	  o.attachEvent("onButtonOver",h);
	   o.attachEvent("onButtonOut",h);
	  o.attachEvent("onMdown",h);
	   o.attachEvent("onMup",h);
	var hCell = hRow.insertCell();
	hCell.width='10';
	var hCel = hRow.insertCell();
	var h = o.hMonthPrior = RBuilder.append(hCel, 'SPAN', o.style('Button'));
	h.link = o;
	h.linkAction = o.onDateAction;
	h.innerText = '3';
	  o.attachEvent("onButtonOver",h);
	   o.attachEvent("onButtonOut",h);
	  o.attachEvent("onMdown",h);
	   o.attachEvent("onMup",h);
	var hCel = hRow.insertCell();
	var h = o.hMonth = RBuilder.append(hCel, 'INPUT', o.style('Month'));
	h.maxLength = '2';
	h.onchange = o.ohDaysChange;
	h.onkeypress = o.ohKeyCheck;
	var hCel = hRow.insertCell();
	hCel.innerText = RContext.get(FCalendarEditor, 'month');
	hCel.className = o.style('YearMonth');
	var hCel = hRow.insertCell();
	var h = o.hMonthNext = RBuilder.append(hCel, 'SPAN', o.style('Button'));
	h.link = o;
	h.linkAction = o.onDateAction;
	h.innerText = '4';
	  o.attachEvent("onButtonOver",h);
	   o.attachEvent("onButtonOut",h);
	  o.attachEvent("onMdown",h);
	   o.attachEvent("onMup",h);
}
function FCalendarEditor_buildDays(){
	var o = this;
	var hTab = RBuilder.appendTable(o.hDaysPanel, null, 0, 0, 1);
	hTab.width = '100%';
	var weekDays = RContext.get(FCalendarEditor, 'weekdays').split(',');
	var count = weekDays.length;
	var hWeekRow = hTab.insertRow();
	for(var n=0; n<count; n++){
		var h = hWeekRow.insertCell();
		h.className = o.style('Week');
		h.align = 'center';
		h.innerText = weekDays[n];
	}
	for(var n=0; n<6; n++){
		var hRow = hTab.insertRow();
		for(var i=0; i<count; i++){
			var h = hRow.insertCell();
			h.link = o;
			h.className = o.style('DayNone');
			o.attachEvent("onDayEnter",h);
			o.attachEvent("onDayOut",h);
			o.attachEvent("onDaySelect",h);
			h.innerText = '.';
			o.dayCells.push(h);
		}
	}
}
function FCalendarEditor_buildTime(){
   return;
	var o = this;
	var hTab = RBuilder.appendTable(o.hTimePanel, null, 0, 1, 1);
	var hRow = hTab.insertRow();
	var hCel = hRow.insertCell();
	var h = o.hTime = RBuilder.appendEdit(hCel, o.style('Time'));
	h.maxLength = 8;
	hCel = hRow.insertCell();
	hCel.width = '16px';
   hCel = hRow.insertCell();
	var h = o.hNow = RBuilder.append(hCel, 'SPAN', o.style('Now'));
	h.link = o;
	h.innerText = 'NOW';
	o.attachEvent("onButtonNow",h);
	hCel = hRow.insertCell();
	var h = o.hOk = RBuilder.append(hCel, 'SPAN', o.style('Ok'));
	h.link = o;
	h.innerText = 'OK';
	o.attachEvent("onButtonOk",h);
}
function FCalendarEditor_linkPanel(hCell, border, hEdit){
   var o = this;
   o.base.linkPanel.call(o, hCell, border, hEdit);
   alert(o.hDropPanel.outerHTML);
}
function FCalendarEditor_show(v){
	var o = this;
	o.base.FDropEditor.show.call(o, v);
	o.base.MShadow.show.call(o, v);
}
function FCalendarEditor_hide(){
	var o = this;
	o.base.FDropEditor.hide.call(o);
	o.base.MShadow.hide.call(o);
}
function FCalendarEditor_makeChange(){
   var o = this;
   if(1){
   }
   var he = new HChange('onchange');
   var p =o.editable
   he.hSource = p.hEdit;
   he.source = p;
   RConsole.find(FEventEngineConsole).process(he);
}
function FCheck(o){
   o = RClass.inherits(this, o, FEditControl, MDescCheck);
   o.borderStyle   = EBorderStyle.None;
   o.onBuildEdit   = FCheck_onBuildEdit;
	o.isTextChanged = RMethod.emptyTrue;
   o.text          = FCheck_text;
   o.set           = FCheck_set;
   o.setText       = FCheck_setText;
   o.setEditStyle  = FCheck_setEditStyle;
   o.testFocus     = RMethod.emptyFalse;
   return o;
}
function FCheck_onBuildEdit(h){
	var o = this;
	o.hEdit = RBuilder.appendCheck(h, o.style('Edit'));
	if(null == o.dataValue){
		o.dataValue = o.editFalse;
	}
}
function FCheck_text(){
	var o = this;
	return o.hEdit.checked ? o.editTrue : o.editFalse;
}
function FCheck_set(v){
	var o = this;
	o.dataValue = RStr.nvl(v, o.editFalse);
	o.setText(o.descriptor().formatText(v));
}
function FCheck_setText(t){
	var o = this;
	o.hEdit.checked = (o.editTrue == t);
}
function FCheck_setEditStyle(style){
	var o = this;
	var h = o.panel(EPanel.Edit);
	switch(style){
		case EStyle.Edit:
			h.disabled = false;
			break;
		case EStyle.Readonly:
			h.disabled = true;
			break;
	}
}
function FCheckPicker(o){
   o = RClass.inherits(this, o, FEditControl, MEditBorder, MDescCheckPicker, MDropable);
   o.stIconDropSelect = RClass.register(o, new TStyleIcon('DropSelect'));
   o.items            = new TItems();
   o.borderStyle      = EBorderStyle.RoundDrop;
   o.onBuildEdit      = FCheckPicker_onBuildEdit;
   o.onEditEnd        = FCheckPicker_onEditEnd;
   o.onDataKeyDown    = FCheckPicker_onDataKeyDown;
   o.loadConfig       = FCheckPicker_loadConfig;
   o.formatValue      = FCheckPicker_formatValue;
   o.validText        = FCheckPicker_validText;
   o.formatText       = FCheckPicker_formatText;
   o.setEditStyle     = FCheckPicker_setEditStyle;
   o.drop             = FCheckPicker_drop;
   return o;
}
function FCheckPicker_onBuildEdit(b){
   var o = this;
   var h = o.hEdit = RBuilder.appendEdit(b.hPanel, o.style('Edit'));
   if(o.editLength){
      h.maxLength = o.editLength;
   }
}
function FCheckPicker_onEditEnd(editor){
   var o = this;
   RLog.debug(o, 'Begin (editor={1}:{2} value={3})', editor, editor?editor.value():'', o.dataValue);
   if(editor){
      o.set(editor.values);
   }
   o.onDataEditEnd(o);
   RLog.debug(o, 'End (editor={1} value={2})', editor, o.dataValue);
}
function FCheckPicker_loadConfig(c){
   var o = this;
   o.base.FEditControl.loadConfig.call(o, c);
   if(o.dataEmpty){
      o.items.create();
   }
   o.items.loadConfig(c);
   return EStatus.Stop;
}
function FCheckPicker_text(){
   return this.hEdit.value;
}
function FCheckPicker_setText(text){
   this.hEdit.value = text;
}
function FCheckPicker_formatValue(text){
   var o = this;
   if(!RStr.isEmpty(text)){
      ta = RStr.split(text, ',');
      var vs = MoCreate(Array);
      var item = o.items.items;
      for(var n = 0; n < ta.length; n++){
         for(var m = 0; m < item.count; m++){
            var c = item.value(m);
            if(c.label == ta[n]){
               vs.push(c.value);
            }
         }
      }
      return RStr.toUpper(vs.join());
   }else{
      return '';
   }
}
function FCheckPicker_validText(text){
   var o = this;
   if(RStr.isEmpty(text)){
      return true;
   }
   return !RStr.isEmpty(o.formatValue(text));
}
function FCheckPicker_formatText(v){
   var o = this;
   if(!RStr.isEmpty(v)){
      va = RStr.split(v, ',');
      var vs = MoCreate(Array);
      var item = o.items.items;
      for(var n = 0; n < va.length; n++){
         var t = item.values[item.indexOf(va[n])];
         if(t){
            vs.push(t.label);
         }
      }
      return RStr.toUpper(vs.join());
   }else{
      return '';
   }
}
function FCheckPicker_setEditStyle(t){
   var o = this;
   o.base.FEditControl.setEditStyle.call(o, t);
   o.hDrop.src = o.styleIconPath(o.isEditHover(t) ? 'DropSelect' : 'Drop');
}
function FCheckPicker_drop(){
   var o = this;
   if(o.canDrop() && o.canEdit && o.items.count() > 0){
      var ed = o.editor = RConsole.find(FEditConsole).focus(o, FCheckPickerEditor, o.editRefer);
      if(ed.linkControl(o)){
         ed.setItems(o.items);
         ed.set(o.reget());
      }
      ed.show();
   }
}
function FCheckPicker_onDataKeyDown(s, e){
   var o = this;
   o.base.FEditControl.onDataKeyDown.call(o, s, e);
   if(o.items.count()){
      if(o.editor && o.editor.source == o){
         o.editor.onEditKeyDown(s, e);
      }
   }
}
function FCheckPickerEditor(o){
   o = RClass.inherits(this, o, FDropEditor, MShadow);
   o.MinWidth         = 120;
   o.onEditFocus      = RClass.register(o, new HFocus('onEditFocus'));
   o.onEditBlur       = RClass.register(o, new HBlur('onEditBlur'));
   o.stIconDropSelect = RClass.register(o, new TStyleIcon('DropSelect'));
   o.stFlag           = RClass.register(o, new TStyle('Flag'));
   o.stEditForm       = RClass.register(o, new TStyle('EditForm'));
   o.pattern          = null;
   o.originItem       = null;
   o.selectItem       = null;
   o.items            = null;
   o.itemClickListener = null;
   o.values           = MoCreate(Array);
   o.hBtnTextSpan     = null;
   o.onBuildDrop      = FCheckPickerEditor_onBuildDrop;
   o.onBuildButton    = FCheckPickerEditor_onBuildButton;
   o.onItemClick      = FCheckPickerEditor_onItemClick;
   o.onEditKeyDown    = FCheckPickerEditor_onEditKeyDown;
   o.construct        = FCheckPickerEditor_construct;
   o.set              = FCheckPickerEditor_set;
   o.setItems         = FCheckPickerEditor_setItems;
   o.select           = FCheckPickerEditor_select;
   o.linkControl      = FCheckPickerEditor_linkControl;
   o.show             = FCheckPickerEditor_show;
   o.hide             = FCheckPickerEditor_hide;
   return o;
}
function FCheckPickerEditor_construct(){
   var o = this;
   o.itemClickListener = new TListener(o, o.onItemClick);
}
function FCheckPickerEditor_onBuildDrop(){
   var o = this;
   o.hItemsForm = RBuilder.appendTable(o.hDropPanel);
   o.hItemsForm.width = '100%';
   o.hItemsPanel = RBuilder.append(o.hItemsForm, 'TBODY');
   o.onBuildButton();
}
function FCheckPickerEditor_onBuildButton(){
   var o = this;
   o.base.FDropEditor.onBuildButton.call(o);
   var h = o.hBtnTextSpan = RBuilder.newSpan(o.hButtonPanel, null);
   h.innerText = 'colse';
}
function FCheckPickerEditor_onItemClick(s){
   var o = this;
   s.setChecked(!s.checked);
   var ts = o.items.items;
   var cs = o.components;
   var vs = MoCreate(Array);
   for(var n = 0; n < ts.count; n++){
      var c = cs.value(n);
      if(c.checked){
         vs.push(c.value);
      }
   }
   var e = o.source;
   e.set(vs.join());
}
function FCheckPickerEditor_select(p){
   var o = this;
   var cs = o.components;
   p = Math.min(Math.max(0, p), cs.count-1)
   for(var n=0; n<cs.count; n++){
      o.components.value(n).setChecked(n == p);
   }
   o.position = p;
}
function FCheckPickerEditor_onEditKeyDown(s, e){
   var o = this;
   return;
}
function FCheckPickerEditor_set(v){
   var o = this;
   var cs = o.components;
   var cl = cs.count;
   for(var n = 0;n < cl;n++){
      cs.value(n).setChecked(false);
   }
   if(!RStr.isEmpty(v)){
      o.values = v;
      va = RStr.split(v, ',');
      for(var n = 0; n < va.length; n++){
         var c = cs.get(va[n]);
         if(c){
            c.setChecked(true);
         }
      }
   }
}
function FCheckPickerEditor_setItems(items){
   var o = this;
   if(o.components){
      return;
   }
   var hip = o.hItemsPanel;
   o.items = items;
   var count = items.count();
   for(var n=0; n<count; n++){
      if(n > 0){
         var hr = RBuilder.append(hip, 'TR');
         hr.height = 1;
         var hd = RBuilder.append(hr, 'TD');
         hd.colSpan = 3;
         hd.style.borderTop = '1 dashed #24c2db';
         RBuilder.appendEmpty(hd);
      }
      var t = items.get(n);
      var c = RControl.create(FSelectItem);
      c.name = t.value;
      c.lsnsClick.push(o.itemClickListener);
      c.set(t.icon, t.label, t.value);
      c.setPanel(hip);
      o.push(c);
   }
   o.position = 0;
}
function FCheckPickerEditor_linkControl(c){
   var o = this;
   if(o.source == c){
      return false;
   }
   o.source = c;
   RLog.debug(o, 'link Panel (panel={0}, edit={1})', RClass.dump(c.hEditCell), RClass.dump(c.hEdit));
   RHtml.toRect(o.rect, c.hEditCell);
   RHtml.setPixelRect(o.hPanel, o.rect);
   o.hPanel.style.pixelTop = o.rect.bottom;
   var hbf = o.border.hForm;
   hbf.style.pixelWidth = c.editBorder.hForm.width;
   hbf.style.pixelHeight = c.editBorder.hForm.height;
   return true;
}
function FCheckPickerEditor_show(v){
   var o = this;
   o.base.FDropEditor.show.call(o, v);
   RConsole.find(FFocusConsole).focus(o);
   if(o.border.hForm.offsetWidth < o.MinWidth){
      o.border.hForm.style.pixelWidth = o.MinWidth;
   }
   o.base.MShadow.show.call(o, v);
   o.isSkipBlur = false;
}
function FCheckPickerEditor_hide(){
   var o = this;
   o.source = null;
   o.base.FDropEditor.hide.call(o);
   o.base.MShadow.hide.call(o);
}
function FColorPicker(o){
	o = RClass.inherits(this, o, FEditControl, MEditBorder, MDescColor, MDropable);
	o.borderStyle = EBorderStyle.RoundDrop;
	o.onBuildEdit = FColorPicker_onBuildEdit;
	o.onEditEnd   = FColorPicker_onEditEnd;
	o.setText     = FColorPicker_setText;
	o.drop        = FColorPicker_drop;
	return o;
}
function FColorPicker_onBuildEdit(b){
   var o = this;
	var h = o.hEdit = RBuilder.appendEdit(b.hPanel, o.style('Edit'));
	h.maxLength = 20;
}
function FColorPicker_onEditEnd(editor){
	var o = this;
	RLog.debug(o, 'Begin (editor={0}:{1} value={2})', editor, editor?editor.color:'', o.dataValue);
	if(editor){
		o.set(editor.color);
		o.hDrop.style.backgroundColor = editor.color;
	}
	o.onDataEditEnd(o);
	RLog.debug(o, 'End (editor={0} value={1})', editor, o.dataValue);
}
function FColorPicker_setText(t){
	var o = this;
	o.base.FEditControl.setText.call(o, RStr.toUpper(t));
	o.hDrop.style.backgroundColor = t;
}
function FColorPicker_drop(){
   var o = this;
   if(o.canDrop() && o.canEdit){
      var ed = o.editor = RConsole.find(FEditConsole).focus(o, FColorPickerEditor, o.name);
      if(ed.linkControl(o)){
         ed.set(o.reget());
      }
      ed.show();
   }
}
function FColorPickerEditor(o){
	o = RClass.inherits(this, o, FDropEditor, MShadow);
	o.MinWidth     = 120;
	o.ColorHex     = new Array('00', '33', '66', '99', 'CC', 'FF');
	o.SpColorHex   = new Array('FF0000', '00FF00', '0000FF', 'FFFF00', '00FFFF','FF00FF');
   o.onCellEnter  = RClass.register(o, new HMouseOver('onCellEnter'),  FColorPickerEditor_onCellEnter);
   o.onCellSelect = RClass.register(o, new HMouseDown('onCellSelect'), FColorPickerEditor_onCellSelect);
	o.color        = null;
	o.hTable       = null;
	o.cellWidth    = 10;
	o.cellHeight   = 8;
   o.onBuildDrop  = FColorPickerEditor_onBuildDrop;
	o.onKeyDown    = FColorPickerEditor_onKeyDown;
	o.onCellSelect = FColorPickerEditor_onCellSelect;
	o.makeCell     = FColorPickerEditor_makeCell;
	o.set          = FColorPickerEditor_set;
	o.show         = FColorPickerEditor_show;
	o.hide         = FColorPickerEditor_hide;
	o.linkControl  = FColorPickerEditor_linkControl;
	return o;
}
function FColorPickerEditor_onBuildDrop(){
   var o = this;
   o.hTable = RBuilder.appendTable(o.hDropPanel);
   for(var i = 0; i < 2; i++){
      for(var j = 0; j < 6; j++){
         var hRow = o.hTable.insertRow();
         o.makeCell(hRow, "#000000");
         if (i == 0){
            o.makeCell(hRow, '#'+o.ColorHex[j] + o.ColorHex[j] + o.ColorHex[j]);
         }else {
            o.makeCell(hRow, '#'+o.SpColorHex[j]);
         }
         o.makeCell(hRow, "#000000");
         for (k = 0; k < 3; k++) {
            for (l = 0; l < 6; l++) {
               o.makeCell(hRow, '#'+o.ColorHex[k + i * 3] + o.ColorHex[l] + o.ColorHex[j]);
            }
         }
      }
   }
}
function FColorPickerEditor_linkControl(c){
   var o = this;
   if(o.source == c){
      return false;
   }
   o.source = c;
   RLog.debug(o, 'link Panel (panel={0}, edit={1})', RClass.dump(c.hEditCell), RClass.dump(c.hEdit));
   RHtml.toRect(o.rect, c.hEditCell);
   RHtml.setPixelRect(o.hPanel, o.rect);
   o.hPanel.style.pixelTop = o.rect.bottom;
   var hbf = o.border.hForm;
   hbf.style.pixelWidth = c.editBorder.hForm.width;
   hbf.style.pixelHeight = c.editBorder.hForm.height;
   return true;
}
function FColorPickerEditor_onCellEnter(e){
	var o = this;
	o.editable.hDrop.style.backgroundColor = e.hSource.style.backgroundColor;
}
function FColorPickerEditor_onCellSelect(e){
	var o = this;
	o.color = e.srcElement.style.backgroundColor;
	o.editStatus = EEditStatus.Ok
	o.blur();
}
function FColorPickerEditor_makeCell(hRow, color) {
	var o = this;
	var h = hRow.insertCell();
	h.link = o;
	h.width = o.cellWidth;
	h.height = o.cellHeight;
   h.style.backgroundColor = color;
   o.attachEvent('onCellEnter', h);
   o.attachEvent('onCellSelect', h);
	return h;
}
function FColorPickerEditor_onKeyDown(e){
   alert(FColorPickerEditor_onKeyDown);
	var o = this;
	var kc = e.keyCode;
	if(EKey.Up == kc){
		o.select(o.selectIndex-1);
	}else if(EKey.Down == kc){
		o.select(o.selectIndex+1);
	}else if(EKey.Esc == kc){
		o.editStatus = EEditStatus.Cancel;
		o.selectIndex = o.originIndex;
		RKey.eventClear(e);
		o.inEdit = false;
		o.hEdit.blur();
	}else if(EKey.Enter == kc){
		o.editStatus = EEditStatus.Ok;
		RKey.eventClear(e);
		o.inEdit = false;
		o.hEdit.blur();
	}
}
function FColorPickerEditor_set(v){
	var o = this;
	o.color = v;
}
function FColorPickerEditor_show(v){
   var o = this;
   o.base.FDropEditor.show.call(o, v);
   RConsole.find(FFocusConsole).focus(o);
   if(o.border.hForm.offsetWidth < o.MinWidth){
      o.border.hForm.style.pixelWidth = o.MinWidth;
   }
   o.base.MShadow.show.call(o, v);
   o.isSkipBlur = false;
}
function FColorPickerEditor_hide(){
   var o = this;
   o.source = null;
   o.base.FDropEditor.hide.call(o);
   o.base.MShadow.hide.call(o);
}
function FConfigAction(o){
	o = RClass.inherits(this, o, FComponent, MInvoke);
	o.service   = RClass.register(o, new TPtyStr('service'));
	o.isLoading = false;
	o.service   = null;
	o.valuable  = null;
	o.onLoaded  = FConfigAction_onLoaded;
	o.invoke    = FConfigAction_invoke;
	return o;
}
function FConfigAction_onLoaded(e){
	var o = this;
	var r = RConsole.find(FResultConsole).checkService(e.document.root());
	if(r){
		RWindow.setEnable(true);
		var v = o.valuable;
		if(RClass.isClass(v, MFocus)){
			v.focus();
		}
	}
	o.isLoading = false;
}
function FConfigAction_invoke(vo){
	var o = this;
	RClass.checkClass(vo, MConfig);
	var svc = RService.parse(this.service);
	if(!svc){
		return alert('Unknown service');
	}
	RWindow.setEnable(false);
	var doc = new TXmlDoc();
	var root = doc.root();
	root.set('action', svc.action);
	RConsole.find(FEnvConsole).build(root);
	var config = root.create('Data');
	if(RClass.isClass(vo, FContainer)){
		vo.storeConfig(config);
	}else{
		vo.saveConfig(config);
	}
	RLog.debug(this, doc.dump());
	o.valuable = vo;
	o.isLoading = true;
	var e = new TEvent(o, EXmlEvent.Send, o.onLoaded);
	e.url = svc.url;
	e.document = doc;
	RConsole.find(FXmlConsole).process(e);
}
function FDataAction(o){
	o = RClass.inherits(this, o, FComponent, MInvoke);
	o.service   = RClass.register(o, new TPtyStr('service'));
	o.isLoading = false;
	o.service   = null;
	o.valuable  = null;
	o.onLoaded  = FDataAction_onLoaded;
	o.invoke    = FDataAction_invoke;
	return o;
}
function FDataAction_onLoaded(e){
	var o = this;
	var r = RConsole.find(FResultConsole).checkService(e.document.root());
	if(r){
		RWindow.setEnable(true);
		var v = o.valuable;
		if(RClass.isClass(v, MFocus)){
			v.focus();
		}
	}
	o.isLoading = false;
}
function FDataAction_invoke(vo){
	var o = this;
	RClass.checkClass(vo, MValue);
	var svc = RService.parse(this.service);
	if(!svc){
		return alert('Unknown service');
	}
	RWindow.setEnable(false);
	var doc = new TXmlDoc();
	var root = doc.root();
	root.set('action', svc.action);
	RConsole.find(FEnvConsole).build(root);
	var config = root.create('Data');
	vo.saveValue(config);
	RLog.debug(this, doc.dump());
	o.valuable = vo;
	o.isLoading = true;
	var e = new TEvent(o, EXmlEvent.Send, o.onLoaded);
	e.url = svc.url;
	e.document = doc;
	RConsole.find(FXmlConsole).process(e);
}
function FEdit(o){
	o = RClass.inherits(this, o, FEditControl, MEditBorder, MDescEdit, MListView);
	o.styleUnit      = RClass.register(o, new TStyle('Unit'));
	o.hUnit          = null;
	o.border         = null;
	o.borderStyle    = EBorderStyle.Round;
	o.onBuildEdit    = FEdit_onBuildEdit;
	o.onDataKeyDown  = FEdit_onDataKeyDown;
	o.onBuildControl = FEdit_onBuildControl;
	o.formatValue    = FEdit_formatValue;
	o.findEditor     = FEdit_findEditor;
	o.set            = FEdit_set;
	o.drop           = FEdit_drop;
	return o;
}
function FEdit_onBuildEdit(b){
	var o = this;
	var h = o.hEdit = RBuilder.appendEdit(b.hPanel, o.style('Edit'));
	if(o.editLength){
		h.maxLength = o.editLength;
	}
}
function FEdit_onBuildControl(){
   var o = this;
   o.base.FEditControl.onBuildControl.call(o);
   if(o.editUnit){
      var h = o.hUnit = o.hControlRow.insertCell();
      h.className = o.style('Unit');
      h.innerText = o.editUnit;
   }
}
function FEdit_onDataKeyDown(s, e){
	var o = this;
	o.base.FEditControl.onDataKeyDown.call(o, s, e);
	if(o.editCase){
		RKey.fixCase(e, o.editCase);
	}
	if(o.editComplete){
		o.findEditor().onEditKeyDown(s, e);
	}
}
function FEdit_formatValue(s){
	return RStr.nvl(s);
}
function FEdit_findEditor(){
	var o = this;
	if(o.editComplete){
		var de = o.editor;
		if(!de){
			o.dsControl = o.topControl(MDataset);
			if(o.dsControl){
				de = o.editor = RConsole.find(FEditConsole).focus(o, FEditEditor);
			}
		}
		de.linkControl(o);
		return o.editor;
	}
}
function FEdit_drop(){
	var o = this;
	var de = o.findEditor();
	if(de){
		var t = o.reget();
		if(t.length > 0){
			if(o.finded != t){
				if(de.source != o){
					de.linkControl(o);
				}
				de.search(t);
			}
			o.finded = t;
		}
	}
}
function FEdit_set(v){
	var o = this;
	o.base.FEditControl.set.call(o, v);
	o.finded = v;
}
function FEditControl(o){
   o = RClass.inherits(this, o, FControl, MDesign, MFocus, MMode, MEditDescriptor, MEditValue);
   o.dataType          = RClass.register(o, new TPtyStr('dataType'));
   o.labelType         = RClass.register(o, new TPtyStr('labelType', ELabel.All));
   o.labelPosition     = RClass.register(o, new TPtyStr('labelPosition', EPosition.Left));
   o.labelWidth        = RClass.register(o, new TPtyStr('labelWidth'));
   o.labelHeight       = RClass.register(o, new TPtyStr('labelHeight'));
   o.editWidth         = RClass.register(o, new TPtyStr('editWidth'));
   o.editHeight        = RClass.register(o, new TPtyStr('editHeight'));
   o.stForm            = RClass.register(o, new TStyle('Form'));
   o.stLabelForm       = RClass.register(o, new TStyle('LabelForm'));
   o.stEditForm        = RClass.register(o, new TStyle('EditForm'));
   o.stControlForm     = RClass.register(o, new TStyle('ControlForm'));
   o.stEdit            = RClass.register(o, new TStyle('Edit'));
   o.stEditUnit        = RClass.register(o, new TStyle('EditUnit'));
   o.stDropPanel       = RClass.register(o, new TStyle('DropPanel'));
   o.hForm             = null;
   o.hFormRow          = null;
   o.hLabelForm        = null;
   o.hLabelRow         = null;
   o.hIcon             = null;
   o.hLabel            = null;
   o.hControlForm      = null;
   o.hControlRow       = null;
   o.border            = null;
   o.borderStyle       = EBorderStyle.None;
   o.oeBuild           = FEditControl_oeBuild;
   o.oeDesign          = FEditControl_oeDesign;
   o.oeMode            = FEditControl_oeMode;
   o.onDesignBegin     = FEditControl_onDesignBegin;
   o.onDesignEnd       = FEditControl_onDesignEnd;
   o.onDataDoubleClick = FEditControl_onDataDoubleClick;
   o.onDataKeyDown     = FEditControl_onDataKeyDown;
   o.onBuildLabel      = FEditControl_onBuildLabel;
   o.onBuildEdit       = RMethod.virtual(o, 'onBuildEdit');
   o.onBuildControl    = FEditControl_onBuildControl;
   o.onBuildPanel      = FEditControl_onBuildPanel;
   o.doFocus           = FEditControl_doFocus;
   o.doBlur            = FEditControl_doBlur;
   o.descriptor        = FEditControl_descriptor;
   o.panel             = FEditControl_panel;
   o.setLabel          = FEditControl_setLabel;
   o.setEditStyle      = FEditControl_setEditStyle;
   o.testFocus         = FEditControl_testFocus;
   o.focus             = FEditControl_focus;
   o.text              = FEditControl_text;
   o.setText           = FEditControl_setText;
   return o;
}
function FEditControl_descriptor(){
   return this;
}
function FEditControl_oeBuild(e){
   var o = this;
   if(o.labelWidth && o.editWidth && o.width){
      if(RInt.parse(o.width) < RInt.parse(o.labelWidth) + RInt.parse(o.editWidth)){
         o.width = null;
      }
   }
   o.base.FControl.oeBuild.call(o, e);
   var hl = null;
   var hc = null;
   var ht = o.hForm;
   if(ELabel.Label == o.labelType){
      hl = o.hFormRow = ht.insertRow().insertCell();
   }else if(ELabel.Hidden == o.labelType){
      hc = o.hFormRow = ht.insertRow().insertCell();
   }else{
      if(EPosition.Top == o.labelPosition){
         hl = ht.insertRow().insertCell();
         hc = ht.insertRow().insertCell();
      }else if(EPosition.Right == o.labelPosition){
         var hRow = ht.insertRow();
         hc = hRow.insertCell();
         hl = hRow.insertCell();
      }else if(EPosition.Bottom == o.labelPosition){
         hc = ht.insertRow().insertCell();
         hl = ht.insertRow().insertCell();
      }else{
         var hRow = o.hFormRow = ht.insertRow();
         hl = hRow.insertCell();
         hc = hRow.insertCell();
      }
   }
   if(hl){
      o.onBuildLabel();
      if(o.labelWidth){
         hl.style.width = o.labelWidth;
      }
      if(o.labelHeight){
         hl.style.height = o.labelHeight;
      }
      if(o.labelAlign){
         hl.align = o.labelAlign;
      }
      hl.appendChild(o.hLabelForm);
   }
   if(hc){
      o.onBuildControl();
      hc.appendChild(o.hControlForm);
   }
   return EEventStatus.Stop;
}
function FEditControl_oeDesign(e){
   var o = this;
   o.base.MDesign.oeDesign.call(o, e);
   var hlf = o.hLabelForm;
   var hef = o.hEditForm;
   switch(e.mode){
      case EDesign.Move:
         if(e.flag){
            o.hForm.border = 1;
            if(hlf){
               hlf.cellPadding = 1;
            }
            if(hef){
            }
            o.hEdit.disabled = true;
         }else{
            o.hForm.border = 0;
            if(hlf){
               hlf.border = 0;
               hlf.cellPadding = 0;
            }
            if(hef){
            }
            o.hEdit.disabled = false;
         }
         break;
      case EDesign.Border:
         if(e.flag){
            o.hForm.border = 1;
            if(hef){
               hef.border = 1;
            }
         }else{
            o.hForm.border = 0;
            if(hef){
               hef.border = 0;
            }
         }
         break;
   }
   return EEventStatus.Stop;
}
function FEditControl_oeMode(e){
   var o = this;
   o.base.FControl.oeMode.call(o, e);
   var m = e.mode;
   if(EMode.Search == m){
      o.setEditable(true);
   }else if(EMode.Insert == m){
      o.setEditable(o.editInsert);
      o.set(RStr.nvl(o.dataDefault));
      o.canValid = o.validInsert;
   }else if(EMode.Update == m){
      o.setEditable(o.editUpdate);
      o.canValid = o.validUpdate;
   }else if(EMode.Delete == m){
      o.setEditable(o.editDelete);
      o.canValid = o.validDelete;
   }
   return EEventStatus.Stop;
}
function FEditControl_onDesignBegin(){
   var o = this;
   o.base.MDesign.onDesignBegin.call(o);
   o.hEdit.disbaled = true;
}
function FEditControl_onDesignEnd(){
   var o = this;
   o.base.MDesign.onDesignEnd.call(o);
   o.hEdit.disbaled = false;
}
function FEditControl_onDataDoubleClick(){
   var o = this;
   if(RClass.isClass(o, MDropable)){
      o.onDropDoubleClick();
   }
   if(RClass.isClass(o, MListView)){
      o.onListClick();
   }
}
function FEditControl_onDataKeyDown(s, e){
   var o = this;
   o.base.MEditDescriptor.onDataKeyDown.call(o, s, e)
   if(RClass.isClass(o, MDropable) && EKey.Down==e.keyCode){
      o.onDropDoubleClick();
   }else if(e.ctrlKey && (EKey.Enter==e.keyCode) && o.editSearch){
      var dc = o.dsControl;
      if(dc){
         if(!o.isValid){
            var sn = new TNode('Search');
            var n = sn.create('Item');
            n.set('name', o.name);
            n.set('data_name', o.dataName);
            n.set('data_value', o.dataValue);
            n.set('search_type', ESearch.Equals);
            n.set('search_order', EOrder.None);
            RConsole.find(FDatasetConsole).fetch(dc, sn);
         }
      }
   }
}
function FEditControl_onBuildLabel(){
   var o = this;
   var h = o.hLabelForm = RBuilder.newTable(null, o.style('LabelForm'));
   var hr = o.hLabelRow = h.insertRow();
   var hc = hr.insertCell();
   hc.width = 20;
   if(o.labelIcon){
      o.hIcon = RBuilder.appendIcon(hc, o.labelIcon);
   }
   var hc = o.hLabel = hr.insertCell();
   hc.noWrap = true;
   o.setLabel(o.label);
   if(o.hLabel && o.validRequire){
      o.hLabel.style.color = EColor.Require;
   }
}
function FEditControl_onBuildControl(){
   var o = this;
   var h = o.hControlForm = RBuilder.newTable(null, o.style('ControlForm'));
   o.hControlRow = h.insertRow();
   var hc = o.hEditCell = o.hControlRow.insertCell();
   if(o.base.MEditBorder){
      o.onBuildEditBorder(o.hEditCell);
      var b = o.editBorder
      o.onBuildEdit(b);
      if(o.base.MDropable){
         o.onBuildDrop();
         b.hDrop.appendChild(o.hDrop);
      }
   }else{
      o.onBuildEdit(hc);
   }
   var h = o.hEdit;
   if(h && o.hint){
      h.title = o.hint;
   }
   o.linkEvent(o, 'onFocus', h);
   o.linkEvent(o, 'onBlur', h);
   o.linkEvent(o, 'onDataDoubleClick', h);
   o.linkEvent(o, 'onDataKeyDown', h);
   o.linkEvent(o, 'onDataChange', h);
}
function FEditControl_onBuildPanel(){
   var o = this;
   o.hPanel = o.hForm = RBuilder.newTable(o.hPanel, o.style('Form'));
}
function FEditControl_doFocus(e){
   var o = this;
   o.base.MFocus.doFocus.call(o, e);
   o.base.MEditValue.doFocus.call(o, e);
}
function FEditControl_doBlur(e){
   var o = this;
   o.base.MFocus.doBlur.call(o, e);
   o.base.MEditValue.doBlur.call(o, e);
}
function FEditControl_panel(type){
   var o = this;
   if(EPanel.Edit == type){
      return o.hEdit;
   }else if(EPanel.Focus == type){
      return o.hEdit;
   }
   return o.base.FControl.panel.call(o, type);
}
function FEditControl_setLabel(s){
   var o = this;
   o.label = s;
   o.hLabel.innerText = RStr.nvl(s);
}
function FEditControl_setEditStyle(t){
   var o = this;
   var h = o.hEdit;
   var c = EColor.Readonly;
   var tc = EColor.TextReadonly;
   if(o.isEditAble()){
      var vt = o.validText(o.text());
      c = vt ? EColor.Edit : EColor.Invalid;
      tc = vt ? EColor.TextEdit : EColor.TextInvalid;
   }
   h.readOnly = !o.canEdit;
   h.style.color = tc;
   h.style.backgroundColor = c;
   if(o.base.MEditBorder){
      var h = o.isEditHover(t);
      o.setEditBorderStyle(t, c);
   }
}
function FEditControl_testFocus(){
   var o = this;
   return o.isVisible() && !o.disabled && o.isEditAble();
}
function FEditControl_focus(e){
   var o = this;
   o.base.MFocus.focus.call(o, e);
   o.hEdit.focus();
}
function FEditControl_text(){
   return this.hEdit.value;
}
function FEditControl_setText(t){
   this.hEdit.value = t;
}
function FEditEditor(o){
	o = RClass.inherits(this, o, FDropEditor, MShadow);
	o.MinWidth          = 120;
	o.MaxCount          = 20;
	o.onEditFocus       = RClass.register(o, new HFocus('onEditFocus'));
	o.onEditBlur        = RClass.register(o, new HBlur('onEditBlur'));
	o.stIconDropSelect  = RClass.register(o, new TStyleIcon('DropSelect'));
	o.stFlag            = RClass.register(o, new TStyle('Flag'));
	o.stRow             = RClass.register(o, new TStyle('Row'));
	o.stRowHover        = RClass.register(o, new TStyle('RowHover'));
	o.stRowSelect       = RClass.register(o, new TStyle('RowSelect'));
	o.stEditForm        = RClass.register(o, new TStyle('EditForm'));
	o.stItemsForm       = RClass.register(o, new TStyle('ItemsForm'));
	o.pattern           = null;
	o.originItem        = null;
	o.selectItem        = null;
	o.items             = null;
	o.inSearch          = false;
	o.position          = null;
	o.itemClickListener = null;
	o.onBuildDrop       = FEditEditor_onBuildDrop;
	o.onItemClick       = FEditEditor_onItemClick;
	o.onComplete        = FEditEditor_onComplete;
	o.onEditKeyDown     = FEditEditor_onEditKeyDown;
	o.construct         = FEditEditor_construct;
	o.search            = FEditEditor_search;
	o.select            = FEditEditor_select;
	o.linkControl       = FEditEditor_linkControl;
	o.show              = FEditEditor_show;
	o.hide              = FEditEditor_hide;
	return o;
}
function FEditEditor_onBuildDrop(){
	var o = this;
	o.hItemsForm = RBuilder.appendTable(o.hDropPanel, o.style('ItemsForm'));
	var hip = o.hItemsPanel = RBuilder.append(o.hItemsForm, 'TBODY');
	for(var n=0; n<o.MaxCount; n++){
		var hr = null;
		if(n > 0){
			hr = RBuilder.append(hip, 'TR');
			hr.height = 1;
			hr.style.display = 'none';
			var hd = RBuilder.append(hr, 'TD');
			hd.colSpan = 3;
			hd.style.borderTop = '1 dashed #24c2db';
			RBuilder.appendEmpty(hd);
		}
		var c = RControl.create(FSelectItem);
		c.setPanel(hip);
		c.name = null;
		c.setVisible(false);
		c.hSplitRow = hr;
		c.lsnsClick.push(o.itemClickListener);
		o.push(c);
	}
}
function FEditEditor_onItemClick(s){
	var o = this;
	var e = o.source;
	e.set(s.label);
	o.source = null;
	o.hide();
}
function FEditEditor_onComplete(xr){
	var o = this;
	o.inSearch = false;
	var nc = xr.nodes ? xr.nodes.count : 0;
	if(0 == nc){
		return o.hide();
	}
	var t = o.source.reget();
	o.position = 0;
	o.count = nc;
	for(var n=0; n<o.MaxCount; n++){
		var x = xr.nodes ? xr.nodes.get(n) : null;
		var c  = o.components.value(n);
		var hr = c.hSplitRow;
		if(n < nc){
			if(hr){
				hr.style.display = 'block';
			}
			var xd = x.get('data');
			if(t == xd){
				o.position = n;
			}
			c.set(null, xd, null, '[' + x.get('count') + ']');
			c.setChecked(t == xd);
		}else{
			if(hr){
				hr.style.display = 'none';
			}
		}
		c.setVisible(n < nc);
	}
	o.show();
}
function FEditEditor_onEditKeyDown(s, e){
	var o = this;
	var kc = e.keyCode;
	if(EKey.Up == kc){
		o.select(o.position - 1);
	}else if(EKey.Down == kc){
		o.select(o.position + 1);
	}else if(EKey.Enter == kc){
		var c = o.components.value(o.position);
		o.source.set(c.label);
		o.blur();
	}else if(EKey.Esc == kc){
		o.blur();
	}else if(EKey.Left == kc || EKey.Right == kc || EKey.Home == kc || EKey.End == kc){
		return;
	}else{
		o.search(o.source.reget());
	}
}
function FEditEditor_construct(){
	var o = this;
	o.itemClickListener = new TListener(o, o.onItemClick);
}
function FEditEditor_search(t){
	var o = this;
	if(RStr.isEmpty(t)){
		return o.hide();
	}
	if(!o.inSearch){
		o.formName = o.source.dsControl.name;
		o.controlName = o.source.name;
		o.controlValue = t;
		o.inSearch = true;
		RConsole.find(FCompleteConsole).search(o);
	}
}
function FEditEditor_select(p){
	var o = this;
	p = Math.min(Math.max(0, p), o.count-1)
	for(var n=0; n<o.count; n++){
		o.components.value(n).setChecked(n == p);
	}
	o.position = p;
}
function FEditEditor_linkControl(c){
	var o = this;
	if(o.source == c){
		return false;
	}
	o.source = c;
	RLog.debug(o, 'link Panel (panel={0}, edit={1})', RClass.dump(c.hEditCell), RClass.dump(c.hEdit));
	RHtml.toRect(o.rect, c.hEditCell);
	RHtml.setPixelRect(o.hPanel, o.rect);
	o.hPanel.style.pixelTop = o.rect.bottom;
	var hbf = o.border.hForm;
	hbf.style.pixelWidth = c.editBorder.hForm.width;
	hbf.style.pixelHeight = c.editBorder.hForm.height;
	return true;
}
function FEditEditor_show(v){
	var o = this;
	o.base.FDropEditor.show.call(o, v);
	RConsole.find(FFocusConsole).focus(o);
	var hbf = o.border.hForm;
	if(hbf.offsetWidth < o.MinWidth){
		hbf.style.pixelWidth = o.MinWidth;
	}
	o.base.MShadow.show.call(o, v);
	o.isSkipBlur = false;
}
function FEditEditor_hide(){
	var o = this;
	o.base.FDropEditor.hide.call(o);
	o.base.MShadow.hide.call(o);
}
function FEvent(o){
	o = RClass.inherits(this, o, FComponent);
   o.source = RClass.register(o, new TPtyStr('source'));
   o.code   = RClass.register(o, new TPtyStr('code'));
   o.form   = RClass.register(o, new TPtyStr('form'));
	return o;
}
function FForm(o){
	o = RClass.inherits(this, o, FPanel, MForm, MDisplayAble, MValue, MDataset, MAction);
	o.isLoading       = false;
	o.focus           = null;
   o.lsnsLoaded      = new TListeners();
   o.lsnsClick       = new TListeners();
	o.onLoaded        = FForm_onLoaded;
	o.onDsFetchEnd    = FForm_onDsFetchEnd;
	o.onDsUpdateBegin = FForm_onDsUpdateBegin;
	o.onDsUpdateEnd   = FForm_onDsUpdateEnd;
	o.onLoadValue     = RMethod.empty;
	o.onSaveValue     = RMethod.empty;
	o.onLoadDataset   = FForm_onLoadDataset;
	o.getFormName     = FForm_getFormName;
	o.getTableName    = FForm_getTableName;
	o.connect         = FForm_connect;
	o.dsUpdate        = FForm_dsUpdate
	o.loadDocument    = FForm_loadDocument;
	o.focus           = FForm_focus;
	o.testStatus      = FForm_testStatus;
	o.reloadValue     = FForm_reloadValue;
	o.loadValue       = FForm_loadValue;
	o.saveValue       = FForm_saveValue;
	return o;
}
function FForm_onStoreChanged(xds){
	var o = this;
	var r = o.dsGet;
	for(var n=0; n<rs.count; n++){
		var r = rs.get(n);
		if(r.isChanged()){
			if(EDataStatus.Insert != r.status && EDataStatus.Delete != r.status){
				r.status = EDataStatus.Update;
			}
			xds.push(new TNode('Row', r.toAttrs()));
		}
	}
}
function FForm_onMouseDown(e){
	RConsole.find(FFocusConsole).focusClass(MDataset, this, e);
}
function FForm_onLoaded(){
	var o = this.form;
	var doc = this.document;
	if(o && doc){
		RControl.build(o, doc.root());
		o.isLoading = false;
		o.lsnsLoaded.process(o);
	}
}
function FForm_onDsFetchEnd(){
	var o = this;
	var v = o.dsCurrent();
	if(v){
		o.loadValue(v);
	}
}
function FForm_onDsUpdateBegin(){
	var o = this;
	var v = o.dsCurrent();
	if(v){
		o.saveValue(v);
	}
}
function FForm_onDsUpdateEnd(){
	var o = this;
	var v = o.dsCurrent();
	if(v){
		o.loadValue(v);
	}
}
function FForm_onLoadDataset(ds){
	if(1 == ds.count){
		this.loadValue(ds.row(0));
	}
}
function FForm_getFormName(){
	return this.name;
}
function FForm_getTableName(){
	return this.formName;
}
function FForm_connect(service, type, action, attrs){
	var doc = new TXmlDoc();
	var root = doc.root();
	root.set('type', type);
	root.set('name', this.name);
	root.set('action', action);
	root.create('Attributes').value = attrs;
   var event = new TEvent(this, EXmlEvent.Send);
	event.url = service;
   event.document = doc;
   event.form = this;
	event.onLoad = this.onLoaded;
   RConsole.find(FXmlConsole).process(event);
}
function FForm_dsUpdate(){
	var o = this;
	var ps = o.components;
	for(var n=0; n<ps.count; n++){
		var p = ps.value(n);
		if(RClass.isClass(p, MValue)){
			if(p.inValid){
				RMsg.warn(o, RContext.get(MDataset, 'valid'));
				p.focus();
				return false;
			}
		}
	}
	o.base.MDataset.dsUpdate.call(o);
}
function FForm_loadDocument(doc){
	if(doc){
		var root = doc.root();
		if(root.isName('Table')){
			var o = this;
			o.loadConfig(root);
			o.buildColumns(root);
			o.buildRows(root);
		}
	}
}
function FForm_focus(){
	var o = this;
	o.focusControl();
	RConsole.find(FFocusConsole).focusClass(MDataset, this);
}
function FForm_testStatus(t){
	var o = this;
	var r = o.base.MDataset.testStatus.call(o, t);
	if(EDataAction.Fetch == t){
		return true;
	}else if(EDataAction.Fetch == t){
		return true;
	}else if(EDataAction.Search== t){
		return true;
	}else if(EDataAction.First == t){
		return false;
	}else if(EDataAction.Prior == t){
		return false;
	}else if(EDataAction.Next == t){
		return false;
	}else if(EDataAction.Last == t){
		return false;
	}else if(EDataAction.Action == t){
		return true;
	}
	return r;
}
function FForm_loadValue(c, t){
	var o = this;
	var ps = o.components;
	if(c && ps){
		for(var n=0; n<ps.count; n++){
			var p = ps.value(n);
			if(RClass.isClass(p, MValue)){
				p.loadValue(c, t);
			}
		}
	}
}
function FForm_saveValue(c, t){
	var o = this;
	var ps = o.components;
	if(c && ps){
		for(var n=0; n<ps.count; n++){
			var p = ps.value(n);
			if(RClass.isClass(p, MValue)){
				p.saveValue(c, t);
			}
		}
	}
}
function FForm_reloadValue(){
	this.loadValue(this.dsStore.row(0));
}
function FHtmlMemo(o){
   o = RClass.inherits(this, o, FEditControl);
   o.editOverflow   = RClass.register(o, new TPtyStr('editOverflow'));
   o.onBuildEdit    = FHtmlMemo_onBuildEdit;
   o.formatText     = FHtmlMemo_formatText;
   o.setText        = FHtmlMemo_setText;
   return o;
}
function FHtmlMemo_onBuildEdit(hc){
   var o = this;
   var h = o.hEdit = RBuilder.appendDiv(hc, o.style('Edit'));
   h.style.overflowY = 'auto';
   if(RStr.equals(o.editOverflow,'N')){
      h.wrap ='off';
      h.style.overflowX = 'auto';
   }
   if(RStr.equals(o.editOverflow,'Y')){
      h.style.overflowX = 'auto';
   }
   var v = o.dataDefault;
   if(v){
      o.setText(o.formatText(v));
   }
}
function FHtmlMemo_formatText(v){
   return RStr.nvl(v);
}
function FHtmlMemo_setText(text){
   this.hEdit.innerHTML = text;
}
function FIconPicker(o){
	o = RClass.inherits(this, o, FEditControl, MEditBorder, MListView);
	o.iconDefault    = RClass.register(o, new TPtyStr('iconDefault'));
	o.stIconDefault  = RClass.register(o, new TStyleIcon('Default'));
   o.hEditIcon      = null;
   o.borderStyle    = EBorderStyle.RoundIcon;
	o.onEditKeyDown  = FIconPicker_onEditKeyDown;
	o.onEditKeyPress = FIconPicker_onEditKeyPress;
	o.onBuildEdit    = FIconPicker_onBuildEdit;
	o.setText        = FIconPicker_setText;
	return o;
}
function FIconPicker_onEditKeyDown(e){
   var o = this;
   o.base.FEditControl.onEditKeyDown.call(o,e);
   o.hEditIcon.src = RRes.iconPath(RStr.nvl(o.text(), o.styleIcon("Default")));
}
function FIconPicker_onEditKeyPress(e){
	var o = this;
	o.base.FEditControl.onEditKeyPress.call(o, e);
	if(o.editCase){
		RKey.fixCase(e, o.editCase);
	}
}
function FIconPicker_onBuildEdit(b){
	var o = this;
	var h = b.hPanel;
	b.hIcon.width = 18;
	h.align = 'center';
	var hi = RStr.nvl(o.iconDefault, o.styleIcon("Default"));
	o.hEditIcon = RBuilder.newIcon(h, hi);
	var h = o.hEdit = RBuilder.appendEdit(h, o.style('Edit'));
	h.autocomplete = RBool.isTrue(o.editComplete) ? 'on' : 'off';
	if(o.editLength){
		h.maxLength = o.editLength;
	}
}
function FIconPicker_setText(t){
	var o = this;
	o.base.FEditControl.setText.call(o, t);
	o.hEditIcon.src = RRes.iconPath(RStr.nvl(o.text(), o.styleIcon("Default")));
}
function FLabel(o){
	o = RClass.inherits(this, o, FDataControl);
	o.onBuildEdit   = FLabel_onBuildEdit;
	o.loadConfig    = FLabel_loadConfig;
	o.saveConfig    = FLabel_saveConfig;
	o.text          = FLabel_text;
	o.setText       = FLabel_setText;
	return o;
}
function FLabel_onBuildEdit(){
	this.hEdit = RBuilder.newEdit(this.parent.hPanel);
}
function FLabel_loadConfig(config){
	this.base.FDataControl.loadConfig.call(this, config);
}
function FLabel_saveConfig(config){
	this.base.FDataControl.saveConfig.call(this, config)
}
function FLabel_text(){
	return this.hEdit.value;
}
function FLabel_setText(text){
	this.hEdit.value = text;
}
function FListBox(o){
	o = RClass.inherits(this, o, FPanel, MHorizontal);
	o.lsnsClick   = new TListeners();
	o.appendLine  = FListBox_appendLine;
	return o;
}
function FListBox_appendLine(){
	var h = this.hPanelTable = RBuilder.appendTable(this.hContainer, null, 10, 10, 10);
	this.hPanelLine = this.hPanelTable.insertRow();
	return h;
}
function FListItem(o){
	o = RClass.inherits(this, o, FControl, MDesign, MHorizontal);
	o.styleForm    = RClass.register(o, new TStyle('Form'));
	o.styleIcon    = RClass.register(o, new TStyle('Icon'));
	o.styleLabel   = RClass.register(o, new TStyle('Label'));
	o.oeBuild      = FListItem_oeBuild;
	o.onBuildPanel = FListItem_onBuildPanel;
	o.formatValue  = FListItem_formatValue;
	o.text         = FListItem_text;
	o.setText      = FListItem_setText;
	return o;
}
function FListItem_oeBuild(event){
	var o = this;
	o.base.FControl.oeBuild.call(o, event);
	if(event.isBefore()){
		var hTab = o.hForm = RBuilder.appendTable(o.hPanel, o.style('Form'));
		var hRow = hTab.insertRow();
		var hCell = hRow.insertCell();
		hCell.className = o.style('Icon');
		o.hIcon = RBuilder.appendIcon(hCell, 'arrow');
		var hCell = hRow.insertCell();
		var h = o.hLabel = RBuilder.append(hCell, 'SPAN', o.style('Label'));
		h.innerText = o.label;
	}
}
function FListItem_onBuildPanel(){
	this.hPanel = RBuilder.create(null, 'DIV');
}
function FListItem_formatValue(s){
	return RStr.nvl(s);
}
function FListItem_text(){
	return this.hEdit.value;
}
function FListItem_setText(text){
	this.hEdit.value = text;
}
function FListView(o){
	o = RClass.inherits(this, o, FContainer, MShadow);
	o.type           = null;
	o.lovControl     = null;
	o.listView       = null;
	o.hForm          = null;
	o.hMessages      = null;
	o.ohClearClick   = FListView_ohClearClick;
	o.ohCloseClick   = FListView_ohCloseClick;
	o.ohResetClick   = FListView_ohResetClick;
	o.ohLoaded       = FListView_ohLoaded;
	o.oeBuild        = FListView_oeBuild;
	o.onBuildPanel   = FListView_onBuildPanel;
	o.onBuildFields  = FListView_onBuildFields;
	o.onBuildButton  = FListView_onBuildButton;
	o.onBuildData    = FListView_onBuildData;
	o.onKeyDown      = FListView_onKeyDown;
	o.buildField     = FListView_buildField;
	o.linkLovControl = FListView_linkLovControl;
	o.isBuilded      = FListView_isBuilded;
	o.show           = FListView_show;
	o.hide           = FListView_hide;
	o.doSearch       = FListView_doSearch;
	o.selectRow      = FListView_selectRow;
	return o;
}
function FListView_ohCloseClick(){
	this.hide();
}
function FListView_ohClearClick(){
	var o = this;
	var cs = o.fieldsPanel.components;
	if(cs){
		for(var n=0; n<cs.count; n++){
			cs.value(n).clearSearch();
		}
	}
}
function FListView_ohResetClick(){
}
function FListView_ohLoaded(){
	this.lovControl.onBuildData(this.document.root());
}
function FListView_oeBuild(event){
	var o = this;
	o.base.FContainer.oeBuild.call(o, event);
	var hTab = RBuilder.appendTable(o.hPanel);
	hTab.width = '100%';
	hTab.height = '100%';
	var hRow = hTab.insertRow();
	var h = o.hTitlePanel = hRow.insertCell();
	h.className = o.style('TitlePanel');
	RBuilder.appendIcon(h, 'tool.search');
	RBuilder.appendText(h, '&nbsp;List of View');
	h.colSpan = 2;
	hRow = hTab.insertRow();
	var h = o.hFieldsPanel = hRow.insertCell();
	h.className = o.style('FieldsPanel');
	var h = o.hButtonPanel = hRow.insertCell();
	h.className = o.style('ButtonPanel');
	o.onBuildButton();
	return EEventStatus.Stop;
}
function FListView_onBuildPanel(){
	var o = this;
	o.hPanel = RBuilder.append(null, 'DIV');
	o.hPanel.style.zIndex = ELayer.Message;
}
function FListView_onBuildFields(){
	return;
	var o = this;
	var hTab = o.hFieldsTab = RBuilder.appendTable(o.hFieldsPanel, null, 10, 10);
	hTab.width = '100%';
	var hRow = hTab.insertRow();
	var hCel = hRow.insertCell();
	hCel.className = this.style('Title');
	hCel.innerText = 'Message:';
	var hRow = hTab.insertRow();
	var hCel = hRow.insertCell();
	hCel.className = this.style('Message');
	o.hMessages = RBuilder.appendTable(hCel);
	o.hMessages.width = '100%';
	var hRow = hTab.insertRow();
	var hCel = hRow.insertCell();
	hCel.className = this.style('Title');
	hCel.innerText = 'Description:';
	var hRow = hTab.insertRow();
	var hCel = hRow.insertCell();
	hCel.className = this.style('Description');
}
function FListView_onBuildButton(){
	var o = this;
	var hBtnTab = RBuilder.appendTable(o.hButtonPanel, null, 0, 0, 6);
	var hRow = hBtnTab.insertRow();
	var hCel = hRow.insertCell();
	var b = o.btnSelect = RClass.create(FButton);
	b.label = 'Select'
	b.width = '100%';
	b.addClickListener(o, o.selectRow);
	b.build(hBtnTab.insertRow().insertCell());
	var b = o.btnClose = RClass.create(FButton);
	b.label = 'Close';
	b.width = '100%';
	b.addClickListener(o, o.ohCloseClick);
	b.build(hBtnTab.insertRow().insertCell());
	var b = o.btnRefresh = RClass.create(FButton);
	b.label = 'Refresh';
	b.width = '100%';
	b.addClickListener(o, o.ohClearClick);
	b.build(hBtnTab.insertRow().insertCell());
	var hRow = hBtnTab.insertRow();
	var hCel = hRow.insertCell();
	hCel.innerHTML = '&nbsp;';
}
function FListView_buildField(c){
	var o = this;
	var hCell = o.hFieldsTab.insertRow().insertCell();
	hCell.innerText = c.label;
	o.fieldsPanel = RControl.create(FPanel);
	o.fieldsPanel.build();
	o.fieldsPanel.setPanel(hCel);
}
function FListView_linkLovControl(ctl){
	var o = this;
	o.lovControl = ctl;
	o.lovRefer = ctl.lovRefer;
	var doc = new TXmlDoc();
	var root = doc.root();
	root.set('action', 'dsPicker');
	RConsole.find('FEnvConsole').build(root);
	var dn = root.create('Control');
	dn.set('lov_refer', ctl.lovRefer);
	dn.set('lov_where', ctl.lovWhere);
	dn.set('lov_order', ctl.lovOrder);
	RLog.info(o, 'Send lov request (service={1},node={2})', ctl.lovRefer, root.dump());
	var e = new TEvent(o, EXmlEvent.Send);
	e.url = RService.url(ctl.lovService);
	e.document = doc;
	e.lovControl = o;
	e.onLoad = o.ohLoaded;
	RConsole.find(FXmlConsole).process(e);
}
function FListView_onBuildData(config){
	var o = this;
	var v = o.listView = RControl.fromNode(config, o.hFieldsPanel);
	v.hPanel.height = '100%';
	v.resize();
	v.addDblClickListener(o, o.selectRow);
	v.addSelectListener(o, o.selectRow);
	v.addKeyDownListener(o, o.onKeyDown);
	o.show();
}
function FListView_onKeyDown(sender, e){
	if(EKey.Esc == e.keyCode){
		this.hide();
	}
}
function FListView_show(){
	var o = this;
	if(!o.isVisible()){
		o.base.FContainer.show.call(o);
		RWindow.setEnable(false);
		RWindow.moveCenter(o.hPanel);
		o.base.MShadow.show.call(o, true);
		o.focus();
		o.listView.focus();
	}
}
function FListView_hide(){
	var o = this;
	if(o.isVisible()){
		o.base.FContainer.hide.call(o);
		o.base.MShadow.hide.call(o);
		RWindow.setEnable(true);
		o.lovControl.focus();
	}
}
function FListView_doSearch(){
	var o = this;
	var cs = o.fieldsPanel.components;
	if(cs){
		var sn = new TNode('Search');
		for(var n=0; n<cs.count; n++){
			cs.value(n).saveSearch(sn);
		}
		RLog.debug(o, 'Search value {1}', sn.dump());
	}
	o.hide();
}
function FListView_selectRow(table, row){
	var o = this;
	var fields = o.lovControl.lovFields;
	var dsCtl = o.lovControl.topControl(MDataset);
	if(dsCtl && fields){
		if(!row){
			row = o.listView.selectRow;
		}
		if(row){
			var flds = RStr.splitTwo(fields, ',');
			for(var n=0; n<flds.length; n++){
				var v = RStr.splitTwo(flds[n], ' ');
				dsCtl.dsSet(RStr.nvl(v[1], v[0]), row.get(v[0]));
			}
			dsCtl.loadValue(dsCtl.dsCurrent());
		}
	}
	o.hide();
}
function FListView_isBuilded(){
	return (null != this.listView);
}
function FMemo(o){
	o = RClass.inherits(this, o, FEditControl, MEditBorder);
	o.editComplete   = RClass.register(o, new TPtyStr('editComplete'));
	o.editCase       = RClass.register(o, new TPtyStr('editCase'));
	o.editPattern    = RClass.register(o, new TPtyStr('editPattern'));
	o.editLength     = RClass.register(o, new TPtyInt('editLength'));
	o.editFormat     = RClass.register(o, new TPtyStr('editFormat'));
	o.validLenmin    = RClass.register(o, new TPtyStr('validLenmin'));
	o.validLenmax    = RClass.register(o, new TPtyStr('validLenmax'));
	o.editOverflow   = RClass.register(o, new TPtyStr('editOverflow'));
	o.hUnit          = null;
	o.borderStyle    = EBorderStyle.Round;
	o.onBuildEdit    = FMemo_onBuildEdit;
	o.onEditKeyPress = FMemo_onEditKeyPress;
	o.onBuildControl = FMemo_onBuildControl;
	o.formatValue    = FMemo_formatValue;
	o.text           = FMemo_text;
	o.setText        = FMemo_setText;
	return o;
}
function FMemo_onBuildEdit(b){
   var o = this;
   var h = o.hEdit = RBuilder.append(b.hPanel, 'TEXTAREA', o.style('Edit'));
   h.style.overflowY = 'auto';
   if(RStr.equals(o.editOverflow,'N')){
      h.wrap ='off';
      h.style.overflowX = 'auto';
   }
   if(RStr.equals(o.editOverflow,'Y')){
      h.style.overflowX = 'auto';
   }
}
function FMemo_onBuildControl(){
   var o = this;
   o.base.FEditControl.onBuildControl.call(o);
   if(o.editUnit){
      var h = o.hUnit = o.hControlRow.insertCell();
      h.className = o.style('Unit');
      h.innerText = o.editUnit;
   }
}
function FMemo_onEditKeyPress(e){
	var o = this;
	o.base.FEditControl.onEditKeyPress.call(o, e);
	if(o.editCase){
		RKey.fixCase(e, o.editCase);
	}
}
function FMemo_formatValue(s){
	return RStr.nvl(s);
}
function FMemo_text(){
	return this.hEdit.value;
}
function FMemo_setText(text){
	this.hEdit.value = text;
}
function FMemoDrop(o){
	o = RClass.inherits(this, o, FDataEditControl, MDropable);
	o.dataMemo    = '';
	o.hForm       = null;
	o.hDrop       = null;
	o.hForm       = null;
	o.onBuildEdit = FMemoDrop_onBuildEdit;
	o.onEditEnd   = FMemoDrop_onEditEnd;
	o.loadConfig  = FMemoDrop_loadConfig;
	o.saveConfig  = FMemoDrop_saveConfig;
	o.formatValue = FMemoDrop_formatValue;
	o.formatText  = FMemoDrop_formatText;
	o.text        = FMemoDrop_text;
	o.setText     = FMemoDrop_setText;
	o.drop        = FMemoDrop_drop;
	return o;
}
function FMemoDrop_onBuildEdit(){
	var o = this;
	o.hEdit = RBuilder.create(null, 'TEXTAREA');
	o.hDrop = RBuilder.newIcon(null, 'ctl.memo');
}
function FMemoDrop_onEditEnd(editor){
	var o = this;
	RLog.debug(o, 'Begin (editor={1}:{2} value={3})', editor, editor?editor.value():'', o.dataValue);
	if(editor){
		var v = editor.value();
		var f = RStr.firstLine(v);
		o.setText(f);
		o.dataValue = v;
		o.dataMemo = v.substr(f.length);
	}
	o.base.FDataEditControl.onEditEnd.call(o);
	RLog.debug(o, 'End (editor={1} value={2})', editor, o.dataValue);
}
function FMemoDrop_onKeyDown(){
	if(EKey.Down == event.keyCode){
		this.drop();
	}
}
function FMemoDrop_onDoubleClick(){
	this.drop();
}
function FMemoDrop_loadConfig(config){
	var o = this;
	o.base.FDataEditControl.loadConfig.call(o, config);
}
function FMemoDrop_saveConfig(config){
	this.base.FDataEditControl.saveConfig.call(this, config)
}
function FMemoDrop_formatValue(s){
	return s + this.dataMemo;
}
function FMemoDrop_formatText(s){
	return RStr.firstLine(s);
}
function FMemoDrop_text(){
	return this.hEdit.value;
}
function FMemoDrop_setText(text){
	this.hEdit.value = text;
}
function FMemoDrop_drop(){
	var o = this;
	if(o.canEdit){
		o.dataValue = o.hEdit.value + o.dataMemo;
		var editor = o.editConsole.focus(o, FMemoDropEditor, o.name);
		editor.linkPanel(o.hControlPanel, o.hEdit);
		editor.setValue(o.dataValue);
		editor.show();
	}
}
function FMemoDrop_focus(){
	this.hEdit.focus();
}
function FMemoDropEditor(o){
	o = RClass.inherits(this, o, FDropEditor);
	o.MinWidth     = 240;
	o.onBuildEdit  = FMemoDropEditor_onBuildEdit;
	o.onKeyDown    = FMemoDropEditor_onKeyDown;
	o.oeShow       = FMemoDropEditor_oeShow;
	o.focus        = FMemoDropEditor_focus;
	o.value        = FMemoDropEditor_value;
	o.setValue     = FMemoDropEditor_setValue;
	return o;
}
function FMemoDropEditor_onBuildEdit(){
	var o = this;
	var hFormTab = o.hForm = RBuilder.appendTable(o.hPanel);
	var hTltCel = hFormTab.insertRow().insertCell();
	var hTab = RBuilder.appendTable(hTltCel);
	var hRow = hTab.insertRow();
	var hCel = hRow.insertCell();
	o.hEditCel = hCel;
	o.hEdit = RBuilder.append(hCel, 'INPUT', o.style('Edit'));
	var hCel = hRow.insertCell()
	o.hDrop = RBuilder.appendIcon(hCel, 'ctl.memo', o.style('Drop'));
	var hDrpCel = hFormTab.insertRow().insertCell();
	o.hDropPanel = RBuilder.append(hDrpCel, 'DIV', o.style('DropPanel'));
	o.hEditor = RBuilder.append(o.hDropPanel, 'TEXTAREA', o.style('Memo'));
	o.linkEvent(o.hEditor);
}
function FMemoDropEditor_onKeyDown(){
	var o = this;
	var kc = event.keyCode;
	if(EKey.Esc == kc){
		this.hEditor.value = o.dataValue;;
		o.editStatus = EEditStatus.Cancel;
		o.onBlur();
	}else if(event.ctrlKey && EKey.Enter == kc){
		o.editStatus = EEditStatus.Ok;
		o.onBlur();
	}
}
function FMemoDropEditor_oeShow(event){
	var o = this;
	o.base.FDropEditor.oeShow.call(o, event);
	if(event.isAfter()){
		RHtml.toRect(o.rect, o.hDropPanel);
		RWindow.showShadow(true, o.rect);
	}
}
function FMemoDropEditor_focus(){
	this.hEditor.focus();
}
function FMemoDropEditor_value(){
	return this.hEditor.value;
}
function FMemoDropEditor_setValue(value){
	var o = this;
	value = RStr.nvl(value);
	o.changed = false;
	o.dataValue = value;
	o.dataValue = value;
	o.hEdit.value = RStr.firstLine(value);
	o.hEditor.value = value;
}
function FNumber(o){
   o = RClass.inherits(this, o, FEditControl, MEditBorder, MDescNumber, MListView, MZoom, MMouseWheel);
   o.stUnit           = RClass.register(o, new TStyle('Unit'));
   o.stArrayForm      = RClass.register(o, new TStyle('ArrayForm'));
   o.stUpButton       = RClass.register(o, new TStyle('UpButton'));
   o.stDownButton     = RClass.register(o, new TStyle('DownButton'));
   o.stIconUp         = RClass.register(o, new TStyleIcon('Up'));
   o.stIconUpSelect   = RClass.register(o, new TStyleIcon('UpSelect'));
   o.stIconDown       = RClass.register(o, new TStyleIcon('Down'));
   o.stIconDownSelect = RClass.register(o, new TStyleIcon('DownSelect'));
   o.hUpIcon          = null;
   o.hDownIcon        = null;
   o.borderStyle      = EBorderStyle.RoundDrop;
   o.onUpIconMdown    = RClass.register(o, new HMouseDown('onUpIconMdown'),      FNumber_onUpIconMdown);
   o.onUpIconMup      = RClass.register(o, new HMouseUp('onUpIconMup'),          FNumber_onUpIconMup);
   o.onDownIconMdown  = RClass.register(o, new HMouseDown('onDownIconMdown'),    FNumber_onDownIconMdown);
   o.onDownIconMup    = RClass.register(o, new HMouseUp('onDownIconMup'),        FNumber_onDownIconMup);
   o.onEditKeyPress   = RClass.register(o, new HKeyPress('onEditKeyPress'));
   o.onEditFocus      = RClass.register(o, new HFocus('onEditFocus'));
   o.onEditBlur       = RClass.register(o, new HBlur('onEditBlur'));
   o.onBuildControl   = FNumber_onBuildControl;
   o.onBuildEdit      = FNumber_onBuildEdit;
   o.ohEditKeyPress   = FNumber_ohEditKeyPress;
   o.onEditKeyUp      = FNumber_onEditKeyUp;
   o.onEditDoubleClick = FNumber_onEditDoubleClick;
   o.onMouseWheel      = FNumber_onMouseWheel;
   o.validText        = FNumber_validText;
   o.validPattern     = FNumber_validPattern;
   o.formatValue      = FNumber_formatValue;
   o.formatText       = FNumber_formatText;
   o.text             = FNumber_text;
   o.setText          = FNumber_setText;
   o.changeText       = FNumber_changeText;
   o.setEditStyle     = FNumber_setEditStyle;
   o.splitValue       = FNumber_splitValue;
   o.removeSplit      = FNumber_removeSplit;
   o.precisionValue   = FNumber_precisionValue;
   o.onDataKeyDown    = FNumber_onDataKeyDown;
   o.ohEditKeyUp      = FNumber_ohEditKeyUp;
   o.ohEditFocus      = FNumber_ohEditFocus;
   o.ohEditBlur       = FNumber_ohEditBlur;
   return o;
}
function FNumber_onDataKeyDown(s, e){
   var o = this;
   if(EKey.Up == e.keyCode && o.canEdit){
      o.changeText(true);
   }else if(EKey.Down == e.keyCode && o.canEdit){
      o.changeText(false);
   }
   o.base.FEditControl.onDataKeyDown.call(o, s, e);
}
function FNumber_ohEditKeyUp(s, e){
   var o = this;
   if(EKey.Up == e.keyCode && o.canEdit){
      o.hUpIcon.src = o.styleIconPath('UpSelect');
   }else if(EKey.Down == e.keyCode && o.canEdit){
      o.hDownIcon.src = o.styleIconPath('DownSelect');
   }
}
function FNumber_onUpIconMdown(e) {
   var o = this;
   if(o.canEdit){
      e.hSource.src = o.styleIconPath('Up');
      o.changeText(true);
   }
}
function FNumber_onUpIconMup(e) {
   var o = this;
   if(o.canEdit){
      e.hSource.src = o.styleIconPath('UpSelect');
   }
}
function FNumber_onDownIconMdown(e) {
   var o = this;
   if(o.canEdit){
      e.hSource.src = o.styleIconPath('Down');
      o.changeText(false);
   }
}
function FNumber_onDownIconMup(e){
   var o = this;
   if(o.canEdit){
      e.hSource.src = o.styleIconPath('DownSelect');
   }
}
function FNumber_onBuildControl(){
   var o = this;
   o.base.FEditControl.onBuildControl.call(o);
   if(o.editUnit){
      var h = o.hUnit = o.hControlRow.insertCell();
      h.className = o.style('Unit');
      h.innerText = o.editUnit;
   }
}
function FNumber_onBuildEdit(b){
	var o = this;
	var h = o.hEdit = RBuilder.appendEdit(b.hPanel, o.style('Edit'));
	o.attachEvent('onEditFocus', h, o.ohEditFocus);
	o.attachEvent('onEditKeyPress', h, o.ohEditKeyPress);
	o.attachEvent('onEditBlur', h, o.ohEditBlur);
	o.attachEvent('onDataKeyUp', h, o.ohEditKeyUp);
	if(o.editLength){
		h.maxLength = o.editLength;
	}
   var hd = b.hDrop;
   hd.width = 13;
   var ht = RBuilder.appendTable(hd, o.style('ArrayForm'));
   var h = ht.insertRow().insertCell();
   h.className = o.style('UpButton');
   o.hUpIcon = RBuilder.appendIcon(h, o.styleIcon('Up'));
   o.attachEvent('onUpIconMdown', o.hUpIcon);
   o.attachEvent('onUpIconMup', o.hUpIcon)
   var h = ht.insertRow().insertCell();
   h.className = o.style('DownButton');
   o.hDownIcon = RBuilder.appendIcon(h, o.styleIcon('Down'));
   o.attachEvent('onDownIconMdown', o.hDownIcon);
   o.attachEvent('onDownIconMup', o.hDownIcon);
}
function FNumber_ohEditKeyPress(e, he){
   var o = this;
   if( !RStr.inChars(String.fromCharCode(e.keyCode), RFloat.Chars) ){
      RKey.eventClear(he);
   }
}
function FNumber_onEditKeyDown(e) {
   var o = this;
   if (EKey.Up == e.keyCode && o.canEdit) {
      e.source.hUpIcon.src = o.styleIconPath('up');
      o.changeValue(e, 'Y');
   }
   if (EKey.Down == e.keyCode && o.canEdit) {
      e.source.hDownIcon.src = o.styleIconPath('down');
      o.changeValue(e, 'N');
   }
}
function FNumber_onEditKeyUp(e) {
   var o = this;
   if (EKey.Up == e.keyCode && o.canEdit) {
      e.source.hUpIcon.src = o.styleIconPath('upSelect');
   }
   if (EKey.Down == e.keyCode && o.canEdit) {
      e.source.hDownIcon.src = o.styleIconPath('downSelect');
 }
}
function FNumber_onEditDoubleClick(){
   this.onListClick();
}
function FNumber_onMouseWheel(e){
   return;
   var o = this;
   if(e.wheelDelta > 0 && o.canEdit ){
      o.addValue();
   }
   else if(e.wheelDelta < 0 && o.canEdit ){
      o.subValue();
   }
}
function FNumber_validText(t){
   var o = this;
   return true;
   t = RFloat.parse(t);
   if(o.dataType){
      if('int' == o.dataType){
         if(RStr.contains(t,'.')){
            return false;
         }
      }
   }
   if(o.validValmin){
      if(RBool.isTrue(o.validEqlmin)){
         if(RFloat.parse(o.validValmin) > t){
            return false;
         }
      }else{
         if(RFloat.parse(o.validValmin) >= t){
            return false;
         }
      }
   }
   if(o.validValmax){
      if(RBool.isTrue(validEqlmax)){
         if(RFloat.parse(o.validEqlmax) < t){
            return false;
         }
      }
      else{
         if(RFloat.parse(o.validEqlmax) <= t){
            return false;
         }
      }
   }
   return true;
}
function FNumber_validPattern(s) {
   var o = this;
   var flag = true;
   var s = RStr.nvl(s);
   if(!RRegExp.test(ERegExp.NUMBER,s)){
      return false;
   }
   var r = null;
   if (o.dataType) {
      for (n in ERegExp) {
         if (RStr.equals(n, o.dataType)) {
            r = ERegExp[n];
            break;
         }
      }
      if (RStr.equals(RClass.name(r), "RegExp")) {
         flag = RRegExp.test(r, s) ? flag & true : flag & false;
      }
   }
   if (o.editMaxvalue) {
      flag = parseFloat(s) <= parseFloat(o.editMaxvalue) ? flag & true : flag & false;
   }
   if (o.editMinvalue) {
      flag = parseFloat(s) >= parseFloat(o.editMinvalue) ? flag & true : flag & false;
   }
   return flag;
}
function FNumber_formatValue(text){
   var o = this;
   text = RStr.nvl(text);
   if(RBool.isTrue(o.editSplitter)){
      text = o.removeSplit(text);
   }
   var p = RStr.nvl(o.editFormat);
   if(!RStr.isEmpty(p)){
      var s = RStr.findChars(p, '[');
      var e = RStr.findChars(p, ']');
      var es = p.substring(e + 1);
      if(s == -1 || e == -1){
         alert('editFormat error : ' + o.editFormat);
      }
      text = text.substring(s);
      text = text.substring(0, text.length - es.length);
   }
   return text;
}
function FNumber_formatText(v){
   var o = this;
   if(v){
      v = RStr.nvl(v.toString());
   }else{
      v = RStr.nvl(v);
   }
   if(!RStr.isEmpty(o.editPrecision)){
      v = o.precisionValue(v);
   }
   if(RBool.isTrue(o.editSplitter)){
      v = o.splitValue(v);
   }
   var p = RStr.nvl(o.editFormat);
   if(!RStr.isEmpty(p)){
      var s = RStr.findChars(p, '[');
      var e = RStr.findChars(p, ']');
      if(s == -1 || e == -1){
         alert('editFormat error : ' + o.editFormat);
      }
      v = p.substring(0, s).concat(v);
      v = v.concat(p.substring(e + 1))
   }
   return v;
}
function FNumber_text(){
   return this.hEdit.value;
}
function FNumber_setText(text){
   this.hEdit.value = text;
}
function FNumber_changeText(f){
   var o = this;
   if(!o.canEdit){
      return;
   }
   var v = RFloat.parse(o.get());
   var d = RFloat.parse(o.editIncreate);
   if(RConsole.find(FFocusConsole).isFocus(o)){
      v = RFloat.parse(o.text());
      if(f){
         v += d;
      }else{
         v -= d;
      }
      o.setText(v)
   }else{
      if(f){
         v += d;
      }else{
         v -= d;
      }
      o.set(v)
   }
}
function FNumber_setEditStyle(t){
   var o = this;
   o.base.FEditControl.setEditStyle.call(o, t);
   o.hUpIcon.src = o.styleIconPath(o.isEditHover(t) ? 'UpSelect' : 'Up');
   o.hDownIcon.src = o.styleIconPath(o.isEditHover(t) ? 'DownSelect' : 'Down');
}
function FNumber_splitValue(v){
   return v;
   var o = this;
   var s = RStr.nvl(v.toString());
   var j = RStr.findChars(s,"-");
   var b = RStr.findChars(s,"%");
   s = RStr.removeChars(s, "'");
   s = RStr.removeChars(s, " ");
   s = RStr.removeChars(s, "%");
   s = RStr.removeChars(s, "-");
   if (!RStr.isEmpty(s)) {
      var sc = '';
      if(-1 != j){
         sc.concat('-');
      }
      var c = '';
      var n = 0;
      for(var i = 0; i < s.length; i++){
         if(n % 3 == 0 && (i + 1) != s.length){
            sc = sc.concat("'");
         }else{
            sc = sc.concat(s.charAt(i));
         }
         if("." != s.charAt(i)){
            n++;
         }else{
            n = 0;
         }
      }
      if(-1 != b){
         sc.concat("%")
      }
      return sc;
   }
   return s;
}
function FNumber_removeSplit(s){
   var o = this;
   var s = RStr.nvl(s);
   s = RStr.removeChars(s,"'");
   s = RStr.removeChars(s,"%");
   return s;
}
function FNumber_precisionValue(v){
   var o = this;
   if(RStr.isEmpty(v)){
      return v;
   }
   var l1,l2;
   var p = RStr.nvl(o.editPrecision);
   v = RStr.nvl(v);
   if(RStr.contains(p,'.')){
      var sp = p.split('.')
      l2 = sp[1].length;
   }else{
     l1 = p.length;
   }
   if(RStr.contains(v, '.')){
      var vs = v.split('.');
      if(l2){
         if(l2 > vs[1].length){
            vs[1] = RStr.rpad(vs[1],l2 - vs[1].length,'0');
         }else if(l2 <= vs[1].length){
            vs[1] = vs[1].substring(0, l2);
         }
      }
      if(l1){
         if(l1 > vs[0].length){
            alert(l1);
         }else if(l1 < vs[0].length){
            vs[0] = vs[0].substring(0, vs[0].length - l1);
            vs[0] = RStr.rpad(vs[0],l1,'0');
         }
         vs[1] = null;
      }
      v = vs[0] + '.' + RStr.nvl(vs[1]);
   }else{
      if(l1){
         if(l1 <= v.length){
            v = v.substring(0, v.length - l1 + 1);
            for(var n = 0; n < l1 - 1;n++){
               v = v.concat('0');
            }
         }
         else if(l1 > v.length){
            v = 0;
         }
      }
      if(l2){
         v = v + '.';
         for(var n = 0; n < l2;n++){
            v = v.concat('0');
         }
      }
   }
   return v;
}
function FNumber_ohEditFocus(e){
   var o = this;
   o.setText(o.formatValue(o.text()));
}
function FNumber_ohEditBlur(e){
   var o = this;
   o.setText(o.formatText(o.text()));
}
function FPanel(o){
	o = RClass.inherits(this, o, FContainer, MFocus);
	o.hContainer     = null;
	o.hPanelTable    = null;
	o.hPanelLine     = null;
	o.oeDesign       = FPanel_oeDesign;
	o.onBuildPanel   = FPanel_onBuildPanel;
	o.insertPosition = FPanel_insertPosition;
	o.appendLine     = FPanel_appendLine;
	o.appendChild    = FPanel_appendChild;
	o.moveChild      = FPanel_moveChild;
	return o;
}
function FPanel_oeDesign(event){
	var o = this;
	o.base.FContainer.oeDesign.call(o, event);
	if(event.isAfter()){
		switch(event.mode){
			case EDesign.Move:
				break;
			case EDesign.Border:
				if(event.flag){
					o.hPanel.border = 1;
					o.hPanel.style.border = '1 solid red';
				}else{
					o.hPanel.border = 0;
					o.hPanel.style.border = null;
				}
				break;
		}
	}
}
function FPanel_onBuildPanel(){
	var o = this;
	o.hPanel = RBuilder.create(null, 'SPAN');
	o.attachEvent('onClick', o.hPanel);
	var h = RBuilder.appendTable(o.hPanel);
	h.width = '100%';
	o.hContainer = h.insertRow().insertCell();
}
function FPanel_appendLine(){
	var o = this;
	var h = o.hPanelTable = RBuilder.appendTable(o.hContainer);
	h.style.paddingBottom = 3;
	o.hPanelLine = h.insertRow();
	return h;
}
function FPanel_appendChild(ctl){
	var o = this;
	if(RClass.isClass(ctl, MTop)){
		return;
	}
	if(!o.hPanelLine){
		o.appendLine();
	}
	if(RClass.isClass(ctl, MHorizontal)){
		if(o.hPanelTable.rows[0].cells.length == 0){
			o.hContainer.insertBefore(ctl.hPanel, o.hPanelTable);
		}else{
			o.hContainer.appendChild(ctl.hPanel);
			o.appendLine();
		}
		return;
	}
	var hCell = o.hPanelLine.insertCell();
	ctl.hPanelLine = o.hPanelTable;
	hCell.appendChild(ctl.hPanel);
	if(!ctl.nowrap && (this.controls.last() != ctl)){
		o.appendLine();
	}
}
function FPanel_insertPosition(cf, ct, idx, copy){
	var o = this;
	var ms = o.components;
	var cs = o.controls;
	ms.removeValue(cf);
	cs.removeValue(cf);
	if(ct){
		var index = ms.indexOfValue(ct);
		ms.insert(index+idx, cf.name, cf);
		var index = cs.indexOfValue(ct);
		cs.insert(index+idx, cf.name, cf);
	}else{
		ms.push(cf);
		cs.push(cf);
	}
}
function FPanel_moveChild(cf, ct, pos, copy){
	if(!(cf && ct && pos) || (cf == ct)){
		return;
	}
	var o = this;
	var hPanel = o.hPanel;
	var moved = false;
	var cfh = RClass.isClass(cf, MHorizontal);
	var hCfTd = RHtml.parent(cf.hPanel, 'TD');
	var hCfTab = RHtml.parent(cf.hPanel, 'TABLE');
	var cth = RClass.isClass(ct, MHorizontal);
	var hTd = RHtml.parent(ct.hPanel, 'TD');
	var hTable = RHtml.parent(hTd, 'TABLE');
	switch(pos){
		case EPosition.Before:
			var hRow = hTable.rows[0];
			for(var n=0; n<hRow.cells.length; n++){
				if(hRow.cells[n] == hTd){
					var hCell = hRow.insertCell(hTd.cellIndex);
					hCell.appendChild(cf.hPanel);
					o.insertPosition(cf, ct, 0, copy);
					cf.nowrap = true;
					cf.hPanelLine = hTable;
					moved = true;
					break;
				}
			}
			break;
		case EPosition.After:
			var hRow = hTable.rows[0];
			for(var n=0; n<hRow.cells.length; n++){
				if(hRow.cells[n] == hTd){
					var hCfTd = RHtml.parent(cf.hPanel, 'TD');
					var hCell = hRow.insertCell(hTd.cellIndex+1);
					hCell.appendChild(cf.hPanel);
					o.insertPosition(cf, ct, 1, copy);
					cf.nowrap = false;
					cf.hPanelLine = hTable;
					ct.nowrap = true;
					moved = true;
					break;
				}
			}
			break;
		case EPosition.LineBefore:
			if(cth){
				if(cfh){
					o.hContainer.insertBefore(cf.hPanel, ct.hPanel);
				}else{
					var hNewTab = o.appendLine();
					o.hContainer.insertBefore(hNewTab, ct.hPanel);
					var hCell = o.hPanelLine.insertCell();
					hCell.appendChild(cf.hPanel);
					cf.hPanelLine = hNewTab;
				}
				o.insertPosition(cf, ct, 0, copy);
			}else{
				var count = o.hContainer.children.length;
				for(var n=0; n<count; n++){
					if(o.hContainer.children[n] == hTable){
						if(cfh){
							o.hContainer.insertBefore(cf.hPanel, hTable);
						}else{
							var hNewTab = o.appendLine();
							o.hContainer.insertBefore(hNewTab, hTable);
							var hCell = o.hPanelLine.insertCell();
							hCell.appendChild(cf.hPanel);
							cf.hPanelLine = hNewTab;
							moved = true;
						}
						o.insertPosition(cf, ct, 0, copy);
						cf.nowrap = false;
						break;
					}
				}
			}
			break;
		case EPosition.LineAfter:
			if(cfh){
				o.hContainer.appendChild(cf.hPanel);
			}else{
				var hNewTab = o.appendLine();
				var hCell = o.hPanelLine.insertCell();
				hCell.appendChild(cf.hPanel);
				hCell.appendChild(cf.hPanel);
				moved = true;
			}
			o.insertPosition(cf, null, 0, copy);
			ct.nowrap = false;
			cf.nowrap = false;
			break;
	}
	if(moved){
		hCfTd.removeNode(true);
		if(hCfTab.rows[0].cells.length == 0){
			hCfTab.removeNode(true);
		}
	}
}
function FPicker(o){
	o = RClass.inherits(this, o, FDataEditControl, MDropable);
	o.editFormat    = RClass.register(o, new TPtyStr('editFormat'));
	o.hForm         = null;
	o.hDrop         = null;
	o.hForm         = null;
	o.onBuildEdit   = FPicker_onBuildEdit;
	o.onEditEnd     = FPicker_onEditEnd;
	o.text          = FPicker_text;
	o.setText       = FPicker_setText;
	o.drop          = FPicker_drop;
	return o;
}
function FPicker_onBuildEdit(){
	var o = this;
	o.hEdit = RBuilder.newEdit();
	o.hDrop = RBuilder.newIcon(null, 'ctl.ds-ds');
}
function FPicker_onEditEnd(editor){
	var o = this;
	if(editor){
		var dsCtl = o.topControl(MDataset);
		if(dsCtl){
			dsCtl.dsMovePosition(editor.position());
		}
	}
	o.base.FDataEditControl.onEditEnd.call(o);
	RLog.debug(o, 'Edit end (editor={1} value={2})', editor, o.dataValue);
}
function FPicker_text(){
	return this.hEdit.value;
}
function FPicker_setText(text){
	this.hEdit.value = text;
}
function FPicker_drop(){
	var o = this;
	if(o.canDrop() && o.canEdit){
		var dsCtl = o.topControl(MDataset);
		if(dsCtl){
			var editor = RConsole.find(FEditConsole).focus(o, FPickerEditor, o.name);
			editor.linkPanel(o.hControlPanel, o.hEdit, o.hEditForm);
			editor.setDsControl(dsCtl);
			editor.setValue(o.hEdit.value);
			editor.show();
		}
	}
}
function FPickerEditor(o){
	o = RClass.inherits(this, o, FDropEditor, MShadow);
	o.MaxHeight    = 240;
	o.originIndex  = null;
	o.selectIndex  = null;
	o.dsControl    = null;
	o.dataset      = null;
	o.columns      = new TList();
	o.ohDropMdown  = FPickerEditor_ohDropMdown;
	o.ohDropMup    = FPickerEditor_ohDropMup;
	o.ohRowEnter   = FPickerEditor_ohRowEnter;
	o.ohRowLeave   = FPickerEditor_ohRowLeave;
	o.ohRowMdown   = FPickerEditor_ohRowMdown;
	o.onBuildEdit  = FPickerEditor_onBuildEdit;
	o.onKeyDown    = FPickerEditor_onKeyDown;
	o.isColumn     = FPickerEditor_isColumn;
	o.panel        = FPickerEditor_panel;
	o.position     = FPickerEditor_position;
	o.setPosition  = FPickerEditor_setPosition;
	o.buildFlag    = FPickerEditor_buildFlag;
	o.setDsControl = FPickerEditor_setDsControl;
	o.select       = FPickerEditor_select;
	o.focus        = FPickerEditor_focus;
	o.show         = FPickerEditor_show;
	o.hide         = FPickerEditor_hide;
	o.setValue     = FPickerEditor_setValue;
	return o;
}
function FPickerEditor_ohDropMdown(){
	var o = this.link;
	if(o.inEdit && RClass.isClass(o, FPickerEditor)){
		RLog.debug(o, 'FPickerEditor.ohDropMdown', 'Drop mouse down');
		o.isSkipBlur = true;
	}
}
function FPickerEditor_ohDropMup(){
	var o = this.link;
	if(o.inEdit && RClass.isClass(o, FPickerEditor)){
		RLog.debug(o, 'FPickerEditor.ohDropMup', 'Drop mouse up');
		o.hEdit.focus();
	}
}
function FPickerEditor_ohRowEnter(){
	var o = this.link;
	if(RClass.isClass(o, FPickerEditor)){
		if(!this.ptySelect){
			this.className = o.style('RowHover');
		}
	}
}
function FPickerEditor_ohRowLeave(){
	var o = this.link;
	if(RClass.isClass(o, FPickerEditor)){
		if(!this.ptySelect){
			this.className = o.style('Row');
		}
	}
}
function FPickerEditor_ohRowMdown(){
	var o = this.link;
	if(RClass.isClass(o, FPickerEditor)){
		o.selectIndex = this.ptyIndex;
		o.editStatus = EEditStatus.Ok;
		o.inEdit = false;
		o.hEditor.blur();
	}
}
function FPickerEditor_onBuildEdit(){
	var o = this;
	var hFormTab = o.hForm = RBuilder.appendTable(o.hPanel);
	var hTltCel = hFormTab.insertRow().insertCell();
	var hTab = RBuilder.appendTable(hTltCel);
	var hRow = hTab.insertRow();
	var hCel = hRow.insertCell();
	o.hEditCel = hCel;
	o.hEditor = RBuilder.append(hCel, 'INPUT', o.style('Edit'));
	o.hEdit = o.hEditor;
	var hCel = hRow.insertCell()
	o.hDrop = RBuilder.appendIcon(hCel, 'ctl.ds-ds', o.style('Drop'));
	var hDrpCel = hFormTab.insertRow().insertCell();
	var h = o.hDropPanel = RBuilder.append(hDrpCel, 'DIV', o.style('DropPanel'));
	h.link = o;
	h.onmousedown = o.ohDropMdown;
	h.onmouseup = o.ohDropMup;
	var h = o.hRowsPanel = RBuilder.appendTable(o.hDropPanel, null, 0, 1, 1);
	h.width = '100%';
	o.linkKeyEvent(o.hEdit);
}
function FPickerEditor_onKeyDown(event){
	var o = this;
	var kc = event.keyCode;
	if(EKey.Up == kc){
		o.select(o.selectIndex-1);
	}else if(EKey.Down == kc){
		o.select(o.selectIndex+1);
	}else if(EKey.Esc == kc){
		o.selectIndex = o.originIndex;
		o.editStatus = EEditStatus.Cancel;
		o.inEdit = false;
		o.hEditor.blur();
	}else if(EKey.Enter == kc){
		o.editStatus = EEditStatus.Ok;
		o.inEdit = false;
		o.hEditor.blur();
	}
}
function FPickerEditor_isColumn(c){
	if(c.dispPicker){
		return true;
	}
	return false;
}
function FPickerEditor_panel(type){
	var o = this;
	if(EPanel.Shadow == type){
		return o.hDropPanel;
	}
	return o.base.FDropEditor.panel.call(o, type);
}
function FPickerEditor_position(){
	return this.selectIndex;
}
function FPickerEditor_setPosition(p){
	var o = this;
	o.originIndex = p;
	o.selectIndex = p;
}
function FPickerEditor_buildFlag(hRow){
	var h = hRow.insertCell();
	h.className = this.style('Flag');
	return h;
}
function FPickerEditor_setDsControl(dsCtl, force){
	var o = this;
	if(o.dataset == dsCtl.dsControl){
		if(!force && o.hRowsPanel.rows.length){
			return;
		}
	}
	o.hPanel.style.display = 'block';
	var dc = o.dsControl = dsCtl;
	var ds = o.dataset = dsCtl.dsControl;
	o.originIndex = ds.position;
	o.selectIndex = ds.position;
	var count = ds.count();
	var cols = o.columns;
	cols.clear();
	var cs = dsCtl.components;
	for(var i=0; i<cs.count; i++){
		var c = cs.value(i);
		if(o.isColumn(c)){
			o.columns.push(c);
		}
	}
	RHtml.clear(o.hRowsPanel);
	var hRow = o.hRowsPanel.insertRow();
	o.buildFlag(hRow);
	for(var i=0; i<cols.count; i++){
		var c = cols.get(i);
		var hCel = hRow.insertCell();
		hCel.className = o.style('Title');
		if(c.dispAlign){
			hCel.align = c.dispAlign;
		}
		hCel.innerText = RStr.nvl(c.label);
	}
	for(var n=0; n<count; n++){
		var row = ds.row(n);
		var hRow = o.hRowsPanel.insertRow();
		hRow.link = o;
		hRow.ptyIndex = n;
		hRow.className = o.style('Row');
		hRow.onmouseenter = o.ohRowEnter;
		hRow.onmouseleave = o.ohRowLeave;
		hRow.onmousedown = o.ohRowMdown;
		o.buildFlag(hRow);
		for(var i=0; i<cols.count; i++){
			var c = cols.get(i);
			var hCel = hRow.insertCell();
			if(c.dispAlign){
				hCel.align = c.dispAlign;
			}
			hCel.innerText = RStr.nvl(row.get(c.dataName));
		}
	}
	var hRow = o.hRowsPanel.insertRow();
	RBuilder.appendEmpty(o.buildFlag(hRow), 3);
	for(var i=0; i<cols.count; i++){
		var c = cols.get(i);
		var hCel = hRow.insertCell();
		if(c.pickerWidth){
			RBuilder.appendEmpty(hCel, c.pickerWidth);
		}
	}
	o.hDropPanel.style.height = o.hRowsPanel.offsetHeight+2;
}
function FPickerEditor_select(n){
	var o = this;
	o.selectIndex = RInt.toRange(n, 0, o.dataset.count()-1);
	var rows = o.hRowsPanel.rows;
	for(var n=0; n<rows.length; n++){
		var row = rows[n];
		if(row.ptyIndex == o.selectIndex){
			row.className = o.style('RowSelect');
			row.ptySelect = true;
			row.scrollIntoView(false);
		}else{
			row.className = o.style('Row');
			row.ptySelect = false;
		}
	}
}
function FPickerEditor_focus(){
	this.hEdit.focus();
}
function FPickerEditor_show(v){
	var o = this;
	o.base.FDropEditor.show.call(o, v);
	o.select(o.selectIndex);
	var height = o.hDropPanel.offsetHeight;
	o.hDropPanel.style.height = Math.min(height, o.MaxHeight);
	o.base.MShadow.show.call(o, v);
	o.isSkipBlur = false;
}
function FPickerEditor_hide(){
	var o = this;
	o.base.FDropEditor.hide.call(o);
	o.base.MShadow.hide.call(o);
}
function FPickerEditor_setValue(value){
	var o = this;
	o.changed = false;
	o.dataValue = value;
	o.hEdit.value = value;
	o.select(o.selectIndex);
}
function FPicture(o){
	o = RClass.inherits(this, o, FDataEditControl, MFocus);
   o.picSrc = RClass.register(o, new TPtyStr('picSrc'));
   o.picWidth = RClass.register(o, new TPtyStr('picWidth'));
   o.picHeight = RClass.register(o, new TPtyStr('picHeight'));
	o.onBuildEdit    = FPicture_onBuildEdit;
	o.onEditKeyPress = FPicture_onEditKeyPress;
	o.formatValue    = FPicture_formatValue;
	o.text           = FPicture_text;
	o.setText        = FPicture_setText;
   o.onmouseover       = FPicture_ohMouseOver;
   o.onmouseout        = FPicture_ohMouseOut;
	return o;
}
function FPicture_onBuildEdit(){
	this.hEdit = RBuilder.newImage(null, this.picSrc,null,this.picWidth,this.picHeight)
}
function FPicture_ohMouseOver(){
   var o = this;
   alert(FPicture_ohMouseOver);
}
function FPicture_ohMouseOut(){
   var o = this;
   alert(FPicture_ohMouseOut);
}
function FPicture_onEditKeyPress(e){
	var o = this;
	alert(this);
	o.base.FDataEditControl.onEditKeyPress.call(o, e);
	if(o.editCase){
		RKey.fixCase(e, o.editCase);
	}
}
function FPicture_formatValue(s){
	return RStr.nvl(s);
}
function FPrepareAction(o){
	o = RClass.inherits(this, o, FDataAction);
	o.onLoaded      = FPrepareAction_onLoaded;
	return o;
}
function FPrepareAction_onLoaded(doc){
	var controls = this.parent.controls;
	var node = doc.root().find('Dataset');
	if(node){
		this.valuable.loadValue(node);
	}
}
function FProgress(o){
	o = RClass.inherits(this, o, FDataEditControl, MDropable);
	o.hForm       = null;
	o.hDrop       = null;
	o.hForm       = null;
	o.onBuildEdit = FProgress_onBuildEdit;
	o.onEditEnd   = FProgress_onEditEnd;
	o.text        = FProgress_text;
	o.setText     = FProgress_setText;
	o.drop        = FProgress_drop;
	return o;
}
function FProgress_onBuildEdit(){
	var o = this;
	o.hEdit = RBuilder.newEdit();
	o.hDrop = RBuilder.newIcon(null, 'ctl.clrdrop');
}
function FProgress_onEditEnd(editor){
	var o = this;
	RLog.debug(o, 'Begin (editor={0}:{1} value={2})', editor, editor?editor.color:'', o.dataValue);
	if(editor){
		o.setValue(editor.color);
	}
	o.base.FDataEditControl.onEditEnd.call(o);
	RLog.debug(o, 'End (editor={0} value={1})', editor, o.dataValue);
}
function FProgress_text(){
	return this.hEdit.value;
}
function FProgress_setText(text){
	var o = this;
	o.hEdit.value = text.toUpperCase();
	o.hDropPanel.style.backgroundColor = text;
}
function FProgress_drop(){
	var o = this;
	if(o.canDrop() && o.canEdit){
		var editor = RConsole.find(FEditConsole).focus(o, FProgressEditor);
		editor.linkPanel(o.hControlPanel, o.hEdit, o.hEditForm);
		editor.setColor(o.value());
		editor.show();
	}
}
function FRadio(o){
	o = RClass.inherits(this, o, FDataEditControl);
	o.dataTrue     = EBool.True;
	o.dataFalse    = null;
	o.onBuildEdit  = FRadio_onBuildEdit;
	o.loadConfig   = FRadio_loadConfig;
	o.saveConfig   = FRadio_saveConfig;
	o.formatValue  = FRadio_formatValue;
	o.text         = FRadio_text;
	o.setText      = FRadio_setText;
	o.setEditStyle = FRadio_setEditStyle;
	return o;
}
function FRadio_onBuildEdit(){
	this.hEdit = RBuilder.newCheck();
}
function FRadio_loadConfig(c){
	var o = this;
	o.base.FDataEditControl.loadConfig.call(o, c);
	o.dataTrue  = c.nvl('data_true', o.dataTrue);
	o.dataFalse = c.get('data_false');
}
function FRadio_saveConfig(c){
	var o = this;
	o.base.FDataEditControl.saveConfig.call(o, c)
	c.set('data_true',  o.dataTrue);
	c.set('data_false', o.dataFalse);
}
function FRadio_formatValue(s){
	return RStr.nvl(s);
}
function FRadio_text(){
	return this.hEdit.checked ? this.dataTrue : this.dataFalse;
}
function FRadio_setText(text){
	this.hEdit.checked = (this.dataTrue == text);
}
function FRadio_setEditStyle(style){
	var o = this;
	var h = o.panel(EPanel.Edit);
	switch(style){
		case EStyle.Edit:
			h.disabled = false;
			break;
		case EStyle.Readonly:
			h.disabled = true;
			break;
	}
}
function FRemoteAction(o){
	o = RClass.inherits(this, o, FComponent);
	o.isLoading     = false;
	o.service       = null;
	o.valuable      = null;
	o.onLoaded      = FRemoteAction_onLoaded;
	o.loadConfig    = FRemoteAction_loadConfig;
	o.saveConfig    = FRemoteAction_saveConfig;
	o.execute       = FRemoteAction_execute;
	return o;
}
function FRemoteAction_onLoaded(e){
	var o = this;
	var doc = e.document;
	var rs = RConsole.find(FResultConsole).checkService(doc.root());
	if(rs){
		RWindow.setEnable(true);
	}
	o.isLoading = false;
}
function FRemoteAction_loadConfig(config){
	var o = this;
	o.base.FComponent.loadConfig.call(o, config);
	o.service = config.get('service');
}
function FRemoteAction_saveConfig(config){
	var o = this;
	o.base.FComponent.saveConfig.call(o, config)
	config.set('service',  this.service);
}
function FRemoteAction_execute(service, config){
	var o = this;
	var svc = RService.parse(RStr.nvl(service, this.service));
	if(!svc){
		return alert('Unknown service');
	}
	RWindow.setEnable(false);
	var doc = new TXmlDoc();
	var root = doc.root();
	root.set('action', svc.action);
	RConsole.find(FEnvConsole).build(root);
	root.push(config);
	RLog.debug(this, 'Execute (service={1})\n{2}', svc.url, doc.dump());
	o.isLoading = true;
	var e = new TEvent(o, EXmlEvent.Send, o.onLoaded);
	e.url = svc.url;
	e.document = doc;
	e.action = this;
	RConsole.find(FXmlConsole).process(e);
}
function FSelect(o){
	o = RClass.inherits(this, o, FEditControl, MEditBorder, MDescSelect, MDropable);
	o.stIconDropSelect = RClass.register(o, new TStyleIcon('DropSelect'));
	o.items            = new TItems();
	o.borderStyle      = EBorderStyle.RoundDrop;
	o.onBuildEdit      = FSelect_onBuildEdit;
	o.onEditEnd        = FSelect_onEditEnd;
	o.onDataKeyDown    = FSelect_onDataKeyDown;
	o.loadConfig       = FSelect_loadConfig;
	o.formatValue      = FSelect_formatValue;
	o.validText        = FSelect_validText;
	o.formatText       = FSelect_formatText;
	o.setEditStyle     = FSelect_setEditStyle;
	o.drop             = FSelect_drop;
	return o;
}
function FSelect_onBuildEdit(b){
	var o = this;
	var h = o.hEdit = RBuilder.appendEdit(b.hPanel, o.style('Edit'));
	if(o.editLength){
		h.maxLength = o.editLength;
	}
}
function FSelect_onEditEnd(editor){
	var o = this;
	RLog.debug(o, 'Begin (editor={1}:{2} value={3})', editor, editor?editor.value():'', o.dataValue);
	if(editor){
		o.set(editor.value());
	}
	o.onDataEditEnd(o);
	RLog.debug(o, 'End (editor={1} value={2})', editor, o.dataValue);
}
function FSelect_loadConfig(c){
	var o = this;
	o.base.FEditControl.loadConfig.call(o, c);
	if(o.dataEmpty){
		o.items.create();
	}
	o.items.loadConfig(c);
	return EStatus.Stop;
}
function FSelect_text(){
	return this.hEdit.value;
}
function FSelect_setText(text){
	this.hEdit.value = text;
}
function FSelect_formatValue(text){
   var o = this;
   if(RBool.isTrue(o.editCheck)){
      return RStr.nvl(text);
   }
   return this.items.value(text);
}
function FSelect_validText(text){
	var o = this;
	if(RStr.isEmpty(text)){
		return true;
	}
	return !RStr.isEmpty(o.formatValue(text));
}
function FSelect_formatText(value){
   var o = this;
   if(RStr.equals('Y',o.editCheck) && RStr.isEmpty(this.items.label(value))){
      return value;
   }
	return this.items.label(value);
}
function FSelect_setEditStyle(t){
	var o = this;
	o.base.FEditControl.setEditStyle.call(o, t);
	o.hDrop.src = o.styleIconPath(o.isEditHover(t) ? 'DropSelect' : 'Drop');
}
function FSelect_drop(){
	var o = this;
	if(o.canDrop() && o.canEdit && o.items.count() > 0){
		if(!o.editRefer){
			RMsg.fatal(o, null, 'Edit refer is null.');
		}
		var ed = o.editor = RConsole.find(FEditConsole).focus(o, FSelectEditor, o.editRefer);
		if(ed.linkControl(o)){
			ed.setItems(o.items);
			ed.set(o.reget());
		}
		ed.show();
	}
}
function FSelect_onDataKeyDown(s, e){
	var o = this;
	o.base.FEditControl.onDataKeyDown.call(o, s, e);
	if(o.items.count()){
		if(o.editor && o.editor.source == o){
			o.editor.onEditKeyDown(s, e);
		}
	}
}
function FSelectEditor(o){
	o = RClass.inherits(this, o, FDropEditor, MShadow);
	o.MinWidth         = 120;
	o.onEditFocus      = RClass.register(o, new HFocus('onEditFocus'));
	o.onEditBlur       = RClass.register(o, new HBlur('onEditBlur'));
	o.stIconDropSelect = RClass.register(o, new TStyleIcon('DropSelect'));
	o.stFlag           = RClass.register(o, new TStyle('Flag'));
	o.stEditForm       = RClass.register(o, new TStyle('EditForm'));
	o.position         = null;
	o.pattern          = null;
	o.originItem       = null;
	o.selectItem       = null;
	o.items            = null;
	o.itemClickListener = null;
	o.onBuildDrop      = FSelectEditor_onBuildDrop;
	o.onItemClick      = FSelectEditor_onItemClick;
	o.onEditKeyDown    = FSelectEditor_onEditKeyDown;
	o.construct        = FSelectEditor_construct;
	o.set              = FSelectEditor_set;
	o.setItems         = FSelectEditor_setItems;
	o.select           = FSelectEditor_select;
	o.linkControl      = FSelectEditor_linkControl;
	o.show             = FSelectEditor_show;
	o.hide             = FSelectEditor_hide;
	o.panel            = FSelectEditor_panel
	return o;
}
function FSelectEditor_panel(type){
   var o = this;
   if(EPanel.Shadow == type){
      return o.hDropForm;
   }
   return o.base.FDropEditor.panel.call(o, type);
}
function FSelectEditor_construct(){
	var o = this;
	o.itemClickListener = new TListener(o, o.onItemClick);
}
function FSelectEditor_onBuildDrop(){
	var o = this;
	var h = o.hItemsForm = RBuilder.appendTable(o.hDropPanel);
	h.width = '100%';
	h.style.borderWidth = 0;
	o.hItemsPanel = RBuilder.append(o.hItemsForm, 'TBODY');
}
function FSelectEditor_onItemClick(s){
	var o = this;
	var e = o.source;
	e.set(s.label);
	o.hide();
}
function FSelectEditor_select(p){
	var o = this;
	var cs = o.components;
	p = Math.min(Math.max(0, p), cs.count-1)
	for(var n=0; n<cs.count; n++){
		o.components.value(n).setChecked(n == p);
	}
	o.position = p;
}
function FSelectEditor_onEditKeyDown(s, e){
	var o = this;
	var cs = o.components;
	var kc = e.keyCode;
	if(EKey.Up == kc){
		o.select(o.position - 1);
	}else if(EKey.Down == kc){
		o.select(o.position + 1);
	}else if(EKey.Enter == kc){
		var c = o.components.value(o.position);
		o.source.set(c.label);
		o.hide();
	}else if(EKey.Esc == kc){
		o.hide();
	}
}
function FSelectEditor_set(v){
	var o = this;
	o.position = -1;
	var cs = o.components;
	var cl = cs.count;
	for(var n = 0;n < cl;n++){
		var c = cs.value(n);
		if(RStr.equals(c.value, v)){
			o.position = n - 1;
			c.setChecked(true);
		}else{
			c.setChecked(false);
		}
	}
}
function FSelectEditor_setItems(items){
	var o = this;
	if(o.components){
	   return;
	}
	var hip = o.hItemsPanel;
	o.items = items;
	var count = items.count();
	for(var n=0; n<count; n++){
		if(n > 0){
			var hr = RBuilder.append(hip, 'TR');
			hr.height = 1;
			var hd = RBuilder.append(hr, 'TD');
			hd.colSpan = 3;
			hd.style.borderTop = '1 dashed #24c2db';
			RBuilder.appendEmpty(hd);
		}
		var t = items.get(n);
		var c = RControl.create(FSelectItem);
		c.name = t.value;
		c.lsnsClick.push(o.itemClickListener);
		c.set(t.icon, t.label, t.value);
		c.setPanel(hip);
		o.push(c);
	}
	o.position = 0;
}
function FSelectEditor_linkControl(c){
	var o = this;
	if(o.source == c){
		return false;
	}
	o.source = c;
	RLog.debug(o, 'link Panel (panel={0}, edit={1})', RClass.dump(c.hEditCell), RClass.dump(c.hEdit));
	RHtml.toRect(o.rect, c.hEditCell);
	RHtml.setPixelRect(o.hPanel, o.rect);
	o.hPanel.style.pixelTop = o.rect.bottom;
	var hbf = o.border.hForm;
	hbf.style.pixelWidth = c.editBorder.hForm.width;
	hbf.style.pixelHeight = c.editBorder.hForm.height;
	return true;
}
function FSelectEditor_show(v){
	var o = this;
	o.base.FDropEditor.show.call(o, v);
	RConsole.find(FFocusConsole).focus(o);
	if(o.border.hForm.offsetWidth < o.MinWidth){
		o.border.hForm.style.pixelWidth = o.MinWidth;
	}
	o.base.MShadow.show.call(o, v);
	o.isSkipBlur = false;
}
function FSelectEditor_hide(){
	var o = this;
	o.source = null;
	o.base.FDropEditor.hide.call(o);
	o.base.MShadow.hide.call(o);
}
function FSelectItem(o){
	o = RClass.inherits(this, o, FControl);
	o.icon              = RClass.register(o, new TPtyStr('icon'));
	o.note              = RClass.register(o, new TPtyStr('note'));
	o.stHover           = RClass.register(o, new TStyle('Hover'));
	o.stSelect          = RClass.register(o, new TStyle('Select'));
	o.stIconChecked     = RClass.register(o, new TStyle('Icon'));
   o.stLabel           = RClass.register(o, new TStyle('Label'));
   o.stNote            = RClass.register(o, new TStyle('Note'));
	o.hIcon             = null;
	o.hIconPanel        = null;
	o.hLabelPanel       = null;
	o.hNotePanel        = null;
	o.checked           = false;
	o.lsnsClick         = new TListeners();
	o.oeBuild           = FSelectItem_oeBuild;
	o.onBuildPanel      = FSelectItem_onBuildPanel;
	o.onMouseOver       = FSelectItem_onMouseOver;
	o.onMouseOut        = FSelectItem_onMouseOut;
	o.onClick           = FSelectItem_onClick;
	o.set               = FSelectItem_set;
	o.setChecked        = FSelectItem_setChecked;
	return o;
}
function FSelectItem_oeBuild(e){
   var o = this;
   o.base.FControl.oeBuild.call(o,e);
	var h = o.hPanel;
	o.hIconPanel = RBuilder.append(h, 'TD', o.style("Icon"));
	o.hLabelPanel = RBuilder.append(h, 'TD', o.style("Label"));
	o.hNotePanel = RBuilder.append(h, 'TD', o.style("Note"));
   return EEventStatus.Stop;
}
function FSelectItem_onBuildPanel(){
	this.hPanel = RBuilder.create(null, 'TR', this.style("Panel"));
}
function FSelectItem_onMouseOver(){
	this.hPanel.className = RBool.isTrue(this.checked) ? this.style('Select') : this.style('Hover');
}
function FSelectItem_onMouseOut(){
	this.hPanel.className = RBool.isTrue(this.checked) ? this.style('Select') : this.style('Panel');
}
function FSelectItem_onClick(){
	this.lsnsClick.process(this);
}
function FSelectItem_set(icon, label, value, note){
	var o = this;
	o.icon = RStr.nvl(icon);
	if(!RStr.isEmpty(o.icon)){
		o.hIcon = RBuilder.appendIcon(o.hIconPanel, o.styleIcon(o.icon));
	}
	o.label = RStr.nvl(label);
	o.value = RStr.nvl(value);
	o.note = RStr.nvl(note);
	o.hLabelPanel.innerText = o.label;
	o.hNotePanel.innerText = o.note;
}
function FSelectItem_setChecked(f){
	var o = this;
	o.checked = f;
	if(o.hIcon){
		o.hIcon.style.display = f ? 'block' : 'none';
	}else{
		o.hIconPanel.innerText = f ? 'ü' : '';
	}
	o.hPanel.className = f ? o.style('Select') : o.style('Panel');
}
function FSplit(o){
	o = RClass.inherits(this, o, FControl, MDisplayAble, MDesign, MHorizontal);
	o.styleTitle   = RClass.register(o, new TStyle('Title'));
	o.onSplitHover = RClass.register(o, new HMouseOver('onSplitHover'),    FSplit_onSplitHover);
	o.onSplitOut   = RClass.register(o, new HMouseOut('onSplitOut'),    FSplit_onSplitOut);
	o.onSplit
	o.icon         = null;
	o.label        = null;
	o.extended     = true;
	o.iconMinus    = 'ctl.collapse_nor';
	o.iconPlus     = 'ctl.expand_nor';
	o.hImage       = null;
	o.hIcon        = null;
	o.hText        = null;
	o.oeBuild      = FSplit_oeBuild;
	o.onBuildPanel = FSplit_onBuildPanel;
	o.onMouseDown  = FSplit_onMouseDown;
	o.loadConfig   = FSplit_loadConfig;
	o.saveConfig   = FSplit_saveConfig;
	o.extend       = FSplit_extend;
	return o;
}
function FSplit_onSplitOut(e){
   var o = this;
   o.hImage.src = o.extended ? RRes.iconPath('ctl.collapse_nor'):RRes.iconPath('ctl.expand_nor')
}
function FSplit_onSplitHover(e){
   var o = this;
   o.hImage.src = o.extended ? RRes.iconPath('ctl.collapse_hvr'):RRes.iconPath('ctl.expand_hvr')
}
function FSplit_oeBuild(event){
	var o = this;
	o.base.FControl.oeBuild.call(o, event);
	var h = this.hForm.insertRow().insertCell();
	h.className = this.style('Title');
	o.hImage = RBuilder.appendIcon(h, o.iconMinus);
	if(o.icon){
		o.hIcon = RBuilder.appendIcon(h, o.icon);
	}
	o.hText = RBuilder.appendText(h, '&nbsp;' + this.label);
	return EEventStatus.Stop;
}
function FSplit_onBuildPanel(){
   var o = this;
	o.hPanel = RBuilder.create(null, 'DIV');
   o.hForm = RBuilder.appendTable(o.hPanel);
   o.attachEvent('onSplitHover', o.hForm);
   o.attachEvent('onSplitOut', o.hForm);
	o.hForm.width = '100%';
}
function FSplit_onMouseDown(){
	this.extend(!this.extended);
}
function FSplit_loadConfig(config){
	this.base.FControl.loadConfig.call(this, config);
	this.icon = config.get('icon');
	this.label = config.get('label');
}
function FSplit_saveConfig(config){
	this.base.FControl.saveConfig.call(this, config);
}
function FSplit_extend(v){
	var o = this;
	if(o.extended == v){
		return;
	}
	o.extended = v;
	o.hImage.src = v ? RRes.iconPath(o.iconMinus) : RRes.iconPath(o.iconPlus);
	var start = false;
	var cs = this.parent.controls;
	for(var n=0; n<cs.count; n++){
		var c = cs.value(n);
		if(c == this){
			start = true;
			continue;
		}
		if(start){
			if(RClass.isClass(c, MHorizontal)){
				break;
			}
			c.setVisible(this.extended);
		}
	}
}
function FTemplate(o){
	o = RClass.inherits(this, o, FControl, MDisplayAble, MDesign, MHorizontal);
	o.icon         = RClass.register(o, new TPtyStr('icon'));
	o.styleTitle   = RClass.register(o, new TStyle('Title'));
	o.extended     = true;
	o.hImage       = null;
	o.hIcon        = null;
	o.hText        = null;
	o.oeBuild      = FTemplate_oeBuild;
	o.onBuildPanel = FTemplate_onBuildPanel;
	return o;
}
function FTemplate_oeBuild(event){
	var o = this;
	o.base.FControl.oeBuild.call(o, event);
	var h = o.hForm.insertRow().insertCell();
	h.className = o.style('Title');
	if(o.icon){
		o.hIcon = RBuilder.appendIcon(h, o.icon);
	}
	o.hText = RBuilder.appendText(h, '&nbsp;' + this.label);
	return EEventStatus.Stop;
}
function FTemplate_onBuildPanel(){
	var o = this;
	o.hPanel = RBuilder.create(null, 'DIV');
	o.hForm = RBuilder.appendTable(this.hPanel);
	o.hForm.width = '100%';
}
function FWebForm(o){
	o = RClass.inherits(this, o, FForm);
	return o;
}
function FWebStyle(o){
	o = RClass.inherits(this, o, FForm);
	return o;
}
function FWebTemplate(o){
	o = RClass.inherits(this, o, FForm);
	return o;
}
function MEditBorder(o){
   o = RClass.inherits(this, o);
   o.editBorder         = null;
   o.borderStyle        = EBorderStyle.None;
   o.onBuildEditBorder  = MEditBorder_onBuildEditBorder;
   o.setEditBorderStyle = MEditBorder_setEditBorderStyle;
   return o;
}
function MEditBorder_onBuildEditBorder(hp){
   var o = this;
   var b = o.editBorder = new TBorder(o.borderStyle);
   b.hParent = hp;
   RBorder.build(b);
   if(b.hDrop){
      b.hDrop.className = o.style('DropPanel');
   }
   o.hEditPanel  = b.hPanel;
   var h = o.hEditForm = b.hForm;
   h.className = o.style('EditForm');
   o.linkEvent(o, 'onDataEnter', h);
   o.linkEvent(o, 'onDataLeave', h);
   if(o.editWidth){
      h.width = o.editWidth;
   }
   if(o.editHeight){
      h.height = o.editHeight;
   }
}
function MEditBorder_setEditBorderStyle(t, c){
   var o = this;
   var b = o.editBorder;
   var s = b.style;
   if(EBorderStyle.Round == s){
      if(EStyle.Readonly == t){
      }else if(EStyle.Hover == t){
      }else{
      }
   }else if(EBorderStyle.RoundIcon == s){
      b.hIcon.style.backgroundColor = c;
      b.hPanel.style.backgroundColor = c;
   }else if(EBorderStyle.RoundDrop == s){
      if(EStyle.Readonly == t){
      }else if(EStyle.Hover == t){
      }else{
      }
   }
}
