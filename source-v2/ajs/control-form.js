var ESplitStyle = new function ESplitStyle(){
   var o = this;
   o.Normal     = 'N';
   o.BulgeLine  = 'B';
   o.HollowLine = 'H';
   return o;
}
function FButton(o){
   o = RClass.inherits(this, o, FControl, MDisplay, MDesign);
   o.labelPosition      = RClass.register(o, new TPtyStr('labelPosition', EPosition.Left));
   o.icon               = RClass.register(o, new TPtyStr('icon'));
   o.type               = RClass.register(o, new TPtyStr('type'));
   o.action             = RClass.register(o, new TPtyStr('action'));
   o.dataAction         = RClass.register(o, new TPtyStr('dataAction'));
   o.service            = RClass.register(o, new TPtyStr('service'));
   o.target             = RClass.register(o, new TPtyStr('target'));
   o.page               = RClass.register(o, new TPtyStr('page'));
   o.method             = RClass.register(o, new TPtyStr('method'));
   o.iconDisable        = RClass.register(o, new TPtyStr('iconDisable'));
   o.attributes         = RClass.register(o, new TPtyStr('attributes'));
   o.editUrl            = RClass.register(o, new TPtyStr('editUrl'));
   o.editForm           = RClass.register(o, new TPtyStr('editForm'));
   o.stIcon             = RClass.register(o, new TStyle('Icon'));
   o.stLabel            = RClass.register(o, new TStyle('Label'));
   o.stForm             = RClass.register(o, new TStyle('Form'));
   o.stIconPanel        = RClass.register(o, new TStyleIcon('Panel'));
   o.__process          = false;
   o.lsnsClick          = new TListeners();
   o.hForm              = null;
   o.hLeftButton        = null;
   o.hMiddleButton      = null;
   o.hRightButton       = null;
   o.hLabelPanel        = null;
   o.hLabel             = null;
   o.onButtonEnter      = RClass.register(o, new HMouseEnter('onButtonEnter'), FButton_onButtonEnter);
   o.onButtonLeave      = RClass.register(o, new HMouseLeave('onButtonLeave'), FButton_onButtonLeave);
   o.onButtonDown       = RClass.register(o, new HMouseDown('onButtonDown'), FButton_onButtonDown);
   o.onButtonUp         = RClass.register(o, new HMouseUp('onButtonUp'), FButton_onButtonUp);
   o.onButtonClickDelay = FButton_onButtonClickDelay;
   o.onClick            = FButton_onClick;
   o.onButtonClick      = RClass.register(o, new HClick('onButtonClick'), FButton_onButtonClick);
   o.oeBuild            = FButton_oeBuild;
   o.oeMode             = FButton_oeMode;
   o.setLabel           = FButton_setLabel;
   o.setLabelColor      = FButton_setLabelColor;
   o.setLabelStyle      = FButton_setLabelStyle;
   o.doClick            = FButton_doClick;
   o.dispose            = FButton_dispose;
   return o;
}
function FButton_onButtonEnter(e){
   var o = this;
   if(!o._disabled){
	  o.hLeftButton.background = o.styleIconPath('HoverLeft');
	  o.hMiddleButton.background = o.styleIconPath('HoverMiddle');
	  o.hRightButton.background = o.styleIconPath('HoverRight');
   }
}
function FButton_onButtonLeave(e){
   var o = this;
   if(!o._disabled){
	  o.hLeftButton.background = o.styleIconPath('ButtonLeft');
	  o.hMiddleButton.background = o.styleIconPath('Button');
	  o.hRightButton.background = o.styleIconPath('ButtonRight');
   }
}
function FButton_onButtonDown(e){
   var o = this;
   if(!o._disabled){
	  o.hLeftButton.background = o.styleIconPath('PressLeft');
	  o.hMiddleButton.background = o.styleIconPath('PressMiddle');
	  o.hRightButton.background = o.styleIconPath('PressRight');
   }
}
function FButton_onButtonUp(e){
   var o = this;
   if(!o._disabled){
	  o.hLeftButton.background = o.styleIconPath('ButtonLeft');
	  o.hMiddleButton.background = o.styleIconPath('Button');
	  o.hRightButton.background = o.styleIconPath('ButtonRight');
   }
}
function FButton_onButtonClickDelay(e){
   var o = this;
   o.__process = false;
   o.clickActive.status = EActive.Sleep;
}
function FButton_onClick(e){
   this.doClick();
}
function FButton_onButtonClick(e){
   this.doClick();
}
function FButton_oeBuild(e){
   var o = this;
   o.base.FControl.oeBuild.call(o, e);
   var hp = o.hPanel;
   hp.style.paddingTop = o.padTop ? o.padTop : 10;
   hp.style.pixelHeight = 26;
   var hf = o.hForm = RBuilder.appendTable(hp);
   var hr = hf.insertRow();
   hr.height = 22;
   var hl = o.hLeftButton = hr.insertCell();
   hl.width = 3;
   hl.background = o.styleIconPath('ButtonLeft');
   var hm = o.hMiddleButton = hr.insertCell();
   hm.background = o.styleIconPath('Button');
   var hrb = o.hRightButton = hr.insertCell();
   hrb.width = 3;
   hrb.background = o.styleIconPath('ButtonRight');
   hf.style.cursor = 'hand';
   hf.style.border = 0;
   o.attachEvent('onButtonEnter', hf, o.onButtonEnter);
   o.attachEvent('onButtonLeave', hf, o.onButtonLeave);
   o.attachEvent('onButtonDown', hf, o.onButtonDown);
   o.attachEvent('onButtonUp', hf, o.onButtonUp);
   o.attachEvent('onButtonClick', hf);
   var hTb = RBuilder.appendTable(hm);
   var hr  = hTb.insertRow();
   var hc = hr.insertCell();
   hc.width = 10;
   if(o.icon){
      var hc = hr.insertCell();
      hc.width = 16;
      o.hIcon = RBuilder.appendIcon(hc, o.icon);
      hcc = hr.insertCell();
      hcc.width = 4;
   }
   if(o.label){
      var hc = hr.insertCell();
      hc.align = 'center';
      hc.noWrap = true;
      o.hLabel = RBuilder.appendText(hc, o.label);
      o.hLabel.style.font = 'icon';
   }
   var hc = o.hFormEnd = hr.insertCell();
   hc.width = 10;
   o.__process = false;
   var ca = o.clickActive = new TActive(o, o.onButtonClickDelay);
   ca.interval = 500;
   ca.status = EActive.Sleep;
   RConsole.find(FActiveConsole).push(ca);
   return EEventStatus.Stop;
}
function FButton_oeMode(e){
   var o = this;
   o.base.FControl.oeMode.call(o, e);
   o.base.MDisplay.oeMode.call(o, e);
   return EEventStatus.Stop;
}
function FButton_setLabel(v){
   var o = this;
   o.label = v;
   o.hLabel.innerText = v;
   o.hLabel.noWrap = true;
}
function FButton_setLabelColor(c){
   var o = this;
   o.hLabel.style.color = '#FF0000';
}
function FButton_setLabelStyle(c, w, s){
   var o = this;
   o.hLabel.style.color = '#FF0000';
   o.hLabel.style.fontWeight = 'bold';
   o.hLabel.style.fontSize = '12';
}
function FButton_doClick(){
   var o = this;
   if(o.__process){
      return;
   }
   o.__process = true;
   o.clickActive.status = EActive.Active;
   o.lsnsClick.process(this);
   if(o.action){
      eval(o.action);
   }
   if(o.page){
      var form = RHtml.form(o.hButton);
      var p = RPage.parse(o.page);
      if(o.method){
         p.action = o.method;
      }
      p.split(o.attributes);
      var f = o.topControl(MDataset);
      if(f){
         var as = new TAttributes();
         f.saveValue(as);
         if(form && form.form_pack){
            form.form_pack.value = as.pack();
         }
      }
      p.post(form, RString.nvl(o.target, '_self'));
   }
   if(o.editUrl){
      var w = RConsole.find(FButtonConsole).find();
      w.linkUrl(o.editUrl);
      w.show();
   }
   if(o.editForm){
      var w = RConsole.find(FButtonFormConsole).find();
      w.linkForm(o);
      w.show();
   }
}
function FButton_dispose(){
   var o = this;
   o.base.FControl.dispose.call(o);
   o.hForm = null;
   o.hFormEnd = null;
   o.hLabel = null;
}
function FCalendar(o){
   o = RClass.inherits(this, o, FEditControl, MEditBorder, MDropable, MDescCalendar);
   o.editFormat  = RDate.DisplayFormat;
   o.editHour     = RClass.register(o, new TPtyBoolSet('editHour', 'editDate', EDateTimeMode.Hour));
   o.editMinute   = RClass.register(o, new TPtyBoolSet('editMinute', 'editDate', EDateTimeMode.Minute));
   o.editSecond   = RClass.register(o, new TPtyBoolSet('editSecond', 'editDate', EDateTimeMode.Second));
   o.borderStyle = EBorder.RoundDrop;
   o.date        = null;
   o.lsnEditEnd  = null;
   o.hForm       = null;
   o.hDrop       = null;
   o.hForm       = null;
   o.onKeyPress  = FCalendar_onKeyPress;
   o.onDataClick   = FCalendar_onDataClick;
   o.refreshStyle  = FCalendar_refreshStyle;
   o.onEditEnd   = FCalendar_onEditEnd;
   o.onBuildEdit = FCalendar_onBuildEdit;
   o.construct   = FCalendar_construct;
   o.formatValue = FCalendar_formatValue;
   o.formatText  = FCalendar_formatText;
   o.drop        = FCalendar_drop;
   o.doBlur      = FCalendar_doBlur;
   return o;
}
function FCalendar_onDataClick(){
   var o = this;
   if(!o.editCheck){
      o.drop();
   }
}
function FCalendar_onBuildEdit(b){
   var o = this;
   var htb = RBuilder.appendTable(b.hPanel);
    htb.style.tableLayout = 'fixed';
    var hr = o.hEdit = htb.insertRow();
   o.onBuildChange(hr.insertCell())
   var hc = hr.insertCell();
   var h = o.hEdit = RBuilder.appendEdit(hc, o.style('Edit'));
   h.style.disabled = 'true';
   if(o.editLength){
      h.maxLength = o.editLength;
   }
}
function FCalendar_onEditEnd(e){
   var o = this;
   if(e){
      o.set(e.get());
      o._invalidText = o.validText(o.text());
      o.refreshStyle();
   }
   o.onDataEditEnd(o);
}
function FCalendar_onKeyPress(e){
   if(!RString.inChars(String.fromCharCode(e.keyCode), RDate.Chars)){
      RKey.eventClear(e);
   }
}
function FCalendar_construct(){
   var o = this;
   o.base.FEditControl.construct.call(o);
   o.date = new TDate();
   o.lsnEditEnd = new TListener(o, o.onEditEnd);
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
   return RString.nvl(t);
}
function FCalendar_formatText(value){
   if(value){
      var o = this;
      RDate.autoParse(o.date, value);
      return RDate.formatDate(o.date, o.editFormat);
   }
   return RString.nvl(value);
}
function FCalendar_refreshStyle(){
   var o = this;
   o.base.FEditControl.refreshStyle.call(o);
   if(!o.editCheck){
      o.hEdit.readOnly = 'true';
   }
}
function FCalendar_drop(){
   var o = this;
   if(o.canDrop() && o._editable){
      var e = o.editor = RConsole.find(FEditConsole).focus(o, FCalendarEditor, o.name);
      e.set(o.reget(), o.editFormat);
      e.setHourEditable(o.editHour);
      e.setMinuteEditable(o.editMinute);
      e.setSecondEditable(o.editSecond);
      e.lsnEditEnd = o.lsnEditEnd;
      e.show();
   }
}
function FCalendar_doBlur(){
   var o = this;
   o.base.FEditControl.doBlur.call(o);
   if(o.editor){
      o.editor.hide();
   }
}
function FCalendarEditor(o){
   o = RClass.inherits(this, o, FDropEditor, MFocusLooper);
   o.editFormat       = null;
   o.dataValue        = null;
   o.date             = new TDate();
   o.hTitlePanel      = null;
   o.hYearPrior       = null;
   o.hYear            = null;
   o.hYearNext        = null;
   o.hMonthPrior      = null;
   o.hMonth           = null;
   o.hMonthNext       = null;
   o.hDaysPanel       = null;
   o.hTimePanel       = null;
   o.hTime            = null;
   o.hNow             = null;
   o.hOk              = null;
   o.hCancel          = null;
   o.hHour            = null;
   o.hMinute          = null;
   o.hSecond          = null;
   o.hSelect          = null;
   o.editFormat       = RDate.DisplayFormat;
   o.dateOrg          = new TDate();
   o.dateOrgValue     = null;
   o.dayCells         = new TList();
   o.focusObject      = null;
   o.skipBlur         = false;
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
   o.styleHour        = RClass.register(o, new TStyle('Hour'));
   o.styleSplit       = RClass.register(o, new TStyle('Split'));
   o.styleMinute      = RClass.register(o, new TStyle('Minute'));
   o.styleSecond      = RClass.register(o, new TStyle('Second'));
   o.styleNow         = RClass.register(o, new TStyle('Now'));
   o.styleOk          = RClass.register(o, new TStyle('Ok'));
   o.onDaySelect      = RClass.register(o, new HMouseDown('onDaySelect'), FCalendarEditor_onDaySelect);
   o.onButtonNow      = RClass.register(o, new HMouseDown('onButtonNow'), FCalendarEditor_onButtonNow);
   o.onDateKeyDown    = RClass.register(o, new HKeyDown('onDateKeyDown'), FCalendarEditor_onDateKeyDown);
   o.onDateBlur       = RClass.register(o, new HBlur('onDateBlur'), FCalendarEditor_onDateBlur);
   o.onTimeBlur       = RClass.register(o, new HBlur('onTimeBlur'), FCalendarEditor_onTimeBlur);
   o.onTimeClick      = RClass.register(o, new HClick('onTimeClick'), FCalendarEditor_onTimeClick);
   o.onDayDbClick     = RClass.register(o, new HDoubleClick('onDayDbClick'), FCalendarEditor_onDayDbClick);
   o.onDayEnter       = RClass.register(o, new HMouseEnter('onDayEnter'),    FCalendarEditor_onDayEnter);
   o.onDayOut         = RClass.register(o, new HMouseOut('onDayOut'),        FCalendarEditor_onDayOut);
   o.onButtonOk       = RClass.register(o, new HMouseDown('onButtonOk'),     FCalendarEditor_onButtonOk);
   o.onButtonCancel   = RClass.register(o, new HMouseDown('onButtonCancel'), FCalendarEditor_onButtonCancel);
   o.onButtonOver     = RClass.register(o, new HMouseEnter('onButtonOver'),  FCalendarEditor_onButtonOver);
   o.onButtonOut      = RClass.register(o, new HMouseOut('onButtonOut'),     FCalendarEditor_onButtonOut);
   o.onMdown          = RClass.register(o, new HMouseDown('onMdown'),        FCalendarEditor_onMdown);
   o.onMup            = RClass.register(o, new HMouseUp('onMup'),            FCalendarEditor_onMup);
   o.onBuildDrop      = FCalendarEditor_onBuildDrop;
   o.show             = FCalendarEditor_show;
   o.setMinuteEditable = FCalendarEditor_setMinuteEditable;
   o.setHourEditable   = FCalendarEditor_setHourEditable;
   o.setSecondEditable = FCalendarEditor_setSecondEditable;
   o.buildTitle       = FCalendarEditor_buildTitle;
   o.buildDays        = FCalendarEditor_buildDays;
   o.buildTime        = FCalendarEditor_buildTime;
   o.testBlur         = FCalendarEditor_testBlur;
   o.get              = FCalendarEditor_get;
   o.set              = FCalendarEditor_set;
   o.setDate          = FCalendarEditor_setDate;
   o.storeChange      = FCalendarEditor_storeChange;
   o.daySelectLsns    = new TListeners();
   o.onBuildButton    = FCalendarEditor_onBuildButton;
   o.ohKdown          = FCalendarEditor_ohKdown;
   o.ohDaysChange     = FCalendarEditor_ohDaysChange;
   o.ohKeyCheck       = FCalendarEditor_ohKeyCheck;
   o.onDateAction     = FCalendarEditor_onDateAction;
   o.panel            = FCalendarEditor_panel;
   o.dispose          = FCalendarEditor_dispose;
   return o;
}
function FCalendarEditor_onTimeClick(e){
   var o = this;
   var h = e.hSource;
   if(h.editAble){
      h.select();
   }
}
function FCalendarEditor_onTimeBlur(e){
	var o = this;
    var h = e.hSource;
    if(h == o.hHour){
       h.value = Math.min(RInteger.parse(h.value), 23);
    }else if(h == o.hMinute){
       h.value = Math.min(RInteger.parse(h.value), 59);
    }else if(h == o.hSecond){
       h.value = Math.min(RInteger.parse(h.value), 59);
    }
    o.storeChange();
    o.setDate(o.date);
}
function FCalendarEditor_onDayDbClick(e){
   var o = e.source
   if(RClass.isClass(o, FCalendarEditor) && 0 != RInteger.parse(e.hSource.innerText)){
      o.date.setDay(e.hSource.innerText);
      o.dataValue = RDate.formatDate(o.date);
      o.editEnd();
   }
}
function FCalendarEditor_onDaySelect(e){
   var o = this;
   if(RClass.isClass(o, FCalendarEditor) && 0 != RInteger.parse(e.hSource.innerText)){
	  var h = e.hSource;
	  if(o.hSelect){
		  o.hSelect.style.border = '1 solid #FFFFFF';
	  };
	  o.hSelect = h;
	  h.style.border = '1 solid #2BD6F0';
      o.date.setDay(h.innerText);
   }
}
function FCalendarEditor_onButtonNow(e){
   var o = e.source;
   if(RClass.isClass(o, FCalendarEditor)){
      o.dataValue = RDate.format();
      o.editEnd();
   }
}
function FCalendarEditor_onDateKeyDown(e, he){
   var o = this;
   var h = e.hSource;
   var v = h.value;
   if(EKey.Enter == e.keyCode){
      o.storeChange();
      o.setDate(o.date);
   }else if(EKey.Up == e.keyCode){
      if(h == o.hYear){
         o.hYear.value = RInteger.parse(o.hYear.value) + 1;
      }else if(h == o.hMonth){
         o.hMonth.value = RInteger.parse(o.hMonth.value) + 1;
      }else if(h == o.hHour){
    	  if(o.hHour.editAble){
		     if(v < 23){
			    h.value = RInteger.parse(h.value) + 1;
			 }
    	  }
	  }else if(h == o.hMinute){
		 if(o.hMinute.editAble){
		    if(v < 59){
			   h.value = RInteger.parse(h.value) + 1;
			}
	     }
	  }else{
		  if(o.hSecond.editAble){
		     if(v < 59){
			    h.value = RInteger.parse(h.value) + 1;
		     }
	      }
	  }
      o.storeChange();
      o.setDate(o.date);
   }else if(EKey.Down == e.keyCode){
      if(h == o.hYear){
         o.hYear.value = RInteger.parse(o.hYear.value) - 1;
      }else if(h == o.hMonth){
         o.hMonth.value = RInteger.parse(o.hMonth.value) - 1;
      }else if(h == o.hHour){
    	 if(o.hHour.editAble){
            if(v > 0){
	           h.value = RInteger.parse(h.value) - 1;
	        }
    	 }
	  }else if(h == o.hMinute){
		  if(o.hMinute.editAble){
		     if(v > 0){
	            h.value = RInteger.parse(h.value) - 1;
	         }
		  }
	  }else{
		  if(o.hSecond.editAble){
		     if(v > 0){
		        h.value = RInteger.parse(h.value) - 1;
		     }
		  }
	  }
      o.storeChange();
      o.setDate(o.date);
      h.select();
   }else{
	  if(h == o.hHour || h == o.hMinute || h == o.hSecond){
	     if(h.editAble){
	        RKey.fixChars(he, RDate.Chars);
	     }else{
	        he.keyCode = 0;
	        he.returnValue = false;
	     }
	  }else{
		  RKey.fixChars(he, RDate.Chars);
	  }
   }
}
function FCalendarEditor_onDateBlur(){
   var o = this;
   o.storeChange();
   o.setDate(o.date);
}
function FCalendarEditor_onBuildDrop(){
   var o = this;
   o.hDatePanel = RBuilder.appendTable(o.hDropPanel);
   o.hDropPanel.align = 'center';
   o.hDatePanel.width = '100%';
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
   var hRow = o.hDatePanel.insertRow();
   var hCell = o.hTimePanel = hRow.insertCell();
   o.buildTime();
   o.pushFocus(o.hYear);
   o.pushFocus(o.hMonth);
}
function FCalendarEditor_show(v){
   var o = this;
   o.base.FDropEditor.show.call(o, v);
   var hp = o.hPanel;
   var hbf = o.hBorderForm;
   var s = o.source;
   var r = s.getEditRange();
   hp.style.pixelLeft = r.x;
   hp.style.pixelTop = r.y + r.height;
   hp.style.pixelWidth = 273;
   o.base.MShadow.show.call(o);
}
function FCalendarEditor_buildTitle(){
   var o = this;
   var hTab = RBuilder.appendTable(o.hTitlePanel, null, 0, 5, 1);
   hTab.align = 'center';
   hTab.width = '100%';
   hTab.style.filter = "progid:DXImageTransform.Microsoft.Gradient(startColorStr='#E5FAFE', endColorStr='#FFFFFF', gradientType='0')";
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
   o.attachEvent('onDateBlur', h, o.onDateBlur);
   o.attachEvent('onDateKeyDown', h, o.onDateKeyDown);
   var hCel = hRow.insertCell();
   hCel.innerText = RContext.get('FCalendarEditor:year');
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
   o.attachEvent('onDateBlur', h, o.onDateBlur);
   o.attachEvent('onDateKeyDown', h, o.onDateKeyDown);
   var hCel = hRow.insertCell();
   hCel.innerText = RContext.get('FCalendarEditor:month');
   hCel.className = o.style('YearMonth');
   var hCel = hRow.insertCell();
   var h = o.hMonthNext = RBuilder.append(hCel, 'SPAN', o.style('Button'));
   h.link = o;
   h.linkAction = o.onDateAction;
   h.innerText = '4';
   o.attachEvent("onButtonOver",h);
   o.attachEvent("onButtonOut",h);
   o.attachEvent("onMdown", h);
   o.attachEvent("onMup", h);
}
function FCalendarEditor_buildDays(){
   var o = this;
   var hTab = RBuilder.appendTable(o.hDaysPanel, null, 0, 0, 1);
   hTab.width = '100%';
   var weekDays = RContext.get('FCalendarEditor:weekdays').split(',');
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
         o.attachEvent("onDayEnter", h);
         o.attachEvent("onDayOut", h);
         o.attachEvent("onDaySelect", h);
         o.attachEvent("onDayDbClick", h);
         h.innerText = '.';
         o.dayCells.push(h);
      }
   }
}
function FCalendarEditor_buildTime(){
   var o = this;
   var hTab = RBuilder.appendTable(o.hTimePanel, null, 0, 1, 1);
   var ht = o.hTimePanel;
   ht.style.filter = "progid:DXImageTransform.Microsoft.Gradient(startColorStr='#FFFFFF', endColorStr='#E5FAFE', gradientType='0')";
   var hRow = hTab.insertRow();
   var hb1 = hRow.insertCell();
   hb1.width = 5;
   var hl = hRow.insertCell();
   hl.width = 50;
   hl.style.color = '#1F8FB7';
   hl.style.fontWeight = 'BOLD';
   hl.innerText='时间:';
   var hc = hRow.insertCell();
   var hb = RBuilder.appendTable(hc, null, 0, 0, 0);
   hc.style.border = '1 solid #2BD6F0';
   hc.style.backgroundColor = '#FFFFFF';
   var hr = hb.insertRow();
   var hh =hr.insertCell();
   var hHour = o.hHour = RBuilder.appendEdit(hh, o.style('Hour'));
   hHour.maxLength = 2;
   o.attachEvent("onTimeClick", hHour);
   o.attachEvent("onDateKeyDown", hHour, o.onDateKeyDown);
   o.attachEvent("onTimeBlur", hHour, o.onTimeBlur);
   var hs1 = hr.insertCell();
   hs1.innerText = ':';
   var hm = hr.insertCell();
   var hMinute = o.hMinute = RBuilder.appendEdit(hm, o.style('Minute'));
   hMinute.maxLength = 2;
   o.attachEvent("onTimeClick", hMinute);
   o.attachEvent("onDateKeyDown", hMinute, o.onDateKeyDown);
   o.attachEvent("onTimeBlur", hMinute, o.onTimeBlur);
   var hs2 = hr.insertCell();
   hs2.innerText = ':';
   var hs = hr.insertCell();
   var hSecond = o.hSecond = RBuilder.appendEdit(hs, o.style('Second'));
   hSecond.maxLength = 2;
   o.attachEvent("onTimeClick", hSecond);
   o.attachEvent("onDateKeyDown", hSecond, o.onDateKeyDown);
   o.attachEvent("onTimeBlur", hSecond, o.onTimeBlur);
   var hb2 = hRow.insertCell();
   hb2.width = 50;
   var hn = hRow.insertCell();
   hn.style.display = 'none';
   var hNow = o.hNow = RBuilder.append(hn, 'SPAN', o.style('Now'));
   hNow.style.width = 50;
   hn.style.border='1 solid #2BD6F0';
   hNow.innerText = RContext.get('FCalendarEditor:now');
   hNow.style.display = 'none';
   hNow.link = o;
   o.attachEvent("onButtonNow", hNow);
   var hc = hRow.insertCell();
   var hCl = o.hCancel = RBuilder.append(hc, 'SPAN', o.style('Ok'));
   hCl.style.width = 50;
   hc.style.border='1 solid #2BD6F0';
   hCl.link = o;
   o.attachEvent("onButtonCancel", hCl);
   hCl.innerText = RContext.get('FCalendarEditor:cancel');
   var ho = hRow.insertCell();
   var hOk = o.hOk = RBuilder.append(ho, 'SPAN', o.style('Ok'));
   hOk.style.width = 50;
   ho.style.border='1 solid #2BD6F0';
   hOk.link = o;
   o.attachEvent("onButtonOk", hOk);
   hOk.innerText = RContext.get('FCalendarEditor:ok');
}
function FCalendarEditor_testBlur(c){
   return this.source != c;
}
function FCalendarEditor_get(){
   return this.dataValue;
}
function FCalendarEditor_set(value, format){
   var o = this;
   o.changed = false;
   o.skipBlur = 0;
   o.dataValue = value;
   o.dateOrgValue = value;
   o.editFormat = format;
   RDate.parse(o.date, value);
   RDate.parse(o.dateOrg, value);
   if(!value){
      o.date.now();
      RDate.parse(o.date, value);
      RDate.parse(o.dateOrg, value);
   }
   o.setDate(o.date);
}
function FCalendarEditor_setDate(date){
   var o = this;
   o.hYear.value = date.year;
   o.hMonth.value = date.month;
   o.hHour.value = RString.lpad(date.hour, 2, '0');
   o.hMinute.value = RString.lpad(date.minute, 2, '0');
   o.hSecond.value = RString.lpad(date.second, 2,'0');
   var selDay = date.day;
   if(!(o.dateOrg.year == date.year && o.dateOrg.month == date.month)){
      selDay = -1;
   }
   if(o.hSelect){
	   o.hSelect.style.border='1 solid #FFFFFF';
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
            o.hSelect = h;
            h.style.border = '1 solid #2BD6F0';
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
function FCalendarEditor_setHourEditable(v){
   var o = this;
   if(!v){
	   o.hHour.value = '00';
	   o.hHour.style.cursor='default';
	   o.hHour.style.color='gray';
	   o.hHour.editAble = false;
   }else{
	   o.hHour.editAble = true;
   }
}
function FCalendarEditor_setMinuteEditable(v){
   var o = this;
   if(!v){
	   o.hMinute.value = '00';
	   o.hMinute.style.cursor='default';
	   o.hMinute.style.color='gray';
	   o.hMinute.editAble = false;
   }else{
	   o.hMinute.editAble = true;
   }
}
function FCalendarEditor_setSecondEditable(v){
   var o = this;
   if(!v){
	   o.hSecond.value = '00';
	   o.hSecond.style.cursor='default';
	   o.hSecond.style.color='gray';
	   o.hSecond.editAble = false;
   }else{
	   o.hSecond.editAble = true;
   }
}
function FCalendarEditor_storeChange(){
   var o = this;
   o.date.setYear(o.hYear.value);
   o.date.setMonth(o.hMonth.value);
   o.date.setHour(Math.min(RInteger.parse(o.hHour.value), 23));
   o.date.setMinute(Math.min(RInteger.parse(o.hMinute.value), 59));
   o.date.setSecond(Math.min(RInteger.parse(o.hSecond.value), 59));
}
function FCalendarEditor_onBuildButton(){
   var o = this;
   return;
   o.base.FDropEditor.onBuildButton.call(o);
   var h = o.hNow = RBuilder.append(o.hButtonPanel, 'SPAN', o.style('Now'));
   var hp = o.hButtonPanel;
   hp.style.filter = "progid:DXImageTransform.Microsoft.Gradient(startColorStr='#FFFFFF', endColorStr='#E5FAFE', gradientType='0')";
   hp.height = 20;
   h.innerText = RContext.get('FCalendarEditor:now');
   o.attachEvent("onButtonNow",h);
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
         o.storeChange();
         o.editStatus = EEditStatus.Ok;
         o.endEdit();
      }else if(EKey.Enter == e.keyCode){
         o.storeChange();
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
function FCalendarEditor_onButtonOk(e){
   var o = e.source;
   if(RClass.isClass(o, FCalendarEditor)){
      o.editStatus = EEditStatus.Ok;
      o.dataValue = RDate.formatDate(o.date);
      o.editEnd();
   }
}
function FCalendarEditor_onButtonCancel(e) {
   var o = e.source;
   if(RClass.isClass(o, FCalendarEditor)){
	 o.editStatus = EEditStatus.Cancel;
     o.dataValue = '';
     o.editEnd();
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
   if(!RString.inChars(String.fromCharCode(e.keyCode), RDate.Chars)){
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
      return o.hPanel;
   }
   return o.base.FDropEditor.panel.call(o, type);
}
function FCalendarEditor_dispose(){
   var o = this;
   o.base.FDropEditor.dispose.call(o);
   o.hDatePanel = null;
   o.hDropPanel = null;
   o.hTitlePanel = null;
   o.hOk = null;
   o.hNow = null;
   o.hButtonPanel = null;
   o.hMonthNext = null;
   o.hYear = null;
   o.hMonth = null;
   o.hTime = null;
   o.hTimePanel = null;
}
function FCheck(o){
   o = RClass.inherits(this, o, FEditControl);
   o._styleInput      = RClass.register(o, new AStyle('_styleInput', 'Input'));
   o._hInput          = null;
   o.onBuildEditValue = FCheck_onBuildEditValue;
   return o;
}
function FCheck_onBuildEditValue(p){
   var o = this;
   o._hInput = RBuilder.appendCheck(o._hValuePanel, o.styleName('Input'));
}
function FCheck_oeSaveValue(e){
   var o = this;
   if(EStore.Prepare == e.store){
      if(RBoolean.isTrue(o.reget())){
         e.values.set(o.dataName, EBoolean.True);
      }
      return EEventStatus.Stop;
   }
   return o.base.FEditControl.oeSaveValue.call(o, e);
}
function FCheck_refreshStyle(){
   var o = this;
   var h = o.panel(EPanel.Edit);
   h.disabled = !o._editable;
   if(!o._editable){
      o.hEdit.style.cursor = 'normal';
   }
}
function FCheckPicker(o){
   o = RClass.inherits(this, o, FEditControl, MEditBorder, MDescCheckPicker, MDropable);
   o.stIconDropSelect = RClass.register(o, new TStyleIcon('DropSelect'));
   o.items            = new TItems();
   o.borderStyle      = EBorder.RoundDrop;
   o.onBuildEdit      = FCheckPicker_onBuildEdit;
   o.onEditEnd        = FCheckPicker_onEditEnd;
   o.onDataKeyDown    = FCheckPicker_onDataKeyDown;
   o.loadConfig       = FCheckPicker_loadConfig;
   o.formatValue      = FCheckPicker_formatValue;
   o.validText        = FCheckPicker_validText;
   o.formatText       = FCheckPicker_formatText;
   o.refreshStyle     = FCheckPicker_refreshStyle;
   o.drop             = FCheckPicker_drop;
   o.dispose          = FCheckPicker_dispose;
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
   if(!RString.isEmpty(text)){
      ta = RString.split(text, ',');
      var vs = new Array();
      var item = o.items.items;
      for(var n = 0; n < ta.length; n++){
         for(var m = 0; m < item.count; m++){
            var c = item.value(m);
            if(c.label == ta[n]){
               vs.push(c.value);
            }
         }
      }
      return RString.toUpper(vs.join());
   }else{
      return '';
   }
}
function FCheckPicker_validText(text){
   var o = this;
   if(RString.isEmpty(text)){
      return true;
   }
   return !RString.isEmpty(o.formatValue(text));
}
function FCheckPicker_formatText(v){
   var o = this;
   if(!RString.isEmpty(v)){
      va = RString.split(v, ',');
      var vs = new Array();
      var item = o.items.items;
      for(var n = 0; n < va.length; n++){
         var t = item.values[item.indexOf(va[n])];
         if(t){
            vs.push(t.label);
         }
      }
      return RString.toUpper(vs.join());
   }else{
      return '';
   }
}
function FCheckPicker_refreshStyle(){
   var o = this;
   o.base.FEditControl.refreshStyle.call(o);
   o.hDrop.src = o.styleIconPath(o._hover ? 'DropSelect' : 'Drop');
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
function FCheckPicker_dispose(){
   var o = this;
   o.base.FEditControl.dispose.call(o);
   RMemory.freeHtml(o.hEdit);
   o.hEdit = null;
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
   o.values           = new Array();
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
   o.dispose          = FCheckPickerEditor_dispose;
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
   var vs = new Array();
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
   if(!RString.isEmpty(v)){
      o.values = v;
      va = RString.split(v, ',');
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
function FCheckPickerEditor_dispose(){
   var o = this;
   o.base.FDropEditor.dispose.call(o);
   RMemory.freeHtml(o.hPanel);
   RMemory.freeHtml(o.hItemsForm);
   RMemory.freeHtml(o.hItemsPanel);
   RMemory.freeHtml(o.hBtnTextSpan);
   RMemory.freeHtml(o.hDropPanel);
   RMemory.freeHtml(o.hButtonPanel);
   o.hPanel = null;
   o.hItemsForm = null;
   o.hItemsPanel = null;
   o.hBtnTextSpan = null;
   o.hDropPanel = null;
   o.hButtonPanel = null;
}
function FColorPicker(o){
   o = RClass.inherits(this, o, FEditControl, MEditBorder, MDescColor, MDropable);
   o.borderStyle = EBorder.RoundDrop;
   o.onBuildEdit = FColorPicker_onBuildEdit;
   o.onEditEnd   = FColorPicker_onEditEnd;
   o.onDataKeyDown   = FColorPicker_onDataKeyDown;
   o.checkColor = FColorPicker_checkColor;
   o.setText     = FColorPicker_setText;
   o.drop        = FColorPicker_drop;
   o.dispose     = FColorPicker_dispose;
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
   o.base.FEditControl.setText.call(o, RString.toUpper(t));
   o.hDrop.style.backgroundColor = t;
}
function FColorPicker_checkColor(c)
{
   var oSpan = document.createElement("<span style='color:"+c+";'></span>");
   if(oSpan.style.color != ""){
      return true;
   }else{
      return false;
   }
   oSpan = null;
}
function FColorPicker_onDataKeyDown(e){
      var o = this;
      o.base.FEditControl.onDataKeyDown.call(o, o, e);
      if(o.checkColor(o.text())){
         o.hDrop.style.backgroundColor = o.text();
      }else{
         o.hDrop.style.backgroundColor = '';
      }
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
function FColorPicker_dispose(){
   var o = this;
   o.base.FEditControl.dispose.call(o);
   RMemory.freeHtml(o.hEdit);
   RMemory.freeHtml(o.hDrop);
   o.hEdit = null;
   o.hDrop = null;
}
function FColorPickerEditor(o){
   o = RClass.inherits(this, o, FDropEditor, MShadow);
   o.MinWidth     = 240;
   o.ColorHex     = new Array('00', '33', '66', '99', 'CC', 'FF');
   o.SpColorHex   = new Array('FF0000', '00FF00', '0000FF', 'FFFF00', '00FFFF','FF00FF');
   o.onCellEnter  = RClass.register(o, new HMouseOver('onCellEnter'),  FColorPickerEditor_onCellEnter);
   o.onCellSelect = RClass.register(o, new HMouseDown('onCellSelect'), FColorPickerEditor_onCellSelect);
   o.color        = null;
   o.hTable       = null;
   o.cellWidth    = 16;
   o.cellHeight   = 10;
   o.onBuildDrop  = FColorPickerEditor_onBuildDrop;
   o.onKeyDown    = FColorPickerEditor_onKeyDown;
   o.onCellSelect = FColorPickerEditor_onCellSelect;
    o.onEditEnd = FColorPickerEditor_onEditEnd;
   o.makeCell     = FColorPickerEditor_makeCell;
   o.set          = FColorPickerEditor_set;
   o.show         = FColorPickerEditor_show;
   o.hide         = FColorPickerEditor_hide;
   o.linkControl  = FColorPickerEditor_linkControl;
   o.dispose      = FColorPickerEditor_dispose;
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
function FColorPickerEditor_onEditEnd(){
   var o = this;
   var t = o.editable;
   RLog.debug(o, 'Edit end (editable={0}, status={1})', RClass.dump(t), REnum.decode(EEditStatus, o.editStatus));
   if(t){
      t.hDrop.style.backgroundColor = o.color;
      var ec = RConsole.find(FEventConsole);
      if(EEditStatus.Cancel == o.editStatus){
         ec.add(t, t.focus);
      }else if(EEditStatus.Ok == o.editStatus){
         t.onEditEnd(o);
         ec.add(t, t.focus);
      }
   }
   o.editable = null;
   o.inEdit = false;
}
function FColorPickerEditor_hide(){
   var o = this;
   o.source = null;
   o.base.FDropEditor.hide.call(o);
   o.base.MShadow.hide.call(o);
}
function FColorPickerEditor_dispose(){
   var o = this;
   o.base.FDropEditor.dispose.call(o);
   RMemory.freeHtml(o.hTable);
   RMemory.freeHtml(o.hDropPanel);
   RMemory.freeHtml(o.hEdit);
   o.hTable = null;
   o.hDropPanel = null;
   o.hEdit = null;
}
function FUiForm(o){
   o = RClass.inherits(this, o, FUiLayout, MDataset);
   o.onMouseDown        = FUiForm_onMouseDown;
   o.construct          = FUiForm_construct;
   o.buildDefine        = FUiForm_buildDefine;
   o._dataStatusCd      = ERowStatus.Update;
   o._clearEvent        = null;
   o._resetEvent        = null;
   o._loadEvent         = null;
   o._saveEvent         = null;
   o._recordEvent       = null;
   o._codeEvent         = null;
   o._dataComponents    = null;
   o.lsnsLoaded         = null;
   o.lsnsClick          = null;
   o.onLoadDataset      = FUiForm_onLoadDataset;
   o.onLoadDatasetEnd   = FUiForm_onLoadDatasetEnd;
   o.isDataChanged      = FUiForm_isDataChanged;
   o.getFormLink        = FUiForm_getFormLink;
   o.allDataComponents  = FUiForm_allDataComponents;
   o.get                = FUiForm_get;
   o.reget              = FUiForm_reget;
   o.set                = FUiForm_set;
   o.getDataCodes       = FUiForm_getDataCodes;
   o.getCurrentRow      = FUiForm_getCurrentRow;
   o.getSelectedRows    = FUiForm_getSelectedRows;
   o.getCurrentRows     = FUiForm_getCurrentRows;
   o.getChangedRows     = FUiForm_getChangedRows;
   o.getRows            = FUiForm_getRows;
   o.clearValue         = FUiForm_clearValue;
   o.resetValue         = FUiForm_resetValue;
   o.loadValue          = FUiForm_loadValue;
   o.saveValue          = FUiForm_saveValue;
   o.recordValue        = FUiForm_recordValue;
   o.toAttributes       = FUiForm_toAttributes;
   o.focus              = FUiForm_focus;
   o.dsUpdate           = FUiForm_dsUpdate;
   o.doPrepare          = FUiForm_doPrepare;
   o.doUpdate           = FUiForm_doUpdate;
   o.doDelete           = FUiForm_doDelete;
   o.dispose            = FUiForm_dispose;
   return o;
}
function FUiForm_onMouseDown(p){
   var o = this;
}
function FUiForm_construct(){
   var o = this;
   o.__base.FUiLayout.construct.call(o);
}
function FUiForm_buildDefine(n, p){
   var o = this;
   var x = RConsole.find(FDescribeFrameConsole).load(n);
   RControl.build(o, x, null, p);
}
function FUiForm_onLoadDataset(ds){
   var o = this;
   o.doUpdate(o.dsViewer.current());
}
function FUiForm_onLoadDatasetEnd(){
   var o = this;
   o.topControl().topResize();
   o.psProgress(false);
}
function FUiForm_isDataChanged(){
   var o = this;
   var ps = o.allDataComponents();
   if(!ps.isEmpty()){
      var pc = ps.count;
      for(var n=0; n<pc; n++){
         var p = ps.value(n);
         if(p.isDataChanged()){
            return true;
         }
      }
   }
}
function FUiForm_getFormLink(t){
   var o = this;
   if(EFormLink.Form == t){
      return o.name;
   }else if(EFormLink.Table == t){
      return o.formName;
   }
   RMessage.fatal(o, null, 'Form link is invalid. (type={0})', t);
}
function FUiForm_allDataComponents(p, m){
   var o = this;
   if(!p){
      p = o;
   }
   if(!m){
      m = o._dataComponents;
   }
   var cs = p.components;
   if(cs){
      var cc = cs.count;
      for(var n = 0; n<cc; n++){
         var c = cs.value(n);
         if(!RClass.isClass(c, MDataset)){
            if(RClass.isClass(c, MValue)){
               m.set(c.dataName, c);
            }
            o.allDataComponents(c, m);
         }
      }
   }
   return m;
}
function FUiForm_get(n){
   var ps = this.allDataComponents();
   if(ps){
      var p = ps.get(n);
      if(p){
         return p.get();
      }
   }
}
function FUiForm_reget(n){
   var ps = this.allDataComponents();
   if(ps){
      var p = ps.get(n);
      if(p){
         return p.reget();
      }
   }
}
function FUiForm_set(n, v){
   var ps = this.allDataComponents();
   if(ps){
      var p = ps.get(n);
      if(p){
         p.set(v);
      }
   }
}
function FUiForm_getDataCodes(){
   var o = this;
   var e = o._codeEvent;
   e.values = new TAttributes();
   o.process(e);
   return e.values;
}
function FUiForm_getCurrentRow(){
   return this.saveValue();
}
function FUiForm_getSelectedRows(){
   var ls = new TList();
   ls.push(this.saveValue());
   return ls;
}
function FUiForm_getCurrentRows(){
   var o = this;
   var ls = new TList();
   var r = new TRow();
   o.toDeepAttributes(r);
   o.saveValue(r);
   ls.push(r);
   return ls;
}
function FUiForm_getChangedRows(){
   var o = this;
   var ls = new TList();
   if(o.isDataChanged()){
      var r = new TRow();
      o.toDeepAttributes(r);
      o.saveValue(r);
      ls.push(r);
   }
   return ls;
}
function FUiForm_getRows(){
   var ls = new TList();
   ls.push(this.saveValue());
   return ls;
}
function FUiForm_clearValue(){
   this.process(this._clearEvent);
}
function FUiForm_resetValue(){
   this.process(this._resetEvent);
}
function FUiForm_loadValue(r, m){
   if(r){
      var o = this;
      var e = o._loadEvent;
      e.viewer = o.dsViewer;
      e.store = m;
      e.values = r;
      o.process(e);
   }
}
function FUiForm_saveValue(r, m){
   var o = this;
   if(!r){
      r = new TRow();
   }
   var e = o._saveEvent;
   e.viewer = o.dsViewer;
   e.store = m;
   e.values = r;
   o.process(e);
   r.set('_status', o._dataStatusCd);
   return r;
}
function FUiForm_recordValue(){
   this.process(this._recordEvent);
}
function FUiForm_toAttributes(r, m){
   return this.saveValue(r, m);
}
function FUiForm_focus(){
   var o = this;
   o.__base.MFocus.focus.call(o);
   o.focusControl();
   RConsole.find(FFocusConsole).focusClass(MDataset, o);
}
function FUiForm_dsUpdate(u, v){
   var o = this;
   if(u){
      o.psProgress(true);
      o.psMode(EMode.Update);
      var g = new TDatasetFetchArg(o.name, o.formId, o.dsPageSize, 0);
      g.form = o;
      g.reset = true;
      o.dsSearchs.clear();
      if(u){
         o.dsSearchs.push(new TSearchItem('OUID', u));
      }
      if(v){
         o.dsSearchs.push(new TSearchItem('OVER', v));
      }
      g.searchs = o.dsSearchs;
      g.values.append(o.dsValues);
      g.callback = new TInvoke(o, o.onDsUpdate);
      if(o.onDsUpdateCheck(g)){
         RConsole.find(FDatasetConsole).fetch(g);
      }
      return;
   }
   return o.__base.MDataset.dsUpdate.call(o, u, v)
}
function FUiForm_setEditable(v){
   var ps = this.allDataComponents();
   if(ps){
	   var pc = ps.count;
	   for(var n = 0; n < pc; n++){
	      var p = ps.value(n);
	      p.setEditable(v);
	   }
   }
}
function FUiForm_doPrepare(v){
   var o = this;
   o._dataStatusCd = ERowStatus.Insert;
   o.resetValue();
   o.loadValue(v);
   o.recordValue();
   o.dsLoaded();
}
function FUiForm_doUpdate(v){
   var o = this;
   o._dataStatusCd = ERowStatus.Update;
   o.clearValue();
   o.loadValue(v);
   o.recordValue();
   o.dsLoaded();
}
function FUiForm_doDelete(v){
   var o = this;
   o._dataStatusCd = ERowStatus.Delete;
   o.clearValue();
   o.loadValue(v);
   o.recordValue();
   o.dsLoaded();
}
function FUiForm_dispose(){
   var o = this;
   o.__base.FUiLayout.dispose.call(o);
   RMemory.freeHtml(o.hEdit);
   RMemory.freeHtml(o.hDrop);
   o.hEdit = null;
   o.hDrop = null;
}
function FUiForm_allNameComponents(f, p, m){
   var o = this;
   var vs = o._nameComponents;
   if(!f && vs){
      return vs;
   }
   if(!vs){
      vs = o._nameComponents = new TMap();
   }
   if(f){
      vs.clear();
   }
   if(!p){
      p = this;
   }
   if(!m){
      m = vs;
   }
   var cs = p.components;
   if(cs){
      var cc = cs.count;
      for(var n = 0; n<cc; n++){
         var c = cs.value(n);
         if(!RClass.isClass(c, MDataset)){
            if(RClass.isClass(c, MValue)){
               m.set(c.name, c);
            }
            o.allNameComponents(false, c, m);
         }
      }
   }
   return vs;
}
function FUiForm_onLoaded(){
   var o = this.form;
   var doc = this.document;
   if(o && doc){
      RControl.build(o, doc.root());
      o.isLoading = false;
      o.lsnsLoaded.process(o);
   }
}
function FUiForm_onDsFetchEnd(){
   var o = this;
   var v = o.dsCurrent();
   if(v){
      o.loadValue(v);
   }
}
function FUiForm_onDsUpdateBegin(){
   var o = this;
   var v = o.dsCurrent();
   if(v){
      o.saveValue(v);
   }
}
function FUiForm_onDsUpdateEnd(){
   var o = this;
   var v = o.dsCurrent();
   if(v){
      o.loadValue(v);
   }
}
function FUiForm_connect(service, type, action, attrs){
   var doc = new TXmlDocument();
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
function FUiForm_loadDocument(doc){
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
function FUiForm_testStatus(t){
   var o = this;
   var r = o.__base.MDataset.testStatus.call(o, t);
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
function FUiForm_hasAction(){
   var o = this;
   var cs = o.components;
   var ct = cs.count;
   for(var n = 0; n < ct; n++){
      var c = cs.value(n);
      if(RClass.isClass(c, FDataAction)){
         return true;
      }
   }
   return false;
}
function FIconPicker(o){
   o = RClass.inherits(this, o, FEditControl, MEditBorder, MListView);
   o.iconDefault    = RClass.register(o, new TPtyStr('iconDefault'));
   o.stIconDefault  = RClass.register(o, new TStyleIcon('Default'));
   o.hEditIcon      = null;
   o.borderStyle    = EBorder.RoundIcon;
   o.onEditKeyDown  = FIconPicker_onEditKeyDown;
   o.onEditKeyPress = FIconPicker_onEditKeyPress;
   o.onBuildEdit    = FIconPicker_onBuildEdit;
   o.setText        = FIconPicker_setText;
   o.dispose        = FIconPicker_dispose;
   return o;
}
function FIconPicker_onEditKeyDown(e){
   var o = this;
   o.base.FEditControl.onEditKeyDown.call(o,e);
   o.hEditIcon.src = RRes.iconPath(RString.nvl(o.text(), o.styleIcon("Default")));
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
   b.hIcon.width = 1;
   h.align = 'center';
   h.noWrap = 'true';
   var hi = RString.nvl(o.iconDefault, o.styleIcon("Default"));
   o.hEditIcon = RBuilder.appendIcon(h, hi);
   var h = o.hEdit = RBuilder.appendEdit(h, o.style('Edit'));
   h.autocomplete = RBool.isTrue(o.editComplete) ? 'on' : 'off';
   if(o.editLength){
      h.maxLength = o.editLength;
   }
}
function FIconPicker_setText(t){
   var o = this;
   o.base.FEditControl.setText.call(o, t);
   o.hEditIcon.src = RResource.iconPath(RString.nvl(o.text(), o.styleIcon("Default")));
}
function FIconPicker_dispose(){
   var o = this;
   o.base.FEditControl.dispose.call(o);
   o.hEditIcon = null;
   o.hEdit = null;
}
function FLabel(o){
   o = RClass.inherits(this, o, FEditControl);
   o.onBuildEdit  = FLabel_onBuildEdit;
   o.text         = FLabel_text;
   o.setText      = FLabel_setText;
   o.refreshStyle = RMethod.empty;
   return o;
}
function FLabel_onBuildEdit(){
   var o = this;
}
function FLabel_text(){
}
function FLabel_setText(t){
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
   o.dispose      = FListItem_dispose;
   return o;
}
function FListItem_oeBuild(e){
   var o = this;
   o.base.FControl.oeBuild.call(o, e);
   if(e.isBefore()){
      var hf = o.hForm = RBuilder.appendTable(o.hPanel, o.style('Form'));
      var hRow = hf.insertRow();
      var hc = hRow.insertCell();
      hc.className = o.style('Icon');
      hc.width = 20;
      o.hIcon = RBuilder.appendIcon(hc, 'arrow');
      var hc = hRow.insertCell();
      var h = o.hLabel = RBuilder.append(hc, 'SPAN', o.style('Label'));
      h.innerText = o.label;
   }
}
function FListItem_onBuildPanel(){
   this.hPanel = RBuilder.create(null, 'DIV');
}
function FListItem_formatValue(s){
   return RString.nvl(s);
}
function FListItem_text(){
   return this.hEdit.value;
}
function FListItem_setText(text){
   this.hEdit.value = text;
}
function FListItem_dispose(){
   var o = this;
   o.base.FControl.dispose.call(o);
   o.hForm = null;
   o.hIcon = null;
   o.hLabel = null;
   o.hPanel = null;
   o.hEdit = null;
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
   o.dispose        = FListView_dispose;
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
   var doc = new TXmlDocument();
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
         var flds = RString.splitTwo(fields, ',');
         for(var n=0; n<flds.length; n++){
            var v = RString.splitTwo(flds[n], ' ');
            dsCtl.dsSet(RString.nvl(v[1], v[0]), row.get(v[0]));
         }
         dsCtl.loadValue(dsCtl.dsCurrent());
      }
   }
   o.hide();
}
function FListView_isBuilded(){
   return (null != this.listView);
}
function FListView_dispose(){
   var o = this;
   o.base.FContainer.dispose.call(o);
   RMemory.freeHtml(o.hEdit);
   RMemory.freeHtml(o.hButton);
   RMemory.freeHtml(o.hText);
   RMemory.freeHtml(o.userSrc);
   RMemory.freeHtml(o.femaleSrc);
   RMemory.freeHtml(o.errorSrc);
   RMemory.freeHtml(o.orgSrc);
   RMemory.freeHtml(o.dutySrc);
   RMemory.freeHtml(o.roleSrc);
   RMemory.freeHtml(o.userUk);
   o.hEdit = null;
   o.hButton = null;
   o.hText = null;
   o.userSrc = null;
   o.femaleSrc = null;
   o.errorSrc = null;
   o.orgSrc = null;
   o.dutySrc = null;
   o.roleSrc = null;
   o.userUk = null;
}
function FNumber2(o){
   o = RClass.inherits(this, o, FEditControl);
   o._inputSize       = RClass.register(o, new APtySize2('_inputSize'));
   o._styleInputPanel = RClass.register(o, new AStyle('_styleInputPanel'));
   o._styleInput      = RClass.register(o, new AStyle('_styleInput'));
   o._hInput          = null;
   o.onBuildEditValue = FNumber2_onBuildEditValue;
   o.construct        = FNumber2_construct;
   o.get              = FNumber2_get;
   o.set              = FNumber2_set;
   return o;
}
function FNumber2_oeDataLoad(p){
   var o = this;
   alert(p);
   return EEventStatus.Stop;
}
function FNumber2_oeDataSave(p){
   var o = this;
   return EEventStatus.Stop;
}
function FNumber2_onBuildEditValue(p){
   var o = this;
   var h = o._hValuePanel;
   h.className = o.styleName('InputPanel');
   var hf = o._hInputForm = RBuilder.appendTable(h);
   var hr = RBuilder.appendTableRow(hf);
   var hc1 = RBuilder.appendTableCell(hr);
   hc1.style.borderRight = '1px solid #666666';
   var he1 = o._hInput1 = RBuilder.appendEdit(hc1, o.styleName('Input'));
   var hc2 = RBuilder.appendTableCell(hr);
   hc2.style.borderLeft = '1px solid #999999';
   var he2 = o._hInput2 = RBuilder.appendEdit(hc2, o.styleName('Input'));
}
function FNumber2_construct(){
   var o = this;
   o.__base.FEditControl.construct.call(o);
   o._inputSize = new SSize2(120, 0);
}
function FNumber2_get(p){
   var o = this;
   var r = o.__base.FEditControl.get.call(o, p);
   var h = o._hInput;
   if(h){
      r = h.value;
   }
   return r;
}
function FNumber2_set(p){
   var o = this;
   o.__base.FEditControl.set.call(o, p);
   var h = o._hInput;
   if(h){
      h.value = RString.nvl(p);
   }
}
function FNumber2_onDataKeyDown(s, e){
   var o = this;
   o.__base.FEditControl.onDataKeyDown.call(o, s, e);
   if(o.editCase){
      RKey.fixCase(e, o.editCase);
   }
   if(o._editable){
      return;
      if(o.editComplete){
         if( 16 != e.keyCode && 17 != e.keyCode && 18 != e.keyCode && 20 != e.keyCode ){
            var ed = o.findEditor();
            if(ed){
               ed.onEditKeyDown(s, e);
            }
         }
      }
   }
}
function FNumber2_formatValue(v){
   var o = this;
   var r = RString.nvl(v);
   if(ECase.Upper == o.editCase){
      r = RString.toUpper(r);
   }else if(ECase.Lower == o.editCase){
      r = RString.toLower(r);
   }
   return r;
}
function FNumber2_setText(t){
   var o = this;
   if(!o.hEdit){
      return;
   }
   if('U'== o.editCase){
      o.hEdit.value = RString.toUpper(t);
   }else if('L'== o.editCase){
         o.hEdit.value = RString.toLower(t);
   }else{
      o.hEdit.value = t;
   }
   if('right' == o.editAlign ){
      o.hEdit.style.textAlign = 'right';
   }else if('left' == o.editAlign ){
      o.hEdit.style.textAlign = 'left';
   }else{
      o.hEdit.style.textAlign = 'center';
   }
}
function FNumber2_validText(t){
   var o = this;
   var r = o.__base.FEditControl.validText.call(o, t);
   if(!r){
      if(o.validLenmin){
         if(o.validLenmin > t.length){
            return RContext.get('MDescEdit:ValidMinLength', o.validLenmin);
         }
      }
      if(o.validLenmax){
         if(o.validLenmax < t.length){
            return RContext.get('MDescEdit:ValidMaxLength', o.validLenmax);
         }
      }
   }
   return r;
}
function FNumber2_findEditor(){
   var o = this;
   if(o.editComplete){
      var de = o.editor;
      if(!de){
         o.dsControl = o.topControl(MDataset);
         if(o.dsControl){
            de = o.editor = RConsole.find(FNumber2Console).focus(o, FNumber2Editor);
         }
      }
      if(de){
         de.linkControl(o);
      }
      return o.editor;
   }
}
function FNumber2_drop(){
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
function FNumber2_clone(){
   var o = this;
   var r = o._class.newInstance();
   GHtml_clone(r, o.hPanel);
   return r;
}
function FNumber2_link(){
   var o = this;
}
function FNumber3(o){
   o = RClass.inherits(this, o, FEditControl);
   o._inputSize       = RClass.register(o, new APtySize2('_inputSize'));
   o._styleInputPanel = RClass.register(o, new AStyle('_styleInputPanel'));
   o._styleInput      = RClass.register(o, new AStyle('_styleInput'));
   o._hInput          = null;
   o.onBuildEditValue = FNumber3_onBuildEditValue;
   o.construct        = FNumber3_construct;
   o.get              = FNumber3_get;
   o.set              = FNumber3_set;
   return o;
}
function FNumber3_oeDataLoad(p){
   var o = this;
   alert(p);
   return EEventStatus.Stop;
}
function FNumber3_oeDataSave(p){
   var o = this;
   return EEventStatus.Stop;
}
function FNumber3_onBuildEditValue(p){
   var o = this;
   var h = o._hValuePanel;
   h.className = o.styleName('InputPanel');
   var hf = o._hInputForm = RBuilder.appendTable(h);
   var hr = RBuilder.appendTableRow(hf);
   var hc1 = RBuilder.appendTableCell(hr);
   hc1.style.borderRight = '1px solid #666666';
   var he1 = o._hInput1 = RBuilder.appendEdit(hc1, o.styleName('Input'));
   var hc2 = RBuilder.appendTableCell(hr);
   hc2.style.borderLeft = '1px solid #999999';
   hc2.style.borderRight = '1px solid #666666';
   var he2 = o._hInput2 = RBuilder.appendEdit(hc2, o.styleName('Input'));
   var hc3 = RBuilder.appendTableCell(hr);
   hc3.style.borderLeft = '1px solid #999999';
   var he2 = o._hInput3 = RBuilder.appendEdit(hc3, o.styleName('Input'));
}
function FNumber3_construct(){
   var o = this;
   o.__base.FEditControl.construct.call(o);
   o._inputSize = new SSize2(120, 0);
}
function FNumber3_get(p){
   var o = this;
   var r = o.__base.FEditControl.get.call(o, p);
   var h = o._hInput;
   if(h){
      r = h.value;
   }
   return r;
}
function FNumber3_set(p){
   var o = this;
   o.__base.FEditControl.set.call(o, p);
   var h = o._hInput;
   if(h){
      h.value = RString.nvl(p);
   }
}
function FNumber3_onDataKeyDown(s, e){
   var o = this;
   o.__base.FEditControl.onDataKeyDown.call(o, s, e);
   if(o.editCase){
      RKey.fixCase(e, o.editCase);
   }
   if(o._editable){
      return;
      if(o.editComplete){
         if( 16 != e.keyCode && 17 != e.keyCode && 18 != e.keyCode && 20 != e.keyCode ){
            var ed = o.findEditor();
            if(ed){
               ed.onEditKeyDown(s, e);
            }
         }
      }
   }
}
function FNumber3_formatValue(v){
   var o = this;
   var r = RString.nvl(v);
   if(ECase.Upper == o.editCase){
      r = RString.toUpper(r);
   }else if(ECase.Lower == o.editCase){
      r = RString.toLower(r);
   }
   return r;
}
function FNumber3_setText(t){
   var o = this;
   if(!o.hEdit){
      return;
   }
   if('U'== o.editCase){
      o.hEdit.value = RString.toUpper(t);
   }else if('L'== o.editCase){
         o.hEdit.value = RString.toLower(t);
   }else{
      o.hEdit.value = t;
   }
   if('right' == o.editAlign ){
      o.hEdit.style.textAlign = 'right';
   }else if('left' == o.editAlign ){
      o.hEdit.style.textAlign = 'left';
   }else{
      o.hEdit.style.textAlign = 'center';
   }
}
function FNumber3_validText(t){
   var o = this;
   var r = o.__base.FEditControl.validText.call(o, t);
   if(!r){
      if(o.validLenmin){
         if(o.validLenmin > t.length){
            return RContext.get('MDescEdit:ValidMinLength', o.validLenmin);
         }
      }
      if(o.validLenmax){
         if(o.validLenmax < t.length){
            return RContext.get('MDescEdit:ValidMaxLength', o.validLenmax);
         }
      }
   }
   return r;
}
function FNumber3_findEditor(){
   var o = this;
   if(o.editComplete){
      var de = o.editor;
      if(!de){
         o.dsControl = o.topControl(MDataset);
         if(o.dsControl){
            de = o.editor = RConsole.find(FNumber3Console).focus(o, FNumber3Editor);
         }
      }
      if(de){
         de.linkControl(o);
      }
      return o.editor;
   }
}
function FNumber3_drop(){
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
function FNumber3_clone(){
   var o = this;
   var r = o._class.newInstance();
   GHtml_clone(r, o.hPanel);
   return r;
}
function FNumber3_link(){
   var o = this;
}
function FNumber4(o){
   o = RClass.inherits(this, o, FEditControl);
   o._inputSize       = RClass.register(o, new APtySize2('_inputSize'));
   o._styleInputPanel = RClass.register(o, new AStyle('_styleInputPanel'));
   o._styleInput      = RClass.register(o, new AStyle('_styleInput'));
   o._hInput          = null;
   o.onBuildEditValue = FNumber4_onBuildEditValue;
   o.construct        = FNumber4_construct;
   o.get              = FNumber4_get;
   o.set              = FNumber4_set;
   return o;
}
function FNumber4_oeDataLoad(p){
   var o = this;
   alert(p);
   return EEventStatus.Stop;
}
function FNumber4_oeDataSave(p){
   var o = this;
   return EEventStatus.Stop;
}
function FNumber4_onBuildEditValue(p){
   var o = this;
   var h = o._hValuePanel;
   h.className = o.styleName('InputPanel');
   var hf = o._hInputForm = RBuilder.appendTable(h);
   var hr = RBuilder.appendTableRow(hf);
   var hc1 = RBuilder.appendTableCell(hr);
   hc1.style.borderRight = '1px solid #666666';
   var he1 = o._hInput1 = RBuilder.appendEdit(hc1, o.styleName('Input'));
   var hc2 = RBuilder.appendTableCell(hr);
   hc2.style.borderRight = '1px solid #666666';
   hc2.style.borderLeft = '1px solid #999999';
   var he2 = o._hInput2 = RBuilder.appendEdit(hc2, o.styleName('Input'));
   var hc3 = RBuilder.appendTableCell(hr);
   hc3.style.borderLeft = '1px solid #999999';
   hc3.style.borderRight = '1px solid #666666';
   var he3 = o._hInput3 = RBuilder.appendEdit(hc3, o.styleName('Input'));
   var hc4 = RBuilder.appendTableCell(hr);
   hc4.style.borderLeft = '1px solid #999999';
   var he4 = o._hInput4 = RBuilder.appendEdit(hc4, o.styleName('Input'));
}
function FNumber4_construct(){
   var o = this;
   o.__base.FEditControl.construct.call(o);
   o._inputSize = new SSize2(120, 0);
}
function FNumber4_get(p){
   var o = this;
   var r = o.__base.FEditControl.get.call(o, p);
   var h = o._hInput;
   if(h){
      r = h.value;
   }
   return r;
}
function FNumber4_set(p){
   var o = this;
   o.__base.FEditControl.set.call(o, p);
   var h = o._hInput;
   if(h){
      h.value = RString.nvl(p);
   }
}
function FNumber4_onDataKeyDown(s, e){
   var o = this;
   o.__base.FEditControl.onDataKeyDown.call(o, s, e);
   if(o.editCase){
      RKey.fixCase(e, o.editCase);
   }
   if(o._editable){
      return;
      if(o.editComplete){
         if( 16 != e.keyCode && 17 != e.keyCode && 18 != e.keyCode && 20 != e.keyCode ){
            var ed = o.findEditor();
            if(ed){
               ed.onEditKeyDown(s, e);
            }
         }
      }
   }
}
function FNumber4_formatValue(v){
   var o = this;
   var r = RString.nvl(v);
   if(ECase.Upper == o.editCase){
      r = RString.toUpper(r);
   }else if(ECase.Lower == o.editCase){
      r = RString.toLower(r);
   }
   return r;
}
function FNumber4_setText(t){
   var o = this;
   if(!o.hEdit){
      return;
   }
   if('U'== o.editCase){
      o.hEdit.value = RString.toUpper(t);
   }else if('L'== o.editCase){
         o.hEdit.value = RString.toLower(t);
   }else{
      o.hEdit.value = t;
   }
   if('right' == o.editAlign ){
      o.hEdit.style.textAlign = 'right';
   }else if('left' == o.editAlign ){
      o.hEdit.style.textAlign = 'left';
   }else{
      o.hEdit.style.textAlign = 'center';
   }
}
function FNumber4_validText(t){
   var o = this;
   var r = o.__base.FEditControl.validText.call(o, t);
   if(!r){
      if(o.validLenmin){
         if(o.validLenmin > t.length){
            return RContext.get('MDescEdit:ValidMinLength', o.validLenmin);
         }
      }
      if(o.validLenmax){
         if(o.validLenmax < t.length){
            return RContext.get('MDescEdit:ValidMaxLength', o.validLenmax);
         }
      }
   }
   return r;
}
function FNumber4_findEditor(){
   var o = this;
   if(o.editComplete){
      var de = o.editor;
      if(!de){
         o.dsControl = o.topControl(MDataset);
         if(o.dsControl){
            de = o.editor = RConsole.find(FNumber4Console).focus(o, FNumber4Editor);
         }
      }
      if(de){
         de.linkControl(o);
      }
      return o.editor;
   }
}
function FNumber4_drop(){
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
function FNumber4_clone(){
   var o = this;
   var r = o._class.newInstance();
   GHtml_clone(r, o.hPanel);
   return r;
}
function FNumber4_link(){
   var o = this;
}
function FNumberTpl(o){
   o = RClass.inherits(this, o, FEditControl);
   return o;
}
function FNumberTpl_onEditFocus(e){
   var o = this;
   o.setText(o.formatValue(o.text()));
}
function FNumberTpl_onEditBlur(e){
   var o = this;
   o.setText(o.formatText(o.text()));
}
function FNumberTpl_onBuildEdit(b){
   var o = this;
   var htb = RBuilder.appendTable(b.hPanel);
   htb.style.tableLayout = 'fixed';
   var hr = o.hEdit = htb.insertRow();
   o.onBuildChange(hr.insertCell());
   if(o.canZoom()){
      var hc = hr.insertCell();
      o.hZoom = RBuilder.appendIcon(hc, 'ctl.zooms');
      hc.width = 16;
   }
   var hc = hr.insertCell();
   hc.style.width = '100%';
   var he = o.hEdit = RBuilder.appendEdit(hc, o.style('Edit'));
   o.attachEvent('onEditFocus', he, o.onEditFocus);
   o.attachEvent('onEditKeyPress', he, o.onEditKeyPress);
   o.attachEvent('onEditBlur', he, o.onEditBlur);
   o.attachEvent('onDataKeyUp', he, o.ohEditKeyUp);
   if(o.editLength){
      he.maxLength = o.editLength;
   }
   o.buildAdjustForm(b.hDrop);
}
function FNumberTpl_setUnitIcon(i){
   var o = this;
   var hui = o.hUnit;
   hui.innerHTML = '<IMG src='+i+'>';
}
function FNumberTpl_onDataKeyDown(s, e){
   var o = this;
   if(o.canEdit){
      if(EKey.Up == e.keyCode){
         o.adjustValue(true);
      }else if(EKey.Down == e.keyCode){
         o.adjustValue(false);
      }
   }
   o.base.FEditControl.onDataKeyDown.call(o, s, e);
}
function FNumberTpl_ohEditKeyUp(s, e){
   var o = this;
   if(EKey.Up == e.keyCode && o.canEdit){
      o.hUpIcon.src = o.styleIconPath('UpSelect');
   }else if(EKey.Down == e.keyCode && o.canEdit){
      o.hDownIcon.src = o.styleIconPath('DownSelect');
   }
}
function FNumberTpl_onEditKeyDown(e) {
   var o = this;
   if(o.canEdit){
      if (EKey.Up == e.keyCode) {
         e.source.hUpIcon.src = o.styleIconPath('up');
         o.changeValue(e, 'Y');
      }else if (EKey.Down == e.keyCode){
         e.source.hDownIcon.src = o.styleIconPath('down');
         o.changeValue(e, 'N');
      }
   }
}
function FNumberTpl_onEditKeyUp(e) {
   var o = this;
   if(o.canEdit){
      if (EKey.Up == e.keyCode){
         e.source.hUpIcon.src = o.styleIconPath('upSelect');
      }else if (EKey.Down == e.keyCode){
         e.source.hDownIcon.src = o.styleIconPath('downSelect');
      }
   }
}
function FNumberTpl_onEditDoubleClick(){
   var o = this;
   this.onListClick();
}
function FNumberTpl_validPattern(s) {
   var o = this;
   var flag = true;
   var s = RString.nvl(s);
   if(!RRegExp.test(ERegExp.NUMBER,s)){
      return false;
   }
   var r = null;
   if (o.dataType) {
      for (n in ERegExp) {
         if (RString.equals(n, o.dataType)) {
            r = ERegExp[n];
            break;
         }
      }
      if (RString.equals(RClass.name(r), "RegExp")) {
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
function FNumberTpl_refreshStyle(){
   var o = this;
   o.base.FEditControl.refreshStyle.call(o);
   o.hUpIcon.src = o.styleIconPath(o._hover ? 'UpSelect' : 'Up');
   o.hDownIcon.src = o.styleIconPath(o._hover ? 'DownSelect' : 'Down');
}
function FNumberTpl_splitValue(v){
   var o = this;
   var s = RString.nvl(v.toString());
   var j = RString.findChars(s,"-");
   var b = RString.findChars(s,"%");
   s = RString.removeChars(s, "'");
   s = RString.removeChars(s, " ");
   s = RString.removeChars(s, "%");
   s = RString.removeChars(s, "-");
   if (!RString.isEmpty(s)) {
      var sc = '';
      var c = '';
      var n = 0;
      for(var i = s.length; i > -1; i--){
         if(i != 0 && n != 0 && n % 3 == 0){
            sc = "'" + s.charAt(i) + sc;
         }else{
            sc = s.charAt(i) + sc;
         }
         n++;
      }
      if(-1 != j){
          sc = "-" + sc ;
       }
      if(-1 != b){
         sc = sc +"%";
      }
      return sc;
   }
   return s;
}
function FNumberTpl_removeSplit(s){
   var o = this;
   var s = RString.nvl(s);
   s = RString.removeChars(s,"'");
   s = RString.removeChars(s,"%");
   return s;
}
function FNumberTpl_precisionValue(v){
   var o = this;
   if(RString.isEmpty(v)){
      return v;
   }
   var l1,l2;
   var p = RString.nvl(o.editPrecision);
   v = RString.nvl(v);
   if(RString.contains(p,'.')){
      var sp = p.split('.')
      l2 = sp[1].length;
   }else{
     l1 = p.length;
   }
   if(RString.contains(v, '.')){
      var vs = v.split('.');
      if(l2){
         if(l2 > vs[1].length){
            vs[1] = RString.rpad(vs[1],l2 - vs[1].length,'0');
         }else if(l2 <= vs[1].length){
            vs[1] = vs[1].substring(0, l2);
         }
      }
      if(l1){
         if(l1 > vs[0].length){
            alert(l1);
         }else if(l1 < vs[0].length){
            vs[0] = vs[0].substring(0, vs[0].length - l1);
            vs[0] = RString.rpad(vs[0],l1,'0');
         }
         vs[1] = null;
      }
      if(vs[1]){
         v = vs[0] + '.' + RString.nvl(vs[1]);
      }else{
         v = vs[0];
      }
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
function FNumberTpl_dispose(){
   var o = this;
   o.base.FEditControl.dispose.call(o);
   o.hLabel = null;
   o.hUpIcon = null;
   o.hDownIcon = null;
   o.hChgIic = null;
}
function FRadio(o){
   o = RClass.inherits(this, o, FEditControl);
   o._groupName       = RClass.register(o, new APtyString('_groupName'));
   o._styleInput      = RClass.register(o, new AStyle('_styleInput', 'Input'));
   o._hInput          = null;
   o.onBuildEditValue = FRadio_onBuildEditValue;
   return o;
}
function FRadio_onBuildEditValue(p){
   var o = this;
   o._hInput = RBuilder.appendRadio(o._hValuePanel, o.styleName('Input'));
}
function FRadio_clearValue(){
   this.hEdit.checked = false;
}
function FRadio_resetValue(){
   this.hEdit.checked = this._editChecked;
}
function FRadio_saveValue(vs){
   var o = this;
   if(o.hEdit.checked){
      vs.set(o.dataName, o.dataDefault);
   }
}
function FRadio_text(){
   return this.hEdit.checked ? this.dataDefault : '';
}
function FRadio_setText(t){
   this.hEdit.checked = (this.dataDefault == t);
}
function FRadio_refreshStyle(){
   var o = this;
   var h = o.panel(EPanel.Edit);
   h.disabled = !o._editable;
   h.style.cursor = o._editable? 'hand':'normal';
}
function FSelect(o){
   o = RClass.inherits(this, o, FEditControl, MEditBorder, MDescSelect, MDropable);
   o.borderStyle   = EBorder.RoundDrop;
   o.items         = null;
   o.lsnEditEnd    = null;
   o.onDataKeyDown = FSelect_onDataKeyDown;
   o.onDataClick   = FSelect_onDataClick;
   o.onEditEnd     = FSelect_onEditEnd;
   o.onBuildEdit   = FSelect_onBuildEdit;
   o.construct     = FSelect_construct;
   o.loadConfig    = FSelect_loadConfig;
   o.formatValue   = FSelect_formatValue;
   o.formatText    = FSelect_formatText;
   o.refreshStyle  = FSelect_refreshStyle;
   o.drop          = FSelect_drop;
   o.doBlur        = FSelect_doBlur;
   o.dispose       = FSelect_dispose;
   return o;
}
function FSelect_onDataClick(){
   var o = this;
   if(!o.editCheck){
      o.drop();
   }
}
function FSelect_onDataKeyDown(s, e){
   var o = this;
   var ed = o.editor;
   var ef = ed && ed.inEdit;
   o.base.FEditControl.onDataKeyDown.call(o, s, e);
   if(ef && ed.source == o){
      ed.onEditKeyDown(s, e);
   }
}
function FSelect_onEditEnd(e){
   var o = this;
   if(e){
      o.set(e.get());
      o._invalidText = o.validText(o.text());
      o.refreshStyle();
   }
   o.onDataEditEnd(o);
}
function FSelect_onBuildEdit(b){
   var o = this;
   var hf = RBuilder.appendTable(b.hPanel);
   hf.style.tableLayout = 'fixed';
   var hr = hf.insertRow(-1);
   o.onBuildChange(hr.insertCell(-1))
   var hc = hr.insertCell(-1);
   var se = o.style('Edit')
   var he = o.hEdit = RBuilder.appendEdit(hc, o.style('Edit'));
   if(o.editLength){
      he.maxLength = o.editLength;
   }
}
function FSelect_construct(){
   var o = this;
   o.base.FEditControl.construct.call(o);
   o.items = new TItems();
   o.lsnEditEnd = new TListener(o, o.onEditEnd);
}
function FSelect_loadConfig(c){
   var o = this;
   o.base.FEditControl.loadConfig.call(o, c);
   if(o.dataEmpty){
      o.items.create();
   }
   if(!o.editCheck){
      o.items.create('', '');
   }
   o.items.loadConfig(c);
   var ns = c.nodes;
   if(ns){
   var nc = ns.count;
      for(var n = 0; n < nc; n++){
        var p = ns.get(n);
         if(p.isName('Event')){
            var e = RClass.create(FEvent);
             e.loadConfig(p);
             o.push(e);
         }
      }
   }
   return EStatus.Stop;
}
function FSelect_formatValue(t){
   var o = this;
   if(RBoolean.isTrue(o.editCheck)){
      var v = o.items.value(t);
      if(v){
         return v;
      }else{
         return RString.nvl(t);
      }
   }
   return o.items.value(t);
}
function FSelect_formatText(v){
   var o = this;
   if(RBoolean.isTrue(o.editCheck) && RString.isEmpty(o.items.label(v))){
      return v;
   }
   return o.items.label(v);
}
function FSelect_refreshStyle(){
   var o = this;
   o.base.FEditControl.refreshStyle.call(o);
   if(!o.editCheck){
      o.hEdit.readOnly = 'true';
   }
}
function FSelect_drop(){
   var o = this;
   if(o.canDrop() && o.canEdit && o.items.count() > 0 && o._editable){
      if(!o.editRefer){
         return RMessage.fatal(o, null, 'Edit refer is null.');
      }
      var e = o.editor = RConsole.find(FEditConsole).focus(o, FSelectEditor, o.editRefer);
      if(o.editDynamic){
         return RMessage.fatal(o, null, 'Unsupport.');
      }else{
        e.__source = o;
         e.setItems(o.items);
         e.set(o.reget());
      }
      e.lsnEditEnd = o.lsnEditEnd;
      e.show();
   }
}
function FSelect_doBlur(){
   var o = this;
   o.base.FEditControl.doBlur.call(o);
   if(o.editor){
      o.editor.hide();
   }
}
function FSelect_dispose(){
   var o = this;
   o.base.FEditControl.dispose.call(o);
}
function FSelectEditor(o){
   o = RClass.inherits(this, o, FDropEditor);
   o.__minHeight   = 300;
   o.__minWidth    = 160;
   o.items         = null;
   o.position      = null;
   o.lsnItemClick  = null;
   o.hDropLayout   = null;
   o.hItemsForm    = null;
   o.onItemClick   = FSelectEditor_onItemClick;
   o.onEditKeyDown = FSelectEditor_onEditKeyDown;
   o.onBuildDrop   = FSelectEditor_onBuildDrop;
   o.construct     = FSelectEditor_construct;
   o.testBlur      = FSelectEditor_testBlur;
   o.setItems      = FSelectEditor_setItems;
   o.get           = FSelectEditor_get;
   o.set           = FSelectEditor_set;
   o.select        = FSelectEditor_select;
   o.fetch         = FSelectEditor_fetch;
   o.show          = FSelectEditor_show;
   o.dispose       = FSelectEditor_dispose;
   o.__mouseDownEvent  = new TEvent();
   return o;
}
function FSelectEditor_onItemClick(s){
   var o = this;
   var t = o.__source;
   o.position = o.items.indexOf(s);
   o.editEnd();
   if(t){
      t.callEvent('onItemClick', t, o.__mouseDownEvent);
   }
}
function FSelectEditor_onEditKeyDown(s, e){
   var o = this;
   switch(e.keyCode){
      case EKey.Up:
         o.select(o.position - 1);
         break;
      case EKey.Down:
         o.select(o.position + 1);
         break;
      case EKey.Enter:
         o.editEnd();
         break;
      case EKey.Esc:
         o.editCancel();
         break;
   }
}
function FSelectEditor_onBuildDrop(){
   var o = this;
   var hdl = o.hDropLayout = RBuilder.append(o.hDropPanel, 'DIV')
   var hif = o.hItemsForm = RBuilder.appendTable(hdl);
   o.hItemsPanel = RBuilder.append(hif, 'TBODY');
}
function FSelectEditor_construct(){
   var o = this;
   o.lsnItemClick = new TListener(o, o.onItemClick);
}
function FSelectEditor_testBlur(c){
   var o = this;
   if(o.source == c){
      return false;
   }
   return !this.items.contains(c);
}
function FSelectEditor_setItems(items){
   var o = this;
   if(o.items){
      return;
   }
   var is = o.items = new TList();
   var hip = o.hItemsPanel;
   var count = items.count();
   for(var n=0; n<count; n++){
      if(n > 0){
         var hr = RBuilder.append(hip, 'TR');
         hr.height = 1;
         var hd = RBuilder.append(hr, 'TD');
         hd.colSpan = 3;
         hd.style.borderTop = '1 dashed #24C2DB';
         RBuilder.appendEmpty(hd);
      }
      var t = items.get(n);
      var c = RControl.create(FSelectItem);
      c.name = t.value;
      c.lsnsClick.push(o.lsnItemClick);
      c.set(t.icon, t.label, t.value);
      c.setPanel(hip);
      is.push(c);
      o.push(c);
   }
   o.position = 0;
}
function FSelectEditor_get(){
   var o = this;
   return o.items.get(o.position).value;
}
function FSelectEditor_set(v){
   var o = this;
   o.position = -1;
   var ps = o.items;
   var pc = ps.count;
   for(var n=0; n<pc; n++){
      var p = ps.get(n);
      if(RString.equals(p.value, v)){
         o.position = n;
         p.setChecked(true);
      }else{
         p.setChecked(false);
      }
   }
}
function FSelectEditor_select(p){
   var o = this;
   var is = o.items;
   var ic = is.count;
   p = Math.min(Math.max(0, p), ic-1)
   for(var n=0; n<ic; n++){
      is.get(n).setChecked(n == p);
   }
   o.position = p;
}
function FSelectEditor_fetch(){
   var o = this;
   if(!o.hasFetched){
      var g = new TCodeListServiceArg();
      var f = o.source.topControl(MDataset);
      g.values = f.getCurrentRows();
      g.name = o.source.editRefer;
      var doc = RConsole.find(FCodeListConsole).fetch(g);
      if(doc){
         var edt = o.source;
         edt.items.clear();
         edt.items.loadConfig(doc.root().nodes.get(0));
      }
      o.hasFetched = true;
   }
}
function FSelectEditor_show(v){
   var o = this;
   o.base.FDropEditor.show.call(o, v);
   var hp = o.hPanel;
   var hif = o.hItemsForm;
   var hbf = o.hBorderForm;
   var s = o.source;
   var r = s.getEditRange();
   hif.width = null;
   var iw = hif.offsetWidth;
   hp.style.pixelLeft = r.x;
   hp.style.pixelTop = r.y + r.height;
   hp.style.pixelWidth = Math.max(iw, r.width);
   hif.width = '100%';
   if(hif.offsetHeight > o.__minHeight){
      o.hDropLayout.style.overflowY = 'scroll';
      o.hDropLayout.style.pixelHeight = o.__minHeight;
   }
   o.base.MShadow.show.call(o);
}
function FSelectEditor_dispose(){
   var o = this;
   o.base.FDropEditor.dispose.call(o);
   o.hDropLayout = null;
   o.hItemsForm = null;
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
   o.onMouseDown       = FSelectItem_onMouseDown;
   o.set               = FSelectItem_set;
   o.setChecked        = FSelectItem_setChecked;
   o.dispose           = FSelectItem_dispose;
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
function FSelectItem_onMouseDown(){
   this.lsnsClick.process(this);
}
function FSelectItem_set(icon, label, value, note){
   var o = this;
   o.icon = RString.nvl(icon);
   if(!RString.isEmpty(o.icon)){
      o.hIcon = RBuilder.appendIcon(o.hIconPanel, o.styleIcon(o.icon));
   }
   o.label = RString.nvl(label);
   o.value = RString.nvl(value);
   o.note = RString.nvl(note);
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
function FSelectItem_dispose(){
   var o = this;
   o.base.FControl.dispose.call(o);
   RMemory.freeHtml(o.hEdit);
   o.hEdit = null;
}
function FSplit(o){
   o = RClass.inherits(this, o, FControl);
   o._dispStyle        = RClass.register(o, new APtyString('_dispStyle', ESplitStyle.Normal));
   o._icon             = RClass.register(o, new APtyString('_icon'));
   o._editExtend       = RClass.register(o, new APtyBoolean('_editExtend'), true);
   o._styleTitle       = RClass.register(o, new TStyle('Title'));
   o._iconMinus        = 'ctl.collapse_nor';
   o._iconPlus         = 'ctl.expand_nor';
   o.__lines           = null;
   o._esize            = ESize.Horizontal;
   o.extended          = true;
   o.hImage            = null;
   o.hIcon             = null;
   o.hText             = null;
   o.onSplitMouseEnter = RClass.register(o, new HMouseEnter('onSplitMouseEnter'), FSplit_onSplitMouseEnter);
   o.onSplitMouseLeave = RClass.register(o, new HMouseLeave('onSplitMouseLeave'), FSplit_onSplitMouseLeave);
   o.onMouseDown       = FSplit_onMouseDown;
   o.onBuildPanel      = FSplit_onBuildPanel;
   o.oeBuild           = FSplit_oeBuild;
   o.oeMode            = FSplit_oeMode;
   o.construct         = FSplit_construct;
   o.extend            = FSplit_extend;
   o.pushLine          = FSplit_pushLine;
   o.dispose           = FSplit_dispose;
   return o;
}
function FSplit_onSplitMouseEnter(e){
   var o = this;
   if(o.hImage){
      o.hImage.src = RRes._iconPath(o.extended ? 'ctl.collapse_hvr' : 'ctl.expand_hvr');
   }
}
function FSplit_onSplitMouseLeave(e){
   var o = this;
   if(o.hImage){
      o.hImage.src = RRes._iconPath(o.extended ? 'ctl.collapse_nor' : 'ctl.expand_nor');
   }
}
function FSplit_onMouseDown(){
   var o = this;
   if(ESplitStyle.Normal == o._dispStyle){
      o.extend(!o.extended);
   }
}
function FSplit_onBuildPanel(){
   var o = this;
   o.hPanel = RBuilder.create(null, 'DIV');
   o.hForm = RBuilder.appendTable(o.hPanel);
   o.hForm.width = '100%';
}
function FSplit_oeBuild(e){
   var o = this;
   o.base.FControl.oeBuild.call(o, e);
   o.height = 2;
   if(RString.equals(o._dispStyle, ESplitStyle.Normal)){
      var hf = o.hForm;
      var hr = hf.insertRow()
      o.attachEvent('onSplitMouseEnter', hf);
      o.attachEvent('onSplitMouseLeave', hf);
      var hc = hr.insertCell();
      hc.width = '100%';
      hc.height = 25;
      hc.style.padding = '0 0';
      hc.style.background = 'url(' + RRes._iconPath('ctl.FSplit_Panel') + ')';
      RBuilder.appendEmpty(hc, 4);
      o.hImage = RBuilder.appendIcon(hc, o._iconMinus);
      if(o._icon){
         o.hIcon = RBuilder.appendIcon(hc, o._icon);
      }
      o.hText = RBuilder.appendText(hc, '&nbsp;&nbsp;' + o.label);
      o.hText.style.fontWeight='BOLD';
   }else if(RString.equals(o._dispStyle, ESplitStyle.BulgeLine)){
      var h = this.hForm.insertRow().insertCell();
      h.style.borderBottom  = '1px solid #666666';
      h.style.borderTop  = '1px solid #DDDDDD';
      h.height = 2;
   }else if(RString.equals(o._dispStyle, ESplitStyle.HollowLine)){
      var h = this.hForm.insertRow().insertCell();
      h.style.borderBottom  = '1px solid #DDDDDD';
      h.style.borderTop  = '1px solid #666666';
      h.height = 2;
   }
   return EEventStatus.Stop;
}
function FSplit_oeMode(e){
   var o = this;
   var r = o.base.FControl.oeMode.call(o, e);
   o.base.MDisplay.oeMode.call(o, e);
   o.extend(o._editExtend);
   return r;
}
function FSplit_construct(){
   var o = this;
   o.__lines = new TList();
}
function FSplit_extend(v){
   var o = this;
   if(EMode.Design == o._emode){
      return;
   }
   if(o.extended == v){
      return;
   }
   o.extended = v;
   if(o.hImage){
      o.hImage.src = v ? RResource._iconPath(o._iconMinus) : RRes._iconPath(o._iconPlus);
   }
   var c = o.__lines.count;
   for(var n=0; n<c; n++){
      o.__lines.get(n).style.display = v ? 'block' : 'none';
   }
   o.topControl().topResize(o);
}
function FSplit_pushLine(hr){
   this.__lines.push(hr);
}
function FSplit_dispose(){
   var o = this;
   o.base.FControl.dispose.call(o);
   if(o.__lines){
      o.__lines.release();
      o.__lines = null;
   }
   o.hForm = null;
   o.hText = null;
   o.hIcon = null;
   o.hImage = null;
}
function FUiColor(o){
   o = RClass.inherits(this, o, FEditControl);
   o._inputSize       = RClass.register(o, new APtySize2('_inputSize'));
   o._styleInputPanel = RClass.register(o, new AStyle('_styleInputPanel'));
   o._styleInput      = RClass.register(o, new AStyle('_styleInput'));
   o._hInput          = null;
   o.onBuildEditValue = FUiColor_onBuildEditValue;
   o.construct        = FUiColor_construct;
   o.get              = FUiColor_get;
   o.set              = FUiColor_set;
   return o;
}
function FUiColor_oeDataLoad(p){
   var o = this;
   alert(p);
   return EEventStatus.Stop;
}
function FUiColor_oeDataSave(p){
   var o = this;
   return EEventStatus.Stop;
}
function FUiColor_onBuildEditValue(p){
   var o = this;
   var h = o._hValuePanel;
   h.className = o.styleName('InputPanel');
   var he = o._hInput = RBuilder.appendEdit(h, o.styleName('Input'));
   if(o._editLength){
      he.maxLength = o._editLength;
   }
}
function FUiColor_construct(){
   var o = this;
   o.__base.FEditControl.construct.call(o);
   o._inputSize = new SSize2(120, 0);
}
function FUiColor_get(p){
   var o = this;
   var r = o.__base.FEditControl.get.call(o, p);
   var h = o._hInput;
   if(h){
      r = h.value;
   }
   return r;
}
function FUiColor_set(p){
   var o = this;
   o.__base.FEditControl.set.call(o, p);
   var h = o._hInput;
   if(h){
      h.value = RString.nvl(p);
   }
}
function FUiColor_onDataKeyDown(s, e){
   var o = this;
   o.__base.FEditControl.onDataKeyDown.call(o, s, e);
   if(o.editCase){
      RKey.fixCase(e, o.editCase);
   }
   if(o._editable){
      return;
      if(o.editComplete){
         if( 16 != e.keyCode && 17 != e.keyCode && 18 != e.keyCode && 20 != e.keyCode ){
            var ed = o.findEditor();
            if(ed){
               ed.onEditKeyDown(s, e);
            }
         }
      }
   }
}
function FUiColor_formatValue(v){
   var o = this;
   var r = RString.nvl(v);
   if(ECase.Upper == o.editCase){
      r = RString.toUpper(r);
   }else if(ECase.Lower == o.editCase){
      r = RString.toLower(r);
   }
   return r;
}
function FUiColor_setText(t){
   var o = this;
   if(!o.hEdit){
      return;
   }
   if('U'== o.editCase){
      o.hEdit.value = RString.toUpper(t);
   }else if('L'== o.editCase){
         o.hEdit.value = RString.toLower(t);
   }else{
      o.hEdit.value = t;
   }
   if('right' == o.editAlign ){
      o.hEdit.style.textAlign = 'right';
   }else if('left' == o.editAlign ){
      o.hEdit.style.textAlign = 'left';
   }else{
      o.hEdit.style.textAlign = 'center';
   }
}
function FUiColor_validText(t){
   var o = this;
   var r = o.__base.FEditControl.validText.call(o, t);
   if(!r){
      if(o.validLenmin){
         if(o.validLenmin > t.length){
            return RContext.get('MDescEdit:ValidMinLength', o.validLenmin);
         }
      }
      if(o.validLenmax){
         if(o.validLenmax < t.length){
            return RContext.get('MDescEdit:ValidMaxLength', o.validLenmax);
         }
      }
   }
   return r;
}
function FUiColor_findEditor(){
   var o = this;
   if(o.editComplete){
      var de = o.editor;
      if(!de){
         o.dsControl = o.topControl(MDataset);
         if(o.dsControl){
            de = o.editor = RConsole.find(FUiColorConsole).focus(o, FUiColorEditor);
         }
      }
      if(de){
         de.linkControl(o);
      }
      return o.editor;
   }
}
function FUiColor_drop(){
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
function FUiColor_clone(){
   var o = this;
   var r = o._class.newInstance();
   GHtml_clone(r, o.hPanel);
   return r;
}
function FUiColor_link(){
   var o = this;
}
function FUiColor3(o){
   o = RClass.inherits(this, o, FUiEditControl, MListenerDataChanged);
   o._inputSize        = RClass.register(o, new APtySize2('_inputSize'));
   o._styleValuePanel  = RClass.register(o, new AStyle('_styleValuePanel'));
   o._styleInput       = RClass.register(o, new AStyle('_styleInput'));
   o._innerOriginValue = null;
   o._innerDataValue   = null;
   o._barRed           = null;
   o._barGreen         = null;
   o._barBlue          = null;
   o.onBuildEditValue  = FUiColor3_onBuildEditValue;
   o.onInputKeyPress   = RClass.register(o, new AEventKeyPress('onInputKeyPress'), FUiColor3_onInputKeyPress);
   o.onInputChanged    = RClass.register(o, new AEventInputChanged('onInputChanged'), FUiColor3_onInputChanged);
   o.onSlideMouseDown  = RClass.register(o, new AEventMouseDown('onSlideMouseDown'), FUiColor3_onSlideMouseDown);
   o.onSlideMouseMove  = RClass.register(o, new AEventMouseMove('onSlideMouseMove'), FUiColor3_onSlideMouseMove);
   o.onSlideMouseUp    = RClass.register(o, new AEventMouseUp('onSlideMouseUp'), FUiColor3_onSlideMouseUp);
   o.construct         = FUiColor3_construct;
   o.get               = FUiColor3_get;
   o.set               = FUiColor3_set;
   o.setDisplayColor   = FUiColor3_setDisplayColor;
   o.setDisplay        = FUiColor3_setDisplay;
   o.refreshValue      = FUiColor3_refreshValue;
   return o;
}
function FUiColor3_onBuildEditValue(p){
   var o = this;
   var h = o._hValuePanel;
   h.className = o.styleName('ValuePanel');
   var hf = o._hValueForm = RBuilder.appendTable(h);
   hf.width = '100%';
   var hl = o._hValueLine = RBuilder.appendTableRow(hf);
   o._hChangePanel = RBuilder.appendTableCell(hl);
   o.onBuildEditChange(p);
   var hcp = o._hColorPanel = RBuilder.appendTableCell(hl);
   hcp.width = 16;
   hcp.style.padding = '2px';
   o._hColorImage = RBuilder.appendIcon(hcp, null, 'n', 14, 47);
   var hcp = RBuilder.appendTableCell(hl);
   var hcf = o._hColorForm = RBuilder.appendTable(hcp);
   hcf.width = '100%';
   var b = o._barRed = new SUiColorBar();
   b.control = o;
   b.type = 'red';
   b.hPanel = o._hColorForm;
   b.build();
   var b = o._barGreen = new SUiColorBar();
   b.control = o;
   b.type = 'green';
   b.hPanel = o._hColorForm;
   b.build();
   var b = o._barBlue = new SUiColorBar();
   b.control = o;
   b.type = 'blue';
   b.hPanel = o._hColorForm;
   b.build();
   var hdp = o._hDropPanel = RBuilder.appendTableCell(hl);
   hdp.style.borderLeft = '1px solid #666666';
   o.onBuildEditDrop(p);
}
function FUiColor3_onInputKeyPress(p){
   var o = this;
   var c = p.keyCode;
   if(!EKeyCode.floatCodes[c]){
      p.cancel();
   }
}
function FUiColor3_onInputChanged(p){
   var o = this;
   o.processDataChangedListener(o);
}
function FUiColor3_onSlideMouseDown(p){
   var o = this;
   var b = p.hSource.__pbar;
   b.onMouseDown(p);
}
function FUiColor3_onSlideMouseMove(p){
   var o = this;
   var b = p.hSource.__pbar;
   b.onMouseMove(p);
}
function FUiColor3_onSlideMouseUp(p){
   var o = this;
   var b = p.hSource.__pbar;
   b.onMouseUp(p);
}
function FUiColor3_construct(){
   var o = this;
   o.__base.FUiEditControl.construct.call(o);
   o._inputSize = new SSize2(120, 0);
   o._innerOriginValue = new SColor4();
   o._innerDataValue = new SColor4();
}
function FUiColor3_get(p){
   var o = this;
   var v = o._innerDataValue;
   var h = o._barRed.hInput;
   if(h){
      v.red = RFloat.parse(h.value);
   }
   var h = o._barGreen.hInput;
   if(h){
      v.green = RFloat.parse(h.value);
   }
   var h = o._barBlue.hInput;
   if(h){
      v.blue = RFloat.parse(h.value);
   }
   return v;
}
function FUiColor3_set(p){
   var o = this;
   o.__base.FUiEditControl.set.call(o, p);
   if(p.constructor == SColor4){
      o._innerOriginValue.assign(p);
      o._innerDataValue.assign(p);
   }else{
      throw new TError('Invalid value format.');
   }
   o.setDisplayColor();
   var v = o._innerDataValue;
   o._barRed.set(v.red);
   o._barGreen.set(v.green);
   o._barBlue.set(v.blue);
   o.changeSet(false);
}
function FUiColor3_setDisplayColor(){
   var o = this;
   var v = o._innerDataValue;
   var vr = RHex.format(parseInt(v.red * 255), 2);
   var vg = RHex.format(parseInt(v.green * 255), 2);
   var vb = RHex.format(parseInt(v.blue * 255), 2);
   o._hColorImage.style.backgroundColor = '#' + vr + vg + vb;
}
function FUiColor3_setDisplay(){
   var o = this;
   o.setDisplayColor();
   var v = o._innerDataValue;
   o._barRed.set(v.red);
   o._barGreen.set(v.green);
   o._barBlue.set(v.blue);
}
function FUiColor3_refreshValue(){
   var o = this;
   o.get();
   o.setDisplayColor();
   o.processDataChangedListener(o);
}
function FUiColor3_onDataKeyDown(s, e){
   var o = this;
   o.__base.FUiEditControl.onDataKeyDown.call(o, s, e);
   if(o.editCase){
      RKey.fixCase(e, o.editCase);
   }
   if(o._editable){
      return;
      if(o.editComplete){
         if( 16 != e.keyCode && 17 != e.keyCode && 18 != e.keyCode && 20 != e.keyCode ){
            var ed = o.findEditor();
            if(ed){
               ed.onEditKeyDown(s, e);
            }
         }
      }
   }
}
function FUiColor3_formatValue(v){
   var o = this;
   var r = RString.nvl(v);
   if(ECase.Upper == o.editCase){
      r = RString.toUpper(r);
   }else if(ECase.Lower == o.editCase){
      r = RString.toLower(r);
   }
   return r;
}
function FUiColor3_setText(t){
   var o = this;
   if(!o.hEdit){
      return;
   }
   if('U'== o.editCase){
      o.hEdit.value = RString.toUpper(t);
   }else if('L'== o.editCase){
         o.hEdit.value = RString.toLower(t);
   }else{
      o.hEdit.value = t;
   }
   if('right' == o.editAlign ){
      o.hEdit.style.textAlign = 'right';
   }else if('left' == o.editAlign ){
      o.hEdit.style.textAlign = 'left';
   }else{
      o.hEdit.style.textAlign = 'center';
   }
}
function FUiColor3_validText(t){
   var o = this;
   var r = o.__base.FUiEditControl.validText.call(o, t);
   if(!r){
      if(o.validLenmin){
         if(o.validLenmin > t.length){
            return RContext.get('MDescEdit:ValidMinLength', o.validLenmin);
         }
      }
      if(o.validLenmax){
         if(o.validLenmax < t.length){
            return RContext.get('MDescEdit:ValidMaxLength', o.validLenmax);
         }
      }
   }
   return r;
}
function FUiColor3_findEditor(){
   var o = this;
   if(o.editComplete){
      var de = o.editor;
      if(!de){
         o.dsControl = o.topControl(MDataset);
         if(o.dsControl){
            de = o.editor = RConsole.find(FUiColor3Console).focus(o, FUiColor3Editor);
         }
      }
      if(de){
         de.linkControl(o);
      }
      return o.editor;
   }
}
function FUiColor3_drop(){
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
function FUiColor3_clone(){
   var o = this;
   var r = o._class.newInstance();
   GHtml_clone(r, o.hPanel);
   return r;
}
function FUiColor3_link(){
   var o = this;
}
function FUiColor3Tpl(o){
   o = RClass.inherits(this, o, FEditControl, MListenerDataChanged);
   o._inputSize        = RClass.register(o, new APtySize2('_inputSize'));
   o._styleValuePanel  = RClass.register(o, new AStyle('_styleValuePanel'));
   o._styleInput       = RClass.register(o, new AStyle('_styleInput'));
   o._innerOriginValue = null;
   o._innerDataValue   = null;
   o._hInputRed        = null;
   o._hInputGreen      = null;
   o._hInputBlue       = null;
   o.onBuildEditValue  = FUiColor3Tpl_onBuildEditValue;
   o.onInputKeyPress   = RClass.register(o, new AEventKeyPress('onInputKeyPress'), FUiColor3Tpl_onInputKeyPress);
   o.onInputChanged    = RClass.register(o, new AEventInputChanged('onInputChanged'), FUiColor3Tpl_onInputChanged);
   o.construct         = FUiColor3Tpl_construct;
   o.get               = FUiColor3Tpl_get;
   o.set               = FUiColor3Tpl_set;
   return o;
}
function FUiColor3Tpl_onBuildEditValue(p){
   var o = this;
   var h = o._hValuePanel;
   h.className = o.styleName('ValuePanel');
   var hf = o._hValueForm = RBuilder.appendTable(h);
   hf.width = '100%';
   var hl = o._hValueLine = RBuilder.appendTableRow(hf);
   o._hChangePanel = RBuilder.appendTableCell(hl);
   o.onBuildEditChange(p);
   var hc = RBuilder.appendTableCell(hl);
   hc.style.borderRight = '1px solid #666666';
   var he = o._hInputRed = RBuilder.appendEdit(hc, o.styleName('Input'));
   o.attachEvent('onInputKeyPress', he, o.onInputKeyPress);
   o.attachEvent('onInputChanged', he, o.onInputChanged);
   var hc = RBuilder.appendTableCell(hl);
   hc.style.borderLeft = '1px solid #999999';
   hc.style.borderRight = '1px solid #666666';
   var he = o._hInputGreen = RBuilder.appendEdit(hc, o.styleName('Input'));
   o.attachEvent('onInputKeyPress', he, o.onInputKeyPress);
   o.attachEvent('onInputChanged', he, o.onInputChanged);
   var hc = RBuilder.appendTableCell(hl);
   hc.style.borderLeft = '1px solid #999999';
   var he = o._hInputBlue = RBuilder.appendEdit(hc, o.styleName('Input'));
   o.attachEvent('onInputKeyPress', he, o.onInputKeyPress);
   o.attachEvent('onInputChanged', he, o.onInputChanged);
   var hdp = o._hDropPanel = RBuilder.appendTableCell(hl);
   hdp.style.borderLeft = '1px solid #666666';
   o.onBuildEditDrop(p);
}
function FUiColor3Tpl_onInputKeyPress(p){
   var o = this;
   var c = p.keyCode;
   if(!EKeyCode.floatCodes[c]){
      p.cancel();
   }
}
function FUiColor3Tpl_onInputChanged(p){
   var o = this;
   o.processDataChangedListener(o);
}
function FUiColor3Tpl_construct(){
   var o = this;
   o.__base.FEditControl.construct.call(o);
   o._inputSize = new SSize2(120, 0);
   o._innerOriginValue = new SColor4();
   o._innerDataValue = new SColor4();
}
function FUiColor3Tpl_get(p){
   var o = this;
   var v = o._innerDataValue;
   var h = o._hInputRed;
   if(h){
      v.red = RFloat.parse(h.value);
   }
   var h = o._hInputGreen;
   if(h){
      v.green = RFloat.parse(h.value);
   }
   var h = o._hInputBlue;
   if(h){
      v.blue = RFloat.parse(h.value);
   }
   return v;
}
function FUiColor3Tpl_set(p){
   var o = this;
   o.__base.FEditControl.set.call(o, p);
   if(p.constructor == SColor4){
      o._innerOriginValue.assign(p);
      o._innerDataValue.assign(p);
   }else{
      throw new TError('Invalid value format.');
   }
   var v = o._innerDataValue;
   var h = o._hInputRed;
   if(h){
      h.value = RFloat.format(v.red, 0, null, 2, null);
   }
   var h = o._hInputGreen;
   if(h){
      h.value = RFloat.format(v.green, 0, null, 2, null);
   }
   var h = o._hInputBlue;
   if(h){
      h.value = RFloat.format(v.blue, 0, null, 2, null);
   }
   o.changeSet(false);
}
function FUiColor3Tpl_onDataKeyDown(s, e){
   var o = this;
   o.__base.FEditControl.onDataKeyDown.call(o, s, e);
   if(o.editCase){
      RKey.fixCase(e, o.editCase);
   }
   if(o._editable){
      return;
      if(o.editComplete){
         if( 16 != e.keyCode && 17 != e.keyCode && 18 != e.keyCode && 20 != e.keyCode ){
            var ed = o.findEditor();
            if(ed){
               ed.onEditKeyDown(s, e);
            }
         }
      }
   }
}
function FUiColor3Tpl_formatValue(v){
   var o = this;
   var r = RString.nvl(v);
   if(ECase.Upper == o.editCase){
      r = RString.toUpper(r);
   }else if(ECase.Lower == o.editCase){
      r = RString.toLower(r);
   }
   return r;
}
function FUiColor3Tpl_setText(t){
   var o = this;
   if(!o.hEdit){
      return;
   }
   if('U'== o.editCase){
      o.hEdit.value = RString.toUpper(t);
   }else if('L'== o.editCase){
         o.hEdit.value = RString.toLower(t);
   }else{
      o.hEdit.value = t;
   }
   if('right' == o.editAlign ){
      o.hEdit.style.textAlign = 'right';
   }else if('left' == o.editAlign ){
      o.hEdit.style.textAlign = 'left';
   }else{
      o.hEdit.style.textAlign = 'center';
   }
}
function FUiColor3Tpl_validText(t){
   var o = this;
   var r = o.__base.FEditControl.validText.call(o, t);
   if(!r){
      if(o.validLenmin){
         if(o.validLenmin > t.length){
            return RContext.get('MDescEdit:ValidMinLength', o.validLenmin);
         }
      }
      if(o.validLenmax){
         if(o.validLenmax < t.length){
            return RContext.get('MDescEdit:ValidMaxLength', o.validLenmax);
         }
      }
   }
   return r;
}
function FUiColor3Tpl_findEditor(){
   var o = this;
   if(o.editComplete){
      var de = o.editor;
      if(!de){
         o.dsControl = o.topControl(MDataset);
         if(o.dsControl){
            de = o.editor = RConsole.find(FUiColor3TplConsole).focus(o, FUiColor3TplEditor);
         }
      }
      if(de){
         de.linkControl(o);
      }
      return o.editor;
   }
}
function FUiColor3Tpl_drop(){
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
function FUiColor3Tpl_clone(){
   var o = this;
   var r = o._class.newInstance();
   GHtml_clone(r, o.hPanel);
   return r;
}
function FUiColor3Tpl_link(){
   var o = this;
}
function FUiColor4(o){
   o = RClass.inherits(this, o, FEditControl);
   o._inputSize       = RClass.register(o, new APtySize2('_inputSize'));
   o._styleInputPanel = RClass.register(o, new AStyle('_styleInputPanel'));
   o._styleInput      = RClass.register(o, new AStyle('_styleInput'));
   o._hInput          = null;
   o.onBuildEditValue = FUiColor4_onBuildEditValue;
   o.construct        = FUiColor4_construct;
   o.get              = FUiColor4_get;
   o.set              = FUiColor4_set;
   return o;
}
function FUiColor4_oeDataLoad(p){
   var o = this;
   alert(p);
   return EEventStatus.Stop;
}
function FUiColor4_oeDataSave(p){
   var o = this;
   return EEventStatus.Stop;
}
function FUiColor4_onBuildEditValue(p){
   var o = this;
   var h = o._hValuePanel;
   h.className = o.styleName('InputPanel');
   var he = o._hInput = RBuilder.appendEdit(h, o.styleName('Input'));
   if(o._editLength){
      he.maxLength = o._editLength;
   }
}
function FUiColor4_construct(){
   var o = this;
   o.__base.FEditControl.construct.call(o);
   o._inputSize = new SSize2(120, 0);
}
function FUiColor4_get(p){
   var o = this;
   var r = o.__base.FEditControl.get.call(o, p);
   var h = o._hInput;
   if(h){
      r = h.value;
   }
   return r;
}
function FUiColor4_set(p){
   var o = this;
   o.__base.FEditControl.set.call(o, p);
   var v = null;
   if(p.constructor == SColor4){
      var r = RFloat.format(p.red, 0, null, 3, null);
      var g = RFloat.format(p.green, 0, null, 3, null);
      var b = RFloat.format(p.blue, 0, null, 3, null);
      v = r + ',' + g + ',' + b;
   }
   var h = o._hInput;
   if(h){
      h.value = v;
   }
}
function FUiColor4_onDataKeyDown(s, e){
   var o = this;
   o.__base.FEditControl.onDataKeyDown.call(o, s, e);
   if(o.editCase){
      RKey.fixCase(e, o.editCase);
   }
   if(o._editable){
      return;
      if(o.editComplete){
         if( 16 != e.keyCode && 17 != e.keyCode && 18 != e.keyCode && 20 != e.keyCode ){
            var ed = o.findEditor();
            if(ed){
               ed.onEditKeyDown(s, e);
            }
         }
      }
   }
}
function FUiColor4_formatValue(v){
   var o = this;
   var r = RString.nvl(v);
   if(ECase.Upper == o.editCase){
      r = RString.toUpper(r);
   }else if(ECase.Lower == o.editCase){
      r = RString.toLower(r);
   }
   return r;
}
function FUiColor4_setText(t){
   var o = this;
   if(!o.hEdit){
      return;
   }
   if('U'== o.editCase){
      o.hEdit.value = RString.toUpper(t);
   }else if('L'== o.editCase){
         o.hEdit.value = RString.toLower(t);
   }else{
      o.hEdit.value = t;
   }
   if('right' == o.editAlign ){
      o.hEdit.style.textAlign = 'right';
   }else if('left' == o.editAlign ){
      o.hEdit.style.textAlign = 'left';
   }else{
      o.hEdit.style.textAlign = 'center';
   }
}
function FUiColor4_validText(t){
   var o = this;
   var r = o.__base.FEditControl.validText.call(o, t);
   if(!r){
      if(o.validLenmin){
         if(o.validLenmin > t.length){
            return RContext.get('MDescEdit:ValidMinLength', o.validLenmin);
         }
      }
      if(o.validLenmax){
         if(o.validLenmax < t.length){
            return RContext.get('MDescEdit:ValidMaxLength', o.validLenmax);
         }
      }
   }
   return r;
}
function FUiColor4_findEditor(){
   var o = this;
   if(o.editComplete){
      var de = o.editor;
      if(!de){
         o.dsControl = o.topControl(MDataset);
         if(o.dsControl){
            de = o.editor = RConsole.find(FUiColor4Console).focus(o, FUiColor4Editor);
         }
      }
      if(de){
         de.linkControl(o);
      }
      return o.editor;
   }
}
function FUiColor4_drop(){
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
function FUiColor4_clone(){
   var o = this;
   var r = o._class.newInstance();
   GHtml_clone(r, o.hPanel);
   return r;
}
function FUiColor4_link(){
   var o = this;
}
function FUiEdit(o){
   o = RClass.inherits(this, o, FUiEditControl);
   o._inputSize       = RClass.register(o, new APtySize2('_inputSize'));
   o._styleInputPanel = RClass.register(o, new AStyle('_styleInputPanel'));
   o._styleInput      = RClass.register(o, new AStyle('_styleInput'));
   o._hInput          = null;
   o.onBuildEditValue = FUiEdit_onBuildEditValue;
   o.construct        = FUiEdit_construct;
   o.get              = FUiEdit_get;
   o.set              = FUiEdit_set;
   return o;
}
function FUiEdit_oeDataLoad(p){
   var o = this;
   alert(p);
   return EEventStatus.Stop;
}
function FUiEdit_oeDataSave(p){
   var o = this;
   return EEventStatus.Stop;
}
function FUiEdit_onBuildEditValue(p){
   var o = this;
   var h = o._hValuePanel;
   h.className = o.styleName('InputPanel');
   var he = o._hInput = RBuilder.appendEdit(h, o.styleName('Input'));
   if(o._editLength){
      he.maxLength = o._editLength;
   }
}
function FUiEdit_construct(){
   var o = this;
   o.__base.FUiEditControl.construct.call(o);
   o._inputSize = new SSize2(120, 0);
}
function FUiEdit_get(p){
   var o = this;
   var r = o.__base.FUiEditControl.get.call(o, p);
   var h = o._hInput;
   if(h){
      r = h.value;
   }
   return r;
}
function FUiEdit_set(p){
   var o = this;
   o.__base.FUiEditControl.set.call(o, p);
   var h = o._hInput;
   if(h){
      h.value = RString.nvl(p);
   }
}
function FUiEdit_onDataKeyDown(s, e){
   var o = this;
   o.__base.FUiEditControl.onDataKeyDown.call(o, s, e);
   if(o.editCase){
      RKey.fixCase(e, o.editCase);
   }
   if(o._editable){
      return;
      if(o.editComplete){
         if( 16 != e.keyCode && 17 != e.keyCode && 18 != e.keyCode && 20 != e.keyCode ){
            var ed = o.findEditor();
            if(ed){
               ed.onEditKeyDown(s, e);
            }
         }
      }
   }
}
function FUiEdit_formatValue(v){
   var o = this;
   var r = RString.nvl(v);
   if(ECase.Upper == o.editCase){
      r = RString.toUpper(r);
   }else if(ECase.Lower == o.editCase){
      r = RString.toLower(r);
   }
   return r;
}
function FUiEdit_setText(t){
   var o = this;
   if(!o.hEdit){
      return;
   }
   if('U'== o.editCase){
      o.hEdit.value = RString.toUpper(t);
   }else if('L'== o.editCase){
         o.hEdit.value = RString.toLower(t);
   }else{
      o.hEdit.value = t;
   }
   if('right' == o.editAlign ){
      o.hEdit.style.textAlign = 'right';
   }else if('left' == o.editAlign ){
      o.hEdit.style.textAlign = 'left';
   }else{
      o.hEdit.style.textAlign = 'center';
   }
}
function FUiEdit_validText(t){
   var o = this;
   var r = o.__base.FUiEditControl.validText.call(o, t);
   if(!r){
      if(o.validLenmin){
         if(o.validLenmin > t.length){
            return RContext.get('MDescEdit:ValidMinLength', o.validLenmin);
         }
      }
      if(o.validLenmax){
         if(o.validLenmax < t.length){
            return RContext.get('MDescEdit:ValidMaxLength', o.validLenmax);
         }
      }
   }
   return r;
}
function FUiEdit_findEditor(){
   var o = this;
   if(o.editComplete){
      var de = o.editor;
      if(!de){
         o.dsControl = o.topControl(MDataset);
         if(o.dsControl){
            de = o.editor = RConsole.find(FUiEditConsole).focus(o, FUiEditEditor);
         }
      }
      if(de){
         de.linkControl(o);
      }
      return o.editor;
   }
}
function FUiEdit_drop(){
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
function FUiEdit_clone(){
   var o = this;
   var r = o._class.newInstance();
   GHtml_clone(r, o.hPanel);
   return r;
}
function FUiEdit_link(){
   var o = this;
}
function FUiEditControl(o){
   o = RClass.inherits(this, o, FUiControl, MDataField, MEditValue, MEditChange, MEditDrop);
   o._labelModeCd      = RClass.register(o, new APtyString('_labelModeCd'), ELabelMode.All);
   o._labelPositionCd  = RClass.register(o, new APtyString('_labelPositionCd'), ELabelPosition.Left);
   o._labelSize        = RClass.register(o, new APtySize2('_labelSize'));
   o._labelAlignCd     = RClass.register(o, new APtyString('_labelAlignCd'), EAlign.Left);
   o._editSize         = RClass.register(o, new APtySize2('_editSize'));
   o._dataTypeCd       = RClass.register(o, new APtyString('_dataTypeCd'));
   o._styleLabelPanel  = RClass.register(o, new AStyle('_styleLabelPanel'));
   o._styleEditPanel   = RClass.register(o, new AStyle('_styleEditPanel'));
   o._hLabelPanel      = null;
   o,_hLabelForm       = null;
   o,_hIconPanel       = null;
   o,_hIcon            = null;
   o,_hTextPanel       = null;
   o,_hText            = null;
   o._hEditPanel       = null;
   o._hEditForm        = null;
   o._hValuePanel      = null;
   o.onBuildLabelIcon  = FUiEditControl_onBuildLabelIcon;
   o.onBuildLabelText  = FUiEditControl_onBuildLabelText;
   o.onBuildLabel      = FUiEditControl_onBuildLabel;
   o.onBuildEditValue  = RMethod.virtual(o, 'onBuildEditValue');
   o.onBuildEdit       = FUiEditControl_onBuildEdit;
   o.onBuildPanel      = FUiEditControl_onBuildPanel;
   o.onBuild           = FUiEditControl_onBuild;
   o.oeDataLoad        = FUiEditControl_oeDataLoad;
   o.oeDataSave        = FUiEditControl_oeDataSave;
   o.oeDesign          = FUiEditControl_oeDesign;
   o.oeMode            = FUiEditControl_oeMode;
   o.construct         = FUiEditControl_construct;
   o.panel             = FUiEditControl_panel;
   o.label             = FUiEditControl_label;
   o.setLabel          = FUiEditControl_setLabel;
   o.dispose           = FUiEditControl_dispose;
   return o;
}
function FUiEditControl_onBuildLabelIcon(p){
   var o = this;
   if(o._labelIcon){
      o._hIcon = RBuilder.appendIcon(o._hIconPanel, o._labelIcon);
   }
}
function FUiEditControl_onBuildLabelText(p){
   var o = this;
   o._hText = RBuilder.appendSpan(o._hTextPanel, null, o._label);
}
function FUiEditControl_onBuildLabel(p){
   var o = this;
   var h = o._hLabelForm = RBuilder.appendTable(o._hLabelPanel, o.styleName('LabelPanel'));
   var hr = RBuilder.appendTableRow(h);
   var hip = o._hIconPanel = RBuilder.appendTableCell(hr);
   o.onBuildLabelIcon(p);
   var htp = o._hTextPanel = RBuilder.appendTableCell(hr);
   htp.noWrap = true;
   o.onBuildLabelText(p);
   RHtml.setSize(h, o._labelSize);
   if(o._labelAlignCd){
      htp.align = o._labelAlignCd;
      htp.style.paddingRight = 4;
   }
   if(o._labelColor){
      o._hLabel.style.color = o._labelColor;
   }
}
function FUiEditControl_onBuildEdit(p){
   var o = this;
   var h = o._hEditForm = RBuilder.appendTable(o._hEditPanel, o.styleName('EditPanel'));
   var hr = o._hEditLine = RBuilder.appendTableRow(h);
   o._hValuePanel = RBuilder.appendTableCell(hr);
   o.onBuildEditValue(p);
   RHtml.setSize(h, o._editSize);
}
function FUiEditControl_onBuildPanel(p){
   var o = this;
   o._hPanel = RBuilder.createTable(p, o.styleName('Panel'));
}
function FUiEditControl_onBuild(p){
   var o = this;
   o.__base.FUiControl.onBuild.call(o, p);
   var hc = o._hPanel;
   var hlp = null;
   var hep = null;
   var lmc = o._labelModeCd;
   if(lmc == ELabelMode.Label){
      hlp = RBuilder.appendTableCell(RBuilder.appendTableRow(hc));
   }else if(lmc == ELabelMode.Hidden){
      hep = RBuilder.appendTableCell(RBuilder.appendTableRow(hc));
   }else{
      var lpc = o._labelPositionCd;
      if(lpc == ELabelPosition.Top){
         hlp = RBuilder.appendTableRowCell(hc);
         hep = RBuilder.appendTableRowCell(hc);
      }else if(lpc == ELabelPosition.Right){
         var hr = RBuilder.appendTableRow(hc);
         hep = RBuilder.appendTableCell(hr);
         hlp = RBuilder.appendTableCell(hr);
      }else if(lpc == ELabelPosition.Bottom){
         hep = RBuilder.appendTableRowCell(hc);
         hlp = RBuilder.appendTableRowCell(hc);
      }else{
         var hr = RBuilder.appendTableRow(hc);
         hlp = RBuilder.appendTableCell(hr);
         hep = RBuilder.appendTableCell(hr);
      }
   }
   o._hLabelPanel = hlp;
   o._hEditPanel = hep;
   if(hlp){
      o.onBuildLabel(p);
      hlp.appendChild(o._hLabelForm);
      o.setLabel(o._label);
   }
   if(hep){
      o.onBuildEdit(p);
   }
   return EEventStatus.Stop;
}
function FUiEditControl_onScalar(g){
   var o = this;
   o.set(g.result);
}
function FUiEditControl_scalar(a){
   var o = this;
   var g = new TDatasetScalarArg(o, null, a);
   g.callback = new TInvoke(o, o.onScalar);
   RConsole.find(FDatasetConsole).scalar(g);
}
function FUiEditControl_onDataDoubleClick(){
   var o = this;
   if(RClass.isClass(o, MDropable)){
      o.onDropDoubleClick();
   }
   if(RClass.isClass(o, MListView)){
      o.onListClick();
   }
}
function FUiEditControl_onDataKeyDown(s, e){
   var o = this;
   o.__base.MEditDescriptor.onDataKeyDown.call(o, s, e);
   var hci = o.hChangeIcon;
   if(hci){
      hci.style.display = o.isDataChanged() ? 'block' : 'none';
   }
   if(RClass.isClass(o, MDropable) && EKey.Down==e.keyCode){
      o.drop();
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
function FUiEditControl_onDesignBegin(){
   var o = this;
   o.__base.MDesign.onDesignBegin.call(o);
   o._disbaled = true;
   o.hEdit.disbaled = true;
}
function FUiEditControl_onDesignEnd(){
   var o = this;
   o.__base.MDesign.onDesignEnd.call(o);
   o._disbaled = false;
   o.hEdit.disbaled = false;
}
function FUiEditControl_oeDataLoad(p){
   var o = this;
   var ds = p.source;
   var r = ds.currentRow();
   var v = r.get(o._dataName);
   o.set(v);
   return EEventStatus.Stop;
}
function FUiEditControl_oeDataSave(p){
   var o = this;
   var ds = p.source;
   var r = ds.currentRow();
   var v = o.get();
   r.set(o._dataName, v);
   return EEventStatus.Stop;
}
function FUiEditControl_oeDesign(p){
   var o = this;
   o.__base.MDesign.oeDesign.call(o, e);
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
            if(o.hEdit){
               o.hEdit.disabled = true;
            }
         }else{
            o.hForm.border = 0;
            if(hlf){
               hlf.border = 0;
               hlf.cellPadding = 0;
            }
            if(hef){
            }
            if(o.hEdit){
               o.hEdit.disabled = false;
            }
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
function FUiEditControl_oeMode(e){
   var o = this;
   o.__base.FUiControl.oeMode.call(o, e);
   o.__base.MDisplay.oeMode.call(o, e);
   o._editable = o.canEdit(e.mode);
   o._validable = o.canValid(e.mode);
   if(!o._progress){
      o.setEditable(o._editable);
   }
   return EEventStatus.Stop;
}
function FUiEditControl_oeProgress(e){
   var o = this;
   if(o._progress && e.enable){
      return EEventStatus.Stop;
   }
   o._progress = e.enable;
   if(e.enable){
      var ea = o._editable;
      o.setEditable(false);
      o._editable = ea;
   }else{
      o.setEditable(o._editable);
   }
   return EEventStatus.Stop;
}
function FUiEditControl_oeLoadValue(e){
   var o = this;
   var r = o.__base.MEditValue.oeLoadValue.call(o, e);
   var hci = o.hChangeIcon;
   if(hci){
      hci.style.display = 'none';
   }
   return r;
}
function FUiEditControl_doFocus(e){
   var o = this;
   o.__base.MFocus.doFocus.call(o, e);
   o.__base.MEditValue.doFocus.call(o, e);
}
function FUiEditControl_doBlur(e){
   var o = this;
   o.__base.MFocus.doBlur.call(o, e);
   o.__base.MEditValue.doBlur.call(o, e);
}
function FUiEditControl_construct(){
   var o = this;
   o.__base.FUiControl.construct.call(o);
   o.__base.MEditChange.construct.call(o);
   o.__base.MEditDrop.construct.call(o);
   o._labelSize = new SSize2(100, 20);
   o._editSize = new SSize2(200, 20);
}
function FUiEditControl_panel(t){
   var o = this;
   if(EPanel.Edit == t){
      return o.hEdit;
   }else if(EPanel.Focus == t){
      return o.hEdit;
   }
   return o.__base.FUiControl.panel.call(o, t);
}
function FUiEditControl_label(p){
   return this._label;
}
function FUiEditControl_setLabel(p){
   var o = this;
   o._label = p;
   if(o._hText){
      o._hText.innerHTML = RString.nvl(p);
   }
}
function FUiEditControl_testFocus(){
   return this._visible && this._editable && !this._disbaled;
}
function FUiEditControl_getEditRange(){
   var o = this;
   var hc = o.hEditCell;
   var p = RHtml.offsetPosition(hc);
   var w = hc.offsetWidth;
   var h = hc.offsetHeight;
   return new TRange(p.x, p.y, w, h);
}
function FUiEditControl_text(){
   return this.hEdit ? this.hEdit.value : '';
}
function FUiEditControl_setText(t){
   this.hEdit.value = t;
}
function FUiEditControl_setEditable(v){
   var o = this;
   o.__base.MEditValue.setEditable.call(o, v);
   if(o.hEdit){
      o.hEdit.readOnly = !v;
   }
   var hl = o.hLabel;
   if(hl){
      if(o.validRequire){
         o.hLabel.style.color = v ? EColor.Require : EColor.Text;
      }
      if(RClass.isClass(o, MListView) && o.canListView()){
         hl.style.cursor = v ? 'hand' : 'normal';
         hl.className = v ? 'RLine_Underline' : '';
      }
   }
}
function FUiEditControl_setVisible(v){
   var o = this;
   o.__base.FUiControl.setVisible.call(o, v);
   o.refreshStyle();
}
function FUiEditControl_focus(){
   var o = this;
   o.__base.MFocus.focus.call(o);
   if(o.hEdit){
      try{
         o.hEdit.focus();
      }catch(e){
      }
   }
}
function FUiEditControl_refreshStyle(){
   var o = this;
   if(!o._visible){
      return;
   }
   var tc = EColor.TextReadonly;
   var bc = EColor.Readonly;
   var cr = 'normal';
   if(o._editable){
      tc = EColor.TextEdit;
      bc = EColor.Edit;
      cr = 'hand';
      if(!RString.isEmpty(o.editTip) && o.hEdit.innerText == o.editTip){
         tc = '#CCCCCC';
      }
   }
   if(o._invalidText){
      if(!RString.isEmpty(o.text())){
         tc = EColor.TextInvalid;
         bc = EColor.Invalid;
      }
   }
   o._textColor = tc;
   o._backColor = bc;
   var he = o.hEdit;
   var hd = o.hDrop;
   if(he){
      he.style.color = tc;
      he.style.backgroundColor = bc;
   }
   if(hd){
      if(he){
         he.style.cursor = cr;
      }
      hd.style.cursor = cr;
   }
   if(o.editBorder){
      var bs = EBorderStyle.Readonly;
      if(o._editable){
         bs = EBorderStyle.Edit;
      }
      if(o._hover){
         bs = EBorderStyle.Hover;
      }
      o.setEditBorderStyle(bs, bc);
   }
}
function FUiEditControl_dispose(){
   var o = this;
   o._labelModeCd = null;
   o._labelPositionCd = null;
   o._labelAlignCd = null;
   o._dataTypeCd = null;
   var v = o._labelSize;
   if(v){
      v.dispose();
      o._labelSize = null;
   }
   var v = o._editSize;
   if(v){
      v.dispose();
      o._editSize = null;
   }
   RHtml.free(o._hLabelPanel);
   o._hLabelPanel = null;
   RHtml.free(o,_hLabelForm);
   o,_hLabelForm = null;
   RHtml.free(o,_hIconPanel);
   o,_hIconPanel = null;
   RHtml.free(o,_hIcon);
   o,_hIcon = null;
   RHtml.free(o,_hTextPanel);
   o,_hTextPanel = null;
   RHtml.free(o,_hText);
   o,_hText = null;
   RHtml.free(o._hEditPanel);
   o._hEditPanel = null;
   RHtml.free(o._hEditForm);
   o._hEditForm = null;
   RHtml.free(o._hValuePanel);
   o._hValuePanel = null;
   RHtml.free(o._hDropPanel);
   o._hDropPanel = null;
   o.__base.MEditDrop.dispose.call(o);
   o.__base.MEditChange.dispose.call(o);
   o.__base.FUiControl.dispose.call(o);
}
function FUiFrame(o){
   o = RClass.inherits(this, o, FUiLayout);
   return o;
}
function FUiLayout(o){
   o = RClass.inherits(this, o, FUiContainer);
   o._styleForm      = RClass.register(o, new AStyle('_styleForm', 'Form'));
   o._lastSplit      = null;
   o._hPanelForm     = null;
   o._hContainer     = null;
   o._hPanelTable    = null;
   o._hPanelLine     = null;
   o.onBuildPanel    = FUiLayout_onBuildPanel;
   o.onDesignBegin   = FUiLayout_onDesignBegin;
   o.onDesignEnd     = FUiLayout_onDesignEnd;
   o.oeDesign        = FUiLayout_oeDesign;
   o.oeResize        = FUiLayout_oeResize;
   o.oeRefresh       = FUiLayout_oeRefresh;
   o.insertPosition  = FUiLayout_insertPosition;
   o.moveChild       = FUiLayout_moveChild;
   o.innerAppendLine = FUiLayout_innerAppendLine;
   o.appendChild     = FUiLayout_appendChild;
   o.resize          = FUiLayout_resize;
   o.dispose         = FUiLayout_dispose;
   return o;
}
function FUiLayout_onBuildPanel(p){
   var o = this;
   var h = o._hPanel = o._hPanelForm = RBuilder.createTable(p.hDocument, o.styleName('Form'), null, 0, 1);
   if(o._layoutCd == ELayout.Design){
      var hr = RBuilder.appendTableRow(h);
      var hc = RBuilder.appendTableCell(hr);
      o._hContainer = hc;
   }
}
function FUiLayout_onDesignBegin(){
   var o = this;
   o.__base.MDesign.onDesignBegin.call(o);
}
function FUiLayout_onDesignEnd(){
   var o = this;
   o.__base.MDesign.onDesignEnd.call(o);
}
function FUiLayout_oeDesign(p){
   var o = this;
   o.__base.FUiContainer.oeDesign.call(o, p);
   if(p.isAfter()){
      switch(p.layoutCd){
         case EDesign.Move:
            break;
         case EDesign.Border:
            if(event.flag){
               o._hPanel.border = 1;
               o._hPanel.style.border = '1 solid red';
            }else{
               o._hPanel.border = 0;
               o._hPanel.style.border = null;
            }
            break;
      }
   }
}
function FUiLayout_oeResize(p){
   var o = this;
   o.__base.FUiContainer.oeResize.call(o, p);
   if(p.isAfter()){
      o.resize();
   }
}
function FUiLayout_oeRefresh(p){
   var o = this;
   o.__base.FUiContainer.oeDesign.call(o, p);
   if(p.isAfter()){
      o.resize();
   }
}
function FUiLayout_insertPosition(cf, ct, idx, copy){
   var o = this;
   var ms = o._components;
   var cs = o.controls;
   ms.removeValue(cf);
   cs.removeValue(cf);
   if(ct){
      var index = ms.indexOfValue(ct);
      ms.insert(index+idx, cf.name, cf);
      var index = cs.indexOfValue(ct);
      cs.insert(index+idx, cf.name, cf);
   }else{
      ms.set(cf.name, cf);
      cs.set(cf.name, cf);
   }
}
function FUiLayout_moveChild(cf, ct, pos, copy){
   if(!(cf && ct && pos) || (cf == ct)){
      return;
   }
   var o = this;
   var hPanel = o._hPanel;
   var moved = false;
   var cfh = RClass.isClass(cf, MHorizontal);
   var hCfTd = RHtml.parent(cf._hPanel, 'TD');
   var hCfTab = RHtml.parent(cf._hPanel, 'TABLE');
   var cth = RClass.isClass(ct, MHorizontal);
   var hTd = RHtml.parent(ct._hPanel, 'TD');
   var hTable = RHtml.parent(hTd, 'TABLE');
   switch(pos){
      case EPosition.Before:
         var hRow = hTable.rows[0];
         for(var n=0; n<hRow.cells.length; n++){
            if(hRow.cells[n] == hTd){
               var hCell = RBuilder.appendTableCell(hRow, null, hTd.cellIndex);
               hCell.appendChild(cf._hPanel);
               o.insertPosition(cf, ct, 0, copy);
               cf.nowrap = true;
               cf._hPanelLine = hTable;
               moved = true;
               break;
            }
         }
         break;
      case EPosition.After:
         var hRow = hTable.rows[0];
         for(var n=0; n<hRow.cells.length; n++){
            if(hRow.cells[n] == hTd){
               var hCfTd = RHtml.parent(cf._hPanel, 'TD');
               var hCell = RBuilder.appendTableCell(hRow, null, hTd.cellIndex + 1);
               hCell.appendChild(cf._hPanel);
               o.insertPosition(cf, ct, 1, copy);
               cf.nowrap = false;
               cf._hPanelLine = hTable;
               ct.nowrap = true;
               moved = true;
               break;
            }
         }
         break;
      case EPosition.LineBefore:
         if(cth){
            if(cfh){
               o._hContainer.insertBefore(cf._hPanel, ct._hPanel);
            }else{
               var hNewTab = o.innerAppendLine();
               o._hContainer.insertBefore(hNewTab, ct._hPanel);
               var hCell = RBuilder.appendTableCell(o._hPanelLine);
               hCell.appendChild(cf._hPanel);
               cf._hPanelLine = hNewTab;
            }
            o.insertPosition(cf, ct, 0, copy);
         }else{
            var count = o._hContainer.children.length;
            for(var n=0; n<count; n++){
               if(o._hContainer.children[n] == hTable){
                  if(cfh){
                     o._hContainer.insertBefore(cf._hPanel, hTable);
                  }else{
                     var hNewTab = o.innerAppendLine();
                     o._hContainer.insertBefore(hNewTab, hTable);
                     var hCell = RBuilder.appendTableCell(o._hPanelLine);
                     hCell.appendChild(cf._hPanel);
                     cf._hPanelLine = hNewTab;
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
            o._hContainer.appendChild(cf._hPanel);
         }else{
            var hNewTab = o.innerAppendLine();
            var hCell = RBuilder.appendTableCell(o._hPanelLine);
            hCell.appendChild(cf._hPanel);
            hCell.appendChild(cf._hPanel);
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
function FUiLayout_innerAppendLine(){
   var o = this;
   var h = null;
   if(o._layoutCd == ELayout.Design){
      h = o._hPanelTable = RBuilder.appendTable(o._hContainer);
      h.style.paddingBottom = 4;
      o._hPanelLine = RBuilder.appendTableRow(h);
   }else{
      o._hPanelTable = null;
      o._hPanelLine = null;
   }
   return h;
}
function FUiLayout_appendChild(ctl){
   var o = this;
   if(o._layoutCd == ELayout.Design){
      if(!o._hPanelLine){
         o.innerAppendLine();
      }
      if(RClass.isClass(ctl, MHorizontal)){
         if(o._hPanelTable.rows[0].cells.length == 0){
            o._hContainer.insertBefore(ctl._hPanel, o._hPanelTable);
         }else{
            o._hContainer.appendChild(ctl._hPanel);
            o.innerAppendLine();
         }
         return;
      }
      var hCell = RBuilder.appendTableCell(o._hPanelLine);
      if(!RClass.isClass(ctl, FUiLayout)){
         ctl._hPanelLine = o._hPanelTable;
      }
      hCell.appendChild(ctl._hPanel);
      ctl.hLayoutCell = hCell;
      if(!ctl.nowrap && (o.controls.last() != ctl)){
         o.innerAppendLine();
      }
   }else{
      ctl._hPanel.style.paddingTop = 2;
      ctl._hPanel.style.paddingBottom = 2;
      if(RSet.contains(ctl._sizeCd, ESize.Horizontal) || '100%' == ctl.width){
         if(RClass.isClass(ctl, FSplit)){
            o._lastSplit = ctl;
         }
         var hr = RBuilder.appendTableRow(o._hPanelForm);
         var hc = RBuilder.appendTableCell(hr);
         hc.vAlign = 'top';
         hc.appendChild(ctl._hPanel);
         ctl.hLayoutRow = hr;
         o._hPanelLast = hc;
         if(!RSet.contains(ctl._sizeCd, ESize.Vertical)){
            hc.height = 1;
         }else if(ctl.height){
            hc.height = ctl.height;
         }
         o._hPanelLine = null;
      }else{
         if(!o._hPanelLine){
            var hr = RBuilder.appendTableRow(o._hPanelForm);
            hr.height = 1;
            if(o._lastSplit){
               o._lastSplit.pushLine(hr);
            }
            var hc = RBuilder.appendTableCell(hr);
            hc.vAlign = 'top';
            var ht = o._hPanelTable = RBuilder.appendTable(hc);
            o._hPanelLine = RBuilder.appendTableRow(ht);
         }
         var hc = RBuilder.appendTableCell(o._hPanelLine)
         ctl.hLayoutRow = o._hPanelLine;
         o._hPanelLast = hc;
         hc.appendChild(ctl._hPanel);
         ctl.hLayoutCell = hc;
         if(!ctl.nowrap){
            o._hPanelLine = null;
         }
      }
   }
}
function FUiLayout_resize(){
   var o = this;
   var cs = o._components;
   if(cs){
      var ha = false;
      var c = cs.count();
      for(var n = 0; n < c; n++){
         var p = o._components.value(n);
         if(RClass.isClass(p, FTable) || RClass.isClass(p, FUiPageControl)){
            ha = true;
            break;
         }
      }
   }
}
function FUiLayout_dispose(){
   var o = this;
   o._hPanelCurrent = null;
   o._hPanelTable = null;
   o._hPanel = null;
   o._hContainer = null;
   o.__base.FUiContainer.dispose.call(o);
}
function FUiNumber(o){
   o = RClass.inherits(this, o, FUiEditControl, MListenerDataChanged);
   o._inputSize        = RClass.register(o, new APtySize2('_inputSize'));
   o._styleValuePanel  = RClass.register(o, new AStyle('_styleValuePanel'));
   o._styleInput       = RClass.register(o, new AStyle('_styleInput'));
   o._styleAdjustForm  = RClass.register(o, new AStyle('_styleAdjustForm'));
   o._styleUpPanel     = RClass.register(o, new AStyle('_styleUpPanel'));
   o._styleDownPanel   = RClass.register(o, new AStyle('_styleDownPanel'));
   o._innerOriginValue = null;
   o._innerDataValue   = null;
   o._hInput           = null;
   o._iconUp           = null;
   o._iconDown         = null;
   o.onBuildEditValue  = FUiNumber_onBuildEditValue;
   o.onInputKeyPress   = RClass.register(o, new AEventKeyPress('onInputKeyPress'), FUiNumber_onInputKeyPress);
   o.onInputChanged    = RClass.register(o, new AEventInputChanged('onInputChanged'), FUiNumber_onInputChanged);
   o.construct         = FUiNumber_construct;
   o.get               = FUiNumber_get;
   o.set               = FUiNumber_set;
   return o;
}
function FUiNumber_onBuildEditValue(p){
   var o = this;
   var hp = o._hValuePanel;
   hp.className = o.styleName('ValuePanel');
   var hf = o._hValueForm = RBuilder.appendTable(hp);
   hf.width = '100%';
   var hl = o._hValueLine = RBuilder.appendTableRow(hf);
   o._hChangePanel = RBuilder.appendTableCell(hl);
   o.onBuildEditChange(p);
   var hip = o._hInputPanel = RBuilder.appendTableCell(hl);
   var he = o._hInput = RBuilder.appendEdit(hip, o.styleName('Input'));
   o.attachEvent('onInputKeyPress', he, o.onInputKeyPress);
   o.attachEvent('onInputChanged', he, o.onInputChanged);
   if(o._editLength){
      he.maxLength = o._editLength;
   }
   var hap = o._hAdjustPanel = RBuilder.appendTableCell(hl);
   hap.style.borderLeft = '1px solid #666666';
   hap.width = 12;
   var haf = o.hAdjustForm = RBuilder.appendTable(hap, o.styleName('AdjustForm'));
   var hc = RBuilder.appendTableRowCell(haf);
   hc.className = o.styleName('UpPanel');
   var hi = o._hUpIcon = RBuilder.appendIcon(hc, null, 'control.number.up');
   hi.align = 'center';
   var hc = RBuilder.appendTableRowCell(haf);
   hc.className = o.styleName('DownPanel');
   var hi = o._hDownIcon = RBuilder.appendIcon(hc, null, 'control.number.down');
}
function FUiNumber_onInputKeyPress(p){
   var o = this;
   var c = p.keyCode;
   if(!EKeyCode.floatCodes[c]){
      p.cancel();
   }
}
function FUiNumber_onInputChanged(p){
   var o = this;
   o.processDataChangedListener(o);
}
function FUiNumber_construct(){
   var o = this;
   o.__base.FUiEditControl.construct.call(o);
   o._inputSize = new SSize2(120, 0);
}
function FUiNumber_get(p){
   var o = this;
   var r = o.__base.FUiEditControl.get.call(o, p);
   var h = o._hInput;
   if(h){
      r = h.value;
   }
   return r;
}
function FUiNumber_set(p){
   var o = this;
   o.__base.FUiEditControl.set.call(o, p);
   var v = RString.nvl(p, '0');
   o._innerOriginValue = v;
   o._innerDataValue = v;
   o._dataDisplay = RFloat.format(p, 0, null, 3, null);
   var h = o._hInput;
   if(h){
      h.value = o._dataDisplay;
   }
   o.changeSet(false);
}
function FUiNumber_onDataKeyDown(s, e){
   var o = this;
   o.__base.FUiEditControl.onDataKeyDown.call(o, s, e);
   if(o.editCase){
      RKey.fixCase(e, o.editCase);
   }
   if(o._editable){
      return;
      if(o.editComplete){
         if( 16 != e.keyCode && 17 != e.keyCode && 18 != e.keyCode && 20 != e.keyCode ){
            var ed = o.findEditor();
            if(ed){
               ed.onEditKeyDown(s, e);
            }
         }
      }
   }
}
function FUiNumber_formatValue(v){
   var o = this;
   var r = RString.nvl(v);
   if(ECase.Upper == o.editCase){
      r = RString.toUpper(r);
   }else if(ECase.Lower == o.editCase){
      r = RString.toLower(r);
   }
   return r;
}
function FUiNumber_setText(t){
   var o = this;
   if(!o.hEdit){
      return;
   }
   if('U'== o.editCase){
      o.hEdit.value = RString.toUpper(t);
   }else if('L'== o.editCase){
         o.hEdit.value = RString.toLower(t);
   }else{
      o.hEdit.value = t;
   }
   if('right' == o.editAlign ){
      o.hEdit.style.textAlign = 'right';
   }else if('left' == o.editAlign ){
      o.hEdit.style.textAlign = 'left';
   }else{
      o.hEdit.style.textAlign = 'center';
   }
}
function FUiNumber_validText(t){
   var o = this;
   var r = o.__base.FUiEditControl.validText.call(o, t);
   if(!r){
      if(o.validLenmin){
         if(o.validLenmin > t.length){
            return RContext.get('MDescEdit:ValidMinLength', o.validLenmin);
         }
      }
      if(o.validLenmax){
         if(o.validLenmax < t.length){
            return RContext.get('MDescEdit:ValidMaxLength', o.validLenmax);
         }
      }
   }
   return r;
}
function FUiNumber_findEditor(){
   var o = this;
   if(o.editComplete){
      var de = o.editor;
      if(!de){
         o.dsControl = o.topControl(MDataset);
         if(o.dsControl){
            de = o.editor = RConsole.find(FUiNumberConsole).focus(o, FUiNumberEditor);
         }
      }
      if(de){
         de.linkControl(o);
      }
      return o.editor;
   }
}
function FUiNumber_drop(){
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
function FUiNumber_clone(){
   var o = this;
   var r = o._class.newInstance();
   GHtml_clone(r, o.hPanel);
   return r;
}
function FUiNumber_link(){
   var o = this;
}
function FUiPageControl(o){
   o = RClass.inherits(this, o, FUiContainer);
   o._sizeCd          = ESize.Horizontal;
   o._stylePanel      = RClass.register(o, new AStyle('_stylePanel'));
   o._styleTitlePanel = RClass.register(o, new AStyle('_styleTitlePanel'));
   o._styleTitleForm  = RClass.register(o, new AStyle('_styleTitleForm'));
   o._styleDataPanel  = RClass.register(o, new AStyle('_styleDataPanel'));
   o._styleDataForm   = RClass.register(o, new AStyle('_styleDataForm'));
   o._styleTop        = RClass.register(o, new AStyle('_styleTop'));
   o._styleBottom     = RClass.register(o, new AStyle('_styleBottom'));
   o._styleForm       = RClass.register(o, new AStyle('_styleForm'));
   o._sheets          = null;
   o._activeSheet     = null;
   o._esize           = ESize.Both;
   o._hTop             = null;
   o._hLine            = null;
   o._hBottom          = null;
   o._hSheets          = null;
   o.onBuildPanel     = FUiPageControl_onBuildPanel;
   o.onBuild          = FUiPageControl_onBuild;
   o.oeRefresh        = FUiPageControl_oeRefresh;
   o.construct        = FUiPageControl_construct;
   o.appendChild      = FUiPageControl_appendChild;
   o.select           = FUiPageControl_select;
   o.selectByIndex    = FUiPageControl_selectByIndex;
   o.sheet            = FUiPageControl_sheet;
   o.push             = FUiPageControl_push;
   o.dispose          = FUiPageControl_dispose;
   return o;
}
function FUiPageControl_onBuildPanel(p){
   var o = this;
   var h = o._hPanel = RBuilder.createTable(p, o.styleName('Panel'));
   h.width = '100%';
}
function FUiPageControl_onBuild(p){
   var o = this;
   o.__base.FUiContainer.onBuild.call(o, p);
   var h = o._hPanel;
   var hc = RBuilder.appendTableRowCell(h, o.styleName('TitlePanel'));
   var hf = o.hTitleForm = RBuilder.appendTable(hc, o.styleName('TitleForm'));
   hf.width = '100%';
   var hr = o._hTop = RBuilder.appendTableRow(hf);
   hr.height = 1;
   o._hLine = RBuilder.appendTableRow(hf);
   var hr = o._hBottom = RBuilder.appendTableRow(hf);
   hr.height = 1;
   var hc = o._hFirstTop = RBuilder.appendTableCell(o._hTop);
   hc.width = 20;
   o._hFirst = RBuilder.appendTableCell(o._hLine);
   var hbc = o._hFirstBottom = RBuilder.appendTableCell(o._hBottom);
   hbc.className = o.styleName('Bottom', FUiPageSheet);
   var hc = RBuilder.appendTableRowCell(h);
   hc.height = 4;
   var hc = o._hLastTop = RBuilder.appendTableCell(o._hTop);
   o._hLast = RBuilder.appendTableCell(o._hLine);
   var hc = o._hLastBottom = RBuilder.appendTableCell(o._hBottom);
   hc.className = o.styleName('Bottom', FUiPageSheet);
}
function FUiPageControl_oeRefresh(p){
   var o = this;
   var r = o.__base.FUiContainer.oeRefresh.call(o, p);
   if(p.isBefore()){
      if(o._sheets.count()){
         if(o._activeSheet){
            o._activeSheet.oeRefresh(e);
         }else{
            var s = o._activeSheet = o._sheets.value(0);
            if(s){
               s.innerSelect(true);
            }
         }
      }
   }
   return r;
}
function FUiPageControl_construct(){
   var o = this;
   o.__base.FUiContainer.construct.call(o);
   o._sheets = new TDictionary();
}
function FUiPageControl_appendChild(p){
   var o = this;
   if(RClass.isClass(p, FUiPageSheet)){
      var ci = o._hLast.cellIndex;
      var hc = p._hTopL = RBuilder.appendTableCell(o._hTop, null, ci);
      hc.width = 1;
      hc.className = p.styleName('Top');
      var hc = p._hTop = RBuilder.appendTableCell(o._hTop, null, ci + 1);
      hc.className = p.styleName('Top');
      var hc = p._hTopR = RBuilder.appendTableCell(o._hTop, null, ci + 2);
      hc.width = 1;
      hc.className = p.styleName('Top');
      var hc = p._hLeft = RBuilder.appendTableCell(o._hLine, null, ci);
      hc.width = 1;
      hc.className = p.styleName('Left');
      var hc = p._hButtonPanel = RBuilder.appendTableCell(o._hLine, null, ci + 1);
      p.attachEvent('onButtonEnter', hc);
      p.attachEvent('onButtonLeave', hc);
      p.attachEvent('onHeadMouseDown', hc);
      hc.width = 1;
      var hb = p._hButton = RBuilder.append(hc, 'DIV', p.styleName('Button'));
      if(p.icon){
         p._hIcon = RBuilder.appendIcon(hb, null, p.icon);
      }
      if(p.label){
         p._hText = RBuilder.appendSpan(hb, p.styleName('ButtonText'));
         p._hText.innerText = ' ' + p.label();
      }
      var hc = p._hRight = RBuilder.appendTableCell(o._hLine, null, ci + 2);
      hc.width = 1;
      hc.className = p.styleName('Right')
      var hc = p._hBottomL = RBuilder.appendTableCell(o._hBottom, null, ci);
      hc.width = 1;
      hc.className = p.styleName('Bottom');
      var hc = p._hBottom = RBuilder.appendTableCell(o._hBottom, null, ci + 1);
      hc.className = p.styleName('Bottom');
      var hc = p._hBottomR = RBuilder.appendTableCell(o._hBottom, null, ci + 2);
      hc.width = 1;
      hc.className = p.styleName('Bottom');
      var hr = RBuilder.appendTableRow(o._hPanel);
      if(p.index){
         hr.style.display = 'none';
      }
      var hc = RBuilder.appendTableCell(hr);
      p._hForm = hr;
      hc.style.verticalAlign = 'top';
      hc.appendChild(p._hPanel);
      o.selectByIndex(0);
   }
}
function FUiPageControl_sheet(p){
   return this._sheets.get(p);
}
function FUiPageControl_select(p){
   var o = this;
   var ss = o._sheets;
   var c = ss.count();
   o._activeSheet = p;
   for(var i = 0; i < c; i++){
      var s = o._sheets.value(i);
      if(s != p){
         s.select(false);
      }
   }
   p.select(true);
}
function FUiPageControl_selectByIndex(n){
   var o = this;
   var p = o._sheets.value(n);
   if(p){
      o.select(p);
   }
}
function FUiPageControl_push(p){
   var o = this;
   if(RClass.isClass(p, FUiPageSheet)){
      var ss = o._sheets;
      p._pageControl = o;
      p._index = ss.count();
      ss.set(p.name(), p);
   }
   o.__base.FUiContainer.push.call(o, p);
}
function FUiPageControl_dispose(){
   var o = this;
   o.__base.FUiContainer.dispose.call(o);
}
function FUiPageSheet(o){
   o = RClass.inherits(this, o, FUiPanel);
   o._icon              = RClass.register(o, new APtyString('_icon'));
   o._formName          = RClass.register(o, new APtyString('_formName'));
   o._formLink          = RClass.register(o, new APtyString('_formLink'));
   o._formWhere         = RClass.register(o, new APtyString('_formWhere'));
   o._formOrder         = RClass.register(o, new APtyString('_formOrder'));
   o._styleTop          = RClass.register(o, new AStyle('_styleTop'));
   o._styleTopSelect    = RClass.register(o, new AStyle('_styleTopSelect'));
   o._styleLeft         = RClass.register(o, new AStyle('_styleLeft'));
   o._styleLeftSelect   = RClass.register(o, new AStyle('_styleLeftSelect'));
   o._styleRight        = RClass.register(o, new AStyle('_styleRight'));
   o._styleRightSelect  = RClass.register(o, new AStyle('_styleRightSelect'));
   o._styleRightPrior   = RClass.register(o, new AStyle('_styleRightPrior'));
   o._styleButtom       = RClass.register(o, new AStyle('_styleBottom'));
   o._styleBottomSelect = RClass.register(o, new AStyle('_styleBottomSelect'));
   o._styleButtonText   = RClass.register(o, new AStyle('_styleButtonText'));
   o._styleButton       = RClass.register(o, new AStyle('_styleButton'));
   o._styleButtonHover  = RClass.register(o, new AStyle('_styleButtonHover'));
   o._styleButtonSelect = RClass.register(o, new AStyle('_styleButtonSelect'));
   o._styleDataPanel    = RClass.register(o, new AStyle('_styleDataPanel'));
   o._top               = 0;
   o._pages             = null;
   o._index             = null;
   o._selected          = false;
   o._hasBuilded        = false;
   o.lsnsSelect         = null;
   o._hTopL             = null;
   o._hTop              = null;
   o._hTopR             = null;
   o._hLeft             = null;
   o._hButton           = null;
   o._hIcon             = null;
   o._hText             = null;
   o._hBottomL          = null;
   o._hBottom           = null;
   o._hBottomR          = null;
   o._hRight            = null;
   o.onBuildPanel       = FUiPageSheet_onBuildPanel;
   o.onButtonEnter      = RClass.register(o, new AEventMouseEnter('onButtonEnter'), FUiPageSheet_onButtonEnter);
   o.onButtonLeave      = RClass.register(o, new AEventMouseLeave('onButtonLeave'), FUiPageSheet_onButtonLeave);
   o.onHeadMouseDown    = RClass.register(o, new AEventMouseDown('onHeadMouseDown'), FUiPageSheet_onHeadMouseDown);
   o.construct          = FUiPageSheet_construct;
   o.innerSelect        = FUiPageSheet_innerSelect;
   o.select             = FUiPageSheet_select;
   o.setVisible         = FUiPageSheet_setVisible;
   o.dispose            = FUiPageSheet_dispose
   o.innerDump          = FUiPageSheet_innerDump;
   return o;
}
function FUiPageSheet_onBuildPanel(p){
   var o = this;
   var hp = o._hContainer = o._hPanel = RBuilder.createDiv(p);
   hp.width = '100%';
   hp.height = '100%';
   var hf = o._hPanelForm = RBuilder.appendTable(hp);
   hf.width = '100%';
   hf.height = '100%';
}
function FUiPageSheet_onButtonEnter(p){
   var o = this;
   if(!o._selected){
      o._hButton.className = o.styleName('ButtonHover');
   }
}
function FUiPageSheet_onButtonLeave(p){
   var o = this;
   if(!o._selected){
      o._hButton.className = o.styleName('Button');
   }
}
function FUiPageSheet_onHeadMouseDown(p){
   var o = this;
   o._parent.select(o);
}
function FUiPageSheet_construct(){
   var o = this;
   o.__base.FUiPanel.construct.call(o);
   o.lsnsSelect = new TListeners();
}
function FUiPageSheet_innerSelect(p){
   var o = this;
   var b = o._parent;
   if(p && !o._hasBuilded){
      o._hasBuilded = true;
   }
   var first = (o._index == 0);
   var prior = (b._activeSheet._index - 1 == o._index);
   if(o._selected != p){
      if(p){
         o.lsnsSelect.process();
      }
      o._selected = p;
   }
   o._hButton.className = p ? o.styleName('ButtonSelect') : o.styleName('Button');
   o._hTop.className = p ? o.styleName('TopSelect') : o.styleName('Top');
   o._hLeft.className = p ? o.styleName('LeftSelect') : (first ? o.styleName('Right') : o.styleName('Left'));
   o._hBottomL.className = p ? o.styleName('BottomSelect') : o.styleName('Bottom');
   o._hBottom.className = p ? o.styleName('BottomSelect') : o.styleName('Bottom');
   o._hBottomR.className = p ? o.styleName('BottomSelect') : o.styleName('Bottom');
   o._hRight.className = p ? o.styleName('RightSelect') : (prior ? o.styleName('RightPrior') : o.styleName('Right'));
   o._hForm.style.display = p ? 'block' : 'none';
}
function FUiPageSheet_select(p){
   var o = this;
   o.innerSelect(p);
   if(p){
      o.psRefresh();
      o.psResize();
   }
}
function FUiPageSheet_setVisible(p){
   var o = this;
   RHtml.displaySet(o._hForm, p);
}
function FUiPageSheet_dispose(){
   var o = this;
   RMemory.free(o._hButton);
   o._hButton = null;
   RMemory.free(o._hTop);
   o._hTop = null;
   RMemory.free(o._hLeft);
   o._hLeft = null;
   RMemory.free(o._hBottomL);
   o._hBottomL = null;
   RMemory.free(o._hBottom);
   o._hBottom = null;
   RMemory.free(o._hBottomR);
   o._hBottomR = null;
   RMemory.free(o._hRight);
   o._hRight = null;
   o.__base.FUiPanel.dispose.call(o);
}
function FUiPageSheet_innerDump(s, l){
   var o = this;
   s.append(l, RClass.dump(o), ' [');
   s.append('name=', o._name, ', ');
   s.append('icon=', o._icon, ', ');
   s.append('label=', o.label, ', ');
   s.append('action=', o.action, ']');
}
function FUiPanel(o){
   o = RClass.inherits(this, o, FUiLayout, MDesign, MFocus);
   o._sizeCd      = ESize.Horizontal;
   o._stylePanel  = RClass.register(o, new AStyle('_stylePanel', 'Panel'));
   o._styleLabel  = RClass.register(o, new AStyle('_styleLabel', 'Label'));
   o._styleBody   = RClass.register(o, new AStyle('_styleBody', 'Body'));
   o._hImage      = null;
   o._imagePlus   = 'control.panel.plus';
   o._imageMinus  = 'control.panel.minus';
   o._statusBody  = true;
   o.onBuildPanel = FUiPanel_onBuildPanel;
   o.onTitleClick = RClass.register(o, new AEventClick('onTitleClick'), FUiPanel_onTitleClick);
   return o;
}
function FUiPanel_onBuildPanel(p){
   var o = this;
   var h = o._hPanel = RBuilder.createDiv(p, o.styleName('Panel'));
   var hl = RBuilder.appendTable(h, o.styleName('Label'));
   o.attachEvent('onTitleClick', hl);
   hl.width = '100%';
   var hr = RBuilder.appendTableRow(hl);
   hr.vAlign = 'middle';
   var hri = RBuilder.appendTableCell(hr);
   hri.width = 20;
   o._hImage = RBuilder.appendIcon(hri, null, o._imageMinus);
   var hrt = RBuilder.appendTableCell(hr);
   hrt.innerHTML = o._label;
   var hb = o._hBody = RBuilder.appendDiv(h, o.styleName('Body'))
   o._hPanelForm = RBuilder.appendTable(hb, o.styleName('Form'));
}
function FUiPanel_onTitleClick(p){
   var o = this;
   var s = !o._statusBody;
   o._statusBody = s;
   o._hImage.src = RResource.iconPath(s ? o._imageMinus : o._imagePlus);
   RHtml.displaySet(o._hBody, s);
}
function SUiColorBar(o){
   if(!o){o = this;}
   o._draging      = false;
   o.control       = null;
   o.type          = null;
   o.hPanel        = null;
   o.hColor        = null;
   o.hColorImage   = null;
   o.hSlidePanel   = null;
   o.hSlideForm    = null;
   o.hInput        = null;
   o.onMouseDown   = SUiColorBar_onMouseDown;
   o.onMouseMove   = SUiColorBar_onMouseMove;
   o.onMouseUp     = SUiColorBar_onMouseUp;
   o.build         = SUiColorBar_build;
   o.setSlideValue = SUiColorBar_setSlideValue;
   o.setColorValue = SUiColorBar_setColorValue;
   o.set           = SUiColorBar_set;
   return o;
}
function SUiColorBar_onMouseDown(p){
   var o = this;
   var x = RHtml_clientX(p.hSender, o.hSlideForm) + p.offsetX;
   o._draging = true;
   RWindow.setOptionSelect(false);
   o.setSlideValue(x);
}
function SUiColorBar_onMouseMove(p){
   var o = this;
   if(o._draging){
      var x = RHtml_clientX(p.hSender, o.hSlideForm) + p.offsetX;
      o.setSlideValue(x);
   }
}
function SUiColorBar_onMouseUp(p){
   var o = this;
   o._draging = false;
   RWindow.setOptionSelect(true);
}
function SUiColorBar_build(p){
   var o = this;
   var c = o.control;
   var hcf = o.hPanel;
   var hr = o.h = RBuilder.appendTableRow(hcf);
   var hc = o.hColor = RBuilder.appendTableCell(hr);
   hc.width = 13;
   hc.style.padding = '2px';
   o.hColorImage = RBuilder.appendIcon(hc, null, 'n', 13, 13);
   var hc = o.hSlidePanel = RBuilder.appendTableCell(hr);
   hc.style.padding = '2px';
   hc.vAlign = 'middle';
   var hf = o.hSlideForm = RBuilder.appendTable(hc);
   hf.__pbar = o;
   hf.width = '100%';
   hf.style.height = '9px';
   hf.style.cursor = 'pointer';
   var hl = o.hSlideRowUp = RBuilder.appendTableRow(hf);
   hl.style.height = '3px';
   o.hSlideRowUL = RBuilder.appendTableCell(hl);
   var hc = o.hSlideRowUM = RBuilder.appendTableCell(hl);
   hc.width = 2;
   hc.bgColor = '#EEEEEE';
   var hc = o.hSlideRowUR = RBuilder.appendTableCell(hl);
   var hl = o.hSlideRow = RBuilder.appendTableRow(hf);
   hl.style.height = '3px';
   var hc = o.hSlideRowML = RBuilder.appendTableCell(hl);
   hc.bgColor = '#999999';
   var hc = o.hSlideRowMM = RBuilder.appendTableCell(hl);
   hc.width = 2;
   hc.bgColor = '#EEEEEE';
   var hc = o.hSlideRowMR = RBuilder.appendTableCell(hl);
   hc.bgColor = '#999999';
   var hl = o.hSlideRowDown = RBuilder.appendTableRow(hf);
   hl.style.height = '3px';
   o.hSlideRowBL = RBuilder.appendTableCell(hl);
   var hc = o.hSlideRowBM = RBuilder.appendTableCell(hl);
   hc.width = 2;
   hc.bgColor = '#EEEEEE';
   o.hSlideRowBR = RBuilder.appendTableCell(hl);
   c.attachEvent('onSlideMouseDown', hf, c.onSlideMouseDown);
   c.attachEvent('onSlideMouseMove', hf, c.onSlideMouseMove);
   c.attachEvent('onSlideMouseUp', hf, c.onSlideMouseUp);
   var hc = RBuilder.appendTableCell(hr);
   hc.width = '36';
   o.hInput = RBuilder.appendEdit(hc, o.control.styleName('Input'));
}
function SUiColorBar_setSlideValue(p){
   var o = this;
   var l = o.hSlideForm.offsetWidth;
   o.hSlideRowML.width = p;
   var r = p / l;
   o.hInput.value = RFloat.format(r, 0, null, 3, null);
   o.setColorValue(r);
   o.control.refreshValue();
}
function SUiColorBar_setColorValue(p){
   var o = this;
   var pv = parseInt(p * 255);
   var v = RHex.format(pv, 2);
   var c = '';
   if(o.type == 'red'){
      c = v + '0000';
   }else if(o.type == 'green'){
      c = '00' + v + '00';
   }else if(o.type == 'blue'){
      c = '0000' + v;
   }
   o.hColorImage.style.backgroundColor = '#' + c;
}
function SUiColorBar_set(p){
   var o = this;
   var pv = parseInt(p * 255);
   var r = pv / 255;
   var l = o.hSlideForm.offsetWidth;
   var d = parseInt(l * r);
   o.hSlideRowML.width = d;
   o.setColorValue(p);
   var h = o.hInput;
   if(h){
      h.value = RFloat.format(p, 0, null, 3, null);;
   }
}
