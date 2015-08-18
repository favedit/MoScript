MO.FGuiButton = function FGuiButton(o){
   o = MO.Class.inherits(this, o, MO.FGuiControl);
   o.onPaintBegin = MO.FGuiButton_onPaintBegin;
   return o;
}
MO.FGuiButton_onPaintBegin = function FGuiButton_onPaintBegin(event){
   var o = this;
   o.__base.FGuiControl.onPaintBegin.call(o, event);
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   if(o._label){
      if(o._foreFont){
         graphic.setFont(o._foreFont);
      }
      var width = graphic.textWidth(o._label);
      var x = rectangle.left + rectangle.width * 0.5 - width * 0.5;
      var y = rectangle.top + rectangle.height * 0.5 + 3;
      graphic.drawText(o._label, x, y, o._foreColor);
   }
}
MO.FGuiLabel = function FGuiLabel(o){
   o = MO.Class.inherits(this, o, MO.FGuiControl);
   o._alignCd     = MO.Class.register(o, [new MO.APtyString('_alignCd'), new MO.AGetter('_alignCd')], MO.EUiAlign.Left);
   o.onPaintLabel = MO.FGuiLabel_onPaintLabel;
   o.onPaintBegin = MO.FGuiLabel_onPaintBegin;
   o.setLabel     = MO.FGuiLabel_setLabel;
   return o;
}
MO.FGuiLabel_onPaintLabel = function FGuiLabel_onPaintLabel(event){
   var o = this;
   o.__base.FGuiControl.onPaintBegin.call(o, event);
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   if(o._foreFont){
      graphic.setFont(o._foreFont);
   }
   var width = graphic.textWidth(o._label);
   var x = rectangle.left + rectangle.width * 0.5 - width * 0.5;
   var y = rectangle.top + rectangle.height * 0.5 + 3;
   graphic.drawText(o._label, x, y, o._foreColor);
}
MO.FGuiLabel_onPaintBegin = function FGuiLabel_onPaintBegin(event){
   var o = this;
   o.__base.FGuiControl.onPaintBegin.call(o, event);
   if(o._label){
      o.onPaintLabel(event);
   }
}
MO.FGuiLabel_setLabel = function FGuiLabel_setLabel(label){
   var o = this;
   if(o._label != label){
      o.dirty();
   }
   o.__base.FGuiControl.setLabel.call(o, label);
}
MO.FGuiPanel = function FGuiPanel(o){
   o = MO.Class.inherits(this, o, MO.FGuiControl);
   return o;
}
MO.FGuiPicture = function FGuiPicture(o){
   o = MO.Class.inherits(this, o, MO.FGuiControl);
   return o;
}
MO.FGuiTimeline = function FGuiTimeline(o) {
   o = MO.Class.inherits(this, o, MO.FGuiControl);
   o._timeUnit             = MO.Class.register(o, new MO.AGetSet('_timeUnit'));
   o._startTime            = MO.Class.register(o, new MO.AGetSet('_startTime'));
   o._endTime              = MO.Class.register(o, new MO.AGetSet('_endTime'));
   o._degreeTime           = MO.Class.register(o, new MO.AGetSet('_degreeTime'));
   o._progress             = MO.Class.register(o, new MO.AGetSet('_progress'));
   o._unitms               = MO.Class.register(o, new MO.AGetSet('_unitms'), 1000 * 60 * 60 * 24);
   o._degreeLineHeight     = MO.Class.register(o, new MO.AGetSet('_degreeLineHeight'), 15);
   o._degreeLineWidth      = MO.Class.register(o, new MO.AGetSet('_degreeLineWidth'), 3);
   o._mainLineWidth        = MO.Class.register(o, new MO.AGetSet('_mainLineWidth'), 5);
   o._triangleWidth        = MO.Class.register(o, new MO.AGetSet('_triangleWidth'), 10);
   o._triangleHeight       = MO.Class.register(o, new MO.AGetSet('_triangleHeight'), 12);
   o._decoLineGap          = MO.Class.register(o, new MO.AGetSet('_decoLineGap'), 10);
   o._decoLineWidth        = MO.Class.register(o, new MO.AGetSet('_decoLineWidth'), 40);
   o._timeFontColor        = '#FFFFFF';
   o._cursorFontColor      = '#FFFFFF';
   o._listenersDataChanged = MO.Class.register(o, new MO.AListener('_listenersDataChanged', MO.EEvent.DataChanged));
   o.onPaintBegin          = MO.FGuiTimeline_onPaintBegin;
   o.onOperationDown       = MO.FGuiTimeline_onOperationDown;
   return o;
}
MO.FGuiTimeline_onPaintBegin = function FGuiTimeline_onPaintBegin(event) {
   var o = this;
   o.__base.FGuiControl.onPaintBegin.call(o, event);
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   var top = rectangle.top;
   var bottom = rectangle.top + rectangle.height;
   var middle = bottom - 50;
   var decoLeft = rectangle.left + 5;
   var decoRight = rectangle.left + rectangle.width - 5;
   var decoLineMargin = o.triangleWidth() + o.decoLineGap();
   graphic.drawTriangle(decoLeft, middle, decoLeft + o.triangleWidth(), middle + o.triangleHeight() / 2, decoLeft + o.triangleWidth(), middle - o.triangleHeight() / 2, 1, '#FFFFFF', '#FFFFFF');
   graphic.drawTriangle(decoRight, middle, decoRight - o.triangleWidth(), middle + o.triangleHeight() / 2, decoRight - o.triangleWidth(), middle - o.triangleHeight() / 2, 1, '#FFFFFF', '#FFFFFF');
   graphic.drawLine(decoLeft + decoLineMargin, middle, decoLeft + decoLineMargin + o.decoLineWidth(), middle, '#25E8FF', o._mainLineWidth);
   graphic.drawLine(decoRight - decoLineMargin, middle, decoRight - decoLineMargin - o.decoLineWidth(), middle, '#25E8FF', o._mainLineWidth);
   var dataLeft = decoLeft + decoLineMargin + o.decoLineWidth();
   var dataRight = decoRight - decoLineMargin - o.decoLineWidth();
   graphic.drawLine(dataLeft, middle, dataRight, middle, '#25E8FF', o._mainLineWidth);
   var startTime = o.startTime();
   var endTime = o.endTime();
   var degreeTime = o.degreeTime();
   var degreeText;
   var startText;
   switch (o.timeUnit()) {
      case MO.EUiTimeUnit.Second:
         startText = startTime.format('MI:SS.MISS');
         degreeText = degreeTime.format('MI:SS.MISS');
         break;
      case MO.EUiTimeUnit.Minute:
         startText = startTime.format('HH24:MI:SS');
         degreeText = degreeTime.format('HH24:MI:SS');
         break;
      case MO.EUiTimeUnit.Hour:
         startText = startTime.format('HH24:MI');
         degreeText = degreeTime.format('HH24:MI');
         break;
      case MO.EUiTimeUnit.Day:
         startText = startTime.format('MM-DD:HH24');
         degreeText = degreeTime.format('MM-DD:HH24');
         break;
      case MO.EUiTimeUnit.Week:
         startText = startTime.format('MM-DD');
         degreeText = degreeTime.format('MM-DD');
         break;
      case MO.EUiTimeUnit.Month:
         startText = startTime.format('YYYY-MM-DD');
         degreeText = degreeTime.format('YYYY-MM-DD');
         break;
      case MO.EUiTimeUnit.Year:
         startText = startTime.format('YYYY-MM');
         degreeText = degreeTime.format('YYYY-MM');
         break;
      default:
         return;
   }
   var timeSpan = endTime.date.getTime() - startTime.date.getTime();
   var degreeSpan = degreeTime.date.getTime() - startTime.date.getTime() + o.unitms() * o.progress();
   var degreeX = dataLeft + (dataRight - dataLeft) * (degreeSpan / timeSpan);
   graphic.drawTriangle(degreeX, middle + 2, degreeX - o.triangleWidth() / 2, middle + 2 + o.triangleHeight(), degreeX + o.triangleWidth() / 2, middle + 2 + o.triangleHeight(), 1, '#FFFFFF', '#FFFFFF');
   graphic.setFont('bold 22px Microsoft YaHei');
   var degreeTextWidth = graphic.textWidth(degreeText);
   graphic.drawText(degreeText, degreeX - degreeTextWidth / 2, middle + 50, o._cursorFontColor);
   var text;
   var bakTime = startTime.date.getTime();
   graphic.drawLine(dataLeft, middle - o.degreeLineHeight(), dataLeft, middle, '#FFFFFF', o._degreeLineWidth);
   var startTextWidth = graphic.textWidth(startText);
   graphic.drawText(startText, dataLeft - startTextWidth / 2, middle + 50, o._cursorFontColor);
   switch (o.timeUnit()) {
      case MO.EUiTimeUnit.Second:
         startTime.addMseconds(1000);
         startTime.parseAuto(startTime.format('YYYYMMDDHH24MISS'));
         break;
      case MO.EUiTimeUnit.Minute:
         startTime.addMseconds(1000 * 60);
         startTime.parseAuto(startTime.format('YYYYMMDDHH24MISS'));
         break;
      case MO.EUiTimeUnit.Hour:
         startTime.addMseconds(1000 * 60 * 60);
         startTime.parseAuto(startTime.format('YYYYMMDDHH24MISS'));
         break;
      case MO.EUiTimeUnit.Day:
         startTime.addDay(1);
         startTime.parseAuto(startTime.format('YYYYMMDD'));
         break;
      case MO.EUiTimeUnit.Week:
         startTime.addDay(7);
         startTime.parseAuto(startTime.format('YYYYMMDD'));
         break;
      case MO.EUiTimeUnit.Month:
         startTime.addMonth(1);
         startTime.parseAuto(startTime.format('YYYYMM'));
         break;
      case MO.EUiTimeUnit.Year:
         startTime.addYear(1);
         startTime.parseAuto(startTime.format('YYYY'));
         break;
      default:
         return;
   }
   var alternate = true;
   var textBottom = 0;
   while (!startTime.isAfter(degreeTime)) {
      var span = startTime.date.getTime() - bakTime;
      var x = dataLeft + (dataRight - dataLeft) * (span / timeSpan);
      graphic.drawLine(x, middle - o.degreeLineHeight(), x, middle, '#FFFFFF', o._degreeLineWidth);
      switch (o.timeUnit()) {
         case MO.EUiTimeUnit.Second:
            text = startTime.format('MI:SS');
            startTime.addMseconds(1000);
            break;
         case MO.EUiTimeUnit.Minute:
            text = startTime.format('HH24:MI');
            startTime.addMseconds(1000 * 60);
            break;
         case MO.EUiTimeUnit.Hour:
            text = startTime.format('HH24:00');
            startTime.addMseconds(1000 * 60 * 60);
            break;
         case MO.EUiTimeUnit.Day:
            text = startTime.format('MM-DD');
            startTime.addDay(1);
            break;
         case MO.EUiTimeUnit.Week:
            text = startTime.format('MM-DD');
            startTime.addDay(7);
            break;
         case MO.EUiTimeUnit.Month:
            text = startTime.format('YYYY-MM');
            startTime.addMonth(1);
            break;
         case MO.EUiTimeUnit.Year:
            text = startTime.format('YYYY');
            startTime.addYear(1);
            break;
         default:
            return;
      }
      graphic.setFont('bold 22px Microsoft YaHei');
      var textWidth = graphic.textWidth(text);
      textBottom = alternate ? middle + 26 : middle + 52;
      graphic.drawText(text, x - textWidth / 2, textBottom, o._timeFontColor);
   }
   var span = endTime.date.getTime() - bakTime;
   var x = dataLeft + (dataRight - dataLeft) * (span / timeSpan);
   graphic.drawLine(x, middle - o.degreeLineHeight(), x, middle, o._cursorFontColor, o._degreeLineWidth);
   startTime.date.setTime(bakTime);
   startTime.refresh();
}
MO.FGuiTimeline_onOperationDown = function FGuiTimeline_onOperationDown(event) {
   if (!event.flag) {
      return;
   }
   var o = this;
   o.__base.FGuiControl.onOperationDown.call(o, event);
   var rectangle = event.rectangle;
   var bottom = rectangle.top + rectangle.height;
   var decoLeft = rectangle.left + 5;
   var decoRight = rectangle.left + rectangle.width - 5;
   var decoLineMargin = o.triangleWidth() + o.decoLineGap();
   var dataLeft = decoLeft + decoLineMargin + o.decoLineWidth();
   var dataRight = decoRight - decoLineMargin - o.decoLineWidth();
   var x = event.locationX;
   if (event.locationY > bottom - 30) {
      if (x > dataLeft && x < dataRight) {
         var rate = (x - dataLeft) / (dataRight - dataLeft);
         var msDate = o.startTime().date.getTime() + (o.endTime().date.getTime() - o.startTime().date.getTime()) * rate;
         var dsEvent = MO.Memory.alloc(SEvent);
         dsEvent.sender = o;
         var selectedDate = MO.Memory.alloc(TDate);
         selectedDate.date.setTime(msDate);
         selectedDate.refresh();
         dsEvent.date = selectedDate.parseAuto(selectedDate.format('YYYYMMDD'));
         o.processDataChangedListener(dsEvent);
         MO.Memory.free(dsEvent);
      }
   }
}
