MO.EUiSplitStyle = new function EUiSplitStyle(){
   var o = this;
   o.Normal     = 'N';
   o.BulgeLine  = 'B';
   o.HollowLine = 'H';
   return o;
}
with(MO){
   MO.MDuiShadow = function MDuiShadow(o){
      o = RClass.inherits(this, o);
      o._hShadow   = null;
      o.show       = MDuiShadow_show;
      o.hide       = MDuiShadow_hide;
      o.setVisible = MDuiShadow_setVisible;
      return o;
   }
   MO.MDuiShadow_show = function MDuiShadow_show(v){
      var o = this;
      if(!o._hShadow){
         o._hShadow = RBuilder.createDiv(o._hPanel, 'RWindow_Shadow');
      }
      o._hShadow.style.zIndex = RDuiLayer.next();
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
            hp.style.zIndex = RDuiLayer.next();
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
            o._hShadow = RBuilder.createDiv(o._hPanel, 'RWindow_Shadow');
         }
         o._hShadow.style.zIndex = RDuiLayer.next();
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
            hp.style.zIndex = RDuiLayer.next();
         }
      }else{
         if(o._hShadow){
            o._hShadow.style.display = 'none';
         }
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
      MO.Logger.debug(o, 'Tool button click. (label={1})', o._label);
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
with(MO){
   MO.FDuiCalendar = function FDuiCalendar(o){
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
      o.onKeyPress  = FDuiCalendar_onKeyPress;
      o.onDataClick   = FDuiCalendar_onDataClick;
      o.refreshStyle  = FDuiCalendar_refreshStyle;
      o.onEditEnd   = FDuiCalendar_onEditEnd;
      o.onBuildEdit = FDuiCalendar_onBuildEdit;
      o.construct   = FDuiCalendar_construct;
      o.formatValue = FDuiCalendar_formatValue;
      o.formatText  = FDuiCalendar_formatText;
      o.drop        = FDuiCalendar_drop;
      o.doBlur      = FDuiCalendar_doBlur;
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
      if(!RString.inChars(String.fromCharCode(e.keyCode), RDate.Chars)){
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
            return RDate.formatDate(o.date);
         }else{
            RDate.autoParse(o.date, t);
            return RDate.formatDate(o.date);
         }
      }
      return RString.nvl(t);
   }
   MO.FDuiCalendar_formatText = function FDuiCalendar_formatText(value){
      if(value){
         var o = this;
         RDate.autoParse(o.date, value);
         return RDate.formatDate(o.date, o.editFormat);
      }
      return RString.nvl(value);
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
   o.editFormat       = MO.RDate.DisplayFormat;
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
       h.value = Math.min(RInteger.parse(h.value), 23);
    }else if(h == o.hMinute){
       h.value = Math.min(RInteger.parse(h.value), 59);
    }else if(h == o.hSecond){
       h.value = Math.min(RInteger.parse(h.value), 59);
    }
    o.storeChange();
    o.setDate(o.date);
}
MO.FDuiCalendarEditor_onDayDbClick = function FDuiCalendarEditor_onDayDbClick(e){
   var o = e.source
   if(RClass.isClass(o, FDuiCalendarEditor) && 0 != RInteger.parse(e.hSource.innerText)){
      o.date.setDay(e.hSource.innerText);
      o.dataValue = RDate.formatDate(o.date);
      o.editEnd();
   }
}
MO.FDuiCalendarEditor_onDaySelect = function FDuiCalendarEditor_onDaySelect(e){
   var o = this;
   if(RClass.isClass(o, FDuiCalendarEditor) && 0 != RInteger.parse(e.hSource.innerText)){
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
   if(RClass.isClass(o, FDuiCalendarEditor)){
      o.dataValue = RDate.format();
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
MO.FDuiCalendarEditor_onDateBlur = function FDuiCalendarEditor_onDateBlur(){
   var o = this;
   o.storeChange();
   o.setDate(o.date);
}
MO.FDuiCalendarEditor_onBuildDrop = function FDuiCalendarEditor_onBuildDrop(){
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
   hCel.innerText = RContext.get('FDuiCalendarEditor:year');
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
   hCel.innerText = RContext.get('FDuiCalendarEditor:month');
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
MO.FDuiCalendarEditor_buildDays = function FDuiCalendarEditor_buildDays(){
   var o = this;
   var hTab = RBuilder.appendTable(o.hDaysPanel, null, 0, 0, 1);
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
   hNow.innerText = RContext.get('FDuiCalendarEditor:now');
   hNow.style.display = 'none';
   hNow.link = o;
   o.attachEvent("onButtonNow", hNow);
   var hc = hRow.insertCell();
   var hCl = o.hCancel = RBuilder.append(hc, 'SPAN', o.style('Ok'));
   hCl.style.width = 50;
   hc.style.border='1 solid #2BD6F0';
   hCl.link = o;
   o.attachEvent("onButtonCancel", hCl);
   hCl.innerText = RContext.get('FDuiCalendarEditor:cancel');
   var ho = hRow.insertCell();
   var hOk = o.hOk = RBuilder.append(ho, 'SPAN', o.style('Ok'));
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
   RDate.parse(o.date, value);
   RDate.parse(o.dateOrg, value);
   if(!value){
      o.date.now();
      RDate.parse(o.date, value);
      RDate.parse(o.dateOrg, value);
   }
   o.setDate(o.date);
}
MO.FDuiCalendarEditor_setDate = function FDuiCalendarEditor_setDate(date){
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
   o.date.setHour(Math.min(RInteger.parse(o.hHour.value), 23));
   o.date.setMinute(Math.min(RInteger.parse(o.hMinute.value), 59));
   o.date.setSecond(Math.min(RInteger.parse(o.hSecond.value), 59));
}
MO.FDuiCalendarEditor_onBuildButton = function FDuiCalendarEditor_onBuildButton(){
   var o = this;
}
MO.FDuiCalendarEditor_onMdown = function FDuiCalendarEditor_onMdown(e){
   var o = e.source;
   if(RClass.isClass(o, FDuiCalendarEditor)){
      o.isSkipBlur = true;
      if(e.hSource.linkAction){
         e.hSource.linkAction.call(o, e.hSource);
      }
   }
}
MO.FDuiCalendarEditor_onMup = function FDuiCalendarEditor_onMup(e){
   var o = e.source;
   if(RClass.isClass(o, FDuiCalendarEditor)){
      var f = o.focusObject;
      if(f && f.focus && f.select){
         f.focus();
         f.select();
      }
   }
}
MO.FDuiCalendarEditor_ohKdown = function FDuiCalendarEditor_ohKdown(){
   var o = this.link;
   if(RClass.isClass(o, FDuiCalendarEditor)){
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
   if(RClass.isClass(o, FDuiCalendarEditor)){
      e.hSource.className = o.style('ButtonHover');
   }
}
MO.FDuiCalendarEditor_onButtonOut = function FDuiCalendarEditor_onButtonOut(e){
   var o = e.source;
   if(RClass.isClass(o, FDuiCalendarEditor)){
      e.hSource.className = o.style('Button');
   }
}
MO.FDuiCalendarEditor_onButtonOk = function FDuiCalendarEditor_onButtonOk(e){
   var o = e.source;
   if(RClass.isClass(o, FDuiCalendarEditor)){
      o.editStatus = EEditStatus.Ok;
      o.dataValue = RDate.formatDate(o.date);
      o.editEnd();
   }
}
MO.FDuiCalendarEditor_onButtonCancel = function FDuiCalendarEditor_onButtonCancel(e) {
   var o = e.source;
   if(RClass.isClass(o, FDuiCalendarEditor)){
    o.editStatus = EEditStatus.Cancel;
     o.dataValue = '';
     o.editEnd();
   }
}
MO.FDuiCalendarEditor_ohDaysChange = function FDuiCalendarEditor_ohDaysChange(){
   var o = this.link;
   if(RClass.isClass(o, FDuiCalendarEditor)){
      o.date.setYear(o.hYear.value);
      o.date.setMonth(o.hMonth.value);
      o.setDate(o.date);
   }
}
MO.FDuiCalendarEditor_ohKeyCheck = function FDuiCalendarEditor_ohKeyCheck(){
   var e = RWindow.event(this)
   if(!RString.inChars(String.fromCharCode(e.keyCode), RDate.Chars)){
      e.keyCode = 0;
   }
}
MO.FDuiCalendarEditor_onDayEnter = function FDuiCalendarEditor_onDayEnter(e){
   var o = e.source;
   if(RClass.isClass(o, FDuiCalendarEditor) && e.hSource.innerText != '.'){
      if(!e.hSource.isCurrent){
         e.hSource.className = o.style('DayHover');
      }
   }
}
MO.FDuiCalendarEditor_onDayOut = function FDuiCalendarEditor_onDayOut(e){
   var o = e.source;
   if(RClass.isClass(o, FDuiCalendarEditor) && e.hSource.innerText != '.'){
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
   o = MO.Class.inherits(this, o, MO.FDuiEditControl, MO.MUiPropertyCheck, MO.MListenerDataChanged);
   o._styleInput      = MO.Class.register(o, new MO.AStyle('_styleInput'));
   o._hInput          = null;
   o.onBuildEditValue = MO.FDuiCheck_onBuildEditValue;
   o.onInputClick     = MO.Class.register(o, new MO.AEventClick('onInputClick'), MO.FDuiCheck_onInputClick);
   o.oeSaveValue      = MO.FDuiCheck_oeSaveValue;
   o.construct        = MO.FDuiCheck_construct;
   o.formatLoad       = MO.FDuiCheck_formatLoad;
   o.formatSave       = MO.FDuiCheck_formatSave;
   o.get              = MO.FDuiCheck_get;
   o.set              = MO.FDuiCheck_set;
   o.refreshValue     = MO.FDuiCheck_refreshValue;
   o.refreshStyle     = MO.FDuiCheck_refreshStyle;
   return o;
}
MO.FDuiCheck_onBuildEditValue = function FDuiCheck_onBuildEditValue(p){
   var o = this;
   var h = o._hInput = MO.Window.Builder.appendCheck(o._hValuePanel, o.styleName('Input'));
   o.attachEvent('onInputClick', h);
}
MO.FDuiCheck_onInputClick = function FDuiCheck_onInputClick(p){
   this.refreshValue();
}
MO.FDuiCheck_oeSaveValue = function FDuiCheck_oeSaveValue(e){
   var o = this;
   if(MO.EStore.Prepare == e.store){
      if(MO.Lang.Boolean.isTrue(o.reget())){
         e.values.set(o.dataName, EBoolean.True);
      }
      return MO.EEventStatus.Stop;
   }
   return o.base.FDuiEditControl.oeSaveValue.call(o, e);
}
MO.FDuiCheck_construct = function FDuiCheck_construct(){
   var o = this;
   o.__base.FDuiEditControl.construct.call(o);
   o._editSize.set(60, 20);
}
MO.FDuiCheck_formatLoad = function FDuiCheck_formatLoad(value){
   var o = this;
   return (value == o._valueTrue);
}
MO.FDuiCheck_formatSave = function FDuiCheck_formatSave(value){
   var o = this;
   return MO.Lang.Boolean.toString(value, o._valueTrue, o._valueFalse);
}
MO.FDuiCheck_get = function FDuiCheck_get(){
   return this._hInput.checked;
}
MO.FDuiCheck_set = function FDuiCheck_set(value){
   this._hInput.checked = value;
}
MO.FDuiCheck_refreshValue = function FDuiCheck_refreshValue(){
   var o = this;
   o.processDataChangedListener(o);
}
MO.FDuiCheck_refreshStyle = function FDuiCheck_refreshStyle(){
   var o = this;
   var h = o.panel(MO.EPanel.Edit);
   h.disabled = !o._editable;
   if(!o._editable){
      o.hEdit.style.cursor = 'normal';
   }
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
   MO.Logger.debug(o, 'Begin (editor={1}:{2} value={3})', editor, editor?editor.value():'', o.dataValue);
   if(editor){
      o.set(editor.values);
   }
   o.onDataEditEnd(o);
   MO.Logger.debug(o, 'End (editor={1} value={2})', editor, o.dataValue);
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
with(MO){
   MO.FDuiCheckPickerEditor = function FDuiCheckPickerEditor(o){
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
      o.onBuildDrop      = FDuiCheckPickerEditor_onBuildDrop;
      o.onBuildButton    = FDuiCheckPickerEditor_onBuildButton;
      o.onItemClick      = FDuiCheckPickerEditor_onItemClick;
      o.onEditKeyDown    = FDuiCheckPickerEditor_onEditKeyDown;
      o.construct        = FDuiCheckPickerEditor_construct;
      o.set              = FDuiCheckPickerEditor_set;
      o.setItems         = FDuiCheckPickerEditor_setItems;
      o.select           = FDuiCheckPickerEditor_select;
      o.linkControl      = FDuiCheckPickerEditor_linkControl;
      o.show             = FDuiCheckPickerEditor_show;
      o.hide             = FDuiCheckPickerEditor_hide;
      o.dispose          = FDuiCheckPickerEditor_dispose;
      return o;
   }
   MO.FDuiCheckPickerEditor_construct = function FDuiCheckPickerEditor_construct(){
      var o = this;
      o.itemClickListener = new TListener(o, o.onItemClick);
   }
   MO.FDuiCheckPickerEditor_onBuildDrop = function FDuiCheckPickerEditor_onBuildDrop(){
      var o = this;
      o.hItemsForm = RBuilder.appendTable(o.hDropPanel);
      o.hItemsForm.width = '100%';
      o.hItemsPanel = RBuilder.append(o.hItemsForm, 'TBODY');
      o.onBuildButton();
   }
   MO.FDuiCheckPickerEditor_onBuildButton = function FDuiCheckPickerEditor_onBuildButton(){
      var o = this;
      o.base.FDropEditor.onBuildButton.call(o);
      var h = o.hBtnTextSpan = RBuilder.newSpan(o.hButtonPanel, null);
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
   MO.FDuiCheckPickerEditor_linkControl = function FDuiCheckPickerEditor_linkControl(c){
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
}
with(MO){
   MO.FDuiColor = function FDuiColor(o){
      o = RClass.inherits(this, o, FEditControl);
      o._inputSize       = RClass.register(o, new APtySize2('_inputSize'));
      o._styleInputPanel = RClass.register(o, new AStyle('_styleInputPanel'));
      o._styleInput      = RClass.register(o, new AStyle('_styleInput'));
      o._hInput          = null;
      o.onBuildEditValue = FDuiColor_onBuildEditValue;
      o.construct        = FDuiColor_construct;
      o.get              = FDuiColor_get;
      o.set              = FDuiColor_set;
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
      var he = o._hInput = RBuilder.appendEdit(h, o.styleName('Input'));
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
         h.value = RString.nvl(p);
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
      var r = RString.nvl(v);
      if(ECase.Upper == o.editCase){
         r = RString.toUpper(r);
      }else if(ECase.Lower == o.editCase){
         r = RString.toLower(r);
      }
      return r;
   }
   MO.FDuiColor_setText = function FDuiColor_setText(t){
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
}
with(MO){
   MO.FDuiColor3Tpl = function FDuiColor3Tpl(o){
      o = RClass.inherits(this, o, FEditControl, MListenerDataChanged);
      o._inputSize        = RClass.register(o, new APtySize2('_inputSize'));
      o._styleValuePanel  = RClass.register(o, new AStyle('_styleValuePanel'));
      o._styleInput       = RClass.register(o, new AStyle('_styleInput'));
      o._innerOriginValue = null;
      o._innerDataValue   = null;
      o._hInputRed        = null;
      o._hInputGreen      = null;
      o._hInputBlue       = null;
      o.onBuildEditValue  = FDuiColor3Tpl_onBuildEditValue;
      o.onInputKeyPress   = RClass.register(o, new AEventKeyPress('onInputKeyPress'), FDuiColor3Tpl_onInputKeyPress);
      o.onInputChanged    = RClass.register(o, new AEventInputChanged('onInputChanged'), FDuiColor3Tpl_onInputChanged);
      o.construct         = FDuiColor3Tpl_construct;
      o.get               = FDuiColor3Tpl_get;
      o.set               = FDuiColor3Tpl_set;
      return o;
   }
   MO.FDuiColor3Tpl_onBuildEditValue = function FDuiColor3Tpl_onBuildEditValue(p){
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
      var r = RString.nvl(v);
      if(ECase.Upper == o.editCase){
         r = RString.toUpper(r);
      }else if(ECase.Lower == o.editCase){
         r = RString.toLower(r);
      }
      return r;
   }
   MO.FDuiColor3Tpl_setText = function FDuiColor3Tpl_setText(t){
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
}
with(MO){
   MO.FDuiColor4 = function FDuiColor4(o){
      o = RClass.inherits(this, o, FEditControl);
      o._inputSize       = RClass.register(o, new APtySize2('_inputSize'));
      o._styleInputPanel = RClass.register(o, new AStyle('_styleInputPanel'));
      o._styleInput      = RClass.register(o, new AStyle('_styleInput'));
      o._hInput          = null;
      o.onBuildEditValue = FDuiColor4_onBuildEditValue;
      o.construct        = FDuiColor4_construct;
      o.get              = FDuiColor4_get;
      o.set              = FDuiColor4_set;
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
      var he = o._hInput = RBuilder.appendEdit(h, o.styleName('Input'));
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
      var r = RString.nvl(v);
      if(ECase.Upper == o.editCase){
         r = RString.toUpper(r);
      }else if(ECase.Lower == o.editCase){
         r = RString.toLower(r);
      }
      return r;
   }
   MO.FDuiColor4_setText = function FDuiColor4_setText(t){
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
}
with(MO){
   MO.FDuiColorPicker = function FDuiColorPicker(o){
      o = RClass.inherits(this, o, FEditControl, MEditBorder, MDescColor, MDropable);
      o.borderStyle = EUiBorder.RoundDrop;
      o.onBuildEdit = FDuiColorPicker_onBuildEdit;
      o.onEditEnd   = FDuiColorPicker_onEditEnd;
      o.onDataKeyDown   = FDuiColorPicker_onDataKeyDown;
      o.checkColor = FDuiColorPicker_checkColor;
      o.setText     = FDuiColorPicker_setText;
      o.drop        = FDuiColorPicker_drop;
      o.dispose     = FDuiColorPicker_dispose;
      return o;
   }
   MO.FDuiColorPicker_onBuildEdit = function FDuiColorPicker_onBuildEdit(b){
      var o = this;
      var h = o.hEdit = RBuilder.appendEdit(b.hPanel, o.style('Edit'));
      h.maxLength = 20;
   }
   MO.FDuiColorPicker_onEditEnd = function FDuiColorPicker_onEditEnd(editor){
      var o = this;
      RLog.debug(o, 'Begin (editor={0}:{1} value={2})', editor, editor?editor.color:'', o.dataValue);
      if(editor){
         o.set(editor.color);
         o.hDrop.style.backgroundColor = editor.color;
      }
      o.onDataEditEnd(o);
      RLog.debug(o, 'End (editor={0} value={1})', editor, o.dataValue);
   }
   MO.FDuiColorPicker_setText = function FDuiColorPicker_setText(t){
      var o = this;
      o.base.FEditControl.setText.call(o, RString.toUpper(t));
      o.hDrop.style.backgroundColor = t;
   }
   MO.FDuiColorPicker_checkColor = function FDuiColorPicker_checkColor(c)
   {
      var oSpan = document.createElement("<span style='color:"+c+";'></span>");
      if(oSpan.style.color != ""){
         return true;
      }else{
         return false;
      }
   }
   MO.FDuiColorPicker_onDataKeyDown = function FDuiColorPicker_onDataKeyDown(e){
         var o = this;
         o.base.FEditControl.onDataKeyDown.call(o, o, e);
         if(o.checkColor(o.text())){
            o.hDrop.style.backgroundColor = o.text();
         }else{
            o.hDrop.style.backgroundColor = '';
         }
   }
   MO.FDuiColorPicker_drop = function FDuiColorPicker_drop(){
      var o = this;
      if(o.canDrop() && o.canEdit){
         var ed = o.editor = RConsole.find(FEditConsole).focus(o, FDuiColorPickerEditor, o.name);
         if(ed.linkControl(o)){
            ed.set(o.reget());
         }
         ed.show();
      }
   }
   MO.FDuiColorPicker_dispose = function FDuiColorPicker_dispose(){
      var o = this;
      o.base.FEditControl.dispose.call(o);
      RMemory.freeHtml(o.hEdit);
      RMemory.freeHtml(o.hDrop);
      o.hEdit = null;
      o.hDrop = null;
   }
}
with(MO){
   MO.FDuiColorPickerEditor = function FDuiColorPickerEditor(o){
      o = RClass.inherits(this, o, FDropEditor, MShadow);
      o.MinWidth     = 240;
      o.ColorHex     = new Array('00', '33', '66', '99', 'CC', 'FF');
      o.SpColorHex   = new Array('FF0000', '00FF00', '0000FF', 'FFFF00', '00FFFF','FF00FF');
      o.onCellEnter  = RClass.register(o, new HMouseOver('onCellEnter'),  FDuiColorPickerEditor_onCellEnter);
      o.onCellSelect = RClass.register(o, new HMouseDown('onCellSelect'), FDuiColorPickerEditor_onCellSelect);
      o.color        = null;
      o.hTable       = null;
      o.cellWidth    = 16;
      o.cellHeight   = 10;
      o.onBuildDrop  = FDuiColorPickerEditor_onBuildDrop;
      o.onKeyDown    = FDuiColorPickerEditor_onKeyDown;
      o.onCellSelect = FDuiColorPickerEditor_onCellSelect;
       o.onEditEnd = FDuiColorPickerEditor_onEditEnd;
      o.makeCell     = FDuiColorPickerEditor_makeCell;
      o.set          = FDuiColorPickerEditor_set;
      o.show         = FDuiColorPickerEditor_show;
      o.hide         = FDuiColorPickerEditor_hide;
      o.linkControl  = FDuiColorPickerEditor_linkControl;
      o.dispose      = FDuiColorPickerEditor_dispose;
      return o;
   }
   MO.FDuiColorPickerEditor_onBuildDrop = function FDuiColorPickerEditor_onBuildDrop(){
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
   MO.FDuiColorPickerEditor_linkControl = function FDuiColorPickerEditor_linkControl(c){
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
}
with(MO){
   MO.FDuiColorPower = function FDuiColorPower(o){
      o = RClass.inherits(this, o, FDuiEditControl, MListenerDataChanged, MMouseCapture);
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
      o.onBuildEditValue    = FDuiColorPower_onBuildEditValue;
      o.onMouseCaptureStart = FDuiColorPower_onMouseCaptureStart;
      o.onMouseCapture      = FDuiColorPower_onMouseCapture;
      o.onMouseCaptureStop  = FDuiColorPower_onMouseCaptureStop;
      o.onInputKeyPress     = RClass.register(o, new AEventKeyPress('onInputKeyPress'), FDuiColorPower_onInputKeyPress);
      o.onInputEdit         = RClass.register(o, new AEventInputChanged('onInputEdit'), FDuiColorPower_onInputEdit);
      o.onInputChange       = RClass.register(o, new AEventChange('onInputChange'), FDuiColorPower_onInputChange);
      o.construct           = FDuiColorPower_construct;
      o.get                 = FDuiColorPower_get;
      o.set                 = FDuiColorPower_set;
      o.setDisplayColor     = FDuiColorPower_setDisplayColor;
      o.setDisplay          = FDuiColorPower_setDisplay;
      o.refreshValue        = FDuiColorPower_refreshValue;
      o.dispose             = FDuiColorPower_dispose;
      return o;
   }
   MO.FDuiColorPower_onBuildEditValue = function FDuiColorPower_onBuildEditValue(p){
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
      var b = o._barRed = new SDuiColorChannel();
      b.control = o;
      b.typeCd = 'red';
      b.hPanel = hcf;
      b.build();
      var b = o._barGreen = new SDuiColorChannel();
      b.control = o;
      b.typeCd = 'green';
      b.hPanel = hcf;
      b.build();
      var b = o._barBlue = new SDuiColorChannel();
      b.control = o;
      b.typeCd = 'blue';
      b.hPanel = hcf;
      b.build();
      var b = o._barPower = new SDuiColorPower();
      b.control = o;
      b.typeCd = 'power';
      b.setRange(o._valueMin, o._valueMax);
      b.hPanel = hcf;
      b.build();
   }
   MO.FDuiColorPower_onMouseCaptureStart = function FDuiColorPower_onMouseCaptureStart(p){
      var o = this;
      var b = RHtml.searchObject(p.hSource, '__pbar');
      if(b){
         b.onMouseDown(p);
      }
   }
   MO.FDuiColorPower_onMouseCapture = function FDuiColorPower_onMouseCapture(p){
      var o = this;
      var b = RHtml.searchObject(p.hSource, '__pbar');
      if(b){
         b.onMouseMove(p);
      }
   }
   MO.FDuiColorPower_onMouseCaptureStop = function FDuiColorPower_onMouseCaptureStop(p){
      var o = this;
      var b = RHtml.searchObject(p.hSource, '__pbar');
      if(b){
         b.onMouseUp(p);
      }
   }
   MO.FDuiColorPower_onInputKeyPress = function FDuiColorPower_onInputKeyPress(p){
      var o = this;
      var c = p.keyCode;
      if(RKeyboard.isControlKey(c)){
         return;
      }
      if(!RKeyboard.isFloatKey(c)){
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
      o._inputSize = new SSize2(120, 0);
      o._innerOriginValue = new SColor4();
      o._innerDataValue = new SColor4();
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
   MO.FDuiColorPower_setDisplayColor = function FDuiColorPower_setDisplayColor(){
      var o = this;
      var v = o._innerDataValue;
      var va = v.alpha;
      var vr = RHex.format(RInteger.toRange(parseInt(v.red * va * 255), 0, 255), 2);
      var vg = RHex.format(RInteger.toRange(parseInt(v.green * va * 255), 0, 255), 2);
      var vb = RHex.format(RInteger.toRange(parseInt(v.blue * va * 255), 0, 255), 2);
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
}
with(MO){
   MO.FDuiDateTime = function FDuiDateTime(o){
      o = RClass.inherits(this, o, FDuiEditControl, MDuiDropable);
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
      o.onKeyPress   = FDuiDateTime_onKeyPress;
      o.onEditEnd    = FDuiDateTime_onEditEnd;
      o.onBuildEdit  = FDuiDateTime_onBuildEdit;
      o.oeSaveValue  = FDuiDateTime_oeSaveValue;
      o.construct    = FDuiDateTime_construct;
      o.formatValue  = FDuiDateTime_formatValue;
      o.text         = FDuiDateTime_text;
      o.setText      = FDuiDateTime_setText;
      o.validText    = FDuiDateTime_validText;
      o.setEditable  = FDuiDateTime_setEditable;
      o.refreshStyle = FDuiDateTime_refreshStyle;
      o.drop         = FDuiDateTime_drop;
      o.dispose      = FDuiDateTime_dispose;
      return o;
   }
   MO.FDuiDateTime_onKeyPress = function FDuiDateTime_onKeyPress(e){
      if(!RString.inChars(String.fromCharCode(e.keyCode), RDate.Chars)){
         RKey.eventClear(e);
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
   MO.FDuiDateTime_oeSaveValue = function FDuiDateTime_oeSaveValue(e){
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
   MO.FDuiDateTime_construct = function FDuiDateTime_construct(){
      var o = this;
      o.base.FDuiEditControl.construct.call(o);
      o._date = new TDate();
      o.lsnEditEnd = new TListener(o, o.onEditEnd);
   }
   MO.FDuiDateTime_formatValue = function FDuiDateTime_formatValue(t){
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
   MO.FDuiDateTime_text = function FDuiDateTime_text(){
      var o = this;
      o._date.setYear(o._date.year);
      o._date.setMonth(o._date.month);
      o._date.setDay(o._date.day);
      return RDate.formatDate(o._date);
   }
   MO.FDuiDateTime_setText = function FDuiDateTime_setText(t){
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
         e.set(RDate.formatDate(o._date));
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
}
with(MO){
   MO.FDuiDateTimeEditor = function FDuiDateTimeEditor(o){
      o = RClass.inherits(this, o, FDuiDropEditor);
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
      o.onButtonEnter     = RClass.register(o, new AEventMouseEnter('onButtonEnter'), FDuiDateTimeEditor_onButtonEnter);
      o.onButtonLeave     = RClass.register(o, new AEventMouseLeave('onButtonLeave'), FDuiDateTimeEditor_onButtonLeave);
      o.onYearClick       = RClass.register(o, new AEventMouseDown('onYearClick'), FDuiDateTimeEditor_onYearClick);
      o.onMonthClick      = RClass.register(o, new AEventMouseDown('onMonthClick'), FDuiDateTimeEditor_onMonthClick);
      o.onDayClick        = RClass.register(o, new AEventMouseDown('onDayClick'), FDuiDateTimeEditor_onDayClick);
      o.onDateDoubleClick = RClass.register(o, new AEventDoubleClick('onDateDoubleClick'), FDuiDateTimeEditor_onDateDoubleClick);
      o.onNowClick        = RClass.register(o, new AEventMouseDown('onNowClick'), FDuiDateTimeEditor_onNowClick);
      o.onConfirmClick    = RClass.register(o, new AEventMouseDown('onConfirmClick'), FDuiDateTimeEditor_onConfirmClick);
      o.onBuildDrop       = FDuiDateTimeEditor_onBuildDrop;
      o.onBuildButton     = FDuiDateTimeEditor_onBuildButton;
      o.construct         = FDuiDateTimeEditor_construct;
      o.buildTitle        = FDuiDateTimeEditor_buildTitle;
      o.get               = FDuiDateTimeEditor_get;
      o.set               = FDuiDateTimeEditor_set;
      o.resetDay          = FDuiDateTimeEditor_resetDay;
      o.setYearVisible    = FDuiDateTimeEditor_setYearVisible;
      o.setMonthVisible   = FDuiDateTimeEditor_setMonthVisible;
      o.setDayVisible     = FDuiDateTimeEditor_setDayVisible;
      o.selectCell        = FDuiDateTimeEditor_selectCell;
      o.restore           = FDuiDateTimeEditor_restore;
      o.show              = FDuiDateTimeEditor_show;
      o.dispose           = FDuiDateTimeEditor_dispose;
      return o;
   }
   MO.FDuiDateTimeEditor_onButtonEnter = function FDuiDateTimeEditor_onButtonEnter(e){
      if(!e.hSource.isSelect){
        if(RString.isEmpty(e.hSource.innerText)){
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
      if(!RString.equals(e.hSource.innerText, '.')){
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
   MO.FDuiDateTimeEditor_onBuildButton = function FDuiDateTimeEditor_onBuildButton(){
      var o = this;
      o.base.FDuiDropEditor.onBuildButton.call(o);
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
   MO.FDuiDateTimeEditor_construct = function FDuiDateTimeEditor_construct(){
      var o = this;
      o.base.FDuiDropEditor.construct.call(o);
      o.date = new TDate();
      o.years = new TList();
      o.months = new TList();
      o.days = new TList();
   }
   MO.FDuiDateTimeEditor_buildTitle = function FDuiDateTimeEditor_buildTitle(n, ml){
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
   MO.FDuiDateTimeEditor_get = function FDuiDateTimeEditor_get(){
      return RDate.formatDate(this.date);
   }
   MO.FDuiDateTimeEditor_set = function FDuiDateTimeEditor_set(v){
      var o = this;
      RDate.autoParse(o.date, v);
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
           hd.innerText = RInteger.format(n+1, 2);
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
}
with(MO){
   MO.FDuiDropEditor = function FDuiDropEditor(o){
      o = RClass.inherits(this, o, FDuiEditor, MDuiShadow);
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
      o.onBuild           = FDuiDropEditor_onBuild;
      o.onDropMouseDown   = RClass.register(o, new AEventMouseDown('onDropMouseDown'));
      o.onDropMouseUp     = RClass.register(o, new AEventMouseUp('onDropMouseUp'));
      o.panel             = FDuiDropEditor_panel;
      o.setVisible        = FDuiDropEditor_setVisible;
      o.dispose           = FDuiDropEditor_dispose;
      return o;
   }
   MO.FDuiDropEditor_onBuild = function FDuiDropEditor_onBuild(p){
      var o = this;
      o.__base.FDuiEditor.onBuild.call(o, p);
      var h = o._hPanel;
      h.className = o.styleName('Panel');
      var hf = o._hDropForm = RBuilder.appendTable(h, o.styleName('DropForm'));
      o._hDropPanel = RBuilder.appendTableRowCell(hf, o.styleName('DropPanel'));
      o._hButtonPanel = RBuilder.appendTableRowCell(hf, o.styleName('ButtonPanel'));
      o.onBuildDrop();
      o.onBuildButton();
   }
   MO.FDuiDropEditor_panel = function FDuiDropEditor_panel(p){
      var o = this;
      if(p == EPanel.Shadow){
         return o.hPanel;
      }
      return o.__base.FDuiEditor.panel.call(o, p);
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
      o._hButtonPanel = RHtml.free(o._hButtonPanel);
      o._hDropPanel = RHtml.free(o._hDropPanel);
      o._hDropForm = RHtml.free(o._hDropForm);
      o.__base.FControl.dispose.call(o);
   }
}
MO.FDuiEdit = function FDuiEdit(o){
   o = MO.Class.inherits(this, o, MO.FDuiEditControl, MO.MUiPropertyEdit);
   o._inputSize            = MO.Class.register(o, new MO.APtySize2('_inputSize'));
   o._unit                 = MO.Class.register(o, new MO.APtyString('_unit'));
   o._listenersDataChanged = MO.Class.register(o, new MO.AListener('_listenersDataChanged', MO.EEvent.DataChanged));
   o._styleValuePanel      = MO.Class.register(o, new MO.AStyle('_styleValuePanel'));
   o._styleInputPanel      = MO.Class.register(o, new MO.AStyle('_styleInputPanel'));
   o._styleInput           = MO.Class.register(o, new MO.AStyle('_styleInput'));
   o._hValueForm           = null;
   o._hValueLine           = null;
   o._hInputPanel          = null;
   o._hInput               = null;
   o.onBuildEditValue      = MO.FDuiEdit_onBuildEditValue;
   o.onInputEdit           = MO.Class.register(o, new MO.AEventInputChanged('onInputEdit'), MO.FDuiEdit_onInputEdit);
   o.construct             = MO.FDuiEdit_construct;
   o.formatText            = MO.FDuiEdit_formatText;
   o.formatValue           = MO.FDuiEdit_formatValue;
   o.text                  = MO.FDuiEdit_text;
   o.setText               = MO.FDuiEdit_setText;
   o.setEditAble           = MO.FDuiEdit_setEditAble;
   o.refreshValue          = MO.FDuiEdit_refreshValue;
   return o;
}
MO.FDuiEdit_onBuildEditValue = function FDuiEdit_onBuildEditValue(p){
   var o = this;
   var hValuePanel = o._hValuePanel;
   hValuePanel.className = o.styleName('ValuePanel');
   var hValueForm = o._hValueForm = MO.Window.Builder.appendTable(hValuePanel);
   hValueForm.width = '100%';
   var hValueLine = o._hValueLine = MO.Window.Builder.appendTableRow(hValueForm);
   o._hChangePanel = MO.Window.Builder.appendTableCell(hValueLine);
   o.onBuildEditChange(p);
   var hInputPanel = o._hInputPanel = MO.Window.Builder.appendTableCell(hValueLine);
   var hInput = o._hInput = MO.Window.Builder.appendEdit(hInputPanel, o.styleName('Input'));
   o.attachEvent('onInputEdit', hInput, o.onInputEdit);
   MO.Window.Html.setSize(hInputPanel, o._inputSize);
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
   o._inputSize = new MO.SSize2(120, 0);
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
MO.FDuiEdit_text = function FDuiEdit_text(){
   return this._hInput.value;
}
MO.FDuiEdit_setText = function FDuiEdit_setText(text){
   this._hInput.value = text;
}
MO.FDuiEdit_setEditAble = function FDuiEdit_setEditAble(flag){
   var o = this;
   o.__base.FDuiEditControl.setEditAble.call(o, flag);
   o._hInput.readOnly = !flag;
}
MO.FDuiEdit_refreshValue = function FDuiEdit_refreshValue(){
   var o = this;
   o.processDataChangedListener(o);
}
MO.FDuiEditControl = function FDuiEditControl(o){
   o = MO.Class.inherits(this, o, MO.FDuiControl, MO.MUiDataValue, MO.MUiDataField, MO.MUiEditValue, MO.MDuiEditChange, MO.MDuiEditDrop);
   o._labelModeCd            = MO.Class.register(o, new MO.APtyString('_labelModeCd'), MO.EUiLabelMode.All);
   o._labelPositionCd        = MO.Class.register(o, new MO.APtyString('_labelPositionCd'), MO.EUiLabelPosition.Left);
   o._labelSize              = MO.Class.register(o, new MO.APtySize2('_labelSize'));
   o._labelAlignCd           = MO.Class.register(o, new MO.APtyString('_labelAlignCd'), MO.EUiAlign.Left);
   o._labelColor             = MO.Class.register(o, new MO.APtyString('_labelColor'));
   o._editSize               = MO.Class.register(o, new MO.APtySize2('_editSize'));
   o._editColor              = MO.Class.register(o, new MO.APtyString('_editColor'));
   o._styleLabelPanel        = MO.Class.register(o, new MO.AStyle('_styleLabelPanel'));
   o._styleEditPanel         = MO.Class.register(o, new MO.AStyle('_styleEditPanel'));
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
   o.panel                   = MO.FDuiEditControl_panel;
   o.setLabel                = MO.FDuiEditControl_setLabel;
   o.calculateValueRectangle = MO.FDuiEditControl_calculateValueRectangle;
   o.dispose                 = MO.FDuiEditControl_dispose;
   return o;
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
   o._hValuePanel = MO.Window.Builder.appendTableCell(hEditLine);
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
}
MO.FDuiEditControl_oeMode = function FDuiEditControl_oeMode(event){
   var o = this;
   o.__base.FDuiControl.oeMode.call(o, event);
   o.__base.MDisplay.oeMode.call(o, event);
   o._editable = o.canEdit(event.mode);
   o._validable = o.canValid(event.mode);
   if(!o._progressing){
      o.setEditable(o._editable);
   }
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
      var value = unit.get(o._dataName);
      o.set(value);
   }
   return MO.EEventStatus.Stop;
}
MO.FDuiEditControl_oeSaveUnit = function FDuiEditControl_oeSaveUnit(event){
   var o = this;
   var unit = event.unit;
   var dataName = o._dataName;
   if(!MO.Lang.String.isEmpty(dataName)){
      var value = o.get();
      unit.set(o._dataName, value)
   }
   return MO.EEventStatus.Stop;
}
MO.FDuiEditControl_construct = function FDuiEditControl_construct(){
   var o = this;
   o.__base.FDuiControl.construct.call(o);
   o.__base.MDuiEditChange.construct.call(o);
   o.__base.MDuiEditDrop.construct.call(o);
   o._labelSize = new MO.SSize2(100, 20);
   o._editSize = new MO.SSize2(200, 20);
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
with(MO){
   MO.FDuiEditor = function FDuiEditor(o){
      o = RClass.inherits(this, o, FDuiControl, MDuiFocus);
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
      o.onEditBegin    = FDuiEditor_onEditBegin;
      o.onEditChanged  = FDuiEditor_onEditChanged;
      o.onEditEnd      = FDuiEditor_onEditEnd;
      o.onBuildPanel   = FDuiEditor_onBuildPanel;
      o.onBuild        = FDuiEditor_onBuild;
      o.get            = RMethod.virtual(o, 'get');
      o.set            = RMethod.virtual(o, 'set');
      o.doBlur         = FDuiEditor_doBlur;
      o.panel          = FDuiEditor_panel;
      o.linkControl    = FDuiEditor_linkControl;
      o.editBegin      = FDuiEditor_editBegin;
      o.editCancel     = FDuiEditor_editCancel;
      o.editEnd        = FDuiEditor_editEnd;
      o.reset          = FDuiEditor_reset;
      o.setVisible     = FDuiEditor_setVisible;
      o.dispose        = FDuiEditor_dispose;
      return o;
   }
   MO.FDuiEditor_onEditBegin = function FDuiEditor_onEditBegin(){
      this.editBegin();
   }
   MO.FDuiEditor_onEditChanged = function FDuiEditor_onEditChanged(){
      var o = this;
      MO.Logger.debug(o, 'Edit changed');
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
   MO.FDuiEditor_onEditEnd = function FDuiEditor_onEditEnd(){
      var o = this;
      var s = o._source;
      MO.Logger.debug(o, 'Editor end. (control={1})', RClass.dump(s));
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
      var h = o._hPanel = RBuilder.createSpan(p);
      h.__linker = o;
   }
   MO.FDuiEditor_onBuild = function FDuiEditor_onBuild(p){
      var o = this;
      o.__base.FDuiControl.onBuild.call(o, p);
      o._hPanel.style.zIndex = EUiLayer.Editor;
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
         if(RClass.isClass(s, MDuiFocus)){
            s.doBlur();
         }
      }
   }
   MO.FDuiEditor_panel = function FDuiEditor_panel(p){
      var o = this;
      if(p == EPanel.Edit){
         return o._hEdit;
      }else if(p == EPanel.Focus){
         return o._hEdit;
      }
      return o.__base.FDuiControl.panel.call(o, p);
   }
   MO.FDuiEditor_linkControl = function FDuiEditor_linkControl(c){
      var o = this;
      o._source = c;
   }
   MO.FDuiEditor_editBegin = function FDuiEditor_editBegin(){
      var o = this;
      var s = o._source;
      MO.Logger.debug(o, 'Editor begin. (control={1})', RClass.dump(s));
      if(o.lsnEditCancel){
         o.lsnEditCancel.process(o);
      }
      s._editor = o;
      o._statusEditing = true;
   }
   MO.FDuiEditor_editCancel = function FDuiEditor_editCancel(){
      var o = this;
      var s = o._source;
      MO.Logger.debug(o, 'Editor cancel. (control={1})', RClass.dump(s));
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
}
with(MO){
   MO.FDuiFile = function FDuiFile(o){
      o = RClass.inherits(this, o, FDuiEditControl, MListenerDataChanged);
      o._inputSize       = RClass.register(o, new APtySize2('_inputSize'));
      o._unit            = RClass.register(o, new APtyString('_unit'));
      o._styleValuePanel = RClass.register(o, new AStyle('_styleValuePanel'));
      o._styleInputPanel = RClass.register(o, new AStyle('_styleInputPanel'));
      o._styleInput      = RClass.register(o, new AStyle('_styleInput'));
      o._styleFile       = RClass.register(o, new AStyle('_styleFile'));
      o._styleBrowser    = RClass.register(o, new AStyle('_styleBrowser'));
      o._hValueForm      = null;
      o._hValueLine      = null;
      o._hInputPanel     = null;
      o._hInput          = null;
      o.onBuildEditValue = FDuiFile_onBuildEditValue;
      o.onFileChange     = RClass.register(o, new AEventChange('onFileChange'), FDuiFile_onFileChange);
      o.construct        = FDuiFile_construct;
      o.formatDisplay    = FDuiFile_formatDisplay;
      o.formatValue      = FDuiFile_formatValue;
      o.get              = FDuiFile_get;
      o.set              = FDuiFile_set;
      o.refreshValue     = FDuiFile_refreshValue;
      return o;
   }
   MO.FDuiFile_onBuildEditValue = function FDuiFile_onBuildEditValue(p){
      var o = this;
      var hp = o._hValuePanel;
      hp.className = o.styleName('ValuePanel');
      var hf = o._hValueForm = RBuilder.appendTable(hp);
      hf.width = '100%';
      var hl = o._hValueLine = RBuilder.appendTableRow(hf);
      o._hChangePanel = RBuilder.appendTableCell(hl);
      o.onBuildEditChange(p);
      var hInputPanel = o._hInputPanel = RBuilder.appendTableCell(hl,  o.styleName('InputPanel'));
      var he = o._hInputEdit = RBuilder.appendEdit(hInputPanel, o.styleName('Input'));
      var hFile = o._hInput = RBuilder.appendFile(hInputPanel, o.styleName('File'));
      o.attachEvent('onFileChange', hFile);
      var hBrowserPanel = o._hBrowserPanel = RBuilder.appendTableCell(o._hEditLine);
      hBrowserPanel.style.paddingLeft = '4px';
      var hBrowser = o._hBrowser = RBuilder.appendButton(hBrowserPanel, o.styleName('Browser'));
      hBrowser.value = '浏览...';
      RHtml.setSize(hInputPanel, o._inputSize);
      RHtml.setSize(hFile, o._inputSize);
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
      o._inputSize = new SSize2(120, 0);
   }
   MO.FDuiFile_formatDisplay = function FDuiFile_formatDisplay(p){
      var o = this;
      var r = RString.nvl(p);
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
      o._hInput.value = RString.nvl(p);
   }
   MO.FDuiFile_refreshValue = function FDuiFile_refreshValue(){
      var o = this;
      o.processDataChangedListener(o);
   }
}
MO.FDuiForm = function FDuiForm(o){
   o = MO.Class.inherits(this, o, MO.FDuiLayout, MO.MUiDataContainer, MO.MDuiDescribeFrame);
   o.construct          = MO.FDuiForm_construct;
   o.dispose            = MO.FDuiForm_dispose;
   return o;
}
MO.FDuiForm_construct = function FDuiForm_construct(){
   var o = this;
   o.__base.FDuiLayout.construct.call(o);
}
MO.FDuiForm_dispose = function FDuiForm_dispose(){
   var o = this;
   o._hEdit = MO.Window.Html.free(o._hEdit);
   o._hDrop = MO.Window.Html.free(o._hDrop);
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
      if(RClass.isClass(c, FDataAction)){
         return true;
      }
   }
   return false;
}
MO.FDuiFrame = function FDuiFrame(o){
   o = MO.Class.inherits(this, o, MO.FDuiLayout);
   return o;
}
with(MO){
   MO.FDuiIconPicker = function FDuiIconPicker(o){
      o = RClass.inherits(this, o, FDuiEdit);
      return o;
   }
   MO.FDuiIconPicker_onEditKeyDown = function FDuiIconPicker_onEditKeyDown(e){
      var o = this;
      o.base.FDuiEditControl.onEditKeyDown.call(o,e);
      o.hEditIcon.src = RRes.iconPath(RString.nvl(o.text(), o.styleIcon("Default")));
   }
   MO.FDuiIconPicker_onEditKeyPress = function FDuiIconPicker_onEditKeyPress(e){
      var o = this;
      o.base.FDuiEditControl.onEditKeyPress.call(o, e);
      if(o.editCase){
         RKey.fixCase(e, o.editCase);
      }
   }
   MO.FDuiIconPicker_onBuildEdit = function FDuiIconPicker_onBuildEdit(b){
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
   MO.FDuiIconPicker_setText = function FDuiIconPicker_setText(t){
      var o = this;
      o.base.FDuiEditControl.setText.call(o, t);
      o.hEditIcon.src = RResource.iconPath(RString.nvl(o.text(), o.styleIcon("Default")));
   }
   MO.FDuiIconPicker_dispose = function FDuiIconPicker_dispose(){
      var o = this;
      o.base.FDuiEditControl.dispose.call(o);
      o.hEditIcon = null;
      o.hEdit = null;
   }
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
with(MO){
   MO.FDuiLayout = function FDuiLayout(o){
      o = RClass.inherits(this, o, FDuiContainer);
      o._styleForm      = RClass.register(o, new AStyle('_styleForm', 'Form'));
      o._lastSplit      = null;
      o._hPanelForm     = null;
      o._hContainer     = null;
      o._hPanelTable    = null;
      o._hPanelLine     = null;
      o.onBuildPanel    = FDuiLayout_onBuildPanel;
      o.onDesignBegin   = FDuiLayout_onDesignBegin;
      o.onDesignEnd     = FDuiLayout_onDesignEnd;
      o.oeDesign        = FDuiLayout_oeDesign;
      o.oeResize        = FDuiLayout_oeResize;
      o.oeRefresh       = FDuiLayout_oeRefresh;
      o.insertPosition  = FDuiLayout_insertPosition;
      o.moveChild       = FDuiLayout_moveChild;
      o.innerAppendLine = FDuiLayout_innerAppendLine;
      o.appendChild     = FDuiLayout_appendChild;
      o.resize          = FDuiLayout_resize;
      o.dispose         = FDuiLayout_dispose;
      return o;
   }
   MO.FDuiLayout_onBuildPanel = function FDuiLayout_onBuildPanel(event){
      var o = this;
      var h = o._hPanel = o._hPanelForm = RBuilder.createTable(event, o.styleName('Form'), null, 0, 1);
      if(o._layoutCd == EUiLayout.Design){
         var hr = RBuilder.appendTableRow(h);
         var hc = RBuilder.appendTableCell(hr);
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
   MO.FDuiLayout_insertPosition = function FDuiLayout_insertPosition(cf, ct, idx, copy){
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
   MO.FDuiLayout_moveChild = function FDuiLayout_moveChild(cf, ct, pos, copy){
      if(!(cf && ct && pos) || (cf == ct)){
         return;
      }
      var o = this;
      var hPanel = o._hPanel;
      var moved = false;
      var cfh = RClass.isClass(cf, MDuiHorizontal);
      var hCfTd = RHtml.parent(cf._hPanel, 'TD');
      var hCfTab = RHtml.parent(cf._hPanel, 'TABLE');
      var cth = RClass.isClass(ct, MDuiHorizontal);
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
   MO.FDuiLayout_innerAppendLine = function FDuiLayout_innerAppendLine(){
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
   MO.FDuiLayout_appendChild = function FDuiLayout_appendChild(control){
      var o = this;
      if(o._layoutCd == EUiLayout.Design){
         if(!o._hPanelLine){
            o.innerAppendLine();
         }
         if(RClass.isClass(control, MDuiHorizontal)){
            if(o._hPanelTable.rows[0].cells.length == 0){
               o._hContainer.insertBefore(control._hPanel, o._hPanelTable);
            }else{
               o._hContainer.appendChild(control._hPanel);
               o.innerAppendLine();
            }
            return;
         }
         var hCell = RBuilder.appendTableCell(o._hPanelLine);
         if(!RClass.isClass(control, FDuiLayout)){
            control._hPanelLine = o._hPanelTable;
         }
         hCell.appendChild(control._hPanel);
         control._hLayoutCell = hCell;
         if((control.wrapCd() == EUiWrap.NextLine) && (o.controls.last() != control)){
            o.innerAppendLine();
         }
      }else{
         control._hPanel.style.paddingTop = 2;
         control._hPanel.style.paddingBottom = 2;
         if(control.dockCd() == EUiDock.Fill){
            var hCell = RBuilder.appendTableRowCell(o._hPanelForm);
            hCell.appendChild(control._hPanel);
         }else if(control._sizeCd == EUiSize.Fill){
            var hCell = RBuilder.appendTableRowCell(o._hPanelForm);
            hCell.appendChild(control._hPanel);
         }else if(RSet.contains(control._sizeCd, EUiSize.Horizontal) || '100%' == control.width){
            if(RClass.isClass(control, FDuiSplit)){
               o._lastSplit = control;
            }
            var hr = RBuilder.appendTableRow(o._hPanelForm);
            var hc = RBuilder.appendTableCell(hr);
            hc.vAlign = 'top';
            hc.appendChild(control._hPanel);
            control._hLayoutRow = hr;
            o._hPanelLast = hc;
            if(!RSet.contains(control._sizeCd, EUiSize.Vertical)){
               hc.height = 1;
            }else if(control.height){
               hc.height = control.height;
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
            control._hLayoutRow = o._hPanelLine;
            o._hPanelLast = hc;
            hc.appendChild(control._hPanel);
            control._hLayoutCell = hc;
            if(control.wrapCd() == EUiWrap.NextLine){
               o._hPanelLine = null;
            }
         }
      }
   }
   MO.FDuiLayout_resize = function FDuiLayout_resize(){
      var o = this;
      var cs = o._components;
      if(cs){
         var ha = false;
         var c = cs.count();
         for(var n = 0; n < c; n++){
            var p = o._components.at(n);
            if(RClass.isClass(p, FDuiTable) || RClass.isClass(p, FDuiPageControl)){
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
}
with(MO){
   MO.FDuiLayoutHorizontal = function FDuiLayoutHorizontal(o){
      o = RClass.inherits(this, o, FDuiContainer);
      o._stylePanel  = RClass.register(o, new AStyle('_stylePanel'));
      o._hLine       = null;
      o.onBuildPanel = FDuiLayoutHorizontal_onBuildPanel;
      o.onBuild      = FDuiLayoutHorizontal_onBuild;
      o.appendChild  = FDuiLayoutHorizontal_appendChild;
      o.dispose      = FDuiLayoutHorizontal_dispose;
      return o;
   }
   MO.FDuiLayoutHorizontal_onBuildPanel = function FDuiLayoutHorizontal_onBuildPanel(event){
      var o = this;
      o._hPanel = RBuilder.createTable(event, o.styleName('Panel'));
   }
   MO.FDuiLayoutHorizontal_onBuild = function FDuiLayoutHorizontal_onBuild(event){
      var o = this;
      o.__base.FDuiContainer.onBuild.call(o, event)
      o._hLine = RBuilder.appendTableRow(o._hPanel);
   }
   MO.FDuiLayoutHorizontal_appendChild = function FDuiLayoutHorizontal_appendChild(control){
      var o = this;
      var hCell = RBuilder.appendTableCell(o._hLine);
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
      o._hLine = RHtml.free(o._hLine);
      o.__base.FDuiContainer.dispose.call(o);
   }
}
with(MO){
   MO.FDuiLayoutVertical = function FDuiLayoutVertical(o){
      o = RClass.inherits(this, o, FDuiContainer);
      o._stylePanel  = RClass.register(o, new AStyle('_stylePanel'));
      o._hLine       = null;
      o.onBuildPanel = FDuiLayoutVertical_onBuildPanel;
      o.appendChild  = FDuiLayoutVertical_appendChild;
      o.dispose      = FDuiLayoutVertical_dispose;
      return o;
   }
   MO.FDuiLayoutVertical_onBuildPanel = function FDuiLayoutVertical_onBuildPanel(event){
      var o = this;
      o._hPanel = RBuilder.createTable(event, o.styleName('Panel'));
   }
   MO.FDuiLayoutVertical_appendChild = function FDuiLayoutVertical_appendChild(control){
      var o = this;
      var hCell = RBuilder.appendTableRowCell(o._hPanel);
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
}
with(MO){
   MO.FDuiListBox = function FDuiListBox(o){
      o = RClass.inherits(this, o, FDuiContainer, MDuiHorizontal, MListenerClick);
      o._sizeCd      = EUiSize.Horizontal
      o._stylePanel  = RClass.register(o, new AStyle('_stylePanel'));
      o._hForm       = null;
      o.onBuildPanel = FDuiListBox_onBuildPanel;
      o.createItem   = FDuiListBox_createItem;
      o.appendChild  = FDuiListBox_appendChild;
      o.clickItem    = FDuiListBox_clickItem;
      o.clear        = FDuiListBox_clear;
      o.dispose      = FDuiListBox_dispose;
      return o;
   }
   MO.FDuiListBox_onBuildPanel = function FDuiListBox_onBuildPanel(p){
      var o = this;
      o._hPanel = RBuilder.createTable(p, o.styleName('Panel'));
   }
   MO.FDuiListBox_createItem = function FDuiListBox_createItem(icon, label){
      var o = this;
      var item = RClass.create(FDuiListItem);
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
            if(RClass.isClass(component, FDuiListItem)){
               component.setChecked(component == item);
            }
         }
      }
      var event = new SEvent(o);
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
            if(RClass.isClass(component, FDuiListItem)){
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
}
with(MO){
   MO.FDuiListItem = function FDuiListItem(o){
      o = RClass.inherits(this, o, FDuiControl);
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
      o.onBuildPanel    = FDuiListItem_onBuildPanel;
      o.onBuild         = FDuiListItem_onBuild;
      o.onEnter         = FDuiListItem_onEnter;
      o.onLeave         = FDuiListItem_onLeave;
      o.onClick         = RClass.register(o, new AEventClick('onClick'), FDuiListItem_onClick);
      o.label           = FDuiListItem_label;
      o.setLabel        = FDuiListItem_setLabel;
      o.setChecked      = FDuiListItem_setChecked;
      o.dispose         = FDuiListItem_dispose;
      return o;
   }
   MO.FDuiListItem_onBuildPanel = function FDuiListItem_onBuildPanel(p){
      var o = this;
      o._hPanel = RBuilder.createTableRow(p, o.styleName('Normal'));
   }
   MO.FDuiListItem_onBuild = function FDuiListItem_onBuild(p){
      var o = this;
      o.__base.FDuiControl.onBuild.call(o, p);
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
   MO.FDuiListItem_onEnter = function FDuiListItem_onEnter(){
      var o = this;
      o.__base.FDuiControl.onEnter.call(o);
      o._hPanel.className = RBoolean.parse(o._checked) ? o.styleName('Select') : o.styleName('Hover');
   }
   MO.FDuiListItem_onLeave = function FDuiListItem_onLeave(){
      var o = this;
      o._hPanel.className = RBoolean.parse(o._checked) ? o.styleName('Select') : o.styleName('Normal');
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
      o._hLabel.innerHTML = RString.nvl(p);
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
      o._hPanel = RHtml.free(o._hPanel);
      o._hIconPanel = RHtml.free(o._hIconPanel);
      o._hIcon = RHtml.free(o._hIcon);
      o._hLabel = RHtml.free(o._hLabel);
      o.__base.FDuiControl.dispose.call(o);
   }
}
with(MO){
   MO.FDuiListView = function FDuiListView(o){
      o = RClass.inherits(this, o, FDuiContainer, MDuiHorizontal, MListenerClick, MListenerDoubleClick);
      o._sizeCd           = EUiSize.Horizontal
      o._stylePanel       = RClass.register(o, new AStyle('_stylePanel'));
      o._focusItem        = null;
      o._itemPool         = null;
      o._hForm            = null;
      o.onBuildPanel      = FDuiListView_onBuildPanel;
      o.onBuild           = FDuiListView_onBuild;
      o.onClick           = RClass.register(o, new AEventClick('onClick'), FDuiListView_onClick);
      o.construct         = FDuiListView_construct;
      o.focusItem         = FDuiListView_focusItem;
      o.createItem        = FDuiListView_createItem;
      o.appendChild       = FDuiListView_appendChild;
      o.selectItem        = FDuiListView_selectItem;
      o.doClickItem       = FDuiListView_doClickItem;
      o.doDoubleClickItem = FDuiListView_doDoubleClickItem;
      o.clear             = FDuiListView_clear;
      o.dispose           = FDuiListView_dispose;
      return o;
   }
   MO.FDuiListView_onBuildPanel = function FDuiListView_onBuildPanel(p){
      var o = this;
      o._hPanel = RBuilder.createDiv(p, o.styleName('Panel'));
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
      o._itemPool = RClass.create(FObjectPool);
   }
   MO.FDuiListView_focusItem = function FDuiListView_focusItem(){
      return this._focusItem;
   }
   MO.FDuiListView_createItem = function FDuiListView_createItem(clazz, pi, pl){
      var o = this;
      var item = o._itemPool.alloc();
      if(!item){
         if(clazz){
            item = RClass.create(clazz);
         }else{
            item = RClass.create(FDuiListViewItem);
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
            if(RClass.isClass(component, FDuiListViewItem)){
               component.setChecked(component == item);
            }
         }
      }
      o._focusItem = item;
   }
   MO.FDuiListView_doClickItem = function FDuiListView_doClickItem(item){
      var o = this;
      o.selectItem(item);
      var event = new SClickEvent(o);
      event.item = item;
      o.processClickListener(event);
      event.dispose();
   }
   MO.FDuiListView_doDoubleClickItem = function FDuiListView_doDoubleClickItem(item){
      var o = this;
      o.selectItem(item);
      var event = new SClickEvent(o);
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
            if(RClass.isClass(m, FDuiListViewItem)){
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
}
with(MO){
   MO.FDuiListViewItem = function FDuiListViewItem(o){
      o = RClass.inherits(this, o, FDuiControl);
      o._stylePanel     = RClass.register(o, new AStyle('_stylePanel'));
      o._styleNormal    = RClass.register(o, new AStyle('_styleNormal'));
      o._styleHover     = RClass.register(o, new AStyle('_styleHover'));
      o._styleSelect    = RClass.register(o, new AStyle('_styleSelect'));
      o._styleForm      = RClass.register(o, new AStyle('_styleForm'));
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
      o.onBuildPanel    = FDuiListViewItem_onBuildPanel;
      o.onBuild         = FDuiListViewItem_onBuild;
      o.onEnter         = FDuiListViewItem_onEnter;
      o.onLeave         = FDuiListViewItem_onLeave;
      o.onClick         = RClass.register(o, new AEventClick('onClick'), FDuiListViewItem_onClick);
      o.onDoubleClick   = RClass.register(o, new AEventDoubleClick('onDoubleClick'), FDuiListViewItem_onDoubleClick);
      o.label           = FDuiListViewItem_label;
      o.setLabel        = FDuiListViewItem_setLabel;
      o.setChecked      = FDuiListViewItem_setChecked;
      o.dispose         = FDuiListViewItem_dispose;
      return o;
   }
   MO.FDuiListViewItem_onBuildPanel = function FDuiListViewItem_onBuildPanel(p){
      var o = this;
      o._hPanel = RBuilder.createDiv(p, o.styleName('Panel'));
   }
   MO.FDuiListViewItem_onBuild = function FDuiListViewItem_onBuild(p){
      var o = this;
      o.__base.FDuiControl.onBuild.call(o, p);
      var hPanel = o._hPanel;
      var hBorder = o._hBorder = RBuilder.appendDiv(hPanel, o.styleName('Normal'));
      var hTable = o._hForm = RBuilder.appendTable(hBorder, o.styleName('Form'));
      var hLine1 = o._hLine1 = RBuilder.appendTableRowCell(hTable)
      var hLine2 = o._hLine2 = RBuilder.appendTableRowCell(hTable)
      hLine2.height = o._contentHeight;
      var hContentForm = o._hContentForm = RBuilder.appendTable(hLine2, o.styleName('Content'));
      var hContentLine = o._hContentLine = RBuilder.appendTableRow(hContentForm);
      o._hIconPanel = RBuilder.appendTableCell(hContentLine, o.styleName('IconPanel'))
      o._hIcon = RBuilder.appendIcon(o._hIconPanel, o.styleName('Icon'), RString.nvl(o._icon, 'tools.select'));
      RHtml.displaySet(o._hIcon, false);
      o._hLabel = RBuilder.appendTableCell(hContentLine, o.styleName('Label'));
      if(o._label){
         o.setLabel(o._label);
      }
      o.attachEvent('onClick', hPanel);
      o.attachEvent('onDoubleClick', hPanel);
   }
   MO.FDuiListViewItem_onEnter = function FDuiListViewItem_onEnter(){
      var o = this;
      o.__base.FDuiControl.onEnter.call(o);
      o._hBorder.className = RBoolean.parse(o._checked) ? o.styleName('Select') : o.styleName('Hover');
   }
   MO.FDuiListViewItem_onLeave = function FDuiListViewItem_onLeave(){
      var o = this;
      o._hBorder.className = RBoolean.parse(o._checked) ? o.styleName('Select') : o.styleName('Normal');
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
      o._hLabel.innerHTML = RString.nvl(p);
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
      o._hPanel = RHtml.free(o._hPanel);
      o._hBorder = RHtml.free(o._hBorder);
      o._hForm = RHtml.free(o._hForm);
      o._hLine1 = RHtml.free(o._hLine1);
      o._hLine2 = RHtml.free(o._hLine2);
      o._hContentForm = RHtml.free(o._hContentForm);
      o._hContentLine = RHtml.free(o._hContentLine);
      o._hIconPanel = RHtml.free(o._hIconPanel);
      o._hIcon = RHtml.free(o._hIcon);
      o._hLabel = RHtml.free(o._hLabel);
      o.__base.FDuiControl.dispose.call(o);
   }
}
with(MO){
   MO.FDuiMemo = function FDuiMemo(o){
      o = RClass.inherits(this, o, FDuiEditControl, MUiPropertyEdit, MListenerDataChanged);
      o._inputSize       = RClass.register(o, new APtySize2('_inputSize'));
      o._styleValuePanel = RClass.register(o, new AStyle('_styleValuePanel'));
      o._styleInputPanel = RClass.register(o, new AStyle('_styleInputPanel'));
      o._styleInput      = RClass.register(o, new AStyle('_styleInput'));
      o._hValueForm      = null;
      o._hValueLine      = null;
      o._hInputPanel     = null;
      o._hInput          = null;
      o.onBuildEditValue = FDuiMemo_onBuildEditValue;
      o.onInputEdit      = RClass.register(o, new AEventInputChanged('onInputEdit'), FDuiMemo_onInputEdit);
      o.construct        = FDuiMemo_construct;
      o.formatDisplay    = FDuiMemo_formatDisplay;
      o.formatValue      = FDuiMemo_formatValue;
      o.get              = FDuiMemo_get;
      o.set              = FDuiMemo_set;
      o.refreshValue     = FDuiMemo_refreshValue;
      return o;
   }
   MO.FDuiMemo_onBuildEditValue = function FDuiMemo_onBuildEditValue(p){
      var o = this;
      var hp = o._hValuePanel;
      hp.className = o.styleName('ValuePanel');
      var hf = o._hValueForm = RBuilder.appendTable(hp);
      hf.width = '100%';
      var hl = o._hValueLine = RBuilder.appendTableRow(hf);
      o._hChangePanel = RBuilder.appendTableCell(hl);
      o.onBuildEditChange(p);
      var hInputPanel = o._hInputPanel = RBuilder.appendTableCell(hl);
      var hInput = o._hInput = RBuilder.append(hInputPanel, 'TEXTAREA', o.styleName('Input'));
      hInput.wrap = 'off';
      o.attachEvent('onInputEdit', hInput, o.onInputEdit);
      RHtml.setSize(hInputPanel, o._inputSize);
      if(o._editLength){
         hInput.maxLength = o._editLength;
      }
   }
   MO.FDuiMemo_onInputEdit = function FDuiMemo_onInputEdit(p){
      var o = this;
      var v = o._hInput.value;
      o.refreshValue();
   }
   MO.FDuiMemo_construct = function FDuiMemo_construct(){
      var o = this;
      o.__base.FDuiEditControl.construct.call(o);
      o._inputSize = new SSize2(120, 0);
   }
   MO.FDuiMemo_formatDisplay = function FDuiMemo_formatDisplay(value){
      var o = this;
      var text = RString.nvl(value);
      o._dataDisplay = text;
      return text;
   }
   MO.FDuiMemo_formatValue = function FDuiMemo_formatValue(value){
      return value;
   }
   MO.FDuiMemo_get = function FDuiMemo_get(){
      var o = this;
      o.__base.FDuiEditControl.get.call(o);
      var value = o._hInput.value;
      return value;
   }
   MO.FDuiMemo_set = function FDuiMemo_set(value){
      var o = this;
      o.__base.FDuiEditControl.set.call(o, value);
      o._hInput.value = RString.nvl(value);
   }
   MO.FDuiMemo_refreshValue = function FDuiMemo_refreshValue(){
      var o = this;
      o.processDataChangedListener(o);
   }
}
with(MO){
   MO.FDuiNumber = function FDuiNumber(o){
      o = RClass.inherits(this, o, FDuiEditControl, MListenerDataChanged, MUiPropertyNumber);
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
      o.onBuildEditValue  = FDuiNumber_onBuildEditValue;
      o.onInputKeyPress   = RClass.register(o, new AEventKeyPress('onInputKeyPress'), FDuiNumber_onInputKeyPress);
      o.onInputChanged    = RClass.register(o, new AEventInputChanged('onInputChanged'), FDuiNumber_onInputChanged);
      o.construct         = FDuiNumber_construct;
      o.formatDisplay     = FDuiNumber_formatDisplay;
      o.formatValue       = FDuiNumber_formatValue;
      o.get               = FDuiNumber_get;
      o.set               = FDuiNumber_set;
      return o;
   }
   MO.FDuiNumber_onBuildEditValue = function FDuiNumber_onBuildEditValue(p){
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
   MO.FDuiNumber_onInputKeyPress = function FDuiNumber_onInputKeyPress(p){
      var o = this;
      var c = p.keyCode;
      if(!RKeyboard.isFloatKey(c)){
         p.cancel();
      }
   }
   MO.FDuiNumber_onInputChanged = function FDuiNumber_onInputChanged(p){
      var o = this;
      o.processDataChangedListener(o);
   }
   MO.FDuiNumber_construct = function FDuiNumber_construct(){
      var o = this;
      o.__base.FDuiEditControl.construct.call(o);
      o._editSize.set(100, 20);
      o._inputSize = new SSize2(80, 0);
   }
   MO.FDuiNumber_formatDisplay = function FDuiNumber_formatDisplay(p){
      var o = this;
      var r = o._dataDisplay = RFloat.format(p, 0, null, o._valuePrecision, null);
      return r;
   }
   MO.FDuiNumber_formatValue = function FDuiNumber_formatValue(p){
      return p;
   }
   MO.FDuiNumber_get = function FDuiNumber_get(p){
      var o = this;
      var r = o.__base.FDuiEditControl.get.call(o, p);
      var h = o._hInput;
      if(h){
         r = o.formatValue(h.value);
      }
      return r;
   }
   MO.FDuiNumber_set = function FDuiNumber_set(p){
      var o = this;
      o.__base.FDuiEditControl.set.call(o, p);
      var v = RString.nvl(p, '0');
      o._innerOriginValue = v;
      o._innerDataValue = v;
      var h = o._hInput;
      if(h){
         h.value = o.formatDisplay(p);
      }
      o.changeSet(false);
   }
   MO.FDuiNumber_onDataKeyDown = function FDuiNumber_onDataKeyDown(s, e){
      var o = this;
      o.__base.FDuiEditControl.onDataKeyDown.call(o, s, e);
      if(o.editCase){
         RKey.fixCase(e, o.editCase);
      }
   }
   MO.FDuiNumber_setText = function FDuiNumber_setText(t){
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
}
with(MO){
   MO.FDuiNumber2 = function FDuiNumber2(o){
      o = RClass.inherits(this, o, FDuiEditControl, MListenerDataChanged);
      o._inputSize       = RClass.register(o, new APtySize2('_inputSize'));
      o._styleInputPanel = RClass.register(o, new AStyle('_styleInputPanel'));
      o._styleInput      = RClass.register(o, new AStyle('_styleInput'));
      o._innerOriginValue = null;
      o._innerDataValue   = null;
      o._hInput          = null;
      o.onBuildEditInput  = FDuiNumber3_onBuildEditInput;
      o.onBuildEditValue = FDuiNumber2_onBuildEditValue;
      o.onInputKeyPress   = RClass.register(o, new AEventKeyPress('onInputKeyPress'), FDuiNumber2_onInputKeyPress);
      o.onInputChanged    = RClass.register(o, new AEventInputChanged('onInputChanged'), FDuiNumber2_onInputChanged);
      o.construct        = FDuiNumber2_construct;
      o.get              = FDuiNumber2_get;
      o.set              = FDuiNumber2_set;
      return o;
   }
   MO.FDuiNumber2_oeDataLoad = function FDuiNumber2_oeDataLoad(p){
      var o = this;
      alert(p);
      return EEventStatus.Stop;
   }
   MO.FDuiNumber2_oeDataSave = function FDuiNumber2_oeDataSave(p){
      var o = this;
      return EEventStatus.Stop;
   }
   MO.FDuiNumber3_onBuildEditInput = function FDuiNumber3_onBuildEditInput(p, h){
      var o = this;
      o.attachEvent('onInputKeyPress', h, o.onInputKeyPress);
      o.attachEvent('onInputChanged', h, o.onInputChanged);
   }
   MO.FDuiNumber2_onBuildEditValue = function FDuiNumber2_onBuildEditValue(event){
      var o = this;
      var h = o._hValuePanel;
      h.className = o.styleName('InputPanel');
      var hf = o._hInputForm = RBuilder.appendTable(h);
      var hr = RBuilder.appendTableRow(hf);
      var hCell = RBuilder.appendTableCell(hr);
      hCell.style.borderRight = '1px solid #666666';
      var hInput = o._hInput1 = RBuilder.appendEdit(hCell, o.styleName('Input'));
      o.onBuildEditInput(event, hInput)
      var hCell = RBuilder.appendTableCell(hr);
      hCell.style.borderLeft = '1px solid #999999';
      var hInput = o._hInput2 = RBuilder.appendEdit(hCell, o.styleName('Input'));
      o.onBuildEditInput(event, hInput)
   }
   MO.FDuiNumber2_onInputKeyPress = function FDuiNumber2_onInputKeyPress(p){
      var o = this;
      var c = p.keyCode;
      if(!EKeyCode.floatCodes[c]){
         p.cancel();
      }
   }
   MO.FDuiNumber2_onInputChanged = function FDuiNumber2_onInputChanged(p){
      var o = this;
      o.processDataChangedListener(o);
   }
   MO.FDuiNumber2_construct = function FDuiNumber2_construct(){
      var o = this;
      o.__base.FDuiEditControl.construct.call(o);
      o._inputSize = new SSize2(120, 0);
      o._innerOriginValue = new SPoint2();
      o._innerDataValue = new SPoint2();
   }
   MO.FDuiNumber2_get = function FDuiNumber2_get(value){
      var o = this;
      o.__base.FDuiEditControl.get.call(o, value);
      var dataValue = o._innerDataValue;
      var hInput = o._hInput1;
      if(hInput){
         dataValue.x = RFloat.parse(hInput.value);
      }
      var hInput = o._hInput2;
      if(hInput){
         dataValue.y = RFloat.parse(hInput.value);
      }
      return dataValue;
   }
   MO.FDuiNumber2_set = function FDuiNumber2_set(value){
      var o = this;
      o.__base.FDuiEditControl.set.call(o, value);
      var originValue = o._innerOriginValue;
      var vd = o._innerDataValue;
      if(arguments.length == 1){
         var value = arguments[0];
         if(value.constructor == SPoint2){
            originValue.assign(value);
            vd.assign(value);
         }else if(value.constructor == SSize2){
            originValue.set(value.width, value.height);
            vd.set(value.width, value.height);
         }else{
            throw new TError('Invalid value format.');
         }
      }else if(arguments.length == 2){
         originValue.set(arguments[0], arguments[1]);
         vd.assign(originValue);
      }else{
         throw new TError('Invalid value format.');
      }
      var hInput = o._hInput1;
      if(hInput){
         hInput.value = RFloat.format(vd.x, 0, null, 2, null);
      }
      var hInput = o._hInput2;
      if(hInput){
         hInput.value = RFloat.format(vd.y, 0, null, 2, null);
      }
      o.changeSet(false);
   }
   MO.FDuiNumber2_onDataKeyDown = function FDuiNumber2_onDataKeyDown(s, e){
      var o = this;
      o.__base.FDuiEditControl.onDataKeyDown.call(o, s, e);
      if(o.editCase){
         RKey.fixCase(e, o.editCase);
      }
   }
   MO.FDuiNumber2_formatValue = function FDuiNumber2_formatValue(v){
      var o = this;
      var r = RString.nvl(v);
      if(ECase.Upper == o.editCase){
         r = RString.toUpper(r);
      }else if(ECase.Lower == o.editCase){
         r = RString.toLower(r);
      }
      return r;
   }
   MO.FDuiNumber2_setText = function FDuiNumber2_setText(t){
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
   MO.FDuiNumber2_validText = function FDuiNumber2_validText(t){
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
   MO.FDuiNumber2_findEditor = function FDuiNumber2_findEditor(){
      var o = this;
      if(o.editComplete){
         var de = o.editor;
         if(!de){
            o.dsControl = o.topControl(MDataset);
            if(o.dsControl){
               de = o.editor = RConsole.find(FDuiNumber2Console).focus(o, FDuiNumber2Editor);
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
}
with(MO){
   MO.FDuiNumber3 = function FDuiNumber3(o){
      o = RClass.inherits(this, o, FDuiEditControl, MListenerDataChanged);
      o._inputSize        = RClass.register(o, new APtySize2('_inputSize'));
      o._styleValuePanel  = RClass.register(o, new AStyle('_styleValuePanel'));
      o._styleInputPanel  = RClass.register(o, new AStyle('_styleInputPanel'));
      o._styleInput       = RClass.register(o, new AStyle('_styleInput'));
      o._innerOriginValue = null;
      o._innerDataValue   = null;
      o._hInput           = null;
      o.onBuildEditInput  = FDuiNumber3_onBuildEditInput;
      o.onBuildEditValue  = FDuiNumber3_onBuildEditValue;
      o.onInputKeyPress   = RClass.register(o, new AEventKeyPress('onInputKeyPress'), FDuiNumber3_onInputKeyPress);
      o.onInputChanged    = RClass.register(o, new AEventInputChanged('onInputChanged'), FDuiNumber3_onInputChanged);
      o.construct         = FDuiNumber3_construct;
      o.get               = FDuiNumber3_get;
      o.set               = FDuiNumber3_set;
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
      var hf = o._hValueForm = RBuilder.appendTable(h);
      var hr = RBuilder.appendTableRow(hf);
      o._hChangePanel = RBuilder.appendTableCell(hr);
      o.onBuildEditChange(p);
      var hCell = RBuilder.appendTableCell(hr, o.styleName('InputPanel'));
      hCell.style.borderRight = '1px solid #666666';
      var hInput = o._hInput1 = RBuilder.appendEdit(hCell, o.styleName('Input'));
      o.onBuildEditInput(p, hInput)
      var hCell = RBuilder.appendTableCell(hr, o.styleName('InputPanel'));
      hCell.style.borderLeft = '1px solid #999999';
      hCell.style.borderRight = '1px solid #666666';
      var hInput = o._hInput2 = RBuilder.appendEdit(hCell, o.styleName('Input'));
      o.onBuildEditInput(p, hInput)
      var hCell = RBuilder.appendTableCell(hr, o.styleName('InputPanel'));
      hCell.style.borderLeft = '1px solid #999999';
      var hInput = o._hInput3 = RBuilder.appendEdit(hCell, o.styleName('Input'));
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
      o._inputSize = new SSize2(120, 0);
      o._innerOriginValue = new SPoint3();
      o._innerDataValue = new SPoint3();
   }
   MO.FDuiNumber3_get = function FDuiNumber3_get(p){
      var o = this;
      o.__base.FDuiEditControl.get.call(o, p);
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
   MO.FDuiNumber3_set = function FDuiNumber3_set(p){
      var o = this;
      o.__base.FDuiEditControl.set.call(o, p);
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
   MO.FDuiNumber3_onDataKeyDown = function FDuiNumber3_onDataKeyDown(s, e){
      var o = this;
      o.__base.FDuiEditControl.onDataKeyDown.call(o, s, e);
      if(o.editCase){
         RKey.fixCase(e, o.editCase);
      }
   }
   MO.FDuiNumber3_formatValue = function FDuiNumber3_formatValue(v){
      var o = this;
      var r = RString.nvl(v);
      if(ECase.Upper == o.editCase){
         r = RString.toUpper(r);
      }else if(ECase.Lower == o.editCase){
         r = RString.toLower(r);
      }
      return r;
   }
   MO.FDuiNumber3_setText = function FDuiNumber3_setText(t){
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
}
with(MO){
   MO.FDuiNumber4 = function FDuiNumber4(o){
      o = RClass.inherits(this, o, FDuiEditControl);
      o._inputSize       = RClass.register(o, new APtySize2('_inputSize'));
      o._styleInputPanel = RClass.register(o, new AStyle('_styleInputPanel'));
      o._styleInput      = RClass.register(o, new AStyle('_styleInput'));
      o._hInput          = null;
      o.onBuildEditValue = FDuiNumber4_onBuildEditValue;
      o.construct        = FDuiNumber4_construct;
      o.get              = FDuiNumber4_get;
      o.set              = FDuiNumber4_set;
      return o;
   }
   MO.FDuiNumber4_oeDataLoad = function FDuiNumber4_oeDataLoad(p){
      var o = this;
      alert(p);
      return EEventStatus.Stop;
   }
   MO.FDuiNumber4_oeDataSave = function FDuiNumber4_oeDataSave(p){
      var o = this;
      return EEventStatus.Stop;
   }
   MO.FDuiNumber4_onBuildEditValue = function FDuiNumber4_onBuildEditValue(p){
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
   MO.FDuiNumber4_construct = function FDuiNumber4_construct(){
      var o = this;
      o.__base.FDuiEditControl.construct.call(o);
      o._inputSize = new SSize2(120, 0);
   }
   MO.FDuiNumber4_get = function FDuiNumber4_get(p){
      var o = this;
      var r = o.__base.FDuiEditControl.get.call(o, p);
      var h = o._hInput;
      if(h){
         r = h.value;
      }
      return r;
   }
   MO.FDuiNumber4_set = function FDuiNumber4_set(p){
      var o = this;
      o.__base.FDuiEditControl.set.call(o, p);
      var h = o._hInput;
      if(h){
         h.value = RString.nvl(p);
      }
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
      var r = RString.nvl(v);
      if(ECase.Upper == o.editCase){
         r = RString.toUpper(r);
      }else if(ECase.Lower == o.editCase){
         r = RString.toLower(r);
      }
      return r;
   }
   MO.FDuiNumber4_setText = function FDuiNumber4_setText(t){
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
}
with(MO){
   MO.FDuiPanel = function FDuiPanel(o){
      o = RClass.inherits(this, o, FDuiLayout, MDuiDesign, MDuiFocus);
      o._sizeCd      = EUiSize.Horizontal;
      o._stylePanel  = RClass.register(o, new AStyle('_stylePanel', 'Panel'));
      o._styleLabel  = RClass.register(o, new AStyle('_styleLabel', 'Label'));
      o._styleBody   = RClass.register(o, new AStyle('_styleBody', 'Body'));
      o._hImage      = null;
      o._imagePlus   = 'control.panel.plus';
      o._imageMinus  = 'control.panel.minus';
      o._statusBody  = true;
      o.onBuildPanel = FDuiPanel_onBuildPanel;
      o.onTitleClick = RClass.register(o, new AEventClick('onTitleClick'), FDuiPanel_onTitleClick);
      return o;
   }
   MO.FDuiPanel_onBuildPanel = function FDuiPanel_onBuildPanel(p){
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
   MO.FDuiPanel_onTitleClick = function FDuiPanel_onTitleClick(p){
      var o = this;
      var s = !o._statusBody;
      o._statusBody = s;
      o._hImage.src = RResource.iconPath(s ? o._imageMinus : o._imagePlus);
      RHtml.displaySet(o._hBody, s);
   }
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
   o.hImage.src = o.makeIconPath(o.guid, o.mime, o.networkCode) + '?' + RDate.format() + (++o.__seed);
   o.hImage.style.display = 'block';
}
MO.FDuiPicture_onBuildEdit = function FDuiPicture_onBuildEdit(b){
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
MO.FDuiPicture_construct = function FDuiPicture_construct(){
   var o = this;
   o.base.FEditControl.construct.call(o);
   o.attributes = new MO.TAttributes();
}
MO.FDuiPicture_makeIconPath = function FDuiPicture_makeIconPath(g, m, sc){
   var o = this;
   var s = o.recordCode + '/' + o.recordGuid + '/' + g + '.icon.' + m;
   return top.RContext.context('/svr/' + sc.toLowerCase() + '/sys/' + RString.toLower(s));
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
with(MO){
   MO.FDuiProgressBar = function FDuiProgressBar(o){
      o = RClass.inherits(this, o, FDuiControl);
      o._stylePanel  = RClass.register(o, new AStyle('_stylePanel'));
      o._rate        = 0;
      o._hForm       = null;
      o.onBuildPanel = FDuiProgressBar_onBuildPanel;
      o.onBuild      = FDuiProgressBar_onBuild;
      o.get          = FDuiProgressBar_get;
      o.set          = FDuiProgressBar_set;
      o.dispose      = FDuiProgressBar_dispose;
      return o;
   }
   MO.FDuiProgressBar_onBuildPanel = function FDuiProgressBar_onBuildPanel(event){
      var o = this;
      o._hPanel = RBuilder.createTable(event, o.styleName('Panel'));
   }
   MO.FDuiProgressBar_onBuild = function FDuiProgressBar_onBuild(event){
      var o = this;
      o.__base.FDuiControl.onBuild.call(o, event);
      var hLine = o._hLine = RBuilder.appendTableRow(o._hPanel);
      o.hProgress = RBuilder.appendTableCell(hLine);
      o.hEmpty = RBuilder.appendTableCell(hLine);
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
      o._hForm = RHtml.free(o._hForm);
      o.__base.FDuiControl.dispose.call(o);
   }
}
with(MO){
   MO.FDuiRadio = function FDuiRadio(o){
      o = RClass.inherits(this, o, FEditControl);
      o._groupName       = RClass.register(o, new APtyString('_groupName'));
      o._styleInput      = RClass.register(o, new AStyle('_styleInput', 'Input'));
      o._hInput          = null;
      o.onBuildEditValue = FDuiRadio_onBuildEditValue;
      return o;
   }
   MO.FDuiRadio_onBuildEditValue = function FDuiRadio_onBuildEditValue(p){
      var o = this;
      o._hInput = RBuilder.appendRadio(o._hValuePanel, o.styleName('Input'));
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
      var h = o.panel(EPanel.Edit);
      h.disabled = !o._editable;
      h.style.cursor = o._editable? 'hand':'normal';
   }
}
MO.FDuiSelect = function FDuiSelect(o){
   o = MO.Class.inherits(this, o, MO.FDuiEditControl, MO.MDuiContainer, MO.MUiPropertySelect);
   o._styleValuePanel      = MO.Class.register(o, new MO.AStyle('_styleValuePanel'));
   o._styleInput           = MO.Class.register(o, new MO.AStyle('_styleInput'));
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
   o.findItemByLabel       = MO.FDuiSelect_findItemByLabel;
   o.findItemByData        = MO.FDuiSelect_findItemByData;
   o.formatValue           = MO.FDuiSelect_formatValue;
   o.formatDisplay         = MO.FDuiSelect_formatDisplay;
   o.get                   = MO.FDuiSelect_get;
   o.set                   = MO.FDuiSelect_set;
   o.selectItem            = MO.FDuiSelect_selectItem;
   o.refreshValue          = MO.FDuiSelect_refreshValue;
   o.drop                  = MO.FDuiSelect_drop;
   o.dispose               = MO.FDuiSelect_dispose;
   return o;
}
MO.FDuiSelect_onBuildEditValue = function FDuiSelect_onBuildEditValue(p){
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
   o.attachEvent('onDoubleClick', he);
   o.attachEvent('onKeyDown', he);
   if(o._editLength){
      he.maxLength = o._editLength;
   }
   var hdp = o._hDropPanel = MO.Window.Builder.appendTableCell(hl);
   hdp.style.borderLeft = '1px solid #666666';
   o.onBuildEditDrop(p);
   var c = o._emptyItem = MO.Class.create(MO.FDuiSelectItem);
   c.build(p);
   o.push(c);
}
MO.FDuiSelect_onDropClick = function FDuiSelect_onDropClick(p){
   this.drop();
}
MO.FDuiSelect_onKeyDown = function FDuiSelect_onKeyDown(p){
   var o = this;
   var e = o._editor;
   if(e && e._statusEditing && (e._source == o)){
      e.onEditKeyDown(p);
      return;
   }
   if(p.keyCode == MO.EKeyCode.Down){
      o.drop();
   }
}
MO.FDuiSelect_construct = function FDuiSelect_construct(){
   var o = this;
   o.__base.FDuiEditControl.construct.call(o);
}
MO.FDuiSelect_findItemByLabel = function FDuiSelect_findItemByLabel(p){
   var o = this;
   var s = o._components;
   if(s){
      for(var i = s.count() - 1; i >= 0; i--){
         var c = s.valueAt(i);
         if(MO.Lang.String.equals(c._label, p, true)){
            return c;
         }
      }
   }
   return null;
}
MO.FDuiSelect_findItemByData = function FDuiSelect_findItemByData(p){
   var o = this;
   var s = o._components;
   if(s){
      for(var i = s.count() - 1; i >= 0; i--){
         var c = s.valueAt(i);
         if(MO.Lang.String.equals(c._dataValue, p, true)){
            return c;
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
   var item = o.findItemByData(value);
   if(item){
      return MO.Lang.String.nvl(item.label());
   }
   return item;
}
MO.FDuiSelect_get = function FDuiSelect_get(){
   var o = this;
   var value = o._hInput.value;
   var result = o.formatValue(value);
   return result;
}
MO.FDuiSelect_set = function FDuiSelect_set(value){
   var o = this;
   var text = o.formatDisplay(value);
   o._hInput.value = MO.Lang.String.nvl(text);
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
MO.FDuiSelect_drop = function FDuiSelect_drop(){
   var o = this;
   if(o.hasComponent()){
      var e = o._editor = MO.Console.find(MO.FDuiEditorConsole).focus(o, MO.FDuiSelectEditor, o._name);
      e.buildItems(o);
      e.set(o.get());
      e.show();
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
MO.FDuiSelect_refreshStyle = function FDuiSelect_refreshStyle(){
   var o = this;
   o.__base.FDuiEditControl.refreshStyle.call(o);
   if(!o.editCheck){
      o.hEdit.readOnly = 'true';
   }
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
with(MO){
   MO.FDuiSlideNumber = function FDuiSlideNumber(o){
      o = RClass.inherits(this, o, FDuiEditControl, MUiPropertyNumber, MListenerDataChanged, MMouseCapture);
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
      o.onBuildEditValue    = FDuiSlideNumber_onBuildEditValue;
      o.onMouseCaptureStart = FDuiSlideNumber_onMouseCaptureStart;
      o.onMouseCapture      = FDuiSlideNumber_onMouseCapture;
      o.onMouseCaptureStop  = FDuiSlideNumber_onMouseCaptureStop;
      o.onSlideChange       = FDuiSlideNumber_onSlideChange;
      o.onInputKeyPress     = RClass.register(o, new AEventKeyPress('onInputKeyPress'), FDuiSlideNumber_onInputKeyPress);
      o.onInputEdit         = RClass.register(o, new AEventInputChanged('onInputEdit'), FDuiSlideNumber_onInputEdit);
      o.onInputChange       = RClass.register(o, new AEventChange('onInputChange'), FDuiSlideNumber_onInputChange);
      o.construct           = FDuiSlideNumber_construct;
      o.get                 = FDuiSlideNumber_get;
      o.set                 = FDuiSlideNumber_set;
      o.setInputValue       = FDuiSlideNumber_setInputValue;
      o.refreshValue        = FDuiSlideNumber_refreshValue;
      return o;
   }
   MO.FDuiSlideNumber_onBuildEditValue = function FDuiSlideNumber_onBuildEditValue(p){
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
      var b = o._slide = new SDuiSlide();
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
   MO.FDuiSlideNumber_onMouseCaptureStart = function FDuiSlideNumber_onMouseCaptureStart(p){
      var o = this;
      var c = RHtml.searchObject(p.hSource, '__pcapture');
      if(c){
         c.onMouseDown(p);
      }
   }
   MO.FDuiSlideNumber_onMouseCapture = function FDuiSlideNumber_onMouseCapture(p){
      var o = this;
      var c = RHtml.searchObject(p.hSource, '__pcapture');
      if(c){
         c.onMouseMove(p);
      }
   }
   MO.FDuiSlideNumber_onMouseCaptureStop = function FDuiSlideNumber_onMouseCaptureStop(p){
      var o = this;
      var c = RHtml.searchObject(p.hSource, '__pcapture');
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
      if(!RKeyboard.isFloatKey(c)){
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
      o._inputSize = new SSize2(120, 0);
   }
   MO.FDuiSlideNumber_get = function FDuiSlideNumber_get(p){
      var o = this;
      var v = o._hInput.value;
      var r = RFloat.parse(v);
      return RFloat.toRange(r, o._valueMin, o._valueMax);
   }
   MO.FDuiSlideNumber_set = function FDuiSlideNumber_set(p){
      var o = this;
      o.__base.FDuiEditControl.set.call(o, p);
      var v = RString.nvl(p, '0');
      o._innerOriginValue = v;
      o._innerDataValue = v;
      o._slide.set(v);
      o.setInputValue(v);
      o.changeSet(false);
   }
   MO.FDuiSlideNumber_setInputValue = function FDuiSlideNumber_setInputValue(p){
      var o = this;
      var v = RFloat.parse(p);
      if(isNaN(v)){
         return;
      }
      v = RFloat.toRange(v, o._valueMin, o._valueMax);
      o._dataDisplay = RFloat.format(v, 0, null, 2, null);
      o._hInput.value = o._dataDisplay;
   }
   MO.FDuiSlideNumber_refreshValue = function FDuiSlideNumber_refreshValue(){
      var o = this;
      o.processDataChangedListener(o);
   }
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
   o.hPanel = RBuilder.create(null, 'DIV');
   o.hForm = RBuilder.appendTable(o.hPanel);
   o.hForm.width = '100%';
}
MO.FDuiSplit_oeBuild = function FDuiSplit_oeBuild(e){
   var o = this;
   o.base.FDuiControl.oeBuild.call(o, e);
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
      hc.style.background = 'url(' + RRes._iconPath('ctl.FDuiSplit_Panel') + ')';
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
with(MO){
   MO.FDuiText = function FDuiText(o){
      o = RClass.inherits(this, o, FDuiTextControl, MUiPropertyEdit, MListenerDataChanged);
      o._inputSize       = RClass.register(o, new APtySize2('_inputSize'));
      o._unit            = RClass.register(o, new APtyString('_unit'));
      o._styleValuePanel = RClass.register(o, new AStyle('_styleValuePanel'));
      o._styleInputPanel = RClass.register(o, new AStyle('_styleInputPanel'));
      o._styleInput      = RClass.register(o, new AStyle('_styleInput'));
      o._hValueForm      = null;
      o._hValueLine      = null;
      o._hInputPanel     = null;
      o._hInput          = null;
      o.onBuildEditValue = FDuiText_onBuildEditValue;
      o.onInputEdit      = RClass.register(o, new AEventInputChanged('onInputEdit'), FDuiText_onInputEdit);
      o.construct        = FDuiText_construct;
      o.formatDisplay    = FDuiText_formatDisplay;
      o.formatValue      = FDuiText_formatValue;
      o.get              = FDuiText_get;
      o.set              = FDuiText_set;
      o.refreshValue     = FDuiText_refreshValue;
      return o;
   }
   MO.FDuiText_onBuildEditValue = function FDuiText_onBuildEditValue(p){
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
   MO.FDuiText_onInputEdit = function FDuiText_onInputEdit(p){
      var o = this;
      var v = o._hInput.value;
      o.refreshValue();
   }
   MO.FDuiText_construct = function FDuiText_construct(){
      var o = this;
      o.__base.FDuiTextControl.construct.call(o);
      o._inputSize = new SSize2(120, 0);
   }
   MO.FDuiText_formatDisplay = function FDuiText_formatDisplay(p){
      var o = this;
      var r = RString.nvl(p);
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
      o._hInput.value = RString.nvl(p);
   }
   MO.FDuiText_refreshValue = function FDuiText_refreshValue(){
      var o = this;
      o.processDataChangedListener(o);
   }
}
