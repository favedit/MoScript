MO.EUiSplitStyle = new function EUiSplitStyle(){
   var o = this;
   o.Normal     = 'N';
   o.BulgeLine  = 'B';
   o.HollowLine = 'H';
   return o;
}
MO.MDuiShadow = function MDuiShadow(o){
   o = MO.Class.inherits(this, o);
   o._hShadow   = null;
   o.show       = MO.MDuiShadow_show;
   o.hide       = MO.MDuiShadow_hide;
   o.setVisible = MO.MDuiShadow_setVisible;
   return o;
}
MO.MDuiShadow_show = function MDuiShadow_show(v){
   var o = this;
   if(!o._hShadow){
      o._hShadow = MO.Window.Builder.createDiv(o._hPanel, 'RWindow_Shadow');
   }
   o._hShadow.style.zIndex = MO.RDuiLayer.next();
   if(v == false){
      o.hide();
   }else{
      var hs = o.panel(MO.EPanel.Shadow);
      if(hs){
         var s = o._hShadow.style;
         s.pixelLeft = hs.offsetLeft + 2;
         s.pixelTop = hs.offsetTop + 2;
         s.pixelWidth = hs.offsetWidth;
         s.pixelHeight = hs.offsetHeight;
         s.display = 'block';
      }
      var hp = o.panel(MO.EPanel.Panel);
      if(hp){
         hp.style.zIndex = MO.RDuiLayer.next();
      }
   }
}
MO.MDuiShadow_hide = function MDuiShadow_hide(){
   var o = this;
   if(o._hShadow){
      o._hShadow.style.display = 'none';
   }
}
MO.MDuiShadow_setVisible = function MDuiShadow_setVisible(p){
   var o = this;
   if(p){
      if(!o._hShadow){
         o._hShadow = MO.Window.Builder.createDiv(o._hPanel, 'RWindow_Shadow');
      }
      o._hShadow.style.zIndex = MO.RDuiLayer.next();
      var hs = o.panel(MO.EPanel.Shadow);
      if(hs){
         var r = MO.Window.Html.rect(hs);
         var s = o._hShadow.style;
         s.pixelLeft = r.left + 2;
         s.pixelTop = r.top + 2;
         s.pixelWidth = r.width();
         s.pixelHeight = r.height();
         s.display = 'block';
      }
      var hp = o.panel(MO.EPanel.Panel);
      if(hp){
         hp.style.zIndex = MO.RDuiLayer.next();
      }
   }else{
      if(o._hShadow){
         o._hShadow.style.display = 'none';
      }
   }
}
MO.SDuiColorBar = function SDuiColorBar(){
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
   o.onMouseDown       = MO.SDuiColorBar_onMouseDown;
   o.onMouseMove       = MO.SDuiColorBar_onMouseMove;
   o.onMouseUp         = MO.SDuiColorBar_onMouseUp;
   o.build             = MO.SDuiColorBar_build;
   o.setRange          = MO.SDuiColorBar_setRange;
   o.setColorValue     = MO.SDuiColorBar_setColorValue;
   o.setSlideValue     = MO.SDuiColorBar_setSlideValue;
   o.setInputValue     = MO.SDuiColorBar_setInputValue;
   o.convertSlide      = MO.SDuiColorBar_convertSlide;
   o.convertGet        = MO.SDuiColorBar_convertGet;
   o.convertSet        = MO.SDuiColorBar_convertSet;
   o.get               = MO.SDuiColorBar_get;
   o.set               = MO.SDuiColorBar_set;
   o.changeSlide       = MO.SDuiColorBar_changeSlide;
   o.changeInputEdit   = MO.SDuiColorBar_changeInputEdit;
   o.changeInputChange = MO.SDuiColorBar_changeInputChange;
   return o;
}
MO.SDuiColorBar_onMouseDown = function SDuiColorBar_onMouseDown(p){
   var o = this;
   var x = MO.Window.Html.clientX(p.hSource, o.hSlideForm) + p.offsetX;
   o._draging = true;
   MO.Window.setOptionSelect(false);
   o.changeSlide(x);
}
MO.SDuiColorBar_onMouseMove = function SDuiColorBar_onMouseMove(p){
   var o = this;
   if(o._draging){
      var x = MO.Window.Html.clientX(p.hSource, o.hSlideForm) + p.offsetX;
      o.changeSlide(x);
   }
}
MO.SDuiColorBar_onMouseUp = function SDuiColorBar_onMouseUp(p){
   var o = this;
   o._draging = false;
   MO.Window.setOptionSelect(true);
}
MO.SDuiColorBar_build = function SDuiColorBar_build(p){
   var o = this;
   var c = o.control;
   var hcf = o.hPanel;
   var hr = MO.Window.Builder.appendTableRow(hcf);
   var hc = o.hColorPanel = MO.Window.Builder.appendTableCell(hr);
   hc.width = 13;
   hc.style.padding = '2px';
   o.hColorImage = MO.Window.Builder.appendIcon(hc, null, 'n', 11, 11);
   var hc = o.hSlidePanel = MO.Window.Builder.appendTableCell(hr);
   hc.style.padding = '2px';
   hc.vAlign = 'middle';
   var hf = o.hSlideForm = MO.Window.Builder.appendTable(hc);
   hf.__pbar = o;
   hf.width = '100%';
   hf.style.height = '9px';
   hf.style.cursor = 'pointer';
   var hl = o.hSlideRowUp = MO.Window.Builder.appendTableRow(hf);
   hl.style.height = '3px';
   o.hSlideRowUL = MO.Window.Builder.appendTableCell(hl);
   var hc = o.hSlideRowUM = MO.Window.Builder.appendTableCell(hl);
   hc.width = 2;
   hc.bgColor = '#EEEEEE';
   var hc = o.hSlideRowUR = MO.Window.Builder.appendTableCell(hl);
   var hl = o.hSlideRow = MO.Window.Builder.appendTableRow(hf);
   hl.style.height = '3px';
   var hc = o.hSlideRowML = MO.Window.Builder.appendTableCell(hl);
   hc.bgColor = '#999999';
   var hc = o.hSlideRowMM = MO.Window.Builder.appendTableCell(hl);
   hc.width = 2;
   hc.bgColor = '#EEEEEE';
   var hc = o.hSlideRowMR = MO.Window.Builder.appendTableCell(hl);
   hc.bgColor = '#999999';
   var hl = o.hSlideRowDown = MO.Window.Builder.appendTableRow(hf);
   hl.style.height = '3px';
   o.hSlideRowBL = MO.Window.Builder.appendTableCell(hl);
   var hc = o.hSlideRowBM = MO.Window.Builder.appendTableCell(hl);
   hc.width = 2;
   hc.bgColor = '#EEEEEE';
   o.hSlideRowBR = MO.Window.Builder.appendTableCell(hl);
   var hc = o.hInputPanel = MO.Window.Builder.appendTableCell(hr, o.control.styleName('InputPanel'));
   hc.width = 36;
   var he = o.hInput = MO.Window.Builder.appendEdit(hc, o.control.styleName('Input'));
   he._pbar = o;
   c.attachEvent('onInputKeyPress', he, c.onInputKeyPress);
   c.attachEvent('onInputEdit', he, c.onInputEdit);
   c.attachEvent('onInputChange', he, c.onInputChange);
}
MO.SDuiColorBar_setRange = function SDuiColorBar_setRange(i, a){
   var o = this;
   if(i != null){
      o.minValue = i;
   }
   if(a != null){
      o.maxValue = a;
   }
}
MO.SDuiColorBar_setColorValue = function SDuiColorBar_setColorValue(p){
   var o = this;
   var v = MO.Lang.Hex.format(p, 2);
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
         throw new MO.TError(o, 'Invalid type.');
   }
   o.hColorImage.style.backgroundColor = '#' + c;
}
MO.SDuiColorBar_setSlideValue = function SDuiColorBar_setSlideValue(p){
   var o = this;
   var w = o.hSlideForm.offsetWidth;
   if(w > 0){
      var v = p / o.maxValue * w;
      o.hSlideRowML.width = MO.Lang.Integer.toRange(v, 1, w - 1);
   }
}
MO.SDuiColorBar_setInputValue = function SDuiColorBar_setInputValue(p){
   this.hInput.value = p;
}
MO.SDuiColorBar_convertGet = function SDuiColorBar_convertGet(p){
   return p;
}
MO.SDuiColorBar_get = function SDuiColorBar_get(){
   var o = this;
   return o.convertGet(o.hInput.value);
}
MO.SDuiColorBar_convertSet = function SDuiColorBar_convertSet(p){
   return p;
}
MO.SDuiColorBar_set = function SDuiColorBar_set(p){
   var o = this;
   var v = o.convertSet(p);
   o.setColorValue(v);
   o.setSlideValue(v);
   o.setInputValue(v);
}
MO.SDuiColorBar_convertSlide = function SDuiColorBar_convertSlide(p){
   return p;
}
MO.SDuiColorBar_changeSlide = function SDuiColorBar_changeSlide(p){
   var o = this;
   var w = o.hSlideForm.offsetWidth - 3;
   var v = o.convertSlide(p / w);
   o.set(v);
   o.control.refreshValue();
}
MO.SDuiColorBar_changeInputEdit = function SDuiColorBar_changeInputEdit(){
   var o = this;
   var v = o.convertGet(o.hInput.value);
   o.setColorValue(v);
   o.setSlideValue(v);
   o.control.refreshValue();
}
MO.SDuiColorBar_changeInputChange = function SDuiColorBar_changeInputChange(){
   var o = this;
   var v = o.convertGet(o.hInput.value);
   o.set(v);
   o.control.refreshValue();
}
MO.SDuiColorChannel = function SDuiColorChannel(){
   var o = this;
   MO.SDuiColorBar.call(o);
   o.minValue      = 0;
   o.maxValue      = 255;
   o.setInputValue = MO.SDuiColorChannel_setInputValue;
   o.convertGet    = MO.SDuiColorChannel_convertGet;
   o.convertSet    = MO.SDuiColorChannel_convertSet;
   return o;
}
MO.SDuiColorChannel_setInputValue = function SDuiColorChannel_setInputValue(p){
   var o = this;
   var v = MO.Integer.toRange(p, o.minValue, o.maxValue);
   var t = MO.Integer.format(v);
   var h = o.hInput;
   if(h.value != t){
      h.value = t;
   }
}
MO.SDuiColorChannel_convertGet = function SDuiColorChannel_convertGet(p){
   var o = this;
   var v = MO.Lang.Integer.parse(MO.Lang.String.nvl(p, '0'));
   return MO.Lang.Integer.toRange(v, o.minValue, o.maxValue) / 255;
}
MO.SDuiColorChannel_convertSet = function SDuiColorChannel_convertSet(p){
   return parseInt(p * 255);
}
MO.SDuiColorPower = function SDuiColorPower(){
   var o = this;
   MO.SDuiColorBar.call(o);
   o.minValue      = 0;
   o.maxValue      = 4;
   o.setColorValue = MO.SDuiColorPower_setColorValue;
   o.setSlideValue = MO.SDuiColorPower_setSlideValue;
   o.setInputValue = MO.SDuiColorPower_setInputValue;
   o.convertGet    = MO.SDuiColorPower_convertGet;
   o.convertSet    = MO.SDuiColorPower_convertSet;
   o.convertSlide  = MO.SDuiColorPower_convertSlide;
   return o;
}
MO.SDuiColorPower_setColorValue = function SDuiColorPower_setColorValue(p){
   var o = this;
   var v = MO.Lang.Integer.toRange(parseInt(p * 255), 0, 255);
   var s = MO.Lang.Hex.format(v, 2);
   o.hColorImage.style.backgroundColor = '#' + s + s + s;
}
MO.SDuiColorPower_setSlideValue = function SDuiColorPower_setSlideValue(p){
   var o = this;
   var w = o.hSlideForm.offsetWidth;
   if(w > 0){
      var v = p / o.maxValue * w;
      o.hSlideRowML.width = MO.Lang.Integer.toRange(v, 1, w - 1);
   }
}
MO.SDuiColorPower_setInputValue = function SDuiColorPower_setInputValue(p){
   var o = this;
   var h = o.hInput;
   var v = MO.Lang.Float.toRange(p, o.minValue, o.maxValue);
   var t = MO.Lang.Float.format(v, 0, null, 2, null);
   if(h.value != t){
      h.value = t;
   }
}
MO.SDuiColorPower_convertGet = function SDuiColorPower_convertGet(p){
   return MO.Lang.Float.parse(p);
}
MO.SDuiColorPower_convertSet = function SDuiColorPower_convertSet(p){
   return p;
}
MO.SDuiColorPower_convertSlide = function SDuiColorPower_convertSlide(p){
   return p * this.maxValue;
}
MO.SDuiSlide = function SDuiSlide(){
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
   o.onMouseDown   = MO.SDuiSlide_onMouseDown;
   o.onMouseMove   = MO.SDuiSlide_onMouseMove;
   o.onMouseUp     = MO.SDuiSlide_onMouseUp;
   o.onSlideChange = MO.Method.empty;
   o.build         = MO.SDuiSlide_build;
   o.setRange      = MO.SDuiSlide_setRange;
   o.setSlideValue = MO.SDuiSlide_setSlideValue;
   o.get           = MO.SDuiSlide_get;
   o.set           = MO.SDuiSlide_set;
   o.changeSlide   = MO.SDuiSlide_changeSlide;
   return o;
}
MO.SDuiSlide_onMouseDown = function SDuiSlide_onMouseDown(p){
   var o = this;
   var x = MO.Window.Html.clientX(p.hSource, o.hSlideForm) + p.offsetX;
   o._draging = true;
   MO.Window.setOptionSelect(false);
   o.changeSlide(x);
}
MO.SDuiSlide_onMouseMove = function SDuiSlide_onMouseMove(p){
   var o = this;
   if(o._draging){
      var x = MO.Window.Html.clientX(p.hSource, o.hSlideForm) + p.offsetX;
      o.changeSlide(x);
   }
}
MO.SDuiSlide_onMouseUp = function SDuiSlide_onMouseUp(p){
   var o = this;
   o._draging = false;
   MO.Window.setOptionSelect(true);
}
MO.SDuiSlide_build = function SDuiSlide_build(p){
   var o = this;
   var c = o.control;
   var hf = o.hSlideForm = MO.Window.Builder.appendTable(o.hPanel);
   hf.__pcapture = o;
   hf.width = '100%';
   hf.style.height = '9px';
   hf.style.cursor = 'pointer';
   var hl = o.hSlideU = MO.Window.Builder.appendTableRow(hf);
   hl.style.height = '3px';
   o.hSlideUL = MO.Window.Builder.appendTableCell(hl);
   var hc = o.hSlideUM = MO.Window.Builder.appendTableCell(hl);
   hc.width = 2;
   hc.bgColor = '#EEEEEE';
   var hc = o.hSlideUR = MO.Window.Builder.appendTableCell(hl);
   var hl = o.hSlideM = MO.Window.Builder.appendTableRow(hf);
   hl.style.height = '3px';
   var hc = o.hSlideML = MO.Window.Builder.appendTableCell(hl);
   hc.bgColor = '#999999';
   var hc = o.hSlideMM = MO.Window.Builder.appendTableCell(hl);
   hc.width = 2;
   hc.bgColor = '#EEEEEE';
   var hc = o.hSlideMR = MO.Window.Builder.appendTableCell(hl);
   hc.bgColor = '#999999';
   var hl = o.hSlideB = MO.Window.Builder.appendTableRow(hf);
   hl.style.height = '3px';
   o.hSlideBL = MO.Window.Builder.appendTableCell(hl);
   var hc = o.hSlideBM = MO.Window.Builder.appendTableCell(hl);
   hc.width = 2;
   hc.bgColor = '#EEEEEE';
   o.hSlideBR = MO.Window.Builder.appendTableCell(hl);
}
MO.SDuiSlide_setRange = function SDuiSlide_setRange(i, a){
   var o = this;
   if(i != null){
      o.minValue = MO.Lang.Float.parse(i);
   }
   if(a != null){
      o.maxValue = MO.Lang.Float.parse(a);
   }
   o.range = o.maxValue - o.minValue;
}
MO.SDuiSlide_setSlideValue = function SDuiSlide_setSlideValue(p){
   var o = this;
   var w = o.hSlideForm.offsetWidth;
   if(w > 0){
      var v = (p - o.minValue) / o.range * w;
      o.hSlideML.width = MO.Lang.Integer.toRange(v, 1, w - 1);
   }
}
MO.SDuiSlide_get = function SDuiSlide_get(){
   var o = this;
   var w = o.hSlideForm.offsetWidth - 3;
   var v = (p / w) * o.range + o.minValue;
   return v;
}
MO.SDuiSlide_set = function SDuiSlide_set(p){
   var o = this;
   o.setSlideValue(p);
}
MO.SDuiSlide_changeSlide = function SDuiSlide_changeSlide(p){
   var o = this;
   var c = o.control;
   var w = o.hSlideForm.offsetWidth - 3;
   o.hSlideML.width = MO.Lang.Integer.toRange(p, 1, w - 1);
   var v = (p / w) * o.range + o.minValue;
   v = MO.Lang.Float.toRange(v, o.minValue, o.maxValue);
   o.onSlideChange.call(c, v);
}
MO.FDuiButton = function FDuiButton(o){
   o = MO.Class.inherits(this, o, MO.FDuiControl, MListenerClick);
   o._labelPositionCd   = MO.Class.register(o, new MO.APtyString('_labelPositionCd'), MO.EUiPosition.Left);
   o._icon              = MO.Class.register(o, new MO.APtyString('_icon'));
   o._action            = MO.Class.register(o, new MO.APtyString('_action'));
   o._listenersClick    = MO.Class.register(o, new MO.AListener('_listenersClick', MO.EEvent.Click));
   o._stylePanel        = MO.Class.register(o, new MO.AStyle('_stylePanel'));
   o._styleForm         = MO.Class.register(o, new MO.AStyle('_styleForm'));
   o._styleIcon         = MO.Class.register(o, new MO.AStyle('_styleIcon'));
   o._styleLabel        = MO.Class.register(o, new MO.AStyle('_styleLabel'));
   o._styleIconPanel    = MO.Class.register(o, new MO.AStyleIcon('_styleIconPanel'));
   o._hForm             = null;
   o._hLeftButton       = null;
   o._hMiddleButton     = null;
   o._hRightButton      = null;
   o._hLabelPanel       = null;
   o._hLabel            = null;
   o.onBuild            = MO.FDuiButton_onBuild;
   o.onClick            = MO.Class.register(o, new MO.AEventClick('onClick'), MO.FDuiButton_onClick);
   o.doClick            = MO.FDuiButton_doClick;
   return o;
}
MO.FDuiButton_onBuild = function FDuiButton_onBuild(e){
   var o = this;
   o.__base.FDuiControl.onBuild.call(o, e);
   var hPanel = o._hPanel;
   o.attachEvent('onClick', hPanel);
   var hForm = MO.Window.Builder.appendTable(hPanel, o.styleName('Form'));
   var hLine  = MO.Window.Builder.appendTableRow(hForm);
   if(o._icon){
      var hCell = MO.Window.Builder.appendTableCell(hLine);
      hCell.width = 16;
      o._hIcon = MO.Window.Builder.appendIcon(hCell, o.styleName('Icon'), o._icon);
   }
   if(o.label){
      var hCell = MO.Window.Builder.appendTableCell(hLine);
      hCell.align = 'center';
      hCell.noWrap = true;
      o._hLabel = MO.Window.Builder.appendText(hCell, o.styleName('Label'), o._label);
   }
}
MO.FDuiButton_onButtonEnter = function FDuiButton_onButtonEnter(e){
   var o = this;
   if(!o._disabled){
     o._hLeftButton.background = o.styleIconPath('HoverLeft');
     o._hMiddleButton.background = o.styleIconPath('HoverMiddle');
     o._hRightButton.background = o.styleIconPath('HoverRight');
   }
}
MO.FDuiButton_onButtonLeave = function FDuiButton_onButtonLeave(e){
   var o = this;
   if(!o._disabled){
     o._hLeftButton.background = o.styleIconPath('ButtonLeft');
     o._hMiddleButton.background = o.styleIconPath('Button');
     o._hRightButton.background = o.styleIconPath('ButtonRight');
   }
}
MO.FDuiButton_onButtonDown = function FDuiButton_onButtonDown(e){
   var o = this;
   if(!o._disabled){
     o._hLeftButton.background = o.styleIconPath('PressLeft');
     o._hMiddleButton.background = o.styleIconPath('PressMiddle');
     o._hRightButton.background = o.styleIconPath('PressRight');
   }
}
MO.FDuiButton_onButtonUp = function FDuiButton_onButtonUp(e){
   var o = this;
   if(!o._disabled){
     o._hLeftButton.background = o.styleIconPath('ButtonLeft');
     o._hMiddleButton.background = o.styleIconPath('Button');
     o._hRightButton.background = o.styleIconPath('ButtonRight');
   }
}
MO.FDuiButton_onButtonClickDelay = function FDuiButton_onButtonClickDelay(e){
   var o = this;
   o.__process = false;
   o.clickActive.status = MO.EActive.Sleep;
}
MO.FDuiButton_onClick = function FDuiButton_onClick(e){
   this.doClick();
}
MO.FDuiButton_onButtonClick = function FDuiButton_onButtonClick(e){
   this.doClick();
}
MO.FDuiButton_oeMode = function FDuiButton_oeMode(e){
   var o = this;
   o.__base.FDuiControl.oeMode.call(o, e);
   o.__base.MDisplay.oeMode.call(o, e);
   return MO.EEventStatus.Stop;
}
MO.FDuiButton_setLabel = function FDuiButton_setLabel(v){
   var o = this;
   o.label = v;
   o._hLabel.innerText = v;
   o._hLabel.noWrap = true;
}
MO.FDuiButton_setLabelColor = function FDuiButton_setLabelColor(c){
   var o = this;
   o._hLabel.style.color = '#FF0000';
}
MO.FDuiButton_setLabelStyle = function FDuiButton_setLabelStyle(c, w, s){
   var o = this;
   o._hLabel.style.color = '#FF0000';
   o._hLabel.style.fontWeight = 'bold';
   o._hLabel.style.fontSize = '12';
}
MO.FDuiButton_doClick = function FDuiButton_doClick(){
   var o = this;
   if(!o._disabled){
      MO.Console.find(MO.FDuiFocusConsole).blur();
      var event = new MO.SClickEvent(o);
      o.processClickListener(event);
      event.dispose();
      if(o._action){
         eval(o._action);
      }
   }
}
MO.FDuiButton_dispose = function FDuiButton_dispose(){
   var o = this;
   o._hForm = null;
   o._hFormEnd = null;
   o._hLabel = null;
   o.__base.FDuiControl.dispose.call(o);
}
MO.FDuiCalendar = function FDuiCalendar(o){
   o = MO.Class.inherits(this, o, MO.FEditControl, MO.MEditBorder, MO.MDropable, MO.MDescCalendar);
   o.editFormat  = MO.Lang.Date.DisplayFormat;
   o.editHour     = MO.Class.register(o, new MO.TPtyBoolSet('editHour', 'editDate', MO.EDateTimeMode.Hour));
   o.editMinute   = MO.Class.register(o, new MO.TPtyBoolSet('editMinute', 'editDate', MO.EDateTimeMode.Minute));
   o.editSecond   = MO.Class.register(o, new MO.TPtyBoolSet('editSecond', 'editDate', MO.EDateTimeMode.Second));
   o.borderStyle = MO.EUiBorder.RoundDrop;
   o.date        = null;
   o.lsnEditEnd  = null;
   o.hForm       = null;
   o.hDrop       = null;
   o.hForm       = null;
   o.onKeyPress  = MO.FDuiCalendar_onKeyPress;
   o.onDataClick   = MO.FDuiCalendar_onDataClick;
   o.refreshStyle  = MO.FDuiCalendar_refreshStyle;
   o.onEditEnd   = MO.FDuiCalendar_onEditEnd;
   o.onBuildEdit = MO.FDuiCalendar_onBuildEdit;
   o.construct   = MO.FDuiCalendar_construct;
   o.formatValue = MO.FDuiCalendar_formatValue;
   o.formatText  = MO.FDuiCalendar_formatText;
   o.drop        = MO.FDuiCalendar_drop;
   o.doBlur      = MO.FDuiCalendar_doBlur;
   return o;
}
MO.FDuiCalendar_onDataClick = function FDuiCalendar_onDataClick(){
   var o = this;
   if(!o.editCheck){
      o.drop();
   }
}
MO.FDuiCalendar_onBuildEdit = function FDuiCalendar_onBuildEdit(b){
   var o = this;
   var htb = MO.Window.Builder.appendTable(b.hPanel);
    htb.style.tableLayout = 'fixed';
    var hr = o.hEdit = htb.insertRow();
   o.onBuildChange(hr.insertCell())
   var hc = hr.insertCell();
   var h = o.hEdit = MO.Window.Builder.appendEdit(hc, o.style('Edit'));
   h.style.disabled = 'true';
   if(o.editLength){
      h.maxLength = o.editLength;
   }
}
MO.FDuiCalendar_onEditEnd = function FDuiCalendar_onEditEnd(e){
   var o = this;
   if(e){
      o.set(e.get());
      o._invalidText = o.validText(o.text());
      o.refreshStyle();
   }
   o.onDataEditEnd(o);
}
MO.FDuiCalendar_onKeyPress = function FDuiCalendar_onKeyPress(e){
   if(!MO.Lang.String.inChars(String.fromCharCode(e.keyCode), MO.Lang.Date.Chars)){
      RKey.eventClear(e);
   }
}
MO.FDuiCalendar_construct = function FDuiCalendar_construct(){
   var o = this;
   o.base.FEditControl.construct.call(o);
   o.date = new TDate();
   o.lsnEditEnd = new TListener(o, o.onEditEnd);
}
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
MO.FDuiCalendar_formatText = function FDuiCalendar_formatText(value){
   if(value){
      var o = this;
      MO.Lang.Date.autoParse(o.date, value);
      return MO.Lang.Date.formatDate(o.date, o.editFormat);
   }
   return MO.Lang.String.nvl(value);
}
MO.FDuiCalendar_refreshStyle = function FDuiCalendar_refreshStyle(){
   var o = this;
   o.base.FEditControl.refreshStyle.call(o);
   if(!o.editCheck){
      o.hEdit.readOnly = 'true';
   }
}
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
MO.FDuiCalendar_doBlur = function FDuiCalendar_doBlur(){
   var o = this;
   o.base.FEditControl.doBlur.call(o);
   if(o.editor){
      o.editor.hide();
   }
}
MO.FDuiCalendarEditor = function FDuiCalendarEditor(o){
   o = MO.Class.inherits(this, o, MO.FDropEditor, MO.MDuiFocusLooper);
   o.editFormat       = null;
   o.dataValue        = null;
   o.date             = new MO.TDate();
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
   o.editFormat       = MO.MO.Lang.Date.DisplayFormat;
   o.dateOrg          = new MO.TDate();
   o.dateOrgValue     = null;
   o.dayCells         = new MO.TList();
   o.focusObject      = null;
   o.skipBlur         = false;
   o.styleYearMonth   = MO.Class.register(o, new TStyle('YearMonth'));
   o.styleButton      = MO.Class.register(o, new TStyle('Button'));
   o.styleButtonHover = MO.Class.register(o, new TStyle('ButtonHover'));
   o.styleDay         = MO.Class.register(o, new TStyle('Day'));
   o.styleDaySel      = MO.Class.register(o, new TStyle('DaySel'));
   o.styleDayHover    = MO.Class.register(o, new TStyle('DayHover'));
   o.styleDayFree     = MO.Class.register(o, new TStyle('DayFree'));
   o.styleDayNone     = MO.Class.register(o, new TStyle('DayNone'));
   o.styleTitlePanel  = MO.Class.register(o, new TStyle('TitlePanel'));
   o.styleDaysPanel   = MO.Class.register(o, new TStyle('DaysPanel'));
   o.styleTimePanel   = MO.Class.register(o, new TStyle('TimePanel'));
   o.styleMonth       = MO.Class.register(o, new TStyle('Year'));
   o.styleMonth       = MO.Class.register(o, new TStyle('Month'));
   o.styleWeek        = MO.Class.register(o, new TStyle('Week'));
   o.styleTime        = MO.Class.register(o, new TStyle('Time'));
   o.styleHour        = MO.Class.register(o, new TStyle('Hour'));
   o.styleSplit       = MO.Class.register(o, new TStyle('Split'));
   o.styleMinute      = MO.Class.register(o, new TStyle('Minute'));
   o.styleSecond      = MO.Class.register(o, new TStyle('Second'));
   o.styleNow         = MO.Class.register(o, new TStyle('Now'));
   o.styleOk          = MO.Class.register(o, new TStyle('Ok'));
   o.onDaySelect      = MO.Class.register(o, new HMouseDown('onDaySelect'), FDuiCalendarEditor_onDaySelect);
   o.onButtonNow      = MO.Class.register(o, new HMouseDown('onButtonNow'), FDuiCalendarEditor_onButtonNow);
   o.onDateKeyDown    = MO.Class.register(o, new HKeyDown('onDateKeyDown'), FDuiCalendarEditor_onDateKeyDown);
   o.onDateBlur       = MO.Class.register(o, new HBlur('onDateBlur'), FDuiCalendarEditor_onDateBlur);
   o.onTimeBlur       = MO.Class.register(o, new HBlur('onTimeBlur'), FDuiCalendarEditor_onTimeBlur);
   o.onTimeClick      = MO.Class.register(o, new HClick('onTimeClick'), FDuiCalendarEditor_onTimeClick);
   o.onDayDbClick     = MO.Class.register(o, new HDoubleClick('onDayDbClick'), FDuiCalendarEditor_onDayDbClick);
   o.onDayEnter       = MO.Class.register(o, new HMouseEnter('onDayEnter'),    FDuiCalendarEditor_onDayEnter);
   o.onDayOut         = MO.Class.register(o, new HMouseOut('onDayOut'),        FDuiCalendarEditor_onDayOut);
   o.onButtonOk       = MO.Class.register(o, new HMouseDown('onButtonOk'),     FDuiCalendarEditor_onButtonOk);
   o.onButtonCancel   = MO.Class.register(o, new HMouseDown('onButtonCancel'), FDuiCalendarEditor_onButtonCancel);
   o.onButtonOver     = MO.Class.register(o, new HMouseEnter('onButtonOver'),  FDuiCalendarEditor_onButtonOver);
   o.onButtonOut      = MO.Class.register(o, new HMouseOut('onButtonOut'),     FDuiCalendarEditor_onButtonOut);
   o.onMdown          = MO.Class.register(o, new HMouseDown('onMdown'),        FDuiCalendarEditor_onMdown);
   o.onMup            = MO.Class.register(o, new HMouseUp('onMup'),            FDuiCalendarEditor_onMup);
   o.onBuildDrop      = MO.FDuiCalendarEditor_onBuildDrop;
   o.show             = MO.FDuiCalendarEditor_show;
   o.setMinuteEditable = MO.FDuiCalendarEditor_setMinuteEditable;
   o.setHourEditable   = MO.FDuiCalendarEditor_setHourEditable;
   o.setSecondEditable = MO.FDuiCalendarEditor_setSecondEditable;
   o.buildTitle       = MO.FDuiCalendarEditor_buildTitle;
   o.buildDays        = MO.FDuiCalendarEditor_buildDays;
   o.buildTime        = MO.FDuiCalendarEditor_buildTime;
   o.testBlur         = MO.FDuiCalendarEditor_testBlur;
   o.get              = MO.FDuiCalendarEditor_get;
   o.set              = MO.FDuiCalendarEditor_set;
   o.setDate          = MO.FDuiCalendarEditor_setDate;
   o.storeChange      = MO.FDuiCalendarEditor_storeChange;
   o.daySelectLsns    = new MO.TListeners();
   o.onBuildButton    = MO.FDuiCalendarEditor_onBuildButton;
   o.ohKdown          = MO.FDuiCalendarEditor_ohKdown;
   o.ohDaysChange     = MO.FDuiCalendarEditor_ohDaysChange;
   o.ohKeyCheck       = MO.FDuiCalendarEditor_ohKeyCheck;
   o.onDateAction     = MO.FDuiCalendarEditor_onDateAction;
   o.panel            = MO.FDuiCalendarEditor_panel;
   o.dispose          = MO.FDuiCalendarEditor_dispose;
   return o;
}
MO.FDuiCalendarEditor_onTimeClick = function FDuiCalendarEditor_onTimeClick(e){
   var o = this;
   var h = e.hSource;
   if(h.editAble){
      h.select();
   }
}
MO.FDuiCalendarEditor_onTimeBlur = function FDuiCalendarEditor_onTimeBlur(e){
   var o = this;
    var h = e.hSource;
    if(h == o.hHour){
       h.value = Math.min(MO.Lang.Integer.parse(h.value), 23);
    }else if(h == o.hMinute){
       h.value = Math.min(MO.Lang.Integer.parse(h.value), 59);
    }else if(h == o.hSecond){
       h.value = Math.min(MO.Lang.Integer.parse(h.value), 59);
    }
    o.storeChange();
    o.setDate(o.date);
}
MO.FDuiCalendarEditor_onDayDbClick = function FDuiCalendarEditor_onDayDbClick(e){
   var o = e.source
   if(MO.Class.isClass(o, FDuiCalendarEditor) && 0 != MO.Lang.Integer.parse(e.hSource.innerText)){
      o.date.setDay(e.hSource.innerText);
      o.dataValue = MO.Lang.Date.formatDate(o.date);
      o.editEnd();
   }
}
MO.FDuiCalendarEditor_onDaySelect = function FDuiCalendarEditor_onDaySelect(e){
   var o = this;
   if(MO.Class.isClass(o, FDuiCalendarEditor) && 0 != MO.Lang.Integer.parse(e.hSource.innerText)){
     var h = e.hSource;
     if(o.hSelect){
        o.hSelect.style.border = '1 solid #FFFFFF';
     };
     o.hSelect = h;
     h.style.border = '1 solid #2BD6F0';
      o.date.setDay(h.innerText);
   }
}
MO.FDuiCalendarEditor_onButtonNow = function FDuiCalendarEditor_onButtonNow(e){
   var o = e.source;
   if(MO.Class.isClass(o, FDuiCalendarEditor)){
      o.dataValue = MO.Lang.Date.format();
      o.editEnd();
   }
}
MO.FDuiCalendarEditor_onDateKeyDown = function FDuiCalendarEditor_onDateKeyDown(e, he){
   var o = this;
   var h = e.hSource;
   var v = h.value;
   if(EKey.Enter == e.keyCode){
      o.storeChange();
      o.setDate(o.date);
   }else if(EKey.Up == e.keyCode){
      if(h == o.hYear){
         o.hYear.value = MO.Lang.Integer.parse(o.hYear.value) + 1;
      }else if(h == o.hMonth){
         o.hMonth.value = MO.Lang.Integer.parse(o.hMonth.value) + 1;
      }else if(h == o.hHour){
         if(o.hHour.editAble){
           if(v < 23){
             h.value = MO.Lang.Integer.parse(h.value) + 1;
          }
         }
     }else if(h == o.hMinute){
       if(o.hMinute.editAble){
          if(v < 59){
            h.value = MO.Lang.Integer.parse(h.value) + 1;
         }
        }
     }else{
        if(o.hSecond.editAble){
           if(v < 59){
             h.value = MO.Lang.Integer.parse(h.value) + 1;
           }
         }
     }
      o.storeChange();
      o.setDate(o.date);
   }else if(EKey.Down == e.keyCode){
      if(h == o.hYear){
         o.hYear.value = MO.Lang.Integer.parse(o.hYear.value) - 1;
      }else if(h == o.hMonth){
         o.hMonth.value = MO.Lang.Integer.parse(o.hMonth.value) - 1;
      }else if(h == o.hHour){
        if(o.hHour.editAble){
            if(v > 0){
              h.value = MO.Lang.Integer.parse(h.value) - 1;
           }
        }
     }else if(h == o.hMinute){
        if(o.hMinute.editAble){
           if(v > 0){
               h.value = MO.Lang.Integer.parse(h.value) - 1;
            }
        }
     }else{
        if(o.hSecond.editAble){
           if(v > 0){
              h.value = MO.Lang.Integer.parse(h.value) - 1;
           }
        }
     }
      o.storeChange();
      o.setDate(o.date);
      h.select();
   }else{
     if(h == o.hHour || h == o.hMinute || h == o.hSecond){
        if(h.editAble){
           RKey.fixChars(he, MO.Lang.Date.Chars);
        }else{
           he.keyCode = 0;
           he.returnValue = false;
        }
     }else{
        RKey.fixChars(he, MO.Lang.Date.Chars);
     }
   }
}
MO.FDuiCalendarEditor_onDateBlur = function FDuiCalendarEditor_onDateBlur(){
   var o = this;
   o.storeChange();
   o.setDate(o.date);
}
MO.FDuiCalendarEditor_onBuildDrop = function FDuiCalendarEditor_onBuildDrop(){
   var o = this;
   o.hDatePanel = MO.Window.Builder.appendTable(o.hDropPanel);
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
MO.FDuiCalendarEditor_show = function FDuiCalendarEditor_show(v){
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
MO.FDuiCalendarEditor_buildTitle = function FDuiCalendarEditor_buildTitle(){
   var o = this;
   var hTab = MO.Window.Builder.appendTable(o.hTitlePanel, null, 0, 5, 1);
   hTab.align = 'center';
   hTab.width = '100%';
   hTab.style.filter = "progid:DXImageTransform.Microsoft.Gradient(startColorStr='#E5FAFE', endColorStr='#FFFFFF', gradientType='0')";
   var hRow = hTab.insertRow();
   var hCel = hRow.insertCell();
   var h = o.hYearPrior = MO.Window.Builder.append(hCel, 'SPAN', o.style('Button'));
   h.link = o;
   h.linkAction = o.onDateAction;
   h.innerText = '3';
   o.attachEvent("onButtonOver",h);
   o.attachEvent("onButtonOut",h);
   o.attachEvent("onMdown",h);
   o.attachEvent("onMup",h);
   var hCel = hRow.insertCell();
   var h = o.hYear = MO.Window.Builder.append(hCel, 'INPUT', o.style('Year'));
   h.maxLength = '4';
   o.attachEvent('onDateBlur', h, o.onDateBlur);
   o.attachEvent('onDateKeyDown', h, o.onDateKeyDown);
   var hCel = hRow.insertCell();
   hCel.innerText = RContext.get('FDuiCalendarEditor:year');
   hCel.className = o.style('YearMonth');
   var hCel = hRow.insertCell();
   var h = o.hYearNext = MO.Window.Builder.append(hCel, 'SPAN', o.style('Button'));
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
   var h = o.hMonthPrior = MO.Window.Builder.append(hCel, 'SPAN', o.style('Button'));
   h.link = o;
   h.linkAction = o.onDateAction;
   h.innerText = '3';
   o.attachEvent("onButtonOver",h);
   o.attachEvent("onButtonOut",h);
   o.attachEvent("onMdown",h);
   o.attachEvent("onMup",h);
   var hCel = hRow.insertCell();
   var h = o.hMonth = MO.Window.Builder.append(hCel, 'INPUT', o.style('Month'));
   h.maxLength = '2';
   o.attachEvent('onDateBlur', h, o.onDateBlur);
   o.attachEvent('onDateKeyDown', h, o.onDateKeyDown);
   var hCel = hRow.insertCell();
   hCel.innerText = RContext.get('FDuiCalendarEditor:month');
   hCel.className = o.style('YearMonth');
   var hCel = hRow.insertCell();
   var h = o.hMonthNext = MO.Window.Builder.append(hCel, 'SPAN', o.style('Button'));
   h.link = o;
   h.linkAction = o.onDateAction;
   h.innerText = '4';
   o.attachEvent("onButtonOver",h);
   o.attachEvent("onButtonOut",h);
   o.attachEvent("onMdown", h);
   o.attachEvent("onMup", h);
}
MO.FDuiCalendarEditor_buildDays = function FDuiCalendarEditor_buildDays(){
   var o = this;
   var hTab = MO.Window.Builder.appendTable(o.hDaysPanel, null, 0, 0, 1);
   hTab.width = '100%';
   var weekDays = RContext.get('FDuiCalendarEditor:weekdays').split(',');
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
MO.FDuiCalendarEditor_buildTime = function FDuiCalendarEditor_buildTime(){
   var o = this;
   var hTab = MO.Window.Builder.appendTable(o.hTimePanel, null, 0, 1, 1);
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
   var hb = MO.Window.Builder.appendTable(hc, null, 0, 0, 0);
   hc.style.border = '1 solid #2BD6F0';
   hc.style.backgroundColor = '#FFFFFF';
   var hr = hb.insertRow();
   var hh =hr.insertCell();
   var hHour = o.hHour = MO.Window.Builder.appendEdit(hh, o.style('Hour'));
   hHour.maxLength = 2;
   o.attachEvent("onTimeClick", hHour);
   o.attachEvent("onDateKeyDown", hHour, o.onDateKeyDown);
   o.attachEvent("onTimeBlur", hHour, o.onTimeBlur);
   var hs1 = hr.insertCell();
   hs1.innerText = ':';
   var hm = hr.insertCell();
   var hMinute = o.hMinute = MO.Window.Builder.appendEdit(hm, o.style('Minute'));
   hMinute.maxLength = 2;
   o.attachEvent("onTimeClick", hMinute);
   o.attachEvent("onDateKeyDown", hMinute, o.onDateKeyDown);
   o.attachEvent("onTimeBlur", hMinute, o.onTimeBlur);
   var hs2 = hr.insertCell();
   hs2.innerText = ':';
   var hs = hr.insertCell();
   var hSecond = o.hSecond = MO.Window.Builder.appendEdit(hs, o.style('Second'));
   hSecond.maxLength = 2;
   o.attachEvent("onTimeClick", hSecond);
   o.attachEvent("onDateKeyDown", hSecond, o.onDateKeyDown);
   o.attachEvent("onTimeBlur", hSecond, o.onTimeBlur);
   var hb2 = hRow.insertCell();
   hb2.width = 50;
   var hn = hRow.insertCell();
   hn.style.display = 'none';
   var hNow = o.hNow = MO.Window.Builder.append(hn, 'SPAN', o.style('Now'));
   hNow.style.width = 50;
   hn.style.border='1 solid #2BD6F0';
   hNow.innerText = RContext.get('FDuiCalendarEditor:now');
   hNow.style.display = 'none';
   hNow.link = o;
   o.attachEvent("onButtonNow", hNow);
   var hc = hRow.insertCell();
   var hCl = o.hCancel = MO.Window.Builder.append(hc, 'SPAN', o.style('Ok'));
   hCl.style.width = 50;
   hc.style.border='1 solid #2BD6F0';
   hCl.link = o;
   o.attachEvent("onButtonCancel", hCl);
   hCl.innerText = RContext.get('FDuiCalendarEditor:cancel');
   var ho = hRow.insertCell();
   var hOk = o.hOk = MO.Window.Builder.append(ho, 'SPAN', o.style('Ok'));
   hOk.style.width = 50;
   ho.style.border='1 solid #2BD6F0';
   hOk.link = o;
   o.attachEvent("onButtonOk", hOk);
   hOk.innerText = RContext.get('FDuiCalendarEditor:ok');
}
MO.FDuiCalendarEditor_testBlur = function FDuiCalendarEditor_testBlur(c){
   return this.source != c;
}
MO.FDuiCalendarEditor_get = function FDuiCalendarEditor_get(){
   return this.dataValue;
}
MO.FDuiCalendarEditor_set = function FDuiCalendarEditor_set(value, format){
   var o = this;
   o.changed = false;
   o.skipBlur = 0;
   o.dataValue = value;
   o.dateOrgValue = value;
   o.editFormat = format;
   MO.Lang.Date.parse(o.date, value);
   MO.Lang.Date.parse(o.dateOrg, value);
   if(!value){
      o.date.now();
      MO.Lang.Date.parse(o.date, value);
      MO.Lang.Date.parse(o.dateOrg, value);
   }
   o.setDate(o.date);
}
MO.FDuiCalendarEditor_setDate = function FDuiCalendarEditor_setDate(date){
   var o = this;
   o.hYear.value = date.year;
   o.hMonth.value = date.month;
   o.hHour.value = MO.Lang.String.lpad(date.hour, 2, '0');
   o.hMinute.value = MO.Lang.String.lpad(date.minute, 2, '0');
   o.hSecond.value = MO.Lang.String.lpad(date.second, 2,'0');
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
MO.FDuiCalendarEditor_setHourEditable = function FDuiCalendarEditor_setHourEditable(v){
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
MO.FDuiCalendarEditor_setMinuteEditable = function FDuiCalendarEditor_setMinuteEditable(v){
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
MO.FDuiCalendarEditor_setSecondEditable = function FDuiCalendarEditor_setSecondEditable(v){
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
MO.FDuiCalendarEditor_storeChange = function FDuiCalendarEditor_storeChange(){
   var o = this;
   o.date.setYear(o.hYear.value);
   o.date.setMonth(o.hMonth.value);
   o.date.setHour(Math.min(MO.Lang.Integer.parse(o.hHour.value), 23));
   o.date.setMinute(Math.min(MO.Lang.Integer.parse(o.hMinute.value), 59));
   o.date.setSecond(Math.min(MO.Lang.Integer.parse(o.hSecond.value), 59));
}
MO.FDuiCalendarEditor_onBuildButton = function FDuiCalendarEditor_onBuildButton(){
   var o = this;
}
MO.FDuiCalendarEditor_onMdown = function FDuiCalendarEditor_onMdown(e){
   var o = e.source;
   if(MO.Class.isClass(o, FDuiCalendarEditor)){
      o.isSkipBlur = true;
      if(e.hSource.linkAction){
         e.hSource.linkAction.call(o, e.hSource);
      }
   }
}
MO.FDuiCalendarEditor_onMup = function FDuiCalendarEditor_onMup(e){
   var o = e.source;
   if(MO.Class.isClass(o, FDuiCalendarEditor)){
      var f = o.focusObject;
      if(f && f.focus && f.select){
         f.focus();
         f.select();
      }
   }
}
MO.FDuiCalendarEditor_ohKdown = function FDuiCalendarEditor_ohKdown(){
   var o = this.link;
   if(MO.Class.isClass(o, FDuiCalendarEditor)){
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
MO.FDuiCalendarEditor_onButtonOver = function FDuiCalendarEditor_onButtonOver(e){
   var o = e.source;
   if(MO.Class.isClass(o, FDuiCalendarEditor)){
      e.hSource.className = o.style('ButtonHover');
   }
}
MO.FDuiCalendarEditor_onButtonOut = function FDuiCalendarEditor_onButtonOut(e){
   var o = e.source;
   if(MO.Class.isClass(o, FDuiCalendarEditor)){
      e.hSource.className = o.style('Button');
   }
}
MO.FDuiCalendarEditor_onButtonOk = function FDuiCalendarEditor_onButtonOk(e){
   var o = e.source;
   if(MO.Class.isClass(o, FDuiCalendarEditor)){
      o.editStatus = EEditStatus.Ok;
      o.dataValue = MO.Lang.Date.formatDate(o.date);
      o.editEnd();
   }
}
MO.FDuiCalendarEditor_onButtonCancel = function FDuiCalendarEditor_onButtonCancel(e) {
   var o = e.source;
   if(MO.Class.isClass(o, FDuiCalendarEditor)){
    o.editStatus = EEditStatus.Cancel;
     o.dataValue = '';
     o.editEnd();
   }
}
MO.FDuiCalendarEditor_ohDaysChange = function FDuiCalendarEditor_ohDaysChange(){
   var o = this.link;
   if(MO.Class.isClass(o, FDuiCalendarEditor)){
      o.date.setYear(o.hYear.value);
      o.date.setMonth(o.hMonth.value);
      o.setDate(o.date);
   }
}
MO.FDuiCalendarEditor_ohKeyCheck = function FDuiCalendarEditor_ohKeyCheck(){
   var e = RWindow.event(this)
   if(!MO.Lang.String.inChars(String.fromCharCode(e.keyCode), MO.Lang.Date.Chars)){
      e.keyCode = 0;
   }
}
MO.FDuiCalendarEditor_onDayEnter = function FDuiCalendarEditor_onDayEnter(e){
   var o = e.source;
   if(MO.Class.isClass(o, FDuiCalendarEditor) && e.hSource.innerText != '.'){
      if(!e.hSource.isCurrent){
         e.hSource.className = o.style('DayHover');
      }
   }
}
MO.FDuiCalendarEditor_onDayOut = function FDuiCalendarEditor_onDayOut(e){
   var o = e.source;
   if(MO.Class.isClass(o, FDuiCalendarEditor) && e.hSource.innerText != '.'){
      if(!e.hSource.isCurrent){
         e.hSource.className = e.hSource.isFree ? o.style('DayFree') : o.style('Day');
      }
   }
}
MO.FDuiCalendarEditor_onDateAction = function FDuiCalendarEditor_onDateAction(h){
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
MO.FDuiCalendarEditor_panel = function FDuiCalendarEditor_panel(type){
   var o = this;
   if(EPanel.Shadow == type){
      return o.hPanel;
   }
   return o.base.FDropEditor.panel.call(o, type);
}
MO.FDuiCalendarEditor_dispose = function FDuiCalendarEditor_dispose(){
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
MO.FDuiCheck = function FDuiCheck(o){
   o = MO.Class.inherits(this, o, MO.FDuiEditControl, MO.MUiPropertyCheck);
   o._optionValueStyle     = false;
   o._listenersDataChanged = MO.Class.register(o, new MO.AListener('_listenersDataChanged', MO.EEvent.DataChanged));
   o._hInput               = null;
   o.onBuildEditValue      = MO.FDuiCheck_onBuildEditValue;
   o.onInputClick          = MO.Class.register(o, new MO.AEventClick('onInputClick'), MO.FDuiCheck_onInputClick);
   o.construct             = MO.FDuiCheck_construct;
   o.get                   = MO.FDuiCheck_get;
   o.set                   = MO.FDuiCheck_set;
   o.text                  = MO.FDuiCheck_text;
   o.refreshValue          = MO.FDuiCheck_refreshValue;
   o.refreshStyle          = MO.FDuiCheck_refreshStyle;
   o.dispose               = MO.FDuiCheck_dispose;
   return o;
}
MO.FDuiCheck_onBuildEditValue = function FDuiCheck_onBuildEditValue(p){
   var o = this;
   var hInput = o._hInput = MO.Window.Builder.appendCheck(o._hValuePanel);
   hInput.style.cursor = 'hand';
   o.attachEvent('onInputClick', hInput);
}
MO.FDuiCheck_onInputClick = function FDuiCheck_onInputClick(p){
   this.refreshValue();
}
MO.FDuiCheck_construct = function FDuiCheck_construct(){
   var o = this;
   o.__base.FDuiEditControl.construct.call(o);
   o._editSize.set(60, 20);
}
MO.FDuiCheck_get = function FDuiCheck_get(){
   var o = this;
   var value = o._hInput.checked;
   return value;
}
MO.FDuiCheck_set = function FDuiCheck_set(value){
   var o = this;
   var dataValue = MO.Lang.Boolean.parse(value);
   o._dataValue = dataValue;
   o._hInput.checked = dataValue;
   o.changeSet(false);
}
MO.FDuiCheck_text = function FDuiCheck_text(){
   var o = this;
   var value = this.get();
   var text = MO.Lang.Boolean.toString(value, o._valueTrue, o._valueFalse);
   return text;
}
MO.FDuiCheck_refreshValue = function FDuiCheck_refreshValue(){
   var o = this;
   o.processDataChangedListener(o);
}
MO.FDuiCheck_refreshStyle = function FDuiCheck_refreshStyle(){
   var o = this;
   o.__base.FDuiEditControl.refreshStyle.call(o);
   o._hInput.readOnly = !o._statusValueEdit;
}
MO.FDuiCheck_dispose = function FDuiCheck_dispose(){
   var o = this
   o._inputSize = MO.Lang.Object.dispose(o._inputSize);
   o.__base.FDuiEditControl.dispose.call(o);
}
MO.FDuiCheckPicker = function FDuiCheckPicker(o){
   o = MO.Class.inherits(this, o, MO.FEditControl, MO.MEditBorder, MO.MDescCheckPicker, MO.MDropable);
   o.stIconDropSelect = MO.Class.register(o, new MO.AStyleIcon('DropSelect'));
   o.items            = new MO.TItems();
   o.borderStyle      = MO.EUiBorder.RoundDrop;
   o.onBuildEdit      = MO.FDuiCheckPicker_onBuildEdit;
   o.onEditEnd        = MO.FDuiCheckPicker_onEditEnd;
   o.onDataKeyDown    = MO.FDuiCheckPicker_onDataKeyDown;
   o.loadConfig       = MO.FDuiCheckPicker_loadConfig;
   o.formatValue      = MO.FDuiCheckPicker_formatValue;
   o.validText        = MO.FDuiCheckPicker_validText;
   o.formatText       = MO.FDuiCheckPicker_formatText;
   o.refreshStyle     = MO.FDuiCheckPicker_refreshStyle;
   o.drop             = MO.FDuiCheckPicker_drop;
   o.dispose          = MO.FDuiCheckPicker_dispose;
   return o;
}
MO.FDuiCheckPicker_onBuildEdit = function FDuiCheckPicker_onBuildEdit(b){
   var o = this;
   var h = o.hEdit = MO.Window.Builder.appendEdit(b.hPanel, o.style('Edit'));
   if(o.editLength){
      h.maxLength = o.editLength;
   }
}
MO.FDuiCheckPicker_onEditEnd = function FDuiCheckPicker_onEditEnd(editor){
   var o = this;
   if(editor){
      o.set(editor.values);
   }
   o.onDataEditEnd(o);
}
MO.FDuiCheckPicker_loadConfig = function FDuiCheckPicker_loadConfig(c){
   var o = this;
   o.base.FEditControl.loadConfig.call(o, c);
   if(o.dataEmpty){
      o.items.create();
   }
   o.items.loadConfig(c);
   return MO.EStatus.Stop;
}
MO.FDuiCheckPicker_text = function FDuiCheckPicker_text(){
   return this.hEdit.value;
}
MO.FDuiCheckPicker_setText = function FDuiCheckPicker_setText(text){
   this.hEdit.value = text;
}
MO.FDuiCheckPicker_formatValue = function FDuiCheckPicker_formatValue(text){
   var o = this;
   if(!MO.Lang.String.isEmpty(text)){
      ta = MO.Lang.String.split(text, ',');
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
      return MO.Lang.String.toUpper(vs.join());
   }else{
      return '';
   }
}
MO.FDuiCheckPicker_validText = function FDuiCheckPicker_validText(text){
   var o = this;
   if(MO.Lang.String.isEmpty(text)){
      return true;
   }
   return !MO.Lang.String.isEmpty(o.formatValue(text));
}
MO.FDuiCheckPicker_formatText = function FDuiCheckPicker_formatText(v){
   var o = this;
   if(!MO.Lang.String.isEmpty(v)){
      va = MO.Lang.String.split(v, ',');
      var vs = new Array();
      var item = o.items.items;
      for(var n = 0; n < va.length; n++){
         var t = item.values[item.indexOf(va[n])];
         if(t){
            vs.push(t.label);
         }
      }
      return MO.Lang.String.toUpper(vs.join());
   }else{
      return '';
   }
}
MO.FDuiCheckPicker_refreshStyle = function FDuiCheckPicker_refreshStyle(){
   var o = this;
   o.base.FEditControl.refreshStyle.call(o);
   o.hDrop.src = o.styleIconPath(o._hover ? 'DropSelect' : 'Drop');
}
MO.FDuiCheckPicker_drop = function FDuiCheckPicker_drop(){
   var o = this;
   if(o.canDrop() && o.canEdit && o.items.count() > 0){
      var ed = o.editor = MO.Console.find(FEditConsole).focus(o, FDuiCheckPickerEditor, o.editRefer);
      if(ed.linkControl(o)){
         ed.setItems(o.items);
         ed.set(o.reget());
      }
      ed.show();
   }
}
MO.FDuiCheckPicker_onDataKeyDown = function FDuiCheckPicker_onDataKeyDown(s, e){
   var o = this;
   o.base.FEditControl.onDataKeyDown.call(o, s, e);
   if(o.items.count()){
      if(o.editor && o.editor.source == o){
         o.editor.onEditKeyDown(s, e);
      }
   }
}
MO.FDuiCheckPicker_dispose = function FDuiCheckPicker_dispose(){
   var o = this;
   o.base.FEditControl.dispose.call(o);
   o.hEdit = MO.Lang.Html.free(o.hEdit);
}
MO.FDuiCheckPickerEditor = function FDuiCheckPickerEditor(o){
   o = MO.Class.inherits(this, o, MO.FDropEditor, MO.MShadow);
   o.MinWidth         = 120;
   o.onEditFocus      = MO.Class.register(o, new MO.HFocus('onEditFocus'));
   o.onEditBlur       = MO.Class.register(o, new MO.HBlur('onEditBlur'));
   o.stIconDropSelect = MO.Class.register(o, new MO.TStyleIcon('DropSelect'));
   o.stFlag           = MO.Class.register(o, new MO.TStyle('Flag'));
   o.stEditForm       = MO.Class.register(o, new MO.TStyle('EditForm'));
   o.pattern          = null;
   o.originItem       = null;
   o.selectItem       = null;
   o.items            = null;
   o.itemClickListener = null;
   o.values           = new Array();
   o.hBtnTextSpan     = null;
   o.onBuildDrop      = MO.FDuiCheckPickerEditor_onBuildDrop;
   o.onBuildButton    = MO.FDuiCheckPickerEditor_onBuildButton;
   o.onItemClick      = MO.FDuiCheckPickerEditor_onItemClick;
   o.onEditKeyDown    = MO.FDuiCheckPickerEditor_onEditKeyDown;
   o.construct        = MO.FDuiCheckPickerEditor_construct;
   o.set              = MO.FDuiCheckPickerEditor_set;
   o.setItems         = MO.FDuiCheckPickerEditor_setItems;
   o.select           = MO.FDuiCheckPickerEditor_select;
   o.linkControl      = MO.FDuiCheckPickerEditor_linkControl;
   o.show             = MO.FDuiCheckPickerEditor_show;
   o.hide             = MO.FDuiCheckPickerEditor_hide;
   o.dispose          = MO.FDuiCheckPickerEditor_dispose;
   return o;
}
MO.FDuiCheckPickerEditor_construct = function FDuiCheckPickerEditor_construct(){
   var o = this;
   o.itemClickListener = new TListener(o, o.onItemClick);
}
MO.FDuiCheckPickerEditor_onBuildDrop = function FDuiCheckPickerEditor_onBuildDrop(){
   var o = this;
   o.hItemsForm = MO.Window.Builder.appendTable(o.hDropPanel);
   o.hItemsForm.width = '100%';
   o.hItemsPanel = MO.Window.Builder.append(o.hItemsForm, 'TBODY');
   o.onBuildButton();
}
MO.FDuiCheckPickerEditor_onBuildButton = function FDuiCheckPickerEditor_onBuildButton(){
   var o = this;
   o.base.FDropEditor.onBuildButton.call(o);
   var h = o.hBtnTextSpan = MO.Window.Builder.newSpan(o.hButtonPanel, null);
   h.innerText = 'colse';
}
MO.FDuiCheckPickerEditor_onItemClick = function FDuiCheckPickerEditor_onItemClick(s){
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
MO.FDuiCheckPickerEditor_select = function FDuiCheckPickerEditor_select(p){
   var o = this;
   var cs = o.components;
   p = Math.min(Math.max(0, p), cs.count-1)
   for(var n=0; n<cs.count; n++){
      o.components.value(n).setChecked(n == p);
   }
   o.position = p;
}
MO.FDuiCheckPickerEditor_onEditKeyDown = function FDuiCheckPickerEditor_onEditKeyDown(s, e){
   var o = this;
   return;
}
MO.FDuiCheckPickerEditor_set = function FDuiCheckPickerEditor_set(v){
   var o = this;
   var cs = o.components;
   var cl = cs.count;
   for(var n = 0;n < cl;n++){
      cs.value(n).setChecked(false);
   }
   if(!MO.Lang.String.isEmpty(v)){
      o.values = v;
      va = MO.Lang.String.split(v, ',');
      for(var n = 0; n < va.length; n++){
         var c = cs.get(va[n]);
         if(c){
            c.setChecked(true);
         }
      }
   }
}
MO.FDuiCheckPickerEditor_setItems = function FDuiCheckPickerEditor_setItems(items){
   var o = this;
   if(o.components){
      return;
   }
   var hip = o.hItemsPanel;
   o.items = items;
   var count = items.count();
   for(var n=0; n<count; n++){
      if(n > 0){
         var hr = MO.Window.Builder.append(hip, 'TR');
         hr.height = 1;
         var hd = MO.Window.Builder.append(hr, 'TD');
         hd.colSpan = 3;
         hd.style.borderTop = '1 dashed #24c2db';
         MO.Window.Builder.appendEmpty(hd);
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
MO.FDuiCheckPickerEditor_linkControl = function FDuiCheckPickerEditor_linkControl(c){
   var o = this;
   if(o.source == c){
      return false;
   }
   o.source = c;
   RLog.debug(o, 'link Panel (panel={0}, edit={1})', MO.Class.dump(c.hEditCell), MO.Class.dump(c.hEdit));
   MO.Window.Html.toRect(o.rect, c.hEditCell);
   MO.Window.Html.setPixelRect(o.hPanel, o.rect);
   o.hPanel.style.pixelTop = o.rect.bottom;
   var hbf = o.border.hForm;
   hbf.style.pixelWidth = c.editBorder.hForm.width;
   hbf.style.pixelHeight = c.editBorder.hForm.height;
   return true;
}
MO.FDuiCheckPickerEditor_show = function FDuiCheckPickerEditor_show(v){
   var o = this;
   o.base.FDropEditor.show.call(o, v);
   RConsole.find(FFocusConsole).focus(o);
   if(o.border.hForm.offsetWidth < o.MinWidth){
      o.border.hForm.style.pixelWidth = o.MinWidth;
   }
   o.base.MShadow.show.call(o, v);
   o.isSkipBlur = false;
}
MO.FDuiCheckPickerEditor_hide = function FDuiCheckPickerEditor_hide(){
   var o = this;
   o.source = null;
   o.base.FDropEditor.hide.call(o);
   o.base.MShadow.hide.call(o);
}
MO.FDuiCheckPickerEditor_dispose = function FDuiCheckPickerEditor_dispose(){
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
MO.FDuiColor = function FDuiColor(o){
   o = MO.Class.inherits(this, o, MO.FEditControl);
   o._inputSize       = MO.Class.register(o, new MO.APtySize2('_inputSize'));
   o._styleInputPanel = MO.Class.register(o, new MO.AStyle('_styleInputPanel'));
   o._styleInput      = MO.Class.register(o, new MO.AStyle('_styleInput'));
   o._hInput          = null;
   o.onBuildEditValue = MO.FDuiColor_onBuildEditValue;
   o.construct        = MO.FDuiColor_construct;
   o.get              = MO.FDuiColor_get;
   o.set              = MO.FDuiColor_set;
   return o;
}
MO.FDuiColor_oeDataLoad = function FDuiColor_oeDataLoad(p){
   var o = this;
   alert(p);
   return EEventStatus.Stop;
}
MO.FDuiColor_oeDataSave = function FDuiColor_oeDataSave(p){
   var o = this;
   return EEventStatus.Stop;
}
MO.FDuiColor_onBuildEditValue = function FDuiColor_onBuildEditValue(p){
   var o = this;
   var h = o._hValuePanel;
   h.className = o.styleName('InputPanel');
   var he = o._hInput = MO.Window.Builder.appendEdit(h, o.styleName('Input'));
   if(o._editLength){
      he.maxLength = o._editLength;
   }
}
MO.FDuiColor_construct = function FDuiColor_construct(){
   var o = this;
   o.__base.FEditControl.construct.call(o);
   o._inputSize = new SSize2(120, 0);
}
MO.FDuiColor_get = function FDuiColor_get(p){
   var o = this;
   var r = o.__base.FEditControl.get.call(o, p);
   var h = o._hInput;
   if(h){
      r = h.value;
   }
   return r;
}
MO.FDuiColor_set = function FDuiColor_set(p){
   var o = this;
   o.__base.FEditControl.set.call(o, p);
   var h = o._hInput;
   if(h){
      h.value = MO.Lang.String.nvl(p);
   }
}
MO.FDuiColor_onDataKeyDown = function FDuiColor_onDataKeyDown(s, e){
   var o = this;
   o.__base.FEditControl.onDataKeyDown.call(o, s, e);
   if(o.editCase){
      RKey.fixCase(e, o.editCase);
   }
}
MO.FDuiColor_formatValue = function FDuiColor_formatValue(v){
   var o = this;
   var r = MO.Lang.String.nvl(v);
   if(ECase.Upper == o.editCase){
      r = MO.Lang.String.toUpper(r);
   }else if(ECase.Lower == o.editCase){
      r = MO.Lang.String.toLower(r);
   }
   return r;
}
MO.FDuiColor_setText = function FDuiColor_setText(t){
   var o = this;
   if(!o.hEdit){
      return;
   }
   if('U'== o.editCase){
      o.hEdit.value = MO.Lang.String.toUpper(t);
   }else if('L'== o.editCase){
         o.hEdit.value = MO.Lang.String.toLower(t);
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
MO.FDuiColor_validText = function FDuiColor_validText(t){
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
MO.FDuiColor_findEditor = function FDuiColor_findEditor(){
   var o = this;
   if(o.editComplete){
      var de = o.editor;
      if(!de){
         o.dsControl = o.topControl(MDataset);
         if(o.dsControl){
            de = o.editor = RConsole.find(FDuiColorConsole).focus(o, FDuiColorEditor);
         }
      }
      if(de){
         de.linkControl(o);
      }
      return o.editor;
   }
}
MO.FDuiColor_drop = function FDuiColor_drop(){
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
MO.FDuiColor_clone = function FDuiColor_clone(){
   var o = this;
   var r = o._class.newInstance();
   GHtml_clone(r, o.hPanel);
   return r;
}
MO.FDuiColor_link = function FDuiColor_link(){
   var o = this;
}
MO.FDuiColor3Tpl = function FDuiColor3Tpl(o){
   o = MO.Class.inherits(this, o, MO.FEditControl, MO.MListenerDataChanged);
   o._inputSize        = MO.Class.register(o, new MO.APtySize2('_inputSize'));
   o._styleValuePanel  = MO.Class.register(o, new MO.AStyle('_styleValuePanel'));
   o._styleInput       = MO.Class.register(o, new MO.AStyle('_styleInput'));
   o._innerOriginValue = null;
   o._innerDataValue   = null;
   o._hInputRed        = null;
   o._hInputGreen      = null;
   o._hInputBlue       = null;
   o.onBuildEditValue  = MO.FDuiColor3Tpl_onBuildEditValue;
   o.onInputKeyPress   = MO.Class.register(o, new MO.AEventKeyPress('onInputKeyPress'), MO.FDuiColor3Tpl_onInputKeyPress);
   o.onInputChanged    = MO.Class.register(o, new MO.AEventInputChanged('MO.onInputChanged'), FDuiColor3Tpl_onInputChanged);
   o.construct         = MO.FDuiColor3Tpl_construct;
   o.get               = MO.FDuiColor3Tpl_get;
   o.set               = MO.FDuiColor3Tpl_set;
   return o;
}
MO.FDuiColor3Tpl_onBuildEditValue = function FDuiColor3Tpl_onBuildEditValue(p){
   var o = this;
   var h = o._hValuePanel;
   h.className = o.styleName('ValuePanel');
   var hf = o._hValueForm = MO.Window.Builder.appendTable(h);
   hf.width = '100%';
   var hl = o._hValueLine = MO.Window.Builder.appendTableRow(hf);
   o._hChangePanel = MO.Window.Builder.appendTableCell(hl);
   o.onBuildEditChange(p);
   var hc = MO.Window.Builder.appendTableCell(hl);
   hc.style.borderRight = '1px solid #666666';
   var he = o._hInputRed = MO.Window.Builder.appendEdit(hc, o.styleName('Input'));
   o.attachEvent('onInputKeyPress', he, o.onInputKeyPress);
   o.attachEvent('onInputChanged', he, o.onInputChanged);
   var hc = MO.Window.Builder.appendTableCell(hl);
   hc.style.borderLeft = '1px solid #999999';
   hc.style.borderRight = '1px solid #666666';
   var he = o._hInputGreen = MO.Window.Builder.appendEdit(hc, o.styleName('Input'));
   o.attachEvent('onInputKeyPress', he, o.onInputKeyPress);
   o.attachEvent('onInputChanged', he, o.onInputChanged);
   var hc = MO.Window.Builder.appendTableCell(hl);
   hc.style.borderLeft = '1px solid #999999';
   var he = o._hInputBlue = MO.Window.Builder.appendEdit(hc, o.styleName('Input'));
   o.attachEvent('onInputKeyPress', he, o.onInputKeyPress);
   o.attachEvent('onInputChanged', he, o.onInputChanged);
   var hdp = o._hDropPanel = MO.Window.Builder.appendTableCell(hl);
   hdp.style.borderLeft = '1px solid #666666';
   o.onBuildEditDrop(p);
}
MO.FDuiColor3Tpl_onInputKeyPress = function FDuiColor3Tpl_onInputKeyPress(p){
   var o = this;
   var c = p.keyCode;
   if(!EKeyCode.floatCodes[c]){
      p.cancel();
   }
}
MO.FDuiColor3Tpl_onInputChanged = function FDuiColor3Tpl_onInputChanged(p){
   var o = this;
   o.processDataChangedListener(o);
}
MO.FDuiColor3Tpl_construct = function FDuiColor3Tpl_construct(){
   var o = this;
   o.__base.FEditControl.construct.call(o);
   o._inputSize = new SSize2(120, 0);
   o._innerOriginValue = new SColor4();
   o._innerDataValue = new SColor4();
}
MO.FDuiColor3Tpl_get = function FDuiColor3Tpl_get(p){
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
MO.FDuiColor3Tpl_set = function FDuiColor3Tpl_set(p){
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
MO.FDuiColor3Tpl_onDataKeyDown = function FDuiColor3Tpl_onDataKeyDown(s, e){
   var o = this;
   o.__base.FEditControl.onDataKeyDown.call(o, s, e);
   if(o.editCase){
      RKey.fixCase(e, o.editCase);
   }
}
MO.FDuiColor3Tpl_formatValue = function FDuiColor3Tpl_formatValue(v){
   var o = this;
   var r = MO.Lang.String.nvl(v);
   if(ECase.Upper == o.editCase){
      r = MO.Lang.String.toUpper(r);
   }else if(ECase.Lower == o.editCase){
      r = MO.Lang.String.toLower(r);
   }
   return r;
}
MO.FDuiColor3Tpl_setText = function FDuiColor3Tpl_setText(t){
   var o = this;
   if(!o.hEdit){
      return;
   }
   if('U'== o.editCase){
      o.hEdit.value = MO.Lang.String.toUpper(t);
   }else if('L'== o.editCase){
         o.hEdit.value = MO.Lang.String.toLower(t);
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
MO.FDuiColor3Tpl_validText = function FDuiColor3Tpl_validText(t){
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
MO.FDuiColor3Tpl_findEditor = function FDuiColor3Tpl_findEditor(){
   var o = this;
   if(o.editComplete){
      var de = o.editor;
      if(!de){
         o.dsControl = o.topControl(MDataset);
         if(o.dsControl){
            de = o.editor = RConsole.find(FDuiColor3TplConsole).focus(o, FDuiColor3TplEditor);
         }
      }
      if(de){
         de.linkControl(o);
      }
      return o.editor;
   }
}
MO.FDuiColor3Tpl_drop = function FDuiColor3Tpl_drop(){
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
MO.FDuiColor3Tpl_clone = function FDuiColor3Tpl_clone(){
   var o = this;
   var r = o._class.newInstance();
   GHtml_clone(r, o.hPanel);
   return r;
}
MO.FDuiColor3Tpl_link = function FDuiColor3Tpl_link(){
   var o = this;
}
MO.FDuiColor4 = function FDuiColor4(o){
   o = MO.Class.inherits(this, o, MO.FEditControl);
   o._inputSize       = MO.Class.register(o, new MO.APtySize2('_inputSize'));
   o._styleInputPanel = MO.Class.register(o, new MO.AStyle('_styleInputPanel'));
   o._styleInput      = MO.Class.register(o, new MO.AStyle('_styleInput'));
   o._hInput          = null;
   o.onBuildEditValue = MO.FDuiColor4_onBuildEditValue;
   o.construct        = MO.FDuiColor4_construct;
   o.get              = MO.FDuiColor4_get;
   o.set              = MO.FDuiColor4_set;
   return o;
}
MO.FDuiColor4_oeDataLoad = function FDuiColor4_oeDataLoad(p){
   var o = this;
   alert(p);
   return EEventStatus.Stop;
}
MO.FDuiColor4_oeDataSave = function FDuiColor4_oeDataSave(p){
   var o = this;
   return EEventStatus.Stop;
}
MO.FDuiColor4_onBuildEditValue = function FDuiColor4_onBuildEditValue(p){
   var o = this;
   var h = o._hValuePanel;
   h.className = o.styleName('InputPanel');
   var he = o._hInput = MO.Window.Builder.appendEdit(h, o.styleName('Input'));
   if(o._editLength){
      he.maxLength = o._editLength;
   }
}
MO.FDuiColor4_construct = function FDuiColor4_construct(){
   var o = this;
   o.__base.FEditControl.construct.call(o);
   o._inputSize = new SSize2(120, 0);
}
MO.FDuiColor4_get = function FDuiColor4_get(p){
   var o = this;
   var r = o.__base.FEditControl.get.call(o, p);
   var h = o._hInput;
   if(h){
      r = h.value;
   }
   return r;
}
MO.FDuiColor4_set = function FDuiColor4_set(p){
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
MO.FDuiColor4_onDataKeyDown = function FDuiColor4_onDataKeyDown(s, e){
   var o = this;
   o.__base.FEditControl.onDataKeyDown.call(o, s, e);
   if(o.editCase){
      RKey.fixCase(e, o.editCase);
   }
}
MO.FDuiColor4_formatValue = function FDuiColor4_formatValue(v){
   var o = this;
   var r = MO.Lang.String.nvl(v);
   if(ECase.Upper == o.editCase){
      r = MO.Lang.String.toUpper(r);
   }else if(ECase.Lower == o.editCase){
      r = MO.Lang.String.toLower(r);
   }
   return r;
}
MO.FDuiColor4_setText = function FDuiColor4_setText(t){
   var o = this;
   if(!o.hEdit){
      return;
   }
   if('U'== o.editCase){
      o.hEdit.value = MO.Lang.String.toUpper(t);
   }else if('L'== o.editCase){
         o.hEdit.value = MO.Lang.String.toLower(t);
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
MO.FDuiColor4_validText = function FDuiColor4_validText(t){
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
MO.FDuiColor4_findEditor = function FDuiColor4_findEditor(){
   var o = this;
   if(o.editComplete){
      var de = o.editor;
      if(!de){
         o.dsControl = o.topControl(MDataset);
         if(o.dsControl){
            de = o.editor = RConsole.find(FDuiColor4Console).focus(o, FDuiColor4Editor);
         }
      }
      if(de){
         de.linkControl(o);
      }
      return o.editor;
   }
}
MO.FDuiColor4_drop = function FDuiColor4_drop(){
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
MO.FDuiColor4_clone = function FDuiColor4_clone(){
   var o = this;
   var r = o._class.newInstance();
   GHtml_clone(r, o.hPanel);
   return r;
}
MO.FDuiColor4_link = function FDuiColor4_link(){
   var o = this;
}
MO.FDuiColorPicker = function FDuiColorPicker(o){
   o = MO.Class.inherits(this, o, MO.FDuiEditControl, MO.MUiPropertyEdit);
   o._inputSize            = MO.Class.register(o, new MO.APtySize2('_inputSize'));
   o._unit                 = MO.Class.register(o, new MO.APtyString('_unit'));
   o._listenersDataChanged = MO.Class.register(o, new MO.AListener('_listenersDataChanged', MO.EEvent.DataChanged));
   o._hValueForm           = null;
   o._hValueLine           = null;
   o._hInputPanel          = null;
   o._hInput               = null;
   o.onBuildEditValue      = MO.FDuiColorPicker_onBuildEditValue;
   o.onInputEdit           = MO.Class.register(o, new MO.AEventInputChanged('onInputEdit'), MO.FDuiColorPicker_onInputEdit);
   o.construct             = MO.FDuiColorPicker_construct;
   o.formatText            = MO.FDuiColorPicker_formatText;
   o.formatValue           = MO.FDuiColorPicker_formatValue;
   o.get                   = MO.FDuiColorPicker_get;
   o.set                   = MO.FDuiColorPicker_set;
   o.setEditAble           = MO.FDuiColorPicker_setEditAble;
   o.refreshValue          = MO.FDuiColorPicker_refreshValue;
   o.refreshStyle          = MO.FDuiColorPicker_refreshStyle;
   o.dispose               = MO.FDuiColorPicker_dispose;
   return o;
}
MO.FDuiColorPicker_onBuildEditValue = function FDuiColorPicker_onBuildEditValue(event){
   var o = this;
   var hValuePanel = o._hValuePanel;
   var hValueForm = o._hValueForm = MO.Window.Builder.appendTable(hValuePanel);
   var hValueLine = o._hValueLine = MO.Window.Builder.appendTableRow(hValueForm);
   MO.Window.Html.setSize(hValueForm, o._inputSize);
   o._hChangePanel = MO.Window.Builder.appendTableCell(hValueLine);
   o.onBuildEditChange(event);
   var hInputPanel = o._hInputPanel = MO.Window.Builder.appendTableCell(hValueLine);
   var hInput = o._hInput = MO.Window.Builder.appendEdit(hInputPanel);
   o.attachEvent('onInputEdit', hInput, o.onInputEdit);
   if(o._editLength){
      hInput.maxLength = o._editLength;
   }
}
MO.FDuiColorPicker_onInputEdit = function FDuiColorPicker_onInputEdit(p){
   var o = this;
   o.refreshValue();
}
MO.FDuiColorPicker_construct = function FDuiColorPicker_construct(){
   var o = this;
   o.__base.FDuiEditControl.construct.call(o);
   o._inputSize = new MO.SSize2(0, 0);
}
MO.FDuiColorPicker_formatText = function FDuiColorPicker_formatText(value){
   var o = this;
   var result = MO.Lang.String.nvl(value);
   o._dataDisplay = result;
   return result;
}
MO.FDuiColorPicker_formatValue = function FDuiColorPicker_formatValue(value){
   return value;
}
MO.FDuiColorPicker_get = function FDuiColorPicker_get(){
   var o = this;
   var value = o._hInput.value;
   return value;
}
MO.FDuiColorPicker_set = function FDuiColorPicker_set(value){
   var o = this;
   o._dataValue = value;
   var text = MO.Lang.String.nvl(value);
   o._hInput.value = text;
   o.changeSet(false);
}
MO.FDuiColorPicker_setEditAble = function FDuiColorPicker_setEditAble(flag){
   var o = this;
   o.__base.FDuiEditControl.setEditAble.call(o, flag);
   o._hInput.readOnly = !flag;
}
MO.FDuiColorPicker_refreshValue = function FDuiColorPicker_refreshValue(){
   var o = this;
   o.processDataChangedListener(o);
}
MO.FDuiColorPicker_refreshStyle = function FDuiColorPicker_refreshStyle(){
   var o = this;
   o.__base.FDuiEditControl.refreshStyle.call(o);
   var inputStyle = null;
   if(o._statusEditable){
      if(o._statusValueHover){
         inputStyle = 'InputHover';
      }else{
         inputStyle = 'InputNormal';
      }
   }else{
      inputStyle = 'InputReadonly';
   }
   var hInput = o._hInput;
   hInput.className = o.styleName(inputStyle);
   hInput.readOnly = !o._statusEditable;
}
MO.FDuiColorPickerEditor = function FDuiColorPickerEditor(o){
   o = MO.Class.inherits(this, o, MO.FDropEditor, MO.MShadow);
   o.MinWidth     = 240;
   o.ColorHex     = new Array('00', '33', '66', '99', 'CC', 'FF');
   o.SpColorHex   = new Array('FF0000', '00FF00', '0000FF', 'FFFF00', '00FFFF','FF00FF');
   o.onCellEnter  = MO.Class.register(o, new HMouseOver('onCellEnter'),  MO.FDuiColorPickerEditor_onCellEnter);
   o.onCellSelect = MO.Class.register(o, new HMouseDown('onCellSelect'), MO.FDuiColorPickerEditor_onCellSelect);
   o.color        = null;
   o.hTable       = null;
   o.cellWidth    = 16;
   o.cellHeight   = 10;
   o.onBuildDrop  = MO.FDuiColorPickerEditor_onBuildDrop;
   o.onKeyDown    = MO.FDuiColorPickerEditor_onKeyDown;
   o.onCellSelect = MO.FDuiColorPickerEditor_onCellSelect;
    o.onEditEnd   = MO.FDuiColorPickerEditor_onEditEnd;
   o.makeCell     = MO.FDuiColorPickerEditor_makeCell;
   o.set          = MO.FDuiColorPickerEditor_set;
   o.show         = MO.FDuiColorPickerEditor_show;
   o.hide         = MO.FDuiColorPickerEditor_hide;
   o.linkControl  = MO.FDuiColorPickerEditor_linkControl;
   o.dispose      = MO.FDuiColorPickerEditor_dispose;
   return o;
}
MO.FDuiColorPickerEditor_onBuildDrop = function FDuiColorPickerEditor_onBuildDrop(){
   var o = this;
   o.hTable = MO.Window.Builder.appendTable(o.hDropPanel);
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
MO.FDuiColorPickerEditor_linkControl = function FDuiColorPickerEditor_linkControl(c){
   var o = this;
   if(o.source == c){
      return false;
   }
   o.source = c;
   RLog.debug(o, 'link Panel (panel={0}, edit={1})', MO.Class.dump(c.hEditCell), MO.Class.dump(c.hEdit));
   MO.Window.Html.toRect(o.rect, c.hEditCell);
   MO.Window.Html.setPixelRect(o.hPanel, o.rect);
   o.hPanel.style.pixelTop = o.rect.bottom;
   var hbf = o.border.hForm;
   hbf.style.pixelWidth = c.editBorder.hForm.width;
   hbf.style.pixelHeight = c.editBorder.hForm.height;
   return true;
}
MO.FDuiColorPickerEditor_onCellEnter = function FDuiColorPickerEditor_onCellEnter(e){
   var o = this;
   o.editable.hDrop.style.backgroundColor = e.hSource.style.backgroundColor;
}
MO.FDuiColorPickerEditor_onCellSelect = function FDuiColorPickerEditor_onCellSelect(e){
   var o = this;
   o.color = e.srcElement.style.backgroundColor;
   o.editStatus = EEditStatus.Ok
   o.blur();
}
MO.FDuiColorPickerEditor_makeCell = function FDuiColorPickerEditor_makeCell(hRow, color) {
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
MO.FDuiColorPickerEditor_onKeyDown = function FDuiColorPickerEditor_onKeyDown(e){
   alert(FDuiColorPickerEditor_onKeyDown);
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
MO.FDuiColorPickerEditor_set = function FDuiColorPickerEditor_set(v){
   var o = this;
   o.color = v;
}
MO.FDuiColorPickerEditor_show = function FDuiColorPickerEditor_show(v){
   var o = this;
   o.base.FDropEditor.show.call(o, v);
   RConsole.find(FFocusConsole).focus(o);
   if(o.border.hForm.offsetWidth < o.MinWidth){
      o.border.hForm.style.pixelWidth = o.MinWidth;
   }
   o.base.MShadow.show.call(o, v);
   o.isSkipBlur = false;
}
MO.FDuiColorPickerEditor_onEditEnd = function FDuiColorPickerEditor_onEditEnd(){
   var o = this;
   var t = o.editable;
   RLog.debug(o, 'Edit end (editable={0}, status={1})', MO.Class.dump(t), REnum.decode(EEditStatus, o.editStatus));
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
MO.FDuiColorPickerEditor_hide = function FDuiColorPickerEditor_hide(){
   var o = this;
   o.source = null;
   o.base.FDropEditor.hide.call(o);
   o.base.MShadow.hide.call(o);
}
MO.FDuiColorPickerEditor_dispose = function FDuiColorPickerEditor_dispose(){
   var o = this;
   o.base.FDropEditor.dispose.call(o);
   RMemory.freeHtml(o.hTable);
   RMemory.freeHtml(o.hDropPanel);
   RMemory.freeHtml(o.hEdit);
   o.hTable = null;
   o.hDropPanel = null;
   o.hEdit = null;
}
MO.FDuiColorPower = function FDuiColorPower(o){
   o = MO.Class.inherits(this, o, MO.FDuiEditControl, MO.MListenerDataChanged, MO.MMouseCapture);
   o._inputSize          = MO.Class.register(o, new MO.APtySize2('_inputSize'));
   o._valueMin           = MO.Class.register(o, new MO.APtyNumber('_valueMin'));
   o._valueMax           = MO.Class.register(o, new MO.APtyNumber('_valueMax'));
   o._styleValuePanel    = MO.Class.register(o, new MO.AStyle('_styleValuePanel'));
   o._styleInputPanel    = MO.Class.register(o, new MO.AStyle('_styleInputPanel'));
   o._styleInput         = MO.Class.register(o, new MO.AStyle('_styleInput'));
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
   o.onBuildEditValue    = MO.FDuiColorPower_onBuildEditValue;
   o.onMouseCaptureStart = MO.FDuiColorPower_onMouseCaptureStart;
   o.onMouseCapture      = MO.FDuiColorPower_onMouseCapture;
   o.onMouseCaptureStop  = MO.FDuiColorPower_onMouseCaptureStop;
   o.onInputKeyPress     = MO.Class.register(o, new MO.AEventKeyPress('onInputKeyPress'), MO.FDuiColorPower_onInputKeyPress);
   o.onInputEdit         = MO.Class.register(o, new MO.AEventInputChanged('onInputEdit'), MO.FDuiColorPower_onInputEdit);
   o.onInputChange       = MO.Class.register(o, new MO.AEventChange('onInputChange'), MO.FDuiColorPower_onInputChange);
   o.construct           = MO.FDuiColorPower_construct;
   o.get                 = MO.FDuiColorPower_get;
   o.set                 = MO.FDuiColorPower_set;
   o.setDisplayColor     = MO.FDuiColorPower_setDisplayColor;
   o.setDisplay          = MO.FDuiColorPower_setDisplay;
   o.refreshValue        = MO.FDuiColorPower_refreshValue;
   o.dispose             = MO.FDuiColorPower_dispose;
   return o;
}
MO.FDuiColorPower_onBuildEditValue = function FDuiColorPower_onBuildEditValue(p){
   var o = this;
   var h = o._hValuePanel;
   h.className = o.styleName('ValuePanel');
   var hf = o._hValueForm = MO.Window.Builder.appendTable(h);
   hf.width = '100%';
   var hl = o._hValueLine = MO.Window.Builder.appendTableRow(hf);
   o._hChangePanel = MO.Window.Builder.appendTableCell(hl);
   o.onBuildEditChange(p);
   var hcp = o._hColorPanel = MO.Window.Builder.appendTableCell(hl);
   hcp.width = 16;
   hcp.style.padding = '2px';
   o._hColorImage = MO.Window.Builder.appendIcon(hcp, null, 'n', 14, 65);
   var hcp = o._hChannelPanel = MO.Window.Builder.appendTableCell(hl);
   var hcf = o._hChannelForm = MO.Window.Builder.appendTable(hcp, null, 0, 1, 0);
   hcf.__linker = o;
   hcf.width = '100%';
   var b = o._barRed = new MO.SDuiColorChannel();
   b.control = o;
   b.typeCd = 'red';
   b.hPanel = hcf;
   b.build();
   var b = o._barGreen = new MO.SDuiColorChannel();
   b.control = o;
   b.typeCd = 'green';
   b.hPanel = hcf;
   b.build();
   var b = o._barBlue = new MO.SDuiColorChannel();
   b.control = o;
   b.typeCd = 'blue';
   b.hPanel = hcf;
   b.build();
   var b = o._barPower = new MO.SDuiColorPower();
   b.control = o;
   b.typeCd = 'power';
   b.setRange(o._valueMin, o._valueMax);
   b.hPanel = hcf;
   b.build();
}
MO.FDuiColorPower_onMouseCaptureStart = function FDuiColorPower_onMouseCaptureStart(p){
   var o = this;
   var b = MO.Window.Html.searchObject(p.hSource, '__pbar');
   if(b){
      b.onMouseDown(p);
   }
}
MO.FDuiColorPower_onMouseCapture = function FDuiColorPower_onMouseCapture(p){
   var o = this;
   var b = MO.Window.Html.searchObject(p.hSource, '__pbar');
   if(b){
      b.onMouseMove(p);
   }
}
MO.FDuiColorPower_onMouseCaptureStop = function FDuiColorPower_onMouseCaptureStop(p){
   var o = this;
   var b = MO.Window.Html.searchObject(p.hSource, '__pbar');
   if(b){
      b.onMouseUp(p);
   }
}
MO.FDuiColorPower_onInputKeyPress = function FDuiColorPower_onInputKeyPress(p){
   var o = this;
   var c = p.keyCode;
   if(MO.RKeyboard.isControlKey(c)){
      return;
   }
   if(!MO.RKeyboard.isFloatKey(c)){
      p.cancel();
   }
}
MO.FDuiColorPower_onInputEdit = function FDuiColorPower_onInputEdit(p){
   var o = this;
   var hs = p.hSender;
   var b = hs._pbar;
   if(b){
      b.changeInputEdit();
   }
   o.processDataChangedListener(o);
}
MO.FDuiColorPower_onInputChange = function FDuiColorPower_onInputChange(p){
   var o = this;
   var hs = p.hSender;
   var b = hs._pbar;
   if(b){
      b.changeInputChange();
   }
   o.processDataChangedListener(o);
}
MO.FDuiColorPower_construct = function FDuiColorPower_construct(){
   var o = this;
   o.__base.FDuiEditControl.construct.call(o);
   o._inputSize = new MO.SSize2(120, 0);
   o._innerOriginValue = new MO.SColor4();
   o._innerDataValue = new MO.SColor4();
}
MO.FDuiColorPower_get = function FDuiColorPower_get(p){
   var o = this;
   var v = o._innerDataValue;
   v.red = o._barRed.get();
   v.green = o._barGreen.get();
   v.blue = o._barBlue.get();
   v.alpha = o._barPower.get();
   return v;
}
MO.FDuiColorPower_set = function FDuiColorPower_set(p){
   var o = this;
   o.__base.FDuiEditControl.set.call(o, p);
   if(p.constructor == MO.SColor4){
      o._innerOriginValue.assign(p);
      o._innerDataValue.assign(p);
   }else{
      throw new MO.TError('Invalid value format.');
   }
   o.setDisplayColor();
   var v = o._innerDataValue;
   o._barRed.set(v.red);
   o._barGreen.set(v.green);
   o._barBlue.set(v.blue);
   o._barPower.set(v.alpha);
   o.changeSet(false);
}
MO.FDuiColorPower_setDisplayColor = function FDuiColorPower_setDisplayColor(){
   var o = this;
   var v = o._innerDataValue;
   var va = v.alpha;
   var vr = MO.Lang.Hex.format(MO.Lang.Integer.toRange(parseInt(v.red * va * 255), 0, 255), 2);
   var vg = MO.Lang.Hex.format(MO.Lang.Integer.toRange(parseInt(v.green * va * 255), 0, 255), 2);
   var vb = MO.Lang.Hex.format(MO.Lang.Integer.toRange(parseInt(v.blue * va * 255), 0, 255), 2);
   o._hColorImage.style.backgroundColor = '#' + vr + vg + vb;
}
MO.FDuiColorPower_setDisplay = function FDuiColorPower_setDisplay(){
   var o = this;
   o.setDisplayColor();
   var v = o._innerDataValue;
   o._barRed.set(v.red);
   o._barGreen.set(v.green);
   o._barBlue.set(v.blue);
   o._barPower.set(v.alpha);
}
MO.FDuiColorPower_refreshValue = function FDuiColorPower_refreshValue(){
   var o = this;
   o.get();
   o.setDisplayColor();
   o.processDataChangedListener(o);
}
MO.FDuiColorPower_dispose = function FDuiColorPower_dispose(t){
   var o = this;
   o.__base.FDuiEditControl.dispose.call(o, t);
}
MO.FDuiDateTime = function FDuiDateTime(o){
   o = MO.Class.inherits(this, o, MO.FDuiEditControl, MO.MDuiDropable);
   o.editDispMode = MO.Class.register(o, new MO.APtySet('editDisplay', 'editDate', MO.EDateTimeMode.Display));
   o.editYear     = MO.Class.register(o, new MO.APtySet('editYear', 'editDate', MO.EDateTimeMode.Year));
   o.editMonth    = MO.Class.register(o, new MO.APtySet('editMonth', 'editDate', MO.EDateTimeMode.Month));
   o.editDay      = MO.Class.register(o, new MO.APtySet('editDay', 'editDate', MO.EDateTimeMode.Day));
   o._date        = null;
   o.borderStyle  = MO.EUiBorder.RoundDrop;
   o.lsnEditEnd   = null;
   o.hYearPanel   = null;
   o.hYear        = null;
   o.hMonthPanel  = null;
   o.hMonth       = null;
   o.hDayPanel    = null;
   o.hDay         = null;
   o.onKeyPress   = MO.FDuiDateTime_onKeyPress;
   o.onEditEnd    = MO.FDuiDateTime_onEditEnd;
   o.onBuildEdit  = MO.FDuiDateTime_onBuildEdit;
   o.oeSaveValue  = MO.FDuiDateTime_oeSaveValue;
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
MO.FDuiDateTime_onKeyPress = function FDuiDateTime_onKeyPress(e){
   if(!MO.Lang.String.inChars(String.fromCharCode(e.keyCode), MO.Lang.Date.Chars)){
      MO.RKey.eventClear(e);
   }
}
MO.FDuiDateTime_onEditEnd = function FDuiDateTime_onEditEnd(e){
   var o = this;
   if(e){
      o.set(e.get());
   }
   o.onDataEditEnd(o);
}
MO.FDuiDateTime_onBuildEdit = function FDuiDateTime_onBuildEdit(b){
   var o = this;
   var htb = MO.Window.Builder.appendTable(b.hPanel);
   htb.width = '100%';
   htb.style.tableLayout = 'fixed';
   var hr = o.hEdit = htb.insertRow();
   o.onBuildChange(hr.insertCell())
   var hc = oonDateDoubleClickPanel = hr.insertCell();
   hc.width = '40%';
   hc.style.padding = '0 1';
   var he = o.hYear = MO.Window.Builder.appendEdit(hc);
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
   var he = o.hMonth = MO.Window.Builder.appendEdit(hc);
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
   var he = o.hDay = MO.Window.Builder.appendEdit(hc);
   he.maxLength = 2;
   he.style.border = 0;
   he.style.width = '100%';
   he.style.textAlign = 'right';
   o.hDay.style.display = o.editDay?'block':'none';
}
MO.FDuiDateTime_oeSaveValue = function FDuiDateTime_oeSaveValue(e){
   var o = this;
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
MO.FDuiDateTime_construct = function FDuiDateTime_construct(){
   var o = this;
   o.base.FDuiEditControl.construct.call(o);
   o._date = new MO.TDate();
   o.lsnEditEnd = new MO.TListener(o, o.onEditEnd);
}
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
MO.FDuiDateTime_text = function FDuiDateTime_text(){
   var o = this;
   o._date.setYear(o._date.year);
   o._date.setMonth(o._date.month);
   o._date.setDay(o._date.day);
   return MO.Lang.Date.formatDate(o._date);
}
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
MO.FDuiDateTime_validText = function FDuiDateTime_validText(t){
   return null;
}
MO.FDuiDateTime_setEditable = function FDuiDateTime_setEditable(v){
   var o = this;
   o.base.FDuiEditControl.setEditable.call(o, v);
   o.hYear.readOnly = !v;
   o.hMonth.readOnly = !v;
   o.hDay.readOnly = !v;
}
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
MO.FDuiDateTime_dispose = function FDuiDateTime_dispose(){
   var o = this;
   o.base.FDuiEditControl.dispose.call(o);
   o._date = null;
}
MO.FDuiDateTimeEditor = function FDuiDateTimeEditor(o){
   o = MO.Class.inherits(this, o, MO.FDuiDropEditor);
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
   o.onButtonEnter     = MO.Class.register(o, new MO.AEventMouseEnter('onButtonEnter'), MO.FDuiDateTimeEditor_onButtonEnter);
   o.onButtonLeave     = MO.Class.register(o, new MO.AEventMouseLeave('onButtonLeave'), MO.FDuiDateTimeEditor_onButtonLeave);
   o.onYearClick       = MO.Class.register(o, new MO.AEventMouseDown('onYearClick'), MO.FDuiDateTimeEditor_onYearClick);
   o.onMonthClick      = MO.Class.register(o, new MO.AEventMouseDown('onMonthClick'), MO.FDuiDateTimeEditor_onMonthClick);
   o.onDayClick        = MO.Class.register(o, new MO.AEventMouseDown('onDayClick'), MO.FDuiDateTimeEditor_onDayClick);
   o.onDateDoubleClick = MO.Class.register(o, new MO.AEventDoubleClick('onDateDoubleClick'), MO.FDuiDateTimeEditor_onDateDoubleClick);
   o.onNowClick        = MO.Class.register(o, new MO.AEventMouseDown('onNowClick'), MO.FDuiDateTimeEditor_onNowClick);
   o.onConfirmClick    = MO.Class.register(o, new MO.AEventMouseDown('MO.onConfirmClick'), FDuiDateTimeEditor_onConfirmClick);
   o.onBuildDrop       = MO.FDuiDateTimeEditor_onBuildDrop;
   o.onBuildButton     = MO.FDuiDateTimeEditor_onBuildButton;
   o.construct         = MO.FDuiDateTimeEditor_construct;
   o.buildTitle        = MO.FDuiDateTimeEditor_buildTitle;
   o.get               = MO.FDuiDateTimeEditor_get;
   o.set               = MO.FDuiDateTimeEditor_set;
   o.resetDay          = MO.FDuiDateTimeEditor_resetDay;
   o.setYearVisible    = MO.FDuiDateTimeEditor_setYearVisible;
   o.setMonthVisible   = MO.FDuiDateTimeEditor_setMonthVisible;
   o.setDayVisible     = MO.FDuiDateTimeEditor_setDayVisible;
   o.selectCell        = MO.FDuiDateTimeEditor_selectCell;
   o.restore           = MO.FDuiDateTimeEditor_restore;
   o.show              = MO.FDuiDateTimeEditor_show;
   o.dispose           = MO.FDuiDateTimeEditor_dispose;
   return o;
}
MO.FDuiDateTimeEditor_onButtonEnter = function FDuiDateTimeEditor_onButtonEnter(e){
   if(!e.hSource.isSelect){
     if(MO.Lang.String.isEmpty(e.hSource.innerText)){
         e.hSource.style.backgroundColor = '#CCCCFF';
     }
   }
}
MO.FDuiDateTimeEditor_onButtonLeave = function FDuiDateTimeEditor_onButtonLeave(e){
   if(!e.hSource.isSelect){
      e.hSource.style.backgroundColor = '#FFFFFF';
   }
}
MO.FDuiDateTimeEditor_onYearClick = function FDuiDateTimeEditor_onYearClick(e){
   var o = this;
   o.date.setYear(e.hSource.innerText);
   o.restore();
   o.resetDay();
}
MO.FDuiDateTimeEditor_onMonthClick = function FDuiDateTimeEditor_onMonthClick(e){
   var o = this;
   o.date.setMonth(e.hSource.innerText);
   o.restore();
   o.resetDay();
}
MO.FDuiDateTimeEditor_onDayClick = function FDuiDateTimeEditor_onDayClick(e){
   var o = this;
   if(!MO.Lang.String.equals(e.hSource.innerText, '.')){
      o.date.setDay(e.hSource.innerText);
      o.restore();
   }
}
MO.FDuiDateTimeEditor_onDateDoubleClick = function FDuiDateTimeEditor_onDateDoubleClick(){
   this.onConfirmClick();
}
MO.FDuiDateTimeEditor_onNowClick = function FDuiDateTimeEditor_onNowClick(){
   var o = this;
   o.date = new TDate();
   o.editEnd();
}
MO.FDuiDateTimeEditor_onConfirmClick = function FDuiDateTimeEditor_onConfirmClick(){
   var o = this;
   o.date.setYear(o.hYear.value);
   o.date.setMonth(o.hMonth.value);
   o.date.setDay(o.hDay.value);
   o.editEnd();
}
MO.FDuiDateTimeEditor_onBuildDrop = function FDuiDateTimeEditor_onBuildDrop(){
   var o = this;
   var hdp = o.hDropPanel;
   hdp.width = 220;
   o.attachEvent('onDateDoubleClick', hdp);
   o.hTitleYear = o.buildTitle('Year', 4);
   var hp = o.hPanelYear = o.hSelectPanel = MO.Window.Builder.appendTable(hdp);
   hp.width = '100%';
   for(var m=0; m<4; m++){
      var hr = hp.insertRow();
      for(var n=0; n<4; n++){
         var hc = hr.insertCell();
         hc.innerText = MO.Lang.Integer.format(2000 + 4*m+n, 2);
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
   var hp = o.hPanelMonth = o.hSelectPanel = MO.Window.Builder.appendTable(hdp);
   hp.width = '100%';
   for(var m=0; m<2; m++){
      hr = hp.insertRow();
      for(var n=0; n<6; n++){
         var hc = hr.insertCell();
         hc.innerText = MO.Lang.Integer.format(6*m+n+1, 2);
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
   var hp = o.hPanelDay = o.hSelectPanel = MO.Window.Builder.appendTable(hdp);
   hp.width = '100%';
   for(var m=0; m<5; m++){
      hr = hp.insertRow();
      for(var n=0; n<7; n++){
         var day = 7*m+n+1;
         if(day > 31){
            continue;
         }
         var hc = hr.insertCell();
         hc.innerText = MO.Lang.Integer.format(day, 2);
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
MO.FDuiDateTimeEditor_onBuildButton = function FDuiDateTimeEditor_onBuildButton(){
   var o = this;
   o.base.FDuiDropEditor.onBuildButton.call(o);
   var hf = MO.Window.Builder.appendTable(o.hButtonPanel);
   hf.width = '100%';
   hf.height = 20;
   hf.style.filter = "progid:DXImageTransform.Microsoft.Gradient(startColorStr='#EEEEEE', endColorStr='#FFFFFF', gradientType='0')";
   var hr = hf.insertRow();
   var hc = hr.insertCell();
   hc.style.padding = '0 6';
   var h = o.hNow = MO.Window.Builder.append(hc, 'SPAN');
   h.style.cursor = 'hand';
   o.attachEvent('onNowClick', h);
   h.innerText = MO.RContext.get('FDate:Now');
   var hc = hr.insertCell();
   hc.style.padding = '0 6';
   hc.align = 'right';
   var h = o.hNow = MO.Window.Builder.append(hc, 'SPAN');
   h.style.cursor = 'hand';
   o.attachEvent('onConfirmClick', h);
   h.innerText = MO.RContext.get('FDate:Confirm');
}
MO.FDuiDateTimeEditor_construct = function FDuiDateTimeEditor_construct(){
   var o = this;
   o.base.FDuiDropEditor.construct.call(o);
   o.date = new MO.TDate();
   o.years = new MO.TList();
   o.months = new MO.TList();
   o.days = new MO.TList();
}
MO.FDuiDateTimeEditor_buildTitle = function FDuiDateTimeEditor_buildTitle(n, ml){
   var o = this;
   var hf = MO.Window.Builder.appendTable(o.hDropPanel);
   hf.width = '100%';
   hf.style.borderBottom = '1 solid #999999';
   hf.style.filter = "progid:DXImageTransform.Microsoft.Gradient(startColorStr='#FFFFFF', endColorStr='#E5FAFE', gradientType='0')";
   hf.style.backgroundColor = '#F8F8F8';
   hf.style.padding = '2 6';
   var hr = hf.insertRow();
   var hc = hr.insertCell();
   hc.width = 60;
   var he = o['h' + n] = MO.Window.Builder.appendEdit(hc);
   he.style.width = '100%';
   he.style.textAlign = 'right';
   he.style.border = '1 solid #CCCCCC';
   he.maxLength = ml;
   var hc = hr.insertCell();
   hc.innerText = MO.RContext.get('FDate:' + n);
   return hf;
}
MO.FDuiDateTimeEditor_get = function FDuiDateTimeEditor_get(){
   return MO.Lang.Date.formatDate(this.date);
}
MO.FDuiDateTimeEditor_set = function FDuiDateTimeEditor_set(v){
   var o = this;
   MO.Lang.Date.autoParse(o.date, v);
   o.restore();
}
MO.FDuiDateTimeEditor_setYearVisible = function FDuiDateTimeEditor_setYearVisible(v){
   var o = this;
   o.hPanelYear.style.display = v? 'block':'none';
   o.hTitleYear.style.display = v? 'block':'none';
}
MO.FDuiDateTimeEditor_setMonthVisible = function FDuiDateTimeEditor_setMonthVisible(v){
   var o = this;
   o.hPanelMonth.style.display = v? 'block':'none';
   o.hTitleMonth.style.display = v? 'block':'none';
}
MO.FDuiDateTimeEditor_setDayVisible = function FDuiDateTimeEditor_setDayVisible(v){
   var o = this;
   o.hPanelDay.style.display = v? 'block':'none';
   o.hTitleDay.style.display = v? 'block':'none';
}
MO.FDuiDateTimeEditor_show = function FDuiDateTimeEditor_show(v){
   var o = this;
   o.base.FDuiDropEditor.show.call(o, v);
   var hp = o.hPanel;
   var hbf = o.hBorderForm;
   var s = o.source;
   var r = s.getEditRange();
   hp.style.pixelLeft = r.x;
   hp.style.pixelTop = r.y + r.height;
   hp.style.pixelWidth = 220;
   o.base.MShadow.show.call(o);
}
MO.FDuiDateTimeEditor_resetDay = function FDuiDateTimeEditor_resetDay(){
   var o = this;
   var monthDays = this.date.monthDays();
   for(var n=0; n<o.days.count; n++){
      var hd = o.days.get(n);
      if(n >= monthDays){
         hd.innerText = '.';
      }else{
        hd.innerText = MO.Lang.Integer.format(n+1, 2);
      }
   }
}
MO.FDuiDateTimeEditor_selectCell = function FDuiDateTimeEditor_selectCell(ls, v){
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
MO.FDuiDateTimeEditor_restore = function FDuiDateTimeEditor_restore(){
   var o = this;
   o.hYear.value = o.date.year;
   o.hMonth.value = o.date.month;
   o.hDay.value = o.date.day;
   o.selectCell(o.years, o.date.year);
   o.selectCell(o.months, o.date.month);
   o.selectCell(o.days, o.date.day);
}
MO.FDuiDateTimeEditor_dispose = function FDuiDateTimeEditor_dispose(){
   var o = this;
   o.base.FDuiDropEditor.dispose.call(o);
   o.hPanel = null;
}
MO.FDuiDropEditor = function FDuiDropEditor(o){
   o = MO.Class.inherits(this, o, MO.FDuiEditor, MO.MDuiShadow);
   o._stylePanel       = MO.Class.register(o, new MO.AStyle('_stylePanel'));
   o._styleDropForm    = MO.Class.register(o, new MO.AStyle('_styleDropForm'));
   o._styleDropPanel   = MO.Class.register(o, new MO.AStyle('_styleDropPanel'));
   o._styleButtonPanel = MO.Class.register(o, new MO.AStyle('_styleButtonPanel'));
   o._minWidth         = 160;
   o._minHeight        = 300;
   o._hDropForm        = null;
   o._hDropPanel       = null;
   o._hButtonPanel     = null;
   o.onBuildDrop       = MO.Method.virtual(o, 'onBuildDrop');
   o.onBuildButton     = MO.Method.empty;
   o.onBuild           = MO.FDuiDropEditor_onBuild;
   o.onDropMouseDown   = MO.Class.register(o, new MO.AEventMouseDown('onDropMouseDown'));
   o.onDropMouseUp     = MO.Class.register(o, new MO.AEventMouseUp('onDropMouseUp'));
   o.panel             = MO.FDuiDropEditor_panel;
   o.setVisible        = MO.FDuiDropEditor_setVisible;
   o.dispose           = MO.FDuiDropEditor_dispose;
   return o;
}
MO.FDuiDropEditor_onBuild = function FDuiDropEditor_onBuild(p){
   var o = this;
   o.__base.FDuiEditor.onBuild.call(o, p);
   var h = o._hPanel;
   h.className = o.styleName('Panel');
   var hf = o._hDropForm = MO.Window.Builder.appendTable(h, o.styleName('DropForm'));
   o._hDropPanel = MO.Window.Builder.appendTableRowCell(hf, o.styleName('DropPanel'));
   o._hButtonPanel = MO.Window.Builder.appendTableRowCell(hf, o.styleName('ButtonPanel'));
   o.onBuildDrop();
   o.onBuildButton();
}
MO.FDuiDropEditor_panel = function FDuiDropEditor_panel(panelCd){
   var o = this;
   if(panelCd == MO.EPanel.Shadow){
      return o.hPanel;
   }
   return o.__base.FDuiEditor.panel.call(o, panelCd);
}
MO.FDuiDropEditor_setVisible = function FDuiDropEditor_setVisible(p){
   var o = this;
   var h = o._hPanel;
   var hd = o._hPanel.ownerDocument;
   if(p){
      hd.body.appendChild(h);
   }else{
      hd.body.removeChild(h);
   }
   o.__base.FDuiEditor.setVisible.call(o, p);
}
MO.FDuiDropEditor_dispose = function FDuiDropEditor_dispose(){
   var o = this;
   o._hButtonPanel = MO.Window.Html.free(o._hButtonPanel);
   o._hDropPanel = MO.Window.Html.free(o._hDropPanel);
   o._hDropForm = MO.Window.Html.free(o._hDropForm);
   o.__base.FControl.dispose.call(o);
}
MO.FDuiEdit = function FDuiEdit(o){
   o = MO.Class.inherits(this, o, MO.FDuiEditControl, MO.MUiPropertyEdit);
   o._inputSize            = MO.Class.register(o, [new MO.APtySize2('_inputSize'), new MO.AGetter('_inputSize')]);
   o._unit                 = MO.Class.register(o, [new MO.APtyString('_unit'), new MO.AGetSet('_unit')]);
   o._listenersDataChanged = MO.Class.register(o, new MO.AListener('_listenersDataChanged'));
   o._hValueForm           = null;
   o._hValueLine           = null;
   o._hInputPanel          = null;
   o._hInput               = null;
   o.onBuildEditValue      = MO.FDuiEdit_onBuildEditValue;
   o.onInputEdit           = MO.Class.register(o, new MO.AEventInputChanged('onInputEdit'), MO.FDuiEdit_onInputEdit);
   o.construct             = MO.FDuiEdit_construct;
   o.formatText            = MO.FDuiEdit_formatText;
   o.formatValue           = MO.FDuiEdit_formatValue;
   o.get                   = MO.FDuiEdit_get;
   o.set                   = MO.FDuiEdit_set;
   o.refreshValue          = MO.FDuiEdit_refreshValue;
   o.refreshStyle          = MO.FDuiEdit_refreshStyle;
   o.dispose               = MO.FDuiEdit_dispose;
   return o;
}
MO.FDuiEdit_onBuildEditValue = function FDuiEdit_onBuildEditValue(event){
   var o = this;
   var hValuePanel = o._hValuePanel;
   var hValueForm = o._hValueForm = MO.Window.Builder.appendTable(hValuePanel);
   var hValueLine = o._hValueLine = MO.Window.Builder.appendTableRow(hValueForm);
   MO.Window.Html.setSize(hValueForm, o._inputSize);
   o._hChangePanel = MO.Window.Builder.appendTableCell(hValueLine);
   o.onBuildEditChange(event);
   var hInputPanel = o._hInputPanel = MO.Window.Builder.appendTableCell(hValueLine);
   var hInput = o._hInput = MO.Window.Builder.appendEdit(hInputPanel);
   o.attachEvent('onInputEdit', hInput, o.onInputEdit);
   if(o._editLength){
      hInput.maxLength = o._editLength;
   }
}
MO.FDuiEdit_onInputEdit = function FDuiEdit_onInputEdit(p){
   var o = this;
   o.refreshValue();
}
MO.FDuiEdit_construct = function FDuiEdit_construct(){
   var o = this;
   o.__base.FDuiEditControl.construct.call(o);
   o._inputSize = new MO.SSize2();
}
MO.FDuiEdit_formatText = function FDuiEdit_formatText(value){
   var o = this;
   var result = MO.Lang.String.nvl(value);
   o._dataDisplay = result;
   return result;
}
MO.FDuiEdit_formatValue = function FDuiEdit_formatValue(value){
   return value;
}
MO.FDuiEdit_get = function FDuiEdit_get(){
   var o = this;
   var value = o._hInput.value;
   return value;
}
MO.FDuiEdit_set = function FDuiEdit_set(value){
   var o = this;
   o._dataValue = value;
   var text = MO.Lang.String.nvl(value);
   o._hInput.value = text;
   o.changeSet(false);
}
MO.FDuiEdit_refreshValue = function FDuiEdit_refreshValue(){
   var o = this;
   o.processDataChangedListener(o);
}
MO.FDuiEdit_refreshStyle = function FDuiEdit_refreshStyle(){
   var o = this;
   o.__base.FDuiEditControl.refreshStyle.call(o);
   var inputStyle = null;
   if(o._statusEditable){
      if(o._statusValueHover){
         inputStyle = 'InputHover';
      }else{
         inputStyle = 'InputNormal';
      }
   }else{
      inputStyle = 'InputReadonly';
   }
   var hInput = o._hInput;
   hInput.className = o.styleName(inputStyle);
   hInput.readOnly = !o._statusEditable;
}
MO.FDuiEdit_dispose = function FDuiEdit_dispose(){
   var o = this
   o._inputSize = MO.Lang.Object.dispose(o._inputSize);
   o.__base.FDuiEditControl.dispose.call(o);
}
MO.FDuiEditControl = function FDuiEditControl(o){
   o = MO.Class.inherits(this, o, MO.FDuiControl, MO.MUiDataValue, MO.MUiDataField, MO.MUiDisplay, MO.MUiEditValue, MO.MUiEditable, MO.MDuiEditChange, MO.MDuiEditDrop);
   o._labelModeCd            = MO.Class.register(o, new MO.APtyString('_labelModeCd'), MO.EUiLabelMode.All);
   o._labelPositionCd        = MO.Class.register(o, new MO.APtyString('_labelPositionCd'), MO.EUiLabelPosition.Left);
   o._labelSize              = MO.Class.register(o, new MO.APtySize2('_labelSize'));
   o._labelAlignCd           = MO.Class.register(o, new MO.APtyString('_labelAlignCd'), MO.EUiAlign.Left);
   o._labelColor             = MO.Class.register(o, new MO.APtyString('_labelColor'));
   o._editSize               = MO.Class.register(o, new MO.APtySize2('_editSize'));
   o._editColor              = MO.Class.register(o, new MO.APtyString('_editColor'));
   o._styleLabelPanel        = MO.Class.register(o, new MO.AStyle('_styleLabelPanel'));
   o._styleEditPanel         = MO.Class.register(o, new MO.AStyle('_styleEditPanel'));
   o._styleValuePanel        = MO.Class.register(o, new MO.AStyle('_styleValuePanel'));
   o._styleValueNormal       = MO.Class.register(o, new MO.AStyle('_styleValueNormal'));
   o._styleValueHover        = MO.Class.register(o, new MO.AStyle('_styleValueHover'));
   o._styleValueReadonly     = MO.Class.register(o, new MO.AStyle('_styleValueReadonly'));
   o._styleInputPanel        = MO.Class.register(o, new MO.AStyle('_styleInputPanel'));
   o._styleInputNormal       = MO.Class.register(o, new MO.AStyle('_styleInputNormal'));
   o._styleInputHover        = MO.Class.register(o, new MO.AStyle('_styleInputHover'));
   o._styleInputReadonly     = MO.Class.register(o, new MO.AStyle('_styleInputReadonly'));
   o._optionValueStyle       = true;
   o._statusValueHover       = false;
   o._progressing            = false;
   o._hLabelPanel            = null;
   o._hLabelForm             = null;
   o._hIconPanel             = null;
   o._hIcon                  = null;
   o._hTextPanel             = null;
   o._hText                  = null;
   o._hEditPanel             = null;
   o._hEditForm              = null;
   o._hValuePanel            = null;
   o.onValueEnter            = MO.Class.register(o, new MO.AEventMouseEnter('onValueEnter'), MO.FDuiEditControl_onValueEnter);
   o.onValueLeave            = MO.Class.register(o, new MO.AEventMouseLeave('onValueLeave'), MO.FDuiEditControl_onValueLeave);
   o.onBuildLabelIcon        = MO.FDuiEditControl_onBuildLabelIcon;
   o.onBuildLabelText        = MO.FDuiEditControl_onBuildLabelText;
   o.onBuildLabel            = MO.FDuiEditControl_onBuildLabel;
   o.onBuildEditValue        = MO.Method.virtual(o, 'onBuildEditValue');
   o.onBuildEdit             = MO.FDuiEditControl_onBuildEdit;
   o.onBuildPanel            = MO.FDuiEditControl_onBuildPanel;
   o.onBuild                 = MO.FDuiEditControl_onBuild;
   o.oeMode                  = MO.FDuiEditControl_oeMode;
   o.oeProgress              = MO.FDuiEditControl_oeProgress;
   o.oeLoadUnit              = MO.FDuiEditControl_oeLoadUnit;
   o.oeSaveUnit              = MO.FDuiEditControl_oeSaveUnit;
   o.construct               = MO.FDuiEditControl_construct;
   o.calculateValueRectangle = MO.FDuiEditControl_calculateValueRectangle;
   o.panel                   = MO.FDuiEditControl_panel;
   o.setLabel                = MO.FDuiEditControl_setLabel;
   o.setEditable             = MO.FDuiEditControl_setEditable;
   o.refreshStyle            = MO.FDuiEditControl_refreshStyle;
   o.dispose                 = MO.FDuiEditControl_dispose;
   return o;
}
MO.FDuiEditControl_onValueEnter = function FDuiEditControl_onValueEnter(event){
   var o = this;
   o._statusValueHover = true;
   o.refreshStyle();
}
MO.FDuiEditControl_onValueLeave = function FDuiEditControl_onValueLeave(event){
   var o = this;
   o._statusValueHover = false;
   o.refreshStyle();
}
MO.FDuiEditControl_onBuildLabelIcon = function FDuiEditControl_onBuildLabelIcon(event){
   var o = this;
   if(o._labelIcon){
      o._hIcon = MO.Window.Builder.appendIcon(o._hIconPanel, null, o._labelIcon);
   }else{
      o._hIcon = MO.Window.Builder.appendIcon(o._hIconPanel, null, 'n', 16, 16);
   }
}
MO.FDuiEditControl_onBuildLabelText = function FDuiEditControl_onBuildLabelText(event){
   var o = this;
   o._hText = MO.Window.Builder.appendSpan(o._hTextPanel, null, o._label);
}
MO.FDuiEditControl_onBuildLabel = function FDuiEditControl_onBuildLabel(event){
   var o = this;
   var hLabelForm = o._hLabelForm = MO.Window.Builder.appendTable(o._hLabelPanel, o.styleName('LabelPanel'));
   var hLabelLine = MO.Window.Builder.appendTableRow(hLabelForm);
   var hIconPanel = o._hIconPanel = MO.Window.Builder.appendTableCell(hLabelLine);
   hIconPanel.width = '20px';
   o.onBuildLabelIcon(event);
   var hTextPanel = o._hTextPanel = MO.Window.Builder.appendTableCell(hLabelLine);
   hTextPanel.noWrap = true;
   o.onBuildLabelText(event);
   MO.Window.Html.setSize(hLabelForm, o._labelSize);
   if(o._labelAlignCd){
      hTextPanel.align = o._labelAlignCd;
      hTextPanel.style.paddingRight = 4;
   }
   if(o._labelColor){
      o._hLabel.style.color = o._labelColor;
   }
}
MO.FDuiEditControl_onBuildEdit = function FDuiEditControl_onBuildEdit(event){
   var o = this;
   var hEditForm = o._hEditForm = MO.Window.Builder.appendTable(o._hEditPanel, o.styleName('EditPanel'));
   var hEditLine = o._hEditLine = MO.Window.Builder.appendTableRow(hEditForm);
   var hValuePanel = o._hValuePanel = MO.Window.Builder.appendTableCell(hEditLine);
   o.attachEvent('onValueEnter', hValuePanel);
   o.attachEvent('onValueLeave', hValuePanel);
   o.onBuildEditValue(event);
   MO.Window.Html.setSize(hEditForm, o._editSize);
}
MO.FDuiEditControl_onBuildPanel = function FDuiEditControl_onBuildPanel(event){
   var o = this;
   o._hPanel = MO.Window.Builder.createTable(event, o.styleName('Panel'));
}
MO.FDuiEditControl_onBuild = function FDuiEditControl_onBuild(event){
   var o = this;
   o.__base.FDuiControl.onBuild.call(o, event);
   var hPanel = o._hPanel;
   var labelModeCd = o._labelModeCd;
   var hLabelPanel = null;
   var hEditPanel = null;
   if(labelModeCd == MO.EUiLabelMode.Label){
      hLabelPanel = MO.Window.Builder.appendTableCell(MO.Window.Builder.appendTableRow(hPanel));
   }else if(labelModeCd == MO.EUiLabelMode.Hidden){
      hEditPanel = MO.Window.Builder.appendTableCell(MO.Window.Builder.appendTableRow(hPanel));
   }else{
      var labelPositionCd = o._labelPositionCd;
      if(labelPositionCd == MO.EUiLabelPosition.Top){
         hLabelPanel = MO.Window.Builder.appendTableRowCell(hPanel);
         hEditPanel = MO.Window.Builder.appendTableRowCell(hPanel);
      }else if(labelPositionCd == MO.EUiLabelPosition.Right){
         var hRow = MO.Window.Builder.appendTableRow(hPanel);
         hEditPanel = MO.Window.Builder.appendTableCell(hRow);
         hLabelPanel = MO.Window.Builder.appendTableCell(hRow);
      }else if(labelPositionCd == MO.EUiLabelPosition.Bottom){
         hEditPanel = MO.Window.Builder.appendTableRowCell(hPanel);
         hLabelPanel = MO.Window.Builder.appendTableRowCell(hPanel);
      }else{
         var hRow = MO.Window.Builder.appendTableRow(hPanel);
         hLabelPanel = MO.Window.Builder.appendTableCell(hRow);
         hEditPanel = MO.Window.Builder.appendTableCell(hRow);
      }
   }
   o._hLabelPanel = hLabelPanel;
   o._hEditPanel = hEditPanel;
   if(hLabelPanel){
      o.onBuildLabel(event);
      hLabelPanel.appendChild(o._hLabelForm);
      o.setLabel(o._label);
   }
   if(hEditPanel){
      o.onBuildEdit(event);
   }
   o.refreshStyle();
}
MO.FDuiEditControl_oeMode = function FDuiEditControl_oeMode(event){
   var o = this;
   o.__base.FDuiControl.oeMode.call(o, event);
   o.__base.MUiDisplay.oeMode.call(o, event);
   o.__base.MUiEditable.oeMode.call(o, event);
   return MO.EEventStatus.Stop;
}
MO.FDuiEditControl_oeProgress = function FDuiEditControl_oeProgress(event){
   var o = this;
   if(o._progressing && event.enable){
      return MO.EEventStatus.Stop;
   }
   o._progressing = event.enable;
   if(event.enable){
      var ea = o._editable;
      o.setEditable(false);
      o._editable = ea;
   }else{
      o.setEditable(o._editable);
   }
   return MO.EEventStatus.Stop;
}
MO.FDuiEditControl_oeLoadUnit = function FDuiEditControl_oeLoadUnit(event){
   var o = this;
   var unit = event.unit;
   var dataName = o._dataName;
   if(!MO.Lang.String.isEmpty(dataName)){
      var text = unit.get(dataName);
      o.set(text);
   }
   return MO.EEventStatus.Stop;
}
MO.FDuiEditControl_oeSaveUnit = function FDuiEditControl_oeSaveUnit(event){
   var o = this;
   var unit = event.unit;
   var dataName = o._dataName;
   if(!MO.Lang.String.isEmpty(dataName)){
      var text = o.text();
      if(!MO.Lang.String.isEmpty(text)){
         unit.set(dataName, text)
      }
   }
   return MO.EEventStatus.Stop;
}
MO.FDuiEditControl_construct = function FDuiEditControl_construct(){
   var o = this;
   o.__base.FDuiControl.construct.call(o);
   o.__base.MDuiEditChange.construct.call(o);
   o.__base.MDuiEditDrop.construct.call(o);
   o._labelSize = new MO.SSize2(0, 0);
   o._editSize = new MO.SSize2(0, 0);
}
MO.FDuiEditControl_panel = function FDuiEditControl_panel(panelCd){
   var o = this;
   if(MO.EPanel.Edit == panelCd){
      return o._hEdit;
   }else if(MO.EPanel.Focus == panelCd){
      return o._hEdit;
   }
   return o.__base.FDuiControl.panel.call(o, panelCd);
}
MO.FDuiEditControl_setLabel = function FDuiEditControl_setLabel(value){
   var o = this;
   o._label = value;
   if(o._hText){
      o._hText.innerHTML = MO.Lang.String.nvl(value);
   }
}
MO.FDuiEditControl_setEditable = function FDuiEditControl_setEditable(value){
   var o = this;
   o._statusEditable = value;
   o.refreshStyle();
}
MO.FDuiEditControl_calculateValueRectangle = function FDuiEditControl_calculateValueRectangle(rectangle){
   var o = this;
   if(!rectangle){
      rectangle = new MO.SRectangle();
   }
   var hPanel = o._hValuePanel;
   var position = MO.Window.Html.clientPosition(hPanel);
   rectangle.left = position.x;
   rectangle.top = position.y;
   rectangle.width = hPanel.offsetWidth;
   rectangle.height = hPanel.offsetHeight;
   return rectangle;
}
MO.FDuiEditControl_refreshStyle = function FDuiEditControl_refreshStyle(){
   var o = this;
   if(o._optionValueStyle){
      var hForm = o._hValueForm;
      if(hForm){
         if(o._statusEditable){
            if(o._statusValueHover){
               hForm.className = o.styleName('ValueHover');
            }else{
               hForm.className = o.styleName('ValueNormal');
            }
         }else{
            hForm.className = o.styleName('ValueReadonly');
         }
      }
   }
}
MO.FDuiEditControl_dispose = function FDuiEditControl_dispose(){
   var o = this;
   o._labelSize = MO.Lang.Object.dispose(o._labelSize);
   o._editSize = MO.Lang.Object.dispose(o._editSize);
   o._hLabelPanel = MO.Window.Html.free(o._hLabelPanel);
   o._hLabelForm = MO.Window.Html.free(o._hLabelForm);
   o._hIconPanel = MO.Window.Html.free(o._hIconPanel);
   o._hIcon = MO.Window.Html.free(o._hIcon);
   o._hTextPanel = MO.Window.Html.free(o._hTextPanel);
   o._hText = MO.Window.Html.free(o._hText);
   o._hEditPanel = MO.Window.Html.free(o._hEditPanel);
   o._hEditForm = MO.Window.Html.free(o._hEditForm);
   o._hValuePanel = MO.Window.Html.free(o._hValuePanel);
   o._hDropPanel = MO.Window.Html.free(o._hDropPanel);
   o.__base.MDuiEditDrop.dispose.call(o);
   o.__base.MDuiEditChange.dispose.call(o);
   o.__base.FDuiControl.dispose.call(o);
}
MO.FDuiEditor = function FDuiEditor(o){
   o = MO.Class.inherits(this, o, MO.FDuiControl, MO.MDuiFocus);
   o._visible       = false;
   o._statusVisible = false;
   o._styleEdit     = MO.Class.register(o, new MO.AStyle('_styleEdit'));
   o._statusEditing = false;
   o._source        = null;
   o._hEdit         = null;
   o.lsnEditBegin   = null;
   o.lsnEditCancel  = null;
   o.lsnEditEnd     = null;
   o.onEditKeyDown  = MO.Class.register(o, new MO.AEventKeyDown('onEditKeyDown'));
   o.onEditKeyPress = MO.Class.register(o, new MO.AEventKeyPress('onEditKeyPress'));
   o.onEditKeyUp    = MO.Class.register(o, new MO.AEventKeyUp('onEditKeyUp'));
   o.onEditChange   = MO.Class.register(o, new MO.AEventChange('onEditChange'));
   o.onEditBegin    = MO.FDuiEditor_onEditBegin;
   o.onEditChanged  = MO.FDuiEditor_onEditChanged;
   o.onEditEnd      = MO.FDuiEditor_onEditEnd;
   o.onBuildPanel   = MO.FDuiEditor_onBuildPanel;
   o.onBuild        = MO.FDuiEditor_onBuild;
   o.get            = MO.Method.virtual(o, 'get');
   o.set            = MO.Method.virtual(o, 'set');
   o.doBlur         = MO.FDuiEditor_doBlur;
   o.panel          = MO.FDuiEditor_panel;
   o.linkControl    = MO.FDuiEditor_linkControl;
   o.editBegin      = MO.FDuiEditor_editBegin;
   o.editCancel     = MO.FDuiEditor_editCancel;
   o.editEnd        = MO.FDuiEditor_editEnd;
   o.reset          = MO.FDuiEditor_reset;
   o.setVisible     = MO.FDuiEditor_setVisible;
   o.dispose        = MO.FDuiEditor_dispose;
   return o;
}
MO.FDuiEditor_onEditBegin = function FDuiEditor_onEditBegin(){
   this.editBegin();
}
MO.FDuiEditor_onEditChanged = function FDuiEditor_onEditChanged(){
   var o = this;
   var g = o.storage = MO.Lang.Object.nvlObj(o.storage);
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
MO.FDuiEditor_onEditEnd = function FDuiEditor_onEditEnd(){
   var o = this;
   var s = o._source;
   o.hide();
   if(o.lsnEditEnd){
      o.lsnEditEnd.process(o);
   }
   s._editor = null;
   o._source = null;
   o._statusEditing = false;
}
MO.FDuiEditor_onBuildPanel = function FDuiEditor_onBuildPanel(p){
   var o = this;
   var h = o._hPanel = MO.Window.Builder.createSpan(p);
   h.__linker = o;
}
MO.FDuiEditor_onBuild = function FDuiEditor_onBuild(p){
   var o = this;
   o.__base.FDuiControl.onBuild.call(o, p);
   o._hPanel.style.zIndex = MO.EUiLayer.Editor;
}
MO.FDuiEditor_get = function FDuiEditor_get(name){
}
MO.FDuiEditor_set = function FDuiEditor_set(name, value){
}
MO.FDuiEditor_doBlur = function FDuiEditor_doBlur(){
   var o = this;
   var s = o._source;
   if(s){
      o.editCancel();
      if(MO.Class.isClass(s, MO.MDuiFocus)){
         s.doBlur();
      }
   }
}
MO.FDuiEditor_panel = function FDuiEditor_panel(panelCd){
   var o = this;
   if(panelCd == MO.EPanel.Edit){
      return o._hEdit;
   }else if(panelCd == MO.EPanel.Focus){
      return o._hEdit;
   }
   return o.__base.FDuiControl.panel.call(o, panelCd);
}
MO.FDuiEditor_linkControl = function FDuiEditor_linkControl(c){
   var o = this;
   o._source = c;
}
MO.FDuiEditor_editBegin = function FDuiEditor_editBegin(){
   var o = this;
   var s = o._source;
   if(o.lsnEditCancel){
      o.lsnEditCancel.process(o);
   }
   s._editor = o;
   o._statusEditing = true;
}
MO.FDuiEditor_editCancel = function FDuiEditor_editCancel(){
   var o = this;
   var s = o._source;
   o.hide();
   if(o.lsnEditCancel){
      o.lsnEditCancel.process(o);
   }
   s._editor = null;
   o._source = null;
   o._statusEditing = false;
}
MO.FDuiEditor_editEnd = function FDuiEditor_editEnd(){
   this.onEditEnd();
}
MO.FDuiEditor_reset = function FDuiEditor_reset(){
   var o = this;
   o.lsnEditBegin = null;
   o.lsnEditCancel = null;
   o.lsnEditEnd = null;
}
MO.FDuiEditor_setVisible = function FDuiEditor_setVisible(p){
   var o = this;
   o.__base.FDuiControl.setVisible.call(o, p);
   if(p){
      o.editBegin();
      o.focus();
   }
}
MO.FDuiEditor_dispose = function FDuiEditor_dispose(){
   var o = this;
   o.__base.FDuiControl.dispose.call(o);
   o._hEdit = null;
}
MO.FDuiFile = function FDuiFile(o){
   o = MO.Class.inherits(this, o, MO.FDuiEditControl, MO.MListenerDataChanged);
   o._inputSize       = MO.Class.register(o, new MO.APtySize2('_inputSize'));
   o._unit            = MO.Class.register(o, new MO.APtyString('_unit'));
   o._styleValuePanel = MO.Class.register(o, new MO.AStyle('_styleValuePanel'));
   o._styleInputPanel = MO.Class.register(o, new MO.AStyle('_styleInputPanel'));
   o._styleInput      = MO.Class.register(o, new MO.AStyle('_styleInput'));
   o._styleFile       = MO.Class.register(o, new MO.AStyle('_styleFile'));
   o._styleBrowser    = MO.Class.register(o, new MO.AStyle('_styleBrowser'));
   o._hValueForm      = null;
   o._hValueLine      = null;
   o._hInputPanel     = null;
   o._hInput          = null;
   o.onBuildEditValue = MO.FDuiFile_onBuildEditValue;
   o.onFileChange     = MO.Class.register(o, new MO.AEventChange('onFileChange'), MO.FDuiFile_onFileChange);
   o.construct        = MO.FDuiFile_construct;
   o.formatDisplay    = MO.FDuiFile_formatDisplay;
   o.formatValue      = MO.FDuiFile_formatValue;
   o.get              = MO.FDuiFile_get;
   o.set              = MO.FDuiFile_set;
   o.refreshValue     = MO.FDuiFile_refreshValue;
   return o;
}
MO.FDuiFile_onBuildEditValue = function FDuiFile_onBuildEditValue(p){
   var o = this;
   var hp = o._hValuePanel;
   hp.className = o.styleName('ValuePanel');
   var hf = o._hValueForm = MO.Window.Builder.appendTable(hp);
   hf.width = '100%';
   var hl = o._hValueLine = MO.Window.Builder.appendTableRow(hf);
   o._hChangePanel = MO.Window.Builder.appendTableCell(hl);
   o.onBuildEditChange(p);
   var hInputPanel = o._hInputPanel = MO.Window.Builder.appendTableCell(hl,  o.styleName('InputPanel'));
   var he = o._hInputEdit = MO.Window.Builder.appendEdit(hInputPanel, o.styleName('Input'));
   var hFile = o._hInput = MO.Window.Builder.appendFile(hInputPanel, o.styleName('File'));
   o.attachEvent('onFileChange', hFile);
   var hBrowserPanel = o._hBrowserPanel = MO.Window.Builder.appendTableCell(o._hEditLine);
   hBrowserPanel.style.paddingLeft = '4px';
   var hBrowser = o._hBrowser = MO.Window.Builder.appendButton(hBrowserPanel, o.styleName('Browser'));
   hBrowser.value = '浏览...';
   MO.Window.Html.setSize(hInputPanel, o._inputSize);
   MO.Window.Html.setSize(hFile, o._inputSize);
   if(o._editLength){
      he.maxLength = o._editLength;
   }
}
MO.FDuiFile_onFileChange = function FDuiFile_onFileChange(event){
   var o = this;
   var hFile = o._hInput;
   if(hFile.files){
      if(hFile.files.length){
         var file = hFile.files[0];
         var name = file.name;
         o._hInputEdit.value = name + ' (' + file.size + 'byte)';
         o.processDataChangedListener(event);
      }
   }
}
MO.FDuiFile_construct = function FDuiFile_construct(){
   var o = this;
   o.__base.FDuiEditControl.construct.call(o);
   o._inputSize = new MO.SSize2(120, 0);
}
MO.FDuiFile_formatDisplay = function FDuiFile_formatDisplay(p){
   var o = this;
   var r = MO.Lang.String.nvl(p);
   o._dataDisplay = r;
   return r;
}
MO.FDuiFile_formatValue = function FDuiFile_formatValue(p){
   return p;
}
MO.FDuiFile_get = function FDuiFile_get(){
   var o = this;
   var r = o.__base.FDuiEditControl.get.call(o);
   var r = o._hInput.value;
   return r;
}
MO.FDuiFile_set = function FDuiFile_set(p){
   var o = this;
   o.__base.FDuiEditControl.set.call(o, p);
   o._hInput.value = MO.Lang.String.nvl(p);
}
MO.FDuiFile_refreshValue = function FDuiFile_refreshValue(){
   var o = this;
   o.processDataChangedListener(o);
}
MO.FDuiForm = function FDuiForm(o){
   o = MO.Class.inherits(this, o, MO.FDuiLayout, MO.MUiDataContainer, MO.MUiDisplayContrainer, MO.MDuiDescribeFrame);
   o._logicGroup    = MO.Class.register(o, [new MO.APtyString('_logicGroup'), new MO.AGetter('_logicGroup')]);
   o._logicCode     = MO.Class.register(o, [new MO.APtyString('_logicCode'), new MO.AGetter('_logicCode')]);
   o._logicService  = MO.Class.register(o, [new MO.APtyString('_logicService'), new MO.AGetter('_logicService')]);
   o._logicAction   = MO.Class.register(o, [new MO.APtyString('_logicAction'), new MO.AGetter('_logicAction')]);
   o.construct      = MO.FDuiForm_construct;
   o.processMode    = MO.FDuiForm_processMode;
   o.dispose        = MO.FDuiForm_dispose;
   return o;
}
MO.FDuiForm_construct = function FDuiForm_construct(){
   var o = this;
   o.__base.FDuiLayout.construct.call(o);
   o.__base.MUiDisplayContrainer.construct.call(o);
}
MO.FDuiForm_dispose = function FDuiForm_dispose(){
   var o = this;
   o._hEdit = MO.Window.Html.free(o._hEdit);
   o._hDrop = MO.Window.Html.free(o._hDrop);
   o.__base.MUiDisplayContrainer.dispose.call(o);
   o.__base.FDuiLayout.dispose.call(o);
}
MO.FDuiForm_onMouseDown = function FDuiForm_onMouseDown(p){
   var o = this;
}
MO.FDuiForm_onLoadDataset = function FDuiForm_onLoadDataset(ds){
   var o = this;
   o.doUpdate(o.dsViewer.current());
}
MO.FDuiForm_onLoadDatasetEnd = function FDuiForm_onLoadDatasetEnd(){
   var o = this;
   o.topControl().topResize();
   o.psProgress(false);
}
MO.FDuiForm_isDataChanged = function FDuiForm_isDataChanged(){
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
MO.FDuiForm_getFormLink = function FDuiForm_getFormLink(t){
   var o = this;
   if(EFormLink.Form == t){
      return o.name;
   }else if(EFormLink.Table == t){
      return o.formName;
   }
   RMessage.fatal(o, null, 'Form link is invalid. (type={0})', t);
}
MO.FDuiForm_allDataComponents = function FDuiForm_allDataComponents(p, m){
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
         if(!MO.Class.isClass(c, MDataset)){
            if(MO.Class.isClass(c, MValue)){
               m.set(c.dataName, c);
            }
            o.allDataComponents(c, m);
         }
      }
   }
   return m;
}
MO.FDuiForm_get = function FDuiForm_get(n){
   var ps = this.allDataComponents();
   if(ps){
      var p = ps.get(n);
      if(p){
         return p.get();
      }
   }
}
MO.FDuiForm_set = function FDuiForm_set(n){
   var ps = this.allDataComponents();
   if(ps){
      var p = ps.get(n);
      if(p){
         return p.reget();
      }
   }
}
MO.FDuiForm_set = function FDuiForm_set(n, v){
   var ps = this.allDataComponents();
   if(ps){
      var p = ps.get(n);
      if(p){
         p.set(v);
      }
   }
}
MO.FDuiForm_getDataCodes = function FDuiForm_getDataCodes(){
   var o = this;
   var e = o._codeEvent;
   e.values = new TAttributes();
   o.process(e);
   return e.values;
}
MO.FDuiForm_getCurrentRow = function FDuiForm_getCurrentRow(){
   return this.saveValue();
}
MO.FDuiForm_getSelectedRows = function FDuiForm_getSelectedRows(){
   var ls = new TList();
   ls.push(this.saveValue());
   return ls;
}
MO.FDuiForm_getCurrentRows = function FDuiForm_getCurrentRows(){
   var o = this;
   var ls = new TList();
   var r = new TRow();
   o.toDeepAttributes(r);
   o.saveValue(r);
   ls.push(r);
   return ls;
}
MO.FDuiForm_getChangedRows = function FDuiForm_getChangedRows(){
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
MO.FDuiForm_getRows = function FDuiForm_getRows(){
   var ls = new TList();
   ls.push(this.saveValue());
   return ls;
}
MO.FDuiForm_clearValue = function FDuiForm_clearValue(){
   this.process(this._clearEvent);
}
MO.FDuiForm_resetValue = function FDuiForm_resetValue(){
   this.process(this._resetEvent);
}
MO.FDuiForm_loadValue = function FDuiForm_loadValue(r, m){
   if(r){
      var o = this;
      var e = o._loadEvent;
      e.viewer = o.dsViewer;
      e.store = m;
      e.values = r;
      o.process(e);
   }
}
MO.FDuiForm_saveValue = function FDuiForm_saveValue(r, m){
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
MO.FDuiForm_recordValue = function FDuiForm_recordValue(){
   this.process(this._recordEvent);
}
MO.FDuiForm_toAttributes = function FDuiForm_toAttributes(r, m){
   return this.saveValue(r, m);
}
MO.FDuiForm_focus = function FDuiForm_focus(){
   var o = this;
   o.__base.MDuiFocus.focus.call(o);
   o.focusControl();
   RConsole.find(FFocusConsole).focusClass(MDataset, o);
}
MO.FDuiForm_dsUpdate = function FDuiForm_dsUpdate(u, v){
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
MO.FDuiForm_setEditable = function FDuiForm_setEditable(v){
   var ps = this.allDataComponents();
   if(ps){
      var pc = ps.count;
      for(var n = 0; n < pc; n++){
         var p = ps.value(n);
         p.setEditable(v);
      }
   }
}
MO.FDuiForm_doPrepare = function FDuiForm_doPrepare(v){
   var o = this;
   o._dataStatusCd = ERowStatus.Insert;
   o.resetValue();
   o.loadValue(v);
   o.recordValue();
   o.dsLoaded();
}
MO.FDuiForm_doUpdate = function FDuiForm_doUpdate(v){
   var o = this;
   o._dataStatusCd = ERowStatus.Update;
   o.clearValue();
   o.loadValue(v);
   o.recordValue();
   o.dsLoaded();
}
MO.FDuiForm_doDelete = function FDuiForm_doDelete(v){
   var o = this;
   o._dataStatusCd = ERowStatus.Delete;
   o.clearValue();
   o.loadValue(v);
   o.recordValue();
   o.dsLoaded();
}
MO.FDuiForm_allNameComponents = function FDuiForm_allNameComponents(f, p, m){
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
         if(!MO.Class.isClass(c, MDataset)){
            if(MO.Class.isClass(c, MValue)){
               m.set(c.name, c);
            }
            o.allNameComponents(false, c, m);
         }
      }
   }
   return vs;
}
MO.FDuiForm_onLoaded = function FDuiForm_onLoaded(){
   var o = this.form;
   var doc = this.document;
   if(o && doc){
      RControl.build(o, doc.root());
      o.isLoading = false;
      o.lsnsLoaded.process(o);
   }
}
MO.FDuiForm_onDsFetchEnd = function FDuiForm_onDsFetchEnd(){
   var o = this;
   var v = o.dsCurrent();
   if(v){
      o.loadValue(v);
   }
}
MO.FDuiForm_onDsUpdateBegin = function FDuiForm_onDsUpdateBegin(){
   var o = this;
   var v = o.dsCurrent();
   if(v){
      o.saveValue(v);
   }
}
MO.FDuiForm_onDsUpdateEnd = function FDuiForm_onDsUpdateEnd(){
   var o = this;
   var v = o.dsCurrent();
   if(v){
      o.loadValue(v);
   }
}
MO.FDuiForm_connect = function FDuiForm_connect(service, type, action, attrs){
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
MO.FDuiForm_loadDocument = function FDuiForm_loadDocument(doc){
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
MO.FDuiForm_testStatus = function FDuiForm_testStatus(t){
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
MO.FDuiForm_hasAction = function FDuiForm_hasAction(){
   var o = this;
   var cs = o.components;
   var ct = cs.count;
   for(var n = 0; n < ct; n++){
      var c = cs.value(n);
      if(MO.Class.isClass(c, FDataAction)){
         return true;
      }
   }
   return false;
}
MO.FDuiFrame = function FDuiFrame(o){
   o = MO.Class.inherits(this, o, MO.FDuiLayout);
   return o;
}
MO.FDuiIconPicker = function FDuiIconPicker(o){
   o = MO.Class.inherits(this, o, MO.FDuiEditControl, MO.MUiPropertyEdit);
   o._inputSize            = MO.Class.register(o, new MO.APtySize2('_inputSize'));
   o._unit                 = MO.Class.register(o, new MO.APtyString('_unit'));
   o._listenersDataChanged = MO.Class.register(o, new MO.AListener('_listenersDataChanged', MO.EEvent.DataChanged));
   o._hValueForm           = null;
   o._hValueLine           = null;
   o._hInputPanel          = null;
   o._hInput               = null;
   o.onBuildEditValue      = MO.FDuiIconPicker_onBuildEditValue;
   o.onInputEdit           = MO.Class.register(o, new MO.AEventInputChanged('onInputEdit'), MO.FDuiIconPicker_onInputEdit);
   o.construct             = MO.FDuiIconPicker_construct;
   o.formatText            = MO.FDuiIconPicker_formatText;
   o.formatValue           = MO.FDuiIconPicker_formatValue;
   o.get                   = MO.FDuiIconPicker_get;
   o.set                   = MO.FDuiIconPicker_set;
   o.setEditAble           = MO.FDuiIconPicker_setEditAble;
   o.refreshValue          = MO.FDuiIconPicker_refreshValue;
   o.refreshStyle          = MO.FDuiIconPicker_refreshStyle;
   o.dispose               = MO.FDuiIconPicker_dispose;
   return o;
}
MO.FDuiIconPicker_onBuildEditValue = function FDuiIconPicker_onBuildEditValue(event){
   var o = this;
   var hValuePanel = o._hValuePanel;
   var hValueForm = o._hValueForm = MO.Window.Builder.appendTable(hValuePanel);
   var hValueLine = o._hValueLine = MO.Window.Builder.appendTableRow(hValueForm);
   MO.Window.Html.setSize(hValueForm, o._inputSize);
   o._hChangePanel = MO.Window.Builder.appendTableCell(hValueLine);
   o.onBuildEditChange(event);
   var hInputPanel = o._hInputPanel = MO.Window.Builder.appendTableCell(hValueLine);
   var hInput = o._hInput = MO.Window.Builder.appendEdit(hInputPanel);
   o.attachEvent('onInputEdit', hInput, o.onInputEdit);
   if(o._editLength){
      hInput.maxLength = o._editLength;
   }
}
MO.FDuiIconPicker_onInputEdit = function FDuiIconPicker_onInputEdit(p){
   var o = this;
   o.refreshValue();
}
MO.FDuiIconPicker_construct = function FDuiIconPicker_construct(){
   var o = this;
   o.__base.FDuiEditControl.construct.call(o);
   o._inputSize = new MO.SSize2(0, 0);
}
MO.FDuiIconPicker_formatText = function FDuiIconPicker_formatText(value){
   var o = this;
   var result = MO.Lang.String.nvl(value);
   o._dataDisplay = result;
   return result;
}
MO.FDuiIconPicker_formatValue = function FDuiIconPicker_formatValue(value){
   return value;
}
MO.FDuiIconPicker_get = function FDuiIconPicker_get(){
   var o = this;
   var value = o._hInput.value;
   return value;
}
MO.FDuiIconPicker_set = function FDuiIconPicker_set(value){
   var o = this;
   o._dataValue = value;
   var text = MO.Lang.String.nvl(value);
   o._hInput.value = text;
   o.changeSet(false);
}
MO.FDuiIconPicker_setEditAble = function FDuiIconPicker_setEditAble(flag){
   var o = this;
   o.__base.FDuiEditControl.setEditAble.call(o, flag);
   o._hInput.readOnly = !flag;
}
MO.FDuiIconPicker_refreshValue = function FDuiIconPicker_refreshValue(){
   var o = this;
   o.processDataChangedListener(o);
}
MO.FDuiIconPicker_refreshStyle = function FDuiIconPicker_refreshStyle(){
   var o = this;
   o.__base.FDuiEditControl.refreshStyle.call(o);
   var inputStyle = null;
   if(o._statusEditable){
      if(o._statusValueHover){
         inputStyle = 'InputHover';
      }else{
         inputStyle = 'InputNormal';
      }
   }else{
      inputStyle = 'InputReadonly';
   }
   var hInput = o._hInput;
   hInput.className = o.styleName(inputStyle);
   hInput.readOnly = !o._statusEditable;
}
MO.FDuiLabel = function FDuiLabel(o){
   o = MO.Class.inherits(this, o, MO.FDuiControl);
   o.onBuild = MO.FDuiLabel_onBuild;
   o.get     = MO.FDuiLabel_get;
   o.set     = MO.FDuiLabel_set;
   return o;
}
MO.FDuiLabel_onBuild = function FDuiLabel_onBuild(event){
   var o = this;
   o.__base.FDuiControl.onBuild.call(o, event);
}
MO.FDuiLabel_get = function FDuiLabel_get(){
   return this._hPanel.innerHTML;
}
MO.FDuiLabel_set = function FDuiLabel_set(value){
   this._hPanel.innerHTML = value;
}
MO.FDuiLayout = function FDuiLayout(o){
   o = MO.Class.inherits(this, o, MO.FDuiContainer);
   o._styleForm         = MO.Class.register(o, new MO.AStyle('_styleForm'));
   o._styleControlPanel = MO.Class.register(o, new MO.AStyle('_styleControlPanel'));
   o._lastSplit      = null;
   o._hPanelForm     = null;
   o._hContainer     = null;
   o._hPanelTable    = null;
   o._hPanelLine     = null;
   o.onBuildPanel    = MO.FDuiLayout_onBuildPanel;
   o.onDesignBegin   = MO.FDuiLayout_onDesignBegin;
   o.onDesignEnd     = MO.FDuiLayout_onDesignEnd;
   o.oeDesign        = MO.FDuiLayout_oeDesign;
   o.oeResize        = MO.FDuiLayout_oeResize;
   o.oeRefresh       = MO.FDuiLayout_oeRefresh;
   o.insertPosition  = MO.FDuiLayout_insertPosition;
   o.moveChild       = MO.FDuiLayout_moveChild;
   o.innerAppendLine = MO.FDuiLayout_innerAppendLine;
   o.appendChild     = MO.FDuiLayout_appendChild;
   o.resize          = MO.FDuiLayout_resize;
   o.dispose         = MO.FDuiLayout_dispose;
   return o;
}
MO.FDuiLayout_onBuildPanel = function FDuiLayout_onBuildPanel(event){
   var o = this;
   var h = o._hPanel = o._hPanelForm = MO.Window.Builder.createTable(event, o.styleName('Form'), null, 0, 1);
   if(o._layoutCd == MO.EUiLayout.Design){
      var hr = MO.Window.Builder.appendTableRow(h);
      var hc = MO.Window.Builder.appendTableCell(hr);
      o._hContainer = hc;
   }
}
MO.FDuiLayout_onDesignBegin = function FDuiLayout_onDesignBegin(){
   var o = this;
   o.__base.MDesign.onDesignBegin.call(o);
}
MO.FDuiLayout_onDesignEnd = function FDuiLayout_onDesignEnd(){
   var o = this;
   o.__base.MDesign.onDesignEnd.call(o);
}
MO.FDuiLayout_oeDesign = function FDuiLayout_oeDesign(p){
   var o = this;
   o.__base.FDuiContainer.oeDesign.call(o, p);
   if(p.isAfter()){
      switch(p.layoutCd){
         case MO.EDesign.Move:
            break;
         case MO.EDesign.Border:
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
MO.FDuiLayout_oeResize = function FDuiLayout_oeResize(p){
   var o = this;
   o.__base.FDuiContainer.oeResize.call(o, p);
   if(p.isAfter()){
      o.resize();
   }
}
MO.FDuiLayout_oeRefresh = function FDuiLayout_oeRefresh(p){
   var o = this;
   o.__base.FDuiContainer.oeDesign.call(o, p);
   if(p.isAfter()){
      o.resize();
   }
}
MO.FDuiLayout_insertPosition = function FDuiLayout_insertPosition(controlSource, controlTarget, index, copy){
   var o = this;
   var components = o._components;
   var controls = o._controls;
   components.removeValue(controlSource);
   controls.removeValue(controlSource);
   if(controlTarget){
      var index = components.indexOfValue(controlTarget);
      components.insert(index + index, controlSource.name, controlSource);
      var index = controls.indexOfValue(controlTarget);
      controls.insert(index + index, controlSource.name, controlSource);
   }else{
      components.set(controlSource.name, controlSource);
      controls.set(controlSource.name, controlSource);
   }
}
MO.FDuiLayout_moveChild = function FDuiLayout_moveChild(cf, ct, pos, copy){
   if(!(cf && ct && pos) || (cf == ct)){
      return;
   }
   var o = this;
   var hPanel = o._hPanel;
   var moved = false;
   var cfh = MO.Class.isClass(cf, MO.MDuiHorizontal);
   var hCfTd = MO.Window.Html.parent(cf._hPanel, 'TD');
   var hCfTab = MO.Window.Html.parent(cf._hPanel, 'TABLE');
   var cth = MO.Class.isClass(ct, MO.MDuiHorizontal);
   var hTd = MO.Window.Html.parent(ct._hPanel, 'TD');
   var hTable = MO.Window.Html.parent(hTd, 'TABLE');
   switch(pos){
      case EPosition.Before:
         var hRow = hTable.rows[0];
         for(var n = 0; n < hRow.cells.length; n++){
            if(hRow.cells[n] == hTd){
               var hCell = MO.Window.Builder.appendTableCell(hRow, null, hTd.cellIndex);
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
               var hCfTd = MO.Window.Html.parent(cf._hPanel, 'TD');
               var hCell = MO.Window.Builder.appendTableCell(hRow, null, hTd.cellIndex + 1);
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
               var hCell = MO.Window.Builder.appendTableCell(o._hPanelLine);
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
                     var hCell = MO.Window.Builder.appendTableCell(o._hPanelLine);
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
            var hCell = MO.Window.Builder.appendTableCell(o._hPanelLine);
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
MO.FDuiLayout_innerAppendLine = function FDuiLayout_innerAppendLine(){
   var o = this;
   var h = null;
   if(o._layoutCd == EUiLayout.Design){
      h = o._hPanelTable = MO.Window.Builder.appendTable(o._hContainer);
      h.style.paddingBottom = 4;
      o._hPanelLine = MO.Window.Builder.appendTableRow(h);
   }else{
      o._hPanelTable = null;
      o._hPanelLine = null;
   }
   return h;
}
MO.FDuiLayout_appendChild = function FDuiLayout_appendChild(control){
   var o = this;
   if(o._layoutCd == MO.EUiLayout.Design){
      if(!o._hPanelLine){
         o.innerAppendLine();
      }
      if(MO.Class.isClass(control, MO.MDuiHorizontal)){
         if(o._hPanelTable.rows[0].cells.length == 0){
            o._hContainer.insertBefore(control._hPanel, o._hPanelTable);
         }else{
            o._hContainer.appendChild(control._hPanel);
            o.innerAppendLine();
         }
         return;
      }
      var hCell = MO.Window.Builder.appendTableCell(o._hPanelLine, o.styleName('ControlPanel'));
      if(!MO.Class.isClass(control, MO.FDuiLayout)){
         control._hPanelLine = o._hPanelTable;
      }
      hCell.appendChild(control._hPanel);
      control._hLayoutCell = hCell;
      if(!control.nowrap() && (o.controls.last() != control)){
         o.innerAppendLine();
      }
   }else{
      control._hPanel.style.paddingTop = 2;
      control._hPanel.style.paddingBottom = 2;
      if(control.dockCd() == MO.EUiDock.Fill){
         var hCell = MO.Window.Builder.appendTableRowCell(o._hPanelForm, o.styleName('ControlPanel'));
         hCell.appendChild(control._hPanel);
      }else if(control._sizeCd == MO.EUiSize.Fill){
         var hCell = MO.Window.Builder.appendTableRowCell(o._hPanelForm, o.styleName('ControlPanel'));
         hCell.appendChild(control._hPanel);
      }else if(MO.Lang.Set.contains(control._sizeCd, MO.EUiSize.Horizontal) || '100%' == control.width){
         if(MO.Class.isClass(control, MO.FDuiSplit)){
            o._lastSplit = control;
         }
         var hLine = MO.Window.Builder.appendTableRow(o._hPanelForm);
         var hCell = MO.Window.Builder.appendTableCell(hLine, o.styleName('ControlPanel'));
         hCell.vAlign = 'top';
         hCell.appendChild(control._hPanel);
         control._hLayoutRow = hLine;
         o._hPanelLast = hCell;
         if(!MO.Lang.Set.contains(control._sizeCd, MO.EUiSize.Vertical)){
            hCell.height = 1;
         }else if(control.height){
            hCell.height = control.height;
         }
         o._hPanelLine = null;
      }else{
         if(!o._hPanelLine){
            var hLine = MO.Window.Builder.appendTableRow(o._hPanelForm);
            hLine.height = 1;
            if(o._lastSplit){
               o._lastSplit.pushLine(hLine);
            }
            var hCell = MO.Window.Builder.appendTableCell(hLine, o.styleName('ControlPanel'));
            hCell.vAlign = 'top';
            var ht = o._hPanelTable = MO.Window.Builder.appendTable(hCell);
            o._hPanelLine = MO.Window.Builder.appendTableRow(ht);
         }
         var hCell = MO.Window.Builder.appendTableCell(o._hPanelLine, o.styleName('ControlPanel'))
         control._hLayoutRow = o._hPanelLine;
         o._hPanelLast = hCell;
         hCell.appendChild(control._hPanel);
         control._hLayoutCell = hCell;
         if(!control.nowrap()){
            o._hPanelLine = null;
         }
      }
   }
}
MO.FDuiLayout_resize = function FDuiLayout_resize(){
   var o = this;
   var components = o._components;
   if(components){
      var ha = false;
      var count = components.count();
      for(var n = 0; n < count; n++){
         var component = components.at(n);
         if(MO.Class.isClass(component, MO.FDuiTable) || MO.Class.isClass(component, MO.FDuiPageControl)){
            ha = true;
            break;
         }
      }
   }
}
MO.FDuiLayout_dispose = function FDuiLayout_dispose(){
   var o = this;
   o._hPanelCurrent = null;
   o._hPanelTable = null;
   o._hPanel = null;
   o._hContainer = null;
   o.__base.FDuiContainer.dispose.call(o);
}
MO.FDuiLayoutHorizontal = function FDuiLayoutHorizontal(o){
   o = MO.Class.inherits(this, o, MO.FDuiContainer);
   o._stylePanel  = MO.Class.register(o, new MO.AStyle('_stylePanel'));
   o._hLine       = null;
   o.onBuildPanel = MO.FDuiLayoutHorizontal_onBuildPanel;
   o.onBuild      = MO.FDuiLayoutHorizontal_onBuild;
   o.appendChild  = MO.FDuiLayoutHorizontal_appendChild;
   o.dispose      = MO.FDuiLayoutHorizontal_dispose;
   return o;
}
MO.FDuiLayoutHorizontal_onBuildPanel = function FDuiLayoutHorizontal_onBuildPanel(event){
   var o = this;
   o._hPanel = MO.Window.Builder.createTable(event, o.styleName('Panel'));
}
MO.FDuiLayoutHorizontal_onBuild = function FDuiLayoutHorizontal_onBuild(event){
   var o = this;
   o.__base.FDuiContainer.onBuild.call(o, event)
   o._hLine = MO.Window.Builder.appendTableRow(o._hPanel);
}
MO.FDuiLayoutHorizontal_appendChild = function FDuiLayoutHorizontal_appendChild(control){
   var o = this;
   var hCell = MO.Window.Builder.appendTableCell(o._hLine);
   hCell.appendChild(control._hPanel);
   var dockCd = control.dockCd();
   if(dockCd == 'left'){
      hCell.align = 'left';
   }else if(dockCd == 'center'){
      hCell.align = 'center';
   }else if(dockCd == 'right'){
      hCell.align = 'right';
   }
}
MO.FDuiLayoutHorizontal_dispose = function FDuiLayoutHorizontal_dispose(){
   var o = this;
   o._hLine = MO.Window.Html.free(o._hLine);
   o.__base.FDuiContainer.dispose.call(o);
}
MO.FDuiLayoutVertical = function FDuiLayoutVertical(o){
   o = MO.Class.inherits(this, o, MO.FDuiContainer);
   o._stylePanel  = MO.Class.register(o, new MO.AStyle('_stylePanel'));
   o._hLine       = null;
   o.onBuildPanel = MO.FDuiLayoutVertical_onBuildPanel;
   o.appendChild  = MO.FDuiLayoutVertical_appendChild;
   o.dispose      = MO.FDuiLayoutVertical_dispose;
   return o;
}
MO.FDuiLayoutVertical_onBuildPanel = function FDuiLayoutVertical_onBuildPanel(event){
   var o = this;
   o._hPanel = MO.Window.Builder.createTable(event, o.styleName('Panel'));
}
MO.FDuiLayoutVertical_appendChild = function FDuiLayoutVertical_appendChild(control){
   var o = this;
   var hCell = MO.Window.Builder.appendTableRowCell(o._hPanel);
   hCell.appendChild(control._hPanel);
   var height = control.size().height;
   if(height){
      hCell.style.height = height + 'px';
   }
}
MO.FDuiLayoutVertical_dispose = function FDuiLayoutVertical_dispose(){
   var o = this;
   o.__base.FDuiContainer.dispose.call(o);
}
MO.FDuiListBox = function FDuiListBox(o){
   o = MO.Class.inherits(this, o, MO.FDuiContainer, MO.MDuiHorizontal, MO.MListenerClick);
   o._sizeCd      = MO.EUiSize.Horizontal
   o._stylePanel  = MO.Class.register(o, new MO.AStyle('_stylePanel'));
   o._hForm       = null;
   o.onBuildPanel = MO.FDuiListBox_onBuildPanel;
   o.createItem   = MO.FDuiListBox_createItem;
   o.appendChild  = MO.FDuiListBox_appendChild;
   o.clickItem    = MO.FDuiListBox_clickItem;
   o.clear        = MO.FDuiListBox_clear;
   o.dispose      = MO.FDuiListBox_dispose;
   return o;
}
MO.FDuiListBox_onBuildPanel = function FDuiListBox_onBuildPanel(p){
   var o = this;
   o._hPanel = MO.Window.Builder.createTable(p, o.styleName('Panel'));
}
MO.FDuiListBox_createItem = function FDuiListBox_createItem(icon, label){
   var o = this;
   var item = MO.Class.create(MO.FDuiListItem);
   item.build(o._hPanel);
   item.setLabel(label);
   return item;
}
MO.FDuiListBox_appendChild = function FDuiListBox_appendChild(control){
   var o = this;
   o._hPanel.appendChild(control._hPanel);
}
MO.FDuiListBox_clickItem = function FDuiListBox_clickItem(item){
   var o = this;
   var components = o._components;
   if(components){
      var count = components.count();
      for(var i = 0; i < count; i++){
         var component = components.at(i);
         if(MO.Class.isClass(component, MO.FDuiListItem)){
            component.setChecked(component == item);
         }
      }
   }
   var event = new MO.SEvent(o);
   event.item = item;
   o.processClickListener(event);
   event.dispose();
}
MO.FDuiListBox_clear = function FDuiListBox_clear(){
   var o = this;
   var components = o._components;
   if(components){
      var count = components.count();
      for(var i = 0; i < count; i++){
         var component = components.at(i);
         if(MO.Class.isClass(component, MO.FDuiListItem)){
            o._hPanel.removeChild(component._hPanel);
         }
         component.dispose();
      }
      components.clear();
      o._controls.clear();
   }
}
MO.FDuiListBox_dispose = function FDuiListBox_dispose(){
   var o = this;
   o.__base.FContainer.dispose.call(o);
}
MO.FDuiListItem = function FDuiListItem(o){
   o = MO.Class.inherits(this, o, MO.FDuiControl);
   o._styleNormal    = MO.Class.register(o, new MO.AStyle('_styleNormal'));
   o._styleHover     = MO.Class.register(o, new MO.AStyle('_styleHover'));
   o._styleSelect    = MO.Class.register(o, new MO.AStyle('_styleSelect'));
   o._styleIconPanel = MO.Class.register(o, new MO.AStyle('_styleIconPanel'));
   o._styleIcon      = MO.Class.register(o, new MO.AStyle('_styleIcon'));
   o._styleLabel     = MO.Class.register(o, new MO.AStyle('_styleLabel'));
   o._checked        = false;
   o._hPanel         = null;
   o._hIconPanel     = null;
   o._hIcon          = null;
   o._hLabel         = null;
   o.onBuildPanel    = MO.FDuiListItem_onBuildPanel;
   o.onBuild         = MO.FDuiListItem_onBuild;
   o.onEnter         = MO.FDuiListItem_onEnter;
   o.onLeave         = MO.FDuiListItem_onLeave;
   o.onClick         = MO.Class.register(o, new MO.AEventClick('onClick'), MO.FDuiListItem_onClick);
   o.label           = MO.FDuiListItem_label;
   o.setLabel        = MO.FDuiListItem_setLabel;
   o.setChecked      = MO.FDuiListItem_setChecked;
   o.dispose         = MO.FDuiListItem_dispose;
   return o;
}
MO.FDuiListItem_onBuildPanel = function FDuiListItem_onBuildPanel(p){
   var o = this;
   o._hPanel = MO.Window.Builder.createTableRow(p, o.styleName('Normal'));
}
MO.FDuiListItem_onBuild = function FDuiListItem_onBuild(p){
   var o = this;
   o.__base.FDuiControl.onBuild.call(o, p);
   var h = o._hPanel;
   o._hIconPanel = MO.Window.Builder.appendTableCell(h, o.styleName('IconPanel'))
   if(o._icon){
      o._hIcon = MO.Window.Builder.appendIcon(o._hIconPanel, o.styleName('Icon'), o._icon);
   }
   o._hLabel = MO.Window.Builder.appendTableCell(h, o.styleName('Label'));
   if(o._label){
      o.setLabel(o._label);
   }
   o.attachEvent('onClick', h);
}
MO.FDuiListItem_onEnter = function FDuiListItem_onEnter(){
   var o = this;
   o.__base.FDuiControl.onEnter.call(o);
   o._hPanel.className = MO.Lang.Boolean.parse(o._checked) ? o.styleName('Select') : o.styleName('Hover');
}
MO.FDuiListItem_onLeave = function FDuiListItem_onLeave(){
   var o = this;
   o._hPanel.className = MO.Lang.Boolean.parse(o._checked) ? o.styleName('Select') : o.styleName('Normal');
   o.__base.FDuiControl.onLeave.call(o);
}
MO.FDuiListItem_onClick = function FDuiListItem_onClick(p){
   var o = this;
   o._parent.clickItem(o);
}
MO.FDuiListItem_label = function FDuiListItem_label(p){
   return this._label;
}
MO.FDuiListItem_setLabel = function FDuiListItem_setLabel(p){
   var o = this;
   o._label = p;
   o._hLabel.innerHTML = MO.Lang.String.nvl(p);
}
MO.FDuiListItem_setChecked = function FDuiListItem_setChecked(p){
   var o = this;
   o._checked = p;
   if(o._hIcon){
      o._hIcon.style.display = p ? 'block' : 'none';
   }else{
      o._hIconPanel.innerHTML = p ? 'O' : '';
   }
   o._hPanel.className = p ? o.styleName('Select') : o.styleName('Normal');
}
MO.FDuiListItem_dispose = function FDuiListItem_dispose(){
   var o = this;
   o._hPanel = MO.Window.Html.free(o._hPanel);
   o._hIconPanel = MO.Window.Html.free(o._hIconPanel);
   o._hIcon = MO.Window.Html.free(o._hIcon);
   o._hLabel = MO.Window.Html.free(o._hLabel);
   o.__base.FDuiControl.dispose.call(o);
}
MO.FDuiListView = function FDuiListView(o){
   o = MO.Class.inherits(this, o, MO.FDuiContainer, MO.MDuiHorizontal);
   o._sizeCd           = MO.EUiSize.Horizontal
   o._stylePanel       = MO.Class.register(o, new MO.AStyle('_stylePanel'));
   o._focusItem        = null;
   o._itemPool         = null;
   o._listenersClick       = MO.Class.register(o, new MO.AListener('_listenersClick', MO.EEvent.Click));
   o._listenersDoubleClick = MO.Class.register(o, new MO.AListener('_listenersDoubleClick', MO.EEvent.DoubleClick));
   o._hForm            = null;
   o.onBuildPanel      = MO.FDuiListView_onBuildPanel;
   o.onBuild           = MO.FDuiListView_onBuild;
   o.onClick           = MO.Class.register(o, new MO.AEventClick('onClick'), MO.FDuiListView_onClick);
   o.construct         = MO.FDuiListView_construct;
   o.focusItem         = MO.FDuiListView_focusItem;
   o.createItem        = MO.FDuiListView_createItem;
   o.appendChild       = MO.FDuiListView_appendChild;
   o.selectItem        = MO.FDuiListView_selectItem;
   o.doClickItem       = MO.FDuiListView_doClickItem;
   o.doDoubleClickItem = MO.FDuiListView_doDoubleClickItem;
   o.clear             = MO.FDuiListView_clear;
   o.dispose           = MO.FDuiListView_dispose;
   return o;
}
MO.FDuiListView_onBuildPanel = function FDuiListView_onBuildPanel(p){
   var o = this;
   o._hPanel = MO.Window.Builder.createDiv(p, o.styleName('Panel'));
}
MO.FDuiListView_onBuild = function FDuiListView_onBuild(event){
   var o = this;
   o.__base.FDuiContainer.onBuild.call(o, event);
   var hPanel = o._hPanel;
   o.attachEvent('onClick', hPanel);
}
MO.FDuiListView_onClick = function FDuiListView_onClick(s, e){
   var o = this;
   if(s.hSender == o._hNodePanel){
      var node = o._focusNode;
      if(node){
         node.select(false);
         o._focusNode = null;
      }
   }
}
MO.FDuiListView_construct = function FDuiListView_construct(){
   var o = this;
   o.__base.FDuiContainer.construct.call(o);
   o._itemPool = MO.Class.create(MO.FObjectPool);
}
MO.FDuiListView_focusItem = function FDuiListView_focusItem(){
   return this._focusItem;
}
MO.FDuiListView_createItem = function FDuiListView_createItem(clazz, pi, pl){
   var o = this;
   var item = o._itemPool.alloc();
   if(!item){
      if(clazz){
         item = MO.Class.create(clazz);
      }else{
         item = MO.Class.create(MO.FDuiListViewItem);
      }
      item.build(o._hPanel);
   }
   return item;
}
MO.FDuiListView_appendChild = function FDuiListView_appendChild(p){
   var o = this;
   o._hPanel.appendChild(p._hPanel);
}
MO.FDuiListView_selectItem = function FDuiListView_selectItem(item){
   var o = this;
   var components = o._components;
   if(components){
      var count = components.count();
      for(var i = 0; i < count; i++){
         var component = components.valueAt(i);
         if(MO.Class.isClass(component, FDuiListViewItem)){
            component.setChecked(component == item);
         }
      }
   }
   o._focusItem = item;
}
MO.FDuiListView_doClickItem = function FDuiListView_doClickItem(item){
   var o = this;
   o.selectItem(item);
   var event = new MO.SClickEvent(o);
   event.item = item;
   o.processClickListener(event);
   event.dispose();
}
MO.FDuiListView_doDoubleClickItem = function FDuiListView_doDoubleClickItem(item){
   var o = this;
   o.selectItem(item);
   var event = new MO.SClickEvent(o);
   event.item = item;
   o.processDoubleClickListener(event);
   event.dispose();
}
MO.FDuiListView_clear = function FDuiListView_clear(){
   var o = this;
   var cs = o._components;
   if(cs){
      var c = cs.count();
      for(var i = 0; i < c; i++){
         var m = cs.value(i);
         if(MO.Class.isClass(m, MO.FDuiListViewItem)){
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
MO.FDuiListView_dispose = function FDuiListView_dispose(){
   var o = this;
   o.__base.FContainer.dispose.call(o);
}
MO.FDuiListViewItem = function FDuiListViewItem(o){
   o = MO.Class.inherits(this, o, MO.FDuiControl);
   o._stylePanel     = MO.Class.register(o, new MO.AStyle('_stylePanel'));
   o._styleNormal    = MO.Class.register(o, new MO.AStyle('_styleNormal'));
   o._styleHover     = MO.Class.register(o, new MO.AStyle('_styleHover'));
   o._styleSelect    = MO.Class.register(o, new MO.AStyle('_styleSelect'));
   o._styleForm      = MO.Class.register(o, new MO.AStyle('_styleForm'));
   o._styleContent   = MO.Class.register(o, new MO.AStyle('_styleContent'));
   o._styleIconPanel = MO.Class.register(o, new MO.AStyle('_styleIconPanel'));
   o._styleIcon      = MO.Class.register(o, new MO.AStyle('_styleIcon'));
   o._styleLabel     = MO.Class.register(o, new MO.AStyle('_styleLabel'));
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
   o.onBuildPanel    = MO.FDuiListViewItem_onBuildPanel;
   o.onBuild         = MO.FDuiListViewItem_onBuild;
   o.onEnter         = MO.FDuiListViewItem_onEnter;
   o.onLeave         = MO.FDuiListViewItem_onLeave;
   o.onClick         = MO.Class.register(o, new MO.AEventClick('onClick'), MO.FDuiListViewItem_onClick);
   o.onDoubleClick   = MO.Class.register(o, new MO.AEventDoubleClick('onDoubleClick'), MO.FDuiListViewItem_onDoubleClick);
   o.label           = MO.FDuiListViewItem_label;
   o.setLabel        = MO.FDuiListViewItem_setLabel;
   o.setChecked      = MO.FDuiListViewItem_setChecked;
   o.dispose         = MO.FDuiListViewItem_dispose;
   return o;
}
MO.FDuiListViewItem_onBuildPanel = function FDuiListViewItem_onBuildPanel(p){
   var o = this;
   o._hPanel = MO.Window.Builder.createDiv(p, o.styleName('Panel'));
}
MO.FDuiListViewItem_onBuild = function FDuiListViewItem_onBuild(p){
   var o = this;
   o.__base.FDuiControl.onBuild.call(o, p);
   var hPanel = o._hPanel;
   var hBorder = o._hBorder = MO.Window.Builder.appendDiv(hPanel, o.styleName('Normal'));
   var hTable = o._hForm = MO.Window.Builder.appendTable(hBorder, o.styleName('Form'));
   var hLine1 = o._hLine1 = MO.Window.Builder.appendTableRowCell(hTable)
   var hLine2 = o._hLine2 = MO.Window.Builder.appendTableRowCell(hTable)
   hLine2.height = o._contentHeight;
   var hContentForm = o._hContentForm = MO.Window.Builder.appendTable(hLine2, o.styleName('Content'));
   var hContentLine = o._hContentLine = MO.Window.Builder.appendTableRow(hContentForm);
   o._hIconPanel = MO.Window.Builder.appendTableCell(hContentLine, o.styleName('IconPanel'))
   o._hIcon = MO.Window.Builder.appendIcon(o._hIconPanel, o.styleName('Icon'), MO.Lang.String.nvl(o._icon, 'tools.select'));
   MO.Window.Html.displaySet(o._hIcon, false);
   o._hLabel = MO.Window.Builder.appendTableCell(hContentLine, o.styleName('Label'));
   if(o._label){
      o.setLabel(o._label);
   }
   o.attachEvent('onClick', hPanel);
   o.attachEvent('onDoubleClick', hPanel);
}
MO.FDuiListViewItem_onEnter = function FDuiListViewItem_onEnter(){
   var o = this;
   o.__base.FDuiControl.onEnter.call(o);
   o._hBorder.className = MO.Lang.Boolean.parse(o._checked) ? o.styleName('Select') : o.styleName('Hover');
}
MO.FDuiListViewItem_onLeave = function FDuiListViewItem_onLeave(){
   var o = this;
   o._hBorder.className = MO.Lang.Boolean.parse(o._checked) ? o.styleName('Select') : o.styleName('Normal');
   o.__base.FDuiControl.onLeave.call(o);
}
MO.FDuiListViewItem_onClick = function FDuiListViewItem_onClick(event){
   var o = this;
   if(o._checked){
      o._parent.doDoubleClickItem(o);
   }else{
      o._parent.doClickItem(o);
   }
}
MO.FDuiListViewItem_onDoubleClick = function FDuiListViewItem_onDoubleClick(event){
   var o = this;
   o._parent.doDoubleClickItem(o);
}
MO.FDuiListViewItem_label = function FDuiListViewItem_label(p){
   return this._label;
}
MO.FDuiListViewItem_setLabel = function FDuiListViewItem_setLabel(p){
   var o = this;
   o._label = p;
   o._hLabel.innerHTML = MO.Lang.String.nvl(p);
}
MO.FDuiListViewItem_setChecked = function FDuiListViewItem_setChecked(checked){
   var o = this;
   o._checked = checked;
   if(o._hIcon){
      o._hIcon.style.display = checked ? 'block' : 'none';
   }else{
      o._hIconPanel.innerHTML = checked ? 'O' : '';
   }
   o._hBorder.className = checked ? o.styleName('Select') : o.styleName('Normal');
}
MO.FDuiListViewItem_dispose = function FDuiListViewItem_dispose(){
   var o = this;
   o._hPanel = MO.Window.Html.free(o._hPanel);
   o._hBorder = MO.Window.Html.free(o._hBorder);
   o._hForm = MO.Window.Html.free(o._hForm);
   o._hLine1 = MO.Window.Html.free(o._hLine1);
   o._hLine2 = MO.Window.Html.free(o._hLine2);
   o._hContentForm = MO.Window.Html.free(o._hContentForm);
   o._hContentLine = MO.Window.Html.free(o._hContentLine);
   o._hIconPanel = MO.Window.Html.free(o._hIconPanel);
   o._hIcon = MO.Window.Html.free(o._hIcon);
   o._hLabel = MO.Window.Html.free(o._hLabel);
   o.__base.FDuiControl.dispose.call(o);
}
MO.FDuiMemo = function FDuiMemo(o){
   o = MO.Class.inherits(this, o, MO.FDuiEditControl, MO.MUiPropertyEdit);
   o._inputSize            = MO.Class.register(o, new MO.APtySize2('_inputSize'));
   o._listenersDataChanged = MO.Class.register(o, new MO.AListener('_listenersDataChanged', MO.EEvent.DataChanged));
   o._hValueForm           = null;
   o._hValueLine           = null;
   o._hInputPanel          = null;
   o._hInput               = null;
   o.onBuildEditValue      = MO.FDuiMemo_onBuildEditValue;
   o.onInputEdit           = MO.Class.register(o, new MO.AEventInputChanged('onInputEdit'), MO.FDuiMemo_onInputEdit);
   o.construct             = MO.FDuiMemo_construct;
   o.formatDisplay         = MO.FDuiMemo_formatDisplay;
   o.formatValue           = MO.FDuiMemo_formatValue;
   o.get                   = MO.FDuiMemo_get;
   o.set                   = MO.FDuiMemo_set;
   o.refreshValue          = MO.FDuiMemo_refreshValue;
   o.refreshStyle          = MO.FDuiMemo_refreshStyle;
   o.dispose               = MO.FDuiMemo_dispose;
   return o;
}
MO.FDuiMemo_onBuildEditValue = function FDuiMemo_onBuildEditValue(event){
   var o = this;
   var hValuePanel = o._hValuePanel;
   var hValueForm = o._hValueForm = MO.Window.Builder.appendTable(hValuePanel);
   var hValueLine = o._hValueLine = MO.Window.Builder.appendTableRow(hValueForm);
   MO.Window.Html.setSize(hValueForm, o._inputSize);
   o._hChangePanel = MO.Window.Builder.appendTableCell(hValueLine);
   o.onBuildEditChange(event);
   var hInputPanel = o._hInputPanel = MO.Window.Builder.appendTableCell(hValueLine, o.styleName('InputPanel'));
   hInputPanel.style.padding = '1px';
   var hInput = o._hInput = MO.Window.Builder.append(hInputPanel, 'TEXTAREA');
   hInput.style.height = '100%';
   hInput.wrap = 'off';
   o.attachEvent('onInputEdit', hInput, o.onInputEdit);
   if(o._editLength){
      hInput.maxLength = o._editLength;
   }
}
MO.FDuiMemo_onInputEdit = function FDuiMemo_onInputEdit(event){
   var o = this;
   o.refreshValue();
}
MO.FDuiMemo_construct = function FDuiMemo_construct(){
   var o = this;
   o.__base.FDuiEditControl.construct.call(o);
   o._inputSize = new MO.SSize2();
}
MO.FDuiMemo_formatDisplay = function FDuiMemo_formatDisplay(value){
   var o = this;
   var text = MO.Lang.String.nvl(value);
   o._dataDisplay = text;
   return text;
}
MO.FDuiMemo_formatValue = function FDuiMemo_formatValue(value){
   return value;
}
MO.FDuiMemo_get = function FDuiMemo_get(){
   var o = this;
   var value = o._hInput.value;
   return value;
}
MO.FDuiMemo_set = function FDuiMemo_set(value){
   var o = this;
   o._dataValue = value;
   var text = MO.Lang.String.nvl(value);
   o._hInput.value = text;
   o.changeSet(false);
}
MO.FDuiMemo_refreshValue = function FDuiMemo_refreshValue(){
   var o = this;
   o.processDataChangedListener(o);
}
MO.FDuiMemo_refreshStyle = function FDuiMemo_refreshStyle(){
   var o = this;
   o.__base.FDuiEditControl.refreshStyle.call(o);
   var hInput = o._hInput;
   var inputStyle = null;
   if(o._statusEditable){
      if(o._statusValueHover){
         inputStyle = 'InputHover';
      }else{
         inputStyle = 'InputNormal';
      }
   }else{
      inputStyle = 'InputReadonly';
   }
   hInput.className = o.styleName(inputStyle);
   hInput.readOnly = !o._statusEditable;
}
MO.FDuiMemo_dispose = function FDuiMemo_dispose(){
   var o = this
   o._inputSize = MO.Lang.Object.dispose(o._inputSize);
   o.__base.FDuiEditControl.dispose.call(o);
}
MO.FDuiNumber = function FDuiNumber(o){
   o = MO.Class.inherits(this, o, MO.FDuiEditControl, MO.MUiDescriptorPicker, MO.MUiDescriptorZoom, MO.MUiPropertyNumber);
   o._inputSize            = MO.Class.register(o, [new MO.APtySize2('_inputSize'), new MO.AGetter('_inputSize')]);
   o._styleAdjustPanel     = MO.Class.register(o, new MO.AStyle('_styleAdjustPanel'));
   o._styleAdjustForm      = MO.Class.register(o, new MO.AStyle('_styleAdjustForm'));
   o._styleUpPanel         = MO.Class.register(o, new MO.AStyle('_styleUpPanel'));
   o._styleDownPanel       = MO.Class.register(o, new MO.AStyle('_styleDownPanel'));
   o._innerOriginValue     = null;
   o._innerDataValue       = null;
   o._listenersDataChanged = MO.Class.register(o, new MO.AListener('_listenersDataChanged'));
   o._hInput               = null;
   o._iconUp               = null;
   o._iconDown             = null;
   o.onBuildEditValue      = MO.FDuiNumber_onBuildEditValue;
   o.onLabelPickerClick    = MO.Class.register(o, new MO.AEventClick('onLabelPickerClick'));
   o.onInputKeyPress       = MO.Class.register(o, new MO.AEventKeyPress('onInputKeyPress'), MO.FDuiNumber_onInputKeyPress);
   o.onInputChanged        = MO.Class.register(o, new MO.AEventInputChanged('onInputChanged'), MO.FDuiNumber_onInputChanged);
   o.onInputPickerClick    = MO.Class.register(o, new MO.AEventDoubleClick('onInputPickerClick'));
   o.construct             = MO.FDuiNumber_construct;
   o.formatDisplay         = MO.FDuiNumber_formatDisplay;
   o.formatValue           = MO.FDuiNumber_formatValue;
   o.get                   = MO.FDuiNumber_get;
   o.set                   = MO.FDuiNumber_set;
   o.doPicker              = MO.FDuiNumber_doPicker;
   o.refreshStyle          = MO.FDuiNumber_refreshStyle;
   o.dispose               = MO.FDuiNumber_dispose;
   return o;
}
MO.FDuiNumber_onBuildEditValue = function FDuiNumber_onBuildEditValue(p){
   var o = this;
   var hValuePanel = o._hValuePanel;
   var hValueForm = o._hValueForm = MO.Window.Builder.appendTable(hValuePanel);
   var hValueLine = o._hValueLine = MO.Window.Builder.appendTableRow(hValueForm);
   MO.Window.Html.setSize(hValueForm, o._inputSize);
   o._hChangePanel = MO.Window.Builder.appendTableCell(hValueLine);
   o.onBuildEditChange(p);
   var hInputPanel = o._hInputPanel = MO.Window.Builder.appendTableCell(hValueLine);
   var hInput = o._hInput = MO.Window.Builder.appendEdit(hInputPanel);
   hInput.style.textAlign = 'right';
   o.attachEvent('onInputKeyPress', hInput, o.onInputKeyPress);
   o.attachEvent('onInputChanged', hInput, o.onInputChanged);
   o.attachEvent('onInputPickerClick', hInput, o.onPickerClick);
   if(o._editLength){
      hInput.maxLength = o._editLength;
   }
   if(!MO.Lang.String.isEmpty(o._pickerFrame)){
      var hText = o._hText;
      hText.style.cursor = 'pointer';
      hText.style.textDecoration = 'underline';
      o.attachEvent('onLabelPickerClick', hText, o.onPickerClick);
   }
   var hAdjustPanel = o._hAdjustPanel = MO.Window.Builder.appendTableCell(hValueLine, o.styleName('AdjustForm'));
   var hAdjustForm = o.hAdjustForm = MO.Window.Builder.appendTable(hAdjustPanel, o.styleName('AdjustForm'));
   var hCell = MO.Window.Builder.appendTableRowCell(hAdjustForm, o.styleName('UpPanel'));
   var hIcon = o._hUpIcon = MO.Window.Builder.appendIcon(hCell, null, 'control.number.up');
   hIcon.align = 'center';
   var hCell = MO.Window.Builder.appendTableRowCell(hAdjustForm, o.styleName('DownPanel'));
   var hIcon = o._hDownIcon = MO.Window.Builder.appendIcon(hCell, null, 'control.number.down');
   hIcon.align = 'center';
}
MO.FDuiNumber_onInputKeyPress = function FDuiNumber_onInputKeyPress(event){
   var o = this;
   var code = event.keyCode;
}
MO.FDuiNumber_onInputChanged = function FDuiNumber_onInputChanged(p){
   var o = this;
   o.processDataChangedListener(o);
}
MO.FDuiNumber_construct = function FDuiNumber_construct(){
   var o = this;
   o.__base.FDuiEditControl.construct.call(o);
   o._editSize.set(100, 20);
   o._inputSize = new MO.SSize2(80, 0);
}
MO.FDuiNumber_formatDisplay = function FDuiNumber_formatDisplay(value){
   var o = this;
   var text = o._dataDisplay = MO.Lang.Float.format(value, 0, null, o._valuePrecision, null);
   return text;
}
MO.FDuiNumber_formatValue = function FDuiNumber_formatValue(value){
   return value;
}
MO.FDuiNumber_get = function FDuiNumber_get(){
   var o = this;
   var value = o._hInput.value;
   return value;
}
MO.FDuiNumber_set = function FDuiNumber_set(value){
   var o = this;
   o._dataValue = value;
   var text = MO.Lang.String.nvl(value);
   o._hInput.value = text;
   o.changeSet(false);
}
MO.FDuiNumber_doPicker = function FDuiNumber_doPicker(){
   var o = this;
   var pickerFrame = o._pickerFrame;
   if(!MO.Lang.String.isEmpty(pickerFrame)){
      var frame = MO.Console.find(MO.FDuiFrameConsole).get(o, pickerFrame);
      frame.showPosition(MO.EUiPosition.Center)
      frame.setDataSelectListener(o, o.onPickerSelect);
      frame.doFetch();
   }
}
MO.FDuiNumber_refreshStyle = function FDuiNumber_refreshStyle(){
   var o = this;
   o.__base.FDuiEditControl.refreshStyle.call(o);
   var hInput = o._hInput;
   var inputStyle = null;
   if(o._statusEditable){
      if(o._statusValueHover){
         inputStyle = 'InputHover';
      }else{
         inputStyle = 'InputNormal';
      }
   }else{
      inputStyle = 'InputReadonly';
   }
   hInput.className = o.styleName(inputStyle);
   hInput.readOnly = !o._statusEditable;
}
MO.FDuiNumber_dispose = function FDuiNumber_dispose(){
   var o = this
   o._inputSize = MO.Lang.Object.dispose(o._inputSize);
   o.__base.FDuiEditControl.dispose.call(o);
}
MO.FDuiNumber_onDataKeyDown = function FDuiNumber_onDataKeyDown(s, e){
   var o = this;
   o.__base.FDuiEditControl.onDataKeyDown.call(o, s, e);
   if(o.editCase){
      MO.RKey.fixCase(e, o.editCase);
   }
}
MO.FDuiNumber_setText = function FDuiNumber_setText(t){
   var o = this;
   if(!o.hEdit){
      return;
   }
   if('U'== o.editCase){
      o.hEdit.value = MO.Lang.String.toUpper(t);
   }else if('L'== o.editCase){
         o.hEdit.value = MO.Lang.String.toLower(t);
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
MO.FDuiNumber_validText = function FDuiNumber_validText(t){
   var o = this;
   var r = o.__base.FDuiEditControl.validText.call(o, t);
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
MO.FDuiNumber_findEditor = function FDuiNumber_findEditor(){
   var o = this;
   if(o.editComplete){
      var de = o.editor;
      if(!de){
         o.dsControl = o.topControl(MDataset);
         if(o.dsControl){
            de = o.editor = RConsole.find(FDuiNumberConsole).focus(o, FDuiNumberEditor);
         }
      }
      if(de){
         de.linkControl(o);
      }
      return o.editor;
   }
}
MO.FDuiNumber_drop = function FDuiNumber_drop(){
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
MO.FDuiNumber2 = function FDuiNumber2(o){
   o = MO.Class.inherits(this, o, MO.FDuiEditControl);
   o._inputSize            = MO.Class.register(o, [new MO.APtySize2('_inputSize'), new MO.AGetter('_inputSize')]);
   o._listenersDataChanged = MO.Class.register(o, new MO.AListener('_listenersDataChanged', MO.EEvent.DataChanged));
   o._hInput1              = null;
   o._hInput2              = null;
   o.onBuildEditInput      = MO.FDuiNumber2_onBuildEditInput;
   o.onBuildEditValue      = MO.FDuiNumber2_onBuildEditValue;
   o.onInputKeyPress       = MO.Class.register(o, new MO.AEventKeyPress('onInputKeyPress'), MO.FDuiNumber2_onInputKeyPress);
   o.onInputChanged        = MO.Class.register(o, new MO.AEventInputChanged('onInputChanged'), MO.FDuiNumber2_onInputChanged);
   o.construct             = MO.FDuiNumber2_construct;
   o.get                   = MO.FDuiNumber2_get;
   o.set                   = MO.FDuiNumber2_set;
   o.text                  = MO.FDuiNumber2_text;
   o.refreshStyle          = MO.FDuiNumber2_refreshStyle;
   o.dispose               = MO.FDuiNumber2_dispose;
   return o;
}
MO.FDuiNumber2_onBuildEditInput = function FDuiNumber2_onBuildEditInput(event, hTag){
   var o = this;
   o.attachEvent('onInputKeyPress', hTag, o.onInputKeyPress);
   o.attachEvent('onInputChanged', hTag, o.onInputChanged);
}
MO.FDuiNumber2_onBuildEditValue = function FDuiNumber2_onBuildEditValue(event){
   var o = this;
   var hValuePanel = o._hValuePanel;
   var hValueForm = o._hValueForm = MO.Window.Builder.appendTable(hValuePanel);
   var hLine = MO.Window.Builder.appendTableRow(hValueForm);
   MO.Window.Html.setSize(hValueForm, o._inputSize);
   var hCell = MO.Window.Builder.appendTableCell(hLine, o.styleName('InputPanel'));
   var hInput = o._hInput1 = MO.Window.Builder.appendEdit(hCell);
   hInput.style.textAlign = 'right';
   o.onBuildEditInput(event, hInput)
   var hCell = MO.Window.Builder.appendTableCell(hLine, o.styleName('InputPanel'));
   hCell.style.borderLeft = '1px solid #EEEEEE';
   var hInput = o._hInput2 = MO.Window.Builder.appendEdit(hCell);
   hInput.style.textAlign = 'right';
   o.onBuildEditInput(event, hInput)
}
MO.FDuiNumber2_onInputKeyPress = function FDuiNumber2_onInputKeyPress(p){
   var o = this;
}
MO.FDuiNumber2_onInputChanged = function FDuiNumber2_onInputChanged(p){
   var o = this;
}
MO.FDuiNumber2_construct = function FDuiNumber2_construct(){
   var o = this;
   o.__base.FDuiEditControl.construct.call(o);
   o._inputSize = new MO.SSize2();
   o._currentValue = new MO.SPoint2();
   o._dataValue = new MO.SPoint2();
}
MO.FDuiNumber2_get = function FDuiNumber2_get(value){
   var o = this;
   var currentValue = MO.Runtime.nvl(value, o._currentValue);
   var text1 = o._hInput1.value;
   currentValue.x = MO.Lang.Float.parse(text1);
   var text2 = o._hInput2.value;
   currentValue.y = MO.Lang.Float.parse(text2);
   return currentValue;
}
MO.FDuiNumber2_set = function FDuiNumber2_set(value){
   var o = this;
   var dataValue = o._dataValue;
   if(arguments.length == 1){
      var value = arguments[0];
      if(value == null){
         dataValue.set(0, 0);
      }else if(value.constructor == String){
         dataValue.parse(value);
      }else if(value.constructor == MO.SPoint2){
         dataValue.set(value.x, value.y);
      }else if(value.constructor == MO.SSize2){
         dataValue.set(value.width, value.height);
      }else{
         throw new MO.TError('Invalid value format.');
      }
   }else if(arguments.length == 2){
      dataValue.set(arguments[0], arguments[1]);
   }else{
      throw new MO.TError('Invalid value format.');
   }
   o._hInput1.value = MO.Lang.Float.format(dataValue.x, 0, null, 2, null);
   o._hInput2.value = MO.Lang.Float.format(dataValue.y, 0, null, 2, null);
   o.changeSet(false);
}
MO.FDuiNumber2_text = function FDuiNumber2_text(){
   var o = this;
   var value = o.get();
   var text = value.toString();
   return text;
}
MO.FDuiNumber2_refreshStyle = function FDuiNumber2_refreshStyle(){
   var o = this;
   o.__base.FDuiEditControl.refreshStyle.call(o);
   var inputStyle = null;
   if(o._statusEditable){
      if(o._statusValueHover){
         inputStyle = 'InputHover';
      }else{
         inputStyle = 'InputNormal';
      }
   }else{
      inputStyle = 'InputReadonly';
   }
   var hInput1 = o._hInput1;
   hInput1.className = o.styleName(inputStyle);
   hInput1.readOnly = !o._statusEditable;
   var hInput2 = o._hInput2;
   hInput2.className = o.styleName(inputStyle);
   hInput2.readOnly = !o._statusEditable;
}
MO.FDuiNumber2_dispose = function FDuiNumber2_dispose(){
   var o = this
   o._inputSize = MO.Lang.Object.dispose(o._inputSize);
   o._dataValue = MO.Lang.Object.dispose(o._dataValue);
   o._currentValue = MO.Lang.Object.dispose(o._currentValue);
   o.__base.FDuiEditControl.dispose.call(o);
}
MO.FDuiNumber2_onDataKeyDown = function FDuiNumber2_onDataKeyDown(s, e){
   var o = this;
   o.__base.FDuiEditControl.onDataKeyDown.call(o, s, e);
   if(o.editCase){
      MO.RKey.fixCase(e, o.editCase);
   }
}
MO.FDuiNumber2_formatValue = function FDuiNumber2_formatValue(v){
   var o = this;
   var r = MO.Lang.String.nvl(v);
   if(ECase.Upper == o.editCase){
      r = MO.Lang.String.toUpper(r);
   }else if(ECase.Lower == o.editCase){
      r = MO.Lang.String.toLower(r);
   }
   return r;
}
MO.FDuiNumber2_setText = function FDuiNumber2_setText(t){
   var o = this;
   if(!o.hEdit){
      return;
   }
   if('U'== o.editCase){
      o.hEdit.value = MO.Lang.String.toUpper(t);
   }else if('L'== o.editCase){
         o.hEdit.value = MO.Lang.String.toLower(t);
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
MO.FDuiNumber2_validText = function FDuiNumber2_validText(t){
   var o = this;
   var r = o.__base.FDuiEditControl.validText.call(o, t);
   if(!r){
      if(o.validLenmin){
         if(o.validLenmin > t.length){
            return MO.RContext.get('MDescEdit:ValidMinLength', o.validLenmin);
         }
      }
      if(o.validLenmax){
         if(o.validLenmax < t.length){
            return MO.RContext.get('MDescEdit:ValidMaxLength', o.validLenmax);
         }
      }
   }
   return r;
}
MO.FDuiNumber2_findEditor = function FDuiNumber2_findEditor(){
   var o = this;
   if(o.editComplete){
      var de = o.editor;
      if(!de){
         o.dsControl = o.topControl(MDataset);
         if(o.dsControl){
            de = o.editor = MO.Console.find(MO.FDuiNumber2Console).focus(o, MO.FDuiNumber2Editor);
         }
      }
      if(de){
         de.linkControl(o);
      }
      return o.editor;
   }
}
MO.FDuiNumber2_drop = function FDuiNumber2_drop(){
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
MO.FDuiNumber2_clone = function FDuiNumber2_clone(){
   var o = this;
   var r = o._class.newInstance();
   GHtml_clone(r, o.hPanel);
   return r;
}
MO.FDuiNumber2_link = function FDuiNumber2_link(){
   var o = this;
}
MO.FDuiNumber3 = function FDuiNumber3(o){
   o = MO.Class.inherits(this, o, MO.FDuiEditControl);
   o._inputSize            = MO.Class.register(o, [new MO.APtySize2('_inputSize'), new MO.AGetter('_inputSize')]);
   o._styleValuePanel      = MO.Class.register(o, new MO.AStyle('_styleValuePanel'));
   o._styleInputPanel      = MO.Class.register(o, new MO.AStyle('_styleInputPanel'));
   o._styleInput           = MO.Class.register(o, new MO.AStyle('_styleInput'));
   o._innerOriginValue     = null;
   o._innerDataValue       = null;
   o._listenersDataChanged = MO.Class.register(o, new MO.AListener('_listenersDataChanged', MO.EEvent.DataChanged));
   o._hInput               = null;
   o.onBuildEditInput      = MO.FDuiNumber3_onBuildEditInput;
   o.onBuildEditValue      = MO.FDuiNumber3_onBuildEditValue;
   o.onInputKeyPress       = MO.Class.register(o, new MO.AEventKeyPress('onInputKeyPress'), FDuiNumber3_onInputKeyPress);
   o.onInputChanged        = MO.Class.register(o, new MO.AEventInputChanged('onInputChanged'), FDuiNumber3_onInputChanged);
   o.construct             = MO.FDuiNumber3_construct;
   o.get                   = MO.FDuiNumber3_get;
   o.set                   = MO.FDuiNumber3_set;
   o.refreshStyle          = MO.FDuiNumber3_refreshStyle;
   o.dispose               = MO.FDuiNumber3_dispose;
   return o;
}
MO.FDuiNumber3_onBuildEditInput = function FDuiNumber3_onBuildEditInput(p, h){
   var o = this;
   o.attachEvent('onInputKeyPress', h, o.onInputKeyPress);
   o.attachEvent('onInputChanged', h, o.onInputChanged);
}
MO.FDuiNumber3_onBuildEditValue = function FDuiNumber3_onBuildEditValue(p){
   var o = this;
   var h = o._hValuePanel;
   h.className = o.styleName('ValuePanel');
   var hValueForm = o._hValueForm = MO.Window.Builder.appendTable(h);
   var hValueLine = MO.Window.Builder.appendTableRow(hValueForm);
   MO.Window.Html.setSize(hValueForm, o._inputSize);
   o._hChangePanel = MO.Window.Builder.appendTableCell(hValueLine);
   o.onBuildEditChange(p);
   var hCell = MO.Window.Builder.appendTableCell(hValueLine, o.styleName('InputPanel'));
   hCell.style.borderRight = '1px solid #666666';
   var hInput = o._hInput1 = MO.Window.Builder.appendEdit(hCell, o.styleName('Input'));
   hInput.style.textAlign = 'right';
   o.onBuildEditInput(p, hInput)
   var hCell = MO.Window.Builder.appendTableCell(hValueLine, o.styleName('InputPanel'));
   hCell.style.borderLeft = '1px solid #999999';
   hCell.style.borderRight = '1px solid #666666';
   var hInput = o._hInput2 = MO.Window.Builder.appendEdit(hCell, o.styleName('Input'));
   hInput.style.textAlign = 'right';
   o.onBuildEditInput(p, hInput)
   var hCell = MO.Window.Builder.appendTableCell(hValueLine, o.styleName('InputPanel'));
   hCell.style.borderLeft = '1px solid #999999';
   var hInput = o._hInput3 = MO.Window.Builder.appendEdit(hCell, o.styleName('Input'));
   hInput.style.textAlign = 'right';
   o.onBuildEditInput(p, hInput)
}
MO.FDuiNumber3_onInputKeyPress = function FDuiNumber3_onInputKeyPress(p){
   var o = this;
   var c = p.keyCode;
   if(!EKeyCode.floatCodes[c]){
      p.cancel();
   }
}
MO.FDuiNumber3_onInputChanged = function FDuiNumber3_onInputChanged(p){
   var o = this;
   o.processDataChangedListener(o);
}
MO.FDuiNumber3_construct = function FDuiNumber3_construct(){
   var o = this;
   o.__base.FDuiEditControl.construct.call(o);
   o._inputSize = new MO.SSize2(120, 0);
   o._innerOriginValue = new MO.SPoint3();
   o._innerDataValue = new MO.SPoint3();
}
MO.FDuiNumber3_get = function FDuiNumber3_get(p){
   var o = this;
   o.__base.FDuiEditControl.get.call(o, p);
   var v = o._innerDataValue;
   var h = o._hInput1;
   if(h){
      v.x = MO.Lang.Float.parse(h.value);
   }
   var h = o._hInput2;
   if(h){
      v.y = MO.Lang.Float.parse(h.value);
   }
   var h = o._hInput3;
   if(h){
      v.z = MO.Lang.Float.parse(h.value);
   }
   return v;
}
MO.FDuiNumber3_set = function FDuiNumber3_set(p){
   var o = this;
   o.__base.FDuiEditControl.set.call(o, p);
   var a = arguments;
   var vo = o._innerOriginValue
   var vd = o._innerDataValue;
   if(a.length == 1){
      if((p.constructor == MO.SPoint3) || (p.constructor == MO.SVector3)){
         vo.assign(p);
         vd.assign(p);
      }else{
         throw new MO.TError('Invalid value format.');
      }
   }else if(a.length == 3){
      vo.set(a[0], a[1], a[2]);
      vd.assign(vo);
   }else{
      throw new MO.TError('Invalid value format.');
   }
   var h = o._hInput1;
   if(h){
      h.value = MO.Lang.Float.format(vd.x, 0, null, 3, null);
   }
   var h = o._hInput2;
   if(h){
      h.value = MO.Lang.Float.format(vd.y, 0, null, 3, null);
   }
   var h = o._hInput3;
   if(h){
      h.value = MO.Lang.Float.format(vd.z, 0, null, 3, null);
   }
   o.changeSet(false);
}
MO.FDuiNumber3_refreshStyle = function FDuiNumber3_refreshStyle(){
   var o = this;
   o.__base.FDuiEditControl.refreshStyle.call(o);
   var inputStyle = null;
   if(o._statusEditable){
      if(o._statusValueHover){
         inputStyle = 'InputHover';
      }else{
         inputStyle = 'InputNormal';
      }
   }else{
      inputStyle = 'InputReadonly';
   }
   o._hInput1.className = o.styleName(inputStyle);
   o._hInput1.readOnly = !o._statusEditable;
   o._hInput2.className = o.styleName(inputStyle);
   o._hInput2.readOnly = !o._statusEditable;
   o._hInput3.className = o.styleName(inputStyle);
   o._hInput3.readOnly = !o._statusEditable;
}
MO.FDuiNumber3_dispose = function FDuiNumber3_dispose(){
   var o = this
   o._inputSize = MO.Lang.Object.dispose(o._inputSize);
   o._dataValue = MO.Lang.Object.dispose(o._dataValue);
   o._currentValue = MO.Lang.Object.dispose(o._currentValue);
   o.__base.FDuiEditControl.dispose.call(o);
}
MO.FDuiNumber3_onDataKeyDown = function FDuiNumber3_onDataKeyDown(s, e){
   var o = this;
   o.__base.FDuiEditControl.onDataKeyDown.call(o, s, e);
   if(o.editCase){
      RKey.fixCase(e, o.editCase);
   }
}
MO.FDuiNumber3_formatValue = function FDuiNumber3_formatValue(v){
   var o = this;
   var r = MO.Lang.String.nvl(v);
   if(ECase.Upper == o.editCase){
      r = MO.Lang.String.toUpper(r);
   }else if(ECase.Lower == o.editCase){
      r = MO.Lang.String.toLower(r);
   }
   return r;
}
MO.FDuiNumber3_setText = function FDuiNumber3_setText(t){
   var o = this;
   if(!o.hEdit){
      return;
   }
   if('U'== o.editCase){
      o.hEdit.value = MO.Lang.String.toUpper(t);
   }else if('L'== o.editCase){
         o.hEdit.value = MO.Lang.String.toLower(t);
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
MO.FDuiNumber3_validText = function FDuiNumber3_validText(t){
   var o = this;
   var r = o.__base.FDuiEditControl.validText.call(o, t);
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
MO.FDuiNumber3_findEditor = function FDuiNumber3_findEditor(){
   var o = this;
   if(o.editComplete){
      var de = o.editor;
      if(!de){
         o.dsControl = o.topControl(MDataset);
         if(o.dsControl){
            de = o.editor = RConsole.find(FDuiNumber3Console).focus(o, FDuiNumber3Editor);
         }
      }
      if(de){
         de.linkControl(o);
      }
      return o.editor;
   }
}
MO.FDuiNumber3_drop = function FDuiNumber3_drop(){
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
MO.FDuiNumber3_clone = function FDuiNumber3_clone(){
   var o = this;
   var r = o._class.newInstance();
   GHtml_clone(r, o.hPanel);
   return r;
}
MO.FDuiNumber3_link = function FDuiNumber3_link(){
   var o = this;
}
MO.FDuiNumber4 = function FDuiNumber4(o){
   o = MO.Class.inherits(this, o, MO.FDuiEditControl);
   o._inputSize            = MO.Class.register(o, [new MO.APtySize2('_inputSize'), new MO.AGetter('_inputSize')]);
   o._listenersDataChanged = MO.Class.register(o, new MO.AListener('_listenersDataChanged', MO.EEvent.DataChanged));
   o._hInput               = null;
   o.onBuildEditInput      = MO.FDuiNumber4_onBuildEditInput;
   o.onBuildEditValue      = MO.FDuiNumber4_onBuildEditValue;
   o.onInputKeyPress       = MO.Class.register(o, new MO.AEventKeyPress('onInputKeyPress'), MO.FDuiNumber4_onInputKeyPress);
   o.onInputChanged        = MO.Class.register(o, new MO.AEventInputChanged('onInputChanged'), MO.FDuiNumber4_onInputChanged);
   o.construct             = MO.FDuiNumber4_construct;
   o.get                   = MO.FDuiNumber4_get;
   o.set                   = MO.FDuiNumber4_set;
   o.text                  = MO.FDuiNumber4_text;
   o.refreshStyle          = MO.FDuiNumber4_refreshStyle;
   o.dispose               = MO.FDuiNumber4_dispose;
   return o;
}
MO.FDuiNumber4_onBuildEditInput = function FDuiNumber4_onBuildEditInput(event, hTag){
   var o = this;
   o.attachEvent('onInputKeyPress', hTag, o.onInputKeyPress);
   o.attachEvent('onInputChanged', hTag, o.onInputChanged);
}
MO.FDuiNumber4_onBuildEditValue = function FDuiNumber4_onBuildEditValue(p){
   var o = this;
   var hValuePanel = o._hValuePanel;
   var hValueForm = o._hValueForm = MO.Window.Builder.appendTable(hValuePanel);
   var hValueLine = MO.Window.Builder.appendTableRow(hValueForm);
   MO.Window.Html.setSize(hValueForm, o._inputSize);
   var hCell = MO.Window.Builder.appendTableCell(hValueLine, o.styleName('InputPanel'));
   var hInput = o._hInput1 = MO.Window.Builder.appendEdit(hCell);
   hInput.style.textAlign = 'right';
   o.onBuildEditInput(event, hInput)
   var hCell = MO.Window.Builder.appendTableCell(hValueLine, o.styleName('InputPanel'));
   hCell.style.borderLeft = '1px solid #EEEEEE';
   var hInput = o._hInput2 = MO.Window.Builder.appendEdit(hCell);
   hInput.style.textAlign = 'right';
   o.onBuildEditInput(event, hInput)
   var hCell = MO.Window.Builder.appendTableCell(hValueLine, o.styleName('InputPanel'));
   hCell.style.borderLeft = '1px solid #EEEEEE';
   var hInput = o._hInput3 = MO.Window.Builder.appendEdit(hCell);
   hInput.style.textAlign = 'right';
   o.onBuildEditInput(event, hInput)
   var hCell = MO.Window.Builder.appendTableCell(hValueLine, o.styleName('InputPanel'));
   hCell.style.borderLeft = '1px solid #EEEEEE';
   var hInput = o._hInput4 = MO.Window.Builder.appendEdit(hCell);
   hInput.style.textAlign = 'right';
   o.onBuildEditInput(event, hInput)
}
MO.FDuiNumber4_onInputKeyPress = function FDuiNumber4_onInputKeyPress(p){
   var o = this;
}
MO.FDuiNumber4_onInputChanged = function FDuiNumber4_onInputChanged(p){
   var o = this;
}
MO.FDuiNumber4_construct = function FDuiNumber4_construct(){
   var o = this;
   o.__base.FDuiEditControl.construct.call(o);
   o._inputSize = new MO.SSize2(0, 0);
   o._currentValue = new MO.SPoint4();
   o._dataValue = new MO.SPoint4();
}
MO.FDuiNumber4_get = function FDuiNumber4_get(value){
   var o = this;
   var currentValue = MO.Runtime.nvl(value, o._currentValue);
   var text1 = o._hInput1.value;
   currentValue.x = MO.Lang.Float.parse(text1);
   var text2 = o._hInput2.value;
   currentValue.y = MO.Lang.Float.parse(text2);
   var text3 = o._hInput3.value;
   currentValue.y = MO.Lang.Float.parse(text3);
   var text4 = o._hInput4.value;
   currentValue.y = MO.Lang.Float.parse(text4);
   return currentValue;
}
MO.FDuiNumber4_set = function FDuiNumber4_set(value){
   var o = this;
   var dataValue = o._dataValue;
   if(arguments.length == 1){
      var value = arguments[0];
      if(value == null){
         dataValue.set(0, 0);
      }else if(value.constructor == String){
         dataValue.parse(value);
      }else if(value.constructor == MO.SPoint4){
         dataValue.set(value.x, value.y, value.z, value.w);
      }else if(value.constructor == MO.SVector4){
         dataValue.set(value.x, value.y, value.z, value.w);
      }else{
         throw new MO.TError('Invalid value format.');
      }
   }else if(arguments.length == 4){
      dataValue.set(arguments[0], arguments[1], arguments[2], arguments[3]);
   }else{
      throw new MO.TError('Invalid value format.');
   }
   o._hInput1.value = MO.Lang.Float.format(dataValue.x, 0, null, 2, null);
   o._hInput2.value = MO.Lang.Float.format(dataValue.y, 0, null, 2, null);
   o._hInput3.value = MO.Lang.Float.format(dataValue.z, 0, null, 2, null);
   o._hInput4.value = MO.Lang.Float.format(dataValue.w, 0, null, 2, null);
   o.changeSet(false);
}
MO.FDuiNumber4_text = function FDuiNumber4_text(){
   var o = this;
   var value = o.get();
   var text = value.toString();
   return text;
}
MO.FDuiNumber4_refreshStyle = function FDuiNumber4_refreshStyle(){
   var o = this;
   o.__base.FDuiEditControl.refreshStyle.call(o);
   var inputStyle = null;
   if(o._statusEditable){
      if(o._statusValueHover){
         inputStyle = 'InputHover';
      }else{
         inputStyle = 'InputNormal';
      }
   }else{
      inputStyle = 'InputReadonly';
   }
   o._hInput1.className = o.styleName(inputStyle);
   o._hInput1.readOnly = !o._statusEditable;
   o._hInput2.className = o.styleName(inputStyle);
   o._hInput2.readOnly = !o._statusEditable;
   o._hInput3.className = o.styleName(inputStyle);
   o._hInput3.readOnly = !o._statusEditable;
   o._hInput4.className = o.styleName(inputStyle);
   o._hInput4.readOnly = !o._statusEditable;
}
MO.FDuiNumber4_dispose = function FDuiNumber4_dispose(){
   var o = this
   o._inputSize = MO.Lang.Object.dispose(o._inputSize);
   o._dataValue = MO.Lang.Object.dispose(o._dataValue);
   o._currentValue = MO.Lang.Object.dispose(o._currentValue);
   o.__base.FDuiEditControl.dispose.call(o);
}
MO.FDuiNumber4_onDataKeyDown = function FDuiNumber4_onDataKeyDown(s, e){
   var o = this;
   o.__base.FDuiEditControl.onDataKeyDown.call(o, s, e);
   if(o.editCase){
      RKey.fixCase(e, o.editCase);
   }
}
MO.FDuiNumber4_formatValue = function FDuiNumber4_formatValue(v){
   var o = this;
   var r = MO.Lang.String.nvl(v);
   if(ECase.Upper == o.editCase){
      r = MO.Lang.String.toUpper(r);
   }else if(ECase.Lower == o.editCase){
      r = MO.Lang.String.toLower(r);
   }
   return r;
}
MO.FDuiNumber4_setText = function FDuiNumber4_setText(t){
   var o = this;
   if(!o.hEdit){
      return;
   }
   if('U'== o.editCase){
      o.hEdit.value = MO.Lang.String.toUpper(t);
   }else if('L'== o.editCase){
         o.hEdit.value = MO.Lang.String.toLower(t);
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
MO.FDuiNumber4_validText = function FDuiNumber4_validText(t){
   var o = this;
   var r = o.__base.FDuiEditControl.validText.call(o, t);
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
MO.FDuiNumber4_findEditor = function FDuiNumber4_findEditor(){
   var o = this;
   if(o.editComplete){
      var de = o.editor;
      if(!de){
         o.dsControl = o.topControl(MDataset);
         if(o.dsControl){
            de = o.editor = RConsole.find(FDuiNumber4Console).focus(o, FDuiNumber4Editor);
         }
      }
      if(de){
         de.linkControl(o);
      }
      return o.editor;
   }
}
MO.FDuiNumber4_drop = function FDuiNumber4_drop(){
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
MO.FDuiNumber4_clone = function FDuiNumber4_clone(){
   var o = this;
   var r = o._class.newInstance();
   GHtml_clone(r, o.hPanel);
   return r;
}
MO.FDuiNumber4_link = function FDuiNumber4_link(){
   var o = this;
}
MO.FDuiPanel = function FDuiPanel(o){
   o = MO.Class.inherits(this, o, MO.FDuiLayout, MO.MDuiDesign, MO.MDuiFocus);
   o._sizeCd      = MO.EUiSize.Horizontal;
   o._stylePanel  = MO.Class.register(o, new MO.AStyle('_stylePanel', 'Panel'));
   o._styleLabel  = MO.Class.register(o, new MO.AStyle('_styleLabel', 'Label'));
   o._styleBody   = MO.Class.register(o, new MO.AStyle('_styleBody', 'Body'));
   o._hImage      = null;
   o._imagePlus   = 'control.panel.plus';
   o._imageMinus  = 'control.panel.minus';
   o._statusBody  = true;
   o.onBuildPanel = MO.FDuiPanel_onBuildPanel;
   o.onTitleClick = MO.Class.register(o, new MO.AEventClick('onTitleClick'), MO.FDuiPanel_onTitleClick);
   return o;
}
MO.FDuiPanel_onBuildPanel = function FDuiPanel_onBuildPanel(p){
   var o = this;
   var h = o._hPanel = MO.Window.Builder.createDiv(p, o.styleName('Panel'));
   var hl = MO.Window.Builder.appendTable(h, o.styleName('Label'));
   o.attachEvent('onTitleClick', hl);
   hl.width = '100%';
   var hr = MO.Window.Builder.appendTableRow(hl);
   hr.vAlign = 'middle';
   var hri = MO.Window.Builder.appendTableCell(hr);
   hri.width = 20;
   o._hImage = MO.Window.Builder.appendIcon(hri, null, o._imageMinus);
   var hrt = MO.Window.Builder.appendTableCell(hr);
   hrt.innerHTML = o._label;
   var hb = o._hBody = MO.Window.Builder.appendDiv(h, o.styleName('Body'))
   o._hPanelForm = MO.Window.Builder.appendTable(hb, o.styleName('Form'));
}
MO.FDuiPanel_onTitleClick = function FDuiPanel_onTitleClick(p){
   var o = this;
   var status = !o._statusBody;
   o._statusBody = status;
   o._hImage.src = MO.Window.Resource.iconPath(status ? o._imageMinus : o._imagePlus);
   MO.Window.Html.displaySet(o._hBody, status);
}
MO.FDuiPanelHorizontal = function FDuiPanelHorizontal(o){
   o = MO.Class.inherits(this, o, MO.FDuiLayoutHorizontal);
   o._sizeCd = MO.EUiSize.Horizontal;
   return o;
}
MO.FDuiPanelVertical = function FDuiPanelVertical(o){
   o = MO.Class.inherits(this, o, MO.FDuiLayoutVertical);
   return o;
}
MO.FDuiPicker = function FDuiPicker(o){
   o = MO.Class.inherits(this, o, MO.FDuiEditControl);
   o._inputSize            = MO.Class.register(o, [new MO.APtySize2('_inputSize'), new MO.AGetter('_inputSize')]);
   o._listenersDataChanged = MO.Class.register(o, new MO.AListener('_listenersDataChanged', MO.EEvent.DataChanged));
   o._hInput1              = null;
   o._hInput2              = null;
   o.onBuildEditInput      = MO.FDuiPicker_onBuildEditInput;
   o.onBuildEditValue      = MO.FDuiPicker_onBuildEditValue;
   o.onInputKeyPress       = MO.Class.register(o, new MO.AEventKeyPress('onInputKeyPress'), MO.FDuiPicker_onInputKeyPress);
   o.onInputChanged        = MO.Class.register(o, new MO.AEventInputChanged('onInputChanged'), MO.FDuiPicker_onInputChanged);
   o.construct             = MO.FDuiPicker_construct;
   o.get                   = MO.FDuiPicker_get;
   o.set                   = MO.FDuiPicker_set;
   o.text                  = MO.FDuiPicker_text;
   o.refreshStyle          = MO.FDuiPicker_refreshStyle;
   o.dispose               = MO.FDuiPicker_dispose;
   return o;
}
MO.FDuiPicker_onBuildEditInput = function FDuiPicker_onBuildEditInput(event, hTag){
   var o = this;
   o.attachEvent('onInputKeyPress', hTag, o.onInputKeyPress);
   o.attachEvent('onInputChanged', hTag, o.onInputChanged);
}
MO.FDuiPicker_onBuildEditValue = function FDuiPicker_onBuildEditValue(event){
   var o = this;
   var hValuePanel = o._hValuePanel;
   var hValueForm = o._hValueForm = MO.Window.Builder.appendTable(hValuePanel);
   var hLine = MO.Window.Builder.appendTableRow(hValueForm);
   MO.Window.Html.setSize(hValueForm, o._inputSize);
   var hCell = MO.Window.Builder.appendTableCell(hLine, o.styleName('InputPanel'));
   var hInput = o._hInput1 = MO.Window.Builder.appendEdit(hCell);
   o.onBuildEditInput(event, hInput)
   var hCell = MO.Window.Builder.appendTableCell(hLine, o.styleName('InputPanel'));
   hCell.style.borderLeft = '1px solid #EEEEEE';
   var hInput = o._hInput2 = MO.Window.Builder.appendEdit(hCell);
   o.onBuildEditInput(event, hInput)
}
MO.FDuiPicker_onInputKeyPress = function FDuiPicker_onInputKeyPress(p){
   var o = this;
}
MO.FDuiPicker_onInputChanged = function FDuiPicker_onInputChanged(p){
   var o = this;
}
MO.FDuiPicker_construct = function FDuiPicker_construct(){
   var o = this;
   o.__base.FDuiEditControl.construct.call(o);
   o._inputSize = new MO.SSize2();
   o._currentValue = new MO.SPoint2();
   o._dataValue = new MO.SPoint2();
}
MO.FDuiPicker_get = function FDuiPicker_get(value){
   var o = this;
   var currentValue = MO.Runtime.nvl(value, o._currentValue);
   var text1 = o._hInput1.value;
   currentValue.x = MO.Lang.Float.parse(text1);
   var text2 = o._hInput2.value;
   currentValue.y = MO.Lang.Float.parse(text2);
   return currentValue;
}
MO.FDuiPicker_set = function FDuiPicker_set(value){
   var o = this;
   var dataValue = o._dataValue;
   if(arguments.length == 1){
      var value = arguments[0];
      if(value == null){
         dataValue.set(0, 0);
      }else if(value.constructor == String){
         dataValue.parse(value);
      }else if(value.constructor == MO.SPoint2){
         dataValue.set(value.x, value.y);
      }else if(value.constructor == MO.SSize2){
         dataValue.set(value.width, value.height);
      }else{
         throw new MO.TError('Invalid value format.');
      }
   }else if(arguments.length == 2){
      dataValue.set(arguments[0], arguments[1]);
   }else{
      throw new MO.TError('Invalid value format.');
   }
   o._hInput1.value = MO.Lang.Float.format(dataValue.x, 0, null, 2, null);
   o._hInput2.value = MO.Lang.Float.format(dataValue.y, 0, null, 2, null);
   o.changeSet(false);
}
MO.FDuiPicker_text = function FDuiPicker_text(){
   var o = this;
   var value = o.get();
   var text = value.toString();
   return text;
}
MO.FDuiPicker_refreshStyle = function FDuiPicker_refreshStyle(){
   var o = this;
   o.__base.FDuiEditControl.refreshStyle.call(o);
   var inputStyle = null;
   if(o._statusEditable){
      if(o._statusValueHover){
         inputStyle = 'InputHover';
      }else{
         inputStyle = 'InputNormal';
      }
   }else{
      inputStyle = 'InputReadonly';
   }
   var hInput1 = o._hInput1;
   hInput1.className = o.styleName(inputStyle);
   hInput1.readOnly = !o._statusEditable;
   var hInput2 = o._hInput2;
   hInput2.className = o.styleName(inputStyle);
   hInput2.readOnly = !o._statusEditable;
}
MO.FDuiPicker_dispose = function FDuiPicker_dispose(){
   var o = this
   o._inputSize = MO.Lang.Object.dispose(o._inputSize);
   o._dataValue = MO.Lang.Object.dispose(o._dataValue);
   o._currentValue = MO.Lang.Object.dispose(o._currentValue);
   o.__base.FDuiEditControl.dispose.call(o);
}
MO.FDuiPicker_onDataKeyDown = function FDuiPicker_onDataKeyDown(s, e){
   var o = this;
   o.__base.FDuiEditControl.onDataKeyDown.call(o, s, e);
   if(o.editCase){
      MO.RKey.fixCase(e, o.editCase);
   }
}
MO.FDuiPicker_formatValue = function FDuiPicker_formatValue(v){
   var o = this;
   var r = MO.Lang.String.nvl(v);
   if(ECase.Upper == o.editCase){
      r = MO.Lang.String.toUpper(r);
   }else if(ECase.Lower == o.editCase){
      r = MO.Lang.String.toLower(r);
   }
   return r;
}
MO.FDuiPicker_setText = function FDuiPicker_setText(t){
   var o = this;
   if(!o.hEdit){
      return;
   }
   if('U'== o.editCase){
      o.hEdit.value = MO.Lang.String.toUpper(t);
   }else if('L'== o.editCase){
         o.hEdit.value = MO.Lang.String.toLower(t);
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
MO.FDuiPicker_validText = function FDuiPicker_validText(t){
   var o = this;
   var r = o.__base.FDuiEditControl.validText.call(o, t);
   if(!r){
      if(o.validLenmin){
         if(o.validLenmin > t.length){
            return MO.RContext.get('MDescEdit:ValidMinLength', o.validLenmin);
         }
      }
      if(o.validLenmax){
         if(o.validLenmax < t.length){
            return MO.RContext.get('MDescEdit:ValidMaxLength', o.validLenmax);
         }
      }
   }
   return r;
}
MO.FDuiPicker_findEditor = function FDuiPicker_findEditor(){
   var o = this;
   if(o.editComplete){
      var de = o.editor;
      if(!de){
         o.dsControl = o.topControl(MDataset);
         if(o.dsControl){
            de = o.editor = MO.Console.find(MO.FDuiPickerConsole).focus(o, MO.FDuiPickerEditor);
         }
      }
      if(de){
         de.linkControl(o);
      }
      return o.editor;
   }
}
MO.FDuiPicker_drop = function FDuiPicker_drop(){
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
MO.FDuiPicker_clone = function FDuiPicker_clone(){
   var o = this;
   var r = o._class.newInstance();
   GHtml_clone(r, o.hPanel);
   return r;
}
MO.FDuiPicker_link = function FDuiPicker_link(){
   var o = this;
}
MO.FDuiPicture = function FDuiPicture(o){
   o = MO.Class.inherits(this, o, MO.FEditControl, MO.MEditBorder, MO.MDescEdit);
   o.storeType         = MO.Class.register(o, new MO.APtyString('storeType'));
   o.storeCode         = MO.Class.register(o, new MO.APtyString('storeCode'));
   o.storeName         = MO.Class.register(o, new MO.APtyString('storeName'));
   o.editAdjust        = MO.Class.register(o, new MO.APtyInteger('editAdjust'));
   o.editMaxWidth      = MO.Class.register(o, new MO.APtyInteger('editMaxWidth'));
   o.editMaxHeight     = MO.Class.register(o, new MO.APtyInteger('editMaxHeight'));
   o.__seed            = 0;
   o.attributes        = null;
   o.border            = null;
   o.borderStyle       = MO.EUiBorder.Round;
   o.onUploadMouseDown = MO.Class.register(o, new HMouseDown('onUploadMouseDown'), FDuiPicture_onUploadMouseDown);
   o.onFileUploaded    = MO.FDuiPicture_onFileUploaded;
   o.onBuildEdit       = MO.FDuiPicture_onBuildEdit;
   o.construct         = MO.FDuiPicture_construct;
   o.makeIconPath      = MO.FDuiPicture_makeIconPath;
   o.setText           = MO.FDuiPicture_setText;
   o.setEditable       = MO.FDuiPicture_setEditable;
   o.dispose           = MO.FDuiPicture_dispose;
   return o;
}
MO.FDuiPicture_onUploadMouseDown = function FDuiPicture_onUploadMouseDown(e){
   var o = this;
   if(o._editable && !o._disbaled){
      var uw = MO.Console.find(MO.FUploadConsole).findWindow();
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
MO.FDuiPicture_onFileUploaded = function FDuiPicture_onFileUploaded(s, g){
   var o = this;
   var as = g.attributes;
   o.guid = as.get('GUID');
   o.mime = as.get('MIME');
   o.networkCode = as.get('NETWORK_CODE')
   o.hImage.src = o.makeIconPath(o.guid, o.mime, o.networkCode) + '?' + MO.Lang.Date.format() + (++o.__seed);
   o.hImage.style.display = 'block';
}
MO.FDuiPicture_onBuildEdit = function FDuiPicture_onBuildEdit(b){
   var o = this;
   var hif = o.hImageForm = o.hEdit = MO.Window.Builder.appendTable(b.hPanel);
   hif.width = '100%';
   hif.border = 1;
   hif.height = '100%';
   var hc = o.hImagePanel = hif.insertRow().insertCell();
   hc.align = 'center';
   hc.style.cursor = 'hand';
   o.attachEvent('onUploadMouseDown', o.hImagePanel);
   var h = o.hImage = MO.Window.Builder.append(hc, 'IMAGE');
   h.style.border = '1 solid #CCCCCC';
   h.style.display = 'none';
   if(o.left>0 && o.top>0){
      o.hPanel.style.position = 'absolute';
   }
}
MO.FDuiPicture_construct = function FDuiPicture_construct(){
   var o = this;
   o.base.FEditControl.construct.call(o);
   o.attributes = new MO.TAttributes();
}
MO.FDuiPicture_makeIconPath = function FDuiPicture_makeIconPath(g, m, sc){
   var o = this;
   var s = o.recordCode + '/' + o.recordGuid + '/' + g + '.icon.' + m;
   return top.RContext.context('/svr/' + sc.toLowerCase() + '/sys/' + MO.Lang.String.toLower(s));
}
MO.FDuiPicture_setText = function FDuiPicture_setText(t){
   var o = this;
   var as = o.attributes;
   as.clear();
   var v = false;
   if(!MO.Lang.String.isEmpty(t)){
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
MO.FDuiPicture_setEditable = function FDuiPicture_setEditable(v){
   var o = this;
   o.base.FEditControl.setEditable.call(o, v);
   if(v){
      o.hImagePanel.style.cursor = 'hand';
   }else{
      o.hImagePanel.style.cursor = 'normal';
   }
}
MO.FDuiPicture_dispose = function FDuiPicture_dispose(){
   var o = this;
   o.base.FEditControl.dispose.call(o);
   o.hImage = null;
}
MO.FDuiProgressBar = function FDuiProgressBar(o){
   o = MO.Class.inherits(this, o, MO.FDuiControl);
   o._stylePanel  = MO.Class.register(o, new MO.AStyle('_stylePanel'));
   o._rate        = 0;
   o._hForm       = null;
   o.onBuildPanel = MO.FDuiProgressBar_onBuildPanel;
   o.onBuild      = MO.FDuiProgressBar_onBuild;
   o.get          = MO.FDuiProgressBar_get;
   o.set          = MO.FDuiProgressBar_set;
   o.dispose      = MO.FDuiProgressBar_dispose;
   return o;
}
MO.FDuiProgressBar_onBuildPanel = function FDuiProgressBar_onBuildPanel(event){
   var o = this;
   o._hPanel = MO.Window.Builder.createTable(event, o.styleName('Panel'));
}
MO.FDuiProgressBar_onBuild = function FDuiProgressBar_onBuild(event){
   var o = this;
   o.__base.FDuiControl.onBuild.call(o, event);
   var hLine = o._hLine = MO.Window.Builder.appendTableRow(o._hPanel);
   o.hProgress = MO.Window.Builder.appendTableCell(hLine);
   o.hEmpty = MO.Window.Builder.appendTableCell(hLine);
}
MO.FDuiProgressBar_get = function FDuiProgressBar_get(){
   return this._rate;
}
MO.FDuiProgressBar_set = function FDuiProgressBar_set(value){
   var o = this;
   o._rate = value;
}
MO.FDuiProgressBar_dispose = function FDuiProgressBar_dispose(){
   var o = this;
   o._hForm = MO.Window.Html.free(o._hForm);
   o.__base.FDuiControl.dispose.call(o);
}
MO.FDuiRadio = function FDuiRadio(o){
   o = MO.Class.inherits(this, o, MO.FEditControl);
   o._groupName       = MO.Class.register(o, new MO.APtyString('_groupName'));
   o._styleInput      = MO.Class.register(o, new MO.AStyle('_styleInput', 'Input'));
   o._hInput          = null;
   o.onBuildEditValue = MO.FDuiRadio_onBuildEditValue;
   return o;
}
MO.FDuiRadio_onBuildEditValue = function FDuiRadio_onBuildEditValue(p){
   var o = this;
   o._hInput = MO.Window.Builder.appendRadio(o._hValuePanel, o.styleName('Input'));
}
MO.FDuiRadio_clearValue = function FDuiRadio_clearValue(){
   this.hEdit.checked = false;
}
MO.FDuiRadio_resetValue = function FDuiRadio_resetValue(){
   this.hEdit.checked = this._editChecked;
}
MO.FDuiRadio_saveValue = function FDuiRadio_saveValue(vs){
   var o = this;
   if(o.hEdit.checked){
      vs.set(o.dataName, o.dataDefault);
   }
}
MO.FDuiRadio_text = function FDuiRadio_text(){
   return this.hEdit.checked ? this.dataDefault : '';
}
MO.FDuiRadio_setText = function FDuiRadio_setText(t){
   this.hEdit.checked = (this.dataDefault == t);
}
MO.FDuiRadio_refreshStyle = function FDuiRadio_refreshStyle(){
   var o = this;
   var h = o.panel(MO.EPanel.Edit);
   h.disabled = !o._editable;
   h.style.cursor = o._editable? 'hand':'normal';
}
MO.FDuiSelect = function FDuiSelect(o){
   o = MO.Class.inherits(this, o, MO.FDuiEditControl, MO.MUiContainer, MO.MUiPropertySelect);
   o._inputSize            = MO.Class.register(o, [new MO.APtySize2('_inputSize'), new MO.AGetter('_inputSize')]);
   o._listenersDataChanged = MO.Class.register(o, new MO.AListener('_listenersDataChanged', MO.EEvent.DataChanged));
   o._hValueForm           = null;
   o._hValueLine           = null;
   o._hInputPanel          = null;
   o._hInput               = null;
   o.onBuildEditValue      = MO.FDuiSelect_onBuildEditValue;
   o.onDoubleClick         = MO.Class.register(o, new MO.AEventDoubleClick('onDoubleClick'), MO.FDuiSelect_onDropClick);
   o.onDropClick           = MO.FDuiSelect_onDropClick;
   o.onKeyDown             = MO.Class.register(o, new MO.AEventKeyDown('onKeyDown'), MO.FDuiSelect_onKeyDown);
   o.construct             = MO.FDuiSelect_construct;
   o.createChild           = MO.FDuiSelect_createChild;
   o.findItemByLabel       = MO.FDuiSelect_findItemByLabel;
   o.findItemByValue       = MO.FDuiSelect_findItemByValue;
   o.formatValue           = MO.FDuiSelect_formatValue;
   o.formatDisplay         = MO.FDuiSelect_formatDisplay;
   o.get                   = MO.FDuiSelect_get;
   o.set                   = MO.FDuiSelect_set;
   o.selectItem            = MO.FDuiSelect_selectItem;
   o.refreshValue          = MO.FDuiSelect_refreshValue;
   o.refreshStyle          = MO.FDuiSelect_refreshStyle;
   o.drop                  = MO.FDuiSelect_drop;
   o.dispose               = MO.FDuiSelect_dispose;
   return o;
}
MO.FDuiSelect_onBuildEditValue = function FDuiSelect_onBuildEditValue(event){
   var o = this;
   var hValuePanel = o._hValuePanel;
   var hValueForm = o._hValueForm = MO.Window.Builder.appendTable(hValuePanel);
   var hValueLine = o._hValueLine = MO.Window.Builder.appendTableRow(hValueForm);
   MO.Window.Html.setSize(hValueForm, o._inputSize);
   o._hChangePanel = MO.Window.Builder.appendTableCell(hValueLine);
   o.onBuildEditChange(event);
   var hInputPanel = o._hInputPanel = MO.Window.Builder.appendTableCell(hValueLine, o.styleName('InputPanel'));
   var hInput = o._hInput = MO.Window.Builder.appendEdit(hInputPanel);
   o.attachEvent('onDoubleClick', hInput);
   o.attachEvent('onKeyDown', hInput);
   if(o._editLength){
      hInput.maxLength = o._editLength;
   }
   var hdp = o._hDropPanel = MO.Window.Builder.appendTableCell(hValueLine);
   o.onBuildEditDrop(event);
   var item = o._emptyItem = MO.Class.create(MO.FDuiSelectItem);
   item.build(event);
   o.push(item);
}
MO.FDuiSelect_onDropClick = function FDuiSelect_onDropClick(event){
   this.drop();
}
MO.FDuiSelect_onKeyDown = function FDuiSelect_onKeyDown(event){
   var o = this;
   var editor = o._editor;
   if(editor && editor._statusEditing && (editor._source == o)){
      editor.onEditKeyDown(event);
      return;
   }
   if(event.keyCode == MO.EKeyCode.Down){
      o.drop();
   }
}
MO.FDuiSelect_construct = function FDuiSelect_construct(){
   var o = this;
   o.__base.FDuiEditControl.construct.call(o);
   o._inputSize = new MO.SSize2();
}
MO.FDuiSelect_createChild = function FDuiSelect_createChild(xconfig){
   var control = MO.Dui.Control.newInstance(xconfig);
   control._parent = this;
   return control;
}
MO.FDuiSelect_findItemByLabel = function FDuiSelect_findItemByLabel(label){
   var o = this;
   var components = o._components;
   if(components){
      var count = components.count();
      for(var i = 0; i < count; i++){
         var component = components.at(i);
         if(MO.Lang.String.equals(component.label(), label, true)){
            return component;
         }
      }
   }
   return null;
}
MO.FDuiSelect_findItemByValue = function FDuiSelect_findItemByValue(dataValue){
   var o = this;
   var components = o._components;
   if(components){
      var count = components.count();
      for(var i = 0; i < count; i++){
         var component = components.at(i);
         if(MO.Lang.String.equals(component.dataValue(), dataValue, true)){
            return component;
         }
      }
   }
   return null;
}
MO.FDuiSelect_formatValue = function FDuiSelect_formatValue(label){
   var o = this;
   var item = o.findItemByLabel(label);
   if(item){
      return MO.Lang.String.nvl(item.dataValue());
   }
   return item;
}
MO.FDuiSelect_formatDisplay = function FDuiSelect_formatDisplay(value){
   var o = this;
   var label = '';
   var item = o.findItemByValue(value);
   if(item){
      label = MO.Lang.String.nvl(item.label());
   }
   return label;
}
MO.FDuiSelect_get = function FDuiSelect_get(){
   var o = this;
   var value = null;
   var text = o._hInput.value;
   var item = o.findItemByLabel(text);
   if(item){
      value = item.dataValue();
   }
   return value;
}
MO.FDuiSelect_set = function FDuiSelect_set(value){
   var o = this;
   var text = null;
   var item = o.findItemByValue(value);
   if(item){
      text = item.label();
   }
   o._hInput.value = MO.Lang.String.nvl(text);
   o.changeSet(false);
}
MO.FDuiSelect_selectItem = function FDuiSelect_selectItem(item){
   var o = this;
   o._hInput.value = MO.Lang.String.nvl(item.label());
   o.refreshValue();
}
MO.FDuiSelect_refreshValue = function FDuiSelect_refreshValue(){
   var o = this;
   o.processDataChangedListener(o);
}
MO.FDuiSelect_refreshStyle = function FDuiSelect_refreshStyle(){
   var o = this;
   o.__base.FDuiEditControl.refreshStyle.call(o);
   o.__base.MDuiEditDrop.refreshStyle.call(o);
   var hInput = o._hInput;
   var inputStyle = null;
   if(o._statusEditable){
      if(o._statusValueHover){
         inputStyle = 'InputHover';
      }else{
         inputStyle = 'InputNormal';
      }
   }else{
      inputStyle = 'InputReadonly';
   }
   hInput.className = o.styleName(inputStyle);
   hInput.readOnly = !o._statusEditable;
}
MO.FDuiSelect_drop = function FDuiSelect_drop(){
   var o = this;
   if(o.hasComponent()){
      var value = o.get();
      var editor = o._editor = MO.Console.find(MO.FDuiEditorConsole).focus(o, MO.FDuiSelectEditor, o._name);
      editor.buildItems(o);
      editor.set(value);
      editor.show();
   }
}
MO.FDuiSelect_dispose = function FDuiSelect_dispose(){
   var o = this;
   o.__base.FDuiEditControl.dispose.call(o);
}
MO.FDuiSelect_onEditEnd = function FDuiSelect_onEditEnd(e){
   var o = this;
   if(e){
      o.set(e.get());
      o._invalidText = o.validText(o.text());
      o.refreshStyle();
   }
   o.onDataEditEnd(o);
}
MO.FDuiSelect_loadConfig = function FDuiSelect_loadConfig(c){
   var o = this;
   o.__base.FDuiEditControl.loadConfig.call(o, c);
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
            var e = MO.Class.create(FEvent);
             e.loadConfig(p);
             o.push(e);
         }
      }
   }
   return EStatus.Stop;
}
MO.FDuiSelect_doBlur = function FDuiSelect_doBlur(){
   var o = this;
   o.__base.FDuiEditControl.doBlur.call(o);
   if(o._editor){
      o._editor.hide();
   }
}
MO.FDuiSelectEditor = function FDuiSelectEditor(o){
   o = MO.Class.inherits(this, o, MO.FDuiDropEditor);
   o._items              = null;
   o._position           = null;
   o._valueRectangle     = null;
   o._listenersItemClick = MO.Class.register(o, new MO.AListener('_listenersItemClick', MO.EEvent.ItemClick));
   o._hDropLayout        = null;
   o._hItemsForm         = null;
   o.onBuildDrop        = MO.FDuiSelectEditor_onBuildDrop;
   o.onItemClick        = MO.FDuiSelectEditor_onItemClick;
   o.onEditKeyDown      = MO.FDuiSelectEditor_onEditKeyDown;
   o.onEditEnd          = MO.FDuiSelectEditor_onEditEnd;
   o.construct          = MO.FDuiSelectEditor_construct;
   o.testBlur           = MO.FDuiSelectEditor_testBlur;
   o.buildItems         = MO.FDuiSelectEditor_buildItems;
   o.clearItems         = MO.FDuiSelectEditor_clearItems;
   o.get                = MO.FDuiSelectEditor_get;
   o.set                = MO.FDuiSelectEditor_set;
   o.select             = MO.FDuiSelectEditor_select;
   o.fetch              = MO.FDuiSelectEditor_fetch;
   o.setVisible         = MO.FDuiSelectEditor_setVisible;
   o.dispose            = MO.FDuiSelectEditor_dispose;
   return o;
}
MO.FDuiSelectEditor_onBuildDrop = function FDuiSelectEditor_onBuildDrop(){
   var o = this;
   var hl = o._hDropLayout = MO.Window.Builder.appendDiv(o._hDropPanel)
   var hf = o._hItemsForm = MO.Window.Builder.appendTable(hl);
   o._hItemsBody = MO.Window.Builder.append(hf, 'TBODY');
}
MO.FDuiSelectEditor_onItemClick = function FDuiSelectEditor_onItemClick(p){
   var o = this;
   var s = o._source;
   o._position = o._items.indexOfValue(p);
   o.editEnd();
}
MO.FDuiSelectEditor_onEditKeyDown = function FDuiSelectEditor_onEditKeyDown(p){
   var o = this;
   switch(p.keyCode){
      case MO.EKeyCode.Up:
         o.select(o._position - 1);
         break;
      case MO.EKeyCode.Down:
         o.select(o._position + 1);
         break;
      case MO.EKeyCode.Enter:
         o.editEnd();
         break;
      case MO.EKeyCode.Esc:
         o.editCancel();
         break;
   }
}
MO.FDuiSelectEditor_onEditEnd = function FDuiSelectEditor_onEditEnd(){
   var o = this;
   var s = o._source;
   var c = o._items.value(o._position);
   s.selectItem(c);
   o.__base.FDuiDropEditor.onEditEnd.call(o);
}
MO.FDuiSelectEditor_construct = function FDuiSelectEditor_construct(){
   var o = this;
   o.__base.FDuiDropEditor.construct.call(o);
   o._valueRectangle = new MO.SRectangle();
}
MO.FDuiSelectEditor_testBlur = function FDuiSelectEditor_testBlur(c){
   var o = this;
   if(o._source == c){
      return false;
   }
   return !this._items.contains(c);
}
MO.FDuiSelectEditor_clearItems = function FDuiSelectEditor_clearItems(){
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
MO.FDuiSelectEditor_buildItems = function FDuiSelectEditor_buildItems(p){
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
MO.FDuiSelectEditor_get = function FDuiSelectEditor_get(){
   var o = this;
   return o._items.get(o._position).value;
}
MO.FDuiSelectEditor_set = function FDuiSelectEditor_set(v){
   var o = this;
   o._position = -1;
   var ps = o._items;
   var pc = ps.count();
   for(var i = 0; i < pc; i++){
      var p = ps.value(i);
      if(MO.Lang.String.equals(p._dataValue, v, true)){
         o._position = i;
         p.setChecked(true);
      }else{
         p.setChecked(false);
      }
   }
}
MO.FDuiSelectEditor_select = function FDuiSelectEditor_select(p){
   var o = this;
   var s = o._items;
   var c = s.count();
   var n = MO.Lang.Integer.toRange(p, 0, c - 1);
   for(var i = 0; i < c; i++){
      s.value(i).setChecked(i == n);
   }
   o._position = n;
}
MO.FDuiSelectEditor_fetch = function FDuiSelectEditor_fetch(){
   var o = this;
   if(!o.hasFetched){
      var g = new TCodeListServiceArg();
      var f = o._source.topControl(MDataset);
      g.values = f.getCurrentRows();
      g.name = o._source.editRefer;
      var doc = MO.Console.find(MO.FCodeListConsole).fetch(g);
      if(doc){
         var edt = o._source;
         edt._items.clear();
         edt._items.loadConfig(doc.root().nodes.get(0));
      }
      o.hasFetched = true;
   }
}
MO.FDuiSelectEditor_setVisible = function FDuiSelectEditor_setVisible(visible){
   var o = this;
   o.__base.FDuiDropEditor.setVisible.call(o, visible);
   var hPanel = o._hPanel;
   var hItemsForm = o._hItemsForm;
   if(visible){
      var source = o._source;
      var rectangle = source.calculateValueRectangle(o._valueRectangle);
      hItemsForm.width = '';
      var formWidth = hItemsForm.offsetWidth;
      hPanel.style.left = rectangle.left + 'px';
      hPanel.style.top = rectangle.bottom() + 'px';
      hPanel.style.width = Math.max(formWidth, rectangle.width) + 'px';
      hItemsForm.width = '100%';
      if(hItemsForm.offsetHeight > o._minHeight){
         o._hDropLayout.style.overflowY = 'scroll';
         o._hDropLayout.style.height = o._minHeight + 'px';
      }
   }
}
MO.FDuiSelectEditor_dispose = function FDuiSelectEditor_dispose(){
   var o = this;
   o._valueRectangle = MO.Lang.Object.dispose(o._valueRectangle);
   o._hDropLayout = MO.Window.Html.free(o._hDropLayout);
   o._hItemsForm = MO.Window.Html.free(o._hItemsForm);
   o.__base.FDuiDropEditor.dispose.call(o);
}
MO.FDuiSelectItem = function FDuiSelectItem(o){
   o = MO.Class.inherits(this, o, MO.FDuiControl);
   o._icon             = MO.Class.register(o, [new MO.APtyString('_icon'), new MO.AGetter('_icon')]);
   o._dataValue        = MO.Class.register(o, [new MO.APtyString('_dataValue'), new MO.AGetSet('_dataValue')]);
   o._note             = MO.Class.register(o, [new MO.APtyString('_note'), new MO.AGetSet('_note')]);
   o._styleNormal      = MO.Class.register(o, new MO.AStyle('_styleNormal'));
   o._styleHover       = MO.Class.register(o, new MO.AStyle('_styleHover'));
   o._styleSelect      = MO.Class.register(o, new MO.AStyle('_styleSelect'));
   o._styleIconChecked = MO.Class.register(o, new MO.AStyle('_styleIcon'));
   o._styleLabel       = MO.Class.register(o, new MO.AStyle('_styleLabel'));
   o._styleNote        = MO.Class.register(o, new MO.AStyle('_styleNote'));
   o._checked          = false;
   o._listenersClick   = MO.Class.register(o, new MO.AListener('_listenersClick', MO.EEvent.Click));
   o._hIconPanel       = null;
   o._hIcon            = null;
   o._hLabelPanel      = null;
   o._hNotePanel       = null;
   o.onBuildPanel      = MO.FDuiSelectItem_onBuildPanel;
   o.onBuild           = MO.FDuiSelectItem_onBuild;
   o.onEnter           = MO.FDuiSelectItem_onEnter;
   o.onLeave           = MO.FDuiSelectItem_onLeave;
   o.onMouseDown       = MO.Class.register(o, new MO.AEventMouseDown('onMouseDown'), MO.FDuiSelectItem_onMouseDown);
   o.setChecked        = MO.FDuiSelectItem_setChecked;
   o.set               = MO.FDuiSelectItem_set;
   o.dispose           = MO.FDuiSelectItem_dispose;
   return o;
}
MO.FDuiSelectItem_onBuildPanel = function FDuiSelectItem_onBuildPanel(p){
   var o = this;
   o._hPanel = MO.Window.Builder.createTableRow(p, o.styleName("Normal"));
}
MO.FDuiSelectItem_onBuild = function FDuiSelectItem_onBuild(event){
   var o = this;
   o.__base.FDuiControl.onBuild.call(o, event);
   var hPanel = o._hPanel;
   o.attachEvent('onMouseDown', hPanel);
   var hIconPanel = o._hIconPanel = MO.Window.Builder.appendTableCell(hPanel, o.styleName("Icon"));
   hIconPanel.width = 18;
   hIconPanel.align = 'center';
   var hIconPanel = o._hLabelPanel = MO.Window.Builder.appendTableCell(hPanel, o.styleName("Label"));
   if(o._label){
      hIconPanel.innerHTML = o._label;
   }else{
      hIconPanel.innerHTML = '&nbsp;';
   }
   o._hNotePanel = MO.Window.Builder.appendTableCell(hPanel, o.styleName("Note"));
}
MO.FDuiSelectItem_onEnter = function FDuiSelectItem_onEnter(){
   var o = this;
   o.__base.FDuiControl.onEnter.call(o);
   o._hPanel.className = MO.Lang.Boolean.parse(o._checked) ? o.styleName('Select') : o.styleName('Hover');
}
MO.FDuiSelectItem_onLeave = function FDuiSelectItem_onLeave(){
   var o = this;
   o._hPanel.className = MO.Lang.Boolean.parse(o._checked) ? o.styleName('Select') : o.styleName('Normal');
   o.__base.FDuiControl.onLeave.call(o);
}
MO.FDuiSelectItem_onMouseDown = function FDuiSelectItem_onMouseDown(){
   var o = this;
   o.processClickListener(o);
}
MO.FDuiSelectItem_setChecked = function FDuiSelectItem_setChecked(value){
   var o = this;
   o._checked = value;
   if(o._hIcon){
      o._hIcon.style.display = value ? 'block' : 'none';
   }else{
      o._hIconPanel.innerHTML = value ? 'O' : '';
   }
   o._hPanel.className = value ? o.styleName('Select') : o.styleName('Normal');
}
MO.FDuiSelectItem_set = function FDuiSelectItem_set(icon, label, value, note){
   var o = this;
   o._icon = MO.Lang.String.nvl(icon);
   if(!MO.Lang.String.isEmpty(o._icon)){
      o._hIcon = MO.Window.Builder.appendIcon(o._hIconPanel, o.styleIcon(o._icon));
   }
   o._label = MO.Lang.String.nvl(label);
   o._value = MO.Lang.String.nvl(value);
   o._note = MO.Lang.String.nvl(note);
   o._hLabelPanel.innerText = o._label;
   o._hNotePanel.innerText = o._note;
}
MO.FDuiSelectItem_dispose = function FDuiSelectItem_dispose(){
   var o = this;
   o._hIconPanel = MO.Window.Html.free(o._hIconPanel);
   o._hLabelPanel = MO.Window.Html.free(o._hLabelPanel);
   o._hNotePanel = MO.Window.Html.free(o._hNotePanel);
   o.__base.FDuiControl.dispose.call(o);
}
MO.FDuiSlideNumber = function FDuiSlideNumber(o){
   o = MO.Class.inherits(this, o, MO.FDuiEditControl, MO.MUiPropertyNumber, MO.MListenerDataChanged, MO.MMouseCapture);
   o._inputSize          = MO.Class.register(o, new MO.APtySize2('_inputSize'));
   o._styleSlidePanel    = MO.Class.register(o, new MO.AStyle('_styleSlidePanel'));
   o._styleValuePanel    = MO.Class.register(o, new MO.AStyle('_styleValuePanel'));
   o._styleInput         = MO.Class.register(o, new MO.AStyle('_styleInput'));
   o._styleAdjustForm    = MO.Class.register(o, new MO.AStyle('_styleAdjustForm'));
   o._styleUpPanel       = MO.Class.register(o, new MO.AStyle('_styleUpPanel'));
   o._styleDownPanel     = MO.Class.register(o, new MO.AStyle('_styleDownPanel'));
   o._innerOriginValue   = null;
   o._innerDataValue     = null;
   o._slide              = null;
   o._hInput             = null;
   o._iconUp             = null;
   o._iconDown           = null;
   o.onBuildEditValue    = MO.FDuiSlideNumber_onBuildEditValue;
   o.onMouseCaptureStart = MO.FDuiSlideNumber_onMouseCaptureStart;
   o.onMouseCapture      = MO.FDuiSlideNumber_onMouseCapture;
   o.onMouseCaptureStop  = MO.FDuiSlideNumber_onMouseCaptureStop;
   o.onSlideChange       = MO.FDuiSlideNumber_onSlideChange;
   o.onInputKeyPress     = MO.Class.register(o, new MO.AEventKeyPress('onInputKeyPress'), MO.FDuiSlideNumber_onInputKeyPress);
   o.onInputEdit         = MO.Class.register(o, new MO.AEventInputChanged('onInputEdit'), MO.FDuiSlideNumber_onInputEdit);
   o.onInputChange       = MO.Class.register(o, new MO.AEventChange('onInputChange'), MO.FDuiSlideNumber_onInputChange);
   o.construct           = MO.FDuiSlideNumber_construct;
   o.get                 = MO.FDuiSlideNumber_get;
   o.set                 = MO.FDuiSlideNumber_set;
   o.setInputValue       = MO.FDuiSlideNumber_setInputValue;
   o.refreshValue        = MO.FDuiSlideNumber_refreshValue;
   return o;
}
MO.FDuiSlideNumber_onBuildEditValue = function FDuiSlideNumber_onBuildEditValue(p){
   var o = this;
   var hp = o._hValuePanel;
   hp.className = o.styleName('ValuePanel');
   var hf = o._hValueForm = MO.Window.Builder.appendTable(hp);
   hf.__linker = o;
   hf.width = '100%';
   var hl = o._hValueLine = MO.Window.Builder.appendTableRow(hf);
   o._hChangePanel = MO.Window.Builder.appendTableCell(hl);
   o.onBuildEditChange(p);
   var hsp = o._hSlidePanel = MO.Window.Builder.appendTableCell(hl, o.styleName('SlidePanel'));
   var b = o._slide = new MO.SDuiSlide();
   b.control = o;
   b.hPanel = hsp;
   b.setRange(o._valueMin, o._valueMax);
   b.onSlideChange = o.onSlideChange;
   b.build();
   var hep = o._hInputPanel = MO.Window.Builder.appendTableCell(hl);
   var he = o._hInput = MO.Window.Builder.appendEdit(hep, o.styleName('Input'));
   o.attachEvent('onInputKeyPress', he, o.onInputKeyPress);
   o.attachEvent('onInputEdit', he, o.onInputEdit);
   o.attachEvent('onInputChange', he, o.onInputChange);
   MO.Window.Html.setSize(hep, o._inputSize);
   if(o._editLength){
      he.maxLength = o._editLength;
   }
   var hap = o._hAdjustPanel = MO.Window.Builder.appendTableCell(hl);
   hap.style.borderLeft = '1px solid #666666';
   hap.width = 12;
   var haf = o.hAdjustForm = MO.Window.Builder.appendTable(hap, o.styleName('AdjustForm'));
   var hc = MO.Window.Builder.appendTableRowCell(haf);
   hc.className = o.styleName('UpPanel');
   var hi = o._hUpIcon = MO.Window.Builder.appendIcon(hc, null, 'control.number.up');
   hi.align = 'center';
   var hc = MO.Window.Builder.appendTableRowCell(haf);
   hc.className = o.styleName('DownPanel');
   var hi = o._hDownIcon = MO.Window.Builder.appendIcon(hc, null, 'control.number.down');
}
MO.FDuiSlideNumber_onMouseCaptureStart = function FDuiSlideNumber_onMouseCaptureStart(p){
   var o = this;
   var c = MO.Window.Html.searchObject(p.hSource, '__pcapture');
   if(c){
      c.onMouseDown(p);
   }
}
MO.FDuiSlideNumber_onMouseCapture = function FDuiSlideNumber_onMouseCapture(p){
   var o = this;
   var c = MO.Window.Html.searchObject(p.hSource, '__pcapture');
   if(c){
      c.onMouseMove(p);
   }
}
MO.FDuiSlideNumber_onMouseCaptureStop = function FDuiSlideNumber_onMouseCaptureStop(p){
   var o = this;
   var c = MO.Window.Html.searchObject(p.hSource, '__pcapture');
   if(c){
      c.onMouseUp(p);
   }
}
MO.FDuiSlideNumber_onSlideChange = function FDuiSlideNumber_onSlideChange(p){
   var o = this;
   o.setInputValue(p);
   o.refreshValue();
}
MO.FDuiSlideNumber_onInputKeyPress = function FDuiSlideNumber_onInputKeyPress(p){
   var o = this;
   var c = p.keyCode;
   if(!MO.RKeyboard.isFloatKey(c)){
      p.cancel();
   }
}
MO.FDuiSlideNumber_onInputEdit = function FDuiSlideNumber_onInputEdit(p){
   var o = this;
   var v = o._hInput.value;
   o._slide.set(v);
   o.refreshValue();
}
MO.FDuiSlideNumber_onInputChange = function FDuiSlideNumber_onInputChange(p){
   var o = this;
   var v = o._hInput.value;
   o._slide.set(v);
   o.setInputValue(v);
   o.refreshValue();
}
MO.FDuiSlideNumber_construct = function FDuiSlideNumber_construct(){
   var o = this;
   o.__base.FDuiEditControl.construct.call(o);
   o._inputSize = new MO.SSize2(120, 0);
}
MO.FDuiSlideNumber_get = function FDuiSlideNumber_get(p){
   var o = this;
   var v = o._hInput.value;
   var r = MO.Lang.Float.parse(v);
   return MO.Lang.Float.toRange(r, o._valueMin, o._valueMax);
}
MO.FDuiSlideNumber_set = function FDuiSlideNumber_set(p){
   var o = this;
   o.__base.FDuiEditControl.set.call(o, p);
   var v = MO.Lang.String.nvl(p, '0');
   o._innerOriginValue = v;
   o._innerDataValue = v;
   o._slide.set(v);
   o.setInputValue(v);
   o.changeSet(false);
}
MO.FDuiSlideNumber_setInputValue = function FDuiSlideNumber_setInputValue(p){
   var o = this;
   var v = MO.Lang.Float.parse(p);
   if(isNaN(v)){
      return;
   }
   v = MO.Lang.Float.toRange(v, o._valueMin, o._valueMax);
   o._dataDisplay = MO.Lang.Float.format(v, 0, null, 2, null);
   o._hInput.value = o._dataDisplay;
}
MO.FDuiSlideNumber_refreshValue = function FDuiSlideNumber_refreshValue(){
   var o = this;
   o.processDataChangedListener(o);
}
MO.FDuiSplit = function FDuiSplit(o){
   o = MO.Class.inherits(this, o, MO.FDuiControl);
   return o;
}
MO.FDuiSplit_onSplitMouseEnter = function FDuiSplit_onSplitMouseEnter(e){
   var o = this;
   if(o.hImage){
      o.hImage.src = RRes._iconPath(o.extended ? 'ctl.collapse_hvr' : 'ctl.expand_hvr');
   }
}
MO.FDuiSplit_onSplitMouseLeave = function FDuiSplit_onSplitMouseLeave(e){
   var o = this;
   if(o.hImage){
      o.hImage.src = RRes._iconPath(o.extended ? 'ctl.collapse_nor' : 'ctl.expand_nor');
   }
}
MO.FDuiSplit_onMouseDown = function FDuiSplit_onMouseDown(){
   var o = this;
   if(ESplitStyle.Normal == o._dispStyle){
      o.extend(!o.extended);
   }
}
MO.FDuiSplit_onBuildPanel = function FDuiSplit_onBuildPanel(){
   var o = this;
   o.hPanel = MO.Window.Builder.create(null, 'DIV');
   o.hForm = MO.Window.Builder.appendTable(o.hPanel);
   o.hForm.width = '100%';
}
MO.FDuiSplit_oeBuild = function FDuiSplit_oeBuild(e){
   var o = this;
   o.base.FDuiControl.oeBuild.call(o, e);
   o.height = 2;
   if(MO.Lang.String.equals(o._dispStyle, ESplitStyle.Normal)){
      var hf = o.hForm;
      var hr = hf.insertRow()
      o.attachEvent('onSplitMouseEnter', hf);
      o.attachEvent('onSplitMouseLeave', hf);
      var hc = hr.insertCell();
      hc.width = '100%';
      hc.height = 25;
      hc.style.padding = '0 0';
      hc.style.background = 'url(' + RRes._iconPath('ctl.FDuiSplit_Panel') + ')';
      MO.Window.Builder.appendEmpty(hc, 4);
      o.hImage = MO.Window.Builder.appendIcon(hc, o._iconMinus);
      if(o._icon){
         o.hIcon = MO.Window.Builder.appendIcon(hc, o._icon);
      }
      o.hText = MO.Window.Builder.appendText(hc, '&nbsp;&nbsp;' + o.label);
      o.hText.style.fontWeight='BOLD';
   }else if(MO.Lang.String.equals(o._dispStyle, ESplitStyle.BulgeLine)){
      var h = this.hForm.insertRow().insertCell();
      h.style.borderBottom  = '1px solid #666666';
      h.style.borderTop  = '1px solid #DDDDDD';
      h.height = 2;
   }else if(MO.Lang.String.equals(o._dispStyle, ESplitStyle.HollowLine)){
      var h = this.hForm.insertRow().insertCell();
      h.style.borderBottom  = '1px solid #DDDDDD';
      h.style.borderTop  = '1px solid #666666';
      h.height = 2;
   }
   return EEventStatus.Stop;
}
MO.FDuiSplit_oeMode = function FDuiSplit_oeMode(e){
   var o = this;
   var r = o.base.FDuiControl.oeMode.call(o, e);
   o.base.MDisplay.oeMode.call(o, e);
   o.extend(o._editExtend);
   return r;
}
MO.FDuiSplit_construct = function FDuiSplit_construct(){
   var o = this;
   o.__lines = new TList();
}
MO.FDuiSplit_extend = function FDuiSplit_extend(v){
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
MO.FDuiSplit_pushLine = function FDuiSplit_pushLine(hr){
   this.__lines.push(hr);
}
MO.FDuiSplit_dispose = function FDuiSplit_dispose(){
   var o = this;
   o.base.FDuiControl.dispose.call(o);
   if(o.__lines){
      o.__lines.release();
      o.__lines = null;
   }
   o.hForm = null;
   o.hText = null;
   o.hIcon = null;
   o.hImage = null;
}
MO.FDuiTemplate = function FDuiTemplate(o){
   o = MO.Class.inherits(this, o, MO.FDuiEditControl, MO.MUiPropertyEdit, MO.MListenerDataChanged);
   o._inputSize       = MO.Class.register(o, new MO.APtySize2('_inputSize'));
   o._unit            = MO.Class.register(o, new MO.APtyString('_unit'));
   o._styleValuePanel = MO.Class.register(o, new MO.AStyle('_styleValuePanel'));
   o._styleInputPanel = MO.Class.register(o, new MO.AStyle('_styleInputPanel'));
   o._styleInput      = MO.Class.register(o, new MO.AStyle('_styleInput'));
   o._hValueForm      = null;
   o._hValueLine      = null;
   o._hInputPanel     = null;
   o._hInput          = null;
   o.onBuildEditValue = MO.FDuiTemplate_onBuildEditValue;
   o.onInputEdit      = MO.Class.register(o, new MO.AEventInputChanged('onInputEdit'), MO.FDuiTemplate_onInputEdit);
   o.construct        = MO.FDuiTemplate_construct;
   o.formatDisplay    = MO.FDuiTemplate_formatDisplay;
   o.formatValue      = MO.FDuiTemplate_formatValue;
   o.get              = MO.FDuiTemplate_get;
   o.set              = MO.FDuiTemplate_set;
   o.refreshValue     = MO.FDuiTemplate_refreshValue;
   return o;
}
MO.FDuiTemplate_onBuildEditValue = function FDuiTemplate_onBuildEditValue(p){
   var o = this;
   var hp = o._hValuePanel;
   hp.className = o.styleName('ValuePanel');
   var hf = o._hValueForm = MO.Window.Builder.appendTable(hp);
   hf.width = '100%';
   var hl = o._hValueLine = MO.Window.Builder.appendTableRow(hf);
   o._hChangePanel = MO.Window.Builder.appendTableCell(hl);
   o.onBuildEditChange(p);
   var hep = o._hInputPanel = MO.Window.Builder.appendTableCell(hl);
   var he = o._hInput = MO.Window.Builder.appendEdit(hep, o.styleName('Input'));
   o.attachEvent('onInputEdit', he, o.onInputEdit);
   MO.Window.Html.setSize(hep, o._inputSize);
   if(o._editLength){
      he.maxLength = o._editLength;
   }
}
MO.FDuiTemplate_onInputEdit = function FDuiTemplate_onInputEdit(p){
   var o = this;
   var v = o._hInput.value;
   o.refreshValue();
}
MO.FDuiTemplate_construct = function FDuiTemplate_construct(){
   var o = this;
   o.__base.FDuiEditControl.construct.call(o);
   o._inputSize = new MO.SSize2(120, 0);
}
MO.FDuiTemplate_formatDisplay = function FDuiTemplate_formatDisplay(p){
   var o = this;
   var r = MO.Lang.String.nvl(p);
   o._dataDisplay = r;
   return r;
}
MO.FDuiTemplate_formatValue = function FDuiTemplate_formatValue(p){
   return p;
}
MO.FDuiTemplate_get = function FDuiTemplate_get(){
   var o = this;
   var r = o.__base.FDuiEditControl.get.call(o);
   var r = o._hInput.value;
   return r;
}
MO.FDuiTemplate_set = function FDuiTemplate_set(p){
   var o = this;
   o.__base.FDuiEditControl.set.call(o, p);
   o._hInput.value = MO.Lang.String.nvl(p);
}
MO.FDuiTemplate_refreshValue = function FDuiTemplate_refreshValue(){
   var o = this;
   o.processDataChangedListener(o);
}
MO.FDuiText = function FDuiText(o){
   o = MO.Class.inherits(this, o, MO.FDuiTextControl, MO.MUiPropertyEdit, MO.MListenerDataChanged);
   o._inputSize       = MO.Class.register(o, new MO.APtySize2('_inputSize'));
   o._unit            = MO.Class.register(o, new MO.APtyString('_unit'));
   o._styleValuePanel = MO.Class.register(o, new MO.AStyle('_styleValuePanel'));
   o._styleInputPanel = MO.Class.register(o, new MO.AStyle('_styleInputPanel'));
   o._styleInput      = MO.Class.register(o, new MO.AStyle('_styleInput'));
   o._hValueForm      = null;
   o._hValueLine      = null;
   o._hInputPanel     = null;
   o._hInput          = null;
   o.onBuildEditValue = MO.FDuiText_onBuildEditValue;
   o.onInputEdit      = MO.Class.register(o, new MO.AEventInputChanged('onInputEdit'), FDuiText_onInputEdit);
   o.construct        = MO.FDuiText_construct;
   o.formatDisplay    = MO.FDuiText_formatDisplay;
   o.formatValue      = MO.FDuiText_formatValue;
   o.get              = MO.FDuiText_get;
   o.set              = MO.FDuiText_set;
   o.refreshValue     = MO.FDuiText_refreshValue;
   return o;
}
MO.FDuiText_onBuildEditValue = function FDuiText_onBuildEditValue(p){
   var o = this;
   var hp = o._hValuePanel;
   hp.className = o.styleName('ValuePanel');
   var hf = o._hValueForm = MO.Window.Builder.appendTable(hp);
   hf.width = '100%';
   var hl = o._hValueLine = MO.Window.Builder.appendTableRow(hf);
   o._hChangePanel = MO.Window.Builder.appendTableCell(hl);
   o.onBuildEditChange(p);
   var hep = o._hInputPanel = MO.Window.Builder.appendTableCell(hl);
   var he = o._hInput = MO.Window.Builder.appendEdit(hep, o.styleName('Input'));
   o.attachEvent('onInputEdit', he, o.onInputEdit);
   MO.Window.Html.setSize(hep, o._inputSize);
   if(o._editLength){
      he.maxLength = o._editLength;
   }
}
MO.FDuiText_onInputEdit = function FDuiText_onInputEdit(p){
   var o = this;
   var v = o._hInput.value;
   o.refreshValue();
}
MO.FDuiText_construct = function FDuiText_construct(){
   var o = this;
   o.__base.FDuiTextControl.construct.call(o);
   o._inputSize = new MO.SSize2(120, 0);
}
MO.FDuiText_formatDisplay = function FDuiText_formatDisplay(p){
   var o = this;
   var r = MO.Lang.String.nvl(p);
   o._dataDisplay = r;
   return r;
}
MO.FDuiText_formatValue = function FDuiText_formatValue(p){
   return p;
}
MO.FDuiText_get = function FDuiText_get(){
   var o = this;
   var r = o.__base.FDuiTextControl.get.call(o);
   var r = o._hInput.value;
   return r;
}
MO.FDuiText_set = function FDuiText_set(p){
   var o = this;
   o.__base.FDuiTextControl.set.call(o, p);
   o._hInput.value = MO.Lang.String.nvl(p);
}
MO.FDuiText_refreshValue = function FDuiText_refreshValue(){
   var o = this;
   o.processDataChangedListener(o);
}
