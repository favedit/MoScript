with(MO){
   MO.FGuiButton = function FGuiButton(o){
      o = RClass.inherits(this, o, FGuiControl);
      o.onPaintBegin = FGuiButton_onPaintBegin;
      return o;
   }
   MO.FGuiButton_onPaintBegin = function FGuiButton_onPaintBegin(event){
      var o = this;
      o.__base.FGuiControl.onPaintBegin.call(o, event);
      var graphic = event.graphic;
      var rectangle = o._clientRectangle;
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
}
with (MO) {
   MO.FGuiChartTimeline = function FGuiChartTimeline(o) {
      o = RClass.inherits(this, o, FGuiTimeline);
      o.onPaintBegin = FGuiChartTimeline_onPaintBegin;
      return o;
   }
   MO.FGuiChartTimeline_onPaintBegin = function FGuiChartTimeline_onPaintBegin(event) {
      var o = this;
      o.__base.FGuiTimeline.onPaintBegin.call(o, event);
      var graphic = event.graphic;
      var rectangle = o._clientRectangle;
      var top = rectangle.top;
      var bottom = rectangle.top + rectangle.height;
      var dataTop = top + 30;
      var dataBottom = bottom - 30;
      var dataHeight = dataBottom - dataTop;
      var decoLineMargin = o.triangleWidth() + o.decoLineGap();
      var dataLeft = rectangle.left + 5 + decoLineMargin + o.decoLineWidth();
      var dataRight = rectangle.left + rectangle.width - 5 - decoLineMargin - o.decoLineWidth();
      var startDate = o.startTime();
      var endDate = o.endTime();
      var degreeDate = o.degreeTime();
      var bakTime = startDate.date.getTime();
      var timeSpan = endDate.date.getTime() - startDate.date.getTime();
      var historyConsole = MO.Console.find(MO.FEaiResourceConsole).historyConsole();
      var dateData = historyConsole.dates().get(endDate.format('YYYYMMDD'));
      var maxInves = dateData.investmentTotal();
      var pixPer10k = dataHeight * 10000 / maxInves;
      var dateData = historyConsole.dates().get(startDate.format('YYYYMMDD'));
      var inves = dateData.investmentTotal();
      var lastX = dataLeft;
      var lastY = dataBottom - inves / 10000 * pixPer10k;
      var rateConsole = MO.Console.find(MO.FEaiResourceConsole).rateConsole();
      var rateResource = rateConsole.find(EEaiRate.Line);
      while (startDate.isBefore(degreeDate)) {
         var dateData = historyConsole.dates().get(startDate.format('YYYYMMDD'));
         if (dateData) {
            var degreeSpan = startDate.date.getTime() - bakTime;
            var x = dataLeft + (dataRight - dataLeft) * (degreeSpan / timeSpan)
            var inves = dateData.investmentTotal();
            var y = dataBottom - inves / 10000 * pixPer10k;
            var rate = 1 - (y / dataHeight);
            var colorIdx = parseInt(rateResource.count() * rate);
            var hexColor = RHex.format(rateResource.find(colorIdx));
            var color = '#' + hexColor.substring(2);
            graphic.drawLine(lastX, lastY, x, y, color, 3);
            if (startDate.date.getDate() == 1) {
               var text = MO.RFloat.unitFormat(inves, 0, 0, 2, 0, 10000, '万');
               graphic.drawCircle(x, y, 3, 0, color, color);
            }
            lastX = x;
            lastY = y;
            startDate.addDay(1);
         }
         else {
            break;
         }
      }
      startDate.date.setTime(bakTime);
      startDate.refresh();
      while (startDate.isBefore(degreeDate)) {
         var dateData = historyConsole.dates().get(startDate.format('YYYYMMDD'));
         if (dateData) {
            var degreeSpan = startDate.date.getTime() - bakTime;
            var x = dataLeft + (dataRight - dataLeft) * (degreeSpan / timeSpan)
            var inves = dateData.investmentTotal();
            var y = dataBottom - inves / 10000 * pixPer10k;
            if (startDate.date.getDate() == 1) {
               var text = MO.RFloat.unitFormat(inves, 0, 0, 2, 0, 10000, '万');
               graphic.setFont('bold 16px Microsoft YaHei');
               graphic.drawText(text, x - text.length * 3, y - 16, '#FFFFFF');
            }
            startDate.addDay(1);
         }
         else {
            break;
         }
      }
      var dateData = historyConsole.dates().get(startDate.format('YYYYMMDD'));
      if (dateData) {
         var degreeSpan = startDate.date.getTime() - bakTime + o.unitms() * o.progress();
         var x = dataLeft + (dataRight - dataLeft) * (degreeSpan / timeSpan)
         var inves = dateData.investmentTotal();
         var y = dataBottom - inves / 10000 * pixPer10k;
         var rate = 1 - (y / dataHeight);
         var colorIdx = parseInt(rateResource.count() * rate);
         var hexColor = RHex.format(rateResource.find(colorIdx));
         var color = '#' + hexColor.substring(2);
         graphic.drawLine(lastX, lastY, x, lastY + (y - lastY) * o.progress(), color, 3);
         var text = MO.RFloat.unitFormat(inves, 0, 0, 2, 0, 10000, '万');
         graphic.drawCircle(x, lastY + (y - lastY) * o.progress(), 3, 0, color, color);
         graphic.setFont('bold 16px Microsoft YaHei');
         graphic.drawText(text, x - text.length * 3, y - 16, '#FFFFFF');
      }
      startDate.date.setTime(bakTime);
      startDate.refresh();
   }
}
with(MO){
   MO.FGuiLabel = function FGuiLabel(o){
      o = RClass.inherits(this, o, FGuiControl);
      o.onPaintLabel = FGuiLabel_onPaintLabel;
      o.onPaintBegin = FGuiLabel_onPaintBegin;
      return o;
   }
   MO.FGuiLabel_onPaintLabel = function FGuiLabel_onPaintLabel(event){
      var o = this;
      o.__base.FGuiControl.onPaintBegin.call(o, event);
      var graphic = event.graphic;
      var rectangle = o._clientRectangle;
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
}
with(MO){
   MO.FGuiPanel = function FGuiPanel(o){
      o = RClass.inherits(this, o, FGuiControl);
      return o;
   }
}
MO.FGuiPicture = function FGuiPicture(o){
   o = MO.Class.inherits(this, o, MO.FGuiControl);
   return o;
}
with (MO) {
   MO.FGuiTimeline = function FGuiTimeline(o) {
      o = RClass.inherits(this, o, FGuiControl);
      o._timeUnit = RClass.register(o, new AGetSet('_timeUnit'));
      o._startTime = RClass.register(o, new AGetSet('_startTime'));
      o._endTime = RClass.register(o, new AGetSet('_endTime'));
      o._degreeTime = RClass.register(o, new AGetSet('_degreeTime'));
      o._progress = RClass.register(o, new AGetSet('_progress'));
      o._unitms = RClass.register(o, new AGetSet('_unitms'), 1000 * 60 * 60 * 24);
      o._degreeLineHeight = RClass.register(o, new AGetSet('_degreeLineHeight'), 10);
      o._triangleWidth = RClass.register(o, new AGetSet('_triangleWidth'), 10);
      o._triangleHeight = RClass.register(o, new AGetSet('_triangleHeight'), 12);
      o._decoLineGap = RClass.register(o, new AGetSet('_decoLineGap'), 10);
      o._decoLineWidth = RClass.register(o, new AGetSet('_decoLineWidth'), 30);
      o.onPaintBegin = FGuiTimeline_onPaintBegin;
      o.onOperationDown = FGuiTimeline_onOperationDown;
      o._dataChangedListeners = RClass.register(o, new AListener('_dataChangedListeners', EEvent.DataChanged));
      return o;
   }
   MO.FGuiTimeline_onPaintBegin = function FGuiTimeline_onPaintBegin(event) {
      var o = this;
      o.__base.FGuiControl.onPaintBegin.call(o, event);
      var graphic = event.graphic;
      var rectangle = o._clientRectangle;
      var top = rectangle.top;
      var bottom = rectangle.top + rectangle.height;
      var middle = bottom - 30;
      var decoLeft = rectangle.left + 5;
      var decoRight = rectangle.left + rectangle.width - 5;
      var decoLineMargin = o.triangleWidth() + o.decoLineGap();
      graphic.drawTriangle(decoLeft, middle, decoLeft + o.triangleWidth(), middle + o.triangleHeight() / 2, decoLeft + o.triangleWidth(), middle - o.triangleHeight() / 2, 1, '#FFFFFF', '#FFFFFF');
      graphic.drawTriangle(decoRight, middle, decoRight - o.triangleWidth(), middle + o.triangleHeight() / 2, decoRight - o.triangleWidth(), middle - o.triangleHeight() / 2, 1, '#FFFFFF', '#FFFFFF');
      graphic.drawLine(decoLeft + decoLineMargin, middle, decoLeft + decoLineMargin + o.decoLineWidth(), middle, '#FFFFFF', 1);
      graphic.drawLine(decoRight - decoLineMargin, middle, decoRight - decoLineMargin - o.decoLineWidth(), middle, '#FFFFFF', 1);
      var dataLeft = decoLeft + decoLineMargin + o.decoLineWidth();
      var dataRight = decoRight - decoLineMargin - o.decoLineWidth();
      graphic.drawLine(dataLeft, middle, dataRight, middle, '#FFFFFF', 3);
      var startTime = o.startTime();
      var endTime = o.endTime();
      var degreeTime = o.degreeTime();
      var degreeText;
      var startText;
      switch (o.timeUnit()) {
         case EGuiTimeUnit.Second:
            startText = startTime.format('MI:SS.MISS');
            degreeText = degreeTime.format('MI:SS.MISS');
            break;
         case EGuiTimeUnit.Minute:
            startText = startTime.format('HH24:MI:SS');
            degreeText = degreeTime.format('HH24:MI:SS');
            break;
         case EGuiTimeUnit.Hour:
            startText = startTime.format('HH24:MI');
            degreeText = degreeTime.format('HH24:MI');
            break;
         case EGuiTimeUnit.Day:
            startText = startTime.format('MM-DD:HH24');
            degreeText = degreeTime.format('MM-DD:HH24');
            break;
         case EGuiTimeUnit.Week:
            startText = startTime.format('MM-DD');
            degreeText = degreeTime.format('MM-DD');
            break;
         case EGuiTimeUnit.Month:
            startText = startTime.format('YYYY-MM-DD');
            degreeText = degreeTime.format('YYYY-MM-DD');
            break;
         case EGuiTimeUnit.Year:
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
      graphic.setFont('bold 16px Microsoft YaHei');
      graphic.drawText(degreeText, degreeX - degreeText.length * 3, middle + 2 + o.triangleHeight() + 24, '#FFFFFF');
      var text;
      var bakTime = startTime.date.getTime();
      graphic.drawLine(dataLeft, middle - o.degreeLineHeight(), dataLeft, middle, '#FFFFFF', 1);
      graphic.drawText(startText, dataLeft - startText.length * 5, middle + 20, '#FFFFFF');
      switch (o.timeUnit()) {
         case EGuiTimeUnit.Second:
            startTime.addMseconds(1000);
            startTime.parseAuto(startTime.format('YYYYMMDDHH24MISS'));
            break;
         case EGuiTimeUnit.Minute:
            startTime.addMseconds(1000 * 60);
            startTime.parseAuto(startTime.format('YYYYMMDDHH24MI'));
            break;
         case EGuiTimeUnit.Hour:
            startTime.addMseconds(1000 * 60 * 60);
            startTime.parseAuto(startTime.format('YYYYMMDDHH24'));
            break;
         case EGuiTimeUnit.Day:
            startTime.addDay(1);
            startTime.parseAuto(startTime.format('YYYYMMDD'));
            break;
         case EGuiTimeUnit.Week:
            startTime.addDay(7);
            startTime.parseAuto(startTime.format('YYYYMMDD'));
            break;
         case EGuiTimeUnit.Month:
            startTime.addMonth(1);
            startTime.parseAuto(startTime.format('YYYYMM'));
            break;
         case EGuiTimeUnit.Year:
            startTime.addYear(1);
            startTime.parseAuto(startTime.format('YYYY'));
            break;
         default:
            return;
      }
      while (!startTime.isAfter(endTime)) {
         var span = startTime.date.getTime() - bakTime;
         var x = dataLeft + (dataRight - dataLeft) * (span / timeSpan);
         graphic.drawLine(x, middle - o.degreeLineHeight(), x, middle, '#FFFFFF', 1);
         switch (o.timeUnit()) {
            case EGuiTimeUnit.Second:
               text = startTime.format('MI:SS');
               startTime.addMseconds(1000);
               break;
            case EGuiTimeUnit.Minute:
               text = startTime.format('HH24:MI');
               startTime.addMseconds(1000 * 60);
               break;
            case EGuiTimeUnit.Hour:
               text = startTime.format('HH24:00');
               startTime.addMseconds(1000 * 60 * 60);
               break;
            case EGuiTimeUnit.Day:
               text = startTime.format('MM-DD');
               startTime.addDay(1);
               break;
            case EGuiTimeUnit.Week:
               text = startTime.format('MM-DD');
               startTime.addDay(7);
               break;
            case EGuiTimeUnit.Month:
               text = startTime.format('YYYY-MM');
               startTime.addMonth(1);
               break;
            case EGuiTimeUnit.Year:
               text = startTime.format('YYYY');
               startTime.addYear(1);
               break;
            default:
               return;
         }
         graphic.setFont('bold 16px Microsoft YaHei');
         graphic.drawText(text, x - text.length * 3, middle + 20, '#FFFFFF');
      }
      var span = endTime.date.getTime() - bakTime;
      var x = dataLeft + (dataRight - dataLeft) * (span / timeSpan);
      graphic.drawLine(x, middle - o.degreeLineHeight(), x, middle, '#FFFFFF', 1);
      startTime.date.setTime(bakTime);
      startTime.refresh();
   }
   MO.FGuiTimeline_onOperationDown = function FGuiTimeline_onOperationDown(event) {
      if (!event.flag) {
         return;
      }
      var o = this;
      o.__base.FGuiControl.onOperationDown.call(o, event);
      var rectangle = o._clientRectangle;
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
         }
      }
   }
}
