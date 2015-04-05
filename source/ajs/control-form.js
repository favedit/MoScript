var EUiSplitStyle = new function EUiSplitStyle(){
   var o = this;
   o.Normal     = 'N';
   o.BulgeLine  = 'B';
   o.HollowLine = 'H';
   return o;
}
function MUiShadow(o){
   o = RClass.inherits(this, o);
   o._hShadow   = null;
   o.show       = MUiShadow_show;
   o.hide       = MUiShadow_hide;
   o.setVisible = MUiShadow_setVisible;
   return o;
}
function MUiShadow_show(v){
   var o = this;
   if(!o._hShadow){
      o._hShadow = RBuilder.createDiv(o._hPanel, 'RWindow_Shadow');
   }
   o._hShadow.style.zIndex = RUiLayer.next();
   if(v == false){
      o.hide();
   }else{
      var hs = o.panel(EPanel.Shadow);
      if(hs){
         var s = o._hShadow.style;
         s.pixelLeft = hs.offsetLeft + 2;
         s.pixelTop = hs.offsetTop + 2;
         s.pixelWidth = hs.offsetWidth;
         s.pixelHeight = hs.offsetHeight;
         s.display = 'block';
      }
      var hp = o.panel(EPanel.Panel);
      if(hp){
         hp.style.zIndex = RUiLayer.next();
      }
   }
}
function MUiShadow_hide(){
   var o = this;
   if(o._hShadow){
      o._hShadow.style.display = 'none';
   }
}
function MUiShadow_setVisible(p){
   var o = this;
   if(p){
      if(!o._hShadow){
         o._hShadow = RBuilder.createDiv(o._hPanel, 'RWindow_Shadow');
      }
      o._hShadow.style.zIndex = RUiLayer.next();
      var hs = o.panel(EPanel.Shadow);
      if(hs){
         var r = RHtml.rect(hs);
         var s = o._hShadow.style;
         s.pixelLeft = r.left + 2;
         s.pixelTop = r.top + 2;
         s.pixelWidth = r.width();
         s.pixelHeight = r.height();
         s.display = 'block';
      }
      var hp = o.panel(EPanel.Panel);
      if(hp){
         hp.style.zIndex = RUiLayer.next();
      }
   }else{
      if(o._hShadow){
         o._hShadow.style.display = 'none';
      }
   }
}
function SUiColorBar(){
   var o = this;
   o._draging          = false;
   o.control           = null;
   o.typeCd            = null;
   o.minValue          = 0;
   o.maxValue          = 1;
   o.hPanel            = null;
   o.hColorPanel       = null;
   o.hColorImage       = null;
   o.hSlidePanel       = null;
   o.hSlideForm        = null;
   o.hSlideRowUL       = null;
   o.hSlideRowUM       = null;
   o.hSlideRowUR       = null;
   o.hSlideRowML       = null;
   o.hSlideRowMM       = null;
   o.hSlideRowMR       = null;
   o.hSlideRowBL       = null;
   o.hSlideRowBM       = null;
   o.hSlideRowBR       = null;
   o.hInputPanel       = null;
   o.hInput            = null;
   o.onMouseDown       = SUiColorBar_onMouseDown;
   o.onMouseMove       = SUiColorBar_onMouseMove;
   o.onMouseUp         = SUiColorBar_onMouseUp;
   o.build             = SUiColorBar_build;
   o.setRange          = SUiColorBar_setRange;
   o.setColorValue     = SUiColorBar_setColorValue;
   o.setSlideValue     = SUiColorBar_setSlideValue;
   o.setInputValue     = SUiColorBar_setInputValue;
   o.convertSlide      = SUiColorBar_convertSlide;
   o.convertGet        = SUiColorBar_convertGet;
   o.convertSet        = SUiColorBar_convertSet;
   o.get               = SUiColorBar_get;
   o.set               = SUiColorBar_set;
   o.changeSlide       = SUiColorBar_changeSlide;
   o.changeInputEdit   = SUiColorBar_changeInputEdit;
   o.changeInputChange = SUiColorBar_changeInputChange;
   return o;
}
function SUiColorBar_onMouseDown(p){
   var o = this;
   var x = RHtml.clientX(p.hSource, o.hSlideForm) + p.offsetX;
   o._draging = true;
   RWindow.setOptionSelect(false);
   o.changeSlide(x);
}
function SUiColorBar_onMouseMove(p){
   var o = this;
   if(o._draging){
      var x = RHtml.clientX(p.hSource, o.hSlideForm) + p.offsetX;
      o.changeSlide(x);
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
   var hr = RBuilder.appendTableRow(hcf);
   var hc = o.hColorPanel = RBuilder.appendTableCell(hr);
   hc.width = 13;
   hc.style.padding = '2px';
   o.hColorImage = RBuilder.appendIcon(hc, null, 'n', 11, 11);
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
   var hc = o.hInputPanel = RBuilder.appendTableCell(hr, o.control.styleName('InputPanel'));
   hc.width = 36;
   var he = o.hInput = RBuilder.appendEdit(hc, o.control.styleName('Input'));
   he._pbar = o;
   c.attachEvent('onInputKeyPress', he, c.onInputKeyPress);
   c.attachEvent('onInputEdit', he, c.onInputEdit);
   c.attachEvent('onInputChange', he, c.onInputChange);
}
function SUiColorBar_setRange(i, a){
   var o = this;
   if(i != null){
      o.minValue = i;
   }
   if(a != null){
      o.maxValue = a;
   }
}
function SUiColorBar_setColorValue(p){
   var o = this;
   var v = RHex.format(p, 2);
   var c = null;
   switch(o.typeCd){
      case 'red':
         c = v + '0000';
         break;
      case 'green':
         c = '00' + v + '00';
         break;
      case 'blue':
         c = '0000' + v;
         break;
      default:
         throw new TError(o, 'Invalid type.');
   }
   o.hColorImage.style.backgroundColor = '#' + c;
}
function SUiColorBar_setSlideValue(p){
   var o = this;
   var w = o.hSlideForm.offsetWidth;
   if(w > 0){
      var v = p / o.maxValue * w;
      o.hSlideRowML.width = RInteger.toRange(v, 1, w - 1);
   }
}
function SUiColorBar_setInputValue(p){
   this.hInput.value = p;
}
function SUiColorBar_convertGet(p){
   return p;
}
function SUiColorBar_get(){
   var o = this;
   return o.convertGet(o.hInput.value);
}
function SUiColorBar_convertSet(p){
   return p;
}
function SUiColorBar_set(p){
   var o = this;
   var v = o.convertSet(p);
   o.setColorValue(v);
   o.setSlideValue(v);
   o.setInputValue(v);
}
function SUiColorBar_convertSlide(p){
   return p;
}
function SUiColorBar_changeSlide(p){
   var o = this;
   var w = o.hSlideForm.offsetWidth - 3;
   var v = o.convertSlide(p / w);
   o.set(v);
   o.control.refreshValue();
}
function SUiColorBar_changeInputEdit(){
   var o = this;
   var v = o.convertGet(o.hInput.value);
   o.setColorValue(v);
   o.setSlideValue(v);
   o.control.refreshValue();
}
function SUiColorBar_changeInputChange(){
   var o = this;
   var v = o.convertGet(o.hInput.value);
   o.set(v);
   o.control.refreshValue();
}
function SUiColorChannel(){
   var o = this;
   SUiColorBar.call(o);
   o.minValue      = 0;
   o.maxValue      = 255;
   o.setInputValue = SUiColorChannel_setInputValue;
   o.convertGet    = SUiColorChannel_convertGet;
   o.convertSet    = SUiColorChannel_convertSet;
   return o;
}
function SUiColorChannel_setInputValue(p){
   var o = this;
   var v = RInteger.toRange(p, o.minValue, o.maxValue);
   var t = RInteger.format(v);
   var h = o.hInput;
   if(h.value != t){
      h.value = t;
   }
}
function SUiColorChannel_convertGet(p){
   var o = this;
   var v = RInteger.parse(RString.nvl(p, '0'));
   return RInteger.toRange(v, o.minValue, o.maxValue) / 255;
}
function SUiColorChannel_convertSet(p){
   return parseInt(p * 255);
}
function SUiColorPower(){
   var o = this;
   SUiColorBar.call(o);
   o.minValue      = 0;
   o.maxValue      = 4;
   o.setColorValue = SUiColorPower_setColorValue;
   o.setSlideValue = SUiColorPower_setSlideValue;
   o.setInputValue = SUiColorPower_setInputValue;
   o.convertGet    = SUiColorPower_convertGet;
   o.convertSet    = SUiColorPower_convertSet;
   o.convertSlide  = SUiColorPower_convertSlide;
   return o;
}
function SUiColorPower_setColorValue(p){
   var o = this;
   var v = RInteger.toRange(parseInt(p * 255), 0, 255);
   var s = RHex.format(v, 2);
   o.hColorImage.style.backgroundColor = '#' + s + s + s;
}
function SUiColorPower_setSlideValue(p){
   var o = this;
   var w = o.hSlideForm.offsetWidth;
   if(w > 0){
      var v = p / o.maxValue * w;
      o.hSlideRowML.width = RInteger.toRange(v, 1, w - 1);
   }
}
function SUiColorPower_setInputValue(p){
   var o = this;
   var h = o.hInput;
   var v = RFloat.toRange(p, o.minValue, o.maxValue);
   var t = RFloat.format(v, 0, null, 2, null);
   if(h.value != t){
      h.value = t;
   }
}
function SUiColorPower_convertGet(p){
   return RFloat.parse(p);
}
function SUiColorPower_convertSet(p){
   return p;
}
function SUiColorPower_convertSlide(p){
   return p * this.maxValue;
}
function SUiSlide(){
   var o = this;
   o._draging      = false;
   o.control       = null;
   o.stepValue     = 1;
   o.minValue      = 0;
   o.maxValue      = 100;
   o.range         = 100;
   o.hPanel        = null;
   o.hSlidePanel   = null;
   o.hSlideForm    = null;
   o.hSlideU       = null;
   o.hSlideUL      = null;
   o.hSlideUM      = null;
   o.hSlideUR      = null;
   o.hSlideM       = null;
   o.hSlideML      = null;
   o.hSlideMM      = null;
   o.hSlideMR      = null;
   o.hSlideB       = null;
   o.hSlideBL      = null;
   o.hSlideBM      = null;
   o.hSlideBR      = null;
   o.onMouseDown   = SUiSlide_onMouseDown;
   o.onMouseMove   = SUiSlide_onMouseMove;
   o.onMouseUp     = SUiSlide_onMouseUp;
   o.onSlideChange = RMethod.empty;
   o.build          = SUiSlide_build;
   o.setRange       = SUiSlide_setRange;
   o.setSlideValue  = SUiSlide_setSlideValue;
   o.get            = SUiSlide_get;
   o.set            = SUiSlide_set;
   o.changeSlide    = SUiSlide_changeSlide;
   return o;
}
function SUiSlide_onMouseDown(p){
   var o = this;
   var x = RHtml.clientX(p.hSource, o.hSlideForm) + p.offsetX;
   o._draging = true;
   RWindow.setOptionSelect(false);
   o.changeSlide(x);
}
function SUiSlide_onMouseMove(p){
   var o = this;
   if(o._draging){
      var x = RHtml.clientX(p.hSource, o.hSlideForm) + p.offsetX;
      o.changeSlide(x);
   }
}
function SUiSlide_onMouseUp(p){
   var o = this;
   o._draging = false;
   RWindow.setOptionSelect(true);
}
function SUiSlide_build(p){
   var o = this;
   var c = o.control;
   var hf = o.hSlideForm = RBuilder.appendTable(o.hPanel);
   hf.__pcapture = o;
   hf.width = '100%';
   hf.style.height = '9px';
   hf.style.cursor = 'pointer';
   var hl = o.hSlideU = RBuilder.appendTableRow(hf);
   hl.style.height = '3px';
   o.hSlideUL = RBuilder.appendTableCell(hl);
   var hc = o.hSlideUM = RBuilder.appendTableCell(hl);
   hc.width = 2;
   hc.bgColor = '#EEEEEE';
   var hc = o.hSlideUR = RBuilder.appendTableCell(hl);
   var hl = o.hSlideM = RBuilder.appendTableRow(hf);
   hl.style.height = '3px';
   var hc = o.hSlideML = RBuilder.appendTableCell(hl);
   hc.bgColor = '#999999';
   var hc = o.hSlideMM = RBuilder.appendTableCell(hl);
   hc.width = 2;
   hc.bgColor = '#EEEEEE';
   var hc = o.hSlideMR = RBuilder.appendTableCell(hl);
   hc.bgColor = '#999999';
   var hl = o.hSlideB = RBuilder.appendTableRow(hf);
   hl.style.height = '3px';
   o.hSlideBL = RBuilder.appendTableCell(hl);
   var hc = o.hSlideBM = RBuilder.appendTableCell(hl);
   hc.width = 2;
   hc.bgColor = '#EEEEEE';
   o.hSlideBR = RBuilder.appendTableCell(hl);
}
function SUiSlide_setRange(i, a){
   var o = this;
   if(i != null){
      o.minValue = RFloat.parse(i);
   }
   if(a != null){
      o.maxValue = RFloat.parse(a);
   }
   o.range = o.maxValue - o.minValue;
}
function SUiSlide_setSlideValue(p){
   var o = this;
   var w = o.hSlideForm.offsetWidth;
   if(w > 0){
      var v = (p - o.minValue) / o.range * w;
      o.hSlideML.width = RInteger.toRange(v, 1, w - 1);
   }
}
function SUiSlide_get(){
   var o = this;
   var w = o.hSlideForm.offsetWidth - 3;
   var v = (p / w) * o.range + o.minValue;
   return v;
}
function SUiSlide_set(p){
   var o = this;
   o.setSlideValue(p);
}
function SUiSlide_changeSlide(p){
   var o = this;
   var c = o.control;
   var w = o.hSlideForm.offsetWidth - 3;
   o.hSlideML.width = RInteger.toRange(p, 1, w - 1);
   var v = (p / w) * o.range + o.minValue;
   v = RFloat.toRange(v, o.minValue, o.maxValue);
   o.onSlideChange.call(c, v);
}
function FUiButton(o){
   o = RClass.inherits(this, o, FUiControl, MListenerClick);
   o._labelPositionCd   = RClass.register(o, new APtyString('_labelPositionCd'), EUiPosition.Left);
   o._icon              = RClass.register(o, new APtyString('_icon'));
   o._action            = RClass.register(o, new APtyString('_action'));
   o._stylePanel        = RClass.register(o, new AStyle('_stylePanel'));
   o._styleForm         = RClass.register(o, new AStyle('_styleForm'));
   o._styleIcon         = RClass.register(o, new AStyle('_styleIcon'));
   o._styleLabel        = RClass.register(o, new AStyle('_styleLabel'));
   o._styleIconPanel    = RClass.register(o, new AStyleIcon('_styleIconPanel'));
   o._hForm             = null;
   o._hLeftButton       = null;
   o._hMiddleButton     = null;
   o._hRightButton      = null;
   o._hLabelPanel       = null;
   o._hLabel            = null;
   o.onBuild            = FUiButton_onBuild;
   o.onClick            = RClass.register(o, new AEventClick('onClick'), FUiButton_onClick);
   o.doClick            = FUiButton_doClick;
   return o;
}
function FUiButton_onBuild(e){
   var o = this;
   o.__base.FUiControl.onBuild.call(o, e);
   var hPanel = o._hPanel;
   o.attachEvent('onClick', hPanel);
   var hForm = RBuilder.appendTable(hPanel, o.styleName('Form'));
   var hLine  = RBuilder.appendTableRow(hForm);
   if(o._icon){
      var hCell = RBuilder.appendTableCell(hLine);
      hCell.width = 16;
      o._hIcon = RBuilder.appendIcon(hCell, o.styleName('Icon'), o._icon);
   }
   if(o.label){
      var hCell = RBuilder.appendTableCell(hLine);
      hCell.align = 'center';
      hCell.noWrap = true;
      o._hLabel = RBuilder.appendText(hCell, o.styleName('Label'), o._label);
   }
}
function FUiButton_onButtonEnter(e){
   var o = this;
   if(!o._disabled){
	  o._hLeftButton.background = o.styleIconPath('HoverLeft');
	  o._hMiddleButton.background = o.styleIconPath('HoverMiddle');
	  o._hRightButton.background = o.styleIconPath('HoverRight');
   }
}
function FUiButton_onButtonLeave(e){
   var o = this;
   if(!o._disabled){
	  o._hLeftButton.background = o.styleIconPath('ButtonLeft');
	  o._hMiddleButton.background = o.styleIconPath('Button');
	  o._hRightButton.background = o.styleIconPath('ButtonRight');
   }
}
function FUiButton_onButtonDown(e){
   var o = this;
   if(!o._disabled){
	  o._hLeftButton.background = o.styleIconPath('PressLeft');
	  o._hMiddleButton.background = o.styleIconPath('PressMiddle');
	  o._hRightButton.background = o.styleIconPath('PressRight');
   }
}
function FUiButton_onButtonUp(e){
   var o = this;
   if(!o._disabled){
	  o._hLeftButton.background = o.styleIconPath('ButtonLeft');
	  o._hMiddleButton.background = o.styleIconPath('Button');
	  o._hRightButton.background = o.styleIconPath('ButtonRight');
   }
}
function FUiButton_onButtonClickDelay(e){
   var o = this;
   o.__process = false;
   o.clickActive.status = EActive.Sleep;
}
function FUiButton_onClick(e){
   this.doClick();
}
function FUiButton_onButtonClick(e){
   this.doClick();
}
function FUiButton_oeMode(e){
   var o = this;
   o.__base.FUiControl.oeMode.call(o, e);
   o.__base.MDisplay.oeMode.call(o, e);
   return EEventStatus.Stop;
}
function FUiButton_setLabel(v){
   var o = this;
   o.label = v;
   o._hLabel.innerText = v;
   o._hLabel.noWrap = true;
}
function FUiButton_setLabelColor(c){
   var o = this;
   o._hLabel.style.color = '#FF0000';
}
function FUiButton_setLabelStyle(c, w, s){
   var o = this;
   o._hLabel.style.color = '#FF0000';
   o._hLabel.style.fontWeight = 'bold';
   o._hLabel.style.fontSize = '12';
}
function FUiButton_doClick(){
   var o = this;
   if(!o._disabled){
      RConsole.find(FFocusConsole).blur();
      RLogger.debug(o, 'Tool button click. (label={1})' + o._label);
      var event = new SClickEvent(o);
      o.processClickListener(event);
      event.dispose();
      if(o._action){
         eval(o._action);
      }
   }
}
function FUiButton_dispose(){
   var o = this;
   o.__base.FUiControl.dispose.call(o);
   o._hForm = null;
   o._hFormEnd = null;
   o._hLabel = null;
}
function FUiCalendar(o){
   o = RClass.inherits(this, o, FEditControl, MEditBorder, MDropable, MDescCalendar);
   o.editFormat  = RDate.DisplayFormat;
   o.editHour     = RClass.register(o, new TPtyBoolSet('editHour', 'editDate', EDateTimeMode.Hour));
   o.editMinute   = RClass.register(o, new TPtyBoolSet('editMinute', 'editDate', EDateTimeMode.Minute));
   o.editSecond   = RClass.register(o, new TPtyBoolSet('editSecond', 'editDate', EDateTimeMode.Second));
   o.borderStyle = EUiBorder.RoundDrop;
   o.date        = null;
   o.lsnEditEnd  = null;
   o.hForm       = null;
   o.hDrop       = null;
   o.hForm       = null;
   o.onKeyPress  = FUiCalendar_onKeyPress;
   o.onDataClick   = FUiCalendar_onDataClick;
   o.refreshStyle  = FUiCalendar_refreshStyle;
   o.onEditEnd   = FUiCalendar_onEditEnd;
   o.onBuildEdit = FUiCalendar_onBuildEdit;
   o.construct   = FUiCalendar_construct;
   o.formatValue = FUiCalendar_formatValue;
   o.formatText  = FUiCalendar_formatText;
   o.drop        = FUiCalendar_drop;
   o.doBlur      = FUiCalendar_doBlur;
   return o;
}
function FUiCalendar_onDataClick(){
   var o = this;
   if(!o.editCheck){
      o.drop();
   }
}
function FUiCalendar_onBuildEdit(b){
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
function FUiCalendar_onEditEnd(e){
   var o = this;
   if(e){
      o.set(e.get());
      o._invalidText = o.validText(o.text());
      o.refreshStyle();
   }
   o.onDataEditEnd(o);
}
function FUiCalendar_onKeyPress(e){
   if(!RString.inChars(String.fromCharCode(e.keyCode), RDate.Chars)){
      RKey.eventClear(e);
   }
}
function FUiCalendar_construct(){
   var o = this;
   o.base.FEditControl.construct.call(o);
   o.date = new TDate();
   o.lsnEditEnd = new TListener(o, o.onEditEnd);
}
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
function FUiCalendar_formatText(value){
   if(value){
      var o = this;
      RDate.autoParse(o.date, value);
      return RDate.formatDate(o.date, o.editFormat);
   }
   return RString.nvl(value);
}
function FUiCalendar_refreshStyle(){
   var o = this;
   o.base.FEditControl.refreshStyle.call(o);
   if(!o.editCheck){
      o.hEdit.readOnly = 'true';
   }
}
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
function FUiCalendar_doBlur(){
   var o = this;
   o.base.FEditControl.doBlur.call(o);
   if(o.editor){
      o.editor.hide();
   }
}
function FUiCalendarEditor(o){
   o = RClass.inherits(this, o, FDropEditor, MUiFocusLooper);
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
   o.onDaySelect      = RClass.register(o, new HMouseDown('onDaySelect'), FUiCalendarEditor_onDaySelect);
   o.onButtonNow      = RClass.register(o, new HMouseDown('onButtonNow'), FUiCalendarEditor_onButtonNow);
   o.onDateKeyDown    = RClass.register(o, new HKeyDown('onDateKeyDown'), FUiCalendarEditor_onDateKeyDown);
   o.onDateBlur       = RClass.register(o, new HBlur('onDateBlur'), FUiCalendarEditor_onDateBlur);
   o.onTimeBlur       = RClass.register(o, new HBlur('onTimeBlur'), FUiCalendarEditor_onTimeBlur);
   o.onTimeClick      = RClass.register(o, new HClick('onTimeClick'), FUiCalendarEditor_onTimeClick);
   o.onDayDbClick     = RClass.register(o, new HDoubleClick('onDayDbClick'), FUiCalendarEditor_onDayDbClick);
   o.onDayEnter       = RClass.register(o, new HMouseEnter('onDayEnter'),    FUiCalendarEditor_onDayEnter);
   o.onDayOut         = RClass.register(o, new HMouseOut('onDayOut'),        FUiCalendarEditor_onDayOut);
   o.onButtonOk       = RClass.register(o, new HMouseDown('onButtonOk'),     FUiCalendarEditor_onButtonOk);
   o.onButtonCancel   = RClass.register(o, new HMouseDown('onButtonCancel'), FUiCalendarEditor_onButtonCancel);
   o.onButtonOver     = RClass.register(o, new HMouseEnter('onButtonOver'),  FUiCalendarEditor_onButtonOver);
   o.onButtonOut      = RClass.register(o, new HMouseOut('onButtonOut'),     FUiCalendarEditor_onButtonOut);
   o.onMdown          = RClass.register(o, new HMouseDown('onMdown'),        FUiCalendarEditor_onMdown);
   o.onMup            = RClass.register(o, new HMouseUp('onMup'),            FUiCalendarEditor_onMup);
   o.onBuildDrop      = FUiCalendarEditor_onBuildDrop;
   o.show             = FUiCalendarEditor_show;
   o.setMinuteEditable = FUiCalendarEditor_setMinuteEditable;
   o.setHourEditable   = FUiCalendarEditor_setHourEditable;
   o.setSecondEditable = FUiCalendarEditor_setSecondEditable;
   o.buildTitle       = FUiCalendarEditor_buildTitle;
   o.buildDays        = FUiCalendarEditor_buildDays;
   o.buildTime        = FUiCalendarEditor_buildTime;
   o.testBlur         = FUiCalendarEditor_testBlur;
   o.get              = FUiCalendarEditor_get;
   o.set              = FUiCalendarEditor_set;
   o.setDate          = FUiCalendarEditor_setDate;
   o.storeChange      = FUiCalendarEditor_storeChange;
   o.daySelectLsns    = new TListeners();
   o.onBuildButton    = FUiCalendarEditor_onBuildButton;
   o.ohKdown          = FUiCalendarEditor_ohKdown;
   o.ohDaysChange     = FUiCalendarEditor_ohDaysChange;
   o.ohKeyCheck       = FUiCalendarEditor_ohKeyCheck;
   o.onDateAction     = FUiCalendarEditor_onDateAction;
   o.panel            = FUiCalendarEditor_panel;
   o.dispose          = FUiCalendarEditor_dispose;
   return o;
}
function FUiCalendarEditor_onTimeClick(e){
   var o = this;
   var h = e.hSource;
   if(h.editAble){
      h.select();
   }
}
function FUiCalendarEditor_onTimeBlur(e){
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
function FUiCalendarEditor_onDayDbClick(e){
   var o = e.source
   if(RClass.isClass(o, FUiCalendarEditor) && 0 != RInteger.parse(e.hSource.innerText)){
      o.date.setDay(e.hSource.innerText);
      o.dataValue = RDate.formatDate(o.date);
      o.editEnd();
   }
}
function FUiCalendarEditor_onDaySelect(e){
   var o = this;
   if(RClass.isClass(o, FUiCalendarEditor) && 0 != RInteger.parse(e.hSource.innerText)){
	  var h = e.hSource;
	  if(o.hSelect){
		  o.hSelect.style.border = '1 solid #FFFFFF';
	  };
	  o.hSelect = h;
	  h.style.border = '1 solid #2BD6F0';
      o.date.setDay(h.innerText);
   }
}
function FUiCalendarEditor_onButtonNow(e){
   var o = e.source;
   if(RClass.isClass(o, FUiCalendarEditor)){
      o.dataValue = RDate.format();
      o.editEnd();
   }
}
function FUiCalendarEditor_onDateKeyDown(e, he){
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
function FUiCalendarEditor_onDateBlur(){
   var o = this;
   o.storeChange();
   o.setDate(o.date);
}
function FUiCalendarEditor_onBuildDrop(){
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
function FUiCalendarEditor_show(v){
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
function FUiCalendarEditor_buildTitle(){
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
   hCel.innerText = RContext.get('FUiCalendarEditor:year');
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
   hCel.innerText = RContext.get('FUiCalendarEditor:month');
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
function FUiCalendarEditor_buildDays(){
   var o = this;
   var hTab = RBuilder.appendTable(o.hDaysPanel, null, 0, 0, 1);
   hTab.width = '100%';
   var weekDays = RContext.get('FUiCalendarEditor:weekdays').split(',');
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
function FUiCalendarEditor_buildTime(){
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
   hNow.innerText = RContext.get('FUiCalendarEditor:now');
   hNow.style.display = 'none';
   hNow.link = o;
   o.attachEvent("onButtonNow", hNow);
   var hc = hRow.insertCell();
   var hCl = o.hCancel = RBuilder.append(hc, 'SPAN', o.style('Ok'));
   hCl.style.width = 50;
   hc.style.border='1 solid #2BD6F0';
   hCl.link = o;
   o.attachEvent("onButtonCancel", hCl);
   hCl.innerText = RContext.get('FUiCalendarEditor:cancel');
   var ho = hRow.insertCell();
   var hOk = o.hOk = RBuilder.append(ho, 'SPAN', o.style('Ok'));
   hOk.style.width = 50;
   ho.style.border='1 solid #2BD6F0';
   hOk.link = o;
   o.attachEvent("onButtonOk", hOk);
   hOk.innerText = RContext.get('FUiCalendarEditor:ok');
}
function FUiCalendarEditor_testBlur(c){
   return this.source != c;
}
function FUiCalendarEditor_get(){
   return this.dataValue;
}
function FUiCalendarEditor_set(value, format){
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
function FUiCalendarEditor_setDate(date){
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
function FUiCalendarEditor_setHourEditable(v){
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
function FUiCalendarEditor_setMinuteEditable(v){
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
function FUiCalendarEditor_setSecondEditable(v){
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
function FUiCalendarEditor_storeChange(){
   var o = this;
   o.date.setYear(o.hYear.value);
   o.date.setMonth(o.hMonth.value);
   o.date.setHour(Math.min(RInteger.parse(o.hHour.value), 23));
   o.date.setMinute(Math.min(RInteger.parse(o.hMinute.value), 59));
   o.date.setSecond(Math.min(RInteger.parse(o.hSecond.value), 59));
}
function FUiCalendarEditor_onBuildButton(){
   var o = this;
   return;
   o.base.FDropEditor.onBuildButton.call(o);
   var h = o.hNow = RBuilder.append(o.hButtonPanel, 'SPAN', o.style('Now'));
   var hp = o.hButtonPanel;
   hp.style.filter = "progid:DXImageTransform.Microsoft.Gradient(startColorStr='#FFFFFF', endColorStr='#E5FAFE', gradientType='0')";
   hp.height = 20;
   h.innerText = RContext.get('FUiCalendarEditor:now');
   o.attachEvent("onButtonNow",h);
}
function FUiCalendarEditor_onMdown(e){
   var o = e.source;
   if(RClass.isClass(o, FUiCalendarEditor)){
      o.isSkipBlur = true;
      if(e.hSource.linkAction){
         e.hSource.linkAction.call(o, e.hSource);
      }
   }
}
function FUiCalendarEditor_onMup(e){
   var o = e.source;
   if(RClass.isClass(o, FUiCalendarEditor)){
      var f = o.focusObject;
      if(f && f.focus && f.select){
         f.focus();
         f.select();
      }
   }
}
function FUiCalendarEditor_ohKdown(){
   var o = this.link;
   if(RClass.isClass(o, FUiCalendarEditor)){
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
function FUiCalendarEditor_onButtonOver(e){
   var o = e.source;
   if(RClass.isClass(o, FUiCalendarEditor)){
      e.hSource.className = o.style('ButtonHover');
   }
}
function FUiCalendarEditor_onButtonOut(e){
   var o = e.source;
   if(RClass.isClass(o, FUiCalendarEditor)){
      e.hSource.className = o.style('Button');
   }
}
function FUiCalendarEditor_onButtonOk(e){
   var o = e.source;
   if(RClass.isClass(o, FUiCalendarEditor)){
      o.editStatus = EEditStatus.Ok;
      o.dataValue = RDate.formatDate(o.date);
      o.editEnd();
   }
}
function FUiCalendarEditor_onButtonCancel(e) {
   var o = e.source;
   if(RClass.isClass(o, FUiCalendarEditor)){
	 o.editStatus = EEditStatus.Cancel;
     o.dataValue = '';
     o.editEnd();
   }
}
function FUiCalendarEditor_ohDaysChange(){
   var o = this.link;
   if(RClass.isClass(o, FUiCalendarEditor)){
      o.date.setYear(o.hYear.value);
      o.date.setMonth(o.hMonth.value);
      o.setDate(o.date);
   }
}
function FUiCalendarEditor_ohKeyCheck(){
   var e = RWindow.event(this)
   if(!RString.inChars(String.fromCharCode(e.keyCode), RDate.Chars)){
      e.keyCode = 0;
   }
}
function FUiCalendarEditor_onDayEnter(e){
   var o = e.source;
   if(RClass.isClass(o, FUiCalendarEditor) && e.hSource.innerText != '.'){
      if(!e.hSource.isCurrent){
         e.hSource.className = o.style('DayHover');
      }
   }
}
function FUiCalendarEditor_onDayOut(e){
   var o = e.source;
   if(RClass.isClass(o, FUiCalendarEditor) && e.hSource.innerText != '.'){
      if(!e.hSource.isCurrent){
         e.hSource.className = e.hSource.isFree ? o.style('DayFree') : o.style('Day');
      }
   }
}
function FUiCalendarEditor_onDateAction(h){
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
function FUiCalendarEditor_panel(type){
   var o = this;
   if(EPanel.Shadow == type){
      return o.hPanel;
   }
   return o.base.FDropEditor.panel.call(o, type);
}
function FUiCalendarEditor_dispose(){
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
function FUiCheck(o){
   o = RClass.inherits(this, o, FUiEditControl, MPropertyCheck, MListenerDataChanged);
   o._styleInput      = RClass.register(o, new AStyle('_styleInput'));
   o._hInput          = null;
   o.onBuildEditValue = FUiCheck_onBuildEditValue;
   o.onInputClick     = RClass.register(o, new AEventClick('onInputClick'), FUiCheck_onInputClick);
   o.oeSaveValue      = FUiCheck_oeSaveValue;
   o.construct        = FUiCheck_construct;
   o.formatLoad       = FUiCheck_formatLoad;
   o.formatSave       = FUiCheck_formatSave;
   o.get              = FUiCheck_get;
   o.set              = FUiCheck_set;
   o.refreshValue     = FUiCheck_refreshValue;
   o.refreshStyle     = FUiCheck_refreshStyle;
   return o;
}
function FUiCheck_onBuildEditValue(p){
   var o = this;
   var h = o._hInput = RBuilder.appendCheck(o._hValuePanel, o.styleName('Input'));
   o.attachEvent('onInputClick', h);
}
function FUiCheck_onInputClick(p){
   this.refreshValue();
}
function FUiCheck_oeSaveValue(e){
   var o = this;
   if(EStore.Prepare == e.store){
      if(RBoolean.isTrue(o.reget())){
         e.values.set(o.dataName, EBoolean.True);
      }
      return EEventStatus.Stop;
   }
   return o.base.FUiEditControl.oeSaveValue.call(o, e);
}
function FUiCheck_construct(){
   var o = this;
   o.__base.FUiEditControl.construct.call(o);
   o._editSize.set(60, 20);
}
function FUiCheck_formatLoad(value){
   var o = this;
   return (value == o._valueTrue);
}
function FUiCheck_formatSave(value){
   var o = this;
   return RBoolean.toString(value, o._valueTrue, o._valueFalse);
}
function FUiCheck_get(){
   return this._hInput.checked;
}
function FUiCheck_set(value){
   this._hInput.checked = value;
}
function FUiCheck_refreshValue(){
   var o = this;
   o.processDataChangedListener(o);
}
function FUiCheck_refreshStyle(){
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
   o.borderStyle      = EUiBorder.RoundDrop;
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
function FColorPicker(o){
   o = RClass.inherits(this, o, FEditControl, MEditBorder, MDescColor, MDropable);
   o.borderStyle = EUiBorder.RoundDrop;
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
function FUiColorPower(o){
   o = RClass.inherits(this, o, FUiEditControl, MListenerDataChanged, MMouseCapture);
   o._inputSize          = RClass.register(o, new APtySize2('_inputSize'));
   o._valueMin           = RClass.register(o, new APtyNumber('_valueMin'));
   o._valueMax           = RClass.register(o, new APtyNumber('_valueMax'));
   o._styleValuePanel    = RClass.register(o, new AStyle('_styleValuePanel'));
   o._styleInputPanel    = RClass.register(o, new AStyle('_styleInputPanel'));
   o._styleInput         = RClass.register(o, new AStyle('_styleInput'));
   o._innerOriginValue   = null;
   o._innerDataValue     = null;
   o._barRed             = null;
   o._barGreen           = null;
   o._barBlue            = null;
   o._barPower           = null;
   o._hColorPanel        = null;
   o._hColorImage        = null;
   o._hChannelPanel      = null;
   o._hChannelForm       = null;
   o.onBuildEditValue    = FUiColorPower_onBuildEditValue;
   o.onMouseCaptureStart = FUiColorPower_onMouseCaptureStart;
   o.onMouseCapture      = FUiColorPower_onMouseCapture;
   o.onMouseCaptureStop  = FUiColorPower_onMouseCaptureStop;
   o.onInputKeyPress     = RClass.register(o, new AEventKeyPress('onInputKeyPress'), FUiColorPower_onInputKeyPress);
   o.onInputEdit         = RClass.register(o, new AEventInputChanged('onInputEdit'), FUiColorPower_onInputEdit);
   o.onInputChange       = RClass.register(o, new AEventChange('onInputChange'), FUiColorPower_onInputChange);
   o.construct           = FUiColorPower_construct;
   o.get                 = FUiColorPower_get;
   o.set                 = FUiColorPower_set;
   o.setDisplayColor     = FUiColorPower_setDisplayColor;
   o.setDisplay          = FUiColorPower_setDisplay;
   o.refreshValue        = FUiColorPower_refreshValue;
   o.dispose             = FUiColorPower_dispose;
   return o;
}
function FUiColorPower_onBuildEditValue(p){
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
   o._hColorImage = RBuilder.appendIcon(hcp, null, 'n', 14, 65);
   var hcp = o._hChannelPanel = RBuilder.appendTableCell(hl);
   var hcf = o._hChannelForm = RBuilder.appendTable(hcp, null, 0, 1, 0);
   hcf.__linker = o;
   hcf.width = '100%';
   var b = o._barRed = new SUiColorChannel();
   b.control = o;
   b.typeCd = 'red';
   b.hPanel = hcf;
   b.build();
   var b = o._barGreen = new SUiColorChannel();
   b.control = o;
   b.typeCd = 'green';
   b.hPanel = hcf;
   b.build();
   var b = o._barBlue = new SUiColorChannel();
   b.control = o;
   b.typeCd = 'blue';
   b.hPanel = hcf;
   b.build();
   var b = o._barPower = new SUiColorPower();
   b.control = o;
   b.typeCd = 'power';
   b.setRange(o._valueMin, o._valueMax);
   b.hPanel = hcf;
   b.build();
}
function FUiColorPower_onMouseCaptureStart(p){
   var o = this;
   var b = RHtml.searchObject(p.hSource, '__pbar');
   if(b){
      b.onMouseDown(p);
   }
}
function FUiColorPower_onMouseCapture(p){
   var o = this;
   var b = RHtml.searchObject(p.hSource, '__pbar');
   if(b){
      b.onMouseMove(p);
   }
}
function FUiColorPower_onMouseCaptureStop(p){
   var o = this;
   var b = RHtml.searchObject(p.hSource, '__pbar');
   if(b){
      b.onMouseUp(p);
   }
}
function FUiColorPower_onInputKeyPress(p){
   var o = this;
   var c = p.keyCode;
   if(RKeyboard.isControlKey(c)){
      return;
   }
   if(!RKeyboard.isFloatKey(c)){
      p.cancel();
   }
}
function FUiColorPower_onInputEdit(p){
   var o = this;
   var hs = p.hSender;
   var b = hs._pbar;
   if(b){
      b.changeInputEdit();
   }
   o.processDataChangedListener(o);
}
function FUiColorPower_onInputChange(p){
   var o = this;
   var hs = p.hSender;
   var b = hs._pbar;
   if(b){
      b.changeInputChange();
   }
   o.processDataChangedListener(o);
}
function FUiColorPower_construct(){
   var o = this;
   o.__base.FUiEditControl.construct.call(o);
   o._inputSize = new SSize2(120, 0);
   o._innerOriginValue = new SColor4();
   o._innerDataValue = new SColor4();
}
function FUiColorPower_get(p){
   var o = this;
   var v = o._innerDataValue;
   v.red = o._barRed.get();
   v.green = o._barGreen.get();
   v.blue = o._barBlue.get();
   v.alpha = o._barPower.get();
   return v;
}
function FUiColorPower_set(p){
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
   o._barPower.set(v.alpha);
   o.changeSet(false);
}
function FUiColorPower_setDisplayColor(){
   var o = this;
   var v = o._innerDataValue;
   var va = v.alpha;
   var vr = RHex.format(RInteger.toRange(parseInt(v.red * va * 255), 0, 255), 2);
   var vg = RHex.format(RInteger.toRange(parseInt(v.green * va * 255), 0, 255), 2);
   var vb = RHex.format(RInteger.toRange(parseInt(v.blue * va * 255), 0, 255), 2);
   o._hColorImage.style.backgroundColor = '#' + vr + vg + vb;
}
function FUiColorPower_setDisplay(){
   var o = this;
   o.setDisplayColor();
   var v = o._innerDataValue;
   o._barRed.set(v.red);
   o._barGreen.set(v.green);
   o._barBlue.set(v.blue);
   o._barPower.set(v.alpha);
}
function FUiColorPower_refreshValue(){
   var o = this;
   o.get();
   o.setDisplayColor();
   o.processDataChangedListener(o);
}
function FUiColorPower_dispose(t){
   var o = this;
   o.__base.FUiEditControl.dispose.call(o, t);
}
function FUiDateTime(o){
   o = RClass.inherits(this, o, FUiEditControl, MUiDropable);
   o.editDispMode = RClass.register(o, new APtySet('editDisplay', 'editDate', EDateTimeMode.Display));
   o.editYear     = RClass.register(o, new APtySet('editYear', 'editDate', EDateTimeMode.Year));
   o.editMonth    = RClass.register(o, new APtySet('editMonth', 'editDate', EDateTimeMode.Month));
   o.editDay      = RClass.register(o, new APtySet('editDay', 'editDate', EDateTimeMode.Day));
   o._date        = null;
   o.borderStyle  = EUiBorder.RoundDrop;
   o.lsnEditEnd   = null;
   o.hYearPanel   = null;
   o.hYear        = null;
   o.hMonthPanel  = null;
   o.hMonth       = null;
   o.hDayPanel    = null;
   o.hDay         = null;
   o.onKeyPress   = FUiDateTime_onKeyPress;
   o.onEditEnd    = FUiDateTime_onEditEnd;
   o.onBuildEdit  = FUiDateTime_onBuildEdit;
   o.oeSaveValue  = FUiDateTime_oeSaveValue;
   o.construct    = FUiDateTime_construct;
   o.formatValue  = FUiDateTime_formatValue;
   o.text         = FUiDateTime_text;
   o.setText      = FUiDateTime_setText;
   o.validText    = FUiDateTime_validText;
   o.setEditable  = FUiDateTime_setEditable;
   o.refreshStyle = FUiDateTime_refreshStyle;
   o.drop         = FUiDateTime_drop;
   o.dispose      = FUiDateTime_dispose;
   return o;
}
function FUiDateTime_onKeyPress(e){
   if(!RString.inChars(String.fromCharCode(e.keyCode), RDate.Chars)){
      RKey.eventClear(e);
   }
}
function FUiDateTime_onEditEnd(e){
   var o = this;
   if(e){
      o.set(e.get());
   }
   o.onDataEditEnd(o);
}
function FUiDateTime_onBuildEdit(b){
   var o = this;
   var htb = RBuilder.appendTable(b.hPanel);
   htb.width = '100%';
   htb.style.tableLayout = 'fixed';
   var hr = o.hEdit = htb.insertRow();
   o.onBuildChange(hr.insertCell())
   var hc = oonDateDoubleClickPanel = hr.insertCell();
   hc.width = '40%';
   hc.style.padding = '0 1';
   var he = o.hYear = RBuilder.appendEdit(hc);
   he.maxLength = 4;
   he.style.border = 0;
   he.style.width = '100%';
   he.style.textAlign = 'right';
   var hc = o.hYearSplit = hr.insertCell();
   hc.width = 5;
   hc.innerText = '-';
   o.hYear.style.display = o.editYear?'block':'none'
   o.hYearSplit.style.display = o.editYear?'block':'none'
   var hc = o.hMonthPanel = hr.insertCell();
   hc.width = '20%';
   hc.style.padding = '0 1';
   var he = o.hMonth = RBuilder.appendEdit(hc);
   he.maxLength = 2;
   he.style.border = 0;
   he.style.width = '100%';
   he.style.textAlign = 'right';
   var hc = o.hMonthSplit = hr.insertCell();
   hc.width = 5;
   hc.innerText = '-';
   o.hMonth.style.display = o.editMonth?'block':'none';
   o.hMonthSplit.style.display = o.editDay?'block':'none';
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
function FUiDateTime_oeSaveValue(e){
   var o = this;
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
function FUiDateTime_construct(){
   var o = this;
   o.base.FUiEditControl.construct.call(o);
   o._date = new TDate();
   o.lsnEditEnd = new TListener(o, o.onEditEnd);
}
function FUiDateTime_formatValue(t){
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
function FUiDateTime_text(){
   var o = this;
   o._date.setYear(o._date.year);
   o._date.setMonth(o._date.month);
   o._date.setDay(o._date.day);
   return RDate.formatDate(o._date);
}
function FUiDateTime_setText(t){
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
function FUiDateTime_validText(t){
   return null;
}
function FUiDateTime_setEditable(v){
   var o = this;
   o.base.FUiEditControl.setEditable.call(o, v);
   o.hYear.readOnly = !v;
   o.hMonth.readOnly = !v;
   o.hDay.readOnly = !v;
}
function FUiDateTime_refreshStyle(){
   var o = this;
   o.base.FUiEditControl.refreshStyle.call(o);
   o.hYear.style.color = o._textColor;
   o.hYear.style.backgroundColor = o._backColor;
   o.hMonth.style.color = o._textColor;
   o.hMonth.style.backgroundColor = o._backColor;
   o.hDay.style.color = o._textColor;
   o.hDay.style.backgroundColor = o._backColor;
}
function FUiDateTime_drop(){
   var o = this;
   if(o.canDrop() && o._editable){
      var e = o.editor = RConsole.find(FEditConsole).focus(o, FUiDateTimeEditor, o.editRefer);
      e.set(RDate.formatDate(o._date));
      e.setYearVisible(o.editYear);
      e.setMonthVisible(o.editMonth);
      e.setDayVisible(o.editDay);
      e.lsnEditEnd = o.lsnEditEnd;
      e.show();
   }
}
function FUiDateTime_dispose(){
   var o = this;
   o.base.FUiEditControl.dispose.call(o);
   o._date = null;
}
function FUiDateTimeEditor(o){
   o = RClass.inherits(this, o, FUiDropEditor);
   o.date              = null;
   o.years             = null;
   o.months            = null;
   o.days              = null;
   o.hPanelDay         = null;
   o.hPanelMonth       = null;
   o.hPanelYear        = null;
   o.hTitleDay         = null;
   o.hTitleMonth       = null;
   o.hTitleYear        = null;
   o.onButtonEnter     = RClass.register(o, new AEventMouseEnter('onButtonEnter'), FUiDateTimeEditor_onButtonEnter);
   o.onButtonLeave     = RClass.register(o, new AEventMouseLeave('onButtonLeave'), FUiDateTimeEditor_onButtonLeave);
   o.onYearClick       = RClass.register(o, new AEventMouseDown('onYearClick'), FUiDateTimeEditor_onYearClick);
   o.onMonthClick      = RClass.register(o, new AEventMouseDown('onMonthClick'), FUiDateTimeEditor_onMonthClick);
   o.onDayClick        = RClass.register(o, new AEventMouseDown('onDayClick'), FUiDateTimeEditor_onDayClick);
   o.onDateDoubleClick = RClass.register(o, new AEventDoubleClick('onDateDoubleClick'), FUiDateTimeEditor_onDateDoubleClick);
   o.onNowClick        = RClass.register(o, new AEventMouseDown('onNowClick'), FUiDateTimeEditor_onNowClick);
   o.onConfirmClick    = RClass.register(o, new AEventMouseDown('onConfirmClick'), FUiDateTimeEditor_onConfirmClick);
   o.onBuildDrop       = FUiDateTimeEditor_onBuildDrop;
   o.onBuildButton     = FUiDateTimeEditor_onBuildButton;
   o.construct         = FUiDateTimeEditor_construct;
   o.buildTitle        = FUiDateTimeEditor_buildTitle;
   o.get               = FUiDateTimeEditor_get;
   o.set               = FUiDateTimeEditor_set;
   o.resetDay          = FUiDateTimeEditor_resetDay;
   o.setYearVisible    = FUiDateTimeEditor_setYearVisible;
   o.setMonthVisible   = FUiDateTimeEditor_setMonthVisible;
   o.setDayVisible     = FUiDateTimeEditor_setDayVisible;
   o.selectCell        = FUiDateTimeEditor_selectCell;
   o.restore           = FUiDateTimeEditor_restore;
   o.show              = FUiDateTimeEditor_show;
   o.dispose           = FUiDateTimeEditor_dispose;
   return o;
}
function FUiDateTimeEditor_onButtonEnter(e){
   if(!e.hSource.isSelect){
	  if(RString.isEmpty(e.hSource.innerText)){
         e.hSource.style.backgroundColor = '#CCCCFF';
	  }
   }
}
function FUiDateTimeEditor_onButtonLeave(e){
   if(!e.hSource.isSelect){
      e.hSource.style.backgroundColor = '#FFFFFF';
   }
}
function FUiDateTimeEditor_onYearClick(e){
   var o = this;
   o.date.setYear(e.hSource.innerText);
   o.restore();
   o.resetDay();
}
function FUiDateTimeEditor_onMonthClick(e){
   var o = this;
   o.date.setMonth(e.hSource.innerText);
   o.restore();
   o.resetDay();
}
function FUiDateTimeEditor_onDayClick(e){
   var o = this;
   if(!RString.equals(e.hSource.innerText, '.')){
      o.date.setDay(e.hSource.innerText);
      o.restore();
   }
}
function FUiDateTimeEditor_onDateDoubleClick(){
   this.onConfirmClick();
}
function FUiDateTimeEditor_onNowClick(){
   var o = this;
   o.date = new TDate();
   o.editEnd();
}
function FUiDateTimeEditor_onConfirmClick(){
   var o = this;
   o.date.setYear(o.hYear.value);
   o.date.setMonth(o.hMonth.value);
   o.date.setDay(o.hDay.value);
   o.editEnd();
}
function FUiDateTimeEditor_onBuildDrop(){
   var o = this;
   var hdp = o.hDropPanel;
   hdp.width = 220;
   o.attachEvent('onDateDoubleClick', hdp);
   o.hTitleYear = o.buildTitle('Year', 4);
   var hp = o.hPanelYear = o.hSelectPanel = RBuilder.appendTable(hdp);
   hp.width = '100%';
   for(var m=0; m<4; m++){
      var hr = hp.insertRow();
      for(var n=0; n<4; n++){
         var hc = hr.insertCell();
         hc.innerText = RInteger.format(2000 + 4*m+n, 2);
         hc.align = 'center';
         hc.style.padding = '1 6';
         hc.style.cursor = 'hand';
         hc.style.borderBottom = '1 solid #EEEEEE';
         if(n < 5){
            hc.style.borderRight = '1 solid #EEEEEE';
         }
         o.attachEvent('onButtonEnter', hc);
         o.attachEvent('onButtonLeave', hc);
         o.attachEvent('onYearClick', hc);
         o.years.push(hc);
      }
   }
   o.hTitleMonth = o.buildTitle('Month', 2);
   var hp = o.hPanelMonth = o.hSelectPanel = RBuilder.appendTable(hdp);
   hp.width = '100%';
   for(var m=0; m<2; m++){
      hr = hp.insertRow();
      for(var n=0; n<6; n++){
         var hc = hr.insertCell();
         hc.innerText = RInteger.format(6*m+n+1, 2);
         hc.align = 'center';
         hc.style.cursor = 'hand';
         hc.style.borderBottom = '1 solid #EEEEEE';
         if(n < 5){
            hc.style.borderRight = '1 solid #EEEEEE';
         }
         o.attachEvent('onButtonEnter', hc);
         o.attachEvent('onButtonLeave', hc);
         o.attachEvent('onMonthClick', hc);
         o.months.push(hc);
      }
   }
   o.hTitleDay = o.buildTitle('Day', 2);
   var hp = o.hPanelDay = o.hSelectPanel = RBuilder.appendTable(hdp);
   hp.width = '100%';
   for(var m=0; m<5; m++){
      hr = hp.insertRow();
      for(var n=0; n<7; n++){
         var day = 7*m+n+1;
         if(day > 31){
            continue;
         }
         var hc = hr.insertCell();
         hc.innerText = RInteger.format(day, 2);
         hc.align = 'center';
         hc.style.borderBottom = '1 solid #EEEEEE';
         hc.style.cursor = 'hand';
         if(n < 5){
            hc.style.borderRight = '1 solid #EEEEEE';
         }
         o.attachEvent('onButtonEnter', hc);
         o.attachEvent('onButtonLeave', hc);
         o.attachEvent('onDayClick', hc);
         o.days.push(hc);
      }
   }
}
function FUiDateTimeEditor_onBuildButton(){
   var o = this;
   o.base.FUiDropEditor.onBuildButton.call(o);
   var hf = RBuilder.appendTable(o.hButtonPanel);
   hf.width = '100%';
   hf.height = 20;
   hf.style.filter = "progid:DXImageTransform.Microsoft.Gradient(startColorStr='#EEEEEE', endColorStr='#FFFFFF', gradientType='0')";
   var hr = hf.insertRow();
   var hc = hr.insertCell();
   hc.style.padding = '0 6';
   var h = o.hNow = RBuilder.append(hc, 'SPAN');
   h.style.cursor = 'hand';
   o.attachEvent('onNowClick', h);
   h.innerText = RContext.get('FDate:Now');
   var hc = hr.insertCell();
   hc.style.padding = '0 6';
   hc.align = 'right';
   var h = o.hNow = RBuilder.append(hc, 'SPAN');
   h.style.cursor = 'hand';
   o.attachEvent('onConfirmClick', h);
   h.innerText = RContext.get('FDate:Confirm');
}
function FUiDateTimeEditor_construct(){
   var o = this;
   o.base.FUiDropEditor.construct.call(o);
   o.date = new TDate();
   o.years = new TList();
   o.months = new TList();
   o.days = new TList();
}
function FUiDateTimeEditor_buildTitle(n, ml){
   var o = this;
   var hf = RBuilder.appendTable(o.hDropPanel);
   hf.width = '100%';
   hf.style.borderBottom = '1 solid #999999';
   hf.style.filter = "progid:DXImageTransform.Microsoft.Gradient(startColorStr='#FFFFFF', endColorStr='#E5FAFE', gradientType='0')";
   hf.style.backgroundColor = '#F8F8F8';
   hf.style.padding = '2 6';
   var hr = hf.insertRow();
   var hc = hr.insertCell();
   hc.width = 60;
   var he = o['h' + n] = RBuilder.appendEdit(hc);
   he.style.width = '100%';
   he.style.textAlign = 'right';
   he.style.border = '1 solid #CCCCCC';
   he.maxLength = ml;
   var hc = hr.insertCell();
   hc.innerText = RContext.get('FDate:' + n);
   return hf;
}
function FUiDateTimeEditor_get(){
   return RDate.formatDate(this.date);
}
function FUiDateTimeEditor_set(v){
   var o = this;
   RDate.autoParse(o.date, v);
   o.restore();
}
function FUiDateTimeEditor_setYearVisible(v){
   var o = this;
   o.hPanelYear.style.display = v? 'block':'none';
   o.hTitleYear.style.display = v? 'block':'none';
}
function FUiDateTimeEditor_setMonthVisible(v){
   var o = this;
   o.hPanelMonth.style.display = v? 'block':'none';
   o.hTitleMonth.style.display = v? 'block':'none';
}
function FUiDateTimeEditor_setDayVisible(v){
   var o = this;
   o.hPanelDay.style.display = v? 'block':'none';
   o.hTitleDay.style.display = v? 'block':'none';
}
function FUiDateTimeEditor_show(v){
   var o = this;
   o.base.FUiDropEditor.show.call(o, v);
   var hp = o.hPanel;
   var hbf = o.hBorderForm;
   var s = o.source;
   var r = s.getEditRange();
   hp.style.pixelLeft = r.x;
   hp.style.pixelTop = r.y + r.height;
   hp.style.pixelWidth = 220;
   o.base.MShadow.show.call(o);
}
function FUiDateTimeEditor_resetDay(){
   var o = this;
   var monthDays = this.date.monthDays();
   for(var n=0; n<o.days.count; n++){
      var hd = o.days.get(n);
      if(n >= monthDays){
         hd.innerText = '.';
      }else{
    	 hd.innerText = RInteger.format(n+1, 2);
      }
   }
}
function FUiDateTimeEditor_selectCell(ls, v){
   var c = ls.count;
   for(var n=0; n<c; n++){
      var h = ls.get(n);
      if(h.innerText == v){
         h.style.color = '#FFFFFF';
         h.style.backgroundColor = '#9999EE';
         h.isSelect = true;
      }else{
         h.style.color = '#000000';
         h.style.backgroundColor = '#FFFFFF';
         h.isSelect = false;
      }
   }
}
function FUiDateTimeEditor_restore(){
   var o = this;
   o.hYear.value = o.date.year;
   o.hMonth.value = o.date.month;
   o.hDay.value = o.date.day;
   o.selectCell(o.years, o.date.year);
   o.selectCell(o.months, o.date.month);
   o.selectCell(o.days, o.date.day);
}
function FUiDateTimeEditor_dispose(){
   var o = this;
   o.base.FUiDropEditor.dispose.call(o);
   o.hPanel = null;
}
function FUiDropEditor(o){
   o = RClass.inherits(this, o, FUiEditor, MUiShadow);
   o._stylePanel       = RClass.register(o, new AStyle('_stylePanel'));
   o._styleDropForm    = RClass.register(o, new AStyle('_styleDropForm'));
   o._styleDropPanel   = RClass.register(o, new AStyle('_styleDropPanel'));
   o._styleButtonPanel = RClass.register(o, new AStyle('_styleButtonPanel'));
   o._minWidth         = 160;
   o._minHeight        = 300;
   o._hDropForm        = null;
   o._hDropPanel       = null;
   o._hButtonPanel     = null;
   o.onBuildDrop       = RMethod.virtual(o, 'onBuildDrop');
   o.onBuildButton     = RMethod.empty;
   o.onBuild           = FUiDropEditor_onBuild;
   o.onDropMouseDown   = RClass.register(o, new AEventMouseDown('onDropMouseDown'));
   o.onDropMouseUp     = RClass.register(o, new AEventMouseUp('onDropMouseUp'));
   o.panel             = FUiDropEditor_panel;
   o.setVisible        = FUiDropEditor_setVisible;
   o.dispose           = FUiDropEditor_dispose;
   return o;
}
function FUiDropEditor_onBuild(p){
   var o = this;
   o.__base.FUiEditor.onBuild.call(o, p);
   var h = o._hPanel;
   h.className = o.styleName('Panel');
   var hf = o._hDropForm = RBuilder.appendTable(h, o.styleName('DropForm'));
   o._hDropPanel = RBuilder.appendTableRowCell(hf, o.styleName('DropPanel'));
   o._hButtonPanel = RBuilder.appendTableRowCell(hf, o.styleName('ButtonPanel'));
   o.onBuildDrop();
   o.onBuildButton();
}
function FUiDropEditor_panel(p){
   var o = this;
   if(p == EPanel.Shadow){
      return o.hPanel;
   }
   return o.__base.FUiEditor.panel.call(o, p);
}
function FUiDropEditor_setVisible(p){
   var o = this;
   var h = o._hPanel;
   var hd = o._hPanel.ownerDocument;
   if(p){
      hd.body.appendChild(h);
   }else{
      hd.body.removeChild(h);
   }
   o.__base.FUiEditor.setVisible.call(o, p);
}
function FUiDropEditor_dispose(){
   var o = this;
   o._hButtonPanel = RHtml.free(o._hButtonPanel);
   o._hDropPanel = RHtml.free(o._hDropPanel);
   o._hDropForm = RHtml.free(o._hDropForm);
   o.__base.FControl.dispose.call(o);
}
function FUiEdit(o){
   o = RClass.inherits(this, o, FUiEditControl, MPropertyEdit, MListenerDataChanged);
   o._inputSize       = RClass.register(o, new APtySize2('_inputSize'));
   o._unit            = RClass.register(o, new APtyString('_unit'));
   o._styleValuePanel = RClass.register(o, new AStyle('_styleValuePanel'));
   o._styleInputPanel = RClass.register(o, new AStyle('_styleInputPanel'));
   o._styleInput      = RClass.register(o, new AStyle('_styleInput'));
   o._hValueForm      = null;
   o._hValueLine      = null;
   o._hInputPanel     = null;
   o._hInput          = null;
   o.onBuildEditValue = FUiEdit_onBuildEditValue;
   o.onInputEdit      = RClass.register(o, new AEventInputChanged('onInputEdit'), FUiEdit_onInputEdit);
   o.construct        = FUiEdit_construct;
   o.formatDisplay    = FUiEdit_formatDisplay;
   o.formatValue      = FUiEdit_formatValue;
   o.get              = FUiEdit_get;
   o.set              = FUiEdit_set;
   o.refreshValue     = FUiEdit_refreshValue;
   return o;
}
function FUiEdit_onBuildEditValue(p){
   var o = this;
   var hp = o._hValuePanel;
   hp.className = o.styleName('ValuePanel');
   var hf = o._hValueForm = RBuilder.appendTable(hp);
   hf.width = '100%';
   var hl = o._hValueLine = RBuilder.appendTableRow(hf);
   o._hChangePanel = RBuilder.appendTableCell(hl);
   o.onBuildEditChange(p);
   var hep = o._hInputPanel = RBuilder.appendTableCell(hl);
   var he = o._hInput = RBuilder.appendEdit(hep, o.styleName('Input'));
   o.attachEvent('onInputEdit', he, o.onInputEdit);
   RHtml.setSize(hep, o._inputSize);
   if(o._editLength){
      he.maxLength = o._editLength;
   }
}
function FUiEdit_onInputEdit(p){
   var o = this;
   var v = o._hInput.value;
   o.refreshValue();
}
function FUiEdit_construct(){
   var o = this;
   o.__base.FUiEditControl.construct.call(o);
   o._inputSize = new SSize2(120, 0);
}
function FUiEdit_formatDisplay(p){
   var o = this;
   var r = RString.nvl(p);
   o._dataDisplay = r;
   return r;
}
function FUiEdit_formatValue(p){
   return p;
}
function FUiEdit_get(){
   var o = this;
   var r = o.__base.FUiEditControl.get.call(o);
   var r = o._hInput.value;
   return r;
}
function FUiEdit_set(p){
   var o = this;
   o.__base.FUiEditControl.set.call(o, p);
   o._hInput.value = RString.nvl(p);
}
function FUiEdit_refreshValue(){
   var o = this;
   o.processDataChangedListener(o);
}
function FUiEditControl(o){
   o = RClass.inherits(this, o, FUiControl, MUiEditValue, MUiEditChange, MUiEditDrop);
   o._labelModeCd      = RClass.register(o, new APtyString('_labelModeCd'), EUiLabelMode.All);
   o._labelPositionCd  = RClass.register(o, new APtyString('_labelPositionCd'), EUiLabelPosition.Left);
   o._labelSize        = RClass.register(o, new APtySize2('_labelSize'));
   o._labelAlignCd     = RClass.register(o, new APtyString('_labelAlignCd'), EUiAlign.Left);
   o._labelColor       = RClass.register(o, new APtyString('_labelColor'));
   o._editSize         = RClass.register(o, new APtySize2('_editSize'));
   o._editColor        = RClass.register(o, new APtyString('_editColor'));
   o._styleLabelPanel  = RClass.register(o, new AStyle('_styleLabelPanel'));
   o._styleEditPanel   = RClass.register(o, new AStyle('_styleEditPanel'));
   o._progressing      = false;
   o._hLabelPanel      = null;
   o._hLabelForm       = null;
   o._hIconPanel       = null;
   o._hIcon            = null;
   o._hTextPanel       = null;
   o._hText            = null;
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
   o.oeMode            = FUiEditControl_oeMode;
   o.oeProgress        = FUiEditControl_oeProgress;
   o.construct         = FUiEditControl_construct;
   o.panel             = FUiEditControl_panel;
   o.label             = FUiEditControl_label;
   o.setLabel          = FUiEditControl_setLabel;
   o.text              = FUiEditControl_text;
   o.setText           = FUiEditControl_setText;
   o.getValueRectangle = FUiEditControl_getValueRectangle;
   o.dispose           = FUiEditControl_dispose;
   return o;
}
function FUiEditControl_onBuildLabelIcon(p){
   var o = this;
   if(o._labelIcon){
      o._hIcon = RBuilder.appendIcon(o._hIconPanel, null, o._labelIcon);
   }else{
      o._hIcon = RBuilder.appendIcon(o._hIconPanel, null, 'n', 16, 16);
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
   hip.width = '20px';
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
   if(lmc == EUiLabelMode.Label){
      hlp = RBuilder.appendTableCell(RBuilder.appendTableRow(hc));
   }else if(lmc == EUiLabelMode.Hidden){
      hep = RBuilder.appendTableCell(RBuilder.appendTableRow(hc));
   }else{
      var lpc = o._labelPositionCd;
      if(lpc == EUiLabelPosition.Top){
         hlp = RBuilder.appendTableRowCell(hc);
         hep = RBuilder.appendTableRowCell(hc);
      }else if(lpc == EUiLabelPosition.Right){
         var hr = RBuilder.appendTableRow(hc);
         hep = RBuilder.appendTableCell(hr);
         hlp = RBuilder.appendTableCell(hr);
      }else if(lpc == EUiLabelPosition.Bottom){
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
}
function FUiEditControl_oeMode(e){
   var o = this;
   o.__base.FUiControl.oeMode.call(o, e);
   o.__base.MDisplay.oeMode.call(o, e);
   o._editable = o.canEdit(e.mode);
   o._validable = o.canValid(e.mode);
   if(!o._progressing){
      o.setEditable(o._editable);
   }
   return EEventStatus.Stop;
}
function FUiEditControl_oeProgress(e){
   var o = this;
   if(o._progressing && e.enable){
      return EEventStatus.Stop;
   }
   o._progressing = e.enable;
   if(e.enable){
      var ea = o._editable;
      o.setEditable(false);
      o._editable = ea;
   }else{
      o.setEditable(o._editable);
   }
   return EEventStatus.Stop;
}
function FUiEditControl_construct(){
   var o = this;
   o.__base.FUiControl.construct.call(o);
   o.__base.MUiEditChange.construct.call(o);
   o.__base.MUiEditDrop.construct.call(o);
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
function FUiEditControl_text(){
   throw new TUnsupportError(o, 'text');
}
function FUiEditControl_setText(value){
   throw new TUnsupportError(o, 'setText');
}
function FUiEditControl_getValueRectangle(r){
   var o = this;
   if(!r){
      r = new SRectangle();
   }
   var h = o._hValuePanel;
   var p = RHtml.clientPosition(h);
   r.position.assign(p);
   r.setSize(h.offsetWidth, h.offsetHeight);
   return r;
}
function FUiEditControl_dispose(){
   var o = this;
   o._labelModeCd = null;
   o._labelPositionCd = null;
   o._labelAlignCd = null;
   o._dataTypeCd = null;
   o._labelSize = RObject.dispose(o._labelSize);
   o._editSize = RObject.dispose(o._editSize);
   o._hLabelPanel = RHtml.free(o._hLabelPanel);
   o._hLabelForm = RHtml.free(o._hLabelForm);
   o._hIconPanel = RHtml.free(o._hIconPanel);
   o._hIcon = RHtml.free(o._hIcon);
   o._hTextPanel = RHtml.free(o._hTextPanel);
   o._hText = RHtml.free(o._hText);
   o._hEditPanel = RHtml.free(o._hEditPanel);
   o._hEditForm = RHtml.free(o._hEditForm);
   o._hValuePanel = RHtml.free(o._hValuePanel);
   o._hDropPanel = RHtml.free(o._hDropPanel);
   o.__base.MUiEditDrop.dispose.call(o);
   o.__base.MUiEditChange.dispose.call(o);
   o.__base.FUiControl.dispose.call(o);
}
function FUiEditor(o){
   o = RClass.inherits(this, o, FUiControl, MUiFocus);
   o._visible       = false;
   o._statusVisible = false;
   o._styleEdit     = RClass.register(o, new AStyle('_styleEdit'));
   o._statusEditing = false;
   o._source        = null;
   o._hEdit         = null;
   o.lsnEditBegin   = null;
   o.lsnEditCancel  = null;
   o.lsnEditEnd     = null;
   o.onEditKeyDown  = RClass.register(o, new AEventKeyDown('onEditKeyDown'));
   o.onEditKeyPress = RClass.register(o, new AEventKeyPress('onEditKeyPress'));
   o.onEditKeyUp    = RClass.register(o, new AEventKeyUp('onEditKeyUp'));
   o.onEditChange   = RClass.register(o, new AEventChange('onEditChange'));
   o.onEditBegin    = FUiEditor_onEditBegin;
   o.onEditChanged  = FUiEditor_onEditChanged;
   o.onEditEnd      = FUiEditor_onEditEnd;
   o.onBuildPanel   = FUiEditor_onBuildPanel;
   o.onBuild        = FUiEditor_onBuild;
   o.get            = RMethod.virtual(o, 'get');
   o.set            = RMethod.virtual(o, 'set');
   o.doBlur         = FUiEditor_doBlur;
   o.panel          = FUiEditor_panel;
   o.linkControl    = FUiEditor_linkControl;
   o.editBegin      = FUiEditor_editBegin;
   o.editCancel     = FUiEditor_editCancel;
   o.editEnd        = FUiEditor_editEnd;
   o.reset          = FUiEditor_reset;
   o.setVisible     = FUiEditor_setVisible;
   o.dispose        = FUiEditor_dispose;
   return o;
}
function FUiEditor_onEditBegin(){
   this.editBegin();
}
function FUiEditor_onEditChanged(){
   var o = this;
   RLogger.debug(o, 'Edit changed');
   var g = o.storage = RObject.nvlObj(o.storage);
   if(g.value == o.value()){
      if(o.changed){
         o.changed = false;
      }
   }else{
      if(!o.changed){
         o.changed = true;
      }
   }
}
function FUiEditor_onEditEnd(){
   var o = this;
   var s = o._source;
   RLogger.debug(o, 'Editor end. (control={1})', RClass.dump(s));
   o.hide();
   if(o.lsnEditEnd){
      o.lsnEditEnd.process(o);
   }
   s._editor = null;
   o._source = null;
   o._statusEditing = false;
}
function FUiEditor_onBuildPanel(p){
   var o = this;
   var h = o._hPanel = RBuilder.createSpan(p);
   h.__linker = o;
}
function FUiEditor_onBuild(p){
   var o = this;
   o.__base.FUiControl.onBuild.call(o, p);
   o._hPanel.style.zIndex = EUiLayer.Editor;
}
function FUiEditor_get(name){
}
function FUiEditor_set(name, value){
}
function FUiEditor_doBlur(){
   var o = this;
   var s = o._source;
   if(s){
      o.editCancel();
      if(RClass.isClass(s, MUiFocus)){
         s.doBlur();
      }
   }
}
function FUiEditor_panel(p){
   var o = this;
   if(p == EPanel.Edit){
      return o._hEdit;
   }else if(p == EPanel.Focus){
      return o._hEdit;
   }
   return o.__base.FUiControl.panel.call(o, p);
}
function FUiEditor_linkControl(c){
   var o = this;
   o._source = c;
}
function FUiEditor_editBegin(){
   var o = this;
   var s = o._source;
   RLogger.debug(o, 'Editor begin. (control={1})', RClass.dump(s));
   if(o.lsnEditCancel){
      o.lsnEditCancel.process(o);
   }
   s._editor = o;
   o._statusEditing = true;
}
function FUiEditor_editCancel(){
   var o = this;
   var s = o._source;
   RLogger.debug(o, 'Editor cancel. (control={1})', RClass.dump(s));
   o.hide();
   if(o.lsnEditCancel){
      o.lsnEditCancel.process(o);
   }
   s._editor = null;
   o._source = null;
   o._statusEditing = false;
}
function FUiEditor_editEnd(){
   this.onEditEnd();
}
function FUiEditor_reset(){
   var o = this;
   o.lsnEditBegin = null;
   o.lsnEditCancel = null;
   o.lsnEditEnd = null;
}
function FUiEditor_setVisible(p){
   var o = this;
   o.__base.FUiControl.setVisible.call(o, p);
   if(p){
      o.editBegin();
      o.focus();
   }
}
function FUiEditor_dispose(){
   var o = this;
   o.__base.FUiControl.dispose.call(o);
   o._hEdit = null;
}
function FUiFile(o){
   o = RClass.inherits(this, o, FUiEditControl, MListenerDataChanged);
   o._inputSize       = RClass.register(o, new APtySize2('_inputSize'));
   o._unit            = RClass.register(o, new APtyString('_unit'));
   o._styleValuePanel = RClass.register(o, new AStyle('_styleValuePanel'));
   o._styleInputPanel = RClass.register(o, new AStyle('_styleInputPanel'));
   o._styleInput      = RClass.register(o, new AStyle('_styleInput'));
   o._hValueForm      = null;
   o._hValueLine      = null;
   o._hInputPanel     = null;
   o._hInput          = null;
   o.onBuildEditValue = FUiFile_onBuildEditValue;
   o.onInputEdit      = RClass.register(o, new AEventInputChanged('onInputEdit'), FUiFile_onInputEdit);
   o.construct        = FUiFile_construct;
   o.formatDisplay    = FUiFile_formatDisplay;
   o.formatValue      = FUiFile_formatValue;
   o.get              = FUiFile_get;
   o.set              = FUiFile_set;
   o.refreshValue     = FUiFile_refreshValue;
   return o;
}
function FUiFile_onBuildEditValue(p){
   var o = this;
   var hp = o._hValuePanel;
   hp.className = o.styleName('ValuePanel');
   var hf = o._hValueForm = RBuilder.appendTable(hp);
   hf.width = '100%';
   var hl = o._hValueLine = RBuilder.appendTableRow(hf);
   o._hChangePanel = RBuilder.appendTableCell(hl);
   o.onBuildEditChange(p);
   var hep = o._hInputPanel = RBuilder.appendTableCell(hl);
   var he = o._hInput = RBuilder.appendFile(hep, o.styleName('Input'));
   RHtml.setSize(hep, o._inputSize);
   if(o._editLength){
      he.maxLength = o._editLength;
   }
}
function FUiFile_onInputEdit(p){
   var o = this;
   var v = o._hInput.value;
   o.refreshValue();
}
function FUiFile_construct(){
   var o = this;
   o.__base.FUiEditControl.construct.call(o);
   o._inputSize = new SSize2(120, 0);
}
function FUiFile_formatDisplay(p){
   var o = this;
   var r = RString.nvl(p);
   o._dataDisplay = r;
   return r;
}
function FUiFile_formatValue(p){
   return p;
}
function FUiFile_get(){
   var o = this;
   var r = o.__base.FUiEditControl.get.call(o);
   var r = o._hInput.value;
   return r;
}
function FUiFile_set(p){
   var o = this;
   o.__base.FUiEditControl.set.call(o, p);
   o._hInput.value = RString.nvl(p);
}
function FUiFile_refreshValue(){
   var o = this;
   o.processDataChangedListener(o);
}
function FUiForm(o){
   o = RClass.inherits(this, o, FUiLayout, MUiDescribeFrame);
   o.onMouseDown        = FUiForm_onMouseDown;
   o.construct          = FUiForm_construct;
   o._dataStatusCd      = ERowStatus.Update;
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
   o.__base.MUiFocus.focus.call(o);
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
function FUiFrame(o){
   o = RClass.inherits(this, o, FUiLayout);
   return o;
}
function FUiIconPicker(o){
   o = RClass.inherits(this, o, FUiEdit);
   return o;
}
function FUiIconPicker_onEditKeyDown(e){
   var o = this;
   o.base.FUiEditControl.onEditKeyDown.call(o,e);
   o.hEditIcon.src = RRes.iconPath(RString.nvl(o.text(), o.styleIcon("Default")));
}
function FUiIconPicker_onEditKeyPress(e){
   var o = this;
   o.base.FUiEditControl.onEditKeyPress.call(o, e);
   if(o.editCase){
      RKey.fixCase(e, o.editCase);
   }
}
function FUiIconPicker_onBuildEdit(b){
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
function FUiIconPicker_setText(t){
   var o = this;
   o.base.FUiEditControl.setText.call(o, t);
   o.hEditIcon.src = RResource.iconPath(RString.nvl(o.text(), o.styleIcon("Default")));
}
function FUiIconPicker_dispose(){
   var o = this;
   o.base.FUiEditControl.dispose.call(o);
   o.hEditIcon = null;
   o.hEdit = null;
}
function FUiLabel(o){
   o = RClass.inherits(this, o, FEditControl);
   o.onBuildEdit  = FUiLabel_onBuildEdit;
   o.text         = FUiLabel_text;
   o.setText      = FUiLabel_setText;
   o.refreshStyle = RMethod.empty;
   return o;
}
function FUiLabel_onBuildEdit(){
   var o = this;
}
function FUiLabel_text(){
}
function FUiLabel_setText(t){
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
   if(o._layoutCd == EUiLayout.Design){
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
   var cfh = RClass.isClass(cf, MUiHorizontal);
   var hCfTd = RHtml.parent(cf._hPanel, 'TD');
   var hCfTab = RHtml.parent(cf._hPanel, 'TABLE');
   var cth = RClass.isClass(ct, MUiHorizontal);
   var hTd = RHtml.parent(ct._hPanel, 'TD');
   var hTable = RHtml.parent(hTd, 'TABLE');
   switch(pos){
      case EPosition.Before:
         var hRow = hTable.rows[0];
         for(var n = 0; n < hRow.cells.length; n++){
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
         for(var n = 0; n < hRow.cells.length; n++){
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
            for(var n = 0; n < count; n++){
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
   if(o._layoutCd == EUiLayout.Design){
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
   if(o._layoutCd == EUiLayout.Design){
      if(!o._hPanelLine){
         o.innerAppendLine();
      }
      if(RClass.isClass(ctl, MUiHorizontal)){
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
      ctl._hLayoutCell = hCell;
      if((ctl.wrapCd() == EUiWrap.NextLine) && (o.controls.last() != ctl)){
         o.innerAppendLine();
      }
   }else{
      ctl._hPanel.style.paddingTop = 2;
      ctl._hPanel.style.paddingBottom = 2;
      if(RSet.contains(ctl._sizeCd, EUiSize.Horizontal) || '100%' == ctl.width){
         if(RClass.isClass(ctl, FUiSplit)){
            o._lastSplit = ctl;
         }
         var hr = RBuilder.appendTableRow(o._hPanelForm);
         var hc = RBuilder.appendTableCell(hr);
         hc.vAlign = 'top';
         hc.appendChild(ctl._hPanel);
         ctl._hLayoutRow = hr;
         o._hPanelLast = hc;
         if(!RSet.contains(ctl._sizeCd, EUiSize.Vertical)){
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
         ctl._hLayoutRow = o._hPanelLine;
         o._hPanelLast = hc;
         hc.appendChild(ctl._hPanel);
         ctl._hLayoutCell = hc;
         if(ctl.wrapCd() == EUiWrap.NextLine){
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
function FUiListBox(o){
   o = RClass.inherits(this, o, FUiContainer, MUiHorizontal, MListenerClick);
   o._sizeCd      = EUiSize.Horizontal
   o._stylePanel  = RClass.register(o, new AStyle('_stylePanel'));
   o._hForm       = null;
   o.onBuildPanel = FUiListBox_onBuildPanel;
   o.createItem   = FUiListBox_createItem;
   o.appendChild  = FUiListBox_appendChild;
   o.clickItem    = FUiListBox_clickItem;
   o.clear        = FUiListBox_clear;
   o.dispose      = FUiListBox_dispose;
   return o;
}
function FUiListBox_onBuildPanel(p){
   var o = this;
   o._hPanel = RBuilder.createTable(p, o.styleName('Panel'));
}
function FUiListBox_createItem(pi, pl){
   var o = this;
   var c = RClass.create(FUiListItem);
   c.build(o._hPanel);
   c.setLabel(pl);
   return c;
}
function FUiListBox_appendChild(p){
   var o = this;
   o._hPanel.appendChild(p._hPanel);
}
function FUiListBox_clickItem(p){
   var o = this;
   var s = o._components;
   if(s){
      var c = s.count();
      for(var i = 0; i < c; i++){
         var m = s.value(i);
         if(RClass.isClass(m, FUiListItem)){
            m.setChecked(m == p);
         }
      }
   }
   o.processClickListener(o, p);
}
function FUiListBox_clear(){
   var o = this;
   var cs = o._components;
   if(cs){
      var c = cs.count();
      for(var i = 0; i < c; i++){
         var m = cs.value(i);
         if(RClass.isClass(m, FUiListItem)){
            o._hPanel.removeChild(m._hPanel);
         }
         m.dispose();
      }
      cs.clear();
      o._controls.clear();
   }
}
function FUiListBox_dispose(){
   var o = this;
   o.__base.FContainer.dispose.call(o);
}
function FUiListItem(o){
   o = RClass.inherits(this, o, FUiControl);
   o._styleNormal    = RClass.register(o, new AStyle('_styleNormal'));
   o._styleHover     = RClass.register(o, new AStyle('_styleHover'));
   o._styleSelect    = RClass.register(o, new AStyle('_styleSelect'));
   o._styleIconPanel = RClass.register(o, new AStyle('_styleIconPanel'));
   o._styleIcon      = RClass.register(o, new AStyle('_styleIcon'));
   o._styleLabel     = RClass.register(o, new AStyle('_styleLabel'));
   o._checked        = false;
   o._hPanel         = null;
   o._hIconPanel     = null;
   o._hIcon          = null;
   o._hLabel         = null;
   o.onBuildPanel    = FUiListItem_onBuildPanel;
   o.onBuild         = FUiListItem_onBuild;
   o.onEnter         = FUiListItem_onEnter;
   o.onLeave         = FUiListItem_onLeave;
   o.onClick         = RClass.register(o, new AEventClick('onClick'), FUiListItem_onClick);
   o.label           = FUiListItem_label;
   o.setLabel        = FUiListItem_setLabel;
   o.setChecked      = FUiListItem_setChecked;
   o.dispose         = FUiListItem_dispose;
   return o;
}
function FUiListItem_onBuildPanel(p){
   var o = this;
   o._hPanel = RBuilder.createTableRow(p, o.styleName('Normal'));
}
function FUiListItem_onBuild(p){
   var o = this;
   o.__base.FUiControl.onBuild.call(o, p);
   var h = o._hPanel;
   o._hIconPanel = RBuilder.appendTableCell(h, o.styleName('IconPanel'))
   if(o._icon){
      o._hIcon = RBuilder.appendIcon(o._hIconPanel, o.styleName('Icon'), o._icon);
   }
   o._hLabel = RBuilder.appendTableCell(h, o.styleName('Label'));
   if(o._label){
      o.setLabel(o._label);
   }
   o.attachEvent('onClick', h);
}
function FUiListItem_onEnter(){
   var o = this;
   o.__base.FUiControl.onEnter.call(o);
   o._hPanel.className = RBoolean.parse(o._checked) ? o.styleName('Select') : o.styleName('Hover');
}
function FUiListItem_onLeave(){
   var o = this;
   o._hPanel.className = RBoolean.parse(o._checked) ? o.styleName('Select') : o.styleName('Normal');
   o.__base.FUiControl.onLeave.call(o);
}
function FUiListItem_onClick(p){
   var o = this;
   o._parent.clickItem(o);
}
function FUiListItem_label(p){
   return this._label;
}
function FUiListItem_setLabel(p){
   var o = this;
   o._label = p;
   o._hLabel.innerHTML = RString.nvl(p);
}
function FUiListItem_setChecked(p){
   var o = this;
   o._checked = p;
   if(o._hIcon){
      o._hIcon.style.display = p ? 'block' : 'none';
   }else{
      o._hIconPanel.innerHTML = p ? 'O' : '';
   }
   o._hPanel.className = p ? o.styleName('Select') : o.styleName('Normal');
}
function FUiListItem_dispose(){
   var o = this;
   o._hPanel = RHtml.free(o._hPanel);
   o._hIconPanel = RHtml.free(o._hIconPanel);
   o._hIcon = RHtml.free(o._hIcon);
   o._hLabel = RHtml.free(o._hLabel);
   o.__base.FUiControl.dispose.call(o);
}
function FUiListView(o){
   o = RClass.inherits(this, o, FUiContainer, MUiHorizontal, MListenerClick, MListenerDoubleClick);
   o._sizeCd           = EUiSize.Horizontal
   o._stylePanel       = RClass.register(o, new AStyle('_stylePanel'));
   o._itemPool         = null;
   o._hForm            = null;
   o.onBuildPanel      = FUiListView_onBuildPanel;
   o.construct         = FUiListView_construct;
   o.createItem        = FUiListView_createItem;
   o.appendChild       = FUiListView_appendChild;
   o.doClickItem       = FUiListView_doClickItem;
   o.doDoubleClickItem = FUiListView_doDoubleClickItem;
   o.clear             = FUiListView_clear;
   o.dispose           = FUiListView_dispose;
   return o;
}
function FUiListView_onBuildPanel(p){
   var o = this;
   o._hPanel = RBuilder.createDiv(p, o.styleName('Panel'));
}
function FUiListView_construct(){
   var o = this;
   o.__base.FUiContainer.construct.call(o);
   o._itemPool = RClass.create(FObjectPool);
}
function FUiListView_createItem(clazz, pi, pl){
   var o = this;
   var item = o._itemPool.alloc();
   if(!item){
      if(clazz){
         item = RClass.create(clazz);
      }else{
         item = RClass.create(FUiListViewItem);
      }
      item.build(o._hPanel);
   }
   return item;
}
function FUiListView_appendChild(p){
   var o = this;
   o._hPanel.appendChild(p._hPanel);
}
function FUiListView_doClickItem(p){
   var o = this;
   var s = o._components;
   if(s){
      var c = s.count();
      for(var i = 0; i < c; i++){
         var m = s.value(i);
         if(RClass.isClass(m, FUiListViewItem)){
            m.setChecked(m == p);
         }
      }
   }
   var e = new SClickEvent(o);
   e.item = p;
   o.processClickListener(e);
   e.dispose();
}
function FUiListView_doDoubleClickItem(p){
   var o = this;
   var s = o._components;
   if(s){
      var c = s.count();
      for(var i = 0; i < c; i++){
         var m = s.value(i);
         if(RClass.isClass(m, FUiListViewItem)){
            m.setChecked(m == p);
         }
      }
   }
   var e = new SClickEvent(o);
   e.item = p;
   o.processDoubleClickListener(e);
   e.dispose();
}
function FUiListView_clear(){
   var o = this;
   var cs = o._components;
   if(cs){
      var c = cs.count();
      for(var i = 0; i < c; i++){
         var m = cs.value(i);
         if(RClass.isClass(m, FUiListViewItem)){
            o._hPanel.removeChild(m._hPanel);
            o._itemPool.free(m)
         }else{
            m.dispose();
         }
      }
      cs.clear();
      o._controls.clear();
   }
}
function FUiListView_dispose(){
   var o = this;
   o.__base.FContainer.dispose.call(o);
}
function FUiListViewItem(o){
   o = RClass.inherits(this, o, FUiControl);
   o._stylePanel     = RClass.register(o, new AStyle('_stylePanel'));
   o._styleNormal    = RClass.register(o, new AStyle('_styleNormal'));
   o._styleHover     = RClass.register(o, new AStyle('_styleHover'));
   o._styleSelect    = RClass.register(o, new AStyle('_styleSelect'));
   o._styleContent   = RClass.register(o, new AStyle('_styleContent'));
   o._styleIconPanel = RClass.register(o, new AStyle('_styleIconPanel'));
   o._styleIcon      = RClass.register(o, new AStyle('_styleIcon'));
   o._styleLabel     = RClass.register(o, new AStyle('_styleLabel'));
   o._checked        = false;
   o._contentHeight  = 28;
   o._hPanel         = null;
   o._hBorder        = null;
   o._hForm          = null;
   o._hContentForm   = null;
   o._hContentLine   = null;
   o._hIconPanel     = null;
   o._hIcon          = null;
   o._hLabel         = null;
   o.onBuildPanel    = FUiListViewItem_onBuildPanel;
   o.onBuild         = FUiListViewItem_onBuild;
   o.onEnter         = FUiListViewItem_onEnter;
   o.onLeave         = FUiListViewItem_onLeave;
   o.onClick         = RClass.register(o, new AEventClick('onClick'), FUiListViewItem_onClick);
   o.onDoubleClick   = RClass.register(o, new AEventDoubleClick('onDoubleClick'), FUiListViewItem_onDoubleClick);
   o.label           = FUiListViewItem_label;
   o.setLabel        = FUiListViewItem_setLabel;
   o.setChecked      = FUiListViewItem_setChecked;
   o.dispose         = FUiListViewItem_dispose;
   return o;
}
function FUiListViewItem_onBuildPanel(p){
   var o = this;
   o._hPanel = RBuilder.createDiv(p, o.styleName('Panel'));
}
function FUiListViewItem_onBuild(p){
   var o = this;
   o.__base.FUiControl.onBuild.call(o, p);
   var h = o._hPanel;
   var hBorder = o._hBorder = RBuilder.appendDiv(h, o.styleName('Normal'));
   var hTable = o._hForm = RBuilder.appendTable(hBorder);
   hTable.style.width = '100%';
   hTable.style.height = '100%';
   var hLine1 = RBuilder.appendTableRowCell(hTable)
   var hLine2 = RBuilder.appendTableRowCell(hTable)
   hLine2.height = o._contentHeight;
   var hContentForm = o._hContentForm = RBuilder.appendTable(hLine2, o.styleName('Content'));
   var hContentLine = o._hContentLine = RBuilder.appendTableRow(hContentForm);
   o._hIconPanel = RBuilder.appendTableCell(hContentLine, o.styleName('IconPanel'))
   if(o._icon){
      o._hIcon = RBuilder.appendIcon(o._hIconPanel, o.styleName('Icon'), o._icon);
   }
   o._hLabel = RBuilder.appendTableCell(hContentLine, o.styleName('Label'));
   if(o._label){
      o.setLabel(o._label);
   }
   o.attachEvent('onClick', h);
   o.attachEvent('onDoubleClick', h);
}
function FUiListViewItem_onEnter(){
   var o = this;
   o.__base.FUiControl.onEnter.call(o);
   o._hBorder.className = RBoolean.parse(o._checked) ? o.styleName('Select') : o.styleName('Hover');
}
function FUiListViewItem_onLeave(){
   var o = this;
   o._hBorder.className = RBoolean.parse(o._checked) ? o.styleName('Select') : o.styleName('Normal');
   o.__base.FUiControl.onLeave.call(o);
}
function FUiListViewItem_onClick(p){
   var o = this;
   o._parent.doClickItem(o);
}
function FUiListViewItem_onDoubleClick(p){
   var o = this;
   o._parent.doDoubleClickItem(o);
}
function FUiListViewItem_label(p){
   return this._label;
}
function FUiListViewItem_setLabel(p){
   var o = this;
   o._label = p;
   o._hLabel.innerHTML = RString.nvl(p);
}
function FUiListViewItem_setChecked(p){
   var o = this;
   o._checked = p;
   if(o._hIcon){
      o._hIcon.style.display = p ? 'block' : 'none';
   }else{
      o._hIconPanel.innerHTML = p ? 'O' : '';
   }
   o._hBorder.className = p ? o.styleName('Select') : o.styleName('Normal');
}
function FUiListViewItem_dispose(){
   var o = this;
   o._hPanel = RHtml.free(o._hPanel);
   o._hBorder = RHtml.free(o._hBorder);
   o._hForm = RHtml.free(o._hForm);
   o._hContentForm = RHtml.free(o._hContentForm);
   o._hContentLine = RHtml.free(o._hContentLine);
   o._hIconPanel = RHtml.free(o._hIconPanel);
   o._hIcon = RHtml.free(o._hIcon);
   o._hLabel = RHtml.free(o._hLabel);
   o.__base.FUiControl.dispose.call(o);
}
function FUiMemo(o){
   o = RClass.inherits(this, o, FUiEditControl, MPropertyEdit, MListenerDataChanged);
   o._inputSize       = RClass.register(o, new APtySize2('_inputSize'));
   o._styleValuePanel = RClass.register(o, new AStyle('_styleValuePanel'));
   o._styleInputPanel = RClass.register(o, new AStyle('_styleInputPanel'));
   o._styleInput      = RClass.register(o, new AStyle('_styleInput'));
   o._hValueForm      = null;
   o._hValueLine      = null;
   o._hInputPanel     = null;
   o._hInput          = null;
   o.onBuildEditValue = FUiMemo_onBuildEditValue;
   o.onInputEdit      = RClass.register(o, new AEventInputChanged('onInputEdit'), FUiMemo_onInputEdit);
   o.construct        = FUiMemo_construct;
   o.formatDisplay    = FUiMemo_formatDisplay;
   o.formatValue      = FUiMemo_formatValue;
   o.get              = FUiMemo_get;
   o.set              = FUiMemo_set;
   o.refreshValue     = FUiMemo_refreshValue;
   return o;
}
function FUiMemo_onBuildEditValue(p){
   var o = this;
   var hp = o._hValuePanel;
   hp.className = o.styleName('ValuePanel');
   var hf = o._hValueForm = RBuilder.appendTable(hp);
   hf.width = '100%';
   var hl = o._hValueLine = RBuilder.appendTableRow(hf);
   o._hChangePanel = RBuilder.appendTableCell(hl);
   o.onBuildEditChange(p);
   var hep = o._hInputPanel = RBuilder.appendTableCell(hl);
   var he = o._hInput = RBuilder.append(hep, 'TEXTAREA', o.styleName('Input'));
   o.attachEvent('onInputEdit', he, o.onInputEdit);
   RHtml.setSize(hep, o._inputSize);
   if(o._editLength){
      he.maxLength = o._editLength;
   }
}
function FUiMemo_onInputEdit(p){
   var o = this;
   var v = o._hInput.value;
   o.refreshValue();
}
function FUiMemo_construct(){
   var o = this;
   o.__base.FUiEditControl.construct.call(o);
   o._inputSize = new SSize2(120, 0);
}
function FUiMemo_formatDisplay(p){
   var o = this;
   var r = RString.nvl(p);
   o._dataDisplay = r;
   return r;
}
function FUiMemo_formatValue(p){
   return p;
}
function FUiMemo_get(){
   var o = this;
   var r = o.__base.FUiEditControl.get.call(o);
   var r = o._hInput.value;
   return r;
}
function FUiMemo_set(p){
   var o = this;
   o.__base.FUiEditControl.set.call(o, p);
   o._hInput.value = RString.nvl(p);
}
function FUiMemo_refreshValue(){
   var o = this;
   o.processDataChangedListener(o);
}
function FUiNumber(o){
   o = RClass.inherits(this, o, FUiEditControl, MListenerDataChanged, MPropertyNumber);
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
   o.formatDisplay     = FUiNumber_formatDisplay;
   o.formatValue       = FUiNumber_formatValue;
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
   if(!RKeyboard.isFloatKey(c)){
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
   o._editSize.set(100, 20);
   o._inputSize = new SSize2(80, 0);
}
function FUiNumber_formatDisplay(p){
   var o = this;
   var r = o._dataDisplay = RFloat.format(p, 0, null, o._valuePrecision, null);
   return r;
}
function FUiNumber_formatValue(p){
   return p;
}
function FUiNumber_get(p){
   var o = this;
   var r = o.__base.FUiEditControl.get.call(o, p);
   var h = o._hInput;
   if(h){
      r = o.formatValue(h.value);
   }
   return r;
}
function FUiNumber_set(p){
   var o = this;
   o.__base.FUiEditControl.set.call(o, p);
   var v = RString.nvl(p, '0');
   o._innerOriginValue = v;
   o._innerDataValue = v;
   var h = o._hInput;
   if(h){
      h.value = o.formatDisplay(p);
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
function FUiNumber2(o){
   o = RClass.inherits(this, o, FUiEditControl);
   o._inputSize       = RClass.register(o, new APtySize2('_inputSize'));
   o._styleInputPanel = RClass.register(o, new AStyle('_styleInputPanel'));
   o._styleInput      = RClass.register(o, new AStyle('_styleInput'));
   o._hInput          = null;
   o.onBuildEditValue = FUiNumber2_onBuildEditValue;
   o.construct        = FUiNumber2_construct;
   o.get              = FUiNumber2_get;
   o.set              = FUiNumber2_set;
   return o;
}
function FUiNumber2_oeDataLoad(p){
   var o = this;
   alert(p);
   return EEventStatus.Stop;
}
function FUiNumber2_oeDataSave(p){
   var o = this;
   return EEventStatus.Stop;
}
function FUiNumber2_onBuildEditValue(p){
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
function FUiNumber2_construct(){
   var o = this;
   o.__base.FUiEditControl.construct.call(o);
   o._inputSize = new SSize2(120, 0);
}
function FUiNumber2_get(p){
   var o = this;
   var r = o.__base.FUiEditControl.get.call(o, p);
   var h = o._hInput;
   if(h){
      r = h.value;
   }
   return r;
}
function FUiNumber2_set(p){
   var o = this;
   o.__base.FUiEditControl.set.call(o, p);
   var h = o._hInput;
   if(h){
      h.value = RString.nvl(p);
   }
}
function FUiNumber2_onDataKeyDown(s, e){
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
function FUiNumber2_formatValue(v){
   var o = this;
   var r = RString.nvl(v);
   if(ECase.Upper == o.editCase){
      r = RString.toUpper(r);
   }else if(ECase.Lower == o.editCase){
      r = RString.toLower(r);
   }
   return r;
}
function FUiNumber2_setText(t){
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
function FUiNumber2_validText(t){
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
function FUiNumber2_findEditor(){
   var o = this;
   if(o.editComplete){
      var de = o.editor;
      if(!de){
         o.dsControl = o.topControl(MDataset);
         if(o.dsControl){
            de = o.editor = RConsole.find(FUiNumber2Console).focus(o, FUiNumber2Editor);
         }
      }
      if(de){
         de.linkControl(o);
      }
      return o.editor;
   }
}
function FUiNumber2_drop(){
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
function FUiNumber2_clone(){
   var o = this;
   var r = o._class.newInstance();
   GHtml_clone(r, o.hPanel);
   return r;
}
function FUiNumber2_link(){
   var o = this;
}
function FUiNumber3(o){
   o = RClass.inherits(this, o, FUiEditControl, MListenerDataChanged);
   o._inputSize        = RClass.register(o, new APtySize2('_inputSize'));
   o._styleValuePanel  = RClass.register(o, new AStyle('_styleValuePanel'));
   o._styleInputPanel  = RClass.register(o, new AStyle('_styleInputPanel'));
   o._styleInput       = RClass.register(o, new AStyle('_styleInput'));
   o._innerOriginValue = null;
   o._innerDataValue   = null;
   o._hInput           = null;
   o.onBuildEditInput  = FUiNumber3_onBuildEditInput;
   o.onBuildEditValue  = FUiNumber3_onBuildEditValue;
   o.onInputKeyPress   = RClass.register(o, new AEventKeyPress('onInputKeyPress'), FUiNumber3_onInputKeyPress);
   o.onInputChanged    = RClass.register(o, new AEventInputChanged('onInputChanged'), FUiNumber3_onInputChanged);
   o.construct         = FUiNumber3_construct;
   o.get               = FUiNumber3_get;
   o.set               = FUiNumber3_set;
   return o;
}
function FUiNumber3_onBuildEditInput(p, h){
   var o = this;
   o.attachEvent('onInputKeyPress', h, o.onInputKeyPress);
   o.attachEvent('onInputChanged', h, o.onInputChanged);
}
function FUiNumber3_onBuildEditValue(p){
   var o = this;
   var h = o._hValuePanel;
   h.className = o.styleName('ValuePanel');
   var hf = o._hValueForm = RBuilder.appendTable(h);
   var hr = RBuilder.appendTableRow(hf);
   o._hChangePanel = RBuilder.appendTableCell(hr);
   o.onBuildEditChange(p);
   var hc = RBuilder.appendTableCell(hr, o.styleName('InputPanel'));
   hc.style.borderRight = '1px solid #666666';
   var he = o._hInput1 = RBuilder.appendEdit(hc, o.styleName('Input'));
   o.onBuildEditInput(p, he)
   var hc = RBuilder.appendTableCell(hr, o.styleName('InputPanel'));
   hc.style.borderLeft = '1px solid #999999';
   hc.style.borderRight = '1px solid #666666';
   var he = o._hInput2 = RBuilder.appendEdit(hc, o.styleName('Input'));
   o.onBuildEditInput(p, he)
   var hc = RBuilder.appendTableCell(hr, o.styleName('InputPanel'));
   hc.style.borderLeft = '1px solid #999999';
   var he = o._hInput3 = RBuilder.appendEdit(hc, o.styleName('Input'));
   o.onBuildEditInput(p, he)
}
function FUiNumber3_onInputKeyPress(p){
   var o = this;
   var c = p.keyCode;
   if(!EKeyCode.floatCodes[c]){
      p.cancel();
   }
}
function FUiNumber3_onInputChanged(p){
   var o = this;
   o.processDataChangedListener(o);
}
function FUiNumber3_construct(){
   var o = this;
   o.__base.FUiEditControl.construct.call(o);
   o._inputSize = new SSize2(120, 0);
   o._innerOriginValue = new SPoint3();
   o._innerDataValue = new SPoint3();
}
function FUiNumber3_get(p){
   var o = this;
   o.__base.FUiEditControl.get.call(o, p);
   var v = o._innerDataValue;
   var h = o._hInput1;
   if(h){
      v.x = RFloat.parse(h.value);
   }
   var h = o._hInput2;
   if(h){
      v.y = RFloat.parse(h.value);
   }
   var h = o._hInput3;
   if(h){
      v.z = RFloat.parse(h.value);
   }
   return v;
}
function FUiNumber3_set(p){
   var o = this;
   o.__base.FUiEditControl.set.call(o, p);
   var a = arguments;
   var vo = o._innerOriginValue
   var vd = o._innerDataValue;
   if(a.length == 1){
      if((p.constructor == SPoint3) || (p.constructor == SVector3)){
         vo.assign(p);
         vd.assign(p);
      }else{
         throw new TError('Invalid value format.');
      }
   }else if(a.length == 3){
      vo.set(a[0], a[1], a[2]);
      vd.assign(vo);
   }else{
      throw new TError('Invalid value format.');
   }
   var h = o._hInput1;
   if(h){
      h.value = RFloat.format(vd.x, 0, null, 3, null);
   }
   var h = o._hInput2;
   if(h){
      h.value = RFloat.format(vd.y, 0, null, 3, null);
   }
   var h = o._hInput3;
   if(h){
      h.value = RFloat.format(vd.z, 0, null, 3, null);
   }
   o.changeSet(false);
}
function FUiNumber3_onDataKeyDown(s, e){
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
function FUiNumber3_formatValue(v){
   var o = this;
   var r = RString.nvl(v);
   if(ECase.Upper == o.editCase){
      r = RString.toUpper(r);
   }else if(ECase.Lower == o.editCase){
      r = RString.toLower(r);
   }
   return r;
}
function FUiNumber3_setText(t){
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
function FUiNumber3_validText(t){
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
function FUiNumber3_findEditor(){
   var o = this;
   if(o.editComplete){
      var de = o.editor;
      if(!de){
         o.dsControl = o.topControl(MDataset);
         if(o.dsControl){
            de = o.editor = RConsole.find(FUiNumber3Console).focus(o, FUiNumber3Editor);
         }
      }
      if(de){
         de.linkControl(o);
      }
      return o.editor;
   }
}
function FUiNumber3_drop(){
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
function FUiNumber3_clone(){
   var o = this;
   var r = o._class.newInstance();
   GHtml_clone(r, o.hPanel);
   return r;
}
function FUiNumber3_link(){
   var o = this;
}
function FUiNumber4(o){
   o = RClass.inherits(this, o, FUiEditControl);
   o._inputSize       = RClass.register(o, new APtySize2('_inputSize'));
   o._styleInputPanel = RClass.register(o, new AStyle('_styleInputPanel'));
   o._styleInput      = RClass.register(o, new AStyle('_styleInput'));
   o._hInput          = null;
   o.onBuildEditValue = FUiNumber4_onBuildEditValue;
   o.construct        = FUiNumber4_construct;
   o.get              = FUiNumber4_get;
   o.set              = FUiNumber4_set;
   return o;
}
function FUiNumber4_oeDataLoad(p){
   var o = this;
   alert(p);
   return EEventStatus.Stop;
}
function FUiNumber4_oeDataSave(p){
   var o = this;
   return EEventStatus.Stop;
}
function FUiNumber4_onBuildEditValue(p){
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
function FUiNumber4_construct(){
   var o = this;
   o.__base.FUiEditControl.construct.call(o);
   o._inputSize = new SSize2(120, 0);
}
function FUiNumber4_get(p){
   var o = this;
   var r = o.__base.FUiEditControl.get.call(o, p);
   var h = o._hInput;
   if(h){
      r = h.value;
   }
   return r;
}
function FUiNumber4_set(p){
   var o = this;
   o.__base.FUiEditControl.set.call(o, p);
   var h = o._hInput;
   if(h){
      h.value = RString.nvl(p);
   }
}
function FUiNumber4_onDataKeyDown(s, e){
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
function FUiNumber4_formatValue(v){
   var o = this;
   var r = RString.nvl(v);
   if(ECase.Upper == o.editCase){
      r = RString.toUpper(r);
   }else if(ECase.Lower == o.editCase){
      r = RString.toLower(r);
   }
   return r;
}
function FUiNumber4_setText(t){
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
function FUiNumber4_validText(t){
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
function FUiNumber4_findEditor(){
   var o = this;
   if(o.editComplete){
      var de = o.editor;
      if(!de){
         o.dsControl = o.topControl(MDataset);
         if(o.dsControl){
            de = o.editor = RConsole.find(FUiNumber4Console).focus(o, FUiNumber4Editor);
         }
      }
      if(de){
         de.linkControl(o);
      }
      return o.editor;
   }
}
function FUiNumber4_drop(){
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
function FUiNumber4_clone(){
   var o = this;
   var r = o._class.newInstance();
   GHtml_clone(r, o.hPanel);
   return r;
}
function FUiNumber4_link(){
   var o = this;
}
function FUiPanel(o){
   o = RClass.inherits(this, o, FUiLayout, MUiDesign, MUiFocus);
   o._sizeCd      = EUiSize.Horizontal;
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
function FUiPicture(o){
   o = RClass.inherits(this, o, FEditControl, MEditBorder, MDescEdit);
   o.storeType         = RClass.register(o, new TPtyStr('storeType'));
   o.storeCode         = RClass.register(o, new TPtyStr('storeCode'));
   o.storeName         = RClass.register(o, new TPtyStr('storeName'));
   o.editAdjust        = RClass.register(o, new TPtyInt('editAdjust'));
   o.editMaxWidth      = RClass.register(o, new TPtyInt('editMaxWidth'));
   o.editMaxHeight     = RClass.register(o, new TPtyInt('editMaxHeight'));
   o.__seed            = 0;
   o.attributes        = null;
   o.border            = null;
   o.borderStyle       = EUiBorder.Round;
   o.onUploadMouseDown = RClass.register(o, new HMouseDown('onUploadMouseDown'), FUiPicture_onUploadMouseDown);
   o.onFileUploaded    = FUiPicture_onFileUploaded;
   o.onBuildEdit       = FUiPicture_onBuildEdit;
   o.construct         = FUiPicture_construct;
   o.makeIconPath      = FUiPicture_makeIconPath;
   o.setText           = FUiPicture_setText;
   o.setEditable       = FUiPicture_setEditable;
   o.dispose           = FUiPicture_dispose;
   return o;
}
function FUiPicture_onUploadMouseDown(e){
   var o = this;
   if(o._editable && !o._disbaled){
      var uw = RConsole.find(FUploadConsole).findWindow();
      uw.lsnsUploaded.register(o, o.onFileUploaded);
      uw.typeCode = 'P';
      uw.fileEdit = false;
      uw.recordCode = o.recordCode;
      uw.recordGuid = o.recordGuid;
      uw.recordName = o.recordName;
      uw.guid = o.guid;
      uw.adjustWidth = o.editWidth;
      uw.adjustHeight = o.editHeight;
      uw.show();
   }
}
function FUiPicture_onFileUploaded(s, g){
   var o = this;
   var as = g.attributes;
   o.guid = as.get('GUID');
   o.mime = as.get('MIME');
   o.networkCode = as.get('NETWORK_CODE')
   o.hImage.src = o.makeIconPath(o.guid, o.mime, o.networkCode) + '?' + RDate.format() + (++o.__seed);
   o.hImage.style.display = 'block';
}
function FUiPicture_onBuildEdit(b){
   var o = this;
   var hif = o.hImageForm = o.hEdit = RBuilder.appendTable(b.hPanel);
   hif.width = '100%';
   hif.border = 1;
   hif.height = '100%';
   var hc = o.hImagePanel = hif.insertRow().insertCell();
   hc.align = 'center';
   hc.style.cursor = 'hand';
   o.attachEvent('onUploadMouseDown', o.hImagePanel);
   var h = o.hImage = RBuilder.append(hc, 'IMAGE');
   h.style.border = '1 solid #CCCCCC';
   h.style.display = 'none';
   if(o.left>0 && o.top>0){
      o.hPanel.style.position = 'absolute';
   }
}
function FUiPicture_construct(){
   var o = this;
   o.base.FEditControl.construct.call(o);
   o.attributes = new TAttributes();
}
function FUiPicture_makeIconPath(g, m, sc){
   var o = this;
   var s = o.recordCode + '/' + o.recordGuid + '/' + g + '.icon.' + m;
   return top.RContext.context('/svr/' + sc.toLowerCase() + '/sys/' + RString.toLower(s));
}
function FUiPicture_setText(t){
   var o = this;
   var as = o.attributes;
   as.clear();
   var v = false;
   if(!RString.isEmpty(t)){
      as.unpack(t);
      o.networkCode = as.get('nc');
      o.recordCode = as.get('code');
      o.recordGuid = as.get('guid');
      o.recordName = as.get('name');
      o.guid = as.get('ogid');
      o.mime = as.get('mime');
      if(o.guid && o.mime){
         v = true;
         o.hImage.src = o.makeIconPath(o.guid, o.mime, o.networkCode);
      }
   }
   o.hImage.style.display = v ? 'block' : 'none';
}
function FUiPicture_setEditable(v){
   var o = this;
   o.base.FEditControl.setEditable.call(o, v);
   if(v){
      o.hImagePanel.style.cursor = 'hand';
   }else{
      o.hImagePanel.style.cursor = 'normal';
   }
}
function FUiPicture_dispose(){
   var o = this;
   o.base.FEditControl.dispose.call(o);
   o.hImage = null;
}
function FUiProgressBar(o){
   o = RClass.inherits(this, o, FUiControl);
   o._stylePanel  = RClass.register(o, new AStyle('_stylePanel'));
   o._rate        = 0;
   o._hForm       = null;
   o.onBuildPanel = FUiProgressBar_onBuildPanel;
   o.onBuild      = FUiProgressBar_onBuild;
   o.get          = FUiProgressBar_get;
   o.set          = FUiProgressBar_set;
   o.dispose      = FUiProgressBar_dispose;
   return o;
}
function FUiProgressBar_onBuildPanel(event){
   var o = this;
   o._hPanel = RBuilder.createTable(event, o.styleName('Panel'));
}
function FUiProgressBar_onBuild(event){
   var o = this;
   o.__base.FUiControl.onBuild.call(o, event);
   var hLine = o._hLine = RBuilder.appendTableRow(o._hPanel);
   o.hProgress = RBuilder.appendTableCell(hLine);
   o.hEmpty = RBuilder.appendTableCell(hLine);
}
function FUiProgressBar_get(){
   return this._rate;
}
function FUiProgressBar_set(value){
   var o = this;
   o._rate = value;
   return;
   var htb = o.hPanelForm;
   if(!RString.isEmpty(value)){
      htb.innerText = '';
      htb.style.tableLayout  = 'fixed';
      htb.height = 10;
      var hr = htb.insertRow();
      var v = RFloat.parse(RString.nvl(value));
      v = v * 100;
      v = v + "%";
      var hc1 = hr.insertCell();
      hc1.style.width = v;
      hc1.style.backgroundColor = '#29BAD5';
      var hc2 = hr.insertCell();
      htb.title  = v;
   }
}
function FUiProgressBar_dispose(){
   var o = this;
   o._hForm = RHtml.free(o._hForm);
   o.__base.FUiControl.dispose.call(o);
}
function FUiRadio(o){
   o = RClass.inherits(this, o, FEditControl);
   o._groupName       = RClass.register(o, new APtyString('_groupName'));
   o._styleInput      = RClass.register(o, new AStyle('_styleInput', 'Input'));
   o._hInput          = null;
   o.onBuildEditValue = FUiRadio_onBuildEditValue;
   return o;
}
function FUiRadio_onBuildEditValue(p){
   var o = this;
   o._hInput = RBuilder.appendRadio(o._hValuePanel, o.styleName('Input'));
}
function FUiRadio_clearValue(){
   this.hEdit.checked = false;
}
function FUiRadio_resetValue(){
   this.hEdit.checked = this._editChecked;
}
function FUiRadio_saveValue(vs){
   var o = this;
   if(o.hEdit.checked){
      vs.set(o.dataName, o.dataDefault);
   }
}
function FUiRadio_text(){
   return this.hEdit.checked ? this.dataDefault : '';
}
function FUiRadio_setText(t){
   this.hEdit.checked = (this.dataDefault == t);
}
function FUiRadio_refreshStyle(){
   var o = this;
   var h = o.panel(EPanel.Edit);
   h.disabled = !o._editable;
   h.style.cursor = o._editable? 'hand':'normal';
}
function FUiSelect(o){
   o = RClass.inherits(this, o, FUiEditControl, MUiContainer, MPropertySelect, MListenerDataChanged);
   o._styleValuePanel = RClass.register(o, new AStyle('_styleValuePanel'));
   o._styleInput      = RClass.register(o, new AStyle('_styleInput'));
   o._hValueForm      = null;
   o._hValueLine      = null;
   o._hInputPanel     = null;
   o._hInput          = null;
   o.onBuildEditValue = FUiSelect_onBuildEditValue;
   o.onDoubleClick    = RClass.register(o, new AEventDoubleClick('onDoubleClick'), FUiSelect_onDropClick);
   o.onDropClick      = FUiSelect_onDropClick;
   o.onKeyDown        = RClass.register(o, new AEventKeyDown('onKeyDown'), FUiSelect_onKeyDown);
   o.construct        = FUiSelect_construct;
   o.findItemByLabel  = FUiSelect_findItemByLabel;
   o.findItemByData   = FUiSelect_findItemByData;
   o.formatValue      = FUiSelect_formatValue;
   o.formatDisplay    = FUiSelect_formatDisplay;
   o.get              = FUiSelect_get;
   o.set              = FUiSelect_set;
   o.selectItem       = FUiSelect_selectItem;
   o.refreshValue     = FUiSelect_refreshValue;
   o.drop             = FUiSelect_drop;
   o.dispose          = FUiSelect_dispose;
   return o;
}
function FUiSelect_onBuildEditValue(p){
   var o = this;
   var hp = o._hValuePanel;
   hp.className = o.styleName('ValuePanel');
   var hf = o._hValueForm = RBuilder.appendTable(hp);
   hf.width = '100%';
   var hl = o._hValueLine = RBuilder.appendTableRow(hf);
   o._hChangePanel = RBuilder.appendTableCell(hl);
   o.onBuildEditChange(p);
   var hep = o._hInputPanel = RBuilder.appendTableCell(hl);
   var he = o._hInput = RBuilder.appendEdit(hep, o.styleName('Input'));
   o.attachEvent('onDoubleClick', he);
   o.attachEvent('onKeyDown', he);
   if(o._editLength){
      he.maxLength = o._editLength;
   }
   var hdp = o._hDropPanel = RBuilder.appendTableCell(hl);
   hdp.style.borderLeft = '1px solid #666666';
   o.onBuildEditDrop(p);
   var c = o._emptyItem = RClass.create(FUiSelectItem);
   c.build(p);
   o.push(c);
}
function FUiSelect_onDropClick(p){
   this.drop();
}
function FUiSelect_onKeyDown(p){
   var o = this;
   var e = o._editor;
   if(e && e._statusEditing && (e._source == o)){
      e.onEditKeyDown(p);
      return;
   }
   if(p.keyCode == EKeyCode.Down){
      o.drop();
   }
}
function FUiSelect_construct(){
   var o = this;
   o.__base.FUiEditControl.construct.call(o);
}
function FUiSelect_findItemByLabel(p){
   var o = this;
   var s = o._components;
   if(s){
      for(var i = s.count() - 1; i >= 0; i--){
         var c = s.valueAt(i);
         if(RString.equals(c._label, p, true)){
            return c;
         }
      }
   }
   return null;
}
function FUiSelect_findItemByData(p){
   var o = this;
   var s = o._components;
   if(s){
      for(var i = s.count() - 1; i >= 0; i--){
         var c = s.valueAt(i);
         if(RString.equals(c._dataValue, p, true)){
            return c;
         }
      }
   }
   return null;
}
function FUiSelect_formatValue(p){
   var o = this;
   var c = o.findItemByLabel(p);
   if(c){
      return RString.nvl(c._dataValue);
   }
   return p;
}
function FUiSelect_formatDisplay(p){
   var o = this;
   var c = o.findItemByData(p);
   if(c){
      return RString.nvl(c._label);
   }
   return p;
}
function FUiSelect_get(){
   var o = this;
   var s = o._hInput.value;
   var v = o.formatValue(s);
   return v;
}
function FUiSelect_set(p){
   var o = this;
   var t = o.formatDisplay(p);
   o._hInput.value = RString.nvl(t);
}
function FUiSelect_selectItem(p){
   var o = this;
   o._hInput.value = RString.nvl(p.label());
   o.refreshValue();
}
function FUiSelect_refreshValue(){
   var o = this;
   o.processDataChangedListener(o);
}
function FUiSelect_drop(){
   var o = this;
   if(o.hasComponent()){
      var e = o._editor = RConsole.find(FEditorConsole).focus(o, FUiSelectEditor, o._name);
      e.buildItems(o);
      e.set(o.get());
      e.show();
   }
}
function FUiSelect_dispose(){
   var o = this;
   o.__base.FUiEditControl.dispose.call(o);
}
function FUiSelect_onEditEnd(e){
   var o = this;
   if(e){
      o.set(e.get());
      o._invalidText = o.validText(o.text());
      o.refreshStyle();
   }
   o.onDataEditEnd(o);
}
function FUiSelect_loadConfig(c){
   var o = this;
   o.__base.FUiEditControl.loadConfig.call(o, c);
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
function FUiSelect_refreshStyle(){
   var o = this;
   o.__base.FUiEditControl.refreshStyle.call(o);
   if(!o.editCheck){
      o.hEdit.readOnly = 'true';
   }
}
function FUiSelect_doBlur(){
   var o = this;
   o.__base.FUiEditControl.doBlur.call(o);
   if(o._editor){
      o._editor.hide();
   }
}
function FUiSelectEditor(o){
   o = RClass.inherits(this, o, FUiDropEditor, MListenerItemClick);
   o._items         = null;
   o._position      = null;
   o._hDropLayout   = null;
   o._hItemsForm    = null;
   o.onBuildDrop   = FUiSelectEditor_onBuildDrop;
   o.onItemClick   = FUiSelectEditor_onItemClick;
   o.onEditKeyDown = FUiSelectEditor_onEditKeyDown;
   o.onEditEnd     = FUiSelectEditor_onEditEnd;
   o.construct     = FUiSelectEditor_construct;
   o.testBlur      = FUiSelectEditor_testBlur;
   o.buildItems    = FUiSelectEditor_buildItems;
   o.clearItems    = FUiSelectEditor_clearItems;
   o.get           = FUiSelectEditor_get;
   o.set           = FUiSelectEditor_set;
   o.select        = FUiSelectEditor_select;
   o.fetch         = FUiSelectEditor_fetch;
   o.setVisible    = FUiSelectEditor_setVisible;
   o.dispose       = FUiSelectEditor_dispose;
   return o;
}
function FUiSelectEditor_onBuildDrop(){
   var o = this;
   var hl = o._hDropLayout = RBuilder.appendDiv(o._hDropPanel)
   var hf = o._hItemsForm = RBuilder.appendTable(hl);
   o._hItemsBody = RBuilder.append(hf, 'TBODY');
}
function FUiSelectEditor_onItemClick(p){
   var o = this;
   var s = o._source;
   o._position = o._items.indexOfValue(p);
   o.editEnd();
}
function FUiSelectEditor_onEditKeyDown(p){
   var o = this;
   switch(p.keyCode){
      case EKeyCode.Up:
         o.select(o._position - 1);
         break;
      case EKeyCode.Down:
         o.select(o._position + 1);
         break;
      case EKeyCode.Enter:
         o.editEnd();
         break;
      case EKeyCode.Esc:
         o.editCancel();
         break;
   }
}
function FUiSelectEditor_onEditEnd(){
   var o = this;
   var s = o._source;
   var c = o._items.value(o._position);
   s.selectItem(c);
   o.__base.FUiDropEditor.onEditEnd.call(o);
}
function FUiSelectEditor_construct(){
   var o = this;
   o.__base.FUiDropEditor.construct.call(o);
}
function FUiSelectEditor_testBlur(c){
   var o = this;
   if(o._source == c){
      return false;
   }
   return !this._items.contains(c);
}
function FUiSelectEditor_clearItems(){
   var o = this;
   var hb = o._hItemsBody;
   var cs = o._items;
   if(cs){
      for(var i = cs.count() - 1; i >= 0; i--){
         var ci = cs.value(i);
         ci.removeClickListener(o, o.onItemClick);
         hb.removeChild(ci._hPanel);
      }
   }
   o._position = 0;
}
function FUiSelectEditor_buildItems(p){
   var o = this;
   var hb = o._hItemsBody;
   var cs = p.components();
   if(cs == o._items){
      return;
   }else{
      o.clearItems();
   }
   var c = cs.count();
   for(var i = 0; i < c; i++){
      var ci = cs.value(i);
      ci.addClickListener(o, o.onItemClick);
      ci.setPanel(hb);
   }
   o._position = 0;
   o._items = cs;
}
function FUiSelectEditor_get(){
   var o = this;
   return o._items.get(o._position).value;
}
function FUiSelectEditor_set(v){
   var o = this;
   o._position = -1;
   var ps = o._items;
   var pc = ps.count();
   for(var i = 0; i < pc; i++){
      var p = ps.value(i);
      if(RString.equals(p._dataValue, v, true)){
         o._position = i;
         p.setChecked(true);
      }else{
         p.setChecked(false);
      }
   }
}
function FUiSelectEditor_select(p){
   var o = this;
   var s = o._items;
   var c = s.count();
   var n = RInteger.toRange(p, 0, c - 1);
   for(var i = 0; i < c; i++){
      s.value(i).setChecked(i == n);
   }
   o._position = n;
}
function FUiSelectEditor_fetch(){
   var o = this;
   if(!o.hasFetched){
      var g = new TCodeListServiceArg();
      var f = o._source.topControl(MDataset);
      g.values = f.getCurrentRows();
      g.name = o._source.editRefer;
      var doc = RConsole.find(FCodeListConsole).fetch(g);
      if(doc){
         var edt = o._source;
         edt._items.clear();
         edt._items.loadConfig(doc.root().nodes.get(0));
      }
      o.hasFetched = true;
   }
}
function FUiSelectEditor_setVisible(p){
   var o = this;
   o.__base.FUiDropEditor.setVisible.call(o, p);
   var hp = o._hPanel;
   var hif = o._hItemsForm;
   if(p){
      var s = o._source;
      var r = s.getValueRectangle(RValue.rectangle);
      hif.width = '';
      var iw = hif.offsetWidth;
      hp.style.left = r.left() + 'px';
      hp.style.top = r.bottom() + 'px';
      hp.style.width = Math.max(iw, r.width()) + 'px';
      hif.width = '100%';
      if(hif.offsetHeight > o._minHeight){
         o._hDropLayout.style.overflowY = 'scroll';
         o._hDropLayout.style.height = o._minHeight + 'px';
      }
   }
}
function FUiSelectEditor_dispose(){
   var o = this;
   o._hDropLayout = RHtml.free(o._hDropLayout);
   o._hItemsForm = RHtml.free(o._hItemsForm);
   o.__base.FUiDropEditor.dispose.call(o);
}
function FUiSelectItem(o){
   o = RClass.inherits(this, o, FUiControl, MListenerClick);
   o._icon             = RClass.register(o, new APtyString('_icon'));
   o._note             = RClass.register(o, new APtyString('_note'));
   o._dataValue        = RClass.register(o, new APtyString('_dataValue'));
   o._styleNormal      = RClass.register(o, new AStyle('_styleNormal'));
   o._styleHover       = RClass.register(o, new AStyle('_styleHover'));
   o._styleSelect      = RClass.register(o, new AStyle('_styleSelect'));
   o._styleIconChecked = RClass.register(o, new AStyle('_styleIcon'));
   o._styleLabel       = RClass.register(o, new AStyle('_styleLabel'));
   o._styleNote        = RClass.register(o, new AStyle('_styleNote'));
   o._checked          = false;
   o._hIconPanel       = null;
   o._hIcon            = null;
   o._hLabelPanel      = null;
   o._hNotePanel       = null;
   o.onBuildPanel      = FUiSelectItem_onBuildPanel;
   o.onBuild           = FUiSelectItem_onBuild;
   o.onEnter           = FUiSelectItem_onEnter;
   o.onLeave           = FUiSelectItem_onLeave;
   o.onMouseDown       = RClass.register(o, new AEventMouseDown('onMouseDown'), FUiSelectItem_onMouseDown);
   o.setChecked        = FUiSelectItem_setChecked;
   o.set               = FUiSelectItem_set;
   o.dispose           = FUiSelectItem_dispose;
   return o;
}
function FUiSelectItem_onBuildPanel(p){
   var o = this;
   o._hPanel = RBuilder.createTableRow(p, o.styleName("Normal"));
}
function FUiSelectItem_onBuild(p){
   var o = this;
   o.__base.FUiControl.onBuild.call(o, p);
   var h = o._hPanel;
   o.attachEvent('onMouseDown', h);
   var hp = o._hIconPanel = RBuilder.appendTableCell(h, o.styleName("Icon"));
   hp.width = 18;
   hp.align = 'center';
   var hp = o._hLabelPanel = RBuilder.appendTableCell(h, o.styleName("Label"));
   if(o._label){
      hp.innerHTML = o._label;
   }else{
      hp.innerHTML = '&nbsp;';
   }
   o._hNotePanel = RBuilder.appendTableCell(h, o.styleName("Note"));
}
function FUiSelectItem_onEnter(){
   var o = this;
   o.__base.FUiControl.onEnter.call(o);
   o._hPanel.className = RBoolean.parse(o._checked) ? o.styleName('Select') : o.styleName('Hover');
}
function FUiSelectItem_onLeave(){
   var o = this;
   o._hPanel.className = RBoolean.parse(o._checked) ? o.styleName('Select') : o.styleName('Normal');
   o.__base.FUiControl.onLeave.call(o);
}
function FUiSelectItem_onMouseDown(){
   var o = this;
   o.processClickListener(o);
}
function FUiSelectItem_setChecked(p){
   var o = this;
   o._checked = p;
   if(o._hIcon){
      o._hIcon.style.display = p ? 'block' : 'none';
   }else{
      o._hIconPanel.innerHTML = p ? 'O' : '';
   }
   o._hPanel.className = p ? o.styleName('Select') : o.styleName('Normal');
}
function FUiSelectItem_set(icon, label, value, note){
   var o = this;
   o._icon = RString.nvl(icon);
   if(!RString.isEmpty(o._icon)){
      o._hIcon = RBuilder.appendIcon(o._hIconPanel, o.styleIcon(o._icon));
   }
   o._label = RString.nvl(label);
   o._value = RString.nvl(value);
   o._note = RString.nvl(note);
   o._hLabelPanel.innerText = o._label;
   o._hNotePanel.innerText = o._note;
}
function FUiSelectItem_dispose(){
   var o = this;
   o._hIconPanel = RHtml.free(o._hIconPanel);
   o._hLabelPanel = RHtml.free(o._hLabelPanel);
   o._hNotePanel = RHtml.free(o._hNotePanel);
   o.__base.FUiControl.dispose.call(o);
}
function FUiSlideNumber(o){
   o = RClass.inherits(this, o, FUiEditControl, MPropertyNumber, MListenerDataChanged, MMouseCapture);
   o._inputSize          = RClass.register(o, new APtySize2('_inputSize'));
   o._styleSlidePanel    = RClass.register(o, new AStyle('_styleSlidePanel'));
   o._styleValuePanel    = RClass.register(o, new AStyle('_styleValuePanel'));
   o._styleInput         = RClass.register(o, new AStyle('_styleInput'));
   o._styleAdjustForm    = RClass.register(o, new AStyle('_styleAdjustForm'));
   o._styleUpPanel       = RClass.register(o, new AStyle('_styleUpPanel'));
   o._styleDownPanel     = RClass.register(o, new AStyle('_styleDownPanel'));
   o._innerOriginValue   = null;
   o._innerDataValue     = null;
   o._slide              = null;
   o._hInput             = null;
   o._iconUp             = null;
   o._iconDown           = null;
   o.onBuildEditValue    = FUiSlideNumber_onBuildEditValue;
   o.onMouseCaptureStart = FUiSlideNumber_onMouseCaptureStart;
   o.onMouseCapture      = FUiSlideNumber_onMouseCapture;
   o.onMouseCaptureStop  = FUiSlideNumber_onMouseCaptureStop;
   o.onSlideChange       = FUiSlideNumber_onSlideChange;
   o.onInputKeyPress     = RClass.register(o, new AEventKeyPress('onInputKeyPress'), FUiSlideNumber_onInputKeyPress);
   o.onInputEdit         = RClass.register(o, new AEventInputChanged('onInputEdit'), FUiSlideNumber_onInputEdit);
   o.onInputChange       = RClass.register(o, new AEventChange('onInputChange'), FUiSlideNumber_onInputChange);
   o.construct           = FUiSlideNumber_construct;
   o.get                 = FUiSlideNumber_get;
   o.set                 = FUiSlideNumber_set;
   o.setInputValue       = FUiSlideNumber_setInputValue;
   o.refreshValue        = FUiSlideNumber_refreshValue;
   return o;
}
function FUiSlideNumber_onBuildEditValue(p){
   var o = this;
   var hp = o._hValuePanel;
   hp.className = o.styleName('ValuePanel');
   var hf = o._hValueForm = RBuilder.appendTable(hp);
   hf.__linker = o;
   hf.width = '100%';
   var hl = o._hValueLine = RBuilder.appendTableRow(hf);
   o._hChangePanel = RBuilder.appendTableCell(hl);
   o.onBuildEditChange(p);
   var hsp = o._hSlidePanel = RBuilder.appendTableCell(hl, o.styleName('SlidePanel'));
   var b = o._slide = new SUiSlide();
   b.control = o;
   b.hPanel = hsp;
   b.setRange(o._valueMin, o._valueMax);
   b.onSlideChange = o.onSlideChange;
   b.build();
   var hep = o._hInputPanel = RBuilder.appendTableCell(hl);
   var he = o._hInput = RBuilder.appendEdit(hep, o.styleName('Input'));
   o.attachEvent('onInputKeyPress', he, o.onInputKeyPress);
   o.attachEvent('onInputEdit', he, o.onInputEdit);
   o.attachEvent('onInputChange', he, o.onInputChange);
   RHtml.setSize(hep, o._inputSize);
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
function FUiSlideNumber_onMouseCaptureStart(p){
   var o = this;
   var c = RHtml.searchObject(p.hSource, '__pcapture');
   if(c){
      c.onMouseDown(p);
   }
}
function FUiSlideNumber_onMouseCapture(p){
   var o = this;
   var c = RHtml.searchObject(p.hSource, '__pcapture');
   if(c){
      c.onMouseMove(p);
   }
}
function FUiSlideNumber_onMouseCaptureStop(p){
   var o = this;
   var c = RHtml.searchObject(p.hSource, '__pcapture');
   if(c){
      c.onMouseUp(p);
   }
}
function FUiSlideNumber_onSlideChange(p){
   var o = this;
   o.setInputValue(p);
   o.refreshValue();
}
function FUiSlideNumber_onInputKeyPress(p){
   var o = this;
   var c = p.keyCode;
   if(!RKeyboard.isFloatKey(c)){
      p.cancel();
   }
}
function FUiSlideNumber_onInputEdit(p){
   var o = this;
   var v = o._hInput.value;
   o._slide.set(v);
   o.refreshValue();
}
function FUiSlideNumber_onInputChange(p){
   var o = this;
   var v = o._hInput.value;
   o._slide.set(v);
   o.setInputValue(v);
   o.refreshValue();
}
function FUiSlideNumber_construct(){
   var o = this;
   o.__base.FUiEditControl.construct.call(o);
   o._inputSize = new SSize2(120, 0);
}
function FUiSlideNumber_get(p){
   var o = this;
   var v = o._hInput.value;
   var r = RFloat.parse(v);
   return RFloat.toRange(r, o._valueMin, o._valueMax);
}
function FUiSlideNumber_set(p){
   var o = this;
   o.__base.FUiEditControl.set.call(o, p);
   var v = RString.nvl(p, '0');
   o._innerOriginValue = v;
   o._innerDataValue = v;
   o._slide.set(v);
   o.setInputValue(v);
   o.changeSet(false);
}
function FUiSlideNumber_setInputValue(p){
   var o = this;
   var v = RFloat.parse(p);
   if(isNaN(v)){
      return;
   }
   v = RFloat.toRange(v, o._valueMin, o._valueMax);
   o._dataDisplay = RFloat.format(v, 0, null, 2, null);
   o._hInput.value = o._dataDisplay;
}
function FUiSlideNumber_refreshValue(){
   var o = this;
   o.processDataChangedListener(o);
}
function FUiSplit(o){
   o = RClass.inherits(this, o, FUiControl);
   return o;
}
function FUiSplit_onSplitMouseEnter(e){
   var o = this;
   if(o.hImage){
      o.hImage.src = RRes._iconPath(o.extended ? 'ctl.collapse_hvr' : 'ctl.expand_hvr');
   }
}
function FUiSplit_onSplitMouseLeave(e){
   var o = this;
   if(o.hImage){
      o.hImage.src = RRes._iconPath(o.extended ? 'ctl.collapse_nor' : 'ctl.expand_nor');
   }
}
function FUiSplit_onMouseDown(){
   var o = this;
   if(ESplitStyle.Normal == o._dispStyle){
      o.extend(!o.extended);
   }
}
function FUiSplit_onBuildPanel(){
   var o = this;
   o.hPanel = RBuilder.create(null, 'DIV');
   o.hForm = RBuilder.appendTable(o.hPanel);
   o.hForm.width = '100%';
}
function FUiSplit_oeBuild(e){
   var o = this;
   o.base.FUiControl.oeBuild.call(o, e);
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
      hc.style.background = 'url(' + RRes._iconPath('ctl.FUiSplit_Panel') + ')';
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
function FUiSplit_oeMode(e){
   var o = this;
   var r = o.base.FUiControl.oeMode.call(o, e);
   o.base.MDisplay.oeMode.call(o, e);
   o.extend(o._editExtend);
   return r;
}
function FUiSplit_construct(){
   var o = this;
   o.__lines = new TList();
}
function FUiSplit_extend(v){
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
function FUiSplit_pushLine(hr){
   this.__lines.push(hr);
}
function FUiSplit_dispose(){
   var o = this;
   o.base.FUiControl.dispose.call(o);
   if(o.__lines){
      o.__lines.release();
      o.__lines = null;
   }
   o.hForm = null;
   o.hText = null;
   o.hIcon = null;
   o.hImage = null;
}
function FUiTemplate(o){
   o = RClass.inherits(this, o, FUiEditControl, MPropertyEdit, MListenerDataChanged);
   o._inputSize       = RClass.register(o, new APtySize2('_inputSize'));
   o._unit            = RClass.register(o, new APtyString('_unit'));
   o._styleValuePanel = RClass.register(o, new AStyle('_styleValuePanel'));
   o._styleInputPanel = RClass.register(o, new AStyle('_styleInputPanel'));
   o._styleInput      = RClass.register(o, new AStyle('_styleInput'));
   o._hValueForm      = null;
   o._hValueLine      = null;
   o._hInputPanel     = null;
   o._hInput          = null;
   o.onBuildEditValue = FUiTemplate_onBuildEditValue;
   o.onInputEdit      = RClass.register(o, new AEventInputChanged('onInputEdit'), FUiTemplate_onInputEdit);
   o.construct        = FUiTemplate_construct;
   o.formatDisplay    = FUiTemplate_formatDisplay;
   o.formatValue      = FUiTemplate_formatValue;
   o.get              = FUiTemplate_get;
   o.set              = FUiTemplate_set;
   o.refreshValue     = FUiTemplate_refreshValue;
   return o;
}
function FUiTemplate_onBuildEditValue(p){
   var o = this;
   var hp = o._hValuePanel;
   hp.className = o.styleName('ValuePanel');
   var hf = o._hValueForm = RBuilder.appendTable(hp);
   hf.width = '100%';
   var hl = o._hValueLine = RBuilder.appendTableRow(hf);
   o._hChangePanel = RBuilder.appendTableCell(hl);
   o.onBuildEditChange(p);
   var hep = o._hInputPanel = RBuilder.appendTableCell(hl);
   var he = o._hInput = RBuilder.appendEdit(hep, o.styleName('Input'));
   o.attachEvent('onInputEdit', he, o.onInputEdit);
   RHtml.setSize(hep, o._inputSize);
   if(o._editLength){
      he.maxLength = o._editLength;
   }
}
function FUiTemplate_onInputEdit(p){
   var o = this;
   var v = o._hInput.value;
   o.refreshValue();
}
function FUiTemplate_construct(){
   var o = this;
   o.__base.FUiEditControl.construct.call(o);
   o._inputSize = new SSize2(120, 0);
}
function FUiTemplate_formatDisplay(p){
   var o = this;
   var r = RString.nvl(p);
   o._dataDisplay = r;
   return r;
}
function FUiTemplate_formatValue(p){
   return p;
}
function FUiTemplate_get(){
   var o = this;
   var r = o.__base.FUiEditControl.get.call(o);
   var r = o._hInput.value;
   return r;
}
function FUiTemplate_set(p){
   var o = this;
   o.__base.FUiEditControl.set.call(o, p);
   o._hInput.value = RString.nvl(p);
}
function FUiTemplate_refreshValue(){
   var o = this;
   o.processDataChangedListener(o);
}
